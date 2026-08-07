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
  badajoz: '2026-07-16',
  montaje_badajoz: '2026-07-14',
  zaragoza: '2026-08-07',
  lisboa: '2026-08-07',
  montaje_don_benito: '2026-07-14',
  ciudad_real: '2026-07-14',
  trujillo: '2026-07-14',
  montaje_zafra: '2026-07-14',
  oporto: '2026-08-07',
  vigo: '2026-07-14',
  portugal_sur: '2026-07-14',
  madrid: '2026-08-07',
  bilbao: '2026-08-07',
  malaga: '2026-08-07',
  sevilla: '2026-08-07',
  barcelona: '2026-08-07',
  alicante: '2026-07-14',
  elche: '2026-07-14',
  murcia: '2026-07-14',
  islas_canarias: '2026-07-14',
  islas_de_madeira: '2026-07-14',
  mallorca: '2026-07-14',
  valencia: '2026-08-07',
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
  granada: '2026-08-05',
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
  andorra: '2026-07-15',
  teruel: '2026-07-16',
  marsella: '2026-07-18',
  cannes: '2026-07-24',
  avignon: '2026-07-17',
  toulouse: '2026-07-24',
  perpignan: '2026-07-21',
  burdeos: '2026-07-24',
  casablanca: '2026-07-22',
  rabat: '2026-07-22',
  lyon: '2026-07-22',
  montpellier: '2026-07-23',
  niza: '2026-07-23',
  grenoble: '2026-07-24',
  clermont_ferrand: '2026-07-24'
};

/** Fecha de última actualización de contenido de una sección, o null si no la tiene. */
export function freshnessFor(section) {
  return (section && seoFreshness[section]) || null;
}

// Frescura por FERIA satélite (páginas /ferias/<slug>). Misma filosofía honesta que
// seoFreshness: fecha ISO real de la última revisión del contenido de la ficha o de su
// clúster-ciudad. Se emite como <lastmod> en el sitemap y como dateModified en el JSON-LD
// de la feria, para que los motores reindexen las satélites junto con su hub prioritario.
// Clave = slug de feria (fairsData). Solo llevan fecha las ferias realmente refrescadas.
export const fairFreshness = {
  // Barcelona (Plaza Prioritaria) — clúster de 17 ferias satélite refrescado 2026-07-18.
  'mwc-barcelona': '2026-07-18',
  'ise-barcelona': '2026-07-18',
  'smart-city-expo-world-congress-barcelona': '2026-07-18',
  'iot-solutions-world-congress-barcelona': '2026-07-18',
  'alimentaria-barcelona': '2026-07-18',
  'hostelco-barcelona': '2026-07-18',
  'barcelona-wine-week': '2026-07-18',
  'seafood-expo-global-barcelona': '2026-07-18',
  'expoquimia-barcelona': '2026-07-18',
  'hispack-barcelona': '2026-07-18',
  'labelexpo-barcelona': '2026-07-25',
  'equiplast-barcelona': '2026-07-18',
  'construmat-barcelona': '2026-07-18',
  'piscina-wellness-barcelona': '2026-07-18',
  'cosmobeauty-barcelona': '2026-07-18',
  'forum-dental-mediterraneo-barcelona': '2026-07-18',
  'sil-barcelona': '2026-07-18',
  'automobile-barcelona': '2026-07-18',
  // Marsella (refuerzo sur de Francia) — clúster de 10 ferias satélite, 2026-07-18.
  'foire-internationale-marseille': '2026-07-18',
  'euromaritime-marseille': '2026-07-18',
  'sirha-mediterranee-marseille': '2026-07-18',
  'beauty-profs-marseille': '2026-07-18',
  'savim-marseille': '2026-07-18',
  'salon-piscine-jardin-marseille': '2026-07-18',
  'solutions-cse-marseille': '2026-07-18',
  'japan-expo-sud-marseille': '2026-07-18',
  'herofestival-marseille': '2026-07-18',
  'siac-marseille': '2026-07-18',
  // Burdeos (Nueva Aquitania) — clúster de 8 ferias satélite, 2026-07-20.
  'foire-internationale-bordeaux': '2026-07-20',
  'vinitech-sifel-bordeaux': '2026-07-20',
  'equitaine-bordeaux': '2026-07-20',
  'salon-agriculture-nouvelle-aquitaine-bordeaux': '2026-07-20',
  'art3f-bordeaux': '2026-07-20',
  'grand-salon-habitat-bordeaux': '2026-07-20',
  'salon-vins-vignerons-independants-bordeaux': '2026-07-20',
  'cycleau-nouvelle-aquitaine-bordeaux': '2026-07-20',
  // Casablanca (Marruecos) — clúster de 15 ferias satélite, 2026-07-22.
  'logismed-casablanca': '2026-07-22',
  'morocco-food-expo-casablanca': '2026-07-22',
  'siema-casablanca': '2026-07-22',
  'siab-casablanca': '2026-07-22',
  'elec-expo-casablanca': '2026-07-22',
  'ener-event-casablanca': '2026-07-22',
  'plast-expo-casablanca': '2026-07-22',
  'pack-expo-casablanca': '2026-07-22',
  'sistep-casablanca': '2026-07-22',
  'imme-casablanca': '2026-07-22',
  'morocco-medical-expo-casablanca': '2026-07-22',
  'morocco-textile-expo-casablanca': '2026-07-22',
  'stitch-tex-casablanca': '2026-07-22',
  'maroc-in-mode-mim-casablanca': '2026-07-22',
  'ctw-china-trade-week-casablanca': '2026-07-22',
  // Rabat (Marruecos) — clúster de 4 ferias satélite (edición/cultura/educación), 2026-07-22.
  'siel-rabat': '2026-07-22',
  'visa-for-music-rabat': '2026-07-22',
  'forum-etudiant-rabat': '2026-07-22',
  'cimqusef-rabat': '2026-07-22',
  'sirha-lyon': '2026-07-22',
  'global-industrie-lyon': '2026-07-22',
  'pollutec-lyon': '2026-07-22',
  'piscine-global-lyon': '2026-07-22',
  'preventica-lyon': '2026-07-22',
  'prod-pack-lyon': '2026-07-22',
  'bepositive-lyon': '2026-07-22',
  'sitevi-montpellier': '2026-07-23',
  'millesime-bio-montpellier': '2026-07-23',
  'sett-montpellier': '2026-07-23',
  'energaia-montpellier': '2026-07-23',
  'siprho-montpellier': '2026-07-23',
  'ais-montpellier': '2026-07-23',
  'agecotel-nice': '2026-07-23',
  'nice-boating-tomorrow': '2026-07-23',
  'ibt-cote-azur': '2026-07-23',
  'entreprenariales-nice': '2026-07-23',
  'solucop-nice': '2026-07-23',
  'mipim-cannes': '2026-07-24',
  'tfwa-cannes': '2026-07-24',
  'alina-bordeaux': '2026-07-24',
  'preventica-bordeaux': '2026-07-24',
  'smahrt-toulouse': '2026-07-24',
  'mountain-planet-grenoble': '2026-07-24',
  'sepem-industries-sud-est-grenoble': '2026-07-24',
  'sommet-elevage-clermont-ferrand': '2026-07-24',
  'smopyc-zaragoza': '2026-07-24',
  'stand-tecnovid-zaragoza': '2026-08-02',

  // Madrid: alta de FIAA (bus y autocar, IFEMA) en el hub.

  'fiaa-madrid': '2026-08-07',
  'smagua-zaragoza': '2026-07-25',
  // Perpiñán — clúster de ferias satélite (MEDFEL prioritaria), 2026-07-21.
  'medfel-perpignan': '2026-07-21',
  'viv-habitat-perpignan': '2026-07-21',
  'tourisme-loisirs-perpignan': '2026-07-21',
  'eco-maison-perpignan': '2026-07-21',
  'retro-mecanic-perpignan': '2026-07-21',
  'salon-mariage-perpignan': '2026-07-21',
  'foire-exposition-perpignan': '2026-07-21',
  // Ferias que estrenan fecha verificada de su próxima edición (2026-07-25). El dato
  // aparece en la respuesta directa de la ficha ("En X (Ciudad - 3-7 sep 2026)…"), así
  // que es contenido nuevo real y toca reindexar.
  'conxemar-vigo': '2026-07-25',
  'navalia-vigo': '2026-07-25',
  'agroglobal-santarem': '2026-07-25',
  'salamaq-salamanca': '2026-07-25',
  'fatacil-lagoa': '2026-07-25',
  'expometal-batalha': '2026-07-25',
  'stone-iberica-batalha': '2026-07-25',
  'forum-gastronomico-a-coruna': '2026-07-25',
  'biocultura-a-coruna': '2026-07-25',
  'fecons-torre-pacheco': '2026-07-25',
  'agraria-valladolid': '2026-07-25',
  'infarma': '2026-07-25',
  'expooptica-madrid': '2026-07-25',
  // Ferias que estrenan ficha propia (antes no tenían cuerpo único, y por eso tampoco
  // aparecían con resumen en el calendario sectorial de otras ferias).
  'figan-zaragoza': '2026-07-25',
  'concreta-oporto': '2026-07-25',
  'stand-enomaq-zaragoza': '2026-07-25',
  // Estrenan fecha verificada de su próxima edición.
  'feria-internacional-ganadera-zafra': '2026-07-25',
  'termatalia-ourense': '2026-07-25',
  // 20 ferias que estrenan ficha propia (antes sin cuerpo único ni resumen en el
  // calendario sectorial de otras ferias).
  'habitat-valencia': '2026-07-26',
  'fimma-maderalia-valencia': '2026-07-26',
  'iberflora-valencia': '2026-07-26',
  'gastronoma-valencia': '2026-07-26',
  'espacio-cocina-sici-valencia': '2026-07-26',
  'eurobrico-valencia': '2026-07-26',
  'textilhogar-valencia': '2026-07-26',
  'emaf-oporto': '2026-07-26',
  'empack-oporto': '2026-07-26',
  'expocarne-oporto': '2026-07-26',
  'itf-intertex-oporto': '2026-07-26',
  'portojoia-oporto': '2026-07-26',
  'decor-hotel-oporto': '2026-07-26',
  'expometal-batalha': '2026-07-26',
  'stone-iberica-batalha': '2026-07-26',
  'palma-international-boat-show': '2026-07-26',
  'palma-superyacht-village': '2026-07-26',
  'baleart-mallorca': '2026-07-26',
  'stand-oleomaq-zaragoza': '2026-07-26',
  // Granada: tres ferias nuevas de Fermasa (Armilla) incorporadas al catálogo.
  'belmoda-granada': '2026-08-05',
  'sabores-nuestra-tierra-granada': '2026-08-05',
  'feria-pueblos-granada': '2026-08-05',
  'navalia-vigo': '2026-07-26'
};

/** Fecha de última actualización de una ficha de feria, o null si no la tiene. */
export function fairFreshnessFor(slug) {
  return (slug && fairFreshness[slug]) || null;
}
