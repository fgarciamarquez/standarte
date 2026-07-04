<script>
  // Pie de página único del sitio: idéntico en todas las plantillas (mismo markup,
  // mismos estilos globales de app.css, mismo modal legal y aviso de cookies).
  // Se extrajo de Site.svelte para que TODA la web comparta un solo origen de verdad.
  import { pathFor, languages, languageLabels } from '$lib/siteData.js';
  import { uspNavLabel } from '$lib/uspSnippets.js';
  import FlagIcon from './FlagIcon.svelte';
  import LangFlagIntro from './LangFlagIntro.svelte';
  import CookieConsent from './CookieConsent.svelte';

  export let lang;
  export let copy;
  // Genera la URL de esta misma página en otro idioma (cada plantilla resuelve su
  // propia ruta: home/servicios usan pathFor(opt, section), una feria usa fairUrl, etc.).
  export let langHref;

  const cookieSettingsLabels = {
    es: 'Configurar cookies', en: 'Cookie settings', de: 'Cookie-Einstellungen',
    zh: 'Cookie 设置', hi: 'कुकी सेटिंग्स', pt: 'Configurar cookies',
    fr: 'Configurer les cookies', it: 'Impostazioni cookie', ko: '쿠키 설정',
    ja: 'クッキー設定', nl: 'Cookies configureren'
  };
  const campaignManagerLabels = {
    es: 'Admin', en: 'Admin', de: 'Admin', zh: '管理', hi: 'Admin', pt: 'Admin',
    fr: 'Admin', it: 'Admin', ko: 'Admin', ja: '管理', nl: 'Admin'
  };

  let legalModal = null;
  function openLegalModal(type) {
    const titles = { privacy: copy.legal.privacy, legalNotice: copy.legal.legalNotice, cookies: copy.legal.cookies };
    legalModal = { title: titles[type], content: copy.legalText?.[type] || '' };
  }
  function closeLegalModal() { legalModal = null; }
  function openCookieSettings() { window.dispatchEvent(new CustomEvent('standarte:open-cookie-settings')); }

  function handleKeydown(event) {
    if (event.key === 'Escape' && legalModal) closeLegalModal();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<footer>
  <div class="footer-layout">
    <div class="footer-left">
      <ul class="footer-links">
        <li><button id="politicaPrivacidad" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('privacy')}>{copy.legal.privacy}</button></li>
        <li><button id="avisoLegal" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('legalNotice')}>{copy.legal.legalNotice}</button></li>
        <li><button id="politicaCookies" class="_gold footer-link-button" type="button" on:click={() => openLegalModal('cookies')}>{copy.legal.cookies}</button></li>
        <li><button class="_gold footer-link-button" type="button" on:click={openCookieSettings}>{cookieSettingsLabels[lang] || cookieSettingsLabels.es}</button></li>
        <li><a href={pathFor(lang, 'noticias')} class="_gold footer-link-button">{copy.nav.noticias}</a></li>
        <li class="footer-lang-item">
          <div class="footer-lang-menu">
            <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><LangFlagIntro {lang} size={20} /></span>
            <div class="footer-lang-dropdown">
              {#each languages as option}
                <a
                  href={langHref(option)}
                  class:active={option === lang}
                  on:click={() => {
                    if (typeof localStorage !== 'undefined') {
                      localStorage.setItem('standarte_lang', option);
                      localStorage.setItem('preferredLanguage', option);
                    }
                  }}
                >
                  <FlagIcon langCode={option} size={16} />
                  <span>{languageLabels[option]}</span>
                </a>
              {/each}
            </div>
          </div>
        </li>
      </ul>
      <nav class="footer-site-map" aria-label="Standarte" hidden aria-hidden="true">
        <ul>
          <li><a href={pathFor(lang, 'services')} tabindex="-1">{copy.nav.services}</a></li>
          <li><a href={pathFor(lang, 'custom')} tabindex="-1">{copy.nav.custom}</a></li>
          <li><a href={pathFor(lang, 'proyecto_auditado')} tabindex="-1">{uspNavLabel(lang)}</a></li>
          <li><a href={pathFor(lang, 'noticias')} tabindex="-1">{copy.nav.noticias}</a></li>
          <li><a href={pathFor(lang, 'contact')} tabindex="-1">{copy.nav.contact}</a></li>
        </ul>
      </nav>
    </div>
    <div class="copyright">
      <p>
        CopyRight: {new Date().getFullYear()}.
        <a href="/admin/email_campaing/" class="_gold footer-link-button" target="_blank" rel="external noopener noreferrer" style="margin-left: 15px; display: inline-block;">
          {campaignManagerLabels[lang] || campaignManagerLabels.es}
        </a>
      </p>
    </div>
  </div>
</footer>

{#if legalModal}
  <div class="legal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" tabindex="-1">
    <div class="legal-modal-window" role="document">
      <button class="legal-modal-close" type="button" aria-label="Cerrar" on:click={closeLegalModal}>×</button>
      <div class="legal-modal-brand"><img src="/img/mini_logo_flag.svg" alt="" /></div>
      <h2 id="legal-modal-title">{legalModal.title}</h2>
      <div class="legal-modal-content">{@html legalModal.content}</div>
    </div>
  </div>
{/if}

<CookieConsent {lang} />
