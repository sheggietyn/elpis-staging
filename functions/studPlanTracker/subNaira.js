const dateAdder = require("../dateadddon");
const sendWelcomeEmail = require("../emailSender/mailerSend");
const moment = require("moment");
const { ServerValue } = require("firebase-admin/database");
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
const PasserDataNaira = (amount) => {
  if (amount === 160000) {
    return {
      planType: "Elpis Plan",
      SignalType: "Elpis",
      ExpDate: dateAdder(30).toString(),
      PriceAdmin: 100,
      Token: 30000,
    };
  } else if (amount === 240000) {
    return {
      planType: "Kodesh Elite",
      SignalType: "Kodesh",
      ExpDate: dateAdder(42).toString(),
      PriceAdmin: 150,
      Token: 50000,
    };
  } else if (amount === 400000) {
    return {
      planType: "Dunamis Rahab",
      SignalType: "Dunamis",
      ExpDate: dateAdder(90).toString(),
      PriceAdmin: 250,
      Token: 100000,
    };
  }
};

const AddonSignalSubNaira = (amount) => {
  if (amount === 48000) {
    return { SubType: "Kodesh", ExpDate: dateAdder(30).toString(), Amount: 30 };
  } else if (amount === 80000) {
    return {
      SubType: "Dunamis",
      ExpDate: dateAdder(30).toString(),
      Amount: 30,
    };
  }
};
// Audited and Completed-100% Functional
const ComoSenderNaira = async (amount, myRef, email, first_name) => {
  const { planType, SignalType, ExpDate, PriceAdmin, Token } =
    PasserDataNaira(amount);
  await myRef.update({
    PlanStatus: true,
    PlanType: planType,
    PlanExpiryDate: ExpDate.toString(),
    TokenBalance: Token,
    SignalStatus: true,
    SignalPlan: SignalType,
    SignalSubExpDate: ExpDate.toString(),
    FirstTimeBuyer: false,
    Total_Subscription: ServerValue.increment(parseInt(PriceAdmin)),
    Total_Subscription_Count: ServerValue.increment(parseInt(1)),
  });
  await sendWelcomeEmailB(
    email,
    first_name,
    planType,
    StudentSubTemId,
    TitleStudentSub
  );
  await FillAddmin({
    TotalSalesAmount: ServerValue.increment(parseInt(PriceAdmin)),
    TotalActiveStudent: ServerValue.increment(parseInt(1)),
  });
};
// Audited and Completed-100% Functional
const SignalAddOnNaira = async (amount, myRef, email, first_name) => {
  const { SubType, ExpDate, Amount } = AddonSignalSubNaira(amount);

  await myRef.update({
    AddOnSignalStatus: true,
    AddOnSignalPlan: SubType,
    AddOnSignalSubExpDate: ExpDate.toString(),
    Total_Addon_Purchase: ServerValue.increment(parseInt(Amount)),
    Total_Addon_Count: ServerValue.increment(parseInt(1)),
  });

  await FillAddmin({
    TotalSignalAddonSales: ServerValue.increment(parseInt(Amount)),
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

// Affiliate Pack Purchase in NGN (Audited)--100% Working
////AffiliateRegDate: DateReshuffle,
//AffiliateFirstPayDate: Day37.toString(),
//const Day37 = dateAdder(33); //37
//const DateReshuffle = dateAdder(30);
const AffiliatePackII = async (
  myRef,
  email,
  first_name,
  ActAmount,
  userAffSnap
) => {
  const Datte = moment().format("");
  const PlanTaker =
    ActAmount === 16000 ? "Student Affiliate" : "Starter Affiliate";

  const ActAmounter = 16000 ? 10 : 25;

  await myRef.update({
    AffiliateStatus: true,
    AffiliateRank: "Starter",
    AffiliatePlan: PlanTaker,
    createdAtDate: Datte,
    Affiliate_Sub: ServerValue.increment(parseInt(ActAmounter)),
  });

  await FillAddmin({
    TotalAffiliateSales: ServerValue.increment(parseInt(ActAmounter)),
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

module.exports = { ComoSenderNaira, SignalAddOnNaira, AffiliatePackII };
