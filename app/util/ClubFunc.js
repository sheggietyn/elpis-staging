import { get, increment, ref, remove, update } from "firebase/database";
import { DB } from "../Firebase/AuthHolder";
import { DateAdder, NotPops } from "./ToastLoader";

const ExportTrcker = (affiliateCount) => {
  // ✅ If affiliate count is less than 3 (0, 1, 2)
  if (affiliateCount < 3) {
    return { Pay: 12, RankName: "Starter", FastStartBonus: 0 };
  }
  // ✅ If affiliate count is exactly 3
  else if (affiliateCount === 3) {
    return {
      Pay: 101,
      RankName: "Zamar Affiliate",
      FastStartBonus: 15,
      ReqCom: 3,
    };
  }
  // ✅ If affiliate count is between 4–9
  else if (affiliateCount > 3 && affiliateCount < 10) {
    return { Pay: 15, RankName: "Zamar Affiliate", FastStartBonus: 15 };
  }
  // ✅ If affiliate count is exactly 10
  else if (affiliateCount === 10) {
    return {
      Pay: 310,
      RankName: "Gibbor Ruby",
      FastStartBonus: 20,
      ReqCom: 10,
    };
  }
  // ✅ If affiliate count is between 11–29
  else if (affiliateCount > 10 && affiliateCount < 30) {
    return { Pay: 20, RankName: "Gibbor Ruby", FastStartBonus: 20 };
  }
  // ✅ If affiliate count is exactly 30
  else if (affiliateCount === 30) {
    return {
      Pay: 870,
      RankName: "Zion Director",
      FastStartBonus: 25,
      ReqCom: 30,
    };
  }
  // ✅ If affiliate count is between 31–59
  else if (affiliateCount > 30 && affiliateCount < 60) {
    return { Pay: 20, RankName: "Zion Director", FastStartBonus: 25 };
  }
  // ✅ If affiliate count is exactly 60
  else if (affiliateCount === 60) {
    return {
      Pay: 2420,
      RankName: "Archo Diamond",
      FastStartBonus: 25,
      ReqCom: 60,
    };
  }
  // ✅ If affiliate count is between 61–79
  else if (affiliateCount > 60 && affiliateCount < 80) {
    return { Pay: 20, RankName: "Archo Diamond", FastStartBonus: 25 };
  }

  // ✅ If affiliate count is between 81–129
  else if (affiliateCount > 80 && affiliateCount < 130) {
    return { Pay: 25, RankName: "Archo Diamond", FastStartBonus: 25 };
  }
  // ✅ If affiliate count is exactly 130
  else if (affiliateCount === 130) {
    return {
      Pay: 3395,
      RankName: "Eliot Platinum",
      FastStartBonus: 25,
      ReqCom: 130,
    };
  }
  // ✅ If affiliate count is between 131–149
  else if (affiliateCount > 130 && affiliateCount < 150) {
    return { Pay: 25, RankName: "Eliot Platinum", FastStartBonus: 25 };
  }
  // ✅ If affiliate count is between 151–199
  else if (affiliateCount > 150 && affiliateCount < 200) {
    return { Pay: 25, RankName: "Eliot Platinum", FastStartBonus: 25 };
  }
  // ✅ If affiliate count is exactly 200
  else if (affiliateCount === 200) {
    return {
      Pay: 8275,
      RankName: "Kodesh Legend",
      FastStartBonus: 30,
      ReqCom: 200,
    };
  }
};
const SendDeepDowner = async (
  userAffSnapDowner,
  userAffRefDowner,
  DeepDowmlinerList
) => {
  if (userAffSnapDowner.exists()) {
    const affDataDowner = userAffSnapDowner.val(); //userAffSnap
    if (
      affDataDowner.AffiliateStatus &&
      (affDataDowner.AffiliateRank === "Gibbor Ruby" ||
        affDataDowner.AffiliateRank === "Zion Director")
    ) {
      await update(userAffRefDowner, {
        Earning_This_Month: increment(parseInt(5)),
        Aff_Total_Earning: increment(parseInt(5)),
        Override_Earning: increment(parseInt(5)),
      });
      await DeepDowmlinerList.update({
        Status: "success",
        Earning: 5,
      });
    }

    if (
      affDataDowner.AffiliateStatus &&
      (affDataDowner.AffiliateRank === "Archo Diamond" ||
        affDataDowner.AffiliateRank === "Elion Platinum" ||
        affDataDowner.AffiliateRank === "Kodesh Legend")
    ) {
      await update(userAffRefDowner, {
        Earning_This_Month: increment(parseInt(10)),
        Aff_Total_Earning: increment(parseInt(10)),
        Override_Earning: increment(parseInt(10)),
      });
      await update(DeepDowmlinerList, {
        Status: "success",
        Earning: 10,
      });
    }
  }
};

