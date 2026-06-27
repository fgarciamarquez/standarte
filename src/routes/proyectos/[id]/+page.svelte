<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels, projectUrl } from '$lib/siteData.js';
  import FlagIcon from '$lib/components/FlagIcon.svelte';
  import ProjectAdvisor from '$lib/components/ProjectAdvisor.svelte';



  export let data;
  // Cuando el componente se renderiza desde el catch-all en una URL ja
  // (/ja/プロジェクト/{slug}), el idioma viene fijado y se omite la detección.
  export let forcedLang = null;
  $: project = data.project;
  // Fondo del header: primera imagen de la galería del proyecto (fallback al genérico).
  $: headerImage = (project && project.images && project.images.length) ? project.images[0] : '/img/bg2.webp';
  // Galería unificada: el vídeo (si existe) va primero y luego las imágenes. Tanto la
  // rejilla como la ventana flotante (lightbox) operan sobre este array, así el vídeo
  // entra en el flujo de "siguiente/anterior" como una imagen más.
  $: media = [
    ...(project && project.video ? [{ type: 'video', src: project.video, poster: (project.images && project.images[0]) || null }] : []),
    ...((project && project.images ? project.images : []).map((src) => ({ type: 'image', src })))
  ];

  let isScrolled = false;
  let activeImageIndex = -1;
  let lang = forcedLang || 'es';
  let menuOpen = false;

  // Redirige al idioma destino: ja tiene URL propia; el resto usa ?lang=.
  function gotoLang(targetLang) {
    if (targetLang === 'ja') { window.location.href = projectUrl(project.id, 'ja'); return; }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', targetLang);
    window.location.href = url.toString();
  }

  // Detect language preferences (omitida cuando el idioma viene fijado por la URL ja)
  onMount(() => {
    if (!forcedLang && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');

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
              gotoLang(savedPref);
              return;
            } else if (!savedPref) {
              const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
                .split('-')[0]
                .toLowerCase();

              if (browserLang !== 'es' && languages.includes(browserLang)) {
                localStorage.setItem('preferredLanguage', browserLang);
                localStorage.setItem('standarte_lang', browserLang);
                gotoLang(browserLang);
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

    // Protección básica de imágenes: anula el menú contextual (botón derecho) y el
    // arrastre sobre cualquier <img> de la página (evita "Guardar imagen como" y arrastrar).
    const blockOnImage = (e) => { if (e.target && e.target.tagName === 'IMG') e.preventDefault(); };
    document.addEventListener('contextmenu', blockOnImage);
    document.addEventListener('dragstart', blockOnImage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', blockOnImage);
      document.removeEventListener('dragstart', blockOnImage);
    };
  });

  $: currentCopy = copy[lang] || copy.es;

  const ctaLabels = {
    es: 'Presupuesto en 24h',
    en: 'Quote in 24h',
    de: 'Angebot in 24h',
    pt: 'Orçamento em 24h',
    zh: '24小时内报价',
    hi: '24 घंटे में कोटेशन',
    fr: 'Devis en 24h',
    it: 'Preventivo in 24h',
    ko: '24시간 내 견적',
    ja: '24時間で見積もり',
    nl: 'Offerte binnen 24u'
  };
  // Etiqueta del item "Precios" en el menú (consistente con el resto de plantillas).
  const preciosNavLabel = {
    es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi',
    nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金'
  };

  function switchLanguage(targetLang) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferredLanguage', targetLang);
      localStorage.setItem('standarte_lang', targetLang);
    }
    // ja tiene URL propia (/ja/プロジェクト/{slug}); ir a/desde ja exige navegar.
    if (targetLang === 'ja' || forcedLang === 'ja') {
      if (typeof window !== 'undefined') window.location.href = projectUrl(project.id, targetLang);
      return;
    }
    // Entre idiomas no-ja: cambio en cliente con ?lang= sin recargar.
    lang = targetLang;
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (targetLang === 'es') url.searchParams.delete('lang');
      else url.searchParams.set('lang', targetLang);
      window.history.replaceState({}, '', url.toString());
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
    activeImageIndex = (activeImageIndex + 1) % media.length;
  }

  function prevImage() {
    if (activeImageIndex === -1) return;
    activeImageIndex = (activeImageIndex - 1 + media.length) % media.length;
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
    ko: `${project.location}의 ${project.name} 3D 부스 디자인`,
    ja: `${project.location}の${project.name}向け3Dスタンドデザイン`,
    nl: `3D-standontwerp voor ${project.name} in ${project.location}`
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
    ko: `${project.location}에서 진행된 ${project.name} 맞춤형 3D 부스 디자인 상세 정보. 당사의 건축적 가치와의 관계에 대해 알아보십시오.`,
    ja: `${project.location}の${project.name}向けカスタム3Dスタンドデザインの詳細。当社の建築的価値との関係をご覧ください。`,
    nl: `Details van het op maat gemaakte 3D-standontwerp voor ${project.name} in ${project.location}. Ontdek de relatie met onze architectonische waarden.`
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
    ko: `3D 부스 프로토타입 - ${project.name}`,
    ja: `3Dスタンドのプロトタイプ - ${project.name}`,
    nl: `3D-standprototype - ${project.name}`
  } : {};

  const breadcrumbsInicio = {
    es: 'Inicio',
    en: 'Home',
    de: 'Startseite',
    pt: 'Início',
    zh: '首页',
    hi: 'होम',
    fr: 'Accueil',
    it: 'Home',
    ko: '홈',
    ja: 'ホーム',
    nl: 'Home'
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
    ko: '3D 프로젝트',
    ja: '3Dプロジェクト',
    nl: '3D-projecten'
  };

  const backToMainPages = {
    es: 'Volver',
    en: 'Back',
    de: 'Zurück',
    pt: 'Voltar',
    zh: '返回',
    hi: 'वापस',
    fr: 'Retour',
    it: 'Indietro',
    ko: '뒤로',
    ja: '戻る',
    nl: 'Terug'
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
    ko: '뷰 및 3D 렌더링 갤러리',
    ja: 'ビューと3Dレンダリングのギャラリー',
    nl: 'Galerij van weergaven en 3D-renders'
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
    ko: '고화질로 보려면 이미지를 클릭하세요.',
    ja: 'いずれかの画像をクリックすると、高解像度で表示できます。',
    nl: 'Klik op een afbeelding om deze in hoge resolutie te bekijken.'
  };

  // Canónica: ja tiene URL propia; el resto comparte /proyectos/{id} (sin ?lang).
  $: canonicalPath = lang === 'ja' ? projectUrl(project.id, 'ja') : `/proyectos/${project.id}`;

  $: jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": seoNames[lang] || seoNames.es,
    "description": seoDescriptions[lang] || seoDescriptions.es,
    "url": `https://standarte.es${canonicalPath}`,
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
  <title>{project.name} | {lang === 'es' ? 'Prototipo 3D' : (lang === 'de' ? '3D-Prototyp' : (lang === 'pt' ? 'Protótipo 3D' : (lang === 'fr' ? 'Prototype 3D' : (lang === 'it' ? 'Prototipo 3D' : (lang === 'zh' ? '3D原型' : (lang === 'hi' ? '3D\u0020\u092a\u094d\u0930\u094b\u091f\u094b\u091f\u093e\u0907\u092a' : (lang === 'ko' ? '3D 프로토타입' : (lang === 'ja' ? '3Dプロトタイプ' : (lang === 'nl' ? '3D-prototype' : '3D Prototype')))))))))} | Standarte</title>
  <meta name="description" content={seoDescriptions[lang] || seoDescriptions.es} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href={`https://standarte.es${canonicalPath}`} />
  <link rel="alternate" hreflang="ja" href={`https://standarte.es${projectUrl(project.id, 'ja')}`} />
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es/proyectos/${project.id}`} />
  {@html jsonLdString}
</svelte:head>

<header class="site-header static-header" style="background-image: linear-gradient(180deg, rgba(22, 25, 28, 0.7) 0%, rgba(22, 25, 28, 0.9) 100%), url('{headerImage}') !important;">
  <nav class="nav" class:scrolled={isScrolled || menuOpen}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <button
              type="button"
              class:active={option === lang}
              on:click={() => switchLanguage(option)}
              style="display: flex; align-items: center; gap: 8px;"
            >
              <FlagIcon langCode={option} size={16} />
              <span>{languageLabels[option]}</span>
            </button>
          {/each}
        </div>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    </div>

    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'home')}>{currentCopy.nav.home}</a>
      <a href={pathFor(lang, 'services')}>{currentCopy.nav.services}</a>
      <a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
      <a href={pathFor(lang, 'noticias')}>{currentCopy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <button
              type="button"
              class:active={option === lang}
              on:click={() => switchLanguage(option)}
              style="display: flex; align-items: center; gap: 8px;"
            >
              <FlagIcon langCode={option} size={16} />
              <span>{languageLabels[option]}</span>
            </button>
          {/each}
        </div>
      </div>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <h1>{project.title[lang] || project.title.es}</h1>
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
        <li><a href={`${pathFor(lang, 'home')}#prototipos-3d`}>
          {breadcrumbsProyectos[lang] || breadcrumbsProyectos.es}
        </a></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">{project.name}</span></li>
      </ol>
    </nav>
  </div>

  <article class="project-container">
    <!-- Carta del Valor de Diseño y Textos -->
    <div class="values-card">
      <div class="values-content">
        {@html project.valuesText[lang] || project.valuesText.es}
      </div>
    </div>

    <!-- Título Galería -->
    <div class="gallery-title-wrapper">
      <h2>{galleryTitles[lang] || galleryTitles.es}</h2>
      <p>
        {gallerySubtitles[lang] || gallerySubtitles.es}
      </p>
    </div>

    <!-- Grid de Medios del Proyecto (vídeo + imágenes) -->
    <div class="project-gallery-grid">
      {#each media as item, index}
        <div class="gallery-item-wrap" class:gallery-item-video={item.type === 'video'}>
          <button type="button" class="gallery-item-btn" on:click={() => openLightbox(index)} aria-label={item.type === 'video' ? `Ver vídeo de ${project.name}` : `Ver imagen ${index + 1} de ${project.name}`}>
            {#if item.type === 'video'}
              <video class="gallery-video-thumb" src={item.src} muted playsinline preload="metadata" tabindex="-1"></video>
              <span class="gallery-item-overlay gallery-item-overlay-video">
                <span class="play-icon-white"></span>
              </span>
            {:else}
              <img src={item.src.replace('.avif', '-thumb.avif')} alt={`Vista del stand ${project.name} - ${index + 1}`} loading="lazy" />
              <span class="gallery-item-overlay">
                <span class="eye-icon-white"></span>
              </span>
            {/if}
          </button>
        </div>
      {/each}
    </div>

    <!-- Panel de Pat: invitación a un proyecto a medida (al final de la galería). -->
    <ProjectAdvisor {lang} {project} />

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
    <!-- El teclado (Escape/flechas) se gestiona globalmente en svelte:window con handleKeydown -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Visualizador de Render 3D" tabindex="-1" on:click={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}>
      <button class="lightbox-nav prev" type="button" aria-label="Anterior" on:click={prevImage}>‹</button>

      <div class="lightbox-window">
        <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
        {#if media[activeImageIndex] && media[activeImageIndex].type === 'video'}
          <!-- svelte-ignore a11y_media_has_caption -->
          <video src={media[activeImageIndex].src} class="lightbox-image" controls autoplay playsinline></video>
        {:else}
          <img src={media[activeImageIndex].src} alt={`Render de stand 3D ${activeImageIndex + 1} de ${project.name}`} class="lightbox-image" />
        {/if}
      </div>

      <button class="lightbox-nav next" type="button" aria-label="Siguiente" on:click={nextImage}>›</button>
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
          <div class="footer-lang-menu">
            <span class="footer-lang-trigger" role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={22} /></span>
            <div class="footer-lang-dropdown">
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
    font-size: 16px;
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
    background-color: #f7f6f1; /* Esquema claro cálido */
    color: #333;
    padding-bottom: 100px;
    min-height: 100vh;
  }

  /* Protección básica de imágenes: impide arrastrarlas, seleccionarlas y el menú
     largo-pulsado en móvil. El bloqueo del botón derecho se hace por JS en onMount. */
  .project-detail-main img,
  .lightbox-image {
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
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
    font-size: 16px;
    color: #5a6066;
  }

  .breadcrumbs a {
    color: #1a73e8;
    transition: color 0.2s ease;
  }

  .breadcrumbs a:hover {
    color: #1558b0;
  }

  .breadcrumbs .current {
    color: #d32f2f;
    font-weight: 700;
  }

  .breadcrumbs .divider {
    color: #c2c2c2;
  }

  /* Contenedor del Proyecto */
  .project-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  /* Carta de Valores */
  .values-card {
    background-color: transparent;
    border-radius: 8px;
    padding: 0;
    box-shadow: none;
    border: none;
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
    color: #1a1e21;
    margin-bottom: 20px;
    font-family: 'Francois One', serif;
  font-weight: 400;
  }

  .intro-description {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .values-content {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
  }

  .values-content :global(strong) {
    color: #000;
    font-weight: 700;
    font-family: serif;
    font-size: 17px;
  }

  .project-web-link {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .btn-web {
    display: inline-flex;
    align-items: center;
    color: var(--gold);
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .btn-web:hover {
    color: #111;
  }

  /* Título Galería */
  .gallery-title-wrapper {
    margin-bottom: 30px;
  }

  .gallery-title-wrapper h2 {
    font-size: 24px;
    color: #1a1e21;
    margin: 0 0 8px;
    font-family: 'Francois One', serif;
  font-weight: 400;
  }

  .gallery-title-wrapper p {
    font-size: 16px;
    color: #666;
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
    background-color: #ececec;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
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

  /* Vídeo del proyecto: ocupa el tile como una imagen más; al hacer clic abre el lightbox. */
  .gallery-item-video {
    background-color: #000;
  }

  .gallery-video-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-item-btn:hover .gallery-video-thumb {
    transform: scale(1.06);
  }

  /* Marca "reproducir": visible siempre en el tile de vídeo para distinguirlo. */
  .gallery-item-overlay-video {
    opacity: 1;
    background-color: rgba(22, 25, 28, 0.3);
  }

  .play-icon-white {
    width: 46px;
    height: 46px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: relative;
    background: rgba(0, 0, 0, 0.25);
  }

  .play-icon-white::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 54%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 9px 0 9px 15px;
    border-color: transparent transparent transparent #fff;
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 40px;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    background-color: var(--gold);
    color: #111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 16px;
    padding: 12px 28px;
    border: none;
    border-radius: 30px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-back:hover {
    background-color: #e0b000;
    color: #111;
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
