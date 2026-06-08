const fs = require('fs');

const wrapper = `
        import * as siteData from './src/lib/siteData.js';
        import { projects } from './src/lib/projectData.js';
        import newsData from './src/lib/newsData.json' with { type: "json" };

        const langs = siteData.languages;
        let errors = [];

        function checkObject(obj, pathName = '') {
            if (obj === null || typeof obj !== 'object') return;
            
            if ('es' in obj && 'en' in obj) {
                for (const lang of langs) {
                    if (!(lang in obj) || obj[lang] === '' || obj[lang] === null || obj[lang] === undefined) {
                        errors.push(\`Missing translation for [\${lang}] at \${pathName} - ES value: "\${String(obj['es']).substring(0, 50)}"\`);
                    }
                }
            } else {
                for (const key in obj) {
                    checkObject(obj[key], pathName ? \`\${pathName}.\${key}\` : key);
                }
            }
        }

        checkObject(siteData, 'siteData');
        
        projects.forEach((p, idx) => {
            checkObject(p, \`projectData[\${p.id || idx}]\`);
        });

        newsData.forEach((n, idx) => {
            checkObject(n, \`newsData[\${n.id || idx}]\`);
        });

        if (errors.length > 0) {
            console.log("ERRORS FOUND: " + errors.length);
            console.log(errors.join('\\n'));
        } else {
            console.log("SUCCESS: All translations are present.");
        }
    `;
fs.writeFileSync('./validate_translations.mjs', wrapper);
console.log('Validator created');
