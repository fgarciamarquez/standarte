# WhatsApp Business — mensajes automáticos (30/09/2026)

La web publica el número de WhatsApp (`wa.me/34613097148`, botón y formulario de contacto), así que
buena parte de los leads llega por WhatsApp y no por el formulario. La app no reenvía mensajes al
correo; mientras no se pase a la API de Meta, la medida es que los mensajes automáticos pidan los
datos del presupuesto y enlacen al formulario, para que el lead entre en el sistema (correo + Supabase).

Dónde se configuran (app WhatsApp Business): **Ajustes → Herramientas para la empresa**.
- **Mensaje de bienvenida**: se envía a quien escribe por primera vez o tras 14 días sin conversación.
- **Mensaje de ausencia**: activar «Fuera del horario comercial» (el horario se define en Perfil de empresa).

## Mensaje de bienvenida (ES + EN)

```
¡Hola! Gracias por escribir a Standarte 👋 Diseñamos, fabricamos y montamos stands en España y Portugal.
Para enviarte presupuesto en 24 h, indícanos: feria, ciudad, m², fechas y tu email. O rellena el formulario: https://standarte.es/contacto
—
Hi! Thanks for contacting Standarte 👋 We design, build and install stands in Spain and Portugal.
For a quote within 24 h, tell us: fair, city, m², dates and your email. Or fill in the form: https://standarte.es/en/contact
```

## Mensaje de ausencia (ES + EN)

```
Gracias por tu mensaje. Ahora estamos fuera de horario; te respondemos el próximo día laborable.
Si tienes prisa, deja aquí feria, ciudad, m², fechas y tu email, o usa el formulario: https://standarte.es/contacto
—
Thanks for your message. We're out of office right now and will reply on the next working day.
In a hurry? Leave fair, city, m², dates and your email here, or use the form: https://standarte.es/en/contact
```

## Respuestas rápidas útiles (Ajustes → Herramientas para la empresa → Respuestas rápidas)

- `/datos` → «Para prepararte el presupuesto necesito: feria, ciudad, metros del stand, fechas y un email donde enviártelo. / To prepare your quote I need: fair, city, stand size in m², dates and an email to send it to.»
- `/formulario` → «Puedes dejarnos los datos aquí: https://standarte.es/contacto / You can leave your details here: https://standarte.es/en/contact»
