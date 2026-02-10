"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  BarChart,
  Wallet,
  Megaphone,
  Star,
  Users,
  BadgeDollarSign,
} from "lucide-react";
import Girll from "@/app/assets/images/laptopguy.png";

const affiliateFeatures = [
  {
    icon: <Trophy className="text-yellow-500 w-6 h-6" />,
    title: "Earn Commissions + Bonuses",
    description:
      "Earn up to $30 per signup with fast-start and monthly rewards. Commission tiers grow with your impact.",
  },
  {
    icon: <BarChart className="text-green-500 w-6 h-6" />,
    title: "Global Affiliate Dashboard",
    description:
      "Track your referrals, income, and growth in one place. Dashboard access is activated after your first purchase.",
  },
  {
    icon: <Wallet className="text-blue-500 w-6 h-6" />,
    title: "Affiliate Kit Access",
    description:
      "Includes brand-aligned flyers, caption templates, and strategy tips — everything you need to promote effectively.",
  },
  {
    icon: <Megaphone className="text-pink-500 w-6 h-6" />,
    title: "Mentorship & Promo Tools",
    description:
      "You’ll get onboarding training, marketing tools, and mentorship to help you succeed.",
  },
];

const affiliatePlans = [
  {
    title: "Already a Student?",
    subtitle: "Add Affiliate Kit — $10",
    description: "For Elpis students who want to start earning.",
  },
  {
    title: "New to Elpis?",
    subtitle: "Starter Affiliate Kit — $25",
    description: "Join as an affiliate even if you haven’t enrolled in a plan.",
  },
];

export const Affiliate = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="w-full">
          <Image
            src={Girll}
            alt="Affiliate Program"
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="font-cinzel text-4xl font-bold text-gray-900 mb-4">
            Become an Elpis Affiliate
          </h2>
          <p className="text-gray-700 mb-6">
            Earn while you share kingdom-aligned trading. Get access to
            mentorship, promo tools, and commissions.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {affiliateFeatures.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow flex gap-4"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="inline-block bg-gold-gradient text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
          >
            Become an Affiliate
          </Link>
        </div>
      </div>

      {/* Divider Section */}
      <div className="max-w-4xl mx-auto text-center mt-24">
        <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">
          What You Get
        </h3>
        <p className="text-gray-600 mb-10">
          Access a powerful affiliate system designed for kingdom-minded
          entrepreneurs.
        </p>

        {/* Pricing Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {affiliatePlans.map((plan, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-yellow-300 p-6 text-left shadow-md"
            >
              <div className="flex items-center gap-2 mb-2 text-yellow-600">
                <BadgeDollarSign className="w-5 h-5" />
                <h4 className="font-semibold">{plan.title}</h4>
              </div>
              <h5 className="text-xl font-bold text-gray-800 mb-2">
                {plan.subtitle}
              </h5>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
