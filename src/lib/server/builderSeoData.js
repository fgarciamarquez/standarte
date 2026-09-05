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
        ${porqueEn('FIGAN')}`
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
        ${porqueEn('Agroexpo')}`
  }
};

// Se cuelgan de cada ficha: builderSeoData[seccion].en. Si mañana se añade una página
// paralela sin versión inglesa, simplemente no aparece en inglés (no se genera ruta).
for (const [k, v] of Object.entries(EN)) {
  if (builderSeoData[k]) builderSeoData[k].en = v;
}


// --- Versión portuguesa ----------------------------------------------------------
// Solo Oporto: es la única plaza de estas páginas donde el comprador busca en su
// propio idioma («construtor de stands no Porto») y donde la competencia local se
// posiciona en portugués. El resto de las plazas son españolas y su búsqueda nativa
// ya está cubierta en castellano; abrir ahí una versión pt sería una traducción sin
// demanda que solo diluye.
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
  }
};

// Se cuelgan como builderSeoData[seccion].pt, igual que la capa inglesa.
for (const [k, v] of Object.entries(PT)) {
  if (builderSeoData[k]) builderSeoData[k].pt = v;
}
