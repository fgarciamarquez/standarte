import { BRAND, SITE_ORIGIN } from './brand.js';
import { fairsData } from '$lib/fairsData.js';
import { tagOrder } from '$lib/fairTags.js';
import { jaFairSlugs, jaFairSlugsReverse, jaProjectSlugs, jaProjectSlugsReverse } from '$lib/jaSlugs.js';
export const languages = ['es', 'pt', 'en', 'de', 'fr', 'it', 'nl', 'zh', 'hi', 'ko', 'ja'];

// Ciudades-hub SIN portada propia (cover_<key>.avif) todavía: su cabecera usa el fondo
// oscuro por defecto en vez de una foto. Al aportar la imagen, quitar la clave de aquí.
export const CITIES_WITHOUT_COVER = [];

export const languageLabels = {
  es: 'ES Español',
  en: 'EN English',
  de: 'DE Deutsch',
  zh: '中文',
  hi: 'HI हिन्दी',
  pt: 'PT Português',
  fr: 'FR Français',
  it: 'IT Italiano',
  ko: 'KO 한국어',
  ja: 'JA 日本語',
  nl: 'NL Nederlands'
};

export const routes = {
  es: {
    home: '',
    services: 'servicios',
    proyecto_auditado: 'proyecto-auditado',
    precios: 'precios',
    luzpavilion: 'luzpavilion',
    custom: 'proyectos_a_medida',
    team: 'equipo',
    contact: 'contacto',
    madrid: 'diseno_montaje_stands_madrid',
    barcelona: 'diseno_montaje_stands_barcelona',
    bilbao: 'diseno-construccion-montaje-stand-bilbao',
    lisboa: 'diseno_montaje_stands_lisboa',
    batalha: 'diseno_montaje_stands_batalha',
    silleda: 'diseno_montaje_stands_silleda',
    santander: 'diseno_montaje_stands_santander',
    irun: 'diseno_montaje_stands_irun',
    logrono: 'diseno_montaje_stands_logrono',
    pamplona: 'diseno_montaje_stands_pamplona',
    vitoria: 'diseno_montaje_stands_vitoria',
    aranda: 'diseno_montaje_stands_aranda_de_duero',
    regua: 'diseno_montaje_stands_peso_da_regua',
    ibiza: 'diseno_montaje_stands_ibiza',
    menorca: 'diseno_montaje_stands_menorca',
    ceuta: 'diseno_montaje_stands_ceuta',
    melilla: 'diseno_montaje_stands_melilla',
    tanger: 'diseno_montaje_stands_tanger',
    casablanca: 'diseno_montaje_stands_casablanca',
    rabat: 'diseno_montaje_stands_rabat',
    andorra: 'diseno_montaje_stands_andorra',
    teruel: 'diseno_montaje_stands_teruel',
    marsella: 'diseno_montaje_stands_marsella',
    cannes: 'diseno_montaje_stands_cannes',
    avignon: 'diseno_montaje_stands_avignon',
    toulouse: 'diseno_montaje_stands_toulouse',
    burdeos: 'diseno_montaje_stands_burdeos',
    lyon: 'diseno_montaje_stands_lyon',
    grenoble: 'diseno_montaje_stands_grenoble',
    clermont_ferrand: 'diseno_montaje_stands_clermont_ferrand',
    montpellier: 'diseno_montaje_stands_montpellier',
    niza: 'diseno_montaje_stands_niza',
    perpignan: 'diseno_montaje_stands_perpignan',
    gijon: 'diseno_montaje_stands_gijon',
    lleida: 'diseno_montaje_stands_lleida',
    girona: 'diseno_montaje_stands_girona',
    ourense: 'diseno_montaje_stands_ourense',
    vigo: 'diseno_montaje_stands_vigo',
    santiago: 'diseno_montaje_stands_santiago_de_compostela',
    coruna: 'diseno_montaje_stands_a_coruna',
    valladolid: 'diseno_montaje_stands_valladolid',
    salamanca: 'diseno_montaje_stands_salamanca',
    mallorca: 'diseno_montaje_stands_mallorca',
    valencia: 'diseno_montaje_stands_valencia',
    alicante: 'diseno_montaje_stands_alicante',
    murcia: 'diseno_montaje_stands_murcia',
    oporto: 'diseno-construccion-montaje-stands-oporto',
    portugal_sur: 'diseno_montaje_stands_portugal_sur',
    islas_canarias: 'diseno_montaje_stands_islas_canarias',
    islas_de_madeira: 'diseno_montaje_stands_islas_madeira',
    malaga: 'diseno_montaje_stands_malaga',
    badajoz: 'diseno_montaje_stands_badajoz',
    sevilla: 'diseno_montaje_stands_sevilla',
    ciudad_real: 'diseno_montaje_stands_ciudad_real',
    zaragoza: 'diseno_montaje_stands_zaragoza',
    // Páginas paralelas de "constructor de stands" (defensa ante denuncias falsas).
    // Solo en español; ver src/lib/builderPages.js.
    constructor_stand_zaragoza: 'constructor_stand_zaragoza',
    constructor_stand_madrid: 'constructor_stand_madrid',
    constructor_stand_barcelona: 'constructor_stand_barcelona',
    constructor_stand_oporto: 'constructor_stand_oporto',
    constructor_stand_lisboa: 'constructor_stand_lisboa',
    constructor_stand_bilbao: 'constructor_stand_bilbao',
    constructor_stand_badajoz: 'constructor_stand_badajoz',
    constructor_stand_don_benito: 'constructor_stand_don_benito',
    montaje_zafra: 'montaje_stand_zafra',
    montaje_don_benito: 'montaje_stand_don_benito',
    montaje_badajoz: 'montaje_stand_badajoz',
    almeria: 'diseno_montaje_stands_almeria',
    jaen: 'diseno_montaje_stands_jaen',
    huelva: 'diseno_montaje_stands_huelva',
    cordoba: 'diseno_montaje_stands_cordoba',
    granada: 'diseno_montaje_stands_granada',
    cadiz: 'diseno_montaje_stands_cadiz',
    santarem: 'diseno_montaje_stands_santarem',
    trujillo: 'diseno_montaje_stands_trujillo',
    elche: 'diseno_montaje_stands_elche',
    noticias: 'blog',
    ferias: 'ferias'
  },
  en: {
    home: '',
    services: 'services',
    proyecto_auditado: 'audited-project',
    precios: 'prices',
    luzpavilion: 'luzpavilion',
    custom: 'custom_projects',
    team: 'team',
    contact: 'contact',
    madrid: 'stand_design_assembly_madrid',
    barcelona: 'stand_design_assembly_barcelona',
    bilbao: 'stand_design_assembly_bilbao',
    lisboa: 'stand_design_assembly_lisbon',
    batalha: 'stand_design_assembly_batalha',
    silleda: 'stand_design_assembly_silleda',
    santander: 'stand_design_assembly_santander',
    irun: 'stand_design_assembly_irun',
    logrono: 'stand_design_assembly_logrono',
    pamplona: 'stand_design_assembly_pamplona',
    vitoria: 'stand_design_assembly_vitoria',
    aranda: 'stand_design_assembly_aranda_de_duero',
    regua: 'stand_design_assembly_peso_da_regua',
    ibiza: 'stand_design_assembly_ibiza',
    menorca: 'stand_design_assembly_menorca',
    ceuta: 'stand_design_assembly_ceuta',
    melilla: 'stand_design_assembly_melilla',
    tanger: 'stand_design_assembly_tangier',
    casablanca: 'stand_design_assembly_casablanca',
    rabat: 'stand_design_assembly_rabat',
    andorra: 'stand_design_assembly_andorra',
    teruel: 'stand_design_assembly_teruel',
    marsella: 'stand_design_assembly_marseille',
    cannes: 'stand_design_assembly_cannes',
    avignon: 'stand_design_assembly_avignon',
    toulouse: 'stand_design_assembly_toulouse',
    burdeos: 'stand_design_assembly_bordeaux',
    lyon: 'stand_design_assembly_lyon',
    grenoble: 'stand_design_assembly_grenoble',
    clermont_ferrand: 'stand_design_assembly_clermont_ferrand',
    montpellier: 'stand_design_assembly_montpellier',
    niza: 'stand_design_assembly_nice',
    perpignan: 'stand_design_assembly_perpignan',
    gijon: 'stand_design_assembly_gijon',
    lleida: 'stand_design_assembly_lleida',
    girona: 'stand_design_assembly_girona',
    ourense: 'stand_design_assembly_ourense',
    vigo: 'stand_design_assembly_vigo',
    santiago: 'stand_design_assembly_santiago_de_compostela',
    coruna: 'stand_design_assembly_a_coruna',
    valladolid: 'stand_design_assembly_valladolid',
    salamanca: 'stand_design_assembly_salamanca',
    mallorca: 'stand_design_assembly_mallorca',
    valencia: 'stand_design_assembly_valencia',
    alicante: 'stand_design_assembly_alicante',
    murcia: 'stand_design_assembly_murcia',
    oporto: 'stand_design_assembly_porto',
    portugal_sur: 'stand_design_assembly_southern_portugal',
    islas_canarias: 'stand_design_assembly_canary_islands',
    islas_de_madeira: 'stand_design_assembly_madeira_islands',
    malaga: 'stand_design_assembly_malaga',
    badajoz: 'stand_design_assembly_badajoz',
    sevilla: 'stand_design_assembly_seville',
    ciudad_real: 'stand_design_assembly_ciudad_real',
    zaragoza: 'stand_design_assembly_zaragoza',
    montaje_zafra: 'exhibition_stand_assembly_zafra',
    montaje_don_benito: 'exhibition_stand_assembly_don_benito',
    montaje_badajoz: 'exhibition_stand_assembly_badajoz',
    almeria: 'stand_design_assembly_almeria',
    jaen: 'stand_design_assembly_jaen',
    huelva: 'stand_design_assembly_huelva',
    cordoba: 'stand_design_assembly_cordoba',
    granada: 'stand_design_assembly_granada',
    cadiz: 'stand_design_assembly_cadiz',
    santarem: 'stand_design_assembly_santarem',
    trujillo: 'stand_design_assembly_trujillo',
    elche: 'stand_design_assembly_elche',
    noticias: 'blog',
    ferias: 'fairs'
  },
  de: {
    home: '',
    services: 'dienstleistungen',
    proyecto_auditado: 'auditiertes-projekt',
    precios: 'preise',
    luzpavilion: 'luzpavilion',
    custom: 'massgeschneiderte_projekte',
    team: 'team',
    contact: 'kontakt',
    madrid: 'messestand_design_montage_madrid',
    barcelona: 'messestand_design_montage_barcelona',
    bilbao: 'messestand_design_montage_bilbao',
    lisboa: 'messestand_design_montage_lissabon',
    batalha: 'messestand_design_montage_batalha',
    silleda: 'messestand_design_montage_silleda',
    santander: 'messestand_design_montage_santander',
    irun: 'messestand_design_montage_irun',
    logrono: 'messestand_design_montage_logrono',
    pamplona: 'messestand_design_montage_pamplona',
    vitoria: 'messestand_design_montage_vitoria',
    aranda: 'messestand_design_montage_aranda_de_duero',
    regua: 'messestand_design_montage_peso_da_regua',
    ibiza: 'messestand_design_montage_ibiza',
    menorca: 'messestand_design_montage_menorca',
    ceuta: 'messestand_design_montage_ceuta',
    melilla: 'messestand_design_montage_melilla',
    tanger: 'messestand_design_montage_tanger',
    casablanca: 'messestand_design_montage_casablanca',
    rabat: 'messestand_design_montage_rabat',
    andorra: 'messestand_design_montage_andorra',
    teruel: 'messestand_design_montage_teruel',
    marsella: 'messestand_design_montage_marseille',
    cannes: 'messestand_design_montage_cannes',
    avignon: 'messestand_design_montage_avignon',
    toulouse: 'messestand_design_montage_toulouse',
    burdeos: 'messestand_design_montage_bordeaux',
    lyon: 'messestand_design_montage_lyon',
    grenoble: 'messestand_design_montage_grenoble',
    clermont_ferrand: 'messestand_design_montage_clermont_ferrand',
    montpellier: 'messestand_design_montage_montpellier',
    niza: 'messestand_design_montage_nizza',
    perpignan: 'messestand_design_montage_perpignan',
    gijon: 'messestand_design_montage_gijon',
    lleida: 'messestand_design_montage_lleida',
    girona: 'messestand_design_montage_girona',
    ourense: 'messestand_design_montage_ourense',
    vigo: 'messestand_design_montage_vigo',
    santiago: 'messestand_design_montage_santiago_de_compostela',
    coruna: 'messestand_design_montage_a_coruna',
    valladolid: 'messestand_design_montage_valladolid',
    salamanca: 'messestand_design_montage_salamanca',
    mallorca: 'messestand_design_montage_mallorca',
    valencia: 'messestand_design_montage_valencia',
    alicante: 'messestand_design_montage_alicante',
    murcia: 'messestand_design_montage_murcia',
    oporto: 'messestand_design_montage_porto',
    portugal_sur: 'messestand_design_montage_sudportugal',
    islas_canarias: 'messestand_design_montage_kanarische_inseln',
    islas_de_madeira: 'messestand_design_montage_madeira_inseln',
    malaga: 'messestand_design_montage_malaga',
    badajoz: 'messestand_design_montage_badajoz',
    sevilla: 'messestand_design_montage_sevilla',
    ciudad_real: 'messestand_design_montage_ciudad_real',
    zaragoza: 'messestand_design_montage_zaragoza',
    montaje_zafra: 'messestandmontage_zafra',
    montaje_don_benito: 'messestandmontage_don_benito',
    montaje_badajoz: 'messestandmontage_badajoz',
    almeria: 'messestand_design_montage_almeria',
    jaen: 'messestand_design_montage_jaen',
    huelva: 'messestand_design_montage_huelva',
    cordoba: 'messestand_design_montage_cordoba',
    granada: 'messestand_design_montage_granada',
    cadiz: 'messestand_design_montage_cadiz',
    santarem: 'messestand_design_montage_santarem',
    trujillo: 'messestand_design_montage_trujillo',
    elche: 'messestand_design_montage_elche',
    noticias: 'blog',
    ferias: 'messen'
  },
  zh: {
    home: '',
    services: 'fuwu',
    proyecto_auditado: 'shenji-xiangmu',
    precios: 'jiage',
    luzpavilion: 'luzpavilion',
    custom: 'dingzhi_xiangmu',
    team: 'tuandui',
    contact: 'lianxi',
    madrid: 'madrid_zhantai_sheji_dajian',
    barcelona: 'barcelona_zhantai_sheji_dajian',
    bilbao: 'bilbao_zhantai_sheji_dajian',
    lisboa: 'lisbon_zhantai_sheji_dajian',
    batalha: 'batalha_zhantai_sheji_dajian',
    silleda: 'silleda_zhantai_sheji_dajian',
    santander: 'santander_zhantai_sheji_dajian',
    irun: 'irun_zhantai_sheji_dajian',
    logrono: 'logrono_zhantai_sheji_dajian',
    pamplona: 'pamplona_zhantai_sheji_dajian',
    vitoria: 'vitoria_zhantai_sheji_dajian',
    aranda: 'aranda_zhantai_sheji_dajian',
    regua: 'regua_zhantai_sheji_dajian',
    ibiza: 'ibiza_zhantai_sheji_dajian',
    menorca: 'menorca_zhantai_sheji_dajian',
    ceuta: 'ceuta_zhantai_sheji_dajian',
    melilla: 'melilla_zhantai_sheji_dajian',
    tanger: 'tanger_zhantai_sheji_dajian',
    casablanca: 'casablanca_zhantai_sheji_dajian',
    rabat: 'rabat_zhantai_sheji_dajian',
    andorra: 'andorra_zhantai_sheji_dajian',
    teruel: 'teruel_zhantai_sheji_dajian',
    marsella: 'marseille_zhantai_sheji_dajian',
    cannes: 'cannes_zhantai_sheji_dajian',
    avignon: 'avignon_zhantai_sheji_dajian',
    toulouse: 'toulouse_zhantai_sheji_dajian',
    burdeos: 'bordeaux_zhantai_sheji_dajian',
    lyon: 'lyon_zhantai_sheji_dajian',
    grenoble: 'grenoble_zhantai_sheji_dajian',
    clermont_ferrand: 'clermont_ferrand_zhantai_sheji_dajian',
    montpellier: 'montpellier_zhantai_sheji_dajian',
    niza: 'nice_zhantai_sheji_dajian',
    perpignan: 'perpignan_zhantai_sheji_dajian',
    gijon: 'gijon_zhantai_sheji_dajian',
    lleida: 'lleida_zhantai_sheji_dajian',
    girona: 'girona_zhantai_sheji_dajian',
    ourense: 'ourense_zhantai_sheji_dajian',
    vigo: 'vigo_zhantai_sheji_dajian',
    santiago: 'santiago_de_compostela_zhantai_sheji_dajian',
    coruna: 'a_coruna_zhantai_sheji_dajian',
    valladolid: 'valladolid_zhantai_sheji_dajian',
    salamanca: 'salamanca_zhantai_sheji_dajian',
    mallorca: 'mallorca_zhantai_sheji_dajian',
    valencia: 'valencia_zhantai_sheji_dajian',
    alicante: 'alicante_zhantai_sheji_dajian',
    murcia: 'murcia_zhantai_sheji_dajian',
    oporto: 'porto_zhantai_sheji_dajian',
    portugal_sur: 'nan_putaoya_zhantai_sheji_dajian',
    islas_canarias: 'canarias_zhantai_sheji_dajian',
    islas_de_madeira: 'madala_qundao_zhantai_sheji_dajian',
    malaga: 'malaga_zhantai_sheji_dajian',
    badajoz: 'badajoz_zhantai_sheji_dajian',
    sevilla: 'sevilla_zhantai_sheji_dajian',
    ciudad_real: 'ciudad_real_zhantai_sheji_dajian',
    zaragoza: 'zaragoza_zhantai_sheji_dajian',
    montaje_zafra: 'zafra_zhantai_dajian',
    montaje_don_benito: 'don_benito_zhantai_dajian',
    montaje_badajoz: 'badajoz_zhantai_dajian_montaje',
    almeria: 'almeria_zhantai_sheji_dajian',
    jaen: 'jaen_zhantai_sheji_dajian',
    huelva: 'huelva_zhantai_sheji_dajian',
    cordoba: 'cordoba_zhantai_sheji_dajian',
    granada: 'granada_zhantai_sheji_dajian',
    cadiz: 'cadiz_zhantai_sheji_dajian',
    santarem: 'santarem_zhantai_sheji_dajian',
    trujillo: 'trujillo_zhantai_sheji_dajian',
    elche: 'elche_zhantai_sheji_dajian',
    noticias: 'blog',
    ferias: 'zhanhui'
  },
  hi: {
    home: '',
    services: 'sevaen',
    proyecto_auditado: 'audit-pariyojana',
    precios: 'kimat',
    luzpavilion: 'luzpavilion',
    custom: 'custom_projects',
    team: 'team',
    contact: 'sampark',
    madrid: 'madrid_stand_dizain_asembli',
    barcelona: 'barcelona_stand_dizain_asembli',
    bilbao: 'bilbao_stand_dizain_asembli',
    lisboa: 'lisbon_stand_dizain_asembli',
    batalha: 'batalha_stand_dizain_asembli',
    silleda: 'silleda_stand_dizain_asembli',
    santander: 'santander_stand_dizain_asembli',
    irun: 'irun_stand_dizain_asembli',
    logrono: 'logrono_stand_dizain_asembli',
    pamplona: 'pamplona_stand_dizain_asembli',
    vitoria: 'vitoria_stand_dizain_asembli',
    aranda: 'aranda_stand_dizain_asembli',
    regua: 'regua_stand_dizain_asembli',
    ibiza: 'ibiza_stand_dizain_asembli',
    menorca: 'menorca_stand_dizain_asembli',
    ceuta: 'ceuta_stand_dizain_asembli',
    melilla: 'melilla_stand_dizain_asembli',
    tanger: 'tanger_stand_dizain_asembli',
    casablanca: 'casablanca_stand_dizain_asembli',
    rabat: 'rabat_stand_dizain_asembli',
    andorra: 'andorra_stand_dizain_asembli',
    teruel: 'teruel_stand_dizain_asembli',
    marsella: 'marseille_stand_dizain_asembli',
    cannes: 'cannes_stand_dizain_asembli',
    avignon: 'avignon_stand_dizain_asembli',
    toulouse: 'toulouse_stand_dizain_asembli',
    burdeos: 'bordeaux_stand_dizain_asembli',
    lyon: 'lyon_stand_dizain_asembli',
    grenoble: 'grenoble_stand_dizain_asembli',
    clermont_ferrand: 'clermont_ferrand_stand_dizain_asembli',
    montpellier: 'montpellier_stand_dizain_asembli',
    niza: 'nice_stand_dizain_asembli',
    perpignan: 'perpignan_stand_dizain_asembli',
    gijon: 'gijon_stand_dizain_asembli',
    lleida: 'lleida_stand_dizain_asembli',
    girona: 'girona_stand_dizain_asembli',
    ourense: 'ourense_stand_dizain_asembli',
    vigo: 'vigo_stand_dizain_asembli',
    santiago: 'santiago_de_compostela_stand_dizain_asembli',
    coruna: 'a_coruna_stand_dizain_asembli',
    valladolid: 'valladolid_stand_dizain_asembli',
    salamanca: 'salamanca_stand_dizain_asembli',
    mallorca: 'mallorca_stand_dizain_asembli',
    valencia: 'valencia_stand_dizain_asembli',
    alicante: 'alicante_stand_dizain_asembli',
    murcia: 'murcia_stand_dizain_asembli',
    oporto: 'porto_stand_dizain_asembli',
    portugal_sur: 'dakshini_purtagal_stand_dizain_asembli',
    islas_canarias: 'canary_islands_stand_dizain_asembli',
    islas_de_madeira: 'madeira_dweep_stand_dizain_asembli',
    malaga: 'malaga_stand_dizain_asembli',
    badajoz: 'badajoz_stand_dizain_asembli',
    sevilla: 'sevilla_stand_dizain_asembli',
    ciudad_real: 'ciudad_real_stand_dizain_asembli',
    zaragoza: 'zaragoza_stand_dizain_asembli',
    montaje_zafra: 'zafra_stand_nirman',
    montaje_don_benito: 'don_benito_stand_nirman',
    montaje_badajoz: 'badajoz_stand_nirman_montaje',
    almeria: 'almeria_stand_dizain_asembli',
    jaen: 'jaen_stand_dizain_asembli',
    huelva: 'huelva_stand_dizain_asembli',
    cordoba: 'cordoba_stand_dizain_asembli',
    granada: 'granada_stand_dizain_asembli',
    cadiz: 'cadiz_stand_dizain_asembli',
    santarem: 'santarem_stand_dizain_asembli',
    trujillo: 'trujillo_stand_dizain_asembli',
    elche: 'elche_stand_dizain_asembli',
    noticias: 'blog',
    ferias: 'mele'
  },
  pt: {
    home: '',
    services: 'servicos',
    proyecto_auditado: 'projeto-auditado',
    precios: 'precos',
    luzpavilion: 'luzpavilion',
    custom: 'projetos_a_medida',
    team: 'equipa',
    contact: 'contacto',
    madrid: 'design_montagem_stands_madrid',
    barcelona: 'design_montagem_stands_barcelona',
    bilbao: 'design_montagem_stands_bilbao',
    lisboa: 'design_montagem_stands_lisboa',
    batalha: 'design_montagem_stands_batalha',
    silleda: 'design_montagem_stands_silleda',
    santander: 'design_montagem_stands_santander',
    irun: 'design_montagem_stands_irun',
    logrono: 'design_montagem_stands_logrono',
    pamplona: 'design_montagem_stands_pamplona',
    vitoria: 'design_montagem_stands_vitoria',
    aranda: 'design_montagem_stands_aranda_de_duero',
    regua: 'design_montagem_stands_peso_da_regua',
    ibiza: 'design_montagem_stands_ibiza',
    menorca: 'design_montagem_stands_menorca',
    ceuta: 'design_montagem_stands_ceuta',
    melilla: 'design_montagem_stands_melilla',
    tanger: 'design_montagem_stands_tanger',
    casablanca: 'design_montagem_stands_casablanca',
    rabat: 'design_montagem_stands_rabat',
    andorra: 'design_montagem_stands_andorra',
    teruel: 'design_montagem_stands_teruel',
    marsella: 'design_montagem_stands_marseille',
    cannes: 'design_montagem_stands_cannes',
    avignon: 'design_montagem_stands_avignon',
    toulouse: 'design_montagem_stands_toulouse',
    burdeos: 'design_montagem_stands_bordeaux',
    lyon: 'design_montagem_stands_lyon',
    grenoble: 'design_montagem_stands_grenoble',
    clermont_ferrand: 'design_montagem_stands_clermont_ferrand',
    montpellier: 'design_montagem_stands_montpellier',
    niza: 'design_montagem_stands_nice',
    perpignan: 'design_montagem_stands_perpignan',
    gijon: 'design_montagem_stands_gijon',
    lleida: 'design_montagem_stands_lleida',
    girona: 'design_montagem_stands_girona',
    ourense: 'design_montagem_stands_ourense',
    vigo: 'design_montagem_stands_vigo',
    santiago: 'design_montagem_stands_santiago_de_compostela',
    coruna: 'design_montagem_stands_a_coruna',
    valladolid: 'design_montagem_stands_valladolid',
    salamanca: 'design_montagem_stands_salamanca',
    mallorca: 'design_montagem_stands_mallorca',
    valencia: 'design_montagem_stands_valencia',
    alicante: 'design_montagem_stands_alicante',
    murcia: 'design_montagem_stands_murcia',
    oporto: 'design_montagem_stands_porto',
    portugal_sur: 'design_montagem_stands_sul_portugal',
    islas_canarias: 'design_montagem_stands_ilhas_canarias',
    islas_de_madeira: 'design_montagem_stands_ilhas_madeira',
    malaga: 'design_montagem_stands_malaga',
    badajoz: 'design_montagem_stands_badajoz',
    sevilla: 'design_montagem_stands_sevilla',
    ciudad_real: 'design_montagem_stands_ciudad_real',
    zaragoza: 'design_montagem_stands_zaragoza',
    montaje_zafra: 'montagem_stand_zafra',
    montaje_don_benito: 'montagem_stand_don_benito',
    montaje_badajoz: 'montagem_stand_badajoz',
    almeria: 'design_montagem_stands_almeria',
    jaen: 'design_montagem_stands_jaen',
    huelva: 'design_montagem_stands_huelva',
    cordoba: 'design_montagem_stands_cordoba',
    granada: 'design_montagem_stands_granada',
    cadiz: 'design_montagem_stands_cadiz',
    santarem: 'design_montagem_stands_santarem',
    trujillo: 'design_montagem_stands_trujillo',
    elche: 'design_montagem_stands_elche',
    noticias: 'blog',
    ferias: 'feiras'
  },
  fr: {
    home: '',
    services: 'services',
    proyecto_auditado: 'projet-audite',
    precios: 'tarifs',
    luzpavilion: 'luzpavilion',
    custom: 'projets_sur_mesure',
    team: 'equipe',
    contact: 'contact',
    madrid: 'conception_montage_stands_madrid',
    barcelona: 'conception_montage_stands_barcelone',
    bilbao: 'conception_montage_stands_bilbao',
    lisboa: 'conception_montage_stands_lisbonne',
    batalha: 'conception_montage_stands_batalha',
    silleda: 'conception_montage_stands_silleda',
    santander: 'conception_montage_stands_santander',
    irun: 'conception_montage_stands_irun',
    logrono: 'conception_montage_stands_logrono',
    pamplona: 'conception_montage_stands_pamplona',
    vitoria: 'conception_montage_stands_vitoria',
    aranda: 'conception_montage_stands_aranda_de_duero',
    regua: 'conception_montage_stands_peso_da_regua',
    ibiza: 'conception_montage_stands_ibiza',
    menorca: 'conception_montage_stands_menorca',
    ceuta: 'conception_montage_stands_ceuta',
    melilla: 'conception_montage_stands_melilla',
    tanger: 'conception_montage_stands_tanger',
    casablanca: 'conception_montage_stands_casablanca',
    rabat: 'conception_montage_stands_rabat',
    andorra: 'conception_montage_stands_andorre',
    teruel: 'conception_montage_stands_teruel',
    marsella: 'conception_montage_stands_marseille',
    cannes: 'conception_montage_stands_cannes',
    avignon: 'conception_montage_stands_avignon',
    toulouse: 'conception_montage_stands_toulouse',
    burdeos: 'conception_montage_stands_bordeaux',
    lyon: 'conception_montage_stands_lyon',
    grenoble: 'conception_montage_stands_grenoble',
    clermont_ferrand: 'conception_montage_stands_clermont_ferrand',
    montpellier: 'conception_montage_stands_montpellier',
    niza: 'conception_montage_stands_nice',
    perpignan: 'conception_montage_stands_perpignan',
    gijon: 'conception_montage_stands_gijon',
    lleida: 'conception_montage_stands_lleida',
    girona: 'conception_montage_stands_girona',
    ourense: 'conception_montage_stands_ourense',
    vigo: 'conception_montage_stands_vigo',
    santiago: 'conception_montage_stands_saint_jacques_de_compostelle',
    coruna: 'conception_montage_stands_la_corogne',
    valladolid: 'conception_montage_stands_valladolid',
    salamanca: 'conception_montage_stands_salamanque',
    mallorca: 'conception_montage_stands_mallorca',
    valencia: 'conception_montage_stands_valence',
    alicante: 'conception_montage_stands_alicante',
    murcia: 'conception_montage_stands_murcie',
    oporto: 'conception_montage_stands_porto',
    portugal_sur: 'conception_montage_stands_sud_portugal',
    islas_canarias: 'conception_montage_stands_iles_canaries',
    islas_de_madeira: 'conception_montage_stands_iles_madere',
    malaga: 'conception_montage_stands_malaga',
    badajoz: 'conception_montage_stands_badajoz',
    sevilla: 'conception_montage_stands_seville',
    ciudad_real: 'conception_montage_stands_ciudad_real',
    zaragoza: 'conception_montage_stands_zaragoza',
    montaje_zafra: 'montage_stands_zafra',
    montaje_don_benito: 'montage_stands_don_benito',
    montaje_badajoz: 'montage_stands_badajoz',
    almeria: 'conception_montage_stands_almeria',
    jaen: 'conception_montage_stands_jaen',
    huelva: 'conception_montage_stands_huelva',
    cordoba: 'conception_montage_stands_cordoue',
    granada: 'conception_montage_stands_grenade',
    cadiz: 'conception_montage_stands_cadix',
    santarem: 'conception_montage_stands_santarem',
    trujillo: 'conception_montage_stands_trujillo',
    elche: 'conception_montage_stands_elche',
    noticias: 'blog',
    ferias: 'salons'
  },
  it: {
    home: '',
    services: 'servizi',
    proyecto_auditado: 'progetto-verificato',
    precios: 'prezzi',
    luzpavilion: 'luzpavilion',
    custom: 'progetti_su_misura',
    team: 'squadra',
    contact: 'contatto',
    madrid: 'progettazione_montaggio_stand_madrid',
    barcelona: 'progettazione_montaggio_stand_barcellona',
    bilbao: 'progettazione_montaggio_stand_bilbao',
    lisboa: 'progettazione_montaggio_stand_lisbona',
    batalha: 'progettazione_montaggio_stand_batalha',
    silleda: 'progettazione_montaggio_stand_silleda',
    santander: 'progettazione_montaggio_stand_santander',
    irun: 'progettazione_montaggio_stand_irun',
    logrono: 'progettazione_montaggio_stand_logrono',
    pamplona: 'progettazione_montaggio_stand_pamplona',
    vitoria: 'progettazione_montaggio_stand_vitoria',
    aranda: 'progettazione_montaggio_stand_aranda_de_duero',
    regua: 'progettazione_montaggio_stand_peso_da_regua',
    ibiza: 'progettazione_montaggio_stand_ibiza',
    menorca: 'progettazione_montaggio_stand_menorca',
    ceuta: 'progettazione_montaggio_stand_ceuta',
    melilla: 'progettazione_montaggio_stand_melilla',
    tanger: 'progettazione_montaggio_stand_tangeri',
    casablanca: 'progettazione_montaggio_stand_casablanca',
    rabat: 'progettazione_montaggio_stand_rabat',
    andorra: 'progettazione_montaggio_stand_andorra',
    teruel: 'progettazione_montaggio_stand_teruel',
    marsella: 'progettazione_montaggio_stand_marseille',
    cannes: 'progettazione_montaggio_stand_cannes',
    avignon: 'progettazione_montaggio_stand_avignon',
    toulouse: 'progettazione_montaggio_stand_toulouse',
    burdeos: 'progettazione_montaggio_stand_bordeaux',
    lyon: 'progettazione_montaggio_stand_lyon',
    grenoble: 'progettazione_montaggio_stand_grenoble',
    clermont_ferrand: 'progettazione_montaggio_stand_clermont_ferrand',
    montpellier: 'progettazione_montaggio_stand_montpellier',
    niza: 'progettazione_montaggio_stand_nizza',
    perpignan: 'progettazione_montaggio_stand_perpignan',
    gijon: 'progettazione_montaggio_stand_gijon',
    lleida: 'progettazione_montaggio_stand_lleida',
    girona: 'progettazione_montaggio_stand_girona',
    ourense: 'progettazione_montaggio_stand_ourense',
    vigo: 'progettazione_montaggio_stand_vigo',
    santiago: 'progettazione_montaggio_stand_santiago_di_compostela',
    coruna: 'progettazione_montaggio_stand_la_coruna',
    valladolid: 'progettazione_montaggio_stand_valladolid',
    salamanca: 'progettazione_montaggio_stand_salamanca',
    mallorca: 'progettazione_montaggio_stand_mallorca',
    valencia: 'progettazione_montaggio_stand_valencia',
    alicante: 'progettazione_montaggio_stand_alicante',
    murcia: 'progettazione_montaggio_stand_murcia',
    oporto: 'progettazione_montaggio_stand_porto',
    portugal_sur: 'progettazione_montaggio_stand_sud_portogallo',
    islas_canarias: 'progettazione_montaggio_stand_isole_canarie',
    islas_de_madeira: 'progettazione_montaggio_stand_isole_madera',
    malaga: 'progettazione_montaggio_stand_malaga',
    badajoz: 'progettazione_montaggio_stand_badajoz',
    sevilla: 'progettazione_montaggio_stand_sevilla',
    ciudad_real: 'progettazione_montaggio_stand_ciudad_real',
    zaragoza: 'progettazione_montaggio_stand_zaragoza',
    montaje_zafra: 'allestimento_stand_zafra',
    montaje_don_benito: 'allestimento_stand_don_benito',
    montaje_badajoz: 'allestimento_stand_badajoz',
    almeria: 'progettazione_montaggio_stand_almeria',
    jaen: 'progettazione_montaggio_stand_jaen',
    huelva: 'progettazione_montaggio_stand_huelva',
    cordoba: 'progettazione_montaggio_stand_cordoba',
    granada: 'progettazione_montaggio_stand_granada',
    cadiz: 'progettazione_montaggio_stand_cadice',
    santarem: 'progettazione_montaggio_stand_santarem',
    trujillo: 'progettazione_montaggio_stand_trujillo',
    elche: 'progettazione_montaggio_stand_elche',
    noticias: 'blog',
    ferias: 'fiere'
  },
  ko: {
    home: '',
    services: 'jeonsigwan-seobiseu',
    proyecto_auditado: 'gamsa-peurojekteu',
    precios: 'gagyeok',
    luzpavilion: 'luzpavilion',
    custom: 'majchumhyeong-peurojekteu',
    team: 'tim',
    contact: 'yeollagcheo',
    madrid: 'madrid-bujeu-dijain-jorip',
    barcelona: 'barcelona-bujeu-dijain-jorip',
    bilbao: 'bilbao-bujeu-dijain-jorip',
    lisboa: 'lisbon-bujeu-dijain-jorip',
    batalha: 'batalha-bujeu-dijain-jorip',
    silleda: 'silleda-bujeu-dijain-jorip',
    santander: 'santander-bujeu-dijain-jorip',
    irun: 'irun-buseu-dijain-jorip',
    logrono: 'logrono-buseu-dijain-jorip',
    pamplona: 'pamplona-buseu-dijain-jorip',
    vitoria: 'vitoria-buseu-dijain-jorip',
    aranda: 'aranda-buseu-dijain-jorip',
    regua: 'regua-buseu-dijain-jorip',
    ibiza: 'ibiza-buseu-dijain-jorip',
    menorca: 'menorca-buseu-dijain-jorip',
    ceuta: 'ceuta-buseu-dijain-jorip',
    melilla: 'melilla-buseu-dijain-jorip',
    tanger: 'tanger-buseu-dijain-jorip',
    casablanca: 'casablanca-buseu-dijain-jorip',
    rabat: 'rabat-buseu-dijain-jorip',
    andorra: 'andorra-buseu-dijain-jorip',
    teruel: 'teruel-buseu-dijain-jorip',
    marsella: 'marseille-buseu-dijain-jorip',
    cannes: 'cannes-buseu-dijain-jorip',
    avignon: 'avignon-buseu-dijain-jorip',
    toulouse: 'toulouse-buseu-dijain-jorip',
    burdeos: 'bordeaux-buseu-dijain-jorip',
    lyon: 'lyon-buseu-dijain-jorip',
    grenoble: 'grenoble-buseu-dijain-jorip',
    clermont_ferrand: 'clermont-ferrand-buseu-dijain-jorip',
    montpellier: 'montpellier-buseu-dijain-jorip',
    niza: 'nice-buseu-dijain-jorip',
    perpignan: 'perpignan-buseu-dijain-jorip',
    gijon: 'gijon-bujeu-dijain-jorip',
    lleida: 'lleida-bujeu-dijain-jorip',
    girona: 'girona-bujeu-dijain-jorip',
    ourense: 'ourense-bujeu-dijain-jorip',
    vigo: 'vigo-bujeu-dijain-jorip',
    santiago: 'santiago_de_compostela-bujeu-dijain-jorip',
    coruna: 'a_coruna-bujeu-dijain-jorip',
    valladolid: 'valladolid-bujeu-dijain-jorip',
    salamanca: 'salamanca-bujeu-dijain-jorip',
    mallorca: 'mallorca-bujeu-dijain-jorip',
    valencia: 'valencia-bujeu-dijain-jorip',
    alicante: 'alicante-bujeu-dijain-jorip',
    murcia: 'murcia-bujeu-dijain-jorip',
    oporto: 'porto-bujeu-dijain-jorip',
    portugal_sur: 'nambu-poreutugal-buseu-dijain-jorip',
    islas_canarias: 'canary-islands-buseu-dijain-jorip',
    islas_de_madeira: 'madeira-jedo-buseu-dijain-jorip',
    malaga: 'malaga-bujeu-dijain-jorip',
    badajoz: 'badajoz-bujeu-dijain-jorip',
    sevilla: 'sevilla-bujeu-dijain-jorip',
    ciudad_real: 'ciudad_real-bujeu-dijain-jorip',
    zaragoza: 'zaragoza-bujeu-dijain-jorip',
    montaje_zafra: 'zafra-bujeu-jejak',
    montaje_don_benito: 'don-benito-bujeu-jejak',
    montaje_badajoz: 'badajoz-bujeu-jejak-montaje',
    almeria: 'almeria-bujeu-dijain-jorip',
    jaen: 'jaen-bujeu-dijain-jorip',
    huelva: 'huelva-bujeu-dijain-jorip',
    cordoba: 'cordoba-bujeu-dijain-jorip',
    granada: 'granada-bujeu-dijain-jorip',
    cadiz: 'cadiz-bujeu-dijain-jorip',
    santarem: 'santarem-bujeu-dijain-jorip',
    trujillo: 'trujillo-bujeu-dijain-jorip',
    elche: 'elche-bujeu-dijain-jorip',
    noticias: 'blog',
    ferias: 'jeonsihoe'
  },
  ja: {
    home: '',
    services: '展示会ブース施工',
    proyecto_auditado: '監査プロジェクト',
    precios: '料金',
    luzpavilion: 'luzpavilion',
    custom: '施工事例',
    team: 'チーム',
    contact: 'お問い合わせ',
    madrid: 'マドリード展示会ブース設計施工',
    barcelona: 'バルセロナ展示会ブース設計施工',
    bilbao: 'ビルバオ展示会ブース設計施工',
    lisboa: 'リスボン展示会ブース設計施工',
    batalha: 'バターリャ展示会ブース設計施工',
    silleda: 'シジェダ展示会ブース設計施工',
    santander: 'サンタンデール展示会ブース設計施工',
    irun: 'イルン展示会ブース設計施工',
    logrono: 'ログローニョ展示会ブース設計施工',
    pamplona: 'パンプローナ展示会ブース設計施工',
    vitoria: 'ビトリア展示会ブース設計施工',
    aranda: 'アランダ・デ・ドゥエロ展示会ブース設計施工',
    regua: 'ペーゾ・ダ・レグア展示会ブース設計施工',
    ibiza: 'イビサ展示会ブース設計施工',
    menorca: 'メノルカ展示会ブース設計施工',
    ceuta: 'セウタ展示会ブース設計施工',
    melilla: 'メリリャ展示会ブース設計施工',
    tanger: 'タンジェ展示会ブース設計施工',
    casablanca: 'カサブランカ展示会ブース設計施工',
    rabat: 'ラバト展示会ブース設計施工',
    andorra: 'アンドラ展示会ブース設計施工',
    teruel: 'テルエル展示会ブース設計施工',
    marsella: 'マルセイユ展示会ブース設計施工',
    cannes: 'カンヌ展示会ブース設計施工',
    avignon: 'アヴィニョン展示会ブース設計施工',
    toulouse: 'トゥールーズ展示会ブース設計施工',
    burdeos: 'ボルドー展示会ブース設計施工',
    lyon: 'リヨン展示会ブース設計施工',
    grenoble: 'グルノーブル展示会ブース設計施工',
    clermont_ferrand: 'クレルモンフェラン展示会ブース設計施工',
    montpellier: 'モンペリエ展示会ブース設計施工',
    niza: 'ニース展示会ブース設計施工',
    perpignan: 'ペルピニャン展示会ブース設計施工',
    gijon: 'ヒホン展示会ブース設計施工',
    lleida: 'リェイダ展示会ブース設計施工',
    girona: 'ジローナ展示会ブース設計施工',
    ourense: 'オウレンセ展示会ブース設計施工',
    vigo: 'ビーゴ展示会ブース設計施工',
    santiago: 'サンティアゴ・デ・コンポステーラ展示会ブース設計施工',
    coruna: 'ア・コルーニャ展示会ブース設計施工',
    valladolid: 'バリャドリッド展示会ブース設計施工',
    salamanca: 'サラマンカ展示会ブース設計施工',
    mallorca: 'マヨルカ展示会ブース設計施工',
    valencia: 'バレンシア展示会ブース設計施工',
    alicante: 'アリカンテ展示会ブース設計施工',
    murcia: 'ムルシア展示会ブース設計施工',
    oporto: 'ポルト展示会ブース設計施工',
    portugal_sur: '南ポルトガル展示会ブース設計施工',
    islas_canarias: 'カナリア諸島展示会ブース設計施工',
    islas_de_madeira: 'マデイラ諸島展示会ブース設計施工',
    malaga: 'マラガ展示会ブース設計施工',
    badajoz: 'バダホス展示会ブース設計施工',
    sevilla: 'セビリア展示会ブース設計施工',
    ciudad_real: 'シウダーレアル展示会ブース設計施工',
    zaragoza: 'サラゴサ展示会ブース設計施工',
    montaje_zafra: 'サフラ展示会ブース設営',
    montaje_don_benito: 'ドンベニート展示会ブース設営',
    montaje_badajoz: 'バダホス展示会ブース設営',
    almeria: 'アルメリア展示会ブース設計施工',
    jaen: 'ハエン展示会ブース設計施工',
    huelva: 'ウエルバ展示会ブース設計施工',
    cordoba: 'コルドバ展示会ブース設計施工',
    granada: 'グラナダ展示会ブース設計施工',
    cadiz: 'カディス展示会ブース設計施工',
    santarem: 'サンタレン展示会ブース設計施工',
    trujillo: 'トルヒージョ展示会ブース設計施工',
    elche: 'エルチェ展示会ブース設計施工',
    noticias: 'blog',
    ferias: '展示会情報'
  },
  nl: {
    home: '',
    services: 'diensten',
    proyecto_auditado: 'gecontroleerd-project',
    precios: 'prijzen',
    luzpavilion: 'luzpavilion',
    custom: 'projecten_op_maat',
    team: 'team',
    contact: 'contact',
    madrid: 'standontwerp_montage_madrid',
    barcelona: 'standontwerp_montage_barcelona',
    bilbao: 'standontwerp_montage_bilbao',
    lisboa: 'standontwerp_montage_lissabon',
    batalha: 'standontwerp_montage_batalha',
    silleda: 'standontwerp_montage_silleda',
    santander: 'standontwerp_montage_santander',
    irun: 'standontwerp_montage_irun',
    logrono: 'standontwerp_montage_logrono',
    pamplona: 'standontwerp_montage_pamplona',
    vitoria: 'standontwerp_montage_vitoria',
    aranda: 'standontwerp_montage_aranda_de_duero',
    regua: 'standontwerp_montage_peso_da_regua',
    ibiza: 'standontwerp_montage_ibiza',
    menorca: 'standontwerp_montage_menorca',
    ceuta: 'standontwerp_montage_ceuta',
    melilla: 'standontwerp_montage_melilla',
    tanger: 'standontwerp_montage_tanger',
    casablanca: 'standontwerp_montage_casablanca',
    rabat: 'standontwerp_montage_rabat',
    andorra: 'standontwerp_montage_andorra',
    teruel: 'standontwerp_montage_teruel',
    marsella: 'standontwerp_montage_marseille',
    cannes: 'standontwerp_montage_cannes',
    avignon: 'standontwerp_montage_avignon',
    toulouse: 'standontwerp_montage_toulouse',
    burdeos: 'standontwerp_montage_bordeaux',
    lyon: 'standontwerp_montage_lyon',
    grenoble: 'standontwerp_montage_grenoble',
    clermont_ferrand: 'standontwerp_montage_clermont_ferrand',
    montpellier: 'standontwerp_montage_montpellier',
    niza: 'standontwerp_montage_nice',
    perpignan: 'standontwerp_montage_perpignan',
    gijon: 'standontwerp_montage_gijon',
    lleida: 'standontwerp_montage_lleida',
    girona: 'standontwerp_montage_girona',
    ourense: 'standontwerp_montage_ourense',
    vigo: 'standontwerp_montage_vigo',
    santiago: 'standontwerp_montage_santiago_de_compostela',
    coruna: 'standontwerp_montage_a_coruna',
    valladolid: 'standontwerp_montage_valladolid',
    salamanca: 'standontwerp_montage_salamanca',
    mallorca: 'standontwerp_montage_mallorca',
    valencia: 'standontwerp_montage_valencia',
    alicante: 'standontwerp_montage_alicante',
    murcia: 'standontwerp_montage_murcia',
    oporto: 'standontwerp_montage_porto',
    portugal_sur: 'standontwerp_montage_zuid_portugal',
    islas_canarias: 'standontwerp_montage_canarische_eilanden',
    islas_de_madeira: 'standontwerp_montage_madeira_eilanden',
    malaga: 'standontwerp_montage_malaga',
    badajoz: 'standontwerp_montage_badajoz',
    sevilla: 'standontwerp_montage_sevilla',
    ciudad_real: 'standontwerp_montage_ciudad_real',
    zaragoza: 'standontwerp_montage_zaragoza',
    montaje_zafra: 'standmontage_zafra',
    montaje_don_benito: 'standmontage_don_benito',
    montaje_badajoz: 'standmontage_badajoz',
    almeria: 'standontwerp_montage_almeria',
    jaen: 'standontwerp_montage_jaen',
    huelva: 'standontwerp_montage_huelva',
    cordoba: 'standontwerp_montage_cordoba',
    granada: 'standontwerp_montage_granada',
    cadiz: 'standontwerp_montage_cadiz',
    santarem: 'standontwerp_montage_santarem',
    trujillo: 'standontwerp_montage_trujillo',
    elche: 'standontwerp_montage_elche',
    noticias: 'blog',
    ferias: 'beurzen'
  }
};

