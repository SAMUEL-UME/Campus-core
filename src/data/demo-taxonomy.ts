export interface Taxonomy {
  universities: { id: string; name: string }[];
  faculties: { id: string; universityId: string; name: string }[];
  departments: { id: string; facultyId: string; name: string }[];
  levels: { id: string; departmentId: string; name: string }[];
}

// Illustrative grouping, not a verified statement of university structure.
const departments = [
  {
    id: "computer-science",
    facultyId: "demo-sciences",
    name: "Computer Science",
  },
  { id: "mathematics", facultyId: "demo-sciences", name: "Mathematics" },
  { id: "statistics", facultyId: "demo-sciences", name: "Statistics" },
];
export const demoTaxonomy: Taxonomy = {
  universities: [{ id: "unizik", name: "UNIZIK" }],
  faculties: [
    {
      id: "demo-sciences",
      universityId: "unizik",
      name: "Sciences — provisional demo grouping",
    },
  ],
  departments,
  levels: departments.flatMap((department) =>
    [100, 200, 300, 400].map((level) => ({
      id: String(level),
      departmentId: department.id,
      name: `${level} level`,
    })),
  ),
};
