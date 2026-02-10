// app/page.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Star, Zap, Smile, ShieldCheck } from "lucide-react";
import { LargeBtn } from "../Buttons/BtnLarge";
import firstclass from "@/app/assets/images/firstclass.jpg";
import pray from "@/app/assets/images/prayy.jpeg";
import { CourPricing, IconGridSection } from "./HeroFollow";
import { CenteredTag, CenteredTagII } from "../cardcomp/cards";
import { howItWorksData, testimonials } from "@/app/data/ArrayData";
import { Affiliate } from "./LogAff";
import { LiveLinkSignUp } from "@/app/util/UtilsJester";

const HoldCub = () => {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={pray}
          alt="Elpis Academy Background"
          layout="fill"
          objectFit="cover"
          className="opacity-17 md:opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gray-50/70"></div>{" "}
        {/* colored overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          What is Elpis Academy?{" "}
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Elpis Academy is a faith-aligned trading school equipping kingdom
          builders to trade with strategy, confidence, and biblical wisdom. We
          merge technical mastery with spiritual clarity - because wealth
          without purpose is just noise.
        </p>
        <Link href={LiveLinkSignUp}>
          <LargeBtn btnText={"Join Elpis Now"} />{" "}
        </Link>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="pb-15 px-6 bg-white text-center">
      <CenteredTag TextSpark={"How it Works"} />
      <div className="text-center mb-6 md:px-0 px-2">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
          How Elpis works{" "}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          3 Steps. One Kingdom-Aligned. To help you get started with your
          trading journey.
        </p>
      </div>
      <div className="relative px-2 py-10 bg-white">
        {/* Horizontal Connector Line for md+ */}
        <div className="hidden md:block absolute left-0 right-0 top-[130px] h-[2px] bg-yellow-500 z-0" />

        {/* Vertical Line for mobile */}
        <div className="md:hidden absolute left-[32px] top-[140px] bottom-8 w-[2px] bg-yellow-500 z-0" />
        <div className="relative grid md:grid-cols-3 gap-10 max-w-7xl mx-auto text-left">
          {howItWorksData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow">
                {/* Connector Dot (visible only on mobile) */}
                <div className="absolute w-4 h-4 bg-yellow-500 rounded-full z-20 top-6 left-[-12px] md:hidden" />

                <div className="flex-shrink-0 relative z-20">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full border-2 border-white shadow-md">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}{" "}
        </div>
      </div>
    </section>
  );
};

