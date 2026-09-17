// STANDARTE — Generador autónomo de noticias (v2, septiembre 2026)
//
// Qué cambió respecto a la versión anterior y por qué:
//  - Antes el tema salía de un titular aleatorio de Google News sobre el recinto y el
//    artículo hablaba de «arquitectura efímera» en genérico, enlazando solo a /contacto.
//    No cubría intenciones de búsqueda ni llevaba tráfico a las fichas de feria, que son
//    las páginas con formulario (conversión).
//  - Ahora cada artículo nace de un PLAN EDITORIAL: una feria concreta de Madrid o Lisboa
//    (elegida por proximidad de su próxima edición, que es cuando el expositor contrata)
//    cruzada con una INTENCIÓN DE BÚSQUEDA (precio, plazos, diseño, modular o a medida,
//    primer expositor, sector, reutilización, montaje en el recinto, tendencias, elegir
//    constructor). La matriz feria × intención se va cubriendo poco a poco y queda
//    registrada en cada artículo (campos fairSlug e intent).
//  - Los enlaces internos son obligatorios y deterministas: ficha de la feria (con ancla al
//    formulario de presupuesto), página de la ciudad, página de constructor, ferias
//    relacionadas y proyecto de la galería. Los añade el script, no el modelo.
//  - La imagen se elige de la galería de proyectos 3D (projectData.js), priorizando
//    proyectos de la misma ciudad y sector y sin repetir las usadas recientemente.
//  - Se escribe en español e inglés por separado (y portugués si la feria es de Lisboa),
//    cada idioma con su propia llamada al modelo, para que suene nativo y no traducido.
//  - Si el modelo falla no se publica relleno: mejor un día sin noticia que un duplicado.
//
// Uso: node scripts/autonomous_generator.cjs [--dry-run] [--city=Madrid|Lisboa] [--fair=<slug>] [--intent=<key>]
//      GEMINI_API_KEY en el entorno. NEWS_DATA_PATH permite escribir en otro fichero (pruebas).
//      MOCK_GEMINI=1 usa una respuesta simulada (para probar la tubería sin API).

const fs = require('fs');
const path = require('path');
const https = require('https');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const newsDataPath = process.env.NEWS_DATA_PATH || path.join(ROOT, 'src', 'lib', 'newsData.json');
const geminiApiKey = process.env.GEMINI_API_KEY;
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const DRY = !!args['dry-run'];
const today = new Date().toISOString().slice(0, 10);

console.log('==========================================================');
console.log('     STANDARTE — Generador de noticias v2 (plan editorial)  ');
console.log('==========================================================\n');

// ---------------------------------------------------------------------------
// 1. Plazas objetivo y URLs internas (rutas reales del sitio, por idioma)
// ---------------------------------------------------------------------------
const CITIES = {
  Madrid: {
    venue: 'IFEMA Madrid', venueShort: 'IFEMA',
    name: { es: 'Madrid', en: 'Madrid', pt: 'Madrid' },
    cityPage: { es: '/diseno_montaje_stands_madrid', en: '/en/stand_design_assembly_madrid', pt: '/pt/design_montagem_stands_madrid' },
    builderPage: { es: '/constructor_stand_madrid', en: '/en/stand_builder_madrid', pt: null },
    rss: { q: 'IFEMA+ferias+madrid', hl: 'es', gl: 'ES', ceid: 'ES:es' },
    langs: ['es', 'en']
  },
  Lisboa: {
    venue: 'FIL — Feira Internacional de Lisboa', venueShort: 'FIL',
    name: { es: 'Lisboa', en: 'Lisbon', pt: 'Lisboa' },
    cityPage: { es: '/diseno-construccion-montaje-stands-lisboa', en: '/en/stand_design_assembly_lisbon', pt: '/pt/design_montagem_stands_lisboa' },
    builderPage: { es: '/constructor_stand_lisboa', en: '/en/stand_builder_lisbon', pt: '/pt/construtor_stands_lisboa' },
    rss: { q: 'FIL+feiras+lisboa', hl: 'pt-PT', gl: 'PT', ceid: 'PT:pt-150' },
    langs: ['es', 'en', 'pt']
  }
};
const PREFIX = { es: '', en: '/en', pt: '/pt' };
const fairUrl = (slug, lang) => `${PREFIX[lang]}/ferias/${slug}`;
const FORM_ANCHOR = '#feria-presupuesto';               // id del formulario en la ficha de feria (Feria.svelte)
const pricesPage = { es: '/precios', en: '/en/prices', pt: '/pt/precos' };
const contactPage = { es: '/contacto', en: '/en/contact', pt: '/pt/contacto' };
const projectUrl = (id, lang) => `/proyectos/${id}${lang === 'es' ? '' : `?lang=${lang}`}`;

