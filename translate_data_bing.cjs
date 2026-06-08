const fs = require('fs');
const { translate } = require('bing-translate-api');

const delay = ms => new Promise(res => setTimeout(res, ms));

async function safeTranslate(text, to) {
  if (!text) return text;
  let attempts = 0;
  while (attempts < 5) {
    try {
      const res = await translate(text, null, to);
      return res.translation;
    } catch (e) {
      attempts++;
      console.log(`Bing rate limited or failed, waiting ${attempts * 2} seconds... Error: ${e.message}`);
      await delay(attempts * 2000);
    }
  }
  throw new Error('Failed to translate after 5 attempts');
}

async function processProjects() {
  console.log('Processing projectData.js...');
  let projectRaw = fs.readFileSync('src/lib/projectData.js', 'utf8');
  
  const startIdx = projectRaw.indexOf('[');
  const endIdx = projectRaw.lastIndexOf('];') + 1;
  const arrStr = projectRaw.substring(startIdx, endIdx);
  
  let projects;
  try {
    projects = eval(arrStr);
  } catch(e) {
    console.error("Failed to eval projectData.js", e);
    return;
  }
  
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    if (proj.title && proj.title.ko && !proj.title.ko.includes('한국어 번역') && !proj.title.ko.includes('Failed to translate')) {
      continue;
    }
    
    try {
      console.log(`Translating project ${i + 1}/${projects.length}: ${proj.name}`);
      if (proj.valuesText && proj.valuesText.en) {
        proj.valuesText.ko = await safeTranslate(proj.valuesText.en, 'ko');
      }
      if (proj.notes && proj.notes.en) {
        proj.notes.ko = await safeTranslate(proj.notes.en, 'ko');
      }
      if (proj.title && proj.title.en) {
        proj.title.ko = await safeTranslate(proj.title.en, 'ko');
      }
      if (proj.slugs && proj.slugs.en) {
         proj.slugs.ko = proj.slugs.en.split('_').slice(0, 5).join('_') + '_ko';
      }
      
      // Save progress occasionally
      if (i % 10 === 0) {
        const topPart = projectRaw.substring(0, startIdx);
        const bottomPart = projectRaw.substring(endIdx);
        const newContent = topPart + JSON.stringify(projects, null, 2) + bottomPart;
        fs.writeFileSync('src/lib/projectData.js', newContent, 'utf8');
      }
    } catch (err) {
       console.error(`Error translating project ${proj.name}: ${err.message}`);
    }
  }
  
  const topPart = projectRaw.substring(0, startIdx);
  const bottomPart = projectRaw.substring(endIdx);
  const newContent = topPart + JSON.stringify(projects, null, 2) + bottomPart;
  fs.writeFileSync('src/lib/projectData.js', newContent, 'utf8');
  console.log('projectData.js translated successfully with Bing.');
}

async function processSEO() {
  console.log('Processing richSeoData.js...');
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
    if (item.en && (!item.ko || Object.keys(item.ko).length === 0)) {
      try {
        console.log(`Translating SEO: ${key}`);
        item.ko = {};
        item.ko.breadcrumb = await safeTranslate(item.en.breadcrumb, 'ko');
        item.ko.title = await safeTranslate(item.en.title, 'ko');
        item.ko.h1 = await safeTranslate(item.en.h1, 'ko');
        item.ko.introText = await safeTranslate(item.en.introText, 'ko');
        item.ko.body = await safeTranslate(item.en.body, 'ko');
        
        if (item.en.faqs) {
          item.ko.faqs = [];
          for (const faq of item.en.faqs) {
             item.ko.faqs.push({
               q: await safeTranslate(faq.q, 'ko'),
               a: await safeTranslate(faq.a, 'ko')
             });
          }
        }
      } catch (err) {
        console.error(`Error translating SEO ${key}: ${err.message}`);
      }
    }
  }
  
  const topPart = seoRaw.substring(0, startIdx);
  const newContent = topPart + JSON.stringify(seoData, null, 2) + ';\n';
  fs.writeFileSync('src/lib/richSeoData.js', newContent, 'utf8');
  console.log('richSeoData.js translated successfully with Bing.');
}

async function run() {
  await processProjects();
  await processSEO();
}

run();
