<?php
/*
 * Panel interno de la Zona Privada de Proyectos (Standarte).
 * Reutiliza la sesion/contrasena del admin de email (login_password_hash) y la
 * service key de Supabase (campaign_supabase_request) para gestionar los datos.
 */
session_start();
require_once __DIR__ . '/../supabase-config.php';
require_once __DIR__ . '/email_campaing/mailer.php';
$config = require __DIR__ . '/email_campaing/config.php';

function pj_authed() { return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true; }
function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }
function post($k, $d = '') { return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : $d; }

/* Las tablas client_* tienen RLS deny-all: el panel necesita la service key.
 * Mismo patrón que index.php: SUPABASE_SERVICE_KEY si está definida en
 * supabase-config.php; si no, cae a SUPABASE_KEY (y avisamos en la cabecera). */
function pj_key() { return defined('SUPABASE_SERVICE_KEY') ? SUPABASE_SERVICE_KEY : SUPABASE_KEY; }
function pj_has_service_key() { return defined('SUPABASE_SERVICE_KEY'); }
function sb($method, $endpoint, $data = null) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/' . $endpoint);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_TIMEOUT, 12);
  $headers = array(
    'apikey: ' . pj_key(),
    'Authorization: Bearer ' . pj_key(),
    'Content-Type: application/json',
    'Prefer: return=representation'
  );
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  if ($data !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  $decoded = json_decode($response, true);
  return array('code' => $httpCode, 'body' => is_array($decoded) ? $decoded : $response);
}
function sb_rows($endpoint) { $r = sb('GET', $endpoint); return (is_array($r) && (int) $r['code'] === 200 && is_array($r['body'])) ? $r['body'] : array(); }
function lines_to_pg_array($text) {
  $lines = array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) $text)), function ($x) { return $x !== ''; }));
  return $lines; // campaign_supabase_request json-encodea; Postgres acepta array JSON para text[]
}

/* ---------- Login / logout ---------- */
if (isset($_POST['login_password'])) {
  if (isset($config['login_password_hash']) && password_verify($_POST['login_password'], $config['login_password_hash'])) {
    $_SESSION['standarte_email_campaing_auth'] = true;
  }
  header('Location: proyectos.php'); exit;
}
if (isset($_GET['logout'])) { unset($_SESSION['standarte_email_campaing_auth']); header('Location: proyectos.php'); exit; }

