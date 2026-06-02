<?php
/**
 * Standarte · Endpoint de Grupos de Leads (Supabase)
 * 
 * Proporciona acceso JSON a los grupos de leads almacenados en Supabase
 * para ser consumido por el panel de correos multimedia.
 * 
 * Acciones:
 *   ?action=list           → Lista todos los grupos con estadísticas
 *   ?action=emails&group=X → Devuelve los emails activos del grupo X
 */

session_start();

header('Content-Type: application/json; charset=utf-8');

// Verificar autenticación (misma sesión que index.php)
if (!isset($_SESSION['standarte_email_campaing_auth']) || $_SESSION['standarte_email_campaing_auth'] !== true) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'No autorizado. Inicie sesión en el panel.']);
    exit;
}

// Cargar configuración de Supabase
$configFile = dirname(dirname(__DIR__)) . '/supabase-config.php';
if (!is_file($configFile)) {
    $configFile = dirname(dirname(dirname(__DIR__))) . '/supabase-config.php';
}
if (is_file($configFile)) {
    require_once $configFile;
}

if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Configuración de Supabase no encontrada.']);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// ============================================================
// ACCIÓN: Listar todos los grupos disponibles
// ============================================================
if ($action === 'list') {
    $result = groups_supabase_get('lead_groups?select=name,description,total_leads,leads_with_email,source_url,created_at&order=created_at.desc');
    
    if ($result['code'] >= 200 && $result['code'] < 300 && is_array($result['body'])) {
        echo json_encode([
            'status' => 'success',
            'groups' => $result['body']
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        // Si la tabla no existe aún, devolver lista vacía en vez de error
        echo json_encode([
            'status' => 'success',
            'groups' => []
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
    exit;
}

// ============================================================
// ACCIÓN: Obtener emails activos de un grupo específico
// ============================================================
if ($action === 'emails') {
    $group = isset($_GET['group']) ? trim($_GET['group']) : '';
    
    if ($group === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Parámetro "group" requerido.']);
        exit;
    }
    
    // Consultar contactos activos del grupo (excluir unsubscribed y bounced)
    $endpoint = 'contacts?select=email,empresa,website&lead_group=eq.' . urlencode($group) . '&status=eq.active&order=empresa.asc';
    $result = groups_supabase_get($endpoint);
    
    if ($result['code'] >= 200 && $result['code'] < 300 && is_array($result['body'])) {
        $emails = [];
        $companies = [];
        
        foreach ($result['body'] as $contact) {
            if (!empty($contact['email']) && strpos($contact['email'], '@') !== false) {
                // Evitar duplicados
                if (!in_array($contact['email'], $emails)) {
                    $emails[] = $contact['email'];
                    $companies[] = [
                        'email' => $contact['email'],
                        'empresa' => isset($contact['empresa']) ? $contact['empresa'] : '',
                        'website' => isset($contact['website']) ? $contact['website'] : ''
                    ];
                }
            }
        }
        
        echo json_encode([
            'status' => 'success',
            'group' => $group,
            'total' => count($emails),
            'emails' => $emails,
            'companies' => $companies
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            'status' => 'success',
            'group' => $group,
            'total' => 0,
            'emails' => [],
            'companies' => []
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
    exit;
}

// Acción no reconocida
http_response_code(400);
echo json_encode([
    'status' => 'error',
    'message' => 'Acción no válida. Usa ?action=list o ?action=emails&group=NombreDelGrupo'
]);

// ============================================================
// FUNCIÓN AUXILIAR: Petición GET a Supabase REST API
// ============================================================
function groups_supabase_get($endpoint) {
    $ch = curl_init();
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    
    $headers = [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json'
    ];
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'body' => json_decode($response, true) ?: []
    ];
}
