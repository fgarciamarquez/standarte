<?php
// cron_drip.php
// Script automático para enviar correos de forma gradual.
// Límite: 5 correos por ejecución, repartidos entre las listas activas (round-robin).
// Corre cada 20 min de 08:00 a 18:00 UTC, de lunes a viernes -> ~165/día laborable.
// Ventana: Desde 5 meses antes hasta 3 meses antes de la fecha del evento (2 meses de duración).

$config = require_once 'config.php';
require_once 'template.php';
require_once 'mailer.php';

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

// Modo simulación (?dryrun=1): capturamos la salida para devolver JSON limpio sin enviar correos.
$__dryrun = isset($_GET['dryrun']);
if ($__dryrun) { ob_start(); }

function write_cron_status($status, $message, $extra = []) {
    $statusFile = __DIR__ . '/data/cron_status.json';
    $statusData = array_merge([
        'last_run' => date('c'),
        'status' => $status,
        'message' => $message,
    ], $extra);
    file_put_contents($statusFile, json_encode($statusData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}

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

$emails_per_execution = 5;

// Definir ventana de envío: (EventDate está entre Hoy + 3 meses y Hoy + 5 meses)
// Dicho de otra manera: Hoy está a una distancia de entre 3 y 5 meses del evento.
$dateWindowStart = date('Y-m-d', strtotime('+3 months')); 
$dateWindowEnd = date('Y-m-d', strtotime('+5 months'));

// 2. Buscar grupos activos en esa ventana de tiempo (gte.dateWindowStart y lte.dateWindowEnd)
$endpointGroups = 'lead_groups?event_date=gte.' . $dateWindowStart . '&event_date=lte.' . $dateWindowEnd;
$res = supa_request($endpointGroups);

if ($res['code'] !== 200 || !is_array($res['data'])) {
    write_cron_status('error', 'Error obteniendo grupos de Supabase o ningún grupo activo.');
    die("Error obteniendo grupos de Supabase o ningún grupo activo.\n");
}

$groups = $res['data'];
if (empty($groups)) {
    write_cron_status('success', 'No hay eventos en la ventana de 3-5 meses de antelación para hoy.', ['active_groups' => []]);
    echo "No hay eventos en la ventana de 3-5 meses de antelación para hoy.\n";
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
        'subject' => 'Hola {{COMPANY}}. Te ofrecemos un stand diferencial y un presupuesto en 24 H.',
        'intro' => 'A pocos meses de la feria, es el momento perfecto para empezar a diseñar su stand.',
        'body' => 'En Inberpet estamos listos para ayudarle a destacar en su próximo evento. Hemos preparado algunas propuestas de stands que podrían encajar con la visión de su empresa.'
    ),
    'en' => array(
        'subject' => 'Hello {{COMPANY}}. We offer you a distinctive stand and a quote in 24 H.',
        'intro' => 'With just a few months left until the exhibition, it is the perfect time to start designing your stand.',
        'body' => 'At Inberpet, we are ready to help you stand out at your next event. We have prepared some stand proposals that might fit your company\'s vision.'
    ),
    'fr' => array(
        'subject' => 'Bonjour {{COMPANY}}. Nous vous offrons un stand différenciant et un devis en 24 H.',
        'intro' => 'À quelques mois du salon, c\'est le moment idéal pour commencer à concevoir votre stand.',
        'body' => 'Chez Inberpet, nous sommes prêts à vous aider à vous démarquer lors de votre prochain événement. Nous avons préparé quelques propositions de stands qui pourraient correspondre à la vision de votre entreprise.'
    ),
    'pt' => array(
        'subject' => 'Olá {{COMPANY}}. Oferecemos-lhe um stand diferenciado e um orçamento em 24 H.',
        'intro' => 'A poucos meses da feira, é a altura ideal para começar a desenhar o seu stand.',
        'body' => 'Na Inberpet estamos prontos para ajudá-lo a destacar-se no seu próximo evento. Preparámos algumas propostas de stands que poderão adequar-se à visão da sua empresa.'
    ),
    'de' => array(
        'subject' => 'Hallo {{COMPANY}}. Wir bieten Ihnen einen einzigartigen Messestand und ein Angebot in 24 H.',
        'intro' => 'Wenige Monate vor der Messe ist der perfekte Zeitpunkt, um mit der Gestaltung Ihres Messestandes zu beginnen.',
        'body' => 'Bei Inberpet sind wir bereit, Ihnen dabei zu helfen, sich bei Ihrer nächsten Veranstaltung abzuheben. Wir haben einige Standvorschläge vorbereitet, die zur Vision Ihres Unternehmens passen könnten.'
    ),
    'it' => array(
        'subject' => 'Ciao {{COMPANY}}. Ti offriamo uno stand distintivo e un preventivo in 24 H.',
        'intro' => 'A pochi mesi dalla fiera, è il momento perfetto per iniziare a progettare il tuo stand.',
        'body' => 'In Inberpet siamo pronti ad aiutarti a distinguerti al tuo prossimo evento. Abbiamo preparato alcune proposte di stand che potrebbero adattarsi alla visione della tua azienda.'
    ),
    // Fallback genérico
    'default' => array(
        'subject' => 'Hello {{COMPANY}}. We offer you a distinctive stand and a quote in 24 H.',
        'intro' => 'With just a few months left until the exhibition, it is the perfect time to start designing your stand.',
        'body' => 'At Inberpet, we are ready to help you stand out at your next event. We have prepared some stand proposals that might fit your company\'s vision.'
    )
);

// 3. REPARTO EQUITATIVO entre las listas activas (round-robin), para no concentrar
//    todo el envío en una sola lista. Se rota el orden de inicio cada hora para que
//    ninguna lista vaya siempre primera y el reparto sea justo a lo largo del día.
$tablesToSearch = array('contacts', 'luz_contacts');

$groupCount = count($activeGroupNames);
$rot = $groupCount > 0 ? ((int) date('G')) % $groupCount : 0;
$rotatedGroups = array_merge(array_slice($activeGroupNames, $rot), array_slice($activeGroupNames, 0, $rot));

// 3a. Llenar un "cubo" de contactos pendientes por cada lista (de ambas tablas).
$buckets = array();
foreach ($rotatedGroups as $groupName) {
    $buckets[$groupName] = array();
}
foreach ($tablesToSearch as $tableName) {
    foreach ($rotatedGroups as $groupName) {
        $endpointContacts = $tableName . '?lead_group=eq.' . urlencode($groupName) . '&status=eq.active&drip_sent=is.false&limit=' . $emails_per_execution;
        $contactsRes = supa_request($endpointContacts);
        if ($contactsRes['code'] === 200 && is_array($contactsRes['data'])) {
            foreach ($contactsRes['data'] as $c) {
                $c['_table'] = $tableName; // Guardar origen para el PATCH
                $buckets[$groupName][] = $c;
            }
        }
    }
}

// 3b. Tomar uno de cada lista por turnos hasta alcanzar el límite de la ejecución.
$contactsToSend = array();
$progress = true;
while (count($contactsToSend) < $emails_per_execution && $progress) {
    $progress = false;
    foreach ($rotatedGroups as $groupName) {
        if (count($contactsToSend) >= $emails_per_execution) break;
        if (!empty($buckets[$groupName])) {
            $contactsToSend[] = array_shift($buckets[$groupName]);
            $progress = true;
        }
    }
}

if (empty($contactsToSend)) {
    write_cron_status('success', 'No quedan contactos pendientes de envío (drip_sent = false) en estos grupos.', [
        'active_groups' => $activeGroupNames,
        'emails_to_send' => 0,
        'sent_count' => 0
    ]);
    echo "No quedan contactos pendientes de envío (drip_sent = false) en estos grupos.\n";
    exit;
}

echo "Se enviarán correos a " . count($contactsToSend) . " contactos en esta ejecución.\n";

// Modo simulación: no envía nada, solo informa el reparto por lista (para verificar).
if ($__dryrun) {
    $dist = array();
    foreach ($contactsToSend as $c) {
        $g = $c['lead_group'];
        $dist[$g] = (isset($dist[$g]) ? $dist[$g] : 0) + 1;
    }
    if (ob_get_level() > 0) { ob_end_clean(); }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array(
        'dryrun' => true,
        'emails_per_execution' => $emails_per_execution,
        'active_groups' => $activeGroupNames,
        'selected_total' => count($contactsToSend),
        'distribution_por_lista' => $dist
    ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

$categoryId = 'stands_madera';
$category = $config['categories'][$categoryId];

$sentCount = 0;

foreach ($contactsToSend as $contact) {
    $email = $contact['email'];
    $contactId = isset($contact['id']) ? $contact['id'] : null;
    $groupName = $contact['lead_group'];
    
    $updateTable = isset($contact['_table']) ? $contact['_table'] : 'contacts';
    
    // Validate email format and DNS
    $email_error = '';
    if (!campaign_is_valid_email_advanced($email, $email_error)) {
        echo "  [SKIP - DNS/Syntax Error] $email: $email_error\n";
        if ($contactId) {
            supa_request($updateTable . '?id=eq.' . $contactId, 'PATCH', array('status' => 'bounced', 'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error, 'updated_at' => date('c')));
        } else {
            supa_request($updateTable . '?email=eq.' . urlencode($email), 'PATCH', array('status' => 'bounced', 'bounce_reason' => 'DNS/Syntax check failed: ' . $email_error, 'updated_at' => date('c')));
        }
        continue;
    }
    
    // Determinar el idioma
    $lang = 'en';
    if (!empty($contact['language'])) {
        $lang = strtolower($contact['language']);
    } else {
        if (stripos($groupName, 'madrid') !== false || stripos($groupName, 'barcelona') !== false) {
            $lang = 'es';
        } else if (stripos($groupName, 'paris') !== false || stripos($groupName, 'france') !== false) {
            $lang = 'fr';
        }
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
            supa_request($updateTable . '?id=eq.' . $contactId, 'PATCH', array('drip_sent' => true));
        } else {
            // Si no tuviéramos id, usamos el email
            supa_request($updateTable . '?email=eq.' . urlencode($email), 'PATCH', array('drip_sent' => true));
        }
        
    } else {
        echo "  [FAIL] $email\n";
    }
    
    sleep(1);
}

write_cron_status('success', "Proceso cron finalizado. Correos enviados: $sentCount", [
    'active_groups' => $activeGroupNames,
    'emails_to_send' => count($contactsToSend),
    'sent_count' => $sentCount
]);
echo "Proceso cron finalizado. Correos enviados: $sentCount\n";

// Ejecutar el limpiador de rebotes IMAP al finalizar el envío (automatización de limpieza)
if (defined('BOUNCE_CRON_TOKEN')) {
    $bounceUrl = $config['site_url'] . '/bounce-handler.php?cron=1&token=' . BOUNCE_CRON_TOKEN;
    echo "Ejecutando limpiador de rebotes IMAP ($bounceUrl)...\n";
    $chBounce = curl_init();
    curl_setopt($chBounce, CURLOPT_URL, $bounceUrl);
    curl_setopt($chBounce, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chBounce, CURLOPT_TIMEOUT, 30);
    curl_setopt($chBounce, CURLOPT_SSL_VERIFYPEER, false);
    $bounceRes = curl_exec($chBounce);
    $bounceHttpCode = curl_getinfo($chBounce, CURLINFO_HTTP_CODE);
    curl_close($chBounce);

    if ($bounceHttpCode === 200) {
        $bounceData = json_decode($bounceRes, true);
        $detected = isset($bounceData['bounces_detected']) ? $bounceData['bounces_detected'] : 0;
        $processed = isset($bounceData['processed_count']) ? $bounceData['processed_count'] : 0;
        echo "Limpiador de rebotes ejecutado con éxito. Rebotes detectados: $detected. Contactos limpiados: $processed.\n";
    } else {
        echo "Advertencia: No se pudo ejecutar el limpiador de rebotes (HTTP $bounceHttpCode). Respuesta: $bounceRes\n";
    }
}

