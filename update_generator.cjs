const fs = require('fs');

let content = fs.readFileSync('./scripts/autonomous_generator.cjs', 'utf8');

// Replace "6 idiomas (es, en, de, pt, zh, hi)" with "8 idiomas (es, en, de, pt, zh, hi, fr, it)"
content = content.replace(/6 idiomas/g, '8 idiomas');
content = content.replace(/\(es, en, de, pt, zh, hi\)/g, '(es, en, de, pt, zh, hi, fr, it)');
content = content.replace(/"es", "en", "de", "pt", "zh", "hi"/g, '"es", "en", "de", "pt", "zh", "hi", "fr", "it"');
content = content.replace(/\['es', 'en', 'de', 'pt', 'zh', 'hi'\]/g, "['es', 'en', 'de', 'pt', 'zh', 'hi', 'fr', 'it']");

// Update the translations for the 5 keywords prompt
content = content.replace(/- Hindi \(hi\): "ध्यान वास्तुकला", "स्थायित्व के स्थान", "मानव प्रवाह डिजाइन", "दृश्य एकाग्रता संरचनाएं", "अनुभवात्मक सूक्ष्म वास्तुकला"\./g, `- Hindi (hi): "ध्यान वास्तुकला", "स्थायित्व के स्थान", "मानव प्रवाह डिजाइन", "दृश्य एकाग्रता संरचनाएं", "अनुभवात्मक सूक्ष्म वास्तुकला".
   - Francés (fr): "Architecture de l'attention", "Espaces de permanence", "Conception des flux humains", "Structures de concentration visuelle", "Microarchitecture expérientielle".
   - Italiano (it): "Architettura dell'attenzione", "Spazi di permanenza", "Progettazione del flusso umano", "Strutture di concentrazione visiva", "Microarchitettura esperienziale".`);

// Update JSON schema for Gemini
const schemaAddition = `
            fr: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            it: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },`;

content = content.replace(/hi: \{\s*type: "OBJECT",\s*properties: \{\s*title: \{ type: "STRING" \},\s*excerpt: \{ type: "STRING" \},\s*content: \{ type: "STRING" \},\s*seoKeywords: \{ type: "ARRAY", items: \{ type: "STRING" \} \}\s*\},\s*required: \["title", "excerpt", "content", "seoKeywords"\]\s*\}/g, match => match + schemaAddition);

fs.writeFileSync('./scripts/autonomous_generator.cjs', content, 'utf8');
console.log('updated autonomous_generator.cjs');
