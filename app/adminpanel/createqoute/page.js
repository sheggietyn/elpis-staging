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
  QoutesList,
  VaultList,
} from "@/app/connector/DataListDisplay";
import useLoader, {
  DateTimeTag,
  NotPops,
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
import { NavProListTwo } from "@/app/util/UtilsJester";
import {
  DisplayCourseList,
  ListInfo,
  QouteInfo,
  VerseInfo,
} from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { FileUploadPDF } from "@/app/components/AdminDash/AdminComp/FileUploader";
import { TopChanger } from "@/app/components/Dashboard/CourseComp";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { AddRess, myPosition } from "@/app/data/BankListData";
import { UploadFile } from "@/app/connector/Uploader";
export default function page() {
  const { BibleData, LoadData } = BibleVerseTwo();
  const { ListData, LoadListData } = QoutesList();
  const [active, setActive] = useState("Daily Qoute");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [Load, setLoad] = useState(false);
  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Verse, setVerse] = useState("");
  const [wormData, setwormData] = useState("");

  const { LoaderUser, userData } = ConnectData();
  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";

  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const QouteTitle = {
    Qoute: Title,
    PostTime: Date,
    QouteId: getId,
    CreatedBy: `${FirstName} ${LastName}`,
  };

  const VerseTitle = {
    Qoute: SubTitle,
    PostTime: Date,
    Verse: Verse,
    QouteId: getId,
    CreatedBy: `${FirstName} ${LastName}`,
  };

  const LoadLoad = () => {
    setLoad(true);
    StopLoad();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const ExistFunc = () => {
    setDialogPay(false);
    StopLoad();
  };

  const Fetcchh = (item) => {
    setwormData(item);
    setSwitchStat(2);
    setDialogPay(true);
  };

  const FetcchhVV = (item) => {
    setwormData(item);
    setSwitchStat(3);
    setDialogPay(true);
  };

  const Cloodd = () => {
    setTitle("");
    setSubTitle("");
    setVerse("");
    //setTitleII("");
    //setSubTitleII("");
  };

  const PopDat = () => {
    setSwitchStat(1);
    Cloodd();
    setDialogPay(true);
  };

  const CreateQoutes = () => {
    const CrsUrl = `Bible Verse/${DocId}`;
    const CrsUrlQ = `Daily Qoutes/${DocId}`;
    LoadFunc();

    if (Title !== "") {
      set(ref(DB, CrsUrlQ), QouteTitle)
        .then(() => {
          ExistFunc();
          NotPops("success", "New Qoute Created");
        })
        .catch((e) => {
          NotPops("error", e.message);
          StopLoad();
        });
    } else {
      NotPops("info", "You Didn't Add Qoute This Time");
    }
    if (SubTitle !== "" && Verse !== "") {
      set(ref(DB, CrsUrl), VerseTitle)
        .then(() => {
          ExistFunc();
          NotPops("success", "New Bible Verse Created");
        })
        .catch((e) => {
          NotPops("error", e.message);
          StopLoad();
        });
    } else {
      NotPops("info", "You Didn't Add Bible Verse This Time");
    }
  };

  const CliivDelete = () => {
    LoadFunc();
    const CrsUrlQ = `Daily Qoutes/${wormData.id}`;
    remove(ref(DB, CrsUrlQ))
      .then(() => {
        NotPops("success", "Qoute Deleted Successfully");
        ExistFunc();
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const CliivDeleteII = () => {
    LoadFunc();
    const CrsUrlQ = `Bible Verse/${wormData.id}`;
    remove(ref(DB, CrsUrlQ))
      .then(() => {
        NotPops("success", "Bible Verse Deleted Successfully");
        ExistFunc();
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };
  const TableHolder = (
    <TableFillII
      TitleOne={"Qoute Creator"}
      TitleToo={"Qoute"}
      TitleTri={"Created Date"}
      TitleStat={"Qoute Id"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadListData || Load}
      ItemData={ListData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.CreatedBy} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={item ? item.Qoute.slice(0, 20) : ""} />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={<DateTimeTag TakeDate={item.PostTime} />} />
      )}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.QouteId} />}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Community) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item)}
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
      TitleOne={"Verse Creator"}
      TitleToo={"Short"}
      TitleTri={"Created By"}
      TitleStat={"Verse Id"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadData || Load}
      ItemData={BibleData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.CreatedBy} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={item.Qoute.slice(0, 30)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.CreatedBy} />}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.QouteId} />}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Community) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => FetcchhVV(item)}
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
        Title={`Create Daily Qoutes`}
        SmallTitle={`Create Daily Qoutes and Bible Verse for trader`}
      />

      <div className="mb-2">
        <WideInput
          textplace={"Daily Qoutes"}
          label={"Daily Qoutes"}
          type={"text"}
          value={Title}
          rows={3}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <WideInput
          textplace={"Bible Verse"}
          label={"Bible Verse"}
          type={"text"}
          value={SubTitle}
          rows={3}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>
      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Bible Chapter"}
          label={"Bible Chapter"}
          type={"text"}
          IconLeft={<Cross className="iconStyle" />}
          value={Verse}
          onChange={(e) => setVerse(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Create Qoutes/Verse"}
          onClick={() => CreateQoutes()}
          disabled={isLoading}
        />
      </div>
    </>
  );
  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Qoute Info`}
        SmallTitle={`Qoute ${wormData.QouteId} Info`}
      />
      <QouteInfo item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Qoute"}
          onClick={() => CliivDelete()}
          disabled={isLoading}
        />
      </div>
    </>
  );
  const CraneTree = (
    <>
      <NavProListTwo
        Title={`Bible Verse Info`}
        SmallTitle={`Bible Verse ${wormData.QouteId} Info`}
      />
      <VerseInfo item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Bible Verse"}
          onClick={() => CliivDeleteII()}
          disabled={isLoading}
        />
      </div>
    </>
  );
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
            : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"500px"}
      />
      <TablePageIII
        Title={"Qoute List"}
        SmallText={"List of All Qoutes"}
        TableShit={active === "Daily Qoute" ? TableHolder : TableHolderTwo}
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Community) ? (
              <TinyGrayBtn
                btnText={
                  <>
                    <Pencil className="w-3 h-3" /> Create Qoutes
                  </>
                }
                onClick={() => PopDat()}
                bgColor={"gold-gradient"}
                content={"Create Resources"}
              />
            ) : null}
            <TopChanger
              active={active}
              onClickOne={() => {
                setActive("Daily Qoute");
                LoadLoad();
              }}
              onClickTwo={() => {
                setActive("Bible Verse");
                LoadLoad();
              }}
              levelOne={"Daily Qoute"}
              levelTwo={"Bible Verse"}
              BtnOne={"Daily Qoute"}
              BtnTwo={"Bible Verse"}
            />
          </div>
        }
      />
    </div>
  );
}
