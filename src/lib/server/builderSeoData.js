// Contenido de las páginas paralelas de "constructor de stands" (ver src/lib/builderPages.js).
// Solo en español: es la lengua donde se libra la competencia y donde llegan las
// denuncias. Cada página tiene texto PROPIO y hechos de su plaza (recinto, ferias,
// sectores), enfocado a la CONSTRUCCIÓN —taller, carpintería, materiales, producción—
// para no solaparse con la página de ciudad, centrada en el servicio de diseño y montaje.
// Los H2 siguen el patrón de reincidencia del sitio: "{expresión objetivo}: {apartado}".

const paso = (c) => `
        <h2>Constructor de stands en ${c}: cómo se construye tu stand, paso a paso</h2>
        <ol>
          <li><strong>Levantamiento del proyecto.</strong> Medidas reales del espacio contratado, alturas libres del pabellón y condicionantes del recinto antes de dibujar nada.</li>
          <li><strong>Ingeniería y prototipo 3D.</strong> Se resuelven estructura, cargas, instalaciones y despiece; recibes un prototipo fotorrealista que es exactamente lo que se va a construir.</li>
          <li><strong>Fabricación en taller propio.</strong> Carpintería a medida, mobiliario y gráfica producidos por nuestro equipo, con control de calidad pieza a pieza.</li>
          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir: los ajustes se hacen aquí, no a contrarreloj en el pabellón.</li>
          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores y carpinteros levantan el stand con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>
          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos los elementos reutilizables para tu siguiente convocatoria.</li>
        </ol>`;

const tipos = (c) => `
        <h2>Constructor de stands en ${c}: qué construimos</h2>
        <ul>
          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos fabricados a medida, con acabados lacados, chapados o textiles.</li>
          <li><strong>Stand de doble altura.</strong> Cálculo estructural, escalera y planta superior de reuniones cuando el pabellón lo permite.</li>
          <li><strong>Stand modular reutilizable.</strong> Piezas de sistema propias que se reconfiguran feria tras feria y abaratan la presencia recurrente.</li>
          <li><strong>Stand con maquinaria o producto pesado.</strong> Suelos técnicos, refuerzos y previsión de acometidas para exponer equipos en funcionamiento.</li>
          <li><strong>Mobiliario y elementos de exposición.</strong> Mostradores, vitrinas, expositores y almacenes ocultos, construidos para tu producto y no comprados en catálogo.</li>
        </ul>`;

const porque = (c) => `
        <h2>Constructor de stands en ${c}: por qué construir con Standarte</h2>
        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en ${c}</a></p>`;


// --- Versión inglesa -------------------------------------------------------------
// Mismo esqueleto que la española y MENOS texto: estas páginas compiten con los
// calendarios de ferias, que ganan por consulta rápida (la ficha de datos de arriba),
// no por extensión. Los H2 repiten la expresión objetivo, como en español.
const pasoEn = (c) => `
        <h2>Stand builder in ${c}: how your stand is built, step by step</h2>
        <ol>
          <li><strong>Survey.</strong> Real measurements of the contracted space, hall clear height and venue rules before anything is drawn.</li>
          <li><strong>Engineering and 3D prototype.</strong> Structure, loads, services and cutting list resolved first; you get a photorealistic prototype of what will actually be built.</li>
          <li><strong>Manufacturing in our own workshop.</strong> Bespoke joinery, furniture and graphics produced by our team, checked piece by piece.</li>
          <li><strong>Pre-assembly.</strong> The stand is put together in the workshop before it ships: adjustments happen here, not against the clock in the hall.</li>
          <li><strong>Transport and installation.</strong> Our own fitters and joiners build it on site, finished 24&nbsp;h before opening.</li>
          <li><strong>Dismantling and storage.</strong> We remove the stand at closing and keep the reusable parts for your next show.</li>
        </ol>`;

const tiposEn = (c) => `
        <h2>Stand builder in ${c}: what we build</h2>
        <ul>
          <li><strong>Custom-design joinery stand.</strong> Structure and walls made to measure, in lacquered, veneered or textile finishes.</li>
          <li><strong>Double-decker stand.</strong> Structural calculation, staircase and an upper meeting floor where the hall allows it.</li>
          <li><strong>Reusable modular stand.</strong> Our own system parts, reconfigured show after show, which makes a recurring presence cheaper.</li>
          <li><strong>Stand with machinery or heavy product.</strong> Technical floors, reinforcement and services planned to exhibit equipment running.</li>
          <li><strong>Furniture and display elements.</strong> Counters, cabinets, displays and hidden storage built for your product, not bought from a catalogue.</li>
        </ul>`;

// Las páginas que defienden una FERIA cierran con «for {feria}», no «in {feria}»:
// con el helper de ciudad decían "Stand builder in FIGAN", que en inglés no se sostiene.
const porqueEnFair = (f) => `
        <h2>Stand builder for ${f}: why build with Standarte</h2>
        <p>We are builders, not middlemen: the stand is made in <strong>our own workshop</strong>, by our team and to our schedule. One person responsible from start to finish, a quote without a third party's margin, and the ability to solve a last-minute change without waiting for someone else's workshop. Every approval is recorded in the <a href="/en/audited-project">Audited Project System</a>: what you approve is, literally, what gets built.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand at ${f}</a></p>`;

const porqueEn = (c) => `
        <h2>Stand builder in ${c}: why build with Standarte</h2>
        <p>We are builders, not middlemen: the stand is made in <strong>our own workshop</strong>, by our team and to our schedule. One person responsible from start to finish, a quote without a third party's margin, and the ability to solve a last-minute change without waiting for someone else's workshop. Every approval is recorded in the <a href="/en/audited-project">Audited Project System</a>: what you approve is, literally, what gets built.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in ${c}</a></p>`;

