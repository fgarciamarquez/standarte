const fs = require('fs');

let content = fs.readFileSync('src/lib/components/Feria.svelte', 'utf8');

// Add states for nav
if (!content.includes('let isScrolled = false;')) {
  content = content.replace(
    'export let data;',
    `export let data;
  let isScrolled = false;
  let menuOpen = false;
  const ctaLabels = { es: 'SOLICITAR PRESUPUESTO', en: 'REQUEST A QUOTE', de: 'ANGEBOT ANFORDERN', zh: '索取报价', hi: 'एक बोली का अनुरोध करें', pt: 'SOLICITAR ORÇAMENTO', fr: 'DEMANDER UN DEVIS', it: 'RICHIEDI UN PREVENTIVO', ko: '견적 요청' };`
  );
}

// Replace the <main> block and old <div class="nav-bar"> with standard header
const oldNavBarMatch = content.match(/<main class="feria-page">[\s\S]*?<div class="nav-bar">[\s\S]*?<\/div>\s*<section class="feria-hero/);

if (oldNavBarMatch) {
  const newHeader = `<svelte:window bind:scrollY={isScrolled} />
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
    <div class="hero-contents">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href={pathFor(lang, 'home')}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
          <li><span class="divider">/</span></li>
          <li><span class="current" aria-current="page">{fair.name}</span></li>
        </ol>
      </nav>
      <h1>{strings.heroTitle(fair.name)}</h1>
      <p class="hero-lead">{strings.heroSubtitle(localizedCity)}</p>
    </div>
  </div>
</header>

<main class="feria-page">
  <section class="feria-hero`;

  content = content.replace(oldNavBarMatch[0], newHeader);
}

// Add footer if missing
const footerMatch = content.match(/<footer class="footer">/);
if (!footerMatch) {
  content = content.replace(
    '</main>',
    `</main>
<footer class="footer">
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} {copy.footer}</p>
    <div class="footer-links">
      <a href="/legal">{copy.legal.legalNotice}</a>
      <a href="/privacidad">{copy.legal.privacy}</a>
      <a href="/cookies">{copy.legal.cookies}</a>
    </div>
  </div>
</footer>`
  );
}

fs.writeFileSync('src/lib/components/Feria.svelte', content, 'utf8');
console.log('Feria.svelte updated to include main header/footer.');
