// Fechas de última actualización REAL del contenido (no la fecha del build) de las
// páginas trabajadas bajo el plan Oro. Es la señal de frescura honesta para los motores:
//   - dateModified en el JSON-LD (WebPage), leído en Site.svelte.
//   - <lastmod> real en el sitemap, leído en routes/sitemap.xml.
// IMPORTANTE: se actualiza A MANO al reescribir el contenido de una página, para que la
// fecha sea veraz y NO se dispare en cada compilación (un lastmod que cambia sin cambiar
// el contenido es un antipatrón que Google penaliza en confianza).
//
// Clave = sección de `routes` (siteData.js). Valor = fecha ISO (YYYY-MM-DD).
export const seoFreshness = {
  badajoz: '2026-07-06',
  zaragoza: '2026-07-06',
  lisboa: '2026-07-06',
  montaje_don_benito: '2026-07-06',
  ciudad_real: '2026-07-06',
  montaje_zafra: '2026-07-06',
  oporto: '2026-07-06',
  vigo: '2026-07-07',
  portugal_sur: '2026-07-07',
  madrid: '2026-07-07',
  bilbao: '2026-07-07',
  malaga: '2026-07-07',
  sevilla: '2026-07-07',
  barcelona: '2026-07-07',
  alicante: '2026-07-08',
  murcia: '2026-07-08',
  islas_canarias: '2026-07-12',
  islas_de_madeira: '2026-07-12',
  mallorca: '2026-07-07',
  valencia: '2026-07-08',
  coruna: '2026-07-08',
  santiago: '2026-07-08',
  valladolid: '2026-07-08',
  salamanca: '2026-07-08',
  batalha: '2026-07-08',
  almeria: '2026-07-08',
  jaen: '2026-07-08',
  huelva: '2026-07-08',
  cordoba: '2026-07-08',
  granada: '2026-07-08',
  cadiz: '2026-07-08',
  silleda: '2026-07-10',
  ourense: '2026-07-10',
  lleida: '2026-07-10',
  girona: '2026-07-10',
  santander: '2026-07-11',
  gijon: '2026-07-11',
  irun: '2026-07-12'
};

/** Fecha de última actualización de contenido de una sección, o null si no la tiene. */
export function freshnessFor(section) {
  return (section && seoFreshness[section]) || null;
}
