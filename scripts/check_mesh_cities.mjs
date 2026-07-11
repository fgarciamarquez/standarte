// Guardián de build: la malla ibérica de Pat (PatMesh.svelte) debe conocer
// todas las ciudades de fairsData. Falla el build si:
//   1. Una ciudad no está ni en CITY_LATLON (con coordenadas) ni en
//      NON_MAP_CITIES (exclusión explícita: internacionales/abstractas).
//   2. Una feria de ciudad mapeada no tiene etiquetas en fairActivities
//      (sería invisible en la malla y en el asesor de Pat).
// Así, al añadir ferias o ciudades nuevas, el build recuerda mantener el mapa.
import { fairsData } from '../src/lib/fairsData.js';
import { fairActivities } from '../src/lib/fairTags.js';
import { CITY_POINTS, NON_MAP_CITIES } from '../src/lib/iberiaMeshData.js';

let errors = 0;

// CITY_POINTS incluye península/Baleares (proyectadas) y el inset canario.
const unknownCities = [...new Set(
  fairsData
    .map((f) => f.city)
    .filter((c) => !CITY_POINTS[c] && !NON_MAP_CITIES.includes(c))
)].sort();

if (unknownCities.length) {
  errors++;
  console.error('✗ [mesh] Ciudades de fairsData sin entrada en iberiaMeshData.js:');
  unknownCities.forEach((c) => console.error(`    - "${c}" → añade su lat/lon a CITY_LATLON o inclúyela en NON_MAP_CITIES`));
}

const untaggedFairs = fairsData
  .filter((f) => CITY_POINTS[f.city] && !(fairActivities[f.slug] || []).length)
  .map((f) => f.slug)
  .sort();

if (untaggedFairs.length) {
  errors++;
  console.error('✗ [mesh] Ferias de ciudad mapeada sin etiquetas en fairActivities (invisibles en la malla y en Pat):');
  untaggedFairs.forEach((s) => console.error(`    - ${s}`));
}

if (errors) {
  console.error(`check_mesh_cities: ${errors} problema(s). Corrige antes de desplegar.`);
  process.exit(1);
}

console.log(`✓ check_mesh_cities: ${Object.keys(CITY_POINTS).length} ciudades mapeadas, ${NON_MAP_CITIES.length} excluidas, todas las ferias peninsulares etiquetadas.`);
