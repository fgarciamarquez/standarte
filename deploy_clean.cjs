const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

// Transporte SFTP (sobre SSH). Sustituye al antiguo FTP por curl: una conexión
// SSH persistente por worker (pool en paralelo) es más rápida y MUCHO más fiable
// que abrir un canal FTP por fichero (OVH cortaba conexiones → reintentos/fallos).
let SftpClient;
try {
  SftpClient = require('ssh2-sftp-client');
} catch (e) {
  console.error('[ERROR] Falta la dependencia ssh2-sftp-client. Ejecuta `npm ci` (o `npm install`).');
  process.exit(1);
}

// Host/puerto del SFTP de OVH. El acceso SFTP entra en el HOME de la cuenta, así
// que la raíz web es la carpeta relativa `www` (NO la ruta absoluta /www).
const HOST = process.env.DEPLOY_HOST || 'ftp.cluster128.hosting.ovh.net';
const PORT = parseInt(process.env.DEPLOY_PORT || '22', 10);
const REMOTE_BASE = (process.env.DEPLOY_REMOTE_DIR || 'www').replace(/^\/+|\/+$/g, '');

// Nombre del manifiesto de despliegue (vive en el servidor: www/.deploy-manifest.json).
// Guarda el hash MD5 de cada fichero ya subido para desplegar solo lo que cambió.
const MANIFEST_NAME = '.deploy-manifest.json';
const REMOTE_MANIFEST = `${REMOTE_BASE}/${MANIFEST_NAME}`;

