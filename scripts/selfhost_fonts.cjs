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
    ' * Generado por scripts/selfhost_fonts.cjs a partir del CSS de Google Fonts. Se sirven',
    ' * desde el propio dominio para no abrir dos conexiones externas antes de pintar texto,',
    ' * que era el mayor coste de arranque que quedaba en móvil.',
    ' *',
    ' * font-display: swap se conserva del original: el texto se ve desde el primer',
    ' * fotograma con la fuente del sistema y se sustituye al cargar la definitiva.',
    ' */',
    ''
  ];
  let downloaded = 0, bytes = 0;

  for (const b of blocks) {
    if (!KEEP.has(b.subset)) continue;
    const family = (/font-family:\s*'([^']+)'/.exec(b.body) || [])[1];
    const weight = (/font-weight:\s*(\d+)/.exec(b.body) || [])[1];
    const style = (/font-style:\s*(\w+)/.exec(b.body) || [])[1] || 'normal';
    const url = (/url\((https:[^)]+\.woff2)\)/.exec(b.body) || [])[1];
    if (!family || !url) { console.error('bloque sin family/url'); process.exit(1); }

    const file = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}-${b.subset}.woff2`;
    const buf = await get(url);
    fs.writeFileSync(path.join(OUT_DIR, file), buf);
    downloaded++; bytes += buf.length;
    console.log(`  ${file.padEnd(34)} ${(buf.length / 1024).toFixed(1)} KB`);

    const range = (/unicode-range:\s*([^;]+);/.exec(b.body) || [])[1];
    out.push('@font-face {');
    out.push(`  font-family: '${family}';`);
    out.push(`  font-style: ${style};`);
    out.push(`  font-weight: ${weight};`);
    out.push('  font-display: swap;');
    out.push(`  src: url('/fonts/${file}') format('woff2');`);
    if (range) out.push(`  unicode-range: ${range};`);
    out.push('}');
    out.push('');
  }

  fs.writeFileSync(path.join(OUT_DIR, 'fonts.css'), out.join('\n').replace(/\r?\n/g, '\n'), 'utf8');
  console.log(`\n${downloaded} ficheros, ${(bytes / 1024).toFixed(1)} KB en total.`);
  console.log('CSS escrito en static/fonts/fonts.css');
})();
