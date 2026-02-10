"use client";
import React, { useState, useMemo, useRef } from "react";
import {
  CountryList,
  CountryListTwo,
  FormInput,
  FormInputII,
  PassInput,
  PhoneInputII,
} from "@/app/components/Inputs/InputForm";
import {
  SignUpBoxFIll,
  SignupBox,
  TopLogo,
} from "@/app/components/authcomp/AuthComp";
import {
  ArrowLeft,
  GraduationCap,
  Info,
  LocateIcon,
  Lock,
  Mail,
  Star,
  User,
  Users,
  Users2,
} from "lucide-react";
import { GrayBtn, LongBtn } from "@/app/components/Buttons/BtnLarge";
import {
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import countryList from "react-select-country-list";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
import moment from "moment";
import { redirect, useParams, useRouter } from "next/navigation";
import { DataArrayData } from "@/app/data/dataTable";
import { AdminUrl, BottomTag, ProgressLevel } from "@/app/util/UtilsJester";
import { ErrorFireSignUp } from "@/app/misc/customFunction/CustomFunc";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAffiliateId, saveSession } from "@/app/Libs/Session";
import { useEffect } from "react";
import { testimonials } from "@/app/data/ArrayData";
import { WildGradientSignup } from "@/app/components/authcomp/SignUpNewBox";
import SelectableBox from "@/app/components/Dashboard/NewComp";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { PriceCardsTwo } from "@/app/components/HeroSections/Pricing";
import { PayerAffiliate } from "@/app/util/PayAffFunc";
import { PayerAffiliateII } from "@/app/util/AffLayer";

