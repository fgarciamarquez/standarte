// Guardián de indexabilidad: escanea TODO el HTML de dist/ y rompe la build si
// encuentra cualquier directiva 'noindex' (meta robots/googlebot o equivalente).
// Objetivo: que NUNCA se despliegue una página excluida de los buscadores por
// accidente. Si algún día se necesita un noindex intencionado, añádelo a ALLOW.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

// Excepción de marca: un build con PUBLIC_BRAND en modo borrador (p. ej.
// standquote antes del visto bueno) lleva noindex GLOBAL a propósito — es su
// candado hasta abrirse a indexación. El guardián lo registra y no bloquea.
const DRAFT_BRANDS = new Set(['standquote']);
if (DRAFT_BRANDS.has(process.env.PUBLIC_BRAND || '')) {
  console.log(`[check-noindex] ✔ OK — build de marca '${process.env.PUBLIC_BRAND}' en modo borrador: noindex global intencionado.`);
  process.exit(0);
}
const ALLOW = new Set([
  // Rutas (relativas a dist/, con / inicial) que SÍ pueden llevar noindex a propósito.
  // Zona privada de proyectos de cliente (acceso por token; nunca debe indexarse).
  '/proyecto.html', '/proyecto/index.html',
  '/proyecto-demo.html', '/proyecto-demo/index.html',
]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Detecta meta robots/googlebot con noindex (en cualquier orden de atributos) o 'none'.
const NOINDEX_RE = /<meta[^>]*\bname=["'](?:robots|googlebot)["'][^>]*\bcontent=["'][^"']*\b(?:noindex|none)\b[^"']*["'][^>]*>/i;

let files;
try {
  files = walk(DIST);
} catch (e) {
  console.error(`[check-noindex] No se pudo leer ${DIST}/ (¿build hecho?):`, e.message);
  process.exit(1);
}

// Paralelas de constructor aparcadas a propósito (indexable: false en
// src/lib/builderPages.js, 17/09/2026): llevan "noindex, follow" y se reconocen por el
// Service estructurado propio de esas páginas. Solo ellas pueden llevar noindex; una
// página principal con noindex sigue rompiendo la build. Además, una página con
// noindex NO puede figurar en el sitemap (señal contradictoria para Google).
const PARKED_BUILDER_RE = /"serviceType":"(?:Constructor de stands|Stand builder|Construtor de stands)"/;
const CANONICAL_RE = /<link[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["']/i;
let sitemap = '';
try { sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8'); } catch { /* sin sitemap no se comprueba */ }

const offenders = [];
const inSitemap = [];
let parked = 0;
for (const f of files) {
  const rel = '/' + f.slice(DIST.length + 1).replace(/\\/g, '/');
  if (ALLOW.has(rel)) continue;
  const html = readFileSync(f, 'utf8');
  if (!NOINDEX_RE.test(html)) continue;
  if (!PARKED_BUILDER_RE.test(html)) { offenders.push(rel); continue; }
  parked++;
  const canonical = (html.match(CANONICAL_RE) || [])[1];
  if (canonical && sitemap.includes(`<loc>${canonical}</loc>`)) inSitemap.push(rel);
}

if (offenders.length) {
  console.error(`\n[check-noindex] ❌ ${offenders.length} página(s) con 'noindex' (esto bloquea el posicionamiento):`);
  for (const o of offenders) console.error('   - ' + o);
  console.error("\nSi es intencionado, añádelas a ALLOW en scripts/check_noindex.mjs. Si no, quita el noindex.\n");
  process.exit(1);
}
if (inSitemap.length) {
  console.error(`\n[check-noindex] ❌ ${inSitemap.length} paralela(s) aparcadas (noindex) siguen anunciadas en el sitemap:`);
  for (const o of inSitemap) console.error('   - ' + o);
  process.exit(1);
}

console.log(`[check-noindex] ✔ OK — 0 noindex accidentales en ${files.length} páginas de dist/ (${parked} paralelas aparcadas con noindex intencionado, fuera del sitemap).`);
