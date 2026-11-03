# Task board

As of November 3, 2026. CC-101 accepted/completed; CC-102 implemented pending browser review. Assignments need team acknowledgment. Estimates are engineering effort, not promised remaining capacity. P0 plan totals approximately 10–15h; see sprint budget.

| ID / task and description | Owner | Priority | Dependencies | Acceptance criteria | Status | Estimate / target |
| --- | --- | --- | --- | --- | --- | --- |
| CC-001 Confirm exact cutoff/rules | Adimchi | P0 | Organizer source | Submission time/timezone, required assets/tech and official source recorded | Ready | S / Nov 3 |
| CC-002 Approve setup and remaining capacity | Samuel | P0 | Readiness proposal | Explicit command/change approval; actual available hours confirmed | Ready | S / Nov 3 |
| CC-003 Confirm multi-department demo taxonomy/content | Adimchi | P0 | Department input | At least two department contexts/levels; fictional sample copy all categories; reviewed external resource links | Ready | M / Nov 3 |
| CC-004 Design/QA handoff | Lawrence | P0 | Stitch exports or approved minimal alternative | Screen behavior, shared mobile layout, keyboard and empty/error cases accepted | Blocked | M / Nov 3 |
| CC-005 Demo disclosure and submission outline | Chidera | P0 | CC-001 for final format | Independent-project and fictional-data wording; student journey script | Ready | S / Nov 3 |
| CC-006 Synchronize dated foundation docs | AI; Samuel reviews | P0 | Owner constraints | Required files updated, link/whitespace checks run, remaining decisions explicit | In Review | S / Nov 3 |
| CC-101 Configure application foundation | Samuel + AI | P0 | CC-002 | Next/TS/Tailwind, selective shadcn, ESLint/Prettier, environment template, source structure, baseline tests; lint/typecheck/test/build and local dev/production smoke pass | Completed | 2–3h / Nov 3 |
| CC-102 Shared context/navigation/dashboard | Samuel + AI | P0 | CC-101; owner approved provisional taxonomy/minimal design | University/faculty/department/level navigation; three departments share implementation; invalid context and empty cases tested; browser/mobile review pending | In Review | 2–3h / Nov 4 |
| CC-103 Announcements/resources/events | Samuel + AI | P0 | CC-102 | Listings/details as scoped, source/demo labels, safe resource links, event dates; context filters and missing records tested | Blocked | 3–4h / Nov 4 |
| CC-104 Release-candidate verification/fixes | Samuel; Lawrence QA | P0 | CC-103 | Lint/types/tests/build; mobile/keyboard/error/loading checks; noindex, no secrets or write endpoints; findings recorded | Blocked | 2–3h / Nov 5 |
| CC-105 Demo release/submission | Samuel; Adimchi/Chidera assets | P0 | CC-001, CC-005, CC-104; deployment approval | Approved release smoke-tested, required assets delivered, actual submission evidence retained | Blocked | 1–2h engineering / Nov 6 |
| CC-201 Backend architecture and security review | Samuel + AI | P1 | Separate architecture approval | Schema, trust/lifecycle, auth/admin provisioning and RLS test plan approved | Backlog | M / after demo by default |
| CC-202 Secure backend/publishing | Samuel + AI; Lawrence QA | P1 | CC-201; service approval | Migrations, auth, scoped CRUD, revocation, direct DB RLS and cross-university tests pass; no bypass | Blocked | Estimate after CC-201 |

Blockers must be resolved before dependent implementation. No community-submission UI, uploads, AI, monetization or analytics tasks are authorized. Move completed implementation to In Review with executed evidence; use Completed only when definition of done is met.

CC-006 historical evidence (before approved setup): November 3 documentation inspection checked 23 Markdown files with zero missing relative links or trailing-whitespace findings; git diff --check passed. Secret-ignore examples passed; .env.example remains unignored. At that point no package.json or node_modules existed. This repository-state snapshot is superseded by CC-101 below; it is not the current application status.
CC-101 evidence: owner approved setup; see [executed foundation checks](../development/FOUNDATION_VERIFICATION.md). No browser review or secure backend claimed. CC-002 setup approval is satisfied; remaining-hours confirmation is still open.

Owner accepted CC-101 and authorized CC-102 with minimal design and provisional Computer Science/Mathematics/Statistics, levels 100–400. This resolves implementation handoff, not real taxonomy verification or QA. CC-102 evidence: [student experience verification](../development/STUDENT_EXPERIENCE_VERIFICATION.md). CC-103 follows browser review; category content is not implemented.

| Follow-up ID | Owner | Priority | Dependencies | Acceptance | Status | Complexity |
| --- | --- | --- | --- | --- | --- | --- |
| CC-106 Tooling audit/support remediation | Samuel + AI | P0 before release review | Compatible tooling research | Resolve findings or document reviewed mitigation/acceptance; rerun lint/tests/build/audit | Ready | M |
