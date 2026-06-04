<?php
// cron_drip.php
// Script automático para enviar correos de forma gradual.
// Límite: 15 correos por ejecución (diseñado para correr cada hora de 08:00 a 18:00 -> ~150/día).
// Ventana: Desde 4 meses antes hasta 3 meses antes de la fecha del evento (1 mes de duración).

require_once 'config.php';
require_once 'template.php';
require_once 'mailer.php';
require_once 'leads.php'; 

// Token de seguridad para ejecucion via GitHub Actions
if (!isset($_GET['token']) || $_GET['token'] !== 'TKN-8f3a9b1c7d2e4') {
    // Si se ejecuta desde linea de comandos (CLI local) permitimos bypass
    if (php_sapi_name() !== 'cli') {
        http_response_code(403);
        die('Forbidden');
    }
}

// 1. Obtener la configuración de Supabase desde la raíz del proyecto
$supaConfigPath = __DIR__ . '/../../supabase-config.php';
if (!file_exists($supaConfigPath)) {
    die("Error: No se encontró supabase-config.php\n");
}
require_once $supaConfigPath;

function supa_request($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    $ch = curl_init($url);
    $headers = array(
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    );
    if ($method === 'PATCH') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    }
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return array('code' => $httpCode, 'data' => json_decode($result, true));
}

$emails_per_execution = 15;

// Definir ventana de envío: (EventDate está entre Hoy + 3 meses y Hoy + 4 meses)
// Dicho de otra manera: Hoy está a una distancia de entre 3 y 4 meses del evento.
$dateWindowStart = date('Y-m-d', strtotime('+3 months')); 
$dateWindowEnd = date('Y-m-d', strtotime('+4 months'));

// 2. Buscar grupos activos en esa ventana de tiempo (gte.dateWindowStart y lte.dateWindowEnd)
$endpointGroups = 'lead_groups?event_date=gte.' . $dateWindowStart . '&event_date=lte.' . $dateWindowEnd;
$res = supa_request($endpointGroups);

if ($res['code'] !== 200 || !is_array($res['data'])) {
    die("Error obteniendo grupos de Supabase o ningún grupo activo.\n");
}

$groups = $res['data'];
if (empty($groups)) {
    echo "No hay eventos en la ventana de 3-4 meses de antelación para hoy.\n";
    exit;
}

// Extraer los nombres de los grupos activos
$activeGroupNames = array();
foreach ($groups as $g) {
    $activeGroupNames[] = $g['name'];
}

echo "Grupos activos en la ventana de envío: " . implode(", ", $activeGroupNames) . "\n";

// Definir textos fijos según idioma
$dripTexts = array(
    'es' => array(
        'subject' => '¿Listo para {{COMPANY}}? Descubre nuestras soluciones de diseño',
        'intro' => 'A pocos meses de la feria, es el momento perfecto para empezar a diseñar su stand.',
        'body' => 'En Inberpet estamos listos para ayudarle a destacar en su próximo evento. Hemos preparado algunas propuestas de stands que podrían encajar con la visión de su empresa.'
    ),
    'en' => array(
        'subject' => 'Ready for {{COMPANY}}? Discover our design solutions',
        'intro' => 'With just a few months left until the exhibition, it is the perfect time to start designing your stand.',
        'body' => 'At Inberpet, we are ready to help you stand out at your next event. We have prepared some stand proposals that might fit your company\'s vision.'
    ),
    'fr' => array(
        'subject' => 'Prêt pour {{COMPANY}}? Découvrez nos solutions de design',
        'intro' => 'À quelques mois du salon, c\'est le moment idéal pour commencer à concevoir votre stand.',
        'body' => 'Chez Inberpet, nous sommes prêts à vous aider à vous démarquer lors de votre prochain événement. Nous avons préparé quelques propositions de stands qui pourraient correspondre à la vision de votre entreprise.'
    ),
    // Fallback genérico
    'default' => array(
        'subject' => 'Ready for {{COMPANY}}? Discover our design solutions',
        'intro' => 'With just a few months left until the exhibition, it is the perfect time to start designing your stand.',
        'body' => 'At Inberpet, we are ready to help you stand out at your next event. We have prepared some stand proposals that might fit your company\'s vision.'
    )
);

