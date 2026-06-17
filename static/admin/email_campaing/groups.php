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

// Añade a cada visitante su LISTA (lead_group) e IDIOMA (language), cruzando el email
// con contacts/luz_contacts en una sola consulta IN. (En lugar del antiguo "source".)
function gp_enrich_clicks(&$rows) {
    if (empty($rows)) return;
    $quoted = [];
    foreach ($rows as $r) { $quoted[] = '"' . str_replace('"', '', $r['email']) . '"'; }
    $in = urlencode('(' . implode(',', $quoted) . ')');
    $info = [];
    foreach (['contacts', 'luz_contacts'] as $tbl) {
        $res = groups_supabase_get($tbl . '?select=email,lead_group,language&email=in.' . $in);
        if (is_array($res['body'])) {
            foreach ($res['body'] as $row) {
                if (empty($row['email'])) continue;
                $em = strtolower($row['email']);
                if (!isset($info[$em])) {
                    $info[$em] = [
                        'lead_group' => isset($row['lead_group']) ? $row['lead_group'] : '',
                        'language' => isset($row['language']) ? $row['language'] : ''
                    ];
                }
            }
        }
    }
    // Visitantes a los que YA se les envió el correo personal "Pat".
    $patSent = [];
    $patFile = __DIR__ . '/data/pat_followups.json';
    if (is_file($patFile)) {
        $patState = json_decode(file_get_contents($patFile), true);
        if (isset($patState['sent']) && is_array($patState['sent'])) {
            foreach ($patState['sent'] as $em => $rec) {
                $sa = isset($rec['sent_at']) ? $rec['sent_at'] : '';
                if ($sa !== '' && $sa !== 'seed' && $sa !== 'invalid') $patSent[strtolower($em)] = true;
            }
        }
    }
    foreach ($rows as &$r) {
        $em = strtolower($r['email']);
        $r['lead_group'] = isset($info[$em]) ? $info[$em]['lead_group'] : '';
        $r['language'] = isset($info[$em]) ? $info[$em]['language'] : '';
        $r['pat_sent'] = isset($patSent[$em]);
    }
    unset($r);
}

