import React, { useState, useEffect } from "react";
import useLoader, {
  DateAdder,
  NotPops,
  WhiteLoader,
  getRandom,
  useSaveLoad,
} from "./ToastLoader";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";
import { increment, ref, set, update } from "firebase/database";
import { DB } from "../Firebase/AuthHolder";
import { StatusCall } from "./UtilsJester";
import { savePayId } from "../Libs/Session";

const OrderId = getRandom(8);

/////const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
///const { isLoadSave, SaveDisabled, LoadFuncSave, StopLoadSave } = useSaveLoad();

const TxSaverReceipt = (
  userId,
  FirstName,
  LastName,
  Email,
  PhoneNos,
  FetchId,
  TitlePlan,
  PayPrice,
  PayType,
  PayCurrency,
  LineNaira,
  Datte,
  DocIID,
  nowId
) => {
  set(ref(DB, `All Transactions/${userId}/${userId}/${DocIID}`), {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    NowId: nowId ? nowId : "",
    Tx_ref_Id: DocIID,
    userId: userId,
    MyTop_Aff_Id: FetchId,
    TypeSub: "Student Sub",
    Plan: `${TitlePlan}/$${PayPrice}`,
    Amount_In: parseInt(PayPrice),
    Amount_Naira: parseInt(LineNaira),
    Payment_Type: PayType,
    Payment_Currency: PayCurrency,
    Payment_Status: "pending",
    Payment_Date: Datte,
  });
  set(ref(DB, `Transaction List/${DocIID}`), {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    OrderId: OrderId,
    NowId: nowId ? nowId : "",
    Tx_ref_Id: DocIID,
    userId: userId,
    MyTop_Aff_Id: FetchId,
    TypeSub: "Student Sub",
    Plan: `${TitlePlan}/$${PayPrice}`,
    Amount_In: parseInt(PayPrice),
    Amount_Naira: parseInt(LineNaira),
    Payment_Type: PayType,
    Payment_Currency: PayCurrency,
    Payment_Status: "pending",
    Payment_Date: Datte,
  }).catch((e) => {
    NotPops("error", e.message);
  });
};

const PayPaystackII = (
  LineNaira,
  Email,
  FirstName,
  paystack,
  StopLoad,
  RedirectHome,
  userId,
  LastName,
  PhoneNos,
  FetchId,
  TitlePlan,
  PayPrice,
  PayType,
  PayCurrency,
  Datte,
  DocIID
) => {
  paystack.checkout({
    key: "pk_test_39eca67f745af8684c3265e560599d0f21a787b3",
    email: Email,
    amount: parseInt(LineNaira) * 100,
    firstName: FirstName,
    reference: DocIID,
    // handle successful transaction
    onSuccess: (reference) => {
      StopLoad();
      update(ref(DB, `users/${userId}`), {
        PlanStatus: true,
      }).then(() => {
        RedirectHome();
      });
    },
    onLoad: () => {
      TxSaverReceipt(
        userId,
        FirstName,
        LastName,
        Email,
        PhoneNos,
        FetchId,
        TitlePlan,
        PayPrice,
        PayType,
        PayCurrency,
        LineNaira,
        Datte,
        DocIID
      );
      StopLoad();
    },
    onCancel: () => {
      StopLoad();
    },
    onError: () => {
      StopLoad();
    },
  });
};

const PayPaystack = (
  LineNaira,
  Email,
  FirstName,
  paystack,
  StopLoad,
  RedirectHome,
  userId,
  LastName,
  PhoneNos,
  FetchId,
  TitlePlan,
  PayPrice,
  PayType,
  PayCurrency,
  Datte,
  DocIID
) => {
  if (typeof window.Korapay === "undefined") {
    alert("Korapay script not loaded yet!");
    return;
  }

  window.Korapay.initialize({
    key: "pk_live_5dG1XmUtkCGnJUDt2ghojwrvwEeLbyh9T47rvZHo",
    reference: `${DocIID}`,
    amount: 200, //parseInt(LineNaira)
    currency: "KES",
    customer: {
      name: FirstName,
      email: Email,
    },
    notification_url: "https://example.com/webhook",
    onClose: function () {
      StopLoad();
    },
    onSuccess: function (data) {
      StopLoad();
      update(ref(DB, `users/${userId}`), {
        PlanStatus: true,
      }).then(() => {
        RedirectHome();
      });
    },
    onError: function (error) {
      StopLoad();
    },
  });

  TxSaverReceipt(
    userId,
    FirstName,
    LastName,
    Email,
    PhoneNos,
    FetchId,
    TitlePlan,
    PayPrice,
    PayType,
    PayCurrency,
    LineNaira,
    Datte,
    DocIID
  );
  StopLoad();
};

