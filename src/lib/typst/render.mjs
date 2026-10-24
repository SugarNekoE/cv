export const typstDocuments = [
  {
    source: 'src/contents/CV_en.md',
    name: 'CV_en',
    language: 'en',
    personalInformationHeading: 'Personal Information',
    title: 'Asai Neko — Résumé',
    keywords: ['résumé', 'systems', 'infrastructure', 'cloud native', 'AI'],
  },
  {
    source: 'src/contents/CV_zh.md',
    name: 'CV_zh',
    language: 'zh',
    personalInformationHeading: '个人信息',
    title: 'Asai Neko — 简历',
    keywords: ['简历', '系统', '基础设施', '云原生', 'AI'],
  },
];

function escapeText(text) {
  return text.replace(/[\\#$\[\]_`*~@]/g, '\\$&');
}

function escapeString(text) {
  return text.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

function quoteString(text) {
  return `"${escapeString(text)}"`;
}

function quoteTuple(items) {
  return `(${items.map(quoteString).join(', ')},)`;
}

function renderInline(text, sourceLine) {
  if (/(?:`|\*\*|__|!\[)/.test(text)) {
    throw new Error(`Unsupported inline Markdown: ${sourceLine}`);
  }

  const tokens = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|~~([^~]+)~~/g;
  let rendered = '';
  let cursor = 0;

  for (const match of text.matchAll(tokens)) {
    rendered += escapeText(text.slice(cursor, match.index));

    if (match[2]) {
      rendered += `#link("${escapeString(match[2])}")[${escapeText(match[1])}]`;
    } else {
      rendered += `#strike[${escapeText(match[3])}]`;
    }

    cursor = match.index + match[0].length;
  }

  return rendered + escapeText(text.slice(cursor));
}

export function renderTypst(markdown, document) {
  const lines = markdown.split(/\r?\n/);
  const output = [
    `// Generated from ${document.source}.`,
    '// Do not edit; rendered from the authoritative Markdown source.',
    '#import "/src/typst/resume.typ": contact-grid, entry-date, resume',
    '',
    '#show: resume.with(',
    `  lang: ${quoteString(document.language)},`,
    `  title: ${quoteString(document.title)},`,
    `  keywords: ${quoteTuple(document.keywords)},`,
    ')',
    '',
  ];
  let inPersonalInformation = false;

  for (let index = 0; index < lines.length;) {
    const line = lines[index];

    if (line.trim() === '') {
      index += 1;
      continue;
    }

    if (line === '---') {
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})[ \t]+(.+?)\s*$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2];

      output.push(`${'='.repeat(level)} ${renderInline(title, line)}`, '');
      inPersonalInformation =
        level === 2 && title === document.personalInformationHeading;
      index += 1;
      continue;
    }

    if (/^(?:#{5,6}[ \t]|>[ \t]|\d+[.)][ \t]|[*+][ \t]|\s+\S|```)/.test(line)) {
      throw new Error(`Unsupported block Markdown: ${line}`);
    }

    if (line.startsWith('- ')) {
      const items = [];

      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2));
        index += 1;
      }

      if (inPersonalInformation) {
        const facts = items.map(item => {
          const fact = /^([^:：]+[:：])\s*(.+)$/.exec(item);

          if (!fact) {
            throw new Error(`Personal information item has no label: ${item}`);
          }

          return `  ([${escapeText(fact[1])}], [${renderInline(fact[2], item)}]),`;
        });

        output.push('#contact-grid((', ...facts, '))', '');
      } else {
        output.push(...items.map(item => `- ${renderInline(item, item)}`), '');
      }

      continue;
    }

    if (
      /^(?:(?:[A-Z][a-z]{2} )?\d{4}(?: 年 \d{1,2} 月)? – (?:Present|至今|[A-Z][a-z]{2} \d{4}|\d{4} 年 \d{1,2} 月).*|\d{4})$/.test(
        line,
      )
    ) {
      output.push(`#entry-date[${renderInline(line, line)}]`, '');
      index += 1;
      continue;
    }

    output.push(renderInline(line, line), '');
    index += 1;
  }

  return `${output.join('\n')}\n`;
}
