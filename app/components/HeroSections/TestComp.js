"use client";
import Head from "next/head";
import Image from "next/image";
import { UpskillBanner } from "./HeroFollow";

const testimonials = [
  {
    name: "John Doe",
    role: "Beginner Trader",
    text: "I’m really happy I said yes to your coaching — I’m making thousands of dollars in trading now. I started with just $200 and grew it to $500 in one morning with zero losses. This month alone, I’ve made over $3,000 and I didn’t even post half my results. I’m making money consistently all thanks to your mentorship.",
    image: "/images/testimonial1.jpg",
  },
  {
    name: "Sarah Smith",
    role: "Intermediate Trader",
    text: "The instructors at Elpis are top-notch. Their strategies helped me refine my skills and avoid common pitfalls. I highly recommend their program to anyone serious about forex.",
    image: "/images/testimonial2.jpg",
  },
  {
    name: "Michael Chen",
    role: "Advanced Trader",
    text: "Elpis provided me with advanced techniques that took my trading to the next level. The community support and resources are unmatched. Worth every penny!",
    image: "/images/testimonial3.jpg",
  },
];

export default function TestHolder() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Testimonials - Elpis Forex Academy</title>
        <meta
          name="description"
          content="Testimonials from Elpis Forex Academy students"
        />
      </Head>
      <div className="pt-20">
        <UpskillBanner
          TestTitle={
            "Elpis Academy is Trusted by over 1000+ student worldwide  "
          }
        />
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row w-full"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} testimonial`}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
              {/* Text Content */}
              <div className="p-6 md:-ml-8 md:bg-white md:rounded-l-lg md:shadow-inner flex-1">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
