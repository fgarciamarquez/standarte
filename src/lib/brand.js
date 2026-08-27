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
