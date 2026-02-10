import Linked from "@/app/util/UtilsJester";
import { HelpCircle } from "lucide-react";
import { PoperOver } from "../Modals/ModalComp";
import { Flex } from "@radix-ui/themes";

export const TableBox = ({
  TopBarHold,
  Title,
  SmallText,
  linkText,
  link,
  onClick,
  openPop,
  setOpenPop,
  Content,
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm mb-5 md:mb-0 flex-1 overflow-hidden">
      {/* Header Section */}
      <div className="w-full bg-gray-50 py-3 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold mb-1 text-gray-600">
              {Title}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{SmallText}</p>
          </div>

          <div className="text-xs text-right inline-hold cursor-pointer">
            {link ? (
              <Linked
                Title={linkText}
                linkref={link}
                restyle={"text-gray-600 text-xs hover:text-primary-dark"}
              />
            ) : (
              <PoperOver
                btnOpen={
                  <button
                    onClick={onClick}
                    className={
                      "text-gray-700 text-sm font-medium flex items-center gap-1"
                    }
                  >
                    <HelpCircle className={"w-4 h-4"} /> {linkText}
                  </button>
                }
                openPop={openPop}
                setOpenPop={setOpenPop}
                Content={Content}
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="overflow-auto max-h-60 hide-scrollbar px-4 py-3">
        {TopBarHold}
      </div>
    </div>
  );
};

export const HoldTableSub = ({ TabelSubText }) => {
  return <p className="mt-1">{TabelSubText}</p>;
};

const ConIcon = ({ IconStead, BoxColor }) => {
  return (
    <div
      className={`${BoxColor} rounded-full p-2 w-7 h-7 flex items-center justify-center`}
    >
      {IconStead}
    </div>
  );
};

export const LineBox = ({ BoxColor, Iconner, TextTitle }) => {
  return (
    <Flex gap="2" align={"center"}>
      <ConIcon IconStead={Iconner} BoxColor={BoxColor} />
      {TextTitle}
    </Flex>
  );
};
