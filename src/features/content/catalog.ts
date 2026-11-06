import {
  demoContent,
  type ContentKind,
  type DemoRecord,
} from "../../data/demo-content";
import {
  resolveContext,
  sectionHref,
  type AcademicContext,
  type Query,
} from "../discovery/context";

export function scopedRecords(
  kind: ContentKind,
  context: AcademicContext,
  records: readonly DemoRecord[] = demoContent,
) {
  if (!resolveContext(context).complete) return [];
  return records.filter(
    (item) =>
      item.kind === kind &&
      item.departmentId === context.department &&
      (item.levels.length === 0 || item.levels.includes(context.level)),
  );
}
export function filterRecords(
  kind: ContentKind,
  context: AcademicContext,
  query: Query,
  now = Date.now(),
  source: readonly DemoRecord[] = demoContent,
) {
  const records = scopedRecords(kind, context, source);
  const q = typeof query.q === "string" ? query.q.trim().slice(0, 100) : "";
  const category = typeof query.category === "string" ? query.category : "";
  const period = typeof query.period === "string" ? query.period : "";
  return records.filter(
    (item) =>
      (!q ||
        `${item.title} ${item.summary} ${item.category}`
          .toLowerCase()
          .includes(q.toLowerCase())) &&
      (!category || item.category === category) &&
      (!period ||
        (item.event &&
          (period === "upcoming"
            ? Date.parse(item.event.endsAt) >= now &&
              item.event.status !== "Cancelled"
            : period === "past"
              ? Date.parse(item.event.endsAt) < now
              : period === "cancelled"
                ? item.event.status === "Cancelled"
                : false))),
  );
}
export function detailHref(
  kind: ContentKind,
  id: string,
  context: AcademicContext,
) {
  const url = sectionHref(kind, context);
  const [path, query] = url.split("?");
  return `${path}/${encodeURIComponent(id)}${query ? `?${query}` : ""}`;
}
export function formatDate(value: string) {
  return (
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    }).format(new Date(value)) + " WAT"
  );
}
