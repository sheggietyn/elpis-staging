export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📨 Incoming request body:", body);

    const { email, name, username, templateId, plan } = body;
    const template_id = templateId
      ? templateId
      : process.env.MAILERSEND_TEMPLATE_ID;
    const apiKey = process.env.MAILERSEND_API_KEY;

    // Check required fields
    if (!email || !username || !template_id || !apiKey) {
      console.error("❌ Missing required fields", {
        email,
        username,
        template_id,
        apiKey: !!apiKey, // Avoid logging sensitive data
      });
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare payload for MailerSend
    const payload = {
      from: {
        email: "hello@digitalmogulacademy.com",
        name: "Elpis Academy",
      },
      to: [{ email, name: username }],
      template_id,
      subject: "Welcome to Elpis Academy",
      variables: [
        {
          email,
          substitutions: [
            { var: "name", value: username },
            { var: "plan", value: plan ? plan : "" },
          ],
        },
      ],
    };

    console.log(
      "📦 Payload sent to MailerSend:",
      JSON.stringify(payload, null, 2)
    );

    // Make request to MailerSend
    const mailResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    // Safely parse response
    let result;

    if (mailResponse.status === 202) {
      // MailerSend returns 202 with an empty body for successful sends
      result = { message: "Email accepted for sending" };
    } else {
      try {
        result = await mailResponse.json();
      } catch (jsonError) {
        console.error("⚠️ Failed to parse MailerSend JSON:", jsonError);
        result = { message: "No JSON response from MailerSend" };
      }
    }

    console.log("📬 MailerSend response:", result);

    if (!mailResponse.ok) {
      console.error("❌ MailerSend failed", {
        status: mailResponse.status,
        message: result.message,
        errors: result.errors,
      });

      return Response.json(
        {
          message: result.message || "Failed to send email",
          errors: result.errors || null,
        },
        { status: mailResponse.status }
      );
    }

    return Response.json(
      { message: "✅ Email sent successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Internal Server Error:", error);
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
