// Fechas de la PRÓXIMA edición de cada feria (y su periodicidad).
//
// Se usan para dar frescura a las fichas de feria (la respuesta directa muestra
// "En X (Ciudad - 28 & 29 abril 2027), Standarte diseña…") y como fuente de la
// línea de tiempo sectorial que orienta al cliente para contratar campañas
// multi-feria.
//
// REGLAS DE MANTENIMIENTO (importantes):
//  1. Solo se anotan fechas VERIFICADAS en fuente oficial (web de la feria o del
//     recinto). Una fecha equivocada en una página comercial es peor que ninguna:
//     ante la duda, se deja fuera. Por eso muchas ferias no aparecen aquí.
//  2. NO se extrapolan fechas de ediciones futuras a partir de la periodicidad.
//     EXCEPCION `approx: true`: cuando la organizacion confirma el AÑO pero aun no
//     las fechas, se anota con approx y el sitio muestra solo "2027 (por confirmar)",
//     nunca un dia concreto inventado. start/end solo se usan para ordenar.
//     Que una feria sea bienal no autoriza a inventar la edición de dentro de 2 años:
//     hasta que la organización la publica, la feria se queda sin fecha.
//  3. Las fechas CADUCAN. `scripts/check_fair_dates.mjs` avisa en cada build de las
//     que ya han pasado, para revisarlas. El propio sitio nunca muestra una fecha
//     pasada (ver `formatFairDates`), así que una fecha caducada degrada a "sin
//     fecha", nunca a un dato falso.
//
// Formato: slug de feria (fairsData) -> { start, end, cadence, source }
//   start/end : fecha ISO YYYY-MM-DD (misma fecha en ambas si dura un día)
//   cadence   : 'annual' | 'biennial' | 'triennial' | 'unknown'
//   source    : URL donde se verificó (para poder auditar y refrescar el dato)
export const fairDates = {
  'stand-fidma-gijon': { start: '2026-08-01', end: '2026-08-16', cadence: 'annual', source: 'https://recintoferialasturias.camaragijon.es/es/cargarAplicacionAgenda.do' },
  'stand-mercat-de-la-vall-andorra': { start: '2026-08-01', end: '2026-08-02', cadence: 'annual', source: 'https://www.agenda.ad/activitat/andorra-la-vella/fires-i-mercats/mercat-de-la-vall-21714' },
  'stand-fatacil-lagoa': { start: '2026-08-21', end: '2026-08-30', cadence: 'annual', source: 'https://www.cm-lagoa.pt/conhecer/eventos/evento/fatacil-2026' },
  'stand-belmoda-granada': { start: '2026-11-06', end: '2026-11-08', cadence: 'annual', source: 'https://fermasa.org/belmoda-salon-de-la-boda-y-la-comunion/' },
  'stand-festa-vinho-madeira': { start: '2026-08-23', end: '2026-09-13', cadence: 'annual', source: 'https://visitmadeira.com/en/whats-on/events/wine-festival/' },
  'stand-salamaq-salamanca': { start: '2026-09-03', end: '2026-09-07', cadence: 'annual', source: 'https://www.lasalina.es/noticias/fechassalamaq26.html' },
  'stand-cannes-yachting-festival': { start: '2026-09-08', end: '2026-09-13', cadence: 'annual', source: 'https://www.cannesyachtingfestival.com/en-gb/practical-information.html' },
  'stand-esra-congress-lisboa': { start: '2026-09-09', end: '2026-09-12', cadence: 'annual', source: 'https://esracongress.com/' },
  'stand-feria-navarra-ecologica-pamplona': { start: '2026-09-11', end: '2026-09-13', cadence: 'annual', source: 'https://www.navarraecologica.org/es/agenda-cursos-bio/xi-feria-navarra-ecologica' },
  'stand-autentica-sevilla': { start: '2026-09-14', end: '2026-09-15', cadence: 'annual', source: 'https://fibes.es/eventos/' },
  'stand-amb-stuttgart': { start: '2026-09-15', end: '2026-09-19', cadence: 'biennial', source: 'https://www.messe-stuttgart.de/amb/' },
  'stand-foro-greencities-malaga': { start: '2026-09-15', end: '2026-09-16', cadence: 'annual', source: 'https://greencities.fycma.com/greencities-se-celebrara-el-15-y-16-de-septiembre-y-reunira-a-gestores-municipales-con-el-objetivo-de-definir-soluciones-sostenibles-para-el-futuro-de-los-territorios/' },
  'stand-greencities-malaga': { start: '2026-09-15', end: '2026-09-16', cadence: 'annual', source: 'https://greencities.fycma.com/' },
  'stand-gse-expo-lisboa': { start: '2026-09-15', end: '2026-09-17', cadence: 'biennial', source: 'https://www.gse-expo-europe.com/visit' },
  'stand-andorra-taste': { start: '2026-09-16', end: '2026-09-20', cadence: 'annual', source: 'https://www.turiski.es/andorra-taste-2026-territorio-gastronomia-alta-montana/' },
  'stand-feciex-badajoz': { start: '2026-09-17', end: '2026-09-20', cadence: 'annual', source: 'https://feriabadajoz.es/ferias/feciex/' },
  'stand-fromago-cheese-experience-zamora': { start: '2026-09-17', end: '2026-09-20', cadence: 'biennial', source: 'https://fromago.info/en/' },
  'stand-portojoia-oporto': { start: '2026-09-17', end: '2026-09-20', cadence: 'annual', source: 'https://exponor.pt/portojoia/' },
  'stand-intercaza-cordoba': { start: '2026-09-18', end: '2026-09-20', cadence: 'annual', source: 'https://intercaza.com/' },
  'stand-cfia-toulouse': { start: '2026-09-22', end: '2026-09-24', cadence: 'biennial', source: 'https://toulouse.cfiaexpo.com/en' },
  'stand-farmaforum-madrid': { start: '2026-09-22', end: '2026-09-23', cadence: 'annual', source: 'https://www.ifema.es/farmaforum' },
  // FIAA no declara periodicidad en su web; el histórico de ediciones (2022, 2024, 2026) es bienal.
  'stand-fiaa-madrid': { start: '2026-09-22', end: '2026-09-24', cadence: 'biennial', source: 'https://www.ifema.es/fiaa' },
  'stand-morocco-food-expo-casablanca': { start: '2026-09-22', end: '2026-09-24', cadence: 'annual', source: 'https://www.moroccofoodexpo.com/' },
  'stand-sepem-industries-toulouse': { start: '2026-09-22', end: '2026-09-24', cadence: 'biennial', source: 'https://toulouse.sepem-industries.com/' },
  'stand-siema-casablanca': { start: '2026-09-22', end: '2026-09-24', cadence: 'annual', source: 'https://www.siemamaroc.com/' },
  'stand-the-district-madrid': { start: '2026-09-22', end: '2026-09-24', cadence: 'annual', source: 'https://www.esmadrid.com/agenda/district-ifema-madrid' },
  'stand-enerh2o-oporto': { start: '2026-09-23', end: '2026-09-24', cadence: 'annual', source: 'https://www.enerh2o.com/en/home-pt-english/' },
  'stand-bisutex-madrid': { start: '2026-09-24', end: '2026-09-27', cadence: 'annual', source: 'https://www.ifema.es/en/bisutex' },
  'stand-madridjoya-madrid': { start: '2026-09-24', end: '2026-09-27', cadence: 'annual', source: 'https://www.ifema.es/en/madrid-joya' },
  'stand-termatalia-ourense': { start: '2026-09-24', end: '2026-09-25', cadence: 'annual', source: 'https://www.termatalia.com/en/' },
  'stand-agropec-gijon': { start: '2026-09-25', end: '2026-09-27', cadence: 'annual', source: 'https://recintoferialasturias.camaragijon.es/es/cargarAplicacionAgenda.do' },
  'stand-foire-internationale-marseille': { start: '2026-09-25', end: '2026-10-05', cadence: 'annual', source: 'https://www.foiredemarseille.com/' },
  'stand-ibercaza-jaen': { start: '2026-09-25', end: '2026-09-27', cadence: 'annual', source: 'https://www.ifeja.org/ibercaza/contenidos.php?secc=109' },
  'stand-tfwa-cannes': { start: '2026-09-27', end: '2026-10-01', cadence: 'annual', source: 'https://www.tfwa.com/tfwa-world-exhibition-conference-2026' },
  'stand-espacio-cocina-sici-valencia': { start: '2026-09-28', end: '2026-10-01', cadence: 'biennial', source: 'https://espaciococina.feriavalencia.com/' },
  'stand-habitat-valencia': { start: '2026-09-28', end: '2026-10-01', cadence: 'annual', source: 'https://www.feriahabitatvalencia.com/' },
  'stand-textilhogar-valencia': { start: '2026-09-28', end: '2026-10-01', cadence: 'annual', source: 'https://www.textilhogar.com/' },
  'stand-aerospace-test-development-show-toulouse': { start: '2026-09-29', end: '2026-09-30', cadence: 'annual', source: 'https://aerotestdevelopmentshow.com/' },
  'stand-salon-gas-renovable-valladolid': { start: '2026-09-29', end: '2026-09-30', cadence: 'annual', source: 'https://www.salondelgasrenovable.com/en/' },
  'stand-feria-internacional-ganadera-zafra': { start: '2026-10-01', end: '2026-10-06', cadence: 'annual', source: 'https://fig.zafra.es/' },
  'stand-san-diego-comic-con-malaga': { start: '2026-10-01', end: '2026-10-04', cadence: 'annual', source: 'https://sandiegocomicconmalaga.com/' },
  'stand-conxemar-vigo': { start: '2026-10-06', end: '2026-10-08', cadence: 'annual', source: 'https://www.conxemar.com/es/feria/' },
  'stand-eurobrico-valencia': { start: '2026-10-06', end: '2026-10-08', cadence: 'biennial', source: 'https://eurobrico.feriavalencia.com/eurobrico-fija-sus-fechas-para-2026-junto-a-iberflora-y-refuerza-su-apuesta-por-el-comprador-internacional/' },
  'stand-fruit-attraction-madrid': { start: '2026-10-06', end: '2026-10-08', cadence: 'annual', source: 'https://www.ifema.es/en/fruit-attraction' },
  'stand-iberflora-valencia': { start: '2026-10-06', end: '2026-10-08', cadence: 'annual', source: 'https://iberflora.feriavalencia.com/iberflora-cierra-fechas-para-2026-del-6-al-8-de-octubre-en-feria-valencia/' },
  'stand-preventica-lyon': { start: '2026-10-06', end: '2026-10-08', cadence: 'unknown', source: 'https://www.preventica.com/salon/lyon-2026' },
  'stand-sommet-elevage-clermont-ferrand': { start: '2026-10-06', end: '2026-10-09', cadence: 'annual', source: 'https://www.sommet-elevage.fr/en' },
  'stand-tis-sevilla': { start: '2026-10-06', end: '2026-10-08', cadence: 'annual', source: 'https://one.gob.es/en/diary/tourism-innovation-summit-2026' },
  'stand-canarias-destino-startup': { start: '2026-10-07', end: '2026-10-09', cadence: 'annual', source: 'https://www.canariasdestinostartup.com/en' },
  'stand-viv-habitat-perpignan': { start: '2026-10-09', end: '2026-10-12', cadence: 'annual', source: 'https://www.congres-perpignan.com/events/viv-habitat/' },
  'stand-esicm-lives-lisboa': { start: '2026-10-10', end: '2026-10-14', cadence: 'annual', source: 'https://www.esicm.org/events/39th-annual-congress-lisbon/' },
  'stand-medagri-avignon': { start: '2026-10-13', end: '2026-10-15', cadence: 'biennial', source: 'https://www.med-agri.com/' },
  'stand-siane-toulouse': { start: '2026-10-13', end: '2026-10-15', cadence: 'annual', source: 'https://www.salonsiane.com/en/' },
  'stand-world-aviation-festival-lisboa': { start: '2026-10-13', end: '2026-10-15', cadence: 'annual', source: 'https://www.terrapinn.com/conference/aviation-festival/index.stm' },
  'stand-salon-mariage-perpignan': { start: '2026-10-17', end: '2026-10-18', cadence: 'annual', source: 'https://www.congres-perpignan.com/events/salon-du-mariage-2026/' },
  'stand-fecons-torre-pacheco': { start: '2026-10-22', end: '2026-10-24', cadence: 'biennial', source: 'https://ifepa.es/fecons/' },
  'stand-fira-andorra-la-vella': { start: '2026-10-23', end: '2026-10-25', cadence: 'annual', source: 'https://elperiodic.ad/parroquies/les-empreses-ja-poden-inscriures-per-participar-en-la-47a-fira-dandorra-la-vella-que-se-celebrara-a-loctubre/' },
  'stand-in-beauty-lisboa': { start: '2026-10-24', end: '2026-10-26', cadence: 'annual', source: 'https://exponor.pt/in-beauty/' },
  'stand-gastronoma-valencia': { start: '2026-10-26', end: '2026-10-28', cadence: 'annual', source: 'https://www.gastronoma.es/' },
  'stand-baleart-mallorca': { start: '2026-10-29', end: '2026-11-01', cadence: 'annual', source: 'https://www.fibwidiario.com/articulo/cultura/baleart-2026-abre-inscripciones-incorporando-novedades-artesanos-baleares/20260709115509322386.html' },
  'stand-expo-agritech-malaga': { start: '2026-11-03', end: '2026-11-05', cadence: 'annual', source: 'https://www.expoagritech.com/' },
  'stand-mapic-cannes': { start: '2026-11-03', end: '2026-11-04', cadence: 'annual', source: 'https://www.mapic.com/' },
  'stand-maroc-in-mode-mim-casablanca': { start: '2026-11-03', end: '2026-11-05', cadence: 'annual', source: 'https://mim.org.ma/' },
  'stand-sett-montpellier': { start: '2026-11-03', end: '2026-11-05', cadence: 'annual', source: 'https://www.salonsett.com/fr/infos-pratiques/dates-et-acces' },
  'stand-smart-city-expo-world-congress-barcelona': { start: '2026-11-03', end: '2026-11-05', cadence: 'annual', source: 'https://www.smartcityexpo.com/the-event/' },
  'stand-decor-hotel-oporto': { start: '2026-11-04', end: '2026-11-06', cadence: 'biennial', source: 'https://exposalao.pt/feira/decor_hotel' },
  'stand-expocarne-oporto': { start: '2026-11-04', end: '2026-11-06', cadence: 'biennial', source: 'https://exposalao.pt/feira/expocarne' },
  'stand-madrid-tech-show': { start: '2026-11-04', end: '2026-11-05', cadence: 'annual', source: 'https://www.ifema.es/stand-madrid-tech-show' },
  'stand-fehispor-badajoz': { start: '2026-11-05', end: '2026-11-08', cadence: 'annual', source: 'https://www.feriabadajoz.es/evento/fehispor/' },
  'stand-essencia-do-vinho-lisboa': { start: '2026-11-07', end: '2026-11-09', cadence: 'annual', source: 'https://www.essenciadovinho.com/' },
  'stand-herofestival-marseille': { start: '2026-11-07', end: '2026-11-08', cadence: 'annual', source: 'https://www.herofestival.fr/' },
  'stand-web-summit-lisboa': { start: '2026-11-09', end: '2026-11-12', cadence: 'annual', source: 'https://websummit.com/web-summit-2026/' },
  'stand-fimma-maderalia-valencia': { start: '2026-11-10', end: '2026-11-13', cadence: 'biennial', source: 'https://fimma-maderalia.feriavalencia.com/noticias/fimma-maderalia-celebrara-su-proxima-edicion-del-10-al-13-de-noviembre-de-2026/' },
  'stand-piscimad-madrid': { start: '2026-11-10', end: '2026-11-13', cadence: 'biennial', source: 'https://www.ifema.es/en/piscimad' },
  'stand-smart-doors-madrid': { start: '2026-11-10', end: '2026-11-13', cadence: 'biennial', source: 'https://www.ifema.es/en/smart-doors' },
  'stand-veteco-madrid': { start: '2026-11-10', end: '2026-11-13', cadence: 'biennial', source: 'https://www.ifema.es/en/veteco' },
  'stand-empack-madrid': { start: '2026-11-11', end: '2026-11-12', cadence: 'annual', source: 'https://www.empackmadrid.com/en/empack-packaging-innovations-madrid/about-us/stand-empack-madrid/' },
  'stand-expometal-batalha': { start: '2026-11-11', end: '2026-11-13', cadence: 'biennial', source: 'https://exposalao.pt/pt/feira/expometal' },
  'stand-tanger-nexus': { start: '2026-11-11', end: '2026-11-15', cadence: 'annual', source: 'https://www.nexusexposummit.com/en/live' },
  'stand-expodeca': { start: '2026-11-12', end: '2026-11-15', cadence: 'annual', source: 'https://infecar.es/ferias-y-eventos/expodeca-2026-feria-de-la-actividad-fisica-y-el-deporte-de-canarias/' },
  'stand-intur-valladolid': { start: '2026-11-12', end: '2026-11-15', cadence: 'annual', source: 'https://feriavalladolid.com/intur/' },
  'stand-simed-malaga': { start: '2026-11-12', end: '2026-11-14', cadence: 'annual', source: 'https://fycma.com/simed-2026-strengthens-its-international-reach-in-a-new-edition-focused-on-public-private-collaboration-investment-and-applied-innovation/' },
  'stand-salon-look-madrid': { start: '2026-11-13', end: '2026-11-15', cadence: 'annual', source: 'https://www.ifema.es/en/look' },
  'stand-beauty-profs-marseille': { start: '2026-11-14', end: '2026-11-15', cadence: 'annual', source: 'https://beauty-profs.com/en/' },
  'stand-pegs-europe-lisboa': { start: '2026-11-16', end: '2026-11-19', cadence: 'annual', source: 'https://www.pegsummiteurope.com/' },
  'stand-ibt-cote-azur': { start: '2026-11-17', end: '2026-11-17', cadence: 'annual', source: 'https://www.cote-azur.cci.fr/exposez-a-ibt-cote-dazur-le-rdv-de-lindustrie-et-de-la-construction-azureennes/' },
  'stand-piscine-global-lyon': { start: '2026-11-17', end: '2026-11-20', cadence: 'biennial', source: 'https://www.piscine-global.com/en' },
  'stand-concreta-oporto': { start: '2026-11-18', end: '2026-11-21', cadence: 'annual', source: 'https://exponor.pt/concreta/' },
  'stand-ctw-china-trade-week-casablanca': { start: '2026-11-18', end: '2026-11-20', cadence: 'annual', source: 'https://ctwmorocco.com/' },
  'stand-eletrica-oporto': { start: '2026-11-18', end: '2026-11-21', cadence: 'biennial', source: 'https://exponor.pt/en/event-calendar/' },
  'stand-visa-for-music-rabat': { start: '2026-11-18', end: '2026-11-21', cadence: 'annual', source: 'https://visaformusic.com/en/home/' },
  'stand-cascais-international-health-forum': { start: '2026-09-24', end: '2026-09-25', cadence: 'annual', source: 'https://cascaisinternationalhealthforum.com/' },
  'stand-cioc-lisboa': { start: '2026-11-19', end: '2026-11-21', cadence: 'annual', source: 'https://www.omd.pt/congresso/2026/en/' },
  'stand-savim-marseille': { start: '2026-11-20', end: '2026-11-23', cadence: 'annual', source: 'https://www.salons-savim.fr/marseille/infos-pratiques-salon-savim-marseille/' },
  'stand-genera-madrid': { start: '2026-11-24', end: '2026-11-26', cadence: 'annual', source: 'https://www.ifema.es/en/genera' },
  'stand-sepem-industries-sud-est-grenoble': { start: '2026-11-24', end: '2026-11-26', cadence: 'biennial', source: 'https://grenoble.sepem-industries.com/content/practical-information' },
  'stand-sps-nuremberg': { start: '2026-11-24', end: '2026-11-26', cadence: 'annual', source: 'https://sps.mesago.com/nuernberg/en.html' },
  'stand-elec-expo-casablanca': { start: '2026-11-25', end: '2026-11-28', cadence: 'annual', source: 'https://elecexpo.ma/en/' },
  'stand-ener-event-casablanca': { start: '2026-11-25', end: '2026-11-28', cadence: 'annual', source: 'https://global-events.ma/en/class/elec-expo/' },
  'stand-solucop-nice': { start: '2026-11-26', end: '2026-11-27', cadence: 'annual', source: 'https://www.solucop.com/nice/' },
  'stand-aeromart-toulouse': { start: '2026-12-01', end: '2026-12-03', cadence: 'biennial', source: 'https://stand-aeromart-toulouse.com/' },
  'stand-vinitech-sifel-bordeaux': { start: '2026-12-01', end: '2026-12-03', cadence: 'biennial', source: 'https://www.vinitech-sifel.com/en' },
  'stand-energaia-montpellier': { start: '2026-12-09', end: '2026-12-10', cadence: 'annual', source: 'https://www.energaia.fr/en/' },
  'stand-iberocio-badajoz': { start: '2026-12-26', end: '2026-12-30', cadence: 'annual', source: 'https://www.feriabadajoz.es/evento/iberocio/' },
  'stand-fitur-madrid': { start: '2027-01-20', end: '2027-01-24', cadence: 'annual', source: 'https://www.ifema.es/en/fitur' },
  'stand-sirha-lyon': { start: '2027-01-21', end: '2027-01-25', cadence: 'biennial', source: 'https://www.stand-sirha-lyon.com/en' },
  'stand-millesime-bio-montpellier': { start: '2027-01-25', end: '2027-01-27', cadence: 'annual', source: 'https://www.millesime-bio.com/en/' },
  'stand-agraria-valladolid': { start: '2027-01-26', end: '2027-01-29', cadence: 'biennial', source: 'https://feriavalladolid.com/agraria/' },
  'stand-enomaq-zaragoza': { start: '2027-01-26', end: '2027-01-28', cadence: 'biennial', source: 'https://www.feriazaragoza.es/enomaq' },
  'stand-oleomaq-zaragoza': { start: '2027-01-26', end: '2027-01-28', cadence: 'biennial', source: 'https://www.feriazaragoza.es/enomaq' },
  'stand-tecnovid-zaragoza': { start: '2027-01-26', end: '2027-01-28', cadence: 'biennial', source: 'https://www.feriazaragoza.es/enomaq' },
  'stand-madrid-fusion': { start: '2027-02-01', end: '2027-02-03', cadence: 'annual', source: 'https://www.ifema.es/stand-madrid-fusion' },
  'stand-ise-barcelona': { start: '2027-02-02', end: '2027-02-05', cadence: 'annual', source: 'https://www.iseurope.org/location-opening-hours' },
  'stand-intergift-madrid': { start: '2027-02-03', end: '2027-02-06', cadence: 'annual', source: 'https://www.ifema.es/en/intergift' },
  'stand-salon-estudiante-futuro-profesional-pamplona': { start: '2027-02-04', end: '2027-02-05', cadence: 'annual', source: 'https://baluarte.com/es/agenda/evento/salon-del-estudiante-y-el-empleo-4-5-febrero-2027' },
  'stand-barcelona-wine-week': { start: '2027-02-08', end: '2027-02-10', cadence: 'annual', source: 'https://www.barcelonawineweek.com/en/' },
  'stand-horeca-baleares-mallorca': { start: '2027-02-08', end: '2027-02-10', cadence: 'annual', source: 'https://horecabaleares.com/' },
  'stand-ht-malaga': { start: '2027-02-08', end: '2027-02-10', cadence: 'annual', source: 'https://fycma.com/ht-2027-tendra-lugar-del-8-al-10-de-febrero-de-2027-con-una-oferta-ampliada-y-mayor-proyeccion-internacional/' },
  'stand-siprho-montpellier': { start: '2027-02-08', end: '2027-02-10', cadence: 'annual', source: 'https://www.siprho.com/' },
  'stand-sirha-mediterranee-marseille': { start: '2027-02-14', end: '2027-02-16', cadence: 'annual', source: 'https://www.sirha-mediterranee.com/en' },
  'stand-lisbon-food-affair': { start: '2027-02-15', end: '2027-02-17', cadence: 'annual', source: 'https://lisbonfoodaffair.fil.pt/' },
  'stand-wine-paris': { start: '2027-02-15', end: '2027-02-17', cadence: 'annual', source: 'https://wineparis.com/opening-hours-access-and-map' },
  'stand-smagua-zaragoza': { start: '2027-02-16', end: '2027-02-18', cadence: 'biennial', source: 'https://www.feriazaragoza.es/en/smagua' },
  'stand-expofimer-zaragoza': { start: '2027-03-10', end: '2027-03-11', cadence: 'annual', source: 'https://www.feriazaragoza.es/expofimer' },
  'stand-spaper-zaragoza': { start: '2027-02-16', end: '2027-02-18', cadence: 'biennial', source: 'https://www.feriazaragoza.es/spaper' },
  'stand-essencia-do-vinho-porto': { start: '2027-02-18', end: '2027-02-21', cadence: 'annual', source: 'https://www.essenciadovinho.com/' },
  'stand-feria-turismo-reyno-navarra-pamplona': { start: '2027-02-19', end: '2027-02-21', cadence: 'annual', source: 'https://navartur.es/' },
  'stand-navartur-pamplona': { start: '2027-02-19', end: '2027-02-21', cadence: 'annual', source: 'https://navartur.es/' },
  'stand-addit3d-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://www.metalindustria.com/noticias/20260721/bedigital-acompanando-industria-en-su-transformacion-digital' },
  'stand-bedigital-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://www.metalindustria.com/noticias/20260721/bedigital-acompanando-industria-en-su-transformacion-digital' },
  'stands-maintenance-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://bilbaoexhibitioncentre.com/en/eventos/maintenance-bilbao-2027/' },
  'stands-pumps-valves-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://bilbaoexhibitioncentre.com/en/eventos/pumps-valves-2027/' },
  'stands-subcontratacion-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://www.camarabilbao.com/empresa/soluciones-empresariales/subcontratacion-industrial/subcontex-abre-inscripcion-participar-industry-bilbao-202604221026/' },
  'stand-feria-de-los-mayores-de-extremadura-badajoz': { start: '2027-02-25', end: '2027-02-28', cadence: 'annual', source: 'https://feriabadajoz.es/ferias/feria-de-mayores/' },
  'stand-mwc-barcelona': { start: '2027-03-01', end: '2027-03-04', cadence: 'annual', source: 'https://www.mwcbarcelona.com/about' },
  'stand-jec-world-paris': { start: '2027-03-02', end: '2027-03-04', cadence: 'annual', source: 'https://www.jec-world.events/' },
  'stand-arcomadrid': { start: '2027-03-03', end: '2027-03-07', cadence: 'annual', source: 'https://www.ifema.es/en/arco/madrid' },
  'stand-btl-lisboa': { start: '2027-03-03', end: '2027-03-07', cadence: 'annual', source: 'https://btl.fil.pt/' },
  'stand-biocultura-a-coruna': { start: '2027-03-05', end: '2027-03-07', cadence: 'annual', source: 'https://www.biocultura.org/acoruna/informacion-expositores' },
  'stand-prowein-dusseldorf': { start: '2027-03-07', end: '2027-03-09', cadence: 'annual', source: 'https://www.prowein.de/de/Daten_Fakten' },
  'stand-marine-energy-week-bilbao': { start: '2027-03-09', end: '2027-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/construccion-naval/652560-World-Maritime-Week-2027-confirma-primeras-empresas-instituciones-sexta-edicion-Bilbao.html' },
  'stand-world-maritime-week-bilbao': { start: '2027-03-09', end: '2027-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/construccion-naval/652560-World-Maritime-Week-2027-confirma-primeras-empresas-instituciones-sexta-edicion-Bilbao.html' },
  'stand-ferroforma-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://www.neventum.com/tradeshows/ferroforma' },
  'stand-sinaval-bilbao': { start: '2027-03-09', end: '2027-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/construccion-naval/652560-World-Maritime-Week-2027-confirma-primeras-empresas-instituciones-sexta-edicion-Bilbao.html' },
  'stand-eurofishing-bilbao': { start: '2027-03-09', end: '2027-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/construccion-naval/652560-World-Maritime-Week-2027-confirma-primeras-empresas-instituciones-sexta-edicion-Bilbao.html' },
  'stand-pick-pack-bilbao': { start: '2027-05-26', end: '2027-05-27', cadence: 'annual', source: 'https://www.neventum.com/tradeshows/pickpack' },
  'stand-futureport-bilbao': { start: '2027-03-09', end: '2027-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/construccion-naval/652560-World-Maritime-Week-2027-confirma-primeras-empresas-instituciones-sexta-edicion-Bilbao.html' },
  'stand-steel-tech-bilbao': { start: '2027-10-19', end: '2027-10-21', cadence: 'biennial', source: 'https://steeltech.bilbaoexhibitioncentre.com/' },
  'stand-expovacaciones-bilbao': { start: '2026-05-08', end: '2026-05-10', cadence: 'annual', source: 'https://expovacaciones.bilbaoexhibitioncentre.com/' },
  'stand-egurtek-bilbao': { start: '2026-10-28', end: '2026-10-29', cadence: 'biennial', source: 'https://bilbaoexhibitioncentre.com/eventos/egurtek-2026/' },
  'stand-canagua-energia-gran-canaria': { start: '2026-10-21', end: '2026-10-23', cadence: 'biennial', source: 'https://infecar.es/en/ferias-y-eventos/15th-canagua-and-energy-international-fair/' },
  'stand-mmh-sevilla': { start: '2026-10-20', end: '2026-10-22', cadence: 'biennial', source: 'https://mmhevent.com/' },
  'stand-advanced-manufacturing-madrid': { start: '2026-11-04', end: '2026-11-05', cadence: 'annual', source: 'https://www.ifema.es/advanced-manufacturing-madrid' },
  'stand-hip-madrid': { start: '2027-03-01', end: '2027-03-03', cadence: 'annual', source: 'https://www.ifema.es/hip' },
  'stand-meat-attraction-madrid': { start: '2027-02-16', end: '2027-02-18', cadence: 'biennial', source: 'https://www.ifema.es/en/meat-attraction/news/dates-2027' },
  'stand-sicur-madrid': { start: '2026-02-24', end: '2026-02-27', cadence: 'biennial', source: 'https://www.ifema.es/en/sicur' },
  'stand-lisboa-games-week': { start: '2026-11-19', end: '2026-11-22', cadence: 'annual', source: 'https://fil.lisbonvenues.pt/en/events/fil/lisboa-games-week/' },
  'stand-nauticampo-lisboa': { start: '2026-02-12', end: '2026-02-16', cadence: 'annual', source: 'https://www.fil.pt/a-nauticampo-esta-de-regresso-de-12-a-16-de-fevereiro-na-fil/' },
  'stand-f4f-expo-foodtech-bilbao': { start: '2027-05-26', end: '2027-05-27', cadence: 'annual', source: 'https://www.expofoodtech.com/' },
  'stand-gustoko-bilbao': { start: '2026-03-13', end: '2026-03-15', cadence: 'annual', source: 'https://gustoko.bilbaoexhibitioncentre.com/' },
  'stand-optom-madrid': { start: '2026-04-09', end: '2026-04-11', cadence: 'biennial', source: 'https://www.optomcongreso.com/' },
  'stand-ciocv-braga': { start: '2026-05-30', end: '2026-05-31', cadence: 'annual', source: 'https://www.opticapro.pt/2025/11/26/23-a-edicao-do-ciocv-marcada-para-maio-de-2026/' },
  'stand-seo-oftalmologia': { start: '2026-09-23', end: '2026-09-25', cadence: 'annual', source: 'https://paao.org/events/spain-2026/' },
  'stand-secoir-cirugia-ocular': { start: '2027-05-19', end: '2027-05-21', cadence: 'annual', source: 'https://secoir.org/congresos/' },
  'stand-rno-reunion-nacional-optica': { start: '2024-07-03', end: '2024-07-05', cadence: 'triennial', source: 'https://www.rno2024.es/' },
  'stand-interior-exterior-design-meetings-cannes': { start: '2026-11-24', end: '2026-11-26', cadence: 'annual', source: 'https://www.interior-exterior-design-meetings.fr/en/' },
  'stand-plus-industry-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://bilbaoexhibitioncentre.com/en/eventos/industry-2027/' },
  'stand-wear-bilbao': { start: '2027-02-23', end: '2027-02-25', cadence: 'biennial', source: 'https://bilbaoexhibitioncentre.com/en/eventos/industry-2027/' },
  'stand-iberpet-madrid': { start: '2027-03-10', end: '2027-03-12', cadence: 'annual', source: 'https://www.ifema.es/en/iberpet' },
  'stand-salon-vins-vignerons-independants-bordeaux': { start: '2027-03-12', end: '2027-03-14', cadence: 'annual', source: 'https://www.vignerons-independants.com/agenda-des-salons/bordeaux-2027' },
  'stand-global-industrie-lyon': { start: '2027-03-15', end: '2027-03-18', cadence: 'annual', source: 'https://www.global-industrie.com/' },
  'stands-figan-zaragoza': { start: '2027-03-16', end: '2027-03-19', cadence: 'biennial', source: 'https://www.feriazaragoza.es/figan' },
  'stand-infarma': { start: '2027-03-16', end: '2027-03-18', cadence: 'annual', source: 'https://www.stand-infarma.es/' },
  'stand-logimat-stuttgart': { start: '2027-03-16', end: '2027-03-18', cadence: 'annual', source: 'https://www.logimat-messe.de/en' },
  'stand-mipim-cannes': { start: '2027-03-16', end: '2027-03-19', cadence: 'annual', source: 'https://www.mipim.com/en-gb.html' },
  'stand-rebuild-madrid': { start: '2027-03-16', end: '2027-03-18', cadence: 'annual', source: 'https://www.interempresas.net/Construccion/652055-Rebuild-2027-pondra-foco-integracion-sistemas-impulsar-construccion-industrializada.html' },
  'stand-futuralia-lisboa': { start: '2027-03-17', end: '2027-03-20', cadence: 'annual', source: 'https://futuralia.fil.pt/' },
  'stand-siac-marseille': { start: '2027-03-19', end: '2027-03-22', cadence: 'annual', source: 'https://stand-siac-marseille.fr/visiter-le-siac/' },
  'stand-bepositive-lyon': { start: '2027-03-31', end: '2027-04-02', cadence: 'biennial', source: 'https://www.bepositive-events.com/en/practical-information' },
  'stand-morocco-textile-expo-casablanca': { start: '2027-04-01', end: '2027-04-04', cadence: 'annual', source: 'https://moroccofashiontex.net/' },
  'stand-forum-gastronomico-a-coruna': { start: '2027-04-04', end: '2027-04-06', cadence: 'biennial', source: 'https://www.vinetur.com/20260609102344/galicia-forum-gastronomico-abre-la-venta-de-espacios-para-su-edicion-de-2027.html' },
  'stand-hannover-messe': { start: '2027-04-05', end: '2027-04-08', cadence: 'annual', source: 'https://www.hannovermesse.de/en/for-visitors/opening-hours/' },
  'stand-sagalexpo-lisboa': { start: '2027-04-05', end: '2027-04-07', cadence: 'annual', source: 'https://sagalexpo.pt/' },
  'stand-motortec-madrid': { start: '2027-04-07', end: '2027-04-10', cadence: 'biennial', source: 'https://www.ifema.es/en/motortec' },
  'stand-foire-internationale-toulouse': { start: '2027-04-09', end: '2027-04-18', cadence: 'annual', source: 'https://www.foiredetoulouse.com/infos-pratiques' },
  'stand-automobile-barcelona': { start: '2027-04-10', end: '2027-04-18', cadence: 'biennial', source: 'https://www.automobilebarcelona.com/en/' },
  'stand-feaga-fuerteventura': { start: '2027-04-15', end: '2027-04-18', cadence: 'annual', source: 'https://feaga.net/' },
  'stand-seafood-expo-global-barcelona': { start: '2027-04-20', end: '2027-04-22', cadence: 'annual', source: 'https://www.seafoodexpo.com/global/' },
  'stand-sil-lisboa': { start: '2027-04-22', end: '2027-04-24', cadence: 'annual', source: 'https://imobiliario.fil.pt/' },
  'stand-tektonica-lisboa': { start: '2027-04-22', end: '2027-04-24', cadence: 'unknown', source: 'https://tektonica.fil.pt/' },
  'stand-salon-gourmets-madrid': { start: '2027-04-26', end: '2027-04-29', cadence: 'annual', source: 'https://www.gourmets.net/salon-gourmets/visitar/datos-de-interes' },
  'stand-empack-oporto': { start: '2027-04-28', end: '2027-04-29', cadence: 'annual', source: 'https://www.empacklogisticsautomationporto.com/en/' },
  'stand-medfel-perpignan': { start: '2027-04-28', end: '2027-04-29', cadence: 'annual', source: 'https://medfel.com/' },
  'stand-palma-international-boat-show': { start: '2027-04-28', end: '2027-05-01', cadence: 'annual', source: 'https://palmainternationalboatshow.com/' },
  'stand-palma-superyacht-village': { start: '2027-04-28', end: '2027-05-01', cadence: 'annual', source: 'https://palmasuperyachtvillage.com/' },
  'stand-hispack-barcelona': { start: '2027-05-04', end: '2027-05-07', cadence: 'triennial', source: 'https://www.hispack.com/en/general-information/' },
  'stand-infoagro-exhibition-aguadulce': { start: '2027-05-05', end: '2027-05-07', cadence: 'biennial', source: 'https://www.infoagro.com/noticias/2026/los_caminos_de_quienes_lideran_el_agro_volveran_a_encontrarse_en_infoa.asp' },
  'stand-stone-iberica-batalha': { start: '2027-05-06', end: '2027-05-08', cadence: 'biennial', source: 'https://exposalao.pt/feiras' },
  'stand-itf-intertex-oporto': { start: '2027-05-11', end: '2027-05-13', cadence: 'annual', source: 'https://intertexportugal.com/' },
  'stand-expoliva-jaen': { start: '2027-05-12', end: '2027-05-15', cadence: 'biennial', source: 'https://oleumxauen.es/la-organizacion-de-expoliva-2027-fija-la-celebracion-de-la-muestra-bienal-entre-el-12-y-el-15-de-mayo-antes-de-las-elecciones-municipales/' },
  'stand-solar-storage-live-espana-valencia': { start: '2027-05-12', end: '2027-05-13', cadence: 'annual', source: 'https://www.terrapinn.com/exhibition/solar-storage-live-espana/index.stm' },
  'stand-construmat-barcelona': { start: '2027-05-18', end: '2027-05-20', cadence: 'biennial', source: 'https://www.construmat.com/en/evento/' },
  'stand-airspace-world-lisboa': { start: '2027-05-25', end: '2027-05-27', cadence: 'annual', source: 'https://airspaceworld.com/' },
  'stand-asturforesta-tineo': { start: '2027-05-27', end: '2027-05-29', cadence: 'biennial', source: 'https://www.asturforesta.es/' },
  'stand-emaf-oporto': { start: '2027-06-01', end: '2027-06-04', cadence: 'biennial', source: 'https://exponor.pt/emaf/' },
  'stand-cycleau-nouvelle-aquitaine-bordeaux': { start: '2027-06-02', end: '2027-06-03', cadence: 'biennial', source: 'https://www.cycleau.fr/evenements/cycl-eau-bordeaux-nouvelle-aquitaine' },
  'stand-des-malaga': { start: '2027-06-08', end: '2027-06-10', cadence: 'annual', source: 'https://www.des-show.com/es/' },
  'stand-sil-barcelona': { start: '2027-06-09', end: '2027-06-11', cadence: 'annual', source: 'https://www.silbcn.com/en/' },
  'stand-ecuextre-badajoz': { start: '2027-06-10', end: '2027-06-13', cadence: 'annual', source: 'https://feriabadajoz.es/ferias/ecuextre-y-toro/' },
  'stand-automatica-munich': { start: '2027-06-22', end: '2027-06-25', cadence: 'biennial', source: 'https://stand-automatica-munich.com/en/' },
  'stand-agroglobal-santarem': { start: '2027-09-07', end: '2027-09-09', cadence: 'biennial', source: 'https://www.agroportal.pt/agroglobal-2027-a-maior-feira-agricola-profissional-da-iberia/' },
  'stand-labelexpo-barcelona': { start: '2027-10-05', end: '2027-10-08', cadence: 'biennial', source: 'https://www.loupe-europe.com/' },
  'stand-pollutec-lyon': { start: '2027-10-12', end: '2027-10-15', cadence: 'biennial', source: 'https://www.pollutec.com/en-gb/practical-info.html' },
  'stand-piscina-wellness-barcelona': { start: '2027-11-15', end: '2027-11-18', cadence: 'biennial', source: 'https://www.piscinabarcelona.es/' },
  'stand-prod-pack-lyon': { start: '2027-11-16', end: '2027-11-18', cadence: 'biennial', source: 'https://www.prodandpack.com/en/practical-informations' },
  'stand-smahrt-toulouse': { start: '2028-01-30', end: '2028-02-01', cadence: 'biennial', source: 'https://www.smahrt.com/en' },
  'stand-euromaritime-marseille': { start: '2028-02-01', end: '2028-02-03', cadence: 'biennial', source: 'https://www.euromaritime.fr/' },
  // Ano confirmado por la periodicidad bienal y la edicion de 2025; IFEMA aun no
  // publica los dias, asi que va como aproximada (se muestra solo el ano).
  'stand-hygienalia-madrid': { start: '2027-11-01', end: '2027-11-30', cadence: 'biennial', approx: true, source: 'https://www.hygienalia.com/' },
  'stands-biemh-bilbao': { start: '2028-03-06', end: '2028-03-10', cadence: 'biennial', source: 'https://www.interempresas.net/MetalMecanica/624748-BIEMH-cierra-su-edicion-de-2026-como-referente-del-manufacturing-avanzado.html' },
  'stand-alimentaria-barcelona': { start: '2028-03-20', end: '2028-03-23', cadence: 'biennial', source: 'https://www.alimentaria.com/' },
  'stand-hostelco-barcelona': { start: '2028-03-20', end: '2028-03-23', cadence: 'biennial', source: 'https://www.hostelco.com/en/' },
  'stand-bauma-munich': { start: '2028-04-03', end: '2028-04-09', cadence: 'triennial', source: 'https://bauma.de/en/trade-fair/' },
  'stand-mountain-planet-grenoble': { start: '2028-04-11', end: '2028-04-13', cadence: 'biennial', source: 'https://www.mountain-planet.com/en/' },
  'stand-expooptica-madrid': { start: '2028-04-23', end: '2028-04-25', cadence: 'biennial', source: 'https://www.ifema.es/en/expooptica' },
  'stand-navalia-vigo': { start: '2028-05-23', end: '2028-05-25', cadence: 'biennial', source: 'https://www.navalia.es/es/' }
};

