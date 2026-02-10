"use client";
import { debounce } from "underscore";
import React, { useCallback } from "react";
import { Tooltip } from "@radix-ui/themes";
export const LargeBtn = ({ btnText, onClick }) => {
  return (
    <button
      className="bg-gold-gradient text-white font-semibold cursor-pointer px-6 py-3 rounded-lg hover:bg-primary-dark transition"
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export const TinyBtn = ({ btnText, onClick }) => {
  return (
    <button
      className="bg-gold-gradient text-white font-semibold text-xs cursor-pointer px-3 py-1 rounded-xl hover:bg-primary-dark transition"
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};
export const SlotBtn = ({ btnText, onClick, more, ...rest }) => {
  const Bounce = debounce(onClick, 700);
  const onPresser = useCallback(Bounce, [onClick]);
  return (
    <button
      className={`w-full ${more} bg-gold-gradient font-semibold cursor-pointer text-white rounded-sm darkblue px-6 py-3 hover:bg-darkgold hover:text-white`}
      onClick={onPresser}
      {...rest}
    >
      {btnText}
    </button>
  );
};

export const GrayBtn = ({ btnText, onClick }) => {
  return (
    <button
      className="px-6 py-3 text-gray-700 bg-gray-200 emboss font-semibold cursor-pointer rounded disabled:opacity-50"
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export const TinyGrayBtn = ({ btnText, onClick, bgColor, content }) => {
  return (
    <Tooltip content={content}>
      <button
        className={`py-2 text-white ${bgColor} emboss font-semibold text-[12px] item-center flex justify-center content-center cursor-pointer rounded disabled:opacity-50`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </Tooltip>
  );
};

export const LongBtn = ({ Title, onClick, more, disabled }) => {
  const Bounce = debounce(onClick, 700);
  const onPresser = useCallback(Bounce, [onClick]);
  return (
    <button
      className={`w-full transition-all duration-300 ease-in-out bg-gold-gradient cursor-pointer text-white py-3 px-3 font-semibold rounded-lg hover:bg-primary ${more}`}
      onClick={onPresser}
      disabled={disabled}
    >
      {Title}
    </button>
  );
};

export const MiniBtn = ({ Title, onClick, disabled, more }) => {
  const Bounce = debounce(onClick, 700);
  const onPresser = useCallback(Bounce, [onClick]);
  return (
    <button
      type="submit"
      className={`bg-gold-gradient flex items-center text-white md:px-6 px-3 py-3 text-sm md:text-sm font-medium rounded-lg shadow hover:bg-primary-dark transition ${more}`}
      onClick={onPresser}
      disabled={disabled}
    >
      {Title}
    </button>
  );
};
