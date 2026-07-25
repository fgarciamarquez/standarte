// Genera src/lib/fairAnchors.js a partir de una lista curada de NOMBRES de feria.
// Resuelve nombre -> slug contra fairsData.js y aborta si algún nombre no existe
// o es ambiguo, para que la lista no pueda quedar desincronizada del catálogo.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Nivel 1 — referencia MUNDIAL o europea de su sector: la feria a la que va el sector
// entero, venga de donde venga. Si un expositor de ese sector solo pudiera ver una
// fecha más, sería esta.
const WORLD = [
  // Industria
  'Hannover Messe', 'bauma Munich', 'AMB Stuttgart', 'SPS Nuremberg', 'automatica Munich',
  'Global Industrie', 'JEC World Paris', 'Eurosatory Paris', 'LogiMAT Stuttgart',
  // Alimentación, gastronomía y vino
  'Alimentaria Barcelona', 'Fruit Attraction Madrid', 'Seafood Expo Global Barcelona', 'SIRHA',
  'Wine Paris', 'ProWein Düsseldorf',
  // Tecnología y audiovisual
  'MWC Barcelona', 'ISE Barcelona', 'Web Summit Lisboa', 'Smart City Expo World Congress Barcelona',
  // Construcción, hábitat y retail
  'Piscine Global Europe', 'MIPIM', 'MAPIC', 'TFWA World Exhibition', 'Labelexpo Europe',
  // Turismo y náutica
  'Fitur Madrid', 'Cannes Yachting Festival',
  // Agro
  "Sommet de l'Élevage", 'SITEVI', 'Vinitech-Sifel'
];

// Nivel 2 — cita de referencia NACIONAL (o del arco ibérico/sur de Francia): la feria
// que un expositor de ese mercado no se salta, aunque no arrastre al sector mundial.
const NATIONAL = [
  // Aeronáutica
  'World Aviation Festival Lisboa', 'Aeromart Toulouse', 'Airspace World',
  // Agro y ganadería
  'Fima Zaragoza', 'MEDFEL', 'AGRARIA', 'Agroglobal', 'Expoliva', 'Feira Nacional de Agricultura',
  'Semana Verde de Galicia', 'SALAMAQ', 'Figan', 'Feria Internacional Ganadera de Zafra',
  // Alimentación y pesca
  'Salón Gourmets Madrid', 'Conxemar Vigo', 'Sirha Méditerranée', 'CFIA Toulouse', 'Prod&Pack',
  // Gastronomía y hostelería
  'Hostelco Barcelona', 'H&T Málaga', 'Gastrónoma', 'Madrid Fusión', 'Galicia Fórum Gastronómico',
  'Alicante Gastronómica',
  // Vino
  'Barcelona Wine Week', 'Essência do Vinho Porto', 'Millésime Bio',
  'Salon des Vins des Vignerons Indépendants', 'Fenavin Match Ciudad Real', 'Enomaq', 'Tecnovid', 'SAVIM',
  // Tecnología
  'DES Málaga', 'Madrid Tech Show', 'GreenCities Málaga',
  // Automoción y movilidad
  'Automobile Barcelona', 'Motortec Madrid', 'Global Mobility Call', 'TRAFIC Madrid',
  // Belleza y estética
  'Salón Look Madrid', 'CosmoBeauty Barcelona', 'Expocosmética',
  // Construcción y hábitat
  'Construmat Barcelona', 'Cevisama', 'Tektónica Lisboa', 'Concreta', 'REBUILD Madrid', 'The District Madrid',
  'Piscina & Wellness Barcelona', 'Feria Hábitat València',
  // Cultura y arte
  'ARCOmadrid', 'ARCOlisboa',
  // Salud
  'Expodental', 'ExpoÓptica', 'CIOC', 'Infarma', 'Farmaforum',
  // Energía y medio ambiente
  'Genera', 'Solar & Storage Live España', 'EnerGaïa', 'Pollutec Lyon', 'Smagua Zaragoza', 'BioCultura A Coruña',
  // Industria y metal
  'Global Industrie Paris', 'BIEMH Bilbao', 'Smopyc Zaragoza', 'Expoquimia Barcelona', 'Equiplast Barcelona',
  'Fimma + Maderalia', 'Emaf', 'Salon SIANE', 'Subcontratación Bilbao', 'Addit3D Bilbao', 'Expometal',
  // Logística y transporte
  'SIL Barcelona', 'Euromaritime', 'Empack Porto',
  // Moda y textil
  'Momad Madrid', 'Futurmoda', 'Maroc in Mode (MIM)', 'Morocco Textile Expo',
  // Naval
  'Navalia', 'World Maritime Week', 'Palma International Boat Show',
  // Packaging
  'Hispack Barcelona', 'Empack Madrid',
  // Regalo, decoración y joyería
  'Intergift Madrid', 'Madridjoya Madrid', 'Portojóia',
  // Turismo
  'BTL Lisboa', 'INTUR', 'Termatalia', 'Turexpo Galicia', 'NAVARTUR',
  // Multisectoriales de referencia
  'FIDMA – Feria Internacional de Muestras de Asturias', "Fira d'Andorra la Vella",
  'Foire Internationale de Marseille', 'Foire Internationale de Bordeaux', 'Foire Internationale de Toulouse',
  'Futurália',
  // Ocio
  'San Diego Comic-Con Málaga'
];

