<?php
/*
 * probar_facturas.php — prueba local del generador de facturas (05/11/2026).
 *
 * Ejecuta el código REAL de static/admin/invoice_lib.php con dobles para Supabase,
 * Storage y correo: no sale nada a la red. Comprueba la lectura del importe, la emisión
 * de una factura EXTRA (qué se guardaría en client_project_docs y client_project_invoices,
 * ruta del PDF, correo al cliente y copia a Javier), los rechazos, el modo prueba, que el
 * correo de la Factura 1 lleva texto y el cambio de estado de una extra. Deja los PDF en
 * una carpeta temporal para mirarlos.
 *
 *   php scripts/probar_facturas.php        (sale con 1 si algo falla)
 *
 * Cómo funciona: copia invoice_lib.php a una carpeta temporal junto a un enlace a lib/
 * (FPDF y el logo) y a un email_campaing/ falso, y define antes las funciones que el
 * fichero tomaría de client_projects_lib.php y contract_lib.php.
 */
$repo = dirname(__DIR__);
$tmp = rtrim(sys_get_temp_dir(), '/') . '/std-facturas-' . getmypid();
@mkdir($tmp . '/email_campaing', 0777, true); @mkdir($tmp . '/out', 0777, true);
copy($repo . '/static/admin/invoice_lib.php', $tmp . '/invoice_lib.php');
if (!file_exists($tmp . '/lib')) symlink($repo . '/static/admin/lib', $tmp . '/lib');
file_put_contents($tmp . '/email_campaing/mailer.php', "<?php\nfunction campaign_send_smtp(\$cfg, \$to, \$subject, \$html, \$att = array()) { \$GLOBALS['MAILS'][] = array('to' => \$to, 'subject' => \$subject, 'html' => \$html, 'att' => array_map(function (\$a) { return \$a['name']; }, \$att)); return true; }\n");
file_put_contents($tmp . '/email_campaing/config.php', "<?php return array('stub' => true);\n");
define('HARNESS_DIR', $tmp);
error_reporting(E_ALL); ini_set('display_errors', '1');
set_error_handler(function ($no, $str, $file, $line) { $GLOBALS['WARN'][] = "$str @" . basename($file) . ":$line"; return true; });
$GLOBALS['MAILS'] = array(); $GLOBALS['SB'] = array(); $GLOBALS['UP'] = array(); $GLOBALS['WARN'] = array(); $GLOBALS['TEST'] = array();
define('CPX_ADMIN_MAIL', 'javier@standarte.es');
function cpx_fetch_rates() { return array('USD' => 1.08, 'GBP' => 0.84, 'date' => '2026-11-04', 'source' => 'stub'); }
function cpx_money($n, $lang, $cur = 'EUR') {
	$s = ($lang === 'en') ? number_format((float) $n, 2, '.', ',') : number_format((float) $n, 2, ',', '.');
	if ($cur === 'EUR') return ($lang === 'en') ? '€' . $s : $s . ' €';
	if ($cur === 'USD') return ($lang === 'en') ? 'US$ ' . $s : $s . ' US$';
	if ($cur === 'GBP') return ($lang === 'en') ? '£ ' . $s : $s . ' £';
	return $s . ' ' . $cur;
}
function cpx_test_mail($subject, $p, $clientEmail, $clientHtml, $attachment, $warnings) { $GLOBALS['TEST'][] = array('subject' => $subject, 'html' => $clientHtml, 'att' => $attachment['name']); file_put_contents(HARNESS_DIR . '/out/' . $attachment['name'], $attachment['data']); return $GLOBALS['TEST_SENT']; }
function cpx_contract_totals($p, $budget) { $s = 0; foreach ($budget as $b) $s += (float) $b['amount']; $disc = !empty($p['approved_with_offer']) ? (float) $p['discount_amount'] : 0; return array('subtotal' => $s, 'discount' => $disc, 'base' => $s - $disc, 'total' => $s - $disc); }
function cpx_emails($raw) { return array_values(array_filter(array_map('trim', preg_split('/[,;\s]+/', (string) $raw)))); }
function cpx_accounts() { return array(array('iban' => 'ES00 1111 2222 3333 4444 5555', 'bank' => 'CAJA RURAL DE EXTREMADURA', 'bic' => 'BCOEESMM000')); }
function cpx_fair_info($slug) { return array('name' => 'Expodental'); }
function cpx_budget_rows($pid, $sel = 'amount') { return array(array('amount' => 9665, 'concept_es' => 'Stand', 'concept_en' => 'Stand')); }
function cpx_send_each($cfg, $recipients, $subject, $html, $att = array()) { $ok = false; foreach ((array) $recipients as $to) { if (campaign_send_smtp($cfg, $to, $subject, $html, $att)) $ok = true; } return $ok; }
function cpx_storage_upload($path, $local, $mime, $bucket = 'client-projects') { $GLOBALS['UP'][] = $path; copy($local, HARNESS_DIR . '/out/' . basename($path)); return 200; }
function cpx_storage_delete_object($path, $bucket = 'client-docs') { $GLOBALS['DEL'][] = $path; }
$GLOBALS['P'] = array('id' => '11111111-2222-3333-4444-555555555555', 'ref' => 'SHINING 3D', 'title_es' => 'SHINING 3D STAND SEdO Alineadores - Granada', 'title_en' => 'SHINING 3D STAND SEdO Alineadores - Granada',
	'client_name' => 'Antonio Grieco', 'client_email' => 'cliente@example.com', 'approved' => true, 'approved_lang' => 'en', 'approved_with_offer' => true, 'discount_amount' => 1000,
	'iva_rate' => '0.0000', 'irpf_rate' => '0.0000', 'payment_split' => '100', 'invoice_state' => 'cursado', 'income_account' => 'ES00 1111 2222 3333 4444 5555', 'bic_code' => 'BCOEESMM000',
	'billing_company' => 'SHINING 3D Technology GmbH', 'billing_cif' => 'DE310612039', 'billing_address' => 'Breitwiesenstraße 28', 'billing_postal_code' => '70565', 'billing_city' => 'Stuttgart', 'billing_country' => 'Germany',
	'fair_slug' => 'expodental', 'access_token' => 'abc123');
