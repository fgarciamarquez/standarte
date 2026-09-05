<?php
/*
 * Emisión automática de FACTURAS de un proyecto de cliente (Standarte).
 *
 * Factura 1 = 80 % del total aprobado (anticipo); Factura 2 = 20 % restante (final).
 * Se dispara desde el panel al pulsar el botón en «Pendiente»: el gestor introduce el
 * número (se le sugiere el siguiente de la serie), y el resto sale del proyecto: datos
 * de facturación que dejó el cliente al aprobar, cuenta de ingreso elegida, presupuesto
 * aprobado con su oferta congelada e impuestos, evento vinculado para el concepto.
 *
 * Decisiones (2026-09-05):
 *  - Fecha de emisión y de vencimiento: las dos, el día de la emisión.
 *  - Numeración manual con sugerencia del siguiente; la tabla client_project_invoices
 *    tiene UNIQUE sobre el número, que es la guarda real contra repetirlo.
 *  - Factura 2 solo cuando la Factura 1 está «Cursado» (cobrada).
 *  - Impuestos: los del proyecto. Cuando el IVA o el IRPF están a cero (clientes
 *    extranjeros) la factura lo dice y explica el motivo: una factura sin impuestos y
 *    sin explicación es una factura que Hacienda pregunta.
 *  - Conversiones a USD y GBP indicativas al cambio del BCE; el importe es el de euros.
 *  - El etiquetado del emisor dice «CIF» por decisión del titular.
 *  - Copia de cada envío a javier@standarte.es.
 *
 * Requiere supabase-config.php y client_projects_lib.php ya incluidos.
 */
require_once __DIR__ . '/lib/fpdf.php';
if (!function_exists('cpx_fetch_rates')) require_once __DIR__ . '/contract_lib.php';   // tipos de cambio, dinero, totales

define('CPX_INVOICE_CC', 'javier@standarte.es');

