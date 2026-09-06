// Nombre del SECTOR de una feria en el idioma del lector. El catálogo (fairsData.js)
// guarda el sector en español; esta es la única tabla de traducción, y la comparten
// la ficha de feria (Feria.svelte) y la ficha de datos de las páginas paralelas
// (server/builderFacts.js), que antes enseñaba «Industria y Logística» en inglés.
export const fairSectorLabels = {
    es: {
      'Agroalimentario y Naturaleza': 'Agroalimentario y Naturaleza',
      'Belleza y Estética': 'Belleza y Estética',
      'Enología y Vinos': 'Enología y Vinos',
      'Tecnología e Innovación': 'Tecnología e Innovación',
      'Industria y Logística': 'Industria y Logística',
      'Salud y Medicina': 'Salud y Medicina',
      'Turismo y Hostelería': 'Turismo y Hostelería',
      'Arte y Ocio': 'Arte y Ocio',
      'Construcción e Infraestructuras': 'Construcción e Infraestructuras',
      'Comercio y Packaging': 'Comercio y Packaging',
      'Aeronáutica y Transporte': 'Aeronáutica y Transporte',
      'Multisectorial y Profesional': 'Multisectorial y Profesional'
    },
    en: {
      'Agroalimentario y Naturaleza': 'Agri-food & Nature',
      'Belleza y Estética': 'Beauty & Aesthetics',
      'Enología y Vinos': 'Oenology & Wine',
      'Tecnología e Innovación': 'Technology & Innovation',
      'Industria y Logística': 'Industry & Logistics',
      'Salud y Medicina': 'Health & Medicine',
      'Turismo y Hostelería': 'Tourism & Hospitality',
      'Arte y Ocio': 'Art & Leisure',
      'Construcción e Infraestructuras': 'Construction & Infrastructure',
      'Comercio y Packaging': 'Retail & Packaging',
      'Aeronáutica y Transporte': 'Aeronautics & Transport',
      'Multisectorial y Profesional': 'Multisectorial & Professional'
    },
    de: {
      'Agroalimentario y Naturaleza': 'Agrar- und Ernährungswirtschaft & Natur',
      'Belleza y Estética': 'Schönheit & Ästhetik',
      'Enología y Vinos': 'Önologie & Wein',
      'Tecnología e Innovación': 'Technologie & Innovation',
      'Industria y Logística': 'Industrie & Logistik',
      'Salud y Medicina': 'Gesundheit & Medizin',
      'Turismo y Hostelería': 'Tourismus & Gastgewerbe',
      'Arte y Ocio': 'Kunst & Freizeit',
      'Construcción e Infraestructuras': 'Bauwesen & Infrastruktur',
      'Comercio y Packaging': 'Handel & Verpackung',
      'Aeronáutica y Transporte': 'Luftfahrt & Verkehr',
      'Multisectorial y Profesional': 'Branchenübergreifend & Fachleute'
    },
    fr: {
      'Agroalimentario y Naturaleza': 'Agroalimentaire et Nature',
      'Belleza y Estética': 'Beauté et Esthétique',
      'Enología y Vinos': 'Œnologie et Vin',
      'Tecnología e Innovación': 'Technologie et Innovation',
      'Industria y Logística': 'Industrie et Logistique',
      'Salud y Medicina': 'Santé et Médecine',
      'Turismo y Hostelería': 'Tourisme et Hôtellerie',
      'Arte y Ocio': 'Art et Loisirs',
      'Construcción e Infraestructuras': 'Construction et Infrastructures',
      'Comercio y Packaging': 'Commerce et Emballage',
      'Aeronáutica y Transporte': 'Aéronautique et Transport',
      'Multisectorial y Profesional': 'Multisectoriel et Professionnel'
    },
    pt: {
      'Agroalimentario y Naturaleza': 'Agroalimentar e Natureza',
      'Belleza y Estética': 'Beleza e Estética',
      'Enología y Vinos': 'Enologia e Vinhos',
      'Tecnología e Innovación': 'Tecnologia e Inovação',
      'Industria y Logística': 'Indústria e Logística',
      'Salud y Medicina': 'Saúde e Medicina',
      'Turismo y Hostelería': 'Turismo e Hotelaria',
      'Arte y Ocio': 'Arte e Lazer',
      'Construcción e Infraestructuras': 'Construção e Infraestruturas',
      'Comercio y Packaging': 'Comércio e Embalagem',
      'Aeronáutica y Transporte': 'Aeronáutica e Transporte',
      'Multisectorial y Profesional': 'Multissetorial e Profissional'
    },
    it: {
      'Agroalimentario y Naturaleza': 'Agroalimentare e Natura',
      'Belleza y Estética': 'Bellezza e Estetica',
      'Enología y Vinos': 'Enologia e Vini',
      'Tecnología e Innovación': 'Tecnologia e Innovazione',
      'Industria y Logística': 'Industria e Logistica',
      'Salud y Medicina': 'Salute e Medicina',
      'Turismo y Hostelería': 'Turismo e Ospitalità',
      'Arte y Ocio': 'Arte e Tempo Libero',
      'Construcción e Infraestructuras': 'Costruzioni e Infrastrutture',
      'Comercio y Packaging': 'Commercio e Imballaggio',
      'Aeronáutica y Transporte': 'Aeronautica e Trasporti',
      'Multisectorial y Profesional': 'Multisettoriale e Professionale'
    },
    ko: {
      'Agroalimentario y Naturaleza': '농식품 및 자연',
      'Belleza y Estética': '미용 및 미학',
      'Enología y Vinos': '와인 및 양조',
      'Tecnología e Innovación': '기술 및 혁신',
      'Industria y Logística': '산업 및 물류',
      'Salud y Medicina': '건강 및 의학',
      'Turismo y Hostelería': '관광 및 서비스업',
      'Arte y Ocio': '예술 및 레저',
      'Construcción e Infraestructuras': '건설 및 인프라',
      'Comercio y Packaging': '상업 및 패키징',
      'Aeronáutica y Transporte': '항공 및 교통',
      'Multisectorial y Profesional': '다분야 및 전문'
    },
    zh: {
      'Agroalimentario y Naturaleza': '农食与自然',
      'Belleza y Estética': '美容与美学',
      'Enología y Vinos': '酿酒与葡萄酒',
      'Tecnología e Innovación': '技术与创新',
      'Industria y Logística': '工业与物流',
      'Salud y Medicina': '健康与医疗',
      'Turismo y Hostelería': '旅游与酒店',
      'Arte y Ocio': '艺术与休闲',
      'Construcción e Infraestructuras': '建筑与基础设施',
      'Comercio y Packaging': '商业与包装',
      'Aeronáutica y Transporte': '航空与交通',
      'Multisectorial y Profesional': '跨行业与专业'
    },
    hi: {
      'Agroalimentario y Naturaleza': 'कृषि-खाद्य और प्रकृति',
      'Belleza y Estética': 'सौंदर्य और सौंदर्यशास्त्र',
      'Enología y Vinos': 'शराब और विनिर्माण',
      'Tecnología e Innovación': 'प्रौद्योगिकी और नवाचार',
      'Industria y Logística': 'उद्योग और रसद',
      'Salud y Medicina': 'स्वास्थ्य और चिकित्सा',
      'Turismo y Hostelería': 'पर्यटन और आतिथ्य',
      'Arte y Ocio': 'कला और अवकाश',
      'Construcción e Infraestructuras': 'निर्माण और बुनियादी ढांचा',
      'Comercio y Packaging': 'वाणिज्य और पैकेजिंग',
      'Aeronáutica y Transporte': 'वैमानिकी और परिवहन',
      'Multisectorial y Profesional': 'बहुक्षेत्रीय और पेशेवर'
    },
    ja: {
      'Agroalimentario y Naturaleza': '農産食品・自然',
      'Belleza y Estética': '美容・エステ',
      'Enología y Vinos': 'ワイン・醸造',
      'Tecnología e Innovación': 'テクノロジー・イノベーション',
      'Industria y Logística': '産業・物流',
      'Salud y Medicina': '健康・医療',
      'Turismo y Hostelería': '観光・ホスピタリティ',
      'Arte y Ocio': 'アート・レジャー',
      'Construcción e Infraestructuras': '建設・インフラ',
      'Comercio y Packaging': '商業・パッケージング',
      'Aeronáutica y Transporte': '航空・輸送',
      'Multisectorial y Profesional': '多分野・専門'
    }
  };

/** Sector traducido; si falta el idioma o la etiqueta, devuelve el original. */
export const sectorLabel = (sector, lang = 'es') =>
  (fairSectorLabels[lang] && fairSectorLabels[lang][sector]) || sector;
