const fs = require('fs');

let content = fs.readFileSync('./src/routes/proyectos/[id]/+page.svelte', 'utf8');

// Helper to inject fr and it into objects
function injectTranslations(objName, frStr, itStr) {
    const regex = new RegExp(`const ${objName} = \\{[\\s\\S]*?\\n  \\};`);
    content = content.replace(regex, (match) => {
        if (match.includes("'fr':") || match.includes('"fr":') || match.includes('fr:')) {
            return match; // already injected
        }
        return match.replace(/\\n  \\};/, `,\n    fr: "${frStr}",\n    it: "${itStr}"\n  };`);
    });
}

// 1. ctaLabels
injectTranslations('ctaLabels', 'DEMANDER UN DEVIS', 'RICHIEDI UN PREVENTIVO');

// 2. heroLeads
injectTranslations('heroLeads', 'Prototype 3D et sa relation avec nos valeurs de design', 'Prototipo 3D e il suo rapporto con i nostri valori di design');

// 3. breadcrumbsInicio
injectTranslations('breadcrumbsInicio', 'Accueil', 'Home');

// 4. breadcrumbsProyectos
injectTranslations('breadcrumbsProyectos', 'Projets 3D', 'Progetti 3D');

// 5. visitWebsites
injectTranslations('visitWebsites', 'Visiter le site officiel', 'Visita il sito ufficiale');

// 6. backToMainPages
injectTranslations('backToMainPages', 'Retour à la Page Principale', 'Torna alla Pagina Principale');

// 7. galleryTitles
injectTranslations('galleryTitles', 'Galerie de Vues et Rendus 3D', 'Galleria di Viste e Render 3D');

// 8. gallerySubtitles
injectTranslations('gallerySubtitles', "Cliquez sur n'importe quelle image pour l'explorer en haute définition.", 'Fai clic su qualsiasi immagine per esplorarla in alta definizione.');


// For SEO objects, they are formatted dynamically using project properties
function injectSeoTranslations(objName, frTpl, itTpl) {
    const regex = new RegExp(`\\$: ${objName} = project \\? \\{[\\s\\S]*?\\n  \\} : \\{\\};`);
    content = content.replace(regex, (match) => {
        if (match.includes('fr:')) return match;
        return match.replace(/\\n  \\} : \\{\\};/, `,\n    fr: \`${frTpl}\`,\n    it: \`${itTpl}\`\n  } : {};`);
    });
}

// seoNames
injectSeoTranslations('seoNames', 'Conception de Stand 3D pour ${project.name} à ${project.location}', 'Design di Stand 3D per ${project.name} a ${project.location}');

// seoDescriptions
injectSeoTranslations('seoDescriptions', 'Détails de la conception tridimensionnelle du stand sur mesure pour ${project.name} à ${project.location}. Découvrez sa relation avec nos valeurs architecturales.', 'Dettagli della progettazione tridimensionale dello stand su misura per ${project.name} a ${project.location}. Scopri la sua relazione con i nostri valori architettonici.');

// creativeWorkNames
injectSeoTranslations('creativeWorkNames', 'Prototype 3D - ${project.name}', 'Prototipo 3D - ${project.name}');


// Finally, the `intro-description` logic.
const htmlIfLogic = `{:else if lang === 'hi'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})। Standarte द्वारा डिज़ाइन किया गया प्रत्येक स्टैंड ब्रांड और प्रदर्शनी की आवश्यकताओं के संपूर्ण विश्लेषण का परिणाम है। नीचे, हम इस परियोजना के लिए डिज़ाइन सिद्धांतों और स्थानिक मूल्यों का विवरण दे रहे हैं।
        {/if}`;

const newHtmlIfLogic = `{:else if lang === 'hi'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es})। Standarte द्वारा डिज़ाइन किया गया प्रत्येक स्टैंड ब्रांड और प्रदर्शनी की आवश्यकताओं के संपूर्ण विश्लेषण का परिणाम है। नीचे, हम इस परियोजना के लिए डिज़ाइन सिद्धांतों और स्थानिक मूल्यों का विवरण दे रहे हैं।
        {:else if lang === 'fr'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Chaque stand conçu par Standarte est le fruit d'une analyse exhaustive de la marque et des besoins du salon. Ci-dessous, nous détaillons les principes de conception et les valeurs spatiales pour ce projet.
        {:else if lang === 'it'}
          <strong>{project.name}</strong> ({project.notes[lang] || project.notes.es}). Ogni stand progettato da Standarte è il frutto di un'analisi esaustiva del marchio e delle esigenze fieristiche. Di seguito, descriviamo in dettaglio i principi di progettazione e i valori spaziali per questo progetto.
        {/if}`;

content = content.replace(htmlIfLogic, newHtmlIfLogic);

fs.writeFileSync('./src/routes/proyectos/[id]/+page.svelte', content, 'utf8');
console.log('updated page.svelte with translations');
