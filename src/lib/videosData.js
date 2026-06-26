// Vídeos 3D del portfolio. Fuente única para: la galería de la home, las páginas de
// visualización ("watch pages" que Google exige para indexar vídeo) y el sitemap de vídeo.
//
// Orden de aparición. El vídeo 4 se sustituyó por el 10; el 5 se omite.
const NUMS = [1, 2, 3, 10, 6, 7, 8, 9];

// Fecha de publicación (uploadDate) para el VideoObject / sitemap. ISO 8601 CON zona
// horaria (Google la exige; España en junio = CEST, +02:00). Fija, no dinámica.
const UPLOAD_DATE = '2026-06-24T09:00:00+02:00';

export const portfolioVideos = NUMS.map((num, i) => {
  const n = i + 1;
  return {
    num,
    slug: `proyecto-3d-${n}`,
    src: `/img/proyectos_stand_3d_standarte_${num}.mp4`,
    thumb: `/img/proyectos_stand_3d_standarte_${num}_thumb.jpg`,
    title: `Stand 3D Standarte — Proyecto ${n}`,
    description: `Recorrido en 3D de un stand ferial diseñado y montado a medida por Standarte (proyecto ${n}). Diseño, fabricación y montaje de stands para ferias en España y Portugal.`,
    uploadDate: UPLOAD_DATE
  };
});

// Vídeos de presentación de Standarte (el reproductor grande de MicroStand en la home y
// las home de idioma). También necesitan su página de visualización + sitemap para indexarse.
export const siteVideos = [
  {
    slug: 'standarte-ferias-historicas',
    src: '/img/video_standarte_presentacion_vinos.mp4',
    thumb: '/img/video_standarte_presentacion_vinos_poster.jpg',
    title: 'Standarte · Ferias en entornos históricos',
    description: 'Diseño e ingeniería respetuosa para stands en ubicaciones tradicionales e históricas, por Standarte.',
    uploadDate: UPLOAD_DATE
  },
  {
    slug: 'standarte-presentaciones-de-empresa',
    src: '/img/video_standarte_andalucia.mp4',
    thumb: '/img/video_standarte_andalucia_poster.jpg',
    title: 'Standarte · Presentaciones de empresa',
    description: 'Espacios gourmet a medida para bodegas, presentaciones de empresa y eventos especiales, por Standarte.',
    uploadDate: UPLOAD_DATE
  },
  {
    slug: 'standarte-ferias-aire-libre',
    src: '/img/video_standarte_feria_verano.mp4',
    thumb: '/img/video_standarte_feria_verano_poster.jpg',
    title: 'Standarte · Ferias al aire libre de gran formato',
    description: 'Montajes de gran escala y carpas premium de alta resistencia para ferias al aire libre, por Standarte.',
    uploadDate: UPLOAD_DATE
  }
];

// El 2º vídeo de la galería (slug proyecto-3d-2) muestra el stand de SKYLUXE (agencia
// inmobiliaria, Dubai-Amsterdam) en lugar del genérico. Se mantiene el slug —su watch page
// /videos/proyecto-3d-2 ya está indexada— y solo cambian el .mp4, la miniatura y los textos.
const sky = portfolioVideos.find((v) => v.slug === 'proyecto-3d-2');
if (sky) {
  sky.src = '/img/skyluxe_video.mp4';
  sky.thumb = '/img/skyluxe_video_thumb.jpg';
  sky.title = 'Stand para SKYLUXE — agencia inmobiliaria en Dubai-Amsterdam | Standarte';
  sky.description = 'Recorrido en vídeo del stand a medida que Standarte diseñó, fabricó y montó para SKYLUXE, agencia inmobiliaria, en Dubai-Amsterdam.';
}

// Subconjunto que se muestra en la galería de la home. Las watch pages (/videos/<slug>) y el
// sitemap siguen usando portfolioVideos COMPLETO (slugs estables, ya indexados): aquí solo
// ocultamos algunos vídeos del carrusel de la portada, sin renumerar ni perder esas páginas.
const GALLERY_EXCLUDE = new Set(['proyecto-3d-3', 'proyecto-3d-5', 'proyecto-3d-6', 'proyecto-3d-7']);
export const galleryVideos = portfolioVideos.filter((v) => !GALLERY_EXCLUDE.has(v.slug));

export function getVideoBySlug(slug) {
  return portfolioVideos.find((v) => v.slug === slug) || null;
}
