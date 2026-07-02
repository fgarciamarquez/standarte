// Guardián de indexabilidad: escanea TODO el HTML de dist/ y rompe la build si
// encuentra cualquier directiva 'noindex' (meta robots/googlebot o equivalente).
// Objetivo: que NUNCA se despliegue una página excluida de los buscadores por
// accidente. Si algún día se necesita un noindex intencionado, añádelo a ALLOW.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
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

const offenders = [];
for (const f of files) {
  const rel = '/' + f.slice(DIST.length + 1).replace(/\\/g, '/');
  if (ALLOW.has(rel)) continue;
  const html = readFileSync(f, 'utf8');
  if (NOINDEX_RE.test(html)) offenders.push(rel);
}

if (offenders.length) {
  console.error(`\n[check-noindex] ❌ ${offenders.length} página(s) con 'noindex' (esto bloquea el posicionamiento):`);
  for (const o of offenders) console.error('   - ' + o);
  console.error("\nSi es intencionado, añádelas a ALLOW en scripts/check_noindex.mjs. Si no, quita el noindex.\n");
  process.exit(1);
}

console.log(`[check-noindex] ✔ OK — 0 noindex en ${files.length} páginas de dist/.`);
