const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuración básica
const newsDataPath = path.join(__dirname, '..', 'src', 'lib', 'newsData.json');
const geminiApiKey = process.env.GEMINI_API_KEY;

console.log('==========================================================');
console.log('          STANDARTE - Generador de Noticias IA           ');
console.log('==========================================================\n');

// Pool de imágenes reales de la galería del portafolio de Standarte
const galleryImages = [
  { full: 'img/trabajos/TCANTICO/1.avif', alt: 'Stand de madera premium TCANTICO', desc: 'Microarquitectura experiencial con presencia arquitectónica clara y zonas abiertas de madera premium de Standarte' },
  { full: 'img/trabajos/TCELUMATEC/4.avif', alt: 'Stand corporativo TCELUMATEC', desc: 'Estructura ordenada y planos limpios con lamas de madera natural que transmiten precisión técnica y carpintería fina' },
  { full: 'img/trabajos/TCCONSTELLIUM/2.avif', alt: 'Stand a medida TCCONSTELLIUM', desc: 'Espacio combinando volumen, rotulación aérea de alta visibilidad y diseño de flujo humano libre de barreras' },
  { full: 'img/trabajos/TCFARNEL/2.avif', alt: 'Stand de diseño TCFARNEL', desc: 'Estructuras de madera de alta carpintería combinadas con gráfica retroiluminada para potenciar la arquitectura de atención' },
  { full: 'img/trabajos/TCMAGNOLIA/2.avif', alt: 'Stand de madera TCMAGNOLIA', desc: 'Diseño tridimensional inmersivo y acogedor que configura un espacio de permanencia idóneo para negociaciones comerciales' },
  { full: 'img/trabajos/TCMFI/2.avif', alt: 'Stand corporativo TCMFI', desc: 'Microarquitectura experiencial orientada a ordenar la exhibición de producto y facilitar la circulación fluida' },
  { full: 'img/trabajos/TCORGADATA/2.avif', alt: 'Stand de interior TCORGADATA', desc: 'Stand a medida en madera premium con estructuras de concentración visual elevadas en pabellones cubiertos' },
  { full: 'img/trabajos/TCEMIL/1.avif', alt: 'Stand premium TCEMIL', desc: 'Composición robusta en madera natural que proyecta solidez, rigor y una presencia de marca corporativa inmejorable' },
  { full: 'img/trabajos/TCPHARMA/2.avif', alt: 'Stand de diseño TCPHARMA', desc: 'Stand interior de imagen técnica impecable con integraciones textiles retroiluminadas y acabados nobles' },
  { full: 'img/trabajos/TCSCHOEFFEL/2.avif', alt: 'Stand modular premium TCSCHOEFFEL', desc: 'Diseño arquitectónico con pórticos modulares y lamas acústicas que configuran espacios de permanencia confortables' },
  { full: 'img/trabajos/TCSES/1.avif', alt: 'Stand con marquesina TCSES', desc: 'Estructuras suspendidas de gran formato y marquesinas iluminadas para máxima visualización y arquitectura de atención' },
  { full: 'img/trabajos/TELASRGB/1.avif', alt: 'Stand con iluminación tensada Philips', desc: 'Stands con iluminación integral y tejidos tensados premium de alta visibilidad en pasillos con gran tránsito ferial' }
];

// Feeds RSS de Google News por ciudad (Rotativo diario)
const cities = [
  { name: 'Madrid', query: 'IFEMA+ferias+madrid', hl: 'es', gl: 'ES', ceid: 'ES:es' },
  { name: 'Málaga', query: 'FYCMA+ferias+malaga', hl: 'es', gl: 'ES', ceid: 'ES:es' },
  { name: 'Lisboa', query: 'FIL+feiras+lisboa', hl: 'pt-PT', gl: 'PT', ceid: 'PT:pt-150' }
];

