"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseClient } from "@/lib/firebase/client";
const SessionContext = createContext<{
  user: User | null;
  ready: boolean;
  error: string;
}>({ user: null, ready: false, error: "" });
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState({
    user: null as User | null,
    ready: false,
    error: "",
  });
  useEffect(() => {
    try {
      return onAuthStateChanged(
        getFirebaseClient().auth,
        (user) => setSession({ user, ready: true, error: "" }),
        () =>
          setSession({
            user: null,
            ready: true,
            error: "We couldn’t check your account. Please refresh to retry.",
          }),
      );
    } catch {
      queueMicrotask(() =>
        setSession({
          user: null,
          ready: true,
          error:
            "Account services are temporarily unavailable. You can still explore campus.",
        }),
      );
    }
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
export const useSession = () => useContext(SessionContext);
