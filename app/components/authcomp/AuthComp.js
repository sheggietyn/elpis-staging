"use client";

import { useState } from "react";
import { Input } from "@radix-ui/themes";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Elpis from "@/app/assets/images/ElpisTiny.png";
import Image from "next/image";

export const TopLogo = () => {
  return (
    <Link href="/" className="text-xl font-bold flex items-center text-black">
      <Image src={Elpis} alt="Elpis Academy Logo" width={110} height={20} />
    </Link>
  );
};

export const SignupBox = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="py-8 px-4 w-full overflow-x-hidden box-border bg-gray-100 min-h-screen flex items-center justify-center">
      <div
        className="max-w-md w-full mx-auto bg-gold-gradient border border-[#F2E8E8] rounded-xl p-8 shadow-lg flex flex-col space-y-6"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #D4AF37 0%, #BF953D 50%, #A97A22 100%)",
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Join Elpis</h2>
          <p className="text-white/80 mt-2 text-sm">
            Unlock a world of premium trading tools and mentorship.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-white/90 text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full bg-white/90 text-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97A22] transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-white/90 text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full bg-white/90 text-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97A22] transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-white/90 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 w-full bg-white/90 text-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97A22] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-[#A97A22] font-semibold py-2 rounded-md hover:bg-gray-100 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export const BottomForm = () => {
  return (
    <p className="text-xs font-medium text-gray-500 mt-4 text-center">
      By signing up, you agree to our{" "}
      <span className="underline text-[#D4AF3F] cursor-pointer">Terms</span> and{" "}
      <span className="underline text-[#D4AF3F] cursor-pointer">
        Privacy Policy
      </span>
      .
    </p>
  );
};
export const SignUpBoxFIll = ({
  FormTaker,
  FormTitle,
  FormSubText,
  Progresser,
}) => {
  return (
    <div className="w-full md:max-w-1/3 max-w-md mx-auto p-6 sm:p-10 rounded-2xl shadow-xl bg-white relative border border-[#F8F1DC]">
      {/* Optional Background Glow */}
      <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-[#fff7e6] via-white to-[#fefefe] opacity-70" />
      {Progresser ? Progresser : null}
      {FormTitle ? (
        <h2 className="md:text-2xl text-xl font-cinzel text-gray-900 font-bold mb-2 mt-2 text-center">
          {FormTitle}
        </h2>
      ) : null}
      {FormSubText ? (
        <p className="text-sm text-gray-600 text-center mb-6">{FormSubText}</p>
      ) : null}

      {FormTaker}
    </div>
  );
};
