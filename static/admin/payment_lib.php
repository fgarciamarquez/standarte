<?php
/*
 * Forma de pago de un proyecto de cliente: UNA sola regla para el contrato y las facturas.
 *
 * Por qué existe (13/11/2026): el contrato de 31C salió con «80 % por adelantado y 20 % a
 * la entrega» cuando el proyecto tenía escrito un pago único del 100 %. La regla del
 * reparto (payment_split) vivía solo en invoice_lib.php; el contrato no la leía y, si el
 * proyecto no tenía texto libre de forma de pago, imprimía un 80/20 fijo. Las facturas
 * decían una cosa y el contrato otra. Ahora los dos documentos preguntan aquí.
 *
 * Solo funciones puras: no leen de Supabase ni mandan nada, así que se prueban sin red
 * (scripts/probar_contrato.php y scripts/probar_facturas.php).
 */
if (!function_exists('cpx_payment_split')) {

	/* Reparto del pago, en porcentajes, desde el campo payment_split del proyecto:
	 * «100» -> un solo pago por el total; «50/50», «70/30», «80/20» -> dos tramos. Vacío es
	 * el 80/20 de siempre ('default' => true). Lo que no encaje (tres tramos, números que no
	 * suman 100) devuelve también 80/20 pero con 'error': las facturas lo avisan y el
	 * contrato NO se emite, porque un contrato no puede llevar una condición que nadie ha
	 * decidido. Máximo dos tramos: es lo que admite el modelo (invoice_state / invoice2_state). */
	function cpx_payment_split($p) {
		$raw = trim((string) (isset($p['payment_split']) ? $p['payment_split'] : ''));
		if ($raw === '') return array('pct' => array(80, 20), 'default' => true, 'error' => '');
		$nums = array();
		foreach (preg_split('/[^0-9.,]+/', $raw) as $x) {
			$x = trim(str_replace(',', '.', $x));
			if ($x === '') continue;
			$nums[] = (float) $x;
		}
		$n = count($nums);
		if ($n === 1 && abs($nums[0] - 100) < 0.01) {
			return array('pct' => array(100), 'default' => false, 'error' => '');
		}
		if ($n === 2 && abs(($nums[0] + $nums[1]) - 100) < 0.01 && $nums[0] > 0 && $nums[1] > 0) {
			return array('pct' => array($nums[0], $nums[1]), 'default' => false, 'error' => '');
		}
		return array('pct' => array(80, 20), 'default' => true,
			'error' => 'el reparto «' . $raw . '» no es válido (se admite «100» o dos tramos que sumen 100): se factura 80/20');
	}

	/* Porcentaje sin decimales inútiles y con el separador del idioma: 80 · 33,5 (es) · 33.5 (en). */
	function cpx_split_pct($n, $lang = 'es') {
		$sep = ($lang === 'en') ? '.' : ',';
		$s = number_format((float) $n, 2, $sep, '');
		return rtrim(rtrim($s, '0'), $sep);
	}

	/* El reparto escrito como lo teclea el gestor: «100», «80/20», «33,5/66,5». */
	function cpx_split_label($split) {
		$out = array();
		foreach ($split['pct'] as $x) $out[] = cpx_split_pct($x, 'es');
		return implode('/', $out);
	}

	/* Importes de cada pago sobre el TOTAL del contrato (el de la cláusula C). El último
	 * tramo es el resto exacto, para que la suma cuadre al céntimo con ese total. */
	function cpx_payment_plan($split, $total) {
		$total = round((float) $total, 2);
		$pct = $split['pct'];
		if (count($pct) === 1) {
			return array('single' => true, 'pct' => array(100.0), 'amounts' => array($total));
		}
		$first = round($total * $pct[0] / 100, 2);
		return array('single' => false, 'pct' => array((float) $pct[0], (float) $pct[1]), 'amounts' => array($first, round($total - $first, 2)));
	}

	/* Porcentajes que menciona un texto libre de forma de pago, en el orden en que aparecen:
	 * «80% in advance / 20% post-delivery» -> [80, 20]; «Transferencia a 30 días» -> []. */
	function cpx_payment_terms_pcts($text) {
		$out = array();
		if (preg_match_all('/(?<![\d.,])(\d{1,3}(?:[.,]\d{1,2})?)\s*(?:%|por\s*ciento|per\s*cent|percent)/iu', (string) $text, $m)) {
			foreach ($m[1] as $x) $out[] = (float) str_replace(',', '.', $x);
		}
		return $out;
	}

	/* ¿El texto libre de forma de pago contradice al reparto? Devuelve '' si no, o la
	 * explicación para el gestor. Solo se puede cotejar lo que el texto dice con cifras: si
	 * no menciona ningún porcentaje, no hay nada que comparar y se da por bueno (el contrato
	 * imprime además los importes del reparto, así que la cifra queda escrita de todos modos).
	 * Con cifras, deben ser las del reparto y en su orden: «100 %» para un pago único; el
	 * primer tramo, o los dos, para un reparto en dos pagos. */
	function cpx_payment_terms_conflict($text, $split) {
		$text = trim((string) $text);
		if ($text === '') return '';
		$found = cpx_payment_terms_pcts($text);
		if (!$found) return '';
		$pct = $split['pct'];
		$ok = true;
		if (count($pct) === 1) {
			foreach ($found as $x) { if (abs($x - 100) >= 0.01) $ok = false; }
		} else {
			if (count($found) > 2) $ok = false;
			foreach ($found as $i => $x) { if (!isset($pct[$i]) || abs($x - $pct[$i]) >= 0.01) $ok = false; }
		}
		if ($ok) return '';
		$dice = array();
		foreach ($found as $x) $dice[] = cpx_split_pct($x, 'es') . ' %';
		return 'la forma de pago escrita («' . $text . '») habla de ' . implode(' y ', $dice)
			. ', pero el reparto de pago del proyecto es ' . cpx_split_label($split) . (!empty($split['default']) ? ' (el de por defecto: el campo está vacío)' : '')
			. ': corrige el texto o el reparto para que el contrato y las facturas digan lo mismo';
	}
}
