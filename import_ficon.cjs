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

async function main() {
    console.log('Fetching FICON...');
    const { data } = await axios.get('https://www.feval.com/ficon/expositores-2024/');
    
    const colInnerBlocks = data.split('class="col-inner"');
    const records = [];
    
    for (let i = 1; i < colInnerBlocks.length; i++) {
        const block = colInnerBlocks[i];
        const hrefMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
        const srcMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
        
        if (hrefMatch && srcMatch) {
            const url = hrefMatch[1];
            const src = srcMatch[1];
            if (url.includes('feval.com') && !url.includes('ficon')) continue; 
            if (url.includes('wp-content')) continue; 
            
            let name = '';
            const filename = src.split('/').pop();
            const logoMatch = filename.match(/Logo-([a-zA-Z0-9_-]+)/i);
            if (logoMatch) {
                name = logoMatch[1].replace(/[-_]/g, ' ').replace(/\d+x\d+/, '').trim().toUpperCase();
            } else {
                try {
                    const urlObj = new URL(url);
                    name = urlObj.hostname.replace('www.', '').split('.')[0].toUpperCase();
                } catch(e) {
                    name = 'UNKNOWN';
                }
            }
            records.push({ name, url });
        }
    }
    
    const unique = [];
    const seen = new Set();
    for (let r of records) {
        if (!seen.has(r.url)) {
            seen.add(r.url);
            unique.push(r);
        }
    }
    
    console.log(`Found ${unique.length} companies to import.`);
    
    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) return;

    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };
    
    let successCount = 0;
    for (const r of unique) {
        try {
            let domain = 'empresa.local';
            try { domain = new URL(r.url).hostname.replace('www.', ''); } catch(e){}
            
            let dummyEmail = 'contacto@' + domain;
            
            await axios.post(`${supaConfig.url}/rest/v1/contacts`, {
                email: dummyEmail,
                empresa: r.name,
                website: r.url,
                feria: 'FICON FEVAL',
                lead_group: 'FICON FEVAL DON BENITO ::: 24 Abr',
                lead_source: 'Scraping FICON',
                status: 'active',
                updated_at: new Date().toISOString()
            }, { headers });
            
            successCount++;
        } catch(e) {
            console.error(`Error importando ${r.name}:`, e.response ? JSON.stringify(e.response.data) : e.message);
        }
    }
    
    console.log(`Importados con éxito: ${successCount} de ${unique.length}.`);
}

main();
