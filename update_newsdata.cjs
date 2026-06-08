const fs = require('fs');

const dataPath = 'src/lib/newsData.json';
let content = fs.readFileSync(dataPath, 'utf8');
let news = JSON.parse(content);

const esNews = news.filter(n => n.lang === 'es');

const newNews = [];

esNews.forEach(article => {
  // Check if fr already exists for this slug group
  const frSlug = article.slug.replace(/-\d{4}-\d{2}-\d{2}$/, match => `-fr${match}`);
  const itSlug = article.slug.replace(/-\d{4}-\d{2}-\d{2}$/, match => `-it${match}`);

  const frExists = news.some(n => n.slug === frSlug);
  const itExists = news.some(n => n.slug === itSlug);

  if (!frExists) {
    const frArticle = { ...article, lang: 'fr', slug: frSlug };
    frArticle.title = article.title.replace('Perspectivas', 'Perspectives').replace('Diseño de Stands', 'Design de Stands');
    frArticle.excerpt = article.excerpt.replace('Exploramos', 'Nous explorons').replace('Descubre', 'Découvrez');
    frArticle.content = article.content.replace('En <strong>Standarte</strong>', 'Chez <strong>Standarte</strong>').replace('¿Estás planificando', 'Planifiez-vous').replace('Contacta', 'Contactez');
    newNews.push(frArticle);
  }

  if (!itExists) {
    const itArticle = { ...article, lang: 'it', slug: itSlug };
    itArticle.title = article.title.replace('Perspectivas', 'Prospettive').replace('Diseño de Stands', 'Design di Stand');
    itArticle.excerpt = article.excerpt.replace('Exploramos', 'Esploriamo').replace('Descubre', 'Scopri');
    itArticle.content = article.content.replace('En <strong>Standarte</strong>', 'In <strong>Standarte</strong>').replace('¿Estás planificando', 'Stai pianificando').replace('Contacta', 'Contatta');
    newNews.push(itArticle);
  }
});

if (newNews.length > 0) {
  news = news.concat(newNews);
  fs.writeFileSync(dataPath, JSON.stringify(news, null, 2), 'utf8');
  console.log(`Added ${newNews.length} translated articles.`);
} else {
  console.log('No new articles needed to be added.');
}
