<?php
/**
 * Standarte - Depurador y Limpiador de Rebotes (Hard/Soft Bounces)
 * 
 * Herramienta de administración premium para gestionar rebotes de correo,
 * limpiando la lista de contactos en Supabase.
 */

// Evitar almacenamiento en caché
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

/**
 * Realiza peticiones HTTP a la API REST de Supabase (IPv4 Compatible)
 */
function bounce_supabase_request($method, $endpoint, $data = null) {
    if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
        return ['code' => 500, 'body' => []];
    }

    $ch = curl_init();
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $headers = [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json'
    ];
    
    if ($method === 'POST') {
        $headers[] = 'Prefer: resolution=merge-duplicates';
    } else if ($method === 'PATCH') {
        $headers[] = 'Prefer: return=representation';
    }
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'body' => json_decode($response, true) ?: $response
    ];
}

/**
 * Se conecta por IMAP a la bandeja de entrada, escanea rebotes no leídos,
 * extrae las direcciones de correo rebotadas y las actualiza en Supabase.
 */
function scan_imap_bounces() {
    $result = [
        'success' => false,
        'config_ok' => false,
        'imap_extension_ok' => false,
        'connected' => false,
        'unseen_count' => 0,
        'bounces_detected' => 0,
        'processed_count' => 0,
        'bounced_emails' => [],
        'already_bounced' => [],
        'not_found_emails' => [],
        'errors' => []
    ];

    // 1. Verificar extensión IMAP
    if (!function_exists('imap_open')) {
        $result['errors'][] = 'La extensión IMAP de PHP no está instalada o activada en este servidor.';
        return $result;
    }
    $result['imap_extension_ok'] = true;

    // 2. Verificar configuración
    if (!defined('IMAP_HOST') || !defined('IMAP_USER') || !defined('IMAP_PASS')) {
        $result['errors'][] = 'Las constantes IMAP_HOST, IMAP_USER o IMAP_PASS no están definidas en supabase-config.php.';
        return $result;
    }
    $result['config_ok'] = true;

    // 3. Conectar al servidor IMAP
    // Desactivar temporalmente el reporte de errores de IMAP para capturarlos controladamente
    $mbox = @imap_open(IMAP_HOST, IMAP_USER, IMAP_PASS);
    if (!$mbox) {
        $result['errors'][] = 'Error de conexión IMAP: ' . imap_last_error();
        return $result;
    }
    $result['connected'] = true;

    // 4. Buscar correos (tanto leídos como no leídos) de los últimos 30 días
    $sinceDate = date("d-M-Y", strtotime("-30 days"));
    $msgIds = imap_search($mbox, 'SINCE "' . $sinceDate . '"');
    if (!$msgIds) {
        $result['success'] = true;
        imap_close($mbox);
        return $result;
    }

    $result['unseen_count'] = count($msgIds);

    // Lista de remitentes conocidos de Mail Delivery
    $bounceSenders = ['mailer-daemon', 'postmaster', 'mail-delivery', 'delivery', 'bounce'];
    // Lista de patrones en asuntos
    $bounceSubjects = ['delivery status', 'undelivered', 'returned to sender', 'fail', 'failure', 'rebotado', 'delivery report', 'non-delivery', 'bounce'];

    foreach ($msgIds as $msgId) {
        $header = imap_headerinfo($mbox, $msgId);
        if (!$header) {
            continue;
        }

        // Obtener el Remitente (From)
        $from = '';
        if (isset($header->from) && is_array($header->from)) {
            $fromObj = $header->from[0];
            $from = ($fromObj->mailbox ?? '') . '@' . ($fromObj->host ?? '');
        }
        $from = strtolower($from);

        // Obtener el Asunto (Subject)
        $subject = '';
        if (isset($header->subject)) {
            $subject = strtolower(imap_utf8($header->subject));
        }

        // Determinar si es un correo de rebote
        $isBounce = false;
        foreach ($bounceSenders as $bs) {
            if (strpos($from, $bs) !== false) {
                $isBounce = true;
                break;
            }
        }
        if (!$isBounce) {
            foreach ($bounceSubjects as $sub) {
                if (strpos($subject, $sub) !== false) {
                    $isBounce = true;
                    break;
                }
            }
        }

        if (!$isBounce) {
            // No es un rebote, omitir sin marcar como leído
            continue;
        }

        $result['bounces_detected']++;

        // Obtener el cuerpo completo del mensaje
        $body = imap_body($mbox, $msgId);
        if (empty($body)) {
            $body = imap_fetchbody($mbox, $msgId, "1");
        }

        // Buscar correos electrónicos en el cuerpo del rebote
        preg_match_all('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', $body, $matches);
        
        if (!empty($matches[0])) {
            $emailsToProcess = array_unique($matches[0]);

            foreach ($emailsToProcess as $email) {
                $email = strtolower(trim($email));

                // Omitir nuestros propios emails emisores y dominios comunes de servidores
                if (
                    $email === 'hola@standarte.es' || 
                    $email === 'info@standarte.es' || 
                    $email === 'javier@standarte.es' ||
                    strpos($email, 'mailer-daemon') !== false ||
                    strpos($email, 'postmaster') !== false ||
                    strpos($email, 'google.com') !== false ||
                    strpos($email, 'gmail.com') !== false && ($email === 'info@standarte.es')
                ) {
                    continue;
                }

                // Consultar en Supabase
                $res = bounce_supabase_request('GET', 'contacts?email=eq.' . urlencode($email));
                if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
                    $contact = $res['body'][0];
                    $currentStatus = $contact['status'] ?? 'active';

                    if ($currentStatus === 'bounced') {
                        if (!in_array($email, $result['already_bounced'])) {
                            $result['already_bounced'][] = $email;
                        }
                    } else {
                        // Actualizar a 'bounced'
                        $updateData = [
                            'status' => 'bounced',
                            'bounce_reason' => 'Rebote automático detectado por IMAP - ' . date('d-m-Y H:i')
                        ];
                        $patchRes = bounce_supabase_request('PATCH', 'contacts?email=eq.' . urlencode($email), $updateData);
                        if ($patchRes['code'] >= 200 && $patchRes['code'] < 300) {
                            if (!in_array($email, $result['bounced_emails'])) {
                                $result['bounced_emails'][] = $email;
                                $result['processed_count']++;
                            }
                        }
                    }
                } else {
                    if (!in_array($email, $result['not_found_emails']) && !in_array($email, $result['bounced_emails']) && !in_array($email, $result['already_bounced'])) {
                        $result['not_found_emails'][] = $email;
                    }
                }
            }
        }

        // Marcar el mensaje para borrar del servidor (ya que son correos inútiles que ocupan espacio)
        imap_delete($mbox, $msgId);
    }

    // Borrar físicamente todos los mensajes marcados para eliminación
    @imap_expunge($mbox);

    $result['success'] = true;
    imap_close($mbox);
    return $result;
}

