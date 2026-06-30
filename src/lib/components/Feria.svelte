<script>
  import { onMount } from 'svelte';
  import { fairsData } from '$lib/fairsData.js';
  import { pathFor, languages, languageLabels, routes, cityData, fairUrl, activityUrl, activityIndexUrl } from '$lib/siteData.js';
  import { activitiesForFair, colorForTag, labelForTag } from '$lib/fairTags.js';
  import ContactForm from './ContactForm.svelte';

  // Módulo "Actividad" del aside: chips con código de color que enlazan a los
  // hubs de actividad de esta feria (interconexión por sector).
  const ACTIVITY_NAV_LABELS = {
    es: 'Actividad', en: 'Activity', de: 'Branche', fr: 'Activité', it: 'Attività',
    pt: 'Atividade', nl: 'Activiteit', zh: '行业', hi: 'गतिविधि', ko: '분야', ja: '分野'
  };
  const ALL_ACTIVITIES_LABELS = {
    es: 'Ver todas las actividades', en: 'See all activities', de: 'Alle Branchen ansehen',
    fr: 'Voir toutes les activités', it: 'Vedi tutte le attività', pt: 'Ver todas as atividades',
    nl: 'Alle activiteiten bekijken', zh: '查看所有行业', hi: 'सभी गतिविधियाँ देखें',
    ko: '모든 분야 보기', ja: 'すべての分野を見る'
  };

  // Navegación entre ciudades matriz (módulo del aside).
  // Solo las matrices (construccion_stands_*); excluye las landings de montaje secundarias
  // (montaje_zafra/don_benito/badajoz), que además duplicarían la etiqueta "Badajoz".
  const CITY_KEYS = Object.keys(cityData).filter((k) => !k.startsWith('montaje_'));
  const CITY_NAV_LABELS = {
    es: 'Ciudades', en: 'Cities', de: 'Städte',
    fr: 'Villes', it: 'Città', pt: 'Cidades',
    zh: '城市', hi: 'शहर', ko: '도시', ja: '都市', nl: 'Steden'
  };
  // Enlace cruzado a la página de precios (refuerza el clúster hacia la conversión).
  const preciosLink = {
    es: 'Precios de stands', en: 'Stand prices', de: 'Messestand-Preise',
    fr: 'Tarifs de stands', it: 'Prezzi degli stand', pt: 'Preços de stands',
    zh: '展台价格', hi: 'स्टैंड के मूल्य', ko: '부스 가격', ja: 'ブースの料金', nl: 'Standprijzen'
  };
  // Etiqueta del item "Precios" en el menú de navegación (consistente en todas las plantillas).
  const preciosNavLabel = {
    es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi',
    nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金'
  };
  import FlagIcon from './FlagIcon.svelte';

  
  const languageLocales = {
    es: 'es_ES',
    en: 'en_GB',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    pt: 'pt_PT',
    fr: 'fr_FR',
    it: 'it_IT',
    ko: 'ko_KR',
    ja: 'ja_JP',
    nl: 'nl_NL'
  };
  const contentLanguages = {
    es: 'es-ES',
    en: 'en-GB',
    de: 'de-DE',
    zh: 'zh-CN',
    hi: 'hi-IN',
    pt: 'pt-PT',
    fr: 'fr-FR',
    it: 'it-IT',
    ko: 'ko-KR',
    ja: 'ja-JP',
    nl: 'nl-NL'
  };

  
  export let data;
  let isScrolled = false;
  let menuOpen = false;

  function updateScrollState() {
    isScrolled = window.scrollY > 8;
  }

  onMount(() => {
    updateScrollState();
  });

  const ctaLabels = { es: 'Presupuesto en 24h', en: 'Quote in 24h', de: 'Angebot in 24h', zh: '24小时内报价', hi: '24 घंटे में कोटेशन', pt: 'Orçamento em 24h', fr: 'Devis en 24h', it: 'Preventivo in 24h', ko: '24시간 내 견적', ja: '24時間で見積もり', nl: 'Offerte binnen 24u' };
  $: ({ lang, copy, canonical, fairSlug } = data);

  $: fair = fairsData.find(f => f.slug === fairSlug) || fairsData[0];
  // Clave de la ciudad-matriz a la que pertenece esta feria, para marcarla como
  // activa en el módulo "Ciudades". El nexo es el nombre en español
  // (cityData[k].city.es coincide con fair.city, p. ej. "Madrid").
  $: currentCityKey = CITY_KEYS.find((k) => cityData[k]?.city?.es === fair?.city) || null;
  // Contenido SEO único de esta feria (HTML por idioma); fallback a ES si falta el idioma.
  $: fairBody = data.fairSeo ? (data.fairSeo[lang] || data.fairSeo.en || data.fairSeo.es || null) : null;
  
  const sectors = {
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

  const cities = {
    es: { 'Madrid': 'Madrid', 'Barcelona': 'Barcelona', 'Málaga': 'Málaga', 'Lisboa': 'Lisboa', 'Bilbao': 'Bilbao', 'Badajoz': 'Badajoz', 'Zaragoza': 'Zaragoza', 'Ciudad Real': 'Ciudad Real', 'Sevilla': 'Sevilla', 'París': 'París', 'Stuttgart': 'Stuttgart', 'Múnich': 'Múnich', 'Núremberg': 'Núremberg', 'Lyon': 'Lyon', 'Vigo': 'Vigo', 'Santiago de Compostela': 'Santiago de Compostela', 'Don Benito': 'Don Benito', 'Almendralejo': 'Almendralejo', 'Plasencia': 'Plasencia', 'Mérida': 'Mérida', 'A Coruña': 'A Coruña', 'Valladolid': 'Valladolid', 'Salamanca': 'Salamanca', 'Europa': 'Europa', 'Oporto': 'Oporto', 'Valencia': 'Valencia', 'Mallorca': 'Mallorca', 'Batalha': 'Batalha' },
    en: { 'Madrid': 'Madrid', 'Barcelona': 'Barcelona', 'Málaga': 'Malaga', 'Lisboa': 'Lisbon', 'Bilbao': 'Bilbao', 'Badajoz': 'Badajoz', 'Zaragoza': 'Zaragoza', 'Ciudad Real': 'Ciudad Real', 'Sevilla': 'Seville', 'París': 'Paris', 'Stuttgart': 'Stuttgart', 'Múnich': 'Munich', 'Núremberg': 'Nuremberg', 'Lyon': 'Lyon', 'Vigo': 'Vigo', 'Santiago de Compostela': 'Santiago de Compostela', 'Don Benito': 'Don Benito', 'Almendralejo': 'Almendralejo', 'Plasencia': 'Plasencia', 'Mérida': 'Mérida', 'A Coruña': 'A Coruña', 'Valladolid': 'Valladolid', 'Salamanca': 'Salamanca', 'Europa': 'Europe', 'Oporto': 'Porto', 'Valencia': 'Valencia', 'Mallorca': 'Mallorca', 'Batalha': 'Batalha' },
    ja: { 'Madrid': 'マドリード', 'Barcelona': 'バルセロナ', 'Málaga': 'マラガ', 'Lisboa': 'リスボン', 'Bilbao': 'ビルバオ', 'Badajoz': 'バダホス', 'Zaragoza': 'サラゴサ', 'Ciudad Real': 'シウダーレアル', 'Sevilla': 'セビリア', 'París': 'パリ', 'Stuttgart': 'シュトゥットガルト', 'Múnich': 'ミュンヘン', 'Núremberg': 'ニュルンベルク', 'Lyon': 'リヨン', 'Vigo': 'ビーゴ', 'Santiago de Compostela': 'サンティアゴ・デ・コンポステーラ', 'Don Benito': 'ドンベニート', 'Almendralejo': 'アルメンドラレホ', 'Plasencia': 'プラセンシア', 'Mérida': 'メリダ', 'Zafra': 'サフラ', 'A Coruña': 'ア・コルーニャ', 'Valladolid': 'バリャドリッド', 'Salamanca': 'サラマンカ', 'Europa': 'ヨーロッパ', 'Oporto': 'ポルト', 'Valencia': 'バレンシア', 'Mallorca': 'マヨルカ', 'Batalha': 'バターリャ' },
    // Simplified city mapping, defaulting to Spanish name if not defined to save space
  };

  // --- Clúster temático: cada feria enlaza con el pilar de su ciudad y con sus ferias hermanas de región ---
  // Mapea la ciudad de la feria a la sección-pilar (las que no tienen pilar propio cuelgan del más cercano).
  const CITY_TO_PILLAR = {
    'Madrid': 'madrid', 'Barcelona': 'barcelona', 'Bilbao': 'bilbao', 'Lisboa': 'lisboa', 'Oporto': 'oporto', 'Valencia': 'valencia', 'Mallorca': 'mallorca', 'Vigo': 'vigo', 'Santiago de Compostela': 'santiago', 'A Coruña': 'coruna', 'Valladolid': 'valladolid', 'Salamanca': 'salamanca', 'Batalha': 'batalha',
    'Málaga': 'malaga', 'Badajoz': 'badajoz', 'Sevilla': 'sevilla', 'Ciudad Real': 'ciudad_real', 'Zaragoza': 'zaragoza',
    'Don Benito': 'montaje_don_benito', 'Zafra': 'montaje_zafra',
    'Almendralejo': 'badajoz', 'Plasencia': 'badajoz', 'Mérida': 'badajoz', 'Portugal Sur': 'portugal_sur'
  };
  // Ciudad mostrada para el enlace al pilar (la del pilar, no la de la feria, para que el anchor coincida con el destino).
  const PILLAR_CITY = {
    madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', lisboa: 'Lisboa', oporto: 'Oporto', valencia: 'Valencia', mallorca: 'Mallorca', vigo: 'Vigo', santiago: 'Santiago de Compostela', coruna: 'A Coruña', valladolid: 'Valladolid', salamanca: 'Salamanca', batalha: 'Batalha', malaga: 'Málaga',
    badajoz: 'Badajoz', sevilla: 'Sevilla', ciudad_real: 'Ciudad Real', zaragoza: 'Zaragoza',
    montaje_don_benito: 'Don Benito', montaje_zafra: 'Zafra', portugal_sur: 'Portugal Sur'
  };
  // Región para agrupar ferias hermanas (define la densidad del clúster; Extremadura es la prioridad).
  const CITY_REGION = {
    'Badajoz': 'extremadura', 'Don Benito': 'extremadura', 'Almendralejo': 'extremadura',
    'Plasencia': 'extremadura', 'Mérida': 'extremadura', 'Zafra': 'extremadura', 'Cáceres': 'extremadura',
    'Madrid': 'madrid', 'Barcelona': 'cataluna', 'Bilbao': 'paisvasco',
    'Málaga': 'andalucia', 'Sevilla': 'andalucia', 'Ciudad Real': 'castillalamancha',
    'Lisboa': 'portugal', 'Oporto': 'portugal', 'Batalha': 'portugal', 'Valencia': 'comunidadvalenciana', 'Mallorca': 'baleares', 'Zaragoza': 'aragon', 'Vigo': 'galicia', 'Santiago de Compostela': 'galicia', 'A Coruña': 'galicia', 'Valladolid': 'castillayleon', 'Salamanca': 'castillayleon',
    'Portugal Sur': 'portugal-sur'
  };
  const clusterT = {
    es: { related: 'Ferias en las que también montamos stands', pillar: (c) => `Diseño y montaje de stands en ${c}`, also: 'También diseñamos y montamos stands en estas ferias cercanas:' },
    en: { related: 'Fairs where we also build stands', pillar: (c) => `Exhibition stand design and assembly in ${c}`, also: 'We also design and assemble stands at these nearby fairs:' },
    de: { related: 'Messen, auf denen wir ebenfalls Stände bauen', pillar: (c) => `Messestand Design und Montage in ${c}`, also: 'Wir gestalten und montieren auch Stände auf diesen Messen in der Nähe:' },
    fr: { related: 'Salons où nous montons aussi des stands', pillar: (c) => `Conception et montage de stands à ${c}`, also: 'Nous concevons et montons aussi des stands sur ces salons proches :' },
    pt: { related: 'Feiras onde também montamos stands', pillar: (c) => `Design e montagem de stands em ${c}`, also: 'Também concebemos e montamos stands nestas feiras próximas:' },
    it: { related: 'Fiere in cui montiamo anche stand', pillar: (c) => `Progettazione e montaggio stand a ${c}`, also: 'Progettiamo e montiamo stand anche in queste fiere vicine:' },
    ko: { related: '저희가 부스를 시공하는 다른 박람회', pillar: (c) => `${c} 부스 디자인 및 조립`, also: '근처의 다음 전시회에서도 부스를 디자인하고 조립합니다:' },
    zh: { related: '我们同样搭建展台的展会', pillar: (c) => `${c}展台设计与搭建`, also: '我们也在这些邻近展会设计和搭建展台：' },
    hi: { related: 'जिन मेलों में हम भी स्टैंड बनाते हैं', pillar: (c) => `${c} में स्टैंड डिज़ाइन और असेंबली`, also: 'हम इन नज़दीकी मेलों में भी स्टैंड डिज़ाइन और असेंबली करते हैं:' },
    ja: { related: '当社がブースを施工する他の展示会', pillar: (c) => `${c}での展示会ブース設計・組立`, also: '近隣のこれらの展示会でもブースの設計・組立を行っています：' },
    nl: { related: 'Beurzen waar wij ook stands bouwen', pillar: (c) => `Standontwerp en montage in ${c}`, also: 'Wij ontwerpen en monteren ook stands op deze nabijgelegen beurzen:' }
  };

  // Recinto ferial por ciudad (solo nombres verificados; las ciudades sin entrada no muestran recinto).
  const VENUE_BY_CITY = {
    'Madrid': 'IFEMA', 'Barcelona': 'Fira de Barcelona', 'Bilbao': 'BEC (Bilbao Exhibition Centre)',
    'Málaga': 'FYCMA', 'Sevilla': 'FIBES', 'Lisboa': 'FIL', 'Oporto': 'Exponor (Feira Internacional do Porto)', 'Valencia': 'Feria Valencia', 'Mallorca': 'Moll Vell de Palma / IFEBAL', 'Batalha': 'Exposalão (Centro de Exposições da Batalha)', 'Badajoz': 'IFEBA',
    'Don Benito': 'FEVAL', 'Ciudad Real': 'IFEDI', 'Mérida': 'IFEME',
    'Zaragoza': 'Feria de Zaragoza', 'Vigo': 'IFEVI', 'Santiago de Compostela': 'Cidade da Cultura de Galicia / Palacio de Congresos', 'A Coruña': 'EXPOCoruña / Palexco', 'Valladolid': 'Feria de Valladolid', 'Salamanca': 'Recinto Ferial de Salamanca / Palacio de Congresos', 'Lyon': 'Eurexpo Lyon',
    'Stuttgart': 'Messe Stuttgart', 'Múnich': 'Messe München', 'Núremberg': 'NürnbergMesse'
  };
  // Frase que nombra el recinto (clave SEO: "stand IFEBA", "stand FEVAL"…). Veraz y genérica.
  const venueLine = {
    es: (v, c) => `Standarte diseña y construye stands llave en mano en ${v}, el recinto ferial de ${c}, encargándose del transporte, el montaje con equipo propio y toda la tramitación técnica con el recinto.`,
    en: (v, c) => `Standarte designs and builds turnkey stands at ${v}, the exhibition venue in ${c}, handling transport, assembly with our own crew and all the technical paperwork with the venue.`,
    de: (v, c) => `Standarte plant und baut schlüsselfertige Stände in ${v}, dem Messegelände in ${c}, und übernimmt Transport, Montage mit eigenem Team und die gesamte technische Abwicklung mit dem Gelände.`,
    fr: (v, c) => `Standarte conçoit et construit des stands clé en main à ${v}, le parc des expositions de ${c}, en gérant le transport, le montage avec notre propre équipe et toutes les démarches techniques avec le site.`,
    pt: (v, c) => `A Standarte concebe e constrói stands chave na mão em ${v}, o recinto de feiras de ${c}, tratando do transporte, da montagem com equipa própria e de toda a tramitação técnica com o recinto.`,
    it: (v, c) => `Standarte progetta e costruisce stand chiavi in mano a ${v}, il polo fieristico di ${c}, occupandosi di trasporto, allestimento con squadra propria e di tutte le pratiche tecniche con il quartiere fieristico.`,
    ko: (v, c) => `Standarte는 ${c}의 전시장 ${v}에서 턴키 부스를 설계·시공하며, 운송·자체 인력 시공·전시장 기술 행정 절차를 모두 처리합니다.`,
    zh: (v, c) => `Standarte 在 ${c} 的展览场馆 ${v} 设计并搭建交钥匙展台，负责运输、自有团队搭建以及与场馆的全部技术手续。`,
    hi: (v, c) => `Standarte ${c} के प्रदर्शनी केंद्र ${v} में टर्नकी स्टैंड डिज़ाइन और निर्माण करता है, तथा परिवहन, अपनी टीम से असेंबली और केंद्र के साथ सभी तकनीकी प्रक्रियाओं को संभालता है।`,
    ja: (v, c) => `Standarteは${c}の展示会場${v}でターンキーのブースを設計・施工し、輸送、自社チームによる設営、会場との技術的な手続きまで一貫して担います。`,
    nl: (v, c) => `Standarte ontwerpt en bouwt sleutelklare stands in ${v}, het beurscomplex van ${c}, en verzorgt transport, montage met eigen team en de volledige technische afhandeling met het complex.`
  };

  // Etiqueta "Inicio" del breadcrumb por idioma (antes mostraba "Home" en inglés en todos los no-es)
  const homeLabel = {
    es: 'Inicio', en: 'Home', de: 'Startseite', fr: 'Accueil', pt: 'Início',
    it: 'Home', ko: '홈', zh: '首页', hi: 'होम', ja: 'ホーム', nl: 'Home'
  };

  const t = {
    es: {
      heroTitle: (name) => `Diseño y montaje de stands en ${name}`,
      heroSubtitle: (city) => `Diseño y montaje de stands en ${city} con más de 20 años de experiencia y taller propio.`,
      intro: (name, city, sector) => `Standarte ofrece servicios integrales de diseño y montaje de stands de alta carpintería para la feria ${name} en ${city}. Como evento destacado del sector de ${sector}, su marca requiere un espacio que transmita excelencia técnica e innovación.`,
      intro2: 'Nos encargamos del modelado 3D, la fabricación en nuestro propio taller y el montaje final, asegurando que su espacio destaque por encima de la competencia sin depender de terceros.',
      services: 'Servicios para expositores',
      cta: 'Solicitar Presupuesto para esta feria',
      back: 'Volver al inicio'
    },
    en: {
      heroTitle: (name) => `Exhibition stand design and assembly at ${name}`,
      heroSubtitle: (city) => `Exhibition stand design and assembly in ${city} with more than 20 years of experience and our own workshop.`,
      intro: (name, city, sector) => `Standarte offers comprehensive high-quality stand design and assembly services for the ${name} fair in ${city}. As a key event in the ${sector} sector, your brand requires a space that conveys technical excellence and innovation.`,
      intro2: 'We take care of the 3D modeling, manufacturing in our own workshop, and the final assembly, ensuring that your space stands out from the competition without relying on third parties.',
      services: 'Services for exhibitors',
      cta: 'Request a Quote for this fair',
      back: 'Back to home'
    },
    de: {
      heroTitle: (name) => `Design und Montage von Messeständen auf der ${name}`,
      heroSubtitle: (city) => `Messestand Design und Montage in ${city} mit über 20 Jahren Erfahrung und eigener Werkstatt.`,
      intro: (name, city, sector) => `Standarte bietet umfassende Dienstleistungen im Bereich hochwertiges Messestand-Design und -Montage für die Messe ${name} in ${city}. Als wichtiges Ereignis im Bereich ${sector} erfordert Ihre Marke einen Raum, der technische Exzellenz und Innovation vermittelt.`,
      intro2: 'Wir kümmern uns um die 3D-Modellierung, die Fertigung in unserer eigenen Werkstatt und die Endmontage und stellen sicher, dass sich Ihr Raum von der Konkurrenz abhebt.',
      services: 'Dienstleistungen für Aussteller',
      cta: 'Angebot für diese Messe anfordern',
      back: 'Zurück zur Startseite'
    },
    fr: {
      heroTitle: (name) => `Conception et montage de stands pour ${name}`,
      heroSubtitle: (city) => `Conception et montage de stands à ${city} avec plus de 20 ans d'expérience et notre propre atelier.`,
      intro: (name, city, sector) => `Standarte propose des services complets de conception et de montage de stands de haute qualité pour le salon ${name} à ${city}. En tant qu'événement clé du secteur de ${sector}, votre marque a besoin d'un espace qui transmet l'excellence.`,
      intro2: 'Nous prenons en charge la modélisation 3D, la fabrication dans notre propre atelier et le montage final, garantissant que votre espace se démarque de la concurrence.',
      services: 'Services pour les exposants',
      cta: 'Demander un devis pour ce salon',
      back: "Retour à l'accueil"
    },
    pt: {
      heroTitle: (name) => `Design e montagem de stands na ${name}`,
      heroSubtitle: (city) => `Design e montagem de stands em ${city} com mais de 20 anos de experiência e oficina própria.`,
      intro: (name, city, sector) => `A Standarte oferece serviços abrangentes de design e montagem de stands de alta qualidade para a feira ${name} em ${city}. Sendo um evento chave no setor de ${sector}, a sua presença requer excelência.`,
      intro2: 'Cuidamos da modelação 3D, fabricação na nossa própria oficina e montagem final, garantindo um resultado impecável.',
      services: 'Serviços para expositores',
      cta: 'Solicitar Orçamento para esta feira',
      back: 'Voltar ao início'
    },
    it: {
      heroTitle: (name) => `Progettazione e montaggio di stand a ${name}`,
      heroSubtitle: (city) => `Progettazione e montaggio stand a ${city} con oltre 20 anni di esperienza e officina propria.`,
      intro: (name, city, sector) => `Standarte offre servizi completi di progettazione e montaggio di stand per la fiera ${name} a ${city}. Come evento chiave nel settore di ${sector}, il tuo brand richiede eccellenza.`,
      intro2: 'Ci occupiamo della modellazione 3D, della produzione nella nostra officina e dell\'assemblaggio finale.',
      services: 'Servizi per espositori',
      cta: 'Richiedi un preventivo',
      back: 'Torna alla home'
    },
    ko: {
      heroTitle: (name) => `${name} 전시 부스 디자인 및 조립`,
      heroSubtitle: (city) => `${city}에서 20년 이상의 경험과 자체 작업장을 갖춘 부스 디자인 및 조립.`,
      intro: (name, city, sector) => `Standarte는 ${city}에서 열리는 ${name} 전시회를 위한 프리미엄 부스 디자인 및 시공 서비스를 제공합니다. ${sector} 분야의 주요 행사로서 완벽한 공간이 필요합니다.`,
      intro2: '3D 모델링, 자체 작업장 제작, 최종 설치까지 모두 책임집니다.',
      services: '참여업체를 위한 서비스',
      cta: '견적 요청하기',
      back: '홈으로 돌아가기'
    },
    zh: {
      heroTitle: (name) => `${name} 展会展台设计与搭建`,
      heroSubtitle: (city) => `在 ${city} 提供展台设计与搭建服务，拥有超过20年的经验和自己的工厂。`,
      intro: (name, city, sector) => `Standarte 为 ${city} 的 ${name} 展会提供高质量的展台设计和搭建服务。作为 ${sector} 领域的重要活动，您的品牌需要卓越的展示。`,
      intro2: '我们负责3D建模，自己的工厂生产和最终组装。',
      services: '参展商服务',
      cta: '索取报价',
      back: '回到首页'
    },
    hi: {
      heroTitle: (name) => `${name} में प्रदर्शनी स्टॉल का डिज़ाइन और असेंबली`,
      heroSubtitle: (city) => `${city} में 20 से अधिक वर्षों के अनुभव और अपनी खुद की कार्यशाला के साथ प्रदर्शनी स्टैंड डिज़ाइन और असेंबली।`,
      intro: (name, city, sector) => `Standarte ${city} में ${name} मेले के लिए उच्च गुणवत्ता वाले स्टैंड डिज़ाइन प्रदान करता है। ${sector} क्षेत्र में एक प्रमुख घटना के रूप में, आपके ब्रांड को उत्कृष्टता की आवश्यकता है।`,
      intro2: 'हम 3D मॉडलिंग, अपनी कार्यशाला में निर्माण और अंतिम असेंबली का ध्यान रखते हैं।',
      services: 'प्रदर्शकों के लिए सेवाएं',
      cta: 'एक बोली का अनुरोध करें',
      back: 'होम पर वापस जाएं'
    },
    ja: {
      heroTitle: (name) => `${name}での展示会ブース設計・組立`,
      heroSubtitle: (city) => `${city}での展示会ブース設計・組立。20年以上の経験と自社工房を有しています。`,
      intro: (name, city, sector) => `Standarteは、${city}で開催される${name}に向けて、高品質な木工ブースの設計・施工をトータルでご提供します。${sector}分野を代表する見本市として、貴社のブランドには技術的な卓越性と革新性を伝える空間が求められます。`,
      intro2: '3Dモデリング、自社工房での製作、現地での最終設営まで一貫して担い、第三者に頼ることなく貴社のブースが競合より際立つことをお約束します。',
      services: '出展企業向けサービス',
      cta: 'この見本市の見積もりを依頼する',
      back: 'ホームに戻る'
    },
    nl: {
      heroTitle: (name) => `Ontwerp en montage van beursstands op ${name}`,
      heroSubtitle: (city) => `Standontwerp en montage in ${city} met meer dan 20 jaar ervaring en een eigen werkplaats.`,
      intro: (name, city, sector) => `Standarte biedt complete diensten voor ontwerp en montage van hoogwaardige stands voor de beurs ${name} in ${city}. Als belangrijk evenement in de sector ${sector} vraagt uw merk om een ruimte die technische excellentie en innovatie uitstraalt.`,
      intro2: 'Wij verzorgen de 3D-modellering, de productie in onze eigen werkplaats en de eindmontage, zodat uw ruimte zich onderscheidt van de concurrentie zonder afhankelijk te zijn van derden.',
      services: 'Diensten voor exposanten',
      cta: 'Offerte aanvragen voor deze beurs',
      back: 'Terug naar home'
    }
  };

  // Coletilla de valor (experiencia + taller propio) que antes vivía en el subtítulo <p>.
  // Se funde en el H1 para que la cabecera tenga un solo texto sin repetir
  // "Diseño y montaje de stands en…". Lleva su propio separador inicial por idioma.
  const heroExp = {
    es: ' con más de 20 años de experiencia y taller propio',
    en: ' with over 20 years of experience and our own workshop',
    de: ' mit über 20 Jahren Erfahrung und eigener Werkstatt',
    fr: " avec plus de 20 ans d'expérience et notre propre atelier",
    pt: ' com mais de 20 anos de experiência e oficina própria',
    it: ' con oltre 20 anni di esperienza e officina propria',
    ko: ' — 20년 이상의 경험과 자체 작업장 보유',
    zh: '，拥有超过20年的经验和自有工厂',
    hi: ' — 20 से अधिक वर्षों का अनुभव और अपनी खुद की कार्यशाला',
    ja: '。20年以上の経験と自社工房を有しています',
    nl: ' met meer dan 20 jaar ervaring en een eigen werkplaats'
  };

  $: localizedCity = (cities[lang] && cities[lang][fair.city]) ? cities[lang][fair.city] : fair.city;
  // Congresos itinerantes (city === 'Itinerante'): no tienen ciudad/recinto fijos. La ficha
  // se enfoca con honestidad — Standarte monta el stand allá donde se celebre el congreso.
  $: isItinerant = fair.city === 'Itinerante';
  const introItinerant = {
    es: (name, sector) => `Standarte diseña y monta stands para ${name}, un congreso itinerante del sector de ${sector} que cambia de sede cada año. Con taller propio y equipo de montaje, llevamos tu stand allá donde se celebre, en toda España y Portugal.`,
    en: (name, sector) => `Standarte designs and builds stands for ${name}, an itinerant congress in the ${sector} sector that changes host city every year. With our own workshop and assembly crew, we bring your stand wherever it is held, across Spain and Portugal.`,
    de: (name, sector) => `Standarte gestaltet und baut Stände für ${name}, einen wandernden Kongress im Bereich ${sector}, der jedes Jahr den Austragungsort wechselt. Mit eigener Werkstatt und Montageteam bringen wir Ihren Stand dorthin, wo er stattfindet – in ganz Spanien und Portugal.`,
    pt: (name, sector) => `A Standarte concebe e monta stands para ${name}, um congresso itinerante do setor de ${sector} que muda de cidade todos os anos. Com oficina própria e equipa de montagem, levamos o seu stand onde quer que se realize, em toda a Espanha e Portugal.`,
    fr: (name, sector) => `Standarte conçoit et monte des stands pour ${name}, un congrès itinérant du secteur de ${sector} qui change de ville chaque année. Avec notre atelier propre et notre équipe de montage, nous amenons votre stand là où il se tient, partout en Espagne et au Portugal.`,
    it: (name, sector) => `Standarte progetta e monta stand per ${name}, un congresso itinerante del settore ${sector} che cambia sede ogni anno. Con officina propria e squadra di montaggio, portiamo il tuo stand ovunque si svolga, in tutta la Spagna e il Portogallo.`,
    nl: (name, sector) => `Standarte ontwerpt en bouwt stands voor ${name}, een rondreizend congres in de sector ${sector} dat elk jaar van stad wisselt. Met een eigen werkplaats en montageteam brengen we uw stand naar waar het plaatsvindt, in heel Spanje en Portugal.`,
    zh: (name, sector) => `Standarte 为 ${name} 设计并搭建展台——这是 ${sector} 领域每年更换举办城市的巡回大会。我们拥有自有工厂和搭建团队，可在大会举办地为您搭建展台，覆盖西班牙和葡萄牙全境。`,
    hi: (name, sector) => `Standarte ${name} के लिए स्टैंड डिज़ाइन और निर्माण करता है—यह ${sector} क्षेत्र का एक यात्रावर्ती सम्मेलन है जो हर साल शहर बदलता है। अपनी कार्यशाला और असेंबली टीम के साथ, हम आपका स्टैंड वहीं ले जाते हैं जहाँ यह आयोजित होता है, पूरे स्पेन और पुर्तगाल में।`,
    ko: (name, sector) => `Standarte는 ${sector} 분야에서 매년 개최 도시가 바뀌는 순회 학회인 ${name}을(를) 위한 부스를 설계·시공합니다. 자체 작업장과 설치 팀을 통해 학회가 열리는 곳 어디든 부스를 가져다 드리며, 스페인과 포르투갈 전역을 아우릅니다.`,
    ja: (name, sector) => `Standarteは、${sector}分野で毎年開催都市が変わる巡回型の学会である${name}向けにブースを設計・施工します。自社工房と施工チームにより、開催地どこへでもブースをお届けし、スペインとポルトガル全土をカバーします。`
  };
  $: localizedSector = (sectors[lang] && sectors[lang][fair.sector]) ? sectors[lang][fair.sector] : fair.sector;
  $: heroExpStr = heroExp[lang] || heroExp.es;

  // Valor del título: si el nombre de la feria NO incluye ya su ciudad (en ningún idioma),
  // le añadimos la ciudad localizada entre paréntesis para captar la búsqueda local
  // ("stands en [feria] [ciudad]"). Ferias sin ciudad-matriz (Hannover, FIO Monfragüe…)
  // o cuyo nombre ya contiene la ciudad se dejan tal cual.
  $: fairDisplayName = (() => {
    if (!currentCityKey) return fair.name;
    const cityNames = Object.values(cityData[currentCityKey]?.city || {});
    const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const nn = norm(fair.name);
    if (cityNames.some((c) => c && nn.includes(norm(c)))) return fair.name;
    return `${fair.name} (${localizedCity})`;
  })();

  // Miga de pan completa: Inicio -> Ciudad -> Feria. La ciudad se enlaza si tiene
  // página propia (currentCityKey); si no, se muestra como texto. El último paso
  // (la feria) es la página actual, sin enlace. Se rinde con microdatos
  // schema.org/BreadcrumbList para reforzar la estructura ante los buscadores.
  $: breadcrumbItems = (() => {
    const items = [{ name: homeLabel[lang] || 'Home', href: pathFor(lang, 'home') }];
    // El nivel de ciudad se incluye SOLO si tiene página propia (URL). Una ciudad sin
    // página (p. ej. París) generaría un itemListElement intermedio sin "item", que Google
    // marca como dato estructurado inválido. En ese caso se omite (queda Inicio / Feria).
    if (currentCityKey) {
      items.push({
        name: cityData[currentCityKey]?.city?.[lang] || cityData[currentCityKey]?.city?.es,
        href: pathFor(lang, currentCityKey)
      });
    }
    items.push({ name: fair.name, href: null });
    return items;
  })();
  $: strings = (() => {
    const byLang = t[lang];
    if (byLang) return byLang;
    if (import.meta.env.DEV && lang !== 'es') {
      console.warn(`[i18n] Falta traducción t["${lang}"] en Feria.svelte — fallback a ES`);
    }
    return t.es;
  })();
  
  $: seoTitle = `${strings.heroTitle(fairDisplayName)} | Standarte`;
  $: seoDesc = isItinerant
    ? (introItinerant[lang] || introItinerant.es)(fair.name, localizedSector)
    : strings.intro(fair.name, localizedCity, localizedSector);

  // Clúster: enlace al pilar de ciudad + ferias hermanas de la misma región
  $: clusterStr = clusterT[lang] || clusterT.es;
  $: pillarSection = CITY_TO_PILLAR[fair.city];
  $: pillarHref = (pillarSection && routes[lang] && routes[lang][pillarSection] !== undefined) ? pathFor(lang, pillarSection) : null;
  $: pillarCityRaw = pillarSection ? (PILLAR_CITY[pillarSection] || fair.city) : fair.city;
  $: pillarCityLoc = (cities[lang] && cities[lang][pillarCityRaw]) ? cities[lang][pillarCityRaw] : pillarCityRaw;
  $: fairRegion = CITY_REGION[fair.city];
  // Portada del header: ciudad-matriz si la tiene; si no, portada del clúster regional
  // (Portugal Sur usa cover_portugal_sur). Resto sin portada -> header oscuro.
  $: coverKey = currentCityKey || (fairRegion === 'portugal-sur' ? 'portugal_sur' : null);
  // Ferias relacionadas por ACTIVIDAD (no por lugar): otras ferias que comparten
  // al menos una etiqueta de actividad con esta. Se priorizan las que comparten más
  // etiquetas (más afines) y se limita a 12.
  $: siblingFairs = (() => {
    const tags = fairActivityTags;
    if (!tags.length) return [];
    const scored = [];
    for (const f of fairsData) {
      if (f.slug === fair.slug) continue;
      const shared = activitiesForFair(f.slug).filter((t) => tags.includes(t)).length;
      if (shared > 0) scored.push({ f, shared });
    }
    scored.sort((a, b) => b.shared - a.shared);
    return scored.slice(0, 12).map((s) => s.f);
  })();
  $: fairHref = (slug) => fairUrl(slug, lang);
  // Ferias cuya sede NO es el recinto principal de su ciudad-hub (la línea genérica de
  // recinto sería falsa; la sede real se nombra en el contenido único de la ficha).
  // Ej.: CIOCV se asigna al hub de Oporto pero se celebra en la Universidade do Minho (Braga).
  const VENUE_SKIP_FAIRS = ['ciocv-braga', 'foyer-health-beauty-lisboa', 're-plus-portugal-oporto',
    'essencia-do-vinho-porto', 'simplesmente-vinho-porto', 'essencia-do-vinho-lisboa',
    'encontro-vinhos-sabores-lisboa', 'vinhos-de-portugal-lisboa'];
  $: venue = VENUE_SKIP_FAIRS.includes(fair.slug) ? null : (VENUE_BY_CITY[fair.city] || null);
  $: venueText = venue ? ((venueLine[lang] || venueLine.es)(venue, localizedCity)) : null;
  // Actividades (etiquetas) de esta feria, para los chips de color del aside.
  $: fairActivityTags = activitiesForFair(fair.slug);
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDesc} />
  <meta name="robots" content="index, follow" />
  <meta http-equiv="content-language" content={contentLanguages[lang] || 'es-ES'} />
  <link rel="canonical" href={canonical} />
  {#each languages as alternateLang}
    <link rel="alternate" hreflang={alternateLang} href={`https://standarte.es${fairUrl(fair.slug, alternateLang)}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${fairUrl(fair.slug, 'es')}`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDesc} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={languageLocales[lang] || 'es_ES'} />
  {#if lang !== 'es'}
    <meta property="og:locale:alternate" content="es_ES" />
  {:else}
    {#each languages.filter((alternateLang) => alternateLang !== 'es') as alternateLang}
      <meta property="og:locale:alternate" content={languageLocales[alternateLang]} />
    {/each}
  {/if}
</svelte:head>

<svelte:window on:scroll|passive={updateScrollState} />
<header class="site-header static-header">
  {#if coverKey}
    <!-- Portada del header: ciudad-matriz o portada del clúster regional (Portugal Sur). -->
    <img
      class="hero-bg-city"
      src="/img/cover_{coverKey}.avif"
      srcset="/img/cover_{coverKey}-mobile.avif 480w, /img/cover_{coverKey}-md.avif 640w, /img/cover_{coverKey}.avif 800w"
      sizes="100vw"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
    />
  {/if}
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={fairUrl(fair.slug, option)}
              class:active={option === lang}
              on:click={() => {
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem('preferredLanguage', option);
                }
              }}
              style="display: flex; align-items: center; gap: 8px;"
            >
              <FlagIcon langCode={option} size={16} />
              <span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    </div>

    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')}>{copy.nav.services}</a>
      <a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={fairUrl(fair.slug, option)}
              class:active={option === lang}
              on:click={() => {
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem('preferredLanguage', option);
                }
              }}
              style="display: flex; align-items: center; gap: 8px;"
            >
              <FlagIcon langCode={option} size={16} />
              <span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <a
        href="#contact"
        class="nav-cta-btn"
        on:click={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
      >{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>
  
  <div class="hero-subpage" class:on-hero-photo={coverKey}>
    <div class="hero-contents feria-hero-contents">
      <h1>{strings.heroTitle(fairDisplayName)}{heroExpStr}</h1>
    </div>
  </div>
</header>

<main class="feria-page">
  <section class="feria-details section">
    <div class="feria-container">
      <div class="feria-text">
        <nav class="breadcrumbs feria-breadcrumbs" aria-label="Breadcrumb">
          <ol itemscope itemtype="https://schema.org/BreadcrumbList">
            {#each breadcrumbItems as item, i}
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                {#if item.href}
                  <a itemprop="item" href={item.href}><span itemprop="name">{item.name}</span></a>
                {:else}
                  <span class="current" itemprop="name" aria-current={i === breadcrumbItems.length - 1 ? 'page' : undefined}>{item.name}</span>
                  <link itemprop="item" href={canonical} />
                {/if}
                <meta itemprop="position" content={i + 1} />
              </li>
              {#if i < breadcrumbItems.length - 1}
                <li class="bc-sep" aria-hidden="true"><span class="divider">/</span></li>
              {/if}
            {/each}
          </ol>
        </nav>
        <p class="highlight">{seoDesc}</p>
        {#if fairBody}
          <div class="fair-unique">{@html fairBody}</div>
        {/if}
        <p>{strings.intro2}</p>
        {#if venueText}
          <p class="feria-venue">{venueText}</p>
        {/if}

        <h3>{strings.services}</h3>
        <ul class="services-list">
          {#each copy.services as service}
            <li>
              <strong>{service[0]}</strong>
              <p>{service[1]}</p>
            </li>
          {/each}
        </ul>
      </div>
      <aside class="feria-aside">
        <div class="aside-module">
          <h3>{CITY_NAV_LABELS[lang] || CITY_NAV_LABELS.es}</h3>
          <ul class="cluster-fairs">
            {#each CITY_KEYS as ck}
              <li><a href={pathFor(lang, ck)} class:active={ck === currentCityKey}>{cityData[ck]?.city?.[lang] || cityData[ck]?.city?.es}</a></li>
            {/each}
          </ul>
        </div>
        {#if siblingFairs.length}
          <div class="aside-module">
            <h3>{clusterStr.related}</h3>
            <ul class="cluster-fairs">
              {#each siblingFairs as sib}
                <li><a href={fairHref(sib.slug)}><span class="fair-flag flag-{sib.country}" aria-hidden="true"></span>{sib.name}</a></li>
              {/each}
            </ul>
          </div>
        {/if}
        {#if fairActivityTags.length}
          <div class="aside-module">
            <h3>{ACTIVITY_NAV_LABELS[lang] || ACTIVITY_NAV_LABELS.es}</h3>
            <ul class="activity-chips">
              {#each fairActivityTags as tag}
                <li>
                  <a href={activityUrl(tag, lang)} style="--chip:{colorForTag(tag)}">
                    <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tag, lang)}
                  </a>
                </li>
              {/each}
            </ul>
            <a class="activity-all" href={activityIndexUrl(lang)}>{ALL_ACTIVITIES_LABELS[lang] || ALL_ACTIVITIES_LABELS.es} →</a>
          </div>
        {/if}
        <div class="aside-module">
          <a class="cluster-pillar" href={pathFor(lang, 'precios')}>{preciosLink[lang] || preciosLink.es}</a>
        </div>
      </aside>
    </div>
  </section>

  <hr class="feria-form-divider" />
  <section class="section grey-bg">
    <ContactForm labels={copy} {lang} variant="light" />
  </section>
</main>
<footer class="footer">
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} {copy.footer}</p>
    <div class="footer-links">
      <a href="/legal">{copy.legal.legalNotice}</a>
      <a href="/privacidad">{copy.legal.privacy}</a>
      <a href="/cookies">{copy.legal.cookies}</a>
    </div>
  </div>
</footer>

<style>
  .feria-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .nav-bar {
    padding: 2rem 5%;
    background: var(--darker);
  }
  .back-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
  .feria-hero-contents {
    text-align: center;
  }
  /* Header de feria: misma portada que la página de su ciudad-matriz (foto de fondo
     + overlay oscuro vía .hero-bg-city / .hero-subpage.on-hero-photo, reglas globales),
     con texto blanco. Si la feria no tiene ciudad, queda el fondo oscuro de base. */
  .static-header {
    position: relative;
    background: #16191c;
  }
  .static-header .nav {
    z-index: 2;
  }
  .static-header .hero-subpage {
    position: relative;
    z-index: 1;
  }
  .fair-flag-wrapper {
    margin: 1.5rem 0 1rem;
    display: flex;
    justify-content: center;
  }
  .medium-flag {
    display: inline-block;
    position: relative !important;
    top: auto !important;
    left: auto !important;
    width: 30px !important;
    height: 20px !important;
    border-radius: 3px !important;
    background-size: cover;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
  }
  .feria-details {
    padding: 4rem 5%;
    background: #f7f6f1;
  }
  .feria-container {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 48px;
    align-items: start;
  }
  /* Cuerpo principal en caja blanca, igual que el artículo de las páginas de ciudad. */
  .feria-text {
    background: #fff;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    min-width: 0;
  }
  .highlight {
    font-family: 'Francois One', serif;
    font-size: 1.4rem;
    line-height: 1.6;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .feria-text p {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
  /* Párrafos del bloque único (inyectados con @html, fuera del scope de Svelte). */
  .fair-unique :global(p) {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
  .feria-text h3 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    display: inline-block;
  }
  .services-list {
    list-style: none;
    padding: 0;
  }
  .services-list li {
    margin-bottom: 1.5rem;
  }
  .services-list strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .grey-bg {
    background: #f7f6f1;
    padding: 4rem 5%;
  }
  /* Línea horizontal que separa el cuerpo del formulario (igual que en ciudad). */
  .feria-form-divider {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
  .feria-aside {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 40px;
    position: sticky;
    top: 100px;
  }
  .feria-aside h3 {
    font-size: 1.4rem;
    margin: 0 0 1.2rem;
  }
  .aside-module + .aside-module {
    margin-top: 2rem;
  }
  @media (max-width: 900px) {
    .feria-container {
      grid-template-columns: 1fr;
      gap: 32px;
      max-width: 800px;
    }
    .feria-aside {
      border-left: none;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      padding-left: 0;
      padding-top: 28px;
      position: static;
    }
  }
  .cluster-pillar {
    display: inline-block;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 2px;
    margin-bottom: 1.8rem;
  }
  .cluster-pillar:hover {
    opacity: 0.8;
  }
  .cluster-intro {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  .cluster-fairs {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
  }
  .cluster-fairs li a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 999px;
    font-size: 0.92rem;
    color: var(--text-color);
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .cluster-fairs li a:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  /* Bandera del país de la feria (botones de "Ferias en las que también montamos
     stands"): se ve a primera vista en qué país está. El degradado lo aporta la
     clase global .flag-es/.flag-fr/.flag-de/.flag-pt (app.css). */
  .fair-flag {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    flex: 0 0 auto;
  }
  /* Ciudad a la que pertenece esta feria: pastilla resaltada (sigue siendo enlace). */
  .cluster-fairs li a.active {
    border-color: var(--gold);
    background: rgba(212, 175, 55, 0.12);
    color: #1a1e21;
    font-weight: 700;
  }
  /* Chips de actividad con código de color (variable --chip por etiqueta). */
  .activity-chips {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .activity-chips li a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.8rem;
    border: 1px solid color-mix(in srgb, var(--chip) 45%, transparent);
    border-left: 4px solid var(--chip);
    border-radius: 6px;
    font-size: 0.9rem;
    color: var(--text-color);
    text-decoration: none;
    background: color-mix(in srgb, var(--chip) 7%, #fff);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .activity-chips li a:hover {
    background: color-mix(in srgb, var(--chip) 16%, #fff);
    border-color: var(--chip);
  }
  .chip-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--chip);
    flex: 0 0 auto;
  }
  .activity-all {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
  }
  .activity-all:hover { opacity: 0.8; }
</style>
