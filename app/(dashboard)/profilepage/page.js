"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { ConnectData } from "@/app/connector/CloggerFunc";
import useLoader, {
  DateTag,
  NotPops,
  WhiteLoader,
} from "@/app/util/ToastLoader";
import { BadgeTag } from "@/app/util/UtilsJester";
import Avatar from "@/app/assets/images/profilep.jpg";
import { BankAccountList } from "@/app/connector/DataListDisplay";
import { Trash2 } from "lucide-react";
import { LockLoad, Onload } from "@/app/util/Loader";
import { CompEmptySmall } from "@/app/components/EmptyComp/CompEmpty";
import Bank from "@/app/assets/images/bank.png";
import { PopModal } from "@/app/components/Modals/ModalComp";
import { AuthContext } from "@/app/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "@/app/components/Inputs/InputForm";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import moment from "moment";
import { USDTSender, nigerianBanks } from "@/app/data/BankListData";
import { GrayBtn, SlotBtn } from "@/app/components/Buttons/BtnLarge";
import { ref, remove, set } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";
import { Spinner, Tooltip } from "@radix-ui/themes";

export default function page() {
  const { LoaderUser, userData } = ConnectData();
  const user = useContext(AuthContext);
  const { BankData, LoadData } = BankAccountList();
  const [ModalOpen, setModalOpen] = useState(false);
  const [AccName, setAccName] = useState("");
  const [AccNos, setAccNos] = useState("");
  const [BankName, setBankName] = useState("");
  const [BankCode, setBankCode] = useState("");
  const [CurrencyType, setCurrencyType] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [Load, setLoad] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("NGN");
  const [FillOne, setFillOne] = useState(1);
  const DocID = uuidv4();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState(
    userData ? userData.Lastname || "" : ""
  );
  const [PhoneNo, setPhoneNo] = useState(
    userData ? userData.PhoneNos || "" : ""
  );

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Username = userData ? userData.Username || "N/A" : "N/A";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const Country = userData ? userData.Country || "N/A" : "N/A";
  const PlanType = userData
    ? userData.PlanType || "No Student Plan"
    : "No Student Plan";
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PlanExpiryDate = userData
    ? userData.PlanExpiryDate
      ? DateTag(userData.PlanExpiryDate)
      : "N/A" || "N/A"
    : "N/A";
  const SignalStatus = userData ? userData.SignalStatus || false : false;
  const SignalPlan = userData
    ? userData.SignalPlan || "No Signal Plan"
    : "No Signal Plan";
  const SignalSubExpDate = userData
    ? userData.SignalSubExpDate
      ? DateTag(userData.SignalSubExpDate)
      : "N/A" || "N/A"
    : "N/A";

  const AddOnSignalStatus = userData
    ? userData.AddOnSignalStatus || false
    : false;
  const AddOnSignalPlan = userData
    ? userData.AddOnSignalPlan || "No Signal Addon Plan"
    : "No Signal Addon Plan";
  const AddOnSignalSubExpDate = userData
    ? userData.AddOnSignalSubExpDate
      ? DateTag(userData.AddOnSignalSubExpDate)
      : "N/A" || "N/A"
    : "N/A";

  const AffiliateStatus = userData
    ? userData.AddOnSignalStatus || false
    : false;
  const AffiliatePlan = userData
    ? userData.AddOnSignalPlan || "No Affiliate Plan"
    : "No Affiliate Plan";

  const createdDate = userData ? DateTag(userData.createdAt) || "N/D" : "N/D";

  const Switchh = () => {
    setAccName("");
    setAccNos("");
    setBankName("");
    setBankCode("");
  };

  const DisplayProfiler = (
    <div className="pb-25">
      <div className="max-w-6xl mx-auto p-2 md:p-6 space-y-8 font-sans">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl md:mb-5 mb-4 border border-gray-200 relative overflow-hidden">
          <div className="relative">
            <Image
              src={Avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#D4AF3F] shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-[#D4AF3F] w-5 h-5 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {FirstName} {LastName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              @{Username} | Member since {createdDate}
            </p>
            <div className="mt-4 flex gap-3">
              <button
                className="px-5 py-2 text-sm bg-gold-gradient-two text-white rounded-md hover:bg-[#a9882c] transition"
                onClick={() => {
                  setModalOpen(true);
                  Switchh();
                  setFillOne(2);
                }}
              >
                ✏️ Edit Profile
              </button>
              <button className="px-5 py-2 emboss text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                ⚙️ Verification
              </button>
            </div>
          </div>
          <div className="mb-4">
            <FormInput
              placeholder={"First Name"}
              label={"First Name"}
              type={"text"}
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const Editer = (
    <div>
      <h1 className="font-cinzel font-semibold text-md text-center text-gray-900">
        Edit Profile
      </h1>
      <p className="text-sm text-center text-gray-500">
        Update your Profile Data
      </p>
      <div className="mb-4">
        <FormInput
          placeholder={"First Name"}
          label={"First Name"}
          type={"text"}
          value={Firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Last Name"}
          label={"Last Name"}
          type={"text"}
          value={Lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Phone Number"}
          label={"Phone Number"}
          type={"text"}
          value={PhoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Profile"}
          onClick={() => handleSaveAccount()}
          disabled={isLoading}
        />
      </div>
    </div>
  );

  //FillOne === 1 ? null :
  return (
    <div>
      <PopModal
        Open={ModalOpen}
        Title={""}
        Description={Editer}
        OpenClose={() => setModalOpen(false)}
        Width={"400px"}
      />
      <div className="overflow-y-auto h-screen">{DisplayProfiler}</div>
    </div>
  );
}
