<?php
/*
 * Handler del formulario del Asesor (WelcomeAdvisor / "Pat").
 *
 * IMPORTANTE: este formulario NO está conectado con el sistema de filtrado de
 * presupuesto (ajax_presupuesto_form.php + Supabase + enlaces sí/no). Es una
 * utilidad pensada para crear un vínculo de valor con el visitante: cuando
 * completa el formulario se le envía un simple ACUSE DE RECIBO en su idioma,
 * indicándole que nuestro asesoramiento personalizado aportará valor a sus
 * objetivos de expansión comercial. Además, se avisa internamente al equipo
 * para poder hacer el seguimiento.
 *
 * Reutiliza el mailer SMTP de email_campaing/ (mismo remitente info@standarte.es).
 */

header('Content-Type: application/json; charset=utf-8');

function adv_post($key, $default = '') {
	if (!isset($_POST[$key])) return $default;
	$v = $_POST[$key];
	if (!is_string($v)) return $default;
	// Algunos navegadores/proxies mandan en Latin-1; normalizamos a UTF-8.
	if (function_exists('mb_check_encoding') && !mb_check_encoding($v, 'UTF-8')) {
		$v = function_exists('mb_convert_encoding') ? mb_convert_encoding($v, 'UTF-8', 'Windows-1252') : $v;
	}
	return trim($v);
}

$lang   = adv_post('form_lang', 'es');
$allowed = array('es', 'en', 'de', 'pt', 'fr', 'it', 'nl', 'zh', 'hi', 'ko', 'ja');
if (!in_array($lang, $allowed, true)) {
	$lang = 'es';
}

$nombre     = adv_post('form_nombre');
$email      = adv_post('form_email');
$feria      = adv_post('form_feria');
$privacidad = adv_post('form_privacidad');
$url        = adv_post('form_url');
$website    = adv_post('form_website'); // honeypot anti-spam (debe llegar vacío)
$elapsed    = (int) adv_post('form_elapsed', '0'); // ms desde que se mostró el formulario

/* ---------- Resultados (URLs de actividad seleccionadas por el visitante) ----------
 * Llegan como JSON [{label, url}, ...]. Solo se aceptan URLs https de standarte.es
 * para no permitir que un tercero inyecte enlaces externos en nuestros correos.   */
$resultados = array();
$resultados_raw = adv_post('form_resultados');
if ($resultados_raw !== '') {
	$decoded = json_decode($resultados_raw, true);
	if (is_array($decoded)) {
		foreach ($decoded as $r) {
			if (!is_array($r)) continue;
			$u = isset($r['url']) ? trim((string) $r['url']) : '';
			$l = isset($r['label']) ? trim((string) $r['label']) : '';
			if ($u === '' || !filter_var($u, FILTER_VALIDATE_URL)) continue;
			$host = strtolower((string) parse_url($u, PHP_URL_HOST));
			if ($host !== 'standarte.es' && $host !== 'www.standarte.es') continue;
			$resultados[] = array('url' => $u, 'label' => $l);
			if (count($resultados) >= 20) break; // tope defensivo
		}
	}
}

/* ---------- Anti-spam (honeypot + tiempo mínimo) ---------- */
/* Descarte SILENCIOSO (acuse "success" para no dar pistas al bot) si el campo
   trampa viene relleno o el formulario se envió antes de 2,5 s (no humano). */
if ($website !== '' || $elapsed < 2500) {
	echo json_encode(array('error' => 'success', 'msg' => 'OK'));
	exit;
}

/* ---------- Validación en servidor ---------- */
if ($privacidad !== '1') {
	echo json_encode(array('error' => 'error', 'msg' => ''));
	exit;
}
if ($nombre === '' || $email === '') {
	echo json_encode(array('error' => 'error', 'msg' => ''));
	exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	echo json_encode(array('error' => 'error', 'msg' => ''));
	exit;
}

$nombre_safe = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$feria_safe  = htmlspecialchars($feria, ENT_QUOTES, 'UTF-8');
$url_safe    = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');

