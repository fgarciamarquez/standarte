<script>
  // Línea de tiempo sectorial: sitúa ESTA feria y las próximas citas de su misma
  // actividad en una línea horizontal con nódulos. Su función comercial es orientar
  // al cliente en el tiempo y hacer evidente que las ferias de su sector se pueden
  // contratar como campaña completa con un solo proveedor.
  //
  // Solo entran ferias con fecha VERIFICADA y futura (fairDates); las que no tienen
  // fecha simplemente no aparecen, así que el módulo nunca inventa un calendario.
  import { fairsData } from '$lib/fairsData.js';
  import { activitiesForFair } from '$lib/fairTags.js';
  import { fairDates, fairDatesFor, formatFairDatesShort, cadenceLabels } from '$lib/fairDates.js';
  import { fairUrl } from '$lib/siteData.js';
  import { onMount } from 'svelte';

  export let lang = 'es';
  export let slug = '';          // feria de la página actual
  export let name = '';          // su nombre para mostrar
  export let tags = [];          // sus etiquetas de actividad
  export let cityLabel = (c) => c; // localizador de nombre de ciudad

  const MAX_NODES = 7; // la banda ocupa todo el ancho, así que caben más hitos

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
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  });

  const strings = {
    es: { title: 'Tu calendario de expansión', lead: 'Esta feria y las próximas citas de tu sector. Planifica la campaña completa con Standarte y ahorra hasta un 25%.', current: 'Estás aquí', tbc: 'Próxima edición por confirmar' },
    en: { title: 'Your expansion calendar', lead: 'This fair and the next events in your sector. Plan the whole campaign with Standarte and save up to 25%.', current: 'You are here', tbc: 'Next edition to be confirmed' },
    de: { title: 'Ihr Expansionskalender', lead: 'Diese Messe und die nächsten Termine Ihrer Branche. Planen Sie die gesamte Kampagne mit Standarte und sparen Sie bis zu 25%.', current: 'Sie sind hier', tbc: 'Nächste Ausgabe noch offen' },
    pt: { title: 'O seu calendário de expansão', lead: 'Esta feira e os próximos certames do seu setor. Planeie a campanha completa com a Standarte e poupe até 25%.', current: 'Está aqui', tbc: 'Próxima edição por confirmar' },
    fr: { title: 'Votre calendrier d\'expansion', lead: 'Ce salon et les prochains rendez-vous de votre secteur. Planifiez toute la campagne avec Standarte et économisez jusqu\'à 25%.', current: 'Vous êtes ici', tbc: 'Prochaine édition à confirmer' },
    it: { title: 'Il tuo calendario di espansione', lead: 'Questa fiera e i prossimi appuntamenti del tuo settore. Pianifica l\'intera campagna con Standarte e risparmia fino al 25%.', current: 'Sei qui', tbc: 'Prossima edizione da confermare' },
    nl: { title: 'Uw expansiekalender', lead: 'Deze beurs en de volgende evenementen in uw sector. Plan de hele campagne met Standarte en bespaar tot 25%.', current: 'U bent hier', tbc: 'Volgende editie nog te bevestigen' },
    zh: { title: '您的拓展日历', lead: '本展会及您所在行业即将举行的展会。与 Standarte 一起规划完整参展方案，最高可节省 25%。', current: '当前展会', tbc: '下届日期待定' },
    hi: { title: 'आपका विस्तार कैलेंडर', lead: 'यह मेला और आपके क्षेत्र के आगामी आयोजन। Standarte के साथ पूरा अभियान बनाएं और 25% तक बचाएं।', current: 'आप यहाँ हैं', tbc: 'अगला संस्करण प्रतीक्षित' },
    ko: { title: '확장 캘린더', lead: '이 박람회와 귀사 분야의 다음 일정입니다. Standarte와 함께 전체 캠페인을 계획하고 최대 25%를 절약하세요.', current: '현재 박람회', tbc: '다음 회차 미정' },
    ja: { title: '拡大カレンダー', lead: '本展示会と、貴社の分野で次に開催される展示会です。Standarteとキャンペーン全体を計画し、最大25%を削減できます。', current: '現在の展示会', tbc: '次回開催は未定' }
  };
  $: s = strings[lang] || strings.es;

  // Nodos: esta feria (siempre, aunque no tenga fecha) + próximas de su misma
  // actividad, en orden cronológico. Se limita a MAX_NODES para que la línea siga
  // siendo legible.
  $: nodes = (() => {
    const own = fairsData.find((f) => f.slug === slug);
    const tagSet = new Set(tags);
    const upcoming = [];
    for (const f of fairsData) {
      if (f.slug === slug) continue;
      if (!fairDates[f.slug]) continue;
      const shares = activitiesForFair(f.slug).some((t) => tagSet.has(t));
      if (!shares) continue;
      const short = formatFairDatesShort(f.slug, lang);
      if (!short) continue; // sin fecha futura válida
      upcoming.push({ slug: f.slug, name: f.name, city: f.city, country: f.country, date: short, iso: fairDatesFor(f.slug).start, cadence: fairDatesFor(f.slug).cadence, current: false });
    }
    upcoming.sort((a, b) => a.iso.localeCompare(b.iso));

    const ownShort = formatFairDatesShort(slug, lang);
    const ownEntry = fairDatesFor(slug);
    const self = {
      slug, name: name || (own && own.name) || '', city: own ? own.city : '',
      country: own ? own.country : 'es',
      date: ownShort, iso: ownShort && ownEntry ? ownEntry.start : '',
      cadence: ownEntry ? ownEntry.cadence : 'unknown', current: true
    };

    let list;
    if (ownShort) {
      // Con fecha: entra en su sitio cronológico y se recorta alrededor de ella.
      list = [...upcoming, self].sort((a, b) => a.iso.localeCompare(b.iso));
      const i = list.findIndex((n) => n.current);
      if (list.length > MAX_NODES) {
        const start = Math.max(0, Math.min(i, list.length - MAX_NODES));
        list = list.slice(start, start + MAX_NODES);
      }
    } else {
      // Sin fecha confirmada: abre la línea, seguida de las próximas del sector.
      list = [self, ...upcoming.slice(0, MAX_NODES - 1)];
    }
    return list;
  })();

  $: cadenceOf = (c) => (cadenceLabels[c] ? (cadenceLabels[c][lang] || cadenceLabels[c].es) : '');
