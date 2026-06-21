// Guardián de enlaces/recursos: escanea dist/ y rompe la build si alguna referencia
// LOCAL no existe: imágenes (src/srcset), url() de CSS, y enlaces internos (href a
// páginas o recursos). Externos (http, mailto, tel, //, #, data:) se ignoran.
// Objetivo: que NUNCA se despliegue una imagen o enlace interno roto.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
// Referencias/páginas a ignorar a propósito (rellena solo si hay un caso legítimo).
const ALLOW = new Set([]);

function walk(dir, ext) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, ext));
    else if (name.endsWith(ext)) out.push(full);
  }
  return out;
}

let htmlFiles, cssFiles;
try {
  htmlFiles = walk(DIST, '.html');
  cssFiles = walk(DIST, '.css');
} catch (e) {
  console.error(`[check-links] No se pudo leer ${DIST}/ (¿build hecho?):`, e.message);
  process.exit(1);
}

const imgRefs = new Set();
const hrefs = new Set();
const cssUrls = new Set();

const reSrcImg = /(?:src|href)="([^"]+\.(?:avif|webp|png|jpe?g|svg|ico|gif))"/gi;
const reSrcset = /srcset="([^"]+)"/gi;
const reHref = /href="([^"]+)"/gi;
const reCssUrl = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;

for (const f of htmlFiles) {
  const h = readFileSync(f, 'utf8');
  let m;
  while ((m = reSrcImg.exec(h))) imgRefs.add(m[1]);
  while ((m = reSrcset.exec(h))) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u) imgRefs.add(u);
    }
  }
  while ((m = reHref.exec(h))) hrefs.add(m[1]);
}
for (const f of cssFiles) {
  const c = readFileSync(f, 'utf8');
  let m;
  while ((m = reCssUrl.exec(c))) cssUrls.add(m[1]);
}

const isExternal = (u) => /^(https?:|mailto:|tel:|javascript:|data:|\/\/|#)/i.test(u);
const toLocal = (u) => DIST + (u.startsWith('/') ? u : '/' + u);
const strip = (u) => u.split('?')[0].split('#')[0];
const fileExists = (u) => {
  const c = strip(u);
  return !c || existsSync(toLocal(c));
};
const pageExists = (u) => {
  let c = strip(u);
  if (c === '' || c === '/') return existsSync(join(DIST, 'index.html'));
  c = c.replace(/\/$/, '');
  const base = toLocal(c);
  return existsSync(base) || existsSync(base + '.html') || existsSync(base + '/index.html');
};
// Extensiones de recurso (no-página) que pueden aparecer en un href.
const RES_EXT = /\.(avif|webp|png|jpe?g|svg|ico|gif|css|js|mjs|json|xml|txt|pdf|mp4|webm|woff2?|php)(?:$|\?|#)/i;

const broken = [];
for (const r of imgRefs) {
  if (isExternal(r) || ALLOW.has(r)) continue;
  if (!fileExists(r)) broken.push(['img', r]);
}
for (const r of cssUrls) {
  if (isExternal(r) || ALLOW.has(r)) continue;
  if (!fileExists(r)) broken.push(['css', r]);
}
for (const r of hrefs) {
  if (isExternal(r) || ALLOW.has(r)) continue;
  if (RES_EXT.test(r)) { if (!fileExists(r)) broken.push(['res', r]); }
  else if (!pageExists(r)) broken.push(['page', r]);
}

if (broken.length) {
  console.error(`\n[check-links] ❌ ${broken.length} referencia(s) rota(s) en dist/:`);
  for (const [type, r] of broken.slice(0, 100)) console.error(`   - [${type}] ${r}`);
  if (broken.length > 100) console.error(`   … y ${broken.length - 100} más`);
  console.error('\nCorrige el destino o, si es intencionado, añádelo a ALLOW en scripts/check_broken_links.mjs.\n');
  process.exit(1);
}
console.log(`[check-links] ✔ OK — 0 rotas (${imgRefs.size} img, ${cssUrls.size} css-url, ${hrefs.size} href).`);
