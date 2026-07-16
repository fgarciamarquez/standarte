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
    es: { heading: 'Cobertura de ferias en España y Portugal, ciudad por ciudad', summary: 'Ver todas las ciudades', citiesLabel: 'Ciudades y sus sectores feriales', sectorsLabel: 'Sectores y actividades',
      featureTitle: 'Cómo funciona: explora ferias por sector y ahorra en campañas completas',
      featureExplore: 'Standarte organiza toda su cobertura ferial por sector y por actividad concreta. Puedes explorar las ferias filtrando por tu industria (salud, agroalimentario, tecnología, etc.) y afinar por la actividad exacta (farmacia, veterinaria, congreso médico…), de modo que ves de un vistazo en qué ferias de España y Portugal encaja tu marca y a qué ciudades te podemos llevar.',
      featureSavings: 'Como diseñamos, fabricamos en taller propio y montamos con un único interlocutor en toda la península, no hace falta contratar feria a feria: puedes planificar una campaña completa de varias ferias a la vez. Al contratar más de un stand con nosotros obtienes un ahorro real gracias a las sinergias de una sola producción (reutilización y adaptación de elementos modulares, logística compartida y gestión centralizada). Es la forma más eficiente de escalar tu presencia comercial por sectores sin multiplicar costes.' },
    en: { heading: 'Trade fair coverage across Spain and Portugal, city by city', summary: 'See all cities', citiesLabel: 'Cities and their fair sectors', sectorsLabel: 'Sectors and activities',
      featureTitle: 'How it works: explore fairs by sector and save on full campaigns',
      featureExplore: 'Standarte organises its entire trade-fair coverage by sector and by specific activity. You can explore fairs by filtering by your industry (health, agri-food, technology, etc.) and narrow down to the exact activity (pharmacy, veterinary, medical congress…), so you can see at a glance which fairs in Spain and Portugal fit your brand and which cities we can take you to.',
      featureSavings: 'Because we design, manufacture in our own workshop and assemble with a single point of contact across the whole peninsula, there is no need to hire fair by fair: you can plan a complete campaign of several fairs at once. By booking more than one stand with us you get real savings thanks to the synergies of a single production run (reuse and adaptation of modular elements, shared logistics and centralised management). It is the most efficient way to scale your commercial presence by sector without multiplying costs.' },
    pt: { heading: 'Cobertura de feiras em Espanha e Portugal, cidade a cidade', summary: 'Ver todas as cidades', citiesLabel: 'Cidades e os seus setores de feira', sectorsLabel: 'Setores e atividades',
      featureTitle: 'Como funciona: explore feiras por setor e poupe em campanhas completas',
      featureExplore: 'A Standarte organiza toda a sua cobertura de feiras por setor e por atividade concreta. Pode explorar as feiras filtrando pela sua indústria (saúde, agroalimentar, tecnologia, etc.) e afinar pela atividade exata (farmácia, veterinária, congresso médico…), para ver de relance em que feiras de Espanha e Portugal a sua marca encaixa e a que cidades o podemos levar.',
      featureSavings: 'Como concebemos, fabricamos em oficina própria e montamos com um único interlocutor em toda a península, não é preciso contratar feira a feira: pode planear uma campanha completa de várias feiras ao mesmo tempo. Ao contratar mais do que um stand connosco obtém uma poupança real graças às sinergias de uma só produção (reutilização e adaptação de elementos modulares, logística partilhada e gestão centralizada). É a forma mais eficiente de escalar a sua presença comercial por setores sem multiplicar custos.' },
    de: { heading: 'Messeabdeckung in Spanien und Portugal, Stadt für Stadt', summary: 'Alle Städte ansehen', citiesLabel: 'Städte und ihre Messebranchen', sectorsLabel: 'Branchen und Aktivitäten',
      featureTitle: 'So funktioniert es: Messen nach Branche erkunden und bei kompletten Kampagnen sparen',
      featureExplore: 'Standarte gliedert seine gesamte Messeabdeckung nach Branche und konkreter Aktivität. Sie können Messen nach Ihrer Branche filtern (Gesundheit, Agrar- und Lebensmittel, Technologie usw.) und nach der genauen Aktivität eingrenzen (Pharmazie, Veterinär, Ärztekongress…), sodass Sie auf einen Blick sehen, zu welchen Messen in Spanien und Portugal Ihre Marke passt und in welche Städte wir Sie begleiten können.',
      featureSavings: 'Da wir mit einem einzigen Ansprechpartner auf der gesamten Halbinsel entwerfen, in eigener Werkstatt fertigen und montieren, müssen Sie nicht Messe für Messe buchen: Sie können eine komplette Kampagne mit mehreren Messen auf einmal planen. Wenn Sie mehr als einen Stand bei uns buchen, erhalten Sie dank der Synergien einer einzigen Produktion echte Einsparungen (Wiederverwendung und Anpassung modularer Elemente, gemeinsame Logistik und zentrale Verwaltung). Das ist der effizienteste Weg, Ihre Geschäftspräsenz nach Branchen zu skalieren, ohne die Kosten zu vervielfachen.' },
    fr: { heading: 'Couverture des salons en Espagne et au Portugal, ville par ville', summary: 'Voir toutes les villes', citiesLabel: 'Villes et leurs secteurs de salon', sectorsLabel: 'Secteurs et activités',
      featureTitle: 'Comment ça marche : explorez les salons par secteur et économisez sur des campagnes complètes',
      featureExplore: 'Standarte organise toute sa couverture de salons par secteur et par activité précise. Vous pouvez explorer les salons en filtrant par votre secteur (santé, agroalimentaire, technologie, etc.) et affiner par l’activité exacte (pharmacie, vétérinaire, congrès médical…), afin de voir d’un coup d’œil à quels salons d’Espagne et du Portugal votre marque correspond et dans quelles villes nous pouvons vous emmener.',
      featureSavings: 'Comme nous concevons, fabriquons dans notre propre atelier et montons avec un interlocuteur unique dans toute la péninsule, inutile de réserver salon par salon : vous pouvez planifier une campagne complète de plusieurs salons à la fois. En réservant plus d’un stand avec nous, vous réalisez de véritables économies grâce aux synergies d’une seule production (réutilisation et adaptation d’éléments modulaires, logistique partagée et gestion centralisée). C’est la façon la plus efficace de développer votre présence commerciale par secteurs sans multiplier les coûts.' },
    it: { heading: 'Copertura fieristica in Spagna e Portogallo, città per città', summary: 'Vedi tutte le città', citiesLabel: 'Città e i loro settori fieristici', sectorsLabel: 'Settori e attività',
      featureTitle: 'Come funziona: esplora le fiere per settore e risparmia sulle campagne complete',
      featureExplore: 'Standarte organizza tutta la sua copertura fieristica per settore e per attività specifica. Puoi esplorare le fiere filtrando per il tuo settore (salute, agroalimentare, tecnologia, ecc.) e affinare per l’attività esatta (farmacia, veterinaria, congresso medico…), così da vedere a colpo d’occhio in quali fiere di Spagna e Portogallo si colloca il tuo marchio e in quali città possiamo portarti.',
      featureSavings: 'Poiché progettiamo, produciamo nel nostro laboratorio e montiamo con un unico interlocutore in tutta la penisola, non serve contrattare fiera per fiera: puoi pianificare una campagna completa di più fiere insieme. Prenotando più di uno stand con noi ottieni un risparmio reale grazie alle sinergie di un’unica produzione (riutilizzo e adattamento di elementi modulari, logistica condivisa e gestione centralizzata). È il modo più efficiente per scalare la tua presenza commerciale per settori senza moltiplicare i costi.' },
    nl: { heading: 'Beursdekking in Spanje en Portugal, stad voor stad', summary: 'Bekijk alle steden', citiesLabel: 'Steden en hun beurssectoren', sectorsLabel: 'Sectoren en activiteiten',
      featureTitle: 'Zo werkt het: verken beurzen per sector en bespaar op volledige campagnes',
      featureExplore: 'Standarte ordent zijn volledige beursdekking per sector en per specifieke activiteit. U kunt beurzen verkennen door te filteren op uw branche (gezondheid, agrofood, technologie, enz.) en verfijnen op de exacte activiteit (farmacie, veterinair, medisch congres…), zodat u in één oogopslag ziet bij welke beurzen in Spanje en Portugal uw merk past en naar welke steden wij u kunnen brengen.',
      featureSavings: 'Omdat wij ontwerpen, in onze eigen werkplaats produceren en monteren met één aanspreekpunt in het hele schiereiland, hoeft u niet beurs voor beurs te boeken: u kunt een volledige campagne van meerdere beurzen tegelijk plannen. Door meer dan één stand bij ons te boeken bespaart u echt dankzij de synergie van één productie (hergebruik en aanpassing van modulaire elementen, gedeelde logistiek en centraal beheer). Het is de meest efficiënte manier om uw commerciële aanwezigheid per sector op te schalen zonder de kosten te vermenigvuldigen.' },
    zh: { heading: '西班牙与葡萄牙展会覆盖，逐城市呈现', summary: '查看所有城市', citiesLabel: '城市及其展会行业', sectorsLabel: '行业与活动',
      featureTitle: '运作方式：按行业探索展会，并在整体营销活动中节省成本',
      featureExplore: 'Standarte 将其全部展会覆盖按行业和具体活动进行整理。您可以按所在行业筛选展会（医疗、农业食品、科技等），并细化到具体活动（药房、兽医、医学大会……），从而一目了然地看到您的品牌适合西班牙和葡萄牙的哪些展会，以及我们能带您前往哪些城市。',
      featureSavings: '由于我们在整个伊比利亚半岛以单一对接人进行设计、自有工厂生产和搭建，您无需逐个展会单独签约：可以一次规划涵盖多场展会的完整营销活动。与我们预订超过一个展位，即可凭借单次生产的协同效应获得实实在在的节省（模块化元素的复用与改造、共享物流与集中管理）。这是按行业扩展您商业布局、又不成倍增加成本的最高效方式。' },
    hi: { heading: 'स्पेन और पुर्तगाल में मेलों की कवरेज, शहर-दर-शहर', summary: 'सभी शहर देखें', citiesLabel: 'शहर और उनके मेला क्षेत्र', sectorsLabel: 'क्षेत्र और गतिविधियाँ',
      featureTitle: 'यह कैसे काम करता है: क्षेत्र के अनुसार मेले खोजें और पूरी मुहिम में बचत करें',
      featureExplore: 'Standarte अपनी पूरी मेला कवरेज को क्षेत्र और विशिष्ट गतिविधि के अनुसार व्यवस्थित करता है। आप अपनी इंडस्ट्री (स्वास्थ्य, कृषि-खाद्य, तकनीक आदि) के अनुसार मेलों को फ़िल्टर कर सकते हैं और सटीक गतिविधि (फार्मेसी, पशु चिकित्सा, चिकित्सा सम्मेलन…) तक सीमित कर सकते हैं, ताकि एक नज़र में देख सकें कि आपका ब्रांड स्पेन और पुर्तगाल के किन मेलों में फिट बैठता है और हम आपको किन शहरों में ले जा सकते हैं।',
      featureSavings: 'चूँकि हम पूरे प्रायद्वीप में एक ही संपर्क-व्यक्ति के साथ डिज़ाइन, अपनी कार्यशाला में निर्माण और असेंबली करते हैं, आपको हर मेले के लिए अलग-अलग अनुबंध करने की ज़रूरत नहीं: आप एक साथ कई मेलों की पूरी मुहिम की योजना बना सकते हैं। हमारे साथ एक से अधिक स्टैंड बुक करने पर एक ही उत्पादन की सिनर्जी के कारण वास्तविक बचत मिलती है (मॉड्यूलर तत्वों का पुनः उपयोग और अनुकूलन, साझा लॉजिस्टिक्स और केंद्रीकृत प्रबंधन)। लागत को कई गुना बढ़ाए बिना क्षेत्र-वार अपनी व्यावसायिक उपस्थिति बढ़ाने का यह सबसे कुशल तरीका है।' },
    ko: { heading: '스페인과 포르투갈 전시회 커버리지, 도시별', summary: '모든 도시 보기', citiesLabel: '도시와 전시 분야', sectorsLabel: '분야 및 활동',
      featureTitle: '작동 방식: 분야별로 전시회를 탐색하고 전체 캠페인에서 비용을 절감하세요',
      featureExplore: 'Standarte는 전체 전시회 커버리지를 분야와 구체적인 활동별로 정리합니다. 귀사의 업종(의료, 농식품, 기술 등)으로 전시회를 필터링하고 정확한 활동(약국, 수의, 의학 학술대회 등)까지 좁힐 수 있어, 귀사의 브랜드가 스페인과 포르투갈의 어느 전시회에 맞는지, 어느 도시로 모실 수 있는지 한눈에 확인할 수 있습니다.',
      featureSavings: '저희는 이베리아 반도 전역에서 단일 창구로 디자인·자체 공방 제작·시공을 진행하므로 전시회마다 따로 계약할 필요가 없습니다. 여러 전시회를 아우르는 완전한 캠페인을 한 번에 계획할 수 있습니다. 저희와 부스를 두 개 이상 예약하시면 단일 생산의 시너지(모듈형 요소의 재사용·개조, 물류 공유, 중앙 관리)를 통해 실질적인 비용 절감을 얻으실 수 있습니다. 비용을 배가하지 않고 분야별로 상업적 입지를 확장하는 가장 효율적인 방법입니다.' },
    ja: { heading: 'スペイン・ポルトガルの展示会カバレッジ、都市ごと', summary: 'すべての都市を見る', citiesLabel: '都市とその展示会分野', sectorsLabel: '分野と活動',
      featureTitle: '仕組み：業種で展示会を探索し、キャンペーン全体でコストを削減',
      featureExplore: 'Standarteは、展示会カバレッジ全体を業種と具体的な活動ごとに整理しています。貴社の業界（医療、農食品、テクノロジーなど）で展示会を絞り込み、さらに正確な活動（薬局、獣医、医学会議など）まで絞ることができます。これにより、貴社のブランドがスペインとポルトガルのどの展示会に適し、どの都市へご案内できるかが一目でわかります。',
      featureSavings: '当社は半島全域を単一の窓口で設計し、自社工房で製作・設営するため、展示会ごとに個別契約する必要はありません。複数の展示会にまたがる完全なキャンペーンを一度に計画できます。当社でブースを2つ以上ご契約いただくと、単一生産のシナジー（モジュール要素の再利用・改修、物流の共有、一元管理）により、実質的なコスト削減が得られます。コストを何倍にもせず、業種ごとに商業的プレゼンスを拡大する最も効率的な方法です。' }
  };
  $: t = T[lang] || T.es;