/* ---------- Textos del acuse de recibo (11 idiomas) ---------- */
$emails = array(
	'es' => array(
		'subject'  => 'Hemos recibido tus datos – Standarte',
		'greeting' => 'Hola <strong>{nombre}</strong>,',
		'intro'    => 'Gracias por escribirnos. Hemos recibido correctamente tus datos en relación con <strong>{feria}</strong>.',
		'advisory' => 'Sin duda, nuestro servicio de asesoramiento, totalmente personalizado, aportará un valor real a tus objetivos de expansión comercial en España y Portugal. Estudiaremos tu caso y muy pronto te haremos llegar un breve informe con las ferias más interesantes para tu sector.',
		'closing'  => 'Un cordial saludo,<br><strong>El equipo de Standarte</strong><br>info@standarte.es | +34 637 894 819'
	),
	'en' => array(
		'subject'  => 'We have received your details – Standarte',
		'greeting' => 'Hello <strong>{nombre}</strong>,',
		'intro'    => 'Thank you for getting in touch. We have successfully received your details regarding <strong>{feria}</strong>.',
		'advisory' => 'Our fully personalised advisory service will undoubtedly add real value to your commercial expansion goals in Spain and Portugal. We will study your case and shortly send you a brief report with the most interesting trade shows for your sector.',
		'closing'  => 'Best regards,<br><strong>The Standarte Team</strong><br>info@standarte.es | +34 637 894 819'
	),
	'de' => array(
		'subject'  => 'Wir haben Ihre Angaben erhalten – Standarte',
		'greeting' => 'Hallo <strong>{nombre}</strong>,',
		'intro'    => 'Vielen Dank für Ihre Nachricht. Wir haben Ihre Angaben zu <strong>{feria}</strong> erfolgreich erhalten.',
		'advisory' => 'Unser umfassend personalisierter Beratungsservice wird Ihren Zielen für die geschäftliche Expansion in Spanien und Portugal zweifellos einen echten Mehrwert bieten. Wir prüfen Ihren Fall und senden Ihnen in Kürze einen kurzen Bericht mit den interessantesten Messen für Ihre Branche.',
		'closing'  => 'Mit freundlichen Grüßen,<br><strong>Ihr Standarte-Team</strong><br>info@standarte.es | +34 637 894 819'
	),
	'pt' => array(
		'subject'  => 'Recebemos os seus dados – Standarte',
		'greeting' => 'Olá <strong>{nombre}</strong>,',
		'intro'    => 'Obrigado por nos contactar. Recebemos corretamente os seus dados relativos a <strong>{feria}</strong>.',
		'advisory' => 'Sem dúvida, o nosso serviço de assessoria, totalmente personalizado, trará um valor real aos seus objetivos de expansão comercial em Espanha e Portugal. Vamos estudar o seu caso e enviar-lhe em breve um breve relatório com as feiras mais interessantes para o seu setor.',
		'closing'  => 'Com os melhores cumprimentos,<br><strong>A Equipa da Standarte</strong><br>info@standarte.es | +34 637 894 819'
	),
	'fr' => array(
		'subject'  => 'Nous avons bien reçu vos informations – Standarte',
		'greeting' => 'Bonjour <strong>{nombre}</strong>,',
		'intro'    => 'Merci de nous avoir contactés. Nous avons bien reçu vos informations concernant <strong>{feria}</strong>.',
		'advisory' => 'Notre service de conseil, entièrement personnalisé, apportera sans aucun doute une réelle valeur à vos objectifs d\'expansion commerciale en Espagne et au Portugal. Nous étudierons votre cas et vous enverrons très prochainement un bref rapport avec les salons les plus intéressants pour votre secteur.',
		'closing'  => 'Cordialement,<br><strong>L\'équipe Standarte</strong><br>info@standarte.es | +34 637 894 819'
	),
	'it' => array(
		'subject'  => 'Abbiamo ricevuto i tuoi dati – Standarte',
		'greeting' => 'Ciao <strong>{nombre}</strong>,',
		'intro'    => 'Grazie per averci scritto. Abbiamo ricevuto correttamente i tuoi dati relativi a <strong>{feria}</strong>.',
		'advisory' => 'Il nostro servizio di consulenza, completamente personalizzato, porterà senza dubbio un valore reale ai tuoi obiettivi di espansione commerciale in Spagna e Portogallo. Studieremo il tuo caso e ti invieremo a breve un breve report con le fiere più interessanti per il tuo settore.',
		'closing'  => 'Cordiali saluti,<br><strong>Il team di Standarte</strong><br>info@standarte.es | +34 637 894 819'
	),
	'nl' => array(
		'subject'  => 'We hebben uw gegevens ontvangen – Standarte',
		'greeting' => 'Hallo <strong>{nombre}</strong>,',
		'intro'    => 'Bedankt voor uw bericht. We hebben uw gegevens met betrekking tot <strong>{feria}</strong> goed ontvangen.',
		'advisory' => 'Onze volledig gepersonaliseerde adviesservice zal ongetwijfeld een echte meerwaarde bieden voor uw doelstellingen op het gebied van commerciële expansie in Spanje en Portugal. We bestuderen uw situatie en sturen u binnenkort een kort rapport met de interessantste beurzen voor uw sector.',
		'closing'  => 'Met vriendelijke groet,<br><strong>Het Standarte-team</strong><br>info@standarte.es | +34 637 894 819'
	),
	'zh' => array(
		'subject'  => '我们已收到您的信息 – Standarte',
		'greeting' => '您好 <strong>{nombre}</strong>，',
		'intro'    => '感谢您与我们联系。我们已成功收到您关于 <strong>{feria}</strong> 的信息。',
		'advisory' => '我们提供的完全个性化咨询服务，必将为您在西班牙和葡萄牙的商业拓展目标带来实实在在的价值。我们会研究您的情况，并很快向您发送一份简要报告，列出最适合您所在行业的展会。',
		'closing'  => '此致敬礼，<br><strong>Standarte 团队</strong><br>info@standarte.es | +34 637 894 819'
	),
	'hi' => array(
		'subject'  => 'हमें आपकी जानकारी मिल गई है – Standarte',
		'greeting' => 'नमस्ते <strong>{nombre}</strong>,',
		'intro'    => 'हमसे संपर्क करने के लिए धन्यवाद। हमें <strong>{feria}</strong> के संबंध में आपकी जानकारी सफलतापूर्वक प्राप्त हो गई है।',
		'advisory' => 'हमारी पूरी तरह से वैयक्तिकृत परामर्श सेवा निस्संदेह स्पेन और पुर्तगाल में आपके व्यावसायिक विस्तार के लक्ष्यों में वास्तविक मूल्य जोड़ेगी। हम आपके मामले का अध्ययन करेंगे और शीघ्र ही आपको आपके क्षेत्र के लिए सबसे दिलचस्प मेलों के साथ एक संक्षिप्त रिपोर्ट भेजेंगे।',
		'closing'  => 'सादर,<br><strong>Standarte टीम</strong><br>info@standarte.es | +34 637 894 819'
	),
	'ko' => array(
		'subject'  => '고객님의 정보를 받았습니다 – Standarte',
		'greeting' => '안녕하세요 <strong>{nombre}</strong>님,',
		'intro'    => '연락 주셔서 감사합니다. <strong>{feria}</strong> 관련 정보를 정상적으로 받았습니다.',
		'advisory' => '저희의 완전 맞춤형 컨설팅 서비스는 스페인 및 포르투갈에서의 사업 확장 목표에 분명한 가치를 더해 드릴 것입니다. 고객님의 사례를 검토한 뒤, 귀하의 업종에 가장 적합한 전시회를 정리한 간략한 리포트를 곧 보내드리겠습니다.',
		'closing'  => '감사합니다.<br><strong>Standarte 팀</strong><br>info@standarte.es | +34 637 894 819'
	),
	'ja' => array(
		'subject'  => 'お客様の情報を受け取りました – Standarte',
		'greeting' => '<strong>{nombre}</strong> 様,',
		'intro'    => 'お問い合わせいただきありがとうございます。<strong>{feria}</strong> に関するお客様の情報を確かに受け取りました。',
		'advisory' => '当社の完全オーダーメイドのアドバイザリーサービスは、スペインおよびポルトガルでの事業拡大という目標に必ずや確かな価値をもたらします。お客様のご状況を検討のうえ、近日中に、お客様の業種に最適な展示会をまとめた簡単なレポートをお送りします。',
		'closing'  => '敬具<br><strong>Standarteチーム</strong><br>info@standarte.es | +34 637 894 819'
	)
);

