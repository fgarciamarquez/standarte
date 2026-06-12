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
    delayBetweenRequests: 1000
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
    
    // 1. Eliminar bloques de código donde no hay emails reales visibles para el usuario
    let cleanHtml = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, ''); // eliminar comentarios HTML
        
    const matches = cleanHtml.match(CONFIG.emailRegex);
    if (matches) {
        matches.forEach(email => {
            const cleanEmail = email.toLowerCase().trim();
            
            // 2. Validación de sintaxis extra-rigurosa para evitar "inventos" de librerías/CDNs
            // Un email real no debe contener caracteres como /, \, :, ?, *, =, |, <, >, ", ', etc.
            if (/[\/\\:\?\*=\|<>'"\s]/.test(cleanEmail)) {
                return;
            }
            
            const parts = cleanEmail.split('@');
            if (parts.length !== 2) return;
            
            const prefix = parts[0];
            const domain = parts[1];
            
            // Omitir prefijos ficticios
            if (CONFIG.ignoredPrefixes.includes(prefix)) return;
            
            // Validar que el dominio tenga estructura correcta: al menos un punto, y el TLD sea de 2 a 6 letras
            const domainParts = domain.split('.');
            if (domainParts.length < 2) return;
            const tld = domainParts[domainParts.length - 1];
            if (!/^[a-z]{2,6}$/.test(tld)) return;
            
            // Omitir TLDs que corresponden a extensiones de archivos de código o recursos web
            const invalidTlds = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'pdf', 'zip', 'html', 'php', 'xml', 'json', 'scss', 'ts', 'map', 'md', 'ico', 'mp4', 'webm'];
            if (invalidTlds.includes(tld)) return;
            
            // Omitir si el dominio parece una versión o patrón de biblioteca (ej. "3.x.x", "v1.2", etc.)
            if (domainParts.some(part => /^[0-9x\-]+$/.test(part) || /^v[0-9]+/.test(part))) {
                return;
            }
            
            // Omitir extensiones inválidas generales
            const isInvalidExt = CONFIG.ignoredExtensions.some(ext => cleanEmail.endsWith(ext));
            if (!isInvalidExt) {
                emailSet.add(cleanEmail);
            }
        });
    }
}

async function crawlCompanyWebsite(homepageUrl) {
    const emails = new Set();
    try {
        const response = await axios.get(homepageUrl, {
            timeout: CONFIG.timeout,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        extractEmailsFromHtml(response.data, emails);
        
        // Buscamos enlaces a /contacto, /contact, etc.
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
    } catch(err) {
        // Ignorar errores
    }
    return Array.from(emails);
}

// --- MAIN SCRIPT ---
async function main() {
    console.log('🛡️ Iniciando Auditoría y Revalidación de Base de Datos...');
    const supaConfig = loadSupabaseConfig();
    if (!supaConfig) {
        console.error('❌ No se encontró configuración de Supabase.');
        process.exit(1);
    }
    
    const headers = {
        'apikey': supaConfig.key,
        'Authorization': 'Bearer ' + supaConfig.key,
        'Content-Type': 'application/json'
    };
    
    async function revalidateTable(tableName) {
        console.log(`\n📦 Descargando contactos de [${tableName}]...`);
        let allContacts = [];
        let offset = 0;
        const limit = 1000;
        
        while (true) {
            const res = await axios.get(`${supaConfig.url}/rest/v1/${tableName}?select=*&limit=${limit}&offset=${offset}`, { headers });
            if (res.data.length === 0) break;
            allContacts = allContacts.concat(res.data);
            offset += limit;
        }
        console.log(`  📊 Total contactos: ${allContacts.length}`);
        
        // Filtrar sospechosos (score < 100)
        const suspicious = allContacts.filter(c => scoreEmail(c.email) < 100);
        console.log(`  🕵️ Contactos marcados para revisión (no puramente comerciales): ${suspicious.length}`);
        
        let fixedCount = 0;
        
        for (let i = 0; i < suspicious.length; i++) {
            const contact = suspicious[i];
            const currentScore = scoreEmail(contact.email);
            
            console.log(`[${i+1}/${suspicious.length}] Auditando: ${contact.empresa || contact.email} | Correo actual: ${contact.email} (Puntos: ${currentScore})`);
            
            if (!contact.website || contact.website.length < 5) {
                console.log(`  ⏩ Sin web corporativa válida. Saltando.`);
                continue;
            }
            
            const scraped = await crawlCompanyWebsite(contact.website);
            const allFound = [...scraped, contact.email];
            const prioritized = prioritizeEmails(allFound);
            const bestEmail = prioritized[0];
            
            if (bestEmail && bestEmail !== contact.email) {
                const newScore = scoreEmail(bestEmail);
                if (newScore > currentScore) {
                    console.log(`  ✅ ¡Mejora Encontrada! Reemplazando ${contact.email} ➡️  ${bestEmail}`);
                    
                    try {
                        // Actualizar en base de datos
                        await axios.patch(`${supaConfig.url}/rest/v1/${tableName}?email=eq.${encodeURIComponent(contact.email)}`, {
                            email: bestEmail,
                            lead_source: contact.lead_source ? contact.lead_source + ' (Auto-Corregido)' : 'Auditor'
                        }, { headers });
                        fixedCount++;
                        console.log(`  💾 Guardado en DB.`);
                    } catch (e) {
                        // Duplicate key error is common if the bestEmail is already in the DB
                        if (e.response && e.response.status === 409) {
                            console.log(`  ⚠ El correo ${bestEmail} ya existe. Eliminando la entrada basura: ${contact.email}`);
                            try {
                                await axios.delete(`${supaConfig.url}/rest/v1/${tableName}?email=eq.${encodeURIComponent(contact.email)}`, { headers });
                                fixedCount++;
                            } catch(err) {
                                console.log(`  ❌ Error borrando: ${err.message}`);
                            }
                        } else {
                            console.log(`  ❌ Error actualizando Supabase: ${e.message}`);
                        }
                    }
                } else {
                    console.log(`  ➖ No se encontró nada mejor.`);
                }
            } else {
                console.log(`  ➖ El correo actual sigue siendo el mejor disponible.`);
            }
            
            // Cortesía
            await new Promise(r => setTimeout(r, CONFIG.delayBetweenRequests));
        }
        
        console.log(`\n🎉 Limpieza de [${tableName}] finalizada. Errores corregidos: ${fixedCount}`);
    }
    
    await revalidateTable('contacts');
    await revalidateTable('luz_contacts');
    
    console.log('\n🚀 Auditoría Global Completada.');
}

main();
