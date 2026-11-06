// Build-only overlay for the local full-identity Typst export. Overlay files are
// gitignored and must never be imported by the site or the browser bundle.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export function fullOverlayPath(projectRoot, document) {
  return resolve(projectRoot, `src/contents/${document.name}.full.local.json`);
}

function requireText(value, label, path) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${path}: ${label} must be a non-empty string`);
  }

  return value.trim();
}

export async function readFullOverlay(path) {
  const overlay = JSON.parse(await readFile(path, 'utf8'));
  const name = requireText(overlay.name, '"name"', path);

  if (!overlay.work || typeof overlay.work !== 'object' || Array.isArray(overlay.work)) {
    throw new Error(`${path}: "work" must map job titles to company names`);
  }

  const work = Object.fromEntries(
    Object.entries(overlay.work).map(([job, company]) => [
      job,
      requireText(company, `"work" entry "${job}"`, path),
    ]),
  );

  return { name, work };
}

export function fullOverlayValues(overlay) {
  return [overlay.name, ...Object.values(overlay.work)];
}

function findExactlyOne(lines, predicate, label) {
  const matches = lines.flatMap((line, index) => (predicate(line) ? [index] : []));

  if (matches.length !== 1) {
    throw new Error(`Expected one ${label}, found ${matches.length}`);
  }

  return matches[0];
}

export function applyFullOverlay(markdown, overlay, document) {
  const lines = markdown.split(/\r?\n/);
  const namePrefix = `- ${document.nameLabel}`;

  lines[findExactlyOne(lines, line => line.startsWith('# '), 'level-1 title')] =
    `# ${overlay.name}`;
  lines[findExactlyOne(lines, line => line.startsWith(namePrefix), `"${namePrefix}" item`)] =
    `${namePrefix}${overlay.name}`;

  const workStart = findExactlyOne(
    lines,
    line => line === `## ${document.workExperienceHeading}`,
    `"## ${document.workExperienceHeading}" heading`,
  );
  const nextSection = lines.findIndex(
    (line, index) => index > workStart && line.startsWith('## '),
  );
  const workEnd = nextSection === -1 ? lines.length : nextSection;
  const jobs = lines
    .slice(workStart, workEnd)
    .flatMap(line => (line.startsWith('### ') ? [line.slice(4)] : []));
  const missing = jobs.filter(job => !Object.hasOwn(overlay.work, job));
  const unknown = Object.keys(overlay.work).filter(job => !jobs.includes(job));

  if (missing.length > 0 || unknown.length > 0) {
    throw new Error(
      `${document.name} work overlay must list exactly the job titles in ` +
        `"${document.workExperienceHeading}"; missing: ${JSON.stringify(missing)}, ` +
        `unknown: ${JSON.stringify(unknown)}`,
    );
  }

  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    output.push(line);

    if (index > workStart && index < workEnd && line.startsWith('### ')) {
      output.push(`#### ${overlay.work[line.slice(4)]}`);

      if (lines[index + 1]?.startsWith('#### ')) {
        index += 1;
      }
    }
  }

  return output.join('\n');
}

export function fullDocument(document, overlay) {
  return {
    ...document,
    name: `${document.name}_full`,
    author: overlay.name,
    title: document.title.replace(document.author, overlay.name),
  };
}
