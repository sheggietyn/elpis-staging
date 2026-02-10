export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, msg, token_charge, type } = body;

    const LINK_PARSER = type
      ? type === "chat"
        ? process.env.CHAT_LINK
        : type === "voice"
        ? process.env.VOICE_LINK
        : type === "chart"
        ? process.env.CHAT_LINK
        : process.env.CHAT_LINK
      : "";
    const DataPasser = { msg, userId, token_charge, type };

    if (!LINK_PARSER) {
      console.log("Error", `invalid url, provide a url ${type}`);
      return Response.json(
        {
          success: false,
          error: "invalid url, provide a url",
        },
        { status: 400 }
      );
    }
    //const controller = new AbortController();
    //const timeout = setTimeout(() => controller.abort(), 60000);

    const chatres = await fetch(LINK_PARSER, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EVA_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataPasser),
      //signal: controller.signal,
    });

    const data = await chatres.json();
    console.log("Clone", data);
    //clearTimeout(timeout);

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
    console.log("Error in chatOsGpt route:", e.message);
    if (e.cause) console.error("Cause:", e.cause);

    return Response.json(
      {
        success: false,
        error: e.message || "Eva backend failed",
      },
      { status: 500 }
    );
  }
}