// ---------------------------------------------------------------------------
// 2. Intenciones de búsqueda (la matriz feria × intención se cubre poco a poco)
// ---------------------------------------------------------------------------
// Cada intención: la consulta que el usuario teclea (query), el ángulo y el guion de
// secciones. El modelo escribe el título final; el guion evita que todos los artículos
// cuenten lo mismo.
const INTENTS = [
  { key: 'precio',
    query: { es: 'cuánto cuesta un stand en {fair}', en: 'how much does a stand at {fair} cost', pt: 'quanto custa um stand na {fair}' },
    angle: { es: 'El lector quiere una cifra orientativa y saber qué la mueve. Responde con rangos honestos por tamaño y tipo (modular, diseño libre en carpintería), explica qué incluye un llave en mano y qué cobra aparte el recinto, y cómo bajar el coste reutilizando elementos.',
             en: 'The reader wants a ballpark figure and what drives it. Answer with honest ranges by size and type (modular, custom joinery), explain what a turnkey package includes and what the venue charges separately, and how reuse lowers the cost.',
             pt: 'O leitor quer um valor orientativo e saber o que o faz variar. Responda com intervalos honestos por tamanho e tipo (modular, design livre em carpintaria), explique o que inclui um chave na mão e o que o recinto cobra à parte, e como a reutilização baixa o custo.' },
    outline: { es: ['Qué determina el precio de un stand en {fair}', 'Rangos orientativos por tamaño', 'Qué incluye un stand llave en mano', 'Cómo pagar menos sin perder presencia'],
               en: ['What sets the price of a stand at {fair}', 'Ballpark ranges by size', 'What a turnkey stand includes', 'How to pay less without losing presence'],
               pt: ['O que determina o preço de um stand na {fair}', 'Intervalos orientativos por tamanho', 'O que inclui um stand chave na mão', 'Como pagar menos sem perder presença'] },
    extraLinks: ['prices'] },
  { key: 'diseno',
    query: { es: 'cómo diseñar un stand para {fair}', en: 'how to design a stand for {fair}', pt: 'como desenhar um stand para a {fair}' },
    angle: { es: 'Guía práctica de diseño para ESTA feria: quién visita, cómo se mueve por el pabellón, qué zonas necesita el stand (exposición, demostración, reunión, almacén), materiales, luz y gráfica, y los errores que se repiten.',
             en: 'A practical design guide for THIS show: who visits, how they move through the hall, which zones the stand needs (display, demo, meeting, storage), materials, lighting and graphics, and the mistakes that keep happening.',
             pt: 'Guia prático de design para ESTA feira: quem visita, como circula pelo pavilhão, que zonas o stand precisa (exposição, demonstração, reunião, arrumação), materiais, luz e grafismo, e os erros que se repetem.' },
    outline: { es: ['A quién tienes delante en {fair}', 'Las zonas que no pueden faltar', 'Materiales, luz y gráfica que funcionan en {venue}', 'Errores que vemos cada edición'],
               en: ['Who you are facing at {fair}', 'The zones you cannot skip', 'Materials, lighting and graphics that work at {venue}', 'Mistakes we see every edition'],
               pt: ['Quem tem à frente na {fair}', 'As zonas que não podem faltar', 'Materiais, luz e grafismo que funcionam na {venue}', 'Erros que vemos em cada edição'] } },
  { key: 'plazos',
    query: { es: 'plazos para encargar un stand para {fair}', en: 'when to order a stand for {fair}', pt: 'prazos para encomendar um stand para a {fair}' },
    angle: { es: 'Calendario del expositor contado hacia atrás desde la apertura: brief, diseño y prototipo 3D, validación con el recinto, fabricación en taller, transporte, montaje y desmontaje. Qué se puede hacer si se va tarde. Sin inventar normas del recinto: remite al manual del expositor.',
             en: 'The exhibitor calendar counted back from opening day: brief, design and 3D prototype, venue approval, workshop manufacturing, transport, build-up and dismantling. What can still be done when you are late. Do not invent venue rules: refer to the exhibitor manual.',
             pt: 'Calendário do expositor contado de trás para a frente a partir da abertura: briefing, design e protótipo 3D, validação com o recinto, fabrico em oficina, transporte, montagem e desmontagem. O que ainda se pode fazer quando se vai tarde. Sem inventar normas do recinto: remeter para o manual do expositor.' },
    outline: { es: ['La cuenta atrás desde la apertura de {fair}', 'Hitos: brief, diseño, validación, fabricación', 'Montaje y desmontaje en {venue}', 'Si vas tarde, esto es lo que aún se puede hacer'],
               en: ['The countdown to {fair} opening day', 'Milestones: brief, design, approval, manufacturing', 'Build-up and dismantling at {venue}', 'Running late? What can still be done'],
               pt: ['A contagem decrescente até à abertura da {fair}', 'Marcos: briefing, design, validação, fabrico', 'Montagem e desmontagem na {venue}', 'Se vai tarde, isto é o que ainda se pode fazer'] } },
  { key: 'modular_o_medida',
    query: { es: 'stand modular o a medida para {fair}', en: 'modular or custom stand for {fair}', pt: 'stand modular ou à medida para a {fair}' },
    angle: { es: 'Comparativa honesta para esta feria: cuándo basta un modular y cuándo compensa el diseño libre en carpintería; coste, imagen, reutilización, plazos y lo que ve el visitante. Termina con una recomendación clara según tamaño y objetivo.',
             en: 'An honest comparison for this show: when a modular system is enough and when custom joinery pays off; cost, image, reuse, lead times and what the visitor actually sees. End with a clear recommendation by size and goal.',
             pt: 'Comparação honesta para esta feira: quando basta um modular e quando compensa o design livre em carpintaria; custo, imagem, reutilização, prazos e o que o visitante vê. Termine com uma recomendação clara por tamanho e objetivo.' },
    outline: { es: ['Qué ofrece cada opción en {fair}', 'Coste y plazos: la comparación real', 'Imagen y reutilización edición tras edición', 'Nuestra recomendación según tu espacio'],
               en: ['What each option offers at {fair}', 'Cost and lead time: the real comparison', 'Image and reuse edition after edition', 'Our recommendation by space size'],
               pt: ['O que oferece cada opção na {fair}', 'Custo e prazos: a comparação real', 'Imagem e reutilização edição após edição', 'A nossa recomendação segundo o seu espaço'] } },
  { key: 'primerizo',
    query: { es: 'exponer por primera vez en {fair}', en: 'exhibiting at {fair} for the first time', pt: 'expor pela primeira vez na {fair}' },
    angle: { es: 'Guía para la empresa que expone por primera vez: objetivos realistas, elección del espacio, qué pedir al constructor, presupuesto completo (no solo el stand), equipo en el stand y seguimiento de contactos. Tono cercano, sin condescendencia.',
             en: 'A guide for the company exhibiting for the first time: realistic goals, choosing the space, what to ask the builder, the full budget (not just the stand), staffing and lead follow-up. Warm tone, never condescending.',
             pt: 'Guia para a empresa que expõe pela primeira vez: objetivos realistas, escolha do espaço, o que pedir ao construtor, orçamento completo (não só o stand), equipa no stand e seguimento dos contactos. Tom próximo, sem condescendência.' },
    outline: { es: ['Antes de reservar espacio en {fair}', 'El presupuesto completo, no solo el stand', 'Qué pedir a tu constructor de stands', 'Durante y después de la feria'],
               en: ['Before booking space at {fair}', 'The full budget, not just the stand', 'What to ask your stand builder', 'During and after the show'],
               pt: ['Antes de reservar espaço na {fair}', 'O orçamento completo, não só o stand', 'O que pedir ao seu construtor de stands', 'Durante e depois da feira'] } },
  { key: 'sector',
    query: { es: 'stands para el sector {sector} en {fair}', en: 'stands for the {sector} sector at {fair}', pt: 'stands para o setor {sector} na {fair}' },
    angle: { es: 'Qué stand funciona para los expositores de ESTE sector en esta feria: cómo se enseña su producto (a la altura de la mano, en demostración, en pantalla, con muestras), qué instalaciones pide, qué mobiliario y qué gráfica. Ejemplos concretos, nada genérico.',
             en: 'Which stand works for exhibitors of THIS sector at this show: how their product is shown (at hand height, in live demo, on screen, with samples), which services it needs, which furniture and graphics. Concrete examples, nothing generic.',
             pt: 'Que stand funciona para os expositores DESTE setor nesta feira: como se mostra o produto (à altura da mão, em demonstração, em ecrã, com amostras), que instalações pede, que mobiliário e que grafismo. Exemplos concretos, nada genérico.' },
    outline: { es: ['Cómo se vende el producto de {sector} en {fair}', 'Instalaciones y superficies que pide', 'Mobiliario, gráfica y luz', 'Un ejemplo de distribución que funciona'],
               en: ['How {sector} products sell at {fair}', 'Services and surfaces it needs', 'Furniture, graphics and lighting', 'A layout example that works'],
               pt: ['Como se vende o produto de {sector} na {fair}', 'Instalações e superfícies que pede', 'Mobiliário, grafismo e luz', 'Um exemplo de distribuição que funciona'] } },
  { key: 'reutilizar',
    query: { es: 'reutilizar el stand de {fair} en otras ferias', en: 'reusing your {fair} stand at other shows', pt: 'reutilizar o stand da {fair} noutras feiras' },
    angle: { es: 'Cómo diseñar el stand de esta feria para que sirva en las otras citas del calendario de {city}: módulos, gráfica intercambiable, almacenaje entre ferias, qué se amortiza y qué no. Enlaza las ferias relacionadas que se indican.',
             en: 'How to design the stand for this show so it serves the other dates on the {city} calendar: modules, interchangeable graphics, storage between shows, what pays back and what does not. Link the related fairs provided.',
             pt: 'Como desenhar o stand desta feira para que sirva nas outras datas do calendário de {city}: módulos, grafismo intercambiável, armazenamento entre feiras, o que se amortiza e o que não. Ligue as feiras relacionadas indicadas.' },
    outline: { es: ['Diseñar para más de una feria desde el primer día', 'Qué se reutiliza y qué se renueva', 'Almacenaje y logística entre {fair} y la siguiente cita', 'Cuánto se ahorra de verdad'],
               en: ['Design for more than one show from day one', 'What gets reused and what gets refreshed', 'Storage and logistics between {fair} and the next date', 'How much you really save'],
               pt: ['Desenhar para mais do que uma feira desde o primeiro dia', 'O que se reutiliza e o que se renova', 'Armazenamento e logística entre a {fair} e a data seguinte', 'Quanto se poupa de verdade'] } },
  { key: 'montaje_recinto',
    query: { es: 'montaje de stands en {venue} para {fair}', en: 'stand build-up at {venue} for {fair}', pt: 'montagem de stands na {venue} para a {fair}' },
    angle: { es: 'Cómo es montar en este recinto para esta feria desde el punto de vista del constructor: acreditaciones, descarga, suelo y alturas, servicios del recinto, coordinación con el organizador, desmontaje. Explica el proceso general y remite al manual del expositor para cifras y horarios; no inventes datos.',
             en: 'What building at this venue for this show is like from the builder side: accreditation, unloading, floor and height limits, venue services, coordination with the organiser, dismantling. Explain the general process and refer to the exhibitor manual for figures and hours; never invent data.',
             pt: 'Como é montar neste recinto para esta feira do ponto de vista do construtor: acreditações, descarga, piso e alturas, serviços do recinto, coordenação com o organizador, desmontagem. Explique o processo geral e remeta para o manual do expositor quanto a números e horários; não invente dados.' },
    outline: { es: ['Cómo se monta en {venue}', 'Acreditaciones, descarga y servicios del recinto', 'Lo que aprueba el organizador antes de entrar', 'Desmontaje y salida sin sobresaltos'],
               en: ['How build-up works at {venue}', 'Accreditation, unloading and venue services', 'What the organiser approves before you get in', 'Dismantling and leaving without surprises'],
               pt: ['Como se monta na {venue}', 'Acreditações, descarga e serviços do recinto', 'O que o organizador aprova antes de entrar', 'Desmontagem e saída sem sobressaltos'] } },
  { key: 'tendencias',
    query: { es: 'tendencias de stands en {fair} {year}', en: '{fair} {year} stand trends', pt: 'tendências de stands na {fair} {year}' },
    angle: { es: 'Tendencias observadas en el pabellón, no de catálogo: qué están pidiendo los expositores de esta feria (materiales, luz, espacios de reunión, demostración en vivo, sostenibilidad real por reutilización) y cómo aplicarlas con presupuesto contenido.',
             en: 'Trends seen on the hall floor, not in catalogues: what exhibitors at this show are asking for (materials, lighting, meeting space, live demos, real sustainability through reuse) and how to apply them on a contained budget.',
             pt: 'Tendências observadas no pavilhão, não de catálogo: o que os expositores desta feira estão a pedir (materiais, luz, espaços de reunião, demonstração ao vivo, sustentabilidade real por reutilização) e como aplicá-las com orçamento contido.' },
    outline: { es: ['Lo que se ve en los pasillos de {fair}', 'Materiales y luz: lo que sube y lo que baja', 'Espacios de reunión y demostración', 'Aplicarlo con presupuesto contenido'],
               en: ['What you see in the aisles at {fair}', 'Materials and lighting: what is rising and what is fading', 'Meeting and demo spaces', 'Applying it on a contained budget'],
               pt: ['O que se vê nos corredores da {fair}', 'Materiais e luz: o que sobe e o que desce', 'Espaços de reunião e demonstração', 'Aplicá-lo com orçamento contido'] } },
  { key: 'constructor',
    query: { es: 'empresa de stands en {city} para {fair}', en: 'stand builder in {city} for {fair}', pt: 'empresa de stands em {city} para a {fair}' },
    angle: { es: 'Cómo elegir constructor de stands para esta feria: taller propio o subcontrata, prototipo 3D antes de fabricar, presupuesto cerrado, un solo interlocutor, quién está en el montaje, garantías. Da criterios que sirvan aunque no nos elijan a nosotros.',
             en: 'How to choose a stand builder for this show: own workshop or subcontracting, 3D prototype before manufacturing, closed quote, single point of contact, who is on site at build-up, guarantees. Give criteria that help even if they do not choose us.',
             pt: 'Como escolher construtor de stands para esta feira: oficina própria ou subcontratação, protótipo 3D antes de fabricar, orçamento fechado, um único interlocutor, quem está na montagem, garantias. Dê critérios úteis mesmo que não nos escolham.' },
    outline: { es: ['Qué preguntar antes de contratar para {fair}', 'Taller propio, prototipo 3D y presupuesto cerrado', 'Quién estará en el pabellón el día del montaje', 'Señales de alarma en un presupuesto'],
               en: ['What to ask before hiring for {fair}', 'Own workshop, 3D prototype and closed quote', 'Who will be in the hall on build-up day', 'Warning signs in a quote'],
               pt: ['O que perguntar antes de contratar para a {fair}', 'Oficina própria, protótipo 3D e orçamento fechado', 'Quem estará no pavilhão no dia da montagem', 'Sinais de alarme num orçamento'] } }
];