/** Periodicidad de una feria, en los 11 idiomas (para la línea de tiempo). */
// Sufijo para fechas aproximadas (`approx: true`): el año es firme, el día no.
export const approxLabels = {
  es: 'por confirmar', pt: 'por confirmar', en: 'to be confirmed', de: 'noch offen',
  fr: 'à confirmer', it: 'da confermare', nl: 'nog te bevestigen', zh: '待定',
  hi: 'पुष्टि होनी बाकी', ko: '미정', ja: '未定'
};

export const cadenceLabels = {
  annual: { es: 'anual', en: 'annual', de: 'jährlich', pt: 'anual', fr: 'annuel', it: 'annuale', nl: 'jaarlijks', zh: '每年', hi: 'वार्षिक', ko: '매년', ja: '毎年' },
  biennial: { es: 'bienal', en: 'biennial', de: 'zweijährlich', pt: 'bienal', fr: 'biennal', it: 'biennale', nl: 'tweejaarlijks', zh: '每两年', hi: 'द्विवार्षिक', ko: '격년', ja: '隔年' },
  triennial: { es: 'trienal', en: 'triennial', de: 'dreijährlich', pt: 'trienal', fr: 'triennal', it: 'triennale', nl: 'driejaarlijks', zh: '每三年', hi: 'त्रिवार्षिक', ko: '3년마다', ja: '3年ごと' }
};

