import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  renderTypst,
  typstDocuments,
} from '../src/lib/typst/render.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(projectRoot, 'dist/typst');

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

for (const document of typstDocuments) {
  const typstPath = resolve(outputDirectory, `${document.name}.typ`);
  const pdfPath = resolve(outputDirectory, `${document.name}.pdf`);
  const markdown = await readFile(
    resolve(projectRoot, document.source),
    'utf8',
  );

  await writeFile(typstPath, renderTypst(markdown, document), 'utf8');
  compile(typstPath, pdfPath);

  console.log(`generated ${typstPath.slice(projectRoot.length + 1)}`);
  console.log(`rendered ${pdfPath.slice(projectRoot.length + 1)}`);
}
