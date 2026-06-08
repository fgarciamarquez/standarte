const fs = require('fs');
const path = require('path');
const axios = require('axios');

function loadSupabaseConfig() {
    const configPath = path.join(__dirname, 'supabase-config.php');
    if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        const urlMatch = content.match(/define\s*\(\s*['"]SUPABASE_URL['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
        const keyMatch = content.match(/define\s*\(\s*['"]SUPABASE_KEY['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
        if (urlMatch && keyMatch) {
            return { url: urlMatch[1], key: keyMatch[1] };
        }
    }
    return null;
}

const SKIP_LINKS = ['facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com', 'youtube.com', 'feval.com', 'vimeo.com'];

async function fetchExhibitor(url) {
    try {
        const { data } = await axios.get(url, { timeout: 10000 });
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        let name = titleMatch ? titleMatch[1] : '';
        name = name.replace(/&#8211;\s*FIAL\s*\d+/i, '').trim();
        name = name.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
        if (name.endsWith('-')) name = name.substring(0, name.length - 1).trim();
        
        // Sometimes the page is empty or just "FIAL 2021"
        if (name.includes('FIAL') && name.length < 15) return null;
        
        const hrefRegex = /<a[^>]+href=["'](http[^"']+)["']/gi;
        let match;
        let extLink = '';
        while ((match = hrefRegex.exec(data)) !== null) {
            const link = match[1];
            if (!SKIP_LINKS.some(s => link.includes(s))) {
                extLink = link;
                break;
            }
        }
        
        return { name, url: extLink || url };
    } catch (e) {
        return null;
    }
}

async function main() {
    console.log('Fetching FIAL Expositores list...');
    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) return;

    const { data } = await axios.get('https://www.feval.com/fial/expositores/');
    
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    const links = [];
    while ((match = hrefRegex.exec(data)) !== null) {
        const url = match[1];
        if (url.includes('feval.com/fial/')) {
            links.push(url.replace('&amp;', '&'));
        }
    }
    
    const uniquePages = [...new Set(links)].filter(l => 
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
        !l.includes('wp-content') &&
        !l.includes('?p=474')
    );
    
    console.log(`Found ${uniquePages.length} exhibitor pages. Processing...`);
    
    const records = [];
    for (let i = 0; i < uniquePages.length; i += 5) {
        const batch = uniquePages.slice(i, i + 5);
        const results = await Promise.all(batch.map(url => fetchExhibitor(url)));
        for (const res of results) {
            if (res && res.name) records.push(res);
        }
        console.log(`Processed ${i + batch.length} / ${uniquePages.length}...`);
    }
    
    console.log(`Successfully extracted ${records.length} companies. Importing to Supabase...`);

    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };
    
    let successCount = 0;
    for (const r of records) {
        try {
            let domain = 'empresa.local';
            try { domain = new URL(r.url).hostname.replace('www.', ''); } catch(e){}
            if (domain.includes('feval.com')) {
                domain = r.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.local';
            }
            
            let dummyEmail = 'contacto@' + domain;
            
            await axios.post(`${supaConfig.url}/rest/v1/contacts`, {
                email: dummyEmail,
                empresa: r.name,
                website: r.url,
                feria: 'FIAL FEVAL',
                lead_group: 'FIAL Feria ibérica de Alimentación, Hostelería y Tecnología Alimentaria FEVAL Don Benito ::: 26 May',
                lead_source: 'Scraping FIAL',
                status: 'active',
                updated_at: new Date().toISOString()
            }, { headers });
            
            successCount++;
        } catch(e) {
            if (e.response && e.response.data.code !== '23505') {
                console.error(`Error importando ${r.name}:`, JSON.stringify(e.response.data));
            }
        }
    }
    
    console.log(`Importados con éxito: ${successCount} de ${records.length}.`);
}

main();
