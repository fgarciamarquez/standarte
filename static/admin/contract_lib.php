<?php
/*
 * Emisión automática del CONTRATO de un proyecto de cliente (Standarte).
 *
 * Se dispara desde el panel al pasar «Contrato» a «Emitido». Convierte en plantilla
 * el contrato-tipo que se venía haciendo a mano y lo rellena con lo que el proyecto ya
 * sabe: los datos de facturación que el cliente dejó al aprobar, el evento vinculado,
 * el total aprobado y la cuenta de ingreso elegida. Genera el PDF (FPDF, sin
 * dependencias), lo guarda en la Documentación privada del proyecto, se lo envía al
 * cliente y anota el código del sello para poder verificarlo después.
 *
 * Decisiones que conviene conocer:
 *  - Idioma: el que el cliente tenía puesto al APROBAR (approved_lang). Es su idioma
 *    de trabajo demostrado, no una suposición.
 *  - Firma: en lugar de la rúbrica a mano va un SELLO con código único (SC-AAAA-XXXXXXXX)
 *    sobre el bloque de firma y sobre el render del anexo. Es firma electrónica simple:
 *    identifica y deja rastro verificable (verificar.php), no equivale a una manuscrita.
 *  - Sin imagen del DNI: solo nombre y NIF. El documento de identidad no se guarda ni
 *    viaja en ningún PDF.
 *  - Monedas: el importe contractual es el de EUROS; el dólar y la libra son
 *    conversiones indicativas al cambio del BCE del día de emisión, y una cláusula deja
 *    la conversión a otras monedas a cargo del cliente. Si el tipo de cambio no se
 *    puede obtener, el contrato sale solo en euros y el panel lo avisa.
 *  - 80 % de anticipo y 20 % a la entrega, fijos por ahora (decisión del 2026-09-05).
 *
 * Requiere supabase-config.php y client_projects_lib.php ya incluidos.
 */
require_once __DIR__ . '/lib/fpdf.php';

