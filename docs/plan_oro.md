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

## Frescura (dateModified / lastmod)

Cada página Oro emite una señal de frescura **honesta** para los motores: la fecha de
la última edición REAL de su contenido, no la del build.

- La fecha vive en `src/lib/seoFreshness.js` (`{ sección: 'YYYY-MM-DD' }`).
- Se emite como `dateModified` en el JSON-LD `WebPage` (Site.svelte) y como `<lastmod>`
  real en el sitemap.
- **Al reescribir el contenido de una ciudad, actualiza su fecha en `seoFreshness.js`.**
  No usar la fecha del build (un lastmod que cambia sin cambiar el contenido resta
  confianza ante Google).

## Reglas

- Densidad de keyword natural: «diseño y construcción de stands en {Ciudad}», «stands para
  ferias en {Ciudad/Región}», nombres de recintos y ferias reales.
- **Enlazado interno agresivo** (el diferencial de malla): cada sección enlaza a hubs de
  actividad, ferias, otras ciudades, `/precios`, `/proyecto-auditado`.
- Solo URLs que existen (el `check_broken_links` del build las valida).
- **Idiomas**: se escribe el **maestro ES** (mercado objetivo de la plaza) y luego se
  traduce a los otros 10 idiomas con subagentes, insertando en `richSeoData.js`. Para una
  *primera prueba* puede aplicarse solo a ES y propagar tras validar el modelo.

## Ciudades creadas desde cero (routes + cityData + richSeoData, 11 idiomas)

- **Alicante** (IFA, Elche) y **Murcia** (IFEPA, Torre Pacheco) — creadas primero como
  Absolutistas y luego **subidas a Oro** (ES + EN). Sus ferias (Futurmoda, Firauto, Alicante
  Gastronómica; FAME Innowa, EQUIMUR, HortiFruit, FECONS) están dadas de alta con página
  propia y contenido SEO único, enlazadas en cuerpo y en la nube del sidebar.

## Historial de aplicación

- **Badajoz** (ES) — primera aplicación (prueba). Objetivo: acaparar el SEO de la ciudad.
- **Zaragoza** (ES) — Feria de Zaragoza (FIMA, SMOPYC, Enomaq, Tecnovid, Oleomaq, Figan,
  Salón de los Vinos de Aragón).
- **Lisboa** (ES + PT + EN) — plaza portuguesa de máxima competencia. Aplicado en los
  idiomas relevantes (PT para el SERP local, ES para el canónico/expositor español, EN
  internacional) e incorpora la **sección de documentación técnica del recinto FIL**
  (Feira Internacional de Lisboa: 4 pabellones, ~10.368 m², alturas 12–15 m,
  instalaciones y certificados).
- **Don Benito** (ES) — página de *montaje* (`montaje_don_benito`), recinto **FEVAL**
  (Agroexpo). Oro con sección técnica de FEVAL (22.000 m² cubiertos, 20.000 m² exterior,
  edificio multifuncional de 10.000 m²) y keyword "montaje" conservada. URL sin cambios.
- **Ciudad Real** (ES) — Pabellón Ferial (IFEDI), eje **FENAVIN** (Feria Nacional del
  Vino) y el clúster del vino de La Mancha; ferias FERCAM, FERCATUR, FERDUQUE.
- **Zafra** (ES) — página de *montaje* (`montaje_zafra`), eje **Feria Internacional
  Ganadera de Zafra (FIG)** (ganadería + maquinaria). Oro con sección técnica del recinto
  (Pabellones A/B, Institucional, Carpas 1/2, exterior de maquinaria); keyword "montaje".
- **Oporto / Porto** (ES + PT + EN) — plaza portuguesa muy disputada con rivales locales fuertes.
  Recinto **Exponor** (Matosinhos/Leça da Palmeira): 6 pabellones, ~45.000 m² cubiertos de
  ~180.000 m² totales, auditorio para 945, business center de 8 salas, 2.500 plazas de
  parking, a 10 min del centro y del aeropuerto. Sección técnica del recinto incluida. Las
  16 ferias de Porto/Braga en nuestro mapa (Concreta, EMAF, Expomecânica, Expocosmética,
  Empack, ITF, Portojóia, Decor Hotel, Expocarne, CIOCV Braga, RE+, Elétrica, EnerH2O,
  Essência do Vinho, Simplesmente Vinho, Portugal Smart Cities) enlazadas a sus páginas —
  prueba de cobertura real que ningún competidor local puede demostrar. URL sin cambios.
