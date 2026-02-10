const fetch = global.fetch;

const sendWelcomeEmail = async (email, name, planName, templateId, subject) => {
  const mailerSendPayload = {
    from: {
      email: "hello@digitalmogulacademy.com",
      name: "Elpis Academy",
    },
    to: [{ email, name }],
    template_id: templateId,
    subject: subject,
    variables: [
      {
        email,
        substitutions: [
          { var: "name", value: name },
          { var: "plan", value: planName ? planName : "New Plan" },
        ],
      },
    ],
  };

  console.log(
    "📦 Payload sent to MailerSend:",
    JSON.stringify(mailerSendPayload, null, 2)
  );

  try {
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
      return {
        success: false,
        message: mailResult.message || "Failed to send email",
        errors: mailResult.errors || null,
      };
    }

    return {
      success: true,
      message: "✅ Email sent successfully",
      result: mailResult,
    };
  } catch (err) {
    console.error("❌ Error while sending email:", err);
    return {
      success: false,
      message: "MailerSend request failed",
      error: err,
    };
  }
};

module.exports = sendWelcomeEmail;
