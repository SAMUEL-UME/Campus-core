import assert from "node:assert/strict";
import { test } from "node:test";
import { initializeApp, deleteApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
const host = process.env.FIREBASE_AUTH_EMULATOR_HOST;
assert.ok(
  host && /^(localhost|127\.0\.0\.1):\d+$/.test(host),
  "Start the local Auth emulator first.",
);
test("email registration, profile update, sign-out, sign-in, verification and reset requests", async () => {
  const app = initializeApp(
    { projectId: "demo-campus-core", apiKey: "fake-emulator-only-key" },
    "account-test",
  );
  const auth = getAuth(app);
  connectAuthEmulator(auth, `http://${host}`, { disableWarnings: true });
  try {
    const email = `student-${Date.now()}@example.test`;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      "Local-test-only-2026!",
    );
    await updateProfile(user, { displayName: "Fictional Student" });
    assert.equal(auth.currentUser.displayName, "Fictional Student");
    await sendEmailVerification(user);
    await signOut(auth);
    assert.equal(auth.currentUser, null);
    await assert.rejects(
      signInWithEmailAndPassword(auth, email, "wrong-password"),
    );
    const signedIn = await signInWithEmailAndPassword(
      auth,
      email,
      "Local-test-only-2026!",
    );
    assert.equal(signedIn.user.uid, user.uid);
    assert.equal(signedIn.user.displayName, "Fictional Student");
    await sendPasswordResetEmail(auth, email);
    const response = await fetch(
      `http://${host}/emulator/v1/projects/demo-campus-core/oobCodes`,
    );
    assert.equal(response.status, 200);
    const { oobCodes = [] } = await response.json();
    assert.ok(
      oobCodes.some(
        (c) => c.email === email && c.requestType === "VERIFY_EMAIL",
      ),
    );
    assert.ok(
      oobCodes.some(
        (c) => c.email === email && c.requestType === "PASSWORD_RESET",
      ),
    );
  } finally {
    await signOut(auth);
    await deleteApp(app);
  }
});