/* ---------- Textos del contrato (es / en) ---------- */
function cpx_contract_texts($lang) {
	$T = array(
		'es' => array(
			'title' => 'CONTRATO DE PRESTACIÓN DE SERVICIOS',
			'place' => 'Cáceres, %s (España).',
			'party1' => 'De una parte, Fco. Javier García Márquez (titular y representante de STANDARTE), con NIF 34779359R y domicilio en C/ Los Sauces 24, Cáceres (España).',
			'party2' => 'De otra parte, %s, con domicilio en %s%s.',
			'party2_id' => ', y número de identificación %s',
			'declare' => 'LAS PARTES DECLARAN:',
			'first' => 'PRIMERO. STANDARTE es una empresa de servicios especializada en el desarrollo de proyectos de diseño, construcción y montaje de stands en ferias nacionales e internacionales.',
			'second' => 'SEGUNDO. Ambas partes acuerdan formalizar el presente CONTRATO DE PRESTACIÓN DE SERVICIOS con arreglo a las siguientes CLÁUSULAS:',
			'A' => 'A. STANDARTE creará el stand para la participación de %s en %s.',
			'A_where' => ', que se celebra en %s',
			'B' => 'B. Los servicios prestados por STANDARTE comprenden el diseño, la construcción, el montaje y el desmontaje del stand.',
			'C' => 'C. El coste total del servicio es de %s%s. En caso de modificación del plan de servicios, ambas partes acuerdan enmendar el contrato para sustituir o complementar el presente acuerdo.',
			'D' => 'D. %s abonará por adelantado el 80 %% del importe (%s%s) mediante transferencia bancaria a Francisco Javier García Márquez (titular de Standarte)%s. El pago final del 20 %% restante (%s) se realizará una vez entregado el proyecto en %s.',
			'D_account' => ', en la cuenta %s (BIC %s)',
			'D_where_fallback' => 'el recinto de la feria',
			'E' => 'E. Los importes en dólares estadounidenses y libras esterlinas son conversiones orientativas al tipo de cambio del %s (fuente: Banco Central Europeo). El importe contractual es el expresado en euros. Si el cliente opera en una moneda distinta de las indicadas —por ejemplo, el peso mexicano—, será responsable de realizar la conversión a su moneda y de que los ingresos en euros sean correctos, asumiendo las diferencias de cambio y las comisiones bancarias.',
			'E_norates' => 'E. El importe contractual es el expresado en euros. Si el cliente opera en otra moneda —por ejemplo, el dólar estadounidense, la libra esterlina o el peso mexicano—, será responsable de realizar la conversión a su moneda y de que los ingresos en euros sean correctos, asumiendo las diferencias de cambio y las comisiones bancarias.',
			'F' => 'F. Ambas partes se comprometen a reunirse y a facilitarse mutuamente —o a las entidades colaboradoras externas— toda la información necesaria para la ejecución de los trabajos.',
			'G' => 'G. El presente contrato y toda la información técnica, comercial, jurídica o de otra índole intercambiada entre las partes antes o durante su vigencia tendrá carácter estrictamente confidencial. En consecuencia, ambas partes se comprometen a no divulgarla durante la vigencia del contrato, salvo en lo estrictamente necesario para el cumplimiento del objeto contractual.',
			'H' => 'H. Las partes acuerdan que toda controversia, desavenencia, cuestión o reclamación derivada de la ejecución o interpretación del presente contrato se resolverá definitivamente mediante arbitraje administrado por el Servicio de Arbitraje de la Cámara Oficial de Comercio, Industria y Navegación de Cáceres, a la que se encomienda la administración del arbitraje y la designación de los árbitros de acuerdo con su Reglamento. Las partes declaran asimismo su compromiso de cumplir el laudo que se dicte. En prueba de conformidad y promesa de fiel cumplimiento, las partes firman el presente contrato por duplicado y a un solo efecto, en el lugar y fecha indicados.',
			'third' => 'TERCERO. Si alguna de las partes se viera impedida de cumplir cualquiera de sus obligaciones conforme a este contrato por cierre patronal, paro u otro conflicto laboral, guerra, actos de terrorismo, disturbios, conmoción civil, caso fortuito, epidemia, pandemia, incendio, inundación u otra causa meteorológica, actuación o directriz gubernamental, o cualquier otra causa similar ajena a su control razonable (un «Supuesto de Fuerza Mayor»), o por cualquier otro hecho natural que impida a %s asistir presencialmente al evento en la fecha contratada, el proveedor se compromete a colaborar con %s para reprogramar los servicios acordados en una fecha disponible dentro de los seis (6) meses naturales siguientes. Si las partes no pudieran (i) reanudar el cumplimiento tras dicho cese y (ii) reprogramar el evento pese a emplear sus mejores esfuerzos, cualquiera de ellas podrá resolver el presente contrato sin responsabilidad mediante notificación escrita a la otra, con devolución a %s de las cantidades abonadas en virtud del mismo.',
			'fourth' => 'CUARTO. A la finalización se realizará una inspección de entrega conjunta. Todos los defectos se recogerán por escrito y STANDARTE hará cuanto esté en su mano para subsanarlos. En su defecto, los trabajos se entenderán plenamente conformes con los requisitos del cliente.',
			'sig_client' => 'Nombre y firma del representante de %s',
			'sig_std' => 'Nombre y firma del representante de Standarte.',
			'sig_std_name' => 'FRANCISCO JAVIER GARCÍA MÁRQUEZ. NIF 34779359R',
			'annex' => 'ANEXO: diseño aprobado de mutuo acuerdo',
			'stamp_signed' => 'Firmado electrónicamente por',
			'stamp_code' => 'Código',
			'stamp_verify' => 'Verificable en:',
			'doc_title' => 'Contrato de prestación de servicios · %s',
			'mail_subject' => 'Contrato de su proyecto %s — Standarte',
			'mail_body' => 'Le adjuntamos el contrato de prestación de servicios de su proyecto <strong>%s</strong> (%s), redactado con los datos que nos facilitó al aprobar la propuesta. Va sellado electrónicamente por Standarte con el código <strong>%s</strong>. Para formalizarlo, le rogamos que lo firme y nos lo devuelva por este mismo correo. Lo tiene también disponible en la Documentación de su proyecto.',
			'mail_button' => 'Abrir el proyecto',
			'usd_fmt' => '%s US$', 'gbp_fmt' => '%s £'
		),
		'en' => array(
			'title' => 'SERVICE AGREEMENT',
			'place' => 'Cáceres, %s (Spain).',
			'party1' => 'On the one hand, Fco. Javier García Márquez (Owner and representative of STANDARTE), holder of Tax ID (NIF) 34779359R, with an address at C/ Los Sauces 24, Cáceres (Spain).',
			'party2' => 'On the other hand, %s, with an address at %s%s.',
			'party2_id' => ', and Identification No. %s',
			'declare' => 'THE PARTIES DECLARE:',
			'first' => 'FIRST. STANDARTE is a service company specializing in the development of projects for the design, construction, and assembly of stands at national and international trade fairs.',
			'second' => 'SECOND. Both parties have agreed to enter into this SERVICE AGREEMENT under the following CLAUSES:',
			'A' => 'A. STANDARTE will create the stand for %s\'s participation in %s.',
			'A_where' => ', to be held in %s',
			'B' => 'B. The services provided by STANDARTE include the design, construction, assembly, and dismantling of the stand.',
			'C' => 'C. The total cost of the service is %s%s. In the event of a modification to the service plan, both parties agree to amend the contract to replace or supplement this agreement.',
			'D' => 'D. %s shall pay 80%% of the amount (%s%s) in advance to Francisco Javier García Márquez (Owner of Standarte) via bank transfer%s. The final payment of the remaining 20%% (%s) will be made after the project is delivered in %s.',
			'D_account' => ', to account %s (BIC %s)',
			'D_where_fallback' => 'the fair venue',
			'E' => 'E. The amounts in US dollars and pounds sterling are indicative conversions at the exchange rate of %s (source: European Central Bank). The contractual amount is the amount expressed in euros. If the client operates in a currency other than those indicated —for example, the Mexican peso—, the client is responsible for converting to its own currency and for ensuring that the amounts credited in euros are correct, bearing any exchange differences and bank charges.',
			'E_norates' => 'E. The contractual amount is the amount expressed in euros. If the client operates in another currency —for example, the US dollar, the pound sterling or the Mexican peso—, the client is responsible for converting to its own currency and for ensuring that the amounts credited in euros are correct, bearing any exchange differences and bank charges.',
			'F' => 'F. Both parties agree to meet and provide each other—or external collaborating entities—with all information necessary for the execution of the work.',
			'G' => 'G. This contract and all technical, commercial, legal, or other information exchanged between the parties prior to or during its term shall be considered strictly confidential. Consequently, both parties commit not to disclose such information during the term of the contract, except where strictly necessary for the fulfillment of the contractual purpose.',
			'H' => 'H. The parties agree that any dispute, disagreement, issue, or claim arising from the execution or interpretation of this contract shall be finally resolved through arbitration administered by the Arbitration Service of the Chamber of Commerce, Industry, and Navigation of Cáceres, which is responsible for administering the arbitration and appointing arbitrators in accordance with its Rules. The parties also expressly declare their commitment to comply with the issued arbitral award. In witness of their agreement and promise of faithful performance, the parties sign this contract in duplicate, for a single purpose, at the place and date indicated above.',
			'third' => 'THIRD. In the event that either party is prevented from fulfilling any of its obligations under this Agreement because of lockout, work stoppage or other labor dispute, war, acts of terrorism, riot, civil commotion, acts of God, epidemic, pandemic, fire, flood or other weather-related reason, governmental action or directive, or other similar reason beyond its reasonable control (a "Force Majeure Event") or any other acts of nature that may inhibit %s\'s ability to attend the Event onsite on the contracted date, Supplier agrees it will work with %s to reschedule its agreed upon services for an available date within the next six (6) calendar months. If the parties are unable (i) to resume performance following such cessation and (ii) to reschedule the event despite using best efforts, either party may terminate this Contract without liability upon written notice to the other party with any amounts paid under this Contract refunded to %s.',
			'fourth' => 'FOURTH. There shall be a joint handover inspection upon completion. All defects shall be recorded in writing, and STANDARTE shall use best endeavors to rectify them. Otherwise, the works shall be deemed to be in full compliance with the Client\'s requirements.',
			'sig_client' => 'Name and signature of the %s representative',
			'sig_std' => 'Name & signature of the Standarte representative.',
			'sig_std_name' => 'FRANCISCO JAVIER GARCÍA MÁRQUEZ. Tax ID (NIF) 34779359R',
			'annex' => 'ANNEX: design approved by mutual agreement',
			'stamp_signed' => 'Electronically signed by',
			'stamp_code' => 'Code',
			'stamp_verify' => 'Verify at:',
			'doc_title' => 'Service agreement · %s',
			'mail_subject' => 'Service agreement for your project %s — Standarte',
			'mail_body' => 'Please find attached the service agreement for your project <strong>%s</strong> (%s), drawn up with the details you provided when approving the proposal. It is electronically sealed by Standarte under code <strong>%s</strong>. To formalise it, please sign it and return it to us by replying to this email. It is also available in the Documents section of your project.',
			'mail_button' => 'Open the project',
			'usd_fmt' => 'US$ %s', 'gbp_fmt' => '£ %s'
		)
	);
	return isset($T[$lang]) ? $T[$lang] : $T['es'];
}

