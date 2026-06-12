# STANDARTE_SVELTE

Web de Standarte (diseño y construcción de stands feriales) + sistema propio de email marketing. Hosting en OVH (PHP 8.3), repo en `github.com/fgarciamarquez/standarte`.

## Arquitectura

Tres sistemas en un mismo repo:

1. **Web pública (SvelteKit estático)** — fuente en `src/`, multiidioma (es/en/de/pt/hi/zh) definido en `src/lib/siteData.js`. Noticias en `src/lib/newsData.json`. `npm run build` genera `dist/`, que es lo que se sube al servidor (`/www`).
2. **Email marketing (PHP)** — `static/admin/email_campaing/`: campañas drip, mailer SMTP, panel admin, tracking. Bounces vía IMAP en `static/bounce-handler.php`. Leads en Supabase (REST API).
3. **Scripts de automatización (Node)** — `scripts/`: generador de noticias con Gemini (`autonomous_generator.cjs`), harvesting de expositores, revalidación de emails.

## Duplicación raíz / static — LEER ANTES DE EDITAR PHP

Los PHP existen por duplicado:
- `static/admin/...`, `static/*.php` → **fuente de verdad**; se copian a `dist/` en el build y de ahí al servidor.
- `admin/...`, `*.php` en raíz → espejo que sirve MAMP en local (`http://localhost/STANDARTE_SVELTE/`) para probar PHP.

Convención actual: **todo cambio de PHP se aplica en ambas copias**. Los ficheros estáticos compilados de la raíz (`_app/`, `img/`, `css/`, `en/`, `de/`, `index.html`…, ~1.400 ficheros trackeados) son una copia antigua del build (mayo 2026) que existe solo para ese espejo local. Decisión pendiente: sacarlos del repo.

## Deploy

- Local: `npm run build` y luego `ftp_sync.ps1 -SyncToRemote` (sincroniza `dist/` ↔ `/www`, borra remotos huérfanos) o `deploy_all.ps1`. Credenciales FTP en `.vscode/sftp.json` (gitignored). Host: `ftp.cluster128.hosting.ovh.net:21`.
- CI: el workflow de noticias usa `deploy_clean.cjs` (secrets `FTP_USER`/`FTP_PASS`). **No mover ni renombrar `deploy_clean.cjs`.**

## GitHub Actions (.github/workflows/)

- `autonomous_news.yml` — diario 08:00 UTC: genera noticia con Gemini, build, deploy FTP, commitea `newsData.json`.
- `drip_cron.yml` — cada hora 08–18 UTC: curl a `cron_drip.php` en el servidor (con token).
- `bounce_cleaner.yml` — 03:00 UTC y a los 5 min de cada drip: curl a `bounce-handler.php`.

## Secretos

- `supabase-config.php` (raíz y static) — gitignored. Contiene credenciales Supabase e IMAP (`ssl0.ovh.net:993`).
- ⚠️ `static/admin/email_campaing/config.php` está trackeado y contiene la contraseña SMTP en claro. Pendiente: extraerla a fichero ignorado.

## Carpetas auxiliares

- `scratch/` — gitignored. Scripts desechables y experimentos. `scratch/archivo_raiz/` contiene los one-offs que antes ensuciaban la raíz del repo.
- `backups/`, `exports/`, `www/` — material histórico, no tocar sin preguntar.

## Desarrollo local

```bash
npm install
npm run dev        # Vite en http://localhost:5173
npm run build      # genera dist/
```

El PHP no corre en Vite: para probar formularios/panel admin se usa MAMP sobre el espejo de la raíz.

## Decisiones pendientes (no ejecutar sin confirmar)

1. Eliminar del repo el espejo estático antiguo de la raíz (~1.400 ficheros) y definir un flujo local mejor para PHP.
2. Extraer la contraseña SMTP de `config.php` a fichero ignorado y rotarla.
3. Verificar si `read_server_file.php`, `opcache_clear.php`, `test_mail.php` siguen subidos al servidor y borrarlos de allí (localmente ya están archivados en scratch).
4. Unificar la doble copia de PHP raíz/static para editar una sola vez.
