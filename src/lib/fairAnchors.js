// Ferias ANCLA: las citas de referencia de cada sector, en dos niveles.
//
// Sirve para un único fin: cuando el "Calendario de expansión" de una ficha tiene más
// candidatas que huecos, decidir cuáles no pueden faltar. Sin este dato el recorte se
// hacía por mera cercanía en el calendario, y una feria líder mundial podía quedar fuera
// en favor de una cita local que caía antes (ver FairTimeline.svelte).
//
//  - worldAnchors:    referencia mundial o europea del sector. El sector entero va allí.
//  - nationalAnchors: cita de referencia nacional (o del arco ibérico / sur de Francia).
//
// Los dos niveles hacen falta porque una lista plana no distingue SIRHA (Lyon, la feria
// mundial de hostelería) de una cita nacional del mismo sector, y en un grupo con
// decenas de candidatas el desempate por fecha dejaba fuera precisamente a las grandes.
//
// No es una valoración comercial ni afecta a ninguna otra parte del sitio.
//
// Se genera con scripts/build_fair_anchors.cjs, que resuelve los nombres contra
// fairsData.js y aborta si alguno no existe: la lista no puede quedar desincronizada.
export const worldAnchors = new Set([
  'alimentaria-barcelona',
  'amb-stuttgart',
  'automatica-munich',
  'bauma-munich',
  'cannes-yachting-festival',
  'eurosatory-paris',
  'fitur-madrid',
  'fruit-attraction-madrid',
  'global-industrie-lyon',
  'hannover-messe',
  'ise-barcelona',
  'jec-world-paris',
  'labelexpo-barcelona',
  'logimat-stuttgart',
  'mapic-cannes',
  'mipim-cannes',
  'mwc-barcelona',
  'piscine-global-lyon',
  'prowein-dusseldorf',
  'seafood-expo-global-barcelona',
  'sirha-lyon',
  'sitevi-montpellier',
  'smart-city-expo-world-congress-barcelona',
  'sommet-elevage-clermont-ferrand',
  'sps-nuremberg',
  'tfwa-cannes',
  'vinitech-sifel-bordeaux',
  'web-summit-lisboa',
  'wine-paris'
]);

export const nationalAnchors = new Set([
  'addit3d-bilbao',
  'aeromart-toulouse',
  'agraria-valladolid',
  'agroglobal-santarem',
  'airspace-world-lisboa',
  'alicante-gastronomica',
  'arcolisboa',
  'arcomadrid',
  'automobile-barcelona',
  'barcelona-wine-week',
  'biemh-bilbao',
  'biocultura-a-coruna',
  'btl-lisboa',
  'cevisama-valencia',
  'cfia-toulouse',
  'cioc-lisboa',
  'concreta-oporto',
  'construmat-barcelona',
  'conxemar-vigo',
  'cosmobeauty-barcelona',
  'des-malaga',
  'emaf-oporto',
  'empack-madrid',
  'empack-oporto',
  'energaia-montpellier',
  'stand-enomaq-zaragoza',
  'equiplast-barcelona',
  'essencia-do-vinho-porto',
  'euromaritime-marseille',
  'expocosmetica-oporto',
  'expodental-madrid',
  'expoliva-jaen',
  'expometal-batalha',
  'expooptica-madrid',
  'expoquimia-barcelona',
  'farmaforum-madrid',
  'feira-nacional-agricultura-santarem',
  'fenavin-match-ciudad-real',
  'feria-internacional-ganadera-zafra',
  'fidma-gijon',
  'figan-zaragoza',
  'fima-zaragoza',
  'fimma-maderalia-valencia',
  'fira-andorra-la-vella',
  'foire-internationale-bordeaux',
  'foire-internationale-marseille',
  'foire-internationale-toulouse',
  'forum-gastronomico-a-coruna',
  'futuralia-lisboa',
  'futurmoda-elche',
  'gastronoma-valencia',
  'genera-madrid',
  'global-industrie-paris',
  'global-mobility-call-madrid',
  'greencities-malaga',
  'habitat-valencia',
  'hispack-barcelona',
  'hostelco-barcelona',
  'ht-malaga',
  'infarma',
  'intergift-madrid',
  'intur-valladolid',
  'madrid-fusion',
  'madrid-tech-show',
  'madridjoya-madrid',
  'maroc-in-mode-mim-casablanca',
  'medfel-perpignan',
  'millesime-bio-montpellier',
  'momad-madrid',
  'morocco-textile-expo-casablanca',
  'motortec-madrid',
  'navalia-vigo',
  'navartur-pamplona',
  'palma-international-boat-show',
  'piscina-wellness-barcelona',
  'pollutec-lyon',
  'portojoia-oporto',
  'prod-pack-lyon',
  'rebuild-madrid',
  'salamaq-salamanca',
  'salon-gourmets-madrid',
  'salon-look-madrid',
  'salon-vins-vignerons-independants-bordeaux',
  'san-diego-comic-con-malaga',
  'savim-marseille',
  'semana-verde-galicia-silleda',
  'siane-toulouse',
  'sil-barcelona',
  'sirha-mediterranee-marseille',
  'smagua-zaragoza',
  'smopyc-zaragoza',
  'solar-storage-live-espana-valencia',
  'subcontratacion-bilbao',
  'stand-tecnovid-zaragoza',
  'tektonica-lisboa',
  'termatalia-ourense',
  'the-district-madrid',
  'trafic-madrid',
  'turexpo-galicia-silleda',
  'world-aviation-festival-lisboa',
  'world-maritime-week-bilbao'
]);

// Peso que aporta ser feria de referencia, para el ranking del calendario sectorial.
export function anchorWeight(slug) {
  if (worldAnchors.has(slug)) return 12;
  if (nationalAnchors.has(slug)) return 5;
  return 0;
}
