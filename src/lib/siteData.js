import { fairsData } from '$lib/fairsData.js';
export const languages = ['es', 'en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko', 'ja'];

export const languageLabels = {
  es: 'ES Español',
  en: 'EN English',
  de: 'DE Deutsch',
  zh: '中文',
  hi: 'HI हिन्दी',
  pt: 'PT Português',
  fr: 'FR Français',
  it: 'IT Italiano',
  ko: 'KO 한국어',
  ja: 'JA 日本語'
};

export const routes = {
  es: {
    home: '',
    services: 'servicios',
    luzpavilion: 'luzpavilion',
    custom: 'proyectos_a_medida',
    team: 'equipo',
    contact: 'contacto',
    madrid: 'construccion_stands_madrid',
    barcelona: 'construccion_stands_barcelona',
    bilbao: 'construccion_stands_bilbao',
    lisboa: 'construccion_stands_lisboa',
    malaga: 'construccion_stands_malaga',
    badajoz: 'construccion_stands_badajoz',
    sevilla: 'construccion_stands_sevilla',
    ciudad_real: 'construccion_stands_ciudad_real',
    montaje_zafra: 'montaje_stand_zafra',
    montaje_don_benito: 'montaje_stand_don_benito',
    montaje_badajoz: 'montaje_stand_badajoz',
    noticias: 'noticias',
    ferias: 'ferias'
  },
  en: {
    home: '',
    services: 'services',
    luzpavilion: 'luzpavilion',
    custom: 'custom_projects',
    team: 'team',
    contact: 'contact',
    madrid: 'stand_construction_madrid',
    barcelona: 'stand_construction_barcelona',
    bilbao: 'stand_construction_bilbao',
    lisboa: 'stand_construction_lisbon',
    malaga: 'stand_construction_malaga',
    badajoz: 'stand_construction_badajoz',
    sevilla: 'stand_construction_seville',
    ciudad_real: 'stand_construction_ciudad_real',
    montaje_zafra: 'exhibition_stand_assembly_zafra',
    montaje_don_benito: 'exhibition_stand_assembly_don_benito',
    montaje_badajoz: 'exhibition_stand_assembly_badajoz',
    noticias: 'news',
    ferias: 'fairs'
  },
  de: {
    home: '',
    services: 'dienstleistungen',
    luzpavilion: 'luzpavilion',
    custom: 'massgeschneiderte_projekte',
    team: 'team',
    contact: 'kontakt',
    madrid: 'messestandbau_madrid',
    barcelona: 'messestandbau_barcelona',
    bilbao: 'messestandbau_bilbao',
    lisboa: 'messestandbau_lissabon',
    malaga: 'messestandbau_malaga',
    badajoz: 'messestandbau_badajoz',
    sevilla: 'messestandbau_sevilla',
    ciudad_real: 'messestandbau_ciudad_real',
    montaje_zafra: 'messestandmontage_zafra',
    montaje_don_benito: 'messestandmontage_don_benito',
    montaje_badajoz: 'messestandmontage_badajoz',
    noticias: 'nachrichten',
    ferias: 'messen'
  },
  zh: {
    home: '',
    services: 'fuwu',
    luzpavilion: 'luzpavilion',
    custom: 'dingzhi_xiangmu',
    team: 'tuandui',
    contact: 'lianxi',
    madrid: 'madrid_zhantai_dajian',
    barcelona: 'barcelona_zhantai_dajian',
    bilbao: 'bilbao_zhantai_dajian',
    lisboa: 'lisbon_zhantai_dajian',
    malaga: 'malaga_zhantai_dajian',
    badajoz: 'badajoz_zhantai_dajian',
    sevilla: 'sevilla_zhantai_dajian',
    ciudad_real: 'ciudad_real_zhantai_dajian',
    montaje_zafra: 'zafra_zhantai_dajian',
    montaje_don_benito: 'don_benito_zhantai_dajian',
    montaje_badajoz: 'badajoz_zhantai_dajian_montaje',
    noticias: 'xinwen',
    ferias: 'zhanhui'
  },
  hi: {
    home: '',
    services: 'sevaen',
    luzpavilion: 'luzpavilion',
    custom: 'custom_projects',
    team: 'team',
    contact: 'sampark',
    madrid: 'madrid_stand_nirman',
    barcelona: 'barcelona_stand_nirman',
    bilbao: 'bilbao_stand_nirman',
    lisboa: 'lisbon_stand_nirman',
    malaga: 'malaga_stand_nirman',
    badajoz: 'badajoz_stand_nirman',
    sevilla: 'sevilla_stand_nirman',
    ciudad_real: 'ciudad_real_stand_nirman',
    montaje_zafra: 'zafra_stand_nirman',
    montaje_don_benito: 'don_benito_stand_nirman',
    montaje_badajoz: 'badajoz_stand_nirman_montaje',
    noticias: 'samachar',
    ferias: 'mele'
  },
  pt: {
    home: '',
    services: 'servicos',
    luzpavilion: 'luzpavilion',
    custom: 'projetos_a_medida',
    team: 'equipa',
    contact: 'contacto',
    madrid: 'construcao_stands_madrid',
    barcelona: 'construcao_stands_barcelona',
    bilbao: 'construcao_stands_bilbao',
    lisboa: 'construcao_stands_lisboa',
    malaga: 'construcao_stands_malaga',
    badajoz: 'construcao_stands_badajoz',
    sevilla: 'construcao_stands_sevilla',
    ciudad_real: 'construcao_stands_ciudad_real',
    montaje_zafra: 'montagem_stand_zafra',
    montaje_don_benito: 'montagem_stand_don_benito',
    montaje_badajoz: 'montagem_stand_badajoz',
    noticias: 'noticias',
    ferias: 'feiras'
  },
  fr: {
    home: '',
    services: 'services',
    luzpavilion: 'luzpavilion',
    custom: 'projets_sur_mesure',
    team: 'equipe',
    contact: 'contact',
    madrid: 'construction_stands_madrid',
    barcelona: 'construction_stands_barcelone',
    bilbao: 'construction_stands_bilbao',
    lisboa: 'construction_stands_lisbonne',
    malaga: 'construction_stands_malaga',
    badajoz: 'construction_stands_badajoz',
    sevilla: 'construction_stands_seville',
    ciudad_real: 'construction_stands_ciudad_real',
    montaje_zafra: 'montage_stands_zafra',
    montaje_don_benito: 'montage_stands_don_benito',
    montaje_badajoz: 'montage_stands_badajoz',
    noticias: 'actualites',
    ferias: 'salons'
  },
  it: {
    home: '',
    services: 'servizi',
    luzpavilion: 'luzpavilion',
    custom: 'progetti_su_misura',
    team: 'squadra',
    contact: 'contatto',
    madrid: 'allestimenti_fieristici_madrid',
    barcelona: 'allestimenti_fieristici_barcellona',
    bilbao: 'allestimenti_fieristici_bilbao',
    lisboa: 'allestimenti_fieristici_lisbona',
    malaga: 'allestimenti_fieristici_malaga',
    badajoz: 'allestimenti_fieristici_badajoz',
    sevilla: 'allestimenti_fieristici_sevilla',
    ciudad_real: 'allestimenti_fieristici_ciudad_real',
    montaje_zafra: 'allestimento_stand_zafra',
    montaje_don_benito: 'allestimento_stand_don_benito',
    montaje_badajoz: 'allestimento_stand_badajoz',
    noticias: 'notizie',
    ferias: 'fiere'
  },
  ko: {
    home: '',
    services: 'jeonsigwan-seobiseu',
    luzpavilion: 'luzpavilion',
    custom: 'majchumhyeong-peurojekteu',
    team: 'tim',
    contact: 'yeollagcheo',
    madrid: 'madrid-bujeu-jejak',
    barcelona: 'barcelona-bujeu-jejak',
    bilbao: 'bilbao-bujeu-jejak',
    lisboa: 'lisbon-bujeu-jejak',
    malaga: 'malaga-bujeu-jejak',
    badajoz: 'badajoz-bujeu-jejak',
    sevilla: 'sevilla-bujeu-jejak',
    ciudad_real: 'ciudad_real-bujeu-jejak',
    montaje_zafra: 'zafra-bujeu-jejak',
    montaje_don_benito: 'don-benito-bujeu-jejak',
    montaje_badajoz: 'badajoz-bujeu-jejak-montaje',
    noticias: 'sosig',
    ferias: 'jeonsihoe'
  },
  ja: {
    home: '',
    services: 'tenjikai-service',
    luzpavilion: 'luzpavilion',
    custom: 'tokuchu-project',
    team: 'team',
    contact: 'otoiawase',
    madrid: 'madrid-stand-seisaku',
    barcelona: 'barcelona-stand-seisaku',
    bilbao: 'bilbao-stand-seisaku',
    lisboa: 'lisbon-stand-seisaku',
    malaga: 'malaga-stand-seisaku',
    badajoz: 'badajoz-stand-seisaku',
    sevilla: 'sevilla-stand-seisaku',
    ciudad_real: 'ciudad_real-stand-seisaku',
    montaje_zafra: 'zafra-stand-setsuei',
    montaje_don_benito: 'don-benito-stand-setsuei',
    montaje_badajoz: 'badajoz-stand-setsuei',
    noticias: 'news',
    ferias: 'tenjikai'
  }
};

