<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels, projectUrl, ctaBudget, activityUrl, cityData } from '$lib/siteData.js';
  import { tagsForProject } from '$lib/projectTags.js';
  import { labelForTag, colorForTag } from '$lib/fairTags.js';
  import { uspNavLabel } from '$lib/uspSnippets.js';
  import { BRAND } from '$lib/brand.js';
  import FlagIcon from '$lib/components/FlagIcon.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';



  export let data;
  // Etiquetas de actividad de este proyecto (mismo sistema que las ferias). Se hornean
  // en projectTags.js en el build desde Supabase; enlazan a los hubs /actividad/<tag>.
  $: projTags = (data && data.project) ? tagsForProject(data.project.id) : [];
  // G2: página de ciudad-matriz a la que pertenece la ubicación del proyecto (si existe),
  // para enlazar el proyecto con su página comercial de ciudad.
  $: projCityKey = (data && data.project)
    ? (Object.keys(cityData).find((k) => !k.startsWith('montaje_') && cityData[k]?.city?.es === data.project.location) || null)
    : null;
  const cityLinkLabel = {
    es: (c) => `Diseñamos y montamos stands en ${c}`, en: (c) => `We design and build stands in ${c}`,
    pt: (c) => `Concebemos e montamos stands em ${c}`, de: (c) => `Wir planen und bauen Stände in ${c}`,
    fr: (c) => `Nous concevons et montons des stands à ${c}`, it: (c) => `Progettiamo e allestiamo stand a ${c}`,
    nl: (c) => `Wij ontwerpen en bouwen stands in ${c}`, zh: (c) => `我们在${c}设计并搭建展台`,
    hi: (c) => `हम ${c} में स्टैंड डिज़ाइन और निर्माण करते हैं`, ko: (c) => `${c}에서 부스를 디자인·시공합니다`,
    ja: (c) => `${c}でブースを設計・施工します`
  };
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
            // Solo redirigimos si el usuario ELIGIÓ antes un idioma (preferencia guardada).
            // Eliminada la auto-detección del idioma del navegador: Googlebot ejecutaba ese
            // JS y la URL canónica del proyecto acababa redirigida a ?lang=xx, marcándose
            // como "Página con redirección" en Search Console e impidiendo su indexación.
            // El idioma correcto ya se comunica por hreflang; el cambio es por acción explícita.
            if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
              gotoLang(savedPref);
              return;
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

  // Vídeo del lightbox sin controles: en móvil el navegador bloquea el autoplay
  // silencioso, así que mostramos un botón de "play" para tocar y reproducir.
  let lbVideoEl;
  let lbPlaying = false;
  function playLbVideo() { if (lbVideoEl) { lbVideoEl.play().catch(() => {}); } }

  function openLightbox(index) {
    lbPlaying = false;
    activeImageIndex = index;
  }

  function closeLightbox() {
    activeImageIndex = -1;
  }

  function nextImage() {
    if (activeImageIndex === -1) return;
    lbPlaying = false;
    activeImageIndex = (activeImageIndex + 1) % media.length;
  }

  function prevImage() {
    if (activeImageIndex === -1) return;
    lbPlaying = false;
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

  // Enlace modesto al sistema de garantía (Proyecto Auditado), bajo el texto del proyecto.
  const descubreGarantia = {
    es: 'Descubre nuestro sistema de garantía',
    en: 'Discover our guarantee system',
    de: 'Entdecke unser Garantiesystem',
    pt: 'Descubra o nosso sistema de garantia',
    zh: '了解我们的保障体系',
    hi: 'हमारी गारंटी प्रणाली जानें',
    fr: 'Découvrez notre système de garantie',
    it: 'Scopri il nostro sistema di garanzia',
    ko: '우리의 보증 시스템 알아보기',
    ja: '当社の保証システムを見る',
    nl: 'Ontdek ons garantiesysteem'
  };

  // Encabezado y texto del bloque de actividades feriales del proyecto.
  const activitiesTitle = {
    es: 'Sectores y actividades feriales',
    en: 'Sectors and trade-fair activities',
    de: 'Branchen und Messeaktivitäten',
    pt: 'Setores e atividades feirais',
    zh: '行业与展会活动',
    hi: 'क्षेत्र और मेला गतिविधियाँ',
    fr: 'Secteurs et activités de salon',
    it: 'Settori e attività fieristiche',
    ko: '분야 및 박람회 활동',
    ja: '分野と展示会の活動',
    nl: 'Sectoren en beursactiviteiten'
  };
  const activitiesLead = {
    es: 'Este stand pertenece a las siguientes actividades feriales. Explora todas las ferias del mismo sector donde diseñamos y montamos:',
    en: 'This stand belongs to the following trade-fair activities. Explore all the fairs in the same sector where we design and build:',
    de: 'Dieser Stand gehört zu den folgenden Messeaktivitäten. Entdecken Sie alle Messen derselben Branche, für die wir entwerfen und bauen:',
    pt: 'Este stand pertence às seguintes atividades feirais. Explore todas as feiras do mesmo setor onde concebemos e montamos:',
    zh: '该展台属于以下展会活动。浏览我们在同一行业设计与搭建展台的所有展会：',
    hi: 'यह स्टैंड निम्नलिखित मेला गतिविधियों से संबंधित है। उसी क्षेत्र के सभी मेले देखें जहाँ हम स्टैंड डिज़ाइन और निर्माण करते हैं:',
    fr: 'Ce stand relève des activités de salon suivantes. Explorez tous les salons du même secteur où nous concevons et montons :',
    it: 'Questo stand appartiene alle seguenti attività fieristiche. Esplora tutte le fiere dello stesso settore dove progettiamo e allestiamo:',
    ko: '이 부스는 다음 박람회 활동에 속합니다. 당사가 부스를 디자인·시공하는 동일 분야의 모든 박람회를 살펴보세요:',
    ja: 'このブースは以下の展示会活動に属します。当社がブースを設計・施工する同じ分野のすべての展示会をご覧ください：',
    nl: 'Deze stand hoort bij de volgende beursactiviteiten. Ontdek alle beurzen in dezelfde sector waar wij ontwerpen en bouwen:'
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
    ...(projTags.length ? {
      "keywords": projTags.map((tg) => labelForTag(tg, lang)).join(', '),
      "about": projTags.map((tg) => ({
        "@type": "Thing",
        "name": labelForTag(tg, lang),
        "url": `https://standarte.es${activityUrl(tg, lang)}`
      }))
    } : {}),
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
      {#if !BRAND.leadGen}<a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>{/if}
      {#if !BRAND.leadGen}
        <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
        <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
        <a href={pathFor(lang, 'noticias')}>{currentCopy.nav.noticias}</a>
      {/if}
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
      {#if !BRAND.leadGen}<a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>{/if}
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
    <a class="guarantee-stamp" href="https://standarte.es/proyecto-auditado" aria-label="Sistema de Proyecto Auditado">
      <img src="/img/100x100-guaranted.png" alt="" loading="lazy" width="400" height="400" />
    </a>

    <!-- Carta del Valor de Diseño y Textos -->
    <div class="values-card">
      <div class="values-content">
        {@html project.valuesText[lang] || project.valuesText.es}
      </div>
    </div>

    <!-- Enlace modesto al Proyecto Auditado (al final del texto, antes de la galería). -->
    <p class="audited-link-wrap">
      <a class="audited-link" href={pathFor(lang, 'proyecto_auditado')}>{descubreGarantia[lang] || descubreGarantia.es} →</a>
    </p>

    <!-- Actividades feriales del proyecto (malla interna hacia los hubs /actividad/<tag>). -->
    {#if projTags.length}
      <section class="project-activities" aria-label={activitiesTitle[lang] || activitiesTitle.es}>
        <h2>{activitiesTitle[lang] || activitiesTitle.es}</h2>
        <p>{activitiesLead[lang] || activitiesLead.es}</p>
        <ul class="activity-tag-chips">
          {#each projTags as tg}
            <li>
              <a href={activityUrl(tg, lang)} style="--chip:{colorForTag(tg)}">
                <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tg, lang)}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/if}
    <!-- G2: enlace a la página comercial de la ciudad del proyecto. -->
    {#if projCityKey}
      <p class="project-city-link">
        <a href={pathFor(lang, projCityKey)}>{(cityLinkLabel[lang] || cityLinkLabel.es)(project.location)} →</a>
      </p>
    {/if}

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

    <!-- Asistente de presupuesto progresivo (integrado, igual que en las páginas de vídeo). -->
    <ContactForm {lang} labels={copy[lang] || copy.es} variant="light" compact />

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
          <div class="lightbox-video-wrap">
            <video src={media[activeImageIndex].src} class="lightbox-image" autoplay loop muted playsinline
              bind:this={lbVideoEl}
              on:playing={() => (lbPlaying = true)}
              on:pause={() => (lbPlaying = false)}
              on:click={playLbVideo}></video>
            {#if !lbPlaying}
              <button type="button" class="lightbox-video-play" on:click={playLbVideo} aria-label="Reproducir vídeo"><span aria-hidden="true">▶</span></button>
            {/if}
          </div>
        {:else}
          <img src={media[activeImageIndex].src} alt={`Render de stand 3D ${activeImageIndex + 1} de ${project.name}`} class="lightbox-image" />
          <!-- Marca de agua discreta: línea diagonal fina que cruza la foto con "STANDARTE"
               en el centro. Solo en imágenes ampliadas (no en los vídeos). -->
          <div class="lightbox-watermark" aria-hidden="true">
            <div class="wm-row">
              <span class="wm-line"></span>
              <span class="wm-brand">STANDARTE</span>
              <span class="wm-line"></span>
            </div>
          </div>
        {/if}
      </div>

      <button class="lightbox-nav next" type="button" aria-label="Siguiente" on:click={nextImage}>›</button>
    </div>
  {/if}
</main>

<SiteFooter {lang} copy={currentCopy} langHref={(option) => projectUrl(project.id, option)} />

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
  /* Vídeo del lightbox: botón de "play" (toca para reproducir en móvil, sin controles). */
  .lightbox-video-wrap { position: relative; display: inline-flex; max-width: 100%; }
  .lightbox-video-wrap video { cursor: pointer; }
  .lightbox-video-play {
    position: absolute; inset: 0; margin: auto;
    width: 76px; height: 76px; border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.45);
    color: #fff; font-size: 26px; line-height: 1; padding-left: 5px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .lightbox-video-play:hover { background: rgba(0, 0, 0, 0.65); transform: scale(1.06); }

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
    position: relative;
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  /* Sello de garantía: flota sobre la esquina superior derecha, pisando el texto
     a propósito (como un sello físico sobre un documento). */
  .guarantee-stamp {
    display: block;
    position: absolute;
    top: -55px;
    right: 6px;
    width: 150px;
    height: 150px;
    z-index: 5;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
    transition: transform 0.2s ease;
  }
  .guarantee-stamp:hover {
    transform: scale(1.05);
  }
  .guarantee-stamp img {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .guarantee-stamp {
      width: 100px;
      height: 100px;
      top: -34px;
      right: 4px;
    }
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
    font-family: 'Roboto', sans-serif;
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

  /* Enlace modesto al Proyecto Auditado (bajo el texto, antes de la galería). */
  .audited-link-wrap {
    margin: -24px 0 44px;
  }
  .audited-link {
    font-size: 14px;
    color: #4169e1; /* Royal Blue */
    border-bottom: 1px dotted rgba(65, 105, 225, 0.5);
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .audited-link:hover {
    color: #2a4bc0;
    border-color: #2a4bc0;
  }

  /* Actividades feriales del proyecto (chips con color hacia los hubs /actividad). */
  .project-activities {
    margin: 0 0 50px;
    padding-top: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .project-activities h2 {
    font-size: 22px;
    color: #1a1e21;
    margin: 0 0 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  .project-city-link {
    margin: 0 0 40px;
    font-size: 15px;
  }
  .project-city-link a {
    color: #4169e1;
    text-decoration: underline;
    font-weight: 700;
  }
  .project-city-link a:hover { color: #2a4bc0; }
  .project-activities p {
    font-size: 15px;
    color: #666;
    margin: 0 0 18px;
  }
  .activity-tag-chips {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .activity-tag-chips li a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.92rem;
    color: #2a2a2a;
    text-decoration: none;
    border: 1px solid color-mix(in srgb, var(--chip) 45%, transparent);
    border-left: 4px solid var(--chip);
    border-radius: 8px;
    background: color-mix(in srgb, var(--chip) 8%, #fff);
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .activity-tag-chips li a:hover {
    background: color-mix(in srgb, var(--chip) 16%, #fff);
    border-color: var(--chip);
    transform: translateY(-2px);
  }
  .activity-tag-chips .chip-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--chip);
    flex: 0 0 auto;
  }

  /* Título Galería */
  .gallery-title-wrapper {
    margin-bottom: 30px;
  }

  .gallery-title-wrapper h2 {
    font-size: 24px;
    color: #1a1e21;
    margin: 0 0 8px;
    font-family: 'Roboto', sans-serif;
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

  /* Marca de agua discreta sobre la foto ampliada: una línea diagonal fina que cruza la
     imagen, interrumpida en el centro por "STANDARTE". Cubre exactamente la imagen (la
     ventana se ajusta a su tamaño) y no intercepta clics. */
  .lightbox-watermark {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    overflow: hidden;
  }
  .lightbox-watermark .wm-row {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 150%;
    transform: rotate(-30deg);
    opacity: 0.5;
  }
  .lightbox-watermark .wm-line {
    flex: 1;
    height: 0;
    border-top: 1px dotted rgba(255, 255, 255, 0.75);
  }
  .lightbox-watermark .wm-brand {
    flex: 0 0 auto;
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Inconsolata', monospace;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    white-space: nowrap;
    padding-left: 0.4em;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.55);
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
