<script>
  // Buscador de ferias de la portada: el visitante escribe el nombre de su feria y
  // llega directamente a su ficha. Si no está en el catálogo, se avisa al equipo por
  // correo para darla de alta y se le responde en pantalla.
  //
  // La predicción funciona igual que el campo "Feria" del formulario de presupuesto
  // (ContactForm.svelte): filtra por nombre o ciudad, sin distinguir mayúsculas ni
  // acentos. Aquí, además, cada sugerencia lleva ya la URL de su ficha.
  import { fairsData } from '$lib/fairsData.js';
  import { fairUrl } from '$lib/siteData.js';

  export let lang = 'es';

  const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  // Ciudades "de relleno" del catálogo: no aportan pista y ensucian la sugerencia.
  const NON_CITY = ['Itinerante', 'España', 'Europa', 'Portugal', 'Portugal Sur'];

  const options = (() => {
    const seen = new Set(); const out = [];
    for (const f of fairsData) {
      const k = norm(f.name);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      const showCity = f.city && !NON_CITY.includes(f.city) && !k.includes(norm(f.city));
      out.push({ name: f.name, city: showCity ? f.city : '', slug: f.slug, key: k, cityKey: norm(f.city) });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  })();

  const strings = {
    es: { legend: 'Busca la feria que te interese', ph: 'Nombre de la feria o ciudad…', go: 'Buscar',
      notFound: 'Esa feria no consta en nuestra base de datos, pero en breve estará dada de alta.',
      sending: 'Comprobando…', error: 'No hemos podido registrar tu consulta. Inténtalo de nuevo en unos minutos.' },
    en: { legend: 'Search for the trade fair you are interested in', ph: 'Fair or city name…', go: 'Search',
      notFound: 'That fair is not in our database yet, but it will be added shortly.',
      sending: 'Checking…', error: 'We could not register your query. Please try again in a few minutes.' },
    de: { legend: 'Suchen Sie die Messe, die Sie interessiert', ph: 'Name der Messe oder Stadt…', go: 'Suchen',
      notFound: 'Diese Messe ist noch nicht in unserer Datenbank, wird aber in Kürze aufgenommen.',
      sending: 'Wird geprüft…', error: 'Ihre Anfrage konnte nicht registriert werden. Bitte versuchen Sie es in einigen Minuten erneut.' },
    pt: { legend: 'Procure a feira que lhe interessa', ph: 'Nome da feira ou cidade…', go: 'Procurar',
      notFound: 'Essa feira não consta na nossa base de dados, mas em breve será dada de alta.',
      sending: 'A verificar…', error: 'Não foi possível registar a sua consulta. Tente novamente dentro de alguns minutos.' },
    fr: { legend: 'Cherchez le salon qui vous intéresse', ph: 'Nom du salon ou ville…', go: 'Rechercher',
      notFound: "Ce salon ne figure pas dans notre base de données, mais il y sera ajouté sous peu.",
      sending: 'Vérification…', error: "Nous n'avons pas pu enregistrer votre demande. Réessayez dans quelques minutes." },
    it: { legend: 'Cerca la fiera che ti interessa', ph: 'Nome della fiera o città…', go: 'Cerca',
      notFound: 'Questa fiera non è ancora nel nostro archivio, ma sarà inserita a breve.',
      sending: 'Verifica in corso…', error: 'Non è stato possibile registrare la tua richiesta. Riprova tra qualche minuto.' },
    nl: { legend: 'Zoek de beurs die u interesseert', ph: 'Naam van de beurs of stad…', go: 'Zoeken',
      notFound: 'Deze beurs staat nog niet in onze database, maar wordt binnenkort toegevoegd.',
      sending: 'Bezig met controleren…', error: 'We konden uw vraag niet registreren. Probeer het over enkele minuten opnieuw.' },
    zh: { legend: '搜索您感兴趣的展会', ph: '展会名称或城市…', go: '搜索',
      notFound: '该展会尚未收录在我们的数据库中，但很快就会加入。',
      sending: '正在查询…', error: '未能提交您的查询，请几分钟后重试。' },
    hi: { legend: 'वह मेला खोजें जिसमें आपकी रुचि है', ph: 'मेले या शहर का नाम…', go: 'खोजें',
      notFound: 'यह मेला अभी हमारे डेटाबेस में नहीं है, लेकिन शीघ्र ही जोड़ दिया जाएगा।',
      sending: 'जाँच जारी…', error: 'हम आपकी पूछताछ दर्ज नहीं कर सके। कृपया कुछ मिनट बाद पुनः प्रयास करें।' },
    ko: { legend: '관심 있는 박람회를 검색하세요', ph: '박람회명 또는 도시…', go: '검색',
      notFound: '해당 박람회는 아직 데이터베이스에 없지만 곧 등록될 예정입니다.',
      sending: '확인 중…', error: '문의를 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.' },
    ja: { legend: '気になる展示会を検索', ph: '展示会名または都市名…', go: '検索',
      notFound: 'その展示会はまだ当社のデータベースにありませんが、まもなく登録されます。',
      sending: '確認中…', error: 'お問い合わせを登録できませんでした。数分後にもう一度お試しください。' }
  };
  $: s = strings[lang] || strings.es;

  let query = '';
  let focused = false;
  let activeIdx = -1;
  let status = '';   // '', 'sending', 'notfound', 'error'
  let lastSent = '';  // texto normalizado del último envío, para saber cuándo limpiar
  let inputEl;
  let website = '';  // honeypot: si un bot lo rellena, no se envía nada
  const mountedAt = Date.now();

  $: q = norm(query);
  // Ranking del predictor. El corte plano a 8 con orden alfabético dejaba ferias fuera
  // sin remedio: al teclear "Madrid" coincidían las ~29 de la ciudad y solo se veían las
  // 8 primeras por alfabeto (FIAA, por la F, no aparecía nunca). Ahora: primero lo que
  // EMPIEZA por lo tecleado (nombre antes que ciudad), después lo que lo contiene; y el
  // tope sube a 40 con la lista desplazable, para que una ciudad muestre todas sus ferias.
  const rank = (o, term) => {
    if (o.key.startsWith(term)) return 0;
    if (o.cityKey && o.cityKey.startsWith(term)) return 1;
    if (o.key.includes(term)) return 2;
    if (o.cityKey && o.cityKey.includes(term)) return 3;
    return 9;
  };
  $: matches = (q.length >= 1)
    ? options
        .map((o) => ({ o, r: rank(o, q) }))
        .filter((x) => x.r < 9)
        .sort((a, b) => a.r - b.r || a.o.name.localeCompare(b.o.name, 'es'))
        .map((x) => x.o)
        .slice(0, 40)
    : [];
  $: showSuggest = focused && matches.length > 0;

  function go(o) {
    if (!o) return;
    window.location.href = fairUrl(o.slug, lang);
  }

  // Enviar: si hay una coincidencia clara, se va a su ficha; si no, se registra.
  async function submit() {
    if (!q) { inputEl?.focus(); return; }
    const exact = options.find((o) => o.key === q);
    if (exact) { go(exact); return; }
    if (matches.length) { go(matches[activeIdx >= 0 ? activeIdx : 0]); return; }
    await reportMissing();
  }

  async function reportMissing() {
    lastSent = q;
    status = 'sending';
    try {
      const body = new FormData();
      body.append('form_feria', query.slice(0, 120));
      body.append('form_lang', lang);
      body.append('form_url', typeof location !== 'undefined' ? location.href : '');
      body.append('form_website', website);
      body.append('form_elapsed', String(Date.now() - mountedAt));
      const r = await fetch('/admin/ajax_fair_request.php', { method: 'POST', body });
      const j = await r.json().catch(() => ({}));
      status = j && j.error === 'success' ? 'notfound' : 'error';
    } catch (e) {
      status = 'error';
    }
  }

  function onKeydown(e) {
    if (showSuggest) {
      if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, matches.length - 1); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); return; }
      if (e.key === 'Escape') { focused = false; activeIdx = -1; return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  }

  // Al escribir algo distinto de lo último enviado se limpia el aviso anterior.
  // Se compara contra `lastSent` a propósito: una condición que leyera `status`
  // volvería a dispararse al asignarlo y borraría el mensaje nada más mostrarlo.
  $: if (q !== lastSent && status) { status = ''; }
