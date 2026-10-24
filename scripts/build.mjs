import { access, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const projectRoot = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(projectRoot, 'build');
const prerenderDirectory = resolve(projectRoot, '.prerender');

if (dirname(prerenderDirectory) !== projectRoot || basename(prerenderDirectory) !== '.prerender') {
  throw new Error(`Refusing to manage unexpected prerender directory: ${prerenderDirectory}`);
}

const pages = [
  {
    lang: 'zh',
    htmlLang: 'zh-CN',
    output: resolve(outputDirectory, 'index.html'),
    requiredSection: 'id="个人信息"'
  },
  {
    lang: 'en',
    htmlLang: 'en',
    output: resolve(outputDirectory, 'en/index.html'),
    requiredSection: 'id="personal-information"'
  }
];

function replaceExactlyOnce(source, pattern, replacement, label, output) {
  const matches = [...source.matchAll(pattern)];

  if (matches.length !== 1) {
    throw new Error(`Expected one ${label} in ${output}, found ${matches.length}`);
  }

  return source.replace(pattern, () => replacement);
}

await rm(prerenderDirectory, { recursive: true, force: true });

try {
  await build({ root: projectRoot });

  for (const asset of ['_headers', 'avatar.png', 'favicon.svg', 'noto-emoji-LICENSE.txt']) {
    await access(resolve(outputDirectory, asset));
  }

  await build({
    root: projectRoot,
    build: {
      copyPublicDir: false,
      emptyOutDir: true,
      minify: false,
      outDir: prerenderDirectory,
      ssr: resolve(projectRoot, 'src/entry-server.ts'),
      rolldownOptions: {
        output: {
          entryFileNames: 'entry-server.js'
        }
      }
    }
  });

  const serverEntry = resolve(prerenderDirectory, 'entry-server.js');
  const { renderPage } = await import(`${pathToFileURL(serverEntry).href}?v=${Date.now()}`);
  const completedPages = [];

  for (const page of pages) {
    const rendered = renderPage(page.lang);
    let html = await readFile(page.output, 'utf8');

    html = replaceExactlyOnce(
      html,
      /<meta[^>]+name="resume-prerender-head"[^>]*>/g,
      rendered.head,
      'head marker',
      page.output
    );
    html = replaceExactlyOnce(
      html,
      /<template id="resume-prerender-body"><\/template>/g,
      rendered.body,
      'body marker',
      page.output
    );
    html = replaceExactlyOnce(
      html,
      /data-prerendered="false"/g,
      'data-prerendered="true"',
      'prerender state marker',
      page.output
    );

    const required = [
      `<html lang="${page.htmlLang}"`,
      '<article class="resume-content">',
      page.requiredSection,
      '<title>Asai Neko',
      'href="/favicon.svg"',
      'data-prerendered="true"'
    ];

    for (const fragment of required) {
      if (!html.includes(fragment)) {
        throw new Error(`Missing ${fragment} in ${page.output}`);
      }
    }

    if (/resume-prerender|(?:__|%|data-)sveltekit|_app\/version/i.test(html)) {
      throw new Error(`Prerender or SvelteKit runtime marker leaked into ${page.output}`);
    }

    completedPages.push({ ...page, html });
  }

  for (const page of completedPages) {
    await writeFile(page.output, page.html);
    console.log(`prerendered ${page.lang === 'zh' ? '/' : '/en/'} -> ${page.output}`);
  }
} finally {
  await rm(prerenderDirectory, { recursive: true, force: true });
}
