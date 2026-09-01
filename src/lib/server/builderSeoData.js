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
  }
};
