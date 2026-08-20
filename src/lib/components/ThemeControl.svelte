<script lang="ts">
  import { onMount } from 'svelte';
  import { Monitor, Moon, Sun } from '@lucide/svelte';

  type ThemePreference = 'system' | 'light' | 'dark';
  type ResolvedTheme = 'light' | 'dark';

  let { lang }: { lang: 'zh' | 'en' } = $props();
  let preference = $state<ThemePreference>('system');
  let resolved = $state<ResolvedTheme>('light');
  let mediaQuery: MediaQueryList | undefined;

  const labels = $derived(
    lang === 'zh'
      ? {
          group: '页面配色',
          system: '跟随系统',
          light: '日间模式',
          dark: '深色模式',
          current: '当前配色'
        }
      : {
          group: 'Page appearance',
          system: 'Follow system',
          light: 'Light mode',
          dark: 'Dark mode',
          current: 'Current appearance'
        }
  );

  function resolveTheme(next: ThemePreference): ResolvedTheme {
    if (next !== 'system') return next;
    return mediaQuery?.matches ? 'dark' : 'light';
  }

  function applyTheme(next: ThemePreference) {
    preference = next;
    resolved = resolveTheme(next);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = next;
    document.documentElement.style.colorScheme = resolved;
  }

  function selectTheme(next: ThemePreference) {
    try {
      localStorage.setItem('resume-theme', next);
    } catch {
      // The selected mode still applies for this page when storage is unavailable.
    }

    applyTheme(next);
  }

  onMount(() => {
    mediaQuery = matchMedia('(prefers-color-scheme: dark)');

    let stored: string | null = null;
    try {
      stored = localStorage.getItem('resume-theme');
    } catch {
      // Private browsing policies may make storage unavailable.
    }

    const initial: ThemePreference =
      stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    applyTheme(initial);

    const handleSystemChange = () => {
      if (preference === 'system') applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery?.removeEventListener('change', handleSystemChange);
  });
</script>

<div class="theme-control control-group" role="group" aria-label={labels.group}>
  <button
    type="button"
    class="icon-button"
    data-active={preference === 'system'}
    aria-pressed={preference === 'system'}
    aria-label={labels.system}
    title={labels.system}
    onclick={() => selectTheme('system')}
  >
    <Monitor size={16} strokeWidth={1.8} aria-hidden="true" />
  </button>
  <button
    type="button"
    class="icon-button"
    data-active={preference === 'light'}
    aria-pressed={preference === 'light'}
    aria-label={labels.light}
    title={labels.light}
    onclick={() => selectTheme('light')}
  >
    <Sun size={16} strokeWidth={1.8} aria-hidden="true" />
  </button>
  <button
    type="button"
    class="icon-button"
    data-active={preference === 'dark'}
    aria-pressed={preference === 'dark'}
    aria-label={labels.dark}
    title={labels.dark}
    onclick={() => selectTheme('dark')}
  >
    <Moon size={16} strokeWidth={1.8} aria-hidden="true" />
  </button>
  <span class="sr-only" aria-live="polite">{labels.current}: {resolved === 'dark' ? labels.dark : labels.light}</span>
</div>
