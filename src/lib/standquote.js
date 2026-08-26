// Cliente de captación de StandQuote (solo activo cuando BRAND.leadGen).
// Habla con Supabase por el RPC submit_standquote_lead (SECURITY DEFINER):
// la tabla de leads tiene RLS sin políticas, así que la clave anónima solo
// puede pasar por la función, que exige consentimiento y valida los campos.
const SUPABASE_URL = 'https://mucfvcrwleapdeaxdlxe.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z2Y3J3bGVhcGRlYXhkbHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE4MzMsImV4cCI6MjA5NTkwNzgzM30.PUaMx8aduqCLq_Fju8SkhEQnG9tr8UzBoj-GEcRbbU4';

export async function submitLead(fields) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_standquote_lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`
    },
    body: JSON.stringify(fields)
  });
  if (!res.ok) return { ok: false, error: `http_${res.status}` };
  return res.json().catch(() => ({ ok: false, error: 'bad_json' }));
}
