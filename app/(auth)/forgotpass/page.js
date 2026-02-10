"use client";
import { auth } from "@/app/Firebase/AuthHolder";
import { LongBtn } from "@/app/components/Buttons/BtnLarge";
import { FormInput } from "@/app/components/Inputs/InputForm";
import { SignUpBoxFIll } from "@/app/components/authcomp/AuthComp";
import { WildGradientSignup } from "@/app/components/authcomp/SignUpNewBox";
import { ResetError } from "@/app/misc/customFunction/CustomFunc";
import { NotPops, WhiteLoader } from "@/app/util/ToastLoader";
import { BottomTag } from "@/app/util/UtilsJester";
import { sendPasswordResetEmail } from "firebase/auth";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [Email, setEmail] = useState("");
  const [Load, setLoad] = useState(false);

  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PassFunc = () => {
    setLoad(false);
  };

  const ResetUser = async () => {
    try {
      await sendPasswordResetEmail(auth, Email).then(() => {
        NotPops(
          "success",
          "An email has been sent to you to reset your password"
        );
        setLoad(false);
        setEmail("");
        router.replace("/login");
      });
    } catch (e) {
      ResetError(e, PassFunc);
      setLoad(false);
    }
  };

  const FinalLogin = () => {
    if (!emailRegex.test(Email.toLowerCase()) || Email === "") {
      NotPops("error", "Incorrect Email address, please Try again!");
    } else {
      setLoad(true);
      ResetUser();
    }
  };

  const FormSlide = (
    <div className="my-auto px-5">
      <h2 className="text-2xl font-bold font-cinzel text-center text-gray-900">
        {"Reset Password"}
      </h2>
      <p className="text-center text-sm text-gray-700 mb-3 max-w-sm mx-auto">
        Forgot your password ? Reset it now to access your dashboard
      </p>{" "}
      <div className="mb-4 mt-20">
        <FormInput
          placeholder={"Email"}
          label={"Email"}
          type={"email"}
          IconLeft={<Mail className="iconStyle" />}
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pt-2">
        <LongBtn
          Title={Load ? WhiteLoader : "Reset My Password"}
          more="transition-all duration-300 ease-in-out"
          disabled={Load}
          onClick={() => FinalLogin()}
        />
      </div>
      <div className="my-4">
        <BottomTag
          TextTag={"Already Have an Account? "}
          linkTagText={"Login"}
          linkTag={"/login"}
        />
      </div>
    </div>
  );
  return (
    <>
      {/* <div className="bg-safe-gradient min-h-screen">
      <div className="px-2 pt-12 md:px-0 h-full">
        <SignUpBoxFIll
          FormTitle={"Reset Password"}
          FormSubText={
            "Forgot your password ? Reset it now to access your dashboard"
          }
          FormTaker={FormSlide}
        />
      </div>
    </div>*/}
      <WildGradientSignup FormBox={FormSlide} />
    </>
  );
}