// ---------------------------------------------------------------------------
// 3. Utilidades
// ---------------------------------------------------------------------------
function fetchUrl(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36' } }, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) { resolve(fetchUrl(res.headers.location, timeoutMs)); return; }
      let data = ''; res.on('data', (c) => data += c); res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => { req.destroy(new Error('timeout')); });
  });
}
function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, (res) => {
      let data = ''; res.on('data', (c) => data += c); res.on('end', () => resolve(data));
    });
    req.on('error', reject); req.setTimeout(120000, () => req.destroy(new Error('timeout'))); req.write(body); req.end();
  });
}
const stripHtml = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 110);
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
const fmt = { es: (d) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }), en: (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), pt: (d) => d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }) };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function loadSiteData() {
  const imp = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href);
  const [fairs, dates, seo, projects] = await Promise.all([
    imp('src/lib/fairsData.js'), imp('src/lib/fairDates.js'), imp('src/lib/server/fairSeoData.js'), imp('src/lib/projectData.js')
  ]);
  return { fairsData: fairs.fairsData, fairDates: dates.fairDates, fairSeoData: seo.fairSeoData, fairFaqExtra: seo.fairFaqExtra || {}, projects: projects.projects };
}

// Próxima edición de una feria a partir de fairDates (si la fecha ya pasó, se proyecta
// según la cadencia). Devuelve null si no hay fecha.
function nextEdition(slug, fairDates) {
  const d = fairDates[slug]; if (!d || !d.start) return null;
  let start = new Date(d.start + 'T12:00:00Z'); let end = new Date((d.end || d.start) + 'T12:00:00Z');
  const now = new Date();
  const step = d.cadence === 'biennial' ? 2 : 1;
  let projected = false;
  while (end < now) { start.setUTCFullYear(start.getUTCFullYear() + step); end.setUTCFullYear(end.getUTCFullYear() + step); projected = true; }
  return { start, end, projected, cadence: d.cadence || 'annual', source: d.source };
}

// ---------------------------------------------------------------------------
// 4. Plan editorial: qué feria y qué intención hoy
// ---------------------------------------------------------------------------
function chooseCity(newsData) {
  if (args.city && CITIES[args.city]) return args.city;
  // Alternancia estricta Madrid/Lisboa a partir de la última noticia publicada.
  const last = (newsData.find((n) => n.lang === 'es') || {}).location;
  return last === 'Madrid' ? 'Lisboa' : 'Madrid';
}

