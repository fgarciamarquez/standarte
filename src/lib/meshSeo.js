// SEO de la malla relacional de ferias (el "mapa de Pat"), en datos estructurados.
//
// La potencia diferencial de la web —ferias conectadas por actividad, contratables
// como campaña conjunta con descuento único— vive en un mapa SVG construido por JS
// que los rastreadores no ven. Este módulo la expone como JSON-LD schema.org sin
// añadir ni un píxel visible: ItemList de ferias relacionadas (espejo EXACTO de los
// módulos de enlaces visibles de cada página, que se reciben ya computados para que
// nunca diverjan) y OfferCatalog de la campaña multi-feria (los descuentos reales
// del paso de sinergia del formulario: 2 eventos −15%, 3 eventos −25%, únicos, no
// acumulados — ver savingsScale en ContactForm.svelte).

import { SITE_ORIGIN } from './brand.js';
const BASE = SITE_ORIGIN;

// ── Textos por idioma ──────────────────────────────────────────────────────
const L = {
  es: {
    catalog: 'Campaña multi-feria con descuento único',
    catalogDesc: 'Contratación de varias ferias de la misma actividad como campaña conjunta, con un único proveedor y descuento único no acumulado.',
    two: 'Campaña de 2 eventos', twoDesc: 'Descuento único del 15% al contratar el stand en 2 ferias de tu actividad como campaña conjunta.',
    three: 'Campaña de 3 eventos', threeDesc: 'Descuento único del 25% al contratar el stand en 3 ferias de tu actividad como campaña conjunta.',
    related: (n) => `Ferias conectadas con ${n} por actividad — malla de Standarte`,
    relatedDesc: 'Red de ferias de la misma actividad en las que Standarte construye: contratables como campaña conjunta con descuento.',
    cityList: (c) => `Ferias conectadas con ${c} — malla de Standarte`,
    cityListDesc: (c) => `Ferias de ${c} y su zona en las que Standarte construye, conectadas por actividad con el resto de la malla de España, Portugal, Francia y Marruecos.`
  },
  en: {
    catalog: 'Multi-fair campaign with a single discount',
    catalogDesc: 'Book several fairs of the same activity as a joint campaign, with one builder and a single, non-cumulative discount.',
    two: '2-event campaign', twoDesc: 'A single 15% discount when booking your stand at 2 fairs of your activity as a joint campaign.',
    three: '3-event campaign', threeDesc: 'A single 25% discount when booking your stand at 3 fairs of your activity as a joint campaign.',
    related: (n) => `Fairs connected to ${n} by activity — Standarte mesh`,
    relatedDesc: 'Network of same-activity fairs where Standarte builds: bookable as a joint campaign with a discount.',
    cityList: (c) => `Fairs connected to ${c} — Standarte mesh`,
    cityListDesc: (c) => `Fairs in ${c} and its area where Standarte builds, connected by activity to the rest of the mesh across Spain, Portugal, France and Morocco.`
  },
  de: {
    catalog: 'Multi-Messe-Kampagne mit einmaligem Rabatt',
    catalogDesc: 'Mehrere Messen derselben Branche als gemeinsame Kampagne buchen — ein Messebauer, ein einmaliger, nicht kumulierter Rabatt.',
    two: 'Kampagne mit 2 Events', twoDesc: 'Einmaliger Rabatt von 15% bei Buchung des Stands auf 2 Messen Ihrer Branche als gemeinsame Kampagne.',
    three: 'Kampagne mit 3 Events', threeDesc: 'Einmaliger Rabatt von 25% bei Buchung des Stands auf 3 Messen Ihrer Branche als gemeinsame Kampagne.',
    related: (n) => `Mit ${n} über die Branche verbundene Messen — Standarte-Netz`,
    relatedDesc: 'Netz von Messen derselben Branche, auf denen Standarte baut: als gemeinsame Kampagne mit Rabatt buchbar.',
    cityList: (c) => `Mit ${c} verbundene Messen — Standarte-Netz`,
    cityListDesc: (c) => `Messen in ${c} und Umgebung, auf denen Standarte baut, über die Branche mit dem übrigen Netz in Spanien, Portugal, Frankreich und Marokko verbunden.`
  },
  pt: {
    catalog: 'Campanha multi-feira com desconto único',
    catalogDesc: 'Contratação de várias feiras da mesma atividade como campanha conjunta, com um único construtor e desconto único não acumulado.',
    two: 'Campanha de 2 eventos', twoDesc: 'Desconto único de 15% ao contratar o stand em 2 feiras da sua atividade como campanha conjunta.',
    three: 'Campanha de 3 eventos', threeDesc: 'Desconto único de 25% ao contratar o stand em 3 feiras da sua atividade como campanha conjunta.',
    related: (n) => `Feiras ligadas à ${n} por atividade — malha da Standarte`,
    relatedDesc: 'Rede de feiras da mesma atividade onde a Standarte constrói: contratáveis como campanha conjunta com desconto.',
    cityList: (c) => `Feiras ligadas a ${c} — malha da Standarte`,
    cityListDesc: (c) => `Feiras de ${c} e da sua zona onde a Standarte constrói, ligadas por atividade ao resto da malha de Espanha, Portugal, França e Marrocos.`
  },
  fr: {
    catalog: 'Campagne multi-salons avec remise unique',
    catalogDesc: 'Réservez plusieurs salons de la même activité en campagne conjointe, avec un seul constructeur et une remise unique non cumulée.',
    two: 'Campagne de 2 événements', twoDesc: 'Remise unique de 15% en réservant votre stand sur 2 salons de votre activité en campagne conjointe.',
    three: 'Campagne de 3 événements', threeDesc: 'Remise unique de 25% en réservant votre stand sur 3 salons de votre activité en campagne conjointe.',
    related: (n) => `Salons liés à ${n} par activité — maillage Standarte`,
    relatedDesc: 'Réseau de salons de la même activité où Standarte construit : réservables en campagne conjointe avec remise.',
    cityList: (c) => `Salons liés à ${c} — maillage Standarte`,
    cityListDesc: (c) => `Salons de ${c} et de sa zone où Standarte construit, reliés par activité au reste du maillage d'Espagne, du Portugal, de France et du Maroc.`
  },
  it: {
    catalog: 'Campagna multi-fiera con sconto unico',
    catalogDesc: 'Prenota più fiere della stessa attività come campagna congiunta, con un unico allestitore e uno sconto unico non cumulato.',
    two: 'Campagna di 2 eventi', twoDesc: 'Sconto unico del 15% prenotando lo stand in 2 fiere della tua attività come campagna congiunta.',
    three: 'Campagna di 3 eventi', threeDesc: 'Sconto unico del 25% prenotando lo stand in 3 fiere della tua attività come campagna congiunta.',
    related: (n) => `Fiere collegate a ${n} per attività — rete Standarte`,
    relatedDesc: 'Rete di fiere della stessa attività in cui Standarte allestisce: prenotabili come campagna congiunta con sconto.',
    cityList: (c) => `Fiere collegate a ${c} — rete Standarte`,
    cityListDesc: (c) => `Fiere di ${c} e della sua zona in cui Standarte allestisce, collegate per attività al resto della rete di Spagna, Portogallo, Francia e Marocco.`
  },
  nl: {
    catalog: 'Multi-beurscampagne met eenmalige korting',
    catalogDesc: 'Boek meerdere beurzen van dezelfde activiteit als gezamenlijke campagne, met één standbouwer en één niet-cumulatieve korting.',
    two: 'Campagne van 2 evenementen', twoDesc: 'Eenmalige korting van 15% bij het boeken van uw stand op 2 beurzen van uw activiteit als gezamenlijke campagne.',
    three: 'Campagne van 3 evenementen', threeDesc: 'Eenmalige korting van 25% bij het boeken van uw stand op 3 beurzen van uw activiteit als gezamenlijke campagne.',
    related: (n) => `Beurzen verbonden met ${n} per activiteit — Standarte-netwerk`,
    relatedDesc: 'Netwerk van beurzen van dezelfde activiteit waar Standarte bouwt: boekbaar als gezamenlijke campagne met korting.',
    cityList: (c) => `Beurzen verbonden met ${c} — Standarte-netwerk`,
    cityListDesc: (c) => `Beurzen in ${c} en omgeving waar Standarte bouwt, per activiteit verbonden met de rest van het netwerk in Spanje, Portugal, Frankrijk en Marokko.`
  },
  zh: {
    catalog: '多展会联合参展方案（单一折扣）',
    catalogDesc: '将同一行业的多个展会作为联合参展方案预订：同一家搭建商，单一不叠加折扣。',
    two: '2场展会方案', twoDesc: '以联合方案预订本行业2场展会的展台，可享15%单一折扣。',
    three: '3场展会方案', threeDesc: '以联合方案预订本行业3场展会的展台，可享25%单一折扣。',
    related: (n) => `与${n}同行业关联的展会 — Standarte 展会网络`,
    relatedDesc: 'Standarte 承建的同行业展会网络：可作为联合方案预订并享受折扣。',
    cityList: (c) => `与${c}相连的展会 — Standarte 展会网络`,
    cityListDesc: (c) => `Standarte 在${c}及周边承建的展会，按行业与西班牙、葡萄牙、法国和摩洛哥的展会网络相连。`
  },
  hi: {
    catalog: 'एकल छूट के साथ मल्टी-फेयर अभियान',
    catalogDesc: 'एक ही गतिविधि के कई मेलों को संयुक्त अभियान के रूप में बुक करें — एक ही निर्माता, एकल गैर-संचयी छूट।',
    two: '2 इवेंट का अभियान', twoDesc: 'अपनी गतिविधि के 2 मेलों में संयुक्त अभियान के रूप में स्टैंड बुक करने पर 15% की एकल छूट।',
    three: '3 इवेंट का अभियान', threeDesc: 'अपनी गतिविधि के 3 मेलों में संयुक्त अभियान के रूप में स्टैंड बुक करने पर 25% की एकल छूट।',
    related: (n) => `${n} से गतिविधि द्वारा जुड़े मेले — Standarte नेटवर्क`,
    relatedDesc: 'एक ही गतिविधि के मेलों का नेटवर्क जहाँ Standarte निर्माण करता है: छूट के साथ संयुक्त अभियान के रूप में बुक करने योग्य।',
    cityList: (c) => `${c} से जुड़े मेले — Standarte नेटवर्क`,
    cityListDesc: (c) => `${c} और उसके क्षेत्र के मेले जहाँ Standarte निर्माण करता है, गतिविधि के आधार पर स्पेन, पुर्तगाल, फ्रांस और मोरक्को के नेटवर्क से जुड़े।`
  },
  ko: {
    catalog: '단일 할인 다중 박람회 캠페인',
    catalogDesc: '동일 분야의 여러 박람회를 공동 캠페인으로 예약 — 단일 시공사, 중복되지 않는 단일 할인.',
    two: '2개 행사 캠페인', twoDesc: '귀사 분야의 박람회 2곳에 부스를 공동 캠페인으로 예약 시 15% 단일 할인.',
    three: '3개 행사 캠페인', threeDesc: '귀사 분야의 박람회 3곳에 부스를 공동 캠페인으로 예약 시 25% 단일 할인.',
    related: (n) => `${n}와(과) 분야로 연결된 박람회 — Standarte 네트워크`,
    relatedDesc: 'Standarte가 시공하는 동일 분야 박람회 네트워크: 할인과 함께 공동 캠페인으로 예약 가능.',
    cityList: (c) => `${c}와(과) 연결된 박람회 — Standarte 네트워크`,
    cityListDesc: (c) => `Standarte가 시공하는 ${c}와(과) 그 인근의 박람회로, 분야별로 스페인·포르투갈·프랑스·모로코의 네트워크와 연결됩니다.`
  },
  ja: {
    catalog: '単一割引のマルチ見本市キャンペーン',
    catalogDesc: '同じ分野の複数の見本市を合同キャンペーンとして予約 — 施工会社は1社、割引は重複しない単一割引。',
    two: '2イベントのキャンペーン', twoDesc: '貴社の分野の見本市2件にブースを合同キャンペーンとして予約すると15%の単一割引。',
    three: '3イベントのキャンペーン', threeDesc: '貴社の分野の見本市3件にブースを合同キャンペーンとして予約すると25%の単一割引。',
    related: (n) => `${n}と分野でつながる見本市 — Standarteネットワーク`,
    relatedDesc: 'Standarteが施工する同一分野の見本市ネットワーク：割引付きの合同キャンペーンとして予約可能。',
    cityList: (c) => `${c}とつながる見本市 — Standarteネットワーク`,
    cityListDesc: (c) => `Standarteが施工する${c}とその周辺の見本市。分野ごとにスペイン、ポルトガル、フランス、モロッコのネットワークとつながっています。`
  }
};
const T = (lang) => L[lang] || L.es;

