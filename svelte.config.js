import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      strict: true
    }),
    paths: {
      relative: false
    },
    prerender: {
      // StandQuote no genera artículos de blog (entries() vacío en /blog/[slug]),
      // así que esa ruta sin páginas es esperada SOLO en esa marca; cualquier otra
      // ruta prerenderizable no alcanzada sigue rompiendo el build, como siempre.
      handleUnseenRoutes: ({ routes }) => {
        const isStandquote = process.env.PUBLIC_BRAND === 'standquote';
        const rest = routes.filter((r) => !(isStandquote && r === '/blog/[slug]'));
        if (rest.length) {
          throw new Error(`Rutas prerenderizables no alcanzadas: ${rest.join(', ')}`);
        }
      }
    },
    // Versión FIJA (determinista). Por defecto SvelteKit usa Date.now(), que inyecta un
    // token __sveltekit_<id> distinto en CADA página en cada build → todas las páginas
    // cambiaban de hash en cada build y el despliegue incremental tenía que resubirlas.
    // Con un nombre estable, las páginas no modificadas salen idénticas entre builds y
    // el deploy solo mueve lo que de verdad cambió. (El cache-busting lo dan los nombres
    // de chunk con hash de contenido, no este campo.)
    version: {
      name: 'standarte-static'
    },
    inlineStyleThreshold: 102400
  }
};

export default config;
