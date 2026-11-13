<?php
/*
 * probar_contrato.php — prueba local de la FORMA DE PAGO del contrato y de las facturas (13/11/2026).
 *
 * Por qué existe: el contrato de 31C se emitió y se envió con «80 % por adelantado y 20 %
 * a la entrega» cuando el proyecto tenía un pago único del 100 %. El generador no leía el
 * reparto (payment_split): solo las facturas lo hacían. Esta prueba ejecuta el código REAL
 * de static/admin/contract_lib.php, payment_lib.php e invoice_lib.php con dobles para
 * Supabase, Storage, tipos de cambio y correo: no sale nada a la red. Lee la cláusula D tal
 * y como queda IMPRESA en el PDF, no solo lo que devuelve la función, y comprueba cada
 * reparto, el texto libre, los bloqueos (también los de las facturas), la vista previa, el
 * modo prueba, la reemisión y qué pasa cuando el servidor falla a medias.
 *
 *   php scripts/probar_contrato.php        (sale con 1 si algo falla)
 *   php scripts/probar_contrato.php --ver  (además imprime cada cláusula D)
 *
 * Los PDF quedan en una carpeta temporal (la ruta sale al final) para mirarlos.
 */
$repo = dirname(__DIR__);
$ver = in_array('--ver', $argv, true);
$tmp = rtrim(sys_get_temp_dir(), '/') . '/std-contrato-' . getmypid();
@mkdir($tmp . '/email_campaing', 0777, true); @mkdir($tmp . '/out', 0777, true);
foreach (array('contract_lib.php', 'payment_lib.php', 'invoice_lib.php') as $f) copy($repo . '/static/admin/' . $f, $tmp . '/' . $f);
if (!file_exists($tmp . '/lib')) symlink($repo . '/static/admin/lib', $tmp . '/lib');
file_put_contents($tmp . '/email_campaing/mailer.php', "<?php\nfunction campaign_send_smtp(\$cfg, \$to, \$subject, \$html, \$att = array()) { \$GLOBALS['MAILS'][] = array('to' => \$to, 'subject' => \$subject, 'html' => \$html, 'att' => \$att); return \$GLOBALS['SMTP_OK']; }\n");
file_put_contents($tmp . '/email_campaing/config.php', "<?php return array('stub' => true);\n");
define('HARNESS_DIR', $tmp);
error_reporting(E_ALL); ini_set('display_errors', '1');
set_error_handler(function ($no, $str, $file, $line) { $GLOBALS['WARN'][] = "$str @" . basename($file) . ":$line"; return true; });
foreach (array('MAILS', 'SB', 'UP', 'DEL', 'WARN', 'DOCS', 'INVOICES', 'FAIL') as $g) $GLOBALS[$g] = array();
$GLOBALS['SMTP_OK'] = true;

/* ---- Dobles de lo que el fichero toma de client_projects_lib.php y de la red ---- */
function cpx_fetch_rates() { return array('USD' => 1.08, 'GBP' => 0.84, 'date' => '2026-11-13', 'source' => 'stub'); }
function cpx_emails($raw) { return array_values(array_filter(array_map('trim', preg_split('/[,;\s]+/', (string) $raw)))); }
function cpx_fair_info($slug) { return array('name' => 'Web Summit', 'city' => 'Lisboa', 'dates' => '10-13 de noviembre de 2027', 'dates_en' => 'November 10-13, 2027', 'start' => '2027-11-10'); }
function cpx_budget_rows($pid, $sel = 'amount', $order = '') { return $GLOBALS['BUDGET']; }
function cpx_send_each($cfg, $recipients, $subject, $html, $att = array()) { $ok = false; foreach ((array) $recipients as $to) { if (campaign_send_smtp($cfg, $to, $subject, $html, $att)) $ok = true; } return $ok; }
function cpx_storage_upload($path, $local, $mime, $bucket = 'client-projects') { $GLOBALS['UP'][] = $path; copy($local, HARNESS_DIR . '/out/' . basename($path)); return 200; }
function cpx_storage_delete_object($path, $bucket = 'client-docs') { $GLOBALS['DEL'][] = $path; }
function cpx_accounts() { return array(array('iban' => 'ES00 1111 2222 3333 4444 5555', 'bank' => 'BANCO DE PRUEBA', 'bic' => 'PRUEESMM000')); }
function cpx_rows($ep) {
	if (strpos($ep, 'client_projects?') === 0) return array($GLOBALS['P']);
	if (strpos($ep, 'client_project_docs?') === 0) return $GLOBALS['DOCS'];
	if (strpos($ep, 'client_project_media?') === 0) return $GLOBALS['MEDIA'];
	if (strpos($ep, 'client_project_invoices?') === 0) {
		if (strpos($ep, 'number=eq.') !== false) return array();   // «¿ese número ya está usado?»: no
		$w = preg_match('/which=eq\.(\d)/', $ep, $m) ? (int) $m[1] : 0;
		return array_values(array_filter($GLOBALS['INVOICES'], function ($r) use ($w) { return !$w || (int) $r['which'] === $w; }));
	}
	return array();
}
/* Doble de Supabase que se comporta como una tabla de documentos de verdad (la fila recién
 * insertada APARECE en el listado siguiente, y un DELETE la quita) y que puede fallar a
 * propósito: $GLOBALS['FAIL']['PATCH client_projects'] = 500. */