/* ---------- Formato ---------- */
function cpx_contract_date($ts, $lang) {
	$dEs = array('domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado');
	$mEs = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
	if ($lang === 'en') return date('l, F j, Y', $ts);
	return $dEs[(int) date('w', $ts)] . ' ' . date('j', $ts) . ' de ' . $mEs[(int) date('n', $ts) - 1] . ' de ' . date('Y', $ts);
}
function cpx_money($n, $lang, $cur = 'EUR') {
	$s = ($lang === 'en') ? number_format((float) $n, 2, '.', ',') : number_format((float) $n, 2, ',', '.');
	if ($cur === 'EUR') return ($lang === 'en') ? '€' . $s : $s . ' €';
	if ($cur === 'USD') return ($lang === 'en') ? 'US$ ' . $s : $s . ' US$';
	if ($cur === 'GBP') return ($lang === 'en') ? '£ ' . $s : $s . ' £';
	return $s . ' ' . $cur;
}
/* Importe en euros con sus conversiones entre paréntesis, si hay tipos de cambio. */
function cpx_money_all($eur, $rates, $lang) {
	$out = cpx_money($eur, $lang, 'EUR');
	if ($rates && !empty($rates['USD']) && !empty($rates['GBP'])) {
		$out .= ' (' . cpx_money($eur * $rates['USD'], $lang, 'USD') . ' / ' . cpx_money($eur * $rates['GBP'], $lang, 'GBP') . ')';
	}
	return $out;
}

