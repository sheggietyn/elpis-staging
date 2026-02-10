const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = global.fetch;
const { ServerValue } = require("firebase-admin/database");
const moment = require("moment");
const { ExportCalator } = require("../studPlanTracker/studPlanner");
const {
  ComoSender,
  SignalAddOn,
  AffiliatePack,
  SendDeepDowner,
} = require("../studPlanTracker/subDoll");
const { DocId } = require("../plantacker");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();
module.exports = functions.https.onRequest(async (req, res) => {
  const { order_id, payment_status, price_amount } = req.body;
  if (!order_id || payment_status !== "finished") {
    console.error("❌ Invalid payment data", { order_id, payment_status });
    return res.status(400).send("Invalid payment data");
  }

  const refId = order_id;

  try {
    const orderRef = db.ref(`Transaction List/${refId}`);
    const orderSnap = await orderRef.once("value");

    if (!orderSnap.exists()) {
      console.error("❌ Order not found", { refId });
      return res.status(404).send("Order not found");
    }
    const orderData = orderSnap.val();
    const { Amount_In, AffPay, Email, Firstname, TypeSub } = orderData;
    const AmountPaid = Amount_In;

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

    const email = orderData.Email;
    const first_name = orderData.FirstName;

    if (
      orderData.TypeSub === "Student Sub" ||
      orderData.TypeSub === "Combo Plan Kit"
    ) {
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
            AmountPaid,
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
      await ComoSender(AmountPaid, myRef, email, first_name);
    }
    // Audited and Completed-100% Functional
    if (orderData.TypeSub === "Signal Sub") {
      await SignalAddOn(AmountPaid, myRef, email, first_name);
    }

    if (
      orderData.TypeSub === "Affiliate Sub" ||
      orderData.TypeSub === "Combo Plan Kit"
    ) {
      await AffiliatePack(myRef, email, first_name, AffPay, userAffSnap);
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
