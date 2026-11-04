import { academicTaxonomy, type Taxonomy } from "../../data/academic-taxonomy";

export type AcademicContext = {
  university: string;
  faculty: string;
  department: string;
  level: string;
};
export type Query = Record<string, string | string[] | undefined>;
export const emptyContext: AcademicContext = {
  university: "",
  faculty: "",
  department: "",
  level: "",
};
export const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Your academic context.",
  },
  {
    id: "announcements",
    label: "Announcements",
    description: "Department updates and academic notices.",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Curated academic resources and study links.",
  },
  {
    id: "events",
    label: "Events",
    description: "Campus and departmental activities.",
  },
] as const;
export type Section = (typeof sections)[number]["id"];
export function isSection(value: string): value is Section {
  return sections.some((section) => section.id === value);
}
export function resolveContext(
  query: Query,
  taxonomy: Taxonomy = academicTaxonomy,
) {
  const context = { ...emptyContext };
  const keys = Object.keys(context) as (keyof AcademicContext)[];
  const value = (key: keyof AcademicContext) =>
    typeof query[key] === "string" ? query[key] : "";
  const university = taxonomy.universities.find(
    (item) => item.id === value("university"),
  );
  const faculty =
    university &&
    taxonomy.faculties.find(
      (item) =>
        item.id === value("faculty") && item.universityId === university.id,
    );
  const department =
    faculty &&
    taxonomy.departments.find(
      (item) =>
        item.id === value("department") && item.facultyId === faculty.id,
    );
  const level =
    department &&
    taxonomy.levels.find(
      (item) =>
        item.id === value("level") && item.departmentId === department.id,
    );
  if (university) context.university = university.id;
  if (faculty) context.faculty = faculty.id;
  if (department) context.department = department.id;
  if (level) context.level = level.id;
  return {
    context,
    university,
    faculty,
    department,
    level,
    complete: Boolean(university && faculty && department && level),
    invalid: keys.some(
      (key) =>
        query[key] !== undefined &&
        query[key] !== "" &&
        query[key] !== context[key],
    ),
  };
}
export function changeContext(
  context: AcademicContext,
  key: keyof AcademicContext,
  value: string,
): AcademicContext {
  const next = { ...context, [key]: value };
  if (key === "university") {
    next.faculty = "";
    next.department = "";
    next.level = "";
  }
  if (key === "faculty") {
    next.department = "";
    next.level = "";
  }
  if (key === "department") next.level = "";
  return next;
}
export function sectionHref(
  section: Section,
  context: AcademicContext,
): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(context))
    if (value) query.set(key, value);
  const path = `/${section}`;
  return query.size ? `${path}?${query.toString()}` : path;
}
