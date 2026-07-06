<script>
  import { onMount } from 'svelte';
  import { pathFor, languages, languageLabels, ctaBudget } from '$lib/siteData.js';
  import { pricingTiers, fmtEuro } from '$lib/pricingTiers.js';
  import { uspNavLabel } from '$lib/uspSnippets.js';
  import FlagIcon from './FlagIcon.svelte';
  import AiSourceButtons from './AiSourceButtons.svelte';
  import ContactForm from './ContactForm.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import { advisorDismissed } from '$lib/stores/advisor.js';

  export let data;
  $: lang = data.lang;
  $: copy = data.copy;
  $: canonical = data.canonical;

  let menuOpen = false;
  let isScrolled = false;

  // ── Asesor de Pat (WelcomeAdvisor): carga diferida como en la home ──
  let showWelcomeAdvisor = false;
  let AdvisorComponent = null;   // se rellena con el import dinámico
  let advisorTimeout, advisorLoadHandler;

  // Reactiva a Pat desde el botón "Expansión" (junto a los botones GEO).
  function reopenAdvisor() {
    advisorDismissed.reactivate();
    if (AdvisorComponent) { showWelcomeAdvisor = true; }
    else { import('./WelcomeAdvisor.svelte').then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; }).catch(() => {}); }
  }

  onMount(() => {
    const launchAdvisor = () => {
      advisorTimeout = setTimeout(() => {
        if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('standarte_advisor_dismissed') === '1') return;
        import('./WelcomeAdvisor.svelte').then((m) => { AdvisorComponent = m.default; showWelcomeAdvisor = true; }).catch(() => {});
      }, 8000);
    };
    if (document.readyState === 'complete') { launchAdvisor(); }
    else { advisorLoadHandler = launchAdvisor; window.addEventListener('load', advisorLoadHandler, { once: true }); }
    return () => { clearTimeout(advisorTimeout); if (advisorLoadHandler) window.removeEventListener('load', advisorLoadHandler); };
  });

  // Cifras orientativas «desde», validadas. Fuente única en $lib/pricingTiers.js
  // (compartidas con el asistente de presupuesto). Se muestran como "desde X €".
  const tiers = pricingTiers;
  const fmt = fmtEuro;

  const texts = {
    es: {
      navPrecios: 'Precios', metaTitle: 'Precios de stands para ferias | Standarte', metaDesc: 'Precios orientativos de diseño y montaje de stands: desde stands modulares hasta proyectos premium llave en mano. Mostramos todo el rango con cifras desde.',
      heroTitle: 'Precios', from: 'desde',
      intro: 'Trabajamos todo el rango, del stand modular al gran proyecto llave en mano. Estos son precios orientativos «desde» para que te hagas una idea; el presupuesto final depende de los metros, el diseño y los servicios.',
      tiers: {
        modular: { name: 'Stand modular', desc: 'Sistemas reutilizables de montaje rápido. Ideal para ferias pequeñas y medianas o presencia recurrente.' },
        medida: { name: 'Stand a medida', desc: 'Diseño 100% personalizado fabricado en nuestro taller de carpintería, sin límites de catálogo.' },
        premium: { name: 'Stand premium', desc: 'Gran formato, doble altura, materiales nobles e iluminación de autor para máximo impacto.' },
        singular: { name: 'Proyectos singulares', desc: 'Stands singulares y grandes eventos con gestión integral, también en ferias internacionales.' }
      },
      disclaimer: 'Precios orientativos sin IVA. El presupuesto final se ajusta a tus metros cuadrados, al diseño y a los servicios contratados.',
      cta: 'Presupuesto a medida'
    },
    en: {
      navPrecios: 'Prices', metaTitle: 'Exhibition stand prices | Standarte', metaDesc: 'Indicative prices for exhibition stand design and assembly: from modular stands to premium turnkey projects. The full range with "from" figures.',
      heroTitle: 'Prices', from: 'from',
      intro: 'We cover the full range, from the modular stand to the large turnkey project. These are indicative "from" prices to give you an idea; the final quote depends on the square metres, the design and the services.',
      tiers: {
        modular: { name: 'Modular stand', desc: 'Reusable, quick-to-build systems. Ideal for small and medium fairs or recurring presence.' },
        medida: { name: 'Custom stand', desc: 'Fully bespoke design built in our own carpentry workshop, with no catalogue limits.' },
        premium: { name: 'Premium stand', desc: 'Large format, double height, fine materials and signature lighting for maximum impact.' },
        singular: { name: 'Signature projects', desc: 'One-off stands and large events with full project management, including international fairs.' }
      },
      disclaimer: 'Indicative prices, VAT not included. The final quote is adjusted to your square metres, the design and the contracted services.',
      cta: 'Ask us for a tailored quote'
    },
    de: {
      navPrecios: 'Preise', metaTitle: 'Preise für Messestände | Standarte', metaDesc: 'Richtpreise für Design und Montage von Messeständen: vom modularen Stand bis zum schlüsselfertigen Premium-Projekt. Die gesamte Bandbreite mit „ab"-Preisen.',
      heroTitle: 'Preise', from: 'ab',
      intro: 'Wir decken die gesamte Bandbreite ab, vom modularen Stand bis zum großen schlüsselfertigen Projekt. Dies sind unverbindliche „ab"-Preise zur Orientierung; das endgültige Angebot hängt von Quadratmetern, Design und Leistungen ab.',
      tiers: {
        modular: { name: 'Modularer Stand', desc: 'Wiederverwendbare Systeme mit schneller Montage. Ideal für kleine und mittlere Messen oder wiederkehrende Auftritte.' },
        medida: { name: 'Maßgefertigter Stand', desc: 'Vollständig individuelles Design aus unserer eigenen Tischlerei, ohne Katalogvorgaben.' },
        premium: { name: 'Premium-Stand', desc: 'Großformat, doppelte Höhe, edle Materialien und besondere Beleuchtung für maximale Wirkung.' },
        singular: { name: 'Sonderprojekte', desc: 'Einzigartige Stände und Großveranstaltungen mit Komplettmanagement, auch auf internationalen Messen.' }
      },
      disclaimer: 'Richtpreise zzgl. MwSt. Das endgültige Angebot richtet sich nach Ihren Quadratmetern, dem Design und den beauftragten Leistungen.',
      cta: 'Fordern Sie ein individuelles Angebot an'
    },
    pt: {
      navPrecios: 'Preços', metaTitle: 'Preços de stands para feiras | Standarte', metaDesc: 'Preços orientativos de design e montagem de stands: do stand modular ao projeto premium chave na mão. Todo o leque com valores "desde".',
      heroTitle: 'Preços', from: 'desde',
      intro: 'Trabalhamos todo o leque, do stand modular ao grande projeto chave na mão. Estes são preços orientativos «desde» para ter uma ideia; o orçamento final depende dos metros, do design e dos serviços.',
      tiers: {
        modular: { name: 'Stand modular', desc: 'Sistemas reutilizáveis de montagem rápida. Ideal para feiras pequenas e médias ou presença recorrente.' },
        medida: { name: 'Stand à medida', desc: 'Design 100% personalizado fabricado na nossa oficina de marcenaria, sem limites de catálogo.' },
        premium: { name: 'Stand premium', desc: 'Grande formato, dupla altura, materiais nobres e iluminação de autor para máximo impacto.' },
        singular: { name: 'Projetos singulares', desc: 'Stands singulares e grandes eventos com gestão integral, também em feiras internacionais.' }
      },
      disclaimer: 'Preços orientativos sem IVA. O orçamento final ajusta-se aos seus metros quadrados, ao design e aos serviços contratados.',
      cta: 'Peça-nos um orçamento à medida'
    },
    fr: {
      navPrecios: 'Tarifs', metaTitle: 'Tarifs de stands pour salons | Standarte', metaDesc: 'Tarifs indicatifs de conception et montage de stands : du stand modulaire au projet premium clé en main. Toute la gamme avec des prix « à partir de ».',
      heroTitle: 'Tarifs', from: 'à partir de',
      intro: 'Nous couvrons toute la gamme, du stand modulaire au grand projet clé en main. Voici des tarifs indicatifs « à partir de » pour vous donner une idée ; le devis final dépend des mètres carrés, du design et des services.',
      tiers: {
        modular: { name: 'Stand modulaire', desc: 'Systèmes réutilisables à montage rapide. Idéal pour les petits et moyens salons ou une présence récurrente.' },
        medida: { name: 'Stand sur mesure', desc: 'Design 100 % personnalisé fabriqué dans notre propre atelier de menuiserie, sans limites de catalogue.' },
        premium: { name: 'Stand premium', desc: 'Grand format, double hauteur, matériaux nobles et éclairage signature pour un impact maximal.' },
        singular: { name: 'Projets singuliers', desc: 'Stands uniques et grands événements avec gestion intégrale, y compris sur les salons internationaux.' }
      },
      disclaimer: 'Tarifs indicatifs hors TVA. Le devis final s\'ajuste à vos mètres carrés, au design et aux services retenus.',
      cta: 'Demandez un devis sur mesure'
    },
    it: {
      navPrecios: 'Prezzi', metaTitle: 'Prezzi di stand fieristici | Standarte', metaDesc: 'Prezzi indicativi di progettazione e montaggio di stand: dallo stand modulare al progetto premium chiavi in mano. Tutta la gamma con cifre "a partire da".',
      heroTitle: 'Prezzi', from: 'a partire da',
      intro: 'Copriamo tutta la gamma, dallo stand modulare al grande progetto chiavi in mano. Questi sono prezzi indicativi «a partire da» per darti un\'idea; il preventivo finale dipende dai metri, dal design e dai servizi.',
      tiers: {
        modular: { name: 'Stand modulare', desc: 'Sistemi riutilizzabili di rapido montaggio. Ideale per fiere piccole e medie o presenza ricorrente.' },
        medida: { name: 'Stand su misura', desc: 'Design 100% personalizzato realizzato nel nostro laboratorio di falegnameria, senza limiti di catalogo.' },
        premium: { name: 'Stand premium', desc: 'Grande formato, doppia altezza, materiali pregiati e illuminazione d\'autore per il massimo impatto.' },
        singular: { name: 'Progetti singolari', desc: 'Stand unici e grandi eventi con gestione integrale, anche in fiere internazionali.' }
      },
      disclaimer: 'Prezzi indicativi IVA esclusa. Il preventivo finale si adatta ai tuoi metri quadrati, al design e ai servizi richiesti.',
      cta: 'Richiedi un preventivo su misura'
    },
    nl: {
      navPrecios: 'Prijzen', metaTitle: 'Prijzen van beursstands | Standarte', metaDesc: 'Indicatieve prijzen voor ontwerp en montage van beursstands: van modulaire stand tot premium sleutelklaar project. Het volledige bereik met "vanaf"-bedragen.',
      heroTitle: 'Prijzen', from: 'vanaf',
      intro: 'We dekken het volledige bereik, van de modulaire stand tot het grote sleutelklare project. Dit zijn indicatieve "vanaf"-prijzen om u een idee te geven; de uiteindelijke offerte hangt af van de vierkante meters, het ontwerp en de diensten.',
      tiers: {
        modular: { name: 'Modulaire stand', desc: 'Herbruikbare, snel te bouwen systemen. Ideaal voor kleine en middelgrote beurzen of terugkerende aanwezigheid.' },
        medida: { name: 'Stand op maat', desc: 'Volledig op maat gemaakt ontwerp uit onze eigen timmerwerkplaats, zonder cataloguslimieten.' },
        premium: { name: 'Premium stand', desc: 'Groot formaat, dubbele hoogte, edele materialen en signatuurverlichting voor maximale impact.' },
        singular: { name: 'Bijzondere projecten', desc: 'Unieke stands en grote evenementen met volledig projectbeheer, ook op internationale beurzen.' }
      },
      disclaimer: 'Indicatieve prijzen, exclusief btw. De uiteindelijke offerte wordt afgestemd op uw vierkante meters, het ontwerp en de afgenomen diensten.',
      cta: 'Vraag een offerte op maat aan'
    },
    zh: {
      navPrecios: '价格', metaTitle: '展台价格 | Standarte', metaDesc: '展台设计与搭建的参考价格：从模块化展台到高端交钥匙项目，涵盖全部价位，以"起价"展示。',
      heroTitle: '价格', from: '起价',
      intro: '我们覆盖全部价位，从模块化展台到大型交钥匙项目。以下为参考"起价"，供您大致了解；最终报价取决于面积、设计与所含服务。',
      tiers: {
        modular: { name: '模块化展台', desc: '可重复使用、搭建快速的系统。适合中小型展会或经常参展。' },
        medida: { name: '定制展台', desc: '在我们自有木工厂完全定制，不受目录限制。' },
        premium: { name: '高端展台', desc: '大尺寸、双层结构、高级材料与专属灯光，营造最大冲击力。' },
        singular: { name: '特别项目', desc: '独特展台与大型活动，提供全程统筹，亦含国际展会。' }
      },
      disclaimer: '参考价格，不含增值税。最终报价将根据您的面积、设计与所选服务进行调整。',
      cta: '向我们索取定制报价'
    },
    hi: {
      navPrecios: 'मूल्य', metaTitle: 'स्टैंड के मूल्य | Standarte', metaDesc: 'स्टैंड डिज़ाइन और असेंबली के अनुमानित मूल्य: मॉड्यूलर स्टैंड से लेकर प्रीमियम टर्नकी प्रोजेक्ट तक—पूरी रेंज "से" आँकड़ों के साथ।',
      heroTitle: 'मूल्य', from: 'से',
      intro: 'हम पूरी रेंज पर काम करते हैं—मॉड्यूलर स्टैंड से लेकर बड़े टर्नकी प्रोजेक्ट तक। ये अनुमानित "से" मूल्य हैं ताकि आपको अंदाज़ा हो; अंतिम बजट वर्ग मीटर, डिज़ाइन और सेवाओं पर निर्भर करता है।',
      tiers: {
        modular: { name: 'मॉड्यूलर स्टैंड', desc: 'पुन: प्रयोज्य, जल्दी बनने वाले सिस्टम। छोटे-मध्यम मेलों या नियमित उपस्थिति के लिए आदर्श।' },
        medida: { name: 'कस्टम स्टैंड', desc: 'हमारी अपनी बढ़ईगीरी कार्यशाला में पूरी तरह कस्टम डिज़ाइन, बिना किसी कैटलॉग सीमा के।' },
        premium: { name: 'प्रीमियम स्टैंड', desc: 'बड़ा आकार, दोहरी ऊँचाई, उत्कृष्ट सामग्री और विशिष्ट प्रकाश—अधिकतम प्रभाव के लिए।' },
        singular: { name: 'विशेष परियोजनाएँ', desc: 'अनूठे स्टैंड और बड़े आयोजन, पूर्ण प्रबंधन के साथ, अंतरराष्ट्रीय मेलों सहित।' }
      },
      disclaimer: 'अनुमानित मूल्य, GST के बिना। अंतिम बजट आपके वर्ग मीटर, डिज़ाइन और चुनी गई सेवाओं के अनुसार समायोजित होता है।',
      cta: 'अनुकूलित बजट के लिए संपर्क करें'
    },
    ko: {
      navPrecios: '가격', metaTitle: '부스 가격 | Standarte', metaDesc: '부스 디자인 및 조립 참고 가격: 모듈형 부스부터 프리미엄 턴키 프로젝트까지 전 범위를 "부터" 금액으로 안내합니다.',
      heroTitle: '가격', from: '부터',
      intro: '모듈형 부스부터 대형 턴키 프로젝트까지 전 범위를 다룹니다. 다음은 참고용 "부터" 가격으로, 대략적인 감을 드리기 위한 것입니다. 최종 견적은 면적, 디자인, 서비스에 따라 달라집니다.',
      tiers: {
        modular: { name: '모듈형 부스', desc: '재사용 가능하고 빠르게 시공되는 시스템. 중소형 전시회나 정기 참가에 적합합니다.' },
        medida: { name: '맞춤형 부스', desc: '자체 목공 공장에서 100% 맞춤 제작, 카탈로그 제한이 없습니다.' },
        premium: { name: '프리미엄 부스', desc: '대형, 복층 구조, 고급 소재와 감각적인 조명으로 최대의 임팩트를 줍니다.' },
        singular: { name: '특별 프로젝트', desc: '국제 전시회를 포함해 전체 관리가 포함된 독창적 부스와 대형 이벤트.' }
      },
      disclaimer: '참고 가격이며 부가세 별도입니다. 최종 견적은 면적, 디자인, 계약 서비스에 따라 조정됩니다.',
      cta: '맞춤 견적 문의하기'
    },
    ja: {
      navPrecios: '料金', metaTitle: '展示会ブースの料金 | Standarte', metaDesc: '展示会ブースの設計・施工の目安料金：モジュール型ブースからプレミアムなターンキー案件まで、全範囲を「〜から」で掲載。',
      heroTitle: '料金', from: '',
      intro: 'モジュール型ブースから大型のターンキー案件まで、全範囲に対応します。以下はおおよその目安となる「〜から」の料金です。最終的なお見積りは、面積・デザイン・サービス内容によって異なります。',
      tiers: {
        modular: { name: 'モジュール型ブース', desc: '再利用可能で短時間に設営できるシステム。中小規模の展示会や定期出展に最適です。' },
        medida: { name: 'オーダーメイドブース', desc: '自社木工房による100%カスタム設計。カタログの制約はありません。' },
        premium: { name: 'プレミアムブース', desc: '大型・二層構造、上質な素材とこだわりの照明で、最大のインパクトを実現します。' },
        singular: { name: '特別プロジェクト', desc: '国際展示会を含め、一貫したマネジメントによる唯一無二のブースや大型イベント。' }
      },
      disclaimer: '目安料金（税抜）です。最終的なお見積りは、面積・デザイン・ご依頼内容に応じて調整します。',
      cta: 'オーダーメイドのお見積りを依頼する'
    }
  };

  // Campos SEO adicionales (H1 keyword, "cuánto cuesta", factores y FAQ) por idioma.
  const extraData = {
    "es": {
      "h1": "Precios de stands para ferias",
      "costQuestion": "¿Cuánto cuesta un stand de feria?",
      "costAnswer": "No hay un precio único. El coste de un stand depende sobre todo de los metros cuadrados, del tipo de stand (modular, a medida o premium) y de los servicios incluidos, además de la ciudad y la región de la feria. Por eso mostramos un precio orientativo «desde» en cada tramo: para una cifra ajustada a tu proyecto, lo más rápido es pedirnos un presupuesto en 24 h.",
      "factorsTitle": "¿Qué influye en el precio de un stand?",
      "factors": [
        "Metros cuadrados y tipo de planta: en línea, esquina, isla o doble altura.",
        "Nivel de personalización: sistema modular reutilizable o carpintería 100% a medida.",
        "Materiales y acabados: melamina, madera noble, metacrilato, vinilos e iluminación.",
        "Servicios incluidos: diseño 3D, mobiliario, audiovisuales, gráfica y almacenaje.",
        "Logística: transporte, montaje y desmontaje, y la ciudad o el país de la feria."
      ],
      "faqTitle": "Preguntas frecuentes sobre precios",
      "faqs": [
        {
          "q": "¿Cuánto cuesta un stand de feria pequeño?",
          "a": "Para una feria pequeña o media, un stand modular reutilizable es la opción más económica y de montaje rápido; es el punto de partida de nuestra gama. El precio final depende de los metros cuadrados y de los servicios que incluyas."
        },
        {
          "q": "¿Qué incluye el precio de un stand a medida?",
          "a": "Nuestros stands a medida son llave en mano: incluyen diseño 3D, fabricación en taller propio, transporte, montaje y desmontaje, instalación eléctrica y gráfica. El mobiliario y los audiovisuales se ajustan a cada proyecto."
        },
        {
          "q": "¿El precio del stand incluye el montaje y el transporte?",
          "a": "Sí. Trabajamos llave en mano: el presupuesto contempla el transporte, el montaje con equipo propio, el desmontaje y las gestiones técnicas del recinto, para que solo tengas que presentarte el primer día del evento."
        },
        {
          "q": "¿Es mejor alquilar o comprar el stand?",
          "a": "Para una presencia puntual, el stand modular reutilizable amortiza muy bien. Si participas en varias ferias al año o buscas una imagen única, un stand a medida ofrece más impacto y se rentabiliza a medio plazo. Te asesoramos según tu calendario ferial."
        },
        {
          "q": "¿Cuánto cuesta un stand por metro cuadrado?",
          "a": "El precio por metro cuadrado varía según el tipo de stand, los materiales y la ciudad de la feria. Por eso damos cifras «desde» por tramo y ajustamos el coste por m² en el presupuesto a medida."
        }
      ]
    },
    "en": {
      "h1": "Exhibition stand prices",
      "costQuestion": "How much does an exhibition stand cost?",
      "costAnswer": "There is no single price. The cost of an exhibition stand depends mainly on the floor space in square metres, the type of stand (modular, custom-built or premium) and the services included, as well as the city and region where the trade fair is held. That is why we show a guide \"from\" price for each tier: for a figure tailored to your project, the quickest route is to request a quote from us within 24 hours.",
      "factorsTitle": "What affects the price of an exhibition stand?",
      "factors": [
        "Square metres and stand layout: in-line, corner, island or double-deck.",
        "Level of customisation: a reusable modular system or fully bespoke joinery built from scratch.",
        "Materials and finishes: melamine, hardwood, acrylic, vinyl graphics and lighting.",
        "Services included: 3D design, furniture, AV equipment, graphics and storage.",
        "Logistics: transport, build-up and dismantling, and the city or country of the fair."
      ],
      "faqTitle": "Frequently asked questions about pricing",
      "faqs": [
        {
          "q": "How much does a small exhibition stand cost?",
          "a": "For a small or mid-sized trade fair, a reusable modular stand is the most cost-effective option and the quickest to assemble; it is the entry point of our range. The final price depends on the square metres and the services you choose to include."
        },
        {
          "q": "What does the price of a custom-built stand include?",
          "a": "Our custom-built stands are turnkey: they include 3D design, manufacturing in our own workshop, transport, build-up and dismantling, electrical installation and graphics. Furniture and AV equipment are tailored to each project."
        },
        {
          "q": "Does the stand price include build-up and transport?",
          "a": "Yes. We work on a turnkey basis: the quote covers transport, build-up by our own team, dismantling and the venue's technical paperwork, so all you have to do is turn up on the first day of the event."
        },
        {
          "q": "Is it better to hire or buy a stand?",
          "a": "For a one-off appearance, a reusable modular stand pays for itself very well. If you exhibit at several fairs a year or want a one-of-a-kind look, a custom-built stand delivers more impact and pays off over the medium term. We will advise you based on your trade fair calendar."
        },
        {
          "q": "How much does a stand cost per square metre?",
          "a": "The price per square metre varies according to the type of stand, the materials and the city of the fair. That is why we give \"from\" figures by tier and fine-tune the cost per m2 in your bespoke quote."
        }
      ]
    },
    "de": {
      "h1": "Preise für Messestände",
      "costQuestion": "Was kostet ein Messestand?",
      "costAnswer": "Einen Einheitspreis gibt es nicht. Die Kosten für einen Messestand hängen vor allem von der Standfläche in Quadratmetern, der Standart (modular, maßgefertigt oder Premium) und den enthaltenen Leistungen ab, dazu von Messestadt und Region. Deshalb nennen wir je Kategorie einen orientierenden Preis «ab». Für eine genaue, auf Ihr Projekt zugeschnittene Zahl ist ein Angebot innerhalb von 24 Stunden der schnellste Weg.",
      "factorsTitle": "Was beeinflusst den Preis eines Messestands?",
      "factors": [
        "Quadratmeter und Standtyp: Reihenstand, Eckstand, Kopf- oder Inselstand sowie doppelstöckige Lösungen.",
        "Grad der Individualisierung: wiederverwendbares Modulsystem oder 100 % maßgefertigter Standbau.",
        "Materialien und Oberflächen: Melamin, Echtholz, Acrylglas, Folierungen und Beleuchtung.",
        "Enthaltene Leistungen: 3D-Design, Mobiliar, Audio- und Videotechnik, Grafik und Einlagerung.",
        "Logistik: Transport, Auf- und Abbau sowie die Stadt oder das Land der Messe."
      ],
      "faqTitle": "Häufige Fragen zu den Preisen",
      "faqs": [
        {
          "q": "Was kostet ein kleiner Messestand?",
          "a": "Für kleine bis mittlere Messen ist ein wiederverwendbarer Modulstand die günstigste Variante mit schnellem Aufbau und der Einstieg in unser Programm. Der Endpreis richtet sich nach den Quadratmetern und den von Ihnen gewählten Leistungen."
        },
        {
          "q": "Was ist im Preis eines maßgefertigten Messestands enthalten?",
          "a": "Unsere maßgefertigten Stände sind schlüsselfertig: enthalten sind 3D-Design, Fertigung in der eigenen Werkstatt, Transport, Auf- und Abbau, Elektroinstallation und Grafik. Mobiliar und Medientechnik werden individuell auf jedes Projekt abgestimmt."
        },
        {
          "q": "Sind Aufbau und Transport im Standpreis enthalten?",
          "a": "Ja. Wir arbeiten schlüsselfertig: Das Angebot umfasst Transport, Aufbau mit eigenem Team, Abbau und die technische Abwicklung mit dem Messegelände, sodass Sie nur am ersten Veranstaltungstag erscheinen müssen."
        },
        {
          "q": "Ist es besser, den Messestand zu mieten oder zu kaufen?",
          "a": "Für einen einmaligen Auftritt rechnet sich ein wiederverwendbarer Modulstand sehr gut. Wer mehrmals im Jahr ausstellt oder einen unverwechselbaren Auftritt sucht, erzielt mit einem maßgefertigten Stand mehr Wirkung, der sich mittelfristig amortisiert. Wir beraten Sie passend zu Ihrem Messekalender."
        },
        {
          "q": "Was kostet ein Messestand pro Quadratmeter?",
          "a": "Der Quadratmeterpreis variiert je nach Standtyp, Materialien und Messestadt. Deshalb nennen wir «ab»-Preise je Kategorie und kalkulieren die Kosten pro m² im individuellen Angebot genau aus."
        }
      ]
    },
    "pt": {
      "h1": "Preços de stands para feiras",
      "costQuestion": "Quanto custa um stand de feira?",
      "costAnswer": "Não existe um preço único. O custo de um stand depende sobretudo dos metros quadrados, do tipo de stand (modular, à medida ou premium) e dos serviços incluídos, para além da cidade e da região da feira. Por isso indicamos um preço orientativo «desde» em cada escalão: para um valor ajustado ao seu projeto, o mais rápido é pedir-nos um orçamento em 24 h.",
      "factorsTitle": "O que influencia o preço de um stand?",
      "factors": [
        "Metros quadrados e tipo de implantação: em banda, de gaveto, em ilha ou de duplo piso.",
        "Nível de personalização: sistema modular reutilizável ou carpintaria 100% à medida.",
        "Materiais e acabamentos: melamina, madeira nobre, acrílico, vinis e iluminação.",
        "Serviços incluídos: design 3D, mobiliário, audiovisuais, grafismo e armazenagem.",
        "Logística: transporte, montagem e desmontagem, e a cidade ou o país da feira."
      ],
      "faqTitle": "Perguntas frequentes sobre preços",
      "faqs": [
        {
          "q": "Quanto custa um stand de feira pequeno?",
          "a": "Para uma feira pequena ou média, um stand modular reutilizável é a opção mais económica e de montagem rápida; é o ponto de partida da nossa gama. O preço final depende dos metros quadrados e dos serviços que incluir."
        },
        {
          "q": "O que inclui o preço de um stand à medida?",
          "a": "Os nossos stands à medida são chave na mão: incluem design 3D, fabrico em oficina própria, transporte, montagem e desmontagem, instalação elétrica e grafismo. O mobiliário e os audiovisuais ajustam-se a cada projeto."
        },
        {
          "q": "O preço do stand inclui a montagem e o transporte?",
          "a": "Sim. Trabalhamos em regime chave na mão: o orçamento contempla o transporte, a montagem com equipa própria, a desmontagem e as gestões técnicas do recinto, para que só tenha de se apresentar no primeiro dia do evento."
        },
        {
          "q": "É melhor alugar ou comprar o stand?",
          "a": "Para uma presença pontual, o stand modular reutilizável amortiza muito bem. Se participa em várias feiras por ano ou procura uma imagem única, um stand à medida oferece mais impacto e rentabiliza-se a médio prazo. Aconselhamo-lo de acordo com o seu calendário de feiras."
        },
        {
          "q": "Quanto custa um stand por metro quadrado?",
          "a": "O preço por metro quadrado varia consoante o tipo de stand, os materiais e a cidade da feira. Por isso damos valores «desde» por escalão e ajustamos o custo por m² no orçamento à medida."
        }
      ]
    },
    "fr": {
      "h1": "Tarifs de stands pour salons professionnels",
      "costQuestion": "Combien coûte un stand de salon ?",
      "costAnswer": "Il n'existe pas de prix unique. Le coût d'un stand dépend avant tout de la surface au sol, du type de stand (modulaire, sur mesure ou premium) et des prestations incluses, sans oublier la ville et la région où se tient le salon. C'est pourquoi nous indiquons un tarif indicatif « à partir de » pour chaque gamme : pour un chiffrage adapté à votre projet, le plus rapide reste de nous demander un devis sous 24 h.",
      "factorsTitle": "Qu'est-ce qui influe sur le prix d'un stand ?",
      "factors": [
        "Surface et configuration de l'emplacement : en ligne, en angle, en îlot ou à double étage.",
        "Niveau de personnalisation : système modulaire réutilisable ou menuiserie 100 % sur mesure.",
        "Matériaux et finitions : mélaminé, bois noble, plexiglas, adhésifs et éclairage.",
        "Prestations incluses : conception 3D, mobilier, audiovisuel, signalétique et stockage.",
        "Logistique : transport, montage et démontage, ainsi que la ville ou le pays du salon."
      ],
      "faqTitle": "Questions fréquentes sur les tarifs",
      "faqs": [
        {
          "q": "Combien coûte un petit stand de salon ?",
          "a": "Pour un salon de petite ou moyenne envergure, le stand modulaire réutilisable est l'option la plus économique et la plus rapide à monter ; c'est le point d'entrée de notre gamme. Le prix final dépend de la surface et des prestations que vous y intégrez."
        },
        {
          "q": "Que comprend le prix d'un stand sur mesure ?",
          "a": "Nos stands sur mesure sont clé en main : ils comprennent la conception 3D, la fabrication dans notre propre atelier, le transport, le montage et le démontage, l'installation électrique et la signalétique. Le mobilier et l'audiovisuel sont adaptés à chaque projet."
        },
        {
          "q": "Le prix du stand inclut-il le montage et le transport ?",
          "a": "Oui. Nous travaillons en clé en main : le devis intègre le transport, le montage assuré par notre propre équipe, le démontage et les démarches techniques auprès du parc des expositions, pour que vous n'ayez plus qu'à vous présenter le premier jour de l'événement."
        },
        {
          "q": "Vaut-il mieux louer ou acheter son stand ?",
          "a": "Pour une présence ponctuelle, le stand modulaire réutilisable est très vite rentabilisé. Si vous participez à plusieurs salons par an ou recherchez une image unique, le stand sur mesure offre davantage d'impact et s'amortit à moyen terme. Nous vous conseillons en fonction de votre calendrier d'expositions."
        },
        {
          "q": "Combien coûte un stand au mètre carré ?",
          "a": "Le prix au mètre carré varie selon le type de stand, les matériaux et la ville du salon. C'est pourquoi nous communiquons des tarifs « à partir de » par gamme et ajustons le coût au m² dans le devis sur mesure."
        }
      ]
    },
    "it": {
      "h1": "Prezzi di stand fieristici",
      "costQuestion": "Quanto costa uno stand fieristico?",
      "costAnswer": "Non esiste un prezzo unico. Il costo di uno stand dipende soprattutto dai metri quadri, dalla tipologia (modulare, su misura o premium) e dai servizi inclusi, oltre che dalla città e dalla regione della fiera. Per questo indichiamo un prezzo orientativo «a partire da» per ogni fascia: per una cifra precisa sul tuo progetto, la via più rapida è richiederci un preventivo entro 24 ore.",
      "factorsTitle": "Cosa influisce sul prezzo di uno stand fieristico?",
      "factors": [
        "Metri quadri e tipo di pianta: in linea, ad angolo, a isola o a doppia altezza.",
        "Livello di personalizzazione: sistema modulare riutilizzabile oppure allestimento 100% su misura.",
        "Materiali e finiture: melaminico, legno pregiato, plexiglass, grafiche adesive e illuminazione.",
        "Servizi inclusi: progettazione 3D, arredo, audiovisivi, grafica e stoccaggio.",
        "Logistica: trasporto, montaggio e smontaggio, e la città o il Paese della fiera."
      ],
      "faqTitle": "Domande frequenti sui prezzi",
      "faqs": [
        {
          "q": "Quanto costa uno stand fieristico piccolo?",
          "a": "Per una fiera piccola o media, uno stand modulare riutilizzabile è la soluzione più economica e dal montaggio rapido: è il punto di partenza della nostra gamma. Il prezzo finale dipende dai metri quadri e dai servizi che decidi di includere."
        },
        {
          "q": "Cosa comprende il prezzo di uno stand su misura?",
          "a": "I nostri stand su misura sono chiavi in mano: includono progettazione 3D, realizzazione nella nostra officina propria, trasporto, montaggio e smontaggio, impianto elettrico e grafica. Arredo e audiovisivi vengono adattati a ogni singolo progetto."
        },
        {
          "q": "Il prezzo dello stand comprende montaggio e trasporto?",
          "a": "Sì. Lavoriamo chiavi in mano: il preventivo include il trasporto, il montaggio con team interno, lo smontaggio e le pratiche tecniche con il quartiere fieristico, così devi solo presentarti il primo giorno dell'evento."
        },
        {
          "q": "Meglio noleggiare o acquistare lo stand?",
          "a": "Per una presenza occasionale, lo stand modulare riutilizzabile si ammortizza molto bene. Se partecipi a più fiere all'anno o cerchi un'immagine unica, uno stand su misura offre maggiore impatto e si ripaga nel medio termine. Ti consigliamo la scelta migliore in base al tuo calendario fieristico."
        },
        {
          "q": "Quanto costa uno stand fieristico al metro quadro?",
          "a": "Il prezzo al metro quadro varia in base alla tipologia di stand, ai materiali e alla città della fiera. Per questo indichiamo cifre «a partire da» per ogni fascia e definiamo il costo al m² nel preventivo su misura."
        }
      ]
    },
    "nl": {
      "h1": "Prijzen van beursstands",
      "costQuestion": "Wat kost een beursstand?",
      "costAnswer": "Er bestaat geen vaste prijs. Wat een beursstand kost, hangt vooral af van het aantal vierkante meters, het type stand (modulair, op maat of premium) en de inbegrepen diensten, plus de stad en regio waar de beurs plaatsvindt. Daarom tonen we per categorie een indicatieve vanafprijs. Voor een bedrag dat exact op jouw project is afgestemd, vraag je het snelst een offerte aan die je binnen 24 uur ontvangt.",
      "factorsTitle": "Wat bepaalt de prijs van een beursstand?",
      "factors": [
        "Aantal vierkante meters en standpositie: rij, hoek, eiland of dubbele bouwhoogte.",
        "Mate van maatwerk: een herbruikbaar modulair systeem of volledig op maat gebouwd schrijnwerk.",
        "Materialen en afwerking: melamine, edelhout, plexiglas, vinyls en verlichting.",
        "Inbegrepen diensten: 3D-ontwerp, meubilair, audiovisuele middelen, grafiek en opslag.",
        "Logistiek: transport, op- en afbouw, en de stad of het land van de beurs."
      ],
      "faqTitle": "Veelgestelde vragen over prijzen",
      "faqs": [
        {
          "q": "Wat kost een kleine beursstand?",
          "a": "Voor een kleine of middelgrote beurs is een herbruikbare modulaire stand de voordeligste optie met de snelste opbouw; het is het instapniveau van ons aanbod. De uiteindelijke prijs hangt af van het aantal vierkante meters en de diensten die je toevoegt."
        },
        {
          "q": "Wat zit er in de prijs van een stand op maat?",
          "a": "Onze stands op maat zijn sleutelklaar: inclusief 3D-ontwerp, productie in onze eigen werkplaats, transport, op- en afbouw, elektrische installatie en grafiek. Het meubilair en de audiovisuele middelen stemmen we af op elk project."
        },
        {
          "q": "Zijn op- en afbouw en transport bij de standprijs inbegrepen?",
          "a": "Ja. We werken sleutelklaar: de offerte omvat transport, opbouw met een eigen team, afbouw en de technische formaliteiten van het beurscomplex, zodat jij alleen op de eerste dag van het evenement hoeft te verschijnen."
        },
        {
          "q": "Is een stand huren of kopen beter?",
          "a": "Voor een eenmalige deelname rendeert een herbruikbare modulaire stand uitstekend. Neem je meerdere keren per jaar deel aan beurzen of wil je een unieke uitstraling, dan biedt een stand op maat meer impact en betaalt die zich op middellange termijn terug. We adviseren je op basis van je beurskalender."
        },
        {
          "q": "Wat kost een beursstand per vierkante meter?",
          "a": "De prijs per vierkante meter verschilt naargelang het type stand, de materialen en de stad van de beurs. Daarom geven we vanafprijzen per categorie en bepalen we de kostprijs per m2 in de offerte op maat."
        }
      ]
    },
    "zh": {
      "h1": "展台价格：西班牙与葡萄牙展位搭建报价",
      "costQuestion": "展台搭建多少钱？",
      "costAnswer": "展台没有统一价格。搭建费用主要取决于展位面积、展台类型（模块化、定制或高端）以及所含服务，同时也与展会所在城市和地区有关。因此我们在每个档位都提供「起步价」作为参考；想获得贴合您项目的精准报价，最快的方式是向我们索取报价，24 小时内回复。",
      "factorsTitle": "影响展台价格的因素有哪些？",
      "factors": [
        "展位面积与展位形式：一面开口、转角、岛形或双层结构。",
        "定制程度：可重复使用的模块化系统，还是 100% 定制木作。",
        "材料与工艺：三聚氰胺板、实木、亚克力、贴膜及灯光照明。",
        "所含服务：3D 设计、家具、视听设备、画面图文与仓储。",
        "物流配套：运输、搭建与拆卸，以及展会所在城市或国家。"
      ],
      "faqTitle": "关于展台价格的常见问题",
      "faqs": [
        {
          "q": "小型展台搭建多少钱？",
          "a": "对于中小型展会，可重复使用的模块化展台是最经济、搭建最快的选择，也是我们产品系列的入门档位。最终价格取决于展位面积和您所选的服务内容。"
        },
        {
          "q": "定制展台的价格包含哪些内容？",
          "a": "我们的定制展台采用交钥匙模式，包含 3D 设计、自有工厂生产、运输、搭建与拆卸、电气安装及图文画面。家具与视听设备则根据每个项目量身配置。"
        },
        {
          "q": "展台价格是否包含搭建和运输？",
          "a": "包含。我们提供交钥匙服务：报价已涵盖运输、自有团队搭建、拆卸以及展馆的技术报批手续，让您在开展首日只需到场即可。"
        },
        {
          "q": "展台是租赁还是购买更划算？",
          "a": "如果只是单次参展，可重复使用的模块化展台性价比很高。若您每年参加多场展会或追求独特的品牌形象，定制展台更具冲击力，中期即可收回成本。我们会根据您的参展日程提供建议。"
        },
        {
          "q": "展台每平方米多少钱？",
          "a": "每平方米的价格因展台类型、材料和展会所在城市而异。因此我们按档位给出「起步价」，并在定制报价中精确核算每平方米成本。"
        }
      ]
    },
    "hi": {
      "h1": "प्रदर्शनी स्टैंड के मूल्य",
      "costQuestion": "प्रदर्शनी स्टैंड की कीमत कितनी होती है?",
      "costAnswer": "स्टॉल बनाने का खर्च किसी एक तय कीमत में नहीं बंधा होता। प्रदर्शनी स्टैंड की कीमत मुख्य रूप से उसके वर्ग मीटर क्षेत्रफल, स्टैंड के प्रकार (मॉड्यूलर, कस्टम यानी अपनी आवश्यकता के अनुसार बना, या प्रीमियम) और शामिल सेवाओं पर निर्भर करती है, साथ ही मेले के शहर और क्षेत्र पर भी। इसीलिए हम हर श्रेणी में एक संकेतात्मक «शुरुआती» मूल्य दिखाते हैं। आपके प्रोजेक्ट के अनुरूप सटीक आंकड़े के लिए सबसे तेज़ तरीका है हमसे 24 घंटे में मुफ़्त कोटेशन मंगवाना।",
      "factorsTitle": "स्टैंड की कीमत किन बातों पर निर्भर करती है?",
      "factors": [
        "वर्ग मीटर और लेआउट का प्रकार: इन-लाइन, कोने वाला, आइलैंड या डबल-हाइट डिज़ाइन।",
        "कस्टमाइज़ेशन का स्तर: दोबारा इस्तेमाल होने वाली मॉड्यूलर प्रणाली या 100% अपनी ज़रूरत के अनुसार बनी कारपेंट्री।",
        "सामग्री और फ़िनिश: मेलामाइन, बढ़िया लकड़ी, एक्रिलिक, विनाइल ग्राफ़िक्स और लाइटिंग।",
        "शामिल सेवाएं: 3D डिज़ाइन, फ़र्नीचर, ऑडियो-विज़ुअल, ग्राफ़िक्स और भंडारण।",
        "लॉजिस्टिक्स: परिवहन, इंस्टॉलेशन व डिसमेंटलिंग, तथा मेले का शहर या देश।"
      ],
      "faqTitle": "मूल्य से जुड़े अक्सर पूछे जाने वाले प्रश्न",
      "faqs": [
        {
          "q": "छोटे प्रदर्शनी स्टैंड की कीमत कितनी होती है?",
          "a": "छोटे या मध्यम आकार के मेले के लिए दोबारा इस्तेमाल होने वाला मॉड्यूलर स्टैंड सबसे किफ़ायती और जल्दी लगने वाला विकल्प है; यही हमारी रेंज का शुरुआती बिंदु है। अंतिम कीमत वर्ग मीटर और आपके द्वारा चुनी गई सेवाओं पर निर्भर करती है।"
        },
        {
          "q": "कस्टम स्टैंड की कीमत में क्या-क्या शामिल होता है?",
          "a": "हमारे कस्टम स्टैंड पूरी तरह टर्नकी होते हैं: इनमें 3D डिज़ाइन, हमारी अपनी कार्यशाला में निर्माण, परिवहन, इंस्टॉलेशन व डिसमेंटलिंग, बिजली का काम और ग्राफ़िक्स शामिल हैं। फ़र्नीचर और ऑडियो-विज़ुअल हर प्रोजेक्ट के अनुसार तय किए जाते हैं।"
        },
        {
          "q": "क्या स्टैंड की कीमत में इंस्टॉलेशन और परिवहन शामिल है?",
          "a": "हां। हम टर्नकी आधार पर काम करते हैं: कोटेशन में परिवहन, हमारी अपनी टीम द्वारा इंस्टॉलेशन, डिसमेंटलिंग और प्रदर्शनी स्थल की तकनीकी औपचारिकताएं शामिल होती हैं, ताकि आपको बस आयोजन के पहले दिन पहुंचना हो।"
        },
        {
          "q": "स्टैंड किराए पर लेना बेहतर है या खरीदना?",
          "a": "किसी एक-बार की उपस्थिति के लिए दोबारा इस्तेमाल होने वाला मॉड्यूलर स्टैंड बहुत किफ़ायती रहता है। यदि आप साल में कई मेलों में भाग लेते हैं या एक विशिष्ट छवि चाहते हैं, तो कस्टम स्टैंड ज़्यादा प्रभाव देता है और मध्यम अवधि में लागत वसूल हो जाती है। हम आपके प्रदर्शनी कैलेंडर के अनुसार सलाह देते हैं।"
        },
        {
          "q": "प्रति वर्ग मीटर स्टैंड की कीमत कितनी होती है?",
          "a": "प्रति वर्ग मीटर कीमत स्टैंड के प्रकार, सामग्री और मेले के शहर के अनुसार बदलती रहती है। इसीलिए हम हर श्रेणी के लिए «शुरुआती» आंकड़े देते हैं और कस्टम कोटेशन में प्रति वर्ग मीटर लागत को आपके प्रोजेक्ट के अनुसार तय करते हैं।"
        }
      ]
    },
    "ko": {
      "h1": "전시 부스 가격",
      "costQuestion": "전시 부스 제작 비용은 얼마인가요?",
      "costAnswer": "전시 부스 가격은 정해진 단일 금액이 없습니다. 비용은 부스 면적(㎡), 부스 유형(모듈형, 맞춤형, 프리미엄), 포함 서비스 구성에 따라 달라지며, 박람회가 열리는 도시와 지역의 조건도 영향을 미칩니다. 그래서 각 등급마다 '최저가' 기준의 참고 가격을 안내해 드리고 있습니다. 프로젝트에 딱 맞는 정확한 견적이 필요하시면 24시간 이내 무료 견적을 받아보시는 것이 가장 빠릅니다.",
      "factorsTitle": "전시 부스 가격을 결정하는 요인은?",
      "factors": [
        "부스 면적과 위치 유형: 일렬형, 코너형, 아일랜드형, 복층 구조에 따라 비용이 달라집니다.",
        "맞춤화 수준: 재사용 가능한 모듈형 시스템부터 100% 맞춤 제작 목공 부스까지 선택할 수 있습니다.",
        "자재와 마감: 멜라민, 원목, 아크릴, 그래픽 시트, 조명 등 자재 등급에 따라 가격 차이가 발생합니다.",
        "포함 서비스: 3D 디자인, 가구, 영상·음향 장비, 그래픽, 보관 서비스 등이 포함됩니다.",
        "물류: 운송, 설치·철거 작업, 그리고 박람회가 열리는 도시와 국가가 비용에 반영됩니다."
      ],
      "faqTitle": "전시 부스 가격에 대한 자주 묻는 질문",
      "faqs": [
        {
          "q": "소형 전시 부스 비용은 얼마인가요?",
          "a": "소규모나 중규모 박람회에는 재사용이 가능한 모듈형 부스가 가장 경제적이고 설치도 빠릅니다. 저희 라인업의 기본 옵션이기도 합니다. 최종 가격은 부스 면적과 포함하시는 서비스 구성에 따라 결정됩니다."
        },
        {
          "q": "맞춤형 부스 가격에는 무엇이 포함되나요?",
          "a": "맞춤형 부스는 턴키(Turnkey) 방식으로 제공됩니다. 3D 디자인, 자체 공장 제작, 운송, 설치·철거, 전기 시공, 그래픽이 모두 포함됩니다. 가구와 영상·음향 장비는 각 프로젝트에 맞춰 구성됩니다."
        },
        {
          "q": "부스 가격에 설치와 운송이 포함되나요?",
          "a": "네, 포함됩니다. 저희는 턴키 방식으로 진행하므로 견적에 운송, 자체 인력을 통한 설치, 철거, 전시장 기술 행정 처리까지 포함됩니다. 고객님은 행사 첫날 현장에 도착하기만 하면 됩니다."
        },
        {
          "q": "부스는 임대가 좋을까요, 구매가 좋을까요?",
          "a": "일회성 참가라면 재사용 가능한 모듈형 부스가 비용 효율이 매우 뛰어납니다. 연간 여러 박람회에 참가하거나 차별화된 브랜드 이미지를 원하신다면, 맞춤형 부스가 더 강한 임팩트를 주고 중기적으로 투자 대비 효과가 좋습니다. 박람회 일정에 맞춰 컨설팅해 드립니다."
        },
        {
          "q": "전시 부스 1㎡당 가격은 얼마인가요?",
          "a": "㎡당 단가는 부스 유형, 자재, 박람회 도시에 따라 달라집니다. 그래서 등급별로 '최저가' 기준 가격을 안내하고, 맞춤 견적에서 ㎡당 비용을 정확히 산정해 드립니다."
        }
      ]
    },
    "ja": {
      "h1": "展示会ブースの料金・費用ガイド",
      "costQuestion": "展示会ブースの費用はどれくらいですか？",
      "costAnswer": "ブースの費用に決まった定価はありません。料金は主に小間面積、ブースのタイプ（モジュール型・オーダーメイド・プレミアム）、含まれるサービス内容、そして会場となる都市や国によって変わります。そのため各プランには目安となる「〜から」の参考価格を掲載しています。お客様のプロジェクトに合わせた正確なお見積りは、24時間以内にお出しするのが一番の近道です。",
      "factorsTitle": "展示会ブースの料金を左右する要素",
      "factors": [
        "小間面積とブースの配置タイプ：壁面（列）・角・島型（アイランド）・2階建てなど。",
        "カスタマイズの度合い：繰り返し使えるモジュール型システムか、100%オーダーメイドの造作か。",
        "素材と仕上げ：メラミン、無垢材、アクリル、グラフィック、照明など。",
        "含まれるサービス：3D設計、什器、AV機器、グラフィック、保管など。",
        "ロジスティクス：輸送、設営・撤去、そして展示会が開催される都市や国。"
      ],
      "faqTitle": "料金に関するよくある質問",
      "faqs": [
        {
          "q": "小型の展示会ブースの費用はどれくらいですか？",
          "a": "小〜中規模の展示会には、繰り返し使えるモジュール型ブースが最も経済的で、設営もスピーディーです。これが当社ラインナップの出発点となります。最終的な費用は小間面積と含めるサービス内容によって決まります。"
        },
        {
          "q": "オーダーメイドブースの料金には何が含まれますか？",
          "a": "当社のオーダーメイドブースはターンキー方式です。3D設計、自社工房での製作、輸送、設営・撤去、電気工事、グラフィックまでを含みます。什器やAV機器は各プロジェクトに合わせて調整します。"
        },
        {
          "q": "ブースの料金には設営や輸送も含まれますか？",
          "a": "はい。当社はターンキー方式で対応します。お見積りには輸送、自社チームによる設営、撤去、会場の技術的な手続きまで含まれているため、お客様は初日に会場へお越しいただくだけで済みます。"
        },
        {
          "q": "ブースはレンタルと購入のどちらが良いですか？",
          "a": "単発の出展であれば、繰り返し使えるモジュール型ブースが費用対効果に優れています。年に複数の展示会に出展する場合や独自のブランドイメージを求める場合は、オーダーメイドブースの方がインパクトが高く、中期的に投資を回収できます。出展スケジュールに応じてご提案します。"
        },
        {
          "q": "展示会ブースは1平方メートルあたりいくらですか？",
          "a": "1平方メートルあたりの単価は、ブースのタイプ、素材、開催都市によって変動します。そのためプランごとに「〜から」の目安をお示しし、オーダーメイドのお見積りでm²単価を調整します。"
        }
      ]
    }
  };

  $: t = { ...(texts[lang] || texts.es), ...(extraData[lang] || extraData.es) };
  // Sufijo de moneda: "X €" salvo en idiomas que anteponen (ja usa "から" tras la cifra).
  $: priceStr = (n) => lang === 'ja' ? `${fmt(n)} €から` : `${t.from} ${fmt(n)} €`.trim();

  const ctaLabels = {
    es: 'Presupuesto en 24h', en: 'Quote in 24h', de: 'Angebot in 24 Std.', pt: 'Orçamento em 24h', fr: 'Devis en 24h',
    it: 'Preventivo in 24h', nl: 'Offerte in 24u', zh: '24小时报价', hi: '24 घंटे में कोटेशन', ko: '24시간 내 견적', ja: '24時間で見積もり'
  };

  // Datos estructurados: rango de precios (Product + AggregateOffer, derivado de los
  // propios tramos para mantenerse sincronizado) + FAQ (FAQPage). Se inyecta en <head>.
  $: priceValues = tiers.map((x) => x.priceFrom);
  $: jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: t.h1,
        description: t.metaDesc,
        serviceType: t.h1,
        provider: { '@type': 'Organization', name: 'Standarte', url: 'https://standarte.es' },
        areaServed: ['ES', 'PT'],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: Math.min(...priceValues),
          highPrice: Math.max(...priceValues),
          offerCount: tiers.length
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };
  $: jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<` + '/script>';
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href={canonical} />
  {#each languages as alt}
    <link rel="alternate" hreflang={alt} href={`https://standarte.es${pathFor(alt, 'precios')}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', 'precios')}`} />
  {@html jsonLdScript}
