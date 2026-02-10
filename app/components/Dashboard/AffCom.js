"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UsersRound,
  Trophy,
  Share2,
  Settings,
  Users,
  Wallet,
  Medal,
  Link2Icon,
  Pencil,
  Vault,
  MessageCircleMoreIcon,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import Doll from "@/app/assets/images/doll.png";
import Aff from "@/app/assets/images/aff.png";
import Money from "@/app/assets/images/money.png";
import Cashh from "@/app/assets/images/cashh.png";
import Pus from "@/app/assets/images/purse.png";
import WallCash from "@/app/assets/images/wallet.png";
import Dell from "@/app/assets/images/del.png";
import Reff from "@/app/assets/images/refer.png";
import Reffs from "@/app/assets/images/referral.png";
import Tagg from "@/app/assets/images/targeted.png";
import Trophyy from "@/app/assets/images/trophy-cup.png";
import TaggD from "@/app/assets/images/3d-target.png";
import { BadgeCard } from "@/app/util/UtilsJester";
import {
  ExportRank,
  ExportRankColor,
  ExportRankLevel,
} from "@/app/data/dataTable";
import { CountFormat, USDFormat } from "@/app/util/ToastLoader";

const menuLinks = [
  {
    title: "Affiliate",
    icon: <UsersRound className="w-5 h-5" />,
    href: "/affiliate",
  },
  {
    title: "Earning",
    icon: <Wallet className="w-5 h-5" />,
    href: "/earning",
  },
  {
    title: "My Teams",
    icon: <UsersRound className="w-5 h-5" />,
    href: "/team",
  },
  {
    title: "Rank",
    icon: <Trophy className="w-5 h-5" />,
    href: "/rank",
  },
];

const FrontPageLink = [
  {
    title: "Add Course",
    icon: <Pencil className="w-5 h-5" />,
    href: "/adminpanel/create",
  },
  {
    title: "Add Resources",
    icon: <Vault className="w-5 h-5" />,
    href: "/adminpanel/resourceshub",
  },
  {
    title: "Add Qoutes",
    icon: <MessageCircleMoreIcon className="w-5 h-5" />,
    href: "/adminpanel/AddQoutes",
  },
  {
    title: "Add News",
    icon: <Newspaper className="w-5 h-5" />,
    href: "/adminpanel/createnews",
  },
];
export const AffiliateMenuLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      {/* ⬅ Prevent outer overflow */}
      {/* Quick Menu */}
      <div className="overflow-x-auto hide-scrollbar w-full">
        <div className="flex md:grid md:grid-cols-4 gap-4 items-center mb-4 w-max md:w-full px-1">
          {menuLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`flex flex-col items-center font-semibold justify-center min-w-[80px] md:min-w-0 p-4 rounded-lg text-sm transition-all ${
                  isActive
                    ? "border-primary border-2 bg-white text-gray-600 shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                <span className="mt-2 text-xs">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Page content */}
      <div>{children}</div>
    </div>
  );
};

export const AdminMenuLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      {/* ⬅ Prevent outer overflow */}
      {/* Quick Menu */}
      <div className="overflow-x-auto hide-scrollbar w-full">
        <div className="flex md:grid md:grid-cols-4 gap-4 items-center mb-4 w-max md:w-full px-1">
          {FrontPageLink.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`flex flex-col items-center font-semibold justify-center min-w-[80px] md:min-w-0 p-4 rounded-lg text-sm transition-all ${
                  isActive
                    ? "border-primary border-2 bg-white text-gray-600 shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                <span className="mt-2 text-xs">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Page content */}
      <div>{children}</div>
    </div>
  );
};