const InitPayCrypto = async (
  LineUSD,
  DocIID,
  selectedPlan,
  LoadFunc,
  StopLoad,
  userId,
  FirstName,
  LastName,
  Email,
  PhoneNos,
  FetchId,
  TitlePlan,
  PayPrice,
  PayType,
  PayCurrency,
  LineNaira,
  Datte,
  PassSuccess
) => {
  LoadFunc();
  try {
    const response = await fetch("/api/nowPay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: LineUSD,
        orderId: DocIID,
        desc: selectedPlan.title,
        success: PassSuccess,
      }),
    });

    const data = await response.json();
    console.log("this is data", data);
    if (response.ok && data.invoice_url) {
      // 🚀 Redirect to the NOWPayments checkout page
      window.location.href = data.invoice_url;
      const nowId = data.id;
      TxSaverReceipt(
        userId,
        FirstName,
        LastName,
        Email,
        PhoneNos,
        FetchId,
        TitlePlan,
        PayPrice,
        PayType,
        PayCurrency,
        LineNaira,
        Datte,
        DocIID,
        nowId
      );
      savePayId(userId, DocIID, nowId, LineUSD);
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

export const CheckFunction = (
  selectedPlan,
  selected,
  Email,
  FirstName,
  paystack,
  StopLoad,
  LoadFunc,
  RedirectHome,
  userId,
  LastName,
  PhoneNos,
  FetchId,
  Datte,
  DocIID,
  PassSuccess
) => {
  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;
  const TitlePlanII = selectedPlan ? selectedPlan.title : "";
  //const BonusPay = selectedPlan ? selectedPlan.pricecall : "";

  const SelectPay = selected === "paystack" ? "NGN" : "USD";

  if (selectedPlan === null || selectedPlan === 0) {
    NotPops("error", "Please select a plan to get started");
  } else {
    if (selected === "paystack") {
      LoadFunc();
      PayPaystack(
        LineNaira,
        Email,
        FirstName,
        paystack,
        StopLoad,
        RedirectHome,
        userId,
        LastName,
        PhoneNos,
        FetchId,
        TitlePlanII,
        LineUSD,
        "PayStack/NGN",
        SelectPay,
        Datte,
        DocIID
      );
    } else {
      InitPayCrypto(
        LineUSD,
        DocIID,
        selectedPlan,
        LoadFunc,
        StopLoad,
        userId,
        FirstName,
        LastName,
        Email,
        PhoneNos,
        FetchId,
        TitlePlanII,
        LineUSD,
        "Crypto/USD",
        SelectPay,
        LineNaira,
        Datte,
        PassSuccess
      );
    }
  }
};

// CheckFunction()

export const AffiliateCash = async (
  Load,
  endLoad,
  closeModal,
  userId,
  Amount,
  LineNaira,
  DocID,
  Username,
  FirstName,
  LastName,
  BizName,
  Date,
  Email,
  AccountName,
  AccountNos,
  BankAccName,
  Currency,
  Fast_Start_Bonus,
  Override_Earning,
  Payeer,
  BankCode
) => {
  const TransactionData = {
    TransactionType: "Cash Out",
    Username: Username,
    FirstName: FirstName,
    LastName: LastName,
    Amount: Amount,
    AmountInNG: LineNaira,
    Email: Email,
    Bank: BankAccName,
    PaymentType: BizName,
    AccNos: AccountNos,
    Payment_Date: Date,
    Status: StatusCall.Pending,
    CurrencyType: Currency,
    TxId: getRandom(12),
    DocId: DocID,
    AccName: AccountName,
    userId: userId,
    BankCode: BankCode,
    Affiliate_Percentage: Payeer,
    Fast_Start_Bonus: Fast_Start_Bonus,
    Override_Earning: Override_Earning,
  };
  const Day7 = DateAdder(7);

  try {
    Load();
    // To Check if corresponded
    await update(ref(DB, `users/${userId}`), {
      Fast_Start_Bonus: 0,
      Override_Earning: 0,
      //Aff_Available_Balance: increment(-parseInt(Payeer)),
      AffiliateFirstPayDate: Day7.toString(),
      AffiliatePayOutDay: 0,
      Aff_Total_Withdrawal: increment(parseFloat(Amount)),
    });

    await Promise.all([
      set(
        ref(DB, `Affiliate Cashout/${userId}/${userId}/${DocID}`),
        TransactionData
      ),
      set(ref(DB, `Admin Affiliate Cashout/${DocID}`), TransactionData),
    ]);

    NotPops(`success`, "Request to cashout referal fund successful");
    closeModal();
    setTimeout(() => {
      endLoad();
    }, 500);
    endLoad();
  } catch (error) {
    endLoad();
    NotPops(`error`, error.message);
  }
};
