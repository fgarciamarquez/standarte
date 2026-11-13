<?php
/*
 * probar_contrato.php — prueba local de la FORMA DE PAGO del contrato (13/11/2026).
 *
 * Por qué existe: el contrato de 31C se emitió y se envió con «80 % por adelantado y 20 %
 * a la entrega» cuando el proyecto tenía un pago único del 100 %. El generador no leía el
 * reparto (payment_split): solo las facturas lo hacían. Esta prueba ejecuta el código REAL
 * de static/admin/contract_lib.php (y payment_lib.php, e invoice_lib.php para cotejar los
 * importes) con dobles para Supabase, Storage, tipos de cambio y correo: no sale nada a la
 * red. Lee la cláusula D tal y como queda IMPRESA en el PDF, no solo lo que devuelve la
 * función, y comprueba cada reparto, el texto libre, los bloqueos, la vista previa, el modo
 * prueba y la reemisión.
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
$GLOBALS['MAILS'] = array(); $GLOBALS['SB'] = array(); $GLOBALS['UP'] = array(); $GLOBALS['DEL'] = array(); $GLOBALS['WARN'] = array(); $GLOBALS['DOCS'] = array(); $GLOBALS['SMTP_OK'] = true;

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
	return array();
}
function cpx_sb($m, $ep, $data = null) { $GLOBALS['SB'][] = array('m' => $m, 'ep' => $ep, 'data' => $data); return array('code' => ($m === 'DELETE' ? 204 : 201), 'body' => array(array('id' => 'doc-' . count($GLOBALS['SB'])))); }

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

$fail = 0; $n = 0;
$ok = function ($c, $m, $d = '') use (&$fail, &$n) { $n++; echo ($c ? '  ✔ ' : '  ✖ ') . $m . ((!$c && $d !== '') ? "\n      → $d" : '') . "\n"; if (!$c) $fail++; };
$reset = function () { $GLOBALS['MAILS'] = array(); $GLOBALS['SB'] = array(); $GLOBALS['UP'] = array(); $GLOBALS['DEL'] = array(); $GLOBALS['WARN'] = array(); $GLOBALS['DOCS'] = array(); $GLOBALS['SMTP_OK'] = true; };
$has = function ($hay, $needle) { return strpos($hay, $needle) !== false; };

/* Proyecto base: el caso real, 31C. Aprobado en inglés, pago único, sin texto libre, sin
 * impuestos (cliente extranjero), 21.320 €. Cada caso cambia solo lo que prueba. */
$BASE = array('id' => '13f64699-00dd-49dc-8fa3-67c0b0a6c6fb', 'ref' => '31C', 'title_es' => 'Stand 31C', 'title_en' => '31C stand',
	'client_name' => 'Cliente de Prueba', 'client_email' => 'cliente@example.com, otra@example.com', 'approved' => true, 'approved_lang' => 'en',
	'approved_with_offer' => false, 'discount_amount' => 0, 'iva_rate' => '0.0000', 'irpf_rate' => '0.0000',
	'payment_split' => '100', 'payment_terms_es' => '', 'payment_terms_en' => '',
	'income_account' => 'ES00 1111 2222 3333 4444 5555', 'bic_code' => 'PRUEESMM000',
	'billing_company' => 'Thirty One C Ltd', 'billing_cif' => 'IL000000000', 'billing_address' => '1 Test Street', 'billing_postal_code' => '00000', 'billing_city' => 'Tel Aviv', 'billing_country' => 'Israel',
	'fair_slug' => 'web-summit', 'access_token' => 'abc123', 'contract_code' => null, 'contract_issued_at' => null, 'contract_state' => 'pendiente', 'contract_meta' => null);
$GLOBALS['BUDGET'] = array(array('amount' => 21320));
/* Una imagen del repo para el anexo, si la hay: así el PDF de la prueba se parece al real. */
$render = glob($repo . '/static/img/galeria-renders/*-800.jpg');
$GLOBALS['MEDIA'] = $render ? array(array('src' => 'file://' . $render[0])) : array();

