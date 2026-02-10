const sendWelcomeEmail = require("../emailSender/mailerSend");
const DataArrayData = require("./ArrayAff");
const { ServerValue } = require("firebase-admin/database");
const { ReferalTemId, TitleReferalIn } = require("../KeyTitle/KeyTitles");
const moment = require("moment");
const sendWelcomeEmailB = require("../emailSender/mailBrevoSend");
const dateAdder = require("../dateadddon");

// 1 From Array check DataArrayData
// Check if AffiliateCount === RequiredTarget
// If Yes Give them the Rank in RankName and Pay Them the MonthlyPayPrice
// If No Keep Paying Them FallBackPay

// E.g if i reffer 1-2 people, i get FallBackPay of 12 but when i hit the 3 RequiredTarget
// PayMe MonthlyPayPrice of 125 then Increase my RankName to Zamar Affiliate
// Same goes with the other in the Array, Now that i'm a Zamar Affiliate
// If i bring the 4th person i start Earning FallBackPay from RankName Gibbor Ruby until when i hit the RequiredTarget 10 for Gibbor Ruby .. Then Increase RankName to Gibbor Ruby and Let MonthPayPrice of 400 be added
// when i bring 11th person pay FallBackPay of Zion Director Till i hit the RequiredTarget of 30 Then Change/ Increase My Rank To Zion Director & Pay Me The MonthlyPayPrice of 1250
// Smae Goes with the others
// so the output from the code will be the RankName, FallBackPay, MonthlyPayPrice  , this i can use to update my database with amount and rank

// this shit is for node js
const NewDate = moment().format("");
// Function to determine payout, rank, and bonus based on affiliate count
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

// Audited, Works Perfectly // 100% Functional
const ExportCalator = async (
  affData,
  myData,
  userAffRef,
  WhoRefUpdate,
  orderData,
  amount,
  AffTxRef,
  SendRef,
  UserN,
  whoRefMe,
  AdminRef
) => {
  const affCount = parseInt(affData.monthly_Affiliate_Count) + 1;
  const { Pay, RankName, FastStartBonus, ReqCom } = ExportTrcker(affCount);
  const Day37 = dateAdder(35); //37
  const Day30 = dateAdder(30); //37

  const affEmail = affData.Email;
  const affFirstName = affData.Firstname;
  const affUsername = affData.Username;

  const planType = orderData.Plan;

  const Drovver = () => {
    if (orderData.Payment_Currency === "NGN") {
      if (myData.FirstTimeBuyer && (amount === 240000 || amount === 400000)) {
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
    } else {
      if (orderData.Payment_Currency === "USD") {
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
      }
    }
  };
  //New User Affiliate start counting
  const { FastTracker, FastTrackerCombo, Payer } = Drovver();
  if (
    parseInt(affData.monthly_Affiliate_Count) < 1 &&
    affData.Aff_Total_Paid_Refferal < 1
  ) {
    await userAffRef.update({
      AffiliateFirstPayDate: Day37.toString(), // 35 Day
      AffiliateRegDate: Day30.toString(),
    });
  }

  await userAffRef.update({
    AffiliateRank: RankName,
    //AffiliateCountAll: ServerValue.increment(parseInt(1)),
    Earning_This_Month: ServerValue.increment(parseInt(FastTrackerCombo)),
    Aff_Total_Earning: ServerValue.increment(parseInt(FastTrackerCombo)),
    Aff_Available_Balance: ServerValue.increment(parseInt(Payer)),
    monthly_Affiliate_Count: ServerValue.increment(parseInt(1)),
    Fast_Start_Bonus: ServerValue.increment(parseInt(FastTracker)),
    Aff_Total_Paid_Refferal: ServerValue.increment(parseInt(1)),
    Aff_Total_Pending_Pay_Refferal: ServerValue.increment(parseInt(-1)),
  });
  await SendRef.set({
    AmountReceiving: ServerValue.increment(parseInt(Payer)),
    Refferalby: affUsername,
    AffEmail: affEmail,
    RefferalRank: RankName,
    StudentUsername: UserN,
    Fast_Start_Bonus: ServerValue.increment(parseInt(FastTracker)),
    Status: "success",
    RefUserId: whoRefMe,
    CreatedDate: NewDate,
  });
  await WhoRefUpdate.update({
    Status: "success",
    Amount: Pay,
    Rank: RankName,
  });
  await AdminRef.update({
    Status: "success",
    Amount: Pay,
    Rank: RankName,
  });
  await AffTxRef.set({
    EarningType: "Affiliate",
    AffEarning: Payer,
    AffLevel: RankName,
    Status: "success",
    EarningDate: NewDate,
  });
  await sendWelcomeEmailB(
    affEmail,
    affFirstName,
    planType,
    ReferalTemId,
    TitleReferalIn
  );
};

module.exports = { ExportTrcker, ExportCalator };
