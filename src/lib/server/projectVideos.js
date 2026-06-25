// Vídeos de proyecto (los .mp4 de las páginas /proyectos/[id]) expuestos como vídeos
// indexables: cada uno tiene su página de visualización /videos/video-<id> con reproductor
// visible + VideoObject, y entra en el sitemap de vídeo. SOLO servidor (importa projectData,
// 3,7 MB; no debe llegar al cliente).
import { projects } from '$lib/projectData.js';

// uploadDate en ISO 8601 CON zona horaria (Google lo exige). Igual que videosData.js.
const UPLOAD_DATE = '2026-06-24T09:00:00+02:00';

export const projectVideos = projects
  .filter((p) => p.video)
  .map((p) => ({
    slug: `video-${p.id}`,
    src: p.video,
    // Google no admite AVIF en thumbnailUrl: usamos un JPG generado del render principal.
    thumb: p.video.replace(/\.mp4$/i, '_poster.jpg'),
    title: (p.title && (p.title.es || p.name)) || p.name,
    description: `Recorrido en vídeo del stand a medida que Standarte diseñó, fabricó y montó para ${p.name} en ${p.location}.`,
    uploadDate: UPLOAD_DATE,
    projectId: p.id
  }));
