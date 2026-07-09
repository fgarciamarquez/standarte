// Banco de variantes de la meta-description / párrafo destacado de las fichas de feria.
// Objetivo SEO: evitar que ~175 fichas compartan el MISMO texto de intro (riesgo de
// que Google no indexe duplicados). Se elige una variante de forma determinista por
// slug (hash), así cada ficha es estable pero distinta de sus vecinas. Marcadores:
// {{name}} = nombre de feria, {{city}} = ciudad localizada, {{sector}} = sector localizado.
export const introVariants = {
  "es": [
    "Standarte diseña y monta stands para {{name}} en {{city}}, con un espacio que transmite excelencia en {{sector}}.",
    "¿Expones en {{name}}? Standarte construye tu stand en {{city}} con taller propio, listo para {{sector}}.",
    "Stand de diseño libre para {{name}} ({{city}}). Standarte controla diseño y montaje para destacar en {{sector}}.",
    "En {{name}}, en {{city}}, tu stand es tu carta de presentación en {{sector}}. Lo diseñamos con taller propio.",
    "Diseño y construcción de stands para {{name}} en {{city}}. Taller propio, ideal para {{sector}}.",
    "Standarte lleva tu stand a {{name}} ({{city}}): diseño a medida para el sector de {{sector}}."
  ],
  "pt": [
    "A Standarte projeta e monta stands para a {{name}} em {{city}}, com um espaço que transmite excelência em {{sector}}.",
    "Vai expor na {{name}}? A Standarte constrói o seu stand em {{city}} com oficina própria, pronto para {{sector}}.",
    "Stand de design livre para a {{name}} ({{city}}). A Standarte controla design e montagem para liderar a atenção em {{sector}}.",
    "Na {{name}}, em {{city}}, o seu stand é o seu cartão de visita perante {{sector}}. Projetado com oficina própria.",
    "Design e construção de stands para a {{name}} em {{city}}. Oficina própria, ideal para {{sector}}.",
    "A Standarte leva o seu stand à {{name}} ({{city}}): design à medida para o setor de {{sector}}."
  ],
  "en": [
    "Standarte designs and builds stands for {{name}} in {{city}}, with a space that conveys excellence in {{sector}}.",
    "Exhibiting at {{name}}? Standarte builds your stand in {{city}} in our own workshop, ready for {{sector}}.",
    "Custom-design stand for {{name}} ({{city}}). Standarte controls design and build to lead attention in {{sector}}.",
    "At {{name}}, in {{city}}, your stand is your calling card before {{sector}}. Built in our own workshop.",
    "Stand design and construction for {{name}} in {{city}}. In-house workshop, ideal for {{sector}}.",
    "Standarte brings your stand to {{name}} ({{city}}): custom design for the {{sector}} sector."
  ],
  "de": [
    "Standarte gestaltet und baut Messestände für die {{name}} in {{city}} — ein Raum voller Exzellenz im Bereich {{sector}}.",
    "Stellen Sie auf der {{name}} aus? Standarte baut Ihren Stand in {{city}} in eigener Werkstatt, bereit für {{sector}}.",
    "Frei gestalteter Messestand für {{name}} ({{city}}). Standarte steuert Design und Aufbau für {{sector}}.",
    "Auf der {{name}} in {{city}} ist Ihr Stand Ihre Visitenkarte für {{sector}}. Gebaut in eigener Werkstatt.",
    "Design und Bau von Messeständen für die {{name}} in {{city}}. Eigene Werkstatt, ideal für {{sector}}.",
    "Standarte bringt Ihren Stand zur {{name}} ({{city}}): maßgeschneidertes Design für {{sector}}."
  ],
  "fr": [
    "Standarte conçoit et construit des stands pour {{name}} à {{city}}, un espace qui transmet l'excellence en {{sector}}.",
    "Vous exposez à {{name}} ? Standarte construit votre stand à {{city}} dans son propre atelier, prêt pour {{sector}}.",
    "Stand à conception libre pour {{name}} ({{city}}). Standarte gère conception et montage pour {{sector}}.",
    "À {{name}}, à {{city}}, votre stand est votre carte de visite face à {{sector}}. Construit dans notre atelier.",
    "Conception et construction de stands pour {{name}} à {{city}}. Atelier intégré, idéal pour {{sector}}.",
    "Standarte emmène votre stand à {{name}} ({{city}}) : conception sur mesure pour le secteur de {{sector}}."
  ],
  "it": [
    "Standarte progetta e realizza stand per {{name}} a {{city}}, uno spazio che trasmette eccellenza in {{sector}}.",
    "Esponi a {{name}}? Standarte realizza il tuo stand a {{city}} con officina propria, pronto per {{sector}}.",
    "Stand a progettazione libera per {{name}} ({{city}}). Standarte gestisce progettazione e allestimento per {{sector}}.",
    "A {{name}}, a {{city}}, il tuo stand è il tuo biglietto da visita per {{sector}}. Realizzato con officina propria.",
    "Progettazione e costruzione di stand per {{name}} a {{city}}. Officina propria, ideale per {{sector}}.",
    "Standarte porta il tuo stand a {{name}} ({{city}}): progettazione su misura per il settore {{sector}}."
  ],
  "nl": [
    "Standarte ontwerpt en bouwt beursstands voor {{name}} in {{city}}, een ruimte die topkwaliteit uitstraalt in {{sector}}.",
    "Exposeert u op {{name}}? Standarte bouwt uw stand in {{city}} in eigen atelier, klaar voor {{sector}}.",
    "Vrij ontworpen stand voor {{name}} ({{city}}). Standarte beheert ontwerp en montage voor {{sector}}.",
    "Op {{name}}, in {{city}}, is uw stand uw visitekaartje voor {{sector}}. Gebouwd in eigen atelier.",
    "Ontwerp en bouw van stands voor {{name}} in {{city}}. Eigen atelier, ideaal voor {{sector}}.",
    "Standarte brengt uw stand naar {{name}} ({{city}}): maatwerkontwerp voor de sector {{sector}}."
  ],
  "zh": [
    "Standarte 为在 {{city}} 举办的 {{name}} 提供高级木作展台的一体化设计与搭建服务。作为 {{sector}} 行业的重要盛会，您的品牌需要一个彰显技术卓越的空间。",
    "参展 {{name}} 吗？Standarte 以自有工坊在 {{city}} 为您量身设计并搭建展台，采用高级木作工艺，助您在 {{sector}} 行业中脱颖而出。",
    "为 {{name}}（{{city}}）打造的自由设计展台。Standarte 全程把控——设计、生产、物流与搭建——让您的品牌在 {{sector}} 领域引领关注。",
    "在 {{city}} 的 {{name}} 上，您的展台是您面向 {{sector}} 行业的名片。Standarte 以自有工坊设计与搭建，并采用经审核的项目体系，确保所建即所批。",
    "为在 {{city}} 举办的 {{name}} 提供展台设计与搭建。Standarte 融合 20 年经验、自有工坊与可查验的项目档案，助您在 {{sector}} 中脱颖而出。",
    "Standarte 将您的展台带到 {{name}}（{{city}}）：为 {{sector}} 行业量身设计、高级木作与自有搭建，并对项目全程进行审核跟踪。"
  ],
  "hi": [
    "Standarte {{city}} में {{name}} के लिए स्टॉल बनाता है — {{sector}} में उत्कृष्टता दर्शाने वाला स्थान।",
    "{{name}} में प्रदर्शनी लगा रहे हैं? Standarte अपनी कार्यशाला में {{city}} में स्टॉल बनाता है, {{sector}} के लिए तैयार।",
    "{{name}} ({{city}}) के लिए स्वतंत्र-डिज़ाइन स्टॉल, {{sector}} में ध्यान आकर्षित करने के लिए।",
    "{{city}} में {{name}} पर, आपका स्टॉल {{sector}} के समक्ष परिचय-पत्र है। अपनी कार्यशाला में निर्मित।",
    "{{city}} में {{name}} के लिए स्टॉल डिज़ाइन और निर्माण। अपनी कार्यशाला, {{sector}} के लिए आदर्श।",
    "Standarte आपका स्टॉल {{name}} ({{city}}) तक ले जाता है: {{sector}} के लिए अनुकूलित डिज़ाइन।"
  ],
  "ko": [
    "Standarte는 {{city}}에서 열리는 {{name}}을(를) 위한 고급 목공 부스의 설계 및 시공 통합 서비스를 제공합니다. {{sector}} 분야의 주요 행사인 만큼, 귀사의 브랜드에는 기술적 탁월함을 전하는 공간이 필요합니다.",
    "{{name}}에 참가하시나요? Standarte는 자체 공방에서 {{city}}에 귀사의 맞춤형 부스를 설계하고 시공하며, {{sector}} 분야에서 돋보이도록 고안된 고급 목공 마감을 선사합니다.",
    "{{name}}({{city}})을(를) 위한 자유 설계 부스. Standarte는 설계, 제작, 물류, 시공에 이르는 전 과정을 직접 관리하여 귀사의 브랜드가 {{sector}} 분야에서 주목을 이끌도록 합니다.",
    "{{city}}의 {{name}}에서 귀사의 부스는 {{sector}} 분야를 향한 명함입니다. Standarte는 자체 공방과 감사를 거친 프로젝트 시스템으로 이를 설계하고 시공하여, 시공된 결과물이 승인된 내용과 일치함을 보장합니다.",
    "{{city}}에서 열리는 {{name}}을(를) 위한 부스 설계 및 시공. Standarte는 20년의 경험, 자체 공방, 검증 가능한 프로젝트 기록을 결합하여 {{sector}}에서 돋보이기에 이상적입니다.",
    "Standarte는 귀사의 부스를 {{name}}({{city}})까지 가져갑니다: {{sector}} 분야를 위한 맞춤 설계, 고급 목공, 자체 시공, 그리고 처음부터 끝까지 감사를 거친 프로젝트 관리와 함께합니다."
  ],
  "ja": [
    "Standarteは、{{city}}で開催される{{name}}向けに、高級木工ブースの設計・施工を一貫して提供します。{{sector}}分野の注目のイベントとして、貴社ブランドには技術的卓越性を伝える空間が必要です。",
    "{{name}}に出展されますか？Standarteでは自社工房にて、{{city}}に貴社のオーダーメイドブースを設計・施工し、{{sector}}分野で際立つよう考え抜かれた高級木工の仕上げをご提供します。",
    "{{name}}（{{city}}）向けの自由設計ブース。Standarteは設計・製作・物流・施工の全工程を管理し、貴社ブランドが{{sector}}で注目を集められるようにします。",
    "{{city}}の{{name}}において、貴社のブースは{{sector}}分野に向けた名刺です。Standarteは自社工房と監査済みのプロジェクト体制でこれを設計・施工し、施工されたものが承認されたものと一致することを保証します。",
    "{{city}}で開催される{{name}}向けのブース設計・施工。Standarteは20年の経験、自社工房、検証可能なプロジェクト記録を兼ね備え、{{sector}}で際立つのに最適です。",
    "Standarteは貴社のブースを{{name}}（{{city}}）へお届けします：{{sector}}分野向けのオーダーメイド設計、高級木工、自社施工に加え、最初から最後まで監査済みのプロジェクト管理を伴います。"
  ]
};

// Hash estable (djb2-ish) del slug -> índice de variante. Determinista entre builds.
function pickIndex(slug, n) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) h = ((h * 33) ^ slug.charCodeAt(i)) >>> 0;
  return h % n;
}

/** Devuelve la intro variada para una feria, con los marcadores sustituidos. */
export function pickIntroVariant(lang, slug, name, city, sector) {
  const arr = (introVariants[lang] && introVariants[lang].length) ? introVariants[lang] : introVariants.es;
  const v = arr[pickIndex(String(slug || ""), arr.length)];
  return v.replace(/\{\{name\}\}/g, name).replace(/\{\{city\}\}/g, city).replace(/\{\{sector\}\}/g, sector);
}
