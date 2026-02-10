export async function POST(req) {
  const body = await req.json();

  const { amount, currency, reference, title, firstname, email } = body;

  const invoiceData = {
    amount: amount,
    redirect_url: "https://elpis-staging.vercel.app/login", //`https://${process.env.WEB_URL}/login`,
    currency: currency,
    reference: reference,
    narration: title,
    merchant_bears_cost: false,
    customer: {
      name: firstname,
      email: email,
    },
    notification_url: "https://multipayment-bo6yseem2q-uc.a.run.app",
  };

  const URLIP = process.env.IP_PAY;
  const URLTEST = "https://api.korapay.com/merchant/api/v1/charges/initialize";

  const res = await fetch(URLTEST, {
    method: "POST",
    headers: {
      Authorization: `Bearer sk_test_XrKBSMNGp9rzkf1WTmQz71TfVnXYXHoUUUUp18Dc`,
      //Authorization: process.env.KORAY,
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
