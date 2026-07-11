// Auditoría / limpieza de ficheros HUÉRFANOS en producción (OVH), vía MANIFIESTO.
//
// En vez de rastrear todo el servidor por SFTP (lentísimo), descarga el manifiesto
// del deploy (www/.deploy-manifest.json) —que ya lista todos los ficheros subidos—
// y calcula los huérfanos comparándolo con tu build local (dist/). Rápido: baja 1
// fichero y hace el diff en memoria.
//
// SEGURIDAD:
//   - Por defecto DRY-RUN: solo lista (orphans_report.txt), no borra nada.
//   - Nunca considera huérfano lo que debe permanecer (PHP, secretos, datos de
//     campañas, .htaccess, admin/, ocultos): ver isProtected().
//   - Para borrar de verdad: --delete (tras revisar la lista). Al borrar, actualiza
//     el manifiesto remoto para que quede limpio.
//
// USO (desde tu ordenador, con .vscode/sftp.json):
//   npm run build
//   node audit_orphans.cjs            # DRY-RUN
//   node audit_orphans.cjs --delete   # borra los huérfanos (tras revisarlos)

const fs = require('fs');
const path = require('path');

let SftpClient;
try { SftpClient = require('ssh2-sftp-client'); }
catch (e) { console.error('[ERROR] Falta ssh2-sftp-client. Ejecuta `npm ci`.'); process.exit(1); }

const HOST = process.env.DEPLOY_HOST || 'ftp.cluster128.hosting.ovh.net';
const PORT = parseInt(process.env.DEPLOY_PORT || '22', 10);
const REMOTE_BASE = (process.env.DEPLOY_REMOTE_DIR || 'www').replace(/^\/+|\/+$/g, '');
const MANIFEST_NAME = '.deploy-manifest.json';
const REMOTE_MANIFEST = `${REMOTE_BASE}/${MANIFEST_NAME}`;

const DO_DELETE = process.argv.includes('--delete');
const DELETE_CONCURRENCY = 4;
const MAX_RETRIES = 4;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ftpUser = process.env.FTP_USER;
let ftpPass = process.env.FTP_PASS;
if (!ftpUser || !ftpPass) {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '.vscode', 'sftp.json'), 'utf8'));
    ftpUser = ftpUser || cfg.username;
    ftpPass = ftpPass || cfg.password;
  } catch (e) { /* validado abajo */ }
}
if (!ftpUser || !ftpPass) {
  console.error('[ERROR] Faltan credenciales: define FTP_USER/FTP_PASS o crea .vscode/sftp.json');
  process.exit(1);
}

const CONNECT_OPTS = {
  host: HOST, port: PORT, username: ftpUser, password: ftpPass,
  readyTimeout: 25000, keepaliveInterval: 10000, keepaliveCountMax: 6,
  retries: 3, retry_minTimeout: 1500
};
async function newClient() { const c = new SftpClient(); await c.connect(CONNECT_OPTS); return c; }

// Ficheros del servidor que NUNCA son huérfanos (no están en dist pero deben quedarse).
function isProtected(rel) {
  return (
    rel === MANIFEST_NAME ||
    /(^|\/)\.htaccess$/.test(rel) ||
    /(^|\/)\.well-known(\/|$)/.test(rel) ||
    rel.startsWith('admin/') ||
    rel.includes('email_campaing/') ||
    rel.includes('email_campaign/') ||
    rel.endsWith('.php') ||
    rel.includes('supabase-config') ||
    rel.includes('smtp_password') ||
    rel.includes('bounce') ||
    /(^|\/)\./.test(rel)
  );
}

function getLocalFiles(dir, base, out) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(fp).isDirectory()) getLocalFiles(fp, rel, out);
    else out.add(rel);
  }
  return out;
}

