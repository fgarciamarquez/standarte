const axios = require('axios');
const fs = require('fs');

async function getStructure() {
    try {
        const { data } = await axios.get('https://fioextremadura.es/expositores/');
        // Find a block of exhibitors, maybe they are in lists or div columns
        // Let's just output the whole body without scripts/styles
        let clean = data.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
                        
        // Let's search for some known company to see where they are
        // We will just write clean HTML to a file and read it
        fs.writeFileSync('fio_clean.html', clean);
        console.log('Written to fio_clean.html');
    } catch (e) {
        console.log(e.message);
    }
}
getStructure();
