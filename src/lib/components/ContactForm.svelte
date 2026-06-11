<script>
  export let lang;
  export let labels;
  let status = null;
  let statusMessage = '';
  let sending = false;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

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
          <li style="font-weight: 600; margin-bottom: 5px;">+34 637 894 819</li>
          <li><a class="link_email _gold" href="mailto:info@standarte.es">info@standarte.es</a></li>
        </ul>
        {#if statusMessage}
          <div id="error_presupuesto_form" class:form-error={status === 'error'} class:form-success={status === 'success'}>
            <p class="form-note">{@html statusMessage}</p>
          </div>
        {/if}
      </aside>

      <div class="contact-block">
        <form id="presupuestoForm" method="post" action="/admin/ajax_presupuesto_form.php" on:submit={handleSubmit}>
          <input type="hidden" name="form_lang" value={lang} />

          <div class="form-row">
            <div class="col col-6 form-group">
              <label for="form_nombre" class="form-label">{labels.form.name}</label>
              <input id="form_nombre" class="form-control" name="form_nombre" placeholder={labels.form.name} required />
            </div>
            <div class="col col-6 form-group">
              <label for="form_email" class="form-label">{labels.form.email}</label>
              <input id="form_email" class="form-control" name="form_email" placeholder={labels.form.email} type="email" required />
            </div>
            <div class="col col-12 form-group">
              <label for="form_descripcion" class="form-label">{labels.form.description}</label>
              <textarea id="form_descripcion" class="form-control" name="form_descripcion" placeholder={labels.form.description} rows="6" required></textarea>
            </div>
            <div class="col col-12 privacy-container">
              <div class="form-check checkbox checkbox-warning privacy-check">
                <input id="yes_privacy" type="checkbox" required />
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
</style>