const MONTHS = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
};
// zh/ja/ko no usan nombre de mes: se formatean con cifras y sus propios sufijos.
const CJK = {
  zh: (y, m, d1, d2, m2) => m2 && m2 !== m
    ? `${y}年${m}月${d1}日-${m2}月${d2}日`
    : (d2 && d2 !== d1 ? `${y}年${m}月${d1}-${d2}日` : `${y}年${m}月${d1}日`),
  ja: (y, m, d1, d2, m2) => m2 && m2 !== m
    ? `${y}年${m}月${d1}日〜${m2}月${d2}日`
    : (d2 && d2 !== d1 ? `${y}年${m}月${d1}〜${d2}日` : `${y}年${m}月${d1}日`),
  ko: (y, m, d1, d2, m2) => m2 && m2 !== m
    ? `${y}년 ${m}월 ${d1}일~${m2}월 ${d2}일`
    : (d2 && d2 !== d1 ? `${y}년 ${m}월 ${d1}~${d2}일` : `${y}년 ${m}월 ${d1}일`)
};

/** Parte una fecha ISO en [año, mes(1-12), día] sin depender de la zona horaria. */
function parseISO(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? [+m[1], +m[2], +m[3]] : null;
}

/**
 * Fecha de la próxima edición ya formateada para mostrar, o null si la feria no
 * tiene fecha registrada o si la que hay YA HA PASADO (nunca se muestra una
 * fecha caducada: es preferible no decir nada).
 *
 * @param {string} slug  slug de la feria (fairsData)
 * @param {string} lang  idioma de la página
 * @param {string} today fecha ISO de referencia (por defecto, hoy)
 */