// Base de datos de reserva por si no hay API Key de Gemini
const fallbackDatabase = [
  {
    "slug": "innovacion-arquitectura-atencion-madrid-2026",
    "title": "Innovación y Arquitectura de Atención en los Pabellones de Madrid 2026",
    "excerpt": "Analizamos las claves del diseño de flujo humano y los espacios de permanencia para stands de interior de alto rendimiento en las grandes ferias de Madrid.",
    "date": "",
    "location": "Madrid",
    "lang": "es",
    "sourceName": "Hosteltur",
    "sourceUrl": "https://www.hosteltur.com",
    "seoKeywords": ["stands a medida Madrid", "arquitectura de atencion", "diseño de flujo humano", "espacios de permanencia", "microarquitectura experiencial"],
    "content": "<h2>El arte de capturar miradas en los pasillos de IFEMA</h2><p>Exponer en Madrid exige dominar la <strong>arquitectura de atención</strong>. En pabellones masivos con cientos de expositores, el diseño tridimensional de tu stand debe actuar como un imán visual inmediato.</p><p>En <strong>Standarte</strong> estructuramos cada proyecto bajo los principios de la <strong>microarquitectura experiencial</strong>. Esto significa emplear maderas nobles sostenibles y acabados premium para crear un entorno acogedor que destaque de forma honesta frente a los módulos tradicionales de metal.</p><p>Además de la estética, la funcionalidad comercial requiere planificar un impecable <strong>diseño de flujo humano</strong>. Eliminamos las barreras de entrada rígidas y diseñamos accesos fluidos para invitar al cliente a entrar de forma natural. En el interior, la creación de <strong>espacios de permanencia</strong> confortables —con lamas acústicas y áreas de hospitality— proporciona el clima de tranquilidad necesario para cerrar negociaciones exitosas en un ambiente profesional.</p><figure style=\"margin: 40px 0; text-align: center;\"><img src=\"/img/trabajos/TCANTICO/1.avif\" alt=\"Stand de madera premium\" style=\"width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);\"><figcaption style=\"font-size: 13px; color: #777; margin-top: 8px; font-style: italic;\">Microarquitectura experiencial con presencia arquitectónica clara y zonas abiertas de madera premium.</figcaption></figure><p>¿Estás planificando tu presencia en la Feria de Madrid? <a href=\"/contacto\">Ponte en contacto con el equipo de Standarte</a> y permítenos diseñar una microarquitectura que convierta las visitas en relaciones comerciales duraderas.</p>"
  },
  {
    "slug": "microarquitectura-experiencial-fycma-malaga-2026",
    "title": "Microarquitectura Experiencial en FYCMA Málaga 2026: Innovación en Stands de Interior",
    "excerpt": "Descubre cómo las marcas líderes de tecnología aplican la microarquitectura experiencial y el diseño de flujo humano en el palacio de congresos de Málaga.",
    "date": "",
    "location": "Málaga",
    "lang": "es",
    "sourceName": "Málaga Hoy",
    "sourceUrl": "https://www.malagahoy.es",
    "seoKeywords": ["stands a medida Malaga", "microarquitectura experiencial", "diseño de flujo humano", "espacios de permanencia", "LuzPavilion interiores"],
    "content": "<h2>FYCMA: Un entorno exigente para la retención comercial</h2><p>El Digital Enterprise Show y otros grandes congresos tecnológicos en FYCMA Málaga demandan stands interiores con alta personalidad ferial. Para sobresalir en estos pabellones cerrados, la <strong>microarquitectura experiencial</strong> en madera se convierte en el mayor diferencial corporativo.</p><p>La implementación de nuestro sistema modular <strong>LuzPavilion</strong> en interiores cubiertos permite acotar áreas exclusivas de networking y hospitalidad. Al combinar perfiles limpios con paneles táctiles orgánicos, diseñamos zonas VIP que actúan como refugios acústicos.</p><p>Este diseño se complementa con un riguroso <strong>diseño de flujo humano</strong> que conduce de forma lógica al visitante por los puntos interactivos. Al ubicar cómodos <strong>espacios de permanencia</strong> equipados con mobiliario ergonómico en madera natural, facilitamos que los clientes se sientan cómodos y mantengan reuniones comerciales productivas libres del estrés del pabellón.</p><figure style=\"margin: 40px 0; text-align: center;\"><img src=\"/img/trabajos/TCELUMATEC/4.avif\" alt=\"Microarquitectura experiencial de interior\" style=\"width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);\"><figcaption style=\"font-size: 13px; color: #777; margin-top: 8px; font-style: italic;\">Estructura ordenada y planos limpios con lamas de madera natural en el palacio de congresos.</figcaption></figure><p>Diseña un micro-pabellón de alto standing para tu próxima cita tecnológica en Málaga. <a href=\"/contacto\">Contacta hoy mismo con Standarte</a> y solicita un modelado 3D fidedigno de tu proyecto.</p>"
  },
  {
    "slug": "arquitectura-atencion-fil-lisboa-2026",
    "title": "Web Summit FIL Lisboa 2026: Claves de la Arquitectura de Atención en Stands",
    "excerpt": "Exploramos cómo las marcas de vanguardia combinan lamas de madera y estructuras de concentración visual en la FIL de Lisboa para retener al cliente.",
    "date": "",
    "location": "Lisboa",
    "lang": "es",
    "sourceName": "Público",
    "sourceUrl": "https://www.publico.pt",
    "seoKeywords": ["stands Lisboa Web Summit", "arquitectura de atencion", "estructuras concentracion visual", "espacios de permanencia", "diseño stands Portugal"],
    "content": "<h2>FIL Lisboa: Diseñar para la escala global de Web Summit</h2><p>La Web Summit de Lisboa atrae a miles de corporaciones mundiales a los pabellones de la FIL. Con tal nivel de competencia visual, la <strong>arquitectura de atención</strong> y el uso de <strong>estructuras de concentración visual</strong> elevadas resultan indispensables para orientar la mirada de inversores y directivos hacia tu espacio corporativo.</p><p>En <strong>Standarte</strong>, diseñamos stands a medida de alta carpintería que destacan por su honestidad constructiva. En lugar de plásticos fríos, nuestras lamas de madera noble aportan una calidez que reconforta el ojo y calma la fatiga visual del pabellón.</p><p>Para organizar el tráfico, empleamos un <strong>diseño de flujo humano</strong> zonificado que separa el área abierta de interacción del área privada de hospitalidad. En esta zona interior, se integran confortables <strong>espacios de permanencia</strong> que aíslan acústicamente las conversaciones comerciales del ruido circundante de la feria, optimizando la tasa de conversión comercial de tu equipo.</p><figure style=\"margin: 40px 0; text-align: center;\"><img src=\"/img/trabajos/TCCONSTELLIUM/2.avif\" alt=\"Diseño de stands de interior en la FIL\" style=\"width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);\"><figcaption style=\"font-size: 13px; color: #777; margin-top: 8px; font-style: italic;\">Espacio corporativo combinando volumen y diseño de flujo humano zonificado.</figcaption></figure><p>Leva tu presencia de marca en Portugal al máximo nivel ferial. <a href=\"/contacto\">Habla con el equipo de Standarte en Lisboa</a> para recibir una propuesta integral a medida.</p>"
  }
];

