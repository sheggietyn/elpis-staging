"use client";
import React, { useState, useContext } from "react";
import {
  Dashboard,
  DashboardLayout,
} from "@/app/components/Dashboard/Comps/CompDash";
import {
  DoubleFeatureBoxes,
  FeatureBoxes,
  QuoteCard,
} from "@/app/components/Dashboard/HomeDash";
import { ConDateData, ConnectData } from "@/app/connector/CloggerFunc";
import { BibleVerse } from "@/app/connector/DataListDisplay";
import { FlickLoad, ProductLoaderII } from "@/app/util/Loader";
import Image from "next/image";
import Book from "@/app/assets/images/ElpisLog.png";
import { ElpisCountdown } from "@/app/components/Dashboard/Counter";
import { GrayBtn } from "@/app/components/Buttons/BtnLarge";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import moment from "moment";
import { DateTag, DateTimeTag } from "@/app/util/ToastLoader";
import { Spinner, Tooltip } from "@radix-ui/themes";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";

export default function page() {
  const { LoaderUser, userData } = ConnectData();
  const { LoadEvent, DateData } = ConDateData();
  const { BibleData, LoadData } = BibleVerse();
  const [ModalOpen, setModalOpen] = useState(false);
  const user = useContext(AuthContext);

  const router = useRouter();

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const PlanType = userData
    ? userData.PlanType || "No Current Plan"
    : "No Current Plan";
  const PlanStatus = userData ? userData.PlanStatus || false : false;

  const TimeFlier = DateData ? (
    <DateTimeTag TakeDate={DateData.SessionDate} />
  ) : (
    moment().format("")
  );
  const DatePass = moment("2025-12-31 00:00:00").toISOString();

  const TimeLister = DateData ? new Date(DateData.SessionDate) || "" : "";
  const LiveUrl = DateData
    ? DateData.LiveUrl || "https://digitalmogulacademy.com"
    : "https://digitalmogulacademy.com";

  const DataForSession = {
    SessionDate: "",
    LiveUrl: "",
    Speaker: "",
    createdAt: "",
  };

  const BibleCaller = (
    <>
      {LoadData ? (
        <div className="max-w-sm w-full">
          <ProductLoaderII count={1} />
        </div>
      ) : (
        <>
          {BibleData.length > 0 ? (
            <>
              {BibleData.map((item) => (
                <div
                  className="bg-[#FEFAFA] p-6 rounded-md border-l-4 border-primary max-w-sm w-full"
                  key={item.id}
                >
                  <p className="text-gray-700 italic text-base">
                    "{item.Qoute}"
                  </p>
                  <p className="text-gray-500 text-sm mt-2 font-semibold">
                    — {item.Verse}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="h-30 flex justify-center items-center">
              <div className="w-20 h-20 md:w-24 md:h-24">
                <Image
                  src={Book}
                  alt="Bible Verse"
                  width={100} // Set a small width (adjust as needed)
                  height={100} // Set a small height (adjust as needed)
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

  const Diser = (
    <>
      <ElpisCountdown
        targetDate={TimeLister}
        onClick={LiveUrl} // Link to Live Session
        BottomBtn={
          <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        }
        CloseClick={() => setModalOpen(false)}
        Time={TimeFlier}
      />
    </>
  );

  return (
    <>
      <PopperModal
        Openner={ModalOpen}
        NavTitle={""}
        ContentPoper={Diser}
        OpennerClose={() => setModalOpen(false)}
        Width={"320px"}
      />
      <div className="max-w-screen overflow-y-auto h-[90vh] pb-14">
        <QuoteCard
          Namer={FirstName}
          ElpisPlan={PlanType}
          Bibler={BibleCaller}
        />
        <FeatureBoxes />
        <div className="pt-5">
          <DoubleFeatureBoxes onClick={() => setModalOpen(true)} />
        </div>
      </div>
    </>
  );
}
