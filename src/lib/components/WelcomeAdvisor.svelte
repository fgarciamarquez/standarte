<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { colorForTag, labelForTag, tagOrder, tagFamilies, fairTags, familyLabel } from '$lib/fairTags.js';
  import { activityUrl } from '$lib/siteData.js';
  import { activityPitch } from '$lib/activityPitch.js';
  import { advisorDismissed } from '$lib/stores/advisor.js';

  // Malla ibérica (PatMesh): NO se importa de forma estática. El propio panel de
  // Pat ya se carga en diferido; el mapa se descarga en un chunk aparte con un
  // retardo adicional tras montarse el panel, para no penalizar la carga inicial.
  let MeshComponent = null;

  export let lang = 'en';
  // Modo "embebido": inline dentro de una página (p. ej. bajo una noticia). Ocupa el 100%
  // del ancho del contenedor padre (para igualar el cuerpo del artículo).
  export let embedded = false;
  // Switch "Activo" del pie que oculta el panel durante la sesión. En modo embebido no
  // queremos que se pueda desactivar, así que se pasa dismissible={false}.
  export let dismissible = true;
  // Sector inicial (clave de tagFamilies): cuando Pat se abre desde una página de feria
  // (CTA contextual "#pat=<familia>"), arranca ya en el sector de esa feria.
  export let initialFamily = '';
  // Etiquetas a preseleccionar dentro de initialFamily (p. ej. desde un hub de
  // /actividad): Pat abre en el paso 2 con ellas marcadas y el mapa resaltado.
  export let initialTags = [];
  // Ciudad de la página (páginas de ciudad): el mapa arranca con su :hover por defecto.
  export let initialCity = '';
  // Color de fondo del contenedor del panel (opcional). Por defecto transparente;
  // en las páginas de actividad (/actividad/*) se pasa un tono claro de fondo.
  export let containerBg = '';

  const dispatch = createEventDispatcher();

  let selectedFamily = '';   // clave de familia de etiquetas (tagFamilies)
  let selectedTags = [];     // etiquetas elegidas dentro de la familia (multiselección)
  let previewTags = [];      // etiquetas en preview por :hover sobre un botón (adelanto del click)
  let currentStep = 1;       // 1 = familia, 2 = etiquetas (multi), 3 = formulario

  let cardExpanded = false;
  let profileVisible = false;
  let citiesVisible = false; // revela el grid tras la animación de tecleo

  let name = '';
  let email = '';
  let privacyAccepted = false;
  let status = 'idle'; // 'idle', 'sending', 'success', 'error'
  let statusMessage = '';
  // URL de origen: la página desde la que el visitante rellena el formulario.
  let sourceUrl = '';
  // Anti-spam: honeypot (debe quedar vacío) + marca de tiempo para descartar envíos instantáneos.
  let honeypot = '';
  let mountTime = 0;

  // ─── Selección por etiquetas: familia → etiquetas (multiselección) ──────
  // Pat ya solo usa el método por etiquetas. Paso 1: el visitante elige la
  // familia (sector); paso 2: marca una o varias etiquetas de esa familia.
  // Todo sale de la taxonomía (tagFamilies / fairTags), así que cualquier
  // etiqueta o familia nueva aparece aquí AUTOMÁTICAMENTE.
  const families = Object.keys(tagFamilies).map((fam) => ({ key: fam, color: tagFamilies[fam].color }));
  const tagsOfFamily = (fam) => tagOrder.filter((t) => fairTags[t].family === fam);
  const texts = {
    es: {
      title: "Hola!, soy Pat.",
      freeBadge: "Servicio gratuito",
      activeLabel: "Activo",
      intro: "Además de contratar un stand, puedes planificar una expansión.\nAbajo te muestro nuestro mapa de cobertura.",
      instruction: "En base a lo que ya conoces, definiré tu perfil. Selecciona una ciudad.",
      cta: "Obtener presupuesto para esta feria",
      formInstruction: "Por favor, introduce tus datos y te enviaré un breve informe con las ferias más interesantes para tu sector.",
      fairInstruction: "Perfecto!, ahora selecciona una feria!!",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "Tu Correo Profesional",
      privacyLabel: "Acepto la política de privacidad",
      privacyLabelHtml: "Acepto la <span class=\"adv-privacy-link\">política de privacidad</span>",
      sendBtn: "Enviar",
      sending: "Enviando...",
      thanksTitle: "Gracias",
      successMsg: "En breve me pondré en contacto contigo",
      errorMsg: "Ocurrió un error. Por favor, inténtalo de nuevo o utiliza el formulario de contacto de abajo.",
      defaultDescription: "Solicitud de diseño de stand desde el asesor interactivo."
    },
    en: {
      title: "Hi! I'm Pat.",
      freeBadge: "Free service",
      activeLabel: "Active",
      intro: "If you are looking to expand in Spain and Portugal, build a plan with us.\nWe offer you nationwide presence and cost-saving synergies.",
      instruction: "Based on what you already know, I'll define your profile. Select a city.",
      cta: "Get a quote for this fair",
      formInstruction: "Please enter your details and I'll send you a brief report with the most interesting trade shows for your sector.",
      fairInstruction: "Perfect! Now choose a trade show!!",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Business Email",
      privacyLabel: "I accept the privacy policy",
      privacyLabelHtml: "I accept the <span class=\"adv-privacy-link\">privacy policy</span>",
      sendBtn: "Send Request",
      sending: "Sending...",
      thanksTitle: "Thank you",
      successMsg: "I will contact you shortly",
      errorMsg: "An error occurred. Please try again or use the contact form below.",
      defaultDescription: "Stand construction request from interactive advisor."
    },
    pt: {
      title: "Olá!, sou a Pat.",
      freeBadge: "Serviço gratuito",
      activeLabel: "Ativo",
      intro: "Se procura expandir-se em Espanha e Portugal, defina um plano connosco.\nOferecemos-lhe presença global e sinergias de poupança.",
      instruction: "Com base no que já conhece, vou definir o seu perfil. Escolha uma cidade.",
      cta: "Pedir orçamento para esta feira",
      formInstruction: "Por favor, introduza os seus dados e enviar-lhe-ei um breve relatório com as feiras mais interessantes para o seu setor.",
      fairInstruction: "Perfeito! Agora escolha uma feira!!",
      namePlaceholder: "Seu Nome",
      emailPlaceholder: "Seu E-mail Corporativo",
      privacyLabel: "Aceito a política de privacidade",
      privacyLabelHtml: "Aceito a <span class=\"adv-privacy-link\">política de privacidade</span>",
      sendBtn: "Enviar Pedido",
      sending: "A enviar...",
      thanksTitle: "Obrigada",
      successMsg: "Entrarei em contacto consigo em breve",
      errorMsg: "Ocorreu um erro. Por favor, tente novamente ou use o formulário de contacto abaixo.",
      defaultDescription: "Pedido de construção de stand a partir do assessor virtual."
    },
    de: {
      title: "Hallo!, ich bin Pat.",
      freeBadge: "Kostenloser Service",
      activeLabel: "Aktiv",
      intro: "Wenn Sie in Spanien und Portugal expandieren möchten, erstellen Sie mit uns einen Plan.\nWir bieten Ihnen flächendeckende Präsenz und Einsparsynergien.",
      instruction: "Anhand dessen, was Sie bereits kennen, erstelle ich Ihr Profil. Wählen Sie eine Stadt.",
      cta: "Angebot für diese Messe anfordern",
      formInstruction: "Bitte geben Sie Ihre Daten ein und ich sende Ihnen einen kurzen Bericht mit den interessantesten Messen für Ihre Branche.",
      fairInstruction: "Perfekt! Wählen Sie jetzt eine Messe!!",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre geschäftliche E-Mail",
      privacyLabel: "Ich akzeptiere die Datenschutzerklärung",
      privacyLabelHtml: "Ich akzeptiere die <span class=\"adv-privacy-link\">Datenschutzerklärung</span>",
      sendBtn: "Anfrage senden",
      sending: "Wird gesendet...",
      thanksTitle: "Vielen Dank",
      successMsg: "Ich werde mich in Kürze mit Ihnen in Verbindung setzen",
      errorMsg: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder nutzen Sie das Kontaktformular unten.",
      defaultDescription: "Messestand-Anfrage über den virtuellen Berater."
    },
    fr: {
      title: "Bonjour !, je suis Pat.",
      freeBadge: "Service gratuit",
      activeLabel: "Actif",
      intro: "Si vous cherchez à vous développer en Espagne et au Portugal, établissez un plan avec nous.\nNous vous offrons une présence globale et des synergies d'économies.",
      instruction: "À partir de ce que vous connaissez déjà, je définirai votre profil. Choisissez une ville.",
      cta: "Demander un devis pour ce salon",
      formInstruction: "Veuillez saisir vos coordonnées et je vous enverrai un bref rapport avec les salons les plus intéressants pour votre secteur.",
      fairInstruction: "Parfait ! Choisissez maintenant un salon !!",
      namePlaceholder: "Votre Nom",
      emailPlaceholder: "Votre E-mail Professionnel",
      privacyLabel: "J'accepte la politique de confidentialité",
      privacyLabelHtml: "J'accepte la <span class=\"adv-privacy-link\">política de confidentialité</span>",
      sendBtn: "Envoyer la demande",
      sending: "Envoi en cours...",
      thanksTitle: "Merci",
      successMsg: "Je vous contacterai sous peu",
      errorMsg: "Une erreur est survenue. Veuillez réessayer ou utiliser le formulaire de contact ci-dessous.",
      defaultDescription: "Demande de conception de stand via le conseiller interactif."
    },
    it: {
      title: "Ciao!, sono Pat.",
      freeBadge: "Servizio gratuito",
      activeLabel: "Attivo",
      intro: "Se desideri espanderti in Spagna e Portogallo, definisci un piano con noi.\nTi offriamo presenza globale e sinergie di risparmio.",
      instruction: "In base a ciò che già conosci, definirò il tuo profilo. Scegli una città.",
      cta: "Richiedi un preventivo per questa fiera",
      formInstruction: "Inserisci i tuoi dati e ti invierò un breve report con le fiere più interessanti per il tuo settore.",
      fairInstruction: "Perfetto! Ora scegli una fiera!!",
      namePlaceholder: "Il tuo Nome",
      emailPlaceholder: "La tua Email Aziendale",
      privacyLabel: "Accetto l'informativa sulla privacy",
      privacyLabelHtml: "Accetto l'<span class=\"adv-privacy-link\">informativa sulla privacy</span>",
      sendBtn: "Invia Richiesta",
      sending: "Invio in corso...",
      thanksTitle: "Grazie",
      successMsg: "Ti contatterò a breve",
      errorMsg: "Si è verificato un errore. Riprova o utiliza el modulo di contatto sottostante.",
      defaultDescription: "Richiesta di progettazione stand dall'assistente virtuale."
    },
    nl: {
      title: "Hallo!, ik ben Pat.",
      freeBadge: "Gratis service",
      activeLabel: "Actief",
      intro: "Als u wilt uitbreiden in Spanje en Portugal, stel dan samen met ons een plan op.\nWij bieden u landelijke dekking en besparingssynergieën.",
      instruction: "Op basis van wat u al kent, bepaal ik uw profiel. Kies een stad.",
      cta: "Vraag een offerte aan voor deze beurs",
      formInstruction: "Voer uw gegevens in en ik stuur u een kort rapport met de interessantste beurzen voor uw sector.",
      fairInstruction: "Perfect! Kies nu een beurs!!",
      namePlaceholder: "Uw Naam",
      emailPlaceholder: "Uw Zakelijk E-mailadres",
      privacyLabel: "Ik accepteer het privacybeleid",
      privacyLabelHtml: "Ik accepteer het <span class=\"adv-privacy-link\">privacybeleid</span>",
      sendBtn: "Aanvraag Verzenden",
      sending: "Verzenden...",
      thanksTitle: "Bedankt",
      successMsg: "Ik neem spoedig contact met u op",
      errorMsg: "Er is een fout opgetreden. Probeer het opnieuw of gebruik het onderstaande contactformulier.",
      defaultDescription: "Standbouwaanvraag via de interactieve adviseur."
    },
    zh: {
      title: "你好！我是 Pat。",
      freeBadge: "免费服务",
      activeLabel: "已启用",
      intro: "如果您想在西班牙和葡萄牙拓展业务，就与我们一起制定计划吧。\n我们为您提供全域覆盖和降本增效的协同优势。",
      instruction: "根据您已了解的情况，我会确定您的需求画像。请选择一个城市。",
      cta: "索取该展会的报价",
      formInstruction: "请填写您的信息，我会向您发送一份简要报告，列出最适合您所在行业的展会。",
      fairInstruction: "太棒了！现在选择一个展会吧！！",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "您的企业邮箱",
      privacyLabel: "我接受隐私政策",
      privacyLabelHtml: "我接受<span class=\"adv-privacy-link\">隐私政策</span>",
      sendBtn: "发送请求",
      sending: "正在发送...",
      thanksTitle: "谢谢",
      successMsg: "我很快会与您联系",
      errorMsg: "发生错误。请重试或使用下方的联系表格。",
      defaultDescription: "来自互动顾问的展台设计请求。"
    },
    hi: {
      title: "नमस्ते!, मैं Pat हूँ।",
      freeBadge: "निःशुल्क सेवा",
      activeLabel: "सक्रिय",
      intro: "यदि आप स्पेन और पुर्तगाल में विस्तार करना चाहते हैं, तो हमारे साथ एक योजना बनाएं।\nहम आपको व्यापक उपस्थिति और बचत की सिनर्जी प्रदान करते हैं।",
      instruction: "आप जो पहले से जानते हैं उसके आधार पर, मैं आपकी प्रोफ़ाइल तय करूँगी। एक शहर चुनें।",
      cta: "इस मेले के लिए कोटेशन प्राप्त करें",
      formInstruction: "कृपया अपनी जानकारी दर्ज करें, और मैं आपको आपके क्षेत्र के लिए सबसे दिलचस्प मेलों के साथ एक संक्षिप्त रिपोर्ट भेजूँगी।",
      fairInstruction: "बिल्कुल सही! अब एक मेला चुनें!!",
      namePlaceholder: "आपका नाम",
      emailPlaceholder: "आपका व्यावसायिक ईमेल",
      privacyLabel: "मैं गोपनीयता नीति स्वीकार करता हूँ",
      privacyLabelHtml: "मैं <span class=\"adv-privacy-link\">गोपनीयता नीति</span> स्वीकार करता हूँ",
      sendBtn: "अनुरोध भेजें",
      sending: "भेजा जा रहा है...",
      thanksTitle: "धन्यवाद",
      successMsg: "मैं शीघ्र ही आपसे संपर्क करूँगा",
      errorMsg: "एक त्रुटि हुई। कृपया पुनः प्रयास करें या नीचे दिए गए संपर्क फ़ॉर्म का उपयोग करें.",
      defaultDescription: "इंटरैक्टिव सलाहकार से स्टैंड डिज़ाइन अनुरोध।"
    },
    ko: {
      title: "안녕하세요! Pat입니다.",
      freeBadge: "무료 서비스",
      activeLabel: "활성",
      intro: "스페인과 포르투갈에서 사업을 확장하고자 하신다면, 저희와 함께 계획을 세워 보세요.\n전국적인 커버리지와 비용 절감 시너지를 제공해 드립니다.",
      instruction: "이미 알고 계신 내용을 바탕으로 고객님의 프로필을 파악하겠습니다. 도시를 선택해 주세요.",
      cta: "이 전시회 견적 요청하기",
      formInstruction: "정보를 입력해 주시면, 귀하의 업종에 가장 적합한 전시회를 정리한 간략한 리포트를 보내드리겠습니다.",
      fairInstruction: "좋습니다! 이제 전시회를 선택해 주세요!!",
      namePlaceholder: "이름",
      emailPlaceholder: "회사 이메일 주소",
      privacyLabel: "개인정보 처리방침에 동의합니다",
      privacyLabelHtml: "<span class=\"adv-privacy-link\">개인정보 처리방침</span>에 동의합니다",
      sendBtn: "요청 보내기",
      sending: "전송 중...",
      thanksTitle: "감사합니다",
      successMsg: "곧 연락드리겠습니다",
      errorMsg: "오류가 발생했습니다. 다시 시도하시거나 아래 문의 양식을 이용해 주세요.",
      defaultDescription: "대화형 어드바이저를 통한 부스 디자인 요청."
    },
    ja: {
      title: "こんにちは！Patです。",
      freeBadge: "無料サービス",
      activeLabel: "有効",
      intro: "スペインやポルトガルでの事業拡大をお考えなら、私たちと一緒にプランを立てましょう。\n広域カバレッジとコスト削減のシナジーをご提供します。",
      instruction: "すでにご存じの内容をもとに、お客様のプロフィールを把握します。都市を選択してください。",
      cta: "この展示会の見積もりを依頼する",
      formInstruction: "お客様の情報をご入力いただければ、お客様の業種に最適な展示会をまとめた簡単なレポートをお送りします。",
      fairInstruction: "完璧です！では、展示会を1つ選んでください！！",
      namePlaceholder: "お名前",
      emailPlaceholder: "会社用メールアドレス",
      privacyLabel: "個人情報保護方針に同意します",
      privacyLabelHtml: "<span class=\"adv-privacy-link\">個人情報保護方針</span>に同意します",
      sendBtn: "送信する",
      sending: "送信中...",
      thanksTitle: "ありがとうございます",
      successMsg: "まもなくご連絡いたします",
      errorMsg: "エラーが発生しました。もう一度お試しいただくか、以下の問い合わせフォームをご利用ください。",
      defaultDescription: "バーチャルアドバイザーからの展示会ブースデザイン設計依頼。"
    }
  };

  $: t = texts[lang] || texts.en;

  // Textos del flujo (separados de `texts` para no tocar los 11 bloques): prompt
  // del paso 1 (familia), prompt del paso 2 (etiquetas) y botones.
  const flowTexts = {
    es: { familyPrompt: 'Para empezar, ¿a qué sector pertenece tu actividad?', tagsPrompt: 'Marca todas las actividades que te interesen.', continueBtn: 'Continuar', changeFamily: 'Cambiar de sector', resultLabel: 'Resultado' },
    en: { familyPrompt: 'To start, which sector is your business in?', tagsPrompt: 'Tick all the activities that interest you.', continueBtn: 'Continue', changeFamily: 'Change sector', resultLabel: 'Result' },
    pt: { familyPrompt: 'Para começar, a que setor pertence a sua atividade?', tagsPrompt: 'Marque todas as atividades que lhe interessam.', continueBtn: 'Continuar', changeFamily: 'Mudar de setor', resultLabel: 'Resultado' },
    de: { familyPrompt: 'Zu welcher Branche gehört Ihr Geschäft?', tagsPrompt: 'Markieren Sie alle Tätigkeiten, die Sie interessieren.', continueBtn: 'Weiter', changeFamily: 'Branche ändern', resultLabel: 'Ergebnis' },
    fr: { familyPrompt: 'Pour commencer, de quel secteur relève votre activité ?', tagsPrompt: 'Cochez toutes les activités qui vous intéressent.', continueBtn: 'Continuer', changeFamily: 'Changer de secteur', resultLabel: 'Résultat' },
    it: { familyPrompt: 'Per iniziare, a quale settore appartiene la tua attività?', tagsPrompt: 'Seleziona tutte le attività che ti interessano.', continueBtn: 'Continua', changeFamily: 'Cambia settore', resultLabel: 'Risultato' },
    nl: { familyPrompt: 'Om te beginnen, in welke branche valt uw activiteit?', tagsPrompt: 'Vink alle activiteiten aan die u interesseren.', continueBtn: 'Doorgaan', changeFamily: 'Branche wijzigen', resultLabel: 'Resultaat' },
    zh: { familyPrompt: '首先，您的业务属于哪个行业？', tagsPrompt: '勾选所有您感兴趣的活动。', continueBtn: '继续', changeFamily: '更换行业', resultLabel: '结果' },
    hi: { familyPrompt: 'शुरू करने के लिए, आपका व्यवसाय किस क्षेत्र में है?', tagsPrompt: 'अपनी रुचि की सभी गतिविधियाँ चुनें।', continueBtn: 'जारी रखें', changeFamily: 'क्षेत्र बदलें', resultLabel: 'परिणाम' },
    ko: { familyPrompt: '먼저, 어떤 분야의 사업이신가요?', tagsPrompt: '관심 있는 활동을 모두 선택하세요.', continueBtn: '계속', changeFamily: '분야 변경', resultLabel: '결과' },
    ja: { familyPrompt: 'まず、お客様の事業はどの分野ですか？', tagsPrompt: '関心のある分野をすべて選択してください。', continueBtn: '次へ', changeFamily: '分野を変更', resultLabel: '結果' }
  };
  $: ft = flowTexts[lang] || flowTexts.en;

  // Derivados de la selección.
  $: familyTags = selectedFamily ? tagsOfFamily(selectedFamily) : [];
  $: selectedTagLabels = selectedTags.map((t) => labelForTag(t, lang));
  // Resultados en vivo: cada etiqueta marcada -> su hub /actividad/<tag> (URL absoluta),
  // en orden de selección, para que el visitante salte al instante a lo que busca.
  $: tagResults = selectedTags.map((tag) => ({
    tag,
    label: labelForTag(tag, lang),
    url: `https://standarte.es${activityUrl(tag, lang)}`
  }));

  // Single Shared AudioContext Instance and preloaded AudioBuffers
  let audioCtx = null;
  let chimePlayed = false;
  let chimeBuffer = null;
  let clickBuffer = null;
  // Se pone a true de forma SÍNCRONA en el primer gesto del usuario; a partir de
  // ahí los sonidos se reproducen sin descartar el primero (la política del
  // navegador impide cualquier audio antes de ese gesto).
  let audioUnlocked = false;

  function preloadBuffers(ctx) {
    if (!ctx) return;
    try {
      const sampleRate = ctx.sampleRate;
      
      // Chime Buffer (0.3s)
      const chimeDuration = Math.ceil(0.3 * sampleRate);
      const chimeBuf = ctx.createBuffer(1, chimeDuration, sampleRate);
      const chimeData = chimeBuf.getChannelData(0);
      const d5 = 587.33;
      const a5 = 880.00;
      
      for (let i = 0; i < chimeDuration; i++) {
        const t = i / sampleRate;
        let val = 0;
        if (t < 0.12) {
          const amp = 0.08 * Math.exp(-t * 30);
          val += amp * Math.sin(2 * Math.PI * d5 * t);
        }
        if (t >= 0.08 && t < 0.28) {
          const t2 = t - 0.08;
          const amp = 0.08 * Math.exp(-t2 * 25);
          val += amp * Math.sin(2 * Math.PI * a5 * t2);
        }
        chimeData[i] = val;
      }
      chimeBuffer = chimeBuf;

      // Click Buffer (0.02s)
      const clickDuration = Math.ceil(0.02 * sampleRate);
      const clickBuf = ctx.createBuffer(1, clickDuration, sampleRate);
      const clickData = clickBuf.getChannelData(0);
      
      for (let i = 0; i < clickDuration; i++) {
        const t = i / sampleRate;
        const freq = 1400 * Math.exp(-t * 97.3);
        const phase = 2 * Math.PI * (1400 / -97.3) * (Math.exp(-t * 97.3) - 1);
        const normPhase = (phase / (2 * Math.PI)) % 1.0;
        const triVal = 2 * Math.abs(2 * (normPhase - Math.floor(normPhase + 0.5))) - 1;
        const amp = 0.015 * Math.exp(-t * 150);
        clickData[i] = triVal * amp;
      }
      clickBuffer = clickBuf;
    } catch (e) {
      // Ignored
    }
  }

  function getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        preloadBuffers(audioCtx);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playBuffer(buf) {
    // Hasta el primer gesto NO programamos nada (evita una ráfaga de sonidos al
    // reanudar). Tras el gesto reproducimos aunque el resume aún esté en curso:
    // el sonido se programa y suena al instante, sin descartarse.
    if (!buf || !audioUnlocked) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const source = ctx.createBufferSource();
      source.buffer = buf;
      source.connect(ctx.destination);
      source.start();
    } catch (e) {
      // Ignored
    }
  }

  // Reproduce un buffer silencioso de 1 muestra para "despertar" la cadena de
  // audio en el primer gesto, de modo que el primer sonido real no llegue tarde.
  function warmUp(ctx) {
    try {
      const b = ctx.createBuffer(1, 1, ctx.sampleRate);
      const s = ctx.createBufferSource();
      s.buffer = b;
      s.connect(ctx.destination);
      s.start(0);
    } catch (e) {
      // Ignored
    }
  }

  function playNotificationSound() {
    playBuffer(chimeBuffer);
  }

  function playTypewriterSound() {
    playBuffer(clickBuffer);
  }

  function triggerNotificationChime() {
    if (chimePlayed || !audioUnlocked) return;
    try {
      playNotificationSound();
      chimePlayed = true;
    } catch (e) {
      // Ignored
    }
  }

  let typedText = '';
  let typingInterval;
  let dismissTimers = [];

  function typeText(text) {
    clearInterval(typingInterval);
    typedText = '';
    let i = 0;
    typingInterval = setInterval(() => {
      if (i < text.length) {
        typedText += text.charAt(i);
        if (text.charAt(i) !== ' ') {
          playTypewriterSound();
        }
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          citiesVisible = true;
        }, 200);
      }
    }, 25);
  }

  // Reactive typewriter trigger that restarts on language, step, or success status changes
  let lastStep = 1;
  let lastLang = '';
  let lastStatus = 'idle';
  $: if (profileVisible && lang) {
    if (currentStep !== lastStep || lang !== lastLang || status !== lastStatus) {
      lastStep = currentStep;
      lastLang = lang;
      lastStatus = status;

      if (status === 'success') {
        typeText(t.successMsg);
      } else if (currentStep === 1) {
        typeText(ft.familyPrompt);
      } else if (currentStep === 2) {
        typeText(ft.tagsPrompt);
      } else if (currentStep === 3) {
        typeText(t.formInstruction);
      }
    }
  }

  function unlockAudio() {
    const ctx = getAudioContext();
    if (!ctx) return;
    // Desbloqueo SÍNCRONO: aunque resume() sea asíncrono, marcamos ya el audio
    // como activo para que el primer sonido del paso siguiente no se pierda.
    audioUnlocked = true;
    if (!chimeBuffer || !clickBuffer) {
      preloadBuffers(ctx);
    }
    const finish = () => {
      warmUp(ctx);
      if (profileVisible && !chimePlayed) {
        playNotificationSound();
        chimePlayed = true;
      }
    };
    if (ctx.state === 'suspended') {
      ctx.resume().then(finish).catch(() => {});
    } else {
      finish();
    }
    removeUnlockListeners();
  }

  function removeUnlockListeners() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', unlockAudio, { capture: true });
      window.removeEventListener('keydown', unlockAudio, { capture: true });
      window.removeEventListener('touchstart', unlockAudio, { capture: true });
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') sourceUrl = window.location.href;
    mountTime = Date.now();
    // Pre-initialize AudioContext and preload buffers immediately when advisor is mounted
    try {
      const ctx = getAudioContext();
      if (ctx) {
        preloadBuffers(ctx);
      }
    } catch (e) {
      // Ignored
    }

    // 1. Expand the card
    setTimeout(() => {
      cardExpanded = true;
    }, 150);

    // 2. Show the profile and attempt to play chime
    setTimeout(() => {
      profileVisible = true;
      triggerNotificationChime();
    }, 600);

    // Malla ibérica: descarga diferida del chunk del mapa 1,5 s después de
    // montarse el panel (tiempo de sobra para que el flujo de Pat ya esté
    // operativo), y aparece con transición cuando está lista.
    dismissTimers.push(setTimeout(() => {
      import('./PatMesh.svelte')
        .then((m) => { MeshComponent = m.default; })
        .catch(() => {});
    }, 1500));

    // Siembra contextual: si llega con un sector inicial válido (desde una feria),
    // saltamos al paso 2 con ese sector ya elegido (reutiliza selectFamily).
    if (initialFamily && tagFamilies[initialFamily]) {
      setTimeout(() => {
        selectFamily(initialFamily);
        // Si además llega una etiqueta concreta (hub de actividad), la dejamos
        // marcada para que el mapa resalte esa actividad desde el primer momento.
        const valid = (initialTags || []).filter((t) => fairTags[t] && fairTags[t].family === initialFamily);
        if (valid.length) selectedTags = valid;
      }, 1100);
    }

    // Desbloqueo del audio en el primer gesto. Usamos 'pointerdown' (en fase de
    // captura) porque llega ANTES que el 'click', así el audio ya está activo
    // cuando se ejecuta el manejador del botón y suena desde el primer momento.
    if (typeof window !== 'undefined') {
      window.addEventListener('pointerdown', unlockAudio, { capture: true });
      window.addEventListener('keydown', unlockAudio, { capture: true });
      window.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });

      // Si el usuario YA había interactuado con la página antes de montarse el
      // asesor (carga diferida 2 s), el navegador permite reanudar el audio ya:
      // lo desbloqueamos de inmediato para que el chime y el tecleo suenen a tiempo.
      if (navigator.userActivation && navigator.userActivation.hasBeenActive) {
        unlockAudio();
      }
    }

    return () => {
      removeUnlockListeners();
      clearInterval(typingInterval);
      dismissTimers.forEach(clearTimeout);
    };
  });

  // Paso 1 → 2: elegir la familia (sector).
  function selectFamily(fam) {
    clearInterval(typingInterval);
    selectedFamily = fam;
    selectedTags = [];
    previewTags = []; // el mouseleave no dispara al desmontar el botón: se limpia aquí
    currentStep = 2;
    status = 'idle';
    statusMessage = '';
    unlockAudio();
  }

  // Paso 2: marcar/desmarcar etiquetas (multiselección).
  function toggleTag(tag) {
    selectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    // El preview se calcula en el mouseenter y quedaría obsoleto tras el click (sobre
    // todo al deseleccionar sin sacar el ratón): se limpia para que el mapa muestre el
    // estado REAL ya; el preview vuelve a activarse en el siguiente hover.
    previewTags = [];
    unlockAudio();
  }

  // Paso 2 → 3: pasar al formulario (requiere al menos una etiqueta).
  function goToForm() {
    if (!selectedTags.length) return;
    previewTags = []; // evitar preview obsoleto al avanzar al formulario
    currentStep = 3;
    unlockAudio();
    // Avisa al contenedor con un resumen (familia + actividades) para prerrellenar
    // el formulario de presupuesto si procede.
    dispatch('selectFair', { fairName: selectedTagLabels.join(', '), cityName: familyLabel(selectedFamily, lang) });
  }

  // Volver al paso 1 (cambiar de sector).
  function resetFamily() {
    selectedFamily = '';
    selectedTags = [];
    previewTags = []; // limpiar el preview al volver al paso 1
    currentStep = 1;
    status = 'idle';
    statusMessage = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!privacyAccepted) return;

    status = 'sending';
    const formData = new FormData();
    formData.append('form_lang', lang);
    formData.append('form_nombre', name);
    formData.append('form_email', email);
    formData.append('form_feria', `${familyLabel(selectedFamily, lang)} — ${selectedTagLabels.join(', ')}`);
    // URLs de resultado (hubs /actividad/<tag>) para incrustarlas como enlaces
    // funcionales en el correo de acuse al visitante.
    formData.append('form_resultados', JSON.stringify(tagResults.map((r) => ({ label: r.label, url: r.url }))));
    formData.append('form_url', sourceUrl || (typeof window !== 'undefined' ? window.location.href : ''));
    formData.append('form_website', honeypot);
    formData.append('form_elapsed', String(mountTime ? Date.now() - mountTime : 0));
    formData.append('form_privacidad', '1');

    try {
      // Endpoint propio del asesor: NO usa el sistema de filtrado de presupuesto.
      // Solo envía un acuse de recibo al visitante y avisa internamente al equipo.
      const response = await fetch('/admin/ajax_advisor_form.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.error === 'success') {
        status = 'success';
        statusMessage = t.successMsg;
        // No volver a mostrar el asesor durante esta sesión (no molestar).
        advisorDismissed.dismiss();
        // Mostrar el acuse unos segundos, luego colapsar y desaparecer.
        dismissTimers.push(setTimeout(() => { cardExpanded = false; }, 5500));
        dismissTimers.push(setTimeout(() => { dispatch('dismiss'); }, 6400));
      } else {
        status = 'error';
        statusMessage = result.msg || t.errorMsg;
      }
    } catch (e) {
      status = 'error';
      statusMessage = t.errorMsg;
    }
  }

  function handlePrivacyClick(e) {
    if (e.target.classList.contains('adv-privacy-link')) {
      e.preventDefault();
      dispatch('openPrivacy');
    }
  }

  // Clic en un punto-ciudad de la malla: el visitante navega a la página de esa
  // ciudad, así que cerramos el panel para que el cambio de URL sea evidente
  // (sin marcar el descarte de sesión: Pat puede volver a aparecer donde toque).
  function onMeshNavigate() {
    cardExpanded = false;
    dismissTimers.push(setTimeout(() => { dispatch('dismiss'); }, 320));
  }

  // Deslizador "Activo": al desactivarlo, el panel desaparece durante toda la sesión.
  function onActiveToggle(e) {
    if (e.currentTarget.checked) return; // sigue activo
    advisorDismissed.dismiss();
    cardExpanded = false;
    dismissTimers.push(setTimeout(() => { dispatch('dismiss'); }, 320));
  }
