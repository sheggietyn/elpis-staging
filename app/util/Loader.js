// app/components/Loader.js
"use client";
import Winner from "@/app/assets/images/ElpisLog.png";
import Image from "next/image";
import { Table, Skeleton } from "@radix-ui/themes";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src={Winner} // replace with your loader image
          alt="Loading..."
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export const ProductLoad = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton className="h-32 w-full rounded-lg mx-2 mb-2" key={index} />
      ))}
    </>
  );
};

export const ProductLoader = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          height={"160px"}
          className="h-40 w-full rounded-lg mb-2"
          key={index}
        />
      ))}
    </>
  );
};

export const ProductLoaderTT = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          height={"320px"}
          className="h-80 min-w-[280px] rounded-lg mb-2"
          key={index}
        />
      ))}
    </>
  );
};

export const ProductLoaderII = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          height={"60px"}
          className="h-40 w-full rounded-lg mb-2"
          key={index}
        />
      ))}
    </>
  );
};

export const LoadAffiliate = ({ count, countOne, countTwo }) => {
  return (
    <>
      <div className="py-3 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
          {Array.from({ length: count }, (_, index) => (
            <Skeleton
              height={"160px"}
              className="h-[160px] w-full rounded-xl mb-2"
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="overflow-x-auto hide-scrollbar w-full">
        <div className="flex md:grid md:grid-cols-4 gap-4 items-center mb-4 w-max md:w-full px-1">
          {Array.from({ length: countOne }, (_, index) => (
            <Skeleton
              height={"80px"}
              className="h-[80px] w-full rounded-xl mb-2"
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-5 pb-20 gap-6">
        {Array.from({ length: countTwo }, (_, index) => (
          <Skeleton
            height={"240px"}
            className="h-60 w-full rounded-xl mb-2"
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export const FinalAffLoader = () => {
  return <LoadAffiliate count={3} countOne={4} countTwo={2} />;
};

export const Onload = ({ Arraay }) => {
  return (
    <>
      {[...Array(3)].map((_, rowIndex) => (
        <Table.Row key={rowIndex}>
          {[...Array(Arraay)].map((_, cellIndex) => (
            <Table.Cell key={cellIndex}>
              <Skeleton className="h-4 rounded-lg" />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  );
};

export const FlickLoad = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton className="h-4 rounded-lg" height={"6px"} key={index} />
      ))}
    </>
  );
};

export const LockLoad = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton className="h-40 rounded-lg" height={"60px"} key={index} />
      ))}
    </>
  );
};

export const NewsLoad = () => {
  return (
    <div>
      <Skeleton className="h-4 w-64 mb-3 rounded-lg " />
      <Skeleton className="h-4 w-full rounded-lg mb-10" />
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  );
};
