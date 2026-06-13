/**
 * Centralized SEO & Structured Data configuration for Standarte.es
 */

export const LOCALES = [
  { lang: 'es', ogLocale: 'es_ES', prefix: '' },
  { lang: 'en', ogLocale: 'en_GB', prefix: '/en' },
  { lang: 'de', ogLocale: 'de_DE', prefix: '/de' },
  { lang: 'zh', ogLocale: 'zh_CN', prefix: '/zh' },
  { lang: 'hi', ogLocale: 'hi_IN', prefix: '/hi' },
  { lang: 'pt', ogLocale: 'pt_PT', prefix: '/pt' },
  { lang: 'fr', ogLocale: 'fr_FR', prefix: '/fr' },
  { lang: 'it', ogLocale: 'it_IT', prefix: '/it' },
  { lang: 'ko', ogLocale: 'ko_KR', prefix: '/ko' },
  { lang: 'ja', ogLocale: 'ja_JP', prefix: '/ja' }
];

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://standarte.es/#organization",
  "name": "Standarte",
  "description": "Diseño, fabricación y montaje de stands a medida para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Zafra, Don Benito, Ciudad Real y Lisboa.",
  "url": "https://standarte.es/",
  "telephone": "+34 637 894 819",
  "email": "info@standarte.es",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Av. de Castilla 2",
      "addressLocality": "San Fernando de Henares",
      "addressRegion": "Madrid",
      "postalCode": "28830",
      "addressCountry": "ES"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "C/ Los Sauces 24",
      "addressLocality": "Cáceres",
      "addressRegion": "Cáceres",
      "postalCode": "10004",
      "addressCountry": "ES"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.4124",
    "longitude": "-3.6983"
  },
  "areaServed": [
    { "@type": "City", "name": "Madrid" },
    { "@type": "City", "name": "Barcelona" },
    { "@type": "City", "name": "Bilbao" },
    { "@type": "City", "name": "Málaga" },
    { "@type": "City", "name": "Badajoz" },
    { "@type": "City", "name": "Lisboa" },
    { "@type": "City", "name": "Zafra" },
    { "@type": "City", "name": "Don Benito" },
    { "@type": "City", "name": "Cáceres" }
  ],
  "image": "https://standarte.es/img/logo_standarte_rectanular.png",
  "priceRange": "€€€",
  "sameAs": []
};

/**
 * Format a project ID (slug) to a unique descriptive title.
 * e.g., "stand_para_bodega_de_vinos_en_madrid" -> "Stand para bodega de vinos en Madrid"
 * @param {string} id 
 * @returns {string}
 */
export function formatProjectTitleFromId(id) {
  if (!id) return '';
  let clean = id.replace(/_/g, ' ');
  // Capitalize the first letter
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  return clean;
}
