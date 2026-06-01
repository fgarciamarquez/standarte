const fs = require('fs');
const path = require('path');
const https = require('https');

const contactsPath = path.join(__dirname, '..', 'static', 'img', '3D_prototype', 'empresas_contactos.txt');
const token = 'STANDARTE_MAIL_SECURE_2026';

function parseContacts() {
  if (!fs.existsSync(contactsPath)) {
    console.error(`[ERROR] No se encuentra el archivo de contactos en: ${contactsPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(contactsPath, 'utf8');
  const blocks = content.split('EMPRESA:');
  const companies = [];

  // Omitimos el bloque 0 que es el encabezado del archivo
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const lines = block.split('\n');
    
    const name = lines[0].trim();
    let web = '';
    let email = '';
    let confianza = '';
    let notas = '';
    const images = [];
    
    let captureImages = false;
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j];
      if (line.includes('Web:')) {
        web = line.split('Web:')[1].trim();
      } else if (line.includes('Email:')) {
        email = line.split('Email:')[1].trim();
      } else if (line.includes('Confianza:')) {
        confianza = line.split('Confianza:')[1].trim();
      } else if (line.includes('Notas:')) {
        notas = line.split('Notas:')[1].trim();
      } else if (line.includes('Imágenes (')) {
        captureImages = true;
      } else if (captureImages && line.trim().startsWith('-')) {
        images.push(line.trim().substring(1).trim());
      } else if (line.trim() === '') {
        if (images.length > 0) {
          captureImages = false;
        }
      }
    }
    
    if (name) {
      companies.push({ name, web, email, confianza, notas, images });
    }
  }

  return companies;
}

function sendPayload(payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = https.request({
      hostname: 'standarte.es',
      port: 443,
      path: '/send-email.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: 'Respuesta no válida del servidor PHP', raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(postData);
    req.end();
  });
}

async function run() {
  const isTest = process.argv.includes('--test');
  const targetEmail = 'javier@standarte.es';

  console.log('==========================================================');
  console.log('          STANDARTE - Campaña de Correos Prototipos 3D    ');
  console.log('==========================================================\n');

  const allCompanies = parseContacts();
  console.log(`-> Leídas ${allCompanies.length} empresas del archivo de contactos.`);

  // Filtrar por Confianza: alto (correo confirmado) y que tengan al menos 3 imágenes
  const confirmedCompanies = allCompanies.filter(c => 
    c.confianza.toLowerCase() === 'alto' && 
    c.email && 
    c.images.length >= 3
  );

  console.log(`-> Empresas con correo confirmado y renders 3D suficientes: ${confirmedCompanies.length}\n`);

  if (confirmedCompanies.length === 0) {
    console.log('[ERROR] No se encontraron empresas que cumplan con los requisitos.');
    return;
  }

  if (isTest) {
    // 1. MODO PRUEBA: Seleccionar una al azar y enviar a javiergarciamarquez@icloud.com
    const randomIndex = Math.floor(Math.random() * confirmedCompanies.length);
    const company = confirmedCompanies[randomIndex];
    
    console.log(`[MODO PRUEBA] Seleccionada empresa al azar: ${company.name}`);
    console.log(`   Renders 3D disponibles: ${company.images.length}`);
    console.log(`   Notas de la empresa: "${company.notas}"`);

    // Construir la galería con las 3 primeras imágenes
    const galeria = [
      {
        titulo: 'Vista 1',
        imagen: `https://standarte.es/img/3D_prototype/${company.images[0]}`,
        descripcion: `Render 3D de alta definición del stand diseñado a medida para ${company.name}. Diseño y acabados garantizados por contrato.`
      },
      {
        titulo: 'Vista 2',
        imagen: `https://standarte.es/img/3D_prototype/${company.images[1]}`,
        descripcion: `Estructuras elevadas de concentración visual y carpintería premium. Diseño y acabados garantizados por contrato.`
      },
      {
        titulo: 'Vista 3',
        imagen: `https://standarte.es/img/3D_prototype/${company.images[2]}`,
        descripcion: `Distribución ergonómica del flujo humano y confortables áreas de negociación. Diseño y acabados garantizados por contrato.`
      }
    ];

    const payload = {
      token: token,
      records: [
        {
          negocio: 'standarte',
          empresa: company.name,
          email: targetEmail, // Redirigir el correo de prueba al usuario
          feria: 'Próxima Edición Ferial 2026',
          categoría: 'Prototipo de Stand 3D Premium',
          asunto: `Tu propuesta de diseño de stand premium para ${company.name}`,
          cuerpo: `Hola Javier, te presento una propuesta única. Te invito a empezar a trabajar hoy mismo en el desarrollo del próximo proyecto ferial de Standarte. Mira el impresionante prototipo 3D que hemos modelado para ti y cómo sus acabados elevarán la presencia de tu marca al nivel de líder sectorial. ¡Hagamos que tu próximo evento sea un éxito rotundo!`,
          galeria: galeria
        }
      ]
    };

    console.log(`\n-> Enviando correo de prueba a: ${targetEmail}...`);
    try {
      const response = await sendPayload(payload);
      if (response.success) {
        console.log('   ¡Éxito! El correo de prueba se ha enviado y procesado.');
        console.log(`   ID de sesión: ${response.timestamp}`);
        console.log(`   Resultado: ${response.results[0].status} (${response.results[0].method})`);

        // Guardar el HTML generado en un archivo local para previsualización inmediata en el navegador
        const previewPath = path.join(__dirname, '..', 'static', 'test_email_preview.html');
        fs.writeFileSync(previewPath, response.results[0].generated_html, 'utf8');
        console.log(`\n==========================================================`);
        console.log(`   [PREVISUALIZACIÓN DE EMAIL GENERADA]`);
        console.log(`   Puedes abrir y ver el correo exacto en tu navegador en:`);
        console.log(`   http://localhost:82/STANDARTE_SVELTE/static/test_email_preview.html`);
        console.log(`   o abriendo directamente el archivo:`);
        console.log(`   static/test_email_preview.html`);
        console.log(`==========================================================\n`);
      } else {
        console.error('   [FALLO] No se pudo enviar el correo:', response.error || response);
      }
    } catch (err) {
      console.error('   [ERROR DE CONEXIÓN] No se pudo conectar al servidor MAMP:', err.message);
    }
  } else {
    // 2. MODO CAMPAÑA REAL: Enviar a todas las empresas confirmadas
    console.log(`[CAMPAÑA REAL] Iniciando envío de correos multimedia a las ${confirmedCompanies.length} empresas...`);
    
    const records = [];
    for (const company of confirmedCompanies) {
      // Si la empresa tiene múltiples correos separados por comas, procesar cada uno de forma individual
      const emails = company.email.split(',').map(e => e.trim()).filter(Boolean);
      
      for (const email of emails) {
        const galeria = [
          {
            titulo: 'Vista 1',
            imagen: `https://standarte.es/img/3D_prototype/${company.images[0]}`,
            descripcion: `Render 3D ferial de alta carpintería personalizado para la marca ${company.name}. Diseño y acabados garantizados por contrato.`
          },
          {
            titulo: 'Vista 2',
            imagen: `https://standarte.es/img/3D_prototype/${company.images[1]}`,
            descripcion: `Estructuras y pórticos aéreos diseñados bajo los principios de la arquitectura de atención. Diseño y acabados garantizados por contrato.`
          },
          {
            titulo: 'Vista 3',
            imagen: `https://standarte.es/img/3D_prototype/${company.images[2]}`,
            descripcion: `Diseño de flujo humano libre de barreras y refinados espacios de permanencia. Diseño y acabados garantizados por contrato.`
          }
        ];

        records.push({
          negocio: 'standarte',
          empresa: company.name,
          email: email,
          feria: 'Eventos Post-Verano 2026',
          categoría: 'Stand a Medida en Alta Carpintería',
          asunto: `Eventos post-verano: ¿Está el stand de ${company.name} listo para liderar la feria?`,
          cuerpo: `De cara a las ferias y congresos clave de la segunda mitad del año, te invitamos a iniciar ahora mismo las negociaciones para diseñar y fabricar tu stand premium a medida. El tiempo de producción para acabados nobles de alta carpintería es limitado. Asegura hoy tu reserva de espacio ferial con Standarte y posiciónate como el líder absoluto frente a tus competidores.`,
          galeria: galeria
        });
      }
    }

    console.log(`-> Total de correos a enviar (incluyendo correos múltiples por empresa): ${records.length}`);

    // Agrupar los envíos en un solo batch
    const payload = {
      token: token,
      records: records
    };

    console.log('\n-> Enviando campaña al servidor MAMP...');
    try {
      const response = await sendPayload(payload);
      if (response.success) {
        console.log('\n==========================================================');
        console.log('   [CAMPAÑA MULTIMEDIA PROCESADA] Resultados del Envío    ');
        console.log(`   Total procesados: ${response.summary.total}`);
        console.log(`   Total enviados:    ${response.summary.sent}`);
        console.log(`   Total rechazados:  ${response.summary.rejected}`);
        console.log('==========================================================\n');
        
        console.log('Detalle de los envíos:');
        response.results.forEach((r, idx) => {
          console.log(`   [${idx + 1}] Empresa: ${r.empresa.padEnd(20)} | Email: ${r.email.padEnd(30)} | Status: ${r.status.padEnd(10)} | Método: ${r.method}`);
          if (r.status === 'RECHAZADO') {
            console.log(`       Motivo del rechazo: ${r.motivo}`);
          }
        });
      } else {
        console.error('   [FALLO] El servidor PHP retornó un error:', response.error || response);
      }
    } catch (err) {
      console.error('   [ERROR DE CONEXIÓN] No se pudo conectar al servidor MAMP:', err.message);
    }
  }
}

run();