function cpx_invoice_texts($lang) {
	$T = array(
		'es' => array(
			'title' => 'FACTURA', 'issuer_id' => 'CIF: 34779359R',
			'date' => 'Fecha de emisión: %s.', 'due' => 'Fecha de vencimiento: %s.', 'number' => 'Número de factura: %s',
			'bank' => 'BANCO: %s', 'iban' => 'TRANSFERENCIA A (IBAN): %s.', 'bic' => 'BIC: %s',
			'matter' => 'CONCEPTO DE LA TRANSFERENCIA: "%s"', 'beneficiary' => 'BENEFICIARIO: "JAVIER GARCIA MARQUEZ (titular de Standarte)"',
			'th_concept' => 'Concepto', 'th_qty' => 'Cant.', 'th_unit' => 'Precio', 'th_amount' => 'Importe', 'included' => 'Incluido',
			'subtotal' => 'Total del proyecto aprobado', 'discount' => 'Descuento por pronto pago (aprobación en plazo)',
			'adv1' => 'Base imponible · anticipo del 80 % (esta factura)', 'adv2' => 'Anticipo ya facturado (factura %s)', 'rest2' => 'Base imponible · 20 % restante (esta factura)',
			'base' => 'Base imponible', 'iva' => 'IVA (%s %%)', 'irpf' => 'IRPF (−%s %%)', 'total' => 'TOTAL', 'total_usd' => 'TOTAL (USD)', 'total_gbp' => 'TOTAL (GBP)',
			'rates_note' => 'Conversiones orientativas al tipo de cambio del BCE del %s. El importe facturado es el expresado en euros.',
			'no_iva' => 'Operación no sujeta al IVA español: servicio prestado a un empresario o profesional no establecido en el territorio de aplicación del impuesto (art. 69.Uno.1º de la Ley 37/1992 del IVA). El destinatario, en su caso, autoliquida el impuesto en su país.',
			'no_irpf' => 'Sin retención de IRPF: el destinatario no es un obligado a retener en España (art. 76 del Reglamento del IRPF, RD 439/2007).',
			'thanks' => 'Gracias por su confianza. Atentamente, Javier García.',
			'doc_title1' => 'Factura %s (anticipo 80 %%)', 'doc_title2' => 'Factura %s (final 20 %%)',
			'mail_subject' => 'Factura %s de su proyecto %s — Standarte',
			'mail_body1' => 'Le adjuntamos la factura <strong>%s</strong> correspondiente al anticipo del 80 %% de su proyecto <strong>%s</strong> (%s), por importe de <strong>%s</strong>. Los datos para la transferencia figuran en la propia factura, que también tiene disponible en la Documentación de su proyecto.',
			'mail_body2' => 'Le adjuntamos la factura <strong>%s</strong> correspondiente al 20 %% restante de su proyecto <strong>%s</strong> (%s), por importe de <strong>%s</strong>. Los datos para la transferencia figuran en la propia factura, que también tiene disponible en la Documentación de su proyecto.',
			'mail_button' => 'Abrir el proyecto', 'sign' => 'Un cordial saludo,<br><strong>Equipo de Standarte</strong>'
		),
		'en' => array(
			'title' => 'INVOICE', 'issuer_id' => 'CIF: 34779359R',
			'date' => 'Invoice date: %s.', 'due' => 'Invoice due date: %s.', 'number' => 'Invoice number: %s',
			'bank' => 'BANK NAME: %s', 'iban' => 'TRANSFER TO (IBAN): %s.', 'bic' => 'BIC: %s',
			'matter' => 'MATTER UNDER TRANSFER: "%s"', 'beneficiary' => 'TRANSFER BENEFICIARY: "JAVIER GARCIA MARQUEZ (Standarte\'s Owner)"',
			'th_concept' => 'Description', 'th_qty' => 'Qty', 'th_unit' => 'Unit price', 'th_amount' => 'Amount', 'included' => 'Included',
			'subtotal' => 'Approved project total', 'discount' => 'Early-payment discount (approved within the deadline)',
			'adv1' => 'Taxable base · 80% advance (this invoice)', 'adv2' => 'Advance already invoiced (invoice %s)', 'rest2' => 'Taxable base · remaining 20% (this invoice)',
			'base' => 'Taxable base', 'iva' => 'VAT (%s%%)', 'irpf' => 'IRPF withholding (−%s%%)', 'total' => 'TOTAL', 'total_usd' => 'TOTAL (USD)', 'total_gbp' => 'TOTAL (GBP)',
			'rates_note' => 'Indicative conversions at the ECB exchange rate of %s. The invoiced amount is the amount expressed in euros.',
			'no_iva' => 'Not subject to Spanish VAT: service supplied to a business customer not established in the Spanish VAT territory (Article 69.One.1 of Spanish VAT Law 37/1992). Where applicable, the recipient accounts for the tax in its own country (reverse charge).',
			'no_irpf' => 'No Spanish income-tax withholding (IRPF): the recipient is not a withholding agent in Spain (Article 76 of the IRPF Regulation, RD 439/2007).',
			'thanks' => 'Thank you for your trust. Sincerely, Javier García.',
			'doc_title1' => 'Invoice %s (80%% advance)', 'doc_title2' => 'Invoice %s (final 20%%)',
			'mail_subject' => 'Invoice %s for your project %s — Standarte',
			'mail_body1' => 'Please find attached invoice <strong>%s</strong> for the 80%% advance on your project <strong>%s</strong> (%s), amounting to <strong>%s</strong>. The transfer details are on the invoice itself, which is also available in the Documents section of your project.',
			'mail_body2' => 'Please find attached invoice <strong>%s</strong> for the remaining 20%% of your project <strong>%s</strong> (%s), amounting to <strong>%s</strong>. The transfer details are on the invoice itself, which is also available in the Documents section of your project.',
			'mail_button' => 'Open the project', 'sign' => 'Best regards,<br><strong>The Standarte team</strong>'
		)
	);
	return isset($T[$lang]) ? $T[$lang] : $T['es'];
}

/* Fecha larga de factura: «viernes, 5 - septiembre - 2026» / «Friday, 5 - September - 2026». */
function cpx_invoice_date($ts, $lang) {
	if ($lang === 'en') return date('l, j - F - Y', $ts);
	$dEs = array('domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado');
	$mEs = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
	return $dEs[(int) date('w', $ts)] . ', ' . date('j', $ts) . ' - ' . $mEs[(int) date('n', $ts) - 1] . ' - ' . date('Y', $ts);
}

/* Siguiente número de la serie: el último emitido con su parte numérica final +1 y el
 * mismo ancho (S250039 → S250040). Vacío si aún no hay ninguno: no se inventa una serie. */
function cpx_next_invoice_number() {
	$rows = cpx_rows('client_project_invoices?select=number&order=issued_at.desc&limit=1');
	if (empty($rows[0]['number'])) return '';
	$last = trim($rows[0]['number']);
	if (!preg_match('/^(.*?)(\d+)$/', $last, $m)) return '';
	return $m[1] . str_pad((string) ((int) $m[2] + 1), strlen($m[2]), '0', STR_PAD_LEFT);
}

/* ¿Ese número ya se usó? (la UNIQUE de la tabla lo impediría igualmente; esto es para
 * dar un mensaje claro antes de generar nada). */
function cpx_invoice_number_taken($number) {
	$rows = cpx_rows('client_project_invoices?select=id,project_id&number=eq.' . urlencode($number) . '&limit=1');
	return !empty($rows);
}

/* Importes de la factura $which. El 20 % se calcula como resto exacto del total menos
 * lo facturado en la Factura 1, para que la suma de las dos cuadre al céntimo. */
