"use client";
import React, { useState, useContext, useEffect } from "react";
import { DownloadableItemBox } from "@/app/components/Dashboard/ProductComp";
import { downloads } from "@/app/data/TestArray";
import {
  ElpisSwitchBarII,
  PriceCompHold,
} from "@/app/components/Dashboard/CourseComp";
import { VaultList } from "@/app/connector/DataListDisplay";
import { CompEmpty } from "@/app/components/EmptyComp/CompEmpty";
import Edu from "@/app/assets/images/vault.png";
import { ProductLoaderII } from "@/app/util/Loader";
import {
  AffiliatePricingBox,
  PriceCardsTwo,
} from "@/app/components/HeroSections/Pricing";
import { PaymentOptions } from "@/app/components/HeroSections/PayClicker";
import useLoader, {
  NGNFormat,
  NotPops,
  USDFormat,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { AuthContext } from "@/app/auth/AuthProvider";
import { LongBtn } from "@/app/components/Buttons/BtnLarge";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";
import { CheckFunction } from "@/app/util/PayFunction";
import { PayerAffiliate } from "@/app/util/PayAffFunc";

export default function page() {
  const [active, setActive] = useState("Student");
  const [Load, setLoad] = useState(false);
  const { resData, LoadTri } = VaultList(active);
  const user = useContext(AuthContext);
  const { LoaderUser, userData } = ConnectData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selected, setSelected] = useState("paystack");
  const [selectedII, setSelectedII] = useState("paystack");
  const [paystack, setPaystack] = useState(null);
  const [pricer, setPricer] = useState(0);
  const [title, setTitle] = useState("");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [AccModalOpen, setAccModalOpen] = useState("");
  const DocIID = uuidv4();
  const Date = moment().format("");
  const OrderId = getRandom(8);
  const router = useRouter();

  useEffect(() => {
    // Dynamically import inside effect
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module?.PaystackPop || module?.default;
      setPaystack(new PaystackPop());
    });
  }, []);

  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanType = userData ? userData.PlanType || "" : "";
  const Email = userData ? userData.Email || "N/A" : "N/A";
  const FirstName = userData ? userData.Firstname || "N/A" : "N/A";
  const LastName = userData ? userData.Lastname || "N/A" : "N/A";
  const PhoneNos = userData ? userData.PhoneNos || "N/A" : "N/A";
  const RefferMeId = userData ? userData.Refferral_Id || "" : "";
  const SignalType = userData ? userData.SignalPlan || "" : "";
  const PassSuccess = "https://digitalmogulacademy.com/courses";
  const PassAff = "https://digitalmogulacademy.com/affiliate";

  const LineNaira = selectedPlan ? 1600 * selectedPlan.pricecall : 0;
  const LineUSD = selectedPlan ? selectedPlan.pricecall : 0;

  const SignalPayNGN = PlanStatus ? 1600 * 10 : 1600 * 25;
  const SignalUSD = PlanStatus ? 10 : 25;

  const RedirectHome = () => {
    router.push("/courses");
  };

  const LoadLoad = () => {
    setLoad(true);
    StopLoad();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const LazerPayzer = (
    <>
      <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
        Become an Elpis Student
      </h1>
      <p className="text-sm text-center text-gray-500">
        Unlock Elpis Trading Courses,Academy,Tools & Signal Room
      </p>
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
  );

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
          onClick={() => ""}
        />
      </div>
    </>
  );

  const Loader = (item) => {
    LoadFunc();
    setTitle(item.id);
    setTimeout(() => {
      StopLoad();
    }, 500);
  };

  const handleDownloadII = async (item) => {
    setTitle(item.id);

    try {
      LoadFunc();

      // Just navigate to the API route — browser will handle the download
      const downloadUrl = `/api/downloadFile?url=${encodeURIComponent(
        item.ProductLink
      )}`;
      window.location.href = downloadUrl;
    } catch (error) {
      console.error("Download failed", error);
      NotPops("error", "Failed to download file.");
    } finally {
      StopLoad();
    }
  };
  const handleDownload = (item) => {
    setTitle(item.id);
    setAccModalOpen(item.ProductLink);
    try {
      LoadFunc(); // start loading indicator

      const a = document.createElement("a");
      a.href = `/api/downloadFile?url=${encodeURIComponent(item.ProductLink)}`;
      a.setAttribute("download", "");
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Give a short delay before stopping loading so it feels responsive
      setTimeout(() => {
        StopLoad();
      }, 1500);
    } catch (error) {
      console.error("Download failed", error);
      NotPops("error", "Failed to download file.");
      StopLoad();
    }
  };

  return (
    <>
      <ElpisSwitchBarII
        active={active}
        Title={"Resources Vault"}
        Subtext={
          "Exclusive tools, downloads & templates to fast-track your journey."
        }
        onClickOne={() => {
          setActive("Student");
          LoadLoad();
        }}
        onClickTwo={() => {
          setActive("Affiliate");
          LoadLoad();
        }}
        BtnOne={"Student Resources"}
        BtnTwo={"Affiliate Resources"}
      />
      <>
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/2 rounded-lg px-2 mb-16 mt-4 md:px-0 md:mb-5 md:mt-0">
            <div className="w-full bg-white rounded-lg mb-3 mt-10 p-6">
              <div className="space-y-4">
                {LoadTri || Load ? (
                  <div className="gap-y-6">
                    <ProductLoaderII count={7} />
                  </div>
                ) : (
                  <>
                    {active === "Student" ? (
                      <>
                        {active === "Student" && PlanStatus ? (
                          <>
                            {resData.length > 0 ? (
                              <>
                                {resData.map((item, index) => (
                                  <DownloadableItemBox
                                    key={index}
                                    Title={item.Title}
                                    Subtext={item.Subtext}
                                    ProductLink={item.ProductLink}
                                    Ider={item.id}
                                    IDTag={title}
                                    isLoading={isLoading}
                                    onClick={() => handleDownload(item)}
                                  />
                                ))}
                              </>
                            ) : (
                              <div className="flex justify-center h-[500px] items-center">
                                <CompEmpty
                                  Title={"No Resources Yet"}
                                  SmallTitle={`${
                                    active === "Student"
                                      ? "No Student Resources Yet"
                                      : "No Affiliate Resources Yet"
                                  }`}
                                  src={Edu}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          LazerPayzer
                        )}
                      </>
                    ) : (
                      <>
                        {active === "Affiliate" && AffiliateStatus ? (
                          <>
                            {resData.length > 0 ? (
                              <>
                                {resData.map((item, index) => (
                                  <DownloadableItemBox
                                    key={index}
                                    Title={item.Title}
                                    Subtext={item.Subtext}
                                    ProductLink={item.ProductLink}
                                    Ider={item.id}
                                    IDTag={title}
                                    isLoading={isLoading}
                                    onClick={() => handleDownload(item)}
                                  />
                                ))}
                              </>
                            ) : (
                              <div className="flex justify-center h-[500px] items-center">
                                <CompEmpty
                                  Title={"No Resources Yet"}
                                  SmallTitle={`${
                                    active === "Student"
                                      ? "No Student Resources Yet"
                                      : "No Affiliate Resources Yet"
                                  }`}
                                  src={Edu}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <PayerAffiliate
                            PlanStatus={PlanStatus}
                            DocID={DocIID}
                            userData={userData}
                            orderId={OrderId}
                            userId={user.uid}
                            Date={Date}
                            PassSuccess={PassAff}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
