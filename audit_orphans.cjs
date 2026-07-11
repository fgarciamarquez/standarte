// Auditoría de ficheros HUÉRFANOS en el servidor de producción (OVH).
//
// Compara lo que hay en el servidor (www/) con tu build local (dist/) y lista
// los ficheros del servidor que YA NO existen en el build: son los huérfanos que
// se acumulan (páginas renombradas/eliminadas) y consumen inodos/espacio, hasta
// impedir subir ficheros nuevos ("Write stream error: Failure").
//
// SEGURIDAD:
//   - Por defecto es DRY-RUN: solo LISTA, no borra nada.
//   - Nunca toca ficheros del servidor que no deben borrarse (PHP, secretos,
//     datos de campañas, .htaccess, el manifiesto, la carpeta admin/…): ver PROTECT.
//   - Para borrar de verdad hay que pasar --delete EXPLÍCITAMENTE (tras revisar la lista).
//
// USO (desde tu ordenador, con .vscode/sftp.json presente):
//   npm run build            # para tener dist/ al día
//   node audit_orphans.cjs             # DRY-RUN: escribe orphans_report.txt
//   node audit_orphans.cjs --delete    # borra los huérfanos listados (tras revisarlos)

const fs = require('fs');
const path = require('path');

let SftpClient;
try { SftpClient = require('ssh2-sftp-client'); }
catch (e) { console.error('[ERROR] Falta ssh2-sftp-client. Ejecuta `npm ci`.'); process.exit(1); }

const HOST = process.env.DEPLOY_HOST || 'ftp.cluster128.hosting.ovh.net';
const PORT = parseInt(process.env.DEPLOY_PORT || '22', 10);
const REMOTE_BASE = (process.env.DEPLOY_REMOTE_DIR || 'www').replace(/^\/+|\/+$/g, '');

const DO_DELETE = process.argv.includes('--delete');

// Credenciales: env (CI) o .vscode/sftp.json (local), igual que deploy_clean.cjs.
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

// Ficheros del servidor que NUNCA se consideran huérfanos (no están en dist pero
// deben permanecer): generados en runtime, secretos y configuración del hosting.
function isProtected(rel) {
  return (
    rel === '.deploy-manifest.json' ||
    /(^|\/)\.htaccess$/.test(rel) ||
    /(^|\/)\.well-known(\/|$)/.test(rel) ||
    rel.startsWith('admin/') ||                 // panel PHP + datos/secretos de campañas
    rel.includes('email_campaing/') ||          // datos y logs de campañas (runtime)
    rel.includes('email_campaign/') ||
    rel.endsWith('.php') ||                      // cualquier PHP del servidor (incl. secretos)
    rel.includes('supabase-config') ||
    rel.includes('smtp_password') ||
    rel.includes('bounce') ||
    /(^|\/)\./.test(rel)                         // cualquier fichero/carpeta oculta
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

async function listRemote(client, dir, base, out) {
  let entries;
  try { entries = await client.list(dir); }
  catch (e) { return; }
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.type === 'd') await listRemote(client, `${dir}/${e.name}`, rel, out);
    else out.push({ rel, size: e.size || 0 });
  }
}

const human = (n) => (n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`);

async function main() {
  console.log('==========================================================');
  console.log('   STANDARTE - Auditoría de huérfanos en producción       ');
  console.log('==========================================================\n');
  console.log(`  Servidor: ${HOST}:${PORT}  | raíz remota: ${REMOTE_BASE}/  | modo: ${DO_DELETE ? 'BORRADO REAL (--delete)' : 'DRY-RUN (solo lista)'}\n`);

  const localDist = path.join(__dirname, 'dist');
  if (!fs.existsSync(localDist)) {
    console.error('[ERROR] No existe dist/. Ejecuta primero `npm run build`.');
    process.exit(1);
  }
  const local = getLocalFiles(localDist, '', new Set());
  console.log(`  [1/3] Build local: ${local.size} ficheros en dist/.`);

  console.log('  [2/3] Listando el servidor (puede tardar 1-2 min)...');
  const client = new SftpClient();
  await client.connect({ host: HOST, port: PORT, username: ftpUser, password: ftpPass, readyTimeout: 25000, keepaliveInterval: 10000 });
  const remote = [];
  await listRemote(client, REMOTE_BASE, '', remote);
  console.log(`        Servidor: ${remote.length} ficheros bajo ${REMOTE_BASE}/.`);

  const orphans = remote.filter((f) => !local.has(f.rel) && !isProtected(f.rel));
  const protectedNotLocal = remote.filter((f) => !local.has(f.rel) && isProtected(f.rel));
  const totalSize = orphans.reduce((s, f) => s + f.size, 0);

  // Desglose por primer segmento de ruta, para ver de dónde vienen.
  const byTop = {};
  orphans.forEach((f) => { const top = f.rel.split('/')[0] || '(raíz)'; byTop[top] = (byTop[top] || 0) + 1; });

  console.log(`\n  [3/3] Resultado:`);
  console.log(`        Huérfanos (a borrar):     ${orphans.length}  (${human(totalSize)})`);
  console.log(`        Protegidos (se conservan): ${protectedNotLocal.length}  (PHP, datos de campañas, .htaccess, ocultos…)`);
  console.log(`\n        Huérfanos por carpeta de primer nivel:`);
  Object.entries(byTop).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`          ${String(v).padStart(6)}  ${k}/`));

  const report = orphans.map((f) => f.rel).sort();
  fs.writeFileSync(path.join(__dirname, 'orphans_report.txt'), report.join('\n') + '\n');
  fs.writeFileSync(path.join(__dirname, 'protected_report.txt'), protectedNotLocal.map((f) => f.rel).sort().join('\n') + '\n');
  console.log(`\n  -> Lista completa de huérfanos: orphans_report.txt`);
  console.log(`  -> Lista de protegidos (revisa que NADA importante quede aquí como borrable): protected_report.txt`);

  if (DO_DELETE) {
    console.log(`\n  [DELETE] Borrando ${orphans.length} huérfanos...`);
    let del = 0, fail = 0;
    for (const f of orphans) {
      try { await client.delete(`${REMOTE_BASE}/${f.rel}`); del++; if (del % 100 === 0) console.log(`          borrados ${del}/${orphans.length}`); }
      catch (e) { fail++; console.error(`          [FALLO al borrar] ${f.rel}: ${e.message}`); }
    }
    console.log(`  [DELETE] Hecho: ${del} borrados, ${fail} fallidos.`);
    console.log(`  NOTA: el manifiesto (.deploy-manifest.json) aún lista los huérfanos; el próximo deploy no los re-sube, pero conviene un deploy con --full para regenerarlo limpio.`);
  } else {
    console.log(`\n  DRY-RUN: no se ha borrado nada. Revisa orphans_report.txt y, si está bien, ejecuta:`);
    console.log(`     node audit_orphans.cjs --delete`);
  }

  try { await client.end(); } catch (e) {}
}

main().catch((e) => { console.error('[ERROR]', e.message); process.exit(1); });
