"use client";
import Link from "next/link";
import { sectionHref } from "@/features/discovery/context";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const MotionLink = motion.create(Link);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reveal}
      transition={{ duration: reduced ? 0 : 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

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
    <Reveal className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </Reveal>
  );
}

function PreviewIllustration() {
  const reducedMotion = useReducedMotion();

  const floatingAnimation = (
    distance: number,
    duration: number,
    delay = 0,
  ) => ({
    animate: reducedMotion ? undefined : { y: [0, distance, 0] },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  });

  return (
    <motion.div
      role="img"
      aria-label="Illustration showing sample Campus Core announcements, resources and events"
      className="relative mx-auto flex min-h-[350px] w-full max-w-[460px] items-center justify-center px-5 py-12 sm:min-h-[450px] sm:px-10"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-8 rounded-full bg-emerald-100/70"
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-3 rounded-full border border-dashed border-emerald-300"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main department card */}
      <motion.div
        {...floatingAnimation(-8, 6)}
        className="relative z-10 w-full max-w-[320px] -rotate-2 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-700 text-xl font-bold text-white">
            C
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-800">
            YOUR DEPARTMENT
          </span>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-700">
          Computer Science · 200 Level
        </p>

        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
          A space to learn, share and grow.
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your campus life, a little more connected.
        </p>

        <div className="my-6 h-px bg-slate-200" />

        {/* Feature items */}
        <div className="space-y-3">
          {[
            {
              icon: "↗",
              title: "Important updates",
              description: "Find what matters today",
              color: "bg-emerald-50 text-emerald-700",
            },
            {
              icon: "▤",
              title: "Study resources",
              description: "Everything in one place",
              color: "bg-sky-50 text-sky-700",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={reducedMotion ? undefined : { x: 5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 rounded-xl p-1"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-xl ${item.color}`}
              >
                {item.icon}
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>

                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student community */}
        <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5">
          {["S", "O", "C"].map((letter, index) => {
            const colors = [
              "bg-emerald-100 text-emerald-800",
              "bg-amber-100 text-amber-800",
              "bg-sky-100 text-sky-800",
            ];

            return (
              <motion.span
                key={letter}
                whileHover={reducedMotion ? undefined : { y: -4, scale: 1.1 }}
                className={`-mr-3 flex size-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold ${colors[index]}`}
              >
                {letter}
              </motion.span>
            );
          })}

          <span className="ml-4 text-xs font-medium text-slate-500">
            Better together.
          </span>
        </div>
      </motion.div>

      {/* Floating campus events card */}
      <motion.div
        {...floatingAnimation(-6, 4.5, 0.4)}
        className="absolute right-0 top-3 z-20 hidden max-w-[190px] rotate-3 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg min-[380px]:flex sm:top-8"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
          ▦
        </span>

        <div>
          <p className="text-xs font-bold text-slate-900">Campus events</p>
          <p className="text-[11px] text-slate-500">Know what&apos;s next</p>
        </div>
      </motion.div>

      {/* Floating community card */}
      <motion.div
        {...floatingAnimation(6, 5, 0.8)}
        className="absolute bottom-2 left-0 z-20 hidden max-w-[210px] -rotate-3 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg min-[380px]:flex sm:bottom-8"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          ✦
        </span>

        <div>
          <p className="text-xs font-bold text-slate-900">Student-powered</p>
          <p className="text-[11px] text-slate-500">Share. Learn. Connect.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const sample = {
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
};

export default function HomepageContent() {
  const { loading, isAuthenticated, user } = useAuth();
  const reduced = useReducedMotion();
  return (
    <div className="min-w-0 bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 font-black text-white">
              C
            </span>
            Campus Core<span className="-ml-2 text-emerald-600">.</span>
          </Link>
          <nav
            aria-label="Welcome navigation"
            className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-5"
          >
            {!loading &&
              (isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 active:scale-[0.98]"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    aria-label="View your profile"
                    title="My Profile"
                    className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-800 transition hover:scale-105 hover:border-emerald-500"
                  >
                    {user?.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="profile picture"
                        className="size-full object-cover"
                      />
                    ) : (
                      <span>
                        {(user?.displayName || user?.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-md px-2 py-2 text-slate-700 hover:text-emerald-700"
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/sign-up"
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
                  >
                    Create an account ↗
                  </Link>
                </>
              ))}
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="overflow-hidden bg-slate-50">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-20">
            <motion.div
              className="min-w-0"
              initial={reduced ? false : "hidden"}
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: reduced ? 0 : 0.12 },
                },
              }}
            >
              <motion.p
                variants={reveal}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800"
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-emerald-600"
                />{" "}
                YOUR CAMPUS. YOUR COMMUNITY.
              </motion.p>
              <motion.h1
                variants={reveal}
                transition={{ duration: 0.55 }}
                className="mt-7 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl xl:text-6xl"
              >
                Everything your department needs,{" "}
                <span className="text-emerald-700">in one place.</span>
              </motion.h1>
              <motion.p
                variants={reveal}
                transition={{ duration: 0.55 }}
                className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
              >
                Stay connected to departmental announcements, academic
                resources, campus events and the opportunities that matter to
                you.
              </motion.p>
              <motion.div
                variants={reveal}
                transition={{ duration: 0.55 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 active:scale-[0.98] hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Find my department →
                </Link>
                <Link
                  href={sectionHref("announcements", sample)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Explore sample updates ↗
                </Link>
              </motion.div>
              <p className="mt-6 text-sm text-slate-500">
                Open to explore. No account needed. Starting with UNIZIK.
              </p>
            </motion.div>
            <PreviewIllustration />
          </div>
        </section>

        <section
          aria-label="Platform benefits"
          className="border-y border-slate-200 bg-white"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-5 py-6 text-sm font-medium text-slate-600 sm:px-8">
            <span>✓ &nbsp; Everything in one place</span>
            <span>✓ &nbsp; Review-first contributions</span>
            <span>✓ &nbsp; Built around student life</span>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"
          aria-labelledby="department-heading"
        >
          <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                FIND YOUR COMMUNITY
              </p>
              <h2
                id="department-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Your department. Your starting point.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-600">
                Start with your university, faculty, department and level to
                find the information relevant to your academic journey.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Choose my department →
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                PILOT COMMUNITY
              </p>
              <h3 className="mt-3 text-xl font-bold">
                Nnamdi Azikiwe University
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Physical Sciences · Computer Science · 200 Level
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Announcements",
                    section: "announcements" as const,
                  },
                  { label: "Resources", section: "resources" as const },
                  { label: "Events", section: "events" as const },
                  { label: "Dashboard", section: "dashboard" as const },
                ].map((item) => (
                  <MotionLink
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    key={item.label}
                    href={sectionHref(item.section, sample)}
                    className="flex min-h-20 items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </MotionLink>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">
                Pilot directory mappings are sample data and have not been
                independently verified.
              </p>
            </div>
          </Reveal>
        </section>

        <section
          className="border-y border-slate-100 bg-slate-50 px-5 py-16 sm:px-8 lg:py-20"
          aria-labelledby="announcements-heading"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="STAY IN THE KNOW"
              title="The updates that matter."
              description="A focused department bulletin that helps you find important information without the endless scrolling."
            />
            <Reveal className="grid gap-5 md:grid-cols-3">
              {[
                {
                  category: "DEPARTMENT BULLETIN",
                  title: "A new way to plan your study week",
                  description:
                    "Explore a sample announcement designed to help you prepare for your next study session.",
                },
                {
                  category: "ACADEMIC UPDATES",
                  title: "Keep your academic day organised",
                  description:
                    "See how department-level updates can be easier to find and follow.",
                },
                {
                  category: "STUDENT COMMUNITY",
                  title: "Stay connected to what's happening",
                  description:
                    "Discover how shared information can help everyone stay in the loop.",
                },
              ].map((item) => (
                <MotionLink
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  key={item.title}
                  href={sectionHref("announcements", sample)}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-emerald-600"
                >
                  <span className="text-[11px] font-bold tracking-widest text-emerald-700">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-6 text-sm font-bold text-emerald-700">
                    View sample updates ↗
                  </span>
                </MotionLink>
              ))}
            </Reveal>
            <p className="mt-5 text-xs text-slate-500">
              Fictional examples for demonstration only. Not official department
              announcements.
            </p>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"
          aria-labelledby="events-heading"
        >
          <SectionHeading
            eyebrow="BE PART OF IT"
            title="What's happening on campus?"
            description="From study meetups to department activities, find a better way to discover what's next."
          />
          <Reveal className="grid gap-5 md:grid-cols-2">
            <MotionLink
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              href={sectionHref("events", sample)}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-2xl text-emerald-700">
                ▦
              </span>
              <h3 className="mt-5 text-xl font-bold">
                Discover upcoming activities
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Browse sample event listings and explore what a connected campus
                calendar can look like.
              </p>
              <span className="mt-5 inline-block text-sm font-bold text-emerald-700">
                Explore events ↗
              </span>
            </MotionLink>
            <MotionLink
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              href={sectionHref("events", sample)}
              className="group rounded-2xl border border-slate-200 bg-emerald-50/60 p-7 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <span className="inline-flex rounded-xl bg-white p-3 text-2xl text-emerald-700">
                ✦
              </span>
              <h3 className="mt-5 text-xl font-bold">Find your people</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Make room for learning, collaboration and experiences beyond the
                classroom.
              </p>
              <span className="mt-5 inline-block text-sm font-bold text-emerald-700">
                See sample activities ↗
              </span>
            </MotionLink>
          </Reveal>
        </section>

        <section
          className="border-y border-slate-100 bg-slate-50 px-5 py-16 sm:px-8 lg:py-20"
          aria-labelledby="resources-heading"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="LEARN WITH LESS SEARCHING"
              title="Your next study session starts here."
              description="A calmer place to discover study materials and find what you need."
            />
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "▤",
                  title: "Study guides",
                  text: "Helpful material for your next topic.",
                },
                {
                  icon: "◫",
                  title: "Course materials",
                  text: "Keep useful academic resources close.",
                },
                {
                  icon: "✎",
                  title: "Revision support",
                  text: "Make study time more focused.",
                },
                {
                  icon: "✦",
                  title: "Shared knowledge",
                  text: "Learn from your student community.",
                },
              ].map((item) => (
                <MotionLink
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  key={item.title}
                  href={sectionHref("resources", sample)}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-600"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-700">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 font-bold">
                    {item.title}{" "}
                    <span aria-hidden="true" className="text-emerald-700">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </MotionLink>
              ))}
            </Reveal>
            <p className="mt-5 text-xs text-slate-500">
              These are illustrative categories. Browse the sample library to
              see currently available material.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-7 rounded-3xl border border-emerald-100 bg-emerald-50 p-7 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                A COMMUNITY BUILT BY YOU
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Good things happen when we share.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Your notes, ideas and discoveries can help someone else. Student
                contributions are reviewed before publication.
              </p>
            </div>
            <Link
              href={sectionHref("dashboard", sample)}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Explore your community →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p className="text-lg font-extrabold tracking-tight">
              Campus Core<span className="text-emerald-700">.</span>
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Independent student platform. Not affiliated with or endorsed by
              UNIZIK. Current content is fictional sample material; directory
              mappings are not independently verified.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            Explore campus ↗
          </Link>
        </div>
      </footer>
    </div>
  );
}
