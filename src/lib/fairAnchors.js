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
  'stand-amb-stuttgart',
  'stand-automatica-munich',
  'stand-bauma-munich',
  'stand-cannes-yachting-festival',
  'stand-eurosatory-paris',
  'stand-fitur-madrid',
  'stand-fruit-attraction-madrid',
  'stand-global-industrie-lyon',
  'stand-hannover-messe',
  'stand-ise-barcelona',
  'stand-jec-world-paris',
  'stand-labelexpo-barcelona',
  'stand-logimat-stuttgart',
  'stand-mapic-cannes',
  'stand-mipim-cannes',
  'stand-mwc-barcelona',
  'stand-piscine-global-lyon',
  'stand-prowein-dusseldorf',
  'stand-seafood-expo-global-barcelona',
  'stand-sirha-lyon',
  'stand-sitevi-montpellier',
  'stand-smart-city-expo-world-congress-barcelona',
  'stand-sommet-elevage-clermont-ferrand',
  'stand-sps-nuremberg',
  'stand-tfwa-cannes',
  'stand-vinitech-sifel-bordeaux',
  'stand-web-summit-lisboa',
  'stand-wine-paris'
]);

export const nationalAnchors = new Set([
  'stand-addit3d-bilbao',
  'stand-aeromart-toulouse',
  'stand-agraria-valladolid',
  'stand-agroglobal-santarem',
  'stand-airspace-world-lisboa',
  'stand-alicante-gastronomica',
  'stand-arcolisboa',
  'stand-arcomadrid',
  'stand-automobile-barcelona',
  'stand-barcelona-wine-week',
  'stands-biemh-bilbao',
  'stand-biocultura-a-coruna',
  'stand-btl-lisboa',
  'stand-cevisama-valencia',
  'stand-cfia-toulouse',
  'stand-cioc-lisboa',
  'stand-concreta-oporto',
  'stand-construmat-barcelona',
  'stand-conxemar-vigo',
  'stand-cosmobeauty-barcelona',
  'stand-des-malaga',
  'stand-emaf-oporto',
  'stand-empack-madrid',
  'stand-empack-oporto',
  'stand-energaia-montpellier',
  'stand-enomaq-zaragoza',
  'stand-equiplast-barcelona',
  'stand-essencia-do-vinho-porto',
  'stand-euromaritime-marseille',
  'stand-expocosmetica-oporto',
  'stand-expodental-madrid',
  'stand-expoliva-jaen',
  'stand-expometal-batalha',
  'stand-expooptica-madrid',
  'stand-expoquimia-barcelona',
  'stand-farmaforum-madrid',
  'stand-feira-nacional-agricultura-santarem',
  'stand-fenavin-match-ciudad-real',
  'stand-feria-internacional-ganadera-zafra',
  'stand-fidma-gijon',
  'stand-figan-zaragoza',
  'stand-fima-zaragoza',
  'stand-fimma-maderalia-valencia',
  'stand-fira-andorra-la-vella',
  'stand-foire-internationale-bordeaux',
  'stand-foire-internationale-marseille',
  'stand-foire-internationale-toulouse',
  'stand-forum-gastronomico-a-coruna',
  'stand-futuralia-lisboa',
  'stand-futurmoda-elche',
  'stand-gastronoma-valencia',
  'stand-genera-madrid',
  'stand-global-industrie-paris',
  'stand-global-mobility-call-madrid',
  'stand-greencities-malaga',
  'stand-habitat-valencia',
  'stand-hispack-barcelona',
  'stand-hostelco-barcelona',
  'stand-ht-malaga',
  'stand-infarma',
  'stand-intergift-madrid',
  'stand-intur-valladolid',
  'stand-madrid-fusion',
  'stand-madrid-tech-show',
  'stand-madridjoya-madrid',
  'stand-maroc-in-mode-mim-casablanca',
  'stand-medfel-perpignan',
  'stand-millesime-bio-montpellier',
  'stand-momad-madrid',
  'stand-morocco-textile-expo-casablanca',
  'stand-motortec-madrid',
  'stand-navalia-vigo',
  'stand-navartur-pamplona',
  'stand-palma-international-boat-show',
  'stand-piscina-wellness-barcelona',
  'stand-pollutec-lyon',
  'stand-portojoia-oporto',
  'stand-prod-pack-lyon',
  'stand-rebuild-madrid',
  'stand-salamaq-salamanca',
  'stand-salon-gourmets-madrid',
  'stand-salon-look-madrid',
  'stand-salon-vins-vignerons-independants-bordeaux',
  'stand-san-diego-comic-con-malaga',
  'stand-savim-marseille',
  'stand-semana-verde-galicia-silleda',
  'stand-siane-toulouse',
  'stand-sil-barcelona',
  'stand-sirha-mediterranee-marseille',
  'stand-smagua-zaragoza',
  'stand-smopyc-zaragoza',
  'stand-solar-storage-live-espana-valencia',
  'stand-subcontratacion-bilbao',
  'stand-tecnovid-zaragoza',
  'stand-tektonica-lisboa',
  'stand-termatalia-ourense',
  'stand-the-district-madrid',
  'stand-trafic-madrid',
  'stand-turexpo-galicia-silleda',
  'stand-world-aviation-festival-lisboa',
  'stand-world-maritime-week-bilbao'
]);

// Peso que aporta ser feria de referencia, para el ranking del calendario sectorial.
export function anchorWeight(slug) {
  if (worldAnchors.has(slug)) return 12;
  if (nationalAnchors.has(slug)) return 5;
  return 0;
}
