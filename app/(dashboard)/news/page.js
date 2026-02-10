"use client";
import { CompEmptySmall } from "@/app/components/EmptyComp/CompEmpty";
import { NewsLoad } from "@/app/util/Loader";
import { DateTimeTag } from "@/app/util/ToastLoader";
import Neww from "@/app/assets/images/phone.png";
import { NewsPushData } from "@/app/connector/DataListDisplay";
import Image from "next/image";
import { BoxHolder } from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { useRouter } from "next/navigation";

export default function page() {
  const { PostData, LoadTri } = NewsPushData();
  const { LoaderUser, userData } = ConnectData();
  const router = useRouter();

  const Stack = (
    <>
      {LoadTri ? (
        <div className="w-full bg-white border-[1px] border-gray-200 rounded-lg mb-3 p-6">
          <NewsLoad />
        </div>
      ) : (
        <>
          {PostData.length > 0 ? (
            <>
              {PostData.map((item) => (
                <div className="w-full rounded-lg mb-3 p-6" key={item.id}>
                  <div className="mb-7 border-b pb-4 border-b-primary">
                    <p className="font-sans md:text-lg text-md font-bold">
                      {item.PostTitle}
                    </p>
                    <p className="font-sans text-xs text-gray-600">
                      <DateTimeTag TakeDate={item.PostDate} />
                    </p>
                  </div>
                  {item.PostImage ? (
                    <div className="w-full max-w-[500px] aspect-square mx-auto my-6">
                      <Image
                        src={item.PostImage}
                        alt="Img"
                        width={500}
                        height={500}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  ) : null}
                  <p className="font-sans whitespace-pre-wrap text-xs md:text-sm text-gray-600">
                    {item.PostBody}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full bg-white border-[1px] border-gray-200 flex justify-center items-center rounded-lg mb-3 p-6">
              <CompEmptySmall
                SmallTitle={"No Announcement Update"}
                src={Neww}
              />
            </div>
          )}
        </>
      )}
    </>
  );

  const AffiliateStatus = userData ? userData.AffiliateStatus || false : false;
  const PlanStatus = userData ? userData.PlanStatus || false : false;

  return (
    <div className={`HoldScreen flex justify-center`}>
      <div className="overflow-y-auto h-[90vh] pb-16">
        <BoxHolder ContentProps={Stack} />
      </div>
    </div>
  );
}
