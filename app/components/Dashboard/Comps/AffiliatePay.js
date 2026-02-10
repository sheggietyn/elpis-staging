"use client";
import React, { useState, useEffect, useContext } from "react";
import { AffiliatePricingBox, PriceCardsTwo } from "../../HeroSections/Pricing";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { GrayBtn, LargeBtn, LongBtn } from "../../Buttons/BtnLarge";
import useLoader, {
  CurrencySwap,
  LoaderGray,
  NotPops,
  PassSuccess,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { ref, set, update } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";
import { cleanupKorapay, loadKoraScript } from "@/app/util/UtilsJester";
import {
  InitPayCrypto,
  PayKora,
  PaymentArray,
  PriceMeth,
  convertPrice,
} from "./PayLayout";
import { PopperModal } from "../../Modals/ModalComp";

export const AffiliatePay = ({
  PlanStatus,
  currencyList,
  ReturnBtn,
  userData,
  userId,
  DocIID,
  Datte,
  loader,
  onBack,
}) => {
  const [selected, setSelected] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();

  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const SignalUSD = PlanStatus ? 10 : 25;

  const OrderId = getRandom(8);

  const slateSelect = async (item) => {
    setSelected(item);
  };

  const PlanTaker =
    SignalUSD === 10 ? "Student Affiliate" : "Starter Affiliate";

  const dataSender = {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    userId: userId,
    TitlePlan: PlanTaker,
    PayPrice: SignalUSD,
    FetchId: RefferMeId,
    PayType: selected.name === "USDT/USD Pay" ? "NowPayment" : "KoraPay",
    DocIID: DocIID,
    subType: "Affiliate Sub",
    PayCurrency: selected.currency,
    CurrencySymbol: selected.symbol,
    Datte: Datte,
    LineNaira: selected.amount,
    planType: PlanTaker,
    SignalType: PlanTaker,
    Token: 0,
  };
  const SelectedShower = () => {
    if (selected.name === "USDT/USD Pay") {
      InitPayCrypto(
        dataSender,
        LoadFunc,
        StopLoad,
        SignalPrice,
        DocIID,
        SignalTitle
      );
    } else {
      PayKora(dataSender, LoadFunc, StopLoad);
    }
  };

  const checkPay = () => {
    if (selected.amount < 10 || loader || !selected) {
      NotPops(
        "info",
        "you need to choose payment method and wait for conversion to load"
      );
    } else {
      SelectedShower();
    }
  };

  return (
    <div>
      <AffiliatePricingBox
        Title={PlanStatus ? "Add Affiliate Kit" : "Starter Affiliate Kit"}
        SubText={
          PlanStatus
            ? "For Elpis students who want to start earning."
            : "Join as an affiliate even if you haven’t enrolled in a plan."
        }
        Price={`$${SignalUSD}`}
      />
      <PriceMeth
        currencyList={currencyList}
        slateSelect={(item) => slateSelect(item)}
        PriceUSD={SignalUSD}
        loader={loader}
        selected={selected.name}
      />

      <div className="mt-5 flex gap-x-2 items-center">
        {ReturnBtn && (
          <GrayBtn
            btnText={<ArrowLeft className={"h-5 w-5"} />}
            more="transition-all duration-300 ease-in-out"
            onClick={onBack}
          />
        )}
        <LongBtn
          Title={isLoading ? WhiteLoader : "Unlock Student Plan"}
          more="transition-all duration-300 ease-in-out"
          disabled={isLoading}
          onClick={() => checkPay()}
        />
      </div>
    </div>
  );
};
