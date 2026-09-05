<script>
  // Documentación del proyecto aprobado (contrato y facturas en PDF).
  //
  // Vive en su propio componente porque tiene que aparecer en DOS sitios de la página:
  // en modo edición —donde el equipo sube y borra— y en la vista del cliente —donde
  // solo se descarga—. Son ramas distintas de la plantilla ({#if admin} … {:else}),
  // así que duplicar el marcado habría dejado dos copias que se desincronizan; nació
  // así por error y el resultado fue que en modo edición no se veía por ninguna parte.
  import { adminAction, adminUploadDoc, docUrl } from '$lib/clientProject.js';

  export let docs = [];
  export let admin = false;
  export let token = '';
  export let L;
  export let reload = async () => {};
  // Estado del trámite de cada tipo de documento (client_projects.contract_state /
  // invoice_state / invoice2_state), indexado por `kind`. Lo cambia el equipo desde el
  // panel: «Emitido» = enviado y a la espera; «Cursado» = firmado devuelto o cobrado.
  export let states = {};

  // Etiqueta de estado junto al documento. Latente (a la espera) en verde, con botón
  // de reenvío por si el cliente perdió el correo; pasivo (resuelto) en gris.
  function docState(d) {
    const st = states && states[d.kind];
    if (!st || st === 'pendiente') return null;
    const isContract = d.kind === 'contrato';
    if (st === 'emitido') return { cls: 'pz-tag-live', text: isContract ? L.stContractWait : L.stInvoiceWait, live: true };
    if (st === 'cursado') return { cls: 'pz-tag-done', text: isContract ? L.stContractDone : L.stInvoiceDone, live: false };
    return null;
  }

  let resent = {};   // id → email al que se reenvió (para el aviso en línea)
  let resendErr = '';
  async function resend(id) {
    busy = true; resendErr = '';
    try {
      const r = await adminAction(token, 'resend_doc', { doc_id: id });
      if (r && r.ok) resent = { ...resent, [id]: r.email };
      else resendErr = r && r.error === 'unauthorized' ? L.sessionExpired : `${L.resendError}${r && r.error ? ` (${r.error})` : ''}`;
    } catch (err) { resendErr = L.resendError; } finally { busy = false; }
  }

  let kind = 'contrato';
  let title = '';
  let busy = false;
  let msg = '';

  const kindLabel = (k) => ({ contrato: L.docContract, factura_anticipo: L.docAdvance, factura_final: L.docFinal }[k] || L.docOther);
  const size = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

  async function upload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    msg = '';
    if (file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) { msg = L.docNotPdf; e.target.value = ''; return; }
    if (file.size > 20971520) { msg = L.docTooBig; e.target.value = ''; return; }
    busy = true;
    try {
      const r = await adminUploadDoc(token, file, kind, title);
      if (r && r.ok) { title = ''; await reload(); } else { msg = errorText(r); }
    } catch (err) { msg = L.docError; } finally { busy = false; e.target.value = ''; }
  }
  // El motivo real del fallo se enseña junto al mensaje: un "no se pudo subir" a secas
  // obligaba a desplegar solo para averiguar qué había pasado (ocurrió: el bucket
  // rechazaba los PDF y desde fuera no había forma de saberlo).
  function errorText(r) {
    const e = r && r.error;
    if (e === 'not_pdf') return L.docNotPdf;
    if (e === 'too_big' || e === 'too_big_post') return L.docTooBig;
    if (e === 'unauthorized') return L.sessionExpired;
    return `${L.docError}${e ? ` (${e}${r.code ? ' ' + r.code : ''})` : ''}`;
  }

  async function del(id) {
    busy = true;
    try { await adminAction(token, 'del_doc', { doc_id: id }); await reload(); } finally { busy = false; }
  }
</script>

