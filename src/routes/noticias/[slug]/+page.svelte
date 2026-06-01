<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels } from '$lib/siteData.js';

  export let data;
  $: article = data.article;

  $: lang = article?.lang || 'es';
  let menuOpen = false;
  let isScrolled = false;

  $: currentCopy = copy[lang] || copy.es;

  const ctaLabels = {
    es: 'SOLICITAR PRESUPUESTO',
    en: 'REQUEST A QUOTE',
    de: 'ANGEBOT ANFORDERN',
    pt: 'SOLICITAR ORÇAMENTO',
    zh: '索取报价',
    hi: 'कोटेशन का अनुरोध करें'
  };

  // Formatear fecha a formato local
  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locale = lang === 'pt' ? 'pt-PT' : 'es-ES';
    return new Date(dateStr).toLocaleDateString(locale, options);
  }

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  onMount(() => {
    // Automatic browser language detection and redirect
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedPref = localStorage.getItem('preferredLanguage');
      
      // Save current language preference when visited
      localStorage.setItem('preferredLanguage', lang);

      if (lang === 'es') {
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, 'noticias');
        } else if (!savedPref) {
          const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
            .split('-')[0]
            .toLowerCase();
          
          if (browserLang !== 'es' && languages.includes(browserLang)) {
            localStorage.setItem('preferredLanguage', browserLang);
            window.location.href = pathFor(browserLang, 'noticias');
          } else {
            localStorage.setItem('preferredLanguage', 'es');
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
      "@id": `https://standarte.es/noticias/${article.slug}/`
    }
  };

  $: structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData)}<` + '/script>';
</script>

<svelte:head>
  <title>{article.title} | Noticias Standarte</title>
  <meta name="description" content={article.excerpt} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={`https://standarte.es/noticias/${article.slug}/`} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${article.title} | Standarte`} />
  <meta property="og:description" content={article.excerpt} />
  <meta property="og:url" content={`https://standarte.es/noticias/${article.slug}/`} />
  <meta property="og:site_name" content="Standarte" />
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
    <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'services')}>{currentCopy.nav.services}</a>
      <a href={pathFor(lang, 'luzpavilion')}>LuzPavilion</a>
      <a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')} class="active">{currentCopy.nav.noticias}</a>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <div class="article-meta-top">
        <span class="location-badge">{article.location}</span>
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
        <li><a href={pathFor(lang, 'home')}>Inicio</a></li>
        <li><span class="divider">/</span></li>
        <li><a href={pathFor(lang, 'noticias')}>Noticias</a></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">{article.location}</span></li>
      </ol>
    </nav>
  </div>

  <article class="article-container">
    <div class="article-content-body">
      {@html article.content}
    </div>

    <!-- Bloque de llamado a la acción (CTA) Premium -->
    <div class="article-cta-box">
      <div class="cta-decorator"></div>
      <h3>¿Tu próximo stand realmente atraerá clientes o solo ocupará espacio?</h3>
      <p>
        En <b>Standarte</b> creamos hitos arquitectónicos e imanes de clientes que posicionan a tu marca como el líder indiscutible en FITUR Madrid, Web Summit Lisboa, DES Málaga y ferias de todo el mundo.
      </p>
      <div class="cta-actions">
        <a href={pathFor(lang, 'contact')} class="btn-cta-gold">
          Diseñar Mi Stand a Medida
        </a>
      </div>
    </div>
  </article>
</main>

<footer>
  <div class="footer-layout">
    <div class="footer-left">
      <ul class="footer-links">
        <li><a href={pathFor(lang, 'services')} class="footer-link-button">{currentCopy.nav.services}</a></li>
        <li><a href={pathFor(lang, 'custom')} class="footer-link-button">{currentCopy.nav.custom}</a></li>
        <li><a href={pathFor(lang, 'noticias')} class="footer-link-button active">{currentCopy.nav.noticias}</a></li>
        <li class="footer-lang-item">
          <div class="lang-menu">
            <span><i class="world-icon" aria-hidden="true"></i> {lang.toUpperCase()}</span>
            <div>
              {#each languages as option}
                <a href={pathFor(option, 'noticias')} class:active={option === lang}>{languageLabels[option]}</a>
              {/each}
            </div>
          </div>
        </li>
        <li><a href={pathFor(lang, 'contact')} class="footer-link-button">{currentCopy.nav.contact}</a></li>
        <li><a href="/admin/email_campaing/" class="_gold footer-link-button" target="_blank" rel="noopener noreferrer">Campañas</a></li>
      </ul>
    </div>
    <div class="copyright">
      <p>Standarte © 2026. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

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
  }

  .article-meta-top {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
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
    font-size: 13px;
    color: #777;
  }

  .breadcrumbs a {
    color: #777;
    transition: color 0.2s ease;
  }

  .breadcrumbs a:hover {
    color: var(--gold);
  }

  .breadcrumbs .current {
    color: #333;
    font-weight: 700;
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
    font-size: 15px;
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

  /* Caja CTA Premium */
  .article-cta-box {
    margin-top: 50px;
    background-color: #292f35;
    border-radius: 8px;
    padding: 40px;
    color: #fff;
    position: relative;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(22, 25, 28, 0.15);
  }

  .cta-decorator {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    right: 0;
    background: linear-gradient(90deg, var(--gold) 0%, #e6b400 100%);
  }

  .article-cta-box h3 {
    font-size: 24px;
    color: #fff;
    margin: 0 0 16px;
    line-height: 1.3;
    font-weight: 700;
  }

  .article-cta-box p {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 30px;
  }

  .btn-cta-gold {
    background-color: var(--gold);
    color: #111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 13px;
    padding: 14px 30px;
    border-radius: 30px;
    display: inline-block;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-cta-gold:hover {
    background-color: #e6b400;
    color: #111;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(255, 200, 0, 0.3);
  }

  @media (max-width: 768px) {
    .article-content-body {
      padding: 30px 20px;
    }

    .hero-contents h1 {
      font-size: 26px;
    }

    .article-cta-box {
      padding: 30px 20px;
    }

    .article-cta-box h3 {
      font-size: 20px;
    }
  }
</style>
