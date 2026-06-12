const fs = require('fs');
const ftp = require('basic-ftp');
const path = require('path');

const directories = ['3D_prototype', '3D Prototype 2'];

async function syncThumbs() {
    const configPath = path.join(__dirname, '..', '.vscode', 'sftp.json');
    if (!fs.existsSync(configPath)) return console.error("No config file");
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    const client = new ftp.Client();
    client.ftp.verbose = false;
    
    try {
        await client.access({
            host: config.host || "ftp.cluster028.hosting.ovh.net",
            user: config.username,
            password: config.password,
            secure: false
        });
        
        console.log("Connected to FTP.");
        
        for (const dirName of directories) {
            const localDir = path.join(__dirname, '..', 'static', 'img', dirName);
            const remoteDir = `/www/img/${dirName}`;
            
            // Ensure remote directory exists
            await client.ensureDir(remoteDir);
            
            console.log(`Listing remote files in ${remoteDir}...`);
            const remoteFiles = await client.list(remoteDir);
            const remoteFileNames = new Set(remoteFiles.map(f => f.name));
            
            console.log(`Found ${remoteFileNames.size} files on remote server in ${dirName}.`);
            
            const localFiles = fs.readdirSync(localDir).filter(f => f.endsWith('-thumb.avif'));
            console.log(`Found ${localFiles.length} local thumbnails in ${dirName}.`);
            
            const filesToUpload = localFiles.filter(f => !remoteFileNames.has(f));
            console.log(`Need to upload ${filesToUpload.length} new thumbnails to ${dirName}.`);
            
            let uploaded = 0;
            for (const file of filesToUpload) {
                const localFile = path.join(localDir, file);
                const remoteFile = `${remoteDir}/${file}`;
                
                await client.uploadFrom(localFile, remoteFile);
                uploaded++;
                if (uploaded % 20 === 0) {
                    console.log(`[${dirName}] Uploaded ${uploaded}/${filesToUpload.length} thumbnails...`);
                }
            }
            
            console.log(`Successfully uploaded ${uploaded} new thumbnails to ${dirName}.`);
        }
    } catch(err) {
        console.error("FTP error during thumbnail sync:", err);
    }
    client.close();
}

syncThumbs();

