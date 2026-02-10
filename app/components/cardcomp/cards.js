import { features, howItWorksData, tagItems } from "@/app/data/ArrayData";
import { Sparkles } from "lucide-react";

export const Card = ({ className = "", ...rest }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...rest}
    />
  );
};

export const CardComp = () => {
  return (
    <section className="pb-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <CenteredTag TextSpark={"Why Elpis"} />
          <h2 className="text-2xl md:text-4xl font-bold font-playfair font-cinzel text-gray-900 mb-4">
            Why Choose Elpis Academy?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach combines expert knowledge, practical
            experience, and ongoing support to ensure your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const StatCard = () => {
  return (
    <div className="grid grid-cols-3 gap-8 pt-8 shadow-lg bg-white my-3 py-5 px-2 rounded-md">
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-cinzel font-black text-primary">
          1000+
        </div>
        <div className="text-sm font-medium text-gray-600">Students Taught</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-cinzel font-black text-primary">
          99%
        </div>
        <div className="text-sm text-gray-600">Success Rate</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-cinzel font-black text-primary">
          24/7
        </div>
        <div className="text-sm text-gray-600">Support</div>
      </div>
    </div>
  );
};

export const TagBoxes = () => {
  return (
    <div className="px-4 py-8 bg-white">
      <div className="flex flex-wrap gap-4 justify-center">
        {tagItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 ${item.color} rounded-full shadow-sm text-sm font-medium`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CenteredTag = ({ TextSpark, Icon }) => {
  return (
    <div className="w-full flex justify-center py-12">
      <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-gray-700 font-semibold text-sm">
        <Sparkles className="w-5 h-5 mr-2 text-gray-800" />
        {TextSpark}
      </div>
    </div>
  );
};

export const CenteredTagII = ({ TextSpark, Icon }) => {
  return (
    <div className="w-full py-12">
      <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-gray-700 font-semibold text-sm">
        <Sparkles className="w-5 h-5 mr-2 text-gray-800" />
        {TextSpark}
      </div>
    </div>
  );
};

export const HowItWorksCards = () => {
  return (
    <div>
      <CenteredTag TextSpark={"Operation Mode"} />
      <div className="text-center pb-5">
        <h2 className="text-2xl md:text-4xl font-bold font-cinzel text-gray-900 mb-4">
          How Elpis works?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our comprehensive approach combines expert knowledge, practical
          experience, and ongoing support to ensure your success.
        </p>
      </div>
      <div className="relative px-4 py-16 bg-white">
        {/* Horizontal Connector Line for md+ */}
        <div className="hidden md:block absolute left-0 right-0 top-[130px] h-[2px] bg-yellow-500 z-0" />

        {/* Vertical Line for mobile */}
        <div className="md:hidden absolute left-[32px] top-[140px] bottom-8 w-[2px] bg-yellow-500 z-0" />

        <div className="flex flex-col md:flex-row md:justify-center md:gap-8 gap-12 relative z-10">
          {howItWorksData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative flex items-start border border-gray-300 rounded-xl p-4 w-full md:w-[30%] bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Connector Dot (visible only on mobile) */}
                <div className="absolute w-4 h-4 bg-yellow-500 rounded-full z-20 top-6 left-[-12px] md:hidden" />

                {/* Icon */}
                <div className="flex-shrink-0 relative z-20">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full border-2 border-white shadow-md">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>

                {/* Text */}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
