<script>
  // ─────────────────────────────────────────────────────────────────────────
  // PROTOTIPO — Zona privada de proyecto (vista de cliente).
  // Media con comentarios tipo chat por archivo, memoria de texto, hoja de
  // presupuesto con IVA/IRPF y sello "Pagado", bilingüe (es/en), monospace.
  // Los comentarios y el rol se guardan en localStorage solo para la demo;
  // el backend real (Supabase + emails + panel interno) se cablea después.
  // ─────────────────────────────────────────────────────────────────────────
  import { onMount } from 'svelte';

  let lang = 'es';                 // 'es' | 'en'
  let role = 'client';             // 'client' | 'internal'  (toggle solo de demo)
  let sent = null;                 // mensaje de confirmación tras "Enviar"
  let lightbox = null;             // media ampliado en ventana flotante, o null

  // Vídeo del lightbox sin controles: en móvil el navegador bloquea el autoplay
  // silencioso, así que mostramos un botón de "play" para tocar y reproducir.
  let lbVideoEl;
  let lbPlaying = false;
  function playLbVideo() { if (lbVideoEl) { lbVideoEl.play().catch(() => {}); } }
  function openLightbox(m) { if (m.type === 'image' || m.type === 'video') { lbPlaying = false; lightbox = m; } }
  function closeLightbox() { lightbox = null; }
  function onKeydownLight(e) { if (e.key === 'Escape') closeLightbox(); }

  const t = {
    es: {
      client: 'Cliente', internal: 'Interno', project: 'Proyecto', ref: 'Ref',
      interlocutor: 'Interlocutor', media: 'Propuesta gráfica', memoria: 'Memoria de producción',
      includes: 'Este presupuesto incluye', excludes: 'Este presupuesto no incluye',
      budget: 'Presupuesto', concept: 'Concepto', amount: 'Importe', base: 'Base imponible',
      iva: 'IVA (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Cuenta de ingreso',
      paid: 'PAGADO', commentPh: 'Escribe un comentario…', comment: 'Comentar',
      noComments: 'Sin comentarios todavía.', send: 'Enviar comentarios',
      sendInternal: 'Enviar respuestas al cliente',
      sentClient: 'Comentarios enviados. Hemos avisado a Javier G. Márquez por correo.',
      sentInternal: 'Enviado. El cliente recibirá un aviso con el enlace al proyecto.',
      image: 'Imagen', video: 'Vídeo', model: 'Modelo 3D', you: 'Tú', team: 'Standarte',
      viewModel: 'Ver modelo 3D interactivo'
    },
    en: {
      client: 'Client', internal: 'Internal', project: 'Project', ref: 'Ref',
      interlocutor: 'Contact', media: 'Visual proposal', memoria: 'Production memo',
      includes: 'This quote includes', excludes: 'This quote does not include',
      budget: 'Quote', concept: 'Item', amount: 'Amount', base: 'Taxable base',
      iva: 'VAT (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Payment account',
      paid: 'PAID', commentPh: 'Write a comment…', comment: 'Comment',
      noComments: 'No comments yet.', send: 'Send comments',
      sendInternal: 'Send replies to client',
      sentClient: 'Comments sent. We have notified Javier G. Márquez by email.',
      sentInternal: 'Sent. The client will receive a notification with the project link.',
      image: 'Image', video: 'Video', model: '3D model', you: 'You', team: 'Standarte',
      viewModel: 'Open interactive 3D model'
    }
  };
  $: L = t[lang];

  // ─── Datos del proyecto (ejemplo VETECO; luego vendrán de Supabase) ───────
  const project = {
    ref: 'IDh 2026/0062/CUSTOM-TYPE:A',
    client: 'IDh',
    title: { es: 'Stand IDh — VETECO 2026 · 8×8 Península', en: 'IDh Stand — VETECO 2026 · 8×8' },
    interlocutor: { name: 'Javier G. Márquez', role: { es: 'Director de Proyectos', en: 'Projects Director' }, email: 'javier@standarte.es' },
    memoria: {
      es: 'Stand de madera, foamX y arquitectura textil. Suelo de tarima blanca. Mobiliario y multimedia según prototipo (configuración flexible). Diseño de murales (2 composiciones).',
      en: 'Wooden stand, foamX and textile architecture. White raised floor. Furniture and multimedia as per prototype (flexible layout). Mural design (2 compositions).'
    },
    includes: {
      es: ['Diseño, planificación y validación técnica.', 'Construcción, transporte, montaje y desmontaje.', 'Mobiliario, multimedia y gráfica.'],
      en: ['Design, planning and technical validation.', 'Construction, transport, assembly and dismantling.', 'Furniture, multimedia and graphics.']
    },
    excludes: {
      es: ['Costes de acometida eléctrica y caja de luz (de la feria).', 'Costes de consumo eléctrico.'],
      en: ['Electrical connection and power box costs (fair).', 'Electricity consumption costs.']
    },
    media: [
      { id: 'img1', type: 'image', title: { es: 'Vista general del stand', en: 'Overall stand view' } },
      { id: 'img2', type: 'image', title: { es: 'Túnel de demostraciones', en: 'Demo tunnel' } },
      { id: 'img3', type: 'image', title: { es: 'Zona de reuniones', en: 'Meeting area' } },
      { id: 'img4', type: 'image', title: { es: 'Detalle de gráfica y murales', en: 'Graphics & murals detail' } },
      { id: 'img5', type: 'image', title: { es: 'Vista nocturna / iluminación', en: 'Night view / lighting' } },
      { id: 'vid1', type: 'video', title: { es: 'Recorrido en 3D', en: '3D walkthrough' } },
      { id: 'vid2', type: 'video', title: { es: 'Montaje del túnel', en: 'Tunnel assembly' } },
      { id: 'model1', type: 'model', title: { es: 'Modelo 3D del stand', en: '3D stand model' } }
    ],
    budget: {
      items: [
        { concept: { es: 'Diseño, planificación y validación técnica', en: 'Design, planning and technical validation' }, amount: 4500 },
        { concept: { es: 'Construcción del stand (madera, foamX, textil)', en: 'Stand construction (wood, foamX, textile)' }, amount: 18000 },
        { concept: { es: 'Suelo de tarima blanca', en: 'White raised floor' }, amount: 2400 },
        { concept: { es: 'Mobiliario y multimedia', en: 'Furniture and multimedia' }, amount: 6500 },
        { concept: { es: 'Gráfica y rotulación', en: 'Graphics and signage' }, amount: 2000 },
        { concept: { es: 'Transporte, montaje y desmontaje', en: 'Transport, assembly and dismantling' }, amount: 2000 }
      ],
      ivaRate: 0.21,
      irpfRate: 0.15,
      account: 'ES12 3456 7890 1234 5678 9012',
      paid: false
    }
  };

  // ─── Cálculo del presupuesto ──────────────────────────────────────────────
  $: base = project.budget.items.reduce((s, i) => s + i.amount, 0);
  $: iva = base * project.budget.ivaRate;
  $: irpf = base * project.budget.irpfRate;
  $: total = base + iva - irpf;
  $: fmt = (n) => new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);

  // ─── Comentarios por archivo (localStorage en la demo) ────────────────────
  let comments = {};   // { mediaId: [{ author, text, ts }] }
  let drafts = {};     // { mediaId: 'texto en curso' }
  const KEY = 'proyecto-demo-comments';

  onMount(() => {
    try { comments = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { comments = {}; }
    const savedRole = localStorage.getItem('proyecto-demo-role');
    if (savedRole) role = savedRole;
  });
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(comments)); } catch {} }
  function addComment(mediaId) {
    const text = (drafts[mediaId] || '').trim();
    if (!text) return;
    const list = comments[mediaId] ? [...comments[mediaId]] : [];
    list.push({ author: role, text, ts: new Date().toISOString() });
    comments = { ...comments, [mediaId]: list };
    drafts = { ...drafts, [mediaId]: '' };
    persist();
    sent = null;
  }
  function fmtTime(ts) {
    try { return new Date(ts).toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return ''; }
  }
  function setRole(r) { role = r; localStorage.setItem('proyecto-demo-role', r); sent = null; }

  // ─── Enviar (stub: en real será un POST a un endpoint PHP que manda email) ─
  function handleSend() {
    // TODO backend: POST /admin/ajax_proyecto_notify.php { projectRef, role, comments }
    sent = role === 'client' ? L.sentClient : L.sentInternal;
    if (typeof window !== 'undefined') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>{project.title[lang]} · {project.ref}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<svelte:window on:keydown={onKeydownLight} />

<main class="pz">
  <!-- Barra superior -->
  <header class="pz-top">
    <div class="pz-id">
      <span class="pz-client">{project.client}</span>
      <span class="pz-ref">{L.ref}: {project.ref}</span>
    </div>
    <div class="pz-controls">
      <div class="pz-toggle" role="group" aria-label="rol">
        <button class:on={role === 'client'} on:click={() => setRole('client')}>{L.client}</button>
        <button class:on={role === 'internal'} on:click={() => setRole('internal')}>{L.internal}</button>
      </div>
      <div class="pz-toggle" role="group" aria-label="idioma">
        <button class:on={lang === 'es'} on:click={() => lang = 'es'}>ES</button>
        <button class:on={lang === 'en'} on:click={() => lang = 'en'}>EN</button>
      </div>
    </div>
  </header>

  <h1 class="pz-title">{project.title[lang]}</h1>
  <p class="pz-inter">
    {L.interlocutor}: <strong>{project.interlocutor.name}</strong> · {project.interlocutor.role[lang]} ·
    <a href="mailto:{project.interlocutor.email}">{project.interlocutor.email}</a>
  </p>

  <!-- Propuesta gráfica: media + chat por archivo -->
  <section class="pz-block">
    <h2 class="pz-h2">{L.media}</h2>
    {#each project.media as m, i}
      <article class="pz-media">
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
          {:else}
            <span class="pz-visual-tag">{m.type === 'image' ? L.image : L.video} {m.type === 'video' ? (i - 4) : (i + 1)}</span>
            {#if m.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}
            <span class="pz-zoom-hint" aria-hidden="true">⤢</span>
          {/if}
          <span class="pz-visual-title">{m.title[lang]}</span>
        </div>

        <div class="pz-chat">
          <div class="pz-thread">
            {#if !(comments[m.id] && comments[m.id].length)}
              <p class="pz-empty">{L.noComments}</p>
            {:else}
              {#each comments[m.id] as c}
                <div class="pz-msg" class:mine={c.author === role} class:internal={c.author === 'internal'}>
                  <span class="pz-msg-who">{c.author === 'client' ? L.client : L.team}</span>
                  <span class="pz-msg-text">{c.text}</span>
                  <span class="pz-msg-time">{fmtTime(c.ts)}</span>
                </div>
              {/each}
            {/if}
          </div>
          <div class="pz-compose">
            <input
              type="text"
              placeholder={L.commentPh}
              bind:value={drafts[m.id]}
              on:keydown={(e) => { if (e.key === 'Enter') addComment(m.id); }}
            />
            <button type="button" on:click={() => addComment(m.id)}>{L.comment}</button>
          </div>
        </div>
      </article>
    {/each}
  </section>

  <!-- Memoria de producción -->
  <section class="pz-block">
    <h2 class="pz-h2">{L.memoria}</h2>
    <p class="pz-memoria">{project.memoria[lang]}</p>
    <div class="pz-inex">
      <div>
        <h3 class="pz-h3">{L.includes}</h3>
        <ul>{#each project.includes[lang] as it}<li>{it}</li>{/each}</ul>
      </div>
      <div>
        <h3 class="pz-h3">{L.excludes}</h3>
        <ul class="pz-ex">{#each project.excludes[lang] as it}<li>{it}</li>{/each}</ul>
      </div>
    </div>
  </section>

  <!-- Presupuesto (hoja tipo Excel) -->
  <section class="pz-block">
    <h2 class="pz-h2">{L.budget}</h2>
    <div class="pz-sheet-wrap">
      {#if project.budget.paid}<div class="pz-stamp">{L.paid}</div>{/if}
      <table class="pz-sheet">
        <thead>
          <tr><th>{L.concept}</th><th class="num">{L.amount}</th></tr>
        </thead>
        <tbody>
          {#each project.budget.items as it}
            <tr><td>{it.concept[lang]}</td><td class="num">{fmt(it.amount)}</td></tr>
          {/each}
        </tbody>
        <tfoot>
          <tr class="sum"><td>{L.base}</td><td class="num">{fmt(base)}</td></tr>
          <tr><td>{L.iva}</td><td class="num">+ {fmt(iva)}</td></tr>
          <tr><td>{L.irpf}</td><td class="num">− {fmt(irpf)}</td></tr>
          <tr class="grand"><td>{L.total}</td><td class="num">{fmt(total)}</td></tr>
        </tfoot>
      </table>
    </div>
    <p class="pz-account">{L.account}: <strong>{project.budget.account}</strong></p>
  </section>

  <!-- Ventana flotante (lightbox) para ampliar imágenes / vídeos -->
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
            <div class="pz-lb-video">
              <video src={lightbox.src} poster={lightbox.poster} autoplay loop muted playsinline
                bind:this={lbVideoEl}
                on:playing={() => (lbPlaying = true)}
                on:pause={() => (lbPlaying = false)}
                on:click={playLbVideo}></video>
              {#if !lbPlaying}
                <button type="button" class="pz-lb-video-play" on:click={playLbVideo} aria-label="Reproducir vídeo"><span aria-hidden="true">▶</span></button>
              {/if}
            </div>
          {/if}
        {:else}
          <div class="pz-lb-ph pz-visual-{lightbox.type}">
            {#if lightbox.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}
          </div>
        {/if}
        <figcaption>{lightbox.title[lang]}</figcaption>
      </figure>
    </div>
  {/if}

  <!-- Enviar -->
  <footer class="pz-foot">
    {#if sent}<p class="pz-sent">✓ {sent}</p>{/if}
    <button class="pz-send" type="button" on:click={handleSend}>
      {role === 'client' ? L.send : L.sendInternal} →
    </button>
  </footer>
</main>

<style>
  :global(html:has(.pz)), :global(html:has(.pz) body) { background: #f4f3ee; }

  .pz {
    max-width: 920px;
    margin: 0 auto;
    padding: 28px 18px 80px;
    font-family: 'Inconsolata', ui-monospace, 'SF Mono', 'JetBrains Mono', monospace;
    color: #1b1b1a;
    font-size: 15px;
    line-height: 1.5;
  }

  .pz-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 2px solid #1b1b1a; padding-bottom: 12px; }
  .pz-id { display: flex; flex-direction: column; }
  .pz-client { font-size: 22px; font-weight: 700; letter-spacing: 0.02em; }
  .pz-ref { font-size: 13px; color: #666; }
  .pz-controls { display: flex; gap: 10px; }
  .pz-toggle { display: inline-flex; border: 1px solid #1b1b1a; border-radius: 4px; overflow: hidden; }
  .pz-toggle button { background: #fff; border: none; padding: 6px 12px; font-family: inherit; font-size: 13px; cursor: pointer; color: #1b1b1a; }
  .pz-toggle button.on { background: #1b1b1a; color: #fff; }

  .pz-title { font-size: 26px; font-weight: 700; margin: 22px 0 6px; letter-spacing: -0.01em; }
  .pz-inter { margin: 0 0 6px; font-size: 14px; color: #444; }
  .pz-inter a { color: #1b1b1a; }

  .pz-block { margin-top: 40px; }
  .pz-h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #1b1b1a; border-bottom: 1px solid #cfcdc4; padding-bottom: 8px; margin: 0 0 18px; }
  .pz-h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px; color: #444; }

  /* Media + chat */
  .pz-media { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; align-items: start; }
  .pz-visual { position: relative; aspect-ratio: 4 / 3; border: 1px solid #cfcdc4; background: repeating-linear-gradient(135deg, #eceae2 0 12px, #e6e4da 12px 24px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; overflow: hidden; }
  .pz-visual-video { background: repeating-linear-gradient(135deg, #e4e6ec 0 12px, #dde0e8 12px 24px); }
  .pz-visual-model { background: #1b1b1a; color: #f4f3ee; }
  .pz-visual-tag { position: absolute; top: 8px; left: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8779; }
  .pz-visual-title { padding: 0 12px; text-align: center; font-size: 14px; color: #5a584d; }
  .pz-visual-model .pz-visual-title { color: #cfcdc4; }
  .pz-play { font-size: 34px; color: #8a8caa; }
  .pz-3d { font-size: 20px; letter-spacing: 0.1em; }
  .pz-3d-btn { background: none; border: 1px solid #f4f3ee; color: #f4f3ee; padding: 6px 14px; border-radius: 4px; font-family: inherit; font-size: 12px; cursor: pointer; }

  .pz-chat { display: flex; flex-direction: column; border: 1px solid #cfcdc4; background: #fff; aspect-ratio: auto; min-height: 100%; }
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

  /* Memoria */
  .pz-memoria { margin: 0 0 18px; }
  .pz-inex { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .pz-inex ul { margin: 0; padding-left: 18px; }
  .pz-inex li { margin-bottom: 4px; }
  .pz-ex li::marker { content: '✕  '; }

  /* Hoja de presupuesto */
  .pz-sheet-wrap { position: relative; border: 1px solid #1b1b1a; background: #fff; overflow: hidden; }
  .pz-sheet { width: 100%; border-collapse: collapse; font-size: 14px; }
  .pz-sheet th, .pz-sheet td { padding: 10px 14px; border-bottom: 1px solid #e2e0d7; text-align: left; }
  .pz-sheet thead th { background: #1b1b1a; color: #fff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
  .pz-sheet .num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .pz-sheet tfoot .sum td { border-top: 2px solid #1b1b1a; font-weight: 700; }
  .pz-sheet tfoot .grand td { background: #1b1b1a; color: #fff; font-weight: 700; font-size: 16px; }
  .pz-stamp { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-16deg); border: 4px solid #c0392b; color: #c0392b; font-size: 40px; font-weight: 700; letter-spacing: 0.1em; padding: 6px 26px; border-radius: 8px; opacity: 0.85; pointer-events: none; z-index: 2; }
  .pz-account { font-size: 14px; margin: 14px 0 0; }

  /* Enviar */
  .pz-foot { margin-top: 44px; text-align: center; border-top: 2px solid #1b1b1a; padding-top: 24px; }
  .pz-sent { color: #2e7d32; margin: 0 0 14px; font-size: 15px; }
  .pz-send { background: #1b1b1a; color: #fff; border: none; padding: 14px 40px; font-family: inherit; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; border-radius: 4px; transition: background 0.2s ease; }
  .pz-send:hover { background: #000; }

  /* Zoom */
  .pz-zoomable { cursor: zoom-in; }
  .pz-zoom-hint { position: absolute; top: 8px; right: 8px; font-size: 18px; color: #8a8779; opacity: 0.7; }
  .pz-visual-video .pz-zoom-hint { color: #7a7d95; }

  /* Ventana flotante (lightbox) */
  .pz-lightbox { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(20, 20, 18, 0.88); animation: pzfade 0.18s ease; }
  @keyframes pzfade { from { opacity: 0; } to { opacity: 1; } }
  .pz-lb-close { position: absolute; top: 16px; right: 20px; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: #fff; font-size: 26px; line-height: 1; border-radius: 50%; cursor: pointer; }
  .pz-lb-close:hover { background: rgba(255,255,255,0.12); }
  .pz-lb-inner { margin: 0; max-width: min(1100px, 94vw); max-height: 88vh; display: flex; flex-direction: column; gap: 10px; }
  .pz-lb-inner img, .pz-lb-inner video { max-width: 100%; max-height: 80vh; object-fit: contain; border: 1px solid rgba(255,255,255,0.2); background: #000; }
  .pz-lb-video { position: relative; display: inline-flex; max-width: 100%; }
  .pz-lb-video video { cursor: pointer; }
  .pz-lb-video-play {
    position: absolute; inset: 0; margin: auto;
    width: 76px; height: 76px; border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.45);
    color: #fff; font-size: 26px; line-height: 1; padding-left: 5px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .pz-lb-video-play:hover { background: rgba(0, 0, 0, 0.65); transform: scale(1.06); }
  .pz-lb-ph { width: min(900px, 90vw); aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center; }
  .pz-lb-inner figcaption { color: #eceae2; font-family: 'Inconsolata', monospace; font-size: 15px; text-align: center; }

  @media (max-width: 700px) {
    .pz-media { grid-template-columns: 1fr; }
    .pz-inex { grid-template-columns: 1fr; }
  }
</style>
