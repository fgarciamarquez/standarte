const fs = require('fs');
const path = require('path');

const prototypeDir = path.join(__dirname, '..', 'static', 'img', '3D_prototype');
const txtPath = path.join(prototypeDir, 'empresas_contactos.txt');
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'projectData.js');

console.log('==========================================================');
const txtContent = fs.readFileSync(txtPath, 'utf8');

// 1. Escanear archivos AVIF reales en la carpeta
const actualFiles = new Set(
  fs.readdirSync(prototypeDir)
    .filter(file => file.endsWith('.avif'))
);
console.log(`-> Encontradas ${actualFiles.size} imágenes AVIF reales en disco.`);

// 2. Parsear el archivo empresas_contactos.txt
const companies = [];
const blocks = txtContent.split(/\n(?=EMPRESA:)/);

blocks.forEach(block => {
  if (!block.trim()) return;
  
  const empMatch = block.match(/EMPRESA:\s*([^\n]+)/);
  if (!empMatch) return;
  const name = empMatch[1].trim();
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  
  const webMatch = block.match(/Web:\s*([^\n]+)/);
  const web = webMatch ? webMatch[1].trim() : '';
  
  const emailMatch = block.match(/Email:\s*([^\n]+)/);
  const email = emailMatch ? emailMatch[1].trim() : '';
  
  const notesMatch = block.match(/Notas:\s*([^\n]+)/);
  let notes = notesMatch ? notesMatch[1].trim() : '';
  if (notes) {
    const sentences = notes.split(/(?<=[.!?])\s+/);
    notes = sentences.filter(s => !s.toLowerCase().includes('email')).join(' ').trim();
  }
  
  // Extraer las imágenes del listado
  const imgLines = block.split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-') && line.endsWith('.avif'))
    .map(line => line.replace(/^-\s*/, '').trim());
  
  // Validar correspondencias de imágenes
  const validImages = [];
  const missingImages = [];
  
  imgLines.forEach(img => {
    if (actualFiles.has(img)) {
      validImages.push(`/img/3D_prototype/${img}`);
    } else {
      missingImages.push(img);
    }
  });
  
  if (missingImages.length > 0) {
    console.log(`[ATENCIÓN] Empresa ${name}: faltan ${missingImages.length} imágenes listadas en el TXT.`);
  }
  
  if (validImages.length === 0) {
    return; // Omitir empresas sin imágenes válidas
  }
  
  // Determinar ubicación basada en los nombres de las imágenes
  let location = 'Madrid';
  const firstImg = imgLines[0] || '';
  if (firstImg.includes('_madrid')) location = 'Madrid';
  else if (firstImg.includes('_malaga')) location = 'Málaga';
  else if (firstImg.includes('_lisboa') || firstImg.includes('_portugal')) location = 'Lisboa';
  else if (firstImg.includes('_bilbao')) location = 'Bilbao';
  else if (firstImg.includes('_barcelona')) location = 'Barcelona';
  else if (firstImg.includes('_valencia')) location = 'Valencia';
  
  // Correcciones manuales para errores de correspondencia en el TXT original
  let finalWeb = web;
  let finalNotes = notes;

  if (id === 'aksun') {
    finalWeb = 'https://www.aksun.com.tr/';
    finalNotes = 'Empresa turca líder en la comercialización y exportación internacional de frutas y verduras frescas.';
  } else if (id === 'arra') {
    finalWeb = 'https://grapaes.com/';
    finalNotes = 'Desarrollador y distribuidor global de variedades premium de uva de mesa sin semilla (ARRA Grapes).';
  } else if (id === 'asteo') {
    finalWeb = 'https://asteo.es/';
    finalNotes = 'Operador mayorista de telecomunicaciones e infraestructura de fibra óptica en entornos rurales en España.';
  } else if (id === 'bdb') {
    finalWeb = 'https://grupobdb.com/';
    finalNotes = 'Central de compras y red de distribución de almacenes de materiales de construcción, cerámica, ferretería y baño en España.';
  } else if (id === 'charly') {
    finalWeb = 'https://www.charly.com/';
    finalNotes = 'Marca mexicana líder en diseño, fabricación y distribución de calzado y ropa deportiva profesional.';
  } else if (id === 'kelio') {
    finalWeb = 'https://www.kelio.com/';
    finalNotes = 'Desarrollador líder europeo de software de control horario, gestión de recursos humanos y terminales de fichaje avanzados.';
  } else if (id === 'drag') {
    finalWeb = 'https://www.drag.es/';
    finalNotes = 'Desarrollador de software de gestión integral para cuerpos de Policía Local y servicios de emergencia municipales en España.';
  } else if (id === 'hjm_elementos') {
    finalWeb = 'https://www.hjm.es/';
    finalNotes = 'Fabricante español líder en sistemas de calefacción eléctrica, emisores térmicos y secatoallas de alta eficiencia.';
  } else if (id === 'fazendas_0') {
    finalWeb = 'https://fazendas.pt/es/';
    finalNotes = 'Empresa portuguesa líder en ingeniería de acero inoxidable y equipos industriales de alta precisión para el sector farmacéutico y cosmético.';
  }

  // Generar texto descriptivo sofisticado relacionándolo con valores
  const valuesText = generateValuesText(name, location, finalNotes);
  
  companies.push({
    id,
    name,
    location,
    web: finalWeb,
    image: validImages[0],
    images: validImages,
    valuesText,
    notes: finalNotes
  });
});

