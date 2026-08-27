import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  // Vite solo expone al CLIENTE las variables con prefijo VITE_ por defecto.
  // PUBLIC_BRAND debe llegar también al bundle del navegador: sin esto, el HTML
  // se prerenderiza con la marca correcta pero la hidratación resuelve BRAND
  // como 'standarte' y re-pinta la página entera con la otra marca (el "flash"
  // de StandQuote). Con el prefijo, import.meta.env.PUBLIC_BRAND se sustituye
  // estáticamente en cliente y servidor con el mismo valor.
  envPrefix: ['VITE_', 'PUBLIC_']
};