/* ---------- Tipos de cambio (BCE vía frankfurter.app; sin clave) ---------- */
function cpx_fetch_rates() {
	$ch = curl_init('https://api.frankfurter.app/latest?from=EUR&to=USD,GBP');
	curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_FOLLOWLOCATION => true));
	$raw = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ((int) $code !== 200 || !$raw) return null;
	$j = json_decode($raw, true);
	if (!isset($j['rates']['USD']) || !isset($j['rates']['GBP'])) return null;
	return array('USD' => (float) $j['rates']['USD'], 'GBP' => (float) $j['rates']['GBP'], 'date' => isset($j['date']) ? $j['date'] : date('Y-m-d'), 'source' => 'ECB via frankfurter.app');
}

/* ---------- Totales aprobados (misma regla que el aviso de aprobación) ---------- */
function cpx_contract_totals($p, $budget) {
	$subtotal = 0.0;
	foreach ($budget as $b) $subtotal += (float) str_replace(',', '.', (string) (isset($b['amount']) ? $b['amount'] : 0));
	$disc = 0.0;
	if (!empty($p['approved_with_offer']) && (float) $p['discount_amount'] > 0) {
		$dAmount = (float) $p['discount_amount'];
		$dDeadline = !empty($p['discount_deadline']) ? strtotime($p['discount_deadline'] . ' 23:59:59') : null;
		$ts = !empty($p['approved_at']) ? strtotime($p['approved_at']) : time();
		$disc = (!$dDeadline || $ts <= $dDeadline) ? $dAmount : max(0.0, $dAmount - 1000.0 * ceil(($ts - $dDeadline) / 604800.0));
	}
	$ivaRate = isset($p['iva_rate']) ? (float) $p['iva_rate'] : 0.21;
	$irpfRate = isset($p['irpf_rate']) ? (float) $p['irpf_rate'] : 0.15;
	$base = $subtotal - $disc;
	$total = $base + $base * $ivaRate - $base * $irpfRate;
	return array('subtotal' => $subtotal, 'discount' => $disc, 'base' => $base, 'iva' => $base * $ivaRate, 'irpf' => $base * $irpfRate, 'total' => round($total, 2));
}

/* ---------- Imagen del anexo: descarga y, si hace falta, conversión a JPEG ---------- */
function cpx_contract_fetch_image($url) {
	if (!$url) return null;
	$ch = curl_init($url);
	curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 25, CURLOPT_FOLLOWLOCATION => true, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_USERAGENT => 'Standarte-contract/1.0'));
	$data = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ((int) $code >= 300 || !$data || strlen($data) < 200) return null;
	$tmp = tempnam(sys_get_temp_dir(), 'std-annex-');
	file_put_contents($tmp, $data);
	$info = @getimagesize($tmp);
	if (!$info) { @unlink($tmp); return null; }
	$mime = $info['mime'];
	if ($mime === 'image/jpeg' || $mime === 'image/png') return array('file' => $tmp, 'type' => $mime === 'image/png' ? 'PNG' : 'JPG', 'w' => $info[0], 'h' => $info[1]);
	// WebP/AVIF: FPDF no los lee; se pasan por GD a JPEG.
	if (!extension_loaded('gd')) { @unlink($tmp); return null; }
	$im = null;
	if ($mime === 'image/webp' && function_exists('imagecreatefromwebp')) $im = @imagecreatefromwebp($tmp);
	elseif ($mime === 'image/avif' && function_exists('imagecreatefromavif')) $im = @imagecreatefromavif($tmp);
	if (!$im) { @unlink($tmp); return null; }
	$jpg = $tmp . '.jpg';
	imagejpeg($im, $jpg, 88);
	imagedestroy($im);
	@unlink($tmp);
	$info2 = @getimagesize($jpg);
	return $info2 ? array('file' => $jpg, 'type' => 'JPG', 'w' => $info2[0], 'h' => $info2[1]) : null;
}

