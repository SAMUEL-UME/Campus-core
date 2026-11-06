import Link from "next/link";
import { publicRecords } from "../content/public-records";
import { SectionIcon } from "@/components/ui/section-icon";
import { ContentCard, ContentView } from "../content/content-view";
import {
  detailHref,
  filterRecords,
  formatDate,
  scopedRecords,
} from "../content/catalog";
import { ContextSelector } from "./context-selector";
import { StudentGreeting, StudentShell } from "../workspace/student-shell";
import {
  resolveContext,
  sectionHref,
  sections,
  type Query,
  type Section,
} from "./context";
const sample = {
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
};
export async function StudentPage({
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
  const records = complete ? await publicRecords(context.department) : [];
  const live = process.env.CONTENT_SOURCE === "firestore";
  const current = sections.find((s) => s.id === section)!;
  const notices = scopedRecords("announcements", context, records),
    resources = scopedRecords("resources", context, records),
    events = scopedRecords("events", context, records);
  const upcomingEvents = filterRecords(
    "events",
    context,
    { period: "upcoming" },
    undefined,
    records,
  );
  return (
    <StudentShell active={section} context={context}>
      <header className="workspace-heading">
        <div>
          <span className="eyebrow">
            {section === "dashboard"
              ? "A GOOD DAY STARTS HERE"
              : "YOUR DEPARTMENT, CONNECTED"}
          </span>
          {section === "dashboard" ? (
            <StudentGreeting />
          ) : (
            <h1>
              {current.label}
              <span className="green-period">.</span>
            </h1>
          )}
          <p>
            {complete
              ? `A little more connected to ${department?.name}, ${level?.name}.`
              : "The updates you need. The resources you’ll use. The campus you belong to."}
          </p>
        </div>
        <span className="workspace-badge">
          <span className="status-dot" />
          {live ? "Campus workspace" : "Sample workspace"}
        </span>
      </header>
      {result.invalid && (
        <p role="alert" className="form-alert error">
          This link has an unsupported academic selection. Choose the remaining
          fields below.
        </p>
      )}
      <details
        className={`context-panel ${complete ? "" : "onboarding-panel"}`}
        open={!complete}
      >
        <summary>
          <span className="context-summary">
            <SectionIcon name="campus" />
            <span>
              {complete
                ? `${department?.name} · ${level?.name}`
                : "Let’s find your department"}
              <small>
                {complete
                  ? result.faculty?.name
                  : "Choose your university, department and level to personalize your view."}
              </small>
            </span>
            <span className="context-switch">
              {complete ? "Switch" : "Get started"} <span aria-hidden>⌄</span>
            </span>
          </span>
        </summary>
        <ContextSelector
          key={sectionHref(section, context)}
          context={context}
          section={section}
        />
      </details>
      {!complete ? (
        <section className="onboarding-welcome">
          <div>
            <span className="eyebrow">ONE PLACE FOR YOUR STUDENT LIFE</span>
            <h2>
              Less scrolling.
              <br />
              More getting somewhere.
            </h2>
            <p>
              Choose your department above to bring your updates, study
              resources and campus events together.
            </p>
            <Link className="cc-button" href={sectionHref("dashboard", sample)}>
              Explore a sample dashboard <span>→</span>
            </Link>
          </div>
          <div className="onboarding-stack">
            {[
              {
                icon: "announcements",
                title: "Never miss the memo",
                text: "Department updates in one clear feed.",
              },
              {
                icon: "resources",
                title: "A little help with the next chapter",
                text: "Study materials, organized around you.",
              },
              {
                icon: "events",
                title: "There’s more to campus",
                text: "Make room for what’s happening next.",
              },
            ].map((x) => (
              <div className="onboarding-mini" key={x.icon}>
                <span className="icon-tile">
                  <SectionIcon name={x.icon} />
                </span>
                <div>
                  <strong>{x.title}</strong>
                  <p>{x.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : section === "dashboard" ? (
        <>
          <form
            className="workspace-search"
            action="/announcements"
            method="get"
          >
            <SectionIcon name="search" />
            {Object.entries(context).map(([k, v]) => (
              <input type="hidden" key={k} name={k} value={v} />
            ))}
            <label htmlFor="dashboard-search" className="sr-only">
              Search department announcements
            </label>
            <input
              id="dashboard-search"
              name="q"
              maxLength={100}
              placeholder="Looking for something? Search department updates…"
            />
            <button type="submit" aria-label="Search announcements">
              <SectionIcon name="arrow" />
            </button>
          </form>
          <section
            className="dashboard-shortcuts"
            aria-label="Explore your department"
          >
            {[
              {
                id: "announcements" as const,
                count: notices.length,
                subtitle: "Stay in the loop",
                tone: "green",
              },
              {
                id: "resources" as const,
                count: resources.length,
                subtitle: "Your next study session",
                tone: "blue",
              },
              {
                id: "events" as const,
                count: events.length,
                subtitle: "Make room for campus",
                tone: "amber",
              },
            ].map((item) => (
              <Link
                className="shortcut-card"
                key={item.id}
                href={sectionHref(item.id, context)}
              >
                <div>
                  <span className={`icon-tile ${item.tone}`}>
                    <SectionIcon name={item.id} />
                  </span>
                  <span className="shortcut-count">
                    {item.count} {item.count === 1 ? "item" : "items"}
                  </span>
                </div>
                <h2>
                  {sections.find((s) => s.id === item.id)?.label}
                  <span>↗</span>
                </h2>
                <p>{item.subtitle}</p>
              </Link>
            ))}
          </section>
          <div className="dashboard-columns">
            <div className="dashboard-feed">
              <section>
                <div className="section-heading">
                  <h2>
                    <SectionIcon name="announcements" />
                    Department bulletin
                  </h2>
                  <Link href={sectionHref("announcements", context)}>
                    View all →
                  </Link>
                </div>
                {notices.length ? (
                  <>
                    <article className="priority-card">
                      <div className="priority-meta">
                        <span className="small-badge green">
                          DEPARTMENT UPDATE
                        </span>
                        <span>
                          {notices[0].isDemo !== false
                            ? "Fictional sample"
                            : "Latest notice"}
                        </span>
                      </div>
                      <h3>{notices[0].title}</h3>
                      <p>{notices[0].summary}</p>
                      <div className="priority-bottom">
                        <span>{formatDate(notices[0].publishedAt)}</span>
                        <Link
                          href={detailHref(
                            "announcements",
                            notices[0].id,
                            context,
                          )}
                          className="cc-button small"
                        >
                          Read notice →
                        </Link>
                      </div>
                    </article>
                    {notices.slice(1, 3).map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        context={context}
                      />
                    ))}
                  </>
                ) : (
                  <div className="panel empty-panel">
                    <SectionIcon name="announcements" />
                    <h3>A quieter noticeboard for now.</h3>
                    <p>
                      Published updates for your department will appear here.
                    </p>
                  </div>
                )}
              </section>
              <section>
                <div className="section-heading">
                  <h2>
                    <SectionIcon name="resources" />
                    Your study corner
                  </h2>
                  <Link href={sectionHref("resources", context)}>
                    Open library →
                  </Link>
                </div>
                <div className="resource-stack">
                  {resources.length ? (
                    resources.slice(0, 3).map((item) => (
                      <Link
                        className="resource-row"
                        key={item.id}
                        href={detailHref("resources", item.id, context)}
                      >
                        <span className="resource-cover">
                          <SectionIcon name="resources" />
                          <small>READ</small>
                        </span>
                        <div>
                          <span className="resource-category">
                            {item.category}
                            {item.isDemo !== false ? " · Sample" : ""}
                          </span>
                          <h3>{item.title}</h3>
                          <p>{item.summary}</p>
                        </div>
                        <span className="resource-arrow">↗</span>
                      </Link>
                    ))
                  ) : (
                    <div className="panel empty-panel">
                      <h3>Your library is growing.</h3>
                      <p>
                        Resources will appear here once published for this
                        department.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
            <aside className="dashboard-aside">
              <section className="events-panel">
                <div className="section-heading">
                  <h2>On the horizon</h2>
                  <SectionIcon name="events" />
                </div>
                <p className="aside-subtitle">A little time for campus life.</p>
                {upcomingEvents.length ? (
                  upcomingEvents.slice(0, 2).map((item) => (
                    <Link
                      className="event-mini"
                      key={item.id}
                      href={detailHref("events", item.id, context)}
                    >
                      <span className="event-date">
                        <small>
                          {new Intl.DateTimeFormat("en-GB", {
                            month: "short",
                            timeZone: "Africa/Lagos",
                          }).format(new Date(item.event!.startsAt))}
                        </small>
                        <strong>
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            timeZone: "Africa/Lagos",
                          }).format(new Date(item.event!.startsAt))}
                        </strong>
                      </span>
                      <div>
                        <span className="resource-category">
                          {item.isDemo !== false
                            ? "FICTIONAL EVENT"
                            : item.event?.status}
                        </span>
                        <h3>{item.title}</h3>
                        <p>{item.event?.venue}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="field-hint">
                    No upcoming events for this selection yet.
                  </p>
                )}
                <Link
                  className="all-events-link"
                  href={sectionHref("events", context)}
                >
                  Explore campus events <span>→</span>
                </Link>
              </section>
              <section className="campus-note">
                <span className="note-drawing" aria-hidden>
                  <SectionIcon name="campus" />
                </span>
                <span className="eyebrow">MORE THAN A NOTICEBOARD</span>
                <h2>
                  Your campus.
                  <br />
                  Your kind of day.
                </h2>
                <p>
                  Keep your academic profile up to date so your next visit feels
                  a little more like home.
                </p>
                <Link href="/profile">
                  Make it yours <span>↗</span>
                </Link>
              </section>
              <p className="workspace-disclaimer">
                <SectionIcon name="shield" />
                {live
                  ? "Independent student platform. Confirm important notices with your department."
                  : "You’re exploring fictional sample content. No real deadlines or events are being announced."}
              </p>
            </aside>
          </div>
        </>
      ) : (
        <ContentView
          kind={section}
          context={context}
          query={query}
          detailId={detailId}
          records={records}
        />
      )}
    </StudentShell>
  );
}