// ============================================================
// ACCIÓN: Obtener estadísticas de clics totales en tiempo real
// ============================================================
if ($action === 'clicks_count') {
    // Contamos y listamos SOLO aperturas humanas (los escáneres se filtran).
    $res = groups_supabase_get('email_clicks?select=email,source,user_agent,clicked_at&order=clicked_at.desc&limit=1000');
    $human = [];
    if (is_array($res['body'])) {
        foreach ($res['body'] as $c) {
            if (gp_click_is_human($c)) $human[] = $c;
        }
    }
    // Agrupar por email (vienen del más reciente al más antiguo): 1 entrada por visitante + nº de aperturas
    $grouped = [];
    foreach ($human as $c) {
        $em = $c['email'];
        if (!isset($grouped[$em])) $grouped[$em] = ['email' => $em, 'source' => $c['source'], 'clicked_at' => $c['clicked_at'], 'count' => 0];
        $grouped[$em]['count']++;
    }
    $history = array_slice(array_values($grouped), 0, 50);
    gp_enrich_clicks($history); // añade lista (lead_group) e idioma de cada visitante
    echo json_encode([
        'status' => 'success',
        'total' => count($human),
        'unique' => count($grouped),
        'history' => $history
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ============================================================
// ACCIÓN: Obtener grupos en la ventana de goteo con sent counts
// ============================================================
if ($action === 'active_drip_groups') {
    $dateWindowStart = date('Y-m-d', strtotime('+3 months')); 
    $dateWindowEnd = date('Y-m-d', strtotime('+5 months'));
    
    $result = groups_supabase_get('lead_groups?select=name,event_date,leads_with_email&event_date=gte.' . $dateWindowStart . '&event_date=lte.' . $dateWindowEnd . '&order=event_date.asc');
    
    if ($result['code'] !== 200 || !is_array($result['body'])) {
        echo json_encode(['status' => 'error', 'message' => 'Error obteniendo grupos de Supabase o ningún grupo activo.']);
        exit;
    }
    
    $groups = $result['body'];
    
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
    
    // Obtener recuento de envíos en luz_contacts
    $sentResultLuz = groups_supabase_get('luz_contacts?select=lead_group&drip_sent=is.true&limit=10000');
    if ($sentResultLuz['code'] === 200 && is_array($sentResultLuz['body'])) {
        foreach ($sentResultLuz['body'] as $c) {
            $lg = $c['lead_group'];
            if (!isset($sentCounts[$lg])) $sentCounts[$lg] = 0;
            $sentCounts[$lg]++;
        }
    }
    
    foreach ($groups as &$g) {
        $g['sent_count'] = isset($sentCounts[$g['name']]) ? $sentCounts[$g['name']] : 0;
    }
    
    $cronStatus = array();
    $cronStatusFile = __DIR__ . '/data/cron_status.json';
    if (is_file($cronStatusFile)) {
        $cronStatus = json_decode(file_get_contents($cronStatusFile), true);
    }
    
    echo json_encode([
        'status' => 'success',
        'groups' => $groups,
        'cron_status' => $cronStatus
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ============================================================
// ACCIÓN: Listar todos los grupos disponibles
// ============================================================
if ($action === 'list') {
    $result = groups_supabase_get('lead_groups?select=name,description,total_leads,leads_with_email,source_url,created_at&order=created_at.desc');
    
    // Recuentos por grupo, contando EN VIVO y PAGINANDO (Supabase corta a 1000 filas/petición).
    // La columna leads_with_email de lead_groups está congelada en la importación y no descuenta
    // rebotes/bajas, por eso el nº mostrado desajustaba con los destinatarios que carga el envío.
    $sentCounts = [];
    $unsubCounts = [];
    $activeCounts = [];   // ENVIABLES: coincide con lo que carga el envío manual (status=active)
    $bouncedCounts = [];  // rebotados (explican el hueco con el total importado)

    $sentResult = groups_supabase_get_all('contacts?select=lead_group&drip_sent=is.true');
    foreach ($sentResult['body'] as $c) {
        $lg = $c['lead_group'];
        $sentCounts[$lg] = isset($sentCounts[$lg]) ? $sentCounts[$lg] + 1 : 1;
    }
    $unsubResult = groups_supabase_get_all('contacts?select=lead_group&status=eq.unsubscribed');
    foreach ($unsubResult['body'] as $c) {
        $lg = $c['lead_group'];
        $unsubCounts[$lg] = isset($unsubCounts[$lg]) ? $unsubCounts[$lg] + 1 : 1;
    }
    $activeResult = groups_supabase_get_all('contacts?select=lead_group&status=eq.active');
    foreach ($activeResult['body'] as $c) {
        $lg = $c['lead_group'];
        $activeCounts[$lg] = isset($activeCounts[$lg]) ? $activeCounts[$lg] + 1 : 1;
    }
    $bouncedResult = groups_supabase_get_all('contacts?select=lead_group&status=eq.bounced');
    foreach ($bouncedResult['body'] as $c) {
        $lg = $c['lead_group'];
        $bouncedCounts[$lg] = isset($bouncedCounts[$lg]) ? $bouncedCounts[$lg] + 1 : 1;
    }

    if ($result['code'] >= 200 && $result['code'] < 300 && is_array($result['body'])) {
        $groups = $result['body'];
        foreach ($groups as &$g) {
            $g['drip_sent_count'] = isset($sentCounts[$g['name']]) ? $sentCounts[$g['name']] : 0;
            $g['unsub_count'] = isset($unsubCounts[$g['name']]) ? $unsubCounts[$g['name']] : 0;
            $g['active_count'] = isset($activeCounts[$g['name']]) ? $activeCounts[$g['name']] : 0;
            $g['bounced_count'] = isset($bouncedCounts[$g['name']]) ? $bouncedCounts[$g['name']] : 0;
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
// FUNCIÓN AUXILIAR: ¿apertura humana o escáner?
// (misma lógica que click_is_human de index.php)
// ============================================================
function gp_click_is_human($c) {
    $email = isset($c['email']) ? trim($c['email']) : '';
    if ($email === '' || strcasecmp($email, 'anonymous') === 0 || strpos($email, '@') === false) return false;
    $legit = array('email_campaing', 'main-cta-button', 'footer-contact', 'footer-web');
    $src = isset($c['source']) ? $c['source'] : '';
    if (!in_array($src, $legit, true)) return false;
    $ua = strtolower(trim(isset($c['user_agent']) ? $c['user_agent'] : ''));
    if ($ua === '') return false;
    foreach (array('bot', 'crawl', 'spider', 'proxy', 'preview', 'scan', 'mimecast', 'proofpoint', 'barracuda', 'googleimageproxy', 'python', 'curl/', 'wget', 'headless', 'monitor') as $b) {
        if (strpos($ua, $b) !== false) return false;
    }
    return true;
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

/**
 * Como groups_supabase_get pero PAGINA hasta traer todas las filas.
 * Supabase corta cada respuesta a 1000 filas (ignora un limit mayor), por lo que
 * sin paginar los recuentos por grupo salían incompletos (p.ej. una lista con
 * activos más allá de la fila 1000 contaba 0). Pide páginas de 1000 con offset
 * creciente hasta recibir menos de 1000. NO incluyas limit/offset en $endpoint.
 */
function groups_supabase_get_all($endpoint) {
    $all = [];
    $pageSize = 1000;
    $offset = 0;
    $lastCode = 200;
    $sep = (strpos($endpoint, '?') !== false) ? '&' : '?';
    for ($i = 0; $i < 100; $i++) { // tope de seguridad: 100.000 filas
        $res = groups_supabase_get($endpoint . $sep . 'limit=' . $pageSize . '&offset=' . $offset);
        $lastCode = $res['code'];
        if ($res['code'] < 200 || $res['code'] >= 300 || !is_array($res['body'])) break;
        $all = array_merge($all, $res['body']);
        if (count($res['body']) < $pageSize) break;
        $offset += $pageSize;
    }
    return ['code' => $lastCode, 'body' => $all];
}
