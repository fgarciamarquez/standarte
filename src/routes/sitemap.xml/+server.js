import { languages, routes, pathFor } from '$lib/siteData.js';
import { getAllProjectIds } from '$lib/projectData.js';
import news from '$lib/newsData.json';

export const prerender = true;

const siteUrl = 'https://standarte.es';

export async function GET() {
  const urls = [];

  // 1. Static Routes (home, services, contact, etc.)
  const staticSections = Object.keys(routes.es);
  
  staticSections.forEach((section) => {
    // For each section, we create a URL entry for each language
    languages.forEach((lang) => {
      // Only include if the route exists for this language
      if (routes[lang] && routes[lang][section] !== undefined) {
        const urlObj = {
          loc: `${siteUrl}${pathFor(lang, section)}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: section === 'home' ? '1.0' : '0.8',
          alternates: []
        };

        // Add hreflang alternatives for this specific section
        languages.forEach((altLang) => {
          if (routes[altLang] && routes[altLang][section] !== undefined) {
            urlObj.alternates.push({
              hreflang: altLang,
              href: `${siteUrl}${pathFor(altLang, section)}`
            });
          }
        });

        urls.push(urlObj);
      }
    });
  });

  // 2. Projects (proyectos/[id])
  const projectIds = getAllProjectIds();
  projectIds.forEach((id) => {
    languages.forEach((lang) => {
      const isEs = lang === 'es';
      const loc = isEs ? `${siteUrl}/proyectos/${id}` : `${siteUrl}/proyectos/${id}?lang=${lang}`;
      
      const urlObj = {
        loc: loc,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
        alternates: []
      };

      // Add hreflang alternatives for this project
      languages.forEach((altLang) => {
        const altIsEs = altLang === 'es';
        urlObj.alternates.push({
          hreflang: altLang,
          href: altIsEs ? `${siteUrl}/proyectos/${id}` : `${siteUrl}/proyectos/${id}?lang=${altLang}`
        });
      });

      urls.push(urlObj);
    });
  });

  // 3. News (noticias/[slug])
  // Note: Since news slugs are unique per language, we list them individually
  news.forEach((article) => {
    urls.push({
      loc: `${siteUrl}${pathFor(article.lang, 'noticias')}/${article.slug}`,
      lastmod: article.date || new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6',
      alternates: []
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
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
