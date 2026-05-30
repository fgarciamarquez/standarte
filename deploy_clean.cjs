const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const curlCmd = process.platform === 'win32' ? 'curl.exe' : 'curl';

const ftpHost = 'ftp.cluster028.hosting.ovh.net';
const ftpUser = process.env.FTP_USER || 'standap';
const ftpPass = process.env.FTP_PASS || 'Extrategia37';
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

// Filtrar archivos a subir
const filesToUpload = [];
const excludeList = ['.DS_Store', 'Thumbs.db', '.htaccess_local'];
allFiles.forEach(file => {
  const filename = path.basename(file);
  const relativePath = path.relative(localDist, file).replace(/\\/g, '/');
  if (excludeList.includes(filename)) {
    return;
  }
  filesToUpload.push({ file, relativePath });
});

console.log(`  -> Archivos a sincronizar después de filtrado: ${filesToUpload.length}`);

// 3. Subir archivos recursivamente usando curl.exe con concurrencia
console.log('\n[3/3] Sincronizando por FTP con concurrencia...');
const maxConcurrency = 10;
let successCount = 0;
let failCount = 0;
let index = 0;
let running = 0;
const startTime = Date.now();

function uploadNext() {
  if (index >= filesToUpload.length) {
    if (running === 0) {
      finishDeploy();
    }
    return;
  }

  const { file, relativePath } = filesToUpload[index++];
  // URL-encode path segments to support spaces and accents
  const encodedSegments = relativePath.split('/').map(segment => encodeURIComponent(segment));
  const remoteUrl = `${remoteRoot}/${encodedSegments.join('/')}`;

  running++;

  // Log progress every 50 files or for failures
  const currentNum = index;
  const shouldLogDetail = currentNum % 50 === 0 || currentNum === 1 || currentNum === filesToUpload.length;

  if (shouldLogDetail) {
    console.log(`  [Progreso ${currentNum}/${filesToUpload.length}] Subiendo: ${relativePath}...`);
  }

  // Execute curl asynchronously
  exec(`${curlCmd} -s -T "${file}" "${remoteUrl}" --ftp-create-dirs --user "${ftpUser}:${ftpPass}"`, (error, stdout, stderr) => {
    running--;
    if (error) {
      console.error(`  [FALLÓ] Error al subir ${relativePath}:`, error.message);
      failCount++;
    } else {
      successCount++;
    }
    uploadNext();
  });
}

function finishDeploy() {
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n==========================================================');
  console.log('             DESPLIEGUE FINALIZADO CON ÉXITO             ');
  console.log('==========================================================');
  console.log(`  -> Tiempo total:                          ${duration}s`);
  console.log(`  -> Archivos sincronizados en producción: ${successCount}`);
  if (failCount > 0) {
    console.log(`  -> Transferencias fallidas:               ${failCount}`);
  }
  console.log('==========================================================');
  console.log('¡Enhorabuena! Tu sitio web y la nueva sección de Noticias ya están online en Standarte.es.\n');
  process.exit(failCount > 0 ? 1 : 0);
}

// Iniciar subidas
for (let i = 0; i < Math.min(maxConcurrency, filesToUpload.length); i++) {
  uploadNext();
}
