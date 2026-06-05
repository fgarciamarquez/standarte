<?php
session_start();
$_SESSION['standarte_email_campaing_auth'] = true;
$_SERVER['REQUEST_METHOD'] = 'GET';
ob_start();
try {
    require __DIR__ . '/index.php';
} catch (Throwable $e) {
    echo "\n\nFATAL ERROR CAUGHT: " . $e->getMessage() . " at " . $e->getFile() . ":" . $e->getLine();
}
$output = ob_get_clean();
echo $output;
