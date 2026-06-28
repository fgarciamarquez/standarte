import { prerenderEntries, resolveRoute, cityData } from '$lib/siteData.js';
import { richSeoData } from '$lib/server/richSeoData.js';
import { fairSeoData } from '$lib/server/fairSeoData.js';
import { activitySeoData } from '$lib/server/activitySeoData.js';
import { getProjectById } from '$lib/projectData.js';

export const entries = () => prerenderEntries;

export function load({ params }) {
  const route = resolveRoute(params.path || '');
  const richSeo = richSeoData[route.section] || null;
  if (!richSeo && (route.section in cityData || route.section === 'services')) {
    console.warn(`[seo] Falta richSeoData["${route.section}"]`);
  }
  // Contenido SEO único por feria (solo cuando la ruta es una feria concreta).
  const fairSeo = route.section === 'feria' ? (fairSeoData[route.fairSlug] || null) : null;
  // Intro única por actividad (solo en el hub /actividad/<tag>).
  const activitySeo = route.section === 'activity' ? (activitySeoData[route.tag] || null) : null;
  // Proyecto (solo en las URLs ja /ja/プロジェクト/{slug}). Se reutiliza el componente
  // de proyecto con lang=ja fijo en el catch-all.
  const project = route.section === 'project' ? (getProjectById(route.projectId) || null) : null;
  return { ...route, richSeo, fairSeo, activitySeo, project };
}
