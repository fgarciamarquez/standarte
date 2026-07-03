<?php
/*
 * Envío puntual del "proyecto piloto público" a la lista de "Últimos accesos
 * desde el correo" (aperturas humanas de email_clicks).
 * - Reutiliza el mailer SMTP de campañas (campaign_send_mail): respeta bajas y
 *   rebotes (RGPD/LSSI) y registra el send-log.
 * - Envía 1-a-1 por AJAX desde el navegador (barra de progreso, sin timeouts).
 * - Login con la misma contraseña/sesión que el resto del panel admin.
 * Página de un solo uso: se puede borrar tras la campaña.
 */
session_start();
$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/mailer.php';
require_once dirname(dirname(__DIR__)) . '/supabase-config.php';

const PILOT_URL     = 'https://standarte.es/proyecto?t=0462b5e7da714897aec1a39c3acc09a5';
const PILOT_SUBJECT = 'Lo que ve el cliente es lo que se construye — sistema de proyectos auditado de Standarte';
const PILOT_TEST_TO = 'pgarciamarquez@yahoo.es';

function pc_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function pc_post($k, $d = '') { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : $d; }
function pc_json($a) { header('Content-Type: application/json; charset=utf-8'); echo json_encode($a); exit; }
function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

/* ¿Apertura humana? (mismo filtro que "Últimos accesos desde el correo"). */
function pc_click_is_human($c) {
	$email = isset($c['email']) ? trim($c['email']) : '';
	if ($email === '' || strcasecmp($email, 'anonymous') === 0 || strpos($email, '@') === false) return false;
	$legit = array('email_campaing', 'main-cta-button', 'footer-contact', 'footer-web');
	if (!in_array(isset($c['source']) ? $c['source'] : '', $legit, true)) return false;
	$ua = strtolower(trim(isset($c['user_agent']) ? $c['user_agent'] : ''));
	if ($ua === '') return false;
	foreach (array('bot', 'crawl', 'spider', 'proxy', 'preview', 'scan', 'mimecast', 'proofpoint', 'barracuda', 'googleimageproxy', 'python', 'curl/', 'wget', 'headless', 'monitor') as $b) {
		if (strpos($ua, $b) !== false) return false;
	}
	return true;
}

/* Lista deduplicada de destinatarios de "Últimos accesos desde el correo". */
function pc_recipients() {
	if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) return array();
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/email_clicks?select=email,source,user_agent,clicked_at&order=clicked_at.desc&limit=1000');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('apikey: ' . SUPABASE_KEY, 'Authorization: Bearer ' . SUPABASE_KEY));
	$all = json_decode(curl_exec($ch), true);
	curl_close($ch);
	$out = array();
	if (is_array($all) && !isset($all['code'])) {
		foreach ($all as $c) {
			if (!pc_click_is_human($c)) continue;
			$em = strtolower(trim($c['email']));
			if (!isset($out[$em])) $out[$em] = $em;
		}
	}
	return array_values($out);
}

/* HTML del correo del piloto, con pie de baja personalizado por destinatario. */
function pc_email_html($config, $recipientEmail) {
	$url = PILOT_URL;
	$unsub = '';
	if (defined('UNSUBSCRIBE_SECRET_SALT')) {
		$emailB64 = base64_encode($recipientEmail);
		$token = md5($recipientEmail . UNSUBSCRIBE_SECRET_SALT);
		$link = $config['site_url'] . '/unsubscribe.php?email=' . urlencode($emailB64) . '&token=' . urlencode($token);
		$unsub = "<p style=\"margin:14px 0 0;font-size:11px;line-height:1.5;color:#999;text-align:center;\">En cumplimiento de la LSSI-CE y el RGPD, si no deseas recibir más correos, puedes <a href=\"" . h($link) . "\" style=\"color:#999;text-decoration:underline;\">darte de baja aquí</a>.</p>";
	}
	return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
		. '<body style="margin:0;padding:0;background:#f4f3ee;">'
		. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3ee;"><tr><td align="center" style="padding:28px 14px;">'
		. '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e6e6e0;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1b1b1a;">'
		. '<tr><td style="background:#1b1b1a;padding:22px 28px;text-align:center;"><span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:.28em;">STANDARTE</span></td></tr>'
		. '<tr><td style="padding:34px 34px 8px;text-align:center;">'
		. '<p style="margin:0 0 6px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#b58a00;font-weight:bold;">Diseño y construcción de stands</p>'
		. '<h1 style="margin:0 0 18px;font-size:25px;line-height:1.25;color:#1b1b1a;">Lo que ve el cliente es<br>exactamente lo que se construye</h1>'
		. '<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#333;">En Standarte hemos desarrollado un <strong>sistema propio y exclusivo de gestión de proyectos, auditado al 100%</strong>, diseñado con un único objetivo: <strong>garantizar que lo que el cliente aprueba en pantalla es, sin sorpresas, lo que levantamos en la feria.</strong></p>'
		. '<p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#333;">Cada proyecto reúne en un mismo espacio la propuesta gráfica, el modelo 3D interactivo, la memoria de producción y el presupuesto detallado. El cliente lo revisa, comenta y aprueba — y todo queda registrado y trazable de principio a fin.</p>'
		. '</td></tr>'
		. '<tr><td style="padding:0 34px 6px;text-align:center;"><a href="' . h($url) . '" style="display:inline-block;background:#1b1b1a;color:#ffffff;padding:15px 34px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;">Ver proyecto de ejemplo →</a>'
		. '<p style="margin:14px 0 0;font-size:13px;color:#888;">Explore un proyecto piloto completo, tal y como lo ve nuestro cliente.</p></td></tr>'
		. '<tr><td style="padding:26px 34px 34px;">'
		. '<p style="margin:0;padding-top:20px;border-top:1px solid #e6e6e0;font-size:12px;line-height:1.6;color:#888;text-align:center;">Sistema de seguimiento de proyectos 100% Asegurado.<br><a href="https://standarte.es" style="color:#888;text-decoration:none;">https://standarte.es</a></p>'
		. $unsub
		. '</td></tr>'
		. '</table></td></tr></table></body></html>';
}

