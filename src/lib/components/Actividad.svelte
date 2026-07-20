<script>
  import { onMount } from 'svelte';
  import { fairsData } from '$lib/fairsData.js';
  import { projectIndex } from '$lib/projectIndex.js';
  import { projectsForActivity } from '$lib/projectTags.js';
  import {
    pathFor, languages, languageLabels, fairUrl, projectUrl,
    activityUrl, activityIndexUrl, ctaBudget, preciosNav, cityData, routes
  } from '$lib/siteData.js';
  import {
    tagFamilies, fairTags, tagOrder, fairsForActivity,
    colorForTag, labelForTag, familyLabel
  } from '$lib/fairTags.js';
  import { CITY_PILLAR } from '$lib/iberiaMeshData.js';
  import { pickUspLine, uspHome, uspNavLabel } from '$lib/uspSnippets.js';
  import { activityPitch } from '$lib/activityPitch.js';
  import FlagIcon from './FlagIcon.svelte';
  import ContactForm from './ContactForm.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import AiSourceButtons from './AiSourceButtons.svelte';
  import { advisorDismissed } from '$lib/stores/advisor.js';

  export let data;
  $: ({ lang, copy, canonical, section, tag, activitySeo } = data);
  $: isIndex = section === 'activityIndex';

  // Preselección para el panel de Pat en las páginas interiores de actividad:
  // la familia (sector) y la etiqueta del hub actual, para que Pat abra en el
  // paso 2 y el mapa llegue resaltando esta actividad.
  $: presetFamily = (!isIndex && tag && fairTags[tag]) ? fairTags[tag].family : '';
  $: presetTags = (!isIndex && tag && fairTags[tag]) ? [tag] : [];

  let isScrolled = false;
  let menuOpen = false;
  function updateScrollState() { isScrolled = typeof window !== 'undefined' && window.scrollY > 8; }

  // Panel de Pat (asesor de Expansión) + botones GEO, igual que en la home. Solo en el
  // índice /actividad. WelcomeAdvisor se carga con import dinámico (chunk aparte).
  let showWelcomeAdvisor = false;
  let AdvisorComponent = null;
  let initialFair = '';
  function handleSelectFair(event) {
    const { fairName, cityName } = event.detail;
    initialFair = `${fairName} (${cityName})`;
  }
  // El panel de Pat NO se abre solo: aquí solo se muestra cuando el usuario lo pide
  // (disparador del aside o botón de reactivar del hero). Carga diferida del chunk.
  function reopenAdvisor() {
    advisorDismissed.reactivate();
    if (AdvisorComponent) { showWelcomeAdvisor = true; return; }
    import('./WelcomeAdvisor.svelte')
      .then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; })
      .catch(() => {});
  }
  onMount(() => {
    updateScrollState();
  });

  const languageLocales = { es: 'es_ES', en: 'en_GB', de: 'de_DE', zh: 'zh_CN', hi: 'hi_IN', pt: 'pt_PT', fr: 'fr_FR', it: 'it_IT', ko: 'ko_KR', ja: 'ja_JP', nl: 'nl_NL' };
  const contentLanguages = { es: 'es-ES', en: 'en-GB', de: 'de-DE', zh: 'zh-CN', hi: 'hi-IN', pt: 'pt-PT', fr: 'fr-FR', it: 'it-IT', ko: 'ko-KR', ja: 'ja-JP', nl: 'nl-NL' };
  const ctaLabels = { es: 'Presupuesto en 24h', en: 'Quote in 24h', de: 'Angebot in 24h', zh: '24小时内报价', hi: '24 घंटे में कोटेशन', pt: 'Orçamento em 24h', fr: 'Devis en 24h', it: 'Preventivo in 24h', ko: '24시간 내 견적', ja: '24時間で見積もり', nl: 'Offerte binnen 24u' };
  const preciosNavLabel = { es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi', nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金' };
  const preciosLink = { es: 'Precios de stands', en: 'Stand prices', de: 'Messestand-Preise', fr: 'Tarifs de stands', it: 'Prezzi degli stand', pt: 'Preços de stands', zh: '展台价格', hi: 'स्टैंड के मूल्य', ko: '부스 가격', ja: 'ブースの料金', nl: 'Standprijzen' };
  // Disparador del panel de Pat (asesor de Expansión) en el aside de los hubs.
  const patTrigger = {
    es: 'Planifica tu expansión con Pat', en: 'Plan your expansion with Pat',
    pt: 'Planeia a tua expansão com a Pat', de: 'Planen Sie Ihre Expansion mit Pat',
    fr: 'Planifiez votre expansion avec Pat', it: 'Pianifica la tua espansione con Pat',
    nl: 'Plan je expansie met Pat', zh: '与 Pat 一起规划您的扩张',
    hi: 'Pat के साथ अपने विस्तार की योजना बनाएं', ko: 'Pat과 함께 확장을 계획하세요',
    ja: 'Pat と一緒に拡大を計画'
  };
  const projectsH = { es: 'Proyectos 3D de esta actividad', pt: 'Projetos 3D desta atividade', en: '3D projects for this activity', de: '3D-Projekte dieser Branche', fr: 'Projets 3D de cette activité', it: 'Progetti 3D di questa attività', nl: '3D-projecten van deze branche', zh: '该行业的3D项目', hi: 'इस गतिविधि की 3D परियोजनाएं', ko: '이 분야의 3D 프로젝트', ja: 'この分野の3Dプロジェクト' };

  // Textos de la plantilla (índice y hub) en los 11 idiomas.
  const T = {
    es: { idxTitle: 'Ferias por actividad | Standarte', idxH1: 'Ferias en las que está Standarte clasificadas por sector y actividad', idxLead: 'Explora nuestras ferias y congresos por sector de actividad. Cada actividad reúne los certámenes donde Standarte diseña y monta stands, con su código de color.', idxDesc: 'Directorio de ferias y congresos por sector de actividad: encuentra dónde diseñamos y montamos stands para tu sector.', hubTitle: (l) => `Stands para ferias de ${l} | Standarte`, hubH1: (l) => `Stands para ferias de ${l}`, hubLead: (l) => `Diseño y montaje de stands para ferias y congresos de ${l} en España y Portugal.`, crumbHome: 'Inicio', crumbAct: 'Actividades', fairsH: 'Ferias de esta actividad', related: 'Actividades relacionadas', allAct: 'Ver todas las actividades', itinerant: 'Itinerante', countFairs: (n) => `${n} ${n === 1 ? 'feria' : 'ferias'}` },
    pt: { idxTitle: 'Feiras por atividade | Standarte', idxH1: 'Feiras por atividade', idxLead: 'Explore as nossas feiras e congressos por setor de atividade. Cada atividade reúne os certames onde a Standarte concebe e monta stands, com o seu código de cor.', idxDesc: 'Diretório de feiras e congressos por setor de atividade: descubra onde concebemos e montamos stands para o seu setor.', hubTitle: (l) => `Stands para feiras de ${l} | Standarte`, hubH1: (l) => `Stands para feiras de ${l}`, hubLead: (l) => `Design e montagem de stands para feiras e congressos de ${l} em Espanha e Portugal.`, crumbHome: 'Início', crumbAct: 'Atividades', fairsH: 'Feiras desta atividade', related: 'Atividades relacionadas', allAct: 'Ver todas as atividades', itinerant: 'Itinerante', countFairs: (n) => `${n} ${n === 1 ? 'feira' : 'feiras'}` },
    en: { idxTitle: 'Trade fairs by activity | Standarte', idxH1: 'Trade fairs by activity', idxLead: 'Browse our trade fairs and congresses by industry. Each activity gathers the events where Standarte designs and builds stands, with its colour code.', idxDesc: 'Directory of trade fairs and congresses by industry: find where we design and build stands for your sector.', hubTitle: (l) => `Stands for ${l} trade fairs | Standarte`, hubH1: (l) => `Stands for ${l} trade fairs`, hubLead: (l) => `Design and build of stands for ${l} trade fairs and congresses in Spain and Portugal.`, crumbHome: 'Home', crumbAct: 'Activities', fairsH: 'Fairs in this activity', related: 'Related activities', allAct: 'See all activities', itinerant: 'Itinerant', countFairs: (n) => `${n} ${n === 1 ? 'fair' : 'fairs'}` },
    de: { idxTitle: 'Messen nach Branche | Standarte', idxH1: 'Messen nach Branche', idxLead: 'Entdecken Sie unsere Messen und Kongresse nach Branche. Jede Branche bündelt die Veranstaltungen, auf denen Standarte Stände entwirft und baut – mit ihrem Farbcode.', idxDesc: 'Verzeichnis von Messen und Kongressen nach Branche: Finden Sie, wo wir Stände für Ihre Branche entwerfen und bauen.', hubTitle: (l) => `Stände für ${l}-Messen | Standarte`, hubH1: (l) => `Stände für ${l}-Messen`, hubLead: (l) => `Design und Bau von Ständen für Messen und Kongresse der Branche ${l} in Spanien und Portugal.`, crumbHome: 'Start', crumbAct: 'Branchen', fairsH: 'Messen dieser Branche', related: 'Verwandte Branchen', allAct: 'Alle Branchen ansehen', itinerant: 'Wandernd', countFairs: (n) => `${n} ${n === 1 ? 'Messe' : 'Messen'}` },
    fr: { idxTitle: 'Salons par activité | Standarte', idxH1: 'Salons par activité', idxLead: 'Explorez nos salons et congrès par secteur d’activité. Chaque activité regroupe les événements où Standarte conçoit et monte des stands, avec son code couleur.', idxDesc: 'Répertoire de salons et congrès par secteur : trouvez où nous concevons et montons des stands pour votre secteur.', hubTitle: (l) => `Stands pour les salons de ${l} | Standarte`, hubH1: (l) => `Stands pour les salons de ${l}`, hubLead: (l) => `Conception et montage de stands pour les salons et congrès de ${l} en Espagne et au Portugal.`, crumbHome: 'Accueil', crumbAct: 'Activités', fairsH: 'Salons de cette activité', related: 'Activités liées', allAct: 'Voir toutes les activités', itinerant: 'Itinérant', countFairs: (n) => `${n} ${n === 1 ? 'salon' : 'salons'}` },
    it: { idxTitle: 'Fiere per attività | Standarte', idxH1: 'Fiere per attività', idxLead: 'Esplora le nostre fiere e i congressi per settore di attività. Ogni attività raccoglie gli eventi in cui Standarte progetta e allestisce stand, con il suo codice colore.', idxDesc: 'Directory di fiere e congressi per settore: scopri dove progettiamo e allestiamo stand per il tuo settore.', hubTitle: (l) => `Stand per le fiere di ${l} | Standarte`, hubH1: (l) => `Stand per le fiere di ${l}`, hubLead: (l) => `Progettazione e allestimento di stand per fiere e congressi di ${l} in Spagna e Portogallo.`, crumbHome: 'Home', crumbAct: 'Attività', fairsH: 'Fiere di questa attività', related: 'Attività correlate', allAct: 'Vedi tutte le attività', itinerant: 'Itinerante', countFairs: (n) => `${n} ${n === 1 ? 'fiera' : 'fiere'}` },
    nl: { idxTitle: 'Beurzen per branche | Standarte', idxH1: 'Beurzen per branche', idxLead: 'Ontdek onze beurzen en congressen per branche. Elke activiteit bundelt de evenementen waar Standarte stands ontwerpt en bouwt, met zijn kleurcode.', idxDesc: 'Overzicht van beurzen en congressen per branche: vind waar wij stands ontwerpen en bouwen voor uw sector.', hubTitle: (l) => `Stands voor ${l}-beurzen | Standarte`, hubH1: (l) => `Stands voor ${l}-beurzen`, hubLead: (l) => `Ontwerp en bouw van stands voor ${l}-beurzen en -congressen in Spanje en Portugal.`, crumbHome: 'Home', crumbAct: 'Branches', fairsH: 'Beurzen in deze branche', related: 'Verwante branches', allAct: 'Alle branches bekijken', itinerant: 'Rondreizend', countFairs: (n) => `${n} ${n === 1 ? 'beurs' : 'beurzen'}` },
    zh: { idxTitle: '按行业分类的展会 | Standarte', idxH1: '按行业分类的展会', idxLead: '按行业浏览我们的展会与大会。每个行业汇集了 Standarte 设计与搭建展台的活动，并配有专属颜色代码。', idxDesc: '按行业分类的展会与大会目录：找到我们为您所在行业设计与搭建展台的展会。', hubTitle: (l) => `${l}展会展台 | Standarte`, hubH1: (l) => `${l}展会展台`, hubLead: (l) => `为西班牙和葡萄牙的${l}展会与大会设计与搭建展台。`, crumbHome: '首页', crumbAct: '行业', fairsH: '该行业的展会', related: '相关行业', allAct: '查看所有行业', itinerant: '巡回', countFairs: (n) => `${n} 个展会` },
    hi: { idxTitle: 'गतिविधि के अनुसार मेले | Standarte', idxH1: 'गतिविधि के अनुसार मेले', idxLead: 'उद्योग के अनुसार हमारे मेले और सम्मेलन देखें। प्रत्येक गतिविधि उन आयोजनों को एक साथ लाती है जहाँ Standarte स्टैंड डिज़ाइन और निर्माण करता है, अपने रंग कोड के साथ।', idxDesc: 'उद्योग के अनुसार मेलों और सम्मेलनों की निर्देशिका: जानें हम आपके क्षेत्र के लिए कहाँ स्टैंड बनाते हैं।', hubTitle: (l) => `${l} मेलों के लिए स्टैंड | Standarte`, hubH1: (l) => `${l} मेलों के लिए स्टैंड`, hubLead: (l) => `स्पेन और पुर्तगाल में ${l} मेलों और सम्मेलनों के लिए स्टैंड डिज़ाइन और निर्माण।`, crumbHome: 'होम', crumbAct: 'गतिविधियाँ', fairsH: 'इस गतिविधि के मेले', related: 'संबंधित गतिविधियाँ', allAct: 'सभी गतिविधियाँ देखें', itinerant: 'चल', countFairs: (n) => `${n} मेले` },
    ko: { idxTitle: '활동별 박람회 | Standarte', idxH1: '활동별 박람회', idxLead: '업종별로 박람회와 학술대회를 살펴보세요. 각 분야는 Standarte가 부스를 디자인하고 시공하는 행사를 색상 코드와 함께 모았습니다.', idxDesc: '업종별 박람회·학술대회 디렉터리: 귀사의 분야를 위해 부스를 디자인·시공하는 행사를 찾아보세요.', hubTitle: (l) => `${l} 박람회 부스 | Standarte`, hubH1: (l) => `${l} 박람회 부스`, hubLead: (l) => `스페인과 포르투갈의 ${l} 박람회 및 학술대회를 위한 부스 디자인 및 시공.`, crumbHome: '홈', crumbAct: '분야', fairsH: '이 분야의 박람회', related: '관련 분야', allAct: '모든 분야 보기', itinerant: '순회', countFairs: (n) => `박람회 ${n}개` },
    ja: { idxTitle: '分野別の展示会 | Standarte', idxH1: '分野別の展示会', idxLead: '業種別に展示会と学会をご覧ください。各分野には、Standarteがブースを設計・施工するイベントがカラーコードとともにまとめられています。', idxDesc: '業種別の展示会・学会ディレクトリ：あなたの分野でブースを設計・施工するイベントを見つけましょう。', hubTitle: (l) => `${l}展示会のブース | Standarte`, hubH1: (l) => `${l}展示会のブース`, hubLead: (l) => `スペインとポルトガルの${l}展示会・学会向けのブース設計・施工。`, crumbHome: 'ホーム', crumbAct: '分野', fairsH: 'この分野の展示会', related: '関連する分野', allAct: 'すべての分野を見る', itinerant: '巡回', countFairs: (n) => `展示会${n}件` }
  };
  $: t = T[lang] || T.es;

  // Nombre de actividad localizado.
  $: tagLabel = !isIndex && tag ? labelForTag(tag, lang) : '';

  // --- Datos del HUB -----------------------------------------------------------
  // Ferias de esta actividad, resueltas a {name, city, slug} y agrupadas por ciudad.
  function fairsForTag(tg) {
    return fairsForActivity(tg)
      .map((slug) => fairsData.find((f) => f.slug === slug))
      .filter(Boolean);
  }
  $: hubFairs = !isIndex && tag ? fairsForTag(tag) : [];
  // Proyectos 3D del portfolio etiquetados con esta actividad (malla interna).
  $: hubProjects = !isIndex && tag
    ? projectsForActivity(tag).map((id) => projectIndex.find((p) => p.id === id)).filter(Boolean)
    : [];
  // Agrupación por ciudad (las itinerantes van a un grupo propio al final).
  $: hubGroups = (() => {
    const groups = {};
    for (const f of hubFairs) {
      const key = f.city === 'Itinerante' ? '__itinerant' : f.city;
      (groups[key] || (groups[key] = [])).push(f);
    }
    const cities = Object.keys(groups).filter((c) => c !== '__itinerant').sort((a, b) => a.localeCompare(b));
    const ordered = cities.map((c) => ({ city: c, label: c, fairs: groups[c] }));
    if (groups.__itinerant) ordered.push({ city: '__itinerant', label: t.itinerant, fairs: groups.__itinerant });
    return ordered;
  })();
  // Actividades hermanas (misma familia), para el aside del hub.
  $: siblingTags = !isIndex && tag
    ? tagOrder.filter((x) => x !== tag && fairTags[x]?.family === fairTags[tag]?.family)
    : [];

  // Panel "Conexiones" del nodo ACTIVIDAD: vínculos internos específicos de esta
  // actividad en el mapa. Ciudades-hub donde la cubrimos (enlace nuevo actividad→ciudad,
  // que el cuerpo no daba) + actividades afines de la misma familia (sector).
  const conexActT = {
    es: { title: 'Conexiones', cities: 'Ciudades donde montamos' },
    en: { title: 'Connections', cities: 'Cities we build in' },
    de: { title: 'Verbindungen', cities: 'Städte, in denen wir bauen' },
    pt: { title: 'Ligações', cities: 'Cidades onde montamos' },
    fr: { title: 'Connexions', cities: 'Villes où nous montons' },
    it: { title: 'Connessioni', cities: 'Città in cui montiamo' },
    nl: { title: 'Verbindingen', cities: 'Steden waar we bouwen' },
    zh: { title: '关联', cities: '我们搭建的城市' },
    hi: { title: 'कनेक्शन', cities: 'जिन शहरों में हम बनाते हैं' },
    ko: { title: '연결', cities: '시공 도시' },
    ja: { title: '関連', cities: '施工都市' }
  };
  $: cxa = conexActT[lang] || conexActT.es;
  $: hubCities = (() => {
    if (isIndex || !tag) return [];
    const seen = new Set();
    const out = [];
    for (const f of hubFairs) {
      const key = CITY_PILLAR[f.city];
      if (!key || seen.has(key)) continue;
      if (!routes[lang] || routes[lang][key] === undefined) continue;
      seen.add(key);
      out.push({ key, name: cityData[key]?.city?.[lang] || cityData[key]?.city?.es || f.city, country: f.country });
      if (out.length >= 12) break;
    }
    return out;
  })();
  $: connActCount = hubCities.length + siblingTags.length;

  // --- Datos del ÍNDICE --------------------------------------------------------
  // Actividades agrupadas por familia, en el orden de tagFamilies.
  const indexGroups = Object.keys(tagFamilies).map((fam) => ({
    family: fam,
    sector: tagFamilies[fam].sector,
    color: tagFamilies[fam].color,
    tags: tagOrder.filter((tg) => fairTags[tg].family === fam)
  })).filter((g) => g.tags.length);

  // Meta description.
  function stripHtml(s) { return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
  $: metaDesc = isIndex
    ? t.idxDesc
    : (activitySeo?.intro?.[lang] ? stripHtml(activitySeo.intro[lang]).slice(0, 158) : t.hubLead(tagLabel));
  $: pageTitle = isIndex ? t.idxTitle : t.hubTitle(tagLabel);
  $: pageH1 = isIndex ? t.idxH1 : t.hubH1(tagLabel);

  // hreflang/canónica por idioma para el head.
  const headHref = (l) => isIndex ? `https://standarte.es${activityIndexUrl(l)}` : `https://standarte.es${activityUrl(tag, l)}`;

  // JSON-LD: breadcrumb + ItemList.
  $: breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.crumbHome, item: `https://standarte.es${pathFor(lang, 'home')}` },
      { '@type': 'ListItem', position: 2, name: t.crumbAct, item: `https://standarte.es${activityIndexUrl(lang)}` },
      ...(isIndex ? [] : [{ '@type': 'ListItem', position: 3, name: tagLabel, item: canonical }])
    ]
  };
  $: itemListLd = isIndex
    ? { '@context': 'https://schema.org', '@type': 'ItemList', name: pageH1, itemListElement: tagOrder.map((tg, i) => ({ '@type': 'ListItem', position: i + 1, name: labelForTag(tg, lang), url: `https://standarte.es${activityUrl(tg, lang)}` })) }
    : { '@context': 'https://schema.org', '@type': 'ItemList', name: pageH1, itemListElement: [
        ...hubFairs.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f.name, url: `https://standarte.es${fairUrl(f.slug, lang)}` })),
        ...hubProjects.map((p, i) => ({ '@type': 'ListItem', position: hubFairs.length + i + 1, name: p.name, url: `https://standarte.es${projectUrl(p.id, lang)}` }))
      ] };

  const headHrefHome = (l) => `https://standarte.es${pathFor(l, 'home')}`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDesc} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta http-equiv="content-language" content={contentLanguages[lang] || 'es-ES'} />
  <link rel="canonical" href={canonical} />
  {#each languages as alt}
    <link rel="alternate" hreflang={alt} href={headHref(alt)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={headHref('es')} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Standarte" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDesc} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={languageLocales[lang] || 'es_ES'} />
  {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbLd)}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(itemListLd)}<\/script>`}
</svelte:head>

<svelte:window on:scroll|passive={updateScrollState} />
<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={isIndex ? activityIndexUrl(option) : activityUrl(tag, option)} class:active={option === lang} style="display: flex; align-items: center; gap: 8px;">
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
      <a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')}>{preciosNavLabel[lang] || preciosNavLabel.es}</a>
      <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={isIndex ? activityIndexUrl(option) : activityUrl(tag, option)} class:active={option === lang} style="display: flex; align-items: center; gap: 8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <a href="#contact" class="nav-cta-btn" on:click={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>
    </div>
  </nav>
  <div class="hero-subpage">
    <div class="hero-contents act-hero-contents">
      {#if !isIndex}<span class="act-hero-tag" style="--chip:{colorForTag(tag)}"><span class="chip-dot" aria-hidden="true"></span>{tagLabel}</span>{/if}
      <h1>{pageH1}</h1>
      <AiSourceButtons {lang} variant="hero" canReactivate patVisible={showWelcomeAdvisor && !!AdvisorComponent} on:reactivate={reopenAdvisor} />
    </div>
  </div>
</header>

<main class="act-page" class:is-index={isIndex}>
  <!-- Panel de Pat (asesor de Expansión): flotante, se carga diferido. Igual que en la home. -->
  {#if showWelcomeAdvisor && AdvisorComponent}
    <svelte:component this={AdvisorComponent} {lang} initialFamily={presetFamily} initialTags={presetTags} containerBg="#f7f6f1" on:selectFair={handleSelectFair} on:openPrivacy={() => {}} on:dismiss={() => showWelcomeAdvisor = false} />
  {/if}
  <section class="act-details section">
    <div class="act-container">
      <div class="act-text">
        <nav class="breadcrumbs act-breadcrumbs" aria-label="Breadcrumb">
          <ol itemscope itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
              <a itemprop="item" href={pathFor(lang, 'home')}><span itemprop="name">{t.crumbHome}</span></a>
              <meta itemprop="position" content="1" />
            </li>
            <li class="bc-sep" aria-hidden="true"><span class="divider">/</span></li>
            {#if isIndex}
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <span class="current" itemprop="name" aria-current="page">{t.crumbAct}</span>
                <link itemprop="item" href={canonical} />
                <meta itemprop="position" content="2" />
              </li>
            {:else}
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a itemprop="item" href={activityIndexUrl(lang)}><span itemprop="name">{t.crumbAct}</span></a>
                <meta itemprop="position" content="2" />
              </li>
              <li class="bc-sep" aria-hidden="true"><span class="divider">/</span></li>
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <span class="current" itemprop="name" aria-current="page">{tagLabel}</span>
                <link itemprop="item" href={canonical} />
                <meta itemprop="position" content="3" />
              </li>
            {/if}
          </ol>
        </nav>

        {#if isIndex}
          <p class="highlight">{t.idxLead}</p>
          <p class="act-pitch">{activityPitch(lang).text}</p>
          {#each indexGroups as g}
            <h2 class="fam-h" style="--chip:{g.color}"><span class="chip-dot" aria-hidden="true"></span>{familyLabel(g.family, lang)}</h2>
            <ul class="act-card-grid">
              {#each g.tags as tg}
                <li>
                  <a href={activityUrl(tg, lang)} style="--chip:{g.color}">
                    <span class="card-name">{labelForTag(tg, lang)}</span>
                    <span class="card-count">{t.countFairs(fairsForActivity(tg).length)}</span>
                  </a>
                </li>
              {/each}
            </ul>
          {/each}
        {:else}
          <p class="highlight">{activitySeo?.intro?.[lang] ? '' : t.hubLead(tagLabel)}</p>
          {#if activitySeo?.intro?.[lang]}
            <div class="act-intro">{@html activitySeo.intro[lang]}</div>
          {/if}
          <p class="audited-note">{@html pickUspLine(lang, tag)}
            <a href={pathFor(lang, 'proyecto_auditado')}>{uspHome(lang).cta} →</a></p>
          <h2 class="fairs-h">{t.fairsH}</h2>
          {#each hubGroups as grp}
            <h3 class="grp-city">{grp.label}</h3>
            <ul class="fair-list">
              {#each grp.fairs as f}
                <li><a href={fairUrl(f.slug, lang)}>{f.name}</a></li>
              {/each}
            </ul>
          {/each}
          {#if hubProjects.length}
            <h2 class="fairs-h projects-h">{projectsH[lang] || projectsH.es}</h2>
            <ul class="hub-projects">
              {#each hubProjects as pr}
                <li>
                  <a href={projectUrl(pr.id, lang)}>
                    {#if pr.image}<img src={pr.image.replace('.avif', '-thumb.avif')} alt={pr.name} loading="lazy" />{/if}
                    <span class="hp-text">
                      <span class="hp-name">{(pr.title && (pr.title[lang] || pr.title.es)) || pr.name}</span>
                      {#if pr.location}<span class="hp-loc">{pr.location}</span>{/if}
                    </span>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        {/if}
      </div>

      <aside class="act-aside">
        {#if !isIndex}
          <div class="aside-module pat-trigger-module">
            <button type="button" class="pat-trigger" on:click={reopenAdvisor}>
              <span class="pat-trigger-avatar" aria-hidden="true">
                <img src="/img/team/patricia_jimenez-mobile.avif" alt="" loading="lazy" width="40" height="40" />
              </span>
              <span class="pat-trigger-text">{patTrigger[lang] || patTrigger.es}</span>
            </button>
          </div>
        {/if}
        {#if !isIndex && connActCount}
          <!-- Panel "Conexiones": vínculos internos del nodo del mapa de esta actividad
               (ciudades donde la cubrimos + actividades afines). Enlaces <a> reales. -->
          <details class="aside-module fairs-collapse conn-panel">
            <summary class="fairs-collapse-summary">
              <span class="fairs-stack" aria-hidden="true"><span></span><span></span><span></span></span>
              <span class="fairs-collapse-open">{cxa.title} ({connActCount})</span>
              <span class="fairs-collapse-close">{cxa.title}</span>
              <span class="fairs-collapse-chevron" aria-hidden="true"></span>
            </summary>
            <div class="cc-body">
              {#if hubCities.length}
                <div class="cc-group">
                  <span class="cc-label">{cxa.cities}</span>
                  <ul class="cc-fairs">
                    {#each hubCities as c}
                      <li><a href={pathFor(lang, c.key)}>{#if c.country !== 'es'}<span class="fair-flag flag-{c.country}" aria-hidden="true"></span>{/if}{c.name}</a></li>
                    {/each}
                  </ul>
                </div>
              {/if}
              {#if siblingTags.length}
                <div class="cc-group">
                  <span class="cc-label">{t.related}</span>
                  <span class="cc-chips">
                    {#each siblingTags as sg}
                      <a class="cc-chip" href={activityUrl(sg, lang)} style="--chip:{colorForTag(sg)}">{labelForTag(sg, lang)}</a>
                    {/each}
                    <a class="ver-todas-link" href={activityIndexUrl(lang)}>{t.allAct} →</a>
                  </span>
                </div>
              {/if}
            </div>
          </details>
        {/if}
        <div class="aside-module">
          <a class="precios-pill" href={pathFor(lang, 'precios')}>{preciosNav[lang] || preciosNav.es}</a>
        </div>
      </aside>
    </div>
  </section>

  <hr class="act-form-divider" />
  <section class="section grey-bg">
    <ContactForm labels={copy} {lang} variant="light" bind:initialFair={initialFair} />
  </section>
</main>

<SiteFooter {lang} {copy} langHref={(option) => isIndex ? activityIndexUrl(option) : activityUrl(tag, option)} />

<style>
  .act-page { min-height: 100vh; display: flex; flex-direction: column; }
  .static-header { position: relative; background: #16191c; }
  .static-header .nav { z-index: 2; }
  .static-header .hero-subpage { position: relative; z-index: 1; }
  .act-hero-contents { text-align: center; }
  .act-hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 0.9rem; margin-bottom: 1rem;
    border-radius: 999px; font-size: 0.95rem; font-weight: 600;
    color: #fff; background: color-mix(in srgb, var(--chip) 30%, transparent);
    border: 1px solid var(--chip);
  }
  .act-details { padding: 4rem 5%; background: #f7f6f1; }
  .act-container {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: minmax(0, 1fr) 300px;
    gap: 48px; align-items: start;
  }
  /* El cuerpo de texto va sin tarjeta: fondo transparente, sin padding ni sombra
     (tanto en el índice /actividad como en los hubs por actividad). */
  .act-text {
    background: transparent; padding: 0; border-radius: 0;
    box-shadow: none; min-width: 0;
  }
  .highlight {
    font-family: 'Roboto', sans-serif; font-size: 1.4rem; line-height: 1.6;
    font-weight: 400; margin-bottom: 2rem;
  }
  .act-text :global(p) { margin-bottom: 1.5rem; color: var(--text-color); }
  .audited-note {
    margin: 0 0 1.5rem; padding: 0.85rem 1.1rem;
    border-left: 3px solid var(--accent-color, #e0b400);
    background: rgba(224, 180, 0, 0.06); border-radius: 0 6px 6px 0;
    font-size: 1.02rem; line-height: 1.55;
  }
  .audited-note a { font-weight: 700; white-space: nowrap; color: royalblue; }
  .fam-h, .fairs-h {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 1.5rem; margin: 2.5rem 0 1.2rem;
  }
  .fairs-h { margin-top: 1rem; }
  .fam-h:first-of-type { margin-top: 0.5rem; }
  .chip-dot { width: 11px; height: 11px; border-radius: 50%; background: var(--chip); flex: 0 0 auto; }
  .act-card-grid {
    list-style: none; padding: 0; margin: 0 0 1rem;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.8rem;
  }
  .act-card-grid li a {
    display: flex; flex-direction: column; gap: 0.25rem;
    padding: 0.85rem 1rem; text-decoration: none;
    border: 1px solid color-mix(in srgb, var(--chip) 35%, transparent);
    border-left: 5px solid var(--chip); border-radius: 8px;
    background: color-mix(in srgb, var(--chip) 6%, #fff);
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .act-card-grid li a:hover { background: color-mix(in srgb, var(--chip) 14%, #fff); transform: translateY(-2px); }
  .card-name { font-weight: 600; color: #1a1e21; }
  .card-count { font-size: 0.82rem; color: #6b7178; }
  .grp-city { font-size: 1.15rem; margin: 1.6rem 0 0.6rem; color: #1a1e21; }
  .fair-list { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.6rem 1rem; }
  .fair-list li a {
    display: inline-block; padding: 0.45rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 999px;
    font-size: 0.92rem; color: var(--text-color); text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .fair-list li a:hover { border-color: var(--primary); color: var(--primary); }
  .projects-h { margin-top: 2.4rem; }
  .hub-projects {
    list-style: none; padding: 0; margin: 0.4rem 0 0;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;
  }
  .hub-projects li a {
    display: flex; flex-direction: column; text-decoration: none;
    border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;
    background: #fff; transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .hub-projects li a:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1); }
  .hub-projects img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; display: block; background: #ececec; }
  .hp-text { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.7rem 0.85rem; }
  .hp-name { font-weight: 600; color: #1a1e21; font-size: 0.95rem; line-height: 1.35; }
  .hp-loc { font-size: 0.82rem; color: #6b7178; }
  .act-form-divider {
    width: 100%; max-width: 1140px; margin: 0 auto;
    border: 0; border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
  .grey-bg { background: #f7f6f1; padding: 4rem 5%; }
  .act-aside { border-left: 1px solid rgba(0, 0, 0, 0.12); padding-left: 40px; position: sticky; top: 100px; }
  .act-aside h3 { font-size: 1.4rem; margin: 0 0 1.2rem; }
  .aside-module + .aside-module { margin-top: 2rem; }
  /* Disparador del panel de Pat: abre el asesor solo al pulsar (ya no auto-abre). */
  .pat-trigger {
    display: flex; align-items: center; gap: 0.75rem; width: 100%;
    padding: 0.85rem 1rem; border: none;
    border-radius: 10px; background: #16191c; color: #fff;
    text-align: left; cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .pat-trigger:hover { background: #23272b; transform: translateY(-1px); }
  .pat-trigger-avatar img {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
    display: block; flex: 0 0 auto; border: 2px solid #ffc800;
  }
  .pat-trigger-text {
    font-family: 'Roboto', sans-serif; font-size: 1.02rem; line-height: 1.3;
  }
  .activity-chips { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.35rem; }
  /* Etiquetas estilo "badge": píldora suave y compacta, con borde fino del color de la
     actividad (--chip). Aspecto idéntico al de feria y ciudad. */
  .activity-chips li a {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.2rem 0.62rem; font-size: 0.9rem; font-weight: 500;
    color: color-mix(in srgb, var(--chip) 62%, #12211a); text-decoration: none;
    border: 1px solid var(--chip); border-radius: 999px;
    background: color-mix(in srgb, var(--chip) 12%, #fff);
    transition: background 0.2s ease;
  }
  .activity-chips li a:hover { background: color-mix(in srgb, var(--chip) 20%, #fff); }
  /* Dentro de las píldoras el punto es de 7px (fuera, en hero/familia, sigue a 11px). */
  .activity-chips .chip-dot { width: 7px; height: 7px; }
  .cluster-pillar {
    display: inline-block; font-weight: 600; color: var(--primary); text-decoration: none;
    border-bottom: 2px solid var(--primary); padding-bottom: 2px;
  }
  .cluster-pillar:hover { opacity: 0.8; }
  @media (max-width: 900px) {
    .act-container { grid-template-columns: 1fr; gap: 32px; max-width: 800px; }
    .act-aside { border-left: none; border-top: 1px solid rgba(0, 0, 0, 0.12); padding-left: 0; padding-top: 28px; position: static; }
  }
</style>