$issue = function ($over = array(), $opts = array()) use ($BASE) {
	$GLOBALS['P'] = array_merge($BASE, $over);
	return cpx_contract_issue($GLOBALS['P']['id'], $opts);
};
/* Emite de verdad (contra los dobles) y devuelve [resultado, cláusula D leída del PDF guardado]. */
$emit = function ($over = array()) use ($issue, $reset, $ver) {
	$reset();
	$r = $issue($over);
	$d = '';
	if (!empty($r['ok']) && $GLOBALS['UP']) {
		$file = HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][0]);
		$d = clause_d(pdf_text(file_get_contents($file)));
	}
	if ($ver) echo "      «" . ($d !== '' ? $d : 'NO EMITIDO: ' . implode('; ', isset($r['errors']) ? $r['errors'] : array())) . "»\n";
	return array($r, $d);
};
$meta = function () { foreach ($GLOBALS['SB'] as $c) { if ($c['m'] === 'PATCH' && isset($c['data']['contract_meta'])) return $c['data']['contract_meta']; } return array(); };

echo "1) El caso real: 31C, reparto «100», sin texto libre, aprobado en inglés\n";
list($r, $d) = $emit();
$ok(!empty($r['ok']), 'se emite', json_encode(isset($r['errors']) ? $r['errors'] : ''));
$ok($has($d, 'shall pay 100% of the amount (€21,320.00') && $has($d, 'in advance'), 'el PDF dice «shall pay 100% of the amount (€21,320.00 …) in advance»', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)) && !$has($d, 'final payment') && !$has($d, 'remaining'), 'el PDF NO habla de 80 %, 20 % ni de pago final', $d);
$ok($has($d, 'to account ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000)'), 'lleva la cuenta de ingreso', $d);
$ok(isset($r['clause']) && preg_replace('/\s+/', ' ', $r['clause']) === $d, 'lo que devuelve la emisión es, palabra por palabra, lo impreso', isset($r['clause']) ? $r['clause'] : '');
$m = $meta();
$ok(isset($m['split']) && $m['split'] === '100' && $m['advance_eur'] == 21320 && $m['rest_eur'] == 0 && $m['total_eur'] == 21320, 'el sello guarda reparto 100, anticipo 21.320 y resto 0', json_encode($m));
$ok(isset($r['summary']) && $r['summary'] === 'pago único del 100 % por adelantado (21.320,00 €)', 'resumen para el gestor: «' . (isset($r['summary']) ? $r['summary'] : '') . '»');
$ok(count($GLOBALS['MAILS']) === 3 && $GLOBALS['MAILS'][2]['to'] === 'javier@standarte.es', 'correo a las dos direcciones del cliente y copia a Javier', count($GLOBALS['MAILS']) . ' correos');
if ($GLOBALS['UP']) copy(HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][0]), HARNESS_DIR . '/out/31C-pago-unico-en.pdf');

echo "2) El mismo proyecto en español\n";
list($r, $d) = $emit(array('approved_lang' => 'es'));
$ok($has($d, 'abonará por adelantado el 100 % del importe (21.320,00 €') && $has($d, 'en la cuenta ES00 1111 2222 3333 4444 5555 (BIC PRUEESMM000)'), '«abonará por adelantado el 100 % del importe (21.320,00 € …)»', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)) && !$has($d, 'pago final') && !$has($d, 'restante'), 'sin 80 %, 20 % ni pago final', $d);
if ($GLOBALS['UP']) copy(HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][0]), HARNESS_DIR . '/out/31C-pago-unico-es.pdf');

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

echo "5) Texto libre de forma de pago que coincide con el reparto\n";
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_terms_es' => '100% por Anticipado'));
$ok($has($d, 'conforme a la forma de pago acordada entre las partes: 100% por Anticipado, en la cuenta') && $has($d, 'Importe: un único pago del 100 % (21.320,00 €'), 'texto + «Importe: un único pago del 100 % (21.320,00 €)»', $d);
$ok($d !== '' && !dice_pct($d, array(80, 20)), 'sin 80/20', $d);
list($r, $d) = $emit(array('payment_split' => null, 'payment_terms_en' => '80% in advance / 20% post-delivery'));
$ok($has($d, 'payment terms agreed between the parties: 80% in advance / 20% post-delivery') && $has($d, 'Amounts: a first payment of 80% (€17,056.00') && $has($d, 'a second payment of the remaining 20% (€4,264.00)'), 'texto 80/20 + reparto vacío (por defecto): importes 17.056 y 4.264', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => '80% in advance'));
$ok(!empty($r['ok']) && $has($d, 'Importes: un primer pago del 80 % (17.056,00 €') && $has($d, 'segundo pago del 20 % restante (4.264,00 €)'), 'el texto solo nombra el primer tramo: vale', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_terms_es' => 'Transferencia bancaria al aprobar el diseño'));
$ok(!empty($r['ok']) && $has($d, 'Transferencia bancaria al aprobar el diseño') && $has($d, 'Importe: un único pago del 100 % (21.320,00 €'), 'texto sin porcentajes: se imprime y el importe lo pone el reparto', $d);

echo "6) El texto del OTRO idioma no cuenta, y un texto vacío ya no cae al 80/20\n";
list($r, $d) = $emit(array('payment_terms_es' => '100% por Anticipado', 'payment_terms_en' => ''));
$ok($has($d, 'shall pay 100% of the amount (€21,320.00') && !dice_pct($d, array(80, 20)), 'aprobado en inglés con texto solo en español (Rocacorba, Lontex Opción 2): 100 %', $d);
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '80/20', 'payment_terms_es' => '80% in advance', 'payment_terms_en' => '100% in avance'));
$ok(!empty($r['ok']) && $has($d, '80 %'), 'contrato en español: el texto inglés contradictorio no lo bloquea', $d);