function chooseFair(city, site, newsData) {
  const fairs = site.fairsData.filter((f) => f.city === city);
  if (args.fair) { const f = fairs.find((x) => x.slug === args.fair); if (!f) throw new Error('feria no encontrada en ' + city + ': ' + args.fair); return f; }
  const now = Date.now();
  const scored = fairs.map((f) => {
    const ed = nextEdition(f.slug, site.fairDates);
    let score = 0.4;                                    // sin fecha: baja prioridad, no cero
    if (ed) {
      const weeks = (ed.start - now) / (7 * 86400000);
      // Ventana de contratación: entre 6 y 26 semanas antes de la apertura el expositor
      // está decidiendo su stand. Es cuando un artículo puede convertir.
      if (weeks >= 6 && weeks <= 26) score = 3; else if (weeks > 26 && weeks <= 52) score = 2; else if (weeks > 2 && weeks < 6) score = 1.5; else score = 0.7;
      if (ed.projected) score *= 0.8;                   // fecha proyectada, no confirmada
    }
    const covered = newsData.filter((n) => n.lang === 'es' && n.fairSlug === f.slug);
    const recent = covered.some((n) => (now - new Date(n.date)) < 45 * 86400000);
    if (recent) score = 0;
    score = score / (1 + covered.length);               // cuantas más veces cubierta, menos prioridad
    // Mención por nombre en noticias antiguas (sin fairSlug): también cuenta, un poco.
    const named = newsData.filter((n) => n.lang === 'es' && !n.fairSlug && (n.title || '').toLowerCase().includes(f.name.toLowerCase())).length;
    score = score / (1 + 0.3 * named);
    return { f, score, tie: hash(today + f.slug) };
  }).sort((a, b) => b.score - a.score || a.tie - b.tie);
  return scored[0].f;
}

function chooseIntent(fair, newsData) {
  if (args.intent) { const i = INTENTS.find((x) => x.key === args.intent); if (!i) throw new Error('intención desconocida: ' + args.intent); return i; }
  const usedForFair = new Set(newsData.filter((n) => n.fairSlug === fair.slug).map((n) => n.intent));
  const globalUse = {}; for (const n of newsData) { if (n.lang === 'es' && n.intent) globalUse[n.intent] = (globalUse[n.intent] || 0) + 1; }
  const candidates = INTENTS.filter((i) => !usedForFair.has(i.key));
  const pool = candidates.length ? candidates : INTENTS;
  return pool.slice().sort((a, b) => (globalUse[a.key] || 0) - (globalUse[b.key] || 0) || hash(today + a.key) - hash(today + b.key))[0];
}

// Ferias relacionadas: misma ciudad, distintas, con edición más cercana en el tiempo.
function relatedFairs(fair, city, site, n = 2) {
  const now = Date.now();
  return site.fairsData.filter((f) => f.city === city && f.slug !== fair.slug)
    .map((f) => { const ed = nextEdition(f.slug, site.fairDates); return { f, t: ed ? Math.abs(ed.start - now) : 1e15, same: f.sector === fair.sector ? 0 : 1 }; })
    .sort((a, b) => a.same - b.same || a.t - b.t).slice(0, n).map((x) => x.f);
}

// ---------------------------------------------------------------------------
// 5. Imagen: galería de proyectos 3D, misma ciudad y sector si es posible, sin repetir
// ---------------------------------------------------------------------------
const SECTOR_HINTS = {
  'Agroalimentario y Naturaleza': ['alimento', 'aliment', 'uvas', 'vino', 'bodega', 'pesca', 'fruta', 'golosinas', 'gourmet', 'congelados'],
  'Alimentación y Bebidas': ['alimento', 'aliment', 'congelados', 'golosinas', 'vino', 'bodega'],
  'Enología y Vinos': ['vino', 'bodega', 'vitivinicola', 'somontano'],
  'Industria y Logística': ['industrial', 'maquina', 'equipos', 'almacenaje', 'logistica', 'embalaje', 'conduccion', 'refrigeracion', 'drenaje', 'pavimentos', 'materiales'],
  'Construcción e Infraestructuras': ['herrajes', 'puertas', 'ventanas', 'pavimentos', 'drenaje', 'cesped', 'materiales', 'construccion', 'inmobiliar'],
  'Tecnología e Innovación': ['software', 'tecnolog', 'telecomunicaciones', 'trafico', 'movilidad', 'inteligente', 'apuestas', 'digital'],
  'Salud y Medicina': ['sanitario', 'farmaceutica', 'cro', 'dental', 'implantes', 'salud', 'medic'],
  'Belleza y Estética': ['cosmetica', 'fragancias', 'unas', 'belleza'],
  'Comercio y Packaging': ['embalaje', 'etiquetado', 'carton', 'golosinas', 'juguetes', 'regalo'],
  'Turismo y Hostelería': ['turismo', 'hotel', 'viajes', 'buceo'],
  'Gastronomía y Hostelería': ['alimento', 'gourmet', 'hostel'],
  'Aeronáutica y Transporte': ['aviacion', 'aereo', 'trafico', 'movilidad', 'logistica', 'transporte', 'aerolinea'],
  'Arte y Ocio': ['juguetes', 'ocio', 'buceo'],
  'Multisectorial y Profesional': [],
  'Náutica y Yates': ['buceo', 'nautic'],
  'Prevención de Riesgos Laborales': ['seguridad', 'emergencias'],
  'Energías Renovables': ['energ', 'solar', 'electric']
};
function chooseImage(fair, city, site, newsData, lang) {
  const recent = new Set(newsData.slice(0, 120).map((n) => n.image));
  const hints = SECTOR_HINTS[fair.sector] || [];
  const cityKey = city.toLowerCase();
  const cands = [];
  for (const p of site.projects) {
    const imgs = (p.images && p.images.length ? p.images : [p.image]).filter(Boolean);
    if (!imgs.length) continue;
    const idtxt = (p.id + ' ' + ((p.title && p.title.es) || '')).toLowerCase();
    let score = 1;
    if ((p.location || '').toLowerCase() === cityKey) score += 3;
    if (hints.some((h) => idtxt.includes(h))) score += 2;
    imgs.forEach((img, i) => {
      if (!fs.existsSync(path.join(ROOT, 'static', img))) return;   // solo imágenes que existen en /static
      const used = recent.has(img) ? -10 : 0;
      cands.push({ p, img, i, score: score + used + (i === 0 ? 0.3 : 0), tie: hash(today + img) });
    });
  }
  cands.sort((a, b) => b.score - a.score || a.tie - b.tie);
  const top = cands.slice(0, 6);
  const pick = top[hash(today + fair.slug) % top.length] || cands[0];
  return pick;
}

function figureHtml(pick, lang, city) {
  const title = (pick.p.title && (pick.p.title[lang] || pick.p.title.es)) || pick.p.name;
  const cityName = CITIES[city].name[lang];
  const capTail = { es: `prototipo 3D de Standarte para ${esc(pick.p.name)}. Ver la ficha del proyecto.`, en: `Standarte 3D prototype for ${esc(pick.p.name)}. See the project.`, pt: `protótipo 3D da Standarte para ${esc(pick.p.name)}. Ver a ficha do projeto.` }[lang];
  return `<figure class="news-figure" style="margin: 40px 0; text-align: center;"><a href="${projectUrl(pick.p.id, lang)}"><img src="${pick.img}" alt="${esc(title)}" loading="lazy" decoding="async" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"></a><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;"><a href="${projectUrl(pick.p.id, lang)}" style="color:#777;">${esc(title)}</a> — ${capTail}</figcaption></figure>`;
}

