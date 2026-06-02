<?php
/**
 * Standarte - Sistema de Contabilización de Visitas (Nominal Click Tracker)
 * 
 * Este script registra los clics realizados en los enlaces de los correos multimedia,
 * guarda la información detallada (email, IP, dispositivo, origen) en Supabase 
 * y redirige de forma fluida al usuario al destino especificado.
 */

// Evitar almacenamiento en caché para asegurar el registro en cada visita
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Cargar configuración de Supabase
$configFile = __DIR__ . '/supabase-config.php';
if (!is_file($configFile)) {
    $configFile = dirname(__DIR__) . '/supabase-config.php';
}
if (is_file($configFile)) {
    require_once $configFile;
}

// 1. Obtener parámetros de seguimiento
$emailBase64 = isset($_GET['email']) ? trim($_GET['email']) : '';
$destination = isset($_GET['to']) ? trim($_GET['to']) : '';
$source = isset($_GET['from']) ? htmlspecialchars($_GET['from']) : 'unknown';

// Decodificar el correo del visitante
$email = 'anonymous';
if (!empty($emailBase64)) {
    $decoded = base64_decode($emailBase64);
    if (filter_var($decoded, FILTER_VALIDATE_EMAIL)) {
        $email = $decoded;
    }
}

// Limpiar la URL de destino para evitar inyecciones de cabecera HTTP
// Si el destino es vacío, redirige a la home
if (empty($destination)) {
    $redirectUrl = '/';
} else {
    // Si empieza por http o https, redirigir directamente, si no, asegurar que empiece por barra
    if (preg_match('/^https?:\/\//i', $destination)) {
        $redirectUrl = $destination;
    } else {
        $redirectUrl = '/' . ltrim($destination, '/');
    }
}

// 2. Registrar en la base de datos de Supabase vía REST API (IPv4 compatible)
if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
    $clickData = [
        'email' => $email,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
        'referer' => $_SERVER['HTTP_REFERER'] ?? '',
        'source' => $source
    ];

    $ch = curl_init();
    $url = SUPABASE_URL . '/rest/v1/email_clicks';
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Permitir entornos locales MAMP
    curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Timeout rápido de 3 segundos para no bloquear la redirección
    
    $headers = [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json'
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($clickData));
    
    // Ejecutar de forma asíncrona rápida
    curl_exec($ch);
    curl_close($ch);
}

// 3. Sistema de Respaldo Local (clicks.json) por seguridad
$clicksFile = __DIR__ . '/admin/email_campaing/data/clicks.json';
if (!is_file($clicksFile)) {
    $clicksFile = dirname(__DIR__) . '/admin/email_campaing/data/clicks.json';
}
$clicksDir = dirname($clicksFile);

if (!is_dir($clicksDir)) {
    @mkdir($clicksDir, 0755, true);
}

$stats = array('total' => 0, 'history' => array());
if (is_file($clicksFile)) {
    $content = @file_get_contents($clicksFile);
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {
        $stats = $decoded;
    }
}

if (!isset($stats['total'])) $stats['total'] = 0;
if (!isset($stats['history'])) $stats['history'] = array();

$stats['total'] = (int)$stats['total'] + 1;

$clickLog = array(
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
    'referer' => $_SERVER['HTTP_REFERER'] ?? '',
    'source' => $source,
    'email' => $email
);

array_unshift($stats['history'], $clickLog);
if (count($stats['history']) > 100) {
    $stats['history'] = array_slice($stats['history'], 0, 100);
}

@file_put_contents($clicksFile, json_encode($stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// 4. Redirigir al usuario al destino
header("Location: " . $redirectUrl, true, 302);
exit;