</svelte:head>

<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    </div>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')}>{copy.nav.services}</a>
      <a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')} class="active">{t.navPrecios}</a>
      <a href={pathFor(lang, 'proyecto_auditado')}>{uspNavLabel(lang)}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaBudget(lang).main}<span class="cta-24h">{ctaBudget(lang).h24}</span></a>
    </div>
  </nav>
  <div class="hero-subpage">
    <div class="hero-contents">
      <h1>{t.h1}</h1>
    </div>
    <AiSourceButtons {lang} variant="hero" canReactivate on:reactivate={reopenAdvisor} />
  </div>
</header>

{#if showWelcomeAdvisor && AdvisorComponent}
  <svelte:component this={AdvisorComponent} {lang}
    on:openPrivacy={() => (typeof window !== 'undefined' && window.open('/privacidad', '_blank', 'noopener'))}
    on:dismiss={() => (showWelcomeAdvisor = false)} />
{/if}

<main class="precios-page">
  <p class="precios-intro">{t.intro}</p>

  <div class="precios-grid">
    {#each tiers as tier}
      <article class="precio-card">
        <h2>{t.tiers[tier.key].name}</h2>
        <p class="precio-amount">{priceStr(tier.priceFrom)}</p>
        <p class="precio-desc">{t.tiers[tier.key].desc}</p>
      </article>
    {/each}
  </div>

  <p class="precios-disclaimer">{t.disclaimer}</p>

  <section class="precios-cost">
    <h2>{t.costQuestion}</h2>
    <p>{t.costAnswer}</p>
  </section>

  <section class="precios-factors">
    <h2>{t.factorsTitle}</h2>
    <ul>
      {#each t.factors as factor}
        <li>{factor}</li>
      {/each}
    </ul>
  </section>

  <section class="precios-faq">
    <h2>{t.faqTitle}</h2>
    <dl>
      {#each t.faqs as f}
        <dt>{f.q}</dt>
        <dd>{f.a}</dd>
      {/each}
    </dl>
  </section>
</main>

<!-- Formulario de cálculo de presupuesto (asistente): al final de la página. -->
<ContactForm labels={copy} {lang} variant="light" />

<SiteFooter {lang} {copy} langHref={(option) => pathFor(option, 'precios')} />

<style>
  /* Todo el fondo del cuerpo de la página en #f7f6f1 (también los laterales fuera del
     contenedor centrado y el área de overscroll). */
  :global(html:has(.precios-page)),
  :global(html:has(.precios-page) body) {
    background-color: #f7f6f1;
  }

  .precios-page {
    max-width: var(--container);
    margin: 0 auto;
    padding: 50px 15px 90px;
    background-color: #f7f6f1;
  }
  .precios-intro {
    max-width: 760px;
    margin: 0 auto 40px;
    text-align: center;
    font-size: 17px;
    line-height: 1.6;
    color: #444;
  }
  .precios-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
  }
  @media (max-width: 1024px) { .precios-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .precios-grid { grid-template-columns: 1fr; } }
  .precio-card {
    background: #fff;
    border: 1px solid rgba(22, 25, 28, 0.06);
    border-radius: 12px;
    padding: 30px 24px;
    box-shadow: 0 8px 24px rgba(22, 25, 28, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .precio-card h2 {
    margin: 0;
    color: #444;
    font-family: 'Francois One', serif;
    font-weight: 400;
    font-size: 22px;
  }
  .precio-amount {
    margin: 0;
    color: #111;
    font-family: 'Francois One', serif;
    font-size: 26px;
  }
  .precio-desc {
    margin: 0;
    color: #555;
    font-size: 15px;
    line-height: 1.55;
  }
  .precios-disclaimer {
    max-width: 760px;
    margin: 34px auto 24px;
    text-align: center;
    font-size: 13px;
    color: #888;
    line-height: 1.5;
  }
  /* Secciones SEO: "cuánto cuesta", factores y FAQ */
  .precios-cost,
  .precios-factors,
  .precios-faq {
    max-width: 820px;
    margin: 48px auto 0;
  }
  .precios-cost h2,
  .precios-factors h2,
  .precios-faq h2 {
    color: #444;
    font-family: 'Francois One', serif;
    font-weight: 400;
    font-size: 24px;
    margin: 0 0 16px;
  }
  .precios-cost p {
    color: #555;
    font-size: 16px;
    line-height: 1.65;
    margin: 0;
  }
  .precios-factors ul {
    margin: 0;
    padding-left: 20px;
  }
  .precios-factors li {
    color: #555;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .precios-faq dt {
    color: #222;
    font-weight: 700;
    font-size: 16px;
    margin-top: 18px;
  }
  .precios-faq dd {
    margin: 6px 0 0;
    color: #555;
    font-size: 16px;
    line-height: 1.65;
  }
</style>
