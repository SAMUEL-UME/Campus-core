"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirebaseClient } from "@/lib/firebase/client";
import { SectionIcon } from "@/components/ui/section-icon";
import { useSession } from "./session-provider";
import { authError } from "./auth-errors";
import { registerStudent, requestPasswordReset } from "./account-actions";
type Mode = "sign-in" | "sign-up" | "forgot-password";
export function AuthScreen({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { user, ready, error: sessionError } = useSession();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false),
    [remember, setRemember] = useState(true);
  const registering = mode === "sign-up",
    resetting = mode === "forgot-password";
  async function google() {
    setBusy(true);
    setError("");
    try {
      const { auth } = getFirebaseClient();
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (e) {
      setError(authError(e));
    } finally {
      setBusy(false);
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim(),
      password = String(data.get("password") || "");
    const name = String(data.get("name") || "").trim();
    if (registering && (!name || password !== String(data.get("confirm")))) {
      setError(
        !name ? "Please enter your name." : "Your passwords don’t match.",
      );
      return;
    }
    setBusy(true);
    try {
      const { auth } = getFirebaseClient();
      if (resetting) {
        await requestPasswordReset(auth, email);
        setSent(true);
        return;
      }
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );
      if (registering) {
        await registerStudent(auth, email, password, name);
        router.push("/profile?welcome=1");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
      }
    } catch (e) {
      setError(authError(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link className="wordmark" href="/">
          <span className="brand-mark">
            <SectionIcon name="campus" />
          </span>
          Campus Core<span className="brand-dot">.</span>
        </Link>
        <Link href="/dashboard" className="text-link">
          Explore as a guest ↗
        </Link>
      </header>
      <main id="main-content" className="auth-layout" tabIndex={-1}>
        <aside className="auth-story" aria-label="Campus Core introduction">
          <span className="story-label">
            <span /> YOUR CAMPUS. CONNECTED.
          </span>
          <div className="story-headline">
            A little less chaos.
            <br />A lot more
            <br />
            <em>campus life.</em>
          </div>
          <p>
            Your department’s updates, your next study resource, your people.
            Make yourself at home.
          </p>
          <div className="story-orbit" aria-hidden="true">
            <div className="orbit-core">
              <SectionIcon name="campus" />
              <span>CAMPUS CORE</span>
            </div>
            <div className="orbit-chip chip-one">
              <SectionIcon name="announcements" /> In the know
            </div>
            <div className="orbit-chip chip-two">
              <SectionIcon name="resources" /> Ready to learn
            </div>
            <div className="orbit-chip chip-three">
              <SectionIcon name="events" /> Part of something
            </div>
          </div>
          <div className="story-foot">
            <span>01 / YOUR STUDENT SPACE</span>
            <span>Built for UNIZIK ↗</span>
          </div>
        </aside>
        <section className="auth-form-panel">
          <div className="auth-form-inner">
            <span className="eyebrow">
              {resetting
                ? "LET’S GET YOU BACK IN"
                : "YOUR NEXT CHAPTER STARTS HERE"}
            </span>
            <h1>
              {resetting
                ? "Forgot your password?"
                : registering
                  ? "Find your place."
                  : "Welcome back."}
            </h1>
            <p className="auth-subtitle">
              {resetting
                ? "It happens. We’ll send you a link to choose a new one."
                : registering
                  ? "Create your student account and make Campus Core yours."
                  : "Your campus is waiting. Pick up where you left off."}
            </p>
            {!resetting && (
              <nav className="auth-tabs" aria-label="Account access">
                <Link
                  href="/sign-in"
                  aria-current={!registering ? "page" : undefined}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  aria-current={registering ? "page" : undefined}
                >
                  Create account
                </Link>
              </nav>
            )}
            {(error || sessionError) && (
              <p role="alert" className="form-alert error">
                {error || sessionError}
              </p>
            )}
            {sent ? (
              <div className="reset-success" role="status">
                <span className="icon-tile">
                  <SectionIcon name="mail" />
                </span>
                <h3>Check your inbox</h3>
                <p>
                  If an account can receive a reset email at that address, a
                  link is on its way. Check your spam folder too.
                </p>
                <Link className="cc-button" href="/sign-in">
                  Back to sign in →
                </Link>
                <button className="text-link" onClick={() => setSent(false)}>
                  Try another email
                </button>
              </div>
            ) : user && !resetting ? (
              <div className="reset-success">
                <span className="avatar large">
                  {(user.displayName || "S").slice(0, 1)}
                </span>
                <h3>You’re already signed in.</h3>
                <p>Welcome, {user.displayName || "student"}.</p>
                <Link className="cc-button" href="/dashboard">
                  Go to my dashboard →
                </Link>
                <Link href="/profile" className="text-link">
                  Manage my profile
                </Link>
              </div>
            ) : (
              <>
                {!resetting && (
                  <>
                    <button
                      type="button"
                      className="google-button"
                      disabled={busy || !ready}
                      onClick={google}
                    >
                      <span className="google-g" aria-hidden>
                        G
                      </span>
                      Continue with Google
                    </button>
                    <div className="auth-divider">
                      <span>or use your email</span>
                    </div>
                  </>
                )}
                <form className="account-form" onSubmit={submit}>
                  {registering && (
                    <label>
                      Full name
                      <input
                        name="name"
                        autoComplete="name"
                        placeholder="What should we call you?"
                        required
                        maxLength={80}
                      />
                    </label>
                  )}
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      maxLength={254}
                    />
                  </label>
                  {!resetting && (
                    <>
                      <label>
                        <span className="label-row">
                          Password{" "}
                          {!registering && (
                            <Link href="/forgot-password">
                              Forgot password?
                            </Link>
                          )}
                        </span>
                        <span className="password-field">
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete={
                              registering ? "new-password" : "current-password"
                            }
                            placeholder={
                              registering
                                ? "Create a strong password"
                                : "Enter your password"
                            }
                            required
                            minLength={registering ? 8 : undefined}
                            maxLength={128}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPassword}
                          >
                            <SectionIcon
                              name={showPassword ? "eye-off" : "eye"}
                            />
                          </button>
                        </span>
                      </label>
                      {registering && (
                        <>
                          <p className="field-hint">
                            Use at least 8 characters. A mix of letters, numbers
                            and symbols is best.
                          </p>
                          <label>
                            Confirm password
                            <input
                              name="confirm"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              placeholder="Enter your password again"
                              required
                              minLength={8}
                              maxLength={128}
                            />
                          </label>
                        </>
                      )}
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        Keep me signed in on this device
                      </label>
                    </>
                  )}
                  <button
                    className="cc-button"
                    disabled={busy || !ready}
                    type="submit"
                  >
                    {busy
                      ? "Please wait…"
                      : resetting
                        ? "Send reset link"
                        : registering
                          ? "Create my account"
                          : "Sign in to Campus Core"}
                    <span aria-hidden>→</span>
                  </button>
                </form>
                <p className="auth-bottom">
                  {resetting ? (
                    <Link href="/sign-in">← Back to sign in</Link>
                  ) : registering ? (
                    <>
                      Already part of Campus Core?{" "}
                      <Link href="/sign-in">Sign in</Link>
                    </>
                  ) : (
                    <>
                      New around here?{" "}
                      <Link href="/sign-up">Create an account</Link>
                    </>
                  )}
                </p>
              </>
            )}
            <p className="auth-privacy">
              <SectionIcon name="shield" />
              <span>
                Your account is secured by Firebase Authentication.{" "}
                <Link href="/privacy">How we use your information</Link>
              </span>
            </p>
          </div>
        </section>
      </main>
      <footer className="auth-footer">
        Independent student platform · Made for campus life.
      </footer>
    </div>
  );
}
