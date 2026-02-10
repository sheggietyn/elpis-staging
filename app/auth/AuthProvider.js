"use client";

import React, { createContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "../Libs/Session";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [userNewData, setUserNewData] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const timerRef = useRef(null);
  const timeout = 3600000;

  const handleLogout = async () => {
    if (user?.uid) clearSession(user.uid);
    await auth.signOut();
    router.push("/login");
  };

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, timeout);
  };

  // Activity tracker
  useEffect(() => {
    const handleActivity = () => resetTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  // 🔐 SINGLE auth + db listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserNewData(null);
        setInitializing(false);
        return;
      }

      setUser(firebaseUser);

      const userRef = ref(DB, `users/${firebaseUser.uid}`);
      const unsubscribeDb = onValue(userRef, (snapshot) => {
        setUserNewData(snapshot.exists() ? snapshot.val() : null);
        setInitializing(false);
      });

      return () => unsubscribeDb();
    });

    return () => unsubscribeAuth();
  }, []);

  // 🔐 ROUTE GUARD
  useEffect(() => {
    if (initializing) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!userNewData) return;

    // Suspended users
    if (userNewData.Suspend_User) {
      router.push("/suspended");
      return;
    }

    const isAdminRoute = pathname.startsWith("/adminpanel");

    // 🔐 Admin-only
    if (isAdminRoute && userNewData.Team_Member !== true) {
      router.replace("/home");
      return;
    }

    // 🔐 Paid user routes
    if (
      !isAdminRoute &&
      !(
        userNewData.PlanStatus ||
        userNewData.AffiliateStatus ||
        userNewData.Team_Member
      )
    ) {
      router.push("/paynow");
    }
  }, [user, userNewData, initializing, pathname, router]);

  if (initializing) return null;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
