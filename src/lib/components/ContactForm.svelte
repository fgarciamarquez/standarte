<script>
  import { onMount } from 'svelte';
  export let lang;
  export let labels;
  let status = null;
  let statusMessage = '';
  let sending = false;
  // Time-trap anti-spam: marca de tiempo de carga (solo cliente).
  let mountedAt = 0;
  onMount(() => { mountedAt = Date.now(); });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // ms transcurridos desde la carga; si por lo que sea no hay marca, enviamos un
    // valor que pasa el filtro (fail-open) para no bloquear nunca a una persona.
    formData.append('form_elapsed', String(mountedAt ? Date.now() - mountedAt : 3000));

    sending = true;
    status = null;
    statusMessage = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      status = result.error === 'success' ? 'success' : 'error';
      statusMessage = result.msg || labels.formSuccess;

      if (status === 'success') {
        form.reset();
      }
    } catch (error) {
      status = 'error';
      statusMessage = labels.formError || 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.';
    } finally {
      sending = false;
    }
  }
</script>

<section id="contact" class="section contact">
  <div class="contact-form">
    <div class="contact-layout">
      <aside class="contact-us">
        <h3>{labels.contactTitle}</h3>
        <p class="politica_privacidad">{labels.contactNotice}</p>
        <ul class="lista_direccion">
          <li style="margin-bottom: 10px; line-height: 1.4;">
            <strong>{lang === 'es' ? 'Madrid' : (lang === 'zh' ? '马德里' : (lang === 'ko' ? '마드리드' : (lang === 'hi' ? 'मैड्रिड' : 'Madrid')))}:</strong> Av. de Castilla 2, San Fernando de Henares (Madrid - España)
          </li>
          <li style="margin-bottom: 18px; line-height: 1.4;">
            <strong>Extremadura:</strong> C/ Los Sauces 24, 10004 Cáceres (España)
          </li>
          <li class="whatsapp-li">
            <a class="contact-whatsapp" href="https://wa.me/34613097148" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>WhatsApp</span>
            </a>
          </li>
        </ul>
        {#if statusMessage}
          <div id="error_presupuesto_form" class:form-error={status === 'error'} class:form-success={status === 'success'}>
            <p class="form-note">{@html statusMessage}</p>
          </div>
        {/if}
      </aside>

      <div class="contact-block">
        <form id="presupuestoForm" method="post" accept-charset="UTF-8" action="/admin/ajax_presupuesto_form.php" on:submit={handleSubmit}>
          <input type="hidden" name="form_lang" value={lang} />

          <!-- Honeypot anti-spam: invisible para humanos; si llega relleno, el servidor descarta el envío -->
          <div class="hp-field" aria-hidden="true">
            <input type="text" name="form_web" tabindex="-1" autocomplete="off" />
          </div>

          <div class="form-row">
            <div class="col col-6 form-group">
              <label for="form_nombre" class="form-label">{labels.form.name}</label>
              <input id="form_nombre" class="form-control" name="form_nombre" placeholder={labels.form.name} required />
            </div>
            <div class="col col-6 form-group">
              <label for="form_email" class="form-label">{labels.form.email}</label>
              <input id="form_email" class="form-control" name="form_email" placeholder={labels.form.email} type="email" required />
            </div>
            <!-- Empresa y Teléfono: ocultos por ahora (sin required para no bloquear el envío).
                 Reservados para una etapa posterior del formulario; para reactivarlos basta con
                 quitar la clase field-hidden (y volver a poner required en Empresa si procede). -->
            <div class="col col-6 form-group field-hidden">
              <label for="form_empresa" class="form-label">{labels.form.company}</label>
              <input id="form_empresa" class="form-control" name="form_empresa" placeholder={labels.form.company} />
            </div>
            <div class="col col-6 form-group field-hidden">
              <label for="form_tlf" class="form-label">{labels.form.phone}</label>
              <input id="form_tlf" class="form-control" name="form_tlf" placeholder={labels.form.phone} type="tel" />
            </div>
            <div class="col col-6 form-group">
              <label for="form_feria" class="form-label">{labels.form.fair}</label>
              <input id="form_feria" class="form-control" name="form_feria" placeholder={labels.form.fair} required />
            </div>
            <div class="col col-6 form-group">
              <label for="form_metros" class="form-label">{labels.form.meters}</label>
              <input id="form_metros" class="form-control" name="form_metros" placeholder={labels.form.meters} type="number" min="1" required />
            </div>
            <div class="col col-12 form-group">
              <label for="form_descripcion" class="form-label">{labels.form.description}</label>
              <textarea id="form_descripcion" class="form-control" name="form_descripcion" placeholder={labels.form.description} rows="6" required></textarea>
            </div>
            <div class="col col-12 privacy-container">
              <div class="form-check checkbox checkbox-warning privacy-check">
                <input id="yes_privacy" type="checkbox" name="form_privacidad" value="1" required />
                <label for="yes_privacy">{labels.form.privacy}</label>
              </div>
            </div>
            <div class="col col-12 submit-container">
              <div class="submit-button">
                <button type="submit" class="btn btn-common" id="presupuesto_form_btn" disabled={sending}>
                  {sending ? '...' : labels.form.send}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  /* Campos reservados para una etapa posterior: ocultos pero presentes en el DOM */
  .field-hidden {
    display: none !important;
  }

  /* Honeypot fuera de pantalla (no usar display:none, algunos bots lo detectan) */
  .hp-field {
    position: absolute;
    left: -9999px;
    top: -9999px;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    text-align: left;
  }

  .form-label {
    display: block;
    font-family: Inconsolata, monospace;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;
    transition: color 0.25s ease;
  }

  .form-group:focus-within .form-label {
    color: #ffc800;
  }

  .form-control {
    width: 100% !important;
    min-height: 54px !important;
    margin-bottom: 0 !important;
    padding: 14px 18px !important;
    color: #fff !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 8px !important;
    font-size: 16px !important;
    font-family: Inconsolata, monospace !important;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease !important;
  }

  .form-control::placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
  }

  .form-control:focus {
    color: #fff !important;
    background: rgba(0, 0, 0, 0.25) !important;
    border-color: #ffc800 !important;
    box-shadow: 0 0 0 4px rgba(255, 200, 0, 0.15) !important;
    outline: none !important;
  }

  .contact textarea.form-control {
    min-height: 150px !important;
    resize: vertical !important;
  }

  .privacy-container {
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .privacy-check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: rgba(255, 255, 255, 0.85);
    font-size: 16px;
    line-height: 1.4;
  }

  .privacy-check input[type="checkbox"] {
    margin-top: 3px;
    accent-color: #ffc800;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  .privacy-check label {
    margin-left: 0 !important;
    cursor: pointer;
    user-select: none;
  }

  .submit-container {
    margin-top: 10px;
  }

  .btn-common {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 180px;
    min-height: 48px;
    margin-top: 0 !important;
    padding: 10px 32px !important;
    color: #000 !important;
    background: #ffc800 !important;
    border: 1px solid #ffc800 !important;
    border-radius: 30px !important;
    font-family: Glegoo, serif !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    letter-spacing: 0.05em !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.2) !important;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease !important;
  }

  .btn-common:hover, .btn-common:focus {
    background: #e6b400 !important;
    border-color: #e6b400 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 18px rgba(255, 200, 0, 0.35) !important;
  }

  .btn-common:active {
    transform: translateY(0) !important;
    box-shadow: 0 3px 8px rgba(255, 200, 0, 0.2) !important;
  }

  .btn-common:disabled {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.05) !important;
    color: rgba(255, 255, 255, 0.35) !important;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
  }

  .form-success {
    background-color: #2ebc5c;
    color: #ffffff;
    padding: 16px 20px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 4px 15px rgba(46, 188, 92, 0.3);
    border: 2px solid #239447;
    animation: fadeIn 0.5s ease-out;
  }

  .form-error {
    background-color: #e74c3c;
    color: #ffffff;
    padding: 16px 20px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
    border: 2px solid #c0392b;
    animation: fadeIn 0.5s ease-out;
  }
  
  .form-success .form-note, .form-error .form-note {
    margin: 0;
    line-height: 1.5;
    color: #fff !important;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .politica_privacidad {
    font-size: 17px !important;
    color: #ffc800 !important;
    line-height: 1.55 !important;
    margin-bottom: 25px !important;
  }

  .lista_direccion {
    padding-left: 0 !important;
    margin-left: 0 !important;
  }

  .whatsapp-li {
    list-style: none !important;
    margin-top: 12px !important;
  }

  .contact-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 26px;
    background: #25d366;
    color: #fff !important;
    border-radius: 30px;
    font-family: Glegoo, serif;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.03em;
    text-decoration: none !important;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .contact-whatsapp:hover,
  .contact-whatsapp:focus {
    background: #1ebe57;
    color: #fff !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
  }

  .contact-whatsapp svg {
    fill: currentColor;
    flex-shrink: 0;
  }
</style>
