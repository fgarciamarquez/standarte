import { redirect } from '@sveltejs/kit';
import { BRAND } from '$lib/brand.js';

// Acceso de constructores asociados (StandQuote, fase 2 en preparación). En la marca
// Standarte esta ruta no existe: redirige a la portada como las secciones retiradas.
export const prerender = true;

export function load() {
  if (!BRAND.leadGen) throw redirect(308, '/');
  return {};
}
