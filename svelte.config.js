import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

const markdownExtensions = ['.md'];

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
  extensions: ['.svelte', ...markdownExtensions],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: markdownExtensions,
      rehypePlugins: [rehypeSlug]
    })
  ]
};

export default config;
