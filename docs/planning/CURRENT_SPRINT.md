# Current sprint — November 3–6, 2026

Owner: Samuel. Deadline November 6; exact submission time/timezone unverified. Engineering availability 15–25 hours/week; actual hours remaining are not confirmed. CC-101 accepted/completed. CC-102 context selection/shared dashboard implemented, In Review pending browser verification; content categories/backend not implemented.

CC-102 handoff resolved by owner's minimal-design and provisional three-department approval, superseding earlier blockers below. Next gate: execute manual browser/mobile checklist in [CC-102 evidence](../development/STUDENT_EXPERIENCE_VERIFICATION.md), then CC-103. Real taxonomy/content permissions remain unverified.

## Sprint 0: November 3 only
Cap foundation planning/review at approximately 60–90 minutes of engineering time (proposed budget, not recorded time). Resolve frontend setup approval, design handoff, demo taxonomy and official cutoff. Unresolved backend decisions move to P1, not an indefinite foundation phase. See [task board](TASK_BOARD.md) for all statuses and acceptance criteria.

## First engineering sprint: November 3–5
Goal: read-only multi-department student demo with announcements, resources and events; no publisher workflow. CC-101 received explicit approval and has executed baseline evidence. CC-102 still needs taxonomy and approved design handoff. Suggested engineering budget: setup 2–3h; taxonomy/layout/discovery 2–3h; content flows 3–4h; verification/fixes 2–3h; release preparation 1–2h. Total 10–15h, an estimate requiring Samuel to confirm remaining availability, not a promise. Reduce polish, not core categories or checks, if this exceeds capacity.

| Date | Target | Exit evidence |
| --- | --- | --- |
| November 3 | Sprint 0 decisions; approved foundation setup and baseline checks | Approval record; exact dependency versions; dev smoke and production build logs |
| November 4 | Multi-department navigation/dashboard and all content flows | At least two department contexts, reusable routes/layouts, labeled records, links/detail flows |
| November 5 | Freeze P0 release candidate; fix blockers; keep P1 deferred unless fully verified already | Lint/typecheck/tests/build, mobile/keyboard checks, noindex/no-secret review, known issues |
| November 6 | Approved demo release, smoke test, rehearsal and submission | Actual deployed/local demo evidence; submission confirmation before verified cutoff |

Start checks as each task lands, not only November 5. Design references have not been supplied; request a minimal approved alternative rather than invent screen requirements. If approval/cutoff/capacity prevents targets, record the slip and notify Samuel immediately. A deployable local build is not a deployed demo or completed submission.

## Sprint acceptance
Every P0 student journey works across at least two departments; invalid context, missing record and empty states tested; error/loading states exercised; fictional labels remain visible on details and listings; no auth/write/service features; automated checks and manual accessibility evidence recorded; release restrictions stated honestly. No P1 security claims based on fixture filtering.