// Autenticación de constructores asociados de StandQuote sobre Supabase Auth
// (mismo proyecto que la intranet de clientes; la clave publishable es pública
// por diseño y las políticas RLS/Auth protegen los datos).
//
// Sesión: los tokens se guardan en localStorage y se restauran al cargar. El
// perfil del constructor (empresa, ciudad, teléfono) viaja en user_metadata:
// suficiente para el arranque de la fase 2; cuando llegue el panel de leads se
// promociona a una tabla propia con RLS.
const SUPABASE_URL = 'https://mucfvcrwleapdeaxdlxe.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z2Y3J3bGVhcGRlYXhkbHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE4MzMsImV4cCI6MjA5NTkwNzgzM30.PUaMx8aduqCLq_Fju8SkhEQnG9tr8UzBoj-GEcRbbU4';
const STORE_KEY = 'sq_builder_session';

async function authFetch(path, body, token) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${token || SUPABASE_ANON}`
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.msg || data.message || data.error_description || data.error || `auth_${res.status}`;
    throw new Error(msg);
  }
  return data;
}

/** Alta de constructor: crea el usuario con su perfil en metadata. Si el proyecto
 * exige confirmación por email, Supabase la envía y el alta queda pendiente. */
export async function sqSignUp({ email, password, company, city, phone }) {
  const data = await authFetch('signup', {
    email,
    password,
    data: { role: 'builder', company: company || '', city: city || '', phone: phone || '' }
  });
  // Con confirmación activada no llega sesión: el usuario debe validar su correo.
  if (data.access_token) saveSession(data);
  return { needsConfirmation: !data.access_token, user: data.user || data };
}

/** Inicio de sesión con email y contraseña. */
export async function sqSignIn(email, password) {
  const data = await authFetch('token?grant_type=password', { email, password });
  saveSession(data);
  return data.user;
}

export function sqSignOut() {
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
}

function saveSession(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in || 3600) * 1000,
      user: data.user || null
    }));
  } catch (e) {}
}

function readSession() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return null; }
}

/** Usuario de la sesión guardada; renueva el token si caducó (refresh_token). */
export async function sqCurrentUser() {
  const s = readSession();
  if (!s || !s.access_token) return null;
  if (Date.now() < s.expires_at - 60000 && s.user) return s.user;
  try {
    const data = await authFetch('token?grant_type=refresh_token', { refresh_token: s.refresh_token });
    saveSession(data);
    return data.user;
  } catch (e) {
    sqSignOut();
    return null;
  }
}
