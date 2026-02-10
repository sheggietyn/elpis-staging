const { ReferalTemId, TitleReferalIn } = require("../KeyTitle/KeyTitles");
const dateAdder = require("../dateadddon");
const sendWelcomeEmailB = require("../emailSender/mailBrevoSend");
const { ExportTrcker } = require("./studPlanner");
const { ServerValue } = require("firebase-admin/database");
const moment = require("moment");
const NewDate = moment().format("");
const ExportAfffCalculator = async (
  affData,
  myData,
  userAffRef,
  WhoRefUpdate,
  orderData,
  AffTxRef,
  SendRef,
  UserN,
  whoRefMe,
  AdminRef
) => {
  const {
    Email,
    Firstname,
    Username,
    monthly_Affiliate_Count,
    Aff_Total_Paid_Refferal,
  } = affData;
  const { Plan, Amount_In: amount } = orderData;
  const affCount = parseInt(monthly_Affiliate_Count) + 1;
  const { Pay, RankName, FastStartBonus, ReqCom } = ExportTrcker(affCount);
  const Day37 = dateAdder(35); //37
  const Day30 = dateAdder(30); //37

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
  //New User Affiliate start counting
  const { FastTracker, FastTrackerCombo, Payer } = Drovver();

  if (parseInt(monthly_Affiliate_Count) < 1 && Aff_Total_Paid_Refferal < 1) {
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
    Refferalby: Username,
    AffEmail: Email,
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
  await sendWelcomeEmailB(Email, Firstname, Plan, ReferalTemId, TitleReferalIn);
};
module.exports = { ExportAfffCalculator };