/* ---------- El PDF ---------- */
class StandarteContractPdf extends FPDF {
	public $lang = 'es';
	// FPDF trabaja en cp1252: cubre español, inglés y el símbolo del euro. Lo que no
	// exista en esa página (un nombre en otro alfabeto) se translitera en vez de romper.
	public function t($s) {
		$out = @iconv('UTF-8', 'windows-1252//TRANSLIT', (string) $s);
		return $out === false ? preg_replace('/[^\x20-\x7E]/', '?', (string) $s) : $out;
	}
	public function Footer() {
		$this->SetY(-14);
		$this->SetFont('Courier', '', 8);
		$this->SetTextColor(120, 120, 120);
		$this->Cell(0, 6, $this->t('STANDARTE · ' . ($this->lang === 'en' ? 'Page ' : 'Página ') . $this->PageNo() . '/{nb}'), 0, 0, 'C');
		$this->SetTextColor(0, 0, 0);
	}
	public function Para($txt, $bold = false, $after = 3) {
		$this->SetFont('Courier', $bold ? 'B' : '', 10);
		$this->MultiCell(0, 5, $this->t($txt), 0, 'J');
		$this->Ln($after);
	}
	public function RoundedRect($x, $y, $w, $h, $r, $style = '') {
		$k = $this->k; $hp = $this->h;
		$op = ($style === 'F') ? 'f' : (($style === 'FD' || $style === 'DF') ? 'B' : 'S');
		$MyArc = 4 / 3 * (sqrt(2) - 1);
		$this->_out(sprintf('%.2F %.2F m', ($x + $r) * $k, ($hp - $y) * $k));
		$xc = $x + $w - $r; $yc = $y + $r;
		$this->_out(sprintf('%.2F %.2F l', $xc * $k, ($hp - $y) * $k));
		$this->_Arc($xc + $r * $MyArc, $yc - $r, $xc + $r, $yc - $r * $MyArc, $xc + $r, $yc);
		$xc = $x + $w - $r; $yc = $y + $h - $r;
		$this->_out(sprintf('%.2F %.2F l', ($x + $w) * $k, ($hp - $yc) * $k));
		$this->_Arc($xc + $r, $yc + $r * $MyArc, $xc + $r * $MyArc, $yc + $r, $xc, $yc + $r);
		$xc = $x + $r; $yc = $y + $h - $r;
		$this->_out(sprintf('%.2F %.2F l', $xc * $k, ($hp - ($y + $h)) * $k));
		$this->_Arc($xc - $r * $MyArc, $yc + $r, $xc - $r, $yc + $r * $MyArc, $xc - $r, $yc);
		$xc = $x + $r; $yc = $y + $r;
		$this->_out(sprintf('%.2F %.2F l', $x * $k, ($hp - $yc) * $k));
		$this->_Arc($xc - $r, $yc - $r * $MyArc, $xc - $r * $MyArc, $yc - $r, $xc, $yc - $r);
		$this->_out($op);
	}
	private function _Arc($x1, $y1, $x2, $y2, $x3, $y3) {
		$h = $this->h; $k = $this->k;
		$this->_out(sprintf('%.2F %.2F %.2F %.2F %.2F %.2F c', $x1 * $k, ($h - $y1) * $k, $x2 * $k, ($h - $y2) * $k, $x3 * $k, ($h - $y3) * $k));
	}
	/* El sello de Standarte con el código: sustituye a la rúbrica a mano. */
	public function Stamp($x, $y, $code, $issued, $T, $logo = null) {
		$w = 92; $h = 34;
		$this->SetDrawColor(27, 27, 26); $this->SetFillColor(255, 255, 255); $this->SetLineWidth(0.5);
		$this->RoundedRect($x, $y, $w, $h, 2.5, 'DF');
		$this->SetLineWidth(0.2);
		/* El logo es un adorno: si el PNG no gustara a FPDF, el sello sale sin él antes
		 * que abortar la emisión del contrato. */
		$conLogo = false;
		if ($logo && is_readable($logo)) {
			try { $this->Image($logo, $x + 3, $y + 3.2, 20); $conLogo = true; } catch (Exception $e) { $conLogo = false; }
		}
		$tx = $x + ($conLogo ? 26 : 4);
		$this->SetXY($tx, $y + 3);   $this->SetFont('Helvetica', 'B', 11); $this->Cell($w - 30, 5, 'STANDARTE', 0, 2);
		$this->SetXY($tx, $y + 8.5); $this->SetFont('Helvetica', '', 7);  $this->Cell($w - 30, 3.6, $this->t($T['stamp_signed']), 0, 2);
		$this->SetXY($tx, $y + 12);  $this->SetFont('Helvetica', 'B', 7.5); $this->Cell($w - 30, 3.8, $this->t('Francisco Javier García Márquez · NIF 34779359R'), 0, 2);
		$this->SetXY($tx, $y + 16);  $this->SetFont('Courier', 'B', 9);  $this->Cell($w - 30, 4.5, $this->t($T['stamp_code'] . ' ' . $code), 0, 2);
		$this->SetXY($tx, $y + 20.5); $this->SetFont('Helvetica', '', 6.5); $this->Cell($w - 30, 3.4, $this->t(date('d/m/Y H:i', $issued) . ' UTC · ' . $T['stamp_verify']), 0, 2);
		// La URL de verificación va sola en su línea: con el texto delante se salía de la caja.
		$this->SetXY($tx, $y + 24.2); $this->SetFont('Helvetica', '', 6.3); $this->Cell($w - 30, 3.4, $this->t('standarte.es/admin/verificar.php?c=' . $code), 0, 2);
		$this->SetFont('Courier', '', 10);
	}
}