$GLOBALS['TAKEN'] = array('2026-31');
function cpx_rows($ep) {
	if (strpos($ep, 'client_projects?') === 0) return array($GLOBALS['P']);
	if (strpos($ep, 'client_project_invoices?select=id,project_id&number=eq.') === 0) { $n = urldecode(substr($ep, strlen('client_project_invoices?select=id,project_id&number=eq.'), -8)); return in_array($n, $GLOBALS['TAKEN'], true) ? array(array('id' => 'x')) : array(); }
	if (strpos($ep, 'client_project_invoices?project_id=') === 0) return array(array('which' => 1, 'number' => '2026-31', 'meta' => array('base' => 8665), 'amount_eur' => 8665));
	return array();
}
function cpx_sb($m, $ep, $data = null) { $GLOBALS['SB'][] = array('m' => $m, 'ep' => $ep, 'data' => $data); return array('code' => 201, 'body' => array(array('id' => 'doc-' . count($GLOBALS['SB'])))); }

require HARNESS_DIR . '/invoice_lib.php';

$fail = 0;
$ok = function ($c, $m, $d = '') use (&$fail) { echo ($c ? '  ✔ ' : '  ✖ ') . $m . ($d !== '' ? "  ($d)" : '') . "\n"; if (!$c) $fail++; };
$reset = function () { $GLOBALS['MAILS'] = array(); $GLOBALS['SB'] = array(); $GLOBALS['UP'] = array(); $GLOBALS['TEST'] = array(); $GLOBALS['WARN'] = array(); };

echo "1) Lectura del importe\n";
foreach (array('900' => 900.0, '900,50' => 900.5, '900.5' => 900.5, '1.200' => 1200.0, '1.200,50' => 1200.5, '1,200.50' => 1200.5, '1 200' => 1200.0, '900 €' => 900.0, '12.345.678' => 12345678.0,
		'1.2000' => null, 'abc' => null, '' => null, '-5' => null, '1,2,3' => null, '900,505' => 900505.0) as $in => $exp) {
	$got = cpx_parse_amount($in);
	$ok($got === $exp, "«{$in}» → " . var_export($got, true));
}

