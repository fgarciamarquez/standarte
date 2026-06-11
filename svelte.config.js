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
    inlineStyleThreshold: 20480
  }
};

export default config;
