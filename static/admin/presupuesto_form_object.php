<?php
  class InvitationEmail {
    function sendEmailMessage($messageDetails){
      $message_subject = $messageDetails["message_subject"];
      $to_email = $messageDetails["to_email"] ?? "info@standarte.es";
      $cc_email = $messageDetails["cc_email"] ?? null;
      $from_name = $messageDetails["from_name"] ?? "Standarte";
      $from_email = $messageDetails["from_email"] ?? "info@standarte.es";
      $reply_to_email = $messageDetails["reply_to_email"] ?? $from_email;
      $message_body = $messageDetails["message_body"];

      // Envío por SMTP autenticado y firmado (DKIM) reutilizando el mailer del
      // gestor de campañas. Antes se usaba mail() nativo, que NO pasa por el
      // firmador DKIM de OVH: fallaba la alineación DMARC y los correos
      // (confirmaciones al lead y aviso de lead cualificado) caían en spam o se
      // rechazaban. Si el SMTP fallara, se mantiene mail() como último recurso
      // (son correos transaccionales puntuales, no envíos masivos).
      $mailerPath = __DIR__ . '/email_campaing/mailer.php';
      $configPath = __DIR__ . '/email_campaing/config.php';
      if (is_file($mailerPath) && is_file($configPath)) {
        try {
          require_once $mailerPath;
          $config = require $configPath;
          if (is_array($config) && function_exists('campaign_send_smtp')) {
            // Respetar el remitente que indique quien llama (p.ej. "Standarte Leads").
            $config['from_name']       = $from_name;
            $config['from_email']      = $from_email;
            $config['reply_to']        = $reply_to_email;
            $config['envelope_sender'] = $from_email;
            if (campaign_send_smtp($config, $to_email, $message_subject, $message_body)) {
              return true;
            }
          }
        } catch (Exception $e) {
          // Continúa al respaldo mail() de abajo.
        }
      }

      // Último recurso: mail() nativo (el SMTP es la vía principal y firmada).
      if (function_exists('mb_encode_mimeheader')) {
        $message_subject = mb_encode_mimeheader($message_subject, 'UTF-8');
      }
      $headers  = 'MIME-Version: 1.0' . "\r\n";
      $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
      $headers .= "From: ".$from_name." <".$from_email.">"."\r\n";
      $headers .= "Reply-To: ".$reply_to_email."\r\n";
      if ($cc_email) {
          $headers .= "CC: ".$cc_email."\r\n";
      }
      return mail($to_email, $message_subject, $message_body, $headers);
    }

    function generateMessageBody(){
      $myfile = fopen("presupuesto_form.html", "r");
      $returnValue = fread($myfile, filesize("presupuesto_form.html"));
      fclose($myfile);

      return $returnValue;
    }
  }
?>
