"use client";
import { PulseLoader, MoonLoader, BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import React, { useState } from "react";
import moment from "moment";

export const WhiteLoader = <PulseLoader size={5} color="#fff" />;
export const PopLoader = <BounceLoader size={12} color="#fff" />;
export const YellowLoader = <PulseLoader size={5} color="#D4AF3F" />;
export const LoaderGray = <PulseLoader size={3} color="#6c757d" />;

export const Tagger = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "custom-toast",
  theme: "light",
};

export const NotPops = (typefunc, SubText) => {
  toast[typefunc](SubText, Tagger);
};

export const NGNFormat = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const CurrencySwap = (value, currencyCode) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const USDFormat = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
export const CountFormat = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const getRandom = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const LoadFunc = () => {
    setIsLoading(true);
    setIsDisabled(true);
  };

  const StopLoad = () => {
    setIsLoading(false);
    setIsDisabled(false);
  };

  return { isLoading, isDisabled, LoadFunc, StopLoad };
};

export default useLoader;

export const useSaveLoad = () => {
  const [isLoadSave, setIsLoadSave] = useState(false);
  const [SaveDisabled, setSaveDisabled] = useState(false);

  const LoadFuncSave = () => {
    setIsLoadSave(true);
    setSaveDisabled(true);
  };

  const StopLoadSave = () => {
    setIsLoadSave(false);
    setSaveDisabled(false);
  };

  return { isLoadSave, SaveDisabled, LoadFuncSave, StopLoadSave };
};

export const DateTag = (TakeDate) => {
  return moment(TakeDate).format("MMM Do YYYY");
};

export const DateTimeTag = ({ TakeDate }) => {
  return (
    <>
      {`${moment(TakeDate).format("MMM Do YYYY")} at ${moment(TakeDate).format(
        "h:mm A"
      )}`}
    </>
  );
};

export const DateAdder = (Period) => {
  return moment().add(Period, "days").format("YYYY-MM-DD");
};

export const PassSuccess = "https://digitalmogulacademy.com/login";
