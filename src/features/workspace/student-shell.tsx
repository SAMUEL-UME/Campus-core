"use client";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { SectionIcon } from "@/components/ui/section-icon";
import { useSession } from "@/features/account/session-provider";
import { getFirebaseClient } from "@/lib/firebase/client";
import {
  emptyContext,
  resolveContext,
  sectionHref,
  sections,
  type AcademicContext,
} from "@/features/discovery/context";

export function StudentShell({
  children,
  active,
  context = emptyContext,
}: {
  children: ReactNode;
  active: string;
  context?: AcademicContext;
}) {
  const { user, ready } = useSession();
  const router = useRouter();
  const resolved = resolveContext(context);
  const complete = resolved.complete;
  const signature = JSON.stringify(context);
  useEffect(() => {
    if (!ready || active === "profile") return;
    const key = `campus-context:${user?.uid || "guest"}`;
    if (complete) {
      try {
        localStorage.setItem(key, signature);
      } catch {}
      return;
    }
    if (!["dashboard", "announcements", "resources", "events"].includes(active))
      return;
    if (Object.values(JSON.parse(signature)).some(Boolean)) return;
    let cancelled = false;
    const restore = (value: unknown) => {
      if (!value || typeof value !== "object" || cancelled) return false;
      const selection = resolveContext(value as AcademicContext);
      if (!selection.complete) return false;
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(selection.context))
        params.set(key, value);
      router.replace(`${window.location.pathname}?${params}`);
      return true;
    };
    try {
      if (restore(JSON.parse(localStorage.getItem(key) || "null"))) return;
    } catch {}
    if (user)
      getDoc(
        doc(getFirestore(getFirebaseClient().app), "studentProfiles", user.uid),
      )
        .then((s) => restore(s.data()))
        .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [ready, user, complete, signature, active, router]);
  const links = [
    ...sections.map((s) => ({
      id: s.id,
      label: s.id === "dashboard" ? "Overview" : s.label,
      href: sectionHref(s.id, context),
    })),
    { id: "profile", label: "My profile", href: "/profile" },
  ];
  return (
    <div className="student-app">
      <aside className="desktop-rail">
        <Link href="/" className="wordmark">
          <span className="brand-mark">
            <SectionIcon name="campus" />
          </span>
          Campus Core<span className="brand-dot">.</span>
        </Link>
        <div className="rail-campus">
          <span className="icon-tile">
            <SectionIcon name="campus" />
          </span>
          <div>
            <strong>UNIZIK</strong>
            <small>Your campus space</small>
          </div>
          <span className="status-dot" />
        </div>
        <p className="nav-caption">YOUR WORKSPACE</p>
        <nav aria-label="Main sections">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "page" : undefined}
            >
              <SectionIcon name={link.id} />
              {link.label}
              {active === link.id && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="rail-bottom">
          <div className="rail-note">
            <span className="eyebrow">A LITTLE MORE CONNECTED</span>
            <p>Your next update. Your next idea. All right here.</p>
            <Link href={user ? "/profile" : "/sign-up"}>
              {user ? "Make it yours" : "Join Campus Core"} <span>↗</span>
            </Link>
          </div>
          <Link href="/privacy" className="rail-privacy">
            Privacy & platform information ↗
          </Link>
        </div>
      </aside>
      <div className="student-body">
        <header className="student-topbar">
          <Link className="mobile-brand wordmark" href="/">
            <span className="brand-mark">
              <SectionIcon name="campus" />
            </span>
            Campus Core.
          </Link>
          <div className="topbar-breadcrumb">
            Your workspace <span>/</span>{" "}
            <strong>
              {links.find((l) => l.id === active)?.label || "Campus"}
            </strong>
          </div>
          <div className="account-actions">
            {ready && user ? (
              <Link className="account-chip" href="/profile">
                <span className="avatar">
                  {(user.displayName || "Student").slice(0, 1).toUpperCase()}
                </span>
                <span className="account-name">
                  {user.displayName?.split(" ")[0] || "My account"}
                </span>
                <span aria-hidden>⌄</span>
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-link">
                  Sign in
                </Link>
                <Link href="/sign-up" className="cc-button small">
                  Get started <span>→</span>
                </Link>
              </>
            )}
          </div>
        </header>
        <main id="main-content" className="student-main" tabIndex={-1}>
          {children}
        </main>
        <footer className="student-footer">
          <span>Campus Core · Your campus, connected.</span>
          <span>
            Independent student platform. Not an official university service.
          </span>
        </footer>
      </div>
      <nav className="student-mobile-nav" aria-label="Mobile sections">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-current={active === link.id ? "page" : undefined}
          >
            <SectionIcon name={link.id} />
            <span>
              {link.id === "dashboard"
                ? "Home"
                : link.id === "announcements"
                  ? "Updates"
                  : link.id === "profile"
                    ? "Profile"
                    : link.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
export function StudentGreeting() {
  const { user } = useSession();
  return (
    <h1>
      {user ? (
        <>
          Welcome back,{" "}
          <span>{user.displayName?.split(" ")[0] || "scholar"}.</span>
        </>
      ) : (
        <>
          Your campus.
          <br className="mobile-break" /> <span>All together.</span>
        </>
      )}
    </h1>
  );
}
