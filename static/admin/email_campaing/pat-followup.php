<?php
// pat-followup.php
// Correo de seguimiento personal "Pat", 1 h despues de que un visitante quede
// registrado en "Ultimos accesos desde el correo" (apertura/clic humano).
//
// - 1 unico Pat por visitante (dedup permanente por email en data/pat_followups.json).
// - En el idioma del contacto; {GRUPO} = su lista/feria (lead_group). Sin lista -> sin feria.
// - Salvaguarda historica: la PRIMERA ejecucion solo "siembra" (marca los accesos ya
//   existentes como procesados, sin enviar) y fija activated_at. A partir de ahi solo
//   se envia a accesos NUEVOS, y solo cuando han pasado >= 1 h.
//
// Modos (GET, requieren token salvo CLI):
//   ?token=...                 -> ejecucion normal (siembra si aun no se ha activado)
//   ?token=...&seed=1          -> forzar siembra (marca todo lo actual como procesado, no envia)
//   ?token=...&dryrun=1        -> lista elegibles sin enviar
//   ?token=...&test=1&to=mail  -> envia un Pat de prueba a "to" (opcional &grupo=...&lang=es)

$config = require_once 'config.php';
require_once 'template.php';
require_once 'mailer.php';

$PAT_CRON_TOKEN = 'PAT-3d9f1a7c2e5b48';

if (!isset($_GET['token']) || $_GET['token'] !== $PAT_CRON_TOKEN) {
    if (php_sapi_name() !== 'cli') {
        http_response_code(403);
        die('Forbidden');
    }
}

$supaConfigPath = __DIR__ . '/../../supabase-config.php';
if (!file_exists($supaConfigPath)) {
    die("Error: No se encontró supabase-config.php\n");
}
require_once $supaConfigPath;

header('Content-Type: application/json; charset=utf-8');

$STATE_FILE   = __DIR__ . '/data/pat_followups.json';
$FOLLOWUP_DELAY = 3600;   // 1 hora
$MAX_PER_RUN    = 25;     // tope de envios por ejecucion

// --- Helpers --------------------------------------------------------------

function pat_supa_get($endpoint) {
    $ch = curl_init(SUPABASE_URL . '/rest/v1/' . $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
    ));
    $res = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($res, true);
    return is_array($data) ? $data : array();
}

// Mismo filtro anti-bots que el panel (index.php :: click_is_human)
function pat_click_is_human($c) {
    $email = isset($c['email']) ? trim($c['email']) : '';
    if ($email === '' || strcasecmp($email, 'anonymous') === 0 || strpos($email, '@') === false) return false;
    $legit = array('email_campaing', 'main-cta-button', 'footer-contact', 'footer-web');
    $src = isset($c['source']) ? $c['source'] : '';
    if (!in_array($src, $legit, true)) return false;
    $ua = strtolower(trim(isset($c['user_agent']) ? $c['user_agent'] : ''));
    if ($ua === '') return false;
    foreach (array('bot', 'crawl', 'spider', 'proxy', 'preview', 'scan', 'mimecast', 'proofpoint', 'barracuda', 'googleimageproxy', 'python', 'curl/', 'wget', 'headless', 'monitor') as $b) {
        if (strpos($ua, $b) !== false) return false;
    }
    return true;
}

// Datos del contacto (lead_group, idioma, empresa) buscando en ambas tablas.
function pat_lookup_contact($email) {
    foreach (array('contacts', 'luz_contacts') as $table) {
        $rows = pat_supa_get($table . '?email=eq.' . urlencode($email) . '&select=lead_group,language,empresa&limit=1');
        if (!empty($rows[0])) return $rows[0];
    }
    return null;
}

function pat_load_state($file) {
    if (is_file($file)) {
        $s = json_decode(file_get_contents($file), true);
        if (is_array($s)) {
            if (!isset($s['sent']) || !is_array($s['sent'])) $s['sent'] = array();
            if (!array_key_exists('activated_at', $s)) $s['activated_at'] = null;
            return $s;
        }
    }
    return array('activated_at' => null, 'sent' => array());
}

