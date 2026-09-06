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
// Clave = sección de `routes` (siteData.js). Valor = fecha ISO (YYYY-MM-DD).
export const seoFreshness = {
  // Páginas paralelas de "constructor de stands" (alta: 2026-08-31).
  constructor_stand_zaragoza: '2026-08-31',
  constructor_stand_figan: '2026-09-06',
  constructor_stand_agroexpo: '2026-09-06',
  constructor_stand_biemh: '2026-09-06',
  constructor_stand_madrid: '2026-08-31',
  constructor_stand_barcelona: '2026-08-31',
  constructor_stand_oporto: '2026-09-05',   // + versión portuguesa
  constructor_stand_lisboa: '2026-08-31',
  constructor_stand_bilbao: '2026-08-31',
  constructor_stand_badajoz: '2026-08-31',
  constructor_stand_don_benito: '2026-08-31',
  // La portada no tenía fecha propia pese a cambiar de contenido (buscador, secciones).
  // 2026-08-28: el buscador acepta también actividades y sirve sus hubs.
  home: '2026-08-28',
  badajoz: '2026-08-28',
  montaje_badajoz: '2026-08-28',
  zaragoza: '2026-08-28',
  lisboa: '2026-08-28',
  montaje_don_benito: '2026-08-28',
  ciudad_real: '2026-08-28',
  trujillo: '2026-08-28',
  montaje_zafra: '2026-08-28',
  oporto: '2026-09-05',   // enlace a la paralela portuguesa
  vigo: '2026-08-28',
  portugal_sur: '2026-08-28',
  madrid: '2026-08-28',
  bilbao: '2026-08-28',
  malaga: '2026-08-31',
  sevilla: '2026-08-28',
  barcelona: '2026-08-28',
  alicante: '2026-08-28',
  elche: '2026-08-28',
  murcia: '2026-08-28',
  islas_canarias: '2026-08-28',
  islas_de_madeira: '2026-08-28',
  mallorca: '2026-08-28',
  valencia: '2026-09-02',
  coruna: '2026-08-28',
  santiago: '2026-08-28',
  valladolid: '2026-08-28',
  salamanca: '2026-08-28',
  batalha: '2026-08-28',
  santarem: '2026-08-28',
  almeria: '2026-08-28',
  jaen: '2026-08-28',
  huelva: '2026-08-28',
  cordoba: '2026-08-28',
  granada: '2026-08-28',
  cadiz: '2026-08-28',
  silleda: '2026-08-28',
  ourense: '2026-08-28',
  lleida: '2026-08-28',
  girona: '2026-08-28',
  santander: '2026-08-28',
  gijon: '2026-08-28',
  irun: '2026-08-28',
  logrono: '2026-08-28',
  pamplona: '2026-08-28',
  vitoria: '2026-08-28',
  aranda: '2026-08-28',
  regua: '2026-08-28',
  ibiza: '2026-08-28',
  menorca: '2026-08-28',
  ceuta: '2026-08-28',
  melilla: '2026-08-28',
  tanger: '2026-08-28',
  andorra: '2026-08-28',
  teruel: '2026-08-28',
  marsella: '2026-08-28',
  cannes: '2026-08-28',
  avignon: '2026-08-28',
  toulouse: '2026-08-28',
  perpignan: '2026-08-28',
  burdeos: '2026-08-28',
  casablanca: '2026-08-28',
  rabat: '2026-08-28',
  lyon: '2026-08-28',
  montpellier: '2026-08-28',
  niza: '2026-08-28',
  grenoble: '2026-08-28',
  clermont_ferrand: '2026-08-12'
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
  'stands-anecorm-valencia': '2026-09-02',
  'stands-agroexpo': '2026-09-06',
  'stands-talent-land-malaga': '2026-08-31',
  'stands-modtissimo-oporto': '2026-08-31',
  'stands-qualifica-oporto': '2026-08-31',
  'stands-gift-paper-oporto': '2026-08-31',
  'stands-tecnipao-oporto': '2026-08-31',
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
  'stand-smopyc-zaragoza': '2026-08-27',
  'stand-tecnovid-zaragoza': '2026-08-27',

  // Madrid: alta de FIAA (bus y autocar, IFEMA) en el hub.

  'stand-fiaa-madrid': '2026-08-27',
  'stand-hygienalia-madrid': '2026-08-27',
  'stand-cascais-international-health-forum': '2026-08-27',
  'stand-expofimer-zaragoza': '2026-08-27',
  'stand-spaper-zaragoza': '2026-08-27',
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
  'stand-aratur-zaragoza': '2026-08-27',
  'stand-femoga-sarinena': '2026-08-27',
  'stand-ferma-barbastro': '2026-08-27',
  'stand-fine-valladolid': '2026-08-27',
  'stand-technology-show-valladolid': '2026-08-27',
  'stand-sbc-summit-lisboa': '2026-08-27',
  'stand-smagua-zaragoza': '2026-08-27',
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
  'stands-figan-zaragoza': '2026-09-06',
  'stands-biemh-bilbao': '2026-09-06',   // + enlace a su paralela de constructor
  'stand-concreta-oporto': '2026-08-27',
  'stand-enomaq-zaragoza': '2026-08-27',
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
  'stand-oleomaq-zaragoza': '2026-08-27',
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