// ── OfferCatalog de la campaña multi-feria ─────────────────────────────────
// Se cuelga del Service de cada página (hasOfferCatalog). Los porcentajes son los
// reales del paso de sinergia del formulario; si cambian allí, cambiarlos aquí.
export function synergyOfferCatalog(lang) {
  const t = T(lang);
  return {
    '@type': 'OfferCatalog',
    name: t.catalog,
    description: t.catalogDesc,
    itemListElement: [
      { '@type': 'Offer', name: t.two, description: t.twoDesc },
      { '@type': 'Offer', name: t.three, description: t.threeDesc }
    ]
  };
}

// ── ItemList de ferias relacionadas (páginas de feria) ─────────────────────
// `items` es el MISMO array que alimenta el módulo visible "Ferias relacionadas"
// (siblingFairs ya computado en Feria.svelte): así el JSON-LD nunca puede afirmar
// una relación que la página no muestre.
export function relatedFairsItemList({ canonical, lang, fairName, items, urlFor }) {
  if (!items || !items.length) return null;
  const t = T(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': canonical + '#related-fairs-mesh',
    name: t.related(fairName),
    description: t.relatedDesc,
    numberOfItems: items.length,
    itemListElement: items.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: f.name,
      url: BASE + urlFor(f.slug)
    }))
  };
}

// ── ItemList de ferias de la ciudad (páginas de ciudad) ────────────────────
// `items` = regionFairs (la lista visible del pilar); `activities` = etiquetas
// visibles como chips, que aquí enlazan sus hubs /actividad como `about`.
export function cityFairsItemList({ canonical, lang, cityName, items, activities, urlFor, activityUrlFor, activityLabelFor }) {
  if (!items || !items.length) return null;
  const t = T(lang);
  return {
    '@type': 'ItemList',
    '@id': canonical + '#city-fairs-mesh',
    name: t.cityList(cityName),
    description: t.cityListDesc(cityName),
    numberOfItems: items.length,
    ...(activities && activities.length ? {
      about: activities.map((tag) => ({
        '@type': 'Thing',
        name: activityLabelFor(tag),
        url: BASE + activityUrlFor(tag)
      }))
    } : {}),
    itemListElement: items.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: f.name,
      url: BASE + urlFor(f.slug)
    }))
  };
}
