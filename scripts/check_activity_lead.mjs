// Guardián del hilo SEO de las páginas de actividad (/actividad y /actividad/<tag>).
//
// Regla que vigila (2026-08-28): TODA página de actividad debe declarar la acción y el
// sujeto — "Standarte diseña y construye stands para el sector de X" en el hub, y
// "Stand para X" en los H2 del índice —. Sin ese vínculo los motores no relacionan
// estas páginas con el servicio y las ignoran, que es justo el defecto que se corrigió.
// Si una actividad nueva entra sin la frase, el build falla aquí en vez de publicarse
// muda.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

// Marca del sujeto: en todos los idiomas la frase de acción nombra a Standarte, así
// que basta comprobar que el nombre aparece dentro del bloque de apertura del cuerpo.
const LEAD_CLASS = 'act-action-lead';

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (['admin', '_app', 'img', 'blog', 'galeria', 'videos', 'proyectos'].includes(name)) continue;
      yield* htmlFiles(p);
    } else if (name.endsWith('.html')) {
      yield p;
    }
  }
}

let hubs = 0;
let indexes = 0;
const errors = [];

for (const file of htmlFiles(dist)) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  // Índice de actividades: el marcador es la rejilla de tarjetas de actividad.
  const isIndex = html.includes('class="act-card-grid');
  // Hub de actividad: el marcador es el cuerpo con la frase de acción.
  const isHub = html.includes('class="act-intro');
  if (!isIndex && !isHub) continue;

  if (isIndex) {
    indexes++;
    // Los H2 de familia deben llevar el prefijo de acción, no el nombre del sector solo.
    const famH2 = [...html.matchAll(/<h2 class="fam-h[^"]*"[^>]*>.*?<\/h2>/g)].map((m) => m[0]);
    if (!famH2.length) errors.push(`${rel}: índice sin H2 de familia`);
    const sinAccion = famH2.filter((h) => !/Stand |Messestand |展台|스탠드|부스|ブース|स्टैंड/.test(h));
    if (sinAccion.length) errors.push(`${rel}: ${sinAccion.length} H2 de familia sin la acción "Stand para …"`);
  }

  if (isHub) {
    hubs++;
    if (!html.includes(LEAD_CLASS)) {
      errors.push(`${rel}: hub sin la frase de acción (${LEAD_CLASS})`);
      continue;
    }
    const i = html.indexOf(LEAD_CLASS);
    const bloque = html.slice(i, i + 400);
    if (!bloque.includes('Standarte')) {
      errors.push(`${rel}: la frase de acción no nombra a Standarte (sujeto ausente)`);
    }
  }
}

if (errors.length) {
  console.error(`[check-activity-lead] ✖ ${errors.length} páginas de actividad sin el vínculo acción+sujeto:`);
  errors.slice(0, 20).forEach((e) => console.error('  - ' + e));
  if (errors.length > 20) console.error(`  … y ${errors.length - 20} más`);
  process.exit(1);
}
console.log(`[check-activity-lead] ✔ OK — acción y sujeto presentes en ${hubs} hubs y ${indexes} índices de actividad.`);