function md5File(filePath) {
  return crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Credenciales: por entorno (CI usa secrets FTP_USER/FTP_PASS); en local, como
// respaldo, se leen de .vscode/sftp.json (fuera del repositorio).
let ftpUser = process.env.FTP_USER;
let ftpPass = process.env.FTP_PASS;
if (!ftpUser || !ftpPass) {
  try {
    const sftpConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.vscode', 'sftp.json'), 'utf8'));
    ftpUser = ftpUser || sftpConfig.username;
    ftpPass = ftpPass || sftpConfig.password;
  } catch (e) { /* sin sftp.json: se valida abajo */ }
}
if (!ftpUser || !ftpPass) {
  console.error('[ERROR] Faltan credenciales: define FTP_USER/FTP_PASS o crea .vscode/sftp.json');
  process.exit(1);
}

const CONNECT_OPTS = {
  host: HOST,
  port: PORT,
  username: ftpUser,
  password: ftpPass,
  readyTimeout: 25000,
  // Keepalive: evita que OVH cierre una conexión inactiva durante subidas largas
  // (p. ej. la conexión de control mientras los workers suben miles de ficheros).
  keepaliveInterval: 10000,
  keepaliveCountMax: 6,
  // Reintentos de la propia conexión SSH (cortes transitorios de OVH).
  retries: 3,
  retry_minTimeout: 1500
};

const CONCURRENCY = Math.max(1, parseInt(process.env.DEPLOY_CONCURRENCY || '5', 10));
const MAX_RETRIES = 4;     // reintentos por fichero
const RETRY_DELAY = 1200;  // ms (backoff lineal por intento)

const skipImages = process.argv.includes('--fast') || process.argv.includes('--skip-images');
const forceFull = process.argv.includes('--full');

console.log('==========================================================');
console.log('   STANDARTE - Despliegue y Limpieza de Producción (SFTP) ');
console.log('==========================================================\n');
console.log(`  -> Servidor SFTP: ${HOST}:${PORT}  | raíz remota: ${REMOTE_BASE}/  | paralelo: ${CONCURRENCY}`);

async function newClient() {
  const c = new SftpClient();
  await c.connect(CONNECT_OPTS);
  return c;
}

async function main() {
  // 1. Escanear la carpeta /dist/ local
  console.log('\n[1/3] Escaneando archivos compilados en local...');
  const localDist = path.join(__dirname, 'dist');
  if (!fs.existsSync(localDist)) {
    console.error('[ERROR] La carpeta local /dist/ no existe. Ejecuta primero npm run build.');
    process.exit(1);
  }
  const allFiles = getFiles(localDist);
  console.log(`  -> Detectados ${allFiles.length} archivos para procesar.`);
  if (skipImages) {
    console.log('  [OPT] Modo FAST: solo se suben imágenes NUEVAS o MODIFICADAS; las que ya están sin cambios se omiten.');
  }

  // Conexión de control (manifiesto, limpieza, creación de carpetas).
  let ctrl;
  try {
    ctrl = await newClient();
  } catch (e) {
    console.error(`[ERROR] No se pudo conectar por SFTP a ${HOST}:${PORT} — ${e.message}`);
    process.exit(1);
  }

  // Limpieza puntual: carpeta obsoleta (best-effort).
  try {
    await ctrl.rmdir(`${REMOTE_BASE}/admin/email_campaign`, true);
    console.log("  [LIMPIADO] Carpeta obsoleta 'admin/email_campaign' eliminada.");
  } catch (e) { /* no existía: ok */ }

  // 2. Manifiesto remoto (hash por fichero) ANTES de filtrar.
  let remoteManifest = {};
  if (!forceFull) {
    try {
      const buf = await ctrl.get(REMOTE_MANIFEST);
      remoteManifest = JSON.parse(buf.toString('utf8')) || {};
      console.log(`  -> Manifiesto remoto cargado: ${Object.keys(remoteManifest).length} ficheros registrados.`);
    } catch (e) {
      console.log('  -> Sin manifiesto remoto (o ilegible): despliegue completo y se creará uno nuevo.');
      remoteManifest = {};
    }
  } else {
    console.log('  -> Modo --full: se ignora el manifiesto y se sube todo.');
  }

  // Filtrar candidatos y calcular hash.
  const excludeList = ['.DS_Store', 'Thumbs.db', '.htaccess_local'];
  const candidates = [];
  let fastSkipped = 0;
  allFiles.forEach((file) => {
    const filename = path.basename(file);
    const relativePath = path.relative(localDist, file).replace(/\\/g, '/');
    if (excludeList.includes(filename)) return;
    // NUNCA subir logs de runtime (los genera el servidor).
    if (/email_campaing\/data\/(send-log|clicks|cron_status)\.json$/.test(relativePath)) return;
    const isImage = relativePath.startsWith('img/') || relativePath.includes('/img/');
    const hash = md5File(file);
    if (skipImages && isImage && remoteManifest[relativePath] === hash) { fastSkipped++; return; }
    candidates.push({ file, relativePath, hash });
  });
  if (skipImages && fastSkipped) {
    console.log(`  [OPT] Modo FAST: ${fastSkipped} imágenes sin cambios omitidas.`);
  }

  const filesToUpload = candidates.filter((c) => remoteManifest[c.relativePath] !== c.hash);
  const skipped = candidates.length - filesToUpload.length;

  // Manifiesto resultante: parte del remoto + se actualiza con lo que suba bien.
  const newManifest = Object.assign({}, remoteManifest);
  candidates.forEach((c) => { if (remoteManifest[c.relativePath] === c.hash) newManifest[c.relativePath] = c.hash; });

  console.log(`  -> Candidatos: ${candidates.length} | sin cambios: ${skipped} | A SUBIR: ${filesToUpload.length}`);

  const startTime = Date.now();
  let successCount = 0, failCount = 0, retryCount = 0;

  if (filesToUpload.length > 0) {
    console.log('\n[2/3] Creando estructura de carpetas en el servidor...');
    // Crear todas las carpetas necesarias una vez (recursivo), de menos a más profundas.
    const dirs = new Set();
    filesToUpload.forEach((c) => {
      const d = path.posix.dirname(c.relativePath);
      if (d && d !== '.') dirs.add(d);
    });
    const sortedDirs = [...dirs].sort((a, b) => a.split('/').length - b.split('/').length);
    for (const d of sortedDirs) {
      const remoteDir = `${REMOTE_BASE}/${d}`;
      try {
        if (!(await ctrl.exists(remoteDir))) await ctrl.mkdir(remoteDir, true);
      } catch (e) { /* ya existe / carrera: se ignora */ }
    }

    // 3. Subir en paralelo con un pool de conexiones SFTP.
    console.log(`\n[3/3] Sincronizando por SFTP (${CONCURRENCY} conexiones en paralelo)...`);
    let index = 0;
    const total = filesToUpload.length;
    const nextItem = () => (index < total ? filesToUpload[index++] : null);

    async function worker(id) {
      let client;
      try { client = await newClient(); } catch (e) { client = null; }
      let item;
      while ((item = nextItem()) !== null) {
        const remotePath = `${REMOTE_BASE}/${item.relativePath}`;
        let ok = false;
        for (let attempt = 1; attempt <= MAX_RETRIES && !ok; attempt++) {
          try {
            if (!client) client = await newClient();
            await client.put(item.file, remotePath);
            ok = true;
          } catch (e) {
            if (attempt < MAX_RETRIES) {
              retryCount++;
              await sleep(RETRY_DELAY * attempt);
              // Reabrir la conexión por si OVH la cortó.
              try { if (client) await client.end(); } catch (_) {}
              client = null;
            } else {
              console.error(`  [FALLÓ tras ${MAX_RETRIES} intentos] ${item.relativePath}: ${e.message}`);
              failCount++;
            }
          }
        }
        if (ok) {
          successCount++;
          newManifest[item.relativePath] = item.hash;
          const n = successCount + failCount;
          if (n % 50 === 0 || n === total) {
            console.log(`  [Progreso ${n}/${total}] ${item.relativePath}`);
          }
        }
      }
      try { if (client) await client.end(); } catch (_) {}
    }

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total) }, (_, i) => worker(i)));
  } else {
    console.log('  -> Nada que subir: el servidor ya coincide con el manifiesto.');
  }

  try { await ctrl.end(); } catch (_) {}

  // Subir el manifiesto actualizado con una conexión NUEVA en cada intento: la de
  // control puede haber quedado inactiva (y cerrada por OVH) durante una subida larga.
  // Lo que falló no se registró → se reintenta en el próximo deploy.
  let manifestOk = false;
  try {
    const tmpOut = path.join(os.tmpdir(), `standarte-out-${MANIFEST_NAME}`);
    fs.writeFileSync(tmpOut, JSON.stringify(newManifest));
    for (let attempt = 1; attempt <= 4 && !manifestOk; attempt++) {
      let mc = null;
      try { mc = await newClient(); await mc.put(tmpOut, REMOTE_MANIFEST); manifestOk = true; }
      catch (e) { await sleep(1000 * attempt); }
      finally { try { if (mc) await mc.end(); } catch (_) {} }
    }
  } catch (e) { /* error local escribiendo manifiesto */ }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n==========================================================');
  console.log('             DESPLIEGUE FINALIZADO                       ');
  console.log('==========================================================');
  console.log(`  -> Tiempo total:                          ${duration}s`);
  console.log(`  -> Archivos sincronizados en producción:  ${successCount}`);
  if (retryCount > 0) console.log(`  -> Reintentos por cortes de OVH:          ${retryCount}`);
  if (failCount > 0) console.log(`  -> Transferencias fallidas:               ${failCount}`);
  console.log(manifestOk
    ? `  -> Manifiesto actualizado (${Object.keys(newManifest).length} ficheros).`
    : '  [AVISO] No se pudo subir el manifiesto: el próximo deploy será completo.');
  console.log('==========================================================');
  console.log('¡Listo! Tu sitio web ya está online en Standarte.es.\n');
  process.exit(failCount > 0 ? 1 : 0);
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) getFiles(filePath, fileList);
    else fileList.push(filePath);
  });
  return fileList;
}

main().catch((e) => {
  console.error('[ERROR] Despliegue abortado:', e && e.message ? e.message : e);
  process.exit(1);
});
