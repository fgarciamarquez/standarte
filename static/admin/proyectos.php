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
	// Evento (feria o congreso) con el que se relaciona el proyecto: se guarda SOLO el
	// slug, y solo si existe en el catálogo, para que un valor tecleado a mano no deje
	// una referencia rota. El nombre y la fecha se resuelven después desde fairsData.
	$fair = post('fair_slug');
	if ($fair !== '' && cpx_fair_exists($fair)) $row['fair_slug'] = $fair;
	// Cuenta de ingreso: llega el ID del desplegable y el IBAN/BIC se resuelven del
	// catálogo, nunca de lo que venga en el formulario.
	$acc = cpx_account(post('account_id'));
	if (!$acc) { $all = cpx_accounts(); $acc = isset($all[0]) ? $all[0] : null; }
	if ($acc) { $row['income_account'] = $acc['iban']; $row['bic_code'] = $acc['bic']; }
	$row['access_token'] = $token;
	$row['status'] = 'draft';
	cpx_sb('POST', 'client_projects', $row);
	header('Location: proyectos.php?msg=' . urlencode('Proyecto creado. Ábrelo desde la lista para completarlo (edición en su propia página).')); exit;
}

/* ---------- Duplicar proyecto ----------
 * Muchas propuestas se parecen entre sí: se duplica una y se cambian cuatro cosas.
 * La copia nace en borrador, con enlace propio y sin nada del cliente original
 * (visitas, aprobación, datos fiscales ni comentarios). Ver cpx_duplicate_project. */
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && post('action') === 'duplicate_project') {
	$res = cpx_duplicate_project(post('source_id'), array(
		'ref' => post('ref'), 'client_name' => post('client_name'), 'client_email' => post('client_email'),
		'title_es' => post('title_es'), 'title_en' => post('title_en')
	), post('copy_budget') === '1', post('copy_media') === '1');
	if (!empty($res['ok'])) {
		$copiado = array();
		if (!empty($res['budget'])) $copiado[] = $res['budget'] . ' conceptos de presupuesto';
		if (!empty($res['media'])) $copiado[] = $res['media'] . ' archivos';
		$m = 'Proyecto duplicado como «' . $res['ref'] . '»'
			. (empty($copiado) ? '' : ' (con ' . implode(' y ', $copiado) . ')')
			. '. Ábrelo desde la lista para ajustar la fecha del descuento y la validez de la propuesta, que no se copian.';
		header('Location: proyectos.php?msg=' . urlencode($m)); exit;
	}
	header('Location: proyectos.php?msg=' . urlencode('No se pudo duplicar el proyecto (' . (isset($res['error']) ? $res['error'] : 'error') . ').')); exit;
}

/* ---------- Cambiar un estado (aprobado / contrato / factura) ---------- */
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && post('action') === 'toggle_status') {
	$id = post('id');
	$field = post('field');
	$allowed = array('contract_done', 'invoice_done', 'invoice2_done');
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
	if (!empty($p[$field])) return '<span class="st st-on st-ro">Cursado</span>';

	/* Qué significa aquí «Caducado»: que el cliente ya no puede decidir en las
	 * condiciones que se le ofrecieron. Se calcula con LA MISMA regla que ve él en su
	 * página (ProjectPresentation.svelte), no con la fecha a secas:
	 *   - La propuesta caduca de golpe: pasada `proposal_valid_until` no puede aprobar.
	 *   - La oferta NO muere en su fecha: mengua 1.000 € por semana transcurrida y la
	 *     fecha que se le muestra avanza una semana con cada reducción. Solo se agota
	 *     cuando el importe llega a 0. Comparar con la fecha bruta marcaba como
	 *     caducados proyectos con oferta viva (pasó con MEERMEAT: 3.900 € con plazo del
	 *     20/08 sigue valiendo 900 € y su fecha visible es del 10/09).
	 */
	$hoy = time();
	$valid = isset($p['proposal_valid_until']) ? $p['proposal_valid_until'] : null;
	if ($valid && $hoy > strtotime($valid . ' 23:59:59')) {
		return '<span class="st st-exp st-ro" title="La propuesta caducó el ' . h(date('d/m/Y', strtotime($valid . ' 12:00:00'))) . ': el cliente ya no puede aprobarla">Caducado</span>';
	}
	$off = offer_state($p);
	if ($off && $off['left'] <= 0) {
		$t = 'La oferta de ' . h(eur($off['amount'])) . ' se agotó';
		$t .= $valid ? ' (la propuesta sigue válida hasta el ' . h(date('d/m/Y', strtotime($valid . ' 12:00:00'))) . ')' : ' y la propuesta no tiene fecha de validez';
		return '<span class="st st-exp st-ro" title="' . $t . '">Caducado</span>';
	}
	$t = 'Sin aprobar todavía';
	if ($off) $t = 'Oferta vigente de ' . h(eur($off['left'])) . ' hasta el ' . h(date('d/m/Y', $off['shown']));
	if ($valid) $t .= ' · propuesta válida hasta el ' . h(date('d/m/Y', strtotime($valid . ' 12:00:00')));
	return '<span class="st st-off st-ro" title="' . $t . '">Pendiente</span>';
}

