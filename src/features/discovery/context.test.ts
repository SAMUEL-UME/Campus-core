import { describe, expect, it } from "vitest";
import { academicTaxonomy, type Taxonomy } from "../../data/academic-taxonomy";
import {
  changeContext,
  emptyContext,
  isSection,
  resolveContext,
  sectionHref,
  sections,
} from "./context";

const selected = {
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
};
describe("academic context", () => {
  it("starts empty without silently selecting a department", () => {
    expect(resolveContext({})).toMatchObject({
      context: emptyContext,
      complete: false,
      invalid: false,
    });
  });
  it.each(academicTaxonomy.departments)(
    "supports every supplied level for $name",
    (department) => {
      for (const level of academicTaxonomy.levels.filter(
        (item) => item.departmentId === department.id,
      ))
        expect(
          resolveContext({
            ...selected,
            faculty: department.facultyId,
            department: department.id,
            level: level.id,
          }).complete,
        ).toBe(true);
    },
  );
  it("clears descendants when changing university, faculty or department", () => {
    expect(changeContext(selected, "university", "other")).toEqual({
      ...emptyContext,
      university: "other",
    });
    expect(changeContext(selected, "faculty", "other")).toEqual({
      ...selected,
      faculty: "other",
      department: "",
      level: "",
    });
    expect(
      changeContext(
        selected,
        "department",
        "unizik-physical-sciences-statistics",
      ),
    ).toEqual({
      ...selected,
      department: "unizik-physical-sciences-statistics",
      level: "",
    });
    expect(changeContext(selected, "level", "400")).toEqual({
      ...selected,
      level: "400",
    });
    expect(selected.level).toBe("200");
  });
  it("retains valid parents but rejects unknown levels and departments", () => {
    expect(resolveContext({ ...selected, level: "900" })).toMatchObject({
      invalid: true,
      complete: false,
      context: { ...selected, level: "" },
    });
    expect(
      resolveContext({ ...selected, department: "unknown" }).context,
    ).toEqual({ ...selected, department: "", level: "" });
  });
  it("rejects duplicate query parameters and untrusted input", () => {
    expect(
      resolveContext({ ...selected, university: ["unizik", "other"] }),
    ).toMatchObject({ invalid: true, context: emptyContext });
    expect(
      resolveContext({ ...selected, university: "<script>alert(1)</script>" })
        .context,
    ).toEqual(emptyContext);
  });
  it("supports additional institutions without accepting mismatched ancestry", () => {
    const taxonomy: Taxonomy = {
      universities: [
        ...academicTaxonomy.universities,
        { id: "other", name: "Synthetic university" },
      ],
      faculties: [
        ...academicTaxonomy.faculties,
        { id: "arts", universityId: "other", name: "Arts" },
      ],
      departments: [
        ...academicTaxonomy.departments,
        { id: "history", facultyId: "arts", name: "History" },
      ],
      levels: [
        ...academicTaxonomy.levels,
        { id: "500", departmentId: "history", name: "500 level" },
      ],
    };
    expect(
      resolveContext(
        {
          university: "other",
          faculty: "arts",
          department: "history",
          level: "500",
        },
        taxonomy,
      ).complete,
    ).toBe(true);
    expect(
      resolveContext({ ...selected, university: "other" }, taxonomy).complete,
    ).toBe(false);
    expect(
      resolveContext({ ...selected, level: "500" }, taxonomy).complete,
    ).toBe(false);
    expect(
      resolveContext(
        {},
        { universities: [], faculties: [], departments: [], levels: [] },
      ).complete,
    ).toBe(false);
  });
});
describe("section navigation", () => {
  it.each(sections)("preserves context through $id URLs", ({ id }) => {
    const url = new URL(sectionHref(id, selected), "http://localhost");
    expect(
      resolveContext(Object.fromEntries(url.searchParams)).context,
    ).toEqual(selected);
    expect(url.pathname).toBe(`/${id}`);
  });
  it("preserves partial context and avoids empty query strings", () => {
    expect(sectionHref("dashboard", emptyContext)).toBe("/dashboard");
    expect(
      sectionHref("events", { ...emptyContext, university: "unizik" }),
    ).toBe("/events?university=unizik");
  });
  it("only accepts known sections", () => {
    expect(isSection("resources")).toBe(true);
    expect(isSection("admin")).toBe(false);
    expect(isSection("https://example.com")).toBe(false);
  });
});
