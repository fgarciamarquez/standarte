<?php
/*
 * Aviso por email de la zona privada de proyecto (Standarte).
 * Al pulsar "Enviar":
 *   - role=client   -> avisa al interlocutor interno de que el cliente comentó.
 *   - role=internal -> avisa al cliente (con enlace) de que hay respuestas.
 *   - role=visit    -> lo dispara la propia página al abrirla el CLIENTE: registra la
 *                      visita y, como mucho una vez cada 6 h por proyecto (lo decide la
 *                      BD de forma atómica), avisa al interlocutor de que la ha visto.
 * Lee el proyecto vía la RPC get_client_project (SECURITY DEFINER): el token es
 * la autorización, así que basta la clave publishable (SUPABASE_KEY) y no se
 * necesita la service key. Reutiliza el mailer SMTP de campañas.
 */
session_start();
header('Content-Type: application/json; charset=utf-8');

function pn_post($k) { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : ''; }
function pn_admin_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }

$token = pn_post('token');
$role  = pn_post('role');
if ($token === '' || !preg_match('/^[a-f0-9]{20,64}$/', $token) || !in_array($role, array('client', 'internal', 'visit', 'approved'), true)) {
	echo json_encode(array('ok' => false, 'error' => 'bad_request'));
	exit;
}
/* Si quien abre la página es el propio equipo (sesión de admin), no es una visita
 * del cliente: ni se registra ni se avisa. */
if ($role === 'visit' && pn_admin_authed()) {
	echo json_encode(array('ok' => true, 'skipped' => 'admin'));
	exit;
}
/* El aviso "hemos respondido" solo lo puede disparar el equipo autenticado
 * (ahora que la propia página es editable en modo admin), no cualquiera con
 * el enlace. El aviso "el cliente comentó" (role=client) sigue abierto: lo
 * dispara el propio visitante desde su comentario. */
if ($role === 'internal' && !pn_admin_authed()) {
	echo json_encode(array('ok' => false, 'error' => 'unauthorized'));
	exit;
}

require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/email_campaing/mailer.php';

/* Visita del cliente: touch_client_visit registra la visita y devuelve true SOLO si
 * toca avisar (nunca en el piloto público, y máximo una vez cada 6 h por proyecto).
 * La decisión vive en la BD para que dos pestañas abiertas a la vez no dupliquen. */
if ($role === 'visit') {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/rpc/touch_client_visit');
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
	$vr = curl_exec($ch);
	curl_close($ch);
	if (trim((string) $vr) !== 'true') {
		echo json_encode(array('ok' => true, 'notified' => false));
		exit;
	}
}

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

/* Primera imagen del proyecto, servida optimizada por la transformación de imagen de
 * Supabase Storage (redimensiona/comprime en el CDN a ~640px): el correo NO embebe la
 * imagen (solo la referencia), así que pesa muy poco. */
$firstImgUrl = '';
if (!empty($p['media']) && is_array($p['media'])) {
	foreach ($p['media'] as $m) {
		if (isset($m['type']) && $m['type'] === 'image' && !empty($m['src'])) { $firstImgUrl = $m['src']; break; }
	}
}
$firstImgOpt = '';
if ($firstImgUrl !== '') {
	$firstImgOpt = (strpos($firstImgUrl, '/storage/v1/object/public/') !== false)
		? str_replace('/storage/v1/object/public/', '/storage/v1/render/image/public/', $firstImgUrl) . (strpos($firstImgUrl, '?') === false ? '?' : '&') . 'width=640&quality=62&resize=contain'
		: $firstImgUrl;
}

/* Últimos comentarios para incrustar en el aviso. */
$commentsHtml = '';
if (!empty($p['comments']) && is_array($p['comments'])) {
	$recent = array_slice($p['comments'], -25);
	foreach ($recent as $c) {
		$who = ($c['author'] === 'client') ? htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') : 'Standarte';
		$commentsHtml .= "<p style='margin:0 0 8px;'><strong>" . $who . ":</strong> " . htmlspecialchars($c['body'], ENT_QUOTES, 'UTF-8') . "</p>";
	}
}


