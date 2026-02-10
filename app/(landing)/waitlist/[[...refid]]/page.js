"use client";
import React, { useState, useEffect } from "react";
import { ResponsiveFormBox } from "@/app/components/HeroSections/HeroForm";
import { FormInput, PhoneInputII } from "@/app/components/Inputs/InputForm";
import {
  Users,
  Mail,
  User,
  MailIcon,
  Users2,
  Copy,
  CheckIcon,
} from "lucide-react";
import { PriceCards } from "@/app/components/HeroSections/Pricing";
import { LongBtn, MiniBtn } from "@/app/components/Buttons/BtnLarge";
import {
  NGNFormat,
  Tagger,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
//import CheckoutPage from "@/app/components/HeroSections/CheckoutComp";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  increment,
  ref,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { DB } from "@/app/Firebase/AuthHolder";
import { useRouter } from "next/navigation";
import { AffiliateBenefits } from "@/app/components/HeroSections/ListData";
import dynamic from "next/dynamic";
import moment from "moment";

export default function page({ params }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailAff, setEmailAff] = useState("");
  const [activeTab, setActiveTab] = useState("waitlist");
  const [Load, setLoad] = useState(false);
  const [LoadII, setLoadII] = useState(false);
  const [AffLink, setAffLink] = useState("");
  const [PhoneNos, setPhoneNos] = useState("");
  const [selected, setSelected] = useState("paystack");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const [paystack, setPaystack] = useState(null);
  const Date = moment().format("");

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const DocIID = uuidv4();
  let FetchId = params.refid ? params.refid.toString() : "";

  const OrderId = getRandom(8);

  const email = EmailAff;
  const shortPart = EmailAff?.includes("@")
    ? EmailAff.split("@")[1]?.slice(0, 2)
    : "";
  const splitter = email.split("@")[0];
  const username = splitter + shortPart;
  const FinalGambit = `https://digitalmogulacademy.com/waitlist/${username}`;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Linker = FinalGambit.toString();

  const LineNaira = selectedPlan ? 1600 * selectedPlan.bonus : 0;
  const LineUSD = selectedPlan ? selectedPlan.bonus : 0;
  const TitlePlan = selectedPlan ? selectedPlan.title : "";
  const BonusPay = selectedPlan ? selectedPlan.bonus : "";

  const AmtFlag = LineNaira.toString();
  const AmountII = AmtFlag + "00";
  const PayNoAmount = parseInt(AmountII);

  const config = {
    email: Email,
    amount: PayNoAmount,
    publicKey: "pk_live_892fd54dfdd43e1232f89265b8412f9211466950",
  };

  const SendEmail = () => {
    fetch("/api/emailSend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email,
        username: `${FirstName}`,
        plan: `${TitlePlan}/$${BonusPay}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
  };

  //const initializePayment = usePaystackPayment(config);

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
      toast.success("Referral link copied", Tagger);
    } else {
      toast.error("Cannot copy until data is loaded", Tagger);
    }
  };

  const GenerateFunc = () => {
    if (!emailRegex.test(EmailAff.toLowerCase()) || EmailAff === "") {
      toast.error(
        "email address is required to generate affiliate link",
        Tagger
      );
    } else {
      setLoadII(true);
      setTimeout(() => {
        setAffLink(FinalGambit);
        setLoadII(false);
      }, 400);
    }
  };

  const usersRef = ref(DB, "My Affiliate");

  const userAffUrl = `My Affiliate/${FetchId}`;
  //const userAffUrlTwo = `My Affiliate/${username}`;

  const checkUsernameExists = () => {
    const userQueryRef = query(
      usersRef,
      orderByChild("AffId"),
      equalTo(FetchId)
    );
  };

  const ValidateAff = () => {
    const MyAff = `My Affiliate List/${FetchId}/${FetchId}/${DocIID}`;
    const userAffPath = "My Affiliate"; // your correct DB path
    const userAffRef = ref(DB, userAffPath);
    const userQueryRef = query(
      userAffRef,
      orderByChild("AffId"),
      equalTo(FetchId)
    );
    if (FetchId) {
      get(userQueryRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let userKey = null;
            snapshot.forEach((userSnapshot) => {
              userKey = userSnapshot.key;
            });
            update(ref(DB, userAffUrl), {
              Affiliate_Sales: increment(parseInt(1)),
            });
            set(ref(DB, MyAff), {
              FirstName: FirstName,
              LastName: LastName,
              Email: Email,
              PhoneNos: PhoneNos,
              OrderId: OrderId,
              Plan: `${TitlePlan}/${BonusPay}`,
              Amount_In_Naira: LineNaira,
              Aff_Id: FetchId,
              Payment_Status: "success",
              Payment_Date: Date,
            }).then(() => {
              toast.success("Referal bonus successfully allocated", Tagger);
            });
          } else {
            toast.info(
              "This referal link is invalid and has been ignored",
              Tagger
            );
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  const PayNowData = () => {
    set(ref(DB, `Waitlist Sales/${DocIID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: OrderId,
      Aff_Id: FetchId,
      Plan: `${TitlePlan}/${BonusPay}`,
      Amount_In_Naira: LineNaira,
      Payment_Status: "success",
      Payment_Date: Date,
    })
      .then(() => {
        ValidateAff();
        //SendEmail();
        router.replace("/thankyou");
      })
      .catch(() => {
        console.log(e.message);
      });
  };

  const onSuccess = (reference) => {
    PayNowData();
  };

  const onClose = () => {
    console.log("closed");
    setLoad(false);
  };

  const SaveAffiliateData = () => {
    const MyAff = `My Affiliate List/${FetchId}/${FetchId}/${DocIID}`;
    if (FetchId) {
      set(ref(DB, MyAff), {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        PhoneNos: PhoneNos,
        OrderId: OrderId,
        Aff_Id: FetchId,
        Plan: `${TitlePlan}/${BonusPay}`,
        Amount_In_Naira: LineUSD,
        Payment_Status: "pending",
        Payment_Date: Date,
      });
    }
  };

  const SalesWaitlisCrypto = () => {
    set(ref(DB, `Waitlist Sales/${DocIID}`), {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNos: PhoneNos,
      OrderId: OrderId,
      Aff_Id: FetchId,
      Plan: `${TitlePlan}/${BonusPay}`,
      Amount_In_Naira: LineUSD,
      Payment_Status: "pending",
      Payment_Date: Date,
    })
      .then(() => {
        SaveAffiliateData();
      })
      .catch(() => {
        console.log(e.message);
      });
  };
  //pk_test_39eca67f745af8684c3265e560599d0f21a787b3

  const makePaymentThroughPayStack = () => {
    paystack.checkout({
      key: "pk_live_e1e3d2b1f657735138ab8d7ae53a482b0b30bd97", //"pk_live_e1e3d2b1f657735138ab8d7ae53a482b0b30bd97"
      email: Email,
      amount: parseInt(LineNaira) * 100,
      firstName: FirstName,
      // handle successful transaction
      onSuccess: (reference) => {
        PayNowData();
      },
      onLoad: () => {
        setLoad(false);
      },
      onCancel: () => {
        setLoad(false);
      },
      onError: () => {
        setLoad(false);
      },
    });
  };

  const handlePayment = () => {
    const paystack =''

    paystack.transaction.initialize({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY, // Your public key
      email: Email,
      amount: LineNaira, // Amount in Kobo (i.e. 2000 NGN)
      currency: "NGN",
      reference: `${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: `${FirstName} ${LastName}`,
            variable_name: `${FirstName}`,
            value: PhoneNos,
          },
        ],
      },

      // ✅ On Success
      onSuccess: (transaction) => {
        console.log("Payment success", transaction);
        PayNowData();
        //window.location.href = "/thank-you";
      },
      onCancel: () => {
        console.warn("Payment cancelled by user");
        toast.error("Payment was cancelled.");
      },
    });
  };

  const handleCryptoPayment = async (amount) => {
    setLoad(true);
    try {
      const response = await fetch("/api/nowPay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: LineUSD,
          orderId: DocIID,
          desc: selectedPlan.title,
        }),
      });

      const data = await response.json();
      console.log("this is data", data);

      if (response.ok && data.invoice_url) {
        // 🚀 Redirect to the NOWPayments checkout page
        window.location.href = data.invoice_url;
        SalesWaitlisCrypto();
        setLoad(false);
      } else {
        console.error("Payment creation failed:", data);
        alert("Failed to create payment invoice.");
        setLoad(false);
      }
    } catch (err) {
      console.error("Error while creating crypto payment:", err);
      alert("An error occurred. Try again.");
      setLoad(false);
    }
  };

  const Teller = () => {
    if (selected === "paystack") {
      setLoad(true);
      //initializePayment({ onSuccess, onClose });
      makePaymentThroughPayStack();
      //handlePayment();
    } else {
      handleCryptoPayment();
    }
  };

  const GenerateAffiliate = () => {
    setLoadII(true);

    const userAffPath = "My Affiliate"; // your correct DB path
    const userAffRef = ref(DB, userAffPath);
    const userQueryRef = query(
      userAffRef,
      orderByChild("AffId"),
      equalTo(username)
    );

    if (username) {
      get(userQueryRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setLoadII(false);
            setAffLink(FinalGambit);
            toast.info("Affiliate link already exists", Tagger);
          } else {
            set(ref(DB, `My Affiliates/${username}`), {
              Affiliate_Sales: 0,
              Email: EmailAff,
              AffId: username,
            }).then(() => {
              setLoadII(false);
              setAffLink(FinalGambit);
              toast.success("Affiliate link successfully generated", Tagger);
            });
          }
        })
        .catch((e) => {
          console.log("Firebase Error:", e.message);
        });
    }
  };

  const FuncChecker = () => {
    if (FirstName === "" || LastName === "") {
      toast.error("first name and lastname cannot be left empty", Tagger);
    } else if (!emailRegex.test(Email.toLowerCase()) || Email === "") {
      toast.error("a valid email address is required to join waitlist", Tagger);
    } else {
      if (PhoneNos === "") {
        toast.error("phone number is required to join waitlist", Tagger);
      } else if (selectedPlan === null || selectedPlan === 0) {
        toast.error("You need to choose a kingdom price plan", Tagger);
      } else {
        Teller();
      }
    }
  };

  const Switcher = () => {
    return (
      <div className="inline-flex bg-gray-200 rounded-full p-1">
        <button
          onClick={() => setActiveTab("waitlist")}
          className={`px-6 py-2 rounded-full text-sm md:text-sm font-semibold transition ${
            activeTab === "waitlist"
              ? "bg-primary text-gray-900"
              : "text-gray-700 hover:text-black"
          }`}
        >
          Join Waitlist
        </button>

        <button
          onClick={() => setActiveTab("affiliate")}
          className={`px-6 py-2 rounded-full text-sm md:text-sm font-semibold transition ${
            activeTab === "affiliate"
              ? "bg-primary text-gray-900"
              : "text-gray-700 hover:text-black "
          }`}
        >
          Become an Affiliate
        </button>
      </div>
    );
  };

  const WrapFunct = () => {};

  const BoxNew = (
    <div>
      <div className="py-2 md:py-0">
        <h3 className="text-md font-semibold text-black mb-1">
          Join Elpis Waitlist
        </h3>
        <p className="text-sm text-gray-600">
          Book a spot in elpis academy ahead of the launch and get $20 discount
          on all price plan.
        </p>
      </div>
      {/* Price Cards */}
      <PriceCards onSelect={setSelectedPlan} />

      {/* Full Name */}
      <div className="mb-4 flex items-center w-full">
        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"First Name"}
            label={"First Name"}
            type={"text"}
            IconLeft={<User className="iconStyle" />}
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"Last Name"}
            label={"Last Name"}
            type={"text"}
            IconLeft={<User className="iconStyle" />}
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="md:pd-0 mb-4">
        <FormInput
          placeholder={"Email"}
          label={"Email"}
          type={"email"}
          IconLeft={<Mail className="iconStyle" />}
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <PhoneInputII
          placeholder={"Phone Nos"}
          label={"Phone Nos"}
          type={"email"}
          //IconLeft={<FiMail className="iconStyle" />}
          value={PhoneNos}
          onChange={setPhoneNos}
        />
      </div>

      <div className="md: pd-0 p-3 mb-5 rounded-sm bg-gray-100">
        <FormInput
          placeholder={"Referral Id"}
          label={"Id Of who Reffered you"}
          type={"text"}
          IconLeft={<Users2 className="iconStyle" />}
          value={FetchId}
          disabled={true}
        />
      </div>

      <PaymentOptions
        selected={selected}
        onClick={() => setSelected("paystack")}
        onClickII={() => setSelected("nowpayment")}
        NairaCheck={NGNFormat(LineNaira)}
        DollarCheck={USDFormat(LineUSD)}
      />

      {/* CTA Button */}
      <div className="pt-2">
        <LongBtn
          Title={Load ? WhiteLoader : "Pay & Join Waitlist"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => FuncChecker()}
          //onClick={() => SendEmail()}
        />
      </div>
    </div>
  );

  const AffiliateNav = (
    <div className="flex items-center w-auto my-4 gap-1">
      <div className={"flex-1"}>
        <FormInput
          textplace={"affiliate link"}
          value={AffLink}
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
  const ConAffiliate = (
    <>
      <div className="py-4 md:py-0">
        <h3 className="text-md font-semibold text-black mb-1">
          Become an Affiliate
        </h3>
        <p className="text-sm text-gray-600">
          Earn weekly and monthly by refering a student ahead of elpis launch.
        </p>
      </div>
      <div className="p-4 bg-gray-50">
        <AffiliateBenefits />
      </div>

      <div className="mb-2">
        <FormInput
          placeholder={"Email Address"}
          label={"Email Address"}
          type={"text"}
          IconLeft={<MailIcon className="iconStyle" />}
          value={EmailAff}
          onChange={(e) => setEmailAff(e.target.value)}
        />
      </div>

      {AffLink ? AffiliateNav : null}

      <div className="pt-2">
        <LongBtn
          Title={LoadII ? WhiteLoader : "Generate Affiliate Link"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => GenerateAffiliate()}
        />
      </div>
    </>
  );

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="max-w-md bg-white shadow-lg rounded-lg mx-auto mt-7 space-y-6">
        {/* Switcher */}
        <div className="text-center p-6">
          <Switcher />
        </div>

        {/* Conditional Box */}
        <div className="px-6 pb-6">
          {activeTab === "waitlist" ? BoxNew : ConAffiliate}
        </div>
      </div>
    </div>
  );
}
