# Campus Core

## Latest implementation — CC-102
CC-101 accepted/completed. Shared responsive navigation, academic selection and department-aware dashboard now exist. Choose UNIZIK → Sciences (explicitly provisional demo grouping) → Computer Science/Mathematics/Statistics → 100–400, then Apply. Applied choices persist in section URLs. Announcements/resources/events currently show preview empty states, not implemented content. No backend/auth/publishing. CC-102 In Review: manual mobile/browser interaction checks pending; no screenshots captured.

Latest checks: lint/typecheck/format/build passed; 18 tests passed; 48 production context/section HTTP responses plus invalid/empty/404 checks passed. Details: [student experience verification](docs/development/STUDENT_EXPERIENCE_VERIFICATION.md). Earlier foundation status below is historical where superseded.

Long-term mobile-first campus discovery, source-attributed announcements, curated academic resources, and events. UNIZIK is the pilot; BUILDUP UNIZIK is the first delivery milestone, not the endpoint.

## Actual state — November 3, 2026

Frontend foundation implemented after explicit owner approval: Next.js 16.4.5, React 19.3.1, TypeScript 5.9.3, Tailwind 4.3.4, selective shadcn-style Button, ESLint/Prettier and Vitest. Package versions are pinned in package.json/package-lock.json. Student discovery/content screens are not implemented. No database, authentication, migrations or deployment exists; backend/service approvals remain separate.

- [Documentation index](docs/INDEX.md)
- [Agent instructions](AGENTS.md)
- [Integration findings](docs/planning/DOCUMENTATION_INTEGRATION.md)
- [Current sprint](docs/planning/CURRENT_SPRINT.md)
- [Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Proposed setup commands](docs/development/DEVELOPMENT_READINESS.md)

Deadline: November 6, 2026 (owner-confirmed; exact time/timezone unverified). Capacity: 15–25 engineering hours/week; remaining hours unconfirmed. Pilot: multiple UNIZIK departments, specific taxonomy/designs pending. P0 targets a labeled fictional read-only demo; secure backend/publishing is P1 and deferred unless completely verified.

## Local development

Use Node 24.x (verified with 24.15.0) and npm (verified with 11.12.1).

```sh
cd /Users/ume/Desktop/campus-core
npm ci
npm run dev -- --hostname 127.0.0.1
```

No environment file is required. `.env.example` documents the optional future public origin; never put secrets in NEXT_PUBLIC variables.

Checks: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run format:check`, `npm run build`. Production preview: `npm run start -- --hostname 127.0.0.1` after build. Formatting targets source/config only, preserving supplied documentation.

Verification: four unit tests passed, lint clean, types/format/build passed, dev and production HTTP/CSS/noindex smoke checks passed. Browser/mobile/keyboard testing remains outstanding. Full npm audit reports 17 moderate development-tool findings; production-only audit reports zero. ESLint 9 is deprecated but matches current Next lint-plugin peer constraints; track remediation before release. See [foundation evidence](docs/development/FOUNDATION_VERIFICATION.md).

## November 4 — rebuild in progress
The owner restored the full Campus Core product direction and requested a substantial UI redesign plus Firebase and Gemini. Earlier demo-only scope below is historical. Initial local UI changes are unverified until dependency installation, checks and browser review complete. Backend, authentication, publishing and AI remain unimplemented. Current design direction: [ui.md](docs/design/ui.md). Service setup: [Firebase setup](docs/development/FIREBASE_SETUP.md).
