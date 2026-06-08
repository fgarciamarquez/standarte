const fs = require('fs');

async function fixSiteData() {
  const filePath = 'src/lib/siteData.js';
  let content = fs.readFileSync(filePath, 'utf8');

  // We will build a new cityData object properly formatted in 9 languages for all 6 cities
  const newCityDataStr = `export const cityData = {
  madrid: {
    city: { es: 'Madrid', en: 'Madrid', de: 'Madrid', zh: '马德里', hi: 'मैड्रिड', pt: 'Madrid', fr: 'Madrid', it: 'Madrid', ko: '마드리드' },
    content: {
      es: {
        intro: 'Madrid concentra una parte esencial de la actividad ferial en España. En Standarte desarrollamos stands en Madrid con 20 años de experiencia y un taller propio que garantiza un proceso impecable: diseño técnico, producción, logística, montaje, validaciones y coordinación in situ antes de la apertura del evento.',
        detail: 'Este servicio está dirigido a agencias de comunicación y marcas que necesitan una ejecución fiable, acabados cuidados y un stand listo para recibir a visitantes profesionales.'
      },
      en: {
        intro: 'Madrid concentrates an essential part of trade fair activity in Spain. At Standarte, backed by 20 years of experience and our own workshop, we develop exhibition stands in Madrid through a complete process: technical design, production, logistics, installation, validation, and on-site coordination before the event opens.',
        detail: 'This service is aimed at communication agencies and brands that need reliable execution, careful finishes, and a stand ready for professional visitors.'
      },
      de: {
        intro: 'Madrid konzentriert einen wesentlichen Teil der Messeaktivitäten in Spanien. Bei Standarte, gestützt auf 20 Jahre Erfahrung und unsere eigene Werkstatt, realisieren wir Messestände in Madrid mit einem vollständigen Ablauf: technisches Design, Produktion, Logistik, Montage, Validierung und Koordination vor Ort.',
        detail: 'Dieser Service richtet sich an Kommunikationsagenturen und Marken, die eine zuverlässige Ausführung, sorgfältige Oberflächen und einen professionell vorbereiteten Stand benötigen.'
      },
      pt: {
        intro: 'Madrid concentra uma parte essencial da atividade em feiras de Espanha. Na Standarte, apoiados nos nossos 20 anos de experiência e oficina própria, desenvolvemos stands de exposição em Madrid através de um processo completo: design técnico, produção, logística, instalação, validação e coordenação no local.',
        detail: 'Este serviço é direcionado a agências de comunicação e marcas que necessitam de execução fiável, acabamentos cuidadosos e um stand pronto para os visitantes profissionais.'
      },
      fr: {
        intro: 'Madrid concentre une part essentielle de l\\'activité des salons en Espagne. Chez Standarte, forts de 20 ans d\\'expérience et de notre propre atelier, nous développons des stands d\\'exposition à Madrid selon un processus complet : conception, production, logistique, installation, validation et coordination sur place.',
        detail: 'Ce service s\\'adresse aux agences de communication et aux marques ayant besoin d\\'une exécution fiable, de finitions soignées et d\\'un stand prêt pour les visiteurs professionnels.'
      },
      it: {
        intro: 'Madrid concentra una parte essenziale dell\\'attività fieristica in Spagna. In Standarte, forti dei nostri 20 anni di esperienza e del nostro laboratorio di proprietà, sviluppiamo stand a Madrid attraverso un processo completo: progettazione tecnica, produzione, logistica, montaggio, convalida e coordinamento in loco.',
        detail: 'Questo servizio è rivolto ad agenzie di comunicazione e marchi che necessitano di un\\'esecuzione affidabile, finiture curate e uno stand pronto per i visitatori professionali.'
      },
      zh: {
        intro: '马德里集中了西班牙贸易展览活动的重要部分。在 Standarte，凭借 20 年的丰富经验和自己的工厂，我们通过完整的过程在马德里开发展览摊位：技术设计，生产，物流，安装，验证和活动开始前的现场协调。',
        detail: '此服务针对需要可靠执行、精细外观和为专业访客准备好展台的通信机构和品牌。'
      },
      hi: {
        intro: 'मैड्रिड स्पेन में व्यापार मेला गतिविधि का एक आवश्यक हिस्सा केंद्रित करता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, हम मैड्रिड में एक पूरी प्रक्रिया के माध्यम से प्रदर्शनी स्टैंड विकसित करते हैं: तकनीकी डिजाइन, उत्पादन, रसद, स्थापना, सत्यापन, और घटना खुलने से पहले ऑन-साइट समन्वय।',
        detail: 'यह सेवा उन संचार एजेंसियों और ब्रांडों के लिए है जिन्हें विश्वसनीय निष्पादन, सावधानीपूर्वक परिष्करण और पेशेवर आगंतुकों के लिए तैयार स्टैंड की आवश्यकता है।'
      },
      ko: {
        intro: '마드리드는 스페인의 무역 박람회 활동의 핵심적인 부분을 집중시킵니다. Standarte에서는 20년의 경험과 자체 공장의 지원을 받아 완전한 과정을 통해 마드리드에 전시 부스를 개발합니다: 기술 디자인, 생산, 물류, 설치, 검증 및 이벤트 시작 전 현장 조정.',
        detail: '이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 맞이할 준비가 된 부스가 필요한 커뮤니케이션 대행사와 브랜드를 대상으로 합니다.'
      }
    }
  },
  barcelona: {
    city: { es: 'Barcelona', en: 'Barcelona', de: 'Barcelona', zh: '巴塞罗那', hi: 'बार्सिलोना', pt: 'Barcelona', fr: 'Barcelone', it: 'Barcellona', ko: '바르셀로나' },
    content: {
      es: {
        intro: 'Como sede de eventos mundiales como el MWC o ISE, Barcelona exige un nivel de producción sobresaliente. En Standarte, con 20 años de experiencia y taller propio, diseñamos, fabricamos y montamos stands de alto impacto en Fira de Barcelona.',
        detail: 'Aportamos fiabilidad técnica y un acabado Premium, resolviendo los retos de logística y normativas del recinto para que el cliente solo tenga que centrarse en sus objetivos comerciales.'
      },
      en: {
        intro: 'As the venue for global events like MWC and ISE, Barcelona demands outstanding production levels. At Standarte, with 20 years of experience and our own workshop, we design, manufacture, and assemble high-impact stands at Fira de Barcelona.',
        detail: 'We provide technical reliability and a Premium finish, overcoming logistics and venue regulations so the client can focus solely on their commercial goals.'
      },
      de: {
        intro: 'Als Austragungsort globaler Events wie MWC und ISE erfordert Barcelona herausragende Produktionsstandards. Bei Standarte entwerfen, fertigen und montieren wir mit 20 Jahren Erfahrung und eigener Werkstatt wirkungsvolle Messestände in der Fira de Barcelona.',
        detail: 'Wir bieten technische Zuverlässigkeit und Premium-Oberflächen und meistern logistische Herausforderungen, damit sich der Kunde ganz auf seine Ziele konzentrieren kann.'
      },
      pt: {
        intro: 'Como sede de eventos globais como o MWC ou ISE, Barcelona exige um nível de produção excecional. Na Standarte, com 20 anos de experiência e oficina própria, desenhamos, fabricamos e montamos stands de grande impacto na Fira de Barcelona.',
        detail: 'Aportamos fiabilidade técnica e um acabamento Premium, resolvendo os desafios de logística e normativas do recinto para que o cliente se concentre nos seus objetivos.'
      },
      fr: {
        intro: 'En tant qu\\'hôte d\\'événements mondiaux comme le MWC ou l\\'ISE, Barcelone exige un niveau de production exceptionnel. Chez Standarte, avec 20 ans d\\'expérience et notre propre atelier, nous concevons, fabriquons et montons des stands à fort impact à la Fira de Barcelona.',
        detail: 'Nous apportons une fiabilité technique et une finition Premium, résolvant les défis logistiques et réglementaires pour que le client se concentre sur ses objectifs commerciaux.'
      },
      it: {
        intro: 'In quanto sede di eventi globali come MWC o ISE, Barcellona richiede un livello di produzione eccezionale. In Standarte, con 20 anni di esperienza e un laboratorio di proprietà, progettiamo, produciamo e montiamo stand di grande impatto presso la Fira de Barcelona.',
        detail: 'Garantiamo affidabilità tecnica e una finitura Premium, superando le sfide logistiche e normative in modo che il cliente possa concentrarsi sui propri obiettivi.'
      },
      zh: {
        intro: '作为 MWC 和 ISE 等全球赛事的举办地，巴塞罗那需要出色的制作水平。在 Standarte，凭借 20 年的经验和自己的工厂，我们在巴塞罗那会展中心设计、制造和组装具有高影响力的展台。',
        detail: '我们提供技术可靠性和高级效果，克服物流和场馆法规，让客户能够专注于他们的商业目标。'
      },
      hi: {
        intro: 'MWC और ISE जैसे वैश्विक आयोजनों के स्थल के रूप में, बार्सिलोना को उत्कृष्ट उत्पादन स्तर की आवश्यकता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के साथ, हम फिरा डी बार्सिलोना में उच्च प्रभाव वाले स्टैंड डिजाइन, निर्माण और इकट्ठा करते हैं।',
        detail: 'हम तकनीकी विश्वसनीयता और एक प्रीमियम खत्म प्रदान करते हैं, रसद और स्थल नियमों पर काबू पाने के लिए ताकि ग्राहक पूरी तरह से अपने व्यावसायिक लक्ष्यों पर ध्यान केंद्रित कर सके।'
      },
      ko: {
        intro: 'MWC 및 ISE와 같은 글로벌 이벤트의 개최지로서 바르셀로나는 뛰어난 생산 수준을 요구합니다. Standarte에서는 20년의 경험과 자체 공장을 바탕으로 Fira de Barcelona에서 큰 영향을 미치는 부스를 설계, 제조 및 조립합니다.',
        detail: '고객이 상업적 목표에만 집중할 수 있도록 물류 및 현장 규정을 극복하여 기술적 신뢰성과 프리미엄 마감을 제공합니다.'
      }
    }
  },
  valencia: {
    city: { es: 'Valencia', en: 'Valencia', de: 'Valencia', zh: '瓦伦西亚', hi: 'वालेंसिया', pt: 'Valência', fr: 'Valence', it: 'Valencia', ko: '발렌시아' },
    content: {
      es: {
        intro: 'Feria Valencia es uno de los recintos más importantes de Europa. Gracias a nuestra red logística, 20 años de experiencia y un gran taller propio, garantizamos montajes de stands de diseño impecable para ferias líderes como Cevisama o FIMMA Maderalia.',
        detail: 'Combinamos una planificación milimétrica en el taller con un equipo de montaje especializado que cuida hasta el último detalle en el recinto.'
      },
      en: {
        intro: 'Feria Valencia is one of the most important venues in Europe. Thanks to our logistics network, 20 years of experience, and a large own workshop, we guarantee flawless custom stand assembly for leading fairs like Cevisama or FIMMA Maderalia.',
        detail: 'We combine rigorous planning in the workshop with a specialized assembly team that takes care of every last detail on-site.'
      },
      de: {
        intro: 'Feria Valencia ist einer der wichtigsten Veranstaltungsorte Europas. Dank unseres Logistiknetzwerks, 20 Jahren Erfahrung und einer großen eigenen Werkstatt garantieren wir tadellose Messestandmontagen für Leitmessen wie Cevisama oder FIMMA Maderalia.',
        detail: 'Wir kombinieren präzise Planung in der Werkstatt mit einem spezialisierten Montageteam, das vor Ort auf jedes Detail achtet.'
      },
      pt: {
        intro: 'A Feria Valencia é um dos recintos mais importantes da Europa. Graças à nossa rede logística, 20 anos de experiência e uma grande oficina própria, garantimos a montagem de stands de design impecável para feiras líderes como Cevisama ou FIMMA Maderalia.',
        detail: 'Combinamos um planeamento rigoroso na oficina com uma equipa de montagem especializada que cuida de cada detalhe no recinto.'
      },
      fr: {
        intro: 'Feria Valencia est l\\'un des lieux les plus importants d\\'Europe. Grâce à notre réseau logistique, 20 ans d\\'expérience et un grand atelier propre, nous garantissons des montages de stands impeccables pour des salons majeurs comme Cevisama ou FIMMA Maderalia.',
        detail: 'Nous combinons une planification rigoureuse en atelier avec une équipe de montage spécialisée qui soigne chaque détail sur place.'
      },
      it: {
        intro: 'Feria Valencia è uno dei poli espositivi più importanti d\\'Europa. Grazie alla nostra rete logistica, a 20 anni di esperienza e a un grande laboratorio di proprietà, garantiamo l\\'allestimento di stand dal design impeccabile per fiere leader come Cevisama o FIMMA Maderalia.',
        detail: 'Combiniamo una rigorosa pianificazione in laboratorio con una squadra di montaggio specializzata che cura ogni dettaglio in loco.'
      },
      zh: {
        intro: '瓦伦西亚会展中心是欧洲最重要的场馆之一。凭借我们的物流网络、20 年的经验和自有大型工厂，我们为 Cevisama 或 FIMMA Maderalia 等领先的展览会提供完美的定制展台搭建。',
        detail: '我们将工厂严谨的计划与专业的组装团队相结合，确保在现场处理好每一个细节。'
      },
      hi: {
        intro: 'फेरिया वालेंसिया यूरोप के सबसे महत्वपूर्ण स्थानों में से एक है। हमारे रसद नेटवर्क, 20 वर्षों के अनुभव और एक बड़े अपने कारखाने के लिए धन्यवाद, हम सेविसामा या FIMMA माडेरालिया जैसे प्रमुख मेलों के लिए निर्दोष कस्टम स्टैंड असेंबली की गारंटी देते हैं।',
        detail: 'हम साइट पर हर अंतिम विवरण का ख्याल रखने वाली एक विशेष असेंबली टीम के साथ कार्यशाला में कठोर योजना को जोड़ते हैं।'
      },
      ko: {
        intro: '페리아 발렌시아는 유럽에서 가장 중요한 장소 중 하나입니다. 당사의 물류 네트워크, 20년의 경험 및 대규모 자체 공장 덕분에 당사는 Cevisama 또는 FIMMA Maderalia와 같은 주요 박람회에 완벽한 맞춤형 부스 조립을 보장합니다.',
        detail: '작업장에서의 엄격한 계획과 현장에서 마지막 세부 사항까지 처리하는 전문 조립 팀을 결합합니다.'
      }
    }
  },
  lisboa: {
    city: { es: 'Lisboa', en: 'Lisbon', de: 'Lissabon', zh: '里斯本', hi: 'लिस्बन', pt: 'Lisboa', fr: 'Lisbonne', it: 'Lisbona', ko: '리스본' },
    content: {
      es: {
        intro: 'Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte desarrolla stands en Lisboa garantizando control total sobre cada fase: diseño, fabricación, logística, instalación y validaciones finales en el recinto.',
        detail: 'Ofrecemos a agencias y expositores directos la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional.'
      },
      en: {
        intro: 'With 20 years of experience building temporary architecture from our own workshop, Standarte develops exhibition stands in Lisbon guaranteeing total control over each phase: design, production, logistics, installation, and final validations on-site.',
        detail: 'We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail.'
      },
      de: {
        intro: 'Mit 20 Jahren Erfahrung in der temporären Architektur, realisiert in unserer eigenen Werkstatt, entwickelt Standarte Messestände in Lissabon und garantiert volle Kontrolle über jede Phase: Design, Produktion, Logistik, Montage und Endabnahmen vor Ort.',
        detail: 'Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit.'
      },
      pt: {
        intro: 'Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte desenvolve stands em Lisboa garantindo o controlo total sobre cada fase: design, fabrico, logística, instalação e validações finais no recinto.',
        detail: 'Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes.'
      },
      fr: {
        intro: 'Avec 20 ans d\\'expérience dans l\\'architecture éphémère depuis notre propre atelier, Standarte développe des stands d\\'exposition à Lisbonne en garantissant un contrôle total : conception, fabrication, logistique, installation et validations.',
        detail: 'Nous offrons aux agences et aux exposants la tranquillité d\\'esprit d\\'un montage sans surprise et une attention exceptionnelle.'
      },
      it: {
        intro: 'Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte sviluppa stand a Lisbona garantendo il controllo totale su ogni fase: progettazione, produzione, logistica, installazione e collaudi.',
        detail: 'Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un\\'eccezionale attenzione ai dettagli.'
      },
      zh: {
        intro: '凭借在我们自己的工厂建设临时建筑的 20 年经验，Standarte 在里斯本开发展览摊位，保证对每个阶段的全面控制：设计，生产，物流，安装和现场最终验证。',
        detail: '我们为机构和直接参展商提供无意外的装配安全感以及对细节的卓越关注。'
      },
      hi: {
        intro: 'हमारे अपने कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, स्टैंडार्ट लिस्बन में प्रदर्शनी स्टैंड विकसित करता है जो प्रत्येक चरण पर कुल नियंत्रण की गारंटी देता है: डिजाइन, उत्पादन, रसद, स्थापना, और ऑन-साइट अंतिम सत्यापन।',
        detail: 'हम एजेंसियों और प्रत्यक्ष प्रदर्शकों को बिना किसी आश्चर्य और असाधारण ध्यान के विधानसभा की मन की शांति प्रदान करते हैं।'
      },
      ko: {
        intro: '자체 공장에서 임시 건축물을 지은 20년의 경험을 바탕으로 Standarte는 리스본에 전시 부스를 개발하여 설계, 생산, 물류, 설치 및 현장 최종 검증 등 각 단계에 대한 완벽한 통제를 보장합니다.',
        detail: '우리는 대행사와 직접 전시자에게 놀라움 없는 조립의 평화로움과 세부 사항에 대한 탁월한 주의를 제공합니다.'
      }
    }
  },
  malaga: {
    city: { es: 'Málaga', en: 'Malaga', de: 'Málaga', zh: '马拉加', hi: 'मलागा', pt: 'Málaga', fr: 'Malaga', it: 'Malaga', ko: '말라가' },
    content: {
      es: {
        intro: 'El crecimiento de Málaga como destino de congresos y ferias tecnológicas es imparable. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en FYCMA.',
        detail: 'Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama.'
      },
      en: {
        intro: 'Malaga\\'s growth as a destination for congresses and technological fairs is unstoppable. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at FYCMA.',
        detail: 'Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes.'
      },
      de: {
        intro: 'Das Wachstum von Málaga als Ziel für Kongresse und Technologiemessen ist unaufhaltsam. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei FYCMA.',
        detail: 'Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen.'
      },
      pt: {
        intro: 'O crescimento de Málaga como destino para congressos e feiras tecnológicas é imparável. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na FYCMA.',
        detail: 'A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência.'
      },
      fr: {
        intro: 'La croissance de Malaga en tant que destination pour les congrès et les salons technologiques est imparable. Avec 20 ans d\\'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l\\'installation des stands à FYCMA.',
        detail: 'Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme.'
      },
      it: {
        intro: 'La crescita di Malaga come destinazione per congressi e fiere tecnologiche è inarrestabile. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l\\'installazione e il coordinamento degli stand presso FYCMA.',
        detail: 'Il nostro team garantisce ai marchi aziendali e alle agenzie creative un\\'esecuzione solida, puntuale e con finiture di alto livello.'
      },
      zh: {
        intro: '马拉加作为大会和技术展览目的地的增长是势不可挡的。凭借 20 年的丰富经验和我们自己顶级的工厂，Standarte 承担了 FYCMA 展台的技术设计、生产、安装和协调。',
        detail: '我们的团队向企业品牌和创意机构保证，执行稳健、准时，并具有高端效果。'
      },
      hi: {
        intro: 'मलागा की कांग्रेस और तकनीकी मेलों के गंतव्य के रूप में वृद्धि अजेय है। 20 वर्षों के अनुभव और एक शीर्ष-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट FYCMA में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।',
        detail: 'हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।'
      },
      ko: {
        intro: '총회 및 기술 박람회의 목적지로서의 말라가의 성장은 막을 수 없습니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 FYCMA에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.',
        detail: '우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다.'
      }
    }
  },
  badajoz: {
    city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz', ko: '바다호스' },
    content: {
      es: {
        intro: 'Badajoz y Extremadura representan un mercado ferial dinámico con eventos de gran tradición. En Standarte diseñamos y montamos stands con 20 años de experiencia y taller propio en recintos de referencia como IFEBA y FEVAL.',
        detail: 'Nuestra eficiencia logística nos permite responder con rapidez, optimizando costes y garantizando un stand impecable para citas clave como AGROEXPO o FECIEX.'
      },
      en: {
        intro: 'Badajoz and Extremadura represent a highly active ferial hub with deep-rooted events. At Standarte, backed by 20 years of experience and our own workshop, we design and assemble stands in key regional venues such as IFEBA and FEVAL.',
        detail: 'Our logistics efficiency allows us to deliver quick solutions, optimize costs, and guarantee a flawless stand presence for major events like AGROEXPO or FECIEX.'
      },
      de: {
        intro: 'Badajoz und die Region Extremadura sind ein dynamischer Messemarkt mit traditionsreichen Veranstaltungen. Standarte entwirft und montiert mit 20 Jahren Erfahrung und eigener Werkstatt hochwertige Messestände an führenden Standorten wie IFEBA und FEVAL.',
        detail: 'Unsere logistische Effizienz ermöglicht uns schnelle Reaktionszeiten und optimierte Kosten für einen makellosen Stand bei wichtigen Messen wie AGROEXPO.'
      },
      pt: {
        intro: 'Badajoz e a Extremadura representam um mercado de feiras dinâmico com eventos de grande tradição. Na Standarte concebemos e montamos stands com 20 anos de experiência e oficina própria em recintos de referência como IFEBA e FEVAL.',
        detail: 'A nossa eficiência logística permite-nos responder rapidamente, otimizando custos e garantindo um stand impecável para feiras chave como a AGROEXPO.'
      },
      fr: {
        intro: 'Badajoz et l\\'Estrémadure représentent un marché dynamique avec des événements de grande tradition. Nous concevons et montons des stands avec 20 ans d\\'expérience et un propre atelier dans des lieux clés comme IFEBA et FEVAL.',
        detail: 'Notre efficacité logistique nous permet de répondre rapidement, d\\'optimiser les coûts et de garantir un stand impeccable pour des événements majeurs comme AGROEXPO.'
      },
      it: {
        intro: 'Badajoz e l\\'Estremadura rappresentano un mercato fieristico dinamico con eventi di grande tradizione. Progettiamo e allestiamo stand con 20 anni di esperienza e un laboratorio di proprietà in centri di riferimento come IFEBA e FEVAL.',
        detail: 'La nostra efficienza logistica ci consente di rispondere rapidamente, ottimizzare i costi e garantire uno stand impeccabile per appuntamenti chiave come AGROEXPO.'
      },
      zh: {
        intro: '巴达霍斯和埃斯特雷马杜拉代表了一个充满活力且历史悠久的展会市场。凭借 20 年的经验和自己的工厂，我们在该地区的核心展馆（如 IFEBA 和 FEVAL）设计和组装展台。',
        detail: '我们的物流效率使我们能够快速响应、优化成本，并确保在 AGROEXPO 或 FECIEX 等重点展会中为您呈现完美的品牌展台。'
      },
      hi: {
        intro: 'बादाहोज़ और एक्स्ट्रीमादुरा गहरी जड़ें वाले आयोजनों के साथ एक अत्यधिक सक्रिय फेशियल हब का प्रतिनिधित्व करते हैं। 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, स्टैंडार्ट में, हम IFEBA और FEVAL जैसे प्रमुख क्षेत्रीय स्थानों में स्टैंड डिजाइन और इकट्ठा करते हैं।',
        detail: 'हमारी रसद दक्षता हमें त्वरित समाधान देने, लागत का अनुकूलन करने और एग्रोएक्सपीओ या FECIEX जैसे प्रमुख आयोजनों के लिए एक निर्दोष स्टैंड उपस्थिति की गारंटी देने की अनुमति देती है।'
      },
      ko: {
        intro: '바다호스와 엑스트레마두라는 뿌리 깊은 이벤트를 갖춘 매우 활동적인 행사 허브를 대표합니다. 20년의 경험과 자체 공장을 바탕으로 Standarte에서는 IFEBA 및 FEVAL과 같은 주요 지역 행사장에서 스탠드를 디자인하고 조립합니다.',
        detail: '물류 효율성을 통해 당사는 빠른 솔루션을 제공하고 비용을 최적화하며 AGROEXPO 또는 FECIEX와 같은 주요 이벤트에서 완벽한 스탠드 존재를 보장할 수 있습니다.'
      }
    }
  }
};`;

  const startIndex = content.indexOf('export const cityData = {');
  const endIndex = content.indexOf('export const portfolios = [');

  if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + newCityDataStr + '\n\n' + content.substring(endIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("cityData updated successfully with all 6 cities in siteData.js.");
  } else {
    console.error("Could not find the indices.");
  }
}

fixSiteData();
