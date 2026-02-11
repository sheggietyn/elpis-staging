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

export const CourseDataList = (passer) => {
  const user = useContext(AuthContext);
  const [CourseData, setCourseData] = useState([]);
  const [LoadTri, setLoadTri] = useState(true);

  useEffect(() => {
    if (!user?.uid || !passer) return;

    const CrsUrl = `Courses List/${passer}/${passer}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("CreatedDate"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setCourseData(fetchedData.reverse());
        setLoadTri(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid, passer]);

  return { CourseData, LoadTri };
};

export const ModuleList = (CourseId) => {
  const user = useContext(AuthContext);
  const [ModuleData, setModuleData] = useState([]);
  const [LoadTri, setLoadTri] = useState(true);

  useEffect(() => {
    if (!user?.uid || !CourseId) return;

    const CrsUrl = `Courses Modules/Modules/${CourseId}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("CreatedDate"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setModuleData(fetchedData.reverse());
        setLoadTri(false);
      });
    };

    fetchData();
  }, [user?.uid, CourseId]);

  return { ModuleData, LoadTri };
};

export const VaultList = (passer) => {
  const user = useContext(AuthContext);
  const [resData, setResData] = useState([]);
  const [LoadTri, setLoadTri] = useState(true);

  useEffect(() => {
    if (!user?.uid || !passer) return;
    dispatchEvent;
    const CrsUrl = `Vault/${passer}/${passer}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("ListingDate"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setResData(fetchedData.reverse());
        setLoadTri(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid, passer]);

  return { resData, LoadTri };
};
export const PaymentList = (passer, VerStatus) => {
  const user = useContext(AuthContext);
  const [PayData, setPayData] = useState([]);
  const [LoadTri, setLoadTri] = useState(true);

  useEffect(() => {
    if (!user?.uid || !passer) return;

    const CrsUrl = `${passer}`;
    const dataRef = ref(DB, CrsUrl);
    let dataQuery;
    if (VerStatus) {
      setLoadTri(true);
      dataQuery = query(
        dataRef,
        orderByChild("Payment_Status"),
        equalTo(VerStatus),
        limitToLast(1000),
      );
    } else {
      setLoadTri(true);
      dataQuery = query(
        dataRef,
        orderByChild("Payment_Date"),
        limitToLast(1000),
      );
    }

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setPayData(fetchedData.reverse());
        setLoadTri(false);
      });
    };

    fetchData();
  }, [user?.uid, passer, VerStatus]);

  return { PayData, LoadTri };
};

export const AffiliateEarningList = () => {
  const user = useContext(AuthContext);
  const [AffCashData, setAffCashData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Affiliate New Earnings/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("EarningDate"),
      limitToLast(20),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffCashData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { AffCashData, LoadData };
};

export const AffiliateCashout = () => {
  const user = useContext(AuthContext);
  const [AffCashOutData, setAffCashOutData] = useState([]);
  const [LoadAffData, setLoadAffData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Affiliate Cashout/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("CreatedDate"),
      limitToLast(20),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffCashOutData(fetchedData.reverse());
        setLoadAffData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { AffCashOutData, LoadAffData };
};

export const AffiliateTeamList = () => {
  const user = useContext(AuthContext);
  const [AffTeamData, setAffTeamData] = useState([]);
  const [LoadAffData, setLoadAffData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `My Affiliates Caster/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("createdAt"),
      limitToLast(30),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffTeamData(fetchedData.reverse());
        setLoadAffData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { AffTeamData, LoadAffData };
};

export const OverideTeamList = () => {
  const user = useContext(AuthContext);
  const [OverTeamData, setOverTeamData] = useState([]);
  const [LoadOverData, setLoadOverData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `My DeepLinkers/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("createdAt"),
      limitToLast(20),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setOverTeamData(fetchedData.reverse());
        setLoadOverData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { OverTeamData, LoadOverData };
};

export const BibleVerse = () => {
  const user = useContext(AuthContext);
  const [BibleData, setBibleData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Bible Verse`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("PostTime"), limitToLast(1));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setBibleData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { BibleData, LoadData };
};

export const BibleVerseTwo = () => {
  const user = useContext(AuthContext);
  const [BibleData, setBibleData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Bible Verse`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("PostTime"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setBibleData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { BibleData, LoadData };
};

export const AffAdminListII = () => {
  const user = useContext(AuthContext);
  const [AffListData, setAffListData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `All Admin Affiliates`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("createdAt"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffListData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { AffListData, LoadData };
};

export const AffAdminList = () => {
  const user = useContext(AuthContext);
  const [AffListData, setAffListData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `users`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("AffiliateStatus"),
      equalTo(true),
      limitToLast(1000),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffListData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { AffListData, LoadData };
};

export const AffAdminReff = (UserKey) => {
  const user = useContext(AuthContext);
  const [AffRefData, setAffRefData] = useState([]);
  const [LoadDataII, setLoadDataII] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `My Affiliates Caster/${UserKey}/${UserKey}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("createdAt"),
      limitToLast(1000),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setAffRefData(fetchedData.reverse());
        setLoadDataII(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid, UserKey]);

  return { AffRefData, LoadDataII };
};
export const AffAdminEarnList = () => {
  const user = useContext(AuthContext);
  const [EarnListData, setEarnListData] = useState([]);
  const [LoadaData, setLoadaData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Affiliate Admin Earn`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("CreatedDate"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setEarnListData(fetchedData.reverse());
        setLoadaData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { EarnListData, LoadaData };
};

export const AffCashoutList = () => {
  const user = useContext(AuthContext);
  const [EarnCashData, setEarnCashData] = useState([]);
  const [LoadCsData, setLoadCsData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Admin Affiliate Cashout`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("Payment_Date"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setEarnCashData(fetchedData.reverse());
        setLoadCsData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { EarnCashData, LoadCsData };
};

export const QoutesList = () => {
  const user = useContext(AuthContext);
  const [ListData, setListData] = useState([]);
  const [LoadListData, setLoadListData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Daily Qoutes`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("PostTime"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setListData(fetchedData.reverse());
        setLoadListData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { ListData, LoadListData };
};

export const BankAccountList = () => {
  const user = useContext(AuthContext);
  const [BankData, setBankData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Bank Accounts/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, limitToLast(4));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setBankData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { BankData, LoadData };
};

export const NewsPushData = () => {
  const user = useContext(AuthContext);
  const [PostData, setPostData] = useState([]);
  const [LoadTri, setLoadTri] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const DataAds = query(ref(DB, `All News Post`), orderByChild("PostTitle"));

    const fetchData = () => {
      onValue(DataAds, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snapshot) => {
          const { PostTitle, PostBody, PostImage, PostDate } = snapshot.val();
          fetchedData.push({
            id: snapshot.key,
            PostTitle,
            PostBody,
            PostImage,
            PostDate,
          });
        });
        const Drarry = fetchedData.reverse();
        setPostData(Drarry);
        setLoadTri(false);
      });
    };

    fetchData();
  }, [user.uid]);

  return { PostData, LoadTri };
};

export const EventDataList = () => {
  const user = useContext(AuthContext);
  const [EvntData, setEvntData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const dataRef = ref(DB, "Live Session");
    const dataQuery = query(dataRef, limitToLast(1));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setEvntData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { EvntData, LoadData };
};

export const OverideTeamListII = (UserKey) => {
  const user = useContext(AuthContext);
  const [OverTeamData, setOverTeamData] = useState([]);
  const [LoadOverData, setLoadOverData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `My DeepLinkers/${UserKey}/${UserKey}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("createdAt"),
      limitToLast(1000),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setOverTeamData(fetchedData.reverse());
        setLoadOverData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { OverTeamData, LoadOverData };
};

export const ChatList = (ChatId) => {
  const user = useContext(AuthContext);
  const [ChatData, setChatData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Eva Request Users/${user.uid}/${ChatId}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("DateAdded"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setChatData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid, ChatId]);

  return { ChatData, LoadData };
};

export const ChatListHis = () => {
  const user = useContext(AuthContext);
  const [ChatListData, setChatListData] = useState([]);
  const [LoadListData, setLoadListData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const CrsUrl = `Eva Chat List Display/${user.uid}/${user.uid}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("DateAdded"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setChatListData(fetchedData.reverse());
        setLoadListData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { ChatListData, LoadListData };
};

export const EvaChatList = () => {
  const user = useContext(AuthContext);
  const [ChatData, setChatData] = useState([]);
  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Eva Request(Admin)`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("DateAdded"),
      limitToLast(150),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setChatData(fetchedData.reverse());
        setLoadData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid]);

  return { ChatData, LoadData };
};

export const DisplayChatList = (userId) => {
  const user = useContext(AuthContext);
  const [ChatDisData, setChatDisData] = useState([]);
  const [LoadDisData, setLoadDisData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Eva Request Users/${userId}/${userId}`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(dataRef, orderByChild("dateAdded"));

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setChatDisData(fetchedData);
        setLoadDisData(false);
      });
    };

    fetchData();

    // Optional: cleanup listener if needed
    return () => {
      // off(dataRef); // Uncomment if using `on` instead of `onValue`
    };
  }, [user?.uid, userId]);

  return { ChatDisData, LoadDisData };
};

export const DisplayUserList = () => {
  const user = useContext(AuthContext);
  const [ChatUserData, setChatUserData] = useState([]);
  const [LoadNowData, setLoadNowData] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const CrsUrl = `Eva Bot Users`;
    const dataRef = ref(DB, CrsUrl);
    const dataQuery = query(
      dataRef,
      orderByChild("DateAdded"),
      limitToLast(100),
    );

    const fetchData = () => {
      onValue(dataQuery, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((snap) => {
          fetchedData.push({ id: snap.key, ...snap.val() });
        });
        setChatUserData(fetchedData.reverse());
        setLoadNowData(false);
      });
    };

    fetchData();

    return () => {};
  }, [user?.uid]);

  return { ChatUserData, LoadNowData };
};
