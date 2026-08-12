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
  zaragoza: '2026-08-10',
  lisboa: '2026-08-07',
  montaje_don_benito: '2026-07-14',
  ciudad_real: '2026-07-14',
  trujillo: '2026-07-14',
  montaje_zafra: '2026-07-14',
  oporto: '2026-08-08',
  vigo: '2026-08-08',
  portugal_sur: '2026-07-14',
  madrid: '2026-08-07',
  bilbao: '2026-08-08',
  malaga: '2026-08-08',
  sevilla: '2026-08-08',
  barcelona: '2026-08-07',
  alicante: '2026-08-12',
  elche: '2026-08-12',
  murcia: '2026-08-12',
  islas_canarias: '2026-08-08',
  islas_de_madeira: '2026-08-08',
  mallorca: '2026-08-12',
  valencia: '2026-08-08',
  coruna: '2026-08-08',
  santiago: '2026-08-08',
  valladolid: '2026-08-12',
  salamanca: '2026-08-12',
  batalha: '2026-08-08',
  santarem: '2026-07-14',
  almeria: '2026-08-12',
  jaen: '2026-08-12',
  huelva: '2026-08-08',
  cordoba: '2026-08-08',
  granada: '2026-08-12',
  cadiz: '2026-08-12',
  silleda: '2026-07-14',
  ourense: '2026-07-14',
  lleida: '2026-07-14',
  girona: '2026-07-14',
  santander: '2026-08-12',
  gijon: '2026-08-12',
  irun: '2026-08-08',
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
  'stand-mwc-barcelona': '2026-07-18',
  'stand-ise-barcelona': '2026-07-18',
  'stand-smart-city-expo-world-congress-barcelona': '2026-07-18',
  'stand-iot-solutions-world-congress-barcelona': '2026-07-18',
  'stand-alimentaria-barcelona': '2026-07-18',
  'stand-hostelco-barcelona': '2026-07-18',
  'stand-barcelona-wine-week': '2026-07-18',
  'stand-seafood-expo-global-barcelona': '2026-07-18',
  'stand-expoquimia-barcelona': '2026-07-18',
  'stand-hispack-barcelona': '2026-07-18',
  'stand-labelexpo-barcelona': '2026-07-25',
  'stand-equiplast-barcelona': '2026-07-18',
  'stand-construmat-barcelona': '2026-07-18',
  'stand-piscina-wellness-barcelona': '2026-07-18',
  'stand-cosmobeauty-barcelona': '2026-07-18',
  'stand-forum-dental-mediterraneo-barcelona': '2026-07-18',
  'stand-sil-barcelona': '2026-07-18',
  'stand-automobile-barcelona': '2026-07-18',
  // Marsella (refuerzo sur de Francia) — clúster de 10 ferias satélite, 2026-07-18.
  'stand-foire-internationale-marseille': '2026-07-18',
  'stand-euromaritime-marseille': '2026-07-18',
  'stand-sirha-mediterranee-marseille': '2026-07-18',
  'stand-beauty-profs-marseille': '2026-07-18',
  'stand-savim-marseille': '2026-07-18',
  'stand-salon-piscine-jardin-marseille': '2026-07-18',
  'stand-solutions-cse-marseille': '2026-07-18',
  'stand-japan-expo-sud-marseille': '2026-07-18',
  'stand-herofestival-marseille': '2026-07-18',
  'stand-siac-marseille': '2026-07-18',
  // Burdeos (Nueva Aquitania) — clúster de 8 ferias satélite, 2026-07-20.
  'stand-foire-internationale-bordeaux': '2026-07-20',
  'stand-vinitech-sifel-bordeaux': '2026-07-20',
  'stand-equitaine-bordeaux': '2026-07-20',
  'stand-salon-agriculture-nouvelle-aquitaine-bordeaux': '2026-07-20',
  'stand-art3f-bordeaux': '2026-07-20',
  'stand-grand-salon-habitat-bordeaux': '2026-07-20',
  'stand-salon-vins-vignerons-independants-bordeaux': '2026-07-20',
  'stand-cycleau-nouvelle-aquitaine-bordeaux': '2026-07-20',
  // Casablanca (Marruecos) — clúster de 15 ferias satélite, 2026-07-22.
  'stand-logismed-casablanca': '2026-07-22',
  'stand-morocco-food-expo-casablanca': '2026-07-22',
  'stand-siema-casablanca': '2026-07-22',
  'stand-siab-casablanca': '2026-07-22',
  'stand-elec-expo-casablanca': '2026-07-22',
  'stand-ener-event-casablanca': '2026-07-22',
  'stand-plast-expo-casablanca': '2026-07-22',
  'stand-pack-expo-casablanca': '2026-07-22',
  'stand-sistep-casablanca': '2026-07-22',
  'stand-imme-casablanca': '2026-07-22',
  'stand-morocco-medical-expo-casablanca': '2026-07-22',
  'stand-morocco-textile-expo-casablanca': '2026-07-22',
  'stand-stitch-tex-casablanca': '2026-07-22',
  'stand-maroc-in-mode-mim-casablanca': '2026-07-22',
  'stand-ctw-china-trade-week-casablanca': '2026-07-22',
  // Rabat (Marruecos) — clúster de 4 ferias satélite (edición/cultura/educación), 2026-07-22.
  'stand-siel-rabat': '2026-07-22',
  'stand-visa-for-music-rabat': '2026-07-22',
  'stand-forum-etudiant-rabat': '2026-07-22',
  'stand-cimqusef-rabat': '2026-07-22',
  'stand-sirha-lyon': '2026-07-22',
  'stand-global-industrie-lyon': '2026-07-22',
  'stand-pollutec-lyon': '2026-07-22',
  'stand-piscine-global-lyon': '2026-07-22',
  'stand-preventica-lyon': '2026-07-22',
  'stand-prod-pack-lyon': '2026-07-22',
  'stand-bepositive-lyon': '2026-07-22',
  'stand-sitevi-montpellier': '2026-07-23',
  'stand-millesime-bio-montpellier': '2026-07-23',
  'stand-sett-montpellier': '2026-07-23',
  'stand-energaia-montpellier': '2026-07-23',
  'stand-siprho-montpellier': '2026-07-23',
  'stand-ais-montpellier': '2026-07-23',
  'stand-agecotel-nice': '2026-07-23',
  'stand-nice-boating-tomorrow': '2026-07-23',
  'stand-ibt-cote-azur': '2026-07-23',
  'stand-entreprenariales-nice': '2026-07-23',
  'stand-solucop-nice': '2026-07-23',
  'stand-mipim-cannes': '2026-07-24',
  'stand-tfwa-cannes': '2026-07-24',
  'stand-alina-bordeaux': '2026-07-24',
  'stand-preventica-bordeaux': '2026-07-24',
  'stand-smahrt-toulouse': '2026-07-24',
  'stand-mountain-planet-grenoble': '2026-07-24',
  'stand-sepem-industries-sud-est-grenoble': '2026-07-24',
  'stand-sommet-elevage-clermont-ferrand': '2026-07-24',
  'stand-smopyc-zaragoza': '2026-07-24',
  'stand-tecnovid-zaragoza': '2026-08-02',

  // Madrid: alta de FIAA (bus y autocar, IFEMA) en el hub.

  'stand-fiaa-madrid': '2026-08-07',
  'stand-smagua-zaragoza': '2026-07-25',
  // Perpiñán — clúster de ferias satélite (MEDFEL prioritaria), 2026-07-21.
  'stand-medfel-perpignan': '2026-07-21',
  'stand-viv-habitat-perpignan': '2026-07-21',
  'stand-tourisme-loisirs-perpignan': '2026-07-21',
  'stand-eco-maison-perpignan': '2026-07-21',
  'stand-retro-mecanic-perpignan': '2026-07-21',
  'stand-salon-mariage-perpignan': '2026-07-21',
  'stand-foire-exposition-perpignan': '2026-07-21',
  // Ferias que estrenan fecha verificada de su próxima edición (2026-07-25). El dato
  // aparece en la respuesta directa de la ficha ("En X (Ciudad - 3-7 sep 2026)…"), así
  // que es contenido nuevo real y toca reindexar.
  'stand-conxemar-vigo': '2026-07-25',
  'stand-navalia-vigo': '2026-07-25',
  'stand-agroglobal-santarem': '2026-07-25',
  'stand-salamaq-salamanca': '2026-07-25',
  'stand-fatacil-lagoa': '2026-07-25',
  'stand-expometal-batalha': '2026-07-25',
  'stand-stone-iberica-batalha': '2026-07-25',
  'stand-forum-gastronomico-a-coruna': '2026-07-25',
  'stand-biocultura-a-coruna': '2026-07-25',
  'stand-fecons-torre-pacheco': '2026-07-25',
  'stand-agraria-valladolid': '2026-07-25',
  'stand-infarma': '2026-07-25',
  'stand-expooptica-madrid': '2026-07-25',
  // Ferias que estrenan ficha propia (antes no tenían cuerpo único, y por eso tampoco
  // aparecían con resumen en el calendario sectorial de otras ferias).
  'stand-figan-zaragoza': '2026-07-25',
  'stand-concreta-oporto': '2026-07-25',
  'stand-enomaq-zaragoza': '2026-07-25',
  // Estrenan fecha verificada de su próxima edición.
  'stand-feria-internacional-ganadera-zafra': '2026-07-25',
  'stand-termatalia-ourense': '2026-07-25',
  // 20 ferias que estrenan ficha propia (antes sin cuerpo único ni resumen en el
  // calendario sectorial de otras ferias).
  'stand-habitat-valencia': '2026-07-26',
  'stand-fimma-maderalia-valencia': '2026-07-26',
  'stand-iberflora-valencia': '2026-07-26',
  'stand-gastronoma-valencia': '2026-07-26',
  'stand-espacio-cocina-sici-valencia': '2026-07-26',
  'stand-eurobrico-valencia': '2026-07-26',
  'stand-textilhogar-valencia': '2026-07-26',
  'stand-emaf-oporto': '2026-07-26',
  'stand-empack-oporto': '2026-07-26',
  'stand-expocarne-oporto': '2026-07-26',
  'stand-itf-intertex-oporto': '2026-07-26',
  'stand-portojoia-oporto': '2026-07-26',
  'stand-decor-hotel-oporto': '2026-07-26',
  'stand-expometal-batalha': '2026-07-26',
  'stand-stone-iberica-batalha': '2026-07-26',
  'stand-palma-international-boat-show': '2026-07-26',
  'stand-palma-superyacht-village': '2026-07-26',
  'stand-baleart-mallorca': '2026-07-26',
  'stand-oleomaq-zaragoza': '2026-07-26',
  // Granada: tres ferias nuevas de Fermasa (Armilla) incorporadas al catálogo.
  'stand-belmoda-granada': '2026-08-05',
  'stand-sabores-nuestra-tierra-granada': '2026-08-05',
  'stand-feria-pueblos-granada': '2026-08-05',
  'stand-navalia-vigo': '2026-07-26'
};

/** Fecha de última actualización de una ficha de feria, o null si no la tiene. */
export function fairFreshnessFor(slug) {
  return (slug && fairFreshness[slug]) || null;
}
