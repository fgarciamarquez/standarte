<script>
  import { fairsData } from '$lib/fairsData.js';
  import { pathFor } from '$lib/siteData.js';
  import ContactForm from './ContactForm.svelte';
  
  export let data;
  let isScrolled = false;
  let menuOpen = false;
  const ctaLabels = { es: 'SOLICITAR PRESUPUESTO', en: 'REQUEST A QUOTE', de: 'ANGEBOT ANFORDERN', zh: '索取报价', hi: 'एक बोली का अनुरोध करें', pt: 'SOLICITAR ORÇAMENTO', fr: 'DEMANDER UN DEVIS', it: 'RICHIEDI UN PREVENTIVO', ko: '견적 요청' };
  $: ({ lang, copy, canonical, fairSlug } = data);
  
  $: fair = fairsData.find(f => f.slug === fairSlug) || fairsData[0];
  
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
    }
  };

  const cities = {
    es: { 'Madrid': 'Madrid', 'Barcelona': 'Barcelona', 'Málaga': 'Málaga', 'Lisboa': 'Lisboa', 'Bilbao': 'Bilbao', 'Badajoz': 'Badajoz', 'Zaragoza': 'Zaragoza', 'Ciudad Real': 'Ciudad Real', 'Sevilla': 'Sevilla', 'París': 'París', 'Stuttgart': 'Stuttgart', 'Múnich': 'Múnich', 'Núremberg': 'Núremberg', 'Lyon': 'Lyon', 'Vigo': 'Vigo', 'Don Benito': 'Don Benito', 'Almendralejo': 'Almendralejo', 'Plasencia': 'Plasencia', 'Europa': 'Europa' },
    en: { 'Madrid': 'Madrid', 'Barcelona': 'Barcelona', 'Málaga': 'Malaga', 'Lisboa': 'Lisbon', 'Bilbao': 'Bilbao', 'Badajoz': 'Badajoz', 'Zaragoza': 'Zaragoza', 'Ciudad Real': 'Ciudad Real', 'Sevilla': 'Seville', 'París': 'Paris', 'Stuttgart': 'Stuttgart', 'Múnich': 'Munich', 'Núremberg': 'Nuremberg', 'Lyon': 'Lyon', 'Vigo': 'Vigo', 'Don Benito': 'Don Benito', 'Almendralejo': 'Almendralejo', 'Plasencia': 'Plasencia', 'Europa': 'Europe' },
    // Simplified city mapping, defaulting to Spanish name if not defined to save space
  };

  const t = {
    es: {
      heroTitle: (name) => `Standarte en ${name}`,
      heroSubtitle: (city) => `Construcción de stands en ${city} con más de 20 años de experiencia y taller propio.`,
      intro: (name, city, sector) => `Standarte ofrece servicios integrales de diseño y montaje de stands de alta carpintería para la feria ${name} en ${city}. Como evento destacado del sector de ${sector}, su marca requiere un espacio que transmita excelencia técnica e innovación.`,
      intro2: 'Nos encargamos del modelado 3D, la fabricación en nuestro propio taller y el montaje final, asegurando que su espacio destaque por encima de la competencia sin depender de terceros.',
      services: 'Servicios para expositores',
      cta: 'Solicitar Presupuesto para esta feria',
      back: 'Volver al inicio'
    },
    en: {
      heroTitle: (name) => `Standarte at ${name}`,
      heroSubtitle: (city) => `Exhibition stand construction in ${city} with more than 20 years of experience and our own workshop.`,
      intro: (name, city, sector) => `Standarte offers comprehensive high-quality stand design and construction services for the ${name} fair in ${city}. As a key event in the ${sector} sector, your brand requires a space that conveys technical excellence and innovation.`,
      intro2: 'We take care of the 3D modeling, manufacturing in our own workshop, and the final assembly, ensuring that your space stands out from the competition without relying on third parties.',
      services: 'Services for exhibitors',
      cta: 'Request a Quote for this fair',
      back: 'Back to home'
    },
    de: {
      heroTitle: (name) => `Standarte auf der ${name}`,
      heroSubtitle: (city) => `Messestandbau in ${city} mit über 20 Jahren Erfahrung und eigener Werkstatt.`,
      intro: (name, city, sector) => `Standarte bietet umfassende Dienstleistungen im Bereich hochwertiges Messestanddesign und -bau für die Messe ${name} in ${city}. Als wichtiges Ereignis im Bereich ${sector} erfordert Ihre Marke einen Raum, der technische Exzellenz und Innovation vermittelt.`,
      intro2: 'Wir kümmern uns um die 3D-Modellierung, die Fertigung in unserer eigenen Werkstatt und die Endmontage und stellen sicher, dass sich Ihr Raum von der Konkurrenz abhebt.',
      services: 'Dienstleistungen für Aussteller',
      cta: 'Angebot für diese Messe anfordern',
      back: 'Zurück zur Startseite'
    },
    fr: {
      heroTitle: (name) => `Standarte au ${name}`,
      heroSubtitle: (city) => `Construction de stands à ${city} avec plus de 20 ans d'expérience et notre propre atelier.`,
      intro: (name, city, sector) => `Standarte propose des services complets de conception et de construction de stands de haute qualité pour le salon ${name} à ${city}. En tant qu'événement clé du secteur de ${sector}, votre marque a besoin d'un espace qui transmet l'excellence.`,
      intro2: 'Nous prenons en charge la modélisation 3D, la fabrication dans notre propre atelier et le montage final, garantissant que votre espace se démarque de la concurrence.',
      services: 'Services pour les exposants',
      cta: 'Demander un devis pour ce salon',
      back: "Retour à l'accueil"
    },
    pt: {
      heroTitle: (name) => `Standarte na ${name}`,
      heroSubtitle: (city) => `Construção de stands em ${city} com mais de 20 anos de experiência e oficina própria.`,
      intro: (name, city, sector) => `A Standarte oferece serviços abrangentes de design e montagem de stands de alta qualidade para a feira ${name} em ${city}. Sendo um evento chave no setor de ${sector}, a sua presença requer excelência.`,
      intro2: 'Cuidamos da modelação 3D, fabricação na nossa própria oficina e montagem final, garantindo um resultado impecável.',
      services: 'Serviços para expositores',
      cta: 'Solicitar Orçamento para esta feira',
      back: 'Voltar ao início'
    },
    it: {
      heroTitle: (name) => `Standarte a ${name}`,
      heroSubtitle: (city) => `Allestimento stand a ${city} con oltre 20 anni di esperienza e officina propria.`,
      intro: (name, city, sector) => `Standarte offre servizi completi di progettazione e costruzione di stand per la fiera ${name} a ${city}. Come evento chiave nel settore di ${sector}, il tuo brand richiede eccellenza.`,
      intro2: 'Ci occupiamo della modellazione 3D, della produzione nella nostra officina e dell\'assemblaggio finale.',
      services: 'Servizi per espositori',
      cta: 'Richiedi un preventivo',
      back: 'Torna alla home'
    },
    ko: {
      heroTitle: (name) => `${name} 전시회의 Standarte`,
      heroSubtitle: (city) => `${city}에서 20년 이상의 경험과 자체 작업장을 갖춘 부스 시공.`,
      intro: (name, city, sector) => `Standarte는 ${city}에서 열리는 ${name} 전시회를 위한 프리미엄 부스 디자인 및 시공 서비스를 제공합니다. ${sector} 분야의 주요 행사로서 완벽한 공간이 필요합니다.`,
      intro2: '3D 모델링, 자체 작업장 제작, 최종 설치까지 모두 책임집니다.',
      services: '참여업체를 위한 서비스',
      cta: '견적 요청하기',
      back: '홈으로 돌아가기'
    },
    zh: {
      heroTitle: (name) => `Standarte 在 ${name}`,
      heroSubtitle: (city) => `在 ${city} 提供展台搭建服务，拥有超过20年的经验和自己的工厂。`,
      intro: (name, city, sector) => `Standarte 为 ${city} 的 ${name} 展会提供高质量的展台设计和搭建服务。作为 ${sector} 领域的重要活动，您的品牌需要卓越的展示。`,
      intro2: '我们负责3D建模，自己的工厂生产和最终组装。',
      services: '参展商服务',
      cta: '索取报价',
      back: '回到首页'
    },
    hi: {
      heroTitle: (name) => `${name} में Standarte`,
      heroSubtitle: (city) => `${city} में 20 से अधिक वर्षों के अनुभव और अपनी खुद की कार्यशाला के साथ प्रदर्शनी स्टैंड निर्माण।`,
      intro: (name, city, sector) => `Standarte ${city} में ${name} मेले के लिए उच्च गुणवत्ता वाले स्टैंड डिज़ाइन प्रदान करता है। ${sector} क्षेत्र में एक प्रमुख घटना के रूप में, आपके ब्रांड को उत्कृष्टता की आवश्यकता है।`,
      intro2: 'हम 3D मॉडलिंग, अपनी कार्यशाला में निर्माण और अंतिम असेंबली का ध्यान रखते हैं।',
      services: 'प्रदर्शकों के लिए सेवाएं',
      cta: 'एक बोली का अनुरोध करें',
      back: 'होम पर वापस जाएं'
    }
  };

  $: localizedCity = (cities[lang] && cities[lang][fair.city]) ? cities[lang][fair.city] : fair.city;
  $: localizedSector = (sectors[lang] && sectors[lang][fair.sector]) ? sectors[lang][fair.sector] : fair.sector;
  $: strings = t[lang] || t.es;
  
  $: seoTitle = `${fair.name} - ${strings.heroSubtitle(localizedCity).split(' con ')[0]}`;
  $: seoDesc = strings.intro(fair.name, localizedCity, localizedSector);
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDesc} />
  <link rel="canonical" href={canonical} />
