import { spawnSync } from 'node:child_process';
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, delimiter, join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(projectRoot, 'src/assets/typst-fonts');
const fontRoots = (process.env.TYPST_FONT_PATHS ?? '')
  .split(delimiter)
  .filter(Boolean);

if (fontRoots.length === 0) {
  throw new Error('TYPST_FONT_PATHS is not set; run this command inside devenv');
}

async function locateFont(fileName) {
  for (const root of fontRoots) {
    const entries = await readdir(root, { recursive: true });

    for (const entry of entries) {
      if (basename(entry) === fileName) {
        return join(root, entry);
      }
    }
  }

  throw new Error(`Could not find ${fileName} under TYPST_FONT_PATHS`);
}

function runSubset(source, output, args) {
  const result = spawnSync(
    'pyftsubset',
    [
      source,
      `--text-file=${characterFile}`,
      `--output-file=${output}`,
      '--layout-features=*',
      '--name-IDs=*',
      '--name-languages=*',
      '--glyph-names',
      '--symbol-cmap',
      '--legacy-cmap',
      '--notdef-glyph',
      '--notdef-outline',
      '--recommended-glyphs',
      ...args,
    ],
    {
      cwd: projectRoot,
      env: { ...process.env, SOURCE_DATE_EPOCH: '315532800' },
      stdio: 'inherit',
    },
  );

  if (result.error) {
    throw new Error(
      'pyftsubset is unavailable; run this command inside the devenv shell',
      { cause: result.error },
    );
  }

  if (result.status !== 0) {
    throw new Error(`pyftsubset failed with status ${result.status}`);
  }
}

const [latinFont, cjkFont] = await Promise.all([
  locateFont('NotoSans.ttf'),
  locateFont('NotoSansCJK-VF.otf.ttc'),
]);
const sourceText = (
  await Promise.all(
    [
      'src/contents/CV_en.md',
      'src/contents/CV_zh.md',
      'src/typst/resume.typ',
    ].map(file => readFile(resolve(projectRoot, file), 'utf8')),
  )
).join('');
const generatedCharacters = '•‘’“”…';
const characters = [...new Set(`${sourceText}${generatedCharacters}`)]
  .sort()
  .join('');
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'cv-typst-fonts-'));
const characterFile = join(temporaryDirectory, 'characters.txt');

try {
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(characterFile, characters, 'utf8');

  const latinOutput = join(outputDirectory, 'NotoSans-CV.ttf');
  const cjkOutput = join(outputDirectory, 'NotoSansCJKsc-CV.otf');

  runSubset(latinFont, latinOutput, []);
  runSubset(cjkFont, cjkOutput, ['--font-number=2']);

  await copyFile(
    resolve(
      projectRoot,
      'node_modules/@fontsource-variable/noto-sans/LICENSE',
    ),
    join(outputDirectory, 'NotoSans-LICENSE.txt'),
  );
  await copyFile(
    resolve(
      projectRoot,
      'node_modules/@fontsource-variable/noto-sans-sc/LICENSE',
    ),
    join(outputDirectory, 'NotoSansSC-LICENSE.txt'),
  );

  for (const file of [latinOutput, cjkOutput]) {
    const size = (await stat(file)).size;
    console.log(`generated ${file.slice(projectRoot.length + 1)} (${size} bytes)`);
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
