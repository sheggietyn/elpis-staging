import { ChevronRight } from "lucide-react";
import { ScrollPad } from "./ScrollPad";

const TitleCarrier = ({ Title }) => {
  return (
    <div className={"flex items-center justify-between mb-3"}>
      <h2 className="text-lg font-semibold ">{Title}</h2>
      <ChevronRight className={"w-5 h-5 text-gray-700"} />
    </div>
  );
};

export const BabyCheckout = ({ PriceTab, PriceTwo, subTitle, PriceBtn }) => {
  return (
    <div className="w-full min-h-screen bg-safe-gradient py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE — 3 STACKED SECTIONS */}
        <div className="md:col-span-2 md:space-y-6">
          {/* Section 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <TitleCarrier Title={"Choose Subscription Type"} />
            {PriceTab}
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 ">
            <TitleCarrier Title={subTitle} />
            {PriceTwo}
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <TitleCarrier Title={"Payment Gateway"} />
            <select className="w-full border p-3 rounded-lg">
              <option>Basic Plan - $10</option>
              <option>Standard Plan - $20</option>
              <option>Premium Plan - $30</option>
            </select>
          </div>
        </div>

        {/* RIGHT SIDE — PAYMENT BOX */}
        <div className="w-full">
          <div className="bg-white p-6 rounded-xl shadow-md md:sticky md:top-6">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Selected Plan:</span>
              <span className="font-semibold">$20.00</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-semibold">$1.50</span>
            </div>

            <div className="border-t border-dashed my-4 border-gray-200"></div>

            <div className="flex items-center justify-between text-lg font-bold mb-6">
              <span>Total:</span>
              <span>$21.50</span>
            </div>
            {PriceBtn}
          </div>
          <ScrollPad />
        </div>
      </div>
    </div>
  );
};

export const TabSwitch = ({ active, onClick, onClickTwo }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="flex bg-gray-200 rounded-full p-1">
        {/* TAB 1 */}
        <button
          onClick={onClick}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all
              ${
                active === "student"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600"
              }
            `}
        >
          Switch One
        </button>

        {/* TAB 2 */}
        <button
          onClick={onClickTwo}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all
              ${
                active === "affiliate"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600"
              }
            `}
        >
          Switch Two
        </button>
      </div>
    </div>
  );
};