/* Aprobación del presupuesto: la dispara la propia página del CLIENTE justo después
 * de aprobar. Todo el contenido (conceptos, oferta congelada, impuestos, total) se lee
 * de la BD vía get_client_project, nunca del POST: con el token no se puede inyectar
 * ni un céntimo. Solo avisa si el proyecto ESTÁ aprobado de verdad. */
if ($role === 'approved') {
	if (empty($p['approved'])) {
		echo json_encode(array('ok' => false, 'error' => 'not_approved'));
		exit;
	}
	$subtotal = 0.0; $rowsHtml = '';
	$cell = "padding:6px 8px;border-bottom:1px solid #e6e6e0;";
	if (!empty($p['budget']) && is_array($p['budget'])) {
		foreach ($p['budget'] as $b) {
			$a = (float) str_replace(',', '.', (string) (isset($b['amount']) ? $b['amount'] : 0));
			$subtotal += $a;
			$c = isset($b['concept']['es']) ? $b['concept']['es'] : (isset($b['concept']['en']) ? $b['concept']['en'] : '');
			$rowsHtml .= "<tr><td style='" . $cell . "'>" . htmlspecialchars($c, ENT_QUOTES, 'UTF-8') . "</td>"
				. "<td style='" . $cell . "text-align:right;white-space:nowrap;'>" . number_format($a, 2, ',', '.') . "&nbsp;€</td></tr>";
		}
	}
	/* Oferta congelada al aprobar: entera hasta la fecha límite y −1.000 €/semana
	 * después (misma regla que la página y que cron_oferta.php). */
	$disc = 0.0;
	if (!empty($p['approved_with_offer']) && !empty($p['discount']['amount'])) {
		$dAmount = (float) str_replace(',', '.', (string) $p['discount']['amount']);
		$dDeadline = !empty($p['discount']['deadline']) ? strtotime($p['discount']['deadline'] . ' 23:59:59') : null;
		$ts = !empty($p['approved_at']) ? strtotime($p['approved_at']) : time();
		if ($dAmount > 0) {
			$disc = (!$dDeadline || $ts <= $dDeadline) ? $dAmount : max(0.0, $dAmount - 1000.0 * ceil(($ts - $dDeadline) / 604800.0));
		}
	}
	$ivaRate  = isset($p['iva_rate'])  ? (float) $p['iva_rate']  : 0.21;
	$irpfRate = isset($p['irpf_rate']) ? (float) $p['irpf_rate'] : 0.15;
	$baseImp = $subtotal - $disc;
	$iva  = $baseImp * $ivaRate;
	$irpf = $baseImp * $irpfRate;
	$totalAp = $baseImp + $iva - $irpf;
	$fmtE = function ($n) { return number_format($n, 2, ',', '.') . '&nbsp;€'; };
	$sumRow = function ($label, $val, $bold = false) use ($cell) {
		$w = $bold ? 'font-weight:bold;font-size:16px;' : '';
		return "<tr><td style='" . $cell . $w . "'>" . $label . "</td><td style='" . $cell . $w . "text-align:right;white-space:nowrap;'>" . $val . "</td></tr>";
	};
	$tabla = "<table style='width:100%;border-collapse:collapse;font-size:14px;'>"
		. "<tr><th style='" . $cell . "text-align:left;'>Concepto</th><th style='" . $cell . "text-align:right;'>Importe</th></tr>"
		. $rowsHtml;
	if ($disc > 0) {
		$tabla .= $sumRow('Subtotal', $fmtE($subtotal));
		$tabla .= $sumRow('Descuento por pronta decisión (congelado al aprobar)', '− ' . $fmtE($disc));
	}
	$tabla .= $sumRow('Base imponible', $fmtE($baseImp));
	if ($ivaRate > 0)  { $tabla .= $sumRow('IVA (' . rtrim(rtrim(number_format($ivaRate * 100, 2, ',', ''), '0'), ',') . '%)', '+ ' . $fmtE($iva)); }
	if ($irpfRate > 0) { $tabla .= $sumRow('IRPF (−' . rtrim(rtrim(number_format($irpfRate * 100, 2, ',', ''), '0'), ',') . '%)', '− ' . $fmtE($irpf)); }
	$tabla .= $sumRow('TOTAL APROBADO', $fmtE($totalAp), true);
	$tabla .= '</table>';
	$when = !empty($p['approved_at']) ? date('d/m/Y H:i', strtotime($p['approved_at'])) : date('d/m/Y H:i');
	$conOferta = !empty($p['approved_with_offer']) ? ' (con oferta por pronta decisión)' : '';

	$to = ($interEmail !== '' && filter_var($interEmail, FILTER_VALIDATE_EMAIL)) ? $interEmail : 'info@standarte.es';
	$subject = 'Presupuesto APROBADO — ' . $p['ref'] . ' · ' . $clientName . ' · ' . number_format($totalAp, 2, ',', '.') . ' €';
	$intro = '<strong>' . htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') . '</strong> ha APROBADO el presupuesto del proyecto <strong>'
		. htmlspecialchars($p['ref'], ENT_QUOTES, 'UTF-8') . '</strong>' . $conOferta . ' el ' . $when . '.';
	/* La tabla viaja en el mismo hueco (caja gris) que el hilo de comentarios. */
	$commentsHtml = $tabla;
	$firstImgOpt = '';
} elseif ($role === 'client') {
	$to = $interEmail;
	$subject = 'Nuevos comentarios de ' . $clientName . ' — ' . $p['ref'];
	$intro = '<strong>' . htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') . '</strong> ha enviado comentarios sobre el proyecto <strong>' . htmlspecialchars($p['ref'], ENT_QUOTES, 'UTF-8') . '</strong>.';
} elseif ($role === 'visit') {
	/* Aviso interno de "visto": sin hilo de comentarios ni imagen, solo el hecho. */
	$to = $interEmail;
	$subject = 'El cliente ha abierto el proyecto — ' . $p['ref'];
	$intro = '<strong>' . htmlspecialchars($clientName, ENT_QUOTES, 'UTF-8') . '</strong> acaba de abrir la presentación del proyecto <strong>' . htmlspecialchars($p['ref'], ENT_QUOTES, 'UTF-8') . '</strong>.';
	$commentsHtml = '';
	$firstImgOpt = '';
} else {
	$to = isset($p['client_email']) ? $p['client_email'] : '';
	/* Primera presentación (sin conversación todavía) vs. actualización con respuestas:
	 * el texto de "hemos respondido a los comentarios" no encaja cuando aún no hay hilo. */
	if ($commentsHtml === '') {
		$subject = 'Su proyecto está listo para consultar — ' . $p['ref'];
		$intro = 'Hemos preparado la presentación de su proyecto y ya puede consultarla.';
	} else {
		$subject = 'Standarte ha actualizado el proyecto — ' . $p['ref'];
		$intro = 'Standarte ha respondido a los últimos comentarios y el proyecto se ha actualizado.';
	}
}
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
	echo json_encode(array('ok' => false, 'error' => 'no_recipient'));
	exit;
}

