import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  type Auth,
} from "firebase/auth";

export async function registerStudent(
  auth: Auth,
  email: string,
  password: string,
  name: string,
) {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  // The account already exists: optional setup failures must not ask the student to register again.
  try {
    await updateProfile(user, { displayName: name.trim() });
  } catch {
    /* Editable from the profile page. */
  }
  try {
    await sendEmailVerification(user);
  } catch {
    /* Profile offers a verification retry. */
  }
  return user;
}

export async function requestPasswordReset(auth: Auth, email: string) {
  try {
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error) {
    // Use the same confirmation for unknown accounts; preserve network and configuration errors.
    if (!(
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "auth/user-not-found"
    ))
      throw error;
  }
}
