<?php
/**
 * Standarte - Backend Auxiliar para Envío de Correos Multimedia (Entorno MAMP)
 * 
 * Este script procesa peticiones HTTP POST con payloads JSON, valida el token
 * de seguridad y la regla de negocio ("negocio" == "standarte"), genera el correo
 * multimedia premium con trabajos de la galería y registra las operaciones locales.
 */

// Habilitar CORS para permitir pruebas desde el servidor de desarrollo Vite (localhost:5173)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Manejar petición preflight de CORS OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validar que el método de acceso sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Método no permitido. Solo se aceptan peticiones POST."
    ]);
    exit();
}

// Token de seguridad por defecto para la validación
define("SECURE_TOKEN", "STANDARTE_MAIL_SECURE_2026");

// Ruta del archivo de logs local para MAMP (sin base de datos)
$logFile = __DIR__ . '/sent_emails_log.json';
require_once __DIR__ . '/admin/email_campaing/campaign_throttle.php';
require_once __DIR__ . '/admin/email_campaing/mailer.php';
$config = require_once __DIR__ . '/admin/email_campaing/config.php';

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
function send_email_supabase_request($method, $endpoint, $data = null) {
    if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
        return ['code' => 500, 'body' => 'Configuración de Supabase ausente.'];
    }

    $ch = curl_init();
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
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
 * Wrapper de compatibilidad para validación avanzada de correos.
 */
function send_email_is_valid_email_advanced($email)
{
    return campaign_is_valid_email_advanced($email);
}


// Obtener el contenido JSON recibido
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "El JSON recibido está mal formado o es inválido."
    ]);
    exit();
}

// 1. Validar presencia y corrección del Token
if (!isset($data['token']) || empty($data['token'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error" => "Token de validación ausente en la petición."
    ]);
    exit();
}

if ($data['token'] !== SECURE_TOKEN) {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "error" => "Token de seguridad inválido. Acceso denegado."
    ]);
    exit();
}

// 2. Validar presencia de registros
if (!isset($data['records']) || !is_array($data['records'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "No se encontraron registros en el campo 'records' o no es un arreglo válido."
    ]);
    exit();
}

// Datos de los 3 trabajos reales destacados extraídos de siteData.js
$trabajosGaleria = [
    [
        "titulo" => "TCANTICO",
        "imagen" => "https://standarte.es/img/trabajos/TCANTICO/1.jpg",
        "descripcion" => "Un stand con presencia arquitectónica clara y zonas abiertas que facilitan la conversación comercial. La marca gana visibilidad sin crear barreras para el visitante."
    ],
    [
        "titulo" => "TCELUMATEC",
        "imagen" => "https://standarte.es/img/trabajos/TCELUMATEC/4.jpg",
        "descripcion" => "La estructura ordenada y los planos limpios transmiten precisión técnica. Es una solución pensada para reforzar confianza en productos industriales o de alto valor."
    ],
    [
        "titulo" => "TCCONSTELLIUM",
        "imagen" => "https://standarte.es/img/trabajos/TCCONSTELLIUM/2.jpg",
        "descripcion" => "El espacio combina volumen, rotulación visible y una circulación sencilla. Ayuda a que el visitante identifique la marca rápido y entienda dónde iniciar el contacto."
    ]
];

// Procesar cada registro
$resultados = [];
$totalProcesados = 0;
$totalEnviados = 0;
$totalRechazados = 0;

