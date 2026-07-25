import { resolveRoute } from '$lib/siteData.js';
import { cityIntrosFor } from '$lib/server/cityContent.js';

export function load() {
  // La portada no tiene datos SEO enriquecidos; usa seoTitle/seoDescription de siteData.
  // cityIntros: textos de las tarjetas de ciudad ya resueltos al idioma, servidos desde
  // $lib/server para no arrastrar los 11 idiomas al bundle del cliente.
  return { ...resolveRoute(''), richSeo: null, cityIntros: cityIntrosFor('es') };
}
