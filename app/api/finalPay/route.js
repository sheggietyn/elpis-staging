export async function POST(req) {
  try {
    const body = await req.json();
    const { recipient_code, amount, reason } = body;

    const response = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "balance",
        amount: amount * 100, // Paystack expects kobo
        recipient: recipient_code,
        reason: reason || "Payout",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Paystack Transfer Error:", data);
    }

    return new Response(JSON.stringify(data), { status: response.status });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to initiate transfer" }),
      { status: 500 }
    );
  }
}
