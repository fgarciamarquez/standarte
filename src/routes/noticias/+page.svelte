<script>
  import { onMount } from 'svelte';
  import news from '$lib/newsData.json';
  import { pathFor, copy, languages, languageLabels } from '$lib/siteData.js';

  let lang = 'es';
  let menuOpen = false;
  let isScrolled = false;
  let activeFilter = 'all';

  // Obtenemos los textos traducidos
  $: currentCopy = copy[lang] || copy.es;

  // Filtrar noticias por idioma y ubicación
  $: filteredNews = news
    .filter(item => item.lang === lang)
    .filter(item => activeFilter === 'all' || item.location.toLowerCase() === activeFilter.toLowerCase());

  // Formatear fecha a formato local
  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locale = lang === 'pt' ? 'pt-PT' : 'es-ES';
    return new Date(dateStr).toLocaleDateString(locale, options);
  }

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  function switchLanguage(targetLang) {
    lang = targetLang;
  }

  onMount(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:head>
  <title>Noticias, Ferias y Arquitectura Efímera | Standarte</title>
  <meta name="description" content="Artículos de actualidad sobre ferias en Madrid, Lisboa y Málaga. Descubre las mejores estrategias de diseño de stands a medida, sombra y circulación de personas." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://standarte.es/noticias/" />
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
      <a href={pathFor(lang, 'contact')}>{currentCopy.nav.contact}</a>
      <div class="lang-menu">
        <span><i class="world-icon" aria-hidden="true"></i> {lang.toUpperCase()}</span>
        <div>
          {#each languages as option}
            <button type="button" class:active={option === lang} on:click={() => switchLanguage(option)}>
              {languageLabels[option]}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <span class="eyebrow">Actualidad Ferial y Tendencias</span>
      <h1>Noticias y Arquitectura Efímera</h1>
      <p class="hero-lead">
        Analizamos la actualidad en los recintos de Madrid, Lisboa y Málaga, diseñando soluciones temporales que destacan, optimizan la circulación y garantizan el confort.
      </p>
    </div>
  </div>
</header>

<main class="news-main">
  <section class="news-filters">
    <div class="filters-container">
      <button type="button" class:active={activeFilter === 'all'} on:click={() => activeFilter = 'all'}>
        Todos los destinos
      </button>
      <button type="button" class:active={activeFilter === 'madrid'} on:click={() => activeFilter = 'madrid'}>
        Madrid
      </button>
      <button type="button" class:active={activeFilter === 'malaga'} on:click={() => activeFilter = 'malaga'}>
        Málaga
      </button>
      <button type="button" class:active={activeFilter === 'lisboa'} on:click={() => activeFilter = 'lisboa'}>
        Lisboa
      </button>
    </div>
  </section>

  <section class="news-grid-section">
    <div class="news-grid">
      {#each filteredNews as item}
        <article class="news-card">
          <div class="news-card-image-wrap">
            {#if item.slug === 'innovacion-arquitectura-efimera-fitur-madrid-2026'}
              <img src="/img/trabajos/trabajos_promueve/01-stand-tecnalia-biemh-2022_1.avif" alt={item.title} loading="lazy" />
            {:else if item.slug === 'des-malaga-2026-sombra-confort-termico-eventos-exteriores'}
              <img src="/img/trabajos/trabajos_promueve/02-bost-emo-2023_1.avif" alt={item.title} loading="lazy" />
            {:else}
              <img src="/img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif" alt={item.title} loading="lazy" />
            {/if}
            <span class="news-card-badge">{item.location}</span>
          </div>

          <div class="news-card-content">
            <header class="news-card-meta">
              <span class="news-date">{formatDate(item.date)}</span>
              <span class="news-source">Fuente: {item.sourceName}</span>
            </header>
            <h3>
              <a href="/noticias/{item.slug}/">{item.title}</a>
            </h3>
            <p class="news-excerpt">{item.excerpt}</p>
            <div class="news-card-footer">
              <a class="read-more-btn" href="/noticias/{item.slug}/">
                Leer artículo completo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      {:else}
        <div class="no-news-box">
          <p>Próximamente más artículos de actualidad sobre este destino.</p>
        </div>
      {/each}
    </div>
  </section>
</main>

<footer>
  <div class="footer-layout">
    <div class="footer-left">
      <ul class="footer-links">
        <li><a href={pathFor(lang, 'services')} class="footer-link-button">{currentCopy.nav.services}</a></li>
        <li><a href={pathFor(lang, 'custom')} class="footer-link-button">{currentCopy.nav.custom}</a></li>
        <li><a href={pathFor(lang, 'noticias')} class="footer-link-button active">{currentCopy.nav.noticias}</a></li>
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
  /* Header y Navbar de subpágina */
  .static-header {
    min-height: 420px !important;
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

  .hero-contents .eyebrow {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--gold);
    display: block;
    margin-bottom: 12px;
  }

  .hero-contents h1 {
    font-size: 40px;
    color: #fff;
    margin: 0 0 20px;
    font-weight: 700;
    line-height: 1.2;
  }

  .hero-lead {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    max-width: 780px;
    margin: 0 auto;
  }

  /* Filtros de Noticias */
  .news-filters {
    background-color: #fcfcfc;
    border-bottom: 1px solid #eee;
    padding: 24px 0;
    position: sticky;
    top: 76px;
    z-index: 100;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.95);
  }

  .filters-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .filters-container button {
    background: transparent;
    border: 1px solid #ddd;
    padding: 10px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    color: #555;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .filters-container button:hover {
    border-color: var(--gold);
    color: #111;
  }

  .filters-container button.active {
    background-color: var(--gold);
    border-color: var(--gold);
    color: #111;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.25);
  }

  /* Contenedor Principal */
  .news-main {
    background-color: #f7f6f1;
    min-height: 60vh;
  }

  .news-grid-section {
    max-width: var(--container);
    margin: 0 auto;
    padding: 60px 15px 100px;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
  }

  /* Tarjeta de Noticia Premium */
  .news-card {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(22, 25, 28, 0.04);
    border: 1px solid rgba(22, 25, 28, 0.03);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .news-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(22, 25, 28, 0.1);
    border-color: rgba(255, 200, 0, 0.3);
  }

  .news-card-image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: #f7f6f1;
  }

  .news-card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .news-card:hover .news-card-image-wrap img {
    transform: scale(1.05);
  }

  .news-card-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: var(--gold);
    color: #111;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .news-card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .news-card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #777;
    margin-bottom: 12px;
  }

  .news-card h3 {
    font-size: 20px;
    line-height: 1.35;
    margin: 0 0 12px 0;
    font-weight: 700;
  }

  .news-card h3 a {
    color: #292f35;
    transition: color 0.2s ease;
  }

  .news-card h3 a:hover {
    color: #b89400;
  }

  .news-excerpt {
    font-size: 13px;
    line-height: 1.6;
    color: #555;
    margin: 0 0 24px 0;
    flex-grow: 1;
  }

  .news-card-footer {
    border-top: 1px solid #f2f2f2;
    padding-top: 16px;
  }

  .read-more-btn {
    color: #b89400;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s ease, color 0.2s ease;
  }

  .read-more-btn:hover {
    gap: 10px;
    color: #111;
  }

  .no-news-box {
    text-align: center;
    grid-column: 1 / -1;
    padding: 80px 0;
    color: #777;
    font-style: italic;
  }

  /* Redundancias y estilo de menú de idiomas */
  .lang-menu div button {
    display: block;
    width: 100%;
    background: transparent;
    border: 0;
    padding: 8px 16px;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    transition: background 0.2s ease;
  }

  .lang-menu div button:hover {
    background: #f7f6f1;
    color: #b89400;
  }

  .lang-menu div button.active {
    font-weight: 700;
    color: #b89400;
  }

  @media (max-width: 768px) {
    .hero-contents h1 {
      font-size: 32px;
    }

    .hero-lead {
      font-size: 14px;
    }

    .news-grid-section {
      padding: 40px 15px 60px;
    }

    .news-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>
