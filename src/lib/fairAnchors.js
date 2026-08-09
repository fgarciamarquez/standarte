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
  'stand-alimentaria-barcelona',
  'amb-stuttgart',
  'automatica-munich',
  'bauma-munich',
  'cannes-yachting-festival',
  'eurosatory-paris',
  'fitur-madrid',
  'fruit-attraction-madrid',
  'stand-global-industrie-lyon',
  'hannover-messe',
  'stand-ise-barcelona',
  'jec-world-paris',
  'stand-labelexpo-barcelona',
  'logimat-stuttgart',
  'mapic-cannes',
  'stand-mipim-cannes',
  'stand-mwc-barcelona',
  'stand-piscine-global-lyon',
  'prowein-dusseldorf',
  'stand-seafood-expo-global-barcelona',
  'stand-sirha-lyon',
  'stand-sitevi-montpellier',
  'stand-smart-city-expo-world-congress-barcelona',
  'stand-sommet-elevage-clermont-ferrand',
  'sps-nuremberg',
  'stand-tfwa-cannes',
  'stand-vinitech-sifel-bordeaux',
  'web-summit-lisboa',
  'wine-paris'
]);

export const nationalAnchors = new Set([
  'addit3d-bilbao',
  'aeromart-toulouse',
  'stand-agraria-valladolid',
  'stand-agroglobal-santarem',
  'airspace-world-lisboa',
  'alicante-gastronomica',
  'arcolisboa',
  'arcomadrid',
  'stand-automobile-barcelona',
  'stand-barcelona-wine-week',
  'biemh-bilbao',
  'stand-biocultura-a-coruna',
  'btl-lisboa',
  'cevisama-valencia',
  'cfia-toulouse',
  'cioc-lisboa',
  'stand-concreta-oporto',
  'stand-construmat-barcelona',
  'stand-conxemar-vigo',
  'stand-cosmobeauty-barcelona',
  'des-malaga',
  'stand-emaf-oporto',
  'empack-madrid',
  'stand-empack-oporto',
  'stand-energaia-montpellier',
  'stand-enomaq-zaragoza',
  'stand-equiplast-barcelona',
  'essencia-do-vinho-porto',
  'stand-euromaritime-marseille',
  'expocosmetica-oporto',
  'expodental-madrid',
  'expoliva-jaen',
  'stand-expometal-batalha',
  'stand-expooptica-madrid',
  'stand-expoquimia-barcelona',
  'farmaforum-madrid',
  'feira-nacional-agricultura-santarem',
  'fenavin-match-ciudad-real',
  'stand-feria-internacional-ganadera-zafra',
  'fidma-gijon',
  'stand-figan-zaragoza',
  'fima-zaragoza',
  'stand-fimma-maderalia-valencia',
  'fira-andorra-la-vella',
  'stand-foire-internationale-bordeaux',
  'stand-foire-internationale-marseille',
  'foire-internationale-toulouse',
  'stand-forum-gastronomico-a-coruna',
  'futuralia-lisboa',
  'futurmoda-elche',
  'stand-gastronoma-valencia',
  'genera-madrid',
  'global-industrie-paris',
  'global-mobility-call-madrid',
  'greencities-malaga',
  'stand-habitat-valencia',
  'stand-hispack-barcelona',
  'stand-hostelco-barcelona',
  'ht-malaga',
  'stand-infarma',
  'intergift-madrid',
  'intur-valladolid',
  'madrid-fusion',
  'madrid-tech-show',
  'madridjoya-madrid',
  'stand-maroc-in-mode-mim-casablanca',
  'stand-medfel-perpignan',
  'stand-millesime-bio-montpellier',
  'momad-madrid',
  'stand-morocco-textile-expo-casablanca',
  'motortec-madrid',
  'stand-navalia-vigo',
  'navartur-pamplona',
  'stand-palma-international-boat-show',
  'stand-piscina-wellness-barcelona',
  'stand-pollutec-lyon',
  'stand-portojoia-oporto',
  'stand-prod-pack-lyon',
  'rebuild-madrid',
  'stand-salamaq-salamanca',
  'salon-gourmets-madrid',
  'salon-look-madrid',
  'stand-salon-vins-vignerons-independants-bordeaux',
  'san-diego-comic-con-malaga',
  'stand-savim-marseille',
  'semana-verde-galicia-silleda',
  'siane-toulouse',
  'stand-sil-barcelona',
  'stand-sirha-mediterranee-marseille',
  'stand-smagua-zaragoza',
  'stand-smopyc-zaragoza',
  'solar-storage-live-espana-valencia',
  'subcontratacion-bilbao',
  'stand-tecnovid-zaragoza',
  'tektonica-lisboa',
  'stand-termatalia-ourense',
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
