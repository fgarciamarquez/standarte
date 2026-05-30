Mejoras recomendadas para que los emails lleguen como correo principal
=====================================================================

1. SMTP autenticado
-------------------
El gestor ya está preparado para enviar mediante SMTP autenticado usando:

Servidor: ssl0.ovh.net
Puerto: 587
Seguridad: TLS
Usuario: promo@standarte.es

Para activarlo falta introducir la contraseña real del buzón. Opciones:

- Opción recomendada: definir en el servidor la variable de entorno
  STANDARTE_SMTP_PASSWORD con la contraseña de promo@standarte.es.

- Opción rápida: escribir la contraseña en static/admin/email_campaing/config.php,
  dentro de smtp > password. Si usa esta opción, mantenga la carpeta admin
  protegida y no comparta este archivo.

Mientras no haya contraseña SMTP, el sistema usará mail() de PHP como respaldo.

2. DNS del dominio
------------------
En el panel DNS de standarte.es conviene revisar:

- SPF: debe autorizar los servidores de correo usados por OVH.
  En OVH suele usarse un TXT similar a:
  v=spf1 include:mx.ovh.com ~all

- DKIM: debe activarse desde el panel de correo de OVH. OVH mostrará el
  registro TXT exacto que hay que publicar.

- DMARC: puede empezar en modo observación con un TXT en _dmarc:
  v=DMARC1; p=none; rua=mailto:promo@standarte.es; adkim=s; aspf=s

Cuando se compruebe que SPF y DKIM funcionan correctamente, DMARC puede
endurecerse a quarantine o reject.

3. Buenas prácticas de contenido
--------------------------------
- Enviar desde promo@standarte.es.
- Mantener texto real junto a las imágenes.
- Evitar asuntos demasiado agresivos o con exceso de mayúsculas.
- Enviar primero pruebas a pocos destinatarios.
- Pedir a los primeros contactos que respondan o marquen el correo como seguro.
