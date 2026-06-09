<script>
  import { onMount } from 'svelte';
  import news from '$lib/newsData.json';
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

  export let data = {};
  export let lang = data?.lang || 'es';
  let menuOpen = false;
  let isScrolled = false;
  let activeFilter = 'all';

  // Obtenemos los textos traducidos
  $: currentCopy = data?.copy || copy[lang] || copy.es;

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

  const i18n = {
    es: {
      eyebrow: 'Actualidad Ferial y Tendencias',
      title: 'Noticias y Arquitectura Efímera',
      lead: 'Analizamos la actualidad en los recintos de Madrid, Barcelona, Bilbao, Lisboa y Málaga, diseñando soluciones temporales que destacan, optimizan la circulación y garantizan el confort.',
      allDestinations: 'Todos los destinos',
      source: 'Fuente',
      readMore: 'Leer artículo completo',
      noNews: 'Próximamente más artículos de actualidad sobre este destino.'
    },
    en: {
      eyebrow: 'Fair News & Trends',
      title: 'News & Ephemeral Architecture',
      lead: 'We analyze current events at the venues in Madrid, Barcelona, Bilbao, Lisbon and Malaga, designing temporary solutions that stand out, optimize circulation and guarantee comfort.',
      allDestinations: 'All destinations',
      source: 'Source',
      readMore: 'Read full article',
      noNews: 'More current articles about this destination coming soon.'
    },
    de: {
      eyebrow: 'Messenews & Trends',
      title: 'News & Temporäre Architektur',
      lead: 'Wir analysieren das aktuelle Geschehen an den Veranstaltungsorten in Madrid, Barcelona, Bilbao, Lissabon und Malaga und entwerfen temporäre Lösungen, die auffallen, den Fluss optimieren und Komfort garantieren.',
      allDestinations: 'Alle Reiseziele',
      source: 'Quelle',
      readMore: 'Vollständigen Artikel lesen',
      noNews: 'Weitere aktuelle Artikel über dieses Reiseziel folgen in Kürze.'
    },
    pt: {
      eyebrow: 'Atualidade de Feiras e Tendências',
      title: 'Notícias e Arquitetura Efémera',
      lead: 'Analisamos a atualidade nos recintos de Madrid, Barcelona, Bilbao, Lisboa e Málaga, desenhando soluções temporárias que se destacam, otimizam a circulação e garantem o conforto.',
      allDestinations: 'Todos os destinos',
      source: 'Fonte',
      readMore: 'Ler artigo completo',
      noNews: 'Em breve mais artigos de atualidade sobre este destino.'
    },
    zh: {
      eyebrow: '行业新闻与趋势',
      title: '新闻与临时建筑',
      lead: '我们分析马德里、巴塞罗那、毕尔巴鄂、里斯本和马拉加展馆的最新动态，设计出脱颖而出、优化人流并保证舒适的临时解决方案。',
      allDestinations: '所有目的地',
      source: '来源',
      readMore: '阅读全文',
      noNews: '该目的地更多最新文章即将推出。'
    },
    hi: {
      eyebrow: 'मेला समाचार और रुझान',
      title: 'समाचार और अल्पकालिक वाস্তुकला',
      lead: 'हम मैड्रिड, बार्सिलोना, बिलबाओ, लिस्बन और मलागा में वर्तमान घटनाओं का विश्लेषण करते हैं, ऐसे अस्थायी समाधान डिजाइन करते हैं जो अलग दिखें, प्रवाह को अनुकूलित करें और आराम की गारंटी दें।',
      allDestinations: 'सभी गंतव्य',
      source: 'स्रोत',
      readMore: 'पूरा लेख पढ़ें',
      noNews: 'इस गंतव्य के बारे में जल्द ही और लेख आ रहे हैं।'
    },
    fr: {
      eyebrow: 'Actualités & Tendances des Salons',
      title: 'Actualités et Architecture Éphémère',
      lead: 'Nous analysons l’actualité des parcs d’expositions de Madrid, Barcelone, Bilbao, Lisbonne et Malaga, en concevant des solutions temporaires qui se démarquent, optimisent la circulation et garantissent le confort.',
      allDestinations: 'Toutes les destinations',
      source: 'Source',
      readMore: 'Lire l\'article complet',
      noNews: 'Prochainement plus d\'articles d\'actualité sur cette destination.'
    },
    it: {
      eyebrow: 'Novità e Tendenze Fieristiche',
      title: 'Notizie e Architettura Effimera',
      lead: 'Analizziamo l’attualità nei quartieri fieristici di Madrid, Barcellona, Bilbao, Lisbona e Malaga, progettando soluzioni temporanee che si distinguono, ottimizzano il flusso e garantiscono il confort.',
      allDestinations: 'Tutte le destinazioni',
      source: 'Fonte',
      readMore: 'Leggi l\'articolo completo',
      noNews: 'Prossimamente altri articoli di attualità su questa destinazione.'
    },
    ko: {
      eyebrow: '박람회 소식 및 트렌드',
      title: '뉴스 및 임시 건축',
      lead: '마드리드, 바르셀로나, 빌바오, 리스본, 말라가 전시장의 최신 소식을 분석하여 돋보이고 동선을 최적화하며 편안함을 보장하는 임시 솔루션을 디자인합니다.',
      allDestinations: '모든 목적지',
      source: '출처',
      readMore: '기사 전체 읽기',
      noNews: '이 목적지에 대한 더 많은 최신 기사가 곧 추가될 예정입니다.'
    }
  };

  const cityLabels = {
    es: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Málaga', lisboa: 'Lisboa' },
    en: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbon' },
    de: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lissabon' },
    pt: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Málaga', lisboa: 'Lisboa' },
    zh: { madrid: '马德里', barcelona: '巴塞罗那', bilbao: '毕尔巴鄂', malaga: '马拉加', lisboa: '里斯本' },
    hi: { madrid: 'मैड्रिड', barcelona: 'बार्सिलोना', bilbao: 'बिलबाओ', malaga: 'मलागा', lisboa: 'लिस्बन' },
    fr: { madrid: 'Madrid', barcelona: 'Barcelone', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbonne' },
    it: { madrid: 'Madrid', barcelona: 'Barcellona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbona' },
    ko: { madrid: '마드리드', barcelona: '바르셀로나', bilbao: '빌바오', malaga: '말라가', lisboa: '리스본' }
  };

  // Translate city name
  function translateCity(cityStr) {
    if (!cityStr) return '';
    const key = cityStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (cityLabels[lang] || cityLabels.es)[key] || cityStr;
  }

  // Filtrar noticias por idioma y ubicación
  $: filteredNews = news
    .filter(item => item.lang === lang)
    .filter(item => {
      if (activeFilter === 'all') return true;
      const cleanLoc = item.location.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const cleanFilter = activeFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return cleanLoc === cleanFilter;
    });

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
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, 'noticias');
          return;
        } else if (!savedPref) {
          const browserLang = (navigator.language || navigator.languages?.[0] || 'es')
            .split('-')[0]
            .toLowerCase();
          
          if (browserLang !== 'es' && languages.includes(browserLang)) {
            localStorage.setItem('preferredLanguage', browserLang);
            localStorage.setItem('standarte_lang', browserLang);
            window.location.href = pathFor(browserLang, 'noticias');
            return;
          } else {
            localStorage.setItem('preferredLanguage', 'es');
            localStorage.setItem('standarte_lang', 'es');
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

  const seoTitles = {
    es: 'Noticias y Ferias en Madrid y Barcelona - Presupuesto en 24 H | Standarte',
    en: 'News and Fairs in Madrid, Barcelona, Bilbao, Lisbon, Malaga and Badajoz | Standarte',
    de: 'Nachrichten und Messen in Madrid, Barcelona, Bilbao, Lissabon, Malaga und Badajoz | Standarte',
    pt: 'Notícias e Feiras em Madrid, Barcelona, Bilbao, Lisboa, Málaga e Badajoz | Standarte',
    zh: '马德里、巴塞罗那、毕尔巴鄂、里斯本、马拉加和巴达霍斯的新闻与展会 | Standarte',
    hi: 'मैड्रिड, बार्सिलोना, बिलबाओ, लिस्बन, मलागा और बादाहोज़ में समाचार और मेले | Standarte',
    fr: 'Actualités et Salons à Madrid, Barcelone, Bilbao, Lisbonne, Malaga et Badajoz | Standarte',
    it: 'Notizie e Fiere a Madrid, Barcellona, Bilbao, Lisbona, Malaga e Badajoz | Standarte',
    ko: '마드리드, 바르셀로나, 빌바오, 리스본, 말라가, 바다호스의 뉴스 및 박람회 | Standarte'
  };

  const seoDescriptions = {
    es: 'Artículos de actualidad sobre ferias y diseño de stands a medida. Solicita tu Presupuesto en 24 H para Madrid, Barcelona, Bilbao, Lisboa, Málaga y Badajoz.',
    en: 'Current articles on fairs in Madrid, Barcelona, Bilbao, Lisbon, Malaga and Badajoz. The best custom exhibition stand design strategies.',
    de: 'Aktuelle Artikel über Messen in Madrid, Barcelona, Bilbao, Lissabon, Malaga und Badajoz. Die besten Strategien für das Design von Messeständen.',
    pt: 'Artigos atuais sobre feiras em Madrid, Barcelona, Bilbao, Lisboa, Málaga e Badajoz. As melhores estratégias de design de stands à medida.',
    zh: '关于马德里、巴塞罗那、毕尔巴鄂、里斯本、马拉加和巴达霍斯展会的最新文章。最佳的定制展台设计策略。',
    hi: 'मैड्रिड, बार्सिलोना, बिलबाओ, लिस्बन, मलागा और बादाहोज़ में मेलों पर वर्तमान लेख। सर्वश्रेष्ठ कस्टम प्रदर्शनी स्टैंड डिजाइन रणनीतियाँ。',
    fr: "Articles d'actualité sur les salons à Madrid, Barcelone, Bilbao, Lisbonne, Malaga et Badajoz. Les meilleures stratégies de conception de stands sur mesure.",
    it: 'Articoli di attualità sulle fiere a Madrid, Barcellona, Bilbao, Lisbona, Malaga e Badajoz. Le migliori strategie di progettazione di stand su misura.',
    ko: '마드리드, 바르셀로나, 빌바오, 리스본, 말라가, 바다호스의 박람회에 관한 최신 기사. 최고의 맞춤형 전시 부스 디자인 전략.'
  };
</script>

<svelte:head>
  <title>{seoTitles[lang] || seoTitles.es}</title>
  <meta name="description" content={seoDescriptions[lang] || seoDescriptions.es} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={`https://standarte.es${pathFor(lang, 'noticias')}`} />
  {#each languages as alternateLang}
    <link rel="alternate" hreflang={alternateLang} href={`https://standarte.es${pathFor(alternateLang, 'noticias')}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', 'noticias')}`} />
</svelte:head>

<header class="site-header noticias-header">
  <nav class="nav" class:scrolled={isScrolled || menuOpen}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'services')}>{currentCopy.nav.services}</a>
      <a href={pathFor(lang, 'luzpavilion')}>LuzPavilion</a>
      <a href={pathFor(lang, 'custom')}>{currentCopy.nav.custom}</a>
      <a href={pathFor(lang, 'noticias')} class="active">{currentCopy.nav.noticias}</a>
      <div class="lang-menu">
        <span><i class="world-icon" aria-hidden="true"></i> {lang.toUpperCase()}</span>
        <div>
          {#each languages as option}
            <a
              href={pathFor(option, 'noticias')}
              class:active={option === lang}
              on:click={() => {
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem('preferredLanguage', option);
                }
              }}
            >
              {languageLabels[option]}
            </a>
          {/each}
        </div>
      </div>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <span class="eyebrow">{(i18n[lang] || i18n.es).eyebrow}</span>
      <h1>{(i18n[lang] || i18n.es).title}</h1>
      <p class="hero-lead">
        {(i18n[lang] || i18n.es).lead}
      </p>
    </div>
  </div>
</header>

<main class="news-main">
  <section class="news-filters">
    <div class="filters-container">
      <button type="button" class:active={activeFilter === 'all'} on:click={() => activeFilter = 'all'}>
        {(i18n[lang] || i18n.es).allDestinations}
      </button>
      <button type="button" class:active={activeFilter === 'madrid'} on:click={() => activeFilter = 'madrid'}>
        {(cityLabels[lang] || cityLabels.es).madrid}
      </button>
      <button type="button" class:active={activeFilter === 'barcelona'} on:click={() => activeFilter = 'barcelona'}>
        {(cityLabels[lang] || cityLabels.es).barcelona}
      </button>
      <button type="button" class:active={activeFilter === 'bilbao'} on:click={() => activeFilter = 'bilbao'}>
        {(cityLabels[lang] || cityLabels.es).bilbao}
      </button>
      <button type="button" class:active={activeFilter === 'malaga'} on:click={() => activeFilter = 'malaga'}>
        {(cityLabels[lang] || cityLabels.es).malaga}
      </button>
      <button type="button" class:active={activeFilter === 'lisboa'} on:click={() => activeFilter = 'lisboa'}>
        {(cityLabels[lang] || cityLabels.es).lisboa}
      </button>
    </div>
  </section>

  <section class="news-grid-section">
    <div class="news-grid">
      {#each filteredNews as item}
        <article class="news-card">
          <div class="news-card-image-wrap">
            <img src={item.image || "/img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif"} alt={item.title} loading="lazy" />
            <span class="news-card-badge">{translateCity(item.location)}</span>
          </div>

          <div class="news-card-content">
            <header class="news-card-meta">
              <span class="news-date">{formatDate(item.date)}</span>
              <span class="news-source">{(i18n[lang] || i18n.es).source}: {item.sourceName}</span>
            </header>
            <h3>
              <a href="/noticias/{item.slug}/">{item.title}</a>
            </h3>
            <p class="news-excerpt">{item.excerpt}</p>
            <div class="news-card-footer">
              <a class="read-more-btn" href="/noticias/{item.slug}/">
                {(i18n[lang] || i18n.es).readMore}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      {:else}
        <div class="no-news-box">
          <p>{(i18n[lang] || i18n.es).noNews}</p>
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
        <li class="footer-lang-item">
          <div class="footer-lang-menu" on:mouseenter={handleLangMenuHover}>
            <span class="footer-lang-trigger"><FlagIcon langCode={lang} size={22} /></span>
            <div class="footer-lang-dropdown align-{dropdownAlign}">
              {#each languages as option}
                <a
                  href={pathFor(option, 'noticias')}
                  class:active={option === lang}
                  on:click={() => {
                    if (typeof localStorage !== 'undefined') {
                      localStorage.setItem('standarte_lang', option);
                      localStorage.setItem('preferredLanguage', option);
                    }
                  }}
                  class="footer-lang-option"
                >
                  <FlagIcon langCode={option} size={18} />
                  <span class="footer-lang-name">{languageLabels[option]}</span>
                </a>
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
  /* Header y Navbar de subpágina */
  .noticias-header {
    min-height: 420px !important;
    background: url('/img/bg2.webp') fixed center center / cover no-repeat !important;
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
    border-bottom: none !important;
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
    color: #eee;
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
