<script>
  import { onMount } from 'svelte';
  import { BRAND } from '$lib/brand.js';
  import { pathFor, languages, languageLabels, ctaBudget } from '$lib/siteData.js';
  import { pricingTiers, fmtEuro } from '$lib/pricingTiers.js';
  import { uspNavLabel } from '$lib/uspSnippets.js';
  import FlagIcon from './FlagIcon.svelte';
  import AiSourceButtons from './AiSourceButtons.svelte';
  import ContactForm from './ContactForm.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import { advisorDismissed } from '$lib/stores/advisor.js';

  export let data;
  $: lang = data.lang;
  $: copy = data.copy;
  $: canonical = data.canonical;

  let menuOpen = false;
  let isScrolled = false;
  // El header sobre el hero es semitransparente y se vuelve sólido al hacer scroll.
  // Sin este listener, isScrolled nunca cambiaba y el menú quedaba ilegible al bajar.
  function updateScrollState() { isScrolled = typeof window !== 'undefined' && window.scrollY > 8; }

  // ── Asesor de Pat (WelcomeAdvisor): carga diferida como en la home ──
  let showWelcomeAdvisor = false;
  let AdvisorComponent = null;   // se rellena con el import dinámico

  // Reactiva a Pat desde el botón "Expansión" (junto a los botones GEO).
  function reopenAdvisor() {
    advisorDismissed.reactivate();
    if (AdvisorComponent) { showWelcomeAdvisor = true; }
    else { import('./WelcomeAdvisor.svelte').then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; }).catch(() => {}); }
  }

  onMount(() => {
    updateScrollState();
    // Pat NO se abre solo fuera de la portada: aquí se activa con el disparador
    // "Expansión" del hero (AiSourceButtons → reopenAdvisor).
  });

  // Cifras orientativas «desde», validadas. Fuente única en $lib/pricingTiers.js
  // (compartidas con el asistente de presupuesto). Se muestran como "desde X €".
  const tiers = pricingTiers;
  const fmt = fmtEuro;


  // Los textos de esta página en los 11 idiomas vivían aquí dentro (≈40 KB) y viajaban al
  // navegador en TODAS las páginas, porque la ruta comodín importa de forma estática los
  // seis componentes de página. Ahora los sirve el load del servidor ya resueltos al idioma
  // de la página: ver $lib/server/pricingCopy.js.
  $: t = data.pricingCopy || {};
  // Sufijo de moneda: "X €" salvo en idiomas que anteponen (ja usa "から" tras la cifra).
  $: priceStr = (n) => lang === 'ja' ? `${fmt(n)} €から` : `${t.from} ${fmt(n)} €`.trim();

  const ctaLabels = {
    es: 'Presupuesto en 24h', en: 'Quote in 24h', de: 'Angebot in 24 Std.', pt: 'Orçamento em 24h', fr: 'Devis en 24h',
    it: 'Preventivo in 24h', nl: 'Offerte in 24u', zh: '24小时报价', hi: '24 घंटे में कोटेशन', ko: '24시간 내 견적', ja: '24時間で見積もり'
  };

  // Datos estructurados: rango de precios (Product + AggregateOffer, derivado de los
  // propios tramos para mantenerse sincronizado) + FAQ (FAQPage). Se inyecta en <head>.
  $: priceValues = tiers.map((x) => x.priceFrom);
  $: jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: t.h1,
        description: t.metaDesc,
        serviceType: t.h1,
        provider: { '@type': 'Organization', name: 'Standarte', url: 'https://standarte.es' },
        areaServed: ['ES', 'PT'],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: Math.min(...priceValues),
          highPrice: Math.max(...priceValues),
          offerCount: tiers.length
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };
  $: jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<` + '/script>';
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href={canonical} />
  {#each languages as alt}
    <link rel="alternate" hreflang={alt} href={`https://standarte.es${pathFor(alt, 'precios')}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', 'precios')}`} />
  {@html jsonLdScript}
</svelte:head>

