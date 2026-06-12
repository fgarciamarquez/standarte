// Genera src/lib/projectIndex.js a partir de projectData.js.
// Se ejecuta automáticamente antes de `npm run dev` y `npm run build`
// (hooks predev/prebuild en package.json). No editar el fichero generado.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(root, 'src', 'lib', 'projectData.js');
const targetPath = path.join(root, 'src', 'lib', 'projectIndex.js');

const { projects } = await import(pathToFileURL(sourcePath).href);

const index = projects.map(p => ({
  id: p.id,
  name: p.name,
  location: p.location,
  image: p.image,
  title: p.title
}));

const banner = '// ARCHIVO GENERADO por scripts/build_project_index.mjs — NO EDITAR A MANO.\n' +
  '// Índice ligero de proyectos para listados/carruseles; los datos completos\n' +
  '// (valuesText, galerías) viven en projectData.js y solo se usan en servidor.\n';

writeFileSync(targetPath, `${banner}export const projectIndex = ${JSON.stringify(index, null, 2)};\n`);
console.log(`projectIndex.js generado: ${index.length} proyectos.`);
