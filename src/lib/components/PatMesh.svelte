<script>
  // Malla ibérica del panel de Pat: representación gráfica en vivo de la selección
  // del asesor. Ciudades (puntos dorados sobre la península) conectadas con las
  // actividades (etiquetas de fairTags) y éstas con sus familias (sectores).
  // Es un componente PASIVO: la selección llega por props desde WelcomeAdvisor
  // (selectedFamily / selectedTags); aquí no hay selector propio. El único gesto
  // local es el hover sobre una ciudad, que muestra su desglose de actividades.
  // El SVG se construye imperativamente en onMount (no se prerenderiza: Pat ya
  // se carga en diferido en cliente) y la flotación usa rAF, solo mientras el
  // mapa es visible (IntersectionObserver) y sin prefers-reduced-motion.
  import { onMount, createEventDispatcher } from 'svelte';
  import { fairsData } from '$lib/fairsData.js';
  import { tagFamilies, fairTags, fairActivities, labelForTag, familyLabel } from '$lib/fairTags.js';
  import { IBERIA_PATH, CITY_POINTS, MAP_INSETS, CITY_PILLAR } from '$lib/iberiaMeshData.js';
  import { pathFor } from '$lib/siteData.js';

  // Familias cuyo rótulo se fuerza a un lado concreto del nodo (en lugar del lado
  // automático por posición) porque en su ubicación el texto se salía del marco.
  const FORCED_LABEL_SIDE = {
    agroalimentario: 'start', // a la derecha del nodo
    turismo: 'end'            // a la izquierda del nodo
  };

  // Ciudades-hub de un inset: se nombran con el rótulo del recuadro (pm-inset-label),
  // así que su nodo NO lleva rótulo permanente propio (evita duplicar el nombre).
  const INSET_HUB_CITIES = new Set(['Islas Canarias', 'Islas de Madeira']);

  export let lang = 'en';
  export let selectedFamily = '';
  export let selectedTags = [];
  // Ciudad a resaltar por defecto al abrir el mapa (páginas de ciudad): el mapa
  // arranca mostrando el estado :hover de esa ciudad hasta que el usuario interactúa.
  export let initialCity = '';
  // El botón "Continuar" (avanzar al formulario) vive ahora en la isla informativa;
  // solo se muestra en el paso 2 con subselección. WelcomeAdvisor pasa currentStep===2.
  export let showContinue = false;
  // Preview de :hover: etiquetas a resaltar temporalmente mientras el usuario pasa el
  // ratón por un botón de sector/actividad (adelanto de lo que hará el click).
  export let previewTags = [];

  const dispatch = createEventDispatcher();

  const participationsWord = {
    es: 'participaciones', en: 'participations', pt: 'participações', de: 'Beteiligungen',
    fr: 'participations', it: 'partecipazioni', nl: 'deelnames', zh: '参与次数',
    hi: 'भागीदारी', ko: '참가 횟수', ja: '参加回数'
  };
  $: pWord = participationsWord[lang] || participationsWord.en;

  // Ventana conversacional (voz de Pat): cuenta al cliente qué está viendo. Dos
  // variantes por idioma —'family' (elige un sector completo) y 'sub' (afina en
  // actividades)— con el número {N} y singular/plural. El {N} se resalta en render.
  const selectionMsg = {
    es: {
      family: (n) => `En este sector tenemos ${n} feria${n === 1 ? '' : 's'}.`,
      sub: (n) => n === 1 ? `Ahora es 1 feria a la que puedes asistir.` : `Ahora son ${n} ferias a las que puedes asistir. Aprovecha la oferta que ofrecemos si contratas más de 1 stand con nosotros.`
    },
    en: {
      family: (n) => `In this sector we have ${n} fair${n === 1 ? '' : 's'}.`,
      sub: (n) => n === 1 ? `Now there's 1 fair you can attend.` : `Now there are ${n} fairs you can attend. Take advantage of our offer if you book more than one stand with us.`
    },
    pt: {
      family: (n) => `Neste setor temos ${n} feira${n === 1 ? '' : 's'}.`,
      sub: (n) => n === 1 ? `Agora é 1 feira à qual podes assistir.` : `Agora são ${n} feiras às quais podes assistir. Aproveita a oferta que temos se contratares mais de 1 stand connosco.`
    },
    de: {
      family: (n) => `In dieser Branche haben wir ${n} Messe${n === 1 ? '' : 'n'}.`,
      sub: (n) => n === 1 ? `Jetzt ist es 1 Messe, die Sie besuchen können.` : `Jetzt sind es ${n} Messen, die Sie besuchen können. Nutzen Sie unser Angebot, wenn Sie mehr als einen Stand bei uns buchen.`
    },
    fr: {
      family: (n) => `Dans ce secteur, nous avons ${n} salon${n === 1 ? '' : 's'}.`,
      sub: (n) => n === 1 ? `Maintenant, c'est 1 salon auquel vous pouvez assister.` : `Maintenant, ce sont ${n} salons auxquels vous pouvez assister. Profitez de notre offre si vous réservez plus d'un stand avec nous.`
    },
    it: {
      family: (n) => n === 1 ? `In questo settore abbiamo 1 fiera.` : `In questo settore abbiamo ${n} fiere.`,
      sub: (n) => n === 1 ? `Ora è 1 fiera a cui puoi partecipare.` : `Ora sono ${n} fiere a cui puoi partecipare. Approfitta dell'offerta che proponiamo se prenoti più di uno stand con noi.`
    },
    nl: {
      family: (n) => n === 1 ? `In deze sector hebben we 1 beurs.` : `In deze sector hebben we ${n} beurzen.`,
      sub: (n) => n === 1 ? `Nu is het 1 beurs die u kunt bezoeken.` : `Nu zijn het ${n} beurzen die u kunt bezoeken. Profiteer van onze aanbieding als u meer dan één stand bij ons boekt.`
    },
    zh: {
      family: (n) => `在这个行业，我们有 ${n} 场展会。`,
      sub: (n) => n === 1 ? `现在有 1 场展会您可以参加。` : `现在有 ${n} 场展会您可以参加。如果您与我们预订超过 1 个展位，即可享受我们提供的优惠。`
    },
    hi: {
      family: (n) => `इस क्षेत्र में हमारे पास ${n} मेले हैं।`,
      sub: (n) => n === 1 ? `अब 1 मेला है जिसमें आप शामिल हो सकते हैं।` : `अब ${n} मेले हैं जिनमें आप शामिल हो सकते हैं। हमारे साथ 1 से अधिक स्टैंड बुक करने पर हमारी पेशकश का लाभ उठाएँ।`
    },
    ko: {
      family: (n) => `이 분야에는 ${n}개의 박람회가 있습니다.`,
      sub: (n) => n === 1 ? `이제 참석하실 수 있는 박람회가 1개입니다.` : `이제 참석하실 수 있는 박람회가 ${n}개입니다. 저희와 부스를 2개 이상 예약하시면 제공되는 혜택을 누려보세요.`
    },
    ja: {
      family: (n) => `この分野には、展示会が${n}件あります。`,
      sub: (n) => n === 1 ? `今、ご参加いただける展示会が1件あります。` : `今、ご参加いただける展示会が${n}件あります。1つ以上のブースをご契約いただくと、特典をご利用いただけます。`
    }
  };

  let svgEl;
  let tooltipEl;
  let wrapEl;
  let calloutEl;
  let api = null;

  // Etiquetas activas derivadas del estado de Pat: si hay etiquetas marcadas se
  // resaltan exactamente ésas; si solo hay familia elegida (paso 2 recién abierto),
  // se resalta la familia completa; sin selección, la malla entera respira.
  $: activeTags = selectedTags.length
    ? selectedTags
    : (selectedFamily ? Object.keys(fairTags).filter((t) => fairTags[t].family === selectedFamily) : []);

  // Modo de la selección para la ventana conversacional: 'sub' si el cliente ha
  // marcado actividades concretas (subselección), 'family' si solo ha elegido el
  // sector completo, '' si no hay selección.
  $: selMode = selectedTags.length ? 'sub' : (selectedFamily ? 'family' : '');

  // Etiqueta del botón "Continuar" (mismas palabras que el flujo de Pat).
  const continueLabel = {
    es: 'Continuar', en: 'Continue', pt: 'Continuar', de: 'Weiter', fr: 'Continuer',
    it: 'Continua', nl: 'Doorgaan', zh: '继续', hi: 'जारी रखें', ko: '계속', ja: '次へ'
  };

  // Lupa: título accesible del botón que activa/desactiva la lente de aumento.
  const lensTitle = {
    es: 'Lupa', en: 'Magnifier', pt: 'Lupa', de: 'Lupe', fr: 'Loupe', it: 'Lente',
    nl: 'Vergrootglas', zh: '放大镜', hi: 'आवर्धक लेंस', ko: '돋보기', ja: '拡大鏡'
  };
  let lensActive = false;
  function toggleLens() {
    lensActive = !lensActive;
    if (api) api.setLens(lensActive);
  }

  $: if (api) api.update(activeTags, lang, pWord, selMode, showContinue);
  $: if (api) api.setPreview(previewTags);
  // Al navegar entre ciudades (nube de ciudades del sidebar), el mapa persiste y
  // solo cambia initialCity: reubicamos el :hover por defecto a la nueva ciudad.
  $: if (api) api.setDefaultCity(initialCity);

  function buildMesh() {
    const NS = 'http://www.w3.org/2000/svg';
    const cx = 452, cy = 378;
    const famRx = 640, famRy = 495;
    const tagRadiusFactor = 0.74;

    const el = (tag, attrs) => {
      const n = document.createElementNS(NS, tag);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    };

    // ── Datos: ciudad → {etiqueta: nº ferias}, solo ciudades peninsulares ──
    const cities = [];
    const cityMap = {};
    for (const f of fairsData) {
      const pt = CITY_POINTS[f.city];
      if (!pt) continue;
      const tags = fairActivities[f.slug];
      if (!tags || !tags.length) continue;
      let c = cityMap[f.city];
      if (!c) {
        c = { name: f.city, x: pt[0], y: pt[1], tags: {}, total: 0 };
        cityMap[f.city] = c;
        cities.push(c);
      }
      for (const t of tags) { c.tags[t] = (c.tags[t] || 0) + 1; c.total++; }
    }

    const famKeys = Object.keys(tagFamilies);
    const tagTotals = {};
    cities.forEach((c) => Object.keys(c.tags).forEach((t) => { tagTotals[t] = (tagTotals[t] || 0) + c.tags[t]; }));
    const tagKeys = Object.keys(tagTotals);
    const famTotals = {};
    famKeys.forEach((f) => { famTotals[f] = 0; });
    tagKeys.forEach((t) => { famTotals[fairTags[t].family] += tagTotals[t]; });
    const famColor = (t) => tagFamilies[fairTags[t].family].color;

    // ── Posiciones base: familias en elipse exterior, etiquetas en abanico ──
    const famPos = {};
    famKeys.forEach((f, i) => {
      const angle = (-90 + i * (360 / famKeys.length)) * Math.PI / 180;
      famPos[f] = {
        angle,
        x: cx + famRx * Math.cos(angle), y: cy + famRy * Math.sin(angle),
        bx: cx + famRx * Math.cos(angle), by: cy + famRy * Math.sin(angle),
        phase: i * 1.7, speed: 0.5 + (i % 5) * 0.08
      };
    });

    const tagsByFam = {};
    famKeys.forEach((f) => { tagsByFam[f] = []; });
    tagKeys.forEach((t) => { tagsByFam[fairTags[t].family].push(t); });
    famKeys.forEach((f) => tagsByFam[f].sort((a, b) => tagTotals[b] - tagTotals[a]));

    const tagPos = {};
    famKeys.forEach((f) => {
      const list = tagsByFam[f];
      const n = list.length;
      const stepDeg = n > 4 ? 5.4 : 6.8;
      list.forEach((t, j) => {
        const offset = (j - (n - 1) / 2) * stepDeg * Math.PI / 180;
        const a = famPos[f].angle + offset;
        const rr = tagRadiusFactor + (j % 2) * 0.045;
        tagPos[t] = {
          x: cx + famRx * rr * Math.cos(a), y: cy + famRy * rr * Math.sin(a),
          bx: cx + famRx * rr * Math.cos(a), by: cy + famRy * rr * Math.sin(a),
          phase: (j + 3) * 2.1 + famPos[f].phase, speed: 0.65 + (j % 4) * 0.1
        };
      });
    });

    // ── Construcción del SVG ──
    // Marca de agua tejida (capa de FONDO, la primera que se dibuja): patrón
    // "STANDARTE" repetido en diagonal como filigrana, pero CONFINADA a la forma
    // de la península (mismo path que la costa). Así es la textura de la tierra,
    // entre el blanco del fondo y el mapa: el mar y los márgenes quedan limpios y
    // la costa, las líneas y los nodos se dibujan por encima. Como es un relleno
    // de patrón integrado en el landmass, es más difícil de quitar que un texto.
    const wmDefs = el('defs', {});
    const wmPat = el('pattern', {
      id: 'pm-wm-pat', patternUnits: 'userSpaceOnUse',
      width: 360, height: 200, patternTransform: 'rotate(-28)'
    });
    [[0, 34], [180, 134]].forEach(([tx, ty]) => {
      const t = el('text', { class: 'pm-wm-tile', x: tx, y: ty });
      t.textContent = 'STANDARTE';
      wmPat.appendChild(t);
    });
    wmDefs.appendChild(wmPat);
    svgEl.appendChild(wmDefs);
    svgEl.appendChild(el('path', { class: 'pm-watermark-fill', d: IBERIA_PATH, fill: 'url(#pm-wm-pat)' }));

    const gratGroup = el('g', {});
    for (let gx = -300; gx < 1270; gx += 120) {
      gratGroup.appendChild(el('line', { class: 'pm-graticule', x1: gx, y1: -150, x2: gx, y2: 900 }));
    }
    for (let gy = -120; gy < 920; gy += 110) {
      gratGroup.appendChild(el('line', { class: 'pm-graticule', x1: -360, y1: gy, x2: 1270, y2: gy }));
    }
    svgEl.appendChild(gratGroup);
    svgEl.appendChild(el('path', { class: 'pm-coast', d: IBERIA_PATH }));
    // Mallorca: polígono simple (misma proyección px) para que la isla tenga tierra
    // bajo su punto y se vea que la malla llega hasta Baleares. Punto Palma ≈ (856, 398).
    svgEl.appendChild(el('path', { class: 'pm-coast pm-island', d: 'M 826,384 L 848,368 L 892,360 L 884,388 L 864,401 L 846,405 L 834,396 Z' }));

    // Insets (Canarias, Madeira): traslación artificial de cada archipiélago a un
    // recuadro (circunferencia de borde de puntos + islas simples) para que la
    // malla llegue a las islas sin agrandar el mapa peninsular.
    MAP_INSETS.forEach((inset) => {
      const g = el('g', { class: 'pm-inset' });
      g.appendChild(el('circle', { class: 'pm-inset-ring', cx: inset.cx, cy: inset.cy, r: inset.r }));
      inset.islands.forEach((d) => g.appendChild(el('path', { class: 'pm-coast pm-island', d })));
      if (inset.label) {
        const cap = el('text', {
          class: 'pm-inset-label', x: inset.cx, y: inset.cy + inset.r + 15, 'text-anchor': 'middle'
        });
        cap.textContent = inset.label;
        g.appendChild(cap);
      }
      svgEl.appendChild(g);
    });

    const edgeD = (x1, y1, x2, y2) => {
      const mx = (x1 + x2) / 2 + (y2 - y1) * 0.06;
      const my = (y1 + y2) / 2 + (x1 - x2) * 0.06;
      return 'M ' + x1 + ',' + y1 + ' Q ' + mx + ',' + my + ' ' + x2 + ',' + y2;
    };

    const edgeGroup = el('g', {});
    svgEl.appendChild(edgeGroup);
    const edges = [];
    cities.forEach((city) => {
      Object.keys(city.tags).forEach((tag) => {
        const w = city.tags[tag];
        const p = el('path', {
          class: 'pm-edge',
          d: edgeD(city.x, city.y, tagPos[tag].x, tagPos[tag].y),
          stroke: famColor(tag),
          'stroke-width': 0.5 + Math.min(w, 4) * 0.35,
          opacity: 0.12 + Math.min(w, 5) * 0.03
        });
        p._city = city; p._tag = tag;
        edgeGroup.appendChild(p);
        edges.push(p);
      });
    });

    const spokeGroup = el('g', {});
    svgEl.appendChild(spokeGroup);
    const spokes = [];
    tagKeys.forEach((t) => {
      const f = fairTags[t].family;
      const p = el('path', {
        class: 'pm-spoke',
        d: edgeD(tagPos[t].x, tagPos[t].y, famPos[f].x, famPos[f].y),
        stroke: tagFamilies[f].color,
        'stroke-width': 1.1,
        'stroke-dasharray': '3 4',
        opacity: 0.4
      });
      p._tag = t; p._fam = f;
      spokeGroup.appendChild(p);
      spokes.push(p);
    });

    const tagGroup = el('g', {});
    svgEl.appendChild(tagGroup);
    const tagEls = {};
    tagKeys.forEach((t) => {
      const p = tagPos[t];
      const r = 3.2 + Math.sqrt(tagTotals[t]) * 1.5;
      const g = el('g', { class: 'pm-tag' });
      const c = el('circle', {
        cx: p.x, cy: p.y, r,
        fill: famColor(t), 'fill-opacity': 0.55,
        stroke: famColor(t), 'stroke-width': 1
      });
      g.appendChild(c);
      const side = p.x < cx ? -1 : 1;
      const txt = el('text', {
        x: p.x + side * (r + 6), y: p.y + 3,
        'text-anchor': side < 0 ? 'end' : 'start',
        opacity: tagTotals[t] >= 4 ? 0.9 : 0
      });
      g.appendChild(txt);
      tagGroup.appendChild(g);
      tagEls[t] = { g, circle: c, text: txt, r, side, alwaysLabel: tagTotals[t] >= 4 };
    });

    const famGroup = el('g', {});
    svgEl.appendChild(famGroup);
    const famEls = {};
    famKeys.forEach((f) => {
      const p = famPos[f];
      const r = 8 + Math.sqrt(famTotals[f]) * 1.9;
      const g = el('g', { class: 'pm-family' });
      const c = el('circle', { cx: p.x, cy: p.y, r, fill: tagFamilies[f].color, 'fill-opacity': 0.9 });
      g.appendChild(c);
      // Lado del rótulo por defecto según la posición del nodo; algunas familias
      // se fuerzan a un lado concreto porque en su posición (arriba/abajo) el
      // rótulo se salía del marco: agroalimentario → derecha, turismo → izquierda.
      const forcedSide = FORCED_LABEL_SIDE[f];
      const anchor = forcedSide || (p.x < cx - 40 ? 'end' : (p.x > cx + 40 ? 'start' : 'middle'));
      const dx = anchor === 'end' ? -(r + 9) : (anchor === 'start' ? r + 9 : 0);
      const dy = anchor === 'middle' ? (p.y < cy ? -(r + 10) : r + 20) : 4;
      const t1 = el('text', { x: p.x + dx, y: p.y + dy, 'text-anchor': anchor, 'font-size': 13, 'font-weight': 600 });
      g.appendChild(t1);
      const t2 = el('text', { class: 'pm-family-count', x: p.x, y: p.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': Math.max(9, Math.min(r * 0.9, 15)), 'font-weight': 700 });
      g.appendChild(t2);
      famGroup.appendChild(g);
      // texts[1] (el número) va centrado DENTRO del círculo del nodo (dx/dy = 0).
      famEls[f] = { g, circle: c, texts: [{ node: t1, dx, dy }, { node: t2, dx: 0, dy: 0 }] };
    });

    const cityGroup = el('g', {});
    svgEl.appendChild(cityGroup);
    const maxCityTotal = Math.max(...cities.map((c) => c.total));
    const cityLinks = []; // anclas <a> de ciudad, para refrescar href al cambiar de idioma
    cities.forEach((city) => {
      const r = 2.4 + Math.sqrt(city.total / maxCityTotal) * 7.5;
      const isMajor = city.total >= 9;
      // Cada punto-ciudad con página pilar propia es un enlace directo a ella
      // (donde se listan sus ferias). Las ciudades sin pilar quedan como <g> normal.
      const pillar = CITY_PILLAR[city.name];
      const g = el(pillar ? 'a' : 'g', { class: 'pm-city' + (isMajor ? ' major' : '') });
      if (pillar) {
        g._pillar = pillar;
        cityLinks.push(g);
      }
      g._city = city;
      // área de hover invisible más generosa que el punto (los nodos pequeños son diminutos)
      g.appendChild(el('circle', { class: 'pm-hit', cx: city.x, cy: city.y, r: Math.max(r, 9) }));
      g.appendChild(el('circle', { cx: city.x, cy: city.y, r }));
      if (city.total >= 4 && !INSET_HUB_CITIES.has(city.name)) {
        const t = el('text', { x: city.x, y: city.y - (r + 6), 'text-anchor': 'middle', 'font-size': isMajor ? 12 : 10 });
        t.textContent = city.name;
        g.appendChild(t);
      } else {
        // ciudades sin rótulo permanente: etiqueta discreta que aparece solo al pasar el ratón
        const hint = el('text', {
          class: 'pm-city-hint',
          x: city.x, y: city.y - (r + 6),
          'text-anchor': 'middle', 'font-size': 13
        });
        hint.textContent = city.name;
        g.appendChild(hint);
        g._hint = hint;
      }
      cityGroup.appendChild(g);
    });

    // ── Estado de resaltado ──
    let currentActive = [];
    let currentLang = '';
    let currentPWord = '';
    // Ciudad de la página (si la hay): estado :hover por defecto al abrir, mientras
    // no haya selección activa ni interacción del usuario.
    let defaultCity = initialCity ? (cityMap[initialCity] || null) : null;
    let defaultActive = !!defaultCity;

    // Ventana conversacional: se muestra con selección activa. currentMode indica
    // si es sector completo ('family') o subselección ('sub').
    let currentMode = '';
    // Cuando WelcomeAdvisor está en el paso de subselección (paso 2), la isla ofrece
    // el botón "Continuar" que avanza al formulario vía el evento 'continue'.
    let currentShowContinue = false;
    // Preview por :hover sobre los botones de sector/actividad de Pat: resalta esas
    // etiquetas temporalmente (adelanto de lo que hará el click) sin tocar la selección
    // real ni la isla. null = sin preview.
    let previewSet = null;

    function applyLabels() {
      tagKeys.forEach((t) => { tagEls[t].text.textContent = labelForTag(t, currentLang); });
      famKeys.forEach((f) => {
        famEls[f].texts[0].node.textContent = familyLabel(f, currentLang);
        famEls[f].texts[1].node.textContent = famTotals[f];
      });
      // href de cada punto-ciudad → su página pilar en el idioma activo
      cityLinks.forEach((a) => {
        a.setAttribute('href', pathFor(currentLang, a._pillar));
        a.setAttribute('aria-label', a._city.name);
      });
    }

    function render(activeArg, isPreview) {
      const active = new Set(activeArg || currentActive);
      const any = active.size > 0;
      edges.forEach((p) => { p.style.opacity = any ? (active.has(p._tag) ? 0.8 : 0.03) : ''; });
      spokes.forEach((p) => { p.style.opacity = any ? (active.has(p._tag) ? 0.75 : 0.06) : ''; });
      tagKeys.forEach((t) => {
        const te = tagEls[t];
        const on = !any || active.has(t);
        te.g.classList.toggle('dimmed', !on);
        te.text.setAttribute('opacity', (any && active.has(t)) ? 1 : (te.alwaysLabel && on ? 0.9 : 0));
      });
      famKeys.forEach((f) => {
        const inFam = tagsByFam[f].filter((t) => active.has(t));
        const famOn = !any || inFam.length > 0;
        famEls[f].g.classList.toggle('dimmed', !famOn);
        // Número del nódulo: con selección activa muestra los eventos de la SUB-
        // selección dentro de esa familia; sin selección (o familia no tocada), el total.
        const num = (any && inFam.length) ? inFam.reduce((s, t) => s + tagTotals[t], 0) : famTotals[f];
        famEls[f].texts[1].node.textContent = num;
      });
      cityGroup.childNodes.forEach((n) => {
        if (!any) { n.classList.remove('dimmed'); return; }
        const has = Object.keys(n._city.tags).some((t) => active.has(t));
        n.classList.toggle('dimmed', !has);
      });
      // En preview (:hover de botón) solo se adelanta el resaltado; la isla no se toca.
      if (isPreview) return;
      // Ventana conversacional: total de eventos de la selección actual (suma de
      // las etiquetas activas), con texto según el modo (sector/subselección).
      if (any) {
        const total = [...active].reduce((s, t) => s + (tagTotals[t] || 0), 0);
        const msgs = selectionMsg[currentLang] || selectionMsg.en;
        const build = msgs[currentMode] || msgs.family;
        const msg = build(total).replace(/(\d[\d.,]*)/, '<b class="pm-callout-n">$1</b>');
        let html = '<div class="pm-callout-msg">' + msg + '</div>';
        // Las URLs de resultado NO se muestran en la isla (se reservan para el envío
        // al cliente: WelcomeAdvisor las calcula en tagResults y las manda en
        // form_resultados). En subselección la isla solo ofrece el botón "Continuar".
        if (currentMode === 'sub' && currentActive.length && currentShowContinue) {
          // Botón "Continuar": avanza al formulario. Delegado por click en calloutEl.
          const cta = (continueLabel[currentLang] || continueLabel.en);
          html += '<button type="button" class="pm-callout-continue">' + cta + '</button>';
        }
        calloutEl.innerHTML = html;
        calloutEl.classList.add('visible');
      } else {
        calloutEl.classList.remove('visible');
      }
    }

    // Estado a pintar: una selección activa manda; si no la hay pero seguimos en
    // el estado inicial de una página de ciudad, se muestra el :hover de esa ciudad;
    // en cualquier otro caso, el render neutro.
    function renderState() {
      // El preview de :hover sobre un botón manda sobre todo lo demás mientras dura.
      if (previewSet) { render(previewSet, true); return; }
      if (!currentActive.length && defaultActive && defaultCity) {
        highlightCity(defaultCity, null);
      } else {
        if (currentActive.length) defaultActive = false;
        render();
      }
    }

    // ── Hover de ciudad: desglose en tooltip + resaltado temporal ──
    function highlightCity(city, evt) {
      calloutEl.classList.remove('visible'); // la isla es de selección, no de hover
      edges.forEach((p) => { p.style.opacity = p._city === city ? 0.9 : 0.03; });
      spokes.forEach((p) => { p.style.opacity = city.tags[p._tag] ? 0.7 : 0.06; });
      tagKeys.forEach((t) => {
        const on = !!city.tags[t];
        tagEls[t].g.classList.toggle('dimmed', !on);
        tagEls[t].text.setAttribute('opacity', on ? 1 : 0);
      });
      famKeys.forEach((f) => {
        // Ferias de ESTA ciudad en el sector (suma de sus etiquetas de la familia):
        // el dígito del nódulo responde al :hover mostrando el número de esa ciudad.
        const inCity = tagsByFam[f].reduce((s, t) => s + (city.tags[t] || 0), 0);
        famEls[f].g.classList.toggle('dimmed', inCity === 0);
        famEls[f].texts[1].node.textContent = inCity;
      });
      cityGroup.childNodes.forEach((n) => n.classList.toggle('dimmed', n._city !== city));
      const rows = Object.keys(city.tags)
        .sort((a, b) => city.tags[b] - city.tags[a])
        .map((t) => '<li><span><span class="pm-sw" style="background:' + famColor(t) + '"></span>' +
          labelForTag(t, currentLang) + '</span><b>' + city.tags[t] + '</b></li>')
        .join('');
      tooltipEl.innerHTML = '<h4>' + city.name + '</h4><ul>' + rows + '</ul>';
      tooltipEl.classList.add('visible');
      if (evt) positionTooltip(evt);
      else positionTooltipAtNode(city);
    }

    function positionTooltip(evt) {
      if (!evt) return;
      const rect = wrapEl.getBoundingClientRect();
      tooltipEl.style.left = (evt.clientX - rect.left) + 'px';
      tooltipEl.style.top = (evt.clientY - rect.top - 14) + 'px';
    }

    // Posiciona el tooltip sobre el nodo (sin ratón): para el :hover por defecto de
    // la ciudad de la página. Usa la matriz SVG→pantalla del propio mapa.
    function positionTooltipAtNode(city) {
      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;
      const pt = svgEl.createSVGPoint();
      pt.x = city.x; pt.y = city.y;
      const scr = pt.matrixTransform(ctm);
      const rect = wrapEl.getBoundingClientRect();
      tooltipEl.style.left = (scr.x - rect.left) + 'px';
      tooltipEl.style.top = (scr.y - rect.top - 14) + 'px';
    }

    function onOver(e) {
      const g = e.target.closest('.pm-city');
      if (!g) return;
      defaultActive = false; // el usuario ya interactúa: se abandona el :hover por defecto
      if (g._hint) g._hint.classList.add('visible');
      highlightCity(g._city, e);
    }
    function onMove(e) {
      if (e.target.closest('.pm-city')) positionTooltip(e);
    }
    function onOut(e) {
      const g = e.target.closest('.pm-city');
      if (!g) return;
      if (g._hint) g._hint.classList.remove('visible');
      tooltipEl.classList.remove('visible');
      renderState();
    }
    // Clic en un punto-ciudad enlazado: avisar al panel (que se cierra para que
    // el cambio de URL sea evidente) y dejar que SvelteKit gestione la navegación.
    function onClick(e) {
      const a = e.target.closest('.pm-city');
      if (a && a._pillar) dispatch('navigate', { city: a._city.name });
    }
    cityGroup.addEventListener('mouseover', onOver);
    cityGroup.addEventListener('mousemove', onMove);
    cityGroup.addEventListener('mouseout', onOut);
    cityGroup.addEventListener('click', onClick);

    // Botón "Continuar" de la isla: delegación de click (el botón se re-renderiza
    // en cada render()). Avanza el flujo de Pat al formulario.
    function onCalloutClick(e) {
      if (e.target.closest('.pm-callout-continue')) dispatch('continue');
    }
    calloutEl.addEventListener('click', onCalloutClick);

    // ── Isla arrastrable (mouse + táctil) ──
    // En móvil la isla es casi tan grande como el mapa y puede taparlo por completo:
    // se puede reubicar arrastrándola desde el texto del mensaje (asa). Los enlaces y
    // el botón "Continuar" no la mueven. El margen de arrastre es el ancestro que
    // recorta (la tarjeta del asesor, más alta que el mapa), así se puede subir por
    // encima de los chips y dejar el mapa a la vista.
    let dragState = null;
    // Ancestro que recorta el contenido (overflow != visible); si no hay, el viewport.
    function clipRect() {
      let el = wrapEl.parentElement;
      while (el) {
        const o = getComputedStyle(el).overflow;
        if (o && o !== 'visible') return el.getBoundingClientRect();
        el = el.parentElement;
      }
      return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
    }
    function onCalloutPointerMove(e) {
      if (!dragState) return;
      const wrapRect = wrapEl.getBoundingClientRect();
      const b = clipRect();
      const cw = calloutEl.offsetWidth;
      const ch = calloutEl.offsetHeight;
      const m = 6; // margen para no pegarla al borde del recorte
      let left = dragState.ox + (e.clientX - dragState.sx);
      let top = dragState.oy + (e.clientY - dragState.sy);
      const minLeft = (b.left - wrapRect.left) + m;
      const maxLeft = (b.right - wrapRect.left) - cw - m;
      const minTop = (b.top - wrapRect.top) + m;
      const maxTop = (b.bottom - wrapRect.top) - ch - m;
      left = Math.max(minLeft, Math.min(left, maxLeft));
      top = Math.max(minTop, Math.min(top, maxTop));
      calloutEl.style.left = left + 'px';
      calloutEl.style.top = top + 'px';
      calloutEl.style.transform = 'none';
    }
    function onCalloutPointerUp() {
      dragState = null;
      calloutEl.classList.remove('dragging');
      window.removeEventListener('pointermove', onCalloutPointerMove);
      window.removeEventListener('pointerup', onCalloutPointerUp);
    }
    function onCalloutPointerDown(e) {
      // Solo se arrastra desde el texto; no desde los enlaces ni el botón "Continuar".
      if (!e.target.closest('.pm-callout-msg')) return;
      const wrapRect = wrapEl.getBoundingClientRect();
      const rect = calloutEl.getBoundingClientRect();
      dragState = { ox: rect.left - wrapRect.left, oy: rect.top - wrapRect.top, sx: e.clientX, sy: e.clientY };
      calloutEl.classList.add('dragging');
      window.addEventListener('pointermove', onCalloutPointerMove);
      window.addEventListener('pointerup', onCalloutPointerUp);
      e.preventDefault();
    }
    calloutEl.addEventListener('pointerdown', onCalloutPointerDown);

    // ── Flotación (solo con el mapa visible y sin reduced-motion) ──
    let rafId = 0;
    let running = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();

    function frame(now) {
      if (!running) return;
      const t = (now - start) / 1000;
      famKeys.forEach((f) => {
        const p = famPos[f];
        p.x = p.bx + Math.sin(t * p.speed + p.phase) * 10 + Math.sin(t * p.speed * 1.7 + p.phase * 2.3) * 4;
        p.y = p.by + Math.cos(t * p.speed * 0.8 + p.phase) * 8 + Math.cos(t * p.speed * 1.3 + p.phase * 1.9) * 3.5;
        const fe = famEls[f];
        fe.circle.setAttribute('cx', p.x); fe.circle.setAttribute('cy', p.y);
        fe.texts.forEach((lbl) => {
          lbl.node.setAttribute('x', p.x + lbl.dx); lbl.node.setAttribute('y', p.y + lbl.dy);
        });
      });
      tagKeys.forEach((tg) => {
        const p = tagPos[tg];
        p.x = p.bx + Math.sin(t * p.speed + p.phase) * 7 + Math.sin(t * p.speed * 1.9 + p.phase * 2.1) * 3;
        p.y = p.by + Math.cos(t * p.speed * 0.85 + p.phase) * 6 + Math.cos(t * p.speed * 1.4 + p.phase * 1.7) * 2.5;
        const te = tagEls[tg];
        te.circle.setAttribute('cx', p.x); te.circle.setAttribute('cy', p.y);
        te.text.setAttribute('x', p.x + te.side * (te.r + 6));
        te.text.setAttribute('y', p.y + 3);
      });
      edges.forEach((p) => p.setAttribute('d', edgeD(p._city.x, p._city.y, tagPos[p._tag].x, tagPos[p._tag].y)));
      spokes.forEach((p) => p.setAttribute('d', edgeD(tagPos[p._tag].x, tagPos[p._tag].y, famPos[p._fam].x, famPos[p._fam].y)));
      rafId = requestAnimationFrame(frame);
    }

    let observer = null;
    if (!reducedMotion && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; rafId = requestAnimationFrame(frame); }
        else if (!visible && running) { running = false; cancelAnimationFrame(rafId); }
      }, { threshold: 0.05 });
      observer.observe(wrapEl);
    } else if (!reducedMotion) {
      running = true;
      rafId = requestAnimationFrame(frame);
    }

    // ── Lupa: lente circular que amplía la zona del mapa bajo el puntero ──
    // Se envuelve TODO el contenido ya construido en un grupo con id para poder
    // clonarlo ampliado con <use> (referencia viva: refleja la flotación en tiempo
    // real). La lente se dibuja por encima y solo aparece cuando la lupa está activa.
    const scene = el('g', { id: 'pm-scene' });
    while (svgEl.firstChild) scene.appendChild(svgEl.firstChild);
    svgEl.appendChild(scene);

    const LENS_R = 130;    // radio de la lente en coordenadas del viewBox
    const LENS_ZOOM = 2;   // factor de aumento
    let lensOn = false;

    const lensDefs = el('defs', {});
    const lensClip = el('clipPath', { id: 'pm-lens-clip', clipPathUnits: 'userSpaceOnUse' });
    const lensClipCircle = el('circle', { cx: 0, cy: 0, r: LENS_R });
    lensClip.appendChild(lensClipCircle);
    lensDefs.appendChild(lensClip);
    svgEl.appendChild(lensDefs);

    const lensLayer = el('g', { class: 'pm-lens' });
    const lensClipGroup = el('g', { 'clip-path': 'url(#pm-lens-clip)' });
    const lensUse = el('use', {});
    lensUse.setAttribute('href', '#pm-scene');
    lensUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#pm-scene');
    lensClipGroup.appendChild(lensUse);
    lensLayer.appendChild(lensClipGroup);
    const lensRing = el('circle', { class: 'pm-lens-ring', cx: 0, cy: 0, r: LENS_R });
    lensLayer.appendChild(lensRing);
    lensLayer.style.display = 'none';
    svgEl.appendChild(lensLayer);

    function svgPointFromClient(clientX, clientY) {
      const ctm = svgEl.getScreenCTM();
      if (!ctm) return null;
      const pt = svgEl.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      return pt.matrixTransform(ctm.inverse());
    }
    function positionLens(clientX, clientY) {
      const p = svgPointFromClient(clientX, clientY);
      if (!p) return;
      const k = LENS_ZOOM;
      lensClipCircle.setAttribute('cx', p.x);
      lensClipCircle.setAttribute('cy', p.y);
      lensRing.setAttribute('cx', p.x);
      lensRing.setAttribute('cy', p.y);
      // Ampliación centrada en el punto bajo el cursor: el punto se mantiene fijo.
      lensUse.setAttribute('transform', `translate(${p.x * (1 - k)} ${p.y * (1 - k)}) scale(${k})`);
    }
    function onLensPointerMove(e) {
      if (!lensOn) return;
      e.preventDefault();
      positionLens(e.clientX, e.clientY);
    }
    function setLens(on) {
      lensOn = on;
      if (on) {
        lensLayer.style.display = '';
        svgEl.style.touchAction = 'none'; // en táctil, arrastrar mueve la lente sin hacer scroll
        const r = svgEl.getBoundingClientRect();
        positionLens(r.left + r.width / 2, r.top + r.height / 2); // arranca en el centro
        svgEl.addEventListener('pointermove', onLensPointerMove);
        svgEl.addEventListener('pointerdown', onLensPointerMove);
      } else {
        lensLayer.style.display = 'none';
        svgEl.style.touchAction = '';
        svgEl.removeEventListener('pointermove', onLensPointerMove);
        svgEl.removeEventListener('pointerdown', onLensPointerMove);
      }
    }

    return {
      setLens,
      // Preview por :hover de botón: resalta `tags` temporalmente; con lista vacía o
      // nula se limpia y se vuelve al estado real (selección / :hover de ciudad).
      setPreview(tags) {
        previewSet = (tags && tags.length) ? tags : null;
        renderState();
      },
      update(active, newLang, newPWord, mode, showCont) {
        currentActive = active;
        currentMode = mode || '';
        currentShowContinue = !!showCont;
        if (newLang !== currentLang || newPWord !== currentPWord) {
          currentLang = newLang;
          currentPWord = newPWord;
          applyLabels();
        }
        renderState();
      },
      // Reubica la ciudad resaltada por defecto (al cambiar de página de ciudad
      // sin recargar). Reactiva el :hover por defecto sobre la nueva ciudad.
      setDefaultCity(cityName) {
        const next = cityName ? (cityMap[cityName] || null) : null;
        if (next === defaultCity && defaultActive) return;
        defaultCity = next;
        defaultActive = !!defaultCity;
        renderState();
      },
      destroy() {
        running = false;
        cancelAnimationFrame(rafId);
        if (observer) observer.disconnect();
        cityGroup.removeEventListener('mouseover', onOver);
        cityGroup.removeEventListener('mousemove', onMove);
        cityGroup.removeEventListener('mouseout', onOut);
        cityGroup.removeEventListener('click', onClick);
        calloutEl.removeEventListener('click', onCalloutClick);
        calloutEl.removeEventListener('pointerdown', onCalloutPointerDown);
        window.removeEventListener('pointermove', onCalloutPointerMove);
        window.removeEventListener('pointerup', onCalloutPointerUp);
        svgEl.removeEventListener('pointermove', onLensPointerMove);
        svgEl.removeEventListener('pointerdown', onLensPointerMove);
      }
    };
  }

  onMount(() => {
    const built = buildMesh();
    built.update(activeTags, lang, pWord, selMode, showContinue);
    api = built;
    return built.destroy;
  });
