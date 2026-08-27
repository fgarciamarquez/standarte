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
// Clave = sección de `routes` (siteData.js). Valor = fecha ISO (YYYY-MM-DD).
export const seoFreshness = {
  badajoz: '2026-08-27',
  montaje_badajoz: '2026-08-27',
  zaragoza: '2026-08-27',
  lisboa: '2026-08-27',
  montaje_don_benito: '2026-08-27',
  ciudad_real: '2026-08-27',
  trujillo: '2026-08-27',
  montaje_zafra: '2026-08-27',
  oporto: '2026-08-27',
  vigo: '2026-08-27',
  portugal_sur: '2026-08-27',
  madrid: '2026-08-27',
  bilbao: '2026-08-27',
  malaga: '2026-08-27',
  sevilla: '2026-08-27',
  barcelona: '2026-08-27',
  alicante: '2026-08-27',
  elche: '2026-08-27',
  murcia: '2026-08-27',
  islas_canarias: '2026-08-27',
  islas_de_madeira: '2026-08-27',
  mallorca: '2026-08-27',
  valencia: '2026-08-27',
  coruna: '2026-08-27',
  santiago: '2026-08-27',
  valladolid: '2026-08-27',
  salamanca: '2026-08-27',
  batalha: '2026-08-27',
  santarem: '2026-08-27',
  almeria: '2026-08-27',
  jaen: '2026-08-27',
  huelva: '2026-08-27',
  cordoba: '2026-08-27',
  granada: '2026-08-27',
  cadiz: '2026-08-27',
  silleda: '2026-08-27',
  ourense: '2026-08-27',
  lleida: '2026-08-27',
  girona: '2026-08-27',
  santander: '2026-08-27',
  gijon: '2026-08-27',
  irun: '2026-08-27',
  logrono: '2026-08-27',
  pamplona: '2026-08-27',
  vitoria: '2026-08-27',
  aranda: '2026-08-27',
  regua: '2026-08-27',
  ibiza: '2026-08-27',
  menorca: '2026-08-27',
  ceuta: '2026-08-27',
  melilla: '2026-08-27',
  tanger: '2026-08-27',
  andorra: '2026-08-27',
  teruel: '2026-08-27',
  marsella: '2026-08-27',
  cannes: '2026-08-27',
  avignon: '2026-08-27',
  toulouse: '2026-08-27',
  perpignan: '2026-08-27',
  burdeos: '2026-08-27',
  casablanca: '2026-08-27',
  rabat: '2026-08-27',
  lyon: '2026-08-27',
  montpellier: '2026-08-27',
  niza: '2026-08-27',
  grenoble: '2026-08-27',
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
export const fairFreshness = {
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
  'stands-figan-zaragoza': '2026-08-27',
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