function cpx_sb($m, $ep, $data = null) {
	$table = preg_replace('/\?.*$/', '', $ep);
	$GLOBALS['SB'][] = array('m' => $m, 'ep' => $ep, 'data' => $data);
	if (isset($GLOBALS['FAIL'][$m . ' ' . $table])) return array('code' => $GLOBALS['FAIL'][$m . ' ' . $table], 'body' => 'fallo provocado');
	if ($m === 'POST' && $table === 'client_project_docs') {
		$row = array_merge($data, array('id' => sprintf('dddddddd-0000-0000-0000-%012d', count($GLOBALS['SB']))));
		$GLOBALS['DOCS'][] = $row;
		return array('code' => 201, 'body' => array($row));
	}
	if ($m === 'DELETE' && $table === 'client_project_docs' && preg_match('/id=eq\.([0-9a-f-]+)/', $ep, $mm)) {
		$GLOBALS['DOCS'] = array_values(array_filter($GLOBALS['DOCS'], function ($r) use ($mm) { return $r['id'] !== $mm[1]; }));
		return array('code' => 200, 'body' => array());
	}
	if ($m === 'POST') return array('code' => 201, 'body' => array(array('id' => 'fila-' . count($GLOBALS['SB']))));
	return array('code' => 200, 'body' => array());
}

require HARNESS_DIR . '/contract_lib.php';
require HARNESS_DIR . '/invoice_lib.php';

/* ---- Texto de un PDF de FPDF: descomprime cada página y junta lo que pinta con Tj ---- */
function pdf_text($bytes) {
	$out = '';
	if (!preg_match_all('/stream\r?\n(.*?)\r?\nendstream/s', $bytes, $m)) return '';
	foreach ($m[1] as $raw) {
		$data = @gzuncompress($raw);
		if ($data === false) $data = $raw;
		if (strpos($data, ' Tj') === false) continue;
		if (preg_match_all('/\(((?:\\\\.|[^\\\\()])*)\)\s*Tj/s', $data, $t)) {
			foreach ($t[1] as $frag) {
				$frag = preg_replace_callback('/\\\\(.)/s', function ($x) { return $x[1] === 'r' ? "\r" : ($x[1] === 'n' ? "\n" : $x[1]); }, $frag);
				$out .= iconv('windows-1252', 'UTF-8//IGNORE', $frag) . ' ';
			}
		}
	}
	return trim(preg_replace('/\s+/u', ' ', $out));
}
/* La cláusula D dentro del texto del PDF: la que va entre la C y la E (buscar «D. » a secas
 * tropezaría con «SECOND. »). */
function clause_d($pdfText) {
	return preg_match('/ C\. .*? (D\. .*?) E\. /su', $pdfText, $m) ? trim($m[1]) : '';
}
/* ¿Menciona el texto alguno de esos porcentajes? («80» a secas sale en importes como 17.908,80 £). */
function dice_pct($txt, $nums) {
	foreach ($nums as $x) { if (preg_match('/(?<![\d.,])' . preg_quote((string) $x, '/') . '\s?%/u', $txt)) return true; }
	return false;
}
function pdf_pages($bytes) { return preg_match_all('#/Type /Page\b#', $bytes, $m); }

$fail = 0; $n = 0;
$ok = function ($c, $m, $d = '') use (&$fail, &$n) { $n++; echo ($c ? '  ✔ ' : '  ✖ ') . $m . ((!$c && $d !== '') ? "\n      → $d" : '') . "\n"; if (!$c) $fail++; };
$reset = function () { foreach (array('MAILS', 'SB', 'UP', 'DEL', 'WARN', 'DOCS', 'INVOICES', 'FAIL') as $g) $GLOBALS[$g] = array(); $GLOBALS['SMTP_OK'] = true; };
$has = function ($hay, $needle) { return strpos($hay, $needle) !== false; };
$err = function ($r) { return implode('; ', isset($r['errors']) ? $r['errors'] : array()); };

/* Proyecto base: el caso real, 31C. Aprobado en inglés, pago único, sin texto libre, sin
 * impuestos (cliente extranjero), 21.320 €. Cada caso cambia solo lo que prueba. */
$BASE = array('id' => '13f64699-00dd-49dc-8fa3-67c0b0a6c6fb', 'ref' => '31C', 'title_es' => 'Stand 31C', 'title_en' => '31C stand',
	'client_name' => 'Cliente de Prueba', 'client_email' => 'cliente@example.com, otra@example.com', 'approved' => true, 'approved_lang' => 'en',
	'approved_with_offer' => false, 'discount_amount' => 0, 'iva_rate' => '0.0000', 'irpf_rate' => '0.0000',
	'payment_split' => '100', 'payment_terms_es' => '', 'payment_terms_en' => '',
	'income_account' => 'ES00 1111 2222 3333 4444 5555', 'bic_code' => 'PRUEESMM000',
	'billing_company' => 'Thirty One C Ltd', 'billing_cif' => 'IL000000000', 'billing_address' => '1 Test Street', 'billing_postal_code' => '00000', 'billing_city' => 'Tel Aviv', 'billing_country' => 'Israel',
	'fair_slug' => 'web-summit', 'access_token' => 'abc123', 'contract_code' => null, 'contract_issued_at' => null, 'contract_state' => 'pendiente', 'contract_meta' => null, 'invoice_state' => 'pendiente');
$PID = $BASE['id'];
$GLOBALS['BUDGET'] = array(array('amount' => 21320, 'concept_es' => 'Stand', 'concept_en' => 'Stand'));
/* Imágenes del repo para el anexo (los renders son .webp: el generador los pasa a JPEG con
 * GD), para que el PDF de la prueba tenga las mismas páginas que uno real. */
$renders = glob($repo . '/static/img/galeria-renders/*-800.*');
$GLOBALS['MEDIA'] = array();
foreach (array_slice($renders ? $renders : array(), 0, 3) as $f) $GLOBALS['MEDIA'][] = array('src' => 'file://' . $f);

