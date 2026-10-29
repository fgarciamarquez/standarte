#!/usr/bin/env node
/**
 * Mide un texto NUEVO contra lo que ya publica el repo, antes de sustituirlo.
 *
 * Existe porque el autodiagnóstico de quien redacta ha fallado cuatro veces seguidas en
 * este proyecto: certificaba por escrito «no se pierde ningún término» mientras perdía
 * «doble altura», «almacén», «suspensiones» o «primera», y certificaba «sin duplicación»
 * mientras copiaba 16 palabras seguidas de la ficha de Gastrónoma. Las fichas de feria
 * posicionan en 1.ª-2.ª posición: duplicarlas es el fallo caro.
 *
 * Dos medidas, las dos con script y nunca a ojo:
 *   1. TÉRMINOS. El proyecto prohíbe quitar un término ya publicado (decisión del usuario,
 *      26/09/2026: sumar términos, nunca quitar). Se extraen del texto VIVO y se cuentan.
 *   2. DUPLICACIÓN. Rachas literales de N palabras contra las fichas de feria, el cuerpo
 *      de ciudad y las demás paralelas, excluyendo la propia página que se sustituye.
 *
 * Uso:
 *   node scripts/medir_texto_seo.mjs --clave constructor_stand_valencia --fuente builder \
 *        --nuevo scratch/ronda/v2 --idioma es
 *
 *   --nuevo apunta a una CARPETA con los ficheros del texto nuevo de ese idioma
 *   (intro_<idioma>, body_<idioma>, faqs_<idioma>, con o sin extensión .html).
 *
 * Sale con código 1 si pierde algún término o si comparte rachas con una ficha de feria
 * o con el cuerpo de ciudad. Las rachas con otras paralelas se informan pero no fallan:
 * el CTA y el enlace a la ciudad son plantilla deliberada en las 138.
 *
 * DOS COSAS QUE HAY QUE SABER PARA LEER LA SALIDA:
 *  · CÓRRELO ANTES DE APLICAR EL TEXTO AL REPO. Compara contra lo que hay publicado; si
 *    ya has sustituido la entrada, el «vivo» es tu propio texto y el recuento de términos
 *    sale 436/436 sin significar nada.
 *  · No toda racha marcada es un problema: una ENUMERACIÓN DE NOMBRES de feria en el mismo
 *    orden («textilhogar espacio cocina sici fimma maderalia») la marca y es inevitable.
 *    Lo que sí hay que reformular es la PROSA compartida, como las 16 palabras seguidas
 *    que se copiaron de la ficha de Gastrónoma. Lo decide quien lee, no el script.
 */
import { readFileSync, readdirSync } from 'node:fs';

const arg = (nombre, pordefecto) => {
  const i = process.argv.indexOf('--' + nombre);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : pordefecto;
};

const CLAVE = arg('clave');
const FUENTE = arg('fuente', 'builder');       // builder | fair | rich
const DIR = arg('nuevo');
const IDIOMA = arg('idioma', 'es');
const N = Number(arg('palabras', 8));

if (!CLAVE || !DIR) {
  console.error('Faltan argumentos. Ejemplo:\n  node scripts/medir_texto_seo.mjs --clave constructor_stand_valencia --fuente builder --nuevo scratch/ronda/v2 --idioma es');
  process.exit(2);
}

const FICHEROS = {
  builder: 'src/lib/server/builderSeoData.js',
  fair: 'src/lib/server/fairSeoData.js',
  rich: 'src/lib/server/richSeoData.js'
};
const RUTA = FICHEROS[FUENTE];
if (!RUTA) { console.error('--fuente debe ser builder, fair o rich'); process.exit(2); }

// ── Extracción del texto vivo ────────────────────────────────────────────────────────
// SIEMPRE por llaves emparejadas. Cortar por longitud fija se mete en las entradas
// siguientes y contamina la medición con los términos de otras ciudades: pasó, y la
// lista de «términos perdidos» salía llena de Valladolid, Alicante y Murcia.
const repo = readFileSync(RUTA, 'utf8');
function bloques(clave) {
  const marcas = [clave + ': {', "'" + clave + "': {", '"' + clave + '": {'];
  const out = [];
  let desde = 0;
  for (;;) {
    let i = -1, marca = '';
    for (const m of marcas) {
      const k = repo.indexOf(m, desde);
      if (k >= 0 && (i < 0 || k < i)) { i = k; marca = m; }
    }
    if (i < 0) break;
    let prof = 0, fin = -1;
    for (let j = i + marca.length - 1; j < repo.length; j++) {
      const c = repo[j];
      if (c === '{') prof++;
      else if (c === '}') { prof--; if (prof === 0) { fin = j; break; } }
    }
    if (fin < 0) break;
    out.push({ texto: repo.slice(i, fin + 1), ini: i, fin });
    desde = fin;
  }
  return out;
}

