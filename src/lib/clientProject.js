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

/** Dispara el aviso por email (endpoint PHP que reutiliza el mailer SMTP). */
export async function notifySend(token, role) {
  const fd = new FormData();
  fd.append('token', token);
  fd.append('role', role);
  const res = await fetch('/admin/ajax_proyecto_notify.php', { method: 'POST', body: fd });
  return res.json().catch(() => ({ ok: false }));
}