export const copy = {
  es: {
    faqsTitle: 'Preguntas Frecuentes', successStoriesTitle: 'Casos de Éxito', featuredProjectsIntro: 'Proyectos destacados de carpintería a medida y diseño de stands:', 
    nav: { home: 'Inicio', services: 'Servicios', custom: 'Galería', noticias: 'Blog', contact: 'Contacto', language: 'Idioma' },
    seoTitle: 'Standarte | Diseño y montaje de stands en España y Portugal · Proyecto Auditado',
    seoDescription: 'Standarte: la empresa ideal para tu estrategia de expansión presencial en España y Portugal, gracias a nuestra extensa cobertura de eventos.',
    heroTitle: 'Crece en las ferias de España y Portugal',
    servicesTitle: 'Servicios',
    services: [
      ['Diseño e Ingeniería', 'Nuestro equipo profesional tomará nota de las necesidades de su proyecto que, con todo detalle, quedarán reflejadas en un diseño 3D personalizado que podrá explorar y revisar antes del comienzo de la fabricación. La imagen del prototipo será 100% fidedigna al resultado final.'],
      ['Fabricación', 'En el proceso de fabricación aplicamos las más modernas técnicas de ensamblaje con materiales especificos para el uso en arquitectura efímera. Esto nos permite ofrecer un aspecto impecable que demostrará calidad a primera vista.'],
      ['Montaje y validaciones', 'Nos encargamos de todo. Con total tranquilidad podrás presentarse el primer dia de feria, y lo encontrará todo listo para empezar tu labor comercial. Stand, catering, papelería,... indiferentemente si es una feria en Madrid, Fráncfort, Pekín o Chicago.']
    ],
    micro: {
      title: 'Pabellón de luz',
      subtitle: 'Carpas para eventos de verano en España y Portugal',
      color: 'Color',
      finish: 'Acabado:',
      descriptionTitle: 'Descripción:',
      description: 'Stand de pequeño formato compuesto por 4 cuerpos<br>Su montaje es muy sencillo; no necesita herramientas.<br>Producto acoplable libremente configurable.',
      qualitiesTitle: 'Calidades:',
      materials: 'Materiales',
      materialsValue: 'MDF, vidrio, textil arquitectónico, metal',
      finishValue: 'Pintura aerográfica + lacado',
      partsTitle: 'Partes:',
      parts: '1 = Gráfica retroiluminada <br>2 = Estantes iluminados <br>3 = Logotipo personalizado <br>4 = Almacén <br>5 = Mostrador con puertas',
      priceTitle: 'Precio:',
      priceText: 'Conjunto de 4 módulos con iluminación y <br> gráfica personalizada',
      chooseFinish: 'Elige el acabado<br>para ver el precio.',
      choose: 'Elige acabado para ver precio',
      partsLabel: 'Partes',
      price: 'Precio',
      qualities: 'Calidades',
      pause: 'PAUSA',
      play: 'REPRODUCIR',
      visitWeb: 'VISITAR WEB ESPECÍFICA',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Ferias en entornos históricos',
          subtitle: 'Diseño e ingeniería respetuosa en ubicaciones tradicionales e históricas.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Presentaciones de empresa',
          subtitle: 'Espacios gourmet a medida para bodegas y eventos especiales.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Ferias al aire libre de gran formato',
          subtitle: 'Montajes de gran escala y carpas premium de alta resistencia.'
        }
      ]
    },
    citiesIntro: 'Diseño, construcción y montaje de stands en ciudades clave de España y Portugal',
    customTitle: 'Galería',
    customSubtitle: 'Clasificados por la técnica de montaje principal.',
    filters: { all: 'Todos', textil: 'Textil', madera: 'Madera' },
    counters: { projects: 'Proyectos', clients: 'Clientes', countries: 'Países', fairs: 'Ferias' },
    teamTitle: 'Equipo',
    teamSubtitle: 'Somos un equipo multidisciplinar, entre los que hay arquitectos, montadores, decoradores, técnico de iluminación,... Juntos podemos dar una respuesta completa a todas las necesidades de cada proyecto. No dudes en llamarnos para cualquier duda que tengas. Esperamos conocerte pronto.',
    teamRoles: ['Creatividad', 'Administrador', 'Taller', 'Coordinación'],
    contactTitle: 'Presupuesto en 24h',
    contactNotice: 'Dinos lo que necesitáis y en un plazo de 24 horas tendremos un diseño 3D con todo lujo de detalles y una propuesta económica super-competitiva.',
    form: { name: 'Nombre', company: 'Empresa', phone: 'Teléfono', email: 'Email', fair: 'Feria', location: 'Ciudad - Pais', meters: 'Metros cuadrados', floor: 'Detalles sobre el suelo', woodFloor: 'Tarima-madera', carpetPlatform: 'Tarima-moqueta', carpet: 'Moqueta', spaceDistribution: 'Distribución de espacios', reception: 'Zona de recepción', bar: 'Zona de bar', storage: 'Almacén', product: 'Exposición de producto', openMeeting: 'Zona de reuniones abierta', closedMeeting: 'Zona de reuniones cerrada', audiovisual: 'Audiovisuales', led: 'Pantalla LED', projector: 'Proyector', budget: 'Presupuesto estimado', description: 'Descripción', privacy: 'Acepta nuestra Política de Privacidad', send: 'Enviar' },
    legal: { privacy: 'Política de Privacidad', legalNotice: 'Aviso Legal', cookies: 'Uso de Cookies' },
    legalText: {
      privacy: '<p>Standarte utiliza los datos enviados a través del formulario únicamente para responder a solicitudes de información, presupuestos y comunicaciones relacionadas con proyectos de stands.</p><p>No usamos estos datos para finalidades ajenas a la solicitud. Puedes pedir acceso, rectificación o supresión escribiendo a info@standarte.es.</p>',
      legalNotice: '<p>Este sitio web pertenece a Standarte. Sus contenidos, imágenes y textos tienen carácter comercial e informativo y no pueden reproducirse sin autorización.</p><p>El uso del sitio implica una navegación responsable y respetuosa con la normativa aplicable.</p>',
      cookies: '<p>Utilizamos cookies necesarias para el funcionamiento de la web y, solo con tu consentimiento, cookies de medición y publicidad vinculadas a Google Ads o Google Analytics.</p><p>Puedes aceptar, rechazar o configurar estas finalidades desde el banner de cookies. También puedes cambiar o retirar tu consentimiento en cualquier momento desde el enlace "Configurar cookies" del pie de página.</p><p>Google puede tratar datos personales para medición publicitaria y personalización cuando lo autorizas. Más información: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Mensaje enviado correctamente.<br> En breve nos pondremos en contacto.<br> Gracias.',
    formError: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.',
    projects3D: {
      title: 'Proyectos de Bajo Coste',
      subtitle: 'Explora nuestras propuestas 3D y su relación con nuestros valores de diseño.',
      viewBtn: 'Ver Proyecto'
    },
    footer: 'Standarte. Diseño, fabricación y montaje de stands.'
  },
  en: {
    faqsTitle: 'Frequently Asked Questions', successStoriesTitle: 'Success Stories', featuredProjectsIntro: 'Featured custom carpentry and exhibition stand design projects:', 
    nav: { home: 'Home', services: 'Services', custom: 'Gallery', noticias: 'Blog', contact: 'Contact', language: 'Language' },
    seoTitle: 'Standarte | Exhibition stand design and build in Spain and Portugal · Audited Project',
    seoDescription: 'Standarte: the ideal partner for your on-site expansion strategy across Spain and Portugal, backed by our extensive event coverage.',
    heroTitle: 'Grow at trade fairs across Spain and Portugal',
    servicesTitle: 'Services',
    services: [
      ['Design and Engineering', 'Our professional team will take note of the needs of your project, which, in detail, will be reflected in a customized 3D prototype that you can explore and review before the start of manufacturing. The image of the prototype will be 100% faithful to the final result.'],
      ['Booth assembly', 'In the assembly process we apply the most modern assembly techniques with specific materials for use in ephemeral construction. This allows us to offer a flawless look that will demonstrate quality at first glance.'],
      ['Assembly and validations', 'We take care of everything. With complete peace of mind you can present yourself on the first day of the fair, and you will find everything ready to start your commercial work. Stand, catering, stationery,...']
    ],
    micro: {
      title: 'Light Pavilion',
      subtitle: 'Marquees for summer events in Spain and Portugal',
      color: 'Color',
      finish: 'Finish:',
      descriptionTitle: 'Description:',
      description: 'It is a small format stand composed of 4 bodies<br>Its assembly is very simple; no tools are needed.<br>Freely configurable attachable product.',
      qualitiesTitle: 'Qualities:',
      materials: 'Materials',
      materialsValue: 'MDF, glass, architectural textile, metal',
      finishValue: 'Airbrush paint + lacquer',
      partsTitle: 'Parts:',
      parts: '1 = Backlit Graphic <br>2 = Illuminated Shelves <br>3 = Custom Logo <br>4 = Storage <br>5 = Counter with doors',
      priceTitle: 'Price:',
      priceText: 'Set of 4 modules with lighting and <br> custom graphics',
      chooseFinish: 'Please choose the finish<br>to see the price.',
      choose: 'Please choose the finish<br>to see the price.',
      partsLabel: 'Parts',
      price: 'Price',
      qualities: 'Qualities',
      pause: 'PAUSE',
      play: 'PLAY',
      visitWeb: 'VISIT SPECIFIC WEBSITE',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Fairs in Historical Settings',
          subtitle: 'Respectful design and engineering in traditional and historical locations.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Corporate Presentations',
          subtitle: 'Custom gourmet spaces for wineries and special events.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Large-Format Outdoor Fairs',
          subtitle: 'Large-scale setups and premium high-resistance tents.'
        }
      ]
    },
    citiesIntro: 'Exhibition stand design, construction and assembly in key cities of Spain and Portugal',
    customTitle: 'Gallery',
    customSubtitle: 'Classified by main assembly technique.',
    filters: { all: 'All', textil: 'Textile', madera: 'Wood' },
    counters: { projects: 'Projects', clients: 'Customers', countries: 'Countries', fairs: 'Fairs' },
    teamTitle: 'Team',
    teamSubtitle: 'We are a multidisciplinary team, including architects, assemblers, decorators, lighting technicians,... Together we can provide a complete response to all the needs of each project. Do not hesitate to call us for any questions you have. We hope to meet you soon.',
    teamRoles: ['Creativity', 'Administrator', 'Workshop', 'Coordination'],
    contactTitle: 'Quote in 24h',
    contactNotice: 'Tell us what you need and within 24 hours we will have a 3D design full of details and a super-competitive economic proposal.',
    form: { name: 'Name', company: 'Company', phone: 'Tlf', email: 'Email', fair: 'Fair', location: 'City - Country', meters: 'Square meter', floor: 'ground details', woodFloor: 'Wozoden raised floor', carpetPlatform: 'Raised carpet floor', carpet: 'Carpet', spaceDistribution: 'Spaces-Distribution', reception: 'Reception area', bar: 'Bar area', storage: 'Warehouse', product: 'Product exposition', openMeeting: 'Open meeting area', closedMeeting: 'Closed meeting area', audiovisual: 'Audiovisual', led: 'Led screen', projector: 'Projector', budget: 'Estimated budget', description: 'Description', privacy: 'Accept our Privacy Policy', send: 'Send' },
    legal: { privacy: 'Privacy Policy', legalNotice: 'Legal warning', cookies: 'Cookies' },
    legalText: {
      privacy: '<p>Standarte uses the data submitted through the form only to answer information requests, quotations and communications related to exhibition stand projects.</p><p>We do not use this data for purposes unrelated to your request. You can ask for access, correction or deletion by writing to info@standarte.es.</p>',
      legalNotice: '<p>This website belongs to Standarte. Its contents, images and texts are commercial and informational and may not be reproduced without permission.</p><p>Use of the site implies responsible browsing in accordance with applicable regulations.</p>',
      cookies: '<p>We use necessary cookies for the website to work and, only with your consent, Google Ads or Google Analytics measurement and advertising cookies.</p><p>You can accept, reject or configure these purposes from the cookie banner. You can also change or withdraw consent at any time from the "Cookie settings" link in the footer.</p><p>Google may process personal data for ad measurement and personalization when you allow it. More information: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Message sent successfully.<br> We will contact you shortly.<br> Thank you.',
    formError: 'The message could not be sent. Please try again.',
    projects3D: {
      title: 'Low Cost Projects',
      subtitle: 'Explore our interactive high-carpentry proposals and their relation to our design values.',
      viewBtn: 'View Project'
    },
    footer: 'Standarte. Exhibition stand design, production and installation.'
  },
  de: {
    faqsTitle: 'Häufig gestellte Fragen', successStoriesTitle: 'Erfolgsgeschichten', featuredProjectsIntro: 'Ausgewählte Projekte für maßgeschneiderte Tischlerei und Messestanddesign:', 
    nav: { home: 'Startseite', services: 'Dienstleistungen', custom: 'Galerie', noticias: 'Blog', contact: 'Kontakt', language: 'Sprache' },
    seoTitle: 'Standarte | Messestand-Design und Montage in Spanien und Portugal',
    seoDescription: 'Standarte: der ideale Partner für Ihre Expansionsstrategie vor Ort in Spanien und Portugal, dank unserer breiten Messe-Abdeckung.',
    heroTitle: 'Wachsen Sie auf Messen in Spanien und Portugal',
    servicesTitle: 'Dienstleistungen',
    services: [
      ['Design und Ingenieurwesen', 'Unser Team wird die Bedürfnisse Ihres Projekts im Detail notieren, die sich in einem 3D-Prototypen widerspiegeln werden, den Sie vor Beginn der Fertigung erkunden und überprüfen können. Das Bild des Prototyps wird zu 100% dem endgültigen Ergebnis entsprechen.'],
      ['Messestand-Montage', 'Im Montageprozess wenden wir die modernsten Montagetechniken mit speziellen Materialien für den Einsatz im ephemeren Bau an. Dies ermöglicht uns, ein makelloses Aussehen zu bieten, das Qualität auf den ersten Blick zeigt.'],
      ['Montage und Validierungen', 'Wir kümmern uns um alles. Mit vollkommener Ruhe können Sie sich am ersten Tag der Messe präsentieren, und Sie finden alles bereit, um Ihre geschäftliche Arbeit zu beginnen. Stand, Catering, Büromaterial,... unabhängig davon, ob es eine Messe in Madrid, Frankfurt, Peking oder Chicago ist.']
    ],
    micro: {
      title: 'Lichtpavillon',
      subtitle: 'Zelte für Sommerveranstaltungen in Spanien und Portugal',
      color: 'Farbe',
      finish: 'Ausführung:',
      descriptionTitle: 'Beschreibung:',
      description: 'Kleiner Messestand aus 4 Modulen<br>Die Montage ist sehr einfach; es sind keine Werkzeuge erforderlich.<br>Frei konfigurierbares, erweiterbares Produkt.',
      qualitiesTitle: 'Qualitäten:',
      materials: 'Materialien',
      materialsValue: 'MDF, Glas, Architekturtextil, Metall',
      finishValue: 'Airbrush-Lackierung + Lack',
      partsTitle: 'Teile:',
      parts: '1 = Hinterleuchtete Grafik <br>2 = Beleuchtete Regale <br>3 = Individuelles Logo <br>4 = Stauraum <br>5 = Theke mit Türen',
      priceTitle: 'Preis:',
      priceText: 'Set aus 4 Modulen mit Beleuchtung und <br> individueller Grafik',
      chooseFinish: 'Bitte wählen Sie die Ausführung,<br>um den Preis zu sehen.',
      choose: 'Bitte wählen Sie die Ausführung,<br>um den Preis zu sehen.',
      partsLabel: 'Teile',
      price: 'Preis',
      qualities: 'Qualitäten',
      pause: 'PAUSE',
      play: 'ABSPIELEN',
      visitWeb: 'SPEZIFISCHE WEBSITE BESUCHEN',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Messen in historischer Umgebung',
          subtitle: 'Respektvolles Design und Engineering an traditionellen und historischen Standorten.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Unternehmenspräsentationen',
          subtitle: 'Maßgeschneiderte Gourmet-Bereiche für Weingüter und besondere Anlässe.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Großformatige Freiluftmessen',
          subtitle: 'Großflächige Montagen und erstklassige, hochresistente Zelte.'
        }
      ]
    },
    citiesIntro: 'Design, Bau und Montage von Messeständen in Schlüsselstädten Spaniens und Portugals',
    customTitle: 'Galerie',
    customSubtitle: 'Nach Haupt-Montagetechnik geordnet.',
    filters: { all: 'Alle', textil: 'Textil', madera: 'Holz' },
    counters: { projects: 'Projekte', clients: 'Kunden', countries: 'Länder', fairs: 'Messen' },
    teamTitle: 'Team',
    teamSubtitle: 'Wir sind ein multidisziplinäres Team, zu dem Architekten, Montagearbeiter, Dekorateure, Beleuchtungstechniker gehören... Gemeinsam können wir auf alle Bedürfnisse jedes Projekts umfassend antworten. Zögern Sie nicht, uns bei Fragen anzurufen. Wir hoffen, Sie bald kennenzulernen.',
    teamRoles: ['Kreativität', 'Administrator', 'Werkstatt', 'Koordination'],
    contactTitle: 'Angebot in 24h',
    contactNotice: 'Teilen Sie uns mit, was Sie benötigen, und wir erstellen Ihnen innerhalb von 24 Stunden einen detailreichen 3D-Entwurf und ein äußerst wettbewerbsfähiges wirtschaftliches Angebot.',
    form: { name: 'Name', company: 'Unternehmen', phone: 'Tel.', email: 'Email', fair: 'Messe', location: 'Stadt - Land', meters: 'Quadratmeter', floor: 'Boden Details', woodFloor: 'Holzboden', carpetPlatform: 'Teppichboden', carpet: 'Teppich', spaceDistribution: 'Raumaufteilung', reception: 'Empfangsbereich', bar: 'Barbereich', storage: 'Lager', product: 'Produktausstellung', openMeeting: 'Offener Besprechungsbereich', closedMeeting: 'Geschlossener Besprechungsbereich', audiovisual: 'Audiovisuell', led: 'LED-Bildschirm', projector: 'Projektor', budget: 'Geschätztes Budget', description: 'Beschreibung', privacy: 'Akzeptieren Sie unsere Datenschutzbestimmungen', send: 'Send' },
    legal: { privacy: 'Datenschutzbestimmungen', legalNotice: 'Impressum', cookies: 'Cookie-Richtlinien' },
    legalText: {
      privacy: '<p>Standarte verwendet die über das Formular gesendeten Daten ausschließlich zur Beantwortung von Informationsanfragen, Angeboten und Mitteilungen im Zusammenhang mit Messestand-Projekten.</p><p>Diese Daten werden nicht für andere Zwecke genutzt. Sie können Auskunft, Berichtigung oder Löschung unter info@standarte.es anfordern.</p>',
      legalNotice: '<p>Diese Website gehört Standarte. Inhalte, Bilder und Texte dienen kommerziellen und informativen Zwecken und dürfen ohne Genehmigung nicht vervielfältigt werden.</p><p>Die Nutzung der Website setzt verantwortungsvolles Surfen im Rahmen der geltenden Vorschriften voraus.</p>',
      cookies: '<p>Wir verwenden notwendige Cookies für den Betrieb der Website und, nur mit Ihrer Zustimmung, Mess- und Werbe-Cookies von Google Ads oder Google Analytics.</p><p>Sie können diese Zwecke im Cookie-Banner akzeptieren, ablehnen oder konfigurieren. Ihre Zustimmung können Sie jederzeit über den Link "Configurar cookies" in der Fußzeile ändern oder widerrufen.</p><p>Google kann personenbezogene Daten für Werbemessung und Personalisierung verarbeiten, wenn Sie zustimmen. Weitere Informationen: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Nachricht erfolgreich gesendet.<br> Wir werden uns in Kürze mit Ihnen in Verbindung setzen.<br> Vielen Dank.',
    formError: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    projects3D: {
      title: 'Kostengünstige Projekte',
      subtitle: 'Entdecken Sie unsere interaktiven Vorschläge für hochwertige Zimmerei und deren Beziehung zu unseren Designwerten.',
      viewBtn: 'Projekt Anzeigen'
    },
    footer: 'Standarte. Design, Produktion und Montage von Messeständen.'
  },
  zh: {
    faqsTitle: '常见问题', successStoriesTitle: '成功案例', featuredProjectsIntro: '特色定制木工和展台设计项目：', 
    nav: { home: '首页', services: '服务', custom: '展台图库', noticias: '博客', contact: '联系', language: '语言' },
    seoTitle: 'Standarte | 西班牙和葡萄牙展台设计与搭建',
    seoDescription: 'Standarte：凭借广泛的展会覆盖，是您在西班牙和葡萄牙实现线下扩张战略的理想合作伙伴。',
    heroTitle: '在西班牙和葡萄牙的展会上实现增长',
    servicesTitle: '服务',
    services: [['设计与工程', '我们的团队将记录您项目的需求，这些需求将以细节的方式体现在一个3D原型中，您可以在制造开始之前进行探索和审查。原型的图像将百分之百忠实于最终结果。'], ['展台搭建', '在搭建过程中，我们采用最先进的组装技术和特定用于短暂建筑的材料。这使我们能够提供一个无瑕的外观，从而在第一眼就能展示出质量。'], ['安装和验证', '我们包揽一切。您可以在展会的第一天轻松自如地亮相，而且一切都已准备就绪，可以开始您的商业工作。无论是在马德里、法兰克福、北京还是芝加哥的展会，我们都能提供展台、餐饮、文具等服务。']],
    micro: {
      title: '光之展亭',
      subtitle: '西班牙和葡萄牙夏季活动篷房',
      color: '颜色',
      finish: '饰面:',
      descriptionTitle: '说明:',
      description: '小型展台，由 4 个模块组成<br>安装非常简单，无需工具。<br>可自由配置和组合。',
      qualitiesTitle: '品质:',
      materials: '材料',
      materialsValue: 'MDF、玻璃、建筑织物、金属',
      finishValue: '喷绘涂装 + 清漆',
      partsTitle: '部件:',
      parts: '1 = 背光图文 <br>2 = 发光层板 <br>3 = 定制标志 <br>4 = 储物空间 <br>5 = 带门柜台',
      priceTitle: '价格:',
      priceText: '4 个带照明模块和 <br> 定制图文的组合',
      chooseFinish: '请选择饰面<br>查看价格。',
      choose: '请选择饰面<br>查看价格。',
      partsLabel: '部件',
      price: '价格',
      qualities: '品质',
      pause: '暂停',
      play: '播放',
      visitWeb: '访问专属网站',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: '历史环境中的展会',
          subtitle: '在传统和历史区域中进行备受尊重的设计与工程。'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: '企业展示',
          subtitle: '为酒庄和特殊活动量身定制的美食空间。'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: '大型户外展会',
          subtitle: '大规模搭建和高强度优质帐篷。'
        }
      ]
    },
    citiesIntro: '西班牙与葡萄牙重点城市的展台设计、搭建与安装',
    customTitle: '展台图库',
    customSubtitle: '按主要搭建技术分类。',
    filters: { all: '全部', textil: '纺织品', madera: '木材' },
    counters: { projects: '项目', clients: '客户', countries: '国家', fairs: '展会' },
    teamTitle: '团队',
    teamSubtitle: '我们是一个多学科团队，包括建筑师、装配工、装饰师、照明技术员等。我们共同可以对每个项目的所有需求作出完整的回应。如果您有任何问题，请随时致电给我们。我们希望能尽快见到您。',
    teamRoles: ['创意', '行政主管', '车间', '协调'],
    contactTitle: '24小时内报价',
    contactNotice: '告诉我们您的需求，我们将在24小时内为您提供详尽的3D设计和极具竞争力的经济报价。',
    form: { name: '姓名', company: '公司', phone: '电话', email: 'Email', fair: '展会', location: '城市 - 国家', meters: '平方米', floor: '地面细节', woodFloor: '木地板', carpetPlatform: '升起的地毯地板', carpet: '地毯', spaceDistribution: '空间分布', reception: '接待区', bar: '酒吧区', storage: '仓库', product: '产品展示', openMeeting: '开放会议区', closedMeeting: '封闭会议区', audiovisual: '视听', led: 'LED屏幕', projector: '投影仪', budget: '预算估算', description: '描述', privacy: '接受我们的隐私政策', send: '发送' },
    legal: { privacy: '隐私政策', legalNotice: '法律声明', cookies: 'Cookie政策' },
    legalText: {
      privacy: '<p>Standarte 仅使用通过表单提交的数据来回复信息请求、报价请求以及与展台项目相关的沟通。</p><p>我们不会将这些数据用于与请求无关的目的。您可以发送邮件至 info@standarte.es 申请访问、更正或删除。</p>',
      legalNotice: '<p>本网站属于 Standarte。网站内容、图片和文字用于商业与信息展示，未经授权不得复制。</p><p>使用本网站即表示您同意按照适用规定进行负责任的浏览。</p>',
      cookies: '<p>我们使用网站运行所必需的 Cookie，并且仅在您同意时使用 Google Ads 或 Google Analytics 的衡量和广告 Cookie。</p><p>您可以在 Cookie 横幅中接受、拒绝或配置这些用途，也可以随时通过页脚的“Configurar cookies”链接更改或撤回同意。</p><p>在您同意时，Google 可能会为广告衡量和个性化处理个人数据。更多信息：https://business.safety.google/privacy/</p>'
    },
    formSuccess: '消息已成功发送。<br> 我们将尽快与您联系。<br> 谢谢。',
    formError: '消息无法发送。请重试。',
    projects3D: {
      title: '低成本项目',
      subtitle: '探索我们的交互式高端木工方案及其与我们设计价值观的关系。',
      viewBtn: '查看项目'
    },
    footer: 'Standarte. 展台设计、制作与搭建。'
  },
  hi: {
    faqsTitle: 'अक्सर पूछे जाने वाले प्रश्न', successStoriesTitle: 'सफलता की कहानियाँ', featuredProjectsIntro: 'विशेष कस्टम बढ़ईगीरी और प्रदर्शनी स्टैंड डिजाइन परियोजनाएं:', 
    nav: { home: 'होम', services: 'सेवाएँ', custom: 'गैलरी', noticias: 'ब्लॉग', contact: 'संपर्क', language: 'भाषा' },
    seoTitle: 'Standarte | स्पेन और पुर्तगाल में स्टैंड डिज़ाइन और असेंबली',
    seoDescription: 'Standarte: स्पेन और पुर्तगाल में आपकी उपस्थिति विस्तार रणनीति के लिए आदर्श भागीदार, हमारी व्यापक इवेंट कवरेज की बदौलत।',
    heroTitle: 'स्पेन और पुर्तगाल की प्रदर्शनियों में आगे बढ़ें',
    servicesTitle: 'सेवाएँ',
    services: [['डिज़ाइन और इंजीनियरिंग', 'हमारी टीम आपके परियोजना की आवश्यकताओं का नोट लेगी, जिसे से संपूर्ण विस्तार से एक 3D प्रोटोटाइप में प्रतिबिंबित किया जाएगा, जिसे आप असेंबली की शुरुआत से पहले जांच सकते हैं और समीक्षा कर सकते हैं। प्रोटोटाइप की छवि अंतिम परिणाम के लिए 100% विश्वसनीय होगी।'], ['बूथ असेंबली', 'असेंबली प्रक्रिया में हम अल्पकालिक निर्माण में उपयोग के लिए विशिष्ट सामग्रियों के साथ सबसे आधुनिक असेंबली तकनीकों को लागू करते हैं। यह हमें एक त्रुटिहीन उपस्थिति प्रदान करने की अनुमति देता है जो पहली नज़र में गुणवत्ता प्रदर्शित करेगी।'], ['समारोह और मान्यताएँ', 'हम हर चीज़ का ख्याल रखते हैं. मन की पूर्ण शांति के साथ आप मेले के पहले दिन आ सकते हैं, और आपको अपना व्यावसायिक कार्य शुरू करने के लिए सब कुछ तैयार मिलेगा। स्टैंड, खानपान, स्टेशनरी,... चाहे यह मैड्रिड, फ्रैंकफर्ट, बीजिंग या शिकागो में मेला हो।']],
    micro: {
      title: 'प्रकाश मंडप',
      subtitle: 'स्पेन और पुर्तगाल में ग्रीष्मकालीन आयोजनों के लिए तंबू',
      color: 'रंग',
      finish: 'फिनिश:',
      descriptionTitle: 'विवरण:',
      description: 'यह 4 भागों से बना छोटा स्टैंड है<br>इसकी असेंबली बहुत आसान है; किसी उपकरण की जरूरत नहीं।<br>स्वतंत्र रूप से कॉन्फ़िगर होने वाला उत्पाद।',
      qualitiesTitle: 'गुणवत्ता:',
      materials: 'सामग्री',
      materialsValue: 'MDF, ग्लास, आर्किटेक्चरल टेक्सटाइल, मेटल',
      finishValue: 'एयरब्रश पेंट + लैकर',
      partsTitle: 'भाग:',
      parts: '1 = बैकलिट ग्राफिक <br>2 = रोशन शेल्फ <br>3 = कस्टम लोगो <br>4 = स्टोरेज <br>5 = दरवाजों वाला काउंटर',
      priceTitle: 'कीमत:',
      priceText: 'लाइटिंग और कस्टम ग्राफिक्स के साथ <br> 4 मॉड्यूल का सेट',
      chooseFinish: 'कीमत देखने के लिए<br>फिनिश चुनें।',
      choose: 'कीमत देखने के लिए<br>फिनिश चुनें।',
      partsLabel: 'भाग',
      price: 'कीमत',
      qualities: 'गुणवत्ता',
      pause: 'रोकें',
      play: 'चलाएं',
      visitWeb: 'विशिष्ट वेबसाइट पर जाएं',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'ऐतिहासिक परिवेश में मेले',
          subtitle: 'पारंपरिक and ऐतिहासिक स्थानों में सम्मानित डिजाइन और इंजीनियरिंग।'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'कॉर्पोरेट प्रस्तुतियाँ',
          subtitle: 'वाइनरी और विशेष आयोजनों के लिए कस्टम पेटू (गॉरमेट) स्थान।'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'बड़े प्रारूप के आउटडोर मेले',
          subtitle: 'बड़े पैमाने पर सेटअप और प्रीमियम उच्च-प्रतिरोध तंबू।'
        }
      ]
    },
    citiesIntro: 'स्पेन और पुर्तगाल के प्रमुख शहरों में स्टैंड का डिज़ाइन, निर्माण और असेंबली',
    customTitle: 'गैलरी',
    customSubtitle: 'मुख्य असेंबली तकनीक के अनुसार वर्गीकृत।',
    filters: { all: 'सभी', textil: 'वस्त्र', madera: 'लकड़ी' },
    counters: { projects: 'परियोजनाएँ', clients: 'ग्राहकों', countries: 'देश', fairs: 'मेले' },
    teamTitle: 'टीम',
    teamSubtitle: 'हम एक बहु-विषयी टीम हैं, जिसमें वास्तुकार, माउंटर, सजावटकार, प्रकाश तकनीशियन,... यह सुनिश्चित करने के लिए कि हर परियोजना की सभी आवश्यकताओं का पूरा उत्तरदाता हो सकता है। जिनका कोई सवाल हो, उन्हें हमें कॉल करने में संकोच न करें। हम जल्दी ही आपसे मिलने के लिए उम्मीद करते हैं।',
    teamRoles: ['रचनात्मकता', 'प्रशासक', 'कारख़ाना', 'समन्वय'],
    contactTitle: '24 घंटे में कोटेशन',
    contactNotice: 'हमें बताएं कि आपको क्या चाहिए और 24 घंटों के भीतर हमारे पास विवरणों से भरा 3D डिज़ाइन और एक सुपर-प्रतिस्पर्धी आर्थिक प्रस्ताव होगा।',
    form: { name: 'नाम', company: 'कंपनी', phone: 'फ़ोन', email: 'Email', fair: 'मेला', location: 'शहर - देश', meters: 'वर्ग मीटर', floor: 'भूमि का विवरण', woodFloor: 'लकड़ी वृद्धि तल', carpetPlatform: 'उठाई गई कालीन तल', carpet: 'कालीन', spaceDistribution: 'अंतर्वितरण', reception: 'स्वागत क्षेत्र', bar: 'बार क्षेत्र', storage: 'गोदाम', product: 'उत्पाद प्रदर्शन', openMeeting: 'खुली मुलाकात क्षेत्र', closedMeeting: 'बंद मुलाकात क्षेत्र', audiovisual: 'ऑडियोविजुअल्स', led: 'LED स्क्रीन', projector: 'प्रोजेक्टर', budget: 'अनुमानित बजट', description: 'विवरण', privacy: 'हमारी गोपनीयता नीति को स्वीकार करें', send: 'भेजना' },
    legal: { privacy: 'गोपनीयता नीति', legalNotice: 'कानूनी सूचना', cookies: 'कुकीज़ का उपयोग' },
    legalText: {
      privacy: '<p>Standarte फ़ॉर्म के माध्यम से भेजे गए डेटा का उपयोग केवल जानकारी, अनुमान और प्रदर्शनी स्टैंड परियोजनाओं से जुड़ी बातचीत का उत्तर देने के लिए करता है।</p><p>हम इस डेटा का उपयोग आपकी मांग से अलग उद्देश्यों के लिए नहीं करते। आप info@standarte.es पर लिखकर पहुंच, सुधार या हटाने का अनुरोध कर सकते हैं।</p>',
      legalNotice: '<p>यह वेबसाइट Standarte की है। इसकी सामग्री, चित्र और पाठ व्यावसायिक और सूचनात्मक उद्देश्य के लिए हैं और अनुमति के बिना पुन: उपयोग नहीं किए जा सकते।</p><p>इस साइट का उपयोग लागू नियमों के अनुसार जिम्मेदार ब्राउज़िंग को मानता है।</p>',
      cookies: '<p>हम वेबसाइट के संचालन के लिए आवश्यक कुकीज़ का उपयोग करते हैं और, केवल आपकी सहमति से, Google Ads या Google Analytics की मापन और विज्ञापन कुकीज़ का उपयोग करते हैं।</p><p>आप कुकी बैनर से इन उद्देश्यों को स्वीकार, अस्वीकार या कॉन्फ़िगर कर सकते हैं। आप फुटर में "Configurar cookies" लिंक से कभी भी सहमति बदल या वापस ले सकते हैं।</p><p>आपकी अनुमति पर Google विज्ञापन मापन और वैयक्तिकरण के लिए व्यक्तिगत डेटा संसाधित कर सकता है। अधिक जानकारी: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'संदेश सफलतापूर्वक भेजा गया।<br> हम जल्द ही आपसे संपर्क करेंगे।<br> धन्यवाद।',
    formError: 'संदेश भेजा नहीं जा सका। कृपया फिर से प्रयास करें।',
    projects3D: {
      title: 'कम लागत वाली परियोजनाएं',
      subtitle: 'हमारे इंटरैक्टिव उच्च-बढ़ईगीरी प्रस्तावों और हमारे डिज़ाइन मूल्यों के साथ उनके संबंधों का पता लगाएं।',
      viewBtn: 'परियोजना देखें'
    },
    footer: 'Standarte. प्रदर्शनी स्टैंड डिजाइन, असेंबली और इंस्टॉलेशन।'
  },
  pt: {
    faqsTitle: 'Perguntas Frequentes', successStoriesTitle: 'Casos de Sucesso', featuredProjectsIntro: 'Projetos destacados de marcenaria à medida e design de stands:', 
    nav: { home: 'Início', services: 'Serviços', custom: 'Galeria', noticias: 'Blog', contact: 'Contacto', language: 'Idioma' },
    seoTitle: 'Standarte | Design e montagem de stands em Espanha e Portugal · Projeto Auditado',
    seoDescription: 'A Standarte: a empresa ideal para a sua estratégia de expansão presencial em Espanha e Portugal, graças à nossa ampla cobertura de eventos.',
    heroTitle: 'Cresça nas feiras de Espanha e Portugal',
    servicesTitle: 'Serviços',
    services: [
      ['Projeto e Engenharia', 'Nossa equipe tomará nota das necessidades do seu projeto, que, detalhadamente, serão refletidas em um protótipo 3D que você poderá explorar e revisar antes do início da fabricação. A imagem do protótipo será 100% fiel ao resultado final.'],
      ['Montagem', 'No processo de montagem aplicamos as mais modernas técnicas de montagem com materiais específicos para utilização na construção efémera. Isso nos permite oferecer uma aparência impecável que demonstrará qualidade à primeira vista.'],
      ['Montagem e validações', 'Nós tomamos conta de tudo. Com total tranquilidade você pode se apresentar no primeiro dia da feira, e encontrará tudo pronto para iniciar seu trabalho comercial. Stand, catering, papelaria,... independentemente de ser uma feira em Madrid, Frankfurt, Pequim ou Chicago.']
    ],
    micro: {
      title: 'Pavilhão de luz',
      subtitle: 'Tendas para eventos de verão em Espanha e Portugal',
      color: 'Cor',
      finish: 'Acabamento:',
      descriptionTitle: 'Descrição:',
      description: 'Stand de pequeno formato composto por 4 módulos<br>A montagem é muito simples; não precisa de ferramentas.<br>Produto acoplável livremente configurável.',
      qualitiesTitle: 'Qualidades:',
      materials: 'Materiais',
      materialsValue: 'MDF, vidro, têxtil arquitetónico, metal',
      finishValue: 'Pintura aerográfica + lacado',
      partsTitle: 'Peças:',
      parts: '1 = Gráfica retroiluminada <br>2 = Prateleiras iluminadas <br>3 = Logótipo personalizado <br>4 = Armazenamento <br>5 = Balcão com portas',
      priceTitle: 'Preço:',
      priceText: 'Conjunto de 4 módulos com iluminação e <br> gráfica personalizada',
      chooseFinish: 'Escolha o acabamento<br>para ver o preço.',
      choose: 'Escolha o acabamento<br>para ver o preço.',
      partsLabel: 'Peças',
      price: 'Preço',
      qualities: 'Qualidades',
      pause: 'PAUSA',
      play: 'REPRODUZIR',
      visitWeb: 'VISITAR WEB ESPECÍFICA',
      videos: [
        {
          src: '/img/video_standarte_presentacion_vinos.mp4',
          title: 'Feiras em Ambientes Históricos',
          subtitle: 'Design e engenharia respeitosos em locais tradicionais e históricos.'
        },
        {
          src: '/img/video_standarte_andalucia.mp4',
          title: 'Apresentações Corporativas',
          subtitle: 'Espaços gourmet sob medida para vinícolas e eventos especiais.'
        },
        {
          src: '/img/video_standarte_feria_verano.mp4',
          title: 'Feiras ao Ar Livre de Grande Formato',
          subtitle: 'Montagens em grande escala e tendas premium de alta resistência.'
        }
      ]
    },
    citiesIntro: 'Design, construção e montagem de stands em cidades-chave de Espanha e Portugal',
    customTitle: 'Galeria',
    customSubtitle: 'Classificados pela técnica principal de montagem.',
    filters: { all: 'Tudo', textil: 'Têxtil', madera: 'Madeira' },
    counters: { projects: 'Projetos', clients: 'Clientes', countries: 'Países', fairs: 'Feiras' },
    teamTitle: 'Equipa',
    teamSubtitle: 'Somos uma equipa multidisciplinar, incluindo arquitectos, montadores, decoradores, técnicos de iluminação,... Juntos podemos dar uma resposta completa a todas as necessidades de cada projecto. Não hesite em nos chamar para qualquer dúvida que tenha. Esperamos conhecê-lo em breve.',
    teamRoles: ['Criatividade', 'Administrador', 'Oficina', 'Coordenação'],
    contactTitle: 'Orçamento em 24h',
    contactNotice: 'Diga-nos o que precisa e, no prazo de 24 horas, teremos um design 3D detalhado e uma proposta económica super-competitiva.',
    form: { name: 'Nome', company: 'O negócio', phone: 'Telefone', email: 'Email', fair: 'Feira', location: 'Cidade - Pais', meters: 'Metros quadrados', floor: 'Detalhes do terreno', woodFloor: 'Plataforma-madeira', carpetPlatform: 'Tapete-plataforma', carpet: 'Tapete', spaceDistribution: 'Distribuição de espaços', reception: 'Área de recepção', bar: 'Área do bar', storage: 'Armazém', product: 'Exposição de produtos', openMeeting: 'Área de reunião aberta', closedMeeting: 'Área de reunião fechada', audiovisual: 'Audiovisual', led: 'Tela de led', projector: 'Projetor', budget: 'Orçamento estimado', description: 'Descrição', privacy: 'Aceite a nossa Política de Privacidade', send: 'Mandar' },
    legal: { privacy: 'Política de privacidade', legalNotice: 'Aviso Legal', cookies: 'Cookies' },
    legalText: {
      privacy: '<p>A Standarte utiliza os dados enviados através do formulário apenas para responder a pedidos de informação, orçamentos e comunicações relacionadas com projetos de stands.</p><p>Não utilizamos estes dados para finalidades alheias ao pedido. Pode solicitar acesso, correção ou eliminação escrevendo para info@standarte.es.</p>',
      legalNotice: '<p>Este site pertence à Standarte. Os seus conteúdos, imagens e textos têm caráter comercial e informativo e não podem ser reproduzidos sem autorização.</p><p>A utilização do site implica uma navegação responsável e respeitosa com a legislação aplicável.</p>',
      cookies: '<p>Utilizamos cookies necessárias para o funcionamento do site e, apenas com o seu consentimento, cookies de medição e publicidade associadas ao Google Ads ou Google Analytics.</p><p>Pode aceitar, rejeitar ou configurar estas finalidades no banner de cookies. Também pode alterar ou retirar o consentimento a qualquer momento no link "Configurar cookies" do rodapé.</p><p>A Google pode tratar dados pessoais para medição publicitária e personalização quando autorizar. Mais informação: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Mensagem enviada corretamente.<br> Entraremos em contacto em breve.<br> Obrigado.',
    formError: 'Não foi possível enviar a mensagem. Por favor, tente novamente.',
    pause: 'PAUSA',
    play: 'REPRODUZIR',
    visitWeb: 'VISITAR WEB ESPECÍFICA',
    projects3D: {
      title: 'Projetos de Baixo Custo',
      subtitle: 'Explore as nossas propostas interativas de alta carpintaria e a sua relação com os nossos valores de design.',
      viewBtn: 'Ver Projeto'
    },
    footer: 'Standarte. Design, produção e montagem de stands.'
  },
  fr: {
    faqsTitle: 'Foire Aux Questions', successStoriesTitle: 'Histoires de Réussite', featuredProjectsIntro: 'Projets phares de menuiserie sur mesure et de conception de stands:', 
    nav: { home: 'Accueil', services: 'Services', custom: 'Galerie', noticias: 'Blog', contact: 'Contact', language: 'Langue' },
    seoTitle: 'Standarte | Monteur de stands en Espagne et Portugal',
    seoDescription: 'Standarte : le partenaire idéal pour votre stratégie d\'expansion physique en Espagne et au Portugal, grâce à notre large couverture d\'événements.',
    heroTitle: 'Développez-vous sur les salons d\'Espagne et du Portugal',
    servicesTitle: 'Services',
    services: [
      ['Conception et Ingénierie', 'Notre équipe professionnelle prendra note des besoins de votre projet, qui seront reflétés en détail dans un prototype 3D personnalisé que vous pourrez explorer et réviser avant le début de la fabrication. L\'image du prototype sera 100% fidèle au résultat final.'],
      ['Fabrication et montage', 'Dans le processus de montage, nous appliquons les techniques d\'assemblage les plus modernes avec des matériaux spécifiques pour l\'architecture éphémère. Cela nous permet d\'offrir un aspect impeccable qui démontrera notre qualité au premier coup d\'œil.'],
      ['Montage et validations', 'Nous nous occupons de tout. En toute tranquillité, vous pourrez vous présenter le premier jour du salon, et vous trouverez tout prêt pour commencer votre travail commercial. Stand, restauration, papeterie,... peu importe s\'il s\'agit d\'un salon à Madrid, Francfort, Pékin ou Chicago.']
    ],
    micro: {
      title: 'Pavillon de lumière',
      subtitle: 'Chapiteaux pour événements estivaux en Espagne et au Portugal',
      color: 'Couleur',
      finish: 'Finition:',
      descriptionTitle: 'Description:',
      description: 'Stand petit format composé de 4 corps<br>Son montage est très simple ; aucun outil n\'est nécessaire.<br>Produit modulaire librement configurable.',
      qualitiesTitle: 'Qualités:',
      materials: 'Matériaux',
      materialsValue: 'MDF, verre, textile architectural, métal',
      finishValue: 'Peinture aérographique + laque',
      partsTitle: 'Parties:',
      parts: '1 = Graphique rétroéclairé <br>2 = Étagères éclairées <br>3 = Logo personnalisé <br>4 = Stockage <br>5 = Comptoir avec portes',
      priceTitle: 'Prix:',
      priceText: 'Ensemble de 4 modules avec éclairage et <br> graphiques personnalisés',
      chooseFinish: 'Choisissez la finition<br>pour voir le prix.',
      choose: 'Choisissez la finition pour voir le prix',
      partsLabel: 'Parties',
      price: 'Prix',
      qualities: 'Qualités',
      pause: 'PAUSE',
      play: 'JOUER',
      visitWeb: 'VISITER LE SITE WEB SPÉCIFIQUE',
      videos: [
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Salons dans des lieux historiques', subtitle: 'Conception respectueuse dans des lieux traditionnels et historiques.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Présentations d\x27entreprise', subtitle: 'Espaces gastronomiques sur mesure pour les vignobles et événements spéciaux.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Salons en plein air grand format', subtitle: 'Montages à grande échelle et tentes premium haute résistance.' }
      ]
    },
    citiesIntro: 'Conception, construction et montage de stands dans les villes clés d\'Espagne et du Portugal',
    customTitle: 'Galerie',
    customSubtitle: 'Classés par technique de montage principale.',
    filters: { all: 'Tous', textil: 'Textile', madera: 'Bois' },
    counters: { projects: 'Projets', clients: 'Clients', countries: 'Pays', fairs: 'Salons' },
    teamTitle: 'Équipe',
    teamSubtitle: 'Nous sommes une équipe multidisciplinaire comprenant des architectes, des monteurs, des décorateurs, des éclairagistes... Ensemble, nous pouvons apporter une réponse completa à tous les besoins de chaque projet. N\'hésitez pas à nous appeler pour toute question. Nous espérons vous rencontrer bientôt.',
    teamRoles: ['Créativité', 'Administrateur', 'Atelier', 'Coordination'],
    contactTitle: 'Devis en 24h',
    contactNotice: 'Dites-nous ce dont vous avez besoin et nous aurons une conception 3D riche en détails et une proposition commerciale super compétitive sous 24 heures.',
    form: { name: 'Nom', company: 'Entreprise', phone: 'Téléphone', email: 'Email', fair: 'Salon', location: 'Ville - Pays', meters: 'Mètres carrés', floor: 'Détails du sol', woodFloor: 'Plancher en bois', carpetPlatform: 'Plancher avec moquette', carpet: 'Moquette', spaceDistribution: 'Répartition des espaces', reception: 'Zone de réception', bar: 'Zone de bar', storage: 'Stockage', product: 'Exposition de produits', openMeeting: 'Zone de réunion ouverte', closedMeeting: 'Zone de réunion fermée', audiovisual: 'Audiovisuel', led: 'Écran LED', projector: 'Projecteur', budget: 'Budget estimé', description: 'Description', privacy: 'Accepter notre politique de confidentialité', send: 'Envoyer' },
    legal: { privacy: 'Politique de confidentialité', legalNotice: 'Mentions légales', cookies: 'Utilisation des Cookies' },
    legalText: {
      privacy: '<p>Standarte utilise les données envoyées via ce formulaire uniquement pour répondre aux demandes d\'informations et devis.</p>',
      legalNotice: '<p>Ce site web appartient à Standarte. L\'utilisation implique une navigation responsable.</p>',
      cookies: '<p>Nous utilisons des cookies pour le fonctionnement du site.</p>'
    },
    formSuccess: 'Message envoyé avec succès.<br> Nous vous contacterons sous peu.<br> Merci.',
    formError: 'Impossible d\'envoyer le message. Veuillez réessayer.',
    projects3D: { title: 'Projets à bas coût', subtitle: 'Explorez nos propositions interactives de haute menuiserie.', viewBtn: 'Voir Projet' },
    footer: 'Standarte. Conception, fabrication et montage de stands.'
  },
  it: {
    faqsTitle: 'Domande Frequenti', successStoriesTitle: 'Storie di Successo', featuredProjectsIntro: 'Progetti in evidenza di falegnameria su misura e design di stand espositivi:', 
    nav: { home: 'Home', services: 'Servizi', custom: 'Galleria', noticias: 'Blog', contact: 'Contatto', language: 'Lingua' },
    seoTitle: 'Standarte | Allestimenti fieristici in Spagna e Portogallo',
    seoDescription: 'Standarte: il partner ideale per la tua strategia di espansione fisica in Spagna e Portogallo, grazie alla nostra ampia copertura di fiere.',
    heroTitle: 'Cresci nelle fiere di Spagna e Portogallo',
    servicesTitle: 'Servizi',
    services: [
      ['Progettazione e Ingegneria', 'Il nostro team professionale prenderà nota delle esigenze del tuo progetto, che saranno riflesse in dettaglio in un prototipo 3D personalizzato che potrai esplorare e rivedere prima dell\'inizio della produzione. L\'immagine del prototipo sarà fedele al 100% al risultato finale.'],
      ['Montaggio e Allestimento', 'Nel processo di allestimento applichiamo le più moderne tecniche di assemblaggio con materiali specifici per l\'uso in architettura effimera. Questo ci permette di offrire un aspetto impeccabile che dimostrerà la qualità al primo sguardo.'],
      ['Montaggio e validazioni', 'Ci occupiamo di tutto. Con totale tranquillità potrai presentarti il primo giorno di fiera e troverai tutto pronto per iniziare il tuo lavoro commerciale. Stand, catering, cancelleria,... indipendentemente se è una fiera a Madrid, Francoforte, Pechino o Chicago.']
    ],
    micro: {
      title: 'Padiglione di luce',
      subtitle: 'Gazebo per eventi estivi in Spagna e Portogallo',
      color: 'Colore',
      finish: 'Finitura:',
      descriptionTitle: 'Descrizione:',
      description: 'Stand di piccolo formato composto da 4 corpi<br>Il suo montaggio è molto semplice; non sono necessari attrezzi.<br>Prodotto modulare liberamente configurabile.',
      qualitiesTitle: 'Qualità:',
      materials: 'Materiali',
      materialsValue: 'MDF, vetro, tessuto architettonico, metallo',
      finishValue: 'Vernice aerografica + lacca',
      partsTitle: 'Parti:',
      parts: '1 = Grafica retroilluminata <br>2 = Scaffali illuminati <br>3 = Logo personalizzato <br>4 = Magazzino <br>5 = Bancone con porte',
      priceTitle: 'Prezzo:',
      priceText: 'Set di 4 moduli con illuminazione e <br> grafica personalizzata',
      chooseFinish: 'Scegli la finitura<br>per vedere il prezzo.',
      choose: 'Scegli la finitura per vedere il prezzo',
      partsLabel: 'Parti',
      price: 'Prezzo',
      qualities: 'Qualità',
      pause: 'PAUSA',
      play: 'RIPRODUCI',
      visitWeb: 'VISITA SITO SPECIFICO',
      videos: [
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Fiere in ambienti storici', subtitle: 'Design rispettoso in location tradizionali e storiche.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Presentazioni Aziendali', subtitle: 'Spazi gourmet su misura per cantine ed eventi speciali.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Fiere all\'aperto di grande formato', subtitle: 'Allestimenti su larga scala e tende premium ad alta resistenza.' }
      ]
    },
    citiesIntro: 'Progettazione, costruzione e montaggio di stand nelle città chiave di Spagna e Portogallo',
    customTitle: 'Galleria',
    customSubtitle: 'Classificati per tecnica di montaggio principale.',
    filters: { all: 'Tutti', Tessile: 'Tessile', Legno: 'Legno' },
    counters: { projects: 'Progetti', clients: 'Clienti', countries: 'Paesi', fairs: 'Fiere' },
    teamTitle: 'Squadra',
    teamSubtitle: 'Siamo un team multidisciplinare, che include architetti, montatori, decoratori, tecnici delle luci... Insieme possiamo fornire una risposta completa a tutte le esigenze di ogni progetto. Non esitare a chiamarci per qualsiasi domanda. Speriamo di conoscerti presto.',
    teamRoles: ['Creatività', 'Amministratore', 'Officina', 'Coordinamento'],
    contactTitle: 'Preventivo in 24h',
    contactNotice: 'Dicci di cosa hai bisogno ed entro 24 ore avremo un design 3D ricco di dettagli e una proposta economica super competitiva.',
    form: { name: 'Nome', company: 'Azienda', phone: 'Telefono', email: 'Email', fair: 'Fiera', location: 'Città - Paese', meters: 'Metri quadrati', floor: 'Dettagli pavimento', woodFloor: 'Pedana in legno', carpetPlatform: 'Pedana in moquette', carpet: 'Moquette', spaceDistribution: 'Distribuzione spazi', reception: 'Area reception', bar: 'Area bar', storage: 'Magazzino', product: 'Esposizione prodotti', openMeeting: 'Area riunioni aperta', closedMeeting: 'Area riunioni chiusa', audiovisual: 'Audiovisivi', led: 'Schermo LED', projector: 'Proiettore', budget: 'Budget stimato', description: 'Descrizione', privacy: 'Accetta la nostra Privacy Policy', send: 'Invia' },
    legal: { privacy: 'Privacy Policy', legalNotice: 'Note Legali', cookies: 'Uso dei Cookie' },
    legalText: {
      privacy: '<p>Standarte utilizza i dati inviati per rispondere alle richieste di informazioni e preventivi.</p>',
      legalNotice: '<p>Questo sito web appartiene a Standarte. L\'uso implica una navigazione responsabile.</p>',
      cookies: '<p>Utilizziamo i cookie per il funzionamento del web.</p>'
    },
    formSuccess: 'Messaggio inviato con successo.<br> Ti contatteremo a breve.<br> Grazie.',
    formError: 'Impossibile inviare il messaggio. Riprova.',
    projects3D: { title: 'Progetti a basso costo', subtitle: 'Esplora le nostre proposte interattive di alta falegnameria.', viewBtn: 'Vedi Progetto' },
    footer: 'Standarte. Progettazione, produzione e allestimento stand.'
  },
  ko: {
  "nav": {
    "home": "홈",
    "services": "서비스",
    "custom": "갤러리",
    "noticias": "블로그",
    "contact": "연락",
    "language": "언어"
  },
  "seoTitle": "Standarte | 마드리드, 바르셀로나, 빌바오, 말라가, 리스본의 전시 부스 디자인·설치 전문",
  "seoDescription": "Standarte는 폭넓은 전시회 커버리지를 바탕으로 스페인과 포르투갈 현지 확장 전략에 이상적인 파트너입니다.",
  "heroTitle": "스페인과 포르투갈 전시회에서 성장하세요",
  "servicesTitle": "서비스",
  "services": [
    [
      "디자인 및 엔지니어링",
      "저희 전문 팀은 귀하의 프로젝트 요구 사항을 기록할 것이며, 이는 자세히 맞춤형 3D 프로토타입에 반영되어 제조 시작 전에 탐색하고 검토할 수 있습니다. 프로토타입의 이미지는 최종 결과를 100% 충실하게 반영할 것입니다."
    ],
    [
      "부스 설치",
      "설치 과정에서 우리는 일시적인 건축에 사용되는 특정 재료와 함께 가장 현대적인 조립 기술을 적용합니다. 이를 통해 한눈에 품질을 보여줄 수 있는 완벽한 외관을 제공할 수 있습니다."
    ],
    [
      "조립 및 검증",
      "우리는 모든 것을 처리합니다. 완전한 마음의 평안 속에서 박람회 첫날에 자신을 드러낼 수 있으며, 상업 활동을 시작할 준비가 모두 갖추어져 있음을 발견하게 될 것입니다. 부스, 케이터링, 문구류,..."
    ]
  ],
  "micro": {
    "title": "빛의 파빌리온",
    "subtitle": "스페인과 포르투갈의 여름 행사용 텐트",
    "color": "색",
    "finish": "끝:",
    "descriptionTitle": "설명:",
    "description": "4개의 본체로 구성된 소형 스탠드입니다.<br>조립이 매우 간단하며 도구가 필요하지 않습니다.<br>자유롭게 구성할 수 있는 부착 가능한 제품입니다.",
    "qualitiesTitle": "특성:",
    "materials": "재료",
    "materialsValue": "MDF, 유리, 건축용 직물, 금속",
    "finishValue": "에어브러시 페인트 + 래커",
    "partsTitle": "부품:",
    "parts": "1 = 백라이트 그래픽 <br>2 = 조명 선반 <br>3 = 맞춤 로고 <br>4 = 저장 공간 <br>5 = 문이 있는 카운터",
    "priceTitle": "가격:",
    "priceText": "조명과 <br> 맞춤 그래픽이 있는 4개 모듈 세트",
    "chooseFinish": "가격을 보려면 마감을 선택하세요.",
    "choose": "마감 지점을 선택<br>해 가격을 확인해 주세요.",
    "partsLabel": "부품",
    "price": "가격",
    "qualities": "특성",
    "pause": "일시 정지",
    "play": "재생",
    "visitWeb": "특정 웹사이트 방문",
    "videos": [
      {
        "src": "/img/video_standarte_presentacion_vinos.mp4",
        "title": "역사적 배경의 박람회",
        "subtitle": "전통적이고 역사적인 장소에서의 존중하는 디자인과 엔지니어링."
      },
      {
        "src": "/img/video_standarte_andalucia.mp4",
        "title": "기업 프레젠테이션",
        "subtitle": "와이너리와 특별 행사를 위한 맞춤형 고급 공간."
      },
      {
        "src": "/img/video_standarte_feria_verano.mp4",
        "title": "대형 야외 박람회",
        "subtitle": "대형 설치와 프리미엄 고저항 텐트."
      }
    ]
  },
  "citiesIntro": "스페인과 포르투갈 주요 도시의 부스 디자인, 제작 및 설치",
  "customTitle": "갤러리",
  "customSubtitle": "주요 조립 기술별로 분류됩니다.",
  "filters": {
    "all": "모두",
    "textil": "섬유",
    "madera": "나무"
  },
  "counters": {
    "projects": "프로젝트",
    "clients": "고객",
    "countries": "나라들",
    "fairs": "박람회"
  },
  "teamTitle": "팀",
  "teamSubtitle": "우리는 건축가, 조립사, 장식가, 조명 기술자를 포함한 다학제 팀입니다. 함께 우리는 각 프로젝트의 모든 요구에 대해 완전한 대응을 제공할 수 있습니다. 궁금한 점이 있으면 주저하지 말고 저희에게 문의하십시오. 곧 뵙기를 바랍니다.",
  "teamRoles": [
    "데코레이터",
    "관리자",
    "워크숍",
    "조정"
  ],
  "contactTitle": "24시간 내 견적",
  "contactNotice": "필요한 사항을 알려주시면 24시간 이내에 세부 사항이 가득한 3D 디자인과 매우 경쟁력 있는 가격 제안을 준비해 드리겠습니다.",
  "form": {
    "name": "이름",
    "company": "회사",
    "phone": "전화",
    "email": "이메일",
    "fair": "공정한",
    "location": "도시 - 나라",
    "meters": "제곱미터",
    "floor": "지면 세부 사항",
    "woodFloor": "워조덴 올림 바닥",
    "carpetPlatform": "들뜬 카펫 바닥",
    "carpet": "카펫",
    "spaceDistribution": "공간 분포",
    "reception": "접수처",
    "bar": "바 구역",
    "storage": "창고",
    "product": "제품 전시",
    "openMeeting": "개방 회의 공간",
    "closedMeeting": "폐쇄된 회의 구역",
    "audiovisual": "시청각",
    "led": "LED 스크린",
    "projector": "프로젝터",
    "budget": "예상 예산",
    "description": "설명",
    "privacy": "개인정보처리방침에 동의합니다",
    "send": "보내기"
  },
  "legal": {
    "privacy": "개인정보 처리방침",
    "legalNotice": "법적 경고",
    "cookies": "쿠키"
  },
  "legalText": {
    "privacy": "<p>스탠다르테는 양식을 통해 제출된 데이터를 전시 부스 프로젝트와 관련된 정보 요청, 견적 및 커뮤니케이션에만 사용합니다.</p><p>이 데이터를 귀하의 요청과 관련 없는 목적으로 사용하지 않습니다. 접근, 수정 또는 삭제를 원하시는 경우 info@standarte.es로 문의하실 수 있습니다.</p>",
    "legalNotice": "<p>이 웹사이트는 Standarte에 속합니다. 이 사이트의 내용, 이미지 및 텍스트는 상업적 및 정보 제공 목적으로 사용되며, 허가 없이 복제할 수 없습니다.</p><p>사이트 사용은 관련 규정을 준수한 책임 있는 브라우징을 의미합니다.</p>",
    "cookies": "<p>웹사이트가 작동하도록 필요한 쿠키를 사용하며, 귀하의 동의가 있는 경우에만 Google Ads 또는 Google Analytics 측정 및 광고 쿠키를 사용합니다.</p><p>쿠키 배너에서 이러한 목적을 수락, 거부 또는 구성할 수 있습니다. 또한 하단의 \"쿠키 설정\" 링크에서 언제든지 동의를 변경하거나 철회할 수 있습니다.</p><p>귀하가 허용하면 Google은 광고 측정 및 개인화 목적으로 개인 데이터를 처리할 수 있습니다. 자세한 정보: https://business.safety.google/privacy/</p>"
  },
  "formSuccess": "메시지가 성공적으로 전송되었습니다.<br> 곧 연락드리겠습니다.<br> 감사합니다.",
  "formError": "메시지를 보낼 수 없습니다. 다시 시도해 주세요.",
  "projects3D": {
    "title": "저비용 프로젝트",
    "subtitle": "우리의 인터랙티브 고급 목공 제안과 그것이 우리의 디자인 가치와 어떻게 관련되는지 탐색해 보세요.",
    "viewBtn": "프로젝트 보기"
  },
  "footer": "Standarte. 전시 부스 디자인, 제작 및 설치."
},
  ja: {
    faqsTitle: 'よくあるご質問', successStoriesTitle: '導入事例', featuredProjectsIntro: 'オーダーメイドの木工と展示ブースデザインの注目プロジェクト：',
    nav: { home: 'ホーム', services: 'サービス', custom: 'ギャラリー', noticias: 'ブログ', contact: 'お問い合わせ', language: '言語' },
    seoTitle: '海外展示会ブースの設計・製作・組立 | スペイン・ポルトガル | Standarte',
    seoDescription: 'Standarteは、幅広い展示会カバレッジにより、スペイン・ポルトガルでの現地拡大戦略に最適なパートナーです。',
    heroTitle: 'スペイン・ポルトガルの展示会でビジネスを伸ばす',
    servicesTitle: 'サービス',
    services: [
      ['設計とエンジニアリング', '専門チームがお客様のプロジェクトのご要望を細部まで把握し、それをオーダーメイドの3Dプロトタイプに反映します。製作を開始する前にご確認・ご検討いただけます。プロトタイプの画像は完成品を100%忠実に再現します。'],
      ['ブース組立', '組立工程では、仮設建築に適した専用素材と最新の組立技術を用います。これにより、一目で品質が伝わる完璧な仕上がりをご提供します。'],
      ['設営と各種検査', 'すべて当社にお任せください。展示会初日に安心してお越しいただくだけで、ブース、ケータリング、印刷物など、商談を始める準備がすべて整っています。']
    ],
    micro: {
      title: '光のパビリオン',
      subtitle: 'スペインとポルトガルの夏のイベント用テント',
      color: 'カラー',
      finish: '仕上げ：',
      descriptionTitle: '説明：',
      description: '4つのボディで構成される小型スタンドです。<br>組立はとても簡単で、工具は必要ありません。<br>自由に構成できる連結可能な製品です。',
      qualitiesTitle: '特長：',
      materials: '素材',
      materialsValue: 'MDF、ガラス、建築用テキスタイル、金属',
      finishValue: 'エアブラシ塗装＋ラッカー',
      partsTitle: 'パーツ：',
      parts: '1 = バックライト付きグラフィック <br>2 = 照明付き棚 <br>3 = カスタムロゴ <br>4 = 収納 <br>5 = 扉付きカウンター',
      priceTitle: '価格：',
      priceText: '照明とカスタムグラフィック付き <br> 4モジュールセット',
      chooseFinish: '価格を表示するには<br>仕上げをお選びください。',
      choose: '価格を表示するには<br>仕上げをお選びください。',
      partsLabel: 'パーツ',
      price: '価格',
      qualities: '特長',
      pause: '一時停止',
      play: '再生',
      visitWeb: '専用サイトを見る',
      videos: [
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: '歴史的空間での展示会', subtitle: '伝統的・歴史的な場所に配慮した設計とエンジニアリング。' },
        { src: '/img/video_standarte_andalucia.mp4', title: '企業向けプレゼンテーション', subtitle: 'ワイナリーや特別なイベントのためのオーダーメイドの上質な空間。' },
        { src: '/img/video_standarte_feria_verano.mp4', title: '大型屋外展示会', subtitle: '大規模な設営とプレミアムな高耐久テント。' }
      ]
    },
    citiesIntro: 'スペイン・ポルトガルの主要都市でのスタンド設計・施工・設営',
    customTitle: 'ギャラリー',
    customSubtitle: '主な組立技術別に分類しています。',
    filters: { all: 'すべて', textil: 'テキスタイル', madera: '木材' },
    counters: { projects: 'プロジェクト', clients: 'クライアント', countries: '国', fairs: '展示会' },
    teamTitle: 'チーム',
    teamSubtitle: '私たちは建築家、施工士、デコレーター、照明技術者などで構成される多分野のチームです。各プロジェクトのあらゆるニーズに総合的にお応えします。ご不明な点がございましたら、お気軽にお問い合わせください。近いうちにお会いできることを楽しみにしております。',
    teamRoles: ['クリエイティブ', '管理', '工房', 'コーディネーション'],
    contactTitle: '24時間でお見積り',
    contactNotice: 'ご要望をお聞かせください。24時間以内に、細部まで作り込んだ3Dデザインと、非常に魅力的な価格のご提案をお届けします。',
    form: { name: 'お名前', company: '会社名', phone: '電話番号', email: 'メールアドレス', fair: '展示会', location: '都市・国', meters: '平方メートル', floor: '床の詳細', woodFloor: '木製上げ床', carpetPlatform: 'カーペット上げ床', carpet: 'カーペット', spaceDistribution: '空間レイアウト', reception: '受付エリア', bar: 'バーエリア', storage: '倉庫', product: '製品展示', openMeeting: 'オープン商談エリア', closedMeeting: '個室商談エリア', audiovisual: '音響映像', led: 'LEDスクリーン', projector: 'プロジェクター', budget: '想定予算', description: '説明', privacy: 'プライバシーポリシーに同意します', send: '送信' },
    legal: { privacy: 'プライバシーポリシー', legalNotice: '法的通知', cookies: 'クッキー' },
    legalText: {
      privacy: '<p>Standarteは、フォームから送信されたデータを、展示ブースのプロジェクトに関する情報のご請求、お見積り、ご連絡にのみ使用します。</p><p>これらのデータをご請求と無関係な目的で使用することはありません。アクセス、訂正、削除をご希望の場合は、info@standarte.es までご連絡ください。</p>',
      legalNotice: '<p>本ウェブサイトはStandarteに帰属します。コンテンツ、画像、テキストは商業的・情報提供を目的としており、許可なく複製することはできません。</p><p>本サイトのご利用は、関連法令を遵守した責任あるブラウジングを前提とします。</p>',
      cookies: '<p>本ウェブサイトの動作に必要なクッキーを使用し、お客様の同意がある場合に限り、Google AdsまたはGoogle Analyticsの測定・広告クッキーを使用します。</p><p>これらの目的は、クッキーバナーから承諾・拒否・設定できます。フッターの「クッキー設定」リンクからいつでも同意を変更または撤回できます。</p><p>お客様が許可された場合、Googleは広告の測定とパーソナライズのために個人データを処理することがあります。詳細：https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'メッセージが正常に送信されました。<br> まもなくご連絡いたします。<br> ありがとうございます。',
    formError: 'メッセージを送信できませんでした。もう一度お試しください。',
    projects3D: {
      title: 'ローコストプロジェクト',
      subtitle: '当社のインタラクティブな上質木工の提案と、それが私たちのデザイン哲学とどのように結びつくかをご覧ください。',
      viewBtn: 'プロジェクトを見る'
    },
    footer: 'Standarte。展示ブースの設計・製作・組立。'
  },
  nl: {
    faqsTitle: 'Veelgestelde vragen', successStoriesTitle: 'Succesverhalen', featuredProjectsIntro: 'Uitgelichte projecten van maatwerk-schrijnwerk en standontwerp:',
    nav: { home: 'Home', services: 'Diensten', custom: 'Galerij', noticias: 'Blog', contact: 'Contact', language: 'Taal' },
    seoTitle: 'Standarte | Standontwerp en montage in Spanje en Portugal',
    seoDescription: 'Standarte: de ideale partner voor uw fysieke expansiestrategie in Spanje en Portugal, dankzij onze brede beursdekking.',
    heroTitle: 'Groei op beurzen in Spanje en Portugal',
    servicesTitle: 'Diensten',
    services: [
      ['Ontwerp en engineering', 'Ons professionele team noteert de behoeften van uw project en verwerkt deze tot in detail in een gepersonaliseerd 3D-ontwerp dat u kunt verkennen en beoordelen vóór de productie begint. Het beeld van het prototype is 100% getrouw aan het eindresultaat.'],
      ['Standmontage', 'In het montageproces passen we de modernste montagetechnieken toe met materialen die specifiek geschikt zijn voor tijdelijke architectuur. Zo bieden we een onberispelijke uitstraling die op het eerste gezicht kwaliteit toont.'],
      ['Montage en validaties', 'Wij regelen alles. Volledig zorgeloos kunt u op de eerste beursdag verschijnen en vindt u alles klaar om met uw commerciële werk te beginnen. Stand, catering, drukwerk,... of het nu een beurs is in Madrid, Frankfurt, Peking of Chicago.']
    ],
    micro: {
      title: 'Lichtpaviljoen',
      subtitle: 'Tenten voor zomerevenementen in Spanje en Portugal',
      color: 'Kleur',
      finish: 'Afwerking:',
      descriptionTitle: 'Beschrijving:',
      description: 'Stand in klein formaat, opgebouwd uit 4 onderdelen<br>De montage is heel eenvoudig; er is geen gereedschap nodig.<br>Vrij configureerbaar, koppelbaar product.',
      qualitiesTitle: 'Kwaliteiten:',
      materials: 'Materialen',
      materialsValue: 'MDF, glas, architecturaal textiel, metaal',
      finishValue: 'Airbrush-lak + lakwerk',
      partsTitle: 'Onderdelen:',
      parts: '1 = Verlichte grafiek <br>2 = Verlichte schappen <br>3 = Gepersonaliseerd logo <br>4 = Opslag <br>5 = Toonbank met deuren',
      priceTitle: 'Prijs:',
      priceText: 'Set van 4 modules met verlichting en <br> gepersonaliseerde grafiek',
      chooseFinish: 'Kies de afwerking<br>om de prijs te zien.',
      choose: 'Kies de afwerking om de prijs te zien',
      partsLabel: 'Onderdelen',
      price: 'Prijs',
      qualities: 'Kwaliteiten',
      pause: 'PAUZE',
      play: 'AFSPELEN',
      visitWeb: 'BEZOEK SPECIFIEKE WEBSITE',
      videos: [
        { src: '/img/video_standarte_presentacion_vinos.mp4', title: 'Beurzen in historische omgevingen', subtitle: 'Respectvol ontwerp en engineering op traditionele en historische locaties.' },
        { src: '/img/video_standarte_andalucia.mp4', title: 'Bedrijfspresentaties', subtitle: 'Gastronomische ruimtes op maat voor wijnhuizen en speciale evenementen.' },
        { src: '/img/video_standarte_feria_verano.mp4', title: 'Grootschalige openluchtbeurzen', subtitle: 'Grootschalige opbouw en premium tenten met hoge weerstand.' }
      ]
    },
    citiesIntro: 'Ontwerp, bouw en montage van beursstands in belangrijke steden in Spanje en Portugal',
    customTitle: 'Galerij',
    customSubtitle: 'Geordend op de belangrijkste montagetechniek.',
    filters: { all: 'Alle', textil: 'Textiel', madera: 'Hout' },
    counters: { projects: 'Projecten', clients: 'Klanten', countries: 'Landen', fairs: 'Beurzen' },
    teamTitle: 'Team',
    teamSubtitle: 'Wij zijn een multidisciplinair team met architecten, monteurs, decorateurs, lichttechnici,... Samen kunnen we volledig inspelen op alle behoeften van elk project. Aarzel niet om ons te bellen met al uw vragen. We maken graag snel kennis met u.',
    teamRoles: ['Creativiteit', 'Administratie', 'Werkplaats', 'Coördinatie'],
    contactTitle: 'Offerte binnen 24u',
    contactNotice: 'Vertel ons wat u nodig hebt en binnen 24 uur hebben we een gedetailleerd 3D-ontwerp en een zeer concurrerend prijsvoorstel.',
    form: { name: 'Naam', company: 'Bedrijf', phone: 'Telefoon', email: 'E-mail', fair: 'Beurs', location: 'Stad - Land', meters: 'Vierkante meter', floor: 'Details over de vloer', woodFloor: 'Houten verhoogde vloer', carpetPlatform: 'Verhoogde vloer met tapijt', carpet: 'Tapijt', spaceDistribution: 'Ruimteverdeling', reception: 'Receptiezone', bar: 'Barzone', storage: 'Opslag', product: 'Productexpositie', openMeeting: 'Open vergaderzone', closedMeeting: 'Gesloten vergaderzone', audiovisual: 'Audiovisueel', led: 'LED-scherm', projector: 'Projector', budget: 'Geschat budget', description: 'Beschrijving', privacy: 'Accepteer ons privacybeleid', send: 'Verzenden' },
    legal: { privacy: 'Privacybeleid', legalNotice: 'Juridische kennisgeving', cookies: 'Gebruik van cookies' },
    legalText: {
      privacy: '<p>Standarte gebruikt de via het formulier verzonden gegevens uitsluitend om te reageren op informatieverzoeken, offertes en communicatie over standprojecten.</p><p>We gebruiken deze gegevens niet voor doeleinden die losstaan van uw verzoek. U kunt inzage, correctie of verwijdering aanvragen via info@standarte.es.</p>',
      legalNotice: '<p>Deze website is eigendom van Standarte. De inhoud, afbeeldingen en teksten hebben een commercieel en informatief karakter en mogen niet zonder toestemming worden gereproduceerd.</p><p>Het gebruik van de site veronderstelt verantwoord surfen in overeenstemming met de geldende regelgeving.</p>',
      cookies: '<p>We gebruiken noodzakelijke cookies voor de werking van de website en, alleen met uw toestemming, meet- en advertentiecookies van Google Ads of Google Analytics.</p><p>U kunt deze doeleinden accepteren, weigeren of configureren via de cookiebanner. U kunt uw toestemming op elk moment wijzigen of intrekken via de link "Cookies configureren" in de voettekst.</p><p>Google kan persoonsgegevens verwerken voor advertentiemeting en personalisatie wanneer u dat toestaat. Meer informatie: https://business.safety.google/privacy/</p>'
    },
    formSuccess: 'Bericht succesvol verzonden.<br> We nemen binnenkort contact met u op.<br> Bedankt.',
    formError: 'Het bericht kon niet worden verzonden. Probeer het opnieuw.',
    projects3D: {
      title: 'Lagekostenprojecten',
      subtitle: 'Ontdek onze interactieve voorstellen van hoogwaardig schrijnwerk en hun relatie met onze ontwerpwaarden.',
      viewBtn: 'Project bekijken'
    },
    footer: 'Standarte. Ontwerp, productie en montage van beursstands.'
  }
};

