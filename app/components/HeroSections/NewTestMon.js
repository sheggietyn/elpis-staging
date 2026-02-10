"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/app/data/ArrayData";
import { UpskillBanner } from "./HeroFollow";
import One from "@/app/assets/images/one.jpg";
import Two from "@/app/assets/images/two.jpg";
import Three from "@/app/assets/images/three.jpg";
import Four from "@/app/assets/images/four.jpg";
import Five from "@/app/assets/images/five.jpg";
import Six from "@/app/assets/images/six.jpg";
import Seven from "@/app/assets/images/seven.jpg";
import Eight from "@/app/assets/images/eight.jpg";
import Nine from "@/app/assets/images/nine.jpg";
import Ten from "@/app/assets/images/ten.jpg";
import { CenteredTag } from "../cardcomp/cards";

const whatsappTestimonials = [
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
];

export const TestimonialPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* Header */}
      <section className="py-24 px-6 text-center bg-safe-gradient">
        <CenteredTag TextSpark={"Testimonies From Around the World"} />

        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Students Are Saying
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Elpis Academy has impacted lives through purpose-driven trading,
          mentorship, and automation tools.
        </p>
      </section>

      {/* TEXT TESTIMONIALS */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-6 rounded-2xl border border-yellow-100"
            >
              <div className="mb-3 flex gap-1 text-yellow-400">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">“{t.comment}”</p>
              <div className="mt-3">
                <h4 className="text-md font-semibold text-gray-800">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP TESTIMONIALS */}
      <section className="py-10 px-6 bg-white">
        <CenteredTag TextSpark={"Whatsapp Academy Testimonies"} />
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">
            WhatsApp Testimonials
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Real screenshots from real students sharing their experiences and
            breakthroughs.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 px-2 scrollbar-hide">
          {whatsappTestimonials.map((img, i) => (
            <div
              key={i}
              className="relative min-w-[280px] h-[420px] rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={img}
                alt={`WhatsApp Testimonial ${i + 1}`}
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="mt-16">
          <UpskillBanner />
        </div>
      </section>
    </main>
  );
};
