// app/pricing/page.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Elpis from "@/app/assets/images/Elpis.png";
import Kodesh from "@/app/assets/images/Kodesh.png";
import Dunamis from "@/app/assets/images/dunamis.png";
import { TestimonCanUsage } from "./NewHome";
import { CenteredTag } from "../cardcomp/cards";
import { LiveLinkSignUp } from "@/app/util/UtilsJester";
import { Affiliate } from "./LogAff";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DateAdder, NotPops, WhiteLoader } from "@/app/util/ToastLoader";
import { addToCart, useCartShow } from "../Dashboard/Comps/CartContext/NewCart";

const plans = [
  {
    id: 1,
    name: "Elpis Plan",
    nickname: "The Foundation Builder",
    price: "$100 / month",
    checklist: ["1 Month", "Mentorship & Community access", "Trade Guide"],
    image: Elpis,
    pricecall: 100,
    euro: 87,
    pound: 77,
    bonus: "$80 / month",
    features: [],
    description: "",
    SignalType: "Elpis",
    ExpDate: DateAdder(30).toString(),
    Token: 30000,
  },
  {
    id: 2,
    name: "Kodesh Elite",
    nickname: "The Deep Diver",
    price: "$150 / 6 Weeks",
    image: Kodesh,
    pricecall: 150,
    euro: 131.11,
    pound: 115.57,
    bonus: "$130 / 6 Weeks",
    description: "",
    SignalType: "Kodesh",
    features: [],
    ExpDate: DateAdder(42).toString(),
    Token: 50000,
    checklist: [
      "6 Weeks",
      "Mentorship/Community access/Q&A",
      "Live Trading Room Access",
    ],
  },
  {
    id: 3,
    name: "Dunamis Rahab",
    nickname: "The Master Builder",
    price: "$250 / 3 Months",
    bonus: "$230 / 3 Months",
    image: Dunamis,
    pricecall: 250,
    euro: 218.53,
    pound: 192.61,
    description: "",
    SignalType: "Dunamis",
    features: [],
    ExpDate: DateAdder(90).toString(),
    Token: 100000,
    checklist: [
      "3 Months",
      "Everything in Elpis + Kodesh",
      "1 On 1 Onboarding Call",
    ],
  },
];

const FollowTag = () => {
  return (
    <div className="text-left">
      <p className="text-md font-bold text-gray-900 my-4">
        Includes everything in Elpis Plan, plus:
      </p>
      <div className="text-md font-bold text-gray-900 my-4">
        Kodesh Netivah Trade Ideas:
      </div>
      <p className="text-gray-700 mb-6">
        Get refined trade setups, real-time strategy breakdowns, and
        insight-driven confirmations to trade with deeper conviction.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Live Trading Room Access
      </div>
      <p className="text-gray-700 mb-6">
        Watch trades happen live and learn decision-making in real-time.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Weekly Q&A Sessions
      </div>
      <p className="text-gray-700 mb-6">
        Join our private mentor-led sessions to ask questions, gain feedback,
        and grow faster.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Bonus Worksheets & Strategy Templates
      </div>
      <p className="text-gray-700">
        Advanced tools for structure, growth & consistency.
      </p>
    </div>
  );
};

const FollowTagII = () => {
  return (
    <div className="text-left">
      <div className="text-md font-bold text-gray-900 my-4">
        Includes everything in Elpis + Kodesh, plus:
      </div>

      <div className="text-md font-semibold text-gray-900 mb-3">
        1-on-1 Onboarding Call
      </div>
      <p className="text-gray-700 mb-6">
        Personalized welcome session to map out goals and systems.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Dunamis Rahab Trade Ideas
      </div>
      <p className="text-gray-700 mb-6">
        Personalized welcome session to map out goals and systems.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Dunamis Resource Vault Access
      </div>
      <p className="text-gray-700">
        Get exclusive tracking systems, templates, and mini courses.
      </p>
    </div>
  );
};