$t = isset($emails[$lang]) ? $emails[$lang] : $emails['en'];

/* ---------- Encabezado de la sección de resultados (11 idiomas) ---------- */
$results_headings = array(
	'es' => 'Para agilizar tu búsqueda, aquí tienes el acceso directo a las páginas de las actividades que has seleccionado:',
	'en' => 'To speed up your search, here are the direct links to the activity pages you selected:',
	'de' => 'Um Ihre Suche zu beschleunigen, finden Sie hier die direkten Links zu den von Ihnen ausgewählten Tätigkeitsseiten:',
	'pt' => 'Para agilizar a sua pesquisa, aqui tem o acesso direto às páginas das atividades que selecionou:',
	'fr' => 'Pour accélérer votre recherche, voici les liens directs vers les pages des activités que vous avez sélectionnées :',
	'it' => 'Per velocizzare la tua ricerca, ecco i link diretti alle pagine delle attività che hai selezionato:',
	'nl' => 'Om uw zoektocht te versnellen, vindt u hier de directe links naar de door u geselecteerde activiteitenpagina\'s:',
	'zh' => '为加快您的查找，以下是您所选活动页面的直接链接：',
	'hi' => 'आपकी खोज को तेज़ करने के लिए, यहाँ आपके द्वारा चुनी गई गतिविधि पृष्ठों के सीधे लिंक हैं:',
	'ko' => '검색을 빠르게 하실 수 있도록, 선택하신 활동 페이지로 바로 가는 링크를 안내드립니다:',
	'ja' => '検索をスピードアップするため、お客様が選択された分野ページへの直接リンクをご案内します：'
);
$results_heading = isset($results_headings[$lang]) ? $results_headings[$lang] : $results_headings['en'];

