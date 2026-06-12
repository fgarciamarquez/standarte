import { prerenderEntries, resolveRoute, cityData } from '$lib/siteData.js';
import { richSeoData } from '$lib/server/richSeoData.js';

export const entries = () => prerenderEntries;

export function load({ params }) {
  const route = resolveRoute(params.path || '');
  const richSeo = richSeoData[route.section] || null;
  if (!richSeo && (route.section in cityData || route.section === 'services')) {
    console.warn(`[seo] Falta richSeoData["${route.section}"]`);
  }
  return { ...route, richSeo };
}
