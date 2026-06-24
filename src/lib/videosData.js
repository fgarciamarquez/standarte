// Vídeos 3D del portfolio. Fuente única para: la galería de la home, las páginas de
// visualización ("watch pages" que Google exige para indexar vídeo) y el sitemap de vídeo.
//
// Orden de aparición. El vídeo 4 se sustituyó por el 10; el 5 se omite.
const NUMS = [1, 2, 3, 10, 6, 7, 8, 9];

// Fecha de publicación (uploadDate) para el VideoObject / sitemap. Fija, no dinámica.
const UPLOAD_DATE = '2026-06-24';

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

export function getVideoBySlug(slug) {
  return portfolioVideos.find((v) => v.slug === slug) || null;
}
