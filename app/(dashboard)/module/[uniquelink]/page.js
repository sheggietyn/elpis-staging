"use client";
import { AuthContext } from "@/app/auth/AuthProvider";
import {
  GrayBtn,
  LargeBtn,
  LongBtn,
  SlotBtn,
} from "@/app/components/Buttons/BtnLarge";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { PriceCardsTwo } from "@/app/components/HeroSections/Pricing";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { ModuleList } from "@/app/connector/DataListDisplay";
import { CheckFunction } from "@/app/util/PayFunction";
import useLoader, {
  NGNFormat,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import Edu from "@/app/assets/images/bookshelf.png";
import { ProductLoaderII } from "@/app/util/Loader";
import {
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  VideoIcon,
} from "lucide-react";
import ReactPlayer from "react-player";
import { VideoDisplayer } from "@/app/components/AdminDash/AdminComp/FileUploader";

export default function page({}) {
  const user = useContext(AuthContext);
  const { LoaderUser, userData } = ConnectData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selected, setSelected] = useState("paystack");
  const [selectedII, setSelectedII] = useState("paystack");
  const [paystack, setPaystack] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const params = useParams();
  let FetchId = params.uniquelink ? params.uniquelink.toString() : "";
  const { ModuleData, LoadTri } = ModuleList(FetchId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();

  const DocIID = uuidv4();
  const Date = moment().format("");
  const OrderId = getRandom(8);
  const router = useRouter();

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const nextModule = () => {
    if (currentIndex < ModuleData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsCompleted(false);
    }
  };

  const prevModule = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsCompleted(false);
    }
  };

  const currentModule = ModuleData[currentIndex];
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const SignalType = userData ? userData.SignalPlan || "" : "";

  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;

  const RedirectHome = () => {
    router.push("/courses");
  };

  const ModuleDataList = {
    ModuleTitle: "",
    ModulevideoUrl: "",
    Moduledesc: "",
    Instructor: "",
    Remarks: "",
    ModuleHits: "",
    createdAt: "",
  };

  const LessonViewer = () => {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl">
        {/* Video Frame */}
        {currentModule?.CourseVideo ? (
          <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg overflow-hidden shadow-md">
            <VideoDisplayer
              src={currentModule.CourseVideo}
              wormData={currentModule}
              type="video/mp4"
            />
          </div>
        ) : (
          <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500">
            <VideoIcon className="w-12 h-12 text-primary mb-2" />
            <p className="text-sm">No video available for this lesson</p>
          </div>
        )}

        {/* Title */}
        <h1 className="text-xl font-bold text-eggplant mb-2">
          {currentModule?.CourseTitle}
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line break-words mb-6">
          {currentModule?.CourseDesc}
        </p>

        {/* Completion Toggle */}
        <div className="flex items-center gap-3 mb-8 bg-gray-50 px-4 py-3 rounded-lg">
          <input
            id="complete-checkbox"
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="w-5 h-5 accent-primary border-gray-300 rounded focus:ring-primary"
          />

          <label
            htmlFor="complete-checkbox"
            className="text-sm font-medium text-gray-800"
          >
            Mark this lesson as complete
          </label>
        </div>
      </div>
    );
  };

  const SendModule = (
    <div>
      {ModuleData.length > 0 ? (
        <LessonViewer />
      ) : (
        <div className="flex justify-center h-[500px] items-center">
          <CompEmpty
            Title={"Module Not Yet Uploaded!"}
            SmallTitle={`Either The link is invalid or module has not been uploaded yet`}
            src={Edu}
          />
        </div>
      )}
    </div>
  );

  const LazerPayzer = (
    <>
      <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
        Become an Elpis Student
      </h1>
      <p className="text-sm text-center text-gray-500">
        Unlock Elpis Trading Courses,Academy,Tools & Signal Room
      </p>
      <PriceCardsTwo onSelect={setSelectedPlan} />
      <PaymentOptions
        selected={selected}
        onClick={() => setSelected("paystack")}
        onClickII={() => setSelected("nowpayment")}
        NairaCheck={NGNFormat(LineNaira)}
        DollarCheck={USDFormat(LineUSD)}
      />
      <div className="pt-2">
        <LongBtn
          Title={isLoading ? WhiteLoader : "Subscribe & Unlock Courses"}
          more="transition-all duration-300 ease-in-out"
          onClick={() =>
            CheckFunction(
              selectedPlan,
              selected,
              Email,
              FirstName,
              paystack,
              StopLoad,
              LoadFunc,
              RedirectHome,
              user.uid,
              LastName,
              PhoneNos,
              RefferMeId,
              Date,
              DocIID
            )
          }
        />
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-1/2 rounded-lg px-2 mb-16 mt-2 md:px-0 md:mb-5 md:mt-0">
        <div className="w-full bg-white rounded-lg mb-3 mt-5 p-6 flex flex-col h-[80vh]">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar pr-2">
            {LoadTri ? (
              <div className="gap-y-6">
                <ProductLoaderII count={7} />
              </div>
            ) : (
              <>{PlanStatus ? SendModule : LazerPayzer}</>
            )}
          </div>

          {/* Sticky Buttons */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            {/* Navigation Buttons */}
            <div className="md:flex items-center hidden justify-between gap-4">
              <GrayBtn
                btnText="← Previous Lesson"
                onClick={prevModule}
                disabled={currentIndex === 0}
                className="shrink-0"
              />

              {isCompleted && (
                <LargeBtn
                  btnText="Next Lesson →"
                  onClick={nextModule}
                  disabled={currentIndex === ModuleData.length - 1}
                />
              )}
            </div>

            <div className="flex items-center md:hidden justify-between gap-4">
              <GrayBtn
                btnText={<ArrowBigLeftDashIcon className="w-4 h-4" />}
                onClick={prevModule}
                disabled={currentIndex === 0}
              />

              {isCompleted && (
                <LargeBtn
                  btnText={<ArrowBigRightDashIcon className="w-4 h-4" />}
                  onClick={nextModule}
                  disabled={currentIndex === ModuleData.length - 1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
