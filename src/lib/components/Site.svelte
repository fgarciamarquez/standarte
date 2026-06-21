<script>
  import { fairsData as fairItems } from '$lib/fairsData.js';
  import { onMount } from 'svelte';
  import { pushState, replaceState } from '$app/navigation';
  import { languages, languageLabels, pathFor, cityData, portfolios } from '$lib/siteData.js';
  import { projectIndex as projects } from '$lib/projectIndex.js';
  import { LOCALES, localBusinessSchema } from '$lib/seo.js';
  import MicroStand from './MicroStand.svelte';
  import ContactForm from './ContactForm.svelte';
  import AiSourceButtons from './AiSourceButtons.svelte';
  import CookieConsent from './CookieConsent.svelte';
  import FlagIcon from './FlagIcon.svelte';
  import LangFlagIntro from './LangFlagIntro.svelte';
  // WelcomeAdvisor NO se importa de forma estática: se carga con import dinámico
  // (chunk aparte) tras cargar la página, para no colgar del bundle principal.

  export let lang;
  export let section;
  export let copy;
  export let canonical;
  export let initialLightboxSlug = null;
  // Las páginas de galería reutilizan Site con section="custom"; ahí el hreflang
  // por sección apuntaría al listado de galería (incorrecto), así que lo desactivan.
  export let emitHreflang = true;
  // Datos SEO enriquecidos de la sección actual (todas las lenguas), inyectados
  // por el load del servidor; richSeoData.js completo ya no viaja al cliente.
  export let richSeo = null;

  let initialFair = '';
  let showWelcomeAdvisor = false;
  let advisorTimeout;
  let AdvisorComponent = null; // se rellena con el import dinámico
  let advisorLoadHandler;      // ref del listener 'load' para poder limpiarlo

  function handleSelectFair(event) {
    const { fairName, cityName } = event.detail;
    initialFair = `${fairName} (${cityName})`;
  }

  const ctaLabels = {
    es: 'PRESUPUESTO EN 24 H',
    en: 'QUOTE IN 24 H',
    de: 'ANGEBOT IN 24 H',
    pt: 'ORÇAMENTO EM 24 H',
    zh: '24小时内报价',
    hi: '24 घंटे में कोटेशन',
    fr: 'DEVIS EN 24 H',
    it: 'PREVENTIVO IN 24 H',
    ko: '24시간 내 견적',
    ja: '24時間で見積もり',
    nl: 'OFFERTE BINNEN 24 U'
  };

  const teamMemberName = {
    es: 'Equipo de Victoria',
    en: "Victoria's Team",
    de: "Victorias Team",
    zh: '维多利亚团队',
    hi: 'विक्टोरिया की टीम',
    pt: 'Equipa de Victoria',
    fr: 'Équipe de Victoria',
    it: 'Team di Victoria',
    ko: '빅토리아 팀',
    ja: 'ビクトリアのチーム',
    nl: 'Team van Victoria'
  };

  // Galería: nº de fotos visibles antes del botón "Ver más" (el resto queda en el
  // DOM pero oculto con display:none, sin descargarse hasta desplegar).
  const GALLERY_VISIBLE = 12;
  // Ciudades de id="local-stands": nº visible antes del botón "Ver más"; el resto
  // queda en el DOM (con sus textos y enlaces, para SEO) pero oculto con display:none.
  const CITIES_VISIBLE = 3;
  const galleryMoreLabels = {
    es: 'Ver más', en: 'See more', de: 'Mehr anzeigen', zh: '查看更多',
    hi: 'और देखें', pt: 'Ver mais', fr: 'Voir plus', it: 'Vedi altro',
    ko: '더 보기', ja: 'もっと見る', nl: 'Meer zien'
  };

  let menuOpen = false;
  let lightboxProject = null;
  let galleryExpanded = false;
  let citiesExpanded = false;
  let legalModal = null;
  let isScrolled = false;
  let ignoreNextScroll = false;

  // Prototipos 3D Carousel State
  let carouselIndex = 0;
  // Proyectos de Extremadura: son casos locales, NO van en el carrusel 3D genérico (prototipos-3d).
  const CAROUSEL_EXCLUDE_LOCS = ['Don Benito', 'Badajoz', 'Zafra', 'Almendralejo'];
  let shuffledProjects = projects.filter((p) => !CAROUSEL_EXCLUDE_LOCS.includes(p.location));

  // Carga por tramos: solo se renderizan/descargan las primeras 12 fichas; el resto
  // se descarga en grupos de 12 al pulsar el descargador circular del carrusel.
  const CAROUSEL_CHUNK = 12;
  let carouselRevealed = CAROUSEL_CHUNK;
  $: carouselItems = shuffledProjects.slice(0, carouselRevealed);
  $: hasMoreCarousel = carouselRevealed < shuffledProjects.length;
  $: carouselSlots = carouselItems.length; // solo fichas (sin botón descargador)
  function revealMoreCarousel() {
    carouselRevealed = Math.min(carouselRevealed + CAROUSEL_CHUNK, shuffledProjects.length);
  }
  // Blindaje anti-imagen-rota: si el thumb falla, cae a la imagen completa; si esa también, oculta la tarjeta.
  function handleThumbError(e, project) {
    const img = e.currentTarget;
    if (!img.dataset.fallback) {
      img.dataset.fallback = '1';
      img.src = project.image; // intentar la imagen completa (sin -thumb)
    } else {
      const card = img.closest('.carousel-card');
      if (card) card.style.display = 'none';
    }
  }

  let visibleCount = 3;

  function updateVisibleCount() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) {
      visibleCount = 1;
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      visibleCount = 2;
    } else {
      visibleCount = 3;
    }
  }

  // Auto-revela el siguiente tramo al acercarse al final (sin botón manual): solo se
  // renderizan/descargan fichas a medida que el visitante navega, manteniendo ligera la carga.
  $: if (hasMoreCarousel && carouselIndex >= carouselRevealed - visibleCount - 1) {
    revealMoreCarousel();
  }

  function nextSlide() {
    const maxIndex = Math.max(0, carouselSlots - visibleCount);
    if (carouselIndex < maxIndex) {
      carouselIndex++;
    } else if (!hasMoreCarousel) {
      carouselIndex = 0; // vuelve al inicio solo cuando ya está todo cargado
    }
  }

  function prevSlide() {
    const maxIndex = Math.max(0, carouselSlots - visibleCount);
    if (carouselIndex > 0) {
      carouselIndex--;
    } else {
      carouselIndex = maxIndex;
    }
  }

  const modularEnabled = false;
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
  const cityKeys = ['madrid', 'lisboa', 'oporto', 'valencia', 'mallorca', 'vigo', 'batalha', 'bilbao', 'barcelona', 'malaga', 'badajoz', 'sevilla', 'ciudad_real', 'zaragoza'];
  const cookieSettingsLabels = {
    es: 'Configurar cookies',
    en: 'Cookie settings',
    de: 'Cookie-Einstellungen',
    zh: 'Cookie 设置',
    hi: 'कुकी सेटिंग्स',
    pt: 'Configurar cookies',
    fr: 'Configurer les cookies',
    it: 'Impostazioni cookie',
    ko: '쿠키 설정',
    ja: 'クッキー設定',
    nl: 'Cookies configureren'
  };
  const campaignManagerLabels = {
    es: 'Admin',
    en: 'Admin',
    de: 'Admin',
    zh: '管理',
    hi: 'Admin',
    pt: 'Admin',
    fr: 'Admin',
    it: 'Admin',
    ko: 'Admin',
    ja: '管理',
    nl: 'Admin'
  };
  const fairListTitles = {
    es: 'Ferias destacadas en España, Portugal, Alemania y Francia para diseño y montaje de stands',
    en: 'Featured fairs in Spain, Portugal, Germany and France for exhibition stand design and assembly',
    de: 'Wichtige Messen in Spanien, Portugal, Deutschland und Frankreich für Messestand Design und Montage',
    zh: '西班牙、葡萄牙、德国和法国展台设计与搭建重点展会',
    hi: 'स्पेन, पुर्तगाल, जर्मनी और फ्रांस में स्टैंड डिज़ाइन और असेंबली के लिए प्रमुख मेले',
    pt: 'Feiras em destaque em Espanha, Portugal, Alemanha e França para design e montagem de stands',
    ko: '전시 부스 디자인 및 조립을 위한 스페인, 포르투갈, 독일, 프랑스의 주요 박람회',
    fr: 'Salons phares en Espagne, Portugal, Allemagne et France pour la conception et le montage de stands',
    it: 'Fiere di rilievo in Spagna, Portogallo, Germania e Francia per la progettazione e il montaggio di stand',
    ja: 'スペイン・ポルトガル・ドイツ・フランスの主要見本市（展示会ブース設計・組立）',
    nl: 'Belangrijke beurzen in Spanje, Portugal, Duitsland en Frankrijk voor standontwerp en montage'
  };
  const counterItems = [
    { key: 'projects', value: 169, icon: 'counter-book' },
    { key: 'clients', value: 145, icon: 'counter-briefcase' },
    { key: 'countries', value: 22, icon: 'counter-flag' },
    { key: 'fairs', value: 158, icon: 'counter-calendar' }
  ];

  let displayedCounters = counterItems.map(item => item.value);
  let countersStarted = false;

  // TEMPORAL: Ocultar imágenes desde la 13ª hasta la última (no borrar, reactivar en una semana)
  // Para reactivar todas las fotos la próxima semana, cambia "portfolios.slice(0, 12)" por "portfolios"
  const activePortfolios = portfolios;

  $: filteredPortfolios = activePortfolios;

  $: if (section && typeof window !== 'undefined') {
    let targetId = section;
    if (section in cityData) {
      targetId = section;
    } else if (section === 'luzpavilion') {
      targetId = 'micro-stand';
    }
    if (ignoreNextScroll) {
      ignoreNextScroll = false;
    } else {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }

  // Para japonés (sin rich-ja todavía) usamos null en vez de caer al español:
  // así la página muestra su título/intro japonés en lugar de un cuerpo en otro idioma.
  $: seoContent = richSeo ? (richSeo[lang] || (lang === 'ja' ? null : (richSeo.en || richSeo.es)) || null) : null;
  // Hero con fondo animado (fotos en movimiento) en la home Y en las páginas matriz de ciudad.
  $: animatedHero = section === 'home' || (section in cityData);
  // ¿Es una página matriz de ciudad? (controla dónde va la miga de pan).
  $: isCityPage = section in cityData;
  // Proyectos del pilar: para regiones con perfil sectorial marcado mostramos obra real afín
  // (no se afirma que sean de esa ciudad; el intro es genérico "muestra de nuestro trabajo").
  $: selectedPortfolios = (FEATURED_BY_REGION[SECTION_REGION[section]] || [])
    .map((k) => portfolios.find((p) => p.alt && p.alt.includes(k)))
    .filter(Boolean)
    .concat(portfolios.slice(0, 3))
    .slice(0, 3);

  // --- Clúster pilar→ferias: en cada página de ciudad, enlazar a las ferias de su región ---
  const SECTION_REGION = {
    badajoz: 'extremadura', montaje_zafra: 'extremadura', montaje_don_benito: 'extremadura', montaje_badajoz: 'extremadura',
    madrid: 'madrid', barcelona: 'cataluna', bilbao: 'paisvasco',
    malaga: 'andalucia', sevilla: 'andalucia', ciudad_real: 'castillalamancha', lisboa: 'portugal', oporto: 'portugal', valencia: 'comunidadvalenciana', mallorca: 'baleares', vigo: 'galicia', batalha: 'portugal', zaragoza: 'aragon'
  };
  const FAIR_CITY_REGION = {
    'Badajoz': 'extremadura', 'Don Benito': 'extremadura', 'Almendralejo': 'extremadura', 'Plasencia': 'extremadura', 'Mérida': 'extremadura', 'Zafra': 'extremadura', 'Cáceres': 'extremadura',
    'Madrid': 'madrid', 'Barcelona': 'cataluna', 'Bilbao': 'paisvasco', 'Málaga': 'andalucia', 'Sevilla': 'andalucia', 'Ciudad Real': 'castillalamancha', 'Lisboa': 'portugal', 'Oporto': 'portugal', 'Batalha': 'portugal', 'Valencia': 'comunidadvalenciana', 'Mallorca': 'baleares', 'Zaragoza': 'aragon', 'Vigo': 'galicia'
  };
  // Proyectos reales afines al perfil sectorial de cada región (obra propia; sin afirmar ubicación).
  const FEATURED_BY_REGION = {
    extremadura: ['Bellota', 'Intermaher', 'Elumatec'], // herramientas agrícolas, maquinaria pesada, industrial
    portugal: ['Philips', 'Tecnalia', 'Pharmatechnik'], // tech+salud, innovación, farma — perfil de los congresos de Lisboa
    paisvasco: ['Intermaher', 'Bellota', 'Elumatec'], // maquinaria pesada (BIEMH), herramientas (Ferroforma), industrial — perfil de las ferias del BEC Bilbao
    madrid: ['Pescanova', 'Philips', 'Fanuc'], // alimentación (Fruit Attraction), tecnología/salud (Madrid Tech Show), robótica — perfil multisectorial de IFEMA
    aragon: ['Intermaher', 'Zayer', 'Bellota'] // maquinaria pesada/agrícola e industrial — perfil de FIMA y SMOPYC en la Feria de Zaragoza
  };
  const cityFairsLabel = {
    es: 'Ferias de la zona en las que diseñamos y montamos stands',
    en: 'Fairs in the area where we design and build stands',
    de: 'Messen in der Region, auf denen wir Stände gestalten und bauen',
    fr: 'Salons de la région où nous concevons et construisons des stands',
    pt: 'Feiras da região onde concebemos e montamos stands',
    it: 'Fiere della zona in cui progettiamo e allestiamo stand',
    ko: '저희가 부스를 디자인하고 시공하는 인근 전시회',
    zh: '我们在该地区设计和搭建展台的展会',
    hi: 'इस क्षेत्र के मेले जहाँ हम स्टैंड डिज़ाइन और निर्माण करते हैं',
    ja: '当社がブースの設計・施工を行う近隣の展示会',
    nl: 'Beurzen in de regio waar wij stands ontwerpen en bouwen'
  };
  // Navegación entre ciudades matrices (módulo del sidebar, igual que en Feria).
  // Solo matrices (construccion_stands_*); excluye las landings de montaje secundarias.
  const CITY_NAV_KEYS = Object.keys(cityData).filter((k) => !k.startsWith('montaje_'));
  const CITY_NAV_LABELS = {
    es: 'Ciudades', en: 'Cities', de: 'Städte',
    fr: 'Villes', it: 'Città', pt: 'Cidades',
    zh: '城市', hi: 'शहर', ko: '도시', ja: '都市', nl: 'Steden'
  };
  // Las FAQs se muestran en una rejilla de dos columnas: deben ser siempre pares.
  // Si la página trae un número impar, añadimos esta pregunta genérica (válida para
  // cualquier ciudad) para cuadrar la rejilla.
  const FILLER_FAQ = {
    es: { q: '¿Trabajáis solo en esta ciudad o en toda España y Portugal?', a: 'Diseñamos, fabricamos y montamos stands en toda España y Portugal. Al contar con taller propio y equipo de montaje, nos desplazamos a cualquier recinto ferial con la misma garantía de calidad y plazos.' },
    en: { q: 'Do you work only in this city or across Spain and Portugal?', a: 'We design, build and install stands throughout Spain and Portugal. With our own workshop and assembly team, we travel to any exhibition venue with the same guarantee of quality and deadlines.' },
    de: { q: 'Arbeiten Sie nur in dieser Stadt oder in ganz Spanien und Portugal?', a: 'Wir entwerfen, fertigen und montieren Messestände in ganz Spanien und Portugal. Mit eigener Werkstatt und Montageteam reisen wir zu jedem Messegelände – mit derselben Qualitäts- und Termingarantie.' },
    fr: { q: 'Travaillez-vous uniquement dans cette ville ou dans toute l\'Espagne et le Portugal ?', a: 'Nous concevons, fabriquons et montons des stands dans toute l\'Espagne et le Portugal. Avec notre propre atelier et notre équipe de montage, nous nous déplaçons dans n\'importe quel parc des expositions avec la même garantie de qualité et de délais.' },
    it: { q: 'Lavorate solo in questa città o in tutta la Spagna e il Portogallo?', a: 'Progettiamo, costruiamo e allestiamo stand in tutta la Spagna e il Portogallo. Avendo officina propria e squadra di montaggio, ci spostiamo in qualsiasi quartiere fieristico con la stessa garanzia di qualità e tempi.' },
    pt: { q: 'Trabalham apenas nesta cidade ou em toda a Espanha e Portugal?', a: 'Concebemos, fabricamos e montamos stands em toda a Espanha e Portugal. Com oficina própria e equipa de montagem, deslocamo-nos a qualquer recinto de feiras com a mesma garantia de qualidade e prazos.' },
    zh: { q: '你们只在这座城市还是在整个西班牙和葡萄牙开展业务？', a: '我们在整个西班牙和葡萄牙设计、制造和搭建展台。我们拥有自己的工厂和搭建团队，能够前往任何展览场馆，并提供同样的质量和工期保证。' },
    hi: { q: 'क्या आप केवल इसी शहर में काम करते हैं या पूरे स्पेन और पुर्तगाल में?', a: 'हम पूरे स्पेन और पुर्तगाल में स्टैंड डिज़ाइन, निर्माण और स्थापित करते हैं। अपनी कार्यशाला और असेंबली टीम के साथ, हम उसी गुणवत्ता और समयसीमा की गारंटी के साथ किसी भी प्रदर्शनी स्थल तक पहुँचते हैं।' },
    ko: { q: '이 도시에서만 작업하시나요, 아니면 스페인과 포르투갈 전역에서 작업하시나요?', a: '저희는 스페인과 포르투갈 전역에서 부스를 디자인·제작·설치합니다. 자체 작업장과 설치 팀을 보유하고 있어 동일한 품질과 납기 보장으로 어떤 전시장이든 방문합니다.' },
    ja: { q: 'この都市だけで対応していますか、それともスペインとポルトガル全土ですか？', a: '当社はスペインとポルトガル全土でブースの設計・製造・施工を行っています。自社工房と施工チームを擁し、同じ品質と納期の保証のもと、どの展示会場へも出向きます。' },
    nl: { q: 'Werken jullie alleen in deze stad of in heel Spanje en Portugal?', a: 'Wij ontwerpen, produceren en bouwen stands in heel Spanje en Portugal. Met een eigen werkplaats en montageteam reizen we naar elk beurscomplex met dezelfde garantie op kwaliteit en deadlines.' }
  };
  $: faqsEven = (() => {
    const list = seoContent?.faqs ? [...seoContent.faqs] : [];
    if (list.length % 2 === 1) list.push(FILLER_FAQ[lang] || FILLER_FAQ.es);
    return list;
  })();
  $: regionFairs = SECTION_REGION[section]
    ? fairItems.filter((f) => FAIR_CITY_REGION[f.city] === SECTION_REGION[section])
    : [];
  $: fairHrefSite = (slug) => (lang === 'es' ? `/ferias/${slug}` : `/${lang}/ferias/${slug}`);

  $: title = seoContent?.title || (section in cityData
    ? `${cityTitle(section)} | Standarte`
    : section === 'home'
      ? copy.seoTitle
      : `${sectionLabel(section)} | Standarte`);

  $: description = seoContent
    ? seoContent.introText
    : (section in cityData
      ? `${cityTitle(section)}. ${copy.citiesIntro}`
      : copy.seoDescription);

  $: structuredData = JSON.stringify(buildStructuredData());
  $: structuredDataScript = `<script type="application/ld+json">${structuredData.replace(/</g, '\\u003c')}<` + '/script>';

  function sectionLabel(id) {
    if (id === 'services') return copy.nav.services;
    if (id === 'custom') return copy.nav.custom;
    if (id === 'contact') return copy.nav.contact;
    if (id === 'team') return copy.teamTitle;
    return 'Standarte';
  }

  function cityTitle(id) {
    const city = cityData[id]?.city?.[lang] || cityData[id]?.city?.es || '';
    if (lang === 'de') return `Messestand Design und Montage in ${city}`;
    if (lang === 'en') return `Stand design and assembly in ${city}`;
    if (lang === 'pt') return `Design e montagem de stands em ${city}`;
    if (lang === 'fr') return `Conception et montage de stands à ${city}`;
    if (lang === 'it') return `Progettazione e montaggio stand a ${city}`;
    if (lang === 'zh') return `${city} 展台设计与搭建`;
    if (lang === 'hi') return `${city} में स्टैंड डिज़ाइन और असेंबली`;
    if (lang === 'ko') return `${city} 전시 부스 디자인 및 조립`;
    if (lang === 'ja') return `${city}での展示会ブース設計・組立`;
    return `Diseño y montaje de stands en ${city}`;
  }

  function cityContent(id) {
    const city = cityData[id];
    const byLang = city?.content?.[lang] || city?.content?.es || {};
    return byLang;
  }


  function getProjectTitle(project) {
    if (project?.title) {
      return project.title[lang] || project.title.es || project.name;
    }
    return project?.alt || project?.name || '';
  }

  function projectDescription(project) {
    return project?.description?.[lang] || project?.description?.es || '';
  }

  function buildStructuredData() {
    const baseUrl = 'https://standarte.es';
    const navigationItems = [
      ['Servicios', pathFor('es', 'services')],
      ['Galería', pathFor('es', 'custom')],
      ['Equipo', pathFor('es', 'team')],
      ['Contacto', pathFor('es', 'contact')],
      ['Diseño y montaje de stands en Madrid', pathFor('es', 'madrid')],
      ['Diseño y montaje de stands en Barcelona', pathFor('es', 'barcelona')],
      ['Diseño y montaje de stands en Bilbao', pathFor('es', 'bilbao')],
      ['Diseño y montaje de stands en Lisboa', pathFor('es', 'lisboa')],
      ['Diseño y montaje de stands en Málaga', pathFor('es', 'malaga')],
      ['Diseño y montaje de stands en Badajoz', pathFor('es', 'badajoz')],
      ['Montaje de stands en Zafra', pathFor('es', 'montaje_zafra')],
      ['Montaje de stands en Don Benito', pathFor('es', 'montaje_don_benito')],
      ['Montaje de stands en Badajoz', pathFor('es', 'montaje_badajoz')]
    ];

    const isCityPage = section in cityData;
    const cityDisplayName = isCityPage ? (cityData[section]?.city?.[lang] || cityData[section]?.city?.es || section) : '';

    const organization = {
      ...localBusinessSchema,
      '@id': `${baseUrl}/#organization`,
      url: `${baseUrl}/`,
      logo: `${baseUrl}/img/logo_standarte_rectanular.png`,
      image: `${baseUrl}/img/trabajos/TCANTICO/1.avif`,
      priceRange: '$$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '158'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      areaServed: localBusinessSchema.areaServed.map(c => c.name)
    };

    const service = {
      '@type': 'Service',
      '@id': `${baseUrl}/#service`,
      name: lang === 'es' ? 'Diseño y montaje de stands para ferias' : 'Exhibition stand design and assembly',
      serviceType: isCityPage ? 'Diseño y montaje de stands' : 'Exhibition Stand Builder',
      provider: { '@id': `${baseUrl}/#organization` },
      description: copy.seoDescription,
      areaServed: isCityPage ? cityDisplayName : ['ES', 'PT', 'DE', 'FR']
    };

    const website = {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: 'Standarte',
      description: 'Standarte diseña, fabrica y monta stands para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Zafra, Don Benito, Cáceres, Lisboa y otros destinos nacionales e internacionales.',
      inLanguage: contentLanguages[lang] || 'es-ES',
      publisher: { '@id': `${baseUrl}/#organization` }
    };

    const webpage = {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: contentLanguages[lang] || 'es-ES',
      isPartOf: { '@id': `${baseUrl}/#website` }
    };

    const siteNavigation = {
      '@type': 'ItemList',
      '@id': `${baseUrl}/#site-navigation`,
      name: lang === 'es' ? 'Estructura principal de Standarte' : 'Standarte Main Structure',
      itemListElement: navigationItems.map(([name, path], index) => ({
        '@type': 'SiteNavigationElement',
        position: index + 1,
        name,
        url: `${baseUrl}${path}`
      }))
    };

    const graph = [organization, service, website, webpage, siteNavigation];

    if (section !== 'home') {
      const breadcrumbLabel = seoContent?.breadcrumb || sectionLabel(section);
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'es' ? 'Inicio' : 'Home',
            item: `${baseUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbLabel,
            item: canonical
          }
        ]
      });
    }

    if (seoContent?.faqs && seoContent.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faqpage`,
        mainEntity: seoContent.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      });
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graph
    };
  }

  function fairSeoText(fairName) {
    if (lang === 'en') return `Stand design and assembly at ${fairName}`;
    if (lang === 'de') return `Messestand Design und Montage auf der ${fairName}`;
    if (lang === 'zh') return `${fairName} 展台设计与搭建服务`;
    if (lang === 'hi') return `${fairName} में स्टैंड डिज़ाइन और असेंबली`;
    if (lang === 'pt') return `Design e montagem de stands na ${fairName}`;
    if (lang === 'fr') return `Conception et montage de stands à ${fairName}`;
    if (lang === 'it') return `Progettazione e montaggio stand a ${fairName}`;
    return `Diseño y montaje de stand en ${fairName}`;
  }

  function openLightbox(project) {
    lightboxProject = project;
  }

  function closeLightbox() {
    lightboxProject = null;
  }

  function openLegalModal(type) {
    const titles = {
      privacy: copy.legal.privacy,
      legalNotice: copy.legal.legalNotice,
      cookies: copy.legal.cookies
    };

    legalModal = {
      title: titles[type],
      content: copy.legalText?.[type] || ''
    };
  }

  function closeLegalModal() {
    legalModal = null;
  }

  function openCookieSettings() {
    window.dispatchEvent(new CustomEvent('standarte:open-cookie-settings'));
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (lightboxProject) {
        closeLightbox();
        return;
      }

      if (legalModal) closeLegalModal();
    }
  }

  function updateScrollState() {
    isScrolled = window.scrollY > 8;
  }

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayedCounters = counterItems.map((item) => Math.round(item.value * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function scrollTo(id) {
    menuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      let routeSection = id === 'local-stands' ? 'madrid' : id;
      if (routeSection === 'micro-stand') routeSection = 'luzpavilion';
      ignoreNextScroll = true; // Avoid double scrolling from the reactive statement
      pushState(pathFor(lang, routeSection), {});
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleNavClick(event, id) {
    if (section === 'home') {
      event.preventDefault();
      scrollTo(id);
    } else if (id === 'contact' && section in cityData) {
      // En páginas de ciudad el formulario está en la propia página: hacemos scroll
      // al #contact local en vez de navegar a la home, y sin alterar la URL.
      event.preventDefault();
      menuOpen = false;
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onMount(() => {
    displayedCounters = counterItems.map(() => 0);

    // El asesor se invoca SOLO una vez la página ha terminado de cargar, y su
    // código se trae con import dinámico (chunk aparte) para no comprometer el
    // rendimiento de la carga principal.
    const launchAdvisor = () => {
      advisorTimeout = setTimeout(() => {
        // Si el visitante ya completó el formulario del asesor en esta sesión,
        // no lo volvemos a mostrar para no molestar.
        if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('standarte_advisor_dismissed') === '1') return;
        import('./WelcomeAdvisor.svelte')
          .then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; })
          .catch(() => {});
      }, 8000); // antes 2000 ms; +6 s para que Pat aparezca más tarde
    };
    if (document.readyState === 'complete') {
      launchAdvisor();
    } else {
      advisorLoadHandler = launchAdvisor;
      window.addEventListener('load', advisorLoadHandler, { once: true });
    }

    if (initialLightboxSlug) {
      const p = portfolios.find(x => x.slugs && Object.values(x.slugs).includes(initialLightboxSlug));
      if (p) openLightbox(p);
    }

    if (section === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Automatic browser language detection and redirect
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedPref = localStorage.getItem('preferredLanguage') || localStorage.getItem('standarte_lang');
      const hasAutoRedirected = sessionStorage.getItem('hasAutoRedirected');
      
      // Save current language preference when visited
      localStorage.setItem('preferredLanguage', lang);
      localStorage.setItem('standarte_lang', lang);

      if (lang === 'es' && !hasAutoRedirected) {
        sessionStorage.setItem('hasAutoRedirected', 'true');
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, section);
          return;
        } else if (!savedPref) {
          const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
            .split('-')[0]
            .toLowerCase();
          
          if (browserLang !== 'es' && languages.includes(browserLang)) {
            localStorage.setItem('preferredLanguage', browserLang);
            localStorage.setItem('standarte_lang', browserLang);
            window.location.href = pathFor(browserLang, section);
            return;
          } else {
            localStorage.setItem('preferredLanguage', 'es');
            localStorage.setItem('standarte_lang', 'es');
          }
        }
      }
    }

    // Desordenar proyectos aleatoriamente en cliente para alternar visualización
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    shuffledProjects = shuffleArray(projects.filter((p) => !CAROUSEL_EXCLUDE_LOCS.includes(p.location)));

    updateScrollState();
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount, { passive: true });


    if (section && section !== 'home') {
      let targetId = section;
      if (section in cityData) {
        targetId = 'local-stands';
      } else if (section === 'luzpavilion') {
        targetId = 'micro-stand';
      }
      setTimeout(() => scrollTo(targetId), 120);
    }

    const observed = ['services', 'micro-stand', 'custom', 'team', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const routeById = {
      services: 'services',
      'micro-stand': 'luzpavilion',
      custom: 'custom',
      team: 'team',
      contact: 'contact'
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && routeById[entry.target.id])
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        if (section in cityData) return; // Do not overwrite city URL on scroll
        const nextPath = pathFor(lang, routeById[visible.target.id]);
        if (window.location.pathname !== nextPath) {
          ignoreNextScroll = true;
          replaceState(nextPath, {});
        }
      }
    }, { threshold: [0.35, 0.6] });

    observed.forEach((el) => observer.observe(el));

    const countersEl = document.querySelector('.counters');
    const countersObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounters();
        countersObserver.disconnect();
      }
    }, { threshold: 0.35 });

    if (countersEl) countersObserver.observe(countersEl);

    const autoplayInterval = setInterval(nextSlide, 3000);

    return () => {
      observer.disconnect();
      countersObserver.disconnect();
      clearInterval(autoplayInterval);
      clearTimeout(advisorTimeout);
      if (advisorLoadHandler) window.removeEventListener('load', advisorLoadHandler);
      window.removeEventListener('resize', updateVisibleCount);
    };
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta http-equiv="content-language" content={contentLanguages[lang] || 'es-ES'} />
  <link rel="canonical" href={canonical} />
  {#if animatedHero || section === 'contact' || section === 'services'}
    <!-- Preload de la imagen de fondo del hero (LCP) — incluye home Y páginas de ciudad. -->
    <link
      rel="preload"
      as="image"
      href="/img/bg2-mobile.webp"
      media="(max-width: 768px)"
      fetchpriority="high"
    />
    <link
      rel="preload"
      as="image"
      href="/img/bg2.webp"
      media="(min-width: 769px)"
      fetchpriority="high"
    />
  {/if}
  {#if emitHreflang}
    {#each LOCALES as loc}
      <link rel="alternate" hreflang={loc.lang} href={`https://standarte.es${pathFor(loc.lang, section)}`} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', section)}`} />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={(LOCALES.find(loc => loc.lang === lang)?.ogLocale) || 'es_ES'} />
  {#each LOCALES.filter((loc) => loc.lang !== lang) as loc}
    <meta property="og:locale:alternate" content={loc.ogLocale} />
  {/each}
  {@html structuredDataScript}
</svelte:head>

<svelte:window on:keydown={handleKeydown} on:scroll|passive={updateScrollState} />

<header class="site-header" class:static-header={section !== 'home' && section !== 'contact' && section !== 'services' && !animatedHero} class:hero-anim={animatedHero}>
  {#if animatedHero}
    <div class="hero-bg-layer hero-bg-a" aria-hidden="true"></div>
    <div class="hero-bg-layer hero-bg-b" aria-hidden="true"></div>
  {/if}
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={pathFor(option, section)}
              class:active={lang === option}
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
      <a href={pathFor(lang, 'home')} on:click={(e) => handleNavClick(e, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')} on:click={(e) => handleNavClick(e, 'services')}>{copy.nav.services}</a>
      {#if modularEnabled}
        <a href={pathFor(lang, 'stand-modular')} on:click={(e) => handleNavClick(e, 'stand-modular')}>Stand Modular</a>
      {/if}
      <a href={pathFor(lang, 'custom')} on:click={(e) => handleNavClick(e, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={pathFor(option, section)}
              class:active={lang === option}
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
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn" on:click={(e) => handleNavClick(e, 'contact')}>{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>
  
  {#if ['home', 'contact', 'services', 'custom', 'luzpavilion', 'team'].includes(section)}
    <section id="home" class="hero">
      <div class="contents">
        <h1>{copy.heroTitle}</h1>
      </div>
      <AiSourceButtons {lang} variant="hero" />
    </section>
  {:else if seoContent}
    <div class="hero-subpage" class:transparent-hero={section === 'services'} class:on-hero-photo={animatedHero}>
      <div class="hero-contents">
        {#if !isCityPage}
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><a href={pathFor(lang, 'home')}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
              <li><span class="divider">/</span></li>
              <li><span class="current" aria-current="page">{seoContent.breadcrumb}</span></li>
            </ol>
          </nav>
        {/if}
        <h1>{seoContent.h1}</h1>
        <p class="hero-lead">{seoContent.introText}</p>
      </div>
      {#if animatedHero}<AiSourceButtons {lang} variant="hero" showLabel={false} />{/if}
    </div>
  {/if}
</header>

<main>
  {#if ['home', 'contact', 'services', 'custom', 'luzpavilion', 'team'].includes(section)}
    {#if showWelcomeAdvisor && AdvisorComponent}
      <svelte:component this={AdvisorComponent} {lang} on:selectFair={handleSelectFair} on:openPrivacy={() => openLegalModal('privacy')} on:dismiss={() => showWelcomeAdvisor = false} />
    {/if}
    <section id="local-stands" class="section local-stands">
      <h2 class="section-intro">{copy.citiesIntro}</h2>
      <div class="city-grid">
        {#each cityKeys as cityKey, i}
          <article id={cityKey} class:cities-hidden={!citiesExpanded && i >= CITIES_VISIBLE && cityKey !== section}>
            <a href={pathFor(lang, cityKey)} class="city-cover-link">
              <div class="city-cover-container">
                <img
                  src="/img/cover_{cityKey}.avif"
                  srcset="/img/cover_{cityKey}-mobile.avif 480w, /img/cover_{cityKey}-md.avif 640w, /img/cover_{cityKey}.avif 800w"
                  sizes="(max-width: 768px) 90vw, 380px"
                  width="640"
                  height="360"
                  alt={cityTitle(cityKey)}
                  class="city-cover-image"
                  loading="lazy"
                />
              </div>
            </a>
            <h3>{cityTitle(cityKey)}</h3>
            <p>{cityContent(cityKey).intro}</p>
            <p>{cityContent(cityKey).detail}</p>
            <a href={pathFor(lang, cityKey)} class="city-link-circle" aria-label={cityTitle(cityKey)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </a>
          </article>
        {/each}
      </div>

      {#if !citiesExpanded && cityKeys.length > CITIES_VISIBLE}
        <div class="gallery-more-wrap">
          <button type="button" class="gallery-more-btn" on:click={() => (citiesExpanded = true)}>
            {galleryMoreLabels[lang] || galleryMoreLabels.es}
          </button>
        </div>
      {/if}

      <section class="lisbon-fairs-strip" aria-label={fairListTitles[lang] || fairListTitles.es} itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content={fairListTitles[lang] || fairListTitles.es} />
        <meta itemprop="itemListOrder" content="https://schema.org/ItemListOrderAscending" />
        <div class="lisbon-fairs-track">
          {#each [0, 1] as group}
            <div class="lisbon-fairs-group" aria-hidden={group === 1}>
              {#each fairItems as fair, index}
                {#if group === 0}
                  <a href={`/ferias/${fair.slug}`} class="lisbon-fair-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="text-decoration:none; color:inherit;">
                    <meta itemprop="position" content={index + 1} />
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong itemprop="name">{fair.name}</strong>
                      <small itemprop="description">{fairSeoText(fair.name)}</small>
                    </span>
                  </a>
                {:else}
                  <a href={`/ferias/${fair.slug}`} class="lisbon-fair-item" tabindex="-1" aria-hidden="true" style="text-decoration:none; color:inherit;">
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong>{fair.name}</strong>
                      <small>{fairSeoText(fair.name)}</small>
                    </span>
                  </a>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </section>
    </section>

    <section id="services" class="section services">
      <div class="section-header">
        <h2>{copy.servicesTitle}</h2>
        <span></span>
      </div>
      <div class="service-grid">
        {#each copy.services as item, index}
          <article>
            <div class="service-icon">
              {#if index === 0}
                <!-- Diseño e Ingeniería -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="4" r="2"></circle>
                  <path d="M12 6L7 21M12 6l5 15M9.5 14h5"></path>
                  <path d="M12 17a3.5 3.5 0 0 1 0-7" stroke-dasharray="2.5 2.5"></path>
                </svg>
              {:else if index === 1}
                <!-- Construcción -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 22h20M5 22V7h14v15M12 22V7M5 12h14M5 17h14M5 7l7 5 7-5M5 12l7 5 7-5"></path>
                </svg>
              {:else if index === 2}
                <!-- Montaje y validaciones -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4"></path>
                </svg>
              {/if}
            </div>
            <h3>{item[0]}</h3>
            <p>{item[1]}</p>
          </article>
        {/each}
      </div>
    </section>

    <section id="custom" class="section portfolio">
      <div class="section-header">
        <h2>{copy.customTitle}</h2>
        <span></span>
        <p>{copy.customSubtitle}</p>
      </div>
      <div id="portfolio" class="portfolio-grid">
        {#each filteredPortfolios as project, i}
          <div class={`mix ${project.categories.join(' ')}`} class:gallery-hidden={!galleryExpanded && i >= GALLERY_VISIBLE}>
            <div class="portfolio-item">
              <a class="shot-item" href="/galeria/{project.slugs.es}" on:click|preventDefault={() => openLightbox(project)} aria-label={getProjectTitle(project)}>
                <img
                  src={`/${project.thumb.replace(/\.avif$/, '-md.avif')}`}
                  srcset={`/${project.thumb.replace(/\.avif$/, '-sb.avif')} 300w, /${project.thumb.replace(/\.avif$/, '-md.avif')} 800w`}
                  sizes="(max-width: 768px) 92vw, 31vw"
                  width="800" height="450"
                  alt={getProjectTitle(project)} loading="lazy" decoding="async"
                />
                <span class="overlay lightbox" aria-hidden="true">
                  <span class="item-icon eye-icon"></span>
                </span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      {#if !galleryExpanded && filteredPortfolios.length > GALLERY_VISIBLE}
        <div class="gallery-more-wrap">
          <button type="button" class="gallery-more-btn" on:click={() => (galleryExpanded = true)}>
            {galleryMoreLabels[lang] || galleryMoreLabels.es}
          </button>
        </div>
      {/if}

      {#if lightboxProject}
        <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={getProjectTitle(lightboxProject)} aria-describedby="project-lightbox-description" tabindex="-1">
          <div class="lightbox-window" role="document">
            <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
            <img src={`/${lightboxProject.full}`} alt={getProjectTitle(lightboxProject)} />
            <div class="lightbox-caption">
              <strong>{getProjectTitle(lightboxProject)}</strong>
              <p id="project-lightbox-description">{projectDescription(lightboxProject)}</p>
            </div>
          </div>
        </div>
      {/if}
    </section>

    <!-- Nueva Sección: Prototipos 3D Premium -->
    <section id="prototipos-3d" class="section prototypes-carousel">
      <div class="section-header">
        <h2>{copy.projects3D?.title || 'Otros Proyectos'}</h2>
        <span></span>
        <p>{copy.projects3D?.subtitle || 'Explora nuestras propuestas interactivas de alta carpintería y su relación con nuestros valores de diseño.'}</p>
      </div>

      <div class="carousel-container">
        <button class="carousel-nav prev" type="button" on:click={prevSlide} aria-label={lang === 'es' ? 'Anterior' : (lang === 'de' ? 'Zurück' : (lang === 'pt' ? 'Anterior' : (lang === 'fr' ? 'Précédent' : (lang === 'it' ? 'Precedente' : (lang === 'zh' ? '上一页' : (lang === 'hi' ? 'पिछला' : 'Previous'))))))}>‹</button>
        
        <div class="carousel-viewport">
          <div class="carousel-track" style="transform: translateX(calc(-1 * {carouselIndex} * 100% / var(--visible-count)));">
            {#each carouselItems as project}
              <article class="carousel-card" style="width: calc(100% / var(--visible-count));">
                <div class="carousel-card-inner">
                  <a href={`/proyectos/${project.id}${lang !== 'es' ? '?lang=' + lang : ''}`} class="carousel-img-link" tabindex="-1" aria-hidden="true">
                    <div class="carousel-img-wrap">
                      {#if project.location}<span class="carousel-loc-badge">{project.location}</span>{/if}
                      <img src={project.image.replace('.avif', '-thumb.avif')} alt="" width="480" height="360" loading="lazy" on:error={(e) => handleThumbError(e, project)} />
                    </div>
                  </a>
                  <a href={`/proyectos/${project.id}${lang !== 'es' ? '?lang=' + lang : ''}`} class="carousel-overlay" tabindex="-1" aria-hidden="true">
                    <span class="view-btn-gold">{copy.projects3D?.viewBtn || 'Ver Proyecto'}</span>
                  </a>
                  <div class="carousel-caption">
                    <a href={`/proyectos/${project.id}${lang !== 'es' ? '?lang=' + lang : ''}`} class="carousel-caption-link" title={getProjectTitle(project)}>
                      <h3>{getProjectTitle(project)}</h3>
                    </a>
                  </div>
                </div>
              </article>
            {/each}
          </div>
        </div>

        <button class="carousel-nav next" type="button" on:click={nextSlide} aria-label={lang === 'es' ? 'Siguiente' : (lang === 'de' ? 'Weiter' : (lang === 'pt' ? 'Seguinte' : (lang === 'fr' ? 'Suivant' : (lang === 'it' ? 'Successivo' : (lang === 'zh' ? '下一页' : (lang === 'hi' ? 'अगla' : 'Next'))))))}>›</button>
      </div>

      <!-- Enlaces a TODOS los proyectos para rastreo SEO (las fichas del carrusel se
           descargan por tramos; estos enlaces no cargan imágenes, coste nulo). -->
      <nav class="carousel-seo-links" aria-hidden="true">
        {#each shuffledProjects as project}
          <a href={`/proyectos/${project.id}${lang !== 'es' ? '?lang=' + lang : ''}`}>{getProjectTitle(project)}</a>
        {/each}
      </nav>
    </section>

    <section class="counters section">
      <div class="counter-grid">
        {#each counterItems as item, index}
          <article class="facts-item">
            <div class="icon">
              <i class={`counter-symbol ${item.icon}`} aria-hidden="true"></i>
            </div>
            <div class="fact-count">
              <h3><span class="counter">{displayedCounters[index]}</span></h3>
              <h4>{copy.counters?.[item.key]}</h4>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <MicroStand labels={copy.micro} />

    <section id="team" class="section team">
      <div class="section-header">
        <h2>{copy.teamTitle}</h2>
        <span></span>
        <p>{copy.teamSubtitle}</p>
      </div>
      <div class="team-grid">
        <article class="team-member">
          <div class="member-photo-container team-fade-container">
            <img
              src="/img/team/victoria_idiaquez.avif"
              srcset="/img/team/victoria_idiaquez-mobile.avif 400w, /img/team/victoria_idiaquez.avif 1920w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-1"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/img/team/team2.avif"
              srcset="/img/team/team2-mobile.avif 400w, /img/team/team2.avif 1200w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-2"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/img/team/team5.avif"
              srcset="/img/team/team5-mobile.avif 400w, /img/team/team5.avif 1200w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-3"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>{teamMemberName[lang] || teamMemberName.es}</h3>
          <p class="role">{copy.teamRoles[0]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/javier_garcia.avif"
              srcset="/img/team/javier_garcia-mobile.avif 400w, /img/team/javier_garcia.avif 1696w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Javier G. Márquez"
              class="member-photo"
              style="transform: scale(1.35) translateY(8px); transform-origin: center 18%;"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Javier G. Márquez</h3>
          <p class="role">{copy.teamRoles[1]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/pablo_alminar.avif"
              srcset="/img/team/pablo_alminar-mobile.avif 400w, /img/team/pablo_alminar.avif 1696w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Pablo Alminar"
              class="member-photo"
              style="object-position: center top; transform: scale(2.3) translateY(20px);"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Pablo Alminar</h3>
          <p class="role">{copy.teamRoles[2]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/patricia_jimenez.avif"
              srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Patricia Jiménez"
              class="member-photo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Patricia Jiménez</h3>
          <p class="role">{copy.teamRoles[3]}</p>
        </article>
      </div>
    </section>
  {:else if seoContent}
    <div class="dedicated-seo-page">
      <div class="seo-container">
        <div class="seo-layout">
          <!-- Artículo principal de redacción profesional -->
          <article class="seo-article">
            {#if isCityPage}
              <nav class="breadcrumbs feria-breadcrumbs" aria-label="Breadcrumb">
                <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href={pathFor(lang, 'home')}><span itemprop="name">{lang === 'es' ? 'Inicio' : 'Home'}</span></a>
                    <meta itemprop="position" content="1" />
                  </li>
                  <li class="bc-sep" aria-hidden="true"><span class="divider">/</span></li>
                  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span class="current" itemprop="name" aria-current="page">{seoContent.breadcrumb}</span>
                    <meta itemprop="position" content="2" />
                  </li>
                </ol>
              </nav>
            {/if}
            {@html seoContent.body}
          </article>
          
          <!-- Sidebar con casos de éxito reales -->
          <aside class="seo-sidebar">
            <div class="sidebar-sticky">
              <div class="city-nav-module">
                <h3>{CITY_NAV_LABELS[lang] || CITY_NAV_LABELS.es}</h3>
                <ul class="city-fairs-list">
                  {#each CITY_NAV_KEYS as ck}
                    <li>
                      <a href={pathFor(lang, ck)} class:active={ck === section}>
                        {cityData[ck]?.city?.[lang] || cityData[ck]?.city?.es}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>

              <div class="spotlight-card">
                <h3>{copy.successStoriesTitle}</h3>

                <div class="sidebar-projects">
                  {#each selectedPortfolios as project}
                    <div class="sidebar-project-card">
                      <img src={`/${project.thumb.replace(/\.avif$/, '-sb.avif')}`} alt={getProjectTitle(project)} class="sidebar-project-img" width="300" height="169" loading="lazy" decoding="async" />
                      <div class="sidebar-project-info">
                        <h4>{getProjectTitle(project)}</h4>
                        <p>{projectDescription(project)}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Clúster pilar→ferias: enlaces a las ferias de la región -->
              {#if regionFairs.length}
                <section class="city-fairs sidebar-module" aria-label={cityFairsLabel[lang] || cityFairsLabel.es}>
                  <h2>{cityFairsLabel[lang] || cityFairsLabel.es}</h2>
                  <ul class="city-fairs-list">
                    {#each regionFairs as fair}
                      <li><a href={fairHrefSite(fair.slug)}>{fair.name}</a></li>
                    {/each}
                  </ul>
                </section>
              {/if}
            </div>
          </aside>
        </div>

        <!-- FAQs Section (B2B FAQ grids) — siempre en número par -->
        {#if faqsEven.length > 0}
          <section class="seo-faqs">
            <h2>{copy.faqsTitle}</h2>
            <div class="faq-grid">
              {#each faqsEven as faq}
                <article class="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              {/each}
            </div>
          </section>
          <!-- Separador entre las FAQs y el formulario de contacto. -->
          <hr class="seo-form-divider" />
        {/if}
      </div>
    </div>
  {/if}

  <ContactForm {lang} labels={copy} variant={section in cityData ? 'light' : 'dark'} bind:initialFair={initialFair} />
</main>

<footer>
  <div class="footer-layout">
    <div class="footer-left">
      <ul class="footer-links">
        <li><button id="politicaPrivacidad" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('privacy')}>{copy.legal.privacy}</button></li>
        <li><button id="avisoLegal" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('legalNotice')}>{copy.legal.legalNotice}</button></li>
        <li><button id="politicaCookies" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('cookies')}>{copy.legal.cookies}</button></li>
        <li><button class="_gold footer-link-button" type="button" on:click={openCookieSettings}>{cookieSettingsLabels[lang] || cookieSettingsLabels.es}</button></li>
        <li><a href={pathFor(lang, 'noticias')} class="_gold footer-link-button">{copy.nav.noticias}</a></li>
        <li class="footer-lang-item">
          <div class="footer-lang-menu">
            <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
            <div class="footer-lang-dropdown">
              {#each languages as option}
                <a
                  href={pathFor(option, section)}
                  class:active={option === lang}
                  on:click={() => {
                    if (typeof localStorage !== 'undefined') {
                      localStorage.setItem('standarte_lang', option);
                      localStorage.setItem('preferredLanguage', option);
                    }
                  }}
                >
                  <FlagIcon langCode={option} size={16} />
                  <span>{languageLabels[option]}</span>
                </a>
              {/each}
            </div>
          </div>
        </li>
      </ul>
      <nav class="footer-site-map" aria-label="Standarte" hidden aria-hidden="true">
        <ul>
          <li><a href={pathFor(lang, 'services')} tabindex="-1">{copy.nav.services}</a></li>
          <li><a href={pathFor(lang, 'custom')} tabindex="-1">{copy.nav.custom}</a></li>
          <li><a href={pathFor(lang, 'noticias')} tabindex="-1">{copy.nav.noticias}</a></li>
          <li><a href={pathFor(lang, 'contact')} tabindex="-1">{copy.nav.contact}</a></li>
        </ul>
      </nav>
    </div>
    <div class="copyright">
      <p>
        CopyRight: {new Date().getFullYear()}.
        <a href="/admin/email_campaing/" class="_gold footer-link-button" target="_blank" rel="external noopener noreferrer" style="margin-left: 15px; display: inline-block;">
          {campaignManagerLabels[lang] || campaignManagerLabels.es}
        </a>
      </p>
    </div>
  </div>
</footer>

{#if legalModal}
  <div class="legal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" tabindex="-1">
    <div class="legal-modal-window" role="document">
      <button class="legal-modal-close" type="button" aria-label="Cerrar" on:click={closeLegalModal}>×</button>
      <div class="legal-modal-brand"><img src="/img/mini_logo_flag.svg" alt="" /></div>
      <h2 id="legal-modal-title">{legalModal.title}</h2>
      <div class="legal-modal-content">{@html legalModal.content}</div>
    </div>
  </div>
{/if}

<CookieConsent {lang} />

<style>
  /* Galería y ciudades: ocultar elementos extra sin sacarlos del DOM (SEO + descarga diferida) */
  .gallery-hidden,
  .cities-hidden {
    display: none !important;
  }
  .gallery-more-wrap {
    display: flex;
    justify-content: center;
    /* margin auto para centrar el contenedor (si no, el estilo scoped pisa el
       margin:auto global de .section > * y queda pegado a la izquierda). */
    margin: 34px auto 10px;
    width: 100%;
  }
  /* Botón secundario, discreto: sin amarillo, para no competir con el CTA del menú. */
  .gallery-more-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 180px;
    padding: 11px 32px;
    background: transparent;
    color: #555;
    border: 1px solid #cfcfcf;
    border-radius: 30px;
    font-family: Inconsolata, monospace;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .gallery-more-btn:hover {
    background: #efefef;
    border-color: #999;
    color: #222;
  }

  /* Descargador circular del carrusel 3D (entre tramos de 12 fichas) */
  .carousel-loader-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .carousel-loader-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    transition: color 0.2s ease;
  }
  .carousel-loader-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #cfcfcf;
    background: #fff;
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }
  .carousel-loader-btn:hover {
    color: #222;
  }
  .carousel-loader-btn:hover .carousel-loader-circle {
    border-color: #999;
    background: #f5f5f5;
    transform: scale(1.06);
  }
  .carousel-loader-text {
    font-family: Inconsolata, monospace;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.05em;
  }
  /* Enlaces de proyectos para rastreo (no visibles; presentes en el DOM para SEO) */
  .carousel-seo-links {
    display: none;
  }

  .nav-badge-new {
    background-color: #ffc800;
    color: #111 !important; /* Force high-contrast dark text */
    font-size: 16px; /* Increased size */
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 3px;
    margin-left: -2ch; /* Pulls it back horizontally to start exactly above the "on" of LuzPavilion */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    line-height: 1;
    transform: translateY(-11px); /* Elevated to sit perfectly as a power exponent */
    transition: background-color 0.2s ease;
  }

  /* Keep indicator visually consistent on link hover */
  :global(.nav-links > a:hover) .nav-badge-new {
    background-color: #e6b400;
  }

  /* LUZPAVILION PREMIUM TEAM GRID STYLE */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    max-width: var(--container);
    margin: 40px auto 0;
    justify-items: center;
  }

  .team-member {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .member-photo-container {
    position: relative;
    width: 200px;
    height: 200px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(22, 25, 28, 0.15);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin-bottom: 20px;
    background-color: #f7f6f1;
  }

  .member-photo-container:hover {
    transform: scale(1.04);
    box-shadow: 0 16px 40px rgba(22, 25, 28, 0.22);
  }

  .member-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-fade-container {
    position: relative;
  }

  .team-fade-container .fade-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-fade-container .img-1 {
    animation: fade3 9s infinite;
  }

  .team-fade-container .img-2 {
    animation: fade3 9s infinite;
    animation-delay: -3s;
  }

  .team-fade-container .img-3 {
    animation: fade3 9s infinite;
    animation-delay: -6s;
  }

  @keyframes fade3 {
    0%, 28% {
      opacity: 1;
    }
    33%, 95% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .team-member h3 {
    font-family: 'Glegoo', serif;
    font-size: 19px;
    font-weight: 700;
    color: #333;
    margin: 0 0 6px;
  }

  .team-member .role {
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #b89400;
    letter-spacing: 0.1em;
    margin: 0;
  }

  @media (max-width: 992px) {
    .team-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  @media (max-width: 640px) {
    .team-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .member-photo-container {
      width: 170px;
      height: 170px;
    }
  }

  :global(.transparent-hero) {
    background: transparent !important;
    border-bottom: none !important;
  }
</style>
