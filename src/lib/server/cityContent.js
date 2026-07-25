// Textos de presentación de cada ciudad (intro/detail, 11 idiomas).
//
// Viven aquí, en `server/`, y no en siteData.js, porque pesan ~350 KB y solo se usan
// en un sitio: las tarjetas de ciudad que pinta Site.svelte, y ahí únicamente en el
// idioma de la página. Dentro de siteData.js viajaban íntegros —los 11 idiomas de las
// 100+ ciudades— al bundle del cliente de TODAS las páginas, incluidas las fichas de
// feria, que no muestran ninguno.
//
// El load del servidor selecciona el idioma y pasa solo esa porción (`cityIntros`).
export const cityContent = {
  "elche": {
    "es": {
      "intro": "Elche alberga IFA – Institución Ferial Alicantina, el gran recinto ferial de la provincia de Alicante, sede de Futurmoda —el salón del principal clúster del calzado de Europa— y Firauto. Con 20 años de experiencia y taller propio, Standarte diseña, fabrica, instala y coordina stands en IFA (Elche).",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "Elche is home to IFA – Institución Ferial Alicantina, the major exhibition venue of the Alicante province, host to Futurmoda —the salon of Europe's main footwear cluster— and Firauto. With 20 years of experience and its own workshop, Standarte designs, builds, installs and coordinates stands at IFA (Elche).",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Elche beherbergt IFA – Institución Ferial Alicantina, das große Messegelände der Provinz Alicante, Austragungsort von Futurmoda —der Fachmesse des führenden Schuh-Clusters Europas— und Firauto. Mit 20 Jahren Erfahrung und eigener Werkstatt plant, fertigt, installiert und koordiniert Standarte Messestände bei IFA (Elche).",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail."
    },
    "pt": {
      "intro": "Elche acolhe a IFA – Institución Ferial Alicantina, o grande recinto ferial da província de Alicante, sede da Futurmoda —o salão do principal cluster de calçado da Europa— e da Firauto. Com 20 anos de experiência e oficina própria, a Standarte concebe, produz, instala e coordena stands na IFA (Elche).",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Elche accueille l'IFA – Institución Ferial Alicantina, le grand parc des expositions de la province d'Alicante, siège de Futurmoda —le salon du principal cluster de la chaussure d'Europe— et de Firauto. Avec 20 ans d'expérience et notre propre atelier, Standarte conçoit, fabrique, installe et coordonne des stands à l'IFA (Elche).",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Elche ospita l'IFA – Institución Ferial Alicantina, il grande quartiere fieristico della provincia di Alicante, sede di Futurmoda —il salone del principale cluster calzaturiero d'Europa— e di Firauto. Con 20 anni di esperienza e officina propria, Standarte progetta, produce, installa e coordina stand presso IFA (Elche).",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Elche is de thuisbasis van IFA – Institución Ferial Alicantina, het grote beurscomplex van de provincie Alicante, gastheer van Futurmoda —de vakbeurs van Europa's belangrijkste schoenencluster— en Firauto. Met 20 jaar ervaring en een eigen werkplaats ontwerpt, produceert, installeert en coördineert Standarte stands bij IFA (Elche).",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "埃尔切拥有IFA——阿利坎特省重要展览场馆，是Futurmoda（欧洲主要制鞋产业集群展会）和Firauto的举办地。凭借20年经验和自有工厂，Standarte在IFA（埃尔切）设计、生产、安装并协调展台。",
      "detail": "我们为代理公司和参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "एल्चे में IFA – Institución Ferial Alicantina है, जो अलिकांते प्रांत का प्रमुख प्रदर्शनी स्थल है और Futurmoda —यूरोप के प्रमुख जूता क्लस्टर का सैलून— तथा Firauto की मेज़बानी करता है। 20 वर्षों के अनुभव और अपनी कार्यशाला के साथ, Standarte IFA (एल्चे) में स्टैंड डिज़ाइन, निर्माण, स्थापित और समन्वित करता है।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "엘체에는 알리칸테주의 대표 전시장인 IFA – Institución Ferial Alicantina가 있으며, 유럽 최대 신발 클러스터의 전시회인 Futurmoda와 Firauto를 개최합니다. 20년의 경험과 자체 공방을 갖춘 Standarte가 IFA(엘체)에서 부스를 설계, 제작, 설치 및 조율합니다.",
      "detail": "저희는 에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "エルチェには、アリカンテ県を代表する見本市会場IFA – Institución Ferial Alicantinaがあり、欧州最大の製靴クラスターの見本市であるFuturmodaとFirautoの会場となっています。20年の経験と自社工房を持つStandarteが、IFA（エルチェ）でのブースの設計・製作・設置・調整を担います。",
      "detail": "当社は代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "trujillo": {
    "es": {
      "intro": "Trujillo (Cáceres) es una plaza agroganadera y gastronómica de referencia en Extremadura, con la Feria Agroganadera de Trujillo y la Feria Nacional del Queso, que llena su monumental Plaza Mayor. Con 20 años de experiencia y taller propio, Standarte diseña, fabrica, instala y coordina stands en Trujillo.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "Trujillo (Cáceres) is a leading agri-livestock and gastronomic hub in Extremadura, home to the Feria Agroganadera de Trujillo and the Feria Nacional del Queso, which fills its monumental Plaza Mayor. With 20 years of experience and its own workshop, Standarte designs, builds, installs and coordinates stands in Trujillo.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Trujillo (Cáceres) ist ein bedeutender Standort für Landwirtschaft, Viehzucht und Gastronomie in Extremadura, mit der Feria Agroganadera de Trujillo und der Feria Nacional del Queso, die den monumentalen Plaza Mayor füllen. Mit 20 Jahren Erfahrung und eigener Werkstatt plant, fertigt, installiert und koordiniert Standarte Messestände in Trujillo.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail."
    },
    "pt": {
      "intro": "Trujillo (Cáceres) é uma praça de referência agropecuária e gastronómica na Estremadura espanhola, com a Feria Agroganadera de Trujillo e a Feria Nacional del Queso, que enchem a sua monumental Plaza Mayor. Com 20 anos de experiência e oficina própria, a Standarte concebe, produz, instala e coordena stands em Trujillo.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Trujillo (Cáceres) est une place de référence agropastorale et gastronomique en Estrémadure, avec la Feria Agroganadera de Trujillo et la Feria Nacional del Queso, qui remplissent sa monumentale Plaza Mayor. Avec 20 ans d'expérience et notre propre atelier, Standarte conçoit, fabrique, installe et coordonne des stands à Trujillo.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Trujillo (Cáceres) è una piazza di riferimento agro-zootecnico e gastronomico in Estremadura, con la Feria Agroganadera de Trujillo e la Feria Nacional del Queso, che riempiono la sua monumentale Plaza Mayor. Con 20 anni di esperienza e officina propria, Standarte progetta, produce, installa e coordina stand a Trujillo.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Trujillo (Cáceres) is een toonaangevende locatie voor landbouw, veeteelt en gastronomie in Extremadura, met de Feria Agroganadera de Trujillo en de Feria Nacional del Queso, die het monumentale Plaza Mayor vullen. Met 20 jaar ervaring en een eigen werkplaats ontwerpt, produceert, installeert en coördineert Standarte stands in Trujillo.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "特鲁希略（卡塞雷斯）是埃斯特雷马杜拉重要的农牧业与美食中心，特鲁希略农牧展和国家奶酪展在此举行，展会填满了其宏伟的大广场（Plaza Mayor）。凭借20年经验和自有工厂，Standarte在特鲁希略设计、生产、安装并协调展台。",
      "detail": "我们为代理公司和参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "Trujillo (Cáceres) एक्स्ट्रीमादुरा में कृषि-पशुपालन और गैस्ट्रोनॉमी का एक प्रमुख केंद्र है, जहाँ Feria Agroganadera de Trujillo और Feria Nacional del Queso इसके भव्य Plaza Mayor को भर देते हैं। 20 वर्षों के अनुभव और अपनी कार्यशाला के साथ, Standarte Trujillo में स्टैंड डिज़ाइन, निर्माण, स्थापित और समन्वित करता है।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "트루히요(카세레스)는 엑스트레마두라의 대표적인 농축산·미식 거점으로, 트루히요 농축산 박람회와 전국 치즈 박람회가 웅장한 마요르 광장을 채웁니다. 20년의 경험과 자체 공방을 갖춘 Standarte가 트루히요에서 부스를 설계, 제작, 설치 및 조율합니다.",
      "detail": "저희는 에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "トルヒージョ（カセレス）はエストレマドゥーラを代表する農畜産・美食の拠点で、トルヒージョ農畜産見本市と全国チーズ見本市が壮大なマヨール広場を埋め尽くします。20年の経験と自社工房を持つStandarteが、トルヒージョでのブースの設計・製作・設置・調整を担います。",
      "detail": "当社は代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "santarem": {
    "es": {
      "intro": "Santarém es la capital ferial agrícola de Portugal gracias al CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), el mayor recinto del país, sede de la Feira Nacional de Agricultura, FERSANT, Agroglobal y Lusoflora. Con 20 años de experiencia y taller propio, Standarte diseña, fabrica, instala y coordina stands en el CNEMA.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional en todo el Ribatejo."
    },
    "en": {
      "intro": "Santarém is Portugal's agricultural fair capital thanks to CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), the country's largest venue and home to the Feira Nacional de Agricultura, FERSANT, Agroglobal and Lusoflora. With 20 years of experience and its own workshop, Standarte designs, builds, installs and coordinates stands at CNEMA.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and exceptional attention to detail across the Ribatejo."
    },
    "de": {
      "intro": "Santarém ist dank des CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), dem größten Messegelände Portugals, die landwirtschaftliche Messehauptstadt des Landes und Austragungsort der Feira Nacional de Agricultura, FERSANT, Agroglobal und Lusoflora. Mit 20 Jahren Erfahrung und eigener Werkstatt plant, fertigt, installiert und koordiniert Standarte Messestände im CNEMA.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail im gesamten Ribatejo."
    },
    "pt": {
      "intro": "Santarém é a capital das feiras agrícolas de Portugal graças ao CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), o maior recinto do país, sede da Feira Nacional de Agricultura, da FERSANT, da Agroglobal e da Lusoflora. Com 20 anos de experiência e oficina própria, a Standarte concebe, produz, instala e coordena stands no CNEMA.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional em todo o Ribatejo."
    },
    "fr": {
      "intro": "Santarém est la capitale des salons agricoles du Portugal grâce au CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), le plus grand site du pays, siège de la Feira Nacional de Agricultura, de FERSANT, d'Agroglobal et de Lusoflora. Avec 20 ans d'expérience et notre propre atelier, Standarte conçoit, fabrique, installe et coordonne des stands au CNEMA.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle dans tout le Ribatejo."
    },
    "it": {
      "intro": "Santarém è la capitale fieristica agricola del Portogallo grazie al CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), il più grande polo fieristico del paese, sede della Feira Nacional de Agricultura, di FERSANT, Agroglobal e Lusoflora. Con 20 anni di esperienza e officina propria, Standarte progetta, produce, installa e coordina stand al CNEMA.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune in tutto il Ribatejo."
    },
    "nl": {
      "intro": "Santarém is dankzij het CNEMA (Centro Nacional de Exposições e Mercados Agrícolas), het grootste beurscomplex van Portugal, de landbouwbeurshoofdstad van het land en gastheer van de Feira Nacional de Agricultura, FERSANT, Agroglobal en Lusoflora. Met 20 jaar ervaring en een eigen werkplaats ontwerpt, produceert, installeert en coördineert Standarte stands in het CNEMA.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail in de hele Ribatejo-regio."
    },
    "zh": {
      "intro": "桑塔伦凭借葡萄牙最大的展馆CNEMA（国家农业展览与市场中心）成为葡萄牙的农业展会之都，是全国农业展、FERSANT、Agroglobal和Lusoflora的举办地。凭借20年经验和自有工厂，Standarte在CNEMA设计、生产、安装并协调展台。",
      "detail": "我们为代理公司和参展商提供整个里巴特茹地区毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "Santarém, पुर्तगाल के सबसे बड़े स्थल CNEMA (Centro Nacional de Exposições e Mercados Agrícolas) की बदौलत देश की कृषि मेला राजधानी है, जो Feira Nacional de Agricultura, FERSANT, Agroglobal और Lusoflora की मेज़बानी करता है। 20 वर्षों के अनुभव और अपनी कार्यशाला के साथ, Standarte CNEMA में स्टैंड डिज़ाइन, निर्माण, स्थापित और समन्वित करता है।",
      "detail": "हम एजेंसियों और प्रदर्शकों को पूरे Ribatejo क्षेत्र में बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "산타렘은 포르투갈 최대 전시장인 CNEMA(Centro Nacional de Exposições e Mercados Agrícolas) 덕분에 포르투갈의 농업 박람회 수도로, Feira Nacional de Agricultura, FERSANT, Agroglobal, Lusoflora가 열리는 곳입니다. 20년의 경험과 자체 공방을 갖춘 Standarte가 CNEMA에서 부스를 설계, 제작, 설치 및 조율합니다.",
      "detail": "저희는 리바테주 전역에서 에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "サンタレンはポルトガル最大の会場であるCNEMA（国立農業展示・市場センター）を擁し、Feira Nacional de Agricultura、FERSANT、Agroglobal、Lusofloraが開催される同国の農業見本市の首都です。20年の経験と自社工房を持つStandarteが、CNEMAでのブースの設計・製作・設置・調整を担います。",
      "detail": "当社は代理店や出展者に、リバテージョ地方全域で想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "cadiz": {
    "ja": {
      "intro": "カディスは造船・ブルーエコノミーの拠点であると同時に、ヘレス・デ・ラ・フロンテーラの馬術・農牧の伝統でも知られています。カディス会議場で開催されるBlue Zone Forum Navalia Meeting、そしてヘレスのFeria del CaballoやFegasur（IFECA-Jerez）といった主要な催事を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、これらすべての会場でブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Cádiz combina su vocación naval y de economía azul con la tradición ecuestre y agroganadera de Jerez de la Frontera, con eventos como el Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), la Feria del Caballo de Jerez y Fegasur (IFECA-Jerez). Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en todos estos certámenes.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Cadiz combines its naval and blue-economy vocation with the equestrian and agricultural tradition of Jerez de la Frontera, with events such as the Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), the Feria del Caballo de Jerez and Fegasur (IFECA-Jerez). With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at all these events.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Cádiz verbindet seine Ausrichtung auf Schiffbau und Blue Economy mit der Reit- und Agrartradition von Jerez de la Frontera, mit Veranstaltungen wie dem Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), der Feria del Caballo de Jerez und Fegasur (IFECA-Jerez). Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei all diesen Veranstaltungen.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Cádiz combina a sua vocação naval e de economia azul com a tradição equestre e agropecuária de Jerez de la Frontera, com eventos como o Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), a Feria del Caballo de Jerez e a Fegasur (IFECA-Jerez). Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands em todos estes certames.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Cadix conjugue sa vocation navale et d'économie bleue avec la tradition équestre et agricole de Jerez de la Frontera, avec des événements comme le Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), la Feria del Caballo de Jerez et Fegasur (IFECA-Jerez). Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands lors de tous ces événements.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Cadice unisce la sua vocazione navale e di economia blu alla tradizione equestre e agricola di Jerez de la Frontera, con eventi come il Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), la Feria del Caballo de Jerez e Fegasur (IFECA-Jerez). Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand in tutti questi eventi.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "加的斯将造船与蓝色经济的定位与赫雷斯-德拉弗龙特拉的马术和农牧传统相结合，拥有加的斯会议宫举办的Blue Zone Forum Navalia Meeting、赫雷斯马术节和IFECA-Jerez举办的Fegasur农牧展等重要活动。凭借20年经验和顶级自有工厂，Standarte负责所有这些活动展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "काडिज़ अपनी नौसैनिक एवं ब्लू इकॉनमी की पहचान को हेरेस दे ला फ्रोंतेरा की अश्व एवं कृषि परंपरा के साथ जोड़ता है, जहाँ Blue Zone Forum Navalia Meeting (Palacio de Congresos de Cádiz), Feria del Caballo de Jerez और Fegasur (IFECA-Jerez) जैसे आयोजन होते हैं। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte इन सभी आयोजनों में स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "카디스는 조선·블루이코노미 지향성과 헤레스 데 라 프론테라의 승마·농축산 전통을 함께 갖춘 지역으로, 카디스 회의장에서 열리는 Blue Zone Forum Navalia Meeting, 헤레스의 Feria del Caballo, IFECA-Jerez의 Fegasur 같은 대표 행사를 개최합니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 이 모든 행사에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "granada": {
    "ja": {
      "intro": "グラナダは、アルミジャのFERMASA（グラナダ総合見本市会場）で開催されるFeria General de MuestrasやCONCAB（グラナダ馬術見本市）、グラナダ市内のパルケ・デ・ラス・シエンシアスで開催されるFeria de la Cienciaといった主要な催事を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、これらすべての会場でブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Granada acoge certámenes de referencia como la Feria General de Muestras y CONCAB en FERMASA (Armilla), y la Feria de la Ciencia en el Parque de las Ciencias de Andalucía, en la propia capital. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en todos estos recintos.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Granada hosts flagship events such as the Feria General de Muestras and CONCAB at FERMASA (Armilla), and the Feria de la Ciencia at the Parque de las Ciencias de Andalucía, in the capital itself. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at all these venues.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Granada ist Gastgeber führender Veranstaltungen wie der Feria General de Muestras und CONCAB bei FERMASA (Armilla) sowie der Feria de la Ciencia im Parque de las Ciencias de Andalucía in der Hauptstadt selbst. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen an all diesen Standorten.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Granada acolhe eventos de referência como a Feria General de Muestras e o CONCAB na FERMASA (Armilla), e a Feria de la Ciencia no Parque de las Ciencias de Andalucía, na própria capital. Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands em todos estes recintos.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Grenade accueille des événements phares comme la Feria General de Muestras et CONCAB à FERMASA (Armilla), ainsi que la Feria de la Ciencia au Parque de las Ciencias de Andalucía, dans la capitale même. Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands sur tous ces sites.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Granada ospita eventi di riferimento come la Feria General de Muestras e il CONCAB a FERMASA (Armilla), e la Feria de la Ciencia al Parque de las Ciencias de Andalucía, nella stessa capitale. Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand in tutte queste sedi.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "格拉纳达拥有在阿尔米利亚FERMASA举办的Feria General de Muestras展会和CONCAB马展，以及在格拉纳达市区安达卢西亚科学公园举办的Feria de la Ciencia科学展等重要活动。凭借20年经验和顶级自有工厂，Standarte负责所有这些场馆展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "ग्रानादा में अरमिला के FERMASA में Feria General de Muestras और CONCAB, तथा राजधानी में ही Parque de las Ciencias de Andalucía में Feria de la Ciencia जैसे प्रमुख आयोजन होते हैं। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte इन सभी स्थलों पर स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "그라나다는 아르미야의 FERMASA에서 열리는 Feria General de Muestras와 CONCAB, 그리고 주도 내 안달루시아 과학공원에서 열리는 Feria de la Ciencia 같은 대표 행사를 개최합니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 이 모든 전시장에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "cordoba": {
    "ja": {
      "intro": "コルドバはアンダルシアの主要な農牧業展示会拠点で、CEFCでのIbercaza（狩猟見本市）や、ロス・ペドロチェス地方のポソブランコとビリャヌエバ・デ・コルドバで開催される農牧業見本市を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、これらすべての会場でブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Córdoba es un polo agroganadero de referencia en Andalucía, con eventos como Intercaza (CEFC), la Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches en Pozoblanco y la Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches en Villanueva de Córdoba. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en todos estos certámenes.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Cordoba is a leading agricultural and livestock hub in Andalusia, home to events such as Intercaza (CEFC), the Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches in Pozoblanco and the Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches in Villanueva de Córdoba. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at all these events.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Córdoba ist ein führendes Zentrum für Land- und Viehwirtschaft in Andalusien, mit Veranstaltungen wie Intercaza (CEFC), der Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches in Pozoblanco und der Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches in Villanueva de Córdoba. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei all diesen Veranstaltungen.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Córdova é um polo agropecuário de referência na Andaluzia, com eventos como a Intercaza (CEFC), a Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches em Pozoblanco e a Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches em Villanueva de Córdoba. Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands em todos estes certames.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Cordoue est un pôle agricole et d'élevage de référence en Andalousie, avec des événements comme Intercaza (CEFC), la Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches à Pozoblanco et la Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches à Villanueva de Córdoba. Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands lors de tous ces événements.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Cordova è un polo agricolo e zootecnico di riferimento in Andalusia, con eventi come Intercaza (CEFC), la Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches a Pozoblanco e la Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches a Villanueva de Córdoba. Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand in tutti questi eventi.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "科尔多瓦是安达卢西亚重要的农牧业中心，拥有CEFC举办的Intercaza狩猎展、波索布兰科的洛斯佩德罗切斯农牧食品展和比利亚努埃瓦-德科尔多瓦的DOP洛斯佩德罗切斯伊比利亚火腿展等活动。凭借20年经验和顶级自有工厂，Standarte负责所有这些展会展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "कोर्दोबा अंडालूसिया में एक प्रमुख कृषि एवं पशुधन केंद्र है, जहाँ Intercaza (CEFC), पोसोब्लांको में Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches और विल्यानुएवा दे कोर्दोबा में Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches जैसे आयोजन होते हैं। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte इन सभी आयोजनों में स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "코르도바는 안달루시아의 대표적인 농축산 거점으로, CEFC의 Intercaza(수렵 박람회), 포소블랑코의 로스 페드로체스 농축산식품 박람회, 비야누에바 데 코르도바의 로스 페드로체스 DOP 이베리코 하몬 박람회 같은 행사를 개최합니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 이 모든 행사에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "huelva": {
    "ja": {
      "intro": "ウエルバはベリー類の生産で世界的な存在感を持つ農業県で、フルトス・ロホス国際会議（カサ・コロン会議場）、アラセナのイベリコハム・豚肉見本市、プンタ・ウンブリアの海老・アサリ・カタクチイワシ全国見本市といった主要な催事を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、これらすべての会場でブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Huelva es una potencia agrícola mundial en frutos rojos, con eventos de gran peso como el Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), la Feria del Jamón y Cerdo Ibérico de Aracena y la Feria Nacional de la Gamba, la Chirla y el Boquerón en Punta Umbría. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en todos estos recintos.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Huelva is a world-class agricultural powerhouse in berries, home to major events such as the Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), the Feria del Jamón y Cerdo Ibérico in Aracena and the Feria Nacional de la Gamba, la Chirla y el Boquerón in Punta Umbría. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at all these venues.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Huelva ist eine weltweit führende Anbauregion für Beerenfrüchte, mit bedeutenden Veranstaltungen wie dem Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), der Feria del Jamón y Cerdo Ibérico in Aracena und der Feria Nacional de la Gamba, la Chirla y el Boquerón in Punta Umbría. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen an all diesen Standorten.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Huelva é uma potência agrícola mundial em frutos vermelhos, com eventos de grande relevo como o Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), a Feria del Jamón y Cerdo Ibérico em Aracena e a Feria Nacional de la Gamba, la Chirla y el Boquerón em Punta Umbría. Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands em todos estes recintos.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Huelva est une puissance agricole mondiale dans les fruits rouges, avec des événements de premier plan comme le Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), la Feria del Jamón y Cerdo Ibérico à Aracena et la Feria Nacional de la Gamba, la Chirla y el Boquerón à Punta Umbría. Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands sur tous ces sites.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Huelva è una potenza agricola mondiale nei frutti di bosco, con eventi di rilievo come il Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), la Feria del Jamón y Cerdo Ibérico ad Aracena e la Feria Nacional de la Gamba, la Chirla y el Boquerón a Punta Umbría. Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand in tutte queste sedi.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "韦尔瓦是世界级浆果农业强区，拥有Congreso Internacional de Frutos Rojos（卡萨科隆会议宫）、阿拉塞纳伊比利亚火腿猪肉展和蓬塔翁布里亚全国虾类展等重要展会。凭借20年经验和顶级自有工厂，Standarte负责所有这些场馆展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "हुएल्वा बेरी उत्पादन में विश्व स्तरीय कृषि शक्ति है, जहाँ Congreso Internacional de Frutos Rojos (Palacio de Congresos Casa Colón), अरासेना में Feria del Jamón y Cerdo Ibérico और पुंता उम्ब्रिया में Feria Nacional de la Gamba, la Chirla y el Boquerón जैसे बड़े आयोजन होते हैं। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte इन सभी स्थलों पर स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "우엘바는 베리류 재배로 세계적 위상을 가진 농업 지역으로, 프루토스 로호스 국제회의(카사 콜론 회의장), 아라세나의 이베리코 하몬·돈육 박람회, 푼타 움브리아의 새우·조개·멸치 전국 박람회 같은 주요 행사를 개최합니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 이 모든 전시장에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "jaen": {
    "ja": {
      "intro": "ハエンは世界最大のオリーブオイル産地であり、IFEJA（ハエン見本市・会議宮）はExpoliva、Ibercaza、Feria de los Pueblosといった主要な催事を開催しています。20年の経験と最高水準の自社工房を持つStandarteが、IFEJAでのブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Jaén es la mayor región productora de aceite de oliva del mundo, y su recinto IFEJA (Palacio de Ferias y Congresos de Jaén) acoge certámenes de referencia como Expoliva, Ibercaza y la Feria de los Pueblos. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en IFEJA.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Jaen is the world's largest olive-oil producing region, and its IFEJA venue (Palacio de Ferias y Congresos de Jaén) hosts flagship events such as Expoliva, Ibercaza and Feria de los Pueblos. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at IFEJA.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Jaén ist die weltweit größte Olivenöl-Anbauregion, und das Messegelände IFEJA (Palacio de Ferias y Congresos de Jaén) beherbergt führende Veranstaltungen wie Expoliva, Ibercaza und die Feria de los Pueblos. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei IFEJA.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Jaén é a maior região produtora de azeite do mundo, e o seu recinto IFEJA (Palacio de Ferias y Congresos de Jaén) acolhe eventos de referência como a Expoliva, a Ibercaza e a Feria de los Pueblos. Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands na IFEJA.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Jaén est la plus grande région productrice d'huile d'olive au monde, et son site IFEJA (Palacio de Ferias y Congresos de Jaén) accueille des événements phares comme Expoliva, Ibercaza et la Feria de los Pueblos. Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands à IFEJA.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Jaén è la più grande regione produttrice di olio d'oliva al mondo, e il suo polo fieristico IFEJA (Palacio de Ferias y Congresos de Jaén) ospita eventi di riferimento come Expoliva, Ibercaza e la Feria de los Pueblos. Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand presso IFEJA.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "哈恩是世界最大的橄榄油产区，其IFEJA展览会议宫举办Expoliva、Ibercaza和Feria de los Pueblos等重要展会。凭借20年经验和顶级自有工厂，Standarte负责IFEJA展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "हाएन दुनिया का सबसे बड़ा जैतून तेल उत्पादक क्षेत्र है, और इसका IFEJA स्थल (Palacio de Ferias y Congresos de Jaén) Expoliva, Ibercaza और Feria de los Pueblos जैसे प्रमुख आयोजनों की मेजबानी करता है। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte IFEJA में स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "하엔은 세계 최대의 올리브오일 생산지로, IFEJA 전시장(하엔 전시컨벤션궁)에서 Expoliva, Ibercaza, Feria de los Pueblos 같은 대표 행사가 열립니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 IFEJA에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "almeria": {
    "ja": {
      "intro": "アルメリアはスペイン南東部を代表する農業食品・技術見本市の拠点で、Infoagro Exhibition（アグアドゥルセ展示会議場）やExpolevante（カンポエルモソ展示会議センター、エル・エヒード）といった主要な催事を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、両会場でのブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Almería es un referente agroalimentario y tecnológico del sureste de España, con eventos de gran peso como Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) y Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en ambos recintos.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Almeria is a leading agri-food and technology hub in south-eastern Spain, home to major events such as Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) and Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation and coordination of stands at both venues.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Almería ist ein bedeutendes Zentrum für Agrar- und Technologiemessen im Südosten Spaniens, mit wichtigen Veranstaltungen wie der Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) und der Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen in beiden Messehallen.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Almería é um importante polo agroalimentar e tecnológico do sudeste de Espanha, com eventos de grande relevo como a Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) e a Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). Com 20 anos de experiência e uma oficina própria de primeiro nível, a Standarte assume o design técnico, produção, instalação e coordenação de stands em ambos os recintos.",
      "detail": "A nossa equipa garante a marcas corporativas e agências criativas uma execução robusta, pontual e com acabamentos de alta gama."
    },
    "fr": {
      "intro": "Almería est un pôle agroalimentaire et technologique majeur du sud-est de l'Espagne, avec des événements de premier plan comme Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) et Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). Avec 20 ans d'expérience et un atelier propre de premier niveau, Standarte assure la conception technique, la production, l'installation et la coordination des stands sur ces deux sites.",
      "detail": "Notre équipe garantit aux marques corporatives et aux agences créatives une exécution robuste, ponctuelle et aux finitions haut de gamme."
    },
    "it": {
      "intro": "Almería è un polo agroalimentare e tecnologico di primo piano nel sud-est della Spagna, con eventi di rilievo come Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) ed Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido). Con 20 anni di esperienza e un'officina propria di alto livello, Standarte si occupa della progettazione tecnica, produzione, installazione e coordinamento degli stand in entrambe le sedi.",
      "detail": "Il nostro team garantisce a marchi aziendali e agenzie creative un'esecuzione solida, puntuale e con finiture di alta gamma."
    },
    "zh": {
      "intro": "阿尔梅里亚是西班牙东南部重要的农业食品与科技会展中心，拥有Infoagro Exhibition（阿瓜杜尔塞展览会议宫）和Expolevante（坎波埃尔莫索会展中心，埃尔埃希多）等重要展会。凭借20年经验和顶级自有工厂，Standarte负责这两处场馆展台的技术设计、生产、安装与协调。",
      "detail": "我们的团队保证为企业品牌和创意代理机构提供稳健、准时、高端质感的搭建服务。"
    },
    "hi": {
      "intro": "अल्मेरिया स्पेन के दक्षिण-पूर्व में एक प्रमुख कृषि-खाद्य और प्रौद्योगिकी केंद्र है, जहाँ Infoagro Exhibition (Palacio de Exposiciones y Congresos de Aguadulce) और Expolevante (Centro de Exposiciones y Congresos de Campohermoso, El Ejido) जैसे बड़े आयोजन होते हैं। 20 वर्षों के अनुभव और शीर्ष स्तरीय अपनी कार्यशाला के साथ, Standarte दोनों स्थलों पर स्टैंड के तकनीकी डिज़ाइन, निर्माण, स्थापना और समन्वय की ज़िम्मेदारी लेता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांड्स और क्रिएटिव एजेंसियों को एक मजबूत, समय पर और उच्च स्तरीय फिनिश वाला निष्पादन सुनिश्चित करती है।"
    },
    "ko": {
      "intro": "알메리아는 스페인 남동부의 대표적인 농식품·기술 전시 거점으로, Infoagro Exhibition(아과둘세 전시컨벤션궁)과 Expolevante(캄포에르모소 전시컨벤션센터, 엘에히도) 같은 주요 행사를 개최합니다. 20년의 경험과 최고 수준의 자체 공방을 갖춘 Standarte가 두 전시장 모두에서 부스의 기술 설계, 제작, 설치 및 조율을 담당합니다.",
      "detail": "저희 팀은 기업 브랜드와 크리에이티브 에이전시에 견고하고 시간을 엄수하며 고급스러운 마감의 시공을 보장합니다."
    }
  },
  "montaje_badajoz": {
    "ja": {
      "intro": "バダホスと展示場IFEBAは、ポルトガルとの国境貿易（ラ・ラヤ）の玄関口であり、FeciexやFehisporといった主要な催事を開催しています。",
      "detail": "IFEBAの10,000m²の屋内展示館と広大な屋外エリアで、オーダーメイドの上質な木工プレミアムブースの設計・製作・設営を行います。"
    },
    "es": {
      "intro": "Badajoz y su recinto ferial IFEBA son la puerta de entrada al comercio transfronterizo con Portugal (La Raya), celebrando certámenes líderes como Feciex o Fehispor.",
      "detail": "Realizamos el diseño, fabricación y montaje de stands premium de carpintería a medida en los 10.000 m² cubiertos de IFEBA y sus amplios exteriores."
    },
    "en": {
      "intro": "Badajoz and its IFEBA exhibition centre are the gateway to cross-border trade with Portugal, hosting leading trade shows like Feciex and Fehispor.",
      "detail": "We carry out the design, manufacture, and setup of premium custom woodwork stands in IFEBA's 10,000 sqm covered halls and its large outdoor areas."
    },
    "pt": {
      "intro": "Badajoz e o seu recinto de feiras IFEBA são a porta de entrada para o comércio transfronteiriço com Portugal, acolhendo certames líderes como Feciex ou Fehispor.",
      "detail": "Realizamos o design, fabrico e montagem de stands premium de carpintaria nos 10.000 m² cobertos da IFEBA e nas suas amplas áreas exteriores."
    },
    "de": {
      "intro": "Badajoz und sein Messegelände IFEBA sind das Tor zum grenzüberschreitenden Handel mit Portugal und Austragungsort führender Messen wie Feciex oder Fehispor.",
      "detail": "Wir entwerfen, fertigen und montieren Premium-Messestände in den 10.000 m² überdachten Hallen von IFEBA und auf dem großen Freigelände."
    },
    "fr": {
      "intro": "Badajoz et son parc des expositions IFEBA sont la porte d'entrée du commerce transfrontalier avec le Portugal, accueillant des salons majeurs comme Feciex ou Fehispor.",
      "detail": "Nous concevons, fabriquons et montons des stands de menuiserie haut de gamme dans les 10 000 m² couverts d'IFEBA et ses vastes espaces extérieurs."
    },
    "it": {
      "intro": "Badajoz e il suo centro fieristico IFEBA sono la porta d'accesso al commercio transfrontaliero con il Portogallo, ospitando fiere leader come Feciex o Fehispor.",
      "detail": "Realizziamo la progettazione, produzione e allestimento di stand in legno pregiato nei 10.000 mq coperti di IFEBA e nelle sue grandi aree esterne."
    },
    "zh": {
      "intro": "巴达霍斯及其 IFEBA 展览中心是与葡萄牙开展跨境贸易的门户，举办 Feciex 和 Fehispor 等领先的贸易博览会。",
      "detail": "我们在 IFEBA 的 10,000 平方米室内展馆和大型室外区域提供高端定制木工展台的设计、制造和搭建。"
    },
    "hi": {
      "intro": "बादाहोज़ और इसका IFEBA प्रदर्शनी केंद्र पुर्तगाल के साथ सीमा पार व्यापार का प्रवेश द्वार हैं, जो Feciex और Fehispor जैसे प्रमुख शो की मेजबानी करते हैं।",
      "detail": "हम IFEBA के 10,000 वर्ग मीटर के कवर हॉल और इसके बड़े बाहरी क्षेत्रों में premium custom लकड़ी के स्टैंड का डिज़ाइन, निर्माण और सेटअप करते हैं।"
    },
    "ko": {
      "intro": "바다호스와 IFEBA 전시 센터는 포르투갈과의 국경 무역 관문이며 Feciex 및 Fehispor와 같은 주요 무역 박람회를 개최합니다.",
      "detail": "우리는 IFEBA의 10,000제곱미터 실내 전시관과 대규모 야외 공간에 프리미엄 맞춤형 목재 부스의 설계, 제작 및 설치를 수행합니다."
    }
  },
  "montaje_don_benito": {
    "ja": {
      "intro": "ドン・ベニートは、エストレマドゥーラの展示会機関Fevalの所在地であり、イベリア市場最大の農業・機械見本市Agroexpoを開催しています。",
      "detail": "22,000m²の屋内展示館と、農業機械・精密農業向けの屋外エリアに、オーダーメイドの上質な木工ブースを製作します。"
    },
    "es": {
      "intro": "Don Benito alberga Feval, la Institución Ferial de Extremadura, y acoge Agroexpo, el mayor punto de encuentro agrícola y de maquinaria del mercado ibérico.",
      "detail": "Construimos stands a medida de alta carpintería en sus 22.000 m² de pabellones cubiertos y en su zona exterior para maquinaria y agricultura de precisión."
    },
    "en": {
      "intro": "Don Benito hosts Feval, the Trade Fair Institution of Extremadura, and Agroexpo, the largest agricultural and machinery trade show in the Iberian market.",
      "detail": "We build custom woodwork stands in its 22,000 sqm of covered pavilions and its outdoor area for agricultural machinery and precision farming."
    },
    "pt": {
      "intro": "Don Benito abriga a Feval, a Instituição de Feiras da Extremadura, e acolhe a Agroexpo, o maior ponto de encontro agrícola e de maquinaria do mercado ibérico.",
      "detail": "Construímos stands de carpintaria à medida nos seus 22.000 m² de pavilhões cobertos e na sua área exterior para maquinaria e agricultura de precisão."
    },
    "de": {
      "intro": "Don Benito beherbergt Feval, die Messeinstitution von Extremadura, und veranstaltet Agroexpo, den größten landwirtschaftlichen Treffpunkt auf der Iberischen Halbinsel.",
      "detail": "Wir bauen maßgeschneiderte Messestände in den 22.000 m² überdachten Hallen sowie im Außenbereich für Maschinen und Präzisionslandwirtschaft."
    },
    "fr": {
      "intro": "Don Benito abrite Feval, l'institution foirale d'Estrémadure, et accueille Agroexpo, le plus grand salon agricole et de machines du marché ibérique.",
      "detail": "Nous montons des stands sur mesure dans ses 22 000 m² de halls couverts et dans sa zone extérieure pour les machines de précision."
    },
    "it": {
      "intro": "Don Benito ospita la Feval, l'istituzione fieristica dell'Estremadura, e accoglie Agroexpo, il più grande incontro agricolo e di macchinari del mercato iberico.",
      "detail": "Costruiamo stand in legno su misura nei suoi 22.000 mq di padiglioni coperti e nella sua area esterna per macchine agricole e agricoltura di precisione."
    },
    "zh": {
      "intro": "唐贝尼托是埃斯特雷马杜拉展览机构（Feval）的所在地，并举办伊比利亚市场最大的农业和机械贸易展Agroexpo。",
      "detail": "我们在其22,000平方米的室内展馆以及用于展示农业机械和精准农业的室外区域搭建定制的木工展台。"
    },
    "hi": {
      "intro": "डॉन बेनिटो Feval (एक्स्ट्रीमादुra व्यापार मेला संस्थान) और एग्रोएक्सपो की मेजबानी करता है, जो इबेरियन बाजार में सबसे बड़ा कृषि और मशीनरी शो है।",
      "detail": "हम इसके 22,000 वर्ग मीटर के कवर पैवेलियन और कृषि मशीनरी और सटीक खेती के लिए इसके बाहरी क्षेत्र में कस्टम लकड़ी के स्टैंड बनाते हैं।"
    },
    "ko": {
      "intro": "돈 베니토는 엑스트레마두라 박람회 기관(Feval)의 소재지이며 이베리아 시장에서 가장 큰 농업 및 기계 박람회인 Agroexpo를 개최합니다.",
      "detail": "우리는 22,000제곱미터의 실내 전시관과 농업 기계 및 정밀 농업을 위한 야외 공간에 맞춤형 목재 부스를 제작합니다."
    }
  },
  "montaje_zafra": {
    "ja": {
      "intro": "サフラはイベリア半島南西部における畜産・農業産業の中心地であり、1453年から続く歴史あるサフラ国際畜産見本市を開催しています。",
      "detail": "商業館AおよびBから、大規模な屋外機械展示エリアまで、オーダーメイドの上質な木工ブースを設計・設営します。"
    },
    "es": {
      "intro": "Zafra es el epicentro de la ganadería y la agroindustria en el suroeste peninsular, celebrando la histórica Feria Internacional Ganadera de Zafra desde 1453.",
      "detail": "Diseñamos y montamos stands de alta carpintería a medida tanto en sus pabellones comerciales A y B como en las grandes áreas exteriores de maquinaria."
    },
    "en": {
      "intro": "Zafra is the farming and agro-industrial epicentre of southwestern Spain, hosting the historic Zafra International Livestock Fair since 1453.",
      "detail": "We design and assemble custom premium woodwork stands both in its commercial halls A and B and in the large outdoor machinery exhibition areas."
    },
    "pt": {
      "intro": "Zafra é o epicentro da pecuária e da agroindústria no sudoeste peninsular, acolhendo a histórica Feira Internacional de Zafra desde 1453.",
      "detail": "Desenhamos e montamos stands de carpintaria premium à medida tanto nos seus pavilhões comerciais A e B como nas grandes áreas exteriores de maquinaria."
    },
    "de": {
      "intro": "Zafra ist das agrarindustrielle Zentrum im Südwesten Spaniens und beheimatet die historische Internationale Landwirtschaftsmesse von Zafra seit 1453.",
      "detail": "Wir entwerfen und montieren hochwertige Messestände in den kommerziellen Hallen A und B sowie im großen Freigelände für Maschinen."
    },
    "fr": {
      "intro": "Zafra est l'épicentre de l'élevage et de l'agro-industrie dans le sud-ouest de l'Espagne, accueillant la foire internationale de Zafra depuis 1453.",
      "detail": "Nous concevons et montons des stands de menuiserie sur mesure dans les halls commerciaux A et B ainsi que dans les grandes zones extérieures."
    },
    "it": {
      "intro": "Zafra è l'epicentro zootecnico e agroindustriale del sud-ovest della Spagna, sede della storica Fiera Internazionale del Bestiame di Zafra dal 1453.",
      "detail": "Progettiamo e allestiamo stand su misura in legno pregiato sia nei padiglioni commerciali A e B sia nelle grandi aree macchine all'aperto."
    },
    "zh": {
      "intro": "萨夫拉是西班牙西南部农业和畜牧业的中心，自1453年起举办历史悠久的萨夫拉国际畜牧业展览会。",
      "detail": "我们在其A和B商业展馆以及大型室外机械展示区设计并组装定制的高端木工展台。"
    },
    "hi": {
      "intro": "ज़फ़रा दक्षिण-पश्चिमी स्पेन का कृषि और पशुधन केंद्र है, जो 1453 से ऐतिहासिक ज़फ़रा अंतर्राष्ट्रीय पशुधन मेले की मेज़बानी कर रहा है।",
      "detail": "हम इसके वाणिज्यिक हॉल A and B और बड़े बाहरी मशीनरी प्रदर्शनी क्षेत्रों में कस्टम प्रीमियम लकड़ी के स्टैंड डिजाइन और इकट्ठा करते हैं।"
    },
    "ko": {
      "intro": "사프라는 스페인 남서부의 축산 및 농업 산업의 중심지로, 1453년부터 역사적인 사프라 국제 가축 박람회를 개최해 왔습니다.",
      "detail": "우리는 상업 홀 A와 B 및 대규모 야외 기계 전시 구역 모두에서 맞춤형 프리미엄 목재 부스를 설계하고 조립합니다."
    }
  },
  "zaragoza": {
    "ja": {
      "intro": "サラゴサはスペイン有数の見本市・物流拠点であり、サラゴサ見本市場（Feria de Zaragoza）は農業機械の国際見本市Fimaや建設・鉱山機械のSmopycといった世界的な産業見本市を開催しています。20年の経験と自社工房を持つStandarteが、サラゴサ見本市場でのブースの設計・製作・設営を担います。",
      "detail": "輸送、自社チームによる設営、会場の技術手続きまで一貫して管理し、海外の機械メーカーや出展企業に堅実かつ時間厳守の組立をお約束します。"
    },
    "es": {
      "intro": "Zaragoza es uno de los grandes nodos feriales y logísticos de España: la Feria de Zaragoza acoge certámenes industriales de referencia internacional como Fima (maquinaria agrícola) y Smopyc (maquinaria de obra pública y minería). Con 20 años de experiencia y taller propio, Standarte diseña, fabrica y monta stands de alta carpintería en la Feria de Zaragoza.",
      "detail": "Asumimos el transporte, el montaje con equipo propio y toda la tramitación técnica del recinto, garantizando a fabricantes y expositores internacionales una ejecución robusta y puntual."
    },
    "en": {
      "intro": "Zaragoza is one of Spain’s major fair and logistics hubs: the Feria de Zaragoza hosts world-class industrial shows such as Fima (agricultural machinery) and Smopyc (construction and mining machinery). With 20 years of experience and our own workshop, Standarte designs, manufactures and builds premium carpentry stands at the Feria de Zaragoza.",
      "detail": "We handle transport, assembly with our own crew and all the venue’s technical paperwork, guaranteeing international manufacturers and exhibitors a robust, on-time execution."
    },
    "de": {
      "intro": "Saragossa ist einer der großen Messe- und Logistikknotenpunkte Spaniens: Die Feria de Zaragoza beherbergt weltweit führende Industriemessen wie Fima (Landmaschinen) und Smopyc (Bau- und Bergbaumaschinen). Mit 20 Jahren Erfahrung und eigener Werkstatt entwirft, fertigt und baut Standarte hochwertige Tischlerstände auf der Feria de Zaragoza.",
      "detail": "Wir übernehmen Transport, Montage mit eigenem Team und die gesamte technische Abwicklung mit dem Gelände und garantieren internationalen Herstellern und Ausstellern eine solide, pünktliche Ausführung."
    },
    "pt": {
      "intro": "Saragoça é um dos grandes polos de feiras e logística de Espanha: a Feira de Saragoça acolhe certames industriais de referência internacional como a Fima (maquinaria agrícola) e a Smopyc (maquinaria de obras públicas e mineração). Com 20 anos de experiência e oficina própria, a Standarte projeta, fabrica e monta stands de alta carpintaria na Feira de Saragoça.",
      "detail": "Tratamos do transporte, da montagem com equipa própria e de toda a tramitação técnica do recinto, garantindo a fabricantes e expositores internacionais uma execução robusta e pontual."
    },
    "fr": {
      "intro": "Saragosse est l’un des grands pôles de salons et de logistique d’Espagne : la Feria de Zaragoza accueille des salons industriels de référence internationale comme la Fima (machines agricoles) et la Smopyc (engins de travaux publics et de mines). Avec 20 ans d’expérience et un atelier propre, Standarte conçoit, fabrique et monte des stands de haute menuiserie à la Feria de Zaragoza.",
      "detail": "Nous prenons en charge le transport, le montage avec notre propre équipe et toutes les démarches techniques du site, garantissant aux fabricants et exposants internationaux une exécution robuste et ponctuelle."
    },
    "it": {
      "intro": "Saragozza è uno dei grandi poli fieristici e logistici della Spagna: la Feria de Zaragoza ospita rassegne industriali di riferimento internazionale come Fima (macchine agricole) e Smopyc (macchine per opere pubbliche e minerarie). Con 20 anni di esperienza e officina propria, Standarte progetta, produce e monta stand di alta falegnameria alla Feria de Zaragoza.",
      "detail": "Gestiamo il trasporto, il montaggio con squadra propria e tutte le pratiche tecniche del quartiere fieristico, garantendo a produttori ed espositori internazionali un’esecuzione solida e puntuale."
    },
    "zh": {
      "intro": "萨拉戈萨是西班牙主要的会展与物流枢纽之一：萨拉戈萨展览馆（Feria de Zaragoza）举办具有国际影响力的工业展会，如Fima（农业机械）和Smopyc（工程与采矿机械）。凭借20年经验和自有工厂，Standarte在萨拉戈萨展览馆设计、制造并搭建高端木工展台。",
      "detail": "我们负责运输、自有团队搭建以及场馆的全部技术手续，为国际制造商和参展商保证稳健、准时的执行。"
    },
    "hi": {
      "intro": "ज़ारागोज़ा स्पेन के प्रमुख मेला और लॉजिस्टिक केंद्रों में से एक है: फेरिया दे ज़ारागोज़ा Fima (कृषि मशीनरी) और Smopyc (निर्माण और खनन मशीनरी) जैसे अंतर्राष्ट्रीय स्तर के औद्योगिक आयोजनों की मेज़बानी करता है। 20 वर्षों के अनुभव और अपनी कार्यशाला के साथ, Standarte फेरिया दे ज़ारागोज़ा में उच्च दर्जे की बढ़ईगीरी वाले स्टैंड डिज़ाइन, निर्माण और स्थापित करता है।",
      "detail": "हम परिवहन, अपनी टीम से असेंबली और परिसर की सभी तकनीकी प्रक्रियाओं को संभालते हैं, जिससे अंतर्राष्ट्रीय निर्माताओं और प्रदर्शकों को एक मजबूत और समयबद्ध निष्पादन की गारंटी मिलती है।"
    },
    "ko": {
      "intro": "사라고사는 스페인의 주요 전시·물류 거점 중 하나로, 페리아 데 사라고사(Feria de Zaragoza)는 Fima(농업 기계)와 Smopyc(건설·광산 기계)와 같은 세계적인 산업 박람회를 개최합니다. 20년의 경험과 자체 작업장을 갖춘 Standarte는 페리아 데 사라고사에서 고급 목공 부스를 설계·제작·시공합니다.",
      "detail": "운송, 자체 인력 시공, 전시장의 모든 기술 행정 절차를 담당하여 국제 제조업체와 출품업체에 견고하고 정시의 실행을 보장합니다."
    }
  },
  "ciudad_real": {
    "ja": {
      "intro": "シウダー・レアルは、スペイン中部で最も近代的かつ急成長している会議・展示インフラのひとつ、IFEDI展示場を擁しています。20年の経験と最高水準の自社工房を持つStandarteが、IFEDIでのブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Ciudad Real cuenta con una de las infraestructuras de congresos y ferias más modernas y de mayor crecimiento en el centro de España: el recinto ferial IFEDI. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en IFEDI.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Ciudad Real boasts one of the most modern and fastest-growing congress and exhibition infrastructures in central Spain: the IFEDI venue. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at IFEDI.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Ciudad Real verfügt über eine der modernsten und am schnellsten wachsenden Kongress- und Messeinfrastrukturen in Zentralspanien: das Messegelände IFEDI. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei IFEDI.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Ciudad Real conta com uma das infraestruturas de congressos e feiras mais modernas e de maior crescimento no centro de Espanha: o recinto ferial IFEDI. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na IFEDI.",
      "detail": "A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência."
    },
    "fr": {
      "intro": "Ciudad Real dispose de l'une des infrastructures de congrès et de salons les plus modernes et les plus dynamiques du centre de l'Espagne : le parc des expositions IFEDI. Avec 20 ans d'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l'installation des stands à IFEDI.",
      "detail": "Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme."
    },
    "it": {
      "intro": "Ciudad Real vanta una delle infrastrutture per congressi e fiere più moderne e in rapida crescita del centro della Spagna: il complesso fieristico IFEDI. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l'installazione e il coordinamento degli stand presso IFEDI.",
      "detail": "Il nostro team garantisce ai marchi aziendali e alle agenzie creative un'esecuzione solida, puntuale e con finiture di alto livello."
    },
    "zh": {
      "intro": "雷阿尔城拥有西班牙中部最现代且增长最快的会议 and 展览基础设施之一：IFEDI 展览馆。凭借 20 年的丰富经验 and 我们自己顶级的工厂，Standarte 承担了 IFEDI 展台的技术设计、生产、安装 and 协调。",
      "detail": "我们的团队向企业品牌 and 创意机构保证，执行稳健、准时，并具有高端效果。"
    },
    "hi": {
      "intro": "स्यूदाद रियल मध्य स्पेन में सबसे आधुनिक और सबसे तेजी से बढ़ते कांग्रेस और प्रदर्शनी बुनियादी ढांचे में से एक है: IFEDI स्थल। 20 वर्षों के अनुभव और एक tops-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट IFEDI में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।"
    },
    "ko": {
      "intro": "시우다드레알은 스페인 중부에서 가장 현대적이고 빠르게 성장하는 회의 및 전시 인프라 중 하나인 IFEDI 전시장을 보유하고 있습니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 IFEDI에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.",
      "detail": "우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다."
    }
  },
  "sevilla": {
    "ja": {
      "intro": "セビリアは南ヨーロッパで最も重要な展示会・会議の開催地のひとつです。20年の経験と最高水準の自社工房を持つStandarteが、FIBES IおよびFIBES IIでのブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "Sevilla es uno de los destinos feriales y de congresos más importantes del sur de Europa. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en FIBES I y FIBES II.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Seville is one of the most important trade show and congress destinations in southern Europe. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at FIBES I and FIBES II.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Sevilla ist eines der wichtigsten Messe- und Kongressziele in Südeuropa. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei FIBES I und FIBES II.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "Sevilha é um dos destinos de feiras e congressos mais importantes do sul da Europa. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na FIBES I e FIBES II.",
      "detail": "A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência."
    },
    "fr": {
      "intro": "Séville est l'une des destinations de salons et de congrès les plus importantes du sud de l'Europe. Avec 20 ans d'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l'installation des stands à FIBES I et FIBES II.",
      "detail": "Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme."
    },
    "it": {
      "intro": "Siviglia è una delle destinazioni fieristiche e congressuali più importanti del sud Europa. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l'installazione e il coordinamento degli stand presso FIBES I e FIBES II.",
      "detail": "Il nostro team garantisce ai marchi aziendali e alle agenzie creative un'esecuzione solida, puntuale e con finiture di alto livello."
    },
    "zh": {
      "intro": "塞维利亚是欧洲南部最重要的展览和会议目的地之一。凭借 20 年的丰富经验 and 我们自己顶级的工厂，Standarte 承担了 FIBES I 和 FIBES II 展台的技术设计、生产、安装和协调。",
      "detail": "我们的团队向企业品牌和创意机构保证，执行稳健、准时，并具有高端效果。"
    },
    "hi": {
      "intro": "सेविले दक्षिणी यूरोप में सबसे महत्वपूर्ण व्यापार शो और कांग्रेस स्थलों में से un एक है। 20 वर्षों के अनुभव और एक tops-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट FIBES I और FIBES II में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।"
    },
    "ko": {
      "intro": "세비야는 남유럽에서 가장 중요한 박람회 및 총회 목적지 중 하나입니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 FIBES I 및 FIBES II에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.",
      "detail": "우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다."
    }
  },
  "badajoz": {
    "ja": {
      "intro": "バダホスとエストレマドゥーラ地方は、伝統ある催事を擁する活気あふれる展示会市場です。Standarteは20年の経験と自社工房を強みに、IFEBAやFevalといった主要会場でブースを設計・設営します。",
      "detail": "優れた物流効率により迅速に対応し、コストを最適化しながら、AgroexpoやFeciexなどの重要な催事で完璧なブースを保証します。"
    },
    "es": {
      "intro": "Badajoz y Extremadura representan un mercado ferial dinámico con eventos de gran tradición. En Standarte diseñamos y montamos stands con 20 años de experiencia y taller propio en recintos de referencia como IFEBA y Feval.",
      "detail": "Nuestra eficiencia logística nos permite responder con rapidez, optimizando costes y garantizando un stand impecable para citas clave como Agroexpo o Feciex."
    },
    "en": {
      "intro": "Badajoz and Extremadura represent a highly active ferial hub with deep-rooted events. At Standarte, backed by 20 years of experience and our own workshop, we design and assemble stands in key regional venues such as IFEBA and Feval.",
      "detail": "Our logistics efficiency allows us to deliver quick solutions, optimize costs, and guarantee a flawless stand presence for major events like Agroexpo or Feciex."
    },
    "de": {
      "intro": "Badajoz und die Region Extremadura sind ein dynamischer Messemarkt mit traditionsreichen Veranstaltungen. Standarte entwirft und montiert mit 20 Jahren Erfahrung und eigener Werkstatt hochwertige Messestände an führenden Standorten wie IFEBA und Feval.",
      "detail": "Unsere logistische Effizienz ermöglicht uns schnelle Reaktionszeiten und optimierte Kosten für einen makellosen Stand bei wichtigen Messen wie Agroexpo."
    },
    "pt": {
      "intro": "Badajoz e a Extremadura representam um mercado de feiras dinâmico com eventos de grande tradição. Na Standarte concebemos e montamos stands com 20 anos de experiência e oficina própria em recintos de referência como IFEBA e Feval.",
      "detail": "A nossa eficiência logística permite-nos responder rapidamente, otimizando custos e garantindo um stand impecável para feiras chave como a Agroexpo."
    },
    "fr": {
      "intro": "Badajoz et l'Estrémadure représentent un marché dynamique avec des événements de grande tradition. Nous concevons et montons des stands avec 20 ans d'expérience et un propre atelier dans des lieux clés comme IFEBA et Feval.",
      "detail": "Notre efficacité logistique nous permet de répondre rapidement, d'optimiser les coûts et de garantir un stand impeccable pour des événements majeurs comme Agroexpo."
    },
    "it": {
      "intro": "Badajoz e l'Estremadura rappresentano un mercato fieristico dinamico con eventi di grande tradizione. Progettiamo e allestiamo stand con 20 anni di esperienza e un laboratorio di proprietà in centri di riferimento come IFEBA e Feval.",
      "detail": "La nostra efficienza logistica ci consente di rispondere rapidamente, ottimizzare i costi e garantire uno stand impeccabile per appuntamenti chiave come Agroexpo."
    },
    "zh": {
      "intro": "巴达霍斯和埃斯特雷马杜拉代表了一个充满活力且历史悠久的展会市场。凭借 20 年的经验和自己的工厂，我们在该地区的核心展馆（如 IFEBA 和 Feval）设计和组装展台。",
      "detail": "我们的物流效率使我们能够快速响应、优化成本，并确保在 Agroexpo 或 Feciex 等重点展会中为您呈现完美的品牌展台。"
    },
    "hi": {
      "intro": "बादाहोज़ और एक्स्ट्रीमादुरा गहरी जड़ें वाले आयोजनों के साथ एक अत्यधिक सक्रिय फेशियल हब का प्रतिनिधित्व करते हैं। 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, स्टैंडार्ट में, हम IFEBA और Feval जैसे प्रमुख क्षेत्रीय स्थानों में स्टैंड डिजाइन और इकट्ठा करते हैं।",
      "detail": "हमारी रसद दक्षता हमें त्वरित समाधान देने, लागत का अनुकूलन करने और एग्रोएक्सपीओ या Feciex जैसे प्रमुख आयोजनों के लिए एक निर्दोष स्टैंड उपस्थिति की गारंटी देने की अनुमति देती है।"
    },
    "ko": {
      "intro": "바다호스와 엑스트레마두라는 뿌리 깊은 이벤트를 갖춘 매우 활동적인 행사 허브를 대표합니다. 20년의 경험과 자체 공장을 바탕으로 Standarte에서는 IFEBA 및 Feval과 같은 주요 지역 행사장에서 스탠드를 디자인하고 조립합니다.",
      "detail": "물류 효율성을 통해 당사는 빠른 솔루션을 제공하고 비용을 최적화하며 Agroexpo 또는 Feciex와 같은 주요 이벤트에서 완벽한 스탠드 존재를 보장할 수 있습니다."
    }
  },
  "malaga": {
    "ja": {
      "intro": "マラガは会議やテクノロジー系展示会の開催地として成長を続けています。20年の経験と最高水準の自社工房を持つStandarteが、FYCMAでのブースの技術設計・製作・設営・コーディネーションを担います。",
      "detail": "当社のチームは、企業ブランドやクリエイティブ代理店に、堅実かつ時間厳守で、ハイエンドな仕上がりの組立を保証します。"
    },
    "es": {
      "intro": "El crecimiento de Málaga como destino de congresos y ferias tecnológicas es imparable. Con 20 años de experiencia y un taller propio de primer nivel, Standarte asume el diseño técnico, producción, instalación y coordinación de stands en FYCMA.",
      "detail": "Nuestro equipo garantiza a marcas corporativas y agencias creativas una ejecución robusta, puntual y con acabados de alta gama."
    },
    "en": {
      "intro": "Malaga's growth as a destination for congresses and technological fairs is unstoppable. With 20 years of experience and a top-level own workshop, Standarte takes on the technical design, production, installation, and coordination of stands at FYCMA.",
      "detail": "Our team guarantees corporate brands and creative agencies a robust, timely execution with high-end finishes."
    },
    "de": {
      "intro": "Das Wachstum von Málaga als Ziel für Kongresse und Technologiemessen ist unaufhaltsam. Mit 20 Jahren Erfahrung und einer erstklassigen eigenen Werkstatt übernimmt Standarte das technische Design, die Produktion, die Montage und die Koordination von Ständen bei FYCMA.",
      "detail": "Unser Team garantiert Marken und Kreativagenturen eine robuste, pünktliche Ausführung mit hochwertigen Oberflächen."
    },
    "pt": {
      "intro": "O crescimento de Málaga como destino para congressos e feiras tecnológicas é imparável. Com 20 anos de experiência e oficina própria, a Standarte assume o design técnico, produção, instalação e coordenação de stands na FYCMA.",
      "detail": "A nossa equipa garante às marcas e agências criativas uma execução robusta, pontual e com acabamentos de excelência."
    },
    "fr": {
      "intro": "La croissance de Malaga en tant que destination pour les congrès et les salons technologiques est imparable. Avec 20 ans d'expérience et un propre atelier de haut niveau, Standarte prend en charge la conception technique, la production et l'installation des stands à FYCMA.",
      "detail": "Notre équipe garantit aux marques et aux agences créatives une exécution robuste, ponctuelle et avec des finitions haut de gamme."
    },
    "it": {
      "intro": "La crescita di Malaga come destinazione per congressi e fiere tecnologiche è inarrestabile. Con 20 anni di esperienza e un laboratorio di proprietà di primo livello, Standarte assume la progettazione tecnica, la produzione, l'installazione e il coordinamento degli stand presso FYCMA.",
      "detail": "Il nostro team garantisce ai marchi aziendali e alle agenzie creative un'esecuzione solida, puntuale e con finiture di alto livello."
    },
    "zh": {
      "intro": "马拉加作为大会和技术展览目的地的增长是势不可挡的。凭借 20 年的丰富经验和我们自己顶级的工厂，Standarte 承担了 FYCMA 展台的技术设计、生产、安装和协调。",
      "detail": "我们的团队向企业品牌和创意机构保证，执行稳健、准时，并具有高端效果。"
    },
    "hi": {
      "intro": "मलागा की कांग्रेस और तकनीकी मेलों के गंतव्य के रूप में वृद्धि अजेय है। 20 वर्षों के अनुभव और एक शीर्ष-स्तरीय अपने कारखाने के साथ, स्टैंडार्ट FYCMA में स्टैंड के तकनीकी डिजाइन, उत्पादन, स्थापना और समन्वय को संभालता है।",
      "detail": "हमारी टीम कॉर्पोरेट ब्रांडों और रचनात्मक एजेंसियों को उच्च अंत खत्म के साथ एक मजबूत, समय पर निष्पादन की गारंटी देती है।"
    },
    "ko": {
      "intro": "총회 및 기술 박람회의 목적지로서의 말라가의 성장은 막을 수 없습니다. 20년의 경험과 최고 수준의 자체 공장을 바탕으로 Standarte는 FYCMA에서 부스의 기술적 디자인, 생산, 설치 및 조정을 담당합니다.",
      "detail": "우리 팀은 기업 브랜드와 크리에이티브 에이전시에게 고급 마감 처리를 통한 강력하고 적시의 실행을 보장합니다."
    }
  },
  "oporto": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Oporto y en todo el Norte de Portugal —con Exponor a la cabeza— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Porto and across northern Portugal —led by Exponor— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Porto und in ganz Nordportugal — allen voran auf der Exponor — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Endabnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands no Porto e em todo o Norte de Portugal — com a Exponor à cabeça — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Porto et dans tout le nord du Portugal — Exponor en tête — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Porto e in tutto il Nord del Portogallo — con Exponor in testa — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Porto en in heel Noord-Portugal — met Exponor voorop — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在波尔图及葡萄牙北部（以 Exponor 为核心）设计并搭建展台，全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पोर्टो और पूरे उत्तरी पुर्तगाल में (Exponor के नेतृत्व में) स्टैंड डिज़ाइन और असेंबली करता है, हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 포르투와 포르투갈 북부 전역(엑스포노르 중심)에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはポルトおよびポルトガル北部全域（Exponorを中心に）で展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "valencia": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Valencia, una de las grandes plazas feriales del Mediterráneo gracias a Feria Valencia, controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Valencia, one of the great Mediterranean exhibition hubs thanks to Feria Valencia, controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Valencia, dank der Feria Valencia einer der großen Messestandorte des Mittelmeerraums, und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Endabnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Valência, uma das grandes praças feirais do Mediterrâneo graças à Feria Valencia, controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Valence, l'une des grandes places d'exposition de la Méditerranée grâce à Feria Valencia, en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Valencia, uno dei grandi poli fieristici del Mediterraneo grazie a Feria Valencia, controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Valencia, dankzij Feria Valencia een van de grote beurssteden van het Middellandse Zeegebied, met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在巴伦西亚设计并搭建展台——得益于 Feria Valencia，这里是地中海地区重要的会展中心之一——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte वालेंसिया में स्टैंड डिज़ाइन और असेंबली करता है—Feria Valencia की बदौलत यह भूमध्यसागरीय क्षेत्र के बड़े प्रदर्शनी केंद्रों में से एक है—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 Feria Valencia 덕분에 지중해의 주요 전시 거점 중 하나인 발렌시아에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、StandarteはFeria Valenciaを擁し地中海有数の展示拠点であるバレンシアで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "mallorca": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Mallorca —epicentro náutico y de superyates del Mediterráneo, con el Palma International Boat Show como gran cita— controlando cada fase: diseño 3D, fabricación, logística insular e instalación con validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Mallorca —the Mediterranean nautical and superyacht hub, home to the Palma International Boat Show— controlling every phase: 3D design, production, island logistics and installation with on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Mallorca — dem Nautik- und Superyacht-Zentrum des Mittelmeers mit der Palma International Boat Show als großem Highlight — und kontrolliert jede Phase: 3D-Design, Produktion, Insellogistik und Montage mit Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Maiorca — epicentro náutico e de superiates do Mediterrâneo, com o Palma International Boat Show como grande certame — controlando cada fase: design 3D, fabrico, logística insular e instalação com validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Majorque — pôle nautique et de superyachts de la Méditerranée, avec le Palma International Boat Show comme grand rendez-vous — en maîtrisant chaque phase : conception 3D, fabrication, logistique insulaire et montage avec validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Maiorca — polo nautico e dei superyacht del Mediterraneo, con il Palma International Boat Show come grande appuntamento — controllando ogni fase: progettazione 3D, produzione, logistica insulare e montaggio con collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands op Mallorca — het nautische en superjacht-centrum van de Middellandse Zee, met de Palma International Boat Show als grote afspraak — met volledige controle over elke fase: 3D-ontwerp, productie, eilandlogistiek en montage met keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在马略卡设计并搭建展台——这里是地中海游艇与超级游艇的核心，拥有 Palma International Boat Show 这一重要展会——全程把控每个环节：3D设计、生产、岛屿物流及现场安装验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte मायोर्का में स्टैंड डिज़ाइन और असेंबली करता है—भूमध्यसागर का नौवहन और सुपरयॉट केंद्र, जहाँ Palma International Boat Show होता है—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, द्वीपीय रसद और स्थल पर सत्यापन सहित स्थापना।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 지중해의 요트·슈퍼요트 거점이자 Palma International Boat Show가 열리는 마요르카에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 섬 물류, 현장 검수를 포함한 설치 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteは地中海のヨット・スーパーヨットの中心地であり、Palma International Boat Showが開催されるマヨルカで展示ブースを設計・施工し、3D設計、製作、離島物流、会場での検査を含む設営まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "vigo": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Vigo —gran polo industrial atlántico de la construcción naval, la automoción y el sector conservero, con el IFEVI como recinto de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Vigo —a major Atlantic industrial hub for shipbuilding, the automotive industry and seafood processing, with IFEVI as its flagship venue— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Vigo — einem großen atlantischen Industriestandort für Schiffbau, Automobilindustrie und Fischverarbeitung mit dem IFEVI als führendem Messegelände — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Vigo — grande polo industrial atlântico da construção naval, da indústria automóvel e do setor conserveiro, com o IFEVI como recinto de referência — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Vigo — grand pôle industriel atlantique de la construction navale, de l'automobile et de la conserverie, avec l'IFEVI comme parc des expositions de référence — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Vigo — grande polo industriale atlantico della cantieristica navale, dell'automotive e del settore conserviero, con l'IFEVI come quartiere fieristico di riferimento — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Vigo — een groot Atlantisch industrieel knooppunt voor scheepsbouw, de auto-industrie en de visverwerking, met het IFEVI als belangrijkste beurscomplex — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在维戈设计并搭建展台——这里是大西洋沿岸重要的工业基地，涵盖造船、汽车与水产加工产业，以 IFEVI 为核心展览中心——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte विगो में स्टैंड डिज़ाइन और असेंबली करता है—जहाज निर्माण, ऑटोमोटिव और समुद्री खाद्य प्रसंस्करण का एक प्रमुख अटलांटिक औद्योगिक केंद्र, जिसका मुख्य प्रदर्शनी स्थल IFEVI है—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 조선, 자동차, 수산물 가공 산업의 주요 대서양 산업 거점이자 IFEVI를 대표 전시장으로 둔 비고에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteは造船・自動車・水産加工産業の一大大西洋工業拠点であり、IFEVIを中核会場とするビーゴで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "ourense": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Ourense —sede de Expourense, recinto de referencia del turismo gastronómico y termal de Galicia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Ourense —home to Expourense, Galicia's leading venue for gastronomic and thermal tourism— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Ourense — Standort von Expourense, dem führenden Messegelände Galiciens für Gastronomie- und Thermaltourismus — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Ourense — sede do Expourense, o recinto de referência do turismo gastronómico e termal da Galiza — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Ourense — siège d'Expourense, le parc des expositions de référence du tourisme gastronomique et thermal de Galice — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Ourense — sede di Expourense, il polo fieristico di riferimento del turismo gastronomico e termale della Galizia — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Ourense — locatie van Expourense, het toonaangevende beurscomplex van Galicië voor gastronomisch en thermaal toerisme — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在奥伦塞设计并搭建展台——这里是奥伦塞展览中心（Expourense）所在地，加利西亚美食与温泉旅游的重要展会场馆——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte ओरेंसे में स्टैंड डिज़ाइन और असेंबली करता है—Expourense का घर, गैलिसिया के गैस्ट्रोनॉमिक और थर्मल पर्यटन का प्रमुख प्रदर्शनी स्थल—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 갈리시아 미식 및 온천 관광의 대표 전시장인 Expourense가 위치한 오우렌세에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはガリシアの美食・温泉観光の代表的な会場Expourenseを擁するオウレンセで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "silleda": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Silleda —sede de la Feira Internacional de Galicia (FIG), el mayor recinto multisectorial de Galicia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Silleda —home to the Feira Internacional de Galicia (FIG), Galicia's largest multi-sector venue— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Silleda — Standort der Feira Internacional de Galicia (FIG), des größten multisektoralen Messegeländes Galiciens — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Silleda — sede da Feira Internacional de Galicia (FIG), o maior recinto multissetorial da Galiza — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Silleda — siège de la Feira Internacional de Galicia (FIG), le plus grand parc des expositions multisectoriel de Galice — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Silleda — sede della Feira Internacional de Galicia (FIG), il più grande polo fieristico multisettoriale della Galizia — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Silleda — locatie van de Feira Internacional de Galicia (FIG), het grootste multisectorale beurscomplex van Galicië — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在锡列达设计并搭建展台——这里是加利西亚国际展览中心（FIG）所在地，加利西亚规模最大的综合性展会场馆——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte सिलेदा में स्टैंड डिज़ाइन और असेंबली करता है—Feira Internacional de Galicia (FIG) का घर, गैलिसिया का सबसे बड़ा बहु-क्षेत्रीय प्रदर्शनी स्थल—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 갈리시아 최대의 종합 전시장인 Feira Internacional de Galicia(FIG)가 위치한 실레다에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはガリシア最大級の総合見本市会場Feira Internacional de Galicia（FIG）を擁するシジェダで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "gijon": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Gijón —sede del Recinto Ferial Luis Adaro, con grandes citas como FIDMA, AGROPEC y el Salón de Competición de Asturias— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Gijón —home to the Recinto Ferial Luis Adaro, with major events such as FIDMA, AGROPEC and the Salón de Competición de Asturias— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Gijón — Standort des Recinto Ferial Luis Adaro, mit Großveranstaltungen wie FIDMA, AGROPEC und dem Salón de Competición de Asturias — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Gijón — sede do Recinto Ferial Luis Adaro, com grandes certames como a FIDMA, a AGROPEC e o Salón de Competición de Asturias — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Gijón — siège du Recinto Ferial Luis Adaro, avec de grands rendez-vous comme FIDMA, AGROPEC et le Salón de Competición de Asturias — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Gijón — sede del Recinto Ferial Luis Adaro, con grandi appuntamenti come FIDMA, AGROPEC e il Salón de Competición de Asturias — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Gijón — locatie van het Recinto Ferial Luis Adaro, met grote evenementen zoals FIDMA, AGROPEC en de Salón de Competición de Asturias — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在希洪设计并搭建展台——这里是路易斯·阿达罗展览中心（Recinto Ferial Luis Adaro）所在地，举办 FIDMA、AGROPEC 和阿斯图里亚斯竞技沙龙等大型展会——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障和卓越的细节把控。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला से अस्थायी वास्तुकला निर्माण के 20 वर्षों के अनुभव के साथ, Standarte ख़िख़ोन में स्टैंड डिज़ाइन और असेंबल करता है — यह Recinto Ferial Luis Adaro का घर है, जहाँ FIDMA, AGROPEC और Salón de Competición de Asturias जैसे बड़े आयोजन होते हैं — और हर चरण को नियंत्रित करता है: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली की मानसिक शांति और असाधारण बारीकी प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로 Standarte는 히혼에서 부스를 디자인하고 시공합니다 — 이곳은 FIDMA, AGROPEC, Salón de Competición de Asturias 같은 대형 행사가 열리는 Recinto Ferial Luis Adaro의 본거지로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはヒホンで展示会ブースの設計・施工を行います。ここはFIDMA、AGROPEC、アストゥリアス・モータースポーツサロンなどの大型見本市が開催されるRecinto Ferial Luis Adaroの本拠地で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "perpignan": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza la frontera —a un paso de Girona— y diseña y monta stands en Perpiñán, capital de la Cataluña Norte y sede de la Foire Exposition de Perpignan en el Parc des Expositions, controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, con la ventaja de la proximidad al norte de España."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the border —a stone's throw from Girona— to design and assemble exhibition stands in Perpignan, capital of Northern Catalonia and home to the Foire Exposition de Perpignan at the Parc des Expositions, controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, with the advantage of proximity to northern Spain."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überschreitet Standarte die Grenze — nur einen Steinwurf von Girona entfernt — und entwirft und montiert Messestände in Perpignan, der Hauptstadt Nordkataloniens und Austragungsort der Foire Exposition de Perpignan im Parc des Expositions, und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, mit dem Vorteil der Nähe zu Nordspanien."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa a fronteira — a um passo de Girona — e projeta e monta stands em Perpinhã, capital da Catalunha Norte e sede da Foire Exposition de Perpignan no Parc des Expositions, controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, com a vantagem da proximidade ao norte de Espanha."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit la frontière — à deux pas de Gérone — et conçoit et monte des stands à Perpignan, capitale de la Catalogne Nord et siège de la Foire Exposition de Perpignan au Parc des Expositions, en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, avec l'avantage de la proximité avec le nord de l'Espagne."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca il confine — a due passi da Girona — e progetta e monta stand a Perpignano, capitale della Catalogna del Nord e sede della Foire Exposition de Perpignan al Parc des Expositions, controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, con il vantaggio della vicinanza al nord della Spagna."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de grens over — op een steenworp van Girona — en ontwerpt en monteert beursstands in Perpignan, hoofdstad van Noord-Catalonië en thuisbasis van de Foire Exposition de Perpignan in het Parc des Expositions, met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, met het voordeel van de nabijheid tot Noord-Spanje."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越边境——距离赫罗纳仅一步之遥——在佩皮尼昂为展会设计并搭建展台，这里是北加泰罗尼亚的中心，Parc des Expositions 举办佩皮尼昂博览会，全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，并具备毗邻西班牙北部的地利。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte सीमा पार करके — गिरोना से बस एक कदम की दूरी पर — पेर्पिञ्यां में स्टैंड डिज़ाइन और स्थापित करता है, जो उत्तरी कैटालोनिया की राजधानी है और जहाँ Parc des Expositions में Foire Exposition de Perpignan आयोजित होती है, हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को उत्तरी स्पेन से निकटता के लाभ के साथ, बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 지로나에서 지척인 국경을 넘어 페르피냥에서 전시회 부스를 디자인하고 시공합니다. 이곳은 북카탈루냐의 중심지로, Parc des Expositions에서 Foire Exposition de Perpignan이 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 스페인 북부와 가깝다는 이점과 함께, 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはジローナのすぐ近くにある国境を越え、ペルピニャンで展示会ブースの設計・施工を行います。ここは北カタルーニャの中心都市で、Parc des ExpositionsでペルピニャンのFoire Expositionが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、スペイン北部に近いという利点とともに、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "montpellier": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Montpellier —co-capital de Occitania y capital mundial del equipamiento vitivinícola y del vino ecológico, con citas como SITEVI, Millésime Bio, SETT, EnerGaïa y SIPRHO en el Parc des Expositions y el Antibody Industrial Symposium en Le Corum— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Montpellier —co-capital of Occitania and the world capital of winegrowing equipment and organic wine, with events such as SITEVI, Millésime Bio, SETT, EnerGaïa and SIPRHO at the Parc des Expositions and the Antibody Industrial Symposium at Le Corum— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Montpellier — Co-Hauptstadt Okzitaniens und Welthauptstadt der Weinbautechnik und des Bio-Weins, mit Veranstaltungen wie SITEVI, Millésime Bio, SETT, EnerGaïa und SIPRHO im Parc des Expositions sowie dem Antibody Industrial Symposium im Le Corum — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Montpellier — co-capital da Occitânia e capital mundial do equipamento vitivinícola e do vinho biológico, com certames como SITEVI, Millésime Bio, SETT, EnerGaïa e SIPRHO no Parc des Expositions e o Antibody Industrial Symposium no Le Corum — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Montpellier — co-capitale de l'Occitanie et capitale mondiale du machinisme vitivinicole et du vin bio, avec des rendez-vous comme le SITEVI, Millésime Bio, le SETT, EnerGaïa et le SIPRHO au Parc des Expositions et l'Antibody Industrial Symposium au Corum — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Montpellier — co-capitale dell'Occitania e capitale mondiale delle attrezzature vitivinicole e del vino biologico, con appuntamenti come SITEVI, Millésime Bio, SETT, EnerGaïa e SIPRHO al Parc des Expositions e l'Antibody Industrial Symposium al Corum — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Montpellier — co-hoofdstad van Occitanië en wereldhoofdstad van wijnbouwtechniek en biologische wijn, met evenementen zoals SITEVI, Millésime Bio, SETT, EnerGaïa en SIPRHO in het Parc des Expositions en het Antibody Industrial Symposium in Le Corum — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在蒙彼利埃为展会设计并搭建展台——这是奥克西塔尼大区的联合首府，也是葡萄种植设备和有机葡萄酒的世界之都，Parc des Expositions 举办 SITEVI、Millésime Bio、SETT、EnerGaïa 和 SIPRHO 等展会，Le Corum 举办 Antibody Industrial Symposium——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके मोंपेलिये में स्टैंड डिज़ाइन और स्थापित करता है — यह ऑक्सितानी की सह-राजधानी और अंगूर की खेती के उपकरण तथा जैविक वाइन की विश्व राजधानी है, जहाँ Parc des Expositions में SITEVI, Millésime Bio, SETT, EnerGaïa और SIPRHO तथा Le Corum में Antibody Industrial Symposium जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 몽펠리에에서 전시회 부스를 디자인하고 시공합니다. 이곳은 옥시타니의 공동 중심 도시이자 포도 재배 장비와 유기농 와인의 세계 수도로, Parc des Expositions에서 SITEVI, Millésime Bio, SETT, EnerGaïa, SIPRHO가, Le Corum에서 Antibody Industrial Symposium이 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、モンペリエで展示会ブースの設計・施工を行います。ここはオクシタニー地域圏の共同中心都市であり、ワイン醸造機材とオーガニックワインの世界的な都で、Parc des ExpositionsでSITEVI、Millésime Bio、SETT、EnerGaïa、SIPRHOが、Le CorumでAntibody Industrial Symposiumが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "niza": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Niza —capital de la Costa Azul, ciudad UNESCO y segunda puerta aérea de Francia, con citas como AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales y SOLUCOP repartidas entre el Palais des Expositions, el puerto y el Allianz Riviera— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Nice —capital of the French Riviera, UNESCO city and France's second air gateway, with events such as AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales and SOLUCOP held across the Palais des Expositions, the port and the Allianz Riviera— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Nizza — der Hauptstadt der Côte d'Azur, UNESCO-Stadt und zweitgrößtem Luftverkehrstor Frankreichs, mit Veranstaltungen wie AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales und SOLUCOP im Palais des Expositions, am Hafen und in der Allianz Riviera — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Nice — capital da Côte d'Azur, cidade UNESCO e segunda porta aérea de França, com certames como AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales e SOLUCOP repartidos entre o Palais des Expositions, o porto e o Allianz Riviera — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Nice — capitale de la Côte d'Azur, ville UNESCO et deuxième porte aérienne de France, avec des rendez-vous comme AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales et SOLUCOP répartis entre le Palais des Expositions, le port et l'Allianz Riviera — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Nizza — capitale della Costa Azzurra, città UNESCO e seconda porta aerea di Francia, con appuntamenti come AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales e SOLUCOP distribuiti tra il Palais des Expositions, il porto e l'Allianz Riviera — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Nice — hoofdstad van de Côte d'Azur, UNESCO-stad en de tweede luchthaven-toegangspoort van Frankrijk, met evenementen zoals AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales en SOLUCOP verspreid over het Palais des Expositions, de haven en de Allianz Riviera — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在尼斯为展会设计并搭建展台——这是蔚蓝海岸的首府、联合国教科文组织名录城市，也是法国第二大航空门户，AGECOTEL、Nice Boating Tomorrow、IBT Côte d'Azur、Les Entreprenariales 和 SOLUCOP 等展会分布在 Palais des Expositions、港口和 Allianz Riviera——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके नीस में स्टैंड डिज़ाइन और स्थापित करता है — यह कोत दाज़्यूर की राजधानी, यूनेस्को शहर और फ्रांस का दूसरा हवाई प्रवेश द्वार है, जहाँ AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales और SOLUCOP जैसे आयोजन Palais des Expositions, बंदरगाह और Allianz Riviera में होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 니스에서 전시회 부스를 디자인하고 시공합니다. 이곳은 코트다쥐르의 중심 도시이자 유네스코 등재 도시, 프랑스 제2의 항공 관문으로, AGECOTEL, Nice Boating Tomorrow, IBT Côte d'Azur, Les Entreprenariales, SOLUCOP 등이 Palais des Expositions, 항구, Allianz Riviera에서 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、ニースで展示会ブースの設計・施工を行います。ここはコート・ダジュールの中心都市であり、ユネスコ登録都市、フランス第2の空の玄関口で、AGECOTEL、Nice Boating Tomorrow、IBT Côte d'Azur、Les Entreprenariales、SOLUCOPなどがPalais des Expositions、港、Allianz Rivieraで開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "clermont_ferrand": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Clermont-Ferrand —capital de Auvernia, sede de la Grande Halle d'Auvergne, con el Sommet de l'Élevage, el mayor salón ganadero de Europa— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Clermont-Ferrand —capital of Auvergne, home to the Grande Halle d'Auvergne, with the Sommet de l'Élevage, Europe's largest livestock trade show— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Clermont-Ferrand — der Hauptstadt der Auvergne, Standort der Grande Halle d'Auvergne, mit dem Sommet de l'Élevage, Europas größter Viehzuchtmesse — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Clermont-Ferrand — capital de Auvérnia, sede da Grande Halle d'Auvergne, com o Sommet de l'Élevage, o maior salão pecuário da Europa — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Clermont-Ferrand — capitale de l'Auvergne, siège de la Grande Halle d'Auvergne, avec le Sommet de l'Élevage, le plus grand salon de l'élevage d'Europe — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Clermont-Ferrand — capitale dell'Alvernia, sede della Grande Halle d'Auvergne, con il Sommet de l'Élevage, il maggiore salone zootecnico d'Europa — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Clermont-Ferrand — hoofdstad van Auvergne, thuisbasis van de Grande Halle d'Auvergne, met de Sommet de l'Élevage, de grootste veeteeltbeurs van Europa — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在克莱蒙费朗为展会设计并搭建展台——这是奥弗涅大区的首府，Grande Halle d'Auvergne 展览中心所在地，举办欧洲最大的畜牧展 Sommet de l'Élevage——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके क्लेरमों-फेराँ में स्टैंड डिज़ाइन और स्थापित करता है — यह ओवेर्न्य की राजधानी है, जहाँ Grande Halle d'Auvergne मेला परिसर स्थित है, जहाँ यूरोप का सबसे बड़ा पशुपालन मेला Sommet de l'Élevage आयोजित होता है — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 클레르몽페랑에서 전시회 부스를 디자인하고 시공합니다. 이곳은 오베르뉴의 중심 도시이자 Grande Halle d'Auvergne 전시장이 위치한 곳으로, 유럽 최대의 축산 박람회 Sommet de l'Élevage가 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、クレルモン＝フェランで展示会ブースの設計・施工を行います。ここはオーヴェルニュ地域圏の中心都市であり、Grande Halle d'Auvergne見本市会場を擁し、欧州最大の畜産見本市Sommet de l'Élevageが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "grenoble": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Grenoble —capital de los Alpes franceses, sede del recinto Alpexpo, con citas como Mountain Planet (equipamiento y turismo de montaña) y SEPEM Industries Sud-Est (servicios y mantenimiento industrial)— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Grenoble —capital of the French Alps, home to the Alpexpo venue, with events such as Mountain Planet (mountain resort equipment and tourism) and SEPEM Industries Sud-Est (industrial services and maintenance)— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Grenoble — der Hauptstadt der französischen Alpen, Standort des Messegeländes Alpexpo, mit Veranstaltungen wie Mountain Planet (Bergausrüstung und -tourismus) und SEPEM Industries Sud-Est (Industriedienstleistungen und -wartung) — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Grenoble — capital dos Alpes franceses, sede do recinto Alpexpo, com certames como Mountain Planet (equipamento e turismo de montanha) e SEPEM Industries Sud-Est (serviços e manutenção industrial) — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Grenoble — capitale des Alpes françaises, siège du parc des expositions Alpexpo, avec des rendez-vous comme Mountain Planet (équipement et tourisme de montagne) et SEPEM Industries Sud-Est (services et maintenance industrielle) — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Grenoble — capitale delle Alpi francesi, sede del polo fieristico Alpexpo, con appuntamenti come Mountain Planet (attrezzature e turismo di montagna) e SEPEM Industries Sud-Est (servizi e manutenzione industriale) — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Grenoble — hoofdstad van de Franse Alpen, thuisbasis van het beursterrein Alpexpo, met evenementen zoals Mountain Planet (bergtoerisme en -uitrusting) en SEPEM Industries Sud-Est (industriële diensten en onderhoud) — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在格勒诺布尔为展会设计并搭建展台——这是法国阿尔卑斯山区的首府，Alpexpo 展览中心所在地，举办 Mountain Planet（山地设备与旅游）和 SEPEM Industries Sud-Est（工业服务与维护）等展会——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके ग्रेनोबल में स्टैंड डिज़ाइन और स्थापित करता है — यह फ्रेंच आल्प्स की राजधानी है, जहाँ Alpexpo मेला परिसर स्थित है, जहाँ Mountain Planet (पर्वतीय उपकरण एवं पर्यटन) और SEPEM Industries Sud-Est (औद्योगिक सेवाएँ एवं रखरखाव) जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 그르노블에서 전시회 부스를 디자인하고 시공합니다. 이곳은 프랑스 알프스의 중심 도시이자 Alpexpo 전시장이 위치한 곳으로, Mountain Planet(산악 장비 및 관광)과 SEPEM Industries Sud-Est(산업 서비스 및 유지보수) 등이 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、グルノーブルで展示会ブースの設計・施工を行います。ここはフランス・アルプスの中心都市であり、Alpexpo見本市会場を擁し、Mountain Planet（山岳設備・観光）やSEPEM Industries Sud-Est（産業サービス・メンテナンス）などが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "lyon": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Lyon —segunda economía de Francia, sede del gran recinto Eurexpo Lyon y capital mundial de la gastronomía, con citas como SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack y BEPOSITIVE— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Lyon —France's second-largest economy, home to the major Eurexpo Lyon venue and the world capital of gastronomy, with events such as SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack and BEPOSITIVE— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Lyon — Frankreichs zweitgrößter Wirtschaftsregion, Standort des großen Messegeländes Eurexpo Lyon und Welthauptstadt der Gastronomie, mit Veranstaltungen wie SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack und BEPOSITIVE — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Lyon — a segunda economia de França, sede do grande recinto Eurexpo Lyon e capital mundial da gastronomia, com certames como SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack e BEPOSITIVE — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Lyon — deuxième économie de France, siège du grand parc des expositions Eurexpo Lyon et capitale mondiale de la gastronomie, avec des rendez-vous comme SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack et BEPOSITIVE — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Lione — seconda economia della Francia, sede del grande polo fieristico Eurexpo Lyon e capitale mondiale della gastronomia, con appuntamenti come SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack e BEPOSITIVE — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Lyon — de op één na grootste economie van Frankrijk, thuisbasis van het grote beursterrein Eurexpo Lyon en wereldhoofdstad van de gastronomie, met evenementen zoals SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack en BEPOSITIVE — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在里昂为展会设计并搭建展台——这是法国第二大经济体，Eurexpo Lyon 大型会展中心所在地，也是世界美食之都，举办 SIRHA、Global Industrie、Pollutec、Piscine Global Europe、Préventica Lyon、Prod&Pack 和 BEPOSITIVE 等展会——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके ल्यों में स्टैंड डिज़ाइन और स्थापित करता है — यह फ्रांस की दूसरी सबसे बड़ी अर्थव्यवस्था है, जहाँ बड़ा Eurexpo Lyon मेला परिसर स्थित है और जो गैस्ट्रोनॉमी की विश्व राजधानी है, जहाँ SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack और BEPOSITIVE जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 리옹에서 전시회 부스를 디자인하고 시공합니다. 이곳은 프랑스 제2의 경제 도시이자 대형 전시장 Eurexpo Lyon이 위치한 곳이며 세계 미식의 수도로, SIRHA, Global Industrie, Pollutec, Piscine Global Europe, Préventica Lyon, Prod&Pack, BEPOSITIVE 등이 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、リヨンで展示会ブースの設計・施工を行います。ここはフランス第2の経済都市であり、大規模な見本市会場Eurexpo Lyonを擁し、美食の世界首都でもあり、SIRHA、Global Industrie、Pollutec、Piscine Global Europe、Préventica Lyon、Prod&Pack、BEPOSITIVEなどが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "burdeos": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Burdeos —capital de Nueva Aquitania y capital mundial del vino, sede de la Foire Internationale de Bordeaux en el Parc des Expositions de Bordeaux-Lac— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Bordeaux —capital of Nouvelle-Aquitaine and the world capital of wine, home to the Foire Internationale de Bordeaux at the Parc des Expositions de Bordeaux-Lac— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Bordeaux — der Hauptstadt Nouvelle-Aquitaines und der Welthauptstadt des Weins, Austragungsort der Foire Internationale de Bordeaux im Parc des Expositions de Bordeaux-Lac — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Bordéus — capital da Nova Aquitânia e capital mundial do vinho, sede da Foire Internationale de Bordeaux no Parc des Expositions de Bordeaux-Lac — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Bordeaux — capitale de la Nouvelle-Aquitaine et capitale mondiale du vin, siège de la Foire Internationale de Bordeaux au Parc des Expositions de Bordeaux-Lac — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Bordeaux — capitale della Nuova Aquitania e capitale mondiale del vino, sede della Foire Internationale de Bordeaux al Parc des Expositions de Bordeaux-Lac — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Bordeaux — hoofdstad van Nouvelle-Aquitaine en wereldhoofdstad van de wijn, thuisbasis van de Foire Internationale de Bordeaux in het Parc des Expositions de Bordeaux-Lac — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在波尔多为展会设计并搭建展台——这是新阿基坦大区的首府，也是世界葡萄酒之都，Bordeaux-Lac 会展中心举办波尔多国际博览会——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके बोर्डो में स्टैंड डिज़ाइन और स्थापित करता है — यह नुवेल-अकीतेन की राजधानी और विश्व की वाइन राजधानी है, जहाँ Parc des Expositions de Bordeaux-Lac में Foire Internationale de Bordeaux आयोजित होती है — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 보르도에서 전시회 부스를 디자인하고 시공합니다. 이곳은 누벨아키텐의 중심 도시이자 세계 와인의 수도로, Parc des Expositions de Bordeaux-Lac에서 Foire Internationale de Bordeaux가 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、ボルドーで展示会ブースの設計・施工を行います。ここはヌーヴェル＝アキテーヌ地域圏の中心都市であり、世界のワインの都で、Parc des Expositions de Bordeaux-Lacでボルドー国際見本市が開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "toulouse": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Toulouse —capital de Occitania y de la aeronáutica europea, sede de la Foire Internationale de Toulouse en el MEETT— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Toulouse —capital of Occitania and of European aeronautics, home to the Foire Internationale de Toulouse at the MEETT— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Toulouse — der Hauptstadt Okzitaniens und der europäischen Luftfahrt, Austragungsort der Foire Internationale de Toulouse im MEETT — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Toulouse — capital da Occitânia e da aeronáutica europeia, sede da Foire Internationale de Toulouse no MEETT — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Toulouse — capitale de l'Occitanie et de l'aéronautique européenne, siège de la Foire Internationale de Toulouse au MEETT — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Tolosa — capitale dell'Occitania e dell'aeronautica europea, sede della Foire Internationale de Toulouse al MEETT — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Toulouse — hoofdstad van Occitanië en van de Europese luchtvaart, thuisbasis van de Foire Internationale de Toulouse in de MEETT — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在图卢兹为展会设计并搭建展台——这是奥克西塔尼大区与欧洲航空业的中心，MEETT 举办图卢兹国际博览会——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके तुलूज़ में स्टैंड डिज़ाइन और स्थापित करता है — यह ऑक्सिटानिया और यूरोपीय वैमानिकी की राजधानी है, जहाँ MEETT में Foire Internationale de Toulouse आयोजित होती है — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 툴루즈에서 전시회 부스를 디자인하고 시공합니다. 이곳은 옥시타니와 유럽 항공 산업의 중심지로, MEETT에서 Foire Internationale de Toulouse가 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、トゥールーズで展示会ブースの設計・施工を行います。ここはオクシタニー地域圏と欧州航空産業の中心都市で、MEETTでトゥールーズ国際見本市が開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "avignon": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Aviñón —capital de Provenza y del Ródano, sede de MED'Agri en el Parc des Expositions— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Avignon —capital of Provence and the Rhône, home to MED'Agri at the Parc des Expositions— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Avignon — der Hauptstadt der Provence und der Rhône, Austragungsort der MED'Agri im Parc des Expositions — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Avinhão — capital da Provença e do Ródano, sede da MED'Agri no Parc des Expositions — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Avignon — capitale de la Provence et du Rhône, siège de MED'Agri au Parc des Expositions — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand ad Avignone — capitale della Provenza e del Rodano, sede di MED'Agri al Parc des Expositions — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Avignon — hoofdstad van de Provence en de Rhône, thuisbasis van MED'Agri in het Parc des Expositions — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在阿维尼翁为展会设计并搭建展台——这是普罗旺斯与罗讷河的中心城市，Parc des Expositions 举办 MED'Agri 地中海农业展——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके अविञ्यों में स्टैंड डिज़ाइन और स्थापित करता है — यह प्रोवांस और रोन की राजधानी है, जहाँ Parc des Expositions में MED'Agri आयोजित होती है — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 아비뇽에서 전시회 부스를 디자인하고 시공합니다. 이곳은 프로방스와 론 지방의 중심지로, Parc des Expositions에서 MED'Agri가 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、アヴィニョンで展示会ブースの設計・施工を行います。ここはプロヴァンスとローヌ地方の中心都市で、Parc des ExpositionsでMED'Agriが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "cannes": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Cannes —capital del lujo en la Costa Azul, sede del Cannes Yachting Festival, MAPIC, MIPIM y TFWA World Exhibition en el Palais des Festivals— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Cannes —the French Riviera's capital of luxury, home to the Cannes Yachting Festival, MAPIC, MIPIM and TFWA World Exhibition at the Palais des Festivals— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Cannes — der Luxushauptstadt der Côte d'Azur, Austragungsort des Cannes Yachting Festival, der MAPIC, der MIPIM und der TFWA World Exhibition im Palais des Festivals — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Cannes — capital do luxo na Côte d'Azur, sede do Cannes Yachting Festival, da MAPIC, da MIPIM e da TFWA World Exhibition no Palais des Festivals — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Cannes — capitale du luxe sur la Côte d'Azur, siège du Cannes Yachting Festival, du MAPIC, du MIPIM et du TFWA World Exhibition au Palais des Festivals — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Cannes — capitale del lusso sulla Costa Azzurra, sede del Cannes Yachting Festival, di MAPIC, di MIPIM e del TFWA World Exhibition al Palais des Festivals — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Cannes — de luxehoofdstad van de Côte d'Azur, thuisbasis van het Cannes Yachting Festival, MAPIC, MIPIM en de TFWA World Exhibition in het Palais des Festivals — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在戛纳为展会设计并搭建展台——这是蔚蓝海岸的奢华之都，举办戛纳游艇展、MAPIC、MIPIM 和 TFWA World Exhibition（均在电影节宫）——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके कान में स्टैंड डिज़ाइन और स्थापित करता है — यह कोट डी'अज़ूर की विलासिता की राजधानी है, जहाँ Palais des Festivals में Cannes Yachting Festival, MAPIC, MIPIM और TFWA World Exhibition आयोजित होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 칸에서 전시회 부스를 디자인하고 시공합니다. 이곳은 코트다쥐르의 럭셔리 중심지로, Palais des Festivals에서 칸 요트 페스티벌, MAPIC, MIPIM, TFWA World Exhibition이 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、カンヌで展示会ブースの設計・施工を行います。ここはコート・ダジュールを代表するラグジュアリー都市で、Palais des Festivalsでカンヌ・ヨットフェスティバル、MAPIC、MIPIM、TFWA World Exhibitionが開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "marsella": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte cruza los Pirineos y diseña y monta stands en Marsella —gran plaza del arco mediterráneo francés, sede de la Foire Internationale de Marseille en el Parc Chanot— controlando cada fase: diseño 3D, fabricación, transporte, montaje y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte crosses the Pyrenees to design and assemble exhibition stands in Marseille —a major hub of the French Mediterranean arc, home to the Foire Internationale de Marseille at Parc Chanot— controlling every phase: 3D design, production, transport, assembly and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt überquert Standarte die Pyrenäen und entwirft und montiert Messestände in Marseille — einem wichtigen Zentrum des französischen Mittelmeerbogens, Austragungsort der Foire Internationale de Marseille im Parc Chanot — und kontrolliert jede Phase: 3D-Design, Produktion, Transport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch jenseits der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte atravessa os Pirenéus e projeta e monta stands em Marselha — grande praça do arco mediterrânico francês, sede da Foire Internationale de Marseille no Parc Chanot — controlando cada fase: design 3D, fabrico, transporte, montagem e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte franchit les Pyrénées et conçoit et monte des stands à Marseille — grande place de l'arc méditerranéen français, siège de la Foire Internationale de Marseille au Parc Chanot — en maîtrisant chaque phase : conception 3D, fabrication, transport, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte varca i Pirenei e progetta e monta stand a Marsiglia — grande piazza dell'arco mediterraneo francese, sede della Foire Internationale de Marseille al Parc Chanot — controllando ogni fase: progettazione 3D, produzione, trasporto, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats steekt Standarte de Pyreneeën over en ontwerpt en monteert beursstands in Marseille — een belangrijk knooppunt van de Franse mediterrane boog, thuisbasis van de Foire Internationale de Marseille in het Parc Chanot — met volledige controle over elke fase: 3D-ontwerp, productie, transport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de andere kant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 跨越比利牛斯山，在马赛为展会设计并搭建展台——这是法国地中海弧线上的重要城市，Parc Chanot 举办马赛国际博览会——全程掌控每个环节：3D设计、制造、运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पिरेनीज़ पार करके मार्सिले में स्टैंड डिज़ाइन और स्थापित करता है — यह फ़्रांसीसी भूमध्यसागरीय चाप का एक प्रमुख केंद्र है, जहाँ Parc Chanot में Foire Internationale de Marseille आयोजित होती है — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 피레네를 넘어 마르세유에서 전시회 부스를 디자인하고 시공합니다. 이곳은 프랑스 지중해 연안의 주요 거점으로, Parc Chanot에서 Foire Internationale de Marseille가 열리며, 3D 디자인, 제작, 운송, 설치, 현장 검수까지 모든 공정을 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはピレネーを越え、マルセイユで展示会ブースの設計・施工を行います。ここはフランス地中海沿岸の主要都市で、Parc Chanotでマルセイユ国際見本市が開催され、3D設計、製作、輸送、設営、会場での検収まですべての工程を管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "teruel": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en la provincia de Teruel —tierra del jamón con DOP, con citas como la Feria del Jamón de Teruel y Alimentos de Calidad en la capital, ExpoCalamocha y AgroAlcañiz— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también en el interior de Aragón."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in the province of Teruel —land of the PDO cured ham, with events such as the Feria del Jamón de Teruel y Alimentos de Calidad in the capital, ExpoCalamocha and AgroAlcañiz— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, in inland Aragón too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in der Provinz Teruel — Heimat des Schinkens mit geschützter Ursprungsbezeichnung, mit Veranstaltungen wie der Feria del Jamón de Teruel y Alimentos de Calidad in der Hauptstadt, ExpoCalamocha und AgroAlcañiz — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch im Inneren Aragoniens."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands na província de Teruel — terra do presunto com DOP, com certames como a Feria del Jamón de Teruel y Alimentos de Calidad na capital, a ExpoCalamocha e a AgroAlcañiz — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também no interior de Aragão."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands dans la province de Teruel — terre du jambon AOP, avec des rendez-vous comme la Feria del Jamón de Teruel y Alimentos de Calidad dans la capitale, ExpoCalamocha et AgroAlcañiz — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, à l'intérieur de l'Aragon aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand nella provincia di Teruel — terra del prosciutto DOP, con appuntamenti come la Feria del Jamón de Teruel y Alimentos de Calidad nel capoluogo, ExpoCalamocha e AgroAlcañiz — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche nell'entroterra dell'Aragona."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in de provincie Teruel — het land van de ham met beschermde oorsprongsbenaming, met evenementen zoals de Feria del Jamón de Teruel y Alimentos de Calidad in de hoofdstad, ExpoCalamocha en AgroAlcañiz — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook in het binnenland van Aragón."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在特鲁埃尔省为展会设计并搭建展台——这里是原产地保护火腿之乡，举办首府的 Feria del Jamón de Teruel y Alimentos de Calidad、ExpoCalamocha 以及 AgroAlcañiz 等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在阿拉贡内陆地区。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte टेरुएल प्रांत में स्टैंड डिज़ाइन और स्थापित करता है — यह DOP हैम की भूमि है, जहाँ राजधानी में Feria del Jamón de Teruel y Alimentos de Calidad, ExpoCalamocha और AgroAlcañiz जैसे कार्यक्रम होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को आरागोन के भीतरी इलाकों में भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 테루엘 주에서 전시회 부스를 디자인하고 시공합니다. 이곳은 원산지 명칭 보호(DOP) 하몽의 고장으로, 주도에서 열리는 Feria del Jamón de Teruel y Alimentos de Calidad, ExpoCalamocha, AgroAlcañiz 등이 개최되며, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 아라곤 내륙에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはテルエル県で展示会ブースの設計・施工を行います。ここは原産地呼称保護（DOP）生ハムの産地で、県都で開催されるFeria del Jamón de Teruel y Alimentos de Calidad、ExpoCalamocha、AgroAlcañizなどの見本市が開かれ、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、アラゴンの内陸でも想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "andorra": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Andorra —principado del Pirineo entre España y Francia, con citas como la Fira d'Andorra la Vella, Andorra Taste y l'Enfira't d'Encamp— controlando cada fase: diseño 3D, fabricación, tránsito aduanero, transporte de montaña, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado de la frontera."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Andorra —a Pyrenean principality between Spain and France, with events such as the Fira d'Andorra la Vella, Andorra Taste and Enfira't in Encamp— controlling every phase: 3D design, production, customs clearance, mountain transport, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the border too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Andorra — einem Fürstentum in den Pyrenäen zwischen Spanien und Frankreich, mit Veranstaltungen wie der Fira d'Andorra la Vella, Andorra Taste und dem Enfira't in Encamp — und kontrolliert jede Phase: 3D-Design, Produktion, Zollabfertigung, Bergtransport, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch auf der anderen Seite der Grenze."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Andorra — principado dos Pirenéus entre Espanha e França, com certames como a Fira d'Andorra la Vella, a Andorra Taste e o Enfira't de Encamp — controlando cada fase: design 3D, fabrico, trânsito aduaneiro, transporte de montanha, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado da fronteira."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands en Andorre — principauté des Pyrénées entre l'Espagne et la France, avec des rendez-vous comme la Fira d'Andorra la Vella, Andorra Taste et l'Enfira't d'Encamp — en maîtrisant chaque phase : conception 3D, fabrication, transit douanier, transport de montagne, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la frontière aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand ad Andorra — principato dei Pirenei tra Spagna e Francia, con appuntamenti come la Fira d'Andorra la Vella, Andorra Taste e l'Enfira't di Encamp — controllando ogni fase: progettazione 3D, produzione, transito doganale, trasporto di montagna, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del confine."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Andorra — een vorstendom in de Pyreneeën tussen Spanje en Frankrijk, met evenementen zoals de Fira d'Andorra la Vella, Andorra Taste en de Enfira't in Encamp — met volledige controle over elke fase: 3D-ontwerp, productie, douaneafhandeling, bergtransport, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de grens."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在安道尔为展会设计并搭建展台——这个位于西班牙与法国之间的比利牛斯山公国，举办 Fira d'Andorra la Vella、Andorra Taste 以及恩坎普的 Enfira't 等展会——全程掌控每个环节：3D设计、制造、海关通关、山区运输、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在边境的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte अंडोरा में स्टैंड डिज़ाइन और स्थापित करता है — यह स्पेन और फ़्रांस के बीच पिरेनीज़ में स्थित एक रियासत है, जहाँ Fira d'Andorra la Vella, Andorra Taste और एनकांप का Enfira't जैसे कार्यक्रम होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, सीमा शुल्क निकासी, पर्वतीय परिवहन, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को सीमा के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 안도라에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Fira d'Andorra la Vella, Andorra Taste, 엔캄프의 Enfira't 등이 열리는 스페인과 프랑스 사이 피레네의 공국으로, 3D 디자인, 제작, 통관, 산악 운송, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 국경 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはアンドラで展示会ブースの設計・施工を行います。ここはFira d'Andorra la Vella、Andorra Taste、エンカンプのEnfira'tなどが開催されるスペインとフランスに挟まれたピレネーの公国で、3D設計、製作、通関、山岳輸送、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、国境を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "rabat": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Rabat —capital de Marruecos y Capital Mundial del Libro UNESCO 2026, plaza de la edición, la cultura y la educación, con citas como el SIEL (Salon International de l'Édition et du Livre) en el recinto OLM Souissi y Visa For Music— controlando cada fase: diseño 3D, fabricación, logística por barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado del Estrecho."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Rabat —Morocco’s capital and UNESCO World Book Capital 2026, a hub of publishing, culture and education, with events such as SIEL (the International Publishing and Book Fair) at the OLM Souissi venue and Visa For Music— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the Strait too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Rabat — der Hauptstadt Marokkos und UNESCO-Welthauptstadt des Buches 2026, einem Zentrum für Verlagswesen, Kultur und Bildung, mit Veranstaltungen wie der SIEL (Internationale Buchmesse) im OLM-Souissi-Gelände und Visa For Music — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch auf der anderen Seite der Meerenge."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Rabat — capital de Marrocos e Capital Mundial do Livro UNESCO 2026, praça da edição, da cultura e da educação, com certames como o SIEL (Salon International de l'Édition et du Livre) no recinto OLM Souissi e o Visa For Music — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado do Estreito."
    },
    "fr": {
      "intro": "Forte de 20 ans d’expérience dans l’architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Rabat — capitale du Maroc et Capitale mondiale du livre UNESCO 2026, place de l’édition, de la culture et de l’éducation, avec des rendez-vous comme le SIEL (Salon International de l’Édition et du Livre) au parc OLM Souissi et Visa For Music — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d’esprit d’un montage sans surprise et une attention exceptionnelle aux détails, de l’autre côté du détroit aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Rabat — capitale del Marocco e Capitale mondiale del libro UNESCO 2026, piazza dell’editoria, della cultura e dell’istruzione, con appuntamenti come il SIEL (Salon International de l’Édition et du Livre) al polo OLM Souissi e Visa For Music — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un’eccezionale attenzione ai dettagli, anche dall’altra parte dello Stretto."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Rabat — de hoofdstad van Marokko en UNESCO Wereldhoofdstad van het Boek 2026, een knooppunt van uitgeverij, cultuur en onderwijs, met evenementen zoals de SIEL (internationale boekenbeurs) op het OLM Souissi-terrein en Visa For Music — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de zeestraat."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在拉巴特为展会设计并搭建展台——这是摩洛哥的首都，也是2026年联合国教科文组织世界图书之都，是出版、文化与教育的重镇，举办 SIEL 国际图书展（OLM Souissi 会场）和 Visa For Music 等活动——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在海峡的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte रबात में स्टैंड डिज़ाइन और स्थापित करता है — यह मोरक्को की राजधानी और यूनेस्को विश्व पुस्तक राजधानी 2026 है, जो प्रकाशन, संस्कृति और शिक्षा का केंद्र है, जहाँ OLM Souissi परिसर में SIEL (अंतरराष्ट्रीय पुस्तक मेला) और Visa For Music जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को जलडमरूमध्य के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 라바트에서 전시회 부스를 디자인하고 시공합니다. 이곳은 모로코의 수도이자 2026 유네스코 세계 책의 수도로, 출판·문화·교육의 중심지이며, OLM Souissi 전시장에서 열리는 SIEL(국제 도서전)과 Visa For Music 등이 개최되고, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 해협 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはラバトで展示会ブースの設計・施工を行います。ここはモロッコの首都であり、2026年ユネスコ「世界図書首都」で、出版・文化・教育の中心地です。OLM Souissi会場で開催されるSIEL（国際ブックフェア）やVisa For Musicなどが行われ、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海峡を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "casablanca": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Casablanca —capital económica de Marruecos, mayor puerto atlántico del país y gran plaza ferial en el recinto CICEC, con citas como Logismed, Morocco Food Expo, Elec Expo, SISTEP y Plast Expo— controlando cada fase: diseño 3D, fabricación, logística por barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado del Estrecho."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Casablanca —Morocco’s economic capital, the country’s largest Atlantic port and a major fairground at the CICEC venue, with events such as Logismed, Morocco Food Expo, Elec Expo, SISTEP and Plast Expo— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the Strait too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Casablanca — Marokkos Wirtschaftshauptstadt, der größte Atlantikhafen des Landes und ein bedeutender Messestandort im CICEC-Gelände, mit Veranstaltungen wie Logismed, Morocco Food Expo, Elec Expo, SISTEP und Plast Expo — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch auf der anderen Seite der Meerenge."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Casablanca — capital económica de Marrocos, o maior porto atlântico do país e uma grande praça de feiras no recinto CICEC, com certames como Logismed, Morocco Food Expo, Elec Expo, SISTEP e Plast Expo — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado do Estreito."
    },
    "fr": {
      "intro": "Forte de 20 ans d’expérience dans l’architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Casablanca — capitale économique du Maroc, plus grand port atlantique du pays et grande place de salons au parc CICEC, avec des rendez-vous comme Logismed, Morocco Food Expo, Elec Expo, SISTEP et Plast Expo — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d’esprit d’un montage sans surprise et une attention exceptionnelle aux détails, de l’autre côté du détroit aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Casablanca — capitale economica del Marocco, il maggior porto atlantico del paese e un’importante sede fieristica nel polo CICEC, con appuntamenti come Logismed, Morocco Food Expo, Elec Expo, SISTEP e Plast Expo — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un’eccezionale attenzione ai dettagli, anche dall’altra parte dello Stretto."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Casablanca — de economische hoofdstad van Marokko, de grootste Atlantische haven van het land en een belangrijke beurslocatie in het CICEC-terrein, met evenementen zoals Logismed, Morocco Food Expo, Elec Expo, SISTEP en Plast Expo — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de zeestraat."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在卡萨布兰卡为展会设计并搭建展台——这是摩洛哥的经济首都、该国最大的大西洋港口，也是 CICEC 会展中心的重要展览地，举办 Logismed、Morocco Food Expo、Elec Expo、SISTEP 和 Plast Expo 等展会——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在海峡的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte कासाब्लांका में स्टैंड डिज़ाइन और स्थापित करता है — यह मोरक्को की आर्थिक राजधानी, देश का सबसे बड़ा अटलांटिक बंदरगाह और CICEC परिसर का एक प्रमुख मेला स्थल है, जहाँ Logismed, Morocco Food Expo, Elec Expo, SISTEP और Plast Expo जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को जलडमरूमध्य के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 카사블랑카에서 전시회 부스를 디자인하고 시공합니다. 이곳은 모로코의 경제 수도이자 이 나라 최대의 대서양 항구이며 CICEC 전시장의 주요 개최지로, Logismed, Morocco Food Expo, Elec Expo, SISTEP, Plast Expo 등이 열리며, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 해협 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはカサブランカで展示会ブースの設計・施工を行います。ここはモロッコの経済的中心都市であり、同国最大の大西洋岸の港湾、そしてCICEC会場を擁する主要な見本市開催地で、Logismed、Morocco Food Expo、Elec Expo、SISTEP、Plast Expoなどが開催され、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海峡を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "tanger": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Tánger —puerta de Marruecos frente al Estrecho de Gibraltar y polo textil, industrial y logístico, con citas como Maroc in Mode (MIM), Tanger Nexus, la Tanger Fashion Week, los encuentros AMITH Nord y los eventos industriales de Tanger Med— controlando cada fase: diseño 3D, fabricación, logística por barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado del Estrecho."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Tangier —Morocco’s gateway across the Strait of Gibraltar and a textile, industrial and logistics hub, with events such as Maroc in Mode (MIM), Tanger Nexus, Tanger Fashion Week, the AMITH Nord meetings and the Tanger Med industrial events— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the Strait too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Tanger — Marokkos Tor an der Straße von Gibraltar und Textil-, Industrie- und Logistikzentrum, mit Veranstaltungen wie Maroc in Mode (MIM), Tanger Nexus, der Tanger Fashion Week, den AMITH-Nord-Treffen und den Industrieveranstaltungen von Tanger Med — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch auf der anderen Seite der Meerenge."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Tânger — porta de Marrocos frente ao Estreito de Gibraltar e polo têxtil, industrial e logístico, com certames como a Maroc in Mode (MIM), a Tanger Nexus, a Tanger Fashion Week, os encontros AMITH Nord e os eventos industriais de Tanger Med — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado do Estreito."
    },
    "fr": {
      "intro": "Forte de 20 ans d’expérience dans l’architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Tanger — porte du Maroc face au détroit de Gibraltar et pôle textile, industriel et logistique, avec des rendez-vous comme Maroc in Mode (MIM), Tanger Nexus, la Tanger Fashion Week, les rencontres AMITH Nord et les événements industriels de Tanger Med — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d’esprit d’un montage sans surprise et une attention exceptionnelle aux détails, de l’autre côté du détroit aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Tangeri — porta del Marocco di fronte allo Stretto di Gibilterra e polo tessile, industriale e logistico, con appuntamenti come Maroc in Mode (MIM), Tanger Nexus, la Tanger Fashion Week, gli incontri AMITH Nord e gli eventi industriali di Tanger Med — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un’eccezionale attenzione ai dettagli, anche dall’altra parte dello Stretto."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Tanger — de poort van Marokko aan de Straat van Gibraltar en een textiel-, industrie- en logistiek knooppunt, met evenementen zoals Maroc in Mode (MIM), Tanger Nexus, de Tanger Fashion Week, de AMITH Nord-ontmoetingen en de industriële evenementen van Tanger Med — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de zeestraat."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在丹吉尔为展会设计并搭建展台——这座位于直布罗陀海峡对岸的摩洛哥门户，也是纺织、工业与物流枢纽，举办 Maroc in Mode (MIM)、Tanger Nexus、Tanger Fashion Week、AMITH Nord 会议以及 Tanger Med 工业活动等——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在海峡的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte तंजियर में स्टैंड डिज़ाइन और स्थापित करता है — यह जिब्राल्टर जलडमरूमध्य के सामने मोरक्को का प्रवेशद्वार और एक वस्त्र, औद्योगिक एवं लॉजिस्टिक्स केंद्र है, जहाँ Maroc in Mode (MIM), Tanger Nexus, Tanger Fashion Week, AMITH Nord बैठकें और Tanger Med के औद्योगिक आयोजन जैसे कार्यक्रम होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को जलडमरूमध्य के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 탕헤르에서 전시회 부스를 디자인하고 시공합니다. 이곳은 지브롤터 해협 건너편에 위치한 모로코의 관문이자 섬유·산업·물류 거점으로, Maroc in Mode (MIM), Tanger Nexus, Tanger Fashion Week, AMITH Nord 미팅, Tanger Med 산업 행사 등이 열리며, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 해협 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはタンジェで展示会ブースの設計・施工を行います。ここはジブラルタル海峡を挟んだモロコの玄関口であり、繊維・産業・物流の拠点で、Maroc in Mode (MIM)、Tanger Nexus、Tanger Fashion Week、AMITH Nordの会合、Tanger Medの産業イベントなどが開催され、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海峡を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "melilla": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Melilla —ciudad autónoma en la costa norteafricana del Mediterráneo, con citas como la Feria de Oportunidades Económicas, la Feria de Representación Intercultural y los eventos empresariales de Proyecto Melilla— controlando cada fase: diseño 3D, fabricación, logística por barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado del mar."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Melilla —an autonomous city on the North African Mediterranean coast, with events such as the Economic Opportunities Fair, the Intercultural Representation Fair and the Proyecto Melilla business events— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, across the sea too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Melilla — einer autonomen Stadt an der nordafrikanischen Mittelmeerküste, mit Veranstaltungen wie der Messe für wirtschaftliche Chancen, der Messe für interkulturelle Repräsentation und den Unternehmensevents von Proyecto Melilla — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch über das Meer hinweg."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Melilla — cidade autónoma na costa norte-africana do Mediterrâneo, com certames como a Feira de Oportunidades Económicas, a Feira de Representação Intercultural e os eventos empresariais do Proyecto Melilla — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado do mar."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Melilla — ville autonome sur la côte méditerranéenne d'Afrique du Nord, avec des rendez-vous comme la Foire des opportunités économiques, la Foire de représentation interculturelle et les événements d'entreprise de Proyecto Melilla — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté de la mer aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Melilla — città autonoma sulla costa nordafricana del Mediterraneo, con appuntamenti come la Fiera delle Opportunità Economiche, la Fiera di Rappresentazione Interculturale e gli eventi aziendali di Proyecto Melilla — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del mare."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Melilla — een autonome stad aan de Noord-Afrikaanse Middellandse Zeekust, met evenementen zoals de Beurs voor Economische Kansen, de Beurs voor Interculturele Representatie en de zakelijke evenementen van Proyecto Melilla — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de zee."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在梅利利亚为展会设计并搭建展台——这座位于北非地中海沿岸的自治市，举办经济机遇展、跨文化representación展以及 Proyecto Melilla 企业活动等——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便远隔重洋。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte मेलिला में स्टैंड डिज़ाइन और स्थापित करता है — यह भूमध्यसागर के उत्तरी अफ्रीकी तट पर स्थित एक स्वायत्त शहर है, जहाँ आर्थिक अवसर मेला, अंतरसांस्कृतिक प्रतिनिधित्व मेला और Proyecto Melilla के व्यावसायिक आयोजन जैसे कार्यक्रम होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को समुद्र के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 멜리야에서 전시회 부스를 디자인하고 시공합니다. 이곳은 경제 기회 박람회, 다문화 대표 박람회, Proyecto Melilla 비즈니스 행사 등이 열리는 북아프리카 지중해 연안의 자치시로, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 바다 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはメリリャで展示会ブースの設計・施工を行います。ここは経済機会見本市、異文化表現見本市、Proyecto Melillaのビジネスイベントなどが開催される北アフリカ地中海岸の自治都市で、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "ceuta": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Ceuta —ciudad autónoma en el Estrecho de Gibraltar, con citas como Bet On Ceuta, Ceuta Impulsa y las jornadas de economía azul Odissea— controlando cada fase: diseño 3D, fabricación, logística por barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, también al otro lado del Estrecho."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Ceuta —an autonomous city on the Strait of Gibraltar, with events such as Bet On Ceuta, Ceuta Impulsa and the Odissea blue-economy sessions— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, on the other side of the Strait too."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Ceuta — einer autonomen Stadt an der Straße von Gibraltar, mit Veranstaltungen wie Bet On Ceuta, Ceuta Impulsa und den Odissea-Tagen zur blauen Wirtschaft — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch auf der anderen Seite der Meerenge."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Ceuta — cidade autónoma no Estreito de Gibraltar, com certames como a Bet On Ceuta, a Ceuta Impulsa e as jornadas de economia azul Odissea — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, também do outro lado do Estreito."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Ceuta — ville autonome sur le détroit de Gibraltar, avec des rendez-vous comme Bet On Ceuta, Ceuta Impulsa et les journées d'économie bleue Odissea — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, de l'autre côté du détroit aussi."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Ceuta — città autonoma sullo Stretto di Gibilterra, con appuntamenti come Bet On Ceuta, Ceuta Impulsa e le giornate di economia blu Odissea — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte dello Stretto."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Ceuta — een autonome stad aan de Straat van Gibraltar, met evenementen zoals Bet On Ceuta, Ceuta Impulsa en de Odissea-dagen over de blauwe economie — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, ook aan de overkant van de zeestraat."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在休达为展会设计并搭建展台——这座位于直布罗陀海峡的自治市，举办 Bet On Ceuta、Ceuta Impulsa 以及蓝色经济活动 Odissea 等展会——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便在海峡的另一侧。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte सेउता में स्टैंड डिज़ाइन और स्थापित करता है — यह जिब्राल्टर जलडमरूमध्य पर स्थित एक स्वायत्त शहर है, जहाँ Bet On Ceuta, Ceuta Impulsa और नीली अर्थव्यवस्था आयोजन Odissea जैसे कार्यक्रम होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को जलडमरूमध्य के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 세우타에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Bet On Ceuta, Ceuta Impulsa, 블루 이코노미 행사 Odissea 등이 열리는 지브롤터 해협의 자치시로, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 해협 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはセウタで展示会ブースの設計・施工を行います。ここはBet On Ceuta、Ceuta Impulsa、ブルーエコノミーのイベントOdisseaなどが開催されるジブラルタル海峡の自治都市で、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海峡を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "menorca": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Menorca —isla balear y Reserva de Biosfera, con citas como HORECA Baleares Menorca, la Fira del Camp de Alaior y Arrels— controlando cada fase: diseño 3D, fabricación, logística en barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, incluso al otro lado del mar."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Menorca —a Balearic island and Biosphere Reserve, with events such as HORECA Baleares Menorca, the Fira del Camp in Alaior and Arrels— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, even across the sea."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände auf Menorca — einer Baleareninsel und Biosphärenreservat, mit Veranstaltungen wie HORECA Baleares Menorca, der Fira del Camp in Alaior und Arrels — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch über das Meer hinweg."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Menorca — ilha balear e Reserva da Biosfera, com certames como a HORECA Baleares Menorca, a Fira del Camp de Alaior e a Arrels — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, mesmo do outro lado do mar."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Minorque — île des Baléares et Réserve de biosphère, avec des rendez-vous comme HORECA Baleares Menorca, la Fira del Camp d'Alaior et Arrels — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, même de l'autre côté de la mer."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Minorca — isola delle Baleari e Riserva della Biosfera, con appuntamenti come HORECA Baleares Menorca, la Fira del Camp di Alaior e Arrels — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del mare."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands op Menorca — een Balearen-eiland en Biosfeerreservaat, met evenementen zoals HORECA Baleares Menorca, de Fira del Camp in Alaior en Arrels — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, zelfs aan de overkant van de zee."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在梅诺卡为展会设计并搭建展台——这座巴利阿里群岛之一，也是生物圈保护区，举办 HORECA Baleares Menorca、阿莱奥尔的 Fira del Camp 和 Arrels 等展会——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便远隔重洋。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte मेनोर्का में स्टैंड डिज़ाइन और स्थापित करता है — यह एक बालियारिक द्वीप और बायोस्फीयर रिज़र्व है, जहाँ HORECA Baleares Menorca, अलाइओर की Fira del Camp और Arrels जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को समुद्र के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 메노르카에서 전시회 부스를 디자인하고 시공합니다. 이곳은 HORECA Baleares Menorca, 알라이오르의 Fira del Camp, Arrels 등이 열리는 발레아레스 제도이자 생물권 보전지역으로, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 바다 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはメノルカで展示会ブースの設計・施工を行います。ここはHORECA Baleares Menorca、アライオールのFira del Camp、Arrelsなどが開催されるバレアレス諸島の島であり生物圏保存地域で、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "ibiza": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Ibiza —isla balear de proyección internacional, con citas como HORECA Baleares Ibiza, la Fira de la Mar y la Feria de Stocks— controlando cada fase: diseño 3D, fabricación, logística en barco, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional, incluso al otro lado del mar."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Ibiza —a Balearic island with international reach, with events such as HORECA Baleares Ibiza, the Fira de la Mar and the Stocks Fair— controlling every phase: 3D design, production, sea logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail, even across the sea."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände auf Ibiza — einer international ausstrahlenden Baleareninsel, mit Veranstaltungen wie HORECA Baleares Ibiza, der Fira de la Mar und der Stocks-Messe — und kontrolliert jede Phase: 3D-Design, Produktion, Seelogistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit, auch über das Meer hinweg."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Ibiza — ilha balear de projeção internacional, com certames como a HORECA Baleares Ibiza, a Fira de la Mar e a Feira de Stocks — controlando cada fase: design 3D, fabrico, logística por barco, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes, mesmo do outro lado do mar."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Ibiza — île des Baléares à rayonnement international, avec des rendez-vous comme HORECA Baleares Ibiza, la Fira de la Mar et le Salon des Stocks — en maîtrisant chaque phase : conception 3D, fabrication, logistique par bateau, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails, même de l'autre côté de la mer."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Ibiza — isola delle Baleari di proiezione internazionale, con appuntamenti come HORECA Baleares Ibiza, la Fira de la Mar e la Fiera degli Stock — controllando ogni fase: progettazione 3D, produzione, logistica via nave, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli, anche dall'altra parte del mare."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands op Ibiza — een Balearen-eiland met internationale uitstraling, met evenementen zoals HORECA Baleares Ibiza, de Fira de la Mar en de Stocks-beurs — met volledige controle over elke fase: 3D-ontwerp, productie, zeelogistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail, zelfs aan de overkant van de zee."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在伊维萨为展会设计并搭建展台——这座具有国际影响力的巴利阿里群岛之一，举办 HORECA Baleares Ibiza、Fira de la Mar 和库存特卖会等展会——全程掌控每个环节：3D设计、制造、海运物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控，即便远隔重洋。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte इबीसा में स्टैंड डिज़ाइन और स्थापित करता है — यह अंतर्राष्ट्रीय पहुँच वाला बालियारिक द्वीप है, जहाँ HORECA Baleares Ibiza, Fira de la Mar और स्टॉक मेला जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, समुद्री लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को समुद्र के उस पार भी बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 이비사에서 전시회 부스를 디자인하고 시공합니다. 이곳은 HORECA Baleares Ibiza, Fira de la Mar, 스톡 박람회 등이 열리는 국제적 위상의 발레아레스 제도로, 3D 디자인, 제작, 해상 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 바다 건너에서도 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはイビサで展示会ブースの設計・施工を行います。ここはHORECA Baleares Ibiza、Fira de la Mar、ストックフェアなどが開催される国際的な知名度を誇るバレアレス諸島の島で、3D設計、製作、海上物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、海を越えても想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "regua": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Peso da Régua —corazón del Douro portugués y del vino de Oporto, con citas como el Douro & Porto Wine Festival, la Feira dos Vinhos e Sabores dos Altos y la Festa dos Saberes e Sabores do Douro— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a bodegas, agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Peso da Régua —the heart of the Portuguese Douro and Port wine, with events such as the Douro & Porto Wine Festival, the Feira dos Vinhos e Sabores dos Altos and the Festa dos Saberes e Sabores do Douro— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer wineries, agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Peso da Régua — dem Herzen des portugiesischen Douro und des Portweins, mit Veranstaltungen wie dem Douro & Porto Wine Festival, der Feira dos Vinhos e Sabores dos Altos und der Festa dos Saberes e Sabores do Douro — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Weingütern, Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands no Peso da Régua — coração do Douro e do vinho do Porto, com certames como o Douro & Porto Wine Festival, a Feira dos Vinhos e Sabores dos Altos e a Festa dos Saberes e Sabores do Douro — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a adegas, agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Peso da Régua — cœur du Douro portugais et du vin de Porto, avec des rendez-vous comme le Douro & Porto Wine Festival, la Feira dos Vinhos e Sabores dos Altos et la Festa dos Saberes e Sabores do Douro — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux caves, aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Peso da Régua — cuore del Douro portoghese e del vino di Porto, con appuntamenti come il Douro & Porto Wine Festival, la Feira dos Vinhos e Sabores dos Altos e la Festa dos Saberes e Sabores do Douro — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo a cantine, agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Peso da Régua — het hart van de Portugese Douro en de portwijn, met evenementen zoals het Douro & Porto Wine Festival, de Feira dos Vinhos e Sabores dos Altos en de Festa dos Saberes e Sabores do Douro — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden wijnhuizen, agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在佩索达雷瓜为展会设计并搭建展台——这里是葡萄牙杜罗河（Douro）与波特酒的核心地带，举办 Douro & Porto Wine Festival、Feira dos Vinhos e Sabores dos Altos 和 Festa dos Saberes e Sabores do Douro 等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为酒庄、代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पेसो दा रेगुआ में स्टैंड डिज़ाइन और स्थापित करता है — यह पुर्तगाली Douro और पोर्ट वाइन का हृदय है, जहाँ Douro & Porto Wine Festival, Feira dos Vinhos e Sabores dos Altos और Festa dos Saberes e Sabores do Douro जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम वाइनरी, एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 페소 다 레구아에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Douro & Porto Wine Festival, Feira dos Vinhos e Sabores dos Altos, Festa dos Saberes e Sabores do Douro 등이 열리는 포르투갈 도루(Douro)와 포트와인의 중심지로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "와이너리, 에이전시, 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはペーゾ・ダ・レグアで展示会ブースの設計・施工を行います。ここはDouro & Porto Wine Festival、Feira dos Vinhos e Sabores dos Altos、Festa dos Saberes e Sabores do Douroなどが開催されるポルトガルのドウロ（Douro）とポートワインの中心地で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "ワイナリーにも代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "aranda": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Aranda de Duero —capital de la Ribera del Duero, con citas como Espacio Ribera, los Premios Envero / EnveroFest y el Congreso La Cierna— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a bodegas, agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Aranda de Duero —capital of the Ribera del Duero wine region, with events such as Espacio Ribera, the Premios Envero / EnveroFest and the La Cierna Congress— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer wineries, agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Aranda de Duero — Hauptstadt des Weinbaugebiets Ribera del Duero, mit Veranstaltungen wie Espacio Ribera, den Premios Envero / EnveroFest und dem Kongress La Cierna — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Weingütern, Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Aranda de Duero — capital da Ribera del Duero, com certames como o Espacio Ribera, os Premios Envero / EnveroFest e o Congresso La Cierna — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a adegas, agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Aranda de Duero — capitale de la Ribera del Duero, avec des rendez-vous comme Espacio Ribera, les Premios Envero / EnveroFest et le Congrès La Cierna — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux caves, aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Aranda de Duero — capitale della Ribera del Duero, con appuntamenti come Espacio Ribera, i Premios Envero / EnveroFest e il Congresso La Cierna — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo a cantine, agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Aranda de Duero — hoofdstad van het wijngebied Ribera del Duero, met evenementen zoals Espacio Ribera, de Premios Envero / EnveroFest en het La Cierna-congres — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden wijnhuizen, agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在阿兰达·德杜罗为展会设计并搭建展台——这里是杜罗河岸（Ribera del Duero）产区的首府，举办 Espacio Ribera、Premios Envero / EnveroFest 和 La Cierna 大会等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为酒庄、代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte आरंदा दे दुएरो में स्टैंड डिज़ाइन और स्थापित करता है — यह Ribera del Duero वाइन क्षेत्र की राजधानी है, जहाँ Espacio Ribera, Premios Envero / EnveroFest और La Cierna कांग्रेस जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम वाइनरी, एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 아란다 데 두에로에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Espacio Ribera, Premios Envero / EnveroFest, La Cierna 콩그레스 등이 열리는 리베라 델 두에로(Ribera del Duero) 와인 산지의 주도로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "와이너리, 에이전시, 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはアランダ・デ・ドゥエロで展示会ブースの設計・施工を行います。ここはEspacio Ribera、Premios Envero / EnveroFest、La Cierna会議などが開催されるリベラ・デル・ドゥエロ（Ribera del Duero）ワイン産地の中心地で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "ワイナリーにも代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "vitoria": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Vitoria-Gasteiz —capital de Álava y del País Vasco, con citas como Ardoaraba, AVANZA (Feria de FP de Álava) y la Feria de Stocks— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Vitoria-Gasteiz —capital of Álava and of the Basque Country, with events such as Ardoaraba, AVANZA (the Álava Vocational Training Fair) and the Stocks Fair— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Vitoria-Gasteiz — Hauptstadt von Álava und des Baskenlands, mit Veranstaltungen wie Ardoaraba, AVANZA (Berufsbildungsmesse von Álava) und der Stocks-Messe — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Vitoria-Gasteiz — capital de Álava e do País Basco, com certames como a Ardoaraba, a AVANZA (Feira de FP de Álava) e a Feira de Stocks — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Vitoria-Gasteiz — capitale d'Álava et du Pays basque, avec des rendez-vous comme Ardoaraba, AVANZA (Salon de la formation professionnelle d'Álava) et le Salon des Stocks — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Vitoria-Gasteiz — capoluogo dell'Álava e dei Paesi Baschi, con appuntamenti come Ardoaraba, AVANZA (Fiera della Formazione Professionale dell'Álava) e la Fiera degli Stock — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Vitoria-Gasteiz — hoofdstad van Álava en van Baskenland, met evenementen zoals Ardoaraba, AVANZA (de mbo-beurs van Álava) en de Stocks-beurs — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在维多利亚（Vitoria-Gasteiz）为展会设计并搭建展台——这里是阿拉瓦（Álava）和巴斯克地区的首府，举办 Ardoaraba、AVANZA（阿拉瓦职业教育展）和库存特卖会等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte विटोरिया-गास्तेइज़ में स्टैंड डिज़ाइन और स्थापित करता है — यह Álava और बास्क देश की राजधानी है, जहाँ Ardoaraba, AVANZA (Álava का व्यावसायिक प्रशिक्षण मेला) और स्टॉक मेला जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 비토리아-가스테이스에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Ardoaraba, AVANZA(알라바 직업교육 박람회), 스톡 박람회 등이 열리는 알라바(Álava)와 바스크 지방의 주도로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはビトリア＝ガステイスで展示会ブースの設計・施工を行います。ここはArdoaraba、AVANZA（アラバの職業訓練見本市）、ストックフェアなどが開催されるアラバ県およびバスク州の州都で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "pamplona": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Pamplona —capital de Navarra, con citas como NAVARTUR, EDIFICA y la Feria Internacional de Turismo Reyno de Navarra— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Pamplona —capital of Navarre, with events such as NAVARTUR, EDIFICA and the Reyno de Navarra International Tourism Fair— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Pamplona — Hauptstadt von Navarra, mit Veranstaltungen wie NAVARTUR, EDIFICA und der Internationalen Tourismusmesse Reyno de Navarra — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Pamplona — capital de Navarra, com certames como a NAVARTUR, a EDIFICA e a Feira Internacional de Turismo Reyno de Navarra — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Pampelune — capitale de la Navarre, avec des rendez-vous comme NAVARTUR, EDIFICA et le Salon international du tourisme Reyno de Navarra — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Pamplona — capoluogo della Navarra, con appuntamenti come NAVARTUR, EDIFICA e la Fiera Internazionale del Turismo Reyno de Navarra — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Pamplona — hoofdstad van Navarra, met evenementen zoals NAVARTUR, EDIFICA en de Internationale Toerismebeurs Reyno de Navarra — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在潘普洛纳为展会设计并搭建展台——这里是纳瓦拉（Navarra）首府，举办 NAVARTUR、EDIFICA 和纳瓦拉王国国际旅游展等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte पाम्प्लोना में स्टैंड डिज़ाइन और स्थापित करता है — यह Navarra की राजधानी है, जहाँ NAVARTUR, EDIFICA और Reyno de Navarra अंतर्राष्ट्रीय पर्यटन मेला जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 팜플로나에서 전시회 부스를 디자인하고 시공합니다. 이곳은 NAVARTUR, EDIFICA, 레이노 데 나바라 국제 관광 박람회 등이 열리는 나바라(Navarra)의 주도로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはパンプローナで展示会ブースの設計・施工を行います。ここはNAVARTUR、EDIFICA、レイノ・デ・ナバラ国際観光見本市などが開催されるナバラ州の州都で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "logrono": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Logroño —capital de La Rioja, con citas como Rioja Wine Trade Mission, Planeta Rioja y la Feria del Vehículo de Ocasión— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Logroño —capital of La Rioja, with events such as the Rioja Wine Trade Mission, Planeta Rioja and the Used Vehicle Fair— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Logroño — Hauptstadt von La Rioja, mit Veranstaltungen wie Rioja Wine Trade Mission, Planeta Rioja und der Gebrauchtwagenmesse — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Logroño — capital de La Rioja, com certames como a Rioja Wine Trade Mission, a Planeta Rioja e a Feira do Veículo Usado — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Logroño — capitale de La Rioja, avec des rendez-vous comme la Rioja Wine Trade Mission, Planeta Rioja et le Salon du Véhicule d'Occasion — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Logroño — capoluogo di La Rioja, con appuntamenti come Rioja Wine Trade Mission, Planeta Rioja e la Fiera del Veicolo Usato — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Logroño — hoofdstad van La Rioja, met evenementen zoals de Rioja Wine Trade Mission, Planeta Rioja en de Beurs voor Tweedehandsvoertuigen — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在洛格罗尼奥为展会设计并搭建展台——这里是拉里奥哈（La Rioja）首府，举办 Rioja Wine Trade Mission、Planeta Rioja 和二手车展等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte लोग्रोन्यो में स्टैंड डिज़ाइन और स्थापित करता है — यह La Rioja की राजधानी है, जहाँ Rioja Wine Trade Mission, Planeta Rioja और पुराने वाहन मेले जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 로그로뇨에서 전시회 부스를 디자인하고 시공합니다. 이곳은 Rioja Wine Trade Mission, Planeta Rioja, 중고차 박람회 등이 열리는 라리오하(La Rioja)의 주도로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはログローニョで展示会ブースの設計・施工を行います。ここはRioja Wine Trade Mission、Planeta Rioja、中古車見本市などが開催されるラ・リオハ州の州都で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "irun": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Irún —sede de Ficoba, el recinto ferial de Gipuzkoa, con citas como MUBIL Mobility Expo, Go Mobility, Bioterra y UNIRE— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Irún —home to Ficoba, the Gipuzkoa exhibition centre, with events such as MUBIL Mobility Expo, Go Mobility, Bioterra and UNIRE— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Irún — Standort von Ficoba, dem Messegelände von Gipuzkoa, mit Veranstaltungen wie MUBIL Mobility Expo, Go Mobility, Bioterra und UNIRE — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Irún — sede da Ficoba, o recinto de feiras de Gipuzkoa, com certames como a MUBIL Mobility Expo, a Go Mobility, a Bioterra e a UNIRE — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Irún — siège de Ficoba, le parc des expositions du Gipuzkoa, avec des rendez-vous comme MUBIL Mobility Expo, Go Mobility, Bioterra et UNIRE — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Irún — sede di Ficoba, il quartiere fieristico di Gipuzkoa, con appuntamenti come MUBIL Mobility Expo, Go Mobility, Bioterra e UNIRE — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Irún — locatie van Ficoba, het beurscomplex van Gipuzkoa, met evenementen zoals MUBIL Mobility Expo, Go Mobility, Bioterra en UNIRE — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20年在自有工厂打造临时建筑的经验，Standarte 在伊伦为展会设计并搭建展台——这里是吉普斯夸展览中心 Ficoba 的所在地，举办 MUBIL Mobility Expo、Go Mobility、Bioterra 和 UNIRE 等展会——全程掌控每个环节：3D设计、制造、物流、安装以及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，以及对细节的卓越把控。"
    },
    "hi": {
      "intro": "अपनी ही कार्यशाला से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte इरुन में स्टैंड डिज़ाइन और स्थापित करता है — यह गिपुज़कोआ के प्रदर्शनी केंद्र Ficoba का स्थान है, जहाँ MUBIL Mobility Expo, Go Mobility, Bioterra और UNIRE जैसे आयोजन होते हैं — हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 이룬에서 전시회 부스를 디자인하고 시공합니다. 이곳은 MUBIL Mobility Expo, Go Mobility, Bioterra, UNIRE 등이 열리는 기푸스코아 전시장 Ficoba의 소재지로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 공정을 자체적으로 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはイルンで展示会ブースの設計・施工を行います。ここはMUBIL Mobility Expo、Go Mobility、Bioterra、UNIREなどが開催されるギプスコアの見本市会場Ficobaの本拠地で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "santander": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Santander —sede del Palacio de Exposiciones y Congresos, con citas como ARTESANTANDER y BioCantabria— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Santander —home to the Palacio de Exposiciones y Congresos, with events such as ARTESANTANDER and BioCantabria— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Santander — Standort des Palacio de Exposiciones y Congresos, mit Veranstaltungen wie ARTESANTANDER und BioCantabria — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Santander — sede do Palacio de Exposiciones y Congresos, com certames como a ARTESANTANDER e a BioCantabria — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Santander — siège du Palacio de Exposiciones y Congresos, avec des rendez-vous comme ARTESANTANDER et BioCantabria — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Santander — sede del Palacio de Exposiciones y Congresos, con appuntamenti come ARTESANTANDER e BioCantabria — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Santander — locatie van het Palacio de Exposiciones y Congresos, met evenementen zoals ARTESANTANDER en BioCantabria — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在桑坦德设计并搭建展台——这里是会展与会议宫（Palacio de Exposiciones y Congresos）所在地，举办 ARTESANTANDER 和 BioCantabria 等展会——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障和卓越的细节把控。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला से अस्थायी वास्तुकला निर्माण के 20 वर्षों के अनुभव के साथ, Standarte सांतान्देर में स्टैंड डिज़ाइन और असेंबल करता है — यह Palacio de Exposiciones y Congresos का घर है, जहाँ ARTESANTANDER और BioCantabria जैसे आयोजन होते हैं — और हर चरण को नियंत्रित करता है: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली की मानसिक शांति और असाधारण बारीकी प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로 Standarte는 산탄데르에서 부스를 디자인하고 시공합니다 — 이곳은 ARTESANTANDER와 BioCantabria 같은 행사가 열리는 Palacio de Exposiciones y Congresos의 본거지로, 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはサンタンデールで展示会ブースの設計・施工を行います。ここはARTESANTANDERやBioCantabriaなどが開催されるPalacio de Exposiciones y Congresosの本拠地で、3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "girona": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Girona —sede de Fira de Girona, en el Palau de Fires, con citas de referencia como el Fòrum Gastronòmic— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Girona —home to Fira de Girona, at the Palau de Fires, with flagship events such as the Fòrum Gastronòmic— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Girona — Standort der Fira de Girona im Palau de Fires, mit Leitveranstaltungen wie dem Fòrum Gastronòmic — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Girona — sede da Fira de Girona, no Palau de Fires, com certames de referência como o Fòrum Gastronòmic — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Gérone — siège de la Fira de Girona, au Palau de Fires, avec des rendez-vous de référence comme le Fòrum Gastronòmic — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Girona — sede della Fira de Girona, al Palau de Fires, con appuntamenti di riferimento come il Fòrum Gastronòmic — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Girona — locatie van Fira de Girona, in het Palau de Fires, met toonaangevende evenementen zoals het Fòrum Gastronòmic — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在赫罗纳设计并搭建展台——这里是赫罗纳展览中心（Fira de Girona）所在地，位于 Palau de Fires 展馆，拥有 Fòrum Gastronòmic 等标杆展会——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障和卓越的细节把控。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला से अस्थायी वास्तुकला निर्माण के 20 वर्षों के अनुभव के साथ, Standarte जिरोना में स्टैंड डिज़ाइन और असेंबल करता है — यह Palau de Fires में स्थित Fira de Girona का घर है, जहाँ Fòrum Gastronòmic जैसे प्रमुख आयोजन होते हैं — और हर चरण को नियंत्रित करता है: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली की मानसिक शांति और असाधारण बारीकी प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로 Standarte는 지로나에서 부스를 디자인하고 시공합니다 — 이곳은 Palau de Fires에 자리한 Fira de Girona의 본거지로, Fòrum Gastronòmic 같은 대표 행사가 열립니다 — 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、StandarteはジローナのPalau de FiresにあるFira de Gironaで展示会ブースの設計・施工を行います。ここではFòrum Gastronòmicなどの主要見本市が開催されます。3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "lleida": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Lleida —sede de Fira de Lleida, en los pabellones de los Camps Elisis, con citas de referencia como Municipàlia y la Fira de Sant Miquel— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Lleida —home to Fira de Lleida, in the Camps Elisis pavilions, with flagship events such as Municipàlia and Fira de Sant Miquel— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Lleida — Standort der Fira de Lleida in den Pavillons der Camps Elisis, mit Leitmessen wie Municipàlia und der Fira de Sant Miquel — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Lleida — sede da Fira de Lleida, nos pavilhões dos Camps Elisis, com certames de referência como a Municipàlia e a Fira de Sant Miquel — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Lleida — siège de la Fira de Lleida, dans les pavillons des Camps Elisis, avec des rendez-vous de référence comme Municipàlia et la Fira de Sant Miquel — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Lleida — sede della Fira de Lleida, nei padiglioni dei Camps Elisis, con appuntamenti di riferimento come Municipàlia e la Fira de Sant Miquel — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Lleida — locatie van Fira de Lleida, in de paviljoens van de Camps Elisis, met toonaangevende evenementen zoals Municipàlia en de Fira de Sant Miquel — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在莱里达设计并搭建展台——这里是莱里达展览中心（Fira de Lleida）所在地，位于 Camps Elisis 展馆群，拥有 Municipàlia 和 Fira de Sant Miquel 等标杆展会——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障和卓越的细节把控。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला से अस्थायी वास्तुकला निर्माण के 20 वर्षों के अनुभव के साथ, Standarte ल्येइदा में स्टैंड डिज़ाइन और असेंबल करता है — यह Fira de Lleida का घर है, Camps Elisis पवेलियन में, जहाँ Municipàlia और Fira de Sant Miquel जैसे प्रमुख आयोजन होते हैं — और हर चरण को नियंत्रित करता है: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली की मानसिक शांति और असाधारण बारीकी प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로 Standarte는 예이다에서 부스를 디자인하고 시공합니다 — 이곳은 Camps Elisis 전시관에 자리한 Fira de Lleida의 본거지로, Municipàlia와 Fira de Sant Miquel 같은 대표 행사가 열립니다 — 3D 디자인, 제작, 물류, 설치, 현장 검수까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가 업체에 예상치 못한 문제가 없는 시공과 탁월한 디테일 관리를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験をもとに、Standarteはリェイダで展示会ブースの設計・施工を行います。ここはCamps ElisisパビリオンにあるFira de Lleidaの本拠地で、MunicipàliaやFira de Sant Miquelといった主要見本市が開催されます。3D設計、製作、物流、設営、会場での検収まで、すべての工程を自社で管理します。",
      "detail": "代理店にも出展者にも、想定外のない設営と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "batalha": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Batalha —sede del Exposalão, gran recinto del centro de Portugal junto al clúster de moldes y plásticos de Marinha Grande— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Batalha —home to Exposalão, a major venue in central Portugal next to the Marinha Grande moulds and plastics cluster— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Batalha — Standort des Exposalão, eines großen Messegeländes in Zentralportugal nahe dem Formen- und Kunststoffcluster von Marinha Grande — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands na Batalha — sede do Exposalão, grande recinto do centro de Portugal junto ao cluster de moldes e plásticos da Marinha Grande — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Batalha — siège de l'Exposalão, grand parc des expositions du centre du Portugal près du cluster de moules et plastiques de Marinha Grande — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Batalha — sede dell'Exposalão, grande quartiere fieristico del centro del Portogallo accanto al cluster di stampi e materie plastiche di Marinha Grande — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Batalha — thuisbasis van Exposalão, een groot beurscomplex in centraal Portugal naast het matrijzen- en kunststofcluster van Marinha Grande — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在巴塔利亚设计并搭建展台——这里是 Exposalão 的所在地，是葡萄牙中部的重要展览中心，毗邻 Marinha Grande 模具与塑料产业集群——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte बाताल्हा में स्टैंड डिज़ाइन और असेंबली करता है—Exposalão का घर, मध्य पुर्तगाल का एक प्रमुख प्रदर्शनी स्थल, जो Marinha Grande के मोल्ड और प्लास्टिक क्लस्टर के निकट है—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 Marinha Grande 금형·플라스틱 클러스터 인근에 위치한 포르투갈 중부의 주요 전시장 Exposalão가 있는 바탈랴에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、StandarteはMarinha Grandeの金型・プラスチック産業クラスターに隣接するポルトガル中部の主要会場Exposalãoを擁するバターリャで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "lisboa": {
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはリスボンの展示ブースを、設計・製作・物流・設営、そして会場での最終検査まで各工程を完全に管理して開発します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    },
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte desarrolla stands en Lisboa garantizando control total sobre cada fase: diseño, fabricación, logística, instalación y validaciones finales en el recinto.",
      "detail": "Ofrecemos a agencias y expositores directos la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte develops exhibition stands in Lisbon guaranteeing total control over each phase: design, production, logistics, installation, and final validations on-site.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung in der temporären Architektur, realisiert in unserer eigenen Werkstatt, entwickelt Standarte Messestände in Lissabon und garantiert volle Kontrolle über jede Phase: Design, Produktion, Logistik, Montage und Endabnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte desenvolve stands em Lisboa garantindo o controlo total sobre cada fase: design, fabrico, logística, instalação e validações finais no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Avec 20 ans d'expérience dans l'architecture éphémère depuis notre propre atelier, Standarte développe des stands d'exposition à Lisbonne en garantissant un contrôle total : conception, fabrication, logistique, installation et validations.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte sviluppa stand a Lisbona garantendo il controllo totale su ogni fase: progettazione, produzione, logistica, installazione e collaudi.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "zh": {
      "intro": "凭借在我们自己的工厂搭建临时建筑的 20 年经验，Standarte 在里斯本开发展览摊位，保证对每个阶段的全面控制：设计，生产，物流，安装和现场最终验证。",
      "detail": "我们为机构和直接参展商提供无意外的装配安全感以及对细节的卓越关注。"
    },
    "hi": {
      "intro": "हमारे अपने कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, स्टैंडार्ट लिस्बन में प्रदर्शनी स्टैंड विकसित करता है जो प्रत्येक चरण पर कुल नियंत्रण की गारंटी देता है: डिजाइन, उत्पादन, रसद, स्थापना, और ऑन-साइट अंतिम सत्यापन।",
      "detail": "हम एजेंसियों और प्रत्यक्ष प्रदर्शकों को बिना किसी आश्चर्य और असाधारण ध्यान के विधानसभा की मन की शांति प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 지은 20년의 경험을 바탕으로 Standarte는 리스본에 전시 부스를 개발하여 설계, 생산, 물류, 설치 및 현장 최종 검증 등 각 단계에 대한 완벽한 통제를 보장합니다.",
      "detail": "우리는 대행사와 직접 전시자에게 놀라움 없는 조립의 평화로움과 세부 사항에 대한 탁월한 주의를 제공합니다."
    }
  },
  "bilbao": {
    "ja": {
      "intro": "ビルバオ展示センター（BEC）は最も革新的な会場のひとつです。当社の物流ネットワーク、20年の経験、大規模な自社工房により、BIEMHをはじめとする主要展示会で完璧なオーダーメイドブースの設営を保証します。",
      "detail": ""
    },
    "es": {
      "intro": "Bilbao Exhibition Centre (BEC) es uno de los recintos más innovadores. Gracias a nuestra red logística, 20 años de experiencia y un gran taller propio, garantizamos montajes de stands de diseño impecable para ferias líderes como BIEMH.",
      "detail": ""
    },
    "en": {
      "intro": "Bilbao Exhibition Centre (BEC) is one of the most innovative venues. Thanks to our logistics network, 20 years of experience, and a large own workshop, we guarantee flawless custom stand assembly for leading fairs like BIEMH.",
      "detail": ""
    },
    "de": {
      "intro": "Das Bilbao Exhibition Centre (BEC) ist einer der innovativsten Veranstaltungsorte. Dank unseres Logistiknetzwerks, 20 Jahren Erfahrung und einer großen eigenen Werkstatt garantieren wir tadellose Messestandmontagen für Leitmessen wie die BIEMH.",
      "detail": ""
    },
    "pt": {
      "intro": "O Bilbao Exhibition Centre (BEC) é um dos recintos mais inovadores. Graças à nossa rede logística, 20 anos de experiência e uma grande oficina própria, garantimos a montagem de stands de design impecável para feiras líderes como a BIEMH.",
      "detail": ""
    },
    "fr": {
      "intro": "Le Bilbao Exhibition Centre (BEC) est l'un des lieux les plus innovants. Grâce à notre réseau logistique, 20 ans d'expérience et un grand atelier propre, nous garantissons des montages de stands impeccables pour des salons majeurs comme BIEMH.",
      "detail": ""
    },
    "it": {
      "intro": "Il Bilbao Exhibition Centre (BEC) è uno dei poli espositivi più innovativi. Grazie alla nostra rete logistica, a 20 anni di esperienza e a un grande laboratorio di proprietà, garantiamo l'allestimento di stand dal design impeccabile per fiere leader come BIEMH.",
      "detail": ""
    },
    "zh": {
      "intro": "毕尔巴鄂展览中心 (BEC) 是最具创新性的场馆之一。凭借我们的物流网络、20 年的经验和自有大型工厂，我们为 BIEMH 等领先的展览会提供完美的定制展台搭建。",
      "detail": ""
    },
    "hi": {
      "intro": "बिलबाओ प्रदर्शनी केंद्र (BEC) सबसे नवीन स्थानों में से एक है। हमारे रसद नेटवर्क, 20 वर्षों के अनुभव और एक बड़े अपने कारखाने के लिए धन्यवाद, हम BIEMH जैसे प्रमुख मेलों के लिए निर्दोष कस्टम स्टैंड असेंबली की गारंटी देते हैं।",
      "detail": ""
    },
    "ko": {
      "intro": "빌바오 전시 센터(BEC)는 가장 혁신적인 장소 중 하나입니다. 당사의 물류 네트워크, 20년의 경험 및 대규모 자체 공장 덕분에 당사는 BIEMH와 같은 주요 박람회에 완벽한 맞춤형 부스 조립을 보장합니다.",
      "detail": ""
    }
  },
  "barcelona": {
    "ja": {
      "intro": "MWCやISEといった世界的イベントの開催地であるバルセロナは、卓越した製作水準が求められます。Standarteは20年の経験と自社工房を活かし、フィラ・デ・バルセロナでインパクトの高いブースを設計・製作・設営します。",
      "detail": ""
    },
    "es": {
      "intro": "Como sede de eventos mundiales como el MWC o ISE, Barcelona exige un nivel de producción sobresaliente. En Standarte, con 20 años de experiencia y taller propio, diseñamos y montamos stands de alto impacto en Fira de Barcelona.",
      "detail": ""
    },
    "en": {
      "intro": "As the venue for global events like MWC and ISE, Barcelona demands outstanding production levels. At Standarte, with 20 years of experience and our own workshop, we design, manufacture, and assemble high-impact stands at Fira de Barcelona.",
      "detail": ""
    },
    "de": {
      "intro": "Als Austragungsort globaler Events wie MWC und ISE erfordert Barcelona herausragende Produktionsstandards. Bei Standarte entwerfen, fertigen und montieren wir mit 20 Jahren Erfahrung und eigener Werkstatt wirkungsvolle Messestände in der Fira de Barcelona.",
      "detail": ""
    },
    "pt": {
      "intro": "Como sede de eventos globais como o MWC ou ISE, Barcelona exige um nível de produção excecional. Na Standarte, com 20 anos de experiência e oficina própria, desenhamos, fabricamos e montamos stands de grande impacto na Fira de Barcelona.",
      "detail": ""
    },
    "fr": {
      "intro": "En tant qu'hôte d'événements mondiaux comme le MWC ou l'ISE, Barcelone exige un niveau de production exceptionnel. Chez Standarte, avec 20 ans d'expérience et notre propre atelier, nous concevons, fabriquons et montons des stands à fort impact à la Fira de Barcelona.",
      "detail": ""
    },
    "it": {
      "intro": "In quanto sede di eventi globali come MWC o ISE, Barcellona richiede un livello di produzione eccezionale. In Standarte, con 20 anni di esperienza e un laboratorio di proprietà, progettiamo, produciamo e montiamo stand di grande impatto presso la Fira de Barcelona.",
      "detail": ""
    },
    "zh": {
      "intro": "作为 MWC 和 ISE 等全球赛事的举办地，巴塞罗那需要出色的制作水平。在 Standarte，凭借 20 年的经验和自己的工厂，我们在巴塞罗那会展中心设计、制造和组装具有高影响力的展台。",
      "detail": ""
    },
    "hi": {
      "intro": "MWC और ISE जैसे वैश्विक आयोजनों के स्थल के रूप में, बार्सिलोना को उत्कृष्ट उत्पादन स्तर की आवश्यकता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के साथ, हम फिरा डी बार्सिलोना में उच्च प्रभाव वाले स्टैंड डिजाइन, निर्माण और इकट्ठा करते हैं।",
      "detail": ""
    },
    "ko": {
      "intro": "MWC 및 ISE와 같은 글로벌 이벤트의 개최지로서 바르셀로나는 뛰어난 생산 수준을 요구합니다. Standarte에서는 20년의 경험과 자체 공장을 바탕으로 Fira de Barcelona에서 큰 영향을 미치는 부스를 설계, 제조 및 조립합니다.",
      "detail": ""
    }
  },
  "madrid": {
    "ja": {
      "intro": "マドリードはスペインの展示会活動の中核を担う都市です。Standarteは20年の経験と自社工房を強みに、技術設計・製作・物流・設営・各種検査、そして開催前の現地コーディネーションまで、一貫した万全のプロセスでマドリードの展示ブースを手がけます。",
      "detail": ""
    },
    "es": {
      "intro": "Madrid concentra una parte esencial de la actividad ferial en España. En Standarte desarrollamos stands en Madrid con 20 años de experiencia y un taller propio que garantiza un proceso impecable: diseño técnico, producción, logística, montaje, validaciones y coordinación in situ antes de la apertura del evento.",
      "detail": ""
    },
    "en": {
      "intro": "Madrid concentrates an essential part of trade fair activity in Spain. At Standarte, backed by 20 years of experience and our own workshop, we develop exhibition stands in Madrid through a complete process: technical design, production, logistics, installation, validation, and on-site coordination before the event opens.",
      "detail": "This service is aimed at communication agencies and brands that need reliable execution, careful finishes, and a stand ready for professional visitors."
    },
    "de": {
      "intro": "Madrid konzentriert einen wesentlichen Teil der Messeaktivitäten in Spanien. Bei Standarte, gestützt auf 20 Jahre Erfahrung und unsere eigene Werkstatt, realisieren wir Messestände in Madrid mit einem vollständigen Ablauf: technisches Design, Produktion, Logistik, Montage, Validierung und Koordination vor Ort.",
      "detail": "Dieser Service richtet sich an Kommunikationsagenturen und Marken, die eine zuverlässige Ausführung, sorgfältige Oberflächen und einen professionell vorbereiteten Stand benötigen."
    },
    "pt": {
      "intro": "Madrid concentra uma parte essencial da atividade em feiras de Espanha. Na Standarte, apoiados nos nossos 20 anos de experiência e oficina própria, desenvolvemos stands de exposição em Madrid através de um processo completo: design técnico, produção, logística, instalação, validação e coordenação no local.",
      "detail": "Este serviço é direcionado a agências de comunicação e marcas que necessitam de execução fiável, acabamentos cuidadosos e um stand pronto para os visitantes profissionais."
    },
    "fr": {
      "intro": "Madrid concentre une part essentielle de l'activité des salons en Espagne. Chez Standarte, forts de 20 ans d'expérience et de notre propre atelier, nous développons des stands d'exposition à Madrid selon un processus complet : conception, production, logistique, installation, validation et coordination sur place.",
      "detail": "Ce service s'adresse aux agences de communication et aux marques ayant besoin d'une exécution fiable, de finitions soignées et d'un stand prêt pour les visiteurs professionnels."
    },
    "it": {
      "intro": "Madrid concentra una parte essenziale dell'attività fieristica in Spagna. In Standarte, forti dei nostri 20 anni di esperienza e del nostro laboratorio di proprietà, sviluppiamo stand a Madrid attraverso un processo completo: progettazione tecnica, produzione, logistica, montaggio, convalida e coordinamento in loco.",
      "detail": "Questo servizio è rivolto ad agenzie di comunicazione e marchi che necessitano di un'esecuzione affidabile, finiture curate e uno stand pronto per i visitatori professionali."
    },
    "zh": {
      "intro": "马德里集中了西班牙贸易展览活动的重要部分。在 Standarte，凭借 20 年的丰富经验和自己的工厂，我们通过完整的过程在马德里开发展览摊位：技术设计，生产，物流，安装，验证和活动开始前的现场协调。",
      "detail": "此服务针对需要可靠执行、精细外观和为专业访客准备好展台的通信机构和品牌。"
    },
    "hi": {
      "intro": "मैड्रिड स्पेन में व्यापार मेला गतिविधि का एक आवश्यक हिस्सा केंद्रित करता है। स्टैंडार्ट में, 20 वर्षों के अनुभव और हमारे अपने कारखाने के समर्थन से, हम मैड्रिड में एक पूरी प्रक्रिया के माध्यम से प्रदर्शनी स्टैंड विकसित करते हैं: तकनीकी डिजाइन, उत्पादन, रसद, स्थापना, सत्यापन, और घटना खुलने से पहले ऑन-साइट समन्वय।",
      "detail": "यह सेवा उन संचार एजेंसियों और ब्रांडों के लिए है जिन्हें विश्वसनीय निष्पादन, सावधानीपूर्वक परिष्करण और पेशेवर आगंतुकों के लिए तैयार स्टैंड की आवश्यकता है।"
    },
    "ko": {
      "intro": "마드리드는 스페인의 무역 박람회 활동의 핵심적인 부분을 집중시킵니다. Standarte에서는 20년의 경험과 자체 공장의 지원을 받아 완전한 과정을 통해 마드리드에 전시 부스를 개발합니다: 기술 디자인, 생산, 물류, 설치, 검증 및 이벤트 시작 전 현장 조정.",
      "detail": "이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 맞이할 준비가 된 부스가 필요한 커뮤니케이션 대행사와 브랜드를 대상으로 합니다."
    }
  },
  "portugal_sur": {
    "es": {
      "intro": "Standarte diseña y monta stands en el sur de Portugal (Alentejo y Algarve), en ferias como OVIBEJA, FATACIL o la Feira d'Aires, controlando el diseño 3D, la fabricación, la logística y la instalación con taller propio.",
      "detail": "Con 20 años de experiencia y un servicio llave en mano, cuidamos cada detalle para que agencias y expositores lleguen a la feria sin preocupaciones."
    },
    "en": {
      "intro": "Standarte designs and builds exhibition stands across southern Portugal (Alentejo and Algarve), at fairs such as OVIBEJA, FATACIL or the Feira d'Aires, handling 3D design, fabrication, logistics and installation from our own workshop.",
      "detail": "With 20 years of experience and a turnkey service, we take care of every detail so agencies and exhibitors arrive at the fair with nothing to worry about."
    },
    "de": {
      "intro": "Standarte gestaltet und baut Messestände im Süden Portugals (Alentejo und Algarve), auf Messen wie OVIBEJA, FATACIL oder der Feira d'Aires, und steuert 3D-Design, Fertigung, Logistik und Montage aus der eigenen Werkstatt.",
      "detail": "Mit 20 Jahren Erfahrung und einem schlüsselfertigen Service kümmern wir uns um jedes Detail, damit Agenturen und Aussteller sorgenfrei zur Messe kommen."
    },
    "pt": {
      "intro": "A Standarte concebe e monta stands no sul de Portugal (Alentejo e Algarve), em feiras como a OVIBEJA, a FATACIL ou a Feira d'Aires, controlando o design 3D, o fabrico, a logística e a instalação com oficina própria.",
      "detail": "Com 20 anos de experiência e um serviço chave na mão, cuidamos de cada detalhe para que agências e expositores cheguem à feira sem preocupações."
    },
    "fr": {
      "intro": "Standarte conçoit et monte des stands dans le sud du Portugal (Alentejo et Algarve), sur des salons comme OVIBEJA, FATACIL ou la Feira d'Aires, en maîtrisant la conception 3D, la fabrication, la logistique et l'installation grâce à son propre atelier.",
      "detail": "Avec 20 ans d'expérience et un service clé en main, nous soignons chaque détail pour que les agences et les exposants arrivent au salon en toute sérénité."
    },
    "it": {
      "intro": "Standarte progetta e monta stand nel sud del Portogallo (Alentejo e Algarve), in fiere come OVIBEJA, FATACIL o la Feira d'Aires, gestendo design 3D, produzione, logistica e installazione con officina propria.",
      "detail": "Con 20 anni di esperienza e un servizio chiavi in mano, curiamo ogni dettaglio affinché agenzie ed espositori arrivino in fiera senza pensieri."
    },
    "nl": {
      "intro": "Standarte ontwerpt en bouwt beursstands in het zuiden van Portugal (Alentejo en Algarve), op beurzen als OVIBEJA, FATACIL of de Feira d'Aires, met beheer van 3D-ontwerp, productie, logistiek en montage vanuit een eigen werkplaats.",
      "detail": "Met 20 jaar ervaring en een kant-en-klare service zorgen wij voor elk detail, zodat bureaus en exposanten zorgeloos op de beurs aankomen."
    },
    "zh": {
      "intro": "Standarte 在葡萄牙南部（阿连特茹和阿尔加维）设计并搭建展台，服务于 OVIBEJA、FATACIL 或 Feira d'Aires 等展会，凭借自有工坊把控 3D 设计、生产、物流与安装。",
      "detail": "凭借 20 年经验和一站式交钥匙服务，我们关注每一处细节，让代理商和参展商毫无后顾之忧地抵达展会。"
    },
    "hi": {
      "intro": "Standarte दक्षिणी पुर्तगाल (अलेंतेजो और अल्गार्वे) में OVIBEJA, FATACIL या Feira d'Aires जैसे मेलों के लिए स्टॉल डिज़ाइन और तैयार करता है, और अपनी कार्यशाला से 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स और स्थापना को संभालता है।",
      "detail": "20 साल के अनुभव और संपूर्ण टर्नकी सेवा के साथ, हम हर विवरण का ध्यान रखते हैं ताकि एजेंसियां और प्रदर्शक बिना किसी चिंता के मेले में पहुंचें।"
    },
    "ko": {
      "intro": "Standarte는 포르투갈 남부(알렌테주와 알가르브)에서 OVIBEJA, FATACIL, Feira d'Aires 같은 박람회를 위한 부스를 설계하고 설치하며, 자체 작업장에서 3D 디자인, 제작, 물류, 시공을 모두 관리합니다.",
      "detail": "20년의 경험과 턴키 서비스로 모든 디테일을 챙겨 에이전시와 참가업체가 걱정 없이 박람회에 도착할 수 있도록 합니다."
    },
    "ja": {
      "intro": "Standarteはポルトガル南部（アレンテージョとアルガルヴェ）で、OVIBEJA、FATACIL、Feira d'Airesなどの展示会向けにブースを設計・施工し、自社工房で3Dデザイン、製作、物流、設営を一貫して管理します。",
      "detail": "20年の経験とターンキーサービスで細部まで気を配り、代理店や出展者が安心して展示会に臨めるようにします。"
    }
  },
  "santiago": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Santiago de Compostela —capital de Galicia y gran plaza de congresos, ferias culturales y turismo del Camino, con la Cidade da Cultura de Galicia y el Palacio de Congresos e Exposicións de Galicia como recintos de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and assembles exhibition stands in Santiago de Compostela —the capital of Galicia and a major hub for congresses, cultural fairs and Camino de Santiago tourism, with the Cidade da Cultura de Galicia and the Palacio de Congresos e Exposicións de Galicia as its flagship venues— controlling every phase: 3D design, production, logistics, installation and on-site validations.",
      "detail": "We offer agencies and direct exhibitors the peace of mind of an assembly without surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus unserer eigenen Werkstatt entwirft und montiert Standarte Messestände in Santiago de Compostela — der Hauptstadt Galiciens und einem bedeutenden Zentrum für Kongresse, Kulturmessen und Pilgertourismus des Jakobswegs, mit der Cidade da Cultura de Galicia und dem Palacio de Congresos e Exposicións de Galicia als führenden Veranstaltungsorten — und kontrolliert jede Phase: 3D-Design, Produktion, Logistik, Montage und Abnahmen vor Ort.",
      "detail": "Wir bieten Agenturen und Direktausstellern die Sicherheit eines reibungslosen Aufbaus und herausragende Detailgenauigkeit."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte projeta e monta stands em Santiago de Compostela — capital da Galiza e grande polo de congressos, feiras culturais e turismo do Caminho, com a Cidade da Cultura de Galicia e o Palacio de Congresos e Exposicións de Galicia como recintos de referência — controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma excecional atenção aos detalhes."
    },
    "fr": {
      "intro": "Forte de 20 ans d'expérience dans l'architecture éphémère réalisée dans son propre atelier, Standarte conçoit et monte des stands à Saint-Jacques-de-Compostelle — capitale de la Galice et grand pôle de congrès, de salons culturels et de tourisme du Chemin de Saint-Jacques, avec la Cidade da Cultura de Galicia et le Palacio de Congresos e Exposicións de Galicia comme parcs des expositions de référence — en maîtrisant chaque phase : conception 3D, fabrication, logistique, montage et validations sur place.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'esprit d'un montage sans surprise et une attention exceptionnelle aux détails."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella realizzazione di architetture effimere dal nostro laboratorio di proprietà, Standarte progetta e monta stand a Santiago di Compostela — capitale della Galizia e grande polo di congressi, fiere culturali e turismo del Cammino, con la Cidade da Cultura de Galicia e il Palacio de Congresos e Exposicións de Galicia come quartieri fieristici di riferimento — controllando ogni fase: progettazione 3D, produzione, logistica, montaggio e collaudi in loco.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un montaggio senza sorprese e un'eccezionale attenzione ai dettagli."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en monteert Standarte beursstands in Santiago de Compostela — de hoofdstad van Galicië en een belangrijk knooppunt voor congressen, culturele beurzen en pelgrimstoerisme van de Camino, met de Cidade da Cultura de Galicia en het Palacio de Congresos e Exposicións de Galicia als belangrijkste beurslocaties — met volledige controle over elke fase: 3D-ontwerp, productie, logistiek, montage en keuringen ter plaatse.",
      "detail": "Wij bieden agentschappen en exposanten de zekerheid van een montage zonder verrassingen en uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借在自有工厂搭建临时建筑的20年经验，Standarte 在圣地亚哥-德孔波斯特拉设计并搭建展台——这里是加利西亚自治区首府，也是会议、文化展会与圣雅各朝圣之路旅游的重要中心，以加利西亚文化城（Cidade da Cultura）和加利西亚会议展览宫为核心场馆——全程把控每个环节：3D设计、生产、物流、安装及现场验收。",
      "detail": "我们为代理机构和参展商提供无意外的搭建保障，并对细节给予卓越关注。"
    },
    "hi": {
      "intro": "अपने स्वयं के कारखाने से अस्थायी वास्तुकला बनाने के 20 वर्षों के अनुभव के साथ, Standarte सैंटियागो दे कॉम्पोस्टेला में स्टैंड डिज़ाइन और असेंबली करता है—गैलिसिया की राजधानी और कांग्रेस, सांस्कृतिक मेलों तथा कामिनो (तीर्थयात्रा) पर्यटन का एक प्रमुख केंद्र, जहाँ Cidade da Cultura de Galicia और Palacio de Congresos e Exposicións de Galicia प्रमुख प्रदर्शनी स्थल हैं—हर चरण को नियंत्रित करते हुए: 3D डिज़ाइन, उत्पादन, रसद, स्थापना और स्थल पर सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी आश्चर्य के असेंबली और विवरण पर असाधारण ध्यान की निश्चिंतता प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년의 경험을 바탕으로, Standarte는 갈리시아의 주도이자 학회·문화 박람회·산티아고 순례길 관광의 주요 거점이며 Cidade da Cultura de Galicia와 Palacio de Congresos e Exposicións de Galicia를 대표 전시장으로 둔 산티아고 데 콤포스텔라에서 부스를 디자인하고 조립하며 3D 디자인, 생산, 물류, 설치, 현장 검수 등 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 직접 전시업체에 예기치 못한 일이 없는 조립과 디테일에 대한 탁월한 주의를 제공합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年の経験を背景に、Standarteはガリシア州の州都であり、学会・文化見本市・サンティアゴ巡礼路観光の一大拠点で、ガリシア文化都市（Cidade da Cultura）とガリシア会議展示宮を中核会場とするサンティアゴ・デ・コンポステーラで展示ブースを設計・施工し、3D設計、製作、物流、設営、会場での検査まで各工程を一貫して管理します。",
      "detail": "代理店や出展企業の皆さまに、想定外のない設営と、細部まで行き届いた卓越した対応をお届けします。"
    }
  },
  "coruna": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en A Coruña —capital económica de Galicia y gran plaza atlántica de ferias y congresos, con EXPOCoruña y el Palacio de Congresos Palexco como recintos de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência a construir arquitetura efémera a partir da nossa própria oficina, a Standarte concebe e monta stands na A Coruña — capital económica da Galiza e grande praça atlântica de feiras e congressos, com a EXPOCoruña e o Palacio de Exposiciones y Congresos Palexco como recintos de referência —, controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "en": {
      "intro": "With 20 years of experience building bespoke exhibition architecture from our own in-house workshop, Standarte designs and builds stands in A Coruña —Galicia's economic capital and a major Atlantic hub for trade fairs and congresses, with EXPOCoruña and the Palexco congress centre as its leading venues— controlling every phase: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and direct exhibitors the reassurance of a build with no surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung im Bau temporärer Architektur aus eigener Werkstatt plant und montiert Standarte Messestände in A Coruña – der wirtschaftlichen Hauptstadt Galiciens und großen atlantischen Messe- und Kongressstandort mit EXPOCoruña und dem Kongresspalast Palexco als zentralen Veranstaltungsorten. Wir steuern jede Phase: 3D-Design, Fertigung, Logistik, Aufbau und die Abnahmen vor Ort.",
      "detail": "Agenturen und Direktausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus ohne böse Überraschungen und eine außergewöhnliche Liebe zum Detail."
    },
    "fr": {
      "intro": "Forte de plus de 20 ans d'expérience dans la construction d'architecture éphémère depuis notre atelier intégré, Standarte conçoit et monte des stands à La Corogne — capitale économique de la Galice et grande place atlantique des salons et congrès, avec EXPOCoruña et le Palais des Expositions et Congrès Palexco comme sites de référence — en maîtrisant chaque étape : conception 3D, fabrication, logistique, installation et validations sur site.",
      "detail": "Nous offrons aux agences et aux exposants la tranquillité d'un montage sans mauvaises surprises et un souci du détail exceptionnel."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza nella costruzione di architettura effimera dal nostro laboratorio interno, Standarte progetta e allestisce stand su misura a La Coruña —capitale economica della Galizia e grande piazza atlantica di fiere e congressi, con EXPOCoruña e il Palacio de Exposiciones y Congresos Palexco come sedi di riferimento— controllando ogni fase: progettazione 3D, produzione, logistica, installazione e validazioni in fiera.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un allestimento senza imprevisti e una cura del dettaglio eccezionale."
    },
    "nl": {
      "intro": "Met meer dan 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit ons eigen atelier ontwerpt en bouwt Standarte beursstands in A Coruña — de economische hoofdstad van Galicië en een belangrijk Atlantisch knooppunt voor beurzen en congressen, met EXPOCoruña en het Palacio de Exposiciones y Congresos Palexco als toonaangevende locaties. Wij houden elke fase in eigen hand: 3D-ontwerp, productie, logistiek, montage en de technische goedkeuringen op de beurslocatie.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een montage zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年搭建临时展览建筑的经验，Standarte依托自有工厂，在拉科鲁尼亚——加利西亚的经济中心、面向大西洋的展会与会议重镇，以EXPOCoruña与Palexco会展中心为核心场馆——为客户设计并搭建展台，全程把控每一个环节：3D设计、生产制造、物流运输、现场安装以及场馆技术审批。",
      "detail": "我们为代理机构与参展商提供搭建零意外的安心保障，以及对细节近乎苛刻的关注。"
    },
    "hi": {
      "intro": "अपनी निजी वर्कशॉप में अस्थायी वास्तुकला (एफेमेरल आर्किटेक्चर) के निर्माण के 20 से अधिक वर्षों के अनुभव के साथ, Standarte ए कोरुनिया में स्टैंड डिज़ाइन और असेंबल करती है — जो गैलिसिया की आर्थिक राजधानी और मेलों व सम्मेलनों का विशाल अटलांटिक केंद्र है, जहाँ EXPOCoruña और कॉन्ग्रेस सेंटर Palexco प्रमुख स्थल हैं — और हम हर चरण को नियंत्रित करते हैं: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, इंस्टॉलेशन और स्थल पर तकनीकी सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा वाली असेंबली का भरोसा और विवरण पर असाधारण ध्यान प्रदान करते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년 이상의 경력을 바탕으로, Standarte는 아 코루냐에서 부스를 디자인하고 설치합니다. 갈리시아의 경제 중심 도시이자 대서양을 면한 전시·컨벤션의 거점인 이곳에는 EXPOCoruña와 Palexco 컨벤션 센터가 대표 전시장으로 자리하고 있으며, 저희는 3D 디자인, 제작, 물류, 설치, 전시장 승인까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 출품 기업에 예기치 못한 변수 없는 설치와 디테일에 대한 탁월한 집중을 약속드립니다."
    },
    "ja": {
      "intro": "20年以上の経験を持つStandarteは、自社工房から仮設建築を手がけ、ガリシア地方の経済的中心地であり、EXPOCoruñaとPalexco（パレクスコ会議場）を擁する大西洋岸の見本市・国際会議の拠点であるア・コルーニャで、ブースの設計から施工までを一貫して担います。3Dデザイン、製作、物流、設置、会場での各種申請に至るまで、すべての工程を自社で管理します。",
      "detail": "代理店や出展企業の皆さまに、トラブルのない確実な施工と、細部にまでこだわった卓越した仕上がりをお約束します。"
    }
  },
  "salamanca": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Salamanca —ciudad universitaria Patrimonio de la Humanidad y plaza ferial y de congresos del oeste de Castilla y León, con el Recinto Ferial de Salamanca y el Palacio de Congresos como sedes de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "pt": {
      "intro": "Com 20 anos de experiência a construir arquitetura efémera a partir da nossa própria oficina, a Standarte concebe e monta stands em Salamanca —cidade universitária Património Mundial e praça de feiras e congressos do oeste de Castela e Leão, com o Recinto Ferial de Salamanca e o Palacio de Congresos como espaços de referência— controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Oferecemos a agências e expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in Salamanca — a UNESCO World Heritage university city and the leading trade-fair and congress hub in western Castile and León, home to the Recinto Ferial de Salamanca and the Palacio de Congresos — taking charge of every stage: 3D design, fabrication, logistics, on-site installation and venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and exceptional attention to detail."
    },
    "de": {
      "intro": "Mit 20 Jahren Erfahrung im Bau temporärer Architektur aus der eigenen Werkstatt plant und montiert Standarte Messestände in Salamanca – Universitätsstadt und UNESCO-Welterbe sowie Messe- und Kongressstandort im Westen Kastilien-Leóns mit dem Recinto Ferial de Salamanca und dem Palacio de Congresos als zentralen Veranstaltungsorten. Wir steuern jede Phase selbst: 3D-Design, Fertigung, Logistik, Aufbau und die Abnahmen vor Ort.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines Aufbaus ohne böse Überraschungen und eine außergewöhnliche Liebe zum Detail."
    },
    "fr": {
      "intro": "Forts de 20 ans d'expérience dans la construction d'architecture éphémère depuis notre propre atelier, chez Standarte nous concevons et montons des stands à Salamanca — ville universitaire classée au Patrimoine mondial et place forte des salons et congrès de l'ouest de la Castille-et-León, avec le Recinto Ferial de Salamanca et le Palacio de Congresos comme sites de référence — en maîtrisant chaque étape : conception 3D, fabrication, logistique, installation et validations sur site.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et un soin du détail exceptionnel."
    },
    "it": {
      "intro": "Con 20 anni di esperienza nella costruzione di architettura effimera dalla nostra officina propria, Standarte progetta e allestisce stand a Salamanca —città universitaria Patrimonio dell'Umanità e polo fieristico e congressuale dell'ovest della Castiglia e León, con il Recinto Ferial de Salamanca e il Palacio de Congresos come sedi di riferimento— controllando ogni fase: progettazione 3D, produzione, logistica, installazione e omologazioni nel quartiere fieristico.",
      "detail": "Offriamo ad agenzie ed espositori la tranquillità di un allestimento senza sorprese e una cura del dettaglio eccezionale."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en bouwt Standarte beursstands in Salamanca — universiteitsstad en Werelderfgoed, en hét beurs- en congrescentrum van West-Castilië en León, met het Recinto Ferial de Salamanca en het Palacio de Congresos als toonaangevende locaties — waarbij wij elke fase in eigen hand houden: 3D-ontwerp, productie, logistiek, installatie en de keuringen op de beursvloer.",
      "detail": "Wij bieden bureaus en exposanten de gemoedsrust van een opbouw zonder verrassingen en oog voor detail van uitzonderlijk niveau."
    },
    "zh": {
      "intro": "Standarte 拥有自有工厂和 20 年临时建筑搭建经验，为客户在萨拉曼卡设计并搭建展台。萨拉曼卡是世界遗产大学城，也是卡斯蒂利亚-莱昂西部地区的会展与会议重镇，以 Recinto Ferial de Salamanca 和 Palacio de Congresos 两大场馆为核心。从 3D 设计、工厂制作、物流运输到现场安装与场馆审批，每一个环节我们都亲自把控。",
      "detail": "我们为代理商和参展商提供毫无意外的搭建过程，以及对细节的极致追求。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला से अस्थायी वास्तुकला तैयार करने के 20 वर्षों के अनुभव के साथ, Standarte सलमांका में स्टैंड डिज़ाइन और स्थापित करता है — यह विश्व धरोहर वाला विश्वविद्यालय नगर और पश्चिमी Castilla y León का मेला एवं सम्मेलन केंद्र है, जहाँ Recinto Ferial de Salamanca और Palacio de Congresos प्रमुख स्थल हैं — और हम हर चरण को नियंत्रित करते हैं: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और परिसर में तकनीकी मंज़ूरियाँ।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा वाली स्थापना और हर बारीकी पर असाधारण ध्यान देने का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "20년간 자체 공방에서 임시 전시 건축물을 제작해 온 Standarte는 살라망카에서 부스를 설계하고 시공합니다. 세계문화유산으로 지정된 대학 도시이자 카스티야이레온 서부의 박람회·컨퍼런스 거점인 이곳에는 Recinto Ferial de Salamanca와 Palacio de Congresos가 핵심 행사장으로 자리하고 있으며, 저희는 3D 설계, 제작, 물류, 설치, 행사장 인증까지 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 출품 기업에는 돌발 변수 없는 시공과 탁월한 디테일 관리를 약속드립니다."
    },
    "ja": {
      "intro": "自社工房から仮設建築を手がけて20年。Standarteは、世界遺産の大学都市であり、カスティーリャ・イ・レオン州西部を代表する見本市・コングレス都市サラマンカ——Recinto Ferial de SalamancaとPalacio de Congresosを中心拠点とする——で、3Dデザイン、製作、物流、施工、会場での各種申請・承認まで全工程を一貫管理し、ブースの設計と施工を行います。",
      "detail": "代理店および出展企業の皆さまに、サプライズのない安心の施工と、細部まで行き届いた卓越したサービスをお届けします。"
    }
  },
  "valladolid": {
    "es": {
      "intro": "Con 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Valladolid —capital de Castilla y León y gran plaza ferial del noroeste, con la Feria de Valladolid (Institución Ferial de Castilla y León) como recinto de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte concebe e monta stands em Valladolid —capital de Castela e Leão e grande praça feiral do noroeste de Espanha, tendo como recinto de referência a Feria de Valladolid (Institución Ferial de Castilla y León)— controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "en": {
      "intro": "With 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in Valladolid — capital of Castilla y León and the leading trade-fair hub of north-west Spain, with the Feria de Valladolid (Institución Ferial de Castilla y León) as its flagship venue — controlling every stage in-house: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and an exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung im Bau temporärer Architektur aus der eigenen Werkstatt plant und montiert Standarte Messestände in Valladolid – Hauptstadt von Castilla y León und führender Messeplatz im Nordwesten Spaniens, mit der Feria de Valladolid (Institución Ferial de Castilla y León) als Leitveranstaltungsort. Wir steuern jede Phase selbst: 3D-Design, Fertigung, Logistik, Aufbau und die technischen Abnahmen am Veranstaltungsort.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail."
    },
    "fr": {
      "intro": "Forts de 20 ans d'expérience dans la construction d'architecture éphémère depuis notre propre atelier, nous concevons et montons chez Standarte des stands à Valladolid — capitale de Castille-et-León et grande place foire du nord-ouest, avec la Feria de Valladolid (Institución Ferial de Castilla y León) comme enceinte de référence — en maîtrisant chaque étape : conception 3D, fabrication, logistique, installation et validations sur site.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza nella costruzione di architetture effimere dalla nostra officina propria, Standarte progetta e allestisce stand a Valladolid —capoluogo della Castiglia e León e grande polo fieristico del nord-ovest spagnolo, con la Feria de Valladolid (Institución Ferial de Castilla y León) come quartiere di riferimento— mantenendo il controllo su ogni fase: progettazione 3D, fabbricazione, logistica, installazione e validazioni in sede.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Met 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en bouwt Standarte beursstands in Valladolid — hoofdstad van Castilië en León en een van de belangrijkste beurssteden van het noordwesten, met de Feria de Valladolid (Institución Ferial de Castilla y León) als toonaangevend beurscomplex — waarbij wij elke fase in eigen hand houden: 3D-ontwerp, fabricage, logistiek, opbouw en de keuringen op de beursvloer.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年在自有工厂打造临展空间的经验，Standarte在巴利亚多利德——卡斯蒂利亚-莱昂自治区首府、西班牙西北部重要的会展枢纽，以Feria de Valladolid（Institución Ferial de Castilla y León）为核心展馆——为客户设计并搭建展台，全程把控每一个环节：3D设计、定制生产、物流运输、现场安装以及场馆审批。",
      "detail": "我们为代理公司和直接参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला में अल्पकालिक वास्तुकला (ephemeral architecture) के निर्माण के 20 से अधिक वर्षों के अनुभव के साथ, Standarte वायाडोलिड में प्रदर्शनी स्टैंड डिज़ाइन और स्थापित करता है — यह Castilla y León की राजधानी और देश के उत्तर-पश्चिम का प्रमुख प्रदर्शनी केंद्र है, जहाँ Feria de Valladolid (Institución Ferial de Castilla y León) आयोजन का प्रमुख स्थल है — और हम हर चरण को नियंत्रित करते हैं: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और परिसर में तकनीकी सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "자체 공장에서 임시 건축물을 제작해 온 20년 이상의 경력을 바탕으로, Standarte는 바야돌리드에서 전시 부스를 디자인하고 시공합니다. 카스티야 이 레온의 주도이자 스페인 북서부를 대표하는 전시 거점인 이곳에는 Feria de Valladolid(Institución Ferial de Castilla y León)라는 핵심 전시장이 있습니다. 3D 디자인부터 제작, 물류, 설치, 전시장 내 승인 절차까지 모든 단계를 직접 관리합니다.",
      "detail": "대행사와 참가업체에 차질 없는 시공과 탁월한 디테일에 대한 안심을 제공합니다."
    },
    "ja": {
      "intro": "自社工房で20年以上にわたり仮設建築を手がけてきたStandarteは、バリャドリッド（カスティーリャ・イ・レオン州の州都であり、北西スペインを代表する見本市拠点。Feria de Valladolid（Institución Ferial de Castilla y León）が中心会場）でブースの設計・施工を行い、3D設計・製作・物流・施工・会場での各種承認まで、すべての工程を一貫管理します。",
      "detail": "代理店および出展企業の皆さまに、トラブルのない施工と細部まで行き届いた品質という安心をお届けします。"
    }
  },
  "murcia": {
    "es": {
      "intro": "Con más de 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en la Región de Murcia —con IFEPA en Torre Pacheco como recinto de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With more than 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in the Region of Murcia — with IFEPA in Torre Pacheco as its flagship venue — controlling every stage: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and an exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung im Bau temporärer Architektur aus der eigenen Werkstatt plant und montiert Standarte Messestände in der Region Murcia – mit der IFEPA in Torre Pacheco als führendem Veranstaltungsort – und steuert jede Phase selbst: 3D-Design, Fertigung, Logistik, Aufbau und die technischen Abnahmen am Veranstaltungsort.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte concebe e monta stands na Região de Múrcia —com a IFEPA em Torre Pacheco como recinto de referência— controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Forts de plus de 20 ans d'expérience dans la construction d'architecture éphémère depuis notre propre atelier, nous concevons et montons chez Standarte des stands dans la Région de Murcie — avec l'IFEPA à Torre Pacheco comme enceinte de référence — en maîtrisant chaque étape : conception 3D, fabrication, logistique, installation et validations sur site.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza nella costruzione di architetture effimere dalla nostra officina propria, Standarte progetta e allestisce stand nella Regione di Murcia —con l'IFEPA a Torre Pacheco come quartiere di riferimento— mantenendo il controllo su ogni fase: progettazione 3D, fabbricazione, logistica, installazione e validazioni in sede.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Met ruim 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en bouwt Standarte beursstands in de regio Murcia — met IFEPA in Torre Pacheco als toonaangevend beurscomplex — waarbij wij elke fase in eigen hand houden: 3D-ontwerp, fabricage, logistiek, opbouw en de keuringen op de beursvloer.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年在自有工厂打造临展空间的经验，Standarte在穆尔西亚大区设计并搭建展台——以位于托雷帕切科的穆尔西亚大区会展机构（IFEPA）为核心展馆——全程把控每一个环节：3D设计、定制生产、物流、现场安装与场馆审批。",
      "detail": "我们为代理公司和直接参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला में अल्पकालिक वास्तुकला के निर्माण के 20 से अधिक वर्षों के अनुभव के साथ, Standarte मुर्सिया क्षेत्र में प्रदर्शनी स्टैंड डिज़ाइन और स्थापित करता है — जहाँ टोरे पाचेको स्थित IFEPA प्रमुख स्थल है — और हम हर चरण को नियंत्रित करते हैं: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और परिसर में तकनीकी सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년 이상의 경력을 바탕으로, Standarte는 토레파체코의 무르시아 지방 전시기관(IFEPA)을 중심 전시장으로 하여 무르시아 지방에서 부스를 디자인·시공하며 3D 디자인, 제작, 물류, 설치, 전시장 승인까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年以上の経験をもとに、Standarteはトレ・パチェコのムルシア州見本市機構（IFEPA）を基幹会場として、ムルシア州でブースを設計・施工し、3D設計、製作、物流、設置、会場審査までの全工程を管理します。",
      "detail": "代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "alicante": {
    "es": {
      "intro": "Con más de 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en Alicante —con la Institución Ferial Alicantina (IFA) en Elche como recinto de referencia— controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With more than 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in Alicante — with the Institución Ferial Alicantina (IFA) in Elche as its flagship venue — controlling every stage: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and an exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung im Bau temporärer Architektur aus der eigenen Werkstatt plant und montiert Standarte Messestände in Alicante – mit der Institución Ferial Alicantina (IFA) in Elche als führendem Veranstaltungsort – und steuert jede Phase selbst: 3D-Design, Fertigung, Logistik, Aufbau und die technischen Abnahmen am Veranstaltungsort.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und eine außergewöhnliche Liebe zum Detail."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência a construir arquitetura efémera a partir da nossa oficina própria, a Standarte concebe e monta stands em Alicante —com a Institución Ferial Alicantina (IFA) em Elche como recinto de referência— controlando cada fase: design 3D, fabrico, logística, instalação e validações no recinto.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Forts de plus de 20 ans d'expérience dans la construction d'architecture éphémère depuis notre propre atelier, nous concevons et montons chez Standarte des stands à Alicante — avec l'Institución Ferial Alicantina (IFA) à Elche comme enceinte de référence — en maîtrisant chaque étape : conception 3D, fabrication, logistique, installation et validations sur site.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza nella costruzione di architetture effimere dalla nostra officina propria, Standarte progetta e allestisce stand ad Alicante —con l'Institución Ferial Alicantina (IFA) a Elche come quartiere di riferimento— mantenendo il controllo su ogni fase: progettazione 3D, fabbricazione, logistica, installazione e validazioni in sede.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Met ruim 20 jaar ervaring in het bouwen van tijdelijke architectuur vanuit onze eigen werkplaats ontwerpt en bouwt Standarte beursstands in Alicante — met de Institución Ferial Alicantina (IFA) in Elche als toonaangevend beurscomplex — waarbij wij elke fase in eigen hand houden: 3D-ontwerp, fabricage, logistiek, opbouw en de keuringen op de beursvloer.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年在自有工厂打造临展空间的经验，Standarte在阿利坎特设计并搭建展台——以位于埃尔切的阿利坎特会展机构（IFA）为核心展馆——全程把控每一个环节：3D设计、定制生产、物流、现场安装与场馆审批。",
      "detail": "我们为代理公司和直接参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "अपनी कार्यशाला में अल्पकालिक वास्तुकला के निर्माण के 20 से अधिक वर्षों के अनुभव के साथ, Standarte अलिकांते में प्रदर्शनी स्टैंड डिज़ाइन और स्थापित करता है — जहाँ एल्चे स्थित Institución Ferial Alicantina (IFA) प्रमुख स्थल है — और हम हर चरण को नियंत्रित करते हैं: 3D डिज़ाइन, निर्माण, लॉजिस्टिक्स, स्थापना और परिसर में तकनीकी सत्यापन।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "자체 공방에서 임시 건축물을 제작해 온 20년 이상의 경력을 바탕으로, Standarte는 엘체의 알리칸테 전시기관(IFA)을 중심 전시장으로 하여 알리칸테에서 부스를 디자인·시공하며 3D 디자인, 제작, 물류, 설치, 전시장 승인까지 모든 단계를 직접 관리합니다.",
      "detail": "에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "自社工房で仮設建築を手がけてきた20年以上の経験をもとに、Standarteはエルチェのアリカンテ見本市機構（IFA）を基幹会場として、アリカンテでブースを設計・施工し、3D設計、製作、物流、設置、会場審査までの全工程を管理します。",
      "detail": "代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "islas_canarias": {
    "es": {
      "intro": "Con más de 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en las Islas Canarias —con INFECAR (Gran Canaria) y el Recinto Ferial de Tenerife como recintos de referencia— resolviendo la logística marítima al archipiélago y controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With more than 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in the Canary Islands — with INFECAR (Gran Canaria) and the Tenerife Exhibition Centre as flagship venues — handling the sea logistics to the archipelago and controlling every stage: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and an exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung plant und montiert Standarte Messestände auf den Kanarischen Inseln – mit INFECAR (Gran Canaria) und dem Messegelände von Teneriffa als Leitveranstaltungsorten – und übernimmt die Seelogistik zum Archipel.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und außergewöhnliche Detailtreue."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência, a Standarte concebe e monta stands nas Ilhas Canárias — com o INFECAR (Gran Canaria) e o Recinto Feiral de Tenerife como recintos de referência — resolvendo a logística marítima ao arquipélago.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Forts de plus de 20 ans d'expérience, nous concevons et montons chez Standarte des stands aux Îles Canaries — avec l'INFECAR (Gran Canaria) et le Parc des expositions de Tenerife comme enceintes de référence — en assurant la logistique maritime vers l'archipel.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza, Standarte progetta e allestisce stand alle Isole Canarie — con l'INFECAR (Gran Canaria) e il Quartiere fieristico di Tenerife come riferimenti — gestendo la logistica marittima all'arcipelago.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Met ruim 20 jaar ervaring ontwerpt en bouwt Standarte beursstands op de Canarische Eilanden — met INFECAR (Gran Canaria) en het beurscomplex van Tenerife als toonaangevende locaties — en verzorgt de zeevracht naar de archipel.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年经验，Standarte 在加那利群岛设计并搭建展台——以 INFECAR（大加那利岛）和特内里费展览中心为核心展馆——并负责前往群岛的海运物流。",
      "detail": "我们为代理公司和参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "20 से अधिक वर्षों के अनुभव के साथ, Standarte कैनरी द्वीप समूह में स्टैंड डिज़ाइन और स्थापित करता है — INFECAR (ग्रान कनारिया) और तेनेरीफ़े परिसर प्रमुख स्थलों के रूप में — और द्वीपसमूह तक समुद्री लॉजिस्टिक्स संभालता है।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "20년 이상의 경력을 바탕으로 Standarte는 INFECAR(그란카나리아)와 테네리페 전시장을 중심 전시장으로 하여 카나리아 제도에서 부스를 디자인·시공하며 제도까지의 해상 물류를 담당합니다.",
      "detail": "에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "20年以上の経験をもとに、StandarteはINFECAR（グラン・カナリア）とテネリフェ展示会場を基幹会場として、カナリア諸島でブースを設計・施工し、諸島への海上物流を担います。",
      "detail": "代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  },
  "islas_de_madeira": {
    "es": {
      "intro": "Con más de 20 años de experiencia construyendo arquitectura efímera desde nuestro taller propio, Standarte diseña y monta stands en las Islas de Madeira —con el Madeira Tecnopolo (Funchal) como recinto de referencia— resolviendo la logística marítima al archipiélago y controlando cada fase: diseño 3D, fabricación, logística, instalación y validaciones en el recinto.",
      "detail": "Ofrecemos a agencias y expositores la tranquilidad de un montaje sin sorpresas y una atención al detalle excepcional."
    },
    "en": {
      "intro": "With more than 20 years of experience building temporary architecture from our own workshop, Standarte designs and installs exhibition stands in the Madeira Islands — with Madeira Tecnopolo (Funchal) as the flagship venue — handling the sea logistics to the archipelago and controlling every stage: 3D design, fabrication, logistics, installation and on-site venue approvals.",
      "detail": "We give agencies and exhibitors the reassurance of a build with no surprises and an exceptional attention to detail."
    },
    "de": {
      "intro": "Mit über 20 Jahren Erfahrung plant und montiert Standarte Messestände auf Madeira – mit dem Madeira Tecnopolo (Funchal) als Leitveranstaltungsort – und übernimmt die Seelogistik zur Insel.",
      "detail": "Agenturen und Ausstellern bieten wir die Sicherheit eines reibungslosen Aufbaus und außergewöhnliche Detailtreue."
    },
    "pt": {
      "intro": "Com mais de 20 anos de experiência, a Standarte concebe e monta stands na Madeira — com o Madeira Tecnopolo (Funchal) como recinto de referência — resolvendo a logística marítima à ilha.",
      "detail": "Damos às agências e aos expositores a tranquilidade de uma montagem sem surpresas e uma atenção ao detalhe excecional."
    },
    "fr": {
      "intro": "Forts de plus de 20 ans d'expérience, nous concevons et montons chez Standarte des stands à Madère — avec le Madeira Tecnopolo (Funchal) comme enceinte de référence — en assurant la logistique maritime vers l'île.",
      "detail": "Nous offrons aux agences et aux exposants la sérénité d'un montage sans mauvaises surprises et une attention aux détails exceptionnelle."
    },
    "it": {
      "intro": "Con oltre 20 anni di esperienza, Standarte progetta e allestisce stand a Madeira — con il Madeira Tecnopolo (Funchal) come riferimento — gestendo la logistica marittima all'isola.",
      "detail": "Offriamo ad agenzie ed espositori la serenità di un allestimento senza imprevisti e una cura del dettaglio fuori dal comune."
    },
    "nl": {
      "intro": "Met ruim 20 jaar ervaring ontwerpt en bouwt Standarte beursstands op Madeira — met het Madeira Tecnopolo (Funchal) als toonaangevende locatie — en verzorgt de zeevracht naar het eiland.",
      "detail": "Wij bieden bureaus en exposanten de zekerheid van een opbouw zonder verrassingen en een uitzonderlijke aandacht voor detail."
    },
    "zh": {
      "intro": "凭借20多年经验，Standarte 在马德拉设计并搭建展台——以丰沙尔的 Madeira Tecnopolo 为核心展馆——并负责前往海岛的海运物流。",
      "detail": "我们为代理公司和参展商提供毫无意外的搭建保障，以及对细节的极致关注。"
    },
    "hi": {
      "intro": "20 से अधिक वर्षों के अनुभव के साथ, Standarte मडीरा में स्टैंड डिज़ाइन और स्थापित करता है — फुंचल का Madeira Tecnopolo प्रमुख स्थल के रूप में — और द्वीप तक समुद्री लॉजिस्टिक्स संभालता है।",
      "detail": "हम एजेंसियों और प्रदर्शकों को बिना किसी अप्रत्याशित बाधा के सहज स्थापना और हर बारीकी पर असाधारण ध्यान का भरोसा देते हैं।"
    },
    "ko": {
      "intro": "20년 이상의 경력을 바탕으로 Standarte는 푼샬의 Madeira Tecnopolo를 중심 전시장으로 하여 마데이라에서 부스를 디자인·시공하며 섬까지의 해상 물류를 담당합니다.",
      "detail": "에이전시와 참가업체에 예상치 못한 문제 없는 시공과 탁월한 디테일을 보장합니다."
    },
    "ja": {
      "intro": "20年以上の経験をもとに、StandarteはフンシャルのMadeira Tecnopoloを基幹会場として、マデイラでブースを設計・施工し、島への海上物流を担います。",
      "detail": "代理店や出展者に、想定外のない施工と卓越したディテールへのこだわりをお約束します。"
    }
  }
};

/** Mapa {cityKey: {intro, detail}} en un idioma: lo que necesita el listado de ciudades. */
export function cityIntrosFor(lang) {
  const out = {};
  for (const [key, byLang] of Object.entries(cityContent)) {
    const v = byLang[lang] || byLang.es;
    if (v) out[key] = v;
  }
  return out;
}
