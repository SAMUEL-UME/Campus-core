import "server-only";
import { initializeServerApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Runs with the caller's Firebase identity. Firestore Security Rules still apply.
export async function withFirebaseUser<T>(
  request: Request,
  work: (db: ReturnType<typeof getFirestore>, uid: string) => Promise<T>,
): Promise<T> {
  const bearer = request.headers.get("authorization");
  if (!bearer?.startsWith("Bearer ") || bearer.length > 10000)
    throw new Error("UNAUTHENTICATED");
  const app = initializeServerApp(
    {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    { authIdToken: bearer.slice(7) },
  );
  try {
    const auth = getAuth(app);
    await auth.authStateReady();
    if (!auth.currentUser) throw new Error("UNAUTHENTICATED");
    return await work(getFirestore(app), auth.currentUser.uid);
  } finally {
    await deleteApp(app);
  }
}
