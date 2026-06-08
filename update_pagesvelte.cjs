const fs = require('fs');

const path = 'src/routes/proyectos/[id]/+page.svelte';
let content = fs.readFileSync(path, 'utf8');

// ctaLabels
content = content.replace(
  "    hi: 'कोटेशन का अनुरोध करें'\n  };",
  "    hi: 'कोटेशन का अनुरोध करें',\n    fr: 'DEMANDER UN DEVIS',\n    it: 'RICHIEDI UN PREVENTIVO'\n  };"
);

// seoNames
content = content.replace(
  "    hi: `${project.location} में ${project.name} के लिए 3D स्टैंड डिज़ाइन`\n  } : {};",
  "    hi: `${project.location} में ${project.name} के लिए 3D स्टैंड डिज़ाइन`,\n    fr: `Design de Stand 3D pour ${project.name} à ${project.location}`,\n    it: `Design di Stand 3D per ${project.name} a ${project.location}`\n  } : {};"
);

// seoDescriptions
content = content.replace(
  "    hi: `${project.location} में ${project.name} के लिए कस्टम 3D स्टैंड डिज़ाइन का विवरण। हमारे वास्तुकला मूल्यों के साथ इसके संबंध के बारे में जानें。`\n  } : {};",
  "    hi: `${project.location} में ${project.name} के लिए कस्टम 3D स्टैंड डिज़ाइन का विवरण। हमारे वास्तुकला मूल्यों के साथ इसके संबंध के बारे में जानें。`,\n    fr: `Détails de la conception tridimensionnelle du stand sur mesure pour ${project.name} à ${project.location}. Découvrez sa relation avec nos valeurs architecturales.`,\n    it: `Dettagli del design tridimensionale dello stand su misura per ${project.name} a ${project.location}. Scopri la sua relazione con i nostri valori architettonici.`\n  } : {};"
);

// creativeWorkNames
content = content.replace(
  "    hi: `3D स्टैंड प्रोटोटाइप - ${project.name}`\n  } : {};",
  "    hi: `3D स्टैंड प्रोटोटाइप - ${project.name}`,\n    fr: `Prototype de Stand 3D - ${project.name}`,\n    it: `Prototipo di Stand 3D - ${project.name}`\n  } : {};"
);

// heroLeads
content = content.replace(
  "    hi: '3D प्रोटोटाइप और हमारे डिज़ाइन मूल्यों के साथ इसका संबंध'\n  };",
  "    hi: '3D प्रोटोटाइप और हमारे डिज़ाइन मूल्यों के साथ इसका संबंध',\n    fr: 'Prototype 3D et sa relation avec nos valeurs de conception',\n    it: 'Prototipo 3D e la sua relazione con i nostri valori di design'\n  };"
);

// breadcrumbsInicio
content = content.replace(
  "    hi: 'होम'\n  };",
  "    hi: 'होम',\n    fr: 'Accueil',\n    it: 'Home'\n  };"
);

// breadcrumbsProyectos
content = content.replace(
  "    hi: '3D परियोजनाएं'\n  };",
  "    hi: '3D परियोजनाएं',\n    fr: 'Projets 3D',\n    it: 'Progetti 3D'\n  };"
);

// visitWebsites
content = content.replace(
  "    hi: 'आधिकारिक वेबसाइट पर जाएं'\n  };",
  "    hi: 'आधिकारिक वेबसाइट पर जाएं',\n    fr: 'Visiter le site officiel',\n    it: 'Visita il sito ufficiale'\n  };"
);

// backToMainPages
content = content.replace(
  "    hi: 'मुख्य पृष्ठ पर वापस जाएँ'\n  };",
  "    hi: 'मुख्य पृष्ठ पर वापस जाएँ',\n    fr: 'Retour à la page principale',\n    it: 'Torna alla pagina principale'\n  };"
);

// galleryTitles
content = content.replace(
  "    hi: 'दृश्य और 3D रेंडर गैलरी'\n  };",
  "    hi: 'दृश्य और 3D रेंडर गैलरी',\n    fr: 'Galerie de Vues et Rendus 3D',\n    it: 'Galleria di Viste e Render 3D'\n  };"
);

// gallerySubtitles
content = content.replace(
  "    hi: 'उच्च परिभाषा में इसका पता लगाने के लिए किसी भी छवि पर क्लिक करें।'\n  };",
  "    hi: 'उच्च परिभाषा में इसका पता लगाने के लिए किसी भी छवि पर क्लिक करें。',\n    fr: 'Cliquez sur n\\'importe quelle image pour l\\'explorer en haute définition.',\n    it: 'Clicca su qualsiasi immagine per esplorarla in alta definizione.'\n  };"
);

// title tag
content = content.replace(
  "{lang === 'es' ? 'Prototipo 3D' : (lang === 'de' ? '3D-Prototyp' : (lang === 'pt' ? 'Protótipo 3D' : (lang === 'zh' ? '3D原型' : (lang === 'hi' ? '3D प्रोटोटाइप' : '3D Prototype'))))}",
  "{lang === 'es' ? 'Prototipo 3D' : (lang === 'de' ? '3D-Prototyp' : (lang === 'pt' ? 'Protótipo 3D' : (lang === 'fr' ? 'Prototype 3D' : (lang === 'it' ? 'Prototipo 3D' : (lang === 'zh' ? '3D原型' : (lang === 'hi' ? '3D प्रोटोटाइप' : '3D Prototype'))))))}"
);

// paragraphs inside values-card
content = content.replace(
  "{:else if lang === 'hi'}\n          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})। Standarte द्वारा डिज़ाइन किया गया प्रत्येक स्टैंड ब्रांड और प्रदर्शनी की आवश्यकताओं के संपूर्ण विश्लेषण का परिणाम है। नीचे, हम इस परियोजना के लिए डिज़ाइन सिद्धांतों और स्थानिक मूल्यों का विवरण दे रहे हैं।\n        {/if}",
  `{:else if lang === 'fr'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Chaque stand conçu par Standarte est le fruit d'une analyse approfondie de la marque et des besoins du salon. Ci-dessous, nous détaillons les principes de conception et les valeurs spatiales de ce projet.
        {:else if lang === 'it'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Ogni stand progettato da Standarte è il risultato di un'analisi approfondita del marchio e delle esigenze fieristiche. Di seguito, descriviamo i principi di progettazione e i valori spaziali di questo progetto.
        {:else if lang === 'hi'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})। Standarte द्वारा डिज़ाइन किया गया प्रत्येक स्टैंड ब्रांड और प्रदर्शनी की आवश्यकताओं के संपूर्ण विश्लेषण का परिणाम है। नीचे, हम इस परियोजना के लिए डिज़ाइन सिद्धांतों और स्थानिक मूल्यों का विवरण दे रहे हैं।
        {/if}`
);


fs.writeFileSync(path, content, 'utf8');
console.log("Updated +page.svelte translations.");
