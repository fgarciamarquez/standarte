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
// `venue`, `workshop` y `cityNames` alimentan la FICHA DE DATOS (server/builderFacts.js):
// el recinto de la plaza y desde dónde fabricamos. Son hechos nuestros —taller y
// distancia real—, no datos copiados de un calendario ajeno. `cityNames` solo hace
// falta cuando la ciudad se escribe distinto en otro idioma (Oporto → Porto).
export const builderPages = {
  constructor_stand_zaragoza:   { city: 'zaragoza',    cityName: 'Zaragoza',   venue: 'Feria de Zaragoza',            workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_madrid:     { city: 'madrid',      cityName: 'Madrid',     venue: 'IFEMA Madrid',                 workshop: { es: 'San Fernando de Henares, a ~10 km de IFEMA', en: 'San Fernando de Henares, ~10 km from IFEMA' }, indexable: true },
  constructor_stand_barcelona:  { city: 'barcelona',   cityName: 'Barcelona',  venue: 'Fira de Barcelona (Gran Via y Montjuïc)', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_oporto:     { city: 'oporto',      cityName: 'Oporto',     cityNames: { en: 'Porto', pt: 'Porto' }, venue: 'Exponor (Feira Internacional do Porto)',  workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop', pt: 'Oficina própria da Standarte' }, indexable: true },
  constructor_stand_lisboa:     { city: 'lisboa',      cityName: 'Lisboa',     venue: 'FIL — Feira Internacional de Lisboa',     workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_bilbao:     { city: 'bilbao',      cityName: 'Bilbao',     venue: 'BEC — Bilbao Exhibition Centre',          workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true },
  constructor_stand_badajoz:    { city: 'badajoz',     cityName: 'Badajoz',    venue: 'IFEBA — Institución Ferial de Badajoz',   workshop: { es: 'Cáceres, a menos de 1 h de Badajoz', en: 'Cáceres, under 1 h from Badajoz' }, indexable: true },
  constructor_stand_don_benito: { city: 'montaje_don_benito', cityName: 'Don Benito', venue: 'FEVAL (Don Benito)',               workshop: { es: 'Cáceres, a menos de 1 h del recinto', en: 'Cáceres, under 1 h from the venue' }, indexable: true },
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
  constructor_stand_biemh: { fair: 'stands-biemh-bilbao', fairName: 'BIEMH', cityName: 'Bilbao', venue: 'BEC — Bilbao Exhibition Centre', workshop: { es: 'Taller propio de Standarte', en: 'Standarte’s own workshop' }, indexable: true }
};

export const isBuilderPage = (section) => Object.prototype.hasOwnProperty.call(builderPages, section);
/** Sección de constructor asociada a una página de ciudad (para el enlace cruzado). */
export const builderPageForCity = (citySection) =>
  Object.keys(builderPages).find((k) => builderPages[k].city && builderPages[k].city === citySection) || null;
/** Página paralela que defiende una ficha de feria (para el enlace desde la ficha). */
export const builderPageForFair = (fairSlug) =>
  Object.keys(builderPages).find((k) => builderPages[k].fair === fairSlug) || null;
