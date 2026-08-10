<script>
  // Línea de tiempo sectorial: sitúa ESTA feria y las próximas citas de su misma
  // actividad en una línea horizontal con nódulos. Su función comercial es orientar
  // al cliente en el tiempo y hacer evidente que las ferias de su sector se pueden
  // contratar como campaña completa con un solo proveedor.
  //
  // Solo entran ferias con fecha VERIFICADA y futura (fairDates); las que no tienen
  // fecha simplemente no aparecen, así que el módulo nunca inventa un calendario.
  import { colorForTag, labelForTag } from '$lib/fairTags.js';
  import { cadenceLabels } from '$lib/fairDates.js';
  import { timelineNodes } from '$lib/fairTimelineNodes.js';
  import { fairUrl, activityUrl } from '$lib/siteData.js';
  import { onMount } from 'svelte';

  export let lang = 'es';
  export let slug = '';          // feria de la página actual
  export let name = '';          // su nombre para mostrar
  export let tags = [];          // sus etiquetas de actividad
  export let cityLabel = (c) => c; // localizador de nombre de ciudad
  // Resumen de una frase por feria (slug -> texto), en el idioma de la página. Lo
  // adjunta el load del servidor a partir de fairSeoData; si falta, no hay tooltip.
  export let summaries = {};

  // El raíl es más ancho que la columna de texto, así que arranca desplazado para
  // que la feria actual quede a la vista (si no, en fichas cuya feria no es la
  // primera del calendario, el visitante abriría el módulo sin verse situado).
  let trackEl;
  onMount(() => {
    // Se aplaza dos fotogramas: en el montaje el raíl aún no tiene su ancho final
    // (tipografías y layout sin asentar) y el cálculo salía a cero.
    let raf1, raf2;
    const center = () => {
      if (!trackEl) return;
      const cur = trackEl.querySelector('.ft-node.is-current');
      if (!cur || trackEl.scrollWidth <= trackEl.clientWidth) return;
      // scrollLeft directo (no scrollIntoView: eso arrastraría también la página).
      trackEl.scrollLeft = Math.max(0, cur.offsetLeft - trackEl.clientWidth / 2 + cur.offsetWidth / 2);
    };
    raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(center); });
    // El desplazamiento por posición del ratón es solo de escritorio; en táctil manda
    // el arrastre nativo del raíl (overflow-x). La invalidación del rect en scroll y
    // resize evita medir la geometría en cada movimiento (patrón del carrusel 3D).
    tlFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const invalidate = () => { tlRect = null; };
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });
    return () => {
      cancelAnimationFrame(raf1); cancelAnimationFrame(raf2);
      if (tlRaf) cancelAnimationFrame(tlRaf);
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
    };
  });

  // --- Desplazamiento del raíl dirigido por la posición del ratón (escritorio) ---
  // Mismo lenguaje que el carrusel de proyectos 3D de la portada: el centro es zona
  // muerta; hacia la derecha el raíl avanza (muestra las citas siguientes) y hacia la
  // izquierda retrocede, más rápido cuanto más cerca del borde (respuesta cuadrática).
  let tlFine = false;   // ¿puntero fino con hover? (escritorio)
  let tlRect = null;    // rect cacheado del raíl
  let tlVel = 0;        // px/s; positivo = avanzar hacia la derecha
  let tlRaf = null;
  let tlLast = null;
  const TL_MAX = 560;   // velocidad máxima en el borde
  function tlTick(t) {
    if (tlLast == null) tlLast = t;
    const dt = Math.min(0.05, (t - tlLast) / 1000);
    tlLast = t;
    if (tlVel !== 0 && trackEl) {
      trackEl.scrollLeft += tlVel * dt; // el navegador acota solo el rango
      tlRaf = requestAnimationFrame(tlTick);
    } else {
      tlRaf = null; tlLast = null;
    }
  }
  function tlOnMove(e) {
    if (!tlFine || !trackEl) return;
    if (!tlRect) tlRect = trackEl.getBoundingClientRect();
    const r = tlRect;
    let rel = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    rel = Math.max(-1, Math.min(1, rel));
    if (Math.abs(rel) < 0.06) rel = 0; // zona muerta central: parar es fácil
    tlVel = Math.sign(rel) * rel * rel * TL_MAX;
    if (tlVel !== 0 && !tlRaf) tlRaf = requestAnimationFrame(tlTick);
  }
  function tlOnLeave() { tlVel = 0; tlRect = null; }

  // `claim` es el mensaje de posicionamiento fundamental de las fichas de feria
  // ("stand de calidad + red de expansión exclusiva ES/PT"), aquí anclado al módulo
  // que ES esa red: la promesa se lee junto a su prueba.
  const strings = {
    es: { title: 'Calendario de expansión', current: 'Estás aquí', tbc: 'Próxima edición por confirmar', claim: 'Stand de calidad + red de expansión exclusiva en España y Portugal: contrata las ferias de tu sector como una sola campaña.' },
    en: { title: 'Expansion calendar', current: 'You are here', tbc: 'Next edition to be confirmed', claim: 'Quality stand + exclusive expansion network across Spain and Portugal: book your sector\'s fairs as a single campaign.' },
    de: { title: 'Expansionskalender', current: 'Sie sind hier', tbc: 'Nächste Ausgabe noch offen', claim: 'Qualitätsstand + exklusives Expansionsnetz in Spanien und Portugal: buchen Sie die Messen Ihrer Branche als eine Kampagne.' },
    pt: { title: 'Calendário de expansão', current: 'Está aqui', tbc: 'Próxima edição por confirmar', claim: 'Stand de qualidade + rede de expansão exclusiva em Espanha e Portugal: contrate as feiras do seu setor como uma única campanha.' },
    fr: { title: 'Calendrier d\'expansion', current: 'Vous êtes ici', tbc: 'Prochaine édition à confirmer', claim: 'Stand de qualité + réseau d\'expansion exclusif en Espagne et au Portugal : réservez les salons de votre secteur comme une seule campagne.' },
    it: { title: 'Calendario di espansione', current: 'Sei qui', tbc: 'Prossima edizione da confermare', claim: 'Stand di qualità + rete di espansione esclusiva in Spagna e Portogallo: prenota le fiere del tuo settore come un\'unica campagna.' },
    nl: { title: 'Expansiekalender', current: 'U bent hier', tbc: 'Volgende editie nog te bevestigen', claim: 'Kwaliteitsstand + exclusief expansienetwerk in Spanje en Portugal: boek de beurzen van uw sector als één campagne.' },
    zh: { title: '拓展日历', current: '当前展会', tbc: '下届日期待定', claim: '高品质展台 + 西班牙和葡萄牙独家扩张网络：将您所在行业的展会作为一场整体行动统一预订。' },
    hi: { title: 'विस्तार कैलेंडर', current: 'आप यहाँ हैं', tbc: 'अगला संस्करण प्रतीक्षित', claim: 'गुणवत्तापूर्ण स्टैंड + स्पेन और पुर्तगाल में विशेष विस्तार नेटवर्क: अपने क्षेत्र के मेले एक ही अभियान के रूप में बुक करें।' },
    ko: { title: '확장 캘린더', current: '현재 박람회', tbc: '다음 회차 미정', claim: '품질 높은 부스 + 스페인·포르투갈 독점 확장 네트워크: 귀사 분야의 박람회를 하나의 캠페인으로 계약하세요.' },
    ja: { title: '拡大カレンダー', current: '現在の展示会', tbc: '次回開催は未定', claim: '高品質なブース + スペイン・ポルトガル独自の拡大ネットワーク：業界の展示会をひとつのキャンペーンとして契約できます。' }
  };
  $: s = strings[lang] || strings.es;

  // La selección vive en $lib/fairTimelineNodes.js: el load del servidor la necesita
  // también, para adjuntar solo los resúmenes de las ferias que van a salir.
  $: nodes = timelineNodes({ slug, lang, name, tags });

  $: cadenceOf = (c) => (cadenceLabels[c] ? (cadenceLabels[c][lang] || cadenceLabels[c].es) : '');