export function formatFairDates(slug, lang = 'es', today = null) {
  {
    const e = fairDates[slug];
    if (e && e.approx && e.start) {
      const ref0 = today || new Date().toISOString().slice(0, 10);
      if ((e.end || e.start) < ref0) return null;
      const lbl = approxLabels[lang] || approxLabels.es;
      return `${e.start.slice(0, 4)} (${lbl})`;
    }
  }
  const entry = fairDates[slug];
  if (!entry || !entry.start) return null;
  const start = parseISO(entry.start);
  const end = parseISO(entry.end || entry.start);
  if (!start || !end) return null;

  // Fecha caducada -> no se muestra. Se compara con el ÚLTIMO día de la feria:
  // mientras el certamen esté en curso, la fecha sigue siendo información válida.
  const ref = today || new Date().toISOString().slice(0, 10);
  if ((entry.end || entry.start) < ref) return null;

  const [y1, m1, d1] = start;
  const [y2, m2, d2] = end;

  if (CJK[lang]) return CJK[lang](y2, m1, d1, d2, m2);

  const months = MONTHS[lang] || MONTHS.es;
  const mn1 = months[m1 - 1];
  const mn2 = months[m2 - 1];

  // Cruza de mes (o de año): "28 abril - 2 mayo 2027"
  if (m1 !== m2 || y1 !== y2) {
    return y1 !== y2
      ? `${d1} ${mn1} ${y1} - ${d2} ${mn2} ${y2}`
      : `${d1} ${mn1} - ${d2} ${mn2} ${y2}`;
  }
  // Un solo día: "28 abril 2027"
  if (d1 === d2) return `${d1} ${mn1} ${y1}`;
  // Dos días consecutivos: "28 & 29 abril 2027"
  if (d2 - d1 === 1) return `${d1} & ${d2} ${mn1} ${y1}`;
  // Rango: "15-18 abril 2027"
  return `${d1}-${d2} ${mn1} ${y1}`;
}

