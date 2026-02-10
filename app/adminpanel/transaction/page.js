"use client";
import {
  GrayBtn,
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
  BibleVerse,
  BibleVerseTwo,
  ModuleList,
  PaymentList,
  QoutesList,
  VaultList,
} from "@/app/connector/DataListDisplay";
import useLoader, {
  DateTimeTag,
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import {
  Book,
  BookCopy,
  Cross,
  GraduationCap,
  Hourglass,
  Info,
  Pencil,
  Text,
  Vault,
  Video,
  VideoIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DB } from "@/app/Firebase/AuthHolder";
import moment from "moment";
import { ref, remove, set, update } from "firebase/database";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { FormInput, WideInput } from "@/app/components/Inputs/InputForm";
import {
  BadgeStatus,
  BadgeStatusTwo,
  BadgeTag,
  NavProListTwo,
  StatusCall,
} from "@/app/util/UtilsJester";
import {
  DisplayCourseList,
  ListInfo,
  ListTxn,
  QouteInfo,
  VerseInfo,
  WaitListTxn,
} from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { FileUploadPDF } from "@/app/components/AdminDash/AdminComp/FileUploader";
import { TopChanger } from "@/app/components/Dashboard/CourseComp";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { AddRess, USDTSender, myPosition } from "@/app/data/BankListData";
import { UploadFile } from "@/app/connector/Uploader";

export default function page() {
  const [active, setActive] = useState("Transaction List");
  const [ChangeStat, setChangeStat] = useState("");
  const { PayData, LoadTri } = PaymentList(active, ChangeStat);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [Load, setLoad] = useState(false);
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [wormData, setwormData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
  const { LoaderUser, userData } = ConnectData();

  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const Dropper = (
    <div>
      <select
        value={ChangeStat}
        onChange={(e) => setChangeStat(e.target.value)}
        className="textInput"
        required
      >
        <option value="">All Status</option>
        {Object.entries(StatusCall).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );

  const TableHolder = (
    <TableFillII
      TitleOne={"Transaction Type"}
      TitleToo={"Amount Paid"}
      TitleTri={"Transaction Status"}
      TitleStat={"Payment Date"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadTri || Load}
      ItemData={PayData.filter(
        (item) =>
          item.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.OrderId.toString().includes(searchQuery)
      )}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Plan} />}
      SubTitleToo={(item) => (
        <HoldTableSub
          TabelSubText={
            item.Payment_Currency === "NGN"
              ? `${NGNFormat(item.Amount_Naira)}/NGN`
              : `${USDFormat(item.Amount_In)}/USD`
          }
        />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub
          TabelSubText={
            <>
              <BadgeTag
                BadgeTitle={BadgeStatusTwo(item.Payment_Status)}
                ColorTag={BadgeStatus(item.Payment_Status)}
              />
            </>
          }
        />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub
          TabelSubText={<DateTimeTag TakeDate={item.Payment_Date} />}
        />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Finance) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 1)}
              bgColor={"bg-pink-600"}
              content={"Vie Info"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} yet!`}
    />
  );

  const TableHolderTwo = (
    <TableFillII
      TitleOne={"Transaction Type"}
      TitleToo={"Amount Paid"}
      TitleTri={"Tx Status"}
      TitleStat={"Payment Date"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadTri || Load}
      ItemData={PayData.filter(
        (item) =>
          item.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.OrderId.toString().includes(searchQuery)
      )}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Plan} />}
      SubTitleToo={(item) => (
        <HoldTableSub
          TabelSubText={
            item.Amount_In_Naira > 300
              ? `${NGNFormat(item.Amount_In_Naira)}/NGN`
              : `${USDFormat(item.Amount_In_Naira)}/USD`
          }
        />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub
          TabelSubText={
            <BadgeTag
              BadgeTitle={BadgeStatusTwo(item.Payment_Status)}
              ColorTag={BadgeStatus(item.Payment_Status)}
            />
          }
        />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub
          TabelSubText={<DateTimeTag TakeDate={item.Payment_Date} />}
        />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Finance) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item, 2)}
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
        Title={`Transactions Info`}
        SmallTitle={<DateTimeTag TakeDate={wormData.Payment_Date} />}
      />
      <ListTxn item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );
  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Waitlist Sales`}
        SmallTitle={<DateTimeTag TakeDate={wormData.Payment_Date} />}
      />
      <WaitListTxn item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );

  return (
    <div>
      <PopperModal
        Openner={isDialogPay}
        NavTitle={""}
        ContentPoper={
          SwitchStat === 1 ? CraneOne : SwitchStat === 2 ? CraneTwo : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"400px"}
      />
      <TablePageIII
        Title={"Transaction List"}
        SmallText={"List of All Waitlist/Transaction"}
        TableShit={active === "Transaction List" ? TableHolder : TableHolderTwo}
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            {Dropper}
            <FormInput
              placeholder={"Search by FirstName or OrderId"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TopChanger
              active={active}
              onClickOne={() => {
                setActive("Transaction List");
                LoadLoad();
              }}
              onClickTwo={() => {
                setActive("Waitlist Sales");
                LoadLoad();
              }}
              levelOne={"Transaction List"}
              levelTwo={"Waitlist Sales"}
              BtnOne={"Transactions"}
              BtnTwo={"Waitlist Sales"}
            />
          </div>
        }
      />
    </div>
  );
}
