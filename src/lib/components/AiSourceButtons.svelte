<script>
  // Botón "EXPLORA NUESTRA RED DE EXPANSIÓN": único ocupante de la antigua fila de
  // botones GEO (ChatGPT/Perplexity/Claude, retirados 2026-07 de todos sus
  // emplazamientos). Reactiva el panel de Pat en las páginas donde puede aparecer.
  // El nombre del fichero se conserva para no tocar los 5 puntos de uso.
  import { createEventDispatcher } from 'svelte';
  import { backOut, cubicOut } from 'svelte/easing';

  // Entrada del botón: entra deslizándose desde la derecha con un rebote (backOut)
  // que lo hace notarse cuando el visitante cierra el panel de Pat.
  function pushIn(node) {
    // Respeta a quien pide menos movimiento: aparece sin animación.
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { duration: 0 };
    }
    const width = node.getBoundingClientRect().width;
    return {
      duration: 720,
      css: (t) => {
        const grow = cubicOut(t); // ancho: crece hasta asentarse
        const slide = backOut(t);  // posición: rebote al asentarse
        return `box-sizing:border-box; overflow:hidden; white-space:nowrap;` +
          ` width:${(grow * width).toFixed(2)}px;` +
          ` transform:translateX(${((1 - slide) * 52).toFixed(2)}px);` +
          ` opacity:${Math.min(1, t * 2).toFixed(3)};`;
      }
    };
  }
  export let lang = 'es';
  export let variant = 'band'; // 'band' = franja clara; 'hero' = transparente sobre el hero
  // Solo se muestra donde Pat puede aparecer y mientras su panel no esté en pantalla.
  export let canReactivate = false;
  export let patVisible = false;

  const dispatch = createEventDispatcher();

  // Texto del botón de reactivación de Pat (asesor de Expansión) por idioma.
  // La mayúscula la aplica el CSS (text-transform), válida para los alfabetos latinos;
  // zh/hi/ko/ja no tienen caja y se muestran tal cual.
  const expansionLabels = {
    es: 'Explora nuestra red de Expansión',
    en: 'Explore our Expansion network',
    de: 'Entdecke unser Expansionsnetz',
    fr: 'Explorez notre réseau d\'Expansion',
    it: 'Esplora la nostra rete di Espansione',
    pt: 'Explora a nossa rede de Expansão',
    zh: '探索我们的业务拓展网络',
    hi: 'हमारा विस्तार नेटवर्क देखें',
    ko: '사업 확장 네트워크 살펴보기',
    ja: '事業拡大ネットワークを見る',
    nl: 'Ontdek ons Expansienetwerk'
  };
  $: expansionLabel = expansionLabels[lang] || expansionLabels.es;
</script>

{#if canReactivate && !patVisible}
  <section class="ai-geo ai-geo-{variant}" aria-label={expansionLabel}>
    <div class="ai-geo-row">
      <button type="button" class="ai-geo-btn ai-geo-reactivate" in:pushIn on:click={() => dispatch('reactivate')}>
        {expansionLabel}
      </button>
    </div>
  </section>
{/if}

<style>
  .ai-geo { text-align: center; }

  /* Variante "band": franja propia entre secciones (fondo claro). */
  .ai-geo-band {
    padding: 34px 15px;
    background: #f4f4f2;
    border-top: 1px solid #e7e7e3;
  }
  /* Variante "hero": discreta y transparente, sobre la imagen del hero. */
  .ai-geo-hero {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16px;
    padding: 0 15px;
    background: transparent;
  }

  .ai-geo-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .ai-geo-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    border-radius: 30px;
    line-height: 1;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, opacity 0.15s ease;
  }
  .ai-geo-band .ai-geo-btn {
    padding: 15px 30px;
    font-size: 1.15rem;
  }
  .ai-geo-hero .ai-geo-btn {
    padding: 12px 26px;
    font-size: 1.05rem;
  }

  /* En móvil, letra algo más pequeña para que el texto quepa en una sola línea. */
  @media (max-width: 480px) {
    .ai-geo-hero .ai-geo-btn { font-size: 0.92rem; padding: 11px 20px; }
    .ai-geo-band .ai-geo-btn { font-size: 1rem; padding: 13px 24px; }
  }

  /* Botón "Expansión": reactiva el panel de Pat. Píldora dorada sólida, en MAYÚSCULAS;
     hereda el tamaño (padding/font-size) de la variante actual (band o hero). */
  .ai-geo .ai-geo-btn.ai-geo-reactivate {
    background: #ffc800; /* dorado de marca */
    color: #1a1e21; /* texto oscuro para contraste sobre el dorado */
    border: 1px solid rgba(0, 0, 0, 0.08);
    font-family: inherit;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(255, 200, 0, 0.4);
    /* Contiene el reflejo dentro de la píldora y lo recorta al borde redondeado. */
    position: relative;
    overflow: hidden;
    animation: goldPulse 2.8s ease-in-out infinite;
  }
  /* Reflejo especular que barre el botón: es lo que lo hace leer como metal pulido
     y no como un simple parpadeo. Va sincronizado con el pulso (mismo período). */
  .ai-geo .ai-geo-btn.ai-geo-reactivate::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    pointer-events: none;
    background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, 0.55) 50%, transparent 100%);
    transform: translateX(-140%);
    animation: goldSheen 2.8s ease-in-out infinite;
  }
  /* Luminosidad + halo: sube y baja sin llegar a saturar el dorado. */
  @keyframes goldPulse {
    0%, 100% { filter: brightness(1); box-shadow: 0 3px 10px rgba(255, 200, 0, 0.4); }
    50% { filter: brightness(1.14); box-shadow: 0 3px 18px rgba(255, 200, 0, 0.75); }
  }
  @keyframes goldSheen {
    0% { transform: translateX(-140%); }
    55%, 100% { transform: translateX(320%); }
  }
  .ai-geo .ai-geo-btn.ai-geo-reactivate:hover,
  .ai-geo .ai-geo-btn.ai-geo-reactivate:focus {
    background: #e0b000;
    transform: translateY(-1px);
  }
  /* Quien pide menos movimiento se queda con el botón dorado fijo. */
  @media (prefers-reduced-motion: reduce) {
    .ai-geo .ai-geo-btn.ai-geo-reactivate,
    .ai-geo .ai-geo-btn.ai-geo-reactivate::after {
      animation: none;
    }
    .ai-geo .ai-geo-btn.ai-geo-reactivate::after { opacity: 0; }
  }
</style>
