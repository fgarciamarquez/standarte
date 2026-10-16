<?php
include("config.php");
?>

<?php
	// 1. Obtener datos de la tabla 'company' desde Supabase
	$supabase_url = 'https://mucfvcrwleapdeaxdlxe.supabase.co';
	$supabase_key = 'sb_publishable_nLI2IH870PkwiKDvqy6nBA_jfpXKuDW';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $supabase_url . '/rest/v1/company?select=*&limit=1');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'apikey: ' . $supabase_key,
		'Authorization: Bearer ' . $supabase_key
	));
	$response = curl_exec($ch);
	curl_close($ch);

	$company_data = json_decode($response, true);
	
	if (!empty($company_data) && is_array($company_data)) {
		$pie_email = $company_data[0]['foot'] ?? 'Este correo es confidencial y para uso exclusivo de la persona a la que va dirigido.';
	} else {
		// Fallback
		$pie_email = 'Este correo es confidencial y para uso exclusivo de la persona a la que va dirigido.';
	}
?>


<?php  
	mb_internal_encoding('UTF-8');
	function post_value($key, $default = '') {
		$v = (string)($_POST[$key] ?? $default);
		// Blindaje de codificación: si el texto no es UTF-8 válido (algún cliente lo
		// manda en Latin-1/Windows-1252), lo convertimos. Evita el json_encode vacío
		// (lead perdido) y los acentos corruptos tipo "DÃ­a" en vez de "Día".
		if ($v !== '' && !mb_check_encoding($v, 'UTF-8')) {
			$v = mb_convert_encoding($v, 'UTF-8', 'Windows-1252');
		}
		return trim($v);
	}

	// Honeypot anti-spam: el campo form_web es invisible para humanos.
	// Si llega relleno es un bot: respondemos exito falso y no procesamos nada.
	if (post_value('form_web') !== '') {
		echo json_encode(array('error' => 'success', 'msg' => 'OK'));
		exit;
	}

	// Consentimiento de privacidad obligatorio (el checkbox envia form_privacidad=1)
	if (post_value('form_privacidad') !== '1') {
		echo json_encode(array('error' => 'error', 'msg' => 'Debe aceptar la política de privacidad. / You must accept the privacy policy.'));
		exit;
	}

	// --- ANTI-SPAM REFORZADO ---------------------------------------------------------
	// Rechazo SILENCIOSO (devolvemos "éxito" falso para que el bot no reintente ni adapte).
	$as_empresa = post_value('form_empresa');
	$as_tlf     = post_value('form_tlf');
	$as_nombre  = post_value('form_nombre');
	$as_feria   = post_value('form_feria');
	$is_bot = false;
	// (a) Honeypot reforzado: empresa y tlf están OCULTOS en el formulario (field-hidden),
	//     una persona no puede rellenarlos. Si llegan con contenido, es un bot.
	//     [Si algún día se reactivan como campos VISIBLES, eliminar esta regla.]
	if ($as_empresa !== '' || $as_tlf !== '') $is_bot = true;
	// (b) Time-trap: el formulario añade form_elapsed (ms desde que se cargó la página).
	//     Una persona tarda >2 s en rellenarlo; un envío casi instantáneo es un bot.
	//     Fail-open: si el campo no llega (0), no bloqueamos por aquí (lo cubren las demás).
	$as_elapsed = isset($_POST['form_elapsed']) ? intval($_POST['form_elapsed']) : 0;
	if ($as_elapsed > 0 && $as_elapsed < 1500) $is_bot = true;
	// (c) Nombre y feria no contienen URLs ni emails en envíos legítimos.
	if (preg_match('#https?://|www\.|[\w.+-]+@[\w-]+\.[a-z]#i', $as_nombre . ' ' . $as_feria)) $is_bot = true;
	// (d) Longitudes desorbitadas (inyección de texto basura).
	if (mb_strlen($as_nombre) > 100 || mb_strlen($as_feria) > 120) $is_bot = true;
	if ($is_bot) {
		echo json_encode(array('error' => 'success', 'msg' => 'OK'));
		exit;
	}
	// --------------------------------------------------------------------------------

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
	$form_sinergia          = post_value('form_sinergia');
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
	// Fallback a inglés para idiomas del sitio sin traducción propia (fr, it, ko)
	$mail_text = $email_texts[$form_lang] ?? $email_texts['en'];
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

