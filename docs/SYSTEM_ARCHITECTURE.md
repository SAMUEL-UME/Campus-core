# Campus Core — System Architecture

CC-102 directory implementation: `src/data/academic-taxonomy.ts` derives flat discovery options from the owner-supplied `src/data/unizik-academic-taxonomy.ts`. Supplied stable IDs are URL values; server validation checks university → faculty → department → supported level. Names, scoped slugs and verification notes are preserved. No backend/schema/service changes; existing backend approval gate remains. See [verification](development/STUDENT_EXPERIENCE_VERIFICATION.md).

**Version:** 0.1 | **Status:** Proposed; no implementation verified | **Technical owner:** Samuel

## 1. Architectural goals
Mobile-first web app, low operational burden, clear authorization boundaries, reliable public information, and a database model capable of supporting more universities in future.

## 2. Proposed stack
- **UI/application:** Next.js App Router, React, TypeScript.
- **Styling:** Tailwind CSS; shadcn/ui selectively for accessible reusable components.
- **Data:** Supabase-hosted PostgreSQL.
- **Identity:** Supabase Auth for publishers and admins only in MVP.
- **Authorization:** PostgreSQL RLS plus server-side authorization checks and scoped queries.
- **Hosting:** Vercel candidate; deployment requires approval and cost review.
- **AI:** Gemini only after a concrete use case, privacy review, and competition-rule check.

Frontend choices are installed and verified; backend choices remain provisional/unconnected. Backend approval is required before migrations or external service connections. CC-102 uses explicit root/announcements/resources/events wrappers sharing StudentPage and validated query-string context over typed demo taxonomy. No database or generic data abstraction is introduced.

## 3. Request and trust boundaries
```text
Public browser / student
   -> Next.js public routes and server rendering
   -> scoped read-only data access
   -> PostgreSQL published content

Publisher browser (authenticated)
   -> Next.js server actions / route handlers
   -> session + validation + authorization
   -> scoped PostgreSQL policies
   -> audit event

Administrator (authenticated)
   -> privileged administrative workflow
   -> explicit admin authorization + narrowly scoped operations
   -> membership / withdrawal / audit
```
Never send Supabase service-role secrets or other privileged keys to the browser. Public pages must never expose drafts through client requests, metadata, caches, or sitemap entries.

## 4. Suggested boundaries
```text
src/app/                     # routes, layouts, server entry points
src/components/              # reusable UI
src/features/announcements/  # feature-specific rules and UI
src/features/resources/
src/features/events/
src/features/departments/
src/lib/auth/              # session and authorization helpers
src/lib/data/              # scoped data access
src/lib/validation/        # input schemas
supabase/migrations/       # reviewed versioned schema changes
supabase/seed.sql          # fictional or authorized demo content
```
Create only directories that become useful. Avoid microservices, a separate Express API, and speculative abstraction layers.

## 5. Content lifecycle
Owner-approved policy: direct publication only by manually approved department-scoped publishers; untrusted submissions require review. The authoritative proposed state machine and permission matrix are in [database design](DATABASE_DESIGN.md). Public submission UI remains outside the baseline MVP; do not infer it from the moderation requirement.

## 6. Performance and SEO
Render public content with appropriate caching and invalidation; ensure changed/withdrawn content stops being served. Use metadata, canonical URLs, sitemaps and robots directives for authorized public pages. No indexing of admin, private, draft, or user-specific pages.

## 7. Observability and resilience
Structured server error logging without secrets/PII; error and empty states; backups and restore plan before real launch; basic monitoring; rate limits on sensitive writes. Do not claim uptime targets before measured operations.

## 8. Architecture decisions requiring approval
See the numbered architecture approval gate below. Provider costs, region, retention and source verification also need review before service activation/public launch.

## 9. Related documents
[Database design](DATABASE_DESIGN.md), [security](SECURITY_REQUIREMENTS.md), [SEO](SEO.md), [MVP](MVP_SCOPE.md).

## 10. Authentication and operational proposals
- Publisher/admin accounts only; recommend invite-only email/password for the first release, with reset flow and stronger admin sign-in protection reviewed before launch. No public registration or student profile creation. Sign-in method is not approved yet.
- Separate browser/server Supabase clients; verify identity server-side before mutations and retrieve active membership from the database. Session cookies or client roles alone do not establish authority. Validate callbacks/redirect destinations; protect mutations against cross-origin abuse.
- Ordinary authenticated operations use the user's identity and RLS, not a privileged secret. Isolate any approved account invitation/bootstrap operation from normal data access and audit it.
- No separately deployed API, ORM, microservices, generic repository framework, uploads, AI or server URL-preview service.
- Initially avoid shared caching for permission-sensitive data. Public invalidation and withdrawal behavior must be tested before enabling content caching. Draft metadata and preview responses must not leak publicly.
- Plain-text content and safe external links initially; structured logs exclude secrets and personal data. Define durable rate limiting for multi-instance deployment before release, rather than claiming process-memory counters provide production protection.

## 11. Architecture approval gate (not implementation authorization)
Samuel must approve: (A1) explicit tenant constraints and separate content tables; (A2) university-admin and department-publisher matrix including campus event review; (A3) invite/sign-in and initial admin provisioning; (A4) moderation intake scope, reviewed-edit behavior and lifecycle; (A5) baseline public routes/indexing and anonymous preferences; (A6) proposed test/tool dependencies and environment strategy. Record decisions in [decision log](planning/DECISION_LOG.md).

November 3 update: read-only P0 scaffolding may begin after explicit approval of the frontend changes/commands in [development readiness](development/DEVELOPMENT_READINESS.md), without completing backend A1–A4. Backend integration/policy implementation still requires that architecture/security review. Service activation, cost and public deployment need their own approval.

## 12. Hackathon P0 execution boundary
One Next.js application with parameterized department routes and shared layouts. Typed demo records carry university/faculty/department/level relationships; small feature queries filter those records. No generic repository interface, database client, auth screen or mutation API is needed yet. Backend diagrams above describe P1/long-term architecture, not implemented P0 capabilities. Fake data must contain no confidential drafts or real student data; filtering bundled fixture records is a correctness check, not RLS/security isolation. Fictional pages are noindex and visibly labeled. Approve corresponding screen designs before product-screen work; foundation may use a neutral verification page, not a claimed final dashboard.
