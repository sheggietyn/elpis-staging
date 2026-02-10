// pages/api/nowpayments/payout.js
export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { withdrawals } = req.body;

    const response = await fetch("https://api.nowpayments.io/v1/payout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        Authorization: `Bearer ${process.env.NOWPAYMENTS_JWT}`, // <- JWT token required
      },
      body: JSON.stringify({
        withdrawals,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("NOWPayments payout error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
