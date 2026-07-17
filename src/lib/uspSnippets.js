// Microcopys del Sistema de Proyecto Auditado (super-recurso): sección de la home,
// frase enlazada (banco de 3 variantes por idioma, por hash del slug) para fichas/hubs,
// y etiqueta corta de menú (navLabel). Todo enlaza a /proyecto-auditado.
//
// OJO: las frases de `lines` llevan <strong> para destacar el concepto auditado, así que
// se pintan con {@html} (ver Feria.svelte y Actividad.svelte). Va marcado en el texto de
// cada idioma —y no con un reemplazo automático— porque el término cambia de forma en
// cada lengua e incluso se declina (de: "auditierten Projekts"); buscarlo por cadena
// sería frágil. Si añades una variante, márcala aquí igual. `homeText`/`cta`/`navLabel`
// siguen siendo texto plano.
export const uspSnippets = {
  "es": {
    "homeHeading": "Lo que ves es lo que se construye",
    "homeText": "Nuestro Sistema de Proyecto Auditado deja cada proyecto en un expediente verificable y archivable —prototipo, presupuesto y aprobaciones— que garantiza que se construye exactamente lo que apruebas.",
    "cta": "Descubre el Proyecto Auditado",
    "lines": [
      "Con nuestro Sistema de <strong>Proyecto Auditado</strong>, lo que apruebas en el prototipo es exactamente lo que montamos.",
      "Cada proyecto queda en un <strong>expediente verificable</strong>: el prototipo que apruebas es el stand que construimos.",
      "Trabajamos con <strong>proyecto auditado</strong> y archivable, tu garantía de que recibes lo aprobado, sin sorpresas."
    ],
    "navLabel": "Garantía"
  },
  "pt": {
    "homeHeading": "O que vês é o que se constrói",
    "homeText": "O nosso Sistema de Projeto Auditado deixa cada projeto num processo verificável e arquivável —protótipo, orçamento e aprovações— que garante que se constrói exatamente o que aprovas.",
    "cta": "Descobre o Projeto Auditado",
    "lines": [
      "Com o nosso Sistema de <strong>Projeto Auditado</strong>, o que aprovas no protótipo é exatamente o que montamos.",
      "Cada projeto fica num <strong>processo verificável</strong>: o protótipo que aprovas é o stand que construímos.",
      "Trabalhamos com <strong>projeto auditado</strong> e arquivável, a tua garantia de que recebes o aprovado, sem surpresas."
    ],
    "navLabel": "Garantia"
  },
  "en": {
    "homeHeading": "What you see is what we build",
    "homeText": "Our Audited Project System keeps every project in a verifiable, archivable record —prototype, budget and approvals— that guarantees we build exactly what you approve.",
    "cta": "Discover the Audited Project",
    "lines": [
      "With our <strong>Audited Project</strong> System, what you approve in the prototype is exactly what we build.",
      "Every project stays in a <strong>verifiable record</strong>: the prototype you approve is the stand we build.",
      "We work with an <strong>audited, archivable project</strong>, your guarantee that you get what was approved, with no surprises."
    ],
    "navLabel": "Guarantee"
  },
  "de": {
    "homeHeading": "Was du siehst, wird gebaut",
    "homeText": "Unser System des auditierten Projekts hält jedes Projekt in einer prüfbaren und archivierbaren Akte fest —Prototyp, Budget und Freigaben— und garantiert, dass genau das gebaut wird, was du freigibst.",
    "cta": "Entdecke das auditierte Projekt",
    "lines": [
      "Mit unserem System des <strong>auditierten Projekts</strong> ist das, was du am Prototyp freigibst, genau das, was wir bauen.",
      "Jedes Projekt bleibt in einer <strong>prüfbaren Akte</strong>: Der Prototyp, den du freigibst, ist der Stand, den wir bauen.",
      "Wir arbeiten mit einem <strong>auditierten und archivierbaren Projekt</strong>, deine Garantie, dass du das Freigegebene erhältst, ohne Überraschungen."
    ],
    "navLabel": "Garantie"
  },
  "fr": {
    "homeHeading": "Ce que tu vois est ce qui se construit",
    "homeText": "Notre Système de Projet Audité conserve chaque projet dans un dossier vérifiable et archivable —prototype, devis et approbations— qui garantit que l'on construit exactement ce que tu approuves.",
    "cta": "Découvre le Projet Audité",
    "lines": [
      "Avec notre Système de <strong>Projet Audité</strong>, ce que tu approuves sur le prototype est exactement ce que nous montons.",
      "Chaque projet reste dans un <strong>dossier vérifiable</strong> : le prototype que tu approuves est le stand que nous construisons.",
      "Nous travaillons avec un <strong>projet audité</strong> et archivable, ta garantie de recevoir ce qui a été approuvé, sans surprises."
    ],
    "navLabel": "Garantie"
  },
  "it": {
    "homeHeading": "Ciò che vedi è ciò che si costruisce",
    "homeText": "Il nostro Sistema di Progetto Verificato conserva ogni progetto in un fascicolo verificabile e archiviabile —prototipo, preventivo e approvazioni— che garantisce che si costruisce esattamente ciò che approvi.",
    "cta": "Scopri il Progetto Verificato",
    "lines": [
      "Con il nostro Sistema di <strong>Progetto Verificato</strong>, ciò che approvi sul prototipo è esattamente ciò che montiamo.",
      "Ogni progetto resta in un <strong>fascicolo verificabile</strong>: il prototipo che approvi è lo stand che costruiamo.",
      "Lavoriamo con un <strong>progetto verificato</strong> e archiviabile, la tua garanzia di ricevere ciò che è stato approvato, senza sorprese."
    ],
    "navLabel": "Garanzia"
  },
  "nl": {
    "homeHeading": "Wat je ziet, is wat we bouwen",
    "homeText": "Ons Systeem van het Geauditeerde Project bewaart elk project in een verifieerbaar en archiveerbaar dossier —prototype, offerte en goedkeuringen— dat garandeert dat precies wordt gebouwd wat je goedkeurt.",
    "cta": "Ontdek het Geauditeerde Project",
    "lines": [
      "Met ons Systeem van het <strong>Geauditeerde Project</strong> is wat je op het prototype goedkeurt precies wat wij bouwen.",
      "Elk project blijft in een <strong>verifieerbaar dossier</strong>: het prototype dat je goedkeurt is de stand die wij bouwen.",
      "Wij werken met een <strong>geauditeerd en archiveerbaar project</strong>, jouw garantie dat je krijgt wat is goedgekeurd, zonder verrassingen."
    ],
    "navLabel": "Garantie"
  },
  "zh": {
    "homeHeading": "所见即所建",
    "homeText": "我们的审核项目系统将每个项目保存在可核验、可存档的档案中——原型、预算与审批——确保搭建的正是您所批准的内容。",
    "cta": "了解审核项目",
    "lines": [
      "有了我们的<strong>审核项目系统</strong>，您在原型上批准的，正是我们所搭建的。",
      "每个项目都保存在<strong>可核验的档案</strong>中：您批准的原型，就是我们搭建的展台。",
      "我们采用<strong>可审核、可存档的项目</strong>，这是您获得所批准成果的保证，绝无意外。"
    ],
    "navLabel": "保障"
  },
  "hi": {
    "homeHeading": "जो दिखता है, वही बनता है",
    "homeText": "हमारी ऑडिटेड प्रोजेक्ट प्रणाली हर परियोजना को एक सत्यापन-योग्य और संग्रहणीय दस्तावेज़ में रखती है —प्रोटोटाइप, बजट और स्वीकृतियाँ— जो सुनिश्चित करती है कि ठीक वही बनाया जाए जिसे आप स्वीकृत करते हैं।",
    "cta": "ऑडिटेड प्रोजेक्ट जानें",
    "lines": [
      "हमारी <strong>ऑडिटेड प्रोजेक्ट प्रणाली</strong> के साथ, प्रोटोटाइप में आप जो स्वीकृत करते हैं, ठीक वही हम बनाते हैं।",
      "हर परियोजना एक <strong>सत्यापन-योग्य दस्तावेज़</strong> में रहती है: जिस प्रोटोटाइप को आप स्वीकृत करते हैं, वही स्टैंड हम बनाते हैं।",
      "हम <strong>ऑडिटेड और संग्रहणीय परियोजना</strong> के साथ काम करते हैं, यह आपकी गारंटी है कि आपको स्वीकृत वस्तु ही मिले, बिना किसी आश्चर्य के।"
    ],
    "navLabel": "गारंटी"
  },
  "ko": {
    "homeHeading": "보이는 그대로 지어집니다",
    "homeText": "저희 감사 프로젝트 시스템은 모든 프로젝트를 검증 및 보관이 가능한 문서로 —프로토타입, 견적, 승인— 남겨, 고객님이 승인한 것을 정확히 그대로 시공함을 보장합니다.",
    "cta": "감사 프로젝트 알아보기",
    "lines": [
      "저희 <strong>감사 프로젝트 시스템</strong>으로, 프로토타입에서 승인하신 것이 곧 저희가 시공하는 것입니다.",
      "모든 프로젝트는 <strong>검증 가능한 문서</strong>로 남습니다: 승인하신 프로토타입이 저희가 시공하는 부스입니다.",
      "저희는 <strong>감사 및 보관이 가능한 프로젝트</strong>로 작업하며, 이는 승인하신 것을 그대로 받으신다는, 예기치 못한 일이 없다는 보장입니다."
    ],
    "navLabel": "보증"
  },
  "ja": {
    "homeHeading": "見たままを建てます",
    "homeText": "当社の監査済みプロジェクトシステムは、各プロジェクトを検証可能で保管可能な記録に —プロトタイプ、見積もり、承認— 残し、お客様が承認したものを正確に施工することを保証します。",
    "cta": "監査済みプロジェクトを見る",
    "lines": [
      "当社の<strong>監査済みプロジェクトシステム</strong>なら、プロトタイプで承認いただいたものが、そのまま施工するものです。",
      "各プロジェクトは<strong>検証可能な記録</strong>に残ります。承認いただいたプロトタイプが、私たちの建てるブースです。",
      "私たちは<strong>監査済みで保管可能なプロジェクト</strong>で作業します。これは承認どおりのものを、想定外なく受け取れる保証です。"
    ],
    "navLabel": "保証"
  }
};

function pickIndex(slug, n) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) h = ((h * 33) ^ slug.charCodeAt(i)) >>> 0;
  return h % n;
}
export function pickUspLine(lang, slug) {
  const o = uspSnippets[lang] || uspSnippets.es;
  const arr = (o.lines && o.lines.length) ? o.lines : uspSnippets.es.lines;
  return arr[pickIndex(String(slug || ""), arr.length)];
}
export function uspHome(lang) { return uspSnippets[lang] || uspSnippets.es; }
export function uspNavLabel(lang) { return (uspSnippets[lang] || uspSnippets.es).navLabel; }
