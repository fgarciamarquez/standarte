<script>
  // Gemelo SEO server-renderizado de la malla de Pat (PatMesh es solo-cliente y no
  // entra en el prerender). Emite el MISMO grafo de cobertura como HTML real y
  // rastreable: la matriz ciudad↔actividad como texto (citable por motores de IA)
  // y un enlazado interno limpio: cada ciudad → su página-ciudad, cada actividad →
  // su hub /actividad. Sin JS ni animación: presente en el HTML estático.
  // Mejora progresiva: el SVG interactivo (PatMesh) es la capa visual para humanos;
  // este bloque es la capa semántica para buscadores y crawlers de IA.
  import { fairsData } from '$lib/fairsData.js';
  import { tagFamilies, fairTags, fairActivities, labelForTag, familyLabel } from '$lib/fairTags.js';
  import { pathFor, activityUrl } from '$lib/siteData.js';
  import { CITY_POINTS, CITY_PILLAR } from '$lib/iberiaMeshData.js';

  export let lang = 'es';

  // Matriz ciudad → actividades, derivada de fairsData (solo ciudades con punto en
  // el mapa, con página-pilar y con ferias etiquetadas). Se calcula una vez.
  const cityTagSet = {};
  const usedTags = new Set();
  for (const f of fairsData) {
    if (!CITY_POINTS[f.city] || !CITY_PILLAR[f.city]) continue;
    const tags = fairActivities[f.slug];
    if (!tags || !tags.length) continue;
    cityTagSet[f.city] = cityTagSet[f.city] || new Set();
    for (const t of tags) { cityTagSet[f.city].add(t); usedTags.add(t); }
  }
  const cityNames = Object.keys(cityTagSet).sort((a, b) => a.localeCompare(b, 'es'));

  // Actividades usadas, agrupadas por familia (sector) — para el directorio de sectores.
  const famOrder = Object.keys(tagFamilies);
  const tagsByFamily = famOrder
    .map((fam) => ({
      fam,
      tags: [...usedTags].filter((t) => fairTags[t].family === fam)
        .sort((a, b) => labelForTag(a, 'es').localeCompare(labelForTag(b, 'es'), 'es'))
    }))
    .filter((g) => g.tags.length);

  // Ciudades con enlace + etiquetas de sus actividades como texto (la relación,
  // citable). El nombre de ciudad enlaza a su página-pilar.
  $: cities = cityNames.map((name) => ({
    name,
    href: pathFor(lang, CITY_PILLAR[name]),
    acts: [...cityTagSet[name]]
      .map((t) => labelForTag(t, lang))
      .sort((a, b) => a.localeCompare(b, lang))
  }));

  $: sectors = tagsByFamily.map((g) => ({
    label: familyLabel(g.fam, lang),
    acts: g.tags.map((t) => ({ label: labelForTag(t, lang), url: activityUrl(t, lang) }))
  }));

  const T = {
    es: { heading: 'Cobertura de ferias en España y Portugal, ciudad por ciudad', intro: 'Diseñamos y montamos stands en cada una de estas ciudades y para estos sectores de actividad, con el mismo taller propio y la misma garantía de Proyecto Auditado. Esta es la malla de cobertura ferial de Standarte, la más amplia del mercado ibérico.', summary: 'Ver todas las ciudades y sectores de nuestra cobertura', citiesLabel: 'Ciudades y sus sectores feriales', sectorsLabel: 'Sectores y actividades' },
    en: { heading: 'Trade fair coverage across Spain and Portugal, city by city', intro: 'We design and build stands in every one of these cities and for these activity sectors, with the same in-house workshop and the same Audited Project guarantee. This is Standarte’s trade fair coverage mesh, the widest in the Iberian market.', summary: 'See every city and sector we cover', citiesLabel: 'Cities and their fair sectors', sectorsLabel: 'Sectors and activities' },
    pt: { heading: 'Cobertura de feiras em Espanha e Portugal, cidade a cidade', intro: 'Concebemos e montamos stands em cada uma destas cidades e para estes setores de atividade, com a mesma oficina própria e a mesma garantia de Projeto Auditado. Esta é a malha de cobertura de feiras da Standarte, a mais ampla do mercado ibérico.', summary: 'Ver todas as cidades e setores da nossa cobertura', citiesLabel: 'Cidades e os seus setores de feira', sectorsLabel: 'Setores e atividades' },
    de: { heading: 'Messeabdeckung in Spanien und Portugal, Stadt für Stadt', intro: 'Wir gestalten und bauen Stände in jeder dieser Städte und für diese Branchen, mit der eigenen Werkstatt und der Garantie des Auditierten Projekts. Dies ist das Messeabdeckungsnetz von Standarte, das breiteste auf dem iberischen Markt.', summary: 'Alle Städte und Branchen unserer Abdeckung ansehen', citiesLabel: 'Städte und ihre Messebranchen', sectorsLabel: 'Branchen und Aktivitäten' },
    fr: { heading: 'Couverture des salons en Espagne et au Portugal, ville par ville', intro: 'Nous concevons et montons des stands dans chacune de ces villes et pour ces secteurs d’activité, avec le même atelier intégré et la même garantie de Projet Audité. Voici le maillage de couverture salons de Standarte, le plus large du marché ibérique.', summary: 'Voir toutes les villes et secteurs de notre couverture', citiesLabel: 'Villes et leurs secteurs de salon', sectorsLabel: 'Secteurs et activités' },
    it: { heading: 'Copertura fieristica in Spagna e Portogallo, città per città', intro: 'Progettiamo e montiamo stand in ognuna di queste città e per questi settori di attività, con lo stesso laboratorio di proprietà e la stessa garanzia di Progetto Verificato. Questa è la rete di copertura fieristica di Standarte, la più ampia del mercato iberico.', summary: 'Vedi tutte le città e i settori della nostra copertura', citiesLabel: 'Città e i loro settori fieristici', sectorsLabel: 'Settori e attività' },
    nl: { heading: 'Beursdekking in Spanje en Portugal, stad voor stad', intro: 'Wij ontwerpen en bouwen stands in elk van deze steden en voor deze activiteitensectoren, met dezelfde eigen werkplaats en dezelfde Gecontroleerd Project-garantie. Dit is het beursdekkingsnetwerk van Standarte, het breedste op de Iberische markt.', summary: 'Bekijk alle steden en sectoren van onze dekking', citiesLabel: 'Steden en hun beurssectoren', sectorsLabel: 'Sectoren en activiteiten' },
    zh: { heading: '西班牙与葡萄牙展会覆盖，逐城市呈现', intro: '我们在这些城市以及这些行业领域设计并搭建展台，均由自有工厂完成并享有审计项目保障。这就是 Standarte 的展会覆盖网络，伊比利亚市场覆盖最广。', summary: '查看我们覆盖的所有城市与行业', citiesLabel: '城市及其展会行业', sectorsLabel: '行业与活动' },
    hi: { heading: 'स्पेन और पुर्तगाल में मेलों की कवरेज, शहर-दर-शहर', intro: 'हम इन सभी शहरों में और इन गतिविधि क्षेत्रों के लिए स्टैंड डिज़ाइन और निर्माण करते हैं, अपनी ही कार्यशाला से और ऑडिटेड प्रोजेक्ट की गारंटी के साथ। यह Standarte का मेला कवरेज नेटवर्क है, जो इबेरियन बाज़ार में सबसे व्यापक है।', summary: 'हमारी कवरेज के सभी शहर और क्षेत्र देखें', citiesLabel: 'शहर और उनके मेला क्षेत्र', sectorsLabel: 'क्षेत्र और गतिविधियाँ' },
    ko: { heading: '스페인과 포르투갈 전시회 커버리지, 도시별', intro: '저희는 이 모든 도시와 이러한 활동 분야에서 부스를 디자인하고 시공합니다. 모두 자체 공방과 감사 프로젝트 보증으로 진행됩니다. 이것이 이베리아 시장에서 가장 넓은 Standarte의 전시회 커버리지 네트워크입니다.', summary: '저희가 커버하는 모든 도시와 분야 보기', citiesLabel: '도시와 전시 분야', sectorsLabel: '분야 및 활동' },
    ja: { heading: 'スペイン・ポルトガルの展示会カバレッジ、都市ごと', intro: '当社はこれらすべての都市で、そしてこれらの業種分野で展示会ブースの設計・施工を行います。すべて自社工房で、監査プロジェクトの保証付きです。これが、イベリア市場で最も広い Standarte の展示会カバレッジ網です。', summary: '当社がカバーするすべての都市と分野を見る', citiesLabel: '都市とその展示会分野', sectorsLabel: '分野と活動' }
  };
  $: t = T[lang] || T.es;
