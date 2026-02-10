import { PriceCards } from "./Pricing";

export function ResponsiveFormBox() {
  return (
    <div className="w-full min-h-screen bg-white md:bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full md:max-w-md bg-white md:rounded-lg md:shadow-lg md:p-8 p-6 md:my-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Contact Us
        </h2>
        <PriceCards />
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