export const builderSeoData = {

  constructor_stand_zaragoza: {
    es: {
      breadcrumb: 'Constructor de stands en Zaragoza',
      title: 'Constructor de stands en Zaragoza | Taller propio | Standarte',
      h1: 'Constructor de stands en Zaragoza',
      introText: 'Construimos stands a medida para la Feria de Zaragoza desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado 24 h antes de la apertura.',
      body: `
        <h2>Constructor de stands en Zaragoza: fabricación propia para la Feria de Zaragoza</h2>
        <p>La Feria de Zaragoza concentra algunos de los certámenes más exigentes de España en materia de construcción de stands: en <a href="/ferias/stand-fima-zaragoza">FIMA</a> y <a href="/ferias/stands-figan-zaragoza">FIGAN</a> se expone maquinaria agrícola y ganadera de varias toneladas, y en <a href="/ferias/stand-smopyc-zaragoza">SMOPYC</a>, obra pública y equipos de construcción. Un stand para esas ferias no es una decoración: es una estructura que tiene que soportar peso, resistir el trasiego de cuatro días y quedar impecable a primera vista.</p>
        <p>Por eso construimos con criterio de taller: calculamos la carga real del suelo y los refuerzos necesarios, dejamos previstas las acometidas de agua y potencia con el recinto, y fabricamos la carpintería con materiales pensados para arquitectura efímera —ligeros de transportar, sólidos en pabellón y reutilizables en la siguiente convocatoria—.</p>
        ${paso('Zaragoza')}
        ${tipos('Zaragoza')}
        <h2>Constructor de stands en Zaragoza: ferias del recinto</h2>
        <p>Construimos para todo el calendario del recinto: <a href="/ferias/stand-fima-zaragoza">FIMA</a>, <a href="/ferias/stands-figan-zaragoza">FIGAN</a>, <a href="/ferias/stand-smopyc-zaragoza">SMOPYC</a>, <a href="/ferias/stand-smagua-zaragoza">SMAGUA</a>, <a href="/ferias/stand-aratur-zaragoza">Aratur</a>, <a href="/ferias/stand-expofimer-zaragoza">EXPOFIMER</a> y <a href="/ferias/stand-spaper-zaragoza">SPAPER</a>. Si prefieres ver el servicio completo de diseño y montaje para la plaza, está en nuestra página de <a href="/diseno_montaje_stands_zaragoza">stands para ferias en Zaragoza</a>.</p>
        ${porque('Zaragoza')}`
    }
  },

  constructor_stand_madrid: {
    es: {
      breadcrumb: 'Constructor de stands en Madrid',
      title: 'Constructor de stands en Madrid | Taller propio junto a IFEMA | Standarte',
      h1: 'Constructor de stands en Madrid',
      introText: 'Construimos stands a medida para IFEMA desde nuestro taller de San Fernando de Henares, a quince minutos del recinto: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, con capacidad de resolver cualquier ajuste el mismo día del montaje.',
      body: `
        <h2>Constructor de stands en Madrid: taller propio a quince minutos de IFEMA</h2>
        <p>Nuestro taller está en San Fernando de Henares, en el corredor del Henares, a unos diez kilómetros de la Feria de Madrid. En una plaza como IFEMA esa distancia no es un dato de folleto: es la diferencia entre resolver un imprevisto de montaje en una hora o esperar a un transporte desde otra provincia. Fabricamos aquí y montamos allí, con el mismo equipo.</p>
        <p>IFEMA es además el recinto más denso de España en calendario: sus doce pabellones encadenan certámenes casi sin respiro, y eso comprime las ventanas de montaje y desmontaje. Por eso construimos con premontaje en taller —el stand se arma entero antes de salir— y llegamos al pabellón a ensamblar, no a improvisar.</p>
        ${paso('Madrid')}
        ${tipos('Madrid')}
        <h2>Constructor de stands en Madrid: ferias del recinto</h2>
        <p>Construimos para todo el calendario de IFEMA: <a href="/ferias/stand-fruit-attraction-madrid">Fruit Attraction</a>, <a href="/ferias/stand-sicur-madrid">SICUR</a>, <a href="/ferias/stand-salon-look-madrid">Salón Look</a>, <a href="/ferias/stand-veteco-madrid">Veteco</a>, <a href="/ferias/stand-madrid-tech-show">Madrid Tech Show</a>, <a href="/ferias/stand-hip-madrid">HIP</a>, <a href="/ferias/stand-meat-attraction-madrid">Meat Attraction</a> y <a href="/ferias/stand-advanced-manufacturing-madrid">Advanced Manufacturing</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno_montaje_stands_madrid">stands para ferias en Madrid</a>.</p>
        ${porque('Madrid')}`
    }
  },  constructor_stand_barcelona: {
    es: {
      breadcrumb: 'Constructor de stands en Barcelona',
      title: 'Constructor de stands en Barcelona | Taller propio | Standarte',
      h1: 'Constructor de stands en Barcelona',
      introText: 'Construimos stands a medida para Fira de Barcelona —Gran Via y Montjuïc— con fabricación en taller propio y premontaje antes de salir: estructuras calculadas y certificadas, acabados de carpintería premium y montaje ajustado a las ventanas cortas de los grandes congresos.',
      body: `
        <h2>Constructor de stands en Barcelona: construir para Gran Via y para Montjuïc</h2>
        <p>Barcelona no es un recinto, son dos con carácter distinto. Gran Via, en L'Hospitalet, es un recinto moderno y de gran escala que acoge los certámenes internacionales más exigentes —del <a href="/ferias/stand-mwc-barcelona">MWC</a> al <a href="/ferias/stand-ise-barcelona">ISE</a>—, con normativa estricta de montaje y expositores acostumbrados a un acabado impecable. Montjuïc, en la ciudad, impone otras reglas: espacios más compartimentados y accesos más ajustados para la descarga.</p>
        <p>Construir aquí exige anticipación: el cálculo estructural y la documentación de las dobles alturas se presentan con plazo, las ventanas de montaje son caras y cortas, y no hay margen para resolver en pabellón lo que debió resolverse en taller. Por eso premontamos el stand completo antes de cargarlo y llegamos a Fira con la gráfica puesta y la instalación probada.</p>
        ${paso('Barcelona')}
        ${tipos('Barcelona')}
        <h2>Constructor de stands en Barcelona: ferias del recinto</h2>
        <p>Construimos para las grandes citas de Fira: <a href="/ferias/stand-mwc-barcelona">MWC</a>, <a href="/ferias/stand-ise-barcelona">ISE</a>, <a href="/ferias/stand-alimentaria-barcelona">Alimentaria</a>, <a href="/ferias/stand-hispack-barcelona">Hispack</a>, <a href="/ferias/stand-hostelco-barcelona">Hostelco</a>, <a href="/ferias/stand-construmat-barcelona">Construmat</a>, <a href="/ferias/stand-expoquimia-barcelona">Expoquimia</a> y <a href="/ferias/stand-smart-city-expo-world-congress-barcelona">Smart City Expo World Congress</a>. El servicio completo de diseño y montaje está en <a href="/diseno_montaje_stands_barcelona">stands para ferias en Barcelona</a>.</p>
        ${porque('Barcelona')}`
    }
  },
  constructor_stand_oporto: {
    es: {
      breadcrumb: 'Constructor de stands en Oporto',
      title: 'Constructor de stands en Oporto | Taller propio | Standarte',
      h1: 'Constructor de stands en Oporto',
      introText: 'Construimos stands a medida para Exponor (Feira Internacional do Porto) con fabricación en taller propio y transporte desde España: carpintería, estructura y mobiliario producidos por nuestro equipo, con la logística transfronteriza resuelta y el montaje terminado antes de la apertura.',
      body: `
        <h2>Constructor de stands en Oporto: taller propio y logística resuelta hasta Exponor</h2>
        <p>Construir en Oporto añade una variable que no tiene una feria nacional: el transporte. Fabricamos el stand completo en nuestro taller, lo premontamos para detectar cualquier ajuste antes de que salga, y organizamos el transporte a Exponor (Leça da Palmeira, Matosinhos) con margen suficiente para que la descarga y el montaje no dependan de un imprevisto en carretera.</p>
        <p>El norte de Portugal reúne además sectores muy distintos entre sí —textil y confección, construcción y decoración, alimentación y cosmética—, y cada uno pide una construcción diferente: paneles de muestrario con luz fiel para el textil, estanterías iluminadas para el producto pequeño, o suelos técnicos y acometidas para maquinaria y obradores.</p>
        ${paso('Oporto')}
        ${tipos('Oporto')}
        <h2>Constructor de stands en Oporto: ferias del recinto</h2>
        <p>Construimos para las citas de Exponor y del área de Oporto: <a href="/ferias/stand-concreta-oporto">Concreta</a>, <a href="/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/ferias/stand-expocosmetica-oporto">Expocosmética</a>, <a href="/ferias/stands-qualifica-oporto">Qualifica</a>, <a href="/ferias/stand-emaf-oporto">Emaf</a>, <a href="/ferias/stands-tecnipao-oporto">Tecnipão</a> y <a href="/ferias/stands-gift-paper-oporto">Gift Paper</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno-construccion-montaje-stands-oporto">stands para ferias en Oporto</a>.</p>
        ${porque('Oporto')}`
    }
  },

  constructor_stand_lisboa: {
    es: {
      breadcrumb: 'Constructor de stands en Lisboa',
      title: 'Constructor de stands en Lisboa | Taller propio | Standarte',
      h1: 'Constructor de stands en Lisboa',
      introText: 'Construimos stands a medida para la FIL (Feira Internacional de Lisboa) y los grandes congresos de la capital portuguesa: fabricación en taller propio, premontaje antes de salir y montaje ajustado a las ventanas cortas que imponen los congresos.',
      body: `
        <h2>Constructor de stands en Lisboa: construir para la FIL y para congresos</h2>
        <p>Lisboa combina dos escenarios que exigen construcciones distintas. En la FIL, en el Parque das Nações, hay pabellón y altura para un stand de diseño libre con doble altura y almacén. En los grandes congresos —tecnológicos, médicos o del sector del juego, muchos repartidos entre la FIL y el MEO Arena— las ventanas de montaje son mucho más cortas y el stand tiene que estar pensado para levantarse rápido sin renunciar al acabado.</p>
        <p>Resolvemos esa diferencia en el taller: cuando el calendario aprieta, fabricamos por módulos premontados que en pabellón solo hay que ensamblar y conectar, con la gráfica ya colocada y la instalación eléctrica probada antes de cargar el camión.</p>
        ${paso('Lisboa')}
        ${tipos('Lisboa')}
        <h2>Constructor de stands en Lisboa: ferias y congresos del recinto</h2>
        <p>Construimos para las grandes citas de la capital: <a href="/ferias/stand-btl-lisboa">BTL</a>, <a href="/ferias/stand-tektonica-lisboa">Tektónica</a>, <a href="/ferias/stand-web-summit-lisboa">Web Summit</a>, <a href="/ferias/stand-sbc-summit-lisboa">SBC Summit</a>, <a href="/ferias/stand-lisboa-games-week">Lisboa Games Week</a> y <a href="/ferias/stand-nauticampo-lisboa">Nauticampo</a>. El servicio completo de diseño y montaje está en <a href="/diseno_montaje_stands_lisboa">stands para ferias en Lisboa</a>.</p>
        ${porque('Lisboa')}`
    }
  },

  constructor_stand_bilbao: {
    es: {
      breadcrumb: 'Constructor de stands en Bilbao',
      title: 'Constructor de stands en Bilbao | Taller propio | Standarte',
      h1: 'Constructor de stands en Bilbao',
      introText: 'Construimos stands a medida para el Bilbao Exhibition Centre (BEC) desde nuestro taller: estructuras preparadas para máquina-herramienta y producto pesado, dobles alturas que aprovechan los 12-15 m libres del recinto y acabados de carpintería premium.',
      body: `
        <h2>Constructor de stands en Bilbao: construir para el BEC y su industria</h2>
        <p>El BEC de Barakaldo es un recinto de escala industrial y sus ferias lo demuestran: en la <a href="/ferias/stands-biemh-bilbao">BIEMH</a> se exponen máquinas-herramienta que se descargan con grúa y funcionan durante toda la feria. Construir aquí significa dimensionar el suelo para cargas reales, coordinar con el recinto los medios de elevación y dejar las tomas eléctricas resueltas antes de que la máquina llegue.</p>
        <p>La altura libre de los pabellones —entre 12 y 15 metros— permite además algo que en recintos más bajos no cabe: dobles alturas con sala de reuniones arriba y exposición abajo. Es una de las construcciones que más veces resolvemos en esta plaza, y se calcula y fabrica entera en taller antes de pisar el pabellón.</p>
        ${paso('Bilbao')}
        ${tipos('Bilbao')}
        <h2>Constructor de stands en Bilbao: ferias del recinto</h2>
        <p>Construimos para el calendario del BEC: <a href="/ferias/stands-biemh-bilbao">BIEMH</a>, <a href="/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/ferias/stands-maintenance-bilbao">Maintenance</a>, <a href="/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/ferias/stand-egurtek-bilbao">Egurtek</a> y <a href="/ferias/stand-world-maritime-week-bilbao">World Maritime Week</a>. El servicio completo de diseño y montaje está en <a href="/diseno-construccion-montaje-stand-bilbao">stands para ferias en Bilbao</a>.</p>
        ${porque('Bilbao')}`
    }
  },

  constructor_stand_badajoz: {
    es: {
      breadcrumb: 'Constructor de stands en Badajoz',
      title: 'Constructor de stands en Badajoz | Taller propio | Standarte',
      h1: 'Constructor de stands en Badajoz',
      introText: 'Construimos stands a medida para IFEBA y las ferias de Extremadura desde nuestro taller de Cáceres: producción cercana, plazos cortos y montaje propio, sin subcontratar a terceros que encarecen y desdibujan el resultado.',
      body: `
        <h2>Constructor de stands en Badajoz: taller en Extremadura, producción cercana</h2>
        <p>Tenemos taller en Cáceres, a poco más de una hora de IFEBA. Esa cercanía cambia dos cosas que se notan en el resultado: los plazos se acortan —una modificación no significa esperar a un transporte largo— y el coste del transporte no se come parte del presupuesto que debería ir al stand. Para el expositor extremeño, construir con un taller de la región es sencillamente más eficiente.</p>
        <p>Las ferias de la plaza son además muy diversas —agroganaderas, de ocio, de formación, de belleza—, y construimos para cada una lo que pide: cercados y suelos técnicos para animales y maquinaria, mostradores y expositores para el comercio, o escenografías ligeras para las ferias de gran público.</p>
        ${paso('Badajoz')}
        ${tipos('Badajoz')}
        <h2>Constructor de stands en Badajoz: ferias del recinto</h2>
        <p>Construimos para las citas de IFEBA y la provincia: <a href="/ferias/stand-fehispor-badajoz">Fehispor</a>, <a href="/ferias/stand-ecuextre-badajoz">Ecuextre</a>, <a href="/ferias/stand-feciex-badajoz">Feciex</a>, <a href="/ferias/stand-iberocio-badajoz">Iberocio</a> y <a href="/ferias/stand-feria-de-fp-badajoz">Feria de FP</a>. El servicio completo de diseño y montaje está en <a href="/diseno_montaje_stands_badajoz">stands para ferias en Badajoz</a>.</p>
        ${porque('Badajoz')}`
    }
  },

  constructor_stand_don_benito: {
    es: {
      breadcrumb: 'Constructor de stands en Don Benito',
      title: 'Constructor de stands en Don Benito | Taller propio | Standarte',
      h1: 'Constructor de stands en Don Benito',
      introText: 'Construimos stands a medida para FEVAL (Don Benito) desde nuestro taller de Cáceres: estructuras preparadas para maquinaria agrícola, zonas de demostración y acabados que aguantan una feria de campo, con montaje propio y sin subcontratar.',
      body: `
        <h2>Constructor de stands en Don Benito: construir para FEVAL y el campo extremeño</h2>
        <p>FEVAL es el recinto de referencia de las Vegas Altas y su cita mayor, <a href="/ferias/stands-agroexpo">Agroexpo</a>, es una feria de campo en el sentido literal: maquinaria agrícola de gran formato, exposición exterior e interior, y un público profesional que sube a las máquinas y pregunta. El stand tiene que estar construido para eso.</p>
        <p>Trabajamos con suelos y estructuras dimensionados para el peso real de los equipos, zonas de demostración despejadas, y materiales que no se marcan con el polvo y el trasiego de una feria agroganadera. Al fabricar en nuestro taller de Cáceres, a menos de una hora del recinto, cualquier ajuste se resuelve el mismo día.</p>
        ${paso('Don Benito')}
        ${tipos('Don Benito')}
        <h2>Constructor de stands en Don Benito: ferias del recinto</h2>
        <p>Construimos para <a href="/ferias/stands-agroexpo">Agroexpo</a> y el resto del calendario de <a href="/ferias/stands-agroexpo-feval-don-benito">FEVAL</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/montaje_stand_don_benito">montaje de stands en Don Benito</a>.</p>
        ${porque('Don Benito')}`
    }
  },

  /* Defensa de una FICHA DE FERIA (no de una ciudad): FIGAN. La ficha
   * /ferias/stands-figan-zaragoza fue denunciada, cambió de URL y no ha recuperado
   * posición. Esta página ataca otra intención —"constructor de stands para
   * FIGAN"— desde la CONSTRUCCIÓN (taller, estructura, cargas, higiene), y deja la
   * venta del servicio de diseño y montaje a la ficha. Vive en
   * /ferias/constructor-stand-figan. */
  constructor_stand_figan: {
    es: {
      breadcrumb: 'Constructor de stands para FIGAN',
      title: 'Constructor de stands para FIGAN (Zaragoza) | Taller propio | Standarte',
      h1: 'Constructor de stands para FIGAN, Zaragoza',
      introText: 'Construimos stands a medida para FIGAN, la Feria Internacional para la Producción Animal de la Feria de Zaragoza, desde nuestro propio taller: estructura, carpintería, suelos técnicos, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción.',
      body: `
        <h2>Constructor de stands para FIGAN: qué exige construir en producción animal</h2>
        <p>FIGAN no es una feria de catálogo: se exponen silos, comederos, jaulas de alojamiento, sistemas de ventilación, robots de ordeño y maquinaria de granja que llegan al pabellón en camión y pesan toneladas. Construir aquí empieza por lo que no se ve —reparto de cargas en el suelo, refuerzos bajo el equipo, previsión de acometidas de agua y potencia con el recinto— y solo después se resuelve el acabado.</p>
        <p>El segundo condicionante es la higiene y el trasiego: cuatro días de visitas técnicas, demostraciones en marcha y público con botas de granja. Elegimos materiales lavables y cantos protegidos donde toca el visitante, y dejamos el resto en acabados nobles a la altura de la vista. La consecuencia práctica: el stand aguanta la feria entera con el mismo aspecto del primer día.</p>
        <h2>Constructor de stands para FIGAN: cómo se construye tu stand, paso a paso</h2>
        <ol>
          <li><strong>Levantamiento del proyecto.</strong> Medidas reales del espacio contratado en la Feria de Zaragoza, altura libre del pabellón, accesos de carga y peso de los equipos que vas a exponer.</li>
          <li><strong>Ingeniería y prototipo 3D.</strong> Se calculan estructura, refuerzos y despiece, y se resuelven las instalaciones; recibes un prototipo fotorrealista que es exactamente lo que se va a construir.</li>
          <li><strong>Fabricación en taller propio.</strong> Carpintería a medida, mobiliario y gráfica producidos por nuestro equipo, con control de calidad pieza a pieza.</li>
          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir: los ajustes se hacen aquí y no a contrarreloj en el pabellón.</li>
          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores y carpinteros levantan el stand y coordinan la entrada de tu maquinaria, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>
          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos los elementos reutilizables para la siguiente convocatoria, que en FIGAN llega cada dos años.</li>
        </ol>
        <h2>Constructor de stands para FIGAN: qué construimos</h2>
        <ul>
          <li><strong>Stand con maquinaria pesada.</strong> Suelo técnico calculado, refuerzos puntuales y pasos de instalación previstos para exponer equipos en funcionamiento.</li>
          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos fabricados a medida, con acabados lacados, chapados o textiles.</li>
          <li><strong>Stand de doble altura.</strong> Cálculo estructural, escalera y sala de reuniones arriba cuando el pabellón lo permite: metros de negociación sin gastar metros de exposición.</li>
          <li><strong>Zonas de demostración y sala técnica.</strong> Espacios cerrados o semicerrados con control de ruido para explicar procesos, datos de producción y planes sanitarios sin gritar.</li>
          <li><strong>Mobiliario y expositores propios.</strong> Mostradores, vitrinas y soportes construidos para tu producto —no comprados en catálogo— y almacén oculto para el material de campaña.</li>
        </ul>
        <h2>Constructor de stands para FIGAN: y para el resto de la Feria de Zaragoza</h2>
        <p>El mismo taller construye para todo el calendario del recinto: <a href="/ferias/stand-fima-zaragoza">FIMA</a>, <a href="/ferias/stand-smopyc-zaragoza">SMOPYC</a>, <a href="/ferias/stand-smagua-zaragoza">SMAGUA</a>, <a href="/ferias/stand-aratur-zaragoza">Aratur</a> y <a href="/ferias/stand-expofimer-zaragoza">EXPOFIMER</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href="/ferias/stands-figan-zaragoza">stands para FIGAN</a>; y el servicio para la plaza, en <a href="/diseno_montaje_stands_zaragoza">stands para ferias en Zaragoza</a> y en <a href="/constructor_stand_zaragoza">constructor de stands en Zaragoza</a>.</p>
        <h2>Constructor de stands para FIGAN: por qué construir con Standarte</h2>
        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en FIGAN</a></p>`
    }
  },

  /* Defensa de la otra ficha denunciada: Agroexpo (FEVAL, Don Benito). Mismo
   * planteamiento que la de FIGAN: intención "constructor de stands para Agroexpo"
   * y texto de CONSTRUCCIÓN. Se diferencia también de la página de plaza
   * (constructor_stand_don_benito): allí se habla del recinto y su calendario; aquí,
   * de lo que exige ESTA feria —exterior, maquinaria de gran formato, ganado—. */
  constructor_stand_agroexpo: {
    es: {
      breadcrumb: 'Constructor de stands para Agroexpo',
      title: 'Constructor de stands para Agroexpo (Don Benito) | Taller propio | Standarte',
      h1: 'Constructor de stands para Agroexpo, Don Benito',
      introText: 'Construimos stands a medida para Agroexpo, la feria agropecuaria de FEVAL (Don Benito), desde nuestro taller de Cáceres, a menos de una hora del recinto: estructuras para maquinaria de gran formato, exposición exterior e interior, y acabados que aguantan cinco días de feria de campo.',
      body: `
        <h2>Constructor de stands para Agroexpo: qué exige construir en una feria de campo</h2>
        <p>Agroexpo no se visita con las manos en los bolsillos: el agricultor se sube a la máquina, abre la cabina, mide el enganche y pregunta por el consumo. Eso cambia cómo se construye. Hay que dimensionar el suelo para el peso real del tractor o la cosechadora, dejar el paso franco alrededor del equipo, y renunciar a los acabados delicados en las zonas donde la gente se apoya y toca.</p>
        <p>El segundo condicionante es que aquí se expone dentro y fuera. En parcela exterior mandan el anclaje, la nivelación del terreno y la resistencia al viento y a la lluvia de enero en las Vegas Altas; dentro, la altura libre y la carga del pabellón. Construimos las dos cosas con el mismo criterio y el mismo equipo, para que la marca se vea igual de sólida en la parcela y en el hall.</p>
        <h2>Constructor de stands para Agroexpo: cómo se construye tu stand, paso a paso</h2>
        <ol>
          <li><strong>Levantamiento del proyecto.</strong> Medidas reales de la parcela o el espacio interior en FEVAL, accesos de carga, y peso y dimensiones de la maquinaria que vas a exponer.</li>
          <li><strong>Ingeniería y prototipo 3D.</strong> Estructura, anclajes, refuerzos de suelo e instalaciones resueltos antes de cortar; recibes un prototipo fotorrealista que es lo que se va a construir.</li>
          <li><strong>Fabricación en taller propio.</strong> Carpintería a medida, mobiliario y gráfica producidos por nuestro equipo en Cáceres, con control de calidad pieza a pieza.</li>
          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir: los ajustes se hacen aquí, no con la máquina ya descargada en la parcela.</li>
          <li><strong>Transporte y montaje.</strong> Nuestros montadores y carpinteros levantan el stand y coordinan la entrada de tus equipos, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>
          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos los elementos reutilizables para la edición siguiente: Agroexpo es anual y repetir sale mucho más barato que empezar de cero.</li>
        </ol>
        <h2>Constructor de stands para Agroexpo: qué construimos</h2>
        <ul>
          <li><strong>Stand exterior para maquinaria.</strong> Plataformas, tarimas y anclajes calculados para exponer tractores, remolques y equipos de riego con seguridad y buena imagen.</li>
          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos fabricados a medida, con acabados lacados, chapados o textiles para el interior de FEVAL.</li>
          <li><strong>Mostrador y sala de reunión.</strong> Un sitio donde sentarse a cerrar la venta —con mesa, sombra y algo de aislamiento del ruido—, que en una feria agropecuaria es donde se firma.</li>
          <li><strong>Almacén y zona de servicio.</strong> Espacio cerrado para catálogos, muestras de producto, ropa de trabajo y avituallamiento del equipo comercial durante los cinco días.</li>
          <li><strong>Elementos reutilizables.</strong> Piezas de sistema propias que se reconfiguran de una edición a la siguiente y abaratan la presencia recurrente.</li>
        </ul>
        <h2>Constructor de stands para Agroexpo: y para el resto de FEVAL y Extremadura</h2>
        <p>El mismo taller construye para el resto del calendario del recinto —<a href="/ferias/stands-agroexpo-feval-don-benito">FEVAL</a>— y para las plazas extremeñas: <a href="/montaje_stand_don_benito">Don Benito</a>, <a href="/diseno_montaje_stands_badajoz">Badajoz</a>, <a href="/montaje_stand_zafra">Zafra</a> y <a href="/diseno_montaje_stands_trujillo">Trujillo</a>. La ficha de la feria —sectores y servicio completo de diseño y montaje— está en <a href="/ferias/stands-agroexpo">stands para Agroexpo</a>, y la página de plaza, en <a href="/constructor_stand_don_benito">constructor de stands en Don Benito</a>.</p>
        <h2>Constructor de stands para Agroexpo: por qué construir con Standarte</h2>
        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos, a menos de una hora de FEVAL. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un imprevisto el mismo día del montaje. Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Agroexpo</a></p>`
    }
  }
,

  /* BIEMH (BEC, Bilbao): la mayor cita industrial del norte y la ficha más expuesta de
   * Bilbao. La paralela se levanta ANTES de que haya denuncia —a diferencia de FIGAN y
   * Agroexpo, que nacieron después— para tener la reserva ya posicionada si algún día
   * cae. Se diferencia de la página de plaza (constructor_stand_bilbao): allí, el
   * recinto y su calendario; aquí, lo que exige ESTA feria —máquina-herramienta en
   * marcha, cargas, virutas y seguridad de máquina—. */
  constructor_stand_biemh: {
    es: {
      breadcrumb: 'Constructor de stands para BIEMH',
      title: 'Constructor de stands para BIEMH (Bilbao) | Taller propio | Standarte',
      h1: 'Constructor de stands para BIEMH, Bilbao',
      introText: 'Construimos stands a medida para BIEMH, la Bienal Española de la Máquina-Herramienta del BEC (Bilbao Exhibition Centre), desde nuestro propio taller: estructura, suelos técnicos, carpintería, mobiliario y gráfica fabricados por nuestro equipo, con la maquinaria expuesta en marcha y el stand terminado antes de la apertura.',
      body: `
        <h2>Constructor de stands para BIEMH: qué exige construir con máquina-herramienta en marcha</h2>
        <p>En BIEMH no se enseña un catálogo: se enseña un centro de mecanizado cortando viruta. Eso cambia el orden de la construcción. Primero se resuelve lo que no se ve —reparto de cargas, refuerzos bajo bancada, paso de la potencia trifásica, aire comprimido y recogida de taladrina— y solo después se decide el acabado. Un stand proyectado al revés acaba con la máquina fuera de sitio o con una acometida imposible de legalizar.</p>
        <p>El BEC juega a favor: sus pabellones son diáfanos, sin columnas, y admiten cargas muy altas, así que el límite real no suele ser el suelo sino la coordinación. Nosotros la asumimos entera: solicitud de acometidas al recinto, plan de coordinación de actividades empresariales, certificados de reacción al fuego de maderas y textiles, y la ventana de descarga para que tu máquina entre antes de que el pasillo se llene.</p>
        <h2>Constructor de stands para BIEMH: cómo se construye tu stand, paso a paso</h2>
        <ol>
          <li><strong>Levantamiento del proyecto.</strong> Medidas reales del espacio contratado en el BEC, altura libre, accesos de descarga y peso, huella y consumo de cada máquina que vas a exponer.</li>
          <li><strong>Ingeniería y prototipo 3D.</strong> Se calculan estructura, refuerzos y despiece, y se resuelven potencia, aire y evacuación; recibes un prototipo fotorrealista que es exactamente lo que se va a construir.</li>
          <li><strong>Fabricación en taller propio.</strong> Carpintería a medida, mobiliario y gráfica producidos por nuestro equipo, con control de calidad pieza a pieza.</li>
          <li><strong>Premontaje.</strong> El stand se arma entero en taller antes de salir: los ajustes se hacen aquí, no a contrarreloj en el pabellón.</li>
          <li><strong>Transporte y montaje.</strong> Nuestros montadores y carpinteros levantan el stand y coordinan la entrada de la maquinaria con el recinto, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>
          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos los elementos reutilizables para la siguiente convocatoria, que en BIEMH llega cada dos años.</li>
        </ol>
        <h2>Constructor de stands para BIEMH: qué construimos</h2>
        <ul>
          <li><strong>Stand para maquinaria en demostración.</strong> Suelo técnico calculado, refuerzos puntuales, canalizaciones ocultas y espacio de seguridad alrededor de la máquina para que trabaje con público delante.</li>
          <li><strong>Stand isla de gran formato.</strong> Aprovechamiento de los pabellones diáfanos del BEC, con visibilidad desde los cuatro pasillos y recorrido interior ordenado.</li>
          <li><strong>Stand de doble altura.</strong> Cálculo estructural, escalera y sala de reuniones arriba: metros de negociación sin gastar metros de exposición, que en una feria de máquina cara es la diferencia.</li>
          <li><strong>Sala técnica y zona de datos.</strong> Espacio cerrado o semicerrado con control de ruido para hablar de tolerancias, ciclos y amortización sin competir con el zumbido del pabellón.</li>
          <li><strong>Mobiliario y expositores propios.</strong> Mostradores, vitrinas de utillaje y soportes de pieza construidos para tu producto, más almacén oculto para embalaje y recambios.</li>
        </ul>
        <h2>Constructor de stands para BIEMH: y para el resto del BEC</h2>
        <p>El mismo taller construye para todo el calendario del recinto: <a href="/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/ferias/stands-maintenance-bilbao">Maintenance</a>, <a href="/ferias/stand-bedigital-bilbao">BeDigital</a> e <a href="/ferias/stand-ferroforma-bilbao">Industry Tools by Ferroforma</a>, las citas que comparten plataforma en <a href="/ferias/stand-plus-industry-bilbao">+Industry</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href="/ferias/stands-biemh-bilbao">stands para BIEMH</a>; y el servicio para la plaza, en <a href="/diseno-construccion-montaje-stand-bilbao">stands para ferias en Bilbao</a> y en <a href="/constructor_stand_bilbao">constructor de stands en Bilbao</a>.</p>
        <h2>Constructor de stands para BIEMH: por qué construir con Standarte</h2>
        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en BIEMH</a></p>`
    }
  },
  /* Málaga (2026-09-11): FYCMA mezcla ferias profesionales con congresos de montaje en
   * horas (DES, Talent Land, Greencities) y un evento de escenografía pesada (Comic-Con).
   * Texto de CONSTRUCCIÓN —ventanas cortas, premontaje, transporte por la A-45— para no
   * pisar la página de plaza, que habla del servicio y de la documentación del recinto. */
  constructor_stand_malaga: {
    es: {
      breadcrumb: 'Constructor de stands en Málaga',
      title: 'Constructor de stands en Málaga (FYCMA) | Taller propio | Standarte',
      h1: 'Constructor de stands en Málaga',
      introText: 'Construimos stands a medida para FYCMA, el Palacio de Ferias y Congresos de Málaga, desde nuestro propio taller: estructura, carpintería, mobiliario y gráfica fabricados por nuestro equipo, premontados antes de salir y levantados en las ventanas de montaje cortas que marcan los congresos del recinto.',
      body: `
        <h2>Constructor de stands en Málaga: construir para un recinto de congresos</h2>
        <p>FYCMA no funciona como una feria de maquinaria: buena parte de su calendario son congresos y ferias tecnológicas —<a href="/ferias/stand-des-malaga">DES</a>, <a href="/ferias/stands-talent-land-malaga">Talent Land</a>, <a href="/ferias/stand-greencities-malaga">Greencities</a>— donde el montaje se hace en horas, no en días, y el expositor comparte pabellón con el auditorio. Construir aquí exige llegar con el stand entero premontado, la gráfica ya aplicada y la instalación eléctrica probada, para ensamblar sin improvisar y entregar antes de que empiece el programa.</p>
        <p>El segundo condicionante es la distancia. Fabricamos en taller y transportamos el stand a Málaga con margen suficiente para que la descarga no dependa de un imprevisto en carretera; los elementos reutilizables vuelven al almacén y sirven para la siguiente cita del recinto, que en Málaga suele llegar pocos meses después.</p>
        ${paso('Málaga')}
        ${tipos('Málaga')}
        <h2>Constructor de stands en Málaga: ferias del recinto</h2>
        <p>Construimos para todo el calendario de FYCMA: <a href="/ferias/stand-des-malaga">DES</a>, <a href="/ferias/stand-ht-malaga">H&amp;T</a>, <a href="/ferias/stand-simed-malaga">Simed</a>, <a href="/ferias/stand-expo-agritech-malaga">Expo AgriTech</a>, <a href="/ferias/stand-greencities-malaga">Greencities</a>, <a href="/ferias/stands-talent-land-malaga">Talent Land España</a> y <a href="/ferias/stand-san-diego-comic-con-malaga">San Diego Comic-Con Málaga</a>, donde la escenografía pesa tanto como el stand. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno_montaje_stands_malaga">stands para ferias en Málaga</a>.</p>
        ${porque('Málaga')}`
    }
  },
  /* Sevilla (2026-09-12): FIBES es un recinto de gran formato —tres pabellones diáfanos
   * de 7.200 m² con arquetas cada 8 m— y un calendario que mezcla ferias de gran público
   * (SICAB, SIMOF, Salón del Motor) con salones profesionales (Fireca, MMH, TIS). Texto
   * de CONSTRUCCIÓN: islas grandes, suelos para vehículos y animales, tráfico intenso. */
  constructor_stand_sevilla: {
    es: {
      breadcrumb: 'Constructor de stands en Sevilla',
      title: 'Constructor de stands en Sevilla (FIBES) | Taller propio | Standarte',
      h1: 'Constructor de stands en Sevilla',
      introText: 'Construimos stands a medida para FIBES, el Palacio de Exposiciones y Congresos de Sevilla, desde nuestro propio taller: estructura, suelos técnicos, carpintería, mobiliario y gráfica fabricados por nuestro equipo, con la ingeniería resuelta para islas de gran formato y para pabellones que reciben vehículos, caballos y público a miles.',
      body: `
        <h2>Constructor de stands en Sevilla: construir en pabellones grandes y llenos</h2>
        <p>FIBES tiene tres pabellones diáfanos sin pilares, con arquetas de servicio cada ocho metros: es un recinto pensado para la isla de gran formato y la doble altura, y así se construye aquí. Pero su calendario impone otra variable que pocas plazas tienen: ferias de gran público —<a href="/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/ferias/stands-simof-sevilla">SIMOF</a>, el <a href="/ferias/stands-salon-motor-sevilla">Salón del Motor</a>— por las que pasan decenas de miles de personas en pocos días. Un stand para FIBES se calcula para ese trasiego: cantos protegidos, materiales lavables donde toca el visitante y acabados nobles a la altura de la vista.</p>
        <p>En los salones profesionales cambia el peso, no la exigencia: <a href="/ferias/stand-fireca-sevilla">Fireca</a> expone vehículos de rescate y el <a href="/ferias/stand-mmh-sevilla">MMH</a> maquinaria minera, así que el suelo se calcula para toneladas y las acometidas se pactan con el recinto antes de dibujar. Fabricamos en taller, premontamos el stand completo y lo transportamos a Sevilla con margen para que el montaje no dependa de un imprevisto en carretera.</p>
        ${paso('Sevilla')}
        ${tipos('Sevilla')}
        <h2>Constructor de stands en Sevilla: ferias del recinto</h2>
        <p>Construimos para todo el calendario de FIBES: <a href="/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/ferias/stands-simof-sevilla">SIMOF</a>, <a href="/ferias/stand-fireca-sevilla">Fireca</a>, <a href="/ferias/stand-mmh-sevilla">MMH – Mining and Minerals Hall</a>, <a href="/ferias/stand-tis-sevilla">Tourism Innovation Summit</a>, <a href="/ferias/stand-autentica-sevilla">Auténtica</a> y el <a href="/ferias/stands-salon-motor-sevilla">Salón del Motor de Sevilla</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno_montaje_stands_sevilla">stands para ferias en Sevilla</a>.</p>
        ${porque('Sevilla')}`
    }
  },
  constructor_stand_valencia: {
    es: {
      breadcrumb: 'Constructor de stands en Valencia',
      title: 'Constructor de stands en Valencia | Taller propio | Standarte',
      h1: 'Constructor de stands en Valencia',
      introText: "Construimos stands a medida para Feria Valencia desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Valencia: fabricación propia para Feria Valencia</h2>
        <p>Feria Valencia es un recinto de pabellones grandes y calendario denso: Cevisama y Hábitat piden stands donde el producto —cerámica, mueble, iluminación— se toca y se compara de cerca, con acabados que aguanten la mirada del profesional a un palmo. Fabricamos en taller propio y llegamos con el stand premontado, porque en Valencia los turnos de montaje son cortos y el pabellón se llena en horas.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Valencia')}
        ${tipos('Valencia')}
        <h2>Constructor de stands en Valencia: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-beauty-forum-valencia">Beauty Forum Valencia</a>, <a href="/ferias/stand-cevisama-valencia">Cevisama</a>, <a href="/ferias/stand-habitat-valencia">Feria Hábitat València</a>, <a href="/ferias/stand-textilhogar-valencia">Textilhogar</a>, <a href="/ferias/stand-espacio-cocina-sici-valencia">Espacio Cocina SICI</a>, <a href="/ferias/stand-fimma-maderalia-valencia">Fimma + Maderalia</a>, <a href="/ferias/stand-iberflora-valencia">Iberflora</a> y <a href="/ferias/stand-gastronoma-valencia">Gastrónoma</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_valencia">stands para ferias en Valencia</a>.</p>
        ${porque('Valencia')}`
    }
  },
  constructor_stand_valladolid: {
    es: {
      breadcrumb: 'Constructor de stands en Valladolid',
      title: 'Constructor de stands en Valladolid | Taller propio | Standarte',
      h1: 'Constructor de stands en Valladolid',
      introText: "Construimos stands a medida para Feria de Valladolid desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Valladolid: fabricación propia para Feria de Valladolid</h2>
        <p>La Feria de Valladolid alterna certámenes de gran público como INTUR con salones técnicos de maquinaria agrícola y avicultura, y cada uno pide una construcción distinta: gráfica y recorrido para el visitante que pasea, suelo reforzado y acometidas para el equipo que se expone en marcha. Resolvemos ambas desde el mismo taller y con el mismo equipo de montaje.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Valladolid')}
        ${tipos('Valladolid')}
        <h2>Constructor de stands en Valladolid: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-intur-valladolid">INTUR</a>, <a href="/ferias/stand-fine-valladolid">FINE Valladolid</a>, <a href="/ferias/stand-technology-show-valladolid">Technology Show Valladolid</a>, <a href="/ferias/stand-feria-artesania-valladolid">Feria de Artesanía de Valladolid</a>, <a href="/ferias/stand-agraria-valladolid">AGRARIA</a>, <a href="/ferias/stand-agrovid-valladolid">AGROVID</a>, <a href="/ferias/stand-aviforum-valladolid">aviFORUM</a> y <a href="/ferias/stand-fimascota-valladolid">FIMASCOTA</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_valladolid">stands para ferias en Valladolid</a>.</p>
        ${porque('Valladolid')}`
    }
  },
  constructor_stand_alicante: {
    es: {
      breadcrumb: 'Constructor de stands en Alicante',
      title: 'Constructor de stands en Alicante | Taller propio | Standarte',
      h1: 'Constructor de stands en Alicante',
      introText: "Construimos stands a medida para IFA – Institución Ferial Alicantina (Elche) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Alicante: fabricación propia para IFA – Institución Ferial Alicantina (Elche)</h2>
        <p>El recinto ferial de la provincia, IFA, está en Elche, y a Alicante ciudad llegan además los congresos y las citas gastronómicas de la capital. Construimos para los dos escenarios: stand de feria con almacén y mostrador para varios días, o stand de congreso que se monta en una mañana y se retira la misma noche.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Alicante')}
        ${tipos('Alicante')}
        <h2>Constructor de stands en Alicante: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-alicante-gastronomica">Alicante Gastronómica</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_alicante">stands para ferias en Alicante</a>.</p>
        ${porque('Alicante')}`
    }
  },
  constructor_stand_elche: {
    es: {
      breadcrumb: 'Constructor de stands en Elche',
      title: 'Constructor de stands en Elche | Taller propio | Standarte',
      h1: 'Constructor de stands en Elche',
      introText: "Construimos stands a medida para IFA – Institución Ferial Alicantina desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Elche: fabricación propia para IFA – Institución Ferial Alicantina</h2>
        <p>Elche es la capital del calzado y su recinto, IFA, recibe ferias donde el producto se enseña en muestrario y se vende por colección. El stand necesita paredes de exposición con estantes a la altura de la mano, luz fiel al color del cuero y un rincón cerrado donde el comprador vea la colección completa sin público; lo fabricamos todo en carpintería propia.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Elche')}
        ${tipos('Elche')}
        <h2>Constructor de stands en Elche: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-futurmoda-elche">Futurmoda</a> y <a href="/ferias/stand-firauto-elche">Firauto</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_elche">stands para ferias en Elche</a>.</p>
        ${porque('Elche')}`
    }
  },
  constructor_stand_murcia: {
    es: {
      breadcrumb: 'Constructor de stands en Murcia',
      title: 'Constructor de stands en Murcia | Taller propio | Standarte',
      h1: 'Constructor de stands en Murcia',
      introText: "Construimos stands a medida para IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Murcia: fabricación propia para IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco)</h2>
        <p>El recinto de la Región está en Torre Pacheco y su calendario es agrario e industrial: maquinaria, riego, hortofrutícola y construcción. Son ferias de producto pesado y muestras reales, así que construimos con suelo técnico, refuerzos calculados y acometidas previstas, y llevamos el stand ya premontado desde nuestro taller.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Murcia')}
        ${tipos('Murcia')}
        <h2>Constructor de stands en Murcia: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fame-innowa-torre-pacheco">FAME Innowa</a>, <a href="/ferias/stand-equimur-torre-pacheco">EQUIMUR</a>, <a href="/ferias/stand-hortifruit-torre-pacheco">HortiFruit</a> y <a href="/ferias/stand-fecons-torre-pacheco">FECONS</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_murcia">stands para ferias en Murcia</a>.</p>
        ${porque('Murcia')}`
    }
  },
  constructor_stand_salamanca: {
    es: {
      breadcrumb: 'Constructor de stands en Salamanca',
      title: 'Constructor de stands en Salamanca | Taller propio | Standarte',
      h1: 'Constructor de stands en Salamanca',
      introText: "Construimos stands a medida para Recinto Ferial de Salamanca desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Salamanca: fabricación propia para Recinto Ferial de Salamanca</h2>
        <p>El Recinto Ferial de Salamanca es una plaza de ganado y maquinaria: SALAMAQ llena las campas y los pabellones de animales, tractores y aperos. Un stand aquí se construye para el exterior cubierto y el trasiego de barro y ganado, con materiales lavables, estructura sólida y un espacio limpio para sentarse a negociar.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Salamanca')}
        ${tipos('Salamanca')}
        <h2>Constructor de stands en Salamanca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-salamaq-salamanca">SALAMAQ</a>, <a href="/ferias/stand-salon-automovil-salamanca">Salón del Automóvil de Salamanca</a> y <a href="/ferias/stand-congreso-alineadores-salamanca">Congreso Internacional de Alineadores</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_salamanca">stands para ferias en Salamanca</a>.</p>
        ${porque('Salamanca')}`
    }
  },
  constructor_stand_coruna: {
    es: {
      breadcrumb: 'Constructor de stands en A Coruña',
      title: 'Constructor de stands en A Coruña | Taller propio | Standarte',
      h1: 'Constructor de stands en A Coruña',
      introText: "Construimos stands a medida para ExpoCoruña y Palexco desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en A Coruña: fabricación propia para ExpoCoruña y Palexco</h2>
        <p>A Coruña reparte sus citas entre ExpoCoruña, un pabellón diáfano de gran altura, y Palexco, el palacio de congresos del puerto: el primero admite stands de doble altura y producto pesado; el segundo pide construcciones ligeras que entren por el acceso de congresos y se monten en pocas horas. Fabricamos las dos versiones en taller propio.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('A Coruña')}
        ${tipos('A Coruña')}
        <h2>Constructor de stands en A Coruña: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-forum-gastronomico-a-coruna">Galicia Fórum Gastronómico</a>, <a href="/ferias/stand-mundos-digitales-a-coruna">Mundos Digitales</a> y <a href="/ferias/stand-biocultura-a-coruna">BioCultura A Coruña</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_a_coruna">stands para ferias en A Coruña</a>.</p>
        ${porque('A Coruña')}`
    }
  },
  constructor_stand_santiago: {
    es: {
      breadcrumb: 'Constructor de stands en Santiago de Compostela',
      title: 'Constructor de stands en Santiago de Compostela | Taller propio | Standarte',
      h1: 'Constructor de stands en Santiago de Compostela',
      introText: "Construimos stands a medida para Palacio de Congresos e Exposicións de Galicia desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Santiago de Compostela: fabricación propia para Palacio de Congresos e Exposicións de Galicia</h2>
        <p>En Santiago el recinto es un palacio de congresos, y eso marca la construcción: stands compactos, sin obra pesada, con gráfica aplicada en taller y un montaje que respeta suelos y paramentos del edificio. Llegamos con las piezas numeradas y el stand ensayado, porque la ventana de montaje de un congreso se cuenta en horas.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Santiago de Compostela')}
        ${tipos('Santiago de Compostela')}
        <h2>Constructor de stands en Santiago de Compostela: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fairway-santiago-de-compostela">Fairway Santiago de Compostela</a>, <a href="/ferias/stand-maker-faire-galicia-santiago-de-compostela">Maker Faire Galicia Santiago de Compostela</a>, <a href="/ferias/stand-gedet-santiago-de-compostela">GEDET Santiago de Compostela</a>, <a href="/ferias/stand-semergen-santiago-de-compostela">Congreso SEMERGEN Santiago de Compostela</a>, <a href="/ferias/stand-sesmi-santiago-de-compostela">SESMI Santiago de Compostela</a> y <a href="/ferias/stand-galicia-escena-pro-santiago-de-compostela">Galicia Escena PRO</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_santiago_de_compostela">stands para ferias en Santiago de Compostela</a>.</p>
        ${porque('Santiago de Compostela')}`
    }
  },
  constructor_stand_vigo: {
    es: {
      breadcrumb: 'Constructor de stands en Vigo',
      title: 'Constructor de stands en Vigo | Taller propio | Standarte',
      h1: 'Constructor de stands en Vigo',
      introText: "Construimos stands a medida para IFEVI – Instituto Ferial de Vigo desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Vigo: fabricación propia para IFEVI – Instituto Ferial de Vigo</h2>
        <p>IFEVI, en Cotogrande, recibe Conxemar y Navalia: pescado congelado y construcción naval, dos sectores que exponen equipo pesado y frío industrial. Construimos stands con suelo reforzado, previsión de acometidas eléctricas de potencia y superficies que se limpian a diario, fabricados en taller y montados por nuestro propio equipo.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Vigo')}
        ${tipos('Vigo')}
        <h2>Constructor de stands en Vigo: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-conxemar-vigo">Conxemar Vigo</a>, <a href="/ferias/stand-navalia-vigo">Navalia</a>, <a href="/ferias/stand-nortrans-vigo">Nortrans</a> y <a href="/ferias/stand-mindtech-vigo">Mindtech</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_vigo">stands para ferias en Vigo</a>.</p>
        ${porque('Vigo')}`
    }
  },
  constructor_stand_ourense: {
    es: {
      breadcrumb: 'Constructor de stands en Ourense',
      title: 'Constructor de stands en Ourense | Taller propio | Standarte',
      h1: 'Constructor de stands en Ourense',
      introText: "Construimos stands a medida para Expourense desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Ourense: fabricación propia para Expourense</h2>
        <p>Expourense acoge Xantar y Termatalia, dos ferias de degustación y experiencia: aquí el stand tiene cocina o zona de servicio, tomas de agua y extracción, y una barra donde el visitante prueba el producto. Lo construimos con superficies lavables y una trastienda real, no un biombo, para que el servicio funcione cuatro días seguidos.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Ourense')}
        ${tipos('Ourense')}
        <h2>Constructor de stands en Ourense: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-xantar-ourense">Xantar</a> y <a href="/ferias/stand-termatalia-ourense">Termatalia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_ourense">stands para ferias en Ourense</a>.</p>
        ${porque('Ourense')}`
    }
  },
  constructor_stand_silleda: {
    es: {
      breadcrumb: 'Constructor de stands en Silleda',
      title: 'Constructor de stands en Silleda | Taller propio | Standarte',
      h1: 'Constructor de stands en Silleda',
      introText: "Construimos stands a medida para Feira Internacional de Galicia ABANCA desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Silleda: fabricación propia para Feira Internacional de Galicia ABANCA</h2>
        <p>La Feira Internacional de Galicia, en Silleda, es un recinto de campo: Semana Verde mezcla ganado, maquinaria y gran público, y Turexpo trae destinos y hoteles. Construimos stands que aguantan el paso de miles de visitantes en fin de semana, con estructura sólida, gráfica resistente y almacén cerrado.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Silleda')}
        ${tipos('Silleda')}
        <h2>Constructor de stands en Silleda: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-semana-verde-galicia-silleda">Semana Verde de Galicia</a> y <a href="/ferias/stand-turexpo-galicia-silleda">Turexpo Galicia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_silleda">stands para ferias en Silleda</a>.</p>
        ${porque('Silleda')}`
    }
  },
  constructor_stand_gijon: {
    es: {
      breadcrumb: 'Constructor de stands en Gijón',
      title: 'Constructor de stands en Gijón | Taller propio | Standarte',
      h1: 'Constructor de stands en Gijón',
      introText: "Construimos stands a medida para Recinto Ferial Luis Adaro desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Gijón: fabricación propia para Recinto Ferial Luis Adaro</h2>
        <p>El Recinto Ferial Luis Adaro vive la FIDMA, la gran feria de muestras del Cantábrico: dos semanas de público continuo, pabellones y exteriores. Un stand para esa feria se construye para durar, con materiales que no acusan quince días de uso y una distribución que reparte el flujo sin cuellos de botella.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Gijón')}
        ${tipos('Gijón')}
        <h2>Constructor de stands en Gijón: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fidma-gijon">FIDMA – Feria Internacional de Muestras de Asturias</a>, <a href="/ferias/stand-agropec-gijon">AGROPEC Gijón</a>, <a href="/ferias/stand-salon-competicion-asturias-gijon">Salón de Competición de Asturias</a>, <a href="/ferias/stand-asturforesta-tineo">Asturforesta</a>, <a href="/ferias/stand-feria-muestras-tineo">Feria de Muestras de Tineo</a> y <a href="/ferias/stand-agroalimentaria-vegadeo">Feria Agroalimentaria de Vegadeo</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_gijon">stands para ferias en Gijón</a>.</p>
        ${porque('Gijón')}`
    }
  },
  constructor_stand_santander: {
    es: {
      breadcrumb: 'Constructor de stands en Santander',
      title: 'Constructor de stands en Santander | Taller propio | Standarte',
      h1: 'Constructor de stands en Santander',
      introText: "Construimos stands a medida para Palacio de Exposiciones y Congresos de Santander desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Santander: fabricación propia para Palacio de Exposiciones y Congresos de Santander</h2>
        <p>El Palacio de Exposiciones de Santander recibe ferias de arte, ecología y automoción, y en Torrelavega el mercado nacional de ganados suma citas agrarias. Construimos para las dos plazas con el mismo taller: paredes limpias y luz cuidada para la obra de arte, suelo y accesos rodados para el vehículo o la maquinaria.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Santander')}
        ${tipos('Santander')}
        <h2>Constructor de stands en Santander: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-artesantander">ARTESANTANDER</a>, <a href="/ferias/stand-biocantabria-santander">BioCantabria</a>, <a href="/ferias/stand-feria-apicola-cantabria-torrelavega">Feria Nacional Apícola de Cantabria</a> y <a href="/ferias/stand-feria-concesionarios-torrelavega">Feria de Concesionarios de Torrelavega</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_santander">stands para ferias en Santander</a>.</p>
        ${porque('Santander')}`
    }
  },
  constructor_stand_irun: {
    es: {
      breadcrumb: 'Constructor de stands en Irún',
      title: 'Constructor de stands en Irún | Taller propio | Standarte',
      h1: 'Constructor de stands en Irún',
      introText: "Construimos stands a medida para Ficoba – Feria de Muestras de Gipuzkoa desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Irún: fabricación propia para Ficoba – Feria de Muestras de Gipuzkoa</h2>
        <p>Ficoba, en la frontera del Bidasoa, concentra movilidad, industria y ecología: MUBIL enseña vehículos y cargadores en funcionamiento, y Bioterra, producto para tocar y probar. Construimos con acometidas eléctricas de potencia previstas, suelo apto para vehículos y mobiliario de degustación fabricado en taller propio.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Irún')}
        ${tipos('Irún')}
        <h2>Constructor de stands en Irún: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-mubil-mobility-expo-irun">MUBIL Mobility Expo</a>, <a href="/ferias/stand-unire-irun">UNIRE</a>, <a href="/ferias/stand-bioterra-irun">Bioterra</a>, <a href="/ferias/stand-caravantur-irun">Caravantur</a>, <a href="/ferias/stand-uhinak-irun">Uhinak</a> y <a href="/ferias/stand-go-mobility-irun">Go Mobility</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_irun">stands para ferias en Irún</a>.</p>
        ${porque('Irún')}`
    }
  },
  constructor_stand_vitoria: {
    es: {
      breadcrumb: 'Constructor de stands en Vitoria',
      title: 'Constructor de stands en Vitoria | Taller propio | Standarte',
      h1: 'Constructor de stands en Vitoria',
      introText: "Construimos stands a medida para Palacio de Congresos Europa y recintos de Álava desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Vitoria: fabricación propia para Palacio de Congresos Europa y recintos de Álava</h2>
        <p>Vitoria-Gasteiz reparte sus ferias entre el Palacio Europa y los espacios feriales de Álava: empleo, formación, vino y comercio. Son citas de uno a tres días con montaje en horas, así que el stand llega premontado desde nuestro taller, con la gráfica aplicada y el mobiliario listo para colocar.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Vitoria')}
        ${tipos('Vitoria')}
        <h2>Constructor de stands en Vitoria: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-ardoaraba-vitoria">Ardoaraba</a>, <a href="/ferias/stand-avanza-fp-alava-vitoria">AVANZA – Feria de FP de Álava</a>, <a href="/ferias/stand-empleo-gune-vitoria">Empleo Gune</a>, <a href="/ferias/stand-feria-stocks-vitoria">Feria de Stocks</a> y <a href="/ferias/stand-lanberri-vitoria">Lanberri</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_vitoria">stands para ferias en Vitoria</a>.</p>
        ${porque('Vitoria')}`
    }
  },
  constructor_stand_pamplona: {
    es: {
      breadcrumb: 'Constructor de stands en Pamplona',
      title: 'Constructor de stands en Pamplona | Taller propio | Standarte',
      h1: 'Constructor de stands en Pamplona',
      introText: "Construimos stands a medida para Baluarte y recintos feriales de Navarra desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Pamplona: fabricación propia para Baluarte y recintos feriales de Navarra</h2>
        <p>Pamplona celebra sus ferias en Baluarte, el palacio de congresos, y en los recintos de Navarra: turismo, construcción, empleo y vino. En un palacio de congresos no se puede hacer obra: construimos stands ligeros y autoportantes, fabricados enteros en taller, que se anclan sin dañar el edificio y se retiran en una noche.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Pamplona')}
        ${tipos('Pamplona')}
        <h2>Constructor de stands en Pamplona: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-navartur-pamplona">NAVARTUR</a>, <a href="/ferias/stand-salon-estudiante-futuro-profesional-pamplona">Salón del Estudiante y Futuro Profesional</a>, <a href="/ferias/stand-edifica-pamplona">EDIFICA</a>, <a href="/ferias/stand-navarra-jobs-pamplona">Navarra Jobs</a>, <a href="/ferias/stand-feria-navarra-ecologica-pamplona">Feria Navarra Ecológica</a>, <a href="/ferias/stand-navarra-wine-gastronomy-pamplona">Navarra Wine & Gastronomy</a> y <a href="/ferias/stand-feria-turismo-reyno-navarra-pamplona">Feria Internacional de Turismo Reyno de Navarra</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_pamplona">stands para ferias en Pamplona</a>.</p>
        ${porque('Pamplona')}`
    }
  },
  constructor_stand_logrono: {
    es: {
      breadcrumb: 'Constructor de stands en Logroño',
      title: 'Constructor de stands en Logroño | Taller propio | Standarte',
      h1: 'Constructor de stands en Logroño',
      introText: "Construimos stands a medida para Riojaforum y recintos feriales de La Rioja desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Logroño: fabricación propia para Riojaforum y recintos feriales de La Rioja</h2>
        <p>Logroño es vino: en Riojaforum y en los recintos de La Rioja se catan botellas y se cierran distribuciones. Construimos stands de bodega con barra de cata a altura correcta, botellero iluminado sin calentar el vino, frío para los blancos y un reservado para la reunión con el importador.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Logroño')}
        ${tipos('Logroño')}
        <h2>Constructor de stands en Logroño: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-rioja-wine-trade-mission-logrono">Rioja Wine Trade Mission</a>, <a href="/ferias/stand-planeta-rioja-logrono">Planeta Rioja</a>, <a href="/ferias/stand-feria-formacion-profesional-la-rioja-logrono">Feria de Formación Profesional de La Rioja</a>, <a href="/ferias/stand-feria-vehiculo-ocasion-logrono">Feria del Vehículo de Ocasión de Logroño</a>, <a href="/ferias/stand-feria-maquinaria-agricola-alfaro">Feria de Maquinaria Agrícola de Alfaro</a> y <a href="/ferias/stand-ferias-agroalimentarias-rioja-oriental-calahorra">Ferias Agroalimentarias de la Rioja Oriental</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_logrono">stands para ferias en Logroño</a>.</p>
        ${porque('Logroño')}`
    }
  },
  constructor_stand_lleida: {
    es: {
      breadcrumb: 'Constructor de stands en Lleida',
      title: 'Constructor de stands en Lleida | Taller propio | Standarte',
      h1: 'Constructor de stands en Lleida',
      introText: "Construimos stands a medida para Fira de Lleida desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Lleida: fabricación propia para Fira de Lleida</h2>
        <p>Fira de Lleida es el recinto agrario del noreste: la Fira de Sant Miquel expone maquinaria y Municipàlia, equipamiento para ayuntamientos. Construimos stands que admiten un tractor dentro y un mostrador de atención al lado, con suelo técnico, gráfica de gran formato y almacén cerrado para material.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Lleida')}
        ${tipos('Lleida')}
        <h2>Constructor de stands en Lleida: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-municipalia-lleida">Municipàlia Lleida</a> y <a href="/ferias/stand-fira-sant-miquel-lleida">Fira de Sant Miquel Lleida</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_lleida">stands para ferias en Lleida</a>.</p>
        ${porque('Lleida')}`
    }
  },
  constructor_stand_girona: {
    es: {
      breadcrumb: 'Constructor de stands en Girona',
      title: 'Constructor de stands en Girona | Taller propio | Standarte',
      h1: 'Constructor de stands en Girona',
      introText: "Construimos stands a medida para Fira de Girona desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Girona: fabricación propia para Fira de Girona</h2>
        <p>Girona es gastronomía de primer nivel y su Fòrum Gastronòmic pide stands de cocina en directo: tomas de agua y potencia, extracción, plano de trabajo a altura profesional y una barra de degustación de cara al pasillo. Todo se fabrica en taller propio y llega probado al recinto.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Girona')}
        ${tipos('Girona')}
        <h2>Constructor de stands en Girona: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-forum-gastronomic-girona">Fòrum Gastronòmic Girona</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_girona">stands para ferias en Girona</a>.</p>
        ${porque('Girona')}`
    }
  },
  constructor_stand_mallorca: {
    es: {
      breadcrumb: 'Constructor de stands en Mallorca',
      title: 'Constructor de stands en Mallorca | Taller propio | Standarte',
      h1: 'Constructor de stands en Mallorca',
      introText: "Construimos stands a medida para Palau de Congressos de Palma y Moll Vell desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Mallorca: fabricación propia para Palau de Congressos de Palma y Moll Vell</h2>
        <p>En Mallorca se expone a pie de muelle: el Palma International Boat Show y el Superyacht Village montan en el Moll Vell, con viento, sal y carga a mano. Construimos stands para exterior portuario —estructura arriostrada, materiales marinos, gráfica que no se despega— y, en el Palau de Congressos, stands de hostelería y producto local.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Mallorca')}
        ${tipos('Mallorca')}
        <h2>Constructor de stands en Mallorca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-palma-international-boat-show">Palma International Boat Show</a>, <a href="/ferias/stand-palma-superyacht-village">Palma Superyacht Village</a>, <a href="/ferias/stand-baleart-mallorca">Baleart</a>, <a href="/ferias/stand-dijous-bo-mallorca">Dijous Bo</a>, <a href="/ferias/stand-horeca-baleares-mallorca">HORECA Baleares Mallorca</a>, <a href="/ferias/stand-fira-vi-pollenca-mallorca">Fira del Vi de Pollença</a>, <a href="/ferias/stand-wine-days-binissalem-mallorca">Wine Days Mallorca – DO Binissalem</a> y <a href="/ferias/stand-fira-sipia-alcudia-mallorca">Fira de la Sípia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_mallorca">stands para ferias en Mallorca</a>.</p>
        ${porque('Mallorca')}`
    }
  },
  constructor_stand_ibiza: {
    es: {
      breadcrumb: 'Constructor de stands en Ibiza',
      title: 'Constructor de stands en Ibiza | Taller propio | Standarte',
      h1: 'Constructor de stands en Ibiza',
      introText: "Construimos stands a medida para Recinto Ferial de Ibiza desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Ibiza: fabricación propia para Recinto Ferial de Ibiza</h2>
        <p>Ibiza tiene ferias náuticas, de hostelería y de comercio, y una logística de isla: todo llega en barco y el margen para un olvido es nulo. Construimos el stand completo en taller, lo premontamos y lo embarcamos con las piezas numeradas y los repuestos dentro, para montar sin depender de un proveedor local.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Ibiza')}
        ${tipos('Ibiza')}
        <h2>Constructor de stands en Ibiza: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-horeca-baleares-ibiza">HORECA Baleares Ibiza</a>, <a href="/ferias/stand-fira-mar-ibiza">Fira de la Mar</a> y <a href="/ferias/stand-feria-stocks-ibiza">Feria de Stocks de Ibiza</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_ibiza">stands para ferias en Ibiza</a>.</p>
        ${porque('Ibiza')}`
    }
  },
  constructor_stand_menorca: {
    es: {
      breadcrumb: 'Constructor de stands en Menorca',
      title: 'Constructor de stands en Menorca | Taller propio | Standarte',
      h1: 'Constructor de stands en Menorca',
      introText: "Construimos stands a medida para Recintos feriales de Menorca desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Menorca: fabricación propia para Recintos feriales de Menorca</h2>
        <p>Menorca celebra ferias de producto local, agroalimentación y hostelería, con expositores que traen queso, vino y embutido para probar. Construimos stands con mostrador refrigerado, superficies lavables y barra de degustación, embarcados desde la península ya premontados y con sus repuestos.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Menorca')}
        ${tipos('Menorca')}
        <h2>Constructor de stands en Menorca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-horeca-baleares-menorca">HORECA Baleares Menorca</a>, <a href="/ferias/stand-fira-camp-alaior-menorca">Fira del Camp</a> y <a href="/ferias/stand-arrels-menorca">Arrels, Fira de Producte Local i Cuina de Menorca</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_menorca">stands para ferias en Menorca</a>.</p>
        ${porque('Menorca')}`
    }
  },
  constructor_stand_islas_canarias: {
    es: {
      breadcrumb: 'Constructor de stands en Canarias',
      title: 'Constructor de stands en Canarias | Taller propio | Standarte',
      h1: 'Constructor de stands en Canarias',
      introText: "Construimos stands a medida para Recinto Ferial de Tenerife e Infecar (Gran Canaria) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Canarias: fabricación propia para Recinto Ferial de Tenerife e Infecar (Gran Canaria)</h2>
        <p>Canarias tiene dos recintos principales, en Santa Cruz de Tenerife y Las Palmas, y una regla logística: el contenedor sale con antelación y no vuelve a por lo que falte. Fabricamos y premontamos el stand entero en taller, lo documentamos pieza a pieza y lo embarcamos con repuestos, para que el montaje en la isla sea solo montaje.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Canarias')}
        ${tipos('Canarias')}
        <h2>Constructor de stands en Canarias: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feaga-fuerteventura">FEAGA</a>, <a href="/ferias/stand-gastrocanarias-tenerife">GastroCanarias</a>, <a href="/ferias/stand-gran-canaria-me-gusta">Gran Canaria Me Gusta</a>, <a href="/ferias/stand-canagua-energia-gran-canaria">Canagua & Energía</a>, <a href="/ferias/stand-fimar-las-palmas">FIMAR</a>, <a href="/ferias/stand-salon-atlantico-logistica-transporte">Salón Atlántico de Logística y Transporte</a>, <a href="/ferias/stand-moda-tenerife">Feria Internacional de Moda de Tenerife</a> y <a href="/ferias/stand-expodeca">ExpoDeca</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_islas_canarias">stands para ferias en Canarias</a>.</p>
        ${porque('Canarias')}`
    }
  },
  constructor_stand_ceuta: {
    es: {
      breadcrumb: 'Constructor de stands en Ceuta',
      title: 'Constructor de stands en Ceuta | Taller propio | Standarte',
      h1: 'Constructor de stands en Ceuta',
      introText: "Construimos stands a medida para Palacio de Congresos de Ceuta desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Ceuta: fabricación propia para Palacio de Congresos de Ceuta</h2>
        <p>Ceuta expone en su Palacio de Congresos y en espacios de la ciudad: economía azul, emprendimiento y tecnología. El stand cruza el Estrecho en barco y se monta en un edificio de congresos, así que lo construimos ligero, autoportante y premontado, con gráfica aplicada en taller y montaje en horas.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Ceuta')}
        ${tipos('Ceuta')}
        <h2>Constructor de stands en Ceuta: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-bet-on-ceuta">Bet On Ceuta</a>, <a href="/ferias/stand-ceuta-impulsa">Ceuta Impulsa</a> y <a href="/ferias/stand-odissea-economia-azul-ceuta">Odissea, Economía Azul de Ceuta</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_ceuta">stands para ferias en Ceuta</a>.</p>
        ${porque('Ceuta')}`
    }
  },
  constructor_stand_melilla: {
    es: {
      breadcrumb: 'Constructor de stands en Melilla',
      title: 'Constructor de stands en Melilla | Taller propio | Standarte',
      h1: 'Constructor de stands en Melilla',
      introText: "Construimos stands a medida para Palacio de Exposiciones y Congresos de Melilla desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Melilla: fabricación propia para Palacio de Exposiciones y Congresos de Melilla</h2>
        <p>Melilla celebra sus ferias de oportunidades económicas y de representación intercultural en el Palacio de Exposiciones y Congresos. Todo viaja en barco: construimos el stand completo en taller, lo premontamos y lo embarcamos numerado, con repuestos y herramienta, para montar sin sorpresas al llegar.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Melilla')}
        ${tipos('Melilla')}
        <h2>Constructor de stands en Melilla: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-oportunidades-economicas-melilla">Feria de Oportunidades Económicas de Melilla</a>, <a href="/ferias/stand-feria-representacion-intercultural-melilla">Feria de Representación Intercultural de Melilla</a> y <a href="/ferias/stand-eventos-empresariales-proyecto-melilla">Eventos Empresariales Proyecto Melilla</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_melilla">stands para ferias en Melilla</a>.</p>
        ${porque('Melilla')}`
    }
  },
  constructor_stand_tanger: {
    es: {
      breadcrumb: 'Constructor de stands en Tánger',
      title: 'Constructor de stands en Tánger | Taller propio | Standarte',
      h1: 'Constructor de stands en Tánger',
      introText: "Construimos stands a medida para Recintos feriales de Tánger y Tanger Med desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Tánger: fabricación propia para Recintos feriales de Tánger y Tanger Med</h2>
        <p>Tánger es textil, moda e industria: Maroc in Mode y los encuentros de Tanger Med reúnen a fabricantes que exponen muestrario y capacidad productiva. Construimos stands con paneles de colección, probador y sala de reunión, fabricados en España, transportados con la documentación aduanera preparada y montados por nuestro propio equipo.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Tánger')}
        ${tipos('Tánger')}
        <h2>Constructor de stands en Tánger: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-maroc-in-mode-mim-tanger">Maroc in Mode (MIM) Tánger</a>, <a href="/ferias/stand-tanger-nexus">Tanger Nexus</a>, <a href="/ferias/stand-tanger-fashion-week">Tanger Fashion Week</a>, <a href="/ferias/stand-amith-nord-tanger">Encuentros Industriales AMITH Nord</a> y <a href="/ferias/stand-eventos-industriales-tanger-med">Eventos Industriales Tanger Med</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_tanger">stands para ferias en Tánger</a>.</p>
        ${porque('Tánger')}`
    }
  },
  constructor_stand_casablanca: {
    es: {
      breadcrumb: 'Constructor de stands en Casablanca',
      title: 'Constructor de stands en Casablanca | Taller propio | Standarte',
      h1: 'Constructor de stands en Casablanca',
      introText: "Construimos stands a medida para Parc d’Exposition de l’OFEC (Casablanca) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Casablanca: fabricación propia para Parc d’Exposition de l’OFEC (Casablanca)</h2>
        <p>Casablanca es la plaza ferial de Marruecos: logística, alimentación, energía, plástico y packaging pasan por el recinto de la OFEC. Exponer allí desde España exige transporte con carnet ATA o exportación temporal y un stand que se monte sin depender de talleres locales: lo fabricamos entero, lo premontamos y viajamos con él.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Casablanca')}
        ${tipos('Casablanca')}
        <h2>Constructor de stands en Casablanca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-logismed-casablanca">Logismed</a>, <a href="/ferias/stand-morocco-food-expo-casablanca">Morocco Food Expo</a>, <a href="/ferias/stand-siema-casablanca">Morocco SIEMA Expo</a>, <a href="/ferias/stand-siab-casablanca">SIAB Expo Maroc</a>, <a href="/ferias/stand-elec-expo-casablanca">Elec Expo</a>, <a href="/ferias/stand-ener-event-casablanca">Ener Event</a>, <a href="/ferias/stand-plast-expo-casablanca">Plast Expo</a> y <a href="/ferias/stand-pack-expo-casablanca">Pack Expo Morocco</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_casablanca">stands para ferias en Casablanca</a>.</p>
        ${porque('Casablanca')}`
    }
  },
  constructor_stand_rabat: {
    es: {
      breadcrumb: 'Constructor de stands en Rabat',
      title: 'Constructor de stands en Rabat | Taller propio | Standarte',
      h1: 'Constructor de stands en Rabat',
      introText: "Construimos stands a medida para Recintos de ferias y congresos de Rabat desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Rabat: fabricación propia para Recintos de ferias y congresos de Rabat</h2>
        <p>Rabat expone edición, cultura, formación y música: el SIEL llena de editoriales y librerías su recinto y el Forum de l’Étudiant reúne a universidades. Son stands de libro y de información: estanterías a la altura de la mano, mostrador de venta, buena luz de lectura y un almacén para el fondo, construidos en taller y transportados con su documentación.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Rabat')}
        ${tipos('Rabat')}
        <h2>Constructor de stands en Rabat: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-siel-rabat">SIEL — Salon International de l'Édition et du Livre</a>, <a href="/ferias/stand-visa-for-music-rabat">Visa For Music</a>, <a href="/ferias/stand-forum-etudiant-rabat">Forum de l'Étudiant, de la Formation et de l'Emploi</a> y <a href="/ferias/stand-cimqusef-rabat">CIMQUSEF</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_rabat">stands para ferias en Rabat</a>.</p>
        ${porque('Rabat')}`
    }
  },
  constructor_stand_andorra: {
    es: {
      breadcrumb: 'Constructor de stands en Andorra',
      title: 'Constructor de stands en Andorra | Taller propio | Standarte',
      h1: 'Constructor de stands en Andorra',
      introText: "Construimos stands a medida para Centre de Congressos d’Andorra la Vella y recintos del Principado desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Andorra: fabricación propia para Centre de Congressos d’Andorra la Vella y recintos del Principado</h2>
        <p>Andorra celebra ferias multisectoriales, gastronómicas y de comercio en Andorra la Vella y en las parroquias. El transporte entra por carretera de montaña y pasa aduana: construimos el stand premontado y compacto, con las piezas dimensionadas para el camión que sube el puerto, y lo montamos con nuestro equipo.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Andorra')}
        ${tipos('Andorra')}
        <h2>Constructor de stands en Andorra: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fira-andorra-la-vella">Fira d'Andorra la Vella</a>, <a href="/ferias/stand-enfirat-encamp">Enfira't</a>, <a href="/ferias/stand-andorra-taste">Andorra Taste</a>, <a href="/ferias/stand-fira-del-vermut-andorra">Fira del Vermut d'Andorra</a>, <a href="/ferias/stand-fira-del-bestiar-ordino">Fira del Bestiar d'Ordino</a>, <a href="/ferias/stand-mercat-de-la-vall-andorra">Mercat de la Vall</a> y <a href="/ferias/stand-fira-outlet-soldeu">Fira Outlet de Soldeu</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_andorra">stands para ferias en Andorra</a>.</p>
        ${porque('Andorra')}`
    }
  },
  constructor_stand_teruel: {
    es: {
      breadcrumb: 'Constructor de stands en Teruel',
      title: 'Constructor de stands en Teruel | Taller propio | Standarte',
      h1: 'Constructor de stands en Teruel',
      introText: "Construimos stands a medida para Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Teruel: fabricación propia para Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia</h2>
        <p>Teruel es jamón, agroalimentación y maquinaria de campo, con ferias en la capital, Calamocha y Alcañiz. Construimos stands de producto para probar —mostrador con corte, frío y superficies lavables— y stands de maquinaria con suelo reforzado, fabricados en taller y montados en un día.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Teruel')}
        ${tipos('Teruel')}
        <h2>Constructor de stands en Teruel: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-jamon-teruel">Feria del Jamón de Teruel y Alimentos de Calidad</a>, <a href="/ferias/stand-expocalamocha">ExpoCalamocha</a> y <a href="/ferias/stand-agroalcaniz">AgroAlcañiz</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_teruel">stands para ferias en Teruel</a>.</p>
        ${porque('Teruel')}`
    }
  },
  constructor_stand_aranda: {
    es: {
      breadcrumb: 'Constructor de stands en Aranda de Duero',
      title: 'Constructor de stands en Aranda de Duero | Taller propio | Standarte',
      h1: 'Constructor de stands en Aranda de Duero',
      introText: "Construimos stands a medida para Recinto Ferial de Aranda de Duero desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Aranda de Duero: fabricación propia para Recinto Ferial de Aranda de Duero</h2>
        <p>Aranda de Duero es la capital de la Ribera y sus ferias giran en torno al vino: cata, premios y encuentros de bodegas. Construimos stands de bodega con barra de cata, botellero iluminado en frío y reservado para el distribuidor, fabricados en taller y reutilizables en las siguientes citas del vino.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Aranda de Duero')}
        ${tipos('Aranda de Duero')}
        <h2>Constructor de stands en Aranda de Duero: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-espacio-ribera-aranda">Espacio Ribera</a>, <a href="/ferias/stand-premios-envero-enverofest-aranda">Premios Envero / EnveroFest</a> y <a href="/ferias/stand-congreso-la-cierna-aranda">Congreso La Cierna</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_aranda_de_duero">stands para ferias en Aranda de Duero</a>.</p>
        ${porque('Aranda de Duero')}`
    }
  },
  constructor_stand_ciudad_real: {
    es: {
      breadcrumb: 'Constructor de stands en Ciudad Real',
      title: 'Constructor de stands en Ciudad Real | Taller propio | Standarte',
      h1: 'Constructor de stands en Ciudad Real',
      introText: "Construimos stands a medida para Pabellón Ferial de Ciudad Real (IFEDI) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Ciudad Real: fabricación propia para Pabellón Ferial de Ciudad Real (IFEDI)</h2>
        <p>Ciudad Real es vino y campo: Fenavin reúne a bodegas y compradores internacionales, y FERCAM y FERDUQUE traen maquinaria y ganado. Construimos stands de cata con frío y botellero, y stands de maquinaria con suelo reforzado, ambos desde nuestro taller y con montaje propio en el Pabellón Ferial.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Ciudad Real')}
        ${tipos('Ciudad Real')}
        <h2>Constructor de stands en Ciudad Real: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fenavin-match-ciudad-real">Fenavin Match Ciudad Real</a>, <a href="/ferias/stand-ferduque-ciudad-real">FERDUQUE</a>, <a href="/ferias/stand-fercam-manzanares-ciudad-real">FERCAM</a> y <a href="/ferias/stand-fercatur-ciudad-real">Fercatur Ciudad Real</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_ciudad_real">stands para ferias en Ciudad Real</a>.</p>
        ${porque('Ciudad Real')}`
    }
  },
  constructor_stand_zafra: {
    es: {
      breadcrumb: 'Constructor de stands en Zafra',
      title: 'Constructor de stands en Zafra | Taller propio | Standarte',
      h1: 'Constructor de stands en Zafra',
      introText: "Construimos stands a medida para Recinto Ferial de Zafra desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Zafra: fabricación propia para Recinto Ferial de Zafra</h2>
        <p>Zafra vive su Feria Internacional Ganadera en un recinto de campo, con animales, maquinaria y público durante una semana. Construimos stands para esa dureza —suelo lavable, estructura sólida, almacén cerrado— desde nuestro taller de Cáceres, a menos de una hora, con capacidad de resolver cualquier ajuste el mismo día.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Zafra')}
        ${tipos('Zafra')}
        <h2>Constructor de stands en Zafra: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-internacional-ganadera-zafra">Feria Internacional Ganadera de Zafra</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/montaje_stand_zafra">stands para ferias en Zafra</a>.</p>
        ${porque('Zafra')}`
    }
  },
  constructor_stand_trujillo: {
    es: {
      breadcrumb: 'Constructor de stands en Trujillo',
      title: 'Constructor de stands en Trujillo | Taller propio | Standarte',
      h1: 'Constructor de stands en Trujillo',
      introText: "Construimos stands a medida para Recinto Ferial de Trujillo desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Trujillo: fabricación propia para Recinto Ferial de Trujillo</h2>
        <p>Trujillo celebra la Feria del Queso y la Feria Agroganadera: producto para probar y ganado para ver. Construimos mostradores de corte y degustación con frío y superficies lavables, y stands de exterior cubierto para la feria ganadera, desde nuestro taller de Cáceres, a menos de una hora del recinto.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Trujillo')}
        ${tipos('Trujillo')}
        <h2>Constructor de stands en Trujillo: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-internacional-ganadera-trujillo">Feria Agroganadera de Trujillo</a> y <a href="/ferias/stand-feria-nacional-queso-trujillo">Feria Nacional del Queso de Trujillo</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_trujillo">stands para ferias en Trujillo</a>.</p>
        ${porque('Trujillo')}`
    }
  },
  constructor_stand_almeria: {
    es: {
      breadcrumb: 'Constructor de stands en Almería',
      title: 'Constructor de stands en Almería | Taller propio | Standarte',
      h1: 'Constructor de stands en Almería',
      introText: "Construimos stands a medida para Palacio de Exposiciones y Congresos de Aguadulce desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Almería: fabricación propia para Palacio de Exposiciones y Congresos de Aguadulce</h2>
        <p>Almería es agricultura intensiva: Infoagro y Expolevante enseñan semillas, riego, plástico y maquinaria de invernadero a un visitante muy técnico. Construimos stands donde el sistema se muestra montado y funcionando, con toma de agua, potencia y suelo reforzado, fabricados en taller propio.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Almería')}
        ${tipos('Almería')}
        <h2>Constructor de stands en Almería: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-infoagro-exhibition-aguadulce">Infoagro Exhibition</a>, <a href="/ferias/stand-expolevante-el-ejido">Expolevante</a> y <a href="/ferias/stand-sun-blue-congress-almeria">Sun&Blue Congress</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_almeria">stands para ferias en Almería</a>.</p>
        ${porque('Almería')}`
    }
  },
  constructor_stand_jaen: {
    es: {
      breadcrumb: 'Constructor de stands en Jaén',
      title: 'Constructor de stands en Jaén | Taller propio | Standarte',
      h1: 'Constructor de stands en Jaén',
      introText: "Construimos stands a medida para IFEJA – Palacio de Ferias y Congresos de Jaén desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Jaén: fabricación propia para IFEJA – Palacio de Ferias y Congresos de Jaén</h2>
        <p>Jaén es aceite: Expoliva reúne a almazaras, maquinaria de molienda y envasado y compradores de medio mundo en IFEJA. Construimos stands de cata con mostrador, vitrina y luz que no falsea el color del aceite, y stands de maquinaria con suelo reforzado, ambos desde nuestro taller y con montaje propio.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Jaén')}
        ${tipos('Jaén')}
        <h2>Constructor de stands en Jaén: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-expoliva-jaen">Expoliva</a>, <a href="/ferias/stand-ibercaza-jaen">Ibercaza</a> y <a href="/ferias/stand-feria-de-los-pueblos-jaen">Feria de los Pueblos</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_jaen">stands para ferias en Jaén</a>.</p>
        ${porque('Jaén')}`
    }
  },
  constructor_stand_huelva: {
    es: {
      breadcrumb: 'Constructor de stands en Huelva',
      title: 'Constructor de stands en Huelva | Taller propio | Standarte',
      h1: 'Constructor de stands en Huelva',
      introText: "Construimos stands a medida para Palacio de Congresos Casa Colón y recintos de la provincia desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Huelva: fabricación propia para Palacio de Congresos Casa Colón y recintos de la provincia</h2>
        <p>Huelva junta frutos rojos, jamón ibérico y pesca en tres recintos distintos: Casa Colón en la capital, Aracena en la sierra y Punta Umbría en la costa. Construimos con el mismo taller para los tres: stand de congreso ligero, mostrador de corte con frío, o stand de exterior cubierto para la feria de la gamba.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Huelva')}
        ${tipos('Huelva')}
        <h2>Constructor de stands en Huelva: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-congreso-internacional-frutos-rojos-huelva">Congreso Internacional de Frutos Rojos</a>, <a href="/ferias/stand-feria-jamon-cerdo-iberico-aracena">Feria del Jamón y Cerdo Ibérico de Aracena</a> y <a href="/ferias/stand-feria-gamba-chirla-boqueron-punta-umbria">Feria Nacional de la Gamba, la Chirla y el Boquerón</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_huelva">stands para ferias en Huelva</a>.</p>
        ${porque('Huelva')}`
    }
  },
  constructor_stand_cordoba: {
    es: {
      breadcrumb: 'Constructor de stands en Córdoba',
      title: 'Constructor de stands en Córdoba | Taller propio | Standarte',
      h1: 'Constructor de stands en Córdoba',
      introText: "Construimos stands a medida para Recintos feriales de Córdoba y Los Pedroches desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Córdoba: fabricación propia para Recintos feriales de Córdoba y Los Pedroches</h2>
        <p>Córdoba es caza y cerdo ibérico: Intercaza en la capital y las ferias agroganaderas y del jamón de Los Pedroches. Construimos stands de degustación con mostrador de corte y frío, y stands de exterior cubierto con suelo lavable para las ferias de ganado, fabricados en taller y montados por nuestro equipo.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Córdoba')}
        ${tipos('Córdoba')}
        <h2>Constructor de stands en Córdoba: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-intercaza-cordoba">Intercaza</a>, <a href="/ferias/stand-feria-agroganadera-pedroches-pozoblanco">Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches</a> y <a href="/ferias/stand-feria-jamon-bellota-dop-pedroches-villanueva-cordoba">Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_cordoba">stands para ferias en Córdoba</a>.</p>
        ${porque('Córdoba')}`
    }
  },
  constructor_stand_granada: {
    es: {
      breadcrumb: 'Constructor de stands en Granada',
      title: 'Constructor de stands en Granada | Taller propio | Standarte',
      h1: 'Constructor de stands en Granada',
      introText: "Construimos stands a medida para Fermasa (Armilla) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Granada: fabricación propia para Fermasa (Armilla)</h2>
        <p>Granada expone en Fermasa, el recinto de Armilla: feria general de muestras, moda, ciencia y mundo ecuestre. Es un calendario de gran público, así que construimos stands que aguantan fines de semana de aforo completo, con gráfica resistente, mostrador de atención y almacén cerrado.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Granada')}
        ${tipos('Granada')}
        <h2>Constructor de stands en Granada: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-general-muestras-armilla">Feria General de Muestras de Armilla</a>, <a href="/ferias/stand-feria-de-la-ciencia-granada">Feria de la Ciencia</a>, <a href="/ferias/stand-concab-granada">CONCAB Granada</a>, <a href="/ferias/stand-belmoda-granada">Belmoda Granada</a>, <a href="/ferias/stand-sabores-nuestra-tierra-granada">Sabores de Nuestra Tierra</a> y <a href="/ferias/stand-feria-pueblos-granada">Feria de los Pueblos de Granada</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_granada">stands para ferias en Granada</a>.</p>
        ${porque('Granada')}`
    }
  },
  constructor_stand_cadiz: {
    es: {
      breadcrumb: 'Constructor de stands en Cádiz',
      title: 'Constructor de stands en Cádiz | Taller propio | Standarte',
      h1: 'Constructor de stands en Cádiz',
      introText: "Construimos stands a medida para Palacio de Congresos de Cádiz e IFECA (Jerez) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Cádiz: fabricación propia para Palacio de Congresos de Cádiz e IFECA (Jerez)</h2>
        <p>Cádiz reparte sus citas entre el Palacio de Congresos de la capital, con la economía azul y lo naval, e IFECA en Jerez, con la Feria del Caballo y Fegasur. Construimos stand de congreso ligero para el primero y stand ganadero de exterior cubierto para el segundo, ambos desde nuestro taller.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Cádiz')}
        ${tipos('Cádiz')}
        <h2>Constructor de stands en Cádiz: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-blue-zone-forum-navalia-meeting-cadiz">Blue Zone Forum Navalia Meeting</a>, <a href="/ferias/stand-feria-del-caballo-jerez">Feria del Caballo de Jerez</a> y <a href="/ferias/stand-fegasur-jerez">Fegasur</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_cadiz">stands para ferias en Cádiz</a>.</p>
        ${porque('Cádiz')}`
    }
  },
  constructor_stand_marsella: {
    es: {
      breadcrumb: 'Constructor de stands en Marsella',
      title: 'Constructor de stands en Marsella | Taller propio | Standarte',
      h1: 'Constructor de stands en Marsella',
      introText: "Construimos stands a medida para Parc Chanot – Parc des Expositions et des Congrès de Marseille desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Marsella: fabricación propia para Parc Chanot – Parc des Expositions et des Congrès de Marseille</h2>
        <p>Parc Chanot recibe desde la Foire Internationale hasta Euromaritime y Sirha Méditerranée: gran público, industria marítima y restauración. Exponer allí desde España es transporte largo y montaje con normas francesas: fabricamos el stand premontado, con certificados de reacción al fuego, y lo montamos con nuestro propio equipo.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Marsella')}
        ${tipos('Marsella')}
        <h2>Constructor de stands en Marsella: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-marseille">Foire Internationale de Marseille</a>, <a href="/ferias/stand-euromaritime-marseille">Euromaritime</a>, <a href="/ferias/stand-sirha-mediterranee-marseille">Sirha Méditerranée</a>, <a href="/ferias/stand-beauty-profs-marseille">Beauty Prof's</a>, <a href="/ferias/stand-savim-marseille">SAVIM</a>, <a href="/ferias/stand-salon-piscine-jardin-marseille">Salon Piscine & Jardin</a>, <a href="/ferias/stand-solutions-cse-marseille">Solutions CSE Marseille</a> y <a href="/ferias/stand-japan-expo-sud-marseille">Japan Expo Sud</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_marsella">stands para ferias en Marsella</a>.</p>
        ${porque('Marsella')}`
    }
  },
  constructor_stand_cannes: {
    es: {
      breadcrumb: 'Constructor de stands en Cannes',
      title: 'Constructor de stands en Cannes | Taller propio | Standarte',
      h1: 'Constructor de stands en Cannes',
      introText: "Construimos stands a medida para Palais des Festivals et des Congrès desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Cannes: fabricación propia para Palais des Festivals et des Congrès</h2>
        <p>Cannes es el Palais des Festivals: MIPIM, MAPIC y TFWA son mercados donde el stand es una oficina de negociación con imagen de marca. Construimos despachos cerrados con acústica, recepción y gráfica de alto acabado, fabricados en taller y montados en las horas escasas que da el Palais.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Cannes')}
        ${tipos('Cannes')}
        <h2>Constructor de stands en Cannes: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-cannes-yachting-festival">Cannes Yachting Festival</a>, <a href="/ferias/stand-interior-exterior-design-meetings-cannes">Interior & Exterior Design Meetings</a>, <a href="/ferias/stand-mapic-cannes">MAPIC</a>, <a href="/ferias/stand-mipim-cannes">MIPIM</a> y <a href="/ferias/stand-tfwa-cannes">TFWA World Exhibition</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_cannes">stands para ferias en Cannes</a>.</p>
        ${porque('Cannes')}`
    }
  },
  constructor_stand_avignon: {
    es: {
      breadcrumb: 'Constructor de stands en Aviñón',
      title: 'Constructor de stands en Aviñón | Taller propio | Standarte',
      h1: 'Constructor de stands en Aviñón',
      introText: "Construimos stands a medida para Parc des Expositions d’Avignon (Agroparc) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Aviñón: fabricación propia para Parc des Expositions d’Avignon (Agroparc)</h2>
        <p>Aviñón es agricultura mediterránea: MED’Agri reúne riego, semillas, maquinaria y frutales en el Parc des Expositions. Construimos stands donde el equipo se muestra montado, con toma de agua y potencia, suelo reforzado y gráfica en francés, fabricados en taller y transportados por carretera con el montaje incluido.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Aviñón')}
        ${tipos('Aviñón')}
        <h2>Constructor de stands en Aviñón: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-medagri-avignon">MED'Agri</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_avignon">stands para ferias en Aviñón</a>.</p>
        ${porque('Aviñón')}`
    }
  },
  constructor_stand_toulouse: {
    es: {
      breadcrumb: 'Constructor de stands en Toulouse',
      title: 'Constructor de stands en Toulouse | Taller propio | Standarte',
      h1: 'Constructor de stands en Toulouse',
      introText: "Construimos stands a medida para MEETT – Parc des Expositions de Toulouse desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Toulouse: fabricación propia para MEETT – Parc des Expositions de Toulouse</h2>
        <p>Toulouse es aeronáutica: Aeromart y el Aerospace Test & Development Show reúnen en el MEETT a proveedores de piezas y ensayo con reuniones cerradas de antemano. Construimos stands de negocio —mesas de reunión, vitrinas para piezas de precisión, pantalla— fabricados en taller y montados en el recinto nuevo de Aussonne por nuestro equipo.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Toulouse')}
        ${tipos('Toulouse')}
        <h2>Constructor de stands en Toulouse: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-toulouse">Foire Internationale de Toulouse</a>, <a href="/ferias/stand-cfia-toulouse">CFIA Toulouse</a>, <a href="/ferias/stand-sepem-industries-toulouse">SEPEM Industries Toulouse</a>, <a href="/ferias/stand-aerospace-test-development-show-toulouse">Aerospace Test & Development Show</a>, <a href="/ferias/stand-aeromart-toulouse">Aeromart Toulouse</a>, <a href="/ferias/stand-siane-toulouse">Salon SIANE</a> y <a href="/ferias/stand-smahrt-toulouse">SMAHRT</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_toulouse">stands para ferias en Toulouse</a>.</p>
        ${porque('Toulouse')}`
    }
  },
  constructor_stand_burdeos: {
    es: {
      breadcrumb: 'Constructor de stands en Burdeos',
      title: 'Constructor de stands en Burdeos | Taller propio | Standarte',
      h1: 'Constructor de stands en Burdeos',
      introText: "Construimos stands a medida para Parc des Expositions de Bordeaux-Lac desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Burdeos: fabricación propia para Parc des Expositions de Bordeaux-Lac</h2>
        <p>Burdeos es vino y viticultura: Vinitech-Sifel llena Bordeaux-Lac de maquinaria de bodega y viña, y los salones de vignerons, de botellas para catar. Construimos stands de maquinaria con suelo reforzado y stands de cata con barra y frío, fabricados en taller y llevados por carretera con nuestro montaje.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Burdeos')}
        ${tipos('Burdeos')}
        <h2>Constructor de stands en Burdeos: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-bordeaux">Foire Internationale de Bordeaux</a>, <a href="/ferias/stand-vinitech-sifel-bordeaux">Vinitech-Sifel</a>, <a href="/ferias/stand-equitaine-bordeaux">Equitaine</a>, <a href="/ferias/stand-salon-agriculture-nouvelle-aquitaine-bordeaux">Salon de l'Agriculture Nouvelle-Aquitaine</a>, <a href="/ferias/stand-art3f-bordeaux">Art3f Bordeaux</a>, <a href="/ferias/stand-grand-salon-habitat-bordeaux">Grand Salon Habitat</a>, <a href="/ferias/stand-salon-vins-vignerons-independants-bordeaux">Salon des Vins des Vignerons Indépendants</a> y <a href="/ferias/stand-cycleau-nouvelle-aquitaine-bordeaux">Cycl'Eau Nouvelle-Aquitaine</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_burdeos">stands para ferias en Burdeos</a>.</p>
        ${porque('Burdeos')}`
    }
  },
  constructor_stand_lyon: {
    es: {
      breadcrumb: 'Constructor de stands en Lyon',
      title: 'Constructor de stands en Lyon | Taller propio | Standarte',
      h1: 'Constructor de stands en Lyon',
      introText: "Construimos stands a medida para Eurexpo Lyon desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Lyon: fabricación propia para Eurexpo Lyon</h2>
        <p>Eurexpo es un recinto industrial de gran escala: Global Industrie, Pollutec y SIRHA exponen máquinas en funcionamiento y cocinas en directo. Construimos stands con potencia y aire comprimido previstos, suelo técnico y extracción para cocina, fabricados en taller y montados con nuestro equipo bajo las normas del recinto.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Lyon')}
        ${tipos('Lyon')}
        <h2>Constructor de stands en Lyon: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sirha-lyon">SIRHA</a>, <a href="/ferias/stand-global-industrie-lyon">Global Industrie</a>, <a href="/ferias/stand-pollutec-lyon">Pollutec Lyon</a>, <a href="/ferias/stand-piscine-global-lyon">Piscine Global Europe</a>, <a href="/ferias/stand-preventica-lyon">Préventica Lyon</a>, <a href="/ferias/stand-prod-pack-lyon">Prod&Pack</a> y <a href="/ferias/stand-bepositive-lyon">BEPOSITIVE</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_lyon">stands para ferias en Lyon</a>.</p>
        ${porque('Lyon')}`
    }
  },
  constructor_stand_grenoble: {
    es: {
      breadcrumb: 'Constructor de stands en Grenoble',
      title: 'Constructor de stands en Grenoble | Taller propio | Standarte',
      h1: 'Constructor de stands en Grenoble',
      introText: "Construimos stands a medida para Alpexpo desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Grenoble: fabricación propia para Alpexpo</h2>
        <p>Grenoble es montaña e industria: Mountain Planet reúne remontes, nieve artificial y equipamiento de estación en Alpexpo. Son productos grandes y pesados: construimos stands con suelo reforzado, estructura para colgar elementos y gráfica de gran formato, fabricados en taller y transportados por carretera.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Grenoble')}
        ${tipos('Grenoble')}
        <h2>Constructor de stands en Grenoble: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-mountain-planet-grenoble">Mountain Planet</a> y <a href="/ferias/stand-sepem-industries-sud-est-grenoble">SEPEM Industries Sud-Est</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_grenoble">stands para ferias en Grenoble</a>.</p>
        ${porque('Grenoble')}`
    }
  },
  constructor_stand_clermont_ferrand: {
    es: {
      breadcrumb: 'Constructor de stands en Clermont-Ferrand',
      title: 'Constructor de stands en Clermont-Ferrand | Taller propio | Standarte',
      h1: 'Constructor de stands en Clermont-Ferrand',
      introText: "Construimos stands a medida para Grande Halle d’Auvergne (Cournon) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Clermont-Ferrand: fabricación propia para Grande Halle d’Auvergne (Cournon)</h2>
        <p>Clermont-Ferrand es el Sommet de l’Élevage, la mayor feria ganadera de Europa, en la Grande Halle d’Auvergne. Un stand allí convive con animales, maquinaria y barro: lo construimos con materiales lavables, estructura sólida y un espacio limpio de reunión, y lo transportamos premontado desde nuestro taller.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Clermont-Ferrand')}
        ${tipos('Clermont-Ferrand')}
        <h2>Constructor de stands en Clermont-Ferrand: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sommet-elevage-clermont-ferrand">Sommet de l'Élevage</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_clermont_ferrand">stands para ferias en Clermont-Ferrand</a>.</p>
        ${porque('Clermont-Ferrand')}`
    }
  },
  constructor_stand_niza: {
    es: {
      breadcrumb: 'Constructor de stands en Niza',
      title: 'Constructor de stands en Niza | Taller propio | Standarte',
      h1: 'Constructor de stands en Niza',
      introText: "Construimos stands a medida para Palais des Expositions y Nice Acropolis desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Niza: fabricación propia para Palais des Expositions y Nice Acropolis</h2>
        <p>Niza expone hostelería, náutica y empresa en el Palais des Expositions y en Acropolis: ferias de dos o tres días con montaje ajustado. Construimos stands premontados y ligeros, con gráfica en francés aplicada en taller, que se levantan en pocas horas y salen la misma noche del cierre.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Niza')}
        ${tipos('Niza')}
        <h2>Constructor de stands en Niza: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-agecotel-nice">AGECOTEL</a>, <a href="/ferias/stand-nice-boating-tomorrow">Nice Boating Tomorrow</a>, <a href="/ferias/stand-ibt-cote-azur">IBT Côte d'Azur</a>, <a href="/ferias/stand-entreprenariales-nice">Les Entreprenariales</a> y <a href="/ferias/stand-solucop-nice">SOLUCOP</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_niza">stands para ferias en Niza</a>.</p>
        ${porque('Niza')}`
    }
  },
  constructor_stand_montpellier: {
    es: {
      breadcrumb: 'Constructor de stands en Montpellier',
      title: 'Constructor de stands en Montpellier | Taller propio | Standarte',
      h1: 'Constructor de stands en Montpellier',
      introText: "Construimos stands a medida para Parc des Expositions de Montpellier desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Montpellier: fabricación propia para Parc des Expositions de Montpellier</h2>
        <p>Montpellier es viticultura y vino ecológico: SITEVI expone maquinaria de viña y bodega, y Millésime Bio, botellas para catar. Construimos stands de maquinaria con suelo reforzado y stands de cata con barra, frío y botellero, fabricados en taller y montados por nuestro equipo en el Parc des Expositions.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('Montpellier')}
        ${tipos('Montpellier')}
        <h2>Constructor de stands en Montpellier: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sitevi-montpellier">SITEVI</a>, <a href="/ferias/stand-millesime-bio-montpellier">Millésime Bio</a>, <a href="/ferias/stand-sett-montpellier">SETT</a>, <a href="/ferias/stand-energaia-montpellier">EnerGaïa</a>, <a href="/ferias/stand-siprho-montpellier">SIPRHO</a> y <a href="/ferias/stand-ais-montpellier">Antibody Industrial Symposium</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_montpellier">stands para ferias en Montpellier</a>.</p>
        ${porque('Montpellier')}`
    }
  },
  constructor_stand_perpignan: {
    es: {
      breadcrumb: 'Constructor de stands en Perpiñán',
      title: 'Constructor de stands en Perpiñán | Taller propio | Standarte',
      h1: 'Constructor de stands en Perpiñán',
      introText: "Construimos stands a medida para Parc des Expositions de Perpignan desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Perpiñán: fabricación propia para Parc des Expositions de Perpignan</h2>
        <p>Perpiñán es la plaza hortofrutícola del sur de Francia: MEDFEL reúne a productores y distribuidores de fruta y verdura con producto fresco en el stand. Construimos con mostrador refrigerado, superficies lavables y almacén frío, fabricados en taller y montados en el Parc des Expositions, a dos horas de la frontera.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Perpiñán')}
        ${tipos('Perpiñán')}
        <h2>Constructor de stands en Perpiñán: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-exposition-perpignan">Foire Exposition de Perpignan</a>, <a href="/ferias/stand-medfel-perpignan">MEDFEL</a>, <a href="/ferias/stand-viv-habitat-perpignan">Salon Viv'Habitat</a>, <a href="/ferias/stand-tourisme-loisirs-perpignan">Salon Tourisme & Loisirs</a>, <a href="/ferias/stand-eco-maison-perpignan">Eco-Maison</a>, <a href="/ferias/stand-retro-mecanic-perpignan">Retro Mécanic</a> y <a href="/ferias/stand-salon-mariage-perpignan">Salon du Mariage</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_perpignan">stands para ferias en Perpiñán</a>.</p>
        ${porque('Perpiñán')}`
    }
  },
  constructor_stand_batalha: {
    es: {
      breadcrumb: 'Constructor de stands en Batalha',
      title: 'Constructor de stands en Batalha | Taller propio | Standarte',
      h1: 'Constructor de stands en Batalha',
      introText: "Construimos stands a medida para Exposalão – Centro de Exposições da Batalha desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Batalha: fabricación propia para Exposalão – Centro de Exposições da Batalha</h2>
        <p>Exposalão, en Batalha, es el recinto industrial del centro de Portugal: moldes, plástico, metal, piedra y vidrio. Son ferias de máquina en marcha y producto pesado: construimos con suelo técnico, potencia y aire comprimido previstos y gráfica en portugués, fabricados en taller y montados por nuestro equipo.</p>
        <p>El stand se premonta entero en nuestro taller antes de cargar el camión: cada pieza va numerada, la gráfica aplicada y las instalaciones probadas, de modo que en el pabellón solo se monta, no se improvisa.</p>
        ${paso('Batalha')}
        ${tipos('Batalha')}
        <h2>Constructor de stands en Batalha: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/ferias/stand-expometal-batalha">Expometal</a>, <a href="/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/ferias/stand-vidrotec-batalha">Vidrotec</a> y <a href="/ferias/stand-decorhotel-batalha">Decorhotel</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_batalha">stands para ferias en Batalha</a>.</p>
        ${porque('Batalha')}`
    }
  },
  constructor_stand_santarem: {
    es: {
      breadcrumb: 'Constructor de stands en Santarém',
      title: 'Constructor de stands en Santarém | Taller propio | Standarte',
      h1: 'Constructor de stands en Santarém',
      introText: "Construimos stands a medida para CNEMA – Centro Nacional de Exposições desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Santarém: fabricación propia para CNEMA – Centro Nacional de Exposições</h2>
        <p>Santarém es el corazón agrícola de Portugal: la Feira Nacional de Agricultura y Agroglobal llenan el CNEMA de tractores, ganado y producto. Construimos stands de maquinaria con suelo reforzado y stands de degustación con frío, fabricados en taller y transportados desde España con el montaje incluido.</p>
        <p>Tramitamos con el recinto lo que exige cada pabellón —potencia, agua, alturas, certificados de reacción al fuego de maderas y textiles— y llegamos con la documentación en regla, para que el montaje no se pare por un papel.</p>
        ${paso('Santarém')}
        ${tipos('Santarém')}
        <h2>Constructor de stands en Santarém: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/ferias/stand-agroglobal-santarem">Agroglobal</a> y <a href="/ferias/stand-lusoflora-santarem">Lusoflora</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_santarem">stands para ferias en Santarém</a>.</p>
        ${porque('Santarém')}`
    }
  },
  constructor_stand_regua: {
    es: {
      breadcrumb: 'Constructor de stands en Peso da Régua',
      title: 'Constructor de stands en Peso da Régua | Taller propio | Standarte',
      h1: 'Constructor de stands en Peso da Régua',
      introText: "Construimos stands a medida para Recintos feriales de Peso da Régua (Douro) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Peso da Régua: fabricación propia para Recintos feriales de Peso da Régua (Douro)</h2>
        <p>Peso da Régua es el Douro: ferias de vino de Oporto, enoturismo y sabores de la región, muchas en espacios abiertos junto al río. Construimos stands de cata con barra, frío y botellero, preparados para exterior cubierto, y los llevamos premontados desde nuestro taller.</p>
        <p>Diseñamos pensando en la siguiente convocatoria: paramentos por módulos, gráfica intercambiable y mobiliario que se guarda y se reutiliza, porque un expositor que repite no debería pagar el stand dos veces.</p>
        ${paso('Peso da Régua')}
        ${tipos('Peso da Régua')}
        <h2>Constructor de stands en Peso da Régua: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> y <a href="/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_peso_da_regua">stands para ferias en Peso da Régua</a>.</p>
        ${porque('Peso da Régua')}`
    }
  },
  constructor_stand_portugal_sur: {
    es: {
      breadcrumb: 'Constructor de stands en el sur de Portugal',
      title: 'Constructor de stands en el sur de Portugal | Taller propio | Standarte',
      h1: 'Constructor de stands en el sur de Portugal',
      introText: "Construimos stands a medida para Parque de Exposições de Beja y recintos del Algarve desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en el sur de Portugal: fabricación propia para Parque de Exposições de Beja y recintos del Algarve</h2>
        <p>El sur de Portugal expone en Beja, con Ovibeja y Vinipax, y en el Algarve, con Fatacil y las ferias de Portimão y Lagoa: agricultura, vino y gran público. Construimos stands de exterior cubierto con suelo lavable y stands de cata, y los transportamos premontados desde España con el montaje incluido.</p>
        <p>Un único responsable lleva el proyecto desde el plano hasta el desmontaje: no hay intermediarios ni talleres subcontratados, y cualquier cambio de última hora se resuelve con nuestro propio equipo en el pabellón.</p>
        ${paso('el sur de Portugal')}
        ${tipos('el sur de Portugal')}
        <h2>Constructor de stands en el sur de Portugal: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> y <a href="/ferias/stand-vinipax-beja">Vinipax Beja</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_portugal_sur">stands para ferias en el sur de Portugal</a>.</p>
        ${porque('el sur de Portugal')}`
    }
  },
  constructor_stand_islas_de_madeira: {
    es: {
      breadcrumb: 'Constructor de stands en Madeira',
      title: 'Constructor de stands en Madeira | Taller propio | Standarte',
      h1: 'Constructor de stands en Madeira',
      introText: "Construimos stands a medida para Madeira Tecnopolo (Funchal) desde nuestro propio taller: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.",
      body: `
        <h2>Constructor de stands en Madeira: fabricación propia para Madeira Tecnopolo (Funchal)</h2>
        <p>Madeira expone en el Tecnopolo de Funchal: ferias de empleo, emprendimiento, agropecuaria y vino. Todo llega en contenedor: fabricamos y premontamos el stand entero en taller, lo numeramos pieza a pieza y lo embarcamos con repuestos, para que en la isla solo haya que montar.</p>
        <p>Trabajamos con criterio de taller: medimos el espacio contratado, calculamos cargas y refuerzos, dejamos previstas las acometidas con el recinto y fabricamos la carpintería con materiales pensados para montar rápido, aguantar la feria y volver a servir en la siguiente.</p>
        ${paso('Madeira')}
        ${tipos('Madeira')}
        <h2>Constructor de stands en Madeira: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-expomadeira">Expomadeira</a>, <a href="/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> y <a href="/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno_montaje_stands_islas_madeira">stands para ferias en Madeira</a>.</p>
        ${porque('Madeira')}`
    }
  },
};

// ── Versiones en inglés ────────────────────────────────────────────────────────────
// Se añaden como capa aparte (no anidadas en cada ficha) para que se lean de corrido y
// para que la estructura española quede intacta. Deliberadamente MÁS CORTAS: aquí se
// compite con los calendarios de ferias, que ganan por consulta rápida —la ficha de
// datos que compone server/builderFacts.js—, no por extensión, y sin una sola imagen.
const EN = {
  constructor_stand_zaragoza: {
    breadcrumb: 'Stand builder in Zaragoza',
    title: 'Stand builder in Zaragoza | Own workshop | Standarte',
    h1: 'Stand builder in Zaragoza',
    introText: 'We build custom stands for Feria de Zaragoza from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished 24 h before opening.',
    body: `
        <h2>Stand builder in Zaragoza: in-house manufacturing for Feria de Zaragoza</h2>
        <p>Feria de Zaragoza hosts some of Spain's most demanding shows for stand construction: <a href="/en/ferias/stand-fima-zaragoza">FIMA</a> and <a href="/en/ferias/stands-figan-zaragoza">FIGAN</a> exhibit farm and livestock machinery weighing several tonnes, and <a href="/en/ferias/stand-smopyc-zaragoza">SMOPYC</a> public works equipment. A stand for those shows is not decoration: it is a structure that has to carry weight, survive four days of traffic and still look immaculate.</p>
        ${pasoEn('Zaragoza')}
        ${tiposEn('Zaragoza')}
        <h2>Stand builder in Zaragoza: shows at the venue</h2>
        <p>We build for the whole venue calendar: <a href="/en/ferias/stand-fima-zaragoza">FIMA</a>, <a href="/en/ferias/stands-figan-zaragoza">FIGAN</a>, <a href="/en/ferias/stand-smopyc-zaragoza">SMOPYC</a>, <a href="/en/ferias/stand-smagua-zaragoza">SMAGUA</a> and <a href="/en/ferias/stand-expofimer-zaragoza">EXPOFIMER</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_zaragoza">trade fair stands in Zaragoza</a> page.</p>
        ${porqueEn('Zaragoza')}`
  },
  constructor_stand_madrid: {
    breadcrumb: 'Stand builder in Madrid',
    title: 'Stand builder in Madrid | Workshop next to IFEMA | Standarte',
    h1: 'Stand builder in Madrid',
    introText: 'We build custom stands for IFEMA from our workshop in San Fernando de Henares, fifteen minutes from the venue: joinery, structure, furniture and graphics made by our team, with the ability to solve any adjustment on installation day.',
    body: `
        <h2>Stand builder in Madrid: our own workshop fifteen minutes from IFEMA</h2>
        <p>Our workshop is in San Fernando de Henares, about ten kilometres from Feria de Madrid. On a site like IFEMA that distance is not a brochure line: it is the difference between solving an installation problem in an hour or waiting for a lorry from another province. IFEMA is also Spain's densest calendar — twelve halls, one show after another — which compresses build-up windows. That is why we pre-assemble in the workshop and arrive at the hall to assemble, not to improvise.</p>
        ${pasoEn('Madrid')}
        ${tiposEn('Madrid')}
        <h2>Stand builder in Madrid: shows at the venue</h2>
        <p>We build across IFEMA's calendar: <a href="/en/ferias/stand-fruit-attraction-madrid">Fruit Attraction</a>, <a href="/en/ferias/stand-sicur-madrid">SICUR</a>, <a href="/en/ferias/stand-veteco-madrid">Veteco</a>, <a href="/en/ferias/stand-madrid-tech-show">Madrid Tech Show</a> and <a href="/en/ferias/stand-meat-attraction-madrid">Meat Attraction</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_madrid">trade fair stands in Madrid</a> page.</p>
        ${porqueEn('Madrid')}`
  },
  constructor_stand_barcelona: {
    breadcrumb: 'Stand builder in Barcelona',
    title: 'Stand builder in Barcelona | Own workshop | Standarte',
    h1: 'Stand builder in Barcelona',
    introText: 'We build custom stands for Fira de Barcelona — Gran Via and Montjuïc — from our own workshop: structural calculation and documentation for double-deckers, pre-assembly before shipping, and our own fitters on site.',
    body: `
        <h2>Stand builder in Barcelona: two venues, two sets of rules</h2>
        <p>Fira de Barcelona is not one site but two, and each has its own rules: Gran Via, modern and with generous clear heights, and Montjuïc, historic and tighter. Building here means reading the right rulebook before drawing, and filing the structural calculation for a double-decker in time. Installation hours in Barcelona are expensive and short, so we pre-assemble the stand in the workshop and arrive to assemble.</p>
        ${pasoEn('Barcelona')}
        ${tiposEn('Barcelona')}
        <h2>Stand builder in Barcelona: shows at the venue</h2>
        <p>We build across the Fira calendar: <a href="/en/ferias/stand-mwc-barcelona">MWC</a>, <a href="/en/ferias/stand-ise-barcelona">ISE</a>, <a href="/en/ferias/stand-alimentaria-barcelona">Alimentaria</a>, <a href="/en/ferias/stand-hostelco-barcelona">Hostelco</a> and <a href="/en/ferias/stand-smart-city-expo-world-congress-barcelona">Smart City Expo</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_barcelona">trade fair stands in Barcelona</a> page.</p>
        ${porqueEn('Barcelona')}`
  },
  constructor_stand_oporto: {
    breadcrumb: 'Stand builder in Porto',
    title: 'Stand builder in Porto | Own workshop | Standarte',
    h1: 'Stand builder in Porto',
    introText: 'We build custom stands for Exponor (Feira Internacional do Porto) from our own workshop: joinery, structure, furniture and graphics made by our team, transported and installed by us, with a single point of contact throughout.',
    body: `
        <h2>Stand builder in Porto: building for Exponor</h2>
        <p>Exponor concentrates the industrial and export-driven north of Portugal: machinery, textiles, food and technical shows where the visitor is a professional buyer who inspects the product up close. That sets the build standard — solid finishes at hand height, faithful lighting and room to negotiate.</p>
        ${pasoEn('Porto')}
        ${tiposEn('Porto')}
        <h2>Stand builder in Porto: shows at the venue</h2>
        <p>We build across the Exponor calendar: <a href="/en/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/en/ferias/stands-qualifica-oporto">Qualifica</a>, <a href="/en/ferias/stand-emaf-oporto">EMAF</a> and <a href="/en/ferias/stand-itf-intertex-oporto">ITF Intertex</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_porto">trade fair stands in Porto</a> page.</p>
        ${porqueEn('Porto')}`
  },
  constructor_stand_lisboa: {
    breadcrumb: 'Stand builder in Lisbon',
    title: 'Stand builder in Lisbon | Own workshop | Standarte',
    h1: 'Stand builder in Lisbon',
    introText: 'We build custom stands for FIL (Feira Internacional de Lisboa) and the city’s congress venues from our own workshop: bespoke joinery, structure, furniture and graphics, installed by our own team.',
    body: `
        <h2>Stand builder in Lisbon: building for FIL and the Parque das Nações venues</h2>
        <p>Lisbon combines large trade shows at FIL with international congresses, and the two demand different things from a stand: exhibition floor space on one side, meeting and demonstration areas on the other. We build both with the same workshop and the same team.</p>
        ${pasoEn('Lisbon')}
        ${tiposEn('Lisbon')}
        <h2>Stand builder in Lisbon: shows at the venue</h2>
        <p>We build across the Lisbon calendar: <a href="/en/ferias/stand-web-summit-lisboa">Web Summit</a>, <a href="/en/ferias/stand-tektonica-lisboa">Tektónica</a> and <a href="/en/ferias/stand-nauticampo-lisboa">Nauticampo</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_lisbon">trade fair stands in Lisbon</a> page.</p>
        ${porqueEn('Lisbon')}`
  },
  constructor_stand_bilbao: {
    breadcrumb: 'Stand builder in Bilbao',
    title: 'Stand builder in Bilbao | Own workshop | Standarte',
    h1: 'Stand builder in Bilbao',
    introText: 'We build custom stands for BEC (Bilbao Exhibition Centre) from our own workshop: structures sized for industrial machinery, technical floors and finishes that hold up through a heavy-traffic show.',
    body: `
        <h2>Stand builder in Bilbao: industrial machinery sets the standard</h2>
        <p>BEC is the venue of Spanish industry: machine tools, subcontracting, additive manufacturing. Exhibiting here usually means putting a machine on the stand, so the build starts with floor loading and reinforcement and only then moves to finishes.</p>
        ${pasoEn('Bilbao')}
        ${tiposEn('Bilbao')}
        <h2>Stand builder in Bilbao: shows at the venue</h2>
        <p>We build across the BEC calendar: <a href="/en/ferias/stands-biemh-bilbao">BIEMH</a>, <a href="/en/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/en/ferias/stand-subcontratacion-bilbao">Subcontratación</a> and <a href="/en/ferias/stand-plus-industry-bilbao">+Industry</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_bilbao">trade fair stands in Bilbao</a> page.</p>
        ${porqueEn('Bilbao')}`
  },
  constructor_stand_badajoz: {
    breadcrumb: 'Stand builder in Badajoz',
    title: 'Stand builder in Badajoz | Workshop in Cáceres | Standarte',
    h1: 'Stand builder in Badajoz',
    introText: 'We build custom stands for IFEBA from our workshop in Cáceres, under an hour from the venue: bespoke joinery, furniture and graphics, installed by our own team and adjusted the same day if needed.',
    body: `
        <h2>Stand builder in Badajoz: a workshop under an hour from IFEBA</h2>
        <p>Being based in Extremadura is the practical advantage here: we manufacture in Cáceres and install at IFEBA with the same team, so a change on build-up day is solved in hours, not in days. It also makes a cross-border presence in Portugal straightforward.</p>
        ${pasoEn('Badajoz')}
        ${tiposEn('Badajoz')}
        <h2>Stand builder in Badajoz: shows at the venue</h2>
        <p>We build for the IFEBA calendar and the rest of Extremadura, including <a href="/en/ferias/stands-agroexpo">Agroexpo</a> in Don Benito. The full design-and-build service is on our <a href="/en/stand_design_assembly_badajoz">trade fair stands in Badajoz</a> page.</p>
        ${porqueEn('Badajoz')}`
  },
  constructor_stand_don_benito: {
    breadcrumb: 'Stand builder in Don Benito',
    title: 'Stand builder in Don Benito | Workshop in Cáceres | Standarte',
    h1: 'Stand builder in Don Benito',
    introText: 'We build custom stands for FEVAL (Don Benito) from our workshop in Cáceres: structures ready for farm machinery, clear demonstration areas and finishes that survive a field show.',
    body: `
        <h2>Stand builder in Don Benito: building for FEVAL and Extremadura’s farming shows</h2>
        <p>FEVAL is the reference venue of the Vegas Altas, and its main event, <a href="/en/ferias/stands-agroexpo">Agroexpo</a>, is a field show in the literal sense: large farm machinery, indoor and outdoor exhibition, and a professional audience that climbs onto the machines. The stand has to be built for that.</p>
        ${pasoEn('Don Benito')}
        ${tiposEn('Don Benito')}
        <h2>Stand builder in Don Benito: shows at the venue</h2>
        <p>We build for <a href="/en/ferias/stands-agroexpo">Agroexpo</a> and the rest of the <a href="/en/ferias/stands-agroexpo-feval-don-benito">FEVAL</a> calendar. The full assembly service for the town is on our <a href="/en/exhibition_stand_assembly_don_benito">stand assembly in Don Benito</a> page.</p>
        ${porqueEn('Don Benito')}`
  },
  constructor_stand_figan: {
    breadcrumb: 'Stand builder for FIGAN',
    title: 'Stand builder for FIGAN (Zaragoza) | Own workshop | Standarte',
    h1: 'Stand builder for FIGAN, Zaragoza',
    introText: 'We build custom stands for FIGAN, the International Animal Production Show at Feria de Zaragoza, from our own workshop: structure, joinery, technical floors, furniture and graphics made by our team.',
    body: `
        <h2>Stand builder for FIGAN: what building for animal production demands</h2>
        <p>FIGAN is not a catalogue show: silos, feeders, housing systems, ventilation, milking robots and farm machinery arrive by lorry and weigh tonnes. Building here starts with what nobody sees — floor loading, reinforcement under the equipment, water and power services agreed with the venue — and only then moves to the finish.</p>
        <p>The second constraint is hygiene and traffic: four days of technical visits, live demonstrations and visitors in farm boots. We use washable materials and protected edges where people touch, and keep the fine finishes at eye level.</p>
        <h2>Stand builder for FIGAN: how your stand is built</h2>
        <ol>
          <li><strong>Survey.</strong> Real measurements at Feria de Zaragoza, clear height, loading access and the weight of the equipment you will exhibit.</li>
          <li><strong>Engineering and 3D prototype.</strong> Structure, reinforcement, services and cutting list resolved before anything is cut.</li>
          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here, not against the clock in the hall.</li>
          <li><strong>Transport and installation.</strong> Our own team builds it and coordinates the entry of your machinery, finished 24&nbsp;h before opening.</li>
          <li><strong>Dismantling and storage.</strong> We keep the reusable parts for the next edition — FIGAN is biennial, and reusing is far cheaper than starting over.</li>
        </ol>
        <h2>Stand builder for FIGAN: and for the rest of Feria de Zaragoza</h2>
        <p>The same workshop builds for the whole venue calendar: <a href="/en/ferias/stand-fima-zaragoza">FIMA</a>, <a href="/en/ferias/stand-smopyc-zaragoza">SMOPYC</a> and <a href="/en/ferias/stand-smagua-zaragoza">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href="/en/ferias/stands-figan-zaragoza">stands for FIGAN</a>, and the city service at <a href="/en/stand_builder_zaragoza">stand builder in Zaragoza</a>.</p>
        ${porqueEnFair('FIGAN')}`
  },
  constructor_stand_agroexpo: {
    breadcrumb: 'Stand builder for Agroexpo',
    title: 'Stand builder for Agroexpo (Don Benito) | Own workshop | Standarte',
    h1: 'Stand builder for Agroexpo, Don Benito',
    introText: 'We build custom stands for Agroexpo, the agricultural and livestock show at FEVAL (Don Benito), from our workshop in Cáceres, under an hour from the venue: structures for large machinery, indoor and outdoor exhibition, and finishes that last five days of a field show.',
    body: `
        <h2>Stand builder for Agroexpo: what a field show demands</h2>
        <p>Nobody visits Agroexpo with their hands in their pockets: the farmer climbs onto the machine, opens the cab and asks about fuel consumption. That changes how you build. The floor is sized for the real weight of a tractor or harvester, the space around the equipment is kept clear, and delicate finishes are dropped wherever people lean and touch.</p>
        <p>The second constraint is that exhibiting here happens indoors and outdoors. On an outdoor plot, anchoring, levelling and resistance to January wind and rain govern; indoors, clear height and floor loading do. We build both to the same standard, so the brand looks equally solid on the plot and in the hall.</p>
        <h2>Stand builder for Agroexpo: how your stand is built</h2>
        <ol>
          <li><strong>Survey.</strong> Real measurements of the plot or indoor space at FEVAL, loading access, and the size and weight of your equipment.</li>
          <li><strong>Engineering and 3D prototype.</strong> Structure, anchoring, floor reinforcement and services resolved before anything is cut.</li>
          <li><strong>Manufacturing and pre-assembly in Cáceres.</strong> The stand is put together in the workshop before it ships.</li>
          <li><strong>Transport and installation.</strong> Our own team builds it and coordinates the entry of your machinery, finished 24&nbsp;h before opening.</li>
          <li><strong>Dismantling and storage.</strong> Agroexpo is annual: keeping the reusable parts makes the next edition far cheaper.</li>
        </ol>
        <h2>Stand builder for Agroexpo: and for the rest of FEVAL and Extremadura</h2>
        <p>The same workshop builds for the rest of the <a href="/en/ferias/stands-agroexpo-feval-don-benito">FEVAL</a> calendar and across Extremadura: <a href="/en/exhibition_stand_assembly_don_benito">Don Benito</a>, <a href="/en/stand_design_assembly_badajoz">Badajoz</a> and <a href="/en/exhibition_stand_assembly_zafra">Zafra</a>. The event page is at <a href="/en/ferias/stands-agroexpo">stands for Agroexpo</a>, and the town service at <a href="/en/stand_builder_don_benito">stand builder in Don Benito</a>.</p>
        ${porqueEnFair('Agroexpo')}`
  },
  constructor_stand_biemh: {
    breadcrumb: 'Stand builder for BIEMH',
    title: 'Stand builder for BIEMH (Bilbao) | Own workshop | Standarte',
    h1: 'Stand builder for BIEMH, Bilbao',
    introText: 'We build custom stands for BIEMH, the Spanish Machine Tool Biennial at the BEC (Bilbao Exhibition Centre), from our own workshop: structure, technical floors, joinery, furniture and graphics made by our team, with your machinery running and the stand finished before opening.',
    body: `
        <h2>Stand builder for BIEMH: what building around live machine tools demands</h2>
        <p>At BIEMH nobody shows a catalogue: they show a machining centre cutting metal. That reverses the order of the build. First comes what nobody sees — floor loading, reinforcement under the bed, three-phase power, compressed air and coolant handling — and only then the finish. A stand designed the other way round ends up with the machine in the wrong place or a supply that cannot be signed off.</p>
        <p>The BEC helps: its halls are column-free and take very high floor loads, so the real constraint is usually coordination, not the slab. We take that on in full: service requests to the venue, the works-coordination plan, fire-reaction certificates for timber and textiles, and the unloading slot that gets your machine in before the aisle fills up.</p>
        <h2>Stand builder for BIEMH: how your stand is built</h2>
        <ol>
          <li><strong>Survey.</strong> Real measurements at the BEC, clear height, unloading access, and the weight, footprint and power draw of every machine you will exhibit.</li>
          <li><strong>Engineering and 3D prototype.</strong> Structure, reinforcement, power, air and extraction resolved before anything is cut; you get a photorealistic prototype of what will actually be built.</li>
          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> The stand is put together before it ships: adjustments happen there, not against the clock in the hall.</li>
          <li><strong>Transport and installation.</strong> Our own fitters build it and coordinate the entry of your machinery with the venue, finished 24&nbsp;h before opening.</li>
          <li><strong>Dismantling and storage.</strong> We keep the reusable parts for the next edition — BIEMH is biennial, and reusing beats starting over.</li>
        </ol>
        <h2>Stand builder for BIEMH: and for the rest of the BEC</h2>
        <p>The same workshop builds across the venue calendar: <a href="/en/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/en/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/en/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/en/ferias/stands-maintenance-bilbao">Maintenance</a> and <a href="/en/ferias/stand-bedigital-bilbao">BeDigital</a>, the shows that share the <a href="/en/ferias/stand-plus-industry-bilbao">+Industry</a> platform. The event page — dates, sectors and the full design-and-build service — is at <a href="/en/ferias/stands-biemh-bilbao">stands for BIEMH</a>, and the city service at <a href="/en/stand_builder_bilbao">stand builder in Bilbao</a>.</p>
        ${porqueEnFair('BIEMH')}`
  },
  constructor_stand_malaga: {
    breadcrumb: 'Stand builder in Málaga',
    title: 'Stand builder in Málaga (FYCMA) | Own workshop | Standarte',
    h1: 'Stand builder in Málaga',
    introText: 'We build custom stands for FYCMA, the Málaga Trade Fair and Congress Centre, from our own workshop: structure, joinery, furniture and graphics made by our team, pre-assembled before shipping and installed within the short build-up windows that congress-style events impose.',
    body: `
        <h2>Stand builder in Málaga: building for a congress venue</h2>
        <p>FYCMA is not a machinery fair: much of its calendar is congresses and tech events — <a href="/en/ferias/stand-des-malaga">DES</a>, <a href="/en/ferias/stands-talent-land-malaga">Talent Land</a>, <a href="/en/ferias/stand-greencities-malaga">Greencities</a> — where build-up takes hours, not days, and exhibitors share the hall with the auditorium. Building here means arriving with the stand fully pre-assembled, graphics applied and the electrical installation tested, so the team assembles rather than improvises and hands over before the programme starts.</p>
        <p>The second constraint is distance. We manufacture in the workshop and transport the stand to Málaga with enough margin that unloading never depends on a delay on the road; the reusable parts go back to storage for the venue's next event, which in Málaga usually comes a few months later.</p>
        ${pasoEn('Málaga')}
        ${tiposEn('Málaga')}
        <h2>Stand builder in Málaga: shows at the venue</h2>
        <p>We build across the FYCMA calendar: <a href="/en/ferias/stand-des-malaga">DES</a>, <a href="/en/ferias/stand-ht-malaga">H&amp;T</a>, <a href="/en/ferias/stand-simed-malaga">Simed</a>, <a href="/en/ferias/stand-expo-agritech-malaga">Expo AgriTech</a>, <a href="/en/ferias/stands-talent-land-malaga">Talent Land España</a> and <a href="/en/ferias/stand-san-diego-comic-con-malaga">San Diego Comic-Con Málaga</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_malaga">trade fair stands in Málaga</a> page.</p>
        ${porqueEn('Málaga')}`
  },
  constructor_stand_sevilla: {
    breadcrumb: 'Stand builder in Seville',
    title: 'Stand builder in Seville (FIBES) | Own workshop | Standarte',
    h1: 'Stand builder in Seville',
    introText: 'We build custom stands for FIBES, the Seville Exhibition and Conference Centre, from our own workshop: structure, technical floors, joinery, furniture and graphics made by our team, engineered for large island stands and for halls that take vehicles, horses and visitors by the thousand.',
    body: `
        <h2>Stand builder in Seville: building in big, busy halls</h2>
        <p>FIBES has three column-free halls with service pits every eight metres: a venue made for the large island stand and the double-decker, and that is how we build here. Its calendar adds a variable few venues have: public shows — <a href="/en/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/en/ferias/stands-simof-sevilla">SIMOF</a>, the <a href="/en/ferias/stands-salon-motor-sevilla">Motor Show</a> — with tens of thousands of visitors in a few days. A stand for FIBES is sized for that traffic: protected edges, washable materials where people touch, fine finishes at eye level.</p>
        <p>At the professional shows the weight changes, not the demand: <a href="/en/ferias/stand-fireca-sevilla">Fireca</a> exhibits rescue vehicles and <a href="/en/ferias/stand-mmh-sevilla">MMH</a> mining machinery, so the floor is sized for tonnes and services are agreed with the venue before anything is drawn. We manufacture in the workshop, pre-assemble the whole stand and transport it to Seville with margin, so installation never depends on a delay on the road.</p>
        ${pasoEn('Seville')}
        ${tiposEn('Seville')}
        <h2>Stand builder in Seville: shows at the venue</h2>
        <p>We build across the FIBES calendar: <a href="/en/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/en/ferias/stands-simof-sevilla">SIMOF</a>, <a href="/en/ferias/stand-fireca-sevilla">Fireca</a>, <a href="/en/ferias/stand-mmh-sevilla">MMH – Mining and Minerals Hall</a>, <a href="/en/ferias/stand-tis-sevilla">Tourism Innovation Summit</a> and <a href="/en/ferias/stand-autentica-sevilla">Auténtica</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_seville">trade fair stands in Seville</a> page.</p>
        ${porqueEn('Seville')}`
  },
  constructor_stand_valencia: {
    breadcrumb: 'Stand builder in Valencia',
    title: 'Stand builder in Valencia | Own workshop | Standarte',
    h1: 'Stand builder in Valencia',
    introText: "We build custom stands for Feria Valencia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Valencia: in-house manufacturing for Feria Valencia</h2>
        <p>Feria Valencia is a venue of big halls and a dense calendar: Cevisama and Hábitat call for stands where the product — ceramics, furniture, lighting — is touched and compared up close, with finishes that survive a professional’s eye at arm’s length. We build in our own workshop and arrive with the stand pre-assembled, because build-up slots in Valencia are short and the hall fills in hours.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Valencia')}
        ${tiposEn('Valencia')}
        <h2>Stand builder in Valencia: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-beauty-forum-valencia">Beauty Forum Valencia</a>, <a href="/en/ferias/stand-cevisama-valencia">Cevisama</a>, <a href="/en/ferias/stand-habitat-valencia">Feria Hábitat València</a>, <a href="/en/ferias/stand-textilhogar-valencia">Textilhogar</a>, <a href="/en/ferias/stand-espacio-cocina-sici-valencia">Espacio Cocina SICI</a>, <a href="/en/ferias/stand-fimma-maderalia-valencia">Fimma + Maderalia</a>, <a href="/en/ferias/stand-iberflora-valencia">Iberflora</a> and <a href="/en/ferias/stand-gastronoma-valencia">Gastrónoma</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_valencia">trade fair stands in Valencia</a> page.</p>
        ${porqueEn('Valencia')}`
  },
  constructor_stand_valladolid: {
    breadcrumb: 'Stand builder in Valladolid',
    title: 'Stand builder in Valladolid | Own workshop | Standarte',
    h1: 'Stand builder in Valladolid',
    introText: "We build custom stands for Feria de Valladolid from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Valladolid: in-house manufacturing for Feria de Valladolid</h2>
        <p>Feria de Valladolid alternates public shows such as INTUR with technical fairs for farm machinery and poultry, and each calls for a different build: graphics and a walk-through for the strolling visitor, reinforced floor and services for the equipment shown running. We handle both from the same workshop and with the same installation crew.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Valladolid')}
        ${tiposEn('Valladolid')}
        <h2>Stand builder in Valladolid: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-intur-valladolid">INTUR</a>, <a href="/en/ferias/stand-fine-valladolid">FINE Valladolid</a>, <a href="/en/ferias/stand-technology-show-valladolid">Technology Show Valladolid</a>, <a href="/en/ferias/stand-feria-artesania-valladolid">Feria de Artesanía de Valladolid</a>, <a href="/en/ferias/stand-agraria-valladolid">AGRARIA</a>, <a href="/en/ferias/stand-agrovid-valladolid">AGROVID</a>, <a href="/en/ferias/stand-aviforum-valladolid">aviFORUM</a> and <a href="/en/ferias/stand-fimascota-valladolid">FIMASCOTA</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_valladolid">trade fair stands in Valladolid</a> page.</p>
        ${porqueEn('Valladolid')}`
  },
  constructor_stand_alicante: {
    breadcrumb: 'Stand builder in Alicante',
    title: 'Stand builder in Alicante | Own workshop | Standarte',
    h1: 'Stand builder in Alicante',
    introText: "We build custom stands for IFA – Institución Ferial Alicantina (Elche) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Alicante: in-house manufacturing for IFA – Institución Ferial Alicantina (Elche)</h2>
        <p>The province’s exhibition centre, IFA, sits in Elche, while Alicante city hosts the congresses and the food events of the capital. We build for both settings: a fair stand with storage and counter for several days, or a congress stand that goes up in a morning and comes down the same night.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Alicante')}
        ${tiposEn('Alicante')}
        <h2>Stand builder in Alicante: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-alicante-gastronomica">Alicante Gastronómica</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_alicante">trade fair stands in Alicante</a> page.</p>
        ${porqueEn('Alicante')}`
  },
  constructor_stand_elche: {
    breadcrumb: 'Stand builder in Elche',
    title: 'Stand builder in Elche | Own workshop | Standarte',
    h1: 'Stand builder in Elche',
    introText: "We build custom stands for IFA – Institución Ferial Alicantina from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Elche: in-house manufacturing for IFA – Institución Ferial Alicantina</h2>
        <p>Elche is the footwear capital and its venue, IFA, hosts fairs where the product is shown as a sample range and sold by collection. The stand needs display walls with shelving at hand height, light true to the colour of leather and a closed corner where the buyer sees the whole collection without the crowd; we make it all in our own joinery.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Elche')}
        ${tiposEn('Elche')}
        <h2>Stand builder in Elche: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-futurmoda-elche">Futurmoda</a> and <a href="/en/ferias/stand-firauto-elche">Firauto</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_elche">trade fair stands in Elche</a> page.</p>
        ${porqueEn('Elche')}`
  },
  constructor_stand_murcia: {
    breadcrumb: 'Stand builder in Murcia',
    title: 'Stand builder in Murcia | Own workshop | Standarte',
    h1: 'Stand builder in Murcia',
    introText: "We build custom stands for IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Murcia: in-house manufacturing for IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco)</h2>
        <p>The Region’s venue is in Torre Pacheco and its calendar is agricultural and industrial: machinery, irrigation, fruit and vegetables, construction. These are fairs of heavy product and real samples, so we build with technical flooring, calculated reinforcement and planned services, and bring the stand pre-assembled from our workshop.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Murcia')}
        ${tiposEn('Murcia')}
        <h2>Stand builder in Murcia: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fame-innowa-torre-pacheco">FAME Innowa</a>, <a href="/en/ferias/stand-equimur-torre-pacheco">EQUIMUR</a>, <a href="/en/ferias/stand-hortifruit-torre-pacheco">HortiFruit</a> and <a href="/en/ferias/stand-fecons-torre-pacheco">FECONS</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_murcia">trade fair stands in Murcia</a> page.</p>
        ${porqueEn('Murcia')}`
  },
  constructor_stand_salamanca: {
    breadcrumb: 'Stand builder in Salamanca',
    title: 'Stand builder in Salamanca | Own workshop | Standarte',
    h1: 'Stand builder in Salamanca',
    introText: "We build custom stands for Recinto Ferial de Salamanca from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Salamanca: in-house manufacturing for Recinto Ferial de Salamanca</h2>
        <p>Salamanca’s exhibition centre is a livestock and machinery venue: SALAMAQ fills the yards and halls with animals, tractors and implements. A stand here is built for covered outdoor conditions and the traffic of mud and cattle, with washable materials, solid structure and a clean space to sit down and negotiate.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Salamanca')}
        ${tiposEn('Salamanca')}
        <h2>Stand builder in Salamanca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-salamaq-salamanca">SALAMAQ</a>, <a href="/en/ferias/stand-salon-automovil-salamanca">Salón del Automóvil de Salamanca</a> and <a href="/en/ferias/stand-congreso-alineadores-salamanca">Congreso Internacional de Alineadores</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_salamanca">trade fair stands in Salamanca</a> page.</p>
        ${porqueEn('Salamanca')}`
  },
  constructor_stand_coruna: {
    breadcrumb: 'Stand builder in A Coruña',
    title: 'Stand builder in A Coruña | Own workshop | Standarte',
    h1: 'Stand builder in A Coruña',
    introText: "We build custom stands for ExpoCoruña y Palexco from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in A Coruña: in-house manufacturing for ExpoCoruña y Palexco</h2>
        <p>A Coruña splits its events between ExpoCoruña, a column-free hall with generous height, and Palexco, the congress centre on the harbour: the first admits double-decker stands and heavy product; the second calls for light builds that fit through the congress entrance and go up in a few hours. We make both versions in our own workshop.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('A Coruña')}
        ${tiposEn('A Coruña')}
        <h2>Stand builder in A Coruña: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-forum-gastronomico-a-coruna">Galicia Fórum Gastronómico</a>, <a href="/en/ferias/stand-mundos-digitales-a-coruna">Mundos Digitales</a> and <a href="/en/ferias/stand-biocultura-a-coruna">BioCultura A Coruña</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_a_coruna">trade fair stands in A Coruña</a> page.</p>
        ${porqueEn('A Coruña')}`
  },
  constructor_stand_santiago: {
    breadcrumb: 'Stand builder in Santiago de Compostela',
    title: 'Stand builder in Santiago de Compostela | Own workshop | Standarte',
    h1: 'Stand builder in Santiago de Compostela',
    introText: "We build custom stands for Palacio de Congresos e Exposicións de Galicia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santiago de Compostela: in-house manufacturing for Palacio de Congresos e Exposicións de Galicia</h2>
        <p>In Santiago the venue is a congress centre, and that shapes the build: compact stands, no heavy work, graphics applied in the workshop and an installation that respects the building’s floors and walls. We arrive with numbered parts and a rehearsed stand, because a congress build-up window is counted in hours.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Santiago de Compostela')}
        ${tiposEn('Santiago de Compostela')}
        <h2>Stand builder in Santiago de Compostela: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fairway-santiago-de-compostela">Fairway Santiago de Compostela</a>, <a href="/en/ferias/stand-maker-faire-galicia-santiago-de-compostela">Maker Faire Galicia Santiago de Compostela</a>, <a href="/en/ferias/stand-gedet-santiago-de-compostela">GEDET Santiago de Compostela</a>, <a href="/en/ferias/stand-semergen-santiago-de-compostela">Congreso SEMERGEN Santiago de Compostela</a>, <a href="/en/ferias/stand-sesmi-santiago-de-compostela">SESMI Santiago de Compostela</a> and <a href="/en/ferias/stand-galicia-escena-pro-santiago-de-compostela">Galicia Escena PRO</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santiago_de_compostela">trade fair stands in Santiago de Compostela</a> page.</p>
        ${porqueEn('Santiago de Compostela')}`
  },
  constructor_stand_vigo: {
    breadcrumb: 'Stand builder in Vigo',
    title: 'Stand builder in Vigo | Own workshop | Standarte',
    h1: 'Stand builder in Vigo',
    introText: "We build custom stands for IFEVI – Instituto Ferial de Vigo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Vigo: in-house manufacturing for IFEVI – Instituto Ferial de Vigo</h2>
        <p>IFEVI, in Cotogrande, hosts Conxemar and Navalia: frozen seafood and shipbuilding, two sectors that exhibit heavy equipment and industrial cold. We build stands with reinforced floors, high-power electrical services planned in advance and surfaces cleaned daily, made in our workshop and installed by our own crew.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Vigo')}
        ${tiposEn('Vigo')}
        <h2>Stand builder in Vigo: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-conxemar-vigo">Conxemar Vigo</a>, <a href="/en/ferias/stand-navalia-vigo">Navalia</a>, <a href="/en/ferias/stand-nortrans-vigo">Nortrans</a> and <a href="/en/ferias/stand-mindtech-vigo">Mindtech</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_vigo">trade fair stands in Vigo</a> page.</p>
        ${porqueEn('Vigo')}`
  },
  constructor_stand_ourense: {
    breadcrumb: 'Stand builder in Ourense',
    title: 'Stand builder in Ourense | Own workshop | Standarte',
    h1: 'Stand builder in Ourense',
    introText: "We build custom stands for Expourense from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ourense: in-house manufacturing for Expourense</h2>
        <p>Expourense hosts Xantar and Termatalia, two tasting and experience fairs: here the stand has a kitchen or service area, water and extraction, and a counter where the visitor tries the product. We build it with washable surfaces and a real back room, not a folding screen, so the service works for four straight days.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Ourense')}
        ${tiposEn('Ourense')}
        <h2>Stand builder in Ourense: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-xantar-ourense">Xantar</a> and <a href="/en/ferias/stand-termatalia-ourense">Termatalia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ourense">trade fair stands in Ourense</a> page.</p>
        ${porqueEn('Ourense')}`
  },
  constructor_stand_silleda: {
    breadcrumb: 'Stand builder in Silleda',
    title: 'Stand builder in Silleda | Own workshop | Standarte',
    h1: 'Stand builder in Silleda',
    introText: "We build custom stands for Feira Internacional de Galicia ABANCA from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Silleda: in-house manufacturing for Feira Internacional de Galicia ABANCA</h2>
        <p>The Feira Internacional de Galicia, in Silleda, is a countryside venue: Semana Verde mixes livestock, machinery and the general public, and Turexpo brings destinations and hotels. We build stands that withstand thousands of weekend visitors, with solid structure, hard-wearing graphics and a lockable store.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Silleda')}
        ${tiposEn('Silleda')}
        <h2>Stand builder in Silleda: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-semana-verde-galicia-silleda">Semana Verde de Galicia</a> and <a href="/en/ferias/stand-turexpo-galicia-silleda">Turexpo Galicia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_silleda">trade fair stands in Silleda</a> page.</p>
        ${porqueEn('Silleda')}`
  },
  constructor_stand_gijon: {
    breadcrumb: 'Stand builder in Gijón',
    title: 'Stand builder in Gijón | Own workshop | Standarte',
    h1: 'Stand builder in Gijón',
    introText: "We build custom stands for Recinto Ferial Luis Adaro from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Gijón: in-house manufacturing for Recinto Ferial Luis Adaro</h2>
        <p>The Luis Adaro exhibition centre lives for FIDMA, the great trade fair of the Cantabrian coast: two weeks of continuous public, halls and outdoor areas. A stand for that fair is built to last, with materials that show no wear after fifteen days and a layout that spreads the flow without bottlenecks.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Gijón')}
        ${tiposEn('Gijón')}
        <h2>Stand builder in Gijón: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fidma-gijon">FIDMA – Feria Internacional de Muestras de Asturias</a>, <a href="/en/ferias/stand-agropec-gijon">AGROPEC Gijón</a>, <a href="/en/ferias/stand-salon-competicion-asturias-gijon">Salón de Competición de Asturias</a>, <a href="/en/ferias/stand-asturforesta-tineo">Asturforesta</a>, <a href="/en/ferias/stand-feria-muestras-tineo">Feria de Muestras de Tineo</a> and <a href="/en/ferias/stand-agroalimentaria-vegadeo">Feria Agroalimentaria de Vegadeo</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_gijon">trade fair stands in Gijón</a> page.</p>
        ${porqueEn('Gijón')}`
  },
  constructor_stand_santander: {
    breadcrumb: 'Stand builder in Santander',
    title: 'Stand builder in Santander | Own workshop | Standarte',
    h1: 'Stand builder in Santander',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Santander from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santander: in-house manufacturing for Palacio de Exposiciones y Congresos de Santander</h2>
        <p>Santander’s exhibition centre hosts art, organic and motor fairs, and Torrelavega’s national cattle market adds agricultural events. We build for both venues from the same workshop: clean walls and careful lighting for artwork, floor and vehicle access for cars or machinery.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Santander')}
        ${tiposEn('Santander')}
        <h2>Stand builder in Santander: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-artesantander">ARTESANTANDER</a>, <a href="/en/ferias/stand-biocantabria-santander">BioCantabria</a>, <a href="/en/ferias/stand-feria-apicola-cantabria-torrelavega">Feria Nacional Apícola de Cantabria</a> and <a href="/en/ferias/stand-feria-concesionarios-torrelavega">Feria de Concesionarios de Torrelavega</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santander">trade fair stands in Santander</a> page.</p>
        ${porqueEn('Santander')}`
  },
  constructor_stand_irun: {
    breadcrumb: 'Stand builder in Irún',
    title: 'Stand builder in Irún | Own workshop | Standarte',
    h1: 'Stand builder in Irún',
    introText: "We build custom stands for Ficoba – Feria de Muestras de Gipuzkoa from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Irún: in-house manufacturing for Ficoba – Feria de Muestras de Gipuzkoa</h2>
        <p>Ficoba, on the Bidasoa border, concentrates mobility, industry and organics: MUBIL shows vehicles and chargers in operation, and Bioterra product to touch and taste. We build with high-power electrical services planned, vehicle-grade flooring and tasting furniture made in our own workshop.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Irún')}
        ${tiposEn('Irún')}
        <h2>Stand builder in Irún: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-mubil-mobility-expo-irun">MUBIL Mobility Expo</a>, <a href="/en/ferias/stand-unire-irun">UNIRE</a>, <a href="/en/ferias/stand-bioterra-irun">Bioterra</a>, <a href="/en/ferias/stand-caravantur-irun">Caravantur</a>, <a href="/en/ferias/stand-uhinak-irun">Uhinak</a> and <a href="/en/ferias/stand-go-mobility-irun">Go Mobility</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_irun">trade fair stands in Irún</a> page.</p>
        ${porqueEn('Irún')}`
  },
  constructor_stand_vitoria: {
    breadcrumb: 'Stand builder in Vitoria',
    title: 'Stand builder in Vitoria | Own workshop | Standarte',
    h1: 'Stand builder in Vitoria',
    introText: "We build custom stands for Palacio de Congresos Europa y recintos de Álava from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Vitoria: in-house manufacturing for Palacio de Congresos Europa y recintos de Álava</h2>
        <p>Vitoria-Gasteiz spreads its fairs between the Europa Congress Centre and the exhibition spaces of Álava: jobs, training, wine and retail. These are one-to-three-day events with build-up in hours, so the stand arrives pre-assembled from our workshop, graphics applied and furniture ready to place.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Vitoria')}
        ${tiposEn('Vitoria')}
        <h2>Stand builder in Vitoria: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-ardoaraba-vitoria">Ardoaraba</a>, <a href="/en/ferias/stand-avanza-fp-alava-vitoria">AVANZA – Feria de FP de Álava</a>, <a href="/en/ferias/stand-empleo-gune-vitoria">Empleo Gune</a>, <a href="/en/ferias/stand-feria-stocks-vitoria">Feria de Stocks</a> and <a href="/en/ferias/stand-lanberri-vitoria">Lanberri</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_vitoria">trade fair stands in Vitoria</a> page.</p>
        ${porqueEn('Vitoria')}`
  },
  constructor_stand_pamplona: {
    breadcrumb: 'Stand builder in Pamplona',
    title: 'Stand builder in Pamplona | Own workshop | Standarte',
    h1: 'Stand builder in Pamplona',
    introText: "We build custom stands for Baluarte y recintos feriales de Navarra from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Pamplona: in-house manufacturing for Baluarte y recintos feriales de Navarra</h2>
        <p>Pamplona holds its fairs at Baluarte, the congress centre, and at the Navarre exhibition venues: tourism, construction, jobs and wine. In a congress centre you cannot build on site: we make light, self-supporting stands, built entirely in the workshop, that anchor without damaging the building and come out in one night.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Pamplona')}
        ${tiposEn('Pamplona')}
        <h2>Stand builder in Pamplona: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-navartur-pamplona">NAVARTUR</a>, <a href="/en/ferias/stand-salon-estudiante-futuro-profesional-pamplona">Salón del Estudiante y Futuro Profesional</a>, <a href="/en/ferias/stand-edifica-pamplona">EDIFICA</a>, <a href="/en/ferias/stand-navarra-jobs-pamplona">Navarra Jobs</a>, <a href="/en/ferias/stand-feria-navarra-ecologica-pamplona">Feria Navarra Ecológica</a>, <a href="/en/ferias/stand-navarra-wine-gastronomy-pamplona">Navarra Wine & Gastronomy</a> and <a href="/en/ferias/stand-feria-turismo-reyno-navarra-pamplona">Feria Internacional de Turismo Reyno de Navarra</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_pamplona">trade fair stands in Pamplona</a> page.</p>
        ${porqueEn('Pamplona')}`
  },
  constructor_stand_logrono: {
    breadcrumb: 'Stand builder in Logroño',
    title: 'Stand builder in Logroño | Own workshop | Standarte',
    h1: 'Stand builder in Logroño',
    introText: "We build custom stands for Riojaforum y recintos feriales de La Rioja from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Logroño: in-house manufacturing for Riojaforum y recintos feriales de La Rioja</h2>
        <p>Logroño is wine: at Riojaforum and the Rioja venues bottles are tasted and distribution deals closed. We build winery stands with a tasting bar at the right height, a lit bottle display that does not warm the wine, refrigeration for the whites and a private corner for the meeting with the importer.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Logroño')}
        ${tiposEn('Logroño')}
        <h2>Stand builder in Logroño: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-rioja-wine-trade-mission-logrono">Rioja Wine Trade Mission</a>, <a href="/en/ferias/stand-planeta-rioja-logrono">Planeta Rioja</a>, <a href="/en/ferias/stand-feria-formacion-profesional-la-rioja-logrono">Feria de Formación Profesional de La Rioja</a>, <a href="/en/ferias/stand-feria-vehiculo-ocasion-logrono">Feria del Vehículo de Ocasión de Logroño</a>, <a href="/en/ferias/stand-feria-maquinaria-agricola-alfaro">Feria de Maquinaria Agrícola de Alfaro</a> and <a href="/en/ferias/stand-ferias-agroalimentarias-rioja-oriental-calahorra">Ferias Agroalimentarias de la Rioja Oriental</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_logrono">trade fair stands in Logroño</a> page.</p>
        ${porqueEn('Logroño')}`
  },
  constructor_stand_lleida: {
    breadcrumb: 'Stand builder in Lleida',
    title: 'Stand builder in Lleida | Own workshop | Standarte',
    h1: 'Stand builder in Lleida',
    introText: "We build custom stands for Fira de Lleida from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Lleida: in-house manufacturing for Fira de Lleida</h2>
        <p>Fira de Lleida is the north-east’s agricultural venue: the Fira de Sant Miquel shows machinery and Municipàlia equipment for town councils. We build stands that take a tractor inside and a service counter beside it, with technical flooring, large-format graphics and a lockable store for materials.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Lleida')}
        ${tiposEn('Lleida')}
        <h2>Stand builder in Lleida: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-municipalia-lleida">Municipàlia Lleida</a> and <a href="/en/ferias/stand-fira-sant-miquel-lleida">Fira de Sant Miquel Lleida</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_lleida">trade fair stands in Lleida</a> page.</p>
        ${porqueEn('Lleida')}`
  },
  constructor_stand_girona: {
    breadcrumb: 'Stand builder in Girona',
    title: 'Stand builder in Girona | Own workshop | Standarte',
    h1: 'Stand builder in Girona',
    introText: "We build custom stands for Fira de Girona from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Girona: in-house manufacturing for Fira de Girona</h2>
        <p>Girona is top-tier gastronomy and its Fòrum Gastronòmic calls for live-cooking stands: water and power, extraction, a worktop at professional height and a tasting counter facing the aisle. Everything is made in our own workshop and arrives tested at the venue.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Girona')}
        ${tiposEn('Girona')}
        <h2>Stand builder in Girona: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-forum-gastronomic-girona">Fòrum Gastronòmic Girona</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_girona">trade fair stands in Girona</a> page.</p>
        ${porqueEn('Girona')}`
  },
  constructor_stand_mallorca: {
    breadcrumb: 'Stand builder in Mallorca',
    title: 'Stand builder in Mallorca | Own workshop | Standarte',
    h1: 'Stand builder in Mallorca',
    introText: "We build custom stands for Palau de Congressos de Palma y Moll Vell from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Mallorca: in-house manufacturing for Palau de Congressos de Palma y Moll Vell</h2>
        <p>In Mallorca you exhibit on the quay: the Palma International Boat Show and the Superyacht Village build on the Moll Vell, with wind, salt and hand loading. We build stands for a harbour exterior — braced structure, marine materials, graphics that do not peel — and, at the Palau de Congressos, hospitality and local-product stands.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Mallorca')}
        ${tiposEn('Mallorca')}
        <h2>Stand builder in Mallorca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-palma-international-boat-show">Palma International Boat Show</a>, <a href="/en/ferias/stand-palma-superyacht-village">Palma Superyacht Village</a>, <a href="/en/ferias/stand-baleart-mallorca">Baleart</a>, <a href="/en/ferias/stand-dijous-bo-mallorca">Dijous Bo</a>, <a href="/en/ferias/stand-horeca-baleares-mallorca">HORECA Baleares Mallorca</a>, <a href="/en/ferias/stand-fira-vi-pollenca-mallorca">Fira del Vi de Pollença</a>, <a href="/en/ferias/stand-wine-days-binissalem-mallorca">Wine Days Mallorca – DO Binissalem</a> and <a href="/en/ferias/stand-fira-sipia-alcudia-mallorca">Fira de la Sípia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_mallorca">trade fair stands in Mallorca</a> page.</p>
        ${porqueEn('Mallorca')}`
  },
  constructor_stand_ibiza: {
    breadcrumb: 'Stand builder in Ibiza',
    title: 'Stand builder in Ibiza | Own workshop | Standarte',
    h1: 'Stand builder in Ibiza',
    introText: "We build custom stands for Recinto Ferial de Ibiza from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ibiza: in-house manufacturing for Recinto Ferial de Ibiza</h2>
        <p>Ibiza has boating, hospitality and retail fairs, and island logistics: everything arrives by ship and there is no margin for a forgotten part. We build the whole stand in the workshop, pre-assemble it and ship it with numbered parts and spares inside, to install without depending on a local supplier.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Ibiza')}
        ${tiposEn('Ibiza')}
        <h2>Stand builder in Ibiza: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-horeca-baleares-ibiza">HORECA Baleares Ibiza</a>, <a href="/en/ferias/stand-fira-mar-ibiza">Fira de la Mar</a> and <a href="/en/ferias/stand-feria-stocks-ibiza">Feria de Stocks de Ibiza</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ibiza">trade fair stands in Ibiza</a> page.</p>
        ${porqueEn('Ibiza')}`
  },
  constructor_stand_menorca: {
    breadcrumb: 'Stand builder in Menorca',
    title: 'Stand builder in Menorca | Own workshop | Standarte',
    h1: 'Stand builder in Menorca',
    introText: "We build custom stands for Recintos feriales de Menorca from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Menorca: in-house manufacturing for Recintos feriales de Menorca</h2>
        <p>Menorca holds local-product, agri-food and hospitality fairs, with exhibitors bringing cheese, wine and cured meats to taste. We build stands with refrigerated counter, washable surfaces and a tasting bar, shipped from the mainland pre-assembled and with their spares.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Menorca')}
        ${tiposEn('Menorca')}
        <h2>Stand builder in Menorca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-horeca-baleares-menorca">HORECA Baleares Menorca</a>, <a href="/en/ferias/stand-fira-camp-alaior-menorca">Fira del Camp</a> and <a href="/en/ferias/stand-arrels-menorca">Arrels, Fira de Producte Local i Cuina de Menorca</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_menorca">trade fair stands in Menorca</a> page.</p>
        ${porqueEn('Menorca')}`
  },
  constructor_stand_islas_canarias: {
    breadcrumb: 'Stand builder in the Canary Islands',
    title: 'Stand builder in the Canary Islands | Own workshop | Standarte',
    h1: 'Stand builder in the Canary Islands',
    introText: "We build custom stands for Recinto Ferial de Tenerife e Infecar (Gran Canaria) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in the Canary Islands: in-house manufacturing for Recinto Ferial de Tenerife e Infecar (Gran Canaria)</h2>
        <p>The Canaries have two main venues, in Santa Cruz de Tenerife and Las Palmas, and one logistics rule: the container leaves in advance and does not go back for what is missing. We build and pre-assemble the whole stand in the workshop, document it part by part and ship it with spares, so that installation on the island is just installation.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('the Canary Islands')}
        ${tiposEn('the Canary Islands')}
        <h2>Stand builder in the Canary Islands: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feaga-fuerteventura">FEAGA</a>, <a href="/en/ferias/stand-gastrocanarias-tenerife">GastroCanarias</a>, <a href="/en/ferias/stand-gran-canaria-me-gusta">Gran Canaria Me Gusta</a>, <a href="/en/ferias/stand-canagua-energia-gran-canaria">Canagua & Energía</a>, <a href="/en/ferias/stand-fimar-las-palmas">FIMAR</a>, <a href="/en/ferias/stand-salon-atlantico-logistica-transporte">Salón Atlántico de Logística y Transporte</a>, <a href="/en/ferias/stand-moda-tenerife">Feria Internacional de Moda de Tenerife</a> and <a href="/en/ferias/stand-expodeca">ExpoDeca</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_canary_islands">trade fair stands in the Canary Islands</a> page.</p>
        ${porqueEn('the Canary Islands')}`
  },
  constructor_stand_ceuta: {
    breadcrumb: 'Stand builder in Ceuta',
    title: 'Stand builder in Ceuta | Own workshop | Standarte',
    h1: 'Stand builder in Ceuta',
    introText: "We build custom stands for Palacio de Congresos de Ceuta from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ceuta: in-house manufacturing for Palacio de Congresos de Ceuta</h2>
        <p>Ceuta exhibits at its Congress Centre and in city spaces: blue economy, entrepreneurship and technology. The stand crosses the Strait by ship and goes up in a congress building, so we build it light, self-supporting and pre-assembled, with graphics applied in the workshop and installation in hours.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Ceuta')}
        ${tiposEn('Ceuta')}
        <h2>Stand builder in Ceuta: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-bet-on-ceuta">Bet On Ceuta</a>, <a href="/en/ferias/stand-ceuta-impulsa">Ceuta Impulsa</a> and <a href="/en/ferias/stand-odissea-economia-azul-ceuta">Odissea, Economía Azul de Ceuta</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ceuta">trade fair stands in Ceuta</a> page.</p>
        ${porqueEn('Ceuta')}`
  },
  constructor_stand_melilla: {
    breadcrumb: 'Stand builder in Melilla',
    title: 'Stand builder in Melilla | Own workshop | Standarte',
    h1: 'Stand builder in Melilla',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Melilla from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Melilla: in-house manufacturing for Palacio de Exposiciones y Congresos de Melilla</h2>
        <p>Melilla holds its economic-opportunity and intercultural fairs at the Exhibition and Congress Centre. Everything travels by ship: we build the complete stand in the workshop, pre-assemble it and ship it numbered, with spares and tools, to install without surprises on arrival.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Melilla')}
        ${tiposEn('Melilla')}
        <h2>Stand builder in Melilla: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-oportunidades-economicas-melilla">Feria de Oportunidades Económicas de Melilla</a>, <a href="/en/ferias/stand-feria-representacion-intercultural-melilla">Feria de Representación Intercultural de Melilla</a> and <a href="/en/ferias/stand-eventos-empresariales-proyecto-melilla">Eventos Empresariales Proyecto Melilla</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_melilla">trade fair stands in Melilla</a> page.</p>
        ${porqueEn('Melilla')}`
  },
  constructor_stand_tanger: {
    breadcrumb: 'Stand builder in Tangier',
    title: 'Stand builder in Tangier | Own workshop | Standarte',
    h1: 'Stand builder in Tangier',
    introText: "We build custom stands for Recintos feriales de Tánger y Tanger Med from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Tangier: in-house manufacturing for Recintos feriales de Tánger y Tanger Med</h2>
        <p>Tangier is textiles, fashion and industry: Maroc in Mode and the Tanger Med meetings gather manufacturers showing sample ranges and production capacity. We build stands with collection panels, fitting room and meeting room, made in Spain, transported with customs paperwork prepared and installed by our own crew.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Tangier')}
        ${tiposEn('Tangier')}
        <h2>Stand builder in Tangier: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-maroc-in-mode-mim-tanger">Maroc in Mode (MIM) Tánger</a>, <a href="/en/ferias/stand-tanger-nexus">Tanger Nexus</a>, <a href="/en/ferias/stand-tanger-fashion-week">Tanger Fashion Week</a>, <a href="/en/ferias/stand-amith-nord-tanger">Encuentros Industriales AMITH Nord</a> and <a href="/en/ferias/stand-eventos-industriales-tanger-med">Eventos Industriales Tanger Med</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_tangier">trade fair stands in Tangier</a> page.</p>
        ${porqueEn('Tangier')}`
  },
  constructor_stand_casablanca: {
    breadcrumb: 'Stand builder in Casablanca',
    title: 'Stand builder in Casablanca | Own workshop | Standarte',
    h1: 'Stand builder in Casablanca',
    introText: "We build custom stands for Parc d’Exposition de l’OFEC (Casablanca) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Casablanca: in-house manufacturing for Parc d’Exposition de l’OFEC (Casablanca)</h2>
        <p>Casablanca is Morocco’s trade fair venue: logistics, food, energy, plastics and packaging all pass through the OFEC grounds. Exhibiting there from Spain requires transport under ATA carnet or temporary export and a stand that goes up without depending on local workshops: we build it whole, pre-assemble it and travel with it.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Casablanca')}
        ${tiposEn('Casablanca')}
        <h2>Stand builder in Casablanca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-logismed-casablanca">Logismed</a>, <a href="/en/ferias/stand-morocco-food-expo-casablanca">Morocco Food Expo</a>, <a href="/en/ferias/stand-siema-casablanca">Morocco SIEMA Expo</a>, <a href="/en/ferias/stand-siab-casablanca">SIAB Expo Maroc</a>, <a href="/en/ferias/stand-elec-expo-casablanca">Elec Expo</a>, <a href="/en/ferias/stand-ener-event-casablanca">Ener Event</a>, <a href="/en/ferias/stand-plast-expo-casablanca">Plast Expo</a> and <a href="/en/ferias/stand-pack-expo-casablanca">Pack Expo Morocco</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_casablanca">trade fair stands in Casablanca</a> page.</p>
        ${porqueEn('Casablanca')}`
  },
  constructor_stand_rabat: {
    breadcrumb: 'Stand builder in Rabat',
    title: 'Stand builder in Rabat | Own workshop | Standarte',
    h1: 'Stand builder in Rabat',
    introText: "We build custom stands for Recintos de ferias y congresos de Rabat from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Rabat: in-house manufacturing for Recintos de ferias y congresos de Rabat</h2>
        <p>Rabat exhibits publishing, culture, training and music: SIEL fills its venue with publishers and booksellers and the Forum de l’Étudiant gathers universities. These are book and information stands: shelving at hand height, sales counter, good reading light and a store for stock, built in the workshop and transported with their paperwork.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Rabat')}
        ${tiposEn('Rabat')}
        <h2>Stand builder in Rabat: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-siel-rabat">SIEL — Salon International de l'Édition et du Livre</a>, <a href="/en/ferias/stand-visa-for-music-rabat">Visa For Music</a>, <a href="/en/ferias/stand-forum-etudiant-rabat">Forum de l'Étudiant, de la Formation et de l'Emploi</a> and <a href="/en/ferias/stand-cimqusef-rabat">CIMQUSEF</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_rabat">trade fair stands in Rabat</a> page.</p>
        ${porqueEn('Rabat')}`
  },
  constructor_stand_andorra: {
    breadcrumb: 'Stand builder in Andorra',
    title: 'Stand builder in Andorra | Own workshop | Standarte',
    h1: 'Stand builder in Andorra',
    introText: "We build custom stands for Centre de Congressos d’Andorra la Vella y recintos del Principado from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Andorra: in-house manufacturing for Centre de Congressos d’Andorra la Vella y recintos del Principado</h2>
        <p>Andorra holds multi-sector, food and retail fairs in Andorra la Vella and the parishes. Transport goes in by mountain road and through customs: we build the stand pre-assembled and compact, with parts sized for the truck that climbs the pass, and install it with our own crew.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Andorra')}
        ${tiposEn('Andorra')}
        <h2>Stand builder in Andorra: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fira-andorra-la-vella">Fira d'Andorra la Vella</a>, <a href="/en/ferias/stand-enfirat-encamp">Enfira't</a>, <a href="/en/ferias/stand-andorra-taste">Andorra Taste</a>, <a href="/en/ferias/stand-fira-del-vermut-andorra">Fira del Vermut d'Andorra</a>, <a href="/en/ferias/stand-fira-del-bestiar-ordino">Fira del Bestiar d'Ordino</a>, <a href="/en/ferias/stand-mercat-de-la-vall-andorra">Mercat de la Vall</a> and <a href="/en/ferias/stand-fira-outlet-soldeu">Fira Outlet de Soldeu</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_andorra">trade fair stands in Andorra</a> page.</p>
        ${porqueEn('Andorra')}`
  },
  constructor_stand_teruel: {
    breadcrumb: 'Stand builder in Teruel',
    title: 'Stand builder in Teruel | Own workshop | Standarte',
    h1: 'Stand builder in Teruel',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Teruel: in-house manufacturing for Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia</h2>
        <p>Teruel is ham, agri-food and farm machinery, with fairs in the capital, Calamocha and Alcañiz. We build product-tasting stands — counter with cutting board, refrigeration and washable surfaces — and machinery stands with reinforced floor, made in the workshop and installed in a day.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Teruel')}
        ${tiposEn('Teruel')}
        <h2>Stand builder in Teruel: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-jamon-teruel">Feria del Jamón de Teruel y Alimentos de Calidad</a>, <a href="/en/ferias/stand-expocalamocha">ExpoCalamocha</a> and <a href="/en/ferias/stand-agroalcaniz">AgroAlcañiz</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_teruel">trade fair stands in Teruel</a> page.</p>
        ${porqueEn('Teruel')}`
  },
  constructor_stand_aranda: {
    breadcrumb: 'Stand builder in Aranda de Duero',
    title: 'Stand builder in Aranda de Duero | Own workshop | Standarte',
    h1: 'Stand builder in Aranda de Duero',
    introText: "We build custom stands for Recinto Ferial de Aranda de Duero from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Aranda de Duero: in-house manufacturing for Recinto Ferial de Aranda de Duero</h2>
        <p>Aranda de Duero is the Ribera capital and its fairs revolve around wine: tastings, awards and winery meetings. We build winery stands with tasting bar, cold-lit bottle display and a private corner for the distributor, made in the workshop and reusable at the next wine events.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Aranda de Duero')}
        ${tiposEn('Aranda de Duero')}
        <h2>Stand builder in Aranda de Duero: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-espacio-ribera-aranda">Espacio Ribera</a>, <a href="/en/ferias/stand-premios-envero-enverofest-aranda">Premios Envero / EnveroFest</a> and <a href="/en/ferias/stand-congreso-la-cierna-aranda">Congreso La Cierna</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_aranda_de_duero">trade fair stands in Aranda de Duero</a> page.</p>
        ${porqueEn('Aranda de Duero')}`
  },
  constructor_stand_ciudad_real: {
    breadcrumb: 'Stand builder in Ciudad Real',
    title: 'Stand builder in Ciudad Real | Own workshop | Standarte',
    h1: 'Stand builder in Ciudad Real',
    introText: "We build custom stands for Pabellón Ferial de Ciudad Real (IFEDI) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ciudad Real: in-house manufacturing for Pabellón Ferial de Ciudad Real (IFEDI)</h2>
        <p>Ciudad Real is wine and countryside: Fenavin gathers wineries and international buyers, and FERCAM and FERDUQUE bring machinery and livestock. We build tasting stands with refrigeration and bottle display, and machinery stands with reinforced floor, both from our workshop and with our own installation at the exhibition hall.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Ciudad Real')}
        ${tiposEn('Ciudad Real')}
        <h2>Stand builder in Ciudad Real: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fenavin-match-ciudad-real">Fenavin Match Ciudad Real</a>, <a href="/en/ferias/stand-ferduque-ciudad-real">FERDUQUE</a>, <a href="/en/ferias/stand-fercam-manzanares-ciudad-real">FERCAM</a> and <a href="/en/ferias/stand-fercatur-ciudad-real">Fercatur Ciudad Real</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ciudad_real">trade fair stands in Ciudad Real</a> page.</p>
        ${porqueEn('Ciudad Real')}`
  },
  constructor_stand_zafra: {
    breadcrumb: 'Stand builder in Zafra',
    title: 'Stand builder in Zafra | Own workshop | Standarte',
    h1: 'Stand builder in Zafra',
    introText: "We build custom stands for Recinto Ferial de Zafra from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Zafra: in-house manufacturing for Recinto Ferial de Zafra</h2>
        <p>Zafra lives its International Livestock Fair on a countryside venue, with animals, machinery and public for a week. We build stands for that toughness — washable floor, solid structure, lockable store — from our Cáceres workshop, under an hour away, able to solve any adjustment the same day.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Zafra')}
        ${tiposEn('Zafra')}
        <h2>Stand builder in Zafra: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-internacional-ganadera-zafra">Feria Internacional Ganadera de Zafra</a>. The full design-and-build service for the city is on our <a href="/en/exhibition_stand_assembly_zafra">trade fair stands in Zafra</a> page.</p>
        ${porqueEn('Zafra')}`
  },
  constructor_stand_trujillo: {
    breadcrumb: 'Stand builder in Trujillo',
    title: 'Stand builder in Trujillo | Own workshop | Standarte',
    h1: 'Stand builder in Trujillo',
    introText: "We build custom stands for Recinto Ferial de Trujillo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Trujillo: in-house manufacturing for Recinto Ferial de Trujillo</h2>
        <p>Trujillo holds the Cheese Fair and the Agricultural and Livestock Fair: product to taste and animals to see. We build cutting and tasting counters with refrigeration and washable surfaces, and covered outdoor stands for the livestock fair, from our Cáceres workshop, under an hour from the venue.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Trujillo')}
        ${tiposEn('Trujillo')}
        <h2>Stand builder in Trujillo: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-internacional-ganadera-trujillo">Feria Agroganadera de Trujillo</a> and <a href="/en/ferias/stand-feria-nacional-queso-trujillo">Feria Nacional del Queso de Trujillo</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_trujillo">trade fair stands in Trujillo</a> page.</p>
        ${porqueEn('Trujillo')}`
  },
  constructor_stand_almeria: {
    breadcrumb: 'Stand builder in Almeria',
    title: 'Stand builder in Almeria | Own workshop | Standarte',
    h1: 'Stand builder in Almeria',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Aguadulce from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Almeria: in-house manufacturing for Palacio de Exposiciones y Congresos de Aguadulce</h2>
        <p>Almería is intensive agriculture: Infoagro and Expolevante show seeds, irrigation, plastics and greenhouse machinery to a highly technical visitor. We build stands where the system is shown installed and working, with water, power and reinforced floor, made in our own workshop.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Almeria')}
        ${tiposEn('Almeria')}
        <h2>Stand builder in Almeria: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-infoagro-exhibition-aguadulce">Infoagro Exhibition</a>, <a href="/en/ferias/stand-expolevante-el-ejido">Expolevante</a> and <a href="/en/ferias/stand-sun-blue-congress-almeria">Sun&Blue Congress</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_almeria">trade fair stands in Almeria</a> page.</p>
        ${porqueEn('Almeria')}`
  },
  constructor_stand_jaen: {
    breadcrumb: 'Stand builder in Jaen',
    title: 'Stand builder in Jaen | Own workshop | Standarte',
    h1: 'Stand builder in Jaen',
    introText: "We build custom stands for IFEJA – Palacio de Ferias y Congresos de Jaén from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Jaen: in-house manufacturing for IFEJA – Palacio de Ferias y Congresos de Jaén</h2>
        <p>Jaén is olive oil: Expoliva gathers mills, milling and bottling machinery and buyers from half the world at IFEJA. We build tasting stands with counter, display case and light that does not distort the colour of the oil, and machinery stands with reinforced floor, both from our workshop and installed by our own crew.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Jaen')}
        ${tiposEn('Jaen')}
        <h2>Stand builder in Jaen: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-expoliva-jaen">Expoliva</a>, <a href="/en/ferias/stand-ibercaza-jaen">Ibercaza</a> and <a href="/en/ferias/stand-feria-de-los-pueblos-jaen">Feria de los Pueblos</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_jaen">trade fair stands in Jaen</a> page.</p>
        ${porqueEn('Jaen')}`
  },
  constructor_stand_huelva: {
    breadcrumb: 'Stand builder in Huelva',
    title: 'Stand builder in Huelva | Own workshop | Standarte',
    h1: 'Stand builder in Huelva',
    introText: "We build custom stands for Palacio de Congresos Casa Colón y recintos de la provincia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Huelva: in-house manufacturing for Palacio de Congresos Casa Colón y recintos de la provincia</h2>
        <p>Huelva combines berries, Iberian ham and fishing across three venues: Casa Colón in the capital, Aracena in the hills and Punta Umbría on the coast. We build for all three from the same workshop: a light congress stand, a cutting counter with refrigeration, or a covered outdoor stand for the prawn fair.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Huelva')}
        ${tiposEn('Huelva')}
        <h2>Stand builder in Huelva: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-congreso-internacional-frutos-rojos-huelva">Congreso Internacional de Frutos Rojos</a>, <a href="/en/ferias/stand-feria-jamon-cerdo-iberico-aracena">Feria del Jamón y Cerdo Ibérico de Aracena</a> and <a href="/en/ferias/stand-feria-gamba-chirla-boqueron-punta-umbria">Feria Nacional de la Gamba, la Chirla y el Boquerón</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_huelva">trade fair stands in Huelva</a> page.</p>
        ${porqueEn('Huelva')}`
  },
  constructor_stand_cordoba: {
    breadcrumb: 'Stand builder in Cordoba',
    title: 'Stand builder in Cordoba | Own workshop | Standarte',
    h1: 'Stand builder in Cordoba',
    introText: "We build custom stands for Recintos feriales de Córdoba y Los Pedroches from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cordoba: in-house manufacturing for Recintos feriales de Córdoba y Los Pedroches</h2>
        <p>Córdoba is hunting and Iberian pork: Intercaza in the capital and the livestock and ham fairs of Los Pedroches. We build tasting stands with cutting counter and refrigeration, and covered outdoor stands with washable floor for the livestock fairs, made in the workshop and installed by our crew.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Cordoba')}
        ${tiposEn('Cordoba')}
        <h2>Stand builder in Cordoba: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-intercaza-cordoba">Intercaza</a>, <a href="/en/ferias/stand-feria-agroganadera-pedroches-pozoblanco">Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches</a> and <a href="/en/ferias/stand-feria-jamon-bellota-dop-pedroches-villanueva-cordoba">Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cordoba">trade fair stands in Cordoba</a> page.</p>
        ${porqueEn('Cordoba')}`
  },
  constructor_stand_granada: {
    breadcrumb: 'Stand builder in Granada',
    title: 'Stand builder in Granada | Own workshop | Standarte',
    h1: 'Stand builder in Granada',
    introText: "We build custom stands for Fermasa (Armilla) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Granada: in-house manufacturing for Fermasa (Armilla)</h2>
        <p>Granada exhibits at Fermasa, the Armilla venue: general trade fair, fashion, science and the equestrian world. It is a general-public calendar, so we build stands that survive full-capacity weekends, with hard-wearing graphics, service counter and lockable store.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Granada')}
        ${tiposEn('Granada')}
        <h2>Stand builder in Granada: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-general-muestras-armilla">Feria General de Muestras de Armilla</a>, <a href="/en/ferias/stand-feria-de-la-ciencia-granada">Feria de la Ciencia</a>, <a href="/en/ferias/stand-concab-granada">CONCAB Granada</a>, <a href="/en/ferias/stand-belmoda-granada">Belmoda Granada</a>, <a href="/en/ferias/stand-sabores-nuestra-tierra-granada">Sabores de Nuestra Tierra</a> and <a href="/en/ferias/stand-feria-pueblos-granada">Feria de los Pueblos de Granada</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_granada">trade fair stands in Granada</a> page.</p>
        ${porqueEn('Granada')}`
  },
  constructor_stand_cadiz: {
    breadcrumb: 'Stand builder in Cadiz',
    title: 'Stand builder in Cadiz | Own workshop | Standarte',
    h1: 'Stand builder in Cadiz',
    introText: "We build custom stands for Palacio de Congresos de Cádiz e IFECA (Jerez) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cadiz: in-house manufacturing for Palacio de Congresos de Cádiz e IFECA (Jerez)</h2>
        <p>Cádiz splits its events between the capital’s Congress Centre, with the blue economy and shipbuilding, and IFECA in Jerez, with the Horse Fair and Fegasur. We build a light congress stand for the first and a covered outdoor livestock stand for the second, both from our workshop.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Cadiz')}
        ${tiposEn('Cadiz')}
        <h2>Stand builder in Cadiz: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-blue-zone-forum-navalia-meeting-cadiz">Blue Zone Forum Navalia Meeting</a>, <a href="/en/ferias/stand-feria-del-caballo-jerez">Feria del Caballo de Jerez</a> and <a href="/en/ferias/stand-fegasur-jerez">Fegasur</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cadiz">trade fair stands in Cadiz</a> page.</p>
        ${porqueEn('Cadiz')}`
  },
  constructor_stand_marsella: {
    breadcrumb: 'Stand builder in Marseille',
    title: 'Stand builder in Marseille | Own workshop | Standarte',
    h1: 'Stand builder in Marseille',
    introText: "We build custom stands for Parc Chanot – Parc des Expositions et des Congrès de Marseille from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Marseille: in-house manufacturing for Parc Chanot – Parc des Expositions et des Congrès de Marseille</h2>
        <p>Parc Chanot hosts everything from the Foire Internationale to Euromaritime and Sirha Méditerranée: general public, maritime industry and food service. Exhibiting there from Spain means a long haul and installation under French rules: we build the stand pre-assembled, with fire-reaction certificates, and install it with our own crew.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Marseille')}
        ${tiposEn('Marseille')}
        <h2>Stand builder in Marseille: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-marseille">Foire Internationale de Marseille</a>, <a href="/en/ferias/stand-euromaritime-marseille">Euromaritime</a>, <a href="/en/ferias/stand-sirha-mediterranee-marseille">Sirha Méditerranée</a>, <a href="/en/ferias/stand-beauty-profs-marseille">Beauty Prof's</a>, <a href="/en/ferias/stand-savim-marseille">SAVIM</a>, <a href="/en/ferias/stand-salon-piscine-jardin-marseille">Salon Piscine & Jardin</a>, <a href="/en/ferias/stand-solutions-cse-marseille">Solutions CSE Marseille</a> and <a href="/en/ferias/stand-japan-expo-sud-marseille">Japan Expo Sud</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_marseille">trade fair stands in Marseille</a> page.</p>
        ${porqueEn('Marseille')}`
  },
  constructor_stand_cannes: {
    breadcrumb: 'Stand builder in Cannes',
    title: 'Stand builder in Cannes | Own workshop | Standarte',
    h1: 'Stand builder in Cannes',
    introText: "We build custom stands for Palais des Festivals et des Congrès from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cannes: in-house manufacturing for Palais des Festivals et des Congrès</h2>
        <p>Cannes is the Palais des Festivals: MIPIM, MAPIC and TFWA are markets where the stand is a negotiating office with brand image. We build closed offices with acoustics, reception and high-finish graphics, made in the workshop and installed in the few hours the Palais allows.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Cannes')}
        ${tiposEn('Cannes')}
        <h2>Stand builder in Cannes: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-cannes-yachting-festival">Cannes Yachting Festival</a>, <a href="/en/ferias/stand-interior-exterior-design-meetings-cannes">Interior & Exterior Design Meetings</a>, <a href="/en/ferias/stand-mapic-cannes">MAPIC</a>, <a href="/en/ferias/stand-mipim-cannes">MIPIM</a> and <a href="/en/ferias/stand-tfwa-cannes">TFWA World Exhibition</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cannes">trade fair stands in Cannes</a> page.</p>
        ${porqueEn('Cannes')}`
  },
  constructor_stand_avignon: {
    breadcrumb: 'Stand builder in Avignon',
    title: 'Stand builder in Avignon | Own workshop | Standarte',
    h1: 'Stand builder in Avignon',
    introText: "We build custom stands for Parc des Expositions d’Avignon (Agroparc) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Avignon: in-house manufacturing for Parc des Expositions d’Avignon (Agroparc)</h2>
        <p>Avignon is Mediterranean agriculture: MED’Agri gathers irrigation, seeds, machinery and fruit growing at the Parc des Expositions. We build stands where the equipment is shown installed, with water and power, reinforced floor and graphics in French, made in the workshop and delivered by road with installation included.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Avignon')}
        ${tiposEn('Avignon')}
        <h2>Stand builder in Avignon: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-medagri-avignon">MED'Agri</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_avignon">trade fair stands in Avignon</a> page.</p>
        ${porqueEn('Avignon')}`
  },
  constructor_stand_toulouse: {
    breadcrumb: 'Stand builder in Toulouse',
    title: 'Stand builder in Toulouse | Own workshop | Standarte',
    h1: 'Stand builder in Toulouse',
    introText: "We build custom stands for MEETT – Parc des Expositions de Toulouse from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Toulouse: in-house manufacturing for MEETT – Parc des Expositions de Toulouse</h2>
        <p>Toulouse is aerospace: Aeromart and the Aerospace Test & Development Show gather parts and testing suppliers at MEETT with meetings booked in advance. We build business stands — meeting tables, cabinets for precision parts, screen — made in the workshop and installed at the new Aussonne venue by our crew.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Toulouse')}
        ${tiposEn('Toulouse')}
        <h2>Stand builder in Toulouse: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-toulouse">Foire Internationale de Toulouse</a>, <a href="/en/ferias/stand-cfia-toulouse">CFIA Toulouse</a>, <a href="/en/ferias/stand-sepem-industries-toulouse">SEPEM Industries Toulouse</a>, <a href="/en/ferias/stand-aerospace-test-development-show-toulouse">Aerospace Test & Development Show</a>, <a href="/en/ferias/stand-aeromart-toulouse">Aeromart Toulouse</a>, <a href="/en/ferias/stand-siane-toulouse">Salon SIANE</a> and <a href="/en/ferias/stand-smahrt-toulouse">SMAHRT</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_toulouse">trade fair stands in Toulouse</a> page.</p>
        ${porqueEn('Toulouse')}`
  },
  constructor_stand_burdeos: {
    breadcrumb: 'Stand builder in Bordeaux',
    title: 'Stand builder in Bordeaux | Own workshop | Standarte',
    h1: 'Stand builder in Bordeaux',
    introText: "We build custom stands for Parc des Expositions de Bordeaux-Lac from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Bordeaux: in-house manufacturing for Parc des Expositions de Bordeaux-Lac</h2>
        <p>Bordeaux is wine and viticulture: Vinitech-Sifel fills Bordeaux-Lac with winery and vineyard machinery, and the vignerons’ shows with bottles to taste. We build machinery stands with reinforced floor and tasting stands with bar and refrigeration, made in the workshop and delivered by road with our own installation.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Bordeaux')}
        ${tiposEn('Bordeaux')}
        <h2>Stand builder in Bordeaux: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-bordeaux">Foire Internationale de Bordeaux</a>, <a href="/en/ferias/stand-vinitech-sifel-bordeaux">Vinitech-Sifel</a>, <a href="/en/ferias/stand-equitaine-bordeaux">Equitaine</a>, <a href="/en/ferias/stand-salon-agriculture-nouvelle-aquitaine-bordeaux">Salon de l'Agriculture Nouvelle-Aquitaine</a>, <a href="/en/ferias/stand-art3f-bordeaux">Art3f Bordeaux</a>, <a href="/en/ferias/stand-grand-salon-habitat-bordeaux">Grand Salon Habitat</a>, <a href="/en/ferias/stand-salon-vins-vignerons-independants-bordeaux">Salon des Vins des Vignerons Indépendants</a> and <a href="/en/ferias/stand-cycleau-nouvelle-aquitaine-bordeaux">Cycl'Eau Nouvelle-Aquitaine</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_bordeaux">trade fair stands in Bordeaux</a> page.</p>
        ${porqueEn('Bordeaux')}`
  },
  constructor_stand_lyon: {
    breadcrumb: 'Stand builder in Lyon',
    title: 'Stand builder in Lyon | Own workshop | Standarte',
    h1: 'Stand builder in Lyon',
    introText: "We build custom stands for Eurexpo Lyon from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Lyon: in-house manufacturing for Eurexpo Lyon</h2>
        <p>Eurexpo is a large-scale industrial venue: Global Industrie, Pollutec and SIRHA exhibit machines running and kitchens cooking live. We build stands with power and compressed air planned, technical flooring and kitchen extraction, made in the workshop and installed by our crew under the venue rules.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Lyon')}
        ${tiposEn('Lyon')}
        <h2>Stand builder in Lyon: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sirha-lyon">SIRHA</a>, <a href="/en/ferias/stand-global-industrie-lyon">Global Industrie</a>, <a href="/en/ferias/stand-pollutec-lyon">Pollutec Lyon</a>, <a href="/en/ferias/stand-piscine-global-lyon">Piscine Global Europe</a>, <a href="/en/ferias/stand-preventica-lyon">Préventica Lyon</a>, <a href="/en/ferias/stand-prod-pack-lyon">Prod&Pack</a> and <a href="/en/ferias/stand-bepositive-lyon">BEPOSITIVE</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_lyon">trade fair stands in Lyon</a> page.</p>
        ${porqueEn('Lyon')}`
  },
  constructor_stand_grenoble: {
    breadcrumb: 'Stand builder in Grenoble',
    title: 'Stand builder in Grenoble | Own workshop | Standarte',
    h1: 'Stand builder in Grenoble',
    introText: "We build custom stands for Alpexpo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Grenoble: in-house manufacturing for Alpexpo</h2>
        <p>Grenoble is mountains and industry: Mountain Planet gathers ski lifts, snowmaking and resort equipment at Alpexpo. These are big, heavy products: we build stands with reinforced floor, structure for hanging elements and large-format graphics, made in the workshop and delivered by road.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Grenoble')}
        ${tiposEn('Grenoble')}
        <h2>Stand builder in Grenoble: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-mountain-planet-grenoble">Mountain Planet</a> and <a href="/en/ferias/stand-sepem-industries-sud-est-grenoble">SEPEM Industries Sud-Est</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_grenoble">trade fair stands in Grenoble</a> page.</p>
        ${porqueEn('Grenoble')}`
  },
  constructor_stand_clermont_ferrand: {
    breadcrumb: 'Stand builder in Clermont-Ferrand',
    title: 'Stand builder in Clermont-Ferrand | Own workshop | Standarte',
    h1: 'Stand builder in Clermont-Ferrand',
    introText: "We build custom stands for Grande Halle d’Auvergne (Cournon) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Clermont-Ferrand: in-house manufacturing for Grande Halle d’Auvergne (Cournon)</h2>
        <p>Clermont-Ferrand is the Sommet de l’Élevage, Europe’s largest livestock show, at the Grande Halle d’Auvergne. A stand there lives alongside animals, machinery and mud: we build it with washable materials, solid structure and a clean meeting space, and transport it pre-assembled from our workshop.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Clermont-Ferrand')}
        ${tiposEn('Clermont-Ferrand')}
        <h2>Stand builder in Clermont-Ferrand: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sommet-elevage-clermont-ferrand">Sommet de l'Élevage</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_clermont_ferrand">trade fair stands in Clermont-Ferrand</a> page.</p>
        ${porqueEn('Clermont-Ferrand')}`
  },
  constructor_stand_niza: {
    breadcrumb: 'Stand builder in Nice',
    title: 'Stand builder in Nice | Own workshop | Standarte',
    h1: 'Stand builder in Nice',
    introText: "We build custom stands for Palais des Expositions y Nice Acropolis from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Nice: in-house manufacturing for Palais des Expositions y Nice Acropolis</h2>
        <p>Nice exhibits hospitality, boating and business at the Palais des Expositions and Acropolis: two-to-three-day fairs with tight build-up. We build pre-assembled, light stands with French graphics applied in the workshop, up in a few hours and out the same night as closing.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Nice')}
        ${tiposEn('Nice')}
        <h2>Stand builder in Nice: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-agecotel-nice">AGECOTEL</a>, <a href="/en/ferias/stand-nice-boating-tomorrow">Nice Boating Tomorrow</a>, <a href="/en/ferias/stand-ibt-cote-azur">IBT Côte d'Azur</a>, <a href="/en/ferias/stand-entreprenariales-nice">Les Entreprenariales</a> and <a href="/en/ferias/stand-solucop-nice">SOLUCOP</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_nice">trade fair stands in Nice</a> page.</p>
        ${porqueEn('Nice')}`
  },
  constructor_stand_montpellier: {
    breadcrumb: 'Stand builder in Montpellier',
    title: 'Stand builder in Montpellier | Own workshop | Standarte',
    h1: 'Stand builder in Montpellier',
    introText: "We build custom stands for Parc des Expositions de Montpellier from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Montpellier: in-house manufacturing for Parc des Expositions de Montpellier</h2>
        <p>Montpellier is viticulture and organic wine: SITEVI exhibits vineyard and winery machinery, and Millésime Bio bottles to taste. We build machinery stands with reinforced floor and tasting stands with bar, refrigeration and bottle display, made in the workshop and installed by our crew at the Parc des Expositions.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('Montpellier')}
        ${tiposEn('Montpellier')}
        <h2>Stand builder in Montpellier: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sitevi-montpellier">SITEVI</a>, <a href="/en/ferias/stand-millesime-bio-montpellier">Millésime Bio</a>, <a href="/en/ferias/stand-sett-montpellier">SETT</a>, <a href="/en/ferias/stand-energaia-montpellier">EnerGaïa</a>, <a href="/en/ferias/stand-siprho-montpellier">SIPRHO</a> and <a href="/en/ferias/stand-ais-montpellier">Antibody Industrial Symposium</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_montpellier">trade fair stands in Montpellier</a> page.</p>
        ${porqueEn('Montpellier')}`
  },
  constructor_stand_perpignan: {
    breadcrumb: 'Stand builder in Perpignan',
    title: 'Stand builder in Perpignan | Own workshop | Standarte',
    h1: 'Stand builder in Perpignan',
    introText: "We build custom stands for Parc des Expositions de Perpignan from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Perpignan: in-house manufacturing for Parc des Expositions de Perpignan</h2>
        <p>Perpignan is southern France’s fruit and vegetable hub: MEDFEL gathers producers and distributors with fresh product on the stand. We build with refrigerated counter, washable surfaces and cold storage, made in the workshop and installed at the Parc des Expositions, two hours from the border.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Perpignan')}
        ${tiposEn('Perpignan')}
        <h2>Stand builder in Perpignan: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-exposition-perpignan">Foire Exposition de Perpignan</a>, <a href="/en/ferias/stand-medfel-perpignan">MEDFEL</a>, <a href="/en/ferias/stand-viv-habitat-perpignan">Salon Viv'Habitat</a>, <a href="/en/ferias/stand-tourisme-loisirs-perpignan">Salon Tourisme & Loisirs</a>, <a href="/en/ferias/stand-eco-maison-perpignan">Eco-Maison</a>, <a href="/en/ferias/stand-retro-mecanic-perpignan">Retro Mécanic</a> and <a href="/en/ferias/stand-salon-mariage-perpignan">Salon du Mariage</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_perpignan">trade fair stands in Perpignan</a> page.</p>
        ${porqueEn('Perpignan')}`
  },
  constructor_stand_batalha: {
    breadcrumb: 'Stand builder in Batalha',
    title: 'Stand builder in Batalha | Own workshop | Standarte',
    h1: 'Stand builder in Batalha',
    introText: "We build custom stands for Exposalão – Centro de Exposições da Batalha from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Batalha: in-house manufacturing for Exposalão – Centro de Exposições da Batalha</h2>
        <p>Exposalão, in Batalha, is central Portugal’s industrial venue: moulds, plastics, metal, stone and glass. These are fairs of running machines and heavy product: we build with technical flooring, power and compressed air planned and graphics in Portuguese, made in the workshop and installed by our crew.</p>
        <p>The whole stand is pre-assembled in our workshop before the truck is loaded: every part numbered, graphics applied and services tested, so that in the hall we install rather than improvise.</p>
        ${pasoEn('Batalha')}
        ${tiposEn('Batalha')}
        <h2>Stand builder in Batalha: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/en/ferias/stand-expometal-batalha">Expometal</a>, <a href="/en/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/en/ferias/stand-vidrotec-batalha">Vidrotec</a> and <a href="/en/ferias/stand-decorhotel-batalha">Decorhotel</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_batalha">trade fair stands in Batalha</a> page.</p>
        ${porqueEn('Batalha')}`
  },
  constructor_stand_santarem: {
    breadcrumb: 'Stand builder in Santarem',
    title: 'Stand builder in Santarem | Own workshop | Standarte',
    h1: 'Stand builder in Santarem',
    introText: "We build custom stands for CNEMA – Centro Nacional de Exposições from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santarem: in-house manufacturing for CNEMA – Centro Nacional de Exposições</h2>
        <p>Santarém is Portugal’s agricultural heart: the National Agriculture Fair and Agroglobal fill CNEMA with tractors, livestock and product. We build machinery stands with reinforced floor and tasting stands with refrigeration, made in the workshop and delivered from Spain with installation included.</p>
        <p>We handle what each hall requires — power, water, height limits, fire-reaction certificates for timber and textiles — and arrive with the paperwork in order, so the build-up never stops for a missing document.</p>
        ${pasoEn('Santarem')}
        ${tiposEn('Santarem')}
        <h2>Stand builder in Santarem: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/en/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/en/ferias/stand-agroglobal-santarem">Agroglobal</a> and <a href="/en/ferias/stand-lusoflora-santarem">Lusoflora</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santarem">trade fair stands in Santarem</a> page.</p>
        ${porqueEn('Santarem')}`
  },
  constructor_stand_regua: {
    breadcrumb: 'Stand builder in Peso da Régua',
    title: 'Stand builder in Peso da Régua | Own workshop | Standarte',
    h1: 'Stand builder in Peso da Régua',
    introText: "We build custom stands for Recintos feriales de Peso da Régua (Douro) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Peso da Régua: in-house manufacturing for Recintos feriales de Peso da Régua (Douro)</h2>
        <p>Peso da Régua is the Douro: Port wine fairs, wine tourism and regional flavours, many in open spaces by the river. We build tasting stands with bar, refrigeration and bottle display, prepared for covered outdoor use, and bring them pre-assembled from our workshop.</p>
        <p>We design with the next show in mind: modular wall panels, interchangeable graphics and furniture that is stored and reused, because a returning exhibitor should not pay for the stand twice.</p>
        ${pasoEn('Peso da Régua')}
        ${tiposEn('Peso da Régua')}
        <h2>Stand builder in Peso da Régua: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/en/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> and <a href="/en/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_peso_da_regua">trade fair stands in Peso da Régua</a> page.</p>
        ${porqueEn('Peso da Régua')}`
  },
  constructor_stand_portugal_sur: {
    breadcrumb: 'Stand builder in southern Portugal',
    title: 'Stand builder in southern Portugal | Own workshop | Standarte',
    h1: 'Stand builder in southern Portugal',
    introText: "We build custom stands for Parque de Exposições de Beja y recintos del Algarve from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in southern Portugal: in-house manufacturing for Parque de Exposições de Beja y recintos del Algarve</h2>
        <p>Southern Portugal exhibits in Beja, with Ovibeja and Vinipax, and in the Algarve, with Fatacil and the Portimão and Lagoa fairs: agriculture, wine and general public. We build covered outdoor stands with washable floor and tasting stands, and transport them pre-assembled from Spain with installation included.</p>
        <p>One person runs the project from drawing to dismantling: no middlemen, no subcontracted workshops, and any last-minute change is solved by our own crew in the hall.</p>
        ${pasoEn('southern Portugal')}
        ${tiposEn('southern Portugal')}
        <h2>Stand builder in southern Portugal: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/en/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/en/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/en/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/en/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> and <a href="/en/ferias/stand-vinipax-beja">Vinipax Beja</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_southern_portugal">trade fair stands in southern Portugal</a> page.</p>
        ${porqueEn('southern Portugal')}`
  },
  constructor_stand_islas_de_madeira: {
    breadcrumb: 'Stand builder in Madeira',
    title: 'Stand builder in Madeira | Own workshop | Standarte',
    h1: 'Stand builder in Madeira',
    introText: "We build custom stands for Madeira Tecnopolo (Funchal) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Madeira: in-house manufacturing for Madeira Tecnopolo (Funchal)</h2>
        <p>Madeira exhibits at the Funchal Tecnopolo: jobs, entrepreneurship, farming and wine fairs. Everything arrives by container: we build and pre-assemble the whole stand in the workshop, number it part by part and ship it with spares, so that on the island there is only assembly left.</p>
        <p>We work with a workshop mindset: we measure the contracted space, calculate loads and reinforcement, book services with the venue in advance and make the joinery in materials meant to go up fast, last the show and serve again at the next one.</p>
        ${pasoEn('Madeira')}
        ${tiposEn('Madeira')}
        <h2>Stand builder in Madeira: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-expomadeira">Expomadeira</a>, <a href="/en/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/en/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/en/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/en/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> and <a href="/en/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_madeira_islands">trade fair stands in Madeira</a> page.</p>
        ${porqueEn('Madeira')}`
  },
};

// Se cuelgan de cada ficha: builderSeoData[seccion].en. Si mañana se añade una página
// paralela sin versión inglesa, simplemente no aparece en inglés (no se genera ruta).
for (const [k, v] of Object.entries(EN)) {
  if (builderSeoData[k]) builderSeoData[k].en = v;
}


// --- Versión portuguesa ----------------------------------------------------------
// Solo las dos plazas portuguesas, Oporto y Lisboa: son donde el comprador busca en
// su propio idioma («construtor de stands no Porto / em Lisboa») y donde la
// competencia local se posiciona en portugués. El resto de las plazas son españolas y
// su búsqueda nativa ya está cubierta en castellano; abrir ahí una versión pt sería
// una traducción sin demanda que solo diluye.
// La expresión objetivo lleva artículo —«no Porto», no «em Porto»—, así que los
// helpers reciben ya el locativo completo y sirven igual para otra plaza («em Lisboa»).
const pasoPt = (c) => `
        <h2>Construtor de stands ${c}: como se constrói o seu stand, passo a passo</h2>
        <ol>
          <li><strong>Levantamento.</strong> Medidas reais do espaço contratado, pé-direito do pavilhão e regras do recinto antes de se desenhar seja o que for.</li>
          <li><strong>Engenharia e protótipo 3D.</strong> Estrutura, cargas, instalações e mapa de corte resolvidos primeiro; recebe um protótipo fotorrealista do que vai ser construído.</li>
          <li><strong>Fabrico em oficina própria.</strong> Carpintaria à medida, mobiliário e grafismo produzidos pela nossa equipa, com controlo peça a peça.</li>
          <li><strong>Pré-montagem.</strong> O stand é montado na oficina antes de seguir viagem: os acertos fazem-se aqui, não contra o relógio no pavilhão.</li>
          <li><strong>Transporte e montagem.</strong> Os nossos montadores e carpinteiros levantam o stand, pronto 24&nbsp;h antes da abertura.</li>
          <li><strong>Desmontagem e armazenamento.</strong> Retiramos o stand no encerramento e guardamos as peças reutilizáveis para a edição seguinte.</li>
        </ol>`;

const tiposPt = (c) => `
        <h2>Construtor de stands ${c}: o que construímos</h2>
        <ul>
          <li><strong>Stand de design livre em carpintaria.</strong> Estrutura e paredes feitas à medida, com acabamentos lacados, folheados ou têxteis.</li>
          <li><strong>Stand de dois pisos.</strong> Cálculo estrutural, escada e piso superior de reuniões quando o pavilhão o permite.</li>
          <li><strong>Stand modular reutilizável.</strong> Peças de sistema próprias, reconfiguradas feira após feira, que baixam o custo de uma presença recorrente.</li>
          <li><strong>Stand com maquinaria ou produto pesado.</strong> Pavimentos técnicos, reforços e ramais previstos para expor equipamento a funcionar.</li>
          <li><strong>Mobiliário e elementos de exposição.</strong> Balcões, vitrinas, expositores e arrumação oculta, construídos para o seu produto e não comprados em catálogo.</li>
        </ul>`;

const porquePt = (c) => `
        <h2>Construtor de stands ${c}: porquê construir com a Standarte</h2>
        <p>Somos construtores, não intermediários: o stand é fabricado na <strong>nossa oficina</strong>, pela nossa equipa e no nosso prazo. Isso significa um único responsável do princípio ao fim, um orçamento sem a margem de terceiros e capacidade para resolver uma alteração de última hora sem depender da agenda de outra oficina. Cada aprovação fica registada no <a href="/pt/projeto-auditado">Sistema de Projeto Auditado</a>: o que aprova é, literalmente, o que se constrói.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand ${c}</a></p>`;

const PT = {
  constructor_stand_oporto: {
    breadcrumb: 'Construtor de stands no Porto',
    title: 'Construtor de stands no Porto | Oficina própria | Standarte',
    h1: 'Construtor de stands no Porto',
    introText: 'Construímos stands à medida para a Exponor (Feira Internacional do Porto) com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.',
    body: `
        <h2>Construtor de stands no Porto: fabrico próprio para a Exponor</h2>
        <p>A Exponor, em Leça da Palmeira, concentra o norte industrial e exportador de Portugal: têxtil e confeção, construção e decoração, alimentação, cosmética e metalomecânica. É um visitante profissional, que se aproxima do produto e o inspeciona de perto — e isso define o padrão de construção: acabamentos sólidos à altura da mão, iluminação fiel à cor real e espaço para negociar sentado.</p>
        <p>Cada setor pede uma construção diferente: painéis de mostruário para o têxtil, prateleiras iluminadas para o produto pequeno, pavimentos técnicos e ramais previstos para maquinaria a funcionar. Fabricamos tudo na nossa oficina, pré-montamos o stand antes de o carregar e chegamos ao pavilhão para montar, não para improvisar.</p>
        ${pasoPt('no Porto')}
        ${tiposPt('no Porto')}
        <h2>Construtor de stands no Porto: feiras do recinto</h2>
        <p>Construímos para o calendário da Exponor e da área do Porto: <a href="/pt/ferias/stand-concreta-oporto">Concreta</a>, <a href="/pt/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/pt/ferias/stand-expocosmetica-oporto">Expocosmética</a>, <a href="/pt/ferias/stands-qualifica-oporto">Qualifica</a>, <a href="/pt/ferias/stand-emaf-oporto">Emaf</a>, <a href="/pt/ferias/stand-itf-intertex-oporto">ITF Intertex</a> e <a href="/pt/ferias/stands-tecnipao-oporto">Tecnipão</a>. O serviço completo de design e montagem está na página de <a href="/pt/design_montagem_stands_porto">stands para feiras no Porto</a>.</p>
        ${porquePt('no Porto')}`
  },
  /* Lisboa (2026-09-10): FIL y el calendario de congresos de la ciudad. Texto propio
   * de CONSTRUCCIÓN —transporte desde España, premontaje, ventanas cortas de montaje
   * de los congresos— para no solaparse con la página de plaza en portugués. */
  constructor_stand_lisboa: {
    breadcrumb: 'Construtor de stands em Lisboa',
    title: 'Construtor de stands em Lisboa | Oficina própria | Standarte',
    h1: 'Construtor de stands em Lisboa',
    introText: 'Construímos stands à medida para a FIL (Feira Internacional de Lisboa) e para os congressos da cidade, com fabrico em oficina própria: estrutura, carpintaria, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.',
    body: `
        <h2>Construtor de stands em Lisboa: fabrico próprio para a FIL e para os congressos</h2>
        <p>Lisboa tem dois calendários que exigem construções distintas. Na FIL, no Parque das Nações, as feiras profissionais —construção, turismo, náutica, alimentação— pedem stands de dois a quatro dias com produto exposto e espaço para negociar. Nos congressos internacionais que a cidade acolhe —tecnologia, saúde, aviação— a janela de montagem é de horas, não de dias: o stand tem de chegar pré-montado, com o grafismo aplicado e as instalações testadas, e levantar-se sem improvisar.</p>
        <p>Por isso fabricamos tudo na nossa oficina, montamos o stand inteiro antes de o carregar e organizamos o transporte até Lisboa com margem para que a descarga não dependa de um imprevisto na estrada. Tratamos também o que o recinto exige: ramais de eletricidade e água, certificados de reação ao fogo das madeiras e têxteis, e os limites de altura e de suspensão de cada pavilhão.</p>
        ${pasoPt('em Lisboa')}
        ${tiposPt('em Lisboa')}
        <h2>Construtor de stands em Lisboa: feiras e congressos da cidade</h2>
        <p>Construímos para o calendário da FIL e dos grandes congressos: <a href="/pt/ferias/stand-btl-lisboa">BTL</a>, <a href="/pt/ferias/stand-tektonica-lisboa">Tektónica</a>, <a href="/pt/ferias/stand-sil-lisboa">SIL</a>, <a href="/pt/ferias/stand-nauticampo-lisboa">Nauticampo</a>, <a href="/pt/ferias/stand-web-summit-lisboa">Web Summit</a>, <a href="/pt/ferias/stand-world-aviation-festival-lisboa">World Aviation Festival</a> e <a href="/pt/ferias/stand-esicm-lives-lisboa">ESICM LIVES</a>. O serviço completo de design e montagem está na página de <a href="/pt/design_montagem_stands_lisboa">stands para feiras em Lisboa</a>.</p>
        ${porquePt('em Lisboa')}`
  },
  constructor_stand_batalha: {
    breadcrumb: 'Construtor de stands na Batalha',
    title: 'Construtor de stands na Batalha | Oficina própria | Standarte',
    h1: 'Construtor de stands na Batalha',
    introText: "Construímos stands à medida para Exposalão – Centro de Exposições da Batalha com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands na Batalha: fabrico próprio para Exposalão – Centro de Exposições da Batalha</h2>
        <p>A Exposalão, na Batalha, é o recinto industrial do centro de Portugal: moldes, plásticos, metal, pedra e vidro. São feiras de máquina a trabalhar e produto pesado: construímos com pavimento técnico, potência e ar comprimido previstos e grafismo em português, fabricados em oficina e montados pela nossa equipa.</p>
        <p>O stand é pré-montado inteiro na nossa oficina antes de carregar o camião: cada peça numerada, o grafismo aplicado e as instalações testadas, para que no pavilhão só se monte, sem improvisos.</p>
        ${pasoPt('na Batalha')}
        ${tiposPt('na Batalha')}
        <h2>Construtor de stands na Batalha: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/pt/ferias/stand-expometal-batalha">Expometal</a>, <a href="/pt/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/pt/ferias/stand-vidrotec-batalha">Vidrotec</a> e <a href="/pt/ferias/stand-decorhotel-batalha">Decorhotel</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_batalha">stands para feiras na Batalha</a>.</p>
        ${porquePt('na Batalha')}`
  },
  constructor_stand_santarem: {
    breadcrumb: 'Construtor de stands em Santarém',
    title: 'Construtor de stands em Santarém | Oficina própria | Standarte',
    h1: 'Construtor de stands em Santarém',
    introText: "Construímos stands à medida para CNEMA – Centro Nacional de Exposições com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands em Santarém: fabrico próprio para CNEMA – Centro Nacional de Exposições</h2>
        <p>Santarém é o coração agrícola de Portugal: a Feira Nacional de Agricultura e a Agroglobal enchem o CNEMA de tratores, gado e produto. Construímos stands de maquinaria com pavimento reforçado e stands de prova com frio, fabricados em oficina e transportados de Espanha com a montagem incluída.</p>
        <p>Tratamos com o recinto o que cada pavilhão exige —potência, água, alturas, certificados de reação ao fogo de madeiras e têxteis— e chegamos com a documentação em ordem, para que a montagem não pare por um papel.</p>
        ${pasoPt('em Santarém')}
        ${tiposPt('em Santarém')}
        <h2>Construtor de stands em Santarém: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/pt/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/pt/ferias/stand-agroglobal-santarem">Agroglobal</a> e <a href="/pt/ferias/stand-lusoflora-santarem">Lusoflora</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_santarem">stands para feiras em Santarém</a>.</p>
        ${porquePt('em Santarém')}`
  },
  constructor_stand_regua: {
    breadcrumb: 'Construtor de stands no Peso da Régua',
    title: 'Construtor de stands no Peso da Régua | Oficina própria | Standarte',
    h1: 'Construtor de stands no Peso da Régua',
    introText: "Construímos stands à medida para Recintos feriales de Peso da Régua (Douro) com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands no Peso da Régua: fabrico próprio para Recintos feriales de Peso da Régua (Douro)</h2>
        <p>O Peso da Régua é o Douro: feiras de vinho do Porto, enoturismo e sabores da região, muitas em espaços abertos junto ao rio. Construímos stands de prova com balcão, frio e garrafeira, preparados para exterior coberto, e levamo-los pré-montados da nossa oficina.</p>
        <p>Desenhamos a pensar na edição seguinte: paramentos por módulos, grafismo intercambiável e mobiliário que se guarda e reutiliza, porque um expositor que repete não devia pagar o stand duas vezes.</p>
        ${pasoPt('no Peso da Régua')}
        ${tiposPt('no Peso da Régua')}
        <h2>Construtor de stands no Peso da Régua: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/pt/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> e <a href="/pt/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_peso_da_regua">stands para feiras no Peso da Régua</a>.</p>
        ${porquePt('no Peso da Régua')}`
  },
  constructor_stand_portugal_sur: {
    breadcrumb: 'Construtor de stands no Sul de Portugal',
    title: 'Construtor de stands no Sul de Portugal | Oficina própria | Standarte',
    h1: 'Construtor de stands no Sul de Portugal',
    introText: "Construímos stands à medida para Parque de Exposições de Beja y recintos del Algarve com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands no Sul de Portugal: fabrico próprio para Parque de Exposições de Beja y recintos del Algarve</h2>
        <p>O Sul de Portugal expõe em Beja, com a Ovibeja e a Vinipax, e no Algarve, com a Fatacil e as feiras de Portimão e Lagoa: agricultura, vinho e grande público. Construímos stands de exterior coberto com pavimento lavável e stands de prova, e transportamo-los pré-montados de Espanha com a montagem incluída.</p>
        <p>Um único responsável leva o projeto do desenho à desmontagem: sem intermediários nem oficinas subcontratadas, e qualquer alteração de última hora resolve-se com a nossa própria equipa no pavilhão.</p>
        ${pasoPt('no Sul de Portugal')}
        ${tiposPt('no Sul de Portugal')}
        <h2>Construtor de stands no Sul de Portugal: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/pt/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/pt/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/pt/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/pt/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> e <a href="/pt/ferias/stand-vinipax-beja">Vinipax Beja</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_sul_portugal">stands para feiras no Sul de Portugal</a>.</p>
        ${porquePt('no Sul de Portugal')}`
  },
  constructor_stand_islas_de_madeira: {
    breadcrumb: 'Construtor de stands na Madeira',
    title: 'Construtor de stands na Madeira | Oficina própria | Standarte',
    h1: 'Construtor de stands na Madeira',
    introText: "Construímos stands à medida para Madeira Tecnopolo (Funchal) com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands na Madeira: fabrico próprio para Madeira Tecnopolo (Funchal)</h2>
        <p>A Madeira expõe no Tecnopolo do Funchal: feiras de emprego, empreendedorismo, agropecuária e vinho. Tudo chega em contentor: fabricamos e pré-montamos o stand inteiro em oficina, numeramo-lo peça a peça e embarcamo-lo com sobressalentes, para que na ilha só haja que montar.</p>
        <p>Trabalhamos com critério de oficina: medimos o espaço contratado, calculamos cargas e reforços, deixamos previstos os ramais com o recinto e fabricamos a carpintaria com materiais pensados para montar depressa, aguentar a feira e voltar a servir na seguinte.</p>
        ${pasoPt('na Madeira')}
        ${tiposPt('na Madeira')}
        <h2>Construtor de stands na Madeira: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-expomadeira">Expomadeira</a>, <a href="/pt/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/pt/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/pt/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/pt/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> e <a href="/pt/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_ilhas_madeira">stands para feiras na Madeira</a>.</p>
        ${porquePt('na Madeira')}`
  },
};

// Se cuelgan como builderSeoData[seccion].pt, igual que la capa inglesa.
for (const [k, v] of Object.entries(PT)) {
  if (builderSeoData[k]) builderSeoData[k].pt = v;
}
