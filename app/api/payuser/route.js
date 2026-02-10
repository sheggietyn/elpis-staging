export async function POST(req) {
  try {
    const body = await req.json();
    const { name, account_number, bank_code, currency } = body;

    const response = await fetch("https://api.paystack.co/transferrecipient", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "nuban",
        name,
        account_number,
        bank_code,
        currency: currency || "NGN",
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: response.status });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create recipient" }),
      { status: 500 }
    );
  }
}