echo "7) Bloqueos: el contrato NO se emite si el texto contradice al reparto\n";
$bloqueado = function ($r) { return empty($r['ok']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && !$GLOBALS['MAILS']; };
list($r, $d) = $emit(array('payment_terms_en' => '80% in advance / 20% post-delivery'));
$ok($bloqueado($r) && $has(implode(';', $r['errors']), 'habla de 80 % y 20 %') && $has(implode(';', $r['errors']), 'reparto de pago del proyecto es 100'), 'reparto 100 + texto «80% / 20%»: bloqueado, nada guardado ni enviado', json_encode($r));
list($r, $d) = $emit(array('payment_split' => '80/20', 'payment_terms_en' => '100% in avance'));
$ok($bloqueado($r) && $has(implode(';', $r['errors']), 'habla de 100 %'), 'reparto 80/20 + texto «100% in avance» (Lontex en inglés): bloqueado', json_encode($r));
list($r, $d) = $emit(array('payment_split' => null, 'payment_terms_en' => '70% in avance / 30% post-delivery'));
$ok($bloqueado($r) && $has(implode(';', $r['errors']), '80/20 (el de por defecto: el campo está vacío)'), 'reparto vacío + texto «70% / 30%» (Paynopain en inglés): bloqueado y dice que el reparto está vacío', json_encode($r));
list($r, $d) = $emit(array('payment_split' => '50/30/20'));
$ok($bloqueado($r) && $has(implode(';', $r['errors']), 'no es válido'), 'reparto «50/30/20»: bloqueado (no se adivina un 80/20)', json_encode($r));
list($r, $d) = $emit(array('payment_split' => '80/20', 'payment_terms_en' => '20% on delivery, 80% in advance'));
$ok($bloqueado($r), 'porcentajes en orden contrario al reparto: bloqueado', json_encode($r));

echo "8) Los importes cuadran al céntimo con el total y con las facturas\n";
$GLOBALS['BUDGET'] = array(array('amount' => 1000.01));
list($r, $d) = $emit(array('approved_lang' => 'es', 'payment_split' => '33,33/66,67'));
$m = $meta();
$ok(!empty($r['ok']) && abs(($m['advance_eur'] + $m['rest_eur']) - $m['total_eur']) < 0.00001 && $has($d, 'el 33,33 % del importe') && $has($d, 'del 66,67 % restante'), '33,33/66,67 de 1.000,01 €: ' . (isset($m['advance_eur']) ? $m['advance_eur'] . ' + ' . $m['rest_eur'] . ' = ' . $m['total_eur'] : ''), $d);
$GLOBALS['BUDGET'] = array(array('amount' => 21320));
foreach (array(array('100', '0.0000', '0.0000'), array('50/50', '0.0000', '0.0000'), array('80/20', '0.2100', '0.1500'), array('100', '0.2100', '0.1500'), array('70/30', '0.2100', '0.0000')) as $c) {
	$P = array_merge($BASE, array('payment_split' => $c[0], 'iva_rate' => $c[1], 'irpf_rate' => $c[2]));
	$tot = cpx_contract_totals($P, $GLOBALS['BUDGET']);
	$plan = cpx_payment_plan(cpx_payment_split($P), $tot['total']);
	$f1 = cpx_invoice_amounts($P, $GLOBALS['BUDGET'], 1, null);
	$f2 = $plan['single'] ? null : cpx_invoice_amounts($P, $GLOBALS['BUDGET'], 2, null);
	$igual = abs($f1['total'] - $plan['amounts'][0]) < 0.005 && ($plan['single'] || abs($f2['total'] - $plan['amounts'][1]) < 0.005);
	$ok($igual, "reparto {$c[0]}, IVA {$c[1]}, IRPF {$c[2]}: contrato " . implode(' + ', $plan['amounts']) . ' = facturas ' . $f1['total'] . ($f2 ? ' + ' . $f2['total'] : ''));
}

echo "9) Vista previa: lo que se confirma antes de emitir, sin generar ni guardar ni enviar\n";
$reset();
$r = $issue(array(), array('preview' => true));
$ok(!empty($r['ok']) && !empty($r['preview']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && !$GLOBALS['MAILS'], 'no guarda, no sube, no envía');
$ok($has($r['clause'], 'shall pay 100% of the amount (€21,320.00)') && !dice_pct($r['clause'], array(80, 20)) && $r['email'] === 'cliente@example.com, otra@example.com' && $r['split'] === '100' && $r['replaces'] === null, 'devuelve la cláusula, los destinatarios y el reparto', json_encode($r));
$reset();
$r = $issue(array('payment_terms_en' => '80% in advance'), array('preview' => true));
$ok(empty($r['ok']) && $has(implode(';', $r['errors']), 'habla de 80 %'), 'la vista previa también enseña el bloqueo', json_encode($r));

echo "10) Prueba (dry_run): solo a Javier, nada guardado\n";
$reset();
$r = $issue(array(), array('dry_run' => true));
$ms = $GLOBALS['MAILS'];
$ok(!empty($r['ok']) && !empty($r['dry_run']) && !$GLOBALS['SB'] && !$GLOBALS['UP'] && count($ms) === 1 && $ms[0]['to'] === 'javier@standarte.es' && strpos($ms[0]['subject'], '[PRUEBA]') === 0, 'un solo correo, a Javier, con [PRUEBA]', json_encode(array_map(function ($x) { return $x['to']; }, $ms)));
$ok($ms && $has($ms[0]['html'], 'forma de pago del contrato: pago único del 100 % por adelantado (21.320,00 €)'), 'el correo de prueba dice la forma de pago del contrato');
$dp = $ms ? clause_d(pdf_text($ms[0]['att'][0]['data'])) : '';
$ok($has($dp, 'shall pay 100% of the amount') && !dice_pct($dp, array(80, 20)), 'y su PDF adjunto dice 100 %', $dp);

echo "11) Reemitir: el contrato nuevo sustituye al anterior\n";
$reset();
$pid = $BASE['id'];
$GLOBALS['P'] = array_merge($BASE, array('contract_code' => 'SC-2026-F1B519BF', 'contract_issued_at' => '2026-11-13T18:53:12+00:00', 'contract_state' => 'emitido',
	'contract_meta' => array('lang' => 'en', 'total_eur' => 21320, 'advance_eur' => 17056, 'path' => $pid . '/docs/contrato-sc-2026-f1b519bf.pdf')));
$GLOBALS['DOCS'] = array(
	array('id' => 'aaaaaaaa-0000-0000-0000-000000000001', 'path' => $pid . '/docs/contrato-sc-2026-f1b519bf.pdf'),   // el generado, con el error
	array('id' => 'aaaaaaaa-0000-0000-0000-000000000002', 'path' => $pid . '/docs/0123456789abcdef.pdf'));           // uno subido a mano (p. ej. firmado)
$docs0 = $GLOBALS['DOCS'];
$r = cpx_contract_issue($pid, array('preview' => true));
$ok(!empty($r['ok']) && is_array($r['replaces']) && $r['replaces']['code'] === 'SC-2026-F1B519BF' && $r['replaces']['state'] === 'emitido', 'la vista previa avisa de que sustituye a SC-2026-F1B519BF');
$GLOBALS['DOCS'] = $docs0;
$r = cpx_contract_issue($pid);
$dels = array_values(array_filter($GLOBALS['SB'], function ($c) { return $c['m'] === 'DELETE'; }));
$ok(!empty($r['ok']) && $r['replaced'] === 'SC-2026-F1B519BF' && $r['retired'] === 1, 'emitido; sustituye a SC-2026-F1B519BF', json_encode($r));
$ok(count($dels) === 1 && $has($dels[0]['ep'], 'aaaaaaaa-0000-0000-0000-000000000001') && $GLOBALS['DEL'] === array($pid . '/docs/contrato-sc-2026-f1b519bf.pdf'), 'retira de la Documentación SOLO el contrato generado anterior (el subido a mano se queda)', json_encode($dels) . ' ' . json_encode($GLOBALS['DEL']));
$m = $meta();
$ok(isset($m['replaces'][0]['code']) && $m['replaces'][0]['code'] === 'SC-2026-F1B519BF' && $m['split'] === '100' && $m['advance_eur'] == 21320, 'el sello nuevo anota a quién sustituye y lleva 100 %', json_encode($m));
$html = $GLOBALS['MAILS'] ? $GLOBALS['MAILS'][0]['html'] : '';
$ok($has($html, 'replaces and supersedes') && $has($html, 'SC-2026-F1B519BF') && $has($html, 'November 13, 2026'), 'el correo al cliente dice que sustituye al del 13 de noviembre', strip_tags($html));
$d = $GLOBALS['UP'] ? clause_d(pdf_text(file_get_contents(HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][0])))) : '';
$ok($has($d, 'shall pay 100% of the amount (€21,320.00') && !dice_pct($d, array(80, 20)), 'y el PDF nuevo dice 100 %', $d);
$reset();
$r = $issue();
$ok($GLOBALS['MAILS'] && !$has($GLOBALS['MAILS'][0]['html'], 'supersedes') && $r['replaced'] === '' && !array_filter($GLOBALS['SB'], function ($c) { return $c['m'] === 'DELETE'; }), 'una primera emisión no habla de sustituir ni borra nada');

