import { testimonials } from "@/app/data/ArrayData";
import { MessageCircle } from "lucide-react";

export const TestimonialBoxes = () => {
  return (
    <div className="w-full md:max-w-5xl md:mx-auto">
      {/* Mobile: Scrollable row */}
      <div className="flex gap-4 overflow-x-auto px-4 -mx-4 py-4 scrollbar-hide">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`min-w-[240px] max-w-[280px] flex-shrink-0 p-4 rounded-xl shadow-sm animate-slide-fade ${t.color}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{t.comment}</p>
                <p className="text-xs font-semibold text-gray-600 mt-2">
                  — {t.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: 2x2 grid */}
      <div className="hidden md:grid-cols-2 md:gap-4">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`w-full p-4 rounded-xl shadow-sm animate-slide-fade ${t.color}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{t.comment}</p>
                <p className="text-xs font-semibold text-gray-600 mt-2">
                  — {t.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
