import { describe, expect, it } from "vitest";
import { demoContent } from "../../data/demo-content";
import { academicTaxonomy } from "../../data/academic-taxonomy";
import {
  detailHref,
  filterRecords,
  scopedRecords,
  formatDate,
} from "./catalog";
import { emptyContext, resolveContext } from "../discovery/context";

const context = {
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
};
describe("fictional content catalog", () => {
  it("has unique IDs, valid department/level references and explicit fictional attribution", () => {
    expect(new Set(demoContent.map((item) => item.id)).size).toBe(
      demoContent.length,
    );
    for (const item of demoContent) {
      expect(item.source).toContain("fictional");
      expect(item.body.length).toBeGreaterThan(0);
      expect(
        academicTaxonomy.departments.some(
          (department) => department.id === item.departmentId,
        ),
      ).toBe(true);
      for (const level of item.levels)
        expect(
          academicTaxonomy.levels.some(
            (entry) =>
              entry.departmentId === item.departmentId && entry.id === level,
          ),
        ).toBe(true);
      expect(Number.isFinite(Date.parse(item.publishedAt))).toBe(true);
      if (item.event) {
        expect(Date.parse(item.event.endsAt)).toBeGreaterThan(
          Date.parse(item.event.startsAt),
        );
        expect(item.event.timezone).toBe("Africa/Lagos");
        expect(item.event.venue).toContain("fictional");
      }
    }
  });
  it.each(["announcements", "resources", "events"] as const)(
    "scopes %s and round-trips detail URLs",
    (kind) => {
      const records = scopedRecords(kind, context);
      expect(records.length).toBeGreaterThan(0);
      expect(
        records.every((item) => item.departmentId === context.department),
      ).toBe(true);
      expect(scopedRecords(kind, emptyContext)).toEqual([]);
      expect(scopedRecords(kind, { ...context, level: "600" })).toEqual([]);
      expect(
        scopedRecords(kind, { ...context, faculty: "unizik-medicine" }),
      ).toEqual([]);
      for (const item of records) {
        const url = new URL(
          detailHref(kind, item.id, context),
          "http://localhost",
        );
        expect(url.pathname).toBe(`/${kind}/${item.id}`);
        expect(
          resolveContext(Object.fromEntries(url.searchParams)).context,
        ).toEqual(context);
      }
    },
  );
  it("does not leak another department or level's records", () => {
    expect(
      scopedRecords("announcements", { ...context, level: "100" }),
    ).toHaveLength(1);
    const math = scopedRecords("announcements", {
      ...context,
      department: "unizik-physical-sciences-mathematics",
    });
    expect(math.every((item) => item.departmentId !== context.department)).toBe(
      true,
    );
    expect(
      scopedRecords("resources", {
        ...context,
        department: "unizik-physical-sciences-statistics",
      }),
    ).toEqual([]);
  });
  it("searches case-insensitively and combines category filtering", () => {
    expect(
      filterRecords("announcements", context, {
        q: "  PRACTICE  ",
        category: "Academic",
      }),
    ).toHaveLength(1);
    expect(
      filterRecords("announcements", context, {
        q: "practice",
        category: "Department",
      }),
    ).toEqual([]);
    expect(filterRecords("resources", context, { q: "<script>" })).toEqual([]);
    expect(
      filterRecords("resources", context, { category: "unknown" }),
    ).toEqual([]);
    expect(filterRecords("resources", context, { q: ["a", "b"] })).toHaveLength(
      2,
    );
  });
  it("filters events by actual time, preserves cancellation and formats explicit WAT dates", () => {
    const now = Date.parse("2026-11-04T12:00:00Z");
    expect(
      filterRecords("events", context, { period: "upcoming" }, now),
    ).toHaveLength(1);
    expect(
      filterRecords("events", context, { period: "past" }, now),
    ).toHaveLength(1);
    expect(
      filterRecords("events", context, { period: "cancelled" }, now)[0].event
        ?.status,
    ).toBe("Cancelled");
    expect(
      filterRecords(
        "events",
        context,
        { period: "upcoming" },
        Date.parse("2026-12-01"),
      ),
    ).toEqual([]);
    expect(formatDate("2026-11-05T14:00:00+01:00")).toContain("14:00 WAT");
  });
});
