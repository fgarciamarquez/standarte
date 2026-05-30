<?php
/**
 * Standarte - Sistema de Contabilización de Visitas (Click Tracker)
 * 
 * Este script registra los clics realizados en los enlaces de los correos multimedia,
 * incrementando de forma segura el contador en `clicks.json` y redirigiendo al usuario
 * al sitio web principal.
 */

// Evitar almacenamiento en caché para asegurar el registro en cada visita
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Ruta del archivo JSON del contador
$clicksFile = __DIR__ . '/admin/email_campaing/data/clicks.json';
$clicksDir = dirname($clicksFile);

// Asegurarse de que el directorio del log exista
if (!is_dir($clicksDir)) {
    mkdir($clicksDir, 0755, true);
}

// Inicializar estructura si el archivo no existe o está vacío
$stats = array('total' => 0, 'history' => array());
if (is_file($clicksFile)) {
    $content = file_get_contents($clicksFile);
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {
        $stats = $decoded;
        if (!isset($stats['total'])) {
            $stats['total'] = 0;
        }
        if (!isset($stats['history'])) {
            $stats['history'] = array();
        }
    }
}

// Incrementar el contador total de visitas
$stats['total'] = (int)$stats['total'] + 1;

// Registrar metadatos del clic para auditoría avanzada (máximo 100 últimos clics)
$clickLog = array(
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
    'referer' => $_SERVER['HTTP_REFERER'] ?? '',
    'source' => isset($_GET['from']) ? htmlspecialchars($_GET['from']) : 'unknown'
);

array_unshift($stats['history'], $clickLog);
// Mantener los últimos 100 registros en el historial detallado
if (count($stats['history']) > 100) {
    $stats['history'] = array_slice($stats['history'], 0, 100);
}

// Guardar de forma atómica y segura con bloqueo exclusivo de escritura
file_put_contents($clicksFile, json_encode($stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// Redirigir de manera segura al usuario a la página de inicio del sitio
header("Location: /", true, 302);
exit;
