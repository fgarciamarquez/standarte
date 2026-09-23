// Vídeos 3D de las propuestas presentadas en la zona de proyectos de cliente
// (client_project_media, tipo «video», alojados en Google Drive). Se muestran en la
// página de Galería (decisión del usuario, 23/09/2026) SIN nombre de cliente ni
// referencia: solo el recorrido. Lista fija, de más reciente a más antiguo; si se
// añaden vídeos nuevos a un proyecto, hay que sumarlos aquí a mano.
export const clientProjectVideos = [
  { id: '1JOeK2f9KWXE7so_7Apqd5qmIrj-U0TKN' },
  { id: '1r-rymOxFGH4VrwtOiSsnvi4bRWdW66ml' },
  { id: '1_YfIt4O_V4NWcZaDTeOxCOUPqypd-pwk' },
  { id: '1fKBPuZfHpuFA3-HN0vDMUWXkte6szpEa' },
  { id: '1g7SAdKah7bLexS88kEAMTek9kOW-kutL' },
  { id: '1NTwuRVbxo08kAxfoujnoAuSXytX1b5Vw' }
].map((v) => ({ ...v, embed: `https://drive.google.com/file/d/${v.id}/preview` }));
