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
  NewspaperIcon,
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
  BoxHolder,
  DisplayCourseList,
  ListEvent,
  ListInfo,
  QouteInfo,
  VerseInfo,
} from "@/app/components/AdminDash/AdminComp/DataCarrier";
import {
  FileUploadPDF,
  ImageUpload,
} from "@/app/components/AdminDash/AdminComp/FileUploader";
import { TopChanger } from "@/app/components/Dashboard/CourseComp";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { AddRess, myPosition } from "@/app/data/BankListData";
import { ProfilePicture, UploadFile } from "@/app/connector/Uploader";
import Link from "next/link";
import ProgressBar from "@ramonak/react-progress-bar";
export default function page() {
  const { LoaderUser, userData } = ConnectData();
  const [Title, setTitle] = useState("");
  const [Post, setPost] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [PostImage, setPostImage] = useState(null);
  const [CanImage, setCanImage] = useState("");

  const Date = moment().format("");
  const router = useRouter();
  const DocId = uuidv4();
  const getId = getRandom(10);

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const StopLoading = () => {
    setTitle("");
    setPost("");
    setPostImage("");
    setCanImage("");
    StopLoad();
  };

  const handleChangeII = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
    setCanImage(e.target.files[0]);
  };

  const NewsData = {
    PostTitle: Title,
    PostBody: Post,
    PostImage: null,
    PostDate: Date,
    PostId: getId,
    PostCreator: `${FirstName} ${LastName}`,
  };
  const finaPost = () => {
    LoadFunc();
    set(ref(DB, `All News Post/${DocId}`), NewsData).then(() => {
      StopLoading();
      NotPops("success", "News Post created successful");
      //router.push("/adminner/home");
    });
  };

  const UploadWithPix = () => {
    LoadFunc();

    Promise.all([
      ProfilePicture(CanImage, (progress) => {
        setUploadProgress(progress); // update your state
      }),
    ]).then(([url]) => {
      set(ref(DB, `All News Post/${DocId}`), {
        PostTitle: Title,
        PostBody: Post,
        PostImage: url,
        PostDate: Date,
        PostId: getId,
        PostCreator: `${FirstName} ${LastName}`,
      }).then(() => {
        StopLoading();
        NotPops("success", "News Post created successful");
      });
    });
  };
  const PostNew = () => {
    if (Title === "" || Post === "") {
      NotPops("error", "All Field Required to Create News");
    } else {
      if (CanImage === "" || PostImage === "") {
        finaPost();
      } else {
        UploadWithPix();
      }
    }
  };

  const PostNews = (
    <div className="md:max-w-5xl md:p-10 p-3">
      <div className="mb-4">
        <FormInput
          placeholder={"News Title"}
          label={"News Title"}
          type={"text"}
          IconLeft={<NewspaperIcon className="iconStyle" />}
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <WideInput
          textplace={"News Post"}
          label={"News Post"}
          rows={"10"}
          value={Post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>

      <div className="w-full m-y-5">
        <div className="w-full md:mb-0 mb-4">
          <p className="text-gray-600 text-sm font-medium mt-2 mb-2">
            Add News Post Image
          </p>
          <ImageUpload
            handleChange={handleChangeII}
            id="file-input"
            PostImage={PostImage}
          />
        </div>
        <p className="text-gray-600 text-xs font-medium mt-2 mb-2">
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

      <div className="flex items-center justify-between gap-2 pt-7 pb-5">
        <Link href="/adminpanel/home" className="w-1/2">
          <GrayBtn
            btnText={"Back Home"}
            onClick={() => router.replace("/adminpanel/home")}
          />
        </Link>
        {Team_Member &&
        (Team_Dept === myPosition.Ceo ||
          Team_Dept === myPosition.Tech ||
          Team_Dept === myPosition.Community) ? (
          <div className="w-1/2">
            <SlotBtn
              btnText={isLoading ? WhiteLoader : "Create News"}
              onClick={() => PostNew()}
              disabled={isLoading}
            />
          </div>
        ) : null}
      </div>
    </div>
  );

  const Loremmmme = (
    <div className="justify-between p-6 items-center flex">
      <div>
        <div className="text-xl font-bold text-gray-700 text-left">
          Create News
        </div>
        <div className="text-sm text-gray-500 text-left">
          Create New and Update
        </div>
      </div>
      <Link href="/adminpanel/news">
        <TinyGrayBtn
          btnText={"View All News"}
          onClick={""}
          bgColor={"bg-primary"}
          content={"All News"}
        />
      </Link>
    </div>
  );

  return (
    <div className="overflow-y-scroll max-h-[90vh] pb-16">
      <BoxHolder ContentProps={Loremmmme} />
      <BoxHolder ContentProps={PostNews} />
    </div>
  );
}
