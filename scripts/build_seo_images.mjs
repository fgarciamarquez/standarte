// Genera static/img/seo/: copias con nombre-keyword de imágenes de la galería de
// proyectos, una por apartado reforzado en cada página de ciudad (patrón de
// reincidencia de los H2, ver src/lib/h2Seo.js). El NOMBRE del fichero replica la
// expresión objetivo del apartado —"stands-para-ferias-en-{ciudad}-{apartado}.avif"—
// para que título, texto e imagen empujen lo mismo.
//   - "ferias y sectores": proyecto elegido por la actividad dominante de las
//     ferias de la plaza (alimentación, tecnología, salud, turismo, agro, industria).
//   - "tipos de stand": proyecto premium de gran formato (Zayer EMO Hannover).
//   - "por qué elegirnos": carpintería premium (zona de reuniones BOST).
// Se ejecuta en predev/prebuild. La carpeta static/img/seo/ está gitignorada:
// no editar a mano. Fuente física: variantes -md (800w) de la galería.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const { fairsData } = await import(pathToFileURL(path.join(root, 'src/lib/fairsData.js')).href);
const { fairActivities } = await import(pathToFileURL(path.join(root, 'src/lib/fairTags.js')).href);

// Claves de ciudad y su nombre ES, extraídos del bloque cityData de siteData.js
// (no importable en node por los alias $lib; el formato del bloque es estable).
const site = readFileSync(path.join(root, 'src/lib/siteData.js'), 'utf8');
const start = site.indexOf('export const cityData = {');
if (start < 0) throw new Error('cityData no encontrado en siteData.js');
const block = site.slice(start, site.indexOf('\n};', start));
const cities = [];
const keyRe = /\n  ([a-z_0-9]+):\s*\{/g;
let m;
const keyPos = [];
while ((m = keyRe.exec(block))) keyPos.push({ key: m[1], at: m.index });
for (let i = 0; i < keyPos.length; i++) {
  const seg = block.slice(keyPos[i].at, keyPos[i + 1] ? keyPos[i + 1].at : undefined);
  const cm = seg.match(/city:\s*\{\s*es:\s*'([^']+)'/) || seg.match(/city:\s*\{\s*es:\s*"([^"]+)"/);
  cities.push({ key: keyPos[i].key, label: cm ? cm[1] : keyPos[i].key });
}

// Etiqueta de actividad -> arquetipo de imagen.
const TAG_ARCH = {
  alimentacion: 'alimentacion', 'gastronomia-hosteleria': 'alimentacion', agroalimentario: 'alimentacion',
  vino: 'alimentacion', enologia: 'alimentacion', 'equipamiento-vino': 'alimentacion', 'pesca-mar': 'alimentacion',
  'agricultura-maquinaria': 'agro', ganaderia: 'agro', mascotas: 'agro', veterinaria: 'agro',
  tecnologia: 'tecnologia', 'digital-software': 'tecnologia', 'smart-city': 'tecnologia',
  fotonica: 'tecnologia', audiovisual: 'tecnologia', 'pop-videojuegos': 'tecnologia',
  salud: 'salud', farmacia: 'salud', 'congreso-medico': 'salud', dental: 'salud',
  'optica-oftalmologia': 'salud', 'medicina-estetica': 'salud', estetica: 'salud',
  belleza: 'salud', 'belleza-peluqueria': 'salud',
  turismo: 'turismo', ocio: 'turismo', 'cultura-arte': 'turismo'
  // resto de etiquetas -> 'industria' (por defecto)
};
const ARCH_SRC = {
  alimentacion: 'img/trabajos/trabajos_promueve/thumbs/mg-1225-md.avif',            // Pescanova, degustación
  agro: 'img/trabajos/trabajos_promueve/thumbs/bellota-ferroforma-md.avif',         // Bellota, herramienta agrícola
  tecnologia: 'img/trabajos/trabajos_promueve/thumbs/03-stand-tecnalia-biemh-2022_1-md.avif', // Tecnalia, robótica
  salud: 'img/trabajos/trabajos_promueve/thumbs/1-md.avif',                          // Pharmatechnik
  turismo: 'img/trabajos/trabajos_promueve/thumbs/stand-cun-fitur3-md.avif',         // CUN en Fitur
  industria: 'img/trabajos/trabajos_promueve/thumbs/02-stand-intermaher-biemh-2022-md.avif' // Intermaher, maquinaria
};
const SRC_TIPOS = 'img/trabajos/trabajos_promueve/thumbs/STANDS_2017_EMO_HANNOVER_ZAYER_1-md.avif';
const SRC_PORQUE = 'img/trabajos/trabajos_promueve/thumbs/04-bost-emo-2023_2-md.avif';

// Excepciones por ciudad (petición 2026-08-27): en estas plazas las tres imágenes
// salen de la parte PÚBLICA de la galería de la portada (las 12 primeras, visibles
// directamente; el resto del carrusel está en el DOM pero oculto con display:none).
const PUBLIC_SET = {
  ferias: 'img/trabajos/TCELUMATEC/2-md.avif',   // stand industrial Elumatec
  tipos: 'img/trabajos/TCCONSTELLIUM/1-md.avif', // gran escala Constellium
  porque: 'img/trabajos/TCMAGNOLIA/1-md.avif'    // carpintería premium Magnolia
};
const CITY_OVERRIDES = { bilbao: PUBLIC_SET, irun: PUBLIC_SET, vitoria: PUBLIC_SET };

function archetypeFor(label) {
  const counts = {};
  for (const f of fairsData) {
    if (f.city !== label) continue;
    for (const tag of (fairActivities[f.slug] || [])) {
      const a = TAG_ARCH[tag] || 'industria';
      counts[a] = (counts[a] || 0) + 1;
    }
  }
  let best = 'industria', bestN = 0;
  for (const [a, n] of Object.entries(counts)) if (n > bestN) { best = a; bestN = n; }
  return best;
}

// Vídeo del apartado "documentación técnica del recinto": misma técnica de
// nombre-keyword, sobre el pool de vídeos de proyectos 3D (rotación determinista
// por ciudad para que las plazas no repitan todas el mismo). Copias por hash:
// el deploy compara por MD5, así que solo suben la primera vez.
const VIDEO_POOL = [1, 2, 3, 6, 7, 8, 9, 10].map((i) => `img/proyectos_stand_3d_standarte_${i}.mp4`);
const videoFor = (key) => {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return VIDEO_POOL[h % VIDEO_POOL.length];
};

const outDir = path.join(root, 'static/img/seo');
mkdirSync(outDir, { recursive: true });
let count = 0;
for (const { key, label } of cities) {
  const slug = key.replace(/_/g, '-');
  const ov = CITY_OVERRIDES[key] || {};
  const jobs = [
    [ov.ferias || ARCH_SRC[archetypeFor(label)], `stands-para-ferias-en-${slug}-ferias-y-sectores.avif`],
    [ov.tipos || SRC_TIPOS, `stands-para-ferias-en-${slug}-tipos-de-stand.avif`],
    [ov.porque || SRC_PORQUE, `stands-para-ferias-en-${slug}-por-que-elegirnos.avif`],
    [videoFor(key), `stands-para-ferias-en-${slug}-documentacion-tecnica-del-recinto.mp4`]
  ];
  for (const [src, name] of jobs) {
    copyFileSync(path.join(root, 'static', src.replace(/^img\//, 'img/')), path.join(outDir, name));
    count++;
  }
}
console.log(`[seo-images] ${count} imágenes keyword generadas en static/img/seo/ para ${cities.length} ciudades.`);
