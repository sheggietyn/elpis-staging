export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left: Form Section (2/3 on desktop) */}
        <div className="md:col-span-2 space-y-8">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email *"
                className="w-full border rounded px-4 py-2"
              />
              <div className="flex gap-4 flex-col md:flex-row">
                <input
                  type="text"
                  placeholder="First name *"
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Last name *"
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div className="flex gap-2 items-center border rounded px-4 py-2">
                <span>🇳🇬 +234</span>
                <input
                  type="tel"
                  placeholder="Phone *"
                  className="w-full outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
            <p className="text-sm text-gray-600 mb-4">
              All transactions are secure and encrypted. Credit card information
              is never stored on our servers.
            </p>

            {/* Paystack methods */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input type="radio" name="payment" defaultChecked />
                <span className="text-sm font-medium">
                  Pay with Card, USSD, or QR
                </span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input type="radio" name="payment" />
                <span className="text-sm font-medium">
                  Pay with Bank Transfer
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Your personal data will be used to process your order, support
              your experience, and other purposes described in our{" "}
              <a href="#" className="text-blue-600 underline">
                privacy policy
              </a>
              .
            </p>

            <button className="w-full bg-blue-600 text-white mt-6 py-3 rounded font-medium hover:bg-blue-700 transition">
              Pay for Academy Access Now
            </button>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Your Cart</h3>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium">
                  AI Literacy Academy <br />
                  <span className="text-gray-500 text-xs">
                    Cohort 3 (Aug 2025)
                  </span>
                </p>
              </div>
              <p className="font-bold">₦37,625</p>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Coupon code"
                className="border px-4 py-2 rounded w-full"
              />
              <button className="bg-gray-300 px-4 rounded font-semibold">
                Apply
              </button>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">₦37,625</p>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <p>Total</p>
              <p>₦37,625</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold mb-3">Shop with Confidence</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                ✅ Secured Transactions
              </li>
              <li className="flex items-center gap-2">
                ✅ 24/7 Customer Service
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
