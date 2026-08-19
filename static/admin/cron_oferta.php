<?php
/*
 * Aviso automático del vencimiento de la oferta por pronta decisión (Standarte).
 *
 * Lo dispara el workflow offer_deadline.yml (GitHub Actions) a las 06:03 y 07:03
 * UTC; el script solo actúa cuando en Madrid son las 08:xx, así el aviso sale a
 * las 8 de la mañana todo el año sin tocar el cron al cambiar la hora. La doble
 * llamada no duplica nada: offer_notice_sent_at se marca en la BD por proyecto.
 *
 * Regla de negocio (la misma que aplica ProjectPresentation.svelte): la oferta se
 * descuenta entera hasta la fecha límite; después pierde 1.000 € por semana
 * transcurrida hasta extinguirse. Este correo avisa el DÍA del vencimiento a los
 * proyectos con oferta, aún no aprobados y con email de cliente.
 */
header('Content-Type: text/plain; charset=utf-8');
if (!isset($_GET['token']) || $_GET['token'] !== 'TKN-oferta-4e7b2a9c1f') { http_response_code(403); die('forbidden'); }

date_default_timezone_set('Europe/Madrid');
$force = isset($_GET['force']) && $_GET['force'] === '1';
if (!$force && (int) date('G') !== 8) { die('fuera de ventana (Madrid ' . date('H:i') . "), nada que hacer\n"); }

require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
require_once __DIR__ . '/email_campaing/mailer.php';

$today = date('Y-m-d');
$rows = cpx_rows('client_projects?select=id,ref,title_es,title_en,client_name,client_email,access_token,discount_amount,discount_deadline'
	. '&approved=not.is.true&is_demo=not.is.true&offer_notice_sent_at=is.null'
	. '&discount_amount=gt.0&discount_deadline=eq.' . $today);

if (empty($rows)) { die("sin ofertas que venzan hoy ($today)\n"); }

function co_eur_es($n) { return number_format((float) $n, ((float) $n == round($n) ? 0 : 2), ',', '.') . ' €'; }
function co_eur_en($n) { return '€' . number_format((float) $n, ((float) $n == round($n) ? 0 : 2), '.', ','); }

$sentCount = 0;
foreach ($rows as $p) {
	$to = isset($p['client_email']) ? trim($p['client_email']) : '';
	if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) { echo $p['ref'] . ": sin email de cliente, omitido\n"; continue; }

	$ref     = $p['ref'];
	$titleEs = !empty($p['title_es']) ? $p['title_es'] : $ref;
	$titleEn = !empty($p['title_en']) ? $p['title_en'] : $titleEs;
	$amount  = (float) $p['discount_amount'];
	$url     = 'https://standarte.es/proyecto?t=' . $p['access_token'];
	$h       = function ($x) { return htmlspecialchars($x, ENT_QUOTES, 'UTF-8'); };

	$subject = 'Su oferta vence hoy / Your offer expires today — ' . $ref;

	$es = "<p style='margin:0 0 16px;text-align:left;'>Le recordamos que la oferta por pronta decisión de su proyecto <strong>" . $h($titleEs) . "</strong> (" . $h($ref) . ") <strong>vence hoy</strong>. "
		. "Si aprueba el proyecto antes del cierre del día, se ahorra <strong>" . co_eur_es($amount) . "</strong>. "
		. "A partir de mañana, la oferta se reduce en 1.000 € por cada semana transcurrida, hasta extinguirse. "
		. "Aprobar el proyecto no impide seguir haciendo modificaciones después.</p>";

	$en = "<p style='margin:0 0 16px;text-align:left;color:#555;'>A reminder that the early-decision offer on your project <strong>" . $h($titleEn) . "</strong> (" . $h($ref) . ") <strong>expires today</strong>. "
		. "If you approve the project before the end of the day, you save <strong>" . co_eur_en($amount) . "</strong>. "
		. "From tomorrow, the offer shrinks by €1,000 for each elapsed week, until it runs out. "
		. "Approving the project does not prevent further modifications afterwards.</p>";

	$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. $es . $en
		. "<p style='text-align:center;margin:20px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>Abrir el proyecto / Open the project</a></p>"
		. "<p style='margin:28px 0 0;text-align:left;'>Un cordial saludo,<br>Best regards,<br><strong>Equipo de Standarte / The Standarte team</strong></p>"
		. "<p style='text-align:center;font-size:12px;color:#888;margin-top:24px;'>Mensaje automatizado del sistema de gestión de proyectos de Standarte.<br>Automated message from Standarte's project management system.<br><a href='https://standarte.es' style='color:#888;text-decoration:none;'>https://standarte.es</a></p>"
		. "</body></html>";

	$sent = false;
	try {
		$cfg = require __DIR__ . '/email_campaing/config.php';
		$sent = campaign_send_smtp($cfg, $to, $subject, $html);
	} catch (Exception $e) {
		$sent = false;
	}
	if (!$sent) {
		$sent = @mail($to, $subject, $html, "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\n");
	}
	if ($sent) {
		cpx_sb('PATCH', 'client_projects?id=eq.' . urlencode($p['id']), array('offer_notice_sent_at' => date('c')));
		$sentCount++;
		echo $ref . ": aviso enviado a $to\n";
	} else {
		echo $ref . ": ERROR al enviar a $to\n";
	}
}
echo "hecho: $sentCount aviso(s)\n";
