"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { Eye, EyeOff } from "lucide-react";

export const FormInput = ({
  type,
  label,
  IconLeft,
  value,
  placeholder,
  ...props
}) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="label">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 bg-white overflow-hidden w-full rounded-lg pl-3 h-13">
        {IconLeft}
        <input
          type={type ? type : "text"}
          value={value}
          {...props}
          className="flex-1 outline-none bg-white rounded-lg text-secondary overflow-hidden focus:ring-0 h-13"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export const FormInputII = ({
  type,
  label,
  IconLeft,
  value,
  placeholder,
  ...props
}) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="label">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 bg-[#ECEFF1] overflow-hidden w-full rounded-lg pl-3 h-13">
        {IconLeft}
        <input
          type={type ? type : "text"}
          value={value}
          {...props}
          className="flex-1 outline-none bg-[#ECEFF1] rounded-lg text-secondary overflow-hidden focus:ring-0 h-13"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export const PhoneInputII = ({
  type,
  label,
  IconLeft,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <PhoneInput
        country={"ng"}
        value={value}
        onChange={onChange}
        containerClass="w-full flex h-13 rounded-lg"
        //onlyCountries={["ng", "us", "uk"]}
        inputClass="w-full items-center font-sans text-md bg-gray-600 text-secondary bg-red-200 overflow-hidden rounded-lg focus:ring-0 border border-gray-300 h-13"
        buttonClass="bg-white py-5 hover:bg-gray-200 rounded"
        dropdownClass="bg-white border text-secondary border-gray-200 rounded-md"
        searchClass="bg-gray-50 p-2"
        inputStyle={{
          backgroundColor: "#fff", // bg-gray-600
          border: "1px solid #d1d5db", // border-gray-300
          height: "52px",
          width: "100%",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export const CountryList = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        className="text-sm"
        placeholder="Select your country"
      />
    </div>
  );
};

export const CountryListTwo = ({ label, selected, onSelect }) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        searchable
        customStyles={{
          control: {
            height: "52px",
          },
        }}
      />
    </div>
  );
};

export const PassInput = ({
  type,
  label,
  IconLeft,
  value,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 bg-white overflow-hidden w-full rounded-lg pl-3 h-13">
        {IconLeft}
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          {...props}
          className="flex-1 outline-none bg-white rounded-lg text-secondary overflow-hidden focus:ring-0 h-13"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="right-2 top-3 mr-2"
        >
          {showPassword ? (
            <EyeOff className="iconStyle" />
          ) : (
            <Eye className="iconStyle" />
          )}
        </button>
      </div>
    </div>
  );
};

export const WideInput = ({ textplace, type, label, more, rows, ...props }) => {
  return (
    <div>
      {label ? <label className="label">{label}</label> : null}
      <textarea
        type={type ? type : "text"}
        className={`border border-gray-300 bg-white text-secondary w-full rounded-lg pl-3 ${more}`}
        {...props}
        placeholder={textplace}
        rows={rows ? rows : "6"}
      ></textarea>
    </div>
  );
};