export const cityData = {
  islas_de_madeira: {
    "city": {
      "es": "Islas de Madeira",
      "en": "Madeira Islands",
      "de": "Madeira-Inseln",
      "pt": "Ilhas da Madeira",
      "fr": "Îles de Madère",
      "it": "Isole di Madera",
      "nl": "Madeira-eilanden",
      "zh": "马德拉群岛",
      "hi": "मडीरा द्वीप समूह",
      "ko": "마데이라 제도",
      "ja": "マデイラ諸島"
    },
    },
  islas_canarias: {
    "city": {
      "es": "Islas Canarias",
      "en": "Canary Islands",
      "de": "Kanarische Inseln",
      "pt": "Ilhas Canárias",
      "fr": "Îles Canaries",
      "it": "Isole Canarie",
      "nl": "Canarische Eilanden",
      "zh": "加那利群岛",
      "hi": "कैनरी द्वीप समूह",
      "ko": "카나리아 제도",
      "ja": "カナリア諸島"
    },
    },
  alicante: {
    "city": {
      "es": "Alicante",
      "en": "Alicante",
      "de": "Alicante",
      "pt": "Alicante",
      "fr": "Alicante",
      "it": "Alicante",
      "nl": "Alicante",
      "zh": "阿利坎特",
      "hi": "अलिकांते",
      "ko": "알리칸테",
      "ja": "アリカンテ"
    },
    },
  murcia: {
    "city": {
      "es": "Murcia",
      "en": "Murcia",
      "de": "Murcia",
      "pt": "Múrcia",
      "fr": "Murcie",
      "it": "Murcia",
      "nl": "Murcia",
      "zh": "穆尔西亚",
      "hi": "मुर्सिया",
      "ko": "무르시아",
      "ja": "ムルシア"
    },
    },
  valladolid: {
    "city": {
      "es": "Valladolid",
      "pt": "Valladolid",
      "en": "Valladolid",
      "de": "Valladolid",
      "fr": "Valladolid",
      "it": "Valladolid",
      "nl": "Valladolid",
      "zh": "巴利亚多利德",
      "hi": "वायाडोलिड",
      "ko": "바야돌리드",
      "ja": "バリャドリッド"
    },
    },
  salamanca: {
    "city": {
      "es": "Salamanca",
      "pt": "Salamanca",
      "en": "Salamanca",
      "de": "Salamanca",
      "fr": "Salamanca",
      "it": "Salamanca",
      "nl": "Salamanca",
      "zh": "萨拉曼卡",
      "hi": "सलमांका",
      "ko": "살라망카",
      "ja": "サラマンカ"
    },
    },
  coruna: {
    "city": {
      "es": "A Coruña",
      "pt": "A Coruña",
      "en": "A Coruña",
      "de": "A Coruña",
      "fr": "La Corogne",
      "it": "La Coruña",
      "nl": "A Coruña",
      "zh": "拉科鲁尼亚",
      "hi": "ए कोरुनिया",
      "ko": "아 코루냐",
      "ja": "ア・コルーニャ"
    },
    },
  santiago: {
    "city": {
      "es": "Santiago de Compostela",
      "en": "Santiago de Compostela",
      "de": "Santiago de Compostela",
      "zh": "圣地亚哥-德孔波斯特拉",
      "hi": "सैंटियागो दे कॉम्पोस्टेला",
      "pt": "Santiago de Compostela",
      "fr": "Saint-Jacques-de-Compostelle",
      "it": "Santiago di Compostela",
      "ko": "산티아고 데 콤포스텔라",
      "ja": "サンティアゴ・デ・コンポステーラ",
      "nl": "Santiago de Compostela"
    },
    },
  portugal_sur: {
    "city": {
      "es": "Portugal Sur",
      "en": "Southern Portugal",
      "de": "Südportugal",
      "pt": "Sul de Portugal",
      "fr": "Sud du Portugal",
      "it": "Sud del Portogallo",
      "nl": "Zuid-Portugal",
      "zh": "葡萄牙南部",
      "hi": "दक्षिणी पुर्तगाल",
      "ko": "포르투갈 남부",
      "ja": "南ポルトガル"
    },
    },
  madrid: {
    city: { es: 'Madrid', en: 'Madrid', de: 'Madrid', zh: '马德里', hi: 'मैड्रिड', pt: 'Madrid', fr: 'Madrid', it: 'Madrid', ko: '마드리드', ja: 'マドリード' },
    },
  barcelona: {
    city: { es: 'Barcelona', en: 'Barcelona', de: 'Barcelona', zh: '巴塞罗那', hi: 'बार्सिलोना', pt: 'Barcelona', fr: 'Barcelone', it: 'Barcellona', ko: '바르셀로나', ja: 'バルセロナ' },
    },
  bilbao: {
    city: { es: 'Bilbao', en: 'Bilbao', de: 'Bilbao', zh: '毕尔巴鄂', hi: 'बिलबाओ', pt: 'Bilbau', fr: 'Bilbao', it: 'Bilbao', ko: '빌바오', ja: 'ビルバオ' },
    },
  lisboa: {
    city: { es: 'Lisboa', en: 'Lisbon', de: 'Lissabon', zh: '里斯本', hi: 'लिस्बन', pt: 'Lisboa', fr: 'Lisbonne', it: 'Lisbona', ko: '리스본', ja: 'リスボン', nl: 'Lissabon' },
    },
  batalha: {
    city: { es: 'Batalha', en: 'Batalha', de: 'Batalha', zh: '巴塔利亚', hi: 'बाताल्हा', pt: 'Batalha', fr: 'Batalha', it: 'Batalha', ko: '바탈랴', ja: 'バターリャ', nl: 'Batalha' },
    },
  lleida: {
    city: { es: 'Lleida', en: 'Lleida', de: 'Lleida', zh: '莱里达', hi: 'ल्येइदा', pt: 'Lleida', fr: 'Lleida', it: 'Lleida', ko: '예이다', ja: 'リェイダ', nl: 'Lleida' },
    },
  girona: {
    city: { es: 'Girona', en: 'Girona', de: 'Girona', zh: '赫罗纳', hi: 'जिरोना', pt: 'Girona', fr: 'Gérone', it: 'Girona', ko: '지로나', ja: 'ジローナ', nl: 'Girona' },
    },
  santander: {
    city: { es: 'Santander', en: 'Santander', de: 'Santander', zh: '桑坦德', hi: 'सांतान्देर', pt: 'Santander', fr: 'Santander', it: 'Santander', ko: '산탄데르', ja: 'サンタンデール', nl: 'Santander' },
    },
  irun: {
    city: { es: 'Irún', en: 'Irún', de: 'Irún', zh: '伊伦', hi: 'इरुन', pt: 'Irún', fr: 'Irún', it: 'Irún', ko: '이룬', ja: 'イルン', nl: 'Irún' },
    },
  logrono: {
    city: { es: 'Logroño', en: 'Logroño', de: 'Logroño', zh: '洛格罗尼奥', hi: 'लोग्रोन्यो', pt: 'Logroño', fr: 'Logroño', it: 'Logroño', ko: '로그로뇨', ja: 'ログローニョ', nl: 'Logroño' },
    },
  pamplona: {
    city: { es: 'Pamplona', en: 'Pamplona', de: 'Pamplona', zh: '潘普洛纳', hi: 'पाम्प्लोना', pt: 'Pamplona', fr: 'Pampelune', it: 'Pamplona', ko: '팜플로나', ja: 'パンプローナ', nl: 'Pamplona' },
    },
  vitoria: {
    city: { es: 'Vitoria', en: 'Vitoria', de: 'Vitoria', zh: '维多利亚', hi: 'विटोरिया', pt: 'Vitória', fr: 'Vitoria', it: 'Vitoria', ko: '비토리아', ja: 'ビトリア', nl: 'Vitoria' },
    },
  aranda: {
    city: { es: 'Aranda de Duero', en: 'Aranda de Duero', de: 'Aranda de Duero', zh: '阿兰达·德杜罗', hi: 'आरंदा दे दुएरो', pt: 'Aranda de Duero', fr: 'Aranda de Duero', it: 'Aranda de Duero', ko: '아란다 데 두에로', ja: 'アランダ・デ・ドゥエロ', nl: 'Aranda de Duero' },
    },
  regua: {
    city: { es: 'Peso da Régua', en: 'Peso da Régua', de: 'Peso da Régua', zh: '佩索达雷瓜', hi: 'पेसो दा रेगुआ', pt: 'Peso da Régua', fr: 'Peso da Régua', it: 'Peso da Régua', ko: '페소 다 레구아', ja: 'ペーゾ・ダ・レグア', nl: 'Peso da Régua' },
    },
  ibiza: {
    city: { es: 'Ibiza', en: 'Ibiza', de: 'Ibiza', zh: '伊维萨', hi: 'इबीसा', pt: 'Ibiza', fr: 'Ibiza', it: 'Ibiza', ko: '이비사', ja: 'イビサ', nl: 'Ibiza' },
    },
  menorca: {
    city: { es: 'Menorca', en: 'Menorca', de: 'Menorca', zh: '梅诺卡', hi: 'मेनोर्का', pt: 'Menorca', fr: 'Minorque', it: 'Minorca', ko: '메노르카', ja: 'メノルカ', nl: 'Menorca' },
    },
  ceuta: {
    city: { es: 'Ceuta', en: 'Ceuta', de: 'Ceuta', zh: '休达', hi: 'सेउता', pt: 'Ceuta', fr: 'Ceuta', it: 'Ceuta', ko: '세우타', ja: 'セウタ', nl: 'Ceuta' },
    },
  melilla: {
    city: { es: 'Melilla', en: 'Melilla', de: 'Melilla', zh: '梅利利亚', hi: 'मेलिला', pt: 'Melilla', fr: 'Melilla', it: 'Melilla', ko: '멜리야', ja: 'メリリャ', nl: 'Melilla' },
    },
  tanger: {
    city: { es: 'Tánger', en: 'Tangier', de: 'Tanger', zh: '丹吉尔', hi: 'तंजियर', pt: 'Tânger', fr: 'Tanger', it: 'Tangeri', ko: '탕헤르', ja: 'タンジェ', nl: 'Tanger' },
    },
  casablanca: {
    city: { es: 'Casablanca', en: 'Casablanca', de: 'Casablanca', zh: '卡萨布兰卡', hi: 'कासाब्लांका', pt: 'Casablanca', fr: 'Casablanca', it: 'Casablanca', ko: '카사블랑카', ja: 'カサブランカ', nl: 'Casablanca' },
    },
  rabat: {
    city: { es: 'Rabat', en: 'Rabat', de: 'Rabat', zh: '拉巴特', hi: 'रबात', pt: 'Rabat', fr: 'Rabat', it: 'Rabat', ko: '라바트', ja: 'ラバト', nl: 'Rabat' },
    },
  andorra: {
    city: { es: 'Andorra', en: 'Andorra', de: 'Andorra', zh: '安道尔', hi: 'अंडोरा', pt: 'Andorra', fr: 'Andorre', it: 'Andorra', ko: '안도라', ja: 'アンドラ', nl: 'Andorra' },
    },
  teruel: {
    city: { es: 'Teruel', en: 'Teruel', de: 'Teruel', zh: '特鲁埃尔', hi: 'टेरुएल', pt: 'Teruel', fr: 'Teruel', it: 'Teruel', ko: '테루엘', ja: 'テルエル', nl: 'Teruel' },
    },
  marsella: {
    city: { es: 'Marsella', en: 'Marseille', de: 'Marseille', zh: '马赛', hi: 'मार्सिले', pt: 'Marselha', fr: 'Marseille', it: 'Marsiglia', ko: '마르세유', ja: 'マルセイユ', nl: 'Marseille' },
    },
  cannes: {
    city: { es: 'Cannes', en: 'Cannes', de: 'Cannes', zh: '戛纳', hi: 'कान', pt: 'Cannes', fr: 'Cannes', it: 'Cannes', ko: '칸', ja: 'カンヌ', nl: 'Cannes' },
    },
  avignon: {
    city: { es: 'Aviñón', en: 'Avignon', de: 'Avignon', zh: '阿维尼翁', hi: 'अविञ्यों', pt: 'Avinhão', fr: 'Avignon', it: 'Avignone', ko: '아비뇽', ja: 'アヴィニョン', nl: 'Avignon' },
    },
  toulouse: {
    city: { es: 'Toulouse', en: 'Toulouse', de: 'Toulouse', zh: '图卢兹', hi: 'तुलूज़', pt: 'Toulouse', fr: 'Toulouse', it: 'Tolosa', ko: '툴루즈', ja: 'トゥールーズ', nl: 'Toulouse' },
    },
  burdeos: {
    city: { es: 'Burdeos', en: 'Bordeaux', de: 'Bordeaux', zh: '波尔多', hi: 'बोर्डो', pt: 'Bordéus', fr: 'Bordeaux', it: 'Bordeaux', ko: '보르도', ja: 'ボルドー', nl: 'Bordeaux' },
    },
  lyon: {
    city: { es: 'Lyon', en: 'Lyon', de: 'Lyon', zh: '里昂', hi: 'ल्यों', pt: 'Lyon', fr: 'Lyon', it: 'Lione', ko: '리옹', ja: 'リヨン', nl: 'Lyon' },
    },
  grenoble: {
    city: { es: 'Grenoble', en: 'Grenoble', de: 'Grenoble', zh: '格勒诺布尔', hi: 'ग्रेनोबल', pt: 'Grenoble', fr: 'Grenoble', it: 'Grenoble', ko: '그르노블', ja: 'グルノーブル', nl: 'Grenoble' },
    },
  clermont_ferrand: {
    city: { es: 'Clermont-Ferrand', en: 'Clermont-Ferrand', de: 'Clermont-Ferrand', zh: '克莱蒙费朗', hi: 'क्लेरमों-फेराँ', pt: 'Clermont-Ferrand', fr: 'Clermont-Ferrand', it: 'Clermont-Ferrand', ko: '클레르몽페랑', ja: 'クレルモン＝フェラン', nl: 'Clermont-Ferrand' },
    },
  niza: {
    city: { es: 'Niza', en: 'Nice', de: 'Nizza', zh: '尼斯', hi: 'नीस', pt: 'Nice', fr: 'Nice', it: 'Nizza', ko: '니스', ja: 'ニース', nl: 'Nice' },
    },
  montpellier: {
    city: { es: 'Montpellier', en: 'Montpellier', de: 'Montpellier', zh: '蒙彼利埃', hi: 'मोंपेलिये', pt: 'Montpellier', fr: 'Montpellier', it: 'Montpellier', ko: '몽펠리에', ja: 'モンペリエ', nl: 'Montpellier' },
    },
  perpignan: {
    city: { es: 'Perpiñán', en: 'Perpignan', de: 'Perpignan', zh: '佩皮尼昂', hi: 'पेर्पिञ्यां', pt: 'Perpinhã', fr: 'Perpignan', it: 'Perpignano', ko: '페르피냥', ja: 'ペルピニャン', nl: 'Perpignan' },
    },
  gijon: {
    city: { es: 'Gijón', en: 'Gijón', de: 'Gijón', zh: '希洪', hi: 'ख़िख़ोन', pt: 'Gijón', fr: 'Gijón', it: 'Gijón', ko: '히혼', ja: 'ヒホン', nl: 'Gijón' },
    },
  silleda: {
    city: { es: 'Silleda', en: 'Silleda', de: 'Silleda', zh: '锡列达', hi: 'सिलेदा', pt: 'Silleda', fr: 'Silleda', it: 'Silleda', ko: '실레다', ja: 'シジェダ', nl: 'Silleda' },
    },
  ourense: {
    city: { es: 'Ourense', en: 'Ourense', de: 'Ourense', zh: '奥伦塞', hi: 'ओरेंसे', pt: 'Ourense', fr: 'Ourense', it: 'Ourense', ko: '오우렌세', ja: 'オウレンセ', nl: 'Ourense' },
    },
  vigo: {
    city: { es: 'Vigo', en: 'Vigo', de: 'Vigo', zh: '维戈', hi: 'विगो', pt: 'Vigo', fr: 'Vigo', it: 'Vigo', ko: '비고', ja: 'ビーゴ', nl: 'Vigo' },
    },
  mallorca: {
    city: { es: 'Mallorca', en: 'Mallorca', de: 'Mallorca', zh: '马略卡', hi: 'मायोर्का', pt: 'Maiorca', fr: 'Majorque', it: 'Maiorca', ko: '마요르카', ja: 'マヨルカ', nl: 'Mallorca' },
    },
  valencia: {
    city: { es: 'Valencia', en: 'Valencia', de: 'Valencia', zh: '瓦伦西亚', hi: 'वालेंसिया', pt: 'Valência', fr: 'Valence', it: 'Valencia', ko: '발렌시아', ja: 'バレンシア', nl: 'Valencia' },
    },
  oporto: {
    city: { es: 'Oporto', en: 'Porto', de: 'Porto', zh: '波尔图', hi: 'पोर्टो', pt: 'Porto', fr: 'Porto', it: 'Porto', ko: '포르투', ja: 'ポルト', nl: 'Porto' },
    },
  malaga: {
    city: { es: 'Málaga', en: 'Malaga', de: 'Málaga', zh: '马拉加', hi: 'मलागा', pt: 'Málaga', fr: 'Malaga', it: 'Malaga', ko: '말라가', ja: 'マラガ' },
    },
  badajoz: {
    city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz', ko: '바다호스', ja: 'バダホス' },
    },
  sevilla: {
    city: { es: 'Sevilla', en: 'Seville', de: 'Sevilla', zh: '塞维利亚', hi: 'सेविले', pt: 'Sevilha', fr: 'Séville', it: 'Siviglia', ko: '세비야', ja: 'セビリア' },
    },
  ciudad_real: {
    city: { es: 'Ciudad Real', en: 'Ciudad Real', de: 'Ciudad Real', zh: '雷阿尔城', hi: 'स्यूदाদ रियल', pt: 'Ciudad Real', fr: 'Ciudad Real', it: 'Ciudad Real', ko: '시우다드레알', ja: 'シウダー・レアル' },
    },
  zaragoza: {
    city: { es: 'Zaragoza', en: 'Zaragoza', de: 'Zaragoza', zh: '萨拉戈萨', hi: 'ज़ारागोज़ा', pt: 'Saragoça', fr: 'Saragosse', it: 'Saragozza', ko: '사라고사', ja: 'サラゴサ' },
    },
  montaje_zafra: {
    city: { es: 'Zafra', en: 'Zafra', de: 'Zafra', zh: '萨夫拉', hi: 'ज़फ़रा', pt: 'Zafra', fr: 'Zafra', it: 'Zafra', ko: '사프라', ja: 'サフラ' },
    },
  montaje_don_benito: {
    city: { es: 'Don Benito', en: 'Don Benito', de: 'Don Benito', zh: '唐贝尼托', hi: 'डॉन बेनिटो', pt: 'Don Benito', fr: 'Don Benito', it: 'Don Benito', ko: '돈 베니토', ja: 'ドン・ベニート' },
    },
  montaje_badajoz: {
    city: { es: 'Badajoz', en: 'Badajoz', de: 'Badajoz', zh: '巴达霍斯', hi: 'बादाहोज़', pt: 'Badajoz', fr: 'Badajoz', it: 'Badajoz', ko: '바다호스', ja: 'バダホス' },
    },
  almeria: {
    city: { es: 'Almería', en: 'Almeria', de: 'Almería', zh: '阿尔梅里亚', hi: 'अल्मेरिया', pt: 'Almería', fr: 'Almeria', it: 'Almeria', ko: '알메리아', ja: 'アルメリア' },
    },
  jaen: {
    city: { es: 'Jaén', en: 'Jaen', de: 'Jaén', zh: '哈恩', hi: 'हाएन', pt: 'Jaén', fr: 'Jaen', it: 'Jaen', ko: '하엔', ja: 'ハエン' },
    },
  huelva: {
    city: { es: 'Huelva', en: 'Huelva', de: 'Huelva', zh: '韦尔瓦', hi: 'हुएल्वा', pt: 'Huelva', fr: 'Huelva', it: 'Huelva', ko: '우엘바', ja: 'ウエルバ' },
    },
  cordoba: {
    city: { es: 'Córdoba', en: 'Cordoba', de: 'Córdoba', zh: '科尔多瓦', hi: 'कोर्दोबा', pt: 'Córdova', fr: 'Cordoue', it: 'Cordova', ko: '코르도바', ja: 'コルドバ' },
    },
  granada: {
    city: { es: 'Granada', en: 'Granada', de: 'Granada', zh: '格拉纳达', hi: 'ग्रानादा', pt: 'Granada', fr: 'Grenade', it: 'Granada', ko: '그라나다', ja: 'グラナダ' },
    },
  cadiz: {
    city: { es: 'Cádiz', en: 'Cadiz', de: 'Cádiz', zh: '加的斯', hi: 'काडिज़', pt: 'Cádiz', fr: 'Cadix', it: 'Cadice', ko: '카디스', ja: 'カディス' },
    },
  santarem: {
    city: { es: 'Santarém', en: 'Santarem', de: 'Santarém', zh: '桑塔伦', hi: 'सांतारेम', pt: 'Santarém', fr: 'Santarém', it: 'Santarém', ko: '산타렘', ja: 'サンタレン' },
    },
  trujillo: {
    city: { es: 'Trujillo', en: 'Trujillo', de: 'Trujillo', zh: '特鲁希略', hi: 'त्रुखिलो', pt: 'Trujillo', fr: 'Trujillo', it: 'Trujillo', ko: '트루히요', ja: 'トルヒージョ' },
    },
  elche: {
    city: { es: 'Elche', en: 'Elche', de: 'Elche', zh: '埃尔切', hi: 'एल्चे', pt: 'Elche', fr: 'Elche', it: 'Elche', ko: '엘체', ja: 'エルチェ' },
    }
};

