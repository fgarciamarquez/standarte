# Alta de ferias — procedimiento SEO «Absolutista»

Guía para dar de alta una feria nueva con **tratamiento completo**: ficha en 11 idiomas, fechas, etiquetas, enlace desde la página matriz de su ciudad y señales de frescura. La sigue tanto una persona como la Routine automática que amplía la red de ferias en Madrid, Lisboa y el norte de Portugal.

Regla de oro: **pocas ferias por vez y cada una de verdad**. Máximo 1 o 2 por plaza en cada tanda, para que la indexación crezca de forma gradual y cada URL nueva llegue con contenido propio, no de plantilla.

## 0. Antes de empezar

1. Comprueba que la feria **no existe** ya: busca por nombre (y sinónimos, siglas, nombre en portugués/inglés) y por slug en `src/lib/fairsData.js`.
2. Verifica los datos en la **web oficial** del organizador o del recinto (IFEMA, FIL/AIP Lisboa, Exponor, Altice Forum Braga, Exposalão Batalha…). Nunca inventes fechas: si la próxima edición no está publicada, se usa la última confirmada y se anota «por confirmar» en el comentario. Guarda la URL de la fuente.
3. Prioriza ferias **profesionales con expositores que contratan stands** (industria, tecnología, construcción, alimentación, salud, turismo, moda, energía). Descarta eventos sin zona expositiva.

## 1. Ficheros que se tocan (y nada más)

| Fichero | Qué se añade |
|---|---|
| `src/lib/fairsData.js` | Entrada `{ name, country, slug, city, sector }` |
| `src/lib/fairDates.js` | `'slug': { start, end, cadence, source }` |
| `src/lib/fairTags.js` | `"slug": ["actividad", …]` en `fairActivities` |
| `src/lib/server/fairSeoData.js` | Texto único en 11 idiomas en `fairSeoData` y FAQ es/pt/en en `fairFaqExtra` |
| `src/lib/server/richSeoData.js` | Enlace a la feria en el párrafo «Ferias y sectores» de su ciudad, en los 11 idiomas |
| `src/lib/seoFreshness.js` | Fecha de hoy en `fairFreshness['slug']` y en `seoFreshness.<ciudad>` |

El sitemap, el hreflang, el buscador de ferias de la portada y los hubs de actividad se generan solos a partir de estos ficheros. No hay que tocar rutas ni componentes.

### 1.1 `fairsData.js`

```js
{
  "name": "SICAB",                    // nombre oficial corto, tal como lo escribe el organizador
  "country": "es",                    // es | pt | fr | ma | …
  "slug": "stands-sicab-sevilla",     // ver política de slugs
  "city": "Sevilla",                  // exactamente como el resto de fichas de esa ciudad
  "sector": "Agroalimentario y Naturaleza"
}
```

- **Slug**: siempre en plural, `stands-<nombre>-<ciudad>` (minúsculas, sin acentos, guiones). El plural evita coincidir literalmente con la marca registrada de la feria (política anti-denuncia). El guardián `check_fair_slugs` solo admite `stand-`/`stands-`.
- **city**: usa el mismo literal que las fichas existentes de esa plaza: `Madrid`, `Lisboa`, `Oporto`, `Batalha`, `Braga`… (una ciudad nueva necesitaría su página matriz; no la crea este procedimiento).
- **sector**: uno de los sectores ya usados (los más comunes: `Agroalimentario y Naturaleza`, `Industria y Logística`, `Multisectorial y Profesional`, `Enología y Vinos`, `Aeronáutica y Transporte`, `Turismo y Hostelería`, `Tecnología e Innovación`, `Comercio y Packaging`, `Salud y Medicina`, `Arte y Ocio`, `Construcción e Infraestructuras`, `Belleza y Estética`). No inventes sectores nuevos.
- Colócala junto a las demás fichas de su ciudad.

### 1.2 `fairDates.js`

```js
'stands-sicab-sevilla': { start: '2026-11-17', end: '2026-11-22', cadence: 'annual', source: 'https://fibes.es/evento/sicab-2026/' },
```

`cadence` es `annual` o `biennial`. Una edición ya celebrada no rompe el build (el guardián solo avisa) y el sitio no la muestra, pero deja el comentario «por confirmar» encima.

### 1.3 `fairTags.js`

```js
"stands-sicab-sevilla": ["ganaderia"],
```

Solo etiquetas definidas en `fairTags` (por ejemplo `alimentacion, ganaderia, agricultura-maquinaria, maquinaria-industrial, metal-subcontratacion, logistica, energia, dental, farmacia, veterinaria, congreso-medico, digital-software, audiovisual, packaging, seguridad, moda-textil, regalo-decoracion, construccion, turismo, gastronomia-hosteleria, automocion, nautica, aeronautica, transporte, movilidad, vino, cultura-arte, belleza-peluqueria, multisectorial, congreso-profesional`; la lista completa está en el fichero). Una o dos por feria, las que de verdad describen a sus expositores.

### 1.4 `fairSeoData.js` — el texto que hace única a la ficha

Entrada en `fairSeoData` con las **11 lenguas**: `es, pt, en, de, fr, it, nl, zh, hi, ko, ja`. Cada una son **dos párrafos `<p>`**:

1. **Qué es la feria**: organizador, recinto, trayectoria, sectores, perfil de expositor y visitante. Datos estables y verificables; nada de fechas, ediciones numeradas ni cifras que caduquen.
2. **Qué stand pide esa feria**: el ángulo constructivo concreto de ese sector (producto a la altura de la mano, luz fiel al color, carga pesada en suelo, zona de reunión cerrada, demostración en vivo, almacén, reutilización edición tras edición…) y cómo lo resolvemos desde nuestro taller.

