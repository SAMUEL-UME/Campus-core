import Link from "next/link";
import { redirect } from "next/navigation";
import { type Query, sectionHref } from "@/features/discovery/context";

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
    <div className="welcome">
      <header className="welcome-nav">
        <Link href="/" className="wordmark">
          <span className="brand-mark">C</span>Campus Core
          <span className="brand-dot">.</span>
        </Link>
        <nav aria-label="Welcome navigation">
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up" className="welcome-button">
            Create an account <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="welcome-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span /> BUILT AROUND YOUR CAMPUS LIFE
            </span>
            <h1>
              Less searching.
              <br />
              More <em>belonging.</em>
            </h1>
            <p>
              Your department’s updates, study resources and what’s happening
              next. Together in one place, wherever your day takes you.
            </p>
            <div className="hero-actions">
              <Link href="/dashboard" className="welcome-button">
                Find my department <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={sectionHref("dashboard", sample)}
                className="text-link"
              >
                Take a look around ↗
              </Link>
            </div>
            <p className="hero-note">
              Starting with UNIZIK. Open to explore. No account needed.
            </p>
          </div>
          <div
            className="hero-preview"
            aria-label="Preview of Campus Core sample content"
          >
            <div className="preview-top">
              <span className="mini-mark">C</span>
              <span>YOUR CAMPUS SPACE</span>
              <span className="preview-pill">Preview</span>
            </div>
            <div className="preview-body">
              <p className="eyebrow">COMPUTER SCIENCE · 200 LEVEL</p>
              <h2>A little more connected.</h2>
              <p className="preview-subtitle">
                Make room for what matters today.
              </p>
              <div className="preview-shortcuts">
                <Link href={sectionHref("announcements", sample)}>
                  <span>↗</span>Updates
                </Link>
                <Link href={sectionHref("resources", sample)}>
                  <span>▤</span>Resources
                </Link>
                <Link href={sectionHref("events", sample)}>
                  <span>▦</span>Events
                </Link>
              </div>
              <Link
                href={sectionHref("announcements", sample)}
                className="preview-notice"
              >
                <span className="eyebrow">DEPARTMENT BULLETIN</span>
                <h3>A new way to plan your study week</h3>
                <p>
                  Explore the sample notice and find a little inspiration for
                  your next study session.
                </p>
                <span className="preview-read">Read the bulletin →</span>
              </Link>
              <div className="preview-bottom">
                <span className="resource-symbol">▤</span>
                <div>
                  <strong>Your next study session, sorted.</strong>
                  <p>Original study guides · Sample library</p>
                </div>
                <span>↗</span>
              </div>
            </div>
            <span className="preview-caption">
              Fictional content shown for preview
            </span>
          </div>
        </section>
        <section className="welcome-explore" aria-labelledby="explore-title">
          <div>
            <span className="eyebrow">ONE PLACE. YOUR PEOPLE.</span>
            <h2 id="explore-title">
              A better starting point
              <br />
              for your study day.
            </h2>
          </div>
          <p>
            From the update you almost missed to the resource you’ve been
            looking for. Start with your department and explore what’s relevant
            to you.
          </p>
        </section>
        <section className="welcome-features" aria-label="Explore Campus Core">
          {[
            {
              number: "01",
              title: "Stay in the loop",
              text: "A focused department bulletin. Find announcements by topic and level, with sources and dates in view.",
              section: "announcements" as const,
              label: "Explore updates",
            },
            {
              number: "02",
              title: "Find your next resource",
              text: "A calmer place for study guides and academic materials. Spend more time learning and less time looking.",
              section: "resources" as const,
              label: "Browse resources",
            },
            {
              number: "03",
              title: "Be part of campus life",
              text: "See what’s coming up, check the details, and find the activities that bring your campus together.",
              section: "events" as const,
              label: "Discover events",
            },
          ].map((item) => (
            <Link
              href={sectionHref(item.section, sample)}
              className="welcome-feature"
              key={item.number}
            >
              <span className="feature-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="text-link">{item.label} ↗</span>
            </Link>
          ))}
        </section>
        <section className="welcome-cta">
          <div>
            <span className="eyebrow">MAKE YOURSELF AT HOME</span>
            <h2>Your department is a good place to start.</h2>
          </div>
          <Link href="/dashboard" className="welcome-button">
            Choose my department →
          </Link>
        </section>
      </main>
      <footer className="welcome-footer">
        <span className="wordmark">Campus Core.</span>
        <p>
          Independent student platform. Not affiliated with or endorsed by
          UNIZIK. Current content is fictional sample material; directory
          mappings are not independently verified.
        </p>
        <Link href="/dashboard">Explore campus ↗</Link>
      </footer>
    </div>
  );
}
