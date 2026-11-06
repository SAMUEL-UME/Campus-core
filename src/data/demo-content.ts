export type ContentKind = "announcements" | "resources" | "events";
export interface DemoRecord {
  isDemo?: boolean;
  resourceUrl?: string;
  id: string;
  kind: ContentKind;
  departmentId: string;
  levels: readonly string[];
  title: string;
  summary: string;
  category: string;
  body: readonly string[];
  publishedAt: string;
  source: string;
  event?: {
    startsAt: string;
    endsAt: string;
    timezone: string;
    venue: string;
    organizer: string;
    status: "Scheduled" | "Cancelled";
  };
}

// Original fictional fixtures. No real notices, officials, student data or attachments.
const departments = [
  {
    id: "unizik-physical-sciences-computer-science",
    topic: "Programming",
    level: "200",
  },
  {
    id: "unizik-physical-sciences-mathematics",
    topic: "Mathematical reasoning",
    level: "200",
  },
  {
    id: "unizik-medicine-medicine-and-surgery-mbbs",
    topic: "Study planning",
    level: "600",
  },
];
export const demoContent: readonly DemoRecord[] = departments.flatMap(
  (department): DemoRecord[] => {
    const common = {
      departmentId: department.id,
      publishedAt: "2026-11-04T08:00:00+01:00",
      source: "Campus Core fictional demo editorial team",
    };
    return [
      {
        ...common,
        id: `${department.id}-study-circle`,
        kind: "announcements",
        levels: [],
        title: "A new way to plan your study week",
        category: "Department",
        summary:
          "A fictional study-circle notice showing how department updates will appear.",
        body: [
          "This is a fictional demonstration notice. No meeting, deadline or university instruction is being announced.",
          "In this example, students create a weekly study plan: choose one topic, identify a question, and set aside time to review it with a peer.",
          "Use official university channels for real academic schedules and instructions.",
        ],
      },
      {
        ...common,
        id: `${department.id}-practice`,
        kind: "announcements",
        levels: [department.level],
        title: `${department.topic}: practice session example`,
        category: "Academic",
        summary: `An example notice specifically for ${department.level} level, not an actual class announcement.`,
        body: [
          "Fictional demonstration only; no attendance is required.",
          "This example illustrates a level-specific update. Prepare a short explanation of a topic you recently studied, then write down what you would like to understand better.",
        ],
      },
      {
        ...common,
        id: `${department.id}-study-guide`,
        kind: "resources",
        levels: [],
        title: `${department.topic}: a focused study checklist`,
        category: "Study guide",
        summary:
          "An original sample checklist you can read directly. No download or account needed.",
        body: [
          "This original Campus Core demonstration guide is not an official syllabus, lecture note or examination resource.",
          "1. Choose one manageable topic and write a learning objective in your own words.",
          "2. Read your approved course materials. Close them and explain the topic from memory.",
          "3. Try a practice question, check your reasoning, and note what you need to revisit.",
          "4. Schedule a short review and take regular breaks. For Medicine, this is study organisation only, not clinical or medical guidance.",
        ],
      },
      {
        ...common,
        id: `${department.id}-revision`,
        kind: "resources",
        levels: [department.level],
        title: "Build a revision question bank",
        category: "Practice",
        summary:
          "A sample method for turning your own notes into revision prompts.",
        body: [
          "Original fictional demo resource; no past examination papers are supplied.",
          "Write three questions from your own notes: one definition, one explanation and one application. Answer without looking, then compare with your approved materials.",
          "Keep a short list of uncertain answers to discuss with your tutor. Do not share copyrighted course materials without permission.",
        ],
      },
      {
        ...common,
        id: `${department.id}-workshop`,
        kind: "events",
        levels: [],
        title: "Peer learning workshop — fictional event",
        category: "Workshop",
        summary:
          "Explore an example event page with a date, venue and organizer. This event is not taking place.",
        body: [
          "This event is fictional. Do not travel, register or make plans based on this example.",
          "Sample agenda: introduce a study goal, discuss a practice problem, and reflect on what to review next.",
        ],
        event: {
          startsAt: "2026-11-05T14:00:00+01:00",
          endsAt: "2026-11-05T15:30:00+01:00",
          timezone: "Africa/Lagos",
          venue: "Demo learning room — fictional venue",
          organizer: "Fictional Campus Core study group",
          status: "Scheduled",
        },
      },
      {
        ...common,
        id: `${department.id}-cancelled`,
        kind: "events",
        levels: [],
        title: "Study exchange — cancelled example",
        category: "Meetup",
        summary:
          "A fictional cancelled event, retained to demonstrate clear status communication.",
        body: [
          "Fictional demonstration only. This example is marked cancelled; no real event was arranged.",
        ],
        event: {
          startsAt: "2026-11-03T10:00:00+01:00",
          endsAt: "2026-11-03T11:00:00+01:00",
          timezone: "Africa/Lagos",
          venue: "Demo discussion room — fictional venue",
          organizer: "Fictional Campus Core study group",
          status: "Cancelled",
        },
      },
    ];
  },
);
