// Exporta el mapa de Pat (la malla Sector → Actividad → Feria → Ciudad) a un
// "vault" de Obsidian: una nota Markdown por entidad, con enlaces [[...]] entre
// ellas y metadatos en frontmatter YAML. Así la vista de grafo de Obsidian
// reproduce las relaciones y queda una copia navegable/consultable (Dataview).
//
// Fuentes (las mismas que usa PatMesh.svelte):
//   - fairsData        : ferias  (name, slug, city, country, sector)
//   - fairTags         : actividades (tag → familia + label multi-idioma)
//   - tagFamilies      : sectores (familia → label + color)
//   - fairActivities   : feria(slug) → [actividades]
//   - CITY_POINTS      : ciudades dibujadas en el mapa (peninsular + insets)
//   - CITY_LATLON      : lat/lon de las ciudades peninsulares
//
// USO:
//   node scripts/export_obsidian_mesh.mjs                 # genera ./obsidian-pat-map
//   node scripts/export_obsidian_mesh.mjs --out "RUTA"    # genera en RUTA (p. ej. una
//                                                          # carpeta dentro de tu vault)
//   node scripts/export_obsidian_mesh.mjs --lang en       # idioma de las etiquetas (def: es)
//
// SINCRONIZAR: apunta --out a una carpeta de tu vault y vuelve a ejecutarlo cuando
// cambien los datos. El script REGENERA por completo las 4 subcarpetas gestionadas
// (Sectores, Actividades, Ferias, Ciudades) y el índice; no toca el resto del vault.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fairsData } from '../src/lib/fairsData.js';
import { fairTags, tagFamilies, fairActivities } from '../src/lib/fairTags.js';
import { CITY_POINTS, CITY_LATLON } from '../src/lib/iberiaMeshData.js';
import { fairSeoData } from '../src/lib/server/fairSeoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Argumentos ──────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const getArg = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};
const LANG = getArg('lang', 'es');
const OUT = path.resolve(getArg('out', path.join(ROOT, 'obsidian-pat-map')));

const SUBS = ['Sectores', 'Actividades', 'Ferias', 'Ciudades'];