- **Mallorca** (ES + EN) — capital náutica del Mediterráneo. Doble escenario: **Palau de
  Congressos de Palma** (2.340 m² de exposición: planta baja 1.640 m² a 11 m + entreplanta
  700 m², 2 auditorios 1.966/471, 22 salas) y **Palma International Boat Show** al aire libre
  en el Moll Vell del Port de Palma + Marina Port de Mallorca (>300 expositores, 600 barcos).
  Oro con énfasis náutico/superyate y en la **logística insular** como diferencial. Las 4
  ferias enlazadas: Palma Boat Show, Superyacht Village (náutica), Baleart (cultura/artesanía),
  Dijous Bo (multisectorial). Cobertura a Valencia y Barcelona (puertos de conexión), Madrid,
  Lisboa y Oporto. URL sin cambios.
- **Valencia** (ES + EN) — recinto **Feria Valencia** (Benimámet): 10 pabellones, +110.000 m²
  de exposición en sus grandes citas. 10 ferias enlazadas (Cevisama, Hábitat, Textilhogar,
  Espacio Cocina SICI, Eurobrico, Fimma-Maderalia, Iberflora, Gastrónoma, Beauty Forum,
  Solar & Storage Live). Cobertura a Barcelona, Madrid, Alicante, Murcia, Mallorca, Lisboa, Oporto.
- **A Coruña** (ES) — recinto **ExpoCoruña** (18.000 m² cubiertos + 8.000 exteriores). Ferias:
  Fórum Gastronómico, Mundos Digitales, BioCultura. Cobertura gallega (Santiago, Vigo) + Madrid/Bilbao.
- **Santiago de Compostela** (ES) — **Palacio de Congresos y Exposiciones de Galicia** (auditorio
  2.100, 22 salas). Ferias/congresos: Fairway, Maker Faire Galicia, GEDET, SEMERGEN, SESMI.
- **Valladolid** (ES) — **Feria de Valladolid** (4 pabellones, auditorio 600, Centro de Congresos).
  Ferias: AGRARIA, AGROVID, aviFORUM, FIMASCOTA, Salón del Gas Renovable.
- **Salamanca** (ES) — **Recinto Ferial de Salamanca** (La Salina/Diputación, +40.000 m²).
  Ejes: SALAMAQ (agropecuaria), Salón del Automóvil, Congreso de Alineadores.
- **Batalha** (ES + PT + EN) — **Exposalão** (120.000 m², 3 pabellones, entre Lisboa y Oporto).
  Ferias: Moldplas, Expometal, Stone Ibérica, Vidrotec, Decorhotel. Cobertura Lisboa/Oporto/Madrid.
- **Alicante** (ES + EN) — **IFA – Fira Alacant** (Elche, +20 ferias, 300.000 visitantes/año).
  Ferias: Futurmoda, Firauto, Alicante Gastronómica. Cobertura Valencia/Murcia/Madrid/Barcelona.
- **Murcia** (ES + EN) — **IFEPA** (Torre Pacheco, fundada 1984). Ferias: FAME Innowa, EQUIMUR,
  HortiFruit, FECONS. Cobertura Alicante/Valencia/Madrid/Barcelona.
