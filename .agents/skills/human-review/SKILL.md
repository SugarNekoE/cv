---
name: human-review
description: Build, track, resume, and close transcript-led human reviews for this CV repository. Use for every repository mutation and whenever a user requests a checklist, content or implementation review, question-answer-action flow, approval tracking, 10–50-check review batch, or durable record in .ai/transcript.md and .ai/checklist.md.
---

# CV Repository Human Review

Create a durable audit trail and let the human approve or revise one coherent
content or tooling batch at a time. Treat the transcript as chronological
history and the checklist as current review state.

## Required files

Use:

- `.ai/transcript.md` for prompts, decisions, actions, failures, corrections,
  validations, and review checkpoints in chronological order.
- `.ai/checklist.md` for the complete review inventory, stable IDs, current
  question, answers, actions, verification, and approval state.

Read [references/ledger-format.md](references/ledger-format.md) completely before
creating or restructuring either file. Never store secrets, credentials, private
keys, raw tokens, or generated dependency contents in a ledger.

During parallel work, the lead agent is the sole ledger writer. Workers read the
ledgers and report material events and evidence to the lead.

## Workflow

### 1. Reconstruct context

Before opening or resuming a review:

1. Read the repository instructions and required skills for changed paths.
2. Read `.ai/transcript.md` and `.ai/checklist.md` completely.
3. Inspect the working tree and changed/untracked files without changing them.
4. Reconcile the request, transcript, checklist, CV sources, derived artifacts,
   tooling, and any parallel worker reports.

Do not ask the first review question until this preflight is complete.

### 2. Record messages before acting

Append every material user request, correction, approval, rejection, deferral,
scope change, implementation request, Git request, or stop request before acting.
Preserve prompts and answers verbatim when practical; redact secrets.

After acting, append material changes, failures, corrective reruns, and validation
evidence. Do not rewrite history to make it look cleaner.

### 3. Build the exhaustive checklist

Derive the checklist from source evidence. Inventory:

- authoritative CV sources, language variants, and the relationship between
  source and generated artifacts;
- changed names, dates, roles, affiliations, metrics, skills, experience, and
  other biographical or professional claims;
- headings, section order, chronology, wording, language, tone, repetition, and
  audience fit;
- links, contact surfaces, privacy-sensitive content, and publication exposure;
- rendered layout, typography, wrapping, pagination, accessibility, print
  readability, and format-specific behavior when derived artifacts exist;
- Nix/devenv configuration, local agent instructions and skills, dependencies,
  scripts, tests, fixtures, and automation;
- documentation, delivery artifacts, intentional removals, unsupported behavior,
  and deferrals.

Give every independently reviewable item a stable ID. Never renumber an existing
ID; append one when scope grows. Store the triggering prompt verbatim and state
the inventory basis and coverage limits.

### 4. Run review rounds

Review one CV section, derived format, tooling area, or tightly coupled change
set per conversation with 10–50 independently tracked checks. Split larger
areas; combine smaller ones only when their decisions and evidence are directly
coupled.

Prioritize decisions that can invalidate downstream work:

1. source-of-truth ownership, factual authority, and privacy exposure;
2. substantive claims, dates, attribution, and chronology;
3. section organization, audience, and narrative emphasis;
4. wording, language consistency, repetition, and links;
5. rendered layout, accessibility, print behavior, and derived formats;
6. reproducible tooling, tests, documentation, and cleanup.

Each round states its scope, item count and IDs, a compact findings table, the
implemented result, why it matters, recommendation, tradeoffs, and one explicit
decision request. A plain batch approval covers only listed checks whose work is
complete; partial answers retain per-check state.

### 5. Persist answer, action, and result

Before acting on an answer, append it to the transcript and active round, then
set the affected state:

- `pending`
- `awaiting-answer`
- `approved`
- `changes-requested`
- `awaiting-re-review`
- `deferred`
- `not-applicable`

For requested changes, preserve approved checks, record the exact agreed action,
implement only that scope, verify it, record evidence, and set affected checks to
`awaiting-re-review`. Never treat implementation as approval.

### 6. Resume and close safely

On continuation, record the message, repeat preflight, find the sole active round,
and continue without replaying approved questions. Keep at most one active
`awaiting-answer`, `changes-requested`, or `awaiting-re-review` round.

Close only when every item is approved, deferred, or not applicable; requested
actions are implemented and re-reviewed; validation passed or its failure was
accepted; and the ledgers agree. A completed checklist never grants permission to
stage, commit, push, merge, or rewrite history.

## Integrity rules

- Prefer source paths, diffs, human-confirmed facts, rendered artifacts, and
  command output over prior summaries or external assumptions.
- Preserve stable IDs, historical failures, and previous answers.
- Never approve an item, child, or parent on the assistant's authority.
- Record assistant work as actions, not human decisions.
- Keep the user-facing review self-contained even though ledgers persist state.
