import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { addToCart } from "./NewCart";
import { NotPops, USDFormat } from "@/app/util/ToastLoader";
import { useState } from "react";

export const EmptyCartBox = ({
  title = "Your cart is empty",
  subtitle = "Choose a plan to get started",
  actionText = "Browse plans",
  actionHref,
}) => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center
                      border border-dashed border-gray-300
                      rounded-2xl p-10 text-center bg-white"
    >
      {/* ICON */}
      <div
        className="flex items-center justify-center w-16 h-16
                        rounded-full bg-gray-100 mb-4"
      >
        <ShoppingCart className="w-8 h-8 text-gray-400" />
      </div>

      {/* TEXT */}
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

      {/* CTA */}
      <button
        onClick={actionHref}
        className="mt-5 inline-flex items-center justify-center
                     rounded-xl bg-[#D4AF37] px-3 py-1
                     text-xs font-medium text-black
                     hover:opacity-90 transition"
      >
        {actionText}
      </button>
    </div>
  );
};

export const AddAffiliateUpsell = ({
  PlanStatus,
  SignalUSD,
  AffiliateStatus,
  AffChartNext,
}) => {
  return (
    <div
      className="w-full mb-4 bg-white rounded-2xl border border-gray-200 p-5
                    shadow-sm space-y-4 hover:shadow-md transition"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCartIcon className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">
              Add Affiliate Kit
            </h2>
            <p className="text-xs text-gray-500">
              Boost your earning potential by adding an affiliate plan
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold text-neutral-900">
          {USDFormat(SignalUSD)}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end pt-2 border-t border-gray-100">
        <button
          onClick={AffChartNext}
          className="px-2 py-1 bg-[#D4AF37] text-black text-xs font-medium
                     rounded-xl hover:bg-[#c49e32] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const AccountSwitchBar = ({ active, onChange }) => {
  const tabs = [
    { key: "usd", label: "USD Account" },
    { key: "gbp", label: "GBP Account" },
    { key: "eur", label: "EURO Account" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-1 flex">
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex-1 text-sm font-medium py-2 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-[#D4AF37] text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
