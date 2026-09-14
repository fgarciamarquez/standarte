// Retroadapta las noticias antiguas (generador v1) a las exigencias de enlaces del
// generador v2 (13/09/2026): cada artículo debe llevar un bloque final de conversión
// con la ficha de la feria (y su formulario), la página de la ciudad, la de constructor
// y ferias relacionadas. Además normaliza los enlaces absolutos a standarte.es (→ relativos)
// e infiere la feria del artículo a partir del título/cuerpo (campo fairSlug).
// Idempotente: los artículos ya tratados llevan `linksRetrofit` y se saltan.
// Uso: node scripts/retrofit_news_links.mjs [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DRY = process.argv.includes('--dry-run');
const TODAY = new Date().toISOString().slice(0, 10);
const newsPath = path.join(ROOT, 'src', 'lib', 'newsData.json');
const { fairsData } = await import(pathToFileURL(path.join(ROOT, 'src/lib/fairsData.js')).href);
const { fairDates } = await import(pathToFileURL(path.join(ROOT, 'src/lib/fairDates.js')).href);

// Rutas por idioma, leídas del propio siteData.js (que importa $lib y no se puede importar aquí).
const siteSrc = fs.readFileSync(path.join(ROOT, 'src/lib/siteData.js'), 'utf8');
const routesBody = /export const routes = \{([\s\S]*?)\n\};/.exec(siteSrc)[1];
const ROUTES = {};
const langKeys = [...routesBody.matchAll(/\n  ([a-z]{2}): \{/g)].map((m) => m[1]);
langKeys.forEach((l, i) => {
  const a = routesBody.indexOf(`\n  ${l}: {`); const b = i + 1 < langKeys.length ? routesBody.indexOf(`\n  ${langKeys[i + 1]}: {`) : routesBody.length;
  ROUTES[l] = Object.fromEntries([...routesBody.slice(a, b).matchAll(/\n    ([a-z_]+): '([^']*)'/g)].map((m) => [m[1], m[2]]));
});
const prefix = (lang) => (lang === 'es' ? '' : `/${lang}`);
const routeUrl = (lang, key) => (ROUTES[lang] && ROUTES[lang][key]) ? `${prefix(lang)}/${ROUTES[lang][key]}` : null;
const fairUrl = (slug, lang) => `${prefix(lang)}/${lang === 'ja' ? '展示会情報' : 'ferias'}/${slug}`;
const CITY_KEY = { Madrid: 'madrid', Lisboa: 'lisboa', Bilbao: 'bilbao', 'Málaga': 'malaga', Malaga: 'malaga', Barcelona: 'barcelona', Badajoz: 'badajoz', Oporto: 'oporto', Sevilla: 'sevilla' };
const VENUE = { Madrid: 'IFEMA', Lisboa: 'FIL', Bilbao: 'BEC', 'Málaga': 'FYCMA', Barcelona: 'Fira Barcelona', Badajoz: 'IFEBA', Oporto: 'Exponor', Sevilla: 'FIBES' };
const CITY_NAME = {
  es: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Málaga', lisboa: 'Lisboa', badajoz: 'Badajoz', oporto: 'Oporto', sevilla: 'Sevilla' },
  en: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbon', badajoz: 'Badajoz', oporto: 'Porto', sevilla: 'Seville' },
  de: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lissabon', badajoz: 'Badajoz', oporto: 'Porto', sevilla: 'Sevilla' },
  pt: { madrid: 'Madrid', barcelona: 'Barcelona', bilbao: 'Bilbau', malaga: 'Málaga', lisboa: 'Lisboa', badajoz: 'Badajoz', oporto: 'Porto', sevilla: 'Sevilha' },
  zh: { madrid: '马德里', barcelona: '巴塞罗那', bilbao: '毕尔巴鄂', malaga: '马拉加', lisboa: '里斯本', badajoz: '巴达霍斯', oporto: '波尔图', sevilla: '塞维利亚' },
  hi: { madrid: 'मैड्रिड', barcelona: 'बार्सिलोना', bilbao: 'बिलबाओ', malaga: 'मलागा', lisboa: 'लिस्बन', badajoz: 'बदाखोस', oporto: 'पोर्टो', sevilla: 'सेविले' },
  fr: { madrid: 'Madrid', barcelona: 'Barcelone', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbonne', badajoz: 'Badajoz', oporto: 'Porto', sevilla: 'Séville' },
  it: { madrid: 'Madrid', barcelona: 'Barcellona', bilbao: 'Bilbao', malaga: 'Malaga', lisboa: 'Lisbona', badajoz: 'Badajoz', oporto: 'Porto', sevilla: 'Siviglia' },
  ko: { madrid: '마드리드', barcelona: '바르셀로나', bilbao: '빌바오', malaga: '말라가', lisboa: '리스본', badajoz: '바다호스', oporto: '포르투', sevilla: '세비야' }
};
const T = {
  es: { hFair: 'Tu stand en {fair}: presupuesto en 24 h', hCity: 'Tu stand en {city}: presupuesto en 24 h', p: 'Cuéntanos tus metros y tu objetivo y te enviamos una propuesta con prototipo 3D en 72 h y presupuesto cerrado en 24 h, con fabricación en taller propio y montaje llave en mano en {venue}. Lo que ves en el prototipo es lo que se construye.', btnFair: 'Pedir presupuesto para {fair}', btnCity: 'Pedir presupuesto en {city}', more: 'Más sobre la feria', city: 'Diseño y montaje de stands en {city}', builder: 'Constructor de stands en {city}', rel: 'Próximas ferias en {city}', dates: 'Próxima edición' },
  en: { hFair: 'Your stand at {fair}: a quote in 24h', hCity: 'Your stand in {city}: a quote in 24h', p: 'Tell us your square metres and your goal and we send you a proposal with a 3D prototype in 72h and a closed quote in 24h, manufactured in our own workshop and installed turnkey at {venue}. What you see in the prototype is what gets built.', btnFair: 'Request a quote for {fair}', btnCity: 'Request a quote in {city}', more: 'More about the show', city: 'Stand design and assembly in {city}', builder: 'Stand builder in {city}', rel: 'Upcoming shows in {city}', dates: 'Next edition' },
  pt: { hFair: 'O seu stand na {fair}: orçamento em 24 h', hCity: 'O seu stand em {city}: orçamento em 24 h', p: 'Diga-nos os seus metros e o seu objetivo e enviamos-lhe uma proposta com protótipo 3D em 72 h e orçamento fechado em 24 h, com fabrico em oficina própria e montagem chave na mão na {venue}. O que vê no protótipo é o que se constrói.', btnFair: 'Pedir orçamento para a {fair}', btnCity: 'Pedir orçamento em {city}', more: 'Mais sobre a feira', city: 'Design e montagem de stands em {city}', builder: 'Construtor de stands em {city}', rel: 'Próximas feiras em {city}', dates: 'Próxima edição' },
  de: { hFair: 'Ihr Stand auf der {fair}: Angebot in 24 h', hCity: 'Ihr Stand in {city}: Angebot in 24 h', p: 'Nennen Sie uns Ihre Quadratmeter und Ihr Ziel, und Sie erhalten einen Vorschlag mit 3D-Prototyp in 72 h und Festpreisangebot in 24 h – gefertigt in eigener Werkstatt und schlüsselfertig auf der {venue} montiert. Was Sie im Prototyp sehen, wird gebaut.', btnFair: 'Angebot für {fair} anfordern', btnCity: 'Angebot in {city} anfordern', more: 'Mehr zur Messe', city: 'Messestand-Design und -Montage in {city}', builder: 'Messebauer in {city}', rel: 'Nächste Messen in {city}', dates: 'Nächste Ausgabe' },
  fr: { hFair: 'Votre stand à {fair} : devis en 24 h', hCity: 'Votre stand à {city} : devis en 24 h', p: 'Indiquez-nous vos mètres carrés et votre objectif : nous vous envoyons une proposition avec prototype 3D en 72 h et devis ferme en 24 h, fabriqué dans notre atelier et monté clé en main à {venue}. Ce que vous voyez sur le prototype est ce qui sera construit.', btnFair: 'Demander un devis pour {fair}', btnCity: 'Demander un devis à {city}', more: 'En savoir plus sur le salon', city: 'Conception et montage de stands à {city}', builder: 'Constructeur de stands à {city}', rel: 'Prochains salons à {city}', dates: 'Prochaine édition' },
  it: { hFair: 'Il tuo stand a {fair}: preventivo in 24 h', hCity: 'Il tuo stand a {city}: preventivo in 24 h', p: 'Dicci i tuoi metri quadri e il tuo obiettivo: ti inviamo una proposta con prototipo 3D in 72 h e preventivo chiuso in 24 h, realizzata nella nostra officina e montata chiavi in mano a {venue}. Quello che vedi nel prototipo è quello che si costruisce.', btnFair: 'Richiedi un preventivo per {fair}', btnCity: 'Richiedi un preventivo a {city}', more: 'Di più sulla fiera', city: 'Progettazione e montaggio di stand a {city}', builder: 'Costruttore di stand a {city}', rel: 'Prossime fiere a {city}', dates: 'Prossima edizione' },
  zh: { hFair: '您在 {fair} 的展台：24 小时内报价', hCity: '您在{city}的展台：24 小时内报价', p: '告诉我们您的面积和目标，我们将在 72 小时内提供 3D 原型、24 小时内提供固定报价，由自有工坊制作并在 {venue} 交钥匙搭建。原型所见即所建。', btnFair: '索取 {fair} 展台报价', btnCity: '索取{city}展台报价', more: '展会详情', city: '{city}展台设计与搭建', builder: '{city}展台搭建商', rel: '{city}即将举办的展会', dates: '下一届' },
  hi: { hFair: '{fair} में आपका स्टैंड: 24 घंटे में कोटेशन', hCity: '{city} में आपका स्टैंड: 24 घंटे में कोटेशन', p: 'हमें अपने वर्ग मीटर और लक्ष्य बताएं, और हम 72 घंटे में 3D प्रोटोटाइप और 24 घंटे में निश्चित कोटेशन भेजेंगे — अपनी कार्यशाला में निर्मित और {venue} में टर्नकी स्थापित। प्रोटोटाइप में जो दिखता है, वही बनता है।', btnFair: '{fair} के लिए कोटेशन मांगें', btnCity: '{city} में कोटेशन मांगें', more: 'मेले के बारे में और जानें', city: '{city} में स्टैंड डिज़ाइन और असेंबली', builder: '{city} में स्टैंड निर्माता', rel: '{city} में आगामी मेले', dates: 'अगला संस्करण' },
  ko: { hFair: '{fair} 부스: 24시간 내 견적', hCity: '{city} 부스: 24시간 내 견적', p: '면적과 목표를 알려주시면 72시간 내 3D 프로토타입과 24시간 내 확정 견적을 보내드립니다. 자체 공방에서 제작해 {venue}에 턴키로 설치합니다. 프로토타입에서 보신 그대로 시공됩니다.', btnFair: '{fair} 견적 요청', btnCity: '{city} 견적 요청', more: '전시회 자세히 보기', city: '{city} 부스 디자인·시공', builder: '{city} 부스 시공사', rel: '{city}의 다가오는 전시회', dates: '다음 회차' }
};
const FMT = { es: 'es-ES', en: 'en-GB', pt: 'pt-PT', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', zh: 'zh-CN', hi: 'hi-IN', ko: 'ko-KR' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{fair\}/g, v.fair || '').replace(/\{city\}/g, v.city || '').replace(/\{venue\}/g, v.venue || '');

function nextEdition(slug) {
  const d = fairDates[slug]; if (!d || !d.start) return null;
  const start = new Date(d.start + 'T12:00:00Z'); const end = new Date((d.end || d.start) + 'T12:00:00Z'); const now = new Date();
  const step = d.cadence === 'biennial' ? 2 : 1;
  while (end < now) { start.setUTCFullYear(start.getUTCFullYear() + step); end.setUTCFullYear(end.getUTCFullYear() + step); }
  return { start, end };
}
const norm = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const CITY_WORDS = /\s+(madrid|bilbao|lisboa|barcelona|malaga|badajoz|oporto|sevilla|lisbon|porto)$/;
function inferFair(article, esTitle, esContent) {
  const loc = article.location;
  // Nombres cortos (DES, BTL, HIP, MWC, SIL…) solo cuentan si aparecen tal cual, en mayúsculas,
  // en el texto original: en minúsculas coinciden con palabras corrientes.
  const cands = fairsData.map((f) => {
    const key = norm(f.name).replace(CITY_WORDS, '').trim();
    const short = key.length <= 5;
    const literal = f.name.replace(CITY_WORDS_RAW, '').trim();
    return { f, key, short, literal };
  }).filter((c) => c.key.length >= 3 && !GENERIC.has(c.key));
  const rx = (k, flags) => new RegExp('(^|[^\\p{L}\\p{N}])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\p{N}])', 'u' + flags);
  const hit = (txt, raw) => cands.filter((c) => c.short ? (rx(c.literal, '').test(raw) || rx(c.literal.toUpperCase(), '').test(raw)) : rx(c.key, '').test(txt))
    .sort((a, b) => ((b.f.city === loc) - (a.f.city === loc)) || (b.key.length - a.key.length));
  // 1) Título del propio artículo: feria de la misma ciudad, o de otra si el nombre es
  //    inequívoco (≥ 6 letras: «Agroexpo» en un artículo de Badajoz). 2) Cuerpo, misma ciudad.
  const own = hit(norm(article.title), article.title);
  const near = (c) => c.f.city === loc || (NEAR[loc] || []).includes(c.f.city);
  const t = own.find((c) => c.f.city === loc) || own.find(near);
  if (t) return t.f;
  // En el cuerpo solo cuenta una feria de la misma ciudad nombrada al menos dos veces:
  // una mención suelta (p. ej. una lista de ferias del recinto) no define el artículo.
  const twice = (c, txt, raw) => ((c.short ? raw : txt).match(rx(c.short ? c.literal : c.key, 'g')) || []).length >= 2 || (c.short && (raw.match(rx(c.literal.toUpperCase(), 'g')) || []).length >= 2);
  const b = hit(norm(article.content), article.content).filter((c) => c.f.city === loc && twice(c, norm(article.content), article.content));
  if (b.length) return b[0].f;
  // 3) Si el idioma no lo nombra, la versión española del mismo grupo.
  if (esTitle !== article.title) {
    const et = hit(norm(esTitle), esTitle); const et1 = et.find((c) => c.f.city === loc) || et.find(near);
    if (et1) return et1.f;
    const eb = hit(norm(esContent), esContent).filter((c) => c.f.city === loc && twice(c, norm(esContent), esContent)); if (eb.length) return eb[0].f;
  }
  return null;
}
const CITY_WORDS_RAW = /\s+(Madrid|Bilbao|Lisboa|Barcelona|Málaga|Malaga|Badajoz|Oporto|Sevilla|Lisbon|Porto)$/;
const NEAR = { Badajoz: ['Don Benito', 'Zafra', 'Almendralejo'], Lisboa: ['Cascais'], Oporto: ['Braga', 'Matosinhos'] };
const GENERIC = new Set(['subcontratacion', 'maintenance', 'motor', 'feria', 'salon', 'expo', 'forum', 'summit', 'congress', 'festival', 'week', 'show', 'fair', 'tech']);
function relatedFairs(loc, exclude, n = 2) {
  const now = Date.now();
  return fairsData.filter((f) => f.city === loc && f.slug !== exclude)
    .map((f) => { const e = nextEdition(f.slug); return { f, t: e ? Math.max(0, e.start - now) : 1e15 }; })
    .sort((a, b) => a.t - b.t).slice(0, n).map((x) => x.f);
}
function ctaHtml(article, fair) {
  const lang = article.lang; const t = T[lang]; if (!t) return null;
  const ck = CITY_KEY[article.location]; if (!ck) return null;
  const cityName = (CITY_NAME[lang] || CITY_NAME.es)[ck];
  const v = { fair: fair ? fair.name : '', city: cityName, venue: VENUE[article.location] || cityName };
  const cityPage = routeUrl(lang, ck); const builder = routeUrl(lang, `constructor_stand_${ck}`);
  const mainHref = fair ? `${fairUrl(fair.slug, lang)}#feria-presupuesto` : (cityPage ? `${cityPage}#contact` : routeUrl(lang, 'contact'));
  const ed = fair ? nextEdition(fair.slug) : null;
  const when = ed ? `${ed.start.toLocaleDateString(FMT[lang], { day: 'numeric', month: 'long', year: 'numeric' })} – ${ed.end.toLocaleDateString(FMT[lang], { day: 'numeric', month: 'long', year: 'numeric' })}` : null;
  const rel = relatedFairs(article.location, fair && fair.slug).map((r) => `<a href="${fairUrl(r.slug, lang)}">${esc(r.name)}</a>`).join(' · ');
  const links = [];
  if (fair) links.push(`<a href="${fairUrl(fair.slug, lang)}">${esc(t.more)}: ${esc(fair.name)}</a>`);
  if (cityPage) links.push(`<a href="${cityPage}">${esc(fill(t.city, v))}</a>`);
  if (builder) links.push(`<a href="${builder}">${esc(fill(t.builder, v))}</a>`);
  if (rel) links.push(`${esc(fill(t.rel, v))}: ${rel}`);
  return `<section class="news-cta" style="margin: 48px 0 8px; padding: 28px 28px 24px; background: #f5f4f0; border-radius: 10px;">
<h2 style="margin: 0 0 10px; font-size: 1.35em;">${esc(fill(fair ? t.hFair : t.hCity, v))}</h2>
<p style="margin: 0 0 16px;">${esc(fill(t.p, v))}</p>
${when ? `<p style="margin: 0 0 16px; font-size: 0.95em;"><strong>${esc(t.dates)}:</strong> ${when}</p>` : ''}
<p style="margin: 0 0 12px;"><a href="${mainHref}" style="display:inline-block; background:#1b1b1a; color:#fff; padding:12px 22px; border-radius:6px; text-decoration:none; font-weight:600;">${esc(fill(fair ? t.btnFair : t.btnCity, v))}</a></p>
<p style="margin: 0; font-size: 0.92em; color: #555;">${links.join(' · ')}</p>
</section>`;
}

const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
let done = 0, withFair = 0, skipped = 0; const noCta = [];
// Pasada 1: inferir la feria UNA vez por grupo (misma fecha y ciudad) a partir de la
// versión española ORIGINAL, antes de tocar ningún contenido: si se infiriera después de
// añadir el bloque de conversión, las «ferias relacionadas» del bloque contaminarían la
// inferencia de los demás idiomas del grupo.
const fairByGroup = new Map();
for (const a of news) {
  if (a.lang !== 'es' || a.intent || a.linksRetrofit) continue;
  const fair = inferFair(a, a.title, a.content);
  fairByGroup.set(`${a.date}|${a.location}`, fair);
  if (process.argv.includes('--list')) console.log(`${a.date} ${a.location.padEnd(9)} ${(fair ? fair.slug : '—').padEnd(44)} ← ${a.title.slice(0, 80)}`);
}
// Pasada 2: enlaces y bloque de conversión.
for (const a of news) {
  if (a.intent || a.linksRetrofit) { skipped++; continue; }
  const key = `${a.date}|${a.location}`;
  const fair = fairByGroup.has(key) ? fairByGroup.get(key) : inferFair(a, a.title, a.content);
  let html = a.content.replace(/href="https?:\/\/(?:www\.)?standarte\.es(\/[^"]*)?"/g, (m, p) => `href="${p || '/'}"`).replace(/<section class="news-cta"[\s\S]*?<\/section>\s*$/, '');
  // El formulario de la portada tiene id="contact"; el v1 enlazaba «#contacto» (id inexistente) y el prerender lo rechaza.
  html = html.replace(/href="((?:\/[a-z]{2})?\/)#contacto"/g, 'href="$1#contact"');
  const cta = ctaHtml(a, fair);
  if (!cta) { noCta.push(`${a.lang} ${a.slug}`); continue; }
  a.content = html.trim() + '\n' + cta;
  if (fair) { a.fairSlug = fair.slug; withFair++; }
  a.linksRetrofit = TODAY;
  done++;
}
console.log(`retrofit: ${done} artículos tratados (${withFair} con feria inferida), ${skipped} ya al día, ${noCta.length} sin bloque (${noCta.slice(0, 5).join(', ')})`);
if (!DRY) fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
