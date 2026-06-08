import fs from 'fs';
import path from 'path';

// Import data
import { richSeoData } from './src/lib/richSeoData.js';

const langs = ['es', 'en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko'];
const priorityGroups = [
  ['pt', 'en'],
  ['de', 'fr', 'it'],
  ['zh', 'hi', 'ko']
];

const esMarkers = ['Diseñamos', 'carpintería', 'a medida'];

let mdContent = '# Auditoría de Traducciones (richSeoData)\n\n';

// 1. Check for duplicate keys in siteData.js using Regex (since JS object loses duplicates)
const siteDataContent = fs.readFileSync('./src/lib/siteData.js', 'utf-8');
const routesMatch = siteDataContent.match(/export const routes = \{([\s\S]*?)\};\n/);
if (routesMatch) {
  mdContent += '## Verificación de Claves Duplicadas en routes (siteData.js)\n\n';
  const routesStr = routesMatch[1];
  langs.forEach(lang => {
    const langMatch = routesStr.match(new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\}`, 'g'));
    if (langMatch) {
      const lines = langMatch[0].split('\n').map(l => l.trim()).filter(l => l.includes(':'));
      const keys = new Set();
      const duplicates = new Set();
      lines.forEach(line => {
        const key = line.split(':')[0].trim();
        if (keys.has(key)) duplicates.add(key);
        keys.add(key);
      });
      if (duplicates.size > 0) {
        mdContent += `- ⚠️ **${lang}**: Contiene claves duplicadas: ${Array.from(duplicates).join(', ')}\n`;
      } else {
        mdContent += `- ✅ **${lang}**: Sin duplicados.\n`;
      }
    }
  });
  mdContent += '\n';
}

// 2. Audit richSeoData
mdContent += '## Estado de Traducciones por Sección\n\n';

for (const section of Object.keys(richSeoData)) {
  mdContent += `### Sección: \`${section}\`\n\n`;
  const data = richSeoData[section];
  
  // Create table header
  mdContent += '| Idioma | Estado | Notas |\n';
  mdContent += '|--------|--------|-------|\n';
  
  // Process languages in priority order
  const orderedLangs = ['es', ...priorityGroups.flat()];
  
  orderedLangs.forEach(lang => {
    if (lang === 'es') {
      if (data.es) mdContent += `| es | ✅ OK | Idioma principal |\n`;
      else mdContent += `| es | ❌ FALTA | ¡Falta el idioma principal! |\n`;
      return;
    }

    if (!data[lang]) {
      mdContent += `| ${lang} | ❌ FALTA | Nodo inexistente |\n`;
      return;
    }

    let notes = [];
    let state = '✅ OK';

    const esStr = JSON.stringify(data.es || {});
    const langStr = JSON.stringify(data[lang]);

    // Check if identical to ES
    if (esStr === langStr) {
      state = '⚠️ AVISO';
      notes.push('Idéntico a ES (sin traducir)');
    } else {
      // Heuristic for Spanish markers
      const hasEsMarkers = esMarkers.some(m => langStr.includes(m));
      if (hasEsMarkers) {
        state = '⚠️ AVISO';
        notes.push('Contiene marcadores en español (revisar traducción)');
      }
    }

    mdContent += `| ${lang} | ${state} | ${notes.length > 0 ? notes.join(', ') : '-'} |\n`;
  });
  
  mdContent += '\n';
}

fs.writeFileSync('./exports/auditoria-richseo.md', mdContent);
console.log('Auditoría generada en /exports/auditoria-richseo.md');