function pat_save_state($file, $state) {
    file_put_contents($file, json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}

// Aperturas humanas mas recientes por email.
function pat_latest_human_opens() {
    $all = pat_supa_get('email_clicks?select=email,source,user_agent,clicked_at&order=clicked_at.desc&limit=1000');
    $byEmail = array();
    foreach ($all as $c) {
        if (!pat_click_is_human($c)) continue;
        $email = strtolower(trim($c['email']));
        if (!isset($byEmail[$email])) {
            $byEmail[$email] = $c['clicked_at']; // el primero es el mas reciente (order desc)
        }
    }
    return $byEmail; // [email => clicked_at_mas_reciente]
}

// --- MODO TEST ------------------------------------------------------------

if (isset($_GET['test']) && isset($_GET['to'])) {
    $to    = trim($_GET['to']);
    $lang  = isset($_GET['lang']) && $_GET['lang'] !== '' ? strtolower($_GET['lang']) : 'es';
    $grupo = isset($_GET['grupo']) ? $_GET['grupo'] : '';
    $texts = campaign_pat_texts($lang);
    $html  = campaign_build_pat_email($config, $to, $lang, $grupo);
    $ok    = campaign_send_mail($config, $to, $texts['subject'], $html);
    echo json_encode(array(
        'mode' => 'test',
        'to' => $to, 'lang' => $lang, 'grupo' => $grupo,
        'subject' => $texts['subject'],
        'sent' => (bool) $ok,
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// --- ESTADO + SIEMBRA -----------------------------------------------------

$state = pat_load_state($STATE_FILE);

// MODO UN-SEED: reactiva los accesos historicos sembrados (sent_at='seed') para que
// el cron les envie el Pat. Conserva los envios reales y los invalidos.
if (isset($_GET['unseed'])) {
    $removed = 0;
    foreach ($state['sent'] as $em => $rec) {
        if (isset($rec['sent_at']) && $rec['sent_at'] === 'seed') { unset($state['sent'][$em]); $removed++; }
    }
    pat_save_state($STATE_FILE, $state);
    echo json_encode(array(
        'mode' => 'unseed',
        'reactivados' => $removed,
        'remaining_sent' => count($state['sent']),
        'note' => 'Sembrados reactivados. La proxima ejecucion normal les enviara el Pat.',
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

$opens = pat_latest_human_opens();

$forceSeed = isset($_GET['seed']);
$needSeed  = empty($state['activated_at']);

if ($forceSeed || $needSeed) {
    foreach ($opens as $email => $ts) {
        if (!isset($state['sent'][$email])) {
            $state['sent'][$email] = array('sent_at' => 'seed', 'grupo' => null, 'lang' => null);
        }
    }
    $state['activated_at'] = date('c');
    pat_save_state($STATE_FILE, $state);
    echo json_encode(array(
        'mode' => $forceSeed ? 'seed (forzada)' : 'seed (auto, primera activacion)',
        'activated_at' => $state['activated_at'],
        'seeded' => count($state['sent']),
        'note' => 'Accesos historicos marcados como procesados. No se ha enviado ningun correo. Los proximos accesos nuevos si recibiran el Pat.',
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// --- ELEGIBLES (acceso nuevo + >=1h + no enviado) -------------------------

$now = time();
$eligible = array();
foreach ($opens as $email => $ts) {
    if (isset($state['sent'][$email])) continue;          // ya procesado/enviado
    $openTime = strtotime($ts);
    if ($openTime === false) continue;
    if (($now - $openTime) < $FOLLOWUP_DELAY) continue;    // aun no ha pasado 1 h
    $eligible[$email] = $ts;
}

$dryrun = isset($_GET['dryrun']);
if ($dryrun) {
    echo json_encode(array(
        'mode' => 'dryrun',
        'activated_at' => $state['activated_at'],
        'already_processed' => count($state['sent']),
        'eligible_count' => count($eligible),
        'eligible' => array_slice(array_keys($eligible), 0, 50),
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// --- ENVIO ----------------------------------------------------------------

$sent = 0; $skipped = 0; $log = array();
foreach ($eligible as $email => $ts) {
    if ($sent >= $MAX_PER_RUN) break;

    $err = '';
    if (function_exists('campaign_is_valid_email_advanced') && !campaign_is_valid_email_advanced($email, $err)) {
        $state['sent'][$email] = array('sent_at' => 'invalid', 'reason' => $err);
        $skipped++; $log[] = "SKIP $email ($err)";
        continue;
    }

    $contact = pat_lookup_contact($email);
    $lang  = ($contact && !empty($contact['language'])) ? strtolower($contact['language']) : 'es';
    $grupo = ($contact && !empty($contact['lead_group'])) ? $contact['lead_group'] : '';

    $texts = campaign_pat_texts($lang);
    $html  = campaign_build_pat_email($config, $email, $lang, $grupo);

    if (campaign_send_mail($config, $email, $texts['subject'], $html)) {
        $state['sent'][$email] = array('sent_at' => date('c'), 'grupo' => $grupo, 'lang' => $lang);
        $sent++; $log[] = "OK $email [$lang/" . ($grupo ?: 'sin lista') . "]";
        pat_save_state($STATE_FILE, $state); // persistir tras cada envio
        sleep(1);
    } else {
        $log[] = "FAIL $email";
    }
}

pat_save_state($STATE_FILE, $state);

echo json_encode(array(
    'mode' => 'run',
    'activated_at' => $state['activated_at'],
    'eligible' => count($eligible),
    'sent' => $sent,
    'skipped' => $skipped,
    'log' => $log,
), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
