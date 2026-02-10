export const POST = async (req) => {
  const body = await req.json();
  const { amount, currency, DocId } = body;
  const Datapass = {
    amount: amount,
    from_currency: "USD",
    to_currency: currency,
    reference: DocId,
  };

  try {
    const response = await fetch(process.env.IP_CON, {
      method: "POST",
      headers: {
        Authorization: `${process.env.KORAY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Datapass),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Conversion Error:", data);
      return new Response(JSON.stringify(data), { status: response.status });
    }
    console.log("Data to Data", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    console.log("Conversion Error", e.message);
    return new Response(
      JSON.stringify({ error: "Failed to finalize transfer" }),
      {
        status: 500,
      }
    );
  }
};
