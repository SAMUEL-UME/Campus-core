import Link from "next/link";
export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page">
      <Link href="/">← Campus Core</Link>
      <span className="eyebrow">YOUR INFORMATION</span>
      <h1>A little clarity.</h1>
      <p>
        Campus Core is an independent student platform maintained by Samuel Ume.
        It is not an official university portal.
      </p>
      <h2>What your account stores</h2>
      <p>
        Firebase Authentication processes your email, display name and sign-in
        credentials. Google sign-in may also supply your profile image.
        Passwords are handled by Firebase, not stored in Campus Core application
        documents.
      </p>
      <p>
        If you save an academic profile, your selected university, faculty,
        department and level are stored privately in Cloud Firestore. Your last
        selected academic context is also stored in this browser to restore your
        workspace.
      </p>
      <h2>How it is used</h2>
      <p>
        Account information is used to sign you in and personalize your
        department view. An account does not grant publishing privileges. Campus
        Core does not require an account to browse public content.
      </p>
      <h2>Your choices</h2>
      <p>
        You can edit your name and academic selection in your profile, reset
        your email/password account password, and sign out. Clear this site’s
        browser data to remove device preferences and locally persisted
        sessions. This does not delete your cloud account.
      </p>
      <h2>Questions and account requests</h2>
      <p>
        Contact the project owner through the{" "}
        <a
          href="https://github.com/SAMUEL-UME/campus-core"
          target="_blank"
          rel="noopener noreferrer"
        >
          Campus Core project
        </a>{" "}
        to arrange a private account or data request. Do not post passwords or
        personal records in public issues. A dedicated private support channel
        and retention policy must be finalized before a public student pilot.
      </p>
      <h2>Content and previews</h2>
      <p>
        Sample content is labeled fictional. Academic directory mappings are
        owner-supplied and have not been independently verified. Always confirm
        important academic instructions through your university’s official
        channels.
      </p>
      <Link className="cc-button" href="/profile">
        Back to my profile →
      </Link>
    </main>
  );
}
