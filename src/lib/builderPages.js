// Páginas paralelas de "constructor de stands" (defensa ante denuncias falsas).
//
// POR QUÉ EXISTEN (2026-08-31): la competencia denuncia falsamente las páginas de
// ciudad y, mientras Google resuelve, el posicionamiento se resiente. Estas páginas
// son un activo de reserva YA POSICIONADO: si la principal cae, el tráfico de la
// plaza no se pierde.
//
// CÓMO SE EVITA LA CANIBALIZACIÓN (importante): NO son un clon de la página de
// ciudad. Atacan una búsqueda distinta —"constructor de stands en X" frente a
// "diseño y montaje de stands en X"— con contenido propio centrado en la
// CONSTRUCCIÓN (taller, carpintería, materiales, producción). Dos páginas legítimas
// con intención distinta conviven sin competir; dos clones se destruyen entre sí y
// arriesgan una acción manual por doorway pages.
//
// INTERRUPTOR: `indexable` controla el <meta robots> de cada página.
//   - true  → indexable (por defecto): construye autoridad desde hoy.
//   - false → noindex,follow: se aparca sin borrarla, si Search Console mostrara
//             canibalización con la página de ciudad.
// En una emergencia (denuncia que tumbe la principal), en static/.htaccess están
// preparadas —comentadas— las 301 que envían la URL principal a su alternativa.
// 17/09/2026: el lote de 58 paralelas publicado el 15/09 (y Mérida/Almendralejo del
// 16/09) queda APARCADO (indexable: false): salieron de golpe, con un 60 % de frases
// de plantilla compartidas, y al día siguiente las principales de varias plazas
// perdieron su posición. Siguen vivas y enlazadas (noindex, follow) y fuera del
// sitemap. Solo mantienen indexación las 13 paralelas anteriores al 31/08–11/09
// (Zaragoza, Madrid, Barcelona, Oporto, Lisboa, Bilbao, Badajoz, Don Benito, Málaga,
// Sevilla, FIGAN, Agroexpo, BIEMH). Reactivar de una en una y con texto propio.
// `venue`, `workshop` y `cityNames` alimentan la FICHA DE DATOS (server/builderFacts.js):
// el recinto de la plaza y desde dónde fabricamos. Son hechos nuestros —taller y
// distancia real—, no datos copiados de un calendario ajeno. `cityNames` solo hace
// falta cuando la ciudad se escribe distinto en otro idioma (Oporto → Porto).
export const builderPages = {
  constructor_stand_zaragoza:   { city: 'zaragoza',    cityName: 'Zaragoza',   venue: 'Feria de Zaragoza',            workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_madrid:     { city: 'madrid',      cityName: 'Madrid',     venue: 'IFEMA Madrid',                 workshop: { es: 'San Fernando de Henares, a ~10 km de IFEMA', en: 'San Fernando de Henares, ~10 km from IFEMA' }, indexable: true },
  constructor_stand_barcelona:  { city: 'barcelona',   cityName: 'Barcelona',  venue: 'Fira de Barcelona (Gran Via y Montjuïc)', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_oporto:     { city: 'oporto',      cityName: 'Oporto',     cityNames: { en: 'Porto', pt: 'Porto' }, venue: 'Exponor (Feira Internacional do Porto)',  workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop', pt: 'Oficina própria da Standarte' }, indexable: true },
  constructor_stand_lisboa:     { city: 'lisboa',      cityName: 'Lisboa',     cityNames: { en: 'Lisbon' }, venue: 'FIL — Feira Internacional de Lisboa',     workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop', pt: 'Oficina própria da Standarte' }, indexable: true },
  constructor_stand_bilbao:     { city: 'bilbao',      cityName: 'Bilbao',     venue: 'BEC — Bilbao Exhibition Centre',          workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_badajoz:    { city: 'badajoz',     cityName: 'Badajoz',    venue: 'IFEBA — Institución Ferial de Badajoz',   workshop: { es: 'Cáceres, a menos de 1 h de Badajoz', en: 'Cáceres, under 1 h from Badajoz' }, indexable: true },
  constructor_stand_don_benito: { city: 'montaje_don_benito', cityName: 'Don Benito', venue: 'FEVAL (Don Benito)',               workshop: { es: 'Cáceres, a menos de 1 h del recinto', en: 'Cáceres, under 1 h from the venue' }, indexable: true },
  // Málaga (2026-09-11): la página de plaza ya es Oro en es/en; la paralela ataca «constructor
  // de stands en Málaga» y cubre FYCMA, donde conviven ferias y congresos de ventana corta.
  constructor_stand_malaga:     { city: 'malaga',      cityName: 'Málaga',     venue: 'FYCMA — Palacio de Ferias y Congresos de Málaga', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  // Sevilla (2026-09-12): FIBES, tres pabellones diáfanos con arquetas cada 8 m; calendario mixto
  // de ferias de gran público (SICAB, SIMOF, Motor) y profesionales (Fireca, MMH, TIS).
  constructor_stand_sevilla:    { city: 'sevilla',     cityName: 'Sevilla',    cityNames: { en: 'Seville' }, venue: 'FIBES — Palacio de Exposiciones y Congresos de Sevilla', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  // Tanda 15/09/2026: paralela para TODAS las plazas restantes (56). Las principales siguen
  // vivas: compiten las dos, cada una con su intención (diseño y montaje / construcción).
  constructor_stand_valencia: { city: "valencia", cityName: "Valencia", cityNames: {"pt": "Valência"}, venue: "Feria Valencia", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_valladolid: { city: "valladolid", cityName: "Valladolid", venue: "Feria de Valladolid", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_alicante: { city: "alicante", cityName: "Alicante", venue: "IFA – Institución Ferial Alicantina (Elche)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_elche: { city: "elche", cityName: "Elche", venue: "IFA – Institución Ferial Alicantina", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_murcia: { city: "murcia", cityName: "Murcia", cityNames: {"pt": "Múrcia"}, venue: "IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_salamanca: { city: "salamanca", cityName: "Salamanca", venue: "Recinto Ferial de Salamanca", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_coruna: { city: "coruna", cityName: "A Coru\u00f1a", venue: "ExpoCoruña y Palexco", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_santiago: { city: "santiago", cityName: "Santiago de Compostela", venue: "Palacio de Congresos e Exposicións de Galicia", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_vigo: { city: "vigo", cityName: "Vigo", venue: "IFEVI – Instituto Ferial de Vigo", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_ourense: { city: "ourense", cityName: "Ourense", venue: "Expourense", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_silleda: { city: "silleda", cityName: "Silleda", venue: "Feira Internacional de Galicia ABANCA", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_gijon: { city: "gijon", cityName: "Gij\u00f3n", venue: "Recinto Ferial Luis Adaro", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_santander: { city: "santander", cityName: "Santander", venue: "Palacio de Exposiciones y Congresos de Santander", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_irun: { city: "irun", cityName: "Ir\u00fan", venue: "Ficoba – Feria de Muestras de Gipuzkoa", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_vitoria: { city: "vitoria", cityName: "Vitoria", cityNames: {"pt": "Vitória"}, venue: "Palacio de Congresos Europa y recintos de Álava", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_pamplona: { city: "pamplona", cityName: "Pamplona", venue: "Baluarte y recintos feriales de Navarra", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_logrono: { city: "logrono", cityName: "Logro\u00f1o", venue: "Riojaforum y recintos feriales de La Rioja", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_lleida: { city: "lleida", cityName: "Lleida", venue: "Fira de Lleida", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_girona: { city: "girona", cityName: "Girona", venue: "Fira de Girona", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_mallorca: { city: "mallorca", cityName: "Mallorca", cityNames: {"pt": "Maiorca"}, venue: "Palau de Congressos de Palma y Moll Vell", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_ibiza: { city: "ibiza", cityName: "Ibiza", venue: "Recinto Ferial de Ibiza", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_menorca: { city: "menorca", cityName: "Menorca", venue: "Recintos feriales de Menorca", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_islas_canarias: { city: "islas_canarias", cityName: "Islas Canarias", cityNames: {"en": "Canary Islands", "pt": "Ilhas Canárias"}, venue: "Recinto Ferial de Tenerife e Infecar (Gran Canaria)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_ceuta: { city: "ceuta", cityName: "Ceuta", venue: "Palacio de Congresos de Ceuta", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_melilla: { city: "melilla", cityName: "Melilla", venue: "Palacio de Exposiciones y Congresos de Melilla", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_tanger: { city: "tanger", cityName: "T\u00e1nger", cityNames: {"en": "Tangier", "pt": "Tânger"}, venue: "Recintos feriales de Tánger y Tanger Med", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_casablanca: { city: "casablanca", cityName: "Casablanca", venue: "Parc d’Exposition de l’OFEC (Casablanca)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_rabat: { city: "rabat", cityName: "Rabat", venue: "Recintos de ferias y congresos de Rabat", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_andorra: { city: "andorra", cityName: "Andorra la Vella", cityNames: {"en": "Andorra", "pt": "Andorra"}, venue: "Centre de Congressos d’Andorra la Vella y recintos del Principado", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_teruel: { city: "teruel", cityName: "Teruel", venue: "Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_aranda: { city: "aranda", cityName: "Aranda de Duero", venue: "Recinto Ferial de Aranda de Duero", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_ciudad_real: { city: "ciudad_real", cityName: "Ciudad Real", venue: "Pabellón Ferial de Ciudad Real (IFEDI)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_zafra: { city: "montaje_zafra", cityName: "Zafra", venue: "Recinto Ferial de Zafra", workshop: {"es": "Cáceres, a menos de 1 h del recinto", "en": "Cáceres, under 1 h from the venue", "pt": "Cáceres, a menos de 1 h do recinto"}, indexable: false },
  // Mérida y Almendralejo (16/09/2026) no tienen página principal propia: la paralela cuelga de la
  // de Badajoz (`parent`) en migas y datos estructurados, y enlaza a ella como servicio completo.
  constructor_stand_merida: { parent: 'badajoz', cityName: 'Mérida', venue: 'IFEME – Institución Ferial de Mérida', workshop: {"es": "Cáceres, a menos de 1 h del recinto", "en": "Cáceres, under 1 h from the venue"}, indexable: false },
  constructor_stand_almendralejo: { parent: 'badajoz', cityName: 'Almendralejo', venue: 'Recinto ferial de Almendralejo (Tierra de Barros)', workshop: {"es": "Cáceres, a menos de 1 h del recinto", "en": "Cáceres, under 1 h from the venue"}, indexable: false },
  constructor_stand_trujillo: { city: "trujillo", cityName: "Trujillo", venue: "Recinto Ferial de Trujillo", workshop: {"es": "Cáceres, a menos de 1 h del recinto", "en": "Cáceres, under 1 h from the venue", "pt": "Cáceres, a menos de 1 h do recinto"}, indexable: false },
  constructor_stand_almeria: { city: "almeria", cityName: "Almer\u00eda", cityNames: {"en": "Almeria"}, venue: "Palacio de Exposiciones y Congresos de Aguadulce", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_jaen: { city: "jaen", cityName: "Ja\u00e9n", cityNames: {"en": "Jaen"}, venue: "IFEJA – Palacio de Ferias y Congresos de Jaén", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_huelva: { city: "huelva", cityName: "Huelva", venue: "Palacio de Congresos Casa Colón y recintos de la provincia", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_cordoba: { city: "cordoba", cityName: "C\u00f3rdoba", cityNames: {"en": "Cordoba", "pt": "Córdova"}, venue: "Recintos feriales de Córdoba y Los Pedroches", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_granada: { city: "granada", cityName: "Granada", venue: "Fermasa (Armilla)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_cadiz: { city: "cadiz", cityName: "C\u00e1diz", cityNames: {"en": "Cadiz"}, venue: "Palacio de Congresos de Cádiz e IFECA (Jerez)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_marsella: { city: "marsella", cityName: "Marsella", cityNames: {"en": "Marseille", "pt": "Marselha"}, venue: "Parc Chanot – Parc des Expositions et des Congrès de Marseille", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_cannes: { city: "cannes", cityName: "Cannes", venue: "Palais des Festivals et des Congrès", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_avignon: { city: "avignon", cityName: "Avi\u00f1\u00f3n", cityNames: {"en": "Avignon", "pt": "Avinhão"}, venue: "Parc des Expositions d’Avignon (Agroparc)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_toulouse: { city: "toulouse", cityName: "Toulouse", venue: "MEETT – Parc des Expositions de Toulouse", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_burdeos: { city: "burdeos", cityName: "Burdeos", cityNames: {"en": "Bordeaux", "pt": "Bordéus"}, venue: "Parc des Expositions de Bordeaux-Lac", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_lyon: { city: "lyon", cityName: "Lyon", venue: "Eurexpo Lyon", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_grenoble: { city: "grenoble", cityName: "Grenoble", venue: "Alpexpo", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_clermont_ferrand: { city: "clermont_ferrand", cityName: "Clermont-Ferrand", venue: "Grande Halle d’Auvergne (Cournon)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_niza: { city: "niza", cityName: "Niza", cityNames: {"en": "Nice", "pt": "Nice"}, venue: "Palais des Expositions y Nice Acropolis", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_montpellier: { city: "montpellier", cityName: "Montpellier", venue: "Parc des Expositions de Montpellier", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_perpignan: { city: "perpignan", cityName: "Perpi\u00f1\u00e1n", cityNames: {"en": "Perpignan", "pt": "Perpinhã"}, venue: "Parc des Expositions de Perpignan", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_batalha: { city: "batalha", cityName: "Batalha", venue: "Exposalão – Centro de Exposições da Batalha", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_santarem: { city: "santarem", cityName: "Santar\u00e9m", cityNames: {"en": "Santarem"}, venue: "CNEMA – Centro Nacional de Exposições", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_regua: { city: "regua", cityName: "Peso da R\u00e9gua", venue: "Recintos feriales de Peso da Régua (Douro)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_portugal_sur: { city: "portugal_sur", cityName: "Portugal Sur", cityNames: {"en": "Southern Portugal", "pt": "Sul de Portugal"}, venue: "Parque de Exposições de Beja y recintos del Algarve", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  constructor_stand_islas_de_madeira: { city: "islas_de_madeira", cityName: "Islas de Madeira", cityNames: {"en": "Madeira Islands", "pt": "Ilhas da Madeira"}, venue: "Madeira Tecnopolo (Funchal)", workshop: {"es": "Taller propio de Standarte", "en": "Standarte’s own workshop", "pt": "Oficina própria da Standarte"}, indexable: false },
  // Defensa de una FICHA DE FERIA, no de una ciudad: FIGAN sufrió una denuncia y, tras
  // el cambio de URL a plural (stands-figan-zaragoza), la ficha no ha recuperado su
  // posición. Esta página vive bajo /ferias/ y ataca la intención "constructor de
  // stands para FIGAN" con contenido propio de construcción; `fair` es la ficha que
  // defiende (enlace cruzado y 301 de emergencia preparada en static/.htaccess).
  constructor_stand_figan: { fair: 'stands-figan-zaragoza', fairName: 'FIGAN', cityName: 'Zaragoza', venue: 'Feria de Zaragoza', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  // Agroexpo: la otra ficha denunciada (pasó a stands-agroexpo por el mismo motivo).
  constructor_stand_agroexpo: { fair: 'stands-agroexpo', fairName: 'Agroexpo', cityName: 'Don Benito', venue: 'FEVAL (Don Benito)', workshop: { es: 'Cáceres, a menos de 1 h del recinto', en: 'Cáceres, under 1 h from the venue' }, indexable: true },
  // BIEMH: la mayor feria industrial del norte y la ficha más disputada de Bilbao.
  // Aquí no hay denuncia previa: la paralela se levanta ANTES, como reserva ya
  // posicionada por si la ficha cae, y ataca «constructor de stands para BIEMH».
  constructor_stand_biemh: { fair: 'stands-biemh-bilbao-bec', fairName: 'BIEMH', cityName: 'Bilbao', venue: 'BEC — Bilbao Exhibition Centre', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true }
};

export const isBuilderPage = (section) => Object.prototype.hasOwnProperty.call(builderPages, section);
/** Sección de constructor asociada a una página de ciudad (para el enlace cruzado). */
export const builderPageForCity = (citySection) =>
  Object.keys(builderPages).find((k) => builderPages[k].city && builderPages[k].city === citySection) || null;
/** Página paralela que defiende una ficha de feria (para el enlace desde la ficha). */
export const builderPageForFair = (fairSlug) =>
  Object.keys(builderPages).find((k) => builderPages[k].fair === fairSlug) || null;
