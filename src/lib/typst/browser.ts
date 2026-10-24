import {
  createTypstCompiler,
  supportsJspiBackend,
  supportsWorkerBackend,
  type TypstCompiler
} from 'typst-wasm';
import { createWebWorker } from 'typst-wasm/worker/browser';
import workerUrl from 'typst-wasm/worker/web-worker?worker&url';
import coreUrl from 'typst-wasm/engine/engine.core.wasm?url';
import core2Url from 'typst-wasm/engine/engine.core2.wasm?url';
import core3Url from 'typst-wasm/engine/engine.core3.wasm?url';
import cvEnMarkdown from '../../contents/CV_en.md?raw';
import cvZhMarkdown from '../../contents/CV_zh.md?raw';
import template from '../../typst/resume.typ?raw';
import latinFontUrl from '../../assets/typst-fonts/NotoSans-CV.ttf?url';
import cjkFontUrl from '../../assets/typst-fonts/NotoSansCJKsc-CV.otf?url';
import { renderTypst, typstDocuments, type TypstLanguage } from './render.mjs';

const markdownByLanguage: Record<TypstLanguage, string> = {
  en: cvEnMarkdown,
  zh: cvZhMarkdown
};
const fontUrls = [latinFontUrl, cjkFontUrl];

let compilerPromise: Promise<TypstCompiler> | undefined;

async function compileModule(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load Typst module ${url}: ${response.status}`);
  }

  return WebAssembly.compileStreaming(response);
}

async function loadFont(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load Typst font ${url}: ${response.status}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}

async function initializeCompiler() {
  const compiler = await createTypstCompiler({
    backend: 'auto',
    worker: () => createWebWorker(workerUrl),
    coreModules: {
      'engine.core.wasm': compileModule(coreUrl),
      'engine.core2.wasm': compileModule(core2Url),
      'engine.core3.wasm': compileModule(core3Url)
    }
  });

  await compiler.addFonts(...fontUrls.map(loadFont));

  return compiler;
}

function getCompiler() {
  if (!supportsWorkerBackend() && !supportsJspiBackend()) {
    throw new Error('This browser does not support client-side Typst rendering');
  }

  compilerPromise ??= initializeCompiler().catch(error => {
    compilerPromise = undefined;
    throw error;
  });

  return compilerPromise;
}

async function loadDocument(lang: TypstLanguage) {
  const document = typstDocuments.find(candidate => candidate.language === lang);

  if (!document) {
    throw new Error(`Unknown Typst language: ${lang}`);
  }

  const compiler = await getCompiler();
  await compiler.clearFiles();
  await compiler.addSource('src/typst/resume.typ', template);
  await compiler.addSource(`${document.name}.typ`, renderTypst(markdownByLanguage[lang], document));

  return { compiler, document };
}

function assertCompiled(result: { diagnostics: { severity: string; formatted: string }[] }) {
  const errors = result.diagnostics.filter(diagnostic => diagnostic.severity === 'error');

  if (errors.length > 0) {
    throw new Error(errors.map(diagnostic => diagnostic.formatted).join('\n'));
  }
}

export async function createTypstSvgPages(lang: TypstLanguage) {
  const { compiler, document } = await loadDocument(lang);
  const result = await compiler.compile({
    main: `${document.name}.typ`,
    format: 'svg'
  });

  assertCompiled(result);
  return result.pages.map(page => page.output);
}

export async function createTypstPdf(lang: TypstLanguage) {
  const { compiler, document } = await loadDocument(lang);
  const result = await compiler.compile({
    main: `${document.name}.typ`,
    format: 'pdf'
  });

  assertCompiled(result);

  const bytes = new Uint8Array(result.output.byteLength);
  bytes.set(result.output);

  return new Blob([bytes.buffer], { type: 'application/pdf' });
}
