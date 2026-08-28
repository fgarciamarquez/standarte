// Capa de marca: una misma estructura de datos y componentes, dos webs con
// identidad y objetivo comercial distintos. La marca activa se fija en el BUILD
// con la variable de entorno PUBLIC_BRAND:
//   - (sin definir) / 'standarte'  → standarte.es en OVH, la web actual. El
//     workflow de deploy no define la variable, así que nada cambia allí.
//   - 'standquote'                 → standquote.com en Vercel (captación de
//     leads para asociados). Mientras draft=true, TODAS las páginas emiten
//     noindex: visible solo tras la protección de despliegue de Vercel hasta
//     el visto bueno.
// Seguro en Vite (cliente/SSR) y en Node puro (scripts del build).
const fromVite = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PUBLIC_BRAND : undefined;
const fromNode = typeof process !== 'undefined' && process.env ? process.env.PUBLIC_BRAND : undefined;

const BRANDS = {
  standarte: {
    id: 'standarte',
    name: 'Standarte',
    origin: 'https://standarte.es',
    email: 'info@standarte.es',
    draft: false,
    leadGen: false
  },
  standquote: {
    id: 'standquote',
    name: 'StandQuote',
    origin: 'https://standquote.com',
    email: 'hello@standquote.com',
    draft: true,
    leadGen: true
  }
};

export const BRAND = BRANDS[fromVite || fromNode || 'standarte'] || BRANDS.standarte;
export const SITE_ORIGIN = BRAND.origin;

// Claim central de StandQuote (2026-08-27): la promesa del marketplace, presente en
// el hero de portada, en TODAS las meta descriptions (el texto que Google muestra
// bajo cada resultado), en el H2 destacado de las fichas de feria y en el título de
// la portada. Una sola fuente de verdad, en los 11 idiomas.
const SQ_CLAIM = {
  es: 'Recibe 3 propuestas para tu stand adaptadas a tu presupuesto',
  en: 'Get 3 stand proposals tailored to your budget',
  pt: 'Receba 3 propostas para o seu stand adaptadas ao seu orçamento',
  de: 'Erhalten Sie 3 Standvorschläge, angepasst an Ihr Budget',
  fr: 'Recevez 3 propositions de stand adaptées à votre budget',
  it: 'Ricevi 3 proposte per il tuo stand su misura per il tuo budget',
  nl: 'Ontvang 3 standvoorstellen op maat van uw budget',
  zh: '获取3个契合您预算的展台方案',
  hi: 'अपने बजट के अनुसार 3 स्टैंड प्रस्ताव प्राप्त करें',
  ko: '예산에 맞춘 3개의 부스 제안을 받아보세요',
  ja: 'ご予算に合わせた3つのブース提案をお届けします'
};
export const sqClaim = (lang) => SQ_CLAIM[lang] || SQ_CLAIM.es;
// El claim como arranque de frase (separador de oración según la lengua).
export const sqClaimLead = (lang) => sqClaim(lang) + (lang === 'zh' || lang === 'ja' ? '。' : '. ');

// Intro de la sección de ciudades en StandQuote: el mensaje de red del marketplace
// (los constructores trabajan CON nosotros) en lugar del mensaje de constructor.
const SQ_CITIES_INTRO = {
  es: 'Los mejores constructores de cada ciudad de España, Portugal, Francia y Marruecos trabajan con nosotros',
  en: 'The best stand builders in every city across Spain, Portugal, France and Morocco work with us',
  pt: 'Os melhores construtores de cada cidade de Espanha, Portugal, França e Marrocos trabalham connosco',
  de: 'Die besten Standbauer jeder Stadt in Spanien, Portugal, Frankreich und Marokko arbeiten mit uns',
  fr: "Les meilleurs constructeurs de stands de chaque ville d'Espagne, du Portugal, de France et du Maroc travaillent avec nous",
  it: 'I migliori costruttori di stand di ogni città di Spagna, Portogallo, Francia e Marocco lavorano con noi',
  nl: 'De beste standbouwers van elke stad in Spanje, Portugal, Frankrijk en Marokko werken met ons samen',
  zh: '西班牙、葡萄牙、法国和摩洛哥各城市最优秀的展台搭建商都与我们合作',
  hi: 'स्पेन, पुर्तगाल, फ्रांस और मोरक्को के हर शहर के सर्वश्रेष्ठ स्टैंड निर्माता हमारे साथ काम करते हैं',
  ko: '스페인, 포르투갈, 프랑스, 모로코 각 도시 최고의 부스 제작사들이 우리와 함께합니다',
  ja: 'スペイン、ポルトガル、フランス、モロッコ各都市の優良ブース施工会社が私たちと提携しています'
};
export const sqCitiesIntro = (lang) => SQ_CITIES_INTRO[lang] || SQ_CITIES_INTRO.es;