echo "2) Extra real: SHINING 3D, «1.200», concepto largo, inglés sin impuestos\n";
$reset();
$concept = 'Additional perimeter truss with lighting and rigging points requested by the client after approval, installed on site';
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '2026-32', $concept, '1.200');
$ok(!empty($r['ok']), 'emitida', json_encode(isset($r['errors']) ? $r['errors'] : $r['number']));
$ok(isset($r['base']) && $r['base'] == 1200 && $r['total'] == 1200, 'base y total 1.200 €', (isset($r['base']) ? $r['base'] : '-') . ' / ' . (isset($r['total']) ? $r['total'] : '-'));
$docs = array_values(array_filter($GLOBALS['SB'], function ($c) { return $c['ep'] === 'client_project_docs'; }));
$inv = array_values(array_filter($GLOBALS['SB'], function ($c) { return $c['ep'] === 'client_project_invoices'; }));
$ok(count($docs) === 1 && $docs[0]['data']['kind'] === 'factura_extra' && $docs[0]['data']['title'] === 'Invoice 2026-32 (extra)', 'documento factura_extra con título «Invoice 2026-32 (extra)»', $docs ? $docs[0]['data']['title'] : '');
$ok(count($inv) === 1 && $inv[0]['data']['which'] === 3 && $inv[0]['data']['concept'] === $concept && $inv[0]['data']['state'] === 'emitido' && $inv[0]['data']['amount_eur'] == 1200 && $inv[0]['data']['doc_id'] === 'doc-1', 'registro which=3, concepto, estado emitido, 1.200 €, enlazado al documento');
$ok(isset($GLOBALS['UP'][0]) && preg_match('#/docs/factura-extra-2026-32-[0-9a-f]{6}\.pdf$#', $GLOBALS['UP'][0]), 'ruta con sufijo único', isset($GLOBALS['UP'][0]) ? $GLOBALS['UP'][0] : '');
$m = $GLOBALS['MAILS'];
$ok(count($m) === 2 && $m[0]['to'] === 'cliente@example.com' && $m[1]['to'] === 'javier@standarte.es' && strpos($m[1]['subject'], '[Copia]') === 0, 'correo al cliente y copia a Javier', count($m) . ' correos');
$ok($m && strpos($m[0]['html'], 'additional service') !== false && strpos($m[0]['html'], htmlspecialchars($concept, ENT_QUOTES, 'UTF-8')) !== false && strpos($m[0]['html'], '€1,200.00') !== false && strpos($m[0]['html'], '2026-32') !== false, 'el cuerpo nombra el concepto, el número y €1,200.00');
$ok(!$GLOBALS['WARN'], 'sin avisos de PHP', implode(' | ', $GLOBALS['WARN']));
if ($GLOBALS['UP']) copy(HARNESS_DIR . '/out/' . basename($GLOBALS['UP'][0]), __DIR__ . '/out/extra-largo.pdf');

echo "3) Rechazos: importe raro, número repetido, sin concepto\n";
$reset();
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '2026-33', 'Truss', '1.2000');
$ok(empty($r['ok']) && strpos(implode(';', $r['errors']), 'no reconocido') !== false && !$GLOBALS['SB'] && !$GLOBALS['MAILS'], '«1.2000» rechazado sin guardar ni enviar');
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '2026-31', 'Truss', '900');
$ok(empty($r['ok']) && strpos(implode(';', $r['errors']), 'ya está usado') !== false, 'número 2026-31 ya usado → rechazado');
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '2026-33', '   ', '900');
$ok(empty($r['ok']) && strpos(implode(';', $r['errors']), 'concepto') !== false, 'sin concepto → rechazado');

echo "4) Prueba (dry_run): solo a Javier, nada guardado; y aviso si el correo no sale\n";
$reset(); $GLOBALS['TEST_SENT'] = true;
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '', 'Truss adicional', '900', array('dry_run' => true));
$ok(!empty($r['ok']) && !empty($r['dry_run']) && $r['sent'] === true && count($GLOBALS['TEST']) === 1 && !$GLOBALS['SB'] && !$GLOBALS['UP'] && !$GLOBALS['MAILS'], 'PDF de prueba a Javier, sin guardar ni enviar al cliente');
$reset(); $GLOBALS['TEST_SENT'] = false;
$r = cpx_invoice_issue_extra($GLOBALS['P']['id'], '', 'Truss adicional', '900', array('dry_run' => true));
$ok($r['sent'] === false && strpos(implode(';', $r['warnings']), 'NO ha salido') !== false, 'si el SMTP falla, lo avisa');

echo "5) Factura 1 normal (prueba): el cuerpo del correo ya no sale vacío\n";
$reset(); $GLOBALS['TEST_SENT'] = true;
$r = cpx_invoice_issue($GLOBALS['P']['id'], 1, '', array('dry_run' => true));
$html = $GLOBALS['TEST'] ? $GLOBALS['TEST'][0]['html'] : '';
$ok(!empty($r['ok']) && preg_match("#<p style='margin:0 0 16px;'>Please find attached invoice <strong>PRUEBA-#", $html), 'el párrafo lleva «Please find attached invoice …»', substr(strip_tags($html), 0, 90));
$ok(!$GLOBALS['WARN'], 'sin «Undefined variable $labMail»', implode(' | ', $GLOBALS['WARN']));

echo "6) Estado de una extra\n";
$reset();
$ok(cpx_invoice_extra_state('11111111-2222-3333-4444-555555555555', '66666666-7777-8888-9999-000000000000', 'pagado')['error'] === 'bad_state', 'estado desconocido rechazado');
$res = cpx_invoice_extra_state('11111111-2222-3333-4444-555555555555', '66666666-7777-8888-9999-000000000000', 'cursado');
$ok($res['ok'] && strpos($GLOBALS['SB'][0]['ep'], '&which=eq.3') !== false && $GLOBALS['SB'][0]['data'] === array('state' => 'cursado'), 'PATCH solo sobre which=3 del proyecto');

echo $fail ? "\n✖ $fail fallo(s)\n" : "\n✔ todo correcto. PDF en " . HARNESS_DIR . "/out\n";
exit($fail ? 1 : 0);
