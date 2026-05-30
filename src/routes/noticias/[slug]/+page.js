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
  return { article };
}
