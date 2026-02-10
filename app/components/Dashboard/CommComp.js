import Image from "next/image";
import Globe from "@/app/assets/images/exposi.png";
import { LargeBtn, SlotBtn } from "../Buttons/BtnLarge";
import Link from "next/link";

export const SocialAlertBoxes = ({ ClickMe, ClickMeII }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Discord Box (Compulsory Look) */}
      <div className="flex-1 border-2 border-eggplant rounded-2xl p-4 shadow-lg bg-blushpink">
        <h2 className="text-lg font-bold text-eggplant">
          🚨 Join our Discord!
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Mandatory: Your hub for Elpis Academy access to live sessions,
          mentorships,extra resources, community & official updates all in one
          place.
        </p>
        <Link href={ClickMeII}>
          <button className="mt-3 px-4 py-2 cursor-pointer bg-eggplant text-white rounded-lg font-semibold w-full">
            Join Discord
          </button>
        </Link>
      </div>

      {/* Telegram Box */}
      <div className="flex-1 border border-primary rounded-2xl p-4 shadow-sm bg-[#F9F5E7]">
        <h2 className="text-lg font-semibold text-primary">
          Join our Telegram Group
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Get trading updates and connect with the community.
        </p>
        <Link href={ClickMe}>
          <button className="mt-3 px-4 py-2 cursor-pointer bg-primary text-white rounded-lg font-semibold w-full">
            Join Telegram
          </button>
        </Link>
      </div>
    </div>
  );
};

export const ElpisInfoBox = ({ ClickMe, ClickMeII }) => {
  return (
    <div className="w-full bg-white border border-yellow-200 rounded-2xl shadow-md mb-5 overflow-hidden flex flex-col md:flex-row items-center">
      {/* Image Section */}
      <div className="md:w-1/2 w-full h-64 flex p-5 justify-center items-center md:h-auto">
        <Image
          src={Globe} // Replace with your image
          alt="Affiliate Promotion"
          width={150}
          height={150}
          className="w-full h-[250px] rounded-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="p-6 md:p-8 flex flex-col gap-4 md:w-1/2">
        <h2 className="text-2xl font-semibold gold-gradient-text">
          Kingdom Traders Lounge{" "}
        </h2>
        <p className="text-gray-600">
          Meet other traders from around the world. Share wins, encourage
          others, and stay grounded in faith.
        </p>
        <div>
          <SocialAlertBoxes ClickMe={ClickMe} ClickMeII={ClickMeII} />
        </div>
      </div>
    </div>
  );
};

export const ElpisInfoBoxCap = ({ Lefter, Clicker }) => {
  return (
    <div className="w-full bg-white border border-yellow-200 rounded-2xl shadow-md mb-5 overflow-hidden flex flex-col md:flex-row items-center">
      {/* Image Section */}
      <div className="md:w-1/2 w-full h-64 flex p-5 justify-center md:pb-0 pb-5 items-center md:h-auto">
        {Lefter}
      </div>

      {/* Text Section */}
      <div className="p-6 md:p-8 flex flex-col gap-4 md:mb-0 mt-7 md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Live Mentorship Calls{" "}
        </h2>
        <p className="text-gray-600">
          Join our founder and coaches live each month. Come with questions,
          testimonies, and a heart to grow.
        </p>
        <div>{Clicker}</div>
      </div>
    </div>
  );
};
