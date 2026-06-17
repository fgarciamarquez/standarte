<script>
  import { onMount, onDestroy } from 'svelte';
  import FlagIcon from './FlagIcon.svelte';
  import { languages } from '$lib/siteData.js';

  export let lang;          // idioma actual (por defecto, el del navegador)
  export let size = 20;

  let display = lang;       // bandera mostrada
  let faded = false;        // true = bandera desvanecida (se ve el círculo negro)
  let timers = [];
  let mounted = false;

  const FADE = 170;         // ms del fundido (coincide con la transición CSS)
  const HOLD = 90;          // ms que la bandera queda visible entre fundidos

  function clearAll() { timers.forEach(clearTimeout); timers = []; }

  function reducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Lanza (o RELANZA) el ciclo: recorre todos los idiomas una vez con fundido a
  // negro entre cada uno y acaba en el idioma "current".
  function start(current) {
    clearAll();
    display = current;
    faded = false;
    if (reducedMotion()) return;
    const startIdx = Math.max(0, languages.indexOf(current));
    const seq = [];
    for (let i = 1; i <= languages.length; i++) {
      seq.push(languages[(startIdx + i) % languages.length]);
    }
    let idx = 0;
    const tick = () => {
      faded = true;                                    // fundido de SALIDA a negro
      timers.push(setTimeout(() => {
        display = seq[idx++];                           // cambia la bandera mientras está en negro
        timers.push(setTimeout(() => {
          faded = false;                                // fundido de ENTRADA desde negro
          if (idx < seq.length) {
            timers.push(setTimeout(tick, FADE + HOLD));
          }
        }, 40));
      }, FADE));
    };
    timers.push(setTimeout(tick, 500));
  }

  onMount(() => { mounted = true; });

  // Arranca al montar y se REINICIA cada vez que cambia el idioma.
  $: if (mounted) start(lang);

  onDestroy(clearAll);
</script>

<span class="lang-flag-intro" class:faded data-lang={display}><FlagIcon langCode={display} {size} /></span>

<style>
  .lang-flag-intro {
    display: inline-flex;
    vertical-align: middle;
    line-height: 0;
  }
  /* La bandera (SVG) se desvanece dejando ver el círculo negro = fundido a negro. */
  .lang-flag-intro :global(.flag-chip svg) {
    transition: opacity .17s ease;
  }
  .lang-flag-intro.faded :global(.flag-chip svg) {
    opacity: 0;
  }
</style>