</script>

<!-- Sección sin encabezado ni entradilla: la malla de enlaces va en un <details> CERRADO
     por defecto. Así el contenido está en el HTML (rastreable por buscadores = SEO) pero
     oculto a la vista, para no servir la lista completa de enlaces a la competencia. El
     aria-label conserva el nombre accesible de la sección. -->
<section class="mesh-seo" aria-label={t.heading}>
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
        <!-- Explicación pormenorizada (texto real, rastreable por IA): la exploración
             de ferias por sector/actividad y el ahorro al planificar campañas completas.
             Va bajo la lista de "Sectores y actividades", aprovechando su hueco. -->
        <div class="mesh-seo-feature">
          <h3>{t.featureTitle}</h3>
          <p>{t.featureExplore}</p>
          <p>{t.featureSavings}</p>
        </div>
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
  .mesh-seo-details {
    text-align: left;
  }
  .mesh-seo-details > summary {
    cursor: pointer;
    padding: 0.9rem 0;
    font-family: 'Inconsolata', monospace;
    font-weight: 400;
    font-size: 0.8rem;
    color: #7a7f76;
    text-align: center;
    list-style: none;
  }
  .mesh-seo-details > summary::-webkit-details-marker { display: none; }
  .mesh-seo-details > summary::marker { content: ''; }
  .mesh-seo-details[open] > summary { margin-bottom: 1rem; }
  /* Explicación de la super-característica: texto legible y citable. */
  /* Bloque explicativo bajo la lista de sectores, ocupando el hueco de la columna. */
  .mesh-seo-feature {
    margin-top: 1.2rem;
    padding-top: 1.1rem;
    border-top: 1px solid #e6e6e0;
    font-size: 0.9rem;
    line-height: 1.55;
    color: #444;
  }
  .mesh-seo-feature h3 { font-size: 1rem; margin: 0 0 0.5rem; color: #1a1e21; }
  .mesh-seo-feature p { margin: 0 0 0.7rem; }
  .mesh-seo-feature p:last-child { margin-bottom: 0; }
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
