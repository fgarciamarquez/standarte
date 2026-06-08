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
  { full: 'img/trabajos_email/01_02.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/01_FD.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_FD2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/01_FH.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_FH2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/01_hine copia.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_hine.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/01_land1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_land2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/01_land2B.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_land3.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/01_land4.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/01_land4B.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/01_land5.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/01_land6.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_land6B.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/01_land7.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/01_land8.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/01_land8B.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/01_portada.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/01_rive.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCANTICO_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCANTICO_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCANTICO_2.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCANTICO_2.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCBUCHHEISTER_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_3.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos/TCCONSTELLIUM/4.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_5.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCCONSTELLIUM_6.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCDENTSUAEGIS_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCDENTSUAEGIS_2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCDENTSUAEGIS_3.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCDENTSUAEGIS_4.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCDENTSUAEGIS_5.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCELUMATEC_2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCELUMATEC_2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCELUMATEC_3.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCELUMATEC_4.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCELUMATEC_4.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCEMIL_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCEMIL_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCETXE-TAR_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCFAGORARRASATE_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCFARNEL_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCFARNEL_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCFARNEL_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCFARNEL_2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCFARNEL_3.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCFARNEL_4.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCFARNEL_5.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCFARNEL_6.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCFARNEL_7.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCMAGNOLIA_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCMAGNOLIA_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCMAGNOLIA_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCMAGNOLIA_2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCMAGNOLIA_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMAGNOLIA_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMAGNOLIA_3.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCMAGNOLIA_4.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCMAGNOLIA_4.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCMAGNOLIA_5.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCMFI_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMFI_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCMFI_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMFI_2.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCMFI_3.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMFI_4.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCMFI_5.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMFI_6.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCMFI_7.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCMFI_8jpg.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCORGADATA_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCORGADATA_1.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCORGADATA_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCORGADATA_2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCORGADATA_3.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCORGADATA_4.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCPHARMA_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCPHARMA_1.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCPHARMA_2.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCPHARMA_2.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCPHARMA_meplan_designstand_messebau-1-1397x700.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCPHARMA_meplan_designstand_messebau_pharmatechnik-.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCPHARMA_meplan_pharmatechnik_standbau.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCPHARMA_messestandbau_meplan_designstand-1397x700.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCPHARMA_pharmatechnik_designstand_meplan-1397x700.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCREMIS_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCREMIS_2.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCREMIS_3.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_3.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_4.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_4.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_5.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_6.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSCHOEFFEL_7.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TCSES_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCSES_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/TCSES_2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCSES_2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TCSES_3.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TCWURTH_1.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/TCWURTH_2.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/TELASRGB_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TELASRGB_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TELASRGB_2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TELASRGB_2010-04_Philips_Light Building_073.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TELASRGB_keynote_2010-04_fair_markenarchitektur_philips_light&building_4.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/TELASRGB_keynote_2010-04_fair_markenarchitektur_philips_light&building_5.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/TELASRGB_keynote_2010-04_fair_markenarchitektur_philips_light&building_6.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/TELASRGB_keynote_2010-04_mediatecture_markenarchitektur_philips_light&building_2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_01-bost-emo-2023_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_01-stand-tecnalia-biemh-2022_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_01-stand-zayer-biemh-2022-v2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_02-bost-emo-2023_1.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_02-stand-intermaher-biemh-2022.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_02-stand-zayer-biemh-2022.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_03-stand-intermaher-biemh-2022.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_03-stand-tecnalia-biemh-2022_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_04-bost-emo-2023_2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_06-stand-zayer-biemh-2022.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_1.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_2 copia.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_2.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_3.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_bauma-ulma-2013-2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_bellota-ferroforma.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_biemh-16-tecnalia-1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_cabecera-proyecto-emo-milano-2021-2.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_evento-2014-fanuc-showroom-1.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_evento-2014-fanuc-showroom-2.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_keynote_2010-04_fair_markenarchitektur_philips_light&building_5.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_mg-1225.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_stand-2016-biemh-emuge-4.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_stand-2018-biemh-delteco-10.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_stand-cun-fitur3.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_stand-emuge-biemh-2022.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_stands-2014-biemh-bilbao-zayer-17.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_stands-2014-biemh-bilbao-zayer-20.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_stands-pescanova.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_STANDS_2017_EMO_HANNOVER_ZAYER_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_01-bost-emo-2023_1.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_01-stand-tecnalia-biemh-2022_1.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_01-stand-zayer-biemh-2022-v2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_02-bost-emo-2023_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_02-stand-intermaher-biemh-2022.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_02-stand-zayer-biemh-2022.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_03-stand-intermaher-biemh-2022.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_03-stand-tecnalia-biemh-2022_1.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_04-bost-emo-2023_2.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_06-stand-zayer-biemh-2022.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_2 copia.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_3.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_bellota-ferroforma.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_biemh-16-tecnalia-1.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_cabecera-proyecto-emo-milano-2021-2.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_evento-2014-fanuc-showroom-1.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_evento-2014-fanuc-showroom-2.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_mg-1225.jpg', alt: 'Stand ferial corporativo y elegante', desc: 'Stand ferial corporativo y elegante' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stand-2016-biemh-emuge-4.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stand-2018-biemh-delteco-10.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stand-cun-fitur3.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stand-emuge-biemh-2022.jpg', alt: 'Stand de diseño con carpintería artesanal', desc: 'Stand de diseño con carpintería artesanal' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stands-2014-biemh-bilbao-zayer-17.jpg', alt: 'Stand ecológico y sostenible', desc: 'Stand ecológico y sostenible' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stands-2014-biemh-bilbao-zayer-20.jpg', alt: 'Arquitectura efímera para eventos', desc: 'Arquitectura efímera para eventos' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_stands-pescanova.jpg', alt: 'Fabricación y montaje de stands', desc: 'Fabricación y montaje de stands' },
  { full: 'img/trabajos_email/trabajos_promueve_thumbs_STANDS_2017_EMO_HANNOVER_ZAYER_1.jpg', alt: 'Stand de diseño premium de madera', desc: 'Stand de diseño premium de madera' }
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

    // Calcular ciudad de reserva rotativa del día para evitar colisiones consecutivas
    let fallbackCityIndex = dayOfYear % cities.length;
    if (newsData.length > 0) {
      const lastLocation = newsData[0].location;
      if (cities[fallbackCityIndex].name.toLowerCase() === lastLocation.toLowerCase()) {
        fallbackCityIndex = (fallbackCityIndex + 1) % cities.length;
        console.log(`-> Rotando índice de ciudad fallback para evitar colisión consecutiva con: ${lastLocation}`);
      }
    }
    const fallbackCity = cities[fallbackCityIndex];

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

    let usingDynamicFallback = false;
    if (items.length === 0) {
      if (geminiApiKey) {
        console.log(`-> No se encontraron noticias por RSS, pero detectamos GEMINI_API_KEY. Activando Generación Dinámica de Actualidad en ${fallbackCity.name}...`);
        selectedCity = fallbackCity;
        selectedItem = {
          title: `Innovación y diseño efímero de vanguardia en los recintos feriales de ${selectedCity.name}`,
          source: "Standarte Research",
          link: "https://standarte.es"
        };
        usingDynamicFallback = true;
      } else {
        console.log('-> No se encontraron noticias en ninguna de las ciudades configuradas y no hay GEMINI_API_KEY. Utilizando fallback estático.');
        useFallback(newsData);
        return;
      }
    }

    // 4. Redacción con Gemini si hay API Key, de lo contrario fallback
    if (!geminiApiKey) {
      console.log('-> GEMINI_API_KEY no detectada. Utilizando base de datos de fallback estático.');
      useFallback(newsData);
      return;
    }

    console.log('-> GEMINI_API_KEY detectada. Iniciando generación por Inteligencia Artificial en 8 idiomas...');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

    // Convertir el pool de imágenes en texto estructurado para el prompt
    const imagesListText = galleryImages.map((img, idx) => `ID ${idx + 1}: URL: "/${img.full}", Alt: "${img.alt}", Contexto: "${img.desc}"`).join('\n');

    let promptText = '';
    if (usingDynamicFallback) {
      promptText = `Eres un redactor experto en marketing de eventos y arquitectura efímera para la empresa Standarte (https://standarte.es). Tu tarea es seleccionar un evento ferial o congreso importante real de la ciudad de ${selectedCity.name} (por ejemplo: IFEMA si es Madrid, FYCMA si es Málaga, FIL o Web Summit si es Lisboa, Fira Barcelona si es Barcelona, BEC si es Bilbao) y redactar un artículo premium de blog corporativo en 8 idiomas (es, en, de, pt, zh, hi, fr, it) sobre las últimas tendencias de diseño de stands a medida de alta carpintería para dicho evento ferial.

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
   - Francés (fr): "Architecture de l'attention", "Espaces de permanence", "Conception des flux humains", "Structures de concentration visuelle", "Microarchitecture expérientielle".
   - Italiano (it): "Architettura dell'attenzione", "Spazi di permanenza", "Progettazione del flusso umano", "Strutture di concentrazione visiva", "Microarchitettura esperienziale".
4. El tono debe ser profesional, sofisticado y persuasivo.
5. El contenido del artículo debe estar maquetado en HTML limpio y semántico (usando <h2>, <h3>, <p>, <ul>, <li>, <strong>). No incluyas la estructura general de <html>, <head> ni <body>.
6. Debes INYECTAR en medio de tu artículo una sola etiqueta de imagen <figure> maquetada con esta estructura exacta (utiliza la misma URL de imagen elegida para todos los idiomas):
   <figure style="margin: 40px 0; text-align: center;"><img src="[URL_ELEGIDA]" alt="[ALT_ELEGIDO]" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;">[CAPTION_PERSONALIZADA_Y_HILADA_CON_EL_TEXTO_EN_EL_IDIOMA_CORRESPONDIENTE]</figcaption></figure>
   Elige la imagen que mejor encaje con tu redacción del siguiente listado de imágenes reales de nuestra galería de Standarte:
${imagesListText}
7. Al final de la sección 'content' (dentro del propio HTML), añade un elegante bloque de llamado a la acción (CTA) con enlaces a la sección de contacto de Standarte para solicitar un modelado 3D realista en el idioma correspondiente.

Genera un objeto JSON puro conteniendo las traducciones para cada uno de los 8 idiomas. El objeto debe tener exactamente las llaves: "es", "en", "de", "pt", "zh", "hi", "fr", "it".
Cada una de estas llaves debe ser un objeto con los siguientes campos:
- title: Un título cautivador y optimizado para SEO (en el idioma correspondiente).
- excerpt: Un resumen atractivo de 2 líneas (en el idioma correspondiente).
- content: El cuerpo del artículo redactado en HTML (en el idioma correspondiente) conteniendo la figura de la imagen inyectada.
- seoKeywords: Un array de 5 palabras clave de SEO altamente relevantes (en el idioma correspondiente).`;
    } else {
      promptText = `Eres un redactor experto en marketing de eventos y arquitectura efímera para la empresa Standarte (https://standarte.es). Tu tarea es redactar y traducir un artículo de blog premium en 8 idiomas (es, en, de, pt, zh, hi, fr, it) basado en la siguiente noticia de actualidad:
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
   - Portugués (pt): "Arquitetura de atención", "Espaços de permanência", "Design de fluxo humano", "Estruturas de concentración visual", "Microarquitetura experiencial".
   - Chino (zh): "注意力建筑", "停留空间", "人流设计", "视觉聚焦结构", "体验式微建筑".
   - Hindi (hi): "ध्यान वास्तुकला", "स्थायित्व के स्थान", "मानव प्रवाह डिजाइन", "दृश्य एकाग्रता संरचनाएं", "अनुभवात्मक सूक्ष्म वास्तुकला".
   - Francés (fr): "Architecture de l'attention", "Espaces de permanence", "Conception des flux humains", "Structures de concentration visuelle", "Microarchitecture expérientielle".
   - Italiano (it): "Architettura dell'attenzione", "Spazi di permanenza", "Progettazione del flusso umano", "Strutture di concentrazione visiva", "Microarchitettura esperienziale".
4. El tono debe ser profesional, sofisticado y persuasivo.
5. El contenido del artículo debe estar maquetado en HTML limpio y semántico (usando <h2>, <h3>, <p>, <ul>, <li>, <strong>). No incluyas la estructura general de <html>, <head> ni <body>.
6. Debes INYECTAR en medio de tu artículo una sola etiqueta de imagen <figure> maquetada con esta estructura exacta (utiliza la misma URL de imagen elegida para todos los idiomas):
   <figure style="margin: 40px 0; text-align: center;"><img src="[URL_ELEGIDA]" alt="[ALT_ELEGIDO]" style="width: 100%; max-width: 750px; height: auto; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><figcaption style="font-size: 13px; color: #777; margin-top: 8px; font-style: italic;">[CAPTION_PERSONALIZADA_Y_HILADA_CON_EL_TEXTO_EN_EL_IDIOMA_CORRESPONDIENTE]</figcaption></figure>
   Elige la imagen que mejor encaje con tu redacción del siguiente listado de imágenes reales de nuestra galería de Standarte:
${imagesListText}
7. Al final de la sección 'content' (dentro del propio HTML), añade un elegante bloque de llamado a la acción (CTA) con enlaces a la sección de contacto de Standarte para solicitar un modelado 3D realista en el idioma correspondiente.

Genera un objeto JSON puro conteniendo las traducciones para cada uno de los 8 idiomas. El objeto debe tener exactamente las llaves: "es", "en", "de", "pt", "zh", "hi", "fr", "it".
Cada una de estas llaves debe ser un objeto con los siguientes campos:
- title: Un título cautivador y optimizado para SEO (en el idioma correspondiente).
- excerpt: Un resumen atractivo de 2 líneas (en el idioma correspondiente).
- content: El cuerpo del artículo redactado en HTML (en el idioma correspondiente) conteniendo la figura de la imagen inyectada.
- seoKeywords: Un array de 5 palabras clave de SEO altamente relevantes (en el idioma correspondiente).`;
    }

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
            fr: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
            it: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                excerpt: { type: "STRING" },
                content: { type: "STRING" },
                seoKeywords: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["title", "excerpt", "content", "seoKeywords"]
            },
          },
          required: ["es", "en", "de", "pt", "zh", "hi", "fr", "it"]
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

        const languages = ['es', 'en', 'de', 'pt', 'zh', 'hi', 'fr', 'it'];
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
  let templateIndex = dayOfYear % fallbackDatabase.length;
  
  // Evitar usar el mismo destino que la última noticia en la base de datos
  if (newsData.length > 0) {
    const lastLocation = newsData[0].location;
    if (fallbackDatabase[templateIndex].es.location.toLowerCase() === lastLocation.toLowerCase()) {
      templateIndex = (templateIndex + 1) % fallbackDatabase.length;
      console.log(`-> Evitando duplicidad de ciudad con el último artículo. Rotando índice a: ${templateIndex}`);
    }
  }
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
  
  const languages = ['es', 'en', 'de', 'pt', 'zh', 'hi', 'fr', 'it'];
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
