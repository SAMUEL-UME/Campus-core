import { describe, expect, it } from "vitest";
import { parseContentDraft } from "./editor-schema";
const valid = {
  departmentId: "unizik-physical-sciences-computer-science",
  kind: "announcements",
  status: "draft",
  title: "Study group",
  summary: "An original notice",
  body: "Bring your own notes.",
  category: "Academic",
  source: "Publisher",
  levels: ["200"],
  resourceUrl: "",
  startsAt: "",
  endsAt: "",
  venue: "",
  organizer: "",
  eventStatus: "Scheduled",
};
describe("publisher validation", () => {
  it("accepts content but discards client-supplied authority", () => {
    const output = parseContentDraft({
      ...valid,
      authorId: "someone-else",
      role: "admin",
    });
    expect(output.title).toBe(valid.title);
    expect(output).not.toHaveProperty("authorId");
    expect(output).not.toHaveProperty("role");
  });
  it.each([
    { departmentId: "unknown" },
    { levels: ["900"] },
    { title: " " },
    { body: "x".repeat(20001) },
    { status: "approved" },
    { resourceUrl: "javascript:alert(1)" },
    { resourceUrl: "http://example.com" },
    { kind: "events", startsAt: "invalid", endsAt: "invalid" },
  ])("rejects invalid draft %#", (patch) =>
    expect(() => parseContentDraft({ ...valid, ...patch })).toThrow(),
  );
  it("rejects reversed event dates", () => {
    expect(() =>
      parseContentDraft({
        ...valid,
        kind: "events",
        startsAt: "2026-11-06T14:00:00+01:00",
        endsAt: "2026-11-06T13:00:00+01:00",
        venue: "Room",
        organizer: "Club",
      }),
    ).toThrow();
  });
});
