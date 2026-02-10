// sendWelcomeEmailB.js
const fetch = global.fetch;

// ✅ Send Welcome Email Function
const sendWelcomeEmailB = async (
  toEmail,
  toName,
  planName,
  templateId,
  subject
) => {
  if (!toEmail) {
    throw new Error("❌ No recipient email provided");
  }

  const payload = {
    Recipients: [
      {
        Email: toEmail,
        Fields: {
          name: toName || "User",
        },
      },
    ],
    Content: {
      TemplateName: templateId,
      Merge: {
        name: toName || "User",
        plan: planName || "New Plan",
        signal_room: planName || "New Plan",
      },
      From: "Elpis Academy <hello@digitalmogulacademy.com>",
      Subject: subject,
    },
  };

  try {
    const response = await fetch("https://api.elasticemail.com/v4/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey":
          "9A981C1C8781C08DB1A34F329B7101A433FCCC71CD1B9AD344837B9210316010422BF7A9656FB79647037F55040C053C",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Elastic Email error:", data);
      throw new Error(data?.Message || "Failed to send email");
    }

    console.log("✅ Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("⚠️ Email send failed:", error.message);
    throw error;
  }
};

module.exports = sendWelcomeEmailB;
