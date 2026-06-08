const fs = require('fs');

const phrases = {
  es: { hero: ' Más de 20 años de experiencia y taller propio.', team: ' con más de 20 años de experiencia y taller propio', seo: 'con más de 20 años de experiencia y taller propio, ' },
  en: { hero: ' More than 20 years of experience and our own workshop.', team: ' with more than 20 years of experience and our own workshop', seo: 'with more than 20 years of experience and our own workshop, ' },
  de: { hero: ' Über 20 Jahre Erfahrung und eigene Werkstatt.', team: ' mit mehr als 20 Jahren Erfahrung und eigener Werkstatt', seo: 'mit mehr als 20 Jahren Erfahrung und eigener Werkstatt, ' },
  zh: { hero: ' 拥有超过20年的经验和自己的工厂。', team: ' 拥有超过20年的经验和自己的工厂', seo: '拥有超过20年的经验和自己的工厂，' },
  hi: { hero: ' 20 से अधिक वर्षों का अनुभव और अपनी खुद की कार्यशाला।', team: ' 20 से अधिक वर्षों के अनुभव और अपनी खुद की कार्यशाला के साथ', seo: '20 से अधिक वर्षों के अनुभव और अपनी खुद की कार्यशाला के साथ, ' },
  pt: { hero: ' Mais de 20 anos de experiência e oficina própria.', team: ' com mais de 20 anos de experiência e oficina própria', seo: 'com mais de 20 anos de experiência e oficina própria, ' },
  fr: { hero: " Plus de 20 ans d'expérience et notre propre atelier.", team: " avec plus de 20 ans d'expérience et notre propre atelier", seo: "avec plus de 20 ans d'expérience et notre propre atelier, " },
  it: { hero: ' Oltre 20 anni di esperienza e officina propria.', team: ' con oltre 20 anni di esperienza e officina propria', seo: 'con oltre 20 anni di esperienza e officina propria, ' },
  ko: { hero: ' 20년 이상의 경험과 자체 작업장.', team: ' 20년 이상의 경험과 자체 작업장을 갖춘', seo: '20년 이상의 경험과 자체 작업장을 갖추고, ' }
};

function injectSEO() {
  console.log("Processing siteData.js...");
  let siteRaw = fs.readFileSync('src/lib/siteData.js', 'utf8');
  let lines = siteRaw.split('\\n');
  let currentLang = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect language block
    const langMatch = line.match(/^\\s*(es|en|de|zh|hi|pt|fr|it|ko):\\s*\\{/);
    if (langMatch) {
      currentLang = langMatch[1];
    }
    
    if (currentLang && phrases[currentLang]) {
      const p = phrases[currentLang];
      
      // Inject hero
      if (line.includes('heroSubtitle:')) {
         if (!line.includes('20') && !line.includes('taller') && !line.includes('workshop')) {
           // Find the closing quote and insert
           lines[i] = line.replace(/(heroSubtitle:\\s*['"])(.*?)(['"],)/, (match, p1, p2, p3) => {
             // Escape single quotes if string uses single quotes
             const injectText = p3.startsWith("'") ? p.hero.replace(/'/g, "\\\\'") : p.hero;
             return p1 + p2 + injectText + p3;
           });
         }
      }
      
      // Inject team
      if (line.includes('teamSubtitle:')) {
         if (!line.includes('20') && !line.includes('taller') && !line.includes('workshop')) {
           lines[i] = line.replace(/(teamSubtitle:\\s*['"])(.*?)(['"],)/, (match, p1, p2, p3) => {
             const injectText = p3.startsWith("'") ? p.team.replace(/'/g, "\\\\'") : p.team;
             const firstComma = p2.indexOf(',');
             if (firstComma !== -1) {
                return p1 + p2.slice(0, firstComma) + injectText + p2.slice(firstComma) + p3;
             } else {
                return p1 + p2 + injectText + p3;
             }
           });
         }
      }
    }
  }
  fs.writeFileSync('src/lib/siteData.js', lines.join('\\n'), 'utf8');
  console.log("siteData.js updated.");

  console.log("Processing richSeoData.js...");
  let seoRaw = fs.readFileSync('src/lib/richSeoData.js', 'utf8');
  
  const startIdx = seoRaw.indexOf('{');
  const endIdx = seoRaw.lastIndexOf('};') + 1;
  const objStr = seoRaw.substring(startIdx, endIdx);
  
  let seoData;
  try {
    seoData = eval('(' + objStr + ')');
  } catch(e) {
    console.error("Failed to eval richSeoData.js", e);
    return;
  }
  
  for (const key in seoData) {
    const item = seoData[key];
    for (const lang in item) {
       if (item[lang] && item[lang].introText && phrases[lang]) {
          let text = item[lang].introText;
          if (!text.includes('20') && !text.toLowerCase().includes('taller') && !text.toLowerCase().includes('workshop')) {
            const standarteIdx = text.indexOf('Standarte');
            if (standarteIdx !== -1) {
              text = text.slice(0, standarteIdx + 9) + ', ' + phrases[lang].seo + text.slice(standarteIdx + 9);
            } else {
              text = phrases[lang].seo + text;
            }
            item[lang].introText = text.replace(/\\s+/g, ' '); 
          }
       }
    }
  }
  
  const topPart = seoRaw.substring(0, startIdx);
  const newContent = topPart + JSON.stringify(seoData, null, 2) + ';\n';
  fs.writeFileSync('src/lib/richSeoData.js', newContent, 'utf8');
  console.log('richSeoData.js updated.');
}

injectSEO();
