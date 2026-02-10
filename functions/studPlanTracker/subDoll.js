const sendWelcomeEmail = require("../emailSender/mailerSend");
const { ServerValue } = require("firebase-admin/database");
const moment = require("moment");
const dateAdder = require("../dateadddon");
const {
  StudentSubTemId,
  AffiliateSubTemId,
  SignalAddonTemId,
  TitleStudentSub,
  TitleAffiliateSub,
  TitleAddOnSignalSub,
  AffiliateSubTemIID,
} = require("../KeyTitle/KeyTitles");
const { FillAddmin } = require("./ArrayAff");
const sendWelcomeEmailB = require("../emailSender/mailBrevoSend");

const PasserData = (amount) => {
  if (amount === 100) {
    return {
      planType: "Elpis Plan",
      SignalType: "Elpis",
      ExpDate: dateAdder(30).toString(),
      Token: 30000,
    };
  } else if (amount === 150) {
    return {
      planType: "Kodesh Elite",
      SignalType: "Kodesh",
      ExpDate: dateAdder(42).toString(),
      Token: 50000,
    };
  } else if (amount === 250) {
    return {
      planType: "Dunamis Rahab",
      SignalType: "Dunamis",
      ExpDate: dateAdder(90).toString(),
      Token: 100000,
    };
  }
};

const AddonSignalSub = (amount) => {
  if (amount === 30) {
    return { SubType: "Kodesh", ExpDate: dateAdder(30).toString() };
  } else if (amount === 50) {
    return { SubType: "Dunamis", ExpDate: dateAdder(30).toString() };
  }
};

// This Update Plan and Addon For Plan
// Audited and Completed-100% Functional
const ComoSender = async (amount, myRef, email, first_name, db) => {
  const { planType, SignalType, ExpDate, Token } = PasserData(amount);

  await myRef.update({
    PlanStatus: true,
    PlanType: planType,
    PlanExpiryDate: ExpDate.toString(),
    SignalStatus: true,
    Token: Token,
    SignalPlan: SignalType,
    SignalSubExpDate: ExpDate.toString(),
    FirstTimeBuyer: false,
    Total_Subscription: ServerValue.increment(parseInt(amount)),
    Total_Subscription_Count: ServerValue.increment(parseInt(1)),
  });

  await FillAddmin({
    TotalSalesAmount: ServerValue.increment(parseInt(amount)),
    TotalActiveStudent: ServerValue.increment(parseInt(1)),
  });
  await sendWelcomeEmailB(
    email,
    first_name,
    planType,
    StudentSubTemId,
    TitleStudentSub
  );
};

// Audited and Completed-100% Functional
const SignalAddOn = async (amount, myRef, email, first_name) => {
  const { SubType, ExpDate } = AddonSignalSub(amount);

  await myRef.update({
    AddOnSignalStatus: true,
    AddOnSignalPlan: SubType,
    AddOnSignalSubExpDate: ExpDate.toString(),
    Total_Addon_Purchase: ServerValue.increment(parseInt(amount)),
    Total_Addon_Count: ServerValue.increment(parseInt(1)),
  });

  await FillAddmin({
    TotalSignalAddonSales: ServerValue.increment(parseInt(amount)),
    TotalSignalAddon: ServerValue.increment(parseInt(1)),
  });
  await sendWelcomeEmailB(
    email,
    first_name,
    SubType,
    SignalAddonTemId,
    TitleAddOnSignalSub
  );
};

// Affiliate Pack Purchase in USD (Audited)--100% Working
////AffiliateRegDate: DateReshuffle,
//AffiliateFirstPayDate: Day37.toString(),
//const Day37 = dateAdder(33); //37
//const DateReshuffle = dateAdder(30);
const AffiliatePack = async (
  myRef,
  email,
  first_name,
  ActAmount,
  userAffSnap
) => {
  const Datte = moment().format("");
  const PlanTaker =
    ActAmount === 10 ? "Student Affiliate" : "Starter Affiliate";

  await myRef.update({
    AffiliateStatus: true,
    AffiliateRank: "Starter",
    AffiliatePlan: PlanTaker,
    createdAtDate: Datte,
    Affiliate_Sub: ServerValue.increment(parseInt(ActAmount)),
  });

  await FillAddmin({
    TotalAffiliateSales: ServerValue.increment(parseInt(ActAmount)),
    TotalAffiliates: ServerValue.increment(parseInt(1)),
  });
  if (email && first_name && AffiliateSubTemId && TitleAffiliateSub) {
    await sendWelcomeEmailB(
      email,
      first_name,
      "Starter",
      AffiliateSubTemId,
      TitleAffiliateSub
    );
  }
  if (userAffSnap.exists()) {
    const affData = userAffSnap.val();
    if (!affData.Email) {
      return;
    }
    await sendWelcomeEmailB(
      affData.Email,
      affData.Firstname,
      "Starter",
      AffiliateSubTemIID,
      TitleAffiliateSub
    );
  }
};

const SendDeepDowner = async (
  userAffSnapDowner,
  userAffRefDowner,
  DeepDowmlinerList
) => {
  if (userAffSnapDowner.exists()) {
    const affDataDowner = userAffSnapDowner.val();
    if (
      affDataDowner.AffiliateStatus &&
      (affDataDowner.AffiliateRank === "Gibbor Ruby" ||
        affDataDowner.AffiliateRank === "Zion Director")
    ) {
      await userAffRefDowner.update({
        Earning_This_Month: ServerValue.increment(parseInt(5)),
        Aff_Total_Earning: ServerValue.increment(parseInt(5)),
        Override_Earning: ServerValue.increment(parseInt(5)),
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
      await userAffRefDowner.update({
        Earning_This_Month: ServerValue.increment(parseInt(10)),
        Aff_Total_Earning: ServerValue.increment(parseInt(10)),
        Override_Earning: ServerValue.increment(parseInt(10)),
      });
      await DeepDowmlinerList.update({
        Status: "success",
        Earning: 10,
      });
    }
  }
};

module.exports = { ComoSender, SignalAddOn, AffiliatePack, SendDeepDowner };