const Vivoo = () => {
  return (
    <section className="py-24 bg-gray-100 px-6 text-center">
      <h2 className="font-cinzel md:text-4xl text-3xl font-bold text-gray-900">
        Why People Choose Elpis
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-3 mx-auto">
        Our comprehensive approach combines expert knowledge, practical
        experience, and ongoing support to ensure your success.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-left">
        {[
          {
            title: "Faith-Aligned Learning",
            desc: "Grow your finances without compromising your values.",
            icon: <ShieldCheck className="text-blue-600 w-6 h-6" />,
          },
          {
            title: "Real-Time Mentorship",
            desc: "You're not alone. Get help via WhatsApp and weekly calls.",
            icon: <CheckCircle className="text-green-500 w-6 h-6" />,
          },
          {
            title: "Automation Tools",
            desc: "Leverage AI and scripts to reduce manual effort.",
            icon: <Zap className="text-yellow-400 w-6 h-6" />,
          },
          {
            title: "Earn While Learning",
            desc: "Earn up to $30 per referral plus bonuses as you grow.",
            icon: <Star className="text-pink-500 w-6 h-6" />,
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FloatPricer = () => {
  return (
    <section className="py-15 bg-gray-50 border-y-2 border-eggplant px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="hidden md:block">
            <CenteredTagII TextSpark={"Start Your Learning Journey"} />
          </div>
          <div className="block md:hidden">
            <CenteredTag TextSpark={"Start Your Learning Journey"} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
            Unlock Full Access{" "}
          </h2>
          <p className="text-gray-700 mb-6">
            Start Learning, and unlock full access to our tools, courses and
            dashboard for as low as $100 Monthly
          </p>
          <ul className="space-y-3 text-gray-700">
            {[
              "All courses & mentorship",
              "Full dashboard access",
              "Affiliate system",
              "AI tools & trading guide",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-center">
                <CheckCircle className="text-primary w-4 h-4" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <CourPricing />
      </div>
    </section>
  );
};

const TestimonCan = () => {
  return (
    <section className="py-24 px-6 bg-white text-center">
      <CenteredTag TextSpark={"How it Works"} />
      <div className="text-center mb-6 md:px-0 px-2">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
          Testi{" "}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by traders worldwide for its expert mentorship, reliable
          tools, and consistent results.
        </p>
      </div>
      <div className="flex overflow-x-auto gap-6 px-2 max-w-7xl mx-auto scrollbar-hide">
        {["ss1.png", "ss2.png", "ss3.png", "ss4.png"].map((img, i) => (
          <div
            key={i}
            className="relative min-w-[250px] h-[400px] rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={`/images/${img}`}
              alt={`Testimonial ${i + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <Link href="/testimonials" className="my-7">
        <LargeBtn btnText="View full testimonials" />{" "}
      </Link>
    </section>
  );
};

const TestTest = () => {
  return (
    <div className="flex overflow-x-auto gap-6 px-2 max-w-7xl mx-auto py-5 scrollbar-hide">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="bg-gray-50 min-w-[280px] max-w-sm rounded-xl shadow-md p-6 text-left flex-shrink-0"
        >
          <div className="mb-3 flex items-center gap-1">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 ${
                  idx < t.rating ? "text-primary" : "text-gray-300"
                }`}
                fill={idx < t.rating ? "#FACC15" : "none"}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            "{t.comment}"
          </p>
          <div className="text-sm font-semibold text-gray-900">— {t.name}</div>
        </div>
      ))}
    </div>
  );
};

export const TestimonCanUsage = () => {
  return (
    <section className="py-10 px-6 bg-white text-center">
      <CenteredTag TextSpark={"Testimonials"} />
      <div className="text-center mb-6 md:px-0 px-2">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
          Testimonies from our previous Students{" "}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by traders worldwide for its expert mentorship, reliable
          tools, and consistent results.
        </p>
      </div>
      <TestTest />
      <Link href="/testimonial" className="pt-10">
        <LargeBtn btnText="View full testimonials" />{" "}
      </Link>
    </section>
  );
};

export const HomePageVin = () => {
  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* HERO */}
      <HoldCub />

      {/* HOW ELPIS WORKS */}
      <HowItWorks />

      {/* WHY CHOOSE ELPIS */}
      <IconGridSection />

      {/* SUCCESS STORIES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="hidden md:block">
              <CenteredTagII TextSpark={"Life Changing Testimonies"} />
            </div>
            <div className="block md:hidden">
              <CenteredTag TextSpark={"Life Changing Testimonies"} />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
              Success Stories
            </h2>
            <p className="text-gray-700 mb-6">
              Trading changed my life. I went from dreaming about financial
              freedom to actually living it. I've withdrawn over $15,000 flown
              business class, and invested in my future - and it all started
              from saying yes to mentorship- under mentorship Favour Ayemere.
              <i>- Chizoba, Nigeria 🇳🇬</i>
            </p>
            <Link href="/testimonial">
              <LargeBtn btnText="Read More Testimonials" />{" "}
            </Link>
          </div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={firstclass}
              alt="Success Story"
              layout="fill"
              objectFit="cover"
              className={"border border-primary"}
            />
          </div>
        </div>
      </section>
      <Affiliate />

      {/* PRICING SECTION SPLIT */}
      <FloatPricer />

      {/* WHATSAPP SCREENSHOTS */}
      <TestimonCanUsage />
    </main>
  );
};
