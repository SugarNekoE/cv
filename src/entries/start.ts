import '@fontsource-variable/noto-sans/wght.css';
import '@fontsource-variable/noto-sans-sc/wght.css';
import { hydrate, mount, type Component } from 'svelte';
import '../app.css';
import ResumePage from '../lib/components/ResumePage.svelte';

type Language = 'zh' | 'en';

export function start(lang: Language, content: Component) {
  const target = document.querySelector<HTMLElement>('#app');

  if (!target) throw new Error('Missing #app mount target');

  const options = {
    target,
    props: { lang, content }
  };

  if (target.dataset.prerendered === 'true') {
    hydrate(ResumePage, options);
    return;
  }

  target.replaceChildren();
  mount(ResumePage, options);
}