echo "12) Lectura de porcentajes en el texto libre\n";
foreach (array('80% in advance / 20% post-delivery' => array(80.0, 20.0), '100 % por anticipado' => array(100.0), '100 por ciento al aprobar' => array(100.0), '33,5 % y 66.5%' => array(33.5, 66.5),
		'Transferencia a 30 días' => array(), '1.200 € al aprobar' => array(), 'fifty percent' => array(), '50 percent now, 50 per cent later' => array(50.0, 50.0)) as $txt => $exp) {
	$got = cpx_payment_terms_pcts($txt);
	$ok($got === $exp, "«{$txt}» → [" . implode(', ', $got) . ']');
}
foreach (array('100' => array(array(100), false), '80/20' => array(array(80.0, 20.0), false), ' 70 / 30 ' => array(array(70.0, 30.0), false), '50-50' => array(array(50.0, 50.0), false), '' => array(array(80, 20), true)) as $raw => $exp) {
	$s = cpx_payment_split(array('payment_split' => $raw));
	$ok($s['pct'] == $exp[0] && $s['default'] === $exp[1] && $s['error'] === '', "reparto «{$raw}» → " . implode('/', $s['pct']) . ($s['default'] ? ' (por defecto)' : ''));
}
foreach (array('50/30/20', '60/30', '100/0', 'abc', '0/100') as $raw) {
	$s = cpx_payment_split(array('payment_split' => $raw));
	$ok($s['error'] !== '', "reparto «{$raw}» → no válido");
}

