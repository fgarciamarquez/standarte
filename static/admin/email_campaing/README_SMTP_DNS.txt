CONFIGURACIÓN DE ENVÍO Y CONFIANZA DE LOS SERVIDORES (standarte.es)
==================================================================
Última revisión: 2026-06-16.


1. SERVIDOR Y MÉTODO DE CONEXIÓN (lo que usa el gestor AHORA)
------------------------------------------------------------
El Gestor de Emails Multimedia envía por SMTP autenticado al buzón de OVH.
Configuración real en config.php > smtp (NO es Gmail):

  Servidor (host):  ssl0.ovh.net
  Puerto:           465
  Seguridad:        SSL directo (no STARTTLS)
  Usuario:          info@standarte.es
  Contraseña:       se lee de data/smtp_password.txt (fuera del repositorio)
  EHLO/HELO:        standarte.es
  Método de auth:   AUTH LOGIN (usuario + contraseña en base64)

Flujo de envío (mailer.php > campaign_send_mail):
  1. Comprueba en Supabase que el destinatario no esté de baja ni rebotado.
  2. Envía por SMTP autenticado (campaign_send_smtp): EHLO -> AUTH LOGIN ->
     MAIL FROM -> RCPT TO -> DATA. Cabeceras From/Reply-To/Return-Path/
     Errors-To/Message-ID propias.
  3. Si el SMTP falla, NO se reenvía por mail() de PHP. El respaldo a mail() se
     DESACTIVÓ el 2026-06-16: un correo enviado por mail() no lo firma DKIM de
     OVH, falla DMARC y lo rechaza el receptor (además de dañar la reputación).
     El fallo se registra como method "smtp-failed" en data/send-log.json.
  4. Registra el resultado en data/send-log.json y marca el contacto activo.

IMPORTANTE: como ya no hay respaldo, si fallan TODOS los envíos, casi siempre es
la contraseña SMTP (data/smtp_password.txt) desactualizada tras rotarla en OVH.
  - Síntoma en el log: method "smtp-failed".
  - Solución: pegar la contraseña real del buzón info@standarte.es en
    data/smtp_password.txt (sin espacios ni saltos de línea finales).


2. CREDENCIALES DE AUTENTICACIÓN DNS (lo que da CONFIANZA a Gmail/Outlook)
-------------------------------------------------------------------------
  [OK]  MX    -> mx1/mx2/mx3.mail.ovh.net (correo gestionado por OVH).
  [OK]  SPF   -> publicado: "v=spf1 include:mx.ovh.com -all"
  [OK]  DKIM  -> ACTIVADO en el panel de OVH el 2026-06-16. OVH firma cada
                 correo saliente automáticamente; el gestor no firma nada.
  [OK]  DMARC -> PUBLICADO el 2026-06-16 en _dmarc.standarte.es
                 (política inicial p=none, modo observación).

PENDIENTE: VERIFICAR EN VIVO tras la propagación del DNS (1-24 h)
  1. Enviar un correo de prueba a una cuenta de Gmail propia.
  2. Abrirlo -> menú (tres puntos) -> "Mostrar original".
  3. En la cabecera Authentication-Results deben aparecer las tres:
        spf=pass    dkim=pass    dmarc=pass
  Solo cuando las tres den "pass" la autenticación está confirmada de verdad.

ENDURECIMIENTO PROGRESIVO DE DMARC (panel DNS de OVH, registro TXT _dmarc):
  Cuando lleve semanas con dkim=pass estable y sin incidencias:
     p=none  ->  p=quarantine  ->  p=reject

SPF: ya correcto. No tocar salvo que se añada otro emisor (entonces sumar su
include antes de "-all").


3. BUENAS PRÁCTICAS DE ENVÍO (reputación)
-----------------------------------------
- El dominio estuvo enviando sin DKIM/DMARC y con rechazos: su reputación puede
  estar tocada. CALENTAR el dominio: empezar con tandas pequeñas y subir el
  volumen poco a poco durante varios días antes de envíos masivos.
- Enviar siempre desde info@standarte.es (coincide con SPF/DKIM del dominio).
- Mantener texto real junto a las imágenes (no enviar solo imagen).
- Evitar asuntos en mayúsculas o demasiado agresivos.
- Pedir respuesta a los primeros contactos (mejora la reputación).
- El gestor ya respeta bajas y rebotes (Supabase) antes de cada envío.
