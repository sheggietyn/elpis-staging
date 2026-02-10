"use client";
import { useContext, useEffect, useState } from "react";
import {
  equalTo,
  limitToFirst,
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
import { AdminUrl } from "../util/UtilsJester";
export const AdminDataList = () => {
  const user = useContext(AuthContext);
  const [ConData, setConData] = useState(null);
  useEffect(() => {
    const userRef = ref(DB, AdminUrl);

    // Set up the onValue listener
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setConData(snapshot.val());
        } else {
          NotPops("error", "Data does not exist");
          setConData(null);
        }
      },
      (error) => {
        console.error(error);
        NotPops("error", error.message);
        setConData(null);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      off(userRef, "value", unsubscribe);
    };
  }, [user.uid, DB]);

  return ConData;
};

export const useUserDataCatch = (Status, VerStatus) => {
  const user = useContext(AuthContext);
  const [AddData, setAddData] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const [hasMorePrev, setHasMorePrev] = useState(false);
  let statusValue =
    VerStatus === "true" ? true : VerStatus === "false" ? false : null;

  const fetchData = (nextPage = false, prevPage = false) => {
    if (!user?.uid) return;

    let dataQuery;
    const dataRef = ref(DB, `users`);
    if (nextPage && lastVisible) {
      dataQuery = query(
        dataRef,
        orderByChild("CreatedDate"),
        startAfter(lastVisible.createdAt),
        limitToLast(1000)
      );
    } else if (prevPage && firstVisible) {
      dataQuery = query(
        dataRef,
        orderByChild("CreatedDate"),
        endBefore(firstVisible.createdAt),
        limitToFirst(1000)
      );
    } else if (Status && VerStatus) {
      setLoader(true);
      dataQuery = query(
        dataRef,
        orderByChild(Status),
        equalTo(statusValue),
        limitToLast(1000)
      );
    } else {
      setLoader(true);
      dataQuery = query(
        dataRef,
        orderByChild("CreatedDate"),
        limitToLast(1000)
      );
    }

    onValue(dataQuery, (snapshot) => {
      const fetchedData = [];
      snapshot.forEach((snapshot) => {
        const data = snapshot.val();
        fetchedData.push({ id: snapshot.key, ...data });
      });

      const dataReversed = fetchedData.reverse();

      if (nextPage && dataReversed.length < 100) {
        setHasMoreNext(false); // No more data to load next
      } else if (prevPage && dataReversed.length < 100) {
        setHasMorePrev(false); // No more data to load previous
      } else {
        setLastVisible(dataReversed[dataReversed.length - 1]); // Set last visible item for next
        setFirstVisible(dataReversed[0]); // Set first visible item for previous
        setHasMoreNext(true);
        setHasMorePrev(true);
      }

      setAddData((prevData) => {
        if (nextPage) {
          return [...prevData, ...dataReversed];
        } else if (prevPage) {
          return [...dataReversed, ...prevData];
        } else {
          return dataReversed;
        }
      });

      setLoader(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [user.uid, VerStatus]);

  const loadMoreNext = () => {
    if (hasMoreNext) {
      fetchData(true, false);
    }
  };

  const loadMorePrev = () => {
    if (hasMorePrev) {
      fetchData(false, true);
    }
  };

  return {
    AddData,
    Loader,
    loadMoreNext,
    loadMorePrev,
    hasMoreNext,
    hasMorePrev,
  };
};
