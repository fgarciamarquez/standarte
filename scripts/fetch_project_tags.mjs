// Hornea src/lib/projectTags.js con las etiquetas de los proyectos 3D almacenadas en
// Supabase (tabla project_tags, lectura pública anon). Así el etiquetado hecho en el
// panel admin queda en el HTML prerenderizado tras el deploy (bueno para SEO).
// Fichero generado (gitignored). Se ejecuta en los hooks predev/prebuild.
// Resiliencia: si la red falla, conserva el projectTags.js existente; si no existe,
// escribe un mapa vacío para que el import no rompa el build.
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const target = path.join(root, 'src', 'lib', 'projectTags.js');

const SUPABASE_URL = 'https://mucfvcrwleapdeaxdlxe.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z2Y3J3bGVhcGRlYXhkbHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE4MzMsImV4cCI6MjA5NTkwNzgzM30.PUaMx8aduqCLq_Fju8SkhEQnG9tr8UzBoj-GEcRbbU4';

function write(map) {
  const banner =
    '// ARCHIVO GENERADO por scripts/fetch_project_tags.mjs — NO EDITAR A MANO.\n' +
    '// Mapa proyecto -> etiquetas (mismo sistema que las ferias). Origen: Supabase\n' +
    '// project_tags, editable en /admin/project_tags.php.\n';
  const body =
    `export const projectTags = ${JSON.stringify(map, null, 2)};\n\n` +
    'export function tagsForProject(id) { return projectTags[id] || []; }\n' +
    'export function projectsForActivity(tag) {\n' +
    '  return Object.keys(projectTags).filter((id) => projectTags[id].includes(tag));\n' +
    '}\n';
  writeFileSync(target, banner + body);
}

try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/project_tags?select=id,tags`, {
    headers: { apikey: ANON, Authorization: `Bearer ${ANON}` }
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const rows = await res.json();
  const map = {};
  for (const r of rows) {
    if (r && r.id && Array.isArray(r.tags) && r.tags.length) map[r.id] = r.tags;
  }
  write(map);
  console.log(`fetch_project_tags: ${Object.keys(map).length} proyectos etiquetados (Supabase).`);
} catch (e) {
  if (existsSync(target)) {
    console.warn(`fetch_project_tags: fallo de red (${e.message}); conservo projectTags.js existente.`);
  } else {
    write({});
    console.warn(`fetch_project_tags: fallo de red (${e.message}); genero projectTags.js vacío.`);
  }
}