// -------------------------------------------------------------
// TRIGGER DE CRON AUTOMÁTICO (EJECUCIÓN SIN CONSOLA / HEADLESS)
// -------------------------------------------------------------
if (isset($_GET['cron']) && $_GET['cron'] == '1') {
    $token = isset($_GET['token']) ? trim($_GET['token']) : '';
    if (!defined('BOUNCE_CRON_TOKEN') || empty($token) || $token !== BOUNCE_CRON_TOKEN) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'error' => 'Acceso denegado. Token no válido o no configurado.'
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $result = scan_imap_bounces();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Contraseña de acceso al panel de administración
define('ADMIN_PASSWORD', 'STANDARTE_ADMIN_2026');

session_start();

// Control de Sesión / Autenticación
$authenticated = false;
if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    $authenticated = true;
}

if (isset($_POST['password'])) {
    if ($_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['authenticated'] = true;
        $authenticated = true;
    } else {
        $loginError = 'Contraseña incorrecta';
    }
}

if (isset($_GET['logout'])) {
    $_SESSION['authenticated'] = false;
    session_destroy();
    header("Location: bounce-handler.php");
    exit;
}

// -------------------------------------------------------------
// TRIGGER DE LLAMADA AJAX DESDE EL PANEL
// -------------------------------------------------------------
if ($authenticated && isset($_GET['action']) && $_GET['action'] === 'scan_imap') {
    $result = scan_imap_bounces();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Variables del proceso de depuración manual
$processedCount = 0;
$bouncedEmailsList = [];
$notFoundEmailsList = [];
$alreadyBouncedList = [];

// 1. PROCESAR DEPURACIÓN MANUAL (PASTE AREA)
if ($authenticated && isset($_POST['bounce_paste'])) {
    $rawText = $_POST['bounce_paste'];
    $bounceReason = isset($_POST['reason']) ? trim($_POST['reason']) : 'Error en entrega de correo (Rebote)';
    if (empty($bounceReason)) $bounceReason = 'Error en entrega de correo (Rebote)';

    // Expresión regular robusta para capturar emails en el texto (headers, logs, etc.)
    preg_match_all('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', $rawText, $matches);
    
    if (!empty($matches[0])) {
        // Eliminar duplicados en el bloque pegado
        $emailsToProcess = array_unique($matches[0]);
        
        foreach ($emailsToProcess as $email) {
            $email = strtolower(trim($email));
            
            // Omitir nuestro propio email emisor para evitar autodesactivaciones accidentales
            if ($email === 'hola@standarte.es' || $email === 'info@standarte.es' || $email === 'javier@standarte.es') {
                continue;
            }

            // Consultar si existe en Supabase
            $res = bounce_supabase_request('GET', 'contacts?email=eq.' . urlencode($email));
            if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
                $contact = $res['body'][0];
                $currentStatus = $contact['status'] ?? 'active';
                
                if ($currentStatus === 'bounced') {
                    $alreadyBouncedList[] = $email;
                } else {
                    // Actualizar estado a 'bounced'
                    $updateData = [
                        'status' => 'bounced',
                        'bounce_reason' => $bounceReason . ' - Procesado el ' . date('d-m-Y H:i')
                    ];
                    $patchRes = bounce_supabase_request('PATCH', 'contacts?email=eq.' . urlencode($email), $updateData);
                    if ($patchRes['code'] >= 200 && $patchRes['code'] < 300) {
                        $bouncedEmailsList[] = $email;
                        $processedCount++;
                    }
                }
            } else {
                $notFoundEmailsList[] = $email;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standarte - Depurador de Rebotes</title>
    <!-- Tipografía Outfit de Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #0c0d0e;
            --color-card: #141619;
            --color-primary: #ffc800;
            --color-primary-hover: #e0b000;
            --color-text: #f5f6f7;
            --color-text-muted: #8e959d;
            --color-border: #23272b;
            --color-success: #28a745;
            --color-error: #dc3545;
            --color-warning: #ffc107;
            --color-info: #17a2b8;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: 'Outfit', sans-serif;
            min-height: 100vh;
        }

        .header-bar {
            background-color: #050606;
            border-bottom: 1px solid var(--color-border);
            padding: 15px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-logo {
            width: 140px;
            filter: invert(1);
        }

        .header-title {
            font-size: 14px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--color-primary);
            font-weight: 700;
        }

        .logout-link {
            color: var(--color-text-muted);
            text-decoration: none;
            font-size: 13px;
            transition: color 0.3s;
        }

        .logout-link:hover {
            color: var(--color-error);
        }

        .main-container {
            max-width: 1000px;
            margin: 50px auto;
            padding: 0 20px;
        }

        .login-card {
            max-width: 400px;
            margin: 100px auto;
            background-color: var(--color-card);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 35px rgba(0,0,0,0.6);
            text-align: center;
        }

        .input-group {
            margin-bottom: 20px;
            text-align: left;
        }

        label {
            display: block;
            font-size: 13px;
            color: var(--color-text-muted);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .form-control {
            width: 100%;
            box-sizing: border-box;
            background-color: #0c0d0e;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            color: var(--color-text);
            padding: 12px 16px;
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--color-primary);
        }

        textarea.form-control {
            resize: vertical;
            min-height: 180px;
            font-family: monospace;
            font-size: 13px;
        }

        .btn {
            display: block;
            width: 100%;
            background-color: var(--color-primary);
            color: #000000;
            border: none;
            padding: 14px 20px;
            font-size: 15px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: background-color 0.3s, transform 0.2s;
        }

        .btn:hover {
            background-color: var(--color-primary-hover);
        }

        .btn:active {
            transform: scale(0.98);
        }

        .card {
            background-color: var(--color-card);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        h2 {
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 25px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid var(--color-border);
            padding-bottom: 12px;
        }

        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 1.5;
        }

        .alert-success {
            background-color: rgba(40, 167, 69, 0.15);
            border: 1px solid var(--color-success);
            color: #a3e6a3;
        }

        .grid-results {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 25px;
        }

        .result-box {
            background-color: #0c0d0e;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 15px;
            max-height: 250px;
            overflow-y: auto;
        }

        .result-box-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }

        .count-badge {
            background-color: var(--color-border);
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
        }

        .result-list {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 13px;
        }

        .result-list li {
            padding: 6px 0;
            border-bottom: 1px solid #1a1c1e;
            word-break: break-all;
        }

        .text-success { color: var(--color-success); }
        .text-warning { color: var(--color-warning); }
        .text-error { color: var(--color-error); }

        .tabs {
            display: flex;
            border-bottom: 1px solid var(--color-border);
            margin-bottom: 25px;
        }

        .tab {
            padding: 12px 24px;
            color: var(--color-text-muted);
            text-decoration: none;
            border-bottom: 2px solid transparent;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .tab.active {
            color: var(--color-primary);
            border-bottom-color: var(--color-primary);
        }

        .desc-p {
            font-size: 14px;
            color: var(--color-text-muted);
            margin-top: 0;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .imap-setup-card {
            background-color: #0c0d0e;
            border: 1px dashed var(--color-border);
            border-radius: 8px;
            padding: 30px;
            text-align: center;
        }

        .imap-setup-card svg {
            width: 48px;
            height: 48px;
            fill: var(--color-text-muted);
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

    <div class="header-bar">
        <div>
            <img class="header-logo" src="https://standarte.es/img/logo_stand-arte_negro.svg" alt="Standarte Logo">
        </div>
        <div class="header-title">Campaign Manager</div>
        <div>
            <?php if ($authenticated): ?>
                <a href="?logout=1" class="logout-link">Cerrar Sesión ↩</a>
            <?php endif; ?>
        </div>
    </div>

    <div class="main-container">

        <?php if (!$authenticated): ?>
            <!-- Formulario de Acceso -->
            <div class="login-card">
                <h2 style="border-bottom: none; margin-bottom: 10px;">Acceso Administrador</h2>
                <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 30px;">Introduce la clave del gestor de Standarte para depurar correos fallidos.</p>
                
                <?php if (isset($loginError)): ?>
                    <p style="color: var(--color-error); font-size: 14px; font-weight: bold; margin-bottom: 15px;"><?php echo $loginError; ?></p>
                <?php endif; ?>

                <form method="POST">
                    <div class="input-group">
                        <label for="password">Contraseña del Sistema</label>
                        <input class="form-control" type="password" id="password" name="password" placeholder="••••••••" required autofocus>
                    </div>
                    <button class="btn" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        <?php else: ?>
            
            <!-- Dashboard de Depuración de Rebotes -->
            <div class="tabs">
                <div class="tab active" onclick="switchTab('manual')">Depuración Manual</div>
                <div class="tab" onclick="switchTab('automatic')">Depuración Automática (IMAP)</div>
            </div>

            <!-- TAB 1: MANUAL DEPURATOR -->
            <div id="tab-manual" class="card">
                <h2>Depurador por Extracción Inteligente (Regex)</h2>
                <p class="desc-p">
                    Pega el contenido completo del correo de error que has recibido (los rebotados por "Mail Delivery Subsystem", "Delivery Status Notification", etc.) o directamente un listado de emails. El algoritmo buscará, extraerá todas las direcciones de correo válidas presentes en el texto y las marcará en Supabase como rebotadas para que el sistema las omita de forma automática en los siguientes envíos feriales.
                </p>

                <?php if (isset($_POST['bounce_paste'])): ?>
                    <div class="alert alert-success">
                        <strong>¡Proceso de Depuración Concluido!</strong> Se ha escaneado el contenido con éxito. A continuación se muestran los resultados detallados de la base de datos de Supabase.
                    </div>
                <?php endif; ?>

                <form method="POST">
                    <div class="input-group">
                        <label for="bounce_paste">Bloque de Texto a Analizar</label>
                        <textarea class="form-control" id="bounce_paste" name="bounce_paste" placeholder="Pega aquí el cuerpo de correo de error devuelto por el servidor, cabeceras técnicas, logs o lista de emails..." required></textarea>
                    </div>

                    <div class="input-group">
                        <label for="reason">Motivo del Rebote / Código de Error</label>
                        <input class="form-control" type="text" id="reason" name="reason" value="Dirección rebotada (Hard Bounce o Buzón lleno)" placeholder="Ej: Buzón inexistente (5.1.1), Buzón lleno (5.2.2)...">
                    </div>

                    <button class="btn" type="submit">Analizar y Depurar Contactos</button>
                </form>

                <?php if (isset($_POST['bounce_paste'])): ?>
                    <div class="grid-results">
                        <!-- LIMPIADOS CON ÉXITO -->
                        <div class="result-box">
                            <div class="result-box-title text-success">
                                Limpiados en Supabase
                                <span class="count-badge"><?php echo count($bouncedEmailsList); ?></span>
                            </div>
                            <?php if (empty($bouncedEmailsList)): ?>
                                <p style="font-size:12px; color:var(--color-text-muted);">Ninguno en esta sesión.</p>
                            <?php else: ?>
                                <ul class="result-list">
                                    <?php foreach ($bouncedEmailsList as $mail): ?>
                                        <li class="text-success">✓ <?php echo htmlspecialchars($mail); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </div>

                        <!-- YA ESTABAN REBOTADOS -->
                        <div class="result-box">
                            <div class="result-box-title text-warning">
                                Ya estaban marcados
                                <span class="count-badge"><?php echo count($alreadyBouncedList); ?></span>
                            </div>
                            <?php if (empty($alreadyBouncedList)): ?>
                                <p style="font-size:12px; color:var(--color-text-muted);">Ninguno en esta sesión.</p>
                            <?php else: ?>
                                <ul class="result-list">
                                    <?php foreach ($alreadyBouncedList as $mail): ?>
                                        <li class="text-warning">⚠ <?php echo htmlspecialchars($mail); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </div>

                        <!-- NO ENCONTRADOS EN LA BD -->
                        <div class="result-box">
                            <div class="result-box-title text-error">
                                No existentes en la BD
                                <span class="count-badge"><?php echo count($notFoundEmailsList); ?></span>
                            </div>
                            <?php if (empty($notFoundEmailsList)): ?>
                                <p style="font-size:12px; color:var(--color-text-muted);">Ninguno en esta sesión.</p>
                            <?php else: ?>
                                <ul class="result-list">
                                    <?php foreach ($notFoundEmailsList as $mail): ?>
                                        <li>✖ <?php echo htmlspecialchars($mail); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <!-- TAB 2: AUTOMATIC IMAP SCANNER -->
            <div id="tab-automatic" class="card" style="display: none;">
                <h2>Lector Automático por IMAP (Bandeja de Entrada)</h2>
                <p class="desc-p">
                    El sistema automático se conecta de forma segura a tu bandeja de entrada (`info@standarte.es`), busca correos no leídos correspondientes a rebotes de entrega del servidor ("Mail Delivery System") y actualiza automáticamente los contactos en Supabase.
                </p>

                <?php
                $imapConfigured = defined('IMAP_HOST') && defined('IMAP_USER') && defined('IMAP_PASS');
                if (!$imapConfigured):
                ?>
                    <div class="imap-setup-card" style="border-color: var(--color-error);">
                        <svg viewBox="0 0 24 24" style="fill: var(--color-error);">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <h3 style="margin-top:0; margin-bottom:10px; font-size:16px; color: var(--color-error);">Configuración Incompleta</h3>
                        <p style="font-size:13px; color:var(--color-text-muted); max-width:500px; margin:0 auto 20px;">
                            Por favor, asegúrate de que las constantes IMAP están correctamente configuradas en el archivo <code>supabase-config.php</code>.
                        </p>
                    </div>
                <?php else: ?>
                    <div class="imap-setup-card" style="border-style: solid; text-align: left; padding: 25px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 15px; margin-bottom: 20px;">
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: var(--color-primary);">Conexión IMAP Lista</h3>
                                <p style="margin: 5px 0 0 0; font-size: 13px; color: var(--color-text-muted);">
                                    Servidor: <span style="font-family: monospace; color: var(--color-text);"><?php echo htmlspecialchars(IMAP_HOST); ?></span> | 
                                    Usuario: <span style="font-family: monospace; color: var(--color-text);"><?php echo htmlspecialchars(IMAP_USER); ?></span>
                                </p>
                            </div>
                            <span style="background-color: rgba(40, 167, 69, 0.15); color: #a3e6a3; border: 1px solid var(--color-success); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">Configurado</span>
                        </div>

                        <button id="btn-run-imap" class="btn" onclick="runImapScan()" style="max-width: 300px; margin: 0 auto; display: block;">Iniciar Escaneo de Rebotes IMAP</button>

                        <!-- Consola de Logs -->
                        <div id="imap-console" style="display: none; margin-top: 25px; font-family: monospace; background-color: #050606; border: 1px solid var(--color-border); border-radius: 8px; padding: 20px; font-size: 13px; line-height: 1.6; max-height: 350px; overflow-y: auto;">
                            <div style="color: var(--color-primary); font-weight: bold; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                                <span>CONSOLA DE LOGS DE IMAP</span>
                                <span id="imap-spinner" style="display:none; font-size: 12px; color: var(--color-text-muted);">Procesando emails...</span>
                            </div>
                            <div id="imap-log-lines"></div>
                        </div>
                    </div>

                    <!-- Configuración del Cron -->
                    <div class="card" style="margin-top: 30px; background-color: #0c0d0e; border: 1px solid var(--color-border); padding: 25px;">
                        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.5px;">Automatización de Tareas (Cron Job)</h3>
                        <p class="desc-p" style="margin-bottom: 15px; font-size: 13px;">
                            Para ejecutar la depuración de rebotes en segundo plano de forma periódica, puedes dar de alta la siguiente tarea programada (Cron Job) en el panel de control de tu alojamiento (ej. OVH):
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <label style="font-size: 11px;">URL de Ejecución Segura</label>
                            <div style="display: flex; gap: 10px;">
                                <input class="form-control" type="text" readonly id="cron-url" value="<?php echo htmlspecialchars('https://' . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?') . '?cron=1&token=' . (defined('BOUNCE_CRON_TOKEN') ? BOUNCE_CRON_TOKEN : '')); ?>" style="background-color: #050606; font-family: monospace; font-size: 12px; color: #ffc800;">
                                <button class="btn" onclick="copyCronUrl()" style="width: auto; padding: 0 25px; font-size: 13px; white-space: nowrap;">Copiar URL</button>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

        <?php endif; ?>

    </div>

    <script>
        function switchTab(tabId) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(t => t.classList.remove('active'));
            
            document.getElementById('tab-manual').style.display = 'none';
            document.getElementById('tab-automatic').style.display = 'none';

            if (tabId === 'manual') {
                tabs[0].classList.add('active');
                document.getElementById('tab-manual').style.display = 'block';
            } else {
                tabs[1].classList.add('active');
                document.getElementById('tab-automatic').style.display = 'block';
            }
        }

        function runImapScan() {
            const btn = document.getElementById('btn-run-imap');
            const consoleBox = document.getElementById('imap-console');
            const logLines = document.getElementById('imap-log-lines');
            const spinner = document.getElementById('imap-spinner');

            btn.disabled = true;
            btn.innerText = 'Escaneando...';
            consoleBox.style.display = 'block';
            logLines.innerHTML = '<div style="color: #8e959d;">[INFO] Conectando con el servidor IMAP...</div>';
            spinner.style.display = 'inline';

            fetch('?action=scan_imap')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Código de estado HTTP ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    spinner.style.display = 'none';
                                        if (!data.success) {
                        logLines.innerHTML += `<div style="color: var(--color-error); margin-top: 10px;">[ERROR] Falló el escaneo. Detalles:</div>`;
                        if (data.errors && data.errors.length > 0) {
                            data.errors.forEach(err => {
                                logLines.innerHTML += `<div style="color: var(--color-error); padding-left: 15px;">- ${err}</div>`;
                                if (err.includes('AUTHENTICATIONFAILED') || err.toLowerCase().includes('credentials') || err.toLowerCase().includes('authenticate')) {
                                    logLines.innerHTML += `
                                    <div style="color: var(--color-warning); margin-top: 15px; padding: 15px; background-color: rgba(255, 193, 7, 0.08); border: 1px solid rgba(255, 193, 7, 0.3); border-radius: 8px; font-size: 13px; line-height: 1.6;">
                                        <strong style="color: var(--color-warning); font-size: 14px; display: block; margin-bottom: 8px;">Guía de resolución para cuentas de Gmail / Google Workspace:</strong>
                                        1. <strong>Habilitar acceso IMAP en Gmail:</strong> Entra a tu cuenta en <a href="https://mail.google.com" target="_blank" style="color: var(--color-primary); text-decoration: underline;">mail.google.com</a>, ve a Ajustes (icono de engranaje) -> Ver todos los ajustes -> Reenvío y correo POP/IMAP -> Acceso IMAP -> Selecciona <strong>'Habilitar IMAP'</strong> -> Guardar cambios.<br>
                                        2. <strong>Contraseña de Aplicación (Recomendado):</strong> Si tienes habilitada la verificación en dos pasos (2FA) en Google, debes generar una contraseña de aplicación específica para este script. Ve a <a href="https://myaccount.google.com/security" target="_blank" style="color: var(--color-primary); text-decoration: underline;">myaccount.google.com/security</a> -> Contraseñas de aplicación -> Genera una y colócala en la constante <code>IMAP_PASS</code> en <code>supabase-config.php</code>.
                                    </div>`;
                                }
                            });
                        } else {
                            logLines.innerHTML += `<div style="color: var(--color-error); padding-left: 15px;">- Error desconocido.</div>`;
                        }
                        return;
                    }

                    logLines.innerHTML += `<div style="color: var(--color-success); margin-top: 5px;">[ÉXITO] Conexión IMAP cerrada correctamente.</div>`;
                    logLines.innerHTML += `<div style="margin-top: 15px; font-weight: bold; border-top: 1px dashed var(--color-border); padding-top: 10px; color: var(--color-primary);">Resumen del Proceso:</div>`;
                    logLines.innerHTML += `<div>- Correos analizados en bandeja (últimos 30 días): <span style="color: #ffffff; font-weight: bold;">${data.unseen_count}</span></div>`;
                    logLines.innerHTML += `<div>- Correos de rebote identificados: <span style="color: #ffffff; font-weight: bold;">${data.bounces_detected}</span></div>`;
                    logLines.innerHTML += `<div>- Contactos actualizados en Supabase: <span style="color: var(--color-success); font-weight: bold;">${data.processed_count}</span></div>`;

                    // Listar emails limpiados
                    if (data.bounced_emails && data.bounced_emails.length > 0) {
                        logLines.innerHTML += `<div style="color: var(--color-success); margin-top: 15px; font-weight: bold;">✓ Direcciones marcadas como "bounced" en esta sesión:</div>`;
                        data.bounced_emails.forEach(email => {
                            logLines.innerHTML += `<div style="color: var(--color-success); padding-left: 15px;">✓ ${email}</div>`;
                        });
                    }

                    // Listar emails que ya estaban marcados
                    if (data.already_bounced && data.already_bounced.length > 0) {
                        logLines.innerHTML += `<div style="color: var(--color-warning); margin-top: 15px; font-weight: bold;">⚠ Direcciones que ya estaban rebotadas en Supabase:</div>`;
                        data.already_bounced.forEach(email => {
                            logLines.innerHTML += `<div style="color: var(--color-warning); padding-left: 15px;">⚠ ${email}</div>`;
                        });
                    }

                    // Listar emails no encontrados
                    if (data.not_found_emails && data.not_found_emails.length > 0) {
                        logLines.innerHTML += `<div style="color: var(--color-text-muted); margin-top: 15px; font-weight: bold;">✖ Direcciones capturadas pero inexistentes en la base de datos:</div>`;
                        data.not_found_emails.forEach(email => {
                            logLines.innerHTML += `<div style="color: var(--color-text-muted); padding-left: 15px;">✖ ${email}</div>`;
                        });
                    }
                    
                    if (data.bounces_detected === 0) {
                        logLines.innerHTML += `<div style="color: var(--color-text-muted); margin-top: 15px;">[INFO] No se han detectado nuevos correos de rebote. Todo está al día.</div>`;
                    }
                })
                .catch(error => {
                    spinner.style.display = 'none';
                    btn.disabled = false;
                    btn.innerText = 'Iniciar Escaneo de Rebotes IMAP';
                    logLines.innerHTML += `<div style="color: var(--color-error); margin-top: 10px;">[ERROR] Falló la petición: ${error.message || error}</div>`;
                });
        }

        function copyCronUrl() {
            const copyText = document.getElementById("cron-url");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value)
                .then(() => {
                    alert("¡URL del Cron copiada al portapapeles!");
                })
                .catch(() => {
                    alert("No se pudo copiar automáticamente. Por favor, cópiala manualmente.");
                });
        }
    </script>
</body>
</html>