/* Compone el PDF y devuelve sus bytes. $d es el array de datos ya resuelto. */
function cpx_contract_pdf($d) {
	$T = cpx_contract_texts($d['lang']);
	$pdf = new StandarteContractPdf('P', 'mm', 'A4');
	$pdf->lang = $d['lang'];
	$pdf->AliasNbPages();
	$pdf->SetMargins(22, 22, 22);
	$pdf->SetAutoPageBreak(true, 22);
	$pdf->SetTitle($pdf->t(sprintf($T['doc_title'], $d['ref'])), false);
	$pdf->SetAuthor('Standarte', false);
	$pdf->AddPage();

	$pdf->SetFont('Courier', 'B', 14);
	$pdf->Cell(0, 8, $pdf->t($T['title']), 0, 1, 'L');
	$pdf->Ln(2);
	$pdf->Para(sprintf($T['place'], cpx_contract_date($d['issued'], $d['lang'])));
	$pdf->Para($T['party1']);
	$idTxt = $d['client_id'] !== '' ? sprintf($T['party2_id'], $d['client_id']) : '';
	$pdf->Para(sprintf($T['party2'], $d['client'], $d['address'], $idTxt));
	$pdf->Para($T['declare'], true, 2);
	$pdf->Para($T['first']);
	$pdf->Para($T['second']);

	$where = $d['fair_city'] !== '' ? sprintf($T['A_where'], $d['fair_city']) : '';
	$pdf->Para(sprintf($T['A'], $d['client'], $d['fair'] . $where));
	$pdf->Para($T['B']);
	$pdf->Para(sprintf($T['C'], cpx_money_all($d['total'], $d['rates'], $d['lang']), ''));
	$acc = ($d['iban'] !== '') ? sprintf($T['D_account'], $d['iban'], $d['bic']) : '';
	$pdf->Para(sprintf($T['D'], $d['client'], cpx_money_all($d['advance'], $d['rates'], $d['lang']), '', $acc, cpx_money($d['rest'], $d['lang'], 'EUR'), $d['fair_city'] !== '' ? $d['fair_city'] : $T['D_where_fallback']));
	$pdf->Para($d['rates'] ? sprintf($T['E'], date($d['lang'] === 'en' ? 'F j, Y' : 'd/m/Y', strtotime($d['rates']['date']))) : $T['E_norates']);
	$pdf->Para($T['F']);
	$pdf->Para($T['G']);
	$pdf->Para($T['H']);
	$pdf->Para(sprintf($T['third'], $d['client'], $d['client'], $d['client']));
	$pdf->Para($T['fourth']);

	/* Página de firmas: el cliente firma a mano; Standarte, con el sello. */
	$pdf->AddPage();
	$pdf->SetFont('Courier', '', 10);
	$pdf->Ln(6);
	$pdf->Cell(0, 6, $pdf->t(sprintf($T['sig_client'], $d['client'])), 0, 1);
	$pdf->Ln(36);
	$pdf->Cell(0, 6, $pdf->t($T['sig_std']), 0, 1);
	$pdf->Cell(0, 6, $pdf->t($T['sig_std_name']), 0, 1);
	$pdf->Ln(4);
	$pdf->Stamp(22, $pdf->GetY(), $d['code'], $d['issued'], $T, $d['logo']);

	/* Anexo: el render aprobado, con el sello encima. */
	if (!empty($d['image'])) {
		$pdf->AddPage();
		$img = $d['image'];
		$maxW = 166; $maxH = 150;
		$ratio = min($maxW / $img['w'], $maxH / $img['h']);
		$w = $img['w'] * $ratio; $h = $img['h'] * $ratio;
		$x = 22 + ($maxW - $w) / 2; $y = 30;
		$pdf->Image($img['file'], $x, $y, $w, $h, $img['type']);
		$pdf->Stamp($x + $w - 92 - 4, $y + $h - 34 - 4, $d['code'], $d['issued'], $T, $d['logo']);
		$pdf->SetXY(22, $y + $h + 6);
		$pdf->SetFont('Courier', '', 10);
		$pdf->Cell(0, 6, $pdf->t($T['annex']), 0, 1);
	}
	return $pdf->Output('S');
}