const vivos = bloques(CLAVE);
if (!vivos.length) {
  // Que NO pase en silencio: un localizador que falla da «0/0 ✔», que es el peor verde.
  console.error('ERROR: no encuentro la clave «' + CLAVE + '» en ' + RUTA);
  process.exit(2);
}

// ── Texto nuevo ──────────────────────────────────────────────────────────────────────
const ficheros = readdirSync(DIR).filter((f) => f.includes('_' + IDIOMA));
if (!ficheros.length) { console.error('ERROR: en ' + DIR + ' no hay ficheros «*_' + IDIOMA + '*»'); process.exit(2); }
const nuevo = ficheros.map((f) => readFileSync(DIR + '/' + f, 'utf8')).join(' ');

// ── 1. Términos ──────────────────────────────────────────────────────────────────────
const VACIAS = new Set(('de la el los las un una unos unas y o a en con por para que se su sus lo al del es son esta este estos estas como mas muy ya no ni si sin sobre entre desde hasta cuando donde cada todo toda todos todas otro otra nuestro nuestra nuestros nuestras te tu tus le les hay ser esta estan the of and to in for with on is are it that this these those we our you your from by as at be or not what which who all any each its page ask').split(/\s+/));
// Los nombres de campo del objeto y la propia clave no son contenido.
const ESTRUCTURA = new Set(['breadcrumb', 'title', 'introtext', 'body', 'faqs', 'h1', ...CLAVE.split('_')]);
const terminos = (html) => new Set(
  String(html).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ')
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9+]+/)
    .filter((w) => w.length > 2 && !VACIAS.has(w) && !ESTRUCTURA.has(w))
);

// El bloque del idioma pedido: en el objeto principal va anidado bajo su código; en los
// objetos por idioma (const EN) es plano y hay un bloque por idioma.
const vivoTexto = (vivos.length > 1 && IDIOMA !== 'es' ? vivos[1] : vivos[0]).texto
  .split(CLAVE).join(' ');

const v = terminos(vivoTexto), n = terminos(nuevo);
const perdidos = [...v].filter((t) => !n.has(t));
console.log('TÉRMINOS (' + IDIOMA + '): ' + (v.size - perdidos.length) + '/' + v.size +
  (perdidos.length ? '  ← PIERDE: ' + perdidos.join(', ') : '  ✔'));

// ── 2. Duplicación ───────────────────────────────────────────────────────────────────
const limpiar = (s) => String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ')
  .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const gramas = (txt) => {
  const w = limpiar(txt), s = new Set();
  for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(' '));
  return s;
};
const mios = gramas(nuevo);

// De la fuente propia se quitan los bloques de esta misma página: solaparse consigo
// misma no es duplicación, es la página que se sustituye.
let propiaSinEsta = repo;
for (const b of [...vivos].reverse()) propiaSinEsta = propiaSinEsta.slice(0, b.ini) + ' ' + propiaSinEsta.slice(b.fin + 1);

const CONTRA = [
  ['fichas de feria', FUENTE === 'fair' ? propiaSinEsta : readFileSync(FICHEROS.fair, 'utf8'), true],
  ['cuerpo de ciudad', FUENTE === 'rich' ? propiaSinEsta : readFileSync(FICHEROS.rich, 'utf8'), true],
  ['otras paralelas', FUENTE === 'builder' ? propiaSinEsta : readFileSync(FICHEROS.builder, 'utf8'), false]
];

let grave = perdidos.length > 0;
for (const [etiqueta, fuente, bloqueante] of CONTRA) {
  const suyos = gramas(fuente);
  const comunes = [...mios].filter((g) => suyos.has(g));
  if (!comunes.length) { console.log('DUPLICACIÓN × ' + etiqueta + ': 0 ✔'); continue; }
  console.log('DUPLICACIÓN × ' + etiqueta + ': ' + comunes.length + ' racha(s) de ' + N + ' palabras' + (bloqueante ? '  ← HAY QUE REFORMULAR' : '  (plantilla compartida: no bloquea)'));
  comunes.slice(0, 6).forEach((g) => console.log('    «' + g + '»'));
  if (bloqueante) grave = true;
}

process.exit(grave ? 1 : 0);
