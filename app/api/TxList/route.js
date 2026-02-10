// app/api/TxList/route.js
export async function POST(req) {
  const body = await req.json();
  const { orderId } = body;
  //https://api.nowpayments.io/v1/payment?order_id=${orderId}
  try {
    const res = await fetch(
      `https://api-sandbox.nowpayments.io/v1/payment?order_id=${orderId}`,
      {
        headers: {
          "x-api-key": process.env.SANBOX_PAYMENT_API_KEY,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return Response.json({ error: data }, { status: res.status });
    }

    // Return only the first match since order_id should be unique
    return Response.json(data.data?.[0] || {});
  } catch (e) {
    console.error("Error Coming from Tx API:", e.message);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