export const ExportCalator = async (
  affData,
  myData,
  amount,
  whoRefMe,
  DocId,
  NewDate,
  PopLoading,
  StopLoad,
  NewDateII
) => {
  const affCount = parseInt(affData.monthly_Affiliate_Count) + 1;
  const { Pay, RankName, FastStartBonus, ReqCom } = ExportTrcker(affCount);

  const affEmail = affData.Email;
  const affUsername = affData.Username;
  const Username = myData.Username;

  const Drovver = () => {
    if (myData.FirstTimeBuyer && (amount === 150 || amount === 250)) {
      return {
        FastTracker: FastStartBonus,
        FastTrackerCombo: Pay + FastStartBonus,
        Payer: Pay,
      };
    } else {
      return {
        FastTracker: 0,
        FastTrackerCombo: Pay,
        Payer: Pay,
      };
    }
  };

  const { FastTracker, FastTrackerCombo, Payer } = Drovver();

  try {
    if (
      parseInt(affData.monthly_Affiliate_Count) < 1 &&
      affData.Aff_Total_Paid_Refferal < 1
    ) {
      await userAffRef.update({
        AffiliateFirstPayDate: DateAdder(35).toString(), // 35 Day
        AffiliateRegDate: DateAdder(30).toString(),
      });
    }
    await update(ref(DB, `Affiliate Admin Earn/${DocId}`), {
      AmountReceiving: increment(parseInt(Payer)),
      Refferalby: affUsername,
      AffEmail: affEmail,
      RefferalRank: RankName,
      StudentUsername: myData.Username,
      Fast_Start_Bonus: increment(parseInt(FastTracker)),
      Status: "success",
      RefUserId: whoRefMe,
      CreatedDate: NewDateII,
    });
    await update(ref(DB, `users/${myData.id}`), {
      FirstTimeBuyer: false,
      Refferral_Id: affData.id,
      ReferUsername: affUsername,
    });

    await update(ref(DB, `users/${whoRefMe}`), {
      AffiliateRank: RankName,
      AffiliateCountAll: increment(parseInt(1)),
      Earning_This_Month: increment(parseInt(FastTrackerCombo)),
      Aff_Total_Earning: increment(parseInt(FastTrackerCombo)),
      Aff_Available_Balance: increment(parseInt(Payer)),
      monthly_Affiliate_Count: increment(parseInt(1)),
      Fast_Start_Bonus: increment(parseInt(FastTracker)),
      Aff_Total_Paid_Refferal: increment(parseInt(1)),
      //AffiliateFirstPayDate: DateAdder(12).toString(),
    });

    await update(
      ref(DB, `My Affiliates Caster/${whoRefMe}/${whoRefMe}/${myData.id}`),
      {
        Status: "success",
        Amount: Pay,
        Rank: RankName,
        Username: Username,
        FullName: `${myData.Firstname} ${myData.Lastname}`,
        PhoneNumber: `+${myData.PhoneNos}`,
        Email: myData.Email,
        Affiliate_UserId: myData.id,
        Aff_Type: "Direct Referral",
        ReferalUID: "",
        AccId: myData.AccountId,
        Refered_By_Me_Id: whoRefMe,
        Refered_By_Me_Name: affUsername,
        createdAt: NewDateII,
      }
    );
    await update(ref(DB, `All Admin Affiliates/${myData.id}`), {
      Status: "success",
      Amount: Pay,
      Rank: RankName,
      Username: Username,
      FullName: `${myData.Firstname} ${myData.Lastname}`,
      PhoneNumber: `+${myData.PhoneNos}`,
      Email: myData.Email,
      Affiliate_UserId: myData.id,
      Aff_Type: "Direct Referral",
      ReferalUID: "",
      AccId: myData.AccountId,
      Refered_By_Me_Id: whoRefMe,
      Refered_By_Me_Name: affUsername,
      createdAt: NewDateII,
    });
    await update(
      ref(DB, `Affiliate New Earnings/${whoRefMe}/${whoRefMe}/${myData.id}`),
      {
        EarningType: "Affiliate",
        AffEarning: Payer,
        AffLevel: RankName,
        Status: "success",
        EarningDate: NewDateII,
      }
    );

    if (parseInt(affData.monthly_Affiliate_Count) < 1) {
      await update(ref(DB, `users/${whoRefMe}`), {
        AffiliateFirstPayDate: DateAdder(35).toString(),
      });
    }

    // 🔥 Check if user with affData.Refferal_Id exists
    const checkUserRef = ref(DB, `users/${affData.Refferal_Id}`);
    const snapshot = await get(checkUserRef);

    if (snapshot.exists()) {
      // ✅ Only run this if user exists
      const DownlineofMyRefId = affData.Refferral_Id;

      const DeepDowmlinerList = ref(
        DB,
        `My DeepLinkers/${DownlineofMyRefId}/${DownlineofMyRefId}/${myData.id}`
      );

      SendDeepDowner(snapshot, checkUserRef, DeepDowmlinerList);
    }
    PopLoading();
    NotPops("success", `New affiliate assigned to ${affUsername} `);
  } catch (e) {
    NotPops("error", e.message);
    StopLoad();
  }
};

