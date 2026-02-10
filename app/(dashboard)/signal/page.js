"use client";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/app/auth/AuthProvider";
import {
  GrayBtn,
  LargeBtn,
  LongBtn,
  SlotBtn,
} from "@/app/components/Buttons/BtnLarge";
import { PriceCompHold } from "@/app/components/Dashboard/CourseComp";
import { SignalRoomBoxes } from "@/app/components/Dashboard/SignalComp";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { PriceCardsTwo } from "@/app/components/HeroSections/Pricing";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { CheckFunction } from "@/app/util/PayFunction";
import useLoader, {
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { Link2Icon, Lock } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ref, set } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";
import { ProductLoader, ProductLoaderTT } from "@/app/util/Loader";
import {
  PayLayout,
  PaymentArray,
  handleSelectPlan,
} from "@/app/components/Dashboard/Comps/PayLayout";
import { SignalPay } from "@/app/components/Dashboard/Comps/SignalPay";

export default function page() {
  const user = useContext(AuthContext);
  const { LoaderUser, userData } = ConnectData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  //const [selected, setSelected] = useState("paystack");
  const [paystack, setPaystack] = useState(null);
  const [pricer, setPricer] = useState(0);
  const [title, setTitle] = useState(0);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [AccModalOpen, setAccModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [currencyList, setCurrencyList] = useState(PaymentArray);
  const [loader, setLoader] = useState(false);
  const [dataSlide, setdataSlide] = useState("");

  // You must Subscribe to a course plan before you can have access to the signal room
  // When you subscribe to a plan you get access to the room related to that plan as a subscription package
  // To Join an higher plan you need to purchase it as an addon
  // You can only subscribe to signal room when you have purchased a course plan

  const Date = moment().format("");
  const router = useRouter();
  const DocIID = uuidv4();
  const OrderId = getRandom(8);

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const SignalType = userData ? userData.SignalPlan || "" : "";
  const AddOnSignalType = userData ? userData.AddOnSignalPlan || "" : "";

  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;

  const SignalPayNGN = pricer ? 1600 * pricer : 0;
  const SignalUSD = pricer ? pricer : 0;
  const PassSuccess = "https://digitalmogulacademy.com/signal";

  const RedirectHome = () => {
    router.push("/courses");
  };

  const UnlockSignal = () => {
    const SelectPay = selected === "paystack" ? "NGN" : "USD";
    set(ref(DB, `All Transactions/${user.uid}/${user.uid}/${DocIID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: OrderId,
      Tx_ref_Id: DocIID,
      userId: user.uid,
      MyTop_Aff_Id: RefferMeId,
      TypeSub: "Signal Sub",
      Plan: "Signal Sub",
      Amount_In: parseInt(SignalUSD),
      Amount_Naira: parseInt(SignalPayNGN),
      Payment_Type: selected,
      Payment_Currency: SelectPay,
      Payment_Status: "pending",
      Payment_Date: Date,
    });
    set(ref(DB, `Transaction List/${DocIID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: OrderId,
      Tx_ref_Id: DocIID,
      userId: user.uid,
      MyTop_Aff_Id: RefferMeId,
      TypeSub: "Signal Sub",
      Plan: "Signal Sub",
      Amount_In: parseInt(SignalUSD),
      Amount_Naira: parseInt(SignalPayNGN),
      Payment_Type: selected,
      Payment_Currency: SelectPay,
      Payment_Status: "pending",
      Payment_Date: Date,
    }).catch((e) => {
      NotPops("error", e.message);
    });
  };

  const InitPayCrypto = async () => {
    LoadFunc();
    try {
      const response = await fetch("/api/nowPay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: SignalUSD,
          orderId: DocIID,
          desc: title,
          success: PassSuccess,
        }),
      });

      const data = await response.json();
      console.log("this is data", data);

      if (response.ok && data.invoice_url) {
        // 🚀 Redirect to the NOWPayments checkout page
        window.location.href = data.invoice_url;
        UnlockSignal();
        StopLoad();
      } else {
        console.error("Payment creation failed:", data);
        alert("Failed to create payment invoice.");
        StopLoad();
      }
    } catch (err) {
      console.error("Error while creating crypto payment:", err);
      console.error("Error message:", err.message);
      alert("An error occurred. Try again.");
      StopLoad();
    }
  };

  const PunchPay = () => {
    LoadFunc();
    paystack.checkout({
      key: "pk_test_39eca67f745af8684c3265e560599d0f21a787b3", //"pk_test_ed9e7d435b6a3b8e1114a7dc76a2c9174b58a393 pk_live_e1e3d2b1f657735138ab8d7ae53a482b0b30bd97"
      email: Email,
      amount: parseInt(SignalPayNGN) * 100,
      firstName: FirstName,
      reference: DocIID,
      // handle successful transaction
      onSuccess: (reference) => {
        StopLoad();
        RedirectHome();
      },
      onLoad: () => {
        StopLoad();
        setAccModalOpen(false);
        UnlockSignal();
      },
      onCancel: () => {
        StopLoad();
      },
      onError: () => {
        StopLoad();
      },
    });
  };

  const sendPush = () => {
    setAccModalOpen(true);
  };
  const LayyerCheck = async (item) => {
    if (item.SignalPrice === 0 || item.SignalPrice === null) {
      NotPops("error", "error in Signal Price");
    } else {
      setdataSlide(item);

      await handleSelectPlan(
        currencyList,
        setCurrencyList,
        setLoader,
        item.SignalPrice,
        sendPush()
      );
      //setPricer(parseInt(item.SignalPrice));
      //setTitle(item.title);
    }
  };

  const SelectedShower = () => {
    if (selected === "paystack") {
      PunchPay();
    } else {
      InitPayCrypto();
    }
  };

  const LazerPayzer = (
    <PriceCompHold
      contentIn={
        <>
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
                  DocIID,
                  PassSuccess
                )
              }
            />
          </div>
        </>
      }
    />
  );

  const Lorem = (
    <>
      <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
        Unlock {title}
      </h1>
      <p className="text-sm text-center font-regular text-gray-500 mb-4">
        Unlock {title} for ${pricer} to have access
      </p>
    </>
  );

  const ContentPope = (
    <>
      {Lorem}
      <PaymentOptions
        selected={selected}
        onClick={() => setSelected("paystack")}
        onClickII={() => setSelected("nowpayment")}
        NairaCheck={NGNFormat(SignalPayNGN)}
        DollarCheck={USDFormat(SignalUSD)}
      />
      <div className="mt-4 flex items-center justify-between">
        <GrayBtn onClick={() => setAccModalOpen(false)} btnText="Close" />
        <LargeBtn
          btnText={isLoading ? WhiteLoader : "Pay & Unlock Room"}
          onClick={() => SelectedShower()}
        />
      </div>
    </>
  );
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;

  const PayLay = (
    <PayLayout
      ReturnBtn={true}
      userData={userData}
      userId={user.uid}
      Datte={Date}
      DocIID={DocIID}
    />
  );

  return (
    <div>
      <SignalPay
        AccModalOpen={AccModalOpen}
        dataSlide={dataSlide}
        loader={loader}
        userData={userData}
        userId={user.uid}
        DocIID={DocIID}
        Datte={Date}
        currencyList={currencyList}
        close={() => setAccModalOpen(false)}
      />
      {LoaderUser ? (
        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
          <ProductLoaderTT count={3} />
        </div>
      ) : (
        <>
          {PlanStatus ? (
            <SignalRoomBoxes
              userId={user.uid}
              LinkBtn={(item) =>
                PlanType === "Dunamis Rahab" ? (
                  <Link href={item.link}>
                    <LongBtn
                      Title={
                        <span className="flex gap-2 items-center justify-center">
                          <Link2Icon className="w-4 h-4" />
                          Enter Signal Room
                        </span>
                      }
                    />
                  </Link>
                ) : (
                  <>
                    {PlanType === item.SignalTitle ||
                    SignalType === item.SignalTitle ||
                    item.freeRoom ||
                    AddOnSignalType === item.SignalTitle ? (
                      <Link href={item.link}>
                        <LongBtn
                          Title={
                            <span className="flex gap-2 items-center justify-center">
                              <Link2Icon className="w-4 h-4" />
                              Enter Signal Room
                            </span>
                          }
                        />
                      </Link>
                    ) : (
                      <LongBtn
                        Title={
                          <span className="flex gap-2 items-center justify-center flex-shrink-0">
                            <Lock className="w-4 h-4" />
                            Unlock Room (${item.SignalPrice})
                          </span>
                        }
                        onClick={() => LayyerCheck(item)}
                      />
                    )}
                  </>
                )
              }
            />
          ) : (
            <PriceCompHold contentIn={PayLay} />
          )}
        </>
      )}
    </div>
  );
}
