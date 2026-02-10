const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { DocId } = require("../plantacker");
const {
  newSubPayment,
  SignalNewPayment,
  affNewPayment,
} = require("../studPlanTracker/NewPayment");
const { ExportAfffCalculator } = require("../studPlanTracker/NewAffiliate");
const { SignalAddOn, SendDeepDowner } = require("../studPlanTracker/subDoll");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();
module.exports = functions.https.onRequest(async (req, res) => {
  const { event, data } = req.body;
  console.log("📨 Webhook Data:", { event, data });
  if (event !== "charge.success") {
    return res.status(200).json({ message: "Event Already Completed " });
  }
  const { reference, currency, amount, status } = data;
  const refId = reference;

  try {
    const orderRef = db.ref(`Transaction List/${refId}`);
    const orderSnap = await orderRef.once("value");

    if (!orderSnap.exists()) {
      console.error("❌ Order not found", { refId });
      return res.status(404).send("Order not found");
    }

    const orderData = orderSnap.val();
    const { Amount_In, Email, Firstname, TypeSub } = orderData;

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
    //####################################################

    // Affiliate Id That Was Passed With the Transaction Data, Use it to Fetch Their User Data, if There is
    const userAffRef = db.ref(`users/${whoRefMe}`);
    const userAffSnap = await userAffRef.once("value");
    const SendRef = db.ref(`Affiliate Admin Earn/${DocId}`);
    //######################################################

    if (orderData.TypeSub === "Student Sub" || TypeSub === "Combo Plan Kit") {
      if (userAffSnap.exists()) {
        const affData = userAffSnap.val();
        if (affData.AffiliateStatus) {
          ExportAfffCalculator(
            affData,
            myData,
            userAffRef,
            WhoRefUpdate,
            orderData,
            AffTxRef,
            SendRef,
            myData.Username,
            whoRefMe,
            AdminRef
          );
        }
        const DownlineofMyRefId = affData.Refferral_Id;

        const userAffRefDowner = db.ref(`users/${DownlineofMyRefId}`);
        const userAffSnapDowner = await userAffRefDowner.once("value");
        const DeepDowmlinerList = db.ref(
          `My DeepLinkers/${DownlineofMyRefId}/${DownlineofMyRefId}/${userId}`
          //Deep Downline
        );
        //##################################################

        await SendDeepDowner(
          userAffSnapDowner,
          userAffRefDowner,
          DeepDowmlinerList
        );
      }

      await newSubPayment(orderData, myRef);
    }
    if (TypeSub === "Signal Sub") {
      await SignalNewPayment(orderData, myRef);
    }
    if (TypeSub === "Affiliate Sub" || TypeSub === "Combo Plan Kit") {
      await affNewPayment(orderData, myRef, userAffSnap);
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
