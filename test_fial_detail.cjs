const axios = require('axios');

async function testDetail() {
    try {
        const { data } = await axios.get('http://www.feval.com/fial/acopaex-s-coop/');
        
        // Output title and some links
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
        
        // Find external links
        const hrefRegex = /<a[^>]+href=["']([^"']+)["']/gi;
        let match;
        const links = [];
        while ((match = hrefRegex.exec(data)) !== null) {
            const url = match[1];
            if (!url.includes('feval.com') && url.startsWith('http')) {
                links.push(url);
            }
        }
        console.log('External Links:', [...new Set(links)]);
    } catch(e) {
        console.error(e.message);
    }
}
testDetail();
