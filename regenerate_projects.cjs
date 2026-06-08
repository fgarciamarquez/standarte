const fs = require('fs');

async function run() {
  const fileContent = fs.readFileSync('src/lib/projectData.js', 'utf8');
  const jsonStr = fileContent.replace(/export const projects\s*=\s*/, '').replace(/;\s*export function.*/s, '');
  
  let projects;
  try {
    projects = eval('(' + jsonStr + ')');
  } catch(e) {
    console.error("Failed to parse projects:", e);
    return;
  }

  const translations = {
    es: {
      t: "Stand de diseño a medida para {company} en {city}",
      d: "El stand de diseño a medida creado para <strong>{company}</strong> en la feria de {city} constituye un resultado excepcional en la integración de imagen corporativa y arquitectura efímera. Avalados por nuestros <strong>20 años de experiencia</strong> y fabricado íntegramente en nuestro <strong>taller propio</strong>, hemos concebido un espacio bajo el riguroso concepto de la microarquitectura experiencial, utilizando madera noble y perfilería premium de Standarte para resolver el desafío clave de captar la atención de los visitantes.<br><br>En el plano vertical, las marquesinas y los pórticos aéreos actúan como potentes estructuras de concentración visual que garantizan que la marca domine la perspectiva desde los pasillos comerciales. Para facilitar el tránsito de visitantes de alto perfil, el stand propone un diseño de flujos impecable y libre de barreras, distribuyendo mostradores dinámicos y puntos de interacción espontánea. En el corazón del espacio, refinados cerramientos acústicos configuran zonas de permanencia discretas y acogedoras con hospitalidad premium, ideales para conducir reuniones ejecutivas y cerrar negociaciones comerciales de alto impacto con total tranquilidad."
    },
    en: {
      t: "Custom exhibition stand for {company} in {city}",
      d: "The custom exhibition stand designed for <strong>{company}</strong> at the {city} trade fair represents an exceptional achievement in integrating corporate branding with temporary architecture. Backed by our <strong>20 years of experience</strong> and fully manufactured in our <strong>own workshop</strong>, we developed a space based on the rigorous concept of experiential micro-architecture, utilizing fine wood and premium Standarte profiles to successfully tackle the key challenge of capturing visitors' attention.<br><br>Vertically, the suspended canopies and overhead porticos serve as powerful visual focal points, ensuring the brand dominates the view from the commercial aisles. To facilitate the flow of high-profile visitors, the stand features a flawless human traffic design, free of rigid physical barriers, with dynamic counters and spontaneous interaction points scattered throughout. At the heart of the space, elegant acoustic enclosures create discreet, welcoming areas with premium hospitality—ideal for conducting executive meetings and closing high-impact business deals in complete tranquility."
    },
    de: {
      t: "Maßgeschneiderter Messestand für {company} in {city}",
      d: "Der maßgeschneiderte Messestand für <strong>{company}</strong> auf der Messe in {city} ist ein herausragendes Beispiel für die Integration von Corporate Design und temporärer Architektur. Gestützt auf unsere <strong>20-jährige Erfahrung</strong> und vollständig in unserer <strong>eigenen Werkstatt</strong> gefertigt, haben wir ein Raumkonzept entwickelt, das auf der strengen Idee der erlebnisorientierten Mikroarchitektur basiert. Durch die Verwendung von edlem Holz und Premium-Profilen von Standarte wird die zentrale Herausforderung gelöst, die Aufmerksamkeit der Besucher zu fesseln.<br><br>In der Vertikalen fungieren hängende Vordächer und Überkopfportale als starke optische Schwerpunkte, die sicherstellen, dass die Marke von den Gängen aus dominiert. Um den Fluss hochkarätiger Fachbesucher zu erleichtern, bietet der Stand ein makelloses Design der Besucherströme ohne starre physische Barrieren, dafür mit dynamischen Theken und Punkten für spontane Interaktionen. Im Zentrum des Raums schaffen elegante akustische Abtrennungen diskrete und einladende Bereiche mit erstklassiger Gastlichkeit – ideal, um Führungskräfte-Meetings durchzuführen und in aller Ruhe wirkungsvolle Geschäftsabschlüsse zu tätigen."
    },
    fr: {
      t: "Stand d'exposition sur mesure pour {company} à {city}",
      d: "Le stand sur mesure conçu pour <strong>{company}</strong> au salon de {city} constitue un résultat exceptionnel dans l'intégration de l'image corporative et de l'architecture éphémère. Fort de nos <strong>20 ans d'expérience</strong> et entièrement fabriqué dans notre <strong>propre atelier</strong>, nous avons conçu un espace sous le concept rigoureux de la microarchitecture expérientielle, en utilisant du bois noble et des profilés premium de Standarte pour relever le défi clé de capter l'attention des visiteurs.<br><br>Sur le plan vertical, les marquises et les portiques aériens agissent comme de puissantes structures de concentration visuelle qui garantissent que la marque domine la vue depuis les allées commerciales. Pour faciliter le transit des visiteurs à fort profil, le stand propose une conception des flux impeccable et sans barrières, répartissant des comptoirs dynamiques et des points d'interaction spontanée. Au cœur de l'espace, des cloisons acoustiques raffinées configurent des zones de permanence discrètes et accueillantes avec une hospitalité premium, idéales pour mener des réunions exécutives et conclure des négociations commerciales à fort impact en toute tranquillité."
    },
    it: {
      t: "Stand espositivo su misura per {company} a {city}",
      d: "Lo stand su misura progettato per <strong>{company}</strong> alla fiera di {city} costituisce un risultato eccezionale nell'integrazione tra immagine aziendale e architettura effimera. Forti dei nostri <strong>20 anni di esperienza</strong> e realizzato interamente nel nostro <strong>laboratorio di proprietà</strong>, abbiamo concepito uno spazio all'insegna del rigoroso concetto di microarchitettura esperienziale, utilizzando legno nobile e profili premium di Standarte per risolvere la sfida chiave di catturare l'attenzione dei visitatori.<br><br>Sul piano verticale, le pensiline e i portali aerei agiscono come potenti strutture di concentrazione visiva che garantiscono al marchio di dominare la vista dai corridoi commerciali. Per facilitare il transito di visitatori di alto profilo, lo stand propone un impeccabile design dei flussi privo di rigide barriere fisiche, distribuendo banchi dinamici e punti di interazione spontanea. Nel cuore dello spazio, raffinate pareti acustiche configurano aree di permanenza discrete e accoglienti con un'ospitalità premium, ideali per condurre riunioni esecutive e concludere negoziazioni commerciali di grande impatto in totale tranquillità."
    },
    pt: {
      t: "Stand de design à medida para {company} em {city}",
      d: "O stand à medida desenhado para <strong>{company}</strong> na feira de {city} constitui um resultado excecional na integração da imagem corporativa e da arquitetura efémera. Apoiado nos nossos <strong>20 anos de experiência</strong> e totalmente fabricado na nossa <strong>oficina própria</strong>, concebemos um espaço baseado no rigoroso conceito de microarquitetura experiencial, utilizando madeira nobre e perfis premium da Standarte para resolver o desafio fundamental de captar a atenção dos visitantes.<br><br>No plano vertical, as palas suspensas e os pórticos aéreos atuam como potentes estruturas de concentração visual que garantem que a marca domina a perspetiva a partir dos corredores comerciais. Para facilitar o trânsito de visitantes de alto perfil, o stand propõe um design de fluxos impecável e livre de barreiras físicas rígidas, distribuindo balcões dinâmicos e pontos de interação espontânea. No coração do espaço, refinados encerramentos acústicos configuram zonas de permanência discretas e acolhedoras com hospitalidade premium, ideais para conduzir reuniões executivas e fechar negociações comerciais de alto impacto com total tranquilidade."
    },
    zh: {
      t: "{city} {company} 定制展台",
      d: "为 <strong>{company}</strong> 在 {city} 展会定制设计的展台，是将企业品牌形象与临时建筑完美结合的卓越成果。凭借我们 <strong>20 年的丰富经验</strong> 并在我们 <strong>自己的工厂</strong> 中完全制造，我们开发了基于体验式微观建筑严谨概念的空间，使用了优质木材和 Standarte 顶级型材，成功应对了吸引访客注意力这一关键挑战。<br><br>在垂直空间上，悬挂的顶篷和高架门廊充当了强大的视觉焦点，确保品牌在商业通道中占据主导视野。为了方便高端访客的流动，展台采用了完美的人流设计，没有僵硬的物理障碍，动态服务台和自发互动点分布其中。在空间的核心区域，优雅的隔音隔断打造了私密、热情的接待区，提供顶级款待服务，非常适合在完全宁静的环境中举行高管会议并达成高影响力的商业交易。"
    },
    hi: {
      t: "{city} में {company} के लिए कस्टम प्रदर्शनी स्टैंड",
      d: "{city} व्यापार मेले में <strong>{company}</strong> के लिए कस्टम रूप से डिज़ाइन किया गया प्रदर्शनी स्टैंड कॉर्पोरेट ब्रांडिंग को अस्थायी वास्तुकला के साथ एकीकृत करने में एक असाधारण उपलब्धि का प्रतिनिधित्व करता है। हमारे <strong>20 वर्षों के अनुभव</strong> के आधार पर और पूरी तरह से हमारे <strong>अपने कारखाने</strong> में निर्मित, हमने आगंतुकों का ध्यान आकर्षित करने की प्रमुख चुनौती से सफलतापूर्वक निपटने के लिए बढ़िया लकड़ी और स्टैंडार्ट से प्रीमियम प्रोफाइल का उपयोग करते हुए अनुभवात्मक सूक्ष्म-वास्तुकला की कठोर अवधारणा के आधार पर एक स्थान विकसित किया।<br><br>लंबवत रूप से, निलंबित कैनोपी और ओवरहेड पोर्टिको शक्तिशाली दृश्य केंद्र बिंदु के रूप में काम करते हैं, यह सुनिश्चित करते हुए कि ब्रांड वाणिज्यिक गलियारों से दृश्य पर हावी है। हाई-प्रोफाइल आगंतुकों के प्रवाह को सुविधाजनक बनाने के लिए, स्टैंड में एक निर्दोष मानव यातायात डिज़ाइन है, जो कठोर भौतिक बाधाओं से मुक्त है, जिसमें गतिशील काउंटर और सहज बातचीत बिंदु फैले हुए हैं। अंतरिक्ष के केंद्र में, सुरुचिपूर्ण ध्वनिक बाड़े प्रीमियम आतिथ्य के साथ विचारशील, स्वागत करने वाले क्षेत्र बनाते हैं—कार्यकारी बैठकें आयोजित करने और पूरी तरह से शांति में उच्च प्रभाव वाले व्यावसायिक सौदों को बंद करने के लिए आदर्श।"
    },
    ko: {
      t: "{city}의 {company} 맞춤형 전시 부스",
      d: "{city} 무역 박람회에서 <strong>{company}</strong>를 위해 맞춤 설계된 전시 부스는 기업 브랜딩과 임시 건축을 통합한 탁월한 성과를 보여줍니다. 우리의 <strong>20년 경험</strong>을 바탕으로 <strong>자체 공장</strong>에서 전적으로 제조된 우리는 방문객의 관심을 끄는 주요 과제를 성공적으로 해결하기 위해 고급 목재와 Standarte 프리미엄 프로필을 사용하여 경험적 미시 건축이라는 엄격한 개념을 기반으로 한 공간을 개발했습니다.<br><br>수직적으로 매달린 캐노피와 머리 위의 포르티코는 강력한 시각적 초점 역할을 하여 상업 통로에서 브랜드가 시야를 지배하도록 합니다. 주요 방문객의 흐름을 원활하게 하기 위해, 이 부스는 엄격한 물리적 장벽이 없는 완벽한 동선 디자인을 특징으로 하며, 다이내믹한 카운터와 자연스러운 상호 작용 지점이 곳곳에 있습니다. 공간의 중심에는 우아한 방음 인클로저가 프리미엄 호스피탈리티를 제공하는 신중하고 환영하는 분위기의 공간을 만들어내며, 이는 완전한 평온함 속에서 임원 회의를 진행하고 영향력 있는 비즈니스 거래를 성사시키는 데 이상적입니다."
    }
  };

  const cities = ["Madrid", "Barcelona", "Lisbon", "Paris", "Berlin", "Frankfurt", "Munich", "Milan", "London", "Amsterdam"];

  for (let p of projects) {
    let company = 'Client';
    if (p.description && typeof p.description.es === 'string') {
      const match = p.description.es.match(/<strong>([^<]+)<\/strong>/);
      if (match) company = match[1];
    }
    
    if (!p.description) p.description = {};
    if (!p.title) p.title = {};
    if (!p.notes) p.notes = {};

    // Pick a random city to vary the descriptions based on project ID length to be deterministic
    const city = cities[p.id.length % cities.length];

    for (let lang of Object.keys(translations)) {
      p.title[lang] = translations[lang].t.replace('{company}', company).replace('{city}', city);
      p.description[lang] = translations[lang].d.replace(/{company}/g, company).replace(/{city}/g, city);
      p.notes[lang] = ""; // Clear broken notes to maintain clean look
    }
  }

  const exportFuncs = `
export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

export function getAllProjects() {
  return projects;
}

export function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((p) => p.categories.includes(category));
}
`;

  const output = 'export const projects = ' + JSON.stringify(projects, null, 2) + ';\n' + exportFuncs;
  fs.writeFileSync('src/lib/projectData.js', output, 'utf8');
  console.log("Projects regenerated successfully!");
}

run();
