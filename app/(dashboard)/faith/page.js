"use client";
import { ElpisSwitchBarTop } from "@/app/components/Dashboard/CourseComp";
import React from "react";
import Bible from "@/app/assets/images/biblee.png";
import Image from "next/image";
import { FaithSection } from "@/app/components/Dashboard/AffCom";
import { BibleVerse, QoutesList } from "@/app/connector/DataListDisplay";
import { FlickLoad, ProductLoaderII } from "@/app/util/Loader";
import Link from "next/link";
import { CompEmptySmall } from "@/app/components/EmptyComp/CompEmpty";
import Imagge from "@/app/assets/images/multimedia.png";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { redirect, useRouter } from "next/navigation";

export default function page() {
  const { BibleData, LoadData } = BibleVerse();
  const { ListData, LoadListData } = QoutesList();
  const { LoaderUser, userData } = ConnectData();
  const PlanStatus = userData ? userData.PlanStatus || false : false;
  const router = useRouter();

  const LinkUrl = "";

  const DailyQQ = [
    {
      id: 1,
      QouteTitle:
        "I trade with patience, not pressure.(God is not rushed. Neither am I.) 🔥",
    },
    {
      id: 2,
      QouteTitle:
        "I steward every opportunity with wisdom. (My strategies are led by the Spirit.) 🔥",
    },
  ];

  const BilCage = (
    <Image
      src={Bible}
      alt="bible"
      width={40}
      height={40}
      className="object-contain"
    />
  );

  const Vill = (
    <>
      {LoadData ? (
        <ProductLoaderII count={1} />
      ) : (
        <>
          {BibleData.length > 0 ? (
            <>
              {BibleData.map((item) => (
                <div
                  className="bg-[#FFF8E1] border-l-4 border-[#D4AF3F] p-6 rounded-xl mb-3 shadow-md"
                  key={item.id}
                >
                  <h2 className="text-xl font-semibold text-[#A97A22] mb-2">
                    Bible Verse of the Day
                  </h2>
                  <p className="text-gray-700 italic">"{item.Qoute}"</p>
                  <span className="text-sm text-gray-500"> — {item.Verse}</span>
                </div>
              ))}
            </>
          ) : null}
        </>
      )}
    </>
  );

  const QouteTitle = {
    Qoute: "",
    PostTime: "",
  };
  const HandleQoutes = (
    <>
      {LoadListData ? (
        <ProductLoaderII count={3} />
      ) : (
        <>
          {ListData.length > 0 ? (
            <>
              {ListData.map((item) => (
                <div className="space-y-3" key={item.id}>
                  <div className="bg-gray-100 rounded-xl px-4 py-3 mb-2 text-sm text-gray-700">
                    {item.Qoute}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {DailyQQ.map((item) => (
                <div className="space-y-3" key={item.id}>
                  <div className="bg-gray-100 rounded-xl px-4 py-3 mb-2 text-sm text-gray-700">
                    {item.QouteTitle}
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );

  const Lorem = (
    <>
      {BibleData.length > 0 ? (
        <Link download href={LinkUrl}>
          <button className="bg-gold-gradient text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300">
            Download Devotional Qoute
          </button>
        </Link>
      ) : null}
    </>
  );

  const VideoFx = (
    <div className="aspect-w-16 aspect-h-10">
      <iframe
        className="w-full h-full rounded-md"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Last Session"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );

  const Lazzer = <CompEmptySmall src={Imagge} SmallTitle={"No Video Yet"} />;
  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;

  return (
    <div className="md:h-screen pb-50 md:pb-2">
      <ElpisSwitchBarTop
        Title={"Faith & Focus"}
        Subtext={"Trade with truth. Build with the Word."}
        SecondTile={BilCage}
      />

      <div className="h-[calc(100vh-140px)] md:h-auto overflow-y-auto md:overflow-visible pb-20">
        <FaithSection
          VideoFram={Lazzer}
          Bibler={Vill}
          Qoutes={HandleQoutes}
          //LinkUrl={Lorem}
        />
      </div>
    </div>
  );
}
