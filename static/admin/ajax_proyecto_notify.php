<?php
/*
 * Aviso por email de la zona privada de proyecto (Standarte).
 * Al pulsar "Enviar":
 *   - role=client   -> avisa al interlocutor interno de que el cliente comentó.
 *   - role=internal -> avisa al cliente (con enlace) de que hay respuestas.
 * Lee el proyecto vía la RPC get_client_project (SECURITY DEFINER): el token es
 * la autorización, así que basta la clave publishable (SUPABASE_KEY) y no se
 * necesita la service key. Reutiliza el mailer SMTP de campañas.
 */
header('Content-Type: application/json; charset=utf-8');

function pn_post($k) { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : ''; }

$token = pn_post('token');
$role  = pn_post('role');
if ($token === '' || !preg_match('/^[a-f0-9]{20,64}$/', $token) || !in_array($role, array('client', 'internal'), true)) {
	echo json_encode(array('ok' => false, 'error' => 'bad_request'));
	exit;
}

require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/email_campaing/mailer.php';

/* Proyecto por token vía RPC (la función valida el token; devuelve null si no existe). */
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/rpc/get_client_project');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('p_token' => $token)));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'apikey: ' . SUPABASE_KEY,
	'Authorization: Bearer ' . SUPABASE_KEY,
	'Content-Type: application/json'
));
$raw = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$p = ($code === 200 && $raw !== false) ? json_decode($raw, true) : null;
if (!is_array($p) || empty($p['ref'])) {
	echo json_encode(array('ok' => false, 'error' => 'not_found'));
	exit;
}

$clientName  = isset($p['client_name']) ? $p['client_name'] : '';
$titleEs     = isset($p['title']['es']) ? $p['title']['es'] : $p['ref'];
$interEmail  = isset($p['interlocutor']['email']) ? $p['interlocutor']['email'] : '';
$projectUrl  = 'https://standarte.es/proyecto?t=' . $token;

/* Últimos comentarios para incrustar en el aviso. */
$commentsHtml = '';
if (!empty($p['comments']) && is_array($p['comments'])) {
	$recent = array_slice($p['comments'], -25);
	foreach ($recent as $c) {
		$who = ($c['author'] === 'client') ? htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') : 'Standarte';
		$commentsHtml .= "<p style='margin:0 0 8px;'><strong>" . $who . ":</strong> " . htmlspecialchars($c['body'], ENT_QUOTES, 'UTF-8') . "</p>";
	}
}

if ($role === 'client') {
	$to = $interEmail;
	$subject = 'Nuevos comentarios de ' . $clientName . ' — ' . $p['ref'];
	$intro = '<strong>' . htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') . '</strong> ha enviado comentarios sobre el proyecto <strong>' . htmlspecialchars($p['ref'], ENT_QUOTES, 'UTF-8') . '</strong>.';
} else {
	$to = isset($p['client_email']) ? $p['client_email'] : '';
	$subject = 'Standarte ha actualizado tu proyecto — ' . $p['ref'];
	$intro = 'Hemos respondido a tus comentarios y actualizado el proyecto <strong>' . htmlspecialchars($titleEs, ENT_QUOTES, 'UTF-8') . '</strong>.';
}
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
	echo json_encode(array('ok' => false, 'error' => 'no_recipient'));
	exit;
}

$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
	. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
	. "<p>" . $intro . "</p>"
	. ($commentsHtml !== '' ? "<div style='margin:16px 0;padding:14px;background:#f6f6f2;border-radius:8px;'>" . $commentsHtml . "</div>" : "")
	. "<p style='margin-top:20px;'><a href='" . htmlspecialchars($projectUrl, ENT_QUOTES, 'UTF-8') . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>Abrir el proyecto</a></p>"
	. "<p style='font-size:12px;color:#888;margin-top:20px;'>Standarte · standarte.es</p>"
	. "</body></html>";

$sent = false;
try {
	$cfg = require __DIR__ . '/email_campaing/config.php';
	$sent = campaign_send_smtp($cfg, $to, $subject, $html);
} catch (Exception $e) {
	$sent = false;
}
if (!$sent) {
	@mail($to, $subject, $html, "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\n");
}

echo json_encode(array('ok' => true));