// ---------------------------------------------------------------------------
// 6. Bloque final de conversión (determinista): ficha de la feria + formulario
// ---------------------------------------------------------------------------
function ctaHtml(fair, city, related, lang, edition) {
  const c = CITIES[city]; const cityName = c.name[lang];
  const fairHref = fairUrl(fair.slug, lang);
  const when = edition ? `${fmt[lang](edition.start)} – ${fmt[lang](edition.end)}` : null;
  const t = {
    es: { h: `Tu stand en ${fair.name}: presupuesto en 24 h`, p: `Cuéntanos tus metros y tu objetivo y te enviamos una propuesta con prototipo 3D en 72 h y presupuesto cerrado en 24 h, con fabricación en taller propio y montaje llave en mano en ${c.venueShort}. Lo que ves en el prototipo es lo que se construye.`, btn: `Pedir presupuesto para ${fair.name}`, more: `Más sobre la feria`, city: `Diseño y montaje de stands en ${cityName}`, builder: `Constructor de stands en ${cityName}`, rel: `Otras ferias en ${cityName}`, dates: 'Próxima edición' },
    en: { h: `Your stand at ${fair.name}: a quote in 24h`, p: `Tell us your square metres and your goal and we send you a proposal with a 3D prototype in 72h and a closed quote in 24h, manufactured in our own workshop and installed turnkey at ${c.venueShort}. What you see in the prototype is what gets built.`, btn: `Request a quote for ${fair.name}`, more: `More about the show`, city: `Stand design and assembly in ${cityName}`, builder: `Stand builder in ${cityName}`, rel: `Other shows in ${cityName}`, dates: 'Next edition' },
    pt: { h: `O seu stand na ${fair.name}: orçamento em 24 h`, p: `Diga-nos os seus metros e o seu objetivo e enviamos-lhe uma proposta com protótipo 3D em 72 h e orçamento fechado em 24 h, com fabrico em oficina própria e montagem chave na mão na ${c.venueShort}. O que vê no protótipo é o que se constrói.`, btn: `Pedir orçamento para a ${fair.name}`, more: `Mais sobre a feira`, city: `Design e montagem de stands em ${cityName}`, builder: `Construtor de stands em ${cityName}`, rel: `Outras feiras em ${cityName}`, dates: 'Próxima edição' }
  }[lang];
  const relLinks = related.map((r) => `<a href="${fairUrl(r.slug, lang)}">${esc(r.name)}</a>`).join(' · ');
  const builder = c.builderPage[lang] ? ` · <a href="${c.builderPage[lang]}">${t.builder}</a>` : '';
  return `<section class="news-cta" style="margin: 48px 0 8px; padding: 28px 28px 24px; background: #f5f4f0; border-radius: 10px;">
<h2 style="margin: 0 0 10px; font-size: 1.35em;">${esc(t.h)}</h2>
<p style="margin: 0 0 16px;">${esc(t.p)}</p>
${when ? `<p style="margin: 0 0 16px; font-size: 0.95em;"><strong>${t.dates}:</strong> ${when} · ${esc(c.venue)}</p>` : ''}
<p style="margin: 0 0 12px;"><a href="${fairHref}${FORM_ANCHOR}" style="display:inline-block; background:#1b1b1a; color:#fff; padding:12px 22px; border-radius:6px; text-decoration:none; font-weight:600;">${esc(t.btn)}</a></p>
<p style="margin: 0; font-size: 0.92em; color: #555;"><a href="${fairHref}">${t.more}: ${esc(fair.name)}</a> · <a href="${c.cityPage[lang]}">${t.city}</a>${builder}${relLinks ? ` · ${t.rel}: ${relLinks}` : ''}</p>
</section>`;
}

// ---------------------------------------------------------------------------
// 7. Brief + prompt por idioma
// ---------------------------------------------------------------------------
function buildBrief(fair, city, intent, site, related, edition, headlines) {
  const c = CITIES[city];
  const seo = site.fairSeoData[fair.slug] || {};
  const faq = site.fairFaqExtra[fair.slug] || {};
  return { fair, city, c, intent, related, edition, headlines, seo, faq };
}

