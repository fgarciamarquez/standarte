import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = 'c:/MAMP/htdocs/STANDARTE_SVELTE/static/img';
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const ignoredFiles = ['favicon_standarte.png', 'map-marker.png']; // Conservar favicons e iconos pequeños para compatibilidad

let totalOriginalSize = 0;
let totalNewSize = 0;
let fileCount = 0;
let skippedCount = 0;
const conversionMap = [];

// Función recursiva para buscar imágenes
function getImagesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getImagesRecursively(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (allowedExtensions.includes(ext) && !ignoredFiles.includes(file)) {
        results.push(filePath);
      } else {
        skippedCount++;
      }
    }
  });
  return results;
}

async function optimize() {
  console.log('--- INICIANDO OPTIMIZACIÓN MASIVA DE IMÁGENES A AVIF (55% CALIDAD) ---');
  const images = getImagesRecursively(targetDir);
  console.log(`Se encontraron ${images.length} imágenes elegibles para conversión.`);

  for (const imgPath of images) {
    try {
      const ext = path.extname(imgPath);
      const outputDir = path.dirname(imgPath);
      const baseName = path.basename(imgPath, ext);
      const outPath = path.join(outputDir, `${baseName}.avif`);

      const stats = fs.statSync(imgPath);
      const originalSize = stats.size;
      totalOriginalSize += originalSize;

      // Leer imagen con Sharp
      let pipeline = sharp(imgPath);
      const metadata = await pipeline.metadata();

      // "Versión adaptada": redimensionar si es excesivamente grande para optimizar la carga
      let width = metadata.width;
      let height = metadata.height;
      let wasResized = false;

      const isThumb = imgPath.toLowerCase().includes('thumbs') || imgPath.toLowerCase().includes('thumbnail');

      if (isThumb && metadata.width > 600) {
        // Las miniaturas no necesitan más de 600px de ancho
        pipeline = pipeline.resize({ width: 600, withoutEnlargement: true });
        wasResized = true;
      } else if (!isThumb && metadata.width > 1920) {
        // Las imágenes full de portafolio no necesitan más de 1920px de ancho (HD estándar)
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        wasResized = true;
      }

      // Convertir a AVIF al 55% de compresión
      await pipeline
        .avif({ quality: 55 })
        .toFile(outPath);

      const newStats = fs.statSync(outPath);
      const newSize = newStats.size;
      totalNewSize += newSize;
      fileCount++;

      const savings = originalSize - newSize;
      const savingsPct = ((savings / originalSize) * 100).toFixed(1);

      console.log(`[${fileCount}/${images.length}] Convertido: ${baseName}${ext} -> .avif | Redimensionado: ${wasResized ? 'SÍ' : 'NO'} | Ahorro: ${(savings / 1024).toFixed(1)} KB (${savingsPct}%)`);

      conversionMap.push({
        original: imgPath.replace(/\\/g, '/'),
        new: outPath.replace(/\\/g, '/'),
        originalSize,
        newSize,
        wasResized
      });
    } catch (err) {
      console.error(`Error al procesar ${imgPath}:`, err.message);
    }
  }

  const totalSaved = totalOriginalSize - totalNewSize;
  const totalSavedPct = ((totalSaved / totalOriginalSize) * 100).toFixed(2);
  const originalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const newMB = (totalNewSize / (1024 * 1024)).toFixed(2);
  const savedMB = (totalSaved / (1024 * 1024)).toFixed(2);

  console.log('\n--- RESUMEN DE LA OPERACIÓN ---');
  console.log(`Imágenes convertidas con éxito: ${fileCount}`);
  console.log(`Imágenes omitidas/conservadas: ${skippedCount}`);
  console.log(`Tamaño Original Total: ${originalMB} MB`);
  console.log(`Tamaño Optimizado Total: ${newMB} MB`);
  console.log(`¡VOLUMEN DE CARGA AHORRADO!: ${savedMB} MB (${totalSavedPct}% de reducción)`);
  console.log('--------------------------------\n');

  // Actualizar referencias en el código fuente
  updateCodebaseReferences();
}

function updateCodebaseReferences() {
  console.log('--- ACTUALIZANDO REFERENCIAS DE IMÁGENES EN EL CÓDIGO ---');
  
  const filesToUpdate = [
    'c:/MAMP/htdocs/STANDARTE_SVELTE/src/lib/siteData.js',
    'c:/MAMP/htdocs/STANDARTE_SVELTE/src/lib/components/Site.svelte',
    'c:/MAMP/htdocs/STANDARTE_SVELTE/src/lib/components/MicroStand.svelte'
  ];

  filesToUpdate.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      console.log(`Archivo no encontrado, omitiendo: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let replacementCount = 0;

    // Buscar y reemplazar extensiones .jpg, .jpeg, .png, .webp por .avif en rutas que correspondan a imágenes
    // Para evitar falsos positivos, buscamos extensiones dentro de strings que apunten a carpetas de imágenes
    const regexPatterns = [
      /['"]([^'"]+?)\.(jpg|jpeg|png|webp)['"]/g
    ];

    regexPatterns.forEach(pattern => {
      content = content.replace(pattern, (match, p1, p2) => {
        // No modificar si es un archivo ignorado o un logo SVG/GIF
        const filename = `${p1.split('/').pop()}.${p2}`;
        if (ignoredFiles.includes(filename) || p2 === 'svg' || p2 === 'gif' || p1.includes('/logo_') || p1.includes('mini_logo_')) {
          return match;
        }
        replacementCount++;
        return `'${p1}.avif'`;
      });
    });

    if (replacementCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Actualizado ${path.basename(filePath)}: se reemplazaron ${replacementCount} referencias a imágenes por .avif`);
    } else {
      console.log(`Sin referencias para reemplazar en ${path.basename(filePath)}`);
    }
  });

  console.log('--- REEMPLAZO DE REFERENCIAS COMPLETADO ---');
}

optimize().catch(err => {
  console.error('Fallo en el script de optimización:', err);
});
