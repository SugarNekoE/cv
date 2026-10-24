---
name: human-review
description: Build, track, resume, and close a durable, transcript-led human review of repository changes, presented as one brief per module section. Use when the user requests a structured implementation review, review checklist, question-answer-action workflow, approval tracking, module-batched walkthrough, or persistent review record. Do not activate merely because ordinary repository edits are being made.
---

# Human Review

Create a durable audit trail and let the human approve, revise, defer, or reject
one module section at a time. Present each section as a short brief, not a
line-by-line walkthrough. Treat the transcript as chronological history and the
section files as current review state.

## Ledger layout

Store each review in its own directory, sharded so parallel branches and pull
requests never edit the same file:

```text
.ai/reviews/<review-slug>/
  review.md                       # request, basis, protocol; written once
  sections/<SECTION-ID>.md        # one file per section: checks, decision log
  transcript/<UTC-stamp>-<event>.md  # one file per material event
  close.md                        # coverage audit; written at close
```

Derive `<review-slug>` from the branch name (lowercase, `/` → `-`), or from the
user's chosen name when not on a topic branch. Never share a slug between two
concurrent branches. Derive the active round from section states; do not keep a
mutable "current round" pointer.

Read [references/ledger-format.md](references/ledger-format.md) completely before
creating or restructuring any ledger file. Never store secrets, credentials,
private keys, raw tokens, or generated dependency contents in a ledger.

During parallel work, designate one lead as the sole ledger writer. Other
workers may read the ledgers and report material events and evidence to the lead.

