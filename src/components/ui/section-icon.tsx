export function SectionIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    campus: "M2 9 12 3l10 6ZM4 21h16M6 11v7M12 11v7M18 11v7",
    profile: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2",
    saved: "M6 3h12v18l-6-4-6 4Z",
    search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    shield: "m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6ZM8 12l3 3 5-6",
    mail: "M3 5h18v14H3ZM3 6l9 7 9-7",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "eye-off":
      "M3 3l18 18M10 5h2c6 0 10 7 10 7s-1 2-3 4M6 6c-3 2-4 6-4 6s4 7 10 7h3",
    arrow: "M5 12h14M13 6l6 6-6 6",
    logout: "M9 3H3v18h6M9 12h12M16 7l5 5-5 5",
    settings: "M4 7h16M4 17h16M8 4v6M16 14v6",
    dashboard: "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",
    announcements: "M4 9h5l10-5v16L9 15H4ZM8 15l2 6H6l-2-6M22 9v6",
    resources:
      "M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z",
    events: "M4 5h16v16H4ZM4 10h16M8 2v6M16 2v6M8 14h2M14 14h2M8 17h2",
  };
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.dashboard} />
    </svg>
  );
}
