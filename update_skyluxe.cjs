const fs = require('fs');

let content = fs.readFileSync('./src/lib/projectData.js', 'utf8');

// The project ID we are looking for is "stand_para_agencia_viajes_madrid".
// The user wants to change "Madrid" to "Dubai-Amsterdam" and "Agencia de viajes" to "Agencia inmobiliaria".

// Since replacing everything globally might break other things, we will just parse it, wait no, it's a JS file exporting an array.
// But it's valid JSON if we extract it, wait, it's `export const projects = [...]`.
// Let's do string replacements targeting SKYLUXE exactly.

// Replace location
content = content.replace(
  /"name":\s*"SKYLUXE",\s*"location":\s*"Madrid",/,
  '"name": "SKYLUXE",\n    "location": "Dubai-Amsterdam",'
);

// Replace title
const oldTitle = `"title": {
      "es": "Stand para empresa de agencia de viajes en Madrid",
      "en": "Stand for company in Madrid",
      "de": "Messestand für Unternehmen in Madrid",
      "pt": "Stand para empresa em Madrid",
      "zh": "Madrid 公司展台",
      "hi": "Madrid में कंपनी के लिए स्टैंड",
      "ext": "Stand pa empresa de agencia de viajes en Madrid",
      "fr": "Stand pour entreprise de agencia de viajes à Madrid",
      "it": "Stand per azienda di agencia de viajes a Madrid"
    }`;
const newTitle = `"title": {
      "es": "Stand para empresa de agencia inmobiliaria en Dubai-Amsterdam",
      "en": "Stand for real estate agency in Dubai-Amsterdam",
      "de": "Messestand für Immobilienagentur in Dubai-Amsterdam",
      "pt": "Stand para agência imobiliária em Dubai-Amsterdam",
      "zh": "迪拜-阿姆斯特丹房地产中介公司展台",
      "hi": "दुबई-एम्स्टर्डम में रियल एस्टेट एजेंसी के लिए स्टैंड",
      "ext": "Stand pa empresa de agencia inmobiliaria en Dubai-Amsterdam",
      "fr": "Stand pour agence immobilière à Dubai-Amsterdam",
      "it": "Stand per agenzia immobiliare a Dubai-Amsterdam"
    }`;
content = content.replace(oldTitle, newTitle);

// Replace "Agencia de viajes." with "Agencia inmobiliaria." in SKYLUXE's notes and valuesText
// To be safe, we will just replace "Agencia de viajes." with "Agencia inmobiliaria." globally ONLY within the SKYLUXE object text block.
// Let's split by SKYLUXE
let parts = content.split('"name": "SKYLUXE",');
if (parts.length === 2) {
  let projectBlockEnd = parts[1].indexOf('"id": "stand_para_ortodoncia_invisible_bilbao"');
  let beforeNextProject = parts[1].substring(0, projectBlockEnd);
  let rest = parts[1].substring(projectBlockEnd);
  
  // Replace Agencia de viajes -> Agencia inmobiliaria
  beforeNextProject = beforeNextProject.replace(/Agencia de viajes\./g, 'Agencia inmobiliaria.');
  beforeNextProject = beforeNextProject.replace(/agencia de viajes/g, 'agencia inmobiliaria');
  beforeNextProject = beforeNextProject.replace(/en Madrid/g, 'en Dubai-Amsterdam');
  beforeNextProject = beforeNextProject.replace(/in Madrid/g, 'in Dubai-Amsterdam');
  beforeNextProject = beforeNextProject.replace(/IFEMA Madrid/g, 'Dubai-Amsterdam'); // "pasillos comerciales de IFEMA Madrid" -> "pasillos comerciales de Dubai-Amsterdam"
  
  content = parts[0] + '"name": "SKYLUXE",' + beforeNextProject + rest;
}

fs.writeFileSync('./src/lib/projectData.js', content, 'utf8');
console.log('SKYLUXE updated successfully.');