- **Barcelona** (ES + EN) — una de las grandes capitales feriales del mundo. Recinto **Fira
  de Barcelona** (Gran Via + Montjuïc): 400.000 m² totales; Gran Via (L'Hospitalet), obra de
  Toyo Ito, 240.000 m² brutos en 8 pabellones interconectados, Eje Central elevado de 1 km,
  2 helipuertos, ~5.000 plazas de parking, cubierta fotovoltaica (+60.000 m² en 2026);
  Montjuïc para formatos urbanos. Sección técnica del recinto incluida. Las 13 ferias de
  Fira enlazadas por sector: MWC, ISE, Smart City Expo, IoT Solutions (tech/AV/smart);
  Expoquimia, Hispack, Equiplast (packaging); Alimentaria, Hostelco, Barcelona Wine Week
  (alimentación/vino); Construmat, Cosmobeauty, Fórum Dental Mediterráneo. Cobertura ibérica
  a Madrid, Valencia, Zaragoza, Bilbao, Lisboa y Oporto. URL sin cambios.
- **Sevilla** (ES + EN) — gran capital ferial y de congresos del sur. Recinto **FIBES
  (Palacio de Exposiciones y Congresos de Sevilla)**: FIBES I (3 pabellones diáfanos de
  7.200 m² sin pilares, arquetas cada 8 m + cúpula) y FIBES II (Palacio de Congresos 2012,
  mayor auditorio de España, 3.200 plazas). >40.000 m² de exposición, 5 auditorios, 71
  salas. Sección técnica del recinto incluida. Las 3 ferias de FIBES enlazadas: TIS
  (Tourism Innovation Summit, tecnología/turismo), Auténtica (alimentación premium), Fireca
  (multisectorial). Cobertura andaluza cruzada con Málaga (FYCMA) + Madrid, Barcelona,
  Valencia, Lisboa y Oporto. URL sin cambios.
- **Málaga** (ES + EN) — capital tecnológica del sur. Recinto **FYCMA (Palacio de Ferias y
  Congresos de Málaga)**, obra de Ángel Asenjo (2003): ~60.000 m² totales, 19.500 m² de
  exposición en 2 pabellones, 2 auditorios, 15 salas multiusos, 1.200 plazas de parking,
  >20.000 visitantes. Sección técnica del recinto incluida. Las 8 ferias de FYCMA enlazadas
  por sector (DES, Greencities + Foro, H&T, SIMED, Expo AgriTech, San Diego Comic-Con Málaga,
  Cadena Multisectorial) más las 3 de Sevilla (TIS, Auténtica, Fireca) enlazadas a la página
  de Sevilla. Cobertura ibérica a Madrid, Barcelona, Valencia, Lisboa y Oporto. URL sin cambios.
- **Bilbao** (ES + EN) — gran capital industrial del norte. Recinto **BEC (Bilbao Exhibition
  Centre)** en Ansio (Barakaldo), conectado por metro: 150.000 m² de exposición en 6
  pabellones diáfanos sin columnas (4×15.000 + 2×21.000 m²), inaugurado en 2004, con la
  Bizkaia Arena (mayor sala polivalente de España, 26.000 personas). Sección técnica del
  recinto incluida, con énfasis industrial (maquinaria pesada, suelos reforzados, CAE/PRL,
  importación temporal de maquinaria). Las 8 ferias del BEC enlazadas por sector: BIEMH,
  Pumps & Valves, Maintenance (maquinaria industrial); Subcontratación, Addit3D (metal);
  BeDigital (digital); World Maritime Week, Marine Energy Week (naval/energía). Cobertura
  ibérica a Madrid, Barcelona, Zaragoza, Vigo, Lisboa y Oporto. URL sin cambios.
- **Madrid** (ES + EN) — la plaza más competida y el mayor polo ferial de España. Recinto
  **IFEMA (Feria de Madrid)** (Campo de las Naciones, junto a Barajas): 12 pabellones,
  >200.000 m² cubiertos, pabellones 6/8/10 hasta 15 m de altura libre (dobles alturas y
  suspensiones), 3 centros de convenciones, 14.000 plazas de parking, >60 ferias y 3M
  visitantes/año. Sección técnica del recinto incluida. Las 27 ferias del clúster de Madrid
  (FITUR, Fruit Attraction, Salón Gourmets, MOMAD, Intergift, Madridjoya, Bisutex, Salón
  Look, Expodental, Expoóptica, OPTOM, Farmaforum, Expomedes, Veteco, Rebuild, The District,
  Piscimad, Smart Doors, Madrid Tech Show, Trafic, Global Mobility Call, Genera, Empack,
  Iberpet, Expofranquicia, ARCO, Madrid Fusión) enlazadas a sus páginas y hubs por sector.
  Cobertura ibérica a Barcelona, Valencia, Bilbao, Sevilla, Lisboa y Oporto. URL sin cambios.
- **Portugal Sur** (ES + PT + EN) — página *regional* (Alentejo + Algarve), sin ciudad ni
  recinto único: Oro adaptado a región. Recinto de referencia **Parque de Feiras e
  Exposições de Beja «Manuel de Castro e Brito»** (~10 ha, sede de OVIBEJA y VINIPAX);
  en el Algarve, FATACIL (Lagoa). Solo 2 ferias con página propia en el mapa —OVIBEJA
  (alimentación) y VINIPAX (vino), ambas en Beja— enlazadas a sus páginas y hubs; el resto
  (FATACIL, FACECO, São Martinho, Feira d'Aires) se menciona sin enlace por no tener página.
  Cobertura ibérica enlazada a Lisboa, Oporto, Madrid y Barcelona. URL sin cambios.
- **Vigo** (ES) — polo industrial atlántico. Recinto **IFEVI** (Cotogrande, a 100 m del
  aeropuerto de Vigo-Peinador): ~116.000 m² totales, 3 pabellones de 8.000/10.000/12.000 m²
  (~30.000 m² de exposición), salas de 100–160 m², ~100 eventos y 1M visitantes/año. Sección
  técnica del recinto incluida. Ejes Navalia (naval), Conxemar (pesca/mar) y Nortrans
  (transporte). Cobertura gallega enlazada: las 11 ferias de Vigo + Santiago (Fairway, Maker
  Faire, GEDET, SEMERGEN, SESMI) + A Coruña (Fórum Gastronómico, Mundos Digitales, BioCultura)
  a sus páginas y hubs. URL sin cambios.
