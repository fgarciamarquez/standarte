<?php
header('Content-Type: application/json; charset=utf-8');
$config = require_once 'config.php';
require_once 'template.php';
require_once 'mailer.php';

// Permitir peticiones POST solamente
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('success' => false, 'errors' => array('Método no permitido.')));
    exit;
}

// Leer entrada JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Fallback a POST normal por si acaso
    $input = $_POST;
}

$recipients = isset($input['recipients']) && is_array($input['recipients']) ? $input['recipients'] : array();
$selectedCategory = isset($input['category']) ? trim($input['category']) : '';
$selectedLanguage = isset($input['language']) ? trim($input['language']) : 'es';
$emailSubject = isset($input['subject']) ? trim($input['subject']) : '';
$emailIntro = isset($input['intro']) ? trim($input['intro']) : '';
$emailBody = isset($input['body']) ? trim($input['body']) : '';

$errors = array();

// Validaciones básicas
if (empty($recipients)) {
    $errors[] = 'No se proporcionaron destinatarios.';
}
if (!isset($config['categories'][$selectedCategory])) {
    $errors[] = 'Categoría no válida.';
}

if (!empty($errors)) {
    echo json_encode(array('success' => false, 'errors' => $errors));
    exit;
}

// Load Supabase Config
$configFile = dirname(dirname(__DIR__)) . '/supabase-config.php';
if (!is_file($configFile)) {
    $configFile = dirname(dirname(dirname(__DIR__))) . '/supabase-config.php';
}
if (is_file($configFile)) {
    require_once $configFile;
}

$category = $config['categories'][$selectedCategory];
$sentEmails = array();
$failedEmails = array();

foreach ($recipients as $email) {
    $email = trim($email);
    
    // Validate email format and DNS
    $email_error = '';
    if (!campaign_is_valid_email_advanced($email, $email_error)) {
        $failedEmails[] = $email . ' (' . $email_error . ')';
        if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
            $bounceData = [
                'email' => $email,
                'status' => 'bounced',
                'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error,
                'updated_at' => date('c')
            ];
            campaign_supabase_request('POST', 'contacts?on_conflict=email', $bounceData);
        }
        continue;
    }

    // Check exclusion list (LSSI/RGPD/Bounces) and fetch language
    $isExcluded = false;
    $excludeReason = '';
    $dbLanguage = null;
    if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
        $res = campaign_supabase_request('GET', 'contacts?email=eq.' . urlencode($email));
        if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
            $supaContact = $res['body'][0];
            $status = $supaContact['status'] ?? 'active';
            $dbLanguage = $supaContact['language'] ?? null;
            if ($status === 'unsubscribed') {
                $isExcluded = true;
                $excludeReason = "Envío omitido (Baja RGPD)";
            } else if ($status === 'bounced') {
                $isExcluded = true;
                $excludeReason = "Envío omitido (Rebotado)";
            }
        }
    }

    if ($isExcluded) {
        $failedEmails[] = $email . ' (' . $excludeReason . ')';
        continue;
    }

    // Intelligent Language Detection (DB first, then TLD fallback)
    if ($dbLanguage && in_array(strtolower($dbLanguage), ['es', 'en', 'de', 'pt', 'zh', 'hi'])) {
        $lang = strtolower($dbLanguage);
    } else {
        $tld = strtolower(substr(strrchr($email, '.'), 1));
        $lang = 'en'; // Default to English for international
        if ($tld === 'es') $lang = 'es';
        else if ($tld === 'de' || $tld === 'at' || $tld === 'ch') $lang = 'de';
        else if ($tld === 'pt' || $tld === 'br') $lang = 'pt';
        else if ($tld === 'cn' || $tld === 'zh' || $tld === 'tw') $lang = 'zh';
        else if ($tld === 'in') $lang = 'hi';
    }
    
    // Fetch default texts for the language
    $smartSubject = isset($category['translations'][$lang]['subject']) ? $category['translations'][$lang]['subject'] : (isset($category['subject']) ? $category['subject'] : '');
    $smartIntro = isset($category['translations'][$lang]['intro']) ? $category['translations'][$lang]['intro'] : (isset($category['intro']) ? $category['intro'] : '');
    $smartBody = isset($category['translations'][$lang]['body']) ? $category['translations'][$lang]['body'] : (isset($category['body']) ? $category['body'] : '');
    
    if ($lang === 'es' && isset($category['subject'])) {
         $smartSubject = $category['subject'];
         $smartIntro = $category['intro'];
         $smartBody = $category['body'];
    }

    $emailCompany = campaign_resolve_company_name($email, $lang, '', $smartSubject, $smartIntro, $smartBody);
    $processedSubject = campaign_process_placeholders($smartSubject, $emailCompany);
    $emailHtml = campaign_build_email($config, $category, $email, $lang, $processedSubject, $smartIntro, $smartBody, $emailCompany);

    if (campaign_send_mail($config, $email, $processedSubject, $emailHtml)) {
        $sentEmails[] = $email;
        if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
            $contactData = array(
                'email' => $email,
                'empresa' => $emailCompany,
                'feria' => 'Standarte',
                'categoria' => $category['label'],
                'status' => 'active',
                'drip_sent' => true,
                'updated_at' => date('c')
            );
            campaign_supabase_request('POST', 'contacts?on_conflict=email', $contactData);
        }
    } else {
        $failedEmails[] = $email;
    }
}

echo json_encode(array(
    'success' => true,
    'sent' => $sentEmails,
    'failed' => $failedEmails
));
