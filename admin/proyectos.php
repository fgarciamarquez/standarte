<?php
/*
 * Panel interno ligero de la Zona Privada de Proyectos (Standarte).
 * Solo login + listado + creación. La EDICIÓN de un proyecto ya existente
 * sucede en su propia página pública (/proyecto?t=...): al iniciar sesión ahí
 * (misma contraseña/sesión), la página se vuelve editable in situ.
 */
session_start();
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
$config = require __DIR__ . '/email_campaing/config.php';

function pj_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }
function post($k, $d = '') { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : $d; }

/* ---------- Login / logout ---------- */
if (isset($_POST['login_password'])) {
	if (isset($config['login_password_hash']) && password_verify($_POST['login_password'], $config['login_password_hash'])) {
		$_SESSION['standarte_email_campaing_auth'] = true;
	}
	header('Location: proyectos.php'); exit;
}
if (isset($_GET['logout'])) { unset($_SESSION['standarte_email_campaing_auth']); header('Location: proyectos.php'); exit; }

/* ---------- Crear proyecto ---------- */
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && post('action') === 'create_project') {
	$token = bin2hex(random_bytes(16));
	// Plantilla inicial (textos que se repiten) + lo que se rellene en el formulario.
	$row = cpx_default_template();
	$row['ref'] = post('ref');
	$row['client_name'] = post('client_name');
	$row['client_email'] = post('client_email');
	$row['title_es'] = post('title_es');
	$row['title_en'] = post('title_en');
	if (post('interlocutor_email') !== '') $row['interlocutor_email'] = post('interlocutor_email');
	$row['access_token'] = $token;
	$row['status'] = 'draft';
	cpx_sb('POST', 'client_projects', $row);
	header('Location: proyectos.php?msg=' . urlencode('Proyecto creado. Ábrelo desde la lista para completarlo (edición en su propia página).')); exit;
}

/* ---------- Cambiar un estado (aprobado / contrato / factura) ---------- */
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && post('action') === 'toggle_status') {
	$id = post('id');
	$field = post('field');
	$allowed = array('contract_done', 'invoice_done');
	if (in_array($field, $allowed, true) && preg_match('/^[0-9a-f-]{36}$/', $id)) {
		cpx_sb('PATCH', 'client_projects?id=eq.' . urlencode($id), array($field => (post('value') === '1')));
	}
	header('Location: proyectos.php'); exit;
}

/* ---------- Borrar proyecto (cascada: media, presupuesto y comentarios) ---------- */
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && post('action') === 'delete_project') {
	$id = post('id');
	if (preg_match('/^[0-9a-f-]{36}$/', $id)) {
		cpx_storage_delete_folder($id);                               // ficheros subidos (best-effort)
		cpx_sb('DELETE', 'client_projects?id=eq.' . urlencode($id));  // la fila arrastra las tablas hijas (ON DELETE CASCADE)
		header('Location: proyectos.php?msg=' . urlencode('Proyecto borrado.')); exit;
	}
	header('Location: proyectos.php'); exit;
}

/* Insignia de solo lectura (para "Aprobado", que marca el cliente). */
function status_badge($p, $field) {
	$on = !empty($p[$field]);
	return '<span class="st ' . ($on ? 'st-on' : 'st-off') . ' st-ro">' . ($on ? 'Cursado' : 'Pendiente') . '</span>';
}

/* Pinta un estado como botón que alterna Pendiente(gris) ↔ Cursado(verde). */
function status_toggle($p, $field) {
	$on = !empty($p[$field]);
	$next = $on ? '0' : '1';
	$cls = $on ? 'st st-on' : 'st st-off';
	$txt = $on ? 'Cursado' : 'Pendiente';
	return '<form method="post" class="st-form">'
		. '<input type="hidden" name="action" value="toggle_status">'
		. '<input type="hidden" name="id" value="' . h($p['id']) . '">'
		. '<input type="hidden" name="field" value="' . h($field) . '">'
		. '<input type="hidden" name="value" value="' . $next . '">'
		. '<button type="submit" class="' . $cls . '" title="Cambiar estado">' . $txt . '</button>'
		. '</form>';
}

