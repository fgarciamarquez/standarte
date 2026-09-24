<script>
  import { onMount } from 'svelte';
  import { BRAND } from '$lib/brand.js';
  import { pathFor, languages, languageLabels, ctaBudget, preciosNav } from '$lib/siteData.js';
  import { galleryVideos } from '$lib/videosData.js';
  import { clientProjectVideos } from '$lib/clientProjectVideos.js';
  import { galleryRenders, RENDERS_DIR } from '$lib/galleryRenders.js';
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

  // Galería (23/09/2026): página propia, como Precios. Vídeos 3D del portfolio y, detrás, los
  // de las propuestas de proyectos de cliente (Google Drive, sin nombre de cliente).
  const videos = galleryVideos;
  const clientVideos = clientProjectVideos;
  const CLIENT_CAP = { es: 'Propuesta 3D de stand a medida presentada a un cliente', en: 'Custom stand 3D proposal presented to a client', de: '3D-Entwurf eines maßgefertigten Messestands für einen Kunden', pt: 'Proposta 3D de stand à medida apresentada a um cliente', fr: 'Proposition 3D de stand sur mesure présentée à un client', it: 'Proposta 3D di stand su misura presentata a un cliente', nl: '3D-voorstel voor een maatwerkstand, gepresenteerd aan een klant', zh: '向客户提交的定制展台 3D 方案', hi: 'ग्राहक को प्रस्तुत कस्टम स्टैंड का 3D प्रस्ताव', ko: '고객에게 제시한 맞춤 부스 3D 제안', ja: 'お客様に提案したオーダーメイドブースの3Dプラン' };
  const T = {
    es: { nav: 'Galería', metaTitle: 'Galería de stands diseñados por Standarte | Vídeos 3D', metaDesc: 'Recorridos en vídeo 3D de stands feriales diseñados, fabricados y montados a medida por Standarte para ferias en España y Portugal.', h1: 'Galería de stands diseñados por Standarte', intro: 'Recorridos en 3D de stands que hemos diseñado, fabricado en nuestro taller y montado para ferias en España y Portugal. Cada vídeo muestra el proyecto tal como se aprobó en el prototipo y se construyó en el pabellón.', watch: 'Ver el vídeo en su página', video: 'Vídeo' },
    en: { nav: 'Gallery', metaTitle: 'Gallery of stands designed by Standarte | 3D videos', metaDesc: '3D video walkthroughs of custom exhibition stands designed, built and installed by Standarte for trade fairs in Spain and Portugal.', h1: 'Gallery of stands designed by Standarte', intro: '3D walkthroughs of stands we have designed, built in our own workshop and installed for trade fairs in Spain and Portugal. Each video shows the project exactly as it was approved in the prototype and built in the hall.', watch: 'Watch on its own page', video: 'Video' },
    de: { nav: 'Galerie', metaTitle: 'Galerie der von Standarte entworfenen Messestände | 3D-Videos', metaDesc: '3D-Videorundgänge durch Messestände, die Standarte für Messen in Spanien und Portugal entworfen, gefertigt und aufgebaut hat.', h1: 'Galerie der von Standarte entworfenen Messestände', intro: '3D-Rundgänge durch Messestände, die wir entworfen, in eigener Werkstatt gefertigt und für Messen in Spanien und Portugal aufgebaut haben. Jedes Video zeigt das Projekt so, wie es im Prototyp freigegeben und in der Halle gebaut wurde.', watch: 'Video auf eigener Seite ansehen', video: 'Video' },
    pt: { nav: 'Galeria', metaTitle: 'Galeria de stands desenhados pela Standarte | Vídeos 3D', metaDesc: 'Percursos em vídeo 3D de stands de feira desenhados, fabricados e montados à medida pela Standarte para feiras em Espanha e Portugal.', h1: 'Galeria de stands desenhados pela Standarte', intro: 'Percursos em 3D de stands que desenhámos, fabricámos na nossa oficina e montámos para feiras em Espanha e Portugal. Cada vídeo mostra o projeto tal como foi aprovado no protótipo e construído no pavilhão.', watch: 'Ver o vídeo na sua página', video: 'Vídeo' },
    fr: { nav: 'Galerie', metaTitle: 'Galerie de stands conçus par Standarte | Vidéos 3D', metaDesc: 'Visites vidéo 3D de stands conçus, fabriqués et montés sur mesure par Standarte pour des salons en Espagne et au Portugal.', h1: 'Galerie de stands conçus par Standarte', intro: 'Visites 3D de stands que nous avons conçus, fabriqués dans notre atelier et montés pour des salons en Espagne et au Portugal. Chaque vidéo montre le projet tel qu’il a été validé sur le prototype et construit dans le hall.', watch: 'Voir la vidéo sur sa page', video: 'Vidéo' },
    it: { nav: 'Galleria', metaTitle: 'Galleria di stand progettati da Standarte | Video 3D', metaDesc: 'Percorsi video 3D di stand fieristici progettati, prodotti e allestiti su misura da Standarte per fiere in Spagna e Portogallo.', h1: 'Galleria di stand progettati da Standarte', intro: 'Percorsi 3D di stand che abbiamo progettato, prodotto nella nostra officina e allestito per fiere in Spagna e Portogallo. Ogni video mostra il progetto così come è stato approvato nel prototipo e costruito in padiglione.', watch: 'Guarda il video nella sua pagina', video: 'Video' },
    nl: { nav: 'Galerij', metaTitle: 'Galerij van stands ontworpen door Standarte | 3D-video’s', metaDesc: '3D-videorondleidingen door beursstands die Standarte op maat heeft ontworpen, gebouwd en gemonteerd voor beurzen in Spanje en Portugal.', h1: 'Galerij van stands ontworpen door Standarte', intro: '3D-rondleidingen door stands die wij hebben ontworpen, in onze eigen werkplaats gebouwd en gemonteerd voor beurzen in Spanje en Portugal. Elke video toont het project zoals het in het prototype is goedgekeurd en in de hal is gebouwd.', watch: 'Bekijk de video op zijn eigen pagina', video: 'Video' },
    zh: { nav: '图库', metaTitle: 'Standarte 设计的展台图库 | 3D 视频', metaDesc: 'Standarte 为西班牙和葡萄牙展会量身设计、制作并搭建的展台 3D 视频漫游。', h1: 'Standarte 设计的展台图库', intro: '这些是我们为西班牙和葡萄牙展会设计、在自有工厂制作并完成搭建的展台 3D 漫游。每段视频都展示了项目在原型中获批、在展馆中建成的样子。', watch: '在视频页面观看', video: '视频' },
    hi: { nav: 'गैलरी', metaTitle: 'Standarte द्वारा डिज़ाइन किए गए स्टैंड की गैलरी | 3D वीडियो', metaDesc: 'स्पेन और पुर्तगाल के मेलों के लिए Standarte द्वारा डिज़ाइन, निर्मित और स्थापित कस्टम स्टैंड के 3D वीडियो वॉकथ्रू।', h1: 'Standarte द्वारा डिज़ाइन किए गए स्टैंड की गैलरी', intro: 'उन स्टैंड के 3D वॉकथ्रू जिन्हें हमने स्पेन और पुर्तगाल के मेलों के लिए डिज़ाइन किया, अपनी कार्यशाला में बनाया और स्थापित किया। हर वीडियो प्रोजेक्ट को वैसा ही दिखाता है जैसा प्रोटोटाइप में स्वीकृत और हॉल में बनाया गया।', watch: 'वीडियो उसके पेज पर देखें', video: 'वीडियो' },
    ko: { nav: '갤러리', metaTitle: 'Standarte가 디자인한 부스 갤러리 | 3D 영상', metaDesc: '스페인과 포르투갈 박람회를 위해 Standarte가 맞춤 디자인, 제작, 설치한 부스의 3D 영상 투어.', h1: 'Standarte가 디자인한 부스 갤러리', intro: '스페인과 포르투갈 박람회를 위해 우리가 디자인하고 자체 공방에서 제작해 설치한 부스의 3D 투어입니다. 각 영상은 프로토타입에서 승인되고 전시장에 지어진 그대로의 프로젝트를 보여 줍니다.', watch: '영상 페이지에서 보기', video: '영상' },
    ja: { nav: 'ギャラリー', metaTitle: 'Standarteがデザインしたブースのギャラリー | 3D動画', metaDesc: 'スペインとポルトガルの展示会向けにStandarteが設計・製作・設営したオーダーメイドブースの3D動画ウォークスルー。', h1: 'Standarteがデザインしたブースのギャラリー', intro: 'スペインとポルトガルの展示会向けに、私たちが設計し、自社工房で製作し、設営したブースの3Dウォークスルーです。各動画は、プロトタイプで承認され会場で施工されたとおりのプロジェクトを示しています。', watch: '動画ページで見る', video: '動画' }
  };
  $: t = T[lang] || T.es;

  const R = RENDERS_DIR;
  const renders = galleryRenders;
  const RENDERS_H2 = { es: 'Prototipos 3D de stands diseñados por Standarte', en: '3D prototypes of stands designed by Standarte', pt: 'Protótipos 3D de stands desenhados pela Standarte', de: '3D-Prototypen von Standarte entworfener Messestände', fr: 'Prototypes 3D de stands conçus par Standarte', it: 'Prototipi 3D di stand progettati da Standarte', nl: '3D-prototypes van stands ontworpen door Standarte', zh: 'Standarte 设计的展台 3D 原型', hi: 'Standarte द्वारा डिज़ाइन किए गए स्टैंड के 3D प्रोटोटाइप', ko: 'Standarte가 디자인한 부스의 3D 프로토타입', ja: 'Standarteがデザインしたブースの3Dプロトタイプ' };
  const cap = (r) => r.cap[lang] || r.cap.en;
  // Leyenda de cada vídeo: el título propio si lo tiene (p. ej. SKYLUXE) o una descripción
  // genérica numerada; sin el sufijo de marca de las watch pages.
  const GENERIC = {"es":"Recorrido 3D de un stand a medida diseñado por Standarte","en":"3D walkthrough of a custom stand designed by Standarte","de":"3D-Rundgang durch einen maßgefertigten Messestand von Standarte","pt":"Percurso 3D de um stand à medida desenhado pela Standarte","fr":"Visite 3D d’un stand sur mesure conçu par Standarte","it":"Percorso 3D di uno stand su misura progettato da Standarte","nl":"3D-rondleiding door een maatwerkstand ontworpen door Standarte","zh":"Standarte 定制展台 3D 漫游","hi":"Standarte द्वारा डिज़ाइन किए गए कस्टम स्टैंड का 3D वॉकथ्रू","ko":"Standarte가 디자인한 맞춤 부스 3D 투어","ja":"Standarteが設計したオーダーメイドブースの3Dウォークスルー"};
  function caption(v, i) {
    const own = String(v.title || '').replace(/^Stand 3D Standarte — /, '').replace(/\s*\|\s*Standarte$/, '').trim();
    const generic = /^Proyecto \d+$/.test(own) || !own;
    return generic ? `${GENERIC[lang] || GENERIC.es} (${t.video.toLowerCase()} ${i + 1})` : own;
  }

  $: jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.h1,
    description: t.metaDesc,
    url: canonical,
    inLanguage: lang,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: videos.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoObject',
          name: v.title,
          description: v.description,
          thumbnailUrl: `https://standarte.es${v.thumb}`,
          contentUrl: `https://standarte.es${v.src}`,
          uploadDate: v.uploadDate,
          url: `https://standarte.es/videos/${v.slug}`
        }
      }))
    }
  };
  $: jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<` + '/script>';
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href={canonical} />
  {#each languages as alt}
    <link rel="alternate" hreflang={alt} href={`https://standarte.es${pathFor(alt, 'galeria')}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', 'galeria')}`} />
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
            <a href={pathFor(option, 'galeria')} data-sveltekit-reload class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
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
      {#if !BRAND.leadGen}<a href={pathFor(lang, 'galeria')} data-sveltekit-reload class="active">{t.nav}</a>{/if}
      {#if !BRAND.leadGen}
        <a href={pathFor(lang, 'precios')}>{copy.nav.precios || preciosNav[lang] || 'Precios'}</a>
        <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
        <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      {/if}
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'galeria')} data-sveltekit-reload class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
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

