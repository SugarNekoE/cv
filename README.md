# Asai Neko CV

A bilingual, fully static résumé website built with bare Svelte, Vite, mdsvex,
Tailwind CSS, self-hosted Noto Sans fonts, and Lucide icons.

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
