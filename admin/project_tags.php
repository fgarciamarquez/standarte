<?php
/*
 * Etiquetado de los proyectos 3D del portfolio (Standarte).
 * Mismo sistema de etiquetas que las ferias (familias + colores + slugs de fairTags.js).
 * Guarda en Supabase (tabla project_tags: id text PK, tags text[]). En el build,
 * scripts/fetch_project_tags.mjs hornea esas etiquetas en src/lib/projectTags.js y de
 * ahí salen a las páginas prerenderizadas (chips en el detalle del proyecto y proyectos
 * listados en los hubs /actividad/<tag>).
 *
 * Datos de apoyo (generados en el build, gitignored):
 *   data/projects_index.json  — lista de proyectos (id, nombre, ciudad, título, imagen)
 *   data/tags.json            — catálogo de etiquetas agrupadas por familia
 * Login/sesión: el mismo del resto del panel (proyectos.php / email_campaing/config.php).
 */
session_start();
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/client_projects_lib.php';
$config = require __DIR__ . '/email_campaing/config.php';

function pt_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

/* ---------- Login / logout ---------- */
if (isset($_POST['login_password'])) {
	if (isset($config['login_password_hash']) && password_verify($_POST['login_password'], $config['login_password_hash'])) {
		$_SESSION['standarte_email_campaing_auth'] = true;
	}
	header('Location: project_tags.php'); exit;
}
if (isset($_GET['logout'])) { unset($_SESSION['standarte_email_campaing_auth']); header('Location: project_tags.php'); exit; }

/* ---------- Carga del catálogo generado ---------- */
function pt_load_json($file) {
	$path = __DIR__ . '/data/' . $file;
	if (!is_file($path)) return null;
	$data = json_decode(file_get_contents($path), true);
	return is_array($data) ? $data : null;
}
$projectsIndex = pt_load_json('projects_index.json');
$tagsCatalog = pt_load_json('tags.json');

/* Upsert de las etiquetas de un proyecto en Supabase (merge por id). */
function pt_upsert($id, $tags) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/project_tags?on_conflict=id');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_TIMEOUT, 12);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'apikey: ' . cpx_key(),
		'Authorization: Bearer ' . cpx_key(),
		'Content-Type: application/json',
		'Prefer: resolution=merge-duplicates,return=minimal'
	));
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(array(
		'id' => $id, 'tags' => array_values($tags), 'updated_at' => gmdate('c')
	))));
	curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	return $code;
}

/* ---------- Guardar etiquetas de un proyecto ---------- */
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
if (pt_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_tags') {
	$pid = isset($_POST['project_id']) ? (string) $_POST['project_id'] : '';
	// Validación: el id debe existir en el índice de proyectos.
	$validIds = array();
	foreach (($projectsIndex ?: array()) as $p) { if (isset($p['id'])) $validIds[$p['id']] = true; }
	// Validación: solo slugs del catálogo.
	$validSlugs = array();
	foreach (($tagsCatalog['families'] ?? array()) as $fam) {
		foreach (($fam['tags'] ?? array()) as $tg) { if (isset($tg['slug'])) $validSlugs[$tg['slug']] = true; }
	}
	$tags = array();
	if (isset($_POST['tags']) && is_array($_POST['tags'])) {
		foreach ($_POST['tags'] as $slug) { if (isset($validSlugs[$slug])) $tags[] = $slug; }
	}
	$tags = array_values(array_unique($tags));
	if (isset($validIds[$pid])) {
		$code = pt_upsert($pid, $tags);
		$ok = ($code >= 200 && $code < 300);
		$anchor = '#p-' . preg_replace('/[^a-z0-9_]/', '', $pid);
		header('Location: project_tags.php?msg=' . urlencode($ok
			? 'Etiquetas guardadas (' . count($tags) . ').'
			: 'Error al guardar (HTTP ' . $code . ').') . $anchor);
		exit;
	}
	header('Location: project_tags.php'); exit;
}