</script>

<section class="mesh-seo" aria-label={t.heading}>
  <h2>{t.heading}</h2>
  <p class="mesh-seo-intro">{t.intro}</p>
  <details class="mesh-seo-details">
    <summary>[ {t.summary} ]</summary>
    <div class="mesh-seo-cols">
      <div class="mesh-seo-col">
        <h3>{t.citiesLabel}</h3>
        <ul class="mesh-seo-cities">
          {#each cities as c}
            <li><a href={c.href}>{c.name}</a> — <span class="mesh-seo-acts">{c.acts.join(', ')}</span></li>
          {/each}
        </ul>
      </div>
      <div class="mesh-seo-col">
        <h3>{t.sectorsLabel}</h3>
        <ul class="mesh-seo-sectors">
          {#each sectors as s}
            <li><strong>{s.label}:</strong>
              {#each s.acts as a, i}<a href={a.url}>{a.label}</a>{#if i < s.acts.length - 1}, {/if}{/each}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </details>
</section>

<style>
  .mesh-seo {
    max-width: 960px;
    margin: 0 auto 1.6rem;
    padding: 0 1rem;
    text-align: center;
  }
  .mesh-seo h2 { margin: 0 0 0.6rem; }
  .mesh-seo-intro {
    max-width: 820px;
    margin: 0 auto 1rem;
    color: #444;
  }
  .mesh-seo-details {
    text-align: left;
  }
  .mesh-seo-details > summary {
    cursor: pointer;
    padding: 0.9rem 0;
    font-family: 'Inconsolata', monospace;
    font-weight: 400;
    color: royalblue;
    text-align: center;
    list-style: none;
  }
  .mesh-seo-details > summary::-webkit-details-marker { display: none; }
  .mesh-seo-details > summary::marker { content: ''; }
  .mesh-seo-details[open] > summary { margin-bottom: 1rem; }
  .mesh-seo-cols {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;
    padding-bottom: 1.2rem;
  }
  @media (min-width: 760px) {
    .mesh-seo-cols { grid-template-columns: 1.2fr 1fr; }
  }
  .mesh-seo-col h3 {
    font-size: 1rem;
    margin: 0 0 0.6rem;
  }
  .mesh-seo-cities, .mesh-seo-sectors {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .mesh-seo-cities li, .mesh-seo-sectors li { margin-bottom: 0.35rem; }
  .mesh-seo-acts { color: #666; }
  .mesh-seo a { color: #27408b; text-decoration: none; }
  .mesh-seo a:hover { text-decoration: underline; }
</style>
