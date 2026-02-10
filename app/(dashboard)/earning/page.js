"use client";
import {
  AffiliateMenuLayout,
  ReferralStatsII,
} from "@/app/components/Dashboard/AffCom";
import { HoldTableSub, TableBox } from "@/app/components/TableComp/CompTable";
import { TableFillII } from "@/app/components/TableComp/TableStructure/Tabula";
import { ConnectData } from "@/app/connector/CloggerFunc";
import {
  AffiliateCashout,
  AffiliateEarningList,
} from "@/app/connector/DataListDisplay";
import {
  DateTag,
  NGNFormat,
  USDFormat,
  getRandom,
} from "@/app/util/ToastLoader";
import { BadgeStatus, BadgeStatusTwo, BadgeTag } from "@/app/util/UtilsJester";
import Cashh from "@/app/assets/images/cashh.png";
import CashDoll from "@/app/assets/images/doll.png";
import React, { useState, useContext } from "react";
import { PoperOver, TextTips } from "@/app/components/Modals/ModalComp";
import { PriceCompHoldII } from "@/app/components/Dashboard/CourseComp";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { FinalAffLoader } from "@/app/util/Loader";

export default function page() {
  const { LoaderUser, userData } = ConnectData();
  const { AffCashData, LoadData } = AffiliateEarningList();
  const { AffCashOutData, LoadAffData } = AffiliateCashout();
  const [open, setOpen] = useState(false);
  const [TakeSwitch, setTakeSwitch] = useState(1);
  const user = useContext(AuthContext);

  const EarnAllTime = userData ? userData.Aff_Total_Earning || 0 : 0;
  const TotalWithdrawal = userData ? userData.Aff_Total_Withdrawal || 0 : 0;
  const AvailableBalance = userData ? userData.Aff_Available_Balance || 0 : 0;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PassAff = "https://digitalmogulacademy.com/affiliate";

  const OrderId = getRandom(8);
  const Date = moment().format("");
  const router = useRouter();
  const DocID = uuidv4();
  const LiTable = (
    <TableFillII
      TitleOne={"Earning Type"} /// Affiliate Earning
      TitleToo={"Amount Earned"} ///
      TitleTri={"Rank Earning"}
      TitleStat={"Status"}
      Variant={"ghost"}
      TitleFiv={"Date/Time"}
      LoadTagger={LoadData}
      ItemData={AffCashData}
      //onClick={(item) => TxLayout(item)}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.EarningType} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.AffEarning)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.AffLevel} />}
      SubTitleFor={(item) => (
        <BadgeTag BadgeTitle={item.Status} ColorTag={"green"} />
      )}
      SubTitleFiv={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.EarningDate)} />
      )}
      EmptyImage={Cashh}
      EmptyTitle={"No Recent Affiliate Earning"}
    />
  );

  const LiTableII = (
    <TableFillII
      TitleOne={"Transaction Type"} /// Affiliate Earning
      TitleToo={"Amount CashOut"} ///
      TitleTri={"Acc/Bank"}
      TitleStat={"Status"}
      TitleFiv={"Date/Time"}
      Variant={"ghost"}
      LoadTagger={LoadAffData}
      ItemData={AffCashOutData}
      //onClick={(item) => TxLayout(item)}
      SubTitleOne={(item) => (
        <HoldTableSub TabelSubText={item.TransactionType} />
      )}
      SubTitleToo={(item) => (
        <HoldTableSub
          TabelSubText={
            item.CurrencyType === "NGN"
              ? NGNFormat(item.AmountInNG)
              : USDFormat(item.Amount)
          }
        />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={`${item.AccNos}/${item.Bank}`} />
      )}
      SubTitleFor={(item) => (
        <BadgeTag
          BadgeTitle={BadgeStatusTwo(item.Status)}
          ColorTag={BadgeStatus(item.Status)}
        />
      )}
      SubTitleFiv={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.Payment_Date)} />
      )}
      EmptyImage={CashDoll}
      EmptyTitle={"No Recent Cashout"}
    />
  );

  const FirstOne = () => {
    setTakeSwitch(1);
    setOpen(true);
  };

  const FirstTwo = () => {
    setTakeSwitch(2);
    setOpen(true);
  };
  const contCnt = (
    <>
      {TakeSwitch === 1 ? (
        <TextTips Content={`This is a list of your recent affiliate earning`} />
      ) : (
        <TextTips
          Content={`This is a list showing your recent affiliate cashout`}
        />
      )}
    </>
  );

  return (
    <>
      <div className="max-w-screen h-[90vh] overflow-auto">
        {LoaderUser ? (
          <FinalAffLoader />
        ) : (
          <>
            {AffiliateStatus ? (
              <>
                <ReferralStatsII
                  TotalEarning={USDFormat(EarnAllTime)}
                  TotalCashOut={USDFormat(TotalWithdrawal)}
                  AvaBalance={USDFormat(AvailableBalance)}
                />
                <AffiliateMenuLayout />
                <div className="flex flex-col md:flex-row mt-5 pb-20 gap-6">
                  {/* Recent Jobs Table Box */}
                  <TableBox
                    Title={"Recent Earning"}
                    SmallText={"List of Recent Earning"}
                    linkText={"Earnings Tips"}
                    //link={"/jobs"}
                    TopBarHold={LiTable}
                    onClick={() => FirstOne()}
                    //openPop={open}
                    //setOpenPop={setOpen}
                    Content={
                      <TextTips
                        Content={`This is a list of your recent affiliate earning`}
                      />
                    }
                  />

                  {/* Recent Transactions Table Box */}
                  <TableBox
                    Title={"Recent Widthdrawal"}
                    SmallText={"Your Payments"}
                    linkText={"Payments"}
                    //link={"/payment"}
                    TopBarHold={LiTableII}
                    onClick={() => FirstTwo()}
                    //openPop={open}
                    //setOpenPop={setOpen}
                    Content={
                      <TextTips
                        Content={`This is a list showing your recent affiliate cashout`}
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
    </>
  );
}
