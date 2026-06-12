import { resolveRoute } from '$lib/siteData.js';
import { richSeoData } from '$lib/server/richSeoData.js';

export function load() {
  const route = resolveRoute('construccion_stands_madrid');
  return { ...route, richSeo: richSeoData[route.section] || null };
}
