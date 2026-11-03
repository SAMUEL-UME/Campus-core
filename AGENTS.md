# Campus Core agent instructions

Primary agent instruction source. Root: `/Users/ume/Desktop/campus-core`.

## Start each session
Read [index](docs/INDEX.md), [current sprint](docs/planning/CURRENT_SPRINT.md), task board, relevant requirements, architecture, security/compliance, UX and SEO. Inspect code and Git changes before editing. Explain the plan and resolve critical dependencies first.

## Authority and product
- Samuel owns final technical/business decisions; Adimchi product, Lawrence QA/UX, Chidera communication. Do not invent their progress or contact them without authorization.
- Preserve the core discovery/announcements/resources/events MVP and long-term product direction.
- The stack is provisional. Frontend foundation requires explicit approval of setup changes/commands. Backend architecture approval remains mandatory before migrations or service connections; it need not block separately approved read-only P0 scaffolding.
- Request approval for significant architecture/scope changes, authorization policy changes, paid services, public deployment, production configuration, important deletion, or destructive operations.
- Ordinary approved implementation decisions do not require repeated permission.

## Engineering
- Use actual installed conventions, readable TypeScript, explicit validation, and small feature modules. No speculative infrastructure.
- Authentication identifies a user; authorization must be checked on every operation and enforced with database policies. Never trust client roles or hide pages as a security control.
- Direct publication requires manually approved department-scoped publisher membership. Untrusted material is private until reviewed. A public submission UI is not yet approved.
- Never expose privileged credentials, log sensitive data, or use real student data in fixtures. Preserve user changes and incoming specifications.
- Stitch visuals do not create requirements; corresponding screens require approved behavior/design.

## Documentation and verification
The index names each authoritative source. Link requirements rather than duplicating them. Preserve historical decisions. Distinguish approved requirements, proposals, implemented behavior and verified behavior.

Task statuses: Backlog, Ready, In Progress, Blocked, In Review, Completed. Completion requires acceptance criteria, executed relevant checks, security consideration, no blocking issues, updated documentation and review readiness. Do not mark planned functionality done.

After work: inspect edited files; run relevant checks when available; update task evidence, decisions and affected audit documents. Report absolute file paths, executed checks, failures, limitations and next task. Never claim unexecuted tests passed. Baseline Vitest tests and lint/typecheck/build scripts now exist; run relevant checks for changes.