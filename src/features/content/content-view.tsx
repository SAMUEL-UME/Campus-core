import Link from "next/link";
import type { ContentKind, DemoRecord } from "@/data/demo-content";
import {
  type AcademicContext,
  type Query,
  sectionHref,
} from "../discovery/context";
import {
  detailHref,
  filterRecords,
  formatDate,
  scopedRecords,
} from "./catalog";

export function ContentCard({
  item,
  context,
}: {
  item: DemoRecord;
  context: AcademicContext;
}) {
  return (
    <article
      className={`content-card content-card-${item.kind} rounded-lg border border-border bg-card p-5`}
    >
      <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
        {item.isDemo !== false && (
          <span className="rounded bg-muted px-2 py-1">Fictional demo</span>
        )}
        <span className="px-2 py-1">{item.category}</span>
        {item.event && <span className="px-2 py-1">{item.event.status}</span>}
      </div>
      <h3 className="text-lg font-semibold">
        <Link
          className="underline decoration-border underline-offset-4 hover:decoration-primary"
          href={detailHref(item.kind, item.id, context)}
        >
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {item.summary}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {item.event
          ? formatDate(item.event.startsAt)
          : `${item.isDemo === false ? "Updated" : "Published"} ${formatDate(item.publishedAt)}`}
      </p>
    </article>
  );
}

export function ContentView({
  kind,
  context,
  query,
  detailId,
  records,
}: {
  kind: ContentKind;
  context: AcademicContext;
  query: Query;
  detailId?: string;
  records?: readonly DemoRecord[];
}) {
  const all = scopedRecords(kind, context, records);
  if (detailId) {
    const item = all.find((record) => record.id === detailId);
    if (!item)
      return (
        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-xl font-semibold">
            Content unavailable for this selection
          </h2>
          <p className="my-3">
            This record does not exist or does not belong to your selected
            department and level.
          </p>
          <Link
            className="inline-flex min-h-11 items-center underline"
            href={sectionHref(kind, context)}
          >
            Back to {kind}
          </Link>
        </section>
      );
    return (
      <article className="detail-card space-y-5 rounded-lg border border-border bg-card p-5 sm:p-7">
        <Link
          className="inline-flex min-h-11 items-center underline"
          href={sectionHref(kind, context)}
        >
          ← Back to {kind}
        </Link>
        <p className="text-sm font-semibold text-accent">
          {item.isDemo !== false ? "Fictional demonstration · " : ""}
          {item.category}
        </p>
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p className="text-sm text-muted-foreground">
          Source: {item.source}
          <br />
          {item.isDemo === false ? "Updated" : "Published"}{" "}
          {formatDate(item.publishedAt)} ·{" "}
          {item.levels.length
            ? `${item.levels.join(", ")} level`
            : "All levels in this department"}
        </p>
        {item.event && (
          <dl className="grid gap-3 rounded-md bg-muted p-4 text-sm">
            <div>
              <dt className="font-semibold">Status</dt>
              <dd>
                {item.event.status}
                {item.isDemo !== false
                  ? " — fictional event, do not attend"
                  : ""}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">When</dt>
              <dd>
                {formatDate(item.event.startsAt)} –{" "}
                {formatDate(item.event.endsAt)} ({item.event.timezone})
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Where</dt>
              <dd>{item.event.venue}</dd>
            </div>
            <div>
              <dt className="font-semibold">Organizer</dt>
              <dd>{item.event.organizer}</dd>
            </div>
          </dl>
        )}
        {item.resourceUrl && (
          <a
            href={item.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-button"
          >
            Open resource ↗
          </a>
        )}
        {item.body.map((paragraph) => (
          <p className="leading-7" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </article>
    );
  }
  const items = filterRecords(kind, context, query, undefined, records);
  return (
    <section className="space-y-4" aria-label={`${kind} results`}>
      <form
        action={`/${kind}`}
        method="get"
        className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2"
      >
        {Object.entries(context).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <label className="grid gap-2 text-sm font-medium">
          Search {kind}
          <input
            className="min-h-11 min-w-0 rounded-md border border-border px-3"
            name="q"
            maxLength={100}
            defaultValue={typeof query.q === "string" ? query.q : ""}
            placeholder="Search by keyword"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Category
          <select
            className="min-h-11 rounded-md border border-border px-3"
            name="category"
            defaultValue={
              typeof query.category === "string" ? query.category : ""
            }
          >
            <option value="">All categories</option>
            {Array.from(new Set(all.map((item) => item.category))).map(
              (category) => (
                <option key={category}>{category}</option>
              ),
            )}
          </select>
        </label>
        {kind === "events" && (
          <label className="grid gap-2 text-sm font-medium">
            Event dates
            <select
              className="min-h-11 rounded-md border border-border px-3"
              name="period"
              defaultValue={
                typeof query.period === "string" ? query.period : ""
              }
            >
              <option value="">All dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        )}
        <div className="flex items-end gap-4">
          <button
            className="min-h-11 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            type="submit"
          >
            Search and filter
          </button>
          <Link
            className="inline-flex min-h-11 items-center underline"
            href={sectionHref(kind, context)}
          >
            Clear
          </Link>
        </div>
      </form>
      <p role="status" className="text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "result" : "results"} · department
        content
      </p>
      {items.length ? (
        items.map((item) => (
          <ContentCard key={item.id} item={item} context={context} />
        ))
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6">
          <h2 className="text-lg font-semibold">
            {all.length
              ? "No matching results"
              : `No ${kind} for this selection yet`}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {all.length
              ? "Try another keyword or clear the filters."
              : "Choose another department or check back for new content."}
          </p>
        </div>
      )}
    </section>
  );
}
