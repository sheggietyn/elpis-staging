import React, { useState, useContext, useEffect } from "react";
import { AffiliatePricingBox } from "../components/HeroSections/Pricing";
import { PaymentOptions } from "../components/HeroSections/PayClicker";
import useLoader, {
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
} from "./ToastLoader";
import { useRouter } from "next/navigation";
import { LongBtn } from "../components/Buttons/BtnLarge";
import { ref, set, update } from "firebase/database";
import { DB } from "../Firebase/AuthHolder";

export const PayerAffiliate = ({
  PlanStatus,
  DocID,
  userData,
  orderId,
  userId,
  Date,
  PassSuccess,
}) => {
  const router = useRouter();
  const [selectedII, setSelectedII] = useState("paystack");
  const [paystack, setPaystack] = useState(null);
  const SignalPayNGN = PlanStatus ? 1600 * 10 : 1600 * 25;
  const SignalUSD = PlanStatus ? 10 : 25;
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const RedirectHome = () => {
    router.push("/affiliate");
    update(ref(DB, `users/${userId}`), {
      AffiliateStatus: true,
      AffiliateRank: "Starter",
    });
  };

  //const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const SignalType = userData ? userData.SignalPlan || "" : "";

  const UnlockAff = () => {
    const SelectPay = selectedII === "paystack" ? "NGN" : "USD";
    set(ref(DB, `All Transactions/${userId}/${userId}/${DocID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: orderId,
      Tx_ref_Id: DocID,
      userId: userId,
      MyTop_Aff_Id: RefferMeId,
      TypeSub: "Affiliate Sub",
      Plan: "Affiliate Kit",
      Amount_In: parseInt(SignalUSD),
      Amount_Naira: parseInt(SignalPayNGN),
      Payment_Type: selectedII,
      Payment_Currency: SelectPay,
      Payment_Status: "pending",
      Payment_Date: Date,
    });
    set(ref(DB, `Transaction List/${DocID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: orderId,
      Tx_ref_Id: DocID,
      userId: userId,
      MyTop_Aff_Id: RefferMeId,
      TypeSub: "Affiliate Sub",
      Plan: "Affiliate Kit",
      Amount_In: parseInt(SignalUSD),
      Amount_Naira: parseInt(SignalPayNGN),
      Payment_Type: selectedII,
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
          orderId: DocID,
          desc: "Affiliate Kit",
          success: PassSuccess,
        }),
      });

      const data = await response.json();
      console.log("this is data", data);

      if (response.ok && data.invoice_url) {
        // 🚀 Redirect to the NOWPayments checkout page
        window.location.href = data.invoice_url;
        UnlockAff();
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

  const PayPaystack = () => {
    LoadFunc();
    paystack.checkout({
      key: "pk_test_39eca67f745af8684c3265e560599d0f21a787b3", //"pk_live_e1e3d2b1f657735138ab8d7ae53a482b0b30bd97"
      email: Email,
      amount: parseInt(SignalPayNGN) * 100,
      firstName: FirstName,
      reference: DocID,
      // handle successful transaction
      onSuccess: (reference) => {
        StopLoad();
        RedirectHome();
      },
      onLoad: () => {
        StopLoad();
        UnlockAff();
      },
      onCancel: () => {
        StopLoad();
      },
      onError: () => {
        StopLoad();
      },
    });
  };
  const PaySelected = () => {
    if (selectedII === "paystack") {
      PayPaystack();
    } else {
      InitPayCrypto();
    }
  };

  const AffiliatePayer = (
    <>
      <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
        Become an Affiliate
      </h1>
      <p className="text-sm text-center text-gray-500">
        Become an affiliate to unlock affiliate resources,tools & reward.
      </p>
      <AffiliatePricingBox
        Title={PlanStatus ? "Add Affiliate Kit" : "Starter Affiliate Kit"}
        SubText={
          PlanStatus
            ? "For Elpis students who want to start earning."
            : "Join as an affiliate even if you haven’t enrolled in a plan."
        }
        Price={`$${SignalUSD}`}
      />
      <PaymentOptions
        selected={selectedII}
        onClick={() => setSelectedII("paystack")}
        onClickII={() => setSelectedII("nowpayment")}
        NairaCheck={NGNFormat(SignalPayNGN)}
        DollarCheck={USDFormat(SignalUSD)}
      />

      <div className="pt-2">
        <LongBtn
          Title={isLoading ? WhiteLoader : "Become an Affiliate"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => PaySelected()}
        />
      </div>
    </>
  );

  return <>{AffiliatePayer}</>;
};
