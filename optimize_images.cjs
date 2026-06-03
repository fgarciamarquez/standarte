const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
    const configPath = path.join(__dirname, 'admin', 'email_campaing', 'config.php');
    const staticConfigPath = path.join(__dirname, 'static', 'admin', 'email_campaing', 'config.php');
    
    if (!fs.existsSync(configPath)) {
        console.error('config.php no encontrado en ' + configPath);
        return;
    }
    
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Buscar todos los src de img/trabajos/...
    const regex = /'src'\s*=>\s*'img\/trabajos\/([^']+)'/g;
    let match;
    const imagesToProcess = [];
    
    while ((match = regex.exec(configContent)) !== null) {
        imagesToProcess.push({
            originalPath: match[1], // e.g. 01/02.jpg
            fullMatch: match[0]
        });
    }
    
    console.log(`Encontradas ${imagesToProcess.length} imágenes para optimizar.`);
    
    const outputDir = path.join(__dirname, 'static', 'img', 'trabajos_email');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    let processedCount = 0;
    let updatedConfigContent = configContent;
    
    for (const img of imagesToProcess) {
        const sourceFile = path.join(__dirname, 'static', 'img', 'trabajos', img.originalPath);
        // Crear un nombre de archivo plano para evitar recrear toda la estructura de carpetas
        // Ejemplo: 01/02.jpg -> 01_02.jpg
        let flatName = img.originalPath.replace(/[\/\\]/g, '_');
        // Asegurar extensión .jpg
        flatName = flatName.replace(/\.[^.]+$/, '.jpg');
        
        const destFile = path.join(outputDir, flatName);
        const newSrc = `img/trabajos_email/${flatName}`;
        
        if (fs.existsSync(sourceFile)) {
            try {
                // Si el destino no existe o queremos forzar la creación
                await sharp(sourceFile)
                    .resize({ width: 800, withoutEnlargement: true })
                    .jpeg({ quality: 80, progressive: true })
                    .toFile(destFile);
                    
                processedCount++;
                console.log(`Optimizado [${processedCount}/${imagesToProcess.length}]: ${flatName}`);
                
                // Reemplazar en el contenido del config.php
                updatedConfigContent = updatedConfigContent.replace(
                    img.fullMatch,
                    `'src' => '${newSrc}'`
                );
            } catch (err) {
                console.error(`Error procesando ${sourceFile}:`, err.message);
            }
        } else {
            console.error(`Archivo no encontrado: ${sourceFile}`);
        }
    }
    
    // Guardar el archivo config.php actualizado
    fs.writeFileSync(configPath, updatedConfigContent, 'utf8');
    console.log(`\n¡Actualizado admin/email_campaing/config.php con las nuevas rutas!`);
    
    if (fs.existsSync(staticConfigPath)) {
        fs.writeFileSync(staticConfigPath, updatedConfigContent, 'utf8');
        console.log(`¡Actualizado static/admin/email_campaing/config.php con las nuevas rutas!`);
    }
    
    console.log('Proceso finalizado.');
}

optimizeImages();
