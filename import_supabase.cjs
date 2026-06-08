const fs = require('fs');
const path = require('path');
const axios = require('axios');

// --- HELPERS ---
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

function parseCSV(content) {
    const lines = content.split('\n').filter(l => l.trim() !== '');
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // simple csv parse handling quotes
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        let matches = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
            matches.push(match[1].replace(/^"|"$/g, '').replace(/""/g, '"'));
        }
        if (matches.length >= 3) {
            data.push({
                name: matches[0],
                website: matches[1],
                group: matches[2]
            });
        }
    }
    return data;
}

async function main() {
    console.log('Cargando configuración de Supabase...');
    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) {
        console.error('No se pudo cargar la configuración de Supabase.');
        process.exit(1);
    }
    
    console.log('Leyendo CSV...');
    const csvContent = fs.readFileSync('contactos_agroexpo.csv', 'utf-8');
    const records = parseCSV(csvContent);
    
    console.log(`Encontrados ${records.length} registros para importar.`);
    
    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };
    
    let successCount = 0;
    
    for (let i = 0; i < records.length; i++) {
        const r = records[i];
        try {
            let dummyEmail = 'contacto@' + (r.website.replace(/https?:\/\/(www\.)?/,'').split('/')[0] || 'empresa.local');
            if (dummyEmail.endsWith('@')) dummyEmail += 'empresa.local';
            
            await axios.post(`${supaConfig.url}/rest/v1/contacts`, {
                email: dummyEmail,
                empresa: r.name,
                website: r.website,
                feria: 'AGROEXPO FEVAL',
                lead_group: r.group,
                lead_source: 'Scraping Agroexpo',
                status: 'active',
                updated_at: new Date().toISOString()
            }, { headers });
            
            successCount++;
            if (successCount % 10 === 0) console.log(`Importados ${successCount}...`);
        } catch(e) {
            console.error(`Error importando ${r.name}:`, e.response ? JSON.stringify(e.response.data) : e.message);
        }
    }
    
    console.log(`Completado. Importados con éxito: ${successCount} de ${records.length}.`);
}

main();