const ANCHORS = [...WORLD, ...NATIONAL];

const src = fs.readFileSync(path.join(ROOT, 'src/lib/fairsData.js'), 'utf8');
const json = src.slice(src.indexOf('['), src.lastIndexOf(']') + 1);
const fairs = JSON.parse(json);

const byName = new Map();
for (const f of fairs) {
  if (!byName.has(f.name)) byName.set(f.name, []);
  byName.get(f.name).push(f.slug);
}

const problems = [];
function resolve(names) {
  const out = [];
  for (const name of names) {
    const hits = byName.get(name);
    if (!hits) { problems.push(`NO EXISTE en fairsData: "${name}"`); continue; }
    if (hits.length > 1) { problems.push(`AMBIGUO ("${name}"): ${hits.join(', ')}`); continue; }
    out.push(hits[0]);
  }
  return out;
}

const world = resolve(WORLD);
const national = resolve(NATIONAL);

if (problems.length) {
  console.error('Problemas al resolver nombres:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const all = [...world, ...national];
const dupes = all.filter((s, i) => all.indexOf(s) !== i);
if (dupes.length) { console.error('Slugs duplicados: ' + dupes.join(', ')); process.exit(1); }

world.sort();
national.sort();
const out = `// Ferias ANCLA: las citas de referencia de cada sector, en dos niveles.
//
// Sirve para un único fin: cuando el "Calendario de expansión" de una ficha tiene más
// candidatas que huecos, decidir cuáles no pueden faltar. Sin este dato el recorte se
// hacía por mera cercanía en el calendario, y una feria líder mundial podía quedar fuera
// en favor de una cita local que caía antes (ver FairTimeline.svelte).
//
//  - worldAnchors:    referencia mundial o europea del sector. El sector entero va allí.
//  - nationalAnchors: cita de referencia nacional (o del arco ibérico / sur de Francia).
//
// Los dos niveles hacen falta porque una lista plana no distingue SIRHA (Lyon, la feria
// mundial de hostelería) de una cita nacional del mismo sector, y en un grupo con
// decenas de candidatas el desempate por fecha dejaba fuera precisamente a las grandes.
//
// No es una valoración comercial ni afecta a ninguna otra parte del sitio.
//
// Se genera con scripts/build_fair_anchors.cjs, que resuelve los nombres contra
// fairsData.js y aborta si alguno no existe: la lista no puede quedar desincronizada.
export const worldAnchors = new Set([
${world.map((s) => `  '${s}'`).join(',\n')}
]);

export const nationalAnchors = new Set([
${national.map((s) => `  '${s}'`).join(',\n')}
]);

// Peso que aporta ser feria de referencia, para el ranking del calendario sectorial.
export function anchorWeight(slug) {
  if (worldAnchors.has(slug)) return 12;
  if (nationalAnchors.has(slug)) return 5;
  return 0;
}
`;

fs.writeFileSync(path.join(ROOT, 'src/lib/fairAnchors.js'), out.replace(/\r?\n/g, '\n'), 'utf8');
console.log(`fairAnchors.js escrito: ${world.length} mundiales + ${national.length} nacionales.`);
