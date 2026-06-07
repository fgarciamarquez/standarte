import { getProjectById, getAllProjectIds } from '$lib/projectData.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries = () => {
  return getAllProjectIds().map(id => ({ id }));
};

export function load({ params }) {
  const project = getProjectById(params.id);
  if (!project) {
    error(404, 'Project not found');
  }
  return { project };
}
