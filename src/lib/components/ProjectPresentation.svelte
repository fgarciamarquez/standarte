<script>
  // Presentación de un proyecto de cliente (zona privada). Solo pinta y emite
  // eventos; la persistencia (Supabase / email) la maneja la página contenedora.
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let data;                 // proyecto (forma de la RPC get_client_project)
  export let role = 'client';      // 'client' | 'internal'
  export let busy = false;         // deshabilita "Enviar" mientras se procesa
  export let sent = false;         // true => muestra confirmación (texto según idioma/rol)

  let lang = 'es';
  let lightbox = null;
  let drafts = {};

  const t = {
    es: { interlocutor: 'Interlocutor', media: 'Propuesta gráfica', memoria: 'Memoria de producción', includes: 'Este presupuesto incluye', excludes: 'Este presupuesto no incluye', budget: 'Presupuesto', concept: 'Concepto', amount: 'Importe', base: 'Base imponible', iva: 'IVA (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Cuenta de ingreso', paid: 'PAGADO', ref: 'Ref', commentPh: 'Escribe un comentario…', comment: 'Comentar', noComments: 'Sin comentarios todavía.', send: 'Enviar comentarios', sendInternal: 'Enviar respuestas al cliente', sentClient: 'Comentarios enviados. Hemos avisado al equipo de Standarte.', sentInternal: 'Enviado. El cliente recibirá un aviso con el enlace al proyecto.', image: 'Imagen', video: 'Vídeo', model: 'Modelo 3D', client: 'Cliente', team: 'Standarte', viewModel: 'Ver modelo 3D interactivo' },
    en: { interlocutor: 'Contact', media: 'Visual proposal', memoria: 'Production memo', includes: 'This quote includes', excludes: 'This quote does not include', budget: 'Quote', concept: 'Item', amount: 'Amount', base: 'Taxable base', iva: 'VAT (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Payment account', paid: 'PAID', ref: 'Ref', commentPh: 'Write a comment…', comment: 'Comment', noComments: 'No comments yet.', send: 'Send comments', sendInternal: 'Send replies to client', sentClient: 'Comments sent. The Standarte team has been notified.', sentInternal: 'Sent. The client will receive a notification with the project link.', image: 'Image', video: 'Video', model: '3D model', client: 'Client', team: 'Standarte', viewModel: 'Open interactive 3D model' }
  };
  $: L = t[lang];

  // Impuestos (los importes llegan como string desde numeric de Postgres).
  $: ivaRate = Number(data?.iva_rate ?? 0.21);
  $: irpfRate = Number(data?.irpf_rate ?? 0.15);
  $: base = (data?.budget || []).reduce((s, b) => s + Number(b.amount || 0), 0);
  $: iva = base * ivaRate;
  $: irpf = base * irpfRate;
  $: total = base + iva - irpf;
  $: fmt = (n) => new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);

  const mediaComments = (mid) => (data?.comments || []).filter((c) => c.media_id === mid);
  function fmtTime(ts) {
    try { return new Date(ts).toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return ''; }
  }
  function submitComment(mid) {
    const text = (drafts[mid] || '').trim();
    if (!text) return;
    drafts = { ...drafts, [mid]: '' };
    dispatch('comment', { mediaId: mid, text });
  }
  function openLightbox(m) { if (m.type === 'image' || m.type === 'video') lightbox = m; }
  function closeLightbox() { lightbox = null; }
  function onKeydownLight(e) { if (e.key === 'Escape') closeLightbox(); }
  function imageIndex(m) { return (data.media || []).filter((x) => x.type === 'image').indexOf(m) + 1; }
  function videoIndex(m) { return (data.media || []).filter((x) => x.type === 'video').indexOf(m) + 1; }
</script>

<svelte:window on:keydown={onKeydownLight} />