foreach ($data['records'] as $index => $record) {
    $empresa = isset($record['empresa']) ? htmlspecialchars($record['empresa']) : "Cliente Especial";
    $email = isset($record['email']) ? filter_var($record['email'], FILTER_SANITIZE_EMAIL) : "";
    $feria = isset($record['feria']) ? htmlspecialchars($record['feria']) : "";
    $categoria = isset($record['categoría']) ? htmlspecialchars($record['categoría']) : (isset($record['categoria']) ? htmlspecialchars($record['categoria']) : "General");
    
    $rawAsunto = isset($record['asunto']) ? trim($record['asunto']) : '';
    if ($rawAsunto === '' || $rawAsunto === 'Diseño a medida con Standarte') {
        $asunto = "¿Está el stand de {$empresa} listo para liderar la feria o pasará desapercibido?";
    } else {
        $rawAsunto = preg_replace('/\{\{EMPRESA\}\}/i', $empresa, $rawAsunto);
        $rawAsunto = preg_replace('/\{EMPRESA\}/i', $empresa, $rawAsunto);
        $rawAsunto = preg_replace('/\{\{COMPANY\}\}/i', $empresa, $rawAsunto);
        $rawAsunto = preg_replace('/\{COMPANY\}/i', $empresa, $rawAsunto);
        
        if (stripos($rawAsunto, $empresa) === false) {
            $asunto = "{$empresa}: " . htmlspecialchars($rawAsunto);
        } else {
            $asunto = htmlspecialchars($rawAsunto);
        }
    }
    
    $cuerpoText = isset($record['cuerpo']) ? trim($record['cuerpo']) : "";
    $cuerpoText = preg_replace('/\{\{EMPRESA\}\}/i', $empresa, $cuerpoText);
    $cuerpoText = preg_replace('/\{EMPRESA\}/i', $empresa, $cuerpoText);
    $cuerpoText = preg_replace('/\{\{COMPANY\}\}/i', $empresa, $cuerpoText);
    $cuerpoText = preg_replace('/\{COMPANY\}/i', $empresa, $cuerpoText);
    $cuerpoText = htmlspecialchars($cuerpoText);
    
    $negocio = isset($record['negocio']) ? strtolower(trim($record['negocio'])) : "";

    $totalProcesados++;

    // Validación 1: Regla de Negocio
    if ($negocio !== 'standarte') {
        $totalRechazados++;
        $resultados[] = [
            "index" => $index,
            "empresa" => $empresa,
            "email" => $email,
            "status" => "RECHAZADO",
            "motivo" => "El campo 'negocio' no tiene el valor requerido 'standarte' (Valor actual: '$negocio')."
        ];
        continue;
    }

    // Validación 2: Email válido con verificación avanzada anti-rebotes (sintaxis + desechables + DNS MX/A)
    $email_err = '';
    if (empty($email) || !campaign_is_valid_email_advanced($email, $email_err)) {
        $totalRechazados++;
        $motivo = "Dirección de correo electrónico rechazada por el sistema de verificación avanzada: " . ($email_err ?: "sintaxis incorrecta o DNS inactivo.");
        $resultados[] = [
            "index" => $index,
            "empresa" => $empresa,
            "email" => $email,
            "status" => "RECHAZADO",
            "motivo" => $motivo
        ];
        
        // Registrar como rebotado permanente para servir como lista de exclusión activa
        if (!empty($email) && defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
            $bounceData = [
                'email' => $email,
                'empresa' => $empresa,
                'feria' => $feria,
                'categoria' => $categoria,
                'status' => 'bounced',
                'bounce_reason' => 'Verification failed: ' . $email_err,
                'updated_at' => date('c')
            ];
            send_email_supabase_request('POST', 'contacts?on_conflict=email', $bounceData);
        }
        continue;
    }

    // Validación Supabase: Exclusión por desuscripción o rebotes previos (LSSI/RGPD)
    $isExcluded = false;
    $excludeReason = '';
    
    if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
        $status = 'active';
        $excludeSource = '';
        
        $res = send_email_supabase_request('GET', 'contacts?email=eq.' . urlencode($email));
        if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
            $status = $res['body'][0]['status'] ?? 'active';
            $excludeSource = 'contacts';
        }
        
        if ($status !== 'unsubscribed' && $status !== 'bounced') {
            $resLuz = send_email_supabase_request('GET', 'luz_contacts?email=eq.' . urlencode($email));
            if ($resLuz['code'] === 200 && is_array($resLuz['body']) && count($resLuz['body']) > 0) {
                $status = $resLuz['body'][0]['status'] ?? 'active';
                $excludeSource = 'luz_contacts';
            }
        }
        
        if ($status === 'unsubscribed') {
            $isExcluded = true;
            $excludeReason = "Envío omitido: El destinatario se ha dado de baja de forma voluntaria de las listas comerciales (LSSI/RGPD) ($excludeSource).";
        } else if ($status === 'bounced') {
            $isExcluded = true;
            $excludeReason = "Envío omitido: La dirección de correo electrónico está marcada como rebotada/fallida ($excludeSource).";
        }
    }
    
    if ($isExcluded) {
        $totalRechazados++;
        $resultados[] = [
            "index" => $index,
            "empresa" => $empresa,
            "email" => $email,
            "status" => "RECHAZADO",
            "motivo" => $excludeReason
        ];
        continue;
    }


    // Validación 3: Control de envío único (bloqueo de 1 mes por empresa o email)
    $historyFile = __DIR__ . '/admin/email_campaing/data/campaign-history.json';
    $lastSentTime = campaign_check_throttle($email, $empresa, $historyFile);
    if ($lastSentTime !== false) {
        $totalRechazados++;
        $resultados[] = [
            "index" => $index,
            "empresa" => $empresa,
            "email" => $email,
            "status" => "RECHAZADO",
            "motivo" => "Envío omitido: Ya se ha enviado un correo a esta misma empresa/correo en el último mes (hace " . round((time() - $lastSentTime) / (24 * 60 * 60)) . " días)."
        ];
        continue;
    }


    // Preparar tokens y enlaces dinámicos para tracking y baja voluntaria conforme a LSSI/RGPD
    $emailBase64 = base64_encode($email);
    $unsubToken = md5($email . UNSUBSCRIBE_SECRET_SALT);
    
    // Obtener host de la petición para compatibilidad local (MAMP) y remota (Producción)
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
    $hostName = $_SERVER['HTTP_HOST'] ?? 'standarte.es';
    $baseDomain = (strpos($hostName, 'localhost') !== false) ? $protocol . $hostName . '/STANDARTE_SVELTE' : 'https://standarte.es';
    
    $unsubscribeLink = $baseDomain . "/unsubscribe.php?email=" . urlencode($emailBase64) . "&token=" . urlencode($unsubToken);
    
    // Enlaces enmascarados para Click Tracker Nominal
    $ctaButtonLink = $baseDomain . "/email-track.php?email=" . urlencode($emailBase64) . "&to=" . urlencode('contacto') . "&from=main-cta-button";
    $footerContactLink = $baseDomain . "/email-track.php?email=" . urlencode($emailBase64) . "&to=" . urlencode('contacto') . "&from=footer-contact";
    $footerWebLink = $baseDomain . "/email-track.php?email=" . urlencode($emailBase64) . "&to=" . urlencode('/') . "&from=footer-web";

    // Generar la plantilla HTML multimedia Premium
    $emailHtml = <<<HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$asunto}</title>
    <style>
        /* Reset y estilos generales */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #333333; }
        
        /* Estilos específicos responsivos */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
            .col-3 { display: block !important; width: 100% !important; padding: 10px 0 !important; }
            .gallery-image { width: 100% !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8;">

    <!-- Contenedor Principal Centrado -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0; background-color: #f4f6f8;">
                
                <!-- Tarjeta de Contenido -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);">
                    
                    <!-- Encabezado Claro Premium -->
                    <tr>
                        <td align="center" style="background-color: #ffffff; padding: 40px 30px;">
                            <!-- Logotipo Standarte -->
                            <img src="https://standarte.es/img/logo_stand-arte_negro.svg" alt="Standarte Logo" width="220" style="display: block; margin-bottom: 15px;">
                            <p style="color: #292f35; font-size: 13px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-family: 'Glegoo', serif; text-align: center;">Diseño y Construcción de Stands Internacionales</p>
                        </td>
                    </tr>
                    
                    <!-- Cuerpo del Correo -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <!-- Título Retador y Emocional al inicio -->
                            <h1 style="margin: 0 0 20px 0; font-family: Georgia, Times, serif; font-size: 26px; line-height: 1.25; color: #111111; font-weight: normal; text-align: center;">{$empresa}: ¿Su stand realmente atraerá clientes o solo ocupará espacio?</h1>
                            
                            <!-- Saludo Personalizado -->
                            <h2 style="margin-top: 0; color: #555555; font-size: 18px; font-weight: normal; line-height: 1.3; text-align: center; margin-bottom: 25px;">Estimado equipo de {$empresa},</h2>
                            
                            <p style="font-size: 15px; line-height: 1.65; color: #333333; margin-bottom: 20px; text-align: center;">
                                Su presencia en la feria <strong>{$feria}</strong> (dentro de la categoría de <strong>{$categoria}</strong>) es una oportunidad única de negocio. Pero seamos realistas: en un pabellón saturado de estímulos, la inmensa mayoría de los stands pasan completamente desapercibidos. ¿Permitirá que el suyo sea uno más del montón?
                            </p>
                            
                            <!-- Caja de Texto Personalizado Destacada -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcf9ee; border-left: 4px solid #ffc800; border-radius: 4px; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 15px 20px; text-align: center;">
                                        <p style="font-size: 15px; font-style: italic; line-height: 1.6; color: #292f35; margin: 0; text-align: center;">
                                            "{$cuerpoText}"
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-size: 15px; line-height: 1.65; color: #333333; margin-bottom: 30px; text-align: center;">
                                En <strong>Standarte</strong> no diseñamos stands convencionales: creamos hitos arquitectónicos e imanes de clientes que posicionan a su marca como el líder indiscutible de su sector. Para inspirar el proyecto de <strong>{$empresa}</strong>, le presentamos tres de nuestros diseños en madera real más valorados y eficientes:
                            </p>
                            
                            <h3 style="color: #292f35; border-bottom: 2px solid #eef0f2; padding-bottom: 10px; margin-bottom: 20px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Galería de Proyectos Destacados</h3>
                            
                            <!-- Grilla de Trabajos Multimedia (3 Columnas / Responsivo) -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
