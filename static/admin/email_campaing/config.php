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
                    'intro' => 'Sejamos realistas: num pavilhão cheio de ruído visual, a maioria dos stands passa despercebida. Para {EMPRESA}, projetamos e fabricamos stands sob medida que transmitem máxima qualidade y solidez diferenciada.',
                    'body' => 'Nossos carpinteiros especializados garantem acabamentos impecáveis. Cuidamos de todo o processo de engenharia, fabricação y montagem para que {EMPRESA} sea o centro de todas as atenções.',
                    'cta' => 'DISEÑAR MI STAND'
                )
            ),
            'images' => array(
                array('src' => 'img/trabajos/trabajos_promueve/cabecera-proyecto-emo-milano-2021-2.jpg', 'alt' => 'Stand premium de madera natural y acabados de carpintería artesanal'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.jpg', 'alt' => 'Stand con lamas de madera y fachadas para reuniones de negocios')
            )
        ),
        'stands_textil' => array(
            'label' => 'Stands Textiles',
            'subject' => '¿Dejará {EMPRESA} que sus competidores brillen más en su próxima feria?',
            'preheader' => 'Estructuras de aluminio con telas tensadas premium e iluminación LED.',
            'headline' => '{EMPRESA}: Multiplique sus reuniones comerciales e impacte a sus clientes potenciales',
            'intro' => 'En cualquier pabellón, la iluminación y la limpieza visual marcan la diferencia entre atraer clientes o ser invisibles. Nuestros stands textiles con cajas de luz LED de alta intensidad garantizan que la marca {EMPRESA} brille por encima de las demás.',
            'body' => 'Son la opción perfecta para ferias internacionales por su peso optimizado, transporte eficiente y montaje rápido. Su acabado pulcro y luz impecable aseguran que nadie pase de largo ante {EMPRESA}.',
            'cta' => 'QUIERO QUE MI MARCA BRILLE EN LA FERIA',
            'translations' => array(
                'en' => array(
                    'subject' => 'Will {EMPRESA} let competitors outshine your brand at the show?',
                    'preheader' => 'Aluminum structures with premium tension fabrics and LED lighting.',
                    'headline' => '{EMPRESA}: Multiply your business meetings and captivate your target audience',
                    'intro' => 'In any exhibition hall, premium lighting and visual clarity make the absolute difference between attracting leads or being invisible. Our LED backlit textile stands guarantee that the {EMPRESA} brand shines above all else.',
                    'body' => 'They are the perfect choice for international trade shows due to optimized weight, efficient shipping, and lightning-fast assembly. Their clean finish and flawless lighting ensure nobody walks past {EMPRESA}.',
                    'cta' => 'I WANT MY BRAND TO SHINE AT THE SHOW'
                ),
                'de' => array(
                    'subject' => 'Wird {EMPRESA} zulassen, dass die Konkurrenz auf der Messe heller glänzt?',
                    'preheader' => 'Aluminiumstrukturen mit Premium-Spanngewebe und LED-Beleuchtung.',
                    'headline' => '{EMPRESA}: Vervielfachen Sie Ihre Geschäftstreffen und begeistern Sie Ihre Kunden',
                    'intro' => 'In jeder Halle machen Beleuchtung und visuelle Klarheit den Unterschied aus, ob Sie Kunden anziehen oder unsichtbar sind. Unsere Textilmessestände mit LED-Leuchtkästen garantieren, dass {EMPRESA} heller strahlt.',
                    'body' => 'Dank Ihres optimierten Gewichts und schnellen Aufbaus sind sie ideal für internationale Messen. Ihr sauberes Finish sorgt dafür, dass niemand an {EMPRESA} vorbeigeht.',
                    'cta' => 'TEXTILMESSESTAND-ANGEBOT ANFORDERN'
                ),
                'pt' => array(
                    'subject' => 'Deixará que a concorrência de {EMPRESA} brilhe mais na sua próxima feira?',
                    'preheader' => 'Estruturas de alumínio com tecidos tensionados premium e iluminação LED.',
                    'headline' => '{EMPRESA}: Multiplique as suas reuniões comerciales e impacte os seus clientes',
                    'intro' => 'Em qualquer pavilhão, a iluminação e a limpieza visual marcam a diferença. Nossos stands têxteis com caixas de luz LED de alta intensidad garantem que a marca {EMPRESA} se destaque de forma inigualável.',
                    'body' => 'São a escolha perfeita para feiras internacionais devido ao peso reduzido y montagem rápida. Seu acabamento limpo assegura que todos parem para ver {EMPRESA}.',
                    'cta' => 'QUERO DESTACAR A MINHA MARCA NA FEIRA'
                )
            ),
            'images' => array(
                array('src' => 'img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-2.jpg', 'alt' => 'Stand textil de gran formato con cajas de luz y branding corporativo'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-2016-biemh-emuge-4.jpg', 'alt' => 'Stand de diseño con elementos suspendidos retroiluminados')
            )
        ),
        'stands_diseno' => array(
            'label' => 'Stands de Diseño Premium',
            'subject' => 'El gran reto de {EMPRESA} en la feria: ¿Su stand actual realmente atrae clientes?',
            'preheader' => 'Proyectos a medida 100% fieles a su prototipo 3D interactivo.',
            'headline' => '{EMPRESA}: Revolucione su presencia en feria y eclipse por completo a sus rivales',
            'intro' => 'No malgaste su presupuesto en un stand convencional. Diseñamos espacios corporativos exclusivos pensados para rentabilizar al máximo la presencia de {EMPRESA}, convirtiendo el espacio físico en un generador real de contactos y ventas.',
            'body' => 'Desde el modelado 3D fidedigno al resultado final hasta el catering y la logística. Nos encargamos de todo de principio a fin para que el equipo de {EMPRESA} solo tenga que presentarse a vender y cerrar acuerdos de alto valor.',
            'cta' => 'DISEÑAR MI STAND',
            'translations' => array(
                'en' => array(
                    'subject' => 'The ultimate challenge for {EMPRESA}: Does your stand actually convert visitors?',
                    'preheader' => 'Tailored projects 100% faithful to your interactive 3D prototype.',
                    'headline' => '{EMPRESA}: Revolutionize your exhibition presence and completely eclipse your rivals',
                    'intro' => 'Don\'t waste your budget on a generic, boring stand. We design exclusive corporate spaces designed to maximize {EMPRESA}\'s trade show ROI, turning physical square meters into real customer magnets.',
                    'body' => 'From fidedign 3D modeling matching the final outcome to catering and full logistics. We manage everything from start to finish, so the {EMPRESA} team only needs to show up, pitch, and sign deals.',
                    'cta' => 'ACCEPT CHALLENGE AND DESIGN MY BESPOKE STAND'
                ),
                'de' => array(
                    'subject' => 'Die Herausforderung für {EMPRESA}: Zieht Ihr Stand wirklich Kunden an?',
                    'preheader' => 'Maßgeschneiderte Projekte, die zu 100 % Ihrem interaktiven 3D-Prototyp entsprechen.',
                    'headline' => '{EMPRESA}: Revolutionieren Sie Ihre Messepräsenz und stellen Sie die Konkurrenz in den Schatten',
                    'intro' => 'Verschwenden Sie Ihr Budget nicht für einen Standard-Messestand. Wir entwerfen exklusive Stände, die darauf ausgelegt sind, den ROI von {EMPRESA} zu maximieren und echte Leads zu generieren.',
                    'body' => 'Vom präzisen 3D-Modell bis hin zur kompletten Logistik. Wir kümmern uns um alles für {EMPRESA}, damit Sie am ersten Tag nur noch verkaufen müssen.',
                    'cta' => 'MASSESTAND-ANGEBOT ANFORDERN'
                ),
                'pt' => array(
                    'subject' => 'O grande desafio de {EMPRESA} na feira: O seu stand atual atrai clientes reais?',
                    'preheader' => 'Projetos sob medida 100% fiéis ao seu protótipo 3D interativo.',
                    'headline' => '{EMPRESA}: Revolucione a sua presença na feira e eclipse completamente os seus rivais',
                    'intro' => 'Não desperdice o seu orçamento num stand convencional. Projetamos stands corporativos exclusivos desenhados para rentabilizar ao máximo a presença de {EMPRESA}, convertendo o espaço físico num íman de leads.',
                    'body' => 'Do modelado 3D fidedigno ao catering e logística. Cuidamos de tudo de ponta a ponta para que {EMPRESA} só tenha de se focar em vender e fechar negócios de alto valor.',
                    'cta' => 'ACEITAR O DESAFIO E DESENHAR O MEU STAND'
                )
            ),
            'images' => array(
                array('src' => 'img/trabajos/trabajos_promueve/mg-1225.jpg', 'alt' => 'Stand de diseño exclusivo premium con accesibilidad total'),
                array('src' => 'img/trabajos/trabajos_promueve/stand-cun-fitur3.jpg', 'alt' => 'Stand de diseño sobrio corporativo para marcas de prestigio')
            )
        )
    )
);
