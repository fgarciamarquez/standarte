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

	/* Sube un fichero al bucket client-projects (service key) y devuelve el código HTTP. */
	function cpx_storage_upload($path, $localFile, $mime) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/storage/v1/object/client-projects/' . $path);
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
}
