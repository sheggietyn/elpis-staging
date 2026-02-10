const functions = require("firebase-functions");
const fetch = global.fetch; // Use native fetch for Node.js 18+

// Paystack Webhook Handler
module.exports = functions.https.onRequest(async (req, res) => {
  try {
    // Extract webhook data
    const { event, data } = req.body;
    console.log("📨 Paystack webhook received:", { event, data });

    // Only process charge.success events
    if (event !== "charge.success") {
      console.log("ℹ️ Skipping non-success event:", event);
      return res.status(200).json({ message: "Event ignored" });
    }

    // Extract customer data and amount
    const { customer, amount, currency } = data;
    const email = customer.email;
    const name = customer.first_name || customer.last_name || "There";

    // Convert amount from kobo to NGN
    const amountInNGN = amount / 100;

    // Set planName based on amount
    let planName;
    switch (amountInNGN) {
      case 128000:
        planName = "Elpis Plan/$80";
        break;
      case 208000:
        planName = "Kodesh/$130";
        break;
      case 368000:
        planName = "Dunamis Rahab/$230";
        break;
      default:
        planName = `Elpis Plan/${amountInNGN} ${currency}`;
    }

    // Check required fields
    if (!email) {
      console.error("❌ Missing customer email in Paystack data");
      return res.status(400).json({ message: "Missing customer email" });
    }

    // Prepare MailerSend payload
    const mailerSendPayload = {
      from: {
        email: "hello@digitalmogulacademy.com",
        name: "Elpis Academy",
      },
      to: [{ email, name }],
      template_id: "z86org8y7znlew13",
      subject: "Welcome to Elpis Academy",
      variables: [
        {
          email,
          substitutions: [
            { var: "name", value: name },
            { var: "plan", value: planName },
          ],
        },
      ],
    };

    console.log(
      "📦 Payload sent to MailerSend:",
      JSON.stringify(mailerSendPayload, null, 2)
    );

    // Send email via MailerSend
    const mailResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer mlsn.d91e1bf3ee988713efc47a4ad3b502e48000cbabc9da755f2e4c72ea8a02faee`,
      },
      body: JSON.stringify(mailerSendPayload),
    });

    // Log response details for debugging
    console.log("📬 MailerSend raw response:", {
      status: mailResponse.status,
      statusText: mailResponse.statusText,
      headers: Object.fromEntries(mailResponse.headers.entries()),
    });

    // Handle MailerSend response
    let mailResult;
    if (mailResponse.status === 202) {
      mailResult = { message: "Email accepted for sending" };
    } else {
      try {
        // Check if json() method exists
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

    return res.status(200).json({
      message: "✅ Webhook processed and email sent successfully",
      mailResult,
    });
  } catch (error) {
    console.error("🔥 Internal Server Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
