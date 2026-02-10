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
import Avatar from "@/app/assets/images/profile.png";
import { BankAccountList } from "@/app/connector/DataListDisplay";
import { Trash2 } from "lucide-react";
import { LockLoad, Onload } from "@/app/util/Loader";
import { CompEmptySmall } from "@/app/components/EmptyComp/CompEmpty";
import Bank from "@/app/assets/images/bank.png";
import { PopModal } from "@/app/components/Modals/ModalComp";
import { AuthContext } from "@/app/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { FormInput, PhoneInputII } from "@/app/components/Inputs/InputForm";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import moment from "moment";
import { USDTSender, nigerianBanks } from "@/app/data/BankListData";
import { GrayBtn, SlotBtn } from "@/app/components/Buttons/BtnLarge";
import { ref, remove, set, update } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";
import { Spinner, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

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
  const [Lastname, setLastname] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Addmap, setAddmap] = useState("");
  const [birthday, setBirthday] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const rawDate = e.target.value; // yyyy-mm-dd from input
    const formatted = moment(rawDate).format("DD-MM-YYYY"); // dd-mm-yyyy
    setBirthday(formatted);
  };

  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Username = userData ? userData.Username || "N/A" : "N/A";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const Country = userData ? userData.Country || "N/A" : "N/A";
  const MyAddress = userData ? userData.Address || "N/A" : "N/A";
  const ReferUsername = userData ? userData.ReferUsername || "N/A" : "N/A";
  const AccId = userData ? userData.AccountId || "N/A" : "N/A";
  const Bday = userData
    ? moment(userData.Birthday).format("DD-MM-YYYY") || "N/A"
    : "N/A";

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

  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const AffiliatePlan = userData
    ? userData.AffiliatePlan || "No Affiliate Plan"
    : "No Affiliate Plan";

  const createdDate = userData ? DateTag(userData.createdAt) || "N/D" : "N/D";

  const createdAt = moment().format("");
  const BankAccountData = {
    AccountName: AccName ? AccName : "USDT Wallet",
    AccountNos: AccNos,
    BankName: BankName,
    createdAt: createdAt,
    //BankCategories: BankCategories,
    CurrencyType: activeCurrency,
    BankCode: BankCode,
    userId: user.uid,
  };

  const Fname = Firstname ? Firstname : FirstName;
  const Lname = Lastname ? Lastname : LastName;
  const Phonenos = PhoneNo ? PhoneNo : PhoneNos;
  const Address = Addmap ? Addmap : MyAddress;
  const Birthday = birthday ? birthday : Bday;

  const UpdateMyData = {
    Firstname: Fname,
    Lastname: Lname,
    PhoneNos: Phonenos,
    Address: Address,
    Birthday: birthday,
  };

  const UpdateProfile = () => {
    LoadFunc();
    update(ref(DB, `users/${user.uid}`), UpdateMyData)
      .then(() => {
        setModalOpen(false);
        NotPops("success", "Profile Updated Successfully");
        setTimeout(() => {
          StopLoad();
        }, 200);
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const Clickers = () => {
    LoadFunc();
    set(
      ref(DB, `Bank Accounts/${user.uid}/${user.uid}/${DocID}`),
      BankAccountData
    )
      .then(() => {
        setModalOpen(false);
        NotPops("success", "Account Added successfully");
        setTimeout(() => {
          StopLoad();
        }, 200);
      })
      .catch((e) => {
        NotPops("error", e.message);
        StopLoad();
      });
  };

  const handleBankChange = (e, array) => {
    const selectedName = e.target.value;
    const bank = array.find((b) => b.name === selectedName);

    if (bank) {
      setBankName(bank.name); // Displayed value in the dropdown
      setBankCode(bank.code); // Code used behind the scenes
    } else {
      setBankName("");
      setBankCode("");
    }
  };

  const handleSaveAccount = () => {
    if (BankName === "") {
      NotPops("error", "You Need to choose a bank");
    } else if (AccNos === "" || AccNos.length < 10) {
      NotPops("error", "account number cannot be less than 10 digit");
    } else {
      if (AccName === "") {
        NotPops(
          "error",
          "add an account name that correspond with the account number above"
        );
      } else {
        Clickers();
      }
    }
  };

  const handleSaveAccountUSD = () => {
    if (BankName === "") {
      NotPops("error", "You Need to choose a bank");
    } else if (AccNos === "" || AccNos.length < 10) {
      NotPops("error", "account number cannot be less than 10 digit");
    } else {
      Clickers();
    }
  };

  const ClickerDelete = async (item) => {
    const Url = `Bank Accounts/${user.uid}/${user.uid}/${item.id}`;
    const bankRef = ref(DB, Url);
    try {
      setLoad(true);
      await remove(bankRef);
      NotPops("success", "Account deleted successfully");
      setLoad(false);
    } catch (e) {
      NotPops("error", error.message);
      setLoad(false);
    }
  };

  const Switchh = () => {
    setAccName("");
    setAccNos("");
    setBankName("");
    setBankCode("");
  };

  const CurrencySwitch = ({ onChange }) => {
    const handleSwitch = (currency) => {
      setActiveCurrency(currency);
      onChange(currency); // optional callback to parent
      Switchh();
    };

    return (
      <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        {["NGN", "USD"].map((currency) => (
          <button
            key={currency}
            onClick={() => handleSwitch(currency)}
            className={`px-5 py-2 text-sm font-medium transition-all ${
              activeCurrency === currency
                ? "bg-[#D4AF3F] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {currency}
          </button>
        ))}
      </div>
    );
  };

  const BrillaCon = (
    <div className="bg-profile-gradient rounded-2xl h-[450px] border border-[#f6e9c6] p-6 md:mb-0 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🌟 Your Subscriptions
      </h2>

      {[
        {
          title: "Student Trading Plan",
          plan: PlanType,
          status: PlanStatus,
          till: PlanExpiryDate,
        },
        {
          title: "Trading Signal Plan",
          plan: SignalPlan,
          status: SignalStatus,
          till: SignalSubExpDate,
        },
        {
          title: "Signal Addons",
          plan: AddOnSignalPlan,
          status: AddOnSignalStatus,
          till: AddOnSignalSubExpDate,
        },
        {
          title: "Affiliate Plan",
          plan: AffiliatePlan,
          status: AffiliateStatus,
          till: "Life Time",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 mb-4 hover:shadow transition"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-500">
              {item.plan}{" "}
              {item.till !== "-" && (
                <span className="text-gray-500 font-medium">
                  | Till: {item.till}
                </span>
              )}
            </p>
          </div>

          <BadgeTag
            BadgeTitle={item.status ? "Active" : "Inactive"}
            ColorTag={item.status ? "green" : "gray"}
          />
        </div>
      ))}
    </div>
  );

  const FlatAccount = () => {
    return (
      <div className="h-[450px] overflow-y-auto pr-2">
        {BankData.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 mb-4 hover:shadow transition"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800">
                {item.AccountName}
              </p>
              <p className="text-xs text-gray-500">
                {item.BankName}
                {item.AccountNos !== "-" && (
                  <span className="text-gray-500 font-medium">
                    {" "}
                    | {item.AccountNos}
                  </span>
                )}
              </p>
            </div>

            <div>
              <BadgeTag
                BadgeTitle={item.CurrencyType === "USD" ? "USD" : "NGN"}
                ColorTag={item.CurrencyType === "USD" ? "gold" : "blue"}
              />
              <div className="mt-1 text-center">
                {Load ? (
                  <Spinner />
                ) : (
                  <Tooltip
                    content="Delete Account Instantly"
                    sideOffset={5}
                    align="start"
                    className="bg-white rounded p-4 z-50"
                  >
                    <button onClick={() => ClickerDelete(item)}>
                      <Trash2 className="w-4 h-4 text-gray-300 hover:text-gray-600" />
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ProfilerDi = (
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
              {/*
              <button className="px-5 py-2 emboss text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                ⚙️ Verification
              </button>
              */}
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl  border border-gray-100 p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              👤 Profile Details
            </h2>
            <div className="text-sm text-gray-600 md:space-y-2 space-y-6">
              <p>
                <strong>Username:</strong> {Username}
              </p>
              <p>
                <strong>Email:</strong> {Email}
              </p>
              <p>
                <strong>Phone:</strong> {PhoneNos}
              </p>
              <p>
                <strong>Country:</strong> {Country}
              </p>

              <p>
                <strong>Birthday:</strong> {Bday}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 md:mb-0 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              🔒 Address/Account Info
            </h2>
            <div className="text-sm text-gray-600 md:space-y-2 space-y-6">
              <p>
                <strong>Address:</strong> {MyAddress}
              </p>
              <p>
                <strong>Account Id:</strong> {AccId}
              </p>
              <p>
                <strong>Who Reffered Me:</strong>{" "}
                {ReferUsername ? ReferUsername : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription + Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscription Box */}
          <div className="overflow-y-auto hide-scrollbar">{BrillaCon}</div>

          {/* Account Details Form */}
          <div className="bg-profile-gradient rounded-2xl border-l-3 h-[450px] border-[#A97A22] p-6 relative overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🏦 Account Details
            </h2>

            <div className="space-y-4 overflow-y-auto h-full hide-scrollbar">
              {LoadData ? (
                <LockLoad count={4} />
              ) : (
                <>
                  {BankData.length > 0 ? (
                    <FlatAccount />
                  ) : (
                    <div className="flex items-center h-full justify-center">
                      <CompEmptySmall
                        SmallTitle={"No Bank Yet Account"}
                        src={Bank}
                      />
                    </div>
                  )}
                </>
              )}

              {BankData.length > 3 ? null : (
                <button
                  type="submit"
                  className="bg-gold-gradient-two text-white absolute top-4 right-4 text-xs px-3 py-1 rounded-md hover:bg-[#805f1a] transition"
                  onClick={() => {
                    Switchh();
                    setModalOpen(true);
                    setFillOne(1);
                  }}
                >
                  Add Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Lass = (
    <div>
      <div className="mb-4">
        <SwitchGenPost
          AllOption={"Choose Bank"}
          label={"Choose Bank Name"}
          ChangeStat={BankName}
          StatusCallTru={nigerianBanks}
          onChange={(e) => handleBankChange(e, nigerianBanks)}
        />
      </div>
      <div className="mb-4">
        <FormInput
          placeholder={"Account Number"}
          label={"Account Number"}
          type={"number"}
          value={AccNos}
          onChange={(e) => setAccNos(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Account Name"}
          label={"Account Name"}
          type={"text"}
          value={AccName}
          onChange={(e) => setAccName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Add Account"}
          onClick={() => handleSaveAccount()}
          disabled={isLoading}
        />
      </div>
    </div>
  );

  const Coiner = (
    <div>
      <div className="mb-4">
        <SwitchGenPost
          AllOption={"USDT Type"}
          label={"Usdt Type"}
          ChangeStat={BankName}
          StatusCallTru={USDTSender}
          onChange={(e) => handleBankChange(e, USDTSender)}
        />
      </div>
      <div className="mb-4">
        <FormInput
          placeholder={"USDT Account Address"}
          label={"USDT Account Address "}
          type={"text"}
          value={AccNos}
          onChange={(e) => setAccNos(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Add Account"}
          onClick={() => handleSaveAccountUSD()}
          disabled={isLoading}
        />
      </div>
    </div>
  );

  const Former = (
    <div className={"p-3"}>
      <div className="items-center justify-center flex w-full mb-3">
        <CurrencySwitch
          onChange={(val) => console.log("Selected currency:", val)}
        />
      </div>
      <h1 className="font-cinzel font-semibold text-md text-center text-gray-900">
        Add NGN,USD And USDT Bank Account
      </h1>
      <p className="text-sm text-center text-gray-500">
        Add your bank account for withdrawing your affiliate fund
      </p>

      {activeCurrency === "NGN" ? Lass : Coiner}
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
      <div className="mb-4 flex items-center w-full">
        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"First Name"}
            label={"First Name"}
            type={"text"}
            value={Fname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"Last Name"}
            label={"Last Name"}
            type={"text"}
            value={Lname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <PhoneInputII
          placeholder={"Phone Number"}
          label={"Phone Number"}
          type={"text"}
          value={Phonenos}
          onChange={setPhoneNo}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Address"}
          label={"Address"}
          type={"text"}
          value={Address}
          onChange={(e) => setAddmap(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput type="date" placeholder="Birthday" onChange={handleChange} />
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Update Profile"}
          onClick={() => UpdateProfile()}
          disabled={isLoading}
        />
      </div>
    </div>
  );

  return (
    <>
      <PopModal
        Open={ModalOpen}
        Title={""}
        Description={FillOne === 1 ? Former : Editer}
        OpenClose={() => setModalOpen(false)}
        Width={"380px"}
      />
      <div className="overflow-y-auto h-screen">{ProfilerDi}</div>
    </>
  );
}
