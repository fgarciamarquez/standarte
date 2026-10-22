// Guardián del buscador de ferias: comprueba que las ferias se ENCUENTRAN de verdad.
//
// Antes este guardián solo vigilaba que no hubiera nombres ni slugs duplicados, y daba el
// visto bueno diciendo que las ferias «son localizables en el buscador». No lo eran. El
// 22/10/2026 un cliente buscó «OMD» y el buscador le respondió que su feria no estaba dada
// de alta; al medirlo resultó que NINGUNA de las 465 ferias con ciudad se encontraba
// escribiendo «nombre + ciudad», y que 24 de las 25 con un signo en el nombre (+ & . /) no
// aparecían si no se teclaba el signo. El guardián estaba en verde mientras el buscador
// echaba clientes, porque comprobaba la forma del catálogo y no su comportamiento.
//
// Ahora ejecuta el MISMO motor que usan el buscador de la portada y el campo «Feria» del
// formulario de presupuesto ($lib/fairMatch.js) contra lo que de verdad teclea la gente:
//
//   1. su propio nombre          -> debe salir PRIMERO
//   2. «nombre + ciudad»         -> debe salir entre los 5 primeros
//   3. el nombre sin los signos  -> debe salir entre los 5 primeros
//   4. cada alias declarado      -> debe salir entre los 10 primeros
//   5. nombres y slugs únicos    -> lo que ya vigilaba (un nombre repetido deja fuera
//                                   del índice a la segunda feria y nadie se enteraría)
//
// Un fallo aquí significa que alguien que busca su feria recibe «esa feria no consta en
// nuestra base de datos». Por eso rompe el build.
import { fairsData } from '../src/lib/fairsData.js';
import { tagOrder, labelForTag, fairsForActivity } from '../src/lib/fairTags.js';
import { normFair, tokensOf, fairSearchKeys, rankFair, fairAliases } from '../src/lib/fairMatch.js';

const NON_CITY = ['Itinerante', 'España', 'Europa', 'Portugal', 'Portugal Sur'];

/* ---------- El índice, montado igual que en FairSearch.svelte ---------- */
const vistos = new Set();
const opciones = [];
const problemas = [];
const porSlug = new Set();

for (const f of fairsData) {
  if (!f.name || !normFair(f.name)) { problemas.push(`entrada sin nombre: slug "${f.slug}"`); continue; }
  if (!f.slug) { problemas.push(`entrada sin slug: "${f.name}"`); continue; }
  if (porSlug.has(f.slug)) problemas.push(`slug duplicado "${f.slug}"`);
  porSlug.add(f.slug);

  const claves = fairSearchKeys(f);
  if (vistos.has(claves.key)) {
    problemas.push(`nombre duplicado "${f.name}" (${f.slug}) — el buscador SOLO mostrará el primero`);
    continue;
  }
  vistos.add(claves.key);
  opciones.push({ type: 'fair', name: f.name, slug: f.slug, ...claves });
}
// Las actividades compiten en la misma lista, así que entran en la prueba.
for (const tg of tagOrder) {
  const label = labelForTag(tg, 'es');
  const key = normFair(label);
  if (!key || !fairsForActivity(tg).length) continue;
  opciones.push({ type: 'activity', name: label, slug: 'act:' + tg, key, cityKey: '', allKey: key });
}

const buscar = (texto) => {
  const q = normFair(texto);
  const toks = tokensOf(texto);
  if (!q) return [];
  return opciones
    .map((o) => ({ o, r: rankFair(o, q, toks) }))
    .filter((x) => x.r < 9)
    .sort((a, b) => a.r - b.r
      || (a.o.type === b.o.type ? 0 : a.o.type === 'activity' ? -1 : 1)
      || a.o.name.localeCompare(b.o.name, 'es'))
    .map((x) => x.o);
};
const puesto = (texto, slug) => buscar(texto).findIndex((o) => o.slug === slug);

/* ---------- Las pruebas de comportamiento ---------- */
function exigir(texto, slug, tope, etiqueta) {
  const p = puesto(texto, slug);
  if (p < 0) problemas.push(`${etiqueta}: "${texto}" NO encuentra ${slug} (el visitante recibe «esa feria no consta»)`);
  else if (p >= tope) problemas.push(`${etiqueta}: "${texto}" deja ${slug} en la posición ${p + 1} (se exige entre las ${tope} primeras)`);
}

for (const f of fairsData) {
  if (!f.name || !f.slug) continue;
  // 1. Su propio nombre, primero. Si el nombre está duplicado ya se ha avisado arriba.
  if (vistos.has(normFair(f.name)) && !problemas.some((p) => p.includes(`nombre duplicado "${f.name}"`))) {
    exigir(f.name, f.slug, 1, 'nombre propio');
  }
  // 2. «Nombre + ciudad»: lo más natural que teclea cualquiera.
  if (f.city && !NON_CITY.includes(f.city)) exigir(`${f.name} ${f.city}`, f.slug, 5, 'nombre + ciudad');
  // 3. El nombre sin los signos que nadie teclea.
  if (/[+&./]/.test(f.name)) {
    const limpio = f.name.replace(/[+&./]+/g, ' ').replace(/\s+/g, ' ').trim();
    exigir(limpio, f.slug, 5, 'nombre sin signos');
  }
}
// 4. Los alias declarados deben llevar a su ficha.
for (const [slug, lista] of Object.entries(fairAliases)) {
  if (!porSlug.has(slug)) { problemas.push(`alias de un slug que no existe en fairsData: "${slug}"`); continue; }
  for (const a of lista) exigir(a, slug, 10, 'alias');
}

if (problemas.length) {
  console.error(`[check-fair-search] ✗ ${problemas.length} problema(s): hay búsquedas que NO encuentran su feria.`);
  for (const p of problemas.slice(0, 40)) console.error('   - ' + p);
  if (problemas.length > 40) console.error(`   … y ${problemas.length - 40} más`);
  process.exit(1);
}

const conCiudad = fairsData.filter((f) => f.city && !NON_CITY.includes(f.city)).length;
const conSignos = fairsData.filter((f) => /[+&./]/.test(f.name)).length;
const alias = Object.values(fairAliases).reduce((n, l) => n + l.length, 0);
console.log(`[check-fair-search] ✔ OK — las ${fairsData.length} ferias salen primeras por su nombre; `
  + `${conCiudad} se encuentran por «nombre + ciudad», ${conSignos} sin los signos del nombre y ${alias} alias llevan a su ficha.`);