$issue = function ($over = array(), $opts = array()) use ($BASE) {
	$GLOBALS['P'] = array_merge($BASE, $over);
	return cpx_contract_issue($GLOBALS['P']['id'], $opts);
};
$lastPdf = function () { return $GLOBALS['UP'] ? file_get_contents(HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][count($GLOBALS['UP']) - 1])) : ''; };
/* Emite de verdad (contra los dobles) y devuelve [resultado, cláusula D leída del PDF guardado]. */
$emit = function ($over = array()) use ($issue, $reset, $ver, $lastPdf) {
	$reset();
	$r = $issue($over);
	$d = (!empty($r['ok']) && $GLOBALS['UP']) ? clause_d(pdf_text($lastPdf())) : '';
	if ($ver) echo "      «" . ($d !== '' ? $d : 'NO EMITIDO: ' . implode('; ', isset($r['errors']) ? $r['errors'] : array())) . "»\n";
	return array($r, $d);
};
$meta = function () { $m = array(); foreach ($GLOBALS['SB'] as $c) { if ($c['m'] === 'PATCH' && isset($c['data']['contract_meta'])) $m = $c['data']['contract_meta']; } return $m; };
$bloqueado = function ($r) { return empty($r['ok']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && !$GLOBALS['MAILS']; };

echo "1) El caso real: 31C, reparto «100», sin texto libre, aprobado en inglés\n";
list($r, $d) = $emit();
$ok(!empty($r['ok']), 'se emite', $err($r));
$ok($d === 'D. Thirty One C Ltd shall pay 100% of the amount (€21,320.00 (US$ 23,025.60 / £ 17,908.80)) in advance to Francisco Javier García Márquez (Owner of Standarte) via bank transfer, to account ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000).', 'el PDF dice «shall pay 100% of the amount (€21,320.00 …) in advance …, to account …» y nada más', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)) && !$has($d, 'final payment') && !$has($d, 'remaining'), 'el PDF NO habla de 80 %, 20 % ni de pago final', $d);
$ok(isset($r['clause']) && preg_replace('/\s+/', ' ', $r['clause']) === $d, 'lo que devuelve la emisión es, palabra por palabra, lo impreso', isset($r['clause']) ? $r['clause'] : '');
$m = $meta();
$ok(isset($m['split']) && $m['split'] === '100' && $m['advance_eur'] == 21320 && $m['rest_eur'] == 0 && $m['total_eur'] == 21320 && $m['replaces'] === array(), 'el sello guarda reparto 100, anticipo 21.320 y resto 0', json_encode($m));
$ok(isset($r['summary']) && $r['summary'] === 'pago único del 100 % por adelantado (21.320,00 €)', 'resumen para el gestor: «' . (isset($r['summary']) ? $r['summary'] : '') . '»');
$ok(count($GLOBALS['MAILS']) === 3 && $GLOBALS['MAILS'][2]['to'] === 'javier@standarte.es', 'correo a las dos direcciones del cliente y copia a Javier', count($GLOBALS['MAILS']) . ' correos');
$pdf1 = $lastPdf();
$ok(!$GLOBALS['MEDIA'] || pdf_pages($pdf1) >= 3, 'el PDF lleva el anexo con las imágenes (' . pdf_pages($pdf1) . ' páginas)', count($GLOBALS['MEDIA']) . ' imágenes');
$ok(!$has(pdf_text($pdf1), 'FIFTH') && !$has(pdf_text($pdf1), 'supersedes'), 'una primera emisión no lleva cláusula de sustitución');
file_put_contents(HARNESS_DIR . '/out/31C-pago-unico-en.pdf', $pdf1);

echo "2) El mismo proyecto en español\n";
list($r, $d) = $emit(array('approved_lang' => 'es'));
$ok($d === 'D. Thirty One C Ltd abonará por adelantado el 100 % del importe (21.320,00 € (23.025,60 US$ / 17.908,80 £)) mediante transferencia bancaria a Francisco Javier García Márquez (titular de Standarte), en la cuenta ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000).', '«abonará por adelantado el 100 % del importe (21.320,00 € …)»', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)) && !$has($d, 'pago final') && !$has($d, 'restante'), 'sin 80 %, 20 % ni pago final', $d);
file_put_contents(HARNESS_DIR . '/out/31C-pago-unico-es.pdf', $lastPdf());

echo "3) Dos tramos: 50/50 y 70/30\n";
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '50/50'));
$ok($has($d, 'por adelantado el 50 % del importe (10.660,00 €') && $has($d, 'El pago final del 50 % restante (10.660,00 €) se realizará una vez entregado el proyecto en Lisboa'), '50/50 en español: 10.660 + 10.660', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)), '50/50 sin rastro del 80/20', $d);
list($r, $d) = $emit(array('payment_split' => '70/30'));
$ok($has($d, 'shall pay 70% of the amount (€14,924.00') && $has($d, 'The final payment of the remaining 30% (€6,396.00) will be made after the project is delivered in Lisboa'), '70/30 en inglés: 14.924 + 6.396', $d);
$m = $meta();
$ok($m['split'] === '70/30' && $m['advance_eur'] == 14924 && $m['rest_eur'] == 6396, 'sello: 70/30, 14.924 y 6.396', json_encode($m));

echo "4) 80/20: la redacción de siempre, sin cambiar una palabra\n";
$antes = 'D. Thirty One C Ltd abonará por adelantado el 80 % del importe (17.056,00 € (18.420,48 US$ / 14.327,04 £)) mediante transferencia bancaria a Francisco Javier García Márquez (titular de Standarte), en la cuenta ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000). El pago final del 20 % restante (4.264,00 €) se realizará una vez entregado el proyecto en Lisboa.';
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '80/20'));
$ok($d === $antes, '«80/20» escrito: idéntica a la cláusula anterior', $d);
$ok(empty(array_filter($r['warnings'], function ($w) { return strpos($w, 'por defecto') !== false; })), 'sin aviso de «por defecto»: el reparto está escrito');
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => null));
$ok($d === $antes, 'reparto vacío: 80/20 por defecto, misma cláusula', $d);
$ok(!empty(array_filter($r['warnings'], function ($w) { return strpos($w, '80/20 por defecto') !== false; })), 'y AVISA de que sale con el 80/20 por defecto', implode('; ', $r['warnings']));
list($r, $d) = $emit(array('payment_split' => ''));
$ok($has($d, 'shall pay 80% of the amount (€17,056.00') && $has($d, 'remaining 20% (€4,264.00)'), 'inglés por defecto: 80% / 20%', $d);

