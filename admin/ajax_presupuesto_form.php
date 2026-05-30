<?php
include("config.php");
?>

<?php

	$subdatos_email = $db->prepare("SELECT * FROM company");
	$subdatos_email->execute();
	$subdatos = $subdatos_email->fetchAll(PDO::FETCH_ASSOC);

	
	foreach ($subdatos as $subdatos) {
	  $titular_email = $subdatos['exxp'];
	  $ltd_email = $subdatos['ltd'];
	  $pie_email = $subdatos['foot'];
	};
?>


<?php  
	function post_value($key, $default = '') {
		return trim((string)($_POST[$key] ?? $default));
	}

	$form_nombre           = post_value('form_nombre');
	$form_empresa        = post_value('form_empresa');
	$form_tlf         = post_value('form_tlf');
	$form_email        	   = post_value('form_email');
	$form_feria          = post_value('form_feria');
	$form_localizacion          = post_value('form_localizacion');
	$form_metros          = post_value('form_metros');
	$form_suelo          = post_value('form_suelo');
	$zona_recepcion          = post_value('zona_recepcion');
	$zona_bar          = post_value('zona_bar');
	$zona_almacen          = post_value('zona_almacen');
	$zona_exposicion          = post_value('zona_exposicion');
	$zona_reuniones_abierta          = post_value('zona_reuniones_abierta');
	$zona_reuniones_cerrada          = post_value('zona_reuniones_cerrada');
	$audiovisual          = post_value('audiovisual');
	$form_presupuesto          = post_value('form_presupuesto');
	$form_descripcion          = post_value('form_descripcion');
	$form_lang          = post_value('form_lang', 'es');
	$allowed_form_langs = array('es', 'en', 'de', 'zh', 'hi', 'pt');
	if (!in_array($form_lang, $allowed_form_langs)) {
		$form_lang = 'es';
	}
	$form_respuesta          = "N";
	$email_texts = array(
		'es' => array(
			'subject' => 'Standarte. Solicitud de presupuesto recibida.',
			'title' => 'Standarte. Solicitud de presupuesto recibida',
			'heading' => 'Solicitud de presupuesto recibida',
			'event' => 'Evento',
			'location' => 'localizada en',
			'meters' => 'Metros cuadrados',
			'zones' => 'Zonas',
			'budget' => 'Presupuesto',
			'description' => 'Descripción',
			'closing' => 'Atentamente',
			'team' => 'Equipo de',
			'floor_type' => 'Tipo de suelo',
			'reception' => 'Zona de recepción',
			'bar' => 'Zona de bar',
			'storage' => 'Zona de almacenamiento',
			'exhibition' => 'Zona de exposición',
			'open_meeting' => 'Zona de reuniones abiertas',
			'closed_meeting' => 'Zona de reuniones cerradas',
			'av' => 'Medio audiovisual principal',
			'yes' => 'Sí',
			'no' => 'No',
			'not_selected' => 'No seleccionado',
			'invalid_email' => 'La dirección de email no es válida',
			'success' => 'Mensaje enviado correctamente.<br> En breve nos pondremos en contacto.<br> Gracias.',
			'floor_tarima_madera' => 'Tarima-madera',
			'floor_tarima_moqueta' => 'Tarima-moqueta',
			'floor_moqueta' => 'Moqueta',
			'av_video_wall' => 'Video wall',
			'av_pantalla_led' => 'Pantalla LED',
			'av_proyector' => 'Proyector',
		),
		'en' => array(
			'subject' => 'Standarte. Budget request received.',
			'title' => 'Standarte. Budget request received',
			'heading' => 'Budget request received',
			'event' => 'Event',
			'location' => 'located in',
			'meters' => 'Square meters',
			'zones' => 'Areas',
			'budget' => 'Budget',
			'description' => 'Description',
			'closing' => 'Best regards',
			'team' => 'Team at',
			'floor_type' => 'Floor type',
			'reception' => 'Reception area',
			'bar' => 'Bar area',
			'storage' => 'Storage area',
			'exhibition' => 'Product exhibition area',
			'open_meeting' => 'Open meeting area',
			'closed_meeting' => 'Closed meeting area',
			'av' => 'Main audiovisual medium',
			'yes' => 'Yes',
			'no' => 'No',
			'not_selected' => 'Not selected',
			'invalid_email' => 'The email address is not valid',
			'success' => 'Message sent successfully.<br> We will contact you shortly.<br> Thank you.',
			'floor_tarima_madera' => 'Raised wooden floor',
			'floor_tarima_moqueta' => 'Raised carpet floor',
			'floor_moqueta' => 'Carpet',
			'av_video_wall' => 'Video wall',
			'av_pantalla_led' => 'LED screen',
			'av_proyector' => 'Projector',
		),
		'de' => array(
			'subject' => 'Standarte. Budgetanfrage erhalten.',
			'title' => 'Standarte. Budgetanfrage erhalten',
			'heading' => 'Budgetanfrage erhalten',
			'event' => 'Veranstaltung',
			'location' => 'in',
			'meters' => 'Quadratmeter',
			'zones' => 'Bereiche',
			'budget' => 'Budget',
			'description' => 'Beschreibung',
			'closing' => 'Mit freundlichen Grüßen',
			'team' => 'Team von',
			'floor_type' => 'Bodenart',
			'reception' => 'Empfangsbereich',
			'bar' => 'Barbereich',
			'storage' => 'Lagerbereich',
			'exhibition' => 'Produktausstellung',
			'open_meeting' => 'Offener Besprechungsbereich',
			'closed_meeting' => 'Geschlossener Besprechungsbereich',
			'av' => 'Wichtigstes audiovisuelles Medium',
			'yes' => 'Ja',
			'no' => 'Nein',
			'not_selected' => 'Nicht ausgewählt',
			'invalid_email' => 'Die E-Mail-Adresse ist nicht gültig',
			'success' => 'Nachricht erfolgreich gesendet.<br> Wir werden uns in Kürze mit Ihnen in Verbindung setzen.<br> Vielen Dank.',
			'floor_tarima_madera' => 'Holzboden',
			'floor_tarima_moqueta' => 'Teppichboden auf Podest',
			'floor_moqueta' => 'Teppich',
			'av_video_wall' => 'Videowand',
			'av_pantalla_led' => 'LED-Bildschirm',
			'av_proyector' => 'Projektor',
		),
		'zh' => array(
			'subject' => 'Standarte。已收到预算申请。',
			'title' => 'Standarte。已收到预算申请',
			'heading' => '已收到预算申请',
			'event' => '活动',
			'location' => '地点',
			'meters' => '平方米',
			'zones' => '区域',
			'budget' => '预算',
			'description' => '描述',
			'closing' => '此致',
			'team' => '团队',
			'floor_type' => '地面类型',
			'reception' => '接待区',
			'bar' => '酒吧区',
			'storage' => '储藏区',
			'exhibition' => '产品展示区',
			'open_meeting' => '开放会议区',
			'closed_meeting' => '封闭会议区',
			'av' => '主要视听设备',
			'yes' => '是',
			'no' => '否',
			'not_selected' => '未选择',
			'invalid_email' => '电子邮件地址无效',
			'success' => '消息已成功发送。<br> 我们将尽快与您联系。<br> 谢谢。',
			'floor_tarima_madera' => '木地板',
			'floor_tarima_moqueta' => '架高地毯地板',
			'floor_moqueta' => '地毯',
			'av_video_wall' => '视频墙',
			'av_pantalla_led' => 'LED 屏幕',
			'av_proyector' => '投影仪',
		),
		'hi' => array(
			'subject' => 'Standarte. बजट अनुरोध प्राप्त हुआ।',
			'title' => 'Standarte. बजट अनुरोध प्राप्त हुआ',
			'heading' => 'बजट अनुरोध प्राप्त हुआ',
			'event' => 'कार्यक्रम',
			'location' => 'स्थान',
			'meters' => 'वर्ग मीटर',
			'zones' => 'क्षेत्र',
			'budget' => 'बजट',
			'description' => 'विवरण',
			'closing' => 'सादर',
			'team' => 'टीम',
			'floor_type' => 'फर्श का प्रकार',
			'reception' => 'स्वागत क्षेत्र',
			'bar' => 'बार क्षेत्र',
			'storage' => 'भंडारण क्षेत्र',
			'exhibition' => 'उत्पाद प्रदर्शनी क्षेत्र',
			'open_meeting' => 'खुला बैठक क्षेत्र',
			'closed_meeting' => 'बंद बैठक क्षेत्र',
			'av' => 'मुख्य ऑडियोविजुअल माध्यम',
			'yes' => 'हाँ',
			'no' => 'नहीं',
			'not_selected' => 'चयनित नहीं',
			'invalid_email' => 'ईमेल पता मान्य नहीं है',
			'success' => 'संदेश सफलतापूर्वक भेजा गया।<br> हम जल्द ही आपसे संपर्क करेंगे।<br> धन्यवाद।',
			'floor_tarima_madera' => 'लकड़ी का उठा हुआ फर्श',
			'floor_tarima_moqueta' => 'कालीन वाला उठा हुआ फर्श',
			'floor_moqueta' => 'कालीन',
			'av_video_wall' => 'वीडियो वॉल',
			'av_pantalla_led' => 'LED स्क्रीन',
			'av_proyector' => 'प्रोजेक्टर',
		),
		'pt' => array(
			'subject' => 'Standarte. Pedido de orçamento recebido.',
			'title' => 'Standarte. Pedido de orçamento recebido',
			'heading' => 'Pedido de orçamento recebido',
			'event' => 'Evento',
			'location' => 'localizado em',
			'meters' => 'Metros quadrados',
			'zones' => 'Áreas',
			'budget' => 'Orçamento',
			'description' => 'Descrição',
			'closing' => 'Atenciosamente',
			'team' => 'Equipa de',
			'floor_type' => 'Tipo de pavimento',
			'reception' => 'Área de recepção',
			'bar' => 'Área de bar',
			'storage' => 'Área de armazenamento',
			'exhibition' => 'Área de exposição de produto',
			'open_meeting' => 'Área de reuniões aberta',
			'closed_meeting' => 'Área de reuniões fechada',
			'av' => 'Meio audiovisual principal',
			'yes' => 'Sim',
			'no' => 'Não',
			'not_selected' => 'Não selecionado',
			'invalid_email' => 'O endereço de email não é válido',
			'success' => 'Mensagem enviada corretamente.<br> Entraremos em contacto em breve.<br> Obrigado.',
			'floor_tarima_madera' => 'Plataforma de madeira',
			'floor_tarima_moqueta' => 'Plataforma com carpete',
			'floor_moqueta' => 'Carpete',
			'av_video_wall' => 'Video wall',
			'av_pantalla_led' => 'Ecrã LED',
			'av_proyector' => 'Projetor',
		),
	);
	$mail_text = $email_texts[$form_lang];
	$floor_labels = array(
		'tarima_madera' => $mail_text['floor_tarima_madera'],
		'tarima_moqueta' => $mail_text['floor_tarima_moqueta'],
		'moqueta' => $mail_text['floor_moqueta'],
	);
	$av_labels = array(
		'video_wall' => $mail_text['av_video_wall'],
		'pantalla_led' => $mail_text['av_pantalla_led'],
		'proyector' => $mail_text['av_proyector'],
	);
	$form_suelo_label = isset($floor_labels[$form_suelo]) ? $floor_labels[$form_suelo] : $mail_text['not_selected'];
	$audiovisual_label = isset($av_labels[$audiovisual]) ? $av_labels[$audiovisual] : $mail_text['not_selected'];
	$yes_no = function ($value) use ($mail_text) {
		return $value === 'Y' ? $mail_text['yes'] : $mail_text['no'];
	};
	$form_opciones = '<br> '.$mail_text['floor_type'].': '. $form_suelo_label .',<br>'.$mail_text['reception'].': '. $yes_no($zona_recepcion) .',<br>'.$mail_text['bar'].': '. $yes_no($zona_bar) .',<br>'.$mail_text['storage'].': '. $yes_no($zona_almacen) .',<br>'.$mail_text['exhibition'].': '. $yes_no($zona_exposicion) .',<br>'.$mail_text['open_meeting'].': '. $yes_no($zona_reuniones_abierta) .',<br>'.$mail_text['closed_meeting'].': '. $yes_no($zona_reuniones_cerrada) .',<br>'.$mail_text['av'].': '. $audiovisual_label;
