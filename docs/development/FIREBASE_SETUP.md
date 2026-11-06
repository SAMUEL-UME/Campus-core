# Firebase and Gemini setup — integration pending

The owner supplied Firebase project ID `fir-9-dojo-13400` and its registered web configuration. The configuration is stored in ignored `.env.local`; a modular client initializer and Google sign-in page are implemented locally. Google provider activation, authorized domains and a real sign-in test remain unverified. No database, publishing or AI integration is verified. Gemini key presence is confirmed locally; validity and integration remain unverified.

## Account setup
1. Create Campus Core in https://console.firebase.google.com/ and record the actual project ID. Analytics is optional and unnecessary for the first integration.
2. Register a web app. Its Firebase web configuration identifies the project; authorization must still be enforced with rules and server checks.
3. Enable Google authentication and configure authorized development/production domains. Choose a support email owned by the operator.
4. Choose a Firestore region deliberately before creating the database. Begin with locked access, then deploy reviewed rules alongside the implementation.
5. Review billing requirements before activating Storage or App Hosting. Existing Vercel hosting can be retained; Firebase does not require a hosting migration.
6. Create a Gemini key in https://aistudio.google.com/apikey and configure it only in ignored local environment configuration and the hosting secret manager. Never use NEXT_PUBLIC for this key. Never commit it.

## Implementation design
Retain university/faculty/department IDs. Collections: users (minimal preferences), memberships (owner-controlled department assignments), content (kind/status/department/levels/source/timestamps/author), submissions (private pending records), bookmarks (per-user records), audit events (server-only). File metadata belongs to reviewed content; pending files remain private.

Public reads: published records only. Users: own profile/bookmarks; no role editing. Contributors: create/read own pending submissions. Publishers: manage permitted department content, with server validation of every field and transition. Administrators: scoped membership/moderation powers. No arbitrary role field accepted from a client. Admin SDK access would bypass Firestore rules. The current implementation uses FirebaseServerApp with user credentials so rules remain enforced; server authorization must also be tested.

Gemini: authenticated server endpoint, bounded request size, durable user quotas, timeout and error handling. Retrieve permitted published records on the server; never trust supplied snippets or include private drafts. Return source IDs validated against retrieved records. Treat retrieved text as data, not instructions; verify refusal/insufficient-evidence behavior. Do not activate a public unrestricted key-backed endpoint.

## Required verification
Emulator rules tests for anonymous writes, role escalation, cross-department mutation, draft visibility, revoked memberships and private files. Integration tests for Google sign-in, persistence, submission review, publish/archive and source-grounded Gemini answers. Live tests require the actual configured project/key and approved accounts. Release remains incomplete until these tests and deployed smoke checks pass.

## November 5 local verification
Firebase SDK installed and pinned in package.json/package-lock.json. Lint, typecheck, the 125 existing tests and production build passed on the available Node 26 runtime (repository target remains Node 24). Build includes /sign-in. The existing tests cover discovery/content, not live Google login. Git check-ignore confirms .env.local is excluded; diff --check passed. Local production preview restarted. Google provider/domain setup and real browser login are still pending; no Firestore access, publication privileges, deployment or Gemini calls were verified.

## November 5 — core content implementation (not live)
The owner authorized restoring the full product and core-first implementation. Local code now includes `/publisher`, `/api/publisher/content`, `firestore.rules`, and a Firestore public-content reader. This supersedes the earlier statement that publishing code does not exist, not the historical demo evidence.

The server uses FirebaseServerApp with the caller's ID token: database rules remain enforced, unlike Admin SDK access. Membership documents live at `memberships/{uid}/departments/{departmentId}` with `active: true` and `allowedLevels: ["100", "200", ...]` matching the department taxonomy. Only a trusted project owner may provision a manually approved department publisher. Client membership writes are denied. Content writes and append-only publication audit entries occur atomically. No public submission or role-granting interface is implemented.

`CONTENT_SOURCE=demo` and `PUBLISHING_ENABLED=false` are the safe defaults in `.env.example`. The former selects fictional fixtures versus published Firestore records; the latter gates the server write endpoint. The write flag does not replace database rules. Do not deploy permissive rules. Public reads and the publisher list currently cap results at 100 records; pagination is required before larger-scale use.

### Next setup steps
1. In Firebase project `fir-9-dojo-13400`, open Build → Firestore Database → Create database. Choose Standard edition if asked, review the location, and start in production/locked mode. Do not use open test rules. The owner confirmed the database is not created yet.
2. Verify Google authentication and a real sign-in on an authorized domain.
3. Install compatible Java/emulator tooling and execute rules tests for anonymous access, draft visibility, cross-department writes, revoked membership, forged authors/audits and immutable fields. Java was unavailable during this implementation; rules remain unverified and undeployed.
4. After review and successful tests, deploy the reviewed rules to the intended project and provision a test publisher manually. Enable local switches, then verify create, reload, edit, publish, public read, archive and revocation with fictional test content.

The Gemini key is present in ignored local configuration; validity is untested and no Gemini endpoint exists yet. No privileged service-account credential is needed for the current user-context implementation. No database, membership, production configuration or cloud deployment was changed.


### Executed checks for this core slice
November 5: lint, TypeScript checking, all 135 unit tests (including 10 publisher-validation cases), and production build passed on Node 26 (target remains Node 24). Build includes the publisher page and API. Git whitespace check passed; `.env.local` remains ignored. No emulator/rules tests, live Firebase persistence, real sign-in, publisher browser journey, or cloud deployment were executed. These checks do not establish launch readiness.

## November 5 — observed cloud state and student account integration
The default database already exists (Standard edition, eur3). Existing console rules expired September 7, 2022, blocking app reads/writes. Do not recreate the database. Google and Email/Password were observed enabled in the actual Firebase console. Authorized domains: localhost, fir-9-dojo-13400.firebaseapp.com and fir-9-dojo-13400.web.app. The Vercel domain and 127.0.0.1 were not listed. Use http://localhost:3000 for local Google sign-in.

Student account routes and private academic-profile persistence are implemented locally. Academic preferences are stored at studentProfiles/{uid}; display names are managed by Firebase Authentication. Proposed rules do not grant publishing rights through profiles. A separate users collection, if one exists from older work, is untouched. The existing rules remain undeployed; profile/cloud content access will fail until reviewed rules are published.

Local test tooling is being prepared using Firebase emulators and an isolated demo-campus-core project. Test fixtures are fictional and no live accounts or content are created by those tests. The browser preview was blocked by automatic approval review due to an account usage limit; no alternate browser path was used to bypass it.
