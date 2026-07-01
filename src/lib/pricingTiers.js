// Fuente única de los tramos de precio de Standarte.
// Lo usan la página /precios (Precios.svelte) y el asistente de presupuesto
// (ContactForm.svelte) para que las cifras y los nombres no se dupliquen.

/** Tramos base con su cifra «desde» en euros. */
export const pricingTiers = [
  { key: 'modular', priceFrom: 4900 },
  { key: 'medida', priceFrom: 9900 },
  { key: 'premium', priceFrom: 24000 },
  { key: 'singular', priceFrom: 60000 }
];

/** Formato de miles en español (4900 -> "4.900", 24000 -> "24.000"). */
export const fmtEuro = (n) => n.toLocaleString('es-ES');

/**
 * Bandas de presupuesto derivadas de los «desde» consecutivos: cada tramo va de
 * su cifra a la del siguiente; el último es abierto por arriba (min sin max).
 */
export const budgetBands = pricingTiers.map((t, i) => {
  const next = pricingTiers[i + 1];
  return { key: t.key, min: t.priceFrom, max: next ? next.priceFrom : null };
});

/** Etiqueta numérica de la banda, neutra al idioma salvo el "+" del tramo abierto. */
export const bandLabel = (band) =>
  band.max ? `${fmtEuro(band.min)} – ${fmtEuro(band.max)} €` : `+${fmtEuro(band.min)} €`;

/** Nombres de cada tramo por idioma (alineados con /precios). */
export const tierNames = {
  es: { modular: 'Stand modular', medida: 'Stand a medida', premium: 'Stand premium', singular: 'Proyectos singulares' },
  en: { modular: 'Modular stand', medida: 'Custom stand', premium: 'Premium stand', singular: 'Signature projects' },
  de: { modular: 'Modularer Stand', medida: 'Maßgefertigter Stand', premium: 'Premium-Stand', singular: 'Sonderprojekte' },
  pt: { modular: 'Stand modular', medida: 'Stand à medida', premium: 'Stand premium', singular: 'Projetos singulares' },
  fr: { modular: 'Stand modulaire', medida: 'Stand sur mesure', premium: 'Stand premium', singular: 'Projets singuliers' },
  it: { modular: 'Stand modulare', medida: 'Stand su misura', premium: 'Stand premium', singular: 'Progetti singolari' },
  nl: { modular: 'Modulaire stand', medida: 'Stand op maat', premium: 'Premium stand', singular: 'Bijzondere projecten' },
  zh: { modular: '模块化展台', medida: '定制展台', premium: '高端展台', singular: '特别项目' },
  hi: { modular: 'मॉड्यूलर स्टैंड', medida: 'कस्टम स्टैंड', premium: 'प्रीमियम स्टैंड', singular: 'विशेष परियोजनाएँ' },
  ko: { modular: '모듈형 부스', medida: '맞춤형 부스', premium: '프리미엄 부스', singular: '특별 프로젝트' },
  ja: { modular: 'モジュール型ブース', medida: 'オーダーメイドブース', premium: 'プレミアムブース', singular: '特別プロジェクト' }
};
