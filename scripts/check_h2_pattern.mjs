// Guardián del patrón de reincidencia de los H2 (2026-08-27): en las páginas de
// CIUDAD, todo H2 debe llevar la expresión objetivo — o es el título principal
// ("Diseño, construcción y montaje…") o va compuesto "{prefijo}: {parte}"
// (ver src/lib/h2Seo.js). Si un apartado se cuela sin componer (pasó con
// "Garantía 100 %…" y "Logística óptima…" en las maquetaciones no estándar),
// el build FALLA y lo lista: este tipo de regresión no debe repetirse.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

// Prefijos compuestos por idioma (deben ir en sintonía con h2Seo.js).
const PREFIXES = [
  'Stands para ferias en', 'Trade fair stands in', 'Messestände in', 'Stands para feiras em',
  'Stands pour salons à', 'Stand fieristici a', 'Beursstands in', '展会展台', 'में मेला स्टैंड',
  '박람회 부스', 'の展示会ブース'
];
// Formas del título principal (tituloPrincipal en Site.svelte).
const MAIN = [
  'Diseño, construcción y montaje', 'Exhibition stand design and build', 'Design, Bau und Montage',
  'Design, construção e montagem', 'Conception, construction et montage', 'Progettazione, costruzione',
  'Ontwerp, bouw en montage', '设计、搭建与安装', 'डिज़ाइन, निर्माण और असेंबली', '디자인, 제작 및 설치', '設計・施工・設営'
];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      // Se excluyen las fichas de feria: sus H2 los compone la plantilla con el
      // prefijo de FERIA ("Stands para {feria}: …"), que varía por nombre y no
      // puede regresar en silencio como los cuerpos de ciudad.
      if (['admin', '_app', 'img', 'blog', 'galeria', 'videos', 'proyectos', 'ferias', '展示会情報'].includes(name)) continue;
      yield* htmlFiles(p);
    } else if (name.endsWith('.html')) yield p;
  }
}

const unescape = (s) => s
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

let cityPages = 0;
const errors = [];
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  // Página de ciudad = cuerpo oro con el CTA inyectado por transformOroBody
  // ('oro-cta-espacio'): marcador que SOLO existe en las páginas de ciudad
  // (la portada/contacto comparten la expresión en su intro y no cuentan).
  if (!html.includes('class="oro-cta-espacio')) continue; // el ELEMENTO, no la regla CSS inlineada
  const h2s = [...html.matchAll(/<h2[^>]*>([^<]{2,160})<\/h2>/g)].map((m) => unescape(m[1]).trim());
  cityPages++;
  for (const t of h2s) {
    const ok = MAIN.some((p) => t.includes(p)) || PREFIXES.some((p) => t.includes(p));
    if (!ok) errors.push(`${path.relative(dist, file)}: "${t.slice(0, 90)}"`);
  }
}

if (errors.length) {
  console.error(`[check-h2] ✖ ${errors.length} H2 de página de ciudad fuera del patrón de reincidencia:`);
  errors.slice(0, 25).forEach((e) => console.error('  - ' + e));
  if (errors.length > 25) console.error(`  ... y ${errors.length - 25} más`);
  process.exit(1);
}
console.log(`[check-h2] ✔ OK — todos los H2 siguen el patrón de reincidencia en ${cityPages} páginas de ciudad.`);
