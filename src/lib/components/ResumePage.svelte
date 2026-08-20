<script lang="ts">
  import type { Component } from 'svelte';
  import { FileText, Printer } from '@lucide/svelte';
  import LanguageControl from './LanguageControl.svelte';
  import SectionNav from './SectionNav.svelte';
  import ThemeControl from './ThemeControl.svelte';

  type Language = 'zh' | 'en';

  let { lang, content: ResumeContent }: { lang: Language; content: Component } = $props();

  const copy = $derived(
    lang === 'zh'
      ? {
          title: 'Asai Neko — 简历',
          description: 'Asai Neko 的中文简历：系统、基础设施、云原生、后端工程与 AI 应用。',
          documentLabel: '履历',
          languageLabel: '中文版',
          print: '打印简历',
          skip: '跳转到简历正文',
          brand: 'Asai Neko 中文简历'
        }
      : {
          title: 'Asai Neko — Résumé',
          description: 'Asai Neko’s résumé across systems, infrastructure, cloud native engineering, backend engineering, and applied AI.',
          documentLabel: 'Résumé',
          languageLabel: 'English edition',
          print: 'Print résumé',
          skip: 'Skip to résumé content',
          brand: 'Asai Neko English résumé'
        }
  );

  async function printResume() {
    await document.fonts.ready;
    window.print();
  }
</script>

<svelte:head>
  <title>{copy.title}</title>
  <meta name="description" content={copy.description} />
  <link rel="alternate" hreflang="zh-CN" href="/" />
  <link rel="alternate" hreflang="en" href="/en/" />
  <link rel="alternate" hreflang="x-default" href="/" />
</svelte:head>

<a class="skip-link" href="#resume-content">{copy.skip}</a>

<div class="site-shell min-h-screen">
  <header class="toolbar screen-only" aria-label={lang === 'zh' ? '简历工具栏' : 'Résumé toolbar'}>
    <a class="brand" href={lang === 'zh' ? '/' : '/en/'} aria-label={copy.brand}>
      <span class="brand-mark" aria-hidden="true">
        <img src="/avatar.png" alt="" width="128" height="128" />
      </span>
      <span class="brand-name">Asai Neko</span>
      <span class="brand-label">CV</span>
    </a>

    <div class="toolbar-actions">
      <LanguageControl {lang} />
      <ThemeControl {lang} />
      <button type="button" class="print-button icon-button" aria-label={copy.print} title={copy.print} onclick={printResume}>
        <Printer size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  </header>

  <div class="page-grid">
    <aside class="section-rail screen-only">
      <SectionNav {lang} />
    </aside>

    <main id="resume-content" class="resume-paper" tabindex="-1">
      <div class="document-stamp" aria-hidden="true">
        <span><FileText size={14} strokeWidth={1.8} /> {copy.documentLabel}</span>
        <span>{copy.languageLabel}</span>
      </div>

      <article class="resume-content">
        <ResumeContent />
      </article>
    </main>
  </div>
</div>
