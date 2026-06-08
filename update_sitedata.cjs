const fs = require('fs');

let content = fs.readFileSync('src/lib/siteData.js', 'utf8');

// 1. Update languages array
content = content.replace(
  "export const languages = ['es', 'en', 'de', 'zh', 'hi', 'pt'];",
  "export const languages = ['es', 'en', 'de', 'zh', 'hi', 'pt', 'fr', 'it'];"
);

// 2. Update languageLabels
content = content.replace(
  /pt:\s*'PT Português'\r?\n\s*\};/,
  "pt: 'PT Português',\n  fr: 'FR Français',\n  it: 'IT Italiano'\n};"
);

// 3. Update routes
content = content.replace(
  /badajoz:\s*'construcao_stands_badajoz',\r?\n\s*noticias:\s*'noticias'\r?\n\s*\}\r?\n\s*\};/,
  `badajoz: 'construcao_stands_badajoz',
    noticias: 'noticias'
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
    noticias: 'actualites'
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
    noticias: 'notizie'
  }
};`
);

// 4. Update copy
const copyFr = `  fr: {
    nav: { services: 'Services', custom: 'Galerie', noticias: 'Actualités', contact: 'Contact', language: 'Langue' },
    seoTitle: 'Standarte | Constructeur de stands à Madrid, Barcelone, Bilbao, Malaga et Lisbonne',
    seoDescription: 'Standarte conçoit, fabrique et installe des stands de manière professionnelle et personnalisée pour des salons en Espagne et à l\\'international.',
    heroTitle: 'Conception et construction de stands internationaux',
    heroSubtitle: 'Des espaces qui inspirent',
    servicesTitle: 'Services',
    services: [
      ['Conception et Ingénierie', 'Notre équipe professionnelle prendra note des besoins de votre projet, qui seront reflétés en détail dans un prototype 3D personnalisé que vous pourrez explorer et réviser avant le début de la fabrication. L\\'image du prototype sera 100% fidèle au résultat final.'],
      ['Construction', 'Dans le processus de construction, nous appliquons les techniques d\\'assemblage les plus modernes avec des matériaux spécifiques pour l\\'architecture éphémère. Cela nous permet d\\'offrir un aspect impeccable qui démontrera notre qualité au premier coup d\\'œil.'],
      ['Montage et validations', 'Nous nous occupons de tout. En toute tranquillité, vous pourrez vous présenter le premier jour du salon, et vous trouverez tout prêt pour commencer votre travail commercial. Stand, restauration, papeterie,... peu importe s\\'il s\\'agit d\\'un salon à Madrid, Francfort, Pékin ou Chicago.']
    ],
    micro: {
      title: 'LUZPAVILION',
      subtitle: 'Tentes spatiales pour environnements uniques',
      color: 'Couleur',
      finish: 'Finition:',
      descriptionTitle: 'Description:',
      description: 'Stand petit format composé de 4 corps<br>Son montage est très simple ; aucun outil n\\'est nécessaire.<br>Produit modulaire librement configurable.',
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
        { src: '/img/video_standrte_presentacion_empresa.mp4', title: 'Présentations d\\'entreprise', subtitle: 'Nos ateliers et processus de fabrication de stands d\\'entreprise.' },
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Salons dans des lieux historiques', subtitle: 'Conception respectueuse dans des lieux traditionnels et historiques.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Célébrations', subtitle: 'Espaces gastronomiques sur mesure pour les vignobles et événements spéciaux.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Salons en plein air grand format', subtitle: 'Montages à grande échelle et tentes premium haute résistance.' }
      ]
    },
    citiesIntro: 'Nous concevons, fabriquons et montons des stands pour des salons et événements dans les principales villes d\\'Espagne et Portugal.',
    customTitle: 'GALERIE',
    customSubtitle: 'Classés par technique de montage principale.',
    filters: { all: 'Tous', textil: 'Textile', madera: 'Bois' },
    counters: { projects: 'Projets', clients: 'Clients', countries: 'Pays', fairs: 'Salons' },
    teamTitle: 'Équipe',
    teamSubtitle: 'Nous sommes une équipe multidisciplinaire comprenant des architectes, des monteurs, des décorateurs, des éclairagistes... Ensemble, nous pouvons apporter une réponse completa à tous les besoins de chaque projet. N\\'hésitez pas à nous appeler pour toute question. Nous espérons vous rencontrer bientôt.',
    teamRoles: ['Créativité et Décoration', 'Administrateur', 'Atelier', 'Coordination'],
    contactTitle: 'Contact',
    contactNotice: 'Les devis générés à partir des données de ce formulaire sont approximatifs. Le devis final sera établi après avoir discuté de tous les détails du projet.',
    form: { name: 'Nom', company: 'Entreprise', phone: 'Téléphone', email: 'Email', fair: 'Salon', location: 'Ville - Pays', meters: 'Mètres carrés', floor: 'Détails du sol', woodFloor: 'Plancher en bois', carpetPlatform: 'Plancher avec moquette', carpet: 'Moquette', spaceDistribution: 'Répartition des espaces', reception: 'Zone de réception', bar: 'Zone de bar', storage: 'Stockage', product: 'Exposition de produits', openMeeting: 'Zone de réunion ouverte', closedMeeting: 'Zone de réunion fermée', audiovisual: 'Audiovisuel', led: 'Écran LED', projector: 'Projecteur', budget: 'Budget estimé', description: 'Description', privacy: 'Accepter notre politique de confidentialité', send: 'ENVOYER' },
    legal: { privacy: 'Politique de confidentialité', legalNotice: 'Mentions légales', cookies: 'Utilisation des Cookies' },
    legalText: {
      privacy: '<p>Standarte utilise les données envoyées via ce formulaire uniquement pour répondre aux demandes d\\'informations et devis.</p>',
      legalNotice: '<p>Ce site web appartient à Standarte. L\\'utilisation implique une navigation responsable.</p>',
      cookies: '<p>Nous utilisons des cookies pour le fonctionnement du site.</p>'
    },
    formSuccess: 'Message envoyé avec succès.<br> Nous vous contacterons sous peu.<br> Merci.',
    formError: 'Impossible d\\'envoyer le message. Veuillez réessayer.',
    projects3D: { title: 'Autres Projets', subtitle: 'Explorez nos propositions interactives de haute menuiserie.', viewBtn: 'Voir Projet' },
    footer: 'Standarte. Conception, fabrication et montage de stands.'
  },`;

