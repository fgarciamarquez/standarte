// Guardián de las fechas de feria (src/lib/fairDates.js).
//
// Las fechas de feria son el único dato del sitio que CADUCA solo: una edición
// pasa y el dato queda obsoleto sin que nadie toque el código. Este guardián no
// deja que eso se convierta en un dato falso publicado:
//
//   - ERROR (rompe el build): slug inexistente en fairsData, fecha mal formada,
//     o fin anterior al inicio. Son fallos de integridad que hay que corregir.
//   - AVISO (no rompe): ediciones ya celebradas. El sitio nunca las muestra
//     (formatFairDates las descarta), pero conviene refrescarlas para no ir
//     perdiendo cobertura de fechas edición tras edición.
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');

const fairsSrc = read('../src/lib/fairsData.js');
const slugs = new Set([...fairsSrc.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]));

const datesSrc = read('../src/lib/fairDates.js');
const objMatch = /export const fairDates = \{([\s\S]*?)\n\};/.exec(datesSrc);
if (!objMatch) {
  console.error('✖ check_fair_dates: no se encontró el objeto fairDates en src/lib/fairDates.js');
  process.exit(1);
}
const fairDates = new Function(`return {${objMatch[1]}}`)();

const today = new Date().toISOString().slice(0, 10);
const errors = [];
const past = [];
let withDate = 0;

for (const [slug, entry] of Object.entries(fairDates)) {
  if (!slugs.has(slug)) { errors.push(`${slug}: no existe en fairsData.js`); continue; }
  if (!entry || !entry.start) continue;
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso.test(entry.start)) { errors.push(`${slug}: start mal formado (${entry.start})`); continue; }
  const end = entry.end || entry.start;
  if (!iso.test(end)) { errors.push(`${slug}: end mal formado (${end})`); continue; }
  if (end < entry.start) { errors.push(`${slug}: end (${end}) anterior a start (${entry.start})`); continue; }
  withDate++;
  if (end < today) past.push(`${slug} (${entry.start} → ${end})`);
}

if (errors.length) {
  console.error('✖ check_fair_dates: ' + errors.length + ' error(es) de integridad:');
  errors.forEach((e) => console.error('   - ' + e));
  process.exit(1);
}

// Ferias ancla (src/lib/fairAnchors.js): deciden qué entra en el "Calendario de
// expansión" cuando hay más candidatas que huecos. Un slug que ya no exista en el
// catálogo no da error en tiempo de ejecución (simplemente nunca puntúa), así que
// pasaría inadvertido y degradaría la selección en silencio: aquí sí rompe el build.
const anchorsSrc = read('../src/lib/fairAnchors.js');
const anchorSlugs = [...anchorsSrc.matchAll(/^\s{2}'([^']+)'/gm)].map((m) => m[1]);
const anchorGhosts = anchorSlugs.filter((s) => !slugs.has(s));
if (anchorGhosts.length) {
  console.error('✖ check_fair_dates: ferias ancla que ya no existen en fairsData.js:');
  anchorGhosts.forEach((s) => console.error('   - ' + s));
  process.exit(1);
}

const total = Object.keys(fairDates).length;
console.log(`✓ check_fair_dates: ${withDate} ferias con fecha futura válida (de ${total} registradas); ${anchorSlugs.length} ferias ancla verificadas.`);
if (past.length) {
  console.warn(`⚠ ${past.length} feria(s) con la edición ya celebrada — refrescar cuando se publiquen las nuevas fechas (el sitio, mientras tanto, no muestra fecha):`);
  past.forEach((p) => console.warn('   - ' + p));
}
