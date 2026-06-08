const fs = require('fs');

let content = fs.readFileSync('src/lib/siteData.js', 'utf8');

// Madrid
content = content.replace(
  "city: { es: 'Madrid', en: 'Madrid', de: 'Madrid', zh: '马德里', hi: 'मैड्रिड', pt: 'Madrid' }",
  "city: { es: 'Madrid', en: 'Madrid', de: 'Madrid', zh: '马德里', hi: 'मैड्रिड', pt: 'Madrid', fr: 'Madrid', it: 'Madrid' }"
);
content = content.replace(
  /pt: \{\s*intro: 'A Standarte desenvolve stands em Madrid[^}]*\}\s*\}/,
  `pt: {
        intro: 'A Standarte desenvolve stands em Madrid através de um processo completo: design técnico, produção, logística, montagem, validação e coordenação no local antes da abertura do evento.',
        detail: 'Este serviço destina-se a agências de comunicação, expositores e marcas que precisam de execução fiável, acabamentos cuidados e um stand preparado para visitantes profissionais.'
      },
      fr: {
        intro: 'Standarte conçoit et installe des stands à Madrid via un processus complet : design technique, fabrication, logistique, montage, validation et coordination sur site avant l\\'ouverture du salon.',
        detail: 'Ce service s\\'adresse aux agences de communication, exposants et marques nécessitant une exécution fiable, des finitions soignées et un espace prêt à accueillir les visiteurs.'
      },
      it: {
        intro: 'Standarte sviluppa stand a Madrid attraverso un processo completo: progettazione tecnica, produzione, logistica, montaggio, validazione e coordinamento in loco prima dell\\'apertura dell\\'evento.',
        detail: 'Questo servizio è rivolto ad agenzie di comunicazione, espositori e marchi che necessitano di un\\'esecuzione affidabile, finiture curate e uno stand pronto per i visitatori.'
      }
    }`
);

// Lisbon
content = content.replace(
  "city: { es: 'Lisboa', en: 'Lisbon', de: 'Lissabon', zh: '里斯本', hi: 'लिस्बन', pt: 'Lisboa' }",
  "city: { es: 'Lisboa', en: 'Lisbon', de: 'Lissabon', zh: '里斯本', hi: 'लिस्बन', pt: 'Lisboa', fr: 'Lisbonne', it: 'Lisbona' }"
);
content = content.replace(
  /pt: \{\s*intro: 'A Standarte desenvolve stands em Lisboa[^}]*\}\s*\}/,
  `pt: {
        intro: 'A Standarte desenvolve stands em Lisboa através de um processo completo: design técnico, produção, logística, montagem, validação e coordenação no local antes da abertura do evento.',
        detail: 'Este serviço destina-se a agências de comunicação, expositores e marcas que precisam de execução fiável, acabamentos cuidados e um stand preparado para visitantes profissionais.'
      },
      fr: {
        intro: 'Standarte développe des stands d\\'exposition à Lisbonne à travers un processus complet : conception technique, production, logistique, montage et validation sur site.',
        detail: 'Ce service s\\'adresse aux agences de communication, exposants et marques qui ont besoin d\\'une exécution fiable et de finitions de haute qualité.'
      },
      it: {
        intro: 'Standarte realizza stand fieristici a Lisbona attraverso un processo completo: progettazione tecnica, produzione, logistica, installazione e validazione in loco.',
        detail: 'Questo servizio è pensato per agenzie di comunicazione, espositori e brand che richiedono un\\'esecuzione affidabile e finiture curate per i visitatori professionali.'
      }
    }`
);

// Malaga
content = content.replace(
  "city: { es: 'Málaga', en: 'Malaga', de: 'Málaga', zh: '马拉加', hi: 'मलागा', pt: 'Málaga' }",
  "city: { es: 'Málaga', en: 'Malaga', de: 'Málaga', zh: '马拉加', hi: 'मलागा', pt: 'Málaga', fr: 'Malaga', it: 'Malaga' }"
);
content = content.replace(
  /pt: \{\s*intro: 'A Standarte desenvolve stands em Málaga[^}]*\}\s*\}/,
  `pt: {
        intro: 'A Standarte desenvolve stands em Málaga através de um processo completo: design técnico, produção, logística, montagem, validação e coordenação no local antes da abertura do evento.',
        detail: 'Este serviço destina-se a agências de comunicação, expositores e marcas que precisam de execução fiável, acabamentos cuidados e um stand preparado para visitantes profissionais.'
      },
      fr: {
        intro: 'Málaga attire de plus en plus de projets professionnels, congrès et événements. Standarte conçoit des stands à Malaga en accordant une attention particulière aux finitions et à l\\'expérience visiteur.',
        detail: 'Notre approche permet de préparer à l\\'avance les matériaux, les graphiques et l\\'éclairage pour que le stand soit opérationnel dès le premier jour.'
      },
      it: {
        intro: 'Malaga riunisce un numero crescente di progetti professionali e congressi. Standarte progetta stand a Malaga con attenzione ai dettagli e all\\'esperienza del visitatore.',
        detail: 'Il nostro approccio permette di preparare in anticipo materiali, grafica e illuminazione affinché lo stand funzioni fin dal primo giorno.'
      }
    }`
);

// Barcelona
content = content.replace(
  "city: { es: 'Barcelona', en: 'Barcelona', de: 'Barcelona', zh: '巴塞罗那', hi: 'बार्सिलोना', pt: 'Barcelona' }",
  "city: { es: 'Barcelona', en: 'Barcelona', de: 'Barcelona', zh: '巴塞罗那', hi: 'बार्सिलोना', pt: 'Barcelona', fr: 'Barcelone', it: 'Barcellona' }"
);
content = content.replace(
  /pt: \{\s*intro: 'Barcelona é um dos principais polos mundiais[^}]*\}\s*\}/,
  `pt: {
        intro: 'Barcelona é um dos principais polos mundiais de design e atividade de congressos de referência. Na Standarte desenvolvemos stands à medida em Barcelona com um processo completo: desde a conceção técnica em 3D até à montagem final na Fira Barcelona.',
        detail: 'A solução ideal para marcas globais e agências exigentes que procuram acabamentos premium de alta carpintaria e rigor na execução ferial.'
      },
      fr: {
        intro: 'Barcelone est l\\'une des capitales mondiales du design et des congrès de pointe. Standarte propose la conception et la construction de stands sur mesure à Barcelone avec une approche intégrale : de la modélisation 3D à la logistique et au montage à la Fira Barcelona.',
        detail: 'Parfait pour les marques mondiales et les agences exigeantes à la recherche de finitions en haute menuiserie et d\\'une précision technique lors de grands événements internationaux.'
      },
      it: {
        intro: 'Barcellona è una delle capitali mondiali del design e dei congressi all\\'avanguardia. In Standarte realizziamo stand su misura a Barcellona con un approccio integrale: dalla modellazione 3D alla logistica e all\\'allestimento presso Fira Barcelona.',
        detail: 'Ideale per marchi globali e agenzie esigenti che cercano finiture di alta falegnameria e precisione tecnica in eventi di grande rilevanza internazionale.'
      }
    }`
);

// Bilbao
content = content.replace(
  "city: { es: 'Bilbao', en: 'Bilbao', de: 'Bilbao', zh: '毕尔巴鄂', hi: 'बिलबाओ', pt: 'Bilbao' }",
  "city: { es: 'Bilbao', en: 'Bilbao', de: 'Bilbao', zh: '毕尔巴鄂', hi: 'बिलबाओ', pt: 'Bilbao', fr: 'Bilbao', it: 'Bilbao' }"
);
content = content.replace(
  /pt: \{\s*intro: 'Bilbao representa o coração industrial[^}]*\}\s*\}/,
  `pt: {
        intro: 'Bilbao representa o coração industrial e a engenharia de ponta do norte de Espanha. Na Standarte concebemos e montamos stands de alta carpintaria em Bilbao, proporcionando solidez construtiva e uma forte presença de marca no Bilbao Exhibition Centre (BEC).',
        detail: 'Otimizamos o design de fluxo humano e criamos espacios de permanencia confortables, ideais para empresas industriais com elevados padrões técnicos.'
      },
      fr: {
        intro: 'Bilbao représente le cœur industriel et l\\'ingénierie de pointe du nord de l\\'Espagne. Standarte réalise la conception et le montage de stands en haute menuiserie à Bilbao, garantissant une solidité constructive et une excellente présence de marque au Bilbao Exhibition Centre (BEC).',
        detail: 'Nous optimisons la circulation des personnes et créons des espaces confortables, idéaux pour les entreprises industrielles aux normes techniques strictes.'
      },
      it: {
        intro: 'Bilbao rappresenta il cuore industriale e dell\\'ingegneria all\\'avanguardia nel nord della Spagna. In Standarte ci occupiamo della progettazione e montaggio di stand di alta falegnameria a Bilbao, fornendo solidità e un\\'eccellente presenza del brand al Bilbao Exhibition Centre (BEC).',
        detail: 'Ottimizziamo la circolazione delle persone e creiamo spazi di permanenza confortevoli, ideali per le aziende industriali ad alta esigenza tecnica.'
      }
    }`
);

// Badajoz
content = content.replace(
  "city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz' }",
  "city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz' }"
);
content = content.replace(
  /pt: \{\s*intro: 'Badajoz e a região da Extremadura representam[^}]*\}\s*\}/,
  `pt: {
        intro: 'Badajoz e a região da Extremadura representam um mercado de feiras muito dinâmico, com eventos agrícolas, pecuários e industriais de grande tradição. Na Standarte concebemos e montamos stands de alta carpintaria em recintos de referência como a FEVAL em Don Benito e a IFEBA em Badajoz.',
        detail: 'A nossa forte ligação local permite-nos responder rapidamente, otimizar custos de logística e assegurar um stand impecável para encontros de relevo como a AGROEXPO o u a FECIEX.'
      },
      fr: {
        intro: 'Badajoz et la région d\\'Estrémadure représentent un marché dynamique avec des événements agricoles, de l\\'élevage et industriels de grande tradition. Nous concevons, fabriquons et montons des stands de haute menuiserie dans des lieux clés comme la FEVAL à Don Benito et l\\'IFEBA à Badajoz.',
        detail: 'Notre présence locale nous permet de répondre rapidement, d\\'optimiser les coûts logistiques et de garantir un stand impeccable pour des événements majeurs comme AGROEXPO ou FECIEX.'
      },
      it: {
        intro: 'Badajoz e la regione dell\\'Estremadura rappresentano un mercato fieristico dinamico con eventi agricoli e industriali di grande tradizione. Progettiamo, produciamo e allestiamo stand di alta falegnameria in centri di riferimento come FEVAL a Don Benito e IFEBA a Badajoz.',
        detail: 'La nostra presenza locale ci consente di rispondere rapidamente, ottimizzare i costi logistici e garantire uno stand impeccabile per appuntamenti chiave come AGROEXPO o FECIEX.'
      }
    }`
);

fs.writeFileSync('src/lib/siteData.js', content, 'utf8');
console.log('Finished updating cityData.');
