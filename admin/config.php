<?php



const SERVERURL="http://localhost/STANDARTE_OPTIMIZADA/";

// Local    
$GLOBALS["HOST"]     = "localhost"; 
$GLOBALS["PORT"]     = "3306"; // Añadido el puerto
$GLOBALS["USERNAME"] = "root"; 
$GLOBALS["PASSWORD"] = "root"; 
$GLOBALS["DATABASE"] = "standapjavierdb"; 
$GLOBALS["DB_ENCODING"] = "utf8";

/*
|--------------------------------------------------------------------------
| SMTP

*/

$GLOBALS["SMTP"] = true;

$ano_actual = date("Y"); 
$ano_futuro = date("Y", strtotime("+1 years", strtotime($ano_actual)));

/*
|--------------------------------------------------------------------------
| SMTP Configuration
|--------------------------------------------------------------------------
|
| This email details when stmp is set to false and system sends email using mail function
|
*/
$GLOBALS["SMTP_HOST"] = 'smtp.gmail.com';
$GLOBALS["SMTP_USERNAME"] = 'info@standarte.es';
$GLOBALS["SMTP_PASSWORD"] = 'Extrategia37';
$GLOBALS["SMTP_SECURE"] = 'ssl';
$GLOBALS["SMTP_PORT"] = 465;
$GLOBALS["SMTP_CHARSET"] = 'UTF-8';

$fromAddress = 'info@standarte.es';
$fromName    = 'www.standarte.es';
$hoy = date("Y-m-d");

// Database Connection
$db = connectDatabase();
function connectDatabase()
{
    try {
        $db = new PDO("mysql:dbname={$GLOBALS["DATABASE"]};host={$GLOBALS["HOST"]};charset={$GLOBALS["DB_ENCODING"]}", $GLOBALS["USERNAME"], $GLOBALS["PASSWORD"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false );

        return $db;
    } catch (PDOException $ex) {
        die('Conexión PDO-MySQL erronea. Por favor, compruebe el archivo de configuración');
    }
}

// Function to get configured PHPMailer instance
function getMailer()
{
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                      // Usar SMTP
        $mail->Host = $GLOBALS["SMTP_HOST"];                  // Servidor SMTP
        $mail->SMTPAuth = true;                               // Autenticación SMTP activa
        $mail->Username = $GLOBALS["SMTP_USERNAME"];          // Usuario SMTP
        $mail->Password = $GLOBALS["SMTP_PASSWORD"];          // Contraseña SMTP
        $mail->SMTPSecure = $GLOBALS["SMTP_SECURE"];          // Encriptación SSL
        $mail->Port = $GLOBALS["SMTP_PORT"];                  // Puerto TCP para conectarse
        $mail->CharSet = $GLOBALS["SMTP_CHARSET"];            // Configuración de Charset a UTF-8

        // Sender info
        $mail->setFrom($GLOBALS["SMTP_USERNAME"], 'Standarte. Stands de alta calidad.');

        return $mail;
    } catch (Exception $e) {
        die('Mailer Error: ' . $e->getMessage());
    }
}
