<?php
/**
 * Standarte - Sistema Conforme de Baja Voluntaria (LSSI/RGPD)
 * 
 * Este script procesa las solicitudes de baja del boletín ferial,
 * valida el token de seguridad y actualiza el estado en Supabase.
 */

// Evitar almacenamiento en caché
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Cargar configuración
$configFile = __DIR__ . '/supabase-config.php';
if (!is_file($configFile)) {
    // Si no está en el mismo directorio (ej. en desarrollo local)
    $configFile = dirname(__DIR__) . '/supabase-config.php';
}
require_once $configFile;

/**
 * Realiza peticiones HTTP seguras a la API REST de Supabase
 */
function supabase_rest_request($method, $endpoint, $data = null) {
    $ch = curl_init();
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Permitir entornos locales sin certificados completos
    
    $headers = [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ];
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

// 1. Capturar parámetros de la URL
$emailBase64 = isset($_GET['email']) ? trim($_GET['email']) : '';
$token = isset($_GET['token']) ? trim($_GET['token']) : '';
$action = isset($_GET['action']) ? trim($_GET['action']) : 'unsubscribe'; // 'unsubscribe' o 'resubscribe'

$email = '';
$errorMsg = '';
$success = false;

// 2. Validar parámetros y verificar integridad criptográfica
if (empty($emailBase64) || empty($token)) {
    $errorMsg = 'Los parámetros de seguridad están ausentes o son inválidos.';
} else {
    // Decodificar el correo de forma segura
    $email = base64_decode($emailBase64);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMsg = 'La dirección de correo electrónico no tiene un formato válido.';
    } else {
        // Generar token local para comprobar autenticidad
        $expectedToken = md5($email . UNSUBSCRIBE_SECRET_SALT);
        if ($token !== $expectedToken) {
            $errorMsg = 'El token de seguridad es inválido. No se puede procesar la solicitud.';
        }
    }
}

// 3. Procesar acción si no hay errores de validación
if (empty($errorMsg)) {
    if ($action === 'unsubscribe') {
        // Marcar en Supabase como desuscrito (status = 'unsubscribed')
        $updateData = [
            'status' => 'unsubscribed',
            'unsubscribed_at' => date('c') // ISO 8601
        ];
        // PATCH actualiza el registro que coincide con el filtro
        $res = supabase_rest_request('PATCH', 'contacts?email=eq.' . urlencode($email), $updateData);
        if ($res['code'] >= 200 && $res['code'] < 300) {
            $success = true;
        } else {
            $errorMsg = 'No pudimos procesar la baja en nuestra base de datos. Por favor inténtalo de nuevo.';
        }
    } else if ($action === 'resubscribe') {
        // Volver a activar al usuario (status = 'active')
        $updateData = [
            'status' => 'active',
            'unsubscribed_at' => null
        ];
        $res = supabase_rest_request('PATCH', 'contacts?email=eq.' . urlencode($email), $updateData);
        if ($res['code'] >= 200 && $res['code'] < 300) {
            $success = true;
        } else {
            $errorMsg = 'No pudimos reactivar tu suscripción. Por favor inténtalo de nuevo.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standarte - Gestión de Suscripción</title>
    <!-- Tipografía Outfit de Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #111111;
            --color-card: #1c1c1c;
            --color-primary: #ffc800;
            --color-text: #ffffff;
            --color-text-muted: #aaaaaa;
            --color-border: #333333;
            --color-success: #28a745;
            --color-error: #dc3545;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: 'Outfit', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
        }

        .container {
            max-width: 500px;
            width: 90%;
            padding: 40px;
            background-color: var(--color-card);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo {
            width: 180px;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
        }

        p {
            font-size: 16px;
            color: var(--color-text-muted);
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .icon {
            font-size: 50px;
            margin-bottom: 20px;
        }

        .icon.success { color: var(--color-primary); }
        .icon.error { color: var(--color-error); }

        .btn {
            display: inline-block;
            background-color: transparent;
            border: 2px solid var(--color-primary);
            color: var(--color-primary);
            text-decoration: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 30px;
            transition: all 0.3s ease;
            cursor: pointer;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .btn:hover {
            background-color: var(--color-primary);
            color: var(--color-bg);
            box-shadow: 0 5px 15px rgba(255, 200, 0, 0.4);
        }

        .btn-muted {
            border-color: var(--color-border);
            color: var(--color-text-muted);
            margin-top: 15px;
            font-size: 16px;
            padding: 8px 20px;
        }

        .btn-muted:hover {
            background-color: var(--color-border);
            color: var(--color-text);
            box-shadow: none;
        }

        .footer {
            margin-top: 40px;
            font-size: 16px;
            color: #555555;
            border-top: 1px solid #222;
            padding-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Logotipo de Standarte -->
        <img class="logo" src="https://standarte.es/img/logo_stand-arte_negro.svg" alt="Standarte Logo" style="filter: invert(1);">

        <?php if (!empty($errorMsg)): ?>
            <div class="icon error">⚠️</div>
            <h1>Ha ocurrido un problema</h1>
            <p><?php echo htmlspecialchars($errorMsg); ?></p>
            <a href="https://standarte.es" class="btn">Ir a la Web Oficial</a>
        <?php elseif ($action === 'unsubscribe' && $success): ?>
            <div class="icon success">✓</div>
            <h1>Baja confirmada con éxito</h1>
            <p>
                Tu correo <strong><?php echo htmlspecialchars($email); ?></strong> ha sido eliminado de nuestras listas de difusión de marketing de forma inmediata, cumpliendo con la legislación vigente de protección de datos (LSSI/RGPD).
            </p>
            <p style="font-size: 16px; font-style: italic;">
                ¿Ha sido un error? Si has pulsado el enlace sin querer, puedes volver a suscribirte en cualquier momento.
            </p>
            <a href="unsubscribe.php?email=<?php echo urlencode($emailBase64); ?>&token=<?php echo urlencode($token); ?>&action=resubscribe" class="btn">Volver a suscribirme</a>
        <?php elseif ($action === 'resubscribe' && $success): ?>
            <div class="icon success">✨</div>
            <h1>¡Suscripción reactivada!</h1>
            <p>
                ¡Gracias por volver! Tu correo <strong><?php echo htmlspecialchars($email); ?></strong> ha sido reactivado en nuestro sistema de campañas de diseño 3D ferial de alta carpintería.
            </p>
            <a href="https://standarte.es" class="btn">Visitar la Web Oficial</a>
        <?php endif; ?>

        <div class="footer">
            © 2026 Standarte. Proceso conforme al Reglamento General de Protección de Datos (RGPD) de la UE.
        </div>
    </div>

</body>
</html>
