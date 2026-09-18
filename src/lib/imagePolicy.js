// Política de imágenes de la web (decisión del usuario, 18/09/2026).
//
// Tras la pérdida súbita de posicionamiento de varias plazas (15-17/09/2026), la web se
// publica SIN secciones de imágenes: portadas de ciudad y de feria, galería de proyectos
// (rejilla, vídeos y visor), figuras de caso de éxito, figuras y vídeo keyword de img/seo,
// rejilla de portadas de la home, homenajes culturales, miniatura del mapa de Pat, sello
// de garantía, sección de equipo, miniaturas de proyectos en hubs y barra lateral y las
// figuras de las noticias. Se conservan el carrusel de trabajos 3D (#prototipos-3d), las
// páginas de proyecto a las que enlaza, los logotipos y los avatares de la interfaz.
//
// Un solo interruptor para poder volver atrás en un commit. Las páginas que quedaban
// vacías sin sus imágenes (galería «Proyectos a medida» y «Equipo», en 11 idiomas, y las
// 39 de /galeria/<slug>) dejan de generarse y redirigen 301 a la portada (static/.htaccess).
export const HIDE_IMAGE_SECTIONS = true;

// Secciones de siteData.routes que se retiran mientras HIDE_IMAGE_SECTIONS esté activo
// (también «LuzPavilion», cuya única pieza es el vídeo del micro stand).
export const RETIRED_SECTIONS = new Set(['custom', 'team', 'luzpavilion']);
