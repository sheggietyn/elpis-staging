"use client";
import {
  EACMCourseBoxes,
  ElpisSwitchBar,
  PriceCompHold,
} from "@/app/components/Dashboard/CourseComp";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import { CourseDataList } from "@/app/connector/DataListDisplay";
import { ProductLoad, ProductLoader } from "@/app/util/Loader";
import React, { useState, useEffect, useContext } from "react";
import Edu from "@/app/assets/images/edu.png";
import { ConnectData } from "@/app/connector/CloggerFunc";
import PriceCards, {
  AffiliatePricingBox,
  PriceCardsTwo,
} from "@/app/components/HeroSections/Pricing";
import useLoader, {
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { GrayBtn, LongBtn } from "@/app/components/Buttons/BtnLarge";
import { CheckFunction } from "@/app/util/PayFunction";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { BoxHolder } from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { SignUpBoxFIll } from "@/app/components/authcomp/AuthComp";
import { BottomTag, ProgressLevel } from "@/app/util/UtilsJester";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import { child, ref, remove } from "firebase/database";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "@/app/Libs/Session";
import { WildGradientSignup } from "@/app/components/authcomp/SignUpNewBox";
import { ArrowLeft, GraduationCap, Users } from "lucide-react";
import SelectableBox from "@/app/components/Dashboard/NewComp";
import { PayerAffiliateII } from "@/app/util/AffLayer";
import { VerifyTnx } from "@/app/Libs/TxChecker";
import {
  NewLayout,
  PayLayout,
  PayOps,
  PaymentArray,
  handleSelectPlan,
} from "@/app/components/Dashboard/Comps/PayLayout";
import { AffiliatePay } from "@/app/components/Dashboard/Comps/AffiliatePay";
import { BabyCheckout } from "@/app/components/Dashboard/Comps/BabyCheck";
import { CartPlanCard } from "@/app/components/Dashboard/Comps/CartContext/CartCard";
import { useCart } from "@/app/components/Dashboard/Comps/CartContext/Cart";
import {
  addToCart,
  useCartShow,
} from "@/app/components/Dashboard/Comps/CartContext/NewCart";

export default function page() {
  const [active, setActive] = useState("Beginner");
  const user = useContext(AuthContext);
  const [Load, setLoad] = useState(false);
  const [LoadII, setLoadII] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selected, setSelected] = useState("paystack");
  const [activeTab, setActiveTab] = useState("Student");
  const { LoaderUser, userData } = ConnectData();
  const [selectedRole, setSelectedRole] = useState("student");
  //const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedII, setSelectedII] = useState("paystack");
  const [Switch, setSwitch] = useState(1);
  const [currencyList, setCurrencyList] = useState(PaymentArray);
  const [loader, setLoader] = useState(false);
  const [AccModalOpen, setAccModalOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const { cart } = useCartShow();

  const { CourseData, LoadTri } = CourseDataList(active);
  const [paystack, setPaystack] = useState(null);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();

  const Date = moment().format("");
  const router = useRouter();
  const DocIID = uuidv4();
  const OrderId = getRandom(8);
  const DocID = uuidv4();

  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;

  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;
  const TitlePlan = selectedPlan ? selectedPlan.title : "";
  const BonusPay = selectedPlan ? selectedPlan.bonus : "";
  const PassSuccess = "https://digitalmogulacademy.com/login";
  const SignalUSD = PlanStatus ? 10 : 25;
  const studentPlan = cart.find((item) => item.type === "student");
  const priceEuro = 0.92 * SignalUSD;
  const priceGbp = 0.78 * SignalUSD;

  const sendPush = () => {
    setAccModalOpen(true);
  };

  const LoadLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const RedirectHome = () => {
    router.push("/courses");
  };

  useEffect(() => {
    if (retryCount === 0) return;
    if (retryCount > 3) return;

    const currenciesMissingPrices = currencyList.some(
      (item) => !item.amount || item.amount === 0
    );

    if (currenciesMissingPrices) {
      console.log("Retrying conversion attempt:", retryCount);

      handleSelectPlan(
        currencyList,
        setCurrencyList,
        setLoader,
        SignalUSD,
        sendPush
      );
    }
  }, [retryCount]);

  const LazerPayzerII = (
    <>
      <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
        Unlock Full Access to Elpis Academy{" "}
      </h1>
      <p className="text-sm text-center text-gray-500">
        Hi There - Your Elpis account has been created, but access is still
        locked. Please complete your payment below to unlock your full
        dashboard, courses, and mentorship access.{" "}
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
              selectedII,
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
              DocIID,
              PassSuccess
            )
          }
        />
      </div>
    </>
  );

  const Switcher = () => {
    return (
      <div className="text-center">
        <div className="inline-flex bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab("Student")}
            className={`px-6 py-2 rounded-full text-sm md:text-sm font-semibold transition ${
              activeTab === "Student"
                ? "bg-primary text-gray-900"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Choose Student Plan{" "}
          </button>

          <button
            onClick={() => setActiveTab("Affiliate")}
            className={`px-6 py-2 rounded-full text-sm md:text-sm font-semibold transition ${
              activeTab === "Affiliate"
                ? "bg-primary text-gray-900"
                : "text-gray-700 hover:text-black "
            }`}
          >
            Get Affiliate Kit{" "}
          </button>
        </div>
      </div>
    );
  };

  const LovGad = (
    <>
      <PayerAffiliate
        PlanStatus={PlanStatus}
        DocID={DocID}
        userData={userData}
        orderId={OrderId}
        userId={user.uid}
        Date={Date}
        PassSuccess={PassSuccess}
      />
    </>
  );

  const TopProg = (
    <div className="w-full md:max-w-1/3 mb-2 max-w-md mx-auto px-5 py-2 sm:px-5 rounded-2xl shadow-xl bg-white relative border border-[#F8F1DC]">
      <ProgressLevel uploadProgress={80} />
    </div>
  );

  const SessionDel = child(ref(DB), `Session/${user.uid}`);

  const Signerr = () => {
    window.location.href = "/login"; // Fallback for client-side redirect
  };

  const SignOut = async () => {
    try {
      // Perform session cleanup
      await Promise.all([
        remove(SessionDel), // Assuming this is an async function to remove session data
        clearSession(user.uid), // Assuming this is an async function to clear session
      ]);

      // Sign out from Firebase
      await auth.signOut();

      // Show success notification
      NotPops("success", "Logout Success");

      // Perform redirect after all operations are complete
      Signerr();
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      NotPops("error", "Logout Failed");
    }
  };
  const LL = (
    <div className="bg-safe-gradient min-h-screen">
      <div className="flex justify-end p-4">
        <button
          onClick={() => SignOut()}
          className="bg-white border border-primary text-primary cursor-pointer text-sm font-semibold px-4 py-2 hover:shadow-sm rounded-xl transition"
        >
          Logout
        </button>
      </div>
      <div className=" flex justify-center items-center ">
        <div className="px-2 pt-12 md:px-0 h-full w-full">
          {TopProg}
          <SignUpBoxFIll
            // Progresser={<Switcher />}
            FormTaker={activeTab === "Student" ? LazerPayzerII : LovGad}
          />
        </div>
      </div>
    </div>
  );
  //onst missing = currencyList.some((c) => !c.amount || c.amount === 0);
  //if (missing) setRetryCount((c) => c + 1);

  const AffChartNext = async () => {
    if (AffiliateStatus) {
      NotPops("info", "You already have an active affiliate kit");
      return;
    } else {
      addToCart({
        type: "affiliate",
        name: PlanStatus ? "Add Affiliate Kit" : "Starter Affiliate Kit",
        price: SignalUSD,
        nickname: PlanStatus
          ? "Student Affiliate Kit"
          : "Starter Affiliate Kit",
        priceEuro: priceEuro,
        priceGbp: priceGbp,
      });
      NotPops("success", "affiliate kit added to cart");
    }
  };

  const AffChartNextTT = async () => {
    if (!AffiliateStatus) {
      addToCart({
        type: "affiliate",
        name: PlanStatus ? "Add Affiliate Kit" : "Starter Affiliate Kit",
        price: SignalUSD,
        nickname: PlanStatus
          ? "Student Affiliate Kit"
          : "Starter Affiliate Kit",
        priceEuro: "",
        priceGbp: "",
      });
      NotPops("success", "affiliate kit added to cart");
    }
  };

  const SendNextii = async () => {
    if (selectedRole === "") {
      NotPops("error", "You Need To Select a Plan");
    }
    if (selectedRole === "affiliate" && AffiliateStatus) {
      NotPops("info", "You already have an active affiliate kit");
    } else if (selectedRole === "affiliate") {
      setLoad(true);
      AffChartNext();
      setTimeout(() => {
        setLoad(false);
        setSwitch(2);
      }, 200);
    } else {
      setLoad(true);
      if (PlanStatus || studentPlan) {
        setTimeout(() => {
          setLoad(false);
          setSwitch(2);
        }, 200);
      } else {
        setTimeout(() => {
          setLoad(false);
          setSwitch(3);
        }, 200);
      }
    }
  };

  const SendNext = async () => {
    if (!selectedRole || selectedRole === "") {
      NotPops("error", "You Need To Select a Plan");
      return;
    }
    if (selectedRole === "affiliate") {
      if (AffiliateStatus) {
        NotPops("info", "You already have an active affiliate kit");
        return;
      }
      setLoad(true);
      AffChartNextTT();
      setTimeout(() => {
        setLoad(false);
        setSwitch(2);
      }, 200);

      return;
    }

    setLoad(true);
    setTimeout(() => {
      setLoad(false);

      if (PlanStatus || studentPlan) {
        setSwitch(2);
      } else {
        setSwitch(3);
      }
    }, 200);
  };

  const FlankSide = (
    <div>
      <h2 className="text-2xl font-bold font-cinzel text-center text-gray-900">
        Unlock Your Elpis Dashboard
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Choose how you'd like to access Elpis today.
      </p>
      <div className="px-5">
        <div className="max-w-md mx-auto my-10 space-y-4">
          <div className="mb-3">
            <SelectableBox
              icon={<GraduationCap className="w-6 h-6" />}
              title="Continue as an Elpis Student"
              subtext="Gain Access to your selected trading plan, courses,tools,and community."
              selected={selectedRole === "student"}
              onSelect={() => setSelectedRole("student")}
            />
          </div>

          <SelectableBox
            icon={<Users className="w-6 h-6" />}
            title="Add Affiliate Access(optional)"
            subtext="Use your Elpis trading plan and earn commissions by reffering others."
            selected={selectedRole === "affiliate"}
            onSelect={() => setSelectedRole("affiliate")}
          />
        </div>
        <div className="pt-2 flex gap-x-2 items-center">
          <LongBtn
            Title={Load ? WhiteLoader : "Proceed To Checkout"}
            more="transition-all duration-300 ease-in-out"
            onClick={() => SendNext()}
          />
        </div>
      </div>
    </div>
  );

  const PaymentStudent = (
    <div className="px-5">
      <PriceCardsTwo onSelect={setSelectedPlan} />
      <div className="my-5">
        <PaymentOptions
          selected={selectedII}
          onClick={() => setSelectedII("paystack")}
          onClickII={() => setSelectedII("nowpayment")}
          NairaCheck={NGNFormat(LineNaira)}
          DollarCheck={USDFormat(LineUSD)}
        />
      </div>
      <div className="pt-2 flex gap-x-2 items-center">
        <GrayBtn
          btnText={<ArrowLeft className={"h-5 w-5"} />}
          more="transition-all duration-300 ease-in-out"
          onClick={() => {
            setSwitch(1);
          }}
        />
        <LongBtn
          Title={isLoading ? WhiteLoader : "Unlock Student Plan"}
          more="transition-all duration-300 ease-in-out"
          onClick={() =>
            CheckFunction(
              selectedPlan,
              selectedII,
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
              DocIID,
              PassSuccess
            )
          }
        />
      </div>
    </div>
  );

  const PaymentAffiliate = (
    <div className="px-5">
      <PayerAffiliateII
        PlanStatus={PlanStatus}
        DocID={DocID}
        userData={userData}
        orderId={OrderId}
        userId={user.uid}
        Date={Date}
        PassSuccess={PassSuccess}
        Load={Load}
        funcPrev={() => {
          setSwitch(1);
        }}
      />
    </div>
  );

  const PayLay = (
    <PayLayout
      ReturnBtn={true}
      userData={userData}
      userId={user.uid}
      Datte={Date}
      DocIID={DocIID}
      onBack={() => setSwitch(1)}
    />
  );

  const viAff = (
    <AffiliatePay
      PlanStatus={PlanStatus}
      currencyList={currencyList}
      loader={loader}
      ReturnBtn={true}
      userData={userData}
      userId={user.uid}
      DocIID={DocID}
      Datte={Date}
      onBack={() => setSwitch(1)}
    />
  );

  const PayOp = (
    <div className="flex flex-col h-full relative">
      <h2 className="text-xl font-bold font-cinzel text-center text-gray-900">
        Elpis Academy Student Plan{" "}
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Choose a student plan that suits you
      </p>
      <PayOps
        onNext={() => setSwitch(2)}
        ReturnBtn={true}
        onBack={() => setSwitch(1)}
      />
    </div>
  );

  const PayCart = (
    <div>
      <h2 className="text-xl font-bold font-cinzel text-center text-gray-900">
        Complete Checkout{" "}
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Complete payment to become an elpis academy student
      </p>
      <NewLayout
        cart={cart}
        ReturnBtn={true}
        onPlan={() => setSwitch(3)}
        onBack={() => setSwitch(1)}
        actionHref={() => setSwitch(3)}
        PlanStatus={PlanStatus}
        AffiliateStatus={AffiliateStatus}
        SignalUSD={SignalUSD}
        DocId={DocID}
        userId={user.uid}
        Datte={Date}
        userData={userData}
        AffChartNext={() => AffChartNext()}
      />
    </div>
  );

  const AllForm = (
    <>
      {Switch === 1
        ? FlankSide
        : Switch === 2
        ? PayCart
        : Switch === 3
        ? PayOp
        : null}
    </>
  );

  const Pll = (
    <div className="w-full shrink-0 flex items-center gap-x-2 overflow-x-auto hide-scrollbar">
      <SelectableBox
        icon={<GraduationCap className="w-6 h-6" />}
        title="Become An Elpis Student"
        subtext="Gain Access to our courses, trading resources, bot and community"
        selected={selectedRole === "student"}
        onSelect={() => setSelectedRole("student")}
      />

      <SelectableBox
        icon={<Users className="w-6 h-6" />}
        title="Unlock Affiliate Kit"
        subtext="Become an affiliate to unlock affiliate resources, tools & reward."
        selected={selectedRole === "affiliate"}
        onSelect={() => setSelectedRole("affiliate")}
      />
    </div>
  );

  const PriceSub = (
    <div className="my-2">
      <PriceCardsTwo
        onSelect={setSelectedPlan}
        selectedId={selectedPlan?.title}
      />
    </div>
  );

  const PriceAff = (
    <AffiliatePricingBox
      Title={PlanStatus ? "Add Affiliate Kit" : "Starter Affiliate Kit"}
      SubText={
        PlanStatus
          ? "For Elpis students who want to start earning."
          : "Join as an affiliate even if you haven’t enrolled in a plan."
      }
      Price={`$${SignalUSD}`}
    />
  );
  return (
    <div>
      <WildGradientSignup FormBox={AllForm} />
      {/*<BabyCheckout
        PriceTab={Pll}
        PriceTwo={selectedRole === "student" ? PriceSub : PriceAff}
        subTitle={
          selectedRole === "student" ? "Student Price Plan" : "Affiliate Plan"
        }
        PriceBtn={
          <LongBtn
            Title={isLoading ? WhiteLoader : "Unlock Student Plan"}
            more="transition-all duration-300 ease-in-out"
            onClick={() => Pay()}
          />
        }
      />*/}
    </div>
  );
}
