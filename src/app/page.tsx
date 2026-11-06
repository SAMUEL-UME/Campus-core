import Link from "next/link";
import { redirect } from "next/navigation";
import { type Query, sectionHref } from "@/features/discovery/context";

const sample = {
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
};

const features = [
  {
    number: "01",
    icon: "↗",
    eyebrow: "DEPARTMENT BULLETIN",
    title: "Stay in the loop",
    description:
      "Find announcements by topic and level, with sources and dates in view.",
    section: "announcements" as const,
    action: "Explore announcements",
  },
  {
    number: "02",
    icon: "▤",
    eyebrow: "STUDY MATERIALS",
    title: "Find your next resource",
    description:
      "Discover useful academic materials and spend more time learning, less time searching.",
    section: "resources" as const,
    action: "Browse resources",
  },
  {
    number: "03",
    icon: "▦",
    eyebrow: "CAMPUS CALENDAR",
    title: "Be part of campus life",
    description:
      "See what's coming up and explore the activities that bring students together.",
    section: "events" as const,
    action: "Discover events",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function PreviewIllustration() {
  return (
    <div
      className="relative mx-auto flex min-h-87.5 w-full max-w-115 items-center justify-center px-5 py-12 sm:min-h-[450px] sm:px-10"
      aria-label="Illustration showing sample Campus Core announcements, resources and events"
      role="img"
    >
      <div aria-hidden="true" className="absolute inset-8 rounded-full bg-emerald-100/70" />
      <div aria-hidden="true" className="absolute inset-3 rounded-full border border-dashed border-emerald-300" />
      <div className="relative z-10 w-full max-w-[320px] -rotate-2 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-700 text-xl font-bold text-white">C</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-800">YOUR DEPARTMENT</span>
        </div>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-700">Computer Science · 200 Level</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">A space to learn, share and grow.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">Your campus life, a little more connected.</p>
        <div className="my-6 h-px bg-slate-200" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700">↗</span>
            <div><p className="text-sm font-semibold text-slate-900">Important updates</p><p className="text-xs text-slate-500">Find what matters today</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl text-sky-700">▤</span>
            <div><p className="text-sm font-semibold text-slate-900">Study resources</p><p className="text-xs text-slate-500">Everything in one place</p></div>
          </div>
        </div>
        <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5">
          {['S', 'O', 'C'].map((letter, index) => (
            <span key={letter} className={`-mr-3 flex size-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold ${index === 0 ? 'bg-emerald-100 text-emerald-800' : index === 1 ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'}`}>{letter}</span>
          ))}
          <span className="ml-4 text-xs font-medium text-slate-500">Better together.</span>
        </div>
      </div>
      <div className="absolute right-0 top-3 z-20 hidden max-w-47.5 rotate-3 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg min-[380px]:flex sm:right-0 sm:top-8">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">▦</span>
        <div><p className="text-xs font-bold text-slate-900">Campus events</p><p className="text-[11px] text-slate-500">Know what&apos;s next</p></div>
      </div>
      <div className="absolute bottom-2 left-0 z-20 hidden max-w-52.5 -rotate-3 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg min-[380px]:flex sm:bottom-8">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">✦</span>
        <div><p className="text-xs font-bold text-slate-900">Student-powered</p><p className="text-[11px] text-slate-500">Share. Learn. Connect.</p></div>
      </div>
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const keys = ["university", "faculty", "department", "level"] as const;
  if (keys.some((key) => query[key] !== undefined)) {
    const params = new URLSearchParams();
    for (const key of keys) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    }
    redirect(`/dashboard?${params}`);
  }

  return (
    <div className="min-w-0 bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 font-black text-white">C</span>
            Campus Core<span className="-ml-2 text-emerald-600">.</span>
          </Link>
          <nav aria-label="Welcome navigation" className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-5">
            <Link href="/sign-in" className="rounded-md px-2 py-2 text-slate-700 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600">Sign in</Link>
            <Link href="/sign-up" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Create an account ↗</Link>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="overflow-hidden bg-slate-50">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-20">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800"><span aria-hidden="true" className="size-2 rounded-full bg-emerald-600" /> YOUR CAMPUS. YOUR COMMUNITY.</p>
              <h1 className="mt-7 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">Everything your department needs, <span className="text-emerald-700">in one place.</span></h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Stay connected to departmental announcements, academic resources, campus events and the opportunities that matter to you.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Find my department →</Link>
                <Link href={sectionHref("announcements", sample)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Explore sample updates ↗</Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">Open to explore. No account needed. Starting with UNIZIK.</p>
            </div>
            <PreviewIllustration />
          </div>
        </section>

        <section aria-label="Platform benefits" className="border-y border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-5 py-6 text-sm font-medium text-slate-600 sm:px-8">
            <span>✓ &nbsp; Everything in one place</span><span>✓ &nbsp; Review-first contributions</span><span>✓ &nbsp; Built around student life</span>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="department-heading">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">FIND YOUR COMMUNITY</p>
              <h2 id="department-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Your department. Your starting point.</h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-600">Start with your university, faculty, department and level to find the information relevant to your academic journey.</p>
              <Link href="/dashboard" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Choose my department →</Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">PILOT COMMUNITY</p>
              <h3 className="mt-3 text-xl font-bold">Nnamdi Azikiwe University</h3>
              <p className="mt-1 text-sm text-slate-600">Physical Sciences · Computer Science · 200 Level</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[{ label: "Announcements", section: "announcements" as const }, { label: "Resources", section: "resources" as const }, { label: "Events", section: "events" as const }, { label: "Dashboard", section: "dashboard" as const }].map((item) => (
                  <Link key={item.label} href={sectionHref(item.section, sample)} className="flex min-h-20 items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600">{item.label}<span aria-hidden="true">↗</span></Link>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">Pilot directory mappings are sample data and have not been independently verified.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="announcements-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="STAY IN THE KNOW" title="The updates that matter." description="A focused department bulletin that helps you find important information without the endless scrolling." />
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { category: "DEPARTMENT BULLETIN", title: "A new way to plan your study week", description: "Explore a sample announcement designed to help you prepare for your next study session." },
                { category: "ACADEMIC UPDATES", title: "Keep your academic day organised", description: "See how department-level updates can be easier to find and follow." },
                { category: "STUDENT COMMUNITY", title: "Stay connected to what's happening", description: "Discover how shared information can help everyone stay in the loop." },
              ].map((item) => (
                <Link key={item.title} href={sectionHref("announcements", sample)} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-emerald-600">
                  <span className="text-[11px] font-bold tracking-widest text-emerald-700">{item.category}</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
                  <span className="mt-6 text-sm font-bold text-emerald-700">View sample updates ↗</span>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">Fictional examples for demonstration only. Not official department announcements.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="events-heading">
          <SectionHeading eyebrow="BE PART OF IT" title="What's happening on campus?" description="From study meetups to department activities, find a better way to discover what's next." />
          <div className="grid gap-5 md:grid-cols-2">
            <Link href={sectionHref("events", sample)} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"><span className="inline-flex rounded-xl bg-emerald-50 p-3 text-2xl text-emerald-700">▦</span><h3 className="mt-5 text-xl font-bold">Discover upcoming activities</h3><p className="mt-3 leading-7 text-slate-600">Browse sample event listings and explore what a connected campus calendar can look like.</p><span className="mt-5 inline-block text-sm font-bold text-emerald-700">Explore events ↗</span></Link>
            <Link href={sectionHref("events", sample)} className="group rounded-2xl border border-slate-200 bg-emerald-50/60 p-7 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"><span className="inline-flex rounded-xl bg-white p-3 text-2xl text-emerald-700">✦</span><h3 className="mt-5 text-xl font-bold">Find your people</h3><p className="mt-3 leading-7 text-slate-600">Make room for learning, collaboration and experiences beyond the classroom.</p><span className="mt-5 inline-block text-sm font-bold text-emerald-700">See sample activities ↗</span></Link>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="resources-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="LEARN WITH LESS SEARCHING" title="Your next study session starts here." description="A calmer place to discover study materials and find what you need." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "▤", title: "Study guides", text: "Helpful material for your next topic." },
                { icon: "◫", title: "Course materials", text: "Keep useful academic resources close." },
                { icon: "✎", title: "Revision support", text: "Make study time more focused." },
                { icon: "✦", title: "Shared knowledge", text: "Learn from your student community." },
              ].map((item) => (
                <Link key={item.title} href={sectionHref("resources", sample)} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"><span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-700">{item.icon}</span><h3 className="mt-5 font-bold">{item.title} <span aria-hidden="true" className="text-emerald-700">↗</span></h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p></Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">These are illustrative categories. Browse the sample library to see currently available material.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-7 rounded-3xl border border-emerald-100 bg-emerald-50 p-7 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">A COMMUNITY BUILT BY YOU</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Good things happen when we share.</h2><p className="mt-4 leading-7 text-slate-600">Your notes, ideas and discoveries can help someone else. Student contributions are reviewed before publication.</p></div>
            <Link href={sectionHref("dashboard", sample)} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Explore your community →</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-start">
          <div className="max-w-2xl"><p className="text-lg font-extrabold tracking-tight">Campus Core<span className="text-emerald-700">.</span></p><p className="mt-2 text-xs leading-6 text-slate-500">Independent student platform. Not affiliated with or endorsed by UNIZIK. Current content is fictional sample material; directory mappings are not independently verified.</p></div>
          <Link href="/dashboard" className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-emerald-600">Explore campus ↗</Link>
        </div>
      </footer>
    </div>
  );
}