echo "5) Texto libre: la cláusula completa del reparto y, detrás, el texto\n";
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_terms_es' => '100% por Anticipado'));
$ok($d === 'D. Thirty One C Ltd abonará por adelantado el 100 % del importe (21.320,00 € (23.025,60 US$ / 17.908,80 £)) mediante transferencia bancaria a Francisco Javier García Márquez (titular de Standarte), en la cuenta ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000). Forma de pago acordada entre las partes: 100% por Anticipado.', 'español, 100 + «100% por Anticipado» (Rocacorba, Lontex Opción 2)', $d);
list($r, $d) = $emit(array('payment_terms_en' => '100% in avance'));
$ok($d === 'D. Thirty One C Ltd shall pay 100% of the amount (€21,320.00 (US$ 23,025.60 / £ 17,908.80)) in advance to Francisco Javier García Márquez (Owner of Standarte) via bank transfer, to account ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000). Payment terms agreed between the parties: 100% in avance.', 'inglés, 100 + «100% in avance» (Shining 3D): 100 %, nunca 80/20', $d);
list($r, $d) = $emit(array('payment_split' => null, 'payment_terms_en' => '80% in advance / 20% post-delivery'));
$ok($has($d, 'shall pay 80% of the amount (€17,056.00') && $has($d, 'The final payment of the remaining 20% (€4,264.00) will be made after the project is delivered in Lisboa. Payment terms agreed between the parties: 80% in advance / 20% post-delivery.'), 'texto 80/20 + reparto vacío (Meermeat, Pepper): cláusula 80/20 completa + texto', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => '80% in advance'));
$ok(!empty($r['ok']) && $has($d, 'El pago final del 20 % restante (4.264,00 €) se realizará una vez entregado el proyecto en Lisboa. Forma de pago acordada entre las partes: 80% in advance.'), 'el texto solo nombra el primer tramo (Lontex en español): el segundo tramo conserva su importe y su vencimiento', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_terms_es' => 'Transferencia bancaria al aprobar el diseño.'));
$ok(!empty($r['ok']) && $has($d, 'abonará por adelantado el 100 % del importe (21.320,00 €') && $has($d, 'Forma de pago acordada entre las partes: Transferencia bancaria al aprobar el diseño.') && !$has($d, 'diseño..'), 'texto sin porcentajes: va detrás y el importe lo pone el reparto', $d);
$ok(!empty(array_filter($r['warnings'], function ($w) { return strpos($w, 'no se ha podido cotejar') !== false; })), 'y AVISA de que ese texto no se ha podido cotejar', implode('; ', $r['warnings']));

echo "6) El texto del OTRO idioma no cuenta, y un texto vacío ya no cae al 80/20\n";
list($r, $d) = $emit(array('payment_terms_es' => '100% por Anticipado', 'payment_terms_en' => ''));
$ok($has($d, 'shall pay 100% of the amount (€21,320.00') && !dice_pct($d, array(80, 20)) && !$has($d, 'Anticipado'), 'aprobado en inglés con texto solo en español: 100 %, sin el texto español', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => '80% in advance', 'payment_terms_en' => '100% in avance'));
$ok(!empty($r['ok']) && $has($d, '80 %'), 'contrato en español: el texto inglés contradictorio no lo bloquea', $d);

echo "7) Bloqueos: el contrato NO se emite si el texto contradice al reparto\n";
foreach (array(
	array(array('payment_terms_en' => '80% in advance / 20% post-delivery'), 'habla de 80 %, 20 %', 'reparto 100 + texto «80% / 20%»'),
	array(array('payment_split' => '80/20', 'payment_terms_en' => '100% in avance'), 'habla de 100 %', 'reparto 80/20 + «100% in avance» (Lontex en inglés)'),
	array(array('payment_split' => null, 'payment_terms_en' => '70% in avance / 30% post-delivery'), 'el campo «reparto» está vacío', 'reparto vacío + «70% / 30%» (Paynopain en inglés)'),
	array(array('payment_split' => '50/30/20'), 'no es válido', 'reparto «50/30/20» (no se adivina un 80/20)'),
	array(array('payment_split' => '100/0'), 'no es válido', 'reparto «100/0»'),
	array(array('payment_split' => 'pago único'), 'no es válido', 'reparto «pago único» (texto en el campo de porcentajes)'),
	array(array('payment_split' => '80/20', 'payment_terms_en' => '20% on delivery, 80% in advance'), 'en ese orden', 'porcentajes en orden contrario al reparto'),
	array(array('payment_terms_en' => 'Payment 80/20'), 'habla de 80 %, 20 %', 'reparto 100 + «Payment 80/20» (sin el signo %)'),
	array(array('payment_split' => null, 'payment_terms_en' => 'Full payment in advance'), 'el campo «reparto» está vacío', 'reparto vacío + texto sin cifras: no se le pone un 80/20'),
	array(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => 'Pago único por adelantado'), 'habla de un pago único', 'reparto 80/20 + «Pago único por adelantado»'),
	array(array('approved_lang' => 'es', 'payment_terms_es' => 'Mitad al aprobar y mitad a la entrega'), 'habla de más de un pago', 'reparto 100 + «Mitad al aprobar y mitad a la entrega»'),
) as $c) {
	list($r, $d) = $emit($c[0]);
	$ok($bloqueado($r) && $has($err($r), $c[1]), $c[2] . ': bloqueado, nada guardado ni enviado', json_encode($r, JSON_UNESCAPED_UNICODE));
}
foreach (array(
	array(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => '80 % por adelantado y 20 % a la entrega. IVA 21 % no incluido'), 'un «IVA 21 %» en el texto no cuenta como porcentaje de pago'),
	array(array('payment_terms_en' => '100% in advance. VAT 0% (reverse charge)'), 'un «VAT 0%» tampoco'),
	array(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => 'El 20 % restante, a la entrega del stand'), 'nombrar solo el segundo tramo vale'),
	array(array('approved_lang' => 'es', 'payment_split' => '70/30', 'payment_terms_es' => 'Pago 70/30 %'), '«70/30 %» se lee como 70 y 30'),
) as $c) {
	list($r, $d) = $emit($c[0]);
	$ok(!empty($r['ok']), $c[1] . ': se emite', $err($r));
}