/* ---------- Login / logout ---------- */
if (isset($_POST['login_password'])) {
	if (isset($config['login_password_hash']) && password_verify($_POST['login_password'], $config['login_password_hash'])) {
		$_SESSION['standarte_email_campaing_auth'] = true;
	}
	header('Location: pilot_campaign.php'); exit;
}
if (isset($_GET['logout'])) { unset($_SESSION['standarte_email_campaing_auth']); header('Location: pilot_campaign.php'); exit; }

/* ---------- AJAX: enviar UN correo ---------- */
if (pc_post('action') === 'send_one') {
	if (!pc_authed()) pc_json(array('ok' => false, 'error' => 'no autorizado'));
	$email = strtolower(pc_post('email'));
	if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) pc_json(array('ok' => false, 'email' => $email, 'error' => 'formato inválido'));
	$verr = '';
	if (!campaign_is_valid_email_advanced($email, $verr)) pc_json(array('ok' => false, 'email' => $email, 'error' => $verr));
	$html = pc_email_html($config, $email);
	$sent = false;
	try { $sent = campaign_send_mail($config, $email, PILOT_SUBJECT, $html); } catch (Exception $e) { $sent = false; }
	pc_json(array('ok' => $sent ? true : false, 'email' => $email, 'error' => $sent ? '' : 'no enviado (baja/rebote o fallo SMTP; ver send-log)'));
}

/* ---------- AJAX: lista de destinatarios ---------- */
if (pc_post('action') === 'recipients') {
	if (!pc_authed()) pc_json(array('ok' => false, 'error' => 'no autorizado'));
	$r = pc_recipients();
	pc_json(array('ok' => true, 'recipients' => $r, 'total' => count($r)));
}

/* ---------- AJAX: lista de PENDIENTES (los que NO recibieron envío con éxito) ----------
 * Pendiente = destinatario de "Últimos accesos" sin upsert reciente en contacts
 * (los envíos con éxito hacen upsert con updated_at; así excluimos a los ya enviados).
 * El reenvío 1-a-1 se hace desde el navegador, espaciado, con sesión admin. */
function pc_recent_sent_set($cutoffMinutes) {
	$set = array();
	if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) return $set;
	$iso = gmdate('Y-m-d\TH:i:s\Z', time() - $cutoffMinutes * 60);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/contacts?select=email&updated_at=gte.' . urlencode($iso) . '&limit=5000');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('apikey: ' . SUPABASE_KEY, 'Authorization: Bearer ' . SUPABASE_KEY));
	$rows = json_decode(curl_exec($ch), true);
	curl_close($ch);
	if (is_array($rows)) foreach ($rows as $r) { if (!empty($r['email'])) $set[strtolower($r['email'])] = true; }
	return $set;
}
if (pc_post('action') === 'pending') {
	if (!pc_authed()) pc_json(array('ok' => false, 'error' => 'no autorizado'));
	$mins = (int) pc_post('within_minutes', '180');
	if ($mins < 10) $mins = 10;
	$recent = pc_recent_sent_set($mins);
	$pending = array();
	foreach (pc_recipients() as $e) { if (!isset($recent[$e])) $pending[] = $e; }
	pc_json(array('ok' => true, 'recipients' => $pending, 'total' => count($pending)));
}

