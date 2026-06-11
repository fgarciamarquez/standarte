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
    inlineStyleThreshold: 102400
  }
};

export default config;
