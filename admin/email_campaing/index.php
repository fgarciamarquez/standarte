<?php

session_start();

$config = require __DIR__ . '/config.php';
require __DIR__ . '/template.php';

$errors = array();
$success = '';
$previewHtml = '';
$previewSubject = '';
$selectedCategory = isset($_POST['category']) ? $_POST['category'] : 'stands_madera';
$selectedLanguage = isset($_POST['language']) ? $_POST['language'] : 'es';
$recipientEmail = isset($_POST['recipient_email']) ? trim($_POST['recipient_email']) : '';
$emailSubjectInput = isset($_POST['email_subject']) ? $_POST['email_subject'] : '';

function campaign_parse_recipient_emails($value)
{
    $parts = preg_split('/[,;\r\n]+/', $value);
    $emails = array();

    foreach ($parts as $part) {
        $email = trim($part);
        $email = preg_replace('/\s+/', '', $email);
        $email = strtolower($email);

        if ($email !== '') {
            $emails[] = $email;
        }
    }

    return array_values(array_unique($emails));
}

function campaign_clean_subject($value)
{
    $value = strip_tags($value);
    $value = str_replace(array("\r", "\n"), ' ', $value);
    $value = preg_replace('/\s+/', ' ', $value);

    return trim($value);
}



function campaign_is_logged_in()
{
    return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true;
}

function campaign_get_email_clicks()
{
    $configFile = __DIR__ . '/../../supabase-config.php';
    if (!is_file($configFile)) {
        return array('total' => 0, 'history' => array());
    }
    require_once $configFile;

    if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
        return array('total' => 0, 'history' => array());
    }

    // Get total count
    $chCount = curl_init();
    curl_setopt($chCount, CURLOPT_URL, SUPABASE_URL . '/rest/v1/email_clicks?select=id');
    curl_setopt($chCount, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chCount, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($chCount, CURLOPT_HEADER, true);
    curl_setopt($chCount, CURLOPT_NOBODY, true);
    curl_setopt($chCount, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Prefer: count=exact'
    ]);
    $header = curl_exec($chCount);
    $count = 0;
    if (preg_match('/Content-Range: [0-9]+-[0-9]+\/([0-9]+)/', $header, $matches)) {
        $count = (int)$matches[1];
    }
    curl_close($chCount);

    // Get history (latest 50)
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/email_clicks?select=email,source,created_at&order=created_at.desc&limit=50');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $history = json_decode($response, true);
    if (!is_array($history) || isset($history['code']) || isset($history['message'])) {
        $history = array();
    }
    
    // Fallback if supabase fails
    if ($count === 0 && empty($history)) {
        $statsFile = __DIR__ . '/data/clicks.json';
        if (is_file($statsFile)) {
            $stats = json_decode(file_get_contents($statsFile), true);
            if (is_array($stats)) {
                $count = isset($stats['total']) ? (int)$stats['total'] : 0;
                $history = isset($stats['history']) && is_array($stats['history']) ? $stats['history'] : array();
            }
        }
    }
    
    return array('total' => $count, 'history' => $history);
}

require __DIR__ . '/mailer.php';


if (isset($_GET['logout'])) {
    unset($_SESSION['standarte_email_campaing_auth']);
    header('Location: index.php');
    exit;
}

if (isset($_POST['login_password'])) {
    if (password_verify($_POST['login_password'], $config['login_password_hash'])) {
        $_SESSION['standarte_email_campaing_auth'] = true;
        header('Location: index.php');
        exit;
    }

    $errors[] = 'La contraseña no es correcta.';
}

