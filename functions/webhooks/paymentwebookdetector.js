const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = global.fetch;
const { ServerValue } = require("firebase-admin/database");

// Initialize Firebase Admin (only if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();

module.exports = functions.https.onRequest(async (req, res) => {
  try {
    const { order_id, payment_status, actually_paid } = req.body;

    const AmountPaid = actually_paid;

    // Step 1: Validate request
    if (!order_id || payment_status !== "finished") {
      console.error("❌ Invalid payment data", { order_id, payment_status });
      return res.status(400).send("Invalid payment data");
    }

    // Step 3: Check if order exists in Realtime Database
    const orderRef = db.ref(`Waitlist Sales/${order_id}`);
    const orderSnap = await orderRef.once("value");

    if (!orderSnap.exists()) {
      console.error("❌ Order not found", { order_id });
      return res.status(404).send("Order not found");
    }

    const orderData = orderSnap.val();

    // Step 3: Check if already marked as 'success'
    if (orderData.Payment_Status === "success") {
      console.log("ℹ️ Order already processed", { order_id });
      return res.status(200).send("Order already processed");
    }

    // Step 4: Update order status to 'success'
    await orderRef.update({
      Payment_Status: "success",
    });

    // Step 5: Update affiliate data if exists
    if (orderData.Aff_Id) {
      const AffId = orderData.Aff_Id;
      const affRef = db.ref(`My Affiliate List/${AffId}/${AffId}/${order_id}`);
      const userAffPath = db.ref(`My Affiliate/${AffId}`);
      const affSnap = await userAffPath.once("value");
      if (affSnap.exists()) {
        await affRef.update({
          Payment_Status: "success",
        });
        await userAffPath.update({
          Affiliate_Sales: ServerValue.increment(parseInt(1)),
        });
      }
    }

    // Step 6: Send MailerSend transactional email
    const mailerSendPayload = {
      from: {
        email: "hello@digitalmogulacademy.com",
        name: "Elpis Academy",
      },
      to: [{ email: orderData.Email, name: orderData.FirstName }],
      template_id: "z86org8y7znlew13",
      subject: "Welcome to Elpis Academy",
      variables: [
        {
          email: orderData.Email,
          substitutions: [
            { var: "name", value: orderData.name },
            { var: "plan", value: orderData.Plan || "Elpis Plan" },
          ],
        },
      ],
    };

    console.log(
      "📦 Payload sent to MailerSend:",
      JSON.stringify(mailerSendPayload, null, 2)
    );

    const mailResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer mlsn.d91e1bf3ee988713efc47a4ad3b502e48000cbabc9da755f2e4c72ea8a02faee`,
      },
      body: JSON.stringify(mailerSendPayload),
    });

    console.log("📬 MailerSend raw response:", {
      status: mailResponse.status,
      statusText: mailResponse.statusText,
      headers: Object.fromEntries(mailResponse.headers.entries()),
    });

    let mailResult;
    if (mailResponse.status === 202) {
      mailResult = { message: "Email accepted for sending" };
    } else {
      try {
        if (typeof mailResponse.json !== "function") {
          throw new Error("mailResponse.json is not a function");
        }
        mailResult = await mailResponse.json();
      } catch (jsonError) {
        console.error("⚠️ Failed to parse MailerSend JSON:", jsonError);
        console.error(
          "⚠️ mailResponse type:",
          typeof mailResponse,
          mailResponse
        );
        mailResult = { message: "No JSON response from MailerSend" };
      }
    }

    console.log("📬 MailerSend response:", mailResult);

    if (!mailResponse.ok) {
      console.error("❌ MailerSend failed", {
        status: mailResponse.status,
        message: mailResult.message,
        errors: mailResult.errors,
      });
      return res.status(mailResponse.status).json({
        message: mailResult.message || "Failed to send email",
        errors: mailResult.errors || null,
      });
    }

    return res.status(200).send("Webhook processed successfully");
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return res.status(500).send("Internal Server Error");
  }
});
