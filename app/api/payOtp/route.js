export async function POST(req) {
  try {
    const body = await req.json();
    const { transfer_code, otp } = body;

    const response = await fetch(
      "https://api.paystack.co/transfer/finalize_transfer",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transfer_code,
          otp,
        }),
      }
    );

    const data = await response.json();

    // 🔎 Log Paystack errors clearly
    if (!response.ok) {
      console.error("Paystack Finalize Transfer Error:", data);
      return new Response(JSON.stringify(data), { status: response.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to finalize transfer" }),
      {
        status: 500,
      }
    );
  }
}
