"use client";
import PaystackImg from "@/app/assets/images/Paystack.png";
import NowPaymentImg from "@/app/assets/images/nowp.jpeg";
import KoraPay from "@/app/assets/images/kora.jpeg";
import React, { useState, useEffect, useContext } from "react";
import { PriceCardsTwo } from "../../HeroSections/Pricing";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { GrayBtn, LongBtn } from "../../Buttons/BtnLarge";
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
import { CartPlanCard, PlanCardTop } from "./CartContext/CartCard";
import { useCart } from "./CartContext/Cart";
import { addToCart, removeFromCart, useCartShow } from "./CartContext/NewCart";
import Select from "react-select";
import { customStyles } from "./CartContext/SelectStyle";
import {
  AccountSwitchBar,
  AddAffiliateUpsell,
  EmptyCartBox,
} from "./CartContext/EmptyCart";
import { ModalInfo, PayModal } from "./CartContext/UsdCart";

export const PaymentArray = [
  {
    id: 1,
    name: "Naira Pay(NGN)",
    amount: 0.0,
    symbol: "₦",
    currency: "NGN",
    image: KoraPay,
  },
  {
    id: 2,
    name: "Ghana Pay(GHS)",
    amount: 0.0,
    symbol: "₵",
    currency: "GHS",
    image: KoraPay,
  },
  {
    id: 3,
    name: "Kenya Pay (KES)",
    amount: 0.0,
    symbol: "KSh",
    currency: "KES",
    image: KoraPay,
  },

  {
    id: 4,
    name: "South Africa Pay (ZAR)",
    amount: 0.0,
    symbol: "R",
    currency: "ZAR",
    image: KoraPay,
  },

  {
    id: 5,
    name: "Cameroon Pay (XAF)",
    amount: 0.0,
    symbol: "F CFA",
    currency: "XAF",
    image: KoraPay,
  },

  {
    id: 6,
    name: "Côte d'Ivoire Pay (XOF)",
    amount: 0.0,
    symbol: "F CFA",
    currency: "XOF",
    image: KoraPay,
  },
  {
    id: 7,
    name: "USDT/USD Pay",
    amount: 0.0,
    symbol: "$",
    currency: "USD",
    image: NowPaymentImg,
  },
];

export const ValueArray = [
  {
    label: "Naira(NGN)",
    value: "NGN",
    payer: "KoraPay",
    symbol: "₦",
    image: KoraPay,
    rate: 1490,
  },
  {
    id: 2,
    label: "Ghana(GHS)",
    value: "GHS",
    payer: "KoraPay",
    symbol: "₵",
    image: KoraPay,
    rate: 11.3,
  },
  {
    id: 3,
    label: "Kenya(KES)",
    value: "KES",
    payer: "KoraPay",
    symbol: "KSh",
    image: KoraPay,
    rate: 135,
  },

  {
    id: 4,
    label: "South Africa(ZAR)",
    value: "ZAR",
    symbol: "R",
    payer: "KoraPay",
    image: KoraPay,
    rate: 17.2,
  },

  {
    id: 5,
    label: "Cameroon(XAF)",
    value: "XAF",
    symbol: "F CFA",
    payer: "KoraPay",
    image: KoraPay,
    rate: 594,
  },

  {
    id: 6,
    label: "Côte d'Ivoire(XOF)",
    value: "XOF",
    symbol: "F CFA",
    payer: "KoraPay",
    image: KoraPay,
    rate: 594,
  },
  {
    id: 7,
    label: "Crypto(USDT)",
    payer: "Nowpayment",
    value: "USD",
    symbol: "$",
  },

  {
    id: 8,
    label: "International Bank Transfer(USD/GBP/EUR)",
    value: "Bank",
    payer: "Bank Transfer",
  },
];
export const convertPrice = async (amount, currency, DocId, StopLoad) => {
  try {
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, DocId }),
    });
    if (!res.ok) {
      throw new Error("Conversion request failed");
    }

    const data = await res.json();

    const amt = data?.data?.to_amount;

    if (!amt) {
      throw new Error("Invalid conversion data");
    }

    return amt;
  } catch (e) {
    console.log("Error", e.message);
    NotPops("error", "fail to convert to currencies, try again");
    StopLoad();
  }
};

