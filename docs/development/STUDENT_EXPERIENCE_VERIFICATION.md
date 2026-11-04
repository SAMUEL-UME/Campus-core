# CC-102 implementation and verification — November 3, 2026

## Full owner-supplied directory integration (supersedes provisional baseline below)

- Reference: `src/data/unizik-academic-taxonomy.ts`, authorized by the owner for CC-102. All 14 faculties, 86 departments and 383 department-level combinations are included. Names, IDs, scoped slugs, levels and verification notes are unchanged; only Prettier formatting was applied to the supplied file.
- `src/data/academic-taxonomy.ts` derives discovery options from that reference, replacing the provisional data module. Existing cascading selects and server context validation now use it. Parent changes clear descendants, and applied IDs persist through GET URLs and section navigation. Legacy provisional URLs recover as invalid selections rather than being silently remapped.
- Selected department verification notes appear in a polite live region. Disclosure identifies owner-supplied, independently unverified reference data, not an official directory. Agriculture ranges and questionable Law/Pharmaceutical Sciences/Medicine mappings remain intact.
- Executed: lint, typecheck, format:check, production build and 118 Vitest tests across three files passed. Coverage includes all faculty/department mappings and levels, unique IDs/scoped slugs, preserved notes, Medicine 600, Engineering 500, Computer Science 100–400, ancestry/duplicate rejection, synthetic future university and section URL round trips.
- Production HTTP: all 1,532 combinations (383 department-level contexts × four sections) returned 200 with matching names/levels, noindex, disclosure and applicable notes. Empty/invalid/duplicate/legacy states and actual HTTP 404 passed. Smoke server stopped in cleanup. Initial terminal completion reporting was unreliable; repeated smoke with saved result evidence. The temporary Node data-reader emitted a module-type warning; no package configuration was changed to suppress it.
- No services, dependencies, authorization-policy changes, publishing, deployment or content listings/details added. Client context filtering is not authorization. Audit not rerun; existing CC-106 risk remains.
- Status remains In Review. Browser hydration, mobile overflow, keyboard/focus, native submission, history and loading/error retry remain unverified. Apply the manual checklist below to all faculties and representative 400/500/600-level programmes, not just the former demo departments.

## Historical provisional baseline

Status: In Review. Owner authorized minimal mobile-first design and provisional UNIZIK Computer Science, Mathematics, Statistics, levels 100–400. Faculty placement was not supplied: the UI explicitly calls Sciences a provisional demo grouping, not verified UNIZIK structure.

## Implemented
- Shared StudentPage shell: header/disclosure/footer, mobile two-column section navigation and desktop sidebar, current-page indication and dashboard cards.
- Native labeled cascading selection form; changing parent resets children; Apply commits context through a GET URL. Applied context persists in section links/refresh/shared URLs. Unsubmitted edits do not persist. No cookies/student profile.
- Typed taxonomy separated from presentation; parent relationships validated. Unknown/duplicate/mismatched URL values retain only valid parents and show a recovery alert.
- Explicit root, announcements, resources and events routes sharing one implementation. Category pages are honest preview empty states, not content listings/details.
- Root loading/error/not-found boundaries; generic retry text does not expose exception details. Noindex, skip link, visible focus and minimum-height controls.
- No dependencies/configuration replacement, Supabase/auth/publishing/admin/API/service work. Pre-existing staged files preserved; no git stage/commit/push.

## Executed evidence
Lint, typecheck, format:check and production build all passed. Vitest: 18 tests across two files (14 context/navigation cases and four existing utility tests). Tests cover every demo department/level, parent resets, invalid and duplicate query parameters, synthetic second university/ancestry, empty taxonomy, and section URL round trips.

Production HTTP smoke: 48 combinations (3 departments × 4 levels × 4 sections), all 200 with correct context, noindex and demo disclosure. Empty root and invalid-context recovery checked. Unknown path verified HTTP 404. Server logs reviewed and launched process stopped.

Initial broad dynamic section route returned not-found UI with HTTP 200 due to streaming; replaced with explicit thin route wrappers and reran full checks/smoke. An intermediate formatting check failed after a route edit; formatting corrected and final check/build passed. No failures concealed.

## Not verified / review checklist
No browser runner installed; none added. No screenshots captured. HTTP and unit tests do not prove hydration, native form submission, browser history, responsive overflow, keyboard/focus or screen-reader behavior. Actual loading/error-boundary activation/retry not exercised. These are required manual review before CC-102 is Completed:
1. At 320/390px and desktop, select UNIZIK → demo faculty → each department → level; Apply; verify heading and no horizontal overflow.
2. Visit all sections, refresh/back/forward, verify applied context. Change department, confirm level clears, then Apply another level.
3. Tab/Shift+Tab through skip link, navigation, selects and Apply; confirm labels, focus and active page.
4. Check invalid URL recovery and not-found route; exercise loading/error retry in controlled browser testing without production fault hooks.

Existing 17 moderate tooling audit findings/ESLint deprecation remain CC-106; audit not rerun in CC-102. Taxonomy is provisional and content rights unconfirmed. No backend authorization or accessibility certification claimed.

## Proposed CC-103
Implement typed fictional announcement/resource/event records and scoped query tests, then real list/detail screens using this shell. Include visible demo/source/date metadata, reviewed external learning links, event timezone/cancellation, missing/empty records and preserved context. Do not add publishing/auth; retain noindex. Real content requires permissions. Start after CC-102 review; do not count navigation entry points as content implementation.

## November 4 — Option A execution update
Owner approved the read-only fictional-data MVP and deferred all Supabase/auth/publishing work. Landing, dashboard, all three content listings/details, filtering and mobile navigation are implemented. Local production build and 125 tests pass; isolated Chrome journeys at 320/390/1280px passed, including history/refresh and context preservation. CC-102 remains In Review for loading/error retry and fuller accessibility review, not blocked on backend work. No deployment/push performed. See [release evidence and remaining gates](DEMO_RELEASE.md).


## Final release QA — November 4
Existing checks and production build passed (125 tests); production browser journeys and critical keyboard controls passed at 320/390/1280px. Loading and error/retry exercised separately in disposable copies, without release fault hooks. Audit: 17 moderate dev-tool findings, zero production findings, no upgrades. No required environment variables. GO for owner-approved demo deployment, not a verified deployed release. Remaining limits and exact approval-gated handoff: [release checklist](DEMO_RELEASE.md). No push/deployment performed.
