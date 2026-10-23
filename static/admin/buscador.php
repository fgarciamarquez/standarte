<?php
/*
 * Panel: búsquedas de feria que no encontraron nada.
 *
 * Por qué existe (22/10/2026). Un cliente buscó «OMD» en el buscador de la portada y el
 * sitio le respondió que su feria no estaba dada de alta. Estaba. Al revisarlo apareció
 * que el buscador fallaba en masa, pero también que de esos fallos no quedaba rastro: el
 * endpoint solo mandaba un correo a info@standarte.es y ahí moría. Sin registro no hay
 * manera de saber qué busca la gente sin encontrarlo, ni cuántas veces, ni si un fallo se
 * repite — que es justo lo que dice qué ferias dar de alta y qué alias añadir al motor de
 * búsqueda (`fairAliases` en src/lib/fairMatch.js).
 *
 * Ahora cada fallo se guarda en Supabase (tabla fair_search_misses) y esta página lo lee.
 * No hay datos personales: solo el texto buscado, el idioma y la página de origen.
 *
 * La agrupación se hace en PHP y no con una vista de Postgres a propósito: una vista no
 * hereda la RLS de su tabla, y esta tabla está cerrada para que solo la lea el servidor.
 */
ini_set('session.gc_maxlifetime', '43200');
session_set_cookie_params(43200);
session_start();
require_once __DIR__ . '/../supabase-config.php';
$config = require __DIR__ . '/email_campaing/config.php';

function bq_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

if (isset($_POST['login_password'])) {
	if (isset($config['login_password_hash']) && password_verify($_POST['login_password'], $config['login_password_hash'])) {
		$_SESSION['standarte_email_campaing_auth'] = true;
	}
	header('Location: buscador.php'); exit;
}
if (isset($_GET['logout'])) { unset($_SESSION['standarte_email_campaing_auth']); header('Location: buscador.php'); exit; }

/* ---------- Lectura ---------- */
$dias = isset($_GET['dias']) ? max(1, min(3650, (int) $_GET['dias'])) : 90;
$filas = array();
$error = '';
$truncado = false;
const BQ_TOPE = 3000;   // tope de filas traídas; con el límite por IP del endpoint sobra

if (bq_authed()) {
	$key = defined('SUPABASE_SERVICE_KEY') ? SUPABASE_SERVICE_KEY : (defined('SUPABASE_KEY') ? SUPABASE_KEY : '');
	if ($key === '') {
		$error = 'Falta la clave de Supabase en supabase-config.php.';
	} else {
		$desde = gmdate('Y-m-d\TH:i:s\Z', time() - $dias * 86400);
		$url = SUPABASE_URL . '/rest/v1/fair_search_misses'
			. '?select=q,q_norm,lang,page_url,created_at'
			. '&created_at=gte.' . rawurlencode($desde)
			. '&order=created_at.desc&limit=' . BQ_TOPE;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('apikey: ' . $key, 'Authorization: Bearer ' . $key));
		$res = curl_exec($ch);
		$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		$dec = json_decode((string) $res, true);
		if ($code === 200 && is_array($dec)) {
			$filas = $dec;
			$truncado = count($filas) >= BQ_TOPE;
		} else {
			$error = 'Supabase respondió ' . $code . '. Si la tabla no existe todavía, está el SQL en docs/sql/.';
		}
	}
}

