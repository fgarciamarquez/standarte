<?php
/*
 * API JSON de edición en línea para /proyecto?t=... (zona privada de proyectos).
 * En lugar de un panel aparte, la propia página del cliente se vuelve editable
 * cuando el interlocutor interno inicia sesión ahí (misma contraseña/sesión que
 * el admin de email). Las escrituras usan siempre la service key de Supabase en
 * servidor: el navegador nunca la ve, solo la cookie de sesión de PHP.
 */
/* La sesión de edición debe sobrevivir una jornada: con el gc por defecto (~24 min)
 * caducaba en mitad de la edición y el modo edición desaparecía al recargar
 * ("el botón de guardar no aparece"). 12 h de vida para cookie y datos. */
ini_set('session.gc_maxlifetime', '43200');
session_set_cookie_params(43200);
session_start();
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
$config = require __DIR__ . '/email_campaing/config.php';

function pa_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function pa_post($k, $d = '') { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : $d; }
function pa_out($arr) { echo json_encode($arr); exit; }

$action = pa_post('action');

/* ---------- Login / logout / whoami (sin requerir sesión previa) ---------- */
if ($action === 'login') {
	if (isset($config['login_password_hash']) && password_verify(pa_post('password'), $config['login_password_hash'])) {
		$_SESSION['standarte_email_campaing_auth'] = true;
		pa_out(array('ok' => true, 'authed' => true));
	}
	pa_out(array('ok' => false, 'error' => 'bad_password'));
}
if ($action === 'logout') {
	unset($_SESSION['standarte_email_campaing_auth']);
	pa_out(array('ok' => true, 'authed' => false));
}
if ($action === 'whoami') {
	pa_out(array('ok' => true, 'authed' => pa_authed()));
}

/* ---------- Todo lo demás requiere sesión + un token de proyecto válido ---------- */
if (!pa_authed()) {
	// Diagnóstico: distingue "no llegó la cookie" de "sesión caducada/vacía".
	pa_out(array('ok' => false, 'error' => 'unauthorized',
		'sess_cookie' => isset($_COOKIE[session_name()]),
		'sess_empty' => empty($_SESSION)));
}

$token = pa_post('token');
if ($token === '' || !preg_match('/^[a-f0-9]{20,64}$/', $token)) { pa_out(array('ok' => false, 'error' => 'bad_token')); }
$projectId = cpx_project_id_by_token($token);
if (!$projectId) { pa_out(array('ok' => false, 'error' => 'not_found')); }

if ($action === 'save') {
	$fields = array();
	$plain = array('ref', 'client_name', 'client_email', 'title_es', 'title_en', 'memoria_es', 'memoria_en',
		'interlocutor_name', 'interlocutor_email', 'income_account', 'bic_code');
	foreach ($plain as $k) { if (isset($_POST[$k])) $fields[$k] = pa_post($k); }
	foreach (array('includes_es', 'includes_en', 'excludes_es', 'excludes_en') as $k) {
		if (isset($_POST[$k])) $fields[$k] = cpx_lines_to_array($_POST[$k]);
	}
	if (isset($_POST['paid'])) $fields['paid'] = in_array(pa_post('paid'), array('1', 'true'), true);
	// Descuento por pronta decisión
	foreach (array('discount_label_es', 'discount_label_en') as $k) { if (isset($_POST[$k])) $fields[$k] = pa_post($k); }
	if (isset($_POST['discount_amount'])) $fields['discount_amount'] = (float) str_replace(',', '.', pa_post('discount_amount', '0'));
	if (isset($_POST['discount_deadline'])) { $d = pa_post('discount_deadline'); $fields['discount_deadline'] = ($d === '' ? null : $d); }
	// Impuestos activables y con porcentaje editable (0 = desactivado)
	foreach (array('iva_rate', 'irpf_rate') as $k) { if (isset($_POST[$k])) $fields[$k] = (float) str_replace(',', '.', pa_post($k, '0')); }
	if (empty($fields)) pa_out(array('ok' => false, 'error' => 'no_fields'));
	$fields['updated_at'] = gmdate('c');
	$r = cpx_sb('PATCH', 'client_projects?id=eq.' . urlencode($projectId), $fields);
	pa_out(array('ok' => (int) $r['code'] < 300));
}

