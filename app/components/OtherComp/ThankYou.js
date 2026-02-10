"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export const ThankYouPage = () => {
  return (
    <main className="bg-white text-gray-800 min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-xl p-10 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="mx-auto text-[#D4AF3F] w-16 h-16" />
        </div>

        {/* Heading */}
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Thank You for Joining Elpis Academy!
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
          Your purchase was successful. We’re thrilled to have you on board!
        </p>

        {/* Instruction */}
        <p className="text-gray-600 mb-8">
          A confirmation email with all the necessary steps to access your
          courses, dashboard, and bonuses is on its way to your inbox.
          <br />
          Be sure to check your promotions or spam folder just in case!
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
};