/* ---------- Nota destacada (en negrita) bajo el encabezado (11 idiomas) ---------- */
$results_subnotes = array(
	'es' => 'En todos los eventos listados en estas páginas Standarte puede acompañarte como instalador de vuestro stand.',
	'en' => 'At every event listed on these pages, Standarte can support you as the installer of your stand.',
	'de' => 'Bei allen auf diesen Seiten aufgeführten Veranstaltungen kann Standarte Sie als Monteur Ihres Standes begleiten.',
	'pt' => 'Em todos os eventos listados nestas páginas, a Standarte pode acompanhá-lo como instalador do seu stand.',
	'fr' => 'Pour tous les événements listés sur ces pages, Standarte peut vous accompagner en tant qu\'installateur de votre stand.',
	'it' => 'In tutti gli eventi elencati in queste pagine, Standarte può accompagnarti come installatore del tuo stand.',
	'nl' => 'Bij alle evenementen op deze pagina\'s kan Standarte u begeleiden als installateur van uw stand.',
	'zh' => '在这些页面所列的所有展会中，Standarte 都能作为您展台的搭建商为您提供支持。',
	'hi' => 'इन पृष्ठों पर सूचीबद्ध सभी आयोजनों में, Standarte आपके स्टैंड के इंस्टॉलर के रूप में आपका साथ दे सकता है।',
	'ko' => '이 페이지에 나열된 모든 행사에서 Standarte가 귀하의 부스 설치업체로서 함께할 수 있습니다.',
	'ja' => 'これらのページに掲載されているすべてのイベントで、Standarteはお客様のブースの施工業者としてサポートいたします。'
);
$results_subnote = isset($results_subnotes[$lang]) ? $results_subnotes[$lang] : $results_subnotes['en'];

