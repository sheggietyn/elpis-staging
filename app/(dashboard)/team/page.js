"use client";
import {
  AffiliateMenuLayout,
  ReferralStatsIV,
} from "@/app/components/Dashboard/AffCom";
import { HoldTableSub, TableBox } from "@/app/components/TableComp/CompTable";
import { TableFillII } from "@/app/components/TableComp/TableStructure/Tabula";
import {
  AffiliateTeamList,
  OverideTeamList,
} from "@/app/connector/DataListDisplay";
import {
  CountFormat,
  DateTag,
  USDFormat,
  getRandom,
} from "@/app/util/ToastLoader";
import { BadgeStatus, BadgeTag } from "@/app/util/UtilsJester";
import React, { useState, useContext } from "react";
import Dell from "@/app/assets/images/del.png";
import { ConnectData } from "@/app/connector/CloggerFunc";
import Reff from "@/app/assets/images/refer.png";
import { TextTips } from "@/app/components/Modals/ModalComp";
import { AuthContext } from "@/app/auth/AuthProvider";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { PriceCompHoldII } from "@/app/components/Dashboard/CourseComp";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import { FinalAffLoader } from "@/app/util/Loader";

export default function page() {
  const { AffTeamData, LoadAffData } = AffiliateTeamList();
  const { OverTeamData, LoadOverData } = OverideTeamList();
  const { LoaderUser, userData } = ConnectData();
  const user = useContext(AuthContext);
  const TotalAff = userData ? userData.AffiliateCountAll || 0 : 0; //Aff_Total_Refferals
  const TotalPaidAff = userData ? userData.Aff_Total_Paid_Refferal || 0 : 0;
  const TotalPendAff = userData
    ? userData.Aff_Total_Pending_Pay_Refferal || 0
    : 0;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const OrderId = getRandom(8);
  const Date = moment().format("");
  const router = useRouter();
  const DocID = uuidv4();
  const PassAff = "https://digitalmogulacademy.com/affiliate";

  const LiTableII = (
    <TableFillII
      TitleOne={"Username"} /// Affiliate Earning
      TitleToo={"Amount to Earn"} ///
      TitleTri={"Affiliate Type"}
      TitleStat={"Student Status"}
      TitleFiv={"SignUp Date"}
      Variant={"ghost"}
      LoadTagger={LoadAffData}
      ItemData={AffTeamData}
      //onClick={(item) => TxLayout(item)}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.Amount)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.Aff_Type} />}
      SubTitleFor={(item) => (
        <BadgeTag
          BadgeTitle={item.Status}
          ColorTag={BadgeStatus(item.Status)}
        />
      )}
      SubTitleFiv={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.createdAt)} />
      )}
      EmptyImage={Dell}
      EmptyTitle={"No Team Yet, Start Reffering Now"}
    />
  );

  const LiTable = (
    <TableFillII
      TitleOne={"Username"} /// Affiliate Earning
      TitleToo={"Amount to Earn"} ///
      TitleTri={"Affiliate Type"}
      TitleStat={"Student Status"}
      TitleFiv={"SignUp Date"}
      Variant={"ghost"}
      LoadTagger={LoadOverData}
      ItemData={OverTeamData}
      //onClick={(item) => TxLayout(item)}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.Amount)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.Aff_Type} />}
      SubTitleFor={(item) => (
        <BadgeTag
          BadgeTitle={item.Status}
          ColorTag={BadgeStatus(item.Status)}
        />
      )}
      SubTitleFiv={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.createdAt)} />
      )}
      EmptyImage={Reff}
      EmptyTitle={"No override bonuses yet"}
    />
  );

  return (
    <div className="max-w-screen h-[90vh] overflow-auto">
      {LoaderUser ? (
        <FinalAffLoader />
      ) : (
        <>
          {AffiliateStatus ? (
            <>
              <ReferralStatsIV
                TotalRefferal={CountFormat(TotalAff)}
                TotalPaidRef={CountFormat(TotalPaidAff)}
                TotalPendingRef={CountFormat(TotalPendAff)}
              />
              <AffiliateMenuLayout />
              <div className="flex flex-col md:flex-row mt-5 pb-20 gap-6">
                {/* Recent Jobs Table Box */}
                <TableBox
                  Title={"My Affiliate SignUp Team"}
                  SmallText={"Student who Signup via link"}
                  linkText={"Affiliate Hints"}
                  TopBarHold={LiTableII}
                  Content={
                    <TextTips
                      Content={`This is a list of your downline that was reffered by you, as your team, you can check their subscriptions, and possibly send them emails`}
                    />
                  }
                />

                {/* Recent Transactions Table Box */}
                <TableBox
                  Title={"Override Bonuses"}
                  SmallText={"Bonuses from your downline's downline"}
                  linkText={"Override Hints"}
                  TopBarHold={LiTable}
                  Content={
                    <TextTips
                      Content={`Override bonuses are earned if you lock a rank and your downline refers someone that purchases a student plan of $150 and above, you earn $5 or $10 depending on your rank`}
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
