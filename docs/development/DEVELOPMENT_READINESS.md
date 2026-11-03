# Frontend foundation approval proposal

Status: owner approved and frontend foundation executed November 3. The proposal below is preserved as approval history, not current missing work. Actual pinned versions, compatibility corrections and checks: [foundation verification](FOUNDATION_VERIFICATION.md). Backend architecture/service/deployment approvals remain separate. Root: `/Users/ume/Desktop/campus-core`.

## Exact intended changes
- Create package.json/package-lock.json with npm scripts dev, build, start, lint, typecheck, test, format and format:check.
- Create tsconfig.json (strict, `@/*` → src), next-env.d.ts, next.config.ts, postcss.config.mjs and eslint.config.mjs (Next rules plus Prettier compatibility).
- Create .prettierrc.json (2 spaces, semicolons, double quotes, trailing commas) and .prettierignore (generated output/lockfile); do not blanket-format existing specifications.
- Create src/app/layout.tsx, page.tsx, globals.css with Tailwind and minimal shadcn theme tokens, system font, metadata/noindex and neutral demo foundation page. This is not the final dashboard.
- Create components.json, src/lib/utils.ts, src/lib/utils.test.ts and one shadcn-compatible src/components/ui/button.tsx, manually using the official installation pattern; install only its required dependencies. No component generator overwrites.
- Create .env.example with optional `NEXT_PUBLIC_APP_URL=http://localhost:3000` and comments that P0 needs no secrets/services. No Supabase key or fake credential values; backend environment requirements deferred to P1 review.
- Update README, task/check evidence and .gitignore only if generated output needs additional exclusions. Preserve AGENTS and all docs. No migrations, Supabase clients, APIs, auth forms, deployment configuration or CI provider connection.

Source growth: src/app routes/layouts; src/components reusable UI; src/features/discovery, announcements, resources and events added only when used; src/data/demo.ts and typed identifiers for P0 records. No empty speculative directory tree or generic backend abstraction.

## Proposed commands (only after approval)
Manual setup avoids create-next-app colliding with existing README/docs. First inspect runtime and stable package metadata, then create the configuration files described above with targeted patches.

```sh
cd /Users/ume/Desktop/campus-core
node --version
npm --version
npm view next@latest version engines peerDependencies --json
npm view eslint-config-next@latest version peerDependencies --json
npm view vitest@latest version engines peerDependencies --json
npm install --save-exact next@latest react@latest react-dom@latest clsx tailwind-merge class-variance-authority @radix-ui/react-slot
npm install --save-dev --save-exact typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next eslint-config-prettier prettier vitest
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
npm audit
```

Resolve compatible stable package versions before installation, keep Next and its ESLint config aligned and pin direct versions/lockfile. Stop on incompatibility rather than using --force or --legacy-peer-deps. No npm audit fix --force. Exact resolved versions will be recorded after approval; none has been installed or claimed validated now. Network package downloads are part of requested approval; no paid services.

Dev smoke command: `npm run dev -- --hostname 127.0.0.1 --port 3000`. Production smoke after build: `npm run start -- --hostname 127.0.0.1 --port 3001`. Run each in a managed background process, capture logs to temporary files, request localhost with curl, confirm expected markup, inspect errors and terminate only the launched PID. Do not kill existing port owners; select an unused port if needed. Manual browser review remains separate from HTTP verification.

## Git and verification workflow
Inspect Git status before/after changes; preserve uncommitted owner work. No automatic commit/push or branch switching. After review, Samuel may use a feature branch and focused commit containing source/config/tests/lockfile and updated evidence. Never stage .env files. All checks must actually run before CC-101 moves to review; report failures and network/browser limitations honestly.

## Reference basis
Official Next.js installation documentation was checked; manual creation is proposed because this is an existing repository. Official shadcn manual installation and Prettier installation guidance were checked for selective setup and ESLint coexistence. Recheck package compatibility at execution; documentation lookup is not package verification. Reference locations:

```text
https://nextjs.org/docs/app/getting-started/installation
https://ui.shadcn.com/docs/installation/manual
https://prettier.io/docs/install
```