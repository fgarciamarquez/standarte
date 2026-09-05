// Ficha de datos de las páginas paralelas (server-only).
//
// POR QUÉ: los calendarios de ferias de la competencia ganan la consulta rápida con
// una tabla —qué evento, cuándo, dónde, de qué sector— que se lee en dos segundos.
// Estas páginas juegan a eso, pero con NUESTROS datos: las fechas verificadas de
// fairDates, el sector y las actividades de nuestro catálogo, y hechos que un
// directorio no tiene (taller propio, distancia real al recinto, plazo de fabricación).
//
// Se compone en el SERVIDOR y viaja ya resuelta en el HTML: la página no carga ni un
// kilobyte extra de JavaScript por tener la ficha, que es justo lo que se busca aquí
// —poco texto, sin imágenes y rápida—.
import { builderPages } from '$lib/builderPages.js';
import { fairsData } from '$lib/fairsData.js';
import { formatFairDates, fairDates, cadenceLabels } from '$lib/fairDates.js';
import { activitiesForFair, labelForTag } from '$lib/fairTags.js';

const L = {
  es: {
    event: 'Evento', nextEdition: 'Próxima edición', cadence: 'Periodicidad', venue: 'Recinto',
    city: 'Ciudad', sector: 'Sector', activities: 'Actividades', fairsCovered: 'Ferias del recinto en nuestro catálogo',
    workshop: 'Dónde se fabrica', service: 'Qué hacemos', lead: 'Plazo recomendado', sheet: 'Ficha del evento', sheetCity: 'Ficha de la plaza',
    serviceValue: 'Diseño, ingeniería, fabricación en taller propio, transporte, montaje y desmontaje',
    leadValue: '6-8 semanas', tbc: 'Por confirmar', fairsUnit: (n) => `${n} ${n === 1 ? 'feria' : 'ferias'}`
  },
  en: {
    event: 'Event', nextEdition: 'Next edition', cadence: 'Frequency', venue: 'Venue',
    city: 'City', sector: 'Sector', activities: 'Activities', fairsCovered: 'Fairs at this venue in our catalogue',
    workshop: 'Where it is built', service: 'What we do', lead: 'Recommended lead time', sheet: 'Event fact sheet', sheetCity: 'Location fact sheet',
    serviceValue: 'Design, engineering, in-house manufacturing, transport, installation and dismantling',
    leadValue: '6-8 weeks', tbc: 'To be confirmed', fairsUnit: (n) => `${n} ${n === 1 ? 'fair' : 'fairs'}`
  },
  pt: {
    event: 'Evento', nextEdition: 'Próxima edição', cadence: 'Periodicidade', venue: 'Recinto',
    city: 'Cidade', sector: 'Setor', activities: 'Atividades', fairsCovered: 'Feiras do recinto no nosso catálogo',
    workshop: 'Onde se fabrica', service: 'O que fazemos', lead: 'Prazo recomendado', sheet: 'Ficha do evento', sheetCity: 'Ficha da cidade',
    serviceValue: 'Design, engenharia, fabrico em oficina própria, transporte, montagem e desmontagem',
    leadValue: '6-8 semanas', tbc: 'Por confirmar', fairsUnit: (n) => `${n} ${n === 1 ? 'feira' : 'feiras'}`
  }
};

/** Filas de la ficha para una página paralela. Devuelve null si la sección no lo es. */
export function builderFacts(section, lang = 'es') {
  const cfg = builderPages[section];
  if (!cfg) return null;
  const t = L[lang] || L.es;
  const rows = [];

  if (cfg.fair) {
    const fair = fairsData.find((f) => f.slug === cfg.fair);
    if (!fair) return null;
    const dates = formatFairDates(cfg.fair, lang);
    const cad = fairDates[cfg.fair] && fairDates[cfg.fair].cadence;
    const tags = activitiesForFair(cfg.fair).map((tg) => labelForTag(tg, lang)).filter(Boolean);
    rows.push({ k: t.event, v: fair.name, href: lang === 'es' ? `/ferias/${fair.slug}` : `/${lang}/ferias/${fair.slug}` });
    rows.push({ k: t.nextEdition, v: dates || t.tbc });
    if (cad && cadenceLabels[cad]) rows.push({ k: t.cadence, v: cadenceLabels[cad][lang] || cadenceLabels[cad].es });
    if (cfg.venue) rows.push({ k: t.venue, v: cfg.venue });
    rows.push({ k: t.city, v: fair.city || cfg.cityName });
    if (fair.sector) rows.push({ k: t.sector, v: fair.sector });
    if (tags.length) rows.push({ k: t.activities, v: tags.join(', ') });
  } else {
    if (cfg.venue) rows.push({ k: t.venue, v: cfg.venue });
    // El nombre de la ciudad, escrito como lo escribe el lector (Oporto → Porto en
    // inglés y en portugués). La clave del catálogo sigue siendo la española.
    rows.push({ k: t.city, v: (cfg.cityNames && cfg.cityNames[lang]) || cfg.cityName });
    // Cuántas ferias de esa ciudad cubrimos: es un dato NUESTRO (el catálogo) y la
    // mejor prueba de cobertura real frente a un directorio.
    const n = fairsData.filter((f) => f.city === cfg.cityName).length;
    if (n) rows.push({ k: t.fairsCovered, v: t.fairsUnit(n) });
  }

  if (cfg.workshop) rows.push({ k: t.workshop, v: cfg.workshop[lang] || cfg.workshop.es });
  rows.push({ k: t.service, v: t.serviceValue });
  rows.push({ k: t.lead, v: t.leadValue });

  return { title: cfg.fair ? t.sheet : t.sheetCity, rows };
}
