// Guardián del atributo lang del <html>: falla el build si alguna página de
// dist/ declara un idioma que no corresponde a su URL. Evita regresiones del
// defecto que dejó hubs y fichas multiidioma sin indexar en GSC (todas las
// páginas salían con lang="es" por el app.html fijo; ver src/hooks.server.js).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const LANGS = new Set(['en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko', 'ja', 'nl']);

// Idioma esperado por ruta: primer segmento si es un idioma; el blog es la
// excepción (slug único por idioma, sin prefijo) y se salta la comprobación.
const news = JSON.parse(readFileSync(path.join(root, 'src/lib/newsData.json'), 'utf8'));
const newsLangBySlug = new Map(news.map((n) => [n.slug, n.lang]));

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === 'admin' || name === '_app' || name === 'img') continue;
      yield* htmlFiles(p);
    } else if (name.endsWith('.html')) {
      yield p;
    }
  }
}

let checked = 0;
const errors = [];
for (const file of htmlFiles(dist)) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const parts = rel.split('/');
  let expected;
  if (parts[0] === 'blog' || (LANGS.has(parts[0]) && parts[1] === 'blog' && parts.length > 2) || (LANGS.has(parts[0]) && parts[1] === 'blog.html')) {
    // Artículos del blog: idioma por slug (los listados /<lang>/blog sí van por prefijo).
    const slug = parts[0] === 'blog' ? parts[1]?.replace(/\.html$/, '') : null;
    expected = slug ? (newsLangBySlug.get(slug) || 'es') : (LANGS.has(parts[0]) ? parts[0] : 'es');
  } else {
    const first = parts[0].replace(/\.html$/, '');
    expected = LANGS.has(first) ? first : 'es';
  }
  const head = readFileSync(file, 'utf8').slice(0, 500);
  // Stubs de redirección (SvelteKit los escribe para los redirect 308 del prerender,
  // p. ej. las secciones retiradas de StandQuote): solo llevan un meta refresh y un
  // enlace, sin contenido indexable — no aplica la comprobación de idioma.
  if (/http-equiv="refresh"/.test(head)) continue;
  const m = head.match(/<html[^>]*\slang="([^"]*)"/);
  if (!m) { errors.push(`${rel}: sin atributo lang`); continue; }
  if (m[1] !== expected) errors.push(`${rel}: lang="${m[1]}" (esperado "${expected}")`);
  checked++;
}

if (errors.length) {
  console.error(`[check-html-lang] ✖ ${errors.length} páginas con lang incorrecto:`);
  errors.slice(0, 20).forEach((e) => console.error('  - ' + e));
  if (errors.length > 20) console.error(`  ... y ${errors.length - 20} más`);
  process.exit(1);
}
console.log(`[check-html-lang] ✔ OK — atributo lang correcto en ${checked} páginas de dist/.`);
