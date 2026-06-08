const ftp = require("basic-ftp");
const path = require("path");

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
        
        console.log("Connected. Syncing dist directory...");
        
        // uploadFromDir overwrites files if they exist, but doesn't delete remote orphans.
        // That's fine for our needs here, it's safe.
        await client.uploadFromDir("c:/MAMP/htdocs/STANDARTE_SVELTE/dist", "/www");
        
        console.log("Upload successful");
    }
    catch(err) {
        console.log("Upload failed: " + err);
    }
    client.close();
}

syncFTP();
