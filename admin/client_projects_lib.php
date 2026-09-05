<?php
/*
 * Helpers compartidos por la zona privada de proyectos (proyectos.php y
 * ajax_proyecto_admin.php). Requiere que supabase-config.php ya esté incluido.
 */
if (!function_exists('cpx_key')) {

	function cpx_key() { return defined('SUPABASE_SERVICE_KEY') ? SUPABASE_SERVICE_KEY : SUPABASE_KEY; }
	function cpx_has_service_key() { return defined('SUPABASE_SERVICE_KEY'); }

	function cpx_sb($method, $endpoint, $data = null) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/' . $endpoint);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 12);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(),
			'Authorization: Bearer ' . cpx_key(),
			'Content-Type: application/json',
			'Prefer: return=representation'
		));
		if ($data !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		$response = curl_exec($ch);
		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		$decoded = json_decode($response, true);
		return array('code' => $httpCode, 'body' => is_array($decoded) ? $decoded : $response);
	}

	function cpx_rows($endpoint) {
		$r = cpx_sb('GET', $endpoint);
		return (is_array($r) && (int) $r['code'] === 200 && is_array($r['body'])) ? $r['body'] : array();
	}

	function cpx_lines_to_array($text) {
		return array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) $text)), function ($x) { return $x !== ''; }));
	}

	function cpx_project_id_by_token($token) {
		$rows = cpx_rows('client_projects?access_token=eq.' . urlencode($token) . '&select=id&limit=1');
		return isset($rows[0]['id']) ? $rows[0]['id'] : null;
	}

	/* Sube un fichero a un bucket (service key) y devuelve el código HTTP.
	 * El bucket por defecto es el público de la propuesta gráfica; la documentación
	 * (PDF) va al privado 'client-docs'. */
	function cpx_storage_upload($path, $localFile, $mime, $bucket = 'client-projects') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/' . $bucket . '/' . $path);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($localFile));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 180);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(),
			'Authorization: Bearer ' . cpx_key(),
			'Content-Type: ' . $mime,
			'x-upsert: true'
		));
		curl_exec($ch);
		$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		return $code;
	}
	function cpx_storage_public_url($path) {
		return SUPABASE_URL . '/storage/v1/object/public/client-projects/' . $path;
	}
	/* ¿El fichero <path> del bucket lo referencia el media de OTRO proyecto?
	 * (p. ej. un duplicado/piloto que apunta al mismo archivo). Si es así no se
	 * debe borrar al eliminar el proyecto original, para no dejar roto al otro. */
	function cpx_media_referenced_elsewhere($path, $excludeProjectId) {
		$q = 'client_project_media?select=id&limit=1'
			. '&project_id=neq.' . urlencode($excludeProjectId)
			. '&src=like.' . rawurlencode('*' . $path);
		$rows = cpx_rows($q);
		return !empty($rows);
	}

	/* Borra del bucket client-projects los ficheros subidos de un proyecto
	 * (la carpeta <projectId>/...). Best-effort: si algo falla no aborta el borrado
	 * del proyecto. Los media enlazados de Google Drive no viven en Storage y se
	 * ignoran (no aparecen en el listado). Además, NO se borra ningún fichero que
	 * otro proyecto siga referenciando (duplicados/pilotos que comparten archivo). */
	function cpx_storage_delete_folder($projectId) {
		if (!preg_match('/^[0-9a-f-]{36}$/', (string) $projectId)) return;
		// La documentación vive en OTRO bucket (privado) y en una subcarpeta que el
		// listado —no recursivo— no alcanza: se limpia aparte para no dejarla huérfana.
		cpx_storage_delete_prefix($projectId . '/docs/', 'client-docs');
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/list/client-projects');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('prefix' => $projectId . '/', 'limit' => 1000)));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		$resp = curl_exec($ch);
		curl_close($ch);
		$list = json_decode($resp, true);
		if (!is_array($list) || empty($list)) return;
		$paths = array();
		foreach ($list as $obj) {
			if (!isset($obj['name']) || $obj['name'] === '') continue;
			$full = $projectId . '/' . $obj['name'];
			if (cpx_media_referenced_elsewhere($full, $projectId)) continue;  // lo usa otro proyecto: respétalo
			$paths[] = $full;
		}
		if (empty($paths)) return;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/client-projects');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('prefixes' => $paths)));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		curl_exec($ch);
		curl_close($ch);
	}
	/* Borra todos los objetos bajo un prefijo del bucket (no recursivo: un nivel).
	 * Se usa para la subcarpeta docs/ de cada proyecto, que el listado de la carpeta
	 * raíz no alcanza. */
	function cpx_storage_delete_prefix($prefix, $bucket = 'client-projects') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/list/' . $bucket);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('prefix' => $prefix, 'limit' => 1000)));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		$resp = curl_exec($ch);
		curl_close($ch);
		$list = json_decode($resp, true);
		if (!is_array($list) || empty($list)) return;
		$paths = array();
		foreach ($list as $obj) { if (!empty($obj['name'])) $paths[] = $prefix . $obj['name']; }
		if (empty($paths)) return;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/' . $bucket);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('prefixes' => $paths)));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		curl_exec($ch);
		curl_close($ch);
	}

	/* Tipos aceptados: mime/extensión permitidos -> [extensión, tipo de media]. */
	function cpx_media_kind($mime, $filename) {
		$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
		$map = array(
			'image/jpeg' => array('jpg', 'image'), 'image/png' => array('png', 'image'),
			'image/webp' => array('webp', 'image'), 'image/avif' => array('avif', 'image'),
			'video/mp4' => array('mp4', 'video'), 'video/webm' => array('webm', 'video'),
			'model/gltf-binary' => array('glb', 'model')
		);
		if (isset($map[$mime])) return $map[$mime];
		// .glb suele viajar como application/octet-stream
		if ($ext === 'glb') return array('glb', 'model');
		return null;
	}

	/* Extrae el FILE_ID de cualquier formato de enlace de Google Drive. */
	function cpx_drive_file_id($url) {
		if (!is_string($url) || trim($url) === '') return null;
		$url = trim($url);
		if (preg_match('~/file/d/([a-zA-Z0-9_-]{10,})~', $url, $m)) return $m[1];   // /file/d/ID/view
		if (preg_match('~[?&]id=([a-zA-Z0-9_-]{10,})~', $url, $m)) return $m[1];    // open?id= / uc?id=
		if (preg_match('~^[a-zA-Z0-9_-]{20,}$~', $url)) return $url;                // ID pegado a secas
		return null;
	}

	/* Construye la URL embebible de Drive según el tipo de media. */
	function cpx_drive_src($id, $type) {
		if ($type === 'image') return 'https://drive.google.com/thumbnail?id=' . $id . '&sz=w2000';
		if ($type === 'video') return 'https://drive.google.com/file/d/' . $id . '/preview';
		return 'https://drive.google.com/file/d/' . $id . '/view';                  // model (.glb) u otro
	}

	/* Plantilla inicial: textos que suelen repetirse en cada propuesta (basados en
	 * el proyecto IDh). Se aplican al crear un proyecto nuevo y luego se editan
	 * in situ en su página. */
	function cpx_default_template() {
		return array(
			'memoria_es' => 'Stand de madera, foamX y arquitectura textil. Suelo de tarima blanca. Mobiliario y multimedia según prototipo (configuración flexible). Diseño de murales.',
			'memoria_en' => 'Wooden stand, foamX and textile architecture. White raised floor. Furniture and multimedia as per prototype (flexible layout). Mural design.',
			'includes_es' => array('Diseño, planificación y validación técnica.', 'Construcción, transporte, montaje y desmontaje.', 'Mobiliario, multimedia y gráfica.'),
			'includes_en' => array('Design, planning and technical validation.', 'Construction, transport, assembly and dismantling.', 'Furniture, multimedia and graphics.'),
			'excludes_es' => array('Costes de acometida eléctrica y caja de luz (de la feria).', 'Costes de consumo eléctrico.'),
			'excludes_en' => array('Electrical connection and power box costs (fair).', 'Electricity consumption costs.'),
			'interlocutor_name' => 'Javier G. Márquez',
			'interlocutor_role_es' => 'Director de Proyectos',
			'interlocutor_role_en' => 'Projects Director',
			'interlocutor_email' => 'javier@standarte.es'
		);
	}

	/* ---------- Duplicar un proyecto ----------
	 * Muchas propuestas se parecen: duplicar una y retocarla ahorra rehacer memoria,
	 * incluidos/excluidos, forma de pago y presupuesto.
	 *
	 * Qué NO viaja a la copia (cpx_project_no_copy), y por qué:
	 *  - Identidad y estado: id, access_token (la copia nace con enlace propio),
	 *    created_at/updated_at, status, approved/approved_at/approved_with_offer,
	 *    paid, contract_done, invoice_done, invoice2_done, paused, is_demo, testimonial.
	 *  - Rastro del cliente original: last_client_visit, visit_notified_at,
	 *    offer_notice_sent_at.
	 *  - Datos fiscales del cliente original (billing_*): son suyos y no pueden
	 *    aparecer en la propuesta de otra empresa.
	 *  - Fechas que caducan: discount_deadline y proposal_valid_until. El importe y
	 *    la etiqueta del descuento sí se copian (la estructura comercial se repite),
	 *    pero la fecha se deja vacía para no enseñar al cliente nuevo un descuento
	 *    ya vencido —que además mengua 1.000 € por semana transcurrida—.
	 *  - ref, client_name y client_email: los pone quien duplica.
	 * Los comentarios (client_project_comments) nunca se copian: son la conversación
	 * con el otro cliente.
	 */
	function cpx_project_no_copy() {
		return array(
			'id', 'access_token', 'created_at', 'updated_at',
			'ref', 'client_name', 'client_email',
			'status', 'paid', 'approved', 'approved_at', 'approved_with_offer',
			'contract_done', 'invoice_done', 'invoice2_done', 'is_demo', 'testimonial',
			'last_client_visit', 'visit_notified_at', 'offer_notice_sent_at',
			'paused', 'paused_reason',
			'billing_company', 'billing_cif', 'billing_address', 'billing_postal_code',
			'billing_city', 'billing_country',
			'discount_deadline', 'proposal_valid_until'
		);
	}

	/* Cuenta conceptos de presupuesto y archivos por proyecto (dos consultas para
	 * toda la lista, no una por fila): alimenta las etiquetas del formulario. */
	function cpx_child_counts() {
		$out = array('budget' => array(), 'media' => array());
		foreach (cpx_rows('client_project_budget_items?select=project_id') as $r) {
			if (!isset($r['project_id'])) continue;
			$out['budget'][$r['project_id']] = (isset($out['budget'][$r['project_id']]) ? $out['budget'][$r['project_id']] : 0) + 1;
		}
		foreach (cpx_rows('client_project_media?select=project_id') as $r) {
			if (!isset($r['project_id'])) continue;
			$out['media'][$r['project_id']] = (isset($out['media'][$r['project_id']]) ? $out['media'][$r['project_id']] : 0) + 1;
		}
		return $out;
	}

	/* Crea la copia. $overrides: ref, client_name, client_email, title_es, title_en.
	 * Devuelve array(ok, id, token, ref, budget, media[, error]). */
	function cpx_duplicate_project($srcId, $overrides = array(), $withBudget = true, $withMedia = false) {
		if (!preg_match('/^[0-9a-f-]{36}$/', (string) $srcId)) return array('ok' => false, 'error' => 'bad_id');
		$rows = cpx_rows('client_projects?id=eq.' . urlencode($srcId) . '&select=*&limit=1');
		if (empty($rows[0])) return array('ok' => false, 'error' => 'not_found');
		$src = $rows[0];

		$skip = array_flip(cpx_project_no_copy());
		$row = array();
		foreach ($src as $k => $v) { if (!isset($skip[$k])) $row[$k] = $v; }

		$row['access_token'] = bin2hex(random_bytes(16));   // enlace propio: el del original sigue siendo del original
		$row['status'] = 'draft';
		$row['updated_at'] = gmdate('c');
		$ref = isset($overrides['ref']) ? trim($overrides['ref']) : '';
		$row['ref'] = ($ref !== '') ? $ref : trim($src['ref'] . ' COPIA');
		$row['client_name'] = isset($overrides['client_name']) ? trim($overrides['client_name']) : '';
		$row['client_email'] = isset($overrides['client_email']) ? trim($overrides['client_email']) : '';
		foreach (array('title_es', 'title_en') as $k) {
			if (isset($overrides[$k]) && trim($overrides[$k]) !== '') $row[$k] = trim($overrides[$k]);
		}

		$r = cpx_sb('POST', 'client_projects', $row);
		if ((int) $r['code'] >= 300 || !isset($r['body'][0]['id'])) {
			return array('ok' => false, 'error' => 'insert', 'code' => $r['code']);
		}
		$newId = $r['body'][0]['id'];
		$out = array('ok' => true, 'id' => $newId, 'token' => $row['access_token'], 'ref' => $row['ref'], 'budget' => 0, 'media' => 0);

		if ($withBudget) {
			$items = cpx_rows('client_project_budget_items?project_id=eq.' . urlencode($srcId)
				. '&select=concept_es,concept_en,amount,sort_order&order=sort_order.asc');
			if (!empty($items)) {
				foreach ($items as $i => $it) { $items[$i]['project_id'] = $newId; }
				$ri = cpx_sb('POST', 'client_project_budget_items', $items);
				$out['budget'] = ((int) $ri['code'] < 300 && is_array($ri['body'])) ? count($ri['body']) : 0;
				if ((int) $ri['code'] >= 300) $out['budget_error'] = $ri['code'];
			}
		}

		if ($withMedia) {
			/* Las filas nuevas apuntan al MISMO fichero del bucket que el original: no se
			 * copia nada en Storage (ni se duplica el gasto). Borrar después uno de los dos
			 * proyectos no deja al otro sin imágenes: cpx_storage_delete_folder respeta los
			 * ficheros que sigue referenciando otro proyecto. */
			$media = cpx_rows('client_project_media?project_id=eq.' . urlencode($srcId)
				. '&select=type,src,poster,title_es,title_en,description_es,description_en,sort_order&order=sort_order.asc');
			if (!empty($media)) {
				foreach ($media as $i => $m) { $media[$i]['project_id'] = $newId; }
				$rm = cpx_sb('POST', 'client_project_media', $media);
				$out['media'] = ((int) $rm['code'] < 300 && is_array($rm['body'])) ? count($rm['body']) : 0;
				if ((int) $rm['code'] >= 300) $out['media_error'] = $rm['code'];
			}
		}

		return $out;
	}

	/* ---------- Aviso al cliente: fechas de la propuesta ----------
	 * Dos fechas comprometen al cliente y por eso se le avisan al cambiarlas:
	 *   - La fecha de la OFERTA (descuento por pronta decisión): de ella depende lo
	 *     que se ahorra, y pasada mengua 1.000 € por semana.
	 *   - La VALIDEZ DE LA PROPUESTA: pasada esa fecha el proyecto se muestra como
	 *     caducado y no se puede aprobar.
	 * Un solo correo cubre las dos: si se cambian en el mismo guardado —cosa normal al
	 * prorrogar—, el cliente recibe un aviso, no dos.
	 * $offerDeadline y $validUntil son las fechas que HAN CAMBIADO (null = esa no).
	 * Devuelve true si el correo salió.
	 */
	function cpx_project_dates_email($p, $offerDeadline = null, $validUntil = null) {
		if (!$offerDeadline && !$validUntil) return false;
		$to = isset($p['client_email']) ? trim($p['client_email']) : '';
		if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) return false;

		$ref     = isset($p['ref']) ? $p['ref'] : '';
		$titleEs = !empty($p['title_es']) ? $p['title_es'] : $ref;
		$titleEn = !empty($p['title_en']) ? $p['title_en'] : $titleEs;
		$url     = 'https://standarte.es/proyecto?t=' . (isset($p['access_token']) ? $p['access_token'] : '');
		$h       = function ($x) { return htmlspecialchars((string) $x, ENT_QUOTES, 'UTF-8'); };
		$fEs     = function ($d) { return date('d/m/Y', strtotime($d . ' 12:00:00')); };
		$fEn     = function ($d) { return date('F j, Y', strtotime($d . ' 12:00:00')); };

		$es = array();
		$en = array();

		if ($offerDeadline) {
			$amount  = isset($p['discount_amount']) ? (float) $p['discount_amount'] : 0.0;
			$labelEs = !empty($p['discount_label_es']) ? $p['discount_label_es'] : 'Descuento por pronta decisión';
			$labelEn = !empty($p['discount_label_en']) ? $p['discount_label_en'] : 'Early-decision discount';

			/* El descuento se guarda en euros; el cliente lo entiende mejor como porcentaje,
			 * así que se dan los dos. El porcentaje se calcula sobre la suma del presupuesto:
			 * si aún no hay conceptos, se omite en vez de inventar una referencia. */
			$subtotal = 0.0;
			foreach (cpx_rows('client_project_budget_items?select=amount&project_id=eq.' . urlencode($p['id'])) as $it) {
				$subtotal += (float) $it['amount'];
			}
			$pct = ($subtotal > 0) ? round($amount / $subtotal * 100, 1) : null;
			$pctEs = $pct === null ? '' : ' (un ' . rtrim(rtrim(number_format($pct, 1, ',', '.'), '0'), ',') . '&nbsp;% del presupuesto)';
			$pctEn = $pct === null ? '' : ' (' . rtrim(rtrim(number_format($pct, 1, '.', ','), '0'), '.') . '% of the quote)';
			$eurEs = number_format($amount, ($amount == round($amount) ? 0 : 2), ',', '.') . '&nbsp;€';
			$eurEn = '€' . number_format($amount, ($amount == round($amount) ? 0 : 2), '.', ',');

			$es[] = "La oferta de su proyecto <strong>" . $h($titleEs) . "</strong> (" . $h($ref) . ") "
				. "es válida <strong>hasta el " . $fEs($offerDeadline) . "</strong>. " . $h($labelEs) . ": <strong>" . $eurEs . "</strong>" . $pctEs . ". "
				. "Si aprueba el proyecto antes de esa fecha, se descuenta entera; después se reduce 1.000 € por cada semana transcurrida.";
			$en[] = "The offer on your project <strong>" . $h($titleEn) . "</strong> (" . $h($ref) . ") "
				. "is valid <strong>until " . $fEn($offerDeadline) . "</strong>. " . $h($labelEn) . ": <strong>" . $eurEn . "</strong>" . $pctEn . ". "
				. "If you approve the project before that date it is deducted in full; afterwards it shrinks by €1,000 for each elapsed week.";
		}

		if ($validUntil) {
			/* Si en el mismo correo ya se ha presentado el proyecto (párrafo de la oferta),
			 * esta frase no repite el título: sería redundante en un texto que se quiere corto. */
			$suj  = $offerDeadline ? 'La propuesta' : 'La propuesta de su proyecto <strong>' . $h($titleEs) . '</strong> (' . $h($ref) . ')';
			$sujE = $offerDeadline ? 'The proposal' : 'The proposal for your project <strong>' . $h($titleEn) . '</strong> (' . $h($ref) . ')';
			$es[] = $suj . " es válida <strong>hasta el " . $fEs($validUntil) . "</strong>. "
				. "Pasada esa fecha, los precios y condiciones dejan de estar garantizados y habría que revisarlos.";
			$en[] = $sujE . " is valid <strong>until " . $fEn($validUntil) . "</strong>. "
				. "After that date, prices and terms are no longer guaranteed and would need to be reviewed.";
		}

		$cierreEs = ' Aprobar el proyecto no impide seguir haciendo modificaciones.';
		$cierreEn = ' Approving the project does not prevent further modifications.';

		if ($offerDeadline && $validUntil) {
			$subject = 'Nuevas fechas de su propuesta / New dates for your proposal — ' . $ref;
		} elseif ($offerDeadline) {
			$subject = 'Nueva fecha para su oferta / New offer date — ' . $ref;
		} else {
			$subject = 'Nueva validez de su propuesta / New proposal validity — ' . $ref;
		}

		$pEs = "<p style='margin:0 0 16px;text-align:left;'>" . implode(' ', $es) . $cierreEs . "</p>";
		$pEn = "<p style='margin:0 0 16px;text-align:left;color:#555;'>" . implode(' ', $en) . $cierreEn . "</p>";

		$html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
			. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
			. $pEs . $pEn
			. "<p style='text-align:center;margin:20px 0 0;'><a href='" . $h($url) . "' style='display:inline-block;background:#1b1b1a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:monospace;'>Abrir el proyecto / Open the project</a></p>"
			. "<p style='margin:28px 0 0;text-align:left;'>Un cordial saludo,<br>Best regards,<br><strong>Equipo de Standarte / The Standarte team</strong></p>"
			. "<p style='text-align:center;font-size:12px;color:#888;margin-top:24px;'>Mensaje automatizado del sistema de gestión de proyectos de Standarte.<br>Automated message from Standarte's project management system.<br><a href='https://standarte.es' style='color:#888;text-decoration:none;'>https://standarte.es</a></p>"
			. "</body></html>";

		require_once __DIR__ . '/email_campaing/mailer.php';
		$sent = false;
		try {
			$cfg = require __DIR__ . '/email_campaing/config.php';
			$sent = campaign_send_smtp($cfg, $to, $subject, $html);
		} catch (Exception $e) {
			$sent = false;
		}
		if (!$sent) {
			$sent = @mail($to, $subject, $html, "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\n");
		}
		return (bool) $sent;
	}

	/* Estado que impide cualquier aviso de fechas: aprobado (ya no hay nada que
	 * decidir), pausado, piloto público o sin email de cliente. */
	function cpx_dates_notifiable($after) {
		if (!empty($after['approved'])) return false;
		if (!empty($after['is_demo']) || !empty($after['paused'])) return false;
		$to = isset($after['client_email']) ? trim($after['client_email']) : '';
		return $to !== '' && (bool) filter_var($to, FILTER_VALIDATE_EMAIL);
	}

	/* ¿Toca avisar de la fecha de la OFERTA?
	 * $after es la fila TAL COMO QUEDA tras guardar (importe y texto pueden cambiar en
	 * el mismo guardado que la fecha), y la comparación de fechas se hace con la
	 * anterior. Se separa del envío para poder razonarla —y probarla— sin mandar nada. */
	function cpx_should_notify_offer($after, $oldDeadline, $newDeadline, $today = null) {
		$today = $today ?: date('Y-m-d');
		if (!$newDeadline) return false;                                   // se ha borrado la fecha: no hay nada que anunciar
		if ($newDeadline === $oldDeadline) return false;                   // no ha cambiado
		if ($newDeadline < $today) return false;                           // fecha ya pasada: no es una oferta que ofrecer
		if ((float) (isset($after['discount_amount']) ? $after['discount_amount'] : 0) <= 0) return false;  // sin importe no hay oferta
		return cpx_dates_notifiable($after);
	}

	/* ¿Toca avisar de la VALIDEZ DE LA PROPUESTA? Mismas reglas, sin la del importe:
	 * la validez existe haya descuento o no. */
	function cpx_should_notify_valid_until($after, $oldDate, $newDate, $today = null) {
		$today = $today ?: date('Y-m-d');
		if (!$newDate) return false;                                       // se ha borrado: la propuesta pasa a no caducar, no hay aviso que dar
		if ($newDate === $oldDate) return false;                           // no ha cambiado
		if ($newDate < $today) return false;                               // ya vencida: anunciarla sería anunciar una propuesta muerta
		return cpx_dates_notifiable($after);
	}

	/* ---------- Catálogo de eventos (ferias y congresos) ----------
	 * Lo genera scripts/build_admin_data.mjs desde fairsData.js en cada build
	 * (admin/data/fairs.json, gitignored). El proyecto guarda solo el slug: así el
	 * nombre y la fecha se leen siempre del catálogo vivo y no se quedan viejos.
	 */
	function cpx_fairs_catalog() {
		static $cache = null;
		if ($cache !== null) return $cache;
		$f = __DIR__ . '/data/fairs.json';
		$raw = is_readable($f) ? file_get_contents($f) : '';
		$data = $raw !== '' ? json_decode($raw, true) : null;
		$cache = is_array($data) ? $data : array();
		return $cache;
	}

	/* ¿El slug existe en el catálogo? Evita guardar una referencia rota si alguien
	 * escribe a mano en el campo en vez de elegir de la lista. */
	function cpx_fair_exists($slug) {
		if (!is_string($slug) || !preg_match('/^[a-z0-9-]{3,80}$/', $slug)) return false;
		foreach (cpx_fairs_catalog() as $f) { if (isset($f['slug']) && $f['slug'] === $slug) return true; }
		return false;
	}

	/* Nombre + ciudad + fecha de un evento, para pintarlo donde haga falta. */
	function cpx_fair_info($slug) {
		foreach (cpx_fairs_catalog() as $f) { if (isset($f['slug']) && $f['slug'] === $slug) return $f; }
		return null;
	}

	/* ---------- Cuentas de ingreso ----------
	 * Las tres únicas cuentas que se usan, generadas en el build desde
	 * src/lib/paymentAccounts.js (admin/data/accounts.json). El alta ofrece un
	 * desplegable y resuelve aquí el IBAN y el BIC: así el número de cuenta que ve el
	 * cliente NUNCA se teclea a mano, que es donde se colaba el error caro.
	 */
	function cpx_accounts() {
		static $cache = null;
		if ($cache !== null) return $cache;
		$f = __DIR__ . '/data/accounts.json';
		$raw = is_readable($f) ? file_get_contents($f) : '';
		$data = $raw !== '' ? json_decode($raw, true) : null;
		$cache = is_array($data) ? $data : array();
		return $cache;
	}

	/* Cuenta por id (la del desplegable); null si no existe. */
	function cpx_account($id) {
		foreach (cpx_accounts() as $a) { if (isset($a['id']) && $a['id'] === $id) return $a; }
		return null;
	}

	/* ---------- Documentación del proyecto (PDF) ----------
	 * Contrato y facturas del proyecto aprobado. NO viven en el bucket público como
	 * las imágenes: son datos fiscales del cliente, así que la fila guarda la RUTA y
	 * la descarga se sirve con una URL firmada de corta vida, previa comprobación del
	 * token del proyecto (ajax_proyecto_doc.php). Adivinar la ruta no basta.
	 */
	function cpx_storage_signed_url($path, $seconds = 60, $bucket = 'client-docs') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/sign/' . $bucket . '/' . $path);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('expiresIn' => (int) $seconds)));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		$resp = curl_exec($ch);
		$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		if ((int) $code >= 300) return null;
		$j = json_decode($resp, true);
		$signed = isset($j['signedURL']) ? $j['signedURL'] : (isset($j['signedUrl']) ? $j['signedUrl'] : null);
		if (!$signed) return null;
		return SUPABASE_URL . '/storage/v1' . (strpos($signed, '/') === 0 ? $signed : '/' . $signed);
	}

	/* Borra un objeto del bucket (best-effort). */
	function cpx_storage_delete_object($path, $bucket = 'client-docs') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/' . $bucket);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('prefixes' => array($path))));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'apikey: ' . cpx_key(), 'Authorization: Bearer ' . cpx_key(), 'Content-Type: application/json'
		));
		curl_exec($ch);
		curl_close($ch);
	}

	/* Etiqueta legible del tipo de documento (para el correo y el panel). */
	function cpx_doc_kind_label($kind, $lang = 'es') {
		$m = array(
			'contrato' => array('es' => 'Contrato', 'en' => 'Contract'),
			'factura_anticipo' => array('es' => 'Factura de anticipo', 'en' => 'Advance invoice'),
			'factura_final' => array('es' => 'Factura final', 'en' => 'Final invoice'),
			'otro' => array('es' => 'Documento', 'en' => 'Document')
		);
		$k = isset($m[$kind]) ? $m[$kind] : $m['otro'];
		return isset($k[$lang]) ? $k[$lang] : $k['es'];
	}
}
