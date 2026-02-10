"use client";
import { testimonials } from "@/app/data/ArrayData";
import { Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const WildGradientSignup = ({ FormBox }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!el) return;
      scrollAmount += 1;
      if (scrollAmount >= el.scrollWidth / 2) {
        scrollAmount = 0;
      }
      el.scrollLeft = scrollAmount;
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-safe-gradient">
      <div className="flex flex-col md:flex-row w-full max-w-5xl">
        {/* Form Section */}
        <div className="w-full md:w-1/2 md:p-6 p-3 md:bg-white md:rounded-l-lg md:shadow-lg">
          {FormBox}
        </div>
        {/* Promotional Section (Hidden on Mobile) */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br bg-[#FEF9E1] p-5 text-white animate-bg-slide bg-[length:200%_200%] rounded-r-lg shadow-lg">
          {/* Title + Subtext */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold text-[#D4AF3F] tracking-wide drop-shadow-md">
              Be The Next Success Story
            </h3>
            <p className="mt-2 text-sm text-gray-700 max-w-sm mx-auto">
              Success stories from traders who joined{" "}
              <span className="font-semibold">Elpis Trading Academy</span> and
              transformed their trading journey.
            </p>
          </div>

          {/* Testimonials Scroller */}
          <div className="w-full overflow-hidden py-6 mt-20">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="min-w-[370px] max-w-[370px] bg-white shadow-lg p-6 rounded-2xl border border-yellow-100"
                >
                  <div className="mb-3 flex gap-1 text-yellow-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 italic break-words">
                    “{t.comment}”
                  </p>
                  <div className="mt-3">
                    <h4 className="text-md font-semibold text-gray-800">
                      {t.name}
                    </h4>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
