"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import finwoman from "@/app/assets/images/laptopgirl.png";
import { CenteredTag, CenteredTagII } from "../cardcomp/cards";

export const WhatIsElpis = () => {
  return (
    <div className="bg-[--color-background] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-96">
              <Image
                src={finwoman}
                alt="Elpis Forex Academy"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-lg opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[--color-darkgold] to-transparent opacity-40 rounded-xl"></div>
            </div>
            {/* Text and Button */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-[--color-lightgold] mb-4">
                What is Elpis Forex Academy?
              </h1>
              <p className="text-lg text-[--color-cream] mb-6 leading-relaxed">
                Elpis is a faith-driven trading school where financial wisdom
                meets spiritual purpose. We empower believers to master the
                forex market with proven strategies, mentorship, and a community
                rooted in faith.
              </p>
              <Link href="/courses">
                <button className="bg-[--color-primary] text-[--color-darkfont] font-semibold py-3 px-6 rounded-lg hover:bg-[--color-touchsec] transition-colors duration-300 shadow-md">
                  Explore Our Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[--color-shadedgray] to-transparent"></div>
      </section>

      {/* Mission and Values Section */}
      <section className="py-16 bg-[--color-coal]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[--color-lightgold] text-center mb-12">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Faith-Driven Learning",
                description:
                  "We integrate Scripture with strategy, guiding students to trade with wisdom and purpose as stewards of wealth.",
                icon: (
                  <svg
                    className="w-8 h-8 text-[--color-primary]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 00-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8a8 8 0 00-8-8zm0 14a6 6 0 01-6-6c0-1.66.67-3.16 1.76-4.24l1.41 1.41C6.45 8.55 6 9.74 6 11a4 4 0 008 0c0-1.26-.45-2.45-1.17-3.83l1.41-1.41A6 6 0 0110 16z" />
                  </svg>
                ),
              },
              {
                title: "Proven Strategies",
                description:
                  "Our expert-led courses teach practical, time-tested forex trading techniques to help you succeed in the markets.",
                icon: (
                  <svg
                    className="w-8 h-8 text-[--color-primary]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2H7v-2H5v-2h2V9h2v2h2v2z" />
                  </svg>
                ),
              },
              {
                title: "Community & Mentorship",
                description:
                  "Join a supportive community of believers with access to personalized mentorship and daily trading signals.",
                icon: (
                  <svg
                    className="w-8 h-8 text-[--color-primary]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[--color-cream] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-xl font-semibold text-[--color-darkfont] ml-3">
                    {value.title}
                  </h3>
                </div>
                <p className="text-[--color-secondary] text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[--color-background]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[--color-lightgold] mb-4">
            Join the Elpis Movement
          </h2>
          <p className="text-lg text-[--color-cream] mb-8 max-w-2xl mx-auto">
            Become part of a community raising wise and wealthy believers. Start
            your journey to financial freedom with faith and strategy.
          </p>
          <Link href="/pricing">
            <button className="bg-[--color-primary] text-[--color-darkfont] font-semibold py-3 px-8 rounded-lg hover:bg-[--color-touchsec] transition-colors duration-300 shadow-md">
              View Our Plans
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export const AboutElpisPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative bg-safe-gradient py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <CenteredTag TextSpark={"About Elpis"} />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-cinzel mb-4">
            What is Elpis Academy?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A premium faith-aligned, AI-powered trading education platform built
            for impact, financial transformation, and mentorship.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="hidden md:block">
              <CenteredTagII TextSpark={"We are on a Mission"} />
            </div>
            <div className="block md:hidden">
              <CenteredTag TextSpark={"We are on a Mission"} />
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-[#D4AF3F] font-cinzel">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Elpis Academy is designed to equip purpose-driven individuals with
              the skillset and mindset to thrive in the modern digital
              economy—starting with trading, automation, and community-backed
              mentorship.
            </p>
            <ul className="space-y-3">
              {[
                "Structured AI-powered trading education",
                "Supportive community & live mentorship",
                "Plug-and-play systems to automate your growth",
                "Tools, templates, and scripts to fast-track results",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-eggplant" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src={finwoman}
              alt="Elpis Academy"
              fill
              className="object-cover rounded-xl"
              style={{ objectPosition: "center 40%" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="bg-gray-50 py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <CenteredTag TextSpark={"How we make a Difference"} />

          <h2 className="text-3xl font-semibold text-[#D4AF3F] font-cinzel mb-6">
            Why Elpis is Different
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            We’re not just another trading platform. We’re a purpose-led academy
            that merges technology, mentorship, and Biblical principles for
            sustainable success.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "📚 Intelligent Curriculum",
                desc: "Courses tailored to both beginners and experienced traders — powered by AI and delivered in digestible, practical steps.",
              },
              {
                title: "🤝 Mentorship + Community",
                desc: "Learn directly from experts and stay motivated through weekly check-ins, mentorship calls, and peer challenges.",
              },
              {
                title: "⚡ Automation + Tools",
                desc: "Access trading bots, templates, scripts, and promotional tools to multiply your learning and income.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-cinzel mb-6">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Join hundreds of other ambitious minds who are transforming their
          income, mindset, and future with Elpis.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-gold-gradient text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-yellow-600 transition"
        >
          Join Elpis Now
        </Link>
      </section>
    </main>
  );
};
