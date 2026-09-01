// Guardián del patrón de reincidencia de los H2 (2026-08-27): en las páginas de
// CIUDAD, todo H2 debe llevar la expresión objetivo — o es el título principal
// ("Diseño, construcción y montaje…") o va compuesto "{prefijo}: {parte}"
// (ver src/lib/h2Seo.js). Si un apartado se cuela sin componer (pasó con
// "Garantía 100 %…" y "Logística óptima…" en las maquetaciones no estándar),
// el build FALLA y lo lista: este tipo de regresión no debe repetirse.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
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

// Páginas paralelas de "constructor de stands" (src/lib/builderPages.js): comparten
// el CTA con las de ciudad, pero su expresión objetivo es OTRA y su patrón también.
// Se validan con el mismo rigor, contra su propio prefijo.
// 'en {ciudad}' para las de plaza, 'para {feria}' para las que defienden una ficha.
const BUILDER_PREFIXES = ['Constructor de stands en', 'Constructor de stands para'];

// Rutas de las páginas paralelas, leídas de siteData.js: algunas viven BAJO /ferias/
// (defensa de una ficha) y el recorrido de arriba no entra en esa carpeta, así que se
// añaden a mano. Si mañana se crea otra, el guardián la cubre sin tocar nada.
const siteDataSrc = readFileSync(path.join(root, 'src/lib/siteData.js'), 'utf8');
const builderSlugs = [...siteDataSrc.matchAll(/^\s+(constructor_[a-z_]+):\s*'([^']+)'/gm)].map((m) => m[2]);

let cityPages = 0;
let builderPages = 0;
const errors = [];
const seen = new Set();
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  // Página de ciudad = cuerpo oro con el CTA inyectado por transformOroBody
  // ('oro-cta-espacio'): marcador que SOLO existe en las páginas de ciudad
  // (la portada/contacto comparten la expresión en su intro y no cuentan).
  if (!html.includes('class="oro-cta-espacio')) continue; // el ELEMENTO, no la regla CSS inlineada
  const h2s = [...html.matchAll(/<h2[^>]*>([^<]{2,160})<\/h2>/g)].map((m) => unescape(m[1]).trim());
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  seen.add(rel);
  const isBuilder = /(^|\/)constructor[_-]stand/.test(rel);
  if (isBuilder) builderPages++; else cityPages++;
  for (const t of h2s) {
    const ok = isBuilder
      ? BUILDER_PREFIXES.some((p) => t.includes(p))
      : (MAIN.some((p) => t.includes(p)) || PREFIXES.some((p) => t.includes(p)));
    if (!ok) errors.push(`${rel}: "${t.slice(0, 90)}"`);
  }
}

// Segunda pasada: las páginas paralelas que el recorrido no alcanza (las de /ferias/).
for (const slug of builderSlugs) {
  // El adaptador escribe la página como <slug>.html (y deja solo __data.json en la
  // carpeta homónima); se admiten las dos formas por si eso cambia.
  const rel = [`${slug}.html`, `${slug}/index.html`].find((r) => existsSync(path.join(dist, r)));
  if (!rel || seen.has(rel)) continue;   // ya recorrida
  const html = readFileSync(path.join(dist, rel), 'utf8');
  // En StandQuote estas páginas no existen: el rastreador de prerenderizado alcanza la
  // URL por el enlace de la ficha de feria y deja un stub de redirección a la portada.
  // No es una página que validar.
  if (html.includes('http-equiv="refresh"')) continue;
  builderPages++;
  const h2s = [...html.matchAll(/<h2[^>]*>([^<]{2,160})<\/h2>/g)].map((m) => unescape(m[1]).trim());
  if (h2s.length === 0) errors.push(`${rel}: sin H2 (¿se generó el cuerpo?)`);
  for (const t of h2s) {
    if (!BUILDER_PREFIXES.some((p) => t.includes(p))) errors.push(`${rel}: "${t.slice(0, 90)}"`);
  }
}

if (errors.length) {
  console.error(`[check-h2] ✖ ${errors.length} H2 de página de ciudad fuera del patrón de reincidencia:`);
  errors.slice(0, 25).forEach((e) => console.error('  - ' + e));
  if (errors.length > 25) console.error(`  ... y ${errors.length - 25} más`);
  process.exit(1);
}
console.log(`[check-h2] ✔ OK — todos los H2 siguen el patrón de reincidencia en ${cityPages} páginas de ciudad y ${builderPages} de constructor.`);
