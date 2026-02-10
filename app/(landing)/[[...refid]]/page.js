"use client";
import { useEffect } from "react";
import { saveAffiliateId } from "../../Libs/Session";
import { useParams } from "next/navigation";
import {
  Herolander,
  UpskillBanner,
} from "@/app/components/HeroSections/HeroFollow";
import { HomePageVin } from "@/app/components/HeroSections/NewHome";

export default function Home({}) {
  const params = useParams();
  let Username = params.refid ? params.refid.toString() : "";

  useEffect(() => {
    if (Username) {
      saveAffiliateId(Username);
    }
  }, [Username]);

  return (
    <div className="">
      <Herolander />
      <HomePageVin />
      <div className="pt-5">
        <UpskillBanner />
      </div>
    </div>
  );
}
