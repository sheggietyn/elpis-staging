// app/page.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Star, Zap, Smile, ShieldCheck } from "lucide-react";

export const HomePageComp = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-eggplant mb-4">
            Empower Your Financial Future with Elpis Academy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn AI-powered trading with mentorship, tools & automation — all
            from a faith-driven perspective.
          </p>
          <Link
            href="/waitlist"
            className="bg-eggplant text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-eggplant-dark transition"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* HOW ELPIS WORKS */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10 text-eggplant">
          How Elpis Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {[
            {
              title: "1. Enroll & Access",
              desc: "Sign up and unlock beginner-friendly trading lessons and automation tools instantly.",
              icon: <Zap className="text-yellow-500 w-7 h-7" />,
            },
            {
              title: "2. Join Mentorship",
              desc: "Get weekly check-ins, mentorship sessions, and support via WhatsApp and our dashboard.",
              icon: <Smile className="text-green-500 w-7 h-7" />,
            },
            {
              title: "3. Start Earning",
              desc: "Apply what you learn, automate trades, and even earn through referrals and bonuses.",
              icon: <Star className="text-pink-500 w-7 h-7" />,
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE ELPIS */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h2 className="text-3xl font-bold text-eggplant mb-10">
          Why People Choose Elpis
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
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
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-eggplant mb-4">
              Success Stories
            </h2>
            <p className="text-gray-700 mb-6">
              Hear from real students who turned knowledge into income. Our
              mentorship and platform have helped hundreds achieve
              breakthroughs.
            </p>
            <Link
              href="/testimonials"
              className="inline-block mt-2 text-eggplant font-medium hover:underline"
            >
              Read Testimonials →
            </Link>
          </div>
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/success-student.jpg" // Replace with your image
              alt="Success Story"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* SINGLE PRICING TEASER */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-eggplant mb-4">
          Simple Pricing
        </h2>
        <p className="text-gray-600 mb-8">
          Lifetime access. No hidden fees. Get started today.
        </p>

        <div className="bg-white shadow-md inline-block p-6 rounded-xl border border-yellow-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            $99 One-Time Payment
          </h3>
          <ul className="text-gray-700 space-y-2 text-left max-w-sm mx-auto mb-4">
            {[
              "All courses & mentorship",
              "Lifetime dashboard access",
              "Affiliate system activated",
              "AI tools & automation scripts",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-center">
                <CheckCircle className="text-green-500 w-4 h-4" /> {item}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className="bg-eggplant text-white px-6 py-3 rounded font-medium hover:bg-eggplant-dark transition"
          >
            See Full Pricing →
          </Link>
        </div>
      </section>

      {/* WHATSAPP SCREENSHOTS */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-eggplant mb-10">
          What Students Are Saying on WhatsApp
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["ss1.png", "ss2.png", "ss3.png"].map((img, i) => (
            <div
              key={i}
              className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-md"
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
      </section>
    </main>
  );
};
