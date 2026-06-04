const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 1. Obtener la configuración de Supabase
function loadSupabaseConfig() {
    const configPaths = [
        path.join(__dirname, '..', 'supabase-config.php'),
        path.join(__dirname, '..', 'static', 'supabase-config.php')
    ];
    
    for (const configPath of configPaths) {
        if (fs.existsSync(configPath)) {
            const content = fs.readFileSync(configPath, 'utf-8');
            const urlMatch = content.match(/define\s*\(\s*['"]SUPABASE_URL['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
            const keyMatch = content.match(/define\s*\(\s*['"]SUPABASE_KEY['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
            
            if (urlMatch && keyMatch) {
                return { url: urlMatch[1], key: keyMatch[1] };
            }
        }
    }
    return null;
}

// 2. Helper de Supabase
async function supabaseRequest(supaConfig, method, endpoint, data = null) {
    const url = supaConfig.url + '/rest/v1/' + endpoint;
    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json'
    };
    
    const config = {
        method: method,
        url: url,
        headers: headers,
        timeout: 15000
    };
    
    if (data) {
        config.data = data;
    }
    
    return axios(config);
}

// 3. Reglas de detección de idiomas basadas en TLD
// Mapeo de TLD -> Idioma
const tldLanguageMap = {
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'pt': 'pt',
    'it': 'it', // Nota: Si template.php no soporta 'it', caerá en 'en' o 'default' luego
    'uk': 'en',
    'co.uk': 'en',
    'us': 'en',
    'ch': 'de', // Suiza (por defecto de, aunque hablan fr/it tmb)
    'at': 'de', // Austria
    'be': 'fr', // Bélgica (por defecto fr, aunque hablan nl)
    'nl': 'en', // Holanda (inglés si no hay traducción nl)
};

function extractTld(domainOrEmail) {
    if (!domainOrEmail) return null;
    try {
        let domain = domainOrEmail.toLowerCase().trim();
        // Si es un email
        if (domain.includes('@')) {
            domain = domain.split('@')[1];
        }
        // Si es una URL
        else if (domain.startsWith('http')) {
            const url = new URL(domain);
            domain = url.hostname;
        }
        
        const parts = domain.split('.');
        if (parts.length > 1) {
            // Check co.uk style
            const lastTwo = parts.slice(-2).join('.');
            if (tldLanguageMap[lastTwo]) return lastTwo;
            // Check normal TLD
            return parts[parts.length - 1];
        }
    } catch (e) {
        return null;
    }
    return null;
}

async function fetchLanguageFromWebsite(website) {
    if (!website) return null;
    let url = website;
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    
    try {
        const response = await axios.get(url, { timeout: 4000 });
        const html = response.data;
        
        // 1. Buscar el atributo lang en el tag html
        const langMatch = html.match(/<html[^>]*lang=["']([^"'-]+)[^"']*["']/i);
        if (langMatch && langMatch[1]) {
            const lang = langMatch[1].toLowerCase();
            if (['es', 'en', 'fr', 'de', 'pt', 'it'].includes(lang)) {
                return lang;
            }
        }
        
        // 2. Buscar prefijos telefónicos si no hay lang
        if (html.includes('+34')) return 'es';
        if (html.includes('+33')) return 'fr';
        if (html.includes('+49')) return 'de';
        if (html.includes('+351')) return 'pt';
        if (html.includes('+39')) return 'it';
        if (html.includes('+44') || html.includes('+1 ')) return 'en';
        
    } catch (e) {
        // Ignorar fallos de web (timeout, ssl, etc.)
    }
    return null;
}

async function detectLanguage(email, website) {
    const emailTld = extractTld(email);
    const webTld = extractTld(website);
    
    const tld = emailTld || webTld;
    
    if (tld) {
        if (tldLanguageMap[tld]) {
            return tldLanguageMap[tld];
        }
    }
    
    // Si no es un TLD geográfico conocido (e.g. .com, .net) o no pudimos saberlo
    if (website || email) {
        // Intentar parsear la web
        let urlToCheck = website;
        if (!urlToCheck && email && email.includes('@')) {
            urlToCheck = 'www.' + email.split('@')[1];
        }
        
        const langFromWeb = await fetchLanguageFromWebsite(urlToCheck);
        if (langFromWeb) {
            return langFromWeb;
        }
    }
    
    // Fallback acordado para .com, .net, etc.
    const genericTlds = ['com', 'net', 'org', 'info', 'biz', 'io', 'co', 'eu'];
    if (tld && genericTlds.includes(tld)) {
        return 'en'; 
    }
    
    return null; // Si no podemos determinar, null (se decidirá por la feria)
}

// 4. Script Principal
async function main() {
    const args = process.argv.slice(2);
    let tableName = 'contacts';
    const tableArgIndex = args.indexOf('--table');
    if (tableArgIndex !== -1 && args[tableArgIndex + 1]) {
        tableName = args[tableArgIndex + 1];
    }
    
    const config = loadSupabaseConfig();
    if (!config) {
        console.error("❌ No se encontró la configuración de Supabase.");
        process.exit(1);
    }
    
    console.log(`⚡ Obteniendo contactos de Supabase (Tabla: ${tableName})...`);
    let allContacts = [];
    let offset = 0;
    const limit = 1000;
    let fetching = true;
    
    while (fetching) {
        try {
            const res = await supabaseRequest(config, 'GET', `${tableName}?select=id,email,website,language&limit=${limit}&offset=${offset}`);
            if (res.data && res.data.length > 0) {
                allContacts = allContacts.concat(res.data);
                offset += limit;
                if (res.data.length < limit) fetching = false;
            } else {
                fetching = false;
            }
        } catch (err) {
            console.error(`Error obteniendo contactos de ${tableName}:`, err.message);
            fetching = false;
        }
    }
    
    console.log(`✅ Total de contactos recuperados: ${allContacts.length}`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let noChangeCount = 0;
    
    console.log("🔍 Analizando idiomas (este proceso puede tardar al analizar sitios web)...");
    for (const contact of allContacts) {
        const detectedLang = await detectLanguage(contact.email, contact.website);
        
        if (detectedLang) {
            // Si el contacto ya tiene este idioma, lo saltamos
            if (contact.language === detectedLang) {
                noChangeCount++;
                continue;
            }
            
            try {
                await supabaseRequest(config, 'PATCH', `${tableName}?id=eq.${contact.id}`, {
                    language: detectedLang
                });
                updatedCount++;
                console.log(`  [UPDATE] ${contact.email} -> ${detectedLang}`);
            } catch (err) {
                console.error(`  [ERROR] Fallo al actualizar ${contact.email}:`, err.message);
            }
        } else {
            skippedCount++;
        }
    }
    
    console.log("\n🚀 ¡Proceso finalizado!");
    console.log(`   - Contactos actualizados con nuevo idioma: ${updatedCount}`);
    console.log(`   - Contactos que ya tenían su idioma correcto: ${noChangeCount}`);
    console.log(`   - Contactos sin TLD geográfico ni web analizable (se decidirá por feria): ${skippedCount}`);
}

main().catch(console.error);
