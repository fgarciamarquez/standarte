<script>
  import { fairsData as fairItems } from '$lib/fairsData.js';
  import { onMount, tick } from 'svelte';
  import { pushState, replaceState, afterNavigate } from '$app/navigation';
  import { languages, languageLabels, pathFor, cityData, portfolios, fairUrl, projectUrl, activityUrl, activityIndexUrl, ctaBudget, preciosNav } from '$lib/siteData.js';
  import { uspHome, uspNavLabel } from '$lib/uspSnippets.js';
  import { toolsCopy } from '$lib/toolsSection.js';
  import { pricingTiers } from '$lib/pricingTiers.js';
  import { freshnessFor } from '$lib/seoFreshness.js';
  import { activitiesForFair, colorForTag, labelForTag } from '$lib/fairTags.js';
  import { projectIndex as projects } from '$lib/projectIndex.js';
  import { galleryVideos } from '$lib/videosData.js';
  import ProjectAdvisor from './ProjectAdvisor.svelte';
  import { LOCALES, localBusinessSchema } from '$lib/seo.js';
  import MicroStand from './MicroStand.svelte';
  import ContactForm from './ContactForm.svelte';
  import AiSourceButtons from './AiSourceButtons.svelte';
  import { advisorDismissed } from '$lib/stores/advisor.js';
  import FlagIcon from './FlagIcon.svelte';
  import LangFlagIntro from './LangFlagIntro.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import MeshCoverageLinks from './MeshCoverageLinks.svelte';
  // WelcomeAdvisor NO se importa de forma estática: se carga con import dinámico
  // (chunk aparte) tras cargar la página, para no colgar del bundle principal.

  export let lang;
  export let section;
  export let copy;
  export let canonical;
  export let initialLightboxSlug = null;
  // Las páginas de galería reutilizan Site con section="custom"; ahí el hreflang
  // por sección apuntaría al listado de galería (incorrecto), así que lo desactivan.
  export let emitHreflang = true;
  // Datos SEO enriquecidos de la sección actual (todas las lenguas), inyectados
  // por el load del servidor; richSeoData.js completo ya no viaja al cliente.
  export let richSeo = null;

  let initialFair = '';
  let showWelcomeAdvisor = false;
  let patInitialFamily = ''; // sector inicial de Pat cuando llega desde una feria (#pat=)
  let advisorTimeout;
  let AdvisorComponent = null; // se rellena con el import dinámico
  let advisorLoadHandler;      // ref del listener 'load' para poder limpiarlo

  function handleSelectFair(event) {
    const { fairName, cityName } = event.detail;
    initialFair = `${fairName} (${cityName})`;
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
    ko: '24시간 내 견적',
    ja: '24時間で見積もり',
    nl: 'Offerte binnen 24u'
  };

  const teamMemberName = {
    es: 'Equipo de Victoria',
    en: "Victoria's Team",
    de: "Victorias Team",
    zh: '维多利亚团队',
    hi: 'विक्टोरिया की टीम',
    pt: 'Equipa de Victoria',
    fr: 'Équipe de Victoria',
    it: 'Team di Victoria',
    ko: '빅토리아 팀',
    ja: 'ビクトリアのチーム',
    nl: 'Team van Victoria'
  };

  // Galería: nº de fotos visibles antes del botón "Ver más" (el resto queda en el
  // DOM pero oculto con display:none, sin descargarse hasta desplegar).
  const GALLERY_VISIBLE = 12;
  // Ciudades de id="local-stands": nº visible antes del botón "Ver más"; el resto
  // queda en el DOM (con sus textos y enlaces, para SEO) pero oculto con display:none.
  const CITIES_VISIBLE = 3;
  const galleryMoreLabels = {
    es: 'Ver más', en: 'See more', de: 'Mehr anzeigen', zh: '查看更多',
    hi: 'और देखें', pt: 'Ver mais', fr: 'Voir plus', it: 'Vedi altro',
    ko: '더 보기', ja: 'もっと見る', nl: 'Meer zien'
  };

  let menuOpen = false;
  let lightboxProject = null;
  // Vídeos 3D del portfolio (definidos en $lib/videosData.js, compartidos con el sitemap y
  // las páginas de visualización). El tile es la miniatura JPG (lazy) y enlaza a la watch page;
  // el .mp4 NO se descarga hasta abrir la ventana flotante (lightbox).
  let videoLightboxSrc = null;
  // Proyecto de referencia del vídeo abierto (para el formulario de Pat del lightbox).
  $: lightboxVideoProject = videoLightboxSrc
    ? (() => {
        const v = galleryVideos.find((g) => g.src === videoLightboxSrc);
        return v ? { name: v.title } : null;
      })()
    : null;
  let galleryExpanded = false;
  let citiesExpanded = false;
  let isScrolled = false;
  let ignoreNextScroll = false;

  // Prototipos 3D Carousel State
  let carouselIndex = 0;
  // Proyectos de Extremadura: son casos locales, NO van en el carrusel 3D genérico (prototipos-3d).
  const CAROUSEL_EXCLUDE_LOCS = ['Don Benito', 'Badajoz', 'Zafra', 'Almendralejo'];
  let shuffledProjects = projects.filter((p) => !CAROUSEL_EXCLUDE_LOCS.includes(p.location));

  // Carga por tramos: solo se renderizan/descargan las primeras 12 fichas; el resto
  // se descarga en grupos de 12 al pulsar el descargador circular del carrusel.
  const CAROUSEL_CHUNK = 12;
  let carouselRevealed = CAROUSEL_CHUNK;
  $: carouselItems = shuffledProjects.slice(0, carouselRevealed);
  $: hasMoreCarousel = carouselRevealed < shuffledProjects.length;
  $: carouselSlots = carouselItems.length; // solo fichas (sin botón descargador)
  function revealMoreCarousel() {
    carouselRevealed = Math.min(carouselRevealed + CAROUSEL_CHUNK, shuffledProjects.length);
  }
  // Blindaje anti-imagen-rota: si el thumb falla, cae a la imagen completa; si esa también, oculta la tarjeta.
  function handleThumbError(e, project) {
    const img = e.currentTarget;
    if (!img.dataset.fallback) {
      img.dataset.fallback = '1';
      img.src = project.image; // intentar la imagen completa (sin -thumb)
    } else {
      const card = img.closest('.carousel-card');
      if (card) card.style.display = 'none';
    }
  }

  // Muestra "cargando…" hasta que la miniatura del carrusel termina de cargar: evita el
  // "salto"/pop-in al pasar rápido. Marca .img-loaded en el contenedor cuando la imagen carga
  // (también si ya estaba en caché). Funciona con los duplicados de la pista.
  function imgLoaded(node) {
    const wrap = node.closest('.carousel-img-wrap');
    const mark = () => { if (wrap) wrap.classList.add('img-loaded'); };
    if (node.complete && node.naturalWidth > 0) mark();
    else node.addEventListener('load', mark, { once: true });
    return { destroy() { node.removeEventListener('load', mark); } };
  }

  let visibleCount = 3;

  function updateVisibleCount() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) {
      visibleCount = 1;
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      visibleCount = 2;
    } else {
      visibleCount = 3;
    }
  }

  // Auto-revela el siguiente tramo al acercarse al final (sin botón manual): solo se
  // renderizan/descargan fichas a medida que el visitante navega, manteniendo ligera la carga.
  $: if (hasMoreCarousel && carouselIndex >= carouselRevealed - visibleCount - 1) {
    revealMoreCarousel();
  }

  function nextSlide() {
    const maxIndex = Math.max(0, carouselSlots - visibleCount);
    if (carouselIndex < maxIndex) {
      carouselIndex++;
    } else if (!hasMoreCarousel) {
      carouselIndex = 0; // vuelve al inicio solo cuando ya está todo cargado
    }
  }

  function prevSlide() {
    const maxIndex = Math.max(0, carouselSlots - visibleCount);
    if (carouselIndex > 0) {
      carouselIndex--;
    } else {
      carouselIndex = maxIndex;
    }
  }

  // --- Carrusel 3D dirigido por la posición del ratón ---
  // Centro del carrusel = parado. Hacia la derecha acelera (derecha→izquierda); hacia la
  // izquierda invierte el sentido (izquierda→derecha). Cuanto más al borde, más rápido.
  // Sin el ratón encima, deriva suave derecha→izquierda. La pista lleva 2 copias: se hace
  // bucle envolviendo el offset sobre el ancho de UNA copia.
  let carouselViewportEl;
  let carouselTrackEl;
  let carOffset = 0;
  let carVelocity = 0; // px/s; negativo = derecha→izquierda
  let carSetWidth = 0; // ancho de una copia (la pista contiene dos)
  let carRaf = null;
  let carLast = null;
  const CAR_BASE = 28; // velocidad por defecto (ratón fuera)
  const CAR_MAX = 680; // velocidad máxima en el borde

  function carMeasure() {
    if (carouselTrackEl) carSetWidth = carouselTrackEl.scrollWidth / 2;
  }

  function carTick(t) {
    if (carLast == null) carLast = t;
    const dt = Math.min(0.05, (t - carLast) / 1000);
    carLast = t;
    if (!carDragging) {
      // Inercia tras un lanzamiento con el dedo: la velocidad decae suavemente hasta
      // recuperar la deriva por defecto (no se integra mientras se arrastra: ahí manda el dedo).
      if (carFling) {
        const target = -CAR_BASE;
        carVelocity = target + (carVelocity - target) * Math.pow(0.93, dt * 60);
        if (Math.abs(carVelocity - target) < 2) { carVelocity = target; carFling = false; }
      }
      carOffset += carVelocity * dt;
    }
    if (carSetWidth > 0) {
      while (carOffset <= -carSetWidth) carOffset += carSetWidth;
      while (carOffset > 0) carOffset -= carSetWidth;
    }
    if (carouselTrackEl) carouselTrackEl.style.transform = `translateX(${carOffset.toFixed(2)}px)`;
    carRaf = requestAnimationFrame(carTick);
  }

  function carOnMove(e) {
    if (!carouselViewportEl) return;
    const r = carouselViewportEl.getBoundingClientRect();
    let rel = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    rel = Math.max(-1, Math.min(1, rel));
    if (Math.abs(rel) < 0.06) rel = 0; // zona muerta central: parar es fácil
    const eased = Math.sign(rel) * rel * rel; // respuesta cuadrática: más control cerca del centro
    carVelocity = -eased * CAR_MAX;
  }

  function carOnLeave() {
    carVelocity = -CAR_BASE; // deriva por defecto derecha→izquierda
  }

  // --- Arrastre táctil con inercia (móvil) para el carrusel 3D ---
  let carDragging = false;
  let carFling = false;
  let carAxis = null; // 'h' (arrastra) | 'v' (deja scroll vertical) | null (sin decidir)
  let carDragStartX = 0, carDragStartY = 0, carDragStartOffset = 0;
  let carPrevX = 0, carPrevT = 0, carVx = 0;
  function carTouchStart(e) {
    if (!carouselViewportEl || e.touches.length !== 1) return;
    carDragging = true; carFling = false; carAxis = null;
    carVelocity = 0; // congelar la deriva mientras el dedo está en contacto
    const tch = e.touches[0];
    carDragStartX = tch.clientX; carDragStartY = tch.clientY;
    carDragStartOffset = carOffset;
    carPrevX = tch.clientX; carPrevT = e.timeStamp; carVx = 0;
  }
  function carTouchMove(e) {
    if (!carDragging || e.touches.length !== 1) return;
    const tch = e.touches[0];
    const dx = tch.clientX - carDragStartX;
    const dy = tch.clientY - carDragStartY;
    if (carAxis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; // esperar a conocer la intención
      carAxis = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      if (carAxis === 'v') { carDragging = false; carVelocity = -CAR_BASE; return; } // scroll de página
    }
    carOffset = carDragStartOffset + dx; // el tick lo envuelve y lo pinta
    const dtms = e.timeStamp - carPrevT;
    if (dtms > 0) carVx = (tch.clientX - carPrevX) / dtms * 1000; // px/s para la inercia
    carPrevX = tch.clientX; carPrevT = e.timeStamp;
  }
  function carTouchEnd() {
    if (!carDragging) return;
    carDragging = false;
    if (carAxis === 'h') {
      carVelocity = Math.max(-3200, Math.min(3200, carVx)); // lanzar con la velocidad de salida
      carFling = true;
    }
    carAxis = null;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    carVelocity = -CAR_BASE;
    carMeasure();
    // Re-medir cuando las imágenes ya han maquetado.
    const m1 = setTimeout(carMeasure, 400);
    const m2 = setTimeout(carMeasure, 1500);
    carRaf = requestAnimationFrame(carTick);
    const onResize = () => carMeasure();
    window.addEventListener('resize', onResize);
    return () => {
      if (carRaf) cancelAnimationFrame(carRaf);
      clearTimeout(m1);
      clearTimeout(m2);
      window.removeEventListener('resize', onResize);
    };
  });

  // Re-medir el ancho cuando cambie el nº de fichas reveladas.
  $: if (carouselItems && carouselTrackEl) {
    requestAnimationFrame(carMeasure);
  }

  // --- Carrusel de ferias (mismo control por ratón que el de proyectos 3D) ---
  // La pista lleva 2 copias (grupos); se hace bucle envolviendo el offset sobre el ancho de una.
  let fairsViewportEl;
  let fairsTrackEl;
  let fairOffset = 0;
  let fairVelocity = 0;
  let fairSetWidth = 0;
  let fairRaf = null;
  let fairLast = null;
  const FAIR_BASE = 32; // deriva por defecto (ratón fuera)
  const FAIR_MAX = 680; // velocidad máxima en el borde

  function fairMeasure() {
    if (fairsTrackEl) fairSetWidth = fairsTrackEl.scrollWidth / 2;
  }
  function fairTick(t) {
    if (fairLast == null) fairLast = t;
    const dt = Math.min(0.05, (t - fairLast) / 1000);
    fairLast = t;
    if (!fairDragging) {
      if (fairFling) {
        const target = -FAIR_BASE;
        fairVelocity = target + (fairVelocity - target) * Math.pow(0.93, dt * 60);
        if (Math.abs(fairVelocity - target) < 2) { fairVelocity = target; fairFling = false; }
      }
      fairOffset += fairVelocity * dt;
    }
    if (fairSetWidth > 0) {
      while (fairOffset <= -fairSetWidth) fairOffset += fairSetWidth;
      while (fairOffset > 0) fairOffset -= fairSetWidth;
    }
    if (fairsTrackEl) fairsTrackEl.style.transform = `translateX(${fairOffset.toFixed(2)}px)`;
    fairRaf = requestAnimationFrame(fairTick);
  }
  function fairOnMove(e) {
    if (!fairsViewportEl) return;
    const r = fairsViewportEl.getBoundingClientRect();
    let rel = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    rel = Math.max(-1, Math.min(1, rel));
    if (Math.abs(rel) < 0.06) rel = 0; // zona muerta central
    const eased = Math.sign(rel) * rel * rel; // respuesta cuadrática
    fairVelocity = -eased * FAIR_MAX;
  }
  function fairOnLeave() {
    fairVelocity = -FAIR_BASE; // deriva por defecto derecha→izquierda
  }

  // --- Arrastre táctil con inercia (móvil) para el carrusel de ferias ---
  let fairDragging = false;
  let fairFling = false;
  let fairAxis = null;
  let fairDragStartX = 0, fairDragStartY = 0, fairDragStartOffset = 0;
  let fairPrevX = 0, fairPrevT = 0, fairVx = 0;
  function fairTouchStart(e) {
    if (!fairsViewportEl || e.touches.length !== 1) return;
    fairDragging = true; fairFling = false; fairAxis = null;
    fairVelocity = 0;
    const tch = e.touches[0];
    fairDragStartX = tch.clientX; fairDragStartY = tch.clientY;
    fairDragStartOffset = fairOffset;
    fairPrevX = tch.clientX; fairPrevT = e.timeStamp; fairVx = 0;
  }
  function fairTouchMove(e) {
    if (!fairDragging || e.touches.length !== 1) return;
    const tch = e.touches[0];
    const dx = tch.clientX - fairDragStartX;
    const dy = tch.clientY - fairDragStartY;
    if (fairAxis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      fairAxis = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      if (fairAxis === 'v') { fairDragging = false; fairVelocity = -FAIR_BASE; return; }
    }
    fairOffset = fairDragStartOffset + dx;
    const dtms = e.timeStamp - fairPrevT;
    if (dtms > 0) fairVx = (tch.clientX - fairPrevX) / dtms * 1000;
    fairPrevX = tch.clientX; fairPrevT = e.timeStamp;
  }
  function fairTouchEnd() {
    if (!fairDragging) return;
    fairDragging = false;
    if (fairAxis === 'h') {
      fairVelocity = Math.max(-3200, Math.min(3200, fairVx));
      fairFling = true;
    }
    fairAxis = null;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    fairVelocity = -FAIR_BASE;
    fairMeasure();
    const fm1 = setTimeout(fairMeasure, 400);
    const fm2 = setTimeout(fairMeasure, 1500);
    fairRaf = requestAnimationFrame(fairTick);
    const onResize = () => fairMeasure();
    window.addEventListener('resize', onResize);
    return () => {
      if (fairRaf) cancelAnimationFrame(fairRaf);
      clearTimeout(fm1);
      clearTimeout(fm2);
      window.removeEventListener('resize', onResize);
    };
  });

  const modularEnabled = false;
  // Título de la sección de proyectos 3D en la home (antes "Proyectos de Bajo Coste").
  const projects3DTitle = {
    es: 'Proyectos 3D', en: '3D Projects', de: '3D-Projekte', pt: 'Projetos 3D', fr: 'Projets 3D',
    it: 'Progetti 3D', nl: '3D-projecten', zh: '3D 项目', hi: '3D परियोजनाएँ', ko: '3D 프로젝트', ja: '3Dプロジェクト'
  };
  // Etiqueta del enlace "Precios" en el menú (la página /precios es un componente propio).
  const preciosNavLabel = {
    es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi',
    nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金'
  };
  // Enlace cruzado (anchor con keyword) hacia la página de precios desde el sidebar de ciudad.
  const preciosLink = {
    es: 'Precios de stands', en: 'Stand prices', de: 'Messestand-Preise',
    fr: 'Tarifs de stands', it: 'Prezzi degli stand', pt: 'Preços de stands',
    zh: '展台价格', hi: 'स्टैंड के मूल्य', ko: '부스 가격', ja: 'ブースの料金', nl: 'Standprijzen'
  };
  const languageLocales = {
    es: 'es_ES',
    en: 'en_GB',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    pt: 'pt_PT',
    fr: 'fr_FR',
    it: 'it_IT',
    ko: 'ko_KR',
    ja: 'ja_JP',
    nl: 'nl_NL'
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
    ko: 'ko-KR',
    ja: 'ja-JP',
    nl: 'nl-NL'
  };
  const cityKeys = ['madrid', 'lisboa', 'oporto', 'portugal_sur', 'santarem', 'valencia', 'mallorca', 'vigo', 'coruna', 'santiago', 'valladolid', 'salamanca', 'batalha', 'bilbao', 'barcelona', 'malaga', 'badajoz', 'trujillo', 'sevilla', 'almeria', 'jaen', 'huelva', 'cordoba', 'granada', 'cadiz', 'ciudad_real', 'zaragoza', 'alicante', 'elche', 'murcia', 'silleda', 'ourense', 'lleida', 'girona', 'irun', 'logrono', 'pamplona', 'vitoria', 'aranda', 'regua', 'ibiza', 'menorca', 'santander', 'gijon', 'islas_canarias', 'islas_de_madeira'];
  const fairListTitles = {
    es: 'Ferias destacadas en España, Portugal, Alemania y Francia para diseño y montaje de stands',
    en: 'Featured fairs in Spain, Portugal, Germany and France for exhibition stand design and assembly',
    de: 'Wichtige Messen in Spanien, Portugal, Deutschland und Frankreich für Messestand Design und Montage',
    zh: '西班牙、葡萄牙、德国和法国展台设计与搭建重点展会',
    hi: 'स्पेन, पुर्तगाल, जर्मनी और फ्रांस में स्टैंड डिज़ाइन और असेंबली के लिए प्रमुख मेले',
    pt: 'Feiras em destaque em Espanha, Portugal, Alemanha e França para design e montagem de stands',
    ko: '전시 부스 디자인 및 조립을 위한 스페인, 포르투갈, 독일, 프랑스의 주요 박람회',
    fr: 'Salons phares en Espagne, Portugal, Allemagne et France pour la conception et le montage de stands',
    it: 'Fiere di rilievo in Spagna, Portogallo, Germania e Francia per la progettazione e il montaggio di stand',
    ja: 'スペイン・ポルトガル・ドイツ・フランスの主要見本市（展示会ブース設計・組立）',
    nl: 'Belangrijke beurzen in Spanje, Portugal, Duitsland en Frankrijk voor standontwerp en montage'
  };
  const counterItems = [
    { key: 'projects', value: 169, icon: 'counter-book' },
    { key: 'clients', value: 145, icon: 'counter-briefcase' },
    { key: 'countries', value: 22, icon: 'counter-flag' },
    { key: 'fairs', value: 158, icon: 'counter-calendar' }
  ];

  let displayedCounters = counterItems.map(item => item.value);
  let countersStarted = false;

  // TEMPORAL: Ocultar imágenes desde la 13ª hasta la última (no borrar, reactivar en una semana)
  // Para reactivar todas las fotos la próxima semana, cambia "portfolios.slice(0, 12)" por "portfolios"
  const activePortfolios = portfolios;

  $: filteredPortfolios = activePortfolios;

  // Al navegar a una sección-página de la home (Servicios, Galería, Equipo, Pabellón de luz),
  // desplazamos a su posición concreta. afterNavigate corre DESPUÉS de la restauración de
  // scroll del navegador, por eso es fiable también al cargar la URL directamente o llegar
  // desde otra página (antes el reactivo con setTimeout fallaba en la carga inicial).
  const SECTION_ANCHOR = { services: 'services', custom: 'custom', team: 'team', luzpavilion: 'micro-stand' };
  afterNavigate(() => {
    if (typeof window === 'undefined') return;
    const id = SECTION_ANCHOR[section];
    if (!id) return; // home/ciudades/contacto: van arriba o gestionan su propio scroll
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    requestAnimationFrame(go);
    setTimeout(go, 250); // reintento tras asentarse el layout (imágenes/lazy)
  });

  // Para japonés (sin rich-ja todavía) usamos null en vez de caer al español:
  // así la página muestra su título/intro japonés en lugar de un cuerpo en otro idioma.
  $: seoContent = richSeo ? (richSeo[lang] || (lang === 'ja' ? null : (richSeo.en || richSeo.es)) || null) : null;
  // Cuerpo reestructurado para ciudades Oro (reordena "Ferias y sectores" + colapsables).
  $: bodyHtml = seoContent ? ((section in cityData) ? transformOroBody(seoContent.body, lang) : seoContent.body) : '';
  // Hero con fondo animado (fotos en movimiento) en la home Y en las páginas matriz de ciudad.
  $: animatedHero = section === 'home' || (section in cityData);
  // ¿Es una página matriz de ciudad? (controla dónde va la miga de pan).
  $: isCityPage = section in cityData;
  // País de la ciudad-matriz (bandera circular en la miga de pan "Inicio / Ciudad"):
  // se deriva de cualquier feria alojada en esa ciudad, mismo dato que usa Feria.svelte.
  // CITY_FLAG_FALLBACK cubre pilares cuyas ferias están en un municipio satélite sin
  // coincidencia exacta de nombre (p. ej. Murcia solo tiene ferias en Torre Pacheco).
  const CITY_FLAG_FALLBACK = { murcia: 'es', salamanca: 'es' };
  $: cityFlagCountry = isCityPage
    ? (fairItems.find((f) => f.city === (cityData[section]?.city?.es || null))?.country || CITY_FLAG_FALLBACK[section] || null)
    : null;
  // Proyectos del pilar: para regiones con perfil sectorial marcado mostramos obra real afín
  // (no se afirma que sean de esa ciudad; el intro es genérico "muestra de nuestro trabajo").
  $: selectedPortfolios = (FEATURED_BY_REGION[SECTION_REGION[section]] || [])
    .map((k) => portfolios.find((p) => p.alt && p.alt.includes(k)))
    .filter(Boolean)
    .concat(portfolios.slice(0, 3))
    .slice(0, 3);

  // --- Clúster pilar→ferias: en cada página de ciudad, enlazar a las ferias de su región ---
  const SECTION_REGION = {
    badajoz: 'extremadura', montaje_zafra: 'extremadura', montaje_don_benito: 'extremadura', montaje_badajoz: 'extremadura',
    madrid: 'madrid', barcelona: 'cataluna', bilbao: 'paisvasco',
    malaga: 'andalucia', sevilla: 'andalucia', ciudad_real: 'castillalamancha', lisboa: 'portugal', oporto: 'portugal', valencia: 'comunidadvalenciana', mallorca: 'baleares', vigo: 'galicia', santiago: 'galicia', coruna: 'galicia', valladolid: 'castillayleon', salamanca: 'castillayleon', batalha: 'portugal', zaragoza: 'aragon', portugal_sur: 'portugal-sur', alicante: 'comunidadvalenciana', murcia: 'murcia', islas_canarias: 'canarias', islas_de_madeira: 'madeira',
    almeria: 'andalucia', jaen: 'andalucia', huelva: 'andalucia', cordoba: 'andalucia', granada: 'andalucia', cadiz: 'andalucia',
    santarem: 'portugal', trujillo: 'extremadura', elche: 'comunidadvalenciana',
    silleda: 'galicia', ourense: 'galicia',
    lleida: 'cataluna', girona: 'cataluna',
    santander: 'cantabria', gijon: 'asturias', irun: 'paisvasco', logrono: 'larioja',
    pamplona: 'navarra',
    vitoria: 'paisvasco',
    aranda: 'castillayleon', regua: 'portugal',
    ibiza: 'ibiza', menorca: 'menorca'
  };
  const FAIR_CITY_REGION = {
    'Badajoz': 'extremadura', 'Don Benito': 'extremadura', 'Almendralejo': 'extremadura', 'Plasencia': 'extremadura', 'Mérida': 'extremadura', 'Zafra': 'extremadura', 'Cáceres': 'extremadura',
    'Madrid': 'madrid', 'Barcelona': 'cataluna', 'Bilbao': 'paisvasco', 'Málaga': 'andalucia', 'Sevilla': 'andalucia', 'Ciudad Real': 'castillalamancha', 'Lisboa': 'portugal', 'Oporto': 'portugal', 'Batalha': 'portugal', 'Valencia': 'comunidadvalenciana', 'Mallorca': 'baleares', 'Zaragoza': 'aragon', 'Vigo': 'galicia', 'Santiago de Compostela': 'galicia', 'A Coruña': 'galicia', 'Valladolid': 'castillayleon', 'Salamanca': 'castillayleon', 'Portugal Sur': 'portugal-sur', 'Elche': 'comunidadvalenciana', 'Alicante': 'comunidadvalenciana', 'Torre Pacheco': 'murcia',
    'Almería': 'andalucia', 'Aguadulce': 'andalucia', 'El Ejido': 'andalucia', 'Jaén': 'andalucia', 'Huelva': 'andalucia', 'Aracena': 'andalucia', 'Punta Umbría': 'andalucia', 'Córdoba': 'andalucia', 'Pozoblanco': 'andalucia', 'Villanueva de Córdoba': 'andalucia', 'Granada': 'andalucia', 'Armilla': 'andalucia', 'Cádiz': 'andalucia', 'Jerez de la Frontera': 'andalucia',
    'Manzanares': 'castillalamancha', 'Porzuna': 'castillalamancha', 'Albacete': 'castillalamancha', 'Toledo': 'castillalamancha',
    'Zamora': 'castillayleon', 'Palencia': 'castillayleon', 'Cacabelos': 'castillayleon',
    'Santarém': 'portugal', 'Trujillo': 'extremadura', 'Elche': 'comunidadvalenciana',
    'Silleda': 'galicia', 'Ourense': 'galicia', 'Boqueixón': 'galicia',
    'Lleida': 'cataluna', 'Girona': 'cataluna',
    'Irún': 'paisvasco',
    'Logroño': 'larioja', 'Alfaro': 'larioja', 'Calahorra': 'larioja',
    'Pamplona': 'navarra',
    'Vitoria': 'paisvasco',
    'Aranda de Duero': 'castillayleon',
    'Peso da Régua': 'portugal',
    'San Vicente de Alcántara': 'extremadura',
    'Ibiza': 'ibiza', 'Menorca': 'menorca',
    'Santander': 'cantabria', 'Torrelavega': 'cantabria', 'Gijón': 'asturias', 'Tineo': 'asturias', 'Vegadeo': 'asturias',
    'Islas Canarias': 'canarias', 'Fuerteventura': 'canarias', 'Tenerife': 'canarias', 'Gran Canaria': 'canarias', 'Las Palmas': 'canarias',
    'Islas de Madeira': 'madeira', 'Funchal': 'madeira', 'Madeira': 'madeira'
  };
  // Proyectos reales afines al perfil sectorial de cada región (obra propia; sin afirmar ubicación).
  const FEATURED_BY_REGION = {
    extremadura: ['Bellota', 'Intermaher', 'Elumatec'], // herramientas agrícolas, maquinaria pesada, industrial
    portugal: ['Philips', 'Tecnalia', 'Pharmatechnik'], // tech+salud, innovación, farma — perfil de los congresos de Lisboa
    paisvasco: ['Intermaher', 'Bellota', 'Elumatec'], // maquinaria pesada (BIEMH), herramientas (Ferroforma), industrial — perfil de las ferias del BEC Bilbao
    madrid: ['Pescanova', 'Philips', 'Fanuc'], // alimentación (Fruit Attraction), tecnología/salud (Madrid Tech Show), robótica — perfil multisectorial de IFEMA
    aragon: ['Intermaher', 'Zayer', 'Bellota'] // maquinaria pesada/agrícola e industrial — perfil de FIMA y SMOPYC en la Feria de Zaragoza
  };
  const cityFairsLabel = {
    es: 'Ferias de la zona en las que diseñamos y montamos stands',
    en: 'Fairs in the area where we design and build stands',
    de: 'Messen in der Region, auf denen wir Stände gestalten und bauen',
    fr: 'Salons de la région où nous concevons et construisons des stands',
    pt: 'Feiras da região onde concebemos e montamos stands',
    it: 'Fiere della zona in cui progettiamo e allestiamo stand',
    ko: '저희가 부스를 디자인하고 시공하는 인근 전시회',
    zh: '我们在该地区设计和搭建展台的展会',
    hi: 'इस क्षेत्र के मेले जहाँ हम स्टैंड डिज़ाइन और निर्माण करते हैं',
    ja: '当社がブースの設計・施工を行う近隣の展示会',
    nl: 'Beurzen in de regio waar wij stands ontwerpen en bouwen'
  };
  // Móvil: cuando hay muchas ferias, la nube de píldoras se condensa en un <details>
  // (pila de botones) que se despliega al tocar, para no saturar antes de las FAQs.
  // La ofuscación es SOLO para móvil: en escritorio el <details> debe estar abierto de
  // verdad (Chrome moderno oculta el contenido de un <details> cerrado con
  // content-visibility, algo que no se puede contrarrestar solo con CSS en la lista hija).
  // Reestructura el cuerpo (HTML) de las páginas de ciudad Oro. Corre en prerender
  // (string puro), así los <details> quedan en el HTML estático: colapsados pero
  // rastreables por Google (el <h2> se conserva dentro del <summary>). Las secciones
  // se identifican por FIRMA (no por texto → i18n-safe): <ol>="Cómo trabajamos";
  // <ul>="Tipos de stand"; enlace a /ferias/ (o 展示会情報) + /actividad/="Ferias y
  // sectores"; #pat="Pat"; #prototipos-3d="Por qué elegir" (última). Documentación,
  // Garantía y Logística se derivan por posición (maquetación uniforme) con guardas.
  // Operaciones: subir "Ferias y sectores" al 2.º puesto; colapsar "Cómo trabajamos",
  // "Tipos de stand" y "Documentación técnica"; integrar "Logística" como párrafo
  // final de "Documentación"; eliminar "Pat" (reiterativo); mover "Garantía" como
  // primer párrafo de "Por qué elegir".
  // CTA amarillo (píldora) que se inyecta tras el primer párrafo del cuerpo Oro y
  // lleva al formulario de presupuesto del pie (#contact).
  const ctaEspacio = {
    es: 'Solicitar presupuesto de stand para este espacio',
    en: 'Request a stand quote for this venue',
    de: 'Standangebot für diesen Veranstaltungsort anfordern',
    pt: 'Pedir orçamento de stand para este espaço',
    fr: 'Demander un devis de stand pour ce lieu',
    it: 'Richiedi un preventivo per uno stand in questa sede',
    nl: 'Vraag een standofferte aan voor deze locatie',
    zh: '为此场馆申请展台报价',
    hi: 'इस स्थल के लिए स्टैंड कोटेशन का अनुरोध करें',
    ko: '이 장소의 부스 견적 요청하기',
    ja: 'この会場のブース見積もりを依頼する'
  };
  // Reescritura SEO del título de "Cómo trabajamos…" → "Cómo lograr tener un stand
  // de éxito en {ciudad} paso a paso". Cada idioma captura la ciudad del título
  // original (estructura fija por plantilla) y la reinserta en el nuevo título.
  const comoTitulo = {
    es: { from: /^Cómo trabajamos tu stand en (.+?),?\s*paso a paso$/, to: (c) => `Cómo lograr tener un stand de éxito en ${c} paso a paso` },
    en: { from: /^How we build your stand in (.+?),?\s*step by step$/, to: (c) => `How to achieve a successful stand in ${c} step by step` },
    de: { from: /^So arbeiten wir Schritt für Schritt an deinem Messestand in (.+)$/, to: (c) => `So gelingt Ihnen in ${c} Schritt für Schritt ein erfolgreicher Messestand` },
    pt: { from: /^Como trabalhamos o teu stand em (.+?),?\s*passo a passo$/, to: (c) => `Como conseguir um stand de sucesso em ${c} passo a passo` },
    fr: { from: /^Comment nous concevons votre stand à (.+?),?\s*étape par étape$/, to: (c) => `Comment réussir votre stand à ${c} étape par étape` },
    it: { from: /^Come lavoriamo il tuo stand a (.+?),?\s*passo dopo passo$/, to: (c) => `Come ottenere uno stand di successo a ${c} passo dopo passo` },
    nl: { from: /^Hoe wij jouw stand in (.+?) aanpakken,?\s*stap voor stap$/, to: (c) => `Hoe u stap voor stap een succesvolle stand in ${c} realiseert` },
    zh: { from: /^我们如何一步步打造您在(.+?)的展台$/, to: (c) => `如何一步步在${c}打造成功的展台` },
    hi: { from: /^हम (.+?) में आपके स्टैंड पर कैसे काम करते हैं,?\s*चरण दर चरण$/, to: (c) => `${c} में सफल स्टैंड कैसे बनाएं, चरण दर चरण` },
    ko: { from: /^(.+?)의 부스 작업 방식,?\s*단계별로$/, to: (c) => `${c}에서 성공적인 부스를 만드는 방법, 단계별 가이드` },
    ja: { from: /^(.+?)のスタンド制作の進め方、ステップごとに$/, to: (c) => `${c}で成功する展示会ブースを実現する方法（ステップバイステップ）` }
  };
  function rewriteComoHeading(section, lang) {
    const map = comoTitulo[lang] || comoTitulo.es;
    const { lead, heading, rest } = heading2Parts(section);
    if (!heading) return section;
    const m = heading.match(map.from);
    return m ? `${lead}<h2>${map.to(m[1])}</h2>${rest}` : section;
  }
  function heading2Parts(section) {
    const m = section.match(/^(\s*)<h2>([\s\S]*?)<\/h2>([\s\S]*)$/);
    return m ? { lead: m[1], heading: m[2], rest: m[3] } : { lead: '', heading: '', rest: section };
  }
  // Quita el último <p>…</p> de un fragmento (el CTA "Pide tu presupuesto…" que
  // cierra "Por qué elegir").
  function dropLastParagraph(html) {
    const i = html.lastIndexOf('<p>');
    return i >= 0 ? html.slice(0, i) : html;
  }
  function collapseSection(section) {
    const { lead, heading, rest } = heading2Parts(section);
    if (!heading) return section;
    return `${lead}<details class="oro-collapse"><summary class="oro-collapse-sum"><h2 class="oro-collapse-h">${heading}</h2><span class="oro-collapse-chevron" aria-hidden="true"></span></summary><div class="oro-collapse-body">${rest}</div></details>`;
  }
  function transformOroBody(html, lang) {
    if (!html || !html.includes('<h2>')) return html;
    // Inyectar el CTA amarillo justo tras el primer párrafo del cuerpo.
    const cta = `<a class="oro-cta-espacio" href="#contact">${ctaEspacio[lang] || ctaEspacio.es}</a>`;
    const pEnd = html.indexOf('</p>');
    html = pEnd >= 0 ? html.slice(0, pEnd + 4) + cta + html.slice(pEnd + 4) : html;
    const parts = html.split(/(?=<h2>)/);
    let prefix = '';
    let sections = parts;
    if (!/^\s*<h2>/.test(parts[0])) { prefix = parts[0]; sections = parts.slice(1); }
    const n = sections.length;
    if (n < 5) return html; // cuerpo breve: solo el CTA, sin reestructura
    let iComo = -1, iTipos = -1, iFerias = -1, iPat = -1, iPorQue = -1;
    sections.forEach((s, i) => {
      if (iComo < 0 && /<ol[ >]/.test(s)) iComo = i;
      if (iTipos < 0 && /<ul[ >]/.test(s)) iTipos = i;
      if (iFerias < 0 && /\/(ferias|展示会情報)\//.test(s) && /\/actividad\//.test(s)) iFerias = i;
      if (iPat < 0 && /#pat/.test(s)) iPat = i;
      if (/#prototipos-3d/.test(s)) iPorQue = i; // el último con el enlace a los prototipos
    });
    const iDoc = iFerias > 0 ? iFerias - 1 : -1;
    const iGar = iPorQue > 1 ? iPorQue - 2 : -1;
    const iLog = iPorQue > 0 ? iPorQue - 1 : -1;
    // Merge de Garantía/Logística y borrado de Pat solo si la maquetación estándar
    // encaja (Garantía justo tras Pat, Logística tras Garantía). Si no, se degrada:
    // solo reordena "Ferias" y colapsa "Cómo trabajamos"/"Tipos"/"Documentación".
    const canMerge = iPat >= 0 && iGar === iPat + 1 && iLog === iPat + 2 && iDoc >= 0 && iDoc !== iComo && iDoc !== iTipos;
    // "La mayor cobertura" va justo tras "Ferias y sectores"; se integra como 2.º
    // párrafo de "Por qué elegir" (tras el de Garantía).
    const iCob = iFerias > 0 ? iFerias + 1 : -1;
    const canCob = canMerge && iCob > 0 && iCob < n &&
      ![iComo, iTipos, iDoc, iPat, iGar, iLog, iPorQue].includes(iCob);
    const P = sections.map(heading2Parts);

    let docSection;
    if (iDoc >= 0) {
      const merged = canMerge ? `${P[iDoc].lead}<h2>${P[iDoc].heading}</h2>${P[iDoc].rest}${P[iLog].rest}` : sections[iDoc];
      docSection = collapseSection(merged);
    }
    let porqueSection = iPorQue >= 0 ? sections[iPorQue] : null;
    if (iPorQue >= 0) {
      const base = dropLastParagraph(P[iPorQue].rest); // fuera el CTA "Pide tu presupuesto…"
      const prepend = canMerge ? `${P[iGar].rest}${canCob ? P[iCob].rest : ''}` : '';
      porqueSection = `${P[iPorQue].lead}<h2>${P[iPorQue].heading}</h2>${prepend}${base}`;
    }

    const skip = new Set();
    if (iPat >= 0) skip.add(iPat);
    if (canMerge) { skip.add(iGar); skip.add(iLog); }
    if (canCob) skip.add(iCob);
    const render = (i) => {
      if (i === iDoc && docSection !== undefined) return docSection;
      if (i === iPorQue && porqueSection !== null) return collapseSection(porqueSection);
      if (i === iComo) return collapseSection(rewriteComoHeading(sections[i], lang));
      if (i === iTipos) return collapseSection(sections[i]);
      return sections[i];
    };
    const out = [render(0)];
    if (iFerias > 0 && !skip.has(iFerias)) out.push(render(iFerias)); // "Ferias y sectores" → 2.º
    for (let i = 1; i < n; i++) { if (i === iFerias || skip.has(i)) continue; out.push(render(i)); }
    return prefix + out.join('');
  }
  const FAIRS_COLLAPSE_THRESHOLD = 0;
  const fairsCloudOpenCta = {
    es: (n) => `Ver las ${n} ferias`,
    en: (n) => `See all ${n} fairs`,
    de: (n) => `Alle ${n} Messen ansehen`,
    fr: (n) => `Voir les ${n} salons`,
    pt: (n) => `Ver as ${n} feiras`,
    it: (n) => `Vedi le ${n} fiere`,
    ko: (n) => `${n}개 전시회 모두 보기`,
    zh: (n) => `查看全部 ${n} 场展会`,
    hi: (n) => `सभी ${n} मेले देखें`,
    ja: (n) => `${n}件の展示会をすべて見る`,
    nl: (n) => `Bekijk alle ${n} beurzen`
  };
  const fairsCloudCloseCta = {
    es: 'Ocultar', en: 'Hide', de: 'Ausblenden', fr: 'Masquer', pt: 'Ocultar',
    it: 'Nascondi', ko: '접기', zh: '收起', hi: 'छिपाएँ', ja: '閉じる', nl: 'Verbergen'
  };
  // Mismo patrón para el navegador de actividades (chips de color) del sidebar.
  const ACTIVITIES_COLLAPSE_THRESHOLD = 0;
  const activitiesCloudOpenCta = {
    es: (n) => `Ver ${n} actividades`,
    en: (n) => `See ${n} activities`,
    de: (n) => `${n} Aktivitäten ansehen`,
    fr: (n) => `Voir ${n} activités`,
    pt: (n) => `Ver ${n} atividades`,
    it: (n) => `Vedi ${n} attività`,
    ko: (n) => `${n}개 분야 보기`,
    zh: (n) => `查看 ${n} 个领域`,
    hi: (n) => `${n} गतिविधियाँ देखें`,
    ja: (n) => `${n}件の分野を見る`,
    nl: (n) => `Bekijk ${n} activiteiten`
  };
  // B1: prueba de cobertura por ciudad (recuento real de ferias + garantía + Pat).
  const coverageProof = {
    es: () => `Integra este evento en una campaña mucho más amplia y consigue ahorro por sinergias.`,
    en: () => `Integrate this event into a much broader campaign and save through synergies.`,
    pt: () => `Integre este evento numa campanha muito mais ampla e obtenha poupança por sinergias.`,
    de: () => `Binden Sie diese Veranstaltung in eine viel umfassendere Kampagne ein und sparen Sie durch Synergien.`,
    fr: () => `Intégrez cet événement dans une campagne bien plus large et réalisez des économies grâce aux synergies.`,
    it: () => `Integra questo evento in una campagna molto più ampia e risparmia grazie alle sinergie.`,
    nl: () => `Integreer dit evenement in een veel bredere campagne en bespaar dankzij synergie.`,
    zh: () => `将此活动纳入更广泛的营销活动，通过协同效应实现成本节约。`,
    hi: () => `इस आयोजन को एक बहुत व्यापक अभियान में शामिल करें और तालमेल से बचत प्राप्त करें।`,
    ko: () => `이 행사를 훨씬 폭넓은 캠페인에 통합하여 시너지로 비용을 절감하세요.`,
    ja: () => `このイベントをより広範なキャンペーンに組み込み、シナジーによるコスト削減を実現しましょう。`
  };
  const coveragePatCta = { es: 'Habla con Pat', en: 'Talk to Pat', pt: 'Fale com o Pat', de: 'Mit Pat sprechen', fr: 'Parler avec Pat', it: 'Parlare con Pat', nl: 'Met Pat praten', zh: '与 Pat 交谈', hi: 'Pat से बात करें', ko: 'Pat와 대화하기', ja: 'Patと話す' };
  $: cityDisplayName = (section && cityData[section]) ? (cityData[section].city?.[lang] || cityData[section].city?.es || '') : '';
  // Nombre canónico (ES) de la ciudad de la página: coincide con el campo `city`
  // de fairsData, que es como PatMesh identifica sus nodos. Con esto el mapa de Pat
  // arranca mostrando el :hover de esta ciudad en las páginas de ciudad.
  $: patInitialCity = (section && cityData[section]) ? (cityData[section].city?.es || '') : '';
  // Navegación entre ciudades matrices (módulo del sidebar, igual que en Feria).
  // Solo matrices (construccion_stands_*); excluye las landings de montaje secundarias.
  const CITY_NAV_KEYS = Object.keys(cityData).filter((k) => !k.startsWith('montaje_'));
  function cityNavLabel(ck, l) {
    return cityData[ck]?.city?.[l] || cityData[ck]?.city?.es;
  }
  $: sortedCityNavKeys = [...CITY_NAV_KEYS].sort((a, b) => cityNavLabel(a, lang).localeCompare(cityNavLabel(b, lang), lang));
  const ACTIVITY_NAV_LABELS = {
    es: 'Por actividad', en: 'By activity', de: 'Nach Branche', fr: 'Par activité', it: 'Per attività',
    pt: 'Por atividade', nl: 'Per branche', zh: '按行业', hi: 'गतिविधि अनुसार', ko: '분야별', ja: '分野別'
  };
  const ALL_ACTIVITIES_LABELS = {
    es: 'Ver todas las actividades', en: 'See all activities', de: 'Alle Branchen ansehen',
    fr: 'Voir toutes les activités', it: 'Vedi tutte le attività', pt: 'Ver todas as atividades',
    nl: 'Alle activiteiten bekijken', zh: '查看所有行业', hi: 'सभी गतिविधियाँ देखें',
    ko: '모든 분야 보기', ja: 'すべての分野を見る'
  };
  const CITY_NAV_LABELS = {
    es: 'Ciudades', en: 'Cities', de: 'Städte',
    fr: 'Villes', it: 'Città', pt: 'Cidades',
    zh: '城市', hi: 'शहर', ko: '도시', ja: '都市', nl: 'Steden'
  };
  // Las FAQs se muestran en una rejilla de dos columnas: deben ser siempre pares.
  // Si la página trae un número impar, añadimos esta pregunta genérica (válida para
  // cualquier ciudad) para cuadrar la rejilla.
  const FILLER_FAQ = {
    es: { q: '¿Trabajáis solo en esta ciudad o en toda España y Portugal?', a: 'Diseñamos y montamos stands en toda España y Portugal. Al contar con taller propio y equipo de montaje, nos desplazamos a cualquier recinto ferial con la misma garantía de calidad y plazos.' },
    en: { q: 'Do you work only in this city or across Spain and Portugal?', a: 'We design, build and install stands throughout Spain and Portugal. With our own workshop and assembly team, we travel to any exhibition venue with the same guarantee of quality and deadlines.' },
    de: { q: 'Arbeiten Sie nur in dieser Stadt oder in ganz Spanien und Portugal?', a: 'Wir entwerfen, fertigen und montieren Messestände in ganz Spanien und Portugal. Mit eigener Werkstatt und Montageteam reisen wir zu jedem Messegelände – mit derselben Qualitäts- und Termingarantie.' },
    fr: { q: 'Travaillez-vous uniquement dans cette ville ou dans toute l\'Espagne et le Portugal ?', a: 'Nous concevons, fabriquons et montons des stands dans toute l\'Espagne et le Portugal. Avec notre propre atelier et notre équipe de montage, nous nous déplaçons dans n\'importe quel parc des expositions avec la même garantie de qualité et de délais.' },
    it: { q: 'Lavorate solo in questa città o in tutta la Spagna e il Portogallo?', a: 'Progettiamo, costruiamo e allestiamo stand in tutta la Spagna e il Portogallo. Avendo officina propria e squadra di montaggio, ci spostiamo in qualsiasi quartiere fieristico con la stessa garanzia di qualità e tempi.' },
    pt: { q: 'Trabalham apenas nesta cidade ou em toda a Espanha e Portugal?', a: 'Concebemos, fabricamos e montamos stands em toda a Espanha e Portugal. Com oficina própria e equipa de montagem, deslocamo-nos a qualquer recinto de feiras com a mesma garantia de qualidade e prazos.' },
    zh: { q: '你们只在这座城市还是在整个西班牙和葡萄牙开展业务？', a: '我们在整个西班牙和葡萄牙设计、制造和搭建展台。我们拥有自己的工厂和搭建团队，能够前往任何展览场馆，并提供同样的质量和工期保证。' },
    hi: { q: 'क्या आप केवल इसी शहर में काम करते हैं या पूरे स्पेन और पुर्तगाल में?', a: 'हम पूरे स्पेन और पुर्तगाल में स्टैंड डिज़ाइन, निर्माण और स्थापित करते हैं। अपनी कार्यशाला और असेंबली टीम के साथ, हम उसी गुणवत्ता और समयसीमा की गारंटी के साथ किसी भी प्रदर्शनी स्थल तक पहुँचते हैं।' },
    ko: { q: '이 도시에서만 작업하시나요, 아니면 스페인과 포르투갈 전역에서 작업하시나요?', a: '저희는 스페인과 포르투갈 전역에서 부스를 디자인·제작·설치합니다. 자체 작업장과 설치 팀을 보유하고 있어 동일한 품질과 납기 보장으로 어떤 전시장이든 방문합니다.' },
    ja: { q: 'この都市だけで対応していますか、それともスペインとポルトガル全土ですか？', a: '当社はスペインとポルトガル全土でブースの設計・製造・施工を行っています。自社工房と施工チームを擁し、同じ品質と納期の保証のもと、どの展示会場へも出向きます。' },
    nl: { q: 'Werken jullie alleen in deze stad of in heel Spanje en Portugal?', a: 'Wij ontwerpen, produceren en bouwen stands in heel Spanje en Portugal. Met een eigen werkplaats en montageteam reizen we naar elk beurscomplex met dezelfde garantie op kwaliteit en deadlines.' }
  };
  $: faqsEven = (() => {
    const list = seoContent?.faqs ? [...seoContent.faqs] : [];
    if (list.length % 2 === 1) list.push(FILLER_FAQ[lang] || FILLER_FAQ.es);
    return list;
  })();
  $: regionFairs = SECTION_REGION[section]
    ? fairItems.filter((f) => FAIR_CITY_REGION[f.city] === SECTION_REGION[section])
    : [];
  $: fairHrefSite = (slug) => fairUrl(slug, lang);
  // Actividades presentes entre las ferias de esta región (chips de color del aside,
  // en orden de aparición y sin repetir): conecta el pilar de ciudad con los hubs.
  $: regionActivities = (() => {
    const seen = [];
    for (const f of regionFairs) {
      for (const tag of activitiesForFair(f.slug)) if (!seen.includes(tag)) seen.push(tag);
    }
    return seen;
  })();

  $: title = seoContent?.title || (section in cityData
    ? `${cityTitle(section)} | Standarte`
    : section === 'home'
      ? copy.seoTitle
      : `${sectionLabel(section)} | Standarte`);

  // El <meta description> exige ≤160 caracteres, pero seoContent.introText es el párrafo
  // de cabecera pensado para lectura completa (visible en el hero y para motores de IA/GEO
  // que resumen la página) — no se acorta ahí. Por eso el meta usa una versión truncada
  // en frase/palabra completa, independiente del texto visible.
  function metaDescriptionFrom(text, max = 157) {
    if (!text || text.length <= max) return text;
    const sentenceEnd = text.slice(0, max + 1).lastIndexOf('. ');
    if (sentenceEnd > max * 0.5) return text.slice(0, sentenceEnd + 1);
    const wordBoundary = text.slice(0, max).lastIndexOf(' ');
    return text.slice(0, wordBoundary > 0 ? wordBoundary : max).trimEnd() + '…';
  }

  $: description = seoContent
    ? metaDescriptionFrom(seoContent.introText)
    : (section in cityData
      ? `${cityTitle(section)}. ${copy.citiesIntro}`
      : copy.seoDescription);

  $: structuredData = JSON.stringify(buildStructuredData());
  $: structuredDataScript = `<script type="application/ld+json">${structuredData.replace(/</g, '\\u003c')}<` + '/script>';

  function sectionLabel(id) {
    if (id === 'services') return copy.nav.services;
    if (id === 'custom') return copy.nav.custom;
    if (id === 'contact') return copy.nav.contact;
    if (id === 'team') return copy.teamTitle;
    return 'Standarte';
  }

  const COVER_OVERRIDE = { murcia: 'murcia-v2', alicante: 'alicante-v2', islas_canarias: 'islas_canarias-v2', islas_de_madeira: 'islas_de_madeira-v2' };
  function coverBase(id) {
    return COVER_OVERRIDE[id] || id;
  }

  function cityTitle(id) {
    const city = cityData[id]?.city?.[lang] || cityData[id]?.city?.es || '';
    if (lang === 'de') return `Messestand Design und Montage in ${city}`;
    if (lang === 'en') return `Stand design and assembly in ${city}`;
    if (lang === 'pt') return `Design e montagem de stands em ${city}`;
    if (lang === 'fr') return `Conception et montage de stands à ${city}`;
    if (lang === 'it') return `Progettazione e montaggio stand a ${city}`;
    if (lang === 'zh') return `${city} 展台设计与搭建`;
    if (lang === 'hi') return `${city} में स्टैंड डिज़ाइन और असेंबली`;
    if (lang === 'ko') return `${city} 전시 부스 디자인 및 조립`;
    if (lang === 'ja') return `${city}での展示会ブース設計・組立`;
    return `Diseño y montaje de stands en ${city}`;
  }

  function cityContent(id) {
    const city = cityData[id];
    const byLang = city?.content?.[lang] || city?.content?.es || {};
    return byLang;
  }

  // Municipio de la feria -> cityKey del pilar (incluye satélites: Torre Pacheco->murcia,
  // Aguadulce/El Ejido->almeria, etc.). Copia de CITY_TO_PILLAR en Feria.svelte, para poder
  // listar "Standarte construye en: <ferias>" en la tarjeta de cada ciudad de la home.
  const FAIR_CITY_PILLAR = {
    'Madrid': 'madrid', 'Barcelona': 'barcelona', 'Bilbao': 'bilbao', 'Lisboa': 'lisboa', 'Oporto': 'oporto', 'Valencia': 'valencia', 'Mallorca': 'mallorca', 'Vigo': 'vigo', 'Santiago de Compostela': 'santiago', 'A Coruña': 'coruna', 'Valladolid': 'valladolid', 'Salamanca': 'salamanca', 'Batalha': 'batalha',
    'Málaga': 'malaga', 'Badajoz': 'badajoz', 'Sevilla': 'sevilla', 'Ciudad Real': 'ciudad_real', 'Zaragoza': 'zaragoza',
    'Don Benito': 'montaje_don_benito', 'Zafra': 'montaje_zafra',
    'Almendralejo': 'badajoz', 'Plasencia': 'badajoz', 'Mérida': 'badajoz', 'Portugal Sur': 'portugal_sur',
    'Aguadulce': 'almeria', 'El Ejido': 'almeria', 'Almería': 'almeria', 'Jaén': 'jaen',
    'Huelva': 'huelva', 'Aracena': 'huelva', 'Punta Umbría': 'huelva',
    'Murcia': 'murcia', 'Torre Pacheco': 'murcia',
    'Islas Canarias': 'islas_canarias', 'Fuerteventura': 'islas_canarias', 'Tenerife': 'islas_canarias', 'Gran Canaria': 'islas_canarias', 'Las Palmas': 'islas_canarias',
    'Islas de Madeira': 'islas_de_madeira', 'Funchal': 'islas_de_madeira', 'Madeira': 'islas_de_madeira',
    'Córdoba': 'cordoba', 'Pozoblanco': 'cordoba', 'Villanueva de Córdoba': 'cordoba',
    'Granada': 'granada', 'Armilla': 'granada',
    'Cádiz': 'cadiz', 'Jerez de la Frontera': 'cadiz',
    'Manzanares': 'ciudad_real', 'Porzuna': 'ciudad_real',
    'Santarém': 'santarem', 'Trujillo': 'trujillo', 'Elche': 'elche',
    'Silleda': 'silleda', 'Ourense': 'ourense',
    'Lleida': 'lleida', 'Girona': 'girona', 'Irún': 'irun',
    'Logroño': 'logrono', 'Alfaro': 'logrono', 'Calahorra': 'logrono',
    'Pamplona': 'pamplona',
    'Vitoria': 'vitoria',
    'Aranda de Duero': 'aranda',
    'Peso da Régua': 'regua',
    'Ibiza': 'ibiza',
    'Menorca': 'menorca',
    'Santander': 'santander', 'Torrelavega': 'santander', 'Gijón': 'gijon', 'Tineo': 'gijon', 'Vegadeo': 'gijon'
  };
  function fairsForCity(cityKey) {
    const esName = cityData[cityKey]?.city?.es;
    return fairItems.filter((f) => f.city === esName || FAIR_CITY_PILLAR[f.city] === cityKey);
  }
  const CITY_CARD_FAIRS_MAX = 4;
  const buildsAtLabel = {
    es: 'Standarte construye en:', en: 'Standarte builds at:', de: 'Standarte baut auf:',
    pt: 'A Standarte constrói em:', fr: 'Standarte construit à :', it: 'Standarte costruisce a:',
    nl: 'Standarte bouwt bij:', zh: 'Standarte 承建于：', hi: 'Standarte यहाँ निर्माण करता है:',
    ko: 'Standarte 시공 현장:', ja: 'Standarteが施工:'
  };
  const buildsAtMore = {
    es: (n) => `+${n} más`, en: (n) => `+${n} more`, de: (n) => `+${n} weitere`,
    pt: (n) => `+${n} mais`, fr: (n) => `+${n} de plus`, it: (n) => `+${n} altre`,
    nl: (n) => `+${n} meer`, zh: (n) => `+${n} 更多`, hi: (n) => `+${n} और`,
    ko: (n) => `+${n}개 더`, ja: (n) => `他+${n}件`
  };


  function getProjectTitle(project) {
    if (project?.title) {
      return project.title[lang] || project.title.es || project.name;
    }
    return project?.alt || project?.name || '';
  }

  // Título SIN la localización final, solo para las miniaturas del carrusel 3D. Recorta el
  // conector + topónimo del final ("… en Madrid", "… in Bilbao", "… à Paris", "… a Milano",
  // "… em Lisboa"). Otros usos (galería, lightbox, SEO) conservan la localización.
  function carouselTitle(project) {
    return getProjectTitle(project)
      .replace(/\s+(en|in|à|a|em)\s+\p{Lu}[\p{L}.\-]*(\s+\p{Lu}[\p{L}.\-]*)*$/u, '')
      .trim();
  }

  function projectDescription(project) {
    return project?.description?.[lang] || project?.description?.es || '';
  }

  function buildStructuredData() {
    const baseUrl = 'https://standarte.es';
    const navigationItems = [
      ['Servicios', pathFor('es', 'services')],
      ['Galería', pathFor('es', 'custom')],
      ['Equipo', pathFor('es', 'team')],
      ['Contacto', pathFor('es', 'contact')],
      ['Diseño y montaje de stands en Madrid', pathFor('es', 'madrid')],
      ['Diseño y montaje de stands en Barcelona', pathFor('es', 'barcelona')],
      ['Diseño y montaje de stands en Bilbao', pathFor('es', 'bilbao')],
      ['Diseño y montaje de stands en Lisboa', pathFor('es', 'lisboa')],
      ['Diseño y montaje de stands en Málaga', pathFor('es', 'malaga')],
      ['Diseño y montaje de stands en Badajoz', pathFor('es', 'badajoz')],
      ['Montaje de stands en Zafra', pathFor('es', 'montaje_zafra')],
      ['Montaje de stands en Don Benito', pathFor('es', 'montaje_don_benito')],
      ['Montaje de stands en Badajoz', pathFor('es', 'montaje_badajoz')]
    ];

    const isCityPage = section in cityData;
    const cityDisplayName = isCityPage ? (cityData[section]?.city?.[lang] || cityData[section]?.city?.es || section) : '';

    const organization = {
      ...localBusinessSchema,
      '@id': `${baseUrl}/#organization`,
      url: `${baseUrl}/`,
      logo: `${baseUrl}/img/logo_standarte_rectanular.png`,
      image: `${baseUrl}/img/trabajos/TCANTICO/1.avif`,
      priceRange: '$$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '158'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      // Cobertura para las máquinas: nivel país (España y Portugal) + las ciudades
      // servidas, para dejar claro el alcance ibérico —capitales y nichos regionales—.
      areaServed: [
        { '@type': 'Country', name: 'España' },
        { '@type': 'Country', name: 'Portugal' },
        ...localBusinessSchema.areaServed.map(c => ({ '@type': 'City', name: c.name }))
      ],
      slogan: lang === 'es'
        ? 'La mayor cobertura para exponer en España y Portugal: de las capitales y grandes plazas a los nichos regionales estratégicos con menos competencia.'
        : 'The widest coverage for exhibiting in Spain and Portugal: from capitals and major venues to strategic regional niches with less competition.',
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@id': `${baseUrl}/#advisory` } },
        { '@type': 'Offer', itemOffered: { '@id': `${baseUrl}/#guarantee` } },
        { '@type': 'Offer', itemOffered: { '@id': `${baseUrl}/#instant-quote` } }
      ]
    };

    // Rango real del tramo premium (de pricingTiers): desde su cifra hasta la del
    // siguiente tramo. Se usa en el AggregateOffer del cálculo instantáneo.
    const premiumIdx = pricingTiers.findIndex((t) => t.key === 'premium');
    const premiumFrom = pricingTiers[premiumIdx]?.priceFrom;
    const premiumTo = pricingTiers[premiumIdx + 1]?.priceFrom;

    const service = {
      '@type': 'Service',
      '@id': `${baseUrl}/#service`,
      name: lang === 'es' ? 'Diseño y montaje de stands para ferias' : 'Exhibition stand design and assembly',
      serviceType: isCityPage ? 'Diseño y montaje de stands' : 'Exhibition Stand Builder',
      provider: { '@id': `${baseUrl}/#organization` },
      description: copy.seoDescription,
      areaServed: isCityPage ? cityDisplayName : ['ES', 'PT', 'DE', 'FR']
    };

    // Herramientas propias de Standarte, nombradas para buscadores y motores de IA:
    // el asesor Pat (servicio de asesoramiento) y el Proyecto Auditado (garantía 100%).
    // El panel de Pat se carga por JS (no lo ve un rastreador), así que aquí queda su
    // identificador estructurado y su descripción.
    const advisoryService = {
      '@type': 'Service',
      '@id': `${baseUrl}/#advisory`,
      name: lang === 'es' ? 'Pat — asesoramiento ferial gratuito' : 'Pat — free trade fair advisory',
      serviceType: lang === 'es' ? 'Asesoramiento ferial' : 'Trade fair consulting',
      provider: { '@id': `${baseUrl}/#organization` },
      description: lang === 'es'
        ? 'Pat, el asesor interactivo de Standarte, recomienda las ferias y congresos clave para tu sector en España y Portugal y prepara tu solicitud de stand. Servicio de asesoramiento gratuito y exclusivo.'
        : 'Pat, Standarte’s interactive advisor, recommends the key trade fairs and congresses for your sector in Spain and Portugal and prepares your stand request. Free, exclusive advisory service.',
      areaServed: ['ES', 'PT'],
      url: `${baseUrl}/`
    };
    const guaranteeService = {
      '@type': 'Service',
      '@id': `${baseUrl}/#guarantee`,
      name: lang === 'es' ? 'Proyecto Auditado — garantía 100%' : 'Audited Project — 100% guarantee',
      serviceType: lang === 'es' ? 'Garantía de proyecto auditado' : 'Audited project guarantee',
      provider: { '@id': `${baseUrl}/#organization` },
      description: lang === 'es'
        ? 'Sistema propio de Standarte que registra cada proyecto en un expediente verificable y archivable (prototipo 3D, presupuesto y aprobaciones) y garantiza que se construye exactamente lo que el cliente aprueba.'
        : 'Standarte’s proprietary system that records every project in a verifiable, archivable file (3D prototype, quote and approvals), guaranteeing that what is built is exactly what the client approved.',
      areaServed: ['ES', 'PT'],
      url: `${baseUrl}${pathFor(lang, 'proyecto_auditado')}`
    };
    // Servicio de cálculo instantáneo: previsión de precio de un stand PREMIUM a partir
    // de los metros cuadrados del espacio. Deja claro a buscadores y motores de IA que
    // existe la herramienta, sobre qué categoría opera y con qué dato de entrada (m²).
    const instantQuoteService = {
      '@type': 'Service',
      '@id': `${baseUrl}/#instant-quote`,
      name: lang === 'es' ? 'Cálculo instantáneo de stand premium' : 'Instant premium stand estimate',
      serviceType: lang === 'es' ? 'Presupuesto instantáneo de stand' : 'Instant stand quote',
      provider: { '@id': `${baseUrl}/#organization` },
      description: lang === 'es'
        ? 'Herramienta propia de Standarte que calcula al instante una previsión de precio para un stand de categoría premium a partir de los metros cuadrados del espacio. Resultado en segundos, orientativo y sin compromiso.'
        : 'Standarte’s own tool that instantly estimates the price of a premium-category exhibition stand from the size of the space in square metres. Result in seconds, indicative and with no obligation.',
      areaServed: ['ES', 'PT'],
      url: `${baseUrl}${pathFor(lang, 'precios')}`,
      // El input del cálculo es la superficie del stand en metros cuadrados (MTK).
      serviceOutput: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        ...(premiumFrom != null ? { lowPrice: premiumFrom } : {}),
        ...(premiumTo != null ? { highPrice: premiumTo } : {}),
        offerCount: 1,
        itemOffered: {
          '@type': 'Service',
          name: lang === 'es' ? 'Stand premium' : 'Premium stand',
          description: lang === 'es'
            ? 'Stand de categoría premium presupuestado según los metros cuadrados del espacio.'
            : 'Premium-category stand quoted according to the size of the space in square metres.'
        }
      }
    };

    const website = {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: 'Standarte',
      description: 'Standarte diseña, fabrica y monta stands para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Zafra, Don Benito, Cáceres, Lisboa y otros destinos nacionales e internacionales.',
      inLanguage: contentLanguages[lang] || 'es-ES',
      publisher: { '@id': `${baseUrl}/#organization` }
    };

    // Frescura honesta: fecha de última actualización REAL del contenido (páginas Oro).
    // Solo se emite si la sección tiene una fecha registrada en seoFreshness.
    const freshness = freshnessFor(section);
    const webpage = {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: contentLanguages[lang] || 'es-ES',
      isPartOf: { '@id': `${baseUrl}/#website` },
      ...(freshness ? { dateModified: freshness } : {})
    };

    const siteNavigation = {
      '@type': 'ItemList',
      '@id': `${baseUrl}/#site-navigation`,
      name: lang === 'es' ? 'Estructura principal de Standarte' : 'Standarte Main Structure',
      itemListElement: navigationItems.map(([name, path], index) => ({
        '@type': 'SiteNavigationElement',
        position: index + 1,
        name,
        url: `${baseUrl}${path}`
      }))
    };

    const graph = [organization, service, advisoryService, guaranteeService, instantQuoteService, website, webpage, siteNavigation];

    if (section !== 'home') {
      const breadcrumbLabel = seoContent?.breadcrumb || sectionLabel(section);
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'es' ? 'Inicio' : 'Home',
            item: `${baseUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbLabel,
            item: canonical
          }
        ]
      });
    }

    if (seoContent?.faqs && seoContent.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faqpage`,
        mainEntity: seoContent.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      });
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graph
    };
  }

  function fairSeoText(fairName) {
    if (lang === 'en') return `Stand design and assembly at ${fairName}`;
    if (lang === 'de') return `Messestand Design und Montage auf der ${fairName}`;
    if (lang === 'zh') return `${fairName} 展台设计与搭建服务`;
    if (lang === 'hi') return `${fairName} में स्टैंड डिज़ाइन और असेंबली`;
    if (lang === 'pt') return `Design e montagem de stands na ${fairName}`;
    if (lang === 'fr') return `Conception et montage de stands à ${fairName}`;
    if (lang === 'it') return `Progettazione e montaggio stand a ${fairName}`;
    return `Diseño y montaje de stand en ${fairName}`;
  }

  // Sufijo de ciudad para el nombre en negrita de la marquesina de ferias
  // ("Intercaza (Córdoba)"). Se omite en ferias sin ciudad concreta (itinerantes o
  // regionales) y cuando el nombre de la feria ya contiene la ciudad, para no duplicar.
  const NON_SPECIFIC_FAIR_CITIES = new Set(['Itinerante', 'Europa', 'España', 'Portugal', 'Portugal Sur', 'Islas Canarias', 'Islas de Madeira']);
  function localizedFairCity(esCity) {
    const key = Object.keys(cityData).find((k) => cityData[k]?.city?.es === esCity);
    return (key && (cityData[key].city[lang] || cityData[key].city.es)) || esCity;
  }
  function fairCitySuffix(fair) {
    const city = fair && fair.city;
    if (!city || NON_SPECIFIC_FAIR_CITIES.has(city)) return '';
    const loc = localizedFairCity(city);
    const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const nn = norm(fair.name);
    // Omite el sufijo si el nombre ya contiene la ciudad (completa o su primera
    // palabra significativa, p. ej. "Feria del Caballo de Jerez" → no "(Jerez de la Frontera)").
    const cityFirstWord = norm(loc).split(/[\s,]+/)[0];
    if (nn.includes(norm(city)) || nn.includes(norm(loc)) || (cityFirstWord.length >= 4 && nn.includes(cityFirstWord))) return '';
    return ` (${loc})`;
  }

  function openLightbox(project) {
    lightboxProject = project;
  }

  function closeLightbox() {
    lightboxProject = null;
  }

  // Navegación entre proyectos dentro del lightbox (flechas/teclado), sin cerrar la ventana.
  function navLightbox(dir) {
    if (!lightboxProject) return;
    const list = filteredPortfolios;
    const i = list.indexOf(lightboxProject);
    if (i === -1) return;
    lightboxProject = list[(i + dir + list.length) % list.length];
  }

  function openVideoLightbox(src) {
    videoLightboxSrc = src;
  }

  function closeVideoLightbox() {
    videoLightboxSrc = null;
  }

  // Navegación entre vídeos de la galería dentro del lightbox, sin cerrar la ventana.
  function navVideo(dir) {
    if (!videoLightboxSrc) return;
    const list = galleryVideos;
    const i = list.findIndex((v) => v.src === videoLightboxSrc);
    if (i === -1) return;
    videoLightboxSrc = list[(i + dir + list.length) % list.length].src;
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (videoLightboxSrc) {
        closeVideoLightbox();
        return;
      }

      if (lightboxProject) {
        closeLightbox();
        return;
      }

      return;
    }

    // Flechas izquierda/derecha: navegar entre vídeos o proyectos según el lightbox abierto.
    if (videoLightboxSrc) {
      if (event.key === 'ArrowLeft') navVideo(-1);
      else if (event.key === 'ArrowRight') navVideo(1);
    } else if (lightboxProject) {
      if (event.key === 'ArrowLeft') navLightbox(-1);
      else if (event.key === 'ArrowRight') navLightbox(1);
    }
  }

  function updateScrollState() {
    isScrolled = window.scrollY > 8;
  }

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayedCounters = counterItems.map((item) => Math.round(item.value * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function scrollTo(id) {
    menuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      let routeSection = id === 'local-stands' ? 'madrid' : id;
      if (routeSection === 'micro-stand') routeSection = 'luzpavilion';
      ignoreNextScroll = true; // Avoid double scrolling from the reactive statement
      pushState(pathFor(lang, routeSection), {});
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll al formulario #contact de la propia página. En páginas muy largas la carga
  // diferida de imágenes desplaza el layout durante el scroll, así que reajustamos cada
  // 250 ms hasta que la posición se estabiliza — parando si el usuario hace scroll manual
  // (para no "pelear" con él) o a los 3 s como tope.
  function scrollToContact() {
    const get = () => document.getElementById('contact');
    if (!get()) return;
    // 'instant' (no 'auto'): 'auto' heredaría el scroll-behavior:smooth global del CSS y
    // animaría, y sobre páginas largas esa animación se queda corta por el reflow.
    const align = () => get()?.scrollIntoView({ behavior: 'instant', block: 'start' });
    align();
    // En páginas largas, la carga diferida de imágenes alarga la página y desplaza el
    // formulario hacia abajo: re-alineamos cada vez que una imagen termina de cargar
    // (la causa real del desplazamiento). Los 'load' de <img> no burbujean -> captura.
    // Paramos en cuanto el usuario toma el control (wheel/táctil/teclado) o a los 4 s.
    const events = ['wheel', 'touchstart', 'keydown'];
    let done = false;
    const onLoad = (e) => { if (!done && e.target && e.target.tagName === 'IMG') align(); };
    const finish = () => {
      if (done) return;
      done = true;
      document.removeEventListener('load', onLoad, true);
      events.forEach((ev) => window.removeEventListener(ev, finish));
    };
    document.addEventListener('load', onLoad, true);
    events.forEach((ev) => window.addEventListener(ev, finish, { passive: true }));
    setTimeout(finish, 4000);
  }

  function handleNavClick(event, id) {
    if (section === 'home') {
      event.preventDefault();
      scrollTo(id);
    } else if (id === 'contact' && typeof document !== 'undefined' && document.getElementById('contact')) {
      // El formulario está en la propia página (ciudades y sus hermanas, etc.): hacemos
      // scroll al #contact local en vez de navegar a /contacto, y sin alterar la URL.
      // Reintentamos tras un instante por si la carga diferida de imágenes (páginas
      // muy largas) desplaza el layout y el primer scroll se queda corto.
      event.preventDefault();
      menuOpen = false;
      scrollToContact();
    }
  }

  // Reactivar Pat desde el botón "Expansión" (junto a los botones GEO): limpia el
  // descarte de la sesión y vuelve a mostrar el panel (cargándolo si aún no estaba).
  function reopenAdvisor() {
    advisorDismissed.reactivate();
    if (AdvisorComponent) {
      showWelcomeAdvisor = true;
    } else {
      import('./WelcomeAdvisor.svelte')
        .then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; })
        .catch(() => {});
    }
  }

  // Clic delegado dentro del cuerpo SEO (`{@html}`): los enlaces del contenido son HTML
  // estático y no pueden invocar funciones Svelte, así que interceptamos aquí los enlaces
  // internos a Pat (`href="#pat"`). Pat vive en la propia página (parte superior), de modo
  // que en vez de navegar, lo abrimos y desplazamos hasta él.
  function handleSeoBodyClick(e) {
    const link = e.target.closest && e.target.closest('a[href="#pat"]');
    if (!link) return;
    e.preventDefault();
    openPatAndScroll();
  }

  // "Hablar con Pat" (sección de herramientas): el panel de Pat se renderiza arriba
  // del <main>, así que además de cargarlo/mostrarlo, desplazamos la página hasta él
  // para que el visitante lo vea desplegarse.
  async function openPatAndScroll() {
    advisorDismissed.reactivate();
    if (!AdvisorComponent) {
      try { const m = await import('./WelcomeAdvisor.svelte'); AdvisorComponent = m.default; } catch (e) {}
    }
    showWelcomeAdvisor = true;
    await tick();
    requestAnimationFrame(() => {
      const el = document.querySelector('.welcome-advisor-container') || document.querySelector('.welcome-advisor-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onMount(() => {
    displayedCounters = counterItems.map(() => 0);

    // CTA contextual de Pat desde las páginas de feria: llegan con "#pat=<familia>".
    // Abrimos a Pat de inmediato, ya sembrado con ese sector (sin esperar los 8 s).
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pat')) {
      patInitialFamily = new URLSearchParams(window.location.search).get('pat') || '';
      advisorDismissed.reactivate();
      import('./WelcomeAdvisor.svelte')
        .then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; })
        .catch(() => {});
    }

    // El asesor se abre de forma AUTÓNOMA (tras un retardo) SOLO en la portada.
    // En el resto de páginas (ciudades y hermanas) Pat se activa con un disparador
    // (botón "Expansión" del hero, "Hablar con Pat", enlaces #pat…). Su código se
    // trae con import dinámico (chunk aparte) para no comprometer la carga principal.
    const launchAdvisor = () => {
      advisorTimeout = setTimeout(() => {
        // Si el visitante ya completó el formulario del asesor en esta sesión,
        // no lo volvemos a mostrar para no molestar.
        if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('standarte_advisor_dismissed') === '1') return;
        import('./WelcomeAdvisor.svelte')
          .then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; })
          .catch(() => {});
      }, 8000); // antes 2000 ms; +6 s para que Pat aparezca más tarde
    };
    if (section === 'home') {
      if (document.readyState === 'complete') {
        launchAdvisor();
      } else {
        advisorLoadHandler = launchAdvisor;
        window.addEventListener('load', advisorLoadHandler, { once: true });
      }
    }

    if (initialLightboxSlug) {
      const p = portfolios.find(x => x.slugs && Object.values(x.slugs).includes(initialLightboxSlug));
      if (p) openLightbox(p);
    }

    if (section === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

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
        // ANTES había además una auto-detección del idioma del navegador que redirigía
        // (window.location) a esa versión. ELIMINADA: Googlebot ejecuta ese JS, de modo
        // que la versión ES (canónica / x-default) de cada página quedaba marcada como
        // "Página con redirección" en Search Console e impedía su indexación. El idioma
        // correcto ya se comunica por hreflang; el cambio es siempre por acción del usuario.
        if (savedPref && savedPref !== 'es' && languages.includes(savedPref)) {
          window.location.href = pathFor(savedPref, section);
          return;
        }
      }
    }

    // Desordenar proyectos aleatoriamente en cliente para alternar visualización
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    shuffledProjects = shuffleArray(projects.filter((p) => !CAROUSEL_EXCLUDE_LOCS.includes(p.location)));

    updateScrollState();
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount, { passive: true });


    if (section && section !== 'home') {
      let targetId = section;
      if (section in cityData) {
        targetId = 'local-stands';
      } else if (section === 'luzpavilion') {
        targetId = 'micro-stand';
      }
      setTimeout(() => scrollTo(targetId), 120);
    }

    const observed = ['services', 'micro-stand', 'custom', 'team', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const routeById = {
      services: 'services',
      'micro-stand': 'luzpavilion',
      custom: 'custom',
      team: 'team',
      contact: 'contact'
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && routeById[entry.target.id])
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        if (section in cityData) return; // Do not overwrite city URL on scroll
        const nextPath = pathFor(lang, routeById[visible.target.id]);
        if (window.location.pathname !== nextPath) {
          ignoreNextScroll = true;
          replaceState(nextPath, {});
        }
      }
    }, { threshold: [0.35, 0.6] });

    observed.forEach((el) => observer.observe(el));

    const countersEl = document.querySelector('.counters');
    const countersObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounters();
        countersObserver.disconnect();
      }
    }, { threshold: 0.35 });

    if (countersEl) countersObserver.observe(countersEl);

    // El carrusel 3D se mueve con una marquesina CSS (no por JS); no hay autoplay.

    return () => {
      observer.disconnect();
      countersObserver.disconnect();
      clearTimeout(advisorTimeout);
      if (advisorLoadHandler) window.removeEventListener('load', advisorLoadHandler);
      window.removeEventListener('resize', updateVisibleCount);
    };
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta http-equiv="content-language" content={contentLanguages[lang] || 'es-ES'} />
  <link rel="canonical" href={canonical} />
  {#if (animatedHero && !isCityPage) || section === 'contact' || section === 'services'}
    <!-- Preload del fondo del hero (LCP) en home/servicios. Las ciudades usan su <img>
         de portada con fetchpriority=high (auto-descubrible), no necesitan este preload. -->
    <link
      rel="preload"
      as="image"
      href="/img/bg2-mobile.webp"
      media="(max-width: 768px)"
      fetchpriority="high"
    />
    <link
      rel="preload"
      as="image"
      href="/img/bg2.webp"
      media="(min-width: 769px)"
      fetchpriority="high"
    />
  {/if}
  {#if emitHreflang}
    {#each LOCALES as loc}
      <link rel="alternate" hreflang={loc.lang} href={`https://standarte.es${pathFor(loc.lang, section)}`} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', section)}`} />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={(LOCALES.find(loc => loc.lang === lang)?.ogLocale) || 'es_ES'} />
  {#each LOCALES.filter((loc) => loc.lang !== lang) as loc}
    <meta property="og:locale:alternate" content={loc.ogLocale} />
  {/each}
  {@html structuredDataScript}
</svelte:head>

<svelte:window on:keydown={handleKeydown} on:scroll|passive={updateScrollState} />

<header class="site-header" class:static-header={section !== 'home' && section !== 'contact' && section !== 'services' && !animatedHero} class:hero-anim={animatedHero}>
  {#if isCityPage && !section.startsWith('montaje_')}
    <!-- Páginas de ciudad: la portada de la ciudad como fondo del header (responsive). -->
    <img
      class="hero-bg-city"
      src="/img/cover_{coverBase(section)}.avif"
      srcset="/img/cover_{coverBase(section)}-mobile.avif 480w, /img/cover_{coverBase(section)}-md.avif 640w, /img/cover_{coverBase(section)}.avif 800w"
      sizes="100vw"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
    />
  {:else if animatedHero}
    <div class="hero-bg-layer hero-bg-a" aria-hidden="true"></div>
    <div class="hero-bg-layer hero-bg-b" aria-hidden="true"></div>
  {/if}
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={pathFor(option, section)}
              class:active={lang === option}
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
      <a href={pathFor(lang, 'home')} on:click={(e) => handleNavClick(e, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')} on:click={(e) => handleNavClick(e, 'services')}>{copy.nav.services}</a>
      {#if modularEnabled}
        <a href={pathFor(lang, 'stand-modular')} on:click={(e) => handleNavClick(e, 'stand-modular')}>Stand Modular</a>
      {/if}
      <a href={pathFor(lang, 'custom')} on:click={(e) => handleNavClick(e, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
      <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a
              href={pathFor(option, section)}
              class:active={lang === option}
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
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn" on:click={(e) => handleNavClick(e, 'contact')}>{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>
    </div>
  </nav>
  
  {#if ['home', 'contact', 'services', 'custom', 'luzpavilion', 'team'].includes(section)}
    <section id="home" class="hero">
      <div class="contents">
        <h1>{copy.heroTitle}</h1>
        {#if section === 'home' && copy.heroSubtitle}<p class="hero-claim">{copy.heroSubtitle}</p>{/if}
      </div>
      <AiSourceButtons {lang} variant="hero" canReactivate on:reactivate={reopenAdvisor} />
    </section>
  {:else if seoContent}
    <div class="hero-subpage" class:transparent-hero={section === 'services'} class:on-hero-photo={animatedHero}>
      <div class="hero-contents">
        {#if !isCityPage && section !== 'proyecto_auditado'}
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><a href={pathFor(lang, 'home')}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
              <li><span class="divider">/</span></li>
              <li><span class="current" aria-current="page">{seoContent.breadcrumb}</span></li>
            </ol>
          </nav>
        {/if}
        <h1>{seoContent.h1}</h1>
        <p class="hero-lead">{seoContent.introText}</p>
      </div>
      {#if animatedHero}<AiSourceButtons {lang} variant="hero" showLabel={false} canReactivate on:reactivate={reopenAdvisor} />{/if}
      {#if section === 'proyecto_auditado'}<AiSourceButtons {lang} variant="hero" canReactivate on:reactivate={reopenAdvisor} />{/if}
    </div>
  {/if}
</header>

<main class:home-warm={['home', 'contact', 'services', 'custom', 'luzpavilion', 'team'].includes(section)}>
  <!-- Ancla estática de Pat: destino del enlace "#pat" del cuerpo SEO. Debe existir
       siempre en el HTML prerenderizado (el panel de Pat se carga diferido, así que su
       propio contenedor no sirve de destino fiable). El clic al enlace lo intercepta
       handleSeoBodyClick, que abre y despliega a Pat. -->
  <span id="pat" aria-hidden="true"></span>
  <!-- Panel de Pat (asesor de Expansión): flotante, se carga diferido en onMount.
       Se renderiza en home-family Y en páginas de ciudad (su layout no importa). -->
  {#if showWelcomeAdvisor && AdvisorComponent}
    <svelte:component this={AdvisorComponent} {lang} initialFamily={patInitialFamily} initialCity={patInitialCity} on:selectFair={handleSelectFair} on:openPrivacy={() => openLegalModal('privacy')} on:dismiss={() => showWelcomeAdvisor = false} />
  {/if}
  {#if ['home', 'contact', 'services', 'custom', 'luzpavilion', 'team'].includes(section)}
    <section id="local-stands" class="section local-stands">
      {#if section === 'home'}
        <!-- Gemelo SEO de la malla de Pat: grafo de cobertura ciudad↔actividad como
             HTML rastreable (enlaza a las páginas-ciudad y a los hubs /actividad). -->
        <MeshCoverageLinks {lang} />
      {/if}
      <h2 class="section-intro">{copy.citiesIntro}</h2>
      <div class="city-grid">
        {#each cityKeys as cityKey, i}
          {@const cityFairs = fairsForCity(cityKey)}
          <article id={cityKey} class:cities-hidden={!citiesExpanded && i >= CITIES_VISIBLE && cityKey !== section}>
            <a href={pathFor(lang, cityKey)} class="city-cover-link" aria-label={cityTitle(cityKey)}>
              <div class="city-cover-container">
                <img
                  src="/img/cover_{coverBase(cityKey)}.avif"
                  srcset="/img/cover_{coverBase(cityKey)}-mobile.avif 480w, /img/cover_{coverBase(cityKey)}-md.avif 640w, /img/cover_{coverBase(cityKey)}.avif 800w"
                  sizes="(max-width: 768px) 90vw, 380px"
                  width="640"
                  height="360"
                  alt={cityTitle(cityKey)}
                  class="city-cover-image"
                  loading="lazy"
                />
              </div>
              <h3>{cityTitle(cityKey)}</h3>
              <p>{cityContent(cityKey).intro}</p>
              {#if cityFairs.length}
                <p class="city-builds-at">
                  {buildsAtLabel[lang] || buildsAtLabel.es}
                  <em>{cityFairs.slice(0, CITY_CARD_FAIRS_MAX).map((f) => f.name).join(', ')}{#if cityFairs.length > CITY_CARD_FAIRS_MAX}{' '}{(buildsAtMore[lang] || buildsAtMore.es)(cityFairs.length - CITY_CARD_FAIRS_MAX)}{/if}</em>
                </p>
              {:else}
                <p>{cityContent(cityKey).detail}</p>
              {/if}
              <span class="city-link-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </a>
          </article>
        {/each}
      </div>

      {#if !citiesExpanded && cityKeys.length > CITIES_VISIBLE}
        <div class="gallery-more-wrap">
          <button type="button" class="gallery-more-btn" on:click={() => (citiesExpanded = true)}>
            {galleryMoreLabels[lang] || galleryMoreLabels.es}
          </button>
        </div>
      {/if}

      <section class="lisbon-fairs-strip" aria-label={fairListTitles[lang] || fairListTitles.es} itemscope itemtype="https://schema.org/ItemList" bind:this={fairsViewportEl} on:mousemove={fairOnMove} on:mouseleave={fairOnLeave} on:touchstart|passive={fairTouchStart} on:touchmove|passive={fairTouchMove} on:touchend|passive={fairTouchEnd} on:touchcancel|passive={fairTouchEnd}>
        <meta itemprop="name" content={fairListTitles[lang] || fairListTitles.es} />
        <meta itemprop="itemListOrder" content="https://schema.org/ItemListOrderAscending" />
        <div class="lisbon-fairs-track" bind:this={fairsTrackEl}>
          {#each [0, 1] as group}
            <div class="lisbon-fairs-group" aria-hidden={group === 1}>
              {#each fairItems as fair, index}
                {#if group === 0}
                  <a href={fairUrl(fair.slug, lang)} class="lisbon-fair-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="text-decoration:none; color:inherit;">
                    <meta itemprop="position" content={index + 1} />
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong itemprop="name">{fair.name}{fairCitySuffix(fair)}</strong>
                      <small itemprop="description">{fairSeoText(fair.name)}</small>
                    </span>
                  </a>
                {:else}
                  <a href={fairUrl(fair.slug, lang)} class="lisbon-fair-item" tabindex="-1" aria-hidden="true" style="text-decoration:none; color:inherit;">
                    <span class={`fair-flag-icon flag-${fair.country}`} aria-hidden="true"></span>
                    <span class="lisbon-fair-copy">
                      <strong>{fair.name}{fairCitySuffix(fair)}</strong>
                      <small>{fairSeoText(fair.name)}</small>
                    </span>
                  </a>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </section>
    </section>

    <section id="services" class="section services">
      <a class="guarantee-stamp" href="https://standarte.es/proyecto-auditado" aria-label="Sistema de Proyecto Auditado">
        <img src="/img/100x100-guaranted.avif" alt="" loading="lazy" />
      </a>
      <div class="section-header">
        <h2>{copy.servicesTitle}</h2>
        <span></span>
      </div>
      <div class="service-grid">
        {#each copy.services as item, index}
          <article>
            <div class="service-icon">
              {#if index === 0}
                <!-- Diseño e Ingeniería -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="4" r="2"></circle>
                  <path d="M12 6L7 21M12 6l5 15M9.5 14h5"></path>
                  <path d="M12 17a3.5 3.5 0 0 1 0-7" stroke-dasharray="2.5 2.5"></path>
                </svg>
              {:else if index === 1}
                <!-- Construcción -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 22h20M5 22V7h14v15M12 22V7M5 12h14M5 17h14M5 7l7 5 7-5M5 12l7 5 7-5"></path>
                </svg>
              {:else if index === 2}
                <!-- Montaje y validaciones -->
                <svg class="service-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4"></path>
                </svg>
              {/if}
            </div>
            <h3>{item[0]}</h3>
            <p>{item[1]}</p>
          </article>
        {/each}
      </div>
    </section>

    <section id="custom" class="section portfolio">
      <div class="section-header">
        <h2>{copy.customTitle}</h2>
        <span></span>
      </div>
      <div id="portfolio" class="portfolio-grid">
        {#each filteredPortfolios as project, i}
          <div class={`mix ${project.categories.join(' ')}`} class:gallery-hidden={!galleryExpanded && i >= GALLERY_VISIBLE}>
            <div class="portfolio-item">
              <a class="shot-item" href="/galeria/{project.slugs.es}" on:click|preventDefault={() => openLightbox(project)} aria-label={getProjectTitle(project)}>
                <img
                  src={`/${project.thumb.replace(/\.avif$/, '-md.avif')}`}
                  srcset={`/${project.thumb.replace(/\.avif$/, '-sb.avif')} 300w, /${project.thumb.replace(/\.avif$/, '-md.avif')} 800w`}
                  sizes="(max-width: 768px) 92vw, 31vw"
                  width="800" height="450"
                  alt={getProjectTitle(project)} loading="lazy" decoding="async"
                />
                <span class="overlay lightbox" aria-hidden="true">
                  <span class="item-icon eye-icon"></span>
                </span>
              </a>
            </div>
          </div>

          <!-- Vídeos 3D: fila a todo el ancho situada bajo la primera fila de fotos
               (4 columnas en escritorio). Miniaturas 16:9 que abren la ventana flotante. -->
          {#if i === 3}
            <div class="portfolio-videos">
              {#each galleryVideos as v, vi}
                <div class="video-cell">
                  <a class="video-thumb" href={`/videos/${v.slug}`} on:click|preventDefault={() => openVideoLightbox(v.src)} aria-label={v.title}>
                    <img src={v.thumb} alt={`Vídeo 3D de stand Standarte ${vi + 1}`} width="320" height="180" loading="lazy" decoding="async" />
                    <span class="video-thumb-overlay"><span class="play-badge"></span></span>
                  </a>
                </div>
              {/each}
            </div>
          {/if}
        {/each}
      </div>

      {#if !galleryExpanded && filteredPortfolios.length > GALLERY_VISIBLE}
        <div class="gallery-more-wrap">
          <button type="button" class="gallery-more-btn" on:click={() => (galleryExpanded = true)}>
            {galleryMoreLabels[lang] || galleryMoreLabels.es}
          </button>
        </div>
      {/if}

      {#if videoLightboxSrc}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Vídeo de proyecto 3D" tabindex="-1" on:click={(e) => { if (e.target === e.currentTarget) closeVideoLightbox(); }}>
          {#if galleryVideos.length > 1}
            <button class="lightbox-nav prev" type="button" aria-label={lang === 'es' ? 'Vídeo anterior' : 'Previous video'} on:click={() => navVideo(-1)}>‹</button>
            <button class="lightbox-nav next" type="button" aria-label={lang === 'es' ? 'Vídeo siguiente' : 'Next video'} on:click={() => navVideo(1)}>›</button>
          {/if}
          <div class="lightbox-window lightbox-window-video" role="document">
            <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeVideoLightbox}>×</button>
            <div class="lightbox-body">
              <!-- svelte-ignore a11y_media_has_caption -->
              <video src={videoLightboxSrc} class="lightbox-video" autoplay loop muted playsinline></video>
              <ProjectAdvisor {lang} project={lightboxVideoProject} source={videoLightboxSrc} dark />
            </div>
          </div>
        </div>
      {/if}
    </section>

    <!-- Nueva Sección: Prototipos 3D Premium -->
    <section id="prototipos-3d" class="section prototypes-carousel">
      <div class="section-header">
        <h2>{projects3DTitle[lang] || projects3DTitle.es}</h2>
        <span></span>
        <p><strong>{uspHome(lang).homeHeading}</strong><br />{uspHome(lang).homeText}</p>
      </div>

      <div class="carousel-container">
        <button class="carousel-nav prev" type="button" on:click={prevSlide} aria-label={lang === 'es' ? 'Anterior' : (lang === 'de' ? 'Zurück' : (lang === 'pt' ? 'Anterior' : (lang === 'fr' ? 'Précédent' : (lang === 'it' ? 'Precedente' : (lang === 'zh' ? '上一页' : (lang === 'hi' ? 'पिछला' : 'Previous'))))))}>‹</button>
        
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="carousel-viewport" bind:this={carouselViewportEl} on:mousemove={carOnMove} on:mouseleave={carOnLeave} on:touchstart|passive={carTouchStart} on:touchmove|passive={carTouchMove} on:touchend|passive={carTouchEnd} on:touchcancel|passive={carTouchEnd} role="presentation">
          <div class="carousel-track" bind:this={carouselTrackEl}>
            {#each [...carouselItems, ...carouselItems] as project, dupIdx}
              <article class="carousel-card" style="width: calc(100% / var(--visible-count));" aria-hidden={dupIdx >= carouselItems.length || undefined}>
                <div class="carousel-card-inner">
                  <a href={projectUrl(project.id, lang)} class="carousel-img-link" tabindex="-1" aria-hidden="true">
                    <div class="carousel-img-wrap">
                      {#if project.location}<span class="carousel-loc-badge">{project.location}</span>{/if}
                      <span class="carousel-loading" aria-hidden="true">{lang === 'es' ? 'cargando…' : 'loading…'}</span>
                      <img src={project.image.replace('.avif', '-thumb.avif')} alt="" width="480" height="360" loading="lazy" use:imgLoaded on:error={(e) => handleThumbError(e, project)} />
                    </div>
                  </a>
                  <a href={projectUrl(project.id, lang)} class="carousel-overlay" tabindex="-1" aria-hidden="true">
                    <span class="view-btn-gold">{copy.projects3D?.viewBtn || 'Ver Proyecto'}</span>
                  </a>
                  <div class="carousel-caption">
                    <a href={projectUrl(project.id, lang)} class="carousel-caption-link" title={carouselTitle(project)}>
                      <h3>{carouselTitle(project)}</h3>
                    </a>
                  </div>
                </div>
              </article>
            {/each}
          </div>
        </div>

        <button class="carousel-nav next" type="button" on:click={nextSlide} aria-label={lang === 'es' ? 'Siguiente' : (lang === 'de' ? 'Weiter' : (lang === 'pt' ? 'Seguinte' : (lang === 'fr' ? 'Suivant' : (lang === 'it' ? 'Successivo' : (lang === 'zh' ? '下一页' : (lang === 'hi' ? 'अगla' : 'Next'))))))}>›</button>
      </div>

      <!-- Enlaces a TODOS los proyectos para rastreo SEO (las fichas del carrusel se
           descargan por tramos; estos enlaces no cargan imágenes, coste nulo). -->
      <nav class="carousel-seo-links" aria-hidden="true">
        {#each shuffledProjects as project}
          <a href={projectUrl(project.id, lang)}>{getProjectTitle(project)}</a>
        {/each}
      </nav>
    </section>

    <!-- Herramientas propias de Standarte, en HTML crawlable para buscadores y motores
         de IA: el asesor Pat (servicio de asesoramiento) y el Proyecto Auditado
         (garantía 100%). El panel de Pat se carga por JS y un rastreador no lo ve, así
         que aquí queda nombrado y descrito, con entrada real para abrirlo. -->
    <section id="herramientas-standarte" class="section tools-section" aria-label={toolsCopy(lang).heading}>
      <div class="section-header">
        <h2>{toolsCopy(lang).heading}</h2>
      </div>
      <div class="tools-grid">
        <article class="tool-card" itemscope itemtype="https://schema.org/Service">
          <h3 itemprop="name">{toolsCopy(lang).patTitle}</h3>
          <p itemprop="description">{toolsCopy(lang).patText}</p>
          <button type="button" class="tool-cta" on:click={openPatAndScroll}>{toolsCopy(lang).patCta} →</button>
        </article>
        <article class="tool-card" itemscope itemtype="https://schema.org/Service">
          <h3 itemprop="name">{toolsCopy(lang).guaranteeTitle}</h3>
          <p itemprop="description">{toolsCopy(lang).guaranteeText}</p>
          <a class="tool-cta" href={pathFor(lang, 'proyecto_auditado')}>{toolsCopy(lang).guaranteeCta} →</a>
        </article>
        <article class="tool-card" itemscope itemtype="https://schema.org/Service">
          <h3 itemprop="name">{toolsCopy(lang).estimateTitle}</h3>
          <p itemprop="description">{toolsCopy(lang).estimateText}</p>
          <a class="tool-cta" href={pathFor(lang, 'precios')}>{toolsCopy(lang).estimateCta} →</a>
        </article>
      </div>
    </section>

    <section class="counters section">
      <div class="counter-grid">
        {#each counterItems as item, index}
          <article class="facts-item">
            <div class="icon">
              <i class={`counter-symbol ${item.icon}`} aria-hidden="true"></i>
            </div>
            <div class="fact-count">
              <h3><span class="counter">{displayedCounters[index]}</span></h3>
              <h4>{copy.counters?.[item.key]}</h4>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <MicroStand labels={copy.micro} />

    <section id="team" class="section team">
      <div class="section-header">
        <h2>{copy.teamTitle}</h2>
        <span></span>
        <p>{copy.teamSubtitle}</p>
      </div>
      <div class="team-grid">
        <article class="team-member">
          <div class="member-photo-container team-fade-container">
            <img
              src="/img/team/victoria_idiaquez.avif"
              srcset="/img/team/victoria_idiaquez-mobile.avif 400w, /img/team/victoria_idiaquez.avif 1920w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-1"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/img/team/team2.avif"
              srcset="/img/team/team2-mobile.avif 400w, /img/team/team2.avif 1200w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-2"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/img/team/team5.avif"
              srcset="/img/team/team5-mobile.avif 400w, /img/team/team5.avif 1200w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Equipo de Victoria"
              class="member-photo fade-img img-3"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>{teamMemberName[lang] || teamMemberName.es}</h3>
          <p class="role">{copy.teamRoles[0]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/javier_garcia.avif"
              srcset="/img/team/javier_garcia-mobile.avif 400w, /img/team/javier_garcia.avif 1696w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Javier G. Márquez"
              class="member-photo"
              style="transform: scale(1.35) translateY(8px); transform-origin: center 18%;"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Javier G. Márquez</h3>
          <p class="role">{copy.teamRoles[1]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/pablo_alminar.avif"
              srcset="/img/team/pablo_alminar-mobile.avif 400w, /img/team/pablo_alminar.avif 1696w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Pablo Alminar"
              class="member-photo"
              style="object-position: center top; transform: scale(2.3) translateY(20px);"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Pablo Alminar</h3>
          <p class="role">{copy.teamRoles[2]}</p>
        </article>

        <article class="team-member">
          <div class="member-photo-container">
            <img
              src="/img/team/patricia_jimenez.avif"
              srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
              sizes="(max-width: 768px) 170px, 200px"
              alt="Patricia Jiménez"
              class="member-photo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>Patricia Jiménez</h3>
          <p class="role">{copy.teamRoles[3]}</p>
        </article>
      </div>
    </section>
  {:else if seoContent}
    <div class="dedicated-seo-page">
      <div class="seo-container">
        <div class="seo-layout">
          <!-- Artículo principal de redacción profesional -->
          <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
          <article class="seo-article" on:click={handleSeoBodyClick}>
            {#if section === 'proyecto_auditado'}
              <a class="guarantee-stamp" href="https://standarte.es/proyecto-auditado" aria-label="Sistema de Proyecto Auditado">
                <img src="/img/100x100-guaranted.avif" alt="" loading="lazy" />
              </a>
            {/if}
            {#if isCityPage || section === 'proyecto_auditado'}
              <nav class="breadcrumbs feria-breadcrumbs" aria-label="Breadcrumb">
                <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href={pathFor(lang, 'home')}><span itemprop="name">{lang === 'es' ? 'Inicio' : 'Home'}</span></a>
                    <meta itemprop="position" content="1" />
                  </li>
                  <li class="bc-sep" aria-hidden="true"><span class="divider">/</span></li>
                  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    {#if cityFlagCountry}<span class="fair-flag flag-{cityFlagCountry} bc-flag" aria-hidden="true"></span>{/if}
                    <span class="current" itemprop="name" aria-current="page">{seoContent.breadcrumb}</span>
                    <meta itemprop="position" content="2" />
                  </li>
                </ol>
              </nav>
            {/if}
            {@html bodyHtml}
          </article>
          
          <!-- Sidebar con casos de éxito reales -->
          <aside class="seo-sidebar">
            <div class="sidebar-sticky">
              <!-- B1: prueba de cobertura verificable (recuento real de ferias) + Pat. -->
              {#if (section in cityData) && regionFairs.length && cityDisplayName}
                <section class="coverage-proof sidebar-module">
                  <p>{(coverageProof[lang] || coverageProof.es)(regionFairs.length, cityDisplayName)}</p>
                  <button type="button" class="coverage-pat" on:click={openPatAndScroll}>{coveragePatCta[lang] || coveragePatCta.es} →</button>
                </section>
              {/if}
              <div class="city-nav-module">
                <details class="fairs-collapse">
                  <summary class="fairs-collapse-summary">
                    <span class="fairs-stack" aria-hidden="true"><span></span><span></span><span></span></span>
                    <span class="fairs-collapse-open">{CITY_NAV_LABELS[lang] || CITY_NAV_LABELS.es} ({sortedCityNavKeys.length})</span>
                    <span class="fairs-collapse-close">{CITY_NAV_LABELS[lang] || CITY_NAV_LABELS.es}</span>
                    <span class="fairs-collapse-chevron" aria-hidden="true"></span>
                  </summary>
                  <ul class="city-fairs-list">
                    {#each sortedCityNavKeys as ck}
                      <li>
                        <a href={pathFor(lang, ck)} class:active={ck === section}>
                          {cityNavLabel(ck, lang)}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </details>
                <a class="precios-pill" href={pathFor(lang, 'precios')}>{preciosNav[lang] || preciosNav.es}</a>
              </div>

              <div class="spotlight-card">
                <h3>{copy.successStoriesTitle}</h3>

                <div class="sidebar-projects">
                  {#each selectedPortfolios as project}
                    <a class="sidebar-project-card" href="/galeria/{project.slugs.es}" on:click|preventDefault={() => openLightbox(project)} aria-label={getProjectTitle(project)}>
                      <img src={`/${project.thumb.replace(/\.avif$/, '-sb.avif')}`} alt={getProjectTitle(project)} class="sidebar-project-img" width="300" height="169" loading="lazy" decoding="async" />
                      <div class="sidebar-project-info">
                        <h4>{getProjectTitle(project)}</h4>
                        <p>{projectDescription(project)}</p>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>

              <!-- Clúster pilar→ferias: enlaces a las ferias de la región -->
              {#if regionFairs.length}
                <section class="city-fairs sidebar-module" aria-label={cityFairsLabel[lang] || cityFairsLabel.es}>
                  <h2>{cityFairsLabel[lang] || cityFairsLabel.es}</h2>
                  {#if regionFairs.length > FAIRS_COLLAPSE_THRESHOLD}
                    <!-- Nube numerosa: se condensa en móvil (pila de botones) y se
                         despliega al tocar. En escritorio el CSS la fuerza abierta. -->
                    <details class="fairs-collapse">
                      <summary class="fairs-collapse-summary">
                        <span class="fairs-stack" aria-hidden="true"><span></span><span></span><span></span></span>
                        <span class="fairs-collapse-open">{(fairsCloudOpenCta[lang] || fairsCloudOpenCta.es)(regionFairs.length)}</span>
                        <span class="fairs-collapse-close">{fairsCloudCloseCta[lang] || fairsCloudCloseCta.es}</span>
                        <span class="fairs-collapse-chevron" aria-hidden="true"></span>
                      </summary>
                      <ul class="city-fairs-list">
                        {#each regionFairs as fair}
                          <li><a href={fairHrefSite(fair.slug)}>{fair.name}</a></li>
                        {/each}
                      </ul>
                    </details>
                  {:else}
                    <ul class="city-fairs-list">
                      {#each regionFairs as fair}
                        <li><a href={fairHrefSite(fair.slug)}>{fair.name}</a></li>
                      {/each}
                    </ul>
                  {/if}
                </section>
              {/if}

              <!-- Navegador de actividades: chips de color hacia los hubs por sector -->
              {#if regionActivities.length}
                <section class="activity-module sidebar-module" aria-label={ACTIVITY_NAV_LABELS[lang] || ACTIVITY_NAV_LABELS.es}>
                  <h2>{ACTIVITY_NAV_LABELS[lang] || ACTIVITY_NAV_LABELS.es}</h2>
                  {#if regionActivities.length > ACTIVITIES_COLLAPSE_THRESHOLD}
                    <details class="fairs-collapse">
                      <summary class="fairs-collapse-summary">
                        <span class="fairs-stack" aria-hidden="true"><span></span><span></span><span></span></span>
                        <span class="fairs-collapse-open">{(activitiesCloudOpenCta[lang] || activitiesCloudOpenCta.es)(regionActivities.length)}</span>
                        <span class="fairs-collapse-close">{fairsCloudCloseCta[lang] || fairsCloudCloseCta.es}</span>
                        <span class="fairs-collapse-chevron" aria-hidden="true"></span>
                      </summary>
                      <ul class="activity-chips">
                        {#each regionActivities as tag}
                          <li>
                            <a href={activityUrl(tag, lang)} style="--chip:{colorForTag(tag)}">
                              <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tag, lang)}
                            </a>
                          </li>
                        {/each}
                        <li><a class="ver-todas-link" href={activityIndexUrl(lang)}>{ALL_ACTIVITIES_LABELS[lang] || ALL_ACTIVITIES_LABELS.es} →</a></li>
                      </ul>
                    </details>
                  {:else}
                    <ul class="activity-chips">
                      {#each regionActivities as tag}
                        <li>
                          <a href={activityUrl(tag, lang)} style="--chip:{colorForTag(tag)}">
                            <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tag, lang)}
                          </a>
                        </li>
                      {/each}
                      <li><a class="ver-todas-link" href={activityIndexUrl(lang)}>{ALL_ACTIVITIES_LABELS[lang] || ALL_ACTIVITIES_LABELS.es} →</a></li>
                    </ul>
                  {/if}
                </section>
              {/if}
            </div>
          </aside>
        </div>

        <!-- FAQs Section (B2B FAQ grids) — siempre en número par -->
        {#if faqsEven.length > 0}
          <section class="seo-faqs">
            <h2>{copy.faqsTitle}</h2>
            <div class="faq-grid">
              {#each faqsEven as faq}
                <article class="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              {/each}
            </div>
          </section>
          <!-- Separador entre las FAQs y el formulario de contacto. -->
          <hr class="seo-form-divider" />
        {/if}
      </div>
    </div>
  {/if}

  <ContactForm {lang} labels={copy} variant="light" bind:initialFair={initialFair} />

  <!-- Lightbox de proyecto: fuera de las ramas de sección (home / ciudad) para que esté
       disponible en AMBAS. Lo disparan tanto el grid de la galería (home) como las
       tarjetas de "Casos de Éxito" del aside de las páginas de ciudad. -->
  {#if lightboxProject}
    <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={getProjectTitle(lightboxProject)} aria-describedby="project-lightbox-description" tabindex="-1">
      {#if filteredPortfolios.length > 1}
        <button class="lightbox-nav prev" type="button" aria-label={lang === 'es' ? 'Proyecto anterior' : 'Previous project'} on:click={() => navLightbox(-1)}>‹</button>
        <button class="lightbox-nav next" type="button" aria-label={lang === 'es' ? 'Proyecto siguiente' : 'Next project'} on:click={() => navLightbox(1)}>›</button>
      {/if}
      <div class="lightbox-window" role="document">
        <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
        <div class="lightbox-body">
          <div class="lightbox-media">
            <img src={`/${lightboxProject.full}`} alt={getProjectTitle(lightboxProject)} />
            <div class="lightbox-caption">
              <strong>{getProjectTitle(lightboxProject)}</strong>
              <p id="project-lightbox-description">{projectDescription(lightboxProject)}</p>
            </div>
          </div>
          <ProjectAdvisor {lang} project={lightboxProject} source={lightboxProject?.full} dark />
        </div>
      </div>
    </div>
  {/if}
</main>

<SiteFooter {lang} {copy} langHref={(option) => pathFor(option, section)} />

<style>
  /* Header oscuro de las subpáginas con .static-header (custom/luzpavilion/team): su
     hero lleva título blanco, así que conservan el fondo #16191c. La propiedad ya no
     vive en el global .static-header (app.css); se relocaliza aquí, donde se necesita. */
  .static-header {
    background: #16191c !important;
  }

  /* Sello de garantía en /proyecto-auditado y en la sección "Servicios" de la
     home: mismo tamaño y posición que en la ficha pública de proyecto
     (src/routes/proyectos/[id]/+page.svelte), arriba a la derecha. */
  .seo-article,
  .services {
    position: relative;
  }
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

  /* Variante del sello para la sección "Servicios": más grande, más centrada y
     más arriba (pisa a propósito el carrusel de ferias de encima). */
  #services .guarantee-stamp {
    top: -95px;
    left: 83.33%; /* centro de la 3ª de 3 columnas iguales de .service-grid */
    right: auto;
    transform: translateX(-50%);
    width: 190px;
    height: 190px;
  }
  #services .guarantee-stamp:hover {
    transform: translateX(-50%) scale(1.05);
  }
  @media (max-width: 768px) {
    #services .guarantee-stamp {
      top: -60px;
      left: 50%;
      width: 130px;
      height: 130px;
    }
  }

  /* Galería y ciudades: ocultar elementos extra sin sacarlos del DOM (SEO + descarga diferida) */
  .gallery-hidden,
  .cities-hidden {
    display: none !important;
  }
  .gallery-more-wrap {
    display: flex;
    justify-content: center;
    /* margin auto para centrar el contenedor (si no, el estilo scoped pisa el
       margin:auto global de .section > * y queda pegado a la izquierda). */
    margin: 34px auto 10px;
    width: 100%;
  }
  /* Botón secundario, discreto: sin amarillo, para no competir con el CTA del menú. */
  .gallery-more-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 180px;
    padding: 11px 32px;
    background: transparent;
    color: #555;
    border: 1px solid #cfcfcf;
    border-radius: 30px;
    font-family: Inconsolata, monospace;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .gallery-more-btn:hover {
    background: #efefef;
    border-color: #999;
    color: #222;
  }

  /* Descargador circular del carrusel 3D (entre tramos de 12 fichas) */
  .carousel-loader-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .carousel-loader-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    transition: color 0.2s ease;
  }
  .carousel-loader-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #cfcfcf;
    background: #fff;
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }
  .carousel-loader-btn:hover {
    color: #222;
  }
  .carousel-loader-btn:hover .carousel-loader-circle {
    border-color: #999;
    background: #f5f5f5;
    transform: scale(1.06);
  }
  .carousel-loader-text {
    font-family: Inconsolata, monospace;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.05em;
  }
  /* Enlaces de proyectos para rastreo (no visibles; presentes en el DOM para SEO) */
  .carousel-seo-links {
    display: none;
  }

  .nav-badge-new {
    background-color: #ffc800;
    color: #111 !important; /* Force high-contrast dark text */
    font-size: 16px; /* Increased size */
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 3px;
    margin-left: -2ch; /* Pulls it back horizontally to start exactly above the "on" of LuzPavilion */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    line-height: 1;
    transform: translateY(-11px); /* Elevated to sit perfectly as a power exponent */
    transition: background-color 0.2s ease;
  }

  /* Keep indicator visually consistent on link hover */
  :global(.nav-links > a:hover) .nav-badge-new {
    background-color: #e6b400;
  }

  /* LUZPAVILION PREMIUM TEAM GRID STYLE */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    max-width: var(--container);
    margin: 40px auto 0;
    justify-items: center;
  }

  .team-member {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .member-photo-container {
    position: relative;
    width: 200px;
    height: 200px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(22, 25, 28, 0.15);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin-bottom: 20px;
    background-color: #f7f6f1;
  }

  .member-photo-container:hover {
    transform: scale(1.04);
    box-shadow: 0 16px 40px rgba(22, 25, 28, 0.22);
  }

  .member-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-fade-container {
    position: relative;
  }

  .team-fade-container .fade-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-fade-container .img-1 {
    animation: fade3 9s infinite;
  }

  .team-fade-container .img-2 {
    animation: fade3 9s infinite;
    animation-delay: -3s;
  }

  .team-fade-container .img-3 {
    animation: fade3 9s infinite;
    animation-delay: -6s;
  }

  @keyframes fade3 {
    0%, 28% {
      opacity: 1;
    }
    33%, 95% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .team-member h3 {
    font-family: 'Francois One', serif;
    font-size: 19px;
    font-weight: 400;
    color: #333;
    margin: 0 0 6px;
  }

  .team-member .role {
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
    color: #000;
    letter-spacing: 0.1em;
    margin: 0;
  }

  @media (max-width: 992px) {
    .team-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  @media (max-width: 640px) {
    .team-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .member-photo-container {
      width: 170px;
      height: 170px;
    }
  }

  :global(.transparent-hero) {
    background: transparent !important;
    border-bottom: none !important;
  }

  /* Navegador de actividades (aside): chips de color hacia los hubs por sector. */
  .activity-module { margin-top: 1.8rem; }
  .activity-chips {
    list-style: none; padding: 0; margin: 0 0 0.9rem;
    display: flex; flex-wrap: wrap; gap: 0.35rem;
  }
  /* Etiquetas estilo "badge": píldora suave y compacta (fondo tenue + punto + texto del
     color de la actividad, oscurecido para legibilidad). Forma simple, sin borde. */
  .activity-chips li a {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.2rem 0.62rem; font-size: 0.88rem; font-weight: 500;
    color: color-mix(in srgb, var(--chip) 62%, #12211a); text-decoration: none;
    border: none; border-radius: 999px;
    background: color-mix(in srgb, var(--chip) 12%, #fff);
    transition: background 0.2s ease;
  }
  .activity-chips li a:hover {
    background: color-mix(in srgb, var(--chip) 20%, #fff);
  }
  .activity-chips .chip-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--chip); flex: 0 0 auto;
  }
  /* Destaque del Sistema de Proyecto Auditado en la home. */
  .audited-teaser { text-align: center; }
  .audited-teaser-inner {
    max-width: 760px; margin: 0 auto; padding: 2.4rem 1.6rem;
    border: 1px solid rgba(224, 180, 0, 0.5);
    border-radius: 12px;
    background: rgba(224, 180, 0, 0.05);
  }
  .audited-teaser-inner h2 { margin: 0 0 0.8rem; }
  .audited-teaser-inner p { margin: 0 auto 1.4rem; max-width: 620px; line-height: 1.6; }
  .audited-cta {
    display: inline-block; padding: 0.85rem 1.8rem;
    background: #1b1b1a; color: #fff; border-radius: 6px;
    font-weight: 700; text-decoration: none;
  }
  .audited-cta:hover { background: #000; }
  /* Sección "Herramientas propias" (asesor Pat + garantía Proyecto Auditado). */
  .tools-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.4rem; max-width: 1120px; margin: 0 auto; padding: 0 1rem;
  }
  .tool-card {
    border: none;
    border-radius: 12px; padding: 1.8rem 1.6rem;
    background: transparent;
    display: flex; flex-direction: column;
  }
  .tool-card h3 { margin: 0 0 0.7rem; font-size: 1.3rem; }
  .tool-card p { margin: 0 0 1.3rem; line-height: 1.6; flex: 1; }
  .tool-cta {
    align-self: flex-start; display: inline-block;
    padding: 0.7rem 1.5rem; background: #1b1b1a; color: #fff;
    border: none; border-radius: 6px; font-weight: 700;
    font-family: inherit; font-size: 1rem; cursor: pointer; text-decoration: none;
  }
  .tool-cta:hover { background: #000; }
  /* Los CTA de las tres columnas de "Herramientas propias" son enlaces simples. */
  .tools-grid .tool-cta {
    padding: 0; background: none; border: none; border-radius: 0;
    color: royalblue; font-weight: 700; text-decoration: none;
  }
  .tools-grid .tool-cta:hover { background: none; text-decoration: underline; }
  @media (max-width: 700px) { .tools-grid { grid-template-columns: 1fr; } }
  /* Bloque de posicionamiento de cobertura (España + Portugal). */
  .coverage-claim { max-width: 820px; margin: 0 auto 1.6rem; text-align: center; padding: 0 1rem; }
  .coverage-claim h2 { margin: 0 0 0.6rem; }
  .coverage-claim p { margin: 0; line-height: 1.65; color: var(--text-color); }
  .activity-pitch { margin-top: 2rem; }
  .activity-pitch .tool-cta { margin-top: 1.1rem; }
</style>
