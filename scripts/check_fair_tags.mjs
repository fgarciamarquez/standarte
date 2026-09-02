// Guardián del etiquetado de ferias (src/lib/fairTags.js).
//
// POR QUÉ EXISTE: una etiqueta escrita en fairActivities que no esté definida en
// fairTags no da error en el build ni en las páginas —simplemente no significa nada—,
// pero TUMBA el mapa de Pat al leer `fairTags[t].family`. Ha pasado dos veces:
// 'nautica' (2026-08-27) y 'salud' (2026-09-02, al dar de alta ANECORM). El síntoma
// aparece lejos de la causa: el mapa deja de abrirse en toda la web.
//
// Comprueba tres integridades del dato, todas de rotura del build:
//   1. Toda etiqueta usada en fairActivities existe en fairTags.
//   2. Toda etiqueta de fairTags pertenece a una familia existente en tagFamilies.
//   3. Todo slug de fairActivities existe en el catálogo de ferias.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const { fairTags, tagFamilies, fairActivities } = await import(pathToFileURL(path.join(root, 'src/lib/fairTags.js')).href);
const { fairsData } = await import(pathToFileURL(path.join(root, 'src/lib/fairsData.js')).href);

const defined = new Set(Object.keys(fairTags));
const families = new Set(Object.keys(tagFamilies));
const slugs = new Set(fairsData.map((f) => f.slug));
const errors = [];

for (const [slug, tags] of Object.entries(fairActivities)) {
  if (!slugs.has(slug)) errors.push(`${slug}: etiquetada pero no existe en fairsData.js`);
  for (const t of tags || []) {
    if (!defined.has(t)) errors.push(`${slug}: etiqueta "${t}" sin definición en fairTags (tumbaría el mapa de Pat)`);
  }
}
for (const [tag, def] of Object.entries(fairTags)) {
  if (!families.has(def.family)) errors.push(`etiqueta "${tag}": familia "${def.family}" inexistente en tagFamilies`);
}

if (errors.length) {
  console.error(`✖ check_fair_tags: ${errors.length} problema(s) de integridad en el etiquetado:`);
  errors.slice(0, 20).forEach((e) => console.error('   - ' + e));
  if (errors.length > 20) console.error(`   ... y ${errors.length - 20} más`);
  process.exit(1);
}
const used = new Set(Object.values(fairActivities).flat());
console.log(`[check-fair-tags] ✔ OK — ${Object.keys(fairActivities).length} ferias etiquetadas con ${used.size} etiquetas, todas definidas y con familia.`);
