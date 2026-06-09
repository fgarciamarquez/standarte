<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels } from '$lib/siteData.js';
  import FlagIcon from '$lib/components/FlagIcon.svelte';

  let dropdownAlign = 'right';
  function handleLangMenuHover(event) {
    if (typeof window === 'undefined') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const leftSpace = rect.left;
    const rightSpace = window.innerWidth - rect.right;
    if (leftSpace < 120) {
      dropdownAlign = 'left';
    } else if (rightSpace < 120) {
      dropdownAlign = 'right';
    } else {
      dropdownAlign = 'center';
    }
  }

  export let data;
  $: project = data.project;

  let isScrolled = false;
  let activeImageIndex = -1;
  let lang = 'es';
  let menuOpen = false;

  // Detect language preferences
  onMount(() => {
    let urlLang = null;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlLang = urlParams.get('lang');
      
      if (urlLang && languages.includes(urlLang)) {
        lang = urlLang;
      }

      if (typeof localStorage !== 'undefined') {
        const savedPref = localStorage.getItem('preferredLanguage') || localStorage.getItem('standarte_lang');
        
        // If there was a lang param, save it as preferred
        if (urlLang) {
          localStorage.setItem('preferredLanguage', urlLang);
          localStorage.setItem('standarte_lang', urlLang);
        } else {
          // If no lang param (defaulting to 'es')
          localStorage.setItem('preferredLanguage', 'es');
          localStorage.setItem('standarte_lang', 'es');
          
          const hasAutoRedirected = sessionStorage.getItem('hasAutoRedirected');

          if (!hasAutoRedirected) {
            sessionStorage.setItem('hasAutoRedirected', 'true');
            if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
              const url = new URL(window.location.href);
              url.searchParams.set('lang', savedPref);
              window.location.href = url.toString();
              return;
            } else if (!savedPref) {
              const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
                .split('-')[0]
                .toLowerCase();
              
              if (browserLang !== 'es' && languages.includes(browserLang)) {
                localStorage.setItem('preferredLanguage', browserLang);
                localStorage.setItem('standarte_lang', browserLang);
                const url = new URL(window.location.href);
                url.searchParams.set('lang', browserLang);
                window.location.href = url.toString();
                return;
              } else {
                localStorage.setItem('preferredLanguage', 'es');
                localStorage.setItem('standarte_lang', 'es');
              }
            }
          }
        }
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: currentCopy = copy[lang] || copy.es;

  const ctaLabels = {
    es: 'PRESUPUESTO EN 24 H',
    en: 'QUOTE IN 24 H',
    de: 'ANGEBOT IN 24 H',
    pt: 'ORÇAMENTO EM 24 H',
    zh: '24小时内报价',
    hi: '24 घंटे में कोटेशन',
    fr: 'DEVIS EN 24 H',
    it: 'PREVENTIVO IN 24 H',
    ko: '24시간 내 견적'
  };

  function switchLanguage(targetLang) {
    lang = targetLang;
    if (typeof window !== 'undefined') {
      // Update the URL query parameters cleanly without reloading
      const url = new URL(window.location.href);
      if (targetLang === 'es') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', targetLang);
      }
      window.history.replaceState({}, '', url.toString());
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferredLanguage', targetLang);
        localStorage.setItem('standarte_lang', targetLang);
      }
    }
  }

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  function openLightbox(index) {
    activeImageIndex = index;
  }

  function closeLightbox() {
    activeImageIndex = -1;
  }

  function nextImage() {
    if (activeImageIndex === -1) return;
    activeImageIndex = (activeImageIndex + 1) % project.images.length;
  }

  function prevImage() {
    if (activeImageIndex === -1) return;
    activeImageIndex = (activeImageIndex - 1 + project.images.length) % project.images.length;
  }

  function handleKeydown(event) {
    if (activeImageIndex === -1) return;
    if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'Escape') {
      closeLightbox();
    }
  }

  // Schema and Meta localization helpers
  $: seoNames = project ? {
    es: `Diseño de Stand 3D para ${project.name} en ${project.location}`,
    en: `3D Stand Design for ${project.name} in ${project.location}`,
    de: `3D-Messestanddesign for ${project.name} in ${project.location}`,
    pt: `Design de Stand 3D para ${project.name} em ${project.location}`,
    zh: `专为 ${project.name} 在 ${project.location} 设计的3D展台`,
    hi: `${project.location} में ${project.name} के लिए 3D स्टैंड डिज़ाइन`,
    fr: `Design de Stand 3D pour ${project.name} à ${project.location}`,
    it: `Design Stand 3D per ${project.name} a ${project.location}`,
    ko: `${project.location}의 ${project.name} 3D 부스 디자인`
  } : {};

  $: seoDescriptions = project ? {
    es: `Detalles del diseño tridimensional de stand a medida para ${project.name} en ${project.location}. Conoce su relación con nuestros valores arquitectónicos.`,
    en: `Details of the custom 3D stand design for ${project.name} in ${project.location}. Learn about its relationship with our architectural values.`,
    de: `Details des maßgeschneiderten 3D-Messestanddesigns für ${project.name} in ${project.location}. Erfahren Sie mehr über das Verhältnis zu unseren architektonischen Werten.`,
    pt: `Detalhes do design tridimensional de stand sob medida para ${project.name} em ${project.location}. Conheça sua relación com los nuestros valores arquitetônicos.`,
    zh: `专为 ${project.name} 在 ${project.location} 设计的定制3D展台细节。了解其与我们建筑价值观的关系。`,
    hi: `${project.location} में ${project.name} के लिए कस्टम 3D स्टैंड डिज़ाइन का विवरण。 हमारे वास्तुकला मूल्यों के साथ इसके संबंध के बारे में जानें。`,
    fr: `Détails de la conception de stand 3D sur mesure pour ${project.name} à ${project.location}. Découvrez sa relation avec nos valeurs architecturales.`,
    it: `Dettagli del design di stand 3D su misura per ${project.name} a ${project.location}. Scopri la sua relazione con i nostri valori architettonici.`,
    ko: `${project.location}에서 진행된 ${project.name} 맞춤형 3D 부스 디자인 상세 정보. 당사의 건축적 가치와의 관계에 대해 알아보십시오.`
  } : {};

  $: creativeWorkNames = project ? {
    es: `Prototipo de Stand 3D - ${project.name}`,
    en: `3D Stand Prototype - ${project.name}`,
    de: `3D-Messestand-Prototyp - ${project.name}`,
    pt: `Protótipo de Stand 3D - ${project.name}`,
    zh: `3D展台原型 - ${project.name}`,
    hi: `3D स्टैंड प्रोटोटाइप - ${project.name}`,
    fr: `Prototype de Stand 3D - ${project.name}`,
    it: `Prototipo Stand 3D - ${project.name}`,
    ko: `3D 부스 프로토타입 - ${project.name}`
  } : {};

  const heroLeads = {
    es: 'Prototipo 3D y su relación con nuestros valores de diseño',
    en: '3D prototype and its relation to our design values',
    de: '3D-Prototyp und sein Verhältnis zu unseren Designwerten',
    pt: 'Protótipo 3D e sua relação com os nossos valores de design',
    zh: '3D原型及其与我们设计价值观的关系',
    hi: '3D प्रोटोटाइप और हमारे डिज़ाइन मूल्यों के साथ इसका संबंध',
    fr: 'Prototype 3D et sa relation avec nos valeurs de design',
    it: 'Prototipo 3D e la sua relazione con i nostri valori di design',
    ko: '3D 프로토타입 및 당사의 디자인 가치와의 관계'
  };

  const breadcrumbsInicio = {
    es: 'Inicio',
    en: 'Home',
    de: 'Startseite',
    pt: 'Início',
    zh: '首页',
    hi: 'होम',
    fr: 'Accueil',
    it: 'Home',
    ko: '홈'
  };

  const breadcrumbsProyectos = {
    es: 'Proyectos 3D',
    en: '3D Projects',
    de: '3D-Projekte',
    pt: 'Projetos 3D',
    zh: '3D项目',
    hi: '3D परियोजनाएं',
    fr: 'Projets 3D',
    it: 'Progetti 3D',
    ko: '3D 프로젝트'
  };

  const visitWebsites = {
    es: 'Visitar sitio oficial',
    en: 'Visit official website',
    de: 'Offizielle Website besuchen',
    pt: 'Visitar site oficial',
    zh: '访问官方网站',
    hi: 'आधिकारिक वेबसाइट पर जाएं',
    fr: 'Visiter le site officiel',
    it: 'Visita il sito ufficiale',
    ko: '공식 웹사이트 방문'
  };

  const backToMainPages = {
    es: 'Volver a la Página Principal',
    en: 'Back to Main Page',
    de: 'Zurück zur Hauptseite',
    pt: 'Voltar para a Página Principal',
    zh: '返回主页',
    hi: 'मुख्य पृष्ठ पर वापस जाएँ',
    fr: 'Retour à la page principale',
    it: 'Torna alla pagina principale',
    ko: '메인 페이지로 돌아가기'
  };

  const galleryTitles = {
    es: 'Galería de Vistas y Renders 3D',
    en: 'Gallery of Views and 3D Renders',
    de: 'Galerie von Ansichten und 3D-Renders',
    pt: 'Galeria de Vistas e Renders 3D',
    zh: '视图与3D渲染图库',
    hi: 'दृश्य और 3D रेंडर गैलरी',
    fr: 'Galerie de vues et de rendus 3D',
    it: 'Galleria di viste e rendering 3D',
    ko: '뷰 및 3D 렌더링 갤러리'
  };

  const gallerySubtitles = {
    es: 'Haz clic sobre cualquier imagen para explorarla en alta definición.',
    en: 'Click on any image to explore it in high definition.',
    de: 'Klicken Sie auf ein beliebiges Bild, um es in hoher Auflösung anzuzeigen.',
    pt: 'Clique em qualquer imagem para explorá-la em alta definición.',
    zh: '点击任意图片以高清模式探索。',
    hi: 'उच्च परिभाषा में इसका पता लगाने के लिए किसी भी छवि पर क्लिक करें。',
    fr: 'Cliquez sur n’importe quelle image pour l’explorer en haute définition.',
    it: 'Clicca su qualsiasi immagine per esplorarla in alta definizione.',
    ko: '고화질로 보려면 이미지를 클릭하세요.'
  };

  $: jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": seoNames[lang] || seoNames.es,
    "description": seoDescriptions[lang] || seoDescriptions.es,
    "url": `https://standarte.es/proyectos/${project.id}`,
    "image": `https://standarte.es${project.image}`,
    "mainEntity": {
      "@type": "CreativeWork",
      "name": creativeWorkNames[lang] || creativeWorkNames.es,
      "creator": {
        "@type": "Organization",
        "name": "Standarte",
        "url": "https://standarte.es"
      },
      "locationCreated": {
        "@type": "Place",
        "name": project.location
      }
    }
  };
  $: jsonLdString = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`;
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>{project.name} | {lang === 'es' ? 'Prototipo 3D' : (lang === 'de' ? '3D-Prototyp' : (lang === 'pt' ? 'Protótipo 3D' : (lang === 'fr' ? 'Prototype 3D' : (lang === 'it' ? 'Prototipo 3D' : (lang === 'zh' ? '3D原型' : (lang === 'hi' ? '3D\u0020\u092a\u094d\u0930\u094b\u091f\u094b\u091f\u093e\u0907\u092a' : (lang === 'ko' ? '3D 프로토타입' : '3D Prototype')))))))} | Standarte</title>
  <meta name="description" content={seoDescriptions[lang] || seoDescriptions.es} />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href={`https://standarte.es/proyectos/${project.id}`} />
  {@html jsonLdString}
