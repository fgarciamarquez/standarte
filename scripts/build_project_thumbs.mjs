// Genera variantes responsive de las imágenes de proyectos (portfolios) para no
// servirlas sobredimensionadas:
//   · -sb.avif  300x169 (16:9)  -> sidebar "Casos de éxito" y srcset pequeño
//   · -md.avif  800x450 (16:9)  -> galería (#custom) a ~340px y srcset grande
// Origen: los `thumb` declarados en src/lib/siteData.js (export const portfolios).
// Idempotente: re-genera siempre. Ejecuta tras añadir proyectos nuevos:
//   node scripts/build_project_thumbs.mjs
import { readFileSync, statSync, existsSync } from 'node:fs';
import sharp from 'sharp';

const SIZES = [
  { suffix: '-sb', w: 300, h: 169 },
  { suffix: '-md', w: 800, h: 450 },
];

const src = readFileSync('src/lib/siteData.js', 'utf8');
const thumbs = [...new Set([...src.matchAll(/"thumb":\s*"([^"]+)"/g)].map((m) => m[1]))];

let made = 0;
const missing = [];
for (const rel of thumbs) {
  const input = 'static/' + rel;
  if (!existsSync(input)) { missing.push(rel); continue; }
  for (const s of SIZES) {
    const out = 'static/' + rel.replace(/\.avif$/, s.suffix + '.avif');
    await sharp(input).resize(s.w, s.h, { fit: 'cover', position: 'centre' }).avif({ quality: 50, effort: 4 }).toFile(out);
    made++;
  }
}
console.log(`[project-thumbs] Generadas ${made} variantes de ${thumbs.length} thumbs.`);
if (missing.length) console.log('[project-thumbs] Sin original (omitidos):\n  ' + missing.join('\n  '));
