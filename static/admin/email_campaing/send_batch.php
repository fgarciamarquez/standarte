<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'config.php';
require_once 'template.php';
require_once 'mailer.php';
require_once 'leads.php'; // Required for company name resolution

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
if (!isset($config['languages'][$selectedLanguage])) {
    $errors[] = 'Idioma no válido.';
}
if ($emailSubject === '') {
    $errors[] = 'El asunto está vacío.';
}

if (!empty($errors)) {
    echo json_encode(array('success' => false, 'errors' => $errors));
    exit;
}

$category = $config['categories'][$selectedCategory];
$sentEmails = array();
$failedEmails = array();

foreach ($recipients as $email) {
    $email = trim($email);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $failedEmails[] = $email;
        continue;
    }

    $emailCompany = campaign_resolve_company_name($email, $selectedLanguage, '', $emailSubject, $emailIntro, $emailBody);
    $processedSubject = campaign_process_placeholders($emailSubject, $emailCompany);
    $emailHtml = campaign_build_email($config, $category, $email, $selectedLanguage, $processedSubject, $emailIntro, $emailBody, $emailCompany);

    if (campaign_send_mail($config, $email, $processedSubject, $emailHtml)) {
        $sentEmails[] = $email;
    } else {
        $failedEmails[] = $email;
    }
}

echo json_encode(array(
    'success' => true,
    'sent' => $sentEmails,
    'failed' => $failedEmails
));
