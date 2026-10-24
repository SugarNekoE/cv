import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const isolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp'
};

export default defineConfig(({ isSsrBuild }) => ({
  appType: 'mpa',
  plugins: [tailwindcss(), svelte()],
  server: {
    headers: isolationHeaders
  },
  preview: {
    headers: isolationHeaders
  },
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