if ($action === 'add_budget') {
	$r = cpx_sb('POST', 'client_project_budget_items', array(
		'project_id' => $projectId, 'concept_es' => pa_post('concept_es'), 'concept_en' => pa_post('concept_en'),
		'amount' => (float) str_replace(',', '.', pa_post('amount', '0')), 'sort_order' => (int) pa_post('sort_order', '999')
	));
	pa_out(array('ok' => (int) $r['code'] < 300));
}
if ($action === 'edit_budget') {
	$fields = array();
	foreach (array('concept_es', 'concept_en') as $k) { if (isset($_POST[$k])) $fields[$k] = pa_post($k); }
	if (isset($_POST['amount'])) $fields['amount'] = (float) str_replace(',', '.', pa_post('amount', '0'));
	if (empty($fields)) pa_out(array('ok' => false, 'error' => 'no_fields'));
	$r = cpx_sb('PATCH', 'client_project_budget_items?id=eq.' . urlencode(pa_post('item_id')) . '&project_id=eq.' . urlencode($projectId), $fields);
	pa_out(array('ok' => (int) $r['code'] < 300));
}
if ($action === 'del_budget') {
	$r = cpx_sb('DELETE', 'client_project_budget_items?id=eq.' . urlencode(pa_post('item_id')) . '&project_id=eq.' . urlencode($projectId));
	pa_out(array('ok' => (int) $r['code'] < 300));
}

if ($action === 'add_media') {
	$type = pa_post('type', 'image');
	if (!in_array($type, array('image', 'video', 'model'), true)) $type = 'image';
	$r = cpx_sb('POST', 'client_project_media', array(
		'project_id' => $projectId, 'type' => $type, 'src' => pa_post('src'), 'poster' => pa_post('poster'),
		'title_es' => pa_post('title_es'), 'title_en' => pa_post('title_en'), 'sort_order' => (int) pa_post('sort_order', '999')
	));
	pa_out(array('ok' => (int) $r['code'] < 300));
}
if ($action === 'del_media') {
	$r = cpx_sb('DELETE', 'client_project_media?id=eq.' . urlencode(pa_post('media_id')) . '&project_id=eq.' . urlencode($projectId));
	pa_out(array('ok' => (int) $r['code'] < 300));
}
/* Reordenar los archivos: recibe TODOS los ids del proyecto en el orden deseado
 * (separados por comas) y numera sort_order 1..N. Se exige la lista completa para
 * que el orden resultante sea exactamente el que se ve en pantalla al soltar. */
if ($action === 'reorder_media') {
	$ids = array_values(array_filter(array_map('trim', explode(',', pa_post('order')))));
	if (empty($ids)) pa_out(array('ok' => false, 'error' => 'no_order'));
	$ok = true; $n = 1;
	foreach ($ids as $mid) {
		if (!preg_match('/^[0-9a-f-]{36}$/', $mid)) { $ok = false; continue; }
		// El filtro por project_id impide renumerar media de otro proyecto aunque
		// llegue un id ajeno en la lista.
		$r = cpx_sb('PATCH', 'client_project_media?id=eq.' . urlencode($mid) . '&project_id=eq.' . urlencode($projectId), array('sort_order' => $n));
		if ((int) $r['code'] >= 300) $ok = false;
		$n++;
	}
	pa_out(array('ok' => $ok));
}

/* Editar título/descripción de un archivo (la descripción se muestra solo ampliada). */
if ($action === 'edit_media') {
	$fields = array();
	foreach (array('title_es', 'title_en', 'description_es', 'description_en') as $k) { if (isset($_POST[$k])) $fields[$k] = pa_post($k); }
	if (empty($fields)) pa_out(array('ok' => false, 'error' => 'no_fields'));
	$r = cpx_sb('PATCH', 'client_project_media?id=eq.' . urlencode(pa_post('media_id')) . '&project_id=eq.' . urlencode($projectId), $fields);
	pa_out(array('ok' => (int) $r['code'] < 300));
}

