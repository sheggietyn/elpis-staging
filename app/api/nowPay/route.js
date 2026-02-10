export async function POST(req) {
  const body = await req.json();

  const invoiceData = {
    price_amount: body.amount, // in USD
    price_currency: "usd",
    pay_currency: "usdttrc20", // or eth, btc, etc.
    order_id: body.orderId,
    order_description: body.desc,
    success_url: "https://elpis-staging.vercel.app/login",
    ipn_callback_url: "https://paydollar-bo6yseem2q-uc.a.run.app",
  };
  //https://api.nowpayments.io/v1/invoice //process.env.NOWPAYMENTS_API_KEY
  const res = await fetch(process.env.SANBOX_INVOICE_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SANBOX_PAYMENT_API_KEY, // Test Key
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("API Error:", data);
    return Response.json({ error: data }, { status: 400 });
  }

  return Response.json(data); // Contains invoice_url
}
