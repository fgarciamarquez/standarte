// Motor de búsqueda de ferias, compartido por el buscador de la portada
// (FairSearch.svelte) y el campo «Feria» del formulario de presupuesto
// (ContactForm.svelte). Vive aquí porque los dos tenían su propia copia y el mismo fallo.
//
// POR QUÉ EXISTE (22/10/2026). Un cliente buscó «OMD» —el Congresso da Ordem dos Médicos
// Dentistas— y el buscador respondió que la feria no existía, cuando sí estaba en el
// catálogo con el nombre de su feria comercial (Expodentária). Al medirlo apareció un
// fallo mucho mayor: el matcher solo hacía UNA comprobación de subcadena contra el nombre
// o la ciudad, así que
//
//   · «fimi valencia» no encontraba nada: las dos palabras no van seguidas en el nombre.
//     Lo mismo le pasaba a las 465 ferias del catálogo con ciudad. El 100 %.
//   · «fimma maderalia» tampoco: el nombre real lleva un «+» en medio («Fimma + Maderalia»),
//     y nadie teclea el signo. Igual en 24 de las 25 ferias con + & . / en el nombre.
//   · ninguna sigla que no esté dentro del nombre era encontrable.
//
// Y cada fallo no es solo un resultado vacío: dispara el aviso «FERIA NO ENCONTRADA» y le
// dice al visitante que su feria no está dada de alta. Es decir, se le echaba.
//
// Las tres reglas que lo arreglan:
//   1. Normalizar los signos. «Fimma + Maderalia» y «Solar & Storage Live» se reducen a
//      palabras, así que da igual que el visitante escriba el signo o no.
//   2. Buscar por PALABRAS, no por subcadena. Si todas las palabras tecleadas aparecen,
//      es coincidencia, estén seguidas o no. Eso es lo que salva «nombre + ciudad».
//   3. Mirar también el slug y los alias, para que las siglas y los nombres alternativos
//      que no están en el nombre oficial lleven igualmente a su ficha.
//
// El orden de los resultados conserva la precisión de antes: primero el nombre exacto,
// luego lo que empieza por lo tecleado, y las coincidencias por palabras al final. Así
// quien escribe el nombre completo sigue cayendo en su ficha y no en una vecina.

/* ---------- Alias: términos que NO aparecen en el nombre, la ciudad ni el slug ----------
 * Solo hace falta una entrada aquí cuando el término no está en ningún otro sitio: la
 * regla 3 ya cubre el slug, y las reglas 1 y 2 cubren cualquier combinación de palabras
 * del propio nombre. Cada término de esta lista está tomado del texto publicado de la
 * ficha correspondiente, no inventado. */
export const fairAliases = {
  // El caso que destapó todo: la ficha es de la feria comercial, pero lo que se busca es
  // el congreso y, sobre todo, la sigla de la Orden.
  'stands-expodentaria-lisboa': ['OMD', 'Congresso OMD', 'Congresso da OMD', 'Ordem dos Médicos Dentistas', 'congreso dental Portugal'],
  // Nombres que en el catálogo son solo siglas: la forma desarrollada no era encontrable.
  'stand-cioc-lisboa': ['Congresso Internacional de Optometria e Contactologia', 'optometría', 'contactología', 'UPOOP', 'Évora', 'Leiria'],
  'stand-ciocv-braga': ['Congresso Internacional de Optometria e Ciências da Visão', 'optometría', 'ciencias de la visión', 'UPOOP'],
  // Feria de pedidos del comercio infantil: se la busca por su oferta, no por la marca.
  'stands-babykid-spain-fimi-valencia': ['moda infantil', 'puericultura', 'ASEPRI', 'juguete']
};

/* Normalización. Fuera acentos latinos, todo a minúsculas y cualquier racha de signos
 * convertida en un espacio. Dos cuidados que no se pueden perder:
 *   · el rango de diacríticos es el latino (U+0300-U+036F) a propósito: \p{Mn} entero se
 *     comería las vocales del devanagari y dejaría el hindi ilegible;
 *   · se conservan \p{M} (marcas) además de letras y números por lo mismo. */
export const normFair = (s) => (s || '')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
  .trim();

/* Una palabra tecleada «aparece» si alguna palabra del texto empieza por ella (que es
 * como se comporta cualquier autocompletado: «madri» vale por «madrid»). Para chino,
 * japonés y coreano, que no separan con espacios, se acepta además la subcadena. */
const tokenIn = (hay, tok) => {
  if (!tok) return false;
  if (hay === tok || hay.startsWith(tok + ' ') || hay.includes(' ' + tok)) return true;
  return tok.length >= 2 && hay.includes(tok);
};

export const tokensOf = (q) => normFair(q).split(' ').filter(Boolean);

/* Construye la opción buscable de una feria. `extra` recoge lo que no se muestra pero sí
 * se busca: las palabras del slug y los alias. */
export function fairSearchKeys(fair) {
  const key = normFair(fair.name);
  const cityKey = normFair(fair.city);
  const extra = normFair([(fair.slug || '').replace(/^stands?-/, ''), ...(fairAliases[fair.slug] || [])].join(' '));
  return { key, cityKey, extra, allKey: [key, cityKey, extra].filter(Boolean).join(' ') };
}

/* Puntuación: cuanto más bajo, más arriba sale. Los cuatro primeros niveles son los de
 * siempre, para no alterar el orden de lo que ya funcionaba; los dos últimos son los
 * nuevos y van detrás justamente para que no desplacen a una coincidencia más literal. */
export function rankFair(o, q, toks) {
  if (!q) return 9;
  if (o.key === q) return 0;
  if (o.key.startsWith(q)) return 1;
  if (o.cityKey && o.cityKey.startsWith(q)) return 2;
  if (o.key.includes(q)) return 3;
  if (o.cityKey && o.cityKey.includes(q)) return 4;
  if (!toks.length) return 9;
  const nameCity = o.cityKey ? o.key + ' ' + o.cityKey : o.key;
  if (toks.every((t) => tokenIn(nameCity, t))) return 5;
  if (o.allKey && toks.every((t) => tokenIn(o.allKey, t))) return 6;
  return 9;
}
