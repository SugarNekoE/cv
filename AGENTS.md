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
  records under `.ai/reviews`, and Nix/devenv configuration in the existing root
  files.
- Do not create empty directories, placeholder layers, or speculative build
  machinery. Add a boundary only when real content or automation needs it.
- Preserve unrelated human-authored changes and do not reformat the whole CV for
  a narrowly scoped edit.

## Mandatory Recorded Human Review

Every agent performing a repository mutation must use the `$human-review` skill
and follow its sharded transcript, section, reconciliation, and
one-section-at-a-time review workflow.

- Read `.agents/skills/human-review/SKILL.md` and every reference it selects
  before changing repository files.
- Record every material user request, correction, decision, action, failure, and
  validation result in `.ai/reviews/<review-slug>/transcript/` as one immutable
  file per event. Derive `<review-slug>` from the branch name (lowercase, `/` to
  `-`), or use a name the human chooses when working on `main`.
- Build and maintain `.ai/reviews/<review-slug>/sections/*.md` with stable IDs
  for important decisions and grouped evidence for routine implementation.
  Preserve existing IDs; never renumber or duplicate them.
- Present only important or substantial changes for human decisions, grouped by
  owning section. Give each displayed item its functional context, exact scope,
  and a brief impact statement covering factual accuracy, chronology,
  attribution, language, privacy, publication exposure, rendering and print
  output, or tooling. There is no minimum check count, and sections are never
  padded with routine work.
- Decide routine wording, mechanical metadata, formatting, confirmed link
  targets, and dependency synchronization as the agent. Record these as
  `agent-reviewed`, not `approved`, and summarize them without listing each
  item. If classification is uncertain, treat the item as important.
- Before opening or resuming a review, read the complete review directory
  (`review.md`, every section file, and every transcript entry), inspect the
  working tree, and reconcile all of them.
- Persist each human answer and agreed action before acting on it. An approval
  applies only to the important impacts explicitly shown. Never mark an
  important item approved on an agent's authority.
- `.ai/transcript.md` and `.ai/checklist.md` are read-only history from the
  pre-sharded layout. Do not append to them or recreate them for new work.
- Review records stay local: `.gitignore` excludes `.ai/`. Do not change that
  rule or commit ledger files unless the human explicitly asks.
- Write every record in English, including ledger files, commit messages, and
  review briefs, regardless of the language the human uses to converse.

## Human Review and Git Authorization Required

Important or substantial changes must be reviewed by a human before being
committed. Routine work may be agent-reviewed under the mandatory workflow and
does not need per-item human approval. It may be committed only after the
owning section's important impacts are resolved and the human explicitly
authorizes the commit.

- Never run `git add`, `git commit`, `git push`, `git merge`, `git
  cherry-pick`, or a history-rewriting command (`rebase`, `reset`,
  `commit --amend`) on your own initiative. Do so only when the human explicitly
  asks. Preserve files the human already staged.
- After making edits, stop and present the material impacts so the human can
  review them. Do not burden the review with routine implementation detail, and
  do not chain edits directly into a commit.
- Never perform irreversible or destructive operations outside the requested
  scope, including deleting branches, force pushing, dropping data, or removing
  files, without explicit human confirmation first.

## Commit Conventions

Commits must be signed off and follow `type(scope): subject` with a mandatory
scope.

- Use `git commit -s` so the `Signed-off-by:` trailer is present.
- Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `build`, `ci`,
  `perf`, `style`, `revert`.
- Use a lowercase imperative subject with no trailing period, and a meaningful
  scope such as `cv`, `docs`, `agents`, or `tooling`. Combine scopes with commas
  for multi-area changes.
- Write the subject and body in English.

```bash
# GOOD
git commit -s -m "feat(cv): add kernel contributor entry"
git commit -s -m "docs(agents): align review workflow with sharded ledgers"

# BAD
git commit -m "update cv"        # no sign-off, no scope
git commit -s -m "Updated CV."   # wrong mood, trailing period, no scope
```

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
- The lead agent is the sole writer for the active
  `.ai/reviews/<review-slug>/` files. Workers report material events and
  evidence to the lead.
- Workers do not stage, commit, merge, cherry-pick, or open review rounds.
