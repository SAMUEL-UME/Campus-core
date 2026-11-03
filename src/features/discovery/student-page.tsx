import Link from "next/link";
import { ContextSelector } from "./context-selector";
import {
  resolveContext,
  sectionHref,
  sections,
  type Query,
  type Section,
} from "./context";

export function StudentPage({
  query,
  section,
}: {
  query: Query;
  section: Section;
}) {
  const result = resolveContext(query);
  const { context, complete, department, level } = result;
  const current = sections.find((item) => item.id === section)!;
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <Link
            href={sectionHref("dashboard", context)}
            className="text-2xl font-bold tracking-tight"
          >
            Campus Core
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Your campus, in context.
          </p>
        </div>
      </header>
      <div className="border-b border-border bg-muted px-4 py-3 text-center text-sm">
        <strong>Fictional demonstration.</strong> All taxonomy is provisional.
        Faculty grouping is illustrative, not verified university information.
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)]">
        <nav
          aria-label="Main sections"
          className="grid grid-cols-2 gap-2 self-start md:sticky md:top-4 md:grid-cols-1"
        >
          {sections.map((item) => (
            <Link
              key={item.id}
              href={sectionHref(item.id, context)}
              aria-current={section === item.id ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-md border px-3 py-3 text-sm font-medium ${section === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main id="main-content" tabIndex={-1} className="min-w-0 space-y-6">
          <header className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {complete
                ? `${result.university?.name} / ${department?.name} / ${level?.name}`
                : "Start with your academic context"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {section === "dashboard" && complete
                ? `${department?.name} dashboard`
                : current.label}
            </h1>
            <p className="text-muted-foreground">
              {complete
                ? `Showing your selected ${level?.name} context. No live campus content is connected.`
                : "Select a university, faculty, department and academic level to explore the demo."}
            </p>
          </header>
          {result.invalid && (
            <div
              role="alert"
              className="rounded-md border border-border bg-muted p-4"
            >
              This link contains an unsupported academic selection. Valid parent
              choices were kept; please choose the remaining fields again.
            </div>
          )}
          <section
            aria-label="Academic selection"
            className="rounded-lg border border-border bg-card p-4 sm:p-6"
          >
            <ContextSelector
              key={sectionHref(section, context)}
              context={context}
              section={section}
            />
          </section>
          {!complete ? (
            <section className="rounded-lg border border-dashed border-border p-6">
              <h2 className="text-lg font-semibold">
                Your campus view is waiting
              </h2>
              <p className="mt-2 text-muted-foreground">
                Apply a complete selection above. You can explore sections
                without losing your applied choices.
              </p>
            </section>
          ) : section === "dashboard" ? (
            <section aria-labelledby="explore-heading">
              <h2 id="explore-heading" className="mb-4 text-xl font-semibold">
                Explore your department
              </h2>
              <div className="grid gap-4 lg:grid-cols-3">
                {sections
                  .filter((item) => item.id !== "dashboard")
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={sectionHref(item.id, context)}
                      className="rounded-lg border border-border bg-card p-5 hover:bg-muted"
                    >
                      <h3 className="font-semibold">
                        {item.label} <span aria-hidden="true">→</span>
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="mt-4 text-xs font-medium">
                        Preview only · content not implemented
                      </p>
                    </Link>
                  ))}
              </div>
            </section>
          ) : (
            <section className="rounded-lg border border-dashed border-border p-6">
              <h2 className="text-xl font-semibold">
                No {current.label.toLowerCase()} available in this preview
              </h2>
              <p className="mt-2 text-muted-foreground">
                Navigation is ready for {department?.name}, {level?.name}.
                Listings and detail pages are not implemented yet; they are the
                next task, CC-103.
              </p>
              <Link
                className="mt-4 inline-flex min-h-11 items-center font-medium underline"
                href={sectionHref("dashboard", context)}
              >
                Back to your dashboard
              </Link>
            </section>
          )}
        </main>
      </div>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        Independent student project. No official university affiliation or
        endorsement. No account is required; your applied selection is stored in
        the page URL, not a student profile.
      </footer>
    </div>
  );
}