If the repository already has legacy `.ai/transcript.md` and `.ai/checklist.md`,
keep using them until the user asks to migrate, and follow
[Resolve ledger conflicts](#resolve-ledger-conflicts) when they contain conflict
markers.

## Reconstruct context

Before opening or resuming a review:

1. Read the repository instructions and skills applicable to changed paths.
2. Read `review.md`, every `sections/*.md`, and the transcript entries for the
   active review completely when they exist.
3. Inspect the working tree plus changed, staged, deleted, and untracked files
   without changing them. When resuming after a merge or rebase, also confirm no
   ledger file contains conflict markers.
4. Reconcile the request, transcript, sections, implementation, and worker
   reports.

Do not present the first brief until this preflight is complete.

## Record material events

Write one new transcript file per material user request, correction, approval,
rejection, deferral, scope change, implementation request, Git request, or stop
request before acting on it. Preserve the user's wording when practical and
redact secrets.

After acting, add a new file for material changes, failures, corrective reruns,
and validation evidence. Never edit or delete an existing transcript file to make
history look cleaner.

## Build sections from evidence

Group the surfaces that actually exist in the reviewed change into sections:

- repository structure, ownership boundaries, dependencies, configuration, and
  vendored assets;
- changed production types, interfaces, functions, schemas, and exported
  behavior;
- routes, handlers, jobs, commands, APIs, webhooks, events, and serialized
  contracts;
- domain behavior, persistence, migrations, caches, queues, and external
  adapters;
- views, components, interaction states, validation, accessibility, and
  responsive behavior;
- security, authentication, authorization, privacy, and client/server trust
  boundaries;
- tests, fixtures, documentation, scripts, deployment artifacts, intentional
  removals, unsupported behavior, and deferrals.

One section is one owning module or tightly coupled vertical slice. Expect
roughly 3–8 sections per review; split only when a section cannot be judged in a
single brief, and merge only directly coupled areas.

A section has no stored state. Derive it from its checks: `approved` only when
every check is `approved`, `deferred`, or `not-applicable`; otherwise the
least-finished check state wins. A stored section state could be auto-merged into
`approved` by Git while a check is still in dispute.

Track independently reviewable functions, contracts, and behaviors as compact
**checks** inside the section file, each with a stable ID (`<SECTION-ID>.<n>`).
Checks keep coverage auditable; they are not read aloud. Never renumber an
existing ID; append a new one when scope grows. Store the triggering request and
state the inventory basis and known coverage limits in `review.md`.

## Present one brief per section

Order sections by what can invalidate downstream work:

1. architecture, ownership, and trust boundaries;
2. public or cross-module contracts;
3. domain and use-case behavior;
4. persistence and external integrations;
5. UI, accessibility, and responsive behavior;
6. tests, deployment, documentation, and cleanup.

Ask about one section per turn. Keep the brief under about 15 lines:

```markdown
### <SECTION-ID> — <module name> (<N> checks)

- Changed: 2–4 bullets of behavior, not a file listing.
- Needs attention: at most 3 bullets, each with `path:line` evidence. Write
  "nothing notable" when true.
- Recommendation: approve, or the specific change you propose, with the main
  tradeoff in one clause.
- Decision: approve / changes (name check IDs) / defer / expand.
```

Rules for the brief:

- Lead with risks and decisions, not descriptions the diff already shows.
- Do not list every check. Mention a check ID only when it needs attention.
- Expand into check-by-check detail only when the human answers `expand`, names
  a check ID, or requests a line-by-line review.
- Keep the brief self-contained even though the section file persists state.

Approving a section approves every check in it whose work is complete. A partial
answer (for example, "approve except `AUTH-01.4`") keeps per-check state.

## Persist answers, actions, and results

Before acting on an answer, add a transcript file and update the affected section
file, then set each affected section and check to one of:

- `pending`
- `awaiting-answer`
- `approved`
- `changes-requested`
- `awaiting-re-review`
- `deferred`
- `not-applicable`

For requested changes, preserve approved checks, record the agreed action,
implement only that scope, verify it, record evidence, and set affected checks
to `awaiting-re-review`. Implementation is not approval. Re-present the section
as a fresh brief that covers only what changed.

## Resume and close safely

On continuation, record the message, repeat preflight, find the sole active
section, and continue without replaying approved sections. Keep at most one
section in `awaiting-answer`, `changes-requested`, or `awaiting-re-review`.

Close only when every check is approved, deferred, or not applicable; requested
actions are implemented and re-reviewed; validation passed or its failure was
accepted; and the ledgers agree. Write `close.md` with the coverage audit. Review
completion never grants permission to stage, commit, push, merge, deploy, or
rewrite history.

## Keep ledgers conflict-free in pull requests

Conflicts come from two branches editing the same file. Prevent them by design:

- One directory per review slug; one file per section; one file per transcript
  event. Concurrent branches then touch disjoint paths.
- Files are written by one lead only, and existing transcript files are
  immutable.
- After a review closes, treat its directory as read-only. Start a new slug for
  follow-up work instead of reopening old files.
- Do not keep a shared index, counter, or "current round" file. Compute them by
  reading the directory.
- Give transcript filenames a UTC stamp plus a short event slug so two branches
  that log at the same time still get distinct names.

## Resolve ledger conflicts

When a merge or rebase leaves conflict markers under `.ai/`, fix the ledger
without losing history or inventing approvals. Edit files only; do not stage or
continue the merge unless the user asks.

1. List conflicted ledger paths and read both sides plus the merge base. Also
   re-read every section file Git merged without complaint: a clean merge can
   still combine two different decisions.
2. **Transcript entries** (immutable): keep both sides. Files unique to either
   side stay as they are. If the same filename differs, keep both by renaming
   the incoming one with a new stamp; never merge their bodies.
3. **Section files**: take the union of checks by ID. For the same ID, keep the
   state supported by the latest transcript decision from the human. If the
   transcript does not decide it, set the check to `awaiting-re-review` and ask.
   Never keep `approved` on the assistant's authority. Then re-derive the section
   state from its checks.
4. **Legacy single-file ledgers**: for `.ai/transcript.md`, keep both sides'
   entries in chronological order and drop only byte-identical duplicates. For
   `.ai/checklist.md`, apply rule 3 per ID, keep the union of IDs, and keep the
   newer `Last reconciled` date. Offer to migrate to the sharded layout once the
   conflict is resolved.
5. **Two review slugs collide**: rename the newer directory and update nothing
   else; IDs are scoped by their section file.
6. Confirm zero remaining `<<<<<<<`, `=======`, or `>>>>>>>` markers under
   `.ai/`, record the resolution as a new transcript file, and report which
   states were kept or reset.

If the user prefers not to ship ledgers in a PR, they may add the review
directory to `.git/info/exclude` or a local ignore rule instead. Do not change
tracked ignore files without being asked.

## Integrity rules

- Prefer source paths, declarations, diffs, and command output over prior
  claims.
- Preserve stable IDs, historical failures, and previous answers.
- Never approve a check, section, or review on the assistant's authority.
- Record assistant work as actions, not human decisions.
- Keep the user-facing brief self-contained even though ledgers persist state.
