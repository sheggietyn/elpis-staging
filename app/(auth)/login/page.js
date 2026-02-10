"use client";
import { LongBtn } from "@/app/components/Buttons/BtnLarge";
import { FormInput, PassInput } from "@/app/components/Inputs/InputForm";
import { SignUpBoxFIll } from "@/app/components/authcomp/AuthComp";
import { NotPops, WhiteLoader, getRandom } from "@/app/util/ToastLoader";
import { BottomTag } from "@/app/util/UtilsJester";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { signInWithEmailAndPassword } from "firebase/auth";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { get, ref, set } from "firebase/database";
import { saveSession } from "@/app/Libs/Session";
import { redirect, useRouter } from "next/navigation";
import { handleLoginError } from "@/app/misc/customFunction/CustomFunc";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { WildGradientSignup } from "@/app/components/authcomp/SignUpNewBox";

export default function page() {
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const [Load, setLoad] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const DocIID = uuidv4();
  const MidId = getRandom(16);
  const Date = moment().format("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const PassFunc = () => {
    setLoad(false); // Set login process state to true
  };

  const LoginUser = async () => {
    try {
      setIsLoggingIn(true);
      setLoad(true); // Set login process state to true

      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Pass
      );
      const userII = userCredential.user;
      const userId = userII.uid;

      // Save session data and update Firebase database
      await set(ref(DB, `Session/${userId}`), {
        UserID: userId,
        Session_Id: DocIID,
        AgentId: MidId,
        Time_Added: Date,
      });
      saveSession(userId, DocIID, MidId);

      const userRef = ref(DB, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.PlanStatus || userData.AffiliateStatus) {
          router.push("/home");
          NotPops("success", "Account Login Successful");
        } else if (userData.Suspend_User) {
          router.push("/suspended");
        } else {
          router.push("/paynow");
        }
      } else {
        NotPops("error", "Data does not exist");
      }
    } catch (e) {
      handleLoginError(e, PassFunc);
    }
  };

  const FinalLogin = () => {
    if (!emailRegex.test(Email.toLowerCase()) || Email === "") {
      NotPops("error", "Incorrect Email address, please Try again!");
    } else if (Pass === "" || Pass.length < 6) {
      NotPops(
        "error",
        "Password cannot be left empty or less than 6 characters!"
      );
    } else {
      setLoad(true);
      LoginUser();
    }
  };

  const FormSlide = (
    <div className="my-auto px-5">
      <h2 className="text-2xl font-bold font-cinzel text-center text-gray-900">
        {"Login To Dashboard"}
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Login to your elpis account now
      </p>

      <div className="mb-4 mt-16">
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
        <div className="text-right mt-2">
          <Link
            href="/forgotpass"
            className="openText text-gray-600 font-medium text-xs text-end hover:text-primary"
          >
            Forgot Password
          </Link>
        </div>
      </div>
      <div className="pt-2">
        <LongBtn
          Title={Load ? WhiteLoader : "Login"}
          more="transition-all duration-300 ease-in-out"
          disabled={Load}
          onClick={() => FinalLogin()}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Don't Have an Account Yet? "}
          linkTagText={"Sign Up"}
          linkTag={"/signup"}
        />
      </div>
    </div>
  );

  return (
    <>
      {/*
    <div className="bg-safe-gradient flex justify-center items-center min-h-screen">
      <div className="px-2 pt-12 md:px-0 h-full w-full">
        <SignUpBoxFIll
          FormTitle={"Login To Dashboard"}
          FormSubText={"Signup to elpis today to start learning"}
          FormTaker={FormSlide}
        />
      </div>
  </div>
   if (user && !isLoggingIn) {
    redirect("/home");
  }
  */}
      <WildGradientSignup FormBox={FormSlide} />
    </>
  );
}
