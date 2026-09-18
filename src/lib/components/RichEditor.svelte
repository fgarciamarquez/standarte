<script>
  // Editor de texto enriquecido mínimo para los campos largos del proyecto de cliente
  // (Sinopsis). Sin dependencias: un contenteditable con una barra de estilos (negrita,
  // cursiva, subrayado, subtítulo, listas) que guarda HTML. El servidor vuelve a
  // limpiar el HTML (cpx_clean_html) antes de guardarlo, así que aquí solo se evita
  // pegar basura: el pegado entra como texto plano.
  import { onMount } from 'svelte';
  export let value = '';
  export let placeholder = '';
  export let lang = 'es';

  const T = {
    es: { bold: 'Negrita', italic: 'Cursiva', underline: 'Subrayado', h3: 'Subtítulo', p: 'Párrafo', ul: 'Lista', ol: 'Lista numerada', clear: 'Quitar formato' },
    en: { bold: 'Bold', italic: 'Italic', underline: 'Underline', h3: 'Subheading', p: 'Paragraph', ul: 'Bullet list', ol: 'Numbered list', clear: 'Clear formatting' }
  };
  $: L = T[lang] || T.es;

  let el;
  let focused = false;
  let lastPushed = null;

  // Solo se vuelca `value` en el editor cuando cambia desde FUERA (cambio de idioma,
  // recarga); mientras se escribe, la fuente de verdad es el DOM.
  $: if (el && value !== lastPushed && !focused) { el.innerHTML = value || ''; lastPushed = value; }

  function sync() {
    const html = el.innerHTML.replace(/^(<br\s*\/?>|\s|&nbsp;)+$/i, '');
    value = html; lastPushed = html;
  }
  function cmd(name, arg = null) {
    el.focus();
    document.execCommand(name, false, arg);
    sync();
  }
  function onPaste(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
    sync();
  }
  onMount(() => { el.innerHTML = value || ''; lastPushed = value; });
</script>

<div class="re">
  <div class="re-bar" role="toolbar" aria-label="Formato">
    <button type="button" title={L.bold} aria-label={L.bold} on:mousedown|preventDefault={() => cmd('bold')}><b>B</b></button>
    <button type="button" title={L.italic} aria-label={L.italic} on:mousedown|preventDefault={() => cmd('italic')}><i>I</i></button>
    <button type="button" title={L.underline} aria-label={L.underline} on:mousedown|preventDefault={() => cmd('underline')}><u>U</u></button>
    <span class="re-sep"></span>
    <button type="button" title={L.h3} aria-label={L.h3} on:mousedown|preventDefault={() => cmd('formatBlock', 'h3')}>H</button>
    <button type="button" title={L.p} aria-label={L.p} on:mousedown|preventDefault={() => cmd('formatBlock', 'p')}>¶</button>
    <span class="re-sep"></span>
    <button type="button" title={L.ul} aria-label={L.ul} on:mousedown|preventDefault={() => cmd('insertUnorderedList')}>•≡</button>
    <button type="button" title={L.ol} aria-label={L.ol} on:mousedown|preventDefault={() => cmd('insertOrderedList')}>1≡</button>
    <span class="re-sep"></span>
    <button type="button" title={L.clear} aria-label={L.clear} on:mousedown|preventDefault={() => { cmd('removeFormat'); cmd('formatBlock', 'p'); }}>Tx</button>
  </div>
  <div
    class="re-area"
    bind:this={el}
    contenteditable="true"
    data-placeholder={placeholder}
    on:input={sync}
    on:blur={() => { focused = false; sync(); }}
    on:focus={() => (focused = true)}
    on:paste={onPaste}
  ></div>
</div>

<style>
  .re { border: 1px solid #cfcdc4; border-radius: 6px; background: #fff; }
  .re-bar { display: flex; flex-wrap: wrap; gap: 4px; padding: 6px 8px; border-bottom: 1px solid #e6e4dc; background: #f7f6f2; border-radius: 6px 6px 0 0; }
  .re-bar button { font: inherit; font-size: 13px; min-width: 30px; height: 28px; padding: 0 8px; border: 1px solid #d8d6ce; border-radius: 4px; background: #fff; color: #1b1b1a; cursor: pointer; }
  .re-bar button:hover { background: #fff4c2; border-color: #e6c84a; }
  .re-sep { width: 1px; background: #ddd; margin: 4px 2px; }
  .re-area { min-height: 120px; padding: 10px 12px; font-family: inherit; font-size: 15px; line-height: 1.55; color: #1b1b1a; outline: none; }
  .re-area:focus { box-shadow: inset 0 0 0 2px #ffe27a; border-radius: 0 0 6px 6px; }
  .re-area:empty::before { content: attr(data-placeholder); color: #999; pointer-events: none; }
  .re-area :global(h3) { font-size: 17px; margin: 12px 0 6px; }
  .re-area :global(p) { margin: 0 0 8px; }
  .re-area :global(ul), .re-area :global(ol) { margin: 0 0 8px; padding-left: 22px; }
</style>
