// Composición SEO de los H2 de apartado en páginas de ciudad y de feria.
// Patrón (2026-08-27): cada H2 reincide en la expresión objetivo de la página
// —"{expresión común}: {parte particular}"— para que todos los encabezados
// empujen el mismo objetivo en vez de posicionar por separado (estructura que
// Google lee como contenido correctamente jerarquizado; referencia observada
// en competidores que lo aplican de forma sistemática).
//   Ciudad → "Stands para ferias en {ciudad}: ferias y sectores"
// 22/09/2026: en las páginas de ciudad el patrón se REPARTE entre tres expresiones para
// que la página posicione también las búsquedas cortas «diseño de stands en X» y
// «montaje de stands en X» (antes no aparecían literalmente ni una vez):
//   diseño  → apartados de proceso y tipos ("Diseño de stands en {ciudad}: …")
//   montaje → documentación técnica, plazos, logística y fechas ("Montaje de stands en {ciudad}: …")
//   común   → el resto ("Stands para ferias en {ciudad}: …")
//   Feria  → "Stands para {feria}: servicios para expositores"
// La expresión es neutra de marca: sirve igual en Standarte y StandQuote.

// Locativo en portugués: las plazas con artículo no admiten «em» a secas —«em Porto»
// suena a traducción automática a cualquier lector de Portugal—; llevan «no», «na» o
// «nas». Se decide por el nombre en portugués de la plaza (cityData[k].city.pt); lo
// que no está en la lista va con «em» (Lisboa, Madrid, Bilbau…).
const PT_ARTICLE = { 'Porto': 'no', 'Batalha': 'na', 'Peso da Régua': 'no', 'sul de Portugal': 'no', 'Sul de Portugal': 'no', 'Madeira': 'na', 'Ilhas da Madeira': 'nas', 'Ilhas Canárias': 'nas', 'Algarve': 'no' };
export const ptLocative = (c) => `${PT_ARTICLE[c] || 'em'} ${c}`;

// Prefijo común de las páginas de CIUDAD, por idioma.
const CITY_PREFIX = {
  es: (c) => `Stands para ferias en ${c}`,
  en: (c) => `Trade fair stands in ${c}`,
  de: (c) => `Messestände in ${c}`,
  pt: (c) => `Stands para feiras ${ptLocative(c)}`,
  fr: (c) => `Stands pour salons à ${c}`,
  it: (c) => `Stand fieristici a ${c}`,
  nl: (c) => `Beursstands in ${c}`,
  zh: (c) => `${c}展会展台`,
  hi: (c) => `${c} में मेला स्टैंड`,
  ko: (c) => `${c} 박람회 부스`,
  ja: (c) => `${c}の展示会ブース`
};

// Familia DISEÑO (22/09/2026).
const DESIGN_PREFIX = {
  es: (c) => `Diseño de stands en ${c}`,
  en: (c) => `Stand design in ${c}`,
  de: (c) => `Messestand-Design in ${c}`,
  pt: (c) => `Design de stands ${ptLocative(c)}`,
  fr: (c) => `Conception de stands à ${c}`,
  it: (c) => `Progettazione di stand a ${c}`,
  nl: (c) => `Standontwerp in ${c}`,
  zh: (c) => `${c}展台设计`,
  hi: (c) => `${c} में स्टैंड डिज़ाइन`,
  ko: (c) => `${c} 부스 디자인`,
  ja: (c) => `${c}のブースデザイン`
};

// Familia MONTAJE (22/09/2026). En alemán la búsqueda es «Messebau».
const ASSEMBLY_PREFIX = {
  es: (c) => `Montaje de stands en ${c}`,
  en: (c) => `Stand installation in ${c}`,
  de: (c) => `Messebau in ${c}`,
  pt: (c) => `Montagem de stands ${ptLocative(c)}`,
  fr: (c) => `Montage de stands à ${c}`,
  it: (c) => `Allestimento stand a ${c}`,
  nl: (c) => `Standbouw in ${c}`,
  zh: (c) => `${c}展台搭建`,
  hi: (c) => `${c} में स्टैंड असेंबली`,
  ko: (c) => `${c} 부스 설치`,
  ja: (c) => `${c}のブース設営`
};

// Qué familia lleva cada arquetipo de apartado; lo que no está aquí va con la común.
const KEY_FAMILY = { como: 'design', tipos: 'design', doc: 'assembly', cuandoFeria: 'assembly', upcoming: 'assembly' };