// Validación de campos obligatorios EN SERVIDOR. El navegador ya los exige (required),
// pero los bots hacen POST directo al endpoint dejando feria/metros/etc. vacíos: ese es
// el origen de los "leads vacíos". Aquí se rechazan sin insertar ni enviar correo.
if ($form_nombre === '' || $form_email === '' || $form_feria === '' || $form_metros === '' || $form_descripcion === '') {
	$output['error'] = 'error';
	$output['msg']   = 'Faltan campos obligatorios. / Required fields are missing.';
	echo json_encode($output);
	exit;
}

if (!filter_var($form_email, FILTER_VALIDATE_EMAIL)) {
	$output['error'] = 'error';
	$output['msg']   = $mail_text['invalid_email'];


} else {

	// Clasificación de feria y cálculo del presupuesto estimado mínimo
	$feria_lower = mb_strtolower($form_feria, 'UTF-8');
	$multiplier = 400; // Por defecto peninsular
	$region = 'Peninsular';
	
	if (
		strpos($feria_lower, 'extremadura') !== false ||
		strpos($feria_lower, 'badajoz') !== false ||
		strpos($feria_lower, 'caceres') !== false ||
		strpos($feria_lower, 'merida') !== false ||
		strpos($feria_lower, 'fio') !== false ||
		strpos($feria_lower, 'alentejo') !== false ||
		strpos($feria_lower, 'evora') !== false ||
		strpos($feria_lower, 'elvas') !== false ||
		strpos($feria_lower, 'beja') !== false ||
		strpos($feria_lower, 'portalegre') !== false
	) {
		$multiplier = 250;
		$region = 'Extremadura / Alentejo';
	} elseif (
		strpos($feria_lower, 'madrid') !== false ||
		strpos($feria_lower, 'ifema') !== false ||
		strpos($feria_lower, 'fitur') !== false ||
		strpos($feria_lower, 'arco') !== false ||
		strpos($feria_lower, 'veteco') !== false ||
		strpos($feria_lower, 'smart doors') !== false ||
		strpos($feria_lower, 'fruit attraction') !== false ||
		strpos($feria_lower, 'generas') !== false
	) {
		$multiplier = 350;
		$region = 'Madrid';
	} elseif (
		strpos($feria_lower, 'canarias') !== false ||
		strpos($feria_lower, 'baleares') !== false ||
		strpos($feria_lower, 'tenerife') !== false ||
		strpos($feria_lower, 'palma') !== false ||
		strpos($feria_lower, 'mallorca') !== false ||
		strpos($feria_lower, 'ceuta') !== false ||
		strpos($feria_lower, 'melilla') !== false ||
		strpos($feria_lower, 'alemania') !== false || strpos($feria_lower, 'germany') !== false ||
		strpos($feria_lower, 'francia') !== false || strpos($feria_lower, 'france') !== false ||
		strpos($feria_lower, 'italia') !== false || strpos($feria_lower, 'italy') !== false ||
		strpos($feria_lower, 'inglaterra') !== false || strpos($feria_lower, 'england') !== false ||
		strpos($feria_lower, 'londres') !== false || strpos($feria_lower, 'london') !== false ||
		strpos($feria_lower, 'paris') !== false ||
		strpos($feria_lower, 'milan') !== false ||
		strpos($feria_lower, 'dusseldorf') !== false ||
		strpos($feria_lower, 'frankfurt') !== false ||
		strpos($feria_lower, 'munich') !== false ||
		strpos($feria_lower, 'belgica') !== false || strpos($feria_lower, 'belgium') !== false ||
		strpos($feria_lower, 'holanda') !== false || strpos($feria_lower, 'netherlands') !== false ||
		strpos($feria_lower, 'internacional') !== false || strpos($feria_lower, 'international') !== false ||
		strpos($feria_lower, 'extranjero') !== false || strpos($feria_lower, 'abroad') !== false
	) {
		$multiplier = 470;
		$region = 'Extrapeninsular';
	}

	$metros_val = intval($form_metros);
	if ($metros_val <= 0) {
		$metros_val = 1;
	}
	$threshold = $metros_val * $multiplier;
	$form_presupuesto = number_format($threshold, 0, '', '') . ' €';

	// Sinergia (paso 2 del formulario): ferias extra + ahorro. Se guarda como su propia
	// línea DENTRO de la descripción almacenada (sin cambiar el esquema de Supabase) para
	// que aparezca también en el correo del filtro; en el aviso al equipo va como fila aparte.
	$descripcion_store = $form_sinergia !== ''
		? $form_descripcion . "\n\nFerias de interés (sinergia): " . $form_sinergia
		: $form_descripcion;

$data_insert = json_encode(array(
	'nombre' => $form_nombre,
	'empresa' => $form_empresa,
	'tlf' => $form_tlf,
	'email' => $form_email,
	'feria' => $form_feria,
	'localizacion' => $form_localizacion,
	'metros' => $form_metros,
	'presupuesto' => $form_presupuesto,
	'descripcion' => $descripcion_store,
	'opciones' => $form_opciones,
	'respuesta_enviada' => $form_respuesta
), JSON_UNESCAPED_UNICODE);

if ($data_insert === false) {
	$output['error'] = 'error';
	$output['msg']   = 'Error de codificación en los datos. / Data encoding error.';
	echo json_encode($output);
	exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $supabase_url . '/rest/v1/presupuestos');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_insert);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'apikey: ' . $supabase_key,
	'Authorization: Bearer ' . $supabase_key,
	'Content-Type: application/json',
	'Prefer: return=representation'
));
$response = curl_exec($ch);
curl_close($ch);

	$inserted_id = 0;
	if ($response) {
		$response_data = json_decode($response, true);
		if (is_array($response_data) && !empty($response_data)) {
			$inserted_id = $response_data[0]['id'] ?? 0;
		}
	}

	if ($inserted_id <= 0) {
		$output['error'] = 'error';
		if (strpos($response, 'violates row-level security') !== false) {
			$output['msg'] = 'Error de seguridad en la base de datos (RLS). Asegúrese de haber configurado las políticas SQL en su panel de Supabase.';
		} else {
			$output['msg'] = 'Error al registrar la solicitud en la base de datos de Supabase. Respuesta: ' . htmlspecialchars($response);
		}
		echo json_encode($output);
		exit;
	}

	/*____________________SCRIPT MAIL (ACUSE DE RECIBO AL CLIENTE)________________________*/
	// 16/10/2026: acuse de recibo corto y bilingüe (español + inglés) para todo el mundo.
	// Antes había cinco versiones por idioma de cinco párrafos cada una (saludo, intro,
	// comentario de la feria, qué pasa ahora y firma). Como el formulario solo reconoce seis
	// idiomas, los visitantes de las versiones fr/it/nl/ko/ja lo recibían entero en español.
	// Ahora es un solo correo: dos frases en español, las mismas dos en inglés y una firma
	// común.
	$ack_subject = 'Solicitud recibida / Request received - Standarte';
	$ack_es = array(
		'greeting' => 'Hola <strong>{nombre}</strong>,',
		'body'     => 'Hemos recibido tu solicitud para <strong>{feria}</strong> y ya estamos con ella. Te escribimos en breve.',
		'brief'    => 'Si quieres adelantar trabajo, mándanos un brief o ejemplos de stands que te gusten a <a href="mailto:info@standarte.es" style="color:#1a73e8;text-decoration:underline;">info@standarte.es</a>.'
	);
	$ack_en = array(
		'greeting' => 'Hello <strong>{nombre}</strong>,',
		'body'     => 'We have received your request for <strong>{feria}</strong> and we are already on it. We will get back to you shortly.',
		'brief'    => 'To get ahead, send us a brief or examples of stands you like to <a href="mailto:info@standarte.es" style="color:#1a73e8;text-decoration:underline;">info@standarte.es</a>.'
	);
	// El nombre y la feria vienen del formulario: se escapan antes de entrar en el HTML.
	$ack_nombre = htmlspecialchars($form_nombre, ENT_QUOTES, 'UTF-8');
	$ack_feria  = htmlspecialchars($form_feria, ENT_QUOTES, 'UTF-8');
	$ack_render = function ($txt) use ($ack_nombre, $ack_feria) {
		return "<p style='margin:0 0 14px;'>" . str_replace('{nombre}', $ack_nombre, $txt['greeting']) . "</p>"
			 . "<p style='margin:0 0 14px;'>" . str_replace('{feria}', $ack_feria, $txt['body']) . "</p>"
			 . "<p style='margin:0;'>" . $txt['brief'] . "</p>";
	};
	$ack_signature = 'El equipo de Standarte &middot; The Standarte Team<br>info@standarte.es | +34 637 894 819';

	$email_html = "
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset='utf-8'>
		<title>" . htmlspecialchars($ack_subject, ENT_QUOTES, 'UTF-8') . "</title>
	</head>
	<body style='font-family: Arial, sans-serif; font-size: 16px; color: #2b303a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;'>
		<div style='background-color: #292f35; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;'>
			<img src='https://standarte.es/img/logo_stand-arte_blanco.svg' alt='Standarte' style='width: 180px;'>
		</div>
		<div style='padding: 30px 20px; background-color: #ffffff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);'>
			" . $ack_render($ack_es) . "
			<hr style='border:0;border-top:1px solid #e9ecef;margin:24px 0;'>
			" . $ack_render($ack_en) . "
			<p style='margin-top: 26px; border-top: 1px dotted #dee2e6; padding-top: 18px;'>" . $ack_signature . "</p>
		</div>
		<div style='margin-top: 20px; text-align: center; font-size: 12px; color: #6c757d;'>
			<p>" . $pie_email . "</p>
		</div>
	</body>
	</html>";

	// Enviar correo vía SMTP premium (con fallback a mail nativo si falla)
	$smtp_sent = false;
	try {
		require_once __DIR__ . '/email_campaing/mailer.php';
		$smtpConfig = require_once __DIR__ . '/email_campaing/config.php';
		$smtp_sent = campaign_send_mail($smtpConfig, $form_email, $ack_subject, $email_html);
	} catch (Exception $e) {
		$smtp_sent = false;
	}

	if (!$smtp_sent) {
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers .= "From: Standarte <info@standarte.es>\r\n";
		$headers .= "Reply-To: info@standarte.es\r\n";
		@mail($form_email, $ack_subject, $email_html, $headers);
	}
	/*____________________FIN SCRIPT MAIL________________________*/

	/*____________________AVISO INMEDIATO AL EQUIPO (cada solicitud)________________________*/
	// Se envía SIEMPRE al recibir el formulario, sin depender de que el lead pulse
	// Sí/No en el email de filtro. Por SMTP firmado (DKIM); si fallara, mail() como
	// último recurso (el aviso va a info@standarte.es, buzón del propio OVH).
	/* ---------- Archivos adjuntos del paso 4 (planos, fotos, briefing) ----------
	 * Llegan como form_archivos[]. No se guardan en disco: se leen y se adjuntan al
	 * aviso interno, que es donde los necesita el equipo para presupuestar.
	 *
	 * Se valida en servidor aunque el navegador ya filtre: la extensión contra una
	 * lista blanca (nada de ejecutables ni scripts), el tamaño por fichero y el total,
	 * y el número de ficheros. El nombre se sanea porque viaja a una cabecera MIME.  */
	$attachments = array();
	$attach_names = array();
	$attach_skipped = array();
	$ATTACH_MAX_FILES = 5;
	$ATTACH_MAX_BYTES = 8 * 1024 * 1024;   // por fichero
	$ATTACH_MAX_TOTAL = 20 * 1024 * 1024;  // suma de todos
	$ATTACH_EXT = array('pdf','jpg','jpeg','png','webp','avif','gif','dwg','dxf','zip','doc','docx','xls','xlsx','ppt','pptx','ai','psd','svg','txt');
	if (!empty($_FILES['form_archivos']) && is_array($_FILES['form_archivos']['name'])) {
		$total = 0;
		$count = count($_FILES['form_archivos']['name']);
		for ($i = 0; $i < $count; $i++) {
			if (count($attachments) >= $ATTACH_MAX_FILES) { $attach_skipped[] = 'límite de ' . $ATTACH_MAX_FILES . ' archivos'; break; }
			if ((int) $_FILES['form_archivos']['error'][$i] !== UPLOAD_ERR_OK) { continue; }
			$tmp  = $_FILES['form_archivos']['tmp_name'][$i];
			$size = (int) $_FILES['form_archivos']['size'][$i];
			$raw  = (string) $_FILES['form_archivos']['name'][$i];
			if (!is_uploaded_file($tmp)) { continue; }
			$ext = strtolower(pathinfo($raw, PATHINFO_EXTENSION));
			if (!in_array($ext, $ATTACH_EXT, true)) { $attach_skipped[] = $raw . ' (tipo no admitido)'; continue; }
			if ($size <= 0 || $size > $ATTACH_MAX_BYTES) { $attach_skipped[] = $raw . ' (supera 8 MB)'; continue; }
			if ($total + $size > $ATTACH_MAX_TOTAL) { $attach_skipped[] = $raw . ' (se supera el total de 20 MB)'; continue; }
			$data = @file_get_contents($tmp);
			if ($data === false) { continue; }
			// Nombre saneado: sin rutas ni caracteres que rompan la cabecera MIME.
			$safe = preg_replace('/[^\w.\- ]+/u', '_', basename($raw));
			if ($safe === '' || $safe === null) { $safe = 'adjunto.' . $ext; }
			$attachments[] = array('name' => $safe, 'type' => 'application/octet-stream', 'data' => $data);
			$attach_names[] = $safe . ' (' . round($size / 1024) . ' KB)';
			$total += $size;
		}
	}
	$attach_row = '';
	if (!empty($attach_names) || !empty($attach_skipped)) {
		$txt = !empty($attach_names) ? htmlspecialchars(implode(', ', $attach_names), ENT_QUOTES, 'UTF-8') : '&mdash;';
		if (!empty($attach_skipped)) {
			$txt .= "<div style='color:#b3261e;font-size:13px;margin-top:4px;'>No adjuntados: " . htmlspecialchars(implode('; ', $attach_skipped), ENT_QUOTES, 'UTF-8') . '</div>';
		}
		$attach_row = "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Archivos:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . $txt . "</td></tr>";
	}

	$admin_notify_subject = 'NUEVA SOLICITUD WEB - ' . $form_feria . ' - ' . $form_empresa;
	$admin_notify_html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
		. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#333;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
		. "<div style='background:#292f35;color:#ffc800;padding:18px;text-align:center;font-weight:bold;border-radius:6px 6px 0 0;'>NUEVA SOLICITUD DESDE LA WEB</div>"
		. "<div style='padding:20px;border:1px solid #ddd;border-top:none;border-radius:0 0 6px 6px;'>"
		. "<table style='width:100%;border-collapse:collapse;'>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:35%;'>Nombre:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_nombre) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Empresa:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_empresa) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Email:</td><td style='padding:8px;border-bottom:1px solid #eee;'><a href='mailto:" . htmlspecialchars($form_email) . "'>" . htmlspecialchars($form_email) . "</a></td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Tel&eacute;fono:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_tlf) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Feria:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_feria) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Localizaci&oacute;n:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_localizacion) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Metros:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_metros) . " m&sup2;</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Presupuesto m&iacute;n. estimado:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($form_presupuesto) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Descripci&oacute;n:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . nl2br(htmlspecialchars($form_descripcion)) . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Otras ferias (sinergia):</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . ($form_sinergia !== '' ? htmlspecialchars($form_sinergia) : '&mdash;') . "</td></tr>"
		. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Opciones:</td><td style='padding:8px;border-bottom:1px solid #eee;font-size:13px;'>" . $form_opciones . "</td></tr>"
		. $attach_row
		. "</table>"
		. "<p style='margin-top:18px;font-size:13px;color:#777;'>Aviso autom&aacute;tico al recibir el formulario. El lead tambi&eacute;n queda guardado en Supabase (id " . (int)$inserted_id . ").</p>"
		. "</div></body></html>";
	try {
		if (!function_exists('campaign_send_smtp')) { require_once __DIR__ . '/email_campaing/mailer.php'; }
		$notifyConfig = require __DIR__ . '/email_campaing/config.php';
		$notifyConfig['from_name'] = 'Standarte Leads';
		campaign_send_smtp($notifyConfig, 'info@standarte.es', $admin_notify_subject, $admin_notify_html, $attachments);
	} catch (Exception $e) {
		$notify_headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte Leads <info@standarte.es>\r\nReply-To: " . $form_email . "\r\n";
		@mail('info@standarte.es', $admin_notify_subject, $admin_notify_html, $notify_headers);
	}
	/*____________________FIN AVISO EQUIPO________________________*/

	$output['error'] = 'success';
	$output['msg']   = $mail_text['success']; 

}
    echo json_encode($output);
