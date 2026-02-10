"use client";
import {
  EACMCourseBoxes,
  EACMCourseBoxesTwo,
  EACMCourseBoxesTwoSS,
  ElpisSwitchBar,
  ElpisSwitchBarTwo,
} from "@/app/components/Dashboard/CourseComp";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import React, { useState } from "react";
import Edu from "@/app/assets/images/edu.png";
import { ref, remove, set, update } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";
import moment from "moment";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { ConnectData } from "@/app/connector/CloggerFunc";
import {
  GrayBtn,
  SlotBtn,
  TinyGrayBtn,
} from "@/app/components/Buttons/BtnLarge";
import useLoader, {
  NotPops,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { NavProListTwo } from "@/app/util/UtilsJester";
import { FormInput, WideInput } from "@/app/components/Inputs/InputForm";
import { BookCheckIcon, GraduationCap, Tag, Text } from "lucide-react";
import { CourseDataList } from "@/app/connector/DataListDisplay";
import { ProductLoader } from "@/app/util/Loader";
import { myPosition } from "@/app/data/BankListData";

export default function page() {
  const [Load, setLoad] = useState(false);
  const [active, setActive] = useState("Beginner");
  const [wormData, setwormData] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const { CourseData, LoadTri } = CourseDataList(active);

  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Tage, setTage] = useState("");

  const [fetcherId, setFetcherId] = useState("");

  const { LoaderUser, userData } = ConnectData();
  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);
  const SecId = uuidv4();

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const LoadLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const Cloodd = () => {
    setTitle("");
    setSubTitle("");
    setTage("");
  };

  const PopDat = () => {
    setSwitchStat(1);
    Cloodd();
    setDialogPay(true);
  };

  const PopDatII = (item) => {
    setwormData(item);
    setSwitchStat(2);
    Cloodd();
    setDialogPay(true);
  };

  const PopDatDel = (item) => {
    setwormData(item);
    setSwitchStat(3);
    setDialogPay(true);
  };
  const TitleII = Title ? Title : wormData.CourseTitle;
  const SubTitleII = SubTitle ? SubTitle : wormData.SubText;
  const TageII = Tage ? Tage : wormData.CourseTag;

  const CourseDataLit = {
    CourseTitle: Title,
    SubText: SubTitle,
    CourseTag: Tage,
    Instructor: `${FirstName} ${LastName}`,
    LessonCount: 0,
    CourseId: getId,
    CreatedDate: Date,
    CourseCat: active,
    ModuleId: SecId,
  };
  const DisplayCourse = {
    CourseMainTitle: Title,
    CourseTitle: "",
    CourseDesc: "",
    CourseVideo: "",
    CourseImage: "",
    CreatedDate: "",
    Coursecat: "",
    CourseResources: "",
    ModuleId: "",
  };

  const CreateCourse = () => {
    LoadFunc();
    const CrsUrl = `Courses List/${active}/${active}/${DocId}`;
    //const Crs = `Courses Modules/Modules/${DocId}/${SecId}`;

    set(ref(DB, CrsUrl), CourseDataLit)
      .then(() => {
        NotPops("success", "Course Title Created");
        StopLoad();
        setDialogPay(false);
      })
      .catch(() => {
        StopLoad();
      });
  };

  const UpdateCourse = () => {
    LoadFunc();
    const CrsUrl = `Courses List/${active}/${active}/${wormData.id}`;
    //const Crs = `Courses Modules/Modules/${DocId}/${wormData.ModuleId}`;

    update(ref(DB, CrsUrl), {
      CourseTitle: TitleII,
      SubText: SubTitleII,
      CourseTag: TageII,
    })
      .then(() => {
        NotPops("success", "Course Title Created");
        StopLoad();
        setDialogPay(false);
      })
      .catch(() => {
        StopLoad();
      });
  };

  const Deleter = () => {
    LoadFunc();
    const CrsUrl = `Courses List/${active}/${active}/${wormData.id}`;
    remove(ref(DB, CrsUrl)).then(() => {
      NotPops("success", "Course Title Deleted");
      setDialogPay(false);
      StopLoad();
    });
  };

  const Cliiv = () => {
    if (Title === "" || SubTitle === "" || Tage === "") {
      NotPops("error", "All Field Required to create course");
    } else {
      CreateCourse();
    }
  };

  const CraneOne = (
    <>
      <NavProListTwo
        Title={`Create Course`}
        SmallTitle={`Create Course Title and Tag for on elpis`}
      />

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Course Title"}
          label={"Course Title"}
          type={"text"}
          IconLeft={<BookCheckIcon className="iconStyle" />}
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Course Short Desc"}
          label={"Course Short Description"}
          type={"text"}
          IconLeft={<Text className="iconStyle" />}
          value={SubTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Course Tag"}
          label={"Course tag must look like an abbreviation, e.g (ECAM)"}
          type={"text"}
          IconLeft={<Tag className="iconStyle" />}
          value={Tage}
          onChange={(e) => setTage(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          label={"Course Creator/Instructor"}
          type={"text"}
          IconLeft={<GraduationCap className="iconStyle" />}
          value={`${FirstName} ${LastName}`}
          disabled={true}
        />
      </div>

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Create Course Title"}
          onClick={() => Cliiv()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Update Course`}
        SmallTitle={`Update Course Title and Tag for on elpis`}
      />

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Course Title"}
          label={"Course Title"}
          type={"text"}
          IconLeft={<BookCheckIcon className="iconStyle" />}
          value={TitleII}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Course Short Desc"}
          label={"Course Short Description"}
          type={"text"}
          IconLeft={<Text className="iconStyle" />}
          value={SubTitleII}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Course Tag"}
          label={"Course tag must look like an abbreviation, e.g (ECAM)"}
          type={"text"}
          IconLeft={<Tag className="iconStyle" />}
          value={TageII}
          onChange={(e) => setTage(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          label={"Course Creator/Instructor"}
          type={"text"}
          IconLeft={<GraduationCap className="iconStyle" />}
          value={`${FirstName} ${LastName}`}
          disabled={true}
        />
      </div>

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Course Title"}
          onClick={() => UpdateCourse()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const Saller = (
    <>
      <NavProListTwo
        Title={`Delete Course Title`}
        SmallTitle={`Delete This Course Title with Id: ${wormData.CourseId}`}
      />

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Course Title"}
          onClick={() => Deleter()}
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
            ? Saller
            : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"370px"}
      />
      <ElpisSwitchBarTwo
        active={active}
        Title={"Courses"}
        Subtext={"Switch between beginner and intermediate course level"}
        onClickOne={() => {
          setActive("Beginner");
          LoadLoad();
        }}
        onClickTwo={() => {
          setActive("Intermediate");
          LoadLoad();
        }}
        BtnOne={"Beginner"}
        BtnTwo={"Intermediate"}
        SecondContent={
          <>
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Educator) ? (
              <TinyGrayBtn
                btnText={"Create Course"}
                bgColor={"gold-gradient"}
                content={"Create Course"}
                onClick={() => PopDat()}
              />
            ) : null}
          </>
        }
      />
      {LoadTri || Load ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductLoader count={8} />
        </div> // Loader
      ) : (
        <>
          {CourseData.length > 0 ? (
            <div className="max-h-[70vh] overflow-y-auto">
              <EACMCourseBoxesTwoSS
                courseList={CourseData}
                onClickEdit={(item) => PopDatII(item)}
                onClickDel={(item) => PopDatDel(item)}
                Team_Member={Team_Member}
                Team_Dept={Team_Dept}
              />
            </div>
          ) : (
            <div className="flex justify-center h-[500px] items-center">
              <CompEmpty
                Title={"No Course Yet"}
                SmallTitle={`${
                  active === "Beginner"
                    ? "No Beginner Course Yet"
                    : "No Intermediate Course Yet"
                }`}
                src={Edu}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
