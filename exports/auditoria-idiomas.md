# Informe de Auditoría de Idiomas y Localización SEO B2B

Este informe audita exhaustivamente el estado de las traducciones y la coherencia de metadatos SEO en todo el sitio web de **Standarte**, cubriendo los 9 idiomas activos: Español (base), Inglés (`en`), Alemán (`de`), Chino (`zh`), Hindi (`hi`), Portugués (`pt`), Francés (`fr`), Italiano (`it`) y Coreano (`ko`).

---

## 1. Resumen Ejecutivo

- **Total de combinaciones de páginas multilingües auditadas**: 264
- **Páginas correctamente traducidas (✅ OK)**: 214
- **Páginas con traducción mixta (⚠️ MIXTO)**: 15
- **Páginas sin traducir / solo maquetación (❌ SOLO-NAVEGACIÓN)**: 25
- **Páginas no creadas (❌ NO EXISTE)**: 10

### Resumen por Idioma (Páginas correctamente traducidas)
- **ES**: 0 / 0 páginas correctamente localizadas
- **EN**: 27 / 33 páginas correctamente localizadas
- **DE**: 27 / 33 páginas correctamente localizadas
- **ZH**: 23 / 33 páginas correctamente localizadas
- **HI**: 26 / 33 páginas correctamente localizadas
- **PT**: 26 / 33 páginas correctamente localizadas
- **FR**: 27 / 33 páginas correctamente localizadas
- **IT**: 27 / 33 páginas correctamente localizadas
- **KO**: 31 / 33 páginas correctamente localizadas

### Páginas Urgentes de Corregir (SOLO-NAVEGACIÓN / NO EXISTE)
Estas páginas presentan problemas donde el contenido principal está ausente o sigue en español, lo cual perjudica seriamente el posicionamiento orgánico en motores de búsqueda:
- [EN] `/en/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [DE] `/de/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [ZH] `/zh/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [HI] `/hi/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [PT] `/pt/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [PT] `/pt/contacto` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [FR] `/fr/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [IT] `/it/luzpavilion` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [ZH] `/ferias/[dynamic] (ZH)` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [HI] `/ferias/[dynamic] (HI)` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [KO] `/ferias/[dynamic] (KO)` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [ZH] `/noticias/innovacion-arquitectura-atencion-madrid-2026-zh-2026-06-04` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [HI] `/noticias/innovacion-arquitectura-atencion-madrid-2026-hi-2026-06-04` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [ZH] `/noticias/innovacion-arquitectura-atencion-madrid-2026-zh-2026-06-01` (Estado: **❌ SOLO-NAVEGACIÓN**)
- [HI] `/noticias/innovacion-arquitectura-atencion-madrid-2026-hi-2026-06-01` (Estado: **❌ SOLO-NAVEGACIÓN**)

---

## 2. Incoherencias Críticas Detectadas

### 2.1 og:locale:alternate Errónes
En todas las páginas del sitio que heredan el comportamiento de `Site.svelte`, la etiqueta `og:locale:alternate` realiza un bucle por todos los idiomas definidos, inyectando locales no relacionados. Por ejemplo, en una página en Portugués (`pt`), se añade:
```html
<meta property="og:locale:alternate" content="ko_KR" />
<meta property="og:locale:alternate" content="hi_IN" />
```
Esto confunde a los rastreadores sobre la orientación geográfica. Debería limitarse al idioma español (`es_ES`) y a idiomas extremadamente vinculados, o eliminarse de locales no latinos.

### 2.2 Metadatos Faltantes en Proyectos
En la plantilla de detalles de proyecto (`src/routes/proyectos/[id]/+page.svelte`), la variable reactiva `seoDescriptions` carece de traducciones para las propiedades de **Francés (`fr`)**, **Italiano (`it`)** y **Coreano (`ko`)**. Si el usuario accede en estos idiomas, la descripción del meta tag queda vacía o indefinida:
```javascript
// seoDescriptions solo define es, en, de, pt, zh, hi
// Falta fr, it, ko
```

