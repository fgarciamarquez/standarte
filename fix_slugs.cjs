const fs = require('fs');

let fileContent = fs.readFileSync('src/lib/fairsData.js', 'utf8');

// We have the file as a module string, let's parse the JSON part or just eval it.
const jsonStr = fileContent.replace('export const fairsData = ', '').replace(/;$/, '');
const fairs = eval(jsonStr);

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+202[0-9]/g, '') // Remove year
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

for (let fair of fairs) {
  fair.slug = slugify(fair.name);
}

const newContent = 'export const fairsData = ' + JSON.stringify(fairs, null, 2) + ';\n';
fs.writeFileSync('src/lib/fairsData.js', newContent, 'utf8');
console.log('Fixed slugs in fairsData.js');
