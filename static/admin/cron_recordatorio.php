<?php
/*
 * Recordatorio semanal al cliente de que su proyecto sigue activo (Standarte).
 *
 * POR QUÉ (15/09/2026): muchos clientes dejan pasar semanas sin abrir el proyecto,
 * casi siempre porque el correo con el enlace de acceso se les pierde en la bandeja
 * de entrada. Cada miércoles se les vuelve a acercar el enlace, con una imagen del
 * proyecto y el precio final actualizado, en tono comercial y elegante.
 *
 * Lo dispara el workflow project_reminder.yml (GitHub Actions) los miércoles a las
 * 07:03 y 08:03 UTC; el script actúa cuando en Madrid es miércoles a partir de las 09:00
 * (GitHub retrasa a veces los crones varias horas). La doble llamada no duplica:
 * reminder_sent_at desduplica por proyecto.
 *
 * A quién se escribe: proyectos con email de cliente, presentados al cliente
 * (client_notified_at o una visita registrada), no aprobados, no paralizados, no demo,
 * con propuesta vigente y de menos de 180 días. Se para tras 12 recordatorios. NO se
 * omite por visitas recientes: last_client_visit también registra las entradas del
 * propio equipo al repasar el proyecto y no distingue quién fue (decisión 15/09/2026).
 */
header('Content-Type: text/plain; charset=utf-8');
if (!isset($_GET['token']) || $_GET['token'] !== 'TKN-recordatorio-9b1d6e3f2a') { http_response_code(403); die('forbidden'); }

date_default_timezone_set('Europe/Madrid');
/* Modo PRUEBA (?test=1[&ref=...]): manda el recordatorio de UN proyecto real —el indicado
 * por ref o el primero elegible— solo a la dirección interna de pruebas, con el asunto
 * marcado, y no anota nada en la base de datos. Nunca escribe a un cliente. */
$test = isset($_GET['test']) && $_GET['test'] === '1';
$testRef = isset($_GET['ref']) ? trim((string) $_GET['ref']) : '';
define('CR_TEST_TO', 'javier@standarte.es');
$force = $test || (isset($_GET['force']) && $_GET['force'] === '1');
/* Ventana: miércoles desde las 09:00 (Madrid) hasta el final del día. GitHub Actions retrasa
 * los crones programados a veces varias horas (16/09/2026: la llamada de las 08:03 UTC llegó
 * a las 12:23 UTC), así que la ventana no puede ser de una sola hora; reminder_sent_at evita
 * que una segunda llamada el mismo miércoles repita el envío. */
if (!$force && ((int) date('N') !== 3 || (int) date('G') < 9)) { die('fuera de ventana (Madrid ' . date('D H:i') . "), nada que hacer\n"); }

require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
require_once __DIR__ . '/email_campaing/mailer.php';

$today = date('Y-m-d');
$now = time();
$select = 'client_projects?select=id,ref,title_es,title_en,client_name,client_email,access_token,created_at,'
	. 'discount_amount,discount_deadline,iva_rate,irpf_rate,proposal_valid_until,last_client_visit,client_notified_at,reminder_sent_at,reminder_count,approved,paused,is_demo';
$rows = ($test && $testRef !== '')
	? cpx_rows($select . '&ref=eq.' . urlencode($testRef) . '&limit=1')
	: cpx_rows($select . '&approved=not.is.true&is_demo=not.is.true&paused=not.is.true&client_email=not.is.null'
		. '&and=(or(proposal_valid_until.is.null,proposal_valid_until.gte.' . $today . '),or(client_notified_at.not.is.null,last_client_visit.not.is.null))'
		. '&order=created_at.desc');
if ($test) { $rows = array_slice($rows, 0, 1); echo "MODO PRUEBA: destinatario " . CR_TEST_TO . ($testRef !== '' ? ", proyecto $testRef" : ', primer proyecto elegible') . "\n"; }

if (empty($rows)) { die("sin proyectos activos que recordar ($today)\n"); }

function cr_eur_es($n) { return number_format((float) $n, 2, ',', '.') . ' €'; }
function cr_eur_en($n) { return '€' . number_format((float) $n, 2, '.', ','); }
function cr_days_since($iso, $now) { if (empty($iso)) return null; $t = strtotime($iso); return $t ? ($now - $t) / 86400 : null; }

/* Precio final con la MISMA regla que la página del cliente (ProjectPresentation.svelte):
 * subtotal de conceptos, menos la oferta vigente (entera hasta la fecha límite; después
 * pierde 1.000 € por semana empezada), más IVA y menos IRPF según los tipos del proyecto. */
