<?php
/*
 * Descarga de la documentación de un proyecto (contrato, facturas).
 *
 * El contrato y las facturas llevan datos fiscales, así que NO se publican en el
 * bucket público como las imágenes de la propuesta: aquí se comprueba que el
 * documento pertenece al proyecto del token —el mismo secreto que da acceso a toda
 * la página— y se redirige a una URL firmada que caduca en 60 segundos. Sin token
 * válido no hay descarga, y la URL firmada no sirve para volver más tarde.
 */
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';

$token = isset($_GET['t']) && is_string($_GET['t']) ? trim($_GET['t']) : '';
$id    = isset($_GET['id']) && is_string($_GET['id']) ? trim($_GET['id']) : '';
if (!preg_match('/^[a-f0-9]{20,64}$/', $token) || !preg_match('/^[0-9a-f-]{36}$/', $id)) {
	http_response_code(400); header('Content-Type: text/plain; charset=utf-8'); die("solicitud incorrecta\n");
}
$projectId = cpx_project_id_by_token($token);
if (!$projectId) { http_response_code(404); header('Content-Type: text/plain; charset=utf-8'); die("no encontrado\n"); }

$rows = cpx_rows('client_project_docs?id=eq.' . urlencode($id) . '&project_id=eq.' . urlencode($projectId) . '&select=path&limit=1');
if (empty($rows[0]['path'])) { http_response_code(404); header('Content-Type: text/plain; charset=utf-8'); die("no encontrado\n"); }

$url = cpx_storage_signed_url($rows[0]['path'], 60);
if (!$url) { http_response_code(502); header('Content-Type: text/plain; charset=utf-8'); die("no se pudo preparar la descarga\n"); }

header('Cache-Control: no-store');
header('Location: ' . $url, true, 302);
