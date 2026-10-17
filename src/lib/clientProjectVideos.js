// Vídeos 3D de las propuestas presentadas en la zona de proyectos de cliente
// (client_project_media, tipo «video», alojados en Google Drive). Se muestran en la
// página de Galería (decisión del usuario, 23/09/2026) SIN nombre de cliente ni
// referencia: solo el recorrido. Lista fija, de más reciente a más antiguo; si se
// añaden vídeos nuevos a un proyecto, hay que sumarlos aquí a mano.
// 14/10/2026: los dos primeros vídeos de Drive (los que salían como «vídeo 5» y «vídeo 6»)
// se sustituyen por uno servido desde nuestro propio dominio. Las entradas con `src` se
// reproducen con <video>; las que llevan `id`, con el iframe de Drive.
export const clientProjectVideos = [
  { src: '/img/propuesta-3d-stand-a-medida.mp4' },
  { src: '/img/stand-andamios-recorrido-3d.mp4' },
  { id: '1_YfIt4O_V4NWcZaDTeOxCOUPqypd-pwk' },
  { id: '1fKBPuZfHpuFA3-HN0vDMUWXkte6szpEa' },
  { id: '1g7SAdKah7bLexS88kEAMTek9kOW-kutL' },
  { id: '1NTwuRVbxo08kAxfoujnoAuSXytX1b5Vw' }
].map((v) => (v.id ? { ...v, embed: `https://drive.google.com/file/d/${v.id}/preview` } : v));
