# Asai Neko CV

A bilingual, fully static résumé website built with bare Svelte, Vite, mdsvex,
Tailwind CSS, self-hosted Noto Sans fonts, and Lucide icons.

## Licensing

The original framework and résumé text are copyright Asai Neko and use separate
licenses:

- **Framework — AGPL-3.0-only:** original website code, styles, build scripts,
  configuration, and supporting project documentation are licensed under the
  GNU Affero General Public License, version 3 only. See [LICENSE](LICENSE).
- **Content — CC-BY-SA-4.0:** `src/contents/CV_en.md`, `src/contents/CV_zh.md`,
  and the résumé text in generated HTML, PDF, or other exports are licensed under
  Creative Commons Attribution-ShareAlike 4.0 International. See the
  [content license](src/contents/LICENSE). Attribute the content to **Asai Neko**,
  retain the [source repository](https://forge.asnk.io/sugar/cv) and
  [license link](https://creativecommons.org/licenses/by-sa/4.0/), and indicate
  changes. Shared adaptations must use the same or a compatible license as
  specified in the full license text.

Generated pages contain both framework code and résumé text; each retains its
respective license. The package's `license` field describes the framework.

Dependencies and third-party assets retain their own licenses, including the
bundled Noto fonts, Lucide icons, and the Google Noto Emoji favicon with its
[Apache-2.0 notice](public/noto-emoji-LICENSE.txt). The supplied avatar is outside
these framework and résumé-text license grants.

## Content

- `src/contents/CV_zh.md` is the authoritative Chinese résumé and renders at `/`.
- `src/contents/CV_en.md` is the authoritative English résumé and renders at `/en/`.

The Chinese and English entries import these files directly through mdsvex. Edit
the Markdown sources under `src/contents` rather than duplicating résumé copy in
Svelte components.

English text uses Noto Sans. Simplified Chinese uses Noto Sans SC, the web-font
distribution name for the Simplified Chinese Noto Sans CJK variant. Both variable
fonts are bundled locally, including in printed output; the site does not depend
on a third-party font CDN.

The toolbar avatar is served from `public/avatar.png` as a regular static asset.

The favicon is Google Noto Emoji's U+1F431 cat face from the pinned
[`v2.051` artwork](https://github.com/googlefonts/noto-emoji/blob/v2.051/svg/emoji_u1f431.svg).
The unchanged SVG image and its Apache-2.0 notice are stored as
`public/favicon.svg` and `public/noto-emoji-LICENSE.txt`.

## Development

```sh
corepack pnpm install
corepack pnpm dev
```

Validate and build the static site with:

```sh
corepack pnpm check
corepack pnpm build
```

The production output is written to `build/`.

The build uses Vite's native multi-page output for `index.html` and
`en/index.html`, then uses Svelte's server renderer at build time to place the
complete résumé and page metadata into each file. Browser JavaScript hydrates
the existing theme and print controls; no server renderer is deployed.

### Typst PDF

The authoritative English Markdown source can also be rendered as an A4 PDF
through Typst:

```sh
corepack pnpm build:typst
```

Run this inside the repository's devenv shell so Typst and the pinned Noto Sans
variable font are available. The command writes the generated document to
`build/typst/CV_en.typ` and the PDF to `build/typst/CV_en.pdf`. The Typst input
is generated from `src/contents/CV_en.md` and must not be edited directly. A
site build cleans `build/`, so rerun this command after it when both outputs are
needed.

## Cloudflare Pages

Connect the repository to Cloudflare Pages and use:

- Framework preset: None
- Build command: `pnpm build`
- Build output directory: `build`
- Root directory: repository root

The generated site does not require Pages Functions, Workers bindings,
environment variables, a client router, or a server runtime.

Both language pages use the same cat-face favicon; the toolbar avatar remains a
separate image and is not used as browser icon metadata.