/* ---------- Acciones (solo autenticado) ---------- */
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
if (pj_authed() && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
  $action = $_POST['action'];
  $pid = post('project_id');

  if ($action === 'create_project') {
    $token = bin2hex(random_bytes(16));
    sb('POST', 'client_projects', array(
      'ref' => post('ref'), 'client_name' => post('client_name'), 'client_email' => post('client_email'),
      'title_es' => post('title_es'), 'title_en' => post('title_en'),
      'interlocutor_name' => post('interlocutor_name') ?: 'Javier G. Márquez',
      'interlocutor_role_es' => 'Director de Proyectos', 'interlocutor_role_en' => 'Projects Director',
      'interlocutor_email' => post('interlocutor_email') ?: 'javier@standarte.es',
      'access_token' => $token, 'status' => 'draft'
    ));
    header('Location: proyectos.php?msg=' . urlencode('Proyecto creado. Enlace: /proyecto?t=' . $token)); exit;
  }

  if ($action === 'save_project' && $pid !== '') {
    sb('PATCH', 'client_projects?id=eq.' . urlencode($pid), array(
      'ref' => post('ref'), 'client_name' => post('client_name'), 'client_email' => post('client_email'),
      'title_es' => post('title_es'), 'title_en' => post('title_en'),
      'memoria_es' => post('memoria_es'), 'memoria_en' => post('memoria_en'),
      'includes_es' => lines_to_pg_array(post('includes_es')), 'includes_en' => lines_to_pg_array(post('includes_en')),
      'excludes_es' => lines_to_pg_array(post('excludes_es')), 'excludes_en' => lines_to_pg_array(post('excludes_en')),
      'interlocutor_name' => post('interlocutor_name'), 'interlocutor_email' => post('interlocutor_email'),
      'income_account' => post('income_account'), 'paid' => (post('paid') === '1'),
      'updated_at' => gmdate('c')
    ));
    header('Location: proyectos.php?id=' . urlencode($pid) . '&msg=' . urlencode('Guardado.')); exit;
  }

  if ($action === 'add_budget' && $pid !== '') {
    sb('POST', 'client_project_budget_items', array(
      'project_id' => $pid, 'concept_es' => post('concept_es'), 'concept_en' => post('concept_en'),
      'amount' => (float) str_replace(',', '.', post('amount', '0')), 'sort_order' => (int) post('sort_order', '0')
    ));
    header('Location: proyectos.php?id=' . urlencode($pid)); exit;
  }
  if ($action === 'del_budget') { sb('DELETE', 'client_project_budget_items?id=eq.' . urlencode(post('item_id'))); header('Location: proyectos.php?id=' . urlencode($pid)); exit; }

  if ($action === 'add_media' && $pid !== '') {
    sb('POST', 'client_project_media', array(
      'project_id' => $pid, 'type' => post('type', 'image'), 'src' => post('src'), 'poster' => post('poster'),
      'title_es' => post('title_es'), 'title_en' => post('title_en'), 'sort_order' => (int) post('sort_order', '0')
    ));
    header('Location: proyectos.php?id=' . urlencode($pid)); exit;
  }
  if ($action === 'del_media') { sb('DELETE', 'client_project_media?id=eq.' . urlencode(post('media_id'))); header('Location: proyectos.php?id=' . urlencode($pid)); exit; }

  if ($action === 'reply' && $pid !== '') {
    $body = post('body');
    if ($body !== '') {
      sb('POST', 'client_project_comments', array(
        'project_id' => $pid, 'media_id' => (post('media_id') !== '' ? post('media_id') : null),
        'author' => 'internal', 'author_name' => 'Standarte', 'body' => $body
      ));
    }
    header('Location: proyectos.php?id=' . urlencode($pid)); exit;
  }

  if ($action === 'notify' && $pid !== '') {
    $rows = sb_rows('client_projects?id=eq.' . urlencode($pid) . '&select=access_token');
    if (!empty($rows[0]['access_token'])) {
      $_POST = array('token' => $rows[0]['access_token'], 'role' => 'internal');
      ob_start(); include __DIR__ . '/ajax_proyecto_notify.php'; ob_end_clean();
    }
    header('Location: proyectos.php?id=' . urlencode($pid) . '&msg=' . urlencode('Aviso enviado al cliente.')); exit;
  }
}

