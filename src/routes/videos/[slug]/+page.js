import { portfolioVideos, getVideoBySlug } from '$lib/videosData.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries = () => portfolioVideos.map((v) => ({ slug: v.slug }));

export function load({ params }) {
  const video = getVideoBySlug(params.slug);
  if (!video) {
    error(404, 'Video not found');
  }
  return { video };
}
