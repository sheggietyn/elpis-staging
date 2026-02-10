"use client";
import { Courses } from "@/app/data/ArrayData";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Money from "@/app/assets/images/doll.png";
import Image from "next/image";

export function PriceCards({ onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (plan) => {
    setSelectedId(plan.title);
    onSelect(plan); // send selected plan to parent
  };

  return (
    <div className="-mx-6">
      <div className="flex gap-6 overflow-x-auto flex-nowrap items-start py-5 px-4 scrollbar-hide">
        {Courses.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleSelect(plan)}
            className={`bg-white shadow-lg min-w-[280px] max-w-[320px] flex-shrink-0 rounded-lg p-4 cursor-pointer transition-all ${
              selectedId === plan.title
                ? "border-yellow-500 border shadow-md"
                : "border-gray-300"
            } `}
          >
            {/* Tag and Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px]  font-semibold text-white bg-eggplant rounded-full px-3 py-1">
                {plan.level}
              </div>
              <div>
                <div className="md:text-sm text-sm font-semibold text-gray-600 line-through">
                  {plan.price}
                </div>

                <div className="md:text-md text-lg font-bold text-gray-800">
                  ${plan.bonus}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="md:text-sm text-md font-semibold text-gray-800 mb-3">
              {plan.title}
            </h3>

            {/* Checklist */}
            <ul className="space-y-2">
              {plan.checklist.map((item, idx) => (
                <li
                  key={`${plan.id}-${item}`}
                  className="flex items-center gap-2 md:text-xs text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PriceCardsTwo({ onSelect, selectedId }) {
  //const [selectedId, setSelectedId] = useState(null);

  {
    /*const handleSelect = (plan) => {
    setSelectedId(plan.title);
    onSelect(plan); // send selected plan to parent
  };*/
  }
  //shadow-lg

  return (
    <div className="-mx-6">
      <div className="flex gap-6 overflow-x-auto flex-nowrap items-start py-5 px-4 scrollbar-hide">
        {Courses.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onSelect(plan)}
            className={`bg-white min-w-[280px] max-w-[320px] flex-shrink-0 rounded-lg p-4 cursor-pointer transition-all ${
              selectedId === plan.title
                ? "border-yellow-500 border shadow-md"
                : "border-gray-200 border"
            } `}
          >
            {/* Tag and Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px]  font-semibold text-white bg-eggplant rounded-full px-3 py-1">
                {plan.level}
              </div>
              <div>
                <div className="md:text-md text-lg font-bold text-gray-800">
                  ${plan.pricecall}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="md:text-sm text-md font-semibold text-gray-800 mb-3">
              {plan.title}
            </h3>

            {/* Checklist */}
            <ul className="space-y-2">
              {plan.checklist.map((item, idx) => (
                <li
                  key={`${plan.id}-${item}`}
                  className="flex items-center gap-2 md:text-xs text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export const AffiliatePricingBox = ({ Title, SubText, Price }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-2xl p-6 mb-4 w-full max-w-md mx-auto">
      {/* Background Image */}
      <div className="absolute bottom-0 right-0 opacity-10 w-32 h-32 pointer-events-none">
        <Image
          src={Money} // Replace with your actual image
          alt="Decoration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{Title} </h2>
          <span className="text-2xl font-bold text-[#D4AF3F]">{Price}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{SubText}</p>
      </div>

      {/* Checklist */}
      <ul className="space-y-3">
        {[
          "Full access to affiliate Resources",
          "Earn commissions of upto $1,000 monthly",
          "Access to affiliate downline & team",
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="text-[#D4AF3F] w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