Entrada en `fairFaqExtra` con **es, pt, en**: dos pares `[pregunta, respuesta]` propios de esa feria (una sobre el tipo de stand que pide, otra sobre plazos, logística del recinto o reutilización). Las preguntas deben variar de una feria a otra.

### 1.5 `richSeoData.js` — el camino desde la página matriz

La página de la ciudad (`richSeoData.<ciudad>`) tiene, en cada idioma, un párrafo bajo el H2 «Ferias y sectores en …» donde **cada feria cubierta enlaza a su ficha**. Añade la nueva en los 11 idiomas con la forma:

```html
<a href="/ferias/stands-sicab-sevilla">SICAB</a>
```

Prefijo por idioma: `/ferias/` (es), `/en/ferias/`, `/pt/ferias/`, `/de/ferias/`, `/fr/ferias/`, `/it/ferias/`, `/nl/ferias/`, `/zh/ferias/`, `/hi/ferias/`, `/ko/ferias/`, `/ja/ferias/`. Cuando encaje, acompaña el nombre con una aposición breve y el enlace a su actividad (`/actividad/<etiqueta>`), como hacen las frases ya existentes. Respeta la puntuación de cada lengua: en zh la enumeración usa `、` y el punto es `。`; en ja el punto es `。`; en hi el punto es `।`.

Estructura del fichero: `richSeoData.<ciudad>.es.body`, `.en.body`, `.pt.body`… (todas las lenguas al mismo nivel dentro de la ciudad). Las claves de ciudad son `madrid`, `lisboa`, `oporto`, `batalha`… Localiza el párrafo con `grep -n 'Ferias y sectores en Lisboa' src/lib/server/richSeoData.js` y sus equivalentes en cada idioma.

### 1.6 `seoFreshness.js` — señales de frescura (obligatorio)

Sin esto los buscadores no ven motivo para volver a rastrear la página matriz ni encuentran la URL nueva a tiempo.

- `fairFreshness['stands-sicab-sevilla'] = 'AAAA-MM-DD'` (fecha de hoy).
- `seoFreshness.<ciudad> = 'AAAA-MM-DD'` (fecha de hoy) con un comentario corto: `// alta de SICAB`.
- Si la feria también se ha enlazado desde una página de constructor (`constructor_stand_<ciudad>`), actualiza también esa clave.

## 2. Cómo escribir los textos

El objetivo es que los textos **parezcan escritos por una persona del oficio**, no generados. Un lector que compare dos fichas no debe reconocer una plantilla.

- Empieza por el dato, no por la fórmula. Prohibido abrir con «X es una feria líder…», «un evento imprescindible…», «en el corazón de…».
- Cada feria tiene un rasgo propio (el tipo de visitante, un pabellón concreto, una norma del recinto, un producto que se prueba in situ): apóyate en él. Si no lo has encontrado en la fuente, sigue buscando antes de escribir.
- Frases de longitud variada, alguna corta. Una idea por frase. Sin adjetivos huecos («único», «inigualable», «excepcional»), sin listas de tres adjetivos, sin exclamaciones.
- Cero cifras que caduquen (fechas, número de edición, expositores exactos de un año). Trayectoria en términos estables («más de treinta ediciones», «cada año»).
- Traduce **pensando en cada lengua**, no palabra por palabra: en de/fr/it/nl/pt reescribe con la sintaxis natural del idioma; en zh/ja/ko/hi usa los nombres de recinto y ciudad como los escribe la prensa local del idioma. Mantén el nombre oficial de la feria sin traducir.
- Las FAQ responden como respondería un jefe de producción por teléfono: concreto, con plazos y materiales, sin venderse de más.
- Lee la ficha de una feria vecina ya publicada para **no repetir sus giros**. Si dos fichas de la misma ciudad comparten una frase, reescribe una.

## 3. Comprobación, publicación y despliegue

1. `npm install` (una vez) y `npm run build`. El postbuild ejecuta los guardianes; deben salir **todos en ✔** (`check-fair-search`, `check-fair-slugs`, `check-fair-tags`, `check-h2`, `check-htaccess`, `check-fair-dates` sin errores…). Un ✘ se corrige antes de seguir.
2. Revisa en `dist/ferias/<slug>.html` y `dist/en/ferias/<slug>.html` que la ficha se ha generado con el texto propio, y en `dist/<ciudad>.html` que el enlace nuevo aparece.
3. Commit en `main` con mensaje `seo(<ciudad>): alta de <Feria> …` explicando fuente y fechas. Antes de empujar, `git fetch origin main && git rebase origin/main` (el bot de noticias commitea a diario a las 08:00 UTC). `git push origin HEAD:main`.
4. Despliegue: workflow **`deploy.yml`** («Despliegue Manual a OVH») en `main` con el input `fast` = `true`. Espera a que termine en verde (suele tardar entre 15 y 30 minutos, casi todo en el paso FTP). Si no se puede lanzar el workflow desde la sesión, díselo al usuario: el push por sí solo **no** publica.
5. Informe final en español: ferias dadas de alta con su URL (`https://standarte.es/ferias/<slug>`), fuente de las fechas, ciudad enlazada, y recordatorio de pedir la indexación en Search Console para las URL nuevas.

## 4. Lo que este procedimiento NO hace

- No crea ciudades ni páginas de constructor nuevas (eso es el plan Oro, `docs/plan_oro.md`).
- No toca PHP, noticias ni el gestor de proyectos.
- No borra ni renombra ferias existentes: un slug publicado es una URL indexada.