// Título del carrusel de proyectos 3D en StandQuote: en el marketplace los renders
// se presentan como muestras de las propuestas que recibe el cliente.
const SQ_PROPOSALS_TITLE = {
  es: 'Ejemplos de propuestas realizadas',
  en: 'Examples of delivered proposals',
  pt: 'Exemplos de propostas realizadas',
  de: 'Beispiele umgesetzter Vorschläge',
  fr: 'Exemples de propositions réalisées',
  it: 'Esempi di proposte realizzate',
  nl: 'Voorbeelden van gerealiseerde voorstellen',
  zh: '已完成方案示例',
  hi: 'पूर्ण किए गए प्रस्तावों के उदाहरण',
  ko: '완료된 제안 사례',
  ja: '実施済み提案の例'
};
export const sqProposalsTitle = (lang) => SQ_PROPOSALS_TITLE[lang] || SQ_PROPOSALS_TITLE.es;

// "Cómo funciona" del marketplace (fase 1 frente a Neventum): tres pasos + los
// distintivos de confianza. Solo afirmaciones honestas — nada de cifras inventadas.
const SQ_HOW = {
  es: { title: 'Cómo funciona', steps: [
      ['Cuéntanos tu stand', 'La feria, los metros y tu presupuesto, en un minuto.'],
      ['Seleccionamos 3 constructores', 'Verificados y con experiencia en tu ciudad y en tu feria.'],
      ['Compara y elige', 'Tres propuestas adaptadas a tu presupuesto. Tú decides.']
    ], badges: ['Constructores verificados', '3 propuestas comparables', 'Gratis y sin compromiso'] },
  en: { title: 'How it works', steps: [
      ['Tell us about your stand', 'The fair, the square metres and your budget — in one minute.'],
      ['We select 3 builders', 'Verified, with experience in your city and your fair.'],
      ['Compare and choose', 'Three proposals tailored to your budget. You decide.']
    ], badges: ['Verified builders', '3 comparable proposals', 'Free, no obligation'] },
  pt: { title: 'Como funciona', steps: [
      ['Fale-nos do seu stand', 'A feira, os metros e o seu orçamento, num minuto.'],
      ['Selecionamos 3 construtores', 'Verificados e com experiência na sua cidade e na sua feira.'],
      ['Compare e escolha', 'Três propostas adaptadas ao seu orçamento. Você decide.']
    ], badges: ['Construtores verificados', '3 propostas comparáveis', 'Grátis e sem compromisso'] },
  de: { title: 'So funktioniert es', steps: [
      ['Erzählen Sie uns von Ihrem Stand', 'Messe, Quadratmeter und Budget — in einer Minute.'],
      ['Wir wählen 3 Standbauer aus', 'Verifiziert, mit Erfahrung in Ihrer Stadt und auf Ihrer Messe.'],
      ['Vergleichen und wählen', 'Drei Vorschläge, angepasst an Ihr Budget. Sie entscheiden.']
    ], badges: ['Verifizierte Standbauer', '3 vergleichbare Vorschläge', 'Kostenlos und unverbindlich'] },
  fr: { title: 'Comment ça marche', steps: [
      ['Parlez-nous de votre stand', 'Le salon, les mètres carrés et votre budget, en une minute.'],
      ['Nous sélectionnons 3 constructeurs', 'Vérifiés, avec de l’expérience dans votre ville et votre salon.'],
      ['Comparez et choisissez', 'Trois propositions adaptées à votre budget. Vous décidez.']
    ], badges: ['Constructeurs vérifiés', '3 propositions comparables', 'Gratuit et sans engagement'] },
  it: { title: 'Come funziona', steps: [
      ['Raccontaci il tuo stand', 'La fiera, i metri quadri e il tuo budget, in un minuto.'],
      ['Selezioniamo 3 costruttori', 'Verificati e con esperienza nella tua città e nella tua fiera.'],
      ['Confronta e scegli', 'Tre proposte su misura per il tuo budget. Decidi tu.']
    ], badges: ['Costruttori verificati', '3 proposte comparabili', 'Gratis e senza impegno'] },
  nl: { title: 'Hoe het werkt', steps: [
      ['Vertel ons over uw stand', 'De beurs, de vierkante meters en uw budget — in één minuut.'],
      ['Wij selecteren 3 standbouwers', 'Geverifieerd, met ervaring in uw stad en op uw beurs.'],
      ['Vergelijk en kies', 'Drie voorstellen op maat van uw budget. U beslist.']
    ], badges: ['Geverifieerde standbouwers', '3 vergelijkbare voorstellen', 'Gratis en vrijblijvend'] },
  zh: { title: '如何运作', steps: [
      ['告诉我们您的展台需求', '展会、面积和预算，一分钟填写。'],
      ['我们甄选3家搭建商', '经过验证，熟悉您的城市和展会。'],
      ['比较并选择', '3个契合您预算的方案，由您决定。']
    ], badges: ['经过验证的搭建商', '3个可比方案', '免费且无义务'] },
  hi: { title: 'यह कैसे काम करता है', steps: [
      ['अपने स्टैंड के बारे में बताएं', 'मेला, क्षेत्रफल और बजट — एक मिनट में।'],
      ['हम 3 निर्माता चुनते हैं', 'सत्यापित, आपके शहर और मेले के अनुभव के साथ।'],
      ['तुलना करें और चुनें', 'आपके बजट के अनुसार 3 प्रस्ताव। निर्णय आपका।']
    ], badges: ['सत्यापित निर्माता', '3 तुलनीय प्रस्ताव', 'मुफ़्त और बिना बाध्यता'] },
  ko: { title: '이용 방법', steps: [
      ['부스에 대해 알려주세요', '박람회, 면적, 예산 — 1분이면 충분합니다.'],
      ['3개 제작사를 선정합니다', '검증된 업체, 해당 도시와 박람회 경험 보유.'],
      ['비교하고 선택하세요', '예산에 맞춘 3개의 제안. 결정은 고객의 몫입니다.']
    ], badges: ['검증된 제작사', '비교 가능한 3개 제안', '무료·무의무'] },
  ja: { title: 'ご利用の流れ', steps: [
      ['ブースについて教えてください', '展示会・面積・ご予算を1分で入力。'],
      ['3社の施工会社を選定', '認証済みで、その都市と展示会の経験を持つ会社です。'],
      ['比較して選ぶ', 'ご予算に合わせた3つの提案。決めるのはお客様です。']
    ], badges: ['認証済み施工会社', '比較できる3つの提案', '無料・義務なし'] }
};
export const sqHow = (lang) => SQ_HOW[lang] || SQ_HOW.es;

// Opción de menú "Login/Registro" (acceso de constructores asociados, fase 2).
const SQ_LOGIN = {
  es: 'Login/Registro', en: 'Login/Sign up', pt: 'Login/Registo', de: 'Login/Registrierung',
  fr: 'Connexion/Inscription', it: 'Login/Registrazione', nl: 'Inloggen/Registreren',
  zh: '登录/注册', hi: 'लॉगिन/पंजीकरण', ko: '로그인/가입', ja: 'ログイン/登録'
};
export const sqLoginLabel = (lang) => SQ_LOGIN[lang] || SQ_LOGIN.es;