async function main() {
  console.log('==========================================================');
  console.log('   STANDARTE - Auditoría de huérfanos (vía manifiesto)    ');
  console.log('==========================================================\n');
  console.log(`  Servidor: ${HOST}:${PORT} | raíz: ${REMOTE_BASE}/ | modo: ${DO_DELETE ? 'BORRADO (--delete)' : 'DRY-RUN'}\n`);

  const localDist = path.join(__dirname, 'dist');
  if (!fs.existsSync(localDist)) { console.error('[ERROR] No existe dist/. Ejecuta `npm run build` antes.'); process.exit(1); }
  const local = getLocalFiles(localDist, '', new Set());
  console.log(`  [1/3] Build local: ${local.size} ficheros.`);

  console.log('  [2/3] Descargando el manifiesto del servidor...');
  const ctrl = await newClient();
  let manifest;
  try {
    const buf = await ctrl.get(REMOTE_MANIFEST);
    manifest = JSON.parse(buf.toString('utf8')) || {};
  } catch (e) {
    console.error(`[ERROR] No se pudo leer ${REMOTE_MANIFEST}: ${e.message}`);
    try { await ctrl.end(); } catch (_) {}
    process.exit(1);
  }
  const keys = Object.keys(manifest);
  console.log(`        Manifiesto: ${keys.length} ficheros registrados en el servidor.`);

  const orphans = keys.filter((k) => !local.has(k) && !isProtected(k));
  const protectedNotLocal = keys.filter((k) => !local.has(k) && isProtected(k));

  const byTop = {};
  orphans.forEach((k) => { const t = k.split('/')[0] || '(raíz)'; byTop[t] = (byTop[t] || 0) + 1; });

  console.log(`\n  [3/3] Resultado:`);
  console.log(`        Huérfanos (a borrar):      ${orphans.length}`);
  console.log(`        Protegidos (se conservan): ${protectedNotLocal.length}`);
  console.log(`\n        Huérfanos por carpeta de primer nivel:`);
  Object.entries(byTop).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`          ${String(v).padStart(6)}  ${k}/`));

  fs.writeFileSync(path.join(__dirname, 'orphans_report.txt'), orphans.slice().sort().join('\n') + '\n');
  fs.writeFileSync(path.join(__dirname, 'protected_report.txt'), protectedNotLocal.slice().sort().join('\n') + '\n');
  console.log(`\n  -> Lista completa: orphans_report.txt (y protected_report.txt)`);

  if (!DO_DELETE) {
    console.log(`\n  DRY-RUN: no se ha borrado nada. Revisa orphans_report.txt y luego ejecuta:`);
    console.log(`     node audit_orphans.cjs --delete`);
    try { await ctrl.end(); } catch (_) {}
    return;
  }

  // ---- Borrado con pool de conexiones + reintentos (OVH corta conexiones) ----
  console.log(`\n  [DELETE] Borrando ${orphans.length} huérfanos con ${DELETE_CONCURRENCY} conexiones...`);
  const deleted = new Set();
  let idx = 0, done = 0, fail = 0;
  const nextItem = () => (idx < orphans.length ? orphans[idx++] : null);

  async function worker() {
    let client = null;
    try { client = await newClient(); } catch (e) { client = null; }
    let rel;
    while ((rel = nextItem()) !== null) {
      let ok = false;
      for (let a = 1; a <= MAX_RETRIES && !ok; a++) {
        try {
          if (!client) client = await newClient();
          await client.delete(`${REMOTE_BASE}/${rel}`);
          ok = true;
        } catch (e) {
          // "No such file" cuenta como éxito: ya no está → huérfano resuelto.
          if (/no such file|not exist|no existe/i.test(e.message)) { ok = true; break; }
          if (a < MAX_RETRIES) { await sleep(1000 * a); try { if (client) await client.end(); } catch (_) {} client = null; }
          else { fail++; console.error(`          [FALLO] ${rel}: ${e.message}`); }
        }
      }
      if (ok) { deleted.add(rel); done++; if (done % 100 === 0 || done === orphans.length) console.log(`          ${done}/${orphans.length}`); }
    }
    try { if (client) await client.end(); } catch (_) {}
  }
  await Promise.all(Array.from({ length: Math.min(DELETE_CONCURRENCY, orphans.length) }, worker));
  console.log(`  [DELETE] Hecho: ${deleted.size} borrados, ${fail} fallidos.`);

  // Actualizar el manifiesto remoto quitando lo borrado (deja el servidor coherente).
  if (deleted.size) {
    for (const rel of deleted) delete manifest[rel];
    try {
      const c2 = await newClient();
      const tmp = path.join(require('os').tmpdir(), `standarte-audit-${MANIFEST_NAME}`);
      fs.writeFileSync(tmp, JSON.stringify(manifest));
      await c2.put(tmp, REMOTE_MANIFEST);
      await c2.end();
      console.log(`  [OK] Manifiesto actualizado: ${Object.keys(manifest).length} ficheros.`);
    } catch (e) {
      console.error(`  [AVISO] No se pudo reescribir el manifiesto: ${e.message}. El próximo deploy no re-sube los huérfanos; si quieres, lanza un deploy con --full para regenerarlo.`);
    }
  }
  try { await ctrl.end(); } catch (_) {}
}

main().catch((e) => { console.error('[ERROR]', e.message); process.exit(1); });