HTML;

    // Agregar los 3 trabajos a la grilla HTML
    foreach ($trabajosGaleria as $tIndex => $trabajo) {
        $img = $trabajo['imagen'];
        $titulo = $trabajo['titulo'];
        $desc = $trabajo['descripcion'];
        
        $emailHtml .= <<<HTML
                                    <!-- Celda de Trabajo -->
                                    <td class="col-3" valign="top" width="170" style="padding: 0 5px; font-size: 0; line-height: 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; border: 1px solid #eef0f2; border-radius: 4px; overflow: hidden;">
                                            <tr>
                                                <td>
                                                    <img class="gallery-image" src="{$img}" alt="{$titulo}" width="170" style="display: block; width: 100%; height: 110px; object-fit: cover;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; font-family: Arial, sans-serif;">
                                                    <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #292f35; font-weight: bold;">{$titulo}</h4>
                                                    <p style="margin: 0; font-size: 11px; line-height: 1.4; color: #666666; height: 75px; overflow: hidden;">
                                                        {$desc}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
HTML;
    }

    $emailHtml .= <<<HTML
                                </tr>
                            </table>
                            
                            <!-- Botón de Llamado a la Action (Seguimiento Nominal) -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 35px;">
                                <tr>
                                    <td align="center">
                                        <a href="{$ctaButtonLink}" target="_blank" style="background-color: #292f35; border: 2px solid #ffc800; border-radius: 30px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: bold; line-height: 46px; text-align: center; text-decoration: none; width: 280px; -webkit-text-size-adjust: none; transition: background 0.3s ease; letter-spacing: 0.05em;">
                                            ACEPTAR EL RETO Y DISEÑAR MI STAND
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Pie de Página -->
                    <tr>
                        <td style="background-color: #292f35; padding: 30px; text-align: center; font-family: Arial, sans-serif;">
                            <p style="color: #ffffff; font-size: 14px; font-weight: bold; margin: 0 0 10px 0;">Standarte</p>
                            <p style="color: #aaaaaa; font-size: 11px; line-height: 1.6; margin: 0 0 15px 0;">
                                Diseño, fabricación y montaje de stands premium para ferias nacionales e internacionales.<br>
                                Madrid • Málaga • Lisboa • Badajoz
                            </p>
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin-bottom: 20px;">
                                <tr>
                                    <td>
                                        <a href="{$footerContactLink}" target="_blank" style="color: #ffc800; font-size: 11px; text-decoration: none; margin: 0 10px;">Contacto</a>
                                        <span style="color: #666666;">|</span>
                                        <a href="{$footerWebLink}" target="_blank" style="color: #ffc800; font-size: 11px; text-decoration: none; margin: 0 10px;">Web Oficial</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 9px; line-height: 1.4; margin: 0;">
                                Este mensaje fue enviado de forma automática a solicitud de una campaña autorizada.<br>
                                Conforme a la legislación LSSI-CE y el RGPD, puede revocar su consentimiento y darse de baja de estas comunicaciones de forma gratuita y en cualquier momento haciendo clic aquí: <a href="{$unsubscribeLink}" target="_blank" style="color: #ffc800; text-decoration: underline;">Darse de baja de la lista</a>.<br>
                                © 2026 Standarte. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>

                    
                </table>
                
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

    // Intentar envío de correo real usando SMTP premium
    $realMailSuccess = false;
    try {
        $realMailSuccess = campaign_send_mail($config, $email, $asunto, $emailHtml);
    } catch (Exception $e) {
        $realMailSuccess = false;
    }

    $totalEnviados++;
    $resultados[] = [
        "index" => $index,
        "empresa" => $empresa,
        "email" => $email,
        "feria" => $feria,
        "asunto" => $asunto,
        "status" => "ENVIADO",
        "real_email_sent" => $realMailSuccess,
        "method" => $realMailSuccess ? "SMTP / PHP mail()" : "Simulación local segura",
        "generated_html" => $emailHtml
    ];

    // Registrar o actualizar el contacto en la base de datos de Supabase vía REST API (on conflict = upsert)
    if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
        $contactData = [
            'email' => $email,
            'empresa' => $empresa,
            'feria' => $feria,
            'categoria' => $categoria,
            'status' => 'active', // Siempre nos aseguramos de que esté active al enviar (si ya estuviera unsubscribed/bounced se habría omitido en la validación superior)
            'updated_at' => date('c')
        ];
        send_email_supabase_request('POST', 'contacts?on_conflict=email', $contactData);
    }

    // Registrar en el historial de envíos únicos para activar el bloqueo de 1 mes
    campaign_add_to_history($email, $empresa, $historyFile);
}


