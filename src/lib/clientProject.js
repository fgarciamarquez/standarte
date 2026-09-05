// Cliente ligero de la zona privada de proyectos.
// Habla con Supabase por RPC (funciones SECURITY DEFINER que validan el token)
// usando la clave pública anon (segura en el navegador; el acceso real lo
// controla el token secreto del proyecto, no la clave).
const SUPABASE_URL = 'https://mucfvcrwleapdeaxdlxe.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z2Y3J3bGVhcGRlYXhkbHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE4MzMsImV4cCI6MjA5NTkwNzgzM30.PUaMx8aduqCLq_Fju8SkhEQnG9tr8UzBoj-GEcRbbU4';

async function rpc(fn, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`rpc ${fn} → ${res.status}`);
  return res.json();
}

/** Devuelve el proyecto completo (o null si el token no existe). */
export async function fetchProject(token) {
  return rpc('get_client_project', { p_token: token });
}

/** Añade un comentario del cliente a un archivo. */
export async function addComment(token, mediaId, body) {
  return rpc('add_client_comment', { p_token: token, p_media: mediaId, p_body: body });
}

/** El cliente aprueba el proyecto (congela la oferta si withOffer y sigue vigente). */
/** Aprueba el proyecto. `lang` es el idioma en que el cliente lo está viendo: decide
 *  el idioma en que se redactará el contrato. */
export async function approveProject(token, withOffer, lang = 'es') {
  return rpc('approve_client_project', { p_token: token, p_with_offer: !!withOffer, p_lang: lang === 'en' ? 'en' : 'es' });
}

/** C1: cita de cierre de expediente (opcional). Vía aditiva: no toca el RPC de
 * aprobación; solo guarda el testimonio si el expediente ya está aprobado. */
export async function saveTestimonial(token, text) {
  return rpc('save_client_testimonial', { p_token: token, p_text: text || '' });
}

/** El cliente guarda sus datos de facturación (para que el equipo emita la factura). */
export async function saveBilling(token, b) {
  return rpc('save_client_billing', {
    p_token: token, p_company: b.company || '', p_cif: b.cif || '', p_address: b.address || '',
    p_postal: b.postal || '', p_city: b.city || '', p_country: b.country || ''
  });
}

/** Dispara el aviso por email (endpoint PHP que reutiliza el mailer SMTP). */
export async function notifySend(token, role) {
  const fd = new FormData();
  fd.append('token', token);
  fd.append('role', role);
  const res = await fetch('/admin/ajax_proyecto_notify.php', { method: 'POST', body: fd });
  return res.json().catch(() => ({ ok: false }));
}

/** Marca de "visto": la página del proyecto lo dispara al abrirla el cliente.
 * Registra la visita y el servidor decide si avisa al equipo (máx. 1 cada 6 h).
 * Silencioso a propósito: si falla no debe afectar en nada a la visita. */
export function visitPing(token) {
  const fd = new FormData();
  fd.append('token', token);
  fd.append('role', 'visit');
  fetch('/admin/ajax_proyecto_notify.php', { method: 'POST', body: fd, keepalive: true }).catch(() => {});
}

// ─── Modo edición (interno) ────────────────────────────────────────────────
// Las escrituras van al endpoint PHP, que valida la sesión de admin y usa la
// service key en servidor. La cookie de sesión viaja sola (mismo origen).
const ADMIN_URL = '/admin/ajax_proyecto_admin.php';

export async function adminWhoami() {
  const fd = new FormData(); fd.append('action', 'whoami');
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ authed: false }));
}
export async function adminLogin(password) {
  const fd = new FormData(); fd.append('action', 'login'); fd.append('password', password);
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ ok: false }));
}
export async function adminLogout() {
  const fd = new FormData(); fd.append('action', 'logout');
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ ok: true }));
}
export async function adminAction(token, action, fields = {}) {
  const fd = new FormData();
  fd.append('action', action); fd.append('token', token);
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ ok: false }));
}
export async function adminUploadDoc(token, file, kind, title) {
  const fd = new FormData();
  fd.append('action', 'upload_doc'); fd.append('token', token); fd.append('file', file);
  fd.append('kind', kind || 'otro');
  if (title) fd.append('title', title);
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ ok: false }));
}
/** URL de descarga de un documento: el PHP valida el token y redirige a una URL
 *  firmada de 60 s (los PDF no viven en el bucket público). */
export const docUrl = (token, id) => `/admin/ajax_proyecto_doc.php?t=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`;

export async function adminUpload(token, file, sortOrder) {
  const fd = new FormData();
  fd.append('action', 'upload'); fd.append('token', token); fd.append('file', file);
  if (sortOrder != null) fd.append('sort_order', String(sortOrder));
  const r = await fetch(ADMIN_URL, { method: 'POST', body: fd });
  return r.json().catch(() => ({ ok: false }));
}
