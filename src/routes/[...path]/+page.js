import { prerenderEntries, resolveRoute } from '$lib/siteData.js';

export const entries = () => prerenderEntries;

export function load({ params }) {
  return resolveRoute(params.path || '');
}
