import news from '$lib/newsData.json';
import { error } from '@sveltejs/kit';

export const entries = () => {
  return news.map(item => ({ slug: item.slug }));
};

export function load({ params }) {
  const article = news.find(item => item.slug === params.slug);
  if (!article) {
    throw error(404, 'Artículo no encontrado');
  }
  const alternates = news.filter(item => item.date === article.date && item.location === article.location && item.lang !== article.lang);
  return { article, alternates };
}
