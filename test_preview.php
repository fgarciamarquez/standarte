<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$config = require __DIR__ . '/admin/email_campaing/config.php';
require __DIR__ . '/admin/email_campaing/template.php';

$category = $config['categories']['stands_madera'];
$previewRecipient = 'test@example.com';
$selectedLanguage = 'es';
$emailSubject = 'Test Subject';
$emailIntro = 'Test Intro';
$emailBody = 'Test Body';

try {
    $previewCompany = campaign_resolve_company_name($previewRecipient, $selectedLanguage, '', $emailSubject, $emailIntro, $emailBody);
    $previewSubject = campaign_process_placeholders($emailSubject, $previewCompany);
    $previewHtml = campaign_build_email($config, $category, $previewRecipient, $selectedLanguage, $previewSubject, $emailIntro, $emailBody, $previewCompany);
    
    echo "SUCCESS\n";
    echo substr($previewHtml, 0, 100) . "...\n";
    
    // Test htmlspecialchars
    $escaped = htmlspecialchars($previewHtml, ENT_QUOTES, 'UTF-8');
    if ($escaped === '') {
        echo "htmlspecialchars FAILED! Invalid UTF-8 detected.\n";
    } else {
        echo "htmlspecialchars SUCCESS\n";
    }
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . " at line " . $e->getLine() . " in " . $e->getFile() . "\n";
}