</svelte:head>

<svelte:window bind:scrollY={isScrolled} />
<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'services')}>{copy.nav.services}</a>
      <a href={pathFor(lang, 'luzpavilion')}>LuzPavilion <span class="nav-badge-new">New</span></a>
      <a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>
  
  <div class="hero-subpage">
    <div class="hero-contents feria-hero-contents">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href={pathFor(lang, 'home')}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
          <li><span class="divider">/</span></li>
          <li><span class="current" aria-current="page">{fair.name}</span></li>
        </ol>
      </nav>
      <h1>{strings.heroTitle(fair.name)}</h1>
      <div class="fair-flag-wrapper">
        <span class={`fair-flag-icon flag-${fair.country} medium-flag`} aria-hidden="true"></span>
      </div>
      <p class="hero-lead">{strings.heroSubtitle(localizedCity)}</p>
    </div>
  </div>
</header>

<main class="feria-page">
  <section class="feria-details section">
    <div class="feria-container">
      <div class="feria-text">
        <p class="highlight">{seoDesc}</p>
        <p>{strings.intro2}</p>
        
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
    </div>
  </section>

  <section class="section grey-bg">
    <ContactForm labels={copy} {lang} />
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
  }
  .feria-container {
    max-width: 800px;
    margin: 0 auto;
  }
  .highlight {
    font-size: 1.4rem;
    line-height: 1.6;
    font-weight: 300;
    margin-bottom: 2rem;
  }
  .feria-text p {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
  .feria-text h3 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  .services-list {
    list-style: none;
    padding: 0;
  }
  .services-list li {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--primary);
  }
  .services-list strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .grey-bg {
    background: var(--grey-bg);
    padding: 4rem 5%;
  }
</style>