function cr_totals($p, $now) {
	$subtotal = 0.0;
	foreach (cpx_rows('client_project_budget_items?select=amount&project_id=eq.' . urlencode($p['id'])) as $it) $subtotal += (float) $it['amount'];
	$amount = isset($p['discount_amount']) ? (float) $p['discount_amount'] : 0.0;
	$disc = 0.0; $deadlineShown = null;
	if ($amount > 0) {
		$deadline = !empty($p['discount_deadline']) ? strtotime($p['discount_deadline'] . ' 23:59:59') : null;
		if (!$deadline || $now <= $deadline) { $disc = $amount; $deadlineShown = $deadline; }
		else {
			$weeks = (int) ceil(($now - $deadline) / 604800);
			$disc = max(0.0, $amount - 1000 * $weeks);
			$deadlineShown = $disc > 0 ? $deadline + $weeks * 604800 : null;
		}
	}
	$iva = isset($p['iva_rate']) && $p['iva_rate'] !== null && $p['iva_rate'] !== '' ? (float) $p['iva_rate'] : 0.21;
	$irpf = isset($p['irpf_rate']) && $p['irpf_rate'] !== null && $p['irpf_rate'] !== '' ? (float) $p['irpf_rate'] : 0.15;
	$base = $subtotal - $disc;
	return array('subtotal' => $subtotal, 'discount' => $disc, 'deadline' => $deadlineShown, 'base' => $base, 'iva' => $iva, 'irpf' => $irpf, 'total' => round($base + $base * $iva - $base * $irpf, 2));
}

/* Primera imagen del proyecto, servida por la transformación de imagen de Supabase
 * Storage cuando vive allí (ligera para el correo); si está en Drive, tal cual. */
function cr_first_image($projectId) {
	$media = cpx_rows('client_project_media?select=type,src,sort_order&project_id=eq.' . urlencode($projectId) . '&type=eq.image&order=sort_order.asc&limit=1');
	if (empty($media) || empty($media[0]['src'])) return '';
	$src = $media[0]['src'];
	return (strpos($src, '/storage/v1/object/public/') !== false)
		? str_replace('/storage/v1/object/public/', '/storage/v1/render/image/public/', $src) . (strpos($src, '?') === false ? '?' : '&') . 'width=640&quality=62&resize=contain'
		: $src;
}

