// Envía todas las URLs de dist/sitemap.xml a IndexNow (Bing, Yandex, Seznam...) en un
// único POST. Requiere que el fichero de clave ya esté publicado en producción
// (static/f457ad125f8f4df48c0d5f2fbe7d009c.txt se copia a dist/ en cada build).
import { readFileSync } from 'node:fs';

const HOST = 'standarte.es';
const KEY = 'f457ad125f8f4df48c0d5f2fbe7d009c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = new URL('../dist/sitemap.xml', import.meta.url);

const xml = readFileSync(SITEMAP_PATH, 'utf-8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urlList.length) {
  console.error('No se encontraron URLs en dist/sitemap.xml. ¿Has ejecutado npm run build?');
  process.exit(1);
}

console.log(`Enviando ${urlList.length} URLs a IndexNow...`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
});

console.log('HTTP', res.status);
const text = await res.text();
if (text) console.log(text);

if (res.status === 200 || res.status === 202) {
  console.log('✔ Enviado correctamente.');
} else {
  console.error('✘ IndexNow devolvió un error. Revisa host/key/keyLocation.');
  process.exit(1);
}