// 3. Persistir Historial de Logs Local en un archivo JSON en MAMP
$currentLog = [];
if (file_exists($logFile)) {
    $existingData = json_decode(file_get_contents($logFile), true);
    if (is_array($existingData)) {
        $currentLog = $existingData;
    }
}

// Estructurar el nuevo registro del log de sesión
$sessionLog = [
    "timestamp" => date("Y-m-d H:i:s"),
    "client_ip" => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    "stats" => [
        "processed" => $totalProcesados,
        "sent" => $totalEnviados,
        "rejected" => $totalRechazados
    ],
    "records" => $resultados
];

// Limitar el historial para que no crezca indefinidamente (guardar últimas 20 sesiones de envío)
array_unshift($currentLog, $sessionLog);
if (count($currentLog) > 20) {
    $currentLog = array_slice($currentLog, 0, 20);
}

file_put_contents($logFile, json_encode($currentLog, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 4. Retornar Respuesta Exitosa al Cliente Svelte
http_response_code(200);
echo json_encode([
    "success" => true,
    "timestamp" => date("Y-m-d H:i:s"),
    "summary" => [
        "total" => $totalProcesados,
        "sent" => $totalEnviados,
        "rejected" => $totalRechazados
    ],
    "results" => $resultados,
    "log_saved" => true
], JSON_UNESCAPED_UNICODE);
