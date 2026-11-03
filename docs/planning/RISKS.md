# Risk register — November 3, 2026

| ID | Risk / severity | Owner | Mitigation / trigger |
| --- | --- | --- | --- |
| R-01 | Unknown exact deadline/timezone — High | Adimchi | Confirm Nov 3; target RC Nov 5; do not assume Nov 6 evening |
| R-02 | 15–25h weekly not confirmed remaining hours — High | Samuel | Confirm actual hours; 10–15h P0 estimate; reduce polish and escalate slips |
| R-03 | Designs not supplied — High | Lawrence / Samuel | Approve minimal shared layout if exports unavailable; do not invent screen features |
| R-04 | Multiple department taxonomy unconfirmed — Medium | Adimchi | Confirm at least two contexts; label synthetic content and any provisional taxonomy |
| R-05 | Backend rush leads to unauthorized writes — High | Samuel | Read-only P0; no partial publisher workflow; P1 negative/RLS tests mandatory |
| R-06 | Fictional notices mistaken for reality — High | Chidera / Lawrence | Persistent demo labels, noindex, no fictional Event structured data or real student data |
| R-07 | Dependency/toolchain mismatch or setup delays — Medium | Samuel / AI | Resolve compatible stable versions after approval; lockfile; incremental dev/build checks |
| R-08 | Deployment/submission requirements unavailable — High | Adimchi / Samuel | Obtain rules; separate deployment approval; do not equate local build with submission |
| R-09 | Real content rights/freshness unresolved — High for real pilot | Adimchi | Fictional demo now; permission records and content owners before real publication |

No risk is closed without evidence. See task board for current work status.

R-10 — Medium, Samuel: compatible ESLint 9 is deprecated; full npm audit reports 17 moderate development-tool findings (production-only audit zero). Avoid untrusted tooling inputs; investigate compatible supported tooling before release. No force-fix applied. Track CC-106.