<script>
  // Sidebar de las páginas de ciudad (botones de ciudades + casos de éxito + ferias de la
  // zona), reutilizable. En el blog se usa con section="madrid". Las clases de estilo son
  // globales (app.css), así que aquí solo va el markup + los datos.
  import { cityData, pathFor, portfolios, fairUrl } from '$lib/siteData.js';
  import { fairsData } from '$lib/fairsData.js';

  export let lang = 'es';
  export let section = 'madrid';

  const CITY_NAV_KEYS = Object.keys(cityData).filter((k) => !k.startsWith('montaje_'));
  function cityLabel(ck, l) {
    return cityData[ck]?.city?.[l] || cityData[ck]?.city?.es;
  }
  const CITY_NAV_LABELS = {
    es: 'Ciudades', en: 'Cities', de: 'Städte', fr: 'Villes', it: 'Città', pt: 'Cidades',
    zh: '城市', hi: 'शहर', ko: '도시', ja: '都市', nl: 'Steden'
  };
  const SECTION_REGION = {
    madrid: 'madrid', barcelona: 'cataluna', bilbao: 'paisvasco', malaga: 'andalucia',
    sevilla: 'andalucia', ciudad_real: 'castillalamancha', lisboa: 'portugal', oporto: 'portugal',
    valencia: 'comunidadvalenciana', mallorca: 'baleares', vigo: 'galicia', batalha: 'portugal',
    zaragoza: 'aragon', badajoz: 'extremadura', portugal_sur: 'portugal-sur'
  };
  const FAIR_CITY_REGION = {
    'Badajoz': 'extremadura', 'Don Benito': 'extremadura', 'Almendralejo': 'extremadura',
    'Plasencia': 'extremadura', 'Mérida': 'extremadura', 'Zafra': 'extremadura', 'Cáceres': 'extremadura',
    'Madrid': 'madrid', 'Barcelona': 'cataluna', 'Bilbao': 'paisvasco', 'Málaga': 'andalucia',
    'Sevilla': 'andalucia', 'Ciudad Real': 'castillalamancha', 'Lisboa': 'portugal', 'Oporto': 'portugal',
    'Batalha': 'portugal', 'Valencia': 'comunidadvalenciana', 'Mallorca': 'baleares', 'Zaragoza': 'aragon',
    'Vigo': 'galicia', 'Portugal Sur': 'portugal-sur'
  };
  const FEATURED_BY_REGION = {
    extremadura: ['Bellota', 'Intermaher', 'Elumatec'],
    portugal: ['Philips', 'Tecnalia', 'Pharmatechnik'],
    paisvasco: ['Intermaher', 'Bellota', 'Elumatec'],
    madrid: ['Pescanova', 'Philips', 'Fanuc'],
    aragon: ['Intermaher', 'Zayer', 'Bellota']
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
  const successTitle = {
    es: 'Casos de Éxito', en: 'Success Stories', de: 'Erfolgsgeschichten', zh: '成功案例',
    hi: 'सफलता की कहानियाँ', pt: 'Casos de Sucesso', fr: 'Histoires de Réussite',
    it: 'Storie di Successo', ja: '導入事例', nl: 'Succesverhalen', ko: '성공 사례'
  };

  function getProjectTitle(p) {
    if (p?.title) return p.title[lang] || p.title.es || p.name;
    return p?.alt || p?.name || '';
  }
  function projectDescription(p) {
    return p?.description?.[lang] || p?.description?.es || '';
  }

  $: sortedCityKeys = [...CITY_NAV_KEYS].sort((a, b) => cityLabel(a, lang).localeCompare(cityLabel(b, lang), lang));
  $: region = SECTION_REGION[section];
  $: selectedPortfolios = (FEATURED_BY_REGION[region] || [])
    .map((k) => portfolios.find((p) => p.alt && p.alt.includes(k)))
    .filter(Boolean)
    .concat(portfolios.slice(0, 3))
    .slice(0, 3);
  $: regionFairs = region ? fairsData.filter((f) => FAIR_CITY_REGION[f.city] === region) : [];
</script>

<aside class="seo-sidebar">
  <div class="sidebar-sticky">
    <div class="city-nav-module">
      <h3>{CITY_NAV_LABELS[lang] || CITY_NAV_LABELS.es}</h3>
      <ul class="city-fairs-list">
        {#each sortedCityKeys as ck}
          <li>
            <a href={pathFor(lang, ck)} class:active={ck === section}>
              {cityLabel(ck, lang)}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="spotlight-card">
      <h3>{successTitle[lang] || successTitle.es}</h3>
      <div class="sidebar-projects">
        {#each selectedPortfolios as project}
          <div class="sidebar-project-card">
            <img src={`/${project.thumb.replace(/\.avif$/, '-sb.avif')}`} alt={getProjectTitle(project)} class="sidebar-project-img" width="300" height="169" loading="lazy" decoding="async" />
            <div class="sidebar-project-info">
              <h4>{getProjectTitle(project)}</h4>
              <p>{projectDescription(project)}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    {#if regionFairs.length}
      <section class="city-fairs sidebar-module" aria-label={cityFairsLabel[lang] || cityFairsLabel.es}>
        <h2>{cityFairsLabel[lang] || cityFairsLabel.es}</h2>
        <ul class="city-fairs-list">
          {#each regionFairs as fair}
            <li><a href={fairUrl(fair.slug, lang)}>{fair.name}</a></li>
          {/each}
        </ul>
      </section>
    {/if}
  </div>
</aside>
