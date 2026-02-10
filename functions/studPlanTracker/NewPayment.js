const { ServerValue } = require("firebase-admin/database");
const moment = require("moment");
const sendWelcomeEmailB = require("../emailSender/mailBrevoSend");
const { FillAddmin } = require("./ArrayAff");
const {
  AffiliateSubTemId,
  TitleAffiliateSub,
  AffiliateSubTemIID,
  StudentSubTemId,
  TitleStudentSub,
  SignalAddonTemId,
  TitleAddOnSignalSub,
} = require("../KeyTitle/KeyTitles");

const newSubPayment = async (data, myRef) => {
  const { planType, SignalType, ExpDate, Token, Email, FirstName, Amount_In } =
    data;
  await myRef.update({
    PlanStatus: true,
    PlanType: planType,
    PlanExpiryDate: ExpDate.toString(),
    TokenBalance: Token,
    SignalStatus: true,
    SignalPlan: SignalType,
    SignalSubExpDate: ExpDate.toString(),
    FirstTimeBuyer: false,
    Total_Subscription: ServerValue.increment(parseInt(Amount_In)),
    Total_Subscription_Count: ServerValue.increment(parseInt(1)),
  });
  await sendWelcomeEmailB(
    Email,
    FirstName,
    planType,
    StudentSubTemId,
    TitleStudentSub
  );
  await FillAddmin({
    TotalSalesAmount: ServerValue.increment(parseInt(Amount_In)),
    TotalActiveStudent: ServerValue.increment(parseInt(1)),
  });
};

const affNewPayment = async (data, myRef, userAffSnap) => {
  const { Email, FirstName, ActAmount, AffPay, planType } = data;
  const Datte = moment().format("");
  await myRef.update({
    AffiliateStatus: true,
    AffiliateRank: "Starter",
    AffiliatePlan: planType,
    createdAtDate: Datte,
    Affiliate_Sub: ServerValue.increment(parseInt(AffPay)),
  });
  if (Email && FirstName && AffiliateSubTemId && TitleAffiliateSub) {
    await sendWelcomeEmailB(
      Email,
      FirstName,
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
const SignalNewPayment = async (data, myRef) => {
  const { planType, ExpDate, Amount_In, FirstName, Email } = data;

  await myRef.update({
    AddOnSignalStatus: true,
    AddOnSignalPlan: planType,
    AddOnSignalSubExpDate: ExpDate.toString(),
    Total_Addon_Purchase: ServerValue.increment(parseInt(Amount_In)),
    Total_Addon_Count: ServerValue.increment(parseInt(1)),
  });

  await FillAddmin({
    TotalSignalAddonSales: ServerValue.increment(parseInt(Amount_In)),
    TotalSignalAddon: ServerValue.increment(parseInt(1)),
  });
  await sendWelcomeEmailB(
    Email,
    FirstName,
    planType,
    SignalAddonTemId,
    TitleAddOnSignalSub
  );
};

module.exports = { newSubPayment, affNewPayment, SignalNewPayment };
