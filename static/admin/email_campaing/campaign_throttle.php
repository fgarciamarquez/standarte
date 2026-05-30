<?php
/**
 * Standarte - Control de Envío Único por Empresa (Frecuencia de 1 Mes)
 * 
 * Este archivo implementa las reglas de negocio para impedir el envío de correos 
 * multimedia repetidos a la misma empresa o correo electrónico antes de transcurrir 1 mes (30 días).
 */

/**
 * Comprueba si un destinatario (por email o nombre de empresa) ya ha recibido un correo en los últimos 30 días.
 * 
 * @param string $email Correo electrónico del lead.
 * @param string $companyName Nombre de la empresa.
 * @param string $historyFile Ruta absoluta al archivo JSON de historial de envíos.
 * @return int|false El timestamp del último envío si está bloqueado, o false si se permite enviar.
 */
function campaign_check_throttle($email, $companyName, $historyFile) {
    if (!is_file($historyFile)) {
        return false;
    }
    
    $history = json_decode(file_get_contents($historyFile), true);
    if (!is_array($history)) {
        return false;
    }
    
    $oneMonthAgo = time() - (30 * 24 * 60 * 60); // 30 días en segundos
    
    $normalizedEmail = strtolower(trim($email));
    $normalizedCompany = '';
    if (!empty($companyName) && strtolower(trim($companyName)) !== 'cliente especial') {
        $normalizedCompany = strtolower(trim($companyName));
    }
    
    foreach ($history as $entry) {
        $entryTime = isset($entry['timestamp']) ? (int)$entry['timestamp'] : 0;
        
        // Si el registro de envío es más antiguo de 30 días, lo ignoramos
        if ($entryTime < $oneMonthAgo) {
            continue;
        }
        
        // 1. Validar coincidencia de Correo Electrónico
        if (isset($entry['email']) && strtolower(trim($entry['email'])) === $normalizedEmail) {
            return $entryTime;
        }
        
        // 2. Validar coincidencia de Nombre de Empresa (si está provisto y no es genérico)
        if ($normalizedCompany !== '' && isset($entry['company'])) {
            $existingCompany = strtolower(trim($entry['company']));
            if ($existingCompany !== '' && $existingCompany !== 'cliente especial' && $existingCompany === $normalizedCompany) {
                return $entryTime;
            }
        }
    }
    
    return false;
}

/**
 * Añade un registro de envío exitoso al archivo de historial persistente.
 * 
 * @param string $email Correo electrónico del lead.
 * @param string $companyName Nombre de la empresa.
 * @param string $historyFile Ruta absoluta al archivo JSON de historial de envíos.
 */
function campaign_add_to_history($email, $companyName, $historyFile) {
    $logDir = dirname($historyFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $history = array();
    if (is_file($historyFile)) {
        $stored = json_decode(file_get_contents($historyFile), true);
        if (is_array($stored)) {
            $history = $stored;
        }
    }
    
    $entry = array(
        'timestamp' => time(),
        'date' => date('c'),
        'email' => trim($email),
        'company' => trim($companyName)
    );
    
    array_unshift($history, $entry);
    
    // Mantener un límite de 10,000 registros para evitar crecimiento ilimitado del JSON
    if (count($history) > 10000) {
        $history = array_slice($history, 0, 10000);
    }
    
    file_put_contents($historyFile, json_encode($history, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}