/* Estado de la oferta por pronta decisión con la regla del sitio: importe que queda
 * hoy y fecha que se le muestra al cliente. null si el proyecto no tiene oferta. */
function offer_state($p) {
	$amount = (float) (isset($p['discount_amount']) ? $p['discount_amount'] : 0);
	$d = isset($p['discount_deadline']) ? $p['discount_deadline'] : null;
	if ($amount <= 0 || !$d) return null;
	$deadline = strtotime($d . ' 23:59:59');
	if ($deadline === false) return null;
	$now = time();
	if ($now <= $deadline) return array('amount' => $amount, 'left' => $amount, 'shown' => $deadline);
	$weeks = (int) ceil(($now - $deadline) / 604800);          // semanas transcurridas
	$left = max(0.0, $amount - 1000.0 * $weeks);               // 1.000 € menos por semana
	return array('amount' => $amount, 'left' => $left, 'shown' => $left > 0 ? $deadline + $weeks * 604800 : $deadline);
}

/* Importe en euros, sin decimales cuando es redondo (como en la ficha del cliente). */
function eur($n) {
	return number_format((float) $n, ((float) $n == round($n) ? 0 : 2), ',', '.') . ' €';
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

/* Última visita del cliente (la anota touch_client_visit cuando abre su enlace).
 * Se muestra en hora española; verde si fue en las últimas 24 h, «—» si nunca entró. */
function visit_badge($p) {
	if (empty($p['last_client_visit'])) return '<span class="visit-never" title="El cliente aún no ha abierto el proyecto">—</span>';
	try {
		$d = new DateTime($p['last_client_visit']);
		$d->setTimezone(new DateTimeZone('Europe/Madrid'));
	} catch (Exception $e) { return '<span class="visit-never">—</span>'; }
	$recent = (time() - $d->getTimestamp()) < 86400;
	return '<span class="visit' . ($recent ? ' visit-recent' : '') . '" title="Última visita del cliente">' . $d->format('d/m H:i') . '</span>';
}

$projects = pj_authed() ? cpx_rows('client_projects?select=id,ref,client_name,title_es,title_en,paid,approved,contract_done,invoice_done,invoice2_done,access_token,is_demo,created_at,last_client_visit,discount_amount,discount_deadline&order=created_at.desc') : array();
/* Duplicar: proyecto de origen preseleccionado (?dup=ID desde el botón de cada fila)
 * y recuento de conceptos/archivos de cada uno para las etiquetas del formulario. */
$dupId = isset($_GET['dup']) && preg_match('/^[0-9a-f-]{36}$/', $_GET['dup']) ? $_GET['dup'] : '';
$counts = pj_authed() ? cpx_child_counts() : array('budget' => array(), 'media' => array());
function cnt($counts, $kind, $id) { return isset($counts[$kind][$id]) ? (int) $counts[$kind][$id] : 0; }
?>
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proyectos · Admin Standarte</title>
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
	a { color: #ffc800; } h1,h2,h3 { font-weight: 700; }
	.wrap { max-width: 900px; margin: 0 auto; }
	/* El listado de proyectos tiene ocho columnas: con 900 px la ref y el cliente se
	   partían letra a letra. Esta pantalla es interna, así que se le da aire. */
	.wrap-wide { max-width: 1180px; }
	.card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
	/* Alta y duplicado van PLEGADOS: lo que se consulta a diario es la lista de
	   proyectos, y con los dos formularios abiertos quedaba a dos pantallas de scroll.
	   <details> nativo: sin JavaScript y accesible con teclado. El de duplicar se abre
	   solo cuando se llega desde el botón «Duplicar» de una fila (?dup=…). */
	details.fold { padding: 0; }
	details.fold > summary { list-style: none; cursor: pointer; padding: 16px 18px; display: flex; align-items: center; gap: 10px; user-select: none; }
	details.fold > summary::-webkit-details-marker { display: none; }
	details.fold > summary::before { content: '▸'; color: #ffc800; font-size: 13px; line-height: 1; }
	details.fold[open] > summary::before { content: '▾'; }
	details.fold > summary:hover .fold-t { color: #fff; }
	.fold-t { font-weight: 700; font-size: 1.17em; }
	details.fold > *:not(summary) { padding: 0 18px; }
	details.fold > *:last-child { padding-bottom: 18px; }
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
	.st-exp { color: #e57373; border-color: #5a2a2a; background: rgba(198,40,40,.12); }
	.st-ro { cursor: default; }
	.del { background: transparent; color: #e57373; border: 1px solid #5a2a2a; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 700; letter-spacing: .04em; cursor: pointer; }
	.del:hover { background: #c62828; color: #fff; border-color: #c62828; }
	/* Borrar como aspa: la columna de acciones no necesita la palabra, y así el
	   ancho que ganaba el texto se lo queda la ref y el cliente. El nombre del
	   proyecto va en title y aria-label, que es donde de verdad hace falta. */
	.del-x { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border-radius: 6px; }
	.del-x svg { display: block; }
	/* Selector predictivo de evento: mismo comportamiento que el buscador de la
	   portada (ranking por nombre y ciudad, lista desplazable, teclado). */
	.ev-field { position: relative; }
	.ev-list { position: absolute; z-index: 20; left: 0; right: 0; margin: -6px 0 0; padding: 0; list-style: none; max-height: 280px; overflow-y: auto; background: #12141a; border: 1px solid #3a3f48; border-radius: 6px; }
	.ev-list li { padding: 8px 10px; cursor: pointer; font-size: 14px; border-bottom: 1px solid #23262d; }
	.ev-list li:last-child { border-bottom: none; }
	.ev-list li.on, .ev-list li:hover { background: #23262d; }
	.ev-city { color: #8a8f98; }
	.ev-date { color: #ffc800; }
	.ev-clear { background: transparent; border: none; color: #e57373; cursor: pointer; font: inherit; font-size: 12px; padding: 0 0 0 8px; }
	.dup { background: transparent; color: #ffc800; border: 1px solid #7a6413; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 700; letter-spacing: .04em; cursor: pointer; text-decoration: none; display: inline-block; }
	.dup:hover { background: rgba(255,200,0,.14); border-color: #ffc800; }
	.pj-acts { display: flex; gap: 8px; align-items: center; justify-content: flex-end; }
	/* Las casillas no deben estirarse al 100 % como el resto de inputs. */
	input[type=checkbox] { width: auto; margin: 0 8px 0 0; vertical-align: middle; }
	.chk-l { display: block; text-transform: none; letter-spacing: 0; font-size: 13px; color: #c8ccd4; margin-bottom: 8px; cursor: pointer; }
	.demo-badge { display: inline-block; background: rgba(255,200,0,.14); color: #ffc800; border: 1px solid #7a6413; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 700; letter-spacing: .03em; }
	/* Listado de proyectos en capas (sin <table>): grid en escritorio, apilado en móvil.
	   UNA sola rejilla para cabecera y filas. Antes cada fila era su propia grid con el
	   mismo patrón de columnas, pero como los anchos son 'auto'/'fr' se resolvían con el
	   contenido de CADA fila: la cabecera caía en posiciones distintas a las de las
	   celdas. Con `display: contents` las celdas suben a la rejilla común y todo queda a
	   plomo; los separadores los dibuja cada celda, porque un elemento con
	   `display: contents` no pinta su propio borde. */
	.pj-list { display: grid; grid-template-columns: minmax(112px,1.1fr) minmax(150px,1.6fr) auto auto auto auto auto auto; column-gap: 10px; align-items: center; }
	.pj-head, .pj-card { display: contents; }
	.visit { font-size: 12px; color: #9aa; white-space: nowrap; }
	.visit-recent { color: #4caf50; font-weight: 700; }
	.visit-never { color: #555; }
	.pj-head > span { padding: 0 8px 8px; border-bottom: 1px solid #2c3038; font-size: 14px; }
	.pj-card > .pj-cell { padding: 10px 8px; border-bottom: 1px solid #2c3038; font-size: 14px; }
	.pj-cell { min-width: 0; }
	.pj-v { min-width: 0; overflow-wrap: anywhere; }
	.pj-k { display: none; }
	/* El nombre del cliente ES el enlace al proyecto: la columna «Abrir» gastaba un
	   ancho entero para repetir lo que ya se entiende pinchando el nombre. */
	.pj-openlink { color: #e6e6e6; text-decoration: none; border-bottom: 1px dotted #6a6f78; }
	.pj-openlink:hover { color: #ffc800; border-bottom-color: #ffc800; }
	.pj-openlink .demo-badge { border-bottom: none; }
	/* Copiar el enlace del proyecto para pegarlo en un correo: el enlace lleva el token,
	   así que copiarlo a mano desde la barra del navegador obligaba a abrirlo antes. */
	.pj-clientv { display: flex; align-items: center; gap: 8px; }
	.pj-copy { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; background: transparent; border: 1px solid #3a3f48; border-radius: 5px; color: #8a8f98; cursor: pointer; }
	.pj-copy:hover { color: #ffc800; border-color: #7a6413; }
	.pj-copy .pj-copy-ok { display: none; }
	.pj-copy.ok { color: #4caf50; border-color: #2e7d32; }
	.pj-copy.ok .pj-copy-i { display: none; }
	.pj-copy.ok .pj-copy-ok { display: block; }
	.pj-ref .pj-v { overflow-wrap: normal; word-break: normal; }
	.pj-acts { white-space: nowrap; }
	@media (max-width: 640px) {
		.pj-list { display: block; }
		.pj-head { display: none; }
		.pj-card { display: block; padding: 14px 6px; border-bottom: 1px solid #2c3038; }
		.pj-card > .pj-cell { border-bottom: none; padding: 4px 0; }
		.pj-cell { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
		.pj-k { display: inline; color: #9aa; text-transform: uppercase; font-size: 11px; letter-spacing: .06em; flex: 0 0 auto; }
		.pj-v { flex: 1 1 auto; min-width: 0; text-align: right; overflow-wrap: anywhere; word-break: break-word; }
		.pj-ref .pj-v { font-weight: 700; }
	}
</style></head>
<body><div class="wrap wrap-wide">
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

	<details class="card fold">
		<summary><span class="fold-t">Nuevo proyecto</span></summary>
		<form method="post" class="row">
			<input type="hidden" name="action" value="create_project">
			<input name="ref" placeholder="Ref (p. ej. IDh 2026/0062)" required>
			<input name="client_name" placeholder="Cliente" required>
			<input name="client_email" placeholder="Email del cliente" type="email">
			<input name="title_es" placeholder="Título ES">
			<input name="title_en" placeholder="Título EN">
			<input name="interlocutor_email" placeholder="Email interlocutor (opc.)">
			<div style="grid-column:1/3">
				<label for="account_id">Cuenta de ingreso</label>
				<select name="account_id" id="account_id">
					<?php foreach (cpx_accounts() as $a): ?>
					<option value="<?= h($a['id']) ?>"><?= h($a['bank']) ?> — <?= h($a['iban']) ?> · BIC <?= h($a['bic']) ?></option>
					<?php endforeach; ?>
				</select>
				<p class="hint">El titular es siempre Francisco Javier García Márquez. Se puede cambiar luego desde la propia página del proyecto.</p>
			</div>
			<div style="grid-column:1/3" class="ev-field">
				<label for="ev-input">Evento (feria o congreso)</label>
				<input id="ev-input" autocomplete="off" placeholder="Escribe el nombre del evento o su ciudad…">
				<input type="hidden" name="fair_slug" id="ev-slug">
				<ul id="ev-list" class="ev-list" hidden></ul>
				<p class="hint" id="ev-chosen" hidden></p>
			</div>
			<div style="grid-column:1/3"><button type="submit">Crear proyecto</button></div>
		</form>
	</details>

	<?php if (!empty($projects)): ?>
	<details class="card fold" id="dup"<?= $dupId ? ' open' : '' ?>>
		<summary><span class="fold-t">Duplicar un proyecto</span></summary>
		<p class="hint">Copia memoria, incluidos y excluidos, forma de pago, impuestos, cuenta e interlocutor, y —si lo marcas— el
			presupuesto y los archivos. <strong>No</strong> copia los comentarios, ni los datos fiscales del cliente original, ni la
			fecha del descuento ni la validez de la propuesta: esas dos fechas se ponen de nuevo en la copia para no enseñar al
			cliente nuevo una oferta ya vencida. La copia nace en borrador, con su propio enlace.</p>
		<form method="post" class="row">
			<input type="hidden" name="action" value="duplicate_project">
			<div style="grid-column:1/3">
				<label>Proyecto de origen</label>
				<select name="source_id" id="dup-src" required>
					<?php foreach ($projects as $p): ?>
					<option value="<?= h($p['id']) ?>" data-ref="<?= h($p['ref']) ?>"
						data-b="<?= cnt($counts, 'budget', $p['id']) ?>" data-m="<?= cnt($counts, 'media', $p['id']) ?>"
						<?= ($dupId === $p['id'] ? 'selected' : '') ?>><?= h($p['ref']) ?> — <?= h($p['client_name'] !== '' ? $p['client_name'] : 'sin cliente') ?></option>
					<?php endforeach; ?>
				</select>
			</div>
			<input name="ref" id="dup-ref" placeholder="Ref del nuevo proyecto" required>
			<input name="client_name" placeholder="Cliente" required>
			<input name="client_email" placeholder="Email del cliente" type="email">
			<input name="title_es" placeholder="Título ES (solo si cambia)">
			<input name="title_en" placeholder="Título EN (solo si cambia)">
			<div style="grid-column:1/3">
				<label class="chk-l"><input type="checkbox" name="copy_budget" value="1" checked> Copiar el presupuesto (<span id="dup-b">0</span> conceptos)</label>
				<label class="chk-l"><input type="checkbox" name="copy_media" value="1"> Copiar los archivos (<span id="dup-m">0</span>): la copia apunta a los mismos ficheros, no se suben de nuevo</label>
			</div>
			<div style="grid-column:1/3"><button type="submit">Duplicar proyecto</button></div>
		</form>
	</details>
	<?php endif; ?>

	<div class="card">
		<h3>Proyectos</h3>
		<p class="hint">Para completar datos, presupuesto, archivos o responder comentarios, pincha el nombre del
			cliente: al estar tu sesión iniciada, la propia página del proyecto se vuelve editable.</p>
		<p class="hint">Aprobado lo marca el cliente al aprobar; contrato y factura los marcas tú al cursarlos (clic para alternar).</p>
		<div class="pj-list">
			<div class="pj-head">
				<span>Ref</span><span>Cliente</span><span>Aprobado</span><span>Contrato</span><span>Factura 1</span><span>Factura 2</span><span>Visto</span><span></span>
			</div>
			<?php foreach ($projects as $p): ?>
			<div class="pj-card">
				<div class="pj-cell pj-ref"><span class="pj-k">Ref</span><span class="pj-v"><?= h($p['ref']) ?></span></div>
				<div class="pj-cell pj-client"><span class="pj-k">Cliente</span><span class="pj-v pj-clientv"><a class="pj-openlink" href="https://standarte.es/proyecto?t=<?= h($p['access_token']) ?>" target="_blank" rel="noopener" title="Abrir el proyecto «<?= h($p['ref']) ?>» (editable con tu sesión iniciada)"><?php if (!empty($p['is_demo'])): ?><span class="demo-badge">Piloto público</span><?php else: ?><?= h($p['client_name'] !== '' ? $p['client_name'] : 'sin cliente') ?><?php endif; ?></a><button type="button" class="pj-copy" data-url="https://standarte.es/proyecto?t=<?= h($p['access_token']) ?>" title="Copiar el enlace del proyecto «<?= h($p['ref']) ?>»" aria-label="Copiar el enlace del proyecto <?= h($p['ref']) ?>"><svg class="pj-copy-i" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false"><rect x="5.5" y="5.5" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M10.5 3.5 H3.9 A1.4 1.4 0 0 0 2.5 4.9 V12" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg><svg class="pj-copy-ok" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button></span></div>
				<div class="pj-cell"><span class="pj-k">Aprobado</span><span class="pj-v"><?= status_badge($p, 'approved') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Contrato</span><span class="pj-v"><?= status_toggle($p, 'contract_done') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Factura 1</span><span class="pj-v"><?= status_toggle($p, 'invoice_done') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Factura 2</span><span class="pj-v"><?= status_toggle($p, 'invoice2_done') ?></span></div>
				<div class="pj-cell"><span class="pj-k">Visto</span><span class="pj-v"><?= visit_badge($p) ?></span></div>
				<div class="pj-cell pj-del"><span class="pj-k"></span><span class="pj-v pj-acts">
					<a class="dup" href="proyectos.php?dup=<?= h($p['id']) ?>#dup" title="Duplicar este proyecto">Duplicar</a>
					<form method="post" class="st-form" onsubmit="return confirm('¿Borrar el proyecto «<?= h($p['ref']) ?>» y TODOS sus datos (imágenes, presupuesto y comentarios)?\n\nEsta acción no se puede deshacer.');">
					<input type="hidden" name="action" value="delete_project">
					<input type="hidden" name="id" value="<?= h($p['id']) ?>">
					<button type="submit" class="del del-x" title="Borrar el proyecto «<?= h($p['ref']) ?>»" aria-label="Borrar el proyecto <?= h($p['ref']) ?>"><svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false"><path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg></button>
				</form></span></div>
			</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif; ?>
<?php if (pj_authed()): ?>
<script>
/* Copiar al portapapeles el enlace del proyecto. Con respaldo por textarea porque el
   API de portapapeles solo existe en contexto seguro: en producción (https) va por
   navigator.clipboard, y en el espejo local de MAMP (http) por el camino viejo. */
document.addEventListener('click', function (e) {
  var btn = e.target.closest ? e.target.closest('.pj-copy') : null;
  if (!btn) return;
  var url = btn.getAttribute('data-url') || '';
  var done = function () {
    btn.classList.add('ok');
    setTimeout(function () { btn.classList.remove('ok'); }, 1600);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(done).catch(function () { legacy(); });
  } else { legacy(); }
  function legacy() {
    var ta = document.createElement('textarea');
    ta.value = url; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (err) { window.prompt('Copia el enlace:', url); }
    document.body.removeChild(ta);
  }
});
</script>
<?php endif; ?>
<?php if (pj_authed()): ?>
<script>
/* Selector predictivo de evento (alta de proyecto). Copia el comportamiento del
   buscador de la portada: ranking que antepone lo que EMPIEZA por lo tecleado
   (nombre antes que ciudad), lista desplazable de hasta 40 y navegación con teclado.
   El catálogo se sirve como JSON generado en el build (data/fairs.json). */
(function () {
  var input = document.getElementById('ev-input'), hidden = document.getElementById('ev-slug'),
      list = document.getElementById('ev-list'), chosen = document.getElementById('ev-chosen');
  if (!input) return;
  var fairs = [], matches = [], idx = -1;
  var norm = function (t) { return (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); };

  fetch('data/fairs.json').then(function (r) { return r.json(); }).then(function (d) {
    fairs = (d || []).map(function (f) { return { s: f.slug, n: f.name, c: f.city || '', d: f.dates || '', k: norm(f.name), ck: norm(f.city) }; });
  }).catch(function () { input.placeholder = 'No se pudo cargar el catálogo de eventos'; });

  function rank(o, q) {
    if (o.k.indexOf(q) === 0) return 0;
    if (o.ck && o.ck.indexOf(q) === 0) return 1;
    if (o.k.indexOf(q) > -1) return 2;
    if (o.ck && o.ck.indexOf(q) > -1) return 3;
    return 9;
  }
  function render() {
    list.innerHTML = '';
    matches.forEach(function (o, i) {
      var li = document.createElement('li');
      li.className = (i === idx ? 'on' : '');
      li.innerHTML = '<strong></strong> <span class="ev-city"></span> <span class="ev-date"></span>';
      li.querySelector('strong').textContent = o.n;
      li.querySelector('.ev-city').textContent = o.c ? '· ' + o.c : '';
      li.querySelector('.ev-date').textContent = o.d ? '· ' + o.d : '';
      li.addEventListener('mousedown', function (e) { e.preventDefault(); pick(o); });
      list.appendChild(li);
    });
    list.hidden = matches.length === 0;
  }
  function pick(o) {
    hidden.value = o.s; input.value = o.n;
    chosen.textContent = 'Evento elegido: ' + o.n + (o.c ? ' (' + o.c + ')' : '') + (o.d ? ' · ' + o.d : '');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ev-clear'; btn.textContent = 'quitar';
    btn.addEventListener('click', function () { hidden.value = ''; input.value = ''; chosen.hidden = true; });
    chosen.appendChild(btn);
    chosen.hidden = false;
    matches = []; idx = -1; list.hidden = true;
  }
  input.addEventListener('input', function () {
    hidden.value = '';                      // lo tecleado deja de valer hasta elegir de la lista
    var q = norm(input.value);
    matches = q ? fairs.map(function (o) { return { o: o, r: rank(o, q) }; })
      .filter(function (x) { return x.r < 9; })
      .sort(function (a, b) { return a.r - b.r || a.o.n.localeCompare(b.o.n, 'es'); })
      .slice(0, 40).map(function (x) { return x.o; }) : [];
    idx = -1; render();
  });
  input.addEventListener('keydown', function (e) {
    if (!list.hidden) {
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, matches.length - 1); render(); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); render(); return; }
      if (e.key === 'Escape') { list.hidden = true; idx = -1; return; }
      if (e.key === 'Enter') { e.preventDefault(); pick(matches[idx >= 0 ? idx : 0]); return; }
    }
    if (e.key === 'Enter' && !hidden.value) e.preventDefault();   // no enviar el alta por error
  });
  input.addEventListener('blur', function () { setTimeout(function () { list.hidden = true; }, 120); });
})();
</script>
<?php endif; ?>
<?php if (pj_authed() && !empty($projects)): ?>
<script>
/* Al elegir origen: propone «REF COPIA» (si no has escrito ya una ref propia) y
   actualiza los recuentos de las casillas. */
(function () {
	var sel = document.getElementById('dup-src'), ref = document.getElementById('dup-ref');
	if (!sel || !ref) return;
	var touched = false;
	ref.addEventListener('input', function () { touched = true; });
	function sync(prefill) {
		var o = sel.options[sel.selectedIndex];
		if (!o) return;
		document.getElementById('dup-b').textContent = o.getAttribute('data-b') || '0';
		document.getElementById('dup-m').textContent = o.getAttribute('data-m') || '0';
		if (prefill && !touched) ref.value = (o.getAttribute('data-ref') || '') + ' COPIA';
	}
	sel.addEventListener('change', function () { sync(true); });
	sync(true);
})();
</script>
<?php endif; ?>
</div></body></html>
