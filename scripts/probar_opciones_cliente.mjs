#!/usr/bin/env node
/*
 * probar_opciones_cliente.mjs — prueba de extremo a extremo, EN EL SITIO PUBLICADO, de
 * las partidas opcionales que el cliente activa y desactiva desde su página de proyecto
 * (04/11/2026). Abre /proyecto?t=<token> con Chromium, localiza la primera partida
 * opcional y comprueba, en este orden:
 *
 *   1. que la fila lleva la casilla, el fondo verde suave y el importe ATENUADO
 *      (desactivada); el total no la incluye;
 *   2. que al marcar la casilla se guarda por la RPC toggle_client_option, se avisa al
 *      interlocutor por ajax_proyecto_notify.php (role=option) y, tras recargar, la base
 *      imponible sube EXACTAMENTE el importe de la partida, el total sube
 *      importe × (1 + IVA − IRPF) y el importe se muestra con color normal;
 *   3. que al desmarcarla vuelve todo al estado inicial.
 *
 * En el proyecto de DEMOSTRACIÓN (DEMO=1), cuyo enlace es público, la casilla solo
 * cambia la pantalla: se comprueba que NO se llama a la RPC ni al PHP y que el total
 * cambia en local.
 *
 * ⚠️ Con DEMO=0 el test ESCRIBE en la base de datos y MANDA DOS CORREOS al interlocutor
 * del proyecto (opción activada y desactivada). Solo se lanza contra un proyecto de
 * prueba, nunca contra el de un cliente.
 *
 * Se lanza desde el workflow «Prueba de opciones del cliente» (GitHub Actions), porque
 * desde la sesión de desarrollo el proxy no deja llegar a standarte.es.
 *
 *   BASE_URL=https://standarte.es TOKEN=<token> DEMO=0 node scripts/probar_opciones_cliente.mjs
 *
 * Deja capturas en ./pruebas/ (antes, activada, desactivada). Sale con código 1 si algo
 * no cuadra.
 */

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = (process.env.BASE_URL || 'https://standarte.es').replace(/\/+$/, '');
const TOKEN = (process.env.TOKEN || '').trim();
const DEMO = /^(1|true|yes)$/i.test(process.env.DEMO || '');
const OUT = path.resolve(process.env.OUT_DIR || 'pruebas');
if (!/^[a-f0-9]{20,64}$/.test(TOKEN)) { console.error('TOKEN no válido'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });

const DIM = 'rgb(163, 163, 155)';   // .pz-amt-off  #a3a39b
const BG_OFF = 'rgb(243, 247, 240)'; // tr.pz-opt-off td  #f3f7f0
const BG_ON = 'rgb(238, 246, 232)';  // tr.pz-opt td  #eef6e8

/* «40.492,00 €» (es) o «€40,492.00» (en) → 40492. El último separador es el decimal. */
function parseMoney(s) {
  const t = String(s || '').replace(/[^\d.,-]/g, '');
  const i = Math.max(t.lastIndexOf(','), t.lastIndexOf('.'));
  const intPart = (i >= 0 ? t.slice(0, i) : t).replace(/[.,]/g, '');
  const dec = i >= 0 ? t.slice(i + 1) : '';
  return Number(intPart + (dec ? '.' + dec : ''));
}
const near = (a, b, eps = 0.011) => Math.abs(a - b) <= eps;

let fallos = 0;
const ok = (cond, msg, detail = '') => {
  console.log(`  ${cond ? '✔' : '✖'} ${msg}${detail ? '  (' + detail + ')' : ''}`);
  if (!cond) fallos++;
};

