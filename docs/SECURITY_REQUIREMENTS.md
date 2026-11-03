# Campus Core — Security Requirements

**Version:** 0.1 | **Status:** Requirements proposed; implementation not verified | **Owner:** Samuel

## 1. Threat model
Assets: publisher accounts, administrative privileges, unpublished content, student trust, source links, and database integrity. Threats: unauthorized publishing, cross-department access, account takeover, XSS, injection, unsafe links, content spoofing, abuse, accidental secret exposure, and stale withdrawn content.

## 2. Mandatory controls
| ID | Control | Verification |
|---|---|---|
| SEC-01 | Server-side authentication for all write operations | Anonymous write tests fail |
| SEC-02 | Department-scoped authorization and RLS | Publisher A cannot access department B writes |
| SEC-03 | Admin privileges cannot be self-assigned | Role escalation tests fail |
| SEC-04 | Input validation and bounded lengths | Invalid payload tests fail safely |
| SEC-05 | Safe rendering of user-controlled text; no unsafe HTML | XSS test cases |
| SEC-06 | Secret keys only in server environment; `.env` ignored | Repo/CI secret scan |
| SEC-07 | HTTPS in deployment; secure session/cookie handling | Deployment verification |
| SEC-08 | Rate limits for sign-in and sensitive mutations | Abuse tests |
| SEC-09 | Minimal audit logs for publish/withdraw/membership changes | Audit events verified |
| SEC-10 | Public reads exclude drafts, withdrawn, restricted content | API, cache and sitemap tests |
| SEC-11 | External links validated and safely opened | URL scheme tests |
| SEC-12 | Dependency checks and lockfile discipline | CI audit review |
| SEC-13 | Error responses avoid leaking credentials, stack traces, PII | Failure-path review |
| SEC-14 | Backups and restoration procedure before real pilot | Restore exercise documented |

## 3. Authentication and authorization
Use Supabase Auth if approved. Publisher accounts require explicit admin-approved memberships. Verify authorization per mutation, never from a client-supplied role. Revoke access immediately when membership is withdrawn. Use least privilege for all service credentials.

## 4. Privacy and content
Collect no student account information for MVP. Do not upload real student lists, private class materials, or copyrighted documents without permission. Define retention and deletion procedures before collecting personal data. Publisher attribution must balance accountability with privacy.

## 5. Operational rules
- Never paste secrets into AI prompts, issues, logs, screenshots, or docs.
- Review SQL migrations and privileged commands before execution.
- Do not automatically approve destructive Cline actions.
- Track vulnerabilities with severity, owner, mitigation, and verification.
- Report incidents without claiming capabilities that have not been implemented.

## 6. Security release gate
No known critical/high unauthorized-access defects; cross-department negative tests passed; secrets scan reviewed; auth, RLS, public content exposure, and withdrawal behavior tested. Mark untested controls as **Not Verified**, never Passed.

P0 read-only demo applicability: verify no write/auth/admin endpoints, service keys, sensitive data, unsafe links or unescaped HTML; test department filtering and noindex. Authentication, RLS, audit and database restore remain unimplemented P1 controls, not passed checks. They can be marked not applicable to a particular read-only release only with verified absence of backend features and reviewer rationale. The full gate applies before P1 activation.
