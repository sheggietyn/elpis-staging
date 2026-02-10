import { CheckCircle } from "lucide-react";

export const AffiliateBenefits = () => {
  const sections = [
    {
      title: "Earn Commissions + Bonuses",
      items: [
        "Earn up to $30 per signup with fast-start + monthly rewards",
        "Commission tiers grow as your impact grows",
      ],
    },
  ];

  return (
    <div className="space-y-10 mb-5">
      {sections.map((section, index) => (
        <div key={index}>
          <h3 className="text-sm md:text-md font-semibold text-gray-800 mb-3">
            {section.title}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
