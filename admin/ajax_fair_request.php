<?php
/*
 * Buscador de ferias de la portada (FairSearch.svelte): qué hacer cuando un visitante
 * busca una feria que NO está en el catálogo.
 *
 * Hace dos cosas:
 *   1. GUARDA la búsqueda en Supabase (tabla fair_search_misses). Hasta el 22/10/2026
 *      esto solo se enviaba por correo y ahí moría, así que no había forma de saber qué
 *      buscaba la gente sin encontrarlo, ni cuántas veces. Ese es justamente el dato que
 *      dice qué ferias dar de alta y qué alias añadir al buscador. Se consulta en
 *      admin/buscador.php.
 *   2. AVISA al equipo (info@standarte.es) para darla de alta.
 *
 * No hay datos personales, ni siquiera la IP ni su hash: se guardan solo el texto
 * buscado, el idioma y la página. La IP se usa en memoria para el límite de abuso y no
 * se escribe en ninguna parte.
 *
 * Es un endpoint público que escribe y dispara correo, así que lleva tres frenos:
 *   1. honeypot (campo oculto que solo rellenan los bots),
 *   2. tiempo mínimo desde que se pintó el buscador (un bot envía al instante),
 *   3. límite por IP con ventana deslizante en /tmp. Son DOS topes sobre el mismo
 *      recuento: 5 correos por hora (como antes) y 40 filas guardadas por hora. El del
 *      registro es más alto a propósito, porque una persona que busca seis ferias
 *      seguidas es justo la que interesa y guardar una fila no molesta a nadie.
 * Ante cualquiera de los frenos se responde "success": al que abusa no se le confirma
 * que ha sido detectado, y el visitante legítimo nunca ve un error.
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

/* Normalización para agrupar variantes de la misma búsqueda. Es la hermana pobre de la de
 * src/lib/fairMatch.js: aquí solo sirve para que «FIMI Valencia», «fimi  valencia» y
 * «fimi, valencia» cuenten como la misma consulta en el panel. */
function fr_norm($s) {
	$s = (string) $s;
	if (function_exists('mb_strtolower')) $s = mb_strtolower($s, 'UTF-8'); else $s = strtolower($s);
	$t = @iconv('UTF-8', 'ASCII//TRANSLIT', $s);          // quita acentos latinos
	if ($t !== false && $t !== '') $s = strtolower($t);
	$s = preg_replace('/[^\p{L}\p{N}\p{M}]+/u', ' ', $s);
	return trim(preg_replace('/\s+/', ' ', (string) $s));
}

/* Guarda la búsqueda fallida. Best-effort a propósito: si Supabase no contesta, el
 * visitante no se puede quedar colgado por eso, así que se sigue adelante y al menos
 * queda el aviso por correo. */
function fr_log_miss($feria, $lang, $url) {
	$cfg = __DIR__ . '/../supabase-config.php';
	if (!is_readable($cfg)) return false;
	require_once $cfg;
	if (!defined('SUPABASE_URL')) return false;
	$key = defined('SUPABASE_SERVICE_KEY') ? SUPABASE_SERVICE_KEY : (defined('SUPABASE_KEY') ? SUPABASE_KEY : '');
	if ($key === '') return false;

	$row = array(
		'q'        => $feria,
		'q_norm'   => fr_norm($feria),
		'lang'     => $lang,
		'page_url' => ($url !== '' ? mb_substr($url, 0, 300, 'UTF-8') : null)
	);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/fair_search_misses');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($ch, CURLOPT_TIMEOUT, 6);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'apikey: ' . $key,
		'Authorization: Bearer ' . $key,
		'Content-Type: application/json',
		'Prefer: return=minimal'
	));
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($row));
	curl_exec($ch);
	$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	return $code >= 200 && $code < 300;
}

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

// 3) Límite por IP con ventana de una hora. La IP solo vive en el nombre del fichero de
//    conteo (hasheada) y nunca se guarda en la base de datos.
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
$previas = count($hits);
// Se cuenta siempre (antes se salía sin contar, y así la ventana no llegaba a cerrarse
// con un flujo sostenido). El recorte a 60 evita que el fichero crezca sin tope.
$hits[] = $now;
if (count($hits) > 60) $hits = array_slice($hits, -60);
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

// Dos topes sobre el mismo recuento: guardar es más barato que avisar, así que aguanta más.
if ($previas < 40) { fr_log_miss($feria, $lang, $url); }
if ($previas >= 5) { fr_ok(); }

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
