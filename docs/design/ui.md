# Campus Core UI direction — November 4, 2026

Current owner request supersedes the read-only/minimal-demo product direction. Build toward a launchable mobile-first campus platform with Firebase and Gemini. This document reconstructs the direction from retrieved conversations and supplied designs; it is not the missing historical ui.md.

## Evidence
- Ideas / Digital Marketplace Idea: public browsing, university/faculty/department/level discovery, pinned announcements, resources, events, moderated contributions, manually approved administration. White/navy/green responsive UI.
- Caposco Web App Sketch: mobile-first web application, profiles, campus assistant, possible later native packaging.
- Supplied design/stitch screenshots: student_home_dashboard, announcements_updates, academic_resources_library, admin_overview_1; Academic Precision DESIGN.md.
- Latest owner instruction: redesign using references, research, real Firebase backend and Gemini integration. Earlier assistant suggestions and reference-screen labels are not independent approvals or verified product facts.

## Visual contract
Use navy text, pale cool canvas, white surfaces, restrained green accents, clear typographic hierarchy and generous touch targets. Build original components rather than copying exported HTML. Student content leads; context selection is compact after onboarding. Mobile navigation has four or five labeled destinations; desktop uses a sidebar. Resource cards and event cards have distinct structures. Keep sample labels near sample content, not an oversized warning dominating every page. Never invent verified badges, institution integrations, statistics or real notices.

## Product completion criteria
Student: browse without sign-in; select academic context; read/filter/search announcements, resources and events; save items and preferences with an account; contribute for review.
Publisher/admin: authenticated, department-scoped draft/edit/publish/archive and moderation; roles assigned by authorized owner, not clients.
Firebase: authentication, durable content/preferences, controlled file access; rule tests and server authorization; configured project required for live verification.
Gemini: server-side key, published-content retrieval with source links, bounded requests and durable usage limits; missing configuration returns honest unavailable state.
Release: actual mobile/desktop visual review, keyboard checks, tests/build, verified service flows, operator/content details and explicit deployment target. Never label disconnected integrations complete.

## Research
- https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns — adaptive primary navigation, 3–5 mobile destinations.
- https://www.w3.org/WAI/tutorials/forms/labels/ — visible associated labels.
- https://firebase.google.com/docs/auth/web/google-signin — Google sign-in integration.
- https://firebase.google.com/docs/firestore/security/rules-conditions — client rules and server-library trust boundaries.
- https://ai.google.dev/gemini-api/docs/api-key — Gemini key handling.

## Outstanding inputs
Original historical ui.md has not been recovered. Firebase project and web configuration have now been supplied; Google provider activation and live sign-in verification remain pending. The Gemini key has not been configured. Node found locally is 26, while the repository requires 24. Historical release QA is not verification of this rebuild.
