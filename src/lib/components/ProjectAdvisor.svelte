<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let lang = 'es';
  export let project = null;
  // Tema oscuro (p. ej. al pie del lightbox de la galería, sobre fondo negro).
  export let dark = false;

  let name = '';
  let email = '';
  let description = '';
  let status = 'idle'; // 'idle' | 'sending' | 'success' | 'error'
  let statusMessage = '';
  // URL de origen: la página desde la que el visitante rellena el formulario.
  let sourceUrl = '';
  // Anti-spam: honeypot (debe quedar vacío) + marca de tiempo para descartar envíos instantáneos.
  let honeypot = '';
  let mountTime = 0;

  onMount(() => {
    if (typeof window !== 'undefined') sourceUrl = window.location.href;
    mountTime = Date.now();
  });

  const texts = {
    es: {
      title: 'Hola!, soy Pat.',
      freeBadge: 'Servicio gratuito',
      intro: '¿Te gusta este proyecto? Dame tus datos y prepararemos un proyecto para tu próximo evento con este nivel de acabados y adaptado a tu imagen de empresa.',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu Correo Profesional',
      descPlaceholder: 'Cuéntanos. Dinos cómo quieres tu stand 😊',
      sendBtn: 'Enviar',
      sending: 'Enviando...',
      thanksTitle: 'Gracias',
      successMsg: 'En breve me pondré en contacto contigo',
      errorMsg: 'Ocurrió un error. Por favor, inténtalo de nuevo.'
    },
    en: {
      title: "Hi! I'm Pat.",
      freeBadge: 'Free service',
      intro: "Do you like this project? Give me your details and we'll prepare a project for your next event with this level of finish, tailored to your company's image.",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Business Email',
      descPlaceholder: "Tell us how you'd like your stand 😊",
      sendBtn: 'Send',
      sending: 'Sending...',
      thanksTitle: 'Thank you',
      successMsg: 'I will contact you shortly',
      errorMsg: 'An error occurred. Please try again.'
    },
    pt: {
      title: 'Olá!, sou a Pat.',
      freeBadge: 'Serviço gratuito',
      intro: 'Gosta deste projeto? Deixe-me os seus dados e prepararemos um projeto para o seu próximo evento com este nível de acabamentos e adaptado à imagem da sua empresa.',
      namePlaceholder: 'Seu Nome',
      emailPlaceholder: 'Seu E-mail Corporativo',
      descPlaceholder: 'Conta-nos como queres o teu stand 😊',
      sendBtn: 'Enviar',
      sending: 'A enviar...',
      thanksTitle: 'Obrigada',
      successMsg: 'Entrarei em contacto consigo em breve',
      errorMsg: 'Ocorreu um erro. Por favor, tente novamente.'
    },
    de: {
      title: 'Hallo!, ich bin Pat.',
      freeBadge: 'Kostenloser Service',
      intro: 'Gefällt Ihnen dieses Projekt? Hinterlassen Sie mir Ihre Daten und wir erstellen für Ihre nächste Veranstaltung ein Projekt mit diesem Ausführungsniveau, abgestimmt auf Ihr Unternehmensimage.',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'Ihre geschäftliche E-Mail',
      descPlaceholder: 'Erzählen Sie uns, wie Sie Ihren Stand möchten 😊',
      sendBtn: 'Senden',
      sending: 'Wird gesendet...',
      thanksTitle: 'Vielen Dank',
      successMsg: 'Ich werde mich in Kürze mit Ihnen in Verbindung setzen',
      errorMsg: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    },
    fr: {
      title: 'Bonjour !, je suis Pat.',
      freeBadge: 'Service gratuit',
      intro: "Ce projet vous plaît ? Donnez-moi vos coordonnées et nous préparerons un projet pour votre prochain événement avec ce niveau de finition, adapté à l'image de votre entreprise.",
      namePlaceholder: 'Votre Nom',
      emailPlaceholder: 'Votre E-mail Professionnel',
      descPlaceholder: 'Dites-nous comment vous voulez votre stand 😊',
      sendBtn: 'Envoyer',
      sending: 'Envoi en cours...',
      thanksTitle: 'Merci',
      successMsg: 'Je vous contacterai sous peu',
      errorMsg: 'Une erreur est survenue. Veuillez réessayer.'
    },
    it: {
      title: 'Ciao!, sono Pat.',
      freeBadge: 'Servizio gratuito',
      intro: "Ti piace questo progetto? Lasciami i tuoi dati e prepareremo un progetto per il tuo prossimo evento con questo livello di finiture, adattato all'immagine della tua azienda.",
      namePlaceholder: 'Il tuo Nome',
      emailPlaceholder: 'La tua Email Aziendale',
      descPlaceholder: 'Raccontaci come vuoi il tuo stand 😊',
      sendBtn: 'Invia',
      sending: 'Invio in corso...',
      thanksTitle: 'Grazie',
      successMsg: 'Ti contatterò a breve',
      errorMsg: 'Si è verificato un errore. Riprova.'
    },
    nl: {
      title: 'Hallo!, ik ben Pat.',
      freeBadge: 'Gratis service',
      intro: 'Vindt u dit project mooi? Laat uw gegevens achter en wij stellen voor uw volgende evenement een project samen met dit afwerkingsniveau, afgestemd op uw bedrijfsimago.',
      namePlaceholder: 'Uw Naam',
      emailPlaceholder: 'Uw Zakelijk E-mailadres',
      descPlaceholder: 'Vertel ons hoe u uw stand wilt 😊',
      sendBtn: 'Verzenden',
      sending: 'Verzenden...',
      thanksTitle: 'Bedankt',
      successMsg: 'Ik neem spoedig contact met u op',
      errorMsg: 'Er is een fout opgetreden. Probeer het opnieuw.'
    },
    zh: {
      title: '你好！我是 Pat。',
      freeBadge: '免费服务',
      intro: '喜欢这个项目吗？留下您的联系方式，我们将为您的下一场活动打造一个具有同样精致工艺、并契合贵公司形象的方案。',
      namePlaceholder: '您的姓名',
      emailPlaceholder: '您的企业邮箱',
      descPlaceholder: '和我们聊聊，告诉我们你想要怎样的展台 😊',
      sendBtn: '发送',
      sending: '正在发送...',
      thanksTitle: '谢谢',
      successMsg: '我很快会与您联系',
      errorMsg: '发生错误。请重试。'
    },
    hi: {
      title: 'नमस्ते!, मैं Pat हूँ।',
      freeBadge: 'निःशुल्क सेवा',
      intro: 'क्या आपको यह प्रोजेक्ट पसंद है? मुझे अपनी जानकारी दें और हम आपके अगले इवेंट के लिए इसी स्तर की फिनिशिंग के साथ, आपकी कंपनी की छवि के अनुरूप एक प्रोजेक्ट तैयार करेंगे।',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'आपका व्यावसायिक ईमेल',
      descPlaceholder: 'हमें बताएं कि आप अपना स्टैंड कैसा चाहते हैं 😊',
      sendBtn: 'भेजें',
      sending: 'भेजा जा रहा है...',
      thanksTitle: 'धन्यवाद',
      successMsg: 'मैं शीघ्र ही आपसे संपर्क करूँगा',
      errorMsg: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।'
    },
    ko: {
      title: '안녕하세요! Pat입니다.',
      freeBadge: '무료 서비스',
      intro: '이 프로젝트가 마음에 드시나요? 연락처를 남겨 주시면 다음 행사를 위해 이와 같은 마감 수준으로 귀사의 브랜드 이미지에 맞춘 프로젝트를 준비해 드리겠습니다.',
      namePlaceholder: '이름',
      emailPlaceholder: '회사 이메일 주소',
      descPlaceholder: '원하시는 부스를 알려주세요 😊',
      sendBtn: '보내기',
      sending: '전송 중...',
      thanksTitle: '감사합니다',
      successMsg: '곧 연락드리겠습니다',
      errorMsg: '오류가 발생했습니다. 다시 시도해 주세요.'
    },
    ja: {
      title: 'こんにちは！Patです。',
      freeBadge: '無料サービス',
      intro: 'このプロジェクトが気に入りましたか？ご連絡先をお知らせいただければ、次のイベントに向けて、この仕上がりレベルで御社のイメージに合わせたプロジェクトをご用意します。',
      namePlaceholder: 'お名前',
      emailPlaceholder: '会社用メールアドレス',
      descPlaceholder: 'ご希望のブースを教えてください 😊',
      sendBtn: '送信する',
      sending: '送信中...',
      thanksTitle: 'ありがとうございます',
      successMsg: 'まもなくご連絡いたします',
      errorMsg: 'エラーが発生しました。もう一度お試しください。'
    }
  };

  $: t = texts[lang] || texts.es;

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    status = 'sending';
    const proyectoRef = project
      ? project.title?.[lang] || project.title?.es || project.name || project.id
      : '';

    const formData = new FormData();
    formData.append('form_lang', lang);
    formData.append('form_nombre', name);
    formData.append('form_email', email);
    // Reutilizamos form_feria para llevar al equipo el proyecto de referencia + la petición.
    formData.append('form_feria', `[Proyecto: ${proyectoRef}] ${description}`.trim());
    formData.append('form_url', sourceUrl || (typeof window !== 'undefined' ? window.location.href : ''));
    formData.append('form_website', honeypot);
    formData.append('form_elapsed', String(mountTime ? Date.now() - mountTime : 0));
    formData.append('form_privacidad', '1');

    try {
      const response = await fetch('/admin/ajax_advisor_form.php', {
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
</script>

<section class="project-advisor" class:dark>
  <div class="pat-card">
    <div class="pat-profile" class:submitted={status === 'success'}>
      <img
        class="pat-photo"
        src="/img/team/patricia_jimenez.avif"
        srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
        sizes="100px"
        alt="Patricia Jiménez (Pat)"
        loading="lazy"
        decoding="async"
      />
      <div class="pat-bubble">
        <div class="pat-bubble-header">
          <h3 class="pat-name">{status === 'success' ? t.thanksTitle : t.title}</h3>
          <span class="pat-free-badge">{t.freeBadge}</span>
        </div>

        {#if status === 'success'}
          <p class="pat-intro text-success" transition:fade>{statusMessage}</p>
        {:else}
          <p class="pat-intro">{t.intro}</p>
        {/if}
      </div>
    </div>

    {#if status !== 'success'}
      <form class="pat-form" on:submit={handleSubmit}>
        <input type="hidden" name="form_url" bind:value={sourceUrl} />
        <!-- Honeypot anti-spam: oculto a humanos; si un bot lo rellena, se descarta el envío. -->
        <div class="pat-hp" aria-hidden="true">
          <label for="pat_website">No rellenar este campo</label>
          <input id="pat_website" type="text" name="form_website" tabindex="-1" autocomplete="off" bind:value={honeypot} />
        </div>
        <div class="pat-form-row">
          <div class="pat-form-group">
            <label for="pat_nombre" class="pat-form-label">{t.namePlaceholder}</label>
            <input
              id="pat_nombre"
              type="text"
              class="pat-form-control"
              placeholder={t.namePlaceholder}
              bind:value={name}
              required
            />
          </div>
          <div class="pat-form-group">
            <label for="pat_email" class="pat-form-label">{t.emailPlaceholder}</label>
            <input
              id="pat_email"
              type="email"
              class="pat-form-control"
              placeholder={t.emailPlaceholder}
              bind:value={email}
              required
            />
          </div>
        </div>

        <div class="pat-form-group">
          <label for="pat_desc" class="pat-form-label">{t.descPlaceholder}</label>
          <textarea
            id="pat_desc"
            class="pat-form-control pat-textarea"
            rows="3"
            placeholder={t.descPlaceholder}
            bind:value={description}
            required
          ></textarea>
        </div>

        {#if status === 'error'}
          <p class="text-error" transition:fade>{statusMessage}</p>
        {/if}

        <button type="submit" class="pat-submit-btn" disabled={status === 'sending'}>
          {status === 'sending' ? t.sending : t.sendBtn}
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  .project-advisor {
    margin: 0 0 60px;
  }

  .pat-card {
    background: #f8f9fa;
    border: 1px solid #e2e2de;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .pat-profile {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .pat-profile.submitted {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    margin-bottom: 0;
  }

  .pat-profile.submitted .pat-bubble {
    width: 100%;
    max-width: 500px;
  }

  .pat-profile.submitted .pat-bubble::after {
    display: none;
  }

  .pat-profile.submitted .pat-bubble-header {
    justify-content: center;
  }

  .pat-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
    flex-shrink: 0;
  }

  .pat-bubble {
    background: #f4f4f2;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    flex-grow: 1;
  }

  .pat-bubble::after {
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

  .pat-bubble-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .pat-name {
    margin: 0;
    color: #111;
    font-family: 'Righteous', serif;
    font-size: 20px;
    font-weight: 400;
  }

  .pat-free-badge {
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

  .pat-free-badge::before {
    content: '✓';
    font-size: 12px;
    font-weight: 700;
  }

  .pat-intro {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    color: #444;
  }

  .pat-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Honeypot: fuera de pantalla, sin afectar al layout ni ser visible/enfocable. */
  .pat-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .pat-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 640px) {
    .pat-form-row {
      grid-template-columns: 1fr;
    }
  }

  .pat-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  .pat-form-label {
    font-family: 'Inconsolata', monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: #666;
    letter-spacing: 0.05em;
  }

  .pat-form-control {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d2d2cd;
    border-radius: 8px;
    font-size: 15px;
    font-family: inherit;
    background: #fff;
    color: #111;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .pat-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .pat-form-control:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(255, 200, 0, 0.15);
  }

  .pat-submit-btn {
    background: var(--gold);
    color: #000;
    border: 0;
    border-radius: 30px;
    padding: 12px 28px;
    font-family: 'Righteous', serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.25s ease;
    align-self: flex-start;
    box-shadow: 0 4px 10px rgba(255, 200, 0, 0.15);
  }

  .pat-submit-btn:hover:not(:disabled) {
    background: #e5b000;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.35);
  }

  .pat-submit-btn:disabled {
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
    margin: 0;
  }

  /* ─── Tema oscuro (al pie del lightbox de la galería, sobre fondo negro) ─── */
  .project-advisor.dark .pat-card {
    background: #1c2024;
    border-color: #34393e;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }
  .project-advisor.dark .pat-bubble {
    background: #262b30;
  }
  .project-advisor.dark .pat-bubble::after {
    border-right-color: #262b30;
  }
  .project-advisor.dark .pat-name {
    color: #fff;
  }
  .project-advisor.dark .pat-intro {
    color: #c8ccd0;
  }
  .project-advisor.dark .pat-form-label {
    color: #9aa0a6;
  }
  .project-advisor.dark .pat-form-control {
    background: #14171a;
    border-color: #3a4046;
    color: #f0f0f0;
  }
  .project-advisor.dark .pat-form-control::placeholder {
    color: #7c828a;
  }
  .project-advisor.dark .text-success {
    color: #7fd488 !important;
  }
  .project-advisor.dark .text-error {
    color: #ff8a80 !important;
  }

  @media (max-width: 768px) {
    .pat-profile {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .pat-bubble::after {
      display: none;
    }

    .pat-bubble-header {
      justify-content: center;
    }
  }
</style>