export const copy = {
  es: {
    faqsTitle: 'Preguntas Frecuentes', successStoriesTitle: 'Casos de Éxito', featuredProjectsIntro: 'Proyectos destacados de carpintería a medida y diseño de stands:', 
    nav: { services: 'Servicios', custom: 'Galería', noticias: 'Blog', contact: 'Contacto', language: 'Idioma' },
    seoTitle: 'Standarte | Construcción de stands en España y Portugal',
    seoDescription: 'Standarte diseña, fabrica y monta stands de forma profesional y personalizada para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Ciudad Real, Lisboa y otros destinos. ¡Presupuesto en 24 H!',
    heroTitle: 'Diseño y construcción de stands internacionales',
    heroSubtitle: 'Espacios que inspiran',
    servicesTitle: 'Servicios',
    services: [
      ['Diseño e Ingeniería', 'Nuestro equipo profesional tomará nota de las necesidades de su proyecto que, con todo detalle, quedarán reflejadas en un diseño 3D personalizado que podrá explorar y revisar antes del comienzo de la fabricación. La imagen del prototipo será 100% fidedigna al resultado final.'],
      ['Construcción', 'En el proceso de construcción aplicamos las más modernas técnicas de ensamblaje con materiales especificos para el uso en construcción efímera. Esto nos permite ofrecer un aspecto impecable que demostrará calidad a primera vista.'],
      ['Montaje y validaciones', 'Nos encargamos de todo. Con total tranquilidad podrás presentarse el primer dia de feria, y lo encontrará todo listo para empezar tu labor comercial. Stand, catering, papelería,... indiferentemente si es una feria en Madrid, Fráncfort, Pekín o Chicago.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Carpas especiales para entornos únicos',
      color: 'Color',
      finish: 'Acabado:',
      descriptionTitle: 'Descripción:',
      description: 'Stand de pequeño formato compuesto por 4 cuerpos<br>Su montaje es muy sencillo; no necesita herramientas.<br>Producto acoplable libremente configurable.',
      qualitiesTitle: 'Calidades:',
      materials: 'Materiales',
      materialsValue: 'MDF, vidrio, textil arquitectónico, metal',
      finishValue: 'Pintura aerográfica + lacado',
      partsTitle: 'Partes:',
      parts: '1 = Gráfica retroiluminada <br>2 = Estantes iluminados <br>3 = Logotipo personalizado <br>4 = Almacén <br>5 = Mostrador con puertas',
      priceTitle: 'Precio:',
      priceText: 'Conjunto de 4 módulos con iluminación y <br> gráfica personalizada',
      chooseFinish: 'Elige el acabado<br>para ver el precio.',
      choose: 'Elige acabado para ver precio',
      partsLabel: 'Partes',
      price: 'Precio',
      qualities: 'Calidades',
      pause: 'PAUSA',
      play: 'REPRODUCIR',
      visitWeb: 'VISITAR WEB ESPECÍFICA',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: 'Presentaciones de empresas',
          subtitle: 'Nuestros talleres y proceso de fabricación de stands corporativos.'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Ferias en entornos históricos',
          subtitle: 'Diseño e ingeniería respetuosa en ubicaciones tradicionales e históricas.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Celebraciones',
          subtitle: 'Espacios gourmet a medida para bodegas y eventos especiales.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Ferias al aire libre de gran formato',
          subtitle: 'Montajes de gran escala y carpas premium de alta resistencia.'
        }
      ]
    },
    citiesIntro: 'Diseñamos, fabricamos y montamos stands para ferias y eventos en ciudades clave de España y Portugal.',
    customTitle: 'GALERÍA',
    customSubtitle: 'Clasificados por la técnica de montaje principal.',
    filters: { all: 'Todos', textil: 'Textil', madera: 'Madera' },
    counters: { projects: 'Proyectos', clients: 'Clientes', countries: 'Países', fairs: 'Ferias' },
    teamTitle: 'Equipo',
    teamSubtitle: 'Somos un equipo multidisciplinar, entre los que hay arquitectos, montadores, decoradores, técnico de iluminación,... Juntos podemos dar una respuesta completa a todas las necesidades de cada proyecto. No dudes en llamarnos para cualquier duda que tengas. Esperamos conocerte pronto.',
    teamRoles: ['Creatividad', 'Administrador', 'Taller', 'Coordinación'],
    contactTitle: 'PRESUPUESTO EN 24 H',
    contactNotice: 'Dinos lo que necesitáis y en un plazo de 24 horas tendremos un diseño 3D con todo lujo de detalles y una propuesta económica super-competitiva.',
    form: { name: 'Nombre', company: 'Empresa', phone: 'Teléfono', email: 'Email', fair: 'Feria', location: 'Ciudad - Pais', meters: 'Metros cuadrados', floor: 'Detalles sobre el suelo', woodFloor: 'Tarima-madera', carpetPlatform: 'Tarima-moqueta', carpet: 'Moqueta', spaceDistribution: 'Distribución de espacios', reception: 'Zona de recepción', bar: 'Zona de bar', storage: 'Almacén', product: 'Exposición de producto', openMeeting: 'Zona de reuniones abierta', closedMeeting: 'Zona de reuniones cerrada', audiovisual: 'Audiovisuales', led: 'Pantalla LED', projector: 'Proyector', budget: 'Presupuesto estimado', description: 'Descripción', privacy: 'Acepta nuestra Política de Privacidad', send: 'ENVIAR' },
    legal: { privacy: 'Política de Privacidad', legalNotice: 'Aviso Legal', cookies: 'Uso de Cookies' },
    legalText: {
      privacy: '<p>Standarte utiliza los datos enviados a través del formulario únicamente para responder a solicitudes de información, presupuestos y comunicaciones relacionadas con proyectos de stands.</p><p>No usamos estos datos para finalidades ajenas a la solicitud. Puedes pedir acceso, rectificación o supresión escribiendo a info@standarte.es.</p>',
      legalNotice: '<p>Este sitio web pertenece a Standarte. Sus contenidos, imágenes y textos tienen carácter comercial e informativo y no pueden reproducirse sin autorización.</p><p>El uso del sitio implica una navegación responsable y respetuosa con la normativa aplicable.</p>',
      cookies: '<p>Utilizamos cookies necesarias para el funcionamiento de la web y, solo con tu consentimiento, cookies de medición y publicidad vinculadas a Google Ads o Google Analytics.</p><p>Puedes aceptar, rechazar o configurar estas finalidades desde el banner de cookies. También puedes cambiar o retirar tu consentimiento en cualquier momento desde el enlace "Configurar cookies" del pie de página.</p><p>Google puede tratar datos personales para medición publicitaria y personalización cuando lo autorizas. Más información: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Mensaje enviado correctamente.<br> En breve nos pondremos en contacto.<br> Gracias.',
    formError: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.',
    projects3D: {
      title: 'Proyectos de Bajo Coste',
      subtitle: 'Explora nuestras propuestas interactivas de alta carpintería y su relación con nuestros valores de diseño.',
      viewBtn: 'Ver Proyecto'
    },
    footer: 'Standarte. Diseño, fabricación y montaje de stands.'
  },
  en: {
    faqsTitle: 'Frequently Asked Questions', successStoriesTitle: 'Success Stories', featuredProjectsIntro: 'Featured custom carpentry and exhibition stand design projects:', 
    nav: { services: 'Services', custom: 'Gallery', noticias: 'Blog', contact: 'Contact', language: 'Language' },
    seoTitle: 'Standarte | Stand builder in Spain and Portugal',
    seoDescription: 'Professional and customized design, production and installation of exhibition stands for trade fairs in Spain and international projects.',
    heroTitle: 'Stand builder workshop in Spain',
    heroSubtitle: 'high quality work',
    servicesTitle: 'Services',
    services: [
      ['Design and Engineering', 'Our professional team will take note of the needs of your project, which, in detail, will be reflected in a customized 3D prototype that you can explore and review before the start of manufacturing. The image of the prototype will be 100% faithful to the final result.'],
      ['Booth construction', 'In the construction process we apply the most modern assembly techniques with specific materials for use in ephemeral construction. This allows us to offer a flawless look that will demonstrate quality at first glance.'],
      ['Assembly and validations', 'We take care of everything. With complete peace of mind you can present yourself on the first day of the fair, and you will find everything ready to start your commercial work. Stand, catering, stationery,...']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Spatial tents for unique environments',
      color: 'Color',
      finish: 'Finish:',
      descriptionTitle: 'Description:',
      description: 'It is a small format stand composed of 4 bodies<br>Its assembly is very simple; no tools are needed.<br>Freely configurable attachable product.',
      qualitiesTitle: 'Qualities:',
      materials: 'Materials',
      materialsValue: 'MDF, glass, architectural textile, metal',
      finishValue: 'Airbrush paint + lacquer',
      partsTitle: 'Parts:',
      parts: '1 = Backlit Graphic <br>2 = Illuminated Shelves <br>3 = Custom Logo <br>4 = Storage <br>5 = Counter with doors',
      priceTitle: 'Price:',
      priceText: 'Set of 4 modules with lighting and <br> custom graphics',
      chooseFinish: 'Please choose the finish<br>to see the price.',
      choose: 'Please choose the finish<br>to see the price.',
      partsLabel: 'Parts',
      price: 'Price',
      qualities: 'Qualities',
      pause: 'PAUSE',
      play: 'PLAY',
      visitWeb: 'VISIT SPECIFIC WEBSITE',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: 'Corporate Presentations',
          subtitle: 'Our workshops and production process for corporate stands.'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Fairs in Historical Settings',
          subtitle: 'Respectful design and engineering in traditional and historical locations.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Celebrations',
          subtitle: 'Custom gourmet spaces for wineries and special events.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Large-Format Outdoor Fairs',
          subtitle: 'Large-scale setups and premium high-resistance tents.'
        }
      ]
    },
    citiesIntro: 'We design, produce and install exhibition stands for trade fairs and events in key cities across Spain and Portugal.',
    customTitle: 'GALLERY',
    customSubtitle: 'Classified by main assembly technique.',
    filters: { all: 'All', textil: 'Textile', madera: 'Wood' },
    counters: { projects: 'Projects', clients: 'Customers', countries: 'Countries', fairs: 'Fairs' },
    teamTitle: 'Team',
    teamSubtitle: 'We are a multidisciplinary team, including architects, assemblers, decorators, lighting technicians,... Together we can provide a complete response to all the needs of each project. Do not hesitate to call us for any questions you have. We hope to meet you soon.',
    teamRoles: ['Creativity', 'Administrator', 'Workshop', 'Coordination'],
    contactTitle: 'QUOTE IN 24 H',
    contactNotice: 'Tell us what you need and within 24 hours we will have a 3D design full of details and a super-competitive economic proposal.',
    form: { name: 'Name', company: 'Company', phone: 'Tlf', email: 'Email', fair: 'Fair', location: 'City - Country', meters: 'Square meter', floor: 'ground details', woodFloor: 'Wozoden raised floor', carpetPlatform: 'Raised carpet floor', carpet: 'Carpet', spaceDistribution: 'Spaces-Distribution', reception: 'Reception area', bar: 'Bar area', storage: 'Warehouse', product: 'Product exposition', openMeeting: 'Open meeting area', closedMeeting: 'Closed meeting area', audiovisual: 'Audiovisual', led: 'Led screen', projector: 'Projector', budget: 'Estimated budget', description: 'Description', privacy: 'Accept our Privacy Policy', send: 'SEND' },
    legal: { privacy: 'Privacy Policy', legalNotice: 'Legal warning', cookies: 'Cookies' },
    legalText: {
      privacy: '<p>Standarte uses the data submitted through the form only to answer information requests, quotations and communications related to exhibition stand projects.</p><p>We do not use this data for purposes unrelated to your request. You can ask for access, correction or deletion by writing to info@standarte.es.</p>',
      legalNotice: '<p>This website belongs to Standarte. Its contents, images and texts are commercial and informational and may not be reproduced without permission.</p><p>Use of the site implies responsible browsing in accordance with applicable regulations.</p>',
      cookies: '<p>We use necessary cookies for the website to work and, only with your consent, Google Ads or Google Analytics measurement and advertising cookies.</p><p>You can accept, reject or configure these purposes from the cookie banner. You can also change or withdraw consent at any time from the "Cookie settings" link in the footer.</p><p>Google may process personal data for ad measurement and personalization when you allow it. More information: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Message sent successfully.<br> We will contact you shortly.<br> Thank you.',
    formError: 'The message could not be sent. Please try again.',
    projects3D: {
      title: 'Low Cost Projects',
      subtitle: 'Explore our interactive high-carpentry proposals and their relation to our design values.',
      viewBtn: 'View Project'
    },
    footer: 'Standarte. Exhibition stand design, production and installation.'
  },
  de: {
    faqsTitle: 'Häufig gestellte Fragen', successStoriesTitle: 'Erfolgsgeschichten', featuredProjectsIntro: 'Ausgewählte Projekte für maßgeschneiderte Tischlerei und Messestanddesign:', 
    nav: { services: 'Dienstleistungen', custom: 'Galerie', noticias: 'Blog', contact: 'Kontakt', language: 'Sprache' },
    seoTitle: 'Standarte | Messestand Design und Bau',
    seoDescription: 'Design, Produktion und Montage von Messeständen für Spanien und internationale Projekte.',
    heroTitle: 'Standbauer-Workshop in Spanien',
    heroSubtitle: 'Arbeiten von hoher Qualität',
    servicesTitle: 'Dienstleistungen',
    services: [
      ['Design und Ingenieurwesen', 'Unser Team wird die Bedürfnisse Ihres Projekts im Detail notieren, die sich in einem 3D-Prototypen widerspiegeln werden, den Sie vor Beginn der Fertigung erkunden und überprüfen können. Das Bild des Prototyps wird zu 100% dem endgültigen Ergebnis entsprechen.'],
      ['Messestandbau', 'Im Bauprozess wenden wir die modernsten Montagetechniken mit speziellen Materialien für den Einsatz im ephemeren Bau an. Dies ermöglicht uns, ein makelloses Aussehen zu bieten, das Qualität auf den ersten Blick zeigt.'],
      ['Montage und Validierungen', 'Wir kümmern uns um alles. Mit vollkommener Ruhe können Sie sich am ersten Tag der Messe präsentieren, und Sie finden alles bereit, um Ihre geschäftliche Arbeit zu beginnen. Stand, Catering, Büromaterial,... unabhängig davon, ob es eine Messe in Madrid, Frankfurt, Peking oder Chicago ist.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Raumzelte für einzigartige Umgebungen',
      color: 'Farbe',
      finish: 'Ausführung:',
      descriptionTitle: 'Beschreibung:',
      description: 'Kleiner Messestand aus 4 Modulen<br>Die Montage ist sehr einfach; es sind keine Werkzeuge erforderlich.<br>Frei konfigurierbares, erweiterbares Produkt.',
      qualitiesTitle: 'Qualitäten:',
      materials: 'Materialien',
      materialsValue: 'MDF, Glas, Architekturtextil, Metall',
      finishValue: 'Airbrush-Lackierung + Lack',
      partsTitle: 'Teile:',
      parts: '1 = Hinterleuchtete Grafik <br>2 = Beleuchtete Regale <br>3 = Individuelles Logo <br>4 = Stauraum <br>5 = Theke mit Türen',
      priceTitle: 'Preis:',
      priceText: 'Set aus 4 Modulen mit Beleuchtung und <br> individueller Grafik',
      chooseFinish: 'Bitte wählen Sie die Ausführung,<br>um den Preis zu sehen.',
      choose: 'Bitte wählen Sie die Ausführung,<br>um den Preis zu sehen.',
      partsLabel: 'Teile',
      price: 'Preis',
      qualities: 'Qualitäten',
      pause: 'PAUSE',
      play: 'ABSPIELEN',
      visitWeb: 'SPEZIFISCHE WEBSITE BESUCHEN',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: 'Unternehmenspräsentationen',
          subtitle: 'Unsere Werkstätten und Herstellungsprozesse für Firmenmessestände.'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Messen in historischer Umgebung',
          subtitle: 'Respektvolles Design und Engineering an traditionellen und historischen Standorten.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Feierlichkeiten',
          subtitle: 'Maßgeschneiderte Gourmet-Bereiche für Weingüter und besondere Anlässe.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Großformatige Freiluftmessen',
          subtitle: 'Großflächige Montagen und erstklassige, hochresistente Zelte.'
        }
      ]
    },
    citiesIntro: 'Wir entwerfen, produzieren und montieren Messestände für Messen und Events in wichtigen Städten Spaniens und Portugals.',
    customTitle: 'GALERIE',
    customSubtitle: 'Nach Haupt-Montagetechnik geordnet.',
    filters: { all: 'Alle', textil: 'Textil', madera: 'Holz' },
    counters: { projects: 'Projekte', clients: 'Kunden', countries: 'Länder', fairs: 'Messen' },
    teamTitle: 'Team',
    teamSubtitle: 'Wir sind ein multidisziplinäres Team, zu dem Architekten, Montagearbeiter, Dekorateure, Beleuchtungstechniker gehören... Gemeinsam können wir auf alle Bedürfnisse jedes Projekts umfassend antworten. Zögern Sie nicht, uns bei Fragen anzurufen. Wir hoffen, Sie bald kennenzulernen.',
    teamRoles: ['Kreativität', 'Administrator', 'Werkstatt', 'Koordination'],
    contactTitle: 'ANGEBOT IN 24 H',
    contactNotice: 'Teilen Sie uns mit, was Sie benötigen, und wir erstellen Ihnen innerhalb von 24 Stunden einen detailreichen 3D-Entwurf und ein äußerst wettbewerbsfähiges wirtschaftliches Angebot.',
    form: { name: 'Name', company: 'Unternehmen', phone: 'Tel.', email: 'Email', fair: 'Messe', location: 'Stadt - Land', meters: 'Quadratmeter', floor: 'Boden Details', woodFloor: 'Holzboden', carpetPlatform: 'Teppichboden', carpet: 'Teppich', spaceDistribution: 'Raumaufteilung', reception: 'Empfangsbereich', bar: 'Barbereich', storage: 'Lager', product: 'Produktausstellung', openMeeting: 'Offener Besprechungsbereich', closedMeeting: 'Geschlossener Besprechungsbereich', audiovisual: 'Audiovisuell', led: 'LED-Bildschirm', projector: 'Projektor', budget: 'Geschätztes Budget', description: 'Beschreibung', privacy: 'Akzeptieren Sie unsere Datenschutzbestimmungen', send: 'SEND' },
    legal: { privacy: 'Datenschutzbestimmungen', legalNotice: 'Impressum', cookies: 'Cookie-Richtlinien' },
    legalText: {
      privacy: '<p>Standarte verwendet die über das Formular gesendeten Daten ausschließlich zur Beantwortung von Informationsanfragen, Angeboten und Mitteilungen im Zusammenhang mit Messestand-Projekten.</p><p>Diese Daten werden nicht für andere Zwecke genutzt. Sie können Auskunft, Berichtigung oder Löschung unter info@standarte.es anfordern.</p>',
      legalNotice: '<p>Diese Website gehört Standarte. Inhalte, Bilder und Texte dienen kommerziellen und informativen Zwecken und dürfen ohne Genehmigung nicht vervielfältigt werden.</p><p>Die Nutzung der Website setzt verantwortungsvolles Surfen im Rahmen der geltenden Vorschriften voraus.</p>',
      cookies: '<p>Wir verwenden notwendige Cookies für den Betrieb der Website und, nur mit Ihrer Zustimmung, Mess- und Werbe-Cookies von Google Ads oder Google Analytics.</p><p>Sie können diese Zwecke im Cookie-Banner akzeptieren, ablehnen oder konfigurieren. Ihre Zustimmung können Sie jederzeit über den Link "Configurar cookies" in der Fußzeile ändern oder widerrufen.</p><p>Google kann personenbezogene Daten für Werbemessung und Personalisierung verarbeiten, wenn Sie zustimmen. Weitere Informationen: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Nachricht erfolgreich gesendet.<br> Wir werden uns in Kürze mit Ihnen in Verbindung setzen.<br> Vielen Dank.',
    formError: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    projects3D: {
      title: 'Kostengünstige Projekte',
      subtitle: 'Entdecken Sie unsere interaktiven Vorschläge für hochwertige Zimmerei und deren Beziehung zu unseren Designwerten.',
      viewBtn: 'Projekt Anzeigen'
    },
    footer: 'Standarte. Design, Produktion und Montage von Messeständen.'
  },
  zh: {
    faqsTitle: '常见问题', successStoriesTitle: '成功案例', featuredProjectsIntro: '特色定制木工和展台设计项目：', 
    nav: { services: '服务', custom: '展台图库', noticias: '博客', contact: '联系', language: '语言' },
    seoTitle: 'Standarte | 展台设计与搭建',
    seoDescription: 'Standarte 提供展会展台设计、制作与搭建服务。',
    heroTitle: '西班牙展台建造车间',
    heroSubtitle: '高质量的工作',
    servicesTitle: '服务',
    services: [['设计与工程', '我们的团队将记录您项目的需求，这些需求将以细节的方式体现在一个3D原型中，您可以在制造开始之前进行探索和审查。原型的图像将百分之百忠实于最终结果。'], ['展台建设', '在建设过程中，我们采用最先进的组装技术和特定用于短暂建筑的材料。这使我们能够提供一个无瑕的外观，从而在第一眼就能展示出质量。'], ['安装和验证', '我们包揽一切。您可以在展会的第一天轻松自如地亮相，而且一切都已准备就绪，可以开始您的商业工作。无论是在马德里、法兰克福、北京还是芝加哥的展会，我们都能提供展台、餐饮、文具等服务。']],
    micro: {
      title: 'LUZPAVILION',
      subtitle: '适用于独特环境的空间帐篷',
      color: '颜色',
      finish: '饰面:',
      descriptionTitle: '说明:',
      description: '小型展台，由 4 个模块组成<br>安装非常简单，无需工具。<br>可自由配置和组合。',
      qualitiesTitle: '品质:',
      materials: '材料',
      materialsValue: 'MDF、玻璃、建筑织物、金属',
      finishValue: '喷绘涂装 + 清漆',
      partsTitle: '部件:',
      parts: '1 = 背光图文 <br>2 = 发光层板 <br>3 = 定制标志 <br>4 = 储物空间 <br>5 = 带门柜台',
      priceTitle: '价格:',
      priceText: '4 个带照明模块和 <br> 定制图文的组合',
      chooseFinish: '请选择饰面<br>查看价格。',
      choose: '请选择饰面<br>查看价格。',
      partsLabel: '部件',
      price: '价格',
      qualities: '品质',
      pause: '暂停',
      play: '播放',
      visitWeb: '访问专属网站',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: '企业展示',
          subtitle: '我们的车间及企业展台的制作流程。'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: '历史环境中的展会',
          subtitle: '在传统和历史区域中进行备受尊重的设计与工程。'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: '庆祝活动',
          subtitle: '为酒庄和特殊活动量身定制的美食空间。'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: '大型户外展会',
          subtitle: '大规模搭建和高强度优质帐篷。'
        }
      ]
    },
    citiesIntro: '我们在西班牙和葡萄牙重点城市为展会和活动设计、制作并搭建展台。',
    customTitle: '展台图库',
    customSubtitle: '按主要搭建技术分类。',
    filters: { all: '全部', textil: '纺织品', madera: '木材' },
    counters: { projects: '项目', clients: '客户', countries: '国家', fairs: '展会' },
    teamTitle: '团队',
    teamSubtitle: '我们是一个多学科团队，包括建筑师、装配工、装饰师、照明技术员等。我们共同可以对每个项目的所有需求作出完整的回应。如果您有任何问题，请随时致电给我们。我们希望能尽快见到您。',
    teamRoles: ['创意', '行政主管', '车间', '协调'],
    contactTitle: '24小时内报价',
    contactNotice: '告诉我们您的需求，我们将在24小时内为您提供详尽的3D设计和极具竞争力的经济报价。',
    form: { name: '姓名', company: '公司', phone: '电话', email: 'Email', fair: '展会', location: '城市 - 国家', meters: '平方米', floor: '地面细节', woodFloor: '木地板', carpetPlatform: '升起的地毯地板', carpet: '地毯', spaceDistribution: '空间分布', reception: '接待区', bar: '酒吧区', storage: '仓库', product: '产品展示', openMeeting: '开放会议区', closedMeeting: '封闭会议区', audiovisual: '视听', led: 'LED屏幕', projector: '投影仪', budget: '预算估算', description: '描述', privacy: '接受我们的隐私政策', send: '发送' },
    legal: { privacy: '隐私政策', legalNotice: '法律声明', cookies: 'Cookie政策' },
    legalText: {
      privacy: '<p>Standarte 仅使用通过表单提交的数据来回复信息请求、报价请求以及与展台项目相关的沟通。</p><p>我们不会将这些数据用于与请求无关的目的。您可以发送邮件至 info@standarte.es 申请访问、更正或删除。</p>',
      legalNotice: '<p>本网站属于 Standarte。网站内容、图片和文字用于商业与信息展示，未经授权不得复制。</p><p>使用本网站即表示您同意按照适用规定进行负责任的浏览。</p>',
      cookies: '<p>我们使用网站运行所必需的 Cookie，并且仅在您同意时使用 Google Ads 或 Google Analytics 的衡量和广告 Cookie。</p><p>您可以在 Cookie 横幅中接受、拒绝或配置这些用途，也可以随时通过页脚的“Configurar cookies”链接更改或撤回同意。</p><p>在您同意时，Google 可能会为广告衡量和个性化处理个人数据。更多信息：https://business.safety.google/privacy/</p>'
    },
    formSuccess: '消息已成功发送。<br> 我们将尽快与您联系。<br> 谢谢。',
    formError: '消息无法发送。请重试。',
    projects3D: {
      title: '低成本项目',
      subtitle: '探索我们的交互式高端木工方案及其与我们设计价值观的关系。',
      viewBtn: '查看项目'
    },
    footer: 'Standarte. 展台设计、制作与搭建。'
  },
  hi: {
    faqsTitle: 'अक्सर पूछे जाने वाले प्रश्न', successStoriesTitle: 'सफलता की कहानियाँ', featuredProjectsIntro: 'विशेष कस्टम बढ़ईगीरी और प्रदर्शनी स्टैंड डिजाइन परियोजनाएं:', 
    nav: { services: 'सेवाएँ', custom: 'गैलरी', noticias: 'ब्लॉग', contact: 'संपर्क', language: 'भाषा' },
    seoTitle: 'Standarte | प्रदर्शनी स्टैंड डिजाइन और निर्माण',
    seoDescription: 'Standarte प्रदर्शनियों के लिए स्टैंड डिजाइन, निर्माण और स्थापना सेवाएं प्रदान करता है।',
    heroTitle: 'स्टैंड निर्माण कार्यशाला स्पेन में',
    heroSubtitle: 'उच्च गुणवत्ता का काम',
    servicesTitle: 'सेवाएँ',
    services: [['डिज़ाइन और इंजीनियरिंग', 'हमारी टीम आपके परियोजना की आवश्यकताओं का नोट लेगी, जिसे से संपूर्ण विस्तार से एक 3D प्रोटोटाइप में प्रतिबिंबित किया जाएगा, जिसे आप निर्माण की शुरुआत से पहले जांच सकते हैं और समीक्षा कर सकते हैं। प्रोटोटाइप की छवि अंतिम परिणाम के लिए 100% विश्वसनीय होगी।'], ['बूथ निर्माण', 'निर्माण प्रक्रिया में हम अल्पकालिक निर्माण में उपयोग के लिए विशिष्ट सामग्रियों के साथ सबसे आधुनिक असेंबली तकनीकों को लागू करते हैं। यह हमें एक त्रुटिहीन उपस्थिति प्रदान करने की अनुमति देता है जो पहली नज़र में गुणवत्ता प्रदर्शित करेगी।'], ['समारोह और मान्यताएँ', 'हम हर चीज़ का ख्याल रखते हैं. मन की पूर्ण शांति के साथ आप मेले के पहले दिन आ सकते हैं, और आपको अपना व्यावसायिक कार्य शुरू करने के लिए सब कुछ तैयार मिलेगा। स्टैंड, खानपान, स्टेशनरी,... चाहे यह मैड्रिड, फ्रैंकफर्ट, बीजिंग या शिकागो में मेला हो।']],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'अद्वितीय वातावरण के लिए स्थानिक तंबू',
      color: 'रंग',
      finish: 'फिनिश:',
      descriptionTitle: 'विवरण:',
      description: 'यह 4 भागों से बना छोटा स्टैंड है<br>इसकी असेंबली बहुत आसान है; किसी उपकरण की जरूरत नहीं।<br>स्वतंत्र रूप से कॉन्फ़िगर होने वाला उत्पाद।',
      qualitiesTitle: 'गुणवत्ता:',
      materials: 'सामग्री',
      materialsValue: 'MDF, ग्लास, आर्किटेक्चरल टेक्सटाइल, मेटल',
      finishValue: 'एयरब्रश पेंट + लैकर',
      partsTitle: 'भाग:',
      parts: '1 = बैकलिट ग्राफिक <br>2 = रोशन शेल्फ <br>3 = कस्टम लोगो <br>4 = स्टोरेज <br>5 = दरवाजों वाला काउंटर',
      priceTitle: 'कीमत:',
      priceText: 'लाइटिंग और कस्टम ग्राफिक्स के साथ <br> 4 मॉड्यूल का सेट',
      chooseFinish: 'कीमत देखने के लिए<br>फिनिश चुनें।',
      choose: 'कीमत देखने के लिए<br>फिनिश चुनें।',
      partsLabel: 'भाग',
      price: 'कीमत',
      qualities: 'गुणवत्ता',
      pause: 'रोकें',
      play: 'चलाएं',
      visitWeb: 'विशिष्ट वेबसाइट पर जाएं',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: 'कॉर्पोरेट प्रस्तुतियाँ',
          subtitle: 'कॉर्पोरेट स्टैंड के लिए हमारी कार्यशालाएं और निर्माण प्रक्रिया।'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'ऐतिहासिक परिवेश में मेले',
          subtitle: 'पारंपरिक and ऐतिहासिक स्थानों में सम्मानित डिजाइन और इंजीनियरिंग।'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'उत्सव',
          subtitle: 'वाइनरी और विशेष आयोजनों के लिए कस्टम पेटू (गॉरमेट) स्थान।'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'बड़े प्रारूप के आउटडोर मेले',
          subtitle: 'बड़े पैमाने पर सेटअप और प्रीमियम उच्च-प्रतिरोध तंबू।'
        }
      ]
    },
    citiesIntro: 'हम स्पेन और पुर्तगाल के प्रमुख शहरों में मेलों और इवेंट्स के लिए प्रदर्शनी स्टैंड डिजाइन, निर्माण और इंस्टॉल करते हैं।',
    customTitle: 'गैलरी',
    customSubtitle: 'मुख्य असेंबली तकनीक के अनुसार वर्गीकृत।',
    filters: { all: 'सभी', textil: 'वस्त्र', madera: 'लकड़ी' },
    counters: { projects: 'परियोजनाएँ', clients: 'ग्राहकों', countries: 'देश', fairs: 'मेले' },
    teamTitle: 'टीम',
    teamSubtitle: 'हम एक बहु-विषयी टीम हैं, जिसमें वास्तुकार, माउंटर, सजावटकार, प्रकाश तकनीशियन,... यह सुनिश्चित करने के लिए कि हर परियोजना की सभी आवश्यकताओं का पूरा उत्तरदाता हो सकता है। जिनका कोई सवाल हो, उन्हें हमें कॉल करने में संकोच न करें। हम जल्दी ही आपसे मिलने के लिए उम्मीद करते हैं।',
    teamRoles: ['रचनात्मकता', 'प्रशासक', 'कारख़ाना', 'समन्वय'],
    contactTitle: '24 घंटे में कोटेशन',
    contactNotice: 'हमें बताएं कि आपको क्या चाहिए और 24 घंटों के भीतर हमारे पास विवरणों से भरा 3D डिज़ाइन और एक सुपर-प्रतिस्पर्धी आर्थिक प्रस्ताव होगा।',
    form: { name: 'नाम', company: 'कंपनी', phone: 'फ़ोन', email: 'Email', fair: 'मेला', location: 'शहर - देश', meters: 'वर्ग मीटर', floor: 'भूमि का विवरण', woodFloor: 'लकड़ी वृद्धि तल', carpetPlatform: 'उठाई गई कालीन तल', carpet: 'कालीन', spaceDistribution: 'अंतर्वितरण', reception: 'स्वागत क्षेत्र', bar: 'बार क्षेत्र', storage: 'गोदाम', product: 'उत्पाद प्रदर्शन', openMeeting: 'खुली मुलाकात क्षेत्र', closedMeeting: 'बंद मुलाकात क्षेत्र', audiovisual: 'ऑडियोविजुअल्स', led: 'LED स्क्रीन', projector: 'प्रोजेक्टर', budget: 'अनुमानित बजट', description: 'विवरण', privacy: 'हमारी गोपनीयता नीति को स्वीकार करें', send: 'भेजना' },
    legal: { privacy: 'गोपनीयता नीति', legalNotice: 'कानूनी सूचना', cookies: 'कुकीज़ का उपयोग' },
    legalText: {
      privacy: '<p>Standarte फ़ॉर्म के माध्यम से भेजे गए डेटा का उपयोग केवल जानकारी, अनुमान और प्रदर्शनी स्टैंड परियोजनाओं से जुड़ी बातचीत का उत्तर देने के लिए करता है।</p><p>हम इस डेटा का उपयोग आपकी मांग से अलग उद्देश्यों के लिए नहीं करते। आप info@standarte.es पर लिखकर पहुंच, सुधार या हटाने का अनुरोध कर सकते हैं।</p>',
      legalNotice: '<p>यह वेबसाइट Standarte की है। इसकी सामग्री, चित्र और पाठ व्यावसायिक और सूचनात्मक उद्देश्य के लिए हैं और अनुमति के बिना पुन: उपयोग नहीं किए जा सकते।</p><p>इस साइट का उपयोग लागू नियमों के अनुसार जिम्मेदार ब्राउज़िंग को मानता है।</p>',
      cookies: '<p>हम वेबसाइट के संचालन के लिए आवश्यक कुकीज़ का उपयोग करते हैं और, केवल आपकी सहमति से, Google Ads या Google Analytics की मापन और विज्ञापन कुकीज़ का उपयोग करते हैं।</p><p>आप कुकी बैनर से इन उद्देश्यों को स्वीकार, अस्वीकार या कॉन्फ़िगर कर सकते हैं। आप फुटर में "Configurar cookies" लिंक से कभी भी सहमति बदल या वापस ले सकते हैं।</p><p>आपकी अनुमति पर Google विज्ञापन मापन और वैयक्तिकरण के लिए व्यक्तिगत डेटा संसाधित कर सकता है। अधिक जानकारी: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'संदेश सफलतापूर्वक भेजा गया।<br> हम जल्द ही आपसे संपर्क करेंगे।<br> धन्यवाद।',
    formError: 'संदेश भेजा नहीं जा सका। कृपया फिर से प्रयास करें।',
    projects3D: {
      title: 'कम लागत वाली परियोजनाएं',
      subtitle: 'हमारे इंटरैक्टिव उच्च-बढ़ईगीरी प्रस्तावों और हमारे डिज़ाइन मूल्यों के साथ उनके संबंधों का पता लगाएं।',
      viewBtn: 'परियोजना देखें'
    },
    footer: 'Standarte. प्रदर्शनी स्टैंड डिजाइन, निर्माण और इंस्टॉलेशन।'
  },
  pt: {
    faqsTitle: 'Perguntas Frequentes', successStoriesTitle: 'Casos de Sucesso', featuredProjectsIntro: 'Projetos destacados de marcenaria à medida e design de stands:', 
    nav: { services: 'Serviços', custom: 'Galeria', noticias: 'Blog', contact: 'Contacto', language: 'Idioma' },
    seoTitle: 'Standarte | Construção de stands em Espanha e Portugal',
    seoDescription: 'Design, produção e montagem de stands para feiras em Espanha e projetos internacionais.',
    heroTitle: 'Projeto e construção de estandes',
    heroSubtitle: 'Espaços que inspiram',
    servicesTitle: 'Serviços',
    services: [
      ['Projeto e Engenharia', 'Nossa equipe tomará nota das necessidades do seu projeto, que, detalhadamente, serão refletidas em um protótipo 3D que você poderá explorar e revisar antes do início da fabricação. A imagem do protótipo será 100% fiel ao resultado final.'],
      ['Construção', 'No processo construtivo aplicamos as mais modernas técnicas de montagem com materiais específicos para utilização na construção efémera. Isso nos permite oferecer uma aparência impecável que demonstrará qualidade à primeira vista.'],
      ['Montagem e validações', 'Nós tomamos conta de tudo. Com total tranquilidade você pode se apresentar no primeiro dia da feira, e encontrará tudo pronto para iniciar seu trabalho comercial. Stand, catering, papelaria,... independentemente de ser uma feira em Madrid, Frankfurt, Pequim ou Chicago.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Tendas espaciais para ambientes únicos',
      color: 'Cor',
      finish: 'Acabamento:',
      descriptionTitle: 'Descrição:',
      description: 'Stand de pequeno formato composto por 4 módulos<br>A montagem é muito simples; não precisa de ferramentas.<br>Produto acoplável livremente configurável.',
      qualitiesTitle: 'Qualidades:',
      materials: 'Materiais',
      materialsValue: 'MDF, vidro, têxtil arquitetónico, metal',
      finishValue: 'Pintura aerográfica + lacado',
      partsTitle: 'Peças:',
      parts: '1 = Gráfica retroiluminada <br>2 = Prateleiras iluminadas <br>3 = Logótipo personalizado <br>4 = Armazenamento <br>5 = Balcão com portas',
      priceTitle: 'Preço:',
      priceText: 'Conjunto de 4 módulos com iluminação e <br> gráfica personalizada',
      chooseFinish: 'Escolha o acabamento<br>para ver o preço.',
      choose: 'Escolha o acabamento<br>para ver o preço.',
      partsLabel: 'Peças',
      price: 'Preço',
      qualities: 'Qualidades',
      pause: 'PAUSA',
      play: 'REPRODUZIR',
      visitWeb: 'VISITAR WEB ESPECÍFICA',
      videos: [
        {
          src: '/img/video_standrte_presentacion_empresa.mp4',
          title: 'Apresentações Corporativas',
          subtitle: 'Nossas oficinas e processo de fabricação de stands corporativos.'
        },
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Feiras em Ambientes Históricos',
          subtitle: 'Design e engenharia respeitosos em locais tradicionais e históricos.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Celebrações',
          subtitle: 'Espaços gourmet sob medida para vinícolas e eventos especiais.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Feiras ao Ar Livre de Grande Formato',
          subtitle: 'Montagens em grande escala e tendas premium de alta resistência.'
        }
      ]
    },
    citiesIntro: 'Desenhamos, produzimos e montamos stands para feiras e eventos em cidades-chave de Espanha e Portugal.',
    customTitle: 'GALERIA',
    customSubtitle: 'Classificados pela técnica principal de montagem.',
    filters: { all: 'Tudo', textil: 'Têxtil', madera: 'Madeira' },
    counters: { projects: 'Projetos', clients: 'Clientes', countries: 'Países', fairs: 'Feiras' },
    teamTitle: 'Equipa',
    teamSubtitle: 'Somos uma equipa multidisciplinar, incluindo arquitectos, montadores, decoradores, técnicos de iluminação,... Juntos podemos dar uma resposta completa a todas as necessidades de cada projecto. Não hesite em nos chamar para qualquer dúvida que tenha. Esperamos conhecê-lo em breve.',
    teamRoles: ['Criatividade', 'Administrador', 'Oficina', 'Coordenação'],
    contactTitle: 'ORÇAMENTO EM 24 H',
    contactNotice: 'Diga-nos o que precisa e, no prazo de 24 horas, teremos um design 3D detalhado e uma proposta económica super-competitiva.',
    form: { name: 'Nome', company: 'O negócio', phone: 'Telefone', email: 'Email', fair: 'Feira', location: 'Cidade - Pais', meters: 'Metros quadrados', floor: 'Detalhes do terreno', woodFloor: 'Plataforma-madeira', carpetPlatform: 'Tapete-plataforma', carpet: 'Tapete', spaceDistribution: 'Distribuição de espaços', reception: 'Área de recepção', bar: 'Área do bar', storage: 'Armazém', product: 'Exposição de produtos', openMeeting: 'Área de reunião aberta', closedMeeting: 'Área de reunião fechada', audiovisual: 'Audiovisual', led: 'Tela de led', projector: 'Projetor', budget: 'Orçamento estimado', description: 'Descrição', privacy: 'Aceite a nossa Política de Privacidade', send: 'MANDAR' },
    legal: { privacy: 'Política de privacidade', legalNotice: 'Aviso Legal', cookies: 'Cookies' },
    legalText: {
      privacy: '<p>A Standarte utiliza os dados enviados através do formulário apenas para responder a pedidos de informação, orçamentos e comunicações relacionadas com projetos de stands.</p><p>Não utilizamos estes dados para finalidades alheias ao pedido. Pode solicitar acesso, correção ou eliminação escrevendo para info@standarte.es.</p>',
      legalNotice: '<p>Este site pertence à Standarte. Os seus conteúdos, imagens e textos têm caráter comercial e informativo e não podem ser reproduzidos sem autorização.</p><p>A utilização do site implica uma navegação responsável e respeitosa com a legislação aplicável.</p>',
      cookies: '<p>Utilizamos cookies necessárias para o funcionamento do site e, apenas com o seu consentimento, cookies de medição e publicidade associadas ao Google Ads ou Google Analytics.</p><p>Pode aceitar, rejeitar ou configurar estas finalidades no banner de cookies. Também pode alterar ou retirar o consentimento a qualquer momento no link "Configurar cookies" do rodapé.</p><p>A Google pode tratar dados pessoais para medição publicitária e personalização quando autorizar. Mais informação: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Mensagem enviada corretamente.<br> Entraremos em contacto em breve.<br> Obrigado.',
    formError: 'Não foi possível enviar a mensagem. Por favor, tente novamente.',
    pause: 'PAUSA',
    play: 'REPRODUZIR',
    visitWeb: 'VISITAR WEB ESPECÍFICA',
    projects3D: {
      title: 'Projetos de Baixo Custo',
      subtitle: 'Explore as nossas propostas interativas de alta carpintaria e a sua relação com os nossos valores de design.',
      viewBtn: 'Ver Projeto'
    },
    footer: 'Standarte. Design, produção e montagem de stands.'
  },
  fr: {
    faqsTitle: 'Foire Aux Questions', successStoriesTitle: 'Histoires de Réussite', featuredProjectsIntro: 'Projets phares de menuiserie sur mesure et de conception de stands:', 
    nav: { services: 'Services', custom: 'Galerie', noticias: 'Blog', contact: 'Contact', language: 'Langue' },
    seoTitle: 'Standarte | Constructeur de stands en Espagne et Portugal',
    seoDescription: 'Standarte conçoit, fabrique et installe des stands de manière professionnelle et personnalisée pour des salons en Espagne et à l\'international.',
    heroTitle: 'Conception et construction de stands internationaux',
    heroSubtitle: 'Des espaces qui inspirent',
    servicesTitle: 'Services',
    services: [
      ['Conception et Ingénierie', 'Notre équipe professionnelle prendra note des besoins de votre projet, qui seront reflétés en détail dans un prototype 3D personnalisé que vous pourrez explorer et réviser avant le début de la fabrication. L\'image du prototype sera 100% fidèle au résultat final.'],
      ['Construction', 'Dans le processus de construction, nous appliquons les techniques d\'assemblage les plus modernes avec des matériaux spécifiques pour l\'architecture éphémère. Cela nous permet d\'offrir un aspect impeccable qui démontrera notre qualité au premier coup d\'œil.'],
      ['Montage et validations', 'Nous nous occupons de tout. En toute tranquillité, vous pourrez vous présenter le premier jour du salon, et vous trouverez tout prêt pour commencer votre travail commercial. Stand, restauration, papeterie,... peu importe s\'il s\'agit d\'un salon à Madrid, Francfort, Pékin ou Chicago.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Tentes spatiales pour environnements uniques',
      color: 'Couleur',
      finish: 'Finition:',
      descriptionTitle: 'Description:',
      description: 'Stand petit format composé de 4 corps<br>Son montage est très simple ; aucun outil n\'est nécessaire.<br>Produit modulaire librement configurable.',
      qualitiesTitle: 'Qualités:',
      materials: 'Matériaux',
      materialsValue: 'MDF, verre, textile architectural, métal',
      finishValue: 'Peinture aérographique + laque',
      partsTitle: 'Parties:',
      parts: '1 = Graphique rétroéclairé <br>2 = Étagères éclairées <br>3 = Logo personnalisé <br>4 = Stockage <br>5 = Comptoir avec portes',
      priceTitle: 'Prix:',
      priceText: 'Ensemble de 4 modules avec éclairage et <br> graphiques personnalisés',
      chooseFinish: 'Choisissez la finition<br>pour voir le prix.',
      choose: 'Choisissez la finition pour voir le prix',
      partsLabel: 'Parties',
      price: 'Prix',
      qualities: 'Qualités',
      pause: 'PAUSE',
      play: 'JOUER',
      visitWeb: 'VISITER LE SITE WEB SPÉCIFIQUE',
      videos: [
        { src: '/img/video_standrte_presentacion_empresa.mp4', title: 'Présentations d\'entreprise', subtitle: 'Nos ateliers et processus de fabrication de stands d\'entreprise.' },
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Salons dans des lieux historiques', subtitle: 'Conception respectueuse dans des lieux traditionnels et historiques.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Célébrations', subtitle: 'Espaces gastronomiques sur mesure pour les vignobles et événements spéciaux.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Salons en plein air grand format', subtitle: 'Montages à grande échelle et tentes premium haute résistance.' }
      ]
    },
    citiesIntro: 'Nous concevons, fabriquons et montons des stands pour des salons et événements dans les principales villes d\'Espagne et Portugal.',
    customTitle: 'GALERIE',
    customSubtitle: 'Classés par technique de montage principale.',
    filters: { all: 'Tous', textil: 'Textile', madera: 'Bois' },
    counters: { projects: 'Projets', clients: 'Clients', countries: 'Pays', fairs: 'Salons' },
    teamTitle: 'Équipe',
    teamSubtitle: 'Nous sommes une équipe multidisciplinaire comprenant des architectes, des monteurs, des décorateurs, des éclairagistes... Ensemble, nous pouvons apporter une réponse completa à tous les besoins de chaque projet. N\'hésitez pas à nous appeler pour toute question. Nous espérons vous rencontrer bientôt.',
    teamRoles: ['Créativité', 'Administrateur', 'Atelier', 'Coordination'],
    contactTitle: 'DEVIS EN 24 H',
    contactNotice: 'Dites-nous ce dont vous avez besoin et nous aurons une conception 3D riche en détails et une proposition commerciale super compétitive sous 24 heures.',
    form: { name: 'Nom', company: 'Entreprise', phone: 'Téléphone', email: 'Email', fair: 'Salon', location: 'Ville - Pays', meters: 'Mètres carrés', floor: 'Détails du sol', woodFloor: 'Plancher en bois', carpetPlatform: 'Plancher avec moquette', carpet: 'Moquette', spaceDistribution: 'Répartition des espaces', reception: 'Zone de réception', bar: 'Zone de bar', storage: 'Stockage', product: 'Exposition de produits', openMeeting: 'Zone de réunion ouverte', closedMeeting: 'Zone de réunion fermée', audiovisual: 'Audiovisuel', led: 'Écran LED', projector: 'Projecteur', budget: 'Budget estimé', description: 'Description', privacy: 'Accepter notre politique de confidentialité', send: 'ENVOYER' },
    legal: { privacy: 'Politique de confidentialité', legalNotice: 'Mentions légales', cookies: 'Utilisation des Cookies' },
    legalText: {
      privacy: '<p>Standarte utilise les données envoyées via ce formulaire uniquement pour répondre aux demandes d\'informations et devis.</p>',
      legalNotice: '<p>Ce site web appartient à Standarte. L\'utilisation implique une navigation responsable.</p>',
      cookies: '<p>Nous utilisons des cookies pour le fonctionnement du site.</p>'
    },
    formSuccess: 'Message envoyé avec succès.<br> Nous vous contacterons sous peu.<br> Merci.',
    formError: 'Impossible d\'envoyer le message. Veuillez réessayer.',
    projects3D: { title: 'Projets à bas coût', subtitle: 'Explorez nos propositions interactives de haute menuiserie.', viewBtn: 'Voir Projet' },
    footer: 'Standarte. Conception, fabrication et montage de stands.'
  },
  it: {
    faqsTitle: 'Domande Frequenti', successStoriesTitle: 'Storie di Successo', featuredProjectsIntro: 'Progetti in evidenza di falegnameria su misura e design di stand espositivi:', 
    nav: { services: 'Servizi', custom: 'Galleria', noticias: 'Blog', contact: 'Contatto', language: 'Lingua' },
    seoTitle: 'Standarte | Allestimenti fieristici in Spagna e Portogallo',
    seoDescription: 'Standarte progetta, produce e allestisce stand in modo professionale e personalizzato per fiere in Spagna e all\'estero.',
    heroTitle: 'Progettazione e allestimento stand fieristici',
    heroSubtitle: 'Spazi che ispirano',
    servicesTitle: 'Servizi',
    services: [
      ['Progettazione e Ingegneria', 'Il nostro team professionale prenderà nota delle esigenze del tuo progetto, che saranno riflesse in dettaglio in un prototipo 3D personalizzato che potrai esplorare e rivedere prima dell\'inizio della produzione. L\'immagine del prototipo sarà fedele al 100% al risultato finale.'],
      ['Costruzione e Allestimento', 'Nel processo di costruzione applichiamo le più moderne tecniche di assemblaggio con materiali specifici per l\'uso in architettura effimera. Questo ci permette di offrire un aspetto impeccabile che dimostrerà la qualità al primo sguardo.'],
      ['Montaggio e validazioni', 'Ci occupiamo di tutto. Con totale tranquillità potrai presentarti il primo giorno di fiera e troverai tutto pronto per iniziare il tuo lavoro commerciale. Stand, catering, cancelleria,... indipendentemente se è una fiera a Madrid, Francoforte, Pechino o Chicago.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Tende spaziali per ambienti unici',
      color: 'Colore',
      finish: 'Finitura:',
      descriptionTitle: 'Descrizione:',
      description: 'Stand di piccolo formato composto da 4 corpi<br>Il suo montaggio è molto semplice; non sono necessari attrezzi.<br>Prodotto modulare liberamente configurabile.',
      qualitiesTitle: 'Qualità:',
      materials: 'Materiali',
      materialsValue: 'MDF, vetro, tessuto architettonico, metallo',
      finishValue: 'Vernice aerografica + lacca',
      partsTitle: 'Parti:',
      parts: '1 = Grafica retroilluminata <br>2 = Scaffali illuminati <br>3 = Logo personalizzato <br>4 = Magazzino <br>5 = Bancone con porte',
      priceTitle: 'Prezzo:',
      priceText: 'Set di 4 moduli con illuminazione e <br> grafica personalizzata',
      chooseFinish: 'Scegli la finitura<br>per vedere il prezzo.',
      choose: 'Scegli la finitura per vedere il prezzo',
      partsLabel: 'Parti',
      price: 'Prezzo',
      qualities: 'Qualità',
      pause: 'PAUSA',
      play: 'RIPRODUCI',
      visitWeb: 'VISITA SITO SPECIFICO',
      videos: [
        { src: '/img/video_standrte_presentacion_empresa.mp4', title: 'Presentazioni Aziendali', subtitle: 'I nostri laboratori e il processo di produzione degli stand.' },
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Fiere in ambienti storici', subtitle: 'Design rispettoso in location tradizionali e storiche.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Celebrazioni', subtitle: 'Spazi gourmet su misura per cantine ed eventi speciali.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Fiere all\'aperto di grande formato', subtitle: 'Allestimenti su larga scala e tende premium ad alta resistenza.' }
      ]
    },
    citiesIntro: 'Progettiamo, produciamo e allestiamo stand per fiere ed eventi nelle principali città di Spagna e Portogallo.',
    customTitle: 'GALLERIA',
    customSubtitle: 'Classificati per tecnica di montaggio principale.',
    filters: { all: 'Tutti', Tessile: 'Tessile', Legno: 'Legno' },
    counters: { projects: 'Progetti', clients: 'Clienti', countries: 'Paesi', fairs: 'Fiere' },
    teamTitle: 'Squadra',
    teamSubtitle: 'Siamo un team multidisciplinare, che include architetti, montatori, decoratori, tecnici delle luci... Insieme possiamo fornire una risposta completa a tutte le esigenze di ogni progetto. Non esitare a chiamarci per qualsiasi domanda. Speriamo di conoscerti presto.',
    teamRoles: ['Creatività', 'Amministratore', 'Officina', 'Coordinamento'],
    contactTitle: 'PREVENTIVO IN 24 H',
    contactNotice: 'Dicci di cosa hai bisogno ed entro 24 ore avremo un design 3D ricco di dettagli e una proposta economica super competitiva.',
    form: { name: 'Nome', company: 'Azienda', phone: 'Telefono', email: 'Email', fair: 'Fiera', location: 'Città - Paese', meters: 'Metri quadrati', floor: 'Dettagli pavimento', woodFloor: 'Pedana in legno', carpetPlatform: 'Pedana in moquette', carpet: 'Moquette', spaceDistribution: 'Distribuzione spazi', reception: 'Area reception', bar: 'Area bar', storage: 'Magazzino', product: 'Esposizione prodotti', openMeeting: 'Area riunioni aperta', closedMeeting: 'Area riunioni chiusa', audiovisual: 'Audiovisivi', led: 'Schermo LED', projector: 'Proiettore', budget: 'Budget stimato', description: 'Descrizione', privacy: 'Accetta la nostra Privacy Policy', send: 'INVIA' },
    legal: { privacy: 'Privacy Policy', legalNotice: 'Note Legali', cookies: 'Uso dei Cookie' },
    legalText: {
      privacy: '<p>Standarte utilizza i dati inviati per rispondere alle richieste di informazioni e preventivi.</p>',
      legalNotice: '<p>Questo sito web appartiene a Standarte. L\'uso implica una navigazione responsabile.</p>',
      cookies: '<p>Utilizziamo i cookie per il funzionamento del web.</p>'
    },
    formSuccess: 'Messaggio inviato con successo.<br> Ti contatteremo a breve.<br> Grazie.',
    formError: 'Impossibile inviare il messaggio. Riprova.',
    projects3D: { title: 'Progetti a basso costo', subtitle: 'Esplora le nostre proposte interattive di alta falegnameria.', viewBtn: 'Vedi Progetto' },
    footer: 'Standarte. Progettazione, produzione e allestimento stand.'
  },
  ko: {
  "nav": {
    "services": "서비스",
    "custom": "갤러리",
    "noticias": "블로그",
    "contact": "연락",
    "language": "언어"
  },
  "seoTitle": "Standarte | 마드리드, 바르셀로나, 빌바오, 말라가, 리스본의 전시 부스 제작자",
  "seoDescription": "스페인 및 국제 프로젝트를 위한 전시회 부스의 전문적이고 맞춤화된 디자인, 제작 및 설치.",
  "heroTitle": "스페인에서의 부스 제작 워크숍",
  "heroSubtitle": "고품질 작업",
  "servicesTitle": "서비스",
  "services": [
    [
      "디자인 및 엔지니어링",
      "저희 전문 팀은 귀하의 프로젝트 요구 사항을 기록할 것이며, 이는 자세히 맞춤형 3D 프로토타입에 반영되어 제조 시작 전에 탐색하고 검토할 수 있습니다. 프로토타입의 이미지는 최종 결과를 100% 충실하게 반영할 것입니다."
    ],
    [
      "부스 설치",
      "건설 과정에서 우리는 일시적인 건축에 사용되는 특정 재료와 함께 가장 현대적인 조립 기술을 적용합니다. 이를 통해 한눈에 품질을 보여줄 수 있는 완벽한 외관을 제공할 수 있습니다."
    ],
    [
      "조립 및 검증",
      "우리는 모든 것을 처리합니다. 완전한 마음의 평안 속에서 박람회 첫날에 자신을 드러낼 수 있으며, 상업 활동을 시작할 준비가 모두 갖추어져 있음을 발견하게 될 것입니다. 부스, 케이터링, 문구류,..."
    ]
  ],
  "micro": {
    "title": "루즈파빌리온",
    "subtitle": "독특한 환경을 위한 공간 텐트",
    "color": "색",
    "finish": "끝:",
    "descriptionTitle": "설명:",
    "description": "4개의 본체로 구성된 소형 스탠드입니다.<br>조립이 매우 간단하며 도구가 필요하지 않습니다.<br>자유롭게 구성할 수 있는 부착 가능한 제품입니다.",
    "qualitiesTitle": "특성:",
    "materials": "재료",
    "materialsValue": "MDF, 유리, 건축용 직물, 금속",
    "finishValue": "에어브러시 페인트 + 래커",
    "partsTitle": "부품:",
    "parts": "1 = 백라이트 그래픽 <br>2 = 조명 선반 <br>3 = 맞춤 로고 <br>4 = 저장 공간 <br>5 = 문이 있는 카운터",
    "priceTitle": "가격:",
    "priceText": "조명과 <br> 맞춤 그래픽이 있는 4개 모듈 세트",
    "chooseFinish": "가격을 보려면 마감을 선택하세요.",
    "choose": "마감 지점을 선택<br>해 가격을 확인해 주세요.",
    "partsLabel": "부품",
    "price": "가격",
    "qualities": "특성",
    "pause": "일시 정지",
    "play": "재생",
    "visitWeb": "특정 웹사이트 방문",
    "videos": [
      {
        "src": "/img/video_standrte_presentacion_empresa.mp4",
        "title": "기업 프레젠테이션",
        "subtitle": "기업 부스를 위한 우리의 작업장과 생산 과정."
      },
      {
        "src": "/img/video_standarte_presentacion_vinos.mp4",
        "title": "역사적 배경의 박람회",
        "subtitle": "전통적이고 역사적인 장소에서의 존중하는 디자인과 엔지니어링."
      },
      {
        "src": "/img/video_standarte_andalucia.mp4",
        "title": "축하 행사",
        "subtitle": "와이너리와 특별 행사를 위한 맞춤형 고급 공간."
      },
      {
        "src": "/img/video_standarte_feria_verano.mp4",
        "title": "대형 야외 박람회",
        "subtitle": "대형 설치와 프리미엄 고저항 텐트."
      }
    ]
  },
  "citiesIntro": "우리는 스페인과 포르투갈의 주요 도시에서 열리는 무역 박람회와 행사용 전시 부스를 설계, 제작 및 설치합니다.",
  "customTitle": "갤러리",
  "customSubtitle": "주요 조립 기술별로 분류됩니다.",
  "filters": {
    "all": "모두",
    "textil": "섬유",
    "madera": "나무"
  },
  "counters": {
    "projects": "프로젝트",
    "clients": "고객",
    "countries": "나라들",
    "fairs": "박람회"
  },
  "teamTitle": "팀",
  "teamSubtitle": "우리는 건축가, 조립사, 장식가, 조명 기술자를 포함한 다학제 팀입니다. 함께 우리는 각 프로젝트의 모든 요구에 대해 완전한 대응을 제공할 수 있습니다. 궁금한 점이 있으면 주저하지 말고 저희에게 문의하십시오. 곧 뵙기를 바랍니다.",
  "teamRoles": [
    "데코레이터",
    "관리자",
    "워크숍",
    "조정"
  ],
  "contactTitle": "24시간 내 견적",
  "contactNotice": "필요한 사항을 알려주시면 24시간 이내에 세부 사항이 가득한 3D 디자인과 매우 경쟁력 있는 가격 제안을 준비해 드리겠습니다.",
  "form": {
    "name": "이름",
    "company": "회사",
    "phone": "전화",
    "email": "이메일",
    "fair": "공정한",
    "location": "도시 - 나라",
    "meters": "제곱미터",
    "floor": "지면 세부 사항",
    "woodFloor": "워조덴 올림 바닥",
    "carpetPlatform": "들뜬 카펫 바닥",
    "carpet": "카펫",
    "spaceDistribution": "공간 분포",
    "reception": "접수처",
    "bar": "바 구역",
    "storage": "창고",
    "product": "제품 전시",
    "openMeeting": "개방 회의 공간",
    "closedMeeting": "폐쇄된 회의 구역",
    "audiovisual": "시청각",
    "led": "LED 스크린",
    "projector": "프로젝터",
    "budget": "예상 예산",
    "description": "설명",
    "privacy": "개인정보처리방침에 동의합니다",
    "send": "보내기"
  },
  "legal": {
    "privacy": "개인정보 처리방침",
    "legalNotice": "법적 경고",
    "cookies": "쿠키"
  },
  "legalText": {
    "privacy": "<p>스탠다르테는 양식을 통해 제출된 데이터를 전시 부스 프로젝트와 관련된 정보 요청, 견적 및 커뮤니케이션에만 사용합니다.</p><p>이 데이터를 귀하의 요청과 관련 없는 목적으로 사용하지 않습니다. 접근, 수정 또는 삭제를 원하시는 경우 info@standarte.es로 문의하실 수 있습니다.</p>",
    "legalNotice": "<p>이 웹사이트는 Standarte에 속합니다. 이 사이트의 내용, 이미지 및 텍스트는 상업적 및 정보 제공 목적으로 사용되며, 허가 없이 복제할 수 없습니다.</p><p>사이트 사용은 관련 규정을 준수한 책임 있는 브라우징을 의미합니다.</p>",
    "cookies": "<p>웹사이트가 작동하도록 필요한 쿠키를 사용하며, 귀하의 동의가 있는 경우에만 Google Ads 또는 Google Analytics 측정 및 광고 쿠키를 사용합니다.</p><p>쿠키 배너에서 이러한 목적을 수락, 거부 또는 구성할 수 있습니다. 또한 하단의 \"쿠키 설정\" 링크에서 언제든지 동의를 변경하거나 철회할 수 있습니다.</p><p>귀하가 허용하면 Google은 광고 측정 및 개인화 목적으로 개인 데이터를 처리할 수 있습니다. 자세한 정보: https://business.safety.google/privacy/</p>"
  },
  "formSuccess": "메시지가 성공적으로 전송되었습니다.<br> 곧 연락드리겠습니다.<br> 감사합니다.",
  "formError": "메시지를 보낼 수 없습니다. 다시 시도해 주세요.",
  "projects3D": {
    "title": "저비용 프로젝트",
    "subtitle": "우리의 인터랙티브 고급 목공 제안과 그것이 우리의 디자인 가치와 어떻게 관련되는지 탐색해 보세요.",
    "viewBtn": "프로젝트 보기"
  },
  "footer": "Standarte. 전시 부스 디자인, 제작 및 설치."
},
  ja: {
    faqsTitle: 'よくあるご質問', successStoriesTitle: '導入事例', featuredProjectsIntro: 'オーダーメイドの木工と展示ブースデザインの注目プロジェクト：',
    nav: { services: 'サービス', custom: 'ギャラリー', noticias: 'ブログ', contact: 'お問い合わせ', language: '言語' },
    seoTitle: 'Standarte | スペイン・ポルトガルの展示会ブース施工会社',
    seoDescription: 'スペインおよび国際的な展示会向けに、展示ブースをプロフェッショナルかつオーダーメイドで設計・製作・施工します。',
    heroTitle: 'スペインの展示ブース製作工房',
    heroSubtitle: '高品質な施工',
    servicesTitle: 'サービス',
    services: [
      ['設計とエンジニアリング', '専門チームがお客様のプロジェクトのご要望を細部まで把握し、それをオーダーメイドの3Dプロトタイプに反映します。製作を開始する前にご確認・ご検討いただけます。プロトタイプの画像は完成品を100%忠実に再現します。'],
      ['ブース施工', '施工工程では、仮設建築に適した専用素材と最新の組立技術を用います。これにより、一目で品質が伝わる完璧な仕上がりをご提供します。'],
      ['設営と各種検査', 'すべて当社にお任せください。展示会初日に安心してお越しいただくだけで、ブース、ケータリング、印刷物など、商談を始める準備がすべて整っています。']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: '個性的な空間のためのスペーステント',
      color: 'カラー',
      finish: '仕上げ：',
      descriptionTitle: '説明：',
      description: '4つのボディで構成される小型スタンドです。<br>組立はとても簡単で、工具は必要ありません。<br>自由に構成できる連結可能な製品です。',
      qualitiesTitle: '特長：',
      materials: '素材',
      materialsValue: 'MDF、ガラス、建築用テキスタイル、金属',
      finishValue: 'エアブラシ塗装＋ラッカー',
      partsTitle: 'パーツ：',
      parts: '1 = バックライト付きグラフィック <br>2 = 照明付き棚 <br>3 = カスタムロゴ <br>4 = 収納 <br>5 = 扉付きカウンター',
      priceTitle: '価格：',
      priceText: '照明とカスタムグラフィック付き <br> 4モジュールセット',
      chooseFinish: '価格を表示するには<br>仕上げをお選びください。',
      choose: '価格を表示するには<br>仕上げをお選びください。',
      partsLabel: 'パーツ',
      price: '価格',
      qualities: '特長',
      pause: '一時停止',
      play: '再生',
      visitWeb: '専用サイトを見る',
      videos: [
        { src: '/img/video_standrte_presentacion_empresa.mp4', title: '企業向けプレゼンテーション', subtitle: '企業ブースのための当社の工房と製作工程。' },
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: '歴史的空間での展示会', subtitle: '伝統的・歴史的な場所に配慮した設計とエンジニアリング。' },
        { src: '/img/video_standarte_andalucia.mp4', title: '記念イベント', subtitle: 'ワイナリーや特別なイベントのためのオーダーメイドの上質な空間。' },
        { src: '/img/video_standarte_feria_verano.mp4', title: '大型屋外展示会', subtitle: '大規模な設営とプレミアムな高耐久テント。' }
      ]
    },
    citiesIntro: 'スペインとポルトガルの主要都市で開催される展示会やイベント向けに、展示ブースの設計・製作・施工を行っています。',
    customTitle: 'ギャラリー',
    customSubtitle: '主な組立技術別に分類しています。',
    filters: { all: 'すべて', textil: 'テキスタイル', madera: '木材' },
    counters: { projects: 'プロジェクト', clients: 'クライアント', countries: '国', fairs: '展示会' },
    teamTitle: 'チーム',
    teamSubtitle: '私たちは建築家、施工士、デコレーター、照明技術者などで構成される多分野のチームです。各プロジェクトのあらゆるニーズに総合的にお応えします。ご不明な点がございましたら、お気軽にお問い合わせください。近いうちにお会いできることを楽しみにしております。',
    teamRoles: ['クリエイティブ', '管理', '工房', 'コーディネーション'],
    contactTitle: '24時間でお見積り',
    contactNotice: 'ご要望をお聞かせください。24時間以内に、細部まで作り込んだ3Dデザインと、非常に魅力的な価格のご提案をお届けします。',
    form: { name: 'お名前', company: '会社名', phone: '電話番号', email: 'メールアドレス', fair: '展示会', location: '都市・国', meters: '平方メートル', floor: '床の詳細', woodFloor: '木製上げ床', carpetPlatform: 'カーペット上げ床', carpet: 'カーペット', spaceDistribution: '空間レイアウト', reception: '受付エリア', bar: 'バーエリア', storage: '倉庫', product: '製品展示', openMeeting: 'オープン商談エリア', closedMeeting: '個室商談エリア', audiovisual: '音響映像', led: 'LEDスクリーン', projector: 'プロジェクター', budget: '想定予算', description: '説明', privacy: 'プライバシーポリシーに同意します', send: '送信' },
    legal: { privacy: 'プライバシーポリシー', legalNotice: '法的通知', cookies: 'クッキー' },
    legalText: {
      privacy: '<p>Standarteは、フォームから送信されたデータを、展示ブースのプロジェクトに関する情報のご請求、お見積り、ご連絡にのみ使用します。</p><p>これらのデータをご請求と無関係な目的で使用することはありません。アクセス、訂正、削除をご希望の場合は、info@standarte.es までご連絡ください。</p>',
      legalNotice: '<p>本ウェブサイトはStandarteに帰属します。コンテンツ、画像、テキストは商業的・情報提供を目的としており、許可なく複製することはできません。</p><p>本サイトのご利用は、関連法令を遵守した責任あるブラウジングを前提とします。</p>',
      cookies: '<p>本ウェブサイトの動作に必要なクッキーを使用し、お客様の同意がある場合に限り、Google AdsまたはGoogle Analyticsの測定・広告クッキーを使用します。</p><p>これらの目的は、クッキーバナーから承諾・拒否・設定できます。フッターの「クッキー設定」リンクからいつでも同意を変更または撤回できます。</p><p>お客様が許可された場合、Googleは広告の測定とパーソナライズのために個人データを処理することがあります。詳細：https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'メッセージが正常に送信されました。<br> まもなくご連絡いたします。<br> ありがとうございます。',
    formError: 'メッセージを送信できませんでした。もう一度お試しください。',
    projects3D: {
      title: 'ローコストプロジェクト',
      subtitle: '当社のインタラクティブな上質木工の提案と、それが私たちのデザイン哲学とどのように結びつくかをご覧ください。',
      viewBtn: 'プロジェクトを見る'
    },
    footer: 'Standarte。展示ブースの設計・製作・施工。'
  }
};

export const cityData = {
  madrid: {
    city: { es: 'Madrid', en: 'Madrid', de: 'Madrid', zh: '马德里', hi: 'मैड्रिड', pt: 'Madrid', fr: 'Madrid', it: 'Madrid', ko: '마드리드', ja: 'マドリード' },
    content: {
      ja: {
        intro: 'マドリードはスペインの展示会活動の中核を担う都市です。Standarteは20年の経験と自社工房を強みに、技術設計・製作・物流・設営・各種検査、そして開催前の現地コーディネーションまで、一貫した万全のプロセスでマドリードの展示ブースを手がけます。',
        detail: ''
      },
      es: {
        intro: 'Madrid concentra una parte esencial de la actividad ferial en España. En Standarte desarrollamos stands en Madrid con 20 años de experiencia y un taller propio que garantiza un proceso impecable: diseño técnico, producción, logística, montaje, validaciones y coordinación in situ antes de la apertura del evento.',
        detail: ''
      },
      en: {
        intro: 'Madrid concentrates an essential part of trade fair activity in Spain. At Standarte, backed by 20 years of experience and our own workshop, we develop exhibition stands in Madrid through a complete process: technical design, production, logistics, installation, validation, and on-site coordination before the event opens.',
        detail: 'This service is aimed at communication agencies and brands that need reliable execution, careful finishes, and a stand ready for professional visitors.'
      },
      de: {
        intro: 'Madrid konzentriert einen wesentlichen Teil der Messeaktivitäten in Spanien. Bei Standarte, gestützt auf 20 Jahre Erfahrung und unsere eigene Werkstatt, realisieren wir Messestände in Madrid mit einem vollständigen Ablauf: technisches Design, Produktion, Logistik, Montage, Validierung und Koordination vor Ort.',
        detail: 'Dieser Service richtet sich an Kommunikationsagenturen und Marken, die eine zuverlässige Ausführung, sorgfältige Oberflächen und einen professionell vorbereiteten Stand benötigen.'
      },
      pt: {
        intro: 'Madrid concentra uma parte essencial da atividade em feiras de Espanha. Na Standarte, apoiados nos nossos 20 anos de experiência e oficina própria, desenvolvemos stands de exposição em Madrid através de um processo completo: design técnico, produção, logística, instalação, validação e coordenação no local.',
        detail: 'Este serviço é direcionado a agências de comunicação e marcas que necessitam de execução fiável, acabamentos cuidadosos e um stand pronto para os visitantes profissionais.'
      },
      fr: {
        intro: 'Madrid concentre une part essentielle de l\'activité des salons en Espagne. Chez Standarte, forts de 20 ans d\'expérience et de notre propre atelier, nous développons des stands d\'exposition à Madrid selon un processus complet : conception, production, logistique, installation, validation et coordination sur place.',
        detail: 'Ce service s\'adresse aux agences de communication et aux marques ayant besoin d\'une exécution fiable, de finitions soignées et d\'un stand prêt pour les visiteurs professionnels.'
      },
      it: {
        intro: 'Madrid concentra una parte essenziale dell\'attività fieristica in Spagna. In Standarte, forti dei nostri 20 anni di esperienza e del nostro laboratorio di proprietà, sviluppiamo stand a Madrid attraverso un processo completo: progettazione tecnica, produzione, logistica, montaggio, convalida e coordinamento in loco.',
        detail: 'Questo servizio è rivolto ad agenzie di comunicazione e marchi che necessitano di un\'esecuzione affidabile, finiture curate e uno stand pronto per i visitatori professionali.'
      },
      zh: {
        intro: '马德里集中了西班牙贸易展览活动的重要部分。在 Standarte，凭借 20 年的丰富经验和自己的工厂，我们通过完整的过程在马德里开发展览摊位：技术设计，生产，物流，安装，验证和活动开始前的现场协调。',
        detail: '此服务针对需要可靠执行、精细外观和为专业访客准备好展台的通信机构和品牌。'
      },
      hi: {
        intro: 'मैड्रिड स्पेन में व्यापार मेला गतिविधि का एक आवश्यक हिस्सा केंद्रित करता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, हम मैड्रिड में एक पूरी प्रक्रिया के माध्यम से प्रदर्शनी स्टैंड विकसित करते हैं: तकनीकी डिजाइन, उत्पादन, रसद, स्थापना, सत्यापन, और घटना खुलने से पहले ऑन-साइट समन्वय।',
        detail: 'यह सेवा उन संचार एजेंसियों और ब्रांडों के लिए है जिन्हें विश्वसनीय निष्पादन, सावधानीपूर्वक परिष्करण और पेशेवर आगंतुकों के लिए तैयार स्टैंड की आवश्यकता है।'
      },
      ko: {
        intro: '마드리드는 스페인의 무역 박람회 활동의 핵심적인 부분을 집중시킵니다. Standarte에서는 20년의 경험과 자체 공장의 지원을 받아 완전한 과정을 통해 마드리드에 전시 부스를 개발합니다: 기술 디자인, 생산, 물류, 설치, 검증 및 이벤트 시작 전 현장 조정.',
        detail: '이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 맞이할 준비가 된 부스가 필요한 커뮤니케이션 대행사와 브랜드를 대상으로 합니다.'
      }
    }
  },
  barcelona: {
    city: { es: 'Barcelona', en: 'Barcelona', de: 'Barcelona', zh: '巴塞罗那', hi: 'बार्सिलोना', pt: 'Barcelona', fr: 'Barcelone', it: 'Barcellona', ko: '바르셀로나', ja: 'バルセロナ' },
    content: {
      ja: {
        intro: 'MWCやISEといった世界的イベントの開催地であるバルセロナは、卓越した製作水準が求められます。Standarteは20年の経験と自社工房を活かし、フィラ・デ・バルセロナでインパクトの高いブースを設計・製作・設営します。',
        detail: ''
      },
      es: {
        intro: 'Como sede de eventos mundiales como el MWC o ISE, Barcelona exige un nivel de producción sobresaliente. En Standarte, con 20 años de experiencia y taller propio, diseñamos, fabricamos y montamos stands de alto impacto en Fira de Barcelona.',
        detail: ''
      },
      en: {
        intro: 'As the venue for global events like MWC and ISE, Barcelona demands outstanding production levels. At Standarte, with 20 years of experience and our own workshop, we design, manufacture, and assemble high-impact stands at Fira de Barcelona.',
        detail: ''
      },
      de: {
        intro: 'Als Austragungsort globaler Events wie MWC und ISE erfordert Barcelona herausragende Produktionsstandards. Bei Standarte entwerfen, fertigen und montieren wir mit 20 Jahren Erfahrung und eigener Werkstatt wirkungsvolle Messestände in der Fira de Barcelona.',
        detail: ''
      },
      pt: {
        intro: 'Como sede de eventos globais como o MWC ou ISE, Barcelona exige um nível de produção excecional. Na Standarte, com 20 anos de experiência e oficina própria, desenhamos, fabricamos e montamos stands de grande impacto na Fira de Barcelona.',
        detail: ''
      },
      fr: {
        intro: 'En tant qu\'hôte d\'événements mondiaux comme le MWC ou l\'ISE, Barcelone exige un niveau de production exceptionnel. Chez Standarte, avec 20 ans d\'expérience et notre propre atelier, nous concevons, fabriquons et montons des stands à fort impact à la Fira de Barcelona.',
        detail: ''
      },
      it: {
        intro: 'In quanto sede di eventi globali come MWC o ISE, Barcellona richiede un livello di produzione eccezionale. In Standarte, con 20 anni di esperienza e un laboratorio di proprietà, progettiamo, produciamo e montiamo stand di grande impatto presso la Fira de Barcelona.',
        detail: ''
      },
      zh: {
        intro: '作为 MWC 和 ISE 等全球赛事的举办地，巴塞罗那需要出色的制作水平。在 Standarte，凭借 20 年的经验和自己的工厂，我们在巴塞罗那会展中心设计、制造和组装具有高影响力的展台。',
        detail: ''
      },
      hi: {
        intro: 'MWC और ISE जैसे वैश्विक आयोजनों के स्थल के रूप में, बार्सिलोना को उत्कृष्ट उत्पादन स्तर की आवश्यकता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के साथ, हम फिरा डी बार्सिलोना में उच्च प्रभाव वाले स्टैंड डिजाइन, निर्माण और इकट्ठा करते हैं।',
        detail: ''
      },
      ko: {
        intro: 'MWC 및 ISE와 같은 글로벌 이벤트의 개최지로서 바르셀로나는 뛰어난 생산 수준을 요구합니다. Standarte에서는 20년의 경험과 자체 공장을 바탕으로 Fira de Barcelona에서 큰 영향을 미치는 부스를 설계, 제조 및 조립합니다.',
        detail: ''
      }
    }
  },
  bilbao: {
    city: { es: 'Bilbao', en: 'Bilbao', de: 'Bilbao', zh: '毕尔巴鄂', hi: 'बिलबाओ', pt: 'Bilbau', fr: 'Bilbao', it: 'Bilbao', ko: '빌바오', ja: 'ビルバオ' },
    content: {
      ja: {
        intro: 'ビルバオ展示センター（BEC）は最も革新的な会場のひとつです。当社の物流ネットワーク、20年の経験、大規模な自社工房により、BIEMHをはじめとする主要展示会で完璧なオーダーメイドブースの設営を保証します。',
        detail: ''
      },
      es: {
        intro: 'Bilbao Exhibition Centre (BEC) es uno de los recintos más innovadores. Gracias a nuestra red logística, 20 años de experiencia y un gran taller propio, garantizamos montajes de stands de diseño impecable para ferias líderes como BIEMH.',
        detail: ''
      },
      en: {
        intro: 'Bilbao Exhibition Centre (BEC) is one of the most innovative venues. Thanks to our logistics network, 20 years of experience, and a large own workshop, we guarantee flawless custom stand assembly for leading fairs like BIEMH.',
        detail: ''
      },
      de: {
        intro: 'Das Bilbao Exhibition Centre (BEC) ist einer der innovativsten Veranstaltungsorte. Dank unseres Logistiknetzwerks, 20 Jahren Erfahrung und einer großen eigenen Werkstatt garantieren wir tadellose Messestandmontagen für Leitmessen wie die BIEMH.',
        detail: ''
      },
      pt: {
        intro: 'O Bilbao Exhibition Centre (BEC) é um dos recintos mais inovadores. Graças à nossa rede logística, 20 anos de experiência e uma grande oficina própria, garantimos a montagem de stands de design impecável para feiras líderes como a BIEMH.',
        detail: ''
      },
      fr: {
        intro: 'Le Bilbao Exhibition Centre (BEC) est l\'un des lieux les plus innovants. Grâce à notre réseau logistique, 20 ans d\'expérience et un grand atelier propre, nous garantissons des montages de stands impeccables pour des salons majeurs comme BIEMH.',
        detail: ''
      },
      it: {
        intro: 'Il Bilbao Exhibition Centre (BEC) è uno dei poli espositivi più innovativi. Grazie alla nostra rete logistica, a 20 anni di esperienza e a un grande laboratorio di proprietà, garantiamo l\'allestimento di stand dal design impeccabile per fiere leader come BIEMH.',
        detail: ''
      },
      zh: {
        intro: '毕尔巴鄂展览中心 (BEC) 是最具创新性的场馆之一。凭借我们的物流网络、20 年的经验和自有大型工厂，我们为 BIEMH 等领先的展览会提供完美的定制展台搭建。',
        detail: ''
      },
      hi: {
        intro: 'बिलबाओ प्रदर्शनी केंद्र (BEC) सबसे नवीन स्थानों में से एक है। हमारे रसद नेटवर्क, 20 वर्षों के अनुभव और एक बड़े अपने कारखाने के लिए धन्यवाद, हम BIEMH जैसे प्रमुख मेलों के लिए निर्दोष कस्टम स्टैंड असेंबली की गारंटी देते हैं।',
        detail: ''
      },
      ko: {
        intro: '빌바오 전시 센터(BEC)는 가장 혁신적인 장소 중 하나입니다. 당사의 물류 네트워크, 20년의 경험 및 대규모 자체 공장 덕분에 당사는 BIEMH와 같은 주요 박람회에 완벽한 맞춤형 부스 조립을 보장합니다.',
        detail: ''
      }
    }
  },
  lisboa: {
    city: { es: 'Lisboa', en: 'Lisbon', de: 'Lissabon', zh: '里斯本', hi: 'लिस्बन', pt: 'Lisboa', fr: 'Lisbonne', it: 'Lisbona', ko: '리스본', ja: 'リスボン' },
    content: {
      ja: {
        intro: '自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはリスボンの展示ブースを、設計・製作・物流・設営、そして会場での最終検査まで各工程を完全に管理して開発します。',
        detail: '代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。'
      },
      es: {
        intro: 'Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte desarrolla stands en Lisboa garantizando control total sobre cada fase: diseño, fabricación, logística, instalación y validaciones finales en el recinto.',
        detail: 'Ofrecemos a agencias y expositores directos la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional.'
      },
      en: {
        intro: 'With 20 years of experience building temporary architecture from our own workshop, Standarte develops exhibition stands in Lisbon guaranteeing total control over each phase: design, production, logistics, installation, and final validations on-site.',
        detail: 'We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail.'
      },
      de: {
        intro: 'Mit 20 Jahren Erfahrung in der temporären Architektur, realisiert in unserer eigenen Werkstatt, entwickelt Standarte Messestände in Lissabon und garantiert volle Kontrolle über jede Phase: Design, Produktion, Logistik, Montage und Endabnahmen vor Ort.',
        detail: 'Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit.'
      },
      pt: {
        intro: 'Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte desenvolve stands em Lisboa garantindo o controlo total sobre cada fase: design, fabrico, logística, instalação e validações finais no recinto.',
        detail: 'Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes.'
      },
      fr: {
        intro: 'Avec 20 ans d\'expérience dans l\'architecture éphémère depuis notre propre atelier, Standarte développe des stands d\'exposition à Lisbonne en garantissant un contrôle total : conception, fabrication, logistique, installation et validations.',
        detail: 'Nous offrons aux agences et aux exposants la tranquillité d\'esprit d\'un montage sans surprise et une attention exceptionnelle.'
      },
      it: {
        intro: 'Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte sviluppa stand a Lisbona garantendo il controllo totale su ogni fase: progettazione, produzione, logistica, installazione e collaudi.',
        detail: 'Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un\'eccezionale attenzione ai dettagli.'
      },
      zh: {
        intro: '凭借在我们自己的工厂建设临时建筑的 20 年经验，Standarte 在里斯本开发展览摊位，保证对每个阶段的全面控制：设计，生产，物流，安装和现场最终验证。',
        detail: '我们为机构和直接参展商提供无意外的装配安全感以及对细节的卓越关注。'
      },
      hi: {
        intro: 'हमारे अपने कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, स्टैंडार्ट लिस्बन में प्रदर्शनी स्टैंड विकसित करता है जो प्रत्येक चरण पर कुल नियंत्रण की गारंटी देता है: डिजाइन, उत्पादन, रसद, स्थापना, और ऑन-साइट अंतिम सत्यापन।',
        detail: 'हम एजेंसियों और प्रत्यक्ष प्रदर्शकों को बिना किसी आश्चर्य और असाधारण ध्यान के विधानसभा की मन की शांति प्रदान करते हैं।'
      },
      ko: {
        intro: '자체 공장에서 임시 건축물을 지은 20년의 경험을 바탕으로 Standarte는 리스본에 전시 부스를 개발하여 설계, 생산, 물류, 설치 및 현장 최종 검증 등 각 단계에 대한 완벽한 통제를 보장합니다.',
        detail: '우리는 대행사와 직접 전시자에게 놀라움 없는 조립의 평화로움과 세부 사항에 대한 탁월한 주의를 제공합니다.'
      }
    }
  },
  malaga: {
    city: { es: 'Málaga', en: 'Malaga', de: 'Málaga', zh: '马拉加', hi: 'मलागा', pt: 'Málaga', fr: 'Malaga', it: 'Malaga', ko: '말라가', ja: 'マラガ' },
    content: {
      ja: {
        intro: 'マラガは会議やテクノロジー系展示会の開催地として成長を続けています。20年の経験と最高水準の自社工房を持つStandarteが、FYCMAでのブースの技術設計・製作・設営・コーディネーションを担います。',
        detail: '当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの施工を保証します。'
      },
      es: {
        intro: 'El crecimiento de Málaga como destino de congresos y ferias tecnológicas es imparable. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en FYCMA.',
        detail: 'Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama.'
      },
      en: {
        intro: 'Malaga\'s growth as a destination for congresses and technological fairs is unstoppable. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at FYCMA.',
        detail: 'Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes.'
      },
      de: {
        intro: 'Das Wachstum von Málaga als Ziel für Kongresse und Technologiemessen ist unaufhaltsam. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei FYCMA.',
        detail: 'Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen.'
      },
      pt: {
        intro: 'O crescimento de Málaga como destino para congressos e feiras tecnológicas é imparável. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na FYCMA.',
        detail: 'A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência.'
      },
      fr: {
        intro: 'La croissance de Malaga en tant que destination pour les congrès et les salons technologiques est imparable. Avec 20 ans d\'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l\'installation des stands à FYCMA.',
        detail: 'Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme.'
      },
      it: {
        intro: 'La crescita di Malaga come destinazione per congressi e fiere tecnologiche è inarrestabile. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l\'installazione e il coordinamento degli stand presso FYCMA.',
        detail: 'Il nostro team garantisce ai marchi aziendali e alle agenzie creative un\'esecuzione solida, puntuale e con finiture di alto livello.'
      },
      zh: {
        intro: '马拉加作为大会和技术展览目的地的增长是势不可挡的。凭借 20 年的丰富经验和我们自己顶级的工厂，Standarte 承担了 FYCMA 展台的技术设计、生产、安装和协调。',
        detail: '我们的团队向企业品牌和创意机构保证，执行稳健、准时，并具有高端效果。'
      },
      hi: {
        intro: 'मलागा की कांग्रेस और तकनीकी मेलों के गंतव्य के रूप में वृद्धि अजेय है। 20 वर्षों के अनुभव और एक शीर्ष-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट FYCMA में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।',
        detail: 'हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।'
      },
      ko: {
        intro: '총회 및 기술 박람회의 목적지로서의 말라가의 성장은 막을 수 없습니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 FYCMA에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.',
        detail: '우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다.'
      }
    }
  },
  badajoz: {
    city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz', ko: '바다호스', ja: 'バダホス' },
    content: {
      ja: {
        intro: 'バダホスとエストレマドゥーラ地方は、伝統ある催事を擁する活気あふれる展示会市場です。Standarteは20年の経験と自社工房を強みに、IFEBAやFEVALといった主要会場でブースを設計・設営します。',
        detail: '優れた物流効率により迅速に対応し、コストを最適化しながら、AGROEXPOやFECIEXなどの重要な催事で完璧なブースを保証します。'
      },
      es: {
        intro: 'Badajoz y Extremadura representan un mercado ferial dinámico con eventos de gran tradición. En Standarte diseñamos y montamos stands con 20 años de experiencia y taller propio en recintos de referencia como IFEBA y FEVAL.',
        detail: 'Nuestra eficiencia logística nos permite responder con rapidez, optimizando costes y garantizando un stand impecable para citas clave como AGROEXPO o FECIEX.'
      },
      en: {
        intro: 'Badajoz and Extremadura represent a highly active ferial hub with deep-rooted events. At Standarte, backed by 20 years of experience and our own workshop, we design and assemble stands in key regional venues such as IFEBA and FEVAL.',
        detail: 'Our logistics efficiency allows us to deliver quick solutions, optimize costs, and guarantee a flawless stand presence for major events like AGROEXPO or FECIEX.'
      },
      de: {
        intro: 'Badajoz und die Region Extremadura sind ein dynamischer Messemarkt mit traditionsreichen Veranstaltungen. Standarte entwirft und montiert mit 20 Jahren Erfahrung und eigener Werkstatt hochwertige Messestände an führenden Standorten wie IFEBA und FEVAL.',
        detail: 'Unsere logistische Effizienz ermöglicht uns schnelle Reaktionszeiten und optimierte Kosten für einen makellosen Stand bei wichtigen Messen wie AGROEXPO.'
      },
      pt: {
        intro: 'Badajoz e a Extremadura representam um mercado de feiras dinâmico com eventos de grande tradição. Na Standarte concebemos e montamos stands com 20 anos de experiência e oficina própria em recintos de referência como IFEBA e FEVAL.',
        detail: 'A nossa eficiência logística permite-nos responder rapidamente, otimizando custos e garantindo um stand impecável para feiras chave como a AGROEXPO.'
      },
      fr: {
        intro: 'Badajoz et l\'Estrémadure représentent un marché dynamique avec des événements de grande tradition. Nous concevons et montons des stands avec 20 ans d\'expérience et un propre atelier dans des lieux clés comme IFEBA et FEVAL.',
        detail: 'Notre efficacité logistique nous permet de répondre rapidement, d\'optimiser les coûts et de garantir un stand impeccable pour des événements majeurs comme AGROEXPO.'
      },
      it: {
        intro: 'Badajoz e l\'Estremadura rappresentano un mercato fieristico dinamico con eventi di grande tradizione. Progettiamo e allestiamo stand con 20 anni di esperienza e un laboratorio di proprietà in centri di riferimento come IFEBA e FEVAL.',
        detail: 'La nostra efficienza logistica ci consente di rispondere rapidamente, ottimizzare i costi e garantire uno stand impeccabile per appuntamenti chiave come AGROEXPO.'
      },
      zh: {
        intro: '巴达霍斯和埃斯特雷马杜拉代表了一个充满活力且历史悠久的展会市场。凭借 20 年的经验和自己的工厂，我们在该地区的核心展馆（如 IFEBA 和 FEVAL）设计和组装展台。',
        detail: '我们的物流效率使我们能够快速响应、优化成本，并确保在 AGROEXPO 或 FECIEX 等重点展会中为您呈现完美的品牌展台。'
      },
      hi: {
        intro: 'बादाहोज़ और एक्स्ट्रीमादुरा गहरी जड़ें वाले आयोजनों के साथ एक अत्यधिक सक्रिय फेशियल हब का प्रतिनिधित्व करते हैं। 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, स्टैंडार्ट में, हम IFEBA और FEVAL जैसे प्रमुख क्षेत्रीय स्थानों में स्टैंड डिजाइन और इकट्ठा करते हैं।',
        detail: 'हमारी रसद दक्षता हमें त्वरित समाधान देने, लागत का अनुकूलन करने और एग्रोएक्सपीओ या FECIEX जैसे प्रमुख आयोजनों के लिए एक निर्दोष स्टैंड उपस्थिति की गारंटी देने की अनुमति देती है।'
      },
      ko: {
        intro: '바다호스와 엑스트레마두라는 뿌리 깊은 이벤트를 갖춘 매우 활동적인 행사 허브를 대표합니다. 20년의 경험과 자체 공장을 바탕으로 Standarte에서는 IFEBA 및 FEVAL과 같은 주요 지역 행사장에서 스탠드를 디자인하고 조립합니다.',
        detail: '물류 효율성을 통해 당사는 빠른 솔루션을 제공하고 비용을 최적화하며 AGROEXPO 또는 FECIEX와 같은 주요 이벤트에서 완벽한 스탠드 존재를 보장할 수 있습니다.'
      }
    }
  },
  sevilla: {
    city: { es: 'Sevilla', en: 'Seville', de: 'Sevilla', zh: '塞维利亚', hi: 'सेविले', pt: 'Sevilha', fr: 'Séville', it: 'Siviglia', ko: '세비야', ja: 'セビリア' },
    content: {
      ja: {
        intro: 'セビリアは南ヨーロッパで最も重要な展示会・会議の開催地のひとつです。20年の経験と最高水準の自社工房を持つStandarteが、FIBES IおよびFIBES IIでのブースの技術設計・製作・設営・コーディネーションを担います。',
        detail: '当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの施工を保証します。'
      },
      es: {
        intro: 'Sevilla es uno de los destinos feriales y de congresos más importantes del sur de Europa. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en FIBES I y FIBES II.',
        detail: 'Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama.'
      },
      en: {
        intro: 'Seville is one of the most important trade show and congress destinations in southern Europe. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at FIBES I and FIBES II.',
        detail: 'Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes.'
      },
      de: {
        intro: 'Sevilla ist eines der wichtigsten Messe- und Kongressziele in Südeuropa. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei FIBES I und FIBES II.',
        detail: 'Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen.'
      },
      pt: {
        intro: 'Sevilha é um dos destinos de feiras e congressos mais importantes do sul da Europa. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na FIBES I e FIBES II.',
        detail: 'A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência.'
      },
      fr: {
        intro: 'Séville est l\'une des destinations de salons et de congrès les plus importantes du sud de l\'Europe. Avec 20 ans d\'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l\'installation des stands à FIBES I et FIBES II.',
        detail: 'Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme.'
      },
      it: {
        intro: 'Siviglia è una delle destinazioni fieristiche e congressuali più importanti del sud Europa. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l\'installazione e il coordinamento degli stand presso FIBES I e FIBES II.',
        detail: 'Il nostro team garantisce ai marchi aziendali e alle agenzie creative un\'esecuzione solida, puntuale e con finiture di alto livello.'
      },
      zh: {
        intro: '塞维利亚是欧洲南部最重要的展览和会议目的地之一。凭借 20 年的丰富经验 and 我们自己顶级的工厂，Standarte 承担了 FIBES I 和 FIBES II 展台的技术设计、生产、安装和协调。',
        detail: '我们的团队向企业品牌和创意机构保证，执行稳健、准时，并具有高端效果。'
      },
      hi: {
        intro: 'सेविले दक्षिणी यूरोप में सबसे महत्वपूर्ण व्यापार शो और कांग्रेस स्थलों में से un एक है। 20 वर्षों के अनुभव और एक tops-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट FIBES I और FIBES II में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।',
        detail: 'हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।'
      },
      ko: {
        intro: '세비야는 남유럽에서 가장 중요한 박람회 및 총회 목적지 중 하나입니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 FIBES I 및 FIBES II에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.',
        detail: '우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다.'
      }
    }
  },
  ciudad_real: {
    city: { es: 'Ciudad Real', en: 'Ciudad Real', de: 'Ciudad Real', zh: '雷阿尔城', hi: 'स्यूदाদ रियल', pt: 'Ciudad Real', fr: 'Ciudad Real', it: 'Ciudad Real', ko: '시우다드레알', ja: 'シウダー・レアル' },
    content: {
      ja: {
        intro: 'シウダー・レアルは、スペイン中部で最も近代的かつ急成長している会議・展示インフラのひとつ、IFEDI展示場を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、IFEDIでのブースの技術設計・製作・設営・コーディネーションを担います。',
        detail: '当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの施工を保証します。'
      },
      es: {
        intro: 'Ciudad Real cuenta con una de las infraestructuras de congresos y ferias más modernas y de mayor crecimiento en el centro de España: el recinto ferial IFEDI. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en IFEDI.',
        detail: 'Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama.'
      },
      en: {
        intro: 'Ciudad Real boasts one of the most modern and fastest-growing congress and exhibition infrastructures in central Spain: the IFEDI venue. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at IFEDI.',
        detail: 'Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes.'
      },
      de: {
        intro: 'Ciudad Real verfügt über eine der modernsten und am schnellsten wachsenden Kongress- und Messeinfrastrukturen in Zentralspanien: das Messegelände IFEDI. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei IFEDI.',
        detail: 'Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen.'
      },
      pt: {
        intro: 'Ciudad Real conta com uma das infraestruturas de congressos e feiras mais modernas e de maior crescimento no centro de Espanha: o recinto ferial IFEDI. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na IFEDI.',
        detail: 'A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência.'
      },
      fr: {
        intro: 'Ciudad Real dispose de l\'une des infrastructures de congrès et de salons les plus modernes et les plus dynamiques du centre de l\'Espagne : le parc des expositions IFEDI. Avec 20 ans d\'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l\'installation des stands à IFEDI.',
        detail: 'Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme.'
      },
      it: {
        intro: 'Ciudad Real vanta una delle infrastrutture per congressi e fiere più moderne e in rapida crescita del centro della Spagna: il complesso fieristico IFEDI. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l\'installazione e il coordinamento degli stand presso IFEDI.',
        detail: 'Il nostro team garantisce ai marchi aziendali e alle agenzie creative un\'esecuzione solida, puntuale e con finiture di alto livello.'
      },
      zh: {
        intro: '雷阿尔城拥有西班牙中部最现代且增长最快的会议 and 展览基础设施之一：IFEDI 展览馆。凭借 20 年的丰富经验 and 我们自己顶级的工厂，Standarte 承担了 IFEDI 展台的技术设计、生产、安装 and 协调。',
        detail: '我们的团队向企业品牌 and 创意机构保证，执行稳健、准时，并具有高端效果。'
      },
      hi: {
        intro: 'स्यूदाद रियल मध्य स्पेन में सबसे आधुनिक और सबसे तेजी से बढ़ते कांग्रेस और प्रदर्शनी बुनियादी ढांचे में से एक है: IFEDI स्थल। 20 वर्षों के अनुभव और एक tops-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट IFEDI में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।',
        detail: 'हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।'
      },
      ko: {
        intro: '시우다드레알은 스페인 중부에서 가장 현대적이고 빠르게 성장하는 회의 및 전시 인프라 중 하나인 IFEDI 전시장을 보유하고 있습니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 IFEDI에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.',
        detail: '우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다.'
      }
    }
  },
  montaje_zafra: {
    city: { es: 'Zafra', en: 'Zafra', de: 'Zafra', zh: '萨夫拉', hi: 'ज़फ़रा', pt: 'Zafra', fr: 'Zafra', it: 'Zafra', ko: '사프라', ja: 'サフラ' },
    content: {
      ja: {
        intro: 'サフラはイベリア半島南西部における畜産・農業産業の中心地であり、1453年から続く歴史あるサフラ国際畜産見本市を開催しています。',
        detail: '商業館AおよびBから、大規模な屋外機械展示エリアまで、オーダーメイドの上質な木工ブースを設計・設営します。'
      },
      es: {
        intro: 'Zafra es el epicentro de la ganadería y la agroindustria en el suroeste peninsular, celebrando la histórica Feria Internacional Ganadera de Zafra desde 1453.',
        detail: 'Diseñamos y montamos stands de alta carpintería a medida tanto en sus pabellones comerciales A y B como en las grandes áreas exteriores de maquinaria.'
      },
      en: {
        intro: 'Zafra is the farming and agro-industrial epicentre of southwestern Spain, hosting the historic Zafra International Livestock Fair since 1453.',
        detail: 'We design and assemble custom premium woodwork stands both in its commercial halls A and B and in the large outdoor machinery exhibition areas.'
      },
      pt: {
        intro: 'Zafra é o epicentro da pecuária e da agroindústria no sudoeste peninsular, acolhendo a histórica Feira Internacional de Zafra desde 1453.',
        detail: 'Desenhamos e montamos stands de carpintaria premium à medida tanto nos seus pavilhões comerciais A e B como nas grandes áreas exteriores de maquinaria.'
      },
      de: {
        intro: 'Zafra ist das agrarindustrielle Zentrum im Südwesten Spaniens und beheimatet die historische Internationale Landwirtschaftsmesse von Zafra seit 1453.',
        detail: 'Wir entwerfen und montieren hochwertige Messestände in den kommerziellen Hallen A und B sowie im großen Freigelände für Maschinen.'
      },
      fr: {
        intro: 'Zafra est l\'épicentre de l\'élevage et de l\'agro-industrie dans le sud-ouest de l\'Espagne, accueillant la foire internationale de Zafra depuis 1453.',
        detail: 'Nous concevons et montons des stands de menuiserie sur mesure dans les halls commerciaux A et B ainsi que dans les grandes zones extérieures.'
      },
      it: {
        intro: 'Zafra è l\'epicentro zootecnico e agroindustriale del sud-ovest della Spagna, sede della storica Fiera Internazionale del Bestiame di Zafra dal 1453.',
        detail: 'Progettiamo e allestiamo stand su misura in legno pregiato sia nei padiglioni commerciali A e B sia nelle grandi aree macchine all\'aperto.'
      },
      zh: {
        intro: '萨夫拉是西班牙西南部农业和畜牧业的中心，自1453年起举办历史悠久的萨夫拉国际畜牧业展览会。',
        detail: '我们在其A和B商业展馆以及大型室外机械展示区设计并组装定制的高端木工展台。'
      },
      hi: {
        intro: 'ज़फ़रा दक्षिण-पश्चिमी स्पेन का कृषि और पशुधन केंद्र है, जो 1453 से ऐतिहासिक ज़फ़रा अंतर्राष्ट्रीय पशुधन मेले की मेज़बानी कर रहा है।',
        detail: 'हम इसके वाणिज्यिक हॉल A and B और बड़े बाहरी मशीनरी प्रदर्शनी क्षेत्रों में कस्टम प्रीमियम लकड़ी के स्टैंड डिजाइन और इकट्ठा करते हैं।'
      },
      ko: {
        intro: '사프라는 스페인 남서부의 축산 및 농업 산업의 중심지로, 1453년부터 역사적인 사프라 국제 가축 박람회를 개최해 왔습니다.',
        detail: '우리는 상업 홀 A와 B 및 대규모 야외 기계 전시 구역 모두에서 맞춤형 프리미엄 목재 부스를 설계하고 조립합니다.'
      }
    }
  },
  montaje_don_benito: {
    city: { es: 'Don Benito', en: 'Don Benito', de: 'Don Benito', zh: '唐贝尼托', hi: 'डॉन बेनिटो', pt: 'Don Benito', fr: 'Don Benito', it: 'Don Benito', ko: '돈 베니토', ja: 'ドン・ベニート' },
    content: {
      ja: {
        intro: 'ドン・ベニートは、エストレマドゥーラの展示会機関FEVALの所在地であり、イベリア市場最大の農業・機械見本市Agroexpoを開催しています。',
        detail: '22,000m²の屋内展示館と、農業機械・精密農業向けの屋外エリアに、オーダーメイドの上質な木工ブースを製作します。'
      },
      es: {
        intro: 'Don Benito alberga FEVAL, la Institución Ferial de Extremadura, y acoge Agroexpo, el mayor punto de encuentro agrícola y de maquinaria del mercado ibérico.',
        detail: 'Construimos stands a medida de alta carpintería en sus 22.000 m² de pabellones cubiertos y en su zona exterior para maquinaria y agricultura de precisión.'
      },
      en: {
        intro: 'Don Benito hosts FEVAL, the Trade Fair Institution of Extremadura, and Agroexpo, the largest agricultural and machinery trade show in the Iberian market.',
        detail: 'We build custom woodwork stands in its 22,000 sqm of covered pavilions and its outdoor area for agricultural machinery and precision farming.'
      },
      pt: {
        intro: 'Don Benito abriga a FEVAL, a Instituição de Feiras da Extremadura, e acolhe a Agroexpo, o maior ponto de encontro agrícola e de maquinaria do mercado ibérico.',
        detail: 'Construímos stands de carpintaria à medida nos seus 22.000 m² de pavilhões cobertos e na sua área exterior para maquinaria e agricultura de precisão.'
      },
      de: {
        intro: 'Don Benito beherbergt FEVAL, die Messeinstitution von Extremadura, und veranstaltet Agroexpo, den größten landwirtschaftlichen Treffpunkt auf der Iberischen Halbinsel.',
        detail: 'Wir bauen maßgeschneiderte Messestände in den 22.000 m² überdachten Hallen sowie im Außenbereich für Maschinen und Präzisionslandwirtschaft.'
      },
      fr: {
        intro: 'Don Benito abrite FEVAL, l\'institution foirale d\'Estrémadure, et accueille Agroexpo, le plus grand salon agricole et de machines du marché ibérique.',
        detail: 'Nous construisons des stands sur mesure dans ses 22 000 m² de halls couverts et dans sa zone extérieure pour les machines de précision.'
      },
      it: {
        intro: 'Don Benito ospita la FEVAL, l\'istituzione fieristica dell\'Estremadura, e accoglie Agroexpo, il più grande incontro agricolo e di macchinari del mercato iberico.',
        detail: 'Costruiamo stand in legno su misura nei suoi 22.000 mq di padiglioni coperti e nella sua area esterna per macchine agricole e agricoltura di precisione.'
      },
      zh: {
        intro: '唐贝尼托是埃斯特雷马杜拉展览机构（FEVAL）的所在地，并举办伊比利亚市场最大的农业和机械贸易展Agroexpo。',
        detail: '我们在其22,000平方米的室内展馆以及用于展示农业机械和精准农业的室外区域建造定制的木工展台。'
      },
      hi: {
        intro: 'डॉन बेनिटो FEVAL (एक्स्ट्रीमादुra व्यापार मेला संस्थान) और एग्रोएक्सपो की मेजबानी करता है, जो इबेरियन बाजार में सबसे बड़ा कृषि और मशीनरी शो है।',
        detail: 'हम इसके 22,000 वर्ग मीटर के कवर पैवेलियन और कृषि मशीनरी और सटीक खेती के लिए इसके बाहरी क्षेत्र में कस्टम लकड़ी के स्टैंड बनाते हैं।'
      },
      ko: {
        intro: '돈 베니토는 엑스트레마두라 박람회 기관(FEVAL)의 소재지이며 이베리아 시장에서 가장 큰 농업 및 기계 박람회인 Agroexpo를 개최합니다.',
        detail: '우리는 22,000제곱미터의 실내 전시관과 농업 기계 및 정밀 농업을 위한 야외 공간에 맞춤형 목재 부스를 제작합니다.'
      }
    }
  },
  montaje_badajoz: {
    city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz', ko: '바다호스', ja: 'バダホス' },
    content: {
      ja: {
        intro: 'バダホスと展示場IFEBAは、ポルトガルとの国境貿易（ラ・ラヤ）の玄関口であり、FECIEXやFehisporといった主要な催事を開催しています。',
        detail: 'IFEBAの10,000m²の屋内展示館と広大な屋外エリアで、オーダーメイドの上質な木工プレミアムブースの設計・製作・設営を行います。'
      },
      es: {
        intro: 'Badajoz y su recinto ferial IFEBA son la puerta de entrada al comercio transfronterizo con Portugal (La Raya), celebrando certámenes líderes como FECIEX o Fehispor.',
        detail: 'Realizamos el diseño, fabricación y montaje de stands premium de carpintería a medida en los 10.000 m² cubiertos de IFEBA y sus amplios exteriores.'
      },
      en: {
        intro: 'Badajoz and its IFEBA exhibition centre are the gateway to cross-border trade with Portugal, hosting leading trade shows like FECIEX and Fehispor.',
        detail: 'We carry out the design, manufacture, and setup of premium custom woodwork stands in IFEBA\'s 10,000 sqm covered halls and its large outdoor areas.'
      },
      pt: {
        intro: 'Badajoz e o seu recinto de feiras IFEBA são a porta de entrada para o comércio transfronteiriço com Portugal, acolhendo certames líderes como FECIEX ou Fehispor.',
        detail: 'Realizamos o design, fabrico e montagem de stands premium de carpintaria nos 10.000 m² cobertos da IFEBA e nas suas amplas áreas exteriores.'
      },
      de: {
        intro: 'Badajoz und sein Messegelände IFEBA sind das Tor zum grenzüberschreitenden Handel mit Portugal und Austragungsort führender Messen wie FECIEX oder Fehispor.',
        detail: 'Wir entwerfen, fertigen und montieren Premium-Messestände in den 10.000 m² überdachten Hallen von IFEBA und auf dem großen Freigelände.'
      },
      fr: {
        intro: 'Badajoz et son parc des expositions IFEBA sont la porte d\'entrée du commerce transfrontalier avec le Portugal, accueillant des salons majeurs comme FECIEX ou Fehispor.',
        detail: 'Nous concevons, fabriquons et montons des stands de menuiserie haut de gamme dans les 10 000 m² couverts d\'IFEBA et ses vastes espaces extérieurs.'
      },
      it: {
        intro: 'Badajoz e il suo centro fieristico IFEBA sono la porta d\'accesso al commercio transfrontaliero con il Portogallo, ospitando fiere leader come FECIEX o Fehispor.',
        detail: 'Realizziamo la progettazione, produzione e allestimento di stand in legno pregiato nei 10.000 mq coperti di IFEBA e nelle sue grandi aree esterne.'
      },
      zh: {
        intro: '巴达霍斯及其 IFEBA 展览中心是与葡萄牙开展跨境贸易的门户，举办 FECIEX 和 Fehispor 等领先的贸易博览会。',
        detail: '我们在 IFEBA 的 10,000 平方米室内展馆和大型室外区域提供高端定制木工展台的设计、制造和搭建。'
      },
      hi: {
        intro: 'बादाहोज़ और इसका IFEBA प्रदर्शनी केंद्र पुर्तगाल के साथ सीमा पार व्यापार का प्रवेश द्वार हैं, जो FECIEX और Fehispor जैसे प्रमुख शो की मेजबानी करते हैं।',
        detail: 'हम IFEBA के 10,000 वर्ग मीटर के कवर हॉल और इसके बड़े बाहरी क्षेत्रों में premium custom लकड़ी के स्टैंड का डिज़ाइन, निर्माण और सेटअप करते हैं।'
      },
      ko: {
        intro: '바다호스와 IFEBA 전시 센터는 포르투갈과의 국경 무역 관문이며 FECIEX 및 Fehispor와 같은 주요 무역 박람회를 개최합니다.',
        detail: '우리는 IFEBA의 10,000제곱미터 실내 전시관과 대규모 야외 공간에 프리미엄 맞춤형 목재 부스의 설계, 제작 및 설치를 수행합니다.'
      }
    }
  }
};

export const portfolios = [
  {
    "thumb": "img/trabajos/TCANTICO/2.avif",
    "full": "img/trabajos/TCANTICO/1.avif",
    "alt": "Stand para empresa de mobiliario en Madrid",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_mobiliario_en_madrid_spain",
      "en": "exhibition_stand_for_company_furniture_in_madrid_spain",
      "de": "messestand_fuer_unternehmen_moebel_in_madrid_spanien",
      "pt": "estande_para_empresa_de_mobiliario_em_madri_espanha",
      "zh": "xibanya_madeli_jiaju_gongsi_zhanwei",
      "hi": "maidrid_spen_mein_farnichar_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_mobiliario_en_madrid_spain",
      "it": "stand_para_empresa_de_mobiliario_en_madrid_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCELUMATEC/2.avif",
    "full": "img/trabajos/TCELUMATEC/3.avif",
    "alt": "Construcción de stand industrial a medida para Elumatec",
    "categories": [
      "carpinteria",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain",
      "en": "exhibition_stand_for_company_aluminum_profiles_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_aluminiumprofile_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_perfis_aluminio_em_bilbau_espanha",
      "zh": "xibanya_bibao_lv_xingcai_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_elyuminiyam_prophail_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain",
      "it": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCCONSTELLIUM/1.avif",
    "full": "img/trabajos/TCCONSTELLIUM/1.avif",
    "alt": "Diseño de stand de gran escala para Constellium",
    "categories": [
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain",
      "en": "exhibition_stand_for_company_aluminum_products_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_aluminiumprodukte_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_produtos_aluminio_em_bilbau_espanha",
      "zh": "xibanya_bibao_lv_chanpin_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_elyuminiyam_utpaad_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain",
      "it": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCFARNEL/1.avif",
    "full": "img/trabajos/TCFARNEL/1.avif",
    "alt": "Stand retroiluminado con textiles tensados para Farnel",
    "categories": [
      "textil",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain",
      "en": "exhibition_stand_for_company_electronic_components_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_elektronische_bauteile_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_componentes_eletronicos_em_bilbau_espanha",
      "zh": "xibanya_bibao_dianzi_yuanjian_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_ilektronik_ghatak_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain",
      "it": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCMAGNOLIA/1.avif",
    "full": "img/trabajos/TCMAGNOLIA/1.avif",
    "alt": "Montaje de stand premium con acabados de carpintería Magnolia",
    "categories": [
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_en_bilbao_spain",
      "en": "exhibition_stand_for_company_jewelry_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_schmuck_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_joalheria_em_bilbau_espanha",
      "zh": "xibanya_bibao_zhubao_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_aabhooshan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_joyeria_en_bilbao_spain",
      "it": "stand_para_empresa_de_joyeria_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCMFI/1.avif",
    "full": "img/trabajos/TCMFI/1.avif",
    "alt": "Stand modular de madera y diseño ferial para MFI",
    "categories": [
      "madera",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_bienes_raices_en_bilbao_spain",
      "en": "exhibition_stand_for_company_real_estate_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_immobilien_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_imoveis_em_bilbau_espanha",
      "zh": "xibanya_bibao_fangdichan_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_riyal_estet_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_bienes_raices_en_bilbao_spain",
      "it": "stand_para_empresa_de_bienes_raices_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCORGADATA/1.avif",
    "full": "img/trabajos/TCORGADATA/1.avif",
    "alt": "Stand corporativo para captación de leads de Orgadata",
    "categories": [
      "tecnologia",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_software_industrial_en_bilbao_spain",
      "en": "exhibition_stand_for_company_industrial_software_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_industriesoftware_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_software_industrial_em_bilbau_espanha",
      "zh": "xibanya_bibao_gongye_ruanjian_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_audyogik_sophataveyar_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_software_industrial_en_bilbao_spain",
      "it": "stand_para_empresa_de_software_industrial_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCEMIL/1.avif",
    "full": "img/trabajos/TCEMIL/1.avif",
    "alt": "Stand ferial de carpintería premium lacada para Emil",
    "categories": [
      "carpinteria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_ceramica_en_bilbao_spain",
      "en": "exhibition_stand_for_company_ceramics_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_keramik_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_ceramica_em_bilbau_espanha",
      "zh": "xibanya_bibao_taoci_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_siremik_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_ceramica_en_bilbao_spain",
      "it": "stand_para_empresa_de_ceramica_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCPHARMA/1.avif",
    "full": "img/trabajos/TCPHARMA/1.avif",
    "alt": "Stand de marca de alta fidelidad para Pharma",
    "categories": [
      "farmaceutica",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain",
      "en": "exhibition_stand_for_company_health_technology_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_gesundheitstechnologie_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_tecnologia_saude_em_bilbau_espanha",
      "zh": "xibanya_bibao_jiankang_keji_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_svaasthy_takaneek_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain",
      "it": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCSCHOEFFEL/4.avif",
    "full": "img/trabajos/TCSCHOEFFEL/1.avif",
    "alt": "Stand de textil tensado y retroiluminado para Schoeffel",
    "categories": [
      "textil",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain",
      "en": "exhibition_stand_for_company_pearl_jewelry_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_perlensmuck_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_joias_perolas_em_bilbau_espanha",
      "zh": "xibanya_bibao_zhenzhu_zhubao_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_moti_aabhooshan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain",
      "it": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCSES/2.avif",
    "full": "img/trabajos/TCSES/1.avif",
    "alt": "Stand con gran impacto visual y rotulación corporativa para SES",
    "categories": [
      "rotulacion",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain",
      "en": "exhibition_stand_for_company_telecommunications_satellites_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_telekommunikationssatelliten_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_satelites_telecomunicacoes_em_bilbau_espanha",
      "zh": "xibanya_bibao_tongxin_weixing_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_doorsanchaar_upagrah_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain",
      "it": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TELASRGB/2.avif",
    "full": "img/trabajos/TELASRGB/1.avif",
    "alt": "Stand ferial de tecnología de iluminación y salud para Philips",
    "categories": [
      "iluminacion",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain",
      "en": "exhibition_stand_for_company_health_lighting_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_gesundheitsbeleuchtung_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_iluminacao_saude_em_bilbau_espanha",
      "zh": "xibanya_bibao_jiankang_zhaoming_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_svaasthy_prakash_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain",
      "it": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-bost-emo-2023_1.avif",
    "full": "img/trabajos/trabajos_promueve/01-bost-emo-2023_1.avif",
    "alt": "Construcción de stand de gran formato en carpintería de madera para BOST en EMO 2023",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-stand-tecnalia-biemh-2022_1.avif",
    "full": "img/trabajos/trabajos_promueve/01-stand-tecnalia-biemh-2022_1.avif",
    "alt": "Estructura de stand modular de aluminio y diseño tecnológico para Tecnalia en BIEMH 2022",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-stand-zayer-biemh-2022-v2.avif",
    "full": "img/trabajos/trabajos_promueve/01-stand-zayer-biemh-2022-v2.avif",
    "alt": "Stand de carpintería a medida y espacio de exposición de maquinaria para Zayer en BIEMH 2022",
    "categories": [
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/1.avif",
    "full": "img/trabajos/trabajos_promueve/1.avif",
    "alt": "Stand corporativo premium con diseño para empresa del sector farmacéutico Pharmatechnik",
    "categories": [
      "farmaceutica"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_health_technology_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_gesundheitstechnologie_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_tecnologia_saude_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jiankang_keji_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_svaasthy_takaneek_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-bost-emo-2023_1.avif",
    "full": "img/trabajos/trabajos_promueve/02-bost-emo-2023_1.avif",
    "alt": "Zona audiovisual integrada en stand de madera a medida para la empresa BOST",
    "categories": [
      "madera",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_3",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_3",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_3",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_3",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_3",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-stand-intermaher-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/02-stand-intermaher-biemh-2022.avif",
    "alt": "Diseño y montaje de stand ferial para exhibición de maquinaria pesada de Intermaher en BIEMH 2022",
    "categories": [
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_4",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_4",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_4",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_4",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_4",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-stand-zayer-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/02-stand-zayer-biemh-2022.avif",
    "alt": "Área de demostración y carpintería técnica en el stand de Zayer para BIEMH 2022",
    "categories": [
      "carpinteria",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_5",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_5",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_5",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_5",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_5",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/2 copia.avif",
    "full": "img/trabajos/trabajos_promueve/2 copia.avif",
    "alt": "Stand con textiles arquitectónicos tensados para la firma de joyería Schoeffel",
    "categories": [
      "textil"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_pearl_jewelry_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_perlensmuck_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_joias_perolas_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_zhenzhu_zhubao_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_moti_aabhooshan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/03-stand-intermaher-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/03-stand-intermaher-biemh-2022.avif",
    "alt": "Vista superior del stand modular con estructura metálica y zona expositora para Intermaher",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_6",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_6",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_6",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_6",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_6",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/03-stand-tecnalia-biemh-2022_1.avif",
    "full": "img/trabajos/trabajos_promueve/03-stand-tecnalia-biemh-2022_1.avif",
    "alt": "Stand tecnológico con zona de robótica y pantallas led interactivas para Tecnalia en BIEMH 2022",
    "categories": [
      "tecnologia",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/3.avif",
    "full": "img/trabajos/trabajos_promueve/3.avif",
    "alt": "Stand modular de madera y acabados profesionales para MFI Unibail Rodamco",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_7",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_7",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_7",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_7",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_7",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/04-bost-emo-2023_2.avif",
    "full": "img/trabajos/trabajos_promueve/04-bost-emo-2023_2.avif",
    "alt": "Zona de reuniones de carpintería premium y diseño acogedor en el stand de BOST",
    "categories": [
      "madera",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_8",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_8",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_8",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_8",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_8",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/06-stand-zayer-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/06-stand-zayer-biemh-2022.avif",
    "alt": "Pantalla LED gigante integrada en la estructura del stand de Zayer",
    "categories": [
      "led",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_9",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_9",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_9",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_9",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_9",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/bellota-ferroforma.avif",
    "full": "img/trabajos/trabajos_promueve/bellota-ferroforma.avif",
    "alt": "Construcción de stand a medida para la empresa de herramientas agrícolas Bellota en Ferroforma",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain",
      "en": "exhibition_stand_for_company_agricultural_tools_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_landwirtschaftliche_werkzeuge_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_ferramentas_agricolas_em_bilbau_espanha",
      "zh": "xibanya_bibao_nongye_gongju_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_krshi_upakaran_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain",
      "it": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/biemh-16-tecnalia-1.avif",
    "full": "img/trabajos/trabajos_promueve/biemh-16-tecnalia-1.avif",
    "alt": "Stand corporativo enfocado en investigación tecnológica de Tecnalia para la BIEMH 2016",
    "categories": [
      "feria",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain_3",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien_3",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha_3",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei_3",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind_3",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/cabecera-proyecto-emo-milano-2021-2.avif",
    "full": "img/trabajos/trabajos_promueve/cabecera-proyecto-emo-milano-2021-2.avif",
    "alt": "Stand de diseño de alta gama para la exhibición de Zayer en EMO Milano",
    "categories": [
      "feria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_milano_italy",
      "en": "exhibition_stand_for_company_machine_tools_in_milan_italy",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_mailand_italien",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_milao_italia",
      "zh": "yidali_milan_jichuang_gongsi_zhanwei",
      "hi": "milan_itali_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_milano_italy",
      "it": "stand_para_empresa_de_maquina_herramienta_en_milano_italy"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/evento-2014-fanuc-showroom-1.avif",
    "full": "img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-1.avif",
    "alt": "Showroom corporativo de robótica industrial diseñado a medida para Fanuc",
    "categories": [
      "showroom",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain",
      "en": "exhibition_stand_for_company_industrial_robotics_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_industrierobotik_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_robotica_industrial_em_bilbau_espanha",
      "zh": "xibanya_bibao_gongye_jiqiren_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_audyogik_robotiks_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain",
      "it": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/evento-2014-fanuc-showroom-2.avif",
    "full": "img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-2.avif",
    "alt": "Diseño de espacio expositivo y showroom industrial para maquinaria Fanuc",
    "categories": [
      "showroom",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_industrial_robotics_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_industrierobotik_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_robotica_industrial_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_gongye_jiqiren_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_audyogik_robotiks_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/mg-1225.avif",
    "full": "img/trabajos/trabajos_promueve/mg-1225.avif",
    "alt": "Stand ferial de alimentación con diseño corporativo y áreas de degustación para Pescanova",
    "categories": [
      "alimentacion",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain",
      "en": "exhibition_stand_for_company_seafood_food_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_meeresfruechte_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_alimentacao_frutos_mar_em_bilbau_espanha",
      "zh": "xibanya_bibao_haixian_shipin_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_samudree_bhojan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain",
      "it": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-2016-biemh-emuge-4.avif",
    "full": "img/trabajos/trabajos_promueve/stand-2016-biemh-emuge-4.avif",
    "alt": "Stand con estructura de aluminio y elementos corporativos para Emuge Franken en BIEMH 2016",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_10",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_10",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_10",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_10",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_10",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-2018-biemh-delteco-10.avif",
    "full": "img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif",
    "alt": "Gran stand ferial de carpintería y acabados lacados para Delteco en BIEMH 2018",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_11",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_11",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_11",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_11",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_11",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-cun-fitur3.avif",
    "full": "img/trabajos/trabajos_promueve/stand-cun-fitur3.avif",
    "alt": "Stand de madera a medida para la Clínica Universidad de Navarra en FITUR",
    "categories": [
      "sanidad",
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain",
      "en": "exhibition_stand_for_company_healthcare_medicine_in_madrid_spain",
      "de": "messestand_fuer_unternehmen_gesundheitswesen_medizin_in_madrid_spanien",
      "pt": "estande_para_empresa_de_saude_medicina_em_madri_espanha",
      "zh": "xibanya_madeli_yiliao_weisheng_gongsi_zhanwei",
      "hi": "maidrid_spen_mein_svaasthy_chikitsa_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain",
      "it": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-emuge-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/stand-emuge-biemh-2022.avif",
    "alt": "Diseño de stand de perfilería de aluminio y zonas de reunión de Emuge Franken en BIEMH 2022",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_12",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_12",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_12",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_12",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_12",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/STANDS_2017_EMO_HANNOVER_ZAYER_1.avif",
    "full": "img/trabajos/trabajos_promueve/STANDS_2017_EMO_HANNOVER_ZAYER_1.avif",
    "alt": "Stand premium de gran escala para la demostración de maquinaria Zayer en EMO Hannover 2017",
    "categories": [
      "feria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany",
      "en": "exhibition_stand_for_company_machine_tools_in_hannover_germany",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_hannover_deutschland",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_hanover_alemanha",
      "zh": "deguo_hannuowei_jichuang_gongsi_zhanwei",
      "hi": "hainaovar_jarmani_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany",
      "it": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-2014-biemh-bilbao-zayer-17.avif",
    "full": "img/trabajos/trabajos_promueve/stands-2014-biemh-bilbao-zayer-17.avif",
    "alt": "Montaje de stand a medida en carpintería de madera para Zayer en BIEMH Bilbao 2014",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_13",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_13",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_13",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_13",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_13",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-2014-biemh-bilbao-zayer-20.avif",
    "full": "img/trabajos/trabajos_promueve/stands-2014-biemh-bilbao-zayer-20.avif",
    "alt": "Construcción de stand corporativo con acabados limpios para Zayer en BIEMH Bilbao",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_14",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_14",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_14",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_14",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_14",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-pescanova.avif",
    "full": "img/trabajos/trabajos_promueve/stands-pescanova.avif",
    "alt": "Zona de exposición y mostrador de atención al público en el stand de Pescanova",
    "categories": [
      "alimentacion"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_seafood_food_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_meeresfruechte_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_alimentacao_frutos_mar_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_haixian_shipin_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_samudree_bhojan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2"
    }
  }
];

export function pathFor(lang, section = 'home') {
  const slug = routes[lang]?.[section] ?? '';
  const prefix = lang === 'es' ? '' : `/${lang}`;
  return `${prefix}${slug ? `/${slug}` : '/'}`;
}

export function findRoute(path) {
  const clean = (path || '').replace(/^\/+|\/+$/g, '');
  if (clean === '') return { lang: 'es', section: 'home' };
  const parts = clean.split('/');
  const maybeLang = languages.includes(parts[0]) ? parts.shift() : 'es';
  const slug = parts.join('/');
  const langRoutes = routes[maybeLang] || routes.es;
  if (slug.startsWith('ferias/')) { return { lang: maybeLang, section: 'feria', fairSlug: slug.substring(7) }; }
  const section = Object.keys(langRoutes).find((key) => langRoutes[key] === slug) || 'home';
  return { lang: maybeLang, section };
}

export function resolveRoute(path) {
  const { lang, section, fairSlug } = findRoute(path);
  const c = copy[lang] || copy.es;
  const canonical = `https://standarte.es${pathFor(lang, section)}`;
  return { lang, section, fairSlug, copy: c, canonical };
}

export const prerenderEntries = languages.flatMap((lang) => {
  const normalRoutes = Object.keys(routes[lang]).map((section) => ({ path: pathFor(lang, section).replace(/^\/|\/$/g, '') }));
  const fairRoutes = fairsData.map(fair => {
    const prefix = lang === 'es' ? '' : `${lang}/`;
    return { path: `${prefix}ferias/${fair.slug}` };
  });
  return [...normalRoutes, ...fairRoutes];
}).filter((entry) => entry.path !== '');
