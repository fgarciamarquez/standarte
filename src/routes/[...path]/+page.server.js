import { prerenderEntries, resolveRoute, cityData } from '$lib/siteData.js';
import { richSeoData } from '$lib/server/richSeoData.js';
import { fairSeoData } from '$lib/server/fairSeoData.js';
import { activitySeoData } from '$lib/server/activitySeoData.js';
import { getProjectById } from '$lib/projectData.js';
import { timelineNodes } from '$lib/fairTimelineNodes.js';

export const entries = () => prerenderEntries;

// Primera frase de la ficha de una feria: es el resumen que ya escribimos para el
// cuerpo de su página, así que sirve tal cual como tooltip del calendario sectorial
// sin redactar (ni traducir) nada nuevo.
function firstSentence(html) {
  if (!html) return '';
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  // Corta en el primer punto seguido de espacio; si no lo hay, deja el texto entero.
  const m = /^(.+?[.!?。！？])(\s|$)/.exec(text);
  return (m ? m[1] : text).trim();
}

// Resúmenes de las ferias que van a salir en el "Calendario de expansión" de esta
// ficha (7 como mucho). Se resuelven aquí porque fairSeoData es server-only y pesa
// 744 KB: mandar el diccionario entero al cliente no es una opción.
function timelineSummaries(fairSlug, lang) {
  const out = {};
  for (const n of timelineNodes({ slug: fairSlug, lang })) {
    const entry = fairSeoData[n.slug];
    const s = entry && firstSentence(entry[lang] || entry.es);
    if (s) out[n.slug] = s;
  }
  return out;
}

export function load({ params }) {
  const route = resolveRoute(params.path || '');
  const richSeo = richSeoData[route.section] || null;
  if (!richSeo && (route.section in cityData || route.section === 'services')) {
    console.warn(`[seo] Falta richSeoData["${route.section}"]`);
  }
  // Contenido SEO único por feria (solo cuando la ruta es una feria concreta).
  const fairSeo = route.section === 'feria' ? (fairSeoData[route.fairSlug] || null) : null;
  const fairTimelineSummaries = route.section === 'feria'
    ? timelineSummaries(route.fairSlug, route.lang || 'es')
    : null;
  // Intro única por actividad (solo en el hub /actividad/<tag>).
  const activitySeo = route.section === 'activity' ? (activitySeoData[route.tag] || null) : null;
  // Proyecto (solo en las URLs ja /ja/プロジェクト/{slug}). Se reutiliza el componente
  // de proyecto con lang=ja fijo en el catch-all.
  const project = route.section === 'project' ? (getProjectById(route.projectId) || null) : null;
  return { ...route, richSeo, fairSeo, fairTimelineSummaries, activitySeo, project };
}