/* ---------- Etiquetas actuales por proyecto (desde Supabase) ---------- */
$current = array();
if (pt_authed()) {
	foreach (cpx_rows('project_tags?select=id,tags') as $row) {
		if (isset($row['id']) && isset($row['tags']) && is_array($row['tags'])) $current[$row['id']] = $row['tags'];
	}
}
?>
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Etiquetas de proyectos 3D · Admin Standarte</title>
<style>
	body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
	a { color: #ffc800; } h1,h2,h3 { font-weight: 700; }
	.wrap { max-width: 980px; margin: 0 auto; }
	.card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
	input[type=password], input[type=search] { width: 100%; box-sizing: border-box; background: #12141a; border: 1px solid #333; color: #eee; padding: 8px 10px; font-family: inherit; font-size: 14px; border-radius: 5px; margin-bottom: 8px; }
	label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #9aa; }
	button { background: #ffc800; color: #111; border: none; padding: 9px 18px; font-family: inherit; font-weight: 700; border-radius: 5px; cursor: pointer; }
	.msg { background: #14331f; border: 1px solid #2e7d32; color: #a5d6a7; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
	.hint { font-size: 12px; color: #888; margin: 6px 0 16px; }
	.topbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
	/* Listado de proyectos como acordeón. */
	.pt-item { border: 1px solid #2c3038; border-radius: 8px; margin-bottom: 10px; background: #1b1e24; overflow: hidden; }
	.pt-sum { display: flex; align-items: center; gap: 12px; padding: 10px 14px; cursor: pointer; list-style: none; }
	.pt-sum::-webkit-details-marker { display: none; }
	.pt-thumb { width: 46px; height: 46px; object-fit: cover; border-radius: 5px; background: #0d0f13; flex: 0 0 auto; }
	.pt-name { font-weight: 700; }
	.pt-loc { color: #9aa; font-size: 13px; }
	.pt-meta { min-width: 0; flex: 1 1 auto; }
	.pt-title { color: #b7bcc4; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.pt-badge { flex: 0 0 auto; background: rgba(255,200,0,.14); color: #ffc800; border: 1px solid #7a6413; border-radius: 20px; padding: 2px 10px; font-size: 12px; font-weight: 700; }
	.pt-badge.zero { background: transparent; color: #6a6f78; border-color: #3a3f48; }
	.pt-body { padding: 4px 14px 16px; border-top: 1px solid #2c3038; }
	.fam { margin: 14px 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; display: inline-flex; align-items: center; gap: 7px; color: #cfd3d9; }
	.dot { width: 10px; height: 10px; border-radius: 50%; flex: 0 0 auto; }
	.chips { display: flex; flex-wrap: wrap; gap: 8px; }
	.chip { display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; border: 1px solid #3a3f48; cursor: pointer; user-select: none; font-size: 13px; color: #d7dbe0; background: #14161b; }
	.chip:hover { border-color: #6a6f78; }
	.chip input { position: absolute; opacity: 0; pointer-events: none; }
	.chip .cdot { width: 11px; height: 11px; border-radius: 50%; flex: 0 0 auto; opacity: .5; }
	.chip.on { color: #fff; background: rgba(255,255,255,.06); }
	.chip.on .cdot { opacity: 1; box-shadow: 0 0 0 2px rgba(255,255,255,.15); }
	.pt-actions { margin-top: 16px; display: flex; align-items: center; gap: 12px; }
	.saved-note { color: #888; font-size: 12px; }
	.warn { background: #3a2a12; border: 1px solid #b8860b; color: #ffd54f; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
</style></head>
<body><div class="wrap">
<?php if (!pt_authed()): ?>
	<h1>Etiquetas de proyectos · Admin</h1>
	<form method="post" class="card" style="max-width:360px">
		<label>Contraseña</label>
		<input type="password" name="login_password" required autofocus>
		<button type="submit">Entrar</button>
	</form>
<?php else: ?>
	<div class="topbar">
		<h1>Etiquetas de proyectos 3D</h1>
		<div><a href="proyectos.php">Proyectos de cliente</a> · <a href="project_tags.php?logout=1">Salir</a></div>
	</div>
	<?php if ($msg): ?><div class="msg"><?= h($msg) ?></div><?php endif; ?>
	<?php if (!cpx_has_service_key()): ?>
		<div class="warn">⚠ Falta <code>SUPABASE_SERVICE_KEY</code> en <code>supabase-config.php</code>: no se podrán guardar etiquetas.</div>
	<?php endif; ?>
	<?php if ($projectsIndex === null || $tagsCatalog === null): ?>
		<div class="warn">⚠ Faltan los datos generados (<code>data/projects_index.json</code> / <code>data/tags.json</code>).
			Se crean en el build (<code>npm run build</code>) y se despliegan con el sitio.</div>
	<?php else: ?>
		<p class="hint">El mismo sistema de etiquetas de las ferias. Marca las actividades de cada proyecto y pulsa
			<b>Guardar</b>. Tras el próximo despliegue, las etiquetas aparecerán como chips en la página del proyecto y
			el proyecto se listará en los hubs <code>/actividad/&lt;etiqueta&gt;</code>.</p>
		<input type="search" id="filter" placeholder="Filtrar proyectos por nombre, ciudad o título…" oninput="ptFilter(this.value)">
		<p class="hint"><span id="count"><?= count($projectsIndex) ?></span> proyectos ·
			<?= count($current) ?> etiquetados.</p>

		<?php foreach ($projectsIndex as $p):
			$pid = $p['id'];
			$sel = isset($current[$pid]) ? $current[$pid] : array();
			$selSet = array_fill_keys($sel, true);
			$anchor = 'p-' . preg_replace('/[^a-z0-9_]/', '', $pid);
			$haystack = strtolower(($p['name'] ?? '') . ' ' . ($p['location'] ?? '') . ' ' . ($p['title'] ?? '') . ' ' . $pid);
		?>
		<details class="pt-item" id="<?= h($anchor) ?>" data-search="<?= h($haystack) ?>">
			<summary class="pt-sum">
				<?php if (!empty($p['image'])): ?><img class="pt-thumb" src="<?= h($p['image']) ?>" alt="" loading="lazy">
				<?php else: ?><span class="pt-thumb"></span><?php endif; ?>
				<span class="pt-meta">
					<span class="pt-name"><?= h($p['name']) ?></span> <span class="pt-loc"><?= h($p['location']) ?></span>
					<span class="pt-title"><?= h($p['title']) ?></span>
				</span>
				<span class="pt-badge <?= count($sel) ? '' : 'zero' ?>"><?= count($sel) ?></span>
			</summary>
			<div class="pt-body">
				<form method="post">
					<input type="hidden" name="action" value="save_tags">
					<input type="hidden" name="project_id" value="<?= h($pid) ?>">
					<?php foreach ($tagsCatalog['families'] as $fam): ?>
						<div class="fam"><span class="dot" style="background:<?= h($fam['color']) ?>"></span><?= h($fam['label']) ?></div>
						<div class="chips">
							<?php foreach ($fam['tags'] as $tg):
								$on = isset($selSet[$tg['slug']]); ?>
								<label class="chip <?= $on ? 'on' : '' ?>">
									<input type="checkbox" name="tags[]" value="<?= h($tg['slug']) ?>" <?= $on ? 'checked' : '' ?>
										onchange="this.closest('.chip').classList.toggle('on', this.checked)">
									<span class="cdot" style="background:<?= h($tg['color']) ?>"></span><?= h($tg['label']) ?>
								</label>
							<?php endforeach; ?>
						</div>
					<?php endforeach; ?>
					<div class="pt-actions">
						<button type="submit">Guardar</button>
						<span class="saved-note">Se guarda en Supabase; visible en la web tras el próximo despliegue.</span>
					</div>
				</form>
			</div>
		</details>
		<?php endforeach; ?>
	<?php endif; ?>
	<script>
		function ptFilter(q) {
			q = (q || '').trim().toLowerCase();
			var items = document.querySelectorAll('.pt-item'), shown = 0;
			for (var i = 0; i < items.length; i++) {
				var match = !q || items[i].getAttribute('data-search').indexOf(q) !== -1;
				items[i].style.display = match ? '' : 'none';
				if (match) shown++;
			}
			var c = document.getElementById('count'); if (c) c.textContent = shown;
		}
		// Abre el proyecto recién guardado (si venimos con ancla).
		if (location.hash) { var el = document.querySelector(location.hash); if (el && el.tagName === 'DETAILS') el.open = true; }
	</script>
<?php endif; ?>
</div></body></html>
