const fs = require('fs');
const path = require('path');
const axios = require('axios');
const urlParser = require('url');

// --- CONFIGURACIÓN ---
const CONFIG = {
    timeout: 10000,
    ignoredExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.woff2', '.pdf', '.zip', '.sentry.io', '.avif', '.webp'],
    ignoredPrefixes: ['xxx', 'example', 'yourname', 'email', 'correo', 'test', 'name', 'nombre', 'usuario', 'user'],
    emailRegex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    delayBetweenRequests: 1500,
    apolloApiKey: 'Y15sD1v2vL4qG9wV6Y-vWQ' // Use the fallback key you previously found
};

// --- HELPERS ---
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

function scoreEmail(email) {
    if (!email) return -1;
    const cleanEmail = email.toLowerCase().trim();
    let score = 0;
    if (/^(sales|ventas|comercial|info|contacto|contact|marketing|export|hola|hello)@/.test(cleanEmail)) {
        score += 100;
    }
    if (/^(admin|support|soporte|office|oficina)@/.test(cleanEmail)) {
        score += 50;
    }
    if (/@(gmail|yahoo|hotmail|outlook)\.com/.test(cleanEmail)) {
        score -= 20;
    }
    if (/^(rrhh|hr|careers|empleo|jobs|prensa|press|noreply|no-reply|retour|devoluciones|returns|reclamaciones|facturacion|invoices|accounting|billing)@/.test(cleanEmail)) {
        score -= 500;
    }
    return score;
}

function prioritizeEmails(emailsArray) {
    if (!emailsArray || emailsArray.length === 0) return [];
    const uniqueEmails = Array.from(new Set(emailsArray));
    return uniqueEmails.sort((a, b) => scoreEmail(b) - scoreEmail(a));
}

function extractEmailsFromHtml(html, emailSet) {
    if (typeof html !== 'string') return;
    const matches = html.match(CONFIG.emailRegex);
    if (matches) {
        matches.forEach(email => {
            const cleanEmail = email.toLowerCase().trim();
            const isInvalidExt = CONFIG.ignoredExtensions.some(ext => cleanEmail.endsWith(ext));
            const prefix = cleanEmail.split('@')[0];
            const isDummy = CONFIG.ignoredPrefixes.includes(prefix);
            
            if (!isInvalidExt && !isDummy) {
                emailSet.add(cleanEmail);
            }
        });
    }
}

