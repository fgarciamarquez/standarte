const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuración básica
const newsDataPath = path.join(__dirname, '..', 'src', 'lib', 'newsData.json');
const fallbackDatabase = require('./fallback_data.json');
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

// Feeds RSS de Google News por ciudad
const cities = [
  { name: 'Madrid', query: 'IFEMA+ferias+madrid', hl: 'es', gl: 'ES', ceid: 'ES:es' },
  { name: 'Málaga', query: 'FYCMA+ferias+malaga', hl: 'es', gl: 'ES', ceid: 'ES:es' },
  { name: 'Lisboa', query: 'FIL+feiras+lisboa', hl: 'pt-PT', gl: 'PT', ceid: 'PT:pt-150' },
  { name: 'Barcelona', query: 'Fira+Barcelona+ferias', hl: 'es', gl: 'ES', ceid: 'ES:es' },
  { name: 'Bilbao', query: 'BEC+Bilbao+ferias', hl: 'es', gl: 'ES', ceid: 'ES:es' }
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

    // 2. Rotar ciudad basándose en el día del año y buscar noticias disponibles
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    
    let selectedCity = null;
    let selectedItem = null;
    let items = [];

    for (let i = 0; i < cities.length; i++) {
      const cityIndex = (dayOfYear + i) % cities.length;
      const city = cities[cityIndex];
      console.log(`-> Intentando buscar noticias en la ciudad: ${city.name} (Índice: ${cityIndex})...`);
      
      const rssUrl = `https://news.google.com/rss/search?q=${city.query}&hl=${city.hl}&gl=${city.gl}&ceid=${city.ceid}`;
      console.log(`   Descargando feed RSS desde: ${rssUrl}`);
      
      try {
        const rssXml = await fetchUrl(rssUrl);
        
        // Parsear ítems con Regex
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        const tempItems = [];
        while ((match = itemRegex.exec(rssXml)) !== null) {
          const itemContent = match[1];
          const title = (itemContent.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
          const link = (itemContent.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
          const pubDate = (itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
          const source = (itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '';
          tempItems.push({ title, link, pubDate, source });
        }
        
        if (tempItems.length > 0) {
          selectedCity = city;
          items = tempItems;
          selectedItem = tempItems[Math.floor(Math.random() * Math.min(5, tempItems.length))];
          console.log(`   ¡Éxito! Encontradas ${tempItems.length} noticias para ${city.name}.`);
          console.log(`   Noticia seleccionada: "${selectedItem.title}"`);
          break;
        } else {
          console.log(`   No se encontraron noticias en el feed de ${city.name}. Probando con la siguiente ciudad.`);
        }
      } catch (feedError) {
        console.error(`   Error al obtener el feed de ${city.name}:`, feedError);
      }
    }

    if (items.length === 0) {
      console.log('-> No se encontraron noticias en ninguna de las ciudades configuradas. Utilizando fallback.');
      useFallback(newsData);
      return;
    }

    // 4. Redacción con Gemini si hay API Key, de lo contrario fallback
    if (!geminiApiKey) {
      console.log('-> GEMINI_API_KEY no detectada. Utilizando base de datos de fallback premium.');
      useFallback(newsData);
      return;
    }

    console.log('-> GEMINI_API_KEY detectada. Iniciando generación por Inteligencia Artificial en 6 idiomas...');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

    // Convertir el pool de imágenes en texto estructurado para el prompt
    const imagesListText = galleryImages.map((img, idx) => `ID ${idx + 1}: URL: "/${img.full}", Alt: "${img.alt}", Contexto: "${img.desc}"`).join('\n');

    const promptText = `Eres un redactor experto en marketing de eventos y arquitectura efímera para la empresa Standarte (https://standarte.es). Tu tarea es redactar y traducir un artículo de blog premium en 6 idiomas (es, en, de, pt, zh, hi) basado en la siguiente noticia de actualidad:
Noticia original: ${selectedItem.title}
Fuente original: ${selectedItem.source}
Enlace original: ${selectedItem.link}
Ubicación del evento ferial: ${selectedCity.name} (FYCMA si es Málaga, IFEMA si es Madrid, FIL si es Lisboa, Fira Barcelona si es Barcelona, BEC si es Bilbao)

REGLAS ESTRICTAS DE NEGOCIO Y CONTENIDO PARA TODOS LOS IDIOMAS:
1. El artículo debe centrarse EXCLUSIVAMENTE en la construcción de stands de diseño para INTERIORES dentro de recintos feriales cerrados.
2. Queda PROHIBIDO utilizar conceptos climáticos o de exterior, tales como "confort térmico", "sombra", "calor", "eventos exteriores" o "carpas".
3. Debes incorporar de forma natural, elegante y en el contexto adecuado los siguientes 5 términos clave de nuestro glosario arquitectónico de Standarte (traducidos al idioma correspondiente de forma precisa):
   - Español: "Arquitectura de atención", "Espacios de permanencia", "Diseño de flujo humano", "Estructuras de concentración visual", "Microarquitectura experiencial".
   - Inglés (en): "Attention architecture", "Spaces of permanence", "Human flow design", "Visual concentration structures", "Experiential microarchitecture".
   - Alemán (de): "Aufmerksamkeitsarchitektur", "Verweilräume", "Gestaltung des menschlichen Flusses", "visuelle Konzentrationsstrukturen", "erlebnisorientierte Mikroarchitektur".
   - Portugués (pt): "Arquitetura de atenção", "Espaços de permanência", "Design de fluxo humano", "Estruturas de concentração visual", "Microarquitetura experiencial".
   - Chino (zh): "注意力建筑", "停留空间", "人流设计", "视觉聚焦结构", "体验式微建筑".
   - Hindi (hi): "ध्यान वास्तुकला", "स्थायित्व के स्थान", "मानव प्रवाह डिजाइन", "दृश्य एकाग्रता संरचनाएं", "अनुभवात्मक सूक्ष्म वास्तुकला".
4. El tono debe ser profesional, sofisticado y persuasivo.
5. El contenido del artículo debe estar maquetado en HTML limpio y semántico (usando <h2>, <h3>, <p>, <ul>, <li>, <strong>). No incluyas la estructura general de <html>, <head> ni <body>.
6. Debes INYECTAR en medio de tu artículo una sola etiqueta de imagen <figure> maquetada con esta estructura exacta (utiliza la misma URL de imagen elegida para todos los idiomas):
   <figure style="margin: 40px 0; text-align: center;"><img src="[URL_ELEGIDA]" alt="[ALT_ELEGIDO]" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;">[CAPTION_PERSONALIZADA_Y_HILADA_CON_EL_TEXTO_EN_EL_IDIOMA_CORRESPONDIENTE]</figcaption></figure>
   Elige la imagen que mejor encaje con tu redacción del siguiente listado de imágenes reales de nuestra galería de Standarte:
${imagesListText}
7. Al final de la sección 'content' (dentro del propio HTML), añade un elegante bloque de llamado a la acción (CTA) con enlaces a la sección de contacto de Standarte para solicitar un modelado 3D realista en el idioma correspondiente.

Genera un objeto JSON puro conteniendo las traducciones para cada uno de los 6 idiomas. El objeto debe tener exactamente las llaves: "es", "en", "de", "pt", "zh", "hi".
Cada una de estas llaves debe ser un objeto con los siguientes campos:
- title: Un título cautivador y optimizado para SEO (en el idioma correspondiente).
- excerpt: Un resumen atractivo de 2 líneas (en el idioma correspondiente).
- content: El cuerpo del artículo redactado en HTML (en el idioma correspondiente) conteniendo la figura de la imagen inyectada.
- seoKeywords: Un array de 5 palabras clave de SEO altamente relevantes (en el idioma correspondiente).`;

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
            es: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            en: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            de: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            pt: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            zh: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            hi: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            }
          },
          required: ["es", "en", "de", "pt", "zh", "hi"]
        }
      }
    });

    let responseText = '';
    try {
      responseText = await postJson(geminiUrl, requestBody);
      const responseJson = JSON.parse(responseText);
      
      if (responseJson.candidates && responseJson.candidates[0] && responseJson.candidates[0].content && responseJson.candidates[0].content.parts[0].text) {
        const generatedArticle = JSON.parse(responseJson.candidates[0].content.parts[0].text);
        
        // Extraer la URL de la imagen (usamos la del artículo en español)
        const imgMatch = (generatedArticle.es.content).match(/<img[^>]+src=["']([^"']+)["']/);
        const imageUrl = imgMatch ? imgMatch[1] : '/img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif';

        const languages = ['es', 'en', 'de', 'pt', 'zh', 'hi'];
        const newArticles = [];

        for (const lang of languages) {
          const itemLang = generatedArticle[lang];
          
          const slug = itemLang.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");

          const finalArticle = {
            slug: slug,
            title: itemLang.title,
            excerpt: itemLang.excerpt,
            date: new Date().toISOString().split('T')[0],
            location: selectedCity.name,
            lang: lang,
            sourceName: selectedItem.source || "Google News",
            sourceUrl: selectedItem.link,
            seoKeywords: itemLang.seoKeywords,
            image: imageUrl,
            content: itemLang.content
          };

          newArticles.push(finalArticle);
        }

        // Evitar duplicados basados en el slug en español
        const esSlug = newArticles.find(a => a.lang === 'es').slug;
        if (newsData.some(art => art.slug === esSlug)) {
          console.log(`-> El artículo "${esSlug}" ya existía en la colección (slug duplicado). Omitiendo.`);
          return;
        }

        newsData.unshift(...newArticles);
        fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf8');
        console.log(`\n==========================================================`);
        console.log(`   [ARTÍCULOS GENERADOS POR IA] Sincronizados con éxito   `);
        console.log(`   Título (ES): "${newArticles[0].title}"`);
        console.log(`   Slug (ES):   "${newArticles[0].slug}"`);
        console.log(`==========================================================\n`);
      } else {
        console.log('-> Error en el formato de respuesta de Gemini o clave de API inválida/expirada.');
        console.log('   Cuerpo de la respuesta de Gemini:', responseText);
        useFallback(newsData);
      }
    } catch (error) {
      console.error('[ERROR] Excepción durante el proceso autónomo:', error);
      if (responseText) {
        console.log('   Último cuerpo de respuesta del servidor antes de la excepción:', responseText);
      }
      useFallback(newsData);
    }
  } catch (error) {
    console.error('[ERROR] Excepción general en run():', error);
    useFallback(newsData);
  }
}

