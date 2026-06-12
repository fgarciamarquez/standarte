<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1. Cargar configuración de base de datos local
require_once __DIR__ . '/admin/config.php';
require_once __DIR__ . '/admin/presupuesto_form_object.php';

// 2. Obtener parámetros
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$token = isset($_GET['token']) ? trim($_GET['token']) : '';
$action = isset($_GET['action']) ? trim($_GET['action']) : '';
$lang = isset($_GET['lang']) ? trim($_GET['lang']) : 'es';

if (!in_array($lang, ['es', 'en', 'de', 'pt', 'fr'])) {
    $lang = 'es';
}

if ($id <= 0 || empty($token) || !in_array($action, ['yes', 'no'])) {
    die("Error: Parámetros inválidos.");
}

if (!$db) {
    die("Error: No se pudo conectar a la base de datos local.");
}

// 3. Consultar datos en base de datos local
try {
    $stmt = $db->prepare("SELECT * FROM presupuestos WHERE id = ?");
    $stmt->execute([$id]);
    $lead = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    die("Error consultando base de datos: " . $e->getMessage());
}

if (!$lead) {
    die("Error: Solicitud no encontrada.");
}

$email = $lead['email'];
$nombre = $lead['nombre'];
$empresa = $lead['empresa'];
$feria = $lead['feria'];

// 4. Validar token
$expected_token = md5($id . $email . 'StandarteBudgetSelectionSalt');
if ($token !== $expected_token) {
    die("Error: Token de seguridad no coincide.");
}

// 5. Determinar estado de actualización
$status_db = ($action === 'yes') ? 'Y_SUPERIOR' : 'N_INFERIOR';

// Actualizar registro en base de datos local
try {
    $updateStmt = $db->prepare("UPDATE presupuestos SET respuesta_enviada = ? WHERE id = ?");
    $updateStmt->execute([$status_db, $id]);
} catch (Exception $e) {
    die("Error al actualizar la solicitud: " . $e->getMessage());
}

// 6. Enviar emails
$invitationEmail = new InvitationEmail();