<svelte:window on:scroll|passive={updateScrollState} />
<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled || menuOpen}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    </div>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')}>{copy.nav.services}</a>
      {#if !BRAND.leadGen}<a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>{/if}
      {#if !BRAND.leadGen}
        <a href={pathFor(lang, 'precios')} class="active">{t.navPrecios}</a>
        <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
        <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      {/if}
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      {#if !BRAND.leadGen}<a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>{/if}
    </div>
  </nav>
  <div class="hero-subpage">
    <div class="hero-contents">
      <h1>{t.h1}</h1>
    </div>
    <AiSourceButtons {lang} variant="hero" canReactivate patVisible={showWelcomeAdvisor && !!AdvisorComponent} on:reactivate={reopenAdvisor} />
  </div>
</header>

{#if showWelcomeAdvisor && AdvisorComponent}
  <svelte:component this={AdvisorComponent} {lang}
    on:openPrivacy={() => (typeof window !== 'undefined' && window.open('/privacidad', '_blank', 'noopener'))}
    on:dismiss={() => (showWelcomeAdvisor = false)} />
{/if}

<main class="precios-page">
  <p class="precios-intro">{t.intro}</p>

  <div class="precios-grid">
    {#each tiers as tier}
      <article class="precio-card">
        <h2>{t.tiers[tier.key].name}</h2>
        <p class="precio-amount">{priceStr(tier.priceFrom)}</p>
        <p class="precio-desc">{t.tiers[tier.key].desc}</p>
      </article>
    {/each}
  </div>

  <p class="precios-disclaimer">{t.disclaimer}</p>

  <section class="precios-cost">
    <h2>{t.costQuestion}</h2>
    <p>{t.costAnswer}</p>
  </section>

  <section class="precios-factors">
    <h2>{t.factorsTitle}</h2>
    <ul>
      {#each t.factors as factor}
        <li>{factor}</li>
      {/each}
    </ul>
  </section>

  <section class="precios-faq">
    <h2>{t.faqTitle}</h2>
    <dl>
      {#each t.faqs as f}
        <dt>{f.q}</dt>
        <dd>{f.a}</dd>
      {/each}
    </dl>
  </section>
</main>

<!-- Formulario de cálculo de presupuesto (asistente): al final de la página. -->
<ContactForm labels={copy} {lang} variant="light" />

<SiteFooter {lang} {copy} langHref={(option) => pathFor(option, 'precios')} />

<style>
  /* Todo el fondo del cuerpo de la página en #f7f6f1 (también los laterales fuera del
     contenedor centrado y el área de overscroll). */
  :global(html:has(.precios-page)),
  :global(html:has(.precios-page) body) {
    background-color: #f7f6f1;
  }

  .precios-page {
    max-width: var(--container);
    margin: 0 auto;
    padding: 50px 15px 90px;
    background-color: #f7f6f1;
  }
  .precios-intro {
    max-width: 760px;
    margin: 0 auto 40px;
    text-align: center;
    font-size: 17px;
    line-height: 1.6;
    color: #444;
  }
  .precios-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
  }
  @media (max-width: 1024px) { .precios-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .precios-grid { grid-template-columns: 1fr; } }
  .precio-card {
    background: #fff;
    border: 1px solid rgba(22, 25, 28, 0.06);
    border-radius: 12px;
    padding: 30px 24px;
    box-shadow: 0 8px 24px rgba(22, 25, 28, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .precio-card h2 {
    margin: 0;
    color: #444;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 22px;
  }
  .precio-amount {
    margin: 0;
    color: #111;
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
  }
  .precio-desc {
    margin: 0;
    color: #555;
    font-size: 15px;
    line-height: 1.55;
  }
  .precios-disclaimer {
    max-width: 760px;
    margin: 34px auto 24px;
    text-align: center;
    font-size: 13px;
    color: #888;
    line-height: 1.5;
  }
  /* Secciones SEO: "cuánto cuesta", factores y FAQ */
  .precios-cost,
  .precios-factors,
  .precios-faq {
    max-width: 820px;
    margin: 48px auto 0;
  }
  .precios-cost h2,
  .precios-factors h2,
  .precios-faq h2 {
    color: #444;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin: 0 0 16px;
  }
  .precios-cost p {
    color: #555;
    font-size: 16px;
    line-height: 1.65;
    margin: 0;
  }
  .precios-factors ul {
    margin: 0;
    padding-left: 20px;
  }
  .precios-factors li {
    color: #555;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .precios-faq dt {
    color: #222;
    font-weight: 700;
    font-size: 16px;
    margin-top: 18px;
  }
  .precios-faq dd {
    margin: 6px 0 0;
    color: #555;
    font-size: 16px;
    line-height: 1.65;
  }
</style>
