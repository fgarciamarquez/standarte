# STANDARTE_SVELTE

Web de Standarte (diseño y construcción de stands feriales) + sistema propio de email marketing. Hosting en OVH (PHP 8.3), repo en `github.com/fgarciamarquez/standarte`.

## Arquitectura

Tres sistemas en un mismo repo:

1. **Web pública (SvelteKit estático)** — fuente en `src/`, multiidioma (es/en/de/pt/hi/zh) definido en `src/lib/siteData.js`. Noticias en `src/lib/newsData.json`. `npm run build` genera `dist/`, que es lo que se sube al servidor (`/www`).
   - Los datasets pesados NO van al bundle del cliente: `projectData.js` (3,7 MB) y `src/lib/server/richSeoData.js` (744 KB) solo se usan en loads de servidor (`+page.server.js`); cada página prerenderizada lleva embebidos únicamente sus datos. El carrusel de la portada usa `src/lib/projectIndex.js`, **generado** por `scripts/build_project_index.mjs` en los hooks predev/prebuild (gitignored, no editar a mano).
2. **Email marketing (PHP)** — `static/admin/email_campaing/`: campañas drip, mailer SMTP, panel admin, tracking. Bounces vía IMAP en `static/bounce-handler.php`. Leads en Supabase (REST API).
3. **Scripts de automatización (Node)** — `scripts/`: generador de noticias con Gemini (`autonomous_generator.cjs`), harvesting de expositores, revalidación de emails.
   - **Noticias (v2, 13/09/2026)**: cada artículo sale de un plan editorial feria × intención de búsqueda (precio, plazos, diseño, modular/a medida, primer expositor, sector, reutilizar, montaje en recinto, tendencias, elegir constructor) centrado en **Madrid y Lisboa**, en **es + en** (y pt si es Lisboa), un idioma por llamada. Enlaces deterministas a la ficha de feria (`/ferias/<slug>#feria-presupuesto`, el formulario), ciudad, constructor, ferias relacionadas y proyecto; imagen de la galería de proyectos 3D sin repetir. Cada artículo guarda `fairSlug`, `intent` y `projectId`. Sin API no se publica relleno. Las noticias antiguas se retroadaptaron el 14/09/2026 con `scripts/retrofit_news_links.mjs` (bloque de conversión, enlaces relativos, `fairSlug` inferido; idempotente). La página de artículo añade «Más noticias» (relacionadas + anterior/siguiente, mismo idioma) y el listado del blog muestra las noticias de cada idioma. Probar con `node scripts/autonomous_generator.cjs --dry-run [--city=Lisboa --fair=<slug> --intent=<key>]` y `MOCK_GEMINI=1 NEWS_DATA_PATH=/tmp/x.json`.

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
- `offer_deadline.yml` — diario 06:03/07:03 UTC: curl a `admin/cron_oferta.php` (aviso de la oferta la VÍSPERA de su vencimiento, con red de seguridad el mismo día si no se avisó; el texto aclara que el plazo incluye el día citado hasta las 24:00; ventana desde las 08:00 de Madrid hasta fin de día porque GitHub retrasa el cron).
- `project_reminder.yml` — miércoles 07:03/08:03 UTC: curl a `admin/cron_recordatorio.php` (recordatorio semanal al cliente de que su proyecto sigue activo, con imagen y precio final; actúa a las 09:xx de Madrid; no se omite por visitas recientes porque `last_client_visit` también cuenta las del equipo; columnas `client_notified_at`, `reminder_sent_at`, `reminder_count`).

## Secretos (ninguno debe entrar en git)

- `supabase-config.php` (raíz y static) — gitignored. Credenciales Supabase e IMAP (`ssl0.ovh.net:993`).
- Contraseña SMTP en `admin/email_campaing/data/smtp_password.txt` (gitignored); la leen los `config.php` de campañas y de presupuesto.
- Credenciales FTP en `.vscode/sftp.json` (gitignored); las leen `ftp_sync.ps1`, `deploy_clean.cjs/.ps1` y `sync_ftp.cjs`. CI usa los secrets `FTP_USER`/`FTP_PASS`.
- ⚠️ Las contraseñas de buzón y FTP estuvieron expuestas en el historial del repo: pendiente rotarlas en OVH (después: actualizar txt local+servidor, sftp.json y secrets de Actions).

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

## Estrategia SEO por ferias (decisión del usuario, 12/09/2026)

El método de **una URL por feria** (`/ferias/stand-<feria>-<ciudad>`) es el que da resultados, aunque en plazas competidas como Madrid mejore despacio. Por eso hay que **ampliar de vez en cuando la red de ferias** en tres plazas prioritarias: Madrid (IFEMA), Lisboa (FIL, Altice Arena, Lisboa Congress Centre) y el entorno industrial del norte de Portugal (Oporto/Exponor, Braga, Guimarães, Batalha/Exposalão, Aveiro). Referencia a 12/09/2026: Madrid 34 fichas, Lisboa 27, Oporto 21, Batalha 5. Una Routine en claude.ai (días 1 y 15 de cada mes, 05:00 UTC) prepara el alta de 1 o 2 ferias por plaza en una rama `routine/alta-ferias-<fecha>` y abre un pull request siguiendo **`docs/alta_ferias.md`**; tras el merge hay que lanzar `deploy.yml` (procedimiento «Absolutista»: 11 idiomas, fechas de fuente oficial, enlace desde la página matriz, frescura y slugs `stands-`).

