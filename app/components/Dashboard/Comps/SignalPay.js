"use client";
import React, { useState, useEffect, useContext } from "react";
import { PriceCardsTwo } from "../../HeroSections/Pricing";
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

export const SignalPay = ({
  dataSlide,
  loader,
  userData,
  userId,
  DocIID,
  Datte,
  AccModalOpen,
  close,
  currencyList,
}) => {
  const [selected, setSelected] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const { SignalPrice, SignalTitle, title, ExpDate } = dataSlide;

  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const OrderId = getRandom(8);

  const slateSelect = async (item) => {
    setSelected(item);
  };

  const dataSender = {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    userId: userId,
    TitlePlan: SignalTitle,
    PayPrice: SignalPrice,
    FetchId: RefferMeId,
    PayType: selected.name === "USDT/USD Pay" ? "NowPayment" : "KoraPay",
    DocIID: DocIID,
    subType: "Signal Sub",
    PayCurrency: selected.currency,
    CurrencySymbol: selected.symbol,
    Datte: Datte,
    LineNaira: selected.amount,
    planType: SignalTitle,
    SignalType: SignalTitle,
    Token: 0,
    ExpDate: ExpDate,
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
    if (selected.amount < 30 || loader || !selected) {
      NotPops(
        "info",
        "you need to choose payment method and wait for conversion to load"
      );
    } else {
      SelectedShower();
    }
  };

  const priceList = (
    <div>
      <>
        <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
          Unlock {title}
        </h1>
        <p className="text-sm text-center font-regular text-gray-500 mb-4">
          Unlock {title} for ${SignalPrice} to have access
        </p>
      </>

      <PriceMeth
        currencyList={currencyList}
        slateSelect={(item) => slateSelect(item)}
        PriceUSD={SignalPrice}
        loader={loader}
        selected={selected.name}
      />

      <div className="mt-4 flex items-center justify-between">
        <GrayBtn onClick={() => close()} btnText="Close" />
        <LargeBtn
          btnText={isLoading ? WhiteLoader : "Pay & Unlock Room"}
          onClick={() => checkPay()}
        />
      </div>
    </div>
  );

  return (
    <div>
      <PopperModal
        Openner={AccModalOpen}
        NavTitle={""}
        ContentPoper={priceList}
        OpennerClose={() => close(false)}
      />
    </div>
  );
};