/* ---------- Orquestación: emitir el contrato de un proyecto ---------- */
function cpx_contract_issue($projectId) {
	$errors = array(); $warnings = array();
	if (!preg_match('/^[0-9a-f-]{36}$/', (string) $projectId)) return array('ok' => false, 'errors' => array('id inválido'));
	$rows = cpx_rows('client_projects?id=eq.' . urlencode($projectId) . '&select=*&limit=1');
	if (empty($rows[0])) return array('ok' => false, 'errors' => array('proyecto no encontrado'));
	$p = $rows[0];

	/* Requisitos: sin ellos el contrato saldría incompleto o no podría enviarse. */
	if (empty($p['approved'])) $errors[] = 'el proyecto no está aprobado por el cliente';
	$email = isset($p['client_email']) ? trim($p['client_email']) : '';
	if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'falta un email de cliente válido';
	$client = trim((string) (!empty($p['billing_company']) ? $p['billing_company'] : $p['client_name']));
	if ($client === '') $errors[] = 'falta la razón social (o el nombre del cliente)';
	$fair = !empty($p['fair_slug']) ? cpx_fair_info($p['fair_slug']) : null;
	if (!$fair) $errors[] = 'el proyecto no tiene evento vinculado (la cláusula A lo nombra)';
	$budget = cpx_rows('client_project_budget_items?project_id=eq.' . urlencode($projectId) . '&select=amount&order=sort_order.asc');
	$tot = cpx_contract_totals($p, $budget);
	if ($tot['total'] <= 0) $errors[] = 'el presupuesto aprobado es 0';
	if ($errors) return array('ok' => false, 'errors' => $errors);

	$lang = (isset($p['approved_lang']) && $p['approved_lang'] === 'en') ? 'en' : 'es';
	$issued = time();
	$rates = cpx_fetch_rates();
	if (!$rates) $warnings[] = 'no se pudo obtener el tipo de cambio: el contrato sale solo en euros';

	/* Código único del sello; el índice único de la BD garantiza que no se repita. */
	$code = 'SC-' . date('Y', $issued) . '-' . strtoupper(substr(hash('sha256', $projectId . '|' . $issued . '|' . bin2hex(random_bytes(6))), 0, 8));

	$addrParts = array_filter(array(
		trim((string) (isset($p['billing_address']) ? $p['billing_address'] : '')),
		trim(trim((string) (isset($p['billing_postal_code']) ? $p['billing_postal_code'] : '')) . ' ' . trim((string) (isset($p['billing_city']) ? $p['billing_city'] : ''))),
		trim((string) (isset($p['billing_country']) ? $p['billing_country'] : ''))
	), function ($x) { return $x !== ''; });
	$address = implode(', ', $addrParts);
	if ($address === '') $warnings[] = 'el cliente no dejó dirección de facturación';

	// Las fechas de la feria, en el idioma del contrato (fairs.json las trae en es y en).
	$fairDates = ($lang === 'en' && !empty($fair['dates_en'])) ? $fair['dates_en'] : (isset($fair['dates']) ? $fair['dates'] : '');
	$fairName = $fair['name'] . ($fairDates !== '' ? ' (' . $fairDates . ')' : '');
	$media = cpx_rows('client_project_media?project_id=eq.' . urlencode($projectId) . '&type=eq.image&select=src&order=sort_order.asc,created_at.asc&limit=1');
	$image = !empty($media[0]['src']) ? cpx_contract_fetch_image($media[0]['src']) : null;
	if (!$image) $warnings[] = 'sin imagen para el anexo (no hay render descargable)';

	// PNG de 8 bits preparado para FPDF (el de la web es de 16 bits y no lo admite).
	$logo = __DIR__ . '/lib/logo-sello.png';
	$d = array(
		'lang' => $lang, 'ref' => $p['ref'], 'issued' => $issued, 'code' => $code,
		'client' => $client, 'client_id' => trim((string) (isset($p['billing_cif']) ? $p['billing_cif'] : '')), 'address' => $address !== '' ? $address : '—',
		'fair' => $fairName, 'fair_city' => isset($fair['city']) ? $fair['city'] : '',
		'total' => $tot['total'], 'advance' => round($tot['total'] * 0.8, 2), 'rest' => round($tot['total'] - round($tot['total'] * 0.8, 2), 2),
		'rates' => $rates, 'iban' => trim((string) (isset($p['income_account']) ? $p['income_account'] : '')), 'bic' => trim((string) (isset($p['bic_code']) ? $p['bic_code'] : '')),
		'image' => $image, 'logo' => is_readable($logo) ? $logo : null
	);
	$pdfBytes = cpx_contract_pdf($d);
	if ($image) @unlink($image['file']);

	/* Guardar en la Documentación privada del proyecto. */
	$tmpPdf = tempnam(sys_get_temp_dir(), 'std-contract-');
	file_put_contents($tmpPdf, $pdfBytes);
	$path = $projectId . '/docs/contrato-' . strtolower($code) . '.pdf';
	$up = cpx_storage_upload($path, $tmpPdf, 'application/pdf', 'client-docs');
	@unlink($tmpPdf);
	if ((int) $up >= 300) return array('ok' => false, 'errors' => array('Storage rechazó el PDF (código ' . $up . ')'));
	$T = cpx_contract_texts($lang);
	$title = sprintf($T['doc_title'], $p['ref']);
	$ins = cpx_sb('POST', 'client_project_docs', array('project_id' => $projectId, 'kind' => 'contrato', 'title' => $title, 'path' => $path, 'size_bytes' => strlen($pdfBytes)));
	if ((int) $ins['code'] >= 300) { cpx_storage_delete_object($path, 'client-docs'); return array('ok' => false, 'errors' => array('no se pudo registrar el documento (' . $ins['code'] . ')')); }

	/* Anotar el sello en el proyecto: es lo que verifica verificar.php. */
	cpx_sb('PATCH', 'client_projects?id=eq.' . urlencode($projectId), array(
		'contract_code' => $code, 'contract_issued_at' => gmdate('c', $issued),
		'contract_meta' => array('lang' => $lang, 'total_eur' => $tot['total'], 'advance_eur' => $d['advance'], 'rates' => $rates, 'client' => $client, 'fair' => $fairName, 'path' => $path)
	));

	/* Enviar al cliente: adjunto + enlace a su proyecto. */
	$url = 'https://standarte.es/proyecto?t=' . $p['access_token'];
	$h = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
	$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. "<p style='margin:0 0 16px;'>" . sprintf($T['mail_body'], $h($p['title_' . $lang] !== '' ? $p['title_' . $lang] : $p['ref']), $h($p['ref']), $h($code)) . "</p>"
		. "<p style='text-align:center;margin:20px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>" . $h($T['mail_button']) . "</a></p>"
		. "<p style='margin:28px 0 0;'>" . ($lang === 'en' ? 'Best regards,<br><strong>The Standarte team</strong>' : 'Un cordial saludo,<br><strong>Equipo de Standarte</strong>') . "</p>"
		. "</body></html>";
	/* Al cliente y, en copia, a Javier (javier@standarte.es): así el emisor conserva lo
	 * que ha mandado sin tener que entrar al proyecto. */
	$sent = false;
	try {
		require_once __DIR__ . '/email_campaing/mailer.php';
		$cfg = require __DIR__ . '/email_campaing/config.php';
		$subject = sprintf($T['mail_subject'], $p['ref']);
		$att = array(array('name' => 'contrato-' . preg_replace('/[^A-Za-z0-9_-]+/', '_', $p['ref']) . '.pdf', 'type' => 'application/pdf', 'data' => $pdfBytes));
		$sent = campaign_send_smtp($cfg, $email, $subject, $html, $att);
		if (strcasecmp('javier@standarte.es', $email) !== 0) {
			try { campaign_send_smtp($cfg, 'javier@standarte.es', '[Copia] ' . $subject, $html, $att); } catch (Exception $e) {}
		}
	} catch (Exception $e) { $sent = false; }
	if (!$sent) $warnings[] = 'el contrato se ha generado y guardado, pero el correo al cliente NO ha salido (revisa SMTP)';

	return array('ok' => true, 'code' => $code, 'lang' => $lang, 'email' => $email, 'sent' => $sent, 'total' => $tot['total'], 'warnings' => $warnings);
}