function cpx_invoice_amounts($p, $budget, $which, $prev1) {
	$tot = cpx_contract_totals($p, $budget);                    // subtotal, descuento congelado, base, tipos
	$ivaRate = isset($p['iva_rate']) ? (float) $p['iva_rate'] : 0.21;
	$irpfRate = isset($p['irpf_rate']) ? (float) $p['irpf_rate'] : 0.15;
	if ($which === 1) {
		$base = round($tot['base'] * 0.8, 2);
	} else {
		$base1 = ($prev1 && isset($prev1['meta']['base'])) ? (float) $prev1['meta']['base'] : round($tot['base'] * 0.8, 2);
		$base = round($tot['base'] - $base1, 2);
	}
	$iva = round($base * $ivaRate, 2);
	$irpf = round($base * $irpfRate, 2);
	return array('base' => $base, 'iva' => $iva, 'irpf' => $irpf, 'iva_rate' => $ivaRate, 'irpf_rate' => $irpfRate, 'total' => round($base + $iva - $irpf, 2), 'project_total' => $tot['total'],
		'subtotal' => round($tot['subtotal'], 2), 'discount' => round($tot['discount'], 2),
		'base1' => ($which === 2) ? $base1 : null, 'prev_number' => ($which === 2 && $prev1 && isset($prev1['number'])) ? $prev1['number'] : null);
}

class StandarteInvoicePdf extends FPDF {
	/* Escribe una línea que CABE en $w mm: baja el cuerpo hasta 7 pt y, si aun así no
	 * entra, recorta con puntos suspensivos. Antes el concepto de la transferencia y el de
	 * la línea se salían de su columna con nombres de cliente o feria largos. */
	public function Fit($x, $y, $w, $txt, $style = '', $size = 9, $rgb = array(30, 30, 30), $align = 'L') {
		/* Se recorta sobre el texto UTF-8 y se convierte a cp1252 solo para medir y pintar:
		 * recortar con mb_* la cadena ya convertida rompía los bytes de «·» y «…». */
		$src = (string) $txt;
		$this->SetFont('Helvetica', $style, $size);
		while ($size > 7 && $this->GetStringWidth($this->t($src)) > $w) { $size -= 0.5; $this->SetFont('Helvetica', $style, $size); }
		$out = $this->t($src);
		if ($this->GetStringWidth($out) > $w) {
			while (mb_strlen($src, 'UTF-8') > 4 && $this->GetStringWidth($this->t($src . '…')) > $w) $src = mb_substr($src, 0, -1, 'UTF-8');
			$out = $this->t(rtrim($src) . '…');
		}
		$this->SetXY($x, $y); $this->SetTextColor($rgb[0], $rgb[1], $rgb[2]);
		$this->Cell($w, 4.6, $out, 0, 0, $align);
		$this->SetTextColor(0, 0, 0);
	}
	public function t($s) {
		$out = @iconv('UTF-8', 'windows-1252//TRANSLIT', (string) $s);
		return $out === false ? preg_replace('/[^\x20-\x7E]/', '?', (string) $s) : $out;
	}
	public function Line1($x, $y, $txt, $style = '', $size = 9, $rgb = array(30, 30, 30)) {
		$this->SetXY($x, $y); $this->SetFont('Helvetica', $style, $size); $this->SetTextColor($rgb[0], $rgb[1], $rgb[2]);
		$this->Cell(0, 4.6, $this->t($txt), 0, 0);
		$this->SetTextColor(0, 0, 0);
	}
}

function cpx_pct_label($rate, $lang) {
	$n = round($rate * 100, 2);
	return ($lang === 'en') ? rtrim(rtrim(number_format($n, 2, '.', ''), '0'), '.') : rtrim(rtrim(number_format($n, 2, ',', ''), '0'), ',');
}

