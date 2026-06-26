import { portfolioVideos, siteVideos } from '$lib/videosData.js';
import { projectVideos } from '$lib/server/projectVideos.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

// Todos los vídeos con página de visualización: los 8 del carrusel + los de presentación
// (MicroStand) + los .mp4 de cada proyecto. Usamos +page.server.js (no +page.js) para que
// projectData no llegue al cliente.
const allVideos = [...portfolioVideos, ...siteVideos, ...projectVideos];

export const entries = () => allVideos.map((v) => ({ slug: v.slug }));

export function load({ params }) {
  const video = allVideos.find((v) => v.slug === params.slug);
  if (!video) {
    error(404, 'Video not found');
  }
  return { video };
}
