const ftp = require("basic-ftp");
const path = require("path");

async function uploadForm() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.cluster028.hosting.ovh.net",
            user: "standap",
            password: "Extrategia37",
            secure: false
        });
        await client.uploadFrom("c:/MAMP/htdocs/STANDARTE_SVELTE/dist/admin/config.php", "/www/admin/config.php");
        console.log("Upload successful");
    }
    catch(err) {
        console.log("Upload failed: " + err);
    }
    client.close();
}

uploadForm();
