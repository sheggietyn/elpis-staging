"use client";
import { useContext, useEffect, useState } from "react";
import {
  equalTo,
  limitToLast,
  off,
  onChildRemoved,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { DB } from "../Firebase/AuthHolder";
import { NotPops } from "../util/ToastLoader";
import { AuthContext } from "../auth/AuthProvider";
import { SessionUrl } from "../util/UtilsJester";

export const ConnectData = () => {
  const [userData, setUserData] = useState(null);
  const [LoaderUser, setLoaderUser] = useState(true);

  const user = useContext(AuthContext);

  useEffect(() => {
    const userRef = ref(DB, `users/${user.uid}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setLoaderUser(false);
        } else {
          NotPops("error", "Data does not exist");
          setUserData(null);
        }
      },
      (error) => {
        console.error(error);
        NotPops("error", error.message);

        setUserData(null);
      }
    );
    return () => {
      off(userRef, "value", unsubscribe);
    };
  }, [user.uid, DB]);

  return { LoaderUser, userData };
};

///export const SessionUrl = "Live Session/27676wuetrtsvrruete";

export const ConDateData = () => {
  const [DateData, setDateData] = useState(null);
  const [LoadEvent, setLoadEvent] = useState(true);

  useEffect(() => {
    const userRef = ref(DB, SessionUrl);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setDateData(snapshot.val());
          setLoadEvent(false);
        } else {
          ///NotPops("error", "Data does not exist");
          setDateData(null);
        }
      },
      (error) => {
        console.error(error);
        //NotPops("error", error.message);

        setDateData(null);
      }
    );
    return () => {
      off(userRef, "value", unsubscribe);
    };
  }, [DB]);

  return { LoadEvent, DateData };
};
