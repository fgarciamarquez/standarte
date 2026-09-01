// Guardián de las redirecciones (static/.htaccess) contra las URLs reales del sitio.
//
// POR QUÉ EXISTE (2026-09-01): /ferias/ no solo contiene fichas de feria. Al publicar
// la página paralela /ferias/constructor-stand-figan, la regla 301 genérica que añade
// el prefijo 'stand-' a las URLs antiguas de feria la capturó y la mandó a
// /ferias/stand-constructor-stand-figan, que no existe: Google la vio como 404 el
// mismo día de publicarla. El build no podía detectarlo porque las reglas viven en
// Apache, no en el código.
//
// QUÉ COMPRUEBA: ninguna URL canónica del sitemap puede ser capturada por una regla
// de redirección. Una canónica que redirige es una página inalcanzable, se anuncie
// donde se anuncie.
//
// ALCANCE: solo reglas de redirección EXTERNA (destino http…) y SIN RewriteCond
// previa. Las condicionadas (canonicalización de dominio, barra final, homes de
// idioma) dependen de estado que aquí no se puede simular; modelarlas mal daría
// falsos positivos y acabaría con el guardián desactivado, que es peor que no tenerlo.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const htaccess = readFileSync(path.join(root, 'static/.htaccess'), 'utf8').split(/\r?\n/);
const sitemap = readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');

// Reglas candidatas: RewriteRule <patrón> http… sin RewriteCond inmediatamente antes.
const rules = [];
let pendingConds = 0;
htaccess.forEach((raw, idx) => {
  const line = raw.trim();
  if (line === '' || line.startsWith('#')) return;          // los comentarios no cortan un bloque cond+rule
  if (/^RewriteCond\s/i.test(line)) { pendingConds++; return; }
  const m = /^RewriteRule\s+(\S+)\s+(\S+)/i.exec(line);
  if (m) {
    const [, pattern, target] = m;
    if (pendingConds === 0 && /^https?:/i.test(target)) {
      try { rules.push({ line: idx + 1, re: new RegExp(pattern), target }); }
      catch { /* patrón que JS no sabe compilar: se ignora en vez de romper el build */ }
    }
    pendingConds = 0;
    return;
  }
  pendingConds = 0;                                          // cualquier otra directiva cierra el bloque
});

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const errors = [];
for (const loc of locs) {
  let p;
  try { p = decodeURI(new URL(loc).pathname).replace(/^\//, ''); } catch { continue; }
  if (p === '') continue;
  for (const r of rules) {
    if (r.re.test(p)) { errors.push(`/${p} → la regla de la línea ${r.line} lo redirige (${r.target})`); break; }
  }
}

if (errors.length) {
  console.error(`✖ check_htaccess_redirects: ${errors.length} URL(s) canónica(s) capturada(s) por una redirección de .htaccess:`);
  errors.slice(0, 20).forEach((e) => console.error('   - ' + e));
  if (errors.length > 20) console.error(`   ... y ${errors.length - 20} más`);
  console.error('   Una canónica que redirige es una página inalcanzable: excluye esa URL de la regla.');
  process.exit(1);
}
console.log(`[check-htaccess] ✔ OK — ninguna de las ${locs.length} URLs del sitemap cae en las ${rules.length} reglas de redirección incondicionales.`);
