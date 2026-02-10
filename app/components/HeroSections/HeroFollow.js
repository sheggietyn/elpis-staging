"use client";
import Image from "next/image";
import Link from "next/link";
import Prayy from "@/app/assets/images/prayy.jpeg";
import { FaChartLine, FaBolt, FaLock, FaArrowRight } from "react-icons/fa";
import { LargeBtn, SlotBtn } from "../Buttons/BtnLarge";
import Buy from "@/app/assets/images/chart.png";
import Tradelady from "@/app/assets/images/tradd.jpg";
import Winner from "@/app/assets/images/winner.png";

import { Card, CenteredTag, StatCard } from "../cardcomp/cards";
import {
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Star,
  Trophy,
  BarChart,
  Wallet,
  Megaphone,
} from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "../UI/Uicom";
import { Courses, dataTray, CoursesII } from "@/app/data/ArrayData";
import * as LucideIcons from "lucide-react";
import { TopTag } from "../TopFooter/TopBar";
import { TestimonialBoxes } from "./TestCard";
import { LiveLinkSignUp } from "@/app/util/UtilsJester";

export const Herolander = () => {
  return (
    <section className="text-white border-[1.5px] border-primary bg-cream py-20 px-4 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="overflow-hidden w-full">
          <div>
            <TopTag textHolder={"AI Trading Made Easy"} />
          </div>
          <h1 className="text-4xl md:text-4xl font-cinzel text-black font-bold leading-tight mb-6">
            Where Faith Fuels <br />
            <span className="text-primary">Financial Wisdom</span>
          </h1>
          <p className="text-md text-gray-600 mb-8 break-words">
            Join the elite circle of traders with our expert-led courses, AI
            tools, and mentorship—all tailored to your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/pricing">
              <button className="bg-gold-gradient text-white border-2 border-[#AC7F26] cursor-pointer font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition">
                Start Learning Now
              </button>
            </Link>
            <Link href="/pricing">
              <button className="border border-primary text-primary font-bold px-6 py-3 rounded-lg hover:bg-primary hover:text-gray-800 transition">
                View Plans
              </button>
            </Link>
          </div>
          <div>
            <StatCard />
          </div>
        </div>

        {/* Right Content - Testimonials */}
        <div className="w-full md:flex md:justify-center">
          <div className="md:w-full -mx-4 px-4">
            <Image
              src={Tradelady}
              alt="Trading Lady"
              width={500}
              height={400}
              className="w-[500px] h-[400px] rounded-xl border-4 border-darkgold object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialCallers = () => {
  return (
    <div className="w-full bg-gray-50">
      <CenteredTag TextSpark={"Why Choose Elpis"} />
      <div className="text-center mb-6 md:px-0 px-2">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
          Why People Choose Elpis
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by traders worldwide for its expert mentorship, reliable
          tools, and consistent results.
        </p>
      </div>
      <TestimonialBoxes />
    </div>
  );
};

export const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="bg-white border-[1.4px] border-primary rounded-lg shadow flex flex-col items-center justify-center h-full">
        <Image
          src={Buy}
          alt="Course Preview"
          fill={false}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[310px] object-top object-cover rounded-md mb-4"
        />
        <div className="p-7">
          <h2 className="text-xl text-black font-bold font-cinzel text-center mb-2">
            Master Trading with Ease
          </h2>
          <p className="text-gray-600 text-center">
            Learn from top mentors and get access to intelligent tools to boost
            your trades.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-between h-full gap-4">
        {/* Box 1 */}
        <div className="bg-gray-100 rounded-lg border-[2px] border-gray-200 p-4 flex flex-col h-full">
          <div className="bg-blue-100 p-2 w-10 h-10 rounded flex items-center justify-center mb-2">
            <FaChartLine className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-1">
            Real-time Analytics
          </h3>
          <p className="text-sm text-gray-600">
            Get insights on market trends as they happen.
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-gray-100 rounded-lg border-[2px] border-gray-200 p-4 flex flex-col h-full">
          <div className="bg-yellow-100 p-2 w-10 h-10 rounded flex items-center justify-center mb-2">
            <FaBolt className="text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-1">
            Smart Alerts
          </h3>
          <p className="text-sm text-gray-600">
            Be notified when trade opportunities arise.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-gray-100 rounded-lg border-[2px] border-gray-200 p-4 flex flex-col h-full">
          <div className="bg-green-100 p-2 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
            <FaLock className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-1">
            Secure Access
          </h3>
          <p className="text-sm text-gray-600">
            All your data and trading tools protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export const HighlightSection = () => {
  return (
    <div className="bg-lightgold pb-8 pt-4 px-4 w-full">
      <CenteredTag TextSpark={"Why Elpis"} />

      {/* Centered Container */}
      <div className="flex flex-col items-center gap-12 max-w-5xl mx-auto w-full">
        {/* Top Big Box */}
        <div className="bg-white border-primary border-[1.1px] rounded-lg flex flex-col md:flex-row w-full">
          {/* Left Content */}
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl text-gray-800 font-bold mb-2 font-cinzel">
              Get Started with Elpis Academy
            </h2>
            <p className="text-gray-600 mb-4">
              Learn to trade smarter with our AI-powered mentorship platform.
            </p>

            <Link href="#waitlist">
              <LargeBtn btnText={"Join Waitlist"} />
            </Link>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 p-4 flex justify-center items-center">
            <Image
              src={Tradelady}
              alt="Academy Preview"
              width={500}
              height={250}
              className="object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Bottom Two Boxes (Same Width as Top Box) */}
        <div className="flex flex-col md:flex-row w-full gap-6">
          {/* Box 1 */}
          <div className="bg-white border-primary border-[1.1px] rounded-lg p-6 flex flex-col items-center text-center w-full md:w-1/2">
            <Image
              src="/feature1.png"
              alt="Feature 1"
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-1 text-gray-900">
              Expert Mentorship
            </h3>
            <p className="text-gray-600 text-sm">
              Work with top traders guiding you through every step.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white border-primary border-[1.1px] rounded-lg p-6 flex flex-col items-center text-center w-full md:w-1/2">
            <Image
              src="/feature2.png"
              alt="Feature 2"
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-1 text-gray-900">
              Automated Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Access powerful automation tools that help you trade faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeatureSec = () => {
  return (
    <div className="font-lato">
      {/* Big Box */}
      <div className="w-full bg-primary-light py-12 flex justify-center">
        <div className="w-full max-w-[30%] mx-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* Left: Text and Button */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-cinzel">
              Discover Our Platform
            </h2>
            <p className="text-gray-600 mb-6">
              Unlock a world of possibilities with our innovative tools and
              services designed to elevate your experience.
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition w-fit">
              Learn More
            </button>
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2">
            <Image
              src="/images/feature1.jpg"
              alt="Feature Image"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Two Smaller Boxes */}
      <div className="w-full bg-secondary-light py-12 flex justify-center">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[30%] mx-4">
          {/* Box 1 */}
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/images/feature2.jpg"
              alt="Feature 2 Image"
              width={600}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Feature One
              </h3>
              <p className="text-gray-600">
                Explore our cutting-edge feature that simplifies your workflow
                and boosts productivity.
              </p>
            </div>
          </div>
          {/* Box 2 */}
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/images/feature3.jpg"
              alt="Feature 3 Image"
              width={600}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Feature Two
              </h3>
              <p className="text-gray-600">
                Experience seamless integration with our advanced solutions
                tailored for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageLeftTextRight = () => {
  return (
    <section className="px-4 pb-8 pt-4 bg-lightgold">
      <CenteredTag TextSpark={"Why Elpis"} />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={Buy}
            alt="Trading Lady"
            width={500}
            height={400}
            className="w-[500px] h-[400px] rounded-xl object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-cinzel">
            Why Choose Our Academy
          </h2>
          <p className="text-gray-600 mb-6">
            Our trading academy is built on real-world success, expert
            mentorship, and practical strategies. Whether you're a beginner or
            looking to sharpen your skills, we’ve got the tools and support you
            need.
          </p>

          {/* Lucide checklist */}
          <ul className="space-y-3">
            {[
              "High-Quality Mentorship",
              "Daily Trade Setups",
              "Lifetime Community Access",
            ].map((item, index) => (
              <li key={index} className="flex items-center py-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-yellow-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const UpskillBanner = ({ TestTitle }) => {
  return (
    <div className="md:mx-0 mx-3">
      <section className="w-full bg-[#4c2e4f] rounded-[2rem] px-6 py-16 mb-10 flex flex-col items-center justify-center text-center text-white max-w-6xl mx-auto">
        <h2 className="text-xl md:text-3xl font-semibold pb-2 leading-relaxed max-w-2xl font-cinzel">
          {TestTitle
            ? TestTitle
            : "Take control of your finances — learn to trade with confidence at Elpis Academy!"}
        </h2>
        <Link href={LiveLinkSignUp}>
          <LargeBtn btnText={"Join Elpis Now"} />
        </Link>
      </section>
    </div>
  );
};
const ConCaster = ({ InProp }) => {
  return <div className="bg-gray-50 px-5">{InProp}</div>;
};
const FollowDesc = (
  <div>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      {"30-Day Fast-Track Trading Journal (Downloadable)"}
    </p>
    <ConCaster
      InProp={
        <>
          <p className="text-gray-600 font-semibold text-sm mb-2">
            Trader eGuide
          </p>
          <p className="text-gray-600 mb-4">
            {
              "Learn basic terms, tools, and how to navigate marketsconfidently. Track trades, emotions & lessons with daily prompts."
            }
          </p>
        </>
      }
    />
    <p className="text-gray-600 font-semibold text-sm mb-2">
      {"Kingdom Clarity Blueprint (Mindset Guide)"}
    </p>
    <p className="text-gray-600 mb-4">
      Align your beliefs and behaviors with God-led strategy.
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Mentorship Access
    </p>
    <p className="text-gray-600 mb-4">
      Get plugged into the daily support & guidance community
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">Community Access</p>
    <p className="text-gray-600 mb-4">
      Join other students for questions, wins & feedback
    </p>
  </div>
);

const FollowDescIII = (
  <div>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Kodesh Netivah Signal Room
    </p>
    <p className="text-gray-600 mb-4">
      Get refined trade setups, real-time strategy breakdowns, and
      insight-driven confirmations to trade with deeper conviction.
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Live Trading Room Access
    </p>
    <p className="text-gray-600 mb-4">
      Watch trades happen live and learn decision-making in real-time.
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Weekly Q&A Sessions
    </p>
    <p className="text-gray-600 mb-4">
      Join our private mentor-led sessions to ask questions, gain feedback, and
      grow faster.
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Bonus Worksheets & Strategy Templates
    </p>
    <p className="text-gray-600 mb-4">
      Advanced tools for structure, growth & consistency.
    </p>
  </div>
);

const FollowDescV = (
  <div>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      1-on-1 Onboarding Call
    </p>
    <p className="text-gray-600 mb-4">
      Personalized welcome session tomap out goals and systems.
    </p>
    <p className="text-gray-600 font-semibold text-sm mb-2">
      Dunamis Resource Vault Access
    </p>
    <p className="text-gray-600 mb-4">
      Get exclusive tracking systems,templates, and mini courses.
    </p>
  </div>
);

export const CoursePreview = () => {
  return (
    <section className="pb-10 bg-gray-50">
      <CenteredTag TextSpark={"Elpis Academy Plan "} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-cinzel md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Choose Your Kingdom-Built Plan{" "}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            One vision. Three pathways. Pick the plan that aligns with your
            purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-start">
          {Courses.map((course, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg bg-white transition-shadow animate-slide-fade ${
                course.title === "Kodesh Elite" ? "border-2 border-primary" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-24 h-24 md:w-24 md:h-24">
                  <Image
                    src={course.image} // Dynamic placeholder, replace with course-specific image
                    alt={`${course.title} image`}
                    //layout="fill"
                    objectFit="cover"
                    className="rounded-full shadow-md border-4 border-[--color-lightgold]"
                  />
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-darkgold text-white px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                  <div className="text-2xl font-bold text-darkgold">
                    {course.price}
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-800">
                  {course.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 font-semibold text-sm mb-2">
                  {course.SmallTitle}
                </p>
                <p className="text-gray-600 mb-4">{course.description}</p>
                {course.title === "Elpis Plan" ? FollowDesc : null}
                {course.title === "Kodesh Elite" ? FollowDescIII : null}

                {course.title === "Dunams Rahab" ? FollowDescV : null}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm pb-2 text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm pb-2 text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-sm pb-2 text-gray-500">
                    <Star className="w-4 h-4 mr-2 fill-primary text-forex-gold" />
                    <span>{course.rating} rating</span>
                  </div>
                </div>

                <SlotBtn btnText="Join WaitList" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const IconGridSection = () => {
  return (
    <div className="w-full bg-gray-100">
      <CenteredTag TextSpark={"Why Choose Elpis"} />
      <div className="text-center mb-6 md:px-0 px-2">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-gray-900 mb-4 font-cinzel">
          Why People Choose Elpis
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by traders worldwide for its expert mentorship, reliable
          tools, and consistent results. Elpis work with a powerful framework.
        </p>
      </div>

      <section className="w-full flex justify-center py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4 text-center">
          {dataTray.map((item, index) => {
            const IconComponent = LucideIcons[item.icon]; // dynamically pull icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-primary border-[1.1px] hover:shadow-lg transition duration-300 animate-slide-fade"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  {IconComponent && (
                    <IconComponent className="w-10 h-10 text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
      <div className="text-center w-full pb-5">
        <Link href="/pricing">
          <LargeBtn btnText={"View Pricing Package"} />
        </Link>
      </div>
    </div>
  );
};
export const Afiliate = () => {
  return (
    <div className="mx-2 md:mx-0">
      <section className="bg-gray-100 max-w-4xl mx-auto rounded-lg py-10 my-10 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Image Left */}
          <div className="w-full md:w-1/2">
            <Image
              src={Winner}
              alt="Affiliate Program"
              width={500}
              height={400}
              className="w-full h-auto rounded-xl object-cover"
              priority
            />
          </div>

          {/* Text Right */}
          <div className="w-full md:w-1/2 md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-cinzel">
              Become an Elpis Affiliate{" "}
            </h2>
            <p className="text-gray-600 mb-6">
              Get onboarding training, promo tools, and mentorship support.
              Include: Brand-aligned flyers, caption templates, and strategy
              tips.
            </p>

            <ul className="text-gray-700 mb-8 space-y-3">
              <li className="flex gap-2 pb-2">
                <Trophy className="w-7 h-7 text-primary" />
                Earn up to $30 per signup with fast-start + monthly rewards.{" "}
              </li>
              <li className="flex items-center gap-2 pb-2">
                <BarChart className="w-7 h-7 text-primary" />
                Track your referrals, income, and growth in one place.{" "}
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Wallet className="w-7 h-7 text-primary" />
                Dashboard access activated after purchase.
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Megaphone className="w-7 h-7 text-primary" />
                Marketing assets provided
              </li>
            </ul>

            <LargeBtn btnText={"Become an Affiliate"} />
          </div>
        </div>
      </section>
    </div>
  );
};
export const HeroBlend = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 relative h-64 md:h-96">
            <Image
              src={Prayy}
              alt="Elpis family"
              layout="fill"
              objectFit="cover"
              className="rounded-xl border-2 border-primary shadow-lg opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[--color-darkgold] to-transparent opacity-40 rounded-xl"></div>
          </div>

          {/* Text and Button */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-cinzel text-gray-900 font-bold mb-4">
              What is Elpis Academy?{" "}
            </h1>
            <p className="text-md text-gray-600 pb-5 mx-auto">
              Elpis Academy is a faith-aligned trading school equipping kingdom
              builders to trade with strategy, confidence, and biblical wisdom.
              We merge technical mastery with spiritual clarity - because wealth
              without purpose is just noise.
            </p>
            <Link href="/waitlist" className="pt-5">
              <LargeBtn btnText={"Join Waitlist"} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CourPricing = () => {
  return (
    <div className="mt-2 md:mt-0">
      {CoursesII.map((course, index) => (
        <Card
          key={index}
          className={`hover:shadow-lg bg-white transition-shadow animate-slide-fade border-2 border-primary`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-24 h-24 md:w-24 md:h-24">
              <Image
                src={course.image} // Dynamic placeholder, replace with course-specific image
                alt={`${course.title} image`}
                //layout="fill"
                objectFit="cover"
                className="rounded-full shadow-md border-4 border-[--color-lightgold]"
              />
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div>
                <CardTitle className="text-xl text-gray-800 mb-2">
                  {course.title}
                </CardTitle>
                <span className="bg-eggplant text-white px-3 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </span>
              </div>
              <div className="text-2xl font-bold text-darkgold">
                {course.price}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 font-semibold text-sm mb-2">
              {course.SmallTitle}
            </p>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm pb-2 text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-sm pb-2 text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>{course.students} students has taken this course</span>
              </div>
              <div className="flex items-center text-sm pb-2 text-gray-500">
                <Star className="w-4 h-4 mr-2 fill-primary text-forex-gold" />
                <span>{course.rating} rating</span>
              </div>
            </div>
            <Link href="/pricing">
              <SlotBtn btnText="View Full Pricing" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
