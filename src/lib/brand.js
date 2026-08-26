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