<h3 class="pz-h3 pz-docs-h3">{L.docsTitle}</h3>
{#if docs.length}
  <ul class="pz-docs">
    {#each docs as d}
      <li>
        <a class="pz-doc-link" href={docUrl(token, d.id)} target="_blank" rel="noopener">
          <span class="pz-doc-kind">{kindLabel(d.kind)}</span>
          <span class="pz-doc-title">{d.title}</span>
          <span class="pz-doc-meta">PDF · {size(d.size_bytes || 0)}</span>
        </a>
        {#if docState(d)}
          {@const st = docState(d)}
          <span class="pz-doc-state">
            <span class="pz-tag {st.cls}">{st.text}</span>
            {#if admin && st.live}
              {#if resent[d.id]}
                <span class="pz-doc-resent">{L.resent} {resent[d.id]}</span>
              {:else}
                <button type="button" class="pz-doc-resend" on:click={() => resend(d.id)} disabled={busy} title={L.resendTitle}>{L.resend}</button>
              {/if}
            {/if}
          </span>
        {/if}
        {#if admin}<button type="button" class="pz-doc-del" on:click={() => del(d.id)} disabled={busy}>{L.del}</button>{/if}
      </li>
    {/each}
  </ul>
{:else}
  <p class="pz-docs-empty">{admin ? L.docsEmptyAdmin : L.docsEmpty}</p>
{/if}
{#if admin}
  <div class="pz-doc-add">
    <select bind:value={kind} class="pz-edit pz-doc-select" aria-label={L.docKind}>
      <option value="contrato">{L.docContract}</option>
      <option value="factura_anticipo">{L.docAdvance}</option>
      <option value="factura_final">{L.docFinal}</option>
      <option value="otro">{L.docOther}</option>
    </select>
    <input class="pz-edit pz-doc-t" bind:value={title} placeholder={L.docTitlePh} />
    <label class="pz-abtn pz-doc-btn" class:pz-doc-busy={busy}>
      {busy ? '…' : L.docAdd}
      <input type="file" accept="application/pdf,.pdf" on:change={upload} disabled={busy} hidden />
    </label>
  </div>
  {#if msg}<p class="pz-doc-msg">{msg}</p>{/if}
  {#if resendErr}<p class="pz-doc-msg">{resendErr}</p>{/if}
{/if}

<style>
  .pz-h3 { font-size: 15px; font-weight: 700; margin: 18px 0 6px; }
  .pz-docs-h3 { border-top: 1px solid #e2e0d7; padding-top: 14px; }
  .pz-docs { list-style: none; margin: 8px 0 0; padding: 0; }
  .pz-docs li { display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #e2e0d7; padding: 8px 0; }
  .pz-doc-link { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; text-decoration: none; color: #1b1b1a; flex: 1 1 auto; min-width: 0; }
  .pz-doc-link:hover .pz-doc-title { text-decoration: underline; }
  .pz-doc-kind { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #8a6d00; font-weight: 700; }
  .pz-doc-title { font-weight: 700; overflow-wrap: anywhere; }
  .pz-doc-meta { font-size: 12px; color: #888; }
  .pz-doc-del { background: transparent; border: none; color: #c62828; cursor: pointer; font: inherit; font-size: 12px; }
  .pz-doc-state { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px; flex: 0 1 auto; justify-content: flex-end; }
  .pz-tag { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .03em; line-height: 1.3; padding: 4px 9px; border-radius: 12px; white-space: normal; text-align: center; }
  .pz-tag-live { background: #e6f4ea; color: #1e7e34; border: 1px solid #b7dfc0; }
  .pz-tag-done { background: #efefec; color: #6b6b66; border: 1px solid #d9d8d0; }
  .pz-doc-resend { background: transparent; border: 1px solid #1e7e34; color: #1e7e34; border-radius: 12px; padding: 3px 9px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
  .pz-doc-resend:hover { background: #e6f4ea; }
  .pz-doc-resend:disabled { opacity: .5; cursor: default; }
  .pz-doc-resent { font-size: 11px; color: #1e7e34; }
  @media (max-width: 560px) { .pz-docs li { flex-wrap: wrap; } .pz-doc-state { flex-basis: 100%; justify-content: flex-start; } }
  .pz-docs-empty { font-size: 14px; color: #666; margin: 8px 0 0; }
  .pz-doc-add { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 10px; }
  .pz-edit { background: #fff; border: 1px solid #cfcdc4; border-radius: 6px; padding: 10px 12px; font-family: inherit; font-size: 15px; color: #1b1b1a; }
  .pz-doc-select { width: auto; margin: 0; }
  .pz-doc-t { flex: 1 1 220px; margin: 0; min-width: 0; }
  .pz-abtn { background: #ffc800; color: #111; border: none; padding: 9px 18px; font-family: inherit; font-weight: 700; border-radius: 4px; }
  .pz-doc-btn { cursor: pointer; display: inline-block; }
  .pz-doc-busy { opacity: .6; pointer-events: none; }
  .pz-doc-msg { font-size: 13px; color: #c62828; margin: 8px 0 0; }
</style>
