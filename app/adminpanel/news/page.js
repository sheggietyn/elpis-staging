"use client";
import {
  GrayBtn,
  SlotBtn,
  TinyGrayBtn,
} from "@/app/components/Buttons/BtnLarge";
import { PopModal, PopperModal } from "@/app/components/Modals/ModalComp";
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
  NewsPushData,
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
  Trash2,
  Vault,
  Video,
  VideoIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DB } from "@/app/Firebase/AuthHolder";
import moment from "moment";
import { child, ref, remove, set, update } from "firebase/database";
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
import Neww from "@/app/assets/images/phone.png";
import { NewsLoad } from "@/app/util/Loader";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";

export default function page() {
  const { PostData, LoadTri } = NewsPushData();
  const [isDialogOpenXII, setDialogOpenXII] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [wormData, setwormData] = useState("");
  const [wormDataII, setwormDataII] = useState("");
  const [Loading, setLoading] = useState(false);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [SwitchStat, setSwitchStat] = useState(1);
  const [PostImage, setPostImage] = useState(null);
  const [CanImage, setCanImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const { LoaderUser, userData } = ConnectData();
  const router = useRouter();

  const TeamDept = userData ? userData.Team_Dept || "" : "";
  const LockAccount = userData ? userData.Lock_Account || "N/A" : "N/A";
  const PassCode = userData ? userData.PassCode || "N/A" : "N/A";
  const TeamMember = userData ? userData.Team_Member || "N/A" : "N/A";
  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const PostEdit = (item, Nos) => {
    setSwitchStat(Nos);
    setwormData(item);
    setDialogOpen(true);
  };

  const StopLoading = () => {
    setDialogOpen(false);
    StopLoad();
  };

  const Remmovve = () => {
    LoadFunc();
    const GGUP = child(ref(DB), `All News Post/${wormData.id}`);
    remove(GGUP).then(() => {
      StopLoading();
      NotPops("success", "You have successfully removed this post");
    });
  };

  const VaaaII = {
    PostTitle: wormData.PostTitle,
    PostBody: wormData.PostBody,
  };

  const ConUrl = `All News Post/${wormData.id}`;
  const GlinUpdate = (Vaaa) => {
    LoadFunc();
    update(ref(DB, ConUrl), Vaaa).then(() => {
      StopLoading();
      NotPops("success", "You have successfully removed this post");
    });
  };

  const FinalUpdate = () => {
    if (CanImage === "" || PostImage === "") {
      GlinUpdate(VaaaII);
    } else {
      Promise.all([
        ProfilePicture(CanImage, (progress) => {
          setUploadProgress(progress); // update your state
        }),
      ]).then(([url]) => {
        const VaaaII = {
          PostTitle: wormData.PostTitle,
          PostBody: wormData.PostBody,
          PostImage: url,
        };
        GlinUpdate(VaaaII);
      });
    }
  };

  const handleInputChange = (e) => {
    setwormData({ ...wormData, PostTitle: e.target.value });
  };

  const handleInputChangeII = (e) => {
    setwormData({ ...wormData, PostBody: e.target.value });
  };
  const handleChangeII = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
    setCanImage(e.target.files[0]);
  };

  const Troo = (
    <>
      <div className="mb-4">
        <FormInput
          textplace={"Post Title"}
          label={"Write a title for your post"}
          value={wormData.PostTitle}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <WideInput
          textplace={"Post Content"}
          label={"Full post content goes here"}
          value={wormData.PostBody}
          rows={"10"}
          onChange={handleInputChangeII}
        />
      </div>

      <div className="w-full m-y-5">
        <div className="w-full md:mb-0 mb-4">
          <p className="text-gray-600 text-sm font-medium mt-2 mb-2">
            Update Post Image
          </p>
          <ImageUpload
            handleChange={handleChangeII}
            id="file-input"
            PostImage={PostImage ? PostImage : wormData.PostImage}
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
    </>
  );

  const Stack = (
    <>
      {LoadTri ? (
        <div className="w-full bg-white rounded-lg mb-3 p-6">
          <NewsLoad />
        </div>
      ) : (
        <>
          {PostData.length > 0 ? (
            <>
              {PostData.map((item) => (
                <div
                  className="w-full bg-white rounded-lg mb-3 p-6"
                  key={item.id}
                >
                  <div className="mb-7 flex justify-between border-b pb-4 border-b-primary">
                    <div>
                      <p className="font-sans md:text-lg text-md font-bold">
                        {item.PostTitle}
                      </p>

                      <p className="font-sans text-xs text-gray-600">
                        <DateTimeTag TakeDate={item.PostDate} />
                      </p>
                    </div>
                    {Team_Member &&
                    (Team_Dept === myPosition.Ceo ||
                      Team_Dept === myPosition.Tech ||
                      Team_Dept === myPosition.Community) ? (
                      <div className="flex gap-5 items-center">
                        <TinyGrayBtn
                          btnText={<Pencil className="w-4 h-4 text-primary" />}
                          onClick={() => PostEdit(item, 1)}
                          bgColor={"bg-white"}
                          content={"Edit Post"}
                        />

                        <TinyGrayBtn
                          btnText={<Trash2 className="w-4 h-4 text-primary" />}
                          onClick={() => PostEdit(item, 2)}
                          bgColor={"bg-white"}
                          content={"Delete Post"}
                        />
                      </div>
                    ) : null}
                  </div>
                  {item.PostImage ? (
                    <div className="w-full max-w-[500px] aspect-square mx-auto my-6">
                      <Image
                        src={item.PostImage}
                        alt="Img"
                        width={500}
                        height={500}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  ) : null}
                  <p className="font-sans whitespace-pre-wrap text-xs md:text-sm text-gray-600">
                    {item.PostBody}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full bg-white flex justify-center items-center rounded-lg mb-3 p-6">
              <CompEmpty
                Title={"No News Updates"}
                SmallTitle={"News updates displays here"}
                src={Neww}
              />
            </div>
          )}
        </>
      )}
    </>
  );

  const CraneOne = (
    <>
      <NavProListTwo
        Title={"Edit Post Title"}
        smallText={`You are about to edit this post`}
      />

      {Troo}
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Post"}
          onClick={() => FinalUpdate()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTwo = (
    <>
      <NavProListTwo
        Title={"Delete Post"}
        smallText={`You are about to delete this post`}
      />
      <p className="text-md font-medium text-gray-700 text-center">
        {wormData.PostTitle}
      </p>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Delete Post"}
          onClick={() => Remmovve()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  return (
    <>
      <PopperModal
        Openner={isDialogOpen}
        NavTitle={""}
        ContentPoper={
          SwitchStat === 1 ? CraneOne : SwitchStat === 2 ? CraneTwo : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"500px"}
      />
      <div className="overflow-y-auto h-[90vh] pb-16">
        <BoxHolder ContentProps={Stack} />
      </div>
    </>
  );
}