// Helper HTTPS para descargar
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          resolve(fetchUrl(redirectUrl));
          return;
        }
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

// Helper HTTPS para POST
function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const req = https.request({
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', (err) => reject(err));
    req.write(body);
    req.end();
  });
}

async function run() {
  try {
    // 1. Cargar Base de Datos de noticias actuales
    let newsData = [];
    if (fs.existsSync(newsDataPath)) {
      newsData = JSON.parse(fs.readFileSync(newsDataPath, 'utf8'));
    }
    console.log(`-> Cargados ${newsData.length} artículos de noticias existentes.`);

    // 2. Rotar ciudad basándose en el día del año
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const selectedCity = cities[dayOfYear % cities.length];
    console.log(`-> Día del año: ${dayOfYear}. Ciudad seleccionada para buscar: ${selectedCity.name}`);

    // 3. Buscar noticias recientes en Google News RSS
    const rssUrl = `https://news.google.com/rss/search?q=${selectedCity.query}&hl=${selectedCity.hl}&gl=${selectedCity.gl}&ceid=${selectedCity.ceid}`;
    console.log(`-> Descargando Google News Feed desde: ${rssUrl}`);
    const rssXml = await fetchUrl(rssUrl);

    // Parsear ítems con Regex
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    const items = [];
    while ((match = itemRegex.exec(rssXml)) !== null) {
      const itemContent = match[1];
      const title = (itemContent.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const link = (itemContent.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
      const pubDate = (itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      const source = (itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '';
      items.push({ title, link, pubDate, source });
    }

    if (items.length === 0) {
      console.log('-> No se encontraron noticias en el feed. Utilizando fallback.');
      useFallback(newsData);
      return;
    }

    // Seleccionar una noticia semi-aleatoria entre las primeras 5
    const selectedItem = items[Math.floor(Math.random() * Math.min(5, items.length))];
    console.log(`-> Noticia de actualidad seleccionada: "${selectedItem.title}"`);

    // 4. Redacción con Gemini si hay API Key, de lo contrario fallback
    if (!geminiApiKey) {
      console.log('-> GEMINI_API_KEY no detectada. Utilizando base de datos de fallback premium.');
      useFallback(newsData);
      return;
    }

    console.log('-> GEMINI_API_KEY detectada. Iniciando generación por Inteligencia Artificial...');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

    // Convertir el pool de imágenes en texto estructurado para el prompt
    const imagesListText = galleryImages.map((img, idx) => `ID ${idx + 1}: URL: "/${img.full}", Alt: "${img.alt}", Contexto: "${img.desc}"`).join('\n');

    const promptText = `Eres un redactor experto en marketing de eventos y arquitectura efímera para la empresa Standarte (https://standarte.es). Tu tarea es redactar un artículo de blog premium en español basado en la siguiente noticia de actualidad:
Noticia original: ${selectedItem.title}
Fuente original: ${selectedItem.source}
Enlace original: ${selectedItem.link}
Ubicación del evento ferial: ${selectedCity.name} (FYCMA si es Málaga, IFEMA si es Madrid, FIL si es Lisboa)

REGLAS ESTRICTAS DE NEGOCIO Y CONTENIDO:
1. El artículo debe centrarse EXCLUSIVAMENTE en la construcción de stands de diseño para INTERIORES dentro de recintos feriales cerrados.
2. Queda PROHIBIDO utilizar conceptos climáticos o de exterior, tales como "confort térmico", "sombra", "calor", "eventos exteriores" o "carpas".
3. Debes incorporar de forma natural, elegante y en el contexto adecuado los siguientes 5 términos clave de nuestro glosario arquitectónico de Standarte:
   - "Arquitectura de atención": Capturar el interés visual del visitante desde los pasillos masivos.
   - "Espacios de permanencia": Diseñar áreas confortables (salas semi-abiertas, hospitality en madera) para retener al cliente potencial en una conversación de valor.
   - "Diseño de flujo humano": Distribuir estratégicamente los accesos y mostradores para facilitar el tránsito sin barreras ni congestión.
   - "Estructuras de concentración visual": Elementos elevados o suspendidos (pórticos, cabeceras) visibles a larga distancia.
   - "Microarquitectura experiencial": La concepción del stand de madera premium a medida como un entorno tridimensional inmersivo que transmite la esencia de la marca.
4. El tono debe ser profesional, sofisticado y persuasivo.
5. El contenido del artículo debe estar maquetado en HTML limpio y semántico (usando <h2>, <h3>, <p>, <ul>, <li>, <strong>). No incluyas la estructura general de <html>, <head> ni <body>.
6. Debes INYECTAR en medio de tu artículo una sola etiqueta de imagen <figure> maquetada con esta estructura exacta:
   <figure style="margin: 40px 0; text-align: center;"><img src="[URL_ELEGIDA]" alt="[ALT_ELEGIDO]" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;">[CAPTION_PERSONALIZADA_Y_HILADA_CON_EL_TEXTO]</figcaption></figure>
   Elige la imagen que mejor encaje con tu redacción del siguiente listado de imágenes reales de nuestra galería de Standarte:
${imagesListText}
7. Al final de la sección 'content' (dentro del propio HTML), añade un elegante bloque de llamado a la acción (CTA) con enlaces a la sección de contacto de Standarte para solicitar un modelado 3D realista.

Genera un objeto JSON puro con los siguientes campos:
- title: Un título cautivador y optimizado para SEO (en español).
- excerpt: Un resumen atractivo de 2 líneas (en español).
- content: El cuerpo del artículo redactado en HTML (en español) conteniendo la figura de la imagen inyectada.
- seoKeywords: Un array de 5 palabras clave de SEO altamente relevantes.`;

    const requestBody = JSON.stringify({
      contents: [{
        parts: [{
          text: promptText
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            excerpt: { type: "STRING" },
            content: { type: "STRING" },
            seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
          },
          required: ["title", "excerpt", "content", "seoKeywords"]
        }
      }
    });

    const responseText = await postJson(geminiUrl, requestBody);
    const responseJson = JSON.parse(responseText);
    
    if (responseJson.candidates && responseJson.candidates[0] && responseJson.candidates[0].content && responseJson.candidates[0].content.parts[0].text) {
      const generatedArticle = JSON.parse(responseJson.candidates[0].content.parts[0].text);
      
      const slug = generatedArticle.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      // Extraer la URL de la imagen del contenido generado por IA
      const imgMatch = generatedArticle.content.match(/<img[^>]+src=["']([^"']+)["']/);
      const imageUrl = imgMatch ? imgMatch[1] : '/img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif';

      const finalArticle = {
        slug: slug,
        title: generatedArticle.title,
        excerpt: generatedArticle.excerpt,
        date: new Date().toISOString().split('T')[0],
        location: selectedCity.name,
        lang: "es",
        sourceName: selectedItem.source || "Google News",
        sourceUrl: selectedItem.link,
        seoKeywords: generatedArticle.seoKeywords,
        image: imageUrl,
        content: generatedArticle.content
      };

      // Evitar duplicados
      if (newsData.some(art => art.slug === finalArticle.slug)) {
        console.log(`-> El artículo "${finalArticle.title}" ya existía en la colección (slug duplicado). Omitiendo.`);
        return;
      }

      newsData.unshift(finalArticle);
      fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf8');
      console.log(`\n==========================================================`);
      console.log(`   [ARTÍCULO GENERADO POR IA] Sincronizado en la Base de Datos   `);
      console.log(`   Título: "${finalArticle.title}"`);
      console.log(`   Slug:   "${finalArticle.slug}"`);
      console.log(`==========================================================\n`);
    } else {
      console.log('-> Error en el formato de respuesta de Gemini. Utilizando fallback.');
      useFallback(newsData);
    }
  } catch (error) {
    console.error('[ERROR] Excepción durante el proceso autónomo:', error);
    useFallback(newsData);
  }
}

// Función de Fallback robusta con imágenes dinamizadas del portafolio completo
function useFallback(newsData) {
  console.log('-> Activando mecanismo de Fallback...');
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Buscar un artículo del fallback que no haya sido insertado aún
  let selectedFallback = null;
  for (const fallback of fallbackDatabase) {
    if (!newsData.some(art => art.slug === fallback.slug)) {
      selectedFallback = JSON.parse(JSON.stringify(fallback)); // Clonación profunda para evitar mutaciones
      break;
    }
  }

  if (!selectedFallback) {
    console.log('-> Todos los artículos de fallback ya han sido insertados. No hay nuevas noticias para añadir hoy.');
    return;
  }

  // Dinamizar imagen del pool completo de Standarte para evitar repetir la misma imagen
  const usedImages = newsData.slice(0, 8).map(art => art.image);
  let availableImages = galleryImages.filter(img => {
    const pathWithSlash = `/${img.full}`;
    return !usedImages.includes(img.full) && !usedImages.includes(pathWithSlash);
  });
  if (availableImages.length === 0) {
    availableImages = galleryImages;
  }
  const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
  console.log(`-> Dinamizando fallback con imagen aleatoria: /${randomImage.full} (alt: ${randomImage.alt})`);
  
  const customFigureHtml = `<figure style="margin: 40px 0; text-align: center;"><img src="/${randomImage.full}" alt="${randomImage.alt}" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;">${randomImage.desc}.</figcaption></figure>`;
  
  // Reemplazar la figura estática del fallback por la dinamizada del portafolio completo
  selectedFallback.content = selectedFallback.content.replace(/<figure[\s\S]*?<\/figure>/, customFigureHtml);
  selectedFallback.image = `/${randomImage.full}`;
  selectedFallback.date = currentDate;
  
  newsData.unshift(selectedFallback);
  fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf8');

  console.log(`\n==========================================================`);
  console.log(`   [ARTÍCULO FALLBACK] Sincronizado en la Base de Datos   `);
  console.log(`   Título: "${selectedFallback.title}"`);
  console.log(`   Slug:   "${selectedFallback.slug}"`);
  console.log(`==========================================================\n`);
}

run();
