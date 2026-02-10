const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = global.fetch;
const { ServerValue } = require("firebase-admin/database");
const sendWelcomeEmail = require("../emailSender/mailerSend");
const { ExportCalator } = require("../studPlanTracker/studPlanner");
const { SendDeepDowner, AffiliatePack } = require("../studPlanTracker/subDoll");
const {
  ComoSenderNaira,
  SignalAddOnNaira,
  AffiliatePackII,
} = require("../studPlanTracker/subNaira");
const { DocId } = require("../plantacker");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();

module.exports = functions.https.onRequest(async (req, res) => {
  const { event, data } = req.body;
  console.log("📨 Paystack webhook received:", { event, data });
  if (event !== "charge.success") {
    return res.status(200).json({ message: "Event ignored" });
  }
  const { reference, amount, currency, customer } = data;
  const { email, first_name, last_name } = customer;
  const refId = reference;

  // Amount Plan Passer
  const amountInNGN = amount / 100;

  try {
    // Checking if transaction exist in Transaction List
    const orderRef = db.ref(`Transaction List/${refId}`);
    const orderSnap = await orderRef.once("value");

    if (!orderSnap.exists()) {
      console.error("❌ Order not found", { refId });
      return res.status(404).send("Order not found");
    }

    const orderData = orderSnap.val();

    if (orderData.Payment_Status === "success") {
      console.log("ℹ️ Order already processed", { refId });
      return res.status(200).send("Order already processed");
    }

    const userId = orderData.userId;
    const TxRef = db.ref(`All Transactions/${userId}/${userId}/${refId}`);
    const AdminRef = db.ref(`All Admin Affiliates/${userId}`);
    const whoRefMe = orderData.MyTop_Aff_Id;
    const WhoRefUpdate = db.ref(
      `My Affiliates Caster/${whoRefMe}/${whoRefMe}/${userId}`
    );

    const AffTxRef = db.ref(
      `Affiliate New Earnings/${whoRefMe}/${whoRefMe}/${userId}`
    );

    // This is the real transaction initiator's user ID and Info
    const myRef = db.ref(`users/${userId}`);
    const mySnap = await myRef.once("value");
    const myData = mySnap.val();

    // Affiliate Id That Was Passed With the Transaction Data, Use it to Fetch Their User Data, if There is
    const userAffRef = db.ref(`users/${whoRefMe}`);
    const userAffSnap = await userAffRef.once("value");
    const SendRef = db.ref(`Affiliate Admin Earn/${DocId}`);

    // Allocate Student Plan After Payment
    // Update There Signal Plan Status to Match the plan they Purchase
    // Check If They where refferred by someone
    // Check if someone reffered the person that reffered them
    // Check the Current Affiliate Level They Are In
    // Pay Theme Accourding to the affiliate Level They are in
    // Check if the person that referred them is eligible for override earning
    // Affiliate Fast track bonus one time when the person i refer purchase something over $150

    if (orderData.TypeSub === "Student Sub") {
      if (userAffSnap.exists()) {
        const affData = userAffSnap.val();

        if (affData.AffiliateStatus) {
          // This will be used to reward affiliates/check for rank and reward according
          // Track Rank, PayFallBackBonus, Pay Monthly Pay
          await ExportCalator(
            affData,
            myData,
            userAffRef,
            WhoRefUpdate,
            orderData,
            amountInNGN,
            AffTxRef,
            SendRef,
            myData.Username,
            whoRefMe,
            AdminRef
          );
        }

        //This will be used to reward override bonuses if the person that
        //refered the transaction initiator was also referred by someone

        const DownlineofMyRefId = affData.Refferral_Id;

        const userAffRefDowner = db.ref(`users/${DownlineofMyRefId}`);
        const userAffSnapDowner = await userAffRefDowner.once("value");
        const DeepDowmlinerList = db.ref(
          `My DeepLinkers/${DownlineofMyRefId}/${DownlineofMyRefId}/${userId}`
          //Deep Downline
        );

        await SendDeepDowner(
          userAffSnapDowner,
          userAffRefDowner,
          DeepDowmlinerList
        );
      }
      await ComoSenderNaira(amountInNGN, myRef, email, first_name);
    }
    // Audited and Completed-100% Functional
    if (orderData.TypeSub === "Signal Sub") {
      await SignalAddOnNaira(amountInNGN, myRef, email, first_name);
    }
    //Audited Pass Audition
    if (orderData.TypeSub === "Affiliate Sub") {
      await AffiliatePackII(myRef, email, first_name, amountInNGN, userAffSnap);
    }
    await orderRef.update({
      Payment_Status: "success",
    });

    await TxRef.update({
      Payment_Status: "success",
    });
    return res.status(200).send("Payment processed successfully");
  } catch (e) {
    console.log("Error Message From Data", e.message);
    return res.status(500).send("Internal Server Error");
  }
});