// Función de Fallback robusta, localizada e infinita
function useFallback(newsData) {
  console.log('-> Activando mecanismo de Fallback robusto y localizado...');
  const currentDate = new Date().toISOString().split('T')[0];
  
  // 1. Decidir cuál plantilla usar basándonos en el día del año (para rotación infinita)
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const templateIndex = dayOfYear % fallbackDatabase.length;
  const originalTemplate = fallbackDatabase[templateIndex];
  
  console.log(`-> Seleccionada plantilla de fallback: ${originalTemplate.es.location} (Índice: ${templateIndex})`);
  
  // 2. Dinamizar imagen del pool completo de Standarte para todas las lenguas por igual
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
  
  // 3. Prefijos por idioma para hacer el título e historia 100% únicos hoy y evitar duplicados
  const titlePrefixes = {
    es: "Perspectivas: ",
    en: "Insight: ",
    de: "Einblick: ",
    pt: "Atualidade: ",
    zh: "聚焦：",
    hi: "सुर्खियां: "
  };
  
  const languages = ['es', 'en', 'de', 'pt', 'zh', 'hi'];
  const newArticles = [];
  
  for (const lang of languages) {
    const langData = originalTemplate[lang];
    
    // Clonamos profundamente para evitar mutar el original
    const cloned = JSON.parse(JSON.stringify(langData));
    
    // Hacemos el slug y título únicos para hoy
    cloned.slug = `${cloned.slug}-${currentDate}`;
    cloned.title = `${titlePrefixes[lang] || ''}${cloned.title}`;
    cloned.date = currentDate;
    cloned.image = `/${randomImage.full}`;
    
    // Reemplazamos la figura estática del fallback por la dinamizada con el alt y desc correspondiente
    cloned.content = cloned.content.replace(/<figure[\s\S]*?<\/figure>/, customFigureHtml);
    
    newArticles.push(cloned);
  }
  
  // Evitar duplicados si se vuelve a correr el mismo día
  const esSlug = newArticles.find(a => a.lang === 'es').slug;
  if (newsData.some(art => art.slug === esSlug)) {
    console.log(`-> Las noticias del día de hoy (${currentDate}) ya habían sido insertadas. Omitiendo.`);
    return;
  }
  
  // Insertamos las 6 variantes al principio
  newsData.unshift(...newArticles);
  fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf8');
  
  console.log(`\n==========================================================`);
  console.log(`   [ARTÍCULOS FALLBACK MULTI-IDIOMA] Sincronizados con éxito   `);
  console.log(`   Título (ES): "${newArticles[0].title}"`);
  console.log(`   Slug (ES):   "${newArticles[0].slug}"`);
  console.log(`==========================================================\n`);
}

run();
