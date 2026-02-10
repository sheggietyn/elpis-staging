"use client";
import {
  EACMCourseBoxes,
  ElpisSwitchBar,
  PriceCompHold,
} from "@/app/components/Dashboard/CourseComp";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import { CourseDataList } from "@/app/connector/DataListDisplay";
import { ProductLoad, ProductLoader } from "@/app/util/Loader";
import React, { useState, useEffect, useContext } from "react";
import Edu from "@/app/assets/images/edu.png";
import { ConnectData } from "@/app/connector/CloggerFunc";
import PriceCards, {
  PriceCardsTwo,
} from "@/app/components/HeroSections/Pricing";
import useLoader, {
  NGNFormat,
  USDFormat,
  WhiteLoader,
} from "@/app/util/ToastLoader";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import { LongBtn } from "@/app/components/Buttons/BtnLarge";
import { CheckFunction } from "@/app/util/PayFunction";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { PayLayout } from "@/app/components/Dashboard/Comps/PayLayout";

export default function page() {
  const [active, setActive] = useState("Beginner");
  const user = useContext(AuthContext);
  const [Load, setLoad] = useState(false);
  const [LoadII, setLoadII] = useState(false);
  const { LoaderUser, userData } = ConnectData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selected, setSelected] = useState("paystack");
  const { CourseData, LoadTri } = CourseDataList(active);
  const [paystack, setPaystack] = useState(null);
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();

  const Date = moment().format("");
  const router = useRouter();
  const DocIID = uuidv4();

  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";

  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;
  const TitlePlan = selectedPlan ? selectedPlan.title : "";
  const BonusPay = selectedPlan ? selectedPlan.bonus : "";
  const PassSuccess = "https://digitalmogulacademy.com/courses";

  const LoadLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const RedirectHome = () => {
    router.push("/courses");
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

  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;

  const PayLay = (
    <PayLayout
      ReturnBtn={false}
      userData={userData}
      userId={user.uid}
      Datte={Date}
      DocIID={DocIID}
    />
  );

  return (
    <div className="h-full">
      <ElpisSwitchBar
        active={active}
        Title={"Courses"}
        Subtext={"Switch between beginner and intermediate course level"}
        onClickOne={() => {
          setActive("Beginner");
          LoadLoad();
        }}
        onClickTwo={() => {
          setActive("Intermediate");
          LoadLoad();
        }}
        BtnOne={"Beginner"}
        BtnTwo={"Intermediate"}
      />
      {LoadTri || Load || LoaderUser ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductLoader count={8} />
        </div> // Loader
      ) : (
        <>
          {PlanStatus ? (
            <>
              {CourseData.length > 0 ? (
                <div className="max-h-[70vh] pb-16 md:pb-2 overflow-y-auto">
                  <EACMCourseBoxes courseList={CourseData} />
                </div>
              ) : (
                <div className="flex justify-center h-[500px] items-center">
                  <CompEmpty
                    Title={"No Course Yet"}
                    SmallTitle={`${
                      active === "Beginner"
                        ? "No Beginner Course Yet"
                        : "No Intermediate Course Yet"
                    }`}
                    src={Edu}
                  />
                </div>
              )}
            </>
          ) : (
            <PriceCompHold contentIn={PayLay} />
          )}
        </>
      )}
    </div>
  );
}
