"use client";
import Image from "next/image";
import Link from "next/link";
import Elpis from "@/app/assets/images/ElpisLogo.png";
import visa from "@/app/assets/images/visa.png";
import pay from "@/app/assets/images/pay.png";
import usdt from "@/app/assets/images/usdt.png";
import now from "@/app/assets/images/now.png";
import { Mail, Globe, Instagram } from "lucide-react";
import { LiveLinkLogin, LiveLinkSignUp } from "@/app/util/UtilsJester";

export const PaymentMethods = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      <div className="flex items-center gap-2">
        <Image
          src={visa}
          alt="Visa"
          width={24}
          height={24}
          className={"bg-white rounded-sm w-[24px] h-[24px]"}
        />
        {/* <span className="text-sm text-gray-500">Visa</span>*/}
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={pay}
          alt="Paystack"
          width={24}
          height={24}
          className={"bg-white rounded-sm w-[60px] h-[24px]"}
        />
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={usdt}
          alt="USDT"
          width={24}
          height={24}
          className={"bg-white rounded-sm w-[24px] h-[24px]"}
        />
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={now}
          alt="NOWPayments"
          width={24}
          height={24}
          className={"bg-white rounded-sm w-[200px] h-[24px]"}
        />
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-playfair font-bold text-xl">
                <Image
                  src={Elpis}
                  alt="Elpis Academy Logo"
                  width={130}
                  height={32}
                />
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Where Faith Fuels Financial Wisdom
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  What is Elpis?
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing Plans{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonial"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials{" "}
                </Link>
              </li>
              <li>
                <Link
                  href={LiveLinkSignUp}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Join Elpis Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/policypage"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:support@digitalmogulacademy.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href={LiveLinkLogin}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Student Login
                </Link>
              </li>

              <li>
                <Link
                  href={LiveLinkLogin}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Affiliate Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Link
                  href="mailto:hello@digitalmogulacademy.com"
                  className="flex gap-2 items-center"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  hello@digitalmogulacademy.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/" className="flex gap-2 items-center">
                  <Globe className="w-4 h-4 text-primary" />
                  www.digitalmogulacademy.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link
                  href="https://www.instagram.com/joinelpisacademy?igsh=dmJrbGVsMGxwZWFp&utm_source=qr"
                  className="flex gap-2 items-center"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  @joinelpisacademy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <PaymentMethods />
          <p className="text-gray-400 text-sm">
            Built on wisdom. Led by faith. Powered by vision. ©️ 2025 Elpis
            Academy. A division of Digital Mogul Global Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const FooterSimple = () => {
  return (
    <footer className="w-full bg-gray-900 text-white rounded-t-[2rem] px-4 py-10">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        {/* Logo */}
        <div>
          <Image
            src="/logo.." // replace with your logo path
            alt="Company Logo"
            className="h-10"
            width={100}
            height={30}
          />
        </div>

        {/* Title / Tagline */}
        <div className="text-lg font-semibold">
          Built on wisdom. Led by faith. Powered by vision
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Elpis Academy. A Division of Digital
          Mogul Global.
        </div>
      </div>
    </footer>
  );
};
