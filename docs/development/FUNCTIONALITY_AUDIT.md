# Campus Core functionality audit — November 5, 2026

## Conclusion
The full product is not implemented or launch-ready. The repository contains a read-only student experience over fictional fixtures, an initial UI redesign, and Google sign-in client code. Firebase web settings and a saved Gemini key do not establish database or AI functionality.

## Evidence-based inventory
| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Public landing and dashboard | Implemented | src/app/page.tsx; src/features/discovery/student-page.tsx. Rebuilt UI still needs visual acceptance. |
| University/faculty/department/level selection | Implemented | src/features/discovery/context.ts and context-selector.tsx validate ancestry and reset dependent choices. Applied selection is in URLs, not an account preference. |
| Announcements/resources/events listings and details | Demo implementation | src/features/content/catalog.ts imports demoContent directly. Eighteen fictional records cover three departments; no live content source. |
| Keyword/category filtering and event time/status filters | Implemented over fixtures | catalog.ts filters local records. Not full-site/database search. |
| Resource files/previews/downloads | Missing | Resources render body paragraphs; no file storage or download flow. |
| Google sign-in/sign-out | Implemented, live behavior unverified | src/app/sign-in/page.tsx uses Firebase popup sign-in and auth state subscription. Provider/domain settings and actual login not verified in this audit. |
| Firestore persistence | Missing | No Firestore import, read/write layer, database rules or repository Firebase deployment configuration found. |
| Profiles, bookmarks and saved preferences | Missing | No routes, persistence or UI workflow implemented. |
| Publisher/admin dashboard and content lifecycle | Missing | No draft/create/edit/publish/archive operations or admin routes. |
| Moderation and publisher approval | Missing | No submission queue, review workflow or membership management. Public contribution scope still needs reconciliation with AGENTS.md. |
| Server authorization and database access policies | Missing | No protected write endpoints, server token verification or database rules. Browser sign-in alone provides no publishing authorization. |
| Gemini assistant/summaries | Missing | No application reference to GEMINI_API_KEY, model API call, assistant route or UI. Key presence was confirmed separately, not validity. |
| Notifications | Missing | No delivery, inbox or preference workflow. |
| Loading/error/empty states | Implemented | App boundaries and content/context recovery exist. Missing content returns recovery UI rather than a record-level 404. |
| Production discoverability | Demo-only | src/app/layout.tsx sets noindex/nofollow with demonstration metadata. |

## Verification limits
This is a source/configuration inventory, not a new live browser or Firebase audit. The immediately preceding implementation run passed lint, typecheck, 125 existing tests and a production build on Node 26; repository target is Node 24. Those tests cover taxonomy, context, catalog and utilities, not authentication, database rules, Gemini or publishing. They were not rerun for this documentation-only audit. Cloud configuration and the deployed site's current code were not inspected. Secrets were not printed or transmitted.

## Recommended completion sequence
1. Verify Google login and agree the concrete Firebase permission model.
2. Implement/test persistent published content, server authorization and database rules.
3. Implement scoped publisher/admin workflows and moderation before admitting real content.
4. Add resource file access, profiles, bookmarks and saved preferences.
5. Implement Gemini with authorized source retrieval, citations, limits and failure handling.
6. Complete mobile/desktop visual review, end-to-end tests and approved deployment verification.

Historical demo approvals and test reports must not be interpreted as completion of the restored full-product scope.

## November 5 — core implementation update
The earlier inventory predates the new publisher workspace, validated Firebase user-context API, atomic content/audit writes, security rules and published-content reader. These are now implemented locally, not verified end-to-end. Firestore is not created; emulator authorization tests remain unexecuted because Java is unavailable. Demo data remains the default and server publishing is disabled. No cloud rules/configuration were deployed. Gemini key presence is confirmed locally without exposing it; no AI integration exists yet. The full product remains incomplete.

## November 5 — student UI and authentication correction
The UI now directly draws from the supplied student_home_dashboard, authentication_sign_in_1, student_profile_settings_1 and Academic Precision references: navy/green colors, compact bulletin/resource/event sections, contextual department selection, desktop sidebar and five-destination mobile navigation. New account pages provide Google sign-in, email/password sign-in and registration, password-reset requests and an editable student profile. The shared Firebase session determines account navigation. Student academic preferences have owner-only proposed Firestore rules; private data is not bundled into public pages.

Observed in the actual Firebase console: Google and Email/Password are enabled; localhost is authorized. The default Firestore database exists with expired September 2022 access rules. Earlier notes saying no database or no email/password implementation are superseded. The live database policy was not changed. Browser preview verification was blocked by automatic approval review reporting an account usage limit; no visual or live-account pass is claimed.
