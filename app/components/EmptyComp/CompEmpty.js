"use client";
import Image from "next/image";
import React from "react";
export const CompEmptySmall = ({ src, Title, Btnn, SmallTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {src ? (
        <Image src={src} alt="Empty" width={100} priority height={100} />
      ) : null}
      <p className="font-sans text-sm font-medium text-gray-500 mb-3">
        {SmallTitle}
      </p>
      {Btnn}
    </div>
  );
};

export const CompEmpty = ({ src, Title, Btnn, SmallTitle }) => {
  return (
    <div className="flex flex-col items-center w-full justify-center h-full">
      <div className="text-center">
        {src ? (
          <div className="w-30 h-30 md:w-[150px] pb-2 text-center mx-auto md:h-[150px]">
            <Image
              src={src}
              alt="Empty"
              width={150}
              height={150}
              className="mx-auto w-full h-full object-contain"
            />
          </div>
        ) : null}
        <p className="font-sans text-xl text-gray-600 font-bold">{Title}</p>
        <p className="font-sans text-sm text-gray-500 mb-3">{SmallTitle}</p>
        {Btnn ? Btnn : null}
      </div>
    </div>
  );
};
