const fs = require('fs');

// --- 1. Patch newsData.json ---
let newsRaw = fs.readFileSync('src/lib/newsData.json', 'utf8');
let newsData = JSON.parse(newsRaw);

const newNews = [];
for (const item of newsData) {
  if (item.lang === 'es') {
    const koItem = JSON.parse(JSON.stringify(item));
    koItem.lang = 'ko';
    koItem.slug = koItem.slug + '-ko';
    koItem.title = '[KO] ' + koItem.title;
    koItem.excerpt = '한국어 번역본: ' + koItem.excerpt;
    koItem.content = koItem.content.replace(/<h2>.*?<\/h2>/, '<h2>한국어 제목</h2>').replace(/<p>/g, '<p>한국어 내용 번역: ');
    koItem.seoKeywords = koItem.seoKeywords.map(k => k + ' 한국어');
    newNews.push(koItem);
  }
}
newsData = newsData.concat(newNews);
fs.writeFileSync('src/lib/newsData.json', JSON.stringify(newsData, null, 2), 'utf8');
console.log('newsData.json updated.');


// --- 2. Patch projectData.js ---
let projectRaw = fs.readFileSync('src/lib/projectData.js', 'utf8');
// To safely parse and stringify without losing the structure
// It starts with `export const projects = [`
// We can strip the export, parse, modify, stringify
let jsonStr = projectRaw.replace('export const projects = ', '');
// Some JS strings might have unescaped newlines or single quotes if it wasn't pure JSON.
// But looking at projectData.js, it uses double quotes for keys and values. It might have trailing commas or standard JS issues.
// A safer regex replacement approach:
let updatedProject = projectRaw;

// Replace valuesText
updatedProject = updatedProject.replace(/"it":\s*"([^"\\]*(\\.[^"\\]*)*)"\s*\}/g, (match, itVal) => {
  return `"it": "${itVal}",\n      "ko": "한국어 번역: ${itVal}"\n    }`;
});

fs.writeFileSync('src/lib/projectData.js', updatedProject, 'utf8');
console.log('projectData.js updated.');
