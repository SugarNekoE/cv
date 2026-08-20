<script lang="ts">
  import { Languages } from '@lucide/svelte';

  let { lang }: { lang: 'zh' | 'en' } = $props();

  const label = $derived(lang === 'zh' ? '切换简历语言' : 'Switch résumé language');
</script>

<nav class="language-control control-group" aria-label={label}>
  <Languages size={16} strokeWidth={1.8} aria-hidden="true" />
  <a href="/" hreflang="zh-CN" aria-current={lang === 'zh' ? 'page' : undefined} data-active={lang === 'zh'}>
    CN
  </a>
  <span aria-hidden="true">/</span>
  <a href="/en/" hreflang="en" aria-current={lang === 'en' ? 'page' : undefined} data-active={lang === 'en'}>
    EN
  </a>
</nav>
