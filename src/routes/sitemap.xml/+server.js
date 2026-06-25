import { fairsData } from '$lib/fairsData.js';
import { languages, routes, pathFor, portfolios, fairUrl, projectUrl } from '$lib/siteData.js';
import { getAllProjectIds } from '$lib/projectData.js';
import { portfolioVideos } from '$lib/videosData.js';
import { projectVideos } from '$lib/server/projectVideos.js';
import news from '$lib/newsData.json';

export const prerender = true;

const siteUrl = 'https://standarte.es';

// Notas de diseño (no romper sin motivo):
// - Los proyectos se listan UNA vez por id, sin variantes ?lang=: la página es
//   única y su <link rel="canonical"> apunta a /proyectos/<id>; listar las
//   variantes con query contradice la canónica y Google las descarta.
// - Las noticias de TODOS los idiomas se sirven bajo /blog/<slug> (la ruta
//   noticias/[slug] prerenderiza todos los artículos); las URLs /pt/blog/...
//   no existen y daban 404/500.
// - lastmod solo se emite cuando es una fecha real (noticias). Emitir la fecha
//   del build en todo degrada la confianza de Google en el campo.
// - Cada grupo hreflang lleva x-default apuntando a la versión española.

// Escape mínimo para texto dentro de XML (títulos/descripciones de vídeo).
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Extensión Video de Google. Cada vídeo se declara en SU página de visualización
// (watch page /videos/<slug>), que es donde Google exige encontrar el reproductor;
// loc = watch page, player_loc = watch page, content_loc = .mp4.

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

  // 2. Proyectos: URL compartida /proyectos/{id} (x-default + no-ja) y URL propia ja
  //    /ja/プロジェクト/{slug}. Ambas se enlazan mutuamente por hreflang.
  getAllProjectIds().forEach((id) => {
    const alternates = [
      { hreflang: 'ja', href: `${siteUrl}${projectUrl(id, 'ja')}` },
      { hreflang: 'x-default', href: `${siteUrl}/proyectos/${id}` }
    ];
    urls.push({ loc: `${siteUrl}/proyectos/${id}`, changefreq: 'monthly', priority: '0.7', alternates });
    urls.push({ loc: `${siteUrl}${projectUrl(id, 'ja')}`, changefreq: 'monthly', priority: '0.7', alternates });
  });

  // 3. Noticias (noticias/[slug]) — todos los idiomas viven bajo /blog/
  news.forEach((article) => {
    const group = news.filter(item => item.date === article.date && item.location === article.location);
    const alternates = group.map(item => ({
      hreflang: item.lang,
      href: `${siteUrl}/blog/${item.slug}`
    }));
    const esVersion = group.find(item => item.lang === 'es');
    if (esVersion) {
      alternates.push({ hreflang: 'x-default', href: `${siteUrl}/blog/${esVersion.slug}` });
    }

    urls.push({
      loc: `${siteUrl}/blog/${article.slug}`,
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
      href: `${siteUrl}${fairUrl(fair.slug, altLang)}`
    }));
    alternates.push({ hreflang: 'x-default', href: `${siteUrl}${fairUrl(fair.slug, 'es')}` });

    languages.forEach((lang) => {
      urls.push({
        loc: `${siteUrl}${fairUrl(fair.slug, lang)}`,
        changefreq: 'monthly',
        priority: '0.7',
        alternates
      });
    });
  });

  // 5. Galería (galeria/[slug]) — una sola URL por proyecto: la slug es es la canónica.
  //    Las variantes de idioma renderizan el mismo contenido en español y declaran
  //    canonical→es; listarlas duplicaría páginas y diluiría el rastreo, así que se omiten.
  portfolios.forEach((project) => {
    if (!project.slugs || !project.slugs.es) return;
    urls.push({
      loc: `${siteUrl}/galeria/${project.slugs.es}`,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: []
    });
  });

  // 6. Páginas de visualización de vídeo (/videos/<slug>) — una URL por vídeo, con el
  //    reproductor visible. Incluye los 8 del carrusel y los .mp4 de cada proyecto.
  [...portfolioVideos, ...projectVideos].forEach((v) => {
    const watch = `${siteUrl}/videos/${v.slug}`;
    urls.push({
      loc: watch,
      changefreq: 'monthly',
      priority: '0.6',
      alternates: [],
      videos: [
        {
          thumbnail: `${siteUrl}${v.thumb}`,
          title: v.title,
          description: v.description,
          content: `${siteUrl}${v.src}`,
          publicationDate: v.uploadDate
        }
      ]
    });
  });

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : ''}    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${url.alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n')}${url.videos ? '\n' + url.videos.map(v => `    <video:video>
      <video:thumbnail_loc>${v.thumbnail}</video:thumbnail_loc>
      <video:title>${xmlEscape(v.title)}</video:title>
      <video:description>${xmlEscape(v.description)}</video:description>
      <video:content_loc>${v.content}</video:content_loc>
      <video:publication_date>${v.publicationDate}</video:publication_date>
    </video:video>`).join('\n') : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