/* ---------- Agrupación por consulta normalizada ---------- */
$grupos = array();
foreach ($filas as $f) {
	$k = isset($f['q_norm']) && $f['q_norm'] !== '' ? $f['q_norm'] : mb_strtolower((string) $f['q'], 'UTF-8');
	if (!isset($grupos[$k])) {
		$grupos[$k] = array('n' => 0, 'muestra' => $f['q'], 'langs' => array(), 'ultima' => $f['created_at'], 'primera' => $f['created_at'], 'pagina' => $f['page_url']);
	}
	$g = &$grupos[$k];
	$g['n']++;
	if (!empty($f['lang'])) $g['langs'][$f['lang']] = true;
	if ($f['created_at'] > $g['ultima']) { $g['ultima'] = $f['created_at']; $g['muestra'] = $f['q']; }
	if ($f['created_at'] < $g['primera']) $g['primera'] = $f['created_at'];
	unset($g);
}
uasort($grupos, function ($a, $b) { return $b['n'] <=> $a['n'] ?: strcmp($b['ultima'], $a['ultima']); });
$fecha = function ($iso) { $t = strtotime((string) $iso); return $t ? date('d/m/Y H:i', $t) : '—'; };
?><!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Búsquedas no encontradas · Standarte</title>
<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
	a { color: #ffc800; } h1, h2 { font-weight: 700; }
	.wrap { max-width: 1100px; margin: 0 auto; }
	.card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
	input { width: 100%; box-sizing: border-box; background: #12141a; border: 1px solid #333; color: #eee; padding: 8px 10px; font-family: inherit; font-size: 14px; border-radius: 5px; margin-bottom: 8px; }
	label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #9aa; }
	button { background: #ffc800; color: #111; border: none; padding: 9px 18px; font-family: inherit; font-weight: 700; border-radius: 5px; cursor: pointer; }
	table { width: 100%; border-collapse: collapse; }
	td, th { padding: 8px; border-bottom: 1px solid #2c3038; text-align: left; font-size: 14px; vertical-align: top; }
	th { font-size: 12px; text-transform: uppercase; letter-spacing: .05em; color: #9aa; }
	.n { font-weight: 700; color: #ffc800; text-align: right; }
	.q { font-weight: 700; }
	.dim { color: #8a9099; font-size: 12px; }
	.msg { background: #3a2a12; border: 1px solid #b8860b; color: #ffd54f; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
	.nav { display: flex; gap: 14px; align-items: baseline; flex-wrap: wrap; margin-bottom: 18px; }
	.vacio { color: #8a9099; padding: 14px 0; }
</style>
</head>
<body>
<div class="wrap">
<?php if (!bq_authed()): ?>
	<h1>Búsquedas no encontradas</h1>
	<form method="post" class="card" style="max-width:360px">
		<label>Contraseña</label>
		<input type="password" name="login_password" required autofocus>
		<button type="submit">Entrar</button>
	</form>
<?php else: ?>
	<div style="display:flex;justify-content:space-between;align-items:center">
		<h1>Búsquedas de feria sin resultado</h1>
		<a href="buscador.php?logout=1">Salir</a>
	</div>
	<p class="dim">Lo que la gente escribió en el buscador de la portada y no encontró. Cada entrada
	es una feria que quizá convenga dar de alta, o un nombre alternativo que el buscador debería
	reconocer (los alias viven en <code>src/lib/fairMatch.js</code>).</p>

	<div class="nav">
		<span class="dim">Periodo:</span>
		<?php foreach (array(7 => '7 días', 30 => '30 días', 90 => '90 días', 365 => '1 año', 3650 => 'Todo') as $d => $txt): ?>
			<?php if ($dias === $d): ?><strong><?= h($txt) ?></strong><?php else: ?><a href="buscador.php?dias=<?= (int) $d ?>"><?= h($txt) ?></a><?php endif; ?>
		<?php endforeach; ?>
	</div>

	<?php if ($error): ?><div class="msg">⚠ <?= h($error) ?></div><?php endif; ?>
	<?php if ($truncado): ?><div class="msg">Mostrando las <?= (int) BQ_TOPE ?> más recientes del periodo: hay más.</div><?php endif; ?>

	<div class="card">
		<h2>Agrupadas (<?= count($grupos) ?> consultas distintas · <?= count($filas) ?> búsquedas)</h2>
		<?php if (!$grupos): ?>
			<p class="vacio">Nada en este periodo. Si el registro se acaba de instalar, es lo normal:
			solo recoge las búsquedas posteriores.</p>
		<?php else: ?>
		<table>
			<tr><th>Veces</th><th>Lo que se buscó</th><th>Idiomas</th><th>Primera</th><th>Última</th></tr>
			<?php foreach ($grupos as $k => $g): ?>
			<tr>
				<td class="n"><?= (int) $g['n'] ?></td>
				<td>
					<span class="q"><?= h($g['muestra']) ?></span>
					<?php if ($k !== mb_strtolower($g['muestra'], 'UTF-8')): ?><div class="dim"><?= h($k) ?></div><?php endif; ?>
				</td>
				<td class="dim"><?= h(implode(' ', array_keys($g['langs']))) ?></td>
				<td class="dim"><?= h($fecha($g['primera'])) ?></td>
				<td class="dim"><?= h($fecha($g['ultima'])) ?></td>
			</tr>
			<?php endforeach; ?>
		</table>
		<?php endif; ?>
	</div>

	<?php if ($filas): ?>
	<div class="card">
		<h2>Últimas 50, una por una</h2>
		<table>
			<tr><th>Cuándo</th><th>Texto</th><th>Idioma</th><th>Desde</th></tr>
			<?php foreach (array_slice($filas, 0, 50) as $f): ?>
			<tr>
				<td class="dim"><?= h($fecha($f['created_at'])) ?></td>
				<td class="q"><?= h($f['q']) ?></td>
				<td class="dim"><?= h($f['lang']) ?></td>
				<td class="dim"><?php $p = (string) $f['page_url']; echo $p !== '' ? h(preg_replace('#^https?://[^/]+#', '', $p)) : '—'; ?></td>
			</tr>
			<?php endforeach; ?>
		</table>
	</div>
	<?php endif; ?>
<?php endif; ?>
</div>
</body>
</html>
