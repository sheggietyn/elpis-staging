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
  EventDataList,
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
  Calendar,
  CalendarPlus,
  Cross,
  GraduationCap,
  Hourglass,
  HourglassIcon,
  Info,
  Link,
  Pencil,
  TagsIcon,
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
import { ConDateData, ConnectData } from "@/app/connector/CloggerFunc";
import { FormInput, WideInput } from "@/app/components/Inputs/InputForm";
import { NavProListTwo, SessionUrl } from "@/app/util/UtilsJester";
import {
  DisplayCourseList,
  ListEvent,
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
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const { LoadEvent, DateData } = ConDateData();
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [Load, setLoad] = useState(false);
  const [Datee, setDatee] = useState("");
  const [LinkTitle, setLinkTitle] = useState("");
  const [EventTitle, setEventTitle] = useState("");
  const [wormData, setwormData] = useState("");
  const { EvntData, LoadData } = EventDataList();

  const { LoaderUser, userData } = ConnectData();
  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const DataForSession = {
    EvenTitle: EventTitle,
    SessionDate: Datee,
    LiveUrl: LinkTitle,
    Speaker: `${FirstName} ${LastName}`,
    EventId: getId,
    createdAt: Date,
  };

  const handleInputTitle = (e) => {
    setwormData({ ...wormData, EvenTitle: e.target.value });
  };

  const handleInputDesc = (e) => {
    setwormData({ ...wormData, LiveUrl: e.target.value });
  };

  const SyncUpdate = () => {
    LoadFunc();
    update(ref(DB, SessionUrl), {
      EvenTitle: wormData.EvenTitle,
      SessionDate: Datee,
      LiveUrl: wormData.LiveUrl,
    })
      .then(() => {
        ExistFunc();
        NotPops("success", "Event Updated");
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const OpenModal = () => {
    setLinkTitle("");
    setDatee("");
    setEventTitle("");
    setSwitchStat(1);
    setDialogPay(true);
  };

  const FetcchhVV = (item, Nos) => {
    setwormData(item);
    setSwitchStat(Nos);
    setDialogPay(true);
  };

  const ExistFunc = () => {
    setDialogPay(false);
    StopLoad();
  };

  const CreateEvent = () => {
    if (EventTitle === "" || Datee === "" || LinkTitle === "") {
      NotPops("error", "All field Required to create an event");
    } else {
      LoadFunc();
      set(ref(DB, SessionUrl), DataForSession)
        .then(() => {
          ExistFunc();
          NotPops("success", "New Event Created");
        })
        .catch((e) => {
          NotPops("error", e.message);
          StopLoad();
        });
    }
  };

  const CliivDelete = () => {
    LoadFunc();
    remove(ref(DB, SessionUrl))
      .then(() => {
        NotPops("success", "Event Deleted Successfully");
        ExistFunc();
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const TableHolderTwo = (
    <TableFillII
      TitleOne={"Event Creator"}
      TitleToo={"Event Title"}
      TitleTri={"Event Date"}
      TitleStat={"Event Id"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadData}
      ItemData={EvntData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Speaker} />}
      SubTitleToo={(item) => <HoldTableSub TabelSubText={item.EvenTitle} />}
      SubTitleTri={(item) => (
        <HoldTableSub
          TabelSubText={<DateTimeTag TakeDate={item.SessionDate} />}
        />
      )}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.EventId} />}
      SubTitleFiv={(item) => (
        <>
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Community) ? (
            <div className="flex gap-2 items-center">
              <TinyGrayBtn
                btnText={<Info className="w-3 h-3" />}
                onClick={() => FetcchhVV(item, 2)}
                bgColor={"bg-primary"}
                content={"View Info"}
              />

              <TinyGrayBtn
                btnText={<HourglassIcon className="w-3 h-3" />}
                onClick={() => FetcchhVV(item, 3)}
                bgColor={"bg-primary"}
                content={"Edit Info"}
              />
            </div>
          ) : null}
        </>
      )}
      EmptyTitle={`No Event yet!`}
    />
  );

  const CraneOne = (
    <>
      <NavProListTwo
        Title={`Create Virtual Events`}
        SmallTitle={`Create Schedule for Upcoming Event`}
      />
      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Event Title"}
          label={"Event/Meeting/Call/Live Title"}
          type={"text"}
          IconLeft={<TagsIcon className="iconStyle" />}
          value={EventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Date & Time"}
          label={"Set Date & Time"}
          type="datetime-local"
          IconLeft={<Calendar className="iconStyle" />}
          value={Datee}
          onChange={(e) => setDatee(e.target.value)}
        />
      </div>

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Event Link"}
          label={"Event/Meeting/Call/Live Session Link"}
          type={"text"}
          IconLeft={<Link className="iconStyle" />}
          value={LinkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Create Event"}
          onClick={() => CreateEvent()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Events Info`}
        SmallTitle={`Event Info/ Schedule`}
      />
      <ListEvent item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Event"}
          onClick={() => CliivDelete()}
          disabled={isLoading}
        />
      </div>
    </>
  );
  const CraneTree = (
    <>
      <NavProListTwo
        Title={`Update Virtual Events`}
        SmallTitle={`Update Schedule for Upcoming Event`}
      />

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Event Title"}
          label={"Event/Meeting/Call/Live Title"}
          type={"text"}
          IconLeft={<TagsIcon className="iconStyle" />}
          value={wormData.EventTitle}
          onChange={handleInputTitle}
        />
      </div>

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Event Link"}
          label={"Event/Meeting/Call/Live Session Link"}
          type={"text"}
          IconLeft={<Link className="iconStyle" />}
          value={wormData.LiveUrl}
          onChange={handleInputDesc}
        />
      </div>

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Date & Time"}
          label={"Make Sure to Set New Date & Time Before Updating"}
          type="datetime-local"
          IconLeft={<Calendar className="iconStyle" />}
          value={Datee}
          onChange={(e) => setDatee(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Event"}
          onClick={() => SyncUpdate()}
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
        Title={"Event List"}
        SmallText={"List of All Events"}
        TableShit={TableHolderTwo}
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Community) ? (
              <TinyGrayBtn
                btnText={
                  <>
                    <CalendarPlus className="w-3 h-3" /> Create Event
                  </>
                }
                onClick={() => OpenModal()}
                bgColor={"gold-gradient"}
                content={"Create Event"}
              />
            ) : null}
          </div>
        }
      />
    </div>
  );
}
