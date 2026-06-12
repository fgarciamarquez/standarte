<?php
 
 function campaign_encode_header($value)
 {
     return '=?UTF-8?B?' . base64_encode($value) . '?=';
 }
 
 function campaign_append_send_log($entry)
 {
     $logFile = __DIR__ . '/data/send-log.json';
     $logDir = dirname($logFile);
 
     if (!is_dir($logDir)) {
         mkdir($logDir, 0755, true);
     }
 
     $log = array();
 
     if (is_file($logFile)) {
         $storedLog = json_decode(file_get_contents($logFile), true);
         if (is_array($storedLog)) {
             $log = $storedLog;
         }
     }
 
     array_unshift($log, $entry);
     $log = array_slice($log, 0, 12);
     file_put_contents($logFile, json_encode($log, JSON_PRETTY_PRINT), LOCK_EX);
 }
 
 function campaign_get_send_log()
 {
     $logFile = __DIR__ . '/data/send-log.json';
 
     if (!is_file($logFile)) {
         return array();
     }
 
     $log = json_decode(file_get_contents($logFile), true);
 
     return is_array($log) ? $log : array();
 }
 
 function campaign_smtp_read($socket)
 {
     $response = '';
 
     while (($line = fgets($socket, 515)) !== false) {
         $response .= $line;
         if (strlen($line) >= 4 && substr($line, 3, 1) === ' ') {
             break;
         }
     }
 
     return $response;
 }
 
 function campaign_smtp_code($response)
 {
     return (int) substr($response, 0, 3);
 }
 
 function campaign_smtp_command($socket, $command, $expectedCodes)
 {
     fwrite($socket, $command . "\r\n");
     $response = campaign_smtp_read($socket);
     $code = campaign_smtp_code($response);
 
     if (!in_array($code, $expectedCodes, true)) {
         throw new Exception(trim($response));
     }
 
     return $response;
 }
 
 function campaign_build_raw_message($config, $to, $subject, $html)
 {
     $fromEmail = $config['from_email'];
     $replyTo = $config['reply_to'];
     $envelopeSender = isset($config['envelope_sender']) ? $config['envelope_sender'] : $fromEmail;
     $encodedFromName = campaign_encode_header($config['from_name']);
     $encodedSubject = campaign_encode_header($subject);
     $messageIdHost = preg_replace('/^www\./', '', parse_url($config['site_url'], PHP_URL_HOST));
     $messageId = sprintf('<%s.%s@%s>', date('YmdHis'), bin2hex(function_exists('random_bytes') ? random_bytes(6) : openssl_random_pseudo_bytes(6)), $messageIdHost);
 
     $headers = array(
         'Date: ' . date('r'),
         'MIME-Version: 1.0',
         'Content-Type: text/html; charset=UTF-8',
         'Content-Transfer-Encoding: 8bit',
         'From: ' . $encodedFromName . ' <' . $fromEmail . '>',
         'To: <' . $to . '>',
         'Subject: ' . $encodedSubject,
         'Reply-To: ' . $replyTo,
         'Return-Path: ' . $envelopeSender,
         'Errors-To: ' . $envelopeSender,
         'Message-ID: ' . $messageId,
         'X-Mailer: Standarte Email Campaign'
     );
 
     return implode("\r\n", $headers) . "\r\n\r\n" . $html;
 }
 
 function campaign_send_smtp($config, $to, $subject, $html)
 {
     if (empty($config['smtp']) || empty($config['smtp']['enabled']) || empty($config['smtp']['password'])) {
         throw new Exception('SMTP no configurado: falta la contraseña del buzón.');
     }
 
     $smtp = $config['smtp'];
     $host = $smtp['host'];
     $port = (int) $smtp['port'];
     $timeout = isset($smtp['timeout']) ? (int) $smtp['timeout'] : 20;
     $encryption = isset($smtp['encryption']) ? strtolower($smtp['encryption']) : 'tls';
     $remote = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
     $socket = @stream_socket_client($remote, $errno, $errstr, $timeout);
 
     if (!$socket) {
         throw new Exception('No se pudo conectar con SMTP: ' . $errstr);
     }
 
     stream_set_timeout($socket, $timeout);
 
     try {
         $response = campaign_smtp_read($socket);
         if (campaign_smtp_code($response) !== 220) {
             throw new Exception(trim($response));
         }
 
         campaign_smtp_command($socket, 'EHLO standarte.es', array(250));
 
         if ($encryption === 'tls') {
             campaign_smtp_command($socket, 'STARTTLS', array(220));
             if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_ANY_CLIENT)) {
                 throw new Exception('No se pudo activar TLS en la conexión SMTP.');
             }
             campaign_smtp_command($socket, 'EHLO standarte.es', array(250));
         }
 
         campaign_smtp_command($socket, 'AUTH LOGIN', array(334));
         campaign_smtp_command($socket, base64_encode($smtp['username']), array(334));
         campaign_smtp_command($socket, base64_encode($smtp['password']), array(235));
         campaign_smtp_command($socket, 'MAIL FROM:<' . $config['envelope_sender'] . '>', array(250));
         campaign_smtp_command($socket, 'RCPT TO:<' . $to . '>', array(250, 251));
         campaign_smtp_command($socket, 'DATA', array(354));
 
         $message = campaign_build_raw_message($config, $to, $subject, $html);
         $message = preg_replace('/^\./m', '..', $message);
         fwrite($socket, $message . "\r\n.\r\n");
         $response = campaign_smtp_read($socket);
 
         if (!in_array(campaign_smtp_code($response), array(250), true)) {
             throw new Exception(trim($response));
         }
 
         campaign_smtp_command($socket, 'QUIT', array(221));
         fclose($socket);
 
         return true;
     } catch (Exception $exception) {
         fclose($socket);
         throw $exception;
     }
 }
 
 function campaign_send_php_mail($config, $to, $subject, $html)
 {
     $fromEmail = $config['from_email'];
     $replyTo = $config['reply_to'];
     $envelopeSender = isset($config['envelope_sender']) ? $config['envelope_sender'] : $fromEmail;
     $encodedFromName = campaign_encode_header($config['from_name']);
     $encodedSubject = campaign_encode_header($subject);
 
     $headers = array(
         'MIME-Version: 1.0',
         'Content-Type: text/html; charset=UTF-8',
         'Content-Transfer-Encoding: 8bit',
         'From: ' . $encodedFromName . ' <' . $fromEmail . '>',
         'Reply-To: ' . $replyTo,
         'Return-Path: ' . $envelopeSender,
         'Errors-To: ' . $envelopeSender,
         'X-Mailer: Standarte Email Campaign'
     );
 
     return mail($to, $encodedSubject, $html, implode("\r\n", $headers), '-f' . $envelopeSender);
 }
 
 /**
  * Realiza peticiones HTTP a la API REST de Supabase (IPv4 Compatible)
  */
 function campaign_supabase_request($method, $endpoint, $data = null) {
     if (!defined('SUPABASE_URL') || !defined('SUPABASE_KEY')) {
         return ['code' => 500, 'body' => []];
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
 
 function campaign_send_mail($config, $to, $subject, $html)
 {
     // Cargar configuración de Supabase
     $configFile = dirname(dirname(__DIR__)) . '/supabase-config.php';
     if (!is_file($configFile)) {
         $configFile = dirname(dirname(dirname(__DIR__))) . '/supabase-config.php';
     }
     if (is_file($configFile)) {
         require_once $configFile;
     }
 
     // 1. Verificar exclusiones (bajas o rebotes) en Supabase antes de enviar (RGPD/LSSI)
     if (defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
         $status = 'active';
         $excludeReason = '';
         
         $res = campaign_supabase_request('GET', 'contacts?email=eq.' . urlencode($to));
         if ($res['code'] === 200 && is_array($res['body']) && count($res['body']) > 0) {
             $status = $res['body'][0]['status'] ?? 'active';
             $excludeReason = 'contacts';
         }
         
         if ($status !== 'unsubscribed' && $status !== 'bounced') {
             $resLuz = campaign_supabase_request('GET', 'luz_contacts?email=eq.' . urlencode($to));
             if ($resLuz['code'] === 200 && is_array($resLuz['body']) && count($resLuz['body']) > 0) {
                 $status = $resLuz['body'][0]['status'] ?? 'active';
                 $excludeReason = 'luz_contacts';
             }
         }
 
         if ($status === 'unsubscribed') {
             campaign_append_send_log(array(
                 'date' => date('c'),
                 'to' => $to,
                 'subject' => $subject,
                 'method' => 'skipped',
                 'accepted' => false,
                 'error' => "Envío omitido: El destinatario se dio de baja voluntariamente (LSSI/RGPD) ($excludeReason)."
             ));
             return false;
         } else if ($status === 'bounced') {
             campaign_append_send_log(array(
                 'date' => date('c'),
                 'to' => $to,
                 'subject' => $subject,
                 'method' => 'skipped',
                 'accepted' => false,
                 'error' => "Envío omitido: La dirección de correo electrónico está rebotada/fallida ($excludeReason)."
             ));
             return false;
         }
     }
 
     $accepted = false;
     $method = 'smtp';
     $error = '';
 
     try {
         $accepted = campaign_send_smtp($config, $to, $subject, $html);
     } catch (Exception $exception) {
         $method = 'php-mail';
         $error = $exception->getMessage();
         $accepted = campaign_send_php_mail($config, $to, $subject, $html);
     }
 
     $lastError = error_get_last();
 
     campaign_append_send_log(array(
         'date' => date('c'),
         'to' => $to,
         'subject' => $subject,
         'method' => $method,
         'accepted' => $accepted ? true : false,
         'error' => $accepted ? $error : ($error ? $error : ($lastError ? $lastError['message'] : ''))
     ));
 
     // 2. Si el envío fue exitoso, registrar/actualizar el contacto en la BD de Supabase (on conflict = upsert)
     if ($accepted && defined('SUPABASE_URL') && defined('SUPABASE_KEY')) {
         $contactData = [
             'email' => $to,
             'status' => 'active', // Al enviar, marcamos activo si no estaba de baja/rebotado
             'updated_at' => date('c')
         ];
         campaign_supabase_request('POST', 'contacts?on_conflict=email', $contactData);
     }
 
     return $accepted;
 }
 
 
 /**
  * Valida un email de forma avanzada:
  * 1. Sintaxis básica mediante FILTER_VALIDATE_EMAIL.
  * 2. Validación de extensiones de recursos e imágenes comunes (ej: .webp, .png).
  * 3. Comprobación contra dominios y nombres de usuario de ejemplo/prueba.
  * 4. Exclusión de prefijos de sistema, no-reply y rebotes.
  * 5. Exclusión de cuentas departamentales no comerciales de alto riesgo (RRHH, facturación, prensa).
  * 6. Filtrado de dominios de correos temporales / desechables comunes.
  * 7. Verificación DNS en tiempo real de registros MX (Mail Exchange) y A.
  *
  * @param string $email Correo a validar
  * @return bool True si es válido y tiene DNS activo, false en caso contrario
  */
 function campaign_is_valid_email_advanced($email, &$error_msg = null)
 {
     $email = trim($email);
 
     // 1. Validación de Sintaxis Básica
     if ($email === '') {
         $error_msg = 'El correo electrónico no puede estar vacío.';
         return false;
     }
 
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         $error_msg = 'El formato del correo electrónico es inválido.';
         return false;
     }
 
     // Extraer y limpiar el dominio y el usuario
     $parts = explode('@', $email);
     if (count($parts) !== 2) {
         $error_msg = 'Formato de correo electrónico inválido.';
         return false;
     }
     $user = strtolower(trim($parts[0]));
     $domain = strtolower(trim($parts[1]));
 
     // 1.1 Validaciones de formato de usuario (local part)
     if (preg_match('/[^a-z0-9._%+-]/i', $user)) {
         $error_msg = 'El nombre de usuario contiene caracteres no permitidos.';
         return false;
     }
     
     if (preg_match('/[._%+-]{2,}/', $user)) {
         $error_msg = 'El nombre de usuario contiene símbolos especiales consecutivos.';
         return false;
     }
     
     if (strlen($user) < 2) {
         $error_msg = 'El nombre de usuario es demasiado corto.';
         return false;
     }
 
     // 1.2 Validar extensiones de imagen/asset en el email o en el dominio (ej: retina assets@2x.png)
     $ignored_extensions = array(
         '.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.woff2', '.pdf', '.zip', '.avif', '.webp', '.ico', '.mp4', '.mp3'
     );
     foreach ($ignored_extensions as $ext) {
         if (substr($email, -strlen($ext)) === $ext || substr($domain, -strlen($ext)) === $ext) {
             $error_msg = 'El correo electrónico contiene una extensión de archivo no válida o es un recurso de imagen.';
             return false;
         }
     }
 
     // 1.3 Validar si es un correo de prueba, ejemplo o placeholder
     $placeholder_domains = array(
         'example.com', 'example.org', 'example.net', 'domain.com', 'domain.es', 'domein.nl', 'yourdomain.com',
         'mysite.com', 'website.com', 'test.com', 'email.com', 'correo.com'
     );
     if (in_array($domain, $placeholder_domains, true) || strpos($domain, 'example.') === 0) {
         $error_msg = 'El dominio de correo es de ejemplo o marcador de posición (placeholder).';
         return false;
     }
 
     // 1.4 Validar prefijos de usuario basura o de rebote
     $ignored_prefixes = array(
         'xxx', 'example', 'yourname', 'email', 'correo', 'test', 'name', 'nombre', 'usuario', 'user', 'dummy', 'placeholder'
     );
     if (in_array($user, $ignored_prefixes, true)) {
         $error_msg = 'El nombre de usuario es un valor de prueba o de ejemplo.';
         return false;
     }
 
     // 1.5 Filtro estricto para cuentas de sistema, no-reply y rebotes
     $system_prefixes = array(
         'noreply', 'no-reply', 'no_reply', 'dontsend', 'donotreply', 'no.reply', 'bounce', 'bounces', 'mailer-daemon', 
         'mailerdaemon', 'postmaster', 'hostmaster', 'abuse', 'spam', 'double-bounce', 'root', 'daemon'
     );
     foreach ($system_prefixes as $sys_pref) {
         if ($user === $sys_pref || strpos($user, $sys_pref) === 0) {
             $error_msg = 'Es una dirección de sistema, de no-recepción (no-reply) o buzón de spam.';
             return false;
         }
     }
 
     // 1.6 Filtro para cuentas de departamentos no comerciales de alto riesgo
     $high_risk_roles = array(
         'rrhh', 'recursoshumanos', 'humanresources', 'hr', 'empleo', 'jobs', 'careers', 'work', 'curriculum', 'cv',
         'factura', 'facturacion', 'facturación', 'invoices', 'billing', 'accounting', 'contabilidad', 'cobros', 'pagos',
         'prensa', 'press', 'media', 'news', 'newsletter', 'marketing-internal',
         'retour', 'devoluciones', 'returns', 'reclamaciones'
     );
     if (in_array($user, $high_risk_roles, true)) {
         $error_msg = 'Es una dirección de correo no comercial de alto riesgo (RRHH, facturación o prensa).';
         return false;
     }
 
     // 2. Comprobación de errores tipográficos comunes en dominios (Typo Checker)
     $typo_domains = array(
         'gamil.com', 'gamil.es', 'gamail.com', 'gmaill.com', 'gmal.com', 'gmile.com', 'gamil.co', 'gmaile.com',
         'hotamil.com', 'hotamil.es', 'hotmial.com', 'hotmial.es', 'hotmaill.com', 'yaho.com', 'yahooo.com',
         'outlok.com', 'outlok.es', 'outloo.com', 'msn.co', 'yaho.es', 'gamil.net', 'gamil.org', 'outlook.con',
         'gmail.con', 'yahoo.con', 'hotmail.con'
     );
 
     if (in_array($domain, $typo_domains, true)) {
         $error_msg = "El dominio de correo '$domain' parece un error de escritura común.";
         return false;
     }
 
     // 3. Comprobación contra proveedores de correos temporales o desechables (Disposable)
     $disposable_domains = array(
         '10minutemail.com', '10minutemail.co.za', 'tempmail.com', 'temp-mail.org', 'temp-mail.ru', 'tempmail.de',
         'guerrillamail.com', 'guerrillamailblock.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz',
         'yopmail.com', 'yopmail.fr', 'yopmail.net', 'dispostable.com', 'mailinator.com', 'trashmail.com',
         'trashmail.net', 'sharklasers.com', 'getairmail.com', 'maildrop.cc', 'mintemail.com', '30minutemail.com',
         'mytrashmail.com', 'throwawaymail.com', 'tempmailaddress.com', 'disposablemail.com', 'fakeinbox.com',
         'generator.email', 'mailnesia.com', 'mailcatch.com', 'inboxkitten.com', 'duck.com', 'safetymail.info',
         'tempmail.net', 'tempmail.dev', 'getnada.com', 'boun.cr', 'tempmail.live', 'disposable.com'
     );
 
     if (in_array($domain, $disposable_domains, true)) {
         $error_msg = 'No se aceptan correos electrónicos temporales o desechables.';
         return false;
     }
 
     // 4. Verificación de registros DNS en tiempo real (MX / A / AAAA / nullMX)
     $has_mx = false;
     if (function_exists('dns_get_record')) {
         $mx_records = @dns_get_record($domain, DNS_MX);
         if (is_array($mx_records) && !empty($mx_records)) {
             foreach ($mx_records as $rec) {
                 if (isset($rec['target']) && ($rec['target'] === '.' || $rec['target'] === '')) {
                     $error_msg = "El dominio de correo '$domain' no acepta correos (registro nullMX de no recepción declarado).";
                     return false;
                 }
             }
             $has_mx = true;
         }
     }
 
     if (!$has_mx && function_exists('checkdnsrr')) {
         if (checkdnsrr($domain, 'MX')) {
             $has_mx = true;
         }
     }
 
     if (!$has_mx) {
         $has_a = false;
         if (function_exists('checkdnsrr')) {
             if (checkdnsrr($domain, 'A') || checkdnsrr($domain, 'AAAA')) {
                 $has_a = true;
             }
         }
         if (!$has_a) {
             $error_msg = "El dominio de correo '$domain' no existe o no tiene registros de correo (MX/A/AAAA) válidos. El envío rebotará.";
             return false;
         }
     }
 
     return true;
 }
