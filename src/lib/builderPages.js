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
export const builderPages = {
  constructor_stand_zaragoza:   { city: 'zaragoza',    cityName: 'Zaragoza',   indexable: true },
  constructor_stand_oporto:     { city: 'oporto',      cityName: 'Oporto',     indexable: true },
  constructor_stand_lisboa:     { city: 'lisboa',      cityName: 'Lisboa',     indexable: true },
  constructor_stand_bilbao:     { city: 'bilbao',      cityName: 'Bilbao',     indexable: true },
  constructor_stand_badajoz:    { city: 'badajoz',     cityName: 'Badajoz',    indexable: true },
  constructor_stand_don_benito: { city: 'montaje_don_benito', cityName: 'Don Benito', indexable: true }
};

export const isBuilderPage = (section) => Object.prototype.hasOwnProperty.call(builderPages, section);
/** Sección de constructor asociada a una página de ciudad (para el enlace cruzado). */
export const builderPageForCity = (citySection) =>
  Object.keys(builderPages).find((k) => builderPages[k].city === citySection) || null;
