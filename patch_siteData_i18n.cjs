const fs = require('fs');

const path = 'src/lib/siteData.js';
let content = fs.readFileSync(path, 'utf8');

const additions = {
  es: `faqsTitle: 'Preguntas Frecuentes', successStoriesTitle: 'Casos de Éxito', featuredProjectsIntro: 'Proyectos destacados de carpintería a medida y diseño de stands:', `,
  en: `faqsTitle: 'Frequently Asked Questions', successStoriesTitle: 'Success Stories', featuredProjectsIntro: 'Featured custom carpentry and exhibition stand design projects:', `,
  de: `faqsTitle: 'Häufig gestellte Fragen', successStoriesTitle: 'Erfolgsgeschichten', featuredProjectsIntro: 'Ausgewählte Projekte für maßgeschneiderte Tischlerei und Messestanddesign:', `,
  zh: `faqsTitle: '常见问题', successStoriesTitle: '成功案例', featuredProjectsIntro: '特色定制木工和展台设计项目：', `,
  hi: `faqsTitle: 'अक्सर पूछे जाने वाले प्रश्न', successStoriesTitle: 'सफलता की कहानियाँ', featuredProjectsIntro: 'विशेष कस्टम बढ़ईगीरी और प्रदर्शनी स्टैंड डिजाइन परियोजनाएं:', `,
  pt: `faqsTitle: 'Perguntas Frequentes', successStoriesTitle: 'Casos de Sucesso', featuredProjectsIntro: 'Projetos destacados de marcenaria à medida e design de stands:', `,
  fr: `faqsTitle: 'Foire Aux Questions', successStoriesTitle: 'Histoires de Réussite', featuredProjectsIntro: 'Projets phares de menuiserie sur mesure et de conception de stands:', `,
  it: `faqsTitle: 'Domande Frequenti', successStoriesTitle: 'Storie di Successo', featuredProjectsIntro: 'Progetti in evidenza di falegnameria su misura e design di stand espositivi:', `,
  ko: `faqsTitle: '자주 묻는 질문', successStoriesTitle: '성공 사례', featuredProjectsIntro: '주요 맞춤형 목공 및 전시 부스 디자인 프로젝트:', `
};

for (const lang of Object.keys(additions)) {
  // Find the start of the language object inside `copy`
  const regex = new RegExp(`\\b${lang}:\\s*\\{\\s*\\n\\s*nav:`, 'g');
  content = content.replace(regex, `${lang}: {\n    ${additions[lang]}\n    nav:`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('siteData.js patched successfully!');
