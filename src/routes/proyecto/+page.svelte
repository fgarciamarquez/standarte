<script>
  import { onMount } from 'svelte';
  import ProjectPresentation from '$lib/components/ProjectPresentation.svelte';
  import { fetchProject, addComment, notifySend } from '$lib/clientProject.js';

  let project = null;
  let status = 'loading';   // loading | ok | notfound | error
  let token = '';
  let busy = false;
  let sent = false;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    token = (params.get('t') || '').trim();
    if (!/^[a-f0-9]{20,64}$/.test(token)) { status = 'notfound'; return; }
    try {
      const data = await fetchProject(token);
      if (!data) { status = 'notfound'; return; }
      project = data;
      status = 'ok';
    } catch (e) {
      status = 'error';
    }
  });

  async function handleComment(e) {
    const { mediaId, text } = e.detail;
    // Optimista: se muestra al instante; si falla el guardado, se queda igual visible.
    const optimistic = { id: 'tmp-' + Date.now(), media_id: mediaId, author: 'client', author_name: project.client_name, body: text, created_at: new Date().toISOString() };
    project = { ...project, comments: [...(project.comments || []), optimistic] };
    sent = false;
    try { await addComment(token, mediaId, text); } catch (e) { /* se mantiene optimista */ }
  }

  async function handleSend() {
    busy = true; sent = false;
    try {
      const r = await notifySend(token, 'client');
      sent = !!(r && r.ok);
    } catch (e) {
      sent = false;
    } finally {
      busy = false;
    }
  }
</script>

<svelte:head>
  <title>Proyecto · Standarte</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if status === 'ok' && project}
  <ProjectPresentation data={project} role="client" {busy} {sent}
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
</style>
