// Genera datos para el panel admin de etiquetado de proyectos 3D:
//  - admin/data/projects_index.json: lista ligera de proyectos (id, nombre, ciudad,
//    título ES, imagen) para pintar el listado.
//  - admin/data/tags.json: catálogo de etiquetas agrupadas por familia (con color y
//    etiqueta ES) = el mismo sistema de etiquetas de las ferias (fairTags.js).
// Se escribe en static/admin/data (va a producción) y en admin/data (espejo MAMP).
// Ficheros generados (gitignored). Se ejecuta en los hooks predev/prebuild.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const { projects } = await import(pathToFileURL(path.join(root, 'src', 'lib', 'projectData.js')).href);
const tagsMod = await import(pathToFileURL(path.join(root, 'src', 'lib', 'fairTags.js')).href);
const { tagFamilies, fairTags, tagOrder, colorForTag, labelForTag, familyLabel } = tagsMod;

// Lista ligera de proyectos.
const projectsIndex = projects.map((p) => ({
  id: p.id,
  name: p.name,
  location: p.location || '',
  title: (p.title && p.title.es) || p.name,
  image: p.image || ''
}));

// Catálogo de etiquetas agrupadas por familia, en el orden de tagFamilies + tagOrder.
const families = Object.keys(tagFamilies).map((fam) => ({
  family: fam,
  label: familyLabel(fam, 'es'),
  color: (tagFamilies[fam] && tagFamilies[fam].color) || '#888',
  tags: tagOrder
    .filter((slug) => fairTags[slug] && fairTags[slug].family === fam)
    .map((slug) => ({ slug, label: labelForTag(slug, 'es'), color: colorForTag(slug) }))
})).filter((f) => f.tags.length);

for (const base of [path.join(root, 'static', 'admin', 'data'), path.join(root, 'admin', 'data')]) {
  mkdirSync(base, { recursive: true });
  writeFileSync(path.join(base, 'projects_index.json'), JSON.stringify(projectsIndex));
  writeFileSync(path.join(base, 'tags.json'), JSON.stringify({ families }));
}

console.log(`build_admin_data: ${projectsIndex.length} proyectos, ${families.reduce((n, f) => n + f.tags.length, 0)} etiquetas.`);
