"use client";
import { AdminMenuLayout } from "@/app/components/Dashboard/AffCom";
import {
  DashboardChartClub,
  TableBoxVcard,
} from "@/app/components/TableComp/TableStructure/Tabula";
import { AdminDataList } from "@/app/connector/AdminData";
import { CountFormat, USDFormat } from "@/app/util/ToastLoader";
import { BadgeIcn } from "@/app/util/UtilsJester";
import {
  Banknote,
  ChartBar,
  Globe,
  GraduationCap,
  PieChart,
  User,
  Users,
} from "lucide-react";
import React from "react";

export default function page() {
  const ConData = AdminDataList();

  const TotalUsers = ConData ? ConData.TotalUsers || 0 : 0;
  const TotalAffiliates = ConData ? ConData.TotalAffiliates || 0 : 0;
  const TotalActiveStudent = ConData ? ConData.TotalActiveStudent || 0 : 0;
  const TotalSignalAddon = ConData ? ConData.TotalSignalAddon || 0 : 0;
  const TotalSalesAmount = ConData ? ConData.TotalSalesAmount || 0 : 0;
  const TotalAffiliateSales = ConData ? ConData.TotalAffiliateSales || 0 : 0;
  const TotalSignalAddonSales = ConData
    ? ConData.TotalSignalAddonSales || 0
    : 0;
  const TotalCashouts = ConData ? ConData.TotalCashouts || 0 : 0;

  const Totals = {
    TotalUsers: 0,
    TotalAffiliates: 0,
    TotalSalesAmount: 0,
    TotalActiveStudent,
    TotalAffiliateSales: 0,
    TotalSignalAddonSales: 0,
    TotalSignalAddon: 0,
    TotalCashouts: 0,
  };
  const IconWidth = "h-5 w-5 text-white";
  const Stylee = "w-full";

  const Vistaa = (
    <div className="mx-5 pt-5 justify-center items-center flex">
      <div className="grid grid-cols-2 md:gap-4 gap-4 md:grid-cols-2 max-w-4xl w-full">
        <DashboardChartClub
          title="All Users"
          titleSmall="All Signed Up User"
          amount={CountFormat(TotalUsers)}
          IconStod={
            <BadgeIcn
              Icon={<Users className={IconWidth} />}
              color={"bg-green-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Affiliate"
          titleSmall="All Active Affiliates"
          amount={CountFormat(TotalAffiliates)}
          IconStod={
            <BadgeIcn
              Icon={<Users className={IconWidth} />}
              color={"bg-blue-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Active Student"
          titleSmall="All Student Sales Count"
          amount={CountFormat(TotalActiveStudent)}
          IconStod={
            <BadgeIcn
              Icon={<GraduationCap className={IconWidth} />}
              color={"bg-red-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Signal AddOns"
          titleSmall="All Addon Counts"
          amount={CountFormat(TotalSignalAddon)}
          IconStod={
            <BadgeIcn
              Icon={<ChartBar className={IconWidth} />}
              color={"bg-yellow-600"}
            />
          }
          moreStyle={Stylee}
        />
      </div>
    </div>
  );

  const VistaaII = (
    <div className="mx-5 pt-5 justify-center items-center flex">
      <div className="grid grid-cols-2 md:gap-4 gap-4 md:grid-cols-2 max-w-4xl w-full">
        <DashboardChartClub
          title="All Subscriptions"
          titleSmall="Total Academy Sales"
          amount={USDFormat(TotalSalesAmount)}
          IconStod={
            <BadgeIcn
              Icon={<Users className={IconWidth} />}
              color={"bg-green-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Affiliate Sales"
          titleSmall="All Affiliates Sales"
          amount={USDFormat(TotalAffiliateSales)}
          IconStod={
            <BadgeIcn
              Icon={<Globe className={IconWidth} />}
              color={"bg-orange-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Signal AddOns"
          titleSmall="All Signal Sales"
          amount={USDFormat(TotalSignalAddonSales)}
          IconStod={
            <BadgeIcn
              Icon={<PieChart className={IconWidth} />}
              color={"bg-yellow-600"}
            />
          }
          moreStyle={Stylee}
        />

        <DashboardChartClub
          title="All Affiliate Cashout"
          titleSmall="All Affiliate Cashout"
          amount={USDFormat(TotalCashouts)}
          IconStod={
            <BadgeIcn
              Icon={<Banknote className={IconWidth} />}
              color={"bg-purple-600"}
            />
          }
          moreStyle={Stylee}
        />
      </div>
    </div>
  );
  return (
    <div className="h-[80vh] overflow-y-scroll">
      <div className="flex flex-col md:flex-row md:px-7 px-5 pb-2 pt-1">
        <TableBoxVcard
          Title={"Total Activity Counter"}
          SmallText={"Activity Counts on Dashboard"}
          TopBarHold={Vistaa}
          Trunt={true}
        />

        <TableBoxVcard
          Title={"Total Activity Sales"}
          SmallText={"Sales and Cashout on Dashboard"}
          TopBarHold={VistaaII}
          Trunt={true}
        />
      </div>
      <div className="md:px-7 md:hidden flex items-stretch justify-center px-5 pb-2 w-full">
        <AdminMenuLayout />
      </div>
      <div className="md:px-7 hidden md:block px-5 pb-2 w-full">
        <AdminMenuLayout />
      </div>
    </div>
  );
}
