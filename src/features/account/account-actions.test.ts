import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  type Auth,
  type User,
} from "firebase/auth";
import { registerStudent, requestPasswordReset } from "./account-actions";
import { authError } from "./auth-errors";

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  sendEmailVerification: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  updateProfile: vi.fn(),
}));
const auth = {} as Auth,
  user = { uid: "fictional-student" } as User;
beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(createUserWithEmailAndPassword).mockResolvedValue({
    user,
  } as Awaited<ReturnType<typeof createUserWithEmailAndPassword>>);
});
describe("student account flow", () => {
  it("creates one account, sets the name, and requests verification", async () => {
    await expect(
      registerStudent(
        auth,
        " learner@example.test ",
        "test-only-password",
        " Learner ",
      ),
    ).resolves.toBe(user);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "learner@example.test",
      "test-only-password",
    );
    expect(updateProfile).toHaveBeenCalledWith(user, {
      displayName: "Learner",
    });
    expect(sendEmailVerification).toHaveBeenCalledWith(user);
  });
  it("does not report registration failure or create another account when optional setup fails", async () => {
    vi.mocked(updateProfile).mockRejectedValue(new Error("offline"));
    vi.mocked(sendEmailVerification).mockRejectedValue(new Error("offline"));
    await expect(
      registerStudent(
        auth,
        "learner@example.test",
        "test-only-password",
        "Learner",
      ),
    ).resolves.toBe(user);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
  it("does not perform profile or email work after registration fails", async () => {
    const failure = { code: "auth/email-already-in-use" };
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(failure);
    await expect(
      registerStudent(
        auth,
        "learner@example.test",
        "test-only-password",
        "Learner",
      ),
    ).rejects.toBe(failure);
    expect(updateProfile).not.toHaveBeenCalled();
    expect(sendEmailVerification).not.toHaveBeenCalled();
  });
  it("does not reveal whether a password-reset account exists", async () => {
    await expect(
      requestPasswordReset(auth, " learner@example.test "),
    ).resolves.toBeUndefined();
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      "learner@example.test",
    );
    vi.mocked(sendPasswordResetEmail).mockRejectedValue({
      code: "auth/user-not-found",
    });
    await expect(
      requestPasswordReset(auth, "missing@example.test"),
    ).resolves.toBeUndefined();
  });
  it("does not falsely report reset delivery on a network failure", async () => {
    const failure = { code: "auth/network-request-failed" };
    vi.mocked(sendPasswordResetEmail).mockRejectedValue(failure);
    await expect(
      requestPasswordReset(auth, "learner@example.test"),
    ).rejects.toBe(failure);
  });
  it("hides raw service errors and treats wrong credentials equally", () => {
    expect(authError({ code: "auth/user-not-found" })).toBe(
      authError({ code: "auth/wrong-password" }),
    );
    expect(authError(new Error("private token"))).not.toContain(
      "private token",
    );
  });
});