$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
	. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;text-align:center;'>"
	. "<p style='text-align:center;margin:0 0 6px;'>" . $intro . "</p>"
	. "<p style='text-align:center;margin:0 0 16px;font-weight:bold;font-size:17px;'>" . htmlspecialchars($titleEs, ENT_QUOTES, 'UTF-8') . "</p>"
	. ($commentsHtml !== '' ? "<div style='margin:16px auto;padding:14px;background:#f6f6f2;border-radius:8px;text-align:left;max-width:560px;'>" . $commentsHtml . "</div>" : "")
	. "<p style='text-align:center;margin:20px 0 0;'><a href='" . htmlspecialchars($projectUrl, ENT_QUOTES, 'UTF-8') . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>Abrir el proyecto</a></p>"
	. ($firstImgOpt !== '' ? "<p style='text-align:center;margin:24px 0 0;'><a href='" . htmlspecialchars($projectUrl, ENT_QUOTES, 'UTF-8') . "'><img src='" . htmlspecialchars($firstImgOpt, ENT_QUOTES, 'UTF-8') . "' width='600' alt='Vista del proyecto' style='display:block;width:100%;max-width:600px;height:auto;margin:0 auto;border-radius:8px;border:1px solid #e6e6e0;' /></a></p>" : "")
	. "<p style='text-align:center;font-size:12px;color:#888;margin-top:20px;'>Sistema de seguimiento de proyectos 100% Asegurado.<br><a href='https://standarte.es' style='color:#888;text-decoration:none;'>https://standarte.es</a></p>"
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
