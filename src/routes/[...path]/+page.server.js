import { prerenderEntries, resolveRoute, cityData } from '$lib/siteData.js';
import { richSeoData } from '$lib/server/richSeoData.js';
import { fairSeoData } from '$lib/server/fairSeoData.js';

export const entries = () => prerenderEntries;

export function load({ params }) {
  const route = resolveRoute(params.path || '');
  const richSeo = richSeoData[route.section] || null;
  if (!richSeo && (route.section in cityData || route.section === 'services')) {
    console.warn(`[seo] Falta richSeoData["${route.section}"]`);
  }
  // Contenido SEO único por feria (solo cuando la ruta es una feria concreta).
  const fairSeo = route.section === 'feria' ? (fairSeoData[route.fairSlug] || null) : null;
  return { ...route, richSeo, fairSeo };
}
