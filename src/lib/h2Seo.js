// Composición SEO de los H2 de apartado en páginas de ciudad y de feria.
// Patrón (2026-08-27): cada H2 reincide en la expresión objetivo de la página
// —"{expresión común}: {parte particular}"— para que todos los encabezados
// empujen el mismo objetivo en vez de posicionar por separado (estructura que
// Google lee como contenido correctamente jerarquizado; referencia observada
// en competidores que lo aplican de forma sistemática).
//   Ciudad → "Stands para ferias en {ciudad}: ferias y sectores"
//   Feria  → "Stands para {feria}: servicios para expositores"
// La expresión es neutra de marca: sirve igual en Standarte y StandQuote.

// Prefijo común de las páginas de CIUDAD, por idioma.
const CITY_PREFIX = {
  es: (c) => `Stands para ferias en ${c}`,
  en: (c) => `Trade fair stands in ${c}`,
  de: (c) => `Messestände in ${c}`,
  pt: (c) => `Stands para feiras em ${c}`,
  fr: (c) => `Stands pour salons à ${c}`,
  it: (c) => `Stand fieristici a ${c}`,
  nl: (c) => `Beursstands in ${c}`,
  zh: (c) => `${c}展会展台`,
  hi: (c) => `${c} में मेला स्टैंड`,
  ko: (c) => `${c} 박람회 부스`,
  ja: (c) => `${c}の展示会ブース`
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
  const p = (CITY_PREFIX[lang] || CITY_PREFIX.es)(cityName);
  return `${p}${sep(lang)}${label(key, lang)}`;
}

// H2 de apartado en una página de FERIA: "Stands para SMAGUA: servicios para expositores".
export function fairH2(lang, fairName, key) {
  const p = (FAIR_PREFIX[lang] || FAIR_PREFIX.es)(fairName);
  return `${p}${sep(lang)}${label(key, lang)}`;
}