export const portfolios = [
  {
    "thumb": "img/trabajos/TCANTICO/2.avif",
    "full": "img/trabajos/TCANTICO/1.avif",
    "alt": "Stand para empresa de mobiliario en Madrid",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_mobiliario_en_madrid_spain",
      "en": "exhibition_stand_for_company_furniture_in_madrid_spain",
      "de": "messestand_fuer_unternehmen_moebel_in_madrid_spanien",
      "pt": "estande_para_empresa_de_mobiliario_em_madri_espanha",
      "zh": "xibanya_madeli_jiaju_gongsi_zhanwei",
      "hi": "maidrid_spen_mein_farnichar_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_mobiliario_en_madrid_spain",
      "it": "stand_para_empresa_de_mobiliario_en_madrid_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCELUMATEC/2.avif",
    "full": "img/trabajos/TCELUMATEC/3.avif",
    "alt": "Construcción de stand industrial a medida para Elumatec",
    "categories": [
      "carpinteria",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain",
      "en": "exhibition_stand_for_company_aluminum_profiles_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_aluminiumprofile_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_perfis_aluminio_em_bilbau_espanha",
      "zh": "xibanya_bibao_lv_xingcai_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_elyuminiyam_prophail_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain",
      "it": "stand_para_empresa_de_perfiles_aluminio_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCCONSTELLIUM/1.avif",
    "full": "img/trabajos/TCCONSTELLIUM/1.avif",
    "alt": "Diseño de stand de gran escala para Constellium",
    "categories": [
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain",
      "en": "exhibition_stand_for_company_aluminum_products_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_aluminiumprodukte_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_produtos_aluminio_em_bilbau_espanha",
      "zh": "xibanya_bibao_lv_chanpin_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_elyuminiyam_utpaad_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain",
      "it": "stand_para_empresa_de_productos_aluminio_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCFARNEL/1.avif",
    "full": "img/trabajos/TCFARNEL/1.avif",
    "alt": "Stand retroiluminado con textiles tensados para Farnel",
    "categories": [
      "textil",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain",
      "en": "exhibition_stand_for_company_electronic_components_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_elektronische_bauteile_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_componentes_eletronicos_em_bilbau_espanha",
      "zh": "xibanya_bibao_dianzi_yuanjian_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_ilektronik_ghatak_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain",
      "it": "stand_para_empresa_de_componentes_electronicos_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCMAGNOLIA/1.avif",
    "full": "img/trabajos/TCMAGNOLIA/1.avif",
    "alt": "Montaje de stand premium con acabados de carpintería Magnolia",
    "categories": [
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_en_bilbao_spain",
      "en": "exhibition_stand_for_company_jewelry_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_schmuck_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_joalheria_em_bilbau_espanha",
      "zh": "xibanya_bibao_zhubao_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_aabhooshan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_joyeria_en_bilbao_spain",
      "it": "stand_para_empresa_de_joyeria_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCMFI/1.avif",
    "full": "img/trabajos/TCMFI/1.avif",
    "alt": "Stand modular de madera y diseño ferial para MFI",
    "categories": [
      "madera",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_bienes_raices_en_bilbao_spain",
      "en": "exhibition_stand_for_company_real_estate_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_immobilien_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_imoveis_em_bilbau_espanha",
      "zh": "xibanya_bibao_fangdichan_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_riyal_estet_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_bienes_raices_en_bilbao_spain",
      "it": "stand_para_empresa_de_bienes_raices_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCORGADATA/1.avif",
    "full": "img/trabajos/TCORGADATA/1.avif",
    "alt": "Stand corporativo para captación de leads de Orgadata",
    "categories": [
      "tecnologia",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_software_industrial_en_bilbao_spain",
      "en": "exhibition_stand_for_company_industrial_software_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_industriesoftware_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_software_industrial_em_bilbau_espanha",
      "zh": "xibanya_bibao_gongye_ruanjian_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_audyogik_sophataveyar_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_software_industrial_en_bilbao_spain",
      "it": "stand_para_empresa_de_software_industrial_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCEMIL/1.avif",
    "full": "img/trabajos/TCEMIL/1.avif",
    "alt": "Stand ferial de carpintería premium lacada para Emil",
    "categories": [
      "carpinteria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_ceramica_en_bilbao_spain",
      "en": "exhibition_stand_for_company_ceramics_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_keramik_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_ceramica_em_bilbau_espanha",
      "zh": "xibanya_bibao_taoci_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_siremik_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_ceramica_en_bilbao_spain",
      "it": "stand_para_empresa_de_ceramica_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCPHARMA/1.avif",
    "full": "img/trabajos/TCPHARMA/1.avif",
    "alt": "Stand de marca de alta fidelidad para Pharma",
    "categories": [
      "farmaceutica",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain",
      "en": "exhibition_stand_for_company_health_technology_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_gesundheitstechnologie_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_tecnologia_saude_em_bilbau_espanha",
      "zh": "xibanya_bibao_jiankang_keji_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_svaasthy_takaneek_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain",
      "it": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCSCHOEFFEL/4.avif",
    "full": "img/trabajos/TCSCHOEFFEL/1.avif",
    "alt": "Stand de textil tensado y retroiluminado para Schoeffel",
    "categories": [
      "textil",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain",
      "en": "exhibition_stand_for_company_pearl_jewelry_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_perlensmuck_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_joias_perolas_em_bilbau_espanha",
      "zh": "xibanya_bibao_zhenzhu_zhubao_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_moti_aabhooshan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain",
      "it": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TCSES/2.avif",
    "full": "img/trabajos/TCSES/1.avif",
    "alt": "Stand con gran impacto visual y rotulación corporativa para SES",
    "categories": [
      "rotulacion",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain",
      "en": "exhibition_stand_for_company_telecommunications_satellites_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_telekommunikationssatelliten_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_satelites_telecomunicacoes_em_bilbau_espanha",
      "zh": "xibanya_bibao_tongxin_weixing_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_doorsanchaar_upagrah_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain",
      "it": "stand_para_empresa_de_satelites_telecomunicaciones_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/TELASRGB/2.avif",
    "full": "img/trabajos/TELASRGB/1.avif",
    "alt": "Stand ferial de tecnología de iluminación y salud para Philips",
    "categories": [
      "iluminacion",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain",
      "en": "exhibition_stand_for_company_health_lighting_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_gesundheitsbeleuchtung_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_iluminacao_saude_em_bilbau_espanha",
      "zh": "xibanya_bibao_jiankang_zhaoming_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_svaasthy_prakash_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain",
      "it": "stand_para_empresa_de_iluminacion_salud_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-bost-emo-2023_1.avif",
    "full": "img/trabajos/trabajos_promueve/01-bost-emo-2023_1.avif",
    "alt": "Construcción de stand de gran formato en carpintería de madera para BOST en EMO 2023",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-stand-tecnalia-biemh-2022_1.avif",
    "full": "img/trabajos/trabajos_promueve/01-stand-tecnalia-biemh-2022_1.avif",
    "alt": "Estructura de stand modular de aluminio y diseño tecnológico para Tecnalia en BIEMH 2022",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/01-stand-zayer-biemh-2022-v2.avif",
    "full": "img/trabajos/trabajos_promueve/01-stand-zayer-biemh-2022-v2.avif",
    "alt": "Stand de carpintería a medida y espacio de exposición de maquinaria para Zayer en BIEMH 2022",
    "categories": [
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/1.avif",
    "full": "img/trabajos/trabajos_promueve/1.avif",
    "alt": "Stand corporativo premium con diseño para empresa del sector farmacéutico Pharmatechnik",
    "categories": [
      "farmaceutica"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_health_technology_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_gesundheitstechnologie_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_tecnologia_saude_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jiankang_keji_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_svaasthy_takaneek_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_tecnologia_salud_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-bost-emo-2023_1.avif",
    "full": "img/trabajos/trabajos_promueve/02-bost-emo-2023_1.avif",
    "alt": "Zona audiovisual integrada en stand de madera a medida para la empresa BOST",
    "categories": [
      "madera",
      "led"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_3",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_3",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_3",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_3",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_3",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_3"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-stand-intermaher-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/02-stand-intermaher-biemh-2022.avif",
    "alt": "Diseño y montaje de stand ferial para exhibición de maquinaria pesada de Intermaher en BIEMH 2022",
    "categories": [
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_4",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_4",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_4",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_4",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_4",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_4"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/02-stand-zayer-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/02-stand-zayer-biemh-2022.avif",
    "alt": "Área de demostración y carpintería técnica en el stand de Zayer para BIEMH 2022",
    "categories": [
      "carpinteria",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_5",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_5",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_5",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_5",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_5",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_5"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/2 copia.avif",
    "full": "img/trabajos/trabajos_promueve/2 copia.avif",
    "alt": "Stand con textiles arquitectónicos tensados para la firma de joyería Schoeffel",
    "categories": [
      "textil"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_pearl_jewelry_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_perlensmuck_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_joias_perolas_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_zhenzhu_zhubao_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_moti_aabhooshan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_joyeria_perlas_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/03-stand-intermaher-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/03-stand-intermaher-biemh-2022.avif",
    "alt": "Vista superior del stand modular con estructura metálica y zona expositora para Intermaher",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_6",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_6",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_6",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_6",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_6",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_6"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/03-stand-tecnalia-biemh-2022_1.avif",
    "full": "img/trabajos/trabajos_promueve/03-stand-tecnalia-biemh-2022_1.avif",
    "alt": "Stand tecnológico con zona de robótica y pantallas led interactivas para Tecnalia en BIEMH 2022",
    "categories": [
      "tecnologia",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/3.avif",
    "full": "img/trabajos/trabajos_promueve/3.avif",
    "alt": "Stand modular de madera y acabados profesionales para MFI Unibail Rodamco",
    "categories": [
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_7",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_7",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_7",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_7",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_7",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_7"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/04-bost-emo-2023_2.avif",
    "full": "img/trabajos/trabajos_promueve/04-bost-emo-2023_2.avif",
    "alt": "Zona de reuniones de carpintería premium y diseño acogedor en el stand de BOST",
    "categories": [
      "madera",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_8",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_8",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_8",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_8",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_8",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_8"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/06-stand-zayer-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/06-stand-zayer-biemh-2022.avif",
    "alt": "Pantalla LED gigante integrada en la estructura del stand de Zayer",
    "categories": [
      "led",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_9",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_9",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_9",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_9",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_9",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_9"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/bellota-ferroforma.avif",
    "full": "img/trabajos/trabajos_promueve/bellota-ferroforma.avif",
    "alt": "Construcción de stand a medida para la empresa de herramientas agrícolas Bellota en Ferroforma",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain",
      "en": "exhibition_stand_for_company_agricultural_tools_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_landwirtschaftliche_werkzeuge_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_ferramentas_agricolas_em_bilbau_espanha",
      "zh": "xibanya_bibao_nongye_gongju_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_krshi_upakaran_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain",
      "it": "stand_para_empresa_de_herramientas_agricolas_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/biemh-16-tecnalia-1.avif",
    "full": "img/trabajos/trabajos_promueve/biemh-16-tecnalia-1.avif",
    "alt": "Stand corporativo enfocado en investigación tecnológica de Tecnalia para la BIEMH 2016",
    "categories": [
      "feria",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3",
      "en": "exhibition_stand_for_company_technological_research_in_bilbao_spain_3",
      "de": "messestand_fuer_unternehmen_technologische_forschung_in_bilbao_spanien_3",
      "pt": "estande_para_empresa_de_pesquisa_tecnologica_em_bilbau_espanha_3",
      "zh": "xibanya_bibao_jishu_yanjiu_gongsi_zhanwei_3",
      "hi": "bilabao_spen_mein_takaniki_anusandhaan_kampani_ke_liye_pradarshani_staind_3",
      "fr": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3",
      "it": "stand_para_empresa_de_investigacion_tecnologica_en_bilbao_spain_3"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/cabecera-proyecto-emo-milano-2021-2.avif",
    "full": "img/trabajos/trabajos_promueve/cabecera-proyecto-emo-milano-2021-2.avif",
    "alt": "Stand de diseño de alta gama para la exhibición de Zayer en EMO Milano",
    "categories": [
      "feria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_milano_italy",
      "en": "exhibition_stand_for_company_machine_tools_in_milan_italy",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_mailand_italien",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_milao_italia",
      "zh": "yidali_milan_jichuang_gongsi_zhanwei",
      "hi": "milan_itali_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_milano_italy",
      "it": "stand_para_empresa_de_maquina_herramienta_en_milano_italy"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/evento-2014-fanuc-showroom-1.avif",
    "full": "img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-1.avif",
    "alt": "Showroom corporativo de robótica industrial diseñado a medida para Fanuc",
    "categories": [
      "showroom",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain",
      "en": "exhibition_stand_for_company_industrial_robotics_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_industrierobotik_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_robotica_industrial_em_bilbau_espanha",
      "zh": "xibanya_bibao_gongye_jiqiren_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_audyogik_robotiks_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain",
      "it": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/evento-2014-fanuc-showroom-2.avif",
    "full": "img/trabajos/trabajos_promueve/evento-2014-fanuc-showroom-2.avif",
    "alt": "Diseño de espacio expositivo y showroom industrial para maquinaria Fanuc",
    "categories": [
      "showroom",
      "tecnologia"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_industrial_robotics_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_industrierobotik_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_robotica_industrial_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_gongye_jiqiren_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_audyogik_robotiks_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_robotica_industrial_en_bilbao_spain_2"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/mg-1225.avif",
    "full": "img/trabajos/trabajos_promueve/mg-1225.avif",
    "alt": "Stand ferial de alimentación con diseño corporativo y áreas de degustación para Pescanova",
    "categories": [
      "alimentacion",
      "feria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain",
      "en": "exhibition_stand_for_company_seafood_food_in_bilbao_spain",
      "de": "messestand_fuer_unternehmen_meeresfruechte_in_bilbao_spanien",
      "pt": "estande_para_empresa_de_alimentacao_frutos_mar_em_bilbau_espanha",
      "zh": "xibanya_bibao_haixian_shipin_gongsi_zhanwei",
      "hi": "bilabao_spen_mein_samudree_bhojan_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain",
      "it": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-2016-biemh-emuge-4.avif",
    "full": "img/trabajos/trabajos_promueve/stand-2016-biemh-emuge-4.avif",
    "alt": "Stand con estructura de aluminio y elementos corporativos para Emuge Franken en BIEMH 2016",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_10",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_10",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_10",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_10",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_10",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_10"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-2018-biemh-delteco-10.avif",
    "full": "img/trabajos/trabajos_promueve/stand-2018-biemh-delteco-10.avif",
    "alt": "Gran stand ferial de carpintería y acabados lacados para Delteco en BIEMH 2018",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_11",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_11",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_11",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_11",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_11",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_11"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-cun-fitur3.avif",
    "full": "img/trabajos/trabajos_promueve/stand-cun-fitur3.avif",
    "alt": "Stand de madera a medida para la Clínica Universidad de Navarra en Fitur",
    "categories": [
      "sanidad",
      "madera"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain",
      "en": "exhibition_stand_for_company_healthcare_medicine_in_madrid_spain",
      "de": "messestand_fuer_unternehmen_gesundheitswesen_medizin_in_madrid_spanien",
      "pt": "estande_para_empresa_de_saude_medicina_em_madri_espanha",
      "zh": "xibanya_madeli_yiliao_weisheng_gongsi_zhanwei",
      "hi": "maidrid_spen_mein_svaasthy_chikitsa_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain",
      "it": "stand_para_empresa_de_sanidad_medicina_en_madrid_spain"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stand-emuge-biemh-2022.avif",
    "full": "img/trabajos/trabajos_promueve/stand-emuge-biemh-2022.avif",
    "alt": "Diseño de stand de perfilería de aluminio y zonas de reunión de Emuge Franken en BIEMH 2022",
    "categories": [
      "feria",
      "aluminio"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_12",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_12",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_12",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_12",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_12",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_12"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/STANDS_2017_EMO_HANNOVER_ZAYER_1.avif",
    "full": "img/trabajos/trabajos_promueve/STANDS_2017_EMO_HANNOVER_ZAYER_1.avif",
    "alt": "Stand premium de gran escala para la demostración de maquinaria Zayer en EMO Hannover 2017",
    "categories": [
      "feria",
      "premium"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany",
      "en": "exhibition_stand_for_company_machine_tools_in_hannover_germany",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_hannover_deutschland",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_hanover_alemanha",
      "zh": "deguo_hannuowei_jichuang_gongsi_zhanwei",
      "hi": "hainaovar_jarmani_mein_mashin_tools_kampani_ke_liye_pradarshani_staind",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany",
      "it": "stand_para_empresa_de_maquina_herramienta_en_hannover_germany"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-2014-biemh-bilbao-zayer-17.avif",
    "full": "img/trabajos/trabajos_promueve/stands-2014-biemh-bilbao-zayer-17.avif",
    "alt": "Montaje de stand a medida en carpintería de madera para Zayer en BIEMH Bilbao 2014",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_13",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_13",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_13",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_13",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_13",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_13"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-2014-biemh-bilbao-zayer-20.avif",
    "full": "img/trabajos/trabajos_promueve/stands-2014-biemh-bilbao-zayer-20.avif",
    "alt": "Construcción de stand corporativo con acabados limpios para Zayer en BIEMH Bilbao",
    "categories": [
      "feria",
      "carpinteria"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14",
      "en": "exhibition_stand_for_company_machine_tools_in_bilbao_spain_14",
      "de": "messestand_fuer_unternehmen_werkzeugmaschinen_in_bilbao_spanien_14",
      "pt": "estande_para_empresa_de_maquina_ferramenta_em_bilbau_espanha_14",
      "zh": "xibanya_bibao_jichuang_gongsi_zhanwei_14",
      "hi": "bilabao_spen_mein_mashin_tools_kampani_ke_liye_pradarshani_staind_14",
      "fr": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14",
      "it": "stand_para_empresa_de_maquina_herramienta_en_bilbao_spain_14"
    }
  },
  {
    "thumb": "img/trabajos/trabajos_promueve/thumbs/stands-pescanova.avif",
    "full": "img/trabajos/trabajos_promueve/stands-pescanova.avif",
    "alt": "Zona de exposición y mostrador de atención al público en el stand de Pescanova",
    "categories": [
      "alimentacion"
    ],
    "slugs": {
      "es": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2",
      "en": "exhibition_stand_for_company_seafood_food_in_bilbao_spain_2",
      "de": "messestand_fuer_unternehmen_meeresfruechte_in_bilbao_spanien_2",
      "pt": "estande_para_empresa_de_alimentacao_frutos_mar_em_bilbau_espanha_2",
      "zh": "xibanya_bibao_haixian_shipin_gongsi_zhanwei_2",
      "hi": "bilabao_spen_mein_samudree_bhojan_kampani_ke_liye_pradarshani_staind_2",
      "fr": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2",
      "it": "stand_para_empresa_de_alimentacion_pescado_en_bilbao_spain_2"
    }
  }
];

export function pathFor(lang, section = 'home') {
  const slug = routes[lang]?.[section] ?? '';
  const prefix = lang === 'es' ? '' : `/${lang}`;
  return `${prefix}${slug ? `/${slug}` : '/'}`;
}

// --- Ferias: segmento y slug por idioma -------------------------------------
// El detalle de feria es /{lang}/{segmento}/{slug}. Para `ja` el segmento es
// 展示会情報 (japonés nativo) y el slug se traduce (jaFairSlugs); el resto de
// idiomas mantienen el segmento 'ferias' y el slug latino compartido.
export function fairSegment(lang) {
  return lang === 'ja' ? (routes.ja.ferias || 'ferias') : 'ferias';
}
/** slug latino de feria -> slug a usar en la URL para ese idioma */
export function getFairSlug(slug, lang) {
  return (lang === 'ja' && jaFairSlugs[slug]) || slug;
}
/** URL relativa del detalle de una feria (a partir del slug latino). */
export function fairUrl(slug, lang) {
  const prefix = lang === 'es' ? '' : `/${lang}`;
  return `${prefix}/${fairSegment(lang)}/${getFairSlug(slug, lang)}`;
}

// --- Hubs de actividad: árbol de etiquetas para interconexión interna ---------
// Segmento literal 'actividad' en todos los idiomas (igual criterio que el
// segmento 'ferias' del detalle de feria). El slug de etiqueta es compartido y
// latino en todos los idiomas (como los slugs de feria). El índice agrupa las
// 41 actividades; cada hub /actividad/<tag> reúne las ferias de esa actividad.
export const ACTIVITY_SEGMENT = 'actividad';
/** URL relativa del índice de actividades. */
export function activityIndexUrl(lang) {
  const prefix = lang === 'es' ? '' : `/${lang}`;
  return `${prefix}/${ACTIVITY_SEGMENT}`;
}
/** URL relativa del hub de una actividad. */
export function activityUrl(tag, lang) {
  const prefix = lang === 'es' ? '' : `/${lang}`;
  return `${prefix}/${ACTIVITY_SEGMENT}/${tag}`;
}

// --- Proyectos: solo `ja` tiene URL propia (/ja/プロジェクト/{slug-japonés}).
// El resto de idiomas comparten /proyectos/{id} (ruta única, idioma por ?lang=).
export function getProjectSlug(id, lang) {
  return (lang === 'ja' && jaProjectSlugs[id]) || id;
}
/** URL relativa del detalle de un proyecto. */
export function projectUrl(id, lang) {
  if (lang === 'ja') return `/ja/プロジェクト/${getProjectSlug(id, 'ja')}`;
  return `/proyectos/${id}${lang && lang !== 'es' ? `?lang=${lang}` : ''}`;
}

// Botón CTA del menú ("Presupuesto en 24h"): dividido en la palabra principal y el
// sufijo "en 24h", para poder ocultar el sufijo en pantallas medianas (evita que el
// botón salte a dos líneas y deforme el menú). El sufijo se envuelve en .cta-24h.
const ctaMain = {
  es: 'Presupuesto', en: 'Quote', de: 'Angebot', pt: 'Orçamento', fr: 'Devis', it: 'Preventivo',
  nl: 'Offerte', zh: '24小时内报价', hi: '24 घंटे में कोटेशन', ko: '24시간 내 견적', ja: '24時間で見積もり'
};
const cta24h = {
  es: 'en 24h', en: 'in 24h', de: 'in 24h', pt: 'em 24h', fr: 'en 24h', it: 'in 24h',
  nl: 'binnen 24u', zh: '', hi: '', ko: '', ja: ''
};
export function ctaBudget(lang) {
  const main = ctaMain[lang] || ctaMain.es;
  const s = (lang in cta24h ? cta24h[lang] : cta24h.es);
  return { main, h24: s ? ' ' + s : '' };
}

// Etiqueta corta "Precios" para el botón del sidebar (antes "Precios de stands").
export const preciosNav = {
  es: 'Precios', en: 'Prices', de: 'Preise', pt: 'Preços', fr: 'Tarifs', it: 'Prezzi',
  nl: 'Prijzen', zh: '价格', hi: 'मूल्य', ko: '가격', ja: '料金'
};

export function findRoute(path) {
  const clean = (path || '').replace(/^\/+|\/+$/g, '');
  if (clean === '') return { lang: 'es', section: 'home' };
  const parts = clean.split('/');
  const maybeLang = languages.includes(parts[0]) ? parts.shift() : 'es';
  const slug = parts.join('/');
  const langRoutes = routes[maybeLang] || routes.es;
  // Detalle de feria: acepta el segmento del idioma (ja: 展示会情報) y, por compat,
  // el 'ferias' antiguo. El fairSlug devuelto es siempre el latino (clave de datos).
  const seg = fairSegment(maybeLang);
  for (const candidate of [seg, 'ferias']) {
    if (slug.startsWith(candidate + '/')) {
      const raw = slug.substring(candidate.length + 1);
      const fairSlug = (maybeLang === 'ja' ? (jaFairSlugsReverse[raw] || raw) : raw);
      return { lang: maybeLang, section: 'feria', fairSlug };
    }
  }
  // Detalle de proyecto en japonés: /ja/プロジェクト/{slug-japonés}. El projectId
  // devuelto es siempre el id latino (clave de projectData).
  if (maybeLang === 'ja' && slug.startsWith('プロジェクト/')) {
    const raw = slug.substring('プロジェクト/'.length);
    const projectId = jaProjectSlugsReverse[raw] || raw;
    return { lang: 'ja', section: 'project', projectId };
  }
  // Hubs de actividad: /{lang}/actividad (índice) y /{lang}/actividad/<tag>.
  if (slug === ACTIVITY_SEGMENT) {
    return { lang: maybeLang, section: 'activityIndex' };
  }
  if (slug.startsWith(ACTIVITY_SEGMENT + '/')) {
    const tag = slug.substring(ACTIVITY_SEGMENT.length + 1);
    return { lang: maybeLang, section: 'activity', tag };
  }
  const section = Object.keys(langRoutes).find((key) => langRoutes[key] === slug) || 'home';
  return { lang: maybeLang, section };
}

export function resolveRoute(path) {
  const { lang, section, fairSlug, projectId, tag } = findRoute(path);
  const c = copy[lang] || copy.es;
  // Ferias, proyectos ja y hubs de actividad no son claves de routes; su canónica
  // es su propia URL.
  let canonical;
  if (section === 'feria' && fairSlug) canonical = `${SITE_ORIGIN}${fairUrl(fairSlug, lang)}`;
  else if (section === 'project' && projectId) canonical = `${SITE_ORIGIN}${projectUrl(projectId, lang)}`;
  else if (section === 'activityIndex') canonical = `${SITE_ORIGIN}${activityIndexUrl(lang)}`;
  else if (section === 'activity' && tag) canonical = `${SITE_ORIGIN}${activityUrl(tag, lang)}`;
  else canonical = `${SITE_ORIGIN}${pathFor(lang, section)}`;
  return { lang, section, fairSlug, projectId, tag, copy: c, canonical };
}

// Secciones que StandQuote no ofrece: sus páginas ni se generan en esa marca.
export const SQ_REMOVED_SECTIONS = new Set([
  'noticias', 'precios', 'proyecto_auditado', 'custom', 'team',
  // Las páginas de "constructor de stands" son un activo defensivo de Standarte.
  'constructor_stand_madrid', 'constructor_stand_barcelona',
  'constructor_stand_zaragoza', 'constructor_stand_oporto', 'constructor_stand_lisboa',
  'constructor_stand_bilbao', 'constructor_stand_badajoz', 'constructor_stand_don_benito'
]);

export const prerenderEntries = languages.flatMap((lang) => {
  const normalRoutes = Object.keys(routes[lang])
    .filter((section) => !(BRAND.leadGen && SQ_REMOVED_SECTIONS.has(section)))
    .map((section) => ({ path: pathFor(lang, section).replace(/^\/|\/$/g, '') }));
  const fairRoutes = fairsData.map((fair) => ({ path: fairUrl(fair.slug, lang).replace(/^\//, '') }));
  // Solo `ja` tiene páginas de proyecto propias (/ja/プロジェクト/{slug}); los ids salen
  // de las claves de jaProjectSlugs (evita importar projectData, 3,7 MB, en el cliente).
  const projectRoutes = lang === 'ja'
    ? Object.keys(jaProjectSlugs).map((id) => ({ path: projectUrl(id, 'ja').replace(/^\//, '') }))
    : [];
  // Hubs de actividad: índice + un hub por etiqueta, en cada idioma.
  const activityRoutes = [
    { path: activityIndexUrl(lang).replace(/^\//, '') },
    ...tagOrder.map((tag) => ({ path: activityUrl(tag, lang).replace(/^\//, '') }))
  ];
  return [...normalRoutes, ...fairRoutes, ...projectRoutes, ...activityRoutes];
}).filter((entry) => entry.path !== '');
