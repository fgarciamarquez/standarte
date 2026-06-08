const fs = require('fs');

const dataPath = 'src/lib/projectData.js';
let content = fs.readFileSync(dataPath, 'utf8');

// The file structure is:
// // Archivo generado automáticamente a partir de empresas_contactos.txt
// export const projects = [ ... ];

// We'll extract the JSON array.
const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find array bounds in projectData.js");
  process.exit(1);
}

const jsonStr = content.substring(startIdx, endIdx + 1);
let projects;
try {
  projects = JSON.parse(jsonStr);
} catch (e) {
  console.error("Failed to parse projectData.js JSON", e);
  process.exit(1);
}

projects.forEach(project => {
  // Translate title
  if (!project.title.fr) {
    let titleFr = project.title.es.replace("Stand para empresa de", "Stand pour entreprise de");
    titleFr = titleFr.replace(" en Madrid", " à Madrid");
    titleFr = titleFr.replace(" en Barcelona", " à Barcelone");
    titleFr = titleFr.replace(" en Bilbao", " à Bilbao");
    titleFr = titleFr.replace(" en Málaga", " à Malaga");
    titleFr = titleFr.replace(" en Lisboa", " à Lisbonne");
    titleFr = titleFr.replace(" en Badajoz", " à Badajoz");
    project.title.fr = titleFr;
  }
  if (!project.title.it) {
    let titleIt = project.title.es.replace("Stand para empresa de", "Stand per azienda di");
    titleIt = titleIt.replace(" en Madrid", " a Madrid");
    titleIt = titleIt.replace(" en Barcelona", " a Barcellona");
    titleIt = titleIt.replace(" en Bilbao", " a Bilbao");
    titleIt = titleIt.replace(" en Málaga", " a Malaga");
    titleIt = titleIt.replace(" en Lisboa", " a Lisbona");
    titleIt = titleIt.replace(" en Badajoz", " a Badajoz");
    project.title.it = titleIt;
  }

  // Translate notes
  if (!project.notes.fr) {
    project.notes.fr = project.notes.es.replace("Empresa", "Entreprise").replace("Distribuidora", "Distributeur");
  }
  if (!project.notes.it) {
    project.notes.it = project.notes.es.replace("Empresa", "Azienda").replace("Distribuidora", "Distributore");
  }

  // Add valuesText
  if (!project.valuesText.fr) {
    project.valuesText.fr = `Le stand sur mesure conçu pour <strong>${project.name}</strong> à ${project.location} constitue une réalisation exceptionnelle dans l'intégration de l'image corporative et de l'architecture éphémère. Inspiré par l'activité commerciale du client —<em>${project.notes.fr}</em>—, nous avons conçu une proposition d'exposition sous le concept rigoureux de la <strong>microarchitecture expérientielle</strong> en bois noble et profilés premium de Standarte. <br><br>Sur le plan vertical, les marquises suspendues et les portiques aériens agissent comme de puissantes <strong>structures de concentration visuelle</strong> qui garantissent que la marque domine la vue depuis les allées commerciales, résolvant le défi clé de l'<strong>architecture d'attention</strong>. Pour faciliter le transit des visiteurs à fort profil commercial, le stand propose une <strong>conception des flux humains</strong> impeccable et sans barrières physiques rigides, répartissant des comptoirs dynamiques et des points d'interaction spontanée. Au cœur de l'espace, des cloisons acoustiques raffinées en lattes de bois naturel configurent des <strong>espaces de permanence</strong> discrets et accueillants, dotés d'une hospitalité premium, idéaux pour mener des réunions exécutives et conclure des négociations commerciales à fort impact en toute tranquillité.`;
  }

  if (!project.valuesText.it) {
    project.valuesText.it = `Lo stand su misura progettato per <strong>${project.name}</strong> a ${project.location} costituisce un risultato eccezionale nell'integrazione tra immagine aziendale e architettura effimera. Ispirati dall'attività commerciale del cliente —<em>${project.notes.it}</em>—, abbiamo concepito una proposta fieristica all'insegna del rigoroso concetto di <strong>microarchitettura esperienziale</strong> in legno nobile e profili premium di Standarte. <br><br>Sul piano verticale, le pensiline sospese e i portali aerei agiscono come potenti <strong>strutture di concentrazione visiva</strong> che garantiscono al marchio di dominare la vista dai corridoi commerciali, risolvendo la sfida chiave dell'<strong>architettura dell'attenzione</strong>. Per facilitare il transito di visitatori di alto profilo commerciale, lo stand propone un impeccabile <strong>design dei flussi umani</strong> privo di rigide barriere fisiche, distribuendo banchi dinamici e punti di interazione spontanea. Nel cuore dello spazio, raffinate pareti acustiche in doghe di legno naturale configurano <strong>spazi di permanenza</strong> discreti e accoglienti, dotati di un'ospitalità premium, ideali per condurre riunioni esecutive e concludere negoziazioni commerciali di grande impatto in totale tranquillità.`;
  }
});

const newJsonStr = JSON.stringify(projects, null, 2);
const newContent = content.substring(0, startIdx) + newJsonStr + content.substring(endIdx + 1);

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Updated projectData.js with French and Italian.");