</script>

<!-- Se muestra solo si hay algo que situar además de la propia feria. -->
{#if nodes.length > 1}
  <section class="fair-timeline" aria-label={s.title}>
    <h2>{s.title}</h2>
    <p class="ft-lead">{s.lead}</p>

    <ol class="ft-track" bind:this={trackEl}>
      {#each nodes as n (n.slug)}
        <li class="ft-node" class:is-current={n.current} aria-current={n.current ? 'true' : undefined}>
          <span class="ft-dot" aria-hidden="true"></span>
          <span class="ft-date">{n.date || s.tbc}</span>
          {#if n.current}
            <span class="ft-name ft-name-current">
              {#if n.country !== 'es'}<span class="fair-flag flag-{n.country}" aria-hidden="true"></span>{/if}{n.name}
            </span>
            <span class="ft-here">{s.current}</span>
          {:else}
            <a class="ft-name" href={fairUrl(n.slug, lang)}>
              {#if n.country !== 'es'}<span class="fair-flag flag-{n.country}" aria-hidden="true"></span>{/if}{n.name}
            </a>
            <span class="ft-city">{cityLabel(n.city)}{#if n.cadence === 'biennial' || n.cadence === 'triennial'} · {cadenceOf(n.cadence)}{/if}</span>
          {/if}
        </li>
      {/each}
    </ol>
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
  .ft-lead {
    margin: 0 0 1.8rem;
    color: #5f6368;
    font-size: 0.97rem;
    line-height: 1.5;
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
    overflow-x: auto;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
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

  .ft-name {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.3;
    color: #2a2a2a;
    text-decoration: none;
  }
  /* Bandera de país en las ferias de fuera de España (misma píldora que usan el
     resto de listados de feria del sitio). */
  .ft-name :global(.fair-flag) {
    width: 11px;
    height: 11px;
    margin-right: 4px;
    vertical-align: 0;
  }
  a.ft-name:hover,
  a.ft-name:focus { color: #b89400; text-decoration: underline; }
  .ft-name-current { color: #1a1e21; }

  .ft-city {
    font-size: 0.8rem;
    color: #8a8f86;
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