echo "8) Los importes: suman el total del contrato y casan con las facturas\n";
$GLOBALS['BUDGET'] = array(array('amount' => 1000.01));
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '33,33/66,67'));
$m = $meta();
$ok(!empty($r['ok']) && abs(($m['advance_eur'] + $m['rest_eur']) - $m['total_eur']) < 0.00001 && $has($d, 'el 33,33 % del importe') && $has($d, 'del 66,67 % restante'), '33,33/66,67 de 1.000,01 €: ' . (isset($m['advance_eur']) ? $m['advance_eur'] . ' + ' . $m['rest_eur'] . ' = ' . $m['total_eur'] : ''), $d);
$GLOBALS['BUDGET'] = array(array('amount' => 21320, 'concept_es' => 'Stand', 'concept_en' => 'Stand'));
/* Barrido determinista: 6 repartos × 3 juegos de impuestos × 400 bases (enteras y con céntimos).
 * Lo que SIEMPRE debe cumplirse: los tramos de la cláusula D suman exactamente el total de
 * la cláusula C, y sin impuestos coinciden al céntimo con las facturas. Con IVA/IRPF cada
 * factura redondea SUS impuestos (base × tipo, al céntimo), mientras que el contrato parte
 * del total ya redondeado: el total de una factura puede separarse del tramo del contrato
 * UN céntimo con bases en euros enteros y hasta DOS con bases con céntimos (medido el
 * 13/11/2026; con 100, 80/20, 50/50 y 60/40 sobre euros enteros y los dos impuestos no se
 * separan nada). Ya pasaba con el 80/20 fijo: no es la forma de pago, es aritmética fiscal
 * de céntimos, pendiente de unificar con la página y la BD. Aquí solo se vigila el tope. */
$suma = 0; $sinImp = 0; $maxDif = 0.0; $maxEnt = 0.0; $casos = 0;
foreach (array('100', '50/50', '70/30', '80/20', '60/40', '33,33/66,67') as $sp) {
	foreach (array(array('0', '0'), array('0.21', '0.15'), array('0.21', '0')) as $tx) {
		for ($k = 0; $k < 400; $k++) {
			$base = ($k % 2) ? 900 + $k * 137 : (90000 + $k * 13757) / 100;   // enteras y con céntimos
			$P = array_merge($BASE, array('payment_split' => $sp, 'iva_rate' => $tx[0], 'irpf_rate' => $tx[1]));
			$B = array(array('amount' => $base));
			$tot = cpx_contract_totals($P, $B);
			$plan = cpx_payment_plan(cpx_payment_split($P), $tot['total']);
			$f1 = cpx_invoice_amounts($P, $B, 1, null);
			$f2 = $plan['single'] ? array('total' => 0.0) : cpx_invoice_amounts($P, $B, 2, array('meta' => array('base' => $f1['base'])));
			$casos++;
			if (abs(array_sum($plan['amounts']) - $tot['total']) > 0.0001) $suma++;
			$dif = max(abs($f1['total'] - $plan['amounts'][0]), $plan['single'] ? 0 : abs($f2['total'] - $plan['amounts'][1]));
			if ($tx[0] === '0' && $dif > 0.0001) $sinImp++;
			if ($dif > $maxDif) $maxDif = $dif;
			if (($k % 2) && $dif > $maxEnt) $maxEnt = $dif;
		}
	}
}
$ok($suma === 0, "en {$casos} casos, los tramos del contrato suman exactamente su total", "{$suma} no suman");
$ok($sinImp === 0, 'sin impuestos, cada tramo del contrato es al céntimo el total de su factura', "{$sinImp} difieren");
$ok($maxEnt < 0.0101 && $maxDif < 0.0201, 'con IVA/IRPF, tramo del contrato y factura se separan como mucho 1 céntimo (bases en euros enteros) o 2 (bases con céntimos)', 'máximos ' . round($maxEnt, 4) . ' y ' . round($maxDif, 4));

