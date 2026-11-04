import {
  UNIZIK_ACADEMIC_TAXONOMY,
  UNIZIK_UNIVERSITY,
} from "./unizik-academic-taxonomy";

export interface Taxonomy {
  universities: { id: string; name: string }[];
  faculties: { id: string; universityId: string; name: string }[];
  departments: {
    id: string;
    facultyId: string;
    name: string;
    verificationNotes?: string;
  }[];
  levels: { id: string; departmentId: string; name: string }[];
}

// Derive discovery options without changing the owner-supplied mappings or notes.
const departments = UNIZIK_ACADEMIC_TAXONOMY.flatMap((faculty) =>
  faculty.departments.map((department) => ({
    ...department,
    facultyId: faculty.id,
  })),
);
export const academicTaxonomy: Taxonomy = {
  universities: [UNIZIK_UNIVERSITY],
  faculties: UNIZIK_ACADEMIC_TAXONOMY.map((faculty) => ({
    id: faculty.id,
    name: faculty.name,
    slug: faculty.slug,
    universityId: UNIZIK_UNIVERSITY.id,
  })),
  departments,
  levels: departments.flatMap((department) =>
    department.supportedLevels.map((level) => ({
      id: String(level),
      departmentId: department.id,
      name: `${level} level`,
    })),
  ),
};
