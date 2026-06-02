<?php

return array(
    'site_url' => 'https://standarte.es',
    'from_email' => 'promo@standarte.es',
    'from_name' => 'Standarte',
    'reply_to' => 'promo@standarte.es',
    'envelope_sender' => 'promo@standarte.es',
    'smtp' => array(
        'enabled' => true,
        'host' => 'ssl0.ovh.net',
        'port' => 587,
        'encryption' => 'tls',
        'username' => 'promo@standarte.es',
        'password' => getenv('STANDARTE_SMTP_PASSWORD') ? getenv('STANDARTE_SMTP_PASSWORD') : 'Extrategia37',
        'timeout' => 20
    ),
    'phone' => '+34 613 097 148',
    'login_password_hash' => '$2y$10$mzzI3Iz2LFkNoYgXrqRvO.iUzdJAO1Qy8qfBPY/QRk3BPqKKRN8mG',
    'languages' => array(
        'es' => array('label' => 'Español', 'html' => 'es'),
        'en' => array('label' => 'English', 'html' => 'en'),
        'de' => array('label' => 'Deutsch', 'html' => 'de'),
        'pt' => array('label' => 'Português', 'html' => 'pt'),
        'zh' => array('label' => '中文', 'html' => 'zh'),
        'hi' => array('label' => 'हिन्दी', 'html' => 'hi')
    ),
    'footer_text' => array(
        'es' => 'Si desea más información, responda a este correo o contacte en',
        'en' => 'For more information, please reply to this email or contact us at',
        'de' => 'Für weitere Informationen antworten Sie bitte auf diese E-Mail o. kontaktieren Sie uns unter',
        'pt' => 'Se desejar mais informações, responda a este email o. contacte pelo',
        'zh' => '如需更多信息，请回复此邮件或联系我们：',
        'hi' => 'अधिक जानकारी के लिए, कृपया इस ईमेल का उत्तर दें या संपर्क करें'
    ),
    'categories' => array(
        'stands_madera' => array(
            'label' => 'Stands de Madera',
            'subject' => '¿Está {EMPRESA} preparada para liderar su próxima feria o pasará desapercibida?',
            'preheader' => 'Soluciones exclusivas de diseño y acabados artesanales de alta calidad.',
            'headline' => 'Con nosotros de su lado {EMPRESA} se convertirá en el centro de todas las miradas',
            'intro' => 'En un pabellón saturado de ruido visual, la mayoría de los stands pasan desapercibidos. En Standarte, diseñamos y fabricamos stands basados en la psicología de la atención dirigidos a proyectar una imagen diferenciadora y equilibrada.',
            'body' => 'Nuestros carpinteros especializados logran acabados perfectos. Nos encargamos de toda la ingeniería, fabricación y montaje para que el proyecto de {EMPRESA} sea el centro de todas las miradas.',
            'cta' => 'DISEÑAR MI STAND',
            'translations' => array(
                'en' => array(
                    'subject' => 'Is {EMPRESA} ready to dominate the show, or will you blend in?',
                    'preheader' => 'Exclusive bespoke solutions and premium handcrafted finishes.',
                    'headline' => '{EMPRESA}: Lead your market and become the absolute center of attention',
                    'intro' => 'Let\'s be honest: in an exhibition hall filled with visual noise, most stands are completely ignored. For {EMPRESA}, we design and build bespoke stands that project maximum quality, brand authority, and visual balance.',
                    'body' => 'Our specialized master craftsmen deliver flawless finishes. We handle the entire engineering, manufacturing, and setup process, making {EMPRESA} the absolute center of attention.',
                    'cta' => 'DISEÑAR MI STAND'
                ),
                'de' => array(
                    'subject' => 'Ist {EMPRESA} bereit, die Messe zu dominieren, oder gehen Sie unter?',
                    'preheader' => 'Exklusive maßgeschneiderte Lösungen und handgefertigte Oberflächen.',
                    'headline' => '{EMPRESA}: Führen Sie Ihren Markt an und stehen Sie im Rampenlicht',
                    'intro' => 'Seien wir ehrlich: In einer Messehalle voller visuellem Lärm gehen die meisten Stände unter. Für {EMPRESA} entwerfen und fertigen wir exklusive Messestände, die Qualität, Stärke und optische Balance ausstrahlen.',
                    'body' => 'Unsere spezialisierten Handwerker erzielen makellose Ergebnisse. Wir übernehmen den gesamten Engineering-, Fertigungs- und Montageprozess für {EMPRESA}.',
                    'cta' => 'DISEÑAR MI STAND'
                ),
                'pt' => array(
                    'subject' => 'Está a {EMPRESA} pronta para liderar a sua próxima feira ou passará despercebida?',
                    'preheader' => 'Soluções exclusivas e acabamentos artesanais de alta qualidade.',
                    'headline' => '{EMPRESA}: Lidere o seu setor e torne-se o centro de todas as atenções',
                    'intro' => 'Sejamos realistas: num pavilhão cheio de ruído visual, a maioria dos stands passa despercebida. Para {EMPRESA}, projetamos e fabricamos stands sob medida que transmitem máxima qualidade e solidez diferenciada.',
                    'body' => 'Nossos carpinteiros especializados garantem acabamentos impecáveis. Cuidamos de todo o processo de engenharia, fabricação e montagem para que {EMPRESA} sea o centro de todas as atenções.',
                    'cta' => 'DISEÑAR MI STAND'
                )
            ),
            'images' => array(
                array('src' => 'img/trabajos/trabajos_promueve/cabecera-proyecto-emo-milano-2021-2.jpg', 'alt' => 'Stand premium de madera natural y acabados de carpintería artesanal'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.jpg', 'alt' => 'Stand con lamas de madera y fachadas para reuniones de negocios'),
                array('src' => 'img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-2.jpg', 'alt' => 'Stand textil de gran formato con cajas de luz y branding corporativo'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-2016-biemh-emuge-4.jpg', 'alt' => 'Stand de diseño con elementos suspendidos retroiluminados'),
                array('src' => 'img/trabajos/trabajos_promueve/mg-1225.jpg', 'alt' => 'Stand de diseño exclusivo premium con accesibilidad total'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-cun-fitur3.jpg', 'alt' => 'Stand de diseño sobrio corporativo para marcas de prestigio')
            )
        )
    )
);
