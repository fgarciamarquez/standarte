const fs = require('fs');
let content = fs.readFileSync('src/lib/siteData.js', 'utf8');

// 1. Add import
if (!content.includes("import { fairsData }")) {
  content = "import { fairsData } from '$lib/fairsData.js';\n" + content;
}

// 2. Add 'ferias' to each route dictionary
const languages = ['es', 'en', 'de', 'zh', 'hi', 'pt', 'fr', 'it', 'ko'];
const feriasMap = {
  es: 'ferias', en: 'fairs', de: 'messen', zh: 'zhanhui',
  hi: 'mele', pt: 'feiras', fr: 'salons', it: 'fiere', ko: 'jeonsihoe'
};
for (const lang of languages) {
  const target = `noticias: '${lang === 'en' ? 'news' : lang === 'de' ? 'nachrichten' : lang === 'zh' ? 'xinwen' : lang === 'hi' ? 'samachar' : lang === 'fr' ? 'actualites' : lang === 'it' ? 'notizie' : 'noticias'}'`;
  const replaceStr = `${target},\n    ferias: '${feriasMap[lang] || 'ferias'}'`;
  content = content.replace(target, replaceStr);
}

// 3. Update findRoute
content = content.replace(
  "const section = Object.keys(langRoutes).find((key) => langRoutes[key] === slug) || 'home';",
  "if (slug.startsWith('ferias/')) { return { lang: maybeLang, section: 'feria', fairSlug: slug.substring(7) }; }\n  const section = Object.keys(langRoutes).find((key) => langRoutes[key] === slug) || 'home';"
);

// 4. Update resolveRoute
content = content.replace(
  "const { lang, section } = findRoute(path);",
  "const { lang, section, fairSlug } = findRoute(path);"
).replace(
  "return { lang, section, copy: c, canonical };",
  "return { lang, section, fairSlug, copy: c, canonical };"
);

// 5. Update prerenderEntries
content = content.replace(
  "export const prerenderEntries = languages.flatMap((lang) =>\n  Object.keys(routes[lang]).map((section) => ({ path: pathFor(lang, section).replace(/^\\/|\\/$/g, '') }))\n).filter((entry) => entry.path !== '');",
  `export const prerenderEntries = languages.flatMap((lang) => {
  const normalRoutes = Object.keys(routes[lang]).map((section) => ({ path: pathFor(lang, section).replace(/^\\/|\\/$/g, '') }));
  const fairRoutes = fairsData.map(fair => {
     const prefix = lang === 'es' ? '' : \`\${lang}/\`;
     return { path: \`\${prefix}ferias/\${fair.slug}\` };
  });
  return [...normalRoutes, ...fairRoutes];
}).filter((entry) => entry.path !== '');`
);

fs.writeFileSync('src/lib/siteData.js', content, 'utf8');
console.log('siteData.js properly updated.');
