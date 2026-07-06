# Plan «Oro» — modelo SEO para ciudades‑matriz

Modelo de posicionamiento para **ciudades principales / disputadas** (Badajoz, Lisboa,
Madrid, Barcelona, Bilbao…). Convive con el **modelo Absolutista**, que se aplica a
*terminales de feria* (páginas de feria concretas). El Oro se aplica **solo a
ciudades‑matriz** porque exige mucho más contenido y enlazado.

> Cuando el usuario diga **«aplica el plan oro a {ciudad}»**, se ejecuta este modelo
> sobre la entrada de esa ciudad en `src/lib/server/richSeoData.js`.

## Origen

Copia el patrón de una landing competitiva que rankea en plaza disputada
(PAC Publicidad, «Diseño y Construcción de Stands en Bilbao») y lo **supera** añadiendo
las herramientas propias de Standarte. El sitio de la competencia bloquea el fetch
directo; el patrón se reconstruyó vía búsqueda web.

### Patrón del competidor (lo que copiamos)

1. **Keyword exacta ciudad + «construcción de stands»** en title, H1 y a lo largo del texto.
2. **Servicio integral / único proveedor sin subcontratar**: diseño, fabricación en taller
   propio, transporte, montaje y desmontaje.
3. **Proceso paso a paso** (briefing → diseño → 3D de validación → fabricación → montaje → desmontaje).
4. **Tipos de stand** (modular, a medida, doble altura, isla, córner…).
5. **Servicios añadidos** (iluminación, pantallas, audiovisuales).
6. **Cobertura geográfica** (ciudad, provincia y toda España).
7. **Prueba social** (grandes marcas y pymes; años de experiencia).
8. **FAQ** con preguntas comerciales reales (¿lo hacéis vosotros?, plazos, precios).
9. **CTA** claro y repetido.

### Lo que añadimos para SUPERARLO (diferenciales Standarte)

- **Mayor cobertura peninsular**: España **y Portugal**, capitales + nichos regionales,
  con el *mismo constructor* y las mismas cotas de calidad → **malla de enlaces interna**
  única (ferias por actividad `/actividad/<tag>`, otras ciudades, ferias concretas).
- **Pat, asesor ferial gratuito**: recomienda ferias por sector y prepara la solicitud.
- **Sistema de Proyecto Auditado (garantía 100%)**: expediente verificable y archivable;
  se construye exactamente lo aprobado.
- **Cálculo instantáneo de precio según m²** + **prototipo 3D en 72 h** + presupuesto en 24 h.
- **+136 proyectos 3D** de portfolio y valoración 4,9/5 como prueba social real.

## Estructura on‑page del modelo Oro

Todo se implementa en la entrada de la ciudad en `richSeoData.js` (campos `title`, `h1`,
`introText`, `body` en HTML, `faqs`). **No se cambia el slug/URL** de la ciudad (para no
perder el histórico); solo el contenido.

- **title**: `Diseño y construcción de stands en {Ciudad} ({recinto}) | Standarte`
- **h1**: `Diseño y construcción de stands en {Ciudad}`
- **introText** (≈180 c., sirve de meta description): propuesta de valor + 3 diferenciales
  (proveedor único / cobertura ES+PT / garantía auditada) + recinto local.
- **body** — 9 secciones `<h2>` (keyword + ciudad en varios H2), con enlaces internos:
  1. *Un solo proveedor: diseño, fabricación y montaje sin subcontratar* (integral + 20 años + taller propio).
  2. *Cómo trabajamos, paso a paso* (`<ol>` de 6 pasos; incluye **prototipo 3D 72 h** y **Proyecto Auditado**).
  3. *Tipos de stand que construimos en {Ciudad}* (`<ul>`) + **cálculo instantáneo por m²** → `/precios`.
  4. *Ferias y sectores en {Ciudad} y {Región}* → enlaces a **ferias** `/ferias/<slug>` y **hubs** `/actividad/<tag>`.
  4bis. *(Extensión, plazas de máxima competencia)* **Documentación técnica del recinto**
     → especificaciones reales del recinto (pabellones, m², alturas útiles, instalaciones)
     + gestión de acometidas, CAE y certificados de reacción al fuego. Sube la
     especialización y el E‑E‑A‑T. Usar datos verificables (buscar el recinto oficial).
  5. *La mayor cobertura de la Península: {Ciudad}, España y Portugal* → otras ciudades + Portugal.
  6. *Pat, tu asesor ferial gratuito* → inicio `/`.
  7. *Garantía 100 %: Sistema de Proyecto Auditado* → `/proyecto-auditado`.
  8. *Logística de proximidad y costes optimizados* → páginas de montaje `/montaje_stand_*`.
  9. *Por qué elegir a Standarte en {Ciudad}* (síntesis + prueba social + CTA doble: presupuesto 24 h / Pat).
- **faqs** — 6 preguntas competitivas: ¿lo hacéis vosotros o subcontratáis? · ¿cuánto cuesta
  (m²)? · ¿con cuánta antelación? · ¿montáis también en Portugal? · ¿qué garantía? · ¿en qué recintos?

## Reglas

- Densidad de keyword natural: «diseño y construcción de stands en {Ciudad}», «stands para
  ferias en {Ciudad/Región}», nombres de recintos y ferias reales.
- **Enlazado interno agresivo** (el diferencial de malla): cada sección enlaza a hubs de
  actividad, ferias, otras ciudades, `/precios`, `/proyecto-auditado`.
- Solo URLs que existen (el `check_broken_links` del build las valida).
- **Idiomas**: se escribe el **maestro ES** (mercado objetivo de la plaza) y luego se
  traduce a los otros 10 idiomas con subagentes, insertando en `richSeoData.js`. Para una
  *primera prueba* puede aplicarse solo a ES y propagar tras validar el modelo.

## Historial de aplicación

- **Badajoz** (ES) — primera aplicación (prueba). Objetivo: acaparar el SEO de la ciudad.
- **Zaragoza** (ES) — Feria de Zaragoza (FIMA, SMOPYC, Enomaq, Tecnovid, Oleomaq, Figan,
  Salón de los Vinos de Aragón).
- **Lisboa** (ES + PT) — plaza portuguesa de máxima competencia. Aplicado en los dos
  idiomas relevantes (PT para el SERP local, ES para el canónico/expositor español) e
  incorpora la **sección de documentación técnica del recinto FIL** (Feira Internacional
  de Lisboa: 4 pabellones, ~10.368 m², alturas 12–15 m, instalaciones y certificados).
- **Don Benito** (ES) — página de *montaje* (`montaje_don_benito`), recinto **FEVAL**
  (Agroexpo). Oro con sección técnica de FEVAL (22.000 m² cubiertos, 20.000 m² exterior,
  edificio multifuncional de 10.000 m²) y keyword "montaje" conservada. URL sin cambios.
