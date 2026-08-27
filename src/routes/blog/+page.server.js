import news from '$lib/newsData.json';
import { redirect } from '@sveltejs/kit';
import { BRAND } from '$lib/brand.js';

// newsData.json pesa ~790 KB. Importado desde el componente entraba en el bundle del
// CLIENTE, y como el catch-all (/[...path]) importa el componente del blog de forma
// estática, ese chunk se descargaba en TODAS las páginas del sitio —incluidas las
// fichas de feria, que no muestran ni una noticia—. Cargándolo aquí (solo servidor)
// el JSON se queda en el prerender: cada página se lleva embebido únicamente lo suyo.
//
// El listado solo necesita los campos que pinta la tarjeta, así que además se recorta:
// el cuerpo completo del artículo (`content`) es la mayor parte del peso y aquí sobra.
export const prerender = true;

export function load() {
  // StandQuote no lleva blog: /blog queda como redirección a la portada (la ruta
  // estática entra sola en el prerender, así que no basta con quitar los enlaces).
  if (BRAND.leadGen) throw redirect(308, '/');
  return {
    news: news.map((n) => ({
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt,
      date: n.date,
      location: n.location,
      lang: n.lang,
      image: n.image,
      sourceName: n.sourceName,
      sourceUrl: n.sourceUrl
    }))
  };
}
