"use client";
import { LongBtn } from "@/app/components/Buttons/BtnLarge";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { CurrencySwap } from "@/app/util/ToastLoader";
import { X } from "lucide-react";
import React, { useState } from "react";

const Detail = ({ label, value, subvalue, drip, onClick }) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}:</span>
    <span className="text-right select-text">{value}</span>
  </div>
);

export const ModalInfo = ({ PayData, onClose, PayAmount }) => {
  const [drip, setDrip] = useState(false);
  const handleRedirect = () => {
    window.open("https://forms.gle/SM2rnfmLFVnBzYhG6", "_blank");
  };
  const {
    label,
    currency,
    accountName,
    accountNumber,
    sortCode,
    swift,
    iban,
    accountType,
    bankName,
    routing,
    bankAddress,
    price,
    symbol,
  } = PayData;

  return (
    <div>
      <div className="bg-white rounded-2xl  w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-1 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-md font-semibold text-gray-900 text-center mb-2">
          {label}
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please make your payment to the account below.
        </p>

        {/* Account Details */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <Detail label="Account Name" value={accountName} />
            {accountNumber && (
              <Detail label="Account Number" value={accountNumber} />
            )}
            {iban && <Detail label="IBAN" value={iban} />}
            {routing && <Detail label="Routing Number" value={routing} />}
            {sortCode && <Detail label="Sort Code" value={sortCode} />}
            <Detail label="Bank Name" value={bankName} />
            {price && (
              <Detail
                label="Amount To Pay"
                value={CurrencySwap(price, currency)}
              />
            )}

            <button
              className={`select-text text-xs font-bold ${
                drip ? "text-primary" : "text-gray-700"
              }`}
              onClick={() => setDrip(!drip)}
            >
              Need additional bank details for your transfer ?
            </button>
            {drip && <Detail label="Bank Address" value={bankAddress} />}
          </div>
        </div>

        {/* Payment Instructions */}
        <p className="text-xs text-gray-600 text-center mb-4">
          Payments are processed securely through our verified partner and
          reconciled by Digital Mogul Global Ltd.
          <i>You will receive your activation email once confirmed</i>
        </p>

        {/* Confirm Button */}
        <div className="pt-2 flex gap-x-2 items-center">
          <LongBtn
            Title={"I Have Made The Payment"}
            more="transition-all duration-300 ease-in-out"
            onClick={() => handleRedirect()}
          />
        </div>
      </div>
    </div>
  );
};
export const PayModal = ({ isDialogPay, WidgetAmount, Openner, PayAmount }) => {
  return (
    <PopperModal
      Openner={isDialogPay}
      NavTitle={""}
      ContentPoper={WidgetAmount}
      OpennerClose={Openner}
      Width={"400px"}
    />
  );
};
