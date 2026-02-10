// components/ElpisCountdown.jsx
"use client";
import Countdown from "react-countdown";
import { GrayBtn, SlotBtn } from "../Buttons/BtnLarge";
import Live from "@/app/assets/images/live.png";
import Image from "next/image";
import { DateTimeTag } from "@/app/util/ToastLoader";
import Link from "next/link";
import moment from "moment";

const Completionist = ({ onClick, CloseClick, Time }) => (
  <>
    <h1 className="text-gray-800 font-semibold">🎉 Live Session Hold Today!</h1>
    <p className="text-sm text-gray-600 text-center">
      Meeting Begins by <DateTimeTag TakeDate={Time} />
    </p>
    <div className="h-24 flex justify-center items-center">
      <div className="w-20 h-20 md:w-24 md:h-24">
        <Image
          src={Live}
          alt="Bible Verse"
          width={80} // Set a small width (adjust as needed)
          height={80} // Set a small height (adjust as needed)
          className="object-contain"
        />
      </div>
    </div>

    <div className="flex items-center justify-between pt-5 gap-x-3">
      <GrayBtn btnText={"close"} onClick={CloseClick} />
      <Link href={onClick} target={"_blank"}>
        <SlotBtn btnText={"Join Session"} />
      </Link>
    </div>
  </>
);

const TimeBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <div className="text-[#D4AF37] bg-gray-800 rounded-lg mb-1 font-semibold text-xl w-[40px] h-[40px] flex items-center justify-center">
      {value}
    </div>
    <div className="text-xs text-gray-700">{label}</div>
  </div>
);

export const ElpisCountdown = ({
  targetDate,
  onClick,
  BottomBtn,
  CloseClick,
  Time,
}) => {
  const useDate = moment(targetDate).format("YYYY-MM-DD"); // YYYY-MM-DD
  const today = moment().startOf("day"); // strip time
  const dateToCheck = moment(useDate, "YYYY-MM-DD").startOf("day");
  const showButton = dateToCheck.isSameOrAfter(today);
  if (!showButton) {
    return (
      <div className="mx-auto text-center">
        <h2 className="text-md md:text-xl font-bold mb-1 text-center text-gray-700">
          Countdown to Next Session
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          This is a Countdown to the next Meeting
        </p>
        <div className="flex justify-center gap-4 text-lg md:text-xl">
          <TimeBox label="Days" value={0} />
          <TimeBox label="Hours" value={0} />
          <TimeBox label="Minutes" value={0} />
          <TimeBox label="Seconds" value={0} />
        </div>
        <div className="mt-5">{BottomBtn}</div>
      </div>
    );
  }

  return (
    <div className="text-white p-2 rounded-2xl mx-auto text-center">
      <Countdown
        date={targetDate}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return (
              <Completionist
                onClick={onClick}
                CloseClick={CloseClick}
                Time={Time}
              />
            );
          } else {
            return (
              <div>
                <h2 className="text-md md:text-xl font-bold mb-1 text-gray-700">
                  Countdown to Next Session
                </h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                  This is a Countdown to the next Meeting
                </p>
                <div className="flex justify-center gap-4 text-lg md:text-xl">
                  <TimeBox label="Days" value={days} />
                  <TimeBox label="Hours" value={hours} />
                  <TimeBox label="Minutes" value={minutes} />
                  <TimeBox label="Seconds" value={seconds} />
                </div>
                <div className="mt-5">{BottomBtn}</div>
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export const ElpisCountdownTwo = ({ targetDate, Button }) => {
  const useDate = moment(targetDate).format("YYYY-MM-DD"); // YYYY-MM-DD
  const today = moment().startOf("day"); // strip time
  const dateToCheck = moment(useDate, "YYYY-MM-DD").startOf("day");
  const showButton = dateToCheck.isSameOrAfter(today);
  if (!showButton) {
    return (
      <div className="text-white p-2 rounded-2xl mx-auto text-center">
        <div className="flex gap-4 text-lg md:text-xl">
          <TimeBox label="Days" value={0} />
          <TimeBox label="Hours" value={0} />
          <TimeBox label="Minutes" value={0} />
          <TimeBox label="Seconds" value={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-2 rounded-2xl mx-auto text-center">
      <Countdown
        date={targetDate}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return <div className="text-left">{Button}</div>;
          } else {
            return (
              <div>
                <div className="flex gap-4 text-lg md:text-xl">
                  <TimeBox label="Days" value={days} />
                  <TimeBox label="Hours" value={hours} />
                  <TimeBox label="Minutes" value={minutes} />
                  <TimeBox label="Seconds" value={seconds} />
                </div>
              </div>
            );
          }
        }}
      />
    </div>
  );
};
