<?php
/*
 * Forma de pago de un proyecto de cliente: UNA sola regla para el contrato y las facturas.
 *
 * Por qué existe (13/11/2026): el contrato de 31C salió con «80 % por adelantado y 20 % a
 * la entrega» cuando el proyecto tenía escrito un pago único del 100 %. La regla del
 * reparto (payment_split) vivía solo en invoice_lib.php; el contrato no la leía y, si el
 * proyecto no tenía texto libre de forma de pago, imprimía un 80/20 fijo. Las facturas
 * decían una cosa y el contrato otra. Ahora los dos documentos preguntan aquí, y ninguno
 * de los dos se emite si lo que va a decir no casa con el otro.
 *
 * Solo funciones puras: no leen de Supabase ni mandan nada, así que se prueban sin red
 * (scripts/probar_contrato.php y scripts/probar_facturas.php).
 */
if (!function_exists('cpx_payment_split')) {

	/* Reparto del pago, en porcentajes, desde el campo payment_split del proyecto:
	 * «100» -> un solo pago por el total; «50/50», «70/30», «80/20» -> dos tramos. Vacío es
	 * el 80/20 de siempre ('default' => true). Lo que no encaje (tres tramos, números que no
	 * suman 100, texto) devuelve 'error' y NO se emite con ello ni el contrato ni la factura:
	 * un documento no puede llevar una condición que nadie ha decidido. (El 'pct' 80/20 que
	 * acompaña al error solo sirve para rotular; no se factura con él.) Máximo dos tramos: es
	 * lo que admite el modelo (invoice_state / invoice2_state). */
	function cpx_payment_split($p) {
		$raw = trim((string) (isset($p['payment_split']) ? $p['payment_split'] : ''));
		if ($raw === '') return array('pct' => array(80, 20), 'default' => true, 'error' => '');
		$bad = array('pct' => array(80, 20), 'default' => true,
			'error' => 'el reparto de pago «' . $raw . '» no es válido: se admite «100» (pago único) o dos tramos que sumen 100, como «80/20» o «50/50»');
		/* Solo cifras, separadores y el signo %: «único», «100 (1 factura)» o «2 pagos» no se
		 * interpretan sacándoles los números. */
		if (!preg_match('/^[0-9.,%\s\/\-–+y]+$/u', $raw)) return $bad;
		$nums = array();
		foreach (preg_split('/[^0-9.,]+/', $raw) as $x) {
			$x = trim(str_replace(',', '.', $x), " .");
			if ($x === '') continue;
			if (!is_numeric($x)) return $bad;
			$nums[] = (float) $x;
		}
		$n = count($nums);
		if ($n === 1 && abs($nums[0] - 100) < 0.01) {
			return array('pct' => array(100), 'default' => false, 'error' => '');
		}
		if ($n === 2 && abs(($nums[0] + $nums[1]) - 100) < 0.01 && $nums[0] > 0 && $nums[1] > 0) {
			return array('pct' => array($nums[0], $nums[1]), 'default' => false, 'error' => '');
		}
		return $bad;
	}

	/* Porcentaje sin decimales inútiles y con el separador del idioma: 80 · 33,5 (es) · 33.5 (en).
	 * (No confundir con cpx_pct_label() de invoice_lib.php, que recibe un TIPO: 0,21 -> 21.) */
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

	/* Porcentajes de PAGO que menciona un texto libre de forma de pago, en el orden en que
	 * aparecen: «80% in advance / 20% post-delivery» -> [80, 20]; «Pago 80/20» -> [80, 20];
	 * «Transferencia a 30 días» -> []. No cuentan los porcentajes que el propio texto dice que
	 * son de otra cosa (IVA, IRPF, intereses, recargos, descuentos): «IVA 21 % no incluido». */
	function cpx_payment_terms_pcts($text) {
		$text = (string) $text;
		$hits = array();   // posición => lista de cifras
		$num = '(\d{1,3}(?:[.,]\d{1,2})?)';
		/* Razones «80/20», «50-50», «80/20 %»: solo si suman 100 (así una fecha o una medida
		 * no se toman por un reparto). Se borran del texto para no contarlas otra vez. */
		if (preg_match_all('/(?<![\d.,\/\-])' . $num . '\s*%?\s*[\/\-–]\s*' . $num . '(?![\d\/\-]|[.,]\d)\s*%?/u', $text, $m, PREG_OFFSET_CAPTURE | PREG_SET_ORDER)) {
			foreach ($m as $one) {
				$a = (float) str_replace(',', '.', $one[1][0]); $b = (float) str_replace(',', '.', $one[2][0]);
				if ($a > 0 && $b > 0 && abs($a + $b - 100) < 0.01) {
					$hits[$one[0][1]] = array($a, $b);
					$text = substr($text, 0, $one[0][1]) . str_repeat(' ', strlen($one[0][0])) . substr($text, $one[0][1] + strlen($one[0][0]));
				}
			}
		}
		$otros = 'i\.?v\.?a\.?|vat|i\.?r\.?p\.?f\.?|igic|impuestos?|tax(?:es)?|inter[eé]s(?:es)?|interest|recargo|surcharge|descuento|discount|dto\.?|demora|penalizaci[oó]n|penalty|retenci[oó]n|withholding';
		if (preg_match_all('/(?<![\d.,])' . $num . '\s*(?:%|por\s*cien(?:to)?\b|por\s*100\b|per\s*cent\b|percent\b|pct\b)/iu', $text, $m, PREG_OFFSET_CAPTURE | PREG_SET_ORDER)) {
			foreach ($m as $one) {
				$pos = $one[0][1];
				$antes = substr($text, max(0, $pos - 40), min(40, $pos));
				$despues = substr($text, $pos + strlen($one[0][0]), 24);
				if (preg_match('/(?<![\p{L}])(?:' . $otros . ')(?:\s+(?:del?|of|at|al|is|es|incluido|included))?[\s:(]*$/iu', $antes)) continue;
				if (preg_match('/^\s*(?:(?:de|of|en concepto de)\s+)?(?:' . $otros . ')\b/iu', $despues)) continue;
				$hits[$pos] = array((float) str_replace(',', '.', $one[1][0]));
			}
		}
		ksort($hits);
		$out = array();
		foreach ($hits as $list) { foreach ($list as $x) $out[] = $x; }
		return $out;
	}

	/* ¿El texto libre de forma de pago contradice al reparto? Devuelve '' si no, o la
	 * explicación para el gestor (el contrato no se emite con ella).
	 *  - Con cifras: deben ser las del reparto y en su orden. Pago único: todo «100 %». Dos
	 *    tramos: el primero, el segundo o los dos, pero no al revés ni con otra cifra.
	 *  - Sin cifras no hay con qué cotejar. Entonces: si el reparto está VACÍO no se emite
	 *    (no se le pone un 80/20 por defecto a un texto que no se sabe qué dice: así salió mal
	 *    31C), y si el texto habla a las claras de un pago único con un reparto en dos tramos,
	 *    o de varios pagos con un reparto «100», tampoco. */
	function cpx_payment_terms_conflict($text, $split) {
		$text = trim((string) $text);
		if ($text === '') return '';
		$pct = $split['pct'];
		$rep = cpx_split_label($split) . (!empty($split['default']) ? ' (el de por defecto: el campo «reparto» está vacío)' : '');
		$cola = ': corrige el texto o el reparto para que el contrato y las facturas digan lo mismo';
		$found = cpx_payment_terms_pcts($text);
		if ($found) {
			$ok = true;
			if (count($pct) === 1) {
				foreach ($found as $x) { if (abs($x - 100) >= 0.01) $ok = false; }
			} else {
				/* Subsecuencia de [primero, segundo]: vale «80», «20» y «80 … 20». */
				$i = 0;
				foreach ($found as $x) {
					while ($i < 2 && abs($x - $pct[$i]) >= 0.01) $i++;
					if ($i >= 2) { $ok = false; break; }
					$i++;
				}
			}
			if ($ok) return '';
			$dice = array();
			foreach ($found as $x) $dice[] = cpx_split_pct($x, 'es') . ' %';
			$debe = (count($pct) === 1) ? 'solo puede nombrar el 100 %' : 'solo puede nombrar el ' . cpx_split_pct($pct[0]) . ' % y el ' . cpx_split_pct($pct[1]) . ' %, en ese orden';
			return 'la forma de pago escrita («' . $text . '») habla de ' . implode(', ', $dice)
				. ', pero el reparto de pago del proyecto es ' . $rep . ' (el texto ' . $debe . ')' . $cola;
		}
		if (!empty($split['default'])) {
			return 'el proyecto tiene forma de pago escrita («' . $text . '») pero el campo «reparto» está vacío: escribe el reparto (100, 80/20, 50/50…) para que el contrato y las facturas sepan los importes; no se le aplica un 80/20 por defecto a un texto que no dice porcentajes';
		}
		$unico = '/\b(?:pago\s+[uú]nico|[uú]nico\s+pago|un\s+solo\s+pago|una\s+sola\s+vez|[ií]ntegr(?:o|a|amente)|(?:la\s+)?totalidad|single\s+payment|one\s+payment|one-off\s+payment|full\s+payment|(?:paid|payment|payable)\s+in\s+full|in\s+full)\b/iu';
		$varios = '/\b(?:mitad|half|dos\s+pagos|two\s+payments|dos\s+plazos|a\s+plazos|plazos|instal?lments?|restante|remaining|balance|anticipo\s+y|deposit\s+and)\b/iu';
		if (count($pct) === 2 && preg_match($unico, $text, $mm)) {
			return 'la forma de pago escrita («' . $text . '») habla de un pago único («' . $mm[0] . '»), pero el reparto de pago del proyecto es ' . $rep . $cola;
		}
		if (count($pct) === 1 && preg_match($varios, $text, $mm)) {
			return 'la forma de pago escrita («' . $text . '») habla de más de un pago («' . $mm[0] . '»), pero el reparto de pago del proyecto es ' . $rep . $cola;
		}
		return '';
	}

	/* Qué reparto lleva el contrato YA EMITIDO de un proyecto, para que una factura no pueda
	 * decir otra cosa. Devuelve array('label' => '80/20', 'code' => 'SC-…') o null si no hay
	 * contrato o no se puede saber.
	 *  - Contratos emitidos desde el 13/11/2026: lo dice su sello (contract_meta.split).
	 *  - Anteriores: el generador imprimía 80/20 siempre que el proyecto no tuviera texto libre
	 *    de forma de pago en el idioma del contrato; con texto libre imprimía ese texto y no
	 *    se puede saber aquí qué decía (se devuelve null y no se coteja). */
	function cpx_contract_issued_split($p) {
		$code = trim((string) (isset($p['contract_code']) ? $p['contract_code'] : ''));
		if ($code === '') return null;
		$meta = (isset($p['contract_meta']) && is_array($p['contract_meta'])) ? $p['contract_meta'] : array();
		if (isset($meta['split']) && trim((string) $meta['split']) !== '') return array('label' => trim((string) $meta['split']), 'code' => $code);
		if (!isset($meta['total_eur'])) return null;
		$lang = (isset($meta['lang']) && $meta['lang'] === 'en') ? 'en' : 'es';
		$terms = trim((string) (isset($p['payment_terms_' . $lang]) ? $p['payment_terms_' . $lang] : ''));
		return ($terms === '') ? array('label' => '80/20', 'code' => $code) : null;
	}

	/* ¿El contrato emitido dice un reparto distinto del que tiene hoy el proyecto? Devuelve ''
	 * o la explicación. Es lo que impide facturar el 100 % con un contrato que dice 80/20 (el
	 * estado en que quedó 31C) o cambiar el reparto después de emitir sin reemitir. */
	function cpx_contract_split_mismatch($p) {
		$issued = cpx_contract_issued_split($p);
		if (!$issued) return '';
		$split = cpx_payment_split($p);
		if ($split['error'] !== '') return '';   // ese error ya se da por su lado
		$now = cpx_split_label($split);
		if ($issued['label'] === $now) return '';
		return 'el contrato emitido (' . $issued['code'] . ') dice «' . $issued['label'] . '» y el reparto de pago del proyecto es «' . $now . '»'
			. (!empty($split['default']) ? ' (por defecto: el campo está vacío)' : '');
	}
}
