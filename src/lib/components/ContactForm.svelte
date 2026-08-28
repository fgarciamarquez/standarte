<script>
  import { onMount } from 'svelte';
  import { BRAND } from '$lib/brand.js';
  import { fly, fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { budgetBands, bandLabel, tierNames } from '$lib/pricingTiers.js';
  import { fairsData } from '$lib/fairsData.js';
  import { activitiesForFair, fairsForActivity } from '$lib/fairTags.js';
  export let lang;
  export let labels;
  // 'dark' = banda oscura por defecto; 'light' = integrada con el fondo claro de
  // las páginas de ciudad. El asistente respeta ambas variantes.
  export let variant = 'dark';
  export let initialFair = '';
  // 'compact' = versión integrada para páginas de vídeo/proyecto: títulos en h4 y
  // sin la ficha de la persona de contacto (Patricia).
  export let compact = false;

  // StandQuote: título único del formulario (lo fija la pestaña activa del sistema
  // de pestañas de la portada); sustituye al par "Presupuesto en 24h / Prototipo 3D".
  export let sqTitle = '';

  // Antetítulo sobre el título del formulario: previsión en 5 segundos.
  // Reclamo bajo el título del formulario: prototipo 3D en 3 días.
  const prototypeLabels = {
    es: 'Prototipo 3D en 3 días', en: '3D prototype in 3 days', de: '3D-Prototyp in 3 Tagen',
    pt: 'Protótipo 3D em 3 dias', fr: 'Prototype 3D en 3 jours', it: 'Prototipo 3D in 3 giorni',
    nl: '3D-prototype in 3 dagen', zh: '3天内3D原型', hi: '3 दिन में 3D प्रोटोटाइप',
    ko: '3일 내 3D 프로토타입', ja: '3日で3Dプロトタイプ'
  };

  // Textos del asistente (chrome de pasos). Los nombres de campo reutilizan `labels.form.*`.
  const wizI18n = {
    es: { ev: '¿Para qué feria o evento?', evSub: 'La feria y la superficie aproximada de tu espacio.', bg: '¿Qué presupuesto barajas?', bgHelp: 'Elige la banda que mejor encaje. Es orientativo: el presupuesto final lo ajustamos contigo.', pr: 'Cuéntanos tu proyecto', prSub: 'Ideas, referencias, necesidades… cuanto más sepamos, mejor.', ct: '¿Cómo te contactamos?', back: 'Atrás', next: 'Continuar', unsure: 'Aún no lo sé', edit: 'editar' },
    en: { ev: 'Which fair or event?', evSub: 'The fair and the approximate size of your space.', bg: 'What budget are you considering?', bgHelp: 'Pick the band that fits best. It’s just a guide — we fine-tune the final quote with you.', pr: 'Tell us about your project', prSub: 'Ideas, references, needs… the more we know, the better.', ct: 'How can we reach you?', back: 'Back', next: 'Continue', unsure: 'Not sure yet', edit: 'edit' },
    de: { ev: 'Für welche Messe oder Veranstaltung?', evSub: 'Die Messe und die ungefähre Größe Ihrer Fläche.', bg: 'Welches Budget haben Sie im Blick?', bgHelp: 'Wählen Sie die passende Spanne. Nur ein Richtwert – das endgültige Angebot stimmen wir mit Ihnen ab.', pr: 'Erzählen Sie uns von Ihrem Projekt', prSub: 'Ideen, Referenzen, Anforderungen… je mehr wir wissen, desto besser.', ct: 'Wie erreichen wir Sie?', back: 'Zurück', next: 'Weiter', unsure: 'Noch unsicher', edit: 'bearbeiten' },
    pt: { ev: 'Para que feira ou evento?', evSub: 'A feira e a área aproximada do seu espaço.', bg: 'Que orçamento está a considerar?', bgHelp: 'Escolha a faixa que melhor encaixa. É orientativo: o orçamento final ajustamos consigo.', pr: 'Conte-nos o seu projeto', prSub: 'Ideias, referências, necessidades… quanto mais soubermos, melhor.', ct: 'Como o contactamos?', back: 'Voltar', next: 'Continuar', unsure: 'Ainda não sei', edit: 'editar' },
    fr: { ev: 'Pour quel salon ou événement ?', evSub: 'Le salon et la surface approximative de votre espace.', bg: 'Quel budget envisagez-vous ?', bgHelp: 'Choisissez la tranche la plus adaptée. C’est indicatif : nous affinons le devis final avec vous.', pr: 'Parlez-nous de votre projet', prSub: 'Idées, références, besoins… plus nous en savons, mieux c’est.', ct: 'Comment vous contacter ?', back: 'Retour', next: 'Continuer', unsure: 'Pas encore sûr', edit: 'modifier' },
    it: { ev: 'Per quale fiera o evento?', evSub: 'La fiera e la superficie approssimativa del tuo spazio.', bg: 'Quale budget stai considerando?', bgHelp: 'Scegli la fascia più adatta. È indicativo: il preventivo finale lo definiamo con te.', pr: 'Raccontaci il tuo progetto', prSub: 'Idee, riferimenti, esigenze… più sappiamo, meglio è.', ct: 'Come possiamo contattarti?', back: 'Indietro', next: 'Continua', unsure: 'Non lo so ancora', edit: 'modifica' },
    nl: { ev: 'Voor welke beurs of welk evenement?', evSub: 'De beurs en de geschatte grootte van uw ruimte.', bg: 'Welk budget overweegt u?', bgHelp: 'Kies de best passende marge. Louter indicatief — de definitieve offerte stemmen we met u af.', pr: 'Vertel ons over uw project', prSub: 'Ideeën, referenties, wensen… hoe meer we weten, hoe beter.', ct: 'Hoe kunnen we u bereiken?', back: 'Terug', next: 'Doorgaan', unsure: 'Nog niet zeker', edit: 'bewerken' },
    zh: { ev: '参加哪个展会或活动？', evSub: '展会名称及您展位的大致面积。', bg: '您考虑的预算范围？', bgHelp: '选择最合适的区间。仅供参考——最终报价我们会与您共同确定。', pr: '介绍一下您的项目', prSub: '想法、参考、需求……了解越多越好。', ct: '如何与您联系？', back: '返回', next: '继续', unsure: '暂不确定', edit: '编辑' },
    hi: { ev: 'किस मेले या आयोजन के लिए?', evSub: 'मेला और आपके स्थान का अनुमानित क्षेत्रफल।', bg: 'आप किस बजट पर विचार कर रहे हैं?', bgHelp: 'सबसे उपयुक्त श्रेणी चुनें। यह केवल अनुमान है — अंतिम बजट हम आपके साथ तय करेंगे।', pr: 'हमें अपने प्रोजेक्ट के बारे में बताएं', prSub: 'विचार, संदर्भ, ज़रूरतें… जितना अधिक जानेंगे, उतना बेहतर।', ct: 'हम आपसे कैसे संपर्क करें?', back: 'पीछे', next: 'जारी रखें', unsure: 'अभी तय नहीं', edit: 'संपादित करें' },
    ko: { ev: '어떤 전시회나 행사인가요?', evSub: '전시회명과 부스의 대략적인 면적.', bg: '어느 정도의 예산을 고려하시나요?', bgHelp: '가장 적합한 구간을 선택하세요. 참고용이며, 최종 견적은 함께 조정합니다.', pr: '프로젝트를 알려주세요', prSub: '아이디어, 참고자료, 요구사항… 많이 알수록 좋습니다.', ct: '어떻게 연락드릴까요?', back: '뒤로', next: '계속', unsure: '아직 미정', edit: '수정' },
    ja: { ev: 'どの展示会・イベントですか？', evSub: '展示会名と、おおよその面積を教えてください。', bg: 'ご検討中の予算は？', bgHelp: '最適な範囲をお選びください。目安であり、最終的なお見積りは一緒に調整します。', pr: 'プロジェクトについて教えてください', prSub: 'アイデア、参考例、ご要望…情報が多いほど助かります。', ct: 'ご連絡先を教えてください', back: '戻る', next: '次へ', unsure: 'まだ未定', edit: '編集' }
  };
  $: wz = wizI18n[lang] || wizI18n.en;
  $: names = tierNames[lang] || tierNames.en;

  // Textos del paso "ferias del mismo sector" (sinergia). Objeto aparte por sencillez.
  const synI18n = {
    es: { title: '¿Vas a otras ferias del sector?', sub: 'Selecciona las que te interesen y observa el porcentaje de ahorro', none: 'No hemos encontrado otras ferias del mismo sector. Puedes continuar.' },
    en: { title: 'Attending other fairs in your sector?', sub: 'Pick the ones you like and watch the savings percentage', none: 'We found no other fairs in the same sector. You can continue.' },
    de: { title: 'Weitere Messen Ihrer Branche?', sub: 'Wählen Sie die passenden aus und sehen Sie den Rabattprozentsatz', none: 'Keine weiteren Messen derselben Branche gefunden. Sie können fortfahren.' },
    pt: { title: 'Vai a outras feiras do setor?', sub: 'Selecione as que lhe interessam e veja a percentagem de poupança', none: 'Não encontrámos outras feiras do mesmo setor. Pode continuar.' },
    fr: { title: 'D’autres salons de votre secteur ?', sub: 'Sélectionnez ceux qui vous intéressent et observez le pourcentage de remise', none: 'Aucun autre salon du même secteur trouvé. Vous pouvez continuer.' },
    it: { title: 'Vai ad altre fiere del settore?', sub: 'Seleziona quelle che ti interessano e osserva la percentuale di risparmio', none: 'Nessun’altra fiera dello stesso settore trovata. Puoi continuare.' },
    nl: { title: 'Naar andere beurzen in uw sector?', sub: 'Kies de beurzen die u interesseren en bekijk het kortingspercentage', none: 'Geen andere beurzen in dezelfde sector gevonden. U kunt doorgaan.' },
    zh: { title: '还参加同行业的其他展会吗？', sub: '选择您感兴趣的展会，查看节省比例', none: '未找到同行业的其他展会。您可以继续。' },
    hi: { title: 'क्या आप अपने क्षेत्र के अन्य मेलों में भी जा रहे हैं?', sub: 'अपनी पसंद के मेले चुनें और बचत का प्रतिशत देखें', none: 'उसी क्षेत्र का कोई अन्य मेला नहीं मिला। आप जारी रख सकते हैं।' },
    ko: { title: '같은 분야의 다른 전시회도 참가하시나요?', sub: '관심 있는 전시회를 선택하고 절감 비율을 확인하세요', none: '같은 분야의 다른 전시회를 찾지 못했습니다. 계속 진행할 수 있습니다.' },
    ja: { title: '同じ分野の他の展示会にも出展しますか？', sub: '気になる展示会を選び、割引率をご確認ください', none: '同じ分野の他の展示会は見つかりませんでした。続行できます。' }
  };
  $: syn = synI18n[lang] || synI18n.en;

  // ─── Estado del asistente ──────────────────────────────────────────────
  const TOTAL = 5;
  let step = 1;
  let fair = initialFair;
  let metros = '';
  let rango = null;            // clave de banda, 'unsure', o null
  let descripcion = '';

  // ── Archivos adjuntos del paso 4 (planos, fotos, briefing) ──────────────────
  // Los mismos límites que aplica el servidor en ajax_presupuesto_form.php. Aquí se
  // comprueban para avisar al momento; la validación que manda es la del servidor.
  const FILE_MAX_COUNT = 5;
  const FILE_MAX_BYTES = 8 * 1024 * 1024;
  const FILE_MAX_TOTAL = 20 * 1024 * 1024;
  const FILE_EXT = ['pdf','jpg','jpeg','png','webp','avif','gif','dwg','dxf','zip','doc','docx','xls','xlsx','ppt','pptx','ai','psd','svg','txt'];
  let archivos = [];
  let dragOver = false;
  let fileError = '';
  let fileInputEl;

  // Textos del adjuntador. `hint` resume qué se puede subir; los tres mensajes de
  // error son funciones porque llevan dentro el nombre del archivo o el límite.
  const fileCopy = {
    es: { title: 'Planos, fotos o referencias', drop: 'Arrastra tus archivos aquí', or: 'o', browse: 'selecciónalos', hint: 'PDF, imágenes, DWG, ZIP… hasta 5 archivos de 8 MB', remove: 'Quitar',
      max: (n) => `Máximo ${n} archivos`, type: (f) => `${f}: tipo no admitido`, big: (f) => `${f}: supera 8 MB`, total: 'Se supera el total de 20 MB' },
    en: { title: 'Drawings, photos or references', drop: 'Drag your files here', or: 'or', browse: 'browse', hint: 'PDF, images, DWG, ZIP… up to 5 files of 8 MB', remove: 'Remove',
      max: (n) => `Maximum ${n} files`, type: (f) => `${f}: file type not allowed`, big: (f) => `${f}: over 8 MB`, total: 'Total of 20 MB exceeded' },
    de: { title: 'Pläne, Fotos oder Referenzen', drop: 'Dateien hierher ziehen', or: 'oder', browse: 'auswählen', hint: 'PDF, Bilder, DWG, ZIP… bis zu 5 Dateien à 8 MB', remove: 'Entfernen',
      max: (n) => `Maximal ${n} Dateien`, type: (f) => `${f}: Dateityp nicht zulässig`, big: (f) => `${f}: über 8 MB`, total: 'Gesamtgrenze von 20 MB überschritten' },
    pt: { title: 'Plantas, fotos ou referências', drop: 'Arraste os seus ficheiros para aqui', or: 'ou', browse: 'selecione-os', hint: 'PDF, imagens, DWG, ZIP… até 5 ficheiros de 8 MB', remove: 'Remover',
      max: (n) => `Máximo ${n} ficheiros`, type: (f) => `${f}: tipo não admitido`, big: (f) => `${f}: excede 8 MB`, total: 'Excede o total de 20 MB' },
    fr: { title: 'Plans, photos ou références', drop: 'Glissez vos fichiers ici', or: 'ou', browse: 'sélectionnez-les', hint: 'PDF, images, DWG, ZIP… jusqu’à 5 fichiers de 8 Mo', remove: 'Retirer',
      max: (n) => `${n} fichiers maximum`, type: (f) => `${f} : type non autorisé`, big: (f) => `${f} : dépasse 8 Mo`, total: 'Total de 20 Mo dépassé' },
    it: { title: 'Disegni, foto o riferimenti', drop: 'Trascina qui i tuoi file', or: 'oppure', browse: 'selezionali', hint: 'PDF, immagini, DWG, ZIP… fino a 5 file da 8 MB', remove: 'Rimuovi',
      max: (n) => `Massimo ${n} file`, type: (f) => `${f}: tipo non ammesso`, big: (f) => `${f}: supera 8 MB`, total: 'Superato il totale di 20 MB' },
    nl: { title: 'Tekeningen, foto’s of referenties', drop: 'Sleep je bestanden hierheen', or: 'of', browse: 'selecteer ze', hint: 'PDF, afbeeldingen, DWG, ZIP… tot 5 bestanden van 8 MB', remove: 'Verwijderen',
      max: (n) => `Maximaal ${n} bestanden`, type: (f) => `${f}: bestandstype niet toegestaan`, big: (f) => `${f}: groter dan 8 MB`, total: 'Totaal van 20 MB overschreden' },
    zh: { title: '图纸、照片或参考资料', drop: '将文件拖到这里', or: '或', browse: '选择文件', hint: 'PDF、图片、DWG、ZIP…最多 5 个文件，每个 8 MB', remove: '移除',
      max: (n) => `最多 ${n} 个文件`, type: (f) => `${f}：不支持的文件类型`, big: (f) => `${f}：超过 8 MB`, total: '已超过 20 MB 的总上限' },
    hi: { title: 'नक्शे, तस्वीरें या संदर्भ', drop: 'अपनी फ़ाइलें यहाँ खींचें', or: 'या', browse: 'चुनें', hint: 'PDF, छवियाँ, DWG, ZIP… अधिकतम 5 फ़ाइलें, प्रत्येक 8 MB', remove: 'हटाएँ',
      max: (n) => `अधिकतम ${n} फ़ाइलें`, type: (f) => `${f}: यह प्रकार मान्य नहीं`, big: (f) => `${f}: 8 MB से बड़ी`, total: '20 MB की कुल सीमा पार' },
    ko: { title: '도면, 사진 또는 참고 자료', drop: '파일을 여기로 끌어다 놓으세요', or: '또는', browse: '파일 선택', hint: 'PDF, 이미지, DWG, ZIP… 최대 5개, 각 8 MB', remove: '삭제',
      max: (n) => `최대 ${n}개 파일`, type: (f) => `${f}: 허용되지 않는 형식`, big: (f) => `${f}: 8 MB 초과`, total: '총 20 MB를 초과했습니다' },
    ja: { title: '図面・写真・参考資料', drop: 'ファイルをここにドラッグ', or: 'または', browse: '選択する', hint: 'PDF、画像、DWG、ZIP… 最大5件、各8 MB', remove: '削除',
      max: (n) => `最大${n}件まで`, type: (f) => `${f}：対応していない形式`, big: (f) => `${f}：8 MB を超えています`, total: '合計20 MBを超えています' }
  };
  $: fx = fileCopy[lang] || fileCopy.es;

  const extOf = (n) => (n.split('.').pop() || '').toLowerCase();
  const humanSize = (b) => (b >= 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');

  function addFiles(list) {
    const incoming = Array.from(list || []);
    if (!incoming.length) return;
    const errs = [];
    let total = archivos.reduce((s, f) => s + f.size, 0);
    const next = [...archivos];
    for (const f of incoming) {
      if (next.length >= FILE_MAX_COUNT) { errs.push(fx.max(FILE_MAX_COUNT)); break; }
      // Mismo nombre y tamaño: es el mismo archivo soltado dos veces.
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      if (!FILE_EXT.includes(extOf(f.name))) { errs.push(fx.type(f.name)); continue; }
      if (f.size > FILE_MAX_BYTES) { errs.push(fx.big(f.name)); continue; }
      if (total + f.size > FILE_MAX_TOTAL) { errs.push(fx.total); continue; }
      next.push(f); total += f.size;
    }
    archivos = next;
    fileError = errs.join(' · ');
  }

  function removeFile(i) {
    archivos = archivos.filter((_, k) => k !== i);
    fileError = '';
    // Se limpia el input para poder volver a elegir el mismo archivo recién quitado.
    if (fileInputEl) fileInputEl.value = '';
  }

  function onDrop(e) {
    e.preventDefault();
    dragOver = false;
    addFiles(e.dataTransfer?.files);
  }
  let nombre = '';
  let email = '';
  let privacy = false;

  // Si un CTA externo fija la feria (Site hace bind:initialFair), la reflejamos.
  let lastInitial = initialFair;
  $: if (initialFair !== lastInitial) { lastInitial = initialFair; if (initialFair) fair = initialFair; }

  // ── Autocompletado del campo FERIA sobre la malla de ferias (fairsData) ──
  // Predicción según lo que escribe el cliente: filtra por nombre o ciudad
  // (sin distinguir mayúsculas ni acentos) y muestra las coincidencias.
  const normFair = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const NON_CITY = ['Itinerante', 'España', 'Europa', 'Portugal', 'Portugal Sur'];
  const fairOptions = (() => {
    const seen = new Set(); const out = [];
    for (const f of fairsData) {
      const k = normFair(f.name);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      // Ciudad solo como pista secundaria si NO está ya dentro del nombre (evita
      // redundancias tipo "Fima Zaragoza — Zaragoza"), y nunca para pseudo-ciudades.
      const showCity = f.city && !NON_CITY.includes(f.city) && !k.includes(normFair(f.city));
      out.push({ name: f.name, city: showCity ? f.city : '' });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  })();
  let fairFocused = false;
  let fairActiveIdx = -1;
  $: fairQuery = normFair(fair);
  $: fairMatches = (fairFocused && fairQuery.length >= 1)
    ? fairOptions.filter((o) => normFair(o.name).includes(fairQuery) || normFair(o.city).includes(fairQuery)).slice(0, 8)
    : [];
  // No mostrar el desplegable si el texto ya coincide exactamente con la única opción.
  $: showFairSuggest = fairMatches.length > 0 && !(fairMatches.length === 1 && normFair(fairMatches[0].name) === fairQuery);
  function pickFair(o) { fair = o.name; fairFocused = false; fairActiveIdx = -1; }
  function fairKeydown(e) {
    if (showFairSuggest) {
      if (e.key === 'ArrowDown') { e.preventDefault(); fairActiveIdx = Math.min(fairActiveIdx + 1, fairMatches.length - 1); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); fairActiveIdx = Math.max(fairActiveIdx - 1, 0); return; }
      if (e.key === 'Enter' && fairActiveIdx >= 0 && fairMatches[fairActiveIdx]) { e.preventDefault(); pickFair(fairMatches[fairActiveIdx]); return; }
      if (e.key === 'Escape') { fairFocused = false; fairActiveIdx = -1; return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); goNext(); }
  }

  const metrosChips = [9, 18, 30, 50];
  const bandByKey = Object.fromEntries(budgetBands.map((b) => [b.key, b]));
  const tierIndex = { modular: 1, medida: 2, premium: 3, singular: 4 };

  // ── Paso 2: ferias del MISMO sector/actividad que la escrita (sinergia) ──
  const fairBySlug = new Map(fairsData.map((f) => [f.slug, f]));
  // Feria reconocida a partir de lo escrito: primero match exacto y, si no, por
  // inclusión (para que "Cosmobeauty" case con "CosmoBeauty Barcelona", etc.).
  $: typedFair = !fairQuery ? null
    : (fairsData.find((f) => normFair(f.name) === fairQuery)
      || (fairQuery.length >= 3 ? fairsData.find((f) => normFair(f.name).includes(fairQuery)) : null)
      || null);
  // Prioridad por tamaño de ciudad: primero se muestran las ferias de las plazas
  // más grandes (menor índice = ciudad mayor); las no listadas van al final.
  const CITY_RANK = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Marsella', 'Toulouse', 'Lisboa', 'Oporto'];
  const cityRank = (c) => { const i = CITY_RANK.indexOf(c); return i === -1 ? 999 : i; };
  // Hermanas: comparten etiqueta de actividad (peso 1) o mismo sector (peso 0,5).
  // Se ordenan por CIUDAD MÁS GRANDE primero y, a igualdad, por afinidad. Máx. 6.
  $: siblingFairs = (() => {
    if (!typedFair) return [];
    const score = new Map();
    for (const t of activitiesForFair(typedFair.slug))
      for (const s of fairsForActivity(t)) { if (s !== typedFair.slug) score.set(s, (score.get(s) || 0) + 1); }
    // Solo por ACTIVIDAD compartida (el sector es demasiado amplio y trae ferias
    // poco relevantes). La puntuación = nº de etiquetas de actividad en común.
    // Todas las ferias afines disponibles (se permiten varias por ciudad); el carrusel
    // horizontal deja recorrerlas. Orden: ciudades grandes primero, luego afinidad.
    return [...score.entries()]
      .map(([s, sc]) => ({ f: fairBySlug.get(s), sc }))
      .filter((x) => x.f)
      .sort((a, b) => (cityRank(a.f.city) - cityRank(b.f.city)) || (b.sc - a.sc))
      .map((x) => x.f);
  })();
  // Selección múltiple (slugs), con TOPE de 2 ferias extra. Se reinicia si cambia la feria.
  const MAX_EXTRA = 2;
  let selectedFairs = [];
  let synForSlug = '';
  $: if ((typedFair?.slug || '') !== synForSlug) { synForSlug = typedFair?.slug || ''; selectedFairs = []; }
  function toggleFairPick(slug) {
    if (selectedFairs.includes(slug)) { selectedFairs = selectedFairs.filter((s) => s !== slug); return; }
    if (selectedFairs.length >= MAX_EXTRA) return; // no más de 2 extra
    selectedFairs = [...selectedFairs, slug];
  }
  // Ahorro por sinergia, ÚNICO (no acumulado). Contando la feria consultada:
  // 2 eventos (1 feria elegida) = 15%, 3 eventos (2 elegidas) = 25%.
  const savingsScale = [0, 15, 25];
  // Escalera de descuentos que se muestra siempre (gris); se ilumina SOLO el tramo activo.
  const savingsTiers = [{ n: 1, pct: 15 }, { n: 2, pct: 25 }];
  $: ahorroPct = savingsScale[Math.min(selectedFairs.length, MAX_EXTRA)];
  $: feriasExtraLabel = selectedFairs.map((s) => fairBySlug.get(s)?.name).filter(Boolean).join(', ');

  // Estadística de hover sobre los botones de rango (1..4), independiente de la
  // elección final: nº de pasadas (cada mouseenter suma 1) y tiempo sumatorio que
  // el ratón permanece sobre cada botón (mouseenter → mouseleave).
  let hoverCounts = { modular: 0, medida: 0, premium: 0, singular: 0 };
  let hoverMs = { modular: 0, medida: 0, premium: 0, singular: 0 };
  let hoverActive = null, hoverActiveStart = 0;
  function trackHoverEnter(key) {
    hoverCounts[key] += 1; hoverCounts = hoverCounts;
    hoverActive = key; hoverActiveStart = Date.now();
  }
  function flushHover() {
    if (hoverActive !== null) {
      hoverMs[hoverActive] += Date.now() - hoverActiveStart;
      hoverMs = hoverMs; hoverActive = null;
    }
  }
  function trackHoverLeave(key) { if (hoverActive === key) flushHover(); }
  const fmtSec = (ms) => (ms / 1000).toFixed(1).replace('.', ',');
  $: hoverStats = budgetBands.map((b) => `${tierIndex[b.key]}=${hoverCounts[b.key]}`).join(', ');
  $: hoverTimeStats = budgetBands.map((b) => `${tierIndex[b.key]}=${fmtSec(hoverMs[b.key])} seg`).join(', ');
  $: hoverTotal = budgetBands.reduce((s, b) => s + hoverCounts[b.key], 0);

  // Validación por paso.
  $: metrosNum = parseInt(metros, 10);
  $: step1Valid = fair.trim() !== '' && metrosNum > 0;
  $: step2Valid = rango !== null;
  $: step3Valid = descripcion.trim() !== '';
  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  $: step4Valid = nombre.trim() !== '' && emailValid && privacy;
  // Paso 2 = ferias sugeridas (opcional, siempre válido). Los demás se desplazan.
  $: stepValid = step === 1 ? step1Valid : step === 2 ? true : step === 3 ? step2Valid : step === 4 ? step3Valid : step4Valid;

  // Etiqueta del rango elegido y descripción final (el rango viaja dentro de la
  // descripción para que el equipo lo vea sin tocar el backend ni Supabase).
  $: rangoLabel = rango && rango !== 'unsure'
    ? `${names[rango]} · ${bandLabel(bandByKey[rango])}`
    : (rango === 'unsure' ? wz.unsure : '');
  $: descripcionFinal = [
    rangoLabel ? `${labels.form.budget}: ${rangoLabel}` : null,
    hoverTotal > 0 ? `Hover rangos (1-4) — pasadas: ${hoverStats} · tiempo: ${hoverTimeStats}` : null,
    descripcion
  ].filter(Boolean).join('\n\n');
  // Sinergia (paso 2) en su PROPIO campo: ferias extra elegidas + ahorro estimado.
  // Viaja aparte (form_sinergia) para que el equipo la vea como fila dedicada en el aviso.
  $: sinergiaValue = feriasExtraLabel ? `${feriasExtraLabel} — ahorro estimado ${ahorroPct}%` : '';

  // Chips de resumen (feria, metros, rango) para volver a un paso al instante.
  $: recap = [
    fair.trim() && { label: fair.trim(), goto: 1 },
    metrosNum > 0 && { label: `${metrosNum} m²`, goto: 1 },
    selectedFairs.length && { label: `+${selectedFairs.length} · -${ahorroPct}%`, goto: 2 },
    rango && { label: rango === 'unsure' ? wz.unsure : names[rango], goto: 3 }
  ].filter(Boolean);

  let status = null;
  let statusMessage = '';
  let sending = false;
  let mountedAt = 0;
  onMount(() => { mountedAt = Date.now(); });

  function goNext() { flushHover(); if (stepValid && step < TOTAL) step += 1; }
  function goBack() { if (step > 1) step -= 1; }
  function goTo(n) { if (n >= 1 && n <= TOTAL) step = n; }
  function pickBand(key) { rango = key; }

  async function handleSubmit(event) {
    event.preventDefault();
    // En pasos intermedios, Enter/submit simplemente avanza.
    if (step < TOTAL) { goNext(); return; }
    if (!step4Valid) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('form_elapsed', String(mountedAt ? Date.now() - mountedAt : 3000));
    // Los archivos se añaden a mano porque la lista la gestiona el componente (se puede
    // soltar, elegir y quitar): el <input type="file"> no refleja ese estado.
    for (const f of archivos) formData.append('form_archivos[]', f, f.name);

    sending = true; status = null; statusMessage = '';
    try {
      const response = await fetch(form.action, { method: 'POST', body: formData });
      const result = await response.json();
      status = result.error === 'success' ? 'success' : 'error';
      statusMessage = result.msg || labels.formSuccess;
    } catch (error) {
      status = 'error';
      statusMessage = labels.formError || 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.';
    } finally {
      sending = false;
    }
  }
</script>

<section id="contact" class="section contact" class:contact-light={variant === 'light'} class:contact-compact={compact}>
  <div class="contact-form">
    <div class="contact-layout">
      <aside class="contact-us">
        {#if sqTitle}
          <svelte:element this={compact ? 'h4' : 'h3'}>{sqTitle}</svelte:element>
        {:else}
          <svelte:element this={compact ? 'h4' : 'h3'}>{labels.contactTitle}</svelte:element>
          <svelte:element this={compact ? 'h4' : 'h3'} class="contact-subtitle">{prototypeLabels[lang] || prototypeLabels.es}</svelte:element>
        {/if}
        {#if variant === 'light' && !compact}
          <figure class="contact-person">
            <img
              class="contact-person-photo"
              src="/img/team/patricia_jimenez.avif"
              srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
              sizes="64px"
              alt="Patricia Jiménez"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span class="contact-person-name">Patricia Jiménez</span>
              {#if labels.teamRoles?.[3]}
                <span class="contact-person-role">{labels.teamRoles[3]}</span>
              {/if}
            </figcaption>
          </figure>
        {/if}
        <ul class="lista_direccion">
          <!-- Las direcciones físicas son de Standarte: el marketplace StandQuote no las muestra. -->
          {#if !BRAND.leadGen}
            <li style="margin-bottom: 10px; line-height: 1.4;">
              <strong>{lang === 'es' ? 'Madrid' : (lang === 'zh' ? '马德里' : (lang === 'ko' ? '마드리드' : (lang === 'hi' ? 'मैड्रिड' : 'Madrid')))}:</strong> Av. de Castilla 2, San Fernando de Henares (Madrid - España)
            </li>
            <li style="margin-bottom: 18px; line-height: 1.4;">
              <strong>Extremadura:</strong> C/ Los Sauces 24, 10004 Cáceres (España)
            </li>
          {/if}
          <li class="whatsapp-li">
            <a class="contact-whatsapp" href="https://wa.me/34613097148" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>WhatsApp</span>
            </a>
          </li>
        </ul>
        {#if statusMessage && status === 'error'}
          <div id="error_presupuesto_form" class="form-error">
            <p class="form-note">{@html statusMessage}</p>
          </div>
        {/if}
      </aside>

      <div class="contact-block">
        <form id="presupuestoForm" method="post" accept-charset="UTF-8" action="/admin/ajax_presupuesto_form.php" on:submit={handleSubmit}>
          <input type="hidden" name="form_lang" value={lang} />
          <!-- Honeypot anti-spam: invisible para humanos -->
          <div class="hp-field" aria-hidden="true">
            <input type="text" name="form_web" tabindex="-1" autocomplete="off" />
          </div>
          <!-- Campos reales: se envían con el estado del asistente -->
          <input type="hidden" name="form_nombre" value={nombre} />
          <input type="hidden" name="form_email" value={email} />
          <input type="hidden" name="form_feria" value={fair} />
          <input type="hidden" name="form_metros" value={metrosNum > 0 ? metrosNum : ''} />
          <input type="hidden" name="form_presupuesto" value={rangoLabel} />
          <input type="hidden" name="form_hovers" value={hoverStats} />
          <input type="hidden" name="form_hover_times" value={hoverTimeStats} />
          <input type="hidden" name="form_descripcion" value={descripcionFinal} />
          <input type="hidden" name="form_sinergia" value={sinergiaValue} />
          <input type="hidden" name="form_privacidad" value={privacy ? '1' : ''} />

          {#if status === 'success'}
            <div class="wiz-success" in:scale={{ duration: 400, start: 0.9, easing: quintOut }}>
              <div class="wiz-success-badge" aria-hidden="true">✓</div>
              <p class="wiz-success-msg">{@html statusMessage}</p>
            </div>
          {:else}
            <div class="wiz">
              <!-- Progreso -->
              <div class="wiz-progress" aria-hidden="true">
                <div class="wiz-bar"><span class="wiz-bar-fill" style="width:{(step / TOTAL) * 100}%"></span></div>
                <span class="wiz-count">{step} / {TOTAL}</span>
              </div>

              <!-- Resumen de selección (chips que llevan al paso) -->
              {#if recap.length && step > 1}
                <div class="wiz-recap" transition:fade={{ duration: 200 }}>
                  {#each recap as r (r.label + r.goto)}
                    <button type="button" class="wiz-chip" on:click={() => goTo(r.goto)}>
                      <span class="wiz-chip-text">{r.label}</span>
                      <span class="wiz-chip-edit">{wz.edit}</span>
                    </button>
                  {/each}
                </div>
              {/if}

              {#key step}
                <div class="wiz-step" in:fly={{ x: 26, duration: 320, easing: quintOut }}>
                  {#if step === 1}
                    <h4 class="wiz-head">{wz.ev}</h4>
                    <p class="wiz-sub">{wz.evSub}</p>
                    <div class="wiz-field wiz-field--ac">
                      <label for="wz_feria" class="form-label">{labels.form.fair}</label>
                      <input id="wz_feria" class="form-control" bind:value={fair} autocomplete="off"
                        role="combobox" aria-autocomplete="list" aria-expanded={showFairSuggest} aria-controls="wz_feria_list"
                        on:input={() => { fairFocused = true; fairActiveIdx = -1; }}
                        on:focus={() => fairFocused = true}
                        on:blur={() => setTimeout(() => { fairFocused = false; }, 150)}
                        on:keydown={fairKeydown} />
                      {#if showFairSuggest}
                        <ul id="wz_feria_list" class="ac-list" role="listbox">
                          {#each fairMatches as o, i (o.name)}
                            <li role="option" aria-selected={i === fairActiveIdx}>
                              <button type="button" class="ac-item" class:ac-active={i === fairActiveIdx}
                                on:mousedown|preventDefault={() => pickFair(o)}
                                on:mouseenter={() => fairActiveIdx = i}>
                                <span class="ac-name">{o.name}</span>
                                {#if o.city}<span class="ac-city">{o.city}</span>{/if}
                              </button>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    </div>
                    <div class="wiz-field">
                      <label for="wz_metros" class="form-label">{labels.form.meters}</label>
                      <input id="wz_metros" class="form-control" type="number" min="1" inputmode="numeric" bind:value={metros}
                        on:keydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); goNext(); } }} />
                      <div class="chip-row">
                        {#each metrosChips as m}
                          <button type="button" class="chip" class:chip-on={metrosNum === m} on:click={() => metros = String(m)}>{m} m²</button>
                        {/each}
                      </div>
                    </div>

                  {:else if step === 2}
                    <h4 class="wiz-head">{syn.title}</h4>
                    <p class="wiz-sub">{syn.sub}:
                      <span class="syn-ladder" aria-live="polite">
                        {#each savingsTiers as t}
                          <span class="syn-pct" class:on={selectedFairs.length === t.n}>-{t.pct}%</span>
                        {/each}
                      </span>
                    </p>
                    {#if siblingFairs.length}
                      <div class="syn-grid">
                        {#each siblingFairs as f (f.slug)}
                          <button type="button" class="syn-card" class:selected={selectedFairs.includes(f.slug)} disabled={selectedFairs.length >= MAX_EXTRA && !selectedFairs.includes(f.slug)} aria-pressed={selectedFairs.includes(f.slug)} on:click={() => toggleFairPick(f.slug)}>
                            <span class="syn-check" aria-hidden="true">✓</span>
                            <span class="syn-name">{f.name}</span>
                            <span class="syn-meta">
                              {#if f.country && f.country !== 'es'}<span class="fair-flag flag-{f.country}" aria-hidden="true"></span>{/if}
                              {#if f.city && !NON_CITY.includes(f.city)}<span class="syn-city">{f.city}</span>{/if}
                            </span>
                          </button>
                        {/each}
                      </div>
                    {:else}
                      <p class="syn-none">{syn.none}</p>
                    {/if}

                  {:else if step === 3}
                    <h4 class="wiz-head">{wz.bg}</h4>
                    <p class="wiz-sub">{wz.bgHelp}</p>
                    <div class="band-grid">
                      {#each budgetBands as b (b.key)}
                        <button type="button" class="band-card" class:selected={rango === b.key} aria-pressed={rango === b.key} on:click={() => pickBand(b.key)} on:mouseenter={() => trackHoverEnter(b.key)} on:mouseleave={() => trackHoverLeave(b.key)}>
                          <span class="band-scale" aria-hidden="true">
                            {#each Array(4) as _, i}<span class="band-dot" class:on={i < tierIndex[b.key]}></span>{/each}
                          </span>
                          <span class="band-name">{names[b.key]}</span>
                          <span class="band-range">{bandLabel(b)}</span>
                          <span class="band-check" aria-hidden="true">✓</span>
                        </button>
                      {/each}
                    </div>
                    <button type="button" class="band-unsure" class:selected={rango === 'unsure'} aria-pressed={rango === 'unsure'} on:click={() => pickBand('unsure')}>
                      {wz.unsure}
                    </button>

                  {:else if step === 4}
                    <h4 class="wiz-head">{wz.pr}</h4>
                    <p class="wiz-sub">{wz.prSub}</p>
                    <!-- Descripción y adjuntos, en paralelo: el cliente que ya tiene
                         plano lo suelta y escribe menos. En móvil se apilan. -->
                    <div class="wiz-project">
                      <div class="wiz-field">
                        <label for="wz_desc" class="form-label">{labels.form.description}</label>
                        <textarea id="wz_desc" class="form-control" rows="6" bind:value={descripcion}></textarea>
                      </div>
                      <div class="wiz-field">
                        <span class="form-label">{fx.title}</span>
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                          class="dropzone"
                          class:is-over={dragOver}
                          on:dragover|preventDefault={() => (dragOver = true)}
                          on:dragleave={() => (dragOver = false)}
                          on:drop={onDrop}
                        >
                          <svg class="dz-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <p class="dz-text">
                            {fx.drop}<br />
                            <span class="dz-or">{fx.or}</span>
                            <button type="button" class="dz-browse" on:click={() => fileInputEl && fileInputEl.click()}>{fx.browse}</button>
                          </p>
                          <p class="dz-hint">{fx.hint}</p>
                          <!-- Sin name: la lista la gestiona el componente y se adjunta
                               al FormData en el envío (ver handleSubmit). -->
                          <input
                            bind:this={fileInputEl}
                            class="dz-input"
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.webp,.avif,.gif,.dwg,.dxf,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.ai,.psd,.svg,.txt"
                            on:change={(e) => addFiles(e.currentTarget.files)}
                          />
                        </div>
                        {#if archivos.length}
                          <ul class="dz-list">
                            {#each archivos as f, i (f.name + f.size)}
                              <li>
                                <span class="dz-name" title={f.name}>{f.name}</span>
                                <span class="dz-size">{humanSize(f.size)}</span>
                                <button type="button" class="dz-remove" title={fx.remove} aria-label="{fx.remove}: {f.name}" on:click={() => removeFile(i)}>×</button>
                              </li>
                            {/each}
                          </ul>
                        {/if}
                        {#if fileError}<p class="dz-error" role="status">{fileError}</p>{/if}
                      </div>
                    </div>

                  {:else}
                    <h4 class="wiz-head">{wz.ct}</h4>
                    <div class="wiz-field">
                      <label for="wz_nombre" class="form-label">{labels.form.name}</label>
                      <input id="wz_nombre" class="form-control" bind:value={nombre} autocomplete="name" />
                    </div>
                    <div class="wiz-field">
                      <label for="wz_email" class="form-label">{labels.form.email}</label>
                      <input id="wz_email" class="form-control" type="email" bind:value={email} autocomplete="email" />
                    </div>
                    <div class="privacy-container">
                      <div class="privacy-check">
                        <input id="wz_privacy" type="checkbox" bind:checked={privacy} />
                        <label for="wz_privacy">{labels.form.privacy}</label>
                      </div>
                    </div>
                  {/if}
                </div>
              {/key}

              <!-- Navegación -->
              <div class="wiz-nav">
                {#if step > 1}
                  <button type="button" class="wiz-back" on:click={goBack}>← {wz.back}</button>
                {:else}
                  <span></span>
                {/if}
                {#if step < TOTAL}
                  <button type="button" class="wiz-next" disabled={!stepValid} on:click={goNext}>{wz.next} →</button>
                {:else}
                  <button type="submit" class="wiz-next" disabled={!stepValid || sending}>{sending ? '…' : labels.form.send}</button>
                {/if}
              </div>
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-subtitle { margin-top: -34px; }

  /* Versión compacta (páginas de vídeo/proyecto): títulos en h4, sin ficha de persona. */
  .contact-us h4 { margin: 0 0 6px; font-size: 22px; line-height: 1.25; font-weight: 700; color: #fff; }
  .contact-light .contact-us h4 { color: #1a1e21; }
  .contact-compact .contact-subtitle { margin-top: 4px; margin-bottom: 24px; font-size: 18px; color: #b8860b; }

  .field-hidden { display: none !important; }
  .hp-field { position: absolute; left: -9999px; top: -9999px; height: 1px; width: 1px; overflow: hidden; }

  /* ─── Asistente ─────────────────────────────────────────────────────── */
  .wiz { position: relative; }

  .wiz-progress { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
  .wiz-bar { flex: 1; height: 6px; border-radius: 6px; background: rgba(255, 255, 255, 0.12); overflow: hidden; }
  .wiz-bar-fill { display: block; height: 100%; border-radius: 6px; background: linear-gradient(90deg, #ffc800, #ffdb57); box-shadow: 0 0 12px rgba(255, 200, 0, 0.5); transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1); }
  .wiz-count { font-family: Inconsolata, monospace; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: rgba(255, 255, 255, 0.55); white-space: nowrap; }

  .wiz-recap { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .wiz-chip { display: inline-flex; align-items: center; gap: 8px; padding: 5px 8px 5px 14px; border-radius: 30px; border: 1px solid rgba(255, 200, 0, 0.4); background: rgba(255, 200, 0, 0.08); color: #fff; font-size: 13px; font-family: Inconsolata, monospace; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; max-width: 100%; }
  .wiz-chip:hover { background: rgba(255, 200, 0, 0.16); border-color: #ffc800; }
  .wiz-chip-text { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .wiz-chip-edit { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 20px; background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.7); }

  .wiz-step { min-height: 232px; }
  .wiz-head { margin: 0 0 6px; font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 26px; line-height: 1.2; color: #fff; }
  .wiz-sub { margin: 0 0 22px; font-size: 15px; line-height: 1.5; color: rgba(255, 255, 255, 0.6); }
  .wiz-field { margin-bottom: 18px; display: flex; flex-direction: column; }

  .form-label { display: block; font-family: Inconsolata, monospace; font-size: 15px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); margin-bottom: 8px; transition: color 0.25s ease; }
  .wiz-field:focus-within .form-label { color: #ffc800; }

  .form-control { width: 100% !important; min-height: 54px; margin: 0 !important; padding: 14px 18px; color: #fff; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px; font-size: 16px; font-family: Inconsolata, monospace; transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease; }
  .form-control::placeholder { color: rgba(255, 255, 255, 0.3); }
  .form-control:focus { color: #fff; background: rgba(0, 0, 0, 0.25); border-color: #ffc800; box-shadow: 0 0 0 4px rgba(255, 200, 0, 0.15); outline: none; }
  textarea.form-control { min-height: 150px; resize: vertical; line-height: 1.5; }

  /* Paso 4: descripción a la izquierda, adjuntos a la derecha. Dos tercios para el
     texto y uno para los archivos: lo que se espera del cliente es sobre todo que
     cuente el proyecto; adjuntar es un extra. */
  .wiz-project {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.1rem;
    align-items: start;
  }
  @media (max-width: 720px) {
    .wiz-project { grid-template-columns: 1fr; }
  }
  /* La zona de soltar iguala la altura del textarea para que las dos columnas
     empiecen y acaben a la vez cuando aún no hay archivos en la lista. */
  .dropzone {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 150px;
    padding: 1rem;
    text-align: center;
    border: 2px dashed #c9c9c2;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.015);
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .dropzone.is-over {
    border-color: var(--gold, #ffc800);
    background: rgba(255, 200, 0, 0.1);
  }
  .dz-icon { color: #8a8f86; flex: none; }
  .dropzone.is-over .dz-icon { color: #b89400; }
  .dz-text { margin: 0; font-size: 0.92rem; line-height: 1.45; color: #2a2a2a; }
  .dz-or { color: #6c7169; }
  .dz-browse {
    padding: 0;
    font: inherit;
    color: #4169e1;
    font-weight: 700;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }
  .dz-hint { margin: 0; font-size: 0.78rem; color: #6c7169; line-height: 1.4; }
  /* El input real se oculta pero sigue siendo accesible por teclado desde el botón. */
  .dz-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .dz-list { margin: 0.6rem 0 0; padding: 0; list-style: none; }
  .dz-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  }
  .dz-name { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dz-size { flex: none; color: #6c7169; font-size: 0.78rem; }
  .dz-remove {
    flex: none;
    width: 22px;
    height: 22px;
    padding: 0;
    font-size: 1.1rem;
    line-height: 1;
    color: #6c7169;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .dz-remove:hover { color: #b3261e; background: rgba(179, 38, 30, 0.08); }
  .dz-error { margin: 0.5rem 0 0; font-size: 0.82rem; color: #b3261e; line-height: 1.4; }

  /* Autocompletado del campo FERIA: panel flotante de predicciones sobre la malla. */
  .wiz-field--ac { position: relative; }
  .ac-list {
    position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + 6px);
    margin: 0; padding: 5px; list-style: none;
    background: #fff; border: 1px solid #e2e2de; border-radius: 10px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
    max-height: 264px; overflow-y: auto;
  }
  .ac-list li { margin: 0; }
  .ac-item {
    display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
    width: 100%; text-align: left; cursor: pointer;
    background: none; border: none; border-radius: 7px;
    padding: 9px 11px; font-family: Inconsolata, monospace; font-size: 15px;
    color: royalblue; text-transform: uppercase;
  }
  .ac-item:hover, .ac-active { background: #f2f4f7; }
  .ac-name { font-weight: 400; }
  .ac-city { font-size: 0.82em; color: rgba(65, 105, 225, 0.65); white-space: nowrap; }

  /* Chips rápidos de metros */
  .chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .chip { padding: 8px 16px; border-radius: 30px; border: 1px solid rgba(255, 255, 255, 0.18); background: transparent; color: rgba(255, 255, 255, 0.75); font-family: Inconsolata, monospace; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.18s ease; }
  .chip:hover { border-color: #ffc800; color: #fff; }
  .chip-on { background: #ffc800; border-color: #ffc800; color: #111; }

  /* Tarjetas de rango de presupuesto */
  .band-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .band-card { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 18px; text-align: left; border-radius: 14px; border: 1.5px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.04); color: #fff; cursor: pointer; transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease; }
  .band-card:hover { transform: translateY(-3px); border-color: rgba(255, 200, 0, 0.6); background: rgba(255, 200, 0, 0.06); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18); }
  .band-card.selected { border-color: #ffc800; background: rgba(255, 200, 0, 0.12); box-shadow: 0 0 0 3px rgba(255, 200, 0, 0.18); }
  .band-scale { display: flex; gap: 5px; }
  .band-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); transition: background 0.2s ease; }
  .band-dot.on { background: #ffc800; }
  .band-name { font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 17px; line-height: 1.15; }
  .band-range { font-family: Inconsolata, monospace; font-size: 15px; font-weight: 700; color: #ffc800; letter-spacing: 0.02em; }
  .band-check { position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; border-radius: 50%; background: #ffc800; color: #111; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(0.5); transition: opacity 0.18s ease, transform 0.18s ease; }
  .band-card.selected .band-check { opacity: 1; transform: scale(1); }

  .band-unsure { width: 100%; margin-top: 12px; padding: 12px 16px; border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.25); background: transparent; color: rgba(255, 255, 255, 0.7); font-family: Inconsolata, monospace; font-size: 14px; cursor: pointer; transition: all 0.18s ease; }
  .band-unsure:hover { border-color: #ffc800; color: #fff; }
  .band-unsure.selected { border-style: solid; border-color: #ffc800; background: rgba(255, 200, 0, 0.12); color: #fff; }

  /* ─── Paso 2: ferias del mismo sector (sinergia) ─── */
  /* Evita que el carrusel nowrap ensanche su columna de grid (min-width:auto blowout). */
  .contact-block { min-width: 0; }
  .wiz, .wiz-step { min-width: 0; }
  /* Carrusel horizontal: el cliente recorre todas las plazas disponibles deslizando. */
  /* Dos filas (dos alturas) con flujo por columnas: reduce a la mitad el largo del scroll. */
  .syn-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(2, auto); grid-auto-columns: 210px; gap: 10px; overflow-x: auto; overflow-y: hidden; padding-bottom: 8px; scroll-snap-type: x proximity; -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
  .syn-grid::-webkit-scrollbar { height: 7px; }
  .syn-grid::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.22); border-radius: 4px; }
  .syn-card { flex: 0 0 auto; width: 210px; scroll-snap-align: start; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 13px 14px 13px 40px; text-align: left; border-radius: 12px; border: 1.5px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.04); color: #fff; cursor: pointer; transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease; }
  .syn-card:hover { transform: translateY(-2px); border-color: rgba(255, 200, 0, 0.6); background: rgba(255, 200, 0, 0.06); }
  .syn-card.selected { border-color: #ffc800; background: rgba(255, 200, 0, 0.12); }
  .syn-check { position: absolute; left: 13px; top: 50%; transform: translateY(-50%) scale(0.7); width: 19px; height: 19px; border-radius: 6px; border: 1.5px solid rgba(255, 255, 255, 0.3); color: #111; background: transparent; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; opacity: 0.35; transition: opacity 0.18s ease, transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease; }
  .syn-card.selected .syn-check { opacity: 1; transform: translateY(-50%) scale(1); background: #ffc800; border-color: #ffc800; }
  .syn-name { font-family: 'Roboto', sans-serif; font-size: 15px; line-height: 1.2; }
  /* Línea de ciudad con bandera redonda del país (solo ferias no españolas). */
  .syn-meta { display: flex; align-items: center; gap: 6px; }
  .syn-meta :global(.fair-flag) { width: 12px; height: 12px; }
  .syn-city { font-family: Inconsolata, monospace; font-size: 12px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.03em; }
  /* Escalera de descuentos: los tres tramos se muestran siempre en gris atenuado y
     cada dígito se ilumina (rojo) al alcanzar su número de ferias seleccionadas. */
  .syn-ladder { display: inline-flex; gap: 0.5em; align-items: baseline; white-space: nowrap; }
  .syn-pct { font-family: 'Roboto', sans-serif; font-weight: 900; color: rgba(255, 255, 255, 0.28); transition: color 0.2s ease; }
  .syn-pct.on { color: #e02424; }
  /* Tarjeta bloqueada al alcanzar el tope de selecciones. */
  .syn-card:disabled { opacity: 0.4; cursor: not-allowed; }
  .syn-card:disabled:hover { transform: none; border-color: rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.04); }
  .syn-none { font-size: 15px; line-height: 1.5; color: rgba(255, 255, 255, 0.6); }
  /* Variante clara (páginas de ciudad) */
  .contact-light .syn-card { background: #fff; border-color: rgba(0, 0, 0, 0.12); color: #1a1e21; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04); }
  .contact-light .syn-card:hover { border-color: rgba(255, 200, 0, 0.75); background: #fffdf5; }
  .contact-light .syn-card.selected { border-color: var(--gold); background: #fffae8; }
  .contact-light .syn-check { border-color: rgba(0, 0, 0, 0.25); }
  .contact-light .syn-city { color: rgba(0, 0, 0, 0.45); }
  .contact-light .syn-card:disabled:hover { border-color: rgba(0, 0, 0, 0.12); background: #fff; }
  .contact-light .syn-pct { color: rgba(0, 0, 0, 0.28); }
  .contact-light .syn-pct.on { color: #e02424; }
  .contact-light .syn-none { color: #666; }
  .contact-light .syn-grid::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.22); }

  /* Privacidad */
  .privacy-container { margin-top: 6px; }
  .privacy-check { display: flex; align-items: flex-start; gap: 10px; color: rgba(255, 255, 255, 0.85); font-size: 15px; line-height: 1.4; }
  .privacy-check input[type="checkbox"] { margin-top: 3px; accent-color: #ffc800; cursor: pointer; width: 16px; height: 16px; flex-shrink: 0; }
  .privacy-check label { cursor: pointer; user-select: none; }

  /* Navegación */
  .wiz-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 26px; }
  .wiz-back { background: none; border: none; color: rgba(255, 255, 255, 0.6); font-family: Inconsolata, monospace; font-size: 15px; font-weight: 600; cursor: pointer; padding: 8px 4px; transition: color 0.2s ease; }
  .wiz-back:hover { color: #fff; }
  .wiz-next { min-width: 150px; min-height: 48px; padding: 10px 30px; color: #111; background: #ffc800; border: 1px solid #ffc800; border-radius: 30px; font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 16px; letter-spacing: 0.04em; cursor: pointer; box-shadow: 0 4px 14px rgba(255, 200, 0, 0.28); transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease; }
  .wiz-next:hover:not(:disabled) { background: #ffd633; transform: translateY(-2px); box-shadow: 0 7px 20px rgba(255, 200, 0, 0.4); }
  .wiz-next:active:not(:disabled) { transform: translateY(0); }
  .wiz-next:disabled { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.35); cursor: not-allowed; box-shadow: none; }

  /* Éxito */
  .wiz-success { text-align: center; padding: 40px 20px; }
  .wiz-success-badge { width: 68px; height: 68px; margin: 0 auto 20px; border-radius: 50%; background: #2ebc5c; color: #fff; font-size: 34px; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(46, 188, 92, 0.4); }
  .wiz-success-msg { font-size: 1.15rem; font-weight: 600; line-height: 1.5; color: #fff; margin: 0; }

  .form-error { background-color: #e74c3c; color: #fff; padding: 16px 20px; border-radius: 8px; margin-top: 20px; font-size: 1.05rem; font-weight: 600; text-align: center; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); border: 2px solid #c0392b; }
  .form-error .form-note { margin: 0; line-height: 1.5; color: #fff !important; }

  .lista_direccion { padding-left: 0 !important; margin-left: 0 !important; }
  .whatsapp-li { list-style: none !important; margin-top: 12px !important; }
  .contact-whatsapp { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; background: #25d366; color: #fff !important; border-radius: 30px; font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 14px; letter-spacing: 0.03em; text-decoration: none !important; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; }
  .contact-whatsapp:hover, .contact-whatsapp:focus { background: #1ebe57; color: #fff !important; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45); }
  .contact-whatsapp svg { fill: currentColor; flex-shrink: 0; width: 18px; height: 18px; }

  @media (max-width: 560px) {
    .band-grid { grid-template-columns: 1fr; }
    .wiz-head { font-size: 22px; }
  }

  /* ============================================================
     Variante clara (páginas de ciudad)
     ============================================================ */
  .contact-light { background: #f7f6f1; color: #333; }
  .contact-light .contact-us h3 { color: #1a1e21; }
  .contact-person { display: flex; align-items: center; gap: 14px; margin: 0 0 24px; }
  .contact-person-photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; object-position: center top; border: 2px solid rgba(0, 0, 0, 0.08); flex-shrink: 0; }
  .contact-person figcaption { display: flex; flex-direction: column; line-height: 1.3; }
  .contact-person-name { font-family: 'Roboto', sans-serif; font-weight: 400; font-size: 15px; color: #1a1e21; }
  .contact-person-role { font-size: 13px; color: #666; }
  .contact-light .contact-us p, .contact-light .contact-us li { color: #333; }
  .contact-light .lista_direccion { border-top-color: rgba(0, 0, 0, 0.15); }

  .contact-light .wiz-head { color: #1a1e21; }
  .contact-light .wiz-sub { color: #666; }
  .contact-light .wiz-bar { background: rgba(0, 0, 0, 0.08); }
  .contact-light .wiz-count { color: #999; }
  .contact-light .form-label { color: #555; }
  .contact-light .wiz-field:focus-within .form-label { color: #b8860b; }
  .contact-light .form-control { color: #1a1e21; background: #fff; border: 1px solid rgba(0, 0, 0, 0.15); }
  .contact-light .form-control::placeholder { color: rgba(0, 0, 0, 0.35); }
  .contact-light .form-control:focus { color: #1a1e21; background: #fff; border-color: var(--gold); box-shadow: 0 0 0 4px rgba(255, 200, 0, 0.15); }

  .contact-light .wiz-chip { color: #1a1e21; background: rgba(255, 200, 0, 0.12); border-color: rgba(0, 0, 0, 0.12); }
  .contact-light .wiz-chip:hover { background: rgba(255, 200, 0, 0.22); border-color: var(--gold); }
  .contact-light .wiz-chip-edit { background: rgba(0, 0, 0, 0.06); color: #777; }

  .contact-light .chip { border-color: rgba(0, 0, 0, 0.18); color: #555; }
  .contact-light .chip:hover { border-color: var(--gold); color: #1a1e21; }
  .contact-light .chip-on { background: #ffc800; border-color: #ffc800; color: #111; }

  .contact-light .band-card { background: #fff; border-color: rgba(0, 0, 0, 0.12); color: #1a1e21; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04); }
  .contact-light .band-card:hover { border-color: rgba(255, 200, 0, 0.75); background: #fffdf5; box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08); }
  .contact-light .band-card.selected { border-color: var(--gold); background: #fffae8; }
  .contact-light .band-dot { background: rgba(0, 0, 0, 0.12); }
  .contact-light .band-dot.on { background: #ffc800; }
  .contact-light .band-range { color: #b8860b; }
  .contact-light .band-unsure { border-color: rgba(0, 0, 0, 0.2); color: #666; }
  .contact-light .band-unsure:hover { border-color: var(--gold); color: #1a1e21; }
  .contact-light .band-unsure.selected { border-color: var(--gold); background: #fffae8; color: #1a1e21; }

  .contact-light .privacy-check { color: #555; }
  .contact-light .wiz-back { color: #888; }
  .contact-light .wiz-back:hover { color: #1a1e21; }
  .contact-light .wiz-success-msg { color: #1a1e21; }

  .contact-light .contact-whatsapp { background: #fff; color: #1a1e21 !important; border: 1px solid rgba(0, 0, 0, 0.15); box-shadow: none; }
  .contact-light .contact-whatsapp:hover, .contact-light .contact-whatsapp:focus { background: rgba(255, 200, 0, 0.1); border-color: var(--gold); color: #1a1e21 !important; box-shadow: none; transform: translateY(-2px); }
</style>