?> 

<?php
        //  SQL cleaner
 	function eliminar_simbolos($string){

							        $string = trim($string);
							        $string = str_replace(
							            array("\\", "º",
							                 "#", "|", "!",
							                 "·", "$", "%", "&", "/",
							                 "(", ")", "?", "'", "¡",
							                 "¿", "[", "^", "<code>", "]",
							                 "}", "{", "¨",
							                 ">", "<", ";", ":"),
							            ' ',
							            $string
							        );
							    return $string;
							    }

    $form_nombre =  eliminar_simbolos($form_nombre);
	$form_empresa =  eliminar_simbolos($form_empresa);
	$form_tlf =  eliminar_simbolos($form_tlf);
	$form_feria =  eliminar_simbolos($form_feria);
	$form_localizacion =  eliminar_simbolos($form_localizacion);
	$form_metros =  eliminar_simbolos($form_metros);
	$form_presupuesto =  eliminar_simbolos($form_presupuesto);
	$form_descripcion =  eliminar_simbolos($form_descripcion);
	
?>

<?php 

if (!filter_var($form_email, FILTER_VALIDATE_EMAIL)) {
	$output['error'] = 'error';
	$output['msg']   = $mail_text['invalid_email'];


} else {

$query      = "INSERT INTO `presupuestos` SET nombre = ?, empresa = ?, tlf = ?, email = ?, feria = ?, localizacion = ?, metros = ?, presupuesto = ?, descripcion = ?, opciones = ?, respuesta_enviada = ?";
            $parameters = array($form_nombre, $form_empresa, $form_tlf, $form_email, $form_feria, $form_localizacion, $form_metros, $form_presupuesto, $form_descripcion, $form_opciones, $form_respuesta);
            $statement  = $db->prepare($query);
            $statement->execute($parameters);

			          /*____________________SCRIPT MAIL________________________*/

					  require("presupuesto_form_object.php");

					  $messageDetails = array();
					  $messageDetails["message_subject"] = $mail_text['subject'];
					  $messageDetails["to_email"] = $form_email;
					  $messageDetails["from_name"] = "Standarte";
					  $messageDetails["from_email"] = "hola@standarte.es";
					  $messageDetails["reply_to_name"] = $form_nombre;
					  $messageDetails["reply_to_email"] = $form_email;
		
		
					  $invitationEmail = new InvitationEmail();
					  $messageBody = $invitationEmail->generateMessageBody();
						  $patterns = array();
				
						$patterns[0] = "{POST_nombre}";
						$patterns[1] = "{POST_empresa}";
						$patterns[2] = "{POST_telefono}";
						$patterns[3] = "{POST_email}";
						$patterns[4] = "{POST_feria}";
						$patterns[5] = "{POST_localizacion}";
						$patterns[6] = "{POST_metros}";
						$patterns[7] = "{POST_opciones}";
						$patterns[8] = "{POST_presupuesto}";
						$patterns[9] = "{POST_descripcion}";
						$patterns[10] = "{POST_LTD}";
						$patterns[11] = "{POST_PIE}";
						$patterns[12] = "{POST_LANG}";
						$patterns[13] = "{EMAIL_TITLE}";
						$patterns[14] = "{EMAIL_HEADING}";
						$patterns[15] = "{EMAIL_EVENT}";
						$patterns[16] = "{EMAIL_LOCATION}";
						$patterns[17] = "{EMAIL_METERS}";
						$patterns[18] = "{EMAIL_ZONES}";
						$patterns[19] = "{EMAIL_BUDGET}";
						$patterns[20] = "{EMAIL_DESCRIPTION}";
						$patterns[21] = "{EMAIL_CLOSING}";
						$patterns[22] = "{EMAIL_TEAM}";
						$replacements = array();
				
						$replacements[0] = "$form_nombre";
						$replacements[1] = "$form_empresa";
						$replacements[2] = "$form_tlf";
						$replacements[3] = "$form_email";
						$replacements[4] = "$form_feria";
						$replacements[5] = "$form_localizacion";
						$replacements[6] = "$form_metros";
						$replacements[7] = "$form_opciones";
						$replacements[8] = "$form_presupuesto";
						$replacements[9] = "$form_descripcion";
						$replacements[10] = "$ltd_email";
						$replacements[11] = "$pie_email";
						$replacements[12] = "$form_lang";
						$replacements[13] = $mail_text['title'];
						$replacements[14] = $mail_text['heading'];
						$replacements[15] = $mail_text['event'];
						$replacements[16] = $mail_text['location'];
						$replacements[17] = $mail_text['meters'];
						$replacements[18] = $mail_text['zones'];
						$replacements[19] = $mail_text['budget'];
						$replacements[20] = $mail_text['description'];
						$replacements[21] = $mail_text['closing'];
						$replacements[22] = $mail_text['team'];
		
		
						$emailMessage = str_replace($patterns, $replacements, $messageBody);
		
					  $messageDetails["message_body"] = $emailMessage;
					  $invitationEmail->sendEmailMessage($messageDetails);
		
		
		
					  /*____________________FIN SCRIPT MAIL________________________*/
            


            $output['error'] = 'success';
            $output['msg']   = $mail_text['success']; 

}
    echo json_encode($output);
