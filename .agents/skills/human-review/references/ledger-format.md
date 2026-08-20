# Transcript and Checklist Ledger Format

## Contents

1. Transcript entry
2. Checklist header
3. Review item
4. Active review round
5. Review log
6. Coverage audit

## Transcript entry

Append entries chronologically:

```markdown
## YYYY-MM-DD — Short event title

### User message

> Verbatim prompt or answer

### Actions

- Read or changed concrete paths.
- Record material content or tooling decisions, worker handoffs, and corrections.

### Verification

- `exact command`: passed, failed, or unavailable with a concise reason.
```

Omit an empty verification heading.

## Checklist header

```markdown
# CV Repository Human Review Checklist

## Stored requests

> Verbatim triggering prompt

## Protocol

- Owner: human reviewer
- State: active
- Inventory basis: working tree at `<revision>` plus staged and untracked files
- Last reconciled: `YYYY-MM-DD`
- Current round: `R-NNN`

### State legend

- `[ ]` + `pending`
- `[ ]` + `awaiting-answer`
- `[x]` + `approved`
- `[ ]` + `changes-requested`
- `[ ]` + `awaiting-re-review`
- `[ ]` + `deferred`
- `[ ]` + `not-applicable`
```

Use textual state because a checkbox alone cannot distinguish all states.

## Review item

Use stable IDs and concrete evidence:

```markdown
- [ ] `CV-EXP-001` — Ayame Cluster role summary
  - State: `pending`
  - Evidence: `src/contents/CV_zh.md`
  - Review: factual accuracy, scope, chronology, wording, and link target
  - Decision: —
```

Use one item per independently reviewable claim, section, link, structure,
configuration, skill, script, or delivered behavior. Parent items may orient but
cannot be approved until every in-scope child has a terminal state.

## Active review round

Keep exactly one active round:

```markdown
## Active review round

### R-001 — Project experience section (12 checks)

- State: `awaiting-answer`
- Asked: `YYYY-MM-DD`
- Items: `CV-PROJECT-001` through `CV-PROJECT-012`
- Findings:

  | Check            | State | Finding and evidence                  |
  | ---------------- | ----- | ------------------------------------- |
  | `CV-PROJECT-001` | ready | Role wording in `src/contents/CV_zh.md`           |
  | `CV-PROJECT-002` | ready | Repository link in `src/contents/CV_zh.md`        |

- Question: Do you approve this review batch?
- Evidence: `path`, `path`
- Recommendation: ...
- Tradeoffs: ...
- User answer: awaiting
- Agreed action: none
- Action result: none
- Verification: none
```

When resolved, move the data into the review log before opening another round.

## Review log

Keep a compact navigation table, followed by detail when needed:

```markdown
| Round   | Scope / Items                    | Result   | Date       |
| ------- | -------------------------------- | -------- | ---------- |
| `R-001` | Project experience (`12 checks`) | approved | YYYY-MM-DD |
```

For changes, retain the original answer, agreed action, modified paths, command
evidence, and re-review decision.

## Coverage audit

Before claiming completion, compare the checklist with:

- changed, staged, deleted, and untracked files;
- authoritative CV sources, language variants, and generated outputs;
- changed biographical claims, dates, roles, metrics, skills, and attribution;
- section structure, wording, chronology, language, tone, and presentation;
- links, contact surfaces, privacy-sensitive content, and publication exposure;
- Nix/devenv files, agent instructions and skills, dependencies, scripts, tests,
  fixtures, documentation, and delivery artifacts.

Record:

```markdown
## Coverage audit

- Working-tree files represented: `N/N`
- CV content and factual claims represented: `N/N`
- Document structure and presentation represented: `N/N`
- Links and contact surfaces represented: `N/N`
- Tooling and configuration represented: `N/N`
- Agent guidance and skills represented: `N/N`
- Delivery artifacts represented: `N/N`
- Known exclusions: ...
- Result: passed | incomplete
```

Counts support evidence; they never replace checking actual mappings.
