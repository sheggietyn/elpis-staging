"use client";
import { Badge } from "@radix-ui/themes";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import React from "react";
export const BadgeCard = ({ Title, color }) => {
  return (
    <Badge color={color ? color : "orange"} radius="full" variant="soft">
      {Title}
    </Badge>
  );
};

export const BadgeIcn = ({ Icon, color }) => {
  return (
    <div
      className={`${color} flex-nowrap rounded-full text-white p-2 mb-2 flex items-center justify-center`}
    >
      {Icon}
    </div>
  );
};

export const BadgeTag = ({ BadgeTitle, ColorTag }) => {
  return (
    <Badge
      color={ColorTag}
      className="px-2 text-xxs md:text-xs font-medium font-raleway rounded-lg"
    >
      {BadgeTitle}
    </Badge>
  );
};

export default function Linked({ Title, linkref, restyle }) {
  return (
    <Link href={linkref} className={`linkStyle ${restyle}`}>
      {Title}
    </Link>
  );
}

export const BottomTag = ({ TextTag, linkTagText, linkTag }) => {
  return (
    <div className="mt-4 text-center">
      <span className="mx-2 text-sm text-secondary">
        {TextTag}
        <Linked Title={linkTagText} linkref={linkTag} />
      </span>
    </div>
  );
};

export const NavProListTwo = ({ Title, SmallTitle }) => {
  return (
    <div>
      <h3 className="md:text-md text-md text-center font-bold text-gray-800">
        {Title}
      </h3>
      <p className="text-gray-600 text-center text-sm">{SmallTitle}</p>
    </div>
  );
};

export const NavProList = ({ Title, SmallTitle }) => {
  return (
    <div>
      <p className="text-gray-700 font-semibold text-sm">{Title}</p>
      <p className="text-gray-600 text-sm">{SmallTitle}</p>
    </div>
  );
};

export const TopBalance = ({ small, amount }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-5">
      <p className="text-xs text-center text-gray-500">{small}</p>
      <p className="text-md text-center font-medium text-gray-700">{amount}</p>
    </div>
  );
};

export const ProgressLevel = ({ uploadProgress }) => {
  return (
    <ProgressBar
      completed={uploadProgress}
      bgColor="#D4AF37" // Elpis gold
      baseBgColor="#E5E7EB" // light gray
      height="10px" // thinner bar
      labelAlignment="center"
      labelColor="#000000"
      isLabelVisible={true}
      customLabel={`${uploadProgress}%`} // show % sign
      labelSize="10px" // make label smaller
    />
  );
};

export const StatusCall = {
  Pending: "pending",
  Active: "active",
  Processing: "processing",
  Completed: "completed",
  Cancelled: "cancelled",
  OnHold: "onHold",
  OnGoing: "onGoing",
  Rejected: "rejected",
  Successful: "success",
  Refunded: "refunded",
};

export const BadgeStatusTwo = (DataPasser) => {
  if (DataPasser === StatusCall.Pending) {
    return "⏳ Pending";
  } else if (DataPasser === StatusCall.Active) {
    return "🔥 Active";
  } else if (DataPasser === StatusCall.Processing) {
    return "🔄 Processing";
  } else if (
    DataPasser === StatusCall.Completed ||
    DataPasser === StatusCall.Successful
  ) {
    return "✅ Completed";
  } else if (
    DataPasser === StatusCall.Cancelled ||
    DataPasser === StatusCall.Refunded
  ) {
    return "❌ Cancelled";
  } else if (DataPasser === StatusCall.OnHold) {
    return "⏸️ On Hold";
  } else if (DataPasser === StatusCall.OnGoing) {
    return "🚀 Ongoing";
  } else if (DataPasser === StatusCall.Rejected) {
    return "❌ Rejected";
  } else {
    return "❓ Unknown"; // Default for unexpected statuses
  }
};

export const BadgeStatus = (DataPasser) => {
  if (DataPasser === StatusCall.Pending) {
    return "amber";
  } else if (DataPasser === StatusCall.Active) {
    return "blue";
  } else {
    if (DataPasser === StatusCall.Processing) {
      return "cyan";
    } else if (
      DataPasser === StatusCall.Completed ||
      DataPasser === StatusCall.Successful
    ) {
      return "green";
    } else {
      if (
        DataPasser === StatusCall.Cancelled ||
        DataPasser === StatusCall.Refunded
      ) {
        return "red";
      } else if (DataPasser === StatusCall.OnHold) {
        return "ruby";
      } else {
        if (DataPasser === StatusCall.OnGoing) {
          return "Lime";
        } else if (DataPasser === StatusCall.Rejected) {
          return "tomato";
        } else {
        }
      }
    }
  }
};

export const AdminUrl = "Admin Stock/weyerrhdgrvrg2134hffgffgryrge";
export const LiveLinkSignUp = "/signup";
export const LiveLinkLogin = "/login";
export const WaitList = "/waitlist";
export const SessionUrl = "Live Session/27676wuetrtsvrruete";

export const loadKoraScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.Korapay !== "undefined") {
      resolve(); // Already loaded
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const cleanupKorapay = () => {
  try {
    // Close existing modal safely
    if (window.Korapay && typeof window.Korapay.close === "function") {
      window.Korapay.close();
    }

    // Remove any leftover modal elements
    const modals = document.querySelectorAll("[data-korapay-modal]");
    modals.forEach((modal) => modal.reset());

    // Nullify the collections object to reset
    if (window.KorapayCollections) {
      window.KorapayCollections = null;
    }
  } catch (error) {
    console.log("Korapay cleanup error:", error);
  }
};