/* Compone la factura y devuelve los bytes del PDF. */
function cpx_invoice_pdf($d) {
	$T = cpx_invoice_texts($d['lang']);
	$L = $d['lang'];
	$pdf = new StandarteInvoicePdf('P', 'mm', 'A4');
	$pdf->SetMargins(18, 18, 18);
	$pdf->SetAutoPageBreak(false);
	$pdf->SetTitle($pdf->t(sprintf($d['which'] === 1 ? $T['doc_title1'] : $T['doc_title2'], $d['number'])), false);
	$pdf->SetAuthor('Standarte', false);
	$pdf->AddPage();

	/* Reglas superior e inferior, como en el original. */
	$pdf->SetDrawColor(27, 27, 26); $pdf->SetLineWidth(0.9);
	$pdf->Line(18, 20, 192, 20);
	$pdf->Line(18, 275, 192, 275);
	$pdf->SetLineWidth(0.2);

	/* Columna izquierda: emisor. */
	$x1 = 18; $y = 44;
	$pdf->Line1($x1, $y, $T['title'], '', 10, array(110, 110, 110));
	$pdf->Line1($x1, $y + 7, 'Fco. Javier García Márquez');
	$pdf->Line1($x1, $y + 11.5, $T['issuer_id']);
	$pdf->Line1($x1, $y + 16, strtoupper(cpx_invoice_short_date($d['issued'], $L)));
	$pdf->Line1($x1, $y + 24, 'C/ Los Sauces 24');
	$pdf->Line1($x1, $y + 28.5, '10004 Cáceres (SPAIN)');

	/* Columna central: cliente, fechas, número, banco, concepto. */
	$x2 = 62; $y = 44;
	$pdf->Line1($x2, $y, $d['client'], 'B', 10);
	$yy = $y + 5;
	foreach ($d['client_lines'] as $ln) { $pdf->Line1($x2, $yy, $ln); $yy += 4.6; }
	$yy += 4;
	$pdf->Line1($x2, $yy, sprintf($T['date'], cpx_invoice_date($d['issued'], $L))); $yy += 4.6;
	$pdf->Line1($x2, $yy, sprintf($T['due'], cpx_invoice_date($d['issued'], $L)), '', 9, array(180, 30, 30)); $yy += 4.6;
	$pdf->Line1($x2, $yy, sprintf($T['number'], $d['number'])); $yy += 8.6;
	$pdf->Line1($x2, $yy, sprintf($T['bank'], $d['bank'])); $yy += 4.6;
	$pdf->Line1($x2, $yy, sprintf($T['iban'], $d['iban'])); $yy += 4.6;
	$pdf->Line1($x2, $yy, sprintf($T['bic'], $d['bic'])); $yy += 8.6;
	$pdf->Fit($x2, $yy, 130, sprintf($T['matter'], $d['matter'])); $yy += 4.6;
	$pdf->Fit($x2, $yy, 130, $T['beneficiary']); $yy += 4.6;

	/* Logo a la derecha. */
	if (!empty($d['logo'])) { try { $pdf->Image($d['logo'], 150, 40, 42); } catch (Exception $e) {} }

	/* Tabla contable: un renglón por concepto aprobado (incluidos los de 0 €, que salen
	 * como «Incluido»), el total del proyecto, el descuento si lo hubo, y de ahí la base
	 * de ESTA factura (80 % o el resto). Si hay muchos conceptos, los renglones se
	 * estrechan para que todo quepa antes de la regla inferior (y = 275). */
	$items = isset($d['items']) ? $d['items'] : array();
	$extraRows = 5 + count($items) + ($d['amounts']['iva_rate'] > 0 ? 1 : 0) + ($d['amounts']['irpf_rate'] > 0 ? 1 : 0) + ($d['rates'] ? 2 : 0) + ($d['amounts']['discount'] > 0 ? 1 : 0) + ($d['which'] === 2 ? 1 : 0);
	$ty = max($yy + 10, 118);
	$rowH = min(6.4, max(4.6, (250 - $ty) / max(1, $extraRows)));
	$fs = $rowH < 5.6 ? 8 : 9;
	$cx = array(62, 122, 134, 162, 192);          // bordes de columna: concepto (ancho) | cant. | precio | importe
	$pdf->SetDrawColor(140, 140, 140);
	$row = function ($label, $qty, $unit, $amount, $bold = false, $top = true, $grey = false) use ($pdf, &$ty, $cx, $rowH, $fs, $L) {
		$pdf->SetFont('Helvetica', $bold ? 'B' : '', $fs);
		if ($grey) $pdf->SetTextColor(110, 110, 110);
		if ($top) $pdf->Line($cx[0], $ty, $cx[4], $ty);
		$pdf->Fit($cx[0] + 1, $ty + 1, $cx[1] - $cx[0] - 2, $label, $bold ? 'B' : '', $fs);
		$pdf->SetFont('Helvetica', $bold ? 'B' : '', $fs);
		$pdf->SetXY($cx[1], $ty + 1);     $pdf->Cell($cx[2] - $cx[1] - 1, $rowH - 2, $pdf->t($qty), 0, 0, 'R');
		$pdf->SetXY($cx[2] + 1, $ty + 1); $pdf->Cell($cx[3] - $cx[2] - 2, $rowH - 2, $pdf->t($unit), 0, 0, 'R');
		$pdf->SetXY($cx[3] + 1, $ty + 1); $pdf->Cell($cx[4] - $cx[3] - 2, $rowH - 2, $pdf->t($amount), 0, 0, 'R');
		if ($grey) $pdf->SetTextColor(0, 0, 0);
		$ty += $rowH;
		$pdf->Line($cx[0], $ty, $cx[4], $ty);
	};
	$eur = function ($n) use ($L) { return cpx_money($n, $L, 'EUR'); };
	/* Cabecera de columnas, en gris. */
	$row($T['th_concept'], $T['th_qty'], $T['th_unit'], $T['th_amount'], false, true, true);
	if ($items) {
		foreach ($items as $it) {
			$row($it['label'], '1', $it['amount'] > 0 ? $eur($it['amount']) : $T['included'], $it['amount'] > 0 ? $eur($it['amount']) : $T['included'], false, false);
		}
	} else {
		$row($d['title'], '1', $eur($d['amounts']['subtotal']), $eur($d['amounts']['subtotal']), false, false);
	}
	$pdf->SetLineWidth(0.5);
	$row($T['subtotal'], '', '', $eur($d['amounts']['subtotal']), true, true);
	$pdf->SetLineWidth(0.2);
	if ($d['amounts']['discount'] > 0) $row($T['discount'], '', '', '− ' . $eur($d['amounts']['discount']), false, false);
	if ($d['which'] === 2 && $d['amounts']['base1'] !== null) $row(sprintf($T['adv2'], $d['amounts']['prev_number'] !== null ? $d['amounts']['prev_number'] : '—'), '', '', '− ' . $eur($d['amounts']['base1']), false, false);
	$row($d['which'] === 1 ? $T['adv1'] : $T['rest2'], '', '', $eur($d['amounts']['base']), false, false);
	if ($d['amounts']['iva_rate'] > 0) $row(sprintf($T['iva'], cpx_pct_label($d['amounts']['iva_rate'], $L)), '', '', '+ ' . $eur($d['amounts']['iva']), false, false);
	if ($d['amounts']['irpf_rate'] > 0) $row(sprintf($T['irpf'], cpx_pct_label($d['amounts']['irpf_rate'], $L)), '', '', '− ' . $eur($d['amounts']['irpf']), false, false);
	$pdf->SetLineWidth(0.5);
	$row($T['total'], '', '', $eur($d['amounts']['total']), true, true);
	$pdf->SetLineWidth(0.2);
	if ($d['rates']) {
		$row($T['total_usd'], '', '', cpx_money($d['amounts']['total'] * $d['rates']['USD'], $L, 'USD'), true, false);
		$row($T['total_gbp'], '', '', cpx_money($d['amounts']['total'] * $d['rates']['GBP'], $L, 'GBP'), true, false);
	}

	/* Notas: cambio y, si no hay impuestos, el motivo. */
	$ny = $ty + 8;
	$pdf->SetFont('Helvetica', '', 7.5); $pdf->SetTextColor(90, 90, 90);
	if ($d['rates']) { $pdf->SetXY($cx[0], $ny); $pdf->MultiCell($cx[4] - $cx[0], 3.6, $pdf->t(sprintf($T['rates_note'], date($L === 'en' ? 'F j, Y' : 'd/m/Y', strtotime($d['rates']['date'])))), 0, 'L'); $ny = $pdf->GetY() + 1.5; }
	if ($d['amounts']['iva_rate'] <= 0) { $pdf->SetXY($cx[0], $ny); $pdf->MultiCell($cx[4] - $cx[0], 3.6, $pdf->t($T['no_iva']), 0, 'L'); $ny = $pdf->GetY() + 1.5; }
	if ($d['amounts']['irpf_rate'] <= 0) { $pdf->SetXY($cx[0], $ny); $pdf->MultiCell($cx[4] - $cx[0], 3.6, $pdf->t($T['no_irpf']), 0, 'L'); $ny = $pdf->GetY() + 1.5; }
	$pdf->SetTextColor(0, 0, 0);
	$pdf->Line1($cx[0], $ny + 6, $T['thanks'], '', 9);
	return $pdf->Output('S');
}