## Web sin secciones de imágenes (decisión del usuario, 18/09/2026)

- Interruptor único `HIDE_IMAGE_SECTIONS` en `src/lib/imagePolicy.js`. Con él activo no se renderizan: portadas de ciudad y de feria, galería (rejilla, vídeos, visor), figuras de caso, figuras/vídeo keyword, rejilla de portadas de la home (quedan las tarjetas de texto con enlace), homenajes, miniatura del mapa de Pat, sello de garantía, sección de equipo, miniaturas de proyectos en hubs y barra lateral, imágenes de las tarjetas del blog y figuras de las noticias (se quitan al renderizar; `newsData.json` no se toca). Se conservan el carrusel de trabajos 3D (`#prototipos-3d`), las páginas `/proyectos/<id>`, las de `/videos/`, logotipos y avatares.
- Páginas retiradas mientras esté activo (`RETIRED_SECTIONS`): «Proyectos a medida» (`custom`) y «Equipo» (`team`) en 11 idiomas y las 39 de `/galeria/<slug>`; no se generan, salen del sitemap y redirigen 301 a la portada de su idioma (`static/.htaccess`). `img/seo` ya no se genera (quitado de los hooks predev/prebuild).
- **Galería como página propia** (23/09/2026): sección `galeria` (es `/galeria`, en `/en/gallery`…; 11 idiomas) con `Galeria.svelte`, mismo esquema que Precios: hero, los 4 vídeos 3D de `galleryVideos` (enlazados a sus watch pages `/videos/<slug>`, JSON-LD CollectionPage + VideoObject) y, justo después, el formulario de contacto. El enlace «Galería» de todos los menús apunta ahí. Las fotos fijas siguen fuera mientras dure `HIDE_IMAGE_SECTIONS`; la antigua `custom` sigue retirada con 301.
- Todas las páginas de ciudad (68) llevan ya la URL ES hifenada `diseno-construccion-montaje-stands-<ciudad>` (`montaje-stands-<ciudad>` las de montaje) con 301 desde la antigua; frescura 2026-09-18 en todas.

## Expresiones de las páginas principales de ciudad (22/09/2026)

- Motivo: las principales no posicionaban «diseño de stands en X» ni «montaje de stands en X» (no aparecían literalmente), mientras la provisional sí posicionaba «constructor de stands en X».
- H1 y <title> de las 67 principales (todas salvo `montaje_badajoz`, landing de IFEBA): «Diseño y montaje de stands en X» (y equivalente por idioma: `CITY_H1` en `h2Seo.js`), compuestos con el nombre de la ciudad de `cityData`; el recinto entre paréntesis sale del título de `richSeoData`. Primer H2: `CITY_MAIN_H2` («Diseño de stands en X: del prototipo 3D al montaje…»). Frase de apertura tras el primer párrafo con las dos expresiones literales (`CITY_KW_LEAD`).
- Patrón de H2 en tres familias (`h2Seo.js`): diseño (`como`, `tipos` y apartados con «diseño/prototipo»), montaje (`doc`, `cuandoFeria`, `upcoming` y apartados con «logística/montaje/documentación/plazos»; en alemán «Messebau») y común «Stands para ferias en X» para el resto. El guardián `check_h2_pattern` lee los prefijos de `cityH2PrefixForms()`.
- Las provisionales enlazan a su principal con «diseño y montaje de stands en X» en el cuerpo (y con su propia expresión en el hero).

## Páginas principales y paralelas de constructor (estado a 17/09/2026)

