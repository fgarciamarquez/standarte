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
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
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

function campaign_send_mail($config, $to, $subject, $html)
{
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

    return $accepted;
}

/**
 * Valida un email de forma avanzada:
 * 1. Sintaxis básica mediante FILTER_VALIDATE_EMAIL.
 * 2. Filtrado de dominios de correos temporales / desechables comunes.
 * 3. Verificación DNS en tiempo real de registros MX (Mail Exchange) y A.
 *
 * @param string $email Correo a validar
 * @return bool True si es válido y tiene DNS activo, false en caso contrario
 */
function campaign_is_valid_email_advanced($email)
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

