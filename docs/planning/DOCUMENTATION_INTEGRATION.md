# Specification integration report

Date: November 3, 2026. Reviewed all 11 supplied Markdown specifications, listed in [index](../INDEX.md). The initial scan contained only an empty README. The specifications appeared during work; an attempted add-file patch stopped on the collision before changes were applied. They were then read before integration. No supplied files were deleted or moved.

## Resolutions
| Issue | Resolution |
| --- | --- |
| Product/stack still wholly proposed | Record accepted core direction and provisional stack; retain detailed architecture approval gate. |
| Direct publishing versus review still open | Owner decided: moderation-first for untrusted material; direct publication only for manually approved department publishers. |
| Admin implicitly unrestricted across institutions | Replace with proposed university-scoped admin matrix; no automatic direct-publish privilege. Policy implementation still needs approval. |
| Department-only events cannot represent campus-wide events | Propose explicit university scope for events; university-admin review/publication flow needs owner decision. |
| Multi-university data consistency underspecified | Propose tenant IDs and composite constraints preventing cross-university/level reassignment. |
| Resources single-level while announcements multi-level | Propose typed audience joins for all categories; no audience rows means all levels in scope. |
| Optional SEO versus release/privacy requirements | Baseline metadata and public-only indexing are release requirements; advanced SEO remains later. |
| Resource previews/attachments imply extra scope | Clarify external links only; no uploads or server-fetched previews. |
| Pilot department assumed selected | One department is a recommended initial size, not a confirmed department or coverage commitment. |
| Titan / six-day hackathon / top-idea selection | Preserve as unverified supplied-document notes, not owner-confirmed facts or schedule inputs. |
| “Survey synthesis” assumes existing survey | Explicitly note no survey evidence supplied; research tasks await evidence. |
| Broad compliance “no controls” claim | Distinguish repository secret-ignore hygiene from unimplemented application controls. |

## Open gaps, not resolved by documentation
November 3 update: owner confirmed November 6 deadline date, 15–25 hours/week and multiple UNIZIK departments, superseding the earlier single-department suggestion. Exact cutoff/timezone, official brief, actual remaining hours, named departments/content owners, approved designs and backend details remain open. P0 is now a read-only fictional demo; publishing/auth is P1. See [decision log](DECISION_LOG.md), [risks](RISKS.md), and [task board](TASK_BOARD.md).

## Preservation and ownership
Existing 11 filenames remain stable, preserving useful sections and original requirement IDs. New operational docs use subdirectories. No archive copies were created because those would duplicate sources of truth. Earlier proposals are recorded here and in decision history; changed normative sections reflect the latest owner instruction.