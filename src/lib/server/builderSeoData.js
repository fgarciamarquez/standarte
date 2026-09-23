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
        <p>La Feria de Zaragoza concentra algunos de los certámenes más exigentes de España en materia de construcción de stands: en <a href="/ferias/stands-fima-zaragoza">FIMA</a> y <a href="/ferias/stands-figan-feria-zaragoza">FIGAN</a> se expone maquinaria agrícola y ganadera de varias toneladas, y en <a href="/ferias/stands-smopyc-zaragoza">SMOPYC</a>, obra pública y equipos de construcción. Un stand para esas ferias no es una decoración: es una estructura que tiene que soportar peso, resistir el trasiego de cuatro días y quedar impecable a primera vista.</p>
        <p>Por eso construimos con criterio de taller: calculamos la carga real del suelo y los refuerzos necesarios, dejamos previstas las acometidas de agua y potencia con el recinto, y fabricamos la carpintería con materiales pensados para arquitectura efímera —ligeros de transportar, sólidos en pabellón y reutilizables en la siguiente convocatoria—.</p>
        ${paso('Zaragoza')}
        ${tipos('Zaragoza')}
        <h2>Constructor de stands en Zaragoza: ferias del recinto</h2>
        <p>Construimos para todo el calendario del recinto: <a href="/ferias/stands-fima-zaragoza">FIMA</a>, <a href="/ferias/stands-figan-feria-zaragoza">FIGAN</a>, <a href="/ferias/stands-smopyc-zaragoza">SMOPYC</a>, <a href="/ferias/stands-smagua-zaragoza">SMAGUA</a>, <a href="/ferias/stands-aratur-zaragoza">Aratur</a>, <a href="/ferias/stands-expofimer-zaragoza">EXPOFIMER</a> y <a href="/ferias/stands-spaper-zaragoza">SPAPER</a>. Si prefieres ver el servicio completo de diseño y montaje para la plaza, está en nuestra página de <a href="/diseno-construccion-montaje-stands-zaragoza">diseño y montaje de stands en Zaragoza</a>.</p>
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
        <p>Nuestro taller está en San Fernando de Henares, a unos diez kilómetros de la Feria de Madrid. En una plaza como IFEMA esa distancia es la diferencia entre resolver un imprevisto de montaje en una hora o esperar a un transporte desde otra provincia. IFEMA es además el recinto más denso de España en calendario, con doce pabellones que encadenan certámenes casi sin respiro y comprimen las ventanas de montaje: por eso el stand se arma entero en taller antes de salir y llegamos al pabellón a ensamblar, no a improvisar.</p>
        <ul>
          <li><strong>Taller en San Fernando de Henares</strong>, a quince minutos del recinto.</li>
          <li><strong>Prototipo 3D</strong> que es exactamente lo que se construye.</li>
          <li><strong>Ajustes el mismo día</strong> del montaje, sin depender de otro taller.</li>
          <li><strong>Montaje terminado 24&nbsp;h antes</strong> de la apertura.</li>
        </ul>
        <h2>Constructor de stands en Madrid: qué construimos</h2>
        <h3>Stands de diseño libre en carpintería</h3>
        <p>Estructura, paramentos y mobiliario fabricados a medida para ferias como Fruit Attraction o SICUR, con acabados lacados, chapados o textiles y gráfica retroiluminada.</p>
        <h3>Stands con zona de degustación y cocina</h3>
        <p>Barras con fregadero y frío, cocinas de demostración y almacén para las ferias de alimentación de IFEMA, con las acometidas de agua coordinadas con el recinto.</p>
        <h3>Dobles alturas</h3>
        <p>Sala de reuniones o terraza arriba, exposición abajo: la solución para parcelas grandes en pabellones donde cada metro de pasillo cuenta.</p>
        <h3>Stands modulares reutilizables</h3>
        <p>Para empresas con varias ferias al año en IFEMA, una estructura que se almacena, se reconfigura y vuelve con la gráfica de la nueva campaña.</p>
        <p><strong>¿Tienes una feria próxima en IFEMA?</strong> Las ventanas de montaje se reparten pronto: con el espacio contratado y la fecha, reservamos turno de taller y de montaje.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Madrid</a></p>
        <h2>Constructor de stands en Madrid: por qué construir con Standarte</h2>
        <ul>
          <li><strong>Construimos, no intermediamos.</strong> El stand se fabrica en nuestro taller de San Fernando de Henares, con nuestro equipo.</li>
          <li><strong>Cercanía real a IFEMA.</strong> Si algo hay que rehacer durante el montaje, se fabrica y se lleva el mismo día.</li>
          <li><strong>Lo que apruebas es lo que se construye.</strong> Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>.</li>
          <li><strong>Obra real en Madrid.</strong> Más de 30 stands publicados en nuestra cartera de proyectos para empresas que exponen en IFEMA.</li>
        </ul>
        <h2>Constructor de stands en Madrid: cómo trabajamos, del plano al desmontaje</h2>
        <ol>
          <li><strong>Briefing y plano.</strong> Objetivos, pabellón y parcela en IFEMA, normativa y producto que se expone.</li>
          <li><strong>Prototipo 3D y presupuesto.</strong> Lo revisas, lo ajustamos y lo apruebas.</li>
          <li><strong>Fabricación y premontaje en San Fernando de Henares.</strong> Todo se arma y se prueba antes de cargar.</li>
          <li><strong>Montaje, feria y desmontaje.</strong> Nuestro equipo monta, queda localizable a quince minutos y retira el stand al cierre.</li>
        </ol>
        <h2>Constructor de stands en Madrid: proyectos que hemos construido</h2>
        <p>Una muestra de stands para empresas que exponen en Madrid, con su ficha de proyecto:</p>
        <ul>
          <li><a href="/proyectos/stand_para_herrajes_puertas_ventanas_madrid">Stand modular de herrajes</a></li>
          <li><a href="/proyectos/stand_para_distribuidor_de_uvas_de_mesa_en_madrid">Stand para distribuidor de uvas de mesa</a></li>
          <li><a href="/proyectos/stand_para_empresa_del_sector_sanitario_en_madrid">Stand para empresa del sector sanitario</a></li>
          <li><a href="/proyectos/stand_para_fabricante_de_equipos_industriales_en_madrid">Stand para fabricante de equipos industriales</a></li>
          <li><a href="/proyectos/stand_para_empresa_de_alimentos_congelados_en_madrid">Stand para empresa de alimentos congelados</a></li>
          <li><a href="/proyectos/stand_para_operador_de_telecomunicaciones_en_madrid">Stand para operador de telecomunicaciones</a></li>
        </ul>
        <h2>Constructor de stands en Madrid: ferias del recinto</h2>
        <p>Construimos para todo el calendario de IFEMA: <a href="/ferias/stand-fruit-attraction-madrid">Fruit Attraction</a>, <a href="/ferias/stand-sicur-madrid">SICUR</a>, <a href="/ferias/stand-veteco-madrid">Veteco</a>, <a href="/ferias/stand-hip-madrid">HIP</a> y <a href="/ferias/stand-meat-attraction-madrid">Meat Attraction</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno-construccion-montaje-stands-madrid">diseño y montaje de stands en Madrid</a>.</p>`,
      faqs: [
        {
          "q": "¿Dónde está vuestro taller?",
          "a": "En San Fernando de Henares, a unos diez kilómetros de IFEMA. Fabricamos y premontamos allí y llegamos al recinto en unos quince minutos."
        },
        {
          "q": "¿Fabricáis vosotros el stand o lo subcontratáis?",
          "a": "Lo fabricamos en nuestro propio taller, con nuestro equipo de carpinteros y montadores. No subcontratamos la producción ni el montaje."
        },
        {
          "q": "¿Qué pasa si hay que cambiar algo durante el montaje en IFEMA?",
          "a": "Al estar a quince minutos, las piezas se rehacen o se ajustan en taller y se llevan el mismo día, sin esperar a un transporte desde otra provincia."
        },
        {
          "q": "¿Construís stands con cocina o degustación?",
          "a": "Sí: barras con fregadero y frío, cocinas de demostración y almacén, con las acometidas de agua y potencia coordinadas con IFEMA."
        },
        {
          "q": "¿Con cuánta antelación hay que encargar el stand?",
          "a": "Lo recomendable son 6-8 semanas antes de la feria. En IFEMA las ventanas de montaje son cortas, así que conviene reservar turno pronto."
        },
        {
          "q": "¿Cuánto cuesta un stand en Madrid?",
          "a": "Depende de los metros cuadrados, la estructura y los acabados. En la página de precios hay tramos orientativos y te preparamos un presupuesto cerrado en 24 h con el prototipo 3D."
        }
      ]
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
        <p>Construimos para las grandes citas de Fira: <a href="/ferias/stand-mwc-barcelona">MWC</a>, <a href="/ferias/stand-ise-barcelona">ISE</a>, <a href="/ferias/stand-alimentaria-barcelona">Alimentaria</a>, <a href="/ferias/stand-hispack-barcelona">Hispack</a>, <a href="/ferias/stand-hostelco-barcelona">Hostelco</a>, <a href="/ferias/stand-construmat-barcelona">Construmat</a>, <a href="/ferias/stand-expoquimia-barcelona">Expoquimia</a> y <a href="/ferias/stand-smart-city-expo-world-congress-barcelona">Smart City Expo World Congress</a>. El servicio completo de diseño y montaje está en <a href="/diseno-construccion-montaje-stands-barcelona">diseño y montaje de stands en Barcelona</a>.</p>
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
        <p>Construir en Oporto añade una variable que no tiene una feria nacional: el transporte. Fabricamos el stand completo en nuestro taller, lo premontamos para detectar cualquier ajuste antes de que salga y organizamos el viaje a Exponor (Leça da Palmeira, Matosinhos) con margen para que descarga y montaje no dependan de un imprevisto en carretera. El norte de Portugal reúne además sectores muy distintos —textil, construcción, alimentación, cosmética— y cada uno pide una construcción diferente: paneles de muestrario con luz fiel, estanterías iluminadas para el producto pequeño o suelos técnicos para maquinaria.</p>
        <h2>Constructor de stands en Oporto: cómo trabajamos la plaza</h2>
        <ol>
          <li><strong>Proyecto y prototipo 3D</strong> con las medidas del espacio en Exponor y sus normas de altura, suspensión y acometidas.</li>
          <li><strong>Fabricación y premontaje en nuestro taller</strong>, con el transporte transfronterizo organizado por nosotros.</li>
          <li><strong>Montaje con equipo propio</strong>, terminado 24&nbsp;h antes de la apertura, y desmontaje al cierre.</li>
        </ol>
        <h2>Constructor de stands en Oporto: ferias del recinto</h2>
        <p>Construimos para las citas de Exponor: <a href="/ferias/stand-concreta-oporto">Concreta</a>, <a href="/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/ferias/stand-expocosmetica-oporto">Expocosmética</a> y <a href="/ferias/stand-emaf-oporto">Emaf</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno-construccion-montaje-stands-oporto">diseño y montaje de stands en Oporto</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Oporto</a></p>`
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
        <p>Lisboa combina dos escenarios que exigen construcciones distintas. En la FIL, en el Parque das Nações, hay pabellón y altura para un stand de diseño libre con doble altura y almacén. En los grandes congresos —tecnológicos, médicos o del sector del juego, repartidos entre la FIL y el MEO Arena— las ventanas de montaje se miden en horas, así que fabricamos por módulos premontados que en pabellón solo hay que ensamblar y conectar, con la gráfica colocada y la instalación eléctrica probada antes de cargar el camión.</p>
        <ul>
          <li><strong>Un solo interlocutor</strong> en español, inglés o portugués.</li>
          <li><strong>Prototipo 3D</strong> que es exactamente lo que se construye.</li>
          <li><strong>Fabricación en nuestro taller</strong> y transporte a Lisboa organizado por nosotros.</li>
          <li><strong>Montaje dentro de la ventana asignada</strong>, también en congresos de pocas horas.</li>
        </ul>
        <h2>Constructor de stands en Lisboa: qué construimos</h2>
        <h3>Stands de diseño libre para la FIL</h3>
        <p>Estructura y carpintería a medida para ferias como BTL o Tektónica, con almacén integrado y gráfica de gran formato.</p>
        <h3>Módulos de congreso premontados</h3>
        <p>Stands compactos que salen del taller terminados y se levantan en horas en congresos como Web Summit, sin renunciar al acabado.</p>
        <h3>Dobles alturas</h3>
        <p>Sala de reuniones arriba y exposición abajo cuando el pabellón de la FIL lo permite, calculadas y premontadas en taller.</p>
        <h3>Stands reutilizables para varias ediciones</h3>
        <p>Estructuras que se guardan entre ediciones y vuelven a Lisboa con la gráfica de la nueva campaña.</p>
        <p><strong>¿Tienes una feria o un congreso próximo en Lisboa?</strong> Con el espacio y la ventana de montaje, planificamos taller y transporte con margen.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Lisboa</a></p>
        <h2>Constructor de stands en Lisboa: por qué construir con Standarte</h2>
        <ul>
          <li><strong>Construimos, no intermediamos.</strong> El stand se fabrica en nuestro taller, con nuestro equipo, y viaja a Lisboa premontado.</li>
          <li><strong>Transporte resuelto.</strong> Organizamos el viaje con margen para que la descarga no dependa de la carretera.</li>
          <li><strong>Lo que apruebas es lo que se construye.</strong> Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>.</li>
          <li><strong>Obra real en Lisboa.</strong> Proyectos publicados en nuestra cartera para empresas que exponen en la ciudad.</li>
        </ul>
        <h2>Constructor de stands en Lisboa: cómo trabajamos, del plano al desmontaje</h2>
        <ol>
          <li><strong>Briefing y plano.</strong> Objetivos, espacio en la FIL o en el recinto del congreso y normas de montaje.</li>
          <li><strong>Prototipo 3D y presupuesto.</strong> Lo revisas, lo ajustamos y lo apruebas.</li>
          <li><strong>Fabricación, premontaje y transporte.</strong> Todo se prueba en taller antes de viajar.</li>
          <li><strong>Montaje, feria y desmontaje.</strong> Nuestro equipo monta en la ventana asignada y retira el stand al cierre.</li>
        </ol>
        <h2>Constructor de stands en Lisboa: proyectos que hemos construido</h2>
        <p>Stands para empresas que exponen en Lisboa, con su ficha de proyecto:</p>
        <ul>
          <li><a href="/proyectos/stand_para_embalaje_industrial_lisboa">Stand para embalaje industrial</a></li>
          <li><a href="/proyectos/stand_para_materiales_etiquetado_lisboa">Stand para materiales de etiquetado</a></li>
          <li><a href="/proyectos/stand_para_equipamiento_industrial_lisboa">Stand para equipamiento industrial</a></li>
          <li><a href="/proyectos/stand_para_gestion_trafico_inteligente_lisboa">Stand para gestión de tráfico inteligente</a></li>
        </ul>
        <h2>Constructor de stands en Lisboa: ferias y congresos del recinto</h2>
        <p>Construimos para las grandes citas de la capital: <a href="/ferias/stand-btl-lisboa">BTL</a>, <a href="/ferias/stand-tektonica-lisboa">Tektónica</a>, <a href="/ferias/stand-web-summit-lisboa">Web Summit</a> y <a href="/ferias/stand-nauticampo-lisboa">Nauticampo</a>. El servicio completo de diseño y montaje está en <a href="/diseno-construccion-montaje-stands-lisboa">diseño y montaje de stands en Lisboa</a>.</p>`,
      faqs: [
        {
          "q": "¿Montáis stands en Lisboa desde España?",
          "a": "Sí. Fabricamos y premontamos el stand en nuestro taller y organizamos el transporte a Lisboa con margen, de modo que en el pabellón solo se ensambla y se conecta."
        },
        {
          "q": "¿Fabricáis vosotros el stand o lo subcontratáis?",
          "a": "Lo fabricamos en nuestro propio taller, con nuestro equipo de carpinteros y montadores, y un único responsable lleva el proyecto."
        },
        {
          "q": "¿Podéis montar en congresos con muy poco tiempo de montaje?",
          "a": "Sí. Para congresos como Web Summit fabricamos módulos que salen del taller terminados y se levantan en pocas horas dentro de la ventana asignada."
        },
        {
          "q": "¿Nos atendéis en portugués?",
          "a": "Sí, trabajamos en español, portugués e inglés, con un único interlocutor durante todo el proyecto."
        },
        {
          "q": "¿Con cuánta antelación hay que encargar el stand?",
          "a": "Lo recomendable son 6-8 semanas antes de la feria, contando el transporte. Con plazos más cortos también trabajamos."
        },
        {
          "q": "¿Cuánto cuesta un stand en Lisboa?",
          "a": "Depende de los metros cuadrados, la estructura y los acabados. En la página de precios hay tramos orientativos y te preparamos un presupuesto cerrado en 24 h con el prototipo 3D."
        }
      ]
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
        <p>El BEC de Barakaldo es un recinto de escala industrial y sus ferias lo demuestran: en la <a href="/ferias/stands-biemh-bilbao-bec">BIEMH</a> se exponen máquinas-herramienta que se descargan con grúa y funcionan durante toda la feria. Construir aquí significa dimensionar el suelo para cargas reales, coordinar con el recinto los medios de elevación y dejar las tomas eléctricas resueltas antes de que la máquina llegue.</p>
        <p>La altura libre de los pabellones —entre 12 y 15 metros— permite además algo que en recintos más bajos no cabe: dobles alturas con sala de reuniones arriba y exposición abajo. Es una de las construcciones que más veces resolvemos en esta plaza, y se calcula y fabrica entera en taller antes de pisar el pabellón.</p>
        <ul>
          <li><strong>Un solo interlocutor</strong> del primer plano al desmontaje, sin intermediarios.</li>
          <li><strong>Prototipo 3D</strong> que es exactamente lo que se construye.</li>
          <li><strong>Fabricación en nuestro taller</strong> y premontaje antes de viajar al BEC.</li>
          <li><strong>Montaje terminado 24&nbsp;h antes</strong> de la apertura.</li>
        </ul>
        <h2>Constructor de stands en Bilbao: qué construimos</h2>
        <h3>Stands para maquinaria y producto pesado</h3>
        <p>Suelos técnicos calculados para la carga de cada equipo, pasos de instalación bajo tarima y acometidas previstas con el BEC, para exponer máquinas en marcha sin cables a la vista.</p>
        <h3>Dobles alturas</h3>
        <p>Estructura calculada, escalera y sala de reuniones arriba para aprovechar los pabellones altos del recinto: metros de negociación sin restar metros de exposición.</p>
        <h3>Stands de diseño libre en carpintería</h3>
        <p>Paramentos, mostradores y mobiliario fabricados a medida, con acabados lacados, chapados o textiles y gráfica retroiluminada para destacar en pasillos de gran escala.</p>
        <h3>Stands modulares reutilizables</h3>
        <p>Para quien repite en el calendario del BEC —BIEMH es bienal y alterna con Subcontratación—, una estructura que se guarda, se reconfigura y vuelve con la gráfica actualizada.</p>
        <p><strong>¿Tienes una feria próxima en el BEC?</strong> Cuanto antes conozcamos el espacio contratado y el equipo que vas a exponer, mejor encajan cargas, instalaciones y plazos.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Bilbao</a></p>
        <h2>Constructor de stands en Bilbao: por qué construir con Standarte</h2>
        <ul>
          <li><strong>Construimos, no intermediamos.</strong> El stand se fabrica en nuestro taller, con nuestro equipo: el presupuesto no lleva la comisión de un tercero.</li>
          <li><strong>Estudiamos el recinto antes de diseñar.</strong> Plano del pabellón, normas del BEC, cargas y alturas: el stand nace para ese espacio, no se adapta después.</li>
          <li><strong>Lo que apruebas es lo que se construye.</strong> Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>.</li>
          <li><strong>Obra real en Bilbao.</strong> Más de 30 stands publicados en nuestra cartera de proyectos para empresas que exponen en esta plaza.</li>
        </ul>
        <h2>Constructor de stands en Bilbao: cómo trabajamos, del plano al desmontaje</h2>
        <ol>
          <li><strong>Briefing y plano.</strong> Objetivos, espacio contratado en el BEC y equipos que se exponen.</li>
          <li><strong>Prototipo 3D y presupuesto.</strong> Lo revisas, lo ajustamos y lo apruebas.</li>
          <li><strong>Fabricación y premontaje en taller.</strong> Carpintería, estructura, gráfica e instalaciones probadas antes de cargar.</li>
          <li><strong>Montaje, feria y desmontaje.</strong> Nuestro equipo monta, está localizable durante la feria y retira el stand al cierre.</li>
        </ol>
        <h2>Constructor de stands en Bilbao: proyectos que hemos construido</h2>
        <p>Una muestra de stands para empresas que exponen en Bilbao, con su ficha de proyecto:</p>
        <ul>
          <li><a href="/proyectos/stand_para_empresa_de_automatizacion_por_vacio_en_bilbao">Stand para empresa de automatización por vacío</a></li>
          <li><a href="/proyectos/stand_para_fabricante_de_elastomeros_en_bilbao">Stand para fabricante de elastómeros</a></li>
          <li><a href="/proyectos/stand_para_empresa_de_tecnologia_industrial_en_bilbao">Stand para empresa de tecnología industrial</a></li>
          <li><a href="/proyectos/stand_para_aerolinea_de_carga_en_bilbao">Stand para aerolínea de carga</a></li>
          <li><a href="/proyectos/stand_para_empresa_de_packaging_en_bilbao">Stand para empresa de packaging</a></li>
          <li><a href="/proyectos/stand_para_empresa_de_cruceros_en_bilbao">Stand para empresa de cruceros</a></li>
        </ul>
        <h2>Constructor de stands en Bilbao: ferias del recinto</h2>
        <p>Construimos para el calendario del BEC: <a href="/ferias/stands-biemh-bilbao-bec">BIEMH</a>, <a href="/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/ferias/stands-maintenance-bilbao">Maintenance</a>, <a href="/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/ferias/stand-egurtek-bilbao">Egurtek</a> y <a href="/ferias/stand-world-maritime-week-bilbao">World Maritime Week</a>. El servicio completo de diseño y montaje está en <a href="/diseno-construccion-montaje-stands-bilbao">diseño y montaje de stands en Bilbao</a>.</p>`,
      faqs: [
        {
          "q": "¿Fabricáis vosotros el stand o lo subcontratáis?",
          "a": "Lo fabricamos en nuestro propio taller, con nuestro equipo de carpinteros y montadores. No subcontratamos la producción ni el montaje, y un único responsable lleva el proyecto de principio a fin."
        },
        {
          "q": "¿Podéis construir un stand con maquinaria en funcionamiento en el BEC?",
          "a": "Sí. Calculamos el suelo técnico para la carga de cada equipo, dejamos previstos los pasos de instalación y coordinamos con el BEC la entrada de la maquinaria y las acometidas eléctricas."
        },
        {
          "q": "¿Construís stands de doble altura en Bilbao?",
          "a": "Sí, es una de las construcciones más habituales en el BEC por la altura libre de sus pabellones. Se calcula la estructura, se fabrica y se premonta en taller antes del montaje."
        },
        {
          "q": "¿Con cuánta antelación hay que encargar el stand?",
          "a": "Lo recomendable son 6-8 semanas antes de la feria; para dobles alturas o maquinaria pesada, algo más. Con plazos más cortos también trabajamos, porque fabricamos en taller propio."
        },
        {
          "q": "¿Se puede reutilizar el stand en otras ferias?",
          "a": "Sí. Diseñamos estructuras modulares que se guardan entre ferias, se reconfiguran para otro espacio y vuelven con la gráfica actualizada."
        },
        {
          "q": "¿Cuánto cuesta un stand en Bilbao?",
          "a": "Depende de los metros cuadrados, la estructura y los acabados. En la página de precios hay tramos orientativos y te preparamos un presupuesto cerrado en 24 h con el prototipo 3D."
        }
      ]
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
        <p>Construimos para las citas de IFEBA y la provincia: <a href="/ferias/stand-fehispor-badajoz">Fehispor</a>, <a href="/ferias/stand-ecuextre-badajoz">Ecuextre</a>, <a href="/ferias/stand-feciex-badajoz">Feciex</a>, <a href="/ferias/stand-iberocio-badajoz">Iberocio</a> y <a href="/ferias/stand-feria-de-fp-badajoz">Feria de FP</a>. El servicio completo de diseño y montaje está en <a href="/diseno-construccion-montaje-stands-badajoz">diseño y montaje de stands en Badajoz</a>.</p>
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
        <p>Construimos para <a href="/ferias/stands-agroexpo">Agroexpo</a> y el resto del calendario de <a href="/ferias/stands-agroexpo-feval-don-benito">FEVAL</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/montaje-stands-don-benito">montaje de stands en Don Benito</a>.</p>
        ${porque('Don Benito')}`
    }
  },

  /* Defensa de una FICHA DE FERIA (no de una ciudad): FIGAN. La ficha
   * /ferias/stands-figan-feria-zaragoza fue denunciada, cambió de URL y no ha recuperado
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
        <p>El mismo taller construye para todo el calendario del recinto: <a href="/ferias/stands-fima-zaragoza">FIMA</a>, <a href="/ferias/stands-smopyc-zaragoza">SMOPYC</a>, <a href="/ferias/stands-smagua-zaragoza">SMAGUA</a>, <a href="/ferias/stands-aratur-zaragoza">Aratur</a> y <a href="/ferias/stands-expofimer-zaragoza">EXPOFIMER</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href="/ferias/stands-figan-feria-zaragoza">stands para FIGAN</a>; y el servicio para la plaza, en <a href="/diseno-construccion-montaje-stands-zaragoza">diseño y montaje de stands en Zaragoza</a> y en <a href="/constructor_stand_zaragoza">constructor de stands en Zaragoza</a>.</p>
        <h2>Constructor de stands para FIGAN: por qué construir con Standarte</h2>
        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href="/proyecto-auditado">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en FIGAN</a></p>`
    }
  },
  constructor_stand_fitur: {
    es: {
      breadcrumb: "Constructor de stands para FITUR",
      title: "Constructor de stands para FITUR (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para FITUR, IFEMA Madrid",
      introText: "Construimos stands a medida para FITUR desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para FITUR: qué exige esta feria</h2>\n        <p>FITUR es la feria de turismo más visitada de España y una de las primeras del mundo: destinos, cadenas hoteleras, aerolíneas y tecnología turística llenan casi todos los pabellones de IFEMA durante cinco días, con jornadas profesionales y dos de público general. Un stand de destino aquí compite con cientos de vecinos por la mirada de un visitante que camina deprisa.</p>\n        <p>Por eso construimos escenografía sólida y legible desde el pasillo, con zonas de reunión separadas para las citas B2B de las jornadas profesionales y superficies que resisten el fin de semana de público sin perder el acabado.</p>\n        <h2>Constructor de stands para FITUR: qué construimos</h2>\n        <ul>\n          <li><strong>Stands de destino con escenografía.</strong> Volúmenes, texturas y gran formato que cuentan un lugar en tres segundos.</li>\n          <li><strong>Stands compartidos de destino y empresas.</strong> Mostradores individuales bajo una imagen común, con almacén compartido.</li>\n          <li><strong>Zonas de reunión B2B.</strong> Salas semicerradas con mesa y pantalla para agendas de citas cerradas.</li>\n        </ul>\n        <h2>Constructor de stands para FITUR: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a>, <a href=\"/ferias/stand-hygienalia-madrid\">Hygienalia</a>, <a href=\"/ferias/stand-madrid-fusion\">Madrid Fusión</a> y <a href=\"/ferias/stand-intergift-madrid\">Intergift</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-fitur-madrid\">stands para FITUR</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en FITUR</a></p>"
    }
  },
  constructor_stand_fruit_attraction: {
    es: {
      breadcrumb: "Constructor de stands para Fruit Attraction",
      title: "Constructor de stands para Fruit Attraction (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Fruit Attraction, IFEMA Madrid",
      introText: "Construimos stands a medida para Fruit Attraction desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Fruit Attraction: qué exige esta feria</h2>\n        <p>Fruit Attraction reúne a productores, cooperativas y comercializadores de frutas y hortalizas de medio mundo ante compradores de la gran distribución. El producto fresco es el protagonista y tiene exigencias propias: vitrinas refrigeradas, luz que respete el color real de la fruta y espacio para que el comprador la toque y la pruebe.</p>\n        <p>Construimos stands con cámaras y expositores de frío integrados en la carpintería, zonas de degustación con agua y desagüe coordinados con IFEMA y salas de negociación donde se cierran las campañas de la temporada.</p>\n        <h2>Constructor de stands para Fruit Attraction: qué construimos</h2>\n        <ul>\n          <li><strong>Expositores de producto fresco.</strong> Vitrinas y cajones con frío integrado y luz fiel al color.</li>\n          <li><strong>Zona de degustación.</strong> Barra lavable con fregadero, frío y almacén de producto.</li>\n          <li><strong>Sala de negociación.</strong> Espacio cerrado para cerrar programas de campaña con la distribución.</li>\n        </ul>\n        <h2>Constructor de stands para Fruit Attraction: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-sicur-madrid\">SICUR</a>, <a href=\"/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a>, <a href=\"/ferias/stand-piscimad-madrid\">Piscimad</a> y <a href=\"/ferias/stand-momad-madrid\">MOMAD</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-fruit-attraction-madrid\">stands para Fruit Attraction</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Fruit Attraction</a></p>"
    }
  },
  constructor_stand_sicur: {
    es: {
      breadcrumb: "Constructor de stands para SICUR",
      title: "Constructor de stands para SICUR (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para SICUR, IFEMA Madrid",
      introText: "Construimos stands a medida para SICUR desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para SICUR: qué exige esta feria</h2>\n        <p>SICUR, el Salón Internacional de la Seguridad, ocupa cuatro pabellones de IFEMA con protección contra incendios, EPIs, seguridad electrónica, ciberseguridad y defensa. Muchos expositores muestran producto que se activa —cámaras, detectores, barreras, drones— y necesitan potencia, red y a veces espacios oscurecidos para las demostraciones.</p>\n        <p>Construimos con la instalación eléctrica y de datos resuelta en taller, salas de demostración cerradas con control de luz y mostradores técnicos donde el visitante puede manipular el equipo sin estorbar el paso.</p>\n        <h2>Constructor de stands para SICUR: qué construimos</h2>\n        <ul>\n          <li><strong>Salas de demostración oscurecidas.</strong> Para cámaras térmicas, videovigilancia y sistemas de detección.</li>\n          <li><strong>Bancos de producto conectado.</strong> Con potencia y red integradas bajo tarima.</li>\n          <li><strong>Stands para equipos de gran volumen.</strong> Suelo reforzado para barreras, vehículos y sistemas contra incendios.</li>\n        </ul>\n        <h2>Constructor de stands para SICUR: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-salon-look-madrid\">Salón Look</a>, <a href=\"/ferias/stand-hip-madrid\">HIP</a>, <a href=\"/ferias/stand-iberpet-madrid\">Iberpet</a> y <a href=\"/ferias/stand-madridjoya-madrid\">Madridjoya</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-sicur-madrid\">stands para SICUR</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en SICUR</a></p>"
    }
  },
  constructor_stand_salon_look: {
    es: {
      breadcrumb: "Constructor de stands para Salón Look",
      title: "Constructor de stands para Salón Look (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Salón Look, IFEMA Madrid",
      introText: "Construimos stands a medida para Salón Look desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Salón Look: qué exige esta feria</h2>\n        <p>Salón Look es la gran cita de la peluquería, la estética y el bienestar en IFEMA, con un público profesional que viene a ver producto, cursos en directo y marcas que presentan temporada. Es una feria muy visual y muy concurrida: los stands de peluquería trabajan en vivo sobre modelos y necesitan tocadores, lavacabezas y enchufes para cada puesto.</p>\n        <p>Construimos puestos de trabajo completos con agua y desagüe, escenarios para demostraciones y lineales de producto con iluminación que favorece el color de cabello y piel.</p>\n        <h2>Constructor de stands para Salón Look: qué construimos</h2>\n        <ul>\n          <li><strong>Puestos de trabajo en vivo.</strong> Tocadores con espejo, luz y tomas para secadores y planchas.</li>\n          <li><strong>Lavacabezas y zona húmeda.</strong> Con acometida de agua y desagüe coordinados con IFEMA.</li>\n          <li><strong>Escenario de demostración.</strong> Tarima, pantalla y gradas para las presentaciones de marca.</li>\n        </ul>\n        <h2>Constructor de stands para Salón Look: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-veteco-madrid\">Veteco</a>, <a href=\"/ferias/stand-meat-attraction-madrid\">Meat Attraction</a>, <a href=\"/ferias/stand-empack-madrid\">Empack</a> y <a href=\"/ferias/stand-bisutex-madrid\">Bisutex</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-salon-look-madrid\">stands para Salón Look</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Salón Look</a></p>"
    }
  },
  constructor_stand_veteco: {
    es: {
      breadcrumb: "Constructor de stands para Veteco",
      title: "Constructor de stands para Veteco (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Veteco, IFEMA Madrid",
      introText: "Construimos stands a medida para Veteco desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Veteco: qué exige esta feria</h2>\n        <p>Veteco es el salón de la ventana, el cerramiento acristalado y la protección solar: perfiles, vidrio, herrajes, persianas y automatismos. Lo que se expone pesa y se abre —ventanas completas, correderas, puertas de vidrio— y el visitante quiere accionarlo, así que el stand tiene que sostener carpinterías reales y dejar espacio para manipularlas.</p>\n        <p>Construimos paramentos portantes preparados para anclar ventanas y muros cortina, bancos de prueba para herrajes y zonas donde el prescriptor ve el sistema montado como en obra.</p>\n        <h2>Constructor de stands para Veteco: qué construimos</h2>\n        <ul>\n          <li><strong>Paramentos portantes.</strong> Estructura reforzada para colgar ventanas, puertas y fachadas.</li>\n          <li><strong>Bancos de herrajes.</strong> Expositores accionables a la altura de la mano.</li>\n          <li><strong>Maquetas de sistema.</strong> Cortes y secciones a escala real para prescriptores.</li>\n        </ul>\n        <h2>Constructor de stands para Veteco: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-hygienalia-madrid\">Hygienalia</a>, <a href=\"/ferias/stand-arcomadrid\">ARCOmadrid</a>, <a href=\"/ferias/stand-smart-doors-madrid\">SMART DOORS</a> y <a href=\"/ferias/stand-rebuild-madrid\">REBUILD</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-veteco-madrid\">stands para Veteco</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Veteco</a></p>"
    }
  },
  constructor_stand_hygienalia: {
    es: {
      breadcrumb: "Constructor de stands para Hygienalia",
      title: "Constructor de stands para Hygienalia (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Hygienalia, IFEMA Madrid",
      introText: "Construimos stands a medida para Hygienalia desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Hygienalia: qué exige esta feria</h2>\n        <p>Hygienalia reúne la limpieza profesional, la higiene y la lavandería industrial: fregadoras, barredoras, química, celulosa y lavadoras de gran capacidad. Muchos expositores demuestran la maquinaria en funcionamiento, sobre el propio suelo del stand, y eso condiciona la construcción más que en casi ninguna otra feria.</p>\n        <p>Construimos pistas de demostración con pavimentos preparados para mojarse y ensuciarse, acometidas de agua y potencia para lavadoras industriales y lineales para química y consumibles con almacén oculto.</p>\n        <h2>Constructor de stands para Hygienalia: qué construimos</h2>\n        <ul>\n          <li><strong>Pistas de demostración.</strong> Pavimento resistente al agua para fregadoras y barredoras en marcha.</li>\n          <li><strong>Zona de lavandería.</strong> Potencia y agua para equipos industriales funcionando.</li>\n          <li><strong>Lineales de química y celulosa.</strong> Estanterías con almacén y reposición durante la feria.</li>\n        </ul>\n        <h2>Constructor de stands para Hygienalia: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a>, <a href=\"/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a>, <a href=\"/ferias/stand-expomedes-madrid\">Expomedes</a> y <a href=\"/ferias/stand-expofranquicia-madrid\">Expofranquicia</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-hygienalia-madrid\">stands para Hygienalia</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Hygienalia</a></p>"
    }
  },
  constructor_stand_advanced_manufacturing: {
    es: {
      breadcrumb: "Constructor de stands para Advanced Manufacturing Madrid",
      title: "Constructor de stands para Advanced Manufacturing Madrid (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Advanced Manufacturing Madrid, IFEMA Madrid",
      introText: "Construimos stands a medida para Advanced Manufacturing Madrid desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Advanced Manufacturing Madrid: qué exige esta feria</h2>\n        <p>Advanced Manufacturing Madrid, heredera de MetalMadrid, es la gran feria anual de la industria manufacturera en IFEMA: máquina-herramienta, robótica, composites e impresión 3D. Aquí el stand tiene que alojar máquinas que pesan toneladas y robots que trabajan durante toda la feria, con seguridad para el visitante que se acerca a mirar.</p>\n        <p>Construimos plataformas calculadas para cada máquina, vallados y cerramientos de seguridad integrados en el diseño y zonas técnicas donde los ingenieros explican el proceso sin el ruido del pabellón.</p>\n        <h2>Constructor de stands para Advanced Manufacturing Madrid: qué construimos</h2>\n        <ul>\n          <li><strong>Plataformas para maquinaria.</strong> Suelo técnico calculado y paso de instalaciones bajo tarima.</li>\n          <li><strong>Células robóticas visibles.</strong> Cerramientos de seguridad transparentes integrados en el stand.</li>\n          <li><strong>Sala técnica.</strong> Espacio aislado para presentar procesos y casos de aplicación.</li>\n        </ul>\n        <h2>Constructor de stands para Advanced Manufacturing Madrid: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-hip-madrid\">HIP</a>, <a href=\"/ferias/stand-madrid-fusion\">Madrid Fusión</a>, <a href=\"/ferias/stand-madrid-tech-show\">Madrid Tech Show</a> y <a href=\"/ferias/stand-expodental-madrid\">Expodental</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-advanced-manufacturing-madrid\">stands para Advanced Manufacturing Madrid</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Advanced Manufacturing Madrid</a></p>"
    }
  },
  constructor_stand_hip: {
    es: {
      breadcrumb: "Constructor de stands para HIP",
      title: "Constructor de stands para HIP (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para HIP, IFEMA Madrid",
      introText: "Construimos stands a medida para HIP desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para HIP: qué exige esta feria</h2>\n        <p>HIP, Horeca Professional Expo, es el gran encuentro de innovación para la hostelería: equipamiento de cocina, foodservice, digitalización de sala y nuevos modelos de negocio, con cientos de ponentes en paralelo. El visitante es un hostelero que quiere ver el equipo funcionando y probar el producto en condiciones reales de servicio.</p>\n        <p>Construimos cocinas de demostración con extracción y potencia, barras de servicio completas y escenarios pequeños para las charlas que muchos expositores organizan dentro de su propio stand.</p>\n        <h2>Constructor de stands para HIP: qué construimos</h2>\n        <ul>\n          <li><strong>Cocinas de demostración.</strong> Con potencia, agua y extracción coordinadas con IFEMA.</li>\n          <li><strong>Barras de servicio.</strong> Barra real con frío, grifo y fregadero para servir producto.</li>\n          <li><strong>Mini escenario.</strong> Tarima y pantalla para charlas y lanzamientos.</li>\n        </ul>\n        <h2>Constructor de stands para HIP: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-meat-attraction-madrid\">Meat Attraction</a>, <a href=\"/ferias/stand-piscimad-madrid\">Piscimad</a>, <a href=\"/ferias/stand-the-district-madrid\">The District</a> y <a href=\"/ferias/stand-expooptica-madrid\">ExpoÓptica</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-hip-madrid\">stands para HIP</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en HIP</a></p>"
    }
  },
  constructor_stand_meat_attraction: {
    es: {
      breadcrumb: "Constructor de stands para Meat Attraction",
      title: "Constructor de stands para Meat Attraction (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Meat Attraction, IFEMA Madrid",
      introText: "Construimos stands a medida para Meat Attraction desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Meat Attraction: qué exige esta feria</h2>\n        <p>Meat Attraction es la feria del sector cárnico de IFEMA: industria, elaborados, frío y tecnología de toda la cadena de la carne, que se integra en la nueva plataforma agroalimentaria Anuga Select Ibérica. Exponer carne exige cadena de frío visible e higiene impecable, y los compradores llegan a probar y a negociar volúmenes.</p>\n        <p>Construimos vitrinas refrigeradas integradas, zonas de corte y degustación con superficies sanitarias y agua, y salas de reunión para la negociación con distribución e importadores.</p>\n        <h2>Constructor de stands para Meat Attraction: qué construimos</h2>\n        <ul>\n          <li><strong>Vitrinas de frío integradas.</strong> Carpintería con refrigeración y luz que respeta el producto.</li>\n          <li><strong>Zona de corte y degustación.</strong> Superficies sanitarias, agua y desagüe.</li>\n          <li><strong>Sala de negociación.</strong> Para distribución e importadores.</li>\n        </ul>\n        <h2>Constructor de stands para Meat Attraction: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-arcomadrid\">ARCOmadrid</a>, <a href=\"/ferias/stand-iberpet-madrid\">Iberpet</a>, <a href=\"/ferias/stand-intergift-madrid\">Intergift</a> y <a href=\"/ferias/stand-optom-madrid\">OPTOM</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-meat-attraction-madrid\">stands para Meat Attraction</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Meat Attraction</a></p>"
    }
  },
  constructor_stand_arcomadrid: {
    es: {
      breadcrumb: "Constructor de stands para ARCOmadrid",
      title: "Constructor de stands para ARCOmadrid (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para ARCOmadrid, IFEMA Madrid",
      introText: "Construimos stands a medida para ARCOmadrid desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para ARCOmadrid: qué exige esta feria</h2>\n        <p>ARCOmadrid es la feria de arte contemporáneo de referencia en España, con galerías de todo el mundo en los pabellones de IFEMA. Un stand de galería es una sala de exposición temporal: paredes perfectamente planas, blancas y sin juntas, capaces de sostener obra pesada, y una iluminación que no altere el color de la pieza.</p>\n        <p>Construimos paramentos de galería con refuerzos ocultos para colgar obra, techos técnicos para la iluminación museográfica y un pequeño almacén y despacho para la conversación con coleccionistas.</p>\n        <h2>Constructor de stands para ARCOmadrid: qué construimos</h2>\n        <ul>\n          <li><strong>Paramentos de galería.</strong> Paredes lisas y reforzadas para colgar obra de cualquier peso.</li>\n          <li><strong>Iluminación museográfica.</strong> Carriles y proyectores con reproducción cromática alta.</li>\n          <li><strong>Despacho y almacén.</strong> Espacio discreto para coleccionistas y obra en reserva.</li>\n        </ul>\n        <h2>Constructor de stands para ARCOmadrid: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a>, <a href=\"/ferias/stand-empack-madrid\">Empack</a>, <a href=\"/ferias/stand-momad-madrid\">MOMAD</a> y <a href=\"/ferias/stand-farmaforum-madrid\">Farmaforum</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-arcomadrid\">stands para ARCOmadrid</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en ARCOmadrid</a></p>"
    }
  },
  constructor_stand_salon_gourmets: {
    es: {
      breadcrumb: "Constructor de stands para Salón Gourmets",
      title: "Constructor de stands para Salón Gourmets (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Salón Gourmets, IFEMA Madrid",
      introText: "Construimos stands a medida para Salón Gourmets desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Salón Gourmets: qué exige esta feria</h2>\n        <p>Salón Gourmets es la feria de la alimentación y bebidas de calidad: conservas, quesos, embutidos, aceites, vinos y producto delicatessen de pequeños y medianos productores. El stand se vende por el producto, y el visitante —tiendas gourmet, hostelería, importadores— quiere probar antes de hablar.</p>\n        <p>Construimos lineales cuidados, barras de degustación con frío y agua y pequeñas trastiendas para el producto de reposición, con materiales cálidos que acompañan al producto de origen.</p>\n        <h2>Constructor de stands para Salón Gourmets: qué construimos</h2>\n        <ul>\n          <li><strong>Lineales de producto gourmet.</strong> Baldas iluminadas y frontales que presentan cada referencia.</li>\n          <li><strong>Barra de degustación.</strong> Frío, agua y superficie lavable para servir durante toda la feria.</li>\n          <li><strong>Trastienda.</strong> Almacén oculto para reposición y cajas.</li>\n        </ul>\n        <h2>Constructor de stands para Salón Gourmets: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-madrid-fusion\">Madrid Fusión</a>, <a href=\"/ferias/stand-smart-doors-madrid\">SMART DOORS</a>, <a href=\"/ferias/stand-madridjoya-madrid\">Madridjoya</a> y <a href=\"/ferias/stand-genera-madrid\">Genera</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-salon-gourmets-madrid\">stands para Salón Gourmets</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Salón Gourmets</a></p>"
    }
  },
  constructor_stand_madrid_fusion: {
    es: {
      breadcrumb: "Constructor de stands para Madrid Fusión",
      title: "Constructor de stands para Madrid Fusión (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Madrid Fusión, IFEMA Madrid",
      introText: "Construimos stands a medida para Madrid Fusión desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Madrid Fusión: qué exige esta feria</h2>\n        <p>Madrid Fusión es el congreso internacional de gastronomía: grandes cocineros en el auditorio y, alrededor, una exposición comercial de producto, equipamiento y regiones gastronómicas. El público es de cocina profesional y muy exigente con lo que prueba y con cómo se presenta.</p>\n        <p>Construimos stands de congreso compactos con cocina o barra de showcooking, extracción cuando se cocina en directo y acabados que están a la altura de un escaparate gastronómico.</p>\n        <h2>Constructor de stands para Madrid Fusión: qué construimos</h2>\n        <ul>\n          <li><strong>Showcooking.</strong> Cocina o placa con extracción, agua y potencia.</li>\n          <li><strong>Stand de región gastronómica.</strong> Imagen común con puestos para varios productores.</li>\n          <li><strong>Módulo de congreso.</strong> Stand compacto de alto acabado montado en pocas horas.</li>\n        </ul>\n        <h2>Constructor de stands para Madrid Fusión: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-piscimad-madrid\">Piscimad</a>, <a href=\"/ferias/stand-expomedes-madrid\">Expomedes</a>, <a href=\"/ferias/stand-bisutex-madrid\">Bisutex</a> y <a href=\"/ferias/stand-trafic-madrid\">TRAFIC</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-madrid-fusion\">stands para Madrid Fusión</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Madrid Fusión</a></p>"
    }
  },
  constructor_stand_piscimad: {
    es: {
      breadcrumb: "Constructor de stands para Piscimad",
      title: "Constructor de stands para Piscimad (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Piscimad, IFEMA Madrid",
      introText: "Construimos stands a medida para Piscimad desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Piscimad: qué exige esta feria</h2>\n        <p>Piscimad es el salón de la piscina, el wellness y las instalaciones acuáticas en IFEMA: vasos prefabricados, depuración, climatización, cubiertas, spas y saunas. Buena parte del producto es voluminoso o necesita agua para entenderse, y el visitante —instaladores, constructores y gestores de instalaciones deportivas— quiere ver cómo funciona.</p>\n        <p>Construimos stands con tarimas elevadas que alojan vasos y spas expuestos, cuartos técnicos visibles para enseñar la depuración y superficies que soportan humedad sin deformarse.</p>\n        <h2>Constructor de stands para Piscimad: qué construimos</h2>\n        <ul>\n          <li><strong>Tarima para vasos y spas.</strong> Plataforma elevada que integra la pieza y oculta conexiones.</li>\n          <li><strong>Cuarto técnico visible.</strong> La sala de máquinas montada tras vidrio para explicarla.</li>\n          <li><strong>Acabados resistentes a la humedad.</strong> Suelos y paramentos que no se deforman junto al agua.</li>\n        </ul>\n        <h2>Constructor de stands para Piscimad: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-iberpet-madrid\">Iberpet</a>, <a href=\"/ferias/stand-madrid-tech-show\">Madrid Tech Show</a>, <a href=\"/ferias/stand-rebuild-madrid\">REBUILD</a> y <a href=\"/ferias/stand-fiaa-madrid\">FIAA</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-piscimad-madrid\">stands para Piscimad</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Piscimad</a></p>"
    }
  },
  constructor_stand_iberpet: {
    es: {
      breadcrumb: "Constructor de stands para Iberpet",
      title: "Constructor de stands para Iberpet (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Iberpet, IFEMA Madrid",
      introText: "Construimos stands a medida para Iberpet desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Iberpet: qué exige esta feria</h2>\n        <p>Iberpet es la feria profesional del sector del animal de compañía: alimentación, accesorios, higiene, salud y servicios para tiendas especializadas y grandes cadenas. Es una feria de lineal y de marca, en la que el comprador de la tienda decide qué referencias entran la próxima temporada.</p>\n        <p>Construimos lineales que reproducen la tienda del cliente, mostradores de pedido con espacio para catálogos y muestras y zonas de marca donde el producto estrella se ve desde el pasillo.</p>\n        <h2>Constructor de stands para Iberpet: qué construimos</h2>\n        <ul>\n          <li><strong>Lineal de tienda.</strong> Estanterías a escala real para presentar la gama como en el punto de venta.</li>\n          <li><strong>Mostrador de pedidos.</strong> Superficie de trabajo con almacén de muestras y catálogos.</li>\n          <li><strong>Isla de lanzamiento.</strong> Expositor central para la novedad de la temporada.</li>\n        </ul>\n        <h2>Constructor de stands para Iberpet: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-empack-madrid\">Empack</a>, <a href=\"/ferias/stand-the-district-madrid\">The District</a>, <a href=\"/ferias/stand-expofranquicia-madrid\">Expofranquicia</a> y <a href=\"/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-iberpet-madrid\">stands para Iberpet</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Iberpet</a></p>"
    }
  },
  constructor_stand_empack: {
    es: {
      breadcrumb: "Constructor de stands para Empack",
      title: "Constructor de stands para Empack (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Empack, IFEMA Madrid",
      introText: "Construimos stands a medida para Empack desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Empack: qué exige esta feria</h2>\n        <p>Empack reúne en IFEMA el envase, el embalaje y las máquinas de envasado, junto con Logistics & Automation y Label&Print. El visitante es el responsable de producción o de compras que busca una solución concreta y quiere ver la línea funcionando o tocar el material.</p>\n        <p>Construimos stands con zonas de maquinaria en marcha, muestrarios de envase ordenados por material y aplicación y puntos de reunión donde el técnico comercial resuelve la consulta con el cliente.</p>\n        <h2>Constructor de stands para Empack: qué construimos</h2>\n        <ul>\n          <li><strong>Zona de máquina en funcionamiento.</strong> Potencia, aire comprimido y protección para demostraciones.</li>\n          <li><strong>Muestrario de envases.</strong> Vitrinas y baldas organizadas por material o sector.</li>\n          <li><strong>Mesa técnica.</strong> Punto de consulta con pantalla para fichas y casos.</li>\n        </ul>\n        <h2>Constructor de stands para Empack: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-smart-doors-madrid\">SMART DOORS</a>, <a href=\"/ferias/stand-intergift-madrid\">Intergift</a>, <a href=\"/ferias/stand-expodental-madrid\">Expodental</a> y <a href=\"/ferias/stand-motortec-madrid\">Motortec</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-empack-madrid\">stands para Empack</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Empack</a></p>"
    }
  },
  constructor_stand_smart_doors: {
    es: {
      breadcrumb: "Constructor de stands para SMART DOORS",
      title: "Constructor de stands para SMART DOORS (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para SMART DOORS, IFEMA Madrid",
      introText: "Construimos stands a medida para SMART DOORS desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para SMART DOORS: qué exige esta feria</h2>\n        <p>SMART DOORS es el salón de la puerta, el automatismo y el control de accesos: puertas automáticas, industriales, cortafuego, seccionales y cerraduras inteligentes. Lo que se expone se mueve, pesa y necesita un marco firme para funcionar delante del visitante.</p>\n        <p>Construimos muros y pórticos portantes preparados para instalar puertas reales, con la alimentación eléctrica y el cableado de control resueltos dentro de la estructura para que cada puerta abra y cierre durante toda la feria.</p>\n        <h2>Constructor de stands para SMART DOORS: qué construimos</h2>\n        <ul>\n          <li><strong>Pórticos portantes.</strong> Huecos reforzados para puertas automáticas, seccionales o cortafuego.</li>\n          <li><strong>Instalación oculta.</strong> Potencia y control integrados en la estructura.</li>\n          <li><strong>Panel de control de accesos.</strong> Muro de demostración para lectores, cerraduras y apps.</li>\n        </ul>\n        <h2>Constructor de stands para SMART DOORS: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-expomedes-madrid\">Expomedes</a>, <a href=\"/ferias/stand-momad-madrid\">MOMAD</a>, <a href=\"/ferias/stand-expooptica-madrid\">ExpoÓptica</a> y <a href=\"/ferias/stands-matelec-madrid\">MATELEC</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-smart-doors-madrid\">stands para SMART DOORS</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en SMART DOORS</a></p>"
    }
  },
  constructor_stand_expomedes: {
    es: {
      breadcrumb: "Constructor de stands para Expomedes",
      title: "Constructor de stands para Expomedes (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Expomedes, IFEMA Madrid",
      introText: "Construimos stands a medida para Expomedes desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Expomedes: qué exige esta feria</h2>\n        <p>Expomedes es la exposición de medicina estética que acompaña al congreso de la especialidad en Madrid: aparatología, inyectables, dermocosmética y láser para médicos y clínicas. El visitante es un profesional sanitario que quiere ver el equipo funcionando y comentar resultados con discreción.</p>\n        <p>Construimos stands de aspecto clínico y cuidado, con cabinas cerradas para demostraciones sobre paciente, iluminación neutra y mostradores donde el delegado presenta la evidencia del producto.</p>\n        <h2>Constructor de stands para Expomedes: qué construimos</h2>\n        <ul>\n          <li><strong>Cabina de demostración.</strong> Espacio cerrado con camilla, potencia y privacidad.</li>\n          <li><strong>Expositor de aparatología.</strong> Peanas y mostradores a medida para cada equipo.</li>\n          <li><strong>Zona de consulta.</strong> Mesa discreta para hablar con el médico.</li>\n        </ul>\n        <h2>Constructor de stands para Expomedes: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-madrid-tech-show\">Madrid Tech Show</a>, <a href=\"/ferias/stand-madridjoya-madrid\">Madridjoya</a>, <a href=\"/ferias/stand-optom-madrid\">OPTOM</a> y <a href=\"/ferias/stands-sima-madrid\">SIMA</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-expomedes-madrid\">stands para Expomedes</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Expomedes</a></p>"
    }
  },
  constructor_stand_madrid_tech_show: {
    es: {
      breadcrumb: "Constructor de stands para Madrid Tech Show",
      title: "Constructor de stands para Madrid Tech Show (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Madrid Tech Show, IFEMA Madrid",
      introText: "Construimos stands a medida para Madrid Tech Show desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Madrid Tech Show: qué exige esta feria</h2>\n        <p>Madrid Tech Show agrupa en IFEMA varias ferias de tecnología empresarial —cloud, ciberseguridad, datos, inteligencia artificial y DevOps— con cientos de charlas en paralelo. El producto es software: no hay nada que tocar, y el stand tiene que convertir una pantalla en una conversación con un posible cliente.</p>\n        <p>Construimos stands con puestos de demostración por pantalla, videowalls integrados en la estructura, pequeñas zonas de charla dentro del propio stand y red cableada para que las demos no dependan de la wifi del pabellón.</p>\n        <h2>Constructor de stands para Madrid Tech Show: qué construimos</h2>\n        <ul>\n          <li><strong>Puestos de demo.</strong> Mostradores altos con pantalla y conexión cableada.</li>\n          <li><strong>Videowall integrado.</strong> Pantalla de gran formato encastrada en la estructura.</li>\n          <li><strong>Rincón de charla.</strong> Pequeño aforo con pantalla para sesiones de 15 minutos.</li>\n        </ul>\n        <h2>Constructor de stands para Madrid Tech Show: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-the-district-madrid\">The District</a>, <a href=\"/ferias/stand-bisutex-madrid\">Bisutex</a>, <a href=\"/ferias/stand-farmaforum-madrid\">Farmaforum</a> y <a href=\"/ferias/stands-intersicop-madrid\">InterSICOP</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-madrid-tech-show\">stands para Madrid Tech Show</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Madrid Tech Show</a></p>"
    }
  },
  constructor_stand_the_district: {
    es: {
      breadcrumb: "Constructor de stands para The District",
      title: "Constructor de stands para The District (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para The District, IFEMA Madrid",
      introText: "Construimos stands a medida para The District desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para The District: qué exige esta feria</h2>\n        <p>The District es el encuentro europeo de la inversión inmobiliaria: fondos, promotoras, servicers, proptech y administraciones que buscan socios para sus proyectos. No se vende producto sino relaciones, y el stand es sobre todo un lugar para reunirse.</p>\n        <p>Construimos stands con salas de reunión cerradas, zona lounge para encuentros informales y superficie para maquetas o pantallas que expliquen los proyectos en cartera.</p>\n        <h2>Constructor de stands para The District: qué construimos</h2>\n        <ul>\n          <li><strong>Salas de reunión cerradas.</strong> Con aislamiento, mesa y pantalla para presentar operaciones.</li>\n          <li><strong>Lounge.</strong> Zona abierta para reuniones informales entre agendas.</li>\n          <li><strong>Espacio de maqueta.</strong> Peana iluminada para proyectos urbanísticos.</li>\n        </ul>\n        <h2>Constructor de stands para The District: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-intergift-madrid\">Intergift</a>, <a href=\"/ferias/stand-rebuild-madrid\">REBUILD</a>, <a href=\"/ferias/stand-genera-madrid\">Genera</a> y <a href=\"/ferias/stand-fitur-madrid\">FITUR</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-the-district-madrid\">stands para The District</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en The District</a></p>"
    }
  },
  constructor_stand_intergift: {
    es: {
      breadcrumb: "Constructor de stands para Intergift",
      title: "Constructor de stands para Intergift (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Intergift, IFEMA Madrid",
      introText: "Construimos stands a medida para Intergift desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Intergift: qué exige esta feria</h2>\n        <p>Intergift es el salón del regalo y la decoración de IFEMA, que se celebra junto a Bisutex y Madridjoya. Los compradores —tiendas de regalo, decoración y concept stores— recorren muchos stands y deciden por impacto visual, así que el stand funciona como un escaparate.</p>\n        <p>Construimos ambientes que muestran el producto como en tienda, con baldas y mesas a medida, iluminación cálida y un mostrador de pedidos donde se cierra la compra para la temporada.</p>\n        <h2>Constructor de stands para Intergift: qué construimos</h2>\n        <ul>\n          <li><strong>Ambientes de tienda.</strong> Paredes y mesas que presentan el producto por colecciones.</li>\n          <li><strong>Iluminación de escaparate.</strong> Luz cálida y focal que realza texturas y colores.</li>\n          <li><strong>Mostrador de pedidos.</strong> Para catálogos, tarifas y toma de pedido.</li>\n        </ul>\n        <h2>Constructor de stands para Intergift: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-momad-madrid\">MOMAD</a>, <a href=\"/ferias/stand-expofranquicia-madrid\">Expofranquicia</a>, <a href=\"/ferias/stand-trafic-madrid\">TRAFIC</a> y <a href=\"/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-intergift-madrid\">stands para Intergift</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Intergift</a></p>"
    }
  },
  constructor_stand_momad: {
    es: {
      breadcrumb: "Constructor de stands para MOMAD",
      title: "Constructor de stands para MOMAD (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para MOMAD, IFEMA Madrid",
      introText: "Construimos stands a medida para MOMAD desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para MOMAD: qué exige esta feria</h2>\n        <p>MOMAD es el salón internacional de moda, calzado y accesorios de IFEMA, donde marcas y fabricantes presentan colección a tiendas multimarca y compradores. Un stand de moda es un showroom: burros, probadores, espejos y una mesa donde revisar el muestrario.</p>\n        <p>Construimos showrooms efímeros con percheros y baldas integrados, probador, iluminación que respeta el color del tejido y fachada limpia que deja protagonismo a la colección.</p>\n        <h2>Constructor de stands para MOMAD: qué construimos</h2>\n        <ul>\n          <li><strong>Showroom de colección.</strong> Percheros, baldas y peanas integrados en la arquitectura.</li>\n          <li><strong>Probador y espejos.</strong> Espacio cerrado para probar prendas y calzado.</li>\n          <li><strong>Mesa de muestrario.</strong> Zona de trabajo con el comprador.</li>\n        </ul>\n        <h2>Constructor de stands para MOMAD: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-madridjoya-madrid\">Madridjoya</a>, <a href=\"/ferias/stand-expodental-madrid\">Expodental</a>, <a href=\"/ferias/stand-fiaa-madrid\">FIAA</a> y <a href=\"/ferias/stand-sicur-madrid\">SICUR</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-momad-madrid\">stands para MOMAD</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en MOMAD</a></p>"
    }
  },
  constructor_stand_madridjoya: {
    es: {
      breadcrumb: "Constructor de stands para Madridjoya",
      title: "Constructor de stands para Madridjoya (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Madridjoya, IFEMA Madrid",
      introText: "Construimos stands a medida para Madridjoya desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Madridjoya: qué exige esta feria</h2>\n        <p>Madridjoya es el salón de joyería, relojería y platería de IFEMA. El producto es pequeño, de alto valor y se vende de cerca, así que el stand depende de vitrinas seguras y de una luz que haga brillar la pieza sin reflejos.</p>\n        <p>Construimos vitrinas con cerradura e iluminación LED integrada, mostradores de atención sentada y un pequeño almacén cerrado para guardar la colección fuera de horario.</p>\n        <h2>Constructor de stands para Madridjoya: qué construimos</h2>\n        <ul>\n          <li><strong>Vitrinas de seguridad.</strong> Con cierre, vidrio y luz fría integrada.</li>\n          <li><strong>Mostrador de venta sentado.</strong> Para atender al comprador pieza a pieza.</li>\n          <li><strong>Almacén cerrado.</strong> Caja fuerte y guardado nocturno de la colección.</li>\n        </ul>\n        <h2>Constructor de stands para Madridjoya: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-bisutex-madrid\">Bisutex</a>, <a href=\"/ferias/stand-expooptica-madrid\">ExpoÓptica</a>, <a href=\"/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a> y <a href=\"/ferias/stand-salon-look-madrid\">Salón Look</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-madridjoya-madrid\">stands para Madridjoya</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Madridjoya</a></p>"
    }
  },
  constructor_stand_bisutex: {
    es: {
      breadcrumb: "Constructor de stands para Bisutex",
      title: "Constructor de stands para Bisutex (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Bisutex, IFEMA Madrid",
      introText: "Construimos stands a medida para Bisutex desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Bisutex: qué exige esta feria</h2>\n        <p>Bisutex es el salón de la bisutería y los complementos de moda en IFEMA, junto a Intergift y Madridjoya. Las marcas presentan cientos de referencias pequeñas que el comprador quiere ver ordenadas, tocar y pedir en el momento.</p>\n        <p>Construimos paneles expositores de alta densidad, mesas con bandejas para muestrario, espejos para probar y una iluminación que da brillo al metal y color a la pieza.</p>\n        <h2>Constructor de stands para Bisutex: qué construimos</h2>\n        <ul>\n          <li><strong>Paneles de alta densidad.</strong> Muros perforados o ranurados para cientos de referencias.</li>\n          <li><strong>Mesas de muestrario.</strong> Bandejas y espejos para que el comprador pruebe.</li>\n          <li><strong>Punto de pedido.</strong> Mostrador con tablet y catálogo.</li>\n        </ul>\n        <h2>Constructor de stands para Bisutex: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-rebuild-madrid\">REBUILD</a>, <a href=\"/ferias/stand-optom-madrid\">OPTOM</a>, <a href=\"/ferias/stand-motortec-madrid\">Motortec</a> y <a href=\"/ferias/stand-veteco-madrid\">Veteco</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-bisutex-madrid\">stands para Bisutex</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Bisutex</a></p>"
    }
  },
  constructor_stand_rebuild: {
    es: {
      breadcrumb: "Constructor de stands para REBUILD",
      title: "Constructor de stands para REBUILD (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para REBUILD, IFEMA Madrid",
      introText: "Construimos stands a medida para REBUILD desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para REBUILD: qué exige esta feria</h2>\n        <p>REBUILD es el evento de la edificación industrializada y sostenible: construcción modular, madera, fachadas, digitalización BIM y rehabilitación. El visitante es arquitecto, promotor o constructor y quiere ver sistemas constructivos reales, no solo renders.</p>\n        <p>Construimos stands que integran muestras a escala real —secciones de fachada, módulos, uniones— y zonas de presentación para el congreso paralelo, con materiales coherentes con el discurso de sostenibilidad del expositor.</p>\n        <h2>Constructor de stands para REBUILD: qué construimos</h2>\n        <ul>\n          <li><strong>Secciones constructivas reales.</strong> Muestras de fachada o módulo integradas en el stand.</li>\n          <li><strong>Pantallas BIM.</strong> Puestos para recorrer modelos digitales.</li>\n          <li><strong>Stand de materiales reutilizables.</strong> Estructura pensada para volver a montarse en otras ediciones.</li>\n        </ul>\n        <h2>Constructor de stands para REBUILD: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-expofranquicia-madrid\">Expofranquicia</a>, <a href=\"/ferias/stand-farmaforum-madrid\">Farmaforum</a>, <a href=\"/ferias/stands-matelec-madrid\">MATELEC</a> y <a href=\"/ferias/stand-hygienalia-madrid\">Hygienalia</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-rebuild-madrid\">stands para REBUILD</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en REBUILD</a></p>"
    }
  },
  constructor_stand_expofranquicia: {
    es: {
      breadcrumb: "Constructor de stands para Expofranquicia",
      title: "Constructor de stands para Expofranquicia (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Expofranquicia, IFEMA Madrid",
      introText: "Construimos stands a medida para Expofranquicia desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Expofranquicia: qué exige esta feria</h2>\n        <p>Expofranquicia es el salón de la franquicia de IFEMA, donde las cadenas buscan franquiciados e inversores. El visitante es un emprendedor que compara modelos de negocio, y el stand tiene que enseñar cómo es el local y dar un sitio tranquilo para hablar de cifras.</p>\n        <p>Construimos stands que reproducen en pequeño la imagen del local franquiciado —fachada, mostrador, materiales— y mesas de entrevista separadas del pasillo para las reuniones con candidatos.</p>\n        <h2>Constructor de stands para Expofranquicia: qué construimos</h2>\n        <ul>\n          <li><strong>Réplica del local.</strong> Fachada y mostrador con la imagen de la cadena.</li>\n          <li><strong>Mesas de entrevista.</strong> Puestos separados para hablar con candidatos.</li>\n          <li><strong>Muro de cifras.</strong> Gráfica con inversión, canon y apertura.</li>\n        </ul>\n        <h2>Constructor de stands para Expofranquicia: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-expodental-madrid\">Expodental</a>, <a href=\"/ferias/stand-genera-madrid\">Genera</a>, <a href=\"/ferias/stands-sima-madrid\">SIMA</a> y <a href=\"/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-expofranquicia-madrid\">stands para Expofranquicia</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Expofranquicia</a></p>"
    }
  },
  constructor_stand_expodental: {
    es: {
      breadcrumb: "Constructor de stands para Expodental",
      title: "Constructor de stands para Expodental (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Expodental, IFEMA Madrid",
      introText: "Construimos stands a medida para Expodental desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Expodental: qué exige esta feria</h2>\n        <p>Expodental es la gran feria del sector dental en España: sillones, imagen radiológica, implantología, CAD/CAM y consumibles para clínicas y laboratorios. Los fabricantes exponen equipos pesados que el odontólogo quiere probar sentado, con agua, aire y aspiración como en su gabinete.</p>\n        <p>Construimos gabinetes de demostración completos, con acometidas previstas bajo tarima, zonas de laboratorio para fresadoras e impresoras y espacios de formación donde se hacen talleres prácticos.</p>\n        <h2>Constructor de stands para Expodental: qué construimos</h2>\n        <ul>\n          <li><strong>Gabinete de demostración.</strong> Sillón con agua, aire y aspiración ocultos bajo tarima.</li>\n          <li><strong>Zona de laboratorio.</strong> Bancos para fresadoras, escáneres e impresoras 3D.</li>\n          <li><strong>Aula de taller.</strong> Puestos para formación práctica durante la feria.</li>\n        </ul>\n        <h2>Constructor de stands para Expodental: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-expooptica-madrid\">ExpoÓptica</a>, <a href=\"/ferias/stand-trafic-madrid\">TRAFIC</a>, <a href=\"/ferias/stands-intersicop-madrid\">InterSICOP</a> y <a href=\"/ferias/stand-hip-madrid\">HIP</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-expodental-madrid\">stands para Expodental</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Expodental</a></p>"
    }
  },
  constructor_stand_expooptica: {
    es: {
      breadcrumb: "Constructor de stands para ExpoÓptica",
      title: "Constructor de stands para ExpoÓptica (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para ExpoÓptica, IFEMA Madrid",
      introText: "Construimos stands a medida para ExpoÓptica desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para ExpoÓptica: qué exige esta feria</h2>\n        <p>ExpoÓptica es el salón de la óptica y la optometría de IFEMA: monturas, gafas de sol, lentes, lentes de contacto e instrumental. Para las marcas de monturas el stand es una boutique: cientos de gafas expuestas, espejos y mesas donde el óptico prueba y pide.</p>\n        <p>Construimos paredes expositoras de monturas con luz integrada, mesas de venta con espejo y cabinas para instrumental de gabinete, con una imagen de marca limpia y cercana a la de la tienda de óptica.</p>\n        <h2>Constructor de stands para ExpoÓptica: qué construimos</h2>\n        <ul>\n          <li><strong>Paredes de monturas.</strong> Expositores con varillas y luz integrada.</li>\n          <li><strong>Mesas de venta con espejo.</strong> Para prueba y toma de pedido.</li>\n          <li><strong>Cabina de instrumental.</strong> Espacio oscurecido para refractómetros y lámparas de hendidura.</li>\n        </ul>\n        <h2>Constructor de stands para ExpoÓptica: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-optom-madrid\">OPTOM</a>, <a href=\"/ferias/stand-fiaa-madrid\">FIAA</a>, <a href=\"/ferias/stand-fitur-madrid\">FITUR</a> y <a href=\"/ferias/stand-meat-attraction-madrid\">Meat Attraction</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-expooptica-madrid\">stands para ExpoÓptica</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en ExpoÓptica</a></p>"
    }
  },
  constructor_stand_optom: {
    es: {
      breadcrumb: "Constructor de stands para OPTOM",
      title: "Constructor de stands para OPTOM (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para OPTOM, IFEMA Madrid",
      introText: "Construimos stands a medida para OPTOM desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para OPTOM: qué exige esta feria</h2>\n        <p>OPTOM es el congreso internacional de optometría y contactología que se celebra en Madrid junto a ExpoÓptica, con una exposición técnica dirigida al óptico-optometrista clínico. Aquí se presentan equipos de diagnóstico, lentes especiales y soluciones de contactología con base científica.</p>\n        <p>Construimos stands de congreso de perfil técnico, con puestos de demostración de equipos, zonas para pósteres o evidencia clínica y un mostrador compacto que se monta en poco tiempo.</p>\n        <h2>Constructor de stands para OPTOM: qué construimos</h2>\n        <ul>\n          <li><strong>Puestos de diagnóstico.</strong> Mesas técnicas con potencia para equipos de exploración.</li>\n          <li><strong>Panel de evidencia.</strong> Gráfica con estudios y casos clínicos.</li>\n          <li><strong>Stand de congreso compacto.</strong> Montaje rápido en el espacio del congreso.</li>\n        </ul>\n        <h2>Constructor de stands para OPTOM: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-farmaforum-madrid\">Farmaforum</a>, <a href=\"/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a>, <a href=\"/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a> y <a href=\"/ferias/stand-arcomadrid\">ARCOmadrid</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-optom-madrid\">stands para OPTOM</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en OPTOM</a></p>"
    }
  },
  constructor_stand_farmaforum: {
    es: {
      breadcrumb: "Constructor de stands para Farmaforum",
      title: "Constructor de stands para Farmaforum (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Farmaforum, IFEMA Madrid",
      introText: "Construimos stands a medida para Farmaforum desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Farmaforum: qué exige esta feria</h2>\n        <p>Farmaforum es el foro de la industria farmacéutica, biotecnológica, cosmética y de laboratorio: procesos, salas blancas, equipos de laboratorio, envase farmacéutico y servicios regulatorios. El visitante es técnico y decide proveedores de producción y calidad.</p>\n        <p>Construimos stands de estética limpia y técnica, con mostradores para equipos de laboratorio, pantallas para explicar procesos validados y salas de reunión para las conversaciones con dirección de planta.</p>\n        <h2>Constructor de stands para Farmaforum: qué construimos</h2>\n        <ul>\n          <li><strong>Mostrador de laboratorio.</strong> Superficie técnica con potencia para equipos.</li>\n          <li><strong>Pantallas de proceso.</strong> Para recorrer líneas y validaciones.</li>\n          <li><strong>Sala de reunión.</strong> Espacio cerrado para dirección de planta y calidad.</li>\n        </ul>\n        <h2>Constructor de stands para Farmaforum: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-genera-madrid\">Genera</a>, <a href=\"/ferias/stand-motortec-madrid\">Motortec</a>, <a href=\"/ferias/stand-sicur-madrid\">SICUR</a> y <a href=\"/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-farmaforum-madrid\">stands para Farmaforum</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Farmaforum</a></p>"
    }
  },
  constructor_stand_genera: {
    es: {
      breadcrumb: "Constructor de stands para Genera",
      title: "Constructor de stands para Genera (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Genera, IFEMA Madrid",
      introText: "Construimos stands a medida para Genera desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Genera: qué exige esta feria</h2>\n        <p>Genera es la feria de la energía y la sostenibilidad de IFEMA: fotovoltaica, autoconsumo, almacenamiento, eficiencia, hidrógeno y movilidad eléctrica. Muchos expositores muestran inversores, baterías o estructuras solares reales que pesan y necesitan un soporte firme.</p>\n        <p>Construimos estructuras para montar módulos y soportes solares como en cubierta, bancos para inversores y baterías con su conexión simulada y stands que, por coherencia, se diseñan para reutilizarse.</p>\n        <h2>Constructor de stands para Genera: qué construimos</h2>\n        <ul>\n          <li><strong>Estructura solar demostrativa.</strong> Soportes con módulos reales a la inclinación de obra.</li>\n          <li><strong>Banco de equipos.</strong> Inversores y baterías conectados para enseñar el sistema.</li>\n          <li><strong>Stand reutilizable.</strong> Estructura modular preparada para varias ediciones.</li>\n        </ul>\n        <h2>Constructor de stands para Genera: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-trafic-madrid\">TRAFIC</a>, <a href=\"/ferias/stands-matelec-madrid\">MATELEC</a>, <a href=\"/ferias/stand-salon-look-madrid\">Salón Look</a> y <a href=\"/ferias/stand-madrid-fusion\">Madrid Fusión</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-genera-madrid\">stands para Genera</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Genera</a></p>"
    }
  },
  constructor_stand_trafic: {
    es: {
      breadcrumb: "Constructor de stands para TRAFIC",
      title: "Constructor de stands para TRAFIC (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para TRAFIC, IFEMA Madrid",
      introText: "Construimos stands a medida para TRAFIC desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para TRAFIC: qué exige esta feria</h2>\n        <p>TRAFIC es el salón de la movilidad segura y sostenible: señalización, gestión del tráfico, sistemas ITS, aparcamiento y equipamiento vial. El visitante procede de administraciones y concesionarias y quiere ver los sistemas funcionando sobre el terreno.</p>\n        <p>Construimos stands con espacio para paneles de mensaje variable, semáforos o barreras en funcionamiento, suelos que simulan calzada y salas de reunión para las conversaciones con administraciones.</p>\n        <h2>Constructor de stands para TRAFIC: qué construimos</h2>\n        <ul>\n          <li><strong>Tramo de calzada simulado.</strong> Suelo pintado con señalización para la demostración.</li>\n          <li><strong>Soportes para equipos viales.</strong> Paneles, semáforos y barreras con potencia.</li>\n          <li><strong>Sala de reunión.</strong> Para administraciones y concesionarias.</li>\n        </ul>\n        <h2>Constructor de stands para TRAFIC: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-fiaa-madrid\">FIAA</a>, <a href=\"/ferias/stands-sima-madrid\">SIMA</a>, <a href=\"/ferias/stand-veteco-madrid\">Veteco</a> y <a href=\"/ferias/stand-piscimad-madrid\">Piscimad</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-trafic-madrid\">stands para TRAFIC</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en TRAFIC</a></p>"
    }
  },
  constructor_stand_fiaa: {
    es: {
      breadcrumb: "Constructor de stands para FIAA",
      title: "Constructor de stands para FIAA (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para FIAA, IFEMA Madrid",
      introText: "Construimos stands a medida para FIAA desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para FIAA: qué exige esta feria</h2>\n        <p>FIAA es la Feria Internacional del Autobús y del Autocar, en IFEMA: fabricantes y carroceros exponen vehículos completos, junto a componentes, sistemas de pago y tecnología para operadores de transporte. El vehículo manda: todo el stand se organiza alrededor de autobuses de doce metros.</p>\n        <p>Construimos plataformas y rampas para subir a los vehículos, zonas de producto para componentes y un espacio de reunión con vista a la flota donde el operador negocia con el comercial.</p>\n        <h2>Constructor de stands para FIAA: qué construimos</h2>\n        <ul>\n          <li><strong>Plataformas y rampas de acceso.</strong> Para que el visitante entre en el vehículo.</li>\n          <li><strong>Expositores de componentes.</strong> Asientos, climatización y sistemas a bordo.</li>\n          <li><strong>Zona de reunión con vista a la flota.</strong> Para negociar con operadores.</li>\n        </ul>\n        <h2>Constructor de stands para FIAA: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a>, <a href=\"/ferias/stands-intersicop-madrid\">InterSICOP</a>, <a href=\"/ferias/stand-hygienalia-madrid\">Hygienalia</a> y <a href=\"/ferias/stand-iberpet-madrid\">Iberpet</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-fiaa-madrid\">stands para FIAA</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en FIAA</a></p>"
    }
  },
  constructor_stand_global_mobility_call: {
    es: {
      breadcrumb: "Constructor de stands para Global Mobility Call",
      title: "Constructor de stands para Global Mobility Call (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Global Mobility Call, IFEMA Madrid",
      introText: "Construimos stands a medida para Global Mobility Call desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Global Mobility Call: qué exige esta feria</h2>\n        <p>Global Mobility Call es el congreso y exposición sobre movilidad sostenible en IFEMA, con administraciones, operadores, fabricantes y startups de transporte urbano, electrificación y datos. Los stands mezclan institución y empresa y giran en torno a presentaciones y reuniones.</p>\n        <p>Construimos stands con pequeño escenario o zona de ponencias, espacio para vehículos ligeros —bicicletas, patinetes, cargadores— y áreas de reunión para encuentros entre administraciones y empresas.</p>\n        <h2>Constructor de stands para Global Mobility Call: qué construimos</h2>\n        <ul>\n          <li><strong>Zona de ponencias.</strong> Tarima, pantalla y asientos dentro del stand.</li>\n          <li><strong>Espacio para vehículos ligeros.</strong> Bicicletas, patinetes y puntos de carga.</li>\n          <li><strong>Área institucional.</strong> Reuniones entre administraciones y empresas.</li>\n        </ul>\n        <h2>Constructor de stands para Global Mobility Call: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-motortec-madrid\">Motortec</a>, <a href=\"/ferias/stand-fitur-madrid\">FITUR</a>, <a href=\"/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a> y <a href=\"/ferias/stand-empack-madrid\">Empack</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-global-mobility-call-madrid\">stands para Global Mobility Call</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Global Mobility Call</a></p>"
    }
  },
  constructor_stand_motortec: {
    es: {
      breadcrumb: "Constructor de stands para Motortec",
      title: "Constructor de stands para Motortec (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para Motortec, IFEMA Madrid",
      introText: "Construimos stands a medida para Motortec desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para Motortec: qué exige esta feria</h2>\n        <p>Motortec es la feria de la posventa de automoción en IFEMA: recambios, equipos de taller, diagnosis, neumáticos y lubricantes. El visitante es el taller y el distribuidor, que quiere ver el elevador, la máquina de diagnosis o la alineadora en funcionamiento.</p>\n        <p>Construimos stands tipo taller, con suelos preparados para elevadores y vehículos, acometidas para equipos y lineales de recambio organizados como en el almacén del distribuidor.</p>\n        <h2>Constructor de stands para Motortec: qué construimos</h2>\n        <ul>\n          <li><strong>Zona de taller.</strong> Suelo reforzado para elevadores y vehículos.</li>\n          <li><strong>Puestos de diagnosis.</strong> Bancos con potencia y pantalla.</li>\n          <li><strong>Lineal de recambios.</strong> Estanterías con la gama por familias.</li>\n        </ul>\n        <h2>Constructor de stands para Motortec: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stands-matelec-madrid\">MATELEC</a>, <a href=\"/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a>, <a href=\"/ferias/stand-hip-madrid\">HIP</a> y <a href=\"/ferias/stand-smart-doors-madrid\">SMART DOORS</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stand-motortec-madrid\">stands para Motortec</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en Motortec</a></p>"
    }
  },
  constructor_stand_matelec: {
    es: {
      breadcrumb: "Constructor de stands para MATELEC",
      title: "Constructor de stands para MATELEC (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para MATELEC, IFEMA Madrid",
      introText: "Construimos stands a medida para MATELEC desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para MATELEC: qué exige esta feria</h2>\n        <p>MATELEC es el salón del material eléctrico y electrónico: cable, iluminación, automatización, cuadros, recarga de vehículo eléctrico y domótica. El visitante es instalador o distribuidor, y quiere ver el producto conectado y funcionando.</p>\n        <p>Construimos paneles de demostración con la instalación real montada, zonas de iluminación en las que el visitante compara temperaturas y ópticas y mostradores técnicos con potencia para cada equipo.</p>\n        <h2>Constructor de stands para MATELEC: qué construimos</h2>\n        <ul>\n          <li><strong>Paneles de instalación.</strong> Cuadros y automatismos montados y funcionando.</li>\n          <li><strong>Sala de iluminación.</strong> Zona oscurecida para comparar luminarias.</li>\n          <li><strong>Puntos de recarga.</strong> Cargadores conectados para demostración.</li>\n        </ul>\n        <h2>Constructor de stands para MATELEC: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stands-sima-madrid\">SIMA</a>, <a href=\"/ferias/stand-sicur-madrid\">SICUR</a>, <a href=\"/ferias/stand-meat-attraction-madrid\">Meat Attraction</a> y <a href=\"/ferias/stand-expomedes-madrid\">Expomedes</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stands-matelec-madrid\">stands para MATELEC</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en MATELEC</a></p>"
    }
  },
  constructor_stand_sima: {
    es: {
      breadcrumb: "Constructor de stands para SIMA",
      title: "Constructor de stands para SIMA (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para SIMA, IFEMA Madrid",
      introText: "Construimos stands a medida para SIMA desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para SIMA: qué exige esta feria</h2>\n        <p>SIMA es el salón inmobiliario de Madrid, dirigido al comprador final de vivienda: promotoras, comercializadoras y entidades financieras presentan promociones y financiación. El visitante viene a comparar pisos, y el stand tiene que enseñar la promoción y atenderle sentado.</p>\n        <p>Construimos stands con maquetas iluminadas de las promociones, puestos de atención con mesa y sillas y pantallas para las infografías de cada vivienda, con una imagen de marca clara desde el pasillo.</p>\n        <h2>Constructor de stands para SIMA: qué construimos</h2>\n        <ul>\n          <li><strong>Peanas de maqueta.</strong> Con luz y protección para las promociones.</li>\n          <li><strong>Puestos de atención.</strong> Mesas para atender al comprador sentado.</li>\n          <li><strong>Pantallas de promoción.</strong> Infografías y recorridos virtuales.</li>\n        </ul>\n        <h2>Constructor de stands para SIMA: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stands-intersicop-madrid\">InterSICOP</a>, <a href=\"/ferias/stand-salon-look-madrid\">Salón Look</a>, <a href=\"/ferias/stand-arcomadrid\">ARCOmadrid</a> y <a href=\"/ferias/stand-madrid-tech-show\">Madrid Tech Show</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stands-sima-madrid\">stands para SIMA</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en SIMA</a></p>"
    }
  },
  constructor_stand_intersicop: {
    es: {
      breadcrumb: "Constructor de stands para InterSICOP",
      title: "Constructor de stands para InterSICOP (IFEMA Madrid) | Taller propio | Standarte",
      h1: "Constructor de stands para InterSICOP, IFEMA Madrid",
      introText: "Construimos stands a medida para InterSICOP desde nuestro taller de San Fernando de Henares, a unos 10 km de IFEMA: estructura, carpintería, mobiliario y gráfica fabricados y montados por nuestro propio equipo.",
      body: "\n        <h2>Constructor de stands para InterSICOP: qué exige esta feria</h2>\n        <p>InterSICOP es el salón de la panadería, pastelería, heladería y café de IFEMA: hornos, amasadoras, vitrinas, materias primas y producto. Los expositores hornean, montan y sirven durante la feria, y el stand tiene que funcionar como un obrador.</p>\n        <p>Construimos obradores de demostración con potencia trifásica, agua y extracción, mostradores de degustación con vitrinas frías y almacén para materias primas, coordinando las acometidas con IFEMA.</p>\n        <h2>Constructor de stands para InterSICOP: qué construimos</h2>\n        <ul>\n          <li><strong>Obrador de demostración.</strong> Potencia, agua y extracción para hornos y batidoras.</li>\n          <li><strong>Mostrador de degustación.</strong> Vitrina fría y superficie de servicio.</li>\n          <li><strong>Almacén de materias primas.</strong> Cerrado y fuera de la vista.</li>\n        </ul>\n        <h2>Constructor de stands para InterSICOP: y para el resto de IFEMA</h2>\n        <p>Desde el mismo taller construimos para otras ferias del recinto, como <a href=\"/ferias/stand-fitur-madrid\">FITUR</a>, <a href=\"/ferias/stand-veteco-madrid\">Veteco</a>, <a href=\"/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a> y <a href=\"/ferias/stand-the-district-madrid\">The District</a>. Las fechas de la próxima edición y el servicio completo de diseño y montaje están en la ficha de <a href=\"/ferias/stands-intersicop-madrid\">stands para InterSICOP</a>; el servicio para toda la plaza, en <a href=\"/diseno-construccion-montaje-stands-madrid\">diseño y montaje de stands en Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto para tu stand en InterSICOP</a></p>"
    }
  },
  constructor_stand_smopyc: {
    es: {
      breadcrumb: "Constructor de stands para SMOPYC",
      title: "Constructor de stands para SMOPYC (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para SMOPYC, Zaragoza",
      introText: "Construimos stands a medida para SMOPYC, el Salón Internacional de Maquinaria para Obras Públicas, Construcción y Minería de la Feria de Zaragoza, desde nuestro propio taller: estructura, suelos técnicos, carpintería, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción.",
      body: "\n        <h2>Constructor de stands para SMOPYC: qué exige construir junto a maquinaria de obra</h2>\n        <p>En SMOPYC el stand convive con excavadoras, grúas, plantas de machaqueo y camiones que entran al recinto por sus propios medios y pesan decenas de toneladas. El primer trabajo del constructor no es estético: es decidir dónde apoya cada máquina, qué parte del suelo se refuerza y por dónde pasan las acometidas eléctricas para que el equipo pueda arrancar en demostración sin cables a la vista.</p>\n        <p>El segundo condicionante es la escala. Frente a una máquina de seis metros de altura, un mostrador de catálogo desaparece. Construimos pórticos, torres de marca y gráfica de gran formato que se leen desde el pasillo opuesto del pabellón y, cuando la parcela es exterior, estructuras arriostradas para aguantar el viento del Cierzo durante los cinco días de feria.</p>\n        <h2>Constructor de stands para SMOPYC: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas reales de la parcela contratada —interior o exterior—, altura libre, accesos de carga y peso y radio de giro de las máquinas que vas a exponer.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Estructura, refuerzos de suelo, arriostramientos y despiece resueltos antes de cortar nada; recibes un prototipo fotorrealista que es exactamente lo que se va a construir.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, estructura metálica ligera, mobiliario y gráfica producidos por nuestro equipo, con control de calidad pieza a pieza.</li>\n          <li><strong>Premontaje y transporte.</strong> El stand se arma en taller antes de salir; los ajustes se hacen aquí, no a contrarreloj entre máquinas en el pabellón.</li>\n          <li><strong>Montaje coordinado con tu maquinaria.</strong> Nuestros montadores levantan el stand y secuencian la entrada de los equipos con el recinto, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos los elementos reutilizables: SMOPYC vuelve cada tres años y la estructura puede volver con él.</li>\n        </ol>\n        <h2>Constructor de stands para SMOPYC: qué construimos</h2>\n        <ul>\n          <li><strong>Stand para exposición de maquinaria.</strong> Plataformas y suelos técnicos calculados para la carga de cada equipo, con rampas de acceso y pasos de instalación previstos.</li>\n          <li><strong>Torre de marca y pórticos.</strong> Estructuras en altura, iluminadas, que sitúan la marca por encima de la máquina y se ven desde cualquier punto del pabellón.</li>\n          <li><strong>Sala de reuniones y oficina de obra.</strong> Espacio cerrado, con aislamiento acústico, para negociar flotas y financiación lejos del ruido de las demostraciones.</li>\n          <li><strong>Stand exterior.</strong> Estructura arriostrada, cubierta y cerramientos preparados para viento y lluvia en la explanada de la Feria de Zaragoza.</li>\n          <li><strong>Mobiliario y expositores de componentes.</strong> Soportes construidos para cazos, implementos y recambios, con almacén oculto para el material de campaña.</li>\n        </ul>\n        <h2>Constructor de stands para SMOPYC: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a>, <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a> y <a href=\"/ferias/stands-aratur-zaragoza\">Aratur</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-smopyc-zaragoza\">stands para SMOPYC</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para SMOPYC: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en SMOPYC</a></p>"
    }
  },
  constructor_stand_smagua: {
    es: {
      breadcrumb: "Constructor de stands para SMAGUA",
      title: "Constructor de stands para SMAGUA (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para SMAGUA, Zaragoza",
      introText: "Construimos stands a medida para SMAGUA, el Salón Internacional del Agua y el Medio Ambiente de la Feria de Zaragoza, desde nuestro propio taller: estructura, carpintería, instalaciones hidráulicas de demostración, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para SMAGUA: qué exige construir para el sector del agua</h2>\n        <p>En SMAGUA se exponen bombas, válvulas, membranas de desalación, depuradoras compactas y sistemas de canalización, y muchos expositores quieren enseñarlos funcionando. Eso convierte al constructor en instalador: hay que prever acometida y desagüe con el recinto, circuitos cerrados con depósito oculto, bandejas estancas bajo el equipo y suelos que no se estropeen con una salpicadura el segundo día.</p>\n        <p>El otro rasgo de la feria es su carácter institucional: administraciones, ingenierías y gestoras de agua pasan por los stands en visitas concertadas. Por eso diseñamos áreas de reunión de verdad —mesa, asientos, pantalla— y no un taburete alto junto al mostrador, y dejamos la exposición técnica para el frente del stand.</p>\n        <h2>Constructor de stands para SMAGUA: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio contratado en la Feria de Zaragoza, altura libre, puntos de agua y desagüe disponibles y equipos que se van a mostrar en marcha.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Estructura, circuito hidráulico de demostración, instalación eléctrica y despiece resueltos sobre el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería a medida, bancadas para los equipos, mobiliario y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje con prueba de estanqueidad.</strong> Los circuitos se prueban en taller; en el pabellón solo se conectan.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos lo reutilizable para la siguiente edición bienal.</li>\n        </ol>\n        <h2>Constructor de stands para SMAGUA: qué construimos</h2>\n        <ul>\n          <li><strong>Stand con demostración hidráulica.</strong> Circuito cerrado con depósito oculto, bandeja estanca y suelo técnico registrable para enseñar el equipo funcionando.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos a medida con acabados lacados, chapados o textiles, y gráfica retroiluminada.</li>\n          <li><strong>Área de reuniones institucionales.</strong> Sala cerrada o semicerrada con pantalla, pensada para presentaciones a administraciones y concesionarias.</li>\n          <li><strong>Expositores de válvulas, tubería y membranas.</strong> Soportes construidos para el producto real, con iluminación puntual y almacén oculto.</li>\n        </ul>\n        <h2>Constructor de stands para SMAGUA: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a>, <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a> y <a href=\"/ferias/stands-aratur-zaragoza\">Aratur</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-smagua-zaragoza\">stands para SMAGUA</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para SMAGUA: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en SMAGUA</a></p>"
    }
  },
  constructor_stand_aratur: {
    es: {
      breadcrumb: "Constructor de stands para Aratur",
      title: "Constructor de stands para Aratur (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para Aratur, Zaragoza",
      introText: "Construimos stands a medida para Aratur, el Salón Aragonés del Turismo de la Feria de Zaragoza, desde nuestro propio taller: escenografía de destino, mostradores de información, zonas de degustación y gráfica de gran formato fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para Aratur: qué exige construir para una feria de gran público</h2>\n        <p>Aratur mezcla al profesional del sector con miles de visitantes que vienen a elegir sus próximas vacaciones. Un stand de destino tiene que contar un lugar en tres segundos —un paisaje, una textura, un olor— y aguantar tres días de familias, folletos y colas ante el mostrador. Construimos escenografía sólida, no decorado: cantos protegidos, suelos que resisten miles de pisadas y gráfica a la altura a la que se mira de pie.</p>\n        <p>Los destinos suelen compartir stand con sus empresas —alojamientos, bodegas, agencias— y cada una necesita su rincón sin romper la imagen común. Resolvemos esa modularidad en carpintería: mostradores individuales, almacén compartido y una zona de degustación o de actividades en el centro que atrae público al conjunto.</p>\n        <h2>Constructor de stands para Aratur: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, número de coexpositores, necesidades de degustación y previsión de público en horas punta.</li>\n          <li><strong>Diseño y prototipo 3D.</strong> Escenografía, reparto de mostradores, circulación y gráfica resueltos en un prototipo fotorrealista que es lo que se va a construir.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, mostradores, elementos escenográficos y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir para que en el pabellón no haya sorpresas.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Aratur es anual: guardamos la escenografía reutilizable y renovamos solo la campaña.</li>\n        </ol>\n        <h2>Constructor de stands para Aratur: qué construimos</h2>\n        <ul>\n          <li><strong>Stand de destino con escenografía.</strong> Volúmenes, texturas y gran formato que reproducen el lugar, con iluminación escénica.</li>\n          <li><strong>Stand compartido para destino y empresas.</strong> Mostradores individuales bajo una imagen común, con almacén compartido y señalética clara.</li>\n          <li><strong>Zona de degustación y actividades.</strong> Barra con fregadero y frío, escenario pequeño o rincón de talleres para atraer público.</li>\n          <li><strong>Mostradores de información.</strong> Construidos a medida, con expositor de folletos integrado y espacio de trabajo para el personal.</li>\n        </ul>\n        <h2>Constructor de stands para Aratur: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-aratur-zaragoza\">stands para Aratur</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para Aratur: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en Aratur</a></p>"
    }
  },
  constructor_stand_expofimer: {
    es: {
      breadcrumb: "Constructor de stands para EXPOFIMER",
      title: "Constructor de stands para EXPOFIMER (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para EXPOFIMER, Zaragoza",
      introText: "Construimos stands a medida para EXPOFIMER, la Feria Internacional de Mantenimiento de Energías Renovables de la Feria de Zaragoza, desde nuestro propio taller: estructura, carpintería, soportes para módulos y componentes, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para EXPOFIMER: qué exige construir para el mantenimiento renovable</h2>\n        <p>EXPOFIMER es una feria de técnicos: empresas mantenedoras, fabricantes de componentes, drones de inspección e instrumentación. Lo que se enseña es pequeño y preciso —un inversor abierto, una cámara termográfica, un tramo de pala— y el stand tiene que ponerlo a la altura de las manos, bien iluminado y con la toma de corriente donde hace falta, no donde quedó el enchufe del recinto.</p>\n        <p>Es también una feria de dos días con agenda apretada de reuniones. Por eso el frente del stand se resuelve como banco de demostración y el fondo como zona de conversación con asiento, mesa y almacenaje para muestras y documentación técnica, todo construido en carpintería para que no parezca una oficina prestada.</p>\n        <h2>Constructor de stands para EXPOFIMER: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, potencia necesaria para los equipos en demostración y piezas que vas a exponer.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Bancos de demostración, soportes, instalación eléctrica y despiece resueltos en el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, soportes de componentes, mobiliario y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje.</strong> Todo se arma y se cablea en taller; en el pabellón solo se conecta.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> EXPOFIMER es anual: guardamos la estructura y renovamos solo la gráfica.</li>\n        </ol>\n        <h2>Constructor de stands para EXPOFIMER: qué construimos</h2>\n        <ul>\n          <li><strong>Banco de demostración técnica.</strong> Superficie a altura de trabajo, iluminación puntual y tomas integradas para inversores, sensores y herramientas.</li>\n          <li><strong>Soportes para módulos, palas y componentes.</strong> Estructuras construidas para la pieza real, con su peso y su ángulo de exposición.</li>\n          <li><strong>Zona de reuniones.</strong> Espacio con mesa y asientos, almacén oculto y pantalla para presentar informes y planes de mantenimiento.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y gráfica retroiluminada con acabados lacados o textiles.</li>\n        </ul>\n        <h2>Constructor de stands para EXPOFIMER: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-expofimer-zaragoza\">stands para EXPOFIMER</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para EXPOFIMER: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en EXPOFIMER</a></p>"
    }
  },
  constructor_stand_spaper: {
    es: {
      breadcrumb: "Constructor de stands para SPAPER",
      title: "Constructor de stands para SPAPER (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para SPAPER, Zaragoza",
      introText: "Construimos stands a medida para SPAPER, el Salón Internacional de la Maquinaria y Equipos para la Celulosa, el Papel y el Cartón de la Feria de Zaragoza, desde nuestro propio taller: estructura, carpintería, soportes de muestras, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para SPAPER: qué exige construir para la industria papelera</h2>\n        <p>SPAPER reúne a fabricantes de maquinaria, telas, fieltros, rodillos, sistemas de control y químicos para plantas de celulosa, papel, tisú y cartón. Buena parte de lo que se expone son piezas de proceso —un tramo de tela de formación, un rodillo, una sección de cabezal— que solo se entienden bien montadas a su escala y con la luz adecuada. Construimos soportes específicos para cada muestra y dejamos el resto del stand limpio para la conversación técnica.</p>\n        <p>La feria comparte fechas con SMAGUA en el mismo recinto, y eso llena de gente los pasillos y de camiones los muelles de carga. Planificar el montaje con antelación —ventana de descarga, secuencia de entrada, prefabricación completa— es lo que evita que un stand técnico llegue a la inauguración con la gráfica sin colocar.</p>\n        <h2>Constructor de stands para SPAPER: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, muestras y equipos que vas a exponer, y potencia necesaria si alguno funciona en demostración.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Estructura, soportes de muestras, iluminación y despiece resueltos en el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, soportes, mobiliario y gráfica producidos por nuestro equipo con control pieza a pieza.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir; los ajustes se hacen aquí.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand en la ventana de descarga reservada, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Retiramos el stand al cierre y guardamos lo reutilizable para la siguiente edición bienal.</li>\n        </ol>\n        <h2>Constructor de stands para SPAPER: qué construimos</h2>\n        <ul>\n          <li><strong>Soportes de muestras industriales.</strong> Bastidores para telas, fieltros, rodillos y secciones de máquina, construidos para el tamaño y el peso de la pieza real.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos a medida con gráfica retroiluminada y acabados lacados o chapados.</li>\n          <li><strong>Zona de reuniones técnicas.</strong> Espacio semicerrado con mesa, pantalla y almacén oculto para catálogos y muestras pequeñas.</li>\n          <li><strong>Mostrador y barra de atención.</strong> Construidos a medida, con frío y espacio de trabajo integrados cuando la agenda de visitas lo pide.</li>\n        </ul>\n        <h2>Constructor de stands para SPAPER: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-spaper-zaragoza\">stands para SPAPER</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para SPAPER: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en SPAPER</a></p>"
    }
  },
  constructor_stand_fima: {
    es: {
      breadcrumb: "Constructor de stands para FIMA",
      title: "Constructor de stands para FIMA (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para FIMA, Zaragoza",
      introText: "Construimos stands a medida para FIMA, la Feria Internacional de Maquinaria Agrícola de la Feria de Zaragoza, desde nuestro propio taller: estructura, suelos técnicos, torres de marca, carpintería, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción.",
      body: "\n        <h2>Constructor de stands para FIMA: qué exige construir en la mayor feria agrícola del país</h2>\n        <p>FIMA ocupa la Feria de Zaragoza entera con tractores, cosechadoras, aperos y sistemas de riego que llegan en góndola y se colocan con grúa. El constructor trabaja a dos escalas a la vez: la del suelo, que hay que calcular y reforzar para cada máquina, y la del pabellón, donde la marca tiene que verse por encima de una cosechadora de cuatro metros. Torres, pórticos y gráfica de gran formato no son adorno aquí: son la única forma de existir.</p>\n        <p>Es además una feria larga, de cinco días y decenas de miles de visitantes profesionales que se sientan a negociar. Los stands que funcionan en FIMA tienen una planta baja de exposición despejada y una zona de hospitalidad seria —a veces en doble altura— con barra, mesas y almacén, construida para aguantar el trasiego entero sin perder el acabado.</p>\n        <h2>Constructor de stands para FIMA: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas reales de la parcela, altura libre del pabellón, accesos de grúa y peso y dimensiones de cada máquina que vas a exponer.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Cálculo de suelos y estructuras en altura, instalaciones y despiece; recibes un prototipo fotorrealista que es exactamente lo que se va a construir.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, estructura, mobiliario de hospitalidad y gráfica producidos por nuestro equipo con control pieza a pieza.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir: los ajustes se hacen aquí y no entre góndolas en el pabellón.</li>\n          <li><strong>Montaje coordinado con la maquinaria.</strong> Nuestros montadores levantan la estructura, dejan paso a la grúa y cierran el stand alrededor de las máquinas, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> FIMA es bienal: guardamos la estructura reutilizable y renovamos solo la gráfica en la siguiente edición.</li>\n        </ol>\n        <h2>Constructor de stands para FIMA: qué construimos</h2>\n        <ul>\n          <li><strong>Stand de gran superficie con maquinaria.</strong> Suelo técnico calculado, plataformas de exposición y pasos de instalación previstos para cada equipo.</li>\n          <li><strong>Torre de marca y pórticos.</strong> Estructuras iluminadas en altura para que la marca se lea por encima de las máquinas desde todo el pabellón.</li>\n          <li><strong>Stand de doble altura.</strong> Cálculo estructural, escalera y sala de reuniones o terraza de hospitalidad arriba, sin gastar metros de exposición.</li>\n          <li><strong>Zona de hospitalidad.</strong> Barra con frío y fregadero, mesas, cocina de apoyo y almacén construidos para cinco días de visitas.</li>\n          <li><strong>Expositores de implementos y recambios.</strong> Soportes construidos para el producto real, con iluminación puntual.</li>\n        </ul>\n        <h2>Constructor de stands para FIMA: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a>, <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a> y <a href=\"/ferias/stands-aratur-zaragoza\">Aratur</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-fima-zaragoza\">stands para FIMA</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para FIMA: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en FIMA</a></p>"
    }
  },
  constructor_stand_enomaq: {
    es: {
      breadcrumb: "Constructor de stands para Enomaq",
      title: "Constructor de stands para Enomaq (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para Enomaq, Zaragoza",
      introText: "Construimos stands a medida para Enomaq, el Salón Internacional de Maquinaria y Equipos para Bodegas y del Embotellado de la Feria de Zaragoza, desde nuestro propio taller: bancadas para maquinaria, suelos técnicos, carpintería, zona de cata, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para Enomaq: qué exige construir para la maquinaria de bodega</h2>\n        <p>En Enomaq se exponen prensas, despalilladoras, depósitos de acero inoxidable, líneas de embotellado y etiquetadoras que muchos fabricantes quieren enseñar en marcha. El constructor tiene que resolver antes que nada lo invisible: peso concentrado de un depósito lleno, acometidas de agua y aire comprimido, desagües y una instalación eléctrica capaz de arrancar una línea sin apagar la iluminación del stand.</p>\n        <p>El segundo rasgo es el visitante: enólogos y responsables de producción que se quedan a hablar de rendimientos y a probar el vino del cliente. Por eso construimos una zona de cata y reunión con encimera lavable, frío y almacén de botellas, separada del ruido de la maquinaria pero visible desde el pasillo.</p>\n        <h2>Constructor de stands para Enomaq: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, equipos que van a funcionar en demostración, sus pesos y las acometidas de agua, aire y potencia que necesitan.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Bancadas, suelo técnico, instalaciones y despiece resueltos sobre el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, bancadas, mobiliario de cata y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir; en el pabellón solo se conectan las máquinas.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand y coordinan la entrada de tu maquinaria, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Enomaq es bienal: guardamos la estructura y el mobiliario reutilizables para la siguiente edición.</li>\n        </ol>\n        <h2>Constructor de stands para Enomaq: qué construimos</h2>\n        <ul>\n          <li><strong>Stand con maquinaria en funcionamiento.</strong> Bancadas y suelo técnico calculados, con agua, aire y potencia llevados al punto exacto de cada equipo.</li>\n          <li><strong>Zona de cata y reunión.</strong> Barra lavable con frío y fregadero, mesas altas y almacén de botellas, aislada del ruido y visible desde el pasillo.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos a medida, madera vista o lacada, con gráfica retroiluminada.</li>\n          <li><strong>Expositores de componentes.</strong> Soportes para válvulas, grifería, tapones y etiquetas, con iluminación puntual y almacén oculto.</li>\n        </ul>\n        <h2>Constructor de stands para Enomaq: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-aratur-zaragoza\">Aratur</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-enomaq-zaragoza\">stands para Enomaq</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para Enomaq: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en Enomaq</a></p>"
    }
  },
  constructor_stand_oleomaq: {
    es: {
      breadcrumb: "Constructor de stands para Oleomaq",
      title: "Constructor de stands para Oleomaq (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para Oleomaq, Zaragoza",
      introText: "Construimos stands a medida para Oleomaq, el salón de maquinaria y equipos para almazaras de la Feria de Zaragoza, desde nuestro propio taller: bancadas para líneas de molturación, suelos técnicos, carpintería, zona de cata de aceite, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para Oleomaq: qué exige construir para la almazara</h2>\n        <p>Oleomaq se celebra junto a Enomaq y expone molinos, batidoras, decánters, depósitos y líneas de envasado de aceite, además de laboratorio y control de calidad. Una línea de almazara ocupa metros lineales y pesa, y muchos fabricantes la quieren enseñar girando: el constructor calcula el suelo, lleva agua y potencia trifásica al punto exacto y deja los desagües previstos para que la demostración no acabe en charco.</p>\n        <p>El público son almazaras y cooperativas que deciden inversiones de campaña. El stand funciona cuando la máquina se ve desde el pasillo y, dos pasos más adentro, hay una mesa de cata de aceite con luz neutra, copas y una conversación tranquila. Construimos las dos cosas en carpintería y las separamos con un almacén que además absorbe el ruido.</p>\n        <h2>Constructor de stands para Oleomaq: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, tramo de línea o equipos que vas a exponer, pesos y acometidas necesarias.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Bancadas, suelo técnico, instalaciones y despiece resueltos en el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, bancadas, mesa de cata, mobiliario y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir; los ajustes se hacen aquí.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand y coordinan la entrada de la maquinaria, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Oleomaq es bienal: guardamos lo reutilizable para la siguiente edición.</li>\n        </ol>\n        <h2>Constructor de stands para Oleomaq: qué construimos</h2>\n        <ul>\n          <li><strong>Stand con línea de almazara en demostración.</strong> Bancadas y suelo técnico calculados, agua, potencia y desagües en su sitio.</li>\n          <li><strong>Mesa de cata de aceite.</strong> Encimera lavable con luz neutra, almacén de muestras y frío para las copas, separada del ruido.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Madera vista o lacada, gráfica retroiluminada y mobiliario construido a medida.</li>\n          <li><strong>Zona de reuniones.</strong> Espacio semicerrado con mesa y pantalla para hablar de capacidades y plazos de campaña.</li>\n        </ul>\n        <h2>Constructor de stands para Oleomaq: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-oleomaq-zaragoza\">stands para Oleomaq</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para Oleomaq: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en Oleomaq</a></p>"
    }
  },
  constructor_stand_tecnovid: {
    es: {
      breadcrumb: "Constructor de stands para Tecnovid",
      title: "Constructor de stands para Tecnovid (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para Tecnovid, Zaragoza",
      introText: "Construimos stands a medida para Tecnovid, el Salón Internacional de Técnicas y Equipos para la Viticultura de la Feria de Zaragoza, desde nuestro propio taller: plataformas para maquinaria de viñedo, carpintería, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción.",
      body: "\n        <h2>Constructor de stands para Tecnovid: qué exige construir para la maquinaria de viñedo</h2>\n        <p>Tecnovid se celebra junto a Enomaq y Oleomaq y expone tractores estrechos, vendimiadoras, prepodadoras, atomizadores y remolques de uva: máquinas de campo que entran rodando al pabellón y se colocan al milímetro. El constructor tiene que dejarles sitio y suelo —plataformas bajas que las elevan del pavimento y protegen el pabellón— y construir alrededor sin tapar la máquina, que es la protagonista.</p>\n        <p>El visitante es el viticultor y el técnico de bodega, gente que mira la máquina por debajo y pregunta por el ancho de vía. Por eso construimos plataformas accesibles por los cuatro lados, gráfica técnica a la altura de los ojos y una zona de conversación con asiento y una copa del vino de la casa, porque en Zaragoza las ventas de maquinaria se cierran hablando.</p>\n        <h2>Constructor de stands para Tecnovid: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio en la Feria de Zaragoza, dimensiones y peso de cada máquina y el recorrido de entrada rodando hasta su posición.</li>\n          <li><strong>Ingeniería y prototipo 3D.</strong> Plataformas, rampas, estructura e iluminación resueltas en el prototipo fotorrealista que apruebas.</li>\n          <li><strong>Fabricación en taller propio.</strong> Plataformas, carpintería, mobiliario y gráfica producidos por nuestro equipo con control pieza a pieza.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir; los ajustes se hacen aquí.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand, reciben las máquinas y cierran el conjunto, con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> Tecnovid es bienal: guardamos plataformas y estructura para la siguiente edición.</li>\n        </ol>\n        <h2>Constructor de stands para Tecnovid: qué construimos</h2>\n        <ul>\n          <li><strong>Plataformas de exposición de maquinaria.</strong> Tarimas bajas calculadas para el peso del equipo, con rampa de entrada y perímetro iluminado.</li>\n          <li><strong>Stand de diseño libre en carpintería.</strong> Estructura y paramentos a medida, gráfica técnica de gran formato y acabados en madera o lacados.</li>\n          <li><strong>Zona de conversación y cata.</strong> Barra con frío, mesas altas y almacén de botellas, separada del flujo de visitantes de la máquina.</li>\n          <li><strong>Expositores de implementos y recambios.</strong> Soportes construidos para cabezales, cuchillas y boquillas, con iluminación puntual.</li>\n        </ul>\n        <h2>Constructor de stands para Tecnovid: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-tecnovid-zaragoza\">stands para Tecnovid</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para Tecnovid: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en Tecnovid</a></p>"
    }
  },
  constructor_stand_salon_vinos_aragon: {
    es: {
      breadcrumb: "Constructor de stands para el Salón de los Vinos de Aragón",
      title: "Constructor de stands para el Salón de los Vinos de Aragón (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para el Salón de los Vinos de Aragón, Zaragoza",
      introText: "Construimos stands a medida para el Salón de los Vinos de Aragón, la cita anual de las bodegas de Cariñena, Somontano, Campo de Borja y Calatayud en Zaragoza, desde nuestro propio taller: barras de cata, botelleros, carpintería, mobiliario y gráfica fabricados por nuestro equipo.",
      body: "\n        <h2>Constructor de stands para el Salón de los Vinos de Aragón: qué exige construir para una feria de cata</h2>\n        <p>En un salón de vinos el stand es, ante todo, una barra: metros lineales de encimera lavable, frío para los blancos, fregadero para las copas y botelleros a mano. Construimos esa barra a medida para el número de referencias y de personas que atienden, con un almacén cerrado detrás para cajas y material, porque una bodega que expone diez etiquetas necesita sitio para cien botellas que nadie debe ver.</p>\n        <p>El segundo condicionante es la identidad: en un pasillo con treinta bodegas, la que se distingue es la que trae su paisaje —la piedra del Somontano, la garnacha vieja de Cariñena— traducido a materiales y luz. Trabajamos madera vista, texturas y gráfica retroiluminada para que la marca se lea desde lejos y la conversación ocurra de cerca, con público profesional por la mañana y aficionados por la tarde.</p>\n        <h2>Constructor de stands para el Salón de los Vinos de Aragón: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio, referencias que se sirven, personas en barra y previsión de público en las horas de cata abierta.</li>\n          <li><strong>Diseño y prototipo 3D.</strong> Barra, botelleros, almacén e iluminación resueltos en un prototipo fotorrealista que es exactamente lo que se va a construir.</li>\n          <li><strong>Fabricación en taller propio.</strong> Barra con fregadero y frío, botelleros, mobiliario y gráfica producidos por nuestro equipo.</li>\n          <li><strong>Premontaje.</strong> El stand se arma en taller antes de salir; los ajustes se hacen aquí.</li>\n          <li><strong>Transporte y montaje.</strong> Nuestros propios montadores levantan el stand con la prefabricación terminada 24&nbsp;h antes de la apertura.</li>\n          <li><strong>Desmontaje y almacenaje.</strong> El salón es anual: guardamos barra y estructura y renovamos solo la gráfica de la añada.</li>\n        </ol>\n        <h2>Constructor de stands para el Salón de los Vinos de Aragón: qué construimos</h2>\n        <ul>\n          <li><strong>Barra de cata a medida.</strong> Encimera lavable, frío integrado, fregadero y botelleros dimensionados para tus referencias.</li>\n          <li><strong>Stand de bodega en carpintería.</strong> Madera vista o lacada, texturas del territorio y gráfica retroiluminada con la añada y la denominación.</li>\n          <li><strong>Almacén cerrado.</strong> Espacio para cajas, copas y material de campaña, integrado en el diseño y fuera de la vista.</li>\n          <li><strong>Stand colectivo para una denominación.</strong> Mostradores individuales bajo una imagen común, con zona de cata central para catas dirigidas.</li>\n        </ul>\n        <h2>Constructor de stands para el Salón de los Vinos de Aragón: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-salon-vinos-aragon-zaragoza\">stands para el Salón de los Vinos de Aragón</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para el Salón de los Vinos de Aragón: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en el Salón de los Vinos de Aragón</a></p>"
    }
  },
  constructor_stand_enoforum: {
    es: {
      breadcrumb: "Constructor de stands para Enoforum",
      title: "Constructor de stands para Enoforum (Zaragoza) | Taller propio | Standarte",
      h1: "Constructor de stands para Enoforum, Zaragoza",
      introText: "Construimos stands a medida para Enoforum, el congreso de tecnología e innovación enológica en su edición de Zaragoza, desde nuestro propio taller: stands de congreso compactos, bancos de demostración, mobiliario y gráfica fabricados por nuestro equipo, listos para montarse en pocas horas.",
      body: "\n        <h2>Constructor de stands para Enoforum: qué exige construir en un congreso con zona expositiva</h2>\n        <p>Enoforum es un congreso científico con ponencias, mesas técnicas y una zona expositiva donde las empresas de tecnología enológica —analítica, levaduras, bioprotección, sensores, software de bodega— presentan sus novedades a investigadores y enólogos entre sesión y sesión. El espacio es compacto, las ventanas de montaje se miden en horas y el visitante llega con quince minutos de pausa: el stand tiene que estar prefabricado, iluminado y con el argumento a la vista.</p>\n        <p>Construimos módulos de congreso de alto acabado que salen del taller terminados —gráfica, mobiliario, pantalla y almacén integrados— y se levantan en una mañana, con un banco de demostración a altura de trabajo para el equipo o la muestra y un rincón de conversación para la cita concertada.</p>\n        <h2>Constructor de stands para Enoforum: cómo se construye tu stand, paso a paso</h2>\n        <ol>\n          <li><strong>Levantamiento del proyecto.</strong> Medidas del espacio contratado, ventana de montaje disponible, equipos o muestras que se presentan y potencia necesaria.</li>\n          <li><strong>Diseño y prototipo 3D.</strong> Módulo, banco de demostración, gráfica y mobiliario resueltos en un prototipo fotorrealista que es exactamente lo que se va a construir.</li>\n          <li><strong>Fabricación en taller propio.</strong> Carpintería, banco, mobiliario y gráfica producidos y montados en taller.</li>\n          <li><strong>Premontaje completo.</strong> El módulo sale del taller terminado y cableado; en la sede solo se coloca y se conecta.</li>\n          <li><strong>Transporte y montaje en horas.</strong> Nuestros propios montadores lo levantan dentro de la ventana asignada, listo antes de la primera pausa del congreso.</li>\n          <li><strong>Desmontaje y reutilización.</strong> Retiramos el módulo al cierre y lo guardamos para el siguiente congreso o feria del sector.</li>\n        </ol>\n        <h2>Constructor de stands para Enoforum: qué construimos</h2>\n        <ul>\n          <li><strong>Módulo de congreso prefabricado.</strong> Stand compacto de alto acabado con gráfica, pantalla, mobiliario y almacén integrados, montado en una mañana.</li>\n          <li><strong>Banco de demostración.</strong> Superficie a altura de trabajo, iluminación puntual y tomas integradas para analizadores, sensores y muestras.</li>\n          <li><strong>Rincón de reunión.</strong> Mesa alta o baja y asientos para la cita concertada entre sesiones.</li>\n          <li><strong>Módulos reutilizables.</strong> Estructura pensada para volver a montarse en otras citas del vino: Enomaq, el Salón de los Vinos de Aragón o ferias fuera de Aragón.</li>\n        </ul>\n        <h2>Constructor de stands para Enoforum: y para el resto de la Feria de Zaragoza</h2>\n        <p>El mismo taller construye para todo el calendario del recinto: <a href=\"/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/ferias/stands-smagua-zaragoza\">SMAGUA</a>, <a href=\"/ferias/stands-figan-feria-zaragoza\">FIGAN</a> y <a href=\"/ferias/stands-enomaq-zaragoza\">Enomaq</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href=\"/ferias/stands-enoforum-zaragoza\">stands para Enoforum</a>; y el servicio para la plaza, en <a href=\"/diseno-construccion-montaje-stands-zaragoza\">diseño y montaje de stands en Zaragoza</a> y en <a href=\"/constructor_stand_zaragoza\">constructor de stands en Zaragoza</a>.</p>\n        <h2>Constructor de stands para Enoforum: por qué construir con Standarte</h2>\n        <p>Somos constructores, no intermediarios: el stand se fabrica en <strong>nuestro taller</strong>, con nuestro equipo y nuestros plazos. Eso significa un único responsable de principio a fin, presupuesto sin la comisión de un tercero, y capacidad de resolver un cambio de última hora sin depender de la agenda de otro taller. Cada aprobación queda registrada en el <a href=\"/proyecto-auditado\">Sistema de Proyecto Auditado</a>: lo que apruebas es, literalmente, lo que se construye.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Pide presupuesto de construcción para tu stand en Enoforum</a></p>"
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
        <p>El mismo taller construye para el resto del calendario del recinto —<a href="/ferias/stands-agroexpo-feval-don-benito">FEVAL</a>— y para las plazas extremeñas: <a href="/montaje-stands-don-benito">Don Benito</a>, <a href="/diseno-construccion-montaje-stands-badajoz">Badajoz</a>, <a href="/montaje-stands-zafra">Zafra</a> y <a href="/diseno-construccion-montaje-stands-trujillo">Trujillo</a>. La ficha de la feria —sectores y servicio completo de diseño y montaje— está en <a href="/ferias/stands-agroexpo">stands para Agroexpo</a>, y la página de plaza, en <a href="/constructor_stand_don_benito">constructor de stands en Don Benito</a>.</p>
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
        <p>El mismo taller construye para todo el calendario del recinto: <a href="/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/ferias/stands-maintenance-bilbao">Maintenance</a>, <a href="/ferias/stand-bedigital-bilbao">BeDigital</a> e <a href="/ferias/stand-ferroforma-bilbao">Industry Tools by Ferroforma</a>, las citas que comparten plataforma en <a href="/ferias/stand-plus-industry-bilbao">+Industry</a>. Si lo que buscas es la ficha de la feria —fechas de la próxima edición, sectores y el servicio completo de diseño y montaje—, está en <a href="/ferias/stands-biemh-bilbao-bec">stands para BIEMH</a>; y el servicio para la plaza, en <a href="/diseno-construccion-montaje-stands-bilbao">diseño y montaje de stands en Bilbao</a> y en <a href="/constructor_stand_bilbao">constructor de stands en Bilbao</a>.</p>
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
        <p>Construimos para todo el calendario de FYCMA: <a href="/ferias/stand-des-malaga">DES</a>, <a href="/ferias/stand-ht-malaga">H&amp;T</a>, <a href="/ferias/stand-simed-malaga">Simed</a>, <a href="/ferias/stand-expo-agritech-malaga">Expo AgriTech</a>, <a href="/ferias/stand-greencities-malaga">Greencities</a>, <a href="/ferias/stands-talent-land-malaga">Talent Land España</a> y <a href="/ferias/stand-san-diego-comic-con-malaga">San Diego Comic-Con Málaga</a>, donde la escenografía pesa tanto como el stand. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno-construccion-montaje-stands-malaga">diseño y montaje de stands en Málaga</a>.</p>
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
        <p>Construimos para todo el calendario de FIBES: <a href="/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/ferias/stands-simof-sevilla">SIMOF</a>, <a href="/ferias/stand-fireca-sevilla">Fireca</a>, <a href="/ferias/stand-mmh-sevilla">MMH – Mining and Minerals Hall</a>, <a href="/ferias/stand-tis-sevilla">Tourism Innovation Summit</a>, <a href="/ferias/stand-autentica-sevilla">Auténtica</a> y el <a href="/ferias/stands-salon-motor-sevilla">Salón del Motor de Sevilla</a>. El servicio completo de diseño y montaje para la plaza está en <a href="/diseno-construccion-montaje-stands-sevilla">diseño y montaje de stands en Sevilla</a>.</p>
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
        <h2>Constructor de stands en Valencia: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-beauty-forum-valencia">Beauty Forum Valencia</a>, <a href="/ferias/stand-cevisama-valencia">Cevisama</a>, <a href="/ferias/stand-habitat-valencia">Feria Hábitat València</a>, <a href="/ferias/stand-textilhogar-valencia">Textilhogar</a>, <a href="/ferias/stand-espacio-cocina-sici-valencia">Espacio Cocina SICI</a>, <a href="/ferias/stand-fimma-maderalia-valencia">Fimma + Maderalia</a>, <a href="/ferias/stand-iberflora-valencia">Iberflora</a> y <a href="/ferias/stand-gastronoma-valencia">Gastrónoma</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-valencia">diseño y montaje de stands en Valencia</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Valencia</a></p>`
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
        <h2>Constructor de stands en Valladolid: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-intur-valladolid">INTUR</a>, <a href="/ferias/stand-fine-valladolid">FINE Valladolid</a>, <a href="/ferias/stand-technology-show-valladolid">Technology Show Valladolid</a>, <a href="/ferias/stand-feria-artesania-valladolid">Feria de Artesanía de Valladolid</a>, <a href="/ferias/stand-agraria-valladolid">AGRARIA</a>, <a href="/ferias/stand-agrovid-valladolid">AGROVID</a>, <a href="/ferias/stand-aviforum-valladolid">aviFORUM</a> y <a href="/ferias/stand-fimascota-valladolid">FIMASCOTA</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-valladolid">diseño y montaje de stands en Valladolid</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Valladolid</a></p>`
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
        <h2>Constructor de stands en Alicante: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-alicante-gastronomica">Alicante Gastronómica</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-alicante">diseño y montaje de stands en Alicante</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Alicante</a></p>`
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
        <h2>Constructor de stands en Elche: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-futurmoda-elche">Futurmoda</a> y <a href="/ferias/stand-firauto-elche">Firauto</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-elche">diseño y montaje de stands en Elche</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Elche</a></p>`
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
        <h2>Constructor de stands en Murcia: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fame-innowa-torre-pacheco">FAME Innowa</a>, <a href="/ferias/stand-equimur-torre-pacheco">EQUIMUR</a>, <a href="/ferias/stand-hortifruit-torre-pacheco">HortiFruit</a> y <a href="/ferias/stand-fecons-torre-pacheco">FECONS</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-murcia">diseño y montaje de stands en Murcia</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Murcia</a></p>`
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
        <h2>Constructor de stands en Salamanca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-salamaq-salamanca">SALAMAQ</a>, <a href="/ferias/stand-salon-automovil-salamanca">Salón del Automóvil de Salamanca</a> y <a href="/ferias/stand-congreso-alineadores-salamanca">Congreso Internacional de Alineadores</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-salamanca">diseño y montaje de stands en Salamanca</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Salamanca</a></p>`
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
        <h2>Constructor de stands en A Coruña: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-forum-gastronomico-a-coruna">Galicia Fórum Gastronómico</a>, <a href="/ferias/stand-mundos-digitales-a-coruna">Mundos Digitales</a> y <a href="/ferias/stand-biocultura-a-coruna">BioCultura A Coruña</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-a-coruna">diseño y montaje de stands en A Coruña</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en A Coruña</a></p>`
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
        <h2>Constructor de stands en Santiago de Compostela: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fairway-santiago-de-compostela">Fairway Santiago de Compostela</a>, <a href="/ferias/stand-maker-faire-galicia-santiago-de-compostela">Maker Faire Galicia Santiago de Compostela</a>, <a href="/ferias/stand-gedet-santiago-de-compostela">GEDET Santiago de Compostela</a>, <a href="/ferias/stand-semergen-santiago-de-compostela">Congreso SEMERGEN Santiago de Compostela</a>, <a href="/ferias/stand-sesmi-santiago-de-compostela">SESMI Santiago de Compostela</a> y <a href="/ferias/stand-galicia-escena-pro-santiago-de-compostela">Galicia Escena PRO</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-santiago-de-compostela">diseño y montaje de stands en Santiago de Compostela</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Santiago de Compostela</a></p>`
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
        <h2>Constructor de stands en Vigo: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-conxemar-vigo">Conxemar Vigo</a>, <a href="/ferias/stand-navalia-vigo">Navalia</a>, <a href="/ferias/stand-nortrans-vigo">Nortrans</a> y <a href="/ferias/stand-mindtech-vigo">Mindtech</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-vigo">diseño y montaje de stands en Vigo</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Vigo</a></p>`
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
        <h2>Constructor de stands en Ourense: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-xantar-ourense">Xantar</a> y <a href="/ferias/stand-termatalia-ourense">Termatalia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-ourense">diseño y montaje de stands en Ourense</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Ourense</a></p>`
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
        <h2>Constructor de stands en Silleda: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-semana-verde-galicia-silleda">Semana Verde de Galicia</a> y <a href="/ferias/stand-turexpo-galicia-silleda">Turexpo Galicia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-silleda">diseño y montaje de stands en Silleda</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Silleda</a></p>`
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
        <h2>Constructor de stands en Gijón: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fidma-gijon">FIDMA – Feria Internacional de Muestras de Asturias</a>, <a href="/ferias/stand-agropec-gijon">AGROPEC Gijón</a>, <a href="/ferias/stand-salon-competicion-asturias-gijon">Salón de Competición de Asturias</a>, <a href="/ferias/stand-asturforesta-tineo">Asturforesta</a>, <a href="/ferias/stand-feria-muestras-tineo">Feria de Muestras de Tineo</a> y <a href="/ferias/stand-agroalimentaria-vegadeo">Feria Agroalimentaria de Vegadeo</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-gijon">diseño y montaje de stands en Gijón</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Gijón</a></p>`
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
        <h2>Constructor de stands en Santander: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-artesantander">ARTESANTANDER</a>, <a href="/ferias/stand-biocantabria-santander">BioCantabria</a>, <a href="/ferias/stand-feria-apicola-cantabria-torrelavega">Feria Nacional Apícola de Cantabria</a> y <a href="/ferias/stand-feria-concesionarios-torrelavega">Feria de Concesionarios de Torrelavega</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-santander">diseño y montaje de stands en Santander</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Santander</a></p>`
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
        <h2>Constructor de stands en Irún: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-mubil-mobility-expo-irun">MUBIL Mobility Expo</a>, <a href="/ferias/stand-unire-irun">UNIRE</a>, <a href="/ferias/stand-bioterra-irun">Bioterra</a>, <a href="/ferias/stand-caravantur-irun">Caravantur</a>, <a href="/ferias/stand-uhinak-irun">Uhinak</a> y <a href="/ferias/stand-go-mobility-irun">Go Mobility</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-irun">diseño y montaje de stands en Irún</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Irún</a></p>`
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
        <h2>Constructor de stands en Vitoria: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-ardoaraba-vitoria">Ardoaraba</a>, <a href="/ferias/stand-avanza-fp-alava-vitoria">AVANZA – Feria de FP de Álava</a>, <a href="/ferias/stand-empleo-gune-vitoria">Empleo Gune</a>, <a href="/ferias/stand-feria-stocks-vitoria">Feria de Stocks</a> y <a href="/ferias/stand-lanberri-vitoria">Lanberri</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-vitoria">diseño y montaje de stands en Vitoria</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Vitoria</a></p>`
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
        <h2>Constructor de stands en Pamplona: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-navartur-pamplona">NAVARTUR</a>, <a href="/ferias/stand-salon-estudiante-futuro-profesional-pamplona">Salón del Estudiante y Futuro Profesional</a>, <a href="/ferias/stand-edifica-pamplona">EDIFICA</a>, <a href="/ferias/stand-navarra-jobs-pamplona">Navarra Jobs</a>, <a href="/ferias/stand-feria-navarra-ecologica-pamplona">Feria Navarra Ecológica</a>, <a href="/ferias/stand-navarra-wine-gastronomy-pamplona">Navarra Wine & Gastronomy</a> y <a href="/ferias/stand-feria-turismo-reyno-navarra-pamplona">Feria Internacional de Turismo Reyno de Navarra</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-pamplona">diseño y montaje de stands en Pamplona</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Pamplona</a></p>`
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
        <h2>Constructor de stands en Logroño: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-rioja-wine-trade-mission-logrono">Rioja Wine Trade Mission</a>, <a href="/ferias/stand-planeta-rioja-logrono">Planeta Rioja</a>, <a href="/ferias/stand-feria-formacion-profesional-la-rioja-logrono">Feria de Formación Profesional de La Rioja</a>, <a href="/ferias/stand-feria-vehiculo-ocasion-logrono">Feria del Vehículo de Ocasión de Logroño</a>, <a href="/ferias/stand-feria-maquinaria-agricola-alfaro">Feria de Maquinaria Agrícola de Alfaro</a> y <a href="/ferias/stand-ferias-agroalimentarias-rioja-oriental-calahorra">Ferias Agroalimentarias de la Rioja Oriental</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-logrono">diseño y montaje de stands en Logroño</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Logroño</a></p>`
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
        <h2>Constructor de stands en Lleida: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-municipalia-lleida">Municipàlia Lleida</a> y <a href="/ferias/stand-fira-sant-miquel-lleida">Fira de Sant Miquel Lleida</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-lleida">diseño y montaje de stands en Lleida</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Lleida</a></p>`
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
        <h2>Constructor de stands en Girona: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-forum-gastronomic-girona">Fòrum Gastronòmic Girona</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-girona">diseño y montaje de stands en Girona</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Girona</a></p>`
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
        <h2>Constructor de stands en Mallorca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-palma-international-boat-show">Palma International Boat Show</a>, <a href="/ferias/stand-palma-superyacht-village">Palma Superyacht Village</a>, <a href="/ferias/stand-baleart-mallorca">Baleart</a>, <a href="/ferias/stand-dijous-bo-mallorca">Dijous Bo</a>, <a href="/ferias/stand-horeca-baleares-mallorca">HORECA Baleares Mallorca</a>, <a href="/ferias/stand-fira-vi-pollenca-mallorca">Fira del Vi de Pollença</a>, <a href="/ferias/stand-wine-days-binissalem-mallorca">Wine Days Mallorca – DO Binissalem</a> y <a href="/ferias/stand-fira-sipia-alcudia-mallorca">Fira de la Sípia</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-mallorca">diseño y montaje de stands en Mallorca</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Mallorca</a></p>`
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
        <h2>Constructor de stands en Ibiza: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-horeca-baleares-ibiza">HORECA Baleares Ibiza</a>, <a href="/ferias/stand-fira-mar-ibiza">Fira de la Mar</a> y <a href="/ferias/stand-feria-stocks-ibiza">Feria de Stocks de Ibiza</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-ibiza">diseño y montaje de stands en Ibiza</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Ibiza</a></p>`
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
        <h2>Constructor de stands en Menorca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-horeca-baleares-menorca">HORECA Baleares Menorca</a>, <a href="/ferias/stand-fira-camp-alaior-menorca">Fira del Camp</a> y <a href="/ferias/stand-arrels-menorca">Arrels, Fira de Producte Local i Cuina de Menorca</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-menorca">diseño y montaje de stands en Menorca</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Menorca</a></p>`
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
        <h2>Constructor de stands en Canarias: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feaga-fuerteventura">FEAGA</a>, <a href="/ferias/stand-gastrocanarias-tenerife">GastroCanarias</a>, <a href="/ferias/stand-gran-canaria-me-gusta">Gran Canaria Me Gusta</a>, <a href="/ferias/stand-canagua-energia-gran-canaria">Canagua & Energía</a>, <a href="/ferias/stand-fimar-las-palmas">FIMAR</a>, <a href="/ferias/stand-salon-atlantico-logistica-transporte">Salón Atlántico de Logística y Transporte</a>, <a href="/ferias/stand-moda-tenerife">Feria Internacional de Moda de Tenerife</a> y <a href="/ferias/stand-expodeca">ExpoDeca</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-islas-canarias">diseño y montaje de stands en Canarias</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Canarias</a></p>`
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
        <h2>Constructor de stands en Ceuta: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-bet-on-ceuta">Bet On Ceuta</a>, <a href="/ferias/stand-ceuta-impulsa">Ceuta Impulsa</a> y <a href="/ferias/stand-odissea-economia-azul-ceuta">Odissea, Economía Azul de Ceuta</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-ceuta">diseño y montaje de stands en Ceuta</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Ceuta</a></p>`
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
        <h2>Constructor de stands en Melilla: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-oportunidades-economicas-melilla">Feria de Oportunidades Económicas de Melilla</a>, <a href="/ferias/stand-feria-representacion-intercultural-melilla">Feria de Representación Intercultural de Melilla</a> y <a href="/ferias/stand-eventos-empresariales-proyecto-melilla">Eventos Empresariales Proyecto Melilla</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-melilla">diseño y montaje de stands en Melilla</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Melilla</a></p>`
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
        <h2>Constructor de stands en Tánger: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-maroc-in-mode-mim-tanger">Maroc in Mode (MIM) Tánger</a>, <a href="/ferias/stand-tanger-nexus">Tanger Nexus</a>, <a href="/ferias/stand-tanger-fashion-week">Tanger Fashion Week</a>, <a href="/ferias/stand-amith-nord-tanger">Encuentros Industriales AMITH Nord</a> y <a href="/ferias/stand-eventos-industriales-tanger-med">Eventos Industriales Tanger Med</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-tanger">diseño y montaje de stands en Tánger</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Tánger</a></p>`
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
        <h2>Constructor de stands en Casablanca: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-logismed-casablanca">Logismed</a>, <a href="/ferias/stand-morocco-food-expo-casablanca">Morocco Food Expo</a>, <a href="/ferias/stand-siema-casablanca">Morocco SIEMA Expo</a>, <a href="/ferias/stand-siab-casablanca">SIAB Expo Maroc</a>, <a href="/ferias/stand-elec-expo-casablanca">Elec Expo</a>, <a href="/ferias/stand-ener-event-casablanca">Ener Event</a>, <a href="/ferias/stand-plast-expo-casablanca">Plast Expo</a> y <a href="/ferias/stand-pack-expo-casablanca">Pack Expo Morocco</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-casablanca">diseño y montaje de stands en Casablanca</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Casablanca</a></p>`
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
        <h2>Constructor de stands en Rabat: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-siel-rabat">SIEL — Salon International de l'Édition et du Livre</a>, <a href="/ferias/stand-visa-for-music-rabat">Visa For Music</a>, <a href="/ferias/stand-forum-etudiant-rabat">Forum de l'Étudiant, de la Formation et de l'Emploi</a> y <a href="/ferias/stand-cimqusef-rabat">CIMQUSEF</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-rabat">diseño y montaje de stands en Rabat</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Rabat</a></p>`
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
        <h2>Constructor de stands en Andorra: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fira-andorra-la-vella">Fira d'Andorra la Vella</a>, <a href="/ferias/stand-enfirat-encamp">Enfira't</a>, <a href="/ferias/stand-andorra-taste">Andorra Taste</a>, <a href="/ferias/stand-fira-del-vermut-andorra">Fira del Vermut d'Andorra</a>, <a href="/ferias/stand-fira-del-bestiar-ordino">Fira del Bestiar d'Ordino</a>, <a href="/ferias/stand-mercat-de-la-vall-andorra">Mercat de la Vall</a> y <a href="/ferias/stand-fira-outlet-soldeu">Fira Outlet de Soldeu</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-andorra">diseño y montaje de stands en Andorra</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Andorra</a></p>`
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
        <h2>Constructor de stands en Teruel: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-jamon-teruel">Feria del Jamón de Teruel y Alimentos de Calidad</a>, <a href="/ferias/stand-expocalamocha">ExpoCalamocha</a> y <a href="/ferias/stand-agroalcaniz">AgroAlcañiz</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-teruel">diseño y montaje de stands en Teruel</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Teruel</a></p>`
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
        <h2>Constructor de stands en Aranda de Duero: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-espacio-ribera-aranda">Espacio Ribera</a>, <a href="/ferias/stand-premios-envero-enverofest-aranda">Premios Envero / EnveroFest</a> y <a href="/ferias/stand-congreso-la-cierna-aranda">Congreso La Cierna</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-aranda-de-duero">diseño y montaje de stands en Aranda de Duero</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Aranda de Duero</a></p>`
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
        <h2>Constructor de stands en Ciudad Real: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-fenavin-match-ciudad-real">Fenavin Match Ciudad Real</a>, <a href="/ferias/stand-ferduque-ciudad-real">FERDUQUE</a>, <a href="/ferias/stand-fercam-manzanares-ciudad-real">FERCAM</a> y <a href="/ferias/stand-fercatur-ciudad-real">Fercatur Ciudad Real</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-ciudad-real">diseño y montaje de stands en Ciudad Real</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Ciudad Real</a></p>`
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
        <h2>Constructor de stands en Zafra: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-internacional-ganadera-zafra">Feria Internacional Ganadera de Zafra</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/montaje-stands-zafra">diseño y montaje de stands en Zafra</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Zafra</a></p>`
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
        <h2>Constructor de stands en Trujillo: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-internacional-ganadera-trujillo">Feria Agroganadera de Trujillo</a> y <a href="/ferias/stand-feria-nacional-queso-trujillo">Feria Nacional del Queso de Trujillo</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-trujillo">diseño y montaje de stands en Trujillo</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Trujillo</a></p>`
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
        <h2>Constructor de stands en Almería: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-infoagro-exhibition-aguadulce">Infoagro Exhibition</a>, <a href="/ferias/stand-expolevante-el-ejido">Expolevante</a> y <a href="/ferias/stand-sun-blue-congress-almeria">Sun&Blue Congress</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-almeria">diseño y montaje de stands en Almería</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Almería</a></p>`
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
        <h2>Constructor de stands en Jaén: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-expoliva-jaen">Expoliva</a>, <a href="/ferias/stand-ibercaza-jaen">Ibercaza</a> y <a href="/ferias/stand-feria-de-los-pueblos-jaen">Feria de los Pueblos</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-jaen">diseño y montaje de stands en Jaén</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Jaén</a></p>`
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
        <h2>Constructor de stands en Huelva: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-congreso-internacional-frutos-rojos-huelva">Congreso Internacional de Frutos Rojos</a>, <a href="/ferias/stand-feria-jamon-cerdo-iberico-aracena">Feria del Jamón y Cerdo Ibérico de Aracena</a> y <a href="/ferias/stand-feria-gamba-chirla-boqueron-punta-umbria">Feria Nacional de la Gamba, la Chirla y el Boquerón</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-huelva">diseño y montaje de stands en Huelva</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Huelva</a></p>`
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
        <h2>Constructor de stands en Córdoba: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-intercaza-cordoba">Intercaza</a>, <a href="/ferias/stand-feria-agroganadera-pedroches-pozoblanco">Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches</a> y <a href="/ferias/stand-feria-jamon-bellota-dop-pedroches-villanueva-cordoba">Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-cordoba">diseño y montaje de stands en Córdoba</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Córdoba</a></p>`
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
        <h2>Constructor de stands en Granada: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feria-general-muestras-armilla">Feria General de Muestras de Armilla</a>, <a href="/ferias/stand-feria-de-la-ciencia-granada">Feria de la Ciencia</a>, <a href="/ferias/stand-concab-granada">CONCAB Granada</a>, <a href="/ferias/stand-belmoda-granada">Belmoda Granada</a>, <a href="/ferias/stand-sabores-nuestra-tierra-granada">Sabores de Nuestra Tierra</a> y <a href="/ferias/stand-feria-pueblos-granada">Feria de los Pueblos de Granada</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-granada">diseño y montaje de stands en Granada</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Granada</a></p>`
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
        <h2>Constructor de stands en Cádiz: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-blue-zone-forum-navalia-meeting-cadiz">Blue Zone Forum Navalia Meeting</a>, <a href="/ferias/stand-feria-del-caballo-jerez">Feria del Caballo de Jerez</a> y <a href="/ferias/stand-fegasur-jerez">Fegasur</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-cadiz">diseño y montaje de stands en Cádiz</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Cádiz</a></p>`
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
        <h2>Constructor de stands en Marsella: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-marseille">Foire Internationale de Marseille</a>, <a href="/ferias/stand-euromaritime-marseille">Euromaritime</a>, <a href="/ferias/stand-sirha-mediterranee-marseille">Sirha Méditerranée</a>, <a href="/ferias/stand-beauty-profs-marseille">Beauty Prof's</a>, <a href="/ferias/stand-savim-marseille">SAVIM</a>, <a href="/ferias/stand-salon-piscine-jardin-marseille">Salon Piscine & Jardin</a>, <a href="/ferias/stand-solutions-cse-marseille">Solutions CSE Marseille</a> y <a href="/ferias/stand-japan-expo-sud-marseille">Japan Expo Sud</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-marsella">diseño y montaje de stands en Marsella</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Marsella</a></p>`
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
        <h2>Constructor de stands en Cannes: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-cannes-yachting-festival">Cannes Yachting Festival</a>, <a href="/ferias/stand-interior-exterior-design-meetings-cannes">Interior & Exterior Design Meetings</a>, <a href="/ferias/stand-mapic-cannes">MAPIC</a>, <a href="/ferias/stand-mipim-cannes">MIPIM</a> y <a href="/ferias/stand-tfwa-cannes">TFWA World Exhibition</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-cannes">diseño y montaje de stands en Cannes</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Cannes</a></p>`
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
        <h2>Constructor de stands en Aviñón: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-medagri-avignon">MED'Agri</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-avignon">diseño y montaje de stands en Aviñón</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Aviñón</a></p>`
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
        <h2>Constructor de stands en Toulouse: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-toulouse">Foire Internationale de Toulouse</a>, <a href="/ferias/stand-cfia-toulouse">CFIA Toulouse</a>, <a href="/ferias/stand-sepem-industries-toulouse">SEPEM Industries Toulouse</a>, <a href="/ferias/stand-aerospace-test-development-show-toulouse">Aerospace Test & Development Show</a>, <a href="/ferias/stand-aeromart-toulouse">Aeromart Toulouse</a>, <a href="/ferias/stand-siane-toulouse">Salon SIANE</a> y <a href="/ferias/stand-smahrt-toulouse">SMAHRT</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-toulouse">diseño y montaje de stands en Toulouse</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Toulouse</a></p>`
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
        <h2>Constructor de stands en Burdeos: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-internationale-bordeaux">Foire Internationale de Bordeaux</a>, <a href="/ferias/stand-vinitech-sifel-bordeaux">Vinitech-Sifel</a>, <a href="/ferias/stand-equitaine-bordeaux">Equitaine</a>, <a href="/ferias/stand-salon-agriculture-nouvelle-aquitaine-bordeaux">Salon de l'Agriculture Nouvelle-Aquitaine</a>, <a href="/ferias/stand-art3f-bordeaux">Art3f Bordeaux</a>, <a href="/ferias/stand-grand-salon-habitat-bordeaux">Grand Salon Habitat</a>, <a href="/ferias/stand-salon-vins-vignerons-independants-bordeaux">Salon des Vins des Vignerons Indépendants</a> y <a href="/ferias/stand-cycleau-nouvelle-aquitaine-bordeaux">Cycl'Eau Nouvelle-Aquitaine</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-burdeos">diseño y montaje de stands en Burdeos</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Burdeos</a></p>`
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
        <h2>Constructor de stands en Lyon: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sirha-lyon">SIRHA</a>, <a href="/ferias/stand-global-industrie-lyon">Global Industrie</a>, <a href="/ferias/stand-pollutec-lyon">Pollutec Lyon</a>, <a href="/ferias/stand-piscine-global-lyon">Piscine Global Europe</a>, <a href="/ferias/stand-preventica-lyon">Préventica Lyon</a>, <a href="/ferias/stand-prod-pack-lyon">Prod&Pack</a> y <a href="/ferias/stand-bepositive-lyon">BEPOSITIVE</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-lyon">diseño y montaje de stands en Lyon</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Lyon</a></p>`
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
        <h2>Constructor de stands en Grenoble: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-mountain-planet-grenoble">Mountain Planet</a> y <a href="/ferias/stand-sepem-industries-sud-est-grenoble">SEPEM Industries Sud-Est</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-grenoble">diseño y montaje de stands en Grenoble</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Grenoble</a></p>`
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
        <h2>Constructor de stands en Clermont-Ferrand: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sommet-elevage-clermont-ferrand">Sommet de l'Élevage</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-clermont-ferrand">diseño y montaje de stands en Clermont-Ferrand</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Clermont-Ferrand</a></p>`
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
        <h2>Constructor de stands en Niza: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-agecotel-nice">AGECOTEL</a>, <a href="/ferias/stand-nice-boating-tomorrow">Nice Boating Tomorrow</a>, <a href="/ferias/stand-ibt-cote-azur">IBT Côte d'Azur</a>, <a href="/ferias/stand-entreprenariales-nice">Les Entreprenariales</a> y <a href="/ferias/stand-solucop-nice">SOLUCOP</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-niza">diseño y montaje de stands en Niza</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Niza</a></p>`
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
        <h2>Constructor de stands en Montpellier: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-sitevi-montpellier">SITEVI</a>, <a href="/ferias/stand-millesime-bio-montpellier">Millésime Bio</a>, <a href="/ferias/stand-sett-montpellier">SETT</a>, <a href="/ferias/stand-energaia-montpellier">EnerGaïa</a>, <a href="/ferias/stand-siprho-montpellier">SIPRHO</a> y <a href="/ferias/stand-ais-montpellier">Antibody Industrial Symposium</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-montpellier">diseño y montaje de stands en Montpellier</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Montpellier</a></p>`
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
        <h2>Constructor de stands en Perpiñán: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-foire-exposition-perpignan">Foire Exposition de Perpignan</a>, <a href="/ferias/stand-medfel-perpignan">MEDFEL</a>, <a href="/ferias/stand-viv-habitat-perpignan">Salon Viv'Habitat</a>, <a href="/ferias/stand-tourisme-loisirs-perpignan">Salon Tourisme & Loisirs</a>, <a href="/ferias/stand-eco-maison-perpignan">Eco-Maison</a>, <a href="/ferias/stand-retro-mecanic-perpignan">Retro Mécanic</a> y <a href="/ferias/stand-salon-mariage-perpignan">Salon du Mariage</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-perpignan">diseño y montaje de stands en Perpiñán</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Perpiñán</a></p>`
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
        <h2>Constructor de stands en Batalha: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/ferias/stand-expometal-batalha">Expometal</a>, <a href="/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/ferias/stand-vidrotec-batalha">Vidrotec</a> y <a href="/ferias/stand-decorhotel-batalha">Decorhotel</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-batalha">diseño y montaje de stands en Batalha</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Batalha</a></p>`
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
        <h2>Constructor de stands en Santarém: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/ferias/stand-agroglobal-santarem">Agroglobal</a> y <a href="/ferias/stand-lusoflora-santarem">Lusoflora</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-santarem">diseño y montaje de stands en Santarém</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Santarém</a></p>`
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
        <h2>Constructor de stands en Peso da Régua: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> y <a href="/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-peso-da-regua">diseño y montaje de stands en Peso da Régua</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Peso da Régua</a></p>`
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
        <h2>Constructor de stands en el sur de Portugal: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> y <a href="/ferias/stand-vinipax-beja">Vinipax Beja</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-portugal-sur">diseño y montaje de stands en el sur de Portugal</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en el sur de Portugal</a></p>`
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
        <h2>Constructor de stands en Madeira: ferias de la plaza</h2>
        <p>Construimos para el calendario de la plaza: <a href="/ferias/stand-expomadeira">Expomadeira</a>, <a href="/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> y <a href="/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. Si prefieres ver el servicio completo de diseño y montaje, está en nuestra página de <a href="/diseno-construccion-montaje-stands-islas-madeira">diseño y montaje de stands en Madeira</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Madeira</a></p>`
    }
  },
  constructor_stand_merida: {
    es: {
      breadcrumb: 'Constructor de stands en Mérida',
      title: 'Constructor de stands en Mérida | Taller propio | Standarte',
      h1: 'Constructor de stands en Mérida',
      introText: 'Construimos stands a medida para IFEME, la Institución Ferial de Mérida, desde nuestro taller de Cáceres, a menos de una hora: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.',
      body: `
        <h2>Constructor de stands en Mérida: fabricación propia para IFEME</h2>
        <p>Mérida es la capital de Extremadura y su recinto, IFEME, recibe un calendario de gran público: el Salón del Automóvil, la Feria de Bodas y Hogar, el coleccionismo de Emérita Augusta y FETUREX, la feria de turismo de la región. Son ferias de fin de semana con aforo alto y visitante que se para, toca y pregunta, así que el stand se construye para el paso continuo: gráfica resistente, mostrador de atención, suelo que no acusa el uso y un almacén cerrado para el material.</p>
        <h2>Constructor de stands en Mérida: ferias de la plaza</h2>
        <p>Construimos para el calendario de IFEME: <a href="/ferias/stand-salon-automovil-merida">Salón del Automóvil de Mérida</a>, <a href="/ferias/stand-feria-bodas-hogar-merida">Feria de Bodas y Hogar</a>, <a href="/ferias/stand-coleccionismo-emerita-augusta-merida">Feria de Coleccionismo Emérita Augusta</a> y <a href="/ferias/stand-feturex-merida">FETUREX</a>. El servicio completo de diseño y montaje para la provincia está en nuestra página de <a href="/diseno-construccion-montaje-stands-badajoz">diseño y montaje de stands en Badajoz</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Mérida</a></p>`
    }
  },
  constructor_stand_almendralejo: {
    es: {
      breadcrumb: 'Constructor de stands en Almendralejo',
      title: 'Constructor de stands en Almendralejo | Taller propio | Standarte',
      h1: 'Constructor de stands en Almendralejo',
      introText: 'Construimos stands a medida para las ferias de Almendralejo y Tierra de Barros desde nuestro taller de Cáceres, a menos de una hora: carpintería, estructura, mobiliario y gráfica fabricados por nuestro equipo, sin subcontratar la producción. Prototipo 3D antes de cortar la primera pieza y montaje terminado antes de la apertura.',
      body: `
        <h2>Constructor de stands en Almendralejo: fabricación propia para la capital del vino extremeño</h2>
        <p>Almendralejo es Tierra de Barros: bodegas, cava y aceite, con Vinac como feria de referencia del sector. Un stand de bodega aquí se construye para catar y vender: barra de cata a la altura correcta, botellero iluminado en frío, un reservado para el distribuidor y superficies que aguantan el trasiego de copas durante toda la feria.</p>
        <h2>Constructor de stands en Almendralejo: ferias de la plaza</h2>
        <p>Construimos para <a href="/ferias/stand-vinac-almendralejo">Vinac Almendralejo</a> y para el resto del calendario extremeño, desde <a href="/ferias/stand-feria-internacional-ganadera-zafra">la Feria Internacional Ganadera de Zafra</a> hasta <a href="/ferias/stand-feturex-merida">FETUREX en Mérida</a>. El servicio completo de diseño y montaje para la provincia está en nuestra página de <a href="/diseno-construccion-montaje-stands-badajoz">diseño y montaje de stands en Badajoz</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Pide presupuesto de construcción para tu stand en Almendralejo</a></p>`
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
        <p>Feria de Zaragoza hosts some of Spain's most demanding shows for stand construction: <a href="/en/ferias/stands-fima-zaragoza">FIMA</a> and <a href="/en/ferias/stands-figan-feria-zaragoza">FIGAN</a> exhibit farm and livestock machinery weighing several tonnes, and <a href="/en/ferias/stands-smopyc-zaragoza">SMOPYC</a> public works equipment. A stand for those shows is not decoration: it is a structure that has to carry weight, survive four days of traffic and still look immaculate.</p>
        ${pasoEn('Zaragoza')}
        ${tiposEn('Zaragoza')}
        <h2>Stand builder in Zaragoza: shows at the venue</h2>
        <p>We build for the whole venue calendar: <a href="/en/ferias/stands-fima-zaragoza">FIMA</a>, <a href="/en/ferias/stands-figan-feria-zaragoza">FIGAN</a>, <a href="/en/ferias/stands-smopyc-zaragoza">SMOPYC</a>, <a href="/en/ferias/stands-smagua-zaragoza">SMAGUA</a> and <a href="/en/ferias/stands-expofimer-zaragoza">EXPOFIMER</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_zaragoza">stand design and installation in Zaragoza</a> page.</p>
        ${porqueEn('Zaragoza')}`
  },
  constructor_stand_madrid: {
    breadcrumb: 'Stand builder in Madrid',
    title: 'Stand builder in Madrid | Workshop next to IFEMA | Standarte',
    h1: 'Stand builder in Madrid',
    introText: 'We build custom stands for IFEMA from our workshop in San Fernando de Henares, fifteen minutes from the venue: joinery, structure, furniture and graphics made by our team, with the ability to solve any adjustment on installation day.',
    body: `
        <h2>Stand builder in Madrid: our own workshop fifteen minutes from IFEMA</h2>
        <p>Our workshop is in San Fernando de Henares, about ten kilometres from Feria de Madrid. On a site like IFEMA that distance is the difference between solving an installation problem in an hour or waiting for a lorry from another province. IFEMA is also Spain's densest calendar — twelve halls, one show after another — which compresses build-up windows, so we pre-assemble in the workshop and arrive at the hall to assemble, not to improvise.</p>
        <ul>
          <li><strong>Workshop in San Fernando de Henares</strong>, fifteen minutes from the venue.</li>
          <li><strong>A 3D prototype</strong> that is exactly what gets built.</li>
          <li><strong>Same-day adjustments</strong> during installation.</li>
          <li><strong>Finished 24&nbsp;h before</strong> opening.</li>
        </ul>
        <h2>Stand builder in Madrid: what we build</h2>
        <h3>Custom joinery stands</h3>
        <p>Structure, walls and furniture made to measure for shows such as Fruit Attraction or SICUR, with lacquered, veneered or textile finishes.</p>
        <h3>Stands with tasting areas and kitchens</h3>
        <p>Bars with sink and fridge, demo kitchens and storage for IFEMA's food shows, with water services agreed with the venue.</p>
        <h3>Double-deck stands</h3>
        <p>A meeting room or terrace above and the display below, for large plots where every metre counts.</p>
        <p><strong>Exhibiting at IFEMA soon?</strong> Build-up slots go early: with your space and date we book workshop and installation time.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Madrid</a></p>
        <h2>Stand builder in Madrid: why build with Standarte</h2>
        <ul>
          <li><strong>We build, we don't broker.</strong> Your stand is made in our San Fernando de Henares workshop by our team.</li>
          <li><strong>Real proximity to IFEMA.</strong> Anything that needs redoing during installation is made and delivered the same day.</li>
          <li><strong>What you approve is what gets built.</strong> Every approval is recorded in our <a href="/en/audited-project">Audited Project System</a>.</li>
          <li><strong>Real work in Madrid.</strong> Over 30 stands published in our project portfolio for companies exhibiting at IFEMA.</li>
        </ul>
        <h2>Stand builder in Madrid: projects we have built</h2>
        <ul>
          <li><a href="/proyectos/stand_para_herrajes_puertas_ventanas_madrid?lang=en">Modular hardware stand</a></li>
          <li><a href="/proyectos/stand_para_distribuidor_de_uvas_de_mesa_en_madrid?lang=en">Stand for a table grape distributor</a></li>
          <li><a href="/proyectos/stand_para_empresa_del_sector_sanitario_en_madrid?lang=en">Stand for a healthcare company</a></li>
          <li><a href="/proyectos/stand_para_fabricante_de_equipos_industriales_en_madrid?lang=en">Stand for an industrial equipment manufacturer</a></li>
        </ul>
        <h2>Stand builder in Madrid: shows at the venue</h2>
        <p>We build across IFEMA's calendar: <a href="/en/ferias/stand-fruit-attraction-madrid">Fruit Attraction</a>, <a href="/en/ferias/stand-sicur-madrid">SICUR</a> and <a href="/en/ferias/stand-meat-attraction-madrid">Meat Attraction</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_madrid">stand design and installation in Madrid</a> page.</p>`,
      faqs: [
        {
          "q": "Where is your workshop?",
          "a": "In San Fernando de Henares, about ten kilometres from IFEMA. We build and pre-assemble there and reach the venue in around fifteen minutes."
        },
        {
          "q": "Do you build the stand yourselves or subcontract it?",
          "a": "We build it in our own workshop with our own carpenters and installers. We do not subcontract production or installation."
        },
        {
          "q": "What if something needs changing during installation at IFEMA?",
          "a": "Being fifteen minutes away, parts are remade or adjusted in the workshop and delivered the same day."
        },
        {
          "q": "How much does a stand in Madrid cost?",
          "a": "It depends on size, structure and finishes. Our prices page shows indicative ranges, and we send a fixed quote with a 3D prototype within 24 h."
        }
      ]
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
        <p>We build across the Fira calendar: <a href="/en/ferias/stand-mwc-barcelona">MWC</a>, <a href="/en/ferias/stand-ise-barcelona">ISE</a>, <a href="/en/ferias/stand-alimentaria-barcelona">Alimentaria</a>, <a href="/en/ferias/stand-hostelco-barcelona">Hostelco</a> and <a href="/en/ferias/stand-smart-city-expo-world-congress-barcelona">Smart City Expo</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_barcelona">stand design and installation in Barcelona</a> page.</p>
        ${porqueEn('Barcelona')}`
  },
  constructor_stand_oporto: {
    breadcrumb: 'Stand builder in Porto',
    title: 'Stand builder in Porto | Own workshop | Standarte',
    h1: 'Stand builder in Porto',
    introText: 'We build custom stands for Exponor (Feira Internacional do Porto) from our own workshop: joinery, structure, furniture and graphics made by our team, transported and installed by us, with a single point of contact throughout.',
    body: `
        <h2>Stand builder in Porto: building for Exponor</h2>
        <p>Exponor concentrates the industrial and export-driven north of Portugal: machinery, textiles, food and technical shows where the visitor is a professional buyer who inspects the product up close. That sets the build standard — solid finishes at hand height, faithful lighting and room to negotiate — and adds one variable a domestic show does not have: cross-border transport, which we plan with margin from our workshop.</p>
        <h2>Stand builder in Porto: how we work the city</h2>
        <ol>
          <li><strong>Project and 3D prototype</strong> to the space at Exponor and its rules on height, rigging and services.</li>
          <li><strong>Manufacturing and pre-assembly in our workshop</strong>, transport to Porto handled by us.</li>
          <li><strong>Installation by our own team</strong>, finished 24&nbsp;h before opening, and dismantling at close.</li>
        </ol>
        <h2>Stand builder in Porto: shows at the venue</h2>
        <p>We build across the Exponor calendar: <a href="/en/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/en/ferias/stands-qualifica-oporto">Qualifica</a> and <a href="/en/ferias/stand-emaf-oporto">EMAF</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_porto">stand design and installation in Porto</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Porto</a></p>`
  },
  constructor_stand_lisboa: {
    breadcrumb: 'Stand builder in Lisbon',
    title: 'Stand builder in Lisbon | Own workshop | Standarte',
    h1: 'Stand builder in Lisbon',
    introText: 'We build custom stands for FIL (Feira Internacional de Lisboa) and the city’s congress venues from our own workshop: bespoke joinery, structure, furniture and graphics, installed by our own team.',
    body: `
        <h2>Stand builder in Lisbon: building for FIL and for congresses</h2>
        <p>Lisbon combines large trade shows at FIL, in Parque das Nações, with international congresses whose build-up windows are measured in hours. For the first we build free-design stands with height and storage; for the second, pre-assembled modules that only need joining and connecting in the hall, graphics already applied and wiring tested before the lorry is loaded.</p>
        <ul>
          <li><strong>One contact</strong> in English, Spanish or Portuguese.</li>
          <li><strong>A 3D prototype</strong> that is exactly what gets built.</li>
          <li><strong>Built in our own workshop</strong>, with transport to Lisbon handled by us.</li>
          <li><strong>Installed within the assigned window</strong>, even at short congress build-ups.</li>
        </ul>
        <h2>Stand builder in Lisbon: what we build</h2>
        <h3>Free-design stands for FIL</h3>
        <p>Custom structure and joinery for shows such as BTL or Tektónica, with built-in storage and large-format graphics.</p>
        <h3>Pre-assembled congress modules</h3>
        <p>Compact stands that leave the workshop finished and go up in hours at congresses such as Web Summit.</p>
        <p><strong>Exhibiting in Lisbon soon?</strong> With your space and build-up window we plan workshop and transport with margin.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Lisbon</a></p>
        <h2>Stand builder in Lisbon: why build with Standarte</h2>
        <ul>
          <li><strong>We build, we don't broker.</strong> Your stand is made in our workshop and travels to Lisbon pre-assembled.</li>
          <li><strong>Transport handled.</strong> We plan the journey with margin so unloading never depends on the road.</li>
          <li><strong>What you approve is what gets built.</strong> Every approval is recorded in our <a href="/en/audited-project">Audited Project System</a>.</li>
        </ul>
        <h2>Stand builder in Lisbon: projects we have built</h2>
        <ul>
          <li><a href="/proyectos/stand_para_embalaje_industrial_lisboa?lang=en">Stand for industrial packaging</a></li>
          <li><a href="/proyectos/stand_para_equipamiento_industrial_lisboa?lang=en">Stand for industrial equipment</a></li>
          <li><a href="/proyectos/stand_para_gestion_trafico_inteligente_lisboa?lang=en">Stand for smart traffic management</a></li>
        </ul>
        <h2>Stand builder in Lisbon: shows at the venue</h2>
        <p>We build across the Lisbon calendar: <a href="/en/ferias/stand-web-summit-lisboa">Web Summit</a>, <a href="/en/ferias/stand-tektonica-lisboa">Tektónica</a> and <a href="/en/ferias/stand-nauticampo-lisboa">Nauticampo</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_lisbon">stand design and installation in Lisbon</a> page.</p>`,
      faqs: [
        {
          "q": "Do you build stands in Lisbon from Spain?",
          "a": "Yes. We build and pre-assemble the stand in our workshop and plan transport to Lisbon with margin, so in the hall it is only joined and connected."
        },
        {
          "q": "Can you build at congresses with very short build-up times?",
          "a": "Yes. For congresses such as Web Summit we build modules that leave the workshop finished and go up in a few hours."
        },
        {
          "q": "Do you work in Portuguese and English?",
          "a": "Yes, with one contact throughout the project in Spanish, Portuguese or English."
        },
        {
          "q": "How much does a stand in Lisbon cost?",
          "a": "It depends on size, structure and finishes. Our prices page shows indicative ranges, and we send a fixed quote with a 3D prototype within 24 h."
        }
      ]
  },
  constructor_stand_bilbao: {
    breadcrumb: 'Stand builder in Bilbao',
    title: 'Stand builder in Bilbao | Own workshop | Standarte',
    h1: 'Stand builder in Bilbao',
    introText: 'We build custom stands for BEC (Bilbao Exhibition Centre) from our own workshop: structures sized for industrial machinery, technical floors and finishes that hold up through a heavy-traffic show.',
    body: `
        <h2>Stand builder in Bilbao: building for the BEC and its industry</h2>
        <p>The BEC in Barakaldo is an industrial-scale venue and its shows prove it: at <a href="/en/ferias/stands-biemh-bilbao-bec">BIEMH</a>, machine tools arrive by crane and run for the whole show. Building here means sizing the floor for real loads, agreeing lifting equipment with the venue and having power ready before the machine arrives. The 12-15 m clear height of the halls also allows what lower venues cannot: double-deck stands with a meeting room above and the display below, calculated and built in our workshop before we reach the hall.</p>
        <ul>
          <li><strong>One contact</strong> from the first plan to dismantling.</li>
          <li><strong>A 3D prototype</strong> that is exactly what gets built.</li>
          <li><strong>Built in our own workshop</strong> and pre-assembled before travelling to the BEC.</li>
          <li><strong>Finished 24&nbsp;h before</strong> opening.</li>
        </ul>
        <h2>Stand builder in Bilbao: what we build</h2>
        <h3>Stands for machinery and heavy products</h3>
        <p>Technical floors calculated for each machine's load, cable routes under the platform and services agreed with the BEC, so equipment runs with no cables in sight.</p>
        <h3>Double-deck stands</h3>
        <p>Calculated structure, stairs and an upper meeting room that uses the venue's high halls without losing display space.</p>
        <h3>Reusable modular stands</h3>
        <p>For exhibitors who return to the BEC calendar, a structure that is stored, reconfigured and comes back with updated graphics.</p>
        <p><strong>Exhibiting at the BEC soon?</strong> The sooner we know your space and equipment, the better loads, services and timings fit.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Bilbao</a></p>
        <h2>Stand builder in Bilbao: why build with Standarte</h2>
        <ul>
          <li><strong>We build, we don't broker.</strong> Your stand is made in our workshop by our team, with no third-party margin.</li>
          <li><strong>We study the venue first.</strong> Hall plan, BEC rules, loads and heights shape the design from day one.</li>
          <li><strong>What you approve is what gets built.</strong> Every approval is recorded in our <a href="/en/audited-project">Audited Project System</a>.</li>
          <li><strong>Real work in Bilbao.</strong> Over 30 stands published in our project portfolio for companies exhibiting here.</li>
        </ul>
        <h2>Stand builder in Bilbao: projects we have built</h2>
        <ul>
          <li><a href="/proyectos/stand_para_empresa_de_automatizacion_por_vacio_en_bilbao?lang=en">Stand for a vacuum automation company</a></li>
          <li><a href="/proyectos/stand_para_fabricante_de_elastomeros_en_bilbao?lang=en">Stand for an elastomer manufacturer</a></li>
          <li><a href="/proyectos/stand_para_empresa_de_tecnologia_industrial_en_bilbao?lang=en">Stand for an industrial technology company</a></li>
          <li><a href="/proyectos/stand_para_aerolinea_de_carga_en_bilbao?lang=en">Stand for a cargo airline</a></li>
        </ul>
        <h2>Stand builder in Bilbao: shows at the venue</h2>
        <p>We build across the BEC calendar: <a href="/en/ferias/stands-biemh-bilbao-bec">BIEMH</a>, <a href="/en/ferias/stands-subcontratacion-bilbao">Subcontratación</a> and <a href="/en/ferias/stand-addit3d-bilbao">Addit3D</a>. The full design-and-build service is on our <a href="/en/stand_design_assembly_bilbao">stand design and installation in Bilbao</a> page.</p>`,
      faqs: [
        {
          "q": "Do you build the stand yourselves or subcontract it?",
          "a": "We build it in our own workshop with our own carpenters and installers, and one person is responsible for the project from start to finish."
        },
        {
          "q": "Can you build a stand with working machinery at the BEC?",
          "a": "Yes. We calculate the technical floor for each machine, plan cable routes and coordinate machinery entry and power with the BEC."
        },
        {
          "q": "Do you build double-deck stands in Bilbao?",
          "a": "Yes, they are common at the BEC thanks to its high halls. The structure is calculated, built and pre-assembled in our workshop."
        },
        {
          "q": "How much does a stand in Bilbao cost?",
          "a": "It depends on size, structure and finishes. Our prices page shows indicative ranges, and we send a fixed quote with a 3D prototype within 24 h."
        }
      ]
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
        <p>We build for the IFEBA calendar and the rest of Extremadura, including <a href="/en/ferias/stands-agroexpo">Agroexpo</a> in Don Benito. The full design-and-build service is on our <a href="/en/stand_design_assembly_badajoz">stand design and installation in Badajoz</a> page.</p>
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
        <p>The same workshop builds for the whole venue calendar: <a href="/en/ferias/stands-fima-zaragoza">FIMA</a>, <a href="/en/ferias/stands-smopyc-zaragoza">SMOPYC</a> and <a href="/en/ferias/stands-smagua-zaragoza">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href="/en/ferias/stands-figan-feria-zaragoza">stands for FIGAN</a>, and the city service at <a href="/en/stand_builder_zaragoza">stand builder in Zaragoza</a>.</p>
        ${porqueEnFair('FIGAN')}`
  },
  constructor_stand_fitur: {
    breadcrumb: "Stand builder for FITUR",
    title: "Stand builder for FITUR (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for FITUR, IFEMA Madrid",
    introText: "We build custom stands for FITUR from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for FITUR: what this show demands</h2>\n        <p>FITUR is Spain's most visited tourism show: destinations, hotel groups, airlines and travel tech fill almost every IFEMA hall for five days, with trade days followed by a public weekend. We build legible scenography, separate B2B meeting areas and finishes that survive the public days.</p>\n        <h2>Stand builder for FITUR: what we build</h2>\n        <ul>\n          <li><strong>Destination stands with scenography.</strong> Volumes and large-format graphics that tell a place at a glance.</li>\n          <li><strong>Shared destination stands.</strong> Individual counters under one image with shared storage.</li>\n          <li><strong>B2B meeting areas.</strong> Semi-closed rooms with table and screen for scheduled meetings.</li>\n        </ul>\n        <h2>Stand builder for FITUR: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a>, <a href=\"/en/ferias/stand-hygienalia-madrid\">Hygienalia</a> and <a href=\"/en/ferias/stand-madrid-fusion\">Madrid Fusión</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-fitur-madrid\">stands for FITUR</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your FITUR stand</a></p>"
  },
  constructor_stand_fruit_attraction: {
    breadcrumb: "Stand builder for Fruit Attraction",
    title: "Stand builder for Fruit Attraction (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Fruit Attraction, IFEMA Madrid",
    introText: "We build custom stands for Fruit Attraction from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Fruit Attraction: what this show demands</h2>\n        <p>Fruit Attraction brings fruit and vegetable growers, cooperatives and exporters together with retail buyers. Fresh produce needs chilled displays, colour-true lighting and room to taste, so we build refrigeration into the joinery, tasting areas with water and drainage, and closed rooms for season negotiations.</p>\n        <h2>Stand builder for Fruit Attraction: what we build</h2>\n        <ul>\n          <li><strong>Fresh produce displays.</strong> Chilled cabinets with colour-true lighting.</li>\n          <li><strong>Tasting area.</strong> Washable bar with sink, fridge and storage.</li>\n          <li><strong>Negotiation room.</strong> Closed space for season programmes with retailers.</li>\n        </ul>\n        <h2>Stand builder for Fruit Attraction: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-sicur-madrid\">SICUR</a>, <a href=\"/en/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a> and <a href=\"/en/ferias/stand-piscimad-madrid\">Piscimad</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-fruit-attraction-madrid\">stands for Fruit Attraction</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Fruit Attraction stand</a></p>"
  },
  constructor_stand_sicur: {
    breadcrumb: "Stand builder for SICUR",
    title: "Stand builder for SICUR (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for SICUR, IFEMA Madrid",
    introText: "We build custom stands for SICUR from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for SICUR: what this show demands</h2>\n        <p>SICUR fills four IFEMA halls with fire protection, PPE, electronic security, cybersecurity and defence. Much of what is shown switches on — cameras, detectors, barriers, drones — so we build with power and data resolved in the workshop, darkened demo rooms and technical counters.</p>\n        <h2>Stand builder for SICUR: what we build</h2>\n        <ul>\n          <li><strong>Darkened demo rooms.</strong> For thermal cameras and detection systems.</li>\n          <li><strong>Connected product benches.</strong> Power and network built in under the floor.</li>\n          <li><strong>Stands for bulky equipment.</strong> Reinforced floors for barriers and vehicles.</li>\n        </ul>\n        <h2>Stand builder for SICUR: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-salon-look-madrid\">Salón Look</a>, <a href=\"/en/ferias/stand-hip-madrid\">HIP</a> and <a href=\"/en/ferias/stand-iberpet-madrid\">Iberpet</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-sicur-madrid\">stands for SICUR</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your SICUR stand</a></p>"
  },
  constructor_stand_salon_look: {
    breadcrumb: "Stand builder for Salón Look",
    title: "Stand builder for Salón Look (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Salón Look, IFEMA Madrid",
    introText: "We build custom stands for Salón Look from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Salón Look: what this show demands</h2>\n        <p>Salón Look is IFEMA's hairdressing, beauty and wellness show, with live demonstrations on models and brands launching the season. We build full workstations with water and drainage, demo stages and product displays lit to flatter hair and skin tones.</p>\n        <h2>Stand builder for Salón Look: what we build</h2>\n        <ul>\n          <li><strong>Live workstations.</strong> Mirrors, lighting and power for dryers and irons.</li>\n          <li><strong>Wash units.</strong> With water and drainage agreed with IFEMA.</li>\n          <li><strong>Demo stage.</strong> Platform, screen and seating for brand shows.</li>\n        </ul>\n        <h2>Stand builder for Salón Look: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-veteco-madrid\">Veteco</a>, <a href=\"/en/ferias/stand-meat-attraction-madrid\">Meat Attraction</a> and <a href=\"/en/ferias/stand-empack-madrid\">Empack</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-salon-look-madrid\">stands for Salón Look</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Salón Look stand</a></p>"
  },
  constructor_stand_veteco: {
    breadcrumb: "Stand builder for Veteco",
    title: "Stand builder for Veteco (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Veteco, IFEMA Madrid",
    introText: "We build custom stands for Veteco from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Veteco: what this show demands</h2>\n        <p>Veteco is the window, glazing and solar-protection show. What is displayed is heavy and opens — full windows, sliders, glass doors — so we build load-bearing walls to anchor real frames, working hardware benches and full-scale system sections for specifiers.</p>\n        <h2>Stand builder for Veteco: what we build</h2>\n        <ul>\n          <li><strong>Load-bearing walls.</strong> Reinforced to hang windows and curtain walls.</li>\n          <li><strong>Hardware benches.</strong> Working displays at hand height.</li>\n          <li><strong>System mock-ups.</strong> Full-scale sections for specifiers.</li>\n        </ul>\n        <h2>Stand builder for Veteco: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-hygienalia-madrid\">Hygienalia</a>, <a href=\"/en/ferias/stand-arcomadrid\">ARCOmadrid</a> and <a href=\"/en/ferias/stand-smart-doors-madrid\">SMART DOORS</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-veteco-madrid\">stands for Veteco</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Veteco stand</a></p>"
  },
  constructor_stand_hygienalia: {
    breadcrumb: "Stand builder for Hygienalia",
    title: "Stand builder for Hygienalia (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Hygienalia, IFEMA Madrid",
    introText: "We build custom stands for Hygienalia from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Hygienalia: what this show demands</h2>\n        <p>Hygienalia covers professional cleaning, hygiene and industrial laundry, and many exhibitors run their machines on the stand floor. We build waterproof demo tracks, water and power for industrial washers and product shelving with hidden storage.</p>\n        <h2>Stand builder for Hygienalia: what we build</h2>\n        <ul>\n          <li><strong>Demo tracks.</strong> Water-resistant floors for scrubbers running live.</li>\n          <li><strong>Laundry area.</strong> Power and water for working industrial machines.</li>\n          <li><strong>Chemicals and paper displays.</strong> Shelving with restocking storage.</li>\n        </ul>\n        <h2>Stand builder for Hygienalia: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a>, <a href=\"/en/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a> and <a href=\"/en/ferias/stand-expomedes-madrid\">Expomedes</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-hygienalia-madrid\">stands for Hygienalia</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Hygienalia stand</a></p>"
  },
  constructor_stand_advanced_manufacturing: {
    breadcrumb: "Stand builder for Advanced Manufacturing Madrid",
    title: "Stand builder for Advanced Manufacturing Madrid (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Advanced Manufacturing Madrid, IFEMA Madrid",
    introText: "We build custom stands for Advanced Manufacturing Madrid from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Advanced Manufacturing Madrid: what this show demands</h2>\n        <p>Advanced Manufacturing Madrid, heir to MetalMadrid, is IFEMA's annual manufacturing show: machine tools, robotics, composites and 3D printing. We build platforms calculated for each machine, safety enclosures designed into the stand and quiet technical rooms.</p>\n        <h2>Stand builder for Advanced Manufacturing Madrid: what we build</h2>\n        <ul>\n          <li><strong>Machine platforms.</strong> Calculated technical floors with cable routes.</li>\n          <li><strong>Visible robot cells.</strong> Transparent safety enclosures built in.</li>\n          <li><strong>Technical room.</strong> Quiet space to present processes.</li>\n        </ul>\n        <h2>Stand builder for Advanced Manufacturing Madrid: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-hip-madrid\">HIP</a>, <a href=\"/en/ferias/stand-madrid-fusion\">Madrid Fusión</a> and <a href=\"/en/ferias/stand-madrid-tech-show\">Madrid Tech Show</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-advanced-manufacturing-madrid\">stands for Advanced Manufacturing Madrid</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Advanced Manufacturing Madrid stand</a></p>"
  },
  constructor_stand_hip: {
    breadcrumb: "Stand builder for HIP",
    title: "Stand builder for HIP (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for HIP, IFEMA Madrid",
    introText: "We build custom stands for HIP from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for HIP: what this show demands</h2>\n        <p>HIP, Horeca Professional Expo, is hospitality's big innovation meeting: kitchen equipment, foodservice and front-of-house tech. Hospitality buyers want to see equipment working, so we build demo kitchens with extraction, full service bars and small stages for in-stand talks.</p>\n        <h2>Stand builder for HIP: what we build</h2>\n        <ul>\n          <li><strong>Demo kitchens.</strong> Power, water and extraction agreed with IFEMA.</li>\n          <li><strong>Service bars.</strong> Real bar with fridge, tap and sink.</li>\n          <li><strong>Mini stage.</strong> Platform and screen for talks.</li>\n        </ul>\n        <h2>Stand builder for HIP: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-meat-attraction-madrid\">Meat Attraction</a>, <a href=\"/en/ferias/stand-piscimad-madrid\">Piscimad</a> and <a href=\"/en/ferias/stand-the-district-madrid\">The District</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-hip-madrid\">stands for HIP</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your HIP stand</a></p>"
  },
  constructor_stand_meat_attraction: {
    breadcrumb: "Stand builder for Meat Attraction",
    title: "Stand builder for Meat Attraction (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Meat Attraction, IFEMA Madrid",
    introText: "We build custom stands for Meat Attraction from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Meat Attraction: what this show demands</h2>\n        <p>Meat Attraction is IFEMA's meat industry show, now part of Anuga Select Ibérica. Displaying meat needs a visible cold chain and flawless hygiene, so we build integrated refrigerated counters, sanitary cutting and tasting areas, and negotiation rooms.</p>\n        <h2>Stand builder for Meat Attraction: what we build</h2>\n        <ul>\n          <li><strong>Integrated chilled counters.</strong> Refrigeration built into the joinery.</li>\n          <li><strong>Cutting and tasting area.</strong> Sanitary surfaces, water and drainage.</li>\n          <li><strong>Negotiation room.</strong> For retailers and importers.</li>\n        </ul>\n        <h2>Stand builder for Meat Attraction: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-arcomadrid\">ARCOmadrid</a>, <a href=\"/en/ferias/stand-iberpet-madrid\">Iberpet</a> and <a href=\"/en/ferias/stand-intergift-madrid\">Intergift</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-meat-attraction-madrid\">stands for Meat Attraction</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Meat Attraction stand</a></p>"
  },
  constructor_stand_arcomadrid: {
    breadcrumb: "Stand builder for ARCOmadrid",
    title: "Stand builder for ARCOmadrid (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for ARCOmadrid, IFEMA Madrid",
    introText: "We build custom stands for ARCOmadrid from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for ARCOmadrid: what this show demands</h2>\n        <p>ARCOmadrid is Spain's leading contemporary art fair. A gallery booth is a temporary exhibition room, so we build flat, seamless white walls reinforced to hang heavy work, museum-grade lighting and a discreet office and storage area for collectors.</p>\n        <h2>Stand builder for ARCOmadrid: what we build</h2>\n        <ul>\n          <li><strong>Gallery walls.</strong> Smooth, reinforced walls for any weight of work.</li>\n          <li><strong>Museum lighting.</strong> Track spots with high colour rendering.</li>\n          <li><strong>Office and storage.</strong> Discreet space for collectors.</li>\n        </ul>\n        <h2>Stand builder for ARCOmadrid: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a>, <a href=\"/en/ferias/stand-empack-madrid\">Empack</a> and <a href=\"/en/ferias/stand-momad-madrid\">MOMAD</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-arcomadrid\">stands for ARCOmadrid</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your ARCOmadrid stand</a></p>"
  },
  constructor_stand_salon_gourmets: {
    breadcrumb: "Stand builder for Salón Gourmets",
    title: "Stand builder for Salón Gourmets (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Salón Gourmets, IFEMA Madrid",
    introText: "We build custom stands for Salón Gourmets from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Salón Gourmets: what this show demands</h2>\n        <p>Salón Gourmets is the fine food and drink show: preserves, cheeses, cured meats, oils and wines from small producers. Buyers want to taste first, so we build lit product shelving, tasting bars with fridge and water, and a hidden back store.</p>\n        <h2>Stand builder for Salón Gourmets: what we build</h2>\n        <ul>\n          <li><strong>Gourmet product shelving.</strong> Lit shelves that present each product.</li>\n          <li><strong>Tasting bar.</strong> Fridge, water and washable counter.</li>\n          <li><strong>Back store.</strong> Hidden storage for restocking.</li>\n        </ul>\n        <h2>Stand builder for Salón Gourmets: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-madrid-fusion\">Madrid Fusión</a>, <a href=\"/en/ferias/stand-smart-doors-madrid\">SMART DOORS</a> and <a href=\"/en/ferias/stand-madridjoya-madrid\">Madridjoya</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-salon-gourmets-madrid\">stands for Salón Gourmets</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Salón Gourmets stand</a></p>"
  },
  constructor_stand_madrid_fusion: {
    breadcrumb: "Stand builder for Madrid Fusión",
    title: "Stand builder for Madrid Fusión (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Madrid Fusión, IFEMA Madrid",
    introText: "We build custom stands for Madrid Fusión from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Madrid Fusión: what this show demands</h2>\n        <p>Madrid Fusión is the international gastronomy congress, with a trade exhibition around the auditorium. The audience is demanding professional chefs, so we build compact congress stands with showcooking, extraction and premium finishes.</p>\n        <h2>Stand builder for Madrid Fusión: what we build</h2>\n        <ul>\n          <li><strong>Showcooking.</strong> Hob with extraction, water and power.</li>\n          <li><strong>Regional food stands.</strong> Shared image with producer counters.</li>\n          <li><strong>Congress module.</strong> Compact premium stand built in hours.</li>\n        </ul>\n        <h2>Stand builder for Madrid Fusión: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-piscimad-madrid\">Piscimad</a>, <a href=\"/en/ferias/stand-expomedes-madrid\">Expomedes</a> and <a href=\"/en/ferias/stand-bisutex-madrid\">Bisutex</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-madrid-fusion\">stands for Madrid Fusión</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Madrid Fusión stand</a></p>"
  },
  constructor_stand_piscimad: {
    breadcrumb: "Stand builder for Piscimad",
    title: "Stand builder for Piscimad (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Piscimad, IFEMA Madrid",
    introText: "We build custom stands for Piscimad from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Piscimad: what this show demands</h2>\n        <p>Piscimad is IFEMA's pool, wellness and aquatic facilities show: shells, filtration, heating, covers, spas and saunas. Much of the product is bulky or needs water, so we build raised platforms for shells and spas, visible plant rooms and moisture-resistant finishes.</p>\n        <h2>Stand builder for Piscimad: what we build</h2>\n        <ul>\n          <li><strong>Platforms for shells and spas.</strong> Raised floors that hide the connections.</li>\n          <li><strong>Visible plant room.</strong> Filtration shown behind glass.</li>\n          <li><strong>Moisture-resistant finishes.</strong> Floors and walls that stay true next to water.</li>\n        </ul>\n        <h2>Stand builder for Piscimad: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-iberpet-madrid\">Iberpet</a>, <a href=\"/en/ferias/stand-madrid-tech-show\">Madrid Tech Show</a> and <a href=\"/en/ferias/stand-rebuild-madrid\">REBUILD</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-piscimad-madrid\">stands for Piscimad</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Piscimad stand</a></p>"
  },
  constructor_stand_iberpet: {
    breadcrumb: "Stand builder for Iberpet",
    title: "Stand builder for Iberpet (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Iberpet, IFEMA Madrid",
    introText: "We build custom stands for Iberpet from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Iberpet: what this show demands</h2>\n        <p>Iberpet is the professional pet sector show: food, accessories, hygiene and health for specialist shops and chains. Buyers decide next season's range here, so we build store-scale shelving, order counters with sample storage and launch islands visible from the aisle.</p>\n        <h2>Stand builder for Iberpet: what we build</h2>\n        <ul>\n          <li><strong>Store shelving.</strong> Real-scale shelving that mirrors the shop.</li>\n          <li><strong>Order counter.</strong> Work surface with sample storage.</li>\n          <li><strong>Launch island.</strong> Central display for the new product.</li>\n        </ul>\n        <h2>Stand builder for Iberpet: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-empack-madrid\">Empack</a>, <a href=\"/en/ferias/stand-the-district-madrid\">The District</a> and <a href=\"/en/ferias/stand-expofranquicia-madrid\">Expofranquicia</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-iberpet-madrid\">stands for Iberpet</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Iberpet stand</a></p>"
  },
  constructor_stand_empack: {
    breadcrumb: "Stand builder for Empack",
    title: "Stand builder for Empack (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Empack, IFEMA Madrid",
    introText: "We build custom stands for Empack from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Empack: what this show demands</h2>\n        <p>Empack brings packaging, containers and packing machinery to IFEMA alongside Logistics & Automation and Label&Print. We build areas for machines running live, packaging sample walls organised by material and technical desks for buyer questions.</p>\n        <h2>Stand builder for Empack: what we build</h2>\n        <ul>\n          <li><strong>Live machine area.</strong> Power, compressed air and guarding for demos.</li>\n          <li><strong>Packaging sample wall.</strong> Shelves organised by material or sector.</li>\n          <li><strong>Technical desk.</strong> Consultation point with screen.</li>\n        </ul>\n        <h2>Stand builder for Empack: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-smart-doors-madrid\">SMART DOORS</a>, <a href=\"/en/ferias/stand-intergift-madrid\">Intergift</a> and <a href=\"/en/ferias/stand-expodental-madrid\">Expodental</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-empack-madrid\">stands for Empack</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Empack stand</a></p>"
  },
  constructor_stand_smart_doors: {
    breadcrumb: "Stand builder for SMART DOORS",
    title: "Stand builder for SMART DOORS (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for SMART DOORS, IFEMA Madrid",
    introText: "We build custom stands for SMART DOORS from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for SMART DOORS: what this show demands</h2>\n        <p>SMART DOORS is the doors, automation and access-control show. What is shown moves and is heavy, so we build load-bearing frames for real doors, with power and control wiring hidden inside the structure so every door operates all show long.</p>\n        <h2>Stand builder for SMART DOORS: what we build</h2>\n        <ul>\n          <li><strong>Load-bearing frames.</strong> Reinforced openings for automatic or sectional doors.</li>\n          <li><strong>Hidden wiring.</strong> Power and control built into the structure.</li>\n          <li><strong>Access-control wall.</strong> Demo wall for readers and smart locks.</li>\n        </ul>\n        <h2>Stand builder for SMART DOORS: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-expomedes-madrid\">Expomedes</a>, <a href=\"/en/ferias/stand-momad-madrid\">MOMAD</a> and <a href=\"/en/ferias/stand-expooptica-madrid\">ExpoÓptica</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-smart-doors-madrid\">stands for SMART DOORS</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your SMART DOORS stand</a></p>"
  },
  constructor_stand_expomedes: {
    breadcrumb: "Stand builder for Expomedes",
    title: "Stand builder for Expomedes (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Expomedes, IFEMA Madrid",
    introText: "We build custom stands for Expomedes from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Expomedes: what this show demands</h2>\n        <p>Expomedes is the aesthetic medicine exhibition alongside the specialty congress in Madrid: devices, injectables, dermocosmetics and lasers. We build clinical-looking stands with closed demo cabins, neutral lighting and discreet consultation areas.</p>\n        <h2>Stand builder for Expomedes: what we build</h2>\n        <ul>\n          <li><strong>Demo cabin.</strong> Closed space with couch, power and privacy.</li>\n          <li><strong>Device display.</strong> Custom plinths for each device.</li>\n          <li><strong>Consultation area.</strong> Discreet table for doctors.</li>\n        </ul>\n        <h2>Stand builder for Expomedes: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-madrid-tech-show\">Madrid Tech Show</a>, <a href=\"/en/ferias/stand-madridjoya-madrid\">Madridjoya</a> and <a href=\"/en/ferias/stand-optom-madrid\">OPTOM</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-expomedes-madrid\">stands for Expomedes</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Expomedes stand</a></p>"
  },
  constructor_stand_madrid_tech_show: {
    breadcrumb: "Stand builder for Madrid Tech Show",
    title: "Stand builder for Madrid Tech Show (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Madrid Tech Show, IFEMA Madrid",
    introText: "We build custom stands for Madrid Tech Show from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Madrid Tech Show: what this show demands</h2>\n        <p>Madrid Tech Show groups several enterprise-tech shows at IFEMA — cloud, cybersecurity, data, AI and DevOps. The product is software, so we build demo pods, videowalls built into the structure, in-stand talk corners and wired networking so demos do not rely on hall wifi.</p>\n        <h2>Stand builder for Madrid Tech Show: what we build</h2>\n        <ul>\n          <li><strong>Demo pods.</strong> High counters with screen and wired connection.</li>\n          <li><strong>Built-in videowall.</strong> Large screen set into the structure.</li>\n          <li><strong>Talk corner.</strong> Small seating area for short sessions.</li>\n        </ul>\n        <h2>Stand builder for Madrid Tech Show: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-the-district-madrid\">The District</a>, <a href=\"/en/ferias/stand-bisutex-madrid\">Bisutex</a> and <a href=\"/en/ferias/stand-farmaforum-madrid\">Farmaforum</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-madrid-tech-show\">stands for Madrid Tech Show</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Madrid Tech Show stand</a></p>"
  },
  constructor_stand_the_district: {
    breadcrumb: "Stand builder for The District",
    title: "Stand builder for The District (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for The District, IFEMA Madrid",
    introText: "We build custom stands for The District from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for The District: what this show demands</h2>\n        <p>The District is the European real-estate investment meeting: funds, developers, proptech and public bodies looking for partners. The stand is mainly a meeting place, so we build closed meeting rooms, a lounge and a lit plinth for project models.</p>\n        <h2>Stand builder for The District: what we build</h2>\n        <ul>\n          <li><strong>Closed meeting rooms.</strong> Soundproofed, with table and screen.</li>\n          <li><strong>Lounge.</strong> Open area for informal meetings.</li>\n          <li><strong>Model plinth.</strong> Lit display for development projects.</li>\n        </ul>\n        <h2>Stand builder for The District: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-intergift-madrid\">Intergift</a>, <a href=\"/en/ferias/stand-rebuild-madrid\">REBUILD</a> and <a href=\"/en/ferias/stand-genera-madrid\">Genera</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-the-district-madrid\">stands for The District</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your The District stand</a></p>"
  },
  constructor_stand_intergift: {
    breadcrumb: "Stand builder for Intergift",
    title: "Stand builder for Intergift (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Intergift, IFEMA Madrid",
    introText: "We build custom stands for Intergift from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Intergift: what this show demands</h2>\n        <p>Intergift is IFEMA's gift and home décor show, held alongside Bisutex and Madridjoya. Buyers choose by visual impact, so we build shop-like settings with custom shelves and tables, warm display lighting and an order counter.</p>\n        <h2>Stand builder for Intergift: what we build</h2>\n        <ul>\n          <li><strong>Shop settings.</strong> Walls and tables showing collections.</li>\n          <li><strong>Display lighting.</strong> Warm spots that bring out textures.</li>\n          <li><strong>Order counter.</strong> For catalogues and orders.</li>\n        </ul>\n        <h2>Stand builder for Intergift: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-momad-madrid\">MOMAD</a>, <a href=\"/en/ferias/stand-expofranquicia-madrid\">Expofranquicia</a> and <a href=\"/en/ferias/stand-trafic-madrid\">TRAFIC</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-intergift-madrid\">stands for Intergift</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Intergift stand</a></p>"
  },
  constructor_stand_momad: {
    breadcrumb: "Stand builder for MOMAD",
    title: "Stand builder for MOMAD (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for MOMAD, IFEMA Madrid",
    introText: "We build custom stands for MOMAD from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for MOMAD: what this show demands</h2>\n        <p>MOMAD is IFEMA's international fashion, footwear and accessories show. A fashion stand is a showroom, so we build rails and shelves into the architecture, a fitting room and lighting that respects fabric colour.</p>\n        <h2>Stand builder for MOMAD: what we build</h2>\n        <ul>\n          <li><strong>Collection showroom.</strong> Rails and plinths built in.</li>\n          <li><strong>Fitting room.</strong> Closed space with mirrors.</li>\n          <li><strong>Sample table.</strong> Work area with buyers.</li>\n        </ul>\n        <h2>Stand builder for MOMAD: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-madridjoya-madrid\">Madridjoya</a>, <a href=\"/en/ferias/stand-expodental-madrid\">Expodental</a> and <a href=\"/en/ferias/stand-fiaa-madrid\">FIAA</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-momad-madrid\">stands for MOMAD</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your MOMAD stand</a></p>"
  },
  constructor_stand_madridjoya: {
    breadcrumb: "Stand builder for Madridjoya",
    title: "Stand builder for Madridjoya (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Madridjoya, IFEMA Madrid",
    introText: "We build custom stands for Madridjoya from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Madridjoya: what this show demands</h2>\n        <p>Madridjoya is IFEMA's jewellery, watch and silverware show. The product is small and valuable, so we build lockable showcases with built-in LED lighting, seated sales counters and a lockable store for the collection.</p>\n        <h2>Stand builder for Madridjoya: what we build</h2>\n        <ul>\n          <li><strong>Security showcases.</strong> Lockable, with built-in lighting.</li>\n          <li><strong>Seated counter.</strong> To present piece by piece.</li>\n          <li><strong>Lockable store.</strong> Overnight storage for the collection.</li>\n        </ul>\n        <h2>Stand builder for Madridjoya: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-bisutex-madrid\">Bisutex</a>, <a href=\"/en/ferias/stand-expooptica-madrid\">ExpoÓptica</a> and <a href=\"/en/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-madridjoya-madrid\">stands for Madridjoya</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Madridjoya stand</a></p>"
  },
  constructor_stand_bisutex: {
    breadcrumb: "Stand builder for Bisutex",
    title: "Stand builder for Bisutex (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Bisutex, IFEMA Madrid",
    introText: "We build custom stands for Bisutex from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Bisutex: what this show demands</h2>\n        <p>Bisutex is IFEMA's costume jewellery and fashion accessories show. Brands show hundreds of small items, so we build high-density display walls, sample tables with mirrors and lighting that makes metal shine.</p>\n        <h2>Stand builder for Bisutex: what we build</h2>\n        <ul>\n          <li><strong>High-density walls.</strong> Slatted panels for hundreds of items.</li>\n          <li><strong>Sample tables.</strong> Trays and mirrors.</li>\n          <li><strong>Order point.</strong> Counter with catalogue.</li>\n        </ul>\n        <h2>Stand builder for Bisutex: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-rebuild-madrid\">REBUILD</a>, <a href=\"/en/ferias/stand-optom-madrid\">OPTOM</a> and <a href=\"/en/ferias/stand-motortec-madrid\">Motortec</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-bisutex-madrid\">stands for Bisutex</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Bisutex stand</a></p>"
  },
  constructor_stand_rebuild: {
    breadcrumb: "Stand builder for REBUILD",
    title: "Stand builder for REBUILD (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for REBUILD, IFEMA Madrid",
    introText: "We build custom stands for REBUILD from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for REBUILD: what this show demands</h2>\n        <p>REBUILD is the industrialised and sustainable building event: modular construction, timber, façades, BIM and retrofit. Visitors want real systems, so we build stands that integrate full-scale samples, BIM screens and reusable structures.</p>\n        <h2>Stand builder for REBUILD: what we build</h2>\n        <ul>\n          <li><strong>Real construction sections.</strong> Façade or module samples built in.</li>\n          <li><strong>BIM screens.</strong> Stations to explore models.</li>\n          <li><strong>Reusable stand.</strong> Structure designed for future editions.</li>\n        </ul>\n        <h2>Stand builder for REBUILD: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-expofranquicia-madrid\">Expofranquicia</a>, <a href=\"/en/ferias/stand-farmaforum-madrid\">Farmaforum</a> and <a href=\"/en/ferias/stands-matelec-madrid\">MATELEC</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-rebuild-madrid\">stands for REBUILD</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your REBUILD stand</a></p>"
  },
  constructor_stand_expofranquicia: {
    breadcrumb: "Stand builder for Expofranquicia",
    title: "Stand builder for Expofranquicia (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Expofranquicia, IFEMA Madrid",
    introText: "We build custom stands for Expofranquicia from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Expofranquicia: what this show demands</h2>\n        <p>Expofranquicia is IFEMA's franchise show, where chains look for franchisees. We build stands that recreate the franchised store at small scale and separate interview tables for talking figures with candidates.</p>\n        <h2>Stand builder for Expofranquicia: what we build</h2>\n        <ul>\n          <li><strong>Store replica.</strong> Shopfront and counter in the chain's image.</li>\n          <li><strong>Interview tables.</strong> Separate seats for candidates.</li>\n          <li><strong>Figures wall.</strong> Investment and fees at a glance.</li>\n        </ul>\n        <h2>Stand builder for Expofranquicia: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-expodental-madrid\">Expodental</a>, <a href=\"/en/ferias/stand-genera-madrid\">Genera</a> and <a href=\"/en/ferias/stands-sima-madrid\">SIMA</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-expofranquicia-madrid\">stands for Expofranquicia</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Expofranquicia stand</a></p>"
  },
  constructor_stand_expodental: {
    breadcrumb: "Stand builder for Expodental",
    title: "Stand builder for Expodental (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Expodental, IFEMA Madrid",
    introText: "We build custom stands for Expodental from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Expodental: what this show demands</h2>\n        <p>Expodental is Spain's main dental show: chairs, imaging, implants, CAD/CAM and consumables. We build complete demo surgeries with water, air and suction under the floor, lab areas for milling and 3D printing, and hands-on training rooms.</p>\n        <h2>Stand builder for Expodental: what we build</h2>\n        <ul>\n          <li><strong>Demo surgery.</strong> Chair with services hidden under the floor.</li>\n          <li><strong>Lab area.</strong> Benches for mills and scanners.</li>\n          <li><strong>Workshop room.</strong> Hands-on training stations.</li>\n        </ul>\n        <h2>Stand builder for Expodental: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-expooptica-madrid\">ExpoÓptica</a>, <a href=\"/en/ferias/stand-trafic-madrid\">TRAFIC</a> and <a href=\"/en/ferias/stands-intersicop-madrid\">InterSICOP</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-expodental-madrid\">stands for Expodental</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Expodental stand</a></p>"
  },
  constructor_stand_expooptica: {
    breadcrumb: "Stand builder for ExpoÓptica",
    title: "Stand builder for ExpoÓptica (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for ExpoÓptica, IFEMA Madrid",
    introText: "We build custom stands for ExpoÓptica from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for ExpoÓptica: what this show demands</h2>\n        <p>ExpoÓptica is IFEMA's optics and optometry show. For frame brands the stand is a boutique, so we build frame walls with built-in lighting, sales tables with mirrors and darkened cabins for diagnostic instruments.</p>\n        <h2>Stand builder for ExpoÓptica: what we build</h2>\n        <ul>\n          <li><strong>Frame walls.</strong> Displays with built-in lighting.</li>\n          <li><strong>Sales tables.</strong> With mirrors for fittings.</li>\n          <li><strong>Instrument cabin.</strong> Darkened room for diagnostics.</li>\n        </ul>\n        <h2>Stand builder for ExpoÓptica: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-optom-madrid\">OPTOM</a>, <a href=\"/en/ferias/stand-fiaa-madrid\">FIAA</a> and <a href=\"/en/ferias/stand-fitur-madrid\">FITUR</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-expooptica-madrid\">stands for ExpoÓptica</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your ExpoÓptica stand</a></p>"
  },
  constructor_stand_optom: {
    breadcrumb: "Stand builder for OPTOM",
    title: "Stand builder for OPTOM (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for OPTOM, IFEMA Madrid",
    introText: "We build custom stands for OPTOM from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for OPTOM: what this show demands</h2>\n        <p>OPTOM is the international optometry and contact lens congress held in Madrid with ExpoÓptica. We build technical congress stands with device demo stations, evidence panels and compact counters that go up quickly.</p>\n        <h2>Stand builder for OPTOM: what we build</h2>\n        <ul>\n          <li><strong>Diagnostic stations.</strong> Technical tables with power.</li>\n          <li><strong>Evidence panel.</strong> Studies and clinical cases.</li>\n          <li><strong>Compact congress stand.</strong> Fast installation.</li>\n        </ul>\n        <h2>Stand builder for OPTOM: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-farmaforum-madrid\">Farmaforum</a>, <a href=\"/en/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a> and <a href=\"/en/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-optom-madrid\">stands for OPTOM</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your OPTOM stand</a></p>"
  },
  constructor_stand_farmaforum: {
    breadcrumb: "Stand builder for Farmaforum",
    title: "Stand builder for Farmaforum (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Farmaforum, IFEMA Madrid",
    introText: "We build custom stands for Farmaforum from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Farmaforum: what this show demands</h2>\n        <p>Farmaforum is the pharma, biotech, cosmetics and lab industry forum. Visitors are technical buyers, so we build clean technical stands with lab-equipment counters, process screens and meeting rooms.</p>\n        <h2>Stand builder for Farmaforum: what we build</h2>\n        <ul>\n          <li><strong>Lab counter.</strong> Technical surface with power.</li>\n          <li><strong>Process screens.</strong> To walk through lines and validation.</li>\n          <li><strong>Meeting room.</strong> For plant and quality managers.</li>\n        </ul>\n        <h2>Stand builder for Farmaforum: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-genera-madrid\">Genera</a>, <a href=\"/en/ferias/stand-motortec-madrid\">Motortec</a> and <a href=\"/en/ferias/stand-sicur-madrid\">SICUR</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-farmaforum-madrid\">stands for Farmaforum</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Farmaforum stand</a></p>"
  },
  constructor_stand_genera: {
    breadcrumb: "Stand builder for Genera",
    title: "Stand builder for Genera (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Genera, IFEMA Madrid",
    introText: "We build custom stands for Genera from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Genera: what this show demands</h2>\n        <p>Genera is IFEMA's energy and sustainability show: solar, self-consumption, storage, efficiency and hydrogen. We build demo mounting structures with real modules, equipment benches for inverters and batteries, and reusable stands.</p>\n        <h2>Stand builder for Genera: what we build</h2>\n        <ul>\n          <li><strong>Solar demo structure.</strong> Real modules at roof pitch.</li>\n          <li><strong>Equipment bench.</strong> Inverters and batteries shown as a system.</li>\n          <li><strong>Reusable stand.</strong> Modular structure for several editions.</li>\n        </ul>\n        <h2>Stand builder for Genera: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-trafic-madrid\">TRAFIC</a>, <a href=\"/en/ferias/stands-matelec-madrid\">MATELEC</a> and <a href=\"/en/ferias/stand-salon-look-madrid\">Salón Look</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-genera-madrid\">stands for Genera</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Genera stand</a></p>"
  },
  constructor_stand_trafic: {
    breadcrumb: "Stand builder for TRAFIC",
    title: "Stand builder for TRAFIC (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for TRAFIC, IFEMA Madrid",
    introText: "We build custom stands for TRAFIC from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for TRAFIC: what this show demands</h2>\n        <p>TRAFIC is the safe and sustainable mobility show: signage, traffic management, ITS and parking. We build stands with room for working signs and barriers, simulated road floors and meeting rooms for public-sector buyers.</p>\n        <h2>Stand builder for TRAFIC: what we build</h2>\n        <ul>\n          <li><strong>Simulated road section.</strong> Marked floor for demos.</li>\n          <li><strong>Supports for road equipment.</strong> Signs and barriers with power.</li>\n          <li><strong>Meeting room.</strong> For public bodies.</li>\n        </ul>\n        <h2>Stand builder for TRAFIC: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-fiaa-madrid\">FIAA</a>, <a href=\"/en/ferias/stands-sima-madrid\">SIMA</a> and <a href=\"/en/ferias/stand-veteco-madrid\">Veteco</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-trafic-madrid\">stands for TRAFIC</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your TRAFIC stand</a></p>"
  },
  constructor_stand_fiaa: {
    breadcrumb: "Stand builder for FIAA",
    title: "Stand builder for FIAA (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for FIAA, IFEMA Madrid",
    introText: "We build custom stands for FIAA from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for FIAA: what this show demands</h2>\n        <p>FIAA is the international bus and coach show at IFEMA. The vehicle leads, so we build platforms and access ramps around twelve-metre buses, component displays and a meeting area overlooking the fleet.</p>\n        <h2>Stand builder for FIAA: what we build</h2>\n        <ul>\n          <li><strong>Platforms and ramps.</strong> So visitors can step inside.</li>\n          <li><strong>Component displays.</strong> Seats, HVAC and onboard systems.</li>\n          <li><strong>Meeting area.</strong> Overlooking the vehicles.</li>\n        </ul>\n        <h2>Stand builder for FIAA: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-global-mobility-call-madrid\">Global Mobility Call</a>, <a href=\"/en/ferias/stands-intersicop-madrid\">InterSICOP</a> and <a href=\"/en/ferias/stand-hygienalia-madrid\">Hygienalia</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-fiaa-madrid\">stands for FIAA</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your FIAA stand</a></p>"
  },
  constructor_stand_global_mobility_call: {
    breadcrumb: "Stand builder for Global Mobility Call",
    title: "Stand builder for Global Mobility Call (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Global Mobility Call, IFEMA Madrid",
    introText: "We build custom stands for Global Mobility Call from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Global Mobility Call: what this show demands</h2>\n        <p>Global Mobility Call is the sustainable mobility congress and exhibition at IFEMA. We build stands with an in-stand talk area, space for light vehicles and chargers, and meeting areas for public and private players.</p>\n        <h2>Stand builder for Global Mobility Call: what we build</h2>\n        <ul>\n          <li><strong>Talk area.</strong> Stage and screen inside the stand.</li>\n          <li><strong>Light-vehicle space.</strong> Bikes, scooters and chargers.</li>\n          <li><strong>Institutional area.</strong> Public-private meetings.</li>\n        </ul>\n        <h2>Stand builder for Global Mobility Call: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-motortec-madrid\">Motortec</a>, <a href=\"/en/ferias/stand-fitur-madrid\">FITUR</a> and <a href=\"/en/ferias/stand-advanced-manufacturing-madrid\">Advanced Manufacturing Madrid</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-global-mobility-call-madrid\">stands for Global Mobility Call</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Global Mobility Call stand</a></p>"
  },
  constructor_stand_motortec: {
    breadcrumb: "Stand builder for Motortec",
    title: "Stand builder for Motortec (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for Motortec, IFEMA Madrid",
    introText: "We build custom stands for Motortec from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for Motortec: what this show demands</h2>\n        <p>Motortec is IFEMA's automotive aftermarket show: parts, workshop equipment, diagnostics and tyres. We build workshop-style stands with reinforced floors for lifts and vehicles, diagnostic stations and parts shelving by family.</p>\n        <h2>Stand builder for Motortec: what we build</h2>\n        <ul>\n          <li><strong>Workshop area.</strong> Reinforced floor for lifts.</li>\n          <li><strong>Diagnostic stations.</strong> Benches with power and screens.</li>\n          <li><strong>Parts shelving.</strong> Range organised by family.</li>\n        </ul>\n        <h2>Stand builder for Motortec: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stands-matelec-madrid\">MATELEC</a>, <a href=\"/en/ferias/stand-fruit-attraction-madrid\">Fruit Attraction</a> and <a href=\"/en/ferias/stand-hip-madrid\">HIP</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stand-motortec-madrid\">stands for Motortec</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your Motortec stand</a></p>"
  },
  constructor_stand_matelec: {
    breadcrumb: "Stand builder for MATELEC",
    title: "Stand builder for MATELEC (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for MATELEC, IFEMA Madrid",
    introText: "We build custom stands for MATELEC from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for MATELEC: what this show demands</h2>\n        <p>MATELEC is the electrical and electronic equipment show: cable, lighting, automation and EV charging. We build demo panels with real installations, darkened lighting rooms and technical counters with power.</p>\n        <h2>Stand builder for MATELEC: what we build</h2>\n        <ul>\n          <li><strong>Installation panels.</strong> Switchgear running live.</li>\n          <li><strong>Lighting room.</strong> Darkened area to compare luminaires.</li>\n          <li><strong>Charging points.</strong> Live chargers for demos.</li>\n        </ul>\n        <h2>Stand builder for MATELEC: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stands-sima-madrid\">SIMA</a>, <a href=\"/en/ferias/stand-sicur-madrid\">SICUR</a> and <a href=\"/en/ferias/stand-meat-attraction-madrid\">Meat Attraction</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stands-matelec-madrid\">stands for MATELEC</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your MATELEC stand</a></p>"
  },
  constructor_stand_sima: {
    breadcrumb: "Stand builder for SIMA",
    title: "Stand builder for SIMA (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for SIMA, IFEMA Madrid",
    introText: "We build custom stands for SIMA from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for SIMA: what this show demands</h2>\n        <p>SIMA is Madrid's real-estate show for home buyers: developers and banks present new-build projects and financing. We build lit model plinths, seated sales desks and screens for virtual tours.</p>\n        <h2>Stand builder for SIMA: what we build</h2>\n        <ul>\n          <li><strong>Model plinths.</strong> Lit and protected.</li>\n          <li><strong>Sales desks.</strong> Seated attention for buyers.</li>\n          <li><strong>Promotion screens.</strong> Infographics and virtual tours.</li>\n        </ul>\n        <h2>Stand builder for SIMA: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stands-intersicop-madrid\">InterSICOP</a>, <a href=\"/en/ferias/stand-salon-look-madrid\">Salón Look</a> and <a href=\"/en/ferias/stand-arcomadrid\">ARCOmadrid</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stands-sima-madrid\">stands for SIMA</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your SIMA stand</a></p>"
  },
  constructor_stand_intersicop: {
    breadcrumb: "Stand builder for InterSICOP",
    title: "Stand builder for InterSICOP (IFEMA Madrid) | Own workshop | Standarte",
    h1: "Stand builder for InterSICOP, IFEMA Madrid",
    introText: "We build custom stands for InterSICOP from our workshop in San Fernando de Henares, about 10 km from IFEMA: structure, joinery, furniture and graphics made and installed by our own team.",
    body: "\n        <h2>Stand builder for InterSICOP: what this show demands</h2>\n        <p>InterSICOP is IFEMA's bakery, pastry, ice-cream and coffee show. Exhibitors bake and serve live, so we build demo bakeries with three-phase power, water and extraction, tasting counters with chilled displays and ingredient storage.</p>\n        <h2>Stand builder for InterSICOP: what we build</h2>\n        <ul>\n          <li><strong>Demo bakery.</strong> Power, water and extraction for ovens.</li>\n          <li><strong>Tasting counter.</strong> Chilled display and service surface.</li>\n          <li><strong>Ingredient store.</strong> Closed and out of sight.</li>\n        </ul>\n        <h2>Stand builder for InterSICOP: and for the rest of IFEMA</h2>\n        <p>The same workshop builds for other shows at the venue, such as <a href=\"/en/ferias/stand-fitur-madrid\">FITUR</a>, <a href=\"/en/ferias/stand-veteco-madrid\">Veteco</a> and <a href=\"/en/ferias/stand-salon-gourmets-madrid\">Salón Gourmets</a>. Dates and the full design-and-build service are on the <a href=\"/en/ferias/stands-intersicop-madrid\">stands for InterSICOP</a> page, and the city service at <a href=\"/en/stand_builder_madrid\">stand builder in Madrid</a>.</p>\n        <p><a class=\"oro-cta-espacio\" href=\"#contact\">Request a quote for your InterSICOP stand</a></p>"
  },
  constructor_stand_smopyc: {
    breadcrumb: "Stand builder for SMOPYC",
    title: "Stand builder for SMOPYC (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for SMOPYC, Zaragoza",
    introText: "We build custom stands for SMOPYC, the International Show for Public Works, Construction and Mining Machinery at Feria de Zaragoza, from our own workshop: structure, technical floors, joinery, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for SMOPYC: what building next to construction machinery demands</h2>\n        <p>At SMOPYC the stand shares the hall with excavators, cranes, crushing plants and trucks that weigh tens of tonnes. The builder's first job is not aesthetic: it is deciding where each machine rests, which part of the floor is reinforced and where power runs so equipment can start up in a demo without cables in sight.</p>\n        <p>The second constraint is scale. Next to a six-metre machine, a catalogue counter disappears. We build gantries, brand towers and large-format graphics that read from across the hall and, on outdoor plots, braced structures that stand up to Zaragoza's Cierzo wind for the whole show.</p>\n        <h2>Stand builder for SMOPYC: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Real measurements of the indoor or outdoor plot, clear height, loading access and the weight and turning radius of the machines you will exhibit.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Structure, floor reinforcement, bracing and cutting list resolved before anything is cut.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here, not between machines in the hall.</li>\n          <li><strong>Installation sequenced with your machinery.</strong> Our own team builds the stand and coordinates equipment entry with the venue, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> SMOPYC is triennial; we keep the reusable structure for the next edition.</li>\n        </ol>\n        <h2>Stand builder for SMOPYC: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a> and <a href=\"/en/ferias/stands-figan-feria-zaragoza\">FIGAN</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-smopyc-zaragoza\">stands for SMOPYC</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_smagua: {
    breadcrumb: "Stand builder for SMAGUA",
    title: "Stand builder for SMAGUA (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for SMAGUA, Zaragoza",
    introText: "We build custom stands for SMAGUA, the International Water and Environment Show at Feria de Zaragoza, from our own workshop: structure, joinery, live water demonstration circuits, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for SMAGUA: what building for the water sector demands</h2>\n        <p>SMAGUA exhibits pumps, valves, desalination membranes, compact treatment plants and piping, and many exhibitors want them running. That turns the builder into an installer: water supply and drainage agreed with the venue, closed circuits with a hidden tank, watertight trays under the equipment and floors that survive a splash on day two.</p>\n        <p>The show is also institutional: public bodies, engineering firms and utilities visit by appointment. So we build real meeting areas — table, seats, screen — and keep the technical display at the front of the stand.</p>\n        <h2>Stand builder for SMAGUA: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, clear height, available water and drainage points and the equipment to be shown running.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Structure, demonstration circuit, power and cutting list resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and leak-tested pre-assembly in our workshop.</strong> Circuits are tested here; in the hall they are only connected.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> SMAGUA is biennial; we keep the reusable parts for the next edition.</li>\n        </ol>\n        <h2>Stand builder for SMAGUA: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-figan-feria-zaragoza\">FIGAN</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-smagua-zaragoza\">stands for SMAGUA</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_aratur: {
    breadcrumb: "Stand builder for Aratur",
    title: "Stand builder for Aratur (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for Aratur, Zaragoza",
    introText: "We build custom stands for Aratur, the Aragon Tourism Show at Feria de Zaragoza, from our own workshop: destination scenography, information counters, tasting areas and large-format graphics made by our team.",
    body: "\n        <h2>Stand builder for Aratur: what building for a consumer show demands</h2>\n        <p>Aratur mixes trade visitors with thousands of families choosing their next holiday. A destination stand has to tell a place in three seconds and survive three days of crowds, brochures and queues. We build solid scenography, not set dressing: protected edges, floors that take thousands of footsteps and graphics at standing eye level.</p>\n        <p>Destinations usually share the stand with their businesses — hotels, wineries, agencies — and each needs its own corner without breaking the shared image. We solve that in joinery: individual counters, a shared store and a tasting or activity area in the middle that draws the public in.</p>\n        <h2>Stand builder for Aratur: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, number of co-exhibitors, tasting needs and expected peak-hour traffic.</li>\n          <li><strong>Design and 3D prototype.</strong> Scenography, counters, circulation and graphics resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> No surprises in the hall.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> Aratur is annual; we keep the reusable scenography and renew only the campaign graphics.</li>\n        </ol>\n        <h2>Stand builder for Aratur: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-aratur-zaragoza\">stands for Aratur</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_expofimer: {
    breadcrumb: "Stand builder for EXPOFIMER",
    title: "Stand builder for EXPOFIMER (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for EXPOFIMER, Zaragoza",
    introText: "We build custom stands for EXPOFIMER, the International Renewable Energy Maintenance Fair at Feria de Zaragoza, from our own workshop: structure, joinery, mounts for modules and components, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for EXPOFIMER: what building for renewable O&amp;M demands</h2>\n        <p>EXPOFIMER is a show for technicians: maintenance companies, component makers, inspection drones and instrumentation. What is shown is small and precise — an open inverter, a thermal camera, a blade section — and the stand has to put it at hand height, well lit, with power where it is needed.</p>\n        <p>It is also a two-day show with a tight meeting agenda, so the front becomes a demonstration bench and the back a conversation area with seating, table and storage for samples and technical documents, all built in joinery.</p>\n        <h2>Stand builder for EXPOFIMER: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, power needed for live equipment and the parts you will exhibit.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Benches, mounts, wiring and cutting list resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and wired pre-assembly in our workshop.</strong> In the hall it is only connected.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> EXPOFIMER is annual; we keep the structure and renew only the graphics.</li>\n        </ol>\n        <h2>Stand builder for EXPOFIMER: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-expofimer-zaragoza\">stands for EXPOFIMER</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_spaper: {
    breadcrumb: "Stand builder for SPAPER",
    title: "Stand builder for SPAPER (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for SPAPER, Zaragoza",
    introText: "We build custom stands for SPAPER, the International Show for Pulp, Paper and Board Machinery and Equipment at Feria de Zaragoza, from our own workshop: structure, joinery, sample mounts, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for SPAPER: what building for the paper industry demands</h2>\n        <p>SPAPER gathers makers of machinery, forming fabrics, felts, rolls, control systems and chemicals for pulp, paper, tissue and board mills. Much of what is shown are process parts that only make sense mounted at their real scale and properly lit. We build specific mounts for each sample and keep the rest of the stand clear for technical conversation.</p>\n        <p>The show runs alongside SMAGUA in the same venue, which fills the aisles and the loading docks. Planning the build in advance — unloading slot, entry sequence, full prefabrication — is what gets a technical stand ready before the opening.</p>\n        <h2>Stand builder for SPAPER: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, the samples and equipment you will exhibit and the power any live demo needs.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Structure, sample mounts, lighting and cutting list resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here, not in the hall.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it in the booked unloading slot, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> SPAPER is biennial; we keep the reusable parts for the next edition.</li>\n        </ol>\n        <h2>Stand builder for SPAPER: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-spaper-zaragoza\">stands for SPAPER</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_fima: {
    breadcrumb: "Stand builder for FIMA",
    title: "Stand builder for FIMA (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for FIMA, Zaragoza",
    introText: "We build custom stands for FIMA, the International Agricultural Machinery Fair at Feria de Zaragoza, from our own workshop: structure, technical floors, brand towers, joinery, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for FIMA: what building at Spain's largest farm machinery fair demands</h2>\n        <p>FIMA fills Feria de Zaragoza with tractors, combines, implements and irrigation systems that arrive on low-loaders and are placed by crane. The builder works at two scales at once: the floor, calculated and reinforced for each machine, and the hall, where the brand has to be seen above a four-metre combine. Towers, gantries and large-format graphics are the only way to exist here.</p>\n        <p>It is also a long show — five days and tens of thousands of trade visitors who sit down to negotiate. Stands that work at FIMA have a clear display floor and serious hospitality — sometimes on a second level — with bar, tables and storage built to last the whole run.</p>\n        <h2>Stand builder for FIMA: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Plot measurements, clear height, crane access and the weight and size of each machine.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Floors, tall structures, services and cutting list resolved before anything is cut.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here, not between low-loaders in the hall.</li>\n          <li><strong>Installation sequenced with the machinery.</strong> Our team builds the structure, makes way for the crane and closes the stand around the machines, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> FIMA is biennial; we keep the reusable structure and renew only the graphics.</li>\n        </ol>\n        <h2>Stand builder for FIMA: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a>, <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a> and <a href=\"/en/ferias/stands-figan-feria-zaragoza\">FIGAN</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-fima-zaragoza\">stands for FIMA</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_enomaq: {
    breadcrumb: "Stand builder for Enomaq",
    title: "Stand builder for Enomaq (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for Enomaq, Zaragoza",
    introText: "We build custom stands for Enomaq, the International Winery Machinery and Bottling Equipment Show at Feria de Zaragoza, from our own workshop: machine bases, technical floors, joinery, tasting area, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for Enomaq: what building for winery machinery demands</h2>\n        <p>Enomaq shows presses, destemmers, stainless tanks, bottling lines and labellers that many makers want running. The builder first solves what nobody sees: the concentrated weight of a full tank, water and compressed-air connections, drainage and power that can start a line without dimming the stand lights.</p>\n        <p>The visitor is a winemaker or production manager who stays to talk yields and taste the client's wine, so we build a tasting and meeting area with a washable counter, fridge and bottle storage, away from the machine noise but visible from the aisle.</p>\n        <h2>Stand builder for Enomaq: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, the machines that will run, their weight and the water, air and power they need.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Bases, technical floor, services and cutting list resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> In the hall only the machines are connected.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it and coordinates machinery entry, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> Enomaq is biennial; we keep structure and furniture for the next edition.</li>\n        </ol>\n        <h2>Stand builder for Enomaq: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-enomaq-zaragoza\">stands for Enomaq</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_oleomaq: {
    breadcrumb: "Stand builder for Oleomaq",
    title: "Stand builder for Oleomaq (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for Oleomaq, Zaragoza",
    introText: "We build custom stands for Oleomaq, the olive-mill machinery and equipment show at Feria de Zaragoza, from our own workshop: bases for milling lines, technical floors, joinery, oil-tasting area, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for Oleomaq: what building for the olive mill demands</h2>\n        <p>Oleomaq runs alongside Enomaq and shows mills, malaxers, decanters, tanks and oil bottling lines. A mill line takes linear metres and weight, and many makers want it turning: the builder calculates the floor, brings water and three-phase power to the exact point and plans the drainage so the demo does not end in a puddle.</p>\n        <p>Visitors are mills and cooperatives deciding season investments. The stand works when the machine is seen from the aisle and, two steps in, there is an oil-tasting table with neutral light and a quiet conversation. We build both in joinery and separate them with a store that also absorbs noise.</p>\n        <h2>Stand builder for Oleomaq: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, the line section or equipment you will show, weights and services needed.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Bases, technical floor, services and cutting list resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it and coordinates machinery entry, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> Oleomaq is biennial; we keep the reusable parts.</li>\n        </ol>\n        <h2>Stand builder for Oleomaq: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-oleomaq-zaragoza\">stands for Oleomaq</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_tecnovid: {
    breadcrumb: "Stand builder for Tecnovid",
    title: "Stand builder for Tecnovid (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for Tecnovid, Zaragoza",
    introText: "We build custom stands for Tecnovid, the International Vineyard Techniques and Equipment Show at Feria de Zaragoza, from our own workshop: platforms for vineyard machinery, joinery, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for Tecnovid: what building for vineyard machinery demands</h2>\n        <p>Tecnovid runs with Enomaq and Oleomaq and shows narrow tractors, grape harvesters, pre-pruners, sprayers and grape trailers: field machines that roll into the hall and are placed to the millimetre. The builder gives them room and floor — low platforms that lift them off the pavement — and builds around them without hiding the machine, which is the star.</p>\n        <p>Visitors are growers and winery technicians who look under the machine and ask about track width, so we build platforms accessible on four sides, technical graphics at eye level and a conversation area with seating and a glass of the house wine.</p>\n        <h2>Stand builder for Tecnovid: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Measurements at Feria de Zaragoza, the size and weight of each machine and its rolling route to position.</li>\n          <li><strong>Engineering and 3D prototype.</strong> Platforms, ramps, structure and lighting resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Adjustments happen here.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it, receives the machines and closes the stand, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> Tecnovid is biennial; we keep platforms and structure for the next edition.</li>\n        </ol>\n        <h2>Stand builder for Tecnovid: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-tecnovid-zaragoza\">stands for Tecnovid</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_salon_vinos_aragon: {
    breadcrumb: "Stand builder for the Aragon Wine Show",
    title: "Stand builder for the Aragon Wine Show (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for the Aragon Wine Show, Zaragoza",
    introText: "We build custom stands for the Salón de los Vinos de Aragón, the annual show of the Cariñena, Somontano, Campo de Borja and Calatayud wineries in Zaragoza, from our own workshop: tasting bars, bottle racks, joinery, furniture and graphics made by our team.",
    body: "\n        <h2>Stand builder for the Aragon Wine Show: what building for a tasting fair demands</h2>\n        <p>At a wine show the stand is first of all a bar: linear metres of washable counter, a fridge for the whites, a sink for the glasses and bottle racks within reach. We build that bar to the number of references and staff, with a closed store behind it, because a winery showing ten labels needs room for a hundred bottles nobody should see.</p>\n        <p>The second constraint is identity: in an aisle with thirty wineries, the one that stands out brings its landscape — Somontano stone, old Cariñena garnacha — translated into materials and light. We work exposed timber, textures and backlit graphics so the brand reads from afar and the conversation happens up close.</p>\n        <h2>Stand builder for the Aragon Wine Show: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Space measurements, references served, staff at the bar and expected traffic during open tasting hours.</li>\n          <li><strong>Design and 3D prototype.</strong> Bar, racks, store and lighting resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and pre-assembly in our workshop.</strong> Bar with sink and fridge, racks, furniture and graphics made by our team.</li>\n          <li><strong>Transport and installation.</strong> Our own team builds it, finished 24&nbsp;h before opening.</li>\n          <li><strong>Dismantling and storage.</strong> The show is annual; we keep bar and structure and renew only the vintage graphics.</li>\n        </ol>\n        <h2>Stand builder for the Aragon Wine Show: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-salon-vinos-aragon-zaragoza\">stands for the Aragon Wine Show</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
  },
  constructor_stand_enoforum: {
    breadcrumb: "Stand builder for Enoforum",
    title: "Stand builder for Enoforum (Zaragoza) | Own workshop | Standarte",
    h1: "Stand builder for Enoforum, Zaragoza",
    introText: "We build custom stands for Enoforum, the wine technology and innovation congress in its Zaragoza edition, from our own workshop: compact congress stands, demonstration benches, furniture and graphics made by our team and ready to set up in a few hours.",
    body: "\n        <h2>Stand builder for Enoforum: what building at a congress with an exhibition area demands</h2>\n        <p>Enoforum is a scientific congress with an exhibition area where wine-technology companies — analytics, yeasts, bioprotection, sensors, winery software — present to researchers and winemakers between sessions. Space is compact, set-up windows are measured in hours and the visitor has a fifteen-minute break: the stand must arrive prefabricated, lit and with the argument in plain sight.</p>\n        <p>We build high-finish congress modules that leave the workshop complete — graphics, furniture, screen and storage integrated — and go up in a morning, with a demonstration bench at working height and a corner for the booked meeting.</p>\n        <h2>Stand builder for Enoforum: how your stand is built</h2>\n        <ol>\n          <li><strong>Survey.</strong> Space measurements, available set-up window, the equipment or samples presented and the power needed.</li>\n          <li><strong>Design and 3D prototype.</strong> Module, bench, graphics and furniture resolved on the prototype you approve.</li>\n          <li><strong>Manufacturing and full pre-assembly in our workshop.</strong> The module leaves finished and wired; on site it is only placed and connected.</li>\n          <li><strong>Installation in hours.</strong> Our own team builds it within the assigned window, ready before the first coffee break.</li>\n          <li><strong>Dismantling and reuse.</strong> We keep the module for the next congress or wine fair.</li>\n        </ol>\n        <h2>Stand builder for Enoforum: and for the rest of Feria de Zaragoza</h2>\n        <p>The same workshop builds for the whole venue calendar: <a href=\"/en/ferias/stands-fima-zaragoza\">FIMA</a>, <a href=\"/en/ferias/stands-smopyc-zaragoza\">SMOPYC</a> and <a href=\"/en/ferias/stands-smagua-zaragoza\">SMAGUA</a>. The event page — dates, sectors and the full design-and-build service — is at <a href=\"/en/ferias/stands-enoforum-zaragoza\">stands for Enoforum</a>, and the city service at <a href=\"/en/stand_builder_zaragoza\">stand builder in Zaragoza</a>.</p>"
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
        <p>The same workshop builds across the venue calendar: <a href="/en/ferias/stands-subcontratacion-bilbao">Subcontratación</a>, <a href="/en/ferias/stand-addit3d-bilbao">Addit3D</a>, <a href="/en/ferias/stands-pumps-valves-bilbao">Pumps &amp; Valves</a>, <a href="/en/ferias/stands-maintenance-bilbao">Maintenance</a> and <a href="/en/ferias/stand-bedigital-bilbao">BeDigital</a>, the shows that share the <a href="/en/ferias/stand-plus-industry-bilbao">+Industry</a> platform. The event page — dates, sectors and the full design-and-build service — is at <a href="/en/ferias/stands-biemh-bilbao-bec">stands for BIEMH</a>, and the city service at <a href="/en/stand_builder_bilbao">stand builder in Bilbao</a>.</p>
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
        <p>We build across the FYCMA calendar: <a href="/en/ferias/stand-des-malaga">DES</a>, <a href="/en/ferias/stand-ht-malaga">H&amp;T</a>, <a href="/en/ferias/stand-simed-malaga">Simed</a>, <a href="/en/ferias/stand-expo-agritech-malaga">Expo AgriTech</a>, <a href="/en/ferias/stands-talent-land-malaga">Talent Land España</a> and <a href="/en/ferias/stand-san-diego-comic-con-malaga">San Diego Comic-Con Málaga</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_malaga">stand design and installation in Málaga</a> page.</p>
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
        <p>We build across the FIBES calendar: <a href="/en/ferias/stands-sicab-sevilla">SICAB</a>, <a href="/en/ferias/stands-simof-sevilla">SIMOF</a>, <a href="/en/ferias/stand-fireca-sevilla">Fireca</a>, <a href="/en/ferias/stand-mmh-sevilla">MMH – Mining and Minerals Hall</a>, <a href="/en/ferias/stand-tis-sevilla">Tourism Innovation Summit</a> and <a href="/en/ferias/stand-autentica-sevilla">Auténtica</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_seville">stand design and installation in Seville</a> page.</p>
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
        <h2>Stand builder in Valencia: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-beauty-forum-valencia">Beauty Forum Valencia</a>, <a href="/en/ferias/stand-cevisama-valencia">Cevisama</a>, <a href="/en/ferias/stand-habitat-valencia">Feria Hábitat València</a>, <a href="/en/ferias/stand-textilhogar-valencia">Textilhogar</a>, <a href="/en/ferias/stand-espacio-cocina-sici-valencia">Espacio Cocina SICI</a>, <a href="/en/ferias/stand-fimma-maderalia-valencia">Fimma + Maderalia</a>, <a href="/en/ferias/stand-iberflora-valencia">Iberflora</a> and <a href="/en/ferias/stand-gastronoma-valencia">Gastrónoma</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_valencia">stand design and installation in Valencia</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Valencia</a></p>`
  },
  constructor_stand_valladolid: {
    breadcrumb: 'Stand builder in Valladolid',
    title: 'Stand builder in Valladolid | Own workshop | Standarte',
    h1: 'Stand builder in Valladolid',
    introText: "We build custom stands for Feria de Valladolid from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Valladolid: in-house manufacturing for Feria de Valladolid</h2>
        <p>Feria de Valladolid alternates public shows such as INTUR with technical fairs for farm machinery and poultry, and each calls for a different build: graphics and a walk-through for the strolling visitor, reinforced floor and services for the equipment shown running. We handle both from the same workshop and with the same installation crew.</p>
        <h2>Stand builder in Valladolid: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-intur-valladolid">INTUR</a>, <a href="/en/ferias/stand-fine-valladolid">FINE Valladolid</a>, <a href="/en/ferias/stand-technology-show-valladolid">Technology Show Valladolid</a>, <a href="/en/ferias/stand-feria-artesania-valladolid">Feria de Artesanía de Valladolid</a>, <a href="/en/ferias/stand-agraria-valladolid">AGRARIA</a>, <a href="/en/ferias/stand-agrovid-valladolid">AGROVID</a>, <a href="/en/ferias/stand-aviforum-valladolid">aviFORUM</a> and <a href="/en/ferias/stand-fimascota-valladolid">FIMASCOTA</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_valladolid">stand design and installation in Valladolid</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Valladolid</a></p>`
  },
  constructor_stand_alicante: {
    breadcrumb: 'Stand builder in Alicante',
    title: 'Stand builder in Alicante | Own workshop | Standarte',
    h1: 'Stand builder in Alicante',
    introText: "We build custom stands for IFA – Institución Ferial Alicantina (Elche) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Alicante: in-house manufacturing for IFA – Institución Ferial Alicantina (Elche)</h2>
        <p>The province’s exhibition centre, IFA, sits in Elche, while Alicante city hosts the congresses and the food events of the capital. We build for both settings: a fair stand with storage and counter for several days, or a congress stand that goes up in a morning and comes down the same night.</p>
        <h2>Stand builder in Alicante: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-alicante-gastronomica">Alicante Gastronómica</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_alicante">stand design and installation in Alicante</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Alicante</a></p>`
  },
  constructor_stand_elche: {
    breadcrumb: 'Stand builder in Elche',
    title: 'Stand builder in Elche | Own workshop | Standarte',
    h1: 'Stand builder in Elche',
    introText: "We build custom stands for IFA – Institución Ferial Alicantina from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Elche: in-house manufacturing for IFA – Institución Ferial Alicantina</h2>
        <p>Elche is the footwear capital and its venue, IFA, hosts fairs where the product is shown as a sample range and sold by collection. The stand needs display walls with shelving at hand height, light true to the colour of leather and a closed corner where the buyer sees the whole collection without the crowd; we make it all in our own joinery.</p>
        <h2>Stand builder in Elche: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-futurmoda-elche">Futurmoda</a> and <a href="/en/ferias/stand-firauto-elche">Firauto</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_elche">stand design and installation in Elche</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Elche</a></p>`
  },
  constructor_stand_murcia: {
    breadcrumb: 'Stand builder in Murcia',
    title: 'Stand builder in Murcia | Own workshop | Standarte',
    h1: 'Stand builder in Murcia',
    introText: "We build custom stands for IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Murcia: in-house manufacturing for IFEPA – Institución Ferial de la Región de Murcia (Torre Pacheco)</h2>
        <p>The Region’s venue is in Torre Pacheco and its calendar is agricultural and industrial: machinery, irrigation, fruit and vegetables, construction. These are fairs of heavy product and real samples, so we build with technical flooring, calculated reinforcement and planned services, and bring the stand pre-assembled from our workshop.</p>
        <h2>Stand builder in Murcia: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fame-innowa-torre-pacheco">FAME Innowa</a>, <a href="/en/ferias/stand-equimur-torre-pacheco">EQUIMUR</a>, <a href="/en/ferias/stand-hortifruit-torre-pacheco">HortiFruit</a> and <a href="/en/ferias/stand-fecons-torre-pacheco">FECONS</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_murcia">stand design and installation in Murcia</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Murcia</a></p>`
  },
  constructor_stand_salamanca: {
    breadcrumb: 'Stand builder in Salamanca',
    title: 'Stand builder in Salamanca | Own workshop | Standarte',
    h1: 'Stand builder in Salamanca',
    introText: "We build custom stands for Recinto Ferial de Salamanca from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Salamanca: in-house manufacturing for Recinto Ferial de Salamanca</h2>
        <p>Salamanca’s exhibition centre is a livestock and machinery venue: SALAMAQ fills the yards and halls with animals, tractors and implements. A stand here is built for covered outdoor conditions and the traffic of mud and cattle, with washable materials, solid structure and a clean space to sit down and negotiate.</p>
        <h2>Stand builder in Salamanca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-salamaq-salamanca">SALAMAQ</a>, <a href="/en/ferias/stand-salon-automovil-salamanca">Salón del Automóvil de Salamanca</a> and <a href="/en/ferias/stand-congreso-alineadores-salamanca">Congreso Internacional de Alineadores</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_salamanca">stand design and installation in Salamanca</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Salamanca</a></p>`
  },
  constructor_stand_coruna: {
    breadcrumb: 'Stand builder in A Coruña',
    title: 'Stand builder in A Coruña | Own workshop | Standarte',
    h1: 'Stand builder in A Coruña',
    introText: "We build custom stands for ExpoCoruña y Palexco from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in A Coruña: in-house manufacturing for ExpoCoruña y Palexco</h2>
        <p>A Coruña splits its events between ExpoCoruña, a column-free hall with generous height, and Palexco, the congress centre on the harbour: the first admits double-decker stands and heavy product; the second calls for light builds that fit through the congress entrance and go up in a few hours. We make both versions in our own workshop.</p>
        <h2>Stand builder in A Coruña: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-forum-gastronomico-a-coruna">Galicia Fórum Gastronómico</a>, <a href="/en/ferias/stand-mundos-digitales-a-coruna">Mundos Digitales</a> and <a href="/en/ferias/stand-biocultura-a-coruna">BioCultura A Coruña</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_a_coruna">stand design and installation in A Coruña</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in A Coruña</a></p>`
  },
  constructor_stand_santiago: {
    breadcrumb: 'Stand builder in Santiago de Compostela',
    title: 'Stand builder in Santiago de Compostela | Own workshop | Standarte',
    h1: 'Stand builder in Santiago de Compostela',
    introText: "We build custom stands for Palacio de Congresos e Exposicións de Galicia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santiago de Compostela: in-house manufacturing for Palacio de Congresos e Exposicións de Galicia</h2>
        <p>In Santiago the venue is a congress centre, and that shapes the build: compact stands, no heavy work, graphics applied in the workshop and an installation that respects the building’s floors and walls. We arrive with numbered parts and a rehearsed stand, because a congress build-up window is counted in hours.</p>
        <h2>Stand builder in Santiago de Compostela: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fairway-santiago-de-compostela">Fairway Santiago de Compostela</a>, <a href="/en/ferias/stand-maker-faire-galicia-santiago-de-compostela">Maker Faire Galicia Santiago de Compostela</a>, <a href="/en/ferias/stand-gedet-santiago-de-compostela">GEDET Santiago de Compostela</a>, <a href="/en/ferias/stand-semergen-santiago-de-compostela">Congreso SEMERGEN Santiago de Compostela</a>, <a href="/en/ferias/stand-sesmi-santiago-de-compostela">SESMI Santiago de Compostela</a> and <a href="/en/ferias/stand-galicia-escena-pro-santiago-de-compostela">Galicia Escena PRO</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santiago_de_compostela">stand design and installation in Santiago de Compostela</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Santiago de Compostela</a></p>`
  },
  constructor_stand_vigo: {
    breadcrumb: 'Stand builder in Vigo',
    title: 'Stand builder in Vigo | Own workshop | Standarte',
    h1: 'Stand builder in Vigo',
    introText: "We build custom stands for IFEVI – Instituto Ferial de Vigo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Vigo: in-house manufacturing for IFEVI – Instituto Ferial de Vigo</h2>
        <p>IFEVI, in Cotogrande, hosts Conxemar and Navalia: frozen seafood and shipbuilding, two sectors that exhibit heavy equipment and industrial cold. We build stands with reinforced floors, high-power electrical services planned in advance and surfaces cleaned daily, made in our workshop and installed by our own crew.</p>
        <h2>Stand builder in Vigo: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-conxemar-vigo">Conxemar Vigo</a>, <a href="/en/ferias/stand-navalia-vigo">Navalia</a>, <a href="/en/ferias/stand-nortrans-vigo">Nortrans</a> and <a href="/en/ferias/stand-mindtech-vigo">Mindtech</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_vigo">stand design and installation in Vigo</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Vigo</a></p>`
  },
  constructor_stand_ourense: {
    breadcrumb: 'Stand builder in Ourense',
    title: 'Stand builder in Ourense | Own workshop | Standarte',
    h1: 'Stand builder in Ourense',
    introText: "We build custom stands for Expourense from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ourense: in-house manufacturing for Expourense</h2>
        <p>Expourense hosts Xantar and Termatalia, two tasting and experience fairs: here the stand has a kitchen or service area, water and extraction, and a counter where the visitor tries the product. We build it with washable surfaces and a real back room, not a folding screen, so the service works for four straight days.</p>
        <h2>Stand builder in Ourense: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-xantar-ourense">Xantar</a> and <a href="/en/ferias/stand-termatalia-ourense">Termatalia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ourense">stand design and installation in Ourense</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Ourense</a></p>`
  },
  constructor_stand_silleda: {
    breadcrumb: 'Stand builder in Silleda',
    title: 'Stand builder in Silleda | Own workshop | Standarte',
    h1: 'Stand builder in Silleda',
    introText: "We build custom stands for Feira Internacional de Galicia ABANCA from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Silleda: in-house manufacturing for Feira Internacional de Galicia ABANCA</h2>
        <p>The Feira Internacional de Galicia, in Silleda, is a countryside venue: Semana Verde mixes livestock, machinery and the general public, and Turexpo brings destinations and hotels. We build stands that withstand thousands of weekend visitors, with solid structure, hard-wearing graphics and a lockable store.</p>
        <h2>Stand builder in Silleda: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-semana-verde-galicia-silleda">Semana Verde de Galicia</a> and <a href="/en/ferias/stand-turexpo-galicia-silleda">Turexpo Galicia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_silleda">stand design and installation in Silleda</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Silleda</a></p>`
  },
  constructor_stand_gijon: {
    breadcrumb: 'Stand builder in Gijón',
    title: 'Stand builder in Gijón | Own workshop | Standarte',
    h1: 'Stand builder in Gijón',
    introText: "We build custom stands for Recinto Ferial Luis Adaro from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Gijón: in-house manufacturing for Recinto Ferial Luis Adaro</h2>
        <p>The Luis Adaro exhibition centre lives for FIDMA, the great trade fair of the Cantabrian coast: two weeks of continuous public, halls and outdoor areas. A stand for that fair is built to last, with materials that show no wear after fifteen days and a layout that spreads the flow without bottlenecks.</p>
        <h2>Stand builder in Gijón: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fidma-gijon">FIDMA – Feria Internacional de Muestras de Asturias</a>, <a href="/en/ferias/stand-agropec-gijon">AGROPEC Gijón</a>, <a href="/en/ferias/stand-salon-competicion-asturias-gijon">Salón de Competición de Asturias</a>, <a href="/en/ferias/stand-asturforesta-tineo">Asturforesta</a>, <a href="/en/ferias/stand-feria-muestras-tineo">Feria de Muestras de Tineo</a> and <a href="/en/ferias/stand-agroalimentaria-vegadeo">Feria Agroalimentaria de Vegadeo</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_gijon">stand design and installation in Gijón</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Gijón</a></p>`
  },
  constructor_stand_santander: {
    breadcrumb: 'Stand builder in Santander',
    title: 'Stand builder in Santander | Own workshop | Standarte',
    h1: 'Stand builder in Santander',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Santander from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santander: in-house manufacturing for Palacio de Exposiciones y Congresos de Santander</h2>
        <p>Santander’s exhibition centre hosts art, organic and motor fairs, and Torrelavega’s national cattle market adds agricultural events. We build for both venues from the same workshop: clean walls and careful lighting for artwork, floor and vehicle access for cars or machinery.</p>
        <h2>Stand builder in Santander: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-artesantander">ARTESANTANDER</a>, <a href="/en/ferias/stand-biocantabria-santander">BioCantabria</a>, <a href="/en/ferias/stand-feria-apicola-cantabria-torrelavega">Feria Nacional Apícola de Cantabria</a> and <a href="/en/ferias/stand-feria-concesionarios-torrelavega">Feria de Concesionarios de Torrelavega</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santander">stand design and installation in Santander</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Santander</a></p>`
  },
  constructor_stand_irun: {
    breadcrumb: 'Stand builder in Irún',
    title: 'Stand builder in Irún | Own workshop | Standarte',
    h1: 'Stand builder in Irún',
    introText: "We build custom stands for Ficoba – Feria de Muestras de Gipuzkoa from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Irún: in-house manufacturing for Ficoba – Feria de Muestras de Gipuzkoa</h2>
        <p>Ficoba, on the Bidasoa border, concentrates mobility, industry and organics: MUBIL shows vehicles and chargers in operation, and Bioterra product to touch and taste. We build with high-power electrical services planned, vehicle-grade flooring and tasting furniture made in our own workshop.</p>
        <h2>Stand builder in Irún: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-mubil-mobility-expo-irun">MUBIL Mobility Expo</a>, <a href="/en/ferias/stand-unire-irun">UNIRE</a>, <a href="/en/ferias/stand-bioterra-irun">Bioterra</a>, <a href="/en/ferias/stand-caravantur-irun">Caravantur</a>, <a href="/en/ferias/stand-uhinak-irun">Uhinak</a> and <a href="/en/ferias/stand-go-mobility-irun">Go Mobility</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_irun">stand design and installation in Irún</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Irún</a></p>`
  },
  constructor_stand_vitoria: {
    breadcrumb: 'Stand builder in Vitoria',
    title: 'Stand builder in Vitoria | Own workshop | Standarte',
    h1: 'Stand builder in Vitoria',
    introText: "We build custom stands for Palacio de Congresos Europa y recintos de Álava from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Vitoria: in-house manufacturing for Palacio de Congresos Europa y recintos de Álava</h2>
        <p>Vitoria-Gasteiz spreads its fairs between the Europa Congress Centre and the exhibition spaces of Álava: jobs, training, wine and retail. These are one-to-three-day events with build-up in hours, so the stand arrives pre-assembled from our workshop, graphics applied and furniture ready to place.</p>
        <h2>Stand builder in Vitoria: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-ardoaraba-vitoria">Ardoaraba</a>, <a href="/en/ferias/stand-avanza-fp-alava-vitoria">AVANZA – Feria de FP de Álava</a>, <a href="/en/ferias/stand-empleo-gune-vitoria">Empleo Gune</a>, <a href="/en/ferias/stand-feria-stocks-vitoria">Feria de Stocks</a> and <a href="/en/ferias/stand-lanberri-vitoria">Lanberri</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_vitoria">stand design and installation in Vitoria</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Vitoria</a></p>`
  },
  constructor_stand_pamplona: {
    breadcrumb: 'Stand builder in Pamplona',
    title: 'Stand builder in Pamplona | Own workshop | Standarte',
    h1: 'Stand builder in Pamplona',
    introText: "We build custom stands for Baluarte y recintos feriales de Navarra from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Pamplona: in-house manufacturing for Baluarte y recintos feriales de Navarra</h2>
        <p>Pamplona holds its fairs at Baluarte, the congress centre, and at the Navarre exhibition venues: tourism, construction, jobs and wine. In a congress centre you cannot build on site: we make light, self-supporting stands, built entirely in the workshop, that anchor without damaging the building and come out in one night.</p>
        <h2>Stand builder in Pamplona: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-navartur-pamplona">NAVARTUR</a>, <a href="/en/ferias/stand-salon-estudiante-futuro-profesional-pamplona">Salón del Estudiante y Futuro Profesional</a>, <a href="/en/ferias/stand-edifica-pamplona">EDIFICA</a>, <a href="/en/ferias/stand-navarra-jobs-pamplona">Navarra Jobs</a>, <a href="/en/ferias/stand-feria-navarra-ecologica-pamplona">Feria Navarra Ecológica</a>, <a href="/en/ferias/stand-navarra-wine-gastronomy-pamplona">Navarra Wine & Gastronomy</a> and <a href="/en/ferias/stand-feria-turismo-reyno-navarra-pamplona">Feria Internacional de Turismo Reyno de Navarra</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_pamplona">stand design and installation in Pamplona</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Pamplona</a></p>`
  },
  constructor_stand_logrono: {
    breadcrumb: 'Stand builder in Logroño',
    title: 'Stand builder in Logroño | Own workshop | Standarte',
    h1: 'Stand builder in Logroño',
    introText: "We build custom stands for Riojaforum y recintos feriales de La Rioja from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Logroño: in-house manufacturing for Riojaforum y recintos feriales de La Rioja</h2>
        <p>Logroño is wine: at Riojaforum and the Rioja venues bottles are tasted and distribution deals closed. We build winery stands with a tasting bar at the right height, a lit bottle display that does not warm the wine, refrigeration for the whites and a private corner for the meeting with the importer.</p>
        <h2>Stand builder in Logroño: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-rioja-wine-trade-mission-logrono">Rioja Wine Trade Mission</a>, <a href="/en/ferias/stand-planeta-rioja-logrono">Planeta Rioja</a>, <a href="/en/ferias/stand-feria-formacion-profesional-la-rioja-logrono">Feria de Formación Profesional de La Rioja</a>, <a href="/en/ferias/stand-feria-vehiculo-ocasion-logrono">Feria del Vehículo de Ocasión de Logroño</a>, <a href="/en/ferias/stand-feria-maquinaria-agricola-alfaro">Feria de Maquinaria Agrícola de Alfaro</a> and <a href="/en/ferias/stand-ferias-agroalimentarias-rioja-oriental-calahorra">Ferias Agroalimentarias de la Rioja Oriental</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_logrono">stand design and installation in Logroño</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Logroño</a></p>`
  },
  constructor_stand_lleida: {
    breadcrumb: 'Stand builder in Lleida',
    title: 'Stand builder in Lleida | Own workshop | Standarte',
    h1: 'Stand builder in Lleida',
    introText: "We build custom stands for Fira de Lleida from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Lleida: in-house manufacturing for Fira de Lleida</h2>
        <p>Fira de Lleida is the north-east’s agricultural venue: the Fira de Sant Miquel shows machinery and Municipàlia equipment for town councils. We build stands that take a tractor inside and a service counter beside it, with technical flooring, large-format graphics and a lockable store for materials.</p>
        <h2>Stand builder in Lleida: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-municipalia-lleida">Municipàlia Lleida</a> and <a href="/en/ferias/stand-fira-sant-miquel-lleida">Fira de Sant Miquel Lleida</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_lleida">stand design and installation in Lleida</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Lleida</a></p>`
  },
  constructor_stand_girona: {
    breadcrumb: 'Stand builder in Girona',
    title: 'Stand builder in Girona | Own workshop | Standarte',
    h1: 'Stand builder in Girona',
    introText: "We build custom stands for Fira de Girona from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Girona: in-house manufacturing for Fira de Girona</h2>
        <p>Girona is top-tier gastronomy and its Fòrum Gastronòmic calls for live-cooking stands: water and power, extraction, a worktop at professional height and a tasting counter facing the aisle. Everything is made in our own workshop and arrives tested at the venue.</p>
        <h2>Stand builder in Girona: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-forum-gastronomic-girona">Fòrum Gastronòmic Girona</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_girona">stand design and installation in Girona</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Girona</a></p>`
  },
  constructor_stand_mallorca: {
    breadcrumb: 'Stand builder in Mallorca',
    title: 'Stand builder in Mallorca | Own workshop | Standarte',
    h1: 'Stand builder in Mallorca',
    introText: "We build custom stands for Palau de Congressos de Palma y Moll Vell from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Mallorca: in-house manufacturing for Palau de Congressos de Palma y Moll Vell</h2>
        <p>In Mallorca you exhibit on the quay: the Palma International Boat Show and the Superyacht Village build on the Moll Vell, with wind, salt and hand loading. We build stands for a harbour exterior — braced structure, marine materials, graphics that do not peel — and, at the Palau de Congressos, hospitality and local-product stands.</p>
        <h2>Stand builder in Mallorca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-palma-international-boat-show">Palma International Boat Show</a>, <a href="/en/ferias/stand-palma-superyacht-village">Palma Superyacht Village</a>, <a href="/en/ferias/stand-baleart-mallorca">Baleart</a>, <a href="/en/ferias/stand-dijous-bo-mallorca">Dijous Bo</a>, <a href="/en/ferias/stand-horeca-baleares-mallorca">HORECA Baleares Mallorca</a>, <a href="/en/ferias/stand-fira-vi-pollenca-mallorca">Fira del Vi de Pollença</a>, <a href="/en/ferias/stand-wine-days-binissalem-mallorca">Wine Days Mallorca – DO Binissalem</a> and <a href="/en/ferias/stand-fira-sipia-alcudia-mallorca">Fira de la Sípia</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_mallorca">stand design and installation in Mallorca</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Mallorca</a></p>`
  },
  constructor_stand_ibiza: {
    breadcrumb: 'Stand builder in Ibiza',
    title: 'Stand builder in Ibiza | Own workshop | Standarte',
    h1: 'Stand builder in Ibiza',
    introText: "We build custom stands for Recinto Ferial de Ibiza from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ibiza: in-house manufacturing for Recinto Ferial de Ibiza</h2>
        <p>Ibiza has boating, hospitality and retail fairs, and island logistics: everything arrives by ship and there is no margin for a forgotten part. We build the whole stand in the workshop, pre-assemble it and ship it with numbered parts and spares inside, to install without depending on a local supplier.</p>
        <h2>Stand builder in Ibiza: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-horeca-baleares-ibiza">HORECA Baleares Ibiza</a>, <a href="/en/ferias/stand-fira-mar-ibiza">Fira de la Mar</a> and <a href="/en/ferias/stand-feria-stocks-ibiza">Feria de Stocks de Ibiza</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ibiza">stand design and installation in Ibiza</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Ibiza</a></p>`
  },
  constructor_stand_menorca: {
    breadcrumb: 'Stand builder in Menorca',
    title: 'Stand builder in Menorca | Own workshop | Standarte',
    h1: 'Stand builder in Menorca',
    introText: "We build custom stands for Recintos feriales de Menorca from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Menorca: in-house manufacturing for Recintos feriales de Menorca</h2>
        <p>Menorca holds local-product, agri-food and hospitality fairs, with exhibitors bringing cheese, wine and cured meats to taste. We build stands with refrigerated counter, washable surfaces and a tasting bar, shipped from the mainland pre-assembled and with their spares.</p>
        <h2>Stand builder in Menorca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-horeca-baleares-menorca">HORECA Baleares Menorca</a>, <a href="/en/ferias/stand-fira-camp-alaior-menorca">Fira del Camp</a> and <a href="/en/ferias/stand-arrels-menorca">Arrels, Fira de Producte Local i Cuina de Menorca</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_menorca">stand design and installation in Menorca</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Menorca</a></p>`
  },
  constructor_stand_islas_canarias: {
    breadcrumb: 'Stand builder in the Canary Islands',
    title: 'Stand builder in the Canary Islands | Own workshop | Standarte',
    h1: 'Stand builder in the Canary Islands',
    introText: "We build custom stands for Recinto Ferial de Tenerife e Infecar (Gran Canaria) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in the Canary Islands: in-house manufacturing for Recinto Ferial de Tenerife e Infecar (Gran Canaria)</h2>
        <p>The Canaries have two main venues, in Santa Cruz de Tenerife and Las Palmas, and one logistics rule: the container leaves in advance and does not go back for what is missing. We build and pre-assemble the whole stand in the workshop, document it part by part and ship it with spares, so that installation on the island is just installation.</p>
        <h2>Stand builder in the Canary Islands: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feaga-fuerteventura">FEAGA</a>, <a href="/en/ferias/stand-gastrocanarias-tenerife">GastroCanarias</a>, <a href="/en/ferias/stand-gran-canaria-me-gusta">Gran Canaria Me Gusta</a>, <a href="/en/ferias/stand-canagua-energia-gran-canaria">Canagua & Energía</a>, <a href="/en/ferias/stand-fimar-las-palmas">FIMAR</a>, <a href="/en/ferias/stand-salon-atlantico-logistica-transporte">Salón Atlántico de Logística y Transporte</a>, <a href="/en/ferias/stand-moda-tenerife">Feria Internacional de Moda de Tenerife</a> and <a href="/en/ferias/stand-expodeca">ExpoDeca</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_canary_islands">stand design and installation in the Canary Islands</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in the Canary Islands</a></p>`
  },
  constructor_stand_ceuta: {
    breadcrumb: 'Stand builder in Ceuta',
    title: 'Stand builder in Ceuta | Own workshop | Standarte',
    h1: 'Stand builder in Ceuta',
    introText: "We build custom stands for Palacio de Congresos de Ceuta from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ceuta: in-house manufacturing for Palacio de Congresos de Ceuta</h2>
        <p>Ceuta exhibits at its Congress Centre and in city spaces: blue economy, entrepreneurship and technology. The stand crosses the Strait by ship and goes up in a congress building, so we build it light, self-supporting and pre-assembled, with graphics applied in the workshop and installation in hours.</p>
        <h2>Stand builder in Ceuta: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-bet-on-ceuta">Bet On Ceuta</a>, <a href="/en/ferias/stand-ceuta-impulsa">Ceuta Impulsa</a> and <a href="/en/ferias/stand-odissea-economia-azul-ceuta">Odissea, Economía Azul de Ceuta</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ceuta">stand design and installation in Ceuta</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Ceuta</a></p>`
  },
  constructor_stand_melilla: {
    breadcrumb: 'Stand builder in Melilla',
    title: 'Stand builder in Melilla | Own workshop | Standarte',
    h1: 'Stand builder in Melilla',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Melilla from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Melilla: in-house manufacturing for Palacio de Exposiciones y Congresos de Melilla</h2>
        <p>Melilla holds its economic-opportunity and intercultural fairs at the Exhibition and Congress Centre. Everything travels by ship: we build the complete stand in the workshop, pre-assemble it and ship it numbered, with spares and tools, to install without surprises on arrival.</p>
        <h2>Stand builder in Melilla: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-oportunidades-economicas-melilla">Feria de Oportunidades Económicas de Melilla</a>, <a href="/en/ferias/stand-feria-representacion-intercultural-melilla">Feria de Representación Intercultural de Melilla</a> and <a href="/en/ferias/stand-eventos-empresariales-proyecto-melilla">Eventos Empresariales Proyecto Melilla</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_melilla">stand design and installation in Melilla</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Melilla</a></p>`
  },
  constructor_stand_tanger: {
    breadcrumb: 'Stand builder in Tangier',
    title: 'Stand builder in Tangier | Own workshop | Standarte',
    h1: 'Stand builder in Tangier',
    introText: "We build custom stands for Recintos feriales de Tánger y Tanger Med from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Tangier: in-house manufacturing for Recintos feriales de Tánger y Tanger Med</h2>
        <p>Tangier is textiles, fashion and industry: Maroc in Mode and the Tanger Med meetings gather manufacturers showing sample ranges and production capacity. We build stands with collection panels, fitting room and meeting room, made in Spain, transported with customs paperwork prepared and installed by our own crew.</p>
        <h2>Stand builder in Tangier: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-maroc-in-mode-mim-tanger">Maroc in Mode (MIM) Tánger</a>, <a href="/en/ferias/stand-tanger-nexus">Tanger Nexus</a>, <a href="/en/ferias/stand-tanger-fashion-week">Tanger Fashion Week</a>, <a href="/en/ferias/stand-amith-nord-tanger">Encuentros Industriales AMITH Nord</a> and <a href="/en/ferias/stand-eventos-industriales-tanger-med">Eventos Industriales Tanger Med</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_tangier">stand design and installation in Tangier</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Tangier</a></p>`
  },
  constructor_stand_casablanca: {
    breadcrumb: 'Stand builder in Casablanca',
    title: 'Stand builder in Casablanca | Own workshop | Standarte',
    h1: 'Stand builder in Casablanca',
    introText: "We build custom stands for Parc d’Exposition de l’OFEC (Casablanca) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Casablanca: in-house manufacturing for Parc d’Exposition de l’OFEC (Casablanca)</h2>
        <p>Casablanca is Morocco’s trade fair venue: logistics, food, energy, plastics and packaging all pass through the OFEC grounds. Exhibiting there from Spain requires transport under ATA carnet or temporary export and a stand that goes up without depending on local workshops: we build it whole, pre-assemble it and travel with it.</p>
        <h2>Stand builder in Casablanca: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-logismed-casablanca">Logismed</a>, <a href="/en/ferias/stand-morocco-food-expo-casablanca">Morocco Food Expo</a>, <a href="/en/ferias/stand-siema-casablanca">Morocco SIEMA Expo</a>, <a href="/en/ferias/stand-siab-casablanca">SIAB Expo Maroc</a>, <a href="/en/ferias/stand-elec-expo-casablanca">Elec Expo</a>, <a href="/en/ferias/stand-ener-event-casablanca">Ener Event</a>, <a href="/en/ferias/stand-plast-expo-casablanca">Plast Expo</a> and <a href="/en/ferias/stand-pack-expo-casablanca">Pack Expo Morocco</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_casablanca">stand design and installation in Casablanca</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Casablanca</a></p>`
  },
  constructor_stand_rabat: {
    breadcrumb: 'Stand builder in Rabat',
    title: 'Stand builder in Rabat | Own workshop | Standarte',
    h1: 'Stand builder in Rabat',
    introText: "We build custom stands for Recintos de ferias y congresos de Rabat from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Rabat: in-house manufacturing for Recintos de ferias y congresos de Rabat</h2>
        <p>Rabat exhibits publishing, culture, training and music: SIEL fills its venue with publishers and booksellers and the Forum de l’Étudiant gathers universities. These are book and information stands: shelving at hand height, sales counter, good reading light and a store for stock, built in the workshop and transported with their paperwork.</p>
        <h2>Stand builder in Rabat: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-siel-rabat">SIEL — Salon International de l'Édition et du Livre</a>, <a href="/en/ferias/stand-visa-for-music-rabat">Visa For Music</a>, <a href="/en/ferias/stand-forum-etudiant-rabat">Forum de l'Étudiant, de la Formation et de l'Emploi</a> and <a href="/en/ferias/stand-cimqusef-rabat">CIMQUSEF</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_rabat">stand design and installation in Rabat</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Rabat</a></p>`
  },
  constructor_stand_andorra: {
    breadcrumb: 'Stand builder in Andorra',
    title: 'Stand builder in Andorra | Own workshop | Standarte',
    h1: 'Stand builder in Andorra',
    introText: "We build custom stands for Centre de Congressos d’Andorra la Vella y recintos del Principado from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Andorra: in-house manufacturing for Centre de Congressos d’Andorra la Vella y recintos del Principado</h2>
        <p>Andorra holds multi-sector, food and retail fairs in Andorra la Vella and the parishes. Transport goes in by mountain road and through customs: we build the stand pre-assembled and compact, with parts sized for the truck that climbs the pass, and install it with our own crew.</p>
        <h2>Stand builder in Andorra: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fira-andorra-la-vella">Fira d'Andorra la Vella</a>, <a href="/en/ferias/stand-enfirat-encamp">Enfira't</a>, <a href="/en/ferias/stand-andorra-taste">Andorra Taste</a>, <a href="/en/ferias/stand-fira-del-vermut-andorra">Fira del Vermut d'Andorra</a>, <a href="/en/ferias/stand-fira-del-bestiar-ordino">Fira del Bestiar d'Ordino</a>, <a href="/en/ferias/stand-mercat-de-la-vall-andorra">Mercat de la Vall</a> and <a href="/en/ferias/stand-fira-outlet-soldeu">Fira Outlet de Soldeu</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_andorra">stand design and installation in Andorra</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Andorra</a></p>`
  },
  constructor_stand_teruel: {
    breadcrumb: 'Stand builder in Teruel',
    title: 'Stand builder in Teruel | Own workshop | Standarte',
    h1: 'Stand builder in Teruel',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Teruel: in-house manufacturing for Palacio de Exposiciones y Congresos de Teruel y recintos de la provincia</h2>
        <p>Teruel is ham, agri-food and farm machinery, with fairs in the capital, Calamocha and Alcañiz. We build product-tasting stands — counter with cutting board, refrigeration and washable surfaces — and machinery stands with reinforced floor, made in the workshop and installed in a day.</p>
        <h2>Stand builder in Teruel: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-jamon-teruel">Feria del Jamón de Teruel y Alimentos de Calidad</a>, <a href="/en/ferias/stand-expocalamocha">ExpoCalamocha</a> and <a href="/en/ferias/stand-agroalcaniz">AgroAlcañiz</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_teruel">stand design and installation in Teruel</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Teruel</a></p>`
  },
  constructor_stand_aranda: {
    breadcrumb: 'Stand builder in Aranda de Duero',
    title: 'Stand builder in Aranda de Duero | Own workshop | Standarte',
    h1: 'Stand builder in Aranda de Duero',
    introText: "We build custom stands for Recinto Ferial de Aranda de Duero from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Aranda de Duero: in-house manufacturing for Recinto Ferial de Aranda de Duero</h2>
        <p>Aranda de Duero is the Ribera capital and its fairs revolve around wine: tastings, awards and winery meetings. We build winery stands with tasting bar, cold-lit bottle display and a private corner for the distributor, made in the workshop and reusable at the next wine events.</p>
        <h2>Stand builder in Aranda de Duero: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-espacio-ribera-aranda">Espacio Ribera</a>, <a href="/en/ferias/stand-premios-envero-enverofest-aranda">Premios Envero / EnveroFest</a> and <a href="/en/ferias/stand-congreso-la-cierna-aranda">Congreso La Cierna</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_aranda_de_duero">stand design and installation in Aranda de Duero</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Aranda de Duero</a></p>`
  },
  constructor_stand_ciudad_real: {
    breadcrumb: 'Stand builder in Ciudad Real',
    title: 'Stand builder in Ciudad Real | Own workshop | Standarte',
    h1: 'Stand builder in Ciudad Real',
    introText: "We build custom stands for Pabellón Ferial de Ciudad Real (IFEDI) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Ciudad Real: in-house manufacturing for Pabellón Ferial de Ciudad Real (IFEDI)</h2>
        <p>Ciudad Real is wine and countryside: Fenavin gathers wineries and international buyers, and FERCAM and FERDUQUE bring machinery and livestock. We build tasting stands with refrigeration and bottle display, and machinery stands with reinforced floor, both from our workshop and with our own installation at the exhibition hall.</p>
        <h2>Stand builder in Ciudad Real: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-fenavin-match-ciudad-real">Fenavin Match Ciudad Real</a>, <a href="/en/ferias/stand-ferduque-ciudad-real">FERDUQUE</a>, <a href="/en/ferias/stand-fercam-manzanares-ciudad-real">FERCAM</a> and <a href="/en/ferias/stand-fercatur-ciudad-real">Fercatur Ciudad Real</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_ciudad_real">stand design and installation in Ciudad Real</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Ciudad Real</a></p>`
  },
  constructor_stand_zafra: {
    breadcrumb: 'Stand builder in Zafra',
    title: 'Stand builder in Zafra | Own workshop | Standarte',
    h1: 'Stand builder in Zafra',
    introText: "We build custom stands for Recinto Ferial de Zafra from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Zafra: in-house manufacturing for Recinto Ferial de Zafra</h2>
        <p>Zafra lives its International Livestock Fair on a countryside venue, with animals, machinery and public for a week. We build stands for that toughness — washable floor, solid structure, lockable store — from our Cáceres workshop, under an hour away, able to solve any adjustment the same day.</p>
        <h2>Stand builder in Zafra: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-internacional-ganadera-zafra">Feria Internacional Ganadera de Zafra</a>. The full design-and-build service for the city is on our <a href="/en/exhibition_stand_assembly_zafra">stand design and installation in Zafra</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Zafra</a></p>`
  },
  constructor_stand_trujillo: {
    breadcrumb: 'Stand builder in Trujillo',
    title: 'Stand builder in Trujillo | Own workshop | Standarte',
    h1: 'Stand builder in Trujillo',
    introText: "We build custom stands for Recinto Ferial de Trujillo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Trujillo: in-house manufacturing for Recinto Ferial de Trujillo</h2>
        <p>Trujillo holds the Cheese Fair and the Agricultural and Livestock Fair: product to taste and animals to see. We build cutting and tasting counters with refrigeration and washable surfaces, and covered outdoor stands for the livestock fair, from our Cáceres workshop, under an hour from the venue.</p>
        <h2>Stand builder in Trujillo: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-internacional-ganadera-trujillo">Feria Agroganadera de Trujillo</a> and <a href="/en/ferias/stand-feria-nacional-queso-trujillo">Feria Nacional del Queso de Trujillo</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_trujillo">stand design and installation in Trujillo</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Trujillo</a></p>`
  },
  constructor_stand_almeria: {
    breadcrumb: 'Stand builder in Almeria',
    title: 'Stand builder in Almeria | Own workshop | Standarte',
    h1: 'Stand builder in Almeria',
    introText: "We build custom stands for Palacio de Exposiciones y Congresos de Aguadulce from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Almeria: in-house manufacturing for Palacio de Exposiciones y Congresos de Aguadulce</h2>
        <p>Almería is intensive agriculture: Infoagro and Expolevante show seeds, irrigation, plastics and greenhouse machinery to a highly technical visitor. We build stands where the system is shown installed and working, with water, power and reinforced floor, made in our own workshop.</p>
        <h2>Stand builder in Almeria: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-infoagro-exhibition-aguadulce">Infoagro Exhibition</a>, <a href="/en/ferias/stand-expolevante-el-ejido">Expolevante</a> and <a href="/en/ferias/stand-sun-blue-congress-almeria">Sun&Blue Congress</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_almeria">stand design and installation in Almeria</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Almeria</a></p>`
  },
  constructor_stand_jaen: {
    breadcrumb: 'Stand builder in Jaen',
    title: 'Stand builder in Jaen | Own workshop | Standarte',
    h1: 'Stand builder in Jaen',
    introText: "We build custom stands for IFEJA – Palacio de Ferias y Congresos de Jaén from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Jaen: in-house manufacturing for IFEJA – Palacio de Ferias y Congresos de Jaén</h2>
        <p>Jaén is olive oil: Expoliva gathers mills, milling and bottling machinery and buyers from half the world at IFEJA. We build tasting stands with counter, display case and light that does not distort the colour of the oil, and machinery stands with reinforced floor, both from our workshop and installed by our own crew.</p>
        <h2>Stand builder in Jaen: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-expoliva-jaen">Expoliva</a>, <a href="/en/ferias/stand-ibercaza-jaen">Ibercaza</a> and <a href="/en/ferias/stand-feria-de-los-pueblos-jaen">Feria de los Pueblos</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_jaen">stand design and installation in Jaen</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Jaen</a></p>`
  },
  constructor_stand_huelva: {
    breadcrumb: 'Stand builder in Huelva',
    title: 'Stand builder in Huelva | Own workshop | Standarte',
    h1: 'Stand builder in Huelva',
    introText: "We build custom stands for Palacio de Congresos Casa Colón y recintos de la provincia from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Huelva: in-house manufacturing for Palacio de Congresos Casa Colón y recintos de la provincia</h2>
        <p>Huelva combines berries, Iberian ham and fishing across three venues: Casa Colón in the capital, Aracena in the hills and Punta Umbría on the coast. We build for all three from the same workshop: a light congress stand, a cutting counter with refrigeration, or a covered outdoor stand for the prawn fair.</p>
        <h2>Stand builder in Huelva: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-congreso-internacional-frutos-rojos-huelva">Congreso Internacional de Frutos Rojos</a>, <a href="/en/ferias/stand-feria-jamon-cerdo-iberico-aracena">Feria del Jamón y Cerdo Ibérico de Aracena</a> and <a href="/en/ferias/stand-feria-gamba-chirla-boqueron-punta-umbria">Feria Nacional de la Gamba, la Chirla y el Boquerón</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_huelva">stand design and installation in Huelva</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Huelva</a></p>`
  },
  constructor_stand_cordoba: {
    breadcrumb: 'Stand builder in Cordoba',
    title: 'Stand builder in Cordoba | Own workshop | Standarte',
    h1: 'Stand builder in Cordoba',
    introText: "We build custom stands for Recintos feriales de Córdoba y Los Pedroches from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cordoba: in-house manufacturing for Recintos feriales de Córdoba y Los Pedroches</h2>
        <p>Córdoba is hunting and Iberian pork: Intercaza in the capital and the livestock and ham fairs of Los Pedroches. We build tasting stands with cutting counter and refrigeration, and covered outdoor stands with washable floor for the livestock fairs, made in the workshop and installed by our crew.</p>
        <h2>Stand builder in Cordoba: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-intercaza-cordoba">Intercaza</a>, <a href="/en/ferias/stand-feria-agroganadera-pedroches-pozoblanco">Feria Agroganadera y Agroalimentaria del Valle de Los Pedroches</a> and <a href="/en/ferias/stand-feria-jamon-bellota-dop-pedroches-villanueva-cordoba">Feria del Jamón de Bellota 100% Ibérico DOP Los Pedroches</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cordoba">stand design and installation in Cordoba</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Cordoba</a></p>`
  },
  constructor_stand_granada: {
    breadcrumb: 'Stand builder in Granada',
    title: 'Stand builder in Granada | Own workshop | Standarte',
    h1: 'Stand builder in Granada',
    introText: "We build custom stands for Fermasa (Armilla) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Granada: in-house manufacturing for Fermasa (Armilla)</h2>
        <p>Granada exhibits at Fermasa, the Armilla venue: general trade fair, fashion, science and the equestrian world. It is a general-public calendar, so we build stands that survive full-capacity weekends, with hard-wearing graphics, service counter and lockable store.</p>
        <h2>Stand builder in Granada: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feria-general-muestras-armilla">Feria General de Muestras de Armilla</a>, <a href="/en/ferias/stand-feria-de-la-ciencia-granada">Feria de la Ciencia</a>, <a href="/en/ferias/stand-concab-granada">CONCAB Granada</a>, <a href="/en/ferias/stand-belmoda-granada">Belmoda Granada</a>, <a href="/en/ferias/stand-sabores-nuestra-tierra-granada">Sabores de Nuestra Tierra</a> and <a href="/en/ferias/stand-feria-pueblos-granada">Feria de los Pueblos de Granada</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_granada">stand design and installation in Granada</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Granada</a></p>`
  },
  constructor_stand_cadiz: {
    breadcrumb: 'Stand builder in Cadiz',
    title: 'Stand builder in Cadiz | Own workshop | Standarte',
    h1: 'Stand builder in Cadiz',
    introText: "We build custom stands for Palacio de Congresos de Cádiz e IFECA (Jerez) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cadiz: in-house manufacturing for Palacio de Congresos de Cádiz e IFECA (Jerez)</h2>
        <p>Cádiz splits its events between the capital’s Congress Centre, with the blue economy and shipbuilding, and IFECA in Jerez, with the Horse Fair and Fegasur. We build a light congress stand for the first and a covered outdoor livestock stand for the second, both from our workshop.</p>
        <h2>Stand builder in Cadiz: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-blue-zone-forum-navalia-meeting-cadiz">Blue Zone Forum Navalia Meeting</a>, <a href="/en/ferias/stand-feria-del-caballo-jerez">Feria del Caballo de Jerez</a> and <a href="/en/ferias/stand-fegasur-jerez">Fegasur</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cadiz">stand design and installation in Cadiz</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Cadiz</a></p>`
  },
  constructor_stand_marsella: {
    breadcrumb: 'Stand builder in Marseille',
    title: 'Stand builder in Marseille | Own workshop | Standarte',
    h1: 'Stand builder in Marseille',
    introText: "We build custom stands for Parc Chanot – Parc des Expositions et des Congrès de Marseille from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Marseille: in-house manufacturing for Parc Chanot – Parc des Expositions et des Congrès de Marseille</h2>
        <p>Parc Chanot hosts everything from the Foire Internationale to Euromaritime and Sirha Méditerranée: general public, maritime industry and food service. Exhibiting there from Spain means a long haul and installation under French rules: we build the stand pre-assembled, with fire-reaction certificates, and install it with our own crew.</p>
        <h2>Stand builder in Marseille: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-marseille">Foire Internationale de Marseille</a>, <a href="/en/ferias/stand-euromaritime-marseille">Euromaritime</a>, <a href="/en/ferias/stand-sirha-mediterranee-marseille">Sirha Méditerranée</a>, <a href="/en/ferias/stand-beauty-profs-marseille">Beauty Prof's</a>, <a href="/en/ferias/stand-savim-marseille">SAVIM</a>, <a href="/en/ferias/stand-salon-piscine-jardin-marseille">Salon Piscine & Jardin</a>, <a href="/en/ferias/stand-solutions-cse-marseille">Solutions CSE Marseille</a> and <a href="/en/ferias/stand-japan-expo-sud-marseille">Japan Expo Sud</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_marseille">stand design and installation in Marseille</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Marseille</a></p>`
  },
  constructor_stand_cannes: {
    breadcrumb: 'Stand builder in Cannes',
    title: 'Stand builder in Cannes | Own workshop | Standarte',
    h1: 'Stand builder in Cannes',
    introText: "We build custom stands for Palais des Festivals et des Congrès from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Cannes: in-house manufacturing for Palais des Festivals et des Congrès</h2>
        <p>Cannes is the Palais des Festivals: MIPIM, MAPIC and TFWA are markets where the stand is a negotiating office with brand image. We build closed offices with acoustics, reception and high-finish graphics, made in the workshop and installed in the few hours the Palais allows.</p>
        <h2>Stand builder in Cannes: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-cannes-yachting-festival">Cannes Yachting Festival</a>, <a href="/en/ferias/stand-interior-exterior-design-meetings-cannes">Interior & Exterior Design Meetings</a>, <a href="/en/ferias/stand-mapic-cannes">MAPIC</a>, <a href="/en/ferias/stand-mipim-cannes">MIPIM</a> and <a href="/en/ferias/stand-tfwa-cannes">TFWA World Exhibition</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_cannes">stand design and installation in Cannes</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Cannes</a></p>`
  },
  constructor_stand_avignon: {
    breadcrumb: 'Stand builder in Avignon',
    title: 'Stand builder in Avignon | Own workshop | Standarte',
    h1: 'Stand builder in Avignon',
    introText: "We build custom stands for Parc des Expositions d’Avignon (Agroparc) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Avignon: in-house manufacturing for Parc des Expositions d’Avignon (Agroparc)</h2>
        <p>Avignon is Mediterranean agriculture: MED’Agri gathers irrigation, seeds, machinery and fruit growing at the Parc des Expositions. We build stands where the equipment is shown installed, with water and power, reinforced floor and graphics in French, made in the workshop and delivered by road with installation included.</p>
        <h2>Stand builder in Avignon: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-medagri-avignon">MED'Agri</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_avignon">stand design and installation in Avignon</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Avignon</a></p>`
  },
  constructor_stand_toulouse: {
    breadcrumb: 'Stand builder in Toulouse',
    title: 'Stand builder in Toulouse | Own workshop | Standarte',
    h1: 'Stand builder in Toulouse',
    introText: "We build custom stands for MEETT – Parc des Expositions de Toulouse from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Toulouse: in-house manufacturing for MEETT – Parc des Expositions de Toulouse</h2>
        <p>Toulouse is aerospace: Aeromart and the Aerospace Test & Development Show gather parts and testing suppliers at MEETT with meetings booked in advance. We build business stands — meeting tables, cabinets for precision parts, screen — made in the workshop and installed at the new Aussonne venue by our crew.</p>
        <h2>Stand builder in Toulouse: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-toulouse">Foire Internationale de Toulouse</a>, <a href="/en/ferias/stand-cfia-toulouse">CFIA Toulouse</a>, <a href="/en/ferias/stand-sepem-industries-toulouse">SEPEM Industries Toulouse</a>, <a href="/en/ferias/stand-aerospace-test-development-show-toulouse">Aerospace Test & Development Show</a>, <a href="/en/ferias/stand-aeromart-toulouse">Aeromart Toulouse</a>, <a href="/en/ferias/stand-siane-toulouse">Salon SIANE</a> and <a href="/en/ferias/stand-smahrt-toulouse">SMAHRT</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_toulouse">stand design and installation in Toulouse</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Toulouse</a></p>`
  },
  constructor_stand_burdeos: {
    breadcrumb: 'Stand builder in Bordeaux',
    title: 'Stand builder in Bordeaux | Own workshop | Standarte',
    h1: 'Stand builder in Bordeaux',
    introText: "We build custom stands for Parc des Expositions de Bordeaux-Lac from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Bordeaux: in-house manufacturing for Parc des Expositions de Bordeaux-Lac</h2>
        <p>Bordeaux is wine and viticulture: Vinitech-Sifel fills Bordeaux-Lac with winery and vineyard machinery, and the vignerons’ shows with bottles to taste. We build machinery stands with reinforced floor and tasting stands with bar and refrigeration, made in the workshop and delivered by road with our own installation.</p>
        <h2>Stand builder in Bordeaux: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-internationale-bordeaux">Foire Internationale de Bordeaux</a>, <a href="/en/ferias/stand-vinitech-sifel-bordeaux">Vinitech-Sifel</a>, <a href="/en/ferias/stand-equitaine-bordeaux">Equitaine</a>, <a href="/en/ferias/stand-salon-agriculture-nouvelle-aquitaine-bordeaux">Salon de l'Agriculture Nouvelle-Aquitaine</a>, <a href="/en/ferias/stand-art3f-bordeaux">Art3f Bordeaux</a>, <a href="/en/ferias/stand-grand-salon-habitat-bordeaux">Grand Salon Habitat</a>, <a href="/en/ferias/stand-salon-vins-vignerons-independants-bordeaux">Salon des Vins des Vignerons Indépendants</a> and <a href="/en/ferias/stand-cycleau-nouvelle-aquitaine-bordeaux">Cycl'Eau Nouvelle-Aquitaine</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_bordeaux">stand design and installation in Bordeaux</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Bordeaux</a></p>`
  },
  constructor_stand_lyon: {
    breadcrumb: 'Stand builder in Lyon',
    title: 'Stand builder in Lyon | Own workshop | Standarte',
    h1: 'Stand builder in Lyon',
    introText: "We build custom stands for Eurexpo Lyon from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Lyon: in-house manufacturing for Eurexpo Lyon</h2>
        <p>Eurexpo is a large-scale industrial venue: Global Industrie, Pollutec and SIRHA exhibit machines running and kitchens cooking live. We build stands with power and compressed air planned, technical flooring and kitchen extraction, made in the workshop and installed by our crew under the venue rules.</p>
        <h2>Stand builder in Lyon: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sirha-lyon">SIRHA</a>, <a href="/en/ferias/stand-global-industrie-lyon">Global Industrie</a>, <a href="/en/ferias/stand-pollutec-lyon">Pollutec Lyon</a>, <a href="/en/ferias/stand-piscine-global-lyon">Piscine Global Europe</a>, <a href="/en/ferias/stand-preventica-lyon">Préventica Lyon</a>, <a href="/en/ferias/stand-prod-pack-lyon">Prod&Pack</a> and <a href="/en/ferias/stand-bepositive-lyon">BEPOSITIVE</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_lyon">stand design and installation in Lyon</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Lyon</a></p>`
  },
  constructor_stand_grenoble: {
    breadcrumb: 'Stand builder in Grenoble',
    title: 'Stand builder in Grenoble | Own workshop | Standarte',
    h1: 'Stand builder in Grenoble',
    introText: "We build custom stands for Alpexpo from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Grenoble: in-house manufacturing for Alpexpo</h2>
        <p>Grenoble is mountains and industry: Mountain Planet gathers ski lifts, snowmaking and resort equipment at Alpexpo. These are big, heavy products: we build stands with reinforced floor, structure for hanging elements and large-format graphics, made in the workshop and delivered by road.</p>
        <h2>Stand builder in Grenoble: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-mountain-planet-grenoble">Mountain Planet</a> and <a href="/en/ferias/stand-sepem-industries-sud-est-grenoble">SEPEM Industries Sud-Est</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_grenoble">stand design and installation in Grenoble</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Grenoble</a></p>`
  },
  constructor_stand_clermont_ferrand: {
    breadcrumb: 'Stand builder in Clermont-Ferrand',
    title: 'Stand builder in Clermont-Ferrand | Own workshop | Standarte',
    h1: 'Stand builder in Clermont-Ferrand',
    introText: "We build custom stands for Grande Halle d’Auvergne (Cournon) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Clermont-Ferrand: in-house manufacturing for Grande Halle d’Auvergne (Cournon)</h2>
        <p>Clermont-Ferrand is the Sommet de l’Élevage, Europe’s largest livestock show, at the Grande Halle d’Auvergne. A stand there lives alongside animals, machinery and mud: we build it with washable materials, solid structure and a clean meeting space, and transport it pre-assembled from our workshop.</p>
        <h2>Stand builder in Clermont-Ferrand: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sommet-elevage-clermont-ferrand">Sommet de l'Élevage</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_clermont_ferrand">stand design and installation in Clermont-Ferrand</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Clermont-Ferrand</a></p>`
  },
  constructor_stand_niza: {
    breadcrumb: 'Stand builder in Nice',
    title: 'Stand builder in Nice | Own workshop | Standarte',
    h1: 'Stand builder in Nice',
    introText: "We build custom stands for Palais des Expositions y Nice Acropolis from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Nice: in-house manufacturing for Palais des Expositions y Nice Acropolis</h2>
        <p>Nice exhibits hospitality, boating and business at the Palais des Expositions and Acropolis: two-to-three-day fairs with tight build-up. We build pre-assembled, light stands with French graphics applied in the workshop, up in a few hours and out the same night as closing.</p>
        <h2>Stand builder in Nice: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-agecotel-nice">AGECOTEL</a>, <a href="/en/ferias/stand-nice-boating-tomorrow">Nice Boating Tomorrow</a>, <a href="/en/ferias/stand-ibt-cote-azur">IBT Côte d'Azur</a>, <a href="/en/ferias/stand-entreprenariales-nice">Les Entreprenariales</a> and <a href="/en/ferias/stand-solucop-nice">SOLUCOP</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_nice">stand design and installation in Nice</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Nice</a></p>`
  },
  constructor_stand_montpellier: {
    breadcrumb: 'Stand builder in Montpellier',
    title: 'Stand builder in Montpellier | Own workshop | Standarte',
    h1: 'Stand builder in Montpellier',
    introText: "We build custom stands for Parc des Expositions de Montpellier from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Montpellier: in-house manufacturing for Parc des Expositions de Montpellier</h2>
        <p>Montpellier is viticulture and organic wine: SITEVI exhibits vineyard and winery machinery, and Millésime Bio bottles to taste. We build machinery stands with reinforced floor and tasting stands with bar, refrigeration and bottle display, made in the workshop and installed by our crew at the Parc des Expositions.</p>
        <h2>Stand builder in Montpellier: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-sitevi-montpellier">SITEVI</a>, <a href="/en/ferias/stand-millesime-bio-montpellier">Millésime Bio</a>, <a href="/en/ferias/stand-sett-montpellier">SETT</a>, <a href="/en/ferias/stand-energaia-montpellier">EnerGaïa</a>, <a href="/en/ferias/stand-siprho-montpellier">SIPRHO</a> and <a href="/en/ferias/stand-ais-montpellier">Antibody Industrial Symposium</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_montpellier">stand design and installation in Montpellier</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Montpellier</a></p>`
  },
  constructor_stand_perpignan: {
    breadcrumb: 'Stand builder in Perpignan',
    title: 'Stand builder in Perpignan | Own workshop | Standarte',
    h1: 'Stand builder in Perpignan',
    introText: "We build custom stands for Parc des Expositions de Perpignan from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Perpignan: in-house manufacturing for Parc des Expositions de Perpignan</h2>
        <p>Perpignan is southern France’s fruit and vegetable hub: MEDFEL gathers producers and distributors with fresh product on the stand. We build with refrigerated counter, washable surfaces and cold storage, made in the workshop and installed at the Parc des Expositions, two hours from the border.</p>
        <h2>Stand builder in Perpignan: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-foire-exposition-perpignan">Foire Exposition de Perpignan</a>, <a href="/en/ferias/stand-medfel-perpignan">MEDFEL</a>, <a href="/en/ferias/stand-viv-habitat-perpignan">Salon Viv'Habitat</a>, <a href="/en/ferias/stand-tourisme-loisirs-perpignan">Salon Tourisme & Loisirs</a>, <a href="/en/ferias/stand-eco-maison-perpignan">Eco-Maison</a>, <a href="/en/ferias/stand-retro-mecanic-perpignan">Retro Mécanic</a> and <a href="/en/ferias/stand-salon-mariage-perpignan">Salon du Mariage</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_perpignan">stand design and installation in Perpignan</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Perpignan</a></p>`
  },
  constructor_stand_batalha: {
    breadcrumb: 'Stand builder in Batalha',
    title: 'Stand builder in Batalha | Own workshop | Standarte',
    h1: 'Stand builder in Batalha',
    introText: "We build custom stands for Exposalão – Centro de Exposições da Batalha from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Batalha: in-house manufacturing for Exposalão – Centro de Exposições da Batalha</h2>
        <p>Exposalão, in Batalha, is central Portugal’s industrial venue: moulds, plastics, metal, stone and glass. These are fairs of running machines and heavy product: we build with technical flooring, power and compressed air planned and graphics in Portuguese, made in the workshop and installed by our crew.</p>
        <h2>Stand builder in Batalha: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/en/ferias/stand-expometal-batalha">Expometal</a>, <a href="/en/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/en/ferias/stand-vidrotec-batalha">Vidrotec</a> and <a href="/en/ferias/stand-decorhotel-batalha">Decorhotel</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_batalha">stand design and installation in Batalha</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Batalha</a></p>`
  },
  constructor_stand_santarem: {
    breadcrumb: 'Stand builder in Santarem',
    title: 'Stand builder in Santarem | Own workshop | Standarte',
    h1: 'Stand builder in Santarem',
    introText: "We build custom stands for CNEMA – Centro Nacional de Exposições from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Santarem: in-house manufacturing for CNEMA – Centro Nacional de Exposições</h2>
        <p>Santarém is Portugal’s agricultural heart: the National Agriculture Fair and Agroglobal fill CNEMA with tractors, livestock and product. We build machinery stands with reinforced floor and tasting stands with refrigeration, made in the workshop and delivered from Spain with installation included.</p>
        <h2>Stand builder in Santarem: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/en/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/en/ferias/stand-agroglobal-santarem">Agroglobal</a> and <a href="/en/ferias/stand-lusoflora-santarem">Lusoflora</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_santarem">stand design and installation in Santarem</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Santarem</a></p>`
  },
  constructor_stand_regua: {
    breadcrumb: 'Stand builder in Peso da Régua',
    title: 'Stand builder in Peso da Régua | Own workshop | Standarte',
    h1: 'Stand builder in Peso da Régua',
    introText: "We build custom stands for Recintos feriales de Peso da Régua (Douro) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Peso da Régua: in-house manufacturing for Recintos feriales de Peso da Régua (Douro)</h2>
        <p>Peso da Régua is the Douro: Port wine fairs, wine tourism and regional flavours, many in open spaces by the river. We build tasting stands with bar, refrigeration and bottle display, prepared for covered outdoor use, and bring them pre-assembled from our workshop.</p>
        <h2>Stand builder in Peso da Régua: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/en/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> and <a href="/en/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_peso_da_regua">stand design and installation in Peso da Régua</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Peso da Régua</a></p>`
  },
  constructor_stand_portugal_sur: {
    breadcrumb: 'Stand builder in southern Portugal',
    title: 'Stand builder in southern Portugal | Own workshop | Standarte',
    h1: 'Stand builder in southern Portugal',
    introText: "We build custom stands for Parque de Exposições de Beja y recintos del Algarve from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in southern Portugal: in-house manufacturing for Parque de Exposições de Beja y recintos del Algarve</h2>
        <p>Southern Portugal exhibits in Beja, with Ovibeja and Vinipax, and in the Algarve, with Fatacil and the Portimão and Lagoa fairs: agriculture, wine and general public. We build covered outdoor stands with washable floor and tasting stands, and transport them pre-assembled from Spain with installation included.</p>
        <h2>Stand builder in southern Portugal: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/en/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/en/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/en/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/en/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> and <a href="/en/ferias/stand-vinipax-beja">Vinipax Beja</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_southern_portugal">stand design and installation in southern Portugal</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in southern Portugal</a></p>`
  },
  constructor_stand_islas_de_madeira: {
    breadcrumb: 'Stand builder in Madeira',
    title: 'Stand builder in Madeira | Own workshop | Standarte',
    h1: 'Stand builder in Madeira',
    introText: "We build custom stands for Madeira Tecnopolo (Funchal) from our own workshop: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.",
    body: `
        <h2>Stand builder in Madeira: in-house manufacturing for Madeira Tecnopolo (Funchal)</h2>
        <p>Madeira exhibits at the Funchal Tecnopolo: jobs, entrepreneurship, farming and wine fairs. Everything arrives by container: we build and pre-assemble the whole stand in the workshop, number it part by part and ship it with spares, so that on the island there is only assembly left.</p>
        <h2>Stand builder in Madeira: shows at the venue</h2>
        <p>We build for the whole calendar of the city: <a href="/en/ferias/stand-expomadeira">Expomadeira</a>, <a href="/en/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/en/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/en/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/en/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> and <a href="/en/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. The full design-and-build service for the city is on our <a href="/en/stand_design_assembly_madeira_islands">stand design and installation in Madeira</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Madeira</a></p>`
  },
  constructor_stand_merida: {
    breadcrumb: 'Stand builder in Mérida',
    title: 'Stand builder in Mérida | Own workshop | Standarte',
    h1: 'Stand builder in Mérida',
    introText: 'We build custom stands for IFEME, the Mérida exhibition centre, from our Cáceres workshop under an hour away: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.',
    body: `
        <h2>Stand builder in Mérida: in-house manufacturing for IFEME</h2>
        <p>Mérida is the capital of Extremadura and its venue, IFEME, hosts a general-public calendar: the Motor Show, the Weddings and Home Fair, the Emérita Augusta collectors’ fair and FETUREX, the region’s tourism fair. These are weekend fairs with high attendance and visitors who stop, touch and ask, so the stand is built for continuous traffic: hard-wearing graphics, a service counter, a floor that shows no wear and a lockable store for materials.</p>
        <h2>Stand builder in Mérida: shows at the venue</h2>
        <p>We build for the IFEME calendar: <a href="/en/ferias/stand-salon-automovil-merida">Mérida Motor Show</a>, <a href="/en/ferias/stand-feria-bodas-hogar-merida">Weddings and Home Fair</a>, <a href="/en/ferias/stand-coleccionismo-emerita-augusta-merida">Emérita Augusta Collectors’ Fair</a> and <a href="/en/ferias/stand-feturex-merida">FETUREX</a>. The full design-and-build service for the province is on our <a href="/en/stand_design_assembly_badajoz">stand design and installation in Badajoz</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Mérida</a></p>`
  },
  constructor_stand_almendralejo: {
    breadcrumb: 'Stand builder in Almendralejo',
    title: 'Stand builder in Almendralejo | Own workshop | Standarte',
    h1: 'Stand builder in Almendralejo',
    introText: 'We build custom stands for the fairs of Almendralejo and Tierra de Barros from our Cáceres workshop under an hour away: joinery, structure, furniture and graphics made by our team, with no subcontracted production. A 3D prototype before the first cut, and the build finished before opening.',
    body: `
        <h2>Stand builder in Almendralejo: in-house manufacturing for the capital of Extremaduran wine</h2>
        <p>Almendralejo is Tierra de Barros: wineries, cava and olive oil, with Vinac as the sector’s reference fair. A winery stand here is built to taste and to sell: a tasting bar at the right height, a cold-lit bottle display, a private corner for the distributor and surfaces that take the traffic of glasses for the whole fair.</p>
        <h2>Stand builder in Almendralejo: shows at the venue</h2>
        <p>We build for <a href="/en/ferias/stand-vinac-almendralejo">Vinac Almendralejo</a> and for the rest of the Extremadura calendar, from <a href="/en/ferias/stand-feria-internacional-ganadera-zafra">the Zafra International Livestock Fair</a> to <a href="/en/ferias/stand-feturex-merida">FETUREX in Mérida</a>. The full design-and-build service for the province is on our <a href="/en/stand_design_assembly_badajoz">stand design and installation in Badajoz</a> page.</p>
        <p><a class="oro-cta-espacio" href="#contact">Ask for a build quote for your stand in Almendralejo</a></p>`
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
        <p>A Exponor, em Leça da Palmeira, concentra o norte industrial e exportador de Portugal: têxtil, construção, alimentação, cosmética e metalomecânica. É um visitante profissional que inspeciona o produto de perto, e isso define o padrão de construção: acabamentos sólidos à altura da mão, iluminação fiel à cor real e espaço para negociar sentado. Fabricamos tudo na nossa oficina, pré-montamos o stand antes de o carregar e chegamos ao pavilhão para montar, não para improvisar.</p>
        <h2>Construtor de stands no Porto: como trabalhamos a cidade</h2>
        <ol>
          <li><strong>Projeto e protótipo 3D</strong> com as medidas do espaço na Exponor e as suas normas de altura, suspensão e ramais.</li>
          <li><strong>Fabrico e pré-montagem na nossa oficina</strong>, com o transporte até ao Porto tratado por nós.</li>
          <li><strong>Montagem com equipa própria</strong>, terminada 24&nbsp;h antes da abertura, e desmontagem no fecho.</li>
        </ol>
        <h2>Construtor de stands no Porto: feiras do recinto</h2>
        <p>Construímos para o calendário da Exponor: <a href="/pt/ferias/stand-concreta-oporto">Concreta</a>, <a href="/pt/ferias/stands-modtissimo-oporto">Modtissimo</a>, <a href="/pt/ferias/stand-expocosmetica-oporto">Expocosmética</a> e <a href="/pt/ferias/stand-emaf-oporto">Emaf</a>. O serviço completo de design e montagem está na página de <a href="/pt/design_montagem_stands_porto">design e montagem de stands no Porto</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand no Porto</a></p>`
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
        <p>Lisboa tem dois calendários que exigem construções distintas. Na FIL, no Parque das Nações, as feiras profissionais pedem stands de dois a quatro dias com produto exposto e espaço para negociar. Nos congressos internacionais a janela de montagem é de horas, não de dias: o stand chega pré-montado, com o grafismo aplicado e as instalações testadas, e levanta-se sem improvisar.</p>
        <ul>
          <li><strong>Um único interlocutor</strong> em português, espanhol ou inglês.</li>
          <li><strong>Protótipo 3D</strong> que é exatamente o que se constrói.</li>
          <li><strong>Fabrico na nossa oficina</strong> e transporte até Lisboa tratado por nós.</li>
          <li><strong>Montagem dentro da janela atribuída</strong>, também em congressos de poucas horas.</li>
        </ul>
        <h2>Construtor de stands em Lisboa: o que construímos</h2>
        <h3>Stands de design livre para a FIL</h3>
        <p>Estrutura e carpintaria à medida para feiras como a BTL ou a Tektónica, com arrumos integrados e grafismo de grande formato.</p>
        <h3>Módulos de congresso pré-montados</h3>
        <p>Stands compactos que saem da oficina terminados e se levantam em poucas horas em congressos como a Web Summit.</p>
        <p><strong>Tem uma feira ou um congresso em Lisboa em breve?</strong> Com o espaço e a janela de montagem, planeamos oficina e transporte com margem.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand em Lisboa</a></p>
        <h2>Construtor de stands em Lisboa: porquê construir com a Standarte</h2>
        <ul>
          <li><strong>Construímos, não intermediamos.</strong> O stand é fabricado na nossa oficina e viaja para Lisboa pré-montado.</li>
          <li><strong>Transporte resolvido.</strong> Planeamos a viagem com margem para que a descarga não dependa da estrada.</li>
          <li><strong>O que aprova é o que se constrói.</strong> Cada aprovação fica registada no <a href="/pt/projeto-auditado">Sistema de Projeto Auditado</a>.</li>
        </ul>
        <h2>Construtor de stands em Lisboa: projetos que construímos</h2>
        <ul>
          <li><a href="/proyectos/stand_para_embalaje_industrial_lisboa?lang=pt">Stand de embalagens industriais</a></li>
          <li><a href="/proyectos/stand_para_equipamiento_industrial_lisboa?lang=pt">Stand de equipamentos industriais</a></li>
          <li><a href="/proyectos/stand_para_gestion_trafico_inteligente_lisboa?lang=pt">Stand de gestão inteligente de tráfego</a></li>
        </ul>
        <h2>Construtor de stands em Lisboa: feiras e congressos da cidade</h2>
        <p>Construímos para o calendário da FIL e dos grandes congressos: <a href="/pt/ferias/stand-btl-lisboa">BTL</a>, <a href="/pt/ferias/stand-tektonica-lisboa">Tektónica</a>, <a href="/pt/ferias/stand-sil-lisboa">SIL</a> e <a href="/pt/ferias/stand-web-summit-lisboa">Web Summit</a>. O serviço completo de design e montagem está na página de <a href="/pt/design_montagem_stands_lisboa">design e montagem de stands em Lisboa</a>.</p>`,
      faqs: [
        {
          "q": "Montam stands em Lisboa a partir de Espanha?",
          "a": "Sim. Fabricamos e pré-montamos o stand na nossa oficina e organizamos o transporte até Lisboa com margem, de modo que no pavilhão só se monta e liga."
        },
        {
          "q": "Conseguem montar em congressos com muito pouco tempo?",
          "a": "Sim. Para congressos como a Web Summit fabricamos módulos que saem da oficina terminados e se levantam em poucas horas."
        },
        {
          "q": "Atendem em português?",
          "a": "Sim, com um único interlocutor em português, espanhol ou inglês durante todo o projeto."
        },
        {
          "q": "Quanto custa um stand em Lisboa?",
          "a": "Depende dos metros quadrados, da estrutura e dos acabamentos. Na página de preços há escalões indicativos e enviamos um orçamento fechado em 24 h com o protótipo 3D."
        }
      ]
  },
  constructor_stand_batalha: {
    breadcrumb: 'Construtor de stands na Batalha',
    title: 'Construtor de stands na Batalha | Oficina própria | Standarte',
    h1: 'Construtor de stands na Batalha',
    introText: "Construímos stands à medida para Exposalão – Centro de Exposições da Batalha com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands na Batalha: fabrico próprio para Exposalão – Centro de Exposições da Batalha</h2>
        <p>A Exposalão, na Batalha, é o recinto industrial do centro de Portugal: moldes, plásticos, metal, pedra e vidro. São feiras de máquina a trabalhar e produto pesado: construímos com pavimento técnico, potência e ar comprimido previstos e grafismo em português, fabricados em oficina e montados pela nossa equipa.</p>
        <h2>Construtor de stands na Batalha: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-moldplas-batalha">Moldplás</a>, <a href="/pt/ferias/stand-expometal-batalha">Expometal</a>, <a href="/pt/ferias/stand-stone-iberica-batalha">Stone Ibérica</a>, <a href="/pt/ferias/stand-vidrotec-batalha">Vidrotec</a> e <a href="/pt/ferias/stand-decorhotel-batalha">Decorhotel</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_batalha">design e montagem de stands na Batalha</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand na Batalha</a></p>`
  },
  constructor_stand_santarem: {
    breadcrumb: 'Construtor de stands em Santarém',
    title: 'Construtor de stands em Santarém | Oficina própria | Standarte',
    h1: 'Construtor de stands em Santarém',
    introText: "Construímos stands à medida para CNEMA – Centro Nacional de Exposições com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands em Santarém: fabrico próprio para CNEMA – Centro Nacional de Exposições</h2>
        <p>Santarém é o coração agrícola de Portugal: a Feira Nacional de Agricultura e a Agroglobal enchem o CNEMA de tratores, gado e produto. Construímos stands de maquinaria com pavimento reforçado e stands de prova com frio, fabricados em oficina e transportados de Espanha com a montagem incluída.</p>
        <h2>Construtor de stands em Santarém: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-feira-nacional-agricultura-santarem">Feira Nacional de Agricultura</a>, <a href="/pt/ferias/stand-fersant-santarem">FERSANT</a>, <a href="/pt/ferias/stand-agroglobal-santarem">Agroglobal</a> e <a href="/pt/ferias/stand-lusoflora-santarem">Lusoflora</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_santarem">design e montagem de stands em Santarém</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand em Santarém</a></p>`
  },
  constructor_stand_regua: {
    breadcrumb: 'Construtor de stands no Peso da Régua',
    title: 'Construtor de stands no Peso da Régua | Oficina própria | Standarte',
    h1: 'Construtor de stands no Peso da Régua',
    introText: "Construímos stands à medida para Recintos feriales de Peso da Régua (Douro) com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands no Peso da Régua: fabrico próprio para Recintos feriales de Peso da Régua (Douro)</h2>
        <p>O Peso da Régua é o Douro: feiras de vinho do Porto, enoturismo e sabores da região, muitas em espaços abertos junto ao rio. Construímos stands de prova com balcão, frio e garrafeira, preparados para exterior coberto, e levamo-los pré-montados da nossa oficina.</p>
        <h2>Construtor de stands no Peso da Régua: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-douro-porto-wine-festival-regua">Douro & Porto Wine Festival</a>, <a href="/pt/ferias/stand-feira-vinhos-sabores-altos-regua">Feira dos Vinhos e Sabores dos Altos</a> e <a href="/pt/ferias/stand-festa-saberes-sabores-douro-regua">Festa dos Saberes e Sabores do Douro</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_peso_da_regua">design e montagem de stands no Peso da Régua</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand no Peso da Régua</a></p>`
  },
  constructor_stand_portugal_sur: {
    breadcrumb: 'Construtor de stands no Sul de Portugal',
    title: 'Construtor de stands no Sul de Portugal | Oficina própria | Standarte',
    h1: 'Construtor de stands no Sul de Portugal',
    introText: "Construímos stands à medida para Parque de Exposições de Beja y recintos del Algarve com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands no Sul de Portugal: fabrico próprio para Parque de Exposições de Beja y recintos del Algarve</h2>
        <p>O Sul de Portugal expõe em Beja, com a Ovibeja e a Vinipax, e no Algarve, com a Fatacil e as feiras de Portimão e Lagoa: agricultura, vinho e grande público. Construímos stands de exterior coberto com pavimento lavável e stands de prova, e transportamo-los pré-montados de Espanha com a montagem incluída.</p>
        <h2>Construtor de stands no Sul de Portugal: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-ovibeja-beja">Ovibeja</a>, <a href="/pt/ferias/stand-fatacil-lagoa">Fatacil</a>, <a href="/pt/ferias/stand-faceco-moncarapacho">Faceco</a>, <a href="/pt/ferias/stand-feira-de-sao-martinho-portimao">Feira de São Martinho</a>, <a href="/pt/ferias/stand-feira-daires-viana-do-alentejo">Feira d'Aires</a> e <a href="/pt/ferias/stand-vinipax-beja">Vinipax Beja</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_sul_portugal">design e montagem de stands no Sul de Portugal</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand no Sul de Portugal</a></p>`
  },
  constructor_stand_islas_de_madeira: {
    breadcrumb: 'Construtor de stands na Madeira',
    title: 'Construtor de stands na Madeira | Oficina própria | Standarte',
    h1: 'Construtor de stands na Madeira',
    introText: "Construímos stands à medida para Madeira Tecnopolo (Funchal) com fabrico em oficina própria: carpintaria, estrutura, mobiliário e grafismo produzidos pela nossa equipa, transporte tratado por nós e montagem terminada antes da abertura.",
    body: `
        <h2>Construtor de stands na Madeira: fabrico próprio para Madeira Tecnopolo (Funchal)</h2>
        <p>A Madeira expõe no Tecnopolo do Funchal: feiras de emprego, empreendedorismo, agropecuária e vinho. Tudo chega em contentor: fabricamos e pré-montamos o stand inteiro em oficina, numeramo-lo peça a peça e embarcamo-lo com sobressalentes, para que na ilha só haja que montar.</p>
        <h2>Construtor de stands na Madeira: feiras da região</h2>
        <p>Construímos para o calendário da região: <a href="/pt/ferias/stand-expomadeira">Expomadeira</a>, <a href="/pt/ferias/stand-feira-agropecuaria-madeira">Feira Agropecuária da Madeira</a>, <a href="/pt/ferias/stand-feira-emprego-formacao-empreendedorismo-madeira">Feira do Emprego, Formação e Empreendedorismo</a>, <a href="/pt/ferias/stand-feira-empreendedorismo-madeira">Feira do Empreendedorismo da Madeira</a>, <a href="/pt/ferias/stand-festa-vinho-madeira">Festa do Vinho da Madeira</a> e <a href="/pt/ferias/stand-cider-fest-madeira">Cider Fest Madeira</a>. O serviço completo de design e montagem está na nossa página de <a href="/pt/design_montagem_stands_ilhas_madeira">design e montagem de stands na Madeira</a>.</p>
        <p><a class="oro-cta-espacio" href="#contact">Peça orçamento de construção para o seu stand na Madeira</a></p>`
  },
};

// Se cuelgan como builderSeoData[seccion].pt, igual que la capa inglesa.
for (const [k, v] of Object.entries(PT)) {
  if (builderSeoData[k]) builderSeoData[k].pt = v;
}
