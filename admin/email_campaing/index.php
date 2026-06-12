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
    if (preg_match('/Content-Range:\s*[0-9]+-[0-9]+\/([0-9]+)/i', $header, $matches)) {
        $count = (int)$matches[1];
    }
    curl_close($chCount);

    // Get history (latest 50)
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/email_clicks?select=email,source,clicked_at&order=clicked_at.desc&limit=50');
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

function campaign_get_active_drip_groups()
{
    $configFile = __DIR__ . '/../../supabase-config.php';
    if (!is_file($configFile)) {
        return array();
    }
    require_once $configFile;

    if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
        return array();
    }

    $dateWindowStart = date('Y-m-d', strtotime('+3 months')); 
    $dateWindowEnd = date('Y-m-d', strtotime('+5 months'));

    // Fetch active groups
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, SUPABASE_URL . '/rest/v1/lead_groups?select=name,event_date,leads_with_email&event_date=gte.' . $dateWindowStart . '&event_date=lte.' . $dateWindowEnd . '&order=event_date.asc');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $groups = json_decode($response, true);
    if (!is_array($groups) || isset($groups['code']) || isset($groups['message'])) {
        return array();
    }

    // Get sent counts from contacts
    $chSent = curl_init();
    curl_setopt($chSent, CURLOPT_URL, SUPABASE_URL . '/rest/v1/contacts?select=lead_group&drip_sent=is.true&limit=10000');
    curl_setopt($chSent, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chSent, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($chSent, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    $resSent = curl_exec($chSent);
    curl_close($chSent);
    
    $sentCounts = [];
    $dataSent = json_decode($resSent, true);
    if (is_array($dataSent)) {
        foreach ($dataSent as $c) {
            $lg = $c['lead_group'];
            if (!isset($sentCounts[$lg])) $sentCounts[$lg] = 0;
            $sentCounts[$lg]++;
        }
    }

    // Get sent counts from luz_contacts
    $chSentLuz = curl_init();
    curl_setopt($chSentLuz, CURLOPT_URL, SUPABASE_URL . '/rest/v1/luz_contacts?select=lead_group&drip_sent=is.true&limit=10000');
    curl_setopt($chSentLuz, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chSentLuz, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($chSentLuz, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    $resSentLuz = curl_exec($chSentLuz);
    curl_close($chSentLuz);
    
    $dataSentLuz = json_decode($resSentLuz, true);
    if (is_array($dataSentLuz)) {
        foreach ($dataSentLuz as $c) {
            $lg = $c['lead_group'];
            if (!isset($sentCounts[$lg])) $sentCounts[$lg] = 0;
            $sentCounts[$lg]++;
        }
    }

    foreach ($groups as &$g) {
        $g['sent_count'] = isset($sentCounts[$g['name']]) ? $sentCounts[$g['name']] : 0;
    }
    
    return $groups;
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

    $recipientEmails = campaign_parse_recipient_emails($recipientEmail);
    $invalidRecipientEmails = array();

    foreach ($recipientEmails as $email) {
        $email_error = '';
        if (!campaign_is_valid_email_advanced($email, $email_error)) {
            $invalidRecipientEmails[] = $email . ' (' . $email_error . ')';
        }
    }

    if ($campaignAction === 'send' && !$recipientEmails) {
        $errors[] = 'Introduzca al menos un correo electrónico válido.';
    }

    if ($campaignAction === 'send' && $invalidRecipientEmails) {
        $errors[] = 'Revise estos correos electrónicos: ' . implode(', ', $invalidRecipientEmails) . '.';
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
$activeDripGroups = campaign_get_active_drip_groups();
$sendLog = campaign_get_send_log();
$smtpReady = !empty($config['smtp']['enabled']) && !empty($config['smtp']['host']) && !empty($config['smtp']['username']) && !empty($config['smtp']['password']);

$cronStatus = array();
$cronStatusFile = __DIR__ . '/data/cron_status.json';
if (is_file($cronStatusFile)) {
    $cronStatus = json_decode(file_get_contents($cronStatusFile), true);
}

// Determinar el estado real del sistema autónomo
$isCronWarning = false;
$isCronError = false;
$isCronEmpty = empty($cronStatus);

if (!$isCronEmpty) {
    if (isset($cronStatus['status']) && $cronStatus['status'] === 'error') {
        $isCronError = true;
    }
    if (isset($cronStatus['last_run'])) {
        $lastRunTime = strtotime($cronStatus['last_run']);
        if ((time() - $lastRunTime) > (24 * 3600)) {
            $isCronWarning = true;
        }
    }
}

if ($isCronEmpty) {
    $statusColor = '#e74c3c'; // Rojo
    $statusBgColor = 'rgba(231, 76, 60, 0.08)';
    $statusBorderColor = 'rgba(231, 76, 60, 0.25)';
    $statusTextColor = '#c0392b';
    $statusLabel = 'Envío Autónomo Parado (Sin registro)';
} else if ($isCronError) {
    $statusColor = '#e74c3c'; // Rojo
    $statusBgColor = 'rgba(231, 76, 60, 0.08)';
    $statusBorderColor = 'rgba(231, 76, 60, 0.25)';
    $statusTextColor = '#c0392b';
    $statusLabel = 'Envío Autónomo con Fallos';
} else if ($isCronWarning) {
    $statusColor = '#e67e22'; // Naranja
    $statusBgColor = 'rgba(230, 126, 34, 0.08)';
    $statusBorderColor = 'rgba(230, 126, 34, 0.25)';
    $statusTextColor = '#d35400';
    $statusLabel = 'Envío Autónomo Inactivo (Parado)';
} else {
    $statusColor = '#2ecc71'; // Verde
    $statusBgColor = 'rgba(46, 204, 113, 0.08)';
    $statusBorderColor = 'rgba(46, 204, 113, 0.25)';
    $statusTextColor = '#27ae60';
    $statusLabel = 'Envío Autónomo Activo';
}
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
    details.send-log { background:#ffffff; border:1px solid #e1e4e8; margin:18px 0 0; padding:18px 22px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    details.send-log summary { cursor: pointer; outline: none; list-style: none; display: flex; align-items: center; justify-content: space-between; user-select: none; }
    details.send-log summary::-webkit-details-marker { display: none; }
    details.send-log h2 { font-size:1rem; margin:0; color:#111111; display: inline; }
    details.send-log p { border-top:1px solid #e1e4e8; color:#555555; font-size:.82rem; line-height:1.4; margin:0; padding:.55rem 0; }
    details.send-log b { color:#111111; }
    details.send-log .details-icon { font-size: 0.8rem; color: #888; transition: transform 0.2s ease; }
    details.send-log[open] .details-icon { transform: rotate(180deg); }
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
    
    :root {
      --status-color: <?php echo $statusColor; ?>;
      --status-bg: <?php echo $statusBgColor; ?>;
      --status-border: <?php echo $statusBorderColor; ?>;
      --status-text: <?php echo $statusTextColor; ?>;
      --status-hover-bg: <?php 
        if ($isCronEmpty || $isCronError) {
            echo 'rgba(231, 76, 60, 0.15)';
        } else if ($isCronWarning) {
            echo 'rgba(230, 126, 34, 0.15)';
        } else {
            echo 'rgba(46, 204, 113, 0.15)';
        }
      ?>;
    }
    /* System Status Indicator Styles */
    .system-status-indicator { display: flex; align-items: center; gap: 8px; background: var(--status-bg); border: 1px solid var(--status-border); padding: 7px 14px; border-radius: 20px; cursor: pointer; user-select: none; transition: background 0.2s ease, transform 0.1s ease; }
    .system-status-indicator:hover { background: var(--status-hover-bg); }
    .system-status-indicator:active { transform: scale(0.97); }
    .status-dot { width: 9px; height: 9px; background-color: var(--status-color); border-radius: 50%; box-shadow: 0 0 8px var(--status-color); animation: blink-dot 1.5s infinite ease-in-out; }
    .status-text { font-size: 0.8rem; font-weight: bold; color: var(--status-text); }
    @keyframes blink-dot {
      0%, 100% { opacity: 0.45; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 12px var(--status-color); }
    }
    
    /* Modal Overlay Styles */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
    .modal-content { background: #ffffff; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); border-top: 4px solid #2ecc71; animation: modal-appear 0.25s ease-out; overflow: hidden; }
    @keyframes modal-appear {
      from { opacity: 0; transform: translateY(-15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; }
    .modal-header h3 { margin: 0; font-size: 1.1rem; color: #111; font-weight: bold; }
    .close-btn { font-size: 1.5rem; cursor: pointer; color: #888; font-weight: bold; line-height: 1; }
    .close-btn:hover { color: #111; }
    .modal-body { padding: 20px; }
    .drip-groups-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .drip-groups-table th, .drip-groups-table td { text-align: left; padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 0.88rem; }
    .drip-groups-table th { background-color: #f9fafb; font-weight: bold; color: #555; }
    .drip-groups-table tr:hover td { background-color: #fcfdfd; }
  </style>
</head>
<body>
  <header>
    <h1>Gestor de Emails Multimedia · Standarte</h1>
    <div style="display:flex; gap:16px; align-items:center;">
      <div class="system-status-indicator" onclick="toggleDripGroupsModal()">
        <span class="status-dot"></span>
        <span class="status-text" id="system-status-text"><?php echo $statusLabel; ?></span>
      </div>
      <a href="manage_images.php" style="background:#ffc800; color:#111; padding:8px 16px; border-radius:20px; font-weight:bold; text-decoration:none; font-size:0.85rem; transition: opacity 0.2s ease;">Gestionar Imágenes</a>
      <a href="?logout=1">Cerrar Sesión</a>
    </div>
  </header>
  <main>
    <section>
      <div class="stats">
        <span>Visitas totales desde correos multimedia</span>
        <strong id="total-visits-counter"><?php echo number_format($totalEmailVisits, 0, ',', '.'); ?></strong>
      </div>
      <?php
      $smtpHost = isset($config['smtp']['host']) ? $config['smtp']['host'] : '';
      $smtpEnabled = !empty($config['smtp']['enabled']) && $smtpReady;
      $smtpUsername = isset($config['smtp']['username']) ? $config['smtp']['username'] : '';

      if ($smtpEnabled):
          $hostNameText = 'Personalizado';
          if (stripos($smtpHost, 'gmail.com') !== false || stripos($smtpHost, 'google.com') !== false) {
              $hostNameText = 'Google Workspace';
          } else if (stripos($smtpHost, 'ovh.net') !== false || stripos($smtpHost, 'ovh.com') !== false) {
              $hostNameText = 'OVH';
          }
      ?>
          <div class="smtp-status smtp-ok" style="border-left: 4px solid #2ecc71;">
            <b style="color: #27ae60;">Servidor SMTP de <?php echo $hostNameText; ?> Activo</b>
            <span>Los envíos de correo se realizan de forma segura y autenticada a través de <code><?php echo htmlspecialchars($smtpHost); ?></code> utilizando la dirección <code><?php echo htmlspecialchars($smtpUsername); ?></code>.</span>
          </div>
      <?php else: ?>
          <div class="smtp-status smtp-warning" style="border-left: 4px solid #e67e22; background: #fffbeb;">
            <b style="color: #d35400;">Servidor SMTP Inactivo o Desconectado</b>
            <span>El envío de correos a través de SMTP está desactivado en la configuración. Los envíos se realizarán a través de la función <code>mail()</code> predeterminada de PHP, lo que podría afectar la entregabilidad de los emails.</span>
          </div>
      <?php endif; ?>
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

        <input type="hidden" id="category" name="category" value="stands_madera">
        <input type="hidden" id="language" name="language" value="es">
        <input type="hidden" id="email_subject" name="email_subject" value="">
        <input type="hidden" id="email_intro" name="email_intro" value="">
        <input type="hidden" id="email_body" name="email_body" value="">
        
        <div style="background:#e0f2fe; border-left:4px solid #0ea5e9; color:#0369a1; padding:12px 16px; border-radius:4px; margin-bottom: 1.25rem; font-size: 0.9rem;">
            <strong>Modo Multilingüe Automático Activado</strong><br>
            El sistema detectará el país de cada destinatario según la extensión de su correo (.es, .de, .it...) y traducirá el asunto y los textos automáticamente usando la plantilla base. No necesitas configurar nada más.
        </div>

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
      <details class="send-log">
        <summary>
          <h2>Últimos accesos desde el correo</h2>
          <span class="details-icon">▼</span>
        </summary>
        <div style="margin-top: 10px;">
          <?php if (!$clicksHistory): ?>
            <p style="font-size:0.85rem;color:#888;">Nadie ha hecho clic en los correos todavía.</p>
          <?php endif; ?>
          <?php foreach ($clicksHistory as $click): ?>
            <p>
              <b><?php echo campaign_escape($click['email']); ?></b> (desde <i><?php echo campaign_escape($click['source']); ?></i>)<br>
              <span style="font-size:0.85rem;color:#888;"><?php echo campaign_escape(date('d/m/Y H:i:s', strtotime($click['clicked_at']))); ?></span>
            </p>
          <?php endforeach; ?>
        </div>
      </details>
      <details class="send-log">
        <summary>
          <h2>Registro de envíos locales</h2>
          <span class="details-icon">▼</span>
        </summary>
        <div style="margin-top: 10px;">
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
      </details>
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

      function refreshPreview() {
        action.value = 'preview';
        form.submit();
      }

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
            document.getElementById('recipient_email').value = '';
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
              
              // Trigger realtime update to refresh green digits after batch send
              if (typeof updateDripGroupsRealtime === 'function') {
                updateDripGroupsRealtime();
              }
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
            var currentCity = '';
            var currentOptgroup = null;
            
            data.groups.forEach(function (g) {
              var city = g.city || 'Otros';
              if (city !== currentCity) {
                currentCity = city;
                currentOptgroup = document.createElement('optgroup');
                currentOptgroup.label = currentCity;
                groupSelect.appendChild(currentOptgroup);
              }
              
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
              
              if (currentOptgroup) {
                currentOptgroup.appendChild(opt);
              } else {
                groupSelect.appendChild(opt);
              }
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

    // Actualización reactiva del contador de visitas en tiempo real cada 10 segundos
    (function() {
      setInterval(function() {
        fetch('groups.php?action=clicks_count')
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data.status === 'success' && typeof data.total === 'number') {
              var counter = document.getElementById('total-visits-counter');
              if (counter) {
                var formatted = new Intl.NumberFormat('es-ES').format(data.total);
                if (counter.textContent !== formatted) {
                  counter.textContent = formatted;
                }
              }
            }
          })
          .catch(function() {});
      }, 10000);
    }());
  </script>

  <!-- Drip groups details modal -->
  <div id="drip-groups-modal" class="modal-overlay" style="display:none;" onclick="closeDripGroupsModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h3>Envíos Autónomos Activos</h3>
        <span class="close-btn" onclick="toggleDripGroupsModal()">&times;</span>
      </div>
      <div class="modal-body">
        
        <!-- Estado del cronjob -->
        <?php
        $cardBg = '#f0fdf4';
        $cardBorder = '#dcfce7';
        $cardIconColor = '#16a34a';
        $cardIcon = '✓';
        $cardTitleColor = '#166534';
        $cardTitle = 'Sistema Autónomo Operativo';
        $cardTextColor = '#166534';
        
        if ($isCronEmpty) {
            $cardBg = '#fef2f2';
            $cardBorder = '#fecaca';
            $cardIconColor = '#dc2626';
            $cardIcon = '⚠';
            $cardTitleColor = '#991b1b';
            $cardTitle = 'Sistema Autónomo Parado';
            $cardTextColor = '#991b1b';
        } else if ($isCronError) {
            $cardBg = '#fef2f2';
            $cardBorder = '#fecaca';
            $cardIconColor = '#dc2626';
            $cardIcon = '⚠';
            $cardTitleColor = '#991b1b';
            $cardTitle = 'Error en Ejecución Autónoma';
            $cardTextColor = '#991b1b';
        } else if ($isCronWarning) {
            $cardBg = '#fffbeb';
            $cardBorder = '#fef3c7';
            $cardIconColor = '#d97706';
            $cardIcon = '⚠';
            $cardTitleColor = '#92400e';
            $cardTitle = 'Alerta de Inactividad';
            $cardTextColor = '#92400e';
        }
        ?>
        <div id="cron-status-container" style="background: <?php echo $cardBg; ?>; border: 1px solid <?php echo $cardBorder; ?>; border-radius: 6px; padding: 12px 14px; margin-bottom: 1.25rem; display: flex; align-items: flex-start; gap: 10px;">
          <div id="cron-status-icon" style="font-size: 1.25rem; color: <?php echo $cardIconColor; ?>; line-height: 1; font-weight: bold;">
            <?php echo $cardIcon; ?>
          </div>
          <div id="cron-status-text-wrapper" style="font-size: 0.82rem; line-height: 1.4; color: <?php echo $cardTextColor; ?>;">
            <div id="cron-status-title" style="font-weight: bold; font-size: 0.88rem; margin-bottom: 3px; color: <?php echo $cardTitleColor; ?>;">
              <?php echo $cardTitle; ?>
            </div>
            <div id="cron-status-details">
              <?php if ($isCronEmpty): ?>
                El sistema de correos autónomos no ha registrado ninguna actividad todavía (el archivo cron_status.json no existe). Por favor, asegúrese de que el cronjob del servidor está configurado.
              <?php else: 
                $lastRunTime = strtotime($cronStatus['last_run']);
              ?>
                Última ejecución: <strong><?php echo date('d/m/Y H:i:s', $lastRunTime); ?></strong><br>
                Siguiente ejecución en: <strong style="color: #e67e22; font-family: monospace; font-size: 0.95rem;" id="cron-countdown">--:--</strong><br>
                Resultado: <strong style="<?php echo $isCronError ? 'color:#dc2626;' : ''; ?>"><?php echo $cronStatus['status'] === 'success' ? 'Correcto' : 'Fallo (Error)'; ?></strong>
                <?php if (isset($cronStatus['sent_count'])): ?>
                  · Enviados: <strong><?php echo intval($cronStatus['sent_count']); ?> emails</strong>
                <?php endif; ?>
                <br>Detalle: <em><?php echo htmlspecialchars($cronStatus['message']); ?></em>
                <?php if ($isCronWarning): ?>
                  <div style="margin-top: 6px; font-weight: bold; color: #b45309;">
                    Aviso: No se ha detectado ninguna ejecución en las últimas 24 horas.
                  </div>
                <?php endif; ?>
              <?php endif; ?>
            </div>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: #555; margin: 0 0 0.75rem 0; font-weight: bold;">Listas en ventana de envío (3 a 5 meses):</p>
        <?php if (empty($activeDripGroups)): ?>
          <p style="font-weight: bold; color: #f39c12; text-align: center; margin: 1.5rem 0; font-size: 0.9rem;">No hay ningún grupo activo en la ventana de 3-5 meses en este momento.</p>
        <?php else: ?>
          <table class="drip-groups-table">
            <thead>
              <tr>
                <th>Nombre del Grupo</th>
                <th>Fecha del Evento</th>
                <th>Enviados / Total</th>
                <th>Antelación</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($activeDripGroups as $g): 
                $daysLeft = (strtotime($g['event_date']) - time()) / (24 * 3600);
                $monthsLeft = round($daysLeft / 30, 1);
                $totalLeads = isset($g['leads_with_email']) ? intval($g['leads_with_email']) : 0;
                $sentCount = isset($g['sent_count']) ? intval($g['sent_count']) : 0;
              ?>
                <tr data-group-row="<?php echo htmlspecialchars($g['name']); ?>">
                  <td><b><?php echo htmlspecialchars($g['name']); ?></b></td>
                  <td><?php echo htmlspecialchars(date('d/m/Y', strtotime($g['event_date']))); ?></td>
                  <td>
                    <span data-group-sent="<?php echo htmlspecialchars($g['name']); ?>" style="color: #27ae60; font-weight: bold; transition: color 1s ease, text-shadow 1s ease;"><?php echo $sentCount; ?></span>
                    <span style="color: #888;"> / <span data-group-total="<?php echo htmlspecialchars($g['name']); ?>"><?php echo $totalLeads; ?></span></span>
                  </td>
                  <td>Faltan <b><?php echo $monthsLeft; ?> m</b> (<?php echo round($daysLeft); ?> d)</td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        <?php endif; ?>
        <div style="margin-top: 1.25rem; font-size: 0.8rem; color: #555; border-top: 1px solid #eee; padding-top: 0.75rem; line-height: 1.4; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <span>* El cronjob automático procesa un máximo de 15 correos por hora.</span>
          <button id="btn-modal-depurar" onclick="runModalDepurarRebotes()" style="background: #2c3e50; color: #ffffff; text-decoration: none; padding: 6px 12px; font-size: 0.78rem; border-radius: 4px; font-weight: bold; border: 1px solid #ffc800; display: inline-flex; align-items: center; gap: 5px; cursor: pointer; transition: background 0.2s; outline: none;">
            <span id="btn-modal-depurar-text">🛡️ Depurar Rebotes (IMAP)</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    function runModalDepurarRebotes() {
      var btn = document.getElementById('btn-modal-depurar');
      var btnText = document.getElementById('btn-modal-depurar-text');
      
      btn.disabled = true;
      btn.style.opacity = '0.7';
      btnText.textContent = '⏳ Depurando rebotes...';
      
      fetch('../../bounce-handler.php?cron=1&token=b356d78a8f192b0c95098e94a861d8a2')
        .then(function(res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function(data) {
          btn.disabled = false;
          btn.style.opacity = '1';
          if (data.success) {
            btnText.textContent = '✓ ' + (data.processed_count || 0) + ' correos limpiados';
            btn.style.background = '#27ae60';
            btn.style.borderColor = '#2ecc71';
            // Recargar datos reactivos
            setTimeout(function() {
              updateDripGroupsRealtime();
            }, 1000);
            // Restablecer botón
            setTimeout(function() {
              btnText.textContent = '🛡️ Depurar Rebotes (IMAP)';
              btn.style.background = '#2c3e50';
              btn.style.borderColor = '#ffc800';
            }, 5000);
          } else {
            var errMsg = 'Error desconocido al depurar rebotes.';
            if (data.errors && data.errors.length > 0) {
              errMsg = data.errors.join('\n');
            } else if (data.error) {
              errMsg = data.error;
            }
            alert('Fallo en la depuración:\n' + errMsg);
            btnText.textContent = '❌ Falló la depuración';
            btn.style.background = '#c0392b';
            btn.style.borderColor = '#e74c3c';
            setTimeout(function() {
              btnText.textContent = '🛡️ Depurar Rebotes (IMAP)';
              btn.style.background = '#2c3e50';
              btn.style.borderColor = '#ffc800';
            }, 5000);
          }
        })
        .catch(function(err) {
          btn.disabled = false;
          btn.style.opacity = '1';
          alert('Error de conexión o ejecución:\n' + (err.message || err));
          btnText.textContent = '❌ Error de conexión';
          btn.style.background = '#c0392b';
          btn.style.borderColor = '#e74c3c';
          console.error(err);
          setTimeout(function() {
            btnText.textContent = '🛡️ Depurar Rebotes (IMAP)';
            btn.style.background = '#2c3e50';
            btn.style.borderColor = '#ffc800';
          }, 5000);
        });
    }

    function updateDripGroupsRealtime() {
      fetch('groups.php?action=active_drip_groups')
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data.status === 'success') {
            // Update active groups table
            if (data.groups) {
              data.groups.forEach(function(g) {
                var sentEl = document.querySelector('[data-group-sent="' + g.name + '"]');
                var totalEl = document.querySelector('[data-group-total="' + g.name + '"]');
                if (sentEl) {
                  var newSent = parseInt(g.sent_count || 0);
                  if (parseInt(sentEl.textContent) !== newSent) {
                    sentEl.textContent = newSent;
                    // Flash effect
                    sentEl.style.transition = 'none';
                    sentEl.style.color = '#2ecc71';
                    sentEl.style.textShadow = '0 0 10px #2ecc71';
                    setTimeout(function() {
                      sentEl.style.transition = 'color 1s ease, text-shadow 1s ease';
                      sentEl.style.color = '#27ae60';
                      sentEl.style.textShadow = 'none';
                    }, 100);
                  }
                }
                if (totalEl) {
                  var newTotal = parseInt(g.leads_with_email || 0);
                  if (parseInt(totalEl.textContent) !== newTotal) {
                    totalEl.textContent = newTotal;
                  }
                }
              });
            }

            // Update cron status card
            if (data.cron_status) {
              var isEmpty = !data.cron_status || Object.keys(data.cron_status).length === 0;
              var isError = !isEmpty && data.cron_status.status === 'error';
              var isWarning = false;
              var lastRun = null;
              if (!isEmpty && data.cron_status.last_run) {
                window.lastCronRunTime = data.cron_status.last_run;
                lastRun = new Date(data.cron_status.last_run);
                var diffMs = new Date() - lastRun;
                isWarning = diffMs > (24 * 3600 * 1000);
              }
              
              var container = document.getElementById('cron-status-container');
              var icon = document.getElementById('cron-status-icon');
              var title = document.getElementById('cron-status-title');
              var details = document.getElementById('cron-status-details');
              var textWrapper = document.getElementById('cron-status-text-wrapper');
              var root = document.documentElement;
              var systemStatusText = document.getElementById('system-status-text');
              
              if (isEmpty) {
                root.style.setProperty('--status-color', '#e74c3c');
                root.style.setProperty('--status-bg', 'rgba(231, 76, 60, 0.08)');
                root.style.setProperty('--status-border', 'rgba(231, 76, 60, 0.25)');
                root.style.setProperty('--status-text', '#c0392b');
                root.style.setProperty('--status-hover-bg', 'rgba(231, 76, 60, 0.15)');
                if (systemStatusText) systemStatusText.textContent = 'Envío Autónomo Parado (Sin registro)';
                
                if (container) {
                  container.style.background = '#fef2f2';
                  container.style.borderColor = '#fecaca';
                }
                if (icon) {
                  icon.style.color = '#dc2626';
                  icon.textContent = '⚠';
                }
                if (title) {
                  title.style.color = '#991b1b';
                  title.textContent = 'Sistema Autónomo Parado';
                }
                if (textWrapper) {
                  textWrapper.style.color = '#991b1b';
                }
                if (details) {
                  details.innerHTML = 'El sistema de correos autónomos no ha registrado ninguna actividad todavía (el archivo cron_status.json no existe). Por favor, asegúrese de que el cronjob del servidor está configurado.';
                }
              } else if (isError) {
                root.style.setProperty('--status-color', '#e74c3c');
                root.style.setProperty('--status-bg', 'rgba(231, 76, 60, 0.08)');
                root.style.setProperty('--status-border', 'rgba(231, 76, 60, 0.25)');
                root.style.setProperty('--status-text', '#c0392b');
                root.style.setProperty('--status-hover-bg', 'rgba(231, 76, 60, 0.15)');
                if (systemStatusText) systemStatusText.textContent = 'Envío Autónomo con Fallos';
                
                if (container) {
                  container.style.background = '#fef2f2';
                  container.style.borderColor = '#fecaca';
                }
                if (icon) {
                  icon.style.color = '#dc2626';
                  icon.textContent = '⚠';
                }
                if (title) {
                  title.style.color = '#991b1b';
                  title.textContent = 'Error en Ejecución Autónoma';
                }
                if (textWrapper) {
                  textWrapper.style.color = '#991b1b';
                }
                
                if (details) {
                  var pad = function(n) { return n < 10 ? '0' + n : n; };
                  var dateStr = pad(lastRun.getDate()) + '/' + pad(lastRun.getMonth() + 1) + '/' + lastRun.getFullYear() + ' ' + 
                                pad(lastRun.getHours()) + ':' + pad(lastRun.getMinutes()) + ':' + pad(lastRun.getSeconds());
                  details.innerHTML = 'Última ejecución: <strong>' + dateStr + '</strong><br>' +
                                      'Siguiente ejecución en: <strong style="color: #e67e22; font-family: monospace; font-size: 0.95rem;" id="cron-countdown">--:--</strong><br>' +
                                      'Resultado: <strong style="color: #dc2626;">Fallo (Error)</strong><br>' +
                                      'Detalle: <em>' + (data.cron_status.message || '') + '</em>';
                  if (typeof updateCronCountdown === 'function') updateCronCountdown();
                }
              } else if (isWarning) {
                root.style.setProperty('--status-color', '#e67e22');
                root.style.setProperty('--status-bg', 'rgba(230, 126, 34, 0.08)');
                root.style.setProperty('--status-border', 'rgba(230, 126, 34, 0.25)');
                root.style.setProperty('--status-text', '#d35400');
                root.style.setProperty('--status-hover-bg', 'rgba(230, 126, 34, 0.15)');
                if (systemStatusText) systemStatusText.textContent = 'Envío Autónomo Inactivo (Parado)';
                
                if (container) {
                  container.style.background = '#fffbeb';
                  container.style.borderColor = '#fef3c7';
                }
                if (icon) {
                  icon.style.color = '#d97706';
                  icon.textContent = '⚠';
                }
                if (title) {
                  title.style.color = '#92400e';
                  title.textContent = 'Alerta de Inactividad';
                }
                if (textWrapper) {
                  textWrapper.style.color = '#92400e';
                }
                
                if (details) {
                  var pad = function(n) { return n < 10 ? '0' + n : n; };
                  var dateStr = pad(lastRun.getDate()) + '/' + pad(lastRun.getMonth() + 1) + '/' + lastRun.getFullYear() + ' ' + 
                                pad(lastRun.getHours()) + ':' + pad(lastRun.getMinutes()) + ':' + pad(lastRun.getSeconds());
                  
                  var html = 'Última ejecución: <strong>' + dateStr + '</strong><br>' +
                             'Siguiente ejecución en: <strong style="color: #e67e22; font-family: monospace; font-size: 0.95rem;" id="cron-countdown">--:--</strong><br>' +
                             'Resultado: <strong>Correcto</strong>';
                  if (typeof data.cron_status.sent_count !== 'undefined') {
                    html += ' · Enviados: <strong>' + parseInt(data.cron_status.sent_count) + ' emails</strong>';
                  }
                  html += '<br>Detalle: <em>' + (data.cron_status.message || '') + '</em>' +
                          '<div style="margin-top: 6px; font-weight: bold; color: #b45309;">Aviso: No se ha detectado ninguna ejecución en las últimas 24 horas.</div>';
                  details.innerHTML = html;
                  if (typeof updateCronCountdown === 'function') updateCronCountdown();
                }
              } else {
                root.style.setProperty('--status-color', '#2ecc71');
                root.style.setProperty('--status-bg', 'rgba(46, 204, 113, 0.08)');
                root.style.setProperty('--status-border', 'rgba(46, 204, 113, 0.25)');
                root.style.setProperty('--status-text', '#27ae60');
                root.style.setProperty('--status-hover-bg', 'rgba(46, 204, 113, 0.15)');
                if (systemStatusText) systemStatusText.textContent = 'Envío Autónomo Activo';
                
                if (container) {
                  container.style.background = '#f0fdf4';
                  container.style.borderColor = '#dcfce7';
                }
                if (icon) {
                  icon.style.color = '#16a34a';
                  icon.textContent = '✓';
                }
                if (title) {
                  title.style.color = '#166534';
                  title.textContent = 'Sistema Autónomo Operativo';
                }
                if (textWrapper) {
                  textWrapper.style.color = '#166534';
                }
                
                if (details) {
                  var pad = function(n) { return n < 10 ? '0' + n : n; };
                  var dateStr = pad(lastRun.getDate()) + '/' + pad(lastRun.getMonth() + 1) + '/' + lastRun.getFullYear() + ' ' + 
                                pad(lastRun.getHours()) + ':' + pad(lastRun.getMinutes()) + ':' + pad(lastRun.getSeconds());
                  
                  var html = 'Última ejecución: <strong>' + dateStr + '</strong><br>' +
                             'Siguiente ejecución en: <strong style="color: #e67e22; font-family: monospace; font-size: 0.95rem;" id="cron-countdown">--:--</strong><br>' +
                             'Resultado: <strong>Correcto</strong>';
                  if (typeof data.cron_status.sent_count !== 'undefined') {
                    html += ' · Enviados: <strong>' + parseInt(data.cron_status.sent_count) + ' emails</strong>';
                  }
                  html += '<br>Detalle: <em>' + (data.cron_status.message || '') + '</em>';
                  details.innerHTML = html;
                  if (typeof updateCronCountdown === 'function') updateCronCountdown();
                }
              }
            }
          }
        })
        .catch(function() {});
    }

    function toggleDripGroupsModal() {
      var modal = document.getElementById('drip-groups-modal');
      modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
      if (modal.style.display === 'flex') {
        updateDripGroupsRealtime();
      }
    }
    function closeDripGroupsModal(e) {
      document.getElementById('drip-groups-modal').style.display = 'none';
    }

    // Poll active drip groups every 5 seconds when the modal is open
    setInterval(function() {
      var modal = document.getElementById('drip-groups-modal');
      if (modal && modal.style.display === 'flex') {
        updateDripGroupsRealtime();
      }
    }, 5000);

    // Cuenta atrás del cronjob (1 segundo) reactiva con sincronización de hora del servidor
    window.lastCronRunTime = <?php echo isset($cronStatus['last_run']) ? json_encode($cronStatus['last_run']) : 'null'; ?>;
    var serverTimeAtLoad = new Date(<?php echo json_encode(date('c')); ?>);
    var clientTimeAtLoad = new Date();
    window.serverClientOffsetMs = serverTimeAtLoad.getTime() - clientTimeAtLoad.getTime();
    
    function updateCronCountdown() {
      var countdownEl = document.getElementById('cron-countdown');
      if (!countdownEl || !window.lastCronRunTime) return;
      
      var lastRun = new Date(window.lastCronRunTime);
      var nextRun = new Date(lastRun.getTime() + 60 * 60 * 1000); // 1 hora
      var now = new Date(new Date().getTime() + (window.serverClientOffsetMs || 0));
      var diffMs = nextRun - now;
      
      if (diffMs <= 0) {
        countdownEl.textContent = 'Inminente / Ejecutando';
        return;
      }
      
      var totalSeconds = Math.floor(diffMs / 1000);
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;
      
      var pad = function(n) { return n < 10 ? '0' + n : n; };
      countdownEl.textContent = pad(minutes) + ':' + pad(seconds);
    }
    
    // Iniciar cuenta atrás inmediatamente y en cada segundo
    updateCronCountdown();
    setInterval(updateCronCountdown, 1000);
  </script>
</body>
</html>
