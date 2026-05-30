<script>
  import { onMount } from 'svelte';

  export let lang = 'es';

  const STORAGE_KEY = 'standarte_cookie_consent_v1';
  const VERSION = 1;

  const texts = {
    es: {
      title: 'Configuración de cookies',
      intro: 'Usamos cookies necesarias para que la web funcione. Con tu permiso activaremos cookies de medición y publicidad de Google para medir campañas y mejorar los anuncios.',
      google: 'Google puede recibir datos personales para medición publicitaria y personalización cuando lo autorizas.',
      learn: 'Cómo usa Google los datos',
      accept: 'Aceptar todas',
      reject: 'Rechazar',
      configure: 'Configurar',
      save: 'Guardar selección',
      necessary: 'Necesarias',
      necessaryText: 'Imprescindibles para navegación, seguridad y recordar esta elección. Siempre activas.',
      analytics: 'Medición',
      analyticsText: 'Permite medir visitas y conversiones de forma agregada.',
      ads: 'Publicidad',
      adsText: 'Permite enviar señales a Google Ads para medición de campañas.',
      personalization: 'Personalización publicitaria',
      personalizationText: 'Permite personalizar anuncios y remarketing cuando se active en campañas.',
      close: 'Cerrar'
    },
    en: {
      title: 'Cookie settings',
      intro: 'We use necessary cookies for the website to work. With your permission we will enable Google measurement and advertising cookies to measure campaigns and improve ads.',
      google: 'Google may receive personal data for ad measurement and personalization when you allow it.',
      learn: 'How Google uses data',
      accept: 'Accept all',
      reject: 'Reject',
      configure: 'Configure',
      save: 'Save selection',
      necessary: 'Necessary',
      necessaryText: 'Required for navigation, security and remembering this choice. Always active.',
      analytics: 'Measurement',
      analyticsText: 'Allows aggregated visit and conversion measurement.',
      ads: 'Advertising',
      adsText: 'Allows signals to Google Ads for campaign measurement.',
      personalization: 'Ad personalization',
      personalizationText: 'Allows personalized ads and remarketing when enabled in campaigns.',
      close: 'Close'
    },
    de: {
      title: 'Cookie-Einstellungen',
      intro: 'Wir verwenden notwendige Cookies für den Betrieb der Website. Mit Ihrer Erlaubnis aktivieren wir Google-Mess- und Werbe-Cookies zur Kampagnenmessung.',
      google: 'Google kann personenbezogene Daten für Werbemessung und Personalisierung erhalten, wenn Sie zustimmen.',
      learn: 'Wie Google Daten verwendet',
      accept: 'Alle akzeptieren',
      reject: 'Ablehnen',
      configure: 'Konfigurieren',
      save: 'Auswahl speichern',
      necessary: 'Notwendig',
      necessaryText: 'Erforderlich für Navigation, Sicherheit und das Speichern dieser Auswahl. Immer aktiv.',
      analytics: 'Messung',
      analyticsText: 'Erlaubt aggregierte Besuchs- und Conversion-Messung.',
      ads: 'Werbung',
      adsText: 'Erlaubt Signale an Google Ads zur Kampagnenmessung.',
      personalization: 'Personalisierte Werbung',
      personalizationText: 'Erlaubt personalisierte Anzeigen und Remarketing, wenn Kampagnen dies nutzen.',
      close: 'Schließen'
    },
    zh: {
      title: 'Cookie 设置',
      intro: '我们使用必要 Cookie 保证网站运行。经您同意后，将启用 Google 衡量和广告 Cookie，用于衡量广告活动并改进广告。',
      google: '在您同意时，Google 可能会接收用于广告衡量和个性化的个人数据。',
      learn: 'Google 如何使用数据',
      accept: '全部接受',
      reject: '拒绝',
      configure: '设置',
      save: '保存选择',
      necessary: '必要',
      necessaryText: '用于导航、安全和记住本次选择，始终启用。',
      analytics: '衡量',
      analyticsText: '允许汇总衡量访问和转化。',
      ads: '广告',
      adsText: '允许向 Google Ads 发送广告活动衡量信号。',
      personalization: '个性化广告',
      personalizationText: '在广告活动启用时允许个性化广告和再营销。',
      close: '关闭'
    },
    hi: {
      title: 'कुकी सेटिंग्स',
      intro: 'वेबसाइट चलाने के लिए हम आवश्यक कुकीज़ का उपयोग करते हैं। आपकी अनुमति से हम Google मापन और विज्ञापन कुकीज़ सक्रिय करेंगे।',
      google: 'आपकी अनुमति पर Google को विज्ञापन मापन और वैयक्तिकरण के लिए व्यक्तिगत डेटा मिल सकता है।',
      learn: 'Google डेटा कैसे उपयोग करता है',
      accept: 'सभी स्वीकार करें',
      reject: 'अस्वीकार करें',
      configure: 'कॉन्फ़िगर करें',
      save: 'चयन सहेजें',
      necessary: 'आवश्यक',
      necessaryText: 'नेविगेशन, सुरक्षा और इस चुनाव को याद रखने के लिए आवश्यक। हमेशा सक्रिय।',
      analytics: 'मापन',
      analyticsText: 'विज़िट और कन्वर्ज़न को समेकित रूप से मापने की अनुमति देता है।',
      ads: 'विज्ञापन',
      adsText: 'Google Ads को अभियान मापन संकेत भेजने की अनुमति देता है।',
      personalization: 'विज्ञापन वैयक्तिकरण',
      personalizationText: 'अभियानों में सक्षम होने पर वैयक्तिकृत विज्ञापन और रीमार्केटिंग की अनुमति देता है।',
      close: 'बंद करें'
    },
    pt: {
      title: 'Configuração de cookies',
      intro: 'Usamos cookies necessárias para o funcionamento do site. Com a sua permissão ativaremos cookies de medição e publicidade da Google para medir campanhas.',
      google: 'A Google pode receber dados pessoais para medição publicitária e personalização quando autorizar.',
      learn: 'Como a Google usa os dados',
      accept: 'Aceitar todas',
      reject: 'Rejeitar',
      configure: 'Configurar',
      save: 'Guardar seleção',
      necessary: 'Necessárias',
      necessaryText: 'Essenciais para navegação, segurança e para guardar esta escolha. Sempre ativas.',
      analytics: 'Medição',
      analyticsText: 'Permite medir visitas e conversões de forma agregada.',
      ads: 'Publicidade',
      adsText: 'Permite enviar sinais para o Google Ads para medição de campanhas.',
      personalization: 'Personalização publicitária',
      personalizationText: 'Permite anúncios personalizados e remarketing quando ativados em campanhas.',
      close: 'Fechar'
    }
  };

  let visible = false;
  let settingsOpen = false;
  let preferences = {
    analytics: false,
    ads: false,
    personalization: false
  };

  $: t = texts[lang] || texts.es;

  function ensureGtag() {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  function consentState(prefs) {
    return {
      ad_storage: prefs.ads ? 'granted' : 'denied',
      ad_user_data: prefs.ads ? 'granted' : 'denied',
      ad_personalization: prefs.personalization ? 'granted' : 'denied',
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      functionality_storage: 'granted',
      personalization_storage: prefs.personalization ? 'granted' : 'denied',
      security_storage: 'granted'
    };
  }

  function updateGoogleConsent(prefs) {
    if (typeof window === 'undefined') return;
    ensureGtag();
    window.gtag('consent', 'update', consentState(prefs));
  }

  function saveConsent(choice, prefs) {
    const nextPreferences = { ...prefs };
    const payload = {
      version: VERSION,
      choice,
      preferences: nextPreferences,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    preferences = nextPreferences;
    updateGoogleConsent(nextPreferences);
    visible = false;
    settingsOpen = false;
  }

  function acceptAll() {
    saveConsent('accept_all', { analytics: true, ads: true, personalization: true });
  }

  function rejectAll() {
    saveConsent('reject_all', { analytics: false, ads: false, personalization: false });
  }

  function saveSelection() {
    saveConsent('custom', preferences);
  }

  function openSettings() {
    visible = true;
    settingsOpen = true;
  }

  function readStoredConsent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      const stored = JSON.parse(raw);
      if (stored?.version !== VERSION || !stored.preferences) return null;
      return stored.preferences;
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  onMount(() => {
    ensureGtag();
    const storedPreferences = readStoredConsent();

    if (storedPreferences) {
      preferences = { ...preferences, ...storedPreferences };
      updateGoogleConsent(preferences);
    } else {
      visible = true;
    }

    window.addEventListener('standarte:open-cookie-settings', openSettings);

    return () => {
      window.removeEventListener('standarte:open-cookie-settings', openSettings);
    };
  });
</script>

{#if visible}
  <div class="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
    <div class="cookie-consent-copy">
      <h2 id="cookie-consent-title">{t.title}</h2>
      <p>{t.intro}</p>
      <p class="cookie-consent-note">
        {t.google}
        <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">{t.learn}</a>.
      </p>
    </div>

    {#if settingsOpen}
      <div class="cookie-options">
        <div class="cookie-option cookie-option-locked">
          <div>
            <strong>{t.necessary}</strong>
            <p>{t.necessaryText}</p>
          </div>
          <span>ON</span>
        </div>
        <label class="cookie-option">
          <span>
            <strong>{t.analytics}</strong>
            <small>{t.analyticsText}</small>
          </span>
          <input type="checkbox" bind:checked={preferences.analytics} />
        </label>
        <label class="cookie-option">
          <span>
            <strong>{t.ads}</strong>
            <small>{t.adsText}</small>
          </span>
          <input type="checkbox" bind:checked={preferences.ads} />
        </label>
        <label class="cookie-option">
          <span>
            <strong>{t.personalization}</strong>
            <small>{t.personalizationText}</small>
          </span>
          <input type="checkbox" bind:checked={preferences.personalization} />
        </label>
      </div>
    {/if}

    <div class="cookie-actions">
      <button class="cookie-button cookie-button-primary" type="button" on:click={acceptAll}>{t.accept}</button>
      <button class="cookie-button" type="button" on:click={rejectAll}>{t.reject}</button>
      {#if settingsOpen}
        <button class="cookie-button" type="button" on:click={saveSelection}>{t.save}</button>
      {:else}
        <button class="cookie-button" type="button" on:click={() => (settingsOpen = true)}>{t.configure}</button>
      {/if}
    </div>
  </div>
{/if}
