"use client";
import useLoader, { WhiteLoader } from "@/app/util/ToastLoader";
import { Download } from "lucide-react";
import Link from "next/link";

export const DownloadableItemBox = ({
  Ider,
  IDTag,
  Title,
  Subtext,
  ProductLink,
  onClick,
  isLoading,
}) => {
  return (
    <div className="bg-[#FEFAFA] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 mb-4">
      {/* Left */}
      <div className="mb-2 md:mb-0">
        <h3 className="text-base font-semibold text-gray-800">{Title}</h3>
        <p className="text-xs text-gray-600 select-text">{Subtext}</p>
      </div>

      {/* Right: Download Button */}
      <button
        //href={`/api/downloadFile?url=${encodeURIComponent(ProductLink)}`}
        className="inline-flex items-center font-semibold gap-1 cursor-pointer text-xs bg-[#D4AF3F] text-white px-2.5 py-1.5 rounded-md hover:bg-yellow-600 transition"
        onClick={onClick}
      >
        {Ider === IDTag && isLoading ? (
          WhiteLoader
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download
          </>
        )}
      </button>
    </div>
  );
};
