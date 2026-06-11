const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");

async function syncFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.cluster028.hosting.ovh.net",
            user: "standap",
            password: "Extrategia37",
            secure: false
        });
        
        console.log("Connected. Starting optimized sync (skipping img directory)...");
        
        const localDistRoot = "c:/MAMP/htdocs/STANDARTE_SVELTE/dist";
        const remoteRoot = "/www";
        
        async function uploadRecursive(localDir, remoteDir) {
            const entries = fs.readdirSync(localDir, { withFileTypes: true });
            
            for (const entry of entries) {
                const localPath = path.join(localDir, entry.name);
                const remotePath = path.posix.join(remoteDir, entry.name);
                
                if (entry.isDirectory()) {
                    // Skip the massive images directory which hasn't changed
                    if (entry.name === "img" && localDir === localDistRoot) {
                        console.log("Skipping 'img' directory to prevent FTP timeouts...");
                        continue;
                    }
                    
                    console.log(`Ensuring directory ${remotePath}...`);
                    await client.ensureDir(remotePath);
                    await uploadRecursive(localPath, remotePath);
                } else if (entry.isFile()) {
                    console.log(`Uploading ${localPath} -> ${remotePath}...`);
                    await client.uploadFrom(localPath, remotePath);
                }
            }
        }
        
        await client.ensureDir(remoteRoot);
        await uploadRecursive(localDistRoot, remoteRoot);
        
        console.log("Upload successful!");
    }
    catch(err) {
        console.log("Upload failed: " + err);
    }
    client.close();
}

syncFTP();
