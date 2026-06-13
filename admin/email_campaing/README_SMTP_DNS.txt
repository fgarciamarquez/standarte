CONFIGURACIÓN DE ENVÍO Y CONFIANZA DE LOS SERVIDORES (standarte.es)
==================================================================
Última revisión: 2026-06-13 (verificado contra el servidor en vivo).


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

Flujo de envío (mailer.php > campaign_send_mail):
  1. Comprueba en Supabase que el destinatario no esté de baja ni rebotado.
  2. Envía por SMTP autenticado (campaign_send_smtp): EHLO -> AUTH LOGIN ->
     MAIL FROM -> RCPT TO -> DATA. Cabeceras From/Reply-To/Return-Path/
     Errors-To/Message-ID propias.
  3. Si el SMTP falla, respaldo automático con mail() de PHP.
  4. Registra el resultado en data/send-log.json y marca el contacto activo.

Conexión verificada el 2026-06-13: AUTH LOGIN correcto contra ssl0.ovh.net:465.
El panel muestra "Servidor SMTP de OVH Activo" cuando todo está en orden.


2. CREDENCIALES DE AUTENTICACIÓN DNS (lo que da CONFIANZA a Gmail/Outlook)
-------------------------------------------------------------------------
Estado comprobado en vivo el 2026-06-13:

  [OK]    MX     -> mx1/mx2/mx3.mail.ovh.net (correo gestionado por OVH).
  [OK]    SPF    -> publicado: "v=spf1 include:mx.ovh.com -all"
  [FALTA] DKIM   -> NO publicado para ningún selector (ovh, mail, selector1...).
  [FALTA] DMARC  -> NO publicado en _dmarc.standarte.es

Sin DKIM ni DMARC, los correos se apoyan solo en SPF: llegan, pero con menos
confianza y más riesgo de spam, sobre todo en envíos masivos.

ACCIONES PENDIENTES (se hacen en el panel de OVH, no por FTP ni por código):

  A) DKIM  — Panel OVH > Web Cloud > Emails > standarte.es > pestaña DKIM:
     pulsar "Activar DKIM". OVH genera la clave y publica/propone el registro
     TXT en ovh._domainkey.standarte.es automáticamente (si el DNS es de OVH).
     OVH se encarga de firmar cada correo saliente; el gestor no firma nada.

  B) DMARC — Publicar en el DNS de standarte.es un registro TXT:
       Nombre/Host:  _dmarc
       Tipo:         TXT
       Valor:        v=DMARC1; p=none; rua=mailto:info@standarte.es; adkim=s; aspf=s
     Empezar en p=none (modo observación). Cuando SPF y DKIM lleven semanas
     alineados sin incidencias, endurecer a p=quarantine y luego p=reject.

  C) SPF — Ya correcto. No tocar salvo que se añada otro emisor (entonces
     sumar su include antes de "-all").


3. BUENAS PRÁCTICAS DE ENVÍO
----------------------------
- Enviar siempre desde info@standarte.es (coincide con SPF/DKIM del dominio).
- Mantener texto real junto a las imágenes (no enviar solo imagen).
- Evitar asuntos en mayúsculas o demasiado agresivos.
- Empezar con tandas pequeñas y pedir respuesta a los primeros contactos.
- El gestor ya respeta bajas y rebotes (Supabase) antes de cada envío.
