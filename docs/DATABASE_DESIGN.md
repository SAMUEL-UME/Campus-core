# Campus Core — Database Design

CC-102 reference-data update (not a migration): the owner-supplied TypeScript directory retains stable faculty/department IDs, faculty slugs scoped to university and department slugs scoped to faculty. Levels are department-specific. Discovery URLs use IDs, not proposed public slug routes. This does not approve or implement the proposed database constraints below; reconcile any wider slug-uniqueness proposal before backend approval. Verification notes remain source data and are displayed in discovery. See [CC-102 evidence](development/STUDENT_EXPERIENCE_VERIFICATION.md).

**Version:** 0.2 | **Status:** Refined logical proposal awaiting architecture approval; no migrations | **Owner:** Samuel

## 1. Design rules
Use UUID primary keys, foreign keys, timestamps with timezone, unique constraints, indexes for common public filters, and PostgreSQL RLS. Store university/faculty/department relationships explicitly so future institutions can be added without rebuilding the schema. Avoid collecting student personal data in MVP.

## 2. Proposed entities
| Entity | Core fields | Notes |
|---|---|---|
| universities | id, name, slug, status, created_at | UNIZIK pilot; unique slug |
| faculties | id, university_id, name, slug | Unique slug within university |
| departments | id, university_id, faculty_id, name, slug, status | Explicit tenant ID constrained to faculty's university |
| department_levels | id, department_id, level_code, sort_order | Not all departments share levels |
| publisher_memberships | id, user_id, department_id, role, approved_by, approved_at, revoked_at | Explicit approved scoped access |
| university_admin_memberships | id, user_id, university_id, approved_by, approved_at, revoked_at | No automatic global privilege or publisher grant |
| publisher_profiles | user_id, display_name | Minimal display attribution; do not expose auth emails |
| announcements | id, department_id, title, body, source_label, source_url, status, author_id, published_at, updated_at, expires_at | Optional audience levels via join table |
| announcement_levels | announcement_id, department_level_id | Audience mapping |
| resources | id, university_id, department_id, course_code, title, resource_type, external_url, source_label, source_url, status, created_by, timestamps, last_checked_at | Curated links; levels via resource_levels |
| events | id, university_id, department_id nullable, scope, title, description, organizer, venue/online_url, starts_at, ends_at, timezone, source_label, source_url, status, event_status, timestamps | University or department scope; cancellation distinct from publication state |
| resource_levels / event_levels | content_id, department_level_id, department_id | Typed audience joins, not generic polymorphic relations |
| publication_audit_events | id, actor_id, entity_type, entity_id, action, occurred_at, metadata | Minimize personal/sensitive data |

## 3. Constraints and integrity
- Unique `(university_id, slug)` for faculties; `(faculty_id, slug)` for departments.
- Validate status against controlled enum/check values.
- Enforce `ends_at >= starts_at` when end exists.
- Enforce valid department-level associations; a level linked to an announcement/resource must belong to that department.
- Prefer soft withdrawal and audit records over silent destructive deletion.
- Enforce uniqueness for active publisher membership per `(user_id, department_id, role)`.
- Index public content on `(department_id, status, published_at)` and relevant level/course/date fields.
- Include university_id on announcements and publisher_memberships too. Composite foreign keys must ensure faculty, department, membership and content IDs refer to the same university; client-supplied tenant IDs are not authority.
- Use department slug uniqueness within university, matching public route examples; supersedes faculty-only uniqueness if this design is approved.
- Typed audience joins must constrain their department to both the content and department_level. No audience rows means all levels within scope. Resources may target multiple levels.
- Events: department scope requires department_id; university scope requires it absent and has no department-level audience. Announcements/resources remain departmental initially.
- Standardize created_at, updated_at, created_by, published_at and source_label on content. Source URL may be absent when a permissioned offline source is described. Require attribution before publication.
- Published announcements/resources with expires_at in the past are excluded from public reads; event end time is not automatic withdrawal. Cancelled events may stay public with a clear label. Retention/deletion policy needs approval.
- Membership and publication transitions must produce protected audit entries atomically; clients cannot forge actor identity or edit audit history. Membership revocation must affect subsequent operations immediately. Prevent tenant reassignment and self-granting through both update checks and privileges.

## 4. Access-control matrix
| Operation | Visitor | Approved publisher | Admin |
|---|---|---|---|
| Read published permitted content | Yes | Yes | Yes |
| Read drafts | No | Assigned department only | Assigned university only |
| Create/edit assigned department content | No | Yes, active approved membership | Requires publisher membership for direct publishing |
| Withdraw content | No | Assigned department | Assigned university |
| Direct publish | No | Assigned department only | Not by administrator role alone |
| Review untrusted or campus-wide material | No | No by publisher role alone | Assigned university, explicit reviewer checks |
| Grant/revoke publisher memberships | No | No | Departments in assigned university only |
| Grant administrator memberships | No | No | Separate Samuel-approved bootstrap process |
| View audit data | No | No initially | Assigned university only |

RLS must enforce these restrictions at the database level. Server checks and input validation remain mandatory. The service-role key must never be exposed in client code.

## 5. Queries to optimize
- Published announcements by department and level, newest first.
- Active events by department, chronological.
- Published resources by department, level, course code, and type.
- Membership lookup for current authenticated publisher.

## 6. Migration and seed policy
Version all migrations; review destructive changes; test RLS with anonymous, publisher A, publisher B, and admin identities; seed only fictional or authorized content. Backup/restore procedures are required before production data collection.

## 7. Open questions
Physical SQL, RLS policies, initial admin provisioning, retention and reviewed-edit behavior require approval. Tenant/level composite constraints, multiple resource levels and university-scoped events are recommendations, not implemented policies.

## 8. Proposed content lifecycle and moderation
States: draft, pending_review, published, rejected, archived, withdrawn. Public reads require published state plus relevant expiry/visibility checks. Event cancellation is a separate field.

- Approved departmental publisher: draft → published within scope; published edits allowed within scope and audited; archive/withdraw permitted.
- Untrusted material: draft/intake → pending_review → published or rejected, only by scoped reviewer. A reviewed approval is not an untrusted author's direct-publication privilege.
- Campus-wide events: proposed pending_review → published by a university reviewer, not direct publication by an unrestricted administrator. Samuel must approve this exception workflow and whether a distinct reviewer is required.
- Withdrawn records are not publicly served; republication follows the relevant trust path. Any future untrusted edit to approved content returns to review; no silent public updates. Recommend unpublishing during review rather than versioned revision machinery initially; approve the UX tradeoff before adding submissions.
- No submission accounts or intake tables are implemented/authorized by this schema proposal. External intake may be manually reviewed, then entered by an approved publisher; record provenance without unnecessary submitter PII.

## 9. Test obligations
Anonymous, approved publisher, revoked publisher, same-university other department, second synthetic university, university administrator, and nonmember identities. Test direct API reads/writes, status transitions, old/new row update checks, membership escalation, invalid audience links, audit integrity, cache/metadata/sitemap leaks and withdrawal. Test RLS itself, not only mocked server helpers. No real second university onboarding is needed for synthetic isolation tests.