$ok(!$GLOBALS['WARN'], 'sin avisos de PHP en toda la prueba', implode(' | ', array_unique($GLOBALS['WARN'])));

/* Contraste independiente, si la máquina tiene pdftotext: lee el PDF con otra herramienta. */
$pt = trim((string) @shell_exec('command -v pdftotext 2>/dev/null'));
if ($pt !== '' && file_exists(HARNESS_DIR . '/out/31C-pago-unico-en.pdf')) {
	$txt = preg_replace('/\s+/', ' ', (string) shell_exec(escapeshellarg($pt) . ' -layout ' . escapeshellarg(HARNESS_DIR . '/out/31C-pago-unico-en.pdf') . ' - 2>/dev/null'));
	echo "13) Contraste con pdftotext sobre el PDF de 31C\n";
	$ok($has($txt, 'shall pay 100% of the amount') && !preg_match('/\b80\s?%/', $txt) && !$has($txt, 'remaining 20'), 'pdftotext lee «shall pay 100% of the amount» y ningún 80 %');
}

echo "\n" . ($fail ? "✖ {$fail} de {$n} comprobaciones han fallado" : "✔ {$n} comprobaciones, todas correctas") . "\nPDF en " . HARNESS_DIR . "/out\n";
exit($fail ? 1 : 0);
