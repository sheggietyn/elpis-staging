import Head from "next/head";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Refund Policy - Elpis Academy</title>
        <meta
          name="description"
          content="Refund Policy for Elpis Forex Academy"
        />
      </Head>

      <main className="container mx-auto px-4 py-12 mt-10 max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Refund Policy – Elpis Academy Pre-Launch Offer
          </h2>
          <p className="text-gray-600 mb-6">Last Updated: June 25, 2025</p>

          <div className="space-y-6 text-gray-700">
            {/* Thank You Note */}
            <div>
              <p>
                Dear Valued Customer,
                <br />
                Thank you for joining <strong>Elpis Academy</strong> during our
                exclusive pre-launch offer. We are honoured to have you as one
                of our founding members as we prepare for the full launch of our
                faith-driven trading platform.
              </p>
            </div>

            {/* Please Note */}
            <div>
              <h3 className="text-xl font-semibold my-3">Please Note:</h3>
              <p>
                Because this offer includes instant access to downloadable
                digital resources and early member bonuses, all purchases made
                during this pre-launch period are{" "}
                <strong>final and non-refundable</strong>.
              </p>
            </div>

            {/* This policy is in place because */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                This policy is in place because:
              </h3>
              <ul className="list-disc pl-6">
                <li>✅ Our digital products are delivered immediately</li>
                <li>
                  ✅ Members gain early access to mentorship, learning
                  materials, and trade insights
                </li>
                <li>
                  ✅ Resources received cannot be “returned” once accessed
                </li>
              </ul>
            </div>

            {/* Agreement Note */}
            <div>
              <p>
                By completing your payment, you agreed to these terms at
                checkout.
              </p>
            </div>

            {/* Serving with excellence */}
            <div>
              <p>
                We believe in the value we provide, and our heart is to always
                serve you with excellence, integrity, and purpose. If you ever
                need support, guidance, or have concerns, our team is here to
                help.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                Contact Information
              </h3>
              <p>
                📧 <strong>Contact:</strong> support@digitalmogulacademy.com
              </p>
            </div>

            {/* Sign Off */}
            <div>
              <p>
                With gratitude, <br />
                <strong>Favour Peace Ayemere</strong> <br />
                Founder, Elpis Academy <br />
                🕊 <em>Where Faith Fuels Financial Wisdom</em>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
