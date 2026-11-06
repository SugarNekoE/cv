import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  renderTypst,
  typstDocuments,
} from '../src/lib/typst/render.mjs';
import {
  applyFullOverlay,
  fullDocument,
  fullOverlayPath,
  readFullOverlay,
} from './full-overlay.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(projectRoot, 'dist/typst');
const full = process.argv.slice(2).includes('--full');

function compile(typstPath, pdfPath) {
  const result = spawnSync(
    'typst',
    [
      'compile',
      '--root',
      projectRoot,
      '--ignore-system-fonts',
      typstPath,
      pdfPath,
    ],
    { cwd: projectRoot, stdio: 'inherit' },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `Typst failed with status ${result.status ?? result.signal}`,
    );
  }
}

await mkdir(outputDirectory, { recursive: true });

for (const sourceDocument of typstDocuments) {
  let document = sourceDocument;
  let markdown = await readFile(
    resolve(projectRoot, sourceDocument.source),
    'utf8',
  );

  if (full) {
    const overlay = await readFullOverlay(
      fullOverlayPath(projectRoot, sourceDocument),
    );
    markdown = applyFullOverlay(markdown, overlay, sourceDocument);
    document = fullDocument(sourceDocument, overlay);
  }

  const typstPath = resolve(outputDirectory, `${document.name}.typ`);
  const pdfPath = resolve(outputDirectory, `${document.name}.pdf`);

  await writeFile(typstPath, renderTypst(markdown, document), 'utf8');
  compile(typstPath, pdfPath);

  console.log(`generated ${typstPath.slice(projectRoot.length + 1)}`);
  console.log(`rendered ${pdfPath.slice(projectRoot.length + 1)}`);
}