// ── Utilidades ──────────────────────────────────────────────────────────────
// Nombre de fichero/enlace seguro para Obsidian (sin \ / : * ? " < > | ).
const safe = (s) => String(s).replace(/[\\/:*?"<>|#^[\]]/g, '-').replace(/\s+/g, ' ').trim();
const link = (s) => `[[${safe(s)}]]`;
const famLabel = (fam) => (tagFamilies[fam]?.label?.[LANG]) || tagFamilies[fam]?.sector || fam;
const tagLabel = (tag) => (fairTags[tag]?.label?.[LANG]) || fairTags[tag]?.label?.es || tag;

// Escapa comillas para valores YAML entrecomillados.
const yamlStr = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

// Convierte el HTML de las descripciones (fairSeoData) a Markdown legible.
// El contenido es sencillo (<p>, y ocasionalmente <strong>/<em>/<a>/<br>/listas).
function htmlToMd(html) {
  if (!html) return '';
  let s = String(html);
  s = s.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)');
  s = s.replace(/<\/?(strong|b)>/gi, '**').replace(/<\/?(em|i)>/gi, '*');
  s = s.replace(/<li[^>]*>/gi, '- ').replace(/<\/li>/gi, '\n');
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gis, '\n\n**$1**\n\n');
  s = s.replace(/<\/p>/gi, '\n\n').replace(/<p[^>]*>/gi, '');
  s = s.replace(/<[^>]+>/g, '');                 // cualquier otra etiqueta
  s = s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
  return s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function writeNote(sub, title, frontmatter, body) {
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const content = `---\n${fm}\n---\n${body}\n`;
  fs.writeFileSync(path.join(OUT, sub, `${safe(title)}.md`), content, 'utf8');
}

// ── Construcción de la malla ────────────────────────────────────────────────
// Índices: sector → actividades, actividad → ferias, ciudad → ferias.
const activitiesByFamily = {};
for (const tag of Object.keys(fairTags)) {
  const fam = fairTags[tag].family;
  (activitiesByFamily[fam] ||= []).push(tag);
}
const fairsByTag = {};
const fairsByCity = {};
const familiesByFair = {}; // slug → Set(familias) derivadas de sus actividades
for (const fair of fairsData) {
  const tags = fairActivities[fair.slug] || [];
  familiesByFair[fair.slug] = new Set(tags.map((t) => fairTags[t]?.family).filter(Boolean));
  for (const t of tags) (fairsByTag[t] ||= []).push(fair);
  (fairsByCity[fair.city] ||= []).push(fair);
}

// Ferias con nombre duplicado: se desambiguan con el slug para no colisionar.
const nameCount = {};
for (const f of fairsData) nameCount[f.city ? f.name : f.name] = (nameCount[f.name] || 0) + 1;
const fairTitle = (f) => (nameCount[f.name] > 1 ? `${f.name} (${f.slug})` : f.name);

// ── Preparar carpeta de salida (regenera las subcarpetas gestionadas) ────────
fs.mkdirSync(OUT, { recursive: true });
for (const sub of SUBS) {
  const dir = path.join(OUT, sub);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

let nSec = 0, nAct = 0, nFer = 0, nCiu = 0, nTxt = 0;

// ── Sectores ────────────────────────────────────────────────────────────────
for (const fam of Object.keys(tagFamilies)) {
  const acts = (activitiesByFamily[fam] || []).map(tagLabel).sort();
  writeNote('Sectores', famLabel(fam), {
    tipo: 'sector',
    clave: fam,
    color: yamlStr(tagFamilies[fam].color),
    n_actividades: acts.length
  }, `# ${safe(famLabel(fam))}\n\nSector del mapa de Pat.\n\n## Actividades\n` +
     (acts.length ? acts.map((a) => `- ${link(a)}`).join('\n') : '_(sin actividades)_'));
  nSec++;
}

// ── Actividades ─────────────────────────────────────────────────────────────
for (const tag of Object.keys(fairTags)) {
  const fam = fairTags[tag].family;
  const fairs = (fairsByTag[tag] || []).map(fairTitle).sort();
  writeNote('Actividades', tagLabel(tag), {
    tipo: 'actividad',
    clave: tag,
    sector: yamlStr(famLabel(fam)),
    n_ferias: fairs.length
  }, `# ${safe(tagLabel(tag))}\n\nActividad del sector ${link(famLabel(fam))}.\n\n## Ferias\n` +
     (fairs.length ? fairs.map((f) => `- ${link(f)}`).join('\n') : '_(sin ferias)_'));
  nAct++;
}

// ── Ferias ──────────────────────────────────────────────────────────────────
for (const fair of fairsData) {
  const tags = (fairActivities[fair.slug] || []).map(tagLabel).sort();
  const fams = [...familiesByFair[fair.slug]].map(famLabel).sort();
  const onMap = Object.prototype.hasOwnProperty.call(CITY_POINTS, fair.city);
  const desc = htmlToMd(fairSeoData[fair.slug]?.[LANG] || fairSeoData[fair.slug]?.es || '');
  if (desc) nTxt++;
  writeNote('Ferias', fairTitle(fair), {
    tipo: 'feria',
    slug: fair.slug,
    pais: fair.country || '',
    ciudad: yamlStr(fair.city),
    en_mapa: onMap,
    con_texto: !!desc
  }, `# ${safe(fair.name)}\n\n` +
     `- Ciudad: ${link(fair.city)}\n` +
     `- Sector(es): ${fams.map(link).join(', ') || '—'}\n\n` +
     `## Actividades\n` +
     (tags.length ? tags.map((t) => `- ${link(t)}`).join('\n') : '_(sin actividades)_') +
     (desc ? `\n\n## Descripción\n${desc}` : ''));
  nFer++;
}

// ── Ciudades ────────────────────────────────────────────────────────────────
for (const city of Object.keys(fairsByCity)) {
  const fairs = fairsByCity[city].map(fairTitle).sort();
  const onMap = Object.prototype.hasOwnProperty.call(CITY_POINTS, city);
  const coords = CITY_LATLON[city];
  const fm = {
    tipo: 'ciudad',
    en_mapa: onMap,
    n_ferias: fairs.length
  };
  if (coords) { fm.lat = coords[0]; fm.lon = coords[1]; }
  writeNote('Ciudades', city, fm,
    `# ${safe(city)}\n\n` +
    `Ciudad ${onMap ? 'dibujada en el mapa de Pat' : 'sin punto en el mapa (feria fuera de la malla peninsular)'}.\n\n` +
    `## Ferias aquí\n` + fairs.map((f) => `- ${link(f)}`).join('\n'));
  nCiu++;
}

// ── Índice (MOC) ────────────────────────────────────────────────────────────
const idx = `---\ntipo: indice\n---\n# Mapa de Pat — Malla de relaciones\n\n` +
  `Copia navegable de las relaciones del mapa de Pat (Standarte).\n` +
  `Estructura: **Sector → Actividad → Feria → Ciudad**.\n\n` +
  `## Resumen\n` +
  `- Sectores: ${nSec}\n- Actividades: ${nAct}\n- Ferias: ${nFer}\n- Ciudades: ${nCiu}\n\n` +
  `## Carpetas\n${SUBS.map((s) => `- ${s}/`).join('\n')}\n\n` +
  `> Generado por \`scripts/export_obsidian_mesh.mjs\` (idioma: ${LANG}). Vuelve a ejecutarlo para sincronizar.\n`;
fs.writeFileSync(path.join(OUT, 'Mapa de Pat.md'), idx, 'utf8');

console.log(`✔ Vault de Obsidian generado en: ${OUT}`);
console.log(`  Sectores: ${nSec} | Actividades: ${nAct} | Ferias: ${nFer} (con texto: ${nTxt}) | Ciudades: ${nCiu} | idioma: ${LANG}`);
