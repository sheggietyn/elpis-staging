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
import { ModuleList, VaultList } from "@/app/connector/DataListDisplay";
import useLoader, {
  DateTimeTag,
  NotPops,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import {
  Book,
  BookCopy,
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
} from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { FileUploadPDF } from "@/app/components/AdminDash/AdminComp/FileUploader";
import { TopChanger } from "@/app/components/Dashboard/CourseComp";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { AddRess, myPosition } from "@/app/data/BankListData";
import { UploadFile } from "@/app/connector/Uploader";

export default function page() {
  const [active, setActive] = useState("Student");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [wormData, setwormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState("");
  const [PostImage, setPostImage] = useState(null);
  const [CanImage, setCanImage] = useState("");
  const [passer, setPasser] = useState("");
  const { resData, LoadTri } = VaultList(active);
  const [Load, setLoad] = useState(false);
  const [AddOnName, setAddOnName] = useState("");
  const [SubTitle, setSubTitle] = useState("");

  const { LoaderUser, userData } = ConnectData();
  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);

  const handleChangeII = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
    setCanImage(e.target.files[0]);
  };

  const handleAddOnChange = (e, array) => {
    const selectedName = e.target.value;
    const plan = array.find((b) => b.name === selectedName);

    if (plan) {
      setPasser(plan.name);
    } else {
      setPasser("");
    }
  };

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const Cloodd = () => {
    setTitle("");
    setSubTitle("");
    setPostImage("");
    setCanImage("");
  };

  const PopDat = () => {
    setSwitchStat(1);
    Cloodd();
    setDialogPay(true);
  };

  const LoadLoad = () => {
    setLoad(true);
    StopLoad();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };
  const Fetcchh = (item) => {
    setwormData(item);
    setSwitchStat(2);
    setDialogPay(true);
  };

  const ExistFunc = () => {
    setDialogPay(false);
    StopLoad();
  };

  const FileCreate = () => {
    LoadFunc();
    const CrsUrl = `Vault/${passer}/${passer}/${DocId}`;
    Promise.all([UploadFile(CanImage)])
      .then(([urlA]) => {
        update(ref(DB, CrsUrl), {
          Title: Title,
          ProductLink: urlA,
          Subtext: SubTitle,
          ProductId: getId,
          ListingDate: Date,
          CreatedBy: `${FirstName} ${LastName}`,
        }).then(() => {
          NotPops("success", "File Uploaded Successfully");
          ExistFunc();
        });
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const BunuCreata = () => {
    if (Title === "" || SubTitle === "" || CanImage === "") {
      NotPops("error", "All Field Required to create resources");
    } else {
      FileCreate();
    }
  };

  const CliivDelete = () => {
    LoadFunc();
    const CrsUrl = `Vault/${active}/${active}/${wormData.id}`;
    remove(ref(DB, CrsUrl))
      .then(() => {
        NotPops("success", "Deleted Successfully");
        ExistFunc();
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const TableHolder = (
    <TableFillII
      TitleOne={"Reource Title"}
      TitleToo={"Short Desc"}
      TitleTri={"Created By"}
      TitleStat={"Resource Id"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadTri || Load}
      ItemData={resData}
      onClick={() => ""}
      SubTitleOne={(item) => (
        <HoldTableSub TabelSubText={item ? item.Title.slice(0, 20) : ""} />
      )}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={item.Subtext.slice(0, 30)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.CreatedBy} />}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.ProductId} />}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Educator) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => Fetcchh(item)}
              bgColor={"bg-pink-600"}
              content={"View Resource Info"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={`No ${active} Resources yet!`}
    />
  );

  const CraneOne = (
    <>
      <NavProListTwo
        Title={`Upload New Resource`}
        SmallTitle={`Upload PDF,Image, or File For Student/ Affiliate`}
      />
      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Reource Title"}
          label={"Resource Title"}
          type={"text"}
          IconLeft={<Vault className="iconStyle" />}
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Reource Subtext"}
          label={"Resource Short Description"}
          type={"text"}
          IconLeft={<Text className="iconStyle" />}
          value={SubTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <SwitchGenPost
          AllOption={"Choose Category"}
          label={"Choose Resource Category"}
          ChangeStat={passer}
          StatusCallTru={AddRess}
          onChange={(e) => handleAddOnChange(e, AddRess)}
        />
      </div>
      <FileUploadPDF
        handleChange={handleChangeII}
        id="file-input"
        loading={loading}
        PostFile={CanImage}
      />

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Add Resource"}
          onClick={() => BunuCreata()}
          disabled={isLoading}
        />
      </div>
    </>
  );
  const CraneTwo = (
    <>
      <NavProListTwo Title={wormData.Title} SmallTitle={wormData.Subtext} />
      <ListInfo item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Resource"}
          onClick={() => CliivDelete()}
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
          SwitchStat === 1 ? CraneOne : SwitchStat === 2 ? CraneTwo : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"500px"}
      />
      <TablePageIII
        Title={"Resources List"}
        SmallText={"List of All Resource"}
        TableShit={TableHolder}
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Educator) ? (
              <TinyGrayBtn
                btnText={
                  <>
                    <Pencil className="w-3 h-3" /> Create Resources
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
                setActive("Student");
                LoadLoad();
              }}
              onClickTwo={() => {
                setActive("Affiliate");
                LoadLoad();
              }}
              levelOne={"Student"}
              levelTwo={"Affiliate"}
              BtnOne={"Student Resources"}
              BtnTwo={"Affiliate Resources"}
            />
          </div>
        }
      />
    </div>
  );
}