const TxnData = (data, nowId) => {
  const {
    FirstName,
    LastName,
    Email,
    PhoneNos,
    OrderId,
    userId,
    TitlePlan,
    PayPrice,
    FetchId,
    PayType,
    DocId,
    PayCurrency,
    Datte,
    LineNaira,
    CurrencySymbol,
    planType,
    SignalType,
    Token,
    ExpDate,
    subType,
    TypeSub,
    ComboPayNaira,
    ComboPay,
    AffPay,
  } = data;

  set(ref(DB, `All Transactions/${userId}/${userId}/${DocId}`), {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    NowId: nowId ? nowId : "",
    Tx_ref_Id: DocId,
    userId: userId,
    MyTop_Aff_Id: FetchId,
    TypeSub: TypeSub,
    planType: planType,
    SignalType: SignalType,
    ExpDate: ExpDate ? ExpDate : "",
    AffPay: AffPay,
    Token: Token ? Token : "",
    CurrencySymbol: CurrencySymbol,
    Plan: subType ? subType : `${TitlePlan}/$${PayPrice}`,
    Amount_In: parseInt(PayPrice),
    ComboPay: ComboPay ? parseInt(ComboPay) : "",
    Amount_Naira: parseInt(LineNaira),
    Payment_Type: PayType,
    Payment_Currency: PayCurrency,
    Payment_Status: "pending",
    Payment_Date: Datte,
  });
  set(ref(DB, `Transaction List/${DocId}`), {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    NowId: nowId ? nowId : "",
    Tx_ref_Id: DocId,
    userId: userId,
    MyTop_Aff_Id: FetchId,
    TypeSub: TypeSub,
    planType: planType,
    SignalType: SignalType,
    ExpDate: ExpDate ? ExpDate : "",
    Token: Token ? Token : "",
    Plan: TitlePlan ? `${TitlePlan}/$${PayPrice}` : "Affiliate Kit",
    Amount_In: parseInt(PayPrice),
    Amount_Naira: parseInt(LineNaira),
    Payment_Type: PayType,
    Payment_Currency: PayCurrency,
    ComboPay: ComboPay ? parseInt(ComboPay) : "",
    Payment_Status: "pending",
    Payment_Date: Datte,
  }).catch((e) => {
    NotPops("error", e.message);
  });
};

export const InitPayCrypto = async (
  datapass,
  LoadFunc,
  StopLoad,
  LineUSD,
  DocIID,
  title
) => {
  LoadFunc();
  try {
    const response = await fetch("/api/nowPay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: LineUSD,
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
      const nowId = data.id;
      TxnData(datapass, nowId);
      StopLoad();
    } else {
      console.error("Payment creation failed:", data);
      alert("Failed to create payment invoice.");
      StopLoad();
    }
  } catch (err) {
    console.error("Error while creating crypto payment:", err);
    alert("An error occurred. Try again.");
    StopLoad();
  }
};

export const handleSelectPlan = async (
  currencyList,
  setCurrencyList,
  setLoader,
  SignalPrice,
  setAccModalOpen
) => {
  try {
    setLoader(true);

    const updated = [...currencyList];

    for (let i = 0; i < updated.length; i++) {
      const DocID = uuidv4();

      const converted = await convertPrice(
        SignalPrice,
        updated[i].currency,
        DocID
      );

      updated[i].amount = converted || 0;
    }

    setCurrencyList(updated);
    setAccModalOpen();
  } catch (error) {
    console.error("Error selecting plan:", error);
  } finally {
    setLoader(false);
  }
};

export const PayKora = async (data, amt, LoadFunc, StopLoad) => {
  const {
    FirstName,
    Email,
    PayCurrency,
    LineNaira,
    DocId,
    userId,
    planType,
    SignalType,
    ExpDate,
    Token,
  } = data;

  LoadFunc();

  const datasend = {
    amount: amt,
    currency: PayCurrency,
    reference: DocId,
    title: planType,
    firstname: FirstName,
    email: Email,
  };

  const response = await fetch("/api/paykora", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datasend),
  });
  const krdata = await response.json();
  if (krdata.status && krdata.data.checkout_url) {
    window.location.href = krdata.data.checkout_url;
    TxnData(data);
  } else {
    console.log("Kora Error:", krdata);
    alert("Payment failed to initialize");
  }
  StopLoad();
};