- **23/09/2026: las 82 paralelas son indexables y están en el sitemap.** Las 58 aparcadas se reactivaron tras pasarlas a formato ligero (`scratchpad/lightall.mjs`): H2 inicial + su primer párrafo propio + apartado de ferias + CTA, sin los bloques compartidos (paso/tipos/porque ni el párrafo genérico de premontaje); queda 1 frase repetida en 2 páginas (Mérida/Almendralejo). Motivo: Search Console no podía indexarlas por el noindex. Lo que sigue es la historia previa.
- **Paralelas** (`src/lib/builderPages.js`, `constructor_stand_*`): solo 13 siguen indexadas (las anteriores al 15/09). Las 58 del lote del 15/09 y Mérida/Almendralejo están **aparcadas** (`indexable: false` → `noindex, follow`, fuera del sitemap) porque al día siguiente de publicarlas las principales de varias plazas perdieron posición. Reactivar de una en una y con texto propio, nunca por lotes. El guardián `check_noindex` solo tolera noindex en paralelas y comprueba que no figuren en el sitemap.
- **Jerarquía de las paralelas** (decisión del usuario, 19/09/2026; revierte la independencia del 17/09): migas visibles y BreadcrumbList siguen la jerarquía de la web principal —Inicio › Ciudad › [Feria] › Paralela— (`builderParents` en `Site.svelte`: `city`/`parent` de la entrada o, en las de feria, el pilar de `FAIR_CITY_PILLAR` + la ficha), y bajo la intro del hero cada paralela enlaza a su principal con su propia expresión objetivo como anchor («constructor de stands en X» → página de ciudad; «constructor de stands para F» → ficha de feria; `builderParentLink`). Si algún día se activa una 301 de emergencia principal→paralela, hay que quitar antes ese escalón para no crear un bucle.
- **Paralelas por feria** (precedente FIGAN; 19/09/2026: las 12 ferias de Zaragoza, hechas con `scratchpad/zgz/apply.mjs`): entrada en `builderPages.js` con `fair` (slug), `fairName`, `venue`; rutas es `constructor_stand_<f>` / en `stand_builder_<f>`; `SQ_REMOVED_SECTIONS`; `seoFreshness`; `builderSeoData` ES (objeto principal) y EN (`const EN`) con texto propio por feria (H2 «Constructor de stands para <F>: …» / «Stand builder for <F>: …», `<ol>` de pasos, `<ul>` de tipos, enlaces al resto del recinto y a la ficha) e indexables. La ficha de feria enlaza a su paralela por `builderPageForFair`.
- **Cambio leve de URL de una feria** (BIEMH 18/09; las 12 de Zaragoza 19/09, `stand-` → `stands-`, FIGAN → `stands-figan-feria-zaragoza`): sustituir el slug en `fairsData`, `fairDates`, `fairTags`, `fairAnchors`, `jaSlugs`, `builderPages`, `builderSeoData`, `fairSeoData`, `richSeoData`, `newsData` y `.htaccess`; añadir una 301 `^((?:en|de|pt|fr|it|nl|zh|hi|ko)/)?ferias/<viejo>/?$ → /$1ferias/<nuevo>` (y la variante `ja/展示会情報/`); comprobar en Supabase que ningún proyecto de cliente lleve el `fair_slug` antiguo; `fairFreshness` al día.
- **Cambio leve de URL como defensa ante denuncias** (precedente Bilbao 2026-08, Oporto 31/08; diez plazas más el 17/09: Lisboa, Logroño, Badajoz, Don Benito, Ciudad Real, Zaragoza, Irún, Vitoria, A Coruña, Bilbao): patrón `diseno-construccion-montaje-stands-<ciudad>`, solo la ruta ES, 301 directa en `static/.htaccess` (y actualizar los destinos de las 301 antiguas para no encadenar), sustituir la URL en `richSeoData`, `builderSeoData`, `newsData.json` y `autonomous_generator.cjs`, y fecha nueva en `seoFreshness`.
- **Sin imágenes de galería** (`NO_GALLERY_SECTIONS` en `siteData.js`): esas diez principales no muestran rejilla de galería, figuras de caso ni figuras/vídeo keyword de `img/seo`; el texto y la foto de portada se mantienen. San Sebastián (alta 17/09/2026) nace además sin portada (`CITIES_WITHOUT_COVER`).
- **Alta de una página principal de ciudad** (referencia: San Sebastián, 17/09/2026, hecha con `scratchpad/ss/apply.mjs`): rutas en los 11 idiomas y entrada en `cityData` (`siteData.js`); cuerpo SEO en 11 idiomas en `server/richSeoData.js` con la estructura exacta de Irún (11 H2: principal que case con `tituloPrincipal`, «Cómo trabajamos» con `<ol>`, sectores con `/actividad/` pero sin `/ferias/`, documentación técnica, «Ferias y sectores» con `/ferias/` + `/actividad/`, cobertura, Pat `#pat`, garantía, logística, «Por qué elegir» con `#prototipos-3d` y la pregunta de urgencia) y 8 FAQ; intros en `server/cityContent.js`; fecha en `seoFreshness.js`; región en `SECTION_REGION` de `Site.svelte` y `CitySidebar.svelte`; `CITY_FLAG_FALLBACK` en `cityFlags.js` si ninguna feria lleva `city` con ese nombre; enlace recíproco desde las ciudades vecinas. Para que una plaza liste las ferias de un municipio vecino sin quitárselas a su pilar: `EXTRA_FAIR_CITIES` en `Site.svelte` (San Sebastián muestra las de Irún/Ficoba). La rejilla de portadas de la home (`cityKeys`) solo admite ciudades con foto de portada.

## Decisiones pendientes (no ejecutar sin confirmar)

1. Eliminar del repo el espejo estático antiguo de la raíz (~1.400 ficheros) y definir un flujo local mejor para PHP.
2. Unificar la doble copia de PHP raíz/static para editar una sola vez.
3. Rotar en OVH las contraseñas de buzón y FTP (ver Secretos).
