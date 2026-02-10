import { USDFormat } from "@/app/util/ToastLoader";
import { CheckCircle, Trash } from "lucide-react";

export const PlanCardTop = ({ onPlan }) => {
  return (
    <div className="w-full flex items-center justify-between mb-2 mt-2 px-2">
      {/* LEFT */}
      <h1 className="text-md font-semibold text-neutral-900">Plan in cart</h1>

      {/* RIGHT */}
      <button
        onClick={onPlan}
        className="text-sm font-bold text-primary hover:underline transition"
      >
        Choose Student plan
      </button>
    </div>
  );
};

export const CartPlanCard = ({ data, onRemove }) => {
  const { name, nickname, price, checklist } = data;

  return (
    <div className="w-full mb-2 bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-neutral-900">{name}</h2>

          {nickname && (
            <span className="inline-block text-[11px] sm:pb-1 font-medium text-eggplant bg-eggplantlight px-2 py-0.5 rounded-full">
              {nickname}
            </span>
          )}
        </div>

        <p className="text-sm font-semibold text-neutral-900">
          {USDFormat(price)}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end pt-2 border-t border-gray-100">
        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 text-xs font-medium rounded-2xl px-1
                     text-gray-500 transition hover:bg-gray-200 pointer-cursor"
        >
          <Trash className="w-3 h-3" />
          Remove
        </button>
      </div>
    </div>
  );
};
