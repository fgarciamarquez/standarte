const fs = require('fs');

const siteRaw = fs.readFileSync('src/lib/components/Site.svelte', 'utf8');

const startIdx = siteRaw.indexOf('const fairItems = [');
const endIdx = siteRaw.indexOf('];', startIdx) + 2;
const fairItemsRaw = siteRaw.substring(startIdx, endIdx);

let fairItems;
eval(fairItemsRaw.replace('const fairItems =', 'fairItems ='));

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') // remove diacritics
    .replace(/[\\s\\W-]+/g, '-') // replace spaces, non-word chars with dash
    .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
}

function getSector(name) {
  const n = name.toLowerCase();
  if (n.includes('agro') || n.includes('fio') || n.includes('fercam') || n.includes('conxemar') || n.includes('fima') || n.includes('alimentaria')) return 'Agroalimentario y Naturaleza';
  if (n.includes('belleza') || n.includes('cosmética') || n.includes('jalupro')) return 'Belleza y Estética';
  if (n.includes('vino') || n.includes('vinac') || n.includes('fenavin') || n.includes('ferduque')) return 'Enología y Vinos';
  if (n.includes('tecnología') || n.includes('web summit') || n.includes('smart') || n.includes('des') || n.includes('greencities') || n.includes('automatica') || n.includes('tis')) return 'Tecnología e Innovación';
  if (n.includes('industria') || n.includes('logimat') || n.includes('hannover') || n.includes('sps') || n.includes('bauma') || n.includes('amb') || n.includes('jec') || n.includes('smopyc')) return 'Industria y Logística';
  if (n.includes('salud') || n.includes('esicm') || n.includes('esra') || n.includes('pegs') || n.includes('farma')) return 'Salud y Medicina';
  if (n.includes('turismo') || n.includes('fitur') || n.includes('btl')) return 'Turismo y Hostelería';
  if (n.includes('arte') || n.includes('arco') || n.includes('comic') || n.includes('artexanía') || n.includes('ocio')) return 'Arte y Ocio';
  if (n.includes('construcción') || n.includes('veteco') || n.includes('piscimad') || n.includes('simed')) return 'Construcción e Infraestructuras';
  if (n.includes('comercio') || n.includes('empack') || n.includes('food') || n.includes('snackex')) return 'Comercio y Packaging';
  if (n.includes('aviación') || n.includes('gse') || n.includes('aviation')) return 'Aeronáutica y Transporte';
  return 'Multisectorial y Profesional';
}

function getCity(name) {
  if (name.includes('Lisboa') || name.includes('Lisbon')) return 'Lisboa';
  if (name.includes('Madrid')) return 'Madrid';
  if (name.includes('Barcelona')) return 'Barcelona';
  if (name.includes('Bilbao')) return 'Bilbao';
  if (name.includes('Málaga') || name.includes('Malaga')) return 'Málaga';
  if (name.includes('Badajoz')) return 'Badajoz';
  if (name.includes('Ciudad Real')) return 'Ciudad Real';
  if (name.includes('Sevilla')) return 'Sevilla';
  if (name.includes('Paris')) return 'París';
  if (name.includes('Stuttgart')) return 'Stuttgart';
  if (name.includes('Munich')) return 'Múnich';
  if (name.includes('Nuremberg')) return 'Núremberg';
  if (name.includes('Lyon')) return 'Lyon';
  if (name.includes('Vigo')) return 'Vigo';
  if (name.includes('Don Benito')) return 'Don Benito';
  if (name.includes('Almendralejo')) return 'Almendralejo';
  if (name.includes('Plasencia')) return 'Plasencia';
  if (name.includes('Zaragoza')) return 'Zaragoza';
  return 'Europa';
}

const fairsData = fairItems.map(f => {
  return {
    ...f,
    slug: slugify(f.name),
    city: getCity(f.name),
    sector: getSector(f.name)
  };
});

const content = 'export const fairsData = ' + JSON.stringify(fairsData, null, 2) + ';\n';
fs.writeFileSync('src/lib/fairsData.js', content, 'utf8');
console.log('src/lib/fairsData.js created with ' + fairsData.length + ' fairs.');