const copyIt = `  it: {
    nav: { services: 'Servizi', custom: 'Galleria', noticias: 'Notizie', contact: 'Contatto', language: 'Lingua' },
    seoTitle: 'Standarte | Allestimenti fieristici a Madrid, Barcellona, Bilbao, Malaga e Lisbona',
    seoDescription: 'Standarte progetta, produce e allestisce stand in modo professionale e personalizzato per fiere in Spagna e all\\'estero.',
    heroTitle: 'Progettazione e allestimento stand fieristici',
    heroSubtitle: 'Spazi che ispirano',
    servicesTitle: 'Servizi',
    services: [
      ['Progettazione e Ingegneria', 'Il nostro team professionale prenderà nota delle esigenze del tuo progetto, che saranno riflesse in dettaglio in un prototipo 3D personalizzato che potrai esplorare e rivedere prima dell\\'inizio della produzione. L\\'immagine del prototipo sarà fedele al 100% al risultato finale.'],
      ['Costruzione e Allestimento', 'Nel processo di costruzione applichiamo le più moderne tecniche di assemblaggio con materiali specifici per l\\'uso in architettura effimera. Questo ci permette di offrire un aspetto impeccabile che dimostrerà la qualità al primo sguardo.'],
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
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Fiere all\\'aperto di grande formato', subtitle: 'Allestimenti su larga scala e tende premium ad alta resistenza.' }
      ]
    },
    citiesIntro: 'Progettiamo, produciamo e allestiamo stand per fiere ed eventi nelle principali città di Spagna e Portogallo.',
    customTitle: 'GALLERIA',
    customSubtitle: 'Classificati per tecnica di montaggio principale.',
    filters: { all: 'Tutti', Tessile: 'Tessile', Legno: 'Legno' },
    counters: { projects: 'Progetti', clients: 'Clienti', countries: 'Paesi', fairs: 'Fiere' },
    teamTitle: 'Squadra',
    teamSubtitle: 'Siamo un team multidisciplinare, che include architetti, montatori, decoratori, tecnici delle luci... Insieme possiamo fornire una risposta completa a tutte le esigenze di ogni progetto. Non esitare a chiamarci per qualsiasi domanda. Speriamo di conoscerti presto.',
    teamRoles: ['Creatività e Decorazione', 'Amministratore', 'Officina', 'Coordinamento'],
    contactTitle: 'Contatto',
    contactNotice: 'I preventivi generati dai dati di questo modulo sono approssimativi. Il preventivo finale sarà stabilito quando avremo annotato tutti i dettagli.',
    form: { name: 'Nome', company: 'Azienda', phone: 'Telefono', email: 'Email', fair: 'Fiera', location: 'Città - Paese', meters: 'Metri quadrati', floor: 'Dettagli pavimento', woodFloor: 'Pedana in legno', carpetPlatform: 'Pedana in moquette', carpet: 'Moquette', spaceDistribution: 'Distribuzione spazi', reception: 'Area reception', bar: 'Area bar', storage: 'Magazzino', product: 'Esposizione prodotti', openMeeting: 'Area riunioni aperta', closedMeeting: 'Area riunioni chiusa', audiovisual: 'Audiovisivi', led: 'Schermo LED', projector: 'Proiettore', budget: 'Budget stimato', description: 'Descrizione', privacy: 'Accetta la nostra Privacy Policy', send: 'INVIA' },
    legal: { privacy: 'Privacy Policy', legalNotice: 'Note Legali', cookies: 'Uso dei Cookie' },
    legalText: {
      privacy: '<p>Standarte utilizza i dati inviati per rispondere alle richieste di informazioni e preventivi.</p>',
      legalNotice: '<p>Questo sito web appartiene a Standarte. L\\'uso implica una navigazione responsabile.</p>',
      cookies: '<p>Utilizziamo i cookie per il funzionamento del web.</p>'
    },
    formSuccess: 'Messaggio inviato con successo.<br> Ti contatteremo a breve.<br> Grazie.',
    formError: 'Impossibile inviare il messaggio. Riprova.',
    projects3D: { title: 'Altri Progetti', subtitle: 'Esplora le nostre proposte interattive di alta falegnameria.', viewBtn: 'Vedi Progetto' },
    footer: 'Standarte. Progettazione, produzione e allestimento stand.'
  },`;

content = content.replace(
  /footer:\s*'Standarte\.\s*Design,\s*produção\s*e\s*montagem\s*de\s*stands\.'\r?\n\s*\}\r?\n\s*\};/,
  `footer: 'Standarte. Design, produção e montagem de stands.'
  },
${copyFr}
${copyIt}
};`
);

fs.writeFileSync('src/lib/siteData.js', content, 'utf8');
console.log('Finished updating siteData.js arrays and copy objects.');
