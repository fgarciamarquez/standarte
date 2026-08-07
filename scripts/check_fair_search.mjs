// Guardián del buscador de ferias de la portada (FairSearch.svelte).
//
// El buscador se alimenta de fairsData en cada build, así que toda feria nueva entra
// sola en el índice predictivo. Su única regla de exclusión es la deduplicación por
// nombre normalizado: si dos ferias se llamaran EXACTAMENTE igual, solo la primera
// sería encontrable — y nadie se enteraría. Este guardián hace ruidosa esa situación:
// falla el build si hay colisión de nombres, slugs duplicados o entradas sin nombre.
//
// (Recordatorio real: existen dos "Feria de los Pueblos" legítimas, Jaén y Granada.
// Conviven porque sus nombres difieren; si alguien las renombrara igual, esto salta.)
import { fairsData } from '../src/lib/fairsData.js';

const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const porNombre = new Map();
const porSlug = new Map();
const problemas = [];

for (const f of fairsData) {
  if (!f.name || !norm(f.name)) { problemas.push(`entrada sin nombre: slug "${f.slug}"`); continue; }
  if (!f.slug) { problemas.push(`entrada sin slug: "${f.name}"`); continue; }
  const k = norm(f.name);
  if (porNombre.has(k)) {
    problemas.push(`nombre duplicado "${f.name}": ${porNombre.get(k)} y ${f.slug} — el buscador de la portada SOLO mostrará el primero`);
  } else {
    porNombre.set(k, f.slug);
  }
  if (porSlug.has(f.slug)) {
    problemas.push(`slug duplicado "${f.slug}"`);
  } else {
    porSlug.set(f.slug, true);
  }
}

if (problemas.length) {
  console.error(`[check-fair-search] ✗ ${problemas.length} problema(s) que dejarían ferias fuera del buscador:`);
  for (const p of problemas) console.error('   - ' + p);
  process.exit(1);
}
console.log(`[check-fair-search] ✔ OK — las ${fairsData.length} ferias del catálogo son localizables en el buscador de la portada (nombres y slugs únicos).`);
