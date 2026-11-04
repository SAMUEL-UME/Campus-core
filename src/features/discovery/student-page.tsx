import Link from "next/link";
import { ContentCard, ContentView } from "../content/content-view";
import { scopedRecords } from "../content/catalog";
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
  detailId,
}: {
  query: Query;
  section: Section;
  detailId?: string;
}) {
  const result = resolveContext(query);
  const { context, complete, department, level } = result;
  const current = sections.find((item) => item.id === section)!;
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Campus Core
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Student demo · No account needed
          </p>
        </div>
      </header>
      <div className="border-b border-border bg-muted px-4 py-3 text-center text-sm">
        <strong>Fictional demonstration.</strong> Academic selections use
        owner-supplied UNIZIK reference data. Programme mappings and level
        ranges are not independently verified; this is not an official
        directory.
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)]">
        <nav
          aria-label="Main sections"
          className="hidden gap-2 self-start md:sticky md:top-4 md:grid md:grid-cols-1"
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
                ? `${result.university?.name} / ${result.faculty?.name} / ${department?.name} / ${level?.name}`
                : "Start with your academic context"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {section === "dashboard" && complete
                ? `${department?.name} dashboard`
                : current.label}
            </h1>
            <p className="text-muted-foreground">
              {complete
                ? `Your ${level?.name} study space. All notices, resources and events below are demonstration examples.`
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
          <details
            open={!complete}
            aria-label="Academic selection"
            className="rounded-lg border border-border bg-card p-4 sm:p-6"
          >
            <summary className="min-h-11 cursor-pointer font-semibold">
              {complete ? "Change academic context" : "Choose academic context"}
            </summary>
            <ContextSelector
              key={sectionHref(section, context)}
              context={context}
              section={section}
            />
          </details>
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
                      <p className="mt-4 text-xs font-medium text-accent">
                        {scopedRecords(item.id, context).length} demo items ·
                        Explore →
                      </p>
                    </Link>
                  ))}
              </div>
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Department bulletin</h2>
                {scopedRecords("announcements", context)
                  .slice(0, 2)
                  .map((item) => (
                    <ContentCard key={item.id} item={item} context={context} />
                  ))}
                {scopedRecords("announcements", context).length === 0 && (
                  <p className="rounded-lg border border-dashed border-border p-5 text-muted-foreground">
                    No demonstration notices for this selection yet. Try
                    Computer Science, Mathematics or Medicine to explore sample
                    content.
                  </p>
                )}
              </div>
            </section>
          ) : (
            <ContentView
              kind={section}
              context={context}
              query={query}
              detailId={detailId}
            />
          )}
        </main>
      </div>
      <nav
        aria-label="Mobile sections"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {sections.map((item) => (
          <Link
            key={item.id}
            href={sectionHref(item.id, context)}
            aria-current={section === item.id ? "page" : undefined}
            className={`flex min-h-12 items-center justify-center rounded-md px-1 text-xs font-semibold ${section === item.id ? "bg-muted text-accent" : "text-muted-foreground"}`}
          >
            {item.id === "announcements"
              ? "Updates"
              : item.id === "dashboard"
                ? "Home"
                : item.label}
          </Link>
        ))}
      </nav>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        Independent student project. No official university affiliation or
        endorsement. No account is required; your applied selection is stored in
        the page URL, not a student profile.
      </footer>
    </div>
  );
}
