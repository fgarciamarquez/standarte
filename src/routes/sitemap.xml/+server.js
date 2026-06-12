import { fairsData } from '$lib/fairsData.js';
import { languages, routes, pathFor, portfolios } from '$lib/siteData.js';
import { getAllProjectIds } from '$lib/projectData.js';
import news from '$lib/newsData.json';

export const prerender = true;

const siteUrl = 'https://standarte.es';

// Notas de diseño (no romper sin motivo):
// - Los proyectos se listan UNA vez por id, sin variantes ?lang=: la página es
//   única y su <link rel="canonical"> apunta a /proyectos/<id>; listar las
//   variantes con query contradice la canónica y Google las descarta.
// - Las noticias de TODOS los idiomas se sirven bajo /noticias/<slug> (la ruta
//   noticias/[slug] prerenderiza todos los artículos); las URLs /pt/noticias/...
//   no existen y daban 404/500.
// - lastmod solo se emite cuando es una fecha real (noticias). Emitir la fecha
//   del build en todo degrada la confianza de Google en el campo.
// - Cada grupo hreflang lleva x-default apuntando a la versión española.

export async function GET() {
  const urls = [];

  // 1. Secciones estáticas (home, servicios, ciudades, contacto...) por idioma
  const staticSections = Object.keys(routes.es);

  staticSections.forEach((section) => {
    const alternates = [];
    languages.forEach((altLang) => {
      if (routes[altLang] && routes[altLang][section] !== undefined) {
        alternates.push({
          hreflang: altLang,
          href: `${siteUrl}${pathFor(altLang, section)}`
        });
      }
    });
    if (routes.es[section] !== undefined) {
      alternates.push({ hreflang: 'x-default', href: `${siteUrl}${pathFor('es', section)}` });
    }

    languages.forEach((lang) => {
      if (routes[lang] && routes[lang][section] !== undefined) {
        urls.push({
          loc: `${siteUrl}${pathFor(lang, section)}`,
          changefreq: 'monthly',
          priority: section === 'home' ? '1.0' : '0.8',
          alternates
        });
      }
    });
  });

  // 2. Proyectos (proyectos/[id]) — una única URL canónica por proyecto
  getAllProjectIds().forEach((id) => {
    urls.push({
      loc: `${siteUrl}/proyectos/${id}`,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: []
    });
  });

  // 3. Noticias (noticias/[slug]) — todos los idiomas viven bajo /noticias/
  news.forEach((article) => {
    const group = news.filter(item => item.date === article.date && item.location === article.location);
    const alternates = group.map(item => ({
      hreflang: item.lang,
      href: `${siteUrl}/noticias/${item.slug}`
    }));
    const esVersion = group.find(item => item.lang === 'es');
    if (esVersion) {
      alternates.push({ hreflang: 'x-default', href: `${siteUrl}/noticias/${esVersion.slug}` });
    }

    urls.push({
      loc: `${siteUrl}/noticias/${article.slug}`,
      lastmod: article.date || undefined,
      changefreq: 'weekly',
      priority: '0.6',
      alternates
    });
  });

  // 4. Ferias (ferias/[slug]) por idioma
  fairsData.forEach((fair) => {
    const alternates = languages.map((altLang) => ({
      hreflang: altLang,
      href: `${siteUrl}${altLang === 'es' ? '' : `/${altLang}`}/ferias/${fair.slug}`
    }));
    alternates.push({ hreflang: 'x-default', href: `${siteUrl}/ferias/${fair.slug}` });

    languages.forEach((lang) => {
      urls.push({
        loc: `${siteUrl}${lang === 'es' ? '' : `/${lang}`}/ferias/${fair.slug}`,
        changefreq: 'monthly',
        priority: '0.6',
        alternates
      });
    });
  });

  // 5. Galería (galeria/[slug]) — slug propio por idioma
  portfolios.forEach((project) => {
    if (!project.slugs) return;
    const alternates = [];
    languages.forEach((altLang) => {
      if (project.slugs[altLang]) {
        alternates.push({
          hreflang: altLang,
          href: `${siteUrl}/galeria/${project.slugs[altLang]}`
        });
      }
    });
    if (project.slugs.es) {
      alternates.push({ hreflang: 'x-default', href: `${siteUrl}/galeria/${project.slugs.es}` });
    }

    languages.forEach((lang) => {
      const slug = project.slugs[lang];
      if (slug) {
        urls.push({
          loc: `${siteUrl}/galeria/${slug}`,
          changefreq: 'monthly',
          priority: '0.7',
          alternates
        });
      }
    });
  });

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : ''}    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${url.alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
