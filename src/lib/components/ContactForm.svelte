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
          <li>C/ de Moratin. 28012. Madrid</li>
          <li>+34 613 097 148</li>
          <li><a class="link_email _gold" href="mailto:hola@standarte.es">hola@standarte.es</a></li>
        </ul>
        {#if statusMessage}
          <div id="error_presupuesto_form" class:form-error={status === 'error'}>
            <p class="form-note">{@html statusMessage}</p>
          </div>
        {/if}
      </aside>

      <div class="contact-block">
        <form id="presupuestoForm" method="post" action="/admin/ajax_presupuesto_form.php" on:submit={handleSubmit}>
          <input type="hidden" name="form_lang" value={lang} />

          <div class="form-row">
            <div class="col col-6"><input class="form-control" name="form_nombre" placeholder={labels.form.name} required /></div>
            <div class="col col-6"><input class="form-control" name="form_empresa" placeholder={labels.form.company} required /></div>
            <div class="col col-6"><input class="form-control" name="form_tlf" placeholder={labels.form.phone} required /></div>
            <div class="col col-6"><input class="form-control" name="form_email" placeholder={labels.form.email} type="email" required /></div>
            <div class="col col-6"><input class="form-control" name="form_feria" placeholder={labels.form.fair} required /></div>
            <div class="col col-3"><input class="form-control" name="form_localizacion" placeholder={labels.form.location} required /></div>
            <div class="col col-3"><input class="form-control" name="form_metros" placeholder={labels.form.meters} required /></div>

            <div class="col col-12 _apartado_form"><span class="_apartado">{labels.form.floor}</span></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="form_suelo" id="tarima_madera" value="tarima_madera" /><label class="form-check-label" for="tarima_madera">{labels.form.woodFloor}</label></div></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="form_suelo" id="tarima_moqueta" value="tarima_moqueta" /><label class="form-check-label" for="tarima_moqueta">{labels.form.carpetPlatform}</label></div></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="form_suelo" id="moqueta" value="moqueta" /><label class="form-check-label" for="moqueta">{labels.form.carpet}</label></div></div>

            <div class="col col-12 _apartado_form"><span class="_apartado">{labels.form.spaceDistribution}</span></div>
            <div class="col col-3"><input type="hidden" name="zona_recepcion" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_recepcion" name="zona_recepcion" value="Y" /><label class="form-check-label" for="zona_recepcion">{labels.form.reception}</label></div></div>
            <div class="col col-3"><input type="hidden" name="zona_bar" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_bar" name="zona_bar" value="Y" /><label class="form-check-label" for="zona_bar">{labels.form.bar}</label></div></div>
            <div class="col col-3"><input type="hidden" name="zona_almacen" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_almacen" name="zona_almacen" value="Y" /><label class="form-check-label" for="zona_almacen">{labels.form.storage}</label></div></div>
            <div class="col col-3"><input type="hidden" name="zona_exposicion" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_exposicion" name="zona_exposicion" value="Y" /><label class="form-check-label" for="zona_exposicion">{labels.form.product}</label></div></div>
            <div class="col col-6"><input type="hidden" name="zona_reuniones_abierta" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_reuniones_abierta" name="zona_reuniones_abierta" value="Y" /><label class="form-check-label" for="zona_reuniones_abierta">{labels.form.openMeeting}</label></div></div>
            <div class="col col-6"><input type="hidden" name="zona_reuniones_cerrada" value="N" /><div class="form-check checkbox checkbox-warning"><input class="form-check-input" type="checkbox" id="zona_reuniones_cerrada" name="zona_reuniones_cerrada" value="Y" /><label class="form-check-label" for="zona_reuniones_cerrada">{labels.form.closedMeeting}</label></div></div>

            <div class="col col-12 _apartado_form"><span class="_apartado">{labels.form.audiovisual}</span></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="audiovisual" id="video_wall" value="video_wall" /><label class="form-check-label" for="video_wall">Video-Wall</label></div></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="audiovisual" id="pantalla_led" value="pantalla_led" /><label class="form-check-label" for="pantalla_led">{labels.form.led}</label></div></div>
            <div class="col col-3"><div class="form-check radio radio-warning"><input class="form-check-input" type="radio" name="audiovisual" id="proyector" value="proyector" /><label class="form-check-label" for="proyector">{labels.form.projector}</label></div></div>

            <div class="col col-12 _apartado_form"></div>
            <div class="col col-12"><input class="form-control" name="form_presupuesto" placeholder={labels.form.budget} required /></div>
            <div class="col col-12"><textarea class="form-control" name="form_descripcion" placeholder={labels.form.description} rows="8" required></textarea></div>
            <div class="col col-12">
              <div class="form-check checkbox checkbox-warning privacy-check">
                <input id="yes_privacy" type="checkbox" required />
                <label for="yes_privacy">{labels.form.privacy}</label>
              </div>
            </div>
            <div class="col col-12">
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
