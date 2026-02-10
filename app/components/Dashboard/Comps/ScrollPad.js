"use client";
import { testimonials } from "@/app/data/ArrayData";
import { Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const ScrollPad = () => {
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
    <div className="w-full overflow-hidden py-6 mt-5 hidden md:block">
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
              <h4 className="text-md font-semibold text-gray-800">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
