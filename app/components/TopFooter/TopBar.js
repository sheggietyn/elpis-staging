"use client";
import Link from "next/link";
import { LargeBtn } from "../Buttons/BtnLarge";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Elpis from "@/app/assets/images/ElpisLogo.png";
import Image from "next/image";
import { LiveLinkLogin } from "@/app/util/UtilsJester";

export const TopBarII = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold text-black">Elpis Academy</span>
          </Link>
        </div>

        {/* Join Waitlist Button */}
        <div>
          <Link href="/Logger">
            <LargeBtn btnText={"Join Waitlist"} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          <Image src={Elpis} alt="Elpis Academy Logo" width={130} height={32} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link
            href="/"
            className="hover:border-b-2 hover:border-primary hover:font-bold"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="hover:border-b-2 hover:border-primary hover:font-bold"
          >
            {" "}
            Pricing Plans
          </Link>
          <Link
            href="/about"
            className="hover:border-b-2 hover:border-primary hover:font-bold"
          >
            What is Elpis?
          </Link>
          <Link href={LiveLinkLogin}>
            <LargeBtn btnText={"Login Here"} />
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleMenu}>
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/pricing" onClick={toggleMenu}>
            Pricing Plans
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            What is Elpis?
          </Link>
          <Link href={LiveLinkLogin} onClick={toggleMenu}>
            <LargeBtn btnText={"Login Here"} />
          </Link>
        </nav>
      </div>

      {/* Backdrop when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/40 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};
export const TopTag = ({ textHolder }) => {
  return (
    <div className="w-fit rounded-sm py-2 px-2.5 mb-2 bg-darkgold text-white font-bold text-xs">
      {textHolder}
    </div>
  );
};
