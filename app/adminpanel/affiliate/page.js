"use client";
import {
  GrayBtn,
  LongBtn,
  SlotBtn,
  TinyGrayBtn,
} from "@/app/components/Buttons/BtnLarge";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { HoldTableSub } from "@/app/components/TableComp/CompTable";
import {
  TableFillII,
  TablePage,
  TablePageIII,
} from "@/app/components/TableComp/TableStructure/Tabula";
import {
  AffAdminEarnList,
  AffAdminList,
  AffAdminReff,
  AffCashoutList,
  BibleVerse,
  BibleVerseTwo,
  EventDataList,
  ModuleList,
  OverideTeamListII,
  QoutesList,
  VaultList,
} from "@/app/connector/DataListDisplay";
import useLoader, {
  CountFormat,
  DateAdder,
  DateTag,
  DateTimeTag,
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import {
  BanknoteArrowUp,
  Book,
  BookCopy,
  Calendar,
  CalendarPlus,
  Cross,
  GraduationCap,
  Hourglass,
  HourglassIcon,
  Info,
  KeyboardIcon,
  Link,
  LucideArrowDownLeftFromCircle,
  Pencil,
  TagsIcon,
  Text,
  UsersRound,
  Vault,
  Video,
  VideoIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DB } from "@/app/Firebase/AuthHolder";
import moment from "moment";
import {
  equalTo,
  get,
  increment,
  orderByChild,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { ConDateData, ConnectData } from "@/app/connector/CloggerFunc";
import { FormInput, WideInput } from "@/app/components/Inputs/InputForm";
import {
  BadgeCard,
  BadgeStatus,
  BadgeStatusTwo,
  BadgeTag,
  NavProListTwo,
  SessionUrl,
  StatusCall,
} from "@/app/util/UtilsJester";
import {
  DisplayCourseList,
  FlinTransfer,
  ListAffAll,
  ListAffCashout,
  ListAffEarn,
  ListEvent,
  ListInfo,
  QouteInfo,
  VerseInfo,
} from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { FileUploadPDF } from "@/app/components/AdminDash/AdminComp/FileUploader";
import {
  TopChanger,
  TopChangerII,
} from "@/app/components/Dashboard/CourseComp";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { AddRess, myPosition } from "@/app/data/BankListData";
import { UploadFile } from "@/app/connector/Uploader";
import { ExportRank, ExportRankColor } from "@/app/data/dataTable";

export default function page() {
  const [active, setActive] = useState("Affiliate Cashout");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const { AffListData, LoadData } = AffAdminList();
  const [wormData, setwormData] = useState("");
  const { AffRefData, LoadDataII } = AffAdminReff(wormData.id);
  const { OverTeamData, LoadOverData } = OverideTeamListII(wormData.id);
  const { EarnListData, LoadaData } = AffAdminEarnList();
  const { EarnCashData, LoadCsData } = AffCashoutList();
  const [Load, setLoad] = useState(false);
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [PaySwitch, setPaySwitch] = useState(1);
  const [transferCode, setTransferCode] = useState("");
  const [Code, setCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { LoaderUser, userData } = ConnectData();

  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;
  const LoadLoad = () => {
    setLoad(true);
    StopLoad();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const Fetcchh = (item, Nos) => {
    setwormData(item);
    setSwitchStat(Nos);
    setDialogPay(true);
  };

  {
    /*TransactionType: "Cash Out",
    Username: Username,
    FirstName: FirstName,
    LastName: LastName,
    Amount: Amount,
    AmountInNG: AmountInNG,
    Email: Email,
    Bank: BankAccName,
    PaymentType: BizName,
    AccNos: AccountNos,
    Payment_Date: Date,
    Status: StatusCall.Pending,
    CurrencyType: Currency,
    TxId: getRandom(12),
    DocId: DocID,
    AccName: AccountName,
    userId: userId,
    BankCode:BankCode,
Affiliate_Percentage: Payeer,*/
  }
  const TermLoad = () => {
    setDialogPay(false);
    StopLoad();
  };
  const LiiStatus = {
    Status: StatusCall.Successful,
  };
  const LiiStatusPen = {
    Status: StatusCall.Pending,
  };
  const createRecipient = async () => {
    LoadFunc();

    try {
      // 1️⃣ Create recipient
      const res = await fetch("/api/payuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${wormData.FirstName} ${wormData.LastName}`,
          account_number: wormData.AccNos,
          bank_code: wormData.BankCode,
          currency: "NGN",
        }),
      });

      const data = await res.json();

      if (data.status) {
        const recipientCode = data.data.recipient_code;
        const transferRes = await fetch("/api/finalPay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient_code: recipientCode,
            amount: wormData.AmountInNG, // make sure wormData.Amount exists
            reason: `Elpis Affiliate Cash`,
          }),
        });

        const transferData = await transferRes.json();

        if (transferData.status) {
          setTransferCode(transferData.data.transfer_code);
          setPaySwitch(2);
          StopLoad();
        } else {
          console.log("error");

          NotPops("error", `Transaction Not Successful`);
          StopLoad();
        }
      } else {
        NotPops("error", `Error Please Try Again`);
        StopLoad();
      }
    } catch (err) {
      NotPops("error", `Error Please Try Again`);
      StopLoad();
    }
  };

  const finalizeTransfer = async () => {
    const userId = wormData.userId;
    const DocID = wormData.id;
    const UserUrl = `Affiliate Cashout/${userId}/${userId}/${DocID}`;
    const AffUrl = `Admin Affiliate Cashout/${DocID}`;
    if (Code === "") {
      NotPops("error", `Please provide a code`);
    }
    if (!transferCode) return NotPops("error", "No transfer to finalize");

    const res = await fetch("/api/payOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transfer_code: transferCode,
        otp: Code,
      }),
    });

    const data = await res.json();
    if (data.status) {
      update(ref(DB, UserUrl), LiiStatus);
      update(ref(DB, AffUrl), LiiStatus).then(() => {
        TermLoad();
        NotPops("success", `Payment To ${wormData.Username} Successful`);
      });
    } else {
      NotPops("error", `Error Please Try Again`);
      StopLoad();
    }
  };

  const ManualMarker = () => {
    const userId = wormData.userId;
    const DocID = wormData.id;
    const UserUrl = `Affiliate Cashout/${userId}/${userId}/${DocID}`;
    const AffUrl = `Admin Affiliate Cashout/${DocID}`;
    if (wormData.Status === StatusCall.Pending) {
      LoadFunc();
      update(ref(DB, UserUrl), LiiStatus);
      update(ref(DB, AffUrl), LiiStatus).then(() => {
        TermLoad();
        NotPops("success", `Payment To ${wormData.Username} Successful`);
      });
    } else {
      LoadFunc();
      update(ref(DB, UserUrl), LiiStatusPen);
      update(ref(DB, AffUrl), LiiStatusPen).then(() => {
        TermLoad();
        NotPops(
          "success",
          `Payment To ${wormData.Username} set back to pending`
        );
      });
    }
  };

  const createPayApi = async () => {
    LoadFunc();
    try {
      const res = await fetch("/api/payoutNow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          withdrawals: [
            {
              address: wormData.AccNos,
              currency: wormData.BankCode,
              amount: parseFloat(wormData.Amount),
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        TermLoad();
        NotPops("success", `Payment To ${wormData.Username} Successful`);
      } else {
      }
    } catch (err) {
      NotPops("error", err.message);
      StopLoad();
    }
  };

  /// Updating the Manance

  const PrevData = {
    AffiliateCountAll: increment(parseInt(-2)),
    Earning_This_Month: increment(parseInt(-30)),
    Aff_Total_Earning: increment(parseInt(-30)),
    Aff_Available_Balance: increment(parseInt(-30)),
    monthly_Affiliate_Count: increment(parseInt(-2)),
    //Fast_Start_Bonus: increment(parseInt(FastTracker)),
    Aff_Total_Paid_Refferal: increment(parseInt(-1)),
    //AffiliateFirstPayDate: DateAdder(12).toString()
  };
  const DateAdd = DateAdder(4);
  const Complete = async () => {
    const NextUpdate = {
      AffiliateRegDate: DateAdd.toString(),
      Aff_Total_Pending_Pay_Refferal: 0,
    };
    LoadFunc();
    const usersRef = ref(DB, "users");
    const userQueryRef = query(
      usersRef,
      orderByChild("Username"),
      equalTo(wormData.Username)
    );
    try {
      get(userQueryRef).then((snapshot) => {
        if (snapshot.exists()) {
          let whoRefMeKey = null;
          snapshot.forEach((userSnapshot) => {
            whoRefMeKey = userSnapshot.key;
          });
          update(ref(DB, `users/${whoRefMeKey}`), NextUpdate);
          StopLoad();
          setDialogPay(false);
          NotPops("success", "update successful");
        } else {
          NotPops("error", "user not found");
        }
      });
    } catch (e) {
      NotPops("error", e.message);
    }
  };

  const TableHolderOne = (
    <TableFillII
      TitleOne={"Transaction Type"}
      TitleToo={"Affiliate Username"}
      TitleTri={"Amount to Cashout"}
      TitleStat={"Affiliate Rank"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadCsData || Load}
      ItemData={EarnCashData}
      onClick={() => ""}
      SubTitleOne={(item) => (
        <HoldTableSub TabelSubText={item.TransactionType} />
      )}
      SubTitleToo={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleTri={(item) => (
        <HoldTableSub
          TabelSubText={
            item.CurrencyType === "NGN"
              ? NGNFormat(item.AmountInNG)
              : USDFormat(item.Amount)
          }
        />
      )}
      SubTitleFor={(item) => (
        <BadgeTag
          BadgeTitle={BadgeStatusTwo(item.Status)}
          ColorTag={BadgeStatus(item.Status)}
        />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 1)}
              bgColor={"bg-orange-600"}
              content={"View Info"}
            />
          ) : null}
          {Team_Member &&
          (Team_Dept === myPosition.Ceo || Team_Dept === myPosition.Tech) ? (
            <>
              {item.Status === StatusCall.Successful ? null : (
                <TinyGrayBtn
                  btnText={<BanknoteArrowUp className="w-3 h-3" />}
                  onClick={() => Fetcchh(item, 4)}
                  bgColor={"bg-green-600"}
                  content={"Pay Affiliate"}
                />
              )}
            </>
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} yet!`}
    />
  );

  const TableHolderTwo = (
    <TableFillII
      TitleOne={"Reffered By"}
      TitleToo={"Student Referred"}
      TitleTri={"Amount Received"}
      TitleStat={"Affiliate Rank"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadaData || Load}
      ItemData={EarnListData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Refferalby} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={item.StudentUsername} />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.AmountReceiving)} />
      )}
      SubTitleFor={(item) => (
        <BadgeCard
          Title={ExportRank(item.RefferalRank)}
          color={ExportRankColor(item.RefferalRank)}
        />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 2)}
              bgColor={"bg-green-600"}
              content={"View Info"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} yet!`}
    />
  );

  const TableHolderTree = (
    <TableFillII
      TitleOne={"Affiliate Username"}
      TitleToo={"Total Earning"}
      TitleTri={"Affiliate Rank"}
      TitleStat={"Total Refferal"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadData || Load}
      ItemData={AffListData.filter((item) =>
        item.Email.toLowerCase().includes(searchQuery.toLowerCase())
      )}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={USDFormat(item.Aff_Total_Earning)} />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub
          TabelSubText={
            <>
              <BadgeCard
                Title={ExportRank(item.AffiliateRank)}
                color={ExportRankColor(item.AffiliateRank)}
              />
            </>
          }
        />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub TabelSubText={CountFormat(item.AffiliateCountAll)} />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => {
                Fetcchh(item, 3);
              }}
              bgColor={"bg-blue-600"}
              content={"View Info"}
            />
          ) : null}

          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<UsersRound className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 5)}
              bgColor={"bg-green-600"}
              content={"View Downlines"}
            />
          ) : null}

          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<LucideArrowDownLeftFromCircle className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 6)}
              bgColor={"bg-orange-600"}
              content={"View Override Downline"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} yet!`}
    />
  );

  const LiTableII = (
    <TableFillII
      TitleOne={"Username"} /// Affiliate Earning
      TitleToo={"Amount to Earn"} ///
      TitleTri={"Affiliate Type"}
      TitleStat={"Student Status"}
      TitleFiv={"SignUp Date"}
      Variant={"ghost"}
      LoadTagger={LoadDataII}
      ItemData={AffRefData}
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
      EmptyTitle={"No override bonuses yet"}
    />
  );

  const TableHolderTreeII = (
    <TableFillII
      TitleOne={"Affiliate Username"}
      TitleToo={"Affiliate Rank"}
      TitleTri={"Total Earning"}
      TitleStat={"Total Refferal"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadData || Load}
      ItemData={AffListData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => <HoldTableSub TabelSubText={item.FullName} />}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={item.Refered_By_Me_Name} />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub
          TabelSubText={<DateTimeTag TakeDate={item.createdAt} />}
        />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Affiliate) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 3)}
              bgColor={"bg-pink-600"}
              content={"View Info"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} yet!`}
    />
  );
  const CraneOne = (
    <>
      <NavProListTwo
        Title={`Transaction/Cashout Info`}
        SmallTitle={<DateTimeTag TakeDate={wormData.Payment_Date} />}
      />
      <ListAffCashout item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        {Team_Member &&
        (Team_Dept === myPosition.Ceo || Team_Dept === myPosition.Tech) ? (
          <SlotBtn
            btnText={
              isLoading
                ? WhiteLoader
                : wormData.Status === StatusCall.Pending
                ? "Mark As Paid Manually"
                : "Mark As Pending"
            }
            onClick={() => ManualMarker()}
            disabled={isLoading}
          />
        ) : null}
      </div>
    </>
  );
  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Affiliate New Earning Info`}
        SmallTitle={<DateTimeTag TakeDate={wormData.CreatedDate} />}
      />
      <ListAffEarn item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );
  const CraneTree = (
    <>
      <NavProListTwo
        Title={`Affiliate Info`}
        SmallTitle={<DateTimeTag TakeDate={wormData.CreatedDate} />}
      />
      <ListAffAll item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        {/*<LongBtn
          Title={isLoading ? WhiteLoader : "Updater"}
          onClick={() => Complete()}
          disabled={isLoading}
  />*/}
      </div>
    </>
  );

  const CraneTreeII = (
    <>
      <NavProListTwo
        Title={`Affiliate Info`}
        SmallTitle={<DateTimeTag TakeDate={wormData.createdAt} />}
      />
      <ListAffAll item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );

  const CraneFive = (
    <>
      <NavProListTwo
        Title={`Affiliate Downlines`}
        SmallTitle={`List of ${wormData.Firstname} ${wormData.Lastname} Affiliate Downlines`}
      />
      {LiTableII}
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );

  const CraneSix = (
    <>
      <NavProListTwo
        Title={`Affiliate Override Downlines`}
        SmallTitle={`List of ${wormData.Firstname} ${wormData.Lastname} Affiliate Override Downlines`}
      />
      {LiTable}
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );

  const CraneFourI = (
    <>
      <NavProListTwo
        Title={`Affiliate Payout`}
        SmallTitle={`Complete Transfer Payment to ${wormData.Username} for Affiliate`}
      />
      <FlinTransfer item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <LongBtn
          Title={isLoading ? WhiteLoader : "Proceed"}
          onClick={() =>
            wormData.CurrencyType === "NGN" ? createRecipient() : createPayApi()
          }
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneFourII = (
    <>
      <NavProListTwo
        Title={`Enter OTP`}
        SmallTitle={"Enter OTP to Finalize Transfer"}
      />
      <div className="mb-4">
        <FormInput
          placeholder={"Enter Otp"}
          label={"Enter Otp"}
          type={"number"}
          IconLeft={<KeyboardIcon className="iconStyle" />}
          value={Code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />

        <LongBtn
          Title={isLoading ? WhiteLoader : "Finalize Payment"}
          onClick={() => finalizeTransfer()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneFour = PaySwitch === 1 ? CraneFourI : CraneFourII;
  return (
    <div>
      <PopperModal
        Openner={isDialogPay}
        NavTitle={""}
        ContentPoper={
          SwitchStat === 1
            ? CraneOne
            : SwitchStat === 2
            ? CraneTwo
            : SwitchStat === 3
            ? CraneTree
            : SwitchStat === 4
            ? CraneFour
            : SwitchStat === 5
            ? CraneFive
            : SwitchStat === 6
            ? CraneSix
            : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"500px"}
      />
      <TablePageIII
        Title={"Affiliate List"}
        SmallText={"All Affiliate, Earning, Cashout"}
        TableShit={
          active === "Affiliate Cashout"
            ? TableHolderOne
            : active === "Affiliates Earn"
            ? TableHolderTwo
            : active === "Affiliate List"
            ? TableHolderTree
            : null
        }
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            <FormInput
              placeholder={"Search by Email"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TopChangerII
              active={active}
              onClickOne={() => {
                setActive("Affiliate Cashout");
                LoadLoad();
              }}
              onClickTwo={() => {
                setActive("Affiliates Earn");
                LoadLoad();
              }}
              onClickTree={() => {
                setActive("Affiliate List");
                LoadLoad();
              }}
              levelOne={"Affiliate Cashout"}
              levelTwo={"Affiliates Earn"}
              levelTree={"Affiliate List"}
              BtnOne={"Affiliate Cashout"}
              BtnTwo={"Affiliates Earn"}
              BtnTree={"Affiliate List"}
            />
          </div>
        }
      />
    </div>
  );
}
