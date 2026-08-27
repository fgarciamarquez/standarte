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
import { BRAND } from '$lib/brand.js';

const LANGS = new Set(['en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko', 'ja', 'nl']);
// StandQuote no hereda el rastreo de Google de Standarte (G-80WWV05ZTM): el hook
// elimina del HTML el bloque completo delimitado por <!-- ga:start --> … <!-- ga:end -->
// en app.html. En Standarte el bloque queda tal cual.
const GA_BLOCK = /<!-- ga:start[\s\S]*?<!-- ga:end -->/;
// Sello de build SOLO para StandQuote (Vercel): identifica qué compilación sirve el
// CDN al diagnosticar cachés/deploys ("a veces veo la versión vieja"). En Standarte
// NO se emite: un sello por build cambiaría el hash de TODAS las páginas y rompería
// el deploy incremental por FTP.
const SQ_BUILD_STAMP = new Date().toISOString().slice(0, 16) + 'Z';
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
    transformPageChunk: ({ html }) => {
      let out = html.replace(/<html lang="es"/, `<html lang="${lang}"`);
      if (BRAND.leadGen) {
        out = out.replace(GA_BLOCK, '<!-- sin rastreo de Google en esta marca -->');
        out = out.replace('</head>', `<meta name="sq-build" content="${SQ_BUILD_STAMP}" /></head>`);
      }
      return out;
    }
  });
}
