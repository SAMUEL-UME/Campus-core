"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/account/session-provider";
import { authError } from "@/features/account/auth-errors";
import { StudentShell } from "@/features/workspace/student-shell";
import { SectionIcon } from "@/components/ui/section-icon";
import { getFirebaseClient } from "@/lib/firebase/client";
import { academicTaxonomy } from "@/data/academic-taxonomy";
import {
  changeContext,
  emptyContext,
  resolveContext,
  sectionHref,
} from "@/features/discovery/context";

export default function ProfilePage() {
  const { user } = useSession();
  return <ProfileContent key={user?.uid || "guest"} />;
}
function ProfileContent() {
  const { user, ready, error } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [context, setContext] = useState(emptyContext);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState("");
  const [cloudReady, setCloudReady] = useState(false);
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setName(user.displayName || "");
    });
    getDoc(
      doc(getFirestore(getFirebaseClient().app), "studentProfiles", user.uid),
    )
      .then((s) => {
        if (cancelled) return;
        setCloudReady(true);
        if (s.exists()) {
          const r = resolveContext(s.data());
          if (r.complete) setContext(r.context);
        } else {
          try {
            const r = resolveContext(
              JSON.parse(
                localStorage.getItem(`campus-context:${user.uid}`) || "{}",
              ),
            );
            if (r.complete) setContext(r.context);
          } catch {}
        }
      })
      .catch(() => {
        if (!cancelled)
          setFailure(
            "Your account is available, but academic profile sync isn’t ready yet. Your name can still be updated below.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [user]);
  async function saveName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setMessage("");
    setFailure("");
    try {
      const trimmed = name.trim();
      if (!trimmed) throw new Error("empty");
      await updateProfile(user, { displayName: trimmed });
      setMessage("Your name has been updated.");
      router.refresh();
    } catch (e) {
      setFailure(authError(e));
    } finally {
      setBusy(false);
    }
  }
  async function saveAcademic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setMessage("");
    setFailure("");
    try {
      if (!resolveContext(context).complete) throw new Error();
      await setDoc(
        doc(getFirestore(getFirebaseClient().app), "studentProfiles", user.uid),
        { ...context, updatedAt: serverTimestamp() },
      );
      try {
        localStorage.setItem(
          `campus-context:${user.uid}`,
          JSON.stringify(context),
        );
      } catch {}
      setCloudReady(true);
      setMessage(
        "Academic profile saved. Your dashboard will use this department and level.",
      );
    } catch {
      setFailure(
        "We couldn’t save your academic profile. Check your connection and try again. If it continues, profile sync needs to be enabled by the site owner.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function verify() {
    if (!user) return;
    setBusy(true);
    setFailure("");
    try {
      await sendEmailVerification(user);
      setMessage(
        "Verification email sent. Follow the link in your inbox, then sign in again.",
      );
    } catch (e) {
      setFailure(authError(e));
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    try {
      await signOut(getFirebaseClient().auth);
      router.replace("/sign-in");
    } catch (e) {
      setFailure(authError(e));
      setBusy(false);
    }
  }
  const r = resolveContext(context);
  const fields = [
    {
      key: "university",
      label: "University",
      options: academicTaxonomy.universities,
      disabled: false,
    },
    {
      key: "faculty",
      label: "Faculty",
      options: academicTaxonomy.faculties.filter(
        (f) => f.universityId === context.university,
      ),
      disabled: !context.university,
    },
    {
      key: "department",
      label: "Department",
      options: academicTaxonomy.departments.filter(
        (d) => d.facultyId === context.faculty,
      ),
      disabled: !context.faculty,
    },
    {
      key: "level",
      label: "Level",
      options: academicTaxonomy.levels.filter(
        (l) => l.departmentId === context.department,
      ),
      disabled: !context.department,
    },
  ] as const;
  return (
    <StudentShell active="profile" context={context}>
      <header className="workspace-heading">
        <div>
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
          <h1>
            My profile<span className="green-period">.</span>
          </h1>
          <p>Your identity, your department, your campus experience.</p>
        </div>
      </header>
      {!ready ? (
        <div className="panel empty-panel" role="status">
          Loading your account…
        </div>
      ) : !user ? (
        <div className="panel guest-profile">
          <span className="icon-tile">
            <SectionIcon name="profile" />
          </span>
          <h2>A space that’s yours.</h2>
          <p>
            Sign in to manage your account and save your academic profile.
            Campus browsing is always open.
          </p>
          {error && <p role="alert">{error}</p>}
          <div className="inline-actions">
            <Link className="cc-button" href="/sign-in">
              Sign in →
            </Link>
            <Link className="cc-button secondary" href="/sign-up">
              Create an account
            </Link>
          </div>
        </div>
      ) : (
        <>
          <section className="profile-banner">
            <div className="avatar large">
              {(name || user.displayName || "S").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <span className="profile-tag">STUDENT ACCOUNT</span>
              <h2>{name || user.displayName || "Welcome, scholar"}</h2>
              <p>{user.email}</p>
              <small>
                {r.complete
                  ? `${r.department?.name} · ${context.level} level`
                  : "Add your department below to personalize your dashboard."}
              </small>
            </div>
            <span className="profile-orbit" aria-hidden>
              <SectionIcon name="campus" />
            </span>
          </section>
          {message && (
            <p role="status" className="form-alert success">
              {message}
            </p>
          )}
          {failure && (
            <p role="alert" className="form-alert error">
              {failure}
            </p>
          )}
          <div className="profile-grid">
            <div className="profile-main">
              <section className="panel">
                <div className="panel-heading">
                  <span className="icon-tile">
                    <SectionIcon name="profile" />
                  </span>
                  <div>
                    <h2>Personal information</h2>
                    <p>A familiar name makes this space yours.</p>
                  </div>
                </div>
                <form className="account-form" onSubmit={saveName}>
                  <label>
                    Display name
                    <input
                      required
                      maxLength={80}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label>
                    Email address
                    <input value={user.email || ""} readOnly type="email" />
                  </label>
                  <p className="field-hint">
                    Your email is managed by your sign-in provider.
                  </p>
                  <button
                    disabled={busy || !name.trim()}
                    className="cc-button"
                    type="submit"
                  >
                    {busy ? "Please wait…" : "Save name"}
                    <span>→</span>
                  </button>
                </form>
              </section>
              <section className="panel">
                <div className="panel-heading">
                  <span className="icon-tile">
                    <SectionIcon name="campus" />
                  </span>
                  <div>
                    <h2>Academic profile</h2>
                    <p>See the updates that belong to your study day.</p>
                  </div>
                </div>
                <form className="account-form" onSubmit={saveAcademic}>
                  <div className="field-grid">
                    {fields.map((f) => (
                      <label key={f.key}>
                        {f.label}
                        <select
                          required
                          disabled={f.disabled}
                          value={context[f.key]}
                          onChange={(e) =>
                            setContext(
                              changeContext(context, f.key, e.target.value),
                            )
                          }
                        >
                          <option value="">
                            Select {f.label.toLowerCase()}
                          </option>
                          {f.options.map((o) => (
                            <option value={o.id} key={o.id}>
                              {o.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                  <p className="field-hint">
                    {cloudReady
                      ? "Save your selection privately to your account."
                      : "Academic profile changes need a connection to your account storage."}
                  </p>
                  <button
                    disabled={busy || !r.complete}
                    className="cc-button"
                    type="submit"
                  >
                    Save academic profile <span>→</span>
                  </button>
                </form>
              </section>
            </div>
            <aside className="profile-side">
              <section className="panel">
                <span className="eyebrow">ACCOUNT SECURITY</span>
                <h2 className="mt-4">You’re in control.</h2>
                <div className="security-row">
                  <SectionIcon name="mail" />
                  <div>
                    <strong>Email verification</strong>
                    <small>
                      {user.emailVerified
                        ? "Your email is verified"
                        : "Verification pending"}
                    </small>
                  </div>
                  <span
                    className={`small-badge ${user.emailVerified ? "green" : ""}`}
                  >
                    {user.emailVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                {!user.emailVerified && (
                  <button
                    className="cc-button secondary"
                    disabled={busy}
                    onClick={verify}
                  >
                    Send verification email
                  </button>
                )}
                <Link href="/forgot-password" className="settings-link">
                  <SectionIcon name="shield" />
                  Reset password <span>↗</span>
                </Link>
                <p className="field-hint">
                  Using Google? Manage your Google password through your Google
                  account.
                </p>
              </section>
              <section className="profile-tip">
                <span className="eyebrow">YOUR NEXT STEP</span>
                <h2>
                  Make the most
                  <br />
                  of your campus.
                </h2>
                <p>
                  Find department updates, explore your resources, and see
                  what’s happening next.
                </p>
                <Link
                  className="cc-button"
                  href={sectionHref("dashboard", context)}
                >
                  Go to my dashboard →
                </Link>
              </section>
              <Link href="/publisher" className="settings-link panel">
                <SectionIcon name="announcements" />
                Publisher workspace <span>↗</span>
              </Link>
              <p className="field-hint">
                Publishing requires separate department approval.
              </p>
              <button
                disabled={busy}
                className="signout-button"
                onClick={logout}
              >
                <SectionIcon name="logout" />
                Sign out of Campus Core
              </button>
            </aside>
          </div>
        </>
      )}
    </StudentShell>
  );
}
