<?php
/*
 * Verificación pública del sello de un contrato emitido por Standarte.
 *
 * El sello del contrato lleva un código (SC-AAAA-XXXXXXXX). Quien tenga el PDF puede
 * comprobar aquí que lo emitió Standarte y para qué proyecto, con qué fecha e importe.
 * Se muestra lo mínimo para verificar —referencia, cliente, evento, fecha e importe en
 * euros— y nada más: ni enlaces al proyecto, ni datos de contacto, ni el PDF.
 */
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';

function vf_h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

$code = isset($_GET['c']) && is_string($_GET['c']) ? strtoupper(trim($_GET['c'])) : '';
$valid = preg_match('/^SC-\d{4}-[A-F0-9]{8}$/', $code) === 1;
$p = null;
if ($valid) {
	$rows = cpx_rows('client_projects?contract_code=eq.' . urlencode($code) . '&select=ref,billing_company,client_name,contract_issued_at,contract_meta&limit=1');
	$p = isset($rows[0]) ? $rows[0] : null;
}
$meta = ($p && is_array($p['contract_meta'])) ? $p['contract_meta'] : array();
$lang = (isset($meta['lang']) && $meta['lang'] === 'en') ? 'en' : 'es';
$L = $lang === 'en'
	? array('title' => 'Contract verification', 'ok' => 'Authentic document', 'ok_sub' => 'This code corresponds to a service agreement issued by Standarte.', 'ko' => 'Code not found', 'ko_sub' => 'No contract issued by Standarte carries this code. Check the characters or contact us.', 'code' => 'Code', 'ref' => 'Project', 'client' => 'Client', 'fair' => 'Event', 'issued' => 'Issued on', 'total' => 'Contract amount', 'lang' => 'Language', 'back' => 'standarte.es')
	: array('title' => 'Verificación de contrato', 'ok' => 'Documento auténtico', 'ok_sub' => 'Este código corresponde a un contrato de prestación de servicios emitido por Standarte.', 'ko' => 'Código no encontrado', 'ko_sub' => 'Ningún contrato emitido por Standarte lleva este código. Revisa los caracteres o contacta con nosotros.', 'code' => 'Código', 'ref' => 'Proyecto', 'client' => 'Cliente', 'fair' => 'Evento', 'issued' => 'Emitido el', 'total' => 'Importe del contrato', 'lang' => 'Idioma', 'back' => 'standarte.es');
header('X-Robots-Tag: noindex');
?>
<!doctype html>
<html lang="<?= $lang ?>"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title><?= vf_h($L['title']) ?> · Standarte</title>
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #f6f6f2; color: #1b1b1a; margin: 0; padding: 32px 16px; }
	.box { max-width: 560px; margin: 0 auto; background: #fff; border: 1px solid #e2e0d7; border-radius: 10px; padding: 26px 28px; }
	h1 { font-size: 20px; margin: 0 0 4px; }
	.sub { color: #555; margin: 0 0 18px; font-size: 14px; }
	.ok h1 { color: #2e7d32; } .ko h1 { color: #c62828; }
	dl { display: grid; grid-template-columns: auto 1fr; gap: 8px 18px; margin: 0; font-size: 15px; }
	dt { color: #777; } dd { margin: 0; font-weight: 700; overflow-wrap: anywhere; }
	.code { font-size: 18px; letter-spacing: .06em; }
	.foot { text-align: center; color: #888; font-size: 12px; margin-top: 22px; }
	.foot a { color: #888; }
	form { display: flex; gap: 8px; margin-top: 14px; }
	input { flex: 1; font: inherit; padding: 9px 10px; border: 1px solid #cfcdc4; border-radius: 6px; }
	button { font: inherit; font-weight: 700; background: #ffc800; border: none; border-radius: 6px; padding: 9px 16px; cursor: pointer; }
</style></head>
<body>
<div class="box <?= $p ? 'ok' : 'ko' ?>">
	<?php if ($p): ?>
		<h1>✓ <?= vf_h($L['ok']) ?></h1>
		<p class="sub"><?= vf_h($L['ok_sub']) ?></p>
		<dl>
			<dt><?= vf_h($L['code']) ?></dt><dd class="code"><?= vf_h($code) ?></dd>
			<dt><?= vf_h($L['ref']) ?></dt><dd><?= vf_h($p['ref']) ?></dd>
			<dt><?= vf_h($L['client']) ?></dt><dd><?= vf_h(!empty($meta['client']) ? $meta['client'] : (!empty($p['billing_company']) ? $p['billing_company'] : $p['client_name'])) ?></dd>
			<?php if (!empty($meta['fair'])): ?><dt><?= vf_h($L['fair']) ?></dt><dd><?= vf_h($meta['fair']) ?></dd><?php endif; ?>
			<dt><?= vf_h($L['issued']) ?></dt><dd><?= vf_h(!empty($p['contract_issued_at']) ? date('d/m/Y H:i', strtotime($p['contract_issued_at'])) . ' UTC' : '—') ?></dd>
			<?php if (isset($meta['total_eur'])): ?><dt><?= vf_h($L['total']) ?></dt><dd><?= vf_h(number_format((float) $meta['total_eur'], 2, $lang === 'en' ? '.' : ',', $lang === 'en' ? ',' : '.')) ?> €</dd><?php endif; ?>
			<dt><?= vf_h($L['lang']) ?></dt><dd><?= $lang === 'en' ? 'English' : 'Español' ?></dd>
		</dl>
	<?php else: ?>
		<h1>✕ <?= vf_h($L['ko']) ?></h1>
		<p class="sub"><?= vf_h($L['ko_sub']) ?></p>
		<form method="get"><input name="c" value="<?= vf_h($code) ?>" placeholder="SC-2026-XXXXXXXX" autofocus><button type="submit">→</button></form>
	<?php endif; ?>
	<p class="foot"><a href="https://standarte.es">STANDARTE</a> · <?= vf_h($L['back']) ?></p>
</div>
</body></html>