/* ---------- Datos para las vistas ---------- */
$detail = null; $media = array(); $budget = array(); $comments = array();
$id = isset($_GET['id']) ? $_GET['id'] : '';
if (pj_authed()) {
  if ($id !== '') {
    $rows = sb_rows('client_projects?id=eq.' . urlencode($id) . '&limit=1');
    $detail = $rows ? $rows[0] : null;
    if ($detail) {
      $media = sb_rows('client_project_media?project_id=eq.' . urlencode($id) . '&order=sort_order');
      $budget = sb_rows('client_project_budget_items?project_id=eq.' . urlencode($id) . '&order=sort_order');
      $comments = sb_rows('client_project_comments?project_id=eq.' . urlencode($id) . '&order=created_at');
    }
  }
  $projects = sb_rows('client_projects?select=id,ref,client_name,paid,access_token,created_at&order=created_at.desc');
}
function pg_arr($v) { return is_array($v) ? implode("\n", $v) : ''; }
?>
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proyectos · Admin Standarte</title>
<style>
  body { font-family: 'Inconsolata', ui-monospace, monospace; background: #16181c; color: #e6e6e6; margin: 0; padding: 24px; font-size: 15px; }
  a { color: #ffc800; } h1,h2,h3 { font-weight: 700; }
  .wrap { max-width: 1000px; margin: 0 auto; }
  .card { background: #1e2127; border: 1px solid #2c3038; border-radius: 8px; padding: 18px; margin-bottom: 18px; }
  input, textarea, select { width: 100%; box-sizing: border-box; background: #12141a; border: 1px solid #333; color: #eee; padding: 8px 10px; font-family: inherit; font-size: 14px; border-radius: 5px; margin-bottom: 8px; }
  label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #9aa; }
  button { background: #ffc800; color: #111; border: none; padding: 9px 18px; font-family: inherit; font-weight: 700; border-radius: 5px; cursor: pointer; }
  button.ghost { background: transparent; color: #ffc800; border: 1px solid #ffc800; }
  button.danger { background: #c0392b; color: #fff; }
  table { width: 100%; border-collapse: collapse; }
  td, th { padding: 7px 8px; border-bottom: 1px solid #2c3038; text-align: left; font-size: 14px; }
  .num { text-align: right; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .msg { background: #14331f; border: 1px solid #2e7d32; color: #a5d6a7; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; }
  .link { font-size: 12px; word-break: break-all; color: #8fd; }
  .paid { color: #4caf50; } .draft { color: #888; }
  .cmt { background:#12141a; border:1px solid #2c3038; border-radius:6px; padding:8px 10px; margin-bottom:6px; }
  .cmt.internal { border-color:#2e7d32; }
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
  <?php if (!pj_has_service_key()): ?>
    <div class="msg" style="background:#3a2a12;border-color:#b8860b;color:#ffd54f">
      ⚠ Falta <code>SUPABASE_SERVICE_KEY</code> en <code>supabase-config.php</code>. Sin ella este panel no puede
      leer/escribir los proyectos (las tablas están protegidas). Cópiala del panel de Supabase
      (Settings → API → service_role) y añade: <code>define('SUPABASE_SERVICE_KEY', '…');</code>
    </div>
  <?php endif; ?>

  <?php if ($detail): ?>
    <p><a href="proyectos.php">&larr; Todos los proyectos</a></p>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2><?= h($detail['ref']) ?> · <?= h($detail['client_name']) ?></h2>
        <span class="<?= $detail['paid'] ? 'paid' : 'draft' ?>"><?= $detail['paid'] ? 'PAGADO' : 'No pagado' ?></span>
      </div>
      <p class="link">Enlace del cliente: <a href="https://standarte.es/proyecto?t=<?= h($detail['access_token']) ?>" target="_blank" rel="noopener">https://standarte.es/proyecto?t=<?= h($detail['access_token']) ?></a></p>
      <form method="post" action="proyectos.php?id=<?= h($detail['id']) ?>&msg=1" style="display:inline">
        <input type="hidden" name="action" value="notify"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>">
        <button class="ghost" type="submit">Avisar al cliente (email)</button>
      </form>
    </div>

    <form method="post" class="card">
      <input type="hidden" name="action" value="save_project"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>">
      <h3>Datos</h3>
      <div class="row">
        <div><label>Ref</label><input name="ref" value="<?= h($detail['ref']) ?>"></div>
        <div><label>Cliente</label><input name="client_name" value="<?= h($detail['client_name']) ?>"></div>
        <div><label>Email cliente</label><input name="client_email" value="<?= h($detail['client_email']) ?>"></div>
        <div><label>Cuenta de ingreso</label><input name="income_account" value="<?= h($detail['income_account']) ?>"></div>
        <div><label>Título ES</label><input name="title_es" value="<?= h($detail['title_es']) ?>"></div>
        <div><label>Título EN</label><input name="title_en" value="<?= h($detail['title_en']) ?>"></div>
        <div><label>Interlocutor</label><input name="interlocutor_name" value="<?= h($detail['interlocutor_name']) ?>"></div>
        <div><label>Email interlocutor</label><input name="interlocutor_email" value="<?= h($detail['interlocutor_email']) ?>"></div>
      </div>
      <label>Memoria ES</label><textarea name="memoria_es" rows="3"><?= h($detail['memoria_es']) ?></textarea>
      <label>Memoria EN</label><textarea name="memoria_en" rows="3"><?= h($detail['memoria_en']) ?></textarea>
      <div class="row">
        <div><label>Incluye ES (una por línea)</label><textarea name="includes_es" rows="3"><?= h(pg_arr($detail['includes_es'])) ?></textarea></div>
        <div><label>Incluye EN</label><textarea name="includes_en" rows="3"><?= h(pg_arr($detail['includes_en'])) ?></textarea></div>
        <div><label>No incluye ES</label><textarea name="excludes_es" rows="2"><?= h(pg_arr($detail['excludes_es'])) ?></textarea></div>
        <div><label>No incluye EN</label><textarea name="excludes_en" rows="2"><?= h(pg_arr($detail['excludes_en'])) ?></textarea></div>
      </div>
      <label><input type="checkbox" name="paid" value="1" style="width:auto" <?= $detail['paid'] ? 'checked' : '' ?>> Marcar como PAGADO</label>
      <div><button type="submit">Guardar datos</button></div>
    </form>

    <div class="card">
      <h3>Presupuesto</h3>
      <table><tr><th>Concepto ES</th><th>Concepto EN</th><th class="num">Importe</th><th></th></tr>
      <?php foreach ($budget as $b): ?>
        <tr><td><?= h($b['concept_es']) ?></td><td><?= h($b['concept_en']) ?></td><td class="num"><?= number_format((float)$b['amount'], 2, ',', '.') ?> €</td>
        <td><form method="post"><input type="hidden" name="action" value="del_budget"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>"><input type="hidden" name="item_id" value="<?= h($b['id']) ?>"><button class="danger" type="submit">×</button></form></td></tr>
      <?php endforeach; ?>
      </table>
      <form method="post" style="margin-top:10px" class="row">
        <input type="hidden" name="action" value="add_budget"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>">
        <input name="concept_es" placeholder="Concepto ES"><input name="concept_en" placeholder="Concepto EN">
        <input name="amount" placeholder="Importe (€)"><div><button type="submit">Añadir concepto</button></div>
      </form>
    </div>

    <div class="card">
      <h3>Archivos (media)</h3>
      <table><tr><th>Tipo</th><th>Título ES</th><th>URL</th><th></th></tr>
      <?php foreach ($media as $m): ?>
        <tr><td><?= h($m['type']) ?></td><td><?= h($m['title_es']) ?></td><td class="link"><?= h($m['src']) ?></td>
        <td><form method="post"><input type="hidden" name="action" value="del_media"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>"><input type="hidden" name="media_id" value="<?= h($m['id']) ?>"><button class="danger" type="submit">×</button></form></td></tr>
      <?php endforeach; ?>
      </table>
      <form method="post" style="margin-top:10px" class="row">
        <input type="hidden" name="action" value="add_media"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>">
        <select name="type"><option value="image">image</option><option value="video">video</option><option value="model">model</option></select>
        <input name="title_es" placeholder="Título ES"><input name="title_en" placeholder="Título EN">
        <input name="src" placeholder="URL del archivo (Storage)"><input name="poster" placeholder="Poster (vídeo, opc.)">
        <div><button type="submit">Añadir archivo</button></div>
      </form>
    </div>

    <div class="card">
      <h3>Comentarios</h3>
      <?php foreach ($comments as $c): ?>
        <div class="cmt <?= $c['author'] === 'internal' ? 'internal' : '' ?>"><strong><?= $c['author'] === 'internal' ? 'Standarte' : h($detail['client_name']) ?>:</strong> <?= h($c['body']) ?></div>
      <?php endforeach; ?>
      <form method="post" style="margin-top:10px">
        <input type="hidden" name="action" value="reply"><input type="hidden" name="project_id" value="<?= h($detail['id']) ?>">
        <label>Responder (archivo opcional)</label>
        <select name="media_id"><option value="">— general —</option><?php foreach ($media as $m): ?><option value="<?= h($m['id']) ?>"><?= h($m['title_es']) ?></option><?php endforeach; ?></select>
        <textarea name="body" rows="2" placeholder="Tu respuesta…"></textarea>
        <button type="submit">Responder</button>
      </form>
    </div>

  <?php else: ?>
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
      <table><tr><th>Ref</th><th>Cliente</th><th>Estado</th><th>Enlace</th></tr>
      <?php foreach ($projects as $p): ?>
        <tr><td><a href="proyectos.php?id=<?= h($p['id']) ?>"><?= h($p['ref']) ?></a></td><td><?= h($p['client_name']) ?></td>
        <td class="<?= $p['paid'] ? 'paid' : 'draft' ?>"><?= $p['paid'] ? 'Pagado' : 'Borrador' ?></td>
        <td class="link"><a href="https://standarte.es/proyecto?t=<?= h($p['access_token']) ?>" target="_blank" rel="noopener">standarte.es/proyecto?t=<?= h(substr($p['access_token'],0,10)) ?>…</a></td></tr>
      <?php endforeach; ?>
      </table>
    </div>
  <?php endif; ?>
<?php endif; ?>
</div></body></html>
