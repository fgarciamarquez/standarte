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

async function main() {
    console.log('Cargando configuración de Supabase...');
    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) {
        console.error('No se pudo cargar la configuración de Supabase.');
        process.exit(1);
    }
    
    console.log('Leyendo JSON...');
    const jsonContent = fs.readFileSync('fio_contacts.json', 'utf-8');
    const records = JSON.parse(jsonContent);
    
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
            let dummyEmail = 'contacto@' + (r.url.replace(/https?:\/\/(www\.)?/,'').split('/')[0] || 'empresa.local');
            if (dummyEmail.endsWith('@')) dummyEmail += 'empresa.local';
            
            await axios.post(`${supaConfig.url}/rest/v1/contacts`, {
                email: dummyEmail,
                empresa: r.name,
                website: r.url,
                feria: 'FIO EXTREMADURA',
                lead_group: 'FERIA INTERNACIONAL DE TURISMO ORNITOLÓGICO FEVAL DON BENITO ::: 26 Feb',
                lead_source: 'Scraping FIO',
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