//assigning an refferal to a new affiliate
export const ChangeAffToNew = async (
  affData,
  myData,
  amount,
  whoRefMe,
  DocId,
  NewDate,
  PopLoading,
  StopLoad
) => {
  const affCount = parseInt(affData.monthly_Affiliate_Count);
  const { Pay, RankName, FastStartBonus, ReqCom } = ExportTrcker(affCount);
  //const affEmail = affData.Email;
  const affUsername = affData.Username;
  const Username = myData.Username;
  try {
    if (myData.Refferal_Id) {
      const renderRef = ref(
        DB,
        `My Affiliates Caster/${myData.Refferal_Id}/${myData.Refferal_Id}/${myData.id}`
      );
      await remove(renderRef);
    }
    await update(ref(DB, `users/${myData.id}`), {
      Refferral_Id: affData.id,
      ReferUsername: affUsername,
    });

    await update(
      ref(DB, `My Affiliates Caster/${whoRefMe}/${whoRefMe}/${myData.id}`),
      {
        Status: "success",
        Amount: 0,
        Rank: RankName,
        Username: Username,
        FullName: `${myData.Firstname} ${myData.Lastname}`,
        PhoneNumber: `+${myData.PhoneNos}`,
        Email: myData.Email,
        Affiliate_UserId: myData.id,
        Aff_Type: "Switch Referral",
        ReferalUID: "",
        AccId: myData.AccountId,
        Refered_By_Me_Id: whoRefMe,
        Refered_By_Me_Name: affUsername,
        createdAt: NewDate,
      }
    );
    await update(ref(DB, `All Admin Affiliates/${myData.id}`), {
      Status: "success",
      Amount: 0,
      Rank: RankName,
      Username: Username,
      FullName: `${myData.Firstname} ${myData.Lastname}`,
      PhoneNumber: `+${myData.PhoneNos}`,
      Email: myData.Email,
      Affiliate_UserId: myData.id,
      Aff_Type: "Switch Referral",
      ReferalUID: "",
      AccId: myData.AccountId,
      Refered_By_Me_Id: whoRefMe,
      Refered_By_Me_Name: affUsername,
      createdAt: NewDate,
    });
    PopLoading();
    NotPops("success", `Switch affiliate assigned to ${affUsername} `);
  } catch (e) {
    NotPops("error", e.message);
    StopLoad();
  }
};