</script>

<section class="welcome-advisor-container" class:embedded style={containerBg ? `background:${containerBg}` : ''}>
  <div class="welcome-advisor-card" class:expanded={cardExpanded}>
    
    <div class="advisor-profile" class:visible={profileVisible} class:submitted={status === 'success'}>
      <img
        class="advisor-photo"
        src="/img/team/patricia_jimenez.avif"
        srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
        sizes="100px"
        alt="Patricia Jiménez (Pat)"
        loading="lazy"
        decoding="async"
      />
      <div class="advisor-bubble">
        <div class="advisor-bubble-header">
          <div class="advisor-name-row">
            <h3 class="advisor-name">{status === 'success' ? t.thanksTitle : t.title}</h3>
            <span class="advisor-free-badge">{t.freeBadge}</span>
          </div>

          {#if (selectedFamily || selectedTags.length) && status !== 'success'}
            <div class="advisor-selected-badges" transition:fade>
              {#if selectedFamily}
                <span class="selected-badge-pill" transition:fade style="--chip:{tagFamilies[selectedFamily].color}">
                  <span class="badge-activity-dot" aria-hidden="true"></span>
                  {familyLabel(selectedFamily, lang)}
                  <button type="button" class="remove-badge-btn" on:click={resetFamily} aria-label="×">×</button>
                </span>
              {/if}
              {#each selectedTags as tag (tag)}
                <span class="selected-badge-pill" transition:fade style="--chip:{colorForTag(tag)}">
                  <span class="badge-activity-dot" aria-hidden="true"></span>
                  {labelForTag(tag, lang)}
                  <button type="button" class="remove-badge-btn" on:click={() => toggleTag(tag)} aria-label="×">×</button>
                </span>
              {/each}
            </div>
          {/if}
        </div>

        {#if currentStep < 3 && status !== 'success'}
          <p class="advisor-intro" transition:slide={{ duration: 300 }}>{t.intro}</p>
        {/if}
        
        {#if status === 'error'}
          <p class="advisor-instruction text-error" transition:fade>{statusMessage}</p>
        {:else if status === 'success'}
          <p class="advisor-instruction text-success" transition:fade>{typedText}</p>
        {:else}
          <p class="advisor-instruction">{typedText}</p>
        {/if}

        <!-- Los resultados (enlaces a los hubs /actividad) se muestran ahora dentro
             de la isla del mapa (PatMesh), con la URL reducida. -->
      </div>
    </div>

    <!-- Step 1: selección de FAMILIA (sector) -->
    {#if currentStep === 1}
      <div class="family-grid" class:visible={citiesVisible} transition:slide={{ duration: 400 }}>
        {#each families as f}
          <button
            type="button"
            class="activity-selector-btn family-btn"
            style="--chip:{f.color}"
            on:click={() => selectFamily(f.key)}
            on:mouseenter={() => previewTags = tagsOfFamily(f.key)}
            on:mouseleave={() => previewTags = []}
            on:focus={() => previewTags = tagsOfFamily(f.key)}
            on:blur={() => previewTags = []}
          >
            <span class="badge-activity-dot" aria-hidden="true"></span>{familyLabel(f.key, lang)}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Step 2: selección MÚLTIPLE de etiquetas de la familia elegida -->
    {#if currentStep === 2}
      <div class="tag-multi" transition:slide={{ duration: 400 }}>
        <div class="activity-group-chips">
          <button type="button" class="tag-reset" on:click={resetFamily} title={ft.changeFamily} aria-label={ft.changeFamily}>×</button>
          {#each familyTags as tag}
            <button
              type="button"
              class="activity-selector-btn tag-toggle"
              class:selected={selectedTags.includes(tag)}
              style="--chip:{colorForTag(tag)}"
              aria-pressed={selectedTags.includes(tag)}
              on:click={() => toggleTag(tag)}
              on:mouseenter={() => previewTags = selectedTags.includes(tag) ? selectedTags : [...selectedTags, tag]}
              on:mouseleave={() => previewTags = []}
              on:focus={() => previewTags = selectedTags.includes(tag) ? selectedTags : [...selectedTags, tag]}
              on:blur={() => previewTags = []}
            >
              {#if selectedTags.includes(tag)}<span class="tag-check" aria-hidden="true">✓</span>{/if}{labelForTag(tag, lang)}
            </button>
          {/each}
        </div>
        <!-- El botón "Continuar" se ha integrado en la ventana informativa del mapa
             (isla de PatMesh); avanza el flujo vía el evento 'continue'. -->
      </div>
    {/if}

    <!-- Step 3: Contact Form (Nombre & Email) -->
    {#if currentStep === 3 && status !== 'success'}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <form class="advisor-mini-form" on:submit={handleSubmit} on:click={handlePrivacyClick} transition:slide={{ duration: 400 }}>
        <input type="hidden" name="form_url" bind:value={sourceUrl} />
        <!-- Honeypot anti-spam: oculto a humanos; si un bot lo rellena, se descarta el envío. -->
        <div class="advisor-hp" aria-hidden="true">
          <label for="adv_website">No rellenar este campo</label>
          <input id="adv_website" type="text" name="form_website" tabindex="-1" autocomplete="off" bind:value={honeypot} />
        </div>
        <div class="advisor-form-row">
          <div class="advisor-form-group">
            <label for="adv_nombre" class="advisor-form-label">{t.namePlaceholder}</label>
            <input
              id="adv_nombre"
              type="text"
              class="advisor-form-control"
              bind:value={name}
              required
            />
          </div>
          <div class="advisor-form-group">
            <label for="adv_email" class="advisor-form-label">{t.emailPlaceholder}</label>
            <input
              id="adv_email"
              type="email"
              class="advisor-form-control"
              bind:value={email}
              required
            />
          </div>
        </div>

        <div class="advisor-form-check">
          <input
            id="adv_privacy"
            type="checkbox"
            bind:checked={privacyAccepted}
            required
          />
          <label for="adv_privacy">
            {@html t.privacyLabelHtml}
          </label>
        </div>

        <button type="submit" class="advisor-submit-btn" disabled={status === 'sending' || !privacyAccepted}>
          {status === 'sending' ? t.sending : t.sendBtn}
        </button>
      </form>
    {/if}

    <!-- Malla ibérica: representación gráfica en vivo de la selección de Pat.
         Los botones de sector/actividad de arriba actúan como selector; el mapa
         refleja qué ciudades y ferias corresponden a lo marcado. -->
    {#if MeshComponent && status !== 'success'}
      <div class="advisor-mesh" transition:fade={{ duration: 400 }}>
        <svelte:component this={MeshComponent} {lang} {selectedFamily} {selectedTags} {previewTags} {initialCity} showContinue={currentStep === 2} on:navigate={onMeshNavigate} on:continue={goToForm} />
      </div>
      <!-- Posicionamiento de la malla de actividades bajo el mapa: mismo texto SEO,
           en pequeño y separado por una línea fina. Sin CTA (el mapa ya filtra). -->
      <div class="advisor-activity-pitch">
        <h3>{activityPitch(lang).heading}</h3>
        <p>{activityPitch(lang).text}</p>
      </div>
    {/if}

  </div>

  {#if dismissible && cardExpanded && status !== 'success'}
    <div class="advisor-active-tab" transition:fade>
      <label class="advisor-active-toggle">
        <input type="checkbox" checked role="switch" aria-label={t.activeLabel} on:change={onActiveToggle} />
        <span class="advisor-active-track"><span class="advisor-active-thumb"></span></span>
      </label>
    </div>
  {/if}
</section>

<style>
  .welcome-advisor-container {
    background: transparent;
    padding: 40px 15px;
  }

  .welcome-advisor-card {
    max-width: var(--container);
    margin: 0 auto;
    background: #f8f9fa;
    border: 1px solid #e2e2de;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease;
  }

  .welcome-advisor-card.expanded {
    /* Amplio para dar cabida a la malla ibérica (PatMesh) bajo el flujo del asesor. */
    max-height: 2600px;
    opacity: 1;
  }

  /* Contenedor de la malla ibérica bajo el flujo de Pat. */
  .advisor-mesh {
    margin-top: 26px;
  }

  /* Texto de posicionamiento de la malla de actividades, bajo el mapa: letra
     pequeña y separado por una línea fina. */
  .advisor-activity-pitch {
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  .advisor-activity-pitch h3 {
    margin: 0 0 6px;
    font-size: 14px;
    font-weight: 600;
    color: #3a3f42;
  }
  .advisor-activity-pitch p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: #6b7075;
  }

  /* Modo embebido: el panel ocupa todo el ancho del contenedor padre (iguala el
     cuerpo del artículo en las páginas de noticia), sin padding lateral propio. */
  .welcome-advisor-container.embedded {
    padding: 36px 0 10px;
  }
  .welcome-advisor-container.embedded .welcome-advisor-card {
    max-width: 100%;
  }

  .advisor-profile {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.6s ease, transform 0.6s ease, gap 0.5s ease, margin-bottom 0.5s ease;
  }

  .advisor-profile.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .advisor-profile.submitted {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    margin-bottom: 0;
    width: 100%;
  }

  .advisor-profile.submitted .advisor-bubble {
    width: 100%;
    max-width: 500px;
  }

  .advisor-profile.submitted .advisor-bubble::after {
    display: none;
  }

  .advisor-profile.submitted .advisor-bubble-header {
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .advisor-profile.submitted .advisor-name {
    font-size: 26px;
    width: 100%;
  }

  .advisor-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
    flex-shrink: 0;
  }

  .advisor-bubble {
    background: #f4f4f2;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    flex-grow: 1;
  }

  .advisor-bubble::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 30px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #f4f4f2;
  }

  .advisor-bubble-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .advisor-name {
    margin: 0;
    color: #111;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
  }

  .advisor-name-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* Vitola: etiqueta verde que indica que el asesoramiento es gratuito. */
  .advisor-free-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #ffc800;
    color: #1a1e21;
    font-family: 'Inconsolata', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 4px 11px;
    border-radius: 20px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  .advisor-free-badge::before {
    content: '✓';
    font-size: 12px;
    font-weight: 700;
  }

  .advisor-selected-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .selected-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #bef264;
    color: #1a2e05;
    border: 1px solid #84cc16;
    border-radius: 20px;
    padding: 4px 10px;
    font-family: 'Inconsolata', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    box-shadow: 0 2px 6px rgba(132, 204, 22, 0.2);
  }

  .remove-badge-btn {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .remove-badge-btn:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  .advisor-intro, .advisor-instruction {
    margin: 0 0 8px 0;
    font-size: 15px;
    line-height: 1.5;
    color: #444;
  }

  /* El intro lleva un \n antes de la frase de valor: renderizarlo como salto de línea. */
  .advisor-intro {
    white-space: pre-line;
  }

  .advisor-instruction {
    margin-bottom: 0;
    font-weight: 600;
    color: #111;
    min-height: 22px;
  }

  /* Resultados en vivo bajo el prompt del paso 2: un enlace por etiqueta marcada */
  .adv-results {
    list-style: none;
    margin: 10px 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .adv-result {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px;
    font-size: 14px;
    line-height: 1.4;
  }
  .adv-result-num {
    font-weight: 700;
    color: #111;
    white-space: nowrap;
  }
  .adv-result-link {
    color: royalblue;
    text-decoration: underline;
    word-break: break-all;
  }
  .adv-result-link:hover {
    color: #27408b;
  }

  /* Botón "×" rojo al principio de la cadena de etiquetas: anula la selección
     (cambiar de sector). Sustituye al antiguo enlace "← Cambiar de sector". */
  .tag-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    flex: none;
    border-radius: 999px;
    border: 1px solid #e05a5a;
    background: color-mix(in srgb, #e05a5a 10%, #fff);
    color: #e05a5a;
    font-family: 'Inconsolata', monospace;
    font-size: 17px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .tag-reset:hover { background: #e05a5a; color: #fff; }

  /* Etiquetas de actividad (multiselección del paso 2). */
  .activity-group-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  /* Etiquetas estilo "badge": píldora suave y compacta, sin borde (igual que la web). */
  /* Estilo ÚNICO para toda la jerarquía de etiquetas del panel de Pat (familias del
     paso 1 y sub-etiquetas del paso 2): mismo tamaño de letra, padding, gap y SIEMPRE
     un borde delimitador del color de la etiqueta (--chip). El paso 1 es el modelo. */
  .activity-selector-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: color-mix(in srgb, var(--chip) 12%, #fff);
    border: 1px solid var(--chip);
    border-radius: 999px;
    padding: 4px 9px;
    font-family: 'Inconsolata', monospace;
    font-size: 13px;
    font-weight: 600;
    color: color-mix(in srgb, var(--chip) 62%, #12211a);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
    text-align: left;
    line-height: 1.3;
  }
  .activity-selector-btn:hover {
    background: color-mix(in srgb, var(--chip) 20%, #fff);
  }
  /* Punto de la etiqueta: HUECO por defecto (anillo del color). Se rellena (sólido) en
     :hover y en estado seleccionado. Misma lógica en toda la jerarquía de etiquetas. */
  .badge-activity-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px var(--chip);
    flex: 0 0 auto;
    display: inline-block;
    transition: background 0.2s ease;
  }
  /* Sólido al pasar por encima (cualquier botón de etiqueta) y en las píldoras de
     selección (que representan una etiqueta YA seleccionada). */
  .activity-selector-btn:hover .badge-activity-dot,
  .activity-selector-btn.selected .badge-activity-dot,
  .selected-badge-pill .badge-activity-dot {
    background: var(--chip);
  }

  /* Paso 1: grid de familias (sectores) con su color. */
  .family-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .family-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }
  /* .family-btn y .tag-toggle heredan el estilo único de .activity-selector-btn
     (mismo tamaño en toda la jerarquía). */

  /* Paso 2: multiselección de etiquetas. Marcadas = rellenas con su color. */
  .tag-multi {
    margin-top: 10px;
  }
  .tag-toggle.selected {
    background: var(--chip);
    border-color: var(--chip);
    color: #fff;
  }
  .tag-toggle.selected:hover {
    background: var(--chip);
  }
  .tag-check {
    font-weight: 700;
    line-height: 1;
  }
  /* Advisor Mini Form Styling */
  .advisor-mini-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Honeypot: fuera de pantalla, sin afectar al layout ni ser visible/enfocable. */
  .advisor-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .advisor-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 640px) {
    .advisor-form-row {
      grid-template-columns: 1fr;
    }
    /* Etiquetas más compactas en móvil (toda la jerarquía por igual): menos separación
       y padding para que quepan mejor en pantalla estrecha. */
    .family-grid {
      gap: 5px;
    }
    .activity-selector-btn {
      gap: 6px;
      padding: 5px 10px;
      font-size: 12px;
    }
  }

  .advisor-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  .advisor-form-label {
    font-family: 'Inconsolata', monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: #666;
    letter-spacing: 0.05em;
  }

  .advisor-form-control {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d2d2cd;
    border-radius: 8px;
    font-size: 15px;
    background: #fff;
    color: #111;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .advisor-form-control:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(255, 200, 0, 0.15);
  }

  .advisor-form-check {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
    font-size: 13px;
    color: #555;
  }

  .advisor-form-check input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--gold);
    cursor: pointer;
    flex-shrink: 0;
  }

  .advisor-form-check label {
    cursor: pointer;
    line-height: 1.4;
  }

  :global(.adv-privacy-link) {
    color: #9b7d00;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
  }

  :global(.adv-privacy-link:hover) {
    color: #111;
  }

  .advisor-submit-btn {
    background: var(--gold);
    color: #000;
    border: 0;
    border-radius: 30px;
    padding: 12px 28px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    text-transform: none;
    cursor: pointer;
    transition: all 0.25s ease;
    align-self: flex-start;
    box-shadow: 0 4px 10px rgba(255, 200, 0, 0.15);
  }

  .advisor-submit-btn:hover:not(:disabled) {
    background: #e5b000;
    color: #000;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.35);
  }

  .advisor-submit-btn:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  /* Pestaña que sobresale del borde inferior del panel; contiene solo el switch (sin texto).
     Al apagarlo, el panel se oculta durante toda la sesión. */
  .advisor-active-tab {
    width: fit-content;
    margin: -1px auto 0;
    padding: 10px 24px 12px;
    background: #f8f9fa;
    border-radius: 0 0 18px 18px;
    /* drop-shadow (no box-shadow) para que la sombra siga la silueta soldada
       incluyendo los fillets ::before/::after. */
    filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.07));
    position: relative;
    z-index: 2;
  }
  /* Soldadura: las esquinas superiores se redondean hacia afuera uniéndose al panel. */
  .advisor-active-tab::before,
  .advisor-active-tab::after {
    content: '';
    position: absolute;
    top: 0;
    width: 16px;
    height: 16px;
    background: #f8f9fa;
    pointer-events: none;
  }
  .advisor-active-tab::before {
    left: -16px;
    background: radial-gradient(circle at bottom left, transparent 16px, #f8f9fa 16px);
  }
  .advisor-active-tab::after {
    right: -16px;
    background: radial-gradient(circle at bottom right, transparent 16px, #f8f9fa 16px);
  }
  .advisor-active-toggle {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    user-select: none;
  }
  .advisor-active-toggle input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  .advisor-active-track {
    position: relative;
    width: 42px;
    height: 22px;
    border-radius: 999px;
    background: #c2c7cc;
    transition: background 0.2s ease;
    flex-shrink: 0;
  }
  .advisor-active-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
  }
  .advisor-active-toggle input:checked + .advisor-active-track {
    background: #ffc800;
  }
  .advisor-active-toggle input:checked + .advisor-active-track .advisor-active-thumb {
    transform: translateX(20px);
  }
  .advisor-active-toggle input:focus-visible + .advisor-active-track {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  .text-success {
    color: #2e7d32 !important;
    font-weight: 600;
  }

  .text-error {
    color: #d32f2f !important;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .advisor-profile {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .advisor-bubble::after {
      display: none;
    }
  }
</style>