/** Entrada cruda (start/end/cadence) de una feria, o null. */
export function fairDatesFor(slug) {
  return fairDates[slug] || null;
}

// Mes abreviado para espacios estrechos (nodos de la línea de tiempo).
const MONTHS_SHORT = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  fr: ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
  it: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  nl: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  hi: ['जन', 'फ़र', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्तू', 'नव', 'दिस']
};

/**
 * Igual que formatFairDates pero en versión corta ("28-29 abr 2027"), para los
 * nodos de la línea de tiempo. Devuelve null con los mismos criterios (sin fecha
 * registrada o fecha ya pasada).
 */
export function formatFairDatesShort(slug, lang = 'es', today = null) {
  {
    const e = fairDates[slug];
    if (e && e.approx && e.start) {
      const ref0 = today || new Date().toISOString().slice(0, 10);
      if ((e.end || e.start) < ref0) return null;
      const lbl = approxLabels[lang] || approxLabels.es;
      return `${e.start.slice(0, 4)} (${lbl})`;
    }
  }
  const entry = fairDates[slug];
  if (!entry || !entry.start) return null;
  const start = parseISO(entry.start);
  const end = parseISO(entry.end || entry.start);
  if (!start || !end) return null;
  const ref = today || new Date().toISOString().slice(0, 10);
  if ((entry.end || entry.start) < ref) return null;

  const [y1, m1, d1] = start;
  const [y2, m2, d2] = end;
  if (CJK[lang]) return CJK[lang](y2, m1, d1, d2, m2);

  const months = MONTHS_SHORT[lang] || MONTHS_SHORT.es;
  const mn1 = months[m1 - 1];
  const mn2 = months[m2 - 1];
  if (m1 !== m2 || y1 !== y2) {
    return y1 !== y2 ? `${d1} ${mn1} ${y1} - ${d2} ${mn2} ${y2}` : `${d1} ${mn1} - ${d2} ${mn2} ${y2}`;
  }
  if (d1 === d2) return `${d1} ${mn1} ${y1}`;
  return `${d1}-${d2} ${mn1} ${y1}`;
}