// Apartados sin arquetipo (cityH2Custom): se asignan por su propio texto.
// 24/09/2026: los apartados del recinto (dónde se monta) van también con montaje.
const ASSEMBLY_HINT = /(montaj|log[ií]stic|documentaci|transport|plazo|assembl|install|montag|messebau|aufbau|allestim|montaggio|opbouw|standbouw|搭建|物流|설치|물류|設営|ロジスティクス|असेंबली|लॉजिस्टिक|recinto|venue|\bsedes?\b|\bsedi\b|locaties?|messegel|veranstaltungsort|le site|les lieux|场地|परिसर|개최지|会場)/i;
const DESIGN_HINT = /(diseñ|prototip|conce[pç]|projet|progett|ontwerp|entwurf|设计|디자인|デザイン|設計|डिज़ाइन)/i;

const familyPrefix = (fam) => (fam === 'design' ? DESIGN_PREFIX : fam === 'assembly' ? ASSEMBLY_PREFIX : CITY_PREFIX);
const prefixFor = (lang, city, fam) => { const P = familyPrefix(fam); return (P[lang] || P.es)(city); };

// Prefijos sin ciudad, para el guardián de H2 (scripts/check_h2_pattern.mjs): cada forma
// que puede abrir un H2 de ciudad. En portugués se generan los cuatro locativos.
export function cityH2PrefixForms() {
  const out = new Set();
  for (const P of [CITY_PREFIX, DESIGN_PREFIX, ASSEMBLY_PREFIX]) {
    for (const [lang, fn] of Object.entries(P)) {
      const bare = fn('\u0000').replace('\u0000', '').trim();
      if (lang === 'pt') { for (const a of ['em', 'no', 'na', 'nas']) out.add(bare.replace(/\bem$/, a)); }
      else out.add(bare);
    }
  }
  return [...out].filter(Boolean);
}

// H1 de la página de ciudad (22/09/2026): las dos búsquedas cortas, literales.
export const CITY_H1 = {
  es: (c) => `Diseño, construcción y montaje de stands para ferias en ${c}`,
  en: (c) => `Exhibition stand design, construction and installation for trade fairs in ${c}`,
  de: (c) => `Messestand-Design, Messebau und Standmontage für Messen in ${c}`,
  pt: (c) => `Design, construção e montagem de stands para feiras ${ptLocative(c)}`,
  fr: (c) => `Conception, construction et montage de stands pour salons à ${c}`,
  it: (c) => `Progettazione, costruzione e allestimento di stand fieristici a ${c}`,
  nl: (c) => `Ontwerp, bouw en montage van beursstands in ${c}`,
  zh: (c) => `${c}展会展台设计、制作与搭建`,
  hi: (c) => `${c} में मेला स्टैंड डिज़ाइन, निर्माण और असेंबली`,
  ko: (c) => `${c} 박람회 부스 디자인, 제작 및 설치`,
  ja: (c) => `${c}の展示会ブースデザイン・製作・設営`
};

// 26/09/2026 (tarde): el H1 y el <title> de TODAS las plazas llevan todos los términos que
// se buscan —diseño, construcción, montaje y «para ferias»—. El 22/09 se sustituyó
// «Diseño y construcción de stands para ferias en X» por «Diseño y montaje de stands en X»
// y se perdieron «construcción» y «para ferias»; Lisboa cayó. Criterio del usuario: sumar
// términos, nunca quitar.
export const cityH1For = (section, lang, c) => (CITY_H1[lang] || CITY_H1.es)(c);

// Primer H2 del cuerpo (sustituye al antiguo «Diseño, construcción y montaje…»).
export const CITY_MAIN_H2 = {
  es: (c) => `Diseño de stands en ${c}: del prototipo 3D al montaje, con un solo proveedor`,
  en: (c) => `Stand design in ${c}: from 3D prototype to installation, one supplier`,
  de: (c) => `Messestand-Design in ${c}: vom 3D-Prototyp bis zum Messebau, aus einer Hand`,
  pt: (c) => `Design de stands ${ptLocative(c)}: do protótipo 3D à montagem, com um único fornecedor`,
  fr: (c) => `Conception de stands à ${c} : du prototype 3D au montage, un seul prestataire`,
  it: (c) => `Progettazione di stand a ${c}: dal prototipo 3D all'allestimento, un unico fornitore`,
  nl: (c) => `Standontwerp in ${c}: van 3D-prototype tot standbouw, één leverancier`,
  zh: (c) => `${c}展台设计：从3D原型到搭建，一站式供应`,
  hi: (c) => `${c} में स्टैंड डिज़ाइन: 3D प्रोटोटाइप से असेंबली तक, एक ही प्रदाता`,
  ko: (c) => `${c} 부스 디자인: 3D 프로토타입부터 설치까지, 단일 공급자`,
  ja: (c) => `${c}のブースデザイン：3Dプロトタイプから設営まで、一社完結`
};

