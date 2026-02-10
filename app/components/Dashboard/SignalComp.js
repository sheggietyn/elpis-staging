import Image from "next/image";
import { Users, BarChart3, CheckCircle, Link2Icon } from "lucide-react";
import Elpis from "@/app/assets/images/Elpis.png";
import Kodesh from "@/app/assets/images/Kodesh.png";
import Dunamis from "@/app/assets/images/dunamis.png";
import Link from "next/link";
import { DateAdder } from "@/app/util/ToastLoader";

export const SignalRoomBoxes = ({ LinkBtn, userId }) => {
  const ActivateBot = `https://t.me/elpis_activator_bot?start=${userId}`;
  const signals = [
    {
      id: 1,
      title: "Elpis Signal Room",
      subtext:
        "Your live signal stream, powered by rule-based strategy + Scripture.",
      image: Elpis,
      SignalTitle: "Elpis",
      SignalPrice: 0,
      //link: "https://t.me/+k8inUpeQYZhlN2U0",
      link: ActivateBot,
      freeRoom: true,
    },
    {
      id: 2,
      title: "Kodesh Signal Room",
      subtext:
        "Deeper market insights, blending advanced analytics + timeless truth",
      SignalTitle: "Kodesh",
      SignalPrice: 30,
      image: Kodesh,
      link: ActivateBot,
      ExpDate: DateAdder(30).toString(),
    },
    {
      id: 3,
      title: "Dunamis Rahab Room",
      subtext:
        "Elite trade execution, guided by precision tools + divine wisdom.",
      image: Dunamis,
      SignalTitle: "Dunamis",
      SignalPrice: 50,
      link: ActivateBot,
      ExpDate: DateAdder(30).toString(),
    },
  ];
  return (
    <div className="py-4">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 scrollbar-hide px-1 md:px-0">
        {signals.map((item) => (
          <div
            key={item.id}
            className="min-w-[280px] md:min-w-0 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="w-full h-40 relative rounded-lg overflow-hidden mb-4">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title + Subtext */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{item.subtext}</p>
            </div>

            {/* Stats 
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#D4AF3F]" />
                {item.traders}
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                {item.signals}
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {item.success}
              </div>
            </div>
            */}

            {/* Button */}
            {LinkBtn ? LinkBtn(item) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
