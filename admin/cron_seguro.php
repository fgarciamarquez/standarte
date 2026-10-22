<?php
/*
 * Aviso automático del vencimiento de la póliza de responsabilidad civil (Standarte).
 *
 * Por qué existe: desde el 22/10/2026 el contrato que se envía a cada cliente nombra la
 * póliza y dice hasta cuándo está en vigor. Si caduca sin renovar, todos los contratos
 * que salgan a partir de ese día afirman una cobertura que ya no existe. Esto avisa con
 * tiempo y, pasado el vencimiento, todos los días hasta que se actualice.
 *
 * Los datos de la póliza NO están aquí: salen de las constantes de contract_lib.php, que
 * son las mismas que imprime el contrato. Al renovar se cambian allí y este aviso se
 * entera solo.
 *
 * Lo dispara insurance_reminder.yml (GitHub Actions) una vez al día. Avisa cuando faltan
 * 90, 60, 30, 15, 7, 3, 1 o 0 días, y a diario una vez vencida. Esos escalones hacen de
 * desduplicador: no hace falta guardar estado en ninguna tabla.
 */
header('Content-Type: text/plain; charset=utf-8');
if (!isset($_GET['token']) || $_GET['token'] !== 'TKN-seguro-9d4c7f2b60') { http_response_code(403); die('forbidden'); }

date_default_timezone_set('Europe/Madrid');
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
require_once __DIR__ . '/contract_lib.php';   // constantes de la póliza y CPX_ADMIN_MAIL
require_once __DIR__ . '/email_campaing/mailer.php';

$force = isset($_GET['force']) && $_GET['force'] === '1';

$hoy    = new DateTime('today');
$vence  = DateTime::createFromFormat('Y-m-d', CPX_RC_EXPIRY);
if (!$vence) { http_response_code(500); die('CPX_RC_EXPIRY no es una fecha válida: ' . CPX_RC_EXPIRY); }
$vence->setTime(0, 0, 0);
$dias = (int) $hoy->diff($vence)->format('%r%a');

$escalones = array(90, 60, 30, 15, 7, 3, 1, 0);
$vencida   = $dias < 0;
$toca      = $force || $vencida || in_array($dias, $escalones, true);

echo "Póliza " . CPX_RC_NUMBER . " · vence " . CPX_RC_EXPIRY . " · faltan $dias día(s)\n";
if (!$toca) { echo "Sin aviso hoy (solo se avisa a 90, 60, 30, 15, 7, 3, 1 y 0 días, y a diario si ya venció).\n"; exit; }

$fechaTxt = $vence->format('d/m/Y');
if ($vencida) {
	$asunto = 'URGENTE · La póliza de responsabilidad civil VENCIÓ el ' . $fechaTxt;
	$titular = 'La póliza venció hace ' . abs($dias) . ' día(s).';
	$cuerpo  = 'Todos los contratos que se emitan desde hoy siguen diciendo que la póliza está en vigor hasta el '
		. $fechaTxt . '. <strong>Eso ya no es cierto.</strong> Hasta renovarla y actualizar los datos, conviene no emitir contratos nuevos.';
	$color = '#c62828';
} else {
	$asunto = 'La póliza de responsabilidad civil vence en ' . $dias . ' día(s) (' . $fechaTxt . ')';
	$titular = ($dias === 0) ? 'La póliza vence HOY.' : 'Quedan ' . $dias . ' día(s) para el vencimiento.';
	$cuerpo  = 'El contrato que se envía a cada cliente nombra esta póliza y dice que está en vigor hasta el '
		. $fechaTxt . '. Conviene renovarla antes de esa fecha.';
	$color = ($dias <= 15) ? '#c62828' : '#8a6d00';
}

$h = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
$limite = number_format(CPX_RC_LIMIT, 0, ',', '.') . ' €';
$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
	. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
	. "<p style='font-size:17px;font-weight:bold;color:" . $color . ";margin:0 0 14px;'>" . $h($titular) . "</p>"
	. "<p style='margin:0 0 16px;'>" . $cuerpo . "</p>"
	. "<div style='padding:14px 16px;background:#f6f6f2;border-radius:8px;font-size:14px;line-height:1.7;'>"
	. "<div><span style='color:#888;'>Aseguradora:</span> " . $h(CPX_RC_INSURER) . "</div>"
	. "<div><span style='color:#888;'>Nº de póliza:</span> <strong>" . $h(CPX_RC_NUMBER) . "</strong></div>"
	. "<div><span style='color:#888;'>Límite:</span> " . $h($limite) . " por siniestro y por anualidad</div>"
	. "<div><span style='color:#888;'>Vencimiento:</span> <strong>" . $h($fechaTxt) . "</strong></div>"
	. "</div>"
	. "<p style='margin:16px 0 0;font-size:13px;color:#555;'>Al renovar hay que actualizar el número y la fecha en "
	. "<code>admin/contract_lib.php</code> (constantes <code>CPX_RC_NUMBER</code> y <code>CPX_RC_EXPIRY</code>), "
	. "en las dos copias del PHP, y volver a desplegar. Este aviso lee esas mismas constantes.</p>"
	. "<p style='margin-top:20px;font-size:12px;color:#888;'>Aviso automático de Standarte · cron_seguro.php</p>"
	. "</body></html>";

$to = array(CPX_ADMIN_MAIL);
$sent = false;
try {
	$cfg = require __DIR__ . '/email_campaing/config.php';
	$sent = cpx_send_each($cfg, $to, $asunto, $html);
} catch (Exception $e) {
	$sent = false;
}
if (!$sent) {
	$sent = @mail(implode(', ', $to), $asunto, $html, "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\n");
}
echo ($sent ? 'Aviso enviado a ' : 'NO se pudo enviar el aviso a ') . implode(', ', $to) . "\n";
