import { describe, expect, it } from "vitest";
import { academicTaxonomy } from "./academic-taxonomy";
import {
  UNIZIK_ACADEMIC_TAXONOMY,
  UNIZIK_UNIVERSITY,
  getUnizikDepartment,
  isValidUnizikAcademicContext,
} from "./unizik-academic-taxonomy";
import {
  resolveContext,
  sectionHref,
  sections,
} from "../features/discovery/context";

describe("owner-supplied UNIZIK directory", () => {
  it("includes all 14 faculties and globally unique stable identifiers", () => {
    expect(UNIZIK_ACADEMIC_TAXONOMY).toHaveLength(14);
    const ids = [
      UNIZIK_UNIVERSITY.id,
      ...UNIZIK_ACADEMIC_TAXONOMY.flatMap((faculty) => [
        faculty.id,
        ...faculty.departments.map((department) => department.id),
      ]),
    ];
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      new Set(UNIZIK_ACADEMIC_TAXONOMY.map((faculty) => faculty.slug)).size,
    ).toBe(14);
    expect(academicTaxonomy.departments).toHaveLength(
      UNIZIK_ACADEMIC_TAXONOMY.reduce(
        (count, faculty) => count + faculty.departments.length,
        0,
      ),
    );
  });

  it.each(UNIZIK_ACADEMIC_TAXONOMY)(
    "preserves exact mappings, notes and scoped slugs in $name",
    (faculty) => {
      expect(
        academicTaxonomy.faculties.find((item) => item.id === faculty.id),
      ).toMatchObject({
        id: faculty.id,
        name: faculty.name,
        slug: faculty.slug,
        universityId: UNIZIK_UNIVERSITY.id,
      });
      expect(faculty.departments.length).toBeGreaterThan(0);
      expect(new Set(faculty.departments.map((item) => item.slug)).size).toBe(
        faculty.departments.length,
      );
      for (const department of faculty.departments) {
        expect(
          academicTaxonomy.departments.find(
            (item) => item.id === department.id,
          ),
        ).toEqual({ ...department, facultyId: faculty.id });
        const levels = academicTaxonomy.levels
          .filter((item) => item.departmentId === department.id)
          .map((item) => Number(item.id));
        expect(levels).toEqual(department.supportedLevels);
        expect(new Set(levels).size).toBe(levels.length);
        expect(levels.length).toBeGreaterThan(0);
        for (const level of [100, 200, 300, 400, 500, 600, 700]) {
          const supported = levels.includes(level);
          const context = {
            university: "unizik",
            faculty: faculty.id,
            department: department.id,
            level: String(level),
          };
          expect(resolveContext(context).complete).toBe(supported);
          expect(
            isValidUnizikAcademicContext(faculty.slug, department.slug, level),
          ).toBe(supported);
          if (supported)
            for (const section of sections) {
              const url = new URL(
                sectionHref(section.id, context),
                "http://localhost",
              );
              expect(
                resolveContext(Object.fromEntries(url.searchParams)).context,
              ).toEqual(context);
            }
        }
        const wrongFaculty = UNIZIK_ACADEMIC_TAXONOMY.find(
          (item) => item.id !== faculty.id,
        )!;
        expect(
          resolveContext({
            university: "unizik",
            faculty: wrongFaculty.id,
            department: department.id,
            level: "100",
          }),
        ).toMatchObject({
          invalid: true,
          complete: false,
          context: { department: "", level: "" },
        });
      }
    },
  );

  it("retains the supplied programme-specific ranges including flagged Agriculture", () => {
    expect(
      getUnizikDepartment("medicine", "medicine-and-surgery-mbbs")
        ?.supportedLevels,
    ).toEqual([100, 200, 300, 400, 500, 600]);
    expect(
      getUnizikDepartment("physical-sciences", "computer-science")
        ?.supportedLevels,
    ).toEqual([100, 200, 300, 400]);
    for (const faculty of UNIZIK_ACADEMIC_TAXONOMY.filter((item) =>
      ["engineering", "agriculture"].includes(item.slug),
    )) {
      for (const department of faculty.departments)
        expect(department.supportedLevels).toEqual([100, 200, 300, 400, 500]);
    }
    for (const faculty of UNIZIK_ACADEMIC_TAXONOMY.filter((item) =>
      ["agriculture", "law", "pharmaceutical-sciences", "medicine"].includes(
        item.slug,
      ),
    )) {
      for (const department of faculty.departments)
        expect(department.verificationNotes).toBeTruthy();
    }
  });

  it("rejects legacy provisional URLs and duplicate parameters at every depth", () => {
    expect(
      resolveContext({
        university: "unizik",
        faculty: "demo-sciences",
        department: "computer-science",
        level: "100",
      }),
    ).toMatchObject({ invalid: true, complete: false });
    const context = {
      university: "unizik",
      faculty: "unizik-medicine",
      department: "unizik-medicine-medicine-and-surgery-mbbs",
      level: "600",
    };
    for (const key of Object.keys(context) as (keyof typeof context)[])
      expect(
        resolveContext({ ...context, [key]: [context[key], context[key]] }),
      ).toMatchObject({ invalid: true, complete: false });
  });
});
