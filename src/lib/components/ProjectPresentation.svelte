<script>
  // Presentación de un proyecto de cliente (zona privada).
  // - Modo cliente: lee, comenta y envía.
  // - Modo edición (admin=true): la misma página se vuelve editable in situ
  //   (títulos, memoria, incluye/excluye, presupuesto, media con arrastrar y
  //   soltar, respuestas, pagado) usando el endpoint PHP con la service key.
  import { createEventDispatcher } from 'svelte';
  import { adminAction, adminUpload, notifySend, approveProject, saveBilling, saveTestimonial } from '$lib/clientProject.js';
  const dispatch = createEventDispatcher();

  export let data;
  export let role = 'client';      // 'client' | 'internal'
  export let busy = false;
  export let sent = false;
  export let admin = false;        // modo edición interno
  export let token = '';
  export let reload = async () => {};  // recarga los datos desde Supabase

  let lang = 'es';
  let lightbox = null;
  let drafts = {};
  let saving = false;
  let uploading = false;
  let dragOver = false;
  let adminMsg = '';

  const t = {
    es: { interlocutor: 'Interlocutor', media: 'Propuesta gráfica', memoria: 'Memoria de producción', includes: 'Este presupuesto incluye', excludes: 'Este presupuesto no incluye', budget: 'Presupuesto', concept: 'Concepto', amount: 'Importe', base: 'Base imponible', iva: 'IVA (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Cuenta de ingreso', paid: 'PAGADO', ref: 'Ref', commentPh: 'Escribe un comentario…', replyPh: 'Responder al cliente…', comment: 'Comentar', reply: 'Responder', noComments: 'Sin comentarios todavía.', send: 'Enviar comentarios', sentClient: 'Comentarios enviados. Hemos avisado al equipo de Standarte.', sentInternal: 'Aviso enviado al cliente.', image: 'Imagen', video: 'Vídeo', model: 'Modelo 3D', client: 'Cliente', team: 'Standarte', viewModel: 'Ver modelo 3D interactivo', edit: 'Modo edición', save: 'Guardar cambios', notify: 'Avisar al cliente', drop: 'Arrastra aquí imágenes, vídeos o un .glb (o haz clic)', addLine: 'Añadir concepto', del: 'Eliminar', saved: 'Cambios guardados.', titlePh: 'Título del proyecto', memoriaPh: 'Memoria de producción…', accountPh: 'IBAN / cuenta de ingreso', linesHint: '(una por línea)', driveTitle: 'O enlaza desde Google Drive', driveHint: 'El archivo debe estar compartido como «Cualquiera con el enlace».', driveUrlPh: 'Pega el enlace de Google Drive…', driveTitlePh: 'Título (opcional)', driveAdd: 'Enlazar', subtotal: 'Subtotal', promptDiscount: 'Descuento por pronta decisión', until: 'hasta el', expired: 'caducado', discAmountPh: 'Importe del descuento (€)', discLabelPh: 'Texto del descuento (opcional)', discHint: 'Se resta de la base imponible mientras no pase la fecha límite.', mediaDescLabel: 'Descripción (solo en la ampliada)', mediaDescPh: 'Descripción breve del archivo…', clientEmail: 'Email del cliente (para los avisos)', clientEmailPh: 'cliente@empresa.com', approve: 'Aprobar proyecto', approveWithOffer: 'Aprobar proyecto con oferta', testimonialPh: '¿Una frase sobre cómo fue trabajar con nosotros? (opcional, la usaríamos con tu permiso)', approved: 'APROBADO', approvedOn: 'Aprobado el', payTitle: 'Datos para el ingreso', subject: 'Asunto', beneficiary: 'Beneficiario', owner: 'titular de Standarte', billingTitle: 'Datos para la factura', razon: 'Razón social', cif: 'CIF', address: 'Dirección', postal: 'Código postal', city: 'Ciudad', country: 'País', saveBilling: 'Guardar datos de facturación', billingSaved: 'Datos guardados. Gracias.', thanks: 'Gracias por su confianza. Nuestro equipo le hará llegar la factura y el contrato en breve. Un cordial saludo. El equipo de Standarte.' },
    en: { interlocutor: 'Contact', media: 'Visual proposal', memoria: 'Production memo', includes: 'This quote includes', excludes: 'This quote does not include', budget: 'Quote', concept: 'Item', amount: 'Amount', base: 'Taxable base', iva: 'VAT (21%)', irpf: 'IRPF (−15%)', total: 'TOTAL', account: 'Payment account', paid: 'PAID', ref: 'Ref', commentPh: 'Write a comment…', replyPh: 'Reply to the client…', comment: 'Comment', reply: 'Reply', noComments: 'No comments yet.', send: 'Send comments', sentClient: 'Comments sent. The Standarte team has been notified.', sentInternal: 'Notification sent to the client.', image: 'Image', video: 'Video', model: '3D model', client: 'Client', team: 'Standarte', viewModel: 'Open interactive 3D model', edit: 'Edit mode', save: 'Save changes', notify: 'Notify client', drop: 'Drag images, videos or a .glb here (or click)', addLine: 'Add item', del: 'Delete', saved: 'Changes saved.', titlePh: 'Project title', memoriaPh: 'Production memo…', accountPh: 'IBAN / payment account', linesHint: '(one per line)', driveTitle: 'Or link from Google Drive', driveHint: 'The file must be shared as “Anyone with the link”.', driveUrlPh: 'Paste the Google Drive link…', driveTitlePh: 'Title (optional)', driveAdd: 'Link', subtotal: 'Subtotal', promptDiscount: 'Early-decision discount', until: 'until', expired: 'expired', discAmountPh: 'Discount amount (€)', discLabelPh: 'Discount label (optional)', discHint: 'Subtracted from the taxable base until the deadline passes.', mediaDescLabel: 'Description (shown only when enlarged)', mediaDescPh: 'Short description of the file…', clientEmail: 'Client email (for notifications)', clientEmailPh: 'client@company.com', approve: 'Approve project', approveWithOffer: 'Approve project with offer', testimonialPh: 'A line about how it was to work with us? (optional, used with your permission)', approved: 'APPROVED', approvedOn: 'Approved on', payTitle: 'Payment details', subject: 'Subject', beneficiary: 'Beneficiary', owner: 'Standarte owner', billingTitle: 'Billing details', razon: 'Legal name', cif: 'Tax ID (CIF)', address: 'Address', postal: 'Postal code', city: 'City', country: 'Country', saveBilling: 'Save billing details', billingSaved: 'Details saved. Thank you.', thanks: 'Thank you for your trust. Our team will send you the invoice and the contract shortly. Best regards, the Standarte team.' }
  };
  $: L = t[lang];

  // Proyecto piloto público: se enseña a mucha gente, así que la interfaz se ve
  // entera (aprobar, comentar, enviar) pero esos botones quedan inertes. En modo
  // edición interno (admin) sigue siendo plenamente operativo.
  $: demo = !admin && !!data?.is_demo;

  // Buffer de edición. Se inicializa UNA vez por sesión de edición (y al cambiar de
  // idioma), nunca al recargar datos: cada guardado parcial (celda del presupuesto,
  // descripción de un archivo, mover un archivo…) recarga `data` del servidor, y si el
  // buffer se reconstruyera entonces, machacaría lo tecleado y aún sin guardar — así se
  // perdió un descuento por pronta decisión que se escribió antes de tocar otra cosa.
  // Dentro de la sesión el único que escribe es el propio editor, así que el buffer es
  // la verdad más reciente; lo guardado converge con él en cada "Guardar cambios".
  let eb = {};
  let ebInit = false;
  let ebLang = null;
  $: if (admin && data && (!ebInit || lang !== ebLang)) { ebInit = true; ebLang = lang; eb = {
    title: data.title[lang] || '', memoria: data.memoria[lang] || '',
    includes: (data.includes[lang] || []).join('\n'), excludes: (data.excludes[lang] || []).join('\n'),
    income: data.income_account || '', paid: !!data.paid,
    clientEmail: data.client_email || '',
    discAmount: data.discount?.amount ? String(data.discount.amount) : '',
    discLabel: data.discount?.label?.[lang] || '', discDeadline: data.discount?.deadline || ''
  }; }

  // Impuestos y descuento por pronta decisión.
  // amt(): mismo criterio que el PHP al guardar ((float) con coma aceptada como decimal),
  // para que el total que se ve mientras se teclea coincida con el que quedará fijado.
  const amt = (v) => { const n = Number(String(v ?? '').trim().replace(',', '.')); return Number.isFinite(n) ? n : 0; };
  $: ivaRate = Number(data?.iva_rate ?? 0.21);
  $: irpfRate = Number(data?.irpf_rate ?? 0.15);
  $: subtotal = (data?.budget || []).reduce((s, b) => s + amt(b.amount), 0);
  $: approved = !!data?.approved;
  // En modo edición los totales siguen lo TECLEADO (buffer eb) en tiempo real; al guardar,
  // reload() trae lo persistido y ambos caminos convergen. Fuera de edición, lo guardado.
  $: discSrc = admin && eb.title !== undefined
    ? { amount: eb.discAmount, deadline: eb.discDeadline }
    : { amount: data?.discount?.amount, deadline: data?.discount?.deadline };
  $: discAmount = amt(discSrc.amount);
  $: discDeadline = discSrc.deadline ? new Date(discSrc.deadline + 'T23:59:59') : null;
  $: discValid = discAmount > 0 && (!discDeadline || new Date() <= discDeadline);
  // Al aprobar se congela: si se aprobó con oferta se mantiene el descuento; si no, desaparece.
  $: discApplied = approved ? (data?.approved_with_offer ? discAmount : 0) : (discValid ? discAmount : 0);
  $: base = subtotal - discApplied;            // base imponible
  $: iva = base * ivaRate;
  $: irpf = base * irpfRate;
  $: total = base + iva - irpf;
  $: fmt = (n) => new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, useGrouping: 'always' }).format(n);
  $: fmtDate = (d) => d ? d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  const mediaComments = (mid) => (data?.comments || []).filter((c) => c.media_id === mid);
  function fmtTime(ts) {
    try { return new Date(ts).toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return ''; }
  }
  function imageIndex(m) { return (data.media || []).filter((x) => x.type === 'image').indexOf(m) + 1; }
  function videoIndex(m) { return (data.media || []).filter((x) => x.type === 'video').indexOf(m) + 1; }
  // Vídeo embebido de Google Drive → se reproduce con <iframe> dentro del lightbox.
  const isDriveEmbed = (src) => typeof src === 'string' && src.includes('drive.google.com') && src.includes('/preview');
  const driveId = (src) => { const m = /\/file\/d\/([a-zA-Z0-9_-]+)/.exec(src || ''); const n = /[?&]id=([a-zA-Z0-9_-]+)/.exec(src || ''); return m ? m[1] : (n ? n[1] : null); };
  const driveThumb = (src) => { const id = driveId(src); return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200` : null; };
  const isDriveUrl = (src) => typeof src === 'string' && src.includes('drive.google.com');
  const drivePreview = (src) => { const id = driveId(src); return id ? `https://drive.google.com/file/d/${id}/preview` : src; };
  // Lista navegable del lightbox: imágenes, vídeos y modelos 3D con archivo.
  const isLbItem = (m) => m && (m.type === 'image' || m.type === 'video' || (m.type === 'model' && !!m.src));

  // Carga diferida del visor 3D (solo al abrir un modelo alojado en Storage).
  let mvLoaded = false;
  async function loadModelViewer() { if (mvLoaded) return; try { await import('@google/model-viewer'); } catch (e) {} mvLoaded = true; }
  $: if (lightbox && lightbox.type === 'model' && lightbox.src && !isDriveUrl(lightbox.src)) loadModelViewer();
  $: lbList = (data?.media || []).filter(isLbItem);
  $: lbIndex = lightbox ? lbList.indexOf(lightbox) : -1;
  // Vídeo del lightbox: sin barra de controles, autoplay+bucle. En móvil el
  // navegador suele bloquear el autoplay silencioso (ahorro de energía/datos),
  // así que mostramos un botón de "play" para tocar y reproducir.
  let lbVideoEl;
  let lbPlaying = false;
  function playLbVideo() { if (lbVideoEl) { lbVideoEl.play().catch(() => {}); } }
  function openLightbox(m) { if (!admin && isLbItem(m)) { lbPlaying = false; lightbox = m; } }
  function closeLightbox() { lightbox = null; }
  function lbGo(dir) {
    if (!lightbox || lbList.length < 2) return;
    const i = lbList.indexOf(lightbox);
    lbPlaying = false;
    lightbox = lbList[(i + dir + lbList.length) % lbList.length];
  }
  function onKeydownLight(e) {
    if (!lightbox) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') { e.preventDefault(); lbGo(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); lbGo(-1); }
  }

  // ── Cliente: aprobar ──
  let approving = false;
  let testimonial = ''; // C1: cita de cierre de expediente (opcional).
  async function approve() {
    if (demo) return;
    approving = true;
    try {
      await approveProject(token, discValid);
      // Vía aditiva: solo tras aprobar, y sin bloquear la aprobación si falla.
      if (testimonial.trim()) { try { await saveTestimonial(token, testimonial.trim()); } catch (e) {} }
      await reload();
    } catch (e) {} finally { approving = false; }
  }

  // ── Cliente: datos de facturación ──
  let bb = {};
  $: bb = {
    company: data?.billing?.company || '', cif: data?.billing?.cif || '', address: data?.billing?.address || '',
    postal: data?.billing?.postal_code || '', city: data?.billing?.city || '', country: data?.billing?.country || ''
  };
  let savingBilling = false, billingMsg = '';
  async function doSaveBilling() {
    savingBilling = true; billingMsg = '';
    try { await saveBilling(token, bb); await reload(); billingMsg = L.billingSaved; }
    catch (e) { billingMsg = 'Error'; } finally { savingBilling = false; }
  }

  // ── Cliente: comentar / enviar ──
  function submitComment(mid) {
    if (demo) return;
    const text = (drafts[mid] || '').trim();
    if (!text) return;
    drafts = { ...drafts, [mid]: '' };
    if (admin) { doReply(mid, text); } else { dispatch('comment', { mediaId: mid, text }); }
  }

  // ── Admin: acciones ──
  async function doReply(mid, body) {
    await adminAction(token, 'reply', { media_id: mid || '', body });
    await reload();
  }
  async function saveFields() {
    saving = true; adminMsg = '';
    const f = {}; f['title_' + lang] = eb.title; f['memoria_' + lang] = eb.memoria;
    f['includes_' + lang] = eb.includes; f['excludes_' + lang] = eb.excludes;
    f.income_account = eb.income; f.paid = eb.paid ? '1' : '0';
    f.client_email = eb.clientEmail;
    f.discount_amount = eb.discAmount || '0'; f['discount_label_' + lang] = eb.discLabel; f.discount_deadline = eb.discDeadline || '';
    const r = await adminAction(token, 'save', f);
    await reload();
    saving = false; adminMsg = r && r.ok ? L.saved : 'Error';
  }
  // El descuento se persiste al salir de cualquiera de sus tres campos, como las celdas
  // del presupuesto: así no depende de que se pulse "Guardar cambios" al final, que es
  // donde se perdía si por medio hubo cualquier otro guardado parcial.
  async function saveDiscount() {
    const f = { discount_amount: eb.discAmount || '0', discount_deadline: eb.discDeadline || '' };
    f['discount_label_' + lang] = eb.discLabel || '';
    await adminAction(token, 'save', f);
    await reload();
  }
  async function saveMediaDesc(m) {
    const f = { media_id: m.id };
    f['description_' + lang] = (m.description && m.description[lang]) || '';
    await adminAction(token, 'edit_media', f);
  }
  async function editBudget(item) {
    const f = { item_id: item.id, amount: item.amount };
    f['concept_' + lang] = item.concept[lang];
    await adminAction(token, 'edit_budget', f);
    await reload();
  }
  let nb = { concept: '', amount: '' };
  async function addBudget() {
    if (!nb.concept && !nb.amount) return;
    const f = { amount: nb.amount || '0' }; f['concept_' + lang] = nb.concept;
    await adminAction(token, 'add_budget', f);
    nb = { concept: '', amount: '' };
    await reload();
  }
  async function delBudget(id) { await adminAction(token, 'del_budget', { item_id: id }); await reload(); }
  async function delMedia(id) { await adminAction(token, 'del_media', { media_id: id }); await reload(); }

  // Reordenar archivos con las flechas ↑/↓. Se intercambia en local al instante
  // (respuesta inmediata) y se manda al servidor la lista COMPLETA de ids en su
  // nuevo orden; el PHP numera sort_order 1..N, así que el resultado es estable
  // aunque los archivos hubieran entrado todos con el 999 por defecto.
  let reordering = false;
  async function moveMedia(m, dir) {
    if (reordering || !data?.media) return;
    const list = [...data.media];
    const i = list.findIndex((x) => x.id === m.id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    data = { ...data, media: list };
    reordering = true;
    const r = await adminAction(token, 'reorder_media', { order: list.map((x) => x.id).join(',') });
    if (!r || !r.ok) adminMsg = 'No se pudo guardar el orden.';
    await reload();
    reordering = false;
  }
  async function editMediaTitle(m) { await adminAction(token, 'save_media_placeholder', {}); }

  const uploadErrMsg = {
    unauthorized: 'Sesión caducada. Recarga la página y vuelve a entrar en modo edición.',
    file_too_big: 'El archivo supera el límite de subida del servidor.',
    too_big: 'El archivo supera los 100 MB permitidos.',
    too_big_post: 'El archivo es demasiado grande para subirlo de una vez.',
    bad_mime: 'Formato no admitido (usa imagen, vídeo o .glb).',
    partial: 'La subida se interrumpió; inténtalo de nuevo.',
    storage: 'No se pudo guardar en el almacenamiento.'
  };
  async function uploadFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    uploading = true; adminMsg = '';
    for (const file of files) {
      const r = await adminUpload(token, file);
      if (!r || !r.ok) {
        const code = r && r.error ? r.error : 'network';
        adminMsg = (uploadErrMsg[code] || ('Error subiendo ' + file.name)) + (code === 'unauthorized' ? '' : ' [' + file.name + ']');
        if (code === 'unauthorized') break;
      }
    }
    await reload();
    uploading = false;
  }
  function onDrop(e) { e.preventDefault(); dragOver = false; if (e.dataTransfer?.files) uploadFiles(e.dataTransfer.files); }
  let fileInput;

  // Enlazar media desde Google Drive (no ocupa Storage).
  let nl = { url: '', type: 'image', title: '' };
  async function addMediaLink() {
    if (!nl.url.trim()) return;
    uploading = true; adminMsg = '';
    const r = await adminAction(token, 'add_media_link', { url: nl.url.trim(), type: nl.type, title: nl.title.trim() });
    if (r && r.ok) { nl = { url: '', type: 'image', title: '' }; await reload(); }
    else adminMsg = r && r.error === 'bad_drive_url' ? 'Enlace de Google Drive no válido.' : 'No se pudo enlazar el archivo.';
    uploading = false;
  }
  async function notifyClient() {
    saving = true;
    const r = await notifySend(token, 'internal');
    saving = false; adminMsg = r && r.ok ? L.sentInternal : 'Error al avisar';
  }
</script>

<svelte:window on:keydown={onKeydownLight} />

<main class="pz" class:pz-admin={admin}>
  {#if admin}
    <div class="pz-adminbar">
      <span class="pz-adminbadge">✎ {L.edit}</span>
      <button class="pz-abtn" on:click={saveFields} disabled={saving}>{saving ? '…' : L.save}</button>
      <button class="pz-abtn ghost" on:click={notifyClient} disabled={saving}>{L.notify}</button>
      {#if adminMsg}<span class="pz-adminmsg">{adminMsg}</span>{/if}
    </div>
  {/if}

  <header class="pz-top">
    <div class="pz-id">
      <span class="pz-client" class:pz-blur={demo}>{data.client_name}</span>
      <span class="pz-ref">{L.ref}: <span class:pz-blur={demo}>{data.ref}</span></span>
    </div>
    <div class="pz-toggle" role="group" aria-label="idioma">
      <button class:on={lang === 'es'} on:click={() => lang = 'es'}>ES</button>
      <button class:on={lang === 'en'} on:click={() => lang = 'en'}>EN</button>
    </div>
  </header>

  {#if admin}
    <input class="pz-edit pz-edit-title" bind:value={eb.title} placeholder={L.titlePh} />
  {:else}
    <h1 class="pz-title" class:pz-blur={demo}>{data.title[lang]}</h1>
  {/if}
  <p class="pz-inter">
    {L.interlocutor}: <strong>{data.interlocutor.name}</strong> · {data.interlocutor.role[lang]} ·
    <a href="mailto:{data.interlocutor.email}">{data.interlocutor.email}</a>
  </p>

  {#if admin}
    <div class="pz-admin-field">
      <label class="pz-elabel" for="pz-client-email">{L.clientEmail}</label>
      <input id="pz-client-email" class="pz-edit" type="email" bind:value={eb.clientEmail} placeholder={L.clientEmailPh} />
    </div>
  {/if}

  <section class="pz-block pz-media-block">
    <a class="pz-guarantee-stamp" href="https://standarte.es/proyecto-auditado" aria-label="Sistema de Proyecto Auditado" target="_blank" rel="noopener">
      <img src="/img/100x100-guaranted.png" alt="" loading="lazy" width="400" height="400" />
    </a>
    <h2 class="pz-h2">{L.media}</h2>
    {#each data.media as m, mi (m.id)}
      <article class="pz-media">
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
        <div
          class="pz-visual pz-visual-{m.type}"
          class:pz-zoomable={!admin && isLbItem(m)}
          role={!admin && isLbItem(m) ? 'button' : undefined}
          tabindex={!admin && isLbItem(m) ? 0 : undefined}
          on:click={() => openLightbox(m)}
          on:keydown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !admin && isLbItem(m)) { e.preventDefault(); openLightbox(m); } }}
        >
          {#if m.type === 'model'}
            <div class="pz-3d">◈ {L.model}</div>
            {#if m.src && !admin}<span class="pz-3d-hint">{L.viewModel} ⤢</span>{/if}
            {#if admin && m.src}<a class="pz-3d-btn" href={isDriveUrl(m.src) ? m.src : m.src} target="_blank" rel="noopener">{L.viewModel}</a>{/if}
          {:else if m.src}
            {#if m.type === 'image'}
              <img class="pz-thumb" src={m.src} alt={m.title[lang]} loading="lazy" />
            {:else if isDriveEmbed(m.src)}
              {#if driveThumb(m.src)}<img class="pz-thumb" src={driveThumb(m.src)} alt={m.title[lang]} loading="lazy" />{/if}
              <span class="pz-play" aria-hidden="true">▶</span>
            {:else}
              <video class="pz-thumb" src={m.src} poster={m.poster} preload="metadata" muted></video>
              <span class="pz-play" aria-hidden="true">▶</span>
            {/if}
            {#if !admin && isLbItem(m)}<span class="pz-zoom-hint" aria-hidden="true">⤢</span>{/if}
          {:else}
            <span class="pz-visual-tag">{m.type === 'image' ? L.image : L.video} {m.type === 'image' ? imageIndex(m) : videoIndex(m)}</span>
            {#if m.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}
            <span class="pz-visual-title">{m.title[lang]}</span>
          {/if}
          {#if admin}
            <button class="pz-del-media" title={L.del} on:click|stopPropagation={() => delMedia(m.id)}>×</button>
            <div class="pz-order">
              <button class="pz-ord-btn" title="Subir en el orden" disabled={mi === 0 || reordering} on:click|stopPropagation={() => moveMedia(m, -1)}>↑</button>
              <span class="pz-ord-n">{mi + 1}</span>
              <button class="pz-ord-btn" title="Bajar en el orden" disabled={mi === data.media.length - 1 || reordering} on:click|stopPropagation={() => moveMedia(m, 1)}>↓</button>
            </div>
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
            <input type="text" placeholder={admin ? L.replyPh : L.commentPh} bind:value={drafts[m.id]} disabled={demo} on:keydown={(e) => { if (e.key === 'Enter') submitComment(m.id); }} />
            <button type="button" on:click={() => submitComment(m.id)} disabled={demo}>{admin ? L.reply : L.comment}</button>
          </div>
        </div>

        {#if admin}
          <div class="pz-mediadesc">
            <label class="pz-elabel" for="desc-{m.id}">{L.mediaDescLabel}</label>
            <input id="desc-{m.id}" class="pz-edit" bind:value={m.description[lang]} on:blur={() => saveMediaDesc(m)} placeholder={L.mediaDescPh} />
          </div>
        {/if}
      </article>
    {/each}

    {#if admin}
      <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
      <div class="pz-drop" class:over={dragOver}
        on:dragover|preventDefault={() => dragOver = true}
        on:dragleave={() => dragOver = false}
        on:drop={onDrop}
        on:click={() => fileInput.click()}>
        {uploading ? '⏳ Subiendo…' : '⤓ ' + L.drop}
        <input bind:this={fileInput} type="file" accept="image/*,video/*,.glb" multiple hidden on:change={(e) => uploadFiles(e.target.files)} />
      </div>

      <div class="pz-drive">
        <div class="pz-drive-head">🔗 {L.driveTitle}</div>
        <div class="pz-drive-row">
          <select bind:value={nl.type} class="pz-drive-type">
            <option value="image">{L.image}</option>
            <option value="video">{L.video}</option>
            <option value="model">{L.model}</option>
          </select>
          <input class="pz-drive-url" type="url" bind:value={nl.url} placeholder={L.driveUrlPh} />
          <input class="pz-drive-t" type="text" bind:value={nl.title} placeholder={L.driveTitlePh} />
          <button class="pz-drive-add" type="button" on:click={addMediaLink} disabled={uploading}>{L.driveAdd}</button>
        </div>
        <p class="pz-drive-hint">{L.driveHint}</p>
      </div>
    {/if}
  </section>

  <section class="pz-block">
    <h2 class="pz-h2">{L.memoria}</h2>
    {#if admin}
      <textarea class="pz-edit" rows="3" bind:value={eb.memoria} placeholder={L.memoriaPh}></textarea>
      <div class="pz-inex">
        <div><label class="pz-elabel">{L.includes} {L.linesHint}</label><textarea class="pz-edit" rows="3" bind:value={eb.includes}></textarea></div>
        <div><label class="pz-elabel">{L.excludes} {L.linesHint}</label><textarea class="pz-edit" rows="3" bind:value={eb.excludes}></textarea></div>
      </div>
    {:else}
      <p class="pz-memoria">{data.memoria[lang]}</p>
      <div class="pz-inex">
        <div><h3 class="pz-h3">{L.includes}</h3><ul>{#each data.includes[lang] as it}<li>{it}</li>{/each}</ul></div>
        <div><h3 class="pz-h3">{L.excludes}</h3><ul class="pz-ex">{#each data.excludes[lang] as it}<li>{it}</li>{/each}</ul></div>
      </div>
    {/if}
  </section>

  <section class="pz-block">
    <h2 class="pz-h2">{L.budget}</h2>
    <div class="pz-sheet-wrap">
      {#if data.paid}<div class="pz-stamp">{L.paid}</div>{/if}
      {#if approved}<div class="pz-stamp pz-stamp-approved">{L.approved}</div>{/if}
      <table class="pz-sheet">
        <thead><tr><th>{L.concept}</th><th class="num">{L.amount}</th>{#if admin}<th></th>{/if}</tr></thead>
        <tbody>
          {#each data.budget as it (it.id || it.concept[lang])}
            <tr>
              {#if admin}
                <td><input class="pz-cell" bind:value={it.concept[lang]} on:blur={() => editBudget(it)} /></td>
                <!-- La autoasignación de `data` fuerza el recálculo de los totales en cada
                     pulsación: al teclear se muta la fila dentro de data.budget y los `$:`
                     que dependen de `data` no se re-ejecutan solos. Al salir del campo
                     (blur) se persiste y reload() deja fijado lo guardado. -->
                <td class="num"><input class="pz-cell pz-cell-num" inputmode="decimal" bind:value={it.amount} on:input={() => { data = data; }} on:blur={() => editBudget(it)} /></td>
                <td><button class="pz-del" on:click={() => delBudget(it.id)}>×</button></td>
              {:else}
                <td>{it.concept[lang]}</td><td class="num">{fmt(Number(it.amount))}</td>
              {/if}
            </tr>
          {/each}
          {#if admin}
            <tr class="pz-addrow">
              <td><input class="pz-cell" bind:value={nb.concept} placeholder="+ {L.concept}" /></td>
              <td class="num"><input class="pz-cell pz-cell-num" bind:value={nb.amount} placeholder="€" /></td>
              <td><button class="pz-add" on:click={addBudget}>+</button></td>
            </tr>
          {/if}
        </tbody>
        <tfoot>
          {#if discAmount > 0}
            <tr><td>{L.subtotal}</td><td class="num">{fmt(subtotal)}</td>{#if admin}<td></td>{/if}</tr>
            <tr class="pz-disc" class:expired={discApplied === 0}>
              <td>{data.discount?.label?.[lang] || L.promptDiscount}{#if discDeadline} · {L.until} <strong>{fmtDate(discDeadline)}</strong>{/if}{#if discApplied === 0} ({L.expired}){/if}</td>
              <td class="num">{discApplied > 0 ? '− ' + fmt(discApplied) : '—'}</td>{#if admin}<td></td>{/if}
            </tr>
          {/if}
          <tr class="sum"><td>{L.base}</td><td class="num">{fmt(base)}</td>{#if admin}<td></td>{/if}</tr>
          <tr><td>{L.iva}</td><td class="num">+ {fmt(iva)}</td>{#if admin}<td></td>{/if}</tr>
          <tr><td>{L.irpf}</td><td class="num">− {fmt(irpf)}</td>{#if admin}<td></td>{/if}</tr>
          <tr class="grand"><td>{L.total}</td><td class="num"><span class:pz-blur={demo}>{fmt(total)}</span></td>{#if admin}<td></td>{/if}</tr>
        </tfoot>
      </table>
    </div>
    {#if admin}
      <div class="pz-disc-edit">
        <label class="pz-elabel">{L.promptDiscount}</label>
        <div class="pz-disc-edit-row">
          <input class="pz-edit pz-disc-amount" inputmode="decimal" bind:value={eb.discAmount} on:blur={saveDiscount} placeholder={L.discAmountPh} />
          <input class="pz-edit pz-disc-date" type="date" bind:value={eb.discDeadline} on:change={saveDiscount} />
          <input class="pz-edit pz-disc-label" bind:value={eb.discLabel} on:blur={saveDiscount} placeholder={L.discLabelPh} />
        </div>
        <p class="pz-drive-hint">{L.discHint}</p>
      </div>
      <label class="pz-elabel" style="margin-top:12px;display:block">{L.account}</label>
      <input class="pz-edit" bind:value={eb.income} placeholder={L.accountPh} />
      <label class="pz-paidtoggle"><input type="checkbox" bind:checked={eb.paid} /> {L.paid}</label>
      {#if approved}
        <div class="pz-admin-bill">
          <p class="pz-approved-note">✓ {L.approved} · {L.approvedOn} {data.approved_at ? fmtDate(new Date(data.approved_at)) : ''}{data.approved_with_offer ? ' · ' + L.approveWithOffer : ''}</p>
          {#if data.billing && (data.billing.company || data.billing.cif || data.billing.address)}
            <dl class="pz-paylist pz-bill-ro">
              <div><dt>{L.razon}</dt><dd>{data.billing.company || '—'}</dd></div>
              <div><dt>{L.cif}</dt><dd>{data.billing.cif || '—'}</dd></div>
              <div><dt>{L.address}</dt><dd>{[data.billing.address, data.billing.postal_code, data.billing.city, data.billing.country].filter(Boolean).join(' · ') || '—'}</dd></div>
            </dl>
          {/if}
        </div>
      {/if}
    {:else if approved}
      <div class="pz-payinfo">
        <h3 class="pz-h3">{L.payTitle}</h3>
        <dl class="pz-paylist">
          {#if data.income_account}<div><dt>{L.account}</dt><dd>{data.income_account}</dd></div>{/if}
          <div><dt>BIC</dt><dd>CJALESSSXXX</dd></div>
          <div><dt>{L.subject}</dt><dd>{data.title[lang]}</dd></div>
          <div><dt>{L.beneficiary}</dt><dd>Francisco Javier García Márquez · DNI 34779359R <span class="pz-owner">({L.owner})</span></dd></div>
        </dl>
        {#if data.approved_at}<p class="pz-approved-note">✓ {L.approvedOn} {fmtDate(new Date(data.approved_at))}</p>{/if}

        <h3 class="pz-h3 pz-billing-h3">{L.billingTitle}</h3>
        <div class="pz-billing">
          <label><span class="pz-elabel">{L.razon}</span><input class="pz-edit" bind:value={bb.company} /></label>
          <label><span class="pz-elabel">{L.cif}</span><input class="pz-edit" bind:value={bb.cif} /></label>
          <label class="pz-billing-wide"><span class="pz-elabel">{L.address}</span><input class="pz-edit" bind:value={bb.address} /></label>
          <label><span class="pz-elabel">{L.postal}</span><input class="pz-edit" bind:value={bb.postal} /></label>
          <label><span class="pz-elabel">{L.city}</span><input class="pz-edit" bind:value={bb.city} /></label>
          <label><span class="pz-elabel">{L.country}</span><input class="pz-edit" bind:value={bb.country} /></label>
        </div>
        <div class="pz-billing-actions">
          <button class="pz-abtn" type="button" on:click={doSaveBilling} disabled={savingBilling}>{savingBilling ? '…' : L.saveBilling}</button>
          {#if billingMsg}<span class="pz-billing-msg">{billingMsg}</span>{/if}
        </div>

        <p class="pz-thanks">{L.thanks}</p>
      </div>
    {:else}
      <div class="pz-approve-wrap">
        <!-- C1: cita de cierre de expediente (opcional), atada a la aprobación. -->
        <textarea class="pz-testimonial" bind:value={testimonial} rows="2" placeholder={L.testimonialPh} disabled={approving || demo}></textarea>
        <button class="pz-approve" class:pz-approve-offer={discValid} type="button" on:click={approve} disabled={approving || demo}>
          {approving ? '…' : (discValid ? L.approveWithOffer : L.approve)}
        </button>
      </div>
    {/if}
  </section>

  {#if lightbox}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="pz-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title[lang]} on:click|self={closeLightbox}>
      <button class="pz-lb-close" type="button" on:click={closeLightbox} aria-label="×">×</button>
      {#if lbList.length > 1}
        <button class="pz-lb-nav prev" type="button" on:click|stopPropagation={() => lbGo(-1)} aria-label="Anterior">‹</button>
        <button class="pz-lb-nav next" type="button" on:click|stopPropagation={() => lbGo(1)} aria-label="Siguiente">›</button>
      {/if}
      {#key lightbox.id}
        <figure class="pz-lb-inner">
          {#if lightbox.src}
            {#if lightbox.type === 'image'}<img src={lightbox.src} alt={lightbox.title[lang]} />
            {:else if lightbox.type === 'model'}
              {#if isDriveUrl(lightbox.src)}
                <iframe class="pz-lb-iframe" src={drivePreview(lightbox.src)} title={lightbox.title[lang]} allow="autoplay; fullscreen" allowfullscreen></iframe>
              {:else}
                <!-- svelte-ignore a11y-unknown-role -->
                <!-- max-camera-orbit phi=90deg: la órbita vertical no pasa de la horizontal,
                     así el modelo NO se puede ver por debajo de la línea de suelo.
                     auto-rotate + rotation-per-second lento: al terminar de cargar, gira solo despacio.
                     slot="poster": mientras el modelo carga se muestra "Loading…". -->
                <model-viewer
                  class="pz-lb-model"
                  src={lightbox.src}
                  camera-controls
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="12deg"
                  max-camera-orbit="Infinity 90deg auto"
                  touch-action="pan-y"
                  ar
                  shadow-intensity="1"
                >
                  <div class="pz-lb-model-loading" slot="poster">Loading…</div>
                </model-viewer>
              {/if}
            {:else if isDriveEmbed(lightbox.src)}<iframe class="pz-lb-iframe" src={lightbox.src} title={lightbox.title[lang]} allow="autoplay; fullscreen" allowfullscreen></iframe>
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
            <div class="pz-lb-ph pz-visual-{lightbox.type}">{#if lightbox.type === 'video'}<span class="pz-play" aria-hidden="true">▶</span>{/if}</div>
          {/if}
          <figcaption>
            <span class="pz-lb-caption">
              {lightbox.title[lang]}
              {#if lbList.length > 1}<span class="pz-lb-count">{lbIndex + 1} / {lbList.length}</span>{/if}
            </span>
            {#if lightbox.description && lightbox.description[lang]}
              <span class="pz-lb-desc">{lightbox.description[lang]}</span>
            {/if}
          </figcaption>
        </figure>
      {/key}
    </div>
  {/if}

  {#if !admin}
    <footer class="pz-foot">
      {#if sent}<p class="pz-sent">✓ {role === 'client' ? L.sentClient : L.sentInternal}</p>{/if}
      <button class="pz-send" type="button" disabled={busy || demo} on:click={() => dispatch('send')}>
        {busy ? '…' : L.send} →
      </button>
    </footer>
  {/if}
</main>

<style>
  :global(html:has(.pz)), :global(html:has(.pz) body) { background: #f4f3ee; }
  .pz { position: relative; max-width: 920px; margin: 0 auto; padding: 28px 18px 80px; font-family: 'Inconsolata', ui-monospace, 'SF Mono', 'JetBrains Mono', monospace; color: #1b1b1a; font-size: 15px; line-height: 1.5; }

  /* Sello de garantía: mismo tamaño que en la ficha pública de proyecto
     (src/routes/proyectos/[id]/+page.svelte), pero aquí a la altura de la
     cabecera "PROPUESTA GRÁFICA" en lugar de arriba del todo de la página. */
  .pz-media-block {
    position: relative;
  }
  .pz-guarantee-stamp {
    display: block;
    position: absolute;
    top: -18px;
    right: 6px;
    width: 150px;
    height: 150px;
    z-index: 5;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
    transition: transform 0.2s ease;
  }
  .pz-guarantee-stamp:hover {
    transform: scale(1.05);
  }
  .pz-guarantee-stamp img {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .pz-guarantee-stamp {
      width: 100px;
      height: 100px;
      top: -10px;
      right: 4px;
    }
  }
  .pz-admin { padding-top: 68px; }

  .pz-adminbar { position: fixed; top: 0; left: 0; right: 0; z-index: 900; display: flex; align-items: center; gap: 12px; padding: 10px 18px; background: #1b1b1a; color: #fff; }
  .pz-adminbadge { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #ffc800; font-weight: 700; }
  .pz-abtn { background: #ffc800; color: #111; border: none; padding: 7px 16px; font-family: inherit; font-weight: 700; border-radius: 4px; cursor: pointer; }
  .pz-abtn.ghost { background: transparent; color: #ffc800; border: 1px solid #ffc800; }
  .pz-abtn:disabled { opacity: .5; }
  .pz-adminmsg { font-size: 13px; color: #a5d6a7; }

  .pz-edit { width: 100%; box-sizing: border-box; background: #fff; border: 1px solid #cfcdc4; border-radius: 6px; padding: 10px 12px; font-family: inherit; font-size: 15px; color: #1b1b1a; margin-bottom: 10px; }
  .pz-edit-title { font-size: 22px; font-weight: 700; margin: 18px 0 6px; }
  .pz-elabel { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #888; }

  .pz-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 2px solid #1b1b1a; padding-bottom: 12px; }
  .pz-id { display: flex; flex-direction: column; }
  .pz-client { font-size: 22px; font-weight: 700; letter-spacing: 0.02em; }
  .pz-ref { font-size: 13px; color: #666; }
  .pz-toggle { display: inline-flex; border: 1px solid #1b1b1a; border-radius: 4px; overflow: hidden; }
  .pz-toggle button { background: #fff; border: none; padding: 6px 12px; font-family: inherit; font-size: 13px; cursor: pointer; color: #1b1b1a; }
  .pz-toggle button.on { background: #1b1b1a; color: #fff; }
  .pz-title { font-size: 26px; font-weight: 700; margin: 22px 0 6px; letter-spacing: -0.01em; }
  /* Piloto público: emborrona (redacta visualmente) el nombre del proyecto y el
     total del presupuesto para no exponer cliente/importes reales. */
  .pz-blur { filter: blur(6px); -webkit-user-select: none; user-select: none; }
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
  .pz-3d-btn { background: none; border: 1px solid #f4f3ee; color: #f4f3ee; padding: 6px 14px; border-radius: 4px; font-family: inherit; font-size: 12px; cursor: pointer; text-decoration: none; }
  .pz-del-media { position: absolute; top: 6px; right: 6px; width: 26px; height: 26px; border: none; border-radius: 50%; background: rgba(192,57,43,.9); color: #fff; font-size: 16px; cursor: pointer; z-index: 3; }
  /* Controles de orden (solo en modo edición): esquina superior izquierda, el borrar queda a la derecha. */
  .pz-order { position: absolute; top: 6px; left: 6px; display: flex; align-items: center; gap: 4px; z-index: 3; background: rgba(0,0,0,.55); border-radius: 14px; padding: 2px 6px; }
  .pz-ord-btn { width: 24px; height: 24px; border: none; border-radius: 50%; background: rgba(255,255,255,.15); color: #fff; font-size: 14px; line-height: 1; cursor: pointer; }
  .pz-ord-btn:hover:not(:disabled) { background: #ffc800; color: #111; }
  .pz-ord-btn:disabled { opacity: .35; cursor: default; }
  .pz-ord-n { color: #fff; font-size: 12px; font-weight: 700; min-width: 14px; text-align: center; }
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
  .pz-compose input:disabled, .pz-compose button:disabled { opacity: .5; cursor: not-allowed; }
  .pz-drop { border: 2px dashed #b9b6a8; border-radius: 10px; padding: 26px; text-align: center; color: #7a776b; cursor: pointer; background: #faf9f4; transition: all .15s; }
  .pz-drop.over { border-color: #1b1b1a; background: #f0eee5; color: #1b1b1a; }
  .pz-lb-iframe { width: min(1100px, 94vw); aspect-ratio: 16 / 9; max-height: 80vh; border: 0; background: #000; }
  .pz-lb-model { width: min(1100px, 94vw); height: 80vh; background: #111; border: 1px solid rgba(255,255,255,0.2); --poster-color: transparent; }
  /* "Loading…" mientras el modelo 3D carga (slot="poster" de model-viewer). */
  .pz-lb-model-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Inconsolata', monospace;
    font-size: 15px;
    letter-spacing: 0.08em;
    text-transform: none;
    animation: pzModelLoadingPulse 1.4s ease-in-out infinite;
  }
  @keyframes pzModelLoadingPulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 1; }
  }
  .pz-3d-hint { font-size: 12px; color: #cfcdc4; border: 1px solid rgba(244,243,238,0.5); border-radius: 4px; padding: 5px 12px; }
  .pz-drive { margin-top: 12px; border: 1px solid #cfcdc4; border-radius: 10px; padding: 14px; background: #fbfbf7; }
  .pz-drive-head { font-size: 13px; font-weight: 700; color: #1b1b1a; margin-bottom: 10px; }
  .pz-drive-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .pz-drive-type { border: 1px solid #cfcdc4; border-radius: 6px; padding: 8px; font-family: inherit; font-size: 14px; background: #fff; }
  .pz-drive-url { flex: 2 1 240px; border: 1px solid #cfcdc4; border-radius: 6px; padding: 8px 10px; font-family: inherit; font-size: 14px; }
  .pz-drive-t { flex: 1 1 140px; border: 1px solid #cfcdc4; border-radius: 6px; padding: 8px 10px; font-family: inherit; font-size: 14px; }
  .pz-drive-add { background: #1b1b1a; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-family: inherit; font-weight: 700; cursor: pointer; }
  .pz-drive-add:disabled { opacity: .5; }
  .pz-drive-hint { font-size: 12px; color: #8a8779; margin: 8px 0 0; }
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
  .pz-cell { width: 100%; box-sizing: border-box; border: 1px solid #e2e0d7; border-radius: 4px; padding: 6px 8px; font-family: inherit; font-size: 14px; background: #fbfbf7; }
  .pz-cell-num { text-align: right; }
  .pz-del, .pz-add { border: none; width: 26px; height: 26px; border-radius: 4px; cursor: pointer; font-weight: 700; }
  .pz-del { background: #c0392b; color: #fff; }
  .pz-add { background: #2e7d32; color: #fff; }
  .pz-addrow td { background: #faf9f4; }
  .pz-paidtoggle { display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 14px; }
  .pz-paidtoggle input { width: 16px; height: 16px; accent-color: #c0392b; }
  .pz-stamp { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-16deg); border: 4px solid #c0392b; color: #c0392b; font-size: 40px; font-weight: 700; letter-spacing: 0.1em; padding: 6px 26px; border-radius: 8px; opacity: 0.85; pointer-events: none; z-index: 2; }
  .pz-account { font-size: 14px; margin: 14px 0 0; }
  .pz-stamp-approved { top: 30%; border-color: #c0392b; color: #c0392b; transform: translate(-50%, -50%) rotate(-10deg); }
  .pz-approve-wrap { margin-top: 18px; text-align: center; }
  .pz-testimonial { display: block; width: 100%; max-width: 520px; margin: 0 auto 12px; box-sizing: border-box; background: #fff; border: 1px solid #cfcdc4; border-radius: 6px; padding: 10px 12px; font-family: inherit; font-size: 14px; color: #1b1b1a; resize: vertical; }
  .pz-testimonial::placeholder { color: #999; }
  .pz-approve { background: #1b1b1a; color: #fff; border: none; padding: 15px 36px; font-family: inherit; font-size: 16px; font-weight: 700; letter-spacing: 0.02em; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
  .pz-approve:hover:not(:disabled) { background: #c0392b; }
  .pz-approve-offer { background: #c0392b; }
  .pz-approve-offer:hover:not(:disabled) { background: #a5281b; }
  .pz-approve:disabled { opacity: 0.5; cursor: default; }
  .pz-payinfo { margin-top: 18px; border: 1px solid #1b1b1a; border-radius: 8px; padding: 16px 18px; background: #fff; }
  .pz-payinfo .pz-h3 { margin-top: 0; }
  .pz-paylist { margin: 0; display: grid; gap: 8px; }
  .pz-paylist > div { display: flex; gap: 12px; flex-wrap: wrap; border-bottom: 1px dashed #e2e0d7; padding-bottom: 8px; }
  .pz-paylist > div:last-child { border-bottom: none; padding-bottom: 0; }
  .pz-paylist dt { flex: 0 0 130px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #888; margin: 0; }
  .pz-paylist dd { flex: 1 1 200px; margin: 0; font-weight: 700; }
  .pz-owner { font-weight: 400; color: #888; font-size: 12px; }
  .pz-approved-note { margin: 12px 0 0; font-size: 13px; color: #2e7d32; }
  .pz-billing-h3 { margin-top: 22px; border-top: 1px dashed #e2e0d7; padding-top: 16px; }
  .pz-billing { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
  .pz-billing label { display: flex; flex-direction: column; gap: 4px; }
  .pz-billing label .pz-edit { margin-bottom: 0; }
  .pz-billing-wide { grid-column: 1 / -1; }
  .pz-billing-actions { margin-top: 12px; display: flex; align-items: center; gap: 12px; }
  .pz-billing-actions .pz-abtn { background: #1b1b1a; color: #fff; }
  .pz-billing-msg { font-size: 13px; color: #2e7d32; }
  .pz-thanks { margin: 20px 0 0; padding-top: 14px; border-top: 1px solid #e2e0d7; font-size: 14px; line-height: 1.6; color: #444; }
  .pz-admin-bill { margin-top: 14px; border: 1px solid #cfcdc4; border-radius: 8px; padding: 12px 14px; background: #fbfbf7; }
  .pz-bill-ro { margin-top: 8px; }
  @media (max-width: 700px) { .pz-billing { grid-template-columns: 1fr; } }
  .pz-zoomable { cursor: zoom-in; }
  .pz-zoom-hint { position: absolute; top: 8px; right: 8px; font-size: 18px; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.5); opacity: 0.85; z-index: 1; }
  .pz-lightbox { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(20, 20, 18, 0.88); }
  .pz-lb-close { position: absolute; top: 16px; right: 20px; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: #fff; font-size: 26px; line-height: 1; border-radius: 50%; cursor: pointer; }
  .pz-lb-close:hover { background: rgba(255,255,255,0.12); }
  .pz-lb-inner { margin: 0; max-width: min(1100px, 94vw); max-height: 88vh; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
  /* Tope DEFINITO en unidades de viewport (no %): un max-width en % se resuelve contra
     el contenedor inline-flex, cuya anchura depende del propio vídeo → nunca limitaba y
     en móvil el vídeo desbordaba toda la pantalla. min(1100px,92vw) siempre acota. */
  .pz-lb-inner img, .pz-lb-inner video { max-width: min(1100px, 92vw); max-height: 80vh; object-fit: contain; border: 1px solid rgba(255,255,255,0.2); background: #000; }
  /* Vídeo del lightbox: contenedor para el botón de "play" (toca para reproducir en móvil). */
  .pz-lb-video { position: relative; display: flex; justify-content: center; align-items: center; max-width: 100%; min-width: 0; }
  .pz-lb-video video { cursor: pointer; }
  .pz-lb-video-play {
    position: absolute; inset: 0; margin: auto;
    width: 76px; height: 76px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.85);
    background: rgba(0,0,0,0.45);
    color: #fff; font-size: 26px; line-height: 1; padding-left: 5px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .pz-lb-video-play:hover { background: rgba(0,0,0,0.65); transform: scale(1.06); }
  .pz-lb-ph { width: min(900px, 90vw); aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center; }
  .pz-lb-inner figcaption { color: #eceae2; font-family: 'Inconsolata', monospace; font-size: 15px; text-align: center; }
  .pz-lb-count { display: inline-block; margin-left: 10px; color: #b9b6a8; font-variant-numeric: tabular-nums; }
  .pz-lb-caption { display: block; }
  .pz-lb-desc { display: block; margin-top: 6px; color: #cfcdc4; font-size: 13px; line-height: 1.4; max-width: 640px; margin-left: auto; margin-right: auto; }
  .pz-admin-field { margin: 6px 0 0; }
  .pz-mediadesc { grid-column: 1 / -1; margin-top: 4px; }
  .pz-mediadesc .pz-edit { margin-bottom: 0; }
  .pz-disc { color: #c0392b; }
  .pz-disc.expired { color: #aaa; text-decoration: line-through; }
  .pz-disc-edit { margin-top: 16px; border: 1px dashed #cfcdc4; border-radius: 8px; padding: 12px; background: #fbfbf7; }
  .pz-disc-edit-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .pz-disc-edit-row .pz-edit { margin-bottom: 0; }
  .pz-disc-amount { flex: 1 1 160px; }
  .pz-disc-date { flex: 0 0 auto; }
  .pz-disc-label { flex: 2 1 200px; }
  .pz-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border: 1px solid rgba(255,255,255,0.35); background: rgba(20,20,18,0.45); color: #fff; font-size: 34px; line-height: 1; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; padding-bottom: 4px; transition: background 0.15s; z-index: 2; }
  .pz-lb-nav:hover { background: rgba(255,255,255,0.16); }
  .pz-lb-nav.prev { left: 20px; }
  .pz-lb-nav.next { right: 20px; }
  @media (max-width: 700px) { .pz-lb-nav { width: 42px; height: 42px; font-size: 26px; } .pz-lb-nav.prev { left: 8px; } .pz-lb-nav.next { right: 8px; } }
  .pz-foot { margin-top: 44px; text-align: center; border-top: 2px solid #1b1b1a; padding-top: 24px; }
  .pz-sent { color: #2e7d32; margin: 0 0 14px; font-size: 15px; }
  .pz-send { background: #1b1b1a; color: #fff; border: none; padding: 14px 40px; font-family: inherit; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; border-radius: 4px; transition: background 0.2s ease; }
  .pz-send:hover:not(:disabled) { background: #000; }
  .pz-send:disabled { opacity: 0.5; cursor: default; }
  @media (max-width: 700px) { .pz-media { grid-template-columns: 1fr; } .pz-inex { grid-template-columns: 1fr; } }
</style>
