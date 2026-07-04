// Corrige el atributo lang del <html> por página durante el prerender.
//
// app.html lleva lang="es" fijo, así que TODAS las páginas estáticas (también
// /en/..., /zh/..., /ja/...) salían declarando español. Esa señal contradice el
// contenido y el hreflang, y Google degrada esas páginas como duplicados de baja
// confianza ("descubierta/rastreada: sin indexar"). Mismo defecto que ya causó
// fallos de indexación en luzpavilion.es y se resolvió con este mismo hook.
//
// Con adapter-static este hook corre en build: cada HTML de dist/ queda con el
// lang del idioma de su URL. Dos fuentes:
//  1. Primer segmento del path si es un idioma soportado (/en/..., /ja/...).
//  2. Artículos del blog: viven todos bajo /blog/<slug> SIN prefijo de idioma
//     (el slug ya es único por idioma), así que el idioma se busca en newsData.
import news from './lib/newsData.json';

const LANGS = new Set(['en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko', 'ja', 'nl']);
const newsLangBySlug = new Map(news.map((n) => [n.slug, n.lang]));

function langFromPath(pathname) {
  const parts = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').split('/');
  if (parts[0] === 'blog' && parts[1]) return newsLangBySlug.get(parts[1]) || 'es';
  return LANGS.has(parts[0]) ? parts[0] : 'es';
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = langFromPath(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="es">', `<html lang="${lang}">`)
  });
}