export default function page({}) {
  const router = useRouter();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [Switch, setSwitch] = useState(1);
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNos, setPhoneNos] = useState("");
  const [Load, setLoad] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState(null);
  const [UserN, setUserN] = useState("");
  const [DeepDownlineId, setDeepDownlineId] = useState("");
  const [DeepDownuserId, setDeepDownuserId] = useState("");
  const [CrossuserId, setCrossuserId] = useState("");
  const [UserKey, setUserKey] = useState("");
  const [error, setError] = useState("");
  const [errorII, setErrorII] = useState("");
  const [FetchId, setFetchId] = useState("");
  const [FetcherId, setFetcherId] = useState("");
  const [user, loading] = useAuthState(auth);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const options = useMemo(() => countryList().getData(), []);
  const [selectedRole, setSelectedRole] = useState("student");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedII, setSelectedII] = useState("paystack");

  const params = useParams();
  //let FetchId = params.refid ? params.refid.toString() : "";
  const DocID = uuidv4();
  const Date = moment().format("");
  const MidId = getRandom(16);
  const AccId = getRandom(10);
  const OrderId = getRandom(8);

  const marqueeRef = useRef(null);
  const scrollRef = useRef(null);
  const PassFunc = () => {
    setLoad(false); // Set login process state to true
  };

  const steps = [
    { id: 1, name: "Username Info" },
    { id: 2, name: "Personal Info" },
    { id: 3, name: "Complete" },
  ];
  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;
  // Deep Overide Payment Structure
  // Check if Affiliate Id is correct
  // I refer someone, my userId & AffId saves on there database
  // Then it checks if someone referred me aswell, fetches the person userId & AffId from my database
  // and use it to update the persons Affiliate DeepLinkers list
  const usersRef = ref(DB, "users");

  const UserLoweName = Username.toLowerCase();
  useEffect(() => {
    const getAffId = getAffiliateId();
    if (getAffId?.param1) {
      setFetchId(getAffId.param1);
    }
  }, []);

  const Data = {
    email: Email,
    username: `${FirstName}`,
    name: `${FirstName} ${LastName}`,
    templateId: "new signup welcome email",
  };

  const DataII = {
    email: "sheggietyn@gmail.com",
    username: `sheggietyn`,
    name: `Salami Emmanuel`,
    templateId: "new signup welcome email",
  };
  const SendEmail = () => {
    fetch("/api/welcomeMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
  };

  const SendEmailII = () => {
    fetch("/api/welcomeMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(DataII),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
  };

  const handleNext = () => {
    setCurrentStep(
      (prev) => Math.min(prev + 1, steps.length) // ensures it doesn’t exceed total steps
    );
  };

  // Check If the Username is already Choosen, also check if there is a referal Id
  const checkUsernameExistsxx = () => {
    const userQueryRef = query(
      usersRef,
      orderByChild("Username"),
      equalTo(FetchId)
    );
    const userQueryNamer = query(
      usersRef,
      orderByChild("Username"),
      equalTo(UserLoweName)
    );
    if (!Username) {
      NotPops("error", "Username cannot be empty");
      return;
    }

    setLoad(true); // Show loading state

    get(userQueryNamer)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setError("This username is already taken. Try another one.");
          setLoad(false);
        } else {
          if (FetchId) {
            get(userQueryRef).then((snapshot) => {
              if (snapshot.exists()) {
                let userKey = null;
                let myUsername = "";
                snapshot.forEach((userSnapshot) => {
                  userKey = userSnapshot.key;
                  const userData = userSnapshot.val(); // all user data
                  myUsername = userData.Username; // extract username
                });
                setUserKey(userKey); // Key of the person that reffered someone
                setFetcherId(FetchId); //Username of the person that refered someone
                setUserN(myUsername); // Username of the person that refered someone
                setSwitch(2);
              } else {
                setUserKey("");
                setFetcherId("");
                handleNext();
                setSwitch(2);
                setErrorII(
                  "This referal link is invalid, but you can still signup"
                );
                NotPops(
                  "info",
                  "This referal link is invalid, but you can still signup"
                );
              }
            });
          } else {
            setLoad(false);
            handleNext();
            setSwitch(2);
          }
        }
      })
      .catch((error) => {
        console.error("Error checking username:", error);
        NotPops("error", error.message);
        setLoad(false);
      })
      .finally(() => {
        setLoad(false); // Hide loading state
      });
  };

  //Checks if Username exist also fetches refid if it exist
  const UserVerifier = () => {
    if (Username === "" || Username.length < 3) {
      NotPops("error", "Username is required and cannot be less than 3 text");
    } else if (
      FirstName === "" ||
      LastName === "" ||
      FirstName.length < 2 ||
      LastName.length < 2
    ) {
      NotPops("error", "First Name and Last Name is Required to sign up");
    } else {
      if (PhoneNos === "" || PhoneNos.length < 10) {
        NotPops("error", "Phone number is required");
      } else if (selected === "" || selected === null) {
        NotPops("error", "You need to choose a country to sign up");
      } else {
        checkUsernameExistsxx();
      }
    }
  };

  const getPayoutsByRank = (RankTitleFromDB) => {
    const matchedRank = DataArrayData.find(
      (rank) => rank.RankName === RankTitleFromDB
    );

    if (matchedRank) {
      return {
        fallbackPay: matchedRank.FallBackPay,
        deepDownlinePay: matchedRank.DeepDownlinePay,
      };
    }

    // Return default values if no match is found
    return {
      fallbackPay: 0,
      deepDownlinePay: 0,
    };
  };

  // Deep Linking // MyAffiliatorId/MyId/MyReferralId

  const DeepReferal = (RefUserKey, UserKey, userId, DownlinePay) => {
    set(ref(DB, `My DeepLinkers/${RefUserKey}/${RefUserKey}/${userId}`), {
      Username: "",
      FullName: `${FirstName} ${LastName}`,
      PhoneNumber: `+${PhoneNos}`,
      Email: Email,
      Affiliate_UserId: userId,
      Aff_Type: "Override Refferal",
      Amount: DownlinePay,
      Status: "pending",
      ReferalUID: "",
      Earning: 0,
      createdAt: Date,
    });
  };

  // Check for Affiliates List
  const CheckAffiliateLink = (userId, UserKey, fallBackPay) => {
    if (FetchId) {
      set(ref(DB, `My Affiliates Caster/${UserKey}/${UserKey}/${userId}`), {
        Username: UserLoweName,
        FullName: `${FirstName} ${LastName}`,
        PhoneNumber: `+${PhoneNos}`,
        Email: Email,
        Affiliate_UserId: userId,
        Aff_Type: "Direct Referral",
        Amount: fallBackPay ? fallBackPay : 0,
        Status: "pending",
        ReferalUID: "",
        AccId: AccId,
        Refered_By_Me_Id: UserKey,
        Refered_By_Me_Name: UserN,
        createdAt: Date,
      });

      set(ref(DB, `All Admin Affiliates/${userId}`), {
        Username: UserLoweName,
        FullName: `${FirstName} ${LastName}`,
        PhoneNumber: `+${PhoneNos}`,
        Email: Email,
        Affiliate_UserId: userId,
        Aff_Type: "Direct Referral",
        Amount: fallBackPay ? fallBackPay : 0,
        Status: "pending",
        ReferalUID: "",
        AccId: AccId,
        Refered_By_Me_Id: UserKey,
        Refered_By_Me_Name: UserN,
        createdAt: Date,
      });
    }
  };

  //This also checks if User Exist
  const checkIfUsernameExist = () => {
    const userQueryRef = query(
      usersRef,
      orderByChild("Username"),
      equalTo(FetchId)
    );

    return new Promise((resolve, reject) => {
      if (!FetchId) return resolve({ userKey: "", ReffId: "" });

      get(userQueryRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let userKey = "";
            let referralId = "";
            let AffRank = "";
            let UserNameAff = "";

            snapshot.forEach((userSnapshot) => {
              userKey = userSnapshot.key || "";
              const userData = userSnapshot.val();
              referralId = userData.Referral_Id || "";
              AffRank = userData.AffiliateRank || "";
              UserNameAff = userData.Username || "";
            });

            resolve({ userKey, ReffId: referralId, AffRank, UserNameAff });
          } else {
            resolve({ userKey: "", ReffId: "", AffRank: "" });
            //NotPops("info", "Invalid sponsor/Affiliate Id");
          }
        })
        .catch((error) => reject(error));
    });
  };

  const userData = {
    Firstname: FirstName,
    Lastname: LastName,
    Email: Email,
    PhoneNos: PhoneNos,
    Refferral_Id: FetchId ? FetchId : "",
  };

  const InitAuth = async () => {
    setLoad(true);
    const { userKey, ReffId, AffRank, UserNameAff } =
      await checkIfUsernameExist();

    const { fallbackPay, deepDownlinePay } = getPayoutsByRank(AffRank);

    try {
      await createUserWithEmailAndPassword(auth, Email, Pass).then((user) => {
        const userId = auth.currentUser.uid;
        set(ref(DB, `users/${userId}`), {
          Username: UserLoweName,
          Firstname: FirstName,
          Lastname: LastName,
          Email: Email,
          PhoneNos: PhoneNos,
          AccountId: AccId,
          Country: selected,
          Address: Address,
          userId: userId,
          Birthday: "",
          ProfilePix: "",
          Refferral_Id: userKey ? userKey : "",
          ReferUsername: UserNameAff ? UserNameAff : "",
          PlanStatus: false, // Show if user have an active plan
          PlanType: "", // Show the type of student plan someone is on
          PlanPayment: "",
          PlanSubDate: "",
          PlanExpiryDate: "",
          PlanPaymentType: "",
          FirstTimeBuyer: true,
          SignalPlan: "",
          SignalStatus: false,
          SignalSubExpDate: "",
          SignalPayment: "",
          SignalPaymentType: "",
          AddOnSignalStatus: false,
          AddOnSignalPlan: "",
          AddOnSignalSubExpDate: "",
          AffiliatePlan: "", // The Affiliate PricePlan
          AffiliateStatus: false,
          AffiliateRank: "",
          AffiliateCountAll: 0,
          AffiliateDeepCountAll: 0,
          AffiliteWelcomeBonus: 0,
          Earning_Per_Affiliate_Level: "", // Targeted earning per level.. This Update Automatically with the New Level Tag
          Earning_This_Month: 0, // Amount To Earn if you do or do not meet the required signup/$15
          Earning_Per_Affiliate: 0, // Amount Per Affiliate
          Total_Withdrawable: 0, // Total Withdrawable Amount monthly
          Affiliate_SignUp_Benefit: 0, // Benefits you get when you signup for Affiliate
          Required_Target: 0,
          monthly_Affiliate_Count: 0,
          // Affiliate Display of Data
          Aff_Available_Balance: 0, /// Affiliate Aviable Balance
          Aff_Total_Withdrawal: 0, // Total withdraal all time
          Aff_Total_Earning: 0, // Count of Total Alltime Earning
          Aff_Total_Refferals: 0, //
          Aff_Total_Paid_Refferal: 0, // Count the student who have paid in all time total
          Aff_Total_Pending_Pay_Refferal: 0,
          Fast_Start_Bonus: 0,
          Override_Earning: 0,
          Total_Subscription: 0,
          Total_Subscription_Count: 0,
          Total_Addon_Purchase: 0,
          Suspend_User: false,
          Total_Addon_Count: 0,
          Affiliate_Sub: 0,
          Team_Member: false,
          Team_Dept: "",
          CreatedDate: Date,
        });
        saveSession(userId, DocID, MidId);
        set(ref(DB, `Session/${userId}`), {
          UserID: userId,
          Session_Id: DocID,
          AgentId: MidId,
          Time_Added: Date,
        });
        update(ref(DB, AdminUrl), {
          TotalUsers: increment(parseInt(1)),
        }).then(() => {
          if (userKey && ReffId) {
            update(ref(DB, `users/${userKey}`), {
              AffiliateCountAll: increment(1),
              Aff_Total_Pending_Pay_Refferal: increment(parseInt(1)),
            });
            update(ref(DB, `users/${ReffId}`), {
              AffiliateDeepCountAll: increment(1),
            });
            CheckAffiliateLink(userId, userKey, fallbackPay);
            DeepReferal(ReffId, userKey, userId, deepDownlinePay);
          } else if (userKey) {
            update(ref(DB, `users/${userKey}`), {
              AffiliateCountAll: increment(1),
              Aff_Total_Pending_Pay_Refferal: increment(parseInt(1)),
            });
            CheckAffiliateLink(userId, userKey, fallbackPay);
          } else if (ReffId) {
            DeepReferal(ReffId, userKey, userId, deepDownlinePay);
            update(ref(DB, `users/${ReffId}`), {
              AffiliateDeepCountAll: increment(1),
              Aff_Total_Pending_Pay_Refferal: increment(parseInt(1)),
            });
          }

          router.push("/paynow");
          NotPops("success", "Signup Successful, Welcome to Elpis");
          SendEmail();
        });
      });
    } catch (e) {
      ErrorFireSignUp(e, PassFunc);
      setLoad(false);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Send FInal Functions Clipper
  const FinalSend = () => {
    if (
      FirstName === "" ||
      LastName === "" ||
      FirstName.length < 2 ||
      LastName.length < 2
    ) {
      NotPops("error", "First Name and Last Name is Required to sign up");
    } else if (!emailRegex.test(Email.toLowerCase()) || Email === "") {
      NotPops("error", "Enter a valid email address to signup");
    } else {
      if (Pass === "" || Pass.length < 6) {
        NotPops("error", "Password Cannot be empty or less than 6 characters");
      } else if (PhoneNos === "" || PhoneNos.length < 10) {
        NotPops("error", "Phone number is required");
      } else {
        if (selected === "" || selected === null) {
          NotPops("error", "You need to choose a country to sign up");
        } else if (Address === "" || Address.length < 5) {
          NotPops("error", "Please enter a valid city and address");
        } else {
          InitAuth(); //Final Auth
          //setLoad(true);
        }
      }
    }
  };
  {
    /*setTimeout(() => {
            setLoad(false);
            setSwitch(3);
          }, 200);*/
  }

  const SendNext = () => {
    if (selectedRole === "") {
      NotPops("error", "You Need To Select a Plan");
    } else {
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        setSwitch(4);
      }, 200);
    }
  };

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15);
    setUsername(cleanVal);
  };

  const handleNameChange = (setter) => (e) => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^a-zA-Z]/g, "").slice(0, 20); // allow only letters
    setter(cleanVal);
  };
  const UserNameBoard = (
    <div className="my-auto px-5">
      <div className="mb-4 my-auto mt-10">
        <FormInput
          placeholder={"Username"}
          label={"Username"}
          type={"text"}
          IconLeft={<User className="iconStyle" />}
          value={Username.toLowerCase()}
          onChange={handleUsernameChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <div className="mb-4 flex items-center w-full">
        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"First Name"}
            label={"First Name"}
            type={"text"}
            IconLeft={<User className="iconStyle" />}
            value={FirstName}
            onChange={handleNameChange(setFirstName)}
          />
        </div>
        <div className="p-1 w-1/2">
          <FormInput
            placeholder={"Last Name"}
            label={"Last Name"}
            type={"text"}
            IconLeft={<User className="iconStyle" />}
            value={LastName}
            onChange={handleNameChange(setLastName)}
          />
        </div>
      </div>
      <div className="mb-4">
        <PhoneInputII
          placeholder={"Phone Nos"}
          label={"Phone Number"}
          type={"email"}
          value={PhoneNos}
          onChange={setPhoneNos}
        />
      </div>
      <div className="mb-4">
        <CountryListTwo
          selected={selected}
          onSelect={(code) => setSelected(code)}
          label={"Country"}
        />
      </div>

      <div className="pt-2">
        <LongBtn
          Title={Load ? WhiteLoader : "Proceed"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => {
            UserVerifier();
            //SendEmailII();
          }}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Already Have An Account? "}
          linkTagText={"Login Now"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );

  const FormSlide = (
    <div className="px-5">
      <div className="mb-4 mt-10">
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
        <PassInput
          placeholder={"Password"}
          label={"Password"}
          IconLeft={<Lock className="iconStyle" />}
          value={Pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <FormInput
          placeholder={"Address"}
          label={"City/State/Address"}
          type={"Address"}
          IconLeft={<LocateIcon className="iconStyle" />}
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="md:pd-0 p-3 mb-5 rounded-sm bg-gray-100">
        <FormInput
          placeholder={"Referral Id"}
          label={"Sponsored/Ref Id"}
          type={"text"}
          IconLeft={<Users2 className="iconStyle" />}
          value={FetchId}
          disabled={true}
        />
        {errorII && (
          <p className="text-yellow-700 text-xs mt-1 flex items-center gap-x-2">
            <Info className="h-3 w-3" />
            {errorII}
          </p>
        )}
      </div>

      <div className="pt-2 flex gap-x-2 items-center">
        <GrayBtn
          btnText={<ArrowLeft className={"h-5 w-5"} />}
          more="transition-all duration-300 ease-in-out"
          onClick={() => {
            setCurrentStep((prev) => Math.max(prev - 1, 1));
            setSwitch(1);
          }}
        />
        <LongBtn
          Title={Load ? WhiteLoader : "Proceed"}
          more="transition-all duration-300 ease-in-out"
          disabled={Load}
          onClick={() => FinalSend()}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Already Have An Account? "}
          linkTagText={"Login Now"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );

  const FlankSide = (
    <div className="px-5">
      <div className="max-w-md mx-auto my-10 space-y-4">
        <div className="mb-3">
          <SelectableBox
            icon={<GraduationCap className="w-6 h-6" />}
            title="Become An Elpis Student"
            subtext="Gain Access to our courses, trading resources, bot and community"
            selected={selectedRole === "student"}
            onSelect={() => setSelectedRole("student")}
          />
        </div>

        <SelectableBox
          icon={<Users className="w-6 h-6" />}
          title="Unlock Affiliate Kit"
          subtext="Become an affiliate to unlock affiliate resources, tools & reward."
          selected={selectedRole === "affiliate"}
          onSelect={() => setSelectedRole("affiliate")}
        />
      </div>
      <div className="pt-2 flex gap-x-2 items-center">
        <GrayBtn
          btnText={<ArrowLeft className={"h-5 w-5"} />}
          more="transition-all duration-300 ease-in-out"
          onClick={() => {
            setCurrentStep((prev) => Math.max(prev - 1, 1));
            setSwitch(2);
          }}
        />
        <LongBtn
          Title={Load ? WhiteLoader : "Proceed"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => SendNext()}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Already Have An Account? "}
          linkTagText={"Login Now"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );

  ///Payment Ploys
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
            setCurrentStep((prev) => Math.max(prev - 1, 1));
            setSwitch(3);
          }}
        />
        <LongBtn
          Title={Load ? WhiteLoader : "Sign Up as Student"}
          more="transition-all duration-300 ease-in-out"
          onClick={() => SendNext()}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Already Have An Account? "}
          linkTagText={"Login Now"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );

  const PaymentAffiliate = (
    <div className="px-5">
      <PayerAffiliateII
        PlanStatus={false}
        DocID={DocID}
        userData={userData}
        orderId={OrderId}
        userId={user?.uid}
        Date={Date}
        Load={Load}
        funcPrev={() => {
          setCurrentStep((prev) => Math.max(prev - 1, 1));
          setSwitch(3);
        }}
      />

      <div className="my-4">
        <BottomTag
          TextTag={"Already Have An Account? "}
          linkTagText={"Login Now"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );

  const PlotTitle = <>Join Elpis Academy</>;

  const TopProg = (
    <div className="w-full md:max-w-1/3 mb-2 mt-2 max-w-md mx-auto px-5 py-2 sm:px-5 rounded-2xl shadow-xl bg-white relative border border-[#F8F1DC]">
      <ProgressLevel uploadProgress={Switch === 1 ? 0 : 50} />
    </div>
  );

  {
    /*if (user && !isLoggingIn) {
    redirect("/home");
  }*/
  }

  function ProgressSteps() {
    return (
      <div className="w-full mx-auto p-6">
        {/* Progress Steps max-w-5xl */}
        <div>
          <div className="w-full md:pl-10 pl-7 flex justify-center">
            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Circle */}
                  <div
                    className={`flex items-center justify-center w-8 font-semibold h-8 rounded-full border-2 z-10
            ${
              step.id <= currentStep
                ? "bg-primary border-primary text-white"
                : "bg-gray-200 border-gray-300 text-gray-600"
            }`}
                  >
                    {step.id}
                  </div>

                  {/* Line (except last one) */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] 
              ${step.id < currentStep ? "bg-primary" : "bg-gray-300"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-sm font-medium max-w-5xl">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-center text-xs ${
                  step.id === currentStep
                    ? "text-yellow-600 font-bold"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const AllForm = (
    <>
      <h2 className="text-2xl font-bold font-cinzel text-center text-gray-900">
        {PlotTitle}
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Signup to elpis today to start learning
      </p>
      {/*<ProgressSteps />*/}
      {Switch === 1
        ? UserNameBoard
        : Switch === 2
        ? FormSlide
        : Switch === 3
        ? FlankSide
        : Switch === 4
        ? selectedRole === "student"
          ? PaymentStudent
          : PaymentAffiliate
        : null}
    </>
  );

  return (
    <>
      {/*<div className="bg-safe-gradient flex justify-center pb-10 items-center min-h-screen">
      <div className="px-2 md:px-0 h-full w-full">
        {TopProg}
        <SignUpBoxFIll
          FormTitle={PlotTitle}
          FormSubText={"Signup to elpis today to start learning"}
          FormTaker={Switch === 1 ? UserNameBoard : FormSlide}
        />
      </div>
  </div>*/}
      <div>
        <WildGradientSignup FormBox={AllForm} />
      </div>
    </>
  );
}