const ROW = '.pz-sheet tbody tr.pz-opt';
async function leer(page) {
  return page.evaluate(({ ROW }) => {
    const tr = document.querySelector(ROW);
    if (!tr) return null;
    const chk = tr.querySelector('input.pz-optchk');
    const amt = tr.querySelector('td.num');
    const cs = (el) => el ? getComputedStyle(el) : null;
    const txt = (sel) => { const el = document.querySelector(sel); return el ? el.textContent.trim() : ''; };
    const rows = Array.from(document.querySelectorAll('.pz-sheet tr')).map((r) => r.textContent.replace(/\s+/g, ' ').trim());
    const pct = (re) => { for (const r of rows) { const m = re.exec(r); if (m) return Number(m[1].replace(',', '.')) / 100; } return 0; };
    return {
      hasChk: !!chk, checked: chk ? chk.checked : null, disabled: chk ? chk.disabled : null,
      concept: tr.querySelector('td') ? tr.querySelector('td').textContent.replace(/\s+/g, ' ').trim() : '',
      amtText: amt ? amt.textContent.trim() : '', amtColor: cs(amt)?.color, amtOffClass: amt ? amt.classList.contains('pz-amt-off') : null,
      rowOff: tr.classList.contains('pz-opt-off'), bg: cs(tr.querySelector('td'))?.backgroundColor,
      base: txt('.pz-sheet tr.sum td.num'), total: txt('.pz-sheet tr.grand td.num'),
      iva: pct(/(?:IVA|VAT) \((\d+(?:[.,]\d+)?)%\)/), irpf: pct(/IRPF \(−(\d+(?:[.,]\d+)?)%\)/),
      optionalRows: document.querySelectorAll(ROW).length
    };
  }, { ROW });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
const llamadas = { rpc: 0, notify: 0 };
page.on('request', (r) => { const u = r.url(); if (u.includes('toggle_client_option')) llamadas.rpc++; if (u.includes('ajax_proyecto_notify.php')) llamadas.notify++; });

console.log(`\nProbando ${BASE}/proyecto?t=${TOKEN.slice(0, 6)}…  (${DEMO ? 'DEMO: solo pantalla' : 'REAL: guarda y avisa'})\n`);
await page.goto(`${BASE}/proyecto?t=${TOKEN}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
try {
  await page.waitForSelector(ROW, { timeout: 45000 });
} catch {
  const body = (await page.textContent('body') || '').replace(/\s+/g, ' ').slice(0, 300);
  console.error(`✖ No aparece ninguna partida opcional en la página. Texto: ${body}`);
  await page.screenshot({ path: path.join(OUT, '0-sin-opcional.png'), fullPage: true });
  await browser.close(); process.exit(1);
}
await page.locator(ROW).first().scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(OUT, '1-antes.png'), fullPage: true });

console.log('1) Estado inicial (opción desactivada)');
const a = await leer(page);
const amount = parseMoney(a.amtText);
console.log(`   partida: «${a.concept}»  importe ${a.amtText}  base ${a.base}  total ${a.total}  IVA ${a.iva}  IRPF ${a.irpf}`);
ok(a.hasChk, 'la fila opcional lleva casilla');
ok(a.checked === false, 'la casilla está desmarcada');
ok(a.disabled === false, 'la casilla está habilitada');
ok(a.rowOff && a.bg === BG_OFF, 'fondo verde suave de opción desactivada', a.bg);
ok(a.amtOffClass && a.amtColor === DIM, 'importe atenuado', a.amtColor);
ok(amount > 0, 'importe legible', String(amount));
const base0 = parseMoney(a.base), total0 = parseMoney(a.total);
const factor = 1 + a.iva - a.irpf;

console.log('2) Marcar la casilla');
const chk = page.locator(`${ROW} input.pz-optchk`).first();
const totalAntes = a.total;
if (DEMO) {
  await chk.click();
  await page.waitForTimeout(2500);
  const b = await leer(page);
  ok(llamadas.rpc === 0 && llamadas.notify === 0, 'en la demo no se llama ni a la RPC ni al PHP', `rpc=${llamadas.rpc} notify=${llamadas.notify}`);
  ok(b.checked === true, 'la casilla queda marcada');
  ok(!b.rowOff && b.bg === BG_ON, 'fondo verde de opción activada', b.bg);
  ok(!b.amtOffClass && b.amtColor !== DIM, 'importe con color normal', b.amtColor);
  ok(near(parseMoney(b.base) - base0, amount), 'la base sube exactamente el importe', `${base0} → ${parseMoney(b.base)}`);
  ok(near(parseMoney(b.total) - total0, amount * factor), `el total sube importe × ${factor.toFixed(2)}`, `${total0} → ${parseMoney(b.total)}`);
  await page.screenshot({ path: path.join(OUT, '2-activada.png'), fullPage: true });
  console.log('3) Desmarcar la casilla');
  await chk.click();
  await page.waitForTimeout(1500);
  const c = await leer(page);
  ok(c.checked === false && c.amtOffClass && near(parseMoney(c.total), total0), 'vuelve al estado inicial', c.total);
  ok(llamadas.rpc === 0 && llamadas.notify === 0, 'sigue sin llamadas al servidor');
  await page.screenshot({ path: path.join(OUT, '3-desactivada.png'), fullPage: true });
} else {
  const esperaRpc = page.waitForResponse((r) => r.url().includes('toggle_client_option'), { timeout: 30000 });
  const esperaNotify = page.waitForResponse((r) => r.url().includes('ajax_proyecto_notify.php') && r.request().method() === 'POST' && (r.request().postData() || '').includes('role=option'), { timeout: 30000 });
  await chk.click();
  const rpc = await esperaRpc;
  const rpcJson = await rpc.json().catch(() => null);
  ok(rpc.ok() && rpcJson && rpcJson.ok === true, 'la RPC toggle_client_option responde ok', JSON.stringify(rpcJson && { ok: rpcJson.ok, error: rpcJson.error }));
  const nt = await esperaNotify;
  const ntBody = await nt.text().catch(() => '');
  let ntJson = null; try { ntJson = JSON.parse(ntBody); } catch { /* no JSON */ }
  ok(nt.ok() && ntJson && ntJson.ok === true, 'el PHP role=option ha enviado el aviso al interlocutor', ntBody.slice(0, 120));
  await page.waitForFunction(({ ROW, prev }) => {
    const tr = document.querySelector(ROW); const t = document.querySelector('.pz-sheet tr.grand td.num');
    return tr && tr.querySelector('input.pz-optchk')?.checked === true && t && t.textContent.trim() !== prev;
  }, { ROW, prev: totalAntes }, { timeout: 30000 });
  const b = await leer(page);
  console.log(`   tras activar: base ${b.base}  total ${b.total}`);
  ok(b.checked === true, 'la casilla queda marcada tras recargar');
  ok(!b.rowOff && b.bg === BG_ON, 'fondo verde de opción activada', b.bg);
  ok(!b.amtOffClass && b.amtColor !== DIM, 'importe con color normal', b.amtColor);
  ok(near(parseMoney(b.base) - base0, amount), 'la base sube exactamente el importe', `${base0} → ${parseMoney(b.base)}`);
  ok(near(parseMoney(b.total) - total0, amount * factor), `el total sube importe × ${factor.toFixed(2)}`, `${total0} → ${parseMoney(b.total)}`);
  await page.screenshot({ path: path.join(OUT, '2-activada.png'), fullPage: true });

  console.log('3) Desmarcar la casilla');
  const esperaRpc2 = page.waitForResponse((r) => r.url().includes('toggle_client_option'), { timeout: 30000 });
  const esperaNotify2 = page.waitForResponse((r) => r.url().includes('ajax_proyecto_notify.php') && r.request().method() === 'POST' && (r.request().postData() || '').includes('role=option'), { timeout: 30000 });
  await chk.click();
  const rpc2 = await esperaRpc2; const rpc2Json = await rpc2.json().catch(() => null);
  ok(rpc2.ok() && rpc2Json && rpc2Json.ok === true, 'la RPC responde ok al desactivar');
  const nt2 = await esperaNotify2; const nt2Body = await nt2.text().catch(() => '');
  ok(nt2.ok() && /"ok"\s*:\s*true/.test(nt2Body), 'aviso de «opción desactivada» enviado', nt2Body.slice(0, 120));
  await page.waitForFunction(({ ROW, prev }) => {
    const tr = document.querySelector(ROW); const t = document.querySelector('.pz-sheet tr.grand td.num');
    return tr && tr.querySelector('input.pz-optchk')?.checked === false && t && t.textContent.trim() !== prev;
  }, { ROW, prev: b.total }, { timeout: 30000 });
  const c = await leer(page);
  console.log(`   tras desactivar: base ${c.base}  total ${c.total}`);
  ok(c.checked === false && c.rowOff && c.amtOffClass && c.amtColor === DIM, 'vuelve a atenuada', c.amtColor);
  ok(near(parseMoney(c.base), base0) && near(parseMoney(c.total), total0), 'base y total vuelven al valor inicial', `${c.base} / ${c.total}`);
  ok(llamadas.rpc === 2 && llamadas.notify >= 2, 'dos llamadas a la RPC y dos avisos', `rpc=${llamadas.rpc} notify=${llamadas.notify}`);
  await page.screenshot({ path: path.join(OUT, '3-desactivada.png'), fullPage: true });
}

await browser.close();
if (fallos) { console.error(`\n✖ ${fallos} comprobación(es) fallan.`); process.exit(1); }
console.log('\n✔ Las opciones del cliente funcionan en el sitio publicado.');