function promptFor(b, lang) {
  const L = { es: 'español de España', en: 'British English', pt: 'português de Portugal' }[lang];
  const cityName = b.c.name[lang];
  const year = (b.edition ? b.edition.start : new Date()).getUTCFullYear();
  const fill = (s) => s.replace(/\{fair\}/g, b.fair.name).replace(/\{city\}/g, cityName).replace(/\{venue\}/g, b.c.venueShort).replace(/\{sector\}/g, sectorLabel(b.fair.sector, lang)).replace(/\{year\}/g, String(year));
  const facts = stripHtml((b.seo[lang] || b.seo.es || '')).replace(/¿Cuándo es tu próxima edición.*$/, '').replace(/When is your next.*$/, '').replace(/Quando é a sua próxima.*$/, '');
  const faqTxt = (b.faq[lang] || b.faq.es || []).map(([q, a]) => `- ${q} → ${a}`).join('\n');
  const dates = b.edition ? `${fmt[lang](b.edition.start)} – ${fmt[lang](b.edition.end)}${b.edition.projected ? ' (' + { es: 'fecha estimada según la cadencia; la organización aún no ha publicado la próxima', en: 'estimated from the usual cadence; the organiser has not published the next date yet', pt: 'data estimada pela cadência; a organização ainda não publicou a próxima' }[lang] + ')' : ''}` : { es: 'sin fecha publicada', en: 'no date published', pt: 'sem data publicada' }[lang];
  const links = [
    `${fairUrl(b.fair.slug, lang)} → ${b.fair.name} (${{ es: 'ficha de la feria, con formulario de presupuesto', en: 'the show page, with the quote form', pt: 'ficha da feira, com formulário de orçamento' }[lang]})`,
    `${b.c.cityPage[lang]} → ${{ es: 'diseño y montaje de stands en', en: 'stand design and assembly in', pt: 'design e montagem de stands em' }[lang]} ${cityName}`,
    ...b.related.map((r) => `${fairUrl(r.slug, lang)} → ${r.name}`),
    ...((b.intent.extraLinks || []).includes('prices') ? [`${pricesPage[lang]} → ${{ es: 'página de precios orientativos', en: 'indicative prices page', pt: 'página de preços orientativos' }[lang]}`] : [])
  ].join('\n');
  const outline = b.intent.outline[lang].map((h, i) => `${i + 1}. ${fill(h)}`).join('\n');
  const news = (b.headlines || []).length ? b.headlines.map((h) => `- ${h}`).join('\n') : '(ninguno)';

  const rules = {
    es: `Escribe en ${L}, como lo haría un jefe de producción de una empresa de stands con veinte años de ferias: concreto, con oficio, sin adjetivos huecos («único», «inigualable», «excepcional», «vanguardia», «premium», «sinergia») y sin fórmulas de blog («en el competitivo mundo de», «en la era de», «sin duda»). Nada de «arquitectura efímera», «arquitectura de atención» ni jerga inventada. Frases de longitud variada, alguna corta. Una idea por frase. Tutea al lector (es una empresa que va a exponer).`,
    en: `Write in ${L}, the way a production manager of a stand-building company with twenty years of trade shows would: concrete, hands-on, no hollow adjectives ("unique", "unparalleled", "exceptional", "cutting-edge", "premium", "synergy") and no blog formulas ("in today's competitive world", "in the era of", "undoubtedly"). No "ephemeral architecture", no "attention architecture", no invented jargon. Vary sentence length, keep some short. One idea per sentence. Address the reader directly (a company about to exhibit).`,
    pt: `Escreva em ${L}, como o faria um chefe de produção de uma empresa de stands com vinte anos de feiras: concreto, com ofício, sem adjetivos ocos («único», «inigualável», «excecional», «vanguarda», «premium», «sinergia») e sem fórmulas de blog («no competitivo mundo de», «na era de», «sem dúvida»). Nada de «arquitetura efémera», «arquitetura de atenção» nem jargão inventado. Frases de comprimento variado, algumas curtas. Uma ideia por frase. Trate o leitor por «você» (é uma empresa que vai expor).`
  }[lang];

  return `${rules}

${{ es: 'TAREA', en: 'TASK', pt: 'TAREFA' }[lang]}: ${{ es: 'redacta un artículo para el blog de Standarte (standarte.es, diseño, fabricación en taller propio y montaje de stands) que responda a esta búsqueda', en: 'write an article for the Standarte blog (standarte.es: design, in-house manufacturing and installation of exhibition stands) that answers this search', pt: 'redija um artigo para o blog da Standarte (standarte.es: design, fabrico em oficina própria e montagem de stands) que responda a esta pesquisa' }[lang]}: «${fill(b.intent.query[lang])}».
${{ es: 'Ángulo', en: 'Angle', pt: 'Ângulo' }[lang]}: ${fill(b.intent.angle[lang])}

${{ es: 'DATOS VERIFICADOS DE LA FERIA (úsalos; no inventes otros)', en: 'VERIFIED SHOW FACTS (use them; invent nothing else)', pt: 'DADOS VERIFICADOS DA FEIRA (use-os; não invente outros)' }[lang]}:
- ${{ es: 'Feria', en: 'Show', pt: 'Feira' }[lang]}: ${b.fair.name} · ${{ es: 'ciudad', en: 'city', pt: 'cidade' }[lang]}: ${cityName} · ${{ es: 'recinto', en: 'venue', pt: 'recinto' }[lang]}: ${b.c.venue} · ${{ es: 'sector', en: 'sector', pt: 'setor' }[lang]}: ${sectorLabel(b.fair.sector, lang)}
- ${{ es: 'Próxima edición', en: 'Next edition', pt: 'Próxima edição' }[lang]}: ${dates}
- ${{ es: 'Sobre la feria', en: 'About the show', pt: 'Sobre a feira' }[lang]}: ${facts || '(sin ficha)'}
${faqTxt ? `- ${{ es: 'Preguntas que YA respondemos en la ficha de la feria. Puedes usar la información, pero tu sección de preguntas frecuentes debe hacer TRES PREGUNTAS DISTINTAS a estas, propias de la intención del artículo', en: 'Questions we ALREADY answer on the show page. You may use the information, but your FAQ section must ask THREE DIFFERENT questions, specific to the intent of this article', pt: 'Perguntas que JÁ respondemos na ficha da feira. Pode usar a informação, mas a sua secção de perguntas frequentes deve fazer TRÊS PERGUNTAS DIFERENTES destas, próprias da intenção do artigo' }[lang]}:\n${faqTxt}` : ''}
- ${{ es: 'Titulares recientes de prensa sobre el recinto (úsalos solo si encajan de verdad; si no, ignóralos)', en: 'Recent press headlines about the venue (use only if they genuinely fit; otherwise ignore)', pt: 'Títulos recentes de imprensa sobre o recinto (use só se encaixarem mesmo; senão ignore)' }[lang]}:\n${news}
- ${{ es: 'Sobre Standarte (verdad, no exageres)', en: 'About Standarte (true, do not oversell)', pt: 'Sobre a Standarte (verdade, sem exagerar)' }[lang]}: ${{ es: 'taller propio; prototipo 3D en 72 h antes de fabricar; presupuesto cerrado en 24 h; un único interlocutor para diseño, producción y montaje; garantía «Proyecto Auditado» (lo que ves en el prototipo es lo que se construye); más de 20 años montando en ferias de España y Portugal.', en: 'own workshop; 3D prototype in 72h before manufacturing; closed quote in 24h; a single point of contact for design, production and installation; the "Audited Project" guarantee (what you see in the prototype is what gets built); more than 20 years building at shows in Spain and Portugal.', pt: 'oficina própria; protótipo 3D em 72 h antes de fabricar; orçamento fechado em 24 h; um único interlocutor para design, produção e montagem; garantia «Projeto Auditado» (o que vê no protótipo é o que se constrói); mais de 20 anos a montar em feiras de Espanha e Portugal.' }[lang]}

${{ es: 'ESTRUCTURA (HTML limpio: solo <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>; sin <h1>, sin estilos, sin imágenes; el título va aparte)', en: 'STRUCTURE (clean HTML: only <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>; no <h1>, no styles, no images; the title goes separately)', pt: 'ESTRUTURA (HTML limpo: só <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>; sem <h1>, sem estilos, sem imagens; o título vai à parte)' }[lang]}:
- ${{ es: 'Primer párrafo: responde a la búsqueda de forma directa en 2-4 frases (lo que Google muestra como fragmento). Sin preámbulos.', en: 'First paragraph: answer the search directly in 2-4 sentences (what Google shows as a snippet). No preamble.', pt: 'Primeiro parágrafo: responda à pesquisa de forma direta em 2-4 frases (o que o Google mostra como fragmento). Sem preâmbulos.' }[lang]}
- ${{ es: 'Después, estas secciones con <h2> (puedes afinar el título de cada una, no el orden)', en: 'Then these <h2> sections (you may refine each heading, not the order)', pt: 'Depois, estas secções com <h2> (pode afinar o título de cada uma, não a ordem)' }[lang]}:
${outline}
- <h2>${{ es: 'Preguntas frecuentes', en: 'Frequently asked questions', pt: 'Perguntas frequentes' }[lang]}</h2>: ${{ es: 'tres preguntas concretas sobre esta feria y esta intención, cada una como <h3> y su respuesta en un <p> breve.', en: 'three concrete questions about this show and this intent, each as an <h3> with a short <p> answer.', pt: 'três perguntas concretas sobre esta feira e esta intenção, cada uma como <h3> com a resposta num <p> breve.' }[lang]}
- ${{ es: 'Longitud total', en: 'Total length', pt: 'Comprimento total' }[lang]}: 900-1200 ${{ es: 'palabras', en: 'words', pt: 'palavras' }[lang]}.
- ${{ es: 'NO añadas ningún bloque de llamada a la acción ni despedida: lo añade el sistema después.', en: 'Do NOT add any call-to-action block or sign-off: the system adds it afterwards.', pt: 'NÃO acrescente nenhum bloco de chamada à ação nem despedida: o sistema acrescenta-o depois.' }[lang]}

${{ es: 'ENLACES INTERNOS (obligatorios, con estas URL exactas y solo estas; texto del enlace natural, integrado en la frase; cada uno como máximo dos veces)', en: 'INTERNAL LINKS (mandatory, with these exact URLs and only these; natural anchor text woven into the sentence; each at most twice)', pt: 'LIGAÇÕES INTERNAS (obrigatórias, com estas URL exatas e só estas; texto da ligação natural, integrado na frase; cada uma no máximo duas vezes)' }[lang]}:
${links}
${{ es: 'La ficha de la feria debe enlazarse en el primer o segundo párrafo con el nombre de la feria como texto del enlace. El texto de cada enlace tiene que leerse como parte natural de la frase (por ejemplo, «nuestro equipo de <a>diseño y montaje de stands en Madrid</a> lleva…»), nunca pegado como una etiqueta.', en: 'The show page must be linked in the first or second paragraph, with the show name as anchor text. Every anchor text must read as a natural part of the sentence (for example, "our <a>stand design and assembly team in Madrid</a> has…"), never bolted on like a label.', pt: 'A ficha da feira deve ser ligada no primeiro ou segundo parágrafo, com o nome da feira como texto da ligação. O texto de cada ligação tem de se ler como parte natural da frase (por exemplo, «a nossa equipa de <a>design e montagem de stands em Lisboa</a> leva…»), nunca colado como uma etiqueta.' }[lang]}

${{ es: 'Devuelve JSON con: title (máx. 70 caracteres, incluye el nombre de la feria y la ciudad, sin dos puntos decorativos ni mayúsculas en cada palabra), excerpt (2 frases, máx. 160 caracteres), seoKeywords (5), content (el HTML).', en: 'Return JSON with: title (max 70 characters, includes the show name and the city, no decorative colons and no Title Case), excerpt (2 sentences, max 160 characters), seoKeywords (5), content (the HTML).', pt: 'Devolva JSON com: title (máx. 70 caracteres, inclui o nome da feira e a cidade, sem dois pontos decorativos nem maiúsculas em cada palavra), excerpt (2 frases, máx. 160 caracteres), seoKeywords (5), content (o HTML).' }[lang]}`;
}

