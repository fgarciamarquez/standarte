// Slugs nativos en japonés (solo idioma `ja`).
//
// El resto de idiomas comparten el slug latino de cada feria/proyecto (definido en
// fairsData/projectData). Para `ja` queremos URLs en japonés nativo, así que aquí
// mapeamos slug-latino -> slug-japonés. Lo que no esté mapeado cae al slug latino.
//
// - Segmento de detalle de feria en ja: 展示会情報 (igual que la landing). El resto de
//   idiomas mantienen su segmento de detalle actual `ferias` (ya indexado).
// - Estos mapas los rellena la fase B (traducción). Mientras estén vacíos/parciales,
//   los helpers caen al slug latino, así que el sitio sigue funcionando.

/** slug latino de feria -> slug japonés */
export const jaFairSlugs = {
  // 'sagalexpo-lisboa': 'サガルエキスポ-リスボン',
};

/** id de proyecto (latino) -> slug japonés */
export const jaProjectSlugs = {
  // 'stand_para_...': '...',
};

/** Inversa: slug japonés -> slug latino (para resolver la URL entrante). */
export const jaFairSlugsReverse = Object.fromEntries(
  Object.entries(jaFairSlugs).map(([es, ja]) => [ja, es])
);
export const jaProjectSlugsReverse = Object.fromEntries(
  Object.entries(jaProjectSlugs).map(([es, ja]) => [ja, es])
);
