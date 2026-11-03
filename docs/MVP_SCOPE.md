# Campus Core — Hackathon MVP Scope

**Version:** 0.3 | **Planning date:** November 3, 2026 | **Deadline:** November 6, 2026 (time/timezone unverified) | **Owner:** Samuel and Adimchi

## Product principle
Build a complete student discovery experience across multiple UNIZIK departments using one application and shared layouts. Department names and taxonomy require confirmation; use clearly labeled fictional demo content until real publication permissions are confirmed. Preserve the long-term product and multi-university-ready relationships.

## P0 — November 6 demonstration release
1. Responsive public home and clear independent-project disclaimer.
2. University → faculty → department → level selection, with only seeded supported options.
3. Published departmental announcements: list, filters, detail, source, publisher, timestamps, expiry handling.
4. Curated academic resources: course/level/type metadata and approved links; **no file uploads initially**.
5. Simple events: list and detail; **no RSVP or event-management engine**.
6. Department-aware dashboard backed by a typed, read-only demonstration dataset; demonstrate at least two departments using the same routes/components.
7. No authentication, administrative mutation routes, service credentials, or pretend publishing controls in the P0 demo.
8. Empty/loading/error states, accessible mobile navigation, and basic automated security/functional tests.
9. Clearly labeled fictional demo content on both listings and details; no real examination notices, student data, or unsupported 'official' claims. Resource destinations must be real reviewed public learning links, not fabricated or unlicensed downloads.
10. Baseline metadata and noindex for the fictional demo; do not advertise fictional items through a sitemap or event structured data. Public deployment requires separate approval.

## P1 — only if fully secured and verified
Supabase integration, publisher authentication, scoped content management, migrations, RLS and minimal administration. These remain long-term requirements, not blockers to P0. Require architecture/policy approval, isolated backend tests, and a complete security review before inclusion. Otherwise defer the entire publisher workflow, not its security. Default for November 6 is demo data; no late backend switch after the November 5 release-candidate gate.

## Optional polish after P0, not a substitute for P1 security
Keyword search; persistent anonymous department selection; richer source links; basic admin overview. Resource previews mean manually curated descriptions only; arbitrary server-fetched previews are excluded.

## Out of scope for hackathon baseline
Student registration, community submissions, uploads/storage, push notifications, chat, AI assistant, RSVP, payments, AdSense, multi-university onboarding interface, native mobile apps, complex analytics, full moderation dashboard.

Moderation policy applies regardless of intake channel. Proposed baseline: human-reviewed external intake/correction channel, followed by an approved publisher creating the entry; channel/owner still to approve. Building a public submission form/queue requires a separate scope decision. Untrusted content must never bypass review.

## End-to-end acceptance tests
- A visitor can choose a supported department/level and locate a matching announcement, resource, and event.
- An unpublished, expired (when expiry policy applies), or withdrawn record cannot be retrieved from public endpoints.
- Anonymous visitors cannot publish.
- P0 exposes no write/auth/admin endpoints or service credentials. Switching departments and levels produces the correct records; unknown contexts and missing IDs fail safely.
- If P1 is included, a publisher cannot create/edit/archive content for an unassigned department/university or assign their own privileges.
- Published items show source, attribution, relevant context, and publication/update timestamps.
- If P1 is included, admin revocation prevents subsequent authorized writes and direct RLS negative tests pass.
- Mobile, keyboard, loading, empty, and error experiences are tested.
- CI/local checks pass; failures and unverified cases are documented.

## Release gates
- **November 3:** timeboxed foundation planning; approve setup commands and screen design direction. Backend review is separate and must not block approved read-only scaffolding.
- **November 4:** shared discovery/dashboard and all three content categories wired to demo records; remaining work/defects explicit.
- **November 5:** release candidate with lint, typecheck, build, relevant tests, mobile/keyboard checks and demo/noindex review. Freeze features; default P1 deferred.
- **November 6:** smoke checks, authorized deployment if required, presentation/submission and confirmation evidence. Exact cutoff must be verified, never assumed to be end of day.

Detailed tasks and estimates: [task board](planning/TASK_BOARD.md). These dates are targets, not verified progress.

## Scope change rule
Any added feature needs a user problem, owner, estimated effort, dependency analysis, and Samuel's approval. If time is tight, reduce supported departments, volume and polish first; preserve all three core categories and permission tests. Category removal requires explicit owner approval.