$translations = array(
    'es' => array(
        'yes_subject' => 'Confirmación de solicitud de presupuesto - Standarte',
        'yes_title' => 'Confirmación de Interés',
        'yes_body' => 'Hola <strong>{nombre}</strong>,<br><br>Confirmamos nuestro interés en vuestra propuesta para la feria <strong>{feria}</strong>. En breve, un integrante de nuestro equipo comercial y creativo se pondrá en contacto contigo para avanzar en los detalles de vuestro stand.<br><br>Te recomendamos que vayas preparando un <strong>brief detallado</strong> con lo que deseas que tenga el stand, ideas o ejemplos de stands que te gusten, y nos los envíes a <a href="mailto:info@standarte.es" style="color:#ffc800; text-decoration:none; font-weight:bold;">info@standarte.es</a> lo antes posible para poder agilizar el diseño 3D.<br><br>¡Un saludo amable y nos vemos muy pronto!',
        'no_subject' => 'Selección de solicitudes de presupuesto - Standarte',
        'no_title' => 'Agradecemos tu Interés',
        'no_body' => 'Estimado/a <strong>{nombre}</strong>,<br><br>Agradecemos de nuevo tu interés en Standarte para vuestra participación en la feria <strong>{feria}</strong>.<br><br>Lamentablemente, en esta ocasión no podemos avanzar con vuestra propuesta, ya que nuestro equipo técnico y de diseño tiene una capacidad limitada y no podemos trabajar con presupuestos inferiores a los costes mínimos viables indicados para stands de carpintería premium a medida.<br><br>Deseamos que en un futuro podamos tener la ocasión de trabajar juntos en otros proyectos.',
        'footer' => 'Atentamente,<br><strong>El Equipo de Standarte</strong><br><a href="mailto:info@standarte.es" style="color:#ffffff; text-decoration:none;">info@standarte.es</a> | +34 637 894 819'
      ),
    'en' => array(
        'yes_subject' => 'Budget request confirmation - Standarte',
        'yes_title' => 'Confirmation of Interest',
        'yes_body' => 'Hello <strong>{nombre}</strong>,<br><br>We confirm our interest in your project for the <strong>{feria}</strong> exhibition. Shortly, a member of our sales and design team will contact you to start shaping your custom stand space.<br><br>We recommend preparing a <strong>detailed brief</strong> with your stand requirements, ideas, or examples of stands you like, and sending them to <a href="mailto:info@standarte.es" style="color:#ffc800; text-decoration:none; font-weight:bold;">info@standarte.es</a> as soon as possible to speed up the 3D design process.<br><br>Best regards, we will talk very soon!',
        'no_subject' => 'Budget request selection - Standarte',
        'no_title' => 'Thank You for Your Interest',
        'no_body' => 'Dear <strong>{nombre}</strong>,<br><br>Thank you again for your interest in Standarte for your participation in the <strong>{feria}</strong> exhibition.<br><br>Unfortunately, on this occasion we cannot proceed with your proposal. Our technical and design team has limited capacity and we are unable to work with budgets below the minimum viable costs indicated for premium custom wooden stands.<br><br>We sincerely hope that in the future we will have the opportunity to work together on other projects.',
        'footer' => 'Best regards,<br><strong>The Standarte Team</strong><br><a href="mailto:info@standarte.es" style="color:#ffffff; text-decoration:none;">info@standarte.es</a> | +34 637 894 819'
    ),
    'pt' => array(
        'yes_subject' => 'Confirmação de pedido de orçamento - Standarte',
        'yes_title' => 'Confirmação de Interesse',
        'yes_body' => 'Olá <strong>{nombre}</strong>,<br><br>Confirmamos o nosso interesse no seu projeto para a feira <strong>{feria}</strong>. Em breve, um membro da nossa equipa comercial e de design entrará em contacto consigo para começar a planear o seu espaço de stand personalizado.<br><br>Recomendamos que prepare um <strong>briefing detalhado</strong> com os requisitos do seu stand, ideias ou exemplos de stands de que goste, e os envie para <a href="mailto:info@standarte.es" style="color:#ffc800; text-decoration:none; font-weight:bold;">info@standarte.es</a> o mais rapidamente possível para acelerar o processo de design 3D.<br><br>Cumprimentos, nos vemos muito em breve!',
        'no_subject' => 'Seleção de pedidos de orçamento - Standarte',
        'no_title' => 'Agradecemos o Seu Interesse',
        'no_body' => 'Estimado/a <strong>{nombre}</strong>,<br><br>Agradecemos novamente o seu interesse na Standarte para a sua participação na feira <strong>{feria}</strong>.<br><br>Infelizmente, nesta ocasião não nos é possível avançar com a sua proposta. A nossa equipa técnica e de design tem capacidade limitada e não podemos trabalhar com orçamentos inferiores aos custos mínimos viáveis indicados para stands de madeira premium personalizados.<br><br>Desejamos sinceramente que no futuro tenhamos a oportunidade de trabalhar juntos noutros projetos.',
        'footer' => 'Atenciosamente,<br><strong>A Equipa da Standarte</strong><br><a href="mailto:info@standarte.es" style="color:#ffffff; text-decoration:none;">info@standarte.es</a> | +34 637 894 819'
    ),
    'de' => array(
        'yes_subject' => 'Bestätigung der Budgetanfrage - Standarte',
        'yes_title' => 'Interessenbestätigung',
        'yes_body' => 'Hallo <strong>{nombre}</strong>,<br><br>wir bestätigen unser Interesse an Ihrem Projekt für die Messe <strong>{feria}</strong>. In Kürze wird sich ein Mitglied unseres Vertriebs- und Designteams mit Ihnen in Verbindung setzen, um mit der Planung Ihres individuellen Standes zu beginnen.<br><br>Wir empfehlen Ihnen, ein <strong>detailliertes Briefing</strong> mit Ihren Anforderungen sowie Beispielen vorzubereiten und diese so schnell wie möglich an <a href="mailto:info@standarte.es" style="color:#ffc800; text-decoration:none; font-weight:bold;">info@standarte.es</a> zu senden, um den 3D-Designprozess zu beschleunigen.<br><br>Mit freundlichen Grüßen, bis bald!',
        'no_subject' => 'Auswahl von Budgetanfragen - Standarte',
        'no_title' => 'Vielen Dank für Ihr Interesse',
        'no_body' => 'Sehr geehrte/r <strong>{nombre}</strong>,<br><br>vielen Dank für Ihr Interesse an Standarte für Ihre Teilnahme an der Messe <strong>{feria}</strong>.<br><br>Leider können wir dieses Projekt derzeit nicht weiterverfolgen. Unser Design- und Werkstattteam hat eine begrenzte Kapazität und wir können keine Projekte annehmen, die unter dem angegebenen geschätzten Mindestbudget für maßgeschneiderte Holzmessestände liegen.<br><br>Wir hoffen, in Zukunft bei anderen Projekten zusammenzuarbeiten.',
        'footer' => 'Mit freundlichen Grüßen,<br><strong>Ihr Standarte-Team</strong><br><a href="mailto:info@standarte.es" style="color:#ffffff; text-decoration:none;">info@standarte.es</a> | +34 637 894 819'
    ),
    'fr' => array(
        'yes_subject' => 'Confirmation de demande de budget - Standarte',
        'yes_title' => 'Confirmation d\'Intérêt',
        'yes_body' => 'Bonjour <strong>{nombre}</strong>,<br><br>Nous vous confirmons notre intérêt pour votre projet concernant le salon <strong>{feria}</strong>. Sous peu, un membre de notre équipe commerciale et de création prendra contact avec vous afin de débuter la conception de votre stand sur mesure.<br><br>Nous vous conseillons de préparer un <strong>brief détaillé</strong> de vos besoins, ainsi que des <strong>exemples de stands que vous aimez</strong>, et de nous les envoyer à <a href="mailto:info@standarte.es" style="color:#ffc800; text-decoration:none; font-weight:bold;">info@standarte.es</a> dès que possible pour accélérer le processus de conception 3D.<br><br>Cordialement, et à très bientôt !',
        'no_subject' => 'Sélection des demandes de budget - Standarte',
        'no_title' => 'Merci pour Votre Intérêt',
        'no_body' => 'Cher/Chère <strong>{nombre}</strong>,<br><br>Merci encore pour votre intérêt pour Standarte concernant votre participation au salon <strong>{feria}</strong>.<br><br>Malheureusement, nous ne pouvons pas donner suite à votre projet pour le moment. Notre équipe de menuiserie et de design a une capacité limitée et nous ne pouvons travailler sur des budgets inférieurs aux coûts minimaux viables estimés indiqués pour des stands haut de gamme en bois sur mesure.<br><br>Nous espérons sincèrement collaborer avec vous sur de futurs projets.',
        'footer' => 'Cordialement,<br><strong>L\'Équipe Standarte</strong><br><a href="mailto:info@standarte.es" style="color:#ffffff; text-decoration:none;">info@standarte.es</a> | +34 637 894 819'
    )
);

