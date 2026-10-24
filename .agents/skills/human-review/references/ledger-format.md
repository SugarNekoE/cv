# Review ledger format

## Contents

1. Directory layout
2. Transcript entry file
3. Review header
4. Section file
5. Section brief
6. Close file and coverage audit
7. Legacy single-file ledgers

## Directory layout

```text
.ai/reviews/<review-slug>/
  review.md
  sections/<SECTION-ID>.md
  transcript/<YYYYMMDDTHHMMSSZ>-<event-slug>.md
  close.md
```

- `<review-slug>`: lowercase branch name with `/` replaced by `-`.
- `<SECTION-ID>`: short module prefix and number, such as `AUTH-01`.
- Never create shared index, counter, or "current round" files; derive them from
  the directory contents so parallel branches touch disjoint paths.

## Transcript entry file

One file per material event. Existing files are immutable.

```markdown
# YYYY-MM-DD — Short event title

## User message

> Verbatim prompt or answer

## Actions

- Read or changed concrete paths.
- Record material implementation decisions, worker handoffs, and corrections.

## Verification

- `exact command`: passed, failed, or unavailable with a concise reason.
```

Omit an empty verification heading.

## Review header

`review.md` is written once at the start. Do not put mutable state in it.

```markdown
# Implementation Human Review

## Stored request

> Verbatim triggering prompt

## Protocol

- Owner: human reviewer
- Slug: `<review-slug>`
- Inventory basis: working tree at `<revision>` plus staged and untracked files
- Known coverage limits: ...
- Started: `YYYY-MM-DD`

## Sections

Planned order (informational; section files hold state):
`AUTH-01`, `AUTH-02`, `UI-01`
```

If scope grows, add a new section file rather than editing this list.

## Section file

One file per section. Only the lead writes it.

```markdown
# AUTH-01 — Session creation

- Asked: `YYYY-MM-DD`
- Evidence: `src/auth/route.ts`, `src/auth/session.ts`
- Brief: 2–4 lines of the last presented summary
- Recommendation: ...
- Tradeoffs: ...

## Checks

- [ ] `AUTH-01.1` — `createSession` input validation and errors
  - State: `awaiting-answer`
  - Evidence: `src/auth/session.ts`
- [x] `AUTH-01.2` — session cookie flags
  - State: `approved`
  - Evidence: `src/auth/route.ts`

## Decision log

| Date       | Answer (verbatim or short) | Agreed action | Result        |
| ---------- | -------------------------- | ------------- | ------------- |
| YYYY-MM-DD | approve except AUTH-01.1   | tighten check | see transcript |
```

State values: `pending`, `awaiting-answer`, `approved`, `changes-requested`,
`awaiting-re-review`, `deferred`, `not-applicable`. Use `[x]` only with
`approved`. Do not store a section state: derive it from the checks (`approved`
only when every in-scope check is `approved`, `deferred`, or `not-applicable`;
otherwise the least-finished check state). This keeps a Git auto-merge from
producing an approved section over a disputed check.

Use one check per independently reviewable function, structure, interface,
contract, or user-visible behavior. Checks stay in the file; do not print them
unless the human asks to expand.

## Section brief

Presented in the conversation, one section per turn, about 15 lines:

```markdown
### AUTH-01 — Session creation (12 checks)

- Changed: sessions now expire after 30 minutes and rotate on login.
- Needs attention:
  - Missing rate limit on `POST /session` (`src/auth/route.ts:41`).
  - Error text echoes the raw username (`src/auth/session.ts:88`).
- Recommendation: approve after adding the rate limit; the error text is safe to
  defer.
- Decision: approve / changes (name check IDs) / defer / expand.
```

## Close file and coverage audit

Written once when every check is terminal. Compare the section files with the
categories that are present in the change:

- changed, staged, deleted, and untracked files;
- production declarations, schemas, and exported behavior;
- routes, handlers, commands, APIs, events, jobs, and webhooks;
- domain, persistence, cache, queue, and external integration contracts;
- UI behavior, accessibility, and responsive states;
- tests, fixtures, manifests, assets, scripts, deployment, and documentation.

```markdown
# Close

| Section   | Result   | Checks | Date       |
| --------- | -------- | ------ | ---------- |
| `AUTH-01` | approved | 12     | YYYY-MM-DD |

## Coverage audit

- Working-tree files represented: `N/N`
- Production declarations represented: `N/N`
- Routes/handlers/contracts represented: `N/N`
- Persistence/integration contracts represented: `N/N`
- UI behaviors represented: `N/N`
- Tests/fixtures represented: `N/N`
- Known exclusions: ...
- Result: passed | incomplete
```

Counts support evidence; they never replace checking the actual mappings.

## Legacy single-file ledgers

Older reviews may use `.ai/transcript.md` (chronological `## YYYY-MM-DD — Title`
entries with `### User message`, `### Actions`, `### Verification`) and
`.ai/checklist.md` (stored request, protocol, item list with `State:` lines, an
active round, a review log table, and a coverage audit). Keep reading and
writing them unchanged until the user asks to migrate. To migrate, split each
transcript entry into a transcript file, map each checklist parent into a
section file with its items as checks, and copy the review log into `close.md`.
Do not delete the legacy files without explicit confirmation.

These files are the ones that conflict in pull requests. Resolve markers using
the rules in `SKILL.md` under "Resolve ledger conflicts".
