<script>
  // Formulario de captación de StandQuote. Solo se monta cuando BRAND.leadGen:
  // en standarte.es no existe. El envío pasa por submit_standquote_lead
  // (SECURITY DEFINER), que exige el consentimiento GDPR: el texto aceptado se
  // guarda junto al lead como prueba de qué consintió exactamente el usuario.
  import { BRAND } from '$lib/brand.js';
  import { submitLead } from '$lib/standquote.js';

  export let lang = 'es';
  export let fairName = '';
  export let fairSlug = '';
  export let cityName = '';

  const T = {
    es: {
      title: (ctx) => ctx ? `Recibe presupuestos para tu stand en ${ctx}` : 'Recibe presupuestos para tu stand',
      lead: 'Cuéntanos tu proyecto y te pondremos en contacto con constructores de stands asociados que te presentarán sus propuestas. Gratis y sin compromiso.',
      name: 'Nombre', email: 'Email', phone: 'Teléfono (opcional)', company: 'Empresa (opcional)',
      size: 'Tamaño aproximado del stand', sizes: ['Hasta 20 m²', '20–50 m²', '50–100 m²', 'Más de 100 m²', 'No lo sé aún'],
      message: 'Cuéntanos algo más (opcional)…',
      consent: 'Acepto que mis datos se compartan con empresas constructoras de stands asociadas a StandQuote con el único fin de elaborar y presentarme sus propuestas y presupuestos. Puedo ejercer mis derechos de acceso, rectificación y supresión escribiendo a',
      send: 'Recibir presupuestos', sending: 'Enviando…',
      okMsg: '¡Recibido! Los constructores asociados se pondrán en contacto contigo en breve.',
      errConsent: 'Debes aceptar la casilla de consentimiento para continuar.',
      errFields: 'Revisa el nombre y el email.', errFast: 'Ya hemos recibido tu solicitud hace un momento.', errGeneric: 'No se pudo enviar. Inténtalo de nuevo en unos minutos.'
    },
    en: {
      title: (ctx) => ctx ? `Get quotes for your stand at ${ctx}` : 'Get quotes for your stand',
      lead: 'Tell us about your project and we will connect you with partner stand builders who will present their proposals. Free and with no obligation.',
      name: 'Name', email: 'Email', phone: 'Phone (optional)', company: 'Company (optional)',
      size: 'Approximate stand size', sizes: ['Up to 20 m²', '20–50 m²', '50–100 m²', 'Over 100 m²', 'Not sure yet'],
      message: 'Tell us a bit more (optional)…',
      consent: 'I agree that my data may be shared with stand-building companies partnered with StandQuote for the sole purpose of preparing and presenting their proposals and quotes to me. I can exercise my rights of access, rectification and erasure by writing to',
      send: 'Get quotes', sending: 'Sending…',
      okMsg: 'Received! Partner builders will contact you shortly.',
      errConsent: 'You must tick the consent box to continue.',
      errFields: 'Please check the name and email.', errFast: 'We already received your request a moment ago.', errGeneric: 'Could not send. Please try again in a few minutes.'
    }
  };
  $: L = T[lang] || T.en;
  $: ctx = fairName || cityName || '';

  let name = '', email = '', phone = '', company = '', size = '', message = '', consent = false;
  let website = ''; // honeypot: los humanos no lo ven; los bots lo rellenan
  let state = 'idle'; // idle | sending | ok | error
  let errMsg = '';

  async function send() {
    errMsg = '';
    if (website) { state = 'ok'; return; } // bot: fingimos éxito sin registrar nada
    if (!consent) { errMsg = L.errConsent; return; }
    state = 'sending';
    const consentText = `${L.consent} ${BRAND.email}`;
    const r = await submitLead({
      p_name: name, p_email: email, p_phone: phone, p_company: company,
      p_fair_slug: fairSlug || null, p_city: cityName || null, p_stand_size: size || null,
      p_message: message, p_lang: lang,
      p_source_path: typeof location !== 'undefined' ? location.pathname : '',
      p_consent: true, p_consent_text: consentText
    }).catch(() => ({ ok: false, error: 'network' }));
    if (r && r.ok) { state = 'ok'; return; }
    state = 'error';
    errMsg = r?.error === 'too_fast' ? L.errFast : r?.error === 'invalid_fields' ? L.errFields : r?.error === 'consent_required' ? L.errConsent : L.errGeneric;
  }
</script>

{#if BRAND.leadGen}
  <section class="sq-lead" id="presupuestos">
    <h2>{L.title(ctx)}</h2>
    <p class="sq-lead-intro">{L.lead}</p>
    {#if state === 'ok'}
      <p class="sq-ok">✓ {L.okMsg}</p>
    {:else}
      <form on:submit|preventDefault={send}>
        <div class="sq-grid">
          <input required placeholder={L.name} bind:value={name} autocomplete="name" />
          <input required type="email" placeholder={L.email} bind:value={email} autocomplete="email" />
          <input placeholder={L.phone} bind:value={phone} autocomplete="tel" />
          <input placeholder={L.company} bind:value={company} autocomplete="organization" />
          <select bind:value={size} aria-label={L.size}>
            <option value="">{L.size}</option>
            {#each L.sizes as s}<option value={s}>{s}</option>{/each}
          </select>
          <input class="sq-hp" type="text" bind:value={website} tabindex="-1" autocomplete="off" aria-hidden="true" />
        </div>
        <textarea rows="3" placeholder={L.message} bind:value={message}></textarea>
        <label class="sq-consent">
          <input type="checkbox" bind:checked={consent} required />
          <span>{L.consent} <a href="mailto:{BRAND.email}">{BRAND.email}</a>.</span>
        </label>
        {#if errMsg}<p class="sq-err">{errMsg}</p>{/if}
        <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? L.sending : L.send}</button>
      </form>
    {/if}
  </section>
{/if}

<style>
  .sq-lead {
    max-width: 760px; margin: 28px auto; padding: 24px 22px;
    background: #f4fafc; border: 1px solid rgba(14, 116, 144, 0.25); border-radius: 12px;
  }
  .sq-lead h2 { margin: 0 0 6px; font-size: 1.35rem; }
  .sq-lead-intro { margin: 0 0 14px; color: #3d4a52; }
  .sq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 560px) { .sq-grid { grid-template-columns: 1fr; } }
  input, select, textarea {
    padding: 10px 12px; border: 1px solid #c5d5db; border-radius: 8px;
    font: inherit; background: #fff; width: 100%; box-sizing: border-box;
  }
  textarea { margin-top: 10px; }
  .sq-hp { position: absolute; left: -9999px; height: 0; width: 0; opacity: 0; }
  .sq-consent { display: flex; gap: 10px; align-items: flex-start; margin: 12px 0; font-size: 0.88rem; color: #3d4a52; }
  .sq-consent input { width: auto; margin-top: 3px; }
  button {
    background: var(--brand-accent, #0e7490); color: #fff; border: 0; border-radius: 999px;
    padding: 12px 28px; font-weight: 700; font-size: 1rem; cursor: pointer;
  }
  button:disabled { opacity: 0.6; cursor: wait; }
  .sq-ok { font-weight: 700; color: #0a5a70; }
  .sq-err { color: #c0392b; font-weight: 600; margin: 4px 0 8px; }
</style>