const SECTOR_LABELS = {
  en: { 'Agroalimentario y Naturaleza': 'agri-food', 'Alimentación y Bebidas': 'food and beverage', 'Enología y Vinos': 'wine', 'Industria y Logística': 'industry and logistics', 'Construcción e Infraestructuras': 'construction', 'Tecnología e Innovación': 'technology', 'Salud y Medicina': 'health and medical', 'Belleza y Estética': 'beauty', 'Comercio y Packaging': 'retail and packaging', 'Turismo y Hostelería': 'tourism and hospitality', 'Gastronomía y Hostelería': 'gastronomy and hospitality', 'Aeronáutica y Transporte': 'aviation and transport', 'Arte y Ocio': 'arts and leisure', 'Multisectorial y Profesional': 'multi-sector', 'Náutica y Yates': 'boating', 'Prevención de Riesgos Laborales': 'safety', 'Energías Renovables': 'renewable energy' },
  pt: { 'Agroalimentario y Naturaleza': 'agroalimentar', 'Alimentación y Bebidas': 'alimentação e bebidas', 'Enología y Vinos': 'vinhos', 'Industria y Logística': 'indústria e logística', 'Construcción e Infraestructuras': 'construção', 'Tecnología e Innovación': 'tecnologia', 'Salud y Medicina': 'saúde', 'Belleza y Estética': 'beleza', 'Comercio y Packaging': 'comércio e packaging', 'Turismo y Hostelería': 'turismo e hotelaria', 'Gastronomía y Hostelería': 'gastronomia e hotelaria', 'Aeronáutica y Transporte': 'aeronáutica e transportes', 'Arte y Ocio': 'arte e lazer', 'Multisectorial y Profesional': 'multissetorial', 'Náutica y Yates': 'náutica', 'Prevención de Riesgos Laborales': 'segurança', 'Energías Renovables': 'energias renováveis' }
};
function sectorLabel(sector, lang) { if (lang === 'es') return sector.toLowerCase(); return (SECTOR_LABELS[lang] || {})[sector] || sector.toLowerCase(); }

// ---------------------------------------------------------------------------
// 8. Llamada al modelo (una por idioma) y validación de la salida
// ---------------------------------------------------------------------------
async function generate(prompt, lang) {
  if (process.env.MOCK_GEMINI) {
    return { title: { es: 'Artículo de prueba MOCK', en: 'MOCK test article', pt: 'Artigo de teste MOCK' }[lang] + ' ' + Date.now(), excerpt: 'Resumen de prueba. Dos frases.', seoKeywords: ['a', 'b', 'c', 'd', 'e'],
      content: `<p>${{ es: 'Respuesta directa de prueba con enlace a la <a href="__FAIR__">FERIA</a>.', en: 'Direct test answer linking the <a href="__FAIR__">SHOW</a>.', pt: 'Resposta direta de teste com ligação à <a href="__FAIR__">FEIRA</a>.' }[lang]}</p><h2>Sección 1</h2><p>Párrafo uno.</p><p>Párrafo dos con <a href="__CITY__">ciudad</a>.</p><h2>Preguntas frecuentes</h2><h3>¿Pregunta?</h3><p>Respuesta.</p>` };
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      thinkingConfig: { thinkingBudget: 0 },
      maxOutputTokens: 8192,
      temperature: 0.8,
      responseSchema: { type: 'OBJECT', properties: { title: { type: 'STRING' }, excerpt: { type: 'STRING' }, seoKeywords: { type: 'ARRAY', items: { type: 'STRING' } }, content: { type: 'STRING' } }, required: ['title', 'excerpt', 'seoKeywords', 'content'] }
    }
  });
  const raw = await postJson(url, body);
  let json; try { json = JSON.parse(raw); } catch (e) { throw new Error('respuesta no JSON de Gemini: ' + raw.slice(0, 300)); }
  const cand = json.candidates && json.candidates[0];
  const parts = (cand && cand.content && Array.isArray(cand.content.parts)) ? cand.content.parts : [];
  let txt = parts.map((p) => (p && typeof p.text === 'string') ? p.text : '').join('').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  if (!txt) throw new Error('Gemini sin texto: ' + raw.slice(0, 400));
  return JSON.parse(txt);
}

function sanitize(html) {
  // Solo etiquetas permitidas; fuera estilos, scripts e imágenes que pudiera colar el modelo.
  let h = String(html || '');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<img[^>]*>/gi, '').replace(/<figure[\s\S]*?<\/figure>/gi, '');
  h = h.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '<h2>$1</h2>');
  h = h.replace(/<(p|h2|h3|ul|li|strong|em|a)\s+(?![^>]*href)[^>]*>/gi, '<$1>');   // quita atributos salvo href
  h = h.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi, '<a href="$1">');
  h = h.replace(/<(?!\/?(p|h2|h3|ul|li|strong|em|a|br)\b)[^>]+>/gi, '');            // cualquier otra etiqueta, fuera
  return h.trim();
}