</script>

<div class="pm-wrap" bind:this={wrapEl}>
  <svg
    class="pm-map"
    bind:this={svgEl}
    viewBox="-360 -150 1630 1050"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Standarte network map: cities, activities and sectors in Spain and Portugal"
  ></svg>
  <div class="pm-tooltip" bind:this={tooltipEl}></div>
  <!-- Ventana conversacional de Pat: cuenta al cliente qué está viendo. -->
  <div class="pm-events-callout" bind:this={calloutEl} aria-live="polite"></div>
  <!-- Lupa: activa una lente circular que amplía el mapa bajo el puntero. -->
  <button
    type="button"
    class="pm-lens-toggle"
    class:active={lensActive}
    on:click={toggleLens}
    title={lensTitle[lang] || lensTitle.en}
    aria-label={lensTitle[lang] || lensTitle.en}
    aria-pressed={lensActive}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
    </svg>
  </button>
</div>

<style>
  /* Fondo transparente: la malla se integra directamente sobre la tarjeta de Pat.
     El código de colores (familias/etiquetas/ciudades) se mantiene intacto; solo
     los neutros (costa, retícula, textos) se adaptan al fondo claro. */
  .pm-wrap {
    position: relative;
  }

  /* ── Lupa ── */
  /* Botón que activa/desactiva la lente de aumento (esquina superior derecha). */
  .pm-lens-toggle {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid #d6d7d0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    color: #4a4f52;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    z-index: 7;
  }
  .pm-lens-toggle svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  .pm-lens-toggle:hover {
    background: #fff;
    color: royalblue;
  }
  /* Activa: resaltada en Azul Royal para que se vea que la lente está encendida. */
  .pm-lens-toggle.active {
    background: royalblue;
    border-color: royalblue;
    color: #fff;
  }
  /* Aro de la lente sobre el mapa. La capa de la lente no captura el puntero para
     que la interacción siga llegando al mapa real de debajo. */
  :global(.pm-lens) {
    pointer-events: none;
  }
  :global(.pm-lens-ring) {
    fill: none;
    stroke: royalblue;
    stroke-width: 3;
    filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.28));
  }

  .pm-map {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1630 / 1050;
  }

  /* Ventana conversacional de Pat sobre el gráfico: cuenta al cliente qué ve. */
  .pm-events-callout {
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
    padding: 11px 18px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid #d6d7d0;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: #1a1e21;
    text-align: center;
    max-width: min(360px, calc(100% - 28px));
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s ease, transform 0.22s ease;
    z-index: 6;
  }
  /* La clase .visible se añade por JS (imperativo), así que Svelte no la ve en el
     markup y podaría la regla como "no usada": :global evita esa poda. */
  .pm-events-callout:global(.visible) {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  /* Durante el arrastre no hay transición (el reposicionamiento debe ser inmediato). */
  .pm-events-callout:global(.dragging) {
    transition: opacity 0.22s ease;
  }
  /* El texto del mensaje es el asa: recibe puntero y no dispara scroll táctil.
     El cursor "mano" del sistema no se puede recolorear, así que se usa un cursor
     personalizado: una mano SVG en Azul Royal (con fallback a grab/grabbing). */
  .pm-events-callout :global(.pm-callout-msg) {
    pointer-events: auto;
    cursor: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2024%2024'%3E%3Cpath%20fill='%234169e1'%20stroke='%23fff'%20stroke-width='1'%20d='M23,5.5V20c0,2.2-1.8,4-4,4h-7.3c-1.08,0-2.1-.43-2.85-1.19L1,14.83c0,0,1.26-1.23,1.3-1.25c.22-.19.49-.29.79-.29c.22,0,.42.06.6.16c.04.01,4.31,2.46,4.31,2.46V4c0-.83.67-1.5,1.5-1.5S12,3.17,12,4v7h1V1.5c0-.83.67-1.5,1.5-1.5S16,.67,16,1.5V11h1V2.5c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5V11h1V5.5c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5z'/%3E%3C/svg%3E") 12 4, grab;
    touch-action: none;
    user-select: none;
  }
  /* Asa visible (gris): indica que la ventana se puede desplazar — también en
     táctil, donde no hay cursor. */
  .pm-events-callout :global(.pm-callout-msg)::before {
    content: '';
    display: block;
    width: 34px;
    height: 4px;
    margin: 0 auto 8px;
    border-radius: 2px;
    background: #d7d7d2;
  }
  .pm-events-callout:global(.dragging) :global(.pm-callout-msg) {
    cursor: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2024%2024'%3E%3Cpath%20fill='%234169e1'%20stroke='%23fff'%20stroke-width='1'%20d='M23,5.5V20c0,2.2-1.8,4-4,4h-7.3c-1.08,0-2.1-.43-2.85-1.19L1,14.83c0,0,1.26-1.23,1.3-1.25c.22-.19.49-.29.79-.29c.22,0,.42.06.6.16c.04.01,4.31,2.46,4.31,2.46V4c0-.83.67-1.5,1.5-1.5S12,3.17,12,4v7h1V1.5c0-.83.67-1.5,1.5-1.5S16,.67,16,1.5V11h1V2.5c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5V11h1V5.5c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5z'/%3E%3C/svg%3E") 12 4, grabbing;
  }
  .pm-events-callout:global(.dragging) :global(.pm-callout-msg)::before { background: #c2c2bb; }
  .pm-events-callout :global(.pm-callout-n) {
    font-weight: 700;
    color: royalblue;
    font-variant-numeric: tabular-nums;
    font-size: 1.15em;
  }
  /* Botón "Continuar" integrado en la isla: avanza al formulario de Pat. */
  .pm-events-callout :global(.pm-callout-continue) {
    display: block;
    margin: 9px auto 0;
    background: var(--gold, #ffc800);
    color: #111;
    border: none;
    border-radius: 30px;
    padding: 5px 15px;
    font-family: 'Inconsolata', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    pointer-events: auto; /* clicable pese al pointer-events:none de la isla */
    transition: filter 0.2s ease;
  }
  .pm-events-callout :global(.pm-callout-continue):hover { filter: brightness(1.05); }

  /* Marca de agua tejida: filigrana "STANDARTE" repetida sobre todo el mapa. */
  :global(.pm-wm-tile) {
    font-family: 'Francois One', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 26px;
    letter-spacing: 0.3em;
    fill: #1a1e21;
  }
  :global(.pm-watermark-fill) {
    opacity: 0.05;
    pointer-events: none;
    user-select: none;
  }

  :global(.pm-coast) {
    fill: rgba(26, 30, 33, 0.05);
    stroke: #b9bcb4;
    stroke-width: 1.6;
  }
  /* Circunferencia de los insets (Canarias, Madeira): borde de puntos, sin
     relleno. Señala que es una traslación artificial del espacio, no una
     ubicación real. */
  :global(.pm-inset-ring) {
    fill: none;
    stroke: #b9bcb4;
    stroke-width: 1.4;
    stroke-dasharray: 2 5;
    opacity: 0.85;
  }
  /* Rótulo del inset, a modo de leyenda bajo el recuadro. */
  :global(.pm-inset-label) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    fill: #5c6157;
    letter-spacing: 0.02em;
    pointer-events: none;
  }
  :global(.pm-graticule) {
    stroke: #d3d4cd;
    stroke-width: 0.6;
    stroke-dasharray: 1 5;
    fill: none;
    opacity: 0.6;
  }
  :global(.pm-edge),
  :global(.pm-spoke) {
    fill: none;
    stroke-linecap: round;
    transition: opacity 0.25s ease;
  }

  :global(.pm-family circle) { transition: fill-opacity 0.2s ease; }
  :global(.pm-family.dimmed circle) { fill-opacity: 0.18; }
  :global(.pm-family text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    letter-spacing: 0.03em;
    fill: #1a1e21;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  :global(.pm-family.dimmed text) { opacity: 0.3; }
  /* El número dentro del círculo va claro (#f7f6f1). El selector incluye `text`
     para ganar en especificidad a `.pm-family text { fill: #1a1e21 }`; si no, el
     número saldría oscuro y no se vería sobre el color del nodo. */
  :global(.pm-family text.pm-family-count) { fill: #f7f6f1; font-weight: 700; paint-order: stroke; stroke: rgba(0, 0, 0, 0.4); stroke-width: 0.7px; }

  :global(.pm-tag circle) { transition: opacity 0.2s ease; }
  :global(.pm-tag.dimmed circle) { opacity: 0.15; }
  :global(.pm-tag text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 9.5px;
    letter-spacing: 0.02em;
    fill: #5c6157;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  :global(.pm-tag.dimmed text) { opacity: 0.12; }

  :global(.pm-city circle) {
    fill: #d9a441;
    stroke: #f8f9fa;
    stroke-width: 1;
    cursor: pointer;
    transition: opacity 0.25s ease;
  }
  /* Área de hover invisible (más grande que el punto en las ciudades pequeñas). */
  :global(.pm-city circle.pm-hit) {
    fill: transparent;
    stroke: none;
  }
  /* Nombre discreto de las ciudades sin rótulo: solo visible al pasar el ratón. */
  :global(.pm-city-hint) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    fill: #7a7f76;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }
  :global(.pm-city-hint.visible) {
    opacity: 0.9;
  }
  :global(.pm-city.dimmed circle) { opacity: 0.24; }
  :global(.pm-city text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    fill: #5c6157;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  :global(.pm-city.dimmed text) { opacity: 0.22; }
  :global(.pm-city.major text) { fill: #1a1e21; font-weight: 600; }

  .pm-tooltip {
    position: absolute;
    pointer-events: none;
    padding: 10px 12px;
    max-width: 250px;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: opacity 0.12s ease;
    z-index: 5;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid #d6d7d0;
    border-radius: 4px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(6px);
  }
  .pm-tooltip.visible { opacity: 1; }
  .pm-tooltip :global(h4) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 14px;
    margin: 0 0 6px;
    color: #1a1e21;
    font-weight: 600;
  }
  .pm-tooltip :global(ul) { list-style: none; margin: 0; padding: 0; }
  .pm-tooltip :global(li) {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 11px;
    color: #5c6157;
    padding: 2px 0;
  }
  .pm-tooltip :global(li b) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    color: #1a1e21;
    font-variant-numeric: tabular-nums;
  }
  .pm-tooltip :global(.pm-sw) {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 6px;
  }
</style>