</script>

<!-- La línea se muestra solo si hay algo que situar además de la propia feria; si no,
     se emiten igualmente las etiquetas de actividad, que son enlaces internos de la
     ficha y no deben desaparecer por no haber calendario que dibujar. -->
{#if nodes.length <= 1 && tags.length}
  <ul class="activity-chips ft-chips ft-chips-alone">
    {#each tags as tag}
      <li>
        <a href={activityUrl(tag, lang)} style="--chip:{colorForTag(tag)}">
          <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tag, lang)}
        </a>
      </li>
    {/each}
  </ul>
{/if}
{#if nodes.length > 1}
  <section class="fair-timeline" aria-label={s.title}>
    <h2>{s.title}</h2>
    <p class="ft-claim">{s.claim}</p>
    <!-- Las etiquetas de actividad viven aquí (antes iban bajo el h2 de respuesta
         directa): identifican el sector y son justo el criterio con el que se han
         elegido las ferias de la línea, así que se leen como su leyenda. -->
    {#if tags.length}
      <ul class="activity-chips ft-chips">
        {#each tags as tag}
          <li>
            <a href={activityUrl(tag, lang)} style="--chip:{colorForTag(tag)}">
              <span class="chip-dot" aria-hidden="true"></span>{labelForTag(tag, lang)}
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="ft-zone" role="presentation" on:mousemove={tlOnMove} on:mouseleave={tlOnLeave}>
    <ol class="ft-track" bind:this={trackEl}>
      {#each nodes as n (n.slug)}
        <li class="ft-node" class:is-current={n.current} aria-current={n.current ? 'true' : undefined}>
          <span class="ft-dot" aria-hidden="true"></span>
          <span class="ft-date">{n.date || s.tbc}</span>
          <!-- La bandera va en su propia línea, entre fecha y nombre: centrada bajo el
               nódulo, marca de un vistazo qué citas son de fuera de España. -->
          {#if n.country !== 'es'}
            <span class="ft-flag fair-flag flag-{n.country}" aria-hidden="true"></span>
          {/if}
          {#if n.current}
            <span class="ft-name ft-name-current">{n.name}</span>
            <span class="ft-here">{s.current}</span>
          {:else}
            <!-- Con resumen disponible, el enlace lleva su propio tooltip: se describe
                 con aria-describedby (no title, que el lector de pantalla lee mal y no
                 aparece en táctil) y se muestra al pasar el ratón o al tabular. -->
            <a class="ft-name" href={fairUrl(n.slug, lang)}
              aria-describedby={summaries[n.slug] ? `ft-tip-${n.slug}` : undefined}>{n.name}</a>
            {#if summaries[n.slug]}
              <span class="ft-tip" id="ft-tip-{n.slug}" role="tooltip">{summaries[n.slug]}</span>
            {/if}
            <span class="ft-city">{cityLabel(n.city)}{#if n.cadence === 'biennial' || n.cadence === 'triennial'} · {cadenceOf(n.cadence)}{/if}</span>
          {/if}
        </li>
      {/each}
    </ol>
    </div>
  </section>
{/if}

<style>
  /* El bloque se queda en el flujo normal de la columna: así el título y la entradilla
     se alinean solos con el resto del texto de la ficha. Quien se va a sangre es
     únicamente el raíl (.ft-track), más abajo. */
  /* Sin margen inferior: la sección que la contiene ya aporta su propio relleno, y
     sumar los dos dejaba la gráfica demasiado suelta respecto al formulario. */
  .fair-timeline {
    margin: 4.2rem 0 0;
  }
  /* Mensaje de posicionamiento bajo el título del módulo. */
  .ft-claim {
    margin: 0.5rem 0 0;
    font-size: 0.95rem;
    line-height: 1.55;
    color: #555;
  }
  .ft-claim + .ft-chips { margin-top: 0.9rem; }
  /* Chips de actividad: mismo aspecto que en la ficha y en los índices (el estilo se
     repite aquí porque el CSS de Svelte está aislado por componente). */
  .ft-chips {
    list-style: none;
    padding: 0;
    margin: 0.9rem 0 1.6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .ft-chips li a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.62rem;
    border: 1px solid var(--chip);
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 500;
    color: color-mix(in srgb, var(--chip) 62%, #12211a);
    text-decoration: none;
    background: color-mix(in srgb, var(--chip) 12%, #fff);
    transition: background 0.2s ease;
  }
  /* Sin línea de tiempo delante, las etiquetas necesitan su propio aire arriba. */
  .ft-chips-alone { margin: 2.4rem 0 0; }
  .ft-chips li a:hover {
    background: color-mix(in srgb, var(--chip) 20%, #fff);
  }
  .chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--chip);
    flex: 0 0 auto;
  }

  /* Raíl horizontal: la línea es un pseudo-elemento a la altura de los nódulos,
     así los textos pueden crecer sin romperla. En pantallas estrechas el raíl
     se desplaza lateralmente en vez de comprimir los nódulos. */
  /* El padding-top da aire al nódulo actual: es más grande que el resto y lleva un
     halo de 5px, y sin ese margen el scroll horizontal (que recorta en vertical)
     le cortaba la parte de arriba. */
  .ft-track {
    list-style: none;
    /* El raíl desborda su columna hacia la derecha hasta ocupar el ancho del
       contenedor del sitio (1140px), que es el de los elementos de alrededor
       —el divisor y el bloque del formulario—, en lugar de irse a sangre.
       En pantallas estrechas se limita al ancho disponible. */
    width: min(var(--container, 1140px), calc(100vw - 30px));
    max-width: min(var(--container, 1140px), calc(100vw - 30px));
    margin: 0;
    box-sizing: border-box;
    padding: 12px 0 0.4rem;
    display: flex;
    gap: 0;
    position: relative;
    /* Con 14 hitos el raíl nunca cabe entero: siempre es desplazable. La barra de
       scroll se oculta porque la navegación es por posición del ratón (escritorio)
       o por arrastre nativo (táctil). */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .ft-track::-webkit-scrollbar { display: none; }
  @media (max-width: 900px) {
    .ft-track { scroll-snap-type: x proximity; }
  }
  /* Escritorio: `overflow-x: auto` recorta también en vertical y se comería el
     tooltip, que sale hacia ARRIBA. El truco: un padding-top amplio (compensado con
     margen negativo para no mover el raíl) mete el tooltip dentro de la caja de
     scroll, donde ya no se recorta. Ese padding invisible taparía los chips de
     actividad de encima, así que el raíl no captura punteros (pointer-events: none)
     y los reactivan los nódulos; los eventos burbujean hasta .ft-zone, que dirige
     el desplazamiento. */
  @media (hover: hover) and (pointer: fine) {
    .ft-track { padding-top: 160px; margin-top: -148px; pointer-events: none; }
    .ft-node { pointer-events: auto; }
  }
  /* La línea se dibuja por NODO, no sobre el contenedor: un pseudo-elemento
     absoluto en un contenedor con scroll se limita al ancho visible y dejaría un
     hueco al desplazar el raíl. Por segmentos, es continua en todo el recorrido. */
  .ft-node::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 7px; /* centro del nódulo de 16px */
    height: 2px;
    background: #e2e2de;
  }

  /* Los nódulos reparten el ancho disponible (flex-basis 0): en escritorio los 7
     caben dentro de los 1140px y no hace falta desplazar el raíl. El min-width
     mantiene la legibilidad y hace que en móvil vuelva a desplazarse. */
  .ft-node {
    position: relative;
    flex: 1 1 0;
    min-width: 118px;
    padding: 0 0.55rem;
    text-align: center;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ft-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #c8c8c2;
    margin-bottom: 0.85rem;
    position: relative;
    z-index: 1;
    flex: none;
  }
  .ft-node.is-current .ft-dot {
    width: 22px;
    height: 22px;
    margin-top: -3px;
    background: var(--gold, #ffc800);
    border-color: var(--gold, #ffc800);
    box-shadow: 0 0 0 5px rgba(255, 200, 0, 0.22);
  }

  .ft-date {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #7a7f76;
    margin-bottom: 0.3rem;
  }
  .ft-node.is-current .ft-date { color: #1a1e21; }

  /* Los nombres de las otras ferias son enlaces: van en azul royal para que se lean
     como tales (el nodo actual, que no enlaza a ninguna parte, va en negro). */
  .ft-name {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.3;
    color: #4169e1;
    text-decoration: none;
  }
  /* Bandera de país en las ferias de fuera de España (misma píldora que usan el resto
     de listados del sitio), en línea propia y centrada entre la fecha y el nombre. */
  .ft-flag {
    display: block;
    width: 13px;
    height: 13px;
    margin: 0 auto 0.3rem;
    flex: none;
  }
  a.ft-name:hover,
  a.ft-name:focus { color: #2a4bc0; text-decoration: underline; }

  /* Tooltip con el resumen de la feria. Se ancla al nódulo (no al enlace) para poder
     centrarse sobre él, y se dibuja hacia ARRIBA: hacia abajo lo recortaría el
     overflow del raíl. Sin JS: solo :hover/:focus-within del nódulo. */
  .ft-tip {
    position: absolute;
    bottom: calc(100% - 6px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    width: 240px;
    max-width: 62vw;
    box-sizing: border-box;
    padding: 0.6rem 0.75rem;
    background: #1a1e21;
    color: #f4f4f0;
    border-radius: 7px;
    font-size: 0.78rem;
    font-weight: 400;
    line-height: 1.45;
    text-align: left;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
    z-index: 6;
    pointer-events: none; /* que no se interponga entre el ratón y el enlace */
  }
  /* Flecha hacia el nódulo. */
  .ft-tip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border: 6px solid transparent;
    border-top-color: #1a1e21;
  }
  .ft-node:hover .ft-tip,
  .ft-node:focus-within .ft-tip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
  /* Móvil/táctil: sin tooltips. En pantalla táctil el :hover se dispara con el tap
     (tapando el propio enlace que se quiere pulsar) y el resumen no aporta en ese
     contexto; el usuario navega la línea por arrastre. */
  @media (hover: none), (pointer: coarse) {
    .ft-tip { display: none; }
  }
  .ft-name-current { color: #1a1e21; }

  .ft-city {
    font-size: 0.8rem;
    color: #333;
    margin-top: 0.2rem;
    line-height: 1.35;
  }
  .ft-here {
    margin-top: 0.25rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #b89400;
  }

  @media (max-width: 640px) {
    .ft-node { min-width: 126px; }
    .ft-name { font-size: 0.88rem; }
  }
</style>
