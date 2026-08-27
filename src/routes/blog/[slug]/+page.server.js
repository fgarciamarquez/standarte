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
  return { article, alternates };
}
