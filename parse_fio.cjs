const fs = require('fs');

function parseFio() {
    const html = fs.readFileSync('fio_clean.html', 'utf-8');
    // Remove tags except a and br
    let text = html.replace(/<(?!\/?(a|br)\b)[^>]+>/gi, '');
    
    // Split by lines or <br>
    const lines = text.split(/<br\s*\/?>|\n/i);
    
    const records = [];
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        // Find href
        const linkMatch = line.match(/<a[^>]+href=["'](http[^"']+)["'][^>]*>(.*?)<\/a>/i);
        if (linkMatch) {
            const url = linkMatch[1];
            let name = line.replace(/<a[^>]+>.*?<\/a>/gi, '').trim();
            // remove trailing colons or dashes
            name = name.replace(/^[:\-]+|[:\-]+$/g, '').trim();
            
            // if name is empty, try to use the link text
            if (!name) {
                name = linkMatch[2].trim();
            }
            
            // if name is a url, try to clean it or skip
            if (name.startsWith('http') || name.startsWith('www')) {
                name = name.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
            }
            
            if (url && name && !url.includes('facebook.com') && !url.includes('instagram.com') && !url.includes('twitter.com')) {
                records.push({ name, url });
            }
        }
    }
    
    // Unique records by URL
    const unique = [];
    const seen = new Set();
    for (const r of records) {
        if (!seen.has(r.url)) {
            seen.add(r.url);
            unique.push(r);
        }
    }
    
    console.log(`Extracted ${unique.length} companies.`);
    fs.writeFileSync('fio_contacts.json', JSON.stringify(unique, null, 2));
}

parseFio();