console.log(`-> Procesadas ${companies.length} empresas válidas con imágenes.`);

// 3. Escribir el archivo projectData.js
const fileContent = `// Archivo generado automáticamente a partir de empresas_contactos.txt
export const projects = ${JSON.stringify(companies, null, 2)};

export function getProjectById(id) {
  return projects.find(p => p.id === id);
}

export function getAllProjectIds() {
  return projects.map(p => p.id);
}
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`[ÉXITO] Archivo generado correctamente en: ${outputPath}`);

// 4. Regenerar sitemap.xml
const sitemapPaths = [
  path.join(__dirname, '..', 'static', 'sitemap.xml'),
  path.join(__dirname, '..', 'sitemap.xml')
];

sitemapPaths.forEach(sitemapPath => {
  if (fs.existsSync(sitemapPath)) {
    let xml = fs.readFileSync(sitemapPath, 'utf8');
    
    // Extraer todas las URLs que NO sean de proyectos
    const urls = [];
    const urlRegex = /<url>[\s\S]*?<\/url>/g;
    let match;
    while ((match = urlRegex.exec(xml)) !== null) {
      const urlBlock = match[0];
      if (!urlBlock.includes('/proyectos/')) {
        urls.push(urlBlock.trim());
      }
    }
    
    // Generar nuevas URLs para los proyectos
    const today = new Date().toISOString().split('T')[0];
    companies.forEach(company => {
      urls.push(`<url><loc>https://standarte.es/proyectos/${company.id}/</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`);
    });
    
    // Reconstruir sitemap.xml
    const newXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => '  ' + u.trim()).join('\n')}
</urlset>`;
    
    fs.writeFileSync(sitemapPath, newXml, 'utf8');
    console.log(`[SEO] Sitemap regenerado correctamente con ${companies.length} proyectos en: ${sitemapPath}`);
  }
});
console.log('==========================================================');

// Helper para redactar dinámicamente un texto premium basado en valores y notas
function generateValuesText(name, location, notes) {
  const fairCenters = {
    'Madrid': 'IFEMA Madrid',
    'Málaga': 'FYCMA Málaga',
    'Lisboa': 'FIL Lisboa',
    'Bilbao': 'BEC Bilbao',
    'Barcelona': 'Fira Barcelona',
    'Valencia': 'Feria Valencia'
  };
  
  const center = fairCenters[location] || 'recintos feriales cerrados';
  
  return `El stand diseñado a medida para <strong>${name}</strong> en ${location} constituye un logro sobresaliente en la integración de imagen corporativa y arquitectura efímera. Inspirado en la descripción y la actividad ferial del cliente —<em>${notes.replace(/"/g, '&quot;')}</em>—, concebimos una propuesta ferial bajo el concepto riguroso de la <strong>microarquitectura experiencial</strong> en madera noble y perfiles premium de Standarte. <br><br>En el plano vertical, las marquesinas suspendidas y pórticos aéreos actúan como potentes <strong>estructuras de concentración visual</strong> que garantizan que la marca domine la visual desde los pasillos comerciales de ${center}, resolviendo el desafío clave de la <strong>arquitectura de atención</strong>. Para facilitar el tránsito de visitantes de gran perfil comercial, el stand propone un impecable <strong>diseño de flujo humano</strong> libre de barreras físicas rígidas, distribuyendo mostradores dinámicos y puntos de interacción espontánea. En el corazón del espacio, refinados tabiques acústicos de lamas de madera natural configuran discretos y acogedores <strong>espacios de permanencia</strong> feriales provistos de hospitalidad premium, idóneos para entablar reuniones ejecutivas y cerrar negociaciones comerciales de alto impacto con total tranquilidad.`;
}