const FollowTagIII = () => {
  return (
    <div className="text-left">
      <div className="text-md font-bold text-gray-900 my-4">
        EACM — Elpis Academy Course Modules
      </div>
      <p className="text-gray-700 mb-6">
        A comprehensive video training series designed for both new and
        experienced traders. EACM equips you with the full skill set to trade
        confidently — from the foundations of forex to advanced market
        execution. Lessons are simplified, strategic, and taught through a
        biblical lens, so you grow in both skill and spirit.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Elpis Orim Trade Ideas
      </div>
      <p className="text-gray-700 mb-6">
        Receive beginner-friendly trading ideas, setup examples, and spiritual
        insights to build consistency with clarity.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Trader eGuide
      </div>
      <p className="text-gray-700 mb-6">
        Learn basic terms, tools, and how to navigate markets confidently.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        30-Day Fast-Track Trading Journal (Downloadable)
      </div>
      <p className="text-gray-700 mb-6">
        Track trades, emotions & lessons with daily prompts.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Kingdom Clarity Blueprint (Mindset Guide)
      </div>
      <p className="text-gray-700 mb-6">
        Align your beliefs and behaviors with God-led strategy.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Community Access
      </div>
      <p className="text-gray-700 mb-6">
        Get plugged into the daily support & guidance community.
      </p>

      <div className="text-md font-semibold text-gray-900 mb-3">
        Mentorship Access
      </div>
      <p className="text-gray-700">
        Join other students for questions, wins & feedback.
      </p>
    </div>
  );
};
export default function PricingPage() {
  const [Load, setLoad] = useState(false);
  const [checker, setChecker] = useState("");
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const { cart } = useCartShow();

  useEffect(() => {
    if (redirect) {
      const student = cart.find((i) => i.type === "student");
      if (student) {
        router.push(LiveLinkSignUp);
      }
    }
  }, [redirect]);

  const PutUpdate = (plan) => {
    setChecker(plan);
    const {
      name,
      pricecall,
      euro,
      pound,
      ExpDate,
      Token,
      SignalType,
      checklist,
      nickname,
    } = plan;
    setLoad(true);
    addToCart({
      type: "student",
      name: name,
      price: pricecall,
      priceGbp: pound,
      priceEuro: euro,
      ExpDate: ExpDate,
      Token: Token,
      SignalType: SignalType,
      checklist: checklist,
      nickname: nickname,
    });
    NotPops("success", "Successfully Added to cart");
    ///router.push(LiveLinkSignUp);
    setRedirect(true);
    console.log("Save to cart", cart);
  };

  return (
    <main className="bg-white text-gray-800">
      <section className="py-24 px-6 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto mb-12">
          <CenteredTag TextSpark={"Choose a Price Plan"} />

          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Kingdom-Built Plan
          </h1>
          <p className="text-lg text-gray-700">
            One vision. Three pathways. Pick the plan that aligns with your
            purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-xl border border-yellow-200 flex flex-col md:mt-0 mt-7"
            >
              {/* Image */}
              <div className="relative h-12">
                {" "}
                {/* Space for half the image inside the card */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image
                      src={plan.image}
                      alt={`${plan.name} image`}
                      fill
                      className="rounded-full shadow-md border-4 border-[--color-lightgold] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-5 flex flex-col flex-1">
                {" "}
                {/* pt-12 to avoid image overlap */}
                <h2 className="font-cinzel text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>
                <div className="flex w-full justify-center items-center">
                  <p className="w-fit text-sm bg-eggplant text-center italic text-white px-3 py-1 rounded-full my-3">
                    {plan.nickname}
                  </p>
                </div>
                <p className="text-xl font-bold text-[#D4AF3F] mb-4">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-700 mb-4">{plan.description}</p>
                {/* Conditional Tags */}
                {plan.name === "Kodesh Elite" && <FollowTag />}
                {plan.name === "Dunamis Rahab" && <FollowTagII />}
                {plan.name === "Elpis Plan" && <FollowTagIII />}
                {/* Button at bottom of content */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => PutUpdate(plan)}
                    className="w-full inline-block text-center font-semibold bg-gold-gradient hover:bg-yellow-600 text-white text-sm py-2 px-4 rounded-md transition"
                  >
                    {Load
                      ? checker.name === plan.name
                        ? WhiteLoader
                        : "Get Started"
                      : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Affiliate />

      <TestimonCanUsage />
    </main>
  );
}
