import { useState } from "react";
import Image from "next/image";
import PaystackImg from "@/app/assets/images/Paystack.png"; // Replace with actual path
import NowPaymentImg from "@/app/assets/images/nowp.jpeg"; // Replace with actual path

export const PaymentOptions = ({
  selected,
  onClick,
  onClickII,
  NairaCheck,
  DollarCheck,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Box 1: Paystack */}
      <div
        onClick={onClick}
        className={`flex items-center gap-4 p-4 md:p-2 rounded-lg border cursor-pointer transition-all ${
          selected === "paystack"
            ? "border-yellow-500 shadow-md"
            : "border-gray-300"
        }`}
      >
        <Image
          src={PaystackImg}
          alt="Paystack"
          width={30}
          height={30}
          className="object-contain"
        />
        <div>
          <h3 className="text-sm md:text-xs font-semibold text-gray-800">
            Pay with Paystack
          </h3>
          <p className="text-sm text-gray-600 mt-1">{NairaCheck}</p>
        </div>
      </div>

      {/* Box 2: NowPayments */}
      <div
        onClick={onClickII}
        className={`flex items-center gap-4 p-4 md:p-2 rounded-lg border cursor-pointer transition-all ${
          selected === "nowpayment"
            ? "border-yellow-500 shadow-md"
            : "border-gray-300"
        }`}
      >
        <Image
          src={NowPaymentImg}
          alt="Now Payments"
          width={35}
          height={35}
          className="object-contain rounded-full"
        />
        <div>
          <h3 className="text-sm md:text-xs font-semibold text-gray-800">
            Pay with USDT/USD
          </h3>
          <p className="text-sm text-gray-600 mt-1">{DollarCheck}</p>
        </div>
      </div>
    </div>
  );
};

// Cashout Payment
export const CashOptions = ({
  selected,
  onClick,
  onClickII,
  NairaCheck,
  DollarCheck,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Box 1: Paystack */}
      <div
        onClick={onClick}
        className={`flex items-center gap-4 p-4 md:p-2 rounded-lg border cursor-pointer transition-all ${
          selected === "paystack"
            ? "border-yellow-500 shadow-md"
            : "border-gray-300"
        }`}
      >
        <Image
          src={PaystackImg}
          alt="Paystack"
          width={30}
          height={30}
          className="object-contain"
        />
        <div>
          <h3 className="text-sm md:text-xs font-semibold text-gray-800">
            Cash Out Naira
          </h3>
          <p className="text-sm text-gray-600 mt-1">{NairaCheck}</p>
        </div>
      </div>

      {/* Box 2: NowPayments */}
      <div
        onClick={onClickII}
        className={`flex items-center gap-4 p-4 md:p-2 rounded-lg border cursor-pointer transition-all ${
          selected === "nowpayment"
            ? "border-yellow-500 shadow-md"
            : "border-gray-300"
        }`}
      >
        <Image
          src={NowPaymentImg}
          alt="Now Payments"
          width={35}
          height={35}
          className="object-contain rounded-full"
        />
        <div>
          <h3 className="text-sm md:text-xs font-semibold text-gray-800">
            Cash Out USD/USDT
          </h3>
          <p className="text-sm text-gray-600 mt-1">{DollarCheck}</p>
        </div>
      </div>
    </div>
  );
};
