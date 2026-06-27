const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { exec, execSync } = require('child_process');

const curlCmd = process.platform === 'win32' ? 'curl.exe' : 'curl';

const ftpHost = 'ftp.cluster028.hosting.ovh.net';

// Nombre del manifiesto de despliegue (vive en el servidor: /www/.deploy-manifest.json).
// Guarda el hash MD5 de cada fichero ya subido para poder desplegar solo lo que cambió.
const MANIFEST_NAME = '.deploy-manifest.json';

function md5File(filePath) {
  return crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}

// Credenciales: por entorno (CI usa secrets FTP_USER/FTP_PASS); en local,
// como respaldo, se leen de .vscode/sftp.json (fuera del repositorio).
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
  console.error('[ERROR] Faltan credenciales FTP: define FTP_USER/FTP_PASS o crea .vscode/sftp.json');
  process.exit(1);
}
const remoteRoot = 'ftp://ftp.cluster028.hosting.ovh.net/www';

console.log('==========================================================');
console.log('   STANDARTE - Despliegue y Limpieza de Producción Node   ');
console.log('==========================================================\n');

// 1. Tarea de Limpieza: Eliminar directorios obsoletos en OVH
console.log('[1/3] Iniciando limpieza de directorios obsoletos...');
try {
  console.log("  -> Solicitando eliminación de la carpeta obsoleta 'admin/email_campaign'...");
  const { execSync } = require('child_process');
  execSync(`${curlCmd} -s -Q "RMD admin/email_campaign" "${remoteRoot}/" --user "${ftpUser}:${ftpPass}"`, { stdio: 'ignore' });
  console.log('  [LIMPIADO] Carpeta obsoleta eliminada del servidor.');
} catch (error) {
  console.log('  -> Carpeta obsoleta no existía o ya estaba limpia en el servidor.');
}

