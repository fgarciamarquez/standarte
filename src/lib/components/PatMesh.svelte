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
  import { IBERIA_PATH, CITY_POINTS, MAP_INSETS } from '$lib/iberiaMeshData.js';
  import { pathFor } from '$lib/siteData.js';

  // Ciudad del mapa → sección-pilar de ciudad (misma convención que CITY_TO_PILLAR
  // en Feria.svelte / FAIR_CITY_PILLAR en Site.svelte: los satélites cuelgan de su
  // pilar). Las ciudades sin entrada no tienen página propia y su punto no enlaza.
  const CITY_PILLAR = {
    'Madrid': 'madrid', 'Barcelona': 'barcelona', 'Bilbao': 'bilbao', 'Lisboa': 'lisboa',
    'Oporto': 'oporto', 'Valencia': 'valencia', 'Mallorca': 'mallorca', 'Vigo': 'vigo',
    'Santiago de Compostela': 'santiago', 'A Coruña': 'coruna', 'Valladolid': 'valladolid',
    'Salamanca': 'salamanca', 'Batalha': 'batalha', 'Málaga': 'malaga', 'Badajoz': 'badajoz',
    'Sevilla': 'sevilla', 'Ciudad Real': 'ciudad_real', 'Zaragoza': 'zaragoza',
    'Don Benito': 'montaje_don_benito', 'Zafra': 'montaje_zafra',
    'Almendralejo': 'badajoz', 'Plasencia': 'badajoz', 'Mérida': 'badajoz',
    'Portugal Sur': 'portugal_sur',
    'Aguadulce': 'almeria', 'El Ejido': 'almeria', 'Almería': 'almeria', 'Jaén': 'jaen',
    'Huelva': 'huelva', 'Aracena': 'huelva', 'Punta Umbría': 'huelva',
    'Murcia': 'murcia', 'Torre Pacheco': 'murcia',
    'Córdoba': 'cordoba', 'Pozoblanco': 'cordoba', 'Villanueva de Córdoba': 'cordoba',
    'Granada': 'granada', 'Armilla': 'granada',
    'Cádiz': 'cadiz', 'Jerez de la Frontera': 'cadiz',
    'Manzanares': 'ciudad_real', 'Porzuna': 'ciudad_real',
    'Santarém': 'santarem', 'Trujillo': 'trujillo', 'Elche': 'elche', 'Alicante': 'alicante',
    'Silleda': 'silleda', 'Ourense': 'ourense',
    'Lleida': 'lleida', 'Girona': 'girona',
    // Todas las ciudades del inset canario cuelgan del hub Islas Canarias.
    'Islas Canarias': 'islas_canarias', 'Tenerife': 'islas_canarias',
    'Gran Canaria': 'islas_canarias', 'Las Palmas': 'islas_canarias',
    'Fuerteventura': 'islas_canarias',
    // Inset de Madeira → hub Islas de Madeira.
    'Islas de Madeira': 'islas_de_madeira', 'Funchal': 'islas_de_madeira',
    'Madeira': 'islas_de_madeira'
  };

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

  const dispatch = createEventDispatcher();

  const participationsWord = {
    es: 'participaciones', en: 'participations', pt: 'participações', de: 'Beteiligungen',
    fr: 'participations', it: 'partecipazioni', nl: 'deelnames', zh: '参与次数',
    hi: 'भागीदारी', ko: '참가 횟수', ja: '参加回数'
  };
  $: pWord = participationsWord[lang] || participationsWord.en;

  let svgEl;
  let tooltipEl;
  let wrapEl;
  let api = null;

  // Etiquetas activas derivadas del estado de Pat: si hay etiquetas marcadas se
  // resaltan exactamente ésas; si solo hay familia elegida (paso 2 recién abierto),
  // se resalta la familia completa; sin selección, la malla entera respira.
  $: activeTags = selectedTags.length
    ? selectedTags
    : (selectedFamily ? Object.keys(fairTags).filter((t) => fairTags[t].family === selectedFamily) : []);

  $: if (api) api.update(activeTags, lang, pWord);
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

    function render() {
      const active = new Set(currentActive);
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
        const famOn = !any || tagsByFam[f].some((t) => active.has(t));
        famEls[f].g.classList.toggle('dimmed', !famOn);
      });
      cityGroup.childNodes.forEach((n) => {
        if (!any) { n.classList.remove('dimmed'); return; }
        const has = Object.keys(n._city.tags).some((t) => active.has(t));
        n.classList.toggle('dimmed', !has);
      });
    }

    // Estado a pintar: una selección activa manda; si no la hay pero seguimos en
    // el estado inicial de una página de ciudad, se muestra el :hover de esa ciudad;
    // en cualquier otro caso, el render neutro.
    function renderState() {
      if (!currentActive.length && defaultActive && defaultCity) {
        highlightCity(defaultCity, null);
      } else {
        if (currentActive.length) defaultActive = false;
        render();
      }
    }

    // ── Hover de ciudad: desglose en tooltip + resaltado temporal ──
    function highlightCity(city, evt) {
      edges.forEach((p) => { p.style.opacity = p._city === city ? 0.9 : 0.03; });
      spokes.forEach((p) => { p.style.opacity = city.tags[p._tag] ? 0.7 : 0.06; });
      tagKeys.forEach((t) => {
        const on = !!city.tags[t];
        tagEls[t].g.classList.toggle('dimmed', !on);
        tagEls[t].text.setAttribute('opacity', on ? 1 : 0);
      });
      famKeys.forEach((f) => {
        famEls[f].g.classList.toggle('dimmed', !tagsByFam[f].some((t) => city.tags[t]));
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

    return {
      update(active, newLang, newPWord) {
        currentActive = active;
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
      }
    };
  }

  onMount(() => {
    const built = buildMesh();
    built.update(activeTags, lang, pWord);
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
</div>

<style>
  /* Fondo transparente: la malla se integra directamente sobre la tarjeta de Pat.
     El código de colores (familias/etiquetas/ciudades) se mantiene intacto; solo
     los neutros (costa, retícula, textos) se adaptan al fondo claro. */
  .pm-wrap {
    position: relative;
  }

  .pm-map {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1630 / 1050;
  }

  .pm-wrap :global(.pm-coast) {
    fill: rgba(26, 30, 33, 0.05);
    stroke: #b9bcb4;
    stroke-width: 1.6;
  }
  /* Circunferencia de los insets (Canarias, Madeira): borde de puntos, sin
     relleno. Señala que es una traslación artificial del espacio, no una
     ubicación real. */
  .pm-wrap :global(.pm-inset-ring) {
    fill: none;
    stroke: #b9bcb4;
    stroke-width: 1.4;
    stroke-dasharray: 2 5;
    opacity: 0.85;
  }
  /* Rótulo del inset, a modo de leyenda bajo el recuadro. */
  .pm-wrap :global(.pm-inset-label) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    fill: #5c6157;
    letter-spacing: 0.02em;
    pointer-events: none;
  }
  .pm-wrap :global(.pm-graticule) {
    stroke: #d3d4cd;
    stroke-width: 0.6;
    stroke-dasharray: 1 5;
    fill: none;
    opacity: 0.6;
  }
  .pm-wrap :global(.pm-edge),
  .pm-wrap :global(.pm-spoke) {
    fill: none;
    stroke-linecap: round;
    transition: opacity 0.25s ease;
  }

  .pm-wrap :global(.pm-family circle) { transition: fill-opacity 0.2s ease; }
  .pm-wrap :global(.pm-family.dimmed circle) { fill-opacity: 0.18; }
  .pm-wrap :global(.pm-family text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    letter-spacing: 0.03em;
    fill: #1a1e21;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .pm-wrap :global(.pm-family.dimmed text) { opacity: 0.3; }
  /* El número dentro del círculo va claro (#f7f6f1). El selector incluye `text`
     para ganar en especificidad a `.pm-family text { fill: #1a1e21 }`; si no, el
     número saldría oscuro y no se vería sobre el color del nodo. */
  .pm-wrap :global(.pm-family text.pm-family-count) { fill: #f7f6f1; font-weight: 700; paint-order: stroke; stroke: rgba(0, 0, 0, 0.4); stroke-width: 0.7px; }

  .pm-wrap :global(.pm-tag circle) { transition: opacity 0.2s ease; }
  .pm-wrap :global(.pm-tag.dimmed circle) { opacity: 0.15; }
  .pm-wrap :global(.pm-tag text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 9.5px;
    letter-spacing: 0.02em;
    fill: #5c6157;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .pm-wrap :global(.pm-tag.dimmed text) { opacity: 0.12; }

  .pm-wrap :global(.pm-city circle) {
    fill: #d9a441;
    stroke: #f8f9fa;
    stroke-width: 1;
    cursor: pointer;
    transition: opacity 0.25s ease;
  }
  /* Área de hover invisible (más grande que el punto en las ciudades pequeñas). */
  .pm-wrap :global(.pm-city circle.pm-hit) {
    fill: transparent;
    stroke: none;
  }
  /* Nombre discreto de las ciudades sin rótulo: solo visible al pasar el ratón. */
  .pm-wrap :global(.pm-city-hint) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    fill: #7a7f76;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }
  .pm-wrap :global(.pm-city-hint.visible) {
    opacity: 0.9;
  }
  .pm-wrap :global(.pm-city.dimmed circle) { opacity: 0.24; }
  .pm-wrap :global(.pm-city text) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    fill: #5c6157;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .pm-wrap :global(.pm-city.dimmed text) { opacity: 0.22; }
  .pm-wrap :global(.pm-city.major text) { fill: #1a1e21; font-weight: 600; }

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
