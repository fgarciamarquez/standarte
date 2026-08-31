// Hilo SEO de las páginas de actividad (/actividad y /actividad/<tag>).
//
// Problema que resuelve (indicación del 2026-08-28): estas páginas describían el
// SECTOR pero no declaraban la ACCIÓN ni el SUJETO — "Standarte construye stands
// para este sector" —, así que los motores no las vinculaban con el servicio y las
// ignoraban. Aquí viven las dos piezas que garantizan ese vínculo SIEMPRE, sin
// depender de que cada texto lo recuerde:
//   - familyH2(): los H2 del índice pasan a "Stand para {familia}".
//   - actionLead(): frase de apertura de cada hub — "Standarte diseña y construye
//     stands para el sector de {actividad}" — antepuesta a su intro.
// Ambas se componen por idioma, así que valen para las 45 actividades × 11 idiomas.

// Prefijo de los H2 del índice de actividades.
const H2_PREFIX = {
  es: (l) => `Stand para ${l}`,
  en: (l) => `Stand for ${l}`,
  pt: (l) => `Stand para ${l}`,
  de: (l) => `Messestand für ${l}`,
  fr: (l) => `Stand pour ${l}`,
  it: (l) => `Stand per ${l}`,
  nl: (l) => `Stand voor ${l}`,
  zh: (l) => `${l}展台`,
  hi: (l) => `${l} के लिए स्टैंड`,
  ko: (l) => `${l} 부스`,
  ja: (l) => `${l}のブース`
};

// Frase de acción + sujeto que abre cada hub de actividad.
const ACTION_LEAD = {
  es: (l) => `Standarte diseña y construye stands para el sector de ${l} en España y Portugal.`,
  en: (l) => `Standarte designs and builds exhibition stands for the ${l} sector across Spain and Portugal.`,
  pt: (l) => `A Standarte projeta e constrói stands para o setor de ${l} em Espanha e Portugal.`,
  de: (l) => `Standarte plant und baut Messestände für die Branche ${l} in Spanien und Portugal.`,
  fr: (l) => `Standarte conçoit et construit des stands pour le secteur ${l} en Espagne et au Portugal.`,
  it: (l) => `Standarte progetta e costruisce stand fieristici per il settore ${l} in Spagna e Portogallo.`,
  nl: (l) => `Standarte ontwerpt en bouwt beursstands voor de sector ${l} in Spanje en Portugal.`,
  zh: (l) => `Standarte 在西班牙和葡萄牙为${l}行业设计并搭建展会展台。`,
  hi: (l) => `Standarte स्पेन और पुर्तगाल में ${l} क्षेत्र के लिए मेला स्टैंड डिज़ाइन और निर्माण करता है।`,
  ko: (l) => `Standarte는 스페인과 포르투갈에서 ${l} 분야의 박람회 부스를 디자인하고 제작합니다.`,
  ja: (l) => `Standarteは、スペインとポルトガルで${l}業界の展示会ブースを設計・施工します。`
};

// Parte particular de los H2 del hub, para que también reincidan en la expresión
// objetivo de la página ("Stands para ferias de {actividad}: {apartado}").
const HUB_SECTIONS = {
  fairs: {
    es: 'ferias de esta actividad', en: 'fairs in this activity', pt: 'feiras desta atividade',
    de: 'Messen dieser Branche', fr: 'salons de cette activité', it: 'fiere di questa attività',
    nl: 'beurzen in deze branche', zh: '该行业的展会', hi: 'इस क्षेत्र के मेले',
    ko: '이 분야의 박람회', ja: 'この分野の展示会'
  },
  projects: {
    es: 'proyectos realizados', en: 'projects delivered', pt: 'projetos realizados',
    de: 'realisierte Projekte', fr: 'projets réalisés', it: 'progetti realizzati',
    nl: 'gerealiseerde projecten', zh: '已完成项目', hi: 'पूर्ण परियोजनाएँ',
    ko: '완료된 프로젝트', ja: '実績プロジェクト'
  }
};

const sep = (lang) => (lang === 'zh' || lang === 'ja' ? '：' : ': ');

export function familyH2(lang, label) {
  return (H2_PREFIX[lang] || H2_PREFIX.es)(label);
}

export function actionLead(lang, label) {
  return (ACTION_LEAD[lang] || ACTION_LEAD.es)(label);
}

/** H2 de apartado del hub: "{H1 de la página}: {parte particular}". */
export function hubH2(lang, hubTitle, key) {
  const m = HUB_SECTIONS[key];
  return `${hubTitle}${sep(lang)}${m ? (m[lang] || m.es) : ''}`;
}
