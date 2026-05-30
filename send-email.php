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

/**
 * Valida un email de forma avanzada para evitar rebotes:
 * 1. Sintaxis básica mediante FILTER_VALIDATE_EMAIL.
 * 2. Filtrado de dominios de correos temporales o desechables comunes.
 * 3. Verificación DNS en tiempo real de registros MX (Mail Exchange) y A.
 */
function send_email_is_valid_email_advanced($email)
{
    $email = trim($email);

    // 1. Validación de sintaxis básica
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    // 2. Extraer el dominio
    $parts = explode('@', $email);
    if (count($parts) < 2) {
        return false;
    }
    $domain = strtolower(end($parts));

    // 3. Lista negra de dominios de email temporal / desechable comunes
    $disposableDomains = array(
        'yopmail.com', 'yopmail.fr', 'yopmail.net', 'cool.fr.nf', 'jetable.fr.nf',
        'courriel.fr.nf', 'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf',
        'tempmail.com', 'temp-mail.org', 'mailinator.com', '10minutemail.com',
        'guerrillamail.com', 'sharklasers.com', 'dispostable.com', 'getairmail.com',
        'throwawaymail.com', 'tempmailaddress.com', 'maildrop.cc'
    );
    if (in_array($domain, $disposableDomains, true)) {
        return false;
    }

    // 4. Verificación de registros DNS en tiempo real (MX o A)
    if (function_exists('checkdnsrr')) {
        if (!checkdnsrr($domain, 'MX')) {
            // Si no tiene registro MX, comprobamos el registro A como fallback
            return checkdnsrr($domain, 'A');
        }
        return true;
    }

    return true;
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
        if (stripos($rawAsunto, $empresa) === false) {
            $asunto = "{$empresa}: " . htmlspecialchars($rawAsunto);
        } else {
            $asunto = htmlspecialchars($rawAsunto);
        }
    }
    
    $cuerpoText = isset($record['cuerpo']) ? htmlspecialchars($record['cuerpo']) : "";
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
    if (empty($email) || !send_email_is_valid_email_advanced($email)) {
        $totalRechazados++;
        $resultados[] = [
            "index" => $index,
            "empresa" => $empresa,
            "email" => $email,
            "status" => "RECHAZADO",
            "motivo" => "Dirección de correo electrónico rechazada por el sistema de verificación (sintaxis incorrecta, dominio desechable o DNS MX/A inactivo para evitar rebotes)."
        ];
        continue;
    }


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
                            
                            <!-- Botón de Llamado a la Acción -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 35px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://standarte.es/contacto" target="_blank" style="background-color: #292f35; border: 2px solid #ffc800; border-radius: 30px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: bold; line-height: 46px; text-align: center; text-decoration: none; width: 280px; -webkit-text-size-adjust: none; transition: background 0.3s ease; letter-spacing: 0.05em;">
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
                                        <a href="https://standarte.es/contacto" target="_blank" style="color: #ffc800; font-size: 11px; text-decoration: none; margin: 0 10px;">Contacto</a>
                                        <span style="color: #666666;">|</span>
                                        <a href="https://standarte.es" target="_blank" style="color: #ffc800; font-size: 11px; text-decoration: none; margin: 0 10px;">Web Oficial</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 9px; line-height: 1.4; margin: 0;">
                                Este mensaje fue enviado de forma automática a solicitud de una campaña autorizada.<br>
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

    // Configurar cabeceras de correo electrónico real
    $headers = [
        "MIME-Version: 1.0",
        "Content-type: text/html; charset=UTF-8",
        "From: Standarte <hola@standarte.es>",
        "Reply-To: hola@standarte.es",
        "X-Mailer: PHP/" . phpversion()
    ];

    // Intentar envío de correo real
    $realMailSuccess = false;
    try {
        // En un entorno de desarrollo local con MAMP sin SMTP configurado, mail() puede lanzar warnings
        // Usamos el operador de control de errores @ para evitar romper el flujo JSON de salida
        $realMailSuccess = @mail($email, $asunto, $emailHtml, implode("\r\n", $headers));
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