</script>

<section class="fair-search" aria-label={s.legend}>
  <h2 class="fs-legend">{s.legend}</h2>
  <div class="fs-box">
    <div class="fs-field">
      <!-- svelte-ignore a11y-autocomplete-valid -->
      <input
        bind:this={inputEl}
        bind:value={query}
        class="fs-input"
        type="text"
        autocomplete="off"
        placeholder={s.ph}
        aria-label={s.legend}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showSuggest}
        aria-controls="fs-list"
        on:focus={() => (focused = true)}
        on:blur={() => setTimeout(() => (focused = false), 150)}
        on:keydown={onKeydown}
      />
      {#if showSuggest}
        <ul class="fs-list" id="fs-list" role="listbox">
          {#each matches as o, i (o.slug)}
            <li role="option" aria-selected={i === activeIdx}>
              <a href={fairUrl(o.slug, lang)} class:active={i === activeIdx} on:mousedown|preventDefault={() => go(o)}>
                <span class="fs-name">{o.name}</span>
                {#if o.city}<span class="fs-city">{o.city}</span>{/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <button type="button" class="fs-go" on:click={submit}>{s.go}</button>
  </div>

  <!-- Honeypot: invisible para personas, tentador para bots. -->
  <input class="fs-hp" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" bind:value={website} />

  {#if status === 'sending'}
    <p class="fs-msg" role="status">{s.sending}</p>
  {:else if status === 'notfound'}
    <p class="fs-msg fs-msg-info" role="status">{s.notFound}</p>
  {:else if status === 'error'}
    <p class="fs-msg fs-msg-error" role="status">{s.error}</p>
  {/if}
</section>

<style>
  .fair-search {
    max-width: var(--container, 1140px);
    margin: 0 auto;
    padding: 2.6rem 15px 0;
    text-align: center;
  }
  .fs-legend {
    margin: 0 0 1.1rem;
    font-size: clamp(1.35rem, 3.4vw, 2rem);
    line-height: 1.25;
  }
  /* Píldora única: el campo y el botón comparten un solo borde redondeado, y el botón
     va embebido a la derecha. El borde vive en el contenedor (no en el input) para que
     el foco ilumine la píldora entera. */
  .fs-box {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 540px;
    margin: 0 auto;
    background: #fff;
    border: 2px solid #d8d8d2;
    border-radius: 999px;
    padding: 0.32rem 0.32rem 0.32rem 0.4rem;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .fs-box:focus-within {
    border-color: var(--gold, #ffc800);
    box-shadow: 0 0 0 4px rgba(255, 200, 0, 0.18);
  }
  .fs-field { position: relative; flex: 1 1 auto; text-align: left; min-width: 0; }
  .fs-input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.62rem 0.55rem 0.62rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    color: #1a1e21;
    background: transparent;
    border: none;
  }
  .fs-input:focus { outline: none; }
  .fs-go {
    flex: none;
    padding: 0.62rem 1.35rem;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a1e21;
    background: var(--gold, #ffc800);
    border: none;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
  }
  .fs-go:hover { filter: brightness(0.95); }

  /* Lista de predicción: se superpone al contenido siguiente, como en el formulario. */
  .fs-list {
    position: absolute;
    z-index: 30;
    /* Cuelga de la píldora, no del input: así no se pega al texto ni tapa el borde. */
    top: calc(100% + 12px);
    left: -0.4rem;
    right: -0.4rem;
    margin: 0;
    padding: 0.3rem 0;
    list-style: none;
    background: #fff;
    border: 1px solid #e2e2de;
    border-radius: 10px;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
    max-height: 320px;
    overflow-y: auto;
  }
  .fs-list a {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.6rem 1rem;
    text-decoration: none;
    color: #1a1e21;
  }
  .fs-list a:hover,
  .fs-list a.active { background: rgba(255, 200, 0, 0.16); }
  .fs-name { font-weight: 700; font-size: 0.98rem; }
  .fs-city { font-size: 0.85rem; color: #6c7169; white-space: nowrap; }

  .fs-msg {
    max-width: 540px;
    margin: 0.9rem auto 0;
    font-size: 0.97rem;
    line-height: 1.5;
  }
  .fs-msg-info { color: #1a1e21; }
  .fs-msg-error { color: #b3261e; }

  /* Honeypot fuera de la vista y del foco, pero no display:none (los bots lo detectan). */
  .fs-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  @media (max-width: 480px) {
    /* La píldora se mantiene: solo se aprieta el botón para que quepa el texto. */
    .fs-go { padding: 0.62rem 1rem; font-size: 0.9rem; }
    .fs-input { padding-left: 0.85rem; }
  }
</style>
