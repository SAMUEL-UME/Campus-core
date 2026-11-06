import { academicTaxonomy } from "../../data/academic-taxonomy";

export type ContentDraft = {
  departmentId: string;
  kind: "announcements" | "resources" | "events";
  status: "draft" | "published" | "archived";
  title: string;
  summary: string;
  body: string;
  category: string;
  source: string;
  levels: string[];
  resourceUrl: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  organizer: string;
  eventStatus: "Scheduled" | "Cancelled";
};

export function parseContentDraft(value: unknown): ContentDraft {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Content must be an object.");
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number, required = true) => {
    const value = input[key];
    if (
      typeof value !== "string" ||
      value.trim().length > max ||
      (required && !value.trim())
    )
      throw new Error(
        `Check ${key}: ${required ? "required, " : ""}maximum ${max} characters.`,
      );
    return value.trim();
  };
  const departmentId = text("departmentId", 200);
  if (!academicTaxonomy.departments.some((d) => d.id === departmentId))
    throw new Error("Choose a supported department.");
  if (!["announcements", "resources", "events"].includes(String(input.kind)))
    throw new Error("Choose a content type.");
  if (!["draft", "published", "archived"].includes(String(input.status)))
    throw new Error("Choose a publication status.");
  if (
    !Array.isArray(input.levels) ||
    input.levels.length > 12 ||
    !input.levels.every(
      (level) =>
        typeof level === "string" &&
        academicTaxonomy.levels.some(
          (l) => l.departmentId === departmentId && l.id === level,
        ),
    )
  )
    throw new Error("Choose valid levels for this department.");
  const resourceUrl = text("resourceUrl", 2000, false);
  if (resourceUrl) {
    try {
      if (new URL(resourceUrl).protocol !== "https:") throw new Error();
    } catch {
      throw new Error("Resource links must use HTTPS.");
    }
  }
  const startsAt = text("startsAt", 40, false),
    endsAt = text("endsAt", 40, false);
  if (
    input.kind === "events" &&
    (!Number.isFinite(Date.parse(startsAt)) ||
      !Number.isFinite(Date.parse(endsAt)) ||
      Date.parse(endsAt) <= Date.parse(startsAt))
  )
    throw new Error(
      "Event end must be after its start. Include the time zone.",
    );
  if (!["Scheduled", "Cancelled"].includes(String(input.eventStatus)))
    throw new Error("Invalid event status.");
  return {
    departmentId,
    kind: input.kind as ContentDraft["kind"],
    status: input.status as ContentDraft["status"],
    title: text("title", 180),
    summary: text("summary", 500),
    body: text("body", 20000),
    category: text("category", 80),
    source: text("source", 200),
    levels: [...new Set(input.levels as string[])],
    resourceUrl,
    startsAt,
    endsAt,
    venue: text("venue", 200, input.kind === "events"),
    organizer: text("organizer", 200, input.kind === "events"),
    eventStatus: input.eventStatus as ContentDraft["eventStatus"],
  };
}
