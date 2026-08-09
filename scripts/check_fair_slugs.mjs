// Guardián de build: TODAS las ferias deben usar el patrón de slug
// stand-<feria>-<ciudad>. Existe porque el .htaccess lleva una regla 301 GENÉRICA
// que redirige cualquier /ferias/<slug> sin el prefijo a /ferias/stand-<slug>:
// si una feria nueva se diera de alta sin el prefijo, su URL real quedaría
// inaccesible (la regla la redirigiría a una página inexistente). Este check
// rompe el build antes de que eso pueda llegar a producción.
import { fairsData } from '../src/lib/fairsData.js';

const bad = fairsData.filter((f) => !f.slug.startsWith('stand-'));
if (bad.length) {
  console.error(`[check-fair-slugs] ✘ ${bad.length} feria(s) sin el prefijo 'stand-' en su slug:`);
  bad.forEach((f) => console.error(`   - ${f.slug} (${f.name})`));
  console.error('   Renombra el slug a stand-<feria>-<ciudad> en fairsData.js (y sus referencias).');
  process.exit(1);
}
console.log(`[check-fair-slugs] ✔ OK — las ${fairsData.length} ferias usan el patrón stand-<feria>-<ciudad>.`);