// 2. Escanear recursivamente la carpeta /dist/ local
console.log('\n[2/3] Escaneando archivos compilados en local...');
const localDist = path.join(__dirname, 'dist');
if (!fs.existsSync(localDist)) {
  console.error('[ERROR] La carpeta local /dist/ no existe. Ejecuta primero npm run build.');
  process.exit(1);
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getFiles(localDist);
console.log(`  -> Detectados ${allFiles.length} archivos para procesar.`);

const skipImages = process.argv.includes('--fast') || process.argv.includes('--skip-images');
if (skipImages) {
  console.log('  [OPT] Modo FAST: solo se subirán imágenes NUEVAS o MODIFICADAS (las que ya están sin cambios se omiten).');
}

// Despliegue INCREMENTAL: descargar el manifiesto del servidor (hash por fichero) ANTES de
// filtrar, para poder decidir qué imágenes están sin cambios. El manifiesto vive en el
// servidor, así que vale igual para local y CI. Con --full se ignora y se resube todo.
const forceFull = process.argv.includes('--full');
let remoteManifest = {};
if (!forceFull) {
  try {
    const tmpManifest = path.join(os.tmpdir(), `standarte-${MANIFEST_NAME}`);
    execSync(`${curlCmd} -s -f -o "${tmpManifest}" "${remoteRoot}/${MANIFEST_NAME}" --user "${ftpUser}:${ftpPass}"`, { stdio: 'ignore' });
    remoteManifest = JSON.parse(fs.readFileSync(tmpManifest, 'utf8')) || {};
    console.log(`  -> Manifiesto remoto cargado: ${Object.keys(remoteManifest).length} ficheros registrados.`);
  } catch (e) {
    console.log('  -> Sin manifiesto remoto (o ilegible): se hará un despliegue completo y se creará uno nuevo.');
    remoteManifest = {};
  }
} else {
  console.log('  -> Modo --full: se ignora el manifiesto y se sube todo.');
}

// Filtrar archivos candidatos (y calcular su hash de contenido)
const candidates = [];
const excludeList = ['.DS_Store', 'Thumbs.db', '.htaccess_local'];
let fastSkipped = 0;
allFiles.forEach(file => {
  const filename = path.basename(file);
  const relativePath = path.relative(localDist, file).replace(/\\/g, '/');
  if (excludeList.includes(filename)) {
    return;
  }
  // NUNCA subir los logs de runtime: los genera el servidor; subirlos los sobrescribiría/borraría.
  if (/email_campaing\/data\/(send-log|clicks|cron_status)\.json$/.test(relativePath)) {
    return;
  }
  const isImage = relativePath.startsWith('img/') || relativePath.includes('/img/');
  const hash = md5File(file);
  // Modo FAST: omitimos solo las imágenes que YA están en el manifiesto SIN cambios (mismo
  // hash). Las imágenes NUEVAS o MODIFICADAS sí se suben, para que añadir una portada y
  // desplegar nunca la deje rota (sin necesidad de acordarse de usar --full).
  if (skipImages && isImage && remoteManifest[relativePath] === hash) {
    fastSkipped++;
    return;
  }
  candidates.push({ file, relativePath, hash });
});
if (skipImages && fastSkipped) {
  console.log(`  [OPT] Modo FAST: ${fastSkipped} imágenes sin cambios omitidas; las nuevas/modificadas sí se suben.`);
}

// Subir solo los ficheros cuyo hash difiere del registrado (o nuevos)
const filesToUpload = candidates.filter(c => remoteManifest[c.relativePath] !== c.hash);
const skipped = candidates.length - filesToUpload.length;

// Manifiesto que quedará tras este deploy: parte del remoto + se actualiza con lo que suba bien.
const newManifest = Object.assign({}, remoteManifest);
// Los ficheros sin cambios ya están en newManifest (heredados del remoto); se confirma su hash.
candidates.forEach(c => { if (remoteManifest[c.relativePath] === c.hash) newManifest[c.relativePath] = c.hash; });

console.log(`  -> Candidatos: ${candidates.length} | sin cambios: ${skipped} | A SUBIR: ${filesToUpload.length}`);

// 3. Subir archivos recursivamente usando curl.exe con concurrencia
console.log('\n[3/3] Sincronizando por FTP con concurrencia...');
const maxConcurrency = 6;  // OVH corta conexiones FTP con demasiada concurrencia
const MAX_RETRIES = 3;     // reintentar transferencias caídas (cortes transitorios de OVH)
const RETRY_DELAY = 1200;  // ms entre reintentos (backoff lineal por intento)
let successCount = 0;
let failCount = 0;
let retryCount = 0;
let index = 0;
let running = 0;
const startTime = Date.now();

function uploadFile(item, attempt) {
  const { file, relativePath } = item;
  // URL-encode path segments to support spaces and accents
  const encodedSegments = relativePath.split('/').map(segment => encodeURIComponent(segment));
  const remoteUrl = `${remoteRoot}/${encodedSegments.join('/')}`;

  // curl.exe en Windows NO abre rutas LOCALES con caracteres no-ASCII (las interpreta en el
  // codepage del sistema, no en UTF-8) → fallaba siempre al subir las páginas japonesas con
  // slug no-ASCII (ej. dist/ja/マドリード展示会ブース.html). Para esos ficheros subimos desde
  // una copia temporal con nombre ASCII; la ruta REMOTA va %-encoded (OVH la acepta).
  let localToSend = file;
  let tempCopy = null;
  if (/[^\x00-\x7F]/.test(file)) {
    try {
      tempCopy = path.join(os.tmpdir(), `stx-${crypto.randomBytes(8).toString('hex')}.tmp`);
      fs.copyFileSync(file, tempCopy);
      localToSend = tempCopy;
    } catch (e) { tempCopy = null; localToSend = file; }
  }

  // Execute curl asynchronously
  exec(`${curlCmd} -s -T "${localToSend}" "${remoteUrl}" --ftp-create-dirs --user "${ftpUser}:${ftpPass}"`, (error) => {
    if (tempCopy) { try { fs.unlinkSync(tempCopy); } catch (e) { /* ignore */ } }
    if (error) {
      if (attempt < MAX_RETRIES) {
        // Corte transitorio de OVH: reintentar el mismo fichero tras una espera (sin liberar el slot)
        retryCount++;
        setTimeout(() => uploadFile(item, attempt + 1), RETRY_DELAY * attempt);
        return;
      }
      console.error(`  [FALLÓ tras ${MAX_RETRIES} intentos] ${relativePath}:`, error.message);
      failCount++;
      // No se registra en el manifiesto: así el próximo deploy lo reintenta.
    } else {
      successCount++;
      newManifest[relativePath] = item.hash;
    }
    running--;
    uploadNext();
  });
}

function uploadNext() {
  if (index >= filesToUpload.length) {
    if (running === 0) {
      finishDeploy();
    }
    return;
  }

  const item = filesToUpload[index++];
  running++;

  // Log progress every 50 files
  const currentNum = index;
  const shouldLogDetail = currentNum % 50 === 0 || currentNum === 1 || currentNum === filesToUpload.length;
  if (shouldLogDetail) {
    console.log(`  [Progreso ${currentNum}/${filesToUpload.length}] Subiendo: ${item.relativePath}...`);
  }

  uploadFile(item, 1);
}

function finishDeploy() {
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n==========================================================');
  console.log('             DESPLIEGUE FINALIZADO CON ÉXITO             ');
  console.log('==========================================================');
  console.log(`  -> Tiempo total:                          ${duration}s`);
  console.log(`  -> Archivos sincronizados en producción: ${successCount}`);
  if (retryCount > 0) {
    console.log(`  -> Reintentos por cortes de OVH:          ${retryCount}`);
  }
  if (failCount > 0) {
    console.log(`  -> Transferencias fallidas:               ${failCount}`);
  }

  // Subir el manifiesto actualizado al servidor (registro de lo que está desplegado).
  // Si algún fichero falló, su hash NO se actualizó, así que el próximo deploy lo reintenta.
  try {
    const tmpOut = path.join(os.tmpdir(), `standarte-out-${MANIFEST_NAME}`);
    fs.writeFileSync(tmpOut, JSON.stringify(newManifest));
    let manifestOk = false;
    for (let attempt = 1; attempt <= 3 && !manifestOk; attempt++) {
      try {
        execSync(`${curlCmd} -s -T "${tmpOut}" "${remoteRoot}/${MANIFEST_NAME}" --ftp-create-dirs --user "${ftpUser}:${ftpPass}"`, { stdio: 'ignore' });
        manifestOk = true;
      } catch (e) { /* reintento */ }
    }
    console.log(manifestOk
      ? `  -> Manifiesto actualizado (${Object.keys(newManifest).length} ficheros).`
      : '  [AVISO] No se pudo subir el manifiesto: el próximo deploy será completo.');
  } catch (e) {
    console.log('  [AVISO] Error escribiendo el manifiesto local:', e.message);
  }

  console.log('==========================================================');
  console.log('¡Enhorabuena! Tu sitio web y la nueva sección de Noticias ya están online en Standarte.es.\n');
  process.exit(failCount > 0 ? 1 : 0);
}

// Iniciar subidas (o cerrar directamente si no hay nada que subir)
if (filesToUpload.length === 0) {
  console.log('  -> Nada que subir: el servidor ya coincide con el manifiesto.');
  finishDeploy();
} else {
  for (let i = 0; i < Math.min(maxConcurrency, filesToUpload.length); i++) {
    uploadNext();
  }
}
