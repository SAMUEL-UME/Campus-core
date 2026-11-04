# Campus Core — Product Requirements Document

**Version:** 0.2 | **Date:** 2026-11-03 | **Status:** Core direction accepted; detailed architecture pending | **Owner:** Adimchi (Product), Samuel (final approval)

## 1. Product vision
CC-102 discovery reference update: the owner supplied `src/data/unizik-academic-taxonomy.ts` for all 14 faculties and department-specific levels. Preserve exact supplied names/mappings and verification notes; this is not independently verified official university information. Implementation and outstanding browser review are recorded in [CC-102 evidence](development/STUDENT_EXPERIENCE_VERIFICATION.md).

Campus Core is a mobile-first university information platform that helps students find relevant departmental announcements, academic resources, and events in one place. The first pilot is Nnamdi Azikiwe University (UNIZIK); the architecture should accommodate other universities later. The BUILDUP UNIZIK hackathon is the first delivery milestone, not the product's endpoint.

## 2. Problem and hypotheses
Students may miss important information because it is distributed across WhatsApp groups, informal representatives, and multiple channels. **Hypotheses to validate:** students want a dedicated destination; a department can supply timely content; source attribution improves trust; curated resources and events add repeat value. Survey results and interview findings have not yet been provided as evidence.

## 3. Users and roles
- **Public visitor/student:** selects institution, department, and level; reads published public information without signing in.
- **Approved publisher:** signs in and manages content for assigned department(s), subject to publication rules.
- **Scoped administrator (proposed):** approves departmental publisher access and moderates/withdraws within an assigned university; no implicit cross-university or direct-publication privilege.
- **Future registered student/contributor:** saves preferences, submits material, receives notifications; outside initial scope.

## 4. Core user journeys
1. Student opens site → chooses UNIZIK → faculty/department/level → sees relevant published updates.
2. Student filters updates (keyword search optional) → opens detail → checks publisher, source, timestamps and external reference links; no attachments/uploads initially.
3. Student opens resource library → filters by course/level → follows a permitted curated resource link.
4. Student explores events → sees date, location, organizer, and source.
5. Approved publisher signs in → creates or edits scoped content → publishes under approved workflow → archives outdated entries.
6. Admin verifies publisher identity and department assignment; can unpublish harmful or incorrect content.

## 5. Functional requirements
| ID | Requirement | Initial priority | Acceptance intent |
|---|---|---|---|
| PR-01 | University/faculty/department/level discovery | P0 | Student can choose supported context; unsupported options are not misleading |
| PR-02 | Public announcement feed and details | P0 | Only published, permitted content visible; source and dates shown |
| PR-03 | Department and level filters | P0 | Results match selected context |
| PR-04 | Curated academic resources | P0 | Filterable entries with course, type, owner/source, and safe destination |
| PR-05 | Basic campus events | P0 | Event listing/detail with organizer, location, time and source |
| PR-06 | Publisher authentication | P1, gated | Unauthorized users cannot write content; absent in read-only demo |
| PR-07 | Department-scoped publishing | P1, gated | Publisher cannot manage another department's records |
| PR-08 | Minimal administration | P1, gated | Admin can grant/revoke publisher membership and withdraw content |
| PR-09 | Search by keyword | Optional polish | Search only returns publicly publishable records |
| PR-10 | Student accounts, submissions, notifications | Later | Requires separate approval and privacy design |
| PR-11 | Gemini-powered assistance | Conditional | Only if demonstrably useful and permitted by competition rules |
| PR-12 | Advertising/monetization | Later | No ads in hackathon MVP |

## 6. Nonfunctional requirements
- Mobile-first, keyboard-accessible, readable contrast, meaningful loading/empty/error states.
- Secure server-side authorization, validated inputs, audit trail for publication actions.
- Accurate attribution and an explicit independent-platform statement.
- Search-indexable public pages without exposing private or unpublished content.
- Documented build, lint, typecheck, tests, and deployment process.
- Avoid hardcoded UNIZIK-only assumptions in the underlying relational model.

## 7. Success measures (targets to define)
Task success for finding an announcement; time to find information; accuracy/freshness of pilot content; repeat visits; successful publisher updates; number and severity of access-control defects. **No baseline or numeric targets approved yet.**

## 8. Dependencies and open decisions
Owner confirmed November 6, 2026 deadline and 15–25 engineering hours weekly on November 3. Exact submission time/timezone, official brief, actual remaining hours, named pilot departments, content permissions, approved Stitch designs and backend policy details remain open. See [MVP scope](MVP_SCOPE.md), [compliance](APPLICATION_COMPLIANCE.md), and [hackathon requirements](HACKATHON_REQUIREMENTS.md).

## 9. Approved trust policy
Untrusted submissions require moderation before public visibility. Direct publishing is allowed only for manually approved department-scoped publishers. This policy does not add public submission UI to the MVP. Database lifecycle and proposed reviewer permissions are authoritative in [database design](DATABASE_DESIGN.md). Research hypotheses above remain unvalidated; no survey results have been supplied.

## 10. November 3 delivery reprioritization
Multiple UNIZIK departments are confirmed pilot scope. Use one data-driven application, not department-specific copies. P0 covers the complete discovery/dashboard/announcements/resources/events experience using clearly labeled fictional records. P1 backend/auth/publishing may ship only if fully secured and tested; otherwise all are deferred. This changes release sequencing, not the long-term product requirements. No real publication permissions are confirmed. Demo content is non-indexable; production discoverability remains a future release requirement.
