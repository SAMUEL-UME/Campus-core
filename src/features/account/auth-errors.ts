export function authError(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "We couldn’t sign you in. Check your email and password, or reset your password.";
    case "auth/email-already-in-use":
      return "We couldn’t create this account. Try signing in or resetting your password.";
    case "auth/weak-password":
    case "auth/password-does-not-meet-requirements":
      return "Choose a stronger password. Use at least 8 characters, with a mix of letters, numbers and symbols.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes before trying again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled. You can try again.";
    case "auth/popup-blocked":
      return "Allow pop-ups for this site to continue with Google.";
    case "auth/network-request-failed":
      return "We couldn’t connect. Check your internet connection and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "This sign-in method hasn’t been enabled yet. Try another method or browse as a guest.";
    case "auth/unauthorized-domain":
      return "Sign-in isn’t enabled for this website address yet. Please contact the site owner.";
    case "auth/requires-recent-login":
      return "Please sign out and sign in again before making this change.";
    default:
      return "Something went wrong. Please try again.";
  }
}
