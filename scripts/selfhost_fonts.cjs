// Autoaloja las fuentes de Google en static/fonts/.
//
// Motivo: servirlas desde fonts.googleapis.com obliga al navegador a abrir dos
// conexiones nuevas (DNS + TCP + TLS a googleapis y a gstatic) ANTES de poder pintar
// texto. En móvil eso es de lo que más cuesta del arranque. Sirviéndolas desde el
// propio dominio, viajan por la conexión ya abierta.
//
// Solo se traen los subconjuntos latin y latin-ext: son los que usan los siete idiomas
// con alfabeto latino del sitio. Para zh/hi/ko/ja, Roboto no tiene glifos y el navegador
// ya cae a la fuente del sistema, así que descargar cyrillic/greek/vietnamese/math/
// symbols sería peso muerto en el repo.
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = 'C:/MAMP/htdocs/STANDARTE_SVELTE';
const OUT_DIR = path.join(ROOT, 'static/fonts');
const CSS_SRC = process.argv[2];
const KEEP = new Set(['latin', 'latin-ext']);

const css = fs.readFileSync(CSS_SRC, 'utf8');
fs.mkdirSync(OUT_DIR, { recursive: true });

// El CSS de Google va como: /* subset */\n@font-face { ... }
const blocks = [];
const re = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
let m;
while ((m = re.exec(css)) !== null) blocks.push({ subset: m[1], body: m[2] });

const get = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode + ' ' + url)); return; }
    const chunks = [];
    res.on('data', (c) => chunks.push(c));
    res.on('end', () => resolve(Buffer.concat(chunks)));
  }).on('error', reject);
});

(async () => {
  const out = [
    '/* Fuentes autoalojadas (Roboto e Inconsolata, subconjuntos latin y latin-ext).',
    ' *',
    ' * Generado por scripts/selfhost_fonts.cjs a partir del CSS de Google Fonts.',
    ' *',
    ' * IMPORTANTE — son fuentes VARIABLES: un único fichero contiene todo el rango de pesos',
    ' * (tablas fvar/gvar/STAT). Google sirve la MISMA url para 400, 700 y 900, así que declarar',
    ' * una @font-face por peso hacía que el navegador se descargase el mismo binario tres veces',
    ' * bajo tres nombres distintos (129 KB de Roboto en lugar de 43 KB) y alargaba la cadena',
    ' * crítica. Por eso hay UNA declaración por familia+subconjunto con `font-weight: 100 900`:',
    ' * el navegador descarga un fichero y de él saca cualquier peso, incluidos el 500, 600 y 800',
    ' * que antes no estaban declarados y el navegador falsificaba engordando los trazos.',
    ' *',
    ' * Este fichero se INCRUSTA en el <head> (src/app.html) para que no bloquee el renderizado',
    ' * ni añada un salto a la cadena crítica; se mantiene aquí servible por compatibilidad con',
    ' * páginas antiguas que sigan cacheadas con el <link> a /fonts/fonts.css.',
    ' *',
    ' * font-display: swap: el texto se ve desde el primer fotograma con la fuente del sistema y',
    ' * se sustituye al cargar la definitiva.',
    ' */',
    ''
  ];
  let downloaded = 0, bytes = 0;
  // Deduplicación por URL de origen: al ser fuentes variables, los bloques de 400, 700 y
  // 900 apuntan al MISMO woff2. Se descarga una sola vez por familia+subconjunto y se
  // emite una @font-face con el rango completo de pesos.
  const seen = new Map();

  for (const b of blocks) {
    if (!KEEP.has(b.subset)) continue;
    const family = (/font-family:\s*'([^']+)'/.exec(b.body) || [])[1];
    const style = (/font-style:\s*(\w+)/.exec(b.body) || [])[1] || 'normal';
    const url = (/url\((https:[^)]+\.woff2)\)/.exec(b.body) || [])[1];
    if (!family || !url) { console.error('bloque sin family/url'); process.exit(1); }
    if (seen.has(url)) {
      console.log(`  (omitido: mismo fichero que ${seen.get(url)})`);
      continue;
    }

    const file = `${family.toLowerCase().replace(/\s+/g, '-')}-${b.subset}.woff2`;
    seen.set(url, file);
    const buf = await get(url);
    fs.writeFileSync(path.join(OUT_DIR, file), buf);
    downloaded++; bytes += buf.length;
    console.log(`  ${file.padEnd(34)} ${(buf.length / 1024).toFixed(1)} KB`);

    const range = (/unicode-range:\s*([^;]+);/.exec(b.body) || [])[1];
    out.push('@font-face {');
    out.push(`  font-family: '${family}';`);
    out.push(`  font-style: ${style};`);
    out.push('  font-weight: 100 900;');
    out.push('  font-display: swap;');
    out.push(`  src: url('/fonts/${file}') format('woff2');`);
    if (range) out.push(`  unicode-range: ${range};`);
    out.push('}');
    out.push('');
  }

  // Aviso: el CSS incrustado en src/app.html es una copia minificada de este fichero. Si
  // cambian las familias o los subconjuntos, hay que actualizar el <style> del <head>.
  console.log('\n⚠ Recuerda: src/app.html lleva este mismo CSS incrustado (minificado).');

  fs.writeFileSync(path.join(OUT_DIR, 'fonts.css'), out.join('\n').replace(/\r?\n/g, '\n'), 'utf8');
  console.log(`\n${downloaded} ficheros, ${(bytes / 1024).toFixed(1)} KB en total.`);
  console.log('CSS escrito en static/fonts/fonts.css');
})();
