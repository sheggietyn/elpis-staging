import {
  UserRoundCog,
  UsersRound,
  Boxes,
  GraduationCap,
  Rocket,
  Star,
  Cross,
  ChartBar,
  Vault,
  Lectern,
  Crown,
} from "lucide-react";
import { SlotBtn, TinyBtn } from "../Buttons/BtnLarge";
import Link from "next/link";

export const QuoteCard = ({ Namer, ElpisPlan, Bibler }) => {
  return (
    <div className="flex justify-between bg-white md:items-center p-6 rounded-lg w-full mx-auto my-6 flex-col md:flex-row gap-6">
      {/* Title and Subtext (Left) */}
      <div className="md:block flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-md md:text-xl font-bold text-gray-800">
            Welcome, {Namer}
          </h2>
          <p className="text-gray-600 mt-2 flex gap-x-2 items-center text-sm md:mb-3 md:text-sm max-w-md">
            <Crown className="h-5 w-5" />
            Plan Type: {ElpisPlan}
          </p>
        </div>
        <Link href="/affiliate" className="md:mt-10">
          <TinyBtn
            btnText={
              <span className="flex items-center">
                <UsersRound className="w-3 h-3 text-white" />
                Affiliate
              </span>
            }
          />
        </Link>
      </div>

      {/* Quote Box (Right) */}
      {Bibler}
    </div>
  );
};
{
  /* 
<div className="overflow-hidden hide-scrollbar md:px-0 pl-9">
      <div className="overflow-x-auto md:overflow-hidden hide-scrollbar -mx-8 pr-9 md:mx-0 w-screen md:w-full">
              <div className="flex md:grid md:grid-cols-3 hide-scrollbar gap-4 ">

<div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
 */
}
export const FeatureBoxes = () => {
  return (
    <div className="p-0 w-full">
      <div className="flex gap-4 overflow-x-auto md:grid w-full md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {/* Box 1 */}
        <div className="min-w-[280px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col justify-between">
          <div className="pb-2">
            <Boxes className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">EACM</h3>
            <p className="text-sm text-gray-600">
              Get access to automation scripts and AI tools built for traders.
            </p>
          </div>
          <Link href="/courses">
            <SlotBtn btnText={"Enter Now"} />
          </Link>
        </div>

        {/* Box 2 */}
        <div className="min-w-[280px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col justify-between">
          <div className="pb-2">
            <ChartBar className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Signal Room
            </h3>
            <p className="text-sm text-gray-600">
              Follow step-by-step learning paths designed to help you grow.
            </p>
          </div>
          <Link href="/signal">
            <SlotBtn btnText={"Enter Now"} />
          </Link>
        </div>

        {/* Box 3 */}
        <div className="min-w-[280px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col justify-between">
          <div className="pb-2">
            <Cross className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Faith</h3>
            <p className="text-sm text-gray-600">
              Join the faith driven session while you trade, trade with faith
              and ease.
            </p>
          </div>
          <Link href="/faith">
            <SlotBtn btnText={"Enter Now"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const DoubleFeatureBoxes = ({ onClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Box 1 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col justify-between">
        <div className="flex items-start p-2 gap-4">
          <Rocket className="w-8 h-8 text-[#D4AF37]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Next Live Session
            </h3>
            <p className="text-sm text-gray-600">
              Join next live trading session and get tweaks and signals live on
              how to trade from top professional traders.
            </p>
          </div>
        </div>
        <SlotBtn btnText={"Join Live Session"} onClick={onClick} />
      </div>

      {/* Box 2 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col justify-between">
        <div className="flex items-start pb-2 gap-4">
          <Vault className="w-8 h-8 text-[#D4AF37]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Access Resources Vault
            </h3>
            <p className="text-sm text-gray-600">
              Unlock exclusive features, tools and other trading resources daily
              for trading.
            </p>
          </div>
        </div>
        <Link href="/resources">
          <SlotBtn btnText={"View Resource Vault"} />
        </Link>
      </div>
    </div>
  );
};
