// El build genera las portadas de idioma como dist/<lang>.html, pero en el
// servidor existen carpetas /<lang>/ (en/, de/, ko/...) y Apache resuelve
// /<lang>/ contra <lang>/index.html. Sin esta copia, /en/ servía un index.html
// congelado de un despliegue antiguo y /ko/ daba 403 por no tener ninguno.
// Se ejecuta en el hook postbuild de package.json.
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const langs = ['en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko', 'ja'];

// El prerender de SvelteKit sigue el enlace "Admin" del pie y renderiza la home
// en dist/admin/email_campaing.html (~345 KB). El panel real es el index.php de
// esa carpeta; ese .html solo estorba (y el .htaccess ya lo ignora). Lo borramos.
const junkAdminHtml = path.join(dist, 'admin', 'email_campaing.html');
if (existsSync(junkAdminHtml)) {
  rmSync(junkAdminHtml);
  console.log('[postbuild] Eliminado dist/admin/email_campaing.html (home prerenderizada por error)');
}

let copied = 0;
for (const lang of langs) {
  const source = path.join(dist, `${lang}.html`);
  if (!existsSync(source)) {
    console.warn(`[postbuild] Aviso: no existe ${lang}.html en dist`);
    continue;
  }
  const dir = path.join(dist, lang);
  mkdirSync(dir, { recursive: true });
  copyFileSync(source, path.join(dir, 'index.html'));
  copied++;
}
console.log(`[postbuild] Portadas de idioma copiadas a <lang>/index.html: ${copied}/${langs.length}`);