<main class="pz">
  <header class="pz-top">
    <div class="pz-id">
      <span class="pz-client">{data.client_name}</span>
      <span class="pz-ref">{L.ref}: {data.ref}</span>
    </div>
    <div class="pz-toggle" role="group" aria-label="idioma">
      <button class:on={lang === 'es'} on:click={() => lang = 'es'}>ES</button>
      <button class:on={lang === 'en'} on:click={() => lang = 'en'}>EN</button>
    </div>
  </header>

  <h1 class="pz-title">{data.title[lang]}</h1>
  <p class="pz-inter">
    {L.interlocutor}: <strong>{data.interlocutor.name}</strong> · {data.interlocutor.role[lang]} ·
    <a href="mailto:{data.interlocutor.email}">{data.interlocutor.email}</a>
  </p>

  <section class="pz-block">
    <h2 class="pz-h2">{L.media}</h2>
    {#each data.media as m (m.id)}
      <article class="pz-media">
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
        <div
          class="pz-visual pz-visual-{m.type}"
          class:pz-zoomable={m.type !== 'model'}
          role={m.type !== 'model' ? 'button' : undefined}
          tabindex={m.type !== 'model' ? 0 : undefined}
          on:click={() => openLightbox(m)}
          on:keydown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && m.type !== 'model') { e.preventDefault(); openLightbox(m); } }}
        >
          {#if m.type === 'model'}
            <div class="pz-3d">◈ {L.model}</div>
            <button class="pz-3d-btn" type="button">{L.viewModel}</button>
          {:else if m.src}
            {#if m.type === 'image'}
              <img class="pz-thumb" src={m.src} alt={m.title[lang]} loading="lazy" />
            {:else}
              <video class="pz-thumb" src={m.src} poster={m.poster} preload="metadata" muted></video>
              <span class="pz-play" aria-hidden="true">▶</span>
            {/if}
            <span class="pz-zoom-hint" aria-hidden="true">⤢</span>
          {:else}
            <span class="pz-visual-tag">{m.type === 'image' ? L.image : L.video} {m.type === 'image' ? imageIndex(m) : videoIndex(m)}</span>
            {#if m.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}
            <span class="pz-zoom-hint" aria-hidden="true">⤢</span>
            <span class="pz-visual-title">{m.title[lang]}</span>
          {/if}
        </div>

        <div class="pz-chat">
          <div class="pz-thread">
            {#if !mediaComments(m.id).length}
              <p class="pz-empty">{L.noComments}</p>
            {:else}
              {#each mediaComments(m.id) as c (c.id)}
                <div class="pz-msg" class:internal={c.author === 'internal'}>
                  <span class="pz-msg-who">{c.author === 'client' ? (data.client_name || L.client) : L.team}</span>
                  <span class="pz-msg-text">{c.body}</span>
                  <span class="pz-msg-time">{fmtTime(c.created_at)}</span>
                </div>
              {/each}
            {/if}
          </div>
          <div class="pz-compose">
            <input type="text" placeholder={L.commentPh} bind:value={drafts[m.id]} on:keydown={(e) => { if (e.key === 'Enter') submitComment(m.id); }} />
            <button type="button" on:click={() => submitComment(m.id)}>{L.comment}</button>
          </div>
        </div>
      </article>
    {/each}
  </section>

  <section class="pz-block">
    <h2 class="pz-h2">{L.memoria}</h2>
    <p class="pz-memoria">{data.memoria[lang]}</p>
    <div class="pz-inex">
      <div><h3 class="pz-h3">{L.includes}</h3><ul>{#each data.includes[lang] as it}<li>{it}</li>{/each}</ul></div>
      <div><h3 class="pz-h3">{L.excludes}</h3><ul class="pz-ex">{#each data.excludes[lang] as it}<li>{it}</li>{/each}</ul></div>
    </div>
  </section>

  <section class="pz-block">
    <h2 class="pz-h2">{L.budget}</h2>
    <div class="pz-sheet-wrap">
      {#if data.paid}<div class="pz-stamp">{L.paid}</div>{/if}
      <table class="pz-sheet">
        <thead><tr><th>{L.concept}</th><th class="num">{L.amount}</th></tr></thead>
        <tbody>
          {#each data.budget as it}<tr><td>{it.concept[lang]}</td><td class="num">{fmt(Number(it.amount))}</td></tr>{/each}
        </tbody>
        <tfoot>
          <tr class="sum"><td>{L.base}</td><td class="num">{fmt(base)}</td></tr>
          <tr><td>{L.iva}</td><td class="num">+ {fmt(iva)}</td></tr>
          <tr><td>{L.irpf}</td><td class="num">− {fmt(irpf)}</td></tr>
          <tr class="grand"><td>{L.total}</td><td class="num">{fmt(total)}</td></tr>
        </tfoot>
      </table>
    </div>
    {#if data.income_account}<p class="pz-account">{L.account}: <strong>{data.income_account}</strong></p>{/if}
  </section>

  {#if lightbox}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="pz-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title[lang]} on:click|self={closeLightbox}>
      <button class="pz-lb-close" type="button" on:click={closeLightbox} aria-label="×">×</button>
      <figure class="pz-lb-inner">
        {#if lightbox.src}
          {#if lightbox.type === 'image'}
            <img src={lightbox.src} alt={lightbox.title[lang]} />
          {:else}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video src={lightbox.src} poster={lightbox.poster} controls autoplay></video>
          {/if}
        {:else}
          <div class="pz-lb-ph pz-visual-{lightbox.type}">{#if lightbox.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}</div>
        {/if}
        <figcaption>{lightbox.title[lang]}</figcaption>
      </figure>
    </div>
  {/if}

  <footer class="pz-foot">
    {#if sent}<p class="pz-sent">✓ {role === 'client' ? L.sentClient : L.sentInternal}</p>{/if}
    <button class="pz-send" type="button" disabled={busy} on:click={() => dispatch('send')}>
      {busy ? '…' : (role === 'client' ? L.send : L.sendInternal)} →
    </button>
  </footer>
</main>

<style>
  :global(html:has(.pz)), :global(html:has(.pz) body) { background: #f4f3ee; }
  .pz { max-width: 920px; margin: 0 auto; padding: 28px 18px 80px; font-family: 'Inconsolata', ui-monospace, 'SF Mono', 'JetBrains Mono', monospace; color: #1b1b1a; font-size: 15px; line-height: 1.5; }
  .pz-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 2px solid #1b1b1a; padding-bottom: 12px; }
  .pz-id { display: flex; flex-direction: column; }
  .pz-client { font-size: 22px; font-weight: 700; letter-spacing: 0.02em; }
  .pz-ref { font-size: 13px; color: #666; }
  .pz-toggle { display: inline-flex; border: 1px solid #1b1b1a; border-radius: 4px; overflow: hidden; }
  .pz-toggle button { background: #fff; border: none; padding: 6px 12px; font-family: inherit; font-size: 13px; cursor: pointer; color: #1b1b1a; }
  .pz-toggle button.on { background: #1b1b1a; color: #fff; }
  .pz-title { font-size: 26px; font-weight: 700; margin: 22px 0 6px; letter-spacing: -0.01em; }
  .pz-inter { margin: 0 0 6px; font-size: 14px; color: #444; }
  .pz-inter a { color: #1b1b1a; }
  .pz-block { margin-top: 40px; }
  .pz-h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #1b1b1a; border-bottom: 1px solid #cfcdc4; padding-bottom: 8px; margin: 0 0 18px; }
  .pz-h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px; color: #444; }
  .pz-media { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; align-items: start; }
  .pz-visual { position: relative; aspect-ratio: 4 / 3; border: 1px solid #cfcdc4; background: repeating-linear-gradient(135deg, #eceae2 0 12px, #e6e4da 12px 24px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; overflow: hidden; }
  .pz-visual-video { background: repeating-linear-gradient(135deg, #e4e6ec 0 12px, #dde0e8 12px 24px); }
  .pz-visual-model { background: #1b1b1a; color: #f4f3ee; }
  .pz-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .pz-visual-tag { position: absolute; top: 8px; left: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8779; }
  .pz-visual-title { padding: 0 12px; text-align: center; font-size: 14px; color: #5a584d; }
  .pz-visual-model .pz-visual-title { color: #cfcdc4; }
  .pz-play { font-size: 34px; color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,0.5); z-index: 1; }
  .pz-3d { font-size: 20px; letter-spacing: 0.1em; }
  .pz-3d-btn { background: none; border: 1px solid #f4f3ee; color: #f4f3ee; padding: 6px 14px; border-radius: 4px; font-family: inherit; font-size: 12px; cursor: pointer; }
  .pz-chat { display: flex; flex-direction: column; border: 1px solid #cfcdc4; background: #fff; min-height: 100%; }
  .pz-thread { flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto; }
  .pz-empty { color: #999; font-size: 13px; margin: 0; }
  .pz-msg { display: flex; flex-direction: column; padding: 7px 10px; border-radius: 4px; background: #f4f3ee; max-width: 92%; }
  .pz-msg.internal { background: #e9efe9; align-self: flex-end; }
  .pz-msg-who { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; }
  .pz-msg-text { font-size: 14px; }
  .pz-msg-time { font-size: 10px; color: #aaa; align-self: flex-end; }
  .pz-compose { display: flex; border-top: 1px solid #e2e0d7; }
  .pz-compose input { flex: 1; border: none; padding: 10px; font-family: inherit; font-size: 14px; background: #fff; }
  .pz-compose input:focus { outline: none; background: #fbfbf7; }
  .pz-compose button { border: none; background: #1b1b1a; color: #fff; padding: 0 16px; font-family: inherit; font-size: 13px; cursor: pointer; }
  .pz-memoria { margin: 0 0 18px; }
  .pz-inex { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .pz-inex ul { margin: 0; padding-left: 18px; }
  .pz-inex li { margin-bottom: 4px; }
  .pz-ex li::marker { content: '✕  '; }
  .pz-sheet-wrap { position: relative; border: 1px solid #1b1b1a; background: #fff; overflow: hidden; }
  .pz-sheet { width: 100%; border-collapse: collapse; font-size: 14px; }
  .pz-sheet th, .pz-sheet td { padding: 10px 14px; border-bottom: 1px solid #e2e0d7; text-align: left; }
  .pz-sheet thead th { background: #1b1b1a; color: #fff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
  .pz-sheet .num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .pz-sheet tfoot .sum td { border-top: 2px solid #1b1b1a; font-weight: 700; }
  .pz-sheet tfoot .grand td { background: #1b1b1a; color: #fff; font-weight: 700; font-size: 16px; }
  .pz-stamp { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-16deg); border: 4px solid #c0392b; color: #c0392b; font-size: 40px; font-weight: 700; letter-spacing: 0.1em; padding: 6px 26px; border-radius: 8px; opacity: 0.85; pointer-events: none; z-index: 2; }
  .pz-account { font-size: 14px; margin: 14px 0 0; }
  .pz-zoomable { cursor: zoom-in; }
  .pz-zoom-hint { position: absolute; top: 8px; right: 8px; font-size: 18px; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.5); opacity: 0.85; z-index: 1; }
  .pz-lightbox { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(20, 20, 18, 0.88); }
  .pz-lb-close { position: absolute; top: 16px; right: 20px; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: #fff; font-size: 26px; line-height: 1; border-radius: 50%; cursor: pointer; }
  .pz-lb-close:hover { background: rgba(255,255,255,0.12); }
  .pz-lb-inner { margin: 0; max-width: min(1100px, 94vw); max-height: 88vh; display: flex; flex-direction: column; gap: 10px; }
  .pz-lb-inner img, .pz-lb-inner video { max-width: 100%; max-height: 80vh; object-fit: contain; border: 1px solid rgba(255,255,255,0.2); background: #000; }
  .pz-lb-ph { width: min(900px, 90vw); aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center; }
  .pz-lb-inner figcaption { color: #eceae2; font-family: 'Inconsolata', monospace; font-size: 15px; text-align: center; }
  .pz-foot { margin-top: 44px; text-align: center; border-top: 2px solid #1b1b1a; padding-top: 24px; }
  .pz-sent { color: #2e7d32; margin: 0 0 14px; font-size: 15px; }
  .pz-send { background: #1b1b1a; color: #fff; border: none; padding: 14px 40px; font-family: inherit; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; border-radius: 4px; transition: background 0.2s ease; }
  .pz-send:hover:not(:disabled) { background: #000; }
  .pz-send:disabled { opacity: 0.5; cursor: default; }
  @media (max-width: 700px) { .pz-media { grid-template-columns: 1fr; } .pz-inex { grid-template-columns: 1fr; } }
</style>