export const PriceMeth = ({
  currencyList,
  slateSelect,
  PriceUSD,
  loader,
  selected,
}) => {
  return (
    <div className="flex hide-scrollbar overflow-x-auto gap-x-2">
      {currencyList.map((item, index) => (
        <div
          key={index}
          onClick={() => slateSelect(item)}
          className={`flex items-center gap-4 p-4 bg-white md:p-2 rounded-lg border cursor-pointer transition-all w-fit shrink-0 ${
            item.name === selected
              ? "border-yellow-500 shadow-md"
              : "border-gray-200"
          }`}
        >
          <Image
            src={item.image}
            alt="Paystack"
            width={30}
            height={30}
            className="object-contain"
          />
          <div>
            <h3 className="text-xs md:text-xs font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mt-[1px]">
              {loader ? (
                LoaderGray
              ) : (
                <>
                  {item.id === 7 ? (
                    CurrencySwap(PriceUSD, item.currency)
                  ) : (
                    <>
                      {item.amount === 0
                        ? `${item.symbol}0.00`
                        : CurrencySwap(item.amount, item.currency)}
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PayLayout = ({
  ReturnBtn,
  userData,
  userId,
  Datte,
  DocIID,
  onBack,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selected, setSelected] = useState("");
  const [currencyList, setCurrencyList] = useState(PaymentArray);
  const [loader, setLoader] = useState(false);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const PriceUSD = selectedPlan ? parseInt(selectedPlan.pricecall) : "";
  const planTitle = selectedPlan ? selectedPlan.title : "";
  const SignalType = selectedPlan ? selectedPlan.SignalType : "";
  const Token = selectedPlan ? selectedPlan.Token : "";
  const ExpDate = selectedPlan ? selectedPlan.ExpDate : "";

  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const OrderId = getRandom(8);
  const router = useRouter();

  const RedirectHome = () => {
    router.push("/courses");
  };

  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan);
    console.log("💠 Selected USD Price:", PriceUSD);
    setLoader(true);
    const updated = [...currencyList];

    for (let i = 0; i < updated.length; i++) {
      const DocID = uuidv4();
      console.log("➡️ Converting for:", updated[i].currency);
      console.log("💠 DocID:", DocID);
      const converted = await convertPrice(
        plan.pricecall,
        updated[i].currency,
        DocID
      );

      console.log("✔ Converted:", converted);

      updated[i].amount = converted || 0;
    }

    setCurrencyList(updated);
    setLoader(false);
  };

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
    TitlePlan: planTitle,
    PayPrice: PriceUSD,

    FetchId: RefferMeId,
    PayType: selected.name === "USDT/USD Pay" ? "NowPayment" : "KoraPay",
    DocIID: DocIID,
    PayCurrency: selected.currency,
    CurrencySymbol: selected.symbol,
    Datte: Datte,
    LineNaira: selected.amount,
    planType: planTitle,
    SignalType: SignalType,
    Token: Token,
    ExpDate: ExpDate,
  };

  const makePayment = () => {
    if (selected.name === "USDT/USD Pay") {
      InitPayCrypto(
        dataSender,
        LoadFunc,
        StopLoad,
        PriceUSD,
        DocIID,
        planTitle
      );
    } else {
      PayKora(dataSender, LoadFunc, StopLoad);
    }
  };

  const checkPay = () => {
    if (selected.amount < 80 || isLoading || !selected) {
      NotPops(
        "info",
        "you need to choose payment method and wait for conversion to load"
      );
    } else {
      makePayment();
    }
  };

  return (
    <div>
      <PriceCardsTwo
        selectedId={selectedPlan ? selectedPlan.title : ""}
        onSelect={(plan) => handleSelectPlan(plan)}
      />
      <div className="flex justify-between items-center pb-3">
        <div className="text-sm text-gray-500 font-medium">
          Choose Payment Method
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500 font-medium" />
      </div>

      <PriceMeth
        currencyList={currencyList}
        slateSelect={(item) => slateSelect(item)}
        PriceUSD={PriceUSD}
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

export const NewLayout = ({
  ReturnBtn,
  onBack,
  cart,
  onPlan,
  actionHref,
  PlanStatus,
  SignalUSD,
  AffiliateStatus,
  DocId,
  userId,
  Datte,
  userData,
  AffChartNext,
}) => {
  const [inputState, setInputState] = useState("");
  const [State, setState] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const studentPlan = cart.find((item) => item.type === "student");
  const affiliatePlan = cart.find((item) => item.type === "affiliate");
  const StudPriceUSD = studentPlan ? parseInt(studentPlan.price) : 0;
  const AffPriceUSD = affiliatePlan ? parseInt(affiliatePlan.price) : 0;
  const [LoadModal, setLoadModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [activeAccount, setActiveAccount] = useState("usd");

  const { name, price, ExpDate, Token, SignalType, priceEuro, priceGbp } =
    studentPlan ? studentPlan : [];

  const {
    price: PRICEUSD,
    priceEuro: PRICEURO,
    priceGbp: PRICEGBP,
  } = affiliatePlan ? affiliatePlan : [];

  const AFFUSD = PRICEUSD ? PRICEUSD : 0;
  const AFFEUR = PRICEURO ? PRICEURO : 0;
  const AFFGBP = PRICEGBP ? PRICEGBP : 0;
  const STUDGBP = priceGbp ? priceGbp : 0;
  const STUDEUR = priceEuro ? priceEuro : 0;

  const bankUSD = StudPriceUSD + AFFUSD;
  const bankEURO = STUDEUR + AFFEUR;
  const bankGBP = STUDGBP + AFFGBP;
  const { payer, value, symbol, label, rate } = State ? State : [];

  const convertedPrice = studentPlan || affiliatePlan ? bankUSD * rate : 0;

  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const OrderId = getRandom(8);
  const router = useRouter();

  const bankAccounts = {
    USD: {
      currency: "USD",
      accountName: "Favour Peace Ayemere",
      accountNumber: "211315266583",
      routing: "101019644",
      accountType: "Checking",
      bankName: "Lead Bank",
      bankAddress: "1801 Main St., Kansas City, MO 64108",
      price: bankUSD,
    },

    GBP: {
      currency: "GBP",
      accountName: "Favour Peace Ayemere",
      accountNumber: "40636123",
      sortCode: "041307",
      swift: "CLJUGB21XXX",
      bankName: "Clear Junction Limited",
      bankAddress: "4th Floor Imperial House, 15 Kingsway, London, WC2B 6UN",
      price: bankEURO,
    },

    EUR: {
      currency: "EUR",
      accountName: "Favour Peace Ayemere",
      iban: "GB05CLJU04130740636123",
      swift: "CLJUGB21XXX",
      bankName: "Clear Junction Limited",
      bankAddress: "4th Floor Imperial House, 15 Kingsway, London, WC2B 6UN",
      price: bankGBP,
    },
  };

  const SubType =
    studentPlan && affiliatePlan
      ? "Combo Plan Kit"
      : studentPlan
      ? "Student Sub"
      : affiliatePlan
      ? "Affiliate Sub"
      : "";

  const PlanType =
    studentPlan && affiliatePlan
      ? studentPlan.name
      : studentPlan
      ? studentPlan.name
      : affiliatePlan
      ? affiliatePlan.name
      : "";

  const VUSD = studentPlan && affiliatePlan ? StudPriceUSD + AffPriceUSD : "";

  const VUSDD = StudPriceUSD + AffPriceUSD;

  const SubPAY =
    studentPlan && affiliatePlan
      ? StudPriceUSD
      : studentPlan
      ? StudPriceUSD
      : affiliatePlan
      ? AffPriceUSD
      : 0;

  useEffect(() => {
    console.log("CHECKOUT CART:", cart);
  }, [cart]);

  const RemoveCart = (type) => {
    removeFromCart(type);
  };

  const dataSender = {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    userId: userId,
    TitlePlan: name,
    TypeSub: SubType,
    PayPrice: SubPAY,
    ComboPay: VUSD,
    AffPay: affiliatePlan ? AffPriceUSD : 0,
    FetchId: RefferMeId,
    PayType: payer,
    DocId: DocId,
    PayCurrency: value,
    CurrencySymbol: symbol,
    Datte: Datte,
    LineNaira: amount,
    planType: PlanType,
    SignalType: SignalType,
    Token: Token,
    ExpDate: ExpDate,
  };

  const PropPay = async () => {
    try {
      LoadFunc();
      const amt = await convertPrice(VUSDD, value, DocId, StopLoad);
      setAmount(amt); //convertedPrice
      await PayKora(dataSender, amt, LoadFunc, StopLoad);
    } catch (e) {
      NotPops("error", e.message);
      console.log("error", e.message);
      StopLoad();
      //"error processing payment, please try again"
    }
  };

  const handleChange = (selected) => {
    setState(selected);
    setInputState(selected ? selected.label : "");
  };

  const InitVave = () => {
    if (!studentPlan && !affiliatePlan) {
      NotPops("error", "cart cannot be left empty");
    } else if (State === "" || !State) {
      NotPops("error", "You need to choose a payment method");
    } else {
      if (payer === "KoraPay") {
        PropPay();
      } else if (payer === "PopUp") {
        setLoadModal(true);
      } else {
        InitPayCrypto(dataSender, LoadFunc, StopLoad, VUSDD, DocId, PlanType);
      }
    }
  };

  const dataCon = (
    <div>
      <AccountSwitchBar active={activeAccount} onChange={setActiveAccount} />
      {activeAccount === "usd" && (
        <ModalInfo
          PayData={bankAccounts.USD}
          onClose={() => setLoadModal(false)}
        />
      )}

      {activeAccount === "gbp" && (
        <ModalInfo
          PayData={bankAccounts.GBP}
          onClose={() => setLoadModal(false)}
        />
      )}

      {activeAccount === "eur" && (
        <ModalInfo
          PayData={bankAccounts.EUR}
          onClose={() => setLoadModal(false)}
        />
      )}
    </div>
  );

  return (
    <div>
      <PayModal isDialogPay={LoadModal} WidgetAmount={dataCon} />
      <div className="flex flex-col h-full relative">
        <div className="h-[400px]">
          <PlanCardTop onPlan={onPlan} />
          {!studentPlan && !affiliatePlan && (
            <EmptyCartBox actionHref={actionHref} />
          )}

          {studentPlan && (
            <CartPlanCard
              data={studentPlan}
              onRemove={() => RemoveCart(studentPlan.type)}
            />
          )}

          {affiliatePlan ? (
            <CartPlanCard
              data={affiliatePlan}
              onRemove={() => RemoveCart(affiliatePlan.type)}
            />
          ) : (
            <>
              {studentPlan && !affiliatePlan && !AffiliateStatus && (
                <AddAffiliateUpsell
                  PlanStatus={PlanStatus}
                  AffiliateStatus={AffiliateStatus}
                  AffChartNext={AffChartNext}
                  SignalUSD={SignalUSD}
                />
              )}
            </>
          )}
          <div className="my-3 px-2 z-10">
            <label className="block text-xs font-medium mb-[2px] text-gray-600">
              Payment Method
            </label>

            <Select
              value={State}
              onChange={handleChange}
              options={ValueArray}
              isClearable
              isSearchable={false}
              classNamePrefix="select"
              styles={customStyles}
            />
          </div>
        </div>

        <div className="flex gap-x-2 items-center">
          {ReturnBtn && (
            <GrayBtn
              btnText={<ArrowLeft className={"h-5 w-5"} />}
              more="transition-all duration-300 ease-in-out"
              onClick={onBack}
            />
          )}
          <LongBtn
            Title={isLoading ? WhiteLoader : "Pay Now"}
            more="transition-all duration-300 ease-in-out"
            disabled={isLoading}
            onClick={() => InitVave()}
          />
        </div>
      </div>
    </div>
  );
};

export const PayOps = ({ ReturnBtn, onBack, cart, onPlan, onNext }) => {
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [selectedPlan, setSelectedPlan] = useState(null);
  //const { refreshCart } = useCartShow();

  const PutUpdate = () => {
    if (selectedPlan === "" || selectedPlan === null) {
      NotPops("error", "You Need To Select a Plan");
    } else {
      const {
        title,
        pricecall,
        ExpDate,
        euro,
        pound,
        Token,
        SignalType,
        checklist,
        level,
      } = selectedPlan;
      LoadFunc(true);
      addToCart({
        type: "student",
        name: title,
        price: pricecall,
        ExpDate: ExpDate,
        Token: Token,
        priceGbp: pound,
        priceEuro: euro,
        SignalType: SignalType,
        checklist: checklist,
        nickname: level,
      });
      //refreshCart();
      NotPops("success", "Successfully Added to cart");
      StopLoad(false);
      onNext();
    }
  };
  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan);
  };
  return (
    <div>
      <div className="h-[350px]">
        <PriceCardsTwo
          selectedId={selectedPlan ? selectedPlan.title : ""}
          onSelect={(plan) => handleSelectPlan(plan)}
        />
      </div>

      <div className="mt-3 flex gap-x-2 items-center">
        {ReturnBtn && (
          <GrayBtn
            btnText={<ArrowLeft className={"h-5 w-5"} />}
            more="transition-all duration-300 ease-in-out"
            onClick={onBack}
          />
        )}
        <LongBtn
          Title={isLoading ? WhiteLoader : "Proceed to Checkout"}
          more="transition-all duration-300 ease-in-out"
          disabled={isLoading}
          onClick={() => PutUpdate()}
        />
      </div>
    </div>
  );
};
