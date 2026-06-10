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
    
    // Obtener recuento de envíos por grupo
    $sentResult = groups_supabase_get('contacts?select=lead_group&drip_sent=is.true&limit=10000');
    $sentCounts = [];
    if ($sentResult['code'] === 200 && is_array($sentResult['body'])) {
        foreach ($sentResult['body'] as $c) {
            $lg = $c['lead_group'];
            if (!isset($sentCounts[$lg])) $sentCounts[$lg] = 0;
            $sentCounts[$lg]++;
        }
    }
    
    // Obtener recuento de bajas por grupo
    $unsubResult = groups_supabase_get('contacts?select=lead_group&status=eq.unsubscribed&limit=10000');
    $unsubCounts = [];
    if ($unsubResult['code'] === 200 && is_array($unsubResult['body'])) {
        foreach ($unsubResult['body'] as $c) {
            $lg = $c['lead_group'];
            if (!isset($unsubCounts[$lg])) $unsubCounts[$lg] = 0;
            $unsubCounts[$lg]++;
        }
    }
    
    if ($result['code'] >= 200 && $result['code'] < 300 && is_array($result['body'])) {
        $groups = $result['body'];
        foreach ($groups as &$g) {
            $g['drip_sent_count'] = isset($sentCounts[$g['name']]) ? $sentCounts[$g['name']] : 0;
            $g['unsub_count'] = isset($unsubCounts[$g['name']]) ? $unsubCounts[$g['name']] : 0;
            $g['city'] = get_city_from_group_name($g['name']);
        }
        
        // Ordenar grupos por ciudad y luego alfabéticamente por nombre
        usort($groups, function($a, $b) {
            $cityA = get_city_from_group_name($a['name']);
            $cityB = get_city_from_group_name($b['name']);
            
            if ($cityA === $cityB) {
                return strcasecmp(normalize_for_sort($a['name']), normalize_for_sort($b['name']));
            }
            
            if ($cityA === 'Otros') return 1;
            if ($cityB === 'Otros') return -1;
            
            return strcasecmp(normalize_for_sort($cityA), normalize_for_sort($cityB));
        });

        echo json_encode([
            'status' => 'success',
            'groups' => $groups
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
// FUNCIONES AUXILIARES DE ORDENACIÓN Y CIUDADES
// ============================================================
function get_city_from_group_name($name) {
    $name_lower = mb_strtolower($name, 'UTF-8');
    
    // Mapeos explícitos para grupos especiales
    if ($name_lower === 'farmaforum 2026' || $name_lower === 'farmaforum') {
        return 'Madrid';
    }
    if ($name_lower === 'empack') {
        return 'Madrid';
    }
    
    $cities = [
        'Madrid' => ['madrid'],
        'Barcelona' => ['barcelona'],
        'Sevilla' => ['sevilla', 'seville'],
        'Málaga' => ['málaga', 'malaga'],
        'Lisboa' => ['lisboa', 'lisbon', 'lisbom'],
        'Zaragoza' => ['zaragoza'],
        'Badajoz' => ['badajoz'],
        'Bilbao' => ['bilbao'],
        'Vigo' => ['vigo'],
        'Paris' => ['paris'],
        'Munich' => ['munich', 'münchen', 'munchen'],
        'Hannover' => ['hannover', 'hanover'],
        'Milán' => ['milán', 'milan'],
        'Stuttgart' => ['stuttgart'],
        'Nuremberg' => ['nuremberg', 'nürnberg', 'nurnberg'],
        'Frankfurt' => ['frankfurt', 'fráncfort', 'francfort']
    ];
    
    foreach ($cities as $city => $keywords) {
        foreach ($keywords as $kw) {
            if (mb_strpos($name_lower, $kw, 0, 'UTF-8') !== false) {
                return $city;
            }
        }
    }
    
    return 'Otros';
}

function normalize_for_sort($str) {
    $str = mb_strtolower($str, 'UTF-8');
    $unwanted_array = array(
        'á'=>'a', 'é'=>'e', 'í'=>'i', 'ó'=>'o', 'ú'=>'u',
        'ä'=>'a', 'ë'=>'e', 'ï'=>'i', 'ö'=>'o', 'ü'=>'u',
        'ñ'=>'n'
    );
    return strtr($str, $unwanted_array);
}

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
