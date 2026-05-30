# STANDARTE_SVELTE

Versión estática en SvelteKit de la web de Standarte, con pequeños endpoints PHP conservados para el formulario.

## Estructura

- `src/lib/siteData.js`: idiomas, rutas limpias, textos y datos SEO.
- `src/lib/components/Site.svelte`: estructura principal de la web.
- `src/lib/components/MicroStand.svelte`: aplicación interactiva MICRO-STAND.
- `src/lib/components/ContactForm.svelte`: formulario que envía a PHP.
- `static/img` y `static/fonts`: recursos copiados desde la web optimizada.
- `static/admin`: PHP mínimo para procesar el formulario.
- `static/.ovhconfig`: preparado para PHP 8.3 en OVH.

## Desarrollo local

```bash
npm install
npm run dev -- --host 127.0.0.1
```

## Generar versión publicable

```bash
npm run build
```

La carpeta generada para subir al servidor será `dist`.

Antes de publicar, revisa `static/admin/config.php`: debe contener la configuración real del servidor, pero no conviene subir credenciales locales por accidente.