// Frase de apertura del cuerpo con las dos expresiones literales (tras el primer párrafo).
export const CITY_KW_LEAD = {
  es: (c) => `Como <strong>empresa de stands en ${c}</strong>, nos ocupamos del <strong>diseño de stands en ${c}</strong> —prototipo 3D en 3 días—, de la <strong>construcción de stands en ${c}</strong> en nuestro taller y del <strong>montaje de stands en ${c}</strong> con montadores propios, del primer boceto al desmontaje.`,
  en: (c) => `As an <strong>exhibition stand company in ${c}</strong>, we handle <strong>stand design in ${c}</strong> — a 3D prototype in 3 days —, <strong>stand construction in ${c}</strong> in our own workshop and <strong>stand installation in ${c}</strong> with our own crew, from the first sketch to dismantling.`,
  de: (c) => `Als <strong>Messebaufirma in ${c}</strong> übernehmen wir das <strong>Messestand-Design in ${c}</strong> – 3D-Prototyp in 3 Tagen –, den <strong>Standbau in ${c}</strong> in eigener Werkstatt und die <strong>Standmontage in ${c}</strong> mit eigenen Monteuren, vom ersten Entwurf bis zum Abbau.`,
  pt: (c) => `Como <strong>empresa de stands ${ptLocative(c)}</strong>, tratamos do <strong>design de stands ${ptLocative(c)}</strong> — protótipo 3D em 3 dias —, da <strong>construção de stands ${ptLocative(c)}</strong> na nossa oficina e da <strong>montagem de stands ${ptLocative(c)}</strong> com montadores próprios, do primeiro esboço à desmontagem.`,
  fr: (c) => `En tant qu’<strong>entreprise de stands à ${c}</strong>, nous assurons la <strong>conception de stands à ${c}</strong> — prototype 3D en 3 jours —, la <strong>construction de stands à ${c}</strong> dans notre atelier et le <strong>montage de stands à ${c}</strong> avec nos propres monteurs, du premier croquis au démontage.`,
  it: (c) => `Come <strong>azienda di stand fieristici a ${c}</strong>, ci occupiamo della <strong>progettazione di stand a ${c}</strong> — prototipo 3D in 3 giorni —, della <strong>costruzione di stand a ${c}</strong> nella nostra officina e dell'<strong>allestimento stand a ${c}</strong> con montatori propri, dal primo schizzo allo smontaggio.`,
  nl: (c) => `Als <strong>standbouwbedrijf in ${c}</strong> verzorgen wij het <strong>standontwerp in ${c}</strong> — 3D-prototype in 3 dagen —, de <strong>bouw van stands in ${c}</strong> in onze eigen werkplaats en de <strong>standmontage in ${c}</strong> met eigen monteurs, van de eerste schets tot de demontage.`,
  zh: (c) => `作为<strong>${c}展台公司</strong>，我们负责<strong>${c}展台设计</strong>（3天交付3D原型）、在自有工厂完成<strong>${c}展台制作</strong>，并由自有团队完成<strong>${c}展台搭建</strong>，从第一张草图到拆卸全程负责。`,
  hi: (c) => `<strong>${c} में स्टैंड कंपनी</strong> के रूप में हम <strong>${c} में स्टैंड डिज़ाइन</strong> — 3 दिनों में 3D प्रोटोटाइप —, अपनी कार्यशाला में <strong>${c} में स्टैंड निर्माण</strong> और अपनी टीम के साथ <strong>${c} में स्टैंड असेंबली</strong> संभालते हैं, पहले स्केच से डिसमेंटलिंग तक।`,
  ko: (c) => `<strong>${c} 부스 전문 업체</strong>로서 <strong>${c} 부스 디자인</strong>(3일 만에 3D 프로토타입), 자체 공방의 <strong>${c} 부스 제작</strong>, 자체 설치팀의 <strong>${c} 부스 설치</strong>까지 첫 스케치에서 철거까지 책임집니다.`,
  ja: (c) => `<strong>${c}のブース制作会社</strong>として、<strong>${c}のブースデザイン</strong>（3日で3Dプロトタイプ）、自社工房での<strong>${c}のブース製作</strong>、自社スタッフによる<strong>${c}のブース設営</strong>まで、最初のスケッチから撤去まで手がけます。`
};

