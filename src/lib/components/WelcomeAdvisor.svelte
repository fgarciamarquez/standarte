<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { fairsData } from '$lib/fairsData.js';
  import { cityData } from '$lib/siteData.js';

  export let lang = 'en';

  const dispatch = createEventDispatcher();

  let selectedCity = '';
  let selectedFair = '';
  let currentStep = 1; // 1 = city selector, 2 = fairs, 3 = contact form

  let cardExpanded = false;
  let profileVisible = false;
  let citiesVisible = false;

  let name = '';
  let email = '';
  let privacyAccepted = false;
  let status = 'idle'; // 'idle', 'sending', 'success', 'error'
  let statusMessage = '';

  const cityKeys = ['madrid', 'lisboa', 'bilbao', 'barcelona', 'malaga', 'badajoz', 'sevilla', 'ciudad_real', 'zaragoza'];

  const cityKeyToFairCityName = {
    madrid: 'Madrid',
    lisboa: 'Lisboa',
    bilbao: 'Bilbao',
    barcelona: 'Barcelona',
    malaga: 'Málaga',
    badajoz: 'Badajoz',
    sevilla: 'Sevilla',
    ciudad_real: 'Ciudad Real',
    zaragoza: 'Zaragoza'
  };

  const texts = {
    en: {
      title: "Hi! I'm Pat.",
      intro: "If you are looking to exhibit in Spain and Portugal, I can advise you on choosing the key events.",
      instruction: "Select a city and I will show you the key trade shows you shouldn't miss:",
      cta: "Get a quote for this fair",
      formInstruction: "Please enter your name and email to receive your custom design proposal:",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Business Email",
      privacyLabel: "I accept the privacy policy",
      privacyLabelHtml: "I accept the <span class=\"adv-privacy-link\">privacy policy</span>",
      sendBtn: "Send Request",
      sending: "Sending...",
      successMsg: "Thank you! Request received. We will contact you within 24 hours with a custom design proposal.",
      errorMsg: "An error occurred. Please try again or use the contact form below.",
      defaultDescription: "Stand construction request from interactive advisor."
    },
    pt: {
      title: "Olá!, sou a Pat.",
      intro: "Se procura estabelecer-se em Espanha e Portugal, posso aconselhá-lo na escolha dos eventos fundamentais.",
      instruction: "Escolha a cidade e eu mostrar-lhe-ei os eventos imperdíveis:",
      cta: "Pedir orçamento para esta feira",
      formInstruction: "Por favor, introduza o seu nome e e-mail para receber a proposta de design personalizada:",
      namePlaceholder: "Seu Nome",
      emailPlaceholder: "Seu E-mail Corporativo",
      privacyLabel: "Aceito a política de privacidade",
      privacyLabelHtml: "Aceito a <span class=\"adv-privacy-link\">política de privacidade</span>",
      sendBtn: "Enviar Pedido",
      sending: "A enviar...",
      successMsg: "Obrigado! Pedido recebido. Entraremos em contacto consigo no prazo de 24 horas com uma proposta de design personalizada.",
      errorMsg: "Ocorreu um erro. Por favor, tente novamente ou use o formulário de contacto abaixo.",
      defaultDescription: "Pedido de construção de stand a partir do assessor virtual."
    },
    de: {
      title: "Hallo!, ich bin Pat.",
      intro: "Wenn Sie in Spanien und Portugal ausstellen möchten, kann ich Sie bei der Auswahl der wichtigsten Messen beraten.",
      instruction: "Wählen Sie die Stadt und ich zeige Ihnen die wichtigsten Events, die Sie nicht verpassen dürfen:",
      cta: "Angebot für diese Messe anfordern",
      formInstruction: "Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein, um Ihr individuelles Design-Angebot zu erhalten:",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre geschäftliche E-Mail",
      privacyLabel: "Ich akzeptiere die Datenschutzerklärung",
      privacyLabelHtml: "Ich akzeptiere die <span class=\"adv-privacy-link\">Datenschutzerklärung</span>",
      sendBtn: "Anfrage senden",
      sending: "Wird gesendet...",
      successMsg: "Vielen Dank! Anfrage erhalten. Wir werden uns innerhalb von 24 Stunden mit einem maßgeschneiderten Entwurf bei Ihnen melden.",
      errorMsg: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder nutzen Sie das Kontaktformular unten.",
      defaultDescription: "Messestand-Anfrage über den virtuellen Berater."
    },
    fr: {
      title: "Bonjour !, je suis Pat.",
      intro: "Si vous cherchez à vous implanter en Espagne et au Portugal, je peux vous conseiller pour choisir les événements de premier plan.",
      instruction: "Choisissez la ville et je vous montrerai les salons incontournables à ne pas manquer :",
      cta: "Demander un devis pour ce salon",
      formInstruction: "Veuillez entrer votre nom et votre adresse e-mail pour recevoir votre proposition de design personnalisée :",
      namePlaceholder: "Votre Nom",
      emailPlaceholder: "Votre E-mail Professionnel",
      privacyLabel: "J'accepte la politique de confidentialité",
      privacyLabelHtml: "J'accepte la <span class=\"adv-privacy-link\">politique de confidentialité</span>",
      sendBtn: "Envoyer la demande",
      sending: "Envoi en cours...",
      successMsg: "Merci ! Demande reçue. Nous vous contacterons dans les 24 heures avec une proposition de design personnalisée.",
      errorMsg: "Une erreur est survenue. Veuillez réessayer ou utiliser le formulaire de contact ci-dessous.",
      defaultDescription: "Demande de conception de stand via le conseiller interactif."
    },
    it: {
      title: "Ciao!, sono Pat.",
      intro: "Se desideri esporre in Spagna e Portogallo, posso consigliarti nella scelta degli eventi chiave.",
      instruction: "Scegli la città e ti mostrerò gli eventi imperdibili a cui non puoi mancare:",
      cta: "Richiedi un preventivo per questa fiera",
      formInstruction: "Inserisci il tuo nome ed e-mail per ricevere la tua proposta di design personalizzata:",
      namePlaceholder: "Il tuo Nome",
      emailPlaceholder: "La tua Email Aziendale",
      privacyLabel: "Accetto l'informativa sulla privacy",
      privacyLabelHtml: "Accetto l'<span class=\"adv-privacy-link\">informativa sulla privacy</span>",
      sendBtn: "Invia Richiesta",
      sending: "Invio in corso...",
      successMsg: "Grazie! Richiesta ricevuta. Ti contatteremo entro 24 ore con una proposta di design personalizzata.",
      errorMsg: "Si è verificato un errore. Riprova o utilizza il modulo di contatto sottostante.",
      defaultDescription: "Richiesta di progettazione stand dall'assistente virtuale."
    },
    nl: {
      title: "Hallo!, ik ben Pat.",
      intro: "Als u wilt exposeren in Spanje en Portugal, kan ik u adviseren bij het kiezen van de belangrijkste evenementen.",
      instruction: "Kies de stad en ik laat u de belangrijkste evenementen zien die u niet mag missen:",
      cta: "Vraag een offerte aan voor deze beurs",
      formInstruction: "Voer uw naam en e-mailadres in om uw persoonlijk ontwerpvoorstel te ontvangen:",
      namePlaceholder: "Uw Naam",
      emailPlaceholder: "Uw Zakelijk E-mailadres",
      privacyLabel: "Ik accepteer het privacybeleid",
      privacyLabelHtml: "Ik accepteer het <span class=\"adv-privacy-link\">privacybeleid</span>",
      sendBtn: "Aanvraag Verzenden",
      sending: "Verzenden...",
      successMsg: "Bedankt! Aanvraag ontvangen. We nemen binnen 24 uur contact met u op met een persoonlijk ontwerpvoorstel.",
      errorMsg: "Er is een fout opgetreden. Probeer het opnieuw of gebruik het onderstaande contactformulier.",
      defaultDescription: "Standbouwaanvraag via de interactieve adviseur."
    },
    zh: {
      title: "你好！我是 Pat。",
      intro: "如果您想在西班牙和葡萄牙参展，我可以为您提供选择关键展会的建议。",
      instruction: "选择城市，我将为您展示不容错过的关键活动：",
      cta: "索取该展会的报价",
      formInstruction: "请输入您的姓名和电子邮箱，以便获取您的定制设计方案：",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "您的企业邮箱",
      privacyLabel: "我接受隐私政策",
      privacyLabelHtml: "我接受<span class=\"adv-privacy-link\">隐私政策</span>",
      sendBtn: "发送请求",
      sending: "正在发送...",
      successMsg: "谢谢！请求已收到。我们将在24小时内与您联系，并提供定制的设计方案。",
      errorMsg: "发生错误。请重试或使用下方的联系表格。",
      defaultDescription: "来自互动顾问 of 展台设计请求。"
    },
    hi: {
      title: "नमस्ते!, मैं Pat हूँ।",
      intro: "यदि आप स्पेन और पुर्तगाल में प्रदर्शन करना चाहते हैं, तो मैं आपको प्रमुख कार्यक्रमों को चुनने में सलाह दे सकती हूँ।",
      instruction: "शहर चुनें और मैं आपको वे प्रमुख कार्यक्रम दिखाऊँगी जिन्हें आप मिस नहीं कर सकते:",
      cta: "इस मेले के लिए कोटेशन प्राप्त करें",
      formInstruction: "कृपया अपना कस्टम डिज़ाइन प्रस्ताव प्राप्त करने के लिए अपना नाम और ईमेल दर्ज करें:",
      namePlaceholder: "आपका नाम",
      emailPlaceholder: "आपका व्यावसायिक ईमेल",
      privacyLabel: "मैं गोपनीयता नीति स्वीकार करता हूँ",
      privacyLabelHtml: "मैं <span class=\"adv-privacy-link\">गोपनीयता नीति</span> स्वीकार करता हूँ",
      sendBtn: "अनुरोध भेजें",
      sending: "भेजा जा रहा है...",
      successMsg: "धन्यवाद! आपका अनुरोध प्राप्त हो गया है। हम 24 घंटों के भीतर आपसे एक कस्टम डिज़ाइन प्रस्ताव के साथ संपर्क करेंगे।",
      errorMsg: "एक त्रुटि हुई। कृपया पुनः प्रयास करें या नीचे दिए गए संपर्क फ़ॉर्म का उपयोग करें।",
      defaultDescription: "इंटरैक्टिव सलाहकार से स्टैंड डिज़ाइन अनुरोध।"
    },
    ko: {
      title: "안녕하세요! Pat입니다.",
      intro: "스페인과 포르투갈에서 전시회를 준비 중이시라면, 핵심 이벤트를 선택할 수 있도록 조언해 드릴 수 있습니다.",
      instruction: "도시를 선택하시면 절대 놓쳐서는 안 될 주요 전시회를 보여드리겠습니다:",
      cta: "이 전시회 견적 요청하기",
      formInstruction: "맞춤형 디자인 제안서를 받으실 이름과 이메일 주소를 입력해 주세요:",
      namePlaceholder: "이름",
      emailPlaceholder: "회사 이메일 주소",
      privacyLabel: "개인정보 처리방침에 동의합니다",
      privacyLabelHtml: "<span class=\"adv-privacy-link\">개인정보 처리방침</span>에 동의합니다",
      sendBtn: "요청 보내기",
      sending: "전송 중...",
      successMsg: "감사합니다! 요청이 성공적으로 접수되었습니다. 24시간 이내에 맞춤형 디자인 제안으로 연락드리겠습니다.",
      errorMsg: "오류가 발생했습니다. 다시 시도하시거나 아래 문의 양식을 이용해 주세요.",
      defaultDescription: "대화형 어드바이저를 통한 부스 디자인 요청."
    },
    ja: {
      title: "こんにちは！Patです。",
      intro: "スペインやポルトガルでの出展をお考えなら、主要なイベント選びのアドバイスをいたします。",
      instruction: "都市を選択してください。見逃せない主要な展示会をご案内します：",
      cta: "この展示会の見積もりを依頼する",
      formInstruction: "カスタムデザインのご提案をお送りするため、お名前とメールアドレスをご入力ください：",
      namePlaceholder: "お名前",
      emailPlaceholder: "会社用メールアドレス",
      privacyLabel: "個人情報保護方針に同意します",
      privacyLabelHtml: "<span class=\"adv-privacy-link\">個人情報保護方針</span>に同意します",
      sendBtn: "送信する",
      sending: "送信中...",
      successMsg: "ありがとうございます！リクエストを受領いたしました。24時間以内にカスタムデザインの提案をご連絡いたします。",
      errorMsg: "エラーが発生しました。もう一度お試しいただくか、以下の問い合わせフォームをご利用ください。",
      defaultDescription: "バーチャルアドバイザーからの展示会ブースデザイン設計依頼。"
    }
  };

  $: t = texts[lang] || texts.en;

  $: selectedCityName = cityKeyToFairCityName[selectedCity];
  $: cityFairs = selectedCityName 
    ? fairsData.filter(f => f.city === selectedCityName)
    : [];

  let typedText = '';
  let typingInterval;

  function typeText(text) {
    clearInterval(typingInterval);
    typedText = '';
    let i = 0;
    typingInterval = setInterval(() => {
      if (i < text.length) {
        typedText += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        // Show city buttons in the last place
        setTimeout(() => {
          citiesVisible = true;
        }, 200);
      }
    }, 25);
  }

  let lastLang = '';
  $: if (profileVisible && lang) {
    if (lang !== lastLang) {
      lastLang = lang;
      typeText(t.instruction);
    }
  }

  onMount(() => {
    // 1. Expand the card
    setTimeout(() => {
      cardExpanded = true;
    }, 150);

    // 2. Show the profile after card starts expanding
    setTimeout(() => {
      profileVisible = true;
    }, 600);
  });

  function selectCity(cityKey) {
    clearInterval(typingInterval);
    selectedCity = cityKey;
    currentStep = 2;
  }

  function selectFair(fairName) {
    selectedFair = fairName;
    currentStep = 3;
    
    // Dispatch to update state in parent context
    const cityName = cityData[selectedCity]?.city?.[lang] || cityData[selectedCity]?.city?.es || selectedCity;
    dispatch('selectFair', { fairName, cityName });
  }

  function resetCity() {
    selectedCity = '';
    selectedFair = '';
    currentStep = 1;
    status = 'idle';
    statusMessage = '';
  }

  function resetFair() {
    selectedFair = '';
    currentStep = 2;
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
    formData.append('form_feria', `${selectedFair} (${selectedCityName})`);
    formData.append('form_metros', '20'); // Default B2B stand size
    formData.append('form_descripcion', t.defaultDescription);
    formData.append('form_privacidad', '1');
    formData.append('form_elapsed', '6000'); // honeypot bypass

    try {
      const response = await fetch('/admin/ajax_presupuesto_form.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.error === 'success') {
        status = 'success';
        statusMessage = t.successMsg;
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
</script>

<section class="welcome-advisor-container">
  <div class="welcome-advisor-card" class:expanded={cardExpanded}>
    
    <div class="advisor-profile" class:visible={profileVisible}>
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
          <h3 class="advisor-name">{t.title}</h3>
          
          {#if selectedCity || selectedFair}
            <div class="advisor-selected-badges" transition:fade>
              {#if selectedCity}
                <span class="selected-badge-pill" transition:fade>
                  {cityData[selectedCity]?.city?.[lang] || cityData[selectedCity]?.city?.es || selectedCity}
                  <button type="button" class="remove-badge-btn" on:click={resetCity} aria-label="Remove city">×</button>
                </span>
              {/if}
              {#if selectedFair}
                <span class="selected-badge-pill" transition:fade>
                  {selectedFair}
                  <button type="button" class="remove-badge-btn" on:click={resetFair} aria-label="Remove fair">×</button>
                </span>
              {/if}
            </div>
          {/if}
        </div>

        {#if currentStep < 3 && status !== 'success'}
          <p class="advisor-intro" transition:slide={{ duration: 300 }}>{t.intro}</p>
        {/if}
        
        {#if status === 'success'}
          <p class="advisor-instruction text-success" transition:fade>{statusMessage}</p>
        {:else if status === 'error'}
          <p class="advisor-instruction text-error" transition:fade>{statusMessage}</p>
        {:else if currentStep === 3}
          <p class="advisor-instruction" transition:fade>{t.formInstruction}</p>
        {:else}
          <p class="advisor-instruction">{typedText}</p>
        {/if}
      </div>
    </div>

    <!-- Step 1: City selector -->
    {#if currentStep === 1}
      <div class="city-selector-grid" class:visible={citiesVisible} transition:slide={{ duration: 400 }}>
        {#each cityKeys as ck}
          <button
            type="button"
            class="city-selector-btn"
            on:click={() => selectCity(ck)}
          >
            {cityData[ck]?.city?.[lang] || cityData[ck]?.city?.es || ck}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Step 2: Fairs selector as floating pills -->
    {#if currentStep === 2}
      <div class="fairs-selector-flex" transition:slide={{ duration: 400 }}>
        {#each cityFairs as fair}
          <button
            type="button"
            class="fair-selector-btn"
            on:click={() => selectFair(fair.name)}
          >
            <span class="fair-badge-flag flag-{fair.country}"></span>
            <span class="fair-name-text">{fair.name}</span>
          </button>
        {/each}
      </div>
    {/if}

    <!-- Step 3: Contact Form (Nombre & Email) -->
    {#if currentStep === 3 && status !== 'success'}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <form class="advisor-mini-form" on:submit={handleSubmit} on:click={handlePrivacyClick} transition:slide={{ duration: 400 }}>
        <div class="advisor-form-row">
          <div class="advisor-form-group">
            <label for="adv_nombre" class="advisor-form-label">{t.namePlaceholder}</label>
            <input
              id="adv_nombre"
              type="text"
              class="advisor-form-control"
              placeholder={t.namePlaceholder}
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
              placeholder={t.emailPlaceholder}
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

  </div>
</section>

<style>
  .welcome-advisor-container {
    max-width: var(--container);
    margin: 40px auto;
    padding: 0 15px;
  }

  .welcome-advisor-card {
    background: #fdfdfb;
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
    max-height: 1200px;
    opacity: 1;
  }

  .advisor-profile {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .advisor-profile.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .advisor-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--gold);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    font-family: 'Glegoo', serif;
    font-size: 20px;
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
    background: var(--gold);
    color: #111;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 4px 10px;
    font-family: 'Inconsolata', monospace;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(255, 200, 0, 0.2);
  }

  .remove-badge-btn {
    background: none;
    border: none;
    padding: 0;
    color: #111;
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

  .advisor-instruction {
    margin-bottom: 0;
    font-weight: 600;
    color: #111;
    min-height: 22px;
  }

  .city-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    margin-top: 10px;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .city-selector-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .city-selector-btn {
    background: #fff;
    border: 1px solid #d2d2cd;
    border-radius: 30px;
    padding: 10px 16px;
    font-family: 'Inconsolata', monospace;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
  }

  .city-selector-btn:hover {
    border-color: var(--gold);
    background: #fffdf6;
  }

  /* Fairs Selector (Inline Floating Pills) */
  .fairs-selector-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 10px;
  }

  .fair-selector-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1px solid #d2d2cd;
    border-radius: 30px;
    padding: 10px 20px;
    font-family: 'Inconsolata', monospace;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
  }

  .fair-selector-btn:hover {
    border-color: var(--gold);
    background: #fffdf6;
  }

  .fair-badge-flag {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .flag-es {
    background: linear-gradient(180deg, #aa151b 0%, #aa151b 25%, #f1bf00 25%, #f1bf00 75%, #aa151b 75%, #aa151b 100%);
  }
  .flag-pt {
    background: linear-gradient(90deg, #006600 0%, #006600 42%, #ff0000 42%, #ff0000 100%);
  }

  .fair-name-text {
    font-weight: 700;
    font-size: 15px;
    color: #111;
  }

  /* Advisor Mini Form Styling */
  .advisor-mini-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    background: #111;
    color: #fff;
    border: 0;
    border-radius: 30px;
    padding: 12px 28px;
    font-family: 'Glegoo', serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    align-self: flex-start;
  }

  .advisor-submit-btn:hover:not(:disabled) {
    background: var(--gold);
    color: #111;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.2);
  }

  .advisor-submit-btn:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
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
