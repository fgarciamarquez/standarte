const fs = require('fs');

function testAllLinks() {
    const data = fs.readFileSync('C:\\Users\\javie\\.gemini\\antigravity\\brain\\cb8af727-7f62-4550-8d5e-63c17bc9d98e\\.system_generated\\steps\\169\\content.md', 'utf-8');
    
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    const links = [];
    while ((match = hrefRegex.exec(data)) !== null) {
        const url = match[1];
        if (url.includes('feval.com/fial/')) {
            links.push(url);
        }
    }
    
    const unique = [...new Set(links)].filter(l => 
        !l.endsWith('/fial/') && 
        !l.includes('wp-json') && 
        !l.includes('expositores') && 
        !l.includes('programa') &&
        !l.includes('contacto') &&
        !l.includes('noticias') &&
        !l.includes('solicitud') &&
        !l.includes('feed') &&
        !l.includes('xmlrpc') &&
        !l.includes('wp-includes') &&
        !l.includes('wp-content')
    );
    
    console.log(`Found ${unique.length} potential exhibitor links:`);
    console.log(unique);
}
testAllLinks();
