import Link from "next/link";
import { redirect } from "next/navigation";
import {
  type Query,
  resolveContext,
  sectionHref,
} from "@/features/discovery/context";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  if (
    ["university", "faculty", "department", "level"].some(
      (key) => query[key] !== undefined,
    )
  ) {
    const params = new URLSearchParams();
    for (const key of ["university", "faculty", "department", "level"]) {
      const value = query[key];
      if (Array.isArray(value))
        value.forEach((item) => params.append(key, item));
      else if (value !== undefined) params.set(key, value);
    }
    redirect(`/dashboard?${params}`);
  }
  const sample = {
    university: "unizik",
    faculty: "unizik-physical-sciences",
    department: "unizik-physical-sciences-computer-science",
    level: "200",
  };
  return (
    <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
      <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
        <span className="text-xl font-bold">Campus Core</span>
        <span className="rounded-md bg-muted px-3 py-2 text-xs font-semibold">
          Independent student demo
        </span>
      </header>
      <main id="main-content" tabIndex={-1} className="py-12 sm:py-20">
        <p className="mb-4 text-sm font-semibold text-accent">
          UNIZIK academic discovery
        </p>
        <h1 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          Your department.
          <br />
          Your study day.
          <br />
          One place to start.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Find announcements, study resources and events in your academic
          context. No account needed.
        </p>
        <div className="my-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            Choose your department →
          </Link>
          <Link
            href={sectionHref("dashboard", resolveContext(sample).context)}
            className="inline-flex min-h-12 items-center rounded-md border border-border bg-card px-5 py-3 font-semibold"
          >
            Explore a sample
          </Link>
        </div>
        <p className="max-w-2xl rounded-lg border border-border bg-muted p-4 text-sm leading-6">
          <strong>
            Fictional demonstration, not an official university service.
          </strong>{" "}
          All content examples are fictional. The owner-supplied directory
          includes 14 faculties and 86 departments; academic mappings and level
          ranges are not independently verified.
        </p>
        <section
          aria-label="What you can explore"
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              title: "Department updates",
              text: "Read sample academic and departmental notices in one focused bulletin.",
            },
            {
              title: "Study resources",
              text: "Explore original sample study guides, organised by department and level.",
            },
            {
              title: "Campus events",
              text: "See how event dates, locations and cancellation notices will appear.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </section>
      </main>
      <footer className="border-t border-border py-6 text-sm text-muted-foreground">
        Independent student project. No official university affiliation or
        endorsement. No sign-in, uploads or tracking.
      </footer>
    </div>
  );
}
