# Current sprint — November 3–6, 2026

Owner: Samuel. Deadline November 6; exact submission time/timezone unverified. Engineering availability 15–25 hours/week; actual hours remaining are not confirmed. CC-101 accepted/completed. CC-102 context selection/shared dashboard implemented, In Review pending browser verification; content categories/backend not implemented.

CC-102 now uses the owner-supplied 14-faculty / 86-department reference dataset, superseding the provisional three-department implementation. Exact mappings, levels and verification notes are preserved; independent academic verification/content permissions remain outstanding. Automated evidence: 118 tests and 1,532 production HTTP combinations pass. Next gate: execute manual browser/mobile checklist in [CC-102 evidence](../development/STUDENT_EXPERIENCE_VERIFICATION.md), then CC-103. Earlier sprint planning below is retained as history.

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

## November 4 — Option A execution update
Owner approved the read-only fictional-data MVP and deferred all Supabase/auth/publishing work. Landing, dashboard, all three content listings/details, filtering and mobile navigation are implemented. Local production build and 125 tests pass; isolated Chrome journeys at 320/390/1280px passed, including history/refresh and context preservation. CC-102 remains In Review for loading/error retry and fuller accessibility review, not blocked on backend work. No deployment/push performed. See [release evidence and remaining gates](../development/DEMO_RELEASE.md).


## Final release QA — November 4
Existing checks and production build passed (125 tests); production browser journeys and critical keyboard controls passed at 320/390/1280px. Loading and error/retry exercised separately in disposable copies, without release fault hooks. Audit: 17 moderate dev-tool findings, zero production findings, no upgrades. No required environment variables. GO for owner-approved demo deployment, not a verified deployed release. Remaining limits and exact approval-gated handoff: [release checklist](../development/DEMO_RELEASE.md). No push/deployment performed.

## November 5 — active core implementation
The restored full-product request supersedes the historical read-only scope below. Core publishing and Firestore reads are implemented locally, pending database creation, emulator security tests and live integration verification. See [Firebase setup](../development/FIREBASE_SETUP.md). Continue with verified persistence, then smaller saved-item/preference features, then the grounded Gemini assistant. Do not treat this implementation as launch-ready.
