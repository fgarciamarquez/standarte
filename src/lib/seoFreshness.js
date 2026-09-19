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
// 2026-08-27: patrón de reincidencia en TODAS las páginas de ciudad y feria — los H2
// de apartado pasan a '{expresión objetivo}: {parte}' y las ciudades suman 3 imágenes
// keyword por apartado. Cambio real y visible: se actualiza la fecha de las afectadas.
//
// REGLA PERMANENTE (indicación del 2026-08-28): SIEMPRE que un cambio altere lo que
// el visitante ve en un grupo de páginas, hay que actualizar aquí su fecha de frescura
// en la misma tanda. La señal debe ser veraz: se toca a mano, nunca en cada build.
//
// 2026-08-28: retirada del botón "Actividades" del trío del hero en todas las páginas
// de ciudad (ambas marcas). Cambio visible: se actualiza la fecha de las afectadas.
//
// 2026-09-05: la paralela de Oporto suma versión PORTUGUESA propia (no traducida) y
// la página de ciudad de Oporto en pt gana el enlace contextual hacia ella. Cambio
// visible en ambas: se actualiza su fecha.
//
// 2026-09-10: en portugués, H1 y H2 de las plazas con artículo pasan de «em Porto» a
// «no Porto» (y «no sul de Portugal», «na Madeira», «nas Ilhas Canárias»). Cambio
// visible en esas cuatro: se actualiza su fecha.
//
// Clave = sección de `routes` (siteData.js). Valor = fecha ISO (YYYY-MM-DD).
export const seoFreshness = {
  // Páginas paralelas de "constructor de stands" (alta: 2026-08-31).
  // 2026-09-11: todas incorporan el buscador de ferias bajo la ficha de datos.
  constructor_stand_zaragoza: '2026-09-11',
  constructor_stand_figan: '2026-09-16',   // URL propia /constructor_stand_figan (antes bajo /ferias/)
  constructor_stand_smopyc: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_smagua: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_aratur: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_expofimer: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_spaper: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_fima: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_enomaq: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_oleomaq: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_tecnovid: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_salon_vinos_aragon: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_enoforum: '2026-09-19',   // alta de la paralela de feria (19/09/2026)
  constructor_stand_agroexpo: '2026-09-11',
  constructor_stand_biemh: '2026-09-11',
  constructor_stand_madrid: '2026-09-11',
  constructor_stand_barcelona: '2026-09-11',
  constructor_stand_oporto: '2026-09-11',   // + versión portuguesa
  constructor_stand_lisboa: '2026-09-11',   // + versión portuguesa y «Lisbon» en la ficha inglesa
  constructor_stand_bilbao: '2026-09-11',
  constructor_stand_badajoz: '2026-09-11',
  constructor_stand_don_benito: '2026-09-11',
  constructor_stand_malaga: '2026-09-11',   // alta
  constructor_stand_sevilla: '2026-09-12',  // alta
  constructor_stand_valencia: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_valladolid: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_alicante: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_elche: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_murcia: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_salamanca: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_coruna: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_santiago: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_vigo: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_ourense: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_silleda: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_gijon: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_santander: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_irun: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_vitoria: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_pamplona: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_logrono: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_lleida: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_girona: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_mallorca: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_ibiza: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_menorca: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_islas_canarias: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_ceuta: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_melilla: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_tanger: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_casablanca: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_rabat: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_andorra: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_teruel: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_aranda: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_ciudad_real: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_zafra: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_merida: '2026-09-16',  // alta (sin página principal propia)
  constructor_stand_almendralejo: '2026-09-16',  // alta (sin página principal propia)
  constructor_stand_trujillo: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_almeria: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_jaen: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_huelva: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_cordoba: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_granada: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_cadiz: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_marsella: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_cannes: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_avignon: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_toulouse: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_burdeos: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_lyon: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_grenoble: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_clermont_ferrand: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_niza: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_montpellier: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_perpignan: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_batalha: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_santarem: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_regua: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_portugal_sur: '2026-09-15',  // alta (tanda de 56 paralelas)
  constructor_stand_islas_de_madeira: '2026-09-15',  // alta (tanda de 56 paralelas)
  // La portada no tenía fecha propia pese a cambiar de contenido (buscador, secciones).
  // 2026-08-28: el buscador acepta también actividades y sirve sus hubs.
  home: '2026-09-18',   // portada sin galería ni equipo (18/09/2026)
  badajoz: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  montaje_badajoz: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  zaragoza: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  lisboa: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  montaje_don_benito: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  ciudad_real: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  trujillo: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  montaje_zafra: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  oporto: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  vigo: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  portugal_sur: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  madrid: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  bilbao: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  malaga: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  sevilla: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  barcelona: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  alicante: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  elche: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  murcia: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  islas_canarias: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  islas_de_madeira: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  mallorca: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  valencia: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  coruna: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  santiago: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  valladolid: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  salamanca: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  batalha: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  santarem: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  almeria: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  jaen: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  huelva: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  cordoba: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  granada: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  cadiz: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  silleda: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  ourense: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  lleida: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  girona: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  santander: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  gijon: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  irun: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  san_sebastian: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  logrono: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  pamplona: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  vitoria: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  aranda: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  regua: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  ibiza: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  menorca: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  ceuta: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  melilla: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  tanger: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  andorra: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  teruel: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  marsella: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  cannes: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  avignon: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  toulouse: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  perpignan: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  burdeos: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  casablanca: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  rabat: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  lyon: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  montpellier: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  niza: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  grenoble: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
  clermont_ferrand: '2026-09-18',   // web sin imágenes y URL nueva (18/09/2026)
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
// Frescura de las páginas de actividad (/actividad y /actividad/<tag>). Hasta el
// 2026-08-28 no emitían lastmod: el sitemap las daba sin fecha pese a cambiar de
// contenido. Se actualiza a mano, como el resto, cuando cambia lo que se ve.
//   2026-08-28: acción + sujeto ("Standarte diseña y construye stands para el sector
//   de X") al frente de cada hub y H2 "Stand para …" en el índice.
export const activityFreshness = '2026-08-28';

export const fairFreshness = {
  'stands-fima-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-salon-vinos-aragon-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-enoforum-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-anecorm-valencia': '2026-09-02',
  'stands-agroexpo': '2026-09-06',
  'stands-talent-land-malaga': '2026-08-31',
  'stands-transfiere-malaga': '2026-09-11',
  'stand-fireca-sevilla': '2026-09-12',   // sector y etiquetas reales, fecha 2027
  'stands-sicab-sevilla': '2026-09-12',
  'stands-simof-sevilla': '2026-09-12',
  'stands-salon-motor-sevilla': '2026-09-12',
  'stands-natura-malaga': '2026-09-11',
  'stands-motor-malaga': '2026-09-11',
  'stands-modtissimo-oporto': '2026-08-31',
  'stands-qualifica-oporto': '2026-08-31',
  'stands-gift-paper-oporto': '2026-08-31',
  'stands-tecnipao-oporto': '2026-08-31',
  'stands-matelec-madrid': '2026-09-12',
  'stands-sima-madrid': '2026-09-12',
  'stands-expodentaria-lisboa': '2026-09-12',
  'stands-inprojecta-oporto': '2026-09-12',
  'stands-maquishoes-oporto': '2026-09-12',
  'stands-intersicop-madrid': '2026-09-15',
  'stands-fildecor-lisboa': '2026-09-15',
  'stands-portugal-print-oporto': '2026-09-15',
  // Barcelona (Plaza Prioritaria) — clúster de 17 ferias satélite refrescado 2026-07-18.
  'stand-mwc-barcelona': '2026-08-27',
  'stand-ise-barcelona': '2026-08-27',
  'stand-smart-city-expo-world-congress-barcelona': '2026-08-27',
  'stand-iot-solutions-world-congress-barcelona': '2026-08-27',
  'stand-alimentaria-barcelona': '2026-08-27',
  'stand-hostelco-barcelona': '2026-08-27',
  'stand-barcelona-wine-week': '2026-08-27',
  'stand-seafood-expo-global-barcelona': '2026-08-27',
  'stand-expoquimia-barcelona': '2026-08-27',
  'stand-hispack-barcelona': '2026-08-27',
  'stand-labelexpo-barcelona': '2026-08-27',
  'stand-equiplast-barcelona': '2026-08-27',
  'stand-construmat-barcelona': '2026-08-27',
  'stand-piscina-wellness-barcelona': '2026-08-27',
  'stand-cosmobeauty-barcelona': '2026-08-27',
  'stand-forum-dental-mediterraneo-barcelona': '2026-08-27',
  'stand-sil-barcelona': '2026-08-27',
  'stand-automobile-barcelona': '2026-08-27',
  // Marsella (refuerzo sur de Francia) — clúster de 10 ferias satélite, 2026-07-18.
  'stand-foire-internationale-marseille': '2026-08-27',
  'stand-euromaritime-marseille': '2026-08-27',
  'stand-sirha-mediterranee-marseille': '2026-08-27',
  'stand-beauty-profs-marseille': '2026-08-27',
  'stand-savim-marseille': '2026-08-27',
  'stand-salon-piscine-jardin-marseille': '2026-08-27',
  'stand-solutions-cse-marseille': '2026-08-27',
  'stand-japan-expo-sud-marseille': '2026-08-27',
  'stand-herofestival-marseille': '2026-08-27',
  'stand-siac-marseille': '2026-08-27',
  // Burdeos (Nueva Aquitania) — clúster de 8 ferias satélite, 2026-07-20.
  'stand-foire-internationale-bordeaux': '2026-08-27',
  'stand-vinitech-sifel-bordeaux': '2026-08-27',
  'stand-equitaine-bordeaux': '2026-08-27',
  'stand-salon-agriculture-nouvelle-aquitaine-bordeaux': '2026-08-27',
  'stand-art3f-bordeaux': '2026-08-27',
  'stand-grand-salon-habitat-bordeaux': '2026-08-27',
  'stand-salon-vins-vignerons-independants-bordeaux': '2026-08-27',
  'stand-cycleau-nouvelle-aquitaine-bordeaux': '2026-08-27',
  // Casablanca (Marruecos) — clúster de 15 ferias satélite, 2026-07-22.
  'stand-logismed-casablanca': '2026-08-27',
  'stand-morocco-food-expo-casablanca': '2026-08-27',
  'stand-siema-casablanca': '2026-08-27',
  'stand-siab-casablanca': '2026-08-27',
  'stand-elec-expo-casablanca': '2026-08-27',
  'stand-ener-event-casablanca': '2026-08-27',
  'stand-plast-expo-casablanca': '2026-08-27',
  'stand-pack-expo-casablanca': '2026-08-27',
  'stand-sistep-casablanca': '2026-08-27',
  'stand-imme-casablanca': '2026-08-27',
  'stand-morocco-medical-expo-casablanca': '2026-08-27',
  'stand-morocco-textile-expo-casablanca': '2026-08-27',
  'stand-stitch-tex-casablanca': '2026-08-27',
  'stand-maroc-in-mode-mim-casablanca': '2026-08-27',
  'stand-ctw-china-trade-week-casablanca': '2026-08-27',
  // Rabat (Marruecos) — clúster de 4 ferias satélite (edición/cultura/educación), 2026-07-22.
  'stand-siel-rabat': '2026-08-27',
  'stand-visa-for-music-rabat': '2026-08-27',
  'stand-forum-etudiant-rabat': '2026-08-27',
  'stand-cimqusef-rabat': '2026-08-27',
  'stand-sirha-lyon': '2026-08-27',
  'stand-global-industrie-lyon': '2026-08-27',
  'stand-pollutec-lyon': '2026-08-27',
  'stand-piscine-global-lyon': '2026-08-27',
  'stand-preventica-lyon': '2026-08-27',
  'stand-prod-pack-lyon': '2026-08-27',
  'stand-bepositive-lyon': '2026-08-27',
  'stand-sitevi-montpellier': '2026-08-27',
  'stand-millesime-bio-montpellier': '2026-08-27',
  'stand-sett-montpellier': '2026-08-27',
  'stand-energaia-montpellier': '2026-08-27',
  'stand-siprho-montpellier': '2026-08-27',
  'stand-ais-montpellier': '2026-08-27',
  'stand-agecotel-nice': '2026-08-27',
  'stand-nice-boating-tomorrow': '2026-08-27',
  'stand-ibt-cote-azur': '2026-08-27',
  'stand-entreprenariales-nice': '2026-08-27',
  'stand-solucop-nice': '2026-08-27',
  'stand-mipim-cannes': '2026-08-27',
  'stand-tfwa-cannes': '2026-08-27',
  'stand-alina-bordeaux': '2026-08-27',
  'stand-preventica-bordeaux': '2026-08-27',
  'stand-smahrt-toulouse': '2026-08-27',
  'stand-mountain-planet-grenoble': '2026-08-27',
  'stand-sepem-industries-sud-est-grenoble': '2026-08-27',
  'stand-sommet-elevage-clermont-ferrand': '2026-08-27',
  'stands-smopyc-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-tecnovid-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)

  // Madrid: alta de FIAA (bus y autocar, IFEMA) en el hub.

  'stand-fiaa-madrid': '2026-08-27',
  'stand-hygienalia-madrid': '2026-08-27',
  'stand-cascais-international-health-forum': '2026-08-27',
  'stands-expofimer-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-spaper-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stand-ferroforma-bilbao': '2026-08-27',
  'stand-sinaval-bilbao': '2026-08-27',
  'stand-eurofishing-bilbao': '2026-08-27',
  'stand-pick-pack-bilbao': '2026-08-27',
  'stand-futureport-bilbao': '2026-08-27',
  'stand-steel-tech-bilbao': '2026-08-27',
  'stand-expovacaciones-bilbao': '2026-08-27',
  'stand-egurtek-bilbao': '2026-08-27',
  'stand-plus-industry-bilbao': '2026-08-27',
  'stand-wear-bilbao': '2026-08-27',
  'stand-canagua-energia-gran-canaria': '2026-08-27',
  'stand-mmh-sevilla': '2026-08-27',
  'stand-advanced-manufacturing-madrid': '2026-08-27',
  'stand-hip-madrid': '2026-08-27',
  'stand-meat-attraction-madrid': '2026-08-27',
  'stand-sicur-madrid': '2026-08-27',
  'stand-lisboa-games-week': '2026-08-27',
  'stand-nauticampo-lisboa': '2026-08-27',
  'stand-f4f-expo-foodtech-bilbao': '2026-08-27',
  'stand-gustoko-bilbao': '2026-08-27',
  'stand-interior-exterior-design-meetings-cannes': '2026-08-27',
  'stands-aratur-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stand-femoga-sarinena': '2026-08-27',
  'stand-ferma-barbastro': '2026-08-27',
  'stand-fine-valladolid': '2026-08-27',
  'stand-technology-show-valladolid': '2026-08-27',
  'stand-sbc-summit-lisboa': '2026-08-27',
  'stands-smagua-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  // Perpiñán — clúster de ferias satélite (MEDFEL prioritaria), 2026-07-21.
  'stand-medfel-perpignan': '2026-08-27',
  'stand-viv-habitat-perpignan': '2026-08-27',
  'stand-tourisme-loisirs-perpignan': '2026-08-27',
  'stand-eco-maison-perpignan': '2026-08-27',
  'stand-retro-mecanic-perpignan': '2026-08-27',
  'stand-salon-mariage-perpignan': '2026-08-27',
  'stand-foire-exposition-perpignan': '2026-08-27',
  // Ferias que estrenan fecha verificada de su próxima edición (2026-07-25). El dato
  // aparece en la respuesta directa de la ficha ("En X (Ciudad - 3-7 sep 2026)…"), así
  // que es contenido nuevo real y toca reindexar.
  'stand-conxemar-vigo': '2026-08-27',
  'stand-navalia-vigo': '2026-08-27',
  'stand-agroglobal-santarem': '2026-08-27',
  'stand-salamaq-salamanca': '2026-08-27',
  'stand-fatacil-lagoa': '2026-08-27',
  'stand-expometal-batalha': '2026-08-27',
  'stand-stone-iberica-batalha': '2026-08-27',
  'stand-forum-gastronomico-a-coruna': '2026-08-27',
  'stand-biocultura-a-coruna': '2026-08-27',
  'stand-fecons-torre-pacheco': '2026-08-27',
  'stand-agraria-valladolid': '2026-08-27',
  'stand-infarma': '2026-08-27',
  'stand-expooptica-madrid': '2026-08-27',
  // Ferias que estrenan ficha propia (antes no tenían cuerpo único, y por eso tampoco
  // aparecían con resumen en el calendario sectorial de otras ferias).
  'stands-figan-feria-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  'stands-biemh-bilbao-bec': '2026-09-18',   // URL nueva (18/09/2026)
  'stand-concreta-oporto': '2026-08-27',
  'stands-enomaq-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  // Estrenan fecha verificada de su próxima edición.
  'stand-feria-internacional-ganadera-zafra': '2026-08-27',
  'stand-termatalia-ourense': '2026-08-27',
  // 20 ferias que estrenan ficha propia (antes sin cuerpo único ni resumen en el
  // calendario sectorial de otras ferias).
  'stand-habitat-valencia': '2026-08-27',
  'stand-fimma-maderalia-valencia': '2026-08-27',
  'stand-iberflora-valencia': '2026-08-27',
  'stand-gastronoma-valencia': '2026-08-27',
  'stand-espacio-cocina-sici-valencia': '2026-08-27',
  'stand-eurobrico-valencia': '2026-08-27',
  'stand-textilhogar-valencia': '2026-08-27',
  'stand-emaf-oporto': '2026-08-27',
  'stand-empack-oporto': '2026-08-27',
  'stand-expocarne-oporto': '2026-08-27',
  'stand-itf-intertex-oporto': '2026-08-27',
  'stand-portojoia-oporto': '2026-08-27',
  'stand-decor-hotel-oporto': '2026-08-27',
  'stand-expometal-batalha': '2026-08-27',
  'stand-stone-iberica-batalha': '2026-08-27',
  'stand-palma-international-boat-show': '2026-08-27',
  'stand-palma-superyacht-village': '2026-08-27',
  'stand-baleart-mallorca': '2026-08-27',
  'stands-oleomaq-zaragoza': '2026-09-19',   // URL nueva (19/09/2026)
  // Granada: tres ferias nuevas de Fermasa (Armilla) incorporadas al catálogo.
  'stand-belmoda-granada': '2026-08-27',
  'stand-sabores-nuestra-tierra-granada': '2026-08-27',
  'stand-feria-pueblos-granada': '2026-08-27',
  'stand-navalia-vigo': '2026-08-27'
};

/** Fecha de última actualización de una ficha de feria, o null si no la tiene. */
export function fairFreshnessFor(slug) {
  return (slug && fairFreshness[slug]) || null;
}