// 3. Buscar los contactos que pertenezcan a esos grupos y que tengan drip_sent = false
// Debido a las limitaciones de la API REST para hacer un "IN", haremos una petición por cada grupo hasta alcanzar el límite
$contactsToSend = array();

foreach ($activeGroupNames as $groupName) {
    // Si ya tenemos suficientes correos para esta ejecución, dejamos de buscar
    if (count($contactsToSend) >= $emails_per_execution) break;
    
    $limit = $emails_per_execution - count($contactsToSend);
    $endpointContacts = 'contacts?lead_group=eq.' . urlencode($groupName) . '&status=eq.active&drip_sent=is.false&limit=' . $limit;
    
    $contactsRes = supa_request($endpointContacts);
    if ($contactsRes['code'] === 200 && is_array($contactsRes['data'])) {
        foreach ($contactsRes['data'] as $c) {
            $contactsToSend[] = $c;
        }
    }
}

if (empty($contactsToSend)) {
    echo "No quedan contactos pendientes de envío (drip_sent = false) en estos grupos.\n";
    exit;
}

echo "Se enviarán correos a " . count($contactsToSend) . " contactos en esta ejecución.\n";

$categoryId = 'stand_madera'; 
$category = $config['categories'][$categoryId];

$sentCount = 0;

foreach ($contactsToSend as $contact) {
    $email = $contact['email'];
    $contactId = isset($contact['id']) ? $contact['id'] : null;
    $groupName = $contact['lead_group'];
    
    // Validate email format and DNS
    $email_error = '';
    if (!campaign_is_valid_email_advanced($email, $email_error)) {
        echo "  [SKIP - DNS/Syntax Error] $email: $email_error\n";
        if ($contactId) {
            supa_request('contacts?id=eq.' . $contactId, 'PATCH', array('status' => 'bounced', 'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error, 'updated_at' => date('c')));
        } else {
            supa_request('contacts?email=eq.' . urlencode($email), 'PATCH', array('status' => 'bounced', 'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error, 'updated_at' => date('c')));
        }
        continue;
    }
    
    // Determinar el idioma
    $lang = 'en';
    if (stripos($groupName, 'madrid') !== false || stripos($groupName, 'barcelona') !== false) {
        $lang = 'es';
    } else if (stripos($groupName, 'paris') !== false || stripos($groupName, 'france') !== false) {
        $lang = 'fr';
    }
    
    $texts = isset($dripTexts[$lang]) ? $dripTexts[$lang] : $dripTexts['default'];
    
    $companyName = !empty($contact['empresa']) ? $contact['empresa'] : '';
    $resolvedCompany = campaign_resolve_company_name($email, $lang, $companyName, $texts['subject'], $texts['intro'], $texts['body']);
    
    $processedSubject = campaign_process_placeholders($texts['subject'], $resolvedCompany);
    $emailIntro = campaign_process_placeholders($texts['intro'], $resolvedCompany);
    $emailBody = campaign_process_placeholders($texts['body'], $resolvedCompany);
    
    $emailHtml = campaign_build_email($config, $category, $email, $lang, $processedSubject, $emailIntro, $emailBody, $resolvedCompany);
    
    if (campaign_send_mail($config, $email, $processedSubject, $emailHtml)) {
        $sentCount++;
        echo "  [OK] $email\n";
        
        // Marcar como enviado inmediatamente
        if ($contactId) {
            supa_request('contacts?id=eq.' . $contactId, 'PATCH', array('drip_sent' => true));
        } else {
            // Si no tuviéramos id, usamos el email
            supa_request('contacts?email=eq.' . urlencode($email), 'PATCH', array('drip_sent' => true));
        }
        
    } else {
        echo "  [FAIL] $email\n";
    }
    
    sleep(1);
}

echo "Proceso cron finalizado. Correos enviados: $sentCount\n";