if (!campaign_is_logged_in()) {
    ?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso privado · Standarte</title>
  <style>
    body { align-items:center; background:#f4f5f7; color:#333333; display:flex; font-family:Arial,Helvetica,sans-serif; justify-content:center; margin:0; min-height:100vh; }
    main { background:#ffffff; box-shadow:0 10px 40px rgba(0,0,0,.08); max-width:360px; padding:32px; border-radius: 6px; border-top: 4px solid #ffc800; width:calc(100% - 32px); border: 1px solid #e1e4e8; }
    h1 { font-size:1.35rem; margin:0 0 1rem; color: #111111; text-align: center; font-weight: bold; }
    input, button { box-sizing:border-box; font:inherit; width:100%; border-radius: 4px; }
    input { background: #ffffff; border:1px solid #cccccc; color: #333333; margin:.35rem 0 1.25rem; padding:.75rem; }
    input:focus { border-color: #ffc800; outline: none; box-shadow: 0 0 0 3px rgba(255, 200, 0, 0.15); }
    button { background:#ffc800; border:0; color:#111; cursor:pointer; font-weight:700; padding:.8rem; transition: background 0.2s ease; }
    button:hover { background: #e6b400; }
    .error { color:#ff4444; font-size:.9rem; margin:0 0 1rem; text-align: center; }
  </style>
</head>
<body>
  <main>
    <h1>Admin</h1>
    <?php foreach ($errors as $error): ?><p class="error"><?php echo campaign_escape($error); ?></p><?php endforeach; ?>
    <form method="post">
      <label for="login_password" style="font-size: 0.9rem; color: #aaa;">Contraseña de Seguridad</label>
      <input id="login_password" name="login_password" type="password" required autofocus>
      <button type="submit">Entrar al Panel</button>
    </form>
  </main>
</body>
</html>
    <?php
    exit;
}

$subjectDefaults = array();
$introDefaults = array();
$bodyDefaults = array();
foreach ($config['categories'] as $categoryKey => $categoryConfig) {
    $subjectDefaults[$categoryKey] = array();
    $introDefaults[$categoryKey] = array();
    $bodyDefaults[$categoryKey] = array();
    foreach ($config['languages'] as $languageKey => $languageConfig) {
        $subjectDefaults[$categoryKey][$languageKey] = campaign_text($categoryConfig, $languageKey, 'subject');
        $introDefaults[$categoryKey][$languageKey] = campaign_text($categoryConfig, $languageKey, 'intro');
        $bodyDefaults[$categoryKey][$languageKey] = campaign_text($categoryConfig, $languageKey, 'body');
    }
}

$defaultEmailSubject = isset($subjectDefaults[$selectedCategory][$selectedLanguage]) ? $subjectDefaults[$selectedCategory][$selectedLanguage] : '';
$emailSubject = campaign_clean_subject($emailSubjectInput);
if ($emailSubject === '') {
    $emailSubject = $defaultEmailSubject;
}

$defaultEmailIntro = isset($introDefaults[$selectedCategory][$selectedLanguage]) ? $introDefaults[$selectedCategory][$selectedLanguage] : '';
$emailIntro = isset($_POST['email_intro']) ? $_POST['email_intro'] : $defaultEmailIntro;

$defaultEmailBody = isset($bodyDefaults[$selectedCategory][$selectedLanguage]) ? $bodyDefaults[$selectedCategory][$selectedLanguage] : '';
$emailBody = isset($_POST['email_body']) ? $_POST['email_body'] : $defaultEmailBody;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['campaign_action'])) {
    $campaignAction = $_POST['campaign_action'];

    if (!in_array($campaignAction, array('preview', 'send'), true)) {
        $errors[] = 'Acción no válida.';
    }

    if (!isset($config['categories'][$selectedCategory])) {
        $errors[] = 'Seleccione una categoría válida.';
    }

    if (!isset($config['languages'][$selectedLanguage])) {
        $errors[] = 'Seleccione un idioma válido.';
    }

    $recipientEmails = campaign_parse_recipient_emails($recipientEmail);
    $invalidRecipientEmails = array();

    foreach ($recipientEmails as $email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $invalidRecipientEmails[] = $email;
        }
    }

    if ($campaignAction === 'send' && !$recipientEmails) {
        $errors[] = 'Introduzca al menos un correo electrónico válido.';
    }

    if ($campaignAction === 'send' && $invalidRecipientEmails) {
        $errors[] = 'Revise estos correos electrónicos: ' . implode(', ', $invalidRecipientEmails) . '.';
    }

    if ($campaignAction === 'send' && $emailSubject === '') {
        $errors[] = 'Introduzca el Asunto del email.';
    }

    if (!$errors) {
        $category = $config['categories'][$selectedCategory];
        $previewRecipient = $recipientEmails && filter_var($recipientEmails[0], FILTER_VALIDATE_EMAIL) ? $recipientEmails[0] : 'destinatario@ejemplo.com';
        $previewCompany = campaign_resolve_company_name($previewRecipient, $selectedLanguage, '', $emailSubject, $emailIntro, $emailBody);
        $previewSubject = campaign_process_placeholders($emailSubject, $previewCompany);
        $previewHtml = campaign_build_email($config, $category, $previewRecipient, $selectedLanguage, $previewSubject, $emailIntro, $emailBody, $previewCompany);

        if ($campaignAction === 'send') {
            $sentEmails = array();
            $failedEmails = array();

            foreach ($recipientEmails as $email) {
                $emailCompany = campaign_resolve_company_name($email, $selectedLanguage, '', $emailSubject, $emailIntro, $emailBody);
                $processedSubject = campaign_process_placeholders($emailSubject, $emailCompany);
                $emailHtml = campaign_build_email($config, $category, $email, $selectedLanguage, $processedSubject, $emailIntro, $emailBody, $emailCompany);

                if (campaign_send_mail($config, $email, $processedSubject, $emailHtml)) {
                    $sentEmails[] = $email;
                } else {
                    $failedEmails[] = $email;
                }
            }

            if ($sentEmails) {
                $success = 'El servidor ha aceptado el envío a ' . implode(', ', $sentEmails) . '. Si no llega, revise spam, SPF/DKIM o la configuración de correo del alojamiento.';
                $recipientEmail = '';
            }

            if ($failedEmails) {
                $errors[] = 'No se pudo enviar el email a: ' . implode(', ', $failedEmails) . '. Revise la configuración de correo del servidor.';
            }
        }
    }
}

if (!$previewHtml && isset($config['categories'][$selectedCategory])) {
    $recipientEmails = campaign_parse_recipient_emails($recipientEmail);
    $previewRecipient = $recipientEmails && filter_var($recipientEmails[0], FILTER_VALIDATE_EMAIL) ? $recipientEmails[0] : 'destinatario@ejemplo.com';
    $previewCompany = campaign_resolve_company_name($previewRecipient, $selectedLanguage, '', $emailSubject, $emailIntro, $emailBody);
    $previewSubject = campaign_process_placeholders($emailSubject, $previewCompany);
    $previewHtml = campaign_build_email($config, $config['categories'][$selectedCategory], $previewRecipient, $selectedLanguage, $previewSubject, $emailIntro, $emailBody, $previewCompany);
}

$clicksData = campaign_get_email_clicks();
$totalEmailVisits = $clicksData['total'];
$clicksHistory = $clicksData['history'];
$sendLog = campaign_get_send_log();
$smtpReady = !empty($config['smtp']['enabled']) && !empty($config['smtp']['host']) && !empty($config['smtp']['username']) && !empty($config['smtp']['password']);

?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestor de emails · Standarte</title>
  <style>
    body { background:#f4f5f7; color:#333333; font-family:Arial,Helvetica,sans-serif; margin:0; }
    header { align-items:center; background:#ffffff; border-bottom:3px solid #ffc800; display:flex; justify-content:space-between; padding:18px 24px; position:sticky; top:0; z-index:2; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    h1 { font-size:1.25rem; margin:0; color:#111111; font-weight: bold; }
    a { color:#b89400; text-decoration: none; }
    a:hover { text-decoration: underline; }
    main { display:grid; gap:24px; grid-template-columns:minmax(300px,380px) 1fr; padding:24px; }
    form, .preview { background:#ffffff; border:1px solid #e1e4e8; padding:22px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .stats { background:#ffffff; border:1px solid #e1e4e8; border-left: 4px solid #ffc800; margin:0 0 18px; padding:18px 22px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .stats strong { display:block; font-size:2rem; line-height:1; margin:.35rem 0; color:#b89400; }
    .stats span { color:#666666; display:block; font-size:.9rem; line-height:1.45; }
    .send-log { background:#ffffff; border:1px solid #e1e4e8; margin:18px 0 0; padding:18px 22px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .send-log h2 { font-size:1rem; margin:0 0 .75rem; color:#111111; }
    .send-log p { border-top:1px solid #e1e4e8; color:#555555; font-size:.82rem; line-height:1.4; margin:0; padding:.55rem 0; }
    .send-log b { color:#111111; }
    .smtp-status { background:#ffffff; border:1px solid #e1e4e8; margin:0 0 18px; padding:18px 22px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .smtp-status b { display:block; margin:0 0 .35rem; }
    .smtp-status span { color:#666666; display:block; font-size:.9rem; line-height:1.45; }
    .smtp-ok { border-left:4px solid #2ecc71; b { color:#27ae60; } }
    .smtp-warning { border-left:4px solid #f39c12; b { color:#d35400; } }
    label { display:block; font-weight:700; margin:0 0 .4rem; color: #333333; font-size: 0.9rem; }
    input, select, textarea, button { box-sizing:border-box; font:inherit; width:100%; border-radius: 4px; }
    input, select, textarea { background:#ffffff; border:1px solid #cccccc; color:#333333; margin:0 0 1.25rem; padding:.75rem; resize:vertical; }
    input:focus, select:focus, textarea:focus { border-color:#ffc800; outline: none; box-shadow: 0 0 0 3px rgba(255, 200, 0, 0.15); }
    button { border:0; cursor:pointer; font-weight:700; margin:.25rem 0; padding:.82rem; transition: opacity 0.2s ease; }
    button:hover { opacity: 0.9; }
    .primary { background:#ffc800; color:#111; }
    .secondary { background:#f5f6f8; color:#333333; border: 1px solid #dddddd; }
    .message { margin:0 0 1rem; padding:.8rem; border-radius: 4px; }
    .error { background:#fdf2f2; color:#b91c1c; border-left: 4px solid #f87171; }
    .success { background:#f0fdf4; color:#15803d; border-left: 4px solid #4ade80; }
    iframe { background:#fff; border:1px solid #e1e4e8; height:780px; width:100%; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .hint { color:#666666; font-size:.85rem; line-height:1.45; }
    .preview-subject { background:#f5f6f8; border-left:4px solid #ffc800; color:#333333; font-size:.9rem; line-height:1.45; margin:0 0 1rem; padding:.75rem .9rem; border-radius: 4px; border: 1px solid #e1e4e8; border-left-width: 4px; }
    @media (max-width: 950px) { main { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <header>
    <h1>Gestor de Emails Multimedia · Standarte</h1>
    <a href="?logout=1">Cerrar Sesión</a>
  </header>
  <main>
    <section>
      <div class="stats">
        <span>Visitas totales desde correos multimedia</span>
        <strong><?php echo number_format($totalEmailVisits, 0, ',', '.'); ?></strong>
        <span>Contador acumulado desde enlaces en correos.</span>
      </div>
      <div class="smtp-status <?php echo $smtpReady ? 'smtp-ok' : 'smtp-warning'; ?>">
        <b><?php echo $smtpReady ? 'SMTP autenticado activo' : 'SMTP pendiente de contraseña'; ?></b>
        <span>
          <?php if ($smtpReady): ?>
            Los envíos salen mediante <?php echo campaign_escape($config['smtp']['username']); ?> en <?php echo campaign_escape($config['smtp']['host']); ?>. Esto garantiza excelente entregabilidad.
          <?php else: ?>
            Añada la contraseña SMTP del buzón <?php echo campaign_escape($config['smtp']['username']); ?> en la variable de entorno STANDARTE_SMTP_PASSWORD o en static/admin/email_campaing/config.php. Mientras tanto, se usará mail() de PHP como respaldo.
          <?php endif; ?>
        </span>
      </div>
      <form id="campaign-form" method="post">
        <input id="campaign-action" type="hidden" name="campaign_action" value="preview">
        <?php foreach ($errors as $error): ?><p class="message error"><?php echo campaign_escape($error); ?></p><?php endforeach; ?>
        <?php if ($success): ?><p class="message success"><?php echo campaign_escape($success); ?></p><?php endif; ?>

        <label for="lead_group_select">Selector de grupos</label>
        <div style="display:flex;gap:8px;margin:0 0 .5rem;">
          <select id="lead_group_select" style="flex:1;margin:0;" onchange="updateUnsubWarning(this)">
            <option value="">-- Seleccionar grupo --</option>
          </select>
          <button type="button" id="load_group_btn" class="secondary" style="width:auto;padding:.5rem 1rem;margin:0;font-size:.85rem;" onclick="loadLeadGroup()">Cargar</button>
        </div>
        <div id="group_unsub_warning" style="display:none;color:#dc2626;font-size:.85rem;margin-bottom:0.5rem;font-weight:bold;"></div>
        <div id="group_feedback" style="display:none;background:#f0fdf4;border-left:4px solid #4ade80;color:#15803d;padding:8px 12px;border-radius:4px;margin:0 0 1rem;font-size:.85rem;"></div>

        <label for="recipient_email">Destinatarios</label>
        <input id="recipient_email" name="recipient_email" type="text" inputmode="email" value="<?php echo campaign_escape($recipientEmail); ?>" placeholder="destinatario@dominio.com, otro@dominio.com" autocomplete="off" required>

        <label for="email_subject">Asunto del email</label>
        <input id="email_subject" name="email_subject" type="text" value="<?php echo campaign_escape($emailSubject); ?>" maxlength="160" required>

        <label for="email_intro">Párrafo superior (arriba de las imágenes)</label>
        <textarea id="email_intro" name="email_intro" rows="4" required><?php echo campaign_escape($emailIntro); ?></textarea>

        <label for="email_body">Párrafo inferior (abajo de las imágenes)</label>
        <textarea id="email_body" name="email_body" rows="4" required><?php echo campaign_escape($emailBody); ?></textarea>

        <input type="hidden" id="category" name="category" value="stands_madera">

        <label for="language">Idioma del correo</label>
        <select id="language" name="language" required>
          <?php foreach ($config['languages'] as $key => $language): ?>
            <option value="<?php echo campaign_escape($key); ?>" <?php echo $selectedLanguage === $key ? 'selected' : ''; ?>>
              <?php echo campaign_escape($language['label']); ?>
            </option>
          <?php endforeach; ?>
        </select>

        <button class="secondary" type="submit" formnovalidate onclick="document.getElementById('campaign-action').value='preview';">Previsualizar imágenes aleatorias</button>
        <button class="primary" type="submit" onclick="document.getElementById('campaign-action').value='send';">Enviar Campaña</button>
        <p class="hint">Puedes enviar a varios destinatarios separándolos por comas. Cada categoría inyectará el asunto, textos y tarjetas multimedia correspondientes.</p>
        
        <div id="batch_progress_container" style="display:none; margin-top: 1rem; padding: 1rem; background: #1e1e1e; border: 1px solid #333; border-radius: 8px;">
          <h3 style="margin-top:0; color:#ffc800; font-size:1rem;">Estado del envío</h3>
          <div style="background: #000; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem; border: 1px solid #444;">
            <div id="batch_progress_bar" style="width: 0%; height: 8px; background: #ffc800; transition: width 0.3s ease;"></div>
          </div>
          <p id="batch_progress_text" style="margin:0; font-size:0.85rem; color:#ccc;">Preparando...</p>
          <p id="batch_progress_log" style="margin: 0.5rem 0 0; font-size: 0.75rem; color: #888; white-space: pre-wrap; font-family: monospace;"></p>
        </div>
      </form>
      <div class="send-log">
        <h2>Últimos accesos desde el correo</h2>
        <?php if (!$clicksHistory): ?>
          <p style="font-size:0.85rem;color:#888;">Nadie ha hecho clic en los correos todavía.</p>
        <?php endif; ?>
        <?php foreach ($clicksHistory as $click): ?>
          <p>
            <b><?php echo campaign_escape($click['email']); ?></b> (desde <i><?php echo campaign_escape($click['source']); ?></i>)<br>
            <span style="font-size:0.85rem;color:#888;"><?php echo campaign_escape(date('d/m/Y H:i:s', strtotime($click['created_at']))); ?></span>
          </p>
        <?php endforeach; ?>
      </div>
      <div class="send-log">
        <h2>Registro de envíos locales</h2>
        <?php if (!$sendLog): ?>
          <p style="font-size:0.85rem;color:#888;">No hay envíos registrados todavía.</p>
        <?php endif; ?>
        <?php foreach ($sendLog as $entry): ?>
          <p>
            <b><?php echo !empty($entry['accepted']) ? 'Aceptado por ' . campaign_escape(isset($entry['method']) ? $entry['method'] : 'PHP') : 'Error'; ?></b><br>
            <?php echo campaign_escape($entry['date']); ?> · <?php echo campaign_escape($entry['to']); ?>
            <?php if (!empty($entry['subject'])): ?><br>Asunto: <?php echo campaign_escape($entry['subject']); ?><?php endif; ?>
            <?php if (empty($entry['accepted']) && !empty($entry['error'])): ?><br><span style="color:#ff8888;"><?php echo campaign_escape($entry['error']); ?></span><?php endif; ?>
          </p>
        <?php endforeach; ?>
      </div>
    </section>
    <section class="preview">
      <h2 style="color:#ffc800;margin-top:0;">Previsualización en vivo</h2>
      <p class="preview-subject"><b>Asunto:</b> <?php echo campaign_escape($previewSubject !== '' ? $previewSubject : $emailSubject); ?></p>
      <iframe title="Previsualización del email" srcdoc="<?php echo campaign_escape($previewHtml); ?>"></iframe>
    </section>
  </main>
  <script>
    (function () {
      var form = document.getElementById('campaign-form');
      var action = document.getElementById('campaign-action');
      var category = document.getElementById('category');
      var language = document.getElementById('language');
      var subject = document.getElementById('email_subject');
      var intro = document.getElementById('email_intro');
      var body = document.getElementById('email_body');
      var subjectDefaults = <?php echo json_encode($subjectDefaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
      var introDefaults = <?php echo json_encode($introDefaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
      var bodyDefaults = <?php echo json_encode($bodyDefaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;

      <?php if ($success): ?>
      var recipientEmailInput = document.getElementById('recipient_email');
      if (recipientEmailInput) {
        recipientEmailInput.value = '';
      }
      <?php endif; ?>

      function refreshPreview(resetDefaults) {
        if (resetDefaults) {
          if (subjectDefaults[category.value] && subjectDefaults[category.value][language.value]) {
            subject.value = subjectDefaults[category.value][language.value];
          }
          if (introDefaults[category.value] && introDefaults[category.value][language.value]) {
            intro.value = introDefaults[category.value][language.value];
          }
          if (bodyDefaults[category.value] && bodyDefaults[category.value][language.value]) {
            body.value = bodyDefaults[category.value][language.value];
          }
        }
        action.value = 'preview';
        form.submit();
      }


      language.addEventListener('change', function () { refreshPreview(true); });

      // Sincronización en tiempo real de marcadores de empresa del tipo {VALOR}
      var currentPlaceholder = 'EMPRESA';
      
      // Auto-detectar marcador actual al cargar la página
      [subject.value, intro.value, body.value].forEach(function(val) {
        var m = val.match(/\{([^{}]+)\}/);
        if (m && m[1] !== 'EMPRESA') {
          currentPlaceholder = m[1];
        }
      });

      function syncPlaceholders(e) {
        var inputVal = e.target.value;
        var match = inputVal.match(/\{([^{}]+)\}/);
        if (match) {
          var newPlaceholder = match[1];
          if (newPlaceholder !== currentPlaceholder) {
            var oldFull = '{' + currentPlaceholder + '}';
            var newFull = '{' + newPlaceholder + '}';
            
            [subject, intro, body].forEach(function(field) {
              if (field !== e.target) {
                var escapedOld = oldFull.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var regex = new RegExp(escapedOld, 'g');
                var currentSelectionStart = field.selectionStart;
                var currentSelectionEnd = field.selectionEnd;
                
                field.value = field.value.replace(regex, newFull);
                
                if (field.setSelectionRange && typeof currentSelectionStart === 'number') {
                  field.setSelectionRange(currentSelectionStart, currentSelectionEnd);
                }
              }
            });
            currentPlaceholder = newPlaceholder;
          }
        }
      }

      subject.addEventListener('input', syncPlaceholders);
      intro.addEventListener('input', syncPlaceholders);
      body.addEventListener('input', syncPlaceholders);

      // --- LOGICA DE ENVIO POR LOTES (THROTTLING) ---
      form.addEventListener('submit', function(e) {
        if (action.value !== 'send') return; // Permitir preview normal

        e.preventDefault(); // Interceptar envío

        var rawEmails = document.getElementById('recipient_email').value;
        var allEmails = rawEmails.split(',').map(function(em) { return em.trim(); }).filter(function(em) { return em.length > 0; });
        
        if (allEmails.length === 0) {
          alert('Por favor, introduzca al menos un email válido.');
          return;
        }

        if (!confirm('Se van a enviar ' + allEmails.length + ' correos en grupos aleatorios con pausas. ¿Desea continuar?')) {
          return;
        }

        // Crear lotes irregulares (3 a 8)
        var batches = [];
        var currentIndex = 0;
        while (currentIndex < allEmails.length) {
          var batchSize = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // Aleatorio entre 3 y 8
          batches.push(allEmails.slice(currentIndex, currentIndex + batchSize));
          currentIndex += batchSize;
        }

        var progressContainer = document.getElementById('batch_progress_container');
        var progressBar = document.getElementById('batch_progress_bar');
        var progressText = document.getElementById('batch_progress_text');
        var progressLog = document.getElementById('batch_progress_log');
        var submitButtons = form.querySelectorAll('button[type="submit"]');

        progressContainer.style.display = 'block';
        submitButtons.forEach(function(btn) { btn.disabled = true; });
        progressLog.textContent = '';

        var totalBatches = batches.length;
        var currentBatchIdx = 0;
        var totalSent = 0;
        var totalFailed = 0;

        function sendNextBatch() {
          if (currentBatchIdx >= totalBatches) {
            progressText.innerHTML = '<span style="color:#4ade80;">¡Envío completado!</span> (' + totalSent + ' enviados, ' + totalFailed + ' fallidos)';
            progressBar.style.width = '100%';
            progressBar.style.background = '#4ade80';
            submitButtons.forEach(function(btn) { btn.disabled = false; });
            return;
          }

          var batchEmails = batches[currentBatchIdx];
          var pct = Math.round((currentBatchIdx / totalBatches) * 100);
          progressBar.style.width = pct + '%';
          progressText.textContent = 'Enviando lote ' + (currentBatchIdx + 1) + ' de ' + totalBatches + ' (' + batchEmails.length + ' correos)...';

          var payload = {
            recipients: batchEmails,
            category: category.value,
            language: language.value,
            subject: subject.value,
            intro: intro.value,
            body: body.value
          };

          fetch('send_batch.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data.success) {
              totalSent += (data.sent ? data.sent.length : 0);
              totalFailed += (data.failed ? data.failed.length : 0);
              progressLog.textContent = 'Lote ' + (currentBatchIdx + 1) + ' OK.\n' + progressLog.textContent;
            } else {
              totalFailed += batchEmails.length;
              progressLog.textContent = 'Lote ' + (currentBatchIdx + 1) + ' falló: ' + (data.errors ? data.errors.join(', ') : 'Error desconocido') + '\n' + progressLog.textContent;
            }
          })
          .catch(function(err) {
            totalFailed += batchEmails.length;
            progressLog.textContent = 'Lote ' + (currentBatchIdx + 1) + ' falló (Red).\n' + progressLog.textContent;
          })
          .finally(function() {
            currentBatchIdx++;
            if (currentBatchIdx < totalBatches) {
              var waitSeconds = Math.floor(Math.random() * (9 - 4 + 1)) + 4; // Aleatorio entre 4 y 9
              progressText.textContent = 'Lote enviado. Esperando ' + waitSeconds + ' segundos para evitar spam...';
              setTimeout(sendNextBatch, waitSeconds * 1000);
            } else {
              sendNextBatch(); // Llamar de nuevo para finalizar
            }
          });
        }

        sendNextBatch();
      });
    }());

    // --- CARGA DE GRUPOS DE LEADS DESDE SUPABASE ---
    (function () {
      var groupSelect = document.getElementById('lead_group_select');
      var feedback = document.getElementById('group_feedback');

      // Cargar la lista de grupos al iniciar
      fetch('groups.php?action=list')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.status === 'success' && data.groups && data.groups.length > 0) {
            data.groups.forEach(function (g) {
              var opt = document.createElement('option');
              opt.value = g.name;
              var total = g.leads_with_email || 0;
              var sent = g.drip_sent_count || 0;
              var unsub = g.unsub_count || 0;
              // El elemento <option> no admite colorear solo una parte del texto,
              // así que lo mostramos aquí y también podemos pintarlo de rojo en la interfaz si hiciera falta.
              var text = g.name + ' (' + total + ' leads, ' + sent + ' enviados)';
              if (unsub > 0) text += ' - ❗' + unsub + ' bajas';
              opt.textContent = text;
              opt.dataset.unsub = unsub;
              groupSelect.appendChild(opt);
            });
          }
        })
        .catch(function () { /* silenciar */ });

      window.updateUnsubWarning = function (sel) {
        var warning = document.getElementById('group_unsub_warning');
        if (sel.selectedIndex >= 0) {
          var opt = sel.options[sel.selectedIndex];
          var unsub = parseInt(opt.dataset.unsub || 0);
          if (unsub > 0) {
            warning.textContent = 'Atención: Este grupo tiene ' + unsub + ' bajas registradas (no se les enviará correo).';
            warning.style.display = 'block';
          } else {
            warning.style.display = 'none';
          }
        } else {
            warning.style.display = 'none';
        }
      };

      // Función global para cargar emails del grupo seleccionado
      window.loadLeadGroup = function () {
        var selectedGroup = groupSelect.value;
        if (!selectedGroup) {
          feedback.style.display = 'block';
          feedback.style.borderLeftColor = '#f59e0b';
          feedback.style.background = '#fffbeb';
          feedback.style.color = '#92400e';
          feedback.textContent = '\u26a0 Selecciona un grupo del desplegable.';
          return;
        }

        var btn = document.getElementById('load_group_btn');
        btn.textContent = 'Cargando...';
        btn.disabled = true;

        fetch('groups.php?action=emails&group=' + encodeURIComponent(selectedGroup))
          .then(function (res) { return res.json(); })
          .then(function (data) {
            btn.textContent = 'Cargar';
            btn.disabled = false;

            if (data.status === 'success' && data.emails && data.emails.length > 0) {
              var recipientInput = document.getElementById('recipient_email');
              recipientInput.value = data.emails.join(', ');
              
              feedback.style.display = 'block';
              feedback.style.borderLeftColor = '#4ade80';
              feedback.style.background = '#f0fdf4';
              feedback.style.color = '#15803d';
              feedback.textContent = '\u2705 ' + data.emails.length + ' destinatarios cargados desde \"' + selectedGroup + '\"';
            } else {
              feedback.style.display = 'block';
              feedback.style.borderLeftColor = '#f59e0b';
              feedback.style.background = '#fffbeb';
              feedback.style.color = '#92400e';
              feedback.textContent = '\u26a0 No se encontraron emails activos en el grupo \"' + selectedGroup + '\".';
            }
          })
          .catch(function (err) {
            btn.textContent = 'Cargar';
            btn.disabled = false;
            feedback.style.display = 'block';
            feedback.style.borderLeftColor = '#f87171';
            feedback.style.background = '#fdf2f2';
            feedback.style.color = '#b91c1c';
            feedback.textContent = '\u274c Error de conexi\u00f3n al cargar el grupo.';
          });
      };
    }());
  </script>
</body>
</html>
