"use client";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import Link from "next/link";
import { CheckIcon, Copy } from "lucide-react";
import { FormInput } from "../Inputs/InputForm";
import { MiniBtn } from "../Buttons/BtnLarge";
import { BadgeCard } from "@/app/util/UtilsJester";

export const SpeedometerBox = ({ copied, AffiliateNav, ChartHolder }) => {
  const data = useMemo(
    () => [
      { name: "Progress", value: 78, fill: "#D4AF3F" },
      { name: "Remaining", value: 22, fill: "#F0F0F0" },
    ],
    []
  );

  return (
    <div className="w-full bg-white border border-yellow-200 shadow rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Chart Section */}
      {ChartHolder}

      {/* Text + Button Section */}
      <div className="md:w-1/2 text-center md:items-end md:text-left">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Refer & Earn Monthly
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-md">
          Earn upto $10,000 monthly by refering students traders to elpis
          platform using your affiliate link
        </p>
        {AffiliateNav}
      </div>
    </div>
  );
};
