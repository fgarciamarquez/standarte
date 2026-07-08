<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels, ctaBudget } from '$lib/siteData.js';
  import FlagIcon from '$lib/components/FlagIcon.svelte';
  import WelcomeAdvisor from '$lib/components/WelcomeAdvisor.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  export let data;
  $: article = data.article;

  $: lang = article?.lang || 'es';
  let menuOpen = false;
  let isScrolled = false;

  // Panel de Pat (WelcomeAdvisor) bajo la noticia + modal de privacidad que abre su enlace.
  let showAdvisor = true;
  let legalModal = null;
  function openLegalModal(type) {
    const titles = { privacy: currentCopy.legal?.privacy, legalNotice: currentCopy.legal?.legalNotice, cookies: currentCopy.legal?.cookies };
    legalModal = { title: titles[type], content: currentCopy.legalText?.[type] || copy.es.legalText?.[type] || '' };
  }
  function closeLegalModal() { legalModal = null; }

  $: currentCopy = (() => {
    const byLang = copy[lang];
    if (byLang) return byLang;
    if (import.meta.env.DEV && lang !== 'es') {
      console.warn(`[i18n] Falta copy["${lang}"] en noticias — fallback a ES`);
    }
    return copy.es;
  })();

  const languageLocales = {
    es: 'es_ES',
    en: 'en_GB',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    pt: 'pt_PT',
    fr: 'fr_FR',
    it: 'it_IT',
    ko: 'ko_KR'
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
    ko: 'ko-KR'
  };

  function getAlternateUrl(option) {
    if (option === lang) return `/blog/${article.slug}`;
    const alt = (data.alternates || []).find(a => a.lang === option);
    if (alt) return `/blog/${alt.slug}`;
    return pathFor(option, 'noticias');
  }

  const ctaLabels = {
    es: 'Presupuesto en 24h',
    en: 'Quote in 24h',
    de: 'Angebot in 24h',
    pt: 'Orçamento em 24h',
    zh: '24小时内报价',
    hi: '24 घंटे में कोटेशन',
    fr: 'Devis en 24h',
    it: 'Preventivo in 24h',
    ko: '24시간 내 견적'
  };
  // Etiqueta del item "Precios" en el menú (consistente con el resto de plantillas).
  const preciosNavLabel = {
    es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi',
    nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金'
  };

  const i18nDetail = {
    es: {
      home: 'Inicio',
      news: 'Noticias',
      ctaTitle: '¿Tu próximo stand realmente atraerá clientes o solo ocupará espacio?',
      ctaText: 'En <b>Standarte</b> creamos hitos arquitectónicos e imanes de clientes que posicionan a tu marca como el líder indiscutible en FITUR Madrid, Web Summit Lisboa, DES Málaga y ferias de todo el mundo.',
      ctaBtn: 'Diseñar Mi Stand a Medida'
    },
    en: {
      home: 'Home',
      news: 'News',
      ctaTitle: 'Will your next stand really attract customers or just take up space?',
      ctaText: 'At <b>Standarte</b>, we create architectural milestones and customer magnets that position your brand as the undisputed leader at FITUR Madrid, Web Summit Lisbon, DES Malaga, and trade shows worldwide.',
      ctaBtn: 'Design My Custom Stand'
    },
    de: {
      home: 'Startseite',
      news: 'News',
      ctaTitle: 'Wird Ihr nächster Stand wirklich Kunden anziehen oder nur Platz einnehmen?',
      ctaText: 'Bei <b>Standarte</b> schaffen wir architektonische Meilensteine und Kundenmagnete, die Ihre Marke als unangefochtenen Marktführer auf der FITUR Madrid, dem Web Summit Lissabon, der DES Malaga und Messen weltweit positionieren.',
      ctaBtn: 'Meinen maßgeschneiderten Stand entwerfen'
    },
    pt: {
      home: 'Início',
      news: 'Notícias',
      ctaTitle: 'O seu próximo stand irá realmente atrair clientes ou apenas ocupar espaço?',
      ctaText: 'Na <b>Standarte</b> criamos marcos arquitetónicos e ímanes de clientes que posicionam a sua marca como o líder indiscutível na FITUR Madrid, Web Summit Lisboa, DES Málaga e feiras em todo o mundo.',
      ctaBtn: 'Conceber o Meu Stand à Medida'
    },
    zh: {
      home: '首页',
      news: '新闻',
      ctaTitle: '您的下一个展台是能真正吸引客户，还是仅仅占用空间？',
      ctaText: '在 <b>Standarte</b>，我们打造建筑地标与客户磁铁，让您的品牌在马德里 FITUR、里斯本 Web Summit、马拉加 DES 以及全球展会中成为无可争议的领军者。',
      ctaBtn: '设计我的专属定制展台'
    },
    hi: {
      home: 'होम',
      news: 'समाचार',
      ctaTitle: 'क्या आपका अगला स्टैंड वास्तव में ग्राहकों को आकर्षित करेगा या केवल स्थान घेरेगा?',
      ctaText: '<b>Standarte</b> में, हम वास्तुशिल्प मील के पत्थर और ग्राहक चुंबक बनाते हैं जो आपके ब्रांड को FITUR मैड्रिड, वेब समिट लिस्बन, DES मलागा और दुनिया भर के व्यापार मेलों में निर्विवाद नेता के रूप में स्थापित करते हैं।',
      ctaBtn: 'मेरा कस्टम स्टैंड डिज़ाइन करें'
    },
    fr: {
      home: 'Accueil',
      news: 'Actualités',
      ctaTitle: 'Votre prochain stand va-t-il vraiment attirer des clients ou simplement occuper de l\'espace ?',
      ctaText: 'Chez <b>Standarte</b>, nous créons des jalons architecturaux et des aimants à clients qui positionnent votre marque en tant que leader incontesté au FITUR Madrid, au Web Summit Lisbonne, au DES Malaga et dans les salons du monde entier.',
      ctaBtn: 'Concevoir mon stand sur mesure'
    },
    it: {
      home: 'Home',
      news: 'Notizie',
      ctaTitle: 'Il tuo prossimo stand attirerà davvero clienti o occuperà solo spazio?',
      ctaText: 'In <b>Standarte</b> creiamo pietre miliari architettoniche e calamite per i clienti que posizionano il tuo marchio como leader indiscusso a FITUR Madrid, Web Summit Lisbona, DES Malaga e fiere in tutto il mondo.',
      ctaBtn: 'Progetta il mio stand su misura'
    },
    ko: {
      home: '홈',
      news: '뉴스',
      ctaTitle: '다음 부스가 실제로 고객을 유치할까요, 아니면 공간만 차지할까요?',
      ctaText: '<b>Standarte</b>에서는 FITUR 마드리드, 웹 서밋 리스본, DES 말라가 및 전 세계 박람회에서 귀하의 브랜드를 독보적인 리더로 포지셔닝할 건축적 이정표와 고객 자석을 제작합니다.',
      ctaBtn: '나만의 맞춤형 부스 디자인하기'
    }
  };

  const cityLabels = {
    es: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Málaga', lisboa: 'Lisboa', badajoz: 'Badajoz' },
    en: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbon', badajoz: 'Badajoz' },
    de: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lissabon', badajoz: 'Badajoz' },
    pt: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Málaga', lisboa: 'Lisboa', badajoz: 'Badajoz' },
    zh: { madrid: '马德里', barcelona: '巴塞罗那', bilbao: '毕尔巴鄂', malaga: '马拉加', lisboa: '里斯本', badajoz: '巴达霍斯' },
    hi: { madrid: 'मैड्रिड', barcelona: 'बार्सिलो나', bilbao: 'बिलबाओ', malaga: 'मलागा', lisboa: 'लिस्बन', badajoz: 'बादाहोज़' },
    fr: { madrid: 'Madrid', barcelona: 'Barcelone', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbonne', badajoz: 'Badajoz' },
    it: { madrid: 'Madrid', barcelona: 'Barcellona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbona', badajoz: 'Badajoz' },
    ko: { madrid: '마드리드', barcelona: '바르셀로나', bilbao: '빌바오', malaga: '말라가', lisboa: '리스본', badajoz: '바다호스' }
  };

  function translateCity(cityStr) {
    if (!cityStr) return '';
    const key = cityStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (cityLabels[lang] || cityLabels.es)[key] || cityStr;
  }

  // Formatear fecha a formato local
  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locales = {
      es: 'es-ES',
      en: 'en-US',
      de: 'de-DE',
      pt: 'pt-PT',
      zh: 'zh-CN',
      hi: 'hi-IN',
      fr: 'fr-FR',
      it: 'it-IT',
      ko: 'ko-KR'
    };
    return new Date(dateStr).toLocaleDateString(locales[lang] || 'es-ES', options);
  }

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  onMount(() => {
    // Automatic browser language detection and redirect
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedPref = localStorage.getItem('preferredLanguage') || localStorage.getItem('standarte_lang');
      const hasAutoRedirected = sessionStorage.getItem('hasAutoRedirected');
      
      // Save current language preference when visited
      localStorage.setItem('preferredLanguage', lang);
      localStorage.setItem('standarte_lang', lang);

      if (lang === 'es' && !hasAutoRedirected) {
        sessionStorage.setItem('hasAutoRedirected', 'true');
        // Solo redirigimos si el usuario ELIGIÓ antes un idioma (preferencia guardada).
        // Eliminada la auto-detección del idioma del navegador: Googlebot ejecutaba ese
        // JS y la versión ES quedaba como "Página con redirección" en Search Console,
        // bloqueando su indexación. El idioma correcto ya se comunica por hreflang.
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, 'noticias');
          return;
        }
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Generamos los datos estructurados en formato JSON-LD para SEO
  $: structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Standarte",
      "url": "https://standarte.es"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Standarte",
      "logo": {
        "@type": "ImageObject",
        "url": "https://standarte.es/img/logo_standarte_rectanular.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://standarte.es/blog/${article.slug}/`
    }
  };

  $: structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData)}<` + '/script>';
</script>

<svelte:head>
  <title>{article.title} | Noticias Standarte</title>
  <meta name="description" content={article.excerpt} />
  <meta name="robots" content="index, follow" />
  <meta http-equiv="content-language" content={contentLanguages[lang] || 'es-ES'} />
  <link rel="canonical" href={`https://standarte.es/blog/${article.slug}`} />
  
  {#each languages as alternateLang}
    {@const alt = alternateLang === article.lang ? article : (data.alternates || []).find(a => a.lang === alternateLang)}
    {#if alt}
      <link rel="alternate" hreflang={alternateLang} href={`https://standarte.es/blog/${alt.slug}`} />
    {/if}
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es/blog/${((data.alternates || []).find(a => a.lang === 'es') || article).slug}`} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${article.title} | Standarte`} />
  <meta property="og:description" content={article.excerpt} />
  <meta property="og:url" content={`https://standarte.es/blog/${article.slug}/`} />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:locale" content={languageLocales[lang] || 'es_ES'} />
  {#if lang !== 'es'}
    <meta property="og:locale:alternate" content="es_ES" />
  {:else}
    {#each languages.filter((alternateLang) => alternateLang !== 'es') as alternateLang}
      <meta property="og:locale:alternate" content={languageLocales[alternateLang]} />
    {/each}
  {/if}
  
  <meta property="article:published_time" content={article.date} />
  <meta property="article:section" content="Exhibition Stands" />
  {#each article.seoKeywords as kw}
    <meta property="article:tag" content={kw} />
  {/each}
  {@html structuredDataScript}
</svelte:head>

<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled || menuOpen}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={getAlternateUrl(option)}
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
      <a href={pathFor(lang, 'services')}>{currentCopy.nav.services}</a>
      <a href={pathFor(lang, 'luzpavilion')}>LuzPavilion</a>
      <a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
      <a href={pathFor(lang, 'noticias')} class="active">{currentCopy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={getAlternateUrl(option)}
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
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <div class="article-meta-top">
        <span class="location-badge">{translateCity(article.location)}</span>
        <span class="dot">•</span>
        <span class="date">{formatDate(article.date)}</span>
      </div>
      <h1>{article.title}</h1>
    </div>
  </div>
</header>

<main class="article-main">
  <div class="breadcrumbs-container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href={pathFor(lang, 'home')}>{(i18nDetail[lang] || i18nDetail.es).home}</a></li>
        <li><span class="divider">/</span></li>
        <li><a href={pathFor(lang, 'noticias')}>{(i18nDetail[lang] || i18nDetail.es).news}</a></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">{translateCity(article.location)}</span></li>
      </ol>
    </nav>
  </div>

  <article class="article-container">
    <div class="article-content-body">
      {@html article.content}
    </div>

    <!-- Panel de Pat: invita a elegir ciudad y feria para pedir una propuesta. -->
    {#if showAdvisor}
      <WelcomeAdvisor {lang} embedded dismissible={false} on:openPrivacy={() => openLegalModal('privacy')} on:dismiss={() => (showAdvisor = false)} />
    {/if}
  </article>
</main>

<SiteFooter {lang} copy={currentCopy} langHref={getAlternateUrl} />

<!-- Modal legal (lo abre el enlace de privacidad del panel de Pat). -->
{#if legalModal}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
  <div class="legal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" tabindex="-1" on:click|self={closeLegalModal}>
    <div class="legal-modal-window" role="document">
      <button class="legal-modal-close" type="button" aria-label="Cerrar" on:click={closeLegalModal}>×</button>
      <div class="legal-modal-brand"><img src="/img/mini_logo_flag.svg" alt="" /></div>
      <h2 id="legal-modal-title">{legalModal.title}</h2>
      <div class="legal-modal-content">{@html legalModal.content}</div>
    </div>
  </div>
{/if}

<style>
  /* Cabecera y Navbar */
  .static-header {
    min-height: 380px !important;
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
    /* Sin el gradiente oscuro global, para que se vea la foto del header (.static-header). */
    background: none;
  }

  .article-meta-top {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
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
    font-size: 36px;
    color: #fff;
    margin: 0;
    font-weight: 700;
    line-height: 1.25;
    max-width: 960px;
    margin: 0 auto;
  }

  /* Breadcrumbs */
  .article-main {
    background-color: #f7f6f1;
    padding-bottom: 100px;
  }

  .breadcrumbs-container {
    max-width: 800px;
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
    color: #777;
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

  /* Contenedor del Artículo */
  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  .article-content-body {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 50px;
    box-shadow: 0 8px 24px rgba(22, 25, 28, 0.04);
    border: 1px solid rgba(22, 25, 28, 0.03);
    font-size: 16px;
    line-height: 1.8;
    color: #333;
  }

  /* Estilos específicos de contenido editorial del artículo */
  .article-content-body :global(h2) {
    font-size: 26px;
    color: #292f35;
    margin: 40px 0 20px;
    border-bottom: 2px solid #ffc800;
    padding-bottom: 8px;
  }

  .article-content-body :global(h3) {
    font-size: 20px;
    color: #292f35;
    margin: 30px 0 15px;
  }

  .article-content-body :global(p) {
    margin-bottom: 20px;
  }

  .article-content-body :global(ul) {
    margin-bottom: 25px;
    padding-left: 20px;
  }

  .article-content-body :global(li) {
    margin-bottom: 10px;
  }

  .article-content-body :global(img) {
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    .article-content-body {
      padding: 30px 20px;
    }

    .hero-contents h1 {
      font-size: 26px;
    }
  }
</style>