function cpx_invoice_short_date($ts, $lang) {
	if ($lang === 'en') return date('j - F - Y', $ts);
	$mEs = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
	return date('j', $ts) . ' - ' . $mEs[(int) date('n', $ts) - 1] . ' - ' . date('Y', $ts);
}

/* Correo con adjunto al destinatario y copia a Javier. Devuelve si salió el del cliente. */
function cpx_send_with_copy($to, $subject, $html, $attachment) {
	$sent = false;
	try {
		require_once __DIR__ . '/email_campaing/mailer.php';
		$cfg = require __DIR__ . '/email_campaing/config.php';
		$sent = campaign_send_smtp($cfg, $to, $subject, $html, array($attachment));
		if (defined('CPX_INVOICE_CC') && CPX_INVOICE_CC && strcasecmp(CPX_INVOICE_CC, $to) !== 0) {
			try { campaign_send_smtp($cfg, CPX_INVOICE_CC, '[Copia] ' . $subject, $html, array($attachment)); } catch (Exception $e) {}
		}
	} catch (Exception $e) { $sent = false; }
	return (bool) $sent;
}

/* ---------- Orquestación ---------- */
function cpx_invoice_issue($projectId, $which, $number, $opts = array()) {
	$which = ((int) $which === 2) ? 2 : 1;
	$dry = !empty($opts['dry_run']);
	/* En modo prueba el número es ficticio y no se comprueba contra la serie. */
	$number = $dry ? 'PRUEBA-' . date('ymd') : trim((string) $number);
	$errors = array(); $warnings = array();
	if (!preg_match('/^[0-9a-f-]{36}$/', (string) $projectId)) return array('ok' => false, 'errors' => array('id inválido'));
	if ($number === '' || mb_strlen($number) > 30 || !preg_match('/^[A-Za-z0-9][A-Za-z0-9\/\-_.]*$/', $number)) $errors[] = 'el número de factura está vacío o tiene caracteres raros';
	$rows = cpx_rows('client_projects?id=eq.' . urlencode($projectId) . '&select=*&limit=1');
	if (empty($rows[0])) return array('ok' => false, 'errors' => array('proyecto no encontrado'));
	$p = $rows[0];

	if (empty($p['approved'])) $errors[] = 'el proyecto no está aprobado por el cliente';
	$email = isset($p['client_email']) ? trim($p['client_email']) : '';
	if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'falta un email de cliente válido';
	$client = trim((string) (!empty($p['billing_company']) ? $p['billing_company'] : $p['client_name']));
	if ($client === '') $errors[] = 'falta la razón social (o el nombre del cliente)';
	$iban = trim((string) (isset($p['income_account']) ? $p['income_account'] : ''));
	if ($iban === '') $errors[] = 'el proyecto no tiene cuenta de ingreso';
	$budget = cpx_rows('client_project_budget_items?project_id=eq.' . urlencode($projectId) . '&select=amount,concept_es,concept_en&order=sort_order.asc,id.asc');
	$inv = cpx_rows('client_project_invoices?project_id=eq.' . urlencode($projectId) . '&select=which,number,meta,amount_eur&order=issued_at.asc');
	$prev1 = null; foreach ($inv as $r) { if ((int) $r['which'] === 1) $prev1 = $r; }
	if ($which === 2 && (!isset($p['invoice_state']) || $p['invoice_state'] !== 'cursado')) $errors[] = 'la Factura 2 solo se emite cuando la Factura 1 está cursada (cobrada)';
	if (!$dry && $number !== '' && cpx_invoice_number_taken($number)) $errors[] = 'el número ' . $number . ' ya está usado en otra factura';
	if ($errors) return array('ok' => false, 'errors' => $errors);

	$am = cpx_invoice_amounts($p, $budget, $which, $prev1);
	if ($am['total'] <= 0) return array('ok' => false, 'errors' => array('el importe de la factura sale a 0'));

	$lang = (isset($p['approved_lang']) && $p['approved_lang'] === 'en') ? 'en' : 'es';
	$issued = time();
	$rates = cpx_fetch_rates();
	if (!$rates) $warnings[] = 'no se pudo obtener el tipo de cambio: la factura sale solo en euros';

	$acc = null; foreach (cpx_accounts() as $a) { if (str_replace(' ', '', $a['iban']) === str_replace(' ', '', $iban)) $acc = $a; }
	$bank = $acc ? $acc['bank'] : '—';
	$bic = trim((string) (isset($p['bic_code']) ? $p['bic_code'] : ($acc ? $acc['bic'] : '')));

	$fair = !empty($p['fair_slug']) ? cpx_fair_info($p['fair_slug']) : null;
	$matter = strtoupper('STAND - ' . $client . ($fair ? ' - ' . $fair['name'] : ''));
	$matter = preg_replace('/\s+/', ' ', $matter);

	$clientLines = array_values(array_filter(array(
		trim((string) (isset($p['billing_address']) ? $p['billing_address'] : '')),
		trim(trim((string) (isset($p['billing_postal_code']) ? $p['billing_postal_code'] : '')) . ' ' . strtoupper(trim((string) (isset($p['billing_city']) ? $p['billing_city'] : ''))) . (!empty($p['billing_country']) ? ' (' . strtoupper($p['billing_country']) . ')' : '')),
		!empty($p['billing_cif']) ? (($lang === 'en' ? 'Tax ID: ' : 'CIF/NIF: ') . $p['billing_cif']) : ''
	), function ($x) { return $x !== ''; }));
	if (count($clientLines) < 2) $warnings[] = 'el cliente no dejó dirección de facturación completa';

	$title = trim((string) (!empty($p['title_' . $lang]) ? $p['title_' . $lang] : $p['ref']));
	$logo = __DIR__ . '/lib/logo-sello.png';
	/* TODOS los conceptos del presupuesto aprobado, también los de 0 €: verlos en la
	 * factura es lo que le confirma al cliente que esos servicios están incluidos. */
	$items = array();
	foreach ($budget as $b) {
		$label = trim((string) (!empty($b['concept_' . $lang]) ? $b['concept_' . $lang] : (!empty($b['concept_es']) ? $b['concept_es'] : (isset($b['concept_en']) ? $b['concept_en'] : ''))));
		if ($label === '') continue;
		$items[] = array('label' => $label, 'amount' => (float) str_replace(',', '.', (string) (isset($b['amount']) ? $b['amount'] : 0)));
	}
	$d = array('lang' => $lang, 'which' => $which, 'number' => $number, 'issued' => $issued, 'client' => $client, 'client_lines' => $clientLines,
		'bank' => $bank, 'iban' => $iban, 'bic' => $bic, 'matter' => $matter, 'title' => $title, 'items' => $items, 'amounts' => $am, 'rates' => $rates, 'logo' => is_readable($logo) ? $logo : null);
	$pdfBytes = cpx_invoice_pdf($d);

	$T = cpx_invoice_texts($lang);
	$safe = preg_replace('/[^A-Za-z0-9_-]+/', '_', $number);

	/* Correo al cliente (se compone ya para poder mandarlo tal cual a Javier en modo prueba). */
	$url = 'https://standarte.es/proyecto?t=' . $p['access_token'];
	$h = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
	$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. "<p style='margin:0 0 16px;'>" . sprintf($which === 1 ? $T['mail_body1'] : $T['mail_body2'], $h($number), $h($title), $h($p['ref']), $h(cpx_money($am['total'], $lang, 'EUR'))) . "</p>"
		. "<p style='text-align:center;margin:20px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>" . $h($T['mail_button']) . "</a></p>"
		. "<p style='margin:28px 0 0;'>" . $T['sign'] . "</p></body></html>";
	$subject = sprintf($T['mail_subject'], $number, $p['ref']);
	$attachment = array('name' => 'factura-' . $safe . '.pdf', 'type' => 'application/pdf', 'data' => $pdfBytes);

	/* Modo prueba: mismo PDF, pero sin guardar en Documentación ni en el registro de
	 * facturas, y el correo va SOLO a Javier con el asunto marcado. */
	if ($dry) {
		$warnings[] = 'el número ' . $number . ' es ficticio: la factura real llevará el que introduzcas al emitirla';
		$attachment['name'] = 'PRUEBA-' . $attachment['name'];
		$sent = cpx_test_mail($subject, $p, $email, $html, $attachment, $warnings);
		return array('ok' => true, 'dry_run' => true, 'number' => $number, 'which' => $which, 'lang' => $lang, 'email' => CPX_ADMIN_MAIL, 'sent' => $sent, 'total' => $am['total'], 'warnings' => $warnings);
	}

	$path = $projectId . '/docs/factura-' . $which . '-' . strtolower($safe) . '.pdf';
	$tmp = tempnam(sys_get_temp_dir(), 'std-inv-'); file_put_contents($tmp, $pdfBytes);
	$up = cpx_storage_upload($path, $tmp, 'application/pdf', 'client-docs'); @unlink($tmp);
	if ((int) $up >= 300) return array('ok' => false, 'errors' => array('Storage rechazó el PDF (código ' . $up . ')'));
	$docTitle = sprintf($which === 1 ? $T['doc_title1'] : $T['doc_title2'], $number);
	$ins = cpx_sb('POST', 'client_project_docs', array('project_id' => $projectId, 'kind' => $which === 1 ? 'factura_anticipo' : 'factura_final', 'title' => $docTitle, 'path' => $path, 'size_bytes' => strlen($pdfBytes)));
	if ((int) $ins['code'] >= 300) { cpx_storage_delete_object($path, 'client-docs'); return array('ok' => false, 'errors' => array('no se pudo registrar el documento (' . $ins['code'] . ')')); }
	$docId = (is_array($ins['body']) && isset($ins['body'][0]['id'])) ? $ins['body'][0]['id'] : null;

	/* Registro de la factura: la UNIQUE del número es la última barrera. */
	$reg = cpx_sb('POST', 'client_project_invoices', array('project_id' => $projectId, 'which' => $which, 'number' => $number, 'issued_at' => gmdate('c', $issued),
		'amount_eur' => $am['total'], 'lang' => $lang, 'doc_id' => $docId,
		'meta' => array('base' => $am['base'], 'iva' => $am['iva'], 'irpf' => $am['irpf'], 'iva_rate' => $am['iva_rate'], 'irpf_rate' => $am['irpf_rate'], 'rates' => $rates, 'matter' => $matter, 'client' => $client, 'bank' => $bank, 'path' => $path)));
	if ((int) $reg['code'] >= 300) {
		if ($docId) cpx_sb('DELETE', 'client_project_docs?id=eq.' . urlencode($docId));
		cpx_storage_delete_object($path, 'client-docs');
		return array('ok' => false, 'errors' => array((int) $reg['code'] === 409 ? 'el número ' . $number . ' ya está usado' : 'no se pudo registrar la factura (' . $reg['code'] . ')'));
	}

	/* Envío: cliente + copia a Javier. */
	$sent = cpx_send_with_copy($email, $subject, $html, $attachment);
	if (!$sent) $warnings[] = 'la factura se ha generado y guardado, pero el correo al cliente NO ha salido (revisa SMTP)';

	return array('ok' => true, 'number' => $number, 'which' => $which, 'lang' => $lang, 'email' => $email, 'sent' => $sent, 'total' => $am['total'], 'warnings' => $warnings);
}


