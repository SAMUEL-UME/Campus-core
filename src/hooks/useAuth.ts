"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseClient } from "@/lib/firebase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { auth } = getFirebaseClient();
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        () => {
          setUser(null);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch {
      queueMicrotask(() => {
        setUser(null);
        setLoading(false);
      });
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}