$projects = pj_authed() ? cpx_rows('client_projects?select=id,ref,client_name,paid,approved,contract_done,invoice_done,access_token,is_demo,created_at&order=created_at.desc') : array();
?>
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proyectos · Admin Standarte</title>
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
	a { color: #ffc800; } h1,h2,h3 { font-weight: 700; }
	.wrap { max-width: 900px; margin: 0 auto; }
	.card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
	input, select { width: 100%; box-sizing: border-box; background: #12141a; border: 1px solid #333; color: #eee; padding: 8px 10px; font-family: inherit; font-size: 14px; border-radius: 5px; margin-bottom: 8px; }
	label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #9aa; }
	button { background: #ffc800; color: #111; border: none; padding: 9px 18px; font-family: inherit; font-weight: 700; border-radius: 5px; cursor: pointer; }
	table { width: 100%; border-collapse: collapse; }
	td, th { padding: 8px; border-bottom: 1px solid #2c3038; text-align: left; font-size: 14px; }
	.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.msg { background: #14331f; border: 1px solid #2e7d32; color: #a5d6a7; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
	.link { font-size: 12px; word-break: break-all; color: #8fd; }
	.paid { color: #4caf50; } .draft { color: #888; }
	.hint { font-size: 12px; color: #888; margin: -6px 0 16px; }
	.st-form { margin: 0; }
	.st { border: 1px solid; border-radius: 20px; padding: 4px 12px; font-family: inherit; font-size: 12px; font-weight: 700; letter-spacing: .04em; cursor: pointer; background: transparent; }
	.st-off { color: #8a8f98; border-color: #3a3f48; }
	.st-off:hover { border-color: #6a6f78; color: #c0c4cc; }
	.st-on { color: #4caf50; border-color: #2e7d32; background: rgba(46,125,50,.12); }
	.st-on:hover { background: rgba(46,125,50,.22); }
	.st-ro { cursor: default; }
	.del { background: transparent; color: #e57373; border: 1px solid #5a2a2a; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 700; letter-spacing: .04em; cursor: pointer; }
	.del:hover { background: #c62828; color: #fff; border-color: #c62828; }
	.demo-badge { display: inline-block; background: rgba(255,200,0,.14); color: #ffc800; border: 1px solid #7a6413; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 700; letter-spacing: .03em; }
	/* Listado de proyectos en capas (sin <table>): grid en escritorio, apilado en móvil. */
	.pj-list { display: flex; flex-direction: column; }
	.pj-head, .pj-card { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1.4fr) auto auto auto minmax(0,1fr) auto; gap: 10px; align-items: center; }
	.pj-head { padding: 0 8px 8px; border-bottom: 1px solid #2c3038; font-size: 14px; }
	.pj-card { padding: 10px 8px; border-bottom: 1px solid #2c3038; font-size: 14px; }
	.pj-cell { min-width: 0; }
	.pj-v { min-width: 0; overflow-wrap: anywhere; }
	.pj-k { display: none; }
	.pj-open .link { word-break: normal; }
	@media (max-width: 640px) {
		.pj-head { display: none; }
		.pj-card { grid-template-columns: 1fr; gap: 8px; padding: 14px 6px; }
		.pj-cell { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
		.pj-k { display: inline; color: #9aa; text-transform: uppercase; font-size: 11px; letter-spacing: .06em; flex: 0 0 auto; }
		.pj-v { text-align: right; }
		.pj-ref .pj-v { font-weight: 700; }
	}
</style></head>
<body><div class="wrap">
<?php if (!pj_authed()): ?>
	<h1>Proyectos · Admin</h1>
	<form method="post" class="card" style="max-width:360px">
		<label>Contraseña</label>
		<input type="password" name="login_password" required autofocus>
		<button type="submit">Entrar</button>
	</form>
<?php else: ?>
	<div style="display:flex;justify-content:space-between;align-items:center">
		<h1>Proyectos de cliente</h1>
		<a href="proyectos.php?logout=1">Salir</a>
	</div>
	<?php if ($msg): ?><div class="msg"><?= h($msg) ?></div><?php endif; ?>
	<?php if (!cpx_has_service_key()): ?>
		<div class="msg" style="background:#3a2a12;border-color:#b8860b;color:#ffd54f">
			⚠ Falta <code>SUPABASE_SERVICE_KEY</code> en <code>supabase-config.php</code>. Sin ella no se pueden
			crear/listar proyectos. Cópiala del panel de Supabase (Settings → API Keys → Secret keys) y añade:
			<code>define('SUPABASE_SERVICE_KEY', '…');</code>
		</div>
	<?php endif; ?>

	<div class="card">
		<h3>Nuevo proyecto</h3>
		<form method="post" class="row">
			<input type="hidden" name="action" value="create_project">
			<input name="ref" placeholder="Ref (p. ej. IDh 2026/0062)" required>
			<input name="client_name" placeholder="Cliente" required>
			<input name="client_email" placeholder="Email del cliente" type="email">
			<input name="title_es" placeholder="Título ES">
			<input name="title_en" placeholder="Título EN">
			<input name="interlocutor_email" placeholder="Email interlocutor (opc.)">
			<div style="grid-column:1/3"><button type="submit">Crear proyecto</button></div>
		</form>
	</div>

	<div class="card">
		<h3>Proyectos</h3>
		<p class="hint">Para completar datos, presupuesto, archivos o responder comentarios, abre el enlace del
			proyecto: al estar tu sesión iniciada, la propia página se vuelve editable.</p>
		<p class="hint">Aprobado lo marca el cliente al aprobar; contrato y factura los marcas tú al cursarlos (clic para alternar).</p>
		<div class="pj-list">
			<div class="pj-head">
				<span>Ref</span><span>Cliente</span><span>Aprobado</span><span>Contrato</span><span>Factura</span><span>Abrir</span><span></span>
			</div>
			<?php foreach ($projects as $p): ?>
			<div class="pj-card">
				<div class="pj-cell pj-ref"><span class="pj-k">Ref</span><span class="pj-v"><?= h($p['ref']) ?></span></div>
				<div class="pj-cell pj-client"><span class="pj-k">Cliente</span><span class="pj-v"><?php if (!empty($p['is_demo'])): ?><span class="demo-badge">Proyecto piloto público</span><?php else: ?><?= h($p['client_name']) ?><?php endif; ?></span></div>
				<div class="pj-cell"><span class="pj-k">Aprobado</span><span class="pj-v"><?= status_badge($p, 'approved') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Contrato</span><span class="pj-v"><?= status_toggle($p, 'contract_done') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Factura</span><span class="pj-v"><?= status_toggle($p, 'invoice_done') ?></span></div>
				<div class="pj-cell pj-open"><span class="pj-k">Abrir</span><span class="pj-v"><a class="link" href="https://standarte.es/proyecto?t=<?= h($p['access_token']) ?>" target="_blank" rel="noopener">Abrir y editar →</a></span></div>
				<div class="pj-cell pj-del"><span class="pj-k"></span><span class="pj-v"><form method="post" class="st-form" onsubmit="return confirm('¿Borrar el proyecto «<?= h($p['ref']) ?>» y TODOS sus datos (imágenes, presupuesto y comentarios)?\n\nEsta acción no se puede deshacer.');">
					<input type="hidden" name="action" value="delete_project">
					<input type="hidden" name="id" value="<?= h($p['id']) ?>">
					<button type="submit" class="del" title="Borrar proyecto">Borrar</button>
				</form></span></div>
			</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif; ?>
</div></body></html>