$sentCount = 0; $skipped = 0;
foreach ($rows as $p) {
	$ref = isset($p['ref']) ? $p['ref'] : $p['id'];
	// Un proyecto aprobado ya no se recuerda nunca (tampoco en modo prueba): el cliente ya
	// decidió. Lo mismo para paralizados y pilotos.
	if (!empty($p['approved'])) { echo "$ref: proyecto aprobado, no se recuerda\n"; $skipped++; continue; }
	if (!empty($p['paused']) || !empty($p['is_demo'])) { echo "$ref: paralizado o demo, omitido\n"; $skipped++; continue; }
	if (!$test) {
		// Comprobaciones defensivas (además del filtro de la consulta).
		if (empty($p['client_notified_at']) && empty($p['last_client_visit'])) { echo "$ref: aún no presentado al cliente, omitido\n"; $skipped++; continue; }
		if (!empty($p['proposal_valid_until']) && $p['proposal_valid_until'] < $today) { echo "$ref: propuesta caducada, omitido\n"; $skipped++; continue; }
		$age = cr_days_since($p['created_at'], $now);
		if ($age !== null && $age > 180) { echo "$ref: más de 180 días, omitido\n"; $skipped++; continue; }
		if ((int) (isset($p['reminder_count']) ? $p['reminder_count'] : 0) >= 12) { echo "$ref: 12 recordatorios ya enviados, omitido\n"; $skipped++; continue; }
		$last = cr_days_since($p['reminder_sent_at'], $now);
		if ($last !== null && $last < 6) { echo "$ref: recordatorio enviado hace " . round($last, 1) . " días, omitido\n"; $skipped++; continue; }
	}
	$to = $test ? array(CR_TEST_TO) : cpx_emails(isset($p['client_email']) ? $p['client_email'] : '');
	if (!$to) { echo "$ref: sin email válido, omitido\n"; $skipped++; continue; }

	$t = cr_totals($p, $now);
	if ($t['subtotal'] <= 0) { echo "$ref: presupuesto vacío, omitido\n"; $skipped++; continue; }
	$titleEs = !empty($p['title_es']) ? $p['title_es'] : $ref;
	$titleEn = !empty($p['title_en']) ? $p['title_en'] : $titleEs;
	$url = 'https://standarte.es/proyecto?t=' . $p['access_token'];
	$img = cr_first_image($p['id']);
	$h = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
	$name = trim(isset($p['client_name']) ? $p['client_name'] : '');
	$saludoEs = $name !== '' ? 'Estimado/a ' . $h($name) . ':' : 'Estimado cliente:';
	$saludoEn = $name !== '' ? 'Dear ' . $h($name) . ',' : 'Dear client,';
	$taxEs = $t['iva'] > 0 ? 'IVA incluido' : 'sin IVA'; $taxEn = $t['iva'] > 0 ? 'VAT included' : 'VAT not applicable';
	$offerEs = ''; $offerEn = '';
	if ($t['discount'] > 0) {
		$hasta = $t['deadline'] ? ' hasta el ' . date('d/m/Y', $t['deadline']) : '';
		$until = $t['deadline'] ? ' until ' . date('j F Y', $t['deadline']) : '';
		$offerEs = " Este precio ya incluye la oferta por pronta decisión de " . cr_eur_es($t['discount']) . ", vigente" . $hasta . ".";
		$offerEn = " This price already includes the early-decision offer of " . cr_eur_en($t['discount']) . ", valid" . $until . ".";
	}

	$subject = ($test ? '[PRUEBA] ' : '') . 'Su proyecto ' . $ref . ' sigue activo / Your project is still active — ' . $titleEs;

	$es = "<p style='margin:0 0 12px;text-align:left;'>" . $saludoEs . "</p>"
		. "<p style='margin:0 0 12px;text-align:left;'>Su proyecto <strong>" . $h($titleEs) . "</strong> (" . $h($ref) . ") sigue en marcha: mantenemos la propuesta reservada y al día, con el prototipo y el presupuesto listos para que los revise cuando mejor le venga. "
		. "Como el enlace de acceso se pierde con facilidad entre los correos del día a día, se lo volvemos a acercar aquí.</p>";
	$en = "<p style='margin:0 0 12px;text-align:left;color:#555;'>" . $saludoEn . "</p>"
		. "<p style='margin:0 0 12px;text-align:left;color:#555;'>Your project <strong>" . $h($titleEn) . "</strong> (" . $h($ref) . ") is still active: we keep the proposal reserved and up to date, with the prototype and the quote ready for you to review whenever suits you. "
		. "As the access link is easily lost among everyday emails, here it is again.</p>";
	$imgHtml = $img !== '' ? "<p style='text-align:center;margin:18px 0 6px;'><a href='" . $h($url) . "'><img src='" . $h($img) . "' width='560' alt='" . $h($titleEs) . "' style='width:100%;max-width:560px;height:auto;border-radius:8px;border:0;'></a></p>" : '';
	$precioHtml = "<div style='margin:18px auto 6px;padding:16px 18px;background:#f5f4f0;border-radius:10px;max-width:560px;text-align:left;'>"
		. "<p style='margin:0 0 4px;font-size:13px;color:#777;'>Precio final actualizado · Updated final price</p>"
		. "<p style='margin:0;font-size:24px;font-weight:700;color:#1b1b1a;'>" . cr_eur_es($t['total']) . " <span style='font-size:13px;font-weight:400;color:#777;'>(" . $taxEs . " / " . $taxEn . ")</span></p>"
		. "<p style='margin:8px 0 0;font-size:13px;color:#555;'>" . trim($offerEs) . ($offerEs !== '' ? '<br>' : '') . "<span style='color:#777;'>" . trim($offerEn) . "</span></p>"
		. "</div>";
	$cierreEs = "<p style='margin:16px 0 0;text-align:left;'>Cualquier cambio que desee —antes o después de aprobar— se lo incorporamos: basta con anotarlo en la propia página del proyecto o escribir a su interlocutor.</p>";
	$cierreEn = "<p style='margin:8px 0 0;text-align:left;color:#555;'>Any change you wish, before or after approval, we will incorporate: just note it on the project page itself or write to your contact.</p>";

	$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. $es . $en . $imgHtml . $precioHtml
		. "<p style='text-align:center;margin:22px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>Abrir mi proyecto / Open my project</a></p>"
		. "<p style='text-align:center;font-size:12px;color:#888;margin:8px 0 0;'><a href='" . $h($url) . "' style='color:#888;'>" . $h($url) . "</a></p>"
		. $cierreEs . $cierreEn
		. "<p style='margin:28px 0 0;text-align:left;'>Un cordial saludo,<br>Best regards,<br><strong>Equipo de Standarte / The Standarte team</strong></p>"
		. "<p style='text-align:center;font-size:12px;color:#888;margin-top:24px;'>Le enviaremos este recordatorio semanal mientras el proyecto siga activo; si prefiere no recibirlo, responda a este correo y lo detenemos.<br>We will send this weekly reminder while the project remains active; if you would rather not receive it, reply to this email and we will stop it.<br><a href='https://standarte.es' style='color:#888;text-decoration:none;'>https://standarte.es</a></p>"
		. "</body></html>";

	$sent = false;
	try {
		$cfg = require __DIR__ . '/email_campaing/config.php';
		$sent = cpx_send_each($cfg, $to, $subject, $html);
	} catch (Exception $e) { $sent = false; }
	if (!$sent) {
		$sent = @mail(implode(', ', $to), $subject, $html, "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\n");
	}
	if ($sent) {
		if (!$test) cpx_sb('PATCH', 'client_projects?id=eq.' . urlencode($p['id']), array('reminder_sent_at' => date('c'), 'reminder_count' => (int) (isset($p['reminder_count']) ? $p['reminder_count'] : 0) + 1));
		$sentCount++;
		echo "$ref: recordatorio enviado a " . implode(', ', $to) . " (total " . cr_eur_es($t['total']) . ")\n";
	} else {
		echo "$ref: ERROR al enviar\n";
	}
}
echo "hecho: $sentCount recordatorio(s), $skipped omitido(s)\n";