function validate(art, b, lang) {
  const fairHref = fairUrl(b.fair.slug, lang);
  const problems = [];
  const words = stripHtml(art.content).split(/\s+/).length;
  if (words < 550) problems.push(`demasiado corto (${words} palabras)`);
  if (!art.content.includes(`href="${fairHref}"`)) problems.push('falta el enlace a la ficha de la feria');
  if (!/<h2>/.test(art.content)) problems.push('sin secciones <h2>');
  // Enlaces a URL no permitidas: se quitan (se deja el texto), no se aborta.
  const allowed = new Set([fairHref, b.c.cityPage[lang], b.c.builderPage[lang], pricesPage[lang], contactPage[lang], ...b.related.map((r) => fairUrl(r.slug, lang))].filter(Boolean));
  art.content = art.content.replace(/<a href="([^"]+)">([\s\S]*?)<\/a>/g, (m, href, txt) => allowed.has(href) ? m : txt);
  const banned = { es: [/arquitectura ef[ií]mera/i, /arquitectura de atenci[oó]n/i, /microarquitectura/i], en: [/ephemeral architecture/i, /attention architecture/i, /microarchitecture/i], pt: [/arquitetura ef[eé]mera/i, /arquitetura de aten[cç][aã]o/i, /microarquitetura/i] }[lang];
  if (banned.some((r) => r.test(art.content) || r.test(art.title))) problems.push('usa jerga prohibida');
  // Las preguntas frecuentes del artículo no pueden ser las mismas que ya lleva la ficha de la feria.
  const norm = (t) => stripHtml(t).toLowerCase().replace(/[¿?¡!.,;:]/g, '').replace(/\s+/g, ' ').trim();
  const fairQs = new Set(((b.faq[lang] || b.faq.es || [])).map(([q]) => norm(q)));
  const artQs = [...art.content.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map((m) => norm(m[1]));
  if (artQs.some((q) => fairQs.has(q))) problems.push('repite preguntas de la ficha de la feria');
  return { ok: problems.length === 0 || (problems.length === 1 && problems[0] === 'falta el enlace a la ficha de la feria'), problems, words };
}

// Inserta la figura tras el segundo párrafo (o tras el primero si no hay más) y, si
// faltaba el enlace a la feria en el cuerpo, lo mete en la primera frase que la nombre.
function assemble(art, b, lang, pick, edition) {
  let html = art.content;
  const fairHref = fairUrl(b.fair.slug, lang);
  if (!html.includes(`href="${fairHref}"`)) {
    const name = b.fair.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let done = false;
    html = html.replace(new RegExp(`(<p>(?:(?!</p>).)*?)(${name})`, 's'), (m, pre, n) => { done = true; return `${pre}<a href="${fairHref}">${n}</a>`; });
    if (!done) html = html.replace('</p>', ` <a href="${fairHref}">${esc(b.fair.name)}</a>.</p>`);
  }
  const paras = [...html.matchAll(/<\/p>/g)];
  const at = paras.length >= 2 ? paras[1].index + 4 : (paras.length ? paras[0].index + 4 : 0);
  html = html.slice(0, at) + '\n' + figureHtml(pick, lang, b.city) + '\n' + html.slice(at);
  html += '\n' + ctaHtml(b.fair, b.city, b.related, lang, edition);
  return html;
}

// ---------------------------------------------------------------------------
// 9. Ejecución
// ---------------------------------------------------------------------------
async function run() {
  let newsData = [];
  if (fs.existsSync(newsDataPath)) newsData = JSON.parse(fs.readFileSync(newsDataPath, 'utf8'));
  console.log(`-> ${newsData.length} artículos existentes.`);
  if (!DRY && newsData.some((a) => a.date === today)) { console.log(`-> Ya hay noticia del ${today}. Nada que hacer.`); return; }
  if (!geminiApiKey && !process.env.MOCK_GEMINI && !DRY) { console.log('-> Sin GEMINI_API_KEY: no se publica nada hoy (no se genera relleno).'); return; }

  const site = await loadSiteData();
  const city = chooseCity(newsData);
  const fair = chooseFair(city, site, newsData);
  const intent = chooseIntent(fair, newsData);
  const edition = nextEdition(fair.slug, site.fairDates);
  const related = relatedFairs(fair, city, site, 2);
  console.log(`-> Plan de hoy: ${city} · ${fair.name} [${fair.slug}] · intención «${intent.key}» · próxima edición: ${edition ? edition.start.toISOString().slice(0, 10) + (edition.projected ? ' (proyectada)' : '') : 'sin fecha'}`);
  console.log(`   Relacionadas: ${related.map((r) => r.name).join(', ')}`);

  // Titulares de prensa del recinto: contexto opcional, nunca bloqueante.
  let headlines = [];
  try {
    const r = CITIES[city].rss;
    const xml = await fetchUrl(`https://news.google.com/rss/search?q=${r.q}&hl=${r.hl}&gl=${r.gl}&ceid=${r.ceid}`);
    headlines = [...xml.matchAll(/<item>[\s\S]*?<title>([\s\S]*?)<\/title>/g)].map((m) => m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim()).filter(Boolean).slice(0, 3);
  } catch (e) { console.log('   (sin titulares de prensa: ' + e.message + ')'); }

  const brief = buildBrief(fair, city, intent, site, related, edition, headlines);
  const langs = CITIES[city].langs;
  const pick = chooseImage(fair, city, site, newsData, 'es');
  console.log(`-> Imagen: ${pick.img} (proyecto ${pick.p.name}, ${pick.p.location})`);

  if (DRY) {
    console.log('\n================ PROMPT (es) ================\n' + promptFor(brief, 'es'));
    console.log('\n================ CTA (es) ================\n' + ctaHtml(fair, city, related, 'es', edition));
    console.log('\n================ FIGURA (es) ================\n' + figureHtml(pick, 'es', city));
    return;
  }

  const articles = [];
  let esSlug = null;
  for (const lang of langs) {
    let art = null, check = null;
    for (let attempt = 1; attempt <= 2 && !art; attempt++) {
      try {
        const out = await generate(promptFor(brief, lang), lang);
        out.content = sanitize(out.content).replace(/__FAIR__/g, fairUrl(fair.slug, lang)).replace(/__CITY__/g, CITIES[city].cityPage[lang]);
        check = validate(out, brief, lang);
        if (check.ok || (attempt === 2 && !check.problems.includes('usa jerga prohibida'))) art = out;
        else console.log(`   [${lang}] intento ${attempt} rechazado: ${check.problems.join('; ')}`);
      } catch (e) { console.log(`   [${lang}] intento ${attempt} falló: ${e.message}`); }
    }
    if (!art) { console.log(`-> [${lang}] sin artículo válido. Se aborta la publicación de hoy (no se publica a medias).`); return; }
    const content = assemble(art, brief, lang, pick, edition);
    let slug = slugify(art.title) || `${fair.slug}-${intent.key}-${lang}`;
    if (lang === 'es') esSlug = slug; else if (slug.replace(/-/g, '').length < 8) slug = `${esSlug}-${lang}`;
    if (newsData.some((n) => n.slug === slug) || articles.some((a) => a.slug === slug)) slug = `${slug}-${today}`;
    articles.push({
      slug, title: art.title.trim(), excerpt: art.excerpt.trim(), date: today, location: city, lang,
      sourceName: fair.name, sourceUrl: `https://standarte.es${fairUrl(fair.slug, lang)}`,
      seoKeywords: (art.seoKeywords || []).slice(0, 6), image: pick.img, content,
      fairSlug: fair.slug, intent: intent.key, projectId: pick.p.id
    });
    console.log(`   [${lang}] OK · ${check.words} palabras · «${art.title}»`);
  }

  newsData.unshift(...articles);
  fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf8');
  console.log(`\n-> Publicados ${articles.length} artículos (${langs.join(', ')}) sobre ${fair.name} · intención «${intent.key}».`);
  console.log(`   ES: /blog/${articles[0].slug}`);
}

run().catch((e) => { console.error('[ERROR] ' + (e && e.stack || e)); process.exitCode = 0; });
