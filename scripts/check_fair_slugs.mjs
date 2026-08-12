// Guardián de build: TODAS las ferias deben usar el patrón de slug
// stand-<feria>-<ciudad>. Existe porque el .htaccess lleva una regla 301 GENÉRICA
// que redirige cualquier /ferias/<slug> sin el prefijo a /ferias/stand-<slug>:
// si una feria nueva se diera de alta sin el prefijo, su URL real quedaría
// inaccesible (la regla la redirigiría a una página inexistente). Este check
// rompe el build antes de que eso pueda llegar a producción.
import { fairsData } from '../src/lib/fairsData.js';

// Se admite 'stand-' (patron general de las 428 fichas) y 'stands-' (excepcion
// puntual: BIEMH usa el plural por decision editorial). Cualquier otro prefijo
// rompe el build: la regla 301 generica del .htaccess secuestraria esa URL.
const OK = /^stands?-/;
const bad = fairsData.filter((f) => !OK.test(f.slug));
if (bad.length) {
  console.error(`[check-fair-slugs] ✘ ${bad.length} feria(s) con un prefijo de slug no admitido (se espera stand- o stands-):`);
  bad.forEach((f) => console.error(`   - ${f.slug} (${f.name})`));
  console.error('   Renombra el slug a stand-<feria>-<ciudad> en fairsData.js (y sus referencias).');
  process.exit(1);
}
console.log(`[check-fair-slugs] ✔ OK — las ${fairsData.length} ferias usan un prefijo de slug admitido (stand- / stands-).`);
