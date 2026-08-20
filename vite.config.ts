import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ isSsrBuild }) => ({
  appType: 'mpa',
  plugins: [tailwindcss(), svelte()],
  build: isSsrBuild
    ? {}
    : {
        outDir: 'build',
        rolldownOptions: {
          input: {
            main: resolve(import.meta.dirname, 'index.html'),
            en: resolve(import.meta.dirname, 'en/index.html')
          }
        }
      }
}));
