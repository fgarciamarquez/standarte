// Fechas de última actualización REAL del contenido (no la fecha del build) de las
// páginas trabajadas bajo el plan Oro. Es la señal de frescura honesta para los motores:
//   - dateModified en el JSON-LD (WebPage), leído en Site.svelte.
//   - <lastmod> real en el sitemap, leído en routes/sitemap.xml.
// IMPORTANTE: se actualiza A MANO al reescribir el contenido de una página, para que la
// fecha sea veraz y NO se dispare en cada compilación (un lastmod que cambia sin cambiar
// el contenido es un antipatrón que Google penaliza en confianza).
//
// 2026-07-14: refresco general de plantilla en TODAS las páginas Oro (CTA "Solicitar
// presupuesto", etiquetas del sidebar, reestructura de los apartados plegados y píldoras
// de actividad). Es un cambio real y visible del contenido, por eso se actualiza la fecha.
//
// Clave = sección de `routes` (siteData.js). Valor = fecha ISO (YYYY-MM-DD).
export const seoFreshness = {
  badajoz: '2026-07-14',
  montaje_badajoz: '2026-07-14',
  zaragoza: '2026-07-14',
  lisboa: '2026-07-16',
  montaje_don_benito: '2026-07-14',
  ciudad_real: '2026-07-14',
  trujillo: '2026-07-14',
  montaje_zafra: '2026-07-14',
  oporto: '2026-07-14',
  vigo: '2026-07-14',
  portugal_sur: '2026-07-14',
  madrid: '2026-07-16',
  bilbao: '2026-07-14',
  malaga: '2026-07-14',
  sevilla: '2026-07-14',
  barcelona: '2026-07-14',
  alicante: '2026-07-14',
  elche: '2026-07-14',
  murcia: '2026-07-14',
  islas_canarias: '2026-07-14',
  islas_de_madeira: '2026-07-14',
  mallorca: '2026-07-14',
  valencia: '2026-07-14',
  coruna: '2026-07-14',
  santiago: '2026-07-14',
  valladolid: '2026-07-14',
  salamanca: '2026-07-14',
  batalha: '2026-07-14',
  santarem: '2026-07-14',
  almeria: '2026-07-14',
  jaen: '2026-07-14',
  huelva: '2026-07-14',
  cordoba: '2026-07-14',
  granada: '2026-07-14',
  cadiz: '2026-07-14',
  silleda: '2026-07-14',
  ourense: '2026-07-14',
  lleida: '2026-07-14',
  girona: '2026-07-14',
  santander: '2026-07-14',
  gijon: '2026-07-14',
  irun: '2026-07-14',
  logrono: '2026-07-14',
  pamplona: '2026-07-14',
  vitoria: '2026-07-14',
  aranda: '2026-07-14',
  regua: '2026-07-14',
  ibiza: '2026-07-14',
  menorca: '2026-07-14',
  ceuta: '2026-07-14',
  melilla: '2026-07-14',
  tanger: '2026-07-14',
  andorra: '2026-07-15'
};

/** Fecha de última actualización de contenido de una sección, o null si no la tiene. */
export function freshnessFor(section) {
  return (section && seoFreshness[section]) || null;
}