### 2.3 Faltas de hreflang y OpenGraph en Ferias y Noticias
- **Páginas de Ferias (`Feria.svelte`)**: No inyectan ninguna etiqueta `hreflang` alternate ni tampoco etiquetas OpenGraph de locales (`og:locale`), limitando severamente la capacidad de Google para posicionar cada feria local en su mercado correspondiente.
- **Detalle de Noticias (`noticias/[slug]/+page.svelte`)**: Al igual que ferias, carece de `hreflang` y de las etiquetas OpenGraph locales alternativos.

---

## 3. Priorización para Corrección SEO

1. **Alta Prioridad (Impacto Alto - Esfuerzo Bajo/Medio)**:
   - Añadir los `hreflang` y `og:locale` faltantes en el componente `Feria.svelte` y la ruta de noticias.
   - Corregir el bucle de `og:locale:alternate` en `Site.svelte` para que en páginas traducidas solo declare `es_ES` como alterno (y viceversa).
   - Inyectar las traducciones de `fr`, `it` y `ko` en la variable `seoDescriptions` de `proyectos/[id]/+page.svelte`.
2. **Prioridad Media (Contenido Mixto o Parcial)**:
   - Revisar páginas de ciudad secundarias que presenten estado `⚠️ MIXTO` o `❌ SOLO-NAVEGACIÓN`.
3. **Baja Prioridad**:
   - Corrección de traducciones de ferias de menor volumen de tráfico en idiomas no prioritarios (ej: `hi` o `ko`).

---

## 4. Tabla de Auditoría Detallada

