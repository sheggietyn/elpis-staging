export async function POST(req) {
  try {
    const body = await req.json(); // ✅ Parse request body
    const { email, name, username, templateId, plan } = body;

    const payload = {
      Recipients: [
        {
          Email: email,
          Fields: {
            name: name,
          },
        },
      ],
      Content: {
        TemplateName: templateId,
        Merge: {
          first_name: name || username,
        },
        From: "Elpis Academy <hello@digitalmogulacademy.com>",
        Subject: "Welcome to Elpis Academy",
      },
    }; // interface EmailMess

    const response = await fetch("https://api.elasticemail.com/v4/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": process.env.ELASTIC_MAIL_API, // ✅ .env variable
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json(); // ✅ fixed missing declaration

    if (!response.ok) {
      console.error("❌ Elastic Email error:", result);
      return Response.json(
        {
          message: result.message || "Failed to send email",
          errors: result.errors || null,
        },
        { status: response.status } // ✅ fixed wrong status
      );
    }

    return Response.json(
      { message: "✅ Email sent successfully", result },
      { status: 200 }
    );
  } catch (e) {
    console.error("❌ Internal error:", e.message);
    return Response.json(
      { message: "Internal Server Error", error: e.message },
      { status: 500 }
    );
  }
}
