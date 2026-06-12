<?php
include("config.php");
?>

<?php

	$ltd_email = '';
	$pie_email = '';

	if ($db) {
		try {
			$subdatos_email = $db->prepare("SELECT * FROM company");
			$subdatos_email->execute();
			$subdatos = $subdatos_email->fetchAll(PDO::FETCH_ASSOC);

			foreach ($subdatos as $subdatos) {
				$titular_email = $subdatos['exxp'];
				$ltd_email = $subdatos['ltd'];
				$pie_email = $subdatos['foot'];
			};
		} catch (Exception $e) {
			// Ignore DB select error
		}
	}
?>


<?php  
	function post_value($key, $default = '') {
		return trim((string)($_POST[$key] ?? $default));
	}

	function get_fair_comment($feria_name, $lang) {
		$feria_lower = mb_strtolower($feria_name, 'UTF-8');
		
		$comments = array(
			'extremadura' => array(
				'es' => "La feria <strong>{feria}</strong> en nuestra región de <strong>Extremadura / Alentejo</strong> es una oportunidad de gran cercanía logística para nosotros, lo que nos permite ofreceros unas condiciones de montaje inmejorables y un seguimiento directo.",
				'en' => "The <strong>{feria}</strong> exhibition in our region of <strong>Extremadura / Alentejo</strong> represents a great logistical proximity for us, allowing us to offer you excellent assembly conditions and direct monitoring.",
				'pt' => "A feira <strong>{feria}</strong> na nossa região de <strong>Extremadura / Alentejo</strong> é uma oportunidade de grande proximidade logística para nós, permitindo-nos oferecer-vos excelentes condições de montagem e acompanhamento direto.",
				'de' => "Die Messe <strong>{feria}</strong> in unserer Region <strong>Extremadura / Alentejo</strong> bietet uns eine hervorragende logistische Nähe, was es uns ermöglicht, Ihnen unschlagbare Montagebedingungen und eine direkte Betreuung anzubieten.",
				'fr' => "Le salon <strong>{feria}</strong> dans notre région d'<strong>Extrémadure / Alentejo</strong> es une opportunité de grande proximité logistique pour nous, nous permettant de vous offrir des conditions de montage imbattables et un suivi direct."
			),
			'madrid' => array(
				'es' => "La feria <strong>{feria}</strong> en <strong>IFEMA (Madrid)</strong> es un escaparate de primer nivel a nivel nacional e internacional, y estamos seguros de que vuestro stand en este recinto captará la atención de los principales operadores del sector.",
				'en' => "The <strong>{feria}</strong> exhibition at <strong>IFEMA (Madrid)</strong> is a top-tier national and international showcase, and we are confident that your stand in this venue will capture the attention of the sector's main players.",
				'pt' => "A feira <strong>{feria}</strong> na <strong>IFEMA (Madrid)</strong> é uma vitrine de primeira linha a nível nacional e internacional, e estamos seguros de que o vosso stand neste recinto captará la atenção dos principais operadores del setor.",
				'de' => "Die Messe <strong>{feria}</strong> auf der <strong>IFEMA (Madrid)</strong> ist eine erstklassige nationale und internationale Plattform, und wir sind sicher, dass Ihr Stand an diesem Standort die Aufmerksamkeit der wichtigsten Akteure der Branche auf sich ziehen wird.",
				'fr' => "Le salon <strong>{feria}</strong> à <strong>IFEMA (Madrid)</strong> es une vitrine de premier plan au niveau national et international, y nous sommes convaincus que votre stand dans ce parc des expositions saura capter l'attention des principaux acteurs du secteur."
			),
			'barcelona' => array(
				'es' => "La feria <strong>{feria}</strong> en la <strong>Fira de Barcelona</strong> es uno de los epicentros de negocio más influyentes de Europa, y vuestra presencia en este recinto requiere un stand a la altura de las altas expectativas del mercado.",
				'en' => "The <strong>{feria}</strong> exhibition at <strong>Fira Barcelona</strong> is one of Europe's most influential business hubs, and your presence in this venue demands a stand that lives up to the market's high expectations.",
				'pt' => "A feira <strong>{feria}</strong> na <strong>Fira de Barcelona</strong> é um dos epicentros de negócios mais influentes da Europa, e a vossa presença neste recinto exige um stand à altura das elevadas expectativas del mercado.",
				'de' => "Die Messe <strong>{feria}</strong> auf der <strong>Fira de Barcelona</strong> ist eines der einflussreichsten Geschäftszentren Europas, und Ihre Präsenz an diesem Standort erfordert einen Stand, der den hohen Anforderungen des Marktes gerecht wird.",
				'fr' => "Le salon <strong>{feria}</strong> à la <strong>Fira de Barcelone</strong> est l'un des épicentres d'affaires les plus influents d'Europe, y votre présence dans ce lieu exige un stand à la hauteur des attentes élevées du marché."
			),
			'bilbao' => array(
				'es' => "La feria <strong>{feria}</strong> en el <strong>BEC de Bilbao</strong> destaca por su fuerte perfil industrial y tecnológico, lo que convierte a vuestro stand en una pieza clave para transmitir solidez y liderazgo comercial.",
				'en' => "The <strong>{feria}</strong> exhibition at the <strong>BEC in Bilbao</strong> stands out for its strong industrial and technological profile, making your stand a key element in conveying commercial strength and leadership.",
				'pt' => "A feira <strong>{feria}</strong> no <strong>BEC de Bilbau</strong> destaca-se pelo seu forte perfil industrial e tecnológico, tornando o vosso stand numa peça-chave para transmitir solidez e liderança comercial.",
				'de' => "Die Messe <strong>{feria}</strong> im <strong>BEC in Bilbao</strong> zeichnet sich durch ihr starkes industrielles und technologisches Profil aus, was Ihren Stand zu einem Schlüsselelement macht, um geschäftliche Stärke und Marktführerschaft zu demonstrieren.",
				'fr' => "Le salon <strong>{feria}</strong> au <strong>BEC de Bilbao</strong> se distingue par son fort profil industriel et technologique, ce que fait de votre stand un élément clave pour transmettre solidité et leadership comercial."
			),
			'valencia' => array(
				'es' => "La feria <strong>{feria}</strong> en <strong>Feria Valencia</strong> representa un gran impulso comercial en el mediterráneo, y nuestro equipo diseñará un espacio idóneo para maximizar el retorno de vuestra inversión.",
				'en' => "The <strong>{feria}</strong> exhibition at <strong>Feria Valencia</strong> represents a great commercial boost in the Mediterranean, and our team will design an ideal space to maximize your return on investment.",
				'pt' => "A feira <strong>{feria}</strong> na <strong>Feria Valencia</strong> representa um grande impulso comercial no Mediterrâneo, e a nossa equipa desenhará um espaço ideal para maximizar o retorno do vosso investimento.",
				'de' => "Die Messe <strong>{feria}</strong> auf der <strong>Feria Valencia</strong> stellt einen großen geschäftlichen Impuls im Mittelmeerraum dar, und unser Team wird einen optimalen Stand entwerfen, um die Rendite Ihrer Investition zu maximieren.",
				'fr' => "Le salon <strong>{feria}</strong> à la <strong>Feria Valencia</strong> représente un grand élan comercial en Méditerranée, y notre équipe concevra un espacio idéal pour maximiser le retorno sur votre investissement."
			),
			'zaragoza' => array(
				'es' => "La feria <strong>{feria}</strong> en la <strong>Feria de Zaragoza</strong> es un evento sectorial de gran tradición y afluencia, donde un stand de carpintería premium os posicionará como la opción de referencia para los visitantes.",
				'en' => "The <strong>{feria}</strong> exhibition at <strong>Feria de Zaragoza</strong> is a sector event of great tradition and attendance, where a premium custom wooden stand will position you as the reference option for visitors.",
				'pt' => "A feira <strong>{feria}</strong> na <strong>Feria de Zaragoza</strong> é um evento setorial de grande tradição e afluência, onde um stand de madeira premium vos posicionará como la opção de referência para os visitantes.",
				'de' => "Die Messe <strong>{feria}</strong> auf der <strong>Feria de Zaragoza</strong> ist eine Branchenveranstaltung mit großer tradition und Besucherzahlen, bei der ein hochwertiger Holzstand Sie als Referenzoption für Besucher positioniert.",
				'fr' => "Le salon <strong>{feria}</strong> à la <strong>Feria de Zaragoza</strong> est un événement sectoriel de grande tradition et de forte affluence, où un stand premium en bois sur mesure vous positionnera como l'option de référence pour les visiteurs."
			),
			'sevilla' => array(
				'es' => "La feria <strong>{feria}</strong> en <strong>FIBES (Sevilla)</strong> es una plataforma comercial clave en el sur, y estamos convencidos de que un stand a medida de alta calidad proyectará la solidez de vuestra marca.",
				'en' => "The <strong>{feria}</strong> exhibition at <strong>FIBES (Seville)</strong> is a key commercial platform in the south, and we are convinced that a high-quality bespoke stand will project your brand's strength.",
				'pt' => "A feira <strong>{feria}</strong> na <strong>FIBES (Sevilha)</strong> é uma plataforma comercial fundamental no sul, e estamos convencidos de que um stand personalizado de alta qualidade projetará a solidez da vossa marca.",
				'de' => "Die Messe <strong>{feria}</strong> im <strong>FIBES (Sevilla)</strong> ist eine wichtige Geschäftsplattform im Süden, und wir sind überzeugt, dass ein hochwertiger, maßgeschneiderter Stand die Stärke Ihrer Marke unterstreichen wird.",
				'fr' => "Le salon <strong>{feria}</strong> à <strong>FIBES (Séville)</strong> est une plateforme commerciale clave dans le sud, y nous sommes convaincus qu'un stand sur mesure de haute qualité saura projeter la solidité de votre marque."
			),
			'portugal' => array(
				'es' => "La feria <strong>{feria}</strong> en Portugal es un punto de encuentro comercial estratégico en la península, y estamos seguros de que vuestro espacio destacará por su calidad y diseño.",
				'en' => "The <strong>{feria}</strong> exhibition in Portugal is a strategic commercial meeting point on the peninsula, and we are sure that your space will stand out for its quality and design.",
				'pt' => "A feira <strong>{feria}</strong> em Portugal é um ponto de encontro comercial estratégico na península, e estamos certos de que o vosso espaço se destacará pela sua qualidade e design.",
				'de' => "Die Messe <strong>{feria}</strong> in Portugal ist ein strategischer geschäftlicher Treffpunkt auf der Halbinsel, und wir sind sicher, dass sich Ihr Stand durch Qualität und Design auszeichnen wird.",
				'fr' => "Le salon <strong>{feria}</strong> au Portugal est un point de rencontre comercial stratégique sur la péninsule, y nous sommes certains que votre espaço se distinguera par sa qualité et son design."
			),
			'internacional' => array(
				'es' => "La participación internacional en <strong>{feria}</strong> requiere una coordinación y logística impecables, y nuestro equipo cuenta con la experiencia en recintos feriales internacionales para asegurar el éxito de vuestra presencia.",
				'en' => "International participation in <strong>{feria}</strong> requires flawless coordination and logistics, and our team has the experience in international exhibition centers to ensure the success of your presence.",
				'pt' => "A participação internacional na <strong>{feria}</strong> exige uma coordenação e logística impecáveis, e a nossa equipa conta com a experiência em recintos de feiras internacionais para garantir o sucesso da vossa presença.",
				'de' => "Die internationale Teilnahme an der <strong>{feria}</strong> erfordert eine tadellose Koordination und Logistik, und unser Team verfügt über die Erfahrung auf internationalen Messegeländen, um den Erfolg Ihrer Präsenz zu sichern.",
				'fr' => "La participation internationale à <strong>{feria}</strong> exige une coordination et une logistique impeccables, y notre équipe dispose de l'expérience des parcs des expositions internationaux pour assurer le succès de votre présence."
			),
			'generico' => array(
				'es' => "La feria <strong>{feria}</strong> es un escaparate comercial sumamente interesante en vuestro sector, y estamos convencidos de que vuestro espacio tendrá una gran repercusión comercial.",
				'en' => "The <strong>{feria}</strong> exhibition is a highly interesting commercial showcase in your sector, and we are convinced that your space will have a great commercial impact.",
				'pt' => "A feira <strong>{feria}</strong> é uma montra comercial extremamente interessante no seu setor, e estamos convencidos de que o seu espaço terá um grande impacto comercial.",
				'de' => "Die Messe <strong>{feria}</strong> ist eine äußerst interessante kommerzielle Plattform in Ihrer Branche, und wir sind überzeugt, dass Ihr Stand eine große kommerzielle Wirkung erzielen wird.",
				'fr' => "Le salon <strong>{feria}</strong> est une vitrine commerciale extrêmement interesante dans votre secteur, y nous sommes convaincents que votre espace aura un impact commercial majeur."
			)
		);

		$key = 'generico';
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
			$key = 'extremadura';
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
			$key = 'madrid';
		} elseif (
			strpos($feria_lower, 'barcelona') !== false ||
			strpos($feria_lower, 'fira') !== false ||
			strpos($feria_lower, 'mwc') !== false ||
			strpos($feria_lower, 'mobile') !== false ||
			strpos($feria_lower, 'construmat') !== false ||
			strpos($feria_lower, 'sil') !== false ||
			strpos($feria_lower, 'hispack') !== false ||
			strpos($feria_lower, 'alimentaria') !== false
		) {
			$key = 'barcelona';
		} elseif (
			strpos($feria_lower, 'bilbao') !== false ||
			strpos($feria_lower, 'bec') !== false ||
			strpos($feria_lower, 'biemh') !== false ||
			strpos($feria_lower, 'sinaval') !== false
		) {
			$key = 'bilbao';
		} elseif (
			strpos($feria_lower, 'valencia') !== false ||
			strpos($feria_lower, 'cevisama') !== false ||
			strpos($feria_lower, 'habitat') !== false
		) {
			$key = 'valencia';
		} elseif (
			strpos($feria_lower, 'zaragoza') !== false ||
			strpos($feria_lower, 'fima') !== false ||
			strpos($feria_lower, 'smagua') !== false
		) {
			$key = 'zaragoza';
		} elseif (
			strpos($feria_lower, 'sevilla') !== false ||
			strpos($feria_lower, 'fibes') !== false ||
			strpos($feria_lower, 'sicab') !== false
		) {
			$key = 'sevilla';
		} elseif (
			strpos($feria_lower, 'lisboa') !== false ||
			strpos($feria_lower, 'oporto') !== false ||
			strpos($feria_lower, 'porto') !== false ||
			strpos($feria_lower, 'fil') !== false ||
			strpos($feria_lower, 'exponor') !== false
		) {
			$key = 'portugal';
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
			$key = 'internacional';
		}

		$t_array = isset($comments[$key]) ? $comments[$key] : $comments['generico'];
		$text = isset($t_array[$lang]) ? $t_array[$lang] : $t_array['es'];
		
		return str_replace('{feria}', $feria_name, $text);
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
	$form_descripcion          = post_value('form_descripcion');

	// Clasificación de feria y cálculo del presupuesto estimado mínimo
	$feria_lower = mb_strtolower($form_feria, 'UTF-8');
	$multiplier = 400; // Por defecto peninsular
	$region = 'Peninsular';
	
	if (
		strpos($feria_lower, 'extremadura') !== false ||
		strpos($feria_lower, 'badajoz') !== false ||
		strpos($feria_lower, 'caceres') !== false ||
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
		strpos($feria_lower, 'ifema') !== false
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

	$inserted_id = 0;
	if ($db) {
		try {
			$query      = "INSERT INTO `presupuestos` SET nombre = ?, empresa = ?, tlf = ?, email = ?, feria = ?, localizacion = ?, metros = ?, presupuesto = ?, descripcion = ?, opciones = ?, respuesta_enviada = ?";
			$parameters = array($form_nombre, $form_empresa, $form_tlf, $form_email, $form_feria, $form_localizacion, $form_metros, $form_presupuesto, $form_descripcion, $form_opciones, $form_respuesta);
			$statement  = $db->prepare($query);
			$statement->execute($parameters);
			$inserted_id = $db->lastInsertId();
		} catch (Exception $e) {
			// Ignore DB insert error
		}
	}

	/*____________________SCRIPT MAIL (INTERACTIVE PRE-SELECTION)________________________*/
	$token = md5($inserted_id . $form_email . 'StandarteBudgetSelectionSalt');
	$link_yes = "https://standarte.es/presupuesto-filtro.php?id=" . $inserted_id . "&token=" . $token . "&action=yes&lang=" . $form_lang;
	$link_no = "https://standarte.es/presupuesto-filtro.php?id=" . $inserted_id . "&token=" . $token . "&action=no&lang=" . $form_lang;

	$metros_num = (int)$form_metros;
	if ($metros_num <= 0) {
		$metros_num = 50; // Fallback default
	}

	$localizacion_lower = mb_strtolower($form_localizacion, 'UTF-8');
	if (strpos($localizacion_lower, 'madrid') !== false || strpos($localizacion_lower, 'ifema') !== false) {
		$precio_m2 = 320;
	} elseif (strpos($localizacion_lower, 'barcelona') !== false || strpos($localizacion_lower, 'fira') !== false) {
		$precio_m2 = 350;
	} elseif (strpos($localizacion_lower, 'bilbao') !== false || strpos($localizacion_lower, 'bec') !== false) {
		$precio_m2 = 300;
	} elseif (strpos($localizacion_lower, 'valencia') !== false || strpos($localizacion_lower, 'feria valencia') !== false) {
		$precio_m2 = 280;
	} elseif (strpos($localizacion_lower, 'zaragoza') !== false) {
		$precio_m2 = 270;
	} elseif (strpos($localizacion_lower, 'sevilla') !== false) {
		$precio_m2 = 260;
	} elseif (
		strpos($localizacion_lower, 'portugal') !== false || 
		strpos($localizacion_lower, 'lisboa') !== false || 
		strpos($localizacion_lower, 'porto') !== false || 
		strpos($localizacion_lower, 'oporto') !== false
	) {
		$precio_m2 = 320;
	} elseif (
		strpos($localizacion_lower, 'alemania') !== false || strpos($localizacion_lower, 'germany') !== false ||
		strpos($localizacion_lower, 'francia') !== false || strpos($localizacion_lower, 'france') !== false ||
		strpos($localizacion_lower, 'italia') !== false || strpos($localizacion_lower, 'italy') !== false ||
		strpos($localizacion_lower, 'londres') !== false || strpos($localizacion_lower, 'london') !== false ||
		strpos($localizacion_lower, 'paris') !== false || strpos($localizacion_lower, 'milan') !== false ||
		strpos($localizacion_lower, 'dusseldorf') !== false || strpos($localizacion_lower, 'frankfurt') !== false ||
		strpos($localizacion_lower, 'munich') !== false || strpos($localizacion_lower, 'belgica') !== false ||
		strpos($localizacion_lower, 'holanda') !== false || strpos($localizacion_lower, 'netherlands') !== false ||
		strpos($localizacion_lower, 'internacional') !== false || strpos($localizacion_lower, 'abroad') !== false ||
		strpos($localizacion_lower, 'extranjero') !== false
	) {
		$precio_m2 = 450;
	} else {
		$precio_m2 = 250;
	}

	$calculo_presupuesto = $metros_num * $precio_m2;
	$calculo_formateado = number_format($calculo_presupuesto, 0, ',', '.') . ' €';

	$fair_comment = get_fair_comment($form_feria, $form_lang);

	$interactive_emails = array(
		'es' => array(
			'subject' => 'Solicitud de presupuesto recibida - Standarte',
			'greeting' => 'Hola <strong>{nombre}</strong>,',
			'intro' => 'Gracias por tu interés en Standarte para vuestra participación en la feria <strong>{feria}</strong>.',
			'schedule' => 'Para garantizar el máximo nivel de detalle, la calidad técnica y el rigor creativo en cada stand tridimensional que desarrollamos, y con el fin de no saturar el calendario de trabajo de nuestro equipo creativo, llevamos a cabo un proceso de selección previa de las solicitudes recibidas.',
			'ask' => 'Para una superficie de <strong>{metros} m²</strong> en esta feria, estimamos que el coste mínimo viable de diseño, fabricación y montaje de un stand de carpintería a medida premium se sitúa en torno a los <strong>{calculo}</strong>.',
			'question' => '¿Dispone vuestra empresa de un presupuesto estimado superior a esta cifra?',
			'btn_yes' => 'Sí, es superior',
			'btn_no' => 'No, es inferior',
			'closing' => 'Atentamente,<br><strong>El Equipo de Standarte</strong><br>info@standarte.es | +34 637 894 819'
		),
		'en' => array(
			'subject' => 'Budget request received - Standarte',
			'greeting' => 'Hello <strong>{nombre}</strong>,',
			'intro' => 'Thank you for your interest in Standarte for your participation in the <strong>{feria}</strong> exhibition.',
			'schedule' => 'To guarantee the highest level of detail, technical quality, and creative rigor in every three-dimensional stand we develop, and to avoid saturating our creative team\'s workflow, we carry out a pre-selection process for the requests received.',
			'ask' => 'For an area of <strong>{metros} m²</strong> at this fair, we estimate that the minimum viable cost for design, manufacturing, and assembly of a premium custom wooden stand is around <strong>{calculo}</strong>.',
			'question' => 'Does your company have an estimated budget higher than this figure?',
			'btn_yes' => 'Yes, it is higher',
			'btn_no' => 'No, it is lower',
			'closing' => 'Best regards,<br><strong>The Standarte Team</strong><br>info@standarte.es | +34 637 894 819'
		),
		'pt' => array(
			'subject' => 'Pedido de orçamento recebido - Standarte',
			'greeting' => 'Olá <strong>{nombre}</strong>,',
			'intro' => 'Agradecemos o seu interesse na Standarte para a sua participação na feira <strong>{feria}</strong>.',
			'schedule' => 'Para garantir o máximo nível de detalhe, qualidade técnica e rigor criativo em cada stand tridimensional que desenvolvemos, e de forma a não saturar o calendário de trabalho da nossa equipa criativa, realizamos um processo de seleção prévia dos pedidos recebidos.',
			'ask' => 'Para uma área de <strong>{metros} m²</strong> nesta feira, estimamos que o custo mínimo viável de design, fabrico e montagem de um stand de madeira personalizado premium seja de cerca de <strong>{calculo}</strong>.',
			'question' => 'A sua empresa dispõe de um orçamento estimado superior a este valor?',
			'btn_yes' => 'Sim, é superior',
			'btn_no' => 'Não, é inferior',
			'closing' => 'Atenciosamente,<br><strong>A Equipa da Standarte</strong><br>info@standarte.es | +34 637 894 819'
		),
		'de' => array(
			'subject' => 'Budgetanfrage erhalten - Standarte',
			'greeting' => 'Hallo <strong>{nombre}</strong>,',
			'intro' => 'Vielen Dank für Ihr Interesse an Standarte für Ihre Teilnahme an der Messe <strong>{feria}</strong>.',
			'schedule' => 'Um ein Höchstmaß an Detailgenauigkeit, technischer Qualität und kreativer Präzision bei jedem von uns entwickelten dreidimensionalen Messestand zu gewährleisten und die Arbeitsauslastung unseres Designteams nicht zu überlasten, führen wir eine Vorauswahl der eingegangenen Anfragen durch.',
			'ask' => 'Für eine Fläche von <strong>{metros} m²</strong> auf dieser Messe schätzen wir die Mindestkosten für Design, Herstellung und Montage eines hochwertigen, maßgeschneiderten Holzstands auf ca. <strong>{calculo}</strong>.',
			'question' => 'Verfügt Ihr Unternehmen über ein geschätztes Budget, das über diesem Betrag liegt?',
			'btn_yes' => 'Ja, es ist höher',
			'btn_no' => 'Nein, es ist niedriger',
			'closing' => 'Mit freundlichen Grüßen,<br><strong>Ihr Standarte-Team</strong><br>info@standarte.es | +34 637 894 819'
		),
		'fr' => array(
			'subject' => 'Demande de budget reçue - Standarte',
			'greeting' => 'Bonjour <strong>{nombre}</strong>,',
			'intro' => 'Nous vous remercions de votre intérêt pour Standarte concernant votre participation au salon <strong>{feria}</strong>.',
			'schedule' => 'Afin de garantir le plus haut niveau de détail, de qualité technique et de rigueur créative pour chaque stand tridimensionnel que nous développons, et afin de ne pas surcharger le planning de travail de notre équipe créative, nous effectuons une sélection préalable des demandes reçues.',
			'ask' => 'Pour une surface de <strong>{metros} m²</strong> sur ce salon, nous estimons que le coût minimum viable pour la conception, la fabrication et le montage d\'un stand premium en bois sur mesure se situe autour de <strong>{calculo}</strong>.',
			'question' => 'Votre entreprise dispose-t-elle d\'un budget estimé supérieur à ce montant ?',
			'btn_yes' => 'Oui, il est supérieur',
			'btn_no' => 'Non, il est inférieur',
			'closing' => 'Cordialement,<br><strong>L\'Équipe Standarte</strong><br>info@standarte.es | +34 637 894 819'
		)
	);

	$t = isset($interactive_emails[$form_lang]) ? $interactive_emails[$form_lang] : $interactive_emails['en'];

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
			<p>" . str_replace('{nombre}', $form_nombre, $t['greeting']) . "</p>
			<p>" . str_replace('{feria}', $form_feria, $t['intro']) . "</p>
			<p>" . $fair_comment . "</p>
			<p>" . $t['schedule'] . "</p>
			<p>" . str_replace(array('{metros}', '{calculo}'), array($form_metros, $calculo_formateado), $t['ask']) . "</p>
			<p style='font-weight: 600; margin-top: 25px; text-align: center;'>" . $t['question'] . "</p>
			
			<div style='text-align: center; margin: 30px 0;'>
				<a href='" . $link_yes . "' style='display: inline-block; background-color: #ffc800; color: #000000; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 30px; margin: 5px 10px; box-shadow: 0 4px 10px rgba(255,200,0,0.3);'> " . $t['btn_yes'] . " </a>
				<a href='" . $link_no . "' style='display: inline-block; background-color: #f1f3f5; color: #495057; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 30px; margin: 5px 10px; border: 1px solid #dee2e6;'> " . $t['btn_no'] . " </a>
			</div>
			
			<p style='margin-top: 30px; border-top: 1px dotted #dee2e6; padding-top: 20px;'>" . $t['closing'] . "</p>
		</div>
		<div style='margin-top: 20px; text-align: center; font-size: 12px; color: #6c757d;'>
			<p>" . $pie_email . "</p>
		</div>
	</body>
	</html>";

	require_once("presupuesto_form_object.php");
	$messageDetails = array();
	$messageDetails["message_subject"] = $t['subject'];
	$messageDetails["to_email"] = $form_email;
	$messageDetails["from_name"] = "Standarte";
	$messageDetails["from_email"] = "info@standarte.es";
	$messageDetails["reply_to_name"] = "Standarte";
	$messageDetails["reply_to_email"] = "info@standarte.es";
	$messageDetails["message_body"] = $email_html;

	$invitationEmail = new InvitationEmail();
	$invitationEmail->sendEmailMessage($messageDetails);
	/*____________________FIN SCRIPT MAIL________________________*/
            


            $output['error'] = 'success';
            $output['msg']   = $mail_text['success']; 

}
    echo json_encode($output);
