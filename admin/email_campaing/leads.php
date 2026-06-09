<?php

// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');

// Only allow POST requests (allow CLI mode for testing)
if (php_sapi_name() !== 'cli' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Method Not Allowed. This endpoint only accepts POST requests.'
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Read raw body input (allow CLI file path argument or stdin fallback for testing)
$rawInput = '';
if (php_sapi_name() === 'cli') {
    global $argv;
    if (isset($argv[1]) && is_file($argv[1])) {
        $rawInput = file_get_contents($argv[1]);
    } else {
        $rawInput = file_get_contents('php://stdin');
    }
} else {
    $rawInput = file_get_contents('php://input');
}
$data = json_decode($rawInput, true);

// Check if JSON is valid
if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Invalid JSON payload received.'
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Validate Token
$token = isset($data['token']) ? $data['token'] : '';
if ($token !== 'STANDARTE_MAIL_SECURE_2026') {
    http_response_code(401);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Unauthorized. The provided token is invalid.'
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Verify that records is a valid array
$records = isset($data['records']) ? $data['records'] : null;
if (!is_array($records)) {
    http_response_code(400);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Invalid payload format. Missing or invalid "records" array.'
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Load dependencies
$config = require __DIR__ . '/config.php';
require __DIR__ . '/template.php';
require __DIR__ . '/mailer.php';

// Safe lowercase polyfill to handle systems without mbstring extension
function campaign_safe_lowercase($str) {
    if (function_exists('mb_strtolower')) {
        return mb_strtolower($str, 'UTF-8');
    }
    return strtolower($str);
}

$processedCount = 0;
$sentCount = 0;
$failedCount = 0;
$errors = array();
$successfullySentCompanies = array();

foreach ($records as $record) {
    if (!is_array($record)) {
        $failedCount++;
        $errors[] = array(
            'record_index' => $processedCount,
            'message' => 'Record is not an object/array.'
        );
        $processedCount++;
        continue;
    }

    $email = isset($record['email']) ? trim($record['email']) : '';
    $subject = isset($record['asunto']) ? trim($record['asunto']) : '';
    
    // Support cuerpo1 and cuerpo2 concatenation
    if (isset($record['cuerpo1']) || isset($record['cuerpo2'])) {
        $c1 = isset($record['cuerpo1']) ? trim($record['cuerpo1']) : '';
        $c2 = isset($record['cuerpo2']) ? trim($record['cuerpo2']) : '';
        $cuerpo = trim($c1 . "\n\n" . $c2);
    } else {
        $cuerpo = isset($record['cuerpo']) ? trim($record['cuerpo']) : '';
    }
    
    // Support both "nombre" and "empresa" for company names
    $companyName = isset($record['nombre']) ? trim($record['nombre']) : (isset($record['empresa']) ? trim($record['empresa']) : '');
    
    // Support both "categoría" and "categoria"
    $recordCategory = isset($record['categoría']) ? trim($record['categoría']) : (isset($record['categoria']) ? trim($record['categoria']) : '');

    // Validate required fields
    if ($email === '' || $recordCategory === '') {
        $failedCount++;
        $errors[] = array(
            'record_index' => $processedCount,
            'email' => $email,
            'message' => 'Missing one or more required fields: email, categoría.'
        );
        $processedCount++;
        continue;
    }

    // Validate email format with advanced bounce avoidance (Syntax + Disposable + DNS MX check)
    $email_error = '';
    if (!campaign_is_valid_email_advanced($email, $email_error)) {
        $failedCount++;
        $errors[] = array(
            'record_index' => $processedCount,
            'email' => $email,
            'message' => $email_error
        );
        if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
            $bounceData = [
                'email' => $email,
                'status' => 'bounced',
                'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error,
                'updated_at' => date('c')
            ];
            campaign_supabase_request('POST', 'contacts?on_conflict=email', $bounceData);
        }
        $processedCount++;
        continue;
    }

    // Check exclusion list (LSSI/RGPD/Bounces) in Supabase
    $isExcluded = false;
    $excludeReason = '';
    if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
        $res = campaign_supabase_request('GET', 'contacts?email=eq.' . urlencode($email));
        if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
            $supaContact = $res['body'][0];
            $status = $supaContact['status'] ?? 'active';
            if ($status === 'unsubscribed') {
                $isExcluded = true;
                $excludeReason = "Envío omitido: El destinatario se dio de baja voluntariamente (LSSI/RGPD).";
            } else if ($status === 'bounced') {
                $isExcluded = true;
                $excludeReason = "Envío omitido: La dirección de correo electrónico está rebotada/fallida.";
            }
        }
    }

    if ($isExcluded) {
        $failedCount++;
        $errors[] = array(
            'record_index' => $processedCount,
            'email' => $email,
            'message' => $excludeReason
        );
        $processedCount++;
        continue;
    }


    // Map category
    $categoryKey = '';
    $normalizedCategory = campaign_safe_lowercase($recordCategory);

    foreach ($config['categories'] as $key => $catConfig) {
        if (campaign_safe_lowercase($key) === $normalizedCategory || campaign_safe_lowercase($catConfig['label']) === $normalizedCategory) {
            $categoryKey = $key;
            break;
        }
    }

    // If category is not matched, fallback to 'stands_madera'
    if ($categoryKey === '') {
        $categoryKey = 'stands_madera';
    }

    $category = $config['categories'][$categoryKey];

    // Map language (support both "idioma" and "lang", default to "es")
    $lang = isset($record['idioma']) ? trim($record['idioma']) : (isset($record['lang']) ? trim($record['lang']) : 'es');
    if (!isset($config['languages'][$lang])) {
        $lang = 'es';
    }

    // Clean subject (similar to campaign_clean_subject)
    if ($subject !== '') {
        $cleanSubject = strip_tags($subject);
        $cleanSubject = str_replace(array("\r", "\n"), ' ', $cleanSubject);
        $cleanSubject = preg_replace('/\s+/', ' ', $cleanSubject);
        $cleanSubject = trim($cleanSubject);
    } else {
        $cleanSubject = campaign_text($category, $lang, 'subject');
    }

    // Split cuerpo by double newlines into intro and body
    if ($cuerpo !== '') {
        $cuerpoNormalized = str_replace("\r\n", "\n", $cuerpo);
        $paragraphs = preg_split('/\n{2,}/', $cuerpoNormalized);

        if (count($paragraphs) > 1) {
            $emailIntro = trim($paragraphs[0]);
            $emailBody = trim(implode("\n\n", array_slice($paragraphs, 1)));
        } else {
            $emailIntro = $cuerpo;
            $emailBody = ' '; // Avoid triggering fallback default text in template.php
        }
    } else {
        $emailIntro = ''; // Will fall back to default intro in template.php
        $emailBody = '';  // Will fall back to default body in template.php
    }

    try {
        $category = $config['categories'][$categoryKey];
        $emailCompany = campaign_resolve_company_name($email, $lang, $companyName, $cleanSubject, $emailIntro, $emailBody);
        $processedSubject = campaign_process_placeholders($cleanSubject, $emailCompany);
        $emailHtml = campaign_build_email($config, $category, $email, $lang, $processedSubject, $emailIntro, $emailBody, $emailCompany);
        
        $sent = campaign_send_mail($config, $email, $processedSubject, $emailHtml);
        
        if ($sent) {
            $sentCount++;
            $successfullySentCompanies[] = $emailCompany !== '' ? $emailCompany : $email;
        } else {
            $failedCount++;
            $errors[] = array(
                'record_index' => $processedCount,
                'email' => $email,
                'message' => 'The mail server rejected the email. Check MAMP logs or mailer settings.'
            );
        }
    } catch (Exception $e) {
        $failedCount++;
        $errors[] = array(
            'record_index' => $processedCount,
            'email' => $email,
            'message' => 'Exception occurred: ' . $e->getMessage()
        );
    }

    $processedCount++;
}