// Prefijo común de las páginas de FERIA, por idioma.
const FAIR_PREFIX = {
  es: (n) => `Stands para ${n}`,
  en: (n) => `Stands for ${n}`,
  de: (n) => `Messestände für ${n}`,
  pt: (n) => `Stands para ${n}`,
  fr: (n) => `Stands pour ${n}`,
  it: (n) => `Stand per ${n}`,
  nl: (n) => `Stands voor ${n}`,
  zh: (n) => `${n}展台`,
  hi: (n) => `${n} के लिए स्टैंड`,
  ko: (n) => `${n} 부스`,
  ja: (n) => `${n}のブース`
};

// Parte particular de cada apartado, por clave y por idioma. En minúscula
// inicial donde el idioma lo pide (tras los dos puntos); el alemán conserva
// las mayúsculas de sus sustantivos.
const SECTION_LABELS = {
  como: {
    es: 'claves para un stand de éxito, paso a paso',
    en: 'keys to a successful stand, step by step',
    de: 'Schlüssel zum erfolgreichen Stand, Schritt für Schritt',
    pt: 'chaves para um stand de sucesso, passo a passo',
    fr: "les clés d'un stand réussi, étape par étape",
    it: 'le chiavi di uno stand di successo, passo dopo passo',
    nl: 'sleutels tot een succesvolle stand, stap voor stap',
    zh: '打造成功展台的关键，一步步来',
    hi: 'सफल स्टैंड की कुंजी, चरण दर चरण',
    ko: '성공적인 부스를 만드는 핵심, 단계별 가이드',
    ja: '成功するブースの鍵（ステップバイステップ）'
  },
  tipos: {
    es: 'tipos de stand que construimos',
    en: 'types of stand we build',
    de: 'Standtypen, die wir bauen',
    pt: 'tipos de stand que construímos',
    fr: 'types de stands que nous construisons',
    it: 'tipi di stand che costruiamo',
    nl: 'soorten stands die wij bouwen',
    zh: '我们搭建的展台类型',
    hi: 'हम जो स्टैंड बनाते हैं',
    ko: '제작하는 부스 유형',
    ja: '施工するブースのタイプ'
  },
  ferias: {
    es: 'ferias y sectores',
    en: 'trade fairs and sectors',
    de: 'Messen und Branchen',
    pt: 'feiras e setores',
    fr: 'salons et secteurs',
    it: 'fiere e settori',
    nl: 'beurzen en sectoren',
    zh: '展会与行业',
    hi: 'मेले और क्षेत्र',
    ko: '박람회와 산업 분야',
    ja: '展示会と業界'
  },
  doc: {
    es: 'documentación técnica del recinto',
    en: 'venue technical documentation',
    de: 'technische Unterlagen des Messegeländes',
    pt: 'documentação técnica do recinto',
    fr: 'documentation technique du parc des expositions',
    it: 'documentazione tecnica del polo fieristico',
    nl: 'technische documentatie van de beurslocatie',
    zh: '展馆技术文件',
    hi: 'स्थल की तकनीकी जानकारी',
    ko: '전시장 기술 자료',
    ja: '会場の技術資料'
  },
  porque: {
    es: 'por qué elegirnos',
    en: 'why choose us',
    de: 'warum wir',
    pt: 'porquê escolher-nos',
    fr: 'pourquoi nous choisir',
    it: 'perché sceglierci',
    nl: 'waarom voor ons kiezen',
    zh: '为什么选择我们',
    hi: 'हमें क्यों चुनें',
    ko: '우리를 선택하는 이유',
    ja: '選ばれる理由'
  },
  cuandoFeria: {
    es: '¿cuándo es tu próxima feria?',
    en: 'when is your next fair?',
    de: 'wann ist deine nächste Messe?',
    pt: 'quando é a tua próxima feira?',
    fr: 'quand est votre prochain salon ?',
    it: 'quando è la tua prossima fiera?',
    nl: 'wanneer is jouw volgende beurs?',
    zh: '你的下一场展会是什么时候？',
    hi: 'आपका अगला मेला कब है?',
    ko: '다음 박람회는 언제인가요?',
    ja: '次の展示会はいつですか？'
  },
  cuandoEdicion: {
    es: '¿cuándo es tu próxima edición?',
    en: 'when is your next edition?',
    de: 'wann ist deine nächste Ausgabe?',
    pt: 'quando é a tua próxima edição?',
    fr: 'quand est votre prochaine édition ?',
    it: 'quando è la tua prossima edizione?',
    nl: 'wanneer is jouw volgende editie?',
    zh: '你的下一届是什么时候？',
    hi: 'आपका अगला संस्करण कब है?',
    ko: '다음 회차는 언제인가요?',
    ja: '次回の開催はいつですか？'
  },
  faqs: {
    es: 'preguntas frecuentes',
    en: 'frequently asked questions',
    de: 'häufige Fragen',
    pt: 'perguntas frequentes',
    fr: 'questions fréquentes',
    it: 'domande frequenti',
    nl: 'veelgestelde vragen',
    zh: '常见问题',
    hi: 'अक्सर पूछे जाने वाले प्रश्न',
    ko: '자주 묻는 질문',
    ja: 'よくある質問'
  },
  upcoming: {
    es: 'próximas fechas confirmadas',
    en: 'upcoming confirmed dates',
    de: 'nächste bestätigte Termine',
    pt: 'próximas datas confirmadas',
    fr: 'prochaines dates confirmées',
    it: 'prossime date confermate',
    nl: 'volgende bevestigde data',
    zh: '已确认的近期日期',
    hi: 'आगामी पुष्ट तिथियाँ',
    ko: '확정된 다음 일정',
    ja: '確定済みの今後の日程'
  },
  services: {
    es: 'servicios para expositores',
    en: 'services for exhibitors',
    de: 'Services für Aussteller',
    pt: 'serviços para expositores',
    fr: 'services pour exposants',
    it: 'servizi per espositori',
    nl: 'diensten voor exposanten',
    zh: '参展商服务',
    hi: 'प्रदर्शकों के लिए सेवाएँ',
    ko: '참가업체 서비스',
    ja: '出展者向けサービス'
  },
  calendario: {
    es: 'calendario de expansión',
    en: 'expansion calendar',
    de: 'Expansionskalender',
    pt: 'calendário de expansão',
    fr: "calendrier d'expansion",
    it: 'calendario di espansione',
    nl: 'expansiekalender',
    zh: '拓展日历',
    hi: 'विस्तार कैलेंडर',
    ko: '확장 캘린더',
    ja: '拡大カレンダー'
  }
};