/* ---------- Reenviar un documento ya emitido ----------
 * El cliente ha perdido el correo: se le vuelve a mandar el MISMO PDF que hay en su
 * Documentación (no se regenera nada, no cambia ningún estado), con copia a Javier.
 * Vale para cualquier documento del proyecto, también los subidos a mano. */
function cpx_doc_resend($projectId, $docId) {
	if (!preg_match('/^[0-9a-f-]{36}$/', (string) $projectId) || !preg_match('/^[0-9a-f-]{36}$/', (string) $docId)) return array('ok' => false, 'error' => 'bad_id');
	$docs = cpx_rows('client_project_docs?id=eq.' . urlencode($docId) . '&project_id=eq.' . urlencode($projectId) . '&select=id,kind,title,path&limit=1');
	if (empty($docs[0]['path'])) return array('ok' => false, 'error' => 'not_found');
	$doc = $docs[0];
	$rows = cpx_rows('client_projects?id=eq.' . urlencode($projectId) . '&select=ref,title_es,title_en,client_email,approved_lang,access_token&limit=1');
	if (empty($rows[0])) return array('ok' => false, 'error' => 'not_found');
	$p = $rows[0];
	$email = isset($p['client_email']) ? trim($p['client_email']) : '';
	if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) return array('ok' => false, 'error' => 'no_email');
	$pdf = cpx_storage_download($doc['path'], 'client-docs');
	if ($pdf === null) return array('ok' => false, 'error' => 'storage');

	$lang = (isset($p['approved_lang']) && $p['approved_lang'] === 'en') ? 'en' : 'es';
	$kindLabel = cpx_doc_kind_label($doc['kind'], $lang);
	$title = trim((string) (!empty($p['title_' . $lang]) ? $p['title_' . $lang] : $p['ref']));
	$h = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
	$url = 'https://standarte.es/proyecto?t=' . $p['access_token'];
	if ($lang === 'en') {
		$subject = sprintf('%s for your project %s (resent) — Standarte', $kindLabel, $p['ref']);
		$body = sprintf('As requested, please find attached again the document <strong>%s</strong> (%s) for your project <strong>%s</strong> (%s). It is also available at any time in the Documents section of your project.', $h($doc['title']), $h(strtolower($kindLabel)), $h($title), $h($p['ref']));
		$button = 'Open the project'; $sign = 'Best regards,<br><strong>The Standarte team</strong>';
	} else {
		$subject = sprintf('%s de su proyecto %s (reenvío) — Standarte', $kindLabel, $p['ref']);
		$body = sprintf('Como nos ha solicitado, le adjuntamos de nuevo el documento <strong>%s</strong> (%s) de su proyecto <strong>%s</strong> (%s). Lo tiene también disponible en todo momento en la Documentación de su proyecto.', $h($doc['title']), $h(mb_strtolower($kindLabel)), $h($title), $h($p['ref']));
		$button = 'Abrir el proyecto'; $sign = 'Un cordial saludo,<br><strong>Equipo de Standarte</strong>';
	}
	$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. "<p style='margin:0 0 16px;'>" . $body . "</p>"
		. "<p style='text-align:center;margin:20px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>" . $h($button) . "</a></p>"
		. "<p style='margin:28px 0 0;'>" . $sign . "</p></body></html>";
	$name = preg_replace('/[^A-Za-z0-9_-]+/', '_', $doc['title']);
	if ($name === '' || $name === '_') $name = $doc['kind'];
	$sent = cpx_send_with_copy($email, $subject, $html, array('name' => $name . '.pdf', 'type' => 'application/pdf', 'data' => $pdf));
	return $sent ? array('ok' => true, 'email' => $email, 'lang' => $lang) : array('ok' => false, 'error' => 'smtp', 'email' => $email);
}