$t = $translations[$lang];

if ($action === 'yes') {
    // A. Enviar email de confirmación de interés al cliente
    $subject = $t['yes_subject'];
    $body_text = str_replace(array('{nombre}', '{feria}'), array($nombre, $feria), $t['yes_body']);
    $title = $t['yes_title'];
} else {
    // B. Enviar email de rechazo amable al cliente
    $subject = $t['no_subject'];
    $body_text = str_replace(array('{nombre}', '{feria}'), array($nombre, $feria), $t['no_body']);
    $title = $t['no_title'];
}

$email_html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</title>
</head>
<body style='font-family: Arial, sans-serif; font-size: 16px; color: #2b303a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;'>
    <div style='background-color: #292f35; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;'>
        <img src='https://standarte.es/img/logo_stand-arte_blanco.svg' alt='Standarte' style='width: 180px;'>
    </div>
    <div style='padding: 30px 20px; background-color: #ffffff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);'>
        <h2 style='color: #292f35; margin-top: 0; border-bottom: 2px solid #ffc800; padding-bottom: 10px;'>" . $title . "</h2>
        <p>" . $body_text . "</p>
        <p style='margin-top: 30px; border-top: 1px dotted #dee2e6; padding-top: 20px; color: #6c757d; font-size: 14px;'>" . $t['footer'] . "</p>
    </div>
</body>
</html>";

$messageDetails = array();
$messageDetails["message_subject"] = $subject;
$messageDetails["to_email"] = $email;
$messageDetails["from_name"] = "Standarte";
$messageDetails["from_email"] = "info@standarte.es";
$messageDetails["message_body"] = $email_html;

$invitationEmail->sendEmailMessage($messageDetails);

// C. Si es Cualificado (yes), notificar a Standarte admin (info@standarte.es)
if ($action === 'yes') {
    $admin_subject = "NUEVO LEAD CUALIFICADO (LOCAL) - " . $feria . " - " . $nombre;
    
    $admin_html = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <title>Nuevo Lead Cualificado</title>
    </head>
    <body style='font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;'>
        <div style='background-color: #ffc800; color: #000; padding: 20px; text-align: center; font-weight: bold; border-radius: 6px 6px 0 0;'>
            NUEVO LEAD CUALIFICADO (LOCAL)
        </div>
        <div style='padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 6px 6px;'>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;'>Nombre:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($nombre) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Empresa:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($empresa) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='mailto:" . urlencode($email) . "'>" . htmlspecialchars($email) . "</a></td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Teléfono:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($lead['tlf']) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Feria:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($feria) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Metros cuadrados:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($lead['metros']) . " m²</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Presupuesto mínimo:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #d35400;'>" . htmlspecialchars($lead['presupuesto']) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Descripción:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>" . nl2br(htmlspecialchars($lead['descripcion'])) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Opciones:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-size: 13px;'>" . $lead['opciones'] . "</td>
                </tr>
            </table>
        </div>
    </body>
    </html>";
    
    $adminDetails = array();
    $adminDetails["message_subject"] = $admin_subject;
    $adminDetails["to_email"] = "info@standarte.es";
    $adminDetails["from_name"] = "Standarte Leads";
    $adminDetails["from_email"] = "info@standarte.es";
    $adminDetails["message_body"] = $admin_html;
    
    $invitationEmail->sendEmailMessage($adminDetails);
}

// 7. Redirigir a la landing page de resultado
$redirectUrl = "/presupuesto-resultado?status=" . ($action === 'yes' ? 'superior' : 'inferior') . "&lang=" . $lang;
header("Location: " . $redirectUrl);
exit;
?>
