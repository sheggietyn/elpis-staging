import Image from "next/image";
import Link from "next/link";
import Prayy from "@/app/assets/images/prayy.jpg";

export default HeroBlend = () => {
  return (
    <section className="bg-[--color-background] py-12">
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
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-lightgold] mb-4">
              Master Forex Trading with Elpis
            </h1>
            <p className="text-lg text-[--color-cream] mb-6 leading-relaxed">
              Unlock your trading potential with our expert-led courses and
              proven strategies. Join a community of successful traders today.
            </p>
            <Link href="/courses">
              <button className="bg-[--color-primary] text-[--color-darkfont] font-semibold py-3 px-6 rounded-lg hover:bg-[--color-touchsec] transition-colors duration-300 shadow-md">
                Start Learning Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
