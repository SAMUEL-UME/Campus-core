# Testing strategy

Vitest baseline now exists: four tests for the class-merging utility. No database/service connections. Add only tests relevant to implemented behavior. Executed results and limitations: [foundation verification](FOUNDATION_VERIFICATION.md).

- Foundation: test a real utility (shadcn class merge helper), run ESLint, strict typecheck, formatting check, production build; start localhost dev and production servers, verify HTTP response and expected page content, inspect logs, stop only owned processes.
- Student flows: unit tests for tenant/department/level filtering, unknown identifiers, ordering, resource URL schemes and dates; manual end-to-end discovery through all categories for two departments.
- States/accessibility: keyboard/mobile/focus checks, force error path and loading state, empty dataset, not-found details, demo disclosure. HTTP success alone does not verify layout/accessibility.
- Demo security: no secret values, auth/write/admin endpoints, real personal data, fictional sitemap/structured data; noindex verification. Fixture filtering is not RLS evidence.
- P1: real isolated RLS tests with anonymous/member/revoked/other-department/other-university/admin identities; lifecycle, membership escalation, audit integrity and withdrawal/cache tests before enabling backend.

Scripts proposed: lint (`eslint .`), typecheck (`tsc --noEmit`), test (`vitest run`), format:check, build (`next build`). Browser automation can be added as a separately scoped task; do not silently install browser binaries in foundation. Record command, versions, outcome, scope and limitations. No unexecuted test passes.