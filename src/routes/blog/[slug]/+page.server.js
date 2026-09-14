// Carga SOLO en servidor (antes era +page.js, universal): así newsData.json —unos
// 790 KB— se queda en el prerender en vez de viajar al bundle del cliente. Cada
// artículo se lleva embebido su propio contenido y nada más.
import news from '$lib/newsData.json';
import { error } from '@sveltejs/kit';
import { BRAND } from '$lib/brand.js';

// StandQuote no lleva blog: sin entries, ningún artículo se prerenderiza.
export const entries = () => {
  return BRAND.leadGen ? [] : news.map(item => ({ slug: item.slug }));
};

export function load({ params }) {
  const article = news.find(item => item.slug === params.slug);
  if (!article) {
    throw error(404, 'Artículo no encontrado');
  }
  const alternates = news.filter(item => item.date === article.date && item.location === article.location && item.lang !== article.lang);
  // Rastro interno entre noticias (14/09/2026): cada artículo enlaza a otros del mismo
  // idioma —dos de su ciudad, dos recientes de otras— y al anterior/siguiente en el tiempo.
  // Así ninguna noticia queda huérfana aunque el listado del blog la deje atrás.
  const card = (n) => ({ slug: n.slug, title: n.title, date: n.date, location: n.location });
  const sameLang = news.filter((n) => n.lang === article.lang && n.slug !== article.slug)
    .sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : a.slug.localeCompare(b.slug)));
  const related = [];
  for (const n of sameLang.filter((n) => n.location === article.location)) { if (related.length < 2) related.push(n); }
  for (const n of sameLang) { if (related.length >= 4) break; if (!related.includes(n)) related.push(n); }
  const ordered = news.filter((n) => n.lang === article.lang).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.slug.localeCompare(b.slug)));
  const idx = ordered.findIndex((n) => n.slug === article.slug);
  const prev = idx > 0 ? card(ordered[idx - 1]) : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? card(ordered[idx + 1]) : null;
  return { article, alternates, related: related.map(card), prev, next };
}