$total = pc_authed() ? count(pc_recipients()) : 0;
?>
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Campaña piloto · Admin Standarte</title>
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
	a { color: #ffc800; } h1, h2, h3 { font-weight: 700; }
	.wrap { max-width: 760px; margin: 0 auto; }
	.card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
	input { width: 100%; box-sizing: border-box; background: #12141a; border: 1px solid #333; color: #eee; padding: 9px 10px; font-family: inherit; font-size: 14px; border-radius: 5px; margin-bottom: 10px; }
	label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #9aa; }
	button { background: #ffc800; color: #111; border: none; padding: 10px 18px; font-family: inherit; font-weight: 700; border-radius: 5px; cursor: pointer; }
	button.danger { background: #c62828; color: #fff; }
	button:disabled { opacity: .5; cursor: not-allowed; }
	.hint { font-size: 12px; color: #888; margin: 6px 0 12px; }
	.msg { background: #14331f; border: 1px solid #2e7d32; color: #a5d6a7; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
	.bar { height: 10px; background: #12141a; border: 1px solid #333; border-radius: 6px; overflow: hidden; margin: 10px 0; }
	.bar > span { display: block; height: 100%; width: 0; background: #4caf50; transition: width .2s; }
	.log { max-height: 260px; overflow-y: auto; font-size: 12px; background: #12141a; border: 1px solid #2c3038; border-radius: 6px; padding: 10px; margin-top: 10px; }
	.log div { padding: 2px 0; border-bottom: 1px solid #23262c; }
	.ok { color: #7fce8a; } .ko { color: #e57373; }
	.pill { display:inline-block; background: rgba(255,200,0,.14); color: #ffc800; border: 1px solid #7a6413; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 700; }
</style></head>
<body><div class="wrap">
<?php if (!pc_authed()): ?>
	<h1>Campaña piloto · Admin</h1>
	<form method="post" class="card" style="max-width:360px">
		<label>Contraseña</label>
		<input type="password" name="login_password" required autofocus>
		<button type="submit">Entrar</button>
	</form>
<?php else: ?>
	<div style="display:flex;justify-content:space-between;align-items:center">
		<h1>Campaña: proyecto piloto público</h1>
		<a href="pilot_campaign.php?logout=1">Salir</a>
	</div>

	<div class="card">
		<h3>1 · Correo de prueba</h3>
		<p class="hint">Envía el correo a una sola dirección para revisarlo antes del envío masivo.</p>
		<input type="email" id="testEmail" value="<?= h(PILOT_TEST_TO) ?>">
		<button id="btnTest" onclick="sendTest()">Enviar prueba</button>
		<span id="testMsg" class="hint"></span>
	</div>

	<div class="card">
		<h3>2 · Envío a «Últimos accesos desde el correo»</h3>
		<p class="hint">Destinatarios (aperturas humanas, deduplicados): <span class="pill"><?= (int) $total ?> correos</span>.
			Se respetan bajas y rebotes automáticamente. Se envía uno a uno; no cierres la pestaña hasta terminar.</p>
		<div class="bar"><span id="barFill"></span></div>
		<p class="hint"><span id="progTxt">0 / <?= (int) $total ?></span> · <span class="ok" id="okTxt">0 enviados</span> · <span class="ko" id="koTxt">0 fallidos</span></p>
		<button class="danger" id="btnAll" onclick="sendAll()">Enviar a los <?= (int) $total ?></button>
		<div class="log" id="log" style="display:none"></div>
	</div>

	<div class="card">
		<h3>3 · Reenviar pendientes (poco a poco, ~1 h)</h3>
		<p class="hint">Reenvía solo a los que NO recibieron el correo con éxito (p. ej. los que fallaron por el límite antispam), espaciando <strong>~70 s</strong> cada envío para no volver a saturar. Respeta bajas/rebotes y no repite a los ya enviados. <strong>Deja esta pestaña abierta hasta que termine.</strong></p>
		<div class="bar"><span id="pBarFill"></span></div>
		<p class="hint"><span id="pProgTxt">—</span> · <span class="ok" id="pOkTxt">0 enviados</span> · <span class="ko" id="pKoTxt">0 fallidos</span></p>
		<button class="danger" id="btnPending" onclick="sendPending()">Reenviar pendientes</button>
		<div class="log" id="pLog" style="display:none"></div>
	</div>

	<script>
		var sending = false;
		function post(data) {
			return fetch('pilot_campaign.php', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() }).then(function (r) { return r.json(); });
		}
		function sendTest() {
			var email = document.getElementById('testEmail').value.trim();
			var msg = document.getElementById('testMsg'), btn = document.getElementById('btnTest');
			if (!email) { msg.textContent = 'Escribe una dirección.'; return; }
			btn.disabled = true; msg.textContent = 'Enviando…'; msg.className = 'hint';
			post({ action: 'send_one', email: email }).then(function (r) {
				btn.disabled = false;
				if (r.ok) { msg.textContent = '✓ Enviado a ' + email; msg.className = 'hint ok'; }
				else { msg.textContent = '✗ ' + (r.error || 'error') + ' (' + email + ')'; msg.className = 'hint ko'; }
			}).catch(function () { btn.disabled = false; msg.textContent = '✗ Error de red'; msg.className = 'hint ko'; });
		}
		function logLine(txt, cls) {
			var log = document.getElementById('log'); log.style.display = 'block';
			var d = document.createElement('div'); d.className = cls || ''; d.textContent = txt; log.insertBefore(d, log.firstChild);
		}
		async function sendAll() {
			if (sending) return;
			if (!confirm('¿Enviar el correo del proyecto piloto a los <?= (int) $total ?> destinatarios de «Últimos accesos»?\n\nSe respetan bajas y rebotes. No cierres la pestaña hasta que termine.')) return;
			sending = true;
			var btn = document.getElementById('btnAll'), btnT = document.getElementById('btnTest');
			btn.disabled = true; btnT.disabled = true;
			var res = await post({ action: 'recipients' });
			if (!res.ok) { logLine('No se pudo cargar la lista de destinatarios.', 'ko'); btn.disabled = false; btnT.disabled = false; sending = false; return; }
			var list = res.recipients, total = list.length, ok = 0, ko = 0;
			document.getElementById('progTxt').textContent = '0 / ' + total;
			for (var i = 0; i < total; i++) {
				var email = list[i];
				try {
					var r = await post({ action: 'send_one', email: email });
					if (r.ok) { ok++; logLine('✓ ' + email, 'ok'); }
					else { ko++; logLine('✗ ' + email + ' — ' + (r.error || 'error'), 'ko'); }
				} catch (e) { ko++; logLine('✗ ' + email + ' — error de red', 'ko'); }
				document.getElementById('progTxt').textContent = (i + 1) + ' / ' + total;
				document.getElementById('okTxt').textContent = ok + ' enviados';
				document.getElementById('koTxt').textContent = ko + ' fallidos';
				document.getElementById('barFill').style.width = Math.round(((i + 1) / total) * 100) + '%';
				await new Promise(function (res) { setTimeout(res, 350); });
			}
			logLine('— Fin: ' + ok + ' enviados, ' + ko + ' fallidos de ' + total + ' —', ok ? 'ok' : 'ko');
			btn.disabled = false; btnT.disabled = false; sending = false;
		}
		function plog(t, c) { var l = document.getElementById('pLog'); l.style.display = 'block'; var d = document.createElement('div'); d.className = c || ''; d.textContent = t; l.insertBefore(d, l.firstChild); }
		async function sendPending() {
			if (sending) return;
			var res = await post({ action: 'pending' });
			if (!res.ok) { alert('No se pudo cargar la lista de pendientes.'); return; }
			var list = res.recipients, total = list.length;
			if (!total) { alert('No hay pendientes: todos han recibido el correo con éxito.'); return; }
			if (!confirm('Reenviar el correo del piloto a ' + total + ' pendientes, espaciados ~70 s (tardará ~' + Math.round(total * 70 / 60) + ' min).\n\nNo cierres esta pestaña hasta que termine.')) return;
			sending = true;
			var btn = document.getElementById('btnPending'), btnA = document.getElementById('btnAll'), btnT = document.getElementById('btnTest');
			btn.disabled = true; btnA.disabled = true; btnT.disabled = true;
			var ok = 0, ko = 0;
			document.getElementById('pProgTxt').textContent = '0 / ' + total;
			for (var i = 0; i < total; i++) {
				var email = list[i];
				try {
					var r = await post({ action: 'send_one', email: email });
					if (r.ok) { ok++; plog('✓ ' + email, 'ok'); } else { ko++; plog('✗ ' + email + ' — ' + (r.error || 'error'), 'ko'); }
				} catch (e) { ko++; plog('✗ ' + email + ' — error de red', 'ko'); }
				document.getElementById('pProgTxt').textContent = (i + 1) + ' / ' + total;
				document.getElementById('pOkTxt').textContent = ok + ' enviados';
				document.getElementById('pKoTxt').textContent = ko + ' fallidos';
				document.getElementById('pBarFill').style.width = Math.round(((i + 1) / total) * 100) + '%';
				if (i < total - 1) await new Promise(function (res) { setTimeout(res, 70000); });
			}
			plog('— Fin: ' + ok + ' enviados, ' + ko + ' fallidos de ' + total + ' —', ok ? 'ok' : 'ko');
			btn.disabled = false; btnA.disabled = false; btnT.disabled = false; sending = false;
		}
	</script>
<?php endif; ?>
</div></body></html>
