"use client";
import React, { createContext, useState, useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "../Libs/Session";
import { get, onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext();
export const AuthAdminProvider = ({ children, navigation }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userNewData, setUserNewData] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to store user UID

  const timerRef = useRef(null);
  const timeout = 3600000;

  const handleLogout = () => {
    if (userId) {
      clearSession(userId);
    }
    auth
      .signOut()
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // ✅ keep auth user separate
        try {
          const snapshot = await get(ref(DB, `users/${firebaseUser.uid}`));
          if (snapshot.exists()) {
            setUserNewData(snapshot.val()); // ✅ db data separate
          } else {
            setUserNewData(null);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setUserNewData(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Redirect logic
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch DB user data
        const userRef = ref(DB, `users/${firebaseUser.uid}`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserNewData(snapshot.val());
          } else {
            setUserNewData(null);
          }
        });
      } else {
        setUser(null);
        setUserNewData(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  // Redirect logic
  useEffect(() => {
    if (initializing) return;

    if (!user) {
      router.push("/login");
      clearTimeout(timerRef.current);
      return;
    }

    if (user && userNewData !== null) {
      if (!userNewData.Team_Member) {
        router.push("/home");
      }
    }
  }, [user, userNewData, initializing, router]);

  // Render
  if (initializing) {
    return null; // or spinner
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