// Send summary notification email to javier@standarte.es
if ($processedCount > 0) {
    $currentDate = date('d/m/Y H:i');
    $notificationSubject = 'Multimedia enviado ' . $currentDate;
    
    $companiesListHtml = '<p>No se enviaron correos con éxito en este lote.</p>';
    if (!empty($successfullySentCompanies)) {
        $companiesListHtml = '<ul>';
        foreach ($successfullySentCompanies as $comp) {
            $companiesListHtml .= '<li>' . htmlspecialchars($comp, ENT_QUOTES, 'UTF-8') . '</li>';
        }
        $companiesListHtml .= '</ul>';
    }

    $notificationHtml = '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>' . htmlspecialchars($notificationSubject, ENT_QUOTES, 'UTF-8') . '</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f7f6f1; color: #252525; padding: 20px; }
        .container { background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        h1 { font-family: Georgia, serif; font-size: 22px; color: #111; border-bottom: 2px solid #ffc800; padding-bottom: 10px; margin-top: 0; }
        ul { padding-left: 20px; line-height: 1.6; }
        li { margin-bottom: 8px; }
        .footer { font-size: 11px; color: #777; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px; }
        .success-accent { color: #2ecc71; font-weight: bold; }
        .danger-accent { color: #ff4444; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Notificación de Envío Multimedia</h1>
        <p>Se ha completado el procesamiento del archivo JSON recibido desde el proveedor de leads.</p>
        <p><strong>Resumen de ejecución:</strong></p>
        <ul>
            <li>Total registros procesados: <strong>' . $processedCount . '</strong></li>
            <li>Envíos aceptados por el servidor: <span class="success-accent">' . $sentCount . '</span></li>
            <li>Envíos fallidos: <span class="danger-accent">' . $failedCount . '</span></li>
        </ul>
        <h3>Lista de Empresas / Destinatarios Enviados:</h3>
        ' . $companiesListHtml . '
        <div class="footer">
            Gestor de Campañas Standarte · Notificación automática generada el ' . $currentDate . '
        </div>
    </div>
</body>
</html>';

    // Send the notification email to javier@standarte.es
    campaign_send_mail($config, 'javier@standarte.es', $notificationSubject, $notificationHtml);
}

// Determine status
$status = ($failedCount === 0) ? 'success' : (($sentCount > 0) ? 'partial_success' : 'error');

// Set appropriate HTTP response code
if ($status === 'error' && $processedCount > 0) {
    http_response_code(500);
} else {
    http_response_code(200);
}

// Return JSON response
echo json_encode(array(
    'status' => $status,
    'processed' => $processedCount,
    'sent' => $sentCount,
    'failed' => $failedCount,
    'errors' => $errors
), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
