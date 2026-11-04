/**
 * UNIZIK academic taxonomy supplied by the project owner.
 * Reference data only: department/programme mappings and durations are NOT independently verified.
 * Do not present this taxonomy as an official university directory without verification.
 * In particular, Agriculture level ranges conflict with the supplied general duration key;
 * Law and Pharmaceutical Sciences entries may be academic units rather than degree programmes.
 */

export type AcademicLevel = 100 | 200 | 300 | 400 | 500 | 600;

export interface AcademicDepartment {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly supportedLevels: readonly AcademicLevel[];
  readonly verificationNotes?: string;
}

export interface AcademicFaculty {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly departments: readonly AcademicDepartment[];
}

export const UNIZIK_UNIVERSITY = {
  id: "unizik",
  name: "Nnamdi Azikiwe University",
  slug: "nnamdi-azikiwe-university",
} as const;

export const UNIZIK_ACADEMIC_TAXONOMY: readonly AcademicFaculty[] = [
  {
    id: "unizik-agriculture",
    name: "Agriculture",
    slug: "agriculture",
    departments: [
      {
        id: "unizik-agriculture-agricultural-economics-and-extension",
        name: "Agricultural Economics and Extension",
        slug: "agricultural-economics-and-extension",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-animal-science-and-production",
        name: "Animal Science and Production",
        slug: "animal-science-and-production",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-crop-science-and-horticulture",
        name: "Crop Science and Horticulture",
        slug: "crop-science-and-horticulture",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-fisheries-and-aquaculture",
        name: "Fisheries and Aquaculture",
        slug: "fisheries-and-aquaculture",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-food-science-and-technology",
        name: "Food Science and Technology",
        slug: "food-science-and-technology",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-forestry-and-wildlife-management",
        name: "Forestry and Wildlife Management",
        slug: "forestry-and-wildlife-management",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
      {
        id: "unizik-agriculture-soil-science-and-land-resources-management",
        name: "Soil Science and Land Resources Management",
        slug: "soil-science-and-land-resources-management",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "Supplied 100–500 range conflicts with general four-year Agriculture key; verify.",
      },
    ],
  },
  {
    id: "unizik-arts",
    name: "Arts",
    slug: "arts",
    departments: [
      {
        id: "unizik-arts-african-and-asian-studies-igbo",
        name: "African and Asian Studies (Igbo)",
        slug: "african-and-asian-studies-igbo",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-english-language-and-literature",
        name: "English Language and Literature",
        slug: "english-language-and-literature",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-history-and-international-studies",
        name: "History and International Studies",
        slug: "history-and-international-studies",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-linguistics",
        name: "Linguistics",
        slug: "linguistics",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-modern-european-languages-french-chinese",
        name: "Modern European Languages (French, Chinese)",
        slug: "modern-european-languages-french-chinese",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-music",
        name: "Music",
        slug: "music",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-philosophy",
        name: "Philosophy",
        slug: "philosophy",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-religion-and-human-relations",
        name: "Religion and Human Relations",
        slug: "religion-and-human-relations",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-arts-theatre-and-film-studies",
        name: "Theatre and Film Studies",
        slug: "theatre-and-film-studies",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-basic-medical-sciences",
    name: "Basic Medical Sciences",
    slug: "basic-medical-sciences",
    departments: [
      {
        id: "unizik-basic-medical-sciences-anatomy",
        name: "Anatomy",
        slug: "anatomy",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-basic-medical-sciences-physiology",
        name: "Physiology",
        slug: "physiology",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-basic-medical-sciences-human-biochemistry",
        name: "Human Biochemistry",
        slug: "human-biochemistry",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-biosciences",
    name: "Biosciences",
    slug: "biosciences",
    departments: [
      {
        id: "unizik-biosciences-applied-biochemistry",
        name: "Applied Biochemistry",
        slug: "applied-biochemistry",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-biosciences-applied-microbiology-and-brewing",
        name: "Applied Microbiology and Brewing",
        slug: "applied-microbiology-and-brewing",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-biosciences-botany",
        name: "Botany",
        slug: "botany",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-biosciences-parasitology-and-entomology",
        name: "Parasitology and Entomology",
        slug: "parasitology-and-entomology",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-biosciences-zoology",
        name: "Zoology",
        slug: "zoology",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-education",
    name: "Education",
    slug: "education",
    departments: [
      {
        id: "unizik-education-adult-education",
        name: "Adult Education",
        slug: "adult-education",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-business-education",
        name: "Business Education",
        slug: "business-education",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-early-childhood-and-primary-education",
        name: "Early Childhood and Primary Education",
        slug: "early-childhood-and-primary-education",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-educational-foundations",
        name: "Educational Foundations",
        slug: "educational-foundations",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-educational-management-and-policy",
        name: "Educational Management and Policy",
        slug: "educational-management-and-policy",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-guidance-and-counselling",
        name: "Guidance and Counselling",
        slug: "guidance-and-counselling",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-human-kinetics-and-health-education",
        name: "Human Kinetics and Health Education",
        slug: "human-kinetics-and-health-education",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-library-and-information-science",
        name: "Library and Information Science",
        slug: "library-and-information-science",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-science-education",
        name: "Science Education",
        slug: "science-education",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-education-vocational-education",
        name: "Vocational Education",
        slug: "vocational-education",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-engineering",
    name: "Engineering",
    slug: "engineering",
    departments: [
      {
        id: "unizik-engineering-agricultural-and-bioresources-engineering",
        name: "Agricultural and Bioresources Engineering",
        slug: "agricultural-and-bioresources-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-chemical-engineering",
        name: "Chemical Engineering",
        slug: "chemical-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-civil-engineering",
        name: "Civil Engineering",
        slug: "civil-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-electrical-engineering",
        name: "Electrical Engineering",
        slug: "electrical-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-electronic-and-computer-engineering",
        name: "Electronic and Computer Engineering",
        slug: "electronic-and-computer-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-industrial-and-production-engineering",
        name: "Industrial and Production Engineering",
        slug: "industrial-and-production-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-mechanical-engineering",
        name: "Mechanical Engineering",
        slug: "mechanical-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-metallurgical-and-materials-engineering",
        name: "Metallurgical and Materials Engineering",
        slug: "metallurgical-and-materials-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-engineering-polymer-and-textile-engineering",
        name: "Polymer and Textile Engineering",
        slug: "polymer-and-textile-engineering",
        supportedLevels: [100, 200, 300, 400, 500],
      },
    ],
  },
  {
    id: "unizik-environmental-sciences",
    name: "Environmental Sciences",
    slug: "environmental-sciences",
    departments: [
      {
        id: "unizik-environmental-sciences-architecture",
        name: "Architecture",
        slug: "architecture",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-building",
        name: "Building",
        slug: "building",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-environmental-management",
        name: "Environmental Management",
        slug: "environmental-management",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-estate-management",
        name: "Estate Management",
        slug: "estate-management",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-geography-and-meteorology",
        name: "Geography and Meteorology",
        slug: "geography-and-meteorology",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-environmental-sciences-quantity-surveying",
        name: "Quantity Surveying",
        slug: "quantity-surveying",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-surveying-and-geoinformatics",
        name: "Surveying and Geoinformatics",
        slug: "surveying-and-geoinformatics",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-environmental-sciences-urban-and-regional-planning",
        name: "Urban and Regional Planning",
        slug: "urban-and-regional-planning",
        supportedLevels: [100, 200, 300, 400, 500],
      },
    ],
  },
  {
    id: "unizik-health-sciences-and-technology",
    name: "Health Sciences and Technology",
    slug: "health-sciences-and-technology",
    departments: [
      {
        id: "unizik-health-sciences-and-technology-medical-laboratory-science",
        name: "Medical Laboratory Science",
        slug: "medical-laboratory-science",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-health-sciences-and-technology-medical-rehabilitation-physiotherapy",
        name: "Medical Rehabilitation / Physiotherapy",
        slug: "medical-rehabilitation-physiotherapy",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-health-sciences-and-technology-nursing-sciences",
        name: "Nursing Sciences",
        slug: "nursing-sciences",
        supportedLevels: [100, 200, 300, 400, 500],
      },
      {
        id: "unizik-health-sciences-and-technology-radiography-and-radiological-sciences",
        name: "Radiography and Radiological Sciences",
        slug: "radiography-and-radiological-sciences",
        supportedLevels: [100, 200, 300, 400, 500],
      },
    ],
  },
  {
    id: "unizik-law",
    name: "Law",
    slug: "law",
    departments: [
      {
        id: "unizik-law-commercial-and-property-law",
        name: "Commercial and Property Law",
        slug: "commercial-and-property-law",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-law-international-law-and-jurisprudence",
        name: "International Law and Jurisprudence",
        slug: "international-law-and-jurisprudence",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-law-private-and-property-law",
        name: "Private and Property Law",
        slug: "private-and-property-law",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-law-public-law",
        name: "Public Law",
        slug: "public-law",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
    ],
  },
  {
    id: "unizik-management-sciences",
    name: "Management Sciences",
    slug: "management-sciences",
    departments: [
      {
        id: "unizik-management-sciences-accountancy",
        name: "Accountancy",
        slug: "accountancy",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-banking-and-finance",
        name: "Banking and Finance",
        slug: "banking-and-finance",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-business-administration",
        name: "Business Administration",
        slug: "business-administration",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-cooperative-economics-and-management",
        name: "Cooperative Economics and Management",
        slug: "cooperative-economics-and-management",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-entrepreneurship",
        name: "Entrepreneurship",
        slug: "entrepreneurship",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-marketing",
        name: "Marketing",
        slug: "marketing",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-management-sciences-public-administration",
        name: "Public Administration",
        slug: "public-administration",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-medicine",
    name: "Medicine",
    slug: "medicine",
    departments: [
      {
        id: "unizik-medicine-medicine-and-surgery-mbbs",
        name: "Medicine and Surgery (MBBS)",
        slug: "medicine-and-surgery-mbbs",
        supportedLevels: [100, 200, 300, 400, 500, 600],
        verificationNotes:
          "Confirm programme-to-department mapping with official university sources.",
      },
    ],
  },
  {
    id: "unizik-pharmaceutical-sciences",
    name: "Pharmaceutical Sciences",
    slug: "pharmaceutical-sciences",
    departments: [
      {
        id: "unizik-pharmaceutical-sciences-clinical-pharmacy-and-pharmacy-management",
        name: "Clinical Pharmacy and Pharmacy Management",
        slug: "clinical-pharmacy-and-pharmacy-management",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-pharmaceutical-sciences-pharmaceutical-and-medicinal-chemistry",
        name: "Pharmaceutical and Medicinal Chemistry",
        slug: "pharmaceutical-and-medicinal-chemistry",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-pharmaceutical-sciences-pharmaceutical-microbiology-and-biotechnology",
        name: "Pharmaceutical Microbiology and Biotechnology",
        slug: "pharmaceutical-microbiology-and-biotechnology",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-pharmaceutical-sciences-pharmaceutics-and-pharmaceutical-technology",
        name: "Pharmaceutics and Pharmaceutical Technology",
        slug: "pharmaceutics-and-pharmaceutical-technology",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-pharmaceutical-sciences-pharmacognosy-and-traditional-medicine",
        name: "Pharmacognosy and Traditional Medicine",
        slug: "pharmacognosy-and-traditional-medicine",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
      {
        id: "unizik-pharmaceutical-sciences-pharmacology-and-toxicology",
        name: "Pharmacology and Toxicology",
        slug: "pharmacology-and-toxicology",
        supportedLevels: [100, 200, 300, 400, 500],
        verificationNotes:
          "May be an academic unit rather than a separately selectable undergraduate programme; verify.",
      },
    ],
  },
  {
    id: "unizik-physical-sciences",
    name: "Physical Sciences",
    slug: "physical-sciences",
    departments: [
      {
        id: "unizik-physical-sciences-computer-science",
        name: "Computer Science",
        slug: "computer-science",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-geological-sciences",
        name: "Geological Sciences",
        slug: "geological-sciences",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-geophysics",
        name: "Geophysics",
        slug: "geophysics",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-information-technology",
        name: "Information Technology",
        slug: "information-technology",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-mathematics",
        name: "Mathematics",
        slug: "mathematics",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-physics-and-industrial-physics",
        name: "Physics and Industrial Physics",
        slug: "physics-and-industrial-physics",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-pure-and-industrial-chemistry",
        name: "Pure and Industrial Chemistry",
        slug: "pure-and-industrial-chemistry",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-physical-sciences-statistics",
        name: "Statistics",
        slug: "statistics",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
  {
    id: "unizik-social-sciences",
    name: "Social Sciences",
    slug: "social-sciences",
    departments: [
      {
        id: "unizik-social-sciences-economics",
        name: "Economics",
        slug: "economics",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-social-sciences-mass-communication",
        name: "Mass Communication",
        slug: "mass-communication",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-social-sciences-political-science",
        name: "Political Science",
        slug: "political-science",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-social-sciences-psychology",
        name: "Psychology",
        slug: "psychology",
        supportedLevels: [100, 200, 300, 400],
      },
      {
        id: "unizik-social-sciences-sociology-and-anthropology",
        name: "Sociology and Anthropology",
        slug: "sociology-and-anthropology",
        supportedLevels: [100, 200, 300, 400],
      },
    ],
  },
];

/** Returns only valid levels for a selected department. */
export function getUnizikDepartment(
  facultySlug: string,
  departmentSlug: string,
): AcademicDepartment | undefined {
  return UNIZIK_ACADEMIC_TAXONOMY.find(
    (faculty) => faculty.slug === facultySlug,
  )?.departments.find((department) => department.slug === departmentSlug);
}

export function isValidUnizikAcademicContext(
  facultySlug: string,
  departmentSlug: string,
  level: number,
): boolean {
  const department = getUnizikDepartment(facultySlug, departmentSlug);
  return (
    department?.supportedLevels.some(
      (supportedLevel) => supportedLevel === level,
    ) ?? false
  );
}
