// Bandera de país de las ciudades-pilar, para la nube "Ciudades a las que vamos".
// La usan el sidebar de las páginas de ciudad (Site.svelte) y el aside de las páginas
// de feria (Feria.svelte): se comparte desde aquí para que no diverjan.

import { cityData } from '$lib/siteData.js';
import { fairsData } from '$lib/fairsData.js';

// Pilares cuyas ferias están en un municipio satélite (el nombre de la ciudad-pilar no
// coincide con ningún `fair.city`), así que el país no se puede deducir de sus ferias.
export const CITY_FLAG_FALLBACK = { murcia: 'es', salamanca: 'es', andorra: 'ad' };

// País de la ciudad-pilar, o null si es España (las españolas no llevan bandera).
export function navFlagCountry(cityKey) {
  const esName = cityData[cityKey]?.city?.es;
  const c = fairsData.find((f) => f.city === esName)?.country || CITY_FLAG_FALLBACK[cityKey] || 'es';
  return c === 'es' ? null : c;
}