echo "9) Vista previa: lo que se confirma antes de emitir, sin generar ni guardar ni enviar\n";
$reset();
$r = $issue(array(), array('preview' => true));
$ok(!empty($r['ok']) && !empty($r['preview']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && !$GLOBALS['MAILS'], 'no guarda, no sube, no envía');
$ok($r['clause'] === 'D. Thirty One C Ltd shall pay 100% of the amount (€21,320.00) in advance to Francisco Javier García Márquez (Owner of Standarte) via bank transfer, to account ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000).' && $r['email'] === 'cliente@example.com, otra@example.com' && $r['split'] === '100' && $r['replaces'] === null, 'devuelve la cláusula, los destinatarios y el reparto', json_encode($r, JSON_UNESCAPED_UNICODE));
$reset();
$r = $issue(array('payment_terms_en' => '80% in advance'), array('preview' => true));
$ok(empty($r['ok']) && $has($err($r), 'habla de 80 %'), 'la vista previa también enseña el bloqueo', json_encode($r));

echo "10) Prueba (dry_run): solo a Javier, nada guardado\n";
$reset();
$r = $issue(array(), array('dry_run' => true));
$ms = $GLOBALS['MAILS'];
$ok(!empty($r['ok']) && !empty($r['dry_run']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && count($ms) === 1 && $ms[0]['to'] === 'javier@standarte.es' && strpos($ms[0]['subject'], '[PRUEBA]') === 0, 'un solo correo, a Javier, con [PRUEBA]', json_encode(array_map(function ($x) { return $x['to']; }, $ms)));
$ok($ms && $has($ms[0]['html'], 'forma de pago del contrato: pago único del 100 % por adelantado (21.320,00 €)'), 'el correo de prueba dice la forma de pago del contrato');
$dp = $ms ? clause_d(pdf_text($ms[0]['att'][0]['data'])) : '';
$ok($has($dp, 'shall pay 100% of the amount') && !dice_pct($dp, array(80, 20)), 'y su PDF adjunto dice 100 %', $dp);

echo "11) Reemitir: el contrato nuevo sustituye al anterior (inglés y español)\n";
$viejo = array('contract_code' => 'SC-2026-F1B519BF', 'contract_issued_at' => '2026-11-13T18:53:12+00:00', 'contract_state' => 'emitido',
	'contract_meta' => array('lang' => 'en', 'total_eur' => 21320, 'advance_eur' => 17056, 'path' => $PID . '/docs/contrato-sc-2026-f1b519bf.pdf'));
$docsViejos = array(
	array('id' => 'aaaaaaaa-0000-0000-0000-000000000001', 'path' => $PID . '/docs/contrato-sc-2026-f1b519bf.pdf'),   // el generado, con el error
	array('id' => 'aaaaaaaa-0000-0000-0000-000000000002', 'path' => $PID . '/docs/0123456789abcdef.pdf'));           // uno subido a mano (p. ej. firmado)
$reset(); $GLOBALS['P'] = array_merge($BASE, $viejo); $GLOBALS['DOCS'] = $docsViejos;
$r = cpx_contract_issue($PID, array('preview' => true));
$ok(!empty($r['ok']) && is_array($r['replaces']) && $r['replaces']['code'] === 'SC-2026-F1B519BF' && $r['replaces']['state'] === 'emitido' && $GLOBALS['DOCS'] === $docsViejos, 'la vista previa avisa de que sustituye a SC-2026-F1B519BF y no toca nada');
$r = cpx_contract_issue($PID);
$paths = array_map(function ($x) { return $x['path']; }, $GLOBALS['DOCS']);
$ok(!empty($r['ok']) && $r['replaced'] === 'SC-2026-F1B519BF' && $r['retired'] === 1, 'emitido; sustituye a SC-2026-F1B519BF', json_encode($r, JSON_UNESCAPED_UNICODE));
$ok(count($paths) === 2 && in_array($PID . '/docs/0123456789abcdef.pdf', $paths, true) && in_array($PID . '/docs/contrato-' . strtolower($r['code']) . '.pdf', $paths, true) && $GLOBALS['DEL'] === array($PID . '/docs/contrato-sc-2026-f1b519bf.pdf'),
	'en la Documentación quedan el contrato NUEVO y el subido a mano; solo se retira el generado anterior', json_encode($paths) . ' ' . json_encode($GLOBALS['DEL']));
$m = $meta();
$ok(isset($m['replaces'][0]['code']) && $m['replaces'][0]['code'] === 'SC-2026-F1B519BF' && $m['split'] === '100' && $m['advance_eur'] == 21320, 'el sello nuevo anota a quién sustituye y lleva 100 %', json_encode($m));
$html = $GLOBALS['MAILS'] ? $GLOBALS['MAILS'][0]['html'] : '';
$ok($has($html, 'replaces and supersedes') && $has($html, 'SC-2026-F1B519BF') && $has($html, 'November 13, 2026'), 'el correo al cliente dice que sustituye al del 13 de noviembre', strip_tags($html));
$txt = pdf_text($lastPdf());
$ok($has(clause_d($txt), 'shall pay 100% of the amount (€21,320.00') && !dice_pct(clause_d($txt), array(80, 20)), 'el PDF nuevo dice 100 %', clause_d($txt));
$ok($has($txt, 'FIFTH. This agreement replaces and supersedes the one issued on Friday, November 13, 2026 under code SC-2026-F1B519BF.'), 'y lleva escrito, en el propio contrato, a cuál sustituye', substr($txt, -420));
/* Segunda reemisión, ahora en español: arrastra los dos códigos anteriores. */
$code2 = $r['code'];
$GLOBALS['P'] = array_merge($BASE, array('approved_lang' => 'es', 'contract_code' => $code2, 'contract_issued_at' => '2026-11-14T09:00:00+00:00', 'contract_state' => 'emitido', 'contract_meta' => $m));
$GLOBALS['MAILS'] = array(); $GLOBALS['DEL'] = array();
$r = cpx_contract_issue($PID);
$m2 = $meta(); $paths = array_map(function ($x) { return $x['path']; }, $GLOBALS['DOCS']);
$ok(!empty($r['ok']) && count($m2['replaces']) === 2 && $m2['replaces'][0]['code'] === 'SC-2026-F1B519BF' && $m2['replaces'][1]['code'] === $code2, 'segunda reemisión: el sello recuerda los dos códigos sustituidos', json_encode($m2['replaces']));
$ok(count($paths) === 2 && !in_array($PID . '/docs/contrato-' . strtolower($code2) . '.pdf', $paths, true) && in_array($PID . '/docs/contrato-' . strtolower($r['code']) . '.pdf', $paths, true), 'y en la Documentación solo queda el último generado (más el subido a mano)', json_encode($paths));
$txt = pdf_text($lastPdf()); $html = $GLOBALS['MAILS'] ? $GLOBALS['MAILS'][0]['html'] : '';
$ok($has($txt, 'QUINTO. El presente contrato sustituye y deja sin efecto el emitido el sábado 14 de noviembre de 2026 con el código ' . $code2 . '.') && $has($html, 'sustituye y deja sin efecto') && $has($html, '14/11/2026') && $has($html, $code2), 'en español: cláusula QUINTO en el PDF y aviso en el correo', substr($txt, -300) . ' | ' . strip_tags($html));
$reset();
$r = $issue();
$ok($GLOBALS['MAILS'] && !$has($GLOBALS['MAILS'][0]['html'], 'supersedes') && $r['replaced'] === '' && !array_filter($GLOBALS['SB'], function ($c) { return $c['m'] === 'DELETE'; }), 'una primera emisión no habla de sustituir ni borra nada');

echo "12) Si el servidor falla a medias, no queda un contrato a medias\n";
$reset(); $GLOBALS['P'] = array_merge($BASE, $viejo); $GLOBALS['DOCS'] = $docsViejos; $GLOBALS['FAIL']['PATCH client_projects'] = 500;
$r = cpx_contract_issue($PID);
$ok(empty($r['ok']) && $has($err($r), 'no se pudo anotar el sello') && !$GLOBALS['MAILS'] && $GLOBALS['DOCS'] === $docsViejos && count($GLOBALS['DEL']) === 1 && $GLOBALS['DEL'][0] !== $PID . '/docs/contrato-sc-2026-f1b519bf.pdf',
	'falla al anotar el sello → error, ningún correo, se deshace el PDF nuevo y el contrato anterior sigue en su sitio', json_encode($r, JSON_UNESCAPED_UNICODE) . ' ' . json_encode($GLOBALS['DEL']));
$reset(); $GLOBALS['P'] = array_merge($BASE, $viejo); $GLOBALS['DOCS'] = $docsViejos; $GLOBALS['FAIL']['DELETE client_project_docs'] = 0;   // 0 = el servidor no contesta
$r = cpx_contract_issue($PID);
$ok(!empty($r['ok']) && $r['retired'] === 0 && !$GLOBALS['DEL'] && $has(implode(';', $r['warnings']), 'no se pudo retirar') && count($GLOBALS['DOCS']) === 3, 'falla al retirar el anterior → se emite, se AVISA y no se borra su PDF de Storage', json_encode($r['warnings'], JSON_UNESCAPED_UNICODE));
$reset(); $GLOBALS['FAIL']['POST client_project_docs'] = 500;
$r = $issue();
$ok(empty($r['ok']) && !$GLOBALS['MAILS'] && count($GLOBALS['DEL']) === 1 && !array_filter($GLOBALS['SB'], function ($c) { return $c['m'] === 'PATCH'; }), 'falla al registrar el documento → error, sin sello, sin correo, PDF retirado de Storage', json_encode($r));

echo "13) Las FACTURAS tampoco pueden contradecir al contrato emitido\n";
/* El estado real de 31C hoy: contrato emitido con el código viejo (80/20), reparto «100». */
$reset(); $GLOBALS['P'] = array_merge($BASE, $viejo);
$r = cpx_invoice_issue($PID, 1, '2026-33');
$ok(empty($r['ok']) && $has($err($r), 'el contrato emitido (SC-2026-F1B519BF) dice «80/20» y el reparto de pago del proyecto es «100»') && $has($err($r), 'reemite el contrato') && !$GLOBALS['MAILS'] && !$GLOBALS['UP'],
	'31C hoy (contrato 80/20, reparto 100): la Factura 1 NO sale y dice que hay que reemitir el contrato', $err($r));
/* Tras reemitir (sello con split 100), la factura sale por el total. */
$reset(); $GLOBALS['P'] = array_merge($BASE, array('contract_code' => 'SC-2026-NUEVO000', 'contract_meta' => array('lang' => 'en', 'total_eur' => 21320, 'split' => '100', 'advance_eur' => 21320)));
$r = cpx_invoice_issue($PID, 1, '2026-33');
$ok(!empty($r['ok']) && $r['total'] == 21320 && count($GLOBALS['MAILS']) === 3, 'reemitido el contrato con 100: la Factura 1 sale por 21.320 €', $err($r));
/* Cambiar el reparto DESPUÉS de emitir el contrato, sin reemitirlo. */
$reset(); $GLOBALS['P'] = array_merge($BASE, array('payment_split' => '80/20', 'contract_code' => 'SC-2026-NUEVO000', 'contract_meta' => array('lang' => 'en', 'total_eur' => 21320, 'split' => '100')));
$r = cpx_invoice_issue($PID, 1, '2026-33');
$ok(empty($r['ok']) && $has($err($r), 'dice «100» y el reparto de pago del proyecto es «80/20»') && !$GLOBALS['MAILS'], 'contrato con 100 y reparto cambiado a 80/20: la factura NO sale', $err($r));
/* Reparto que no se entiende: ni contrato ni factura (antes la factura salía al 80 %). */
$reset(); $GLOBALS['P'] = array_merge($BASE, array('payment_split' => '100/0'));
$r = cpx_invoice_issue($PID, 1, '2026-33');
$r2 = cpx_invoice_issue($PID, 1, '', array('dry_run' => true));
$ok(empty($r['ok']) && empty($r2['ok']) && $has($err($r), 'no es válido') && !$GLOBALS['MAILS'] && !$GLOBALS['UP'], 'reparto «100/0»: la Factura 1 NO sale al 80 % (ni en prueba)', $err($r));
/* Contrato antiguo emitido con texto libre (Shining 3D): no se sabe qué decía; no se bloquea. */
$reset(); $GLOBALS['P'] = array_merge($BASE, array('payment_terms_en' => '100% in avance', 'contract_code' => 'SC-2026-AF1F042C', 'contract_meta' => array('lang' => 'en', 'total_eur' => 21320, 'advance_eur' => 17056)));
$r = cpx_invoice_issue($PID, 1, '2026-33');
$ok(!empty($r['ok']) && $r['total'] == 21320, 'contrato antiguo con texto libre: no se puede cotejar y la factura sale', $err($r));
/* Sin contrato emitido, nada que cotejar. */
$reset(); $GLOBALS['P'] = array_merge($BASE, array('payment_split' => '50/50'));
$r = cpx_invoice_issue($PID, 1, '2026-33');
$ok(!empty($r['ok']) && $r['total'] == 10660, 'sin contrato emitido: Factura 1 del 50 % = 10.660 €', $err($r));
/* Y al revés: con la Factura 1 ya emitida por otro importe, el contrato no puede decir otra cosa. */
$reset(); $GLOBALS['INVOICES'] = array(array('which' => 1, 'number' => '2026-20', 'amount_eur' => 17056, 'meta' => array('base' => 17056)));
$r = $issue(); $GLOBALS['INVOICES'] = array(array('which' => 1, 'number' => '2026-20', 'amount_eur' => 17056, 'meta' => array('base' => 17056)));
$ok(empty($r['ok']) && $has($err($r), 'ya hay una Factura 1 emitida (nº 2026-20, 17.056,00 €)') && !$GLOBALS['MAILS'] && !$GLOBALS['UP'], 'Factura 1 emitida por 17.056 € y reparto 100: el contrato NO sale diciendo 21.320 €', $err($r));
$reset(); $GLOBALS['INVOICES'] = array(array('which' => 1, 'number' => '2026-20', 'amount_eur' => 21320, 'meta' => array('base' => 21320)));
$GLOBALS['P'] = array_merge($BASE, array()); $r = cpx_contract_issue($PID, array('preview' => true));
$ok(!empty($r['ok']), 'Factura 1 emitida por 21.320 € y reparto 100: el contrato sale', $err($r));

echo "14) Lectura del reparto y de los porcentajes del texto libre\n";
foreach (array('80% in advance / 20% post-delivery' => array(80.0, 20.0), '100 % por anticipado' => array(100.0), '100 por ciento al aprobar' => array(100.0), '33,5 % y 66.5%' => array(33.5, 66.5),
		'Transferencia a 30 días' => array(), '1.200 € al aprobar' => array(), 'fifty percent' => array(), '50 percent now, 50 per cent later' => array(50.0, 50.0),
		'Pago 80/20' => array(80.0, 20.0), '50-50' => array(50.0, 50.0), '70/30 %' => array(70.0, 30.0), '80 por 100 al aprobar' => array(80.0), 'Feria del 10-13 de noviembre' => array(),
		'80 % y 20 %. IVA 21 % aparte' => array(80.0, 20.0), '21 % de IVA; 100 % al aprobar' => array(100.0), 'interés de demora del 1,5 % mensual' => array(), 'de forma definitiva 100 %' => array(100.0)) as $txt => $exp) {
	$got = cpx_payment_terms_pcts($txt);
	$ok($got === $exp, "«{$txt}» → [" . implode(', ', $got) . ']');
}
foreach (array('100' => array(array(100), false), '100 %' => array(array(100), false), '80/20' => array(array(80.0, 20.0), false), ' 70 / 30 ' => array(array(70.0, 30.0), false), '50-50' => array(array(50.0, 50.0), false), '80%/20%' => array(array(80.0, 20.0), false), '' => array(array(80, 20), true)) as $raw => $exp) {
	$s = cpx_payment_split(array('payment_split' => $raw));
	$ok($s['pct'] == $exp[0] && $s['default'] === $exp[1] && $s['error'] === '', "reparto «{$raw}» → " . implode('/', $s['pct']) . ($s['default'] ? ' (por defecto)' : ''));
}
foreach (array('50/30/20', '60/30', '100/0', 'abc', '0/100', '80', 'único', '100 % (pago único, 1 factura)', '100, 0') as $raw) {
	$s = cpx_payment_split(array('payment_split' => $raw));
	$ok($s['error'] !== '', "reparto «{$raw}» → no válido");
}

$ok(!$GLOBALS['WARN'], 'sin avisos de PHP en toda la prueba', implode(' | ', array_unique($GLOBALS['WARN'])));

/* Contraste independiente, si la máquina tiene pdftotext: lee el PDF con otra herramienta. */
$pt = trim((string) @shell_exec('command -v pdftotext 2>/dev/null'));
if ($pt !== '' && file_exists(HARNESS_DIR . '/out/31C-pago-unico-en.pdf')) {
	$txt = preg_replace('/\s+/', ' ', (string) shell_exec(escapeshellarg($pt) . ' -layout ' . escapeshellarg(HARNESS_DIR . '/out/31C-pago-unico-en.pdf') . ' - 2>/dev/null'));
	echo "15) Contraste con pdftotext sobre el PDF de 31C\n";
	$ok($has($txt, 'shall pay 100% of the amount') && !preg_match('/\b80\s?%/', $txt) && !$has($txt, 'remaining 20'), 'pdftotext lee «shall pay 100% of the amount» y ningún 80 %');
}

echo "\n" . ($fail ? "✖ {$fail} de {$n} comprobaciones han fallado" : "✔ {$n} comprobaciones, todas correctas") . "\nPDF en " . HARNESS_DIR . "/out\n";
exit($fail ? 1 : 0);
