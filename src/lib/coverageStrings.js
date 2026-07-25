// Textos del panel "prueba de cobertura" (miniatura del mapa de Pat + reclamo + CTA).
// Vive en el sidebar de las páginas de ciudad (Site.svelte) y en el aside de las
// páginas de feria (Feria.svelte). Se comparten desde aquí para que un cambio de
// copy no haya que replicarlo en dos componentes (y acaben divergiendo).

// Reclamo bajo la miniatura del mapa.
export const coverageProof = {
  es: () => `Integra este evento en una campaña mucho más amplia.`,
  en: () => `Integrate this event into a much broader campaign.`,
  pt: () => `Integre este evento numa campanha muito mais ampla.`,
  de: () => `Binden Sie diese Veranstaltung in eine viel umfassendere Kampagne ein.`,
  fr: () => `Intégrez cet événement dans une campagne bien plus large.`,
  it: () => `Integra questo evento in una campagna molto più ampia.`,
  nl: () => `Integreer dit evenement in een veel bredere campagne.`,
  zh: () => `将此活动纳入更广泛的营销活动。`,
  hi: () => `इस आयोजन को एक बहुत व्यापक अभियान में शामिल करें।`,
  ko: () => `이 행사를 훨씬 폭넓은 캠페인에 통합하세요.`,
  ja: () => `このイベントをより広範なキャンペーンに組み込みましょう。`
};

// CTA azul que abre a Pat.
export const coveragePatCta = {
  es: 'Estrategia para acaparar el mercado', en: 'Strategy to corner the market',
  pt: 'Estratégia para dominar o mercado', de: 'Strategie zur Eroberung des Marktes',
  fr: 'Stratégie pour accaparer le marché', it: 'Strategia per conquistare il mercato',
  nl: 'Strategie om de markt te veroveren', zh: '抢占市场的策略',
  hi: 'बाज़ार पर कब्ज़ा करने की रणनीति', ko: '시장을 장악하는 전략',
  ja: '市場を席巻する戦略'
};

// Alt de la miniatura del mapa (descriptivo: es lo que anuncia un lector de pantalla).
export const coverageMapAlt = {
  es: 'Mapa de cobertura ferial de Standarte en España y Portugal',
  en: 'Standarte trade fair coverage map across Spain and Portugal',
  pt: 'Mapa de cobertura de feiras da Standarte em Espanha e Portugal',
  de: 'Standarte-Messeabdeckungskarte in Spanien und Portugal',
  fr: 'Carte de couverture des salons de Standarte en Espagne et au Portugal',
  it: 'Mappa di copertura fieristica di Standarte in Spagna e Portogallo',
  nl: 'Standarte-beursdekkingskaart in Spanje en Portugal',
  zh: 'Standarte 在西班牙和葡萄牙的展会覆盖地图',
  hi: 'स्पेन और पुर्तगाल में Standarte का मेला कवरेज मानचित्र',
  ko: '스페인과 포르투갈의 Standarte 전시회 커버리지 지도',
  ja: 'スペインとポルトガルにおけるStandarteの展示会カバレッジマップ'
};
