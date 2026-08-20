# Agent Rules

## Project Purpose and Source of Truth

This repository maintains Asai Neko's bilingual CV sources and the static résumé
website that publishes them.

- Treat `src/contents/CV_en.md` as the authoritative English CV and
  `src/contents/CV_zh.md` as the authoritative Chinese CV. Keep shared facts
  aligned while allowing language-appropriate phrasing and emphasis.
- Treat names, dates, roles, affiliations, metrics, skills, and project claims
  as human-owned biographical facts. Never invent, extrapolate, or strengthen a
  claim beyond the supplied evidence.
- Editorial changes may improve clarity, grammar, ordering, and consistency
  without changing meaning. Ask for confirmation before making a substantive
  factual change or resolving contradictory source material.
- Preserve the document's requested language, audience, and file name. Do not
  translate, rename, or create another CV variant unless the task requires it.
- Search every maintained CV variant and generated artifact when changing a
  fact that may be repeated. Keep intentional differences explicit.
- Do not add private contact details, identity data, credentials, or other
  sensitive information unless the human explicitly supplies and requests it.

## CV Writing and Presentation

- Use the self-hosted Noto Sans variable font for Latin text and Noto Sans SC
  (the web distribution of Noto Sans CJK SC) for Simplified Chinese. Keep the
  same sans-serif family stack across headings, body text, controls, and print.
- Keep source documents readable as plain Markdown with one clear title,
  consistent heading levels, compact lists, and stable section organization.
- Prefer precise, direct language and concrete outcomes. Preserve the author's
  voice, use consistent tense, and keep dates and chronology internally
  consistent.
- Keep links descriptive and verify every changed target when the environment
  permits. Report links that cannot be verified instead of silently replacing
  them.
- Treat rendered PDF, DOCX, HTML, or other exports as derived artifacts unless
  the human explicitly designates one as a source. Update the source first and
  regenerate affected outputs.
- Inspect rendered output when a change can affect pagination, typography,
  wrapping, link visibility, or print readability.

## Repository Structure

- Keep one root bare Svelte application built with Vite. Use two native Vite HTML
  entries, render both language pages with Svelte at build time, and hydrate the
  existing controls in the browser; do not turn the site into a client-only SPA
  or deploy a server runtime.
- Keep `CV_en.md` and `CV_zh.md` under `src/contents` as the authoritative
  content sources. Import them through mdsvex rather than copying résumé prose
  into route or component files.
- Keep language entries focused on selecting and rendering the matching Markdown
  source. Put browser-safe reusable controls and presentation under `src/lib`;
  keep build-only rendering isolated from deployed output, and do not add a
  client router, runtime endpoints, persistence, or external services without a
  new concrete requirement.
- Keep repository-local agent skills under `.agents/skills`, durable review
  records under `.ai`, and Nix/devenv configuration in the existing root files.
- Do not create empty directories, placeholder layers, or speculative build
  machinery. Add a boundary only when real content or automation needs it.
- Preserve unrelated human-authored changes and do not reformat the whole CV for
  a narrowly scoped edit.

## Skills and Human Review

Use `$skill-creator` whenever creating or changing a repository-local skill.

Every repository mutation must use `$human-review`.

- Read `.agents/skills/human-review/SKILL.md` and every reference it selects
  before changing repository files.
- Record material requests, corrections, decisions, actions, failures, and
  validation results in `.ai/transcript.md`.
- Maintain `.ai/checklist.md` with stable review IDs for every changed content
  claim, section, structure, link, configuration, skill, test, document, and
  delivery artifact.
- Present related checks in coherent batches of 10–50 items and never mark a
  check approved on an agent's authority.
- Stop for human review before staging agent-authored changes, committing,
  pushing, merging, or rewriting history.

## Reproducible Tooling

- Use the checked-in Nix/devenv environment for repository tooling. Keep
  `devenv.nix`, `devenv.yaml`, and `devenv.lock` consistent when changing that
  environment, and regenerate lock data through devenv rather than hand-editing
  it.
- Use pnpm through Corepack for the root Svelte package. Keep the
  `packageManager` field and `pnpm-lock.yaml` synchronized with `package.json`.
- Keep the production site fully static and compatible with Cloudflare Pages:
  the build command is `pnpm build` and the publish directory is `build`. Both
  `/` and `/en/` must contain the complete résumé before client JavaScript runs.
- Do not add dependencies for transformations that existing tools can perform
  reliably. If a dependency is necessary, document why and validate its locked,
  reproducible setup.

## Parallel Work

- Use parallel writers only when the human explicitly requests delegation and
  scopes can have exclusive file ownership.
- The lead agent is the sole writer for `.ai/transcript.md` and
  `.ai/checklist.md`. Workers report material events and evidence to the lead.
- Workers do not stage, commit, merge, cherry-pick, or open review rounds.

## Git Authorization

All changes must be reviewed by a human before delivery.

- Never run `git add`, `git commit`, `git push`, `git merge`, `git cherry-pick`,
  or a history-rewriting command on your own initiative. Preserve files already
  staged by the human, but do not stage agent-authored changes without approval.
- After editing, present the changed behavior, validation, risks, and unresolved
  checklist items. Completed implementation is not permission to commit.
- Never perform destructive or irreversible operations outside the requested
  scope without explicit human confirmation.

After explicit approval, commits must be signed off and follow
`type(scope): subject`.

- Use `git commit -s` so the `Signed-off-by:` trailer is present.
- Use a lowercase imperative subject with no trailing period and a meaningful
  scope such as `cv`, `docs`, `agents`, or `tooling`.
- Never add a `Co-authored-by:` trailer.
