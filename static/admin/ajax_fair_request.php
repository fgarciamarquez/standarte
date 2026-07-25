<?php
/*
 * Buscador de ferias de la portada (FairSearch.svelte): aviso interno cuando un
 * visitante busca una feria que NO está en el catálogo.
 *
 * Solo notifica al equipo (info@standarte.es) para poder darla de alta. No hay
 * datos personales: se recibe únicamente el texto buscado, el idioma y la página.
 *
 * Es un endpoint público que dispara correo, así que lleva tres frenos contra abuso:
 *   1. honeypot (campo oculto que solo rellenan los bots),
 *   2. tiempo mínimo desde que se pintó el buscador (un bot envía al instante),
 *   3. límite por IP con ventana deslizante en /tmp (evita el envío en ráfaga).
 * Ante cualquiera de los tres se responde "success" sin enviar nada: al que abusa no
 * se le confirma que ha sido detectado, y el visitante legítimo nunca ve un error.
 */

header('Content-Type: application/json; charset=utf-8');

function fr_post($key, $default = '') {
	if (!isset($_POST[$key])) return $default;
	$v = $_POST[$key];
	if (!is_string($v)) return $default;
	if (function_exists('mb_check_encoding') && !mb_check_encoding($v, 'UTF-8')) {
		$v = function_exists('mb_convert_encoding') ? mb_convert_encoding($v, 'UTF-8', 'Windows-1252') : $v;
	}
	return trim($v);
}

function fr_ok() { echo json_encode(array('error' => 'success', 'msg' => 'OK')); exit; }

$feria   = fr_post('form_feria');
$lang    = fr_post('form_lang', 'es');
$url     = fr_post('form_url');
$website = fr_post('form_website');           // honeypot: debe llegar vacío
$elapsed = (int) fr_post('form_elapsed', '0'); // ms desde que se mostró el buscador

$allowed = array('es','en','de','pt','fr','it','nl','zh','hi','ko','ja');
if (!in_array($lang, $allowed, true)) { $lang = 'es'; }

// Sin texto no hay nada que dar de alta.
if ($feria === '') { fr_ok(); }
// Se recorta: el aviso es una pista de alta, no un buzón de texto libre.
if (function_exists('mb_substr')) { $feria = mb_substr($feria, 0, 120, 'UTF-8'); }
else { $feria = substr($feria, 0, 120); }

// 1) Honeypot y 2) envío demasiado rápido para ser humano.
if ($website !== '' || ($elapsed > 0 && $elapsed < 1200)) { fr_ok(); }

// 3) Límite por IP: como mucho 5 avisos por hora desde la misma dirección.
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
$bucket = sys_get_temp_dir() . '/standarte_fair_request_' . md5($ip) . '.txt';
$now = time();
$hits = array();
if (is_readable($bucket)) {
	$raw = @file_get_contents($bucket);
	if ($raw !== false && $raw !== '') {
		foreach (explode(',', $raw) as $tsRaw) {
			$ts = (int) $tsRaw;
			if ($ts > 0 && ($now - $ts) < 3600) { $hits[] = $ts; }
		}
	}
}
if (count($hits) >= 5) { fr_ok(); }
$hits[] = $now;
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

/* ---------- Aviso interno ---------- */
$feria_safe = htmlspecialchars($feria, ENT_QUOTES, 'UTF-8');
$lang_safe  = htmlspecialchars($lang, ENT_QUOTES, 'UTF-8');
$url_safe   = '';
if ($url !== '' && preg_match('#^https?://([a-z0-9-]+\.)?standarte\.es(/|$)#i', $url)) {
	$url_safe = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
}

$subject = 'FERIA NO ENCONTRADA (buscador) - ' . $feria;
$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
	. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#333;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
	. "<div style='background:#292f35;color:#ffc800;padding:18px;text-align:center;font-weight:bold;border-radius:6px 6px 0 0;'>FERIA BUSCADA Y NO ENCONTRADA</div>"
	. "<div style='padding:20px;border:1px solid #ddd;border-top:none;border-radius:0 0 6px 6px;'>"
	. "<table style='width:100%;border-collapse:collapse;'>"
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:35%;'>Texto buscado:</td><td style='padding:8px;border-bottom:1px solid #eee;'><strong>" . $feria_safe . "</strong></td></tr>"
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Idioma:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . $lang_safe . "</td></tr>"
	. ($url_safe !== '' ? "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Página de origen:</td><td style='padding:8px;border-bottom:1px solid #eee;'><a href='" . $url_safe . "'>" . $url_safe . "</a></td></tr>" : "")
	. "</table>"
	. "<p style='margin-top:18px;font-size:13px;color:#777;'>Un visitante ha buscado esta feria en el buscador de la portada y no está en el catálogo (fairsData.js). Al visitante se le ha respondido que la feria estará dada de alta en breve.</p>"
	. "</div></body></html>";

try {
	if (!function_exists('campaign_send_smtp')) { require_once __DIR__ . '/email_campaing/mailer.php'; }
	$config = require __DIR__ . '/email_campaing/config.php';
	$config['from_name'] = 'Standarte Buscador';
	campaign_send_smtp($config, 'info@standarte.es', $subject, $html);
} catch (Exception $e) {
	$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte Buscador <info@standarte.es>\r\n";
	@mail('info@standarte.es', $subject, $html, $headers);
}

fr_ok();
