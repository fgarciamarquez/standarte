<script>
  import { onMount } from 'svelte';
  import ProjectPresentation from '$lib/components/ProjectPresentation.svelte';
  import { fetchProject, addComment, notifySend, adminWhoami, adminLogin, adminLogout } from '$lib/clientProject.js';

  let project = null;
  let status = 'loading';   // loading | ok | notfound | error
  let token = '';
  let busy = false;
  let sent = false;

  // Modo edición interno
  let admin = false;
  let showLogin = false;
  let pw = '';
  let loginErr = '';

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    token = (params.get('t') || '').trim();
    if (!/^[a-f0-9]{20,64}$/.test(token)) { status = 'notfound'; return; }
    // Cargar el proyecto primero (prioridad de la vista del cliente).
    try {
      const data = await fetchProject(token);
      if (!data) { status = 'notfound'; return; }
      project = data; status = 'ok';
    } catch (e) { status = 'error'; return; }
    // Detectar sesión de admin aparte, sin bloquear el render (en dev el PHP no
    // responde y quedaría colgado; aquí solo activa el modo edición si procede).
    adminWhoami().then((who) => { admin = !!(who && who.authed); }).catch(() => {});
  });

  async function reloadProject() {
    try { const data = await fetchProject(token); if (data) project = data; } catch (e) {}
  }

  async function handleComment(e) {
    const { mediaId, text } = e.detail;
    const optimistic = { id: 'tmp-' + Date.now(), media_id: mediaId, author: 'client', author_name: project.client_name, body: text, created_at: new Date().toISOString() };
    project = { ...project, comments: [...(project.comments || []), optimistic] };
    sent = false;
    try { await addComment(token, mediaId, text); } catch (e) {}
  }
  async function handleSend() {
    busy = true; sent = false;
    try { const r = await notifySend(token, 'client'); sent = !!(r && r.ok); } catch (e) { sent = false; } finally { busy = false; }
  }
  async function doLogin() {
    loginErr = '';
    const r = await adminLogin(pw);
    if (r && r.ok) { admin = true; showLogin = false; pw = ''; } else { loginErr = 'Contraseña incorrecta'; }
  }
  async function doLogout() { await adminLogout(); admin = false; }
</script>

<svelte:head>
  <title>Proyecto · Standarte</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Acceso interno: discreto; el cliente lo ignora, el equipo entra en modo edición -->
{#if status === 'ok' && !admin}
  <div class="pz-access">
    {#if !showLogin}
      <button class="pz-access-link" on:click={() => showLogin = true}>· acceso interno</button>
    {:else}
      <form class="pz-access-form" on:submit|preventDefault={doLogin}>
        <input type="password" bind:value={pw} placeholder="Contraseña" autofocus />
        <button type="submit">Entrar</button>
        {#if loginErr}<span class="pz-access-err">{loginErr}</span>{/if}
      </form>
    {/if}
  </div>
{:else if admin}
  <div class="pz-access pz-access-out"><button class="pz-access-link" on:click={doLogout}>salir de edición ✕</button></div>
{/if}

{#if status === 'ok' && project}
  <ProjectPresentation data={project} role="client" {busy} {sent} {admin} {token} reload={reloadProject}
    on:comment={handleComment} on:send={handleSend} />
{:else}
  <div class="pz-state">
    {#if status === 'loading'}
      <p>Cargando proyecto…</p>
    {:else if status === 'notfound'}
      <h1>Proyecto no encontrado</h1>
      <p>El enlace no es válido o ha caducado. Comprueba el enlace del correo o contacta con nosotros.</p>
    {:else}
      <h1>No se pudo cargar el proyecto</h1>
      <p>Ha ocurrido un error. Inténtalo de nuevo en unos minutos.</p>
    {/if}
  </div>
{/if}

<style>
  :global(html:has(.pz-state)), :global(html:has(.pz-state) body) { background: #f4f3ee; }
  .pz-state { max-width: 640px; margin: 0 auto; padding: 80px 20px; text-align: center; font-family: 'Inconsolata', ui-monospace, monospace; color: #1b1b1a; }
  .pz-state h1 { font-size: 22px; margin: 0 0 12px; }
  .pz-state p { color: #555; }
  .pz-access { position: absolute; top: 8px; right: 12px; z-index: 950; font-family: 'Inconsolata', ui-monospace, monospace; }
  .pz-access-out { position: fixed; }
  .pz-access-link { background: none; border: none; color: #b9b6a8; font-family: inherit; font-size: 12px; cursor: pointer; }
  .pz-access-link:hover { color: #1b1b1a; }
  .pz-access-form { display: flex; gap: 6px; align-items: center; }
  .pz-access-form input { border: 1px solid #cfcdc4; border-radius: 4px; padding: 6px 8px; font-family: inherit; font-size: 13px; }
  .pz-access-form button { background: #1b1b1a; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; font-family: inherit; font-size: 13px; cursor: pointer; }
  .pz-access-err { font-size: 12px; color: #c0392b; }
</style>
