export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, msg, token_charge, type } = body;

    const DataPasser = { msg, userId, token_charge, type };

    const chatres = await fetch(process.env.CHAT_LINK, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EVA_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataPasser),
    });

    const data = await chatres.json();
    console.log("Clone", data);

    // ✅ Handle error responses properly
    if (!chatres.ok || data.success === false) {
      return Response.json(
        {
          success: false,
          error: data.error || "Eva backend request failed",
        },
        { status: 400 } // or 402 if it's a token issue
      );
    }

    // ✅ Return successful data
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error("Error in chatOsGpt route:", e.message);
    return Response.json(
      {
        success: false,
        error: e.message || "Eva backend failed",
      },
      { status: 500 }
    );
  }
}
