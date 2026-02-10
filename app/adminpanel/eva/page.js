"use client";
import { ListBotUser } from "@/app/components/AdminDash/AdminComp/DataCarrier";
import { GrayBtn } from "@/app/components/Buttons/BtnLarge";
import {
  EvaBtn,
  PopUpChat,
  PopUpChatNew,
} from "@/app/components/Dashboard/Comps/EvaBtn";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { HoldTableSub } from "@/app/components/TableComp/CompTable";
import { TableFillII } from "@/app/components/TableComp/TableStructure/Tabula";
import {
  DisplayChatList,
  DisplayUserList,
  EvaChatList,
} from "@/app/connector/DataListDisplay";
import {
  CountFormat,
  DateTag,
  DateTimeTag,
  USDFormat,
} from "@/app/util/ToastLoader";
import { NavProListTwo } from "@/app/util/UtilsJester";
import { Tabs } from "@radix-ui/themes";
import { Info, MessageCircle, User } from "lucide-react";
import React, { useState } from "react";

export default function page() {
  const [isEvaOpen, setIsEvaOpen] = useState(false);
  const [LoadNow, setLoadNow] = useState(false);
  const { ChatData, LoadData } = EvaChatList();

  const [wormData, setwormData] = useState("");
  const userr = wormData.userId;
  const { ChatUserData, LoadNowData } = DisplayUserList();
  const { ChatDisData, LoadDisData } = DisplayChatList(userr);
  const [isDialogPay, setDialogPay] = useState(false);

  const CollectData = (item) => {
    setwormData(item);
    setIsEvaOpen(true);
    setLoadNow(true);
    setTimeout(() => {
      setLoadNow(false);
    }, 350);
  };

  const UserDataDis = (item) => {
    setwormData(item);
    setDialogPay(true);
  };
  const TableHolderTwo = (
    <TableFillII
      TitleOne={"Username"}
      TitleToo={"Question"}
      TitleTri={"Token Charge"}
      TitleStat={"Chat Date"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadData}
      ItemData={ChatData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => (
        <HoldTableSub
          TabelSubText={
            item.request.length < 35
              ? item.request
              : item.request.slice(0, 35) + "..."
          }
        />
      )}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={CountFormat(item.tokenCharge)} />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.dateAdded)} />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            title="View"
            onClick={() => CollectData(item)}
          >
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
      EmptyTitle={`No Bot Chat Yet!`}
    />
  );
  const TableOnee = (
    <TableFillII
      TitleOne={"Username"}
      TitleToo={"PlanType"}
      TitleTri={"Daily Token Balance"}
      TitleStat={"Usage Date"}
      TitleFiv={"View Info/Edit"}
      LoadTagger={LoadNowData}
      ItemData={ChatUserData}
      onClick={() => ""}
      SubTitleOne={(item) => <HoldTableSub TabelSubText={item.Username} />}
      SubTitleToo={(item) => <HoldTableSub TabelSubText={item.PlanType} />}
      SubTitleTri={(item) => (
        <HoldTableSub TabelSubText={CountFormat(item.DailyTokenBalance)} />
      )}
      SubTitleFor={(item) => (
        <HoldTableSub TabelSubText={DateTag(item.DateAdded)} />
      )}
      SubTitleFiv={(item) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            title="View"
            onClick={() => UserDataDis(item)}
          >
            <Info className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
      EmptyTitle={`No Bot User Yet!`}
    />
  );
  const LoremPop = (
    <PopUpChatNew
      opener={isEvaOpen}
      closeOpener={() => setIsEvaOpen(false)}
      AllChats={ChatDisData}
      Username={wormData.Username}
      loading={LoadDisData || LoadNow}
    />
  );
  const TabHolder = (
    <Tabs.Root defaultValue="User Chats">
      <Tabs.List size="3" color="amber">
        <Tabs.Trigger value="User Chats">Chats Request</Tabs.Trigger>
        <Tabs.Trigger value="Users List">EVA Users List</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="User Chats">
        <div className="h-[80vh] overflow-y-auto p-4 pt-2">
          {TableHolderTwo}
        </div>
      </Tabs.Content>
      <Tabs.Content value="Users List">
        <div className="h-[80vh] overflow-y-auto p-4 pt-2">{TableOnee}</div>
      </Tabs.Content>
      <Tabs.Content value="settings"></Tabs.Content>
    </Tabs.Root>
  );

  const CraneOne = (
    <>
      <div className="mb-2 text-center">
        <NavProListTwo
          Title={`Bot User Info`}
          SmallTitle={<DateTimeTag TakeDate={wormData.DateAdded} />}
        />
      </div>
      <ListBotUser item={wormData} />
      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
      </div>
    </>
  );

  return (
    <div>
      <PopperModal
        Openner={isDialogPay}
        ContentPoper={CraneOne}
        OpennerClose={() => setDialogPay(false)}
        Width={"340px"}
      />
      <div className="h-[90vh]">{TabHolder}</div>
      {LoremPop}
      {/*   {LoremPop<EvaBtn openChat={() => setIsEvaOpen(true)} />
       */}
    </div>
  );
}
