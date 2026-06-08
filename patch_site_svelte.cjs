const fs = require('fs');

const path = 'src/lib/components/Site.svelte';
let content = fs.readFileSync(path, 'utf8');

// 1. Add getProjectTitle helper function
if (!content.includes('function getProjectTitle(')) {
  const helper = `\n  function getProjectTitle(project) {
    if (project?.title) {
      return project.title[lang] || project.title.es || project.name;
    }
    return project?.alt || project?.name || '';
  }\n\n  function projectDescription(project) {`;
  content = content.replace('  function projectDescription(project) {', helper);
}

// 2. Schema Translation
content = content.replace(
  `name: 'Estructura principal de Standarte',`,
  `name: lang === 'es' ? 'Estructura principal de Standarte' : 'Standarte Main Structure',` // Wait, actually replace with copy or just this? The user wanted it translated. I'll use lang === 'es' ? ...
);

content = content.replace(
  `['Servicios', pathFor('es', 'services')],
      ['Galería', pathFor('es', 'custom')],
      ['Equipo', pathFor('es', 'team')],
      ['Contacto', pathFor('es', 'contact')],
      ['Construcción de stands en Madrid', pathFor('es', 'madrid')],
      ['Construcción de stands en Barcelona', pathFor('es', 'barcelona')],
      ['Construcción de stands en Bilbao', pathFor('es', 'bilbao')],
      ['Construcción de stands en Lisboa', pathFor('es', 'lisboa')],
      ['Construcción de stands en Málaga', pathFor('es', 'malaga')],
      ['Construcción de stands en Badajoz', pathFor('es', 'badajoz')]`,
  `[copy.nav.services, pathFor(lang, 'services')],
      [copy.nav.custom, pathFor(lang, 'custom')],
      [copy.teamTitle, pathFor(lang, 'team')],
      [copy.nav.contact, pathFor(lang, 'contact')],
      [cityTitle('madrid'), pathFor(lang, 'madrid')],
      [cityTitle('barcelona'), pathFor(lang, 'barcelona')],
      [cityTitle('bilbao'), pathFor(lang, 'bilbao')],
      [cityTitle('lisboa'), pathFor(lang, 'lisboa')],
      [cityTitle('malaga'), pathFor(lang, 'malaga')],
      [cityTitle('badajoz'), pathFor(lang, 'badajoz')]`
);

// 3. UI Keys replacements
content = content.replace(
  `{lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}`,
  `{copy.faqsTitle}`
);

content = content.replace(
  `{lang === 'es' ? 'Casos de Éxito' : 'Success Stories'}`,
  `{copy.successStoriesTitle}`
);

content = content.replace(
  `{lang === 'es' \n                      ? 'Proyectos destacados de alta carpintería y diseño de stands efímeros:' \n                      : 'Featured custom carpentry and exhibition stand design projects:'}`,
  `{copy.featuredProjectsIntro}`
);
content = content.replace(
  `{lang === 'es' \n                      ? 'Proyectos destacados de alta carpintera y diseo de stands efmeros:' \n                      : 'Featured custom carpentry and exhibition stand design projects:'}`,
  `{copy.featuredProjectsIntro}`
);

// Fallback regex if the multi-line replace doesn't match perfectly
content = content.replace(/\{lang === 'es'[^}]+\? 'Proyectos destacados[^}]+\}/g, `{copy.featuredProjectsIntro}`);

// 4. Project Titles replacements
// Carousels and sidebars
content = content.replace(/alt=\{project\.alt\}/g, 'alt={getProjectTitle(project)}');
content = content.replace(/alt=\{project\.name\}/g, 'alt={getProjectTitle(project)}');
content = content.replace(/<h4>\{project\.alt\}<\/h4>/g, '<h4>{getProjectTitle(project)}</h4>');
content = content.replace(/<h3>\{project\.name\}<\/h3>/g, '<h3>{getProjectTitle(project)}</h3>');
content = content.replace(/aria-label=\{project\.alt\}/g, 'aria-label={getProjectTitle(project)}');

// Lightbox
content = content.replace(/alt=\{lightboxProject\.alt\}/g, 'alt={getProjectTitle(lightboxProject)}');
content = content.replace(/<strong>\{lightboxProject\.alt\}<\/strong>/g, '<strong>{getProjectTitle(lightboxProject)}</strong>');
content = content.replace(/aria-label=\{lightboxProject\.alt\}/g, 'aria-label={getProjectTitle(lightboxProject)}');

fs.writeFileSync(path, content, 'utf8');
console.log('Site.svelte patched successfully!');
