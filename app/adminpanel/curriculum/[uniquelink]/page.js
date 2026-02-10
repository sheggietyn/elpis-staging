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
import { ModuleList } from "@/app/connector/DataListDisplay";
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
import { DisplayCourseList } from "@/app/components/AdminDash/AdminComp/DataCarrier";
import ReactPlayer from "react-player";
import {
  VideoDisplayer,
  VideoUpload,
} from "@/app/components/AdminDash/AdminComp/FileUploader";
import { UploadVideos } from "@/app/connector/Uploader";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import ProgressBar from "@ramonak/react-progress-bar";
import { myPosition } from "@/app/data/BankListData";

export default function page() {
  const params = useParams();
  const FetchId = params.uniquelink ? params.uniquelink.toString() : "";
  const { ModuleData, LoadTri } = ModuleList(FetchId);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [isDialogPay, setDialogPay] = useState(false);
  const [SwitchStat, setSwitchStat] = useState(1);
  const [wormData, setwormData] = useState("");
  const [PostImage, setPostImage] = useState(null);
  const [CanImage, setCanImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { LoaderUser, userData } = ConnectData();
  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);

  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [TitleII, setTitleII] = useState({ CourseTitle: wormData.CourseTitle });
  const [SubTitleII, setSubTitleII] = useState({
    CourseDesc: wormData.CourseDesc,
  });
  const [Tage, setTage] = useState("");
  const ffmpegRef = useRef(new FFmpeg());
  const loadedRef = useRef(false);
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";

  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const DisplayCourse = {
    CourseMainTitle: Title,
    CourseTitle: Title,
    CourseDesc: SubTitle,
    CourseVideo: "",
    CourseImage: "",
    CreatedDate: Date,
    Coursecat: "",
    CourseResources: "",
    ModuleId: getId,
    Instructor: `${FirstName} ${LastName}`,
  };

  const TOne = wormData ? wormData.CourseTitle : TitleII;
  const TTwo = wormData ? wormData.CourseDesc : SubTitleII;

  const handleInputTitle = (e) => {
    setwormData({ ...wormData, CourseTitle: e.target.value });
  };

  const handleInputDesc = (e) => {
    setwormData({ ...wormData, CourseDesc: e.target.value });
  };

  const ExistFunc = () => {
    setDialogPay(false);
    StopLoad();
  };

  const Cloodd = () => {
    setTitle("");
    setSubTitle("");
    setTage("");
    //setTitleII("");
    //setSubTitleII("");
  };

  const PopDat = () => {
    setSwitchStat(1);
    Cloodd();
    setDialogPay(true);
  };

  const Fetcchh = (item) => {
    setwormData(item);
    setSwitchStat(2);
    setDialogPay(true);
  };

  const FetccUp = (item) => {
    setwormData(item);
    setPostImage("");
    setCanImage("");
    setSwitchStat(3);
    setDialogPay(true);
  };

  const Ravinn = (item) => {
    Cloodd();
    setwormData(item);
    setSwitchStat(4);
    setDialogPay(true);
  };

  //const ffmpegRef = { current: new FFmpeg() };

  const VidCreate = () => {
    const CrsUrl = `Courses Modules/Modules/${FetchId}/${DocId}`;
    update(ref(DB, CrsUrl), DisplayCourse).then(() => {
      ExistFunc();
      NotPops("success", "Module created successfully");
    });
  };

  const Cliiv = () => {
    if (Title === "" || SubTitle === "") {
      NotPops("error", "All Field Required to create a module");
    } else {
      VidCreate();
    }
  };

  const CliivUpdate = () => {
    const CrsUrl = `Courses Modules/Modules/${FetchId}/${wormData.id}`;
    LoadFunc();
    update(ref(DB, CrsUrl), {
      CourseTitle: wormData.CourseTitle,
      CourseDesc: wormData.CourseDesc,
    }).then(() => {
      NotPops("success", "Decription updated successfully");
      ExistFunc();
    });
  };

  const CliivDelete = () => {
    LoadFunc();
    const CrsUrl = `Courses Modules/Modules/${FetchId}/${wormData.id}`;
    remove(ref(DB, CrsUrl)).then(() => {
      NotPops("success", "Module Deleted Successfully");
      setDialogPay(false);
      StopLoad();
    });
  };
  const CompleterII = () => {
    LoadFunc();
    const CrsUrl = `Courses Modules/Modules/${FetchId}/${wormData.id}`;

    Promise.all([
      UploadVideos(CanImage, (progress) => {
        setUploadProgress(progress); // update your state
      }),
    ])
      .then(([urlA]) => {
        update(ref(DB, CrsUrl), {
          CourseVideo: urlA,
        }).then(() => {
          NotPops("success", "Video Uploaded Successfully");
          ExistFunc();
        });
      })
      .catch((e) => {
        NotPops("error", e.message);
        ExistFunc();
      });
  };

  const Completer = () => {
    if (CanImage === "" || PostImage === "") {
      NotPops("error", "Video File is required to create course");
    } else {
      CompleterII();
    }
  };
  const TableHolder = (
    <TableFillII
      TitleOne={"Module Title"}
      TitleToo={"Description"}
      TitleTri={"Instructor"}
      TitleStat={"Module Id"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadTri}
      ItemData={ModuleData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.CourseTitle} />}
      SubTitleToo={(item) => (
        <HoldTableSub TabelSubText={item.CourseDesc.slice(0, 30)} />
      )}
      SubTitleTri={(item) => <HoldTableSub TabelSubText={item.Instructor} />}
      SubTitleFor={(item) => <HoldTableSub TabelSubText={item.ModuleId} />}
      SubTitleFiv={(item) => (
        <>
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Tech ||
            Team_Dept === myPosition.Educator) ? (
            <div className="flex gap-2 items-center">
              <TinyGrayBtn
                btnText={<Info className="w-3 h-3" />}
                onClick={() => Fetcchh(item)}
                bgColor={"bg-orange-600"}
                content={"View Module Info"}
              />

              <TinyGrayBtn
                btnText={<Video className="w-3 h-3" />}
                onClick={() => FetccUp(item)}
                bgColor={"bg-yellow-600"}
                content={"Add Videos"}
              />

              <TinyGrayBtn
                btnText={<Hourglass className="w-3 h-3" />}
                onClick={() => Ravinn(item)}
                bgColor={"bg-purple-600"}
                content={"Update Module"}
              />
            </div>
          ) : null}
        </>
      )}
      EmptyTitle={"No Module Related to this course title yet"}
    />
  );

  const CraneOne = (
    <>
      <NavProListTwo
        Title={`Create Module`}
        SmallTitle={`Create Course Module `}
      />

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Module Title"}
          label={"Module Title"}
          type={"text"}
          IconLeft={<BookCopy className="iconStyle" />}
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <WideInput
          textplace={"Course Desc"}
          label={"Course Description"}
          type={"text"}
          value={SubTitle}
          onChange={(e) => setSubTitle(e.target.value)}
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
          btnText={isLoading ? WhiteLoader : "Create Module"}
          onClick={() => Cliiv()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneFour = (
    <>
      <NavProListTwo
        Title={`Edit Module`}
        SmallTitle={`Update Course Module Title & Description for module/course id:${wormData.ModuleId} `}
      />

      <div className="mb-4 mt-4">
        <FormInput
          placeholder={"Module Title"}
          label={"Module Title"}
          type={"text"}
          IconLeft={<BookCopy className="iconStyle" />}
          value={wormData.CourseTitle}
          onChange={handleInputTitle}
        />
      </div>

      <div className="mb-2">
        <WideInput
          textplace={"Course Desc"}
          label={"Course Description"}
          type={"text"}
          value={wormData.CourseDesc}
          onChange={handleInputDesc}
        />
      </div>

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Module"}
          onClick={() => CliivUpdate()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTwo = (
    <div className="flex flex-col h-[80vh]">
      <NavProListTwo
        Title={wormData.CourseTitle}
        SmallTitle={
          <>
            Instructor: {wormData.Instructor} <br />
            <DateTimeTag TakeDate={wormData.CreatedDate} />
          </>
        }
      />
      <div className="flex-1 overflow-y-auto hide-scrollbar pr-2 pb-14">
        {wormData ? (
          <VideoDisplayer
            src={wormData.CourseVideo}
            wormData={wormData}
            type="video/mp4"
          />
        ) : null}

        <DisplayCourseList item={wormData} />
      </div>

      <div className="flex items-right justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />

        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete"}
          onClick={() => CliivDelete()}
          disabled={isLoading}
        />
      </div>
    </div>
  );
  const handleChangeII = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
    setCanImage(e.target.files[0]);
  };
  const Saller = (
    <>
      <NavProListTwo
        Title={`Upload Module/Lesson Video`}
        SmallTitle={`Upload video for module/course id: ${wormData.ModuleId}`}
      />
      <VideoUpload
        handleChange={handleChangeII}
        id="file-input"
        loading={loading}
        PostImage={PostImage}
      />

      <div className="w-full m-y-5">
        <p className="text-gray-600 text-sm font-medium mb-2">
          Time To Complete Uploading
        </p>
        <ProgressBar
          completed={uploadProgress}
          bgColor="#D4AF37" // Elpis gold
          baseBgColor="#E5E7EB" // light gray
          height="14px" // thinner bar
          labelAlignment="center"
          labelColor="#000000"
          isLabelVisible={true}
          customLabel={`${uploadProgress}%`} // show % sign
          labelSize="10px" // make label smaller
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Upload Video"}
          onClick={() => Completer()}
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
            : SwitchStat === 4
            ? CraneFour
            : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"500px"}
      />
      <TablePageIII
        Title={"Module List"}
        SmallText={"List of All All Module"}
        TableShit={TableHolder}
        SwitchDrop={
          <>
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Educator) ? (
              <TinyGrayBtn
                btnText={
                  <>
                    <Pencil className="w-3 h-3" /> Create Module
                  </>
                }
                onClick={() => PopDat()}
                bgColor={"gold-gradient"}
                content={"Create Module"}
              />
            ) : null}
          </>
        }
      />
    </div>
  );
}
