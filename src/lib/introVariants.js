// Banco de variantes de la meta-description / párrafo destacado de las fichas de feria.
// Objetivo SEO: evitar que ~175 fichas compartan el MISMO texto de intro (riesgo de
// que Google no indexe duplicados). Se elige una variante de forma determinista por
// slug (hash), así cada ficha es estable pero distinta de sus vecinas. Marcadores:
// {{name}} = nombre de feria, {{city}} = ciudad localizada, {{sector}} = sector localizado.
export const introVariants = {
  "es": [
    "Standarte ofrece servicios integrales de diseño y montaje de stands de alta carpintería para {{name}} en {{city}}. Como cita destacada del sector de {{sector}}, tu marca necesita un espacio que transmita excelencia técnica.",
    "¿Expones en {{name}}? En Standarte diseñamos y construimos con taller propio tu stand a medida en {{city}}, con acabados de alta carpintería pensados para destacar en el sector de {{sector}}.",
    "Stand de diseño libre para {{name}} ({{city}}). Standarte controla todo el proceso —diseño, producción, logística y montaje— para que tu marca lidere la atención en {{sector}}.",
    "En {{name}}, en {{city}}, tu stand es tu carta de presentación ante el sector de {{sector}}. Standarte lo diseña y monta con taller propio y un sistema de proyecto auditado que garantiza que lo construido es lo aprobado.",
    "Diseño y construcción de stands para {{name}} en {{city}}. Standarte une 20 años de experiencia, taller propio y un expediente de proyecto verificable, ideal para destacar en {{sector}}.",
    "Standarte lleva tu stand a {{name}} ({{city}}): diseño a medida, alta carpintería y montaje propio para el sector de {{sector}}, con seguimiento auditado del proyecto de principio a fin."
  ],
  "pt": [
    "A Standarte oferece serviços integrais de design e montagem de stands de alta marcenaria para a {{name}} em {{city}}. Como encontro destacado do setor de {{sector}}, a sua marca precisa de um espaço que transmita excelência técnica.",
    "Vai expor na {{name}}? Na Standarte projetamos e construímos com oficina própria o seu stand à medida em {{city}}, com acabamentos de alta marcenaria pensados para se destacar no setor de {{sector}}.",
    "Stand de design livre para a {{name}} ({{city}}). A Standarte controla todo o processo —design, produção, logística e montagem— para que a sua marca lidere a atenção em {{sector}}.",
    "Na {{name}}, em {{city}}, o seu stand é o seu cartão de visita perante o setor de {{sector}}. A Standarte projeta-o e monta-o com oficina própria e um sistema de projeto auditado que garante que o construído é o que foi aprovado.",
    "Design e construção de stands para a {{name}} em {{city}}. A Standarte reúne 20 anos de experiência, oficina própria e um dossier de projeto verificável, ideal para se destacar em {{sector}}.",
    "A Standarte leva o seu stand à {{name}} ({{city}}): design à medida, alta marcenaria e montagem própria para o setor de {{sector}}, com acompanhamento auditado do projeto do início ao fim."
  ],
  "en": [
    "Standarte provides end-to-end design and build services for premium joinery exhibition stands at {{name}} in {{city}}. As a leading event in the {{sector}} sector, your brand needs a space that conveys technical excellence.",
    "Exhibiting at {{name}}? At Standarte we design and build your custom stand in {{city}} in our own workshop, with premium joinery finishes crafted to stand out in the {{sector}} sector.",
    "Custom-design stand for {{name}} ({{city}}). Standarte controls the entire process —design, production, logistics and assembly— so your brand leads the attention in {{sector}}.",
    "At {{name}}, in {{city}}, your stand is your calling card before the {{sector}} sector. Standarte designs and builds it in our own workshop with an audited project system that guarantees what is built is what was approved.",
    "Stand design and construction for {{name}} in {{city}}. Standarte combines 20 years of experience, an in-house workshop and a verifiable project record, ideal for standing out in {{sector}}.",
    "Standarte brings your stand to {{name}} ({{city}}): custom design, premium joinery and in-house assembly for the {{sector}} sector, with audited project tracking from start to finish."
  ],
  "de": [
    "Standarte bietet umfassende Leistungen für Design und Aufbau hochwertiger Messestände in Tischlerqualität für die {{name}} in {{city}}. Als bedeutender Branchentreff im Bereich {{sector}} braucht Ihre Marke einen Raum, der technische Exzellenz vermittelt.",
    "Stellen Sie auf der {{name}} aus? Bei Standarte gestalten und bauen wir Ihren maßgeschneiderten Messestand in {{city}} in eigener Werkstatt, mit hochwertigen Tischlerarbeiten, die im Bereich {{sector}} hervorstechen.",
    "Frei gestalteter Messestand für die {{name}} ({{city}}). Standarte steuert den gesamten Prozess —Design, Produktion, Logistik und Aufbau— damit Ihre Marke die Aufmerksamkeit im Bereich {{sector}} anführt.",
    "Auf der {{name}} in {{city}} ist Ihr Stand Ihre Visitenkarte gegenüber der Branche {{sector}}. Standarte gestaltet und baut ihn in eigener Werkstatt mit einem geprüften Projektsystem, das garantiert, dass das Gebaute dem Freigegebenen entspricht.",
    "Design und Bau von Messeständen für die {{name}} in {{city}}. Standarte vereint 20 Jahre Erfahrung, eine eigene Werkstatt und eine nachprüfbare Projektdokumentation, ideal, um im Bereich {{sector}} hervorzustechen.",
    "Standarte bringt Ihren Stand zur {{name}} ({{city}}): maßgeschneidertes Design, hochwertige Tischlerarbeiten und Aufbau in Eigenregie für die Branche {{sector}}, mit geprüfter Projektbegleitung von Anfang bis Ende."
  ],
  "fr": [
    "Standarte propose des services complets de conception et de montage de stands en menuiserie haut de gamme pour {{name}} à {{city}}. En tant que rendez-vous incontournable du secteur de {{sector}}, votre marque a besoin d'un espace qui transmet l'excellence technique.",
    "Vous exposez à {{name}} ? Chez Standarte, nous concevons et construisons votre stand sur mesure à {{city}} dans notre propre atelier, avec des finitions en menuiserie haut de gamme pensées pour se démarquer dans le secteur de {{sector}}.",
    "Stand à conception libre pour {{name}} ({{city}}). Standarte maîtrise tout le processus —conception, production, logistique et montage— pour que votre marque capte l'attention dans le secteur de {{sector}}.",
    "À {{name}}, à {{city}}, votre stand est votre carte de visite auprès du secteur de {{sector}}. Standarte le conçoit et le monte dans son propre atelier avec un système de projet audité qui garantit que ce qui est construit correspond à ce qui a été approuvé.",
    "Conception et construction de stands pour {{name}} à {{city}}. Standarte associe 20 ans d'expérience, un atelier intégré et un dossier de projet vérifiable, idéal pour se démarquer dans le secteur de {{sector}}.",
    "Standarte emmène votre stand à {{name}} ({{city}}) : conception sur mesure, menuiserie haut de gamme et montage en interne pour le secteur de {{sector}}, avec un suivi de projet audité du début à la fin."
  ],
  "it": [
    "Standarte offre servizi integrali di progettazione e allestimento di stand in falegnameria di alto livello per {{name}} a {{city}}. In quanto appuntamento di riferimento del settore {{sector}}, il tuo marchio ha bisogno di uno spazio che trasmetta eccellenza tecnica.",
    "Esponi a {{name}}? In Standarte progettiamo e realizziamo con officina propria il tuo stand su misura a {{city}}, con finiture in falegnameria di alto livello pensate per distinguerti nel settore {{sector}}.",
    "Stand a progettazione libera per {{name}} ({{city}}). Standarte controlla l'intero processo —progettazione, produzione, logistica e allestimento— affinché il tuo marchio conquisti l'attenzione nel settore {{sector}}.",
    "A {{name}}, a {{city}}, il tuo stand è il tuo biglietto da visita di fronte al settore {{sector}}. Standarte lo progetta e lo allestisce con officina propria e un sistema di progetto verificato che garantisce che ciò che viene costruito corrisponde a quanto approvato.",
    "Progettazione e costruzione di stand per {{name}} a {{city}}. Standarte unisce 20 anni di esperienza, officina propria e un dossier di progetto verificabile, ideale per distinguersi nel settore {{sector}}.",
    "Standarte porta il tuo stand a {{name}} ({{city}}): progettazione su misura, falegnameria di alto livello e allestimento interno per il settore {{sector}}, con monitoraggio verificato del progetto dall'inizio alla fine."
  ],
  "nl": [
    "Standarte biedt totaaldiensten voor het ontwerp en de bouw van hoogwaardige maatwerk beursstands voor {{name}} in {{city}}. Als toonaangevend evenement in de sector {{sector}} heeft uw merk een ruimte nodig die technische topkwaliteit uitstraalt.",
    "Exposeert u op {{name}}? Bij Standarte ontwerpen en bouwen we uw stand op maat in {{city}} in ons eigen atelier, met hoogwaardige houtafwerkingen die opvallen in de sector {{sector}}.",
    "Vrij ontworpen stand voor {{name}} ({{city}}). Standarte beheert het hele proces —ontwerp, productie, logistiek en montage— zodat uw merk de aandacht trekt in {{sector}}.",
    "Op {{name}}, in {{city}}, is uw stand uw visitekaartje voor de sector {{sector}}. Standarte ontwerpt en bouwt hem in eigen atelier met een geauditeerd projectsysteem dat garandeert dat wat gebouwd wordt overeenkomt met wat is goedgekeurd.",
    "Ontwerp en bouw van stands voor {{name}} in {{city}}. Standarte combineert 20 jaar ervaring, een eigen atelier en een verifieerbaar projectdossier, ideaal om op te vallen in {{sector}}.",
    "Standarte brengt uw stand naar {{name}} ({{city}}): maatwerkontwerp, hoogwaardig houtwerk en montage in eigen beheer voor de sector {{sector}}, met geauditeerde projectopvolging van begin tot eind."
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
    "Standarte {{city}} में आयोजित {{name}} के लिए उच्च-स्तरीय काष्ठकला वाले स्टॉल के डिज़ाइन और निर्माण की संपूर्ण सेवाएँ प्रदान करता है। {{sector}} क्षेत्र के एक प्रमुख आयोजन के रूप में, आपके ब्रांड को ऐसा स्थान चाहिए जो तकनीकी उत्कृष्टता को दर्शाए।",
    "{{name}} में प्रदर्शनी लगा रहे हैं? Standarte में हम अपनी कार्यशाला में {{city}} में आपका अनुकूलित स्टॉल डिज़ाइन और निर्मित करते हैं, जिसमें {{sector}} क्षेत्र में अलग दिखने के लिए तैयार उच्च-स्तरीय काष्ठकला की फिनिशिंग होती है।",
    "{{name}} ({{city}}) के लिए स्वतंत्र-डिज़ाइन स्टॉल। Standarte पूरी प्रक्रिया —डिज़ाइन, उत्पादन, लॉजिस्टिक्स और निर्माण— को नियंत्रित करता है ताकि आपका ब्रांड {{sector}} में सबसे अधिक ध्यान आकर्षित करे।",
    "{{city}} में {{name}} पर, आपका स्टॉल {{sector}} क्षेत्र के समक्ष आपका परिचय-पत्र है। Standarte इसे अपनी कार्यशाला में और एक ऑडिट किए गए प्रोजेक्ट सिस्टम के साथ डिज़ाइन और निर्मित करता है, जो सुनिश्चित करता है कि जो बनाया गया है वही स्वीकृत किया गया था।",
    "{{city}} में {{name}} के लिए स्टॉल का डिज़ाइन और निर्माण। Standarte 20 वर्षों का अनुभव, अपनी कार्यशाला और एक सत्यापन-योग्य प्रोजेक्ट रिकॉर्ड को जोड़ता है, जो {{sector}} में अलग दिखने के लिए आदर्श है।",
    "Standarte आपका स्टॉल {{name}} ({{city}}) तक ले जाता है: {{sector}} क्षेत्र के लिए अनुकूलित डिज़ाइन, उच्च-स्तरीय काष्ठकला और स्वयं का निर्माण, आरंभ से अंत तक ऑडिट किए गए प्रोजेक्ट अनुवर्तन के साथ।"
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
