import { getProjectById, getAllProjectIds } from '$lib/projectData.js';

export const prerender = true;

export const entries = () => {
  return getAllProjectIds().map(id => ({ id }));
};

export function load({ params }) {
  const project = getProjectById(params.id);
  if (!project) {
    return {
      status: 404,
      error: new Error('Project not found')
    };
  }
  return { project };
}
