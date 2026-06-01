<script>
  import { onMount } from 'svelte';
  import { languages, languageLabels, pathFor, cityData, portfolios } from '$lib/siteData.js';
  import { projects } from '$lib/projectData.js';
  import { richSeoData } from '$lib/richSeoData.js';
  import MicroStand from './MicroStand.svelte';
  import ContactForm from './ContactForm.svelte';
  import CookieConsent from './CookieConsent.svelte';

  export let lang;
  export let section;
  export let copy;
  export let canonical;

  const ctaLabels = {
    es: 'SOLICITAR PRESUPUESTO',
    en: 'REQUEST A QUOTE',
    de: 'ANGEBOT ANFORDERN',
    pt: 'SOLICITAR ORÇAMENTO',
    zh: '索取报价',
    hi: 'कोटेशन का अनुरोध करें'
  };

  let menuOpen = false;
  let portfolioFilter = 'all';
  let lightboxProject = null;
  let legalModal = null;
  let isScrolled = false;

  // Prototipos 3D Carousel State
  let carouselIndex = 0;
  let carouselVisibleCount = 3;
  let shuffledProjects = [...projects];

  function nextSlide() {
    if (carouselIndex < shuffledProjects.length - carouselVisibleCount) {
      carouselIndex++;
    } else {
      carouselIndex = 0;
    }
  }

  function prevSlide() {
    if (carouselIndex > 0) {
      carouselIndex--;
    } else {
      carouselIndex = shuffledProjects.length - carouselVisibleCount;
    }
  }

  const modularEnabled = false;
  const languageLocales = {
    es: 'es_ES',
    en: 'en_GB',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    pt: 'pt_PT'
  };
  const contentLanguages = {
    es: 'es-ES',
    en: 'en-GB',
    de: 'de-DE',
    zh: 'zh-CN',
    hi: 'hi-IN',
    pt: 'pt-PT'
  };
  const cityKeys = ['madrid', 'barcelona', 'bilbao', 'lisboa', 'malaga', 'badajoz'];
  const serviceIcons = ['icon-pencil', 'icon-crop', 'icon-layers'];
  const portfolioFilters = ['all', 'textil', 'madera'];
  const cookieSettingsLabels = {
    es: 'Configurar cookies',
    en: 'Cookie settings',
    de: 'Cookie-Einstellungen',
    zh: 'Cookie 设置',
    hi: 'कुकी सेटिंग्स',
    pt: 'Configurar cookies'
  };
  const campaignManagerLabels = {
    es: 'Admin',
    en: 'Admin',
    de: 'Admin',
    zh: '管理',
    hi: 'Admin',
    pt: 'Admin'
  };
  const fairItems = [
    { name: 'AGROEXPO FEVAL Don Benito 2026', country: 'es' },
    { name: 'Feria de FP Badajoz 2026', country: 'es' },
    { name: 'Feria de los Mayores de Extremadura Badajoz 2026', country: 'es' },
    { name: 'FIO Monfragüe 2026', country: 'es' },
    { name: 'Feria de Belleza, Moda y Cosmética Badajoz 2026', country: 'es' },
    { name: 'VINAC Almendralejo 2026', country: 'es' },
    { name: 'ARTEXANÍA Plasencia 2026', country: 'es' },
    { name: 'FENAVIN Match Ciudad Real 2026', country: 'es' },
    { name: 'Ferduque Ciudad Real 2026', country: 'es' },
    { name: 'JEC World Paris 2026', country: 'fr' },
    { name: 'LogiMAT Stuttgart 2026', country: 'de' },
    { name: 'Global Industrie Paris 2026', country: 'fr' },
    { name: 'Ecuextre Badajoz 2026', country: 'es' },
    { name: 'Hannover Messe 2026', country: 'de' },
    { name: 'SAGALEXPO Lisboa 2026', country: 'pt' },
    { name: 'SIL Lisboa 2026', country: 'pt' },
    { name: 'FERCAM Manzanares Ciudad Real 2026', country: 'es' },
    { name: 'Portugal Smart Cities Summit 2026', country: 'pt' },
    { name: 'ARCOlisboa 2026', country: 'pt' },
    { name: 'DES Málaga 2026', country: 'es' },
    { name: 'CM Málaga 2026', country: 'es' },
    { name: 'Foro Greencities Málaga 2026', country: 'es' },
    { name: 'FERCATUR Ciudad Real 2026', country: 'es' },
    { name: 'FECIEX Badajoz 2026', country: 'es' },
    { name: 'San Diego Comic-Con Málaga 2026', country: 'es' },
    { name: 'EXPO AGRITECH Málaga 2026', country: 'es' },
    { name: 'SIMED Málaga 2026', country: 'es' },
    { name: 'Fehispor Badajoz 2026', country: 'es' },
    { name: 'AMB Stuttgart 2026', country: 'de' },
    { name: 'Iberocio Badajoz 2026', country: 'es' },
    { name: 'SPS Nuremberg 2026', country: 'de' },
    { name: 'automatica Munich 2027', country: 'de' },
    { name: 'Pollutec Lyon 2027', country: 'fr' },
    { name: 'bauma Munich 2028', country: 'de' }
  ];
  const fairListTitles = {
    es: 'Ferias destacadas en España, Portugal, Alemania y Francia para construcción de stands',
    en: 'Featured fairs in Spain, Portugal, Germany and France for exhibition stand construction',
    de: 'Wichtige Messen in Spanien, Portugal, Deutschland und Frankreich für Messestandbau',
    zh: '西班牙、葡萄牙、德国和法国展台搭建重点展会',
    hi: 'स्पेन, पुर्तगाल, जर्मनी और फ्रांस में स्टैंड निर्माण के लिए प्रमुख मेले',
    pt: 'Feiras em destaque em Espanha, Portugal, Alemanha e França para construção de stands'
  };
  const counterItems = [
    { key: 'projects', value: 169, icon: 'counter-book' },
    { key: 'clients', value: 145, icon: 'counter-briefcase' },
    { key: 'countries', value: 22, icon: 'counter-flag' },
    { key: 'fairs', value: 158, icon: 'counter-calendar' }
  ];

  let displayedCounters = counterItems.map(() => 0);
  let countersStarted = false;

  // TEMPORAL: Ocultar imágenes desde la 13ª hasta la última (no borrar, reactivar en una semana)
  // Para reactivar todas las fotos la próxima semana, cambia "portfolios.slice(0, 12)" por "portfolios"
  const activePortfolios = portfolios;

  $: filteredPortfolios = portfolioFilter === 'all'
    ? activePortfolios
    : activePortfolios.filter((project) => project.categories.includes(portfolioFilter));

  $: seoContent = richSeoData[section]?.[lang] || richSeoData[section]?.es || null;
  $: selectedPortfolios = portfolios.slice(0, 3);

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
    if (lang === 'de') return `Messestandbau in ${city}`;
    if (lang === 'en') return `Stand construction in ${city}`;
    if (lang === 'pt') return `Construção de stands em ${city}`;
    if (lang === 'zh') return `${city} 展台搭建`;
    if (lang === 'hi') return `${city} में स्टैंड निर्माण`;
    return `Construcción de stands en ${city}`;
  }

  function cityContent(id) {
    const city = cityData[id];
    const byLang = city?.content?.[lang] || city?.content?.es || {};
    return byLang;
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
      ['Construcción de stands en Madrid', pathFor('es', 'madrid')],
      ['Construcción de stands en Barcelona', pathFor('es', 'barcelona')],
      ['Construcción de stands en Bilbao', pathFor('es', 'bilbao')],
      ['Construcción de stands en Lisboa', pathFor('es', 'lisboa')],
      ['Construcción de stands en Málaga', pathFor('es', 'malaga')],
      ['Construcción de stands en Badajoz', pathFor('es', 'badajoz')]
    ];

    const organization = {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: 'Standarte',
      url: `${baseUrl}/`,
      logo: `${baseUrl}/img/logo_standarte_rectanular.png`,
      image: `${baseUrl}/img/trabajos/TCANTICO/1.avif`,
      email: 'hola@standarte.es',
      telephone: '+34613097148',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C/ de Moratin',
        postalCode: '28012',
        addressLocality: 'Madrid',
        addressCountry: 'ES'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '40.4124',
        longitude: '-3.6983'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      sameAs: [
        'https://luzpavilion.es'
      ]
    };

    const service = {
      '@type': 'Service',
      '@id': `${baseUrl}/#service`,
      name: lang === 'es' ? 'Diseño y construcción de stands para ferias' : 'Exhibition stand design and construction',
      serviceType: 'Exhibition Stand Builder',
      provider: { '@id': `${baseUrl}/#organization` },
      description: copy.seoDescription,
      areaServed: ['ES', 'PT', 'DE', 'FR']
    };

    const website = {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: 'Standarte',
      description: 'Standarte diseña, fabrica y monta stands para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Lisboa y otros destinos nacionales e internacionales.',
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
      name: 'Estructura principal de Standarte',
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
    if (lang === 'en') return `Stand builder at ${fairName}`;
    if (lang === 'de') return `Messestandbau auf der ${fairName}`;
    if (lang === 'zh') return `${fairName} 展台搭建服务`;
    if (lang === 'hi') return `${fairName} में स्टैंड निर्माण`;
    if (lang === 'pt') return `Construtor de stands na ${fairName}`;
    return `Constructor de stand en ${fairName}`;
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
      window.history.pushState({}, '', pathFor(lang, routeSection));
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleNavClick(event, id) {
    if (section === 'home') {
      event.preventDefault();
      scrollTo(id);
    }
  }

  onMount(() => {
    // Automatic browser language detection and redirect
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedPref = localStorage.getItem('preferredLanguage');
      
      // Save current language preference when visited
      localStorage.setItem('preferredLanguage', lang);

      if (lang === 'es') {
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, section);
        } else if (!savedPref) {
          const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
            .split('-')[0]
            .toLowerCase();
          
          if (browserLang !== 'es' && languages.includes(browserLang)) {
            localStorage.setItem('preferredLanguage', browserLang);
            window.location.href = pathFor(browserLang, section);
          } else {
            localStorage.setItem('preferredLanguage', 'es');
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
    shuffledProjects = shuffleArray([...projects]);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        carouselVisibleCount = 1;
      } else if (window.innerWidth <= 1024) {
        carouselVisibleCount = 2;
      } else {
        carouselVisibleCount = 3;
      }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

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
        const nextPath = pathFor(lang, routeById[visible.target.id]);
        if (window.location.pathname !== nextPath) {
          window.history.replaceState({}, '', nextPath);
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
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateVisibleCount);
      clearInterval(autoplayInterval);
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
  {#each languages as alternateLang}
    <link rel="alternate" hreflang={alternateLang} href={`https://standarte.es${pathFor(alternateLang, section)}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', section)}`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={languageLocales[lang] || 'es_ES'} />
  {#each languages.filter((alternateLang) => alternateLang !== lang) as alternateLang}
    <meta property="og:locale:alternate" content={languageLocales[alternateLang]} />
  {/each}
  {@html structuredDataScript}
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<header class="site-header" class:static-header={section !== 'home'}>
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'services')} on:click={(e) => handleNavClick(e, 'services')}>{copy.nav.services}</a>
      {#if modularEnabled}
        <a href={pathFor(lang, 'stand-modular')} on:click={(e) => handleNavClick(e, 'stand-modular')}>Stand Modular</a>
      {/if}
      <a href={pathFor(lang, 'luzpavilion')} on:click={(e) => handleNavClick(e, 'micro-stand')}>
        LuzPavilion <span class="nav-badge-new">New</span>
      </a>
      <a href={pathFor(lang, 'custom')} on:click={(e) => handleNavClick(e, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn" on:click={(e) => handleNavClick(e, 'contact')}>{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>
  
  {#if section === 'home'}
    <section id="home" class="hero">
      <div class="contents">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroSubtitle}</p>
      </div>
    </section>
  {:else if seoContent}
    <div class="hero-subpage">
      <div class="hero-contents">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href={pathFor(lang, 'home')}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
            <li><span class="divider">/</span></li>
            <li><span class="current" aria-current="page">{seoContent.breadcrumb}</span></li>
          </ol>
        </nav>
        <h1>{seoContent.h1}</h1>
        <p class="hero-lead">{seoContent.introText}</p>
      </div>
    </div>
  {/if}
</header>

<main>
  {#if section === 'home'}
    <section id="services" class="section services">
      <div class="section-header">
        <h2>{copy.servicesTitle}</h2>
        <span></span>
      </div>
      <div class="service-grid">
        {#each copy.services as item, index}
          <article>
            <div class="service-icon"><i class={`service-symbol ${serviceIcons[index]}`} aria-hidden="true"></i></div>
            <h3>{item[0]}</h3>
            <p>{item[1]}</p>
          </article>
        {/each}
      </div>
    </section>

    <MicroStand labels={copy.micro} />

    <section id="local-stands" class="section local-stands">
      <p class="section-intro">{copy.citiesIntro}</p>
      <div class="city-grid">
        {#each cityKeys as cityKey}
          <article id={cityKey}>
            <h3>{cityTitle(cityKey)}</h3>
            <p>{cityContent(cityKey).intro}</p>
            <p>{cityContent(cityKey).detail}</p>
            <a href={pathFor(lang, cityKey)}>{cityTitle(cityKey)}</a>
          </article>
        {/each}
      </div>
      <section class="lisbon-fairs-strip" aria-label={fairListTitles[lang] || fairListTitles.es} itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content={fairListTitles[lang] || fairListTitles.es} />
        <meta itemprop="itemListOrder" content="https://schema.org/ItemListOrderAscending" />
        <div class="lisbon-fairs-track">
          {#each [0, 1] as group}
            <div class="lisbon-fairs-group" aria-hidden={group === 1}>
              {#each fairItems as fair, index}
                {#if group === 0}
                  <article class="lisbon-fair-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content={index + 1} />
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong itemprop="name">{fair.name}</strong>
                      <small itemprop="description">{fairSeoText(fair.name)}</small>
                    </span>
                  </article>
                {:else}
                  <article class="lisbon-fair-item">
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong>{fair.name}</strong>
                      <small>{fairSeoText(fair.name)}</small>
                    </span>
                  </article>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </section>
    </section>

    <section id="custom" class="section portfolio">
      <div class="section-header">
        <h2>{copy.customTitle}</h2>
        <span></span>
        <p>{copy.customSubtitle}</p>
      </div>
      <div class="controls">
        {#each portfolioFilters as filter}
          <button
            type="button"
            class:active={portfolioFilter === filter}
            class="filter btn btn-common"
            on:click={() => (portfolioFilter = filter)}
          >
            {copy.filters?.[filter] || filter}
          </button>
        {/each}
      </div>
      <div id="portfolio" class="portfolio-grid">
        {#each filteredPortfolios as project}
          <div class={`mix ${project.categories.join(' ')}`}>
            <div class="portfolio-item">
              <button class="shot-item" type="button" on:click={() => openLightbox(project)} aria-label={project.alt}>
                <img src={`/${project.thumb}`} alt={project.alt} loading="lazy" decoding="async" />
                <span class="overlay lightbox" aria-hidden="true">
                  <span class="item-icon eye-icon"></span>
                </span>
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if lightboxProject}
        <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={lightboxProject.alt} aria-describedby="project-lightbox-description" tabindex="-1">
          <div class="lightbox-window" role="document">
            <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
            <img src={`/${lightboxProject.full}`} alt={lightboxProject.alt} />
            <div class="lightbox-caption">
              <strong>{lightboxProject.alt}</strong>
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
        <button class="carousel-nav prev" type="button" on:click={prevSlide} aria-label={lang === 'es' ? 'Anterior' : (lang === 'de' ? 'Zurück' : (lang === 'pt' ? 'Anterior' : (lang === 'zh' ? '上一页' : (lang === 'hi' ? 'पिछला' : 'Previous'))))}>‹</button>
        
        <div class="carousel-viewport">
          <div class="carousel-track" style="transform: translateX(-{carouselIndex * (100 / carouselVisibleCount)}%);">
            {#each shuffledProjects as project}
              <article class="carousel-card" style="width: {100 / carouselVisibleCount}%;">
                <a href={`/proyectos/${project.id}${lang !== 'es' ? '?lang=' + lang : ''}`} class="carousel-link">
                  <div class="carousel-img-wrap">
                    <img src={project.image} alt={project.name} loading="lazy" />
                    <div class="carousel-overlay">
                      <span class="view-btn-gold">{copy.projects3D?.viewBtn || 'Ver Proyecto'}</span>
                    </div>
                  </div>
                  <div class="carousel-caption">
                    <h3>{project.name}</h3>
                    <span class="location">{project.location}</span>
                  </div>
                </a>
              </article>
            {/each}
          </div>
        </div>

        <button class="carousel-nav next" type="button" on:click={nextSlide} aria-label={lang === 'es' ? 'Siguiente' : (lang === 'de' ? 'Weiter' : (lang === 'pt' ? 'Seguinte' : (lang === 'zh' ? '下一页' : (lang === 'hi' ? 'अगla' : 'Next'))))}>›</button>
      </div>
    </section>

    <section class="counters section" data-stellar-background-ratio="0.5">
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

    <section id="team" class="section team">
      <div class="section-header">
        <h2>{copy.teamTitle}</h2>
        <span></span>
        <p>{copy.teamSubtitle}</p>
      </div>
      <div class="team-grid">
        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/victoria_idiaquez.avif"
              alt="Victoria Idiakez"
              class="member-photo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Victoria Idiakez</h3>
          <p class="role">{copy.teamRoles[0]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/javier_garcia.avif"
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
            {@html seoContent.body}
          </article>
          
          <!-- Sidebar con casos de éxito reales -->
          <aside class="seo-sidebar">
            <div class="sidebar-sticky">
              <div class="spotlight-card">
                <h3>{lang === 'es' ? 'Casos de Éxito' : 'Success Stories'}</h3>
                <p class="spotlight-intro">
                  {lang === 'es' 
                    ? 'Proyectos destacados de alta carpintería y diseño de stands efímeros:' 
                    : 'Featured custom carpentry and exhibition stand design projects:'}
                </p>
                
                <div class="sidebar-projects">
                  {#each selectedPortfolios as project}
                    <div class="sidebar-project-card">
                      <img src={`/${project.thumb}`} alt={project.alt} class="sidebar-project-img" />
                      <div class="sidebar-project-info">
                        <h4>{project.alt}</h4>
                        <p>{projectDescription(project)}</p>
                      </div>
                    </div>
                  {/each}
                </div>
                
                <button type="button" class="btn-sidebar-gold" on:click={() => scrollTo('contact')}>
                  {ctaLabels[lang] || ctaLabels.es}
                </button>
              </div>
            </div>
          </aside>
        </div>

        <!-- FAQs Section (B2B FAQ grids) -->
        {#if seoContent.faqs && seoContent.faqs.length > 0}
          <section class="seo-faqs">
            <h2>{lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h2>
            <div class="faq-grid">
              {#each seoContent.faqs as faq}
                <article class="faq-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              {/each}
            </div>
          </section>
        {/if}
      </div>
    </div>
  {/if}

  <ContactForm {lang} labels={copy} />
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
            <span><i class="world-icon" aria-hidden="true"></i> {lang.toUpperCase()}</span>
            <div class="footer-lang-dropdown">
              {#each languages as option}
                <a href={pathFor(option, section)} class:active={option === lang}>{languageLabels[option]}</a>
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
        CopyRight: 2022.
        <a href="/admin/email_campaing/" class="_gold footer-link-button" target="_blank" rel="noopener noreferrer" style="margin-left: 15px; display: inline-block;">
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
  .nav-badge-new {
    background-color: #ffc800;
    color: #111 !important; /* Force high-contrast dark text */
    font-size: 10px; /* Increased size */
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

  .team-member h3 {
    font-family: 'Glegoo', serif;
    font-size: 19px;
    font-weight: 700;
    color: #333;
    margin: 0 0 6px;
  }

  .team-member .role {
    font-family: 'Inconsolata', monospace;
    font-size: 13px;
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
</style>
