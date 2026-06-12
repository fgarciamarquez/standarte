import { resolveRoute } from '$lib/siteData.js';

export function load() {
  // La portada no tiene datos SEO enriquecidos; usa seoTitle/seoDescription de siteData.
  return { ...resolveRoute(''), richSeo: null };
}