| Página | Idioma | Title | Meta desc | H1 | Cuerpo | og:locale | og:alternate | Estado global |
|--------|--------|-------|-----------|----|----|-----------|--------------|---------------|
| `/en/` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/services` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/luzpavilion` | EN | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/en/custom_projects` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/team` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/contact` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/news` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/dienstleistungen` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/luzpavilion` | DE | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/de/massgeschneiderte_projekte` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/team` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/kontakt` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/nachrichten` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/fuwu` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/luzpavilion` | ZH | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/zh/dingzhi_xiangmu` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/tuandui` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/lianxi` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/xinwen` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/sevaen` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/luzpavilion` | HI | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/hi/custom_projects` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/team` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/sampark` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/samachar` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/servicos` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/luzpavilion` | PT | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/pt/projetos_a_medida` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/equipa` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/contacto` | PT | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/pt/noticias` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/services` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/luzpavilion` | FR | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/fr/projets_sur_mesure` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/equipe` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/contact` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/actualites` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/servizi` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/luzpavilion` | IT | ❌ ES | ✅ OK | ❌ ES | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ❌ SOLO-NAVEGACIÓN |
| `/it/progetti_su_misura` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/squadra` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/contatto` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/notizie` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/jeonsigwan-seobiseu` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/luzpavilion` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/majchumhyeong-peurojekteu` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/tim` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/yeollagcheo` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/sosig` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_madrid` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_madrid` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/madrid_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/madrid_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_madrid` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_madrid` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_madrid` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/madrid-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_barcelona` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_barcelona` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/barcelona_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/barcelona_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_barcelona` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_barcelone` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_barcellona` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/barcelona-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_bilbao` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_bilbao` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/bilbao_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/bilbao_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_bilbao` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_bilbao` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_bilbao` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/bilbao-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_lisbon` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_lissabon` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/lisbon_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/lisbon_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_lisboa` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_lisbonne` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_lisbona` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/lisbon-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_malaga` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_malaga` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/malaga_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/malaga_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_malaga` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_malaga` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_malaga` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/malaga-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/en/stand_construction_badajoz` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ en_GB | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/de/messestandbau_badajoz` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ de_DE | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/zh/badajoz_zhantai_dajian` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ zh_ZH | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/hi/badajoz_stand_nirman` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ hi_HI | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/pt/construcao_stands_badajoz` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ pt_PT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/fr/construction_stands_badajoz` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ fr_FR | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/it/allestimenti_fieristici_badajoz` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ it_IT | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ko/badajoz-bujeu-jejak` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ✅ ko_KO | ❌ Contiene ko_KR/hi_IN | ✅ TRADUCIDO |
| `/ferias/[dynamic] (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/ferias/[dynamic] (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/ferias/[dynamic] (ZH)` | ZH | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/ferias/[dynamic] (HI)` | HI | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/ferias/[dynamic] (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/ferias/[dynamic] (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/ferias/[dynamic] (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/ferias/[dynamic] (KO)` | KO | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/stand-design-barcelona-fira-2026-en-2026-06-07` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/messestandbau-barcelona-fira-2026-de-2026-06-07` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-barcelona-fira-2026-zh-2026-06-07` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-barcelona-fira-2026-hi-2026-06-07` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-barcelona-fira-2026-pt-2026-06-07` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-barcelona-fira-2026-fr-2026-06-07` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-barcelona-fira-2026-it-2026-06-07` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-barcelona-fira-2026-ko-2026-06-07` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-2026-06-06` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/aufmerksamkeitsarchitektur-fil-lissabon-2026-2026-06-06` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-zh-2026-06-06` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-hi-2026-06-06` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitetura-atencao-fil-lisboa-2026-2026-06-06` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitectura-atencion-fil-lisboa-2026-fr-2026-06-06` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitectura-atencion-fil-lisboa-2026-it-2026-06-06` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-2026-06-06` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-2026-06-05` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/erlebnisorientierte-mikroarchitektur-fycma-malaga-2026-2026-06-05` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-zh-2026-06-05` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-hi-2026-06-05` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/microarquitetura-experiencial-fycma-malaga-2026-2026-06-05` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/microarquitectura-experiencial-fycma-malaga-2026-fr-2026-06-05` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/microarquitectura-experiencial-fycma-malaga-2026-it-2026-06-05` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-2026-06-05` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-en-2026-06-04` | EN | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-de-2026-06-04` | DE | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-zh-2026-06-04` | ZH | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-hi-2026-06-04` | HI | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-pt-2026-06-04` | PT | ✅ OK | ⚠️ MIXTO (ES/PT) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-fr-2026-06-04` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-it-2026-06-04` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-ko-2026-06-04` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-en-2026-06-03` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-de-2026-06-03` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-zh-2026-06-03` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-hi-2026-06-03` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-pt-2026-06-03` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-fr-2026-06-03` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-it-2026-06-03` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/agroexpo-feval-stands-badajoz-2026-ko-2026-06-03` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-bilbao-bec-2026-en-2026-06-02` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/messestandbau-bilbao-bec-2026-de-2026-06-02` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-bilbao-bec-2026-zh-2026-06-02` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-bilbao-bec-2026-hi-2026-06-02` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-bilbao-bec-2026-pt-2026-06-02` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-bilbao-bec-2026-fr-2026-06-02` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-bilbao-bec-2026-it-2026-06-02` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-bilbao-bec-2026-ko-2026-06-02` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-barcelona-fira-2026-en-2026-06-01` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/messestandbau-barcelona-fira-2026-de-2026-06-01` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-barcelona-fira-2026-zh-2026-06-01` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-barcelona-fira-2026-hi-2026-06-01` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/design-stands-barcelona-fira-2026-pt-2026-06-01` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-barcelona-fira-2026-fr-2026-06-01` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/diseno-stands-barcelona-fira-2026-it-2026-06-01` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/stand-design-barcelona-fira-2026-ko-2026-06-01` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-2026-06-01` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/aufmerksamkeitsarchitektur-fil-lissabon-2026-2026-06-01` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-zh-2026-06-01` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-hi-2026-06-01` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitetura-atencao-fil-lisboa-2026-2026-06-01` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitectura-atencion-fil-lisboa-2026-fr-2026-06-01` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitectura-atencion-fil-lisboa-2026-it-2026-06-01` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-2026-06-01` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-en-2026-06-01` | EN | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-de-2026-06-01` | DE | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-zh-2026-06-01` | ZH | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-hi-2026-06-01` | HI | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-pt-2026-06-01` | PT | ✅ OK | ⚠️ MIXTO (ES/PT) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-fr-2026-06-01` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-it-2026-06-01` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-atencion-madrid-2026-ko-2026-06-01` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/aufmerksamkeitsarchitektur-fil-lissabon-2026` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-zh` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/attention-architecture-fil-lisbon-2026-hi` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/arquitetura-atencao-fil-lisboa-2026` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/[slug_missing_fr]` | FR | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/[slug_missing_it]` | IT | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/attention-architecture-fil-lisbon-2026` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/erlebnisorientierte-mikroarchitektur-fycma-malaga-2026` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-zh` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026-hi` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/microarquitetura-experiencial-fycma-malaga-2026` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/[slug_missing_fr]` | FR | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/[slug_missing_it]` | IT | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/experiential-microarchitecture-fycma-malaga-2026` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-en` | EN | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-de` | DE | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-zh` | ZH | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-hi` | HI | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-pt` | PT | ✅ OK | ⚠️ MIXTO (ES/PT) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/[slug_missing_fr]` | FR | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/[slug_missing_it]` | IT | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/innovacion-arquitectura-efimera-fitur-madrid-2026-en` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-en` | EN | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-de` | DE | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-zh` | ZH | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-hi` | HI | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-pt` | PT | ✅ OK | ⚠️ MIXTO (ES/PT) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/[slug_missing_fr]` | FR | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/[slug_missing_it]` | IT | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/des-malaga-2026-sombra-confort-termico-eventos-exteriores-en` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-en` | EN | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-de` | DE | ✅ OK | ⚠️ MIXTO | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-zh` | ZH | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-hi` | HI | ✅ OK | ❌ ES (No-Script) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-pt` | PT | ✅ OK | ⚠️ MIXTO (ES/PT) | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ⚠️ MIXTO |
| `/noticias/[slug_missing_fr]` | FR | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/[slug_missing_it]` | IT | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ NO EXISTE | ❌ FALTANTE | ❌ FALTANTE | ❌ NO EXISTE |
| `/noticias/web-summit-lisboa-2026-destacar-espacio-efimero-en` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (ZH)` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (HI)` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/42solutions (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/42solutions (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/42solutions (KO)` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/777 (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/777 (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/777 (ZH)` | ZH | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/777 (HI)` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/777 (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/777 (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/777 (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/777 (KO)` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/a bet a (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/a bet a (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/a bet a (ZH)` | ZH | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/proyectos/a bet a (HI)` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/a bet a (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/a bet a (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/a bet a (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/a bet a (KO)` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aab (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aab (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aab (ZH)` | ZH | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/proyectos/aab (HI)` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aab (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aab (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aab (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aab (KO)` | KO | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aercaribe (EN)` | EN | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aercaribe (DE)` | DE | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aercaribe (ZH)` | ZH | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ❌ SOLO-NAVEGACIÓN |
| `/proyectos/aercaribe (HI)` | HI | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aercaribe (PT)` | PT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE | ✅ TRADUCIDO |
| `/proyectos/aercaribe (FR)` | FR | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aercaribe (IT)` | IT | ✅ OK | ✅ OK | ✅ OK | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ✅ TRADUCIDO |
| `/proyectos/aercaribe (KO)` | KO | ❌ ES (No-Script) | ✅ OK | ❌ ES (No-Script) | ✅ OK | ❌ FALTANTE | ❌ FALTANTE (seoDescriptions ausente) | ❌ SOLO-NAVEGACIÓN |