/* Bloque HTML con los enlaces funcionales (vacío si no hubo selección). */
$results_html = '';
if (!empty($resultados)) {
	$items = '';
	foreach ($resultados as $r) {
		$u_safe = htmlspecialchars($r['url'], ENT_QUOTES, 'UTF-8');
		$l_safe = htmlspecialchars($r['label'], ENT_QUOTES, 'UTF-8');
		$items .= "<li style='margin-bottom:12px;'>"
			. ($l_safe !== '' ? "<span style='font-weight:bold;color:#2b303a;'>" . $l_safe . ":</span> " : "")
			. "<a href='" . $u_safe . "' style='color:#1a3fd4;text-decoration:underline;word-break:break-all;'>" . $u_safe . "</a>"
			. "</li>";
	}
	$results_html = "<div style='margin-top:24px;background:#f5f7ff;border:1px solid #e2e8ff;border-radius:8px;padding:18px 20px;'>"
		. "<p style='margin:0 0 12px 0;'>" . htmlspecialchars($results_heading, ENT_QUOTES, 'UTF-8') . "</p>"
			. "<p style='margin:0 0 14px 0;'><strong>" . htmlspecialchars($results_subnote, ENT_QUOTES, 'UTF-8') . "</strong></p>"
		. "<ul style='padding-left:20px;margin:0;'>" . $items . "</ul>"
		. "</div>";
}

$greeting = str_replace('{nombre}', $nombre_safe, $t['greeting']);
$intro    = ($feria_safe !== '')
	? str_replace('{feria}', $feria_safe, $t['intro'])
	: preg_replace('/\s*<strong>\{feria\}<\/strong>/u', '', $t['intro']);

/* ---------- HTML del correo (misma estética de marca) ---------- */
$email_html = "
<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<title>" . htmlspecialchars($t['subject'], ENT_QUOTES, 'UTF-8') . "</title>
</head>
<body style='font-family: Arial, sans-serif; font-size: 16px; color: #2b303a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;'>
	<div style='background-color: #292f35; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;'>
		<img src='https://standarte.es/img/logo_stand-arte_blanco.svg' alt='Standarte' style='width: 180px;'>
	</div>
	<div style='padding: 30px 20px; background-color: #ffffff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);'>
		<p>" . $greeting . "</p>
		<p>" . $intro . "</p>
		<p>" . $t['advisory'] . "</p>
		" . $results_html . "
		<p style='margin-top: 30px; border-top: 1px dotted #dee2e6; padding-top: 20px;'>" . $t['closing'] . "</p>
	</div>
	<div style='margin-top: 20px; text-align: center; font-size: 12px; color: #6c757d;'>
		<p>Standarte · Diseño y construcción de stands · standarte.es</p>
	</div>
</body>
</html>";

/* ---------- Envío del acuse al visitante (SMTP puro con fallback) ----------
 * Usamos campaign_send_smtp (NO campaign_send_mail), porque esta última consulta
 * Supabase para registrar el contacto. El asesor debe estar desacoplado de ese
 * sistema: aquí solo enviamos el acuse por SMTP firmado, sin tocar Supabase.    */
$smtp_sent = false;
try {
	require_once __DIR__ . '/email_campaing/mailer.php';
	$smtpConfig = require __DIR__ . '/email_campaing/config.php';
	$smtp_sent = campaign_send_smtp($smtpConfig, $email, $t['subject'], $email_html);
} catch (Exception $e) {
	$smtp_sent = false;
}
if (!$smtp_sent) {
	$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\nReply-To: info@standarte.es\r\n";
	@mail($email, $t['subject'], $email_html, $headers);
}

/* ---------- Copia (CCO) del acuse enviado al cliente para javier@standarte.es ----
 * Envío separado (el cliente nunca ve esta dirección): javier recibe exactamente el
 * mismo correo —incluidos los enlaces de resultados— que ha recibido el visitante.  */