<main class="galeria-page">
  <p class="galeria-intro">{t.intro}</p>
  <h2 class="galeria-sub">{RENDERS_H2[lang] || RENDERS_H2.en}</h2>
  <div class="galeria-grid galeria-renders">
    {#each renders as r, i}
      <figure class="galeria-item">
        <a href={`${R}${r.f}.webp`} target="_blank" rel="noopener">
          <img src={`${R}${r.f}.webp`} srcset={`${R}${r.f}-800.webp 800w, ${R}${r.f}.webp 1600w`} sizes="(max-width: 760px) 100vw, 50vw"
            width={r.w} height={r.h} alt={cap(r)} class:contain={r.fit === 'contain'} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
        </a>
        <figcaption><p>{cap(r)}</p></figcaption>
      </figure>
    {/each}
  </div>
  <div class="galeria-grid">
    {#each videos as v, i}
      <figure class="galeria-item">
        <!-- svelte-ignore a11y_media_has_caption -->
        <video src={v.src} poster={v.thumb} controls playsinline preload="none" title={v.title} aria-label={v.title}></video>
        <figcaption>
          <h2>{caption(v, i)}</h2>
          <a href={`/videos/${v.slug}`}>{t.watch} →</a>
        </figcaption>
      </figure>
    {/each}
    {#each clientVideos as cv, j}
      <figure class="galeria-item">
        <iframe src={cv.embed} title={`${CLIENT_CAP[lang] || CLIENT_CAP.es} (${t.video.toLowerCase()} ${videos.length + j + 1})`} loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <figcaption>
          <h2>{CLIENT_CAP[lang] || CLIENT_CAP.es} ({t.video.toLowerCase()} {videos.length + j + 1})</h2>
        </figcaption>
      </figure>
    {/each}
  </div>
</main>

<!-- Sección de contacto con el formulario de captación, justo tras la galería. -->
<ContactForm labels={copy} {lang} variant="light" />

<SiteFooter {lang} {copy} langHref={(option) => pathFor(option, 'galeria')} />

<style>
  :global(html:has(.galeria-page)),
  :global(html:has(.galeria-page) body) { background-color: #f7f6f1; }
  .galeria-page { max-width: var(--container); margin: 0 auto; padding: 50px 15px 70px; background-color: #f7f6f1; }
  .galeria-intro { max-width: 760px; margin: 0 auto 40px; text-align: center; font-size: 17px; line-height: 1.6; color: #444; }
  .galeria-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
  @media (max-width: 760px) { .galeria-grid { grid-template-columns: 1fr; } }
  .galeria-item { margin: 0; background: #fff; border: 1px solid rgba(22, 25, 28, 0.06); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(22, 25, 28, 0.05); }
  .galeria-item iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; background: #111; }
  .galeria-item video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #111; object-fit: cover; }
  .galeria-sub { text-align: center; margin: 0 0 24px; color: #333; font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 24px; }
  .galeria-renders { margin-bottom: 48px; }
  .galeria-item img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; background: #222; }
  .galeria-item img.contain { object-fit: contain; background: #fff; }
  .galeria-item figcaption p { margin: 0; color: #333; font-size: 16px; line-height: 1.5; }
  .galeria-item figcaption { padding: 16px 20px 20px; }
  .galeria-item h2 { margin: 0 0 8px; color: #333; font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 18px; }
  .galeria-item a { color: #9a7a00; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; }
</style>