export const ReferralStats = ({
  EarnCash,
  RefCount,
  NowBalance,
  btnDisplay,
  FastBonus,
  OverBonus,
}) => {
  const stats = [
    {
      title: "Earning This Month",
      amount: EarnCash,
      icon: Doll,
      btn: false,
    },
    {
      title: "Monthly Total Referrals",
      amount: RefCount,
      icon: Aff,
      btn: false,
    },

    {
      title: "Withdrawable Balance",
      amount: NowBalance,
      icon: Money,
      btn: true,
    },
  ];
  const BonusBox = (
    <div className="w-full max-w-md mx-auto mt-1 bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex justify-between text-xs font-semibold text-green-900">
        <span>Fast Start Bonus</span>
        <span>Override Bonus</span>
      </div>
      <div className="flex justify-between mt-1 text-md font-bold text-green-900">
        <span>{USDFormat(FastBonus)}</span>
        <span>{USDFormat(OverBonus)}</span>
      </div>
    </div>
  );

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[260px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          >
            {/* Bottom right faded icon */}
            <div className="absolute bottom-2 right-1 w-16 h-16 opacity-10 pointer-events-none">
              <Image
                src={item.icon}
                alt="icon background"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Main icon and title */}
            <div className="gap-4">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-full bg-[#FFF7E7] flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt="Earnings"
                    width={22}
                    height={22}
                  />
                </div>
                {item.btn ? btnDisplay : null}
              </div>
              <h3 className="text-sm font-medium mt-2 text-gray-700">
                {item.title}
              </h3>
            </div>

            <p className="text-xl font-bold text-gray-900">{item.amount}</p>
            <>{item.title === "Withdrawable Balance" && BonusBox}</>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReferralStatsII = ({ TotalEarning, TotalCashOut, AvaBalance }) => {
  const statsII = [
    {
      title: "Total Earnings",
      amount: TotalEarning,
      icon: Cashh,
    },
    {
      title: "Total Withdrawal",
      amount: TotalCashOut,
      icon: Pus,
    },

    {
      title: "Available Balance",
      amount: AvaBalance,
      icon: WallCash,
    },
  ];

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {statsII.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[260px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          >
            {/* Bottom right faded icon */}
            <div className="absolute bottom-2 right-1 w-16 h-16 opacity-10 pointer-events-none">
              <Image
                src={item.icon}
                alt="icon background"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Main icon and title */}
            <div className="gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF7E7] flex items-center justify-center">
                <Image src={item.icon} alt="Earnings" width={22} height={22} />
              </div>
              <h3 className="text-sm font-medium mt-2 text-gray-700">
                {item.title}
              </h3>
            </div>

            <p className="text-xl font-bold text-gray-900">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReferralStatsIV = ({
  TotalRefferal,
  TotalPaidRef,
  TotalPendingRef,
}) => {
  const statsII = [
    {
      title: "Total Refferal",
      amount: TotalRefferal,
      icon: Reffs,
    },
    {
      title: "Total Paid Refferal",
      amount: TotalPaidRef,
      icon: Dell,
    },

    {
      title: "Total Pending Refferal",
      amount: TotalPendingRef,
      icon: Reff,
    },
  ];

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {statsII.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[260px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          >
            {/* Bottom right faded icon */}
            <div className="absolute bottom-2 right-1 w-16 h-16 opacity-10 pointer-events-none">
              <Image
                src={item.icon}
                alt="icon background"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Main icon and title */}
            <div className="gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF7E7] flex items-center justify-center">
                <Image src={item.icon} alt="Earnings" width={22} height={22} />
              </div>
              <h3 className="text-sm font-medium mt-2 text-gray-700">
                {item.title}
              </h3>
            </div>

            <p className="text-xl font-bold text-gray-900">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReferralStatsDD = ({ AffiliateRank, AffiliateCountAll }) => {
  const statsII = [
    {
      title: "Current Affiliate Rank",
      amount: (
        <BadgeCard
          Title={ExportRank(AffiliateRank)}
          color={ExportRankColor(AffiliateRank)}
        />
      ),
      icon: Trophyy,
    },
    {
      title: "Next Monthly Target",
      amount: (
        <BadgeCard Title={ExportRankLevel(AffiliateRank)} color="green" />
      ),
      icon: TaggD,
    },

    {
      title: "Affiliate Current Reach",
      amount: (
        <BadgeCard
          Title={CountFormat(AffiliateCountAll) + " Affiliate Reach"}
          color="blue"
        />
      ),
      icon: Tagg,
    },
  ];

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {statsII.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[260px] md:min-w-0 bg-white border border-gray-200 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          >
            {/* Bottom right faded icon */}
            <div className="absolute bottom-2 right-1 w-16 h-16 opacity-10 pointer-events-none">
              <Image
                src={item.icon}
                alt="icon background"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Main icon and title */}
            <div className="gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF7E7] flex items-center justify-center">
                <Image src={item.icon} alt="Earnings" width={22} height={22} />
              </div>
              <h3 className="text-sm font-medium mt-2 text-gray-700">
                {item.title}
              </h3>
            </div>

            <p className="text-xl font-bold text-gray-900">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FaithSection = ({ Bibler, Qoutes, LinkUrl, VideoFram }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Bible Verse */}
      {Bibler}

      {/* Chat + Video Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Chat Bubbles */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#D4AF3F] mb-4">
            Daily Devotional Qoutes
          </h3>
          <div className="overflow-y-auto h-[250px]">{Qoutes}</div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#D4AF3F] mb-2">
              Daily Devotional Video
            </h3>
            <p className="text-sm text-gray-600">
              How Faith Shapes My Strategy 5-minute devotional – Watch Now
            </p>
          </div>
          {VideoFram}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-5 md:mt-0">{LinkUrl}</div>
    </div>
  );
};
