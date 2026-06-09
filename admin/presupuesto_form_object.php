<?php
  class InvitationEmail {
    function sendEmailMessage($messageDetails){
      $message_subject = $messageDetails["message_subject"];
      if (function_exists('mb_encode_mimeheader')) {
        $message_subject = mb_encode_mimeheader($message_subject, 'UTF-8');
      }
      $to_email = $messageDetails["to_email"];
      $from_name = $messageDetails["from_name"] ?? "Standarte";
      $from_email = $messageDetails["from_email"] ?? "javier@standarte.es";
      $reply_to_name = $messageDetails["reply_to_name"] ?? $from_name;
      $reply_to_email = $messageDetails["reply_to_email"] ?? $from_email;
      $message_body = $messageDetails["message_body"];
      $headers = 'MIME-Version: 1.0' . "\r\n";
      $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
      $headers .= "From: ".$from_name." <".$from_email.">"."\r\n";
      $headers .= "Reply-To: ".$reply_to_name." <".$reply_to_email.">"."\r\n";
      $headers .= "CC: javier@standarte.es\r\n";

      mail($to_email, $message_subject, $message_body, $headers);
    }

    function generateMessageBody(){
      $myfile = fopen("presupuesto_form.html", "r");
      $returnValue = fread($myfile, filesize("presupuesto_form.html"));
      fclose($myfile);

      return $returnValue;
    }
  }
?>
