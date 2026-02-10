"use client";
import {
  ElpisInfoBox,
  ElpisInfoBoxCap,
} from "@/app/components/Dashboard/CommComp";
import { ElpisSwitchBarTop } from "@/app/components/Dashboard/CourseComp";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { ConDateData, ConnectData } from "@/app/connector/CloggerFunc";
import { DateTimeTag, NotPops } from "@/app/util/ToastLoader";
import { ElpisCountdownTwo } from "@/app/components/Dashboard/Counter";
import { LargeBtn } from "@/app/components/Buttons/BtnLarge";
import { redirect, useRouter } from "next/navigation";

export default function page() {
  const [value, setValue] = useState(new Date());
  const { LoadEvent, DateData } = ConDateData();
  const { LoaderUser, userData } = ConnectData();
  const router = useRouter();

  const liveSessionDate = DateData ? DateData.SessionDate : moment().format("");
  const today = moment().format("2025-12-31");
  const DatePass = moment("2025-12-31 00:00:00").toISOString();
  const PlanStatus = userData ? userData.PlanStatus || false : false;

  const liveSessionDateII = DateData
    ? new Date(DateData.SessionDate) || ""
    : "";
  const LiveUrl = DateData
    ? DateData.LiveUrl || "https://digitalmogulacademy.com"
    : "https://digitalmogulacademy.com";

  const handleClick = () => {
    window.open(LiveUrl, "_blank"); // opens in a new tab
  };

  const Caln = (
    <div className="max-w-md mx-auto md:mt-0 mt-6 p-4 md:pt-0 pt-10 rounded-xl pointer-events-none">
      <Calendar
        onChange={() => {}} // no-op
        value={new Date(liveSessionDate)}
        tileDisabled={() => true} // disables all tiles
        tileClassName={({ date, view }) => {
          const formatted = moment(date).format("YYYY-MM-DD");
          const DD = moment(liveSessionDate).format("YYYY-MM-DD");
          if (view === "month" && formatted === DD) {
            return "bg-primary rounded-full font-semibold";
          }
          return "";
        }}
        tileContent={({ date, view }) => {
          const formatted = moment(date).format("YYYY-MM-DD");
          const DD = moment(liveSessionDate).format("YYYY-MM-DD");
          if (view === "month" && formatted === DD) {
            return (
              <div className="flex justify-center items-center mt-1">
                <span className="text-green-600 font-bold text-sm">✔</span>
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
  const Diser = (
    <>
      <ElpisCountdownTwo
        targetDate={liveSessionDateII}
        Button={
          <LargeBtn btnText={"Click Here"} onClick={() => handleClick()} />
        }
      />
    </>
  );
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;

  return (
    <div className="h-screen pb-10">
      <ElpisSwitchBarTop
        Title={"Mentorship & Community"}
        Subtext={
          "You’re not called to walk alone. Grow, learn, and connect with fellow kingdom traders."
        }
      />
      <div className="overflow-y-auto pb-40 h-full">
        <ElpisInfoBox
          ClickMe={"https://t.me/+2s2JP7w8rNEyZGM0"}
          ClickMeII={"https://discord.gg/xytHguvp7f"}
        />
        <ElpisInfoBoxCap Lefter={Caln} Clicker={Diser} />
      </div>
    </div>
  );
}