// Separador tras el prefijo: dos puntos de ancho completo en zh/ja.
const sep = (lang) => (lang === 'zh' || lang === 'ja' ? '：' : ': ');

const label = (key, lang) => {
  const m = SECTION_LABELS[key];
  return m ? (m[lang] || m.es) : '';
};

// H2 de apartado en una página de CIUDAD: "Stands para ferias en Málaga: ferias y sectores".
export function cityH2(lang, cityName, key) {
  const p = prefixFor(lang, cityName, KEY_FAMILY[key]);
  return `${p}${sep(lang)}${label(key, lang)}`;
}

// Composición GENÉRICA para cualquier apartado sin arquetipo propio: el texto original
// del H2 pasa a ser la parte particular, con la ciudad redundante retirada (mejor
// esfuerzo), los dos puntos internos convertidos en raya y la inicial en minúscula
// donde la lengua lo pide (el alemán conserva sus mayúsculas; siglas y cifras, también).
export function cityH2Custom(lang, cityName, particular) {
  let rest = String(particular || '').trim();
  const fam = ASSEMBLY_HINT.test(rest) ? 'assembly' : (DESIGN_HINT.test(rest) ? 'design' : null);
  const p = prefixFor(lang, cityName, fam);
  if (cityName) {
    rest = rest.split(cityName).join(' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+(en|em|in|a|ad|à|auf|op|bei|zu|de|da|do|dos|das|del|na|no|per|pour|voor|für)\s*([,:;—–-]|$)/gi, '$2')
      .replace(/\s+([,:;)])/g, '$1')
      .replace(/([:;])\s*,\s*/g, '$1 ')   // «Península: Zaragoza, España» sin la ciudad → sin coma colgando
      .replace(/^\s*[,:;—–-]\s*/, '')
      .replace(/[\s,:;—–-]+$/, '')
      .trim();
  }
  rest = rest.replace(/:\s+/, ' — ');
  if (!['de', 'zh', 'hi', 'ko', 'ja'].includes(lang) && !/^([A-Z0-9]{2}|\d)/.test(rest)) {
    rest = rest.charAt(0).toLowerCase() + rest.slice(1);
  }
  return rest ? `${p}${sep(lang)}${rest}` : null;
}

// H2 de apartado en una página de FERIA: "Stands para SMAGUA: servicios para expositores".
export function fairH2(lang, fairName, key) {
  const p = (FAIR_PREFIX[lang] || FAIR_PREFIX.es)(fairName);
  return `${p}${sep(lang)}${label(key, lang)}`;
}
