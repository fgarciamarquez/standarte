<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
$config = require __DIR__ . '/config.php';
require __DIR__ . '/template.php';

$category = $config['categories']['stands_madera'];
try {
    $previewHtml = campaign_build_email($config, $category, 'test@example.com', 'es', 'Test Subject', 'Test Intro', 'Test Body', 'Company');
    echo "SUCCESS\n";
    $escaped = htmlspecialchars($previewHtml, ENT_QUOTES, 'UTF-8');
    if ($escaped === '') {
        echo "htmlspecialchars FAILED! Invalid UTF-8 detected.\n";
    } else {
        echo "htmlspecialchars SUCCESS\n";
    }
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . " at line " . $e->getLine() . " in " . $e->getFile() . "\n";
}
