<script lang="ts">
  import { tick, type Component } from 'svelte';
  import { FileText, LoaderCircle, Printer } from '@lucide/svelte';
  import LanguageControl from './LanguageControl.svelte';
  import SectionNav from './SectionNav.svelte';
  import ThemeControl from './ThemeControl.svelte';

  type Language = 'zh' | 'en';

  let { lang, content: ResumeContent }: { lang: Language; content: Component } = $props();
  let printing = $state(false);
  let printMessage = $state('');

  const copy = $derived(
    lang === 'zh'
      ? {
          title: 'Asai Neko — 简历',
          description: 'Asai Neko 的中文简历：系统、基础设施、云原生、后端工程与 AI 应用。',
          documentLabel: '履历',
          languageLabel: '中文版',
          print: '打印简历（Typst）',
          printBusy: '正在生成 Typst 打印页面',
          printFailed: '无法生成 Typst 打印页面，请刷新后重试。',
          printReady: '已打开浏览器打印对话框。',
          skip: '跳转到简历正文',
          brand: 'Asai Neko 中文简历'
        }
      : {
          title: 'Asai Neko — Résumé',
          description: 'Asai Neko’s résumé across systems, infrastructure, cloud native engineering, backend engineering, and applied AI.',
          documentLabel: 'Résumé',
          languageLabel: 'English edition',
          print: 'Print résumé (Typst)',
          printBusy: 'Rendering Typst print pages',
          printFailed: 'Could not render the Typst print pages. Refresh and try again.',
          printReady: 'The browser print dialog is open.',
          skip: 'Skip to résumé content',
          brand: 'Asai Neko English résumé'
        }
  );

  function downloadPdf(pdf: Blob) {
    const url = URL.createObjectURL(pdf);
    const link = document.createElement('a');

    link.href = url;
    link.download = `Asai-Neko-CV-${lang}.pdf`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  function preparePrintFrame(pages: string[]) {
    const frame = document.createElement('iframe');
    const markup = pages
      .map(page => `<section class="page">${page}</section>`)
      .join('');

    frame.className = 'typst-print-frame';
    frame.setAttribute('aria-hidden', 'true');
    frame.srcdoc = `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
  <head>
    <meta charset="utf-8" />
    <title>${copy.title}</title>
    <style>
      @page { size: A4; margin: 0; }
      html, body { margin: 0; padding: 0; background: #fff; }
      .page {
        width: 210mm;
        height: 297mm;
        overflow: hidden;
        break-after: page;
        page-break-after: always;
      }
      .page:last-child { break-after: auto; page-break-after: auto; }
      svg { display: block; width: 100%; height: 100%; }
    </style>
  </head>
  <body>${markup}</body>
</html>`;

    return frame;
  }

  async function printResume() {
    if (printing) return;

    printing = true;
    printMessage = copy.printBusy;
    await tick();

    try {
      const { createTypstPdf, createTypstSvgPages } = await import('../typst/browser');
      const pages = await createTypstSvgPages(lang);
      const frame = preparePrintFrame(pages);
      const loaded = new Promise<void>((resolve, reject) => {
        frame.addEventListener('load', () => resolve(), { once: true });
        frame.addEventListener('error', () => reject(new Error('Could not prepare print frame')), {
          once: true
        });
      });

      document.body.append(frame);
      await loaded;

      const printWindow = frame.contentWindow;

      if (!printWindow) {
        frame.remove();
        throw new Error('Missing print frame window');
      }

      printing = false;
      printMessage = copy.printReady;
      await tick();

      try {
        printWindow.focus();
        printWindow.print();
        printMessage = copy.printReady;
      } catch (printError) {
        frame.remove();
        console.error('Typst print dialog failed; downloading PDF', printError);
        downloadPdf(await createTypstPdf(lang));
      }

      window.setTimeout(() => frame.remove(), 300_000);
    } catch (error) {
      printMessage = copy.printFailed;
      console.error('Typst print failed', error);
      window.alert(copy.printFailed);
      printing = false;
    }
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
      <button
        type="button"
        class="print-button icon-button"
        aria-label={printing ? copy.printBusy : copy.print}
        title={printing ? copy.printBusy : copy.print}
        aria-busy={printing}
        disabled={printing}
        onclick={printResume}
      >
        {#if printing}
          <LoaderCircle class="animate-spin" size={16} strokeWidth={1.8} aria-hidden="true" />
        {:else}
          <Printer size={16} strokeWidth={1.8} aria-hidden="true" />
        {/if}
      </button>
      <span class="sr-only" role="status" aria-live="polite">{printMessage}</span>
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

{#if printing}
  <div class="print-progress" role="status" aria-live="assertive">
    <div class="print-progress-card">
      <LoaderCircle class="animate-spin" size={24} strokeWidth={1.8} aria-hidden="true" />
      <p>{copy.printBusy}</p>
      <div class="print-progress-track" aria-hidden="true">
        <span class="print-progress-fill"></span>
      </div>
    </div>
  </div>
{/if}