$bcc_subject = '[Copia cliente] ' . $t['subject'];
try {
	if (!function_exists('campaign_send_smtp')) { require_once __DIR__ . '/email_campaing/mailer.php'; }
	$bccConfig = isset($smtpConfig) ? $smtpConfig : require __DIR__ . '/email_campaing/config.php';
	$bccConfig['reply_to'] = $email; // responder lleva directo al visitante
	campaign_send_smtp($bccConfig, 'javier@standarte.es', $bcc_subject, $email_html);
} catch (Exception $e) {
	$bcc_headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte <info@standarte.es>\r\nReply-To: " . $email . "\r\n";
	@mail('javier@standarte.es', $bcc_subject, $email_html, $bcc_headers);
}

/* ---------- Aviso interno al equipo (para poder asesorar) ---------- */
$notify_links_row = '';
if (!empty($resultados)) {
	$links = '';
	foreach ($resultados as $r) {
		$u_safe = htmlspecialchars($r['url'], ENT_QUOTES, 'UTF-8');
		$l_safe = htmlspecialchars($r['label'], ENT_QUOTES, 'UTF-8');
		$links .= "<div style='margin-bottom:4px;'>" . ($l_safe !== '' ? "<strong>" . $l_safe . ":</strong> " : "")
			. "<a href='" . $u_safe . "'>" . $u_safe . "</a></div>";
	}
	$notify_links_row = "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;'>Resultados enviados:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . $links . "</td></tr>";
}
$notify_subject = 'NUEVO CONTACTO ASESOR (PAT) - ' . ($feria !== '' ? $feria : 's/feria');
$notify_html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
	. "<body style='font-family:Arial,sans-serif;font-size:15px;color:#333;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;'>"
	. "<div style='background:#292f35;color:#ffc800;padding:18px;text-align:center;font-weight:bold;border-radius:6px 6px 0 0;'>NUEVO CONTACTO DESDE EL ASESOR (PAT)</div>"
	. "<div style='padding:20px;border:1px solid #ddd;border-top:none;border-radius:0 0 6px 6px;'>"
	. "<table style='width:100%;border-collapse:collapse;'>"
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:35%;'>Nombre:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . $nombre_safe . "</td></tr>"
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Email:</td><td style='padding:8px;border-bottom:1px solid #eee;'><a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</a></td></tr>"
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Feria / ciudad:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . $feria_safe . "</td></tr>"
	. $notify_links_row
	. "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Idioma:</td><td style='padding:8px;border-bottom:1px solid #eee;'>" . htmlspecialchars($lang, ENT_QUOTES, 'UTF-8') . "</td></tr>"
		. ($url_safe !== '' ? "<tr><td style='padding:8px;border-bottom:1px solid #eee;font-weight:bold;'>Página de origen:</td><td style='padding:8px;border-bottom:1px solid #eee;'><a href='" . $url_safe . "'>" . $url_safe . "</a></td></tr>" : "")
	. "</table>"
	. "<p style='margin-top:18px;font-size:13px;color:#777;'>Contacto generado desde el asesor interactivo (Pat). NO pasa por el filtrado de presupuesto. Se ha enviado un acuse de recibo al visitante.</p>"
	. "</div></body></html>";
try {
	if (!function_exists('campaign_send_smtp')) { require_once __DIR__ . '/email_campaing/mailer.php'; }
	$notifyConfig = require __DIR__ . '/email_campaing/config.php';
	$notifyConfig['from_name'] = 'Standarte Asesor';
	$notifyConfig['reply_to']  = $email; // responder lleva directo al visitante
	campaign_send_smtp($notifyConfig, 'info@standarte.es', $notify_subject, $notify_html);
} catch (Exception $e) {
	$notify_headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: Standarte Asesor <info@standarte.es>\r\nReply-To: " . $email . "\r\n";
	@mail('info@standarte.es', $notify_subject, $notify_html, $notify_headers);
}

echo json_encode(array('error' => 'success', 'msg' => 'OK'));
