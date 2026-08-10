// Selección de nodos del "Calendario de expansión" (ver FairTimeline.svelte).
//
// Vive fuera del componente porque el load del servidor necesita saber, ANTES de
// renderizar, qué ferias van a salir en la línea: solo así puede adjuntar el resumen
// de esas —y no el de las 425— al HTML de la página (los resúmenes viven en
// $lib/server/fairSeoData.js, que no puede llegar al cliente).
import { fairsData } from '$lib/fairsData.js';
import { activitiesForFair } from '$lib/fairTags.js';
import { fairDates, fairDatesFor, formatFairDatesShort } from '$lib/fairDates.js';
import { anchorWeight } from '$lib/fairAnchors.js';

// 14 hitos: con 7, el ranking por relevancia (afinidad + ancla de sector) llenaba la
// línea solo con las grandes citas europeas; al doblar el aforo entran también las
// ferias nacionales (ES/PT) del sector. En escritorio ya no caben todos a la vista:
// el raíl se desplaza en horizontal guiado por la posición del ratón (FairTimeline).
export const MAX_NODES = 14;

// Nodos: esta feria (siempre, aunque no tenga fecha) + las citas de su sector que
// más le convienen al expositor, en orden cronológico.
//
// Qué entra y por qué. Los sectores grandes (alimentación, vino, industria) tienen
// decenas de candidatas y solo caben MAX_NODES, así que el recorte decide el valor
// del módulo. Se eligen por AFINIDAD (cuántas etiquetas comparten con esta feria) y,
// a igualdad, por ser cita de referencia del sector (fairAnchors); solo al final
// desempata la cercanía en el calendario. Antes se cortaba por contigüidad temporal
// a partir de la feria de la página, y eso dejaba fuera dos cosas importantes: las
// ferias líderes del sector y todo lo que cae ANTES de esta feria pero DESPUÉS de
// hoy, que es justo lo que un cliente puede contratar ya.
//
// Solo entran ferias con fecha VERIFICADA y futura: el módulo nunca inventa fechas.
export function timelineNodes({ slug, lang = 'es', name = '', tags = null }) {
  const own = fairsData.find((f) => f.slug === slug);
  const tagSet = new Set(tags || activitiesForFair(slug));
  const candidates = [];
  for (const f of fairsData) {
    if (f.slug === slug) continue;
    if (!fairDates[f.slug]) continue;
    const shared = activitiesForFair(f.slug).filter((t) => tagSet.has(t)).length;
    if (!shared) continue;
    const short = formatFairDatesShort(f.slug, lang);
    if (!short) continue; // sin fecha futura válida
    const e = fairDatesFor(f.slug);
    candidates.push({
      slug: f.slug, name: f.name, city: f.city, country: f.country,
      date: short, iso: e.start, cadence: e.cadence, current: false,
      score: shared * 10 + anchorWeight(f.slug)
    });
  }
  // Mejor puntuación primero; a igualdad, la más próxima en el tiempo.
  candidates.sort((a, b) => b.score - a.score || a.iso.localeCompare(b.iso));

  const ownShort = formatFairDatesShort(slug, lang);
  const ownEntry = fairDatesFor(slug);
  const self = {
    slug, name: name || (own && own.name) || '', city: own ? own.city : '',
    country: own ? own.country : 'es',
    date: ownShort, iso: ownShort && ownEntry ? ownEntry.start : '',
    cadence: ownEntry ? ownEntry.cadence : 'unknown', current: true
  };

  const picked = candidates.slice(0, MAX_NODES - 1);
  // Sin fecha propia confirmada, esta feria abre la línea; con fecha, ocupa su lugar.
  if (!self.iso) return [self, ...picked.sort((a, b) => a.iso.localeCompare(b.iso))];
  return [...picked, self].sort((a, b) => a.iso.localeCompare(b.iso));
}
