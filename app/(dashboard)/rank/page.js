"use client";
import {
  AffiliateMenuLayout,
  ReferralStatsDD,
} from "@/app/components/Dashboard/AffCom";
import React, { useState, useContext } from "react";
import { PriceCompHoldII } from "@/app/components/Dashboard/CourseComp";
import { TextTips } from "@/app/components/Modals/ModalComp";
import { HoldTableSub, TableBox } from "@/app/components/TableComp/CompTable";
import { TableFillII } from "@/app/components/TableComp/TableStructure/Tabula";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { DataArrayData } from "@/app/data/dataTable";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import { BadgeTag } from "@/app/util/UtilsJester";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { USDFormat, getRandom } from "@/app/util/ToastLoader";
import { FinalAffLoader } from "@/app/util/Loader";
import { CheckCircle } from "lucide-react";

export default function page() {
  const { LoaderUser, userData } = ConnectData();
  const user = useContext(AuthContext);

  const AffiliateRank = userData ? userData.AffiliateRank || "N/A" : "N/A";
  const AffiliateCountAll = userData ? userData.AffiliateCountAll || 0 : 0;
  const LoadTri = false;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const OrderId = getRandom(8);
  const Date = moment().format("");
  const router = useRouter();
  const DocID = uuidv4();
  const PassAff = "https://digitalmogulacademy.com/affiliate";

  const LiTable = (
    <TableFillII
      TitleOne={"Affiliate Rank"}
      TitleToo={"Requirement"}
      TitleTri={"Monthly Income"}
      TitleStat={"Grace/FallBack Pay"}
      TitleFiv={"Fast-Start Bonus"}
      TitleSix={"Override Bonus"}
      Variant={"ghost"}
      LoadTagger={LoadTri}
      ItemData={DataArrayData}
      //onClick={(item) => TxLayout(item)}
      SubTitleOne={(item) => (
        <BadgeTag BadgeTitle={item.RankName} ColorTag={item.color} />
      )}
      SubTitleToo={(item) => <HoldTableSub TabelSubText={item.Req} />}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.MonthlyPay} />}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.GraceFall} />}
      SubTitleFiv={(item) => <HoldTableSub TabelSubText={item.StartBonus} />}
      SubTitleSix={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.DeepDownlinePay)} />
      )}
      //EmptyImage={EmptyWallet}
      EmptyTitle={"No Data Here"}
    />
  );

  const commissionChecklist = [
    "Ranks reset monthly",
    "Fast-start bonuses apply only to first-time purchases",
    "Renewals count toward your income (based on current rank grace fall back)",
    "Overrides are from $5-$10 depending on current rank, one level deep only",
    "No stacking. No passive pyramid income.",
  ];

  function CommissionChecklist() {
    return (
      <div className="space-y-3">
        {commissionChecklist.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-700 rounded-lg px-4 py-3 flex items-center gap-2 border border-gray-300"
          >
            <span className="text-lg">
              <CheckCircle className=" w-4 h-4 text-primary" />
            </span>
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen h-[90vh] overflow-auto">
      {LoaderUser ? (
        <FinalAffLoader />
      ) : (
        <>
          {AffiliateStatus ? (
            <>
              <ReferralStatsDD
                AffiliateRank={AffiliateRank}
                AffiliateCountAll={AffiliateCountAll}
              />
              <AffiliateMenuLayout />
              <div className="flex flex-col md:flex-row mt-5 pb-20 gap-6">
                {/* Recent Jobs Table Box */}
                <TableBox
                  Title={"Rank & Earning Monthly"}
                  SmallText={"List of Rank/Earning for Affiliate"}
                  linkText={"Affiliate Rank"}
                  //link={"/jobs"}
                  TopBarHold={LiTable}
                  Content={
                    <TextTips
                      Content={`Ranks,requirement to unlock rank, amount to earn from rank and bonus from overide bonus`}
                    />
                  }
                />

                {/* Recent Transactions Table Box */}
                <TableBox
                  Title={"🧠 Key Commission Details"}
                  SmallText={"Keys/ Steps To your Affiliate Journey"}
                  linkText={"Monthly"}
                  //link={"/payment"}
                  TopBarHold={<CommissionChecklist />}
                  Content={
                    <TextTips
                      Content={`Features on how our affiliate works, and what to expect monthly`}
                    />
                  }
                />
              </div>
            </>
          ) : (
            <PriceCompHoldII
              contentIn={
                <PayerAffiliate
                  PlanStatus={PlanStatus}
                  DocID={DocID}
                  userData={userData}
                  orderId={OrderId}
                  userId={user.uid}
                  Date={Date}
                  PassSuccess={PassAff}
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
}
