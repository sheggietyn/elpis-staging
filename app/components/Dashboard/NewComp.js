"use client";
import { CheckCircle, Circle } from "lucide-react";

export default function SelectableBox({
  icon,
  title,
  subtext,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={onSelect}
      className={`
        flex flex-wrap items-start gap-3 p-4 rounded-2xl shadow-md cursor-pointer transition-all 
        ${
          selected
            ? "border-2 border-primary bg-[#F9F5E7]"
            : "border border-gray-200 bg-white"
        }
      `}
    >
      <div className="text-primary">{icon}</div>

      <div className="flex-1 min-w-[200px]">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 break-words">{subtext}</p>
      </div>

      <div className="flex-shrink-0">
        {selected ? (
          <CheckCircle className="text-primary w-5 h-5" />
        ) : (
          <Circle className="text-gray-300 w-5 h-5" />
        )}
      </div>
    </div>
  );
}
