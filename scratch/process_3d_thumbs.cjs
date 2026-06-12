const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = ['3D_prototype', '3D Prototype 2'];

async function processThumbs() {
    console.log('Scanning 3D prototypes for thumbnail generation...');
    
    for (const dirName of directories) {
        const prototypeDir = path.join(__dirname, '..', 'static', 'img', dirName);
        console.log(`Scanning directory: ${prototypeDir}`);
        
        if (!fs.existsSync(prototypeDir)) {
            console.warn(`Directory not found: ${prototypeDir}`);
            continue;
        }
        
        const files = fs.readdirSync(prototypeDir);
        const avifFiles = files.filter(f => f.endsWith('.avif') && !f.endsWith('-thumb.avif'));
        
        console.log(`Found ${avifFiles.length} original AVIF images in ${dirName}.`);
        
        let generatedCount = 0;
        let skippedCount = 0;
        
        for (const file of avifFiles) {
            const srcPath = path.join(prototypeDir, file);
            const thumbName = file.replace('.avif', '-thumb.avif');
            const destPath = path.join(prototypeDir, thumbName);
            
            if (fs.existsSync(destPath)) {
                skippedCount++;
                continue;
            }
            
            try {
                await sharp(srcPath)
                    .resize({ width: 480, withoutEnlargement: true })
                    .avif({ quality: 65 })
                    .toFile(destPath);
                
                generatedCount++;
                if (generatedCount % 20 === 0) {
                    console.log(`[${dirName}] Generated ${generatedCount} thumbnails...`);
                }
            } catch (err) {
                console.error(`[ERROR] Failed generating thumbnail for ${file} in ${dirName}:`, err.message);
            }
        }
        
        console.log(`Finished processing ${dirName} thumbnails. Generated: ${generatedCount}, Skipped: ${skippedCount}`);
    }
    console.log('Thumbnail generation completed.');
}

processThumbs();