/* Enlazar media desde Google Drive (sin ocupar Storage): guarda la URL embebible. */
if ($action === 'add_media_link') {
	$type = pa_post('type', 'image');
	if (!in_array($type, array('image', 'video', 'model'), true)) $type = 'image';
	$id = cpx_drive_file_id(pa_post('url'));
	if ($id === null) pa_out(array('ok' => false, 'error' => 'bad_drive_url'));
	$src = cpx_drive_src($id, $type);
	$title = pa_post('title', 'Google Drive');
	$r = cpx_sb('POST', 'client_project_media', array(
		'project_id' => $projectId, 'type' => $type, 'src' => $src,
		'title_es' => $title, 'title_en' => $title, 'sort_order' => (int) pa_post('sort_order', '999')
	));
	$row = (is_array($r['body']) && isset($r['body'][0])) ? $r['body'][0] : null;
	pa_out(array('ok' => (int) $r['code'] < 300, 'id' => $row ? $row['id'] : null, 'src' => $src, 'type' => $type));
}

/* Subida por arrastrar y soltar: fichero -> Storage -> fila de media. */
if ($action === 'upload') {
	// Si el cuerpo supera post_max_size, PHP vacía $_POST/$_FILES: detéctalo aparte.
	if (empty($_POST) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) pa_out(array('ok' => false, 'error' => 'too_big_post'));
	if (!isset($_FILES['file'])) pa_out(array('ok' => false, 'error' => 'no_file'));
	$uerr = $_FILES['file']['error'];
	if ($uerr !== UPLOAD_ERR_OK) {
		$map = array(UPLOAD_ERR_INI_SIZE => 'file_too_big', UPLOAD_ERR_FORM_SIZE => 'file_too_big',
			UPLOAD_ERR_PARTIAL => 'partial', UPLOAD_ERR_NO_FILE => 'no_file',
			UPLOAD_ERR_NO_TMP_DIR => 'no_tmp', UPLOAD_ERR_CANT_WRITE => 'cant_write');
		pa_out(array('ok' => false, 'error' => isset($map[$uerr]) ? $map[$uerr] : 'upload_err', 'code' => $uerr));
	}
	$f = $_FILES['file'];
	if ($f['size'] > 104857600) pa_out(array('ok' => false, 'error' => 'too_big'));
	$mime = function_exists('mime_content_type') ? (mime_content_type($f['tmp_name']) ?: $f['type']) : $f['type'];
	$kind = cpx_media_kind($mime, $f['name']);
	if ($kind === null) pa_out(array('ok' => false, 'error' => 'bad_mime', 'mime' => $mime));
	list($ext, $type) = $kind;
	if ($ext === 'glb') $mime = 'model/gltf-binary';
	$path = $projectId . '/' . bin2hex(random_bytes(8)) . '.' . $ext;
	$code = cpx_storage_upload($path, $f['tmp_name'], $mime);
	if ((int) $code >= 300) pa_out(array('ok' => false, 'error' => 'storage', 'code' => $code));
	$src = cpx_storage_public_url($path);
	$title = pa_post('title', pathinfo($f['name'], PATHINFO_FILENAME));
	$r = cpx_sb('POST', 'client_project_media', array(
		'project_id' => $projectId, 'type' => $type, 'src' => $src,
		'title_es' => $title, 'title_en' => $title, 'sort_order' => (int) pa_post('sort_order', '999')
	));
	$row = (is_array($r['body']) && isset($r['body'][0])) ? $r['body'][0] : null;
	pa_out(array('ok' => (int) $r['code'] < 300, 'id' => $row ? $row['id'] : null, 'src' => $src, 'type' => $type, 'title' => $title));
}

if ($action === 'reply') {
	$body = pa_post('body');
	if ($body === '') pa_out(array('ok' => false, 'error' => 'empty'));
	$mediaId = pa_post('media_id');
	$r = cpx_sb('POST', 'client_project_comments', array(
		'project_id' => $projectId, 'media_id' => ($mediaId !== '' ? $mediaId : null),
		'author' => 'internal', 'author_name' => 'Standarte', 'body' => $body
	));
	pa_out(array('ok' => (int) $r['code'] < 300));
}

pa_out(array('ok' => false, 'error' => 'unknown_action'));
