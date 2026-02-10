"use client";
import { AuthContext } from "@/app/auth/AuthProvider";
import {
  GrayBtn,
  MiniBtn,
  SlotBtn,
  TinyBtn,
} from "@/app/components/Buttons/BtnLarge";
import {
  AffiliateMenuLayout,
  ReferralStats,
} from "@/app/components/Dashboard/AffCom";
import { SpeedometerBox } from "@/app/components/Dashboard/ChartComp";
import { FormInput } from "@/app/components/Inputs/InputForm";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { TableBox } from "@/app/components/TableComp/CompTable";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { AffiliateCash } from "@/app/util/PayFunction";
import useLoader, {
  CountFormat,
  DateAdder,
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { CheckIcon, Copy } from "lucide-react";
import React, { useState, useContext, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { BankAccountList } from "@/app/connector/DataListDisplay";
import { CompEmptySmall } from "@/app/components/EmptyComp/CompEmpty";
import { FinalAffLoader, FlickLoad } from "@/app/util/Loader";
import money from "@/app/assets/images/money.png";
import {
  CashOptions,
  PaymentOptions,
} from "@/app/components/HeroSections/PayClicker";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ExportRank, ExportRankColor } from "@/app/data/dataTable";
import { BadgeCard } from "@/app/util/UtilsJester";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import {
  PriceCompHold,
  PriceCompHoldII,
} from "@/app/components/Dashboard/CourseComp";
import { getSession } from "@/app/Libs/Session";
import { child, get, ref } from "firebase/database";
import { redirect, useRouter } from "next/navigation";
import { DB } from "@/app/Firebase/AuthHolder";

export default function page() {
  const [copied, setCopied] = useState();
  const user = useContext(AuthContext);
  const { LoaderUser, userData } = ConnectData();
  const { BankData, LoadData } = BankAccountList();
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [AccountName, setAccountName] = useState("");
  const [AccId, setAccId] = useState("");
  const [AccountNos, setAccountNos] = useState("");
  const [BankName, setBankName] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("paystack");
  const [paystack, setPaystack] = useState(null);
  const [BankCode, setBankCode] = useState("");
  const router = useRouter();

  const Username = userData ? userData.Username || "User" : "User";
  const EarnThisMonth = userData ? userData.Earning_This_Month || 0 : 0;
  const AffiliateCount = userData ? userData.monthly_Affiliate_Count || 0 : 0;
  const AvailableBalance = userData ? userData.Aff_Available_Balance || 0 : 0; //Total_Withdrawable
  const Payeer = parseFloat(AvailableBalance) * 0.25;

  const AffiliatePayOutDay = userData ? userData.AffiliatePayOutDay || 0 : 0;
  const AffiliateFirstPayDate = userData
    ? userData.AffiliateFirstPayDate || ""
    : "";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const Fast_Start_Bonus = userData ? userData.Fast_Start_Bonus || 0 : 0;
  const Override_Earning = userData ? userData.Override_Earning || 0 : 0;
  const AffiliateRank = userData ? userData.AffiliateRank || "N/A" : "N/A";
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanStatus = userData ? userData.PlanStatus || false : false;

  const OrderId = getRandom(8);

  const DocID = uuidv4();
  const Date = moment().format("");

  const Today = moment().format("YYYY-MM-DD");

  const UpdateDate = DateAdder(7);

  const FinalGambit = `https://elpis-staging.vercel.app/${Username}`;
  const Linker = FinalGambit.toString();
  const PassAff = "https://digitalmogulacademy.com/affiliate";

  const handleCopyClick = () => {
    if (Linker) {
      const textArea = document.createElement("textarea");
      textArea.value = Linker;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
      NotPops("success", "Refferal link copied");
    } else {
      NotPops("success", "Cannot copy until data is loaded");
    }
  };

  const data = useMemo(
    () => [
      { name: "Progress", value: 78, fill: "#D4AF3F" },
      { name: "Remaining", value: 22, fill: "#F0F0F0" },
    ],
    []
  );

  const AccountPopper = (item) => {
    setAccountNos(item.AccountNos);
    setAccountName(item.AccountName);
    setBankName(item.BankName);
    setAccId(item.id);
    setBankCode(item.BankCode);
  };

  // Check Affiliate Balance and Rank
  // If Affiliate Rank ==='Starter', on PayDay Just Pay Them There Money Grace FallBack
  // Else if They are in a Rank, Pay Them 25% of Their Affiliate Earning and fast Start/ override bonus if it exist

  const PayLayer =
    parseFloat(AffiliatePayOutDay) +
    parseInt(Fast_Start_Bonus) +
    parseInt(Override_Earning); // Payment if the Affiliate marketer has an Affilate tied to them .. then affiliate tied to them get this

  const StarterPayer =
    parseFloat(AvailableBalance) +
    parseInt(Fast_Start_Bonus) +
    parseInt(Override_Earning); // Payment if user never crossed the starter level

  const LastPayerr = userData ? PayLayer : 0; // userData.AffiliateRank === "Starter" This is used to calculate all payment and bonuses

  const CurrencyChecker = selected === "paystack" ? "NGN" : "USD";
  const LineNaira = userData ? 1580 * LastPayerr : 0;
  const LineUSD = userData ? LastPayerr : 0;

  // Select Account for WIthdrawa

  const userId = user.uid;

  const LoaderFade = () => {
    setModalOpen(false);
  };

  const sendPay = async () => {
    //const balanceRef = ref(DB, `/users/${userId}`);
    //const inputStringNGN = String(Amount);
    const savedSession = getSession(user.uid);
    const userRef = ref(DB, `Session`);
    const userNodeRef = child(userRef, userId);
    const snapshot = await get(userNodeRef);
    const BloomSecData = snapshot.val();
    if (!userData) {
      NotPops("error", "Something went wrong reload and try again");
    } else if (
      parseFloat(LastPayerr) < 1 ||
      isNaN(LastPayerr) ||
      LastPayerr === null
    ) {
      NotPops("error", "Balance not enough for withdrawal");
    } else if (AccountNos === "" || AccountName === "") {
      NotPops("error", "Select or add an account to initiate withdrawal");
    } else if (
      savedSession.param1 !== BloomSecData.Session_Id ||
      savedSession.param2 !== BloomSecData.AgentId
    ) {
      NotPops(
        "error",
        "invalid session, make sure you are login on just one device"
      );
    } else {
      if (selected === "") {
        NotPops("error", "please choose a withdrawal currency type method");
      } else if (AffiliatePayOutDay < 1 || isNaN(AffiliatePayOutDay)) {
        NotPops("error", "your withdrawable balance is low");
      } else {
        LoadFunc();
        AffiliateCash(
          LoadFunc,
          StopLoad,
          LoaderFade,
          user.uid,
          LastPayerr,
          LineNaira,
          DocID,
          Username,
          FirstName,
          LastName,
          "Affiliate Pay",
          Date,
          Email,
          AccountName,
          AccountNos,
          BankName,
          CurrencyChecker,
          Fast_Start_Bonus,
          Override_Earning,
          AffiliatePayOutDay,
          BankCode
        );
      }
    }
  };

  const BankAccountData = {
    AccountName: "",
    AccountNos: "",
    BankName: "",
    createdAt: "",
    BankCategories: "",
  };

  const useDate = moment(AffiliateFirstPayDate).format("YYYY-MM-DD"); // YYYY-MM-DD
  const today = moment().startOf("day"); // strip time
  const dateToCheck = moment(useDate, "YYYY-MM-DD").startOf("day");
  const showButton = dateToCheck.isSameOrAfter(today);
  //AffiliateFirstPayDate === Today

  const BalanceCash = () => {
    if (AffiliatePayOutDay < 1 || isNaN(AffiliatePayOutDay)) {
      NotPops("error", "your withdrawable balance is low");
    } else {
      setModalOpen(true);
    }
  };
  const DisplayyyPay = (
    <>
      {/*AffiliateFirstPayDate === Today && ( )*/}
      <TinyBtn btnText={"Cash Out"} onClick={() => BalanceCash()} />
    </>
  );

  const AffiliateNav = (
    <div className="flex items-center w-auto my-4 gap-1">
      <div className={"flex-1"}>
        <FormInput
          textplace={"affiliate link"}
          value={FinalGambit}
          more={"text-gray-600"}
          disabled={true}
        />
      </div>
      <MiniBtn
        Title={
          <>
            {copied ? (
              <>
                <CheckIcon size={15} className="inline mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} className="inline mr-1" />
                Copy
              </>
            )}
          </>
        }
        more={`${
          copied ? "bg-green-600" : "bg-primary"
        }text-white py-3 px-3 hover:text-white`}
        onClick={() => handleCopyClick()}
      />
    </div>
  );

  const DisplayAccount = () => {
    return (
      <div>
        <>
          {BankData.map((item) => (
            <div
              className={`bg-gray-200 rounded-md p-3 my-4 text-left ${
                item.id === AccId ? "border border-primary" : null
              }`}
              onClick={() => AccountPopper(item)}
              key={item.id}
            >
              <h3 className="text-gray-800 text-md font-semibold">
                {item.AccountName}
              </h3>
              <p className="text-gray-600 text-xs">
                {item.BankName} | {item.AccountNos}
              </p>
            </div>
          ))}
        </>
        <div className="my-4">
          <h1 className="text-gray-800 font-cinzel text-xs font-bold">
            Choose Cash Out Payment Method
          </h1>
          <CashOptions
            selected={selected}
            onClick={() => setSelected("paystack")}
            onClickII={() => setSelected("nowpayment")}
            NairaCheck={NGNFormat(LineNaira)}
            DollarCheck={USDFormat(LineUSD)}
          />
        </div>
      </div>
    );
  };

  const Costodian = (
    <div className="text-center">
      <h1 className="text-gray-800 font-cinzel font-bold">🎉 Cash Out!</h1>
      <p className="text-sm text-gray-600 text-center">
        Select an Account You will Like to Get Paid to
      </p>
      <>
        {LoadData ? (
          <FlickLoad count={2} />
        ) : (
          <>
            {BankData.length > 0 ? (
              <DisplayAccount />
            ) : (
              <CompEmptySmall
                SmallTitle={
                  "You don't have a bank account for cashout, goto your profile to add an account for cashout"
                }
                src={money}
              />
            )}
          </>
        )}
      </>

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setModalOpen(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Request Cashout"}
          onClick={() => sendPay()}
          disabled={isLoading} //!AccountNos ||
        />
      </div>
    </div>
  );

  const levelInfo = [
    { level: "Starter", progress: 10 },
    { level: "Zamar Affiliate", progress: 30 },
    { level: "Gibbor Ruby", progress: 50 },
    { level: "Archo Diamond", progress: 70 },
    { level: "Elion Platinum", progress: 90 },
    { level: "Kodesh Legend", progress: 100 },
  ];

  const AffiliateProgressChart = ({ userLevel }) => {
    // Match user level to predefined progress
    const matchedLevel = levelInfo.find(
      (lvl) => lvl.level.toLowerCase() === AffiliateRank?.toLowerCase()
    ) || { level: "Unknown", progress: 0 };

    const data = useMemo(
      () => [
        { name: "Progress", value: matchedLevel.progress, fill: "#D4AF3F" },
        {
          name: "Remaining",
          value: 100 - matchedLevel.progress,
          fill: "#F0F0F0",
        },
      ],
      [matchedLevel]
    );

    return (
      <div className="w-full relative md:w-1/2 h-58">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="100%"
            barSize={20}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Badge Label */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <BadgeCard
            Title={ExportRank(AffiliateRank)}
            color={ExportRankColor(AffiliateRank)}
          />{" "}
        </div>
      </div>
    );
  };

  return (
    <>
      <PopperModal
        Openner={ModalOpen}
        NavTitle={""}
        ContentPoper={Costodian}
        OpennerClose={() => setModalOpen(false)}
        Width={"370px"}
      />
      <div className="max-w-screen h-[90vh] overflow-auto">
        {LoaderUser ? (
          <FinalAffLoader />
        ) : (
          <>
            {AffiliateStatus ? (
              <div>
                <ReferralStats
                  EarnCash={USDFormat(EarnThisMonth)}
                  RefCount={CountFormat(AffiliateCount)}
                  NowBalance={USDFormat(LastPayerr)}
                  btnDisplay={DisplayyyPay}
                  FastBonus={Fast_Start_Bonus}
                  OverBonus={Override_Earning}
                />
                <AffiliateMenuLayout />
                <SpeedometerBox
                  AffiliateNav={AffiliateNav}
                  ChartHolder={<AffiliateProgressChart />}
                />
              </div>
            ) : (
              <PriceCompHoldII
                contentIn={
                  <PayerAffiliate
                    PlanStatus={PlanStatus}
                    DocID={DocID}
                    userData={userData}
                    orderId={OrderId}
                    userId={user.uid}
                    Date={Date}
                    PassSuccess={PassAff}
                  />
                }
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