</svelte:head>

<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled || menuOpen}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'services')}>{currentCopy.nav.services}</a>
      <a href={pathFor(lang, 'luzpavilion')}>LuzPavilion</a>
      <a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')}>{currentCopy.nav.noticias}</a>
      <div class="lang-menu">
        <span><i class="world-icon" aria-hidden="true"></i> {lang.toUpperCase()}</span>
        <div>
          {#each languages as option}
            <button
              type="button"
              class:active={option === lang}
              on:click={() => switchLanguage(option)}
            >
              {languageLabels[option]}
            </button>
          {/each}
        </div>
      </div>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <div class="project-meta-top">
        <span class="location-badge">{project.location}</span>
      </div>
      <h1>{project.name}</h1>
      <p class="hero-lead">
        {heroLeads[lang] || heroLeads.es}
      </p>
    </div>
  </div>
</header>

<main class="project-detail-main">
  <div class="breadcrumbs-container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href={pathFor(lang, 'home')}>
          {breadcrumbsInicio[lang] || breadcrumbsInicio.es}
        </a></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">
          {breadcrumbsProyectos[lang] || breadcrumbsProyectos.es}
        </span></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">{project.name}</span></li>
      </ol>
    </nav>
  </div>

  <article class="project-container">
    <!-- Carta del Valor de Diseño y Textos -->
    <div class="values-card">
      <div class="gold-indicator"></div>
      <h2>{project.title[lang] || project.title.es}</h2>
      <p class="intro-description">
        {#if lang === 'es'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Cada stand diseñado por Standarte es el fruto de un análisis exhaustivo de marca y necesidades feriales. A continuación, detallamos los principios de diseño y valores espaciales para este proyecto.
        {:else if lang === 'en'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Each stand designed by Standarte is the result of an exhaustive analysis of the brand and exhibition needs. Below, we detail the design principles and spatial values for this project.
        {:else if lang === 'de'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Jeder von Standarte entworfene Stand ist das Ergebnis einer gründlichen Analyse der Marke und der Messebedürfnisse. Im Folgenden beschreiben wir die Designprinzipien und räumlichen Werte für dieses Projekt.
        {:else if lang === 'pt'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Cada stand desenhado pela Standarte é o fruto de uma análise exaustiva da marca e das necessidades ferais. A seguir, detalhamos os princípios de design e valores espaciais para este projeto.
        {:else if lang === 'fr'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Chaque stand conçu par Standarte est le fruit d'une analyse approfondie de la marque et des besoins du salon. Ci-dessous, nous détaillons les principes de conception et les valeurs spatiales de ce projet.
        {:else if lang === 'it'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Ogni stand progettato da Standarte è il frutto di un'analisi approfondita del marchio e delle esigenze fieristiche. Di seguito, dettagliamo i principi di progettazione e i valori spaziali di questo progetto.
        {:else if lang === 'ko'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Standarte가 디자인한 모든 부스는 브랜드와 전시 요구 사항에 대한 철저한 분석의 결과입니다. 아래에서 이 프로젝트의 디자인 원칙과 공간적 가치를 자세히 설명합니다.
        {:else if lang === 'zh'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})。Standarte 设计的每一个展台都是对品牌和展会需求进行详尽分析的结晶。下面，我们将详细阐述该项目的设计原则和空间价值。
        {:else if lang === 'hi'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})। Standarte द्वारा डिज़ाइन किया गया प्रत्येक स्टैंड ब्रांड और प्रदर्शनी की आवश्यकताओं के संपूर्ण विश्लेषण का परिणाम है। नीचे, हम इस परियोजना के लिए डिज़ाइन सिद्धांतों और स्थानिक मूल्यों का विवरण दे रहे हैं।
        {/if}
      </p>
      <div class="values-content">
        {@html project.valuesText[lang] || project.valuesText.es}
      </div>
      {#if project.web}
        <div class="project-web-link">
          <a href={project.web} target="_blank" rel="noopener noreferrer" class="btn-web">
            {visitWebsites[lang] || visitWebsites.es}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" style="margin-left: 6px; display: inline;">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      {/if}
    </div>

    <!-- Título Galería -->
    <div class="gallery-title-wrapper">
      <h2>{galleryTitles[lang] || galleryTitles.es}</h2>
      <p>
        {gallerySubtitles[lang] || gallerySubtitles.es}
      </p>
    </div>

    <!-- Grid de Imágenes del Proyecto -->
    <div class="project-gallery-grid">
      {#each project.images as imgUrl, index}
        <div class="gallery-item-wrap">
          <button type="button" class="gallery-item-btn" on:click={() => openLightbox(index)} aria-label={`Ver imagen ${index + 1} de ${project.name}`}>
            <img src={imgUrl} alt={`Vista del stand ${project.name} - ${index + 1}`} loading="lazy" />
            <span class="gallery-item-overlay">
              <span class="eye-icon-white"></span>
            </span>
          </button>
        </div>
      {/each}
    </div>

    <!-- Volver al Inicio -->
    <div class="back-navigation">
      <a href={`${pathFor(lang, 'home')}#prototipos-3d`} class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="margin-right: 8px; display: inline; vertical-align: middle;">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        {backToMainPages[lang] || backToMainPages.es}
      </a>
    </div>
  </article>

  <!-- Lightbox Viewer -->
  {#if activeImageIndex !== -1}
    <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Visualizador de Render 3D" on:click={closeLightbox}>
      <button class="lightbox-nav prev" type="button" aria-label="Anterior" on:click|stopPropagation={prevImage}>‹</button>
      
      <div class="lightbox-window" on:click|stopPropagation>
        <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
        <img src={project.images[activeImageIndex]} alt={`Render de stand 3D ${activeImageIndex + 1} de ${project.name}`} class="lightbox-image" />
      </div>

      <button class="lightbox-nav next" type="button" aria-label="Siguiente" on:click|stopPropagation={nextImage}>›</button>
    </div>
  {/if}
</main>

<footer>
  <div class="footer-layout">
    <div class="footer-left">
      <ul class="footer-links">
        <li><a href={pathFor(lang, 'services')} class="footer-link-button">{currentCopy.nav.services}</a></li>
        <li><a href={pathFor(lang, 'custom')} class="footer-link-button">{currentCopy.nav.custom}</a></li>
        <li><a href={pathFor(lang, 'noticias')} class="footer-link-button">{currentCopy.nav.noticias}</a></li>
        <li class="footer-lang-item">
          <div class="footer-lang-menu" on:mouseenter={handleLangMenuHover}>
            <span class="footer-lang-trigger"><FlagIcon langCode={lang} size={22} /></span>
            <div class="footer-lang-dropdown align-{dropdownAlign}">
              {#each languages as option}
                <button
                  type="button"
                  class:active={option === lang}
                  on:click={() => switchLanguage(option)}
                  class="footer-lang-option"
                >
                  <FlagIcon langCode={option} size={18} />
                  <span class="footer-lang-name">{languageLabels[option]}</span>
                </button>
              {/each}
            </div>
          </div>
        </li>
        <li><a href={pathFor(lang, 'contact')} class="footer-link-button">{currentCopy.nav.contact}</a></li>
      </ul>
    </div>
    <div class="copyright">
      <p>
        Standarte © 2026.
        <a href="/admin/email_campaing/" class="_gold footer-link-button" target="_blank" rel="noopener noreferrer" style="margin-left: 15px; display: inline-block;">
          Admin
        </a>
      </p>
    </div>
  </div>
</footer>

<style>
  /* Cabecera y Navbar */
  .static-header {
    min-height: 400px !important;
    background: linear-gradient(180deg, rgba(22, 25, 28, 0.7) 0%, rgba(22, 25, 28, 0.9) 100%), url('/img/bg2.webp') fixed center center / cover no-repeat !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-subpage {
    max-width: var(--container);
    margin: 80px auto 0;
    padding: 0 15px;
    width: 100%;
    text-align: center;
    background: transparent !important;
  }

  .project-meta-top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 16px;
  }

  .location-badge {
    background-color: var(--gold);
    color: #111;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .hero-contents h1 {
    font-size: 42px;
    color: #fff;
    margin: 0;
    font-weight: 700;
    line-height: 1.25;
    max-width: 960px;
    margin: 0 auto 10px;
    letter-spacing: -0.5px;
  }

  .hero-lead {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
  }

  /* Breadcrumbs */
  .project-detail-main {
    background-color: #16191c; /* Fondo oscuro premium */
    color: #fff;
    padding-bottom: 100px;
    min-height: 100vh;
  }

  .breadcrumbs-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  .breadcrumbs ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 8px;
    font-size: 13px;
    color: #888;
  }

  .breadcrumbs a {
    color: #888;
    transition: color 0.2s ease;
  }

  .breadcrumbs a:hover {
    color: var(--gold);
  }

  .breadcrumbs .current {
    color: #ccc;
    font-weight: 700;
  }

  .breadcrumbs .divider {
    color: #444;
  }

  /* Contenedor del Proyecto */
  .project-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  /* Carta de Valores */
  .values-card {
    background-color: #1a1e22;
    border-radius: 8px;
    padding: 45px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    margin-bottom: 50px;
  }

  .gold-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    right: 0;
    background: linear-gradient(90deg, var(--gold) 0%, #e6b400 100%);
  }

  .values-card h2 {
    font-size: 26px;
    color: #fff;
    margin-bottom: 20px;
    font-family: 'Glegoo', serif;
  }

  .intro-description {
    font-size: 15px;
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .values-content {
    font-size: 15px;
    line-height: 1.8;
    color: #ddd;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 25px;
  }

  .values-content :global(strong) {
    color: var(--gold);
    font-weight: 600;
  }

  .project-web-link {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-web {
    display: inline-flex;
    align-items: center;
    color: var(--gold);
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .btn-web:hover {
    color: #fff;
  }

  /* Título Galería */
  .gallery-title-wrapper {
    margin-bottom: 30px;
  }

  .gallery-title-wrapper h2 {
    font-size: 24px;
    color: #fff;
    margin: 0 0 8px;
    font-family: 'Glegoo', serif;
  }

  .gallery-title-wrapper p {
    font-size: 14px;
    color: #888;
    margin: 0;
  }

  /* Grid de Galería */
  .project-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 60px;
  }

  .gallery-item-wrap {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 6px;
    background-color: #121417;
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }

  .gallery-item-btn {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: block;
    overflow: hidden;
  }

  .gallery-item-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-item-btn:hover img {
    transform: scale(1.06);
  }

  .gallery-item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(22, 25, 28, 0.5);
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }

  .gallery-item-btn:hover .gallery-item-overlay {
    opacity: 1;
  }

  .eye-icon-white {
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: relative;
  }

  .eye-icon-white::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
  }

  /* Navegación */
  .back-navigation {
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 40px;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    color: #ccc;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 13px;
    padding: 12px 28px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-back:hover {
    border-color: var(--gold);
    color: var(--gold);
    background-color: rgba(255, 200, 0, 0.03);
    transform: translateX(-4px);
  }

  /* Lightbox */
  .lightbox-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
  }

  .lightbox-window {
    position: relative;
    max-width: 90vw;
    max-height: 85vh;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    background: #000;
    border-radius: 6px;
    overflow: hidden;
    cursor: default;
  }

  .lightbox-image {
    display: block;
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
  }

  .lightbox-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 50%;
    font-size: 20px;
    line-height: 32px;
    cursor: pointer;
    transition: background 0.2s ease;
    z-index: 100;
    text-align: center;
  }

  .lightbox-close:hover {
    background: var(--gold);
    color: #000;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    font-size: 32px;
    line-height: 46px;
    text-align: center;
    cursor: pointer;
    z-index: 10000;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .lightbox-nav:hover {
    background: var(--gold);
    color: #111;
    border-color: var(--gold);
    transform: translateY(-50%) scale(1.1);
  }

  .lightbox-nav.prev {
    left: 30px;
  }

  .lightbox-nav.next {
    right: 30px;
  }


  @media (max-width: 768px) {
    .values-card {
      padding: 30px 20px;
    }

    .hero-contents h1 {
      font-size: 32px;
    }

    .values-card h2 {
      font-size: 22px;
    }

    .project-gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 15px;
    }

    .lightbox-nav {
      width: 40px;
      height: 40px;
      font-size: 24px;
      line-height: 36px;
    }
    
    .lightbox-nav.prev {
      left: 10px;
    }

    .lightbox-nav.next {
      right: 10px;
    }
  }
</style>