async function searchDomainForCompany(companyName) {
    try {
        const query = encodeURIComponent(companyName + ' official site');
        const res = await axios.get(`https://search.yahoo.com/search?p=${query}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
            timeout: 5000
        });
        
        // Yahoo redirects look like: RU=https%3a%2f%2fwww.example.com/RK=...
        const regex = /RU=(https?%3A%2F%2F[^/]+)\/RK=/g;
        let match;
        while ((match = regex.exec(res.data)) !== null) {
            let url = decodeURIComponent(match[1]);
            // Ignore common non-company domains
            if (url.includes('yahoo.com') || url.includes('facebook.com') || url.includes('linkedin.com') || url.includes('instagram.com') || url.includes('twitter.com')) {
                continue;
            }
            return url;
        }
    } catch(e) {
        // Ignore
    }
    return null;
}

async function crawlCompanyWebsite(homepageUrl) {
    const emails = new Set();
    try {
        const response = await axios.get(homepageUrl, {
            timeout: CONFIG.timeout,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        extractEmailsFromHtml(response.data, emails);
        
        const html = response.data.toLowerCase();
        const linkRegex = /href=['"]([^'"]+)['"]/g;
        let match;
        const contactLinks = [];
        while ((match = linkRegex.exec(html)) !== null) {
            const href = match[1];
            if (/contact|contacto|about|nosotros/i.test(href)) {
                contactLinks.push(href);
            }
        }
        
        if (contactLinks.length > 0) {
            let contactUrl = contactLinks[0];
            if (!contactUrl.startsWith('http')) {
                const parsedHome = urlParser.parse(homepageUrl);
                contactUrl = parsedHome.protocol + '//' + parsedHome.host + (contactUrl.startsWith('/') ? '' : '/') + contactUrl;
            }
            try {
                const resContact = await axios.get(contactUrl, { timeout: CONFIG.timeout });
                extractEmailsFromHtml(resContact.data, emails);
            } catch(e) { }
        }
        return { success: true, emails: Array.from(emails) };
    } catch(err) {
        return { success: false, error: err.message, emails: [] };
    }
}

async function main() {
    const args = process.argv.slice(2);
    let listFile = 'scratch/habitat_valencia.txt';
    let groupName = 'Feria Habitat Valencia';
    
    // Parsear args rudimentario
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--file' && args[i+1]) listFile = args[++i];
        if (args[i] === '--group' && args[i+1]) groupName = args[++i];
    }

    if (!fs.existsSync(listFile)) {
        console.error(`❌ Archivo no encontrado: ${listFile}`);
        process.exit(1);
    }

    const lines = fs.readFileSync(listFile, 'utf-8').split('\n').map(l => l.trim()).filter(l => l);
    console.log(`=============================================================`);
    console.log(`🤖 RAW LIST HARVESTER`);
    console.log(`📝 Archivo: ${listFile} (${lines.length} empresas)`);
    console.log(`🏷️  Grupo: ${groupName}`);
    console.log(`=============================================================\n`);

    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) {
        console.error('❌ No se encontró configuración de Supabase.');
        process.exit(1);
    }
    
    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };

    let successCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const companyName = lines[i];
        console.log(`\n[${i+1}/${lines.length}] Procesando: ${companyName}`);
        
        // 1. Buscar dominio
        const website = await searchDomainForCompany(companyName);
        if (!website) {
            console.log(`  ⚠ No se pudo resolver el dominio web en el buscador. Saltando.`);
            await new Promise(r => setTimeout(r, CONFIG.delayBetweenRequests));
            continue;
        }
        console.log(`  🌐 Dominio encontrado: ${website}`);
        
        // 2. Crawlear la web
        const crawlResult = await crawlCompanyWebsite(website);
        if (!crawlResult.success) {
            console.log(`  ❌ Error accediendo a la web (${crawlResult.error}). Descartado (Anti-spam).`);
        } else if (crawlResult.emails.length > 0) {
            // 3. Puntuación y selección
            const bestEmails = prioritizeEmails(crawlResult.emails);
            const winner = bestEmails[0];
            const score = scoreEmail(winner);
            
            console.log(`  🎉 ¡Encontrado! Emails extraídos: ${crawlResult.emails.length}`);
            console.log(`  🏆 Ganador: ${winner} (Puntos: ${score})`);
            
            if (score > -100) { // No subir basura severa
                try {
                    await axios.post(`${supaConfig.url}/rest/v1/contacts`, {
                        email: winner,
                        empresa: companyName,
                        feria: groupName,
                        lead_group: groupName,
                        website: website,
                        lead_source: 'Raw List Harvester',
                        status: 'active',
                        updated_at: new Date().toISOString()
                    }, { headers });
                    console.log(`  💾 Guardado en Supabase.`);
                    successCount++;
                } catch(e) {
                    console.log(`  ⚠ Error guardando en DB: ${e.response ? e.response.data.message : e.message}`);
                }
            } else {
                console.log(`  🚫 El correo ganador tiene puntuación muy negativa (${score}). Descartado.`);
            }
        } else {
            console.log(`  ➖ No se encontraron correos en la web.`);
        }
        
        await new Promise(r => setTimeout(r, CONFIG.delayBetweenRequests));
    }
    
    console.log(`\n✅ Proceso Finalizado. Contactos añadidos: ${successCount}/${lines.length}`);
}

main();
