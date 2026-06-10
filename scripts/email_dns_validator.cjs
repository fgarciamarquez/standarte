const dns = require('dns');
// Configurar servidores DNS públicos (Google / Cloudflare) para evitar ECONNREFUSED o fallos del host
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.warn('Advertencia: No se pudieron configurar servidores DNS externos:', e.message);
}
const dnsPromises = dns.promises;

/**
 * Validador DNS de correo electrónico asíncrono para Node.js.
 * Verifica sintaxis básica, errores de tipografía comunes, dominios desechables
 * y comprueba registros DNS MX/A/AAAA reales en el dominio.
 *
 * @param {string} email - Correo electrónico a validar
 * @returns {Promise<{valid: boolean, reason?: string}>} Resultado de la validación
 */
async function validateEmailDns(email) {
    if (!email) {
        return { valid: false, reason: 'El correo electrónico está vacío' };
    }
    email = email.trim();
    if (!email.includes('@')) {
        return { valid: false, reason: 'Falta el carácter @' };
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
        return { valid: false, reason: 'Formato de correo electrónico inválido' };
    }

    const localPart = parts[0].trim();
    const domain = parts[1].toLowerCase().trim();

    if (!localPart || !domain) {
        return { valid: false, reason: 'Formato de correo electrónico inválido' };
    }

    // 1. Errores tipográficos comunes
    const typoDomains = [
        'gamil.com', 'gamil.es', 'gamail.com', 'gmaill.com', 'gmal.com', 'gmile.com', 'gamil.co', 'gmaile.com',
        'hotamil.com', 'hotamil.es', 'hotmial.com', 'hotmial.es', 'hotmaill.com', 'yaho.com', 'yahooo.com',
        'outlok.com', 'outlok.es', 'outloo.com', 'msn.co', 'yaho.es', 'gamil.net', 'gamil.org', 'outlook.con',
        'gmail.con', 'yahoo.con', 'hotmail.con'
    ];
    if (typoDomains.includes(domain)) {
        return { valid: false, reason: 'Error de escritura común en el dominio' };
    }

    // 2. Proveedores de correo temporal o desechable
    const disposableDomains = [
        '10minutemail.com', '10minutemail.co.za', 'tempmail.com', 'temp-mail.org', 'temp-mail.ru', 'tempmail.de',
        'guerrillamail.com', 'guerrillamailblock.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz',
        'yopmail.com', 'yopmail.fr', 'yopmail.net', 'dispostable.com', 'mailinator.com', 'trashmail.com',
        'trashmail.net', 'sharklasers.com', 'getairmail.com', 'maildrop.cc', 'mintemail.com', '30minutemail.com',
        'mytrashmail.com', 'throwawaymail.com', 'tempmailaddress.com', 'disposablemail.com', 'fakeinbox.com',
        'generator.email', 'mailnesia.com', 'mailcatch.com', 'inboxkitten.com', 'duck.com', 'safetymail.info',
        'tempmail.net', 'tempmail.dev', 'getnada.com', 'boun.cr', 'tempmail.live', 'disposable.com'
    ];
    if (disposableDomains.includes(domain)) {
        return { valid: false, reason: 'El dominio es de un proveedor de correos temporales/desechables' };
    }

    // 3. Verificación de registros DNS en tiempo real (MX / A / AAAA / nullMX)
    try {
        const mxRecords = await dnsPromises.resolveMx(domain);
        if (mxRecords && mxRecords.length > 0) {
            for (const rec of mxRecords) {
                if (rec.exchange === '.' || rec.exchange === '') {
                    return { valid: false, reason: 'El dominio no acepta correos (registro nullMX de no recepción declarado)' };
                }
            }
            return { valid: true };
        }
    } catch (err) {
        // Ignorar error y probar con registros A/AAAA como fallback
    }

    try {
        const aRecords = await dnsPromises.resolve4(domain);
        if (aRecords && aRecords.length > 0) {
            return { valid: true };
        }
    } catch (err) {}

    try {
        const aaaaRecords = await dnsPromises.resolve6(domain);
        if (aaaaRecords && aaaaRecords.length > 0) {
            return { valid: true };
        }
    } catch (err) {}

    return { valid: false, reason: 'El dominio de correo no existe o no tiene registros DNS de correo (MX/A/AAAA) activos' };
}

module.exports = { validateEmailDns };
