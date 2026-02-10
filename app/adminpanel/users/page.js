"use client";
import { DB } from "@/app/Firebase/AuthHolder";
import { UserListInfo } from "@/app/components/AdminDash/AdminComp/DataCarrier";
import {
  GrayBtn,
  SlotBtn,
  TinyGrayBtn,
} from "@/app/components/Buttons/BtnLarge";
import { SwitchGenPost } from "@/app/components/HeroSections/BankList";
import { FormInput } from "@/app/components/Inputs/InputForm";
import { PopperModal } from "@/app/components/Modals/ModalComp";
import { HoldTableSub, LineBox } from "@/app/components/TableComp/CompTable";
import {
  TableFillII,
  TablePage,
  TablePageIII,
} from "@/app/components/TableComp/TableStructure/Tabula";
import { useUserDataCatch } from "@/app/connector/AdminData";
import { ConnectData } from "@/app/connector/CloggerFunc";
import {
  AddonDataType,
  AddonSignalSubList,
  AffData,
  GiveAffiliate,
  PlanTypeData,
  PositionData,
  StudentSubList,
  myPosition,
} from "@/app/data/BankListData";
import useLoader, {
  CountFormat,
  DateAdder,
  DateTimeTag,
  NGNFormat,
  NotPops,
  WhiteLoader,
  getRandom,
} from "@/app/util/ToastLoader";
import { AdminUrl, BadgeTag, NavProListTwo } from "@/app/util/UtilsJester";
import {
  equalTo,
  get,
  increment,
  orderByChild,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { Info, Key, Search, ShieldCheck, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import moment from "moment";
import { ChangeAffToNew, ExportCalator } from "@/app/util/ClubFunc";
import { v4 as uuidv4 } from "uuid";
import { Item } from "@radix-ui/react-accordion";

export default function page() {
  const [isDialogPay, setDialogPay] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [LoadingII, setLoadingII] = useState(false);
  const [wormData, setwormData] = useState("");
  const [myData, setmyData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQrr, setSearchQrr] = useState("");
  const [ChangeAff, setChangeAff] = useState("");
  const [ChangeStat, setChangeStat] = useState("");
  const [SwitchStat, setSwitchStat] = useState(1);
  const [ChangeNGN, setChangeNGN] = useState("NGN");
  const { isLoading, isDisabled, LoadFunc, StopLoad } = useLoader();
  const [PlanName, setPlanName] = useState("");
  const [AddOnName, setAddOnName] = useState("");
  const [AffName, setAffName] = useState("");
  const [PositionChooser, setPositionChooser] = useState("");
  const [active, setActive] = useState("");
  const amounts = [100, 150, 250];

  const [Amount, setAmount] = useState(0);
  const { LoaderUser, userData } = ConnectData();
  const router = useRouter();
  const DocId = uuidv4();
  const Date = moment().format("");

  const {
    AddData,
    Loader,
    loadMoreNext,
    loadMorePrev,
    hasMoreNext,
    hasMorePrev,
  } = useUserDataCatch("PlanStatus", ChangeStat);

  const Team_Dept = userData ? userData.Team_Dept || "N/A" : "N/A";
  const Team_Member = userData ? userData.Team_Member || false : false;

  const Dropper = (
    <div>
      <select
        value={ChangeStat}
        onChange={(e) => setChangeStat(e.target.value)}
        className="textInput"
        required
      >
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">InActive</option>
      </select>
    </div>
  );

  const DropperChanger = (
    <div className="mb-3">
      <select
        value={ChangeAff}
        onChange={(e) => setChangeAff(e.target.value)}
        className="textInput"
        required
      >
        <option value="">Choose Tag Type</option>
        <option value="New Affiliate">New Affiliate(This Assign Earn)</option>
        <option value="Switch Affiliate">
          Switch Affiliate(Just a Switch)
        </option>
      </select>
    </div>
  );

  const iconCo = <User className={"w-5 h-5 text-purple-700"} />;

  const PopDat = (item) => {
    setSwitchStat(1);
    setDialogPay(true);
    setwormData(item);
  };

  const PopLoading = (item) => {
    setDialogPay(false);
    setActive("");
    StopLoad();
    setmyData("");
    setChangeAff("");
    setSearchQrr("");
  };

  const PopAccess = (item) => {
    setSwitchStat(2);
    setDialogPay(true);
    setPlanName("");
    setAddOnName("");
    setwormData(item);
  };

  const PopUpper = (item) => {
    setSwitchStat(3);
    setDialogPay(true);
    setPositionChooser("");
    setwormData(item);
  };

  const PopAff = (item) => {
    setSwitchStat(4);
    setDialogPay(true);
    setmyData("");
    setSearchQuery("");
    setwormData(item);
  };

  const handlePlanChange = (e, array) => {
    const selectedName = e.target.value;
    const plan = array.find((b) => b.name === selectedName);

    if (plan) {
      setPlanName(plan.name);
    } else {
      setPlanName("");
    }
  };

  const handleAddOnChange = (e, array) => {
    const selectedName = e.target.value;
    const plan = array.find((b) => b.name === selectedName);

    if (plan) {
      setAddOnName(plan.name);
    } else {
      setAddOnName("");
    }
  };

  const handleAffChange = (e, array) => {
    const selectedName = e.target.value;
    const plan = array.find((b) => b.name === selectedName);

    if (plan) {
      setAffName(plan.name);
    } else {
      setAffName("");
    }
  };

  const handlePostChange = (e, array) => {
    const selectedName = e.target.value;
    const plan = array.find((b) => b.name === selectedName);

    if (plan) {
      setPositionChooser(plan.name);
    } else {
      setPositionChooser("");
    }
  };

  const ExistFunc = () => {
    setDialogPay(false);
    StopLoad();
  };

  const CreatePosition = () => {
    const UrlSaver = `users/${wormData.id}`;
    const PotData = `Team Member/${wormData.id}`;
    const UserDataUpdate = {
      Team_Member: true,
      Team_Dept: PositionChooser,
    };
    const LoremTeam = {
      userId: wormData.id,
      Firstname: wormData.Firstname,
      Lastname: wormData.Lastname,
      Username: wormData.Username,
      PhoneNos: wormData.PhoneNos,
      Email: wormData.Email,
      ProfilePix: null,
      AccountId: wormData.AccountId,
      Team_Member: true,
      Team_Dept: PositionChooser,
      PassCode: getRandom(4),
      createdAt: moment().format(""),
    };
    if (PositionChooser === "") {
      NotPops("error", "You Need to Choose a Position");
    } else {
      LoadFunc();
      update(ref(DB, UrlSaver), UserDataUpdate).then(() => {
        set(ref(DB, PotData), LoremTeam);
        NotPops(
          "success",
          `${wormData.Firstname} Has Been Upgraded to team member as a ${PositionChooser}`
        );
        ExistFunc();
      });
    }
  };

  const Updater = () => {
    LoadFunc();

    const UrlSaver = `users/${wormData.id}`;

    // Handle PlanName update
    if (PlanName !== "") {
      const { planType, SignalType, ExpDate, PriceAdmin } =
        StudentSubList(PlanName);
      const Subber = {
        PlanStatus: true,
        PlanType: planType,
        PlanExpiryDate: ExpDate.toString(),
        SignalStatus: true,
        SignalPlan: SignalType,
        SignalSubExpDate: ExpDate.toString(),
        FirstTimeBuyer: false,
        Total_Subscription: increment(parseInt(PriceAdmin)),
        Total_Subscription_Count: increment(parseInt(1)),
      };

      const SubberEmpty = {
        PlanStatus: false,
        PlanType: "",
        PlanExpiryDate: "",
        SignalStatus: false,
        SignalPlan: "",
        SignalSubExpDate: "",
        FirstTimeBuyer: false,
      };

      const ValAdmin = {
        TotalSalesAmount: increment(parseInt(PriceAdmin)),
        TotalActiveStudent: increment(parseInt(1)),
      };

      if (["Elpis Plan", "Kodesh Elite", "Dunamis Rahab"].includes(PlanName)) {
        update(ref(DB, UrlSaver), Subber)
          .then(() => {
            update(ref(DB, AdminUrl), ValAdmin);
            NotPops(
              "success",
              `Plan Access of ${PlanName} Granted to ${wormData.Firstname}`
            );
            ExistFunc();
          })
          .catch((error) => {
            NotPops("error", `Failed to update ${PlanName}: ${error.message}`);
          });
      } else {
        if (["Remove Student Plan"].includes(PlanName)) {
          update(ref(DB, UrlSaver), SubberEmpty).then(() => {
            NotPops(
              "success",
              `Plan Access of ${PlanName} Removed from ${wormData.Firstname} Account`
            );
            ExistFunc();
          });
        } else {
          NotPops("error", `Invalid PlanName: ${PlanName}`);
        }
      }
    }

    // Handle AddOnName update
    if (AddOnName !== "") {
      const { SubType, ExpDateII, Amount } = AddonSignalSubList(AddOnName);
      const AddOnPasser = {
        AddOnSignalStatus: true,
        AddOnSignalPlan: SubType,
        AddOnSignalSubExpDate: ExpDateII.toString(),
        Total_Addon_Purchase: increment(parseInt(Amount)),
        Total_Addon_Count: increment(parseInt(1)),
      };

      const RemovePass = {
        AddOnSignalStatus: false,
        AddOnSignalPlan: "",
        AddOnSignalSubExpDate: "",
      };

      const FlyAddOnAdmin = {
        TotalSignalAddonSales: increment(parseInt(Amount)),
        TotalSignalAddon: increment(parseInt(1)),
      };

      if (["Kodesh Elite", "Dunamis Rahab"].includes(AddOnName)) {
        update(ref(DB, UrlSaver), AddOnPasser)
          .then(() => {
            update(ref(DB, AdminUrl), FlyAddOnAdmin);
            NotPops(
              "success",
              `Signal Add On Access of ${AddOnName} Granted to ${wormData.Firstname}`
            );
            ExistFunc();
          })
          .catch((error) => {
            NotPops("error", `Failed to update ${AddOnName}: ${error.message}`);
          });
      } else {
        if (["Remove Signal AddOn"].includes(AddOnName)) {
          update(ref(DB, UrlSaver), RemovePass).then(() => {
            NotPops(
              "success",
              `Signal Add On Access of ${AddOnName} Removed From ${wormData.Firstname} Account`
            );
            ExistFunc();
          });
        } else {
          NotPops("error", `Invalid AddOnName: ${AddOnName}`);
        }
      }
    }

    // Handle Affiliate Update
    if (AffName !== "") {
      const {
        AffiliateStatus,
        AffiliateRank,
        AffiliatePlan,
        AffiliateRegDate,
        AffiliateFirstPayDate,
        createdAtDate,
        Affiliate_Sub,
      } = GiveAffiliate(AffName);

      const Data = {
        AffiliateStatus: AffiliateStatus,
        AffiliateRank: AffiliateRank,
        AffiliatePlan: AffiliatePlan,
        AffiliateRegDate: AffiliateRegDate,
        //AffiliateFirstPayDate: AffiliateFirstPayDate,
        createdAtDate: createdAtDate,
        Affiliate_Sub: parseInt(Affiliate_Sub),
      };

      const DataRemove = {
        AffiliateStatus: AffiliateStatus,
        AffiliateRank: AffiliateRank,
        AffiliatePlan: AffiliatePlan,
        AffiliateRegDate: AffiliateRegDate,
        //AffiliateFirstPayDate: AffiliateFirstPayDate,
        createdAtDate: createdAtDate,
        Affiliate_Sub: parseInt(Affiliate_Sub),
      };

      const NewAdmin = {
        TotalAffiliateSales: increment(parseInt(Affiliate_Sub)),
        TotalAffiliates: increment(parseInt(1)),
      };

      if (["Affiliate Access"].includes(AffName)) {
        update(ref(DB, UrlSaver), Data)
          .then(() => {
            update(ref(DB, AdminUrl), NewAdmin);
            NotPops("success", `${AffName} Granted to ${wormData.Firstname}`);
            ExistFunc();
          })
          .catch((error) => {
            NotPops("error", `Failed to update ${AffName}: ${error.message}`);
          });
      } else {
        if (["Remove Affiliate Access"].includes(AffName)) {
          update(ref(DB, UrlSaver), DataRemove).then(() => {
            NotPops(
              "success",
              `You Have ${AddOnName} from ${wormData.Firstname} Account`
            );
            ExistFunc();
          });
        } else {
          NotPops("error", `Invalid AffName: ${AffName}`);
        }
      }
    }
  };

  const Suspender = () => {
    LoadFunc();

    const UrlSaver = `users/${wormData.id}`;
    if (wormData.Suspend_User) {
      update(ref(DB, UrlSaver), { Suspend_User: false }).then(() => {
        NotPops(
          "success",
          `You have successfully unsuspended ${wormData.Firstname} account`
        );
        ExistFunc();
      });
    } else {
      update(ref(DB, UrlSaver), { Suspend_User: true }).then(() => {
        NotPops(
          "success",
          `You have successfully suspended ${wormData.Firstname} account`
        );
        ExistFunc();
      });
    }
  };

  const Floww = () => {
    if (myData === "") {
      NotPops("error", `You Need to choose a User You want to tag as downline`);
    } else if (active === "") {
      NotPops("error", `You need to select a plan they bought`);
    } else if (myData.id === wormData.id) {
      NotPops("error", `You can assign yourself as an affiliate`);
    } else if (ChangeAff === "") {
      NotPops("error", `You Need to choose a tag type`);
    } else {
      if (ChangeAff === "New Affiliate") {
        if (myData.Refferral_Id !== "") {
          NotPops(
            "error",
            `This user cannot be added as a new affiliate, because they already have one. they can only be a switch affiliate`
          );
        } else {
          LoadFunc();
          ExportCalator(
            wormData,
            myData,
            active,
            wormData.id,
            DocId,
            Date,
            PopLoading,
            StopLoad,
            myData.CreatedDate
          );
        }
      } else {
        LoadFunc();
        ChangeAffToNew(
          wormData,
          myData,
          active,
          wormData.id,
          DocId,
          Date,
          PopLoading,
          StopLoad
        );
      }
    }
  };

  {
    /* if (myData.Refferral_Id === "") {
    LoadFunc();
    ExportCalator(
      wormData,
      myData,
      active,
      wormData.id,
      DocId,
      Date,
      PopLoading,
      StopLoad
    );
  } else {
    LoadFunc();
    ChangeAffToNew(
      wormData,
      myData,
      active,
      wormData.id,
      DocId,
      Date,
      PopLoading,
      StopLoad
    );
    */
  }

  const TableHolder = (
    <TableFillII
      TitleOne={"Full Name"}
      TitleToo={"Username"}
      TitleTri={"Student Sub"}
      TitleStat={"Affiliate Sub"}
      TitleFiv={"Email"}
      TitleSix={"View Info"}
      LoadTagger={Loader}
      LoadNos={6}
      ItemData={AddData.filter((item) =>
        item.Email.toLowerCase().includes(searchQuery.toLowerCase())
      )}
      onClick={() => ""}
      SubTitleOne={(item) => (
        <LineBox
          BoxColor={"bg-purple-100"}
          Iconner={iconCo}
          TextTitle={`${item.Firstname} ${item.Lastname}`}
        />
      )}
      SubTitleToo={(item) => (
        <HoldTableSub
          TabelSubText={`${item.Username} ${
            item.Team_Dept ? `(${item.Team_Dept})` : ""
          } `}
        />
      )}
      SubTitleTri={(item) => (
        <div className="mt-1">
          <BadgeTag
            BadgeTitle={item.PlanStatus ? "Active" : "InActive"}
            ColorTag={item.PlanStatus ? "green" : "red"}
          />
        </div>
      )}
      SubTitleFor={(item) => (
        <div className="mt-1">
          <BadgeTag
            BadgeTitle={item.AffiliateStatus ? "Active" : "InActive"}
            ColorTag={item.AffiliateStatus ? "green" : "red"}
          />
        </div>
      )}
      SubTitleFiv={(item) => <HoldTableSub TabelSubText={item.Email} />}
      SubTitleSix={(item) => (
        <div className="flex gap-2 items-center">
          {Team_Member &&
          (Team_Dept === myPosition.Ceo ||
            Team_Dept === myPosition.Support ||
            Team_Dept === myPosition.Tech) ? (
            <TinyGrayBtn
              btnText={<Info className="w-3 h-3" />}
              onClick={() => PopDat(item)}
              bgColor={"bg-blue-600"}
              content={"View User Info"}
            />
          ) : null}
          {Team_Member &&
          (Team_Dept === myPosition.Ceo || Team_Dept === myPosition.Tech) ? (
            <TinyGrayBtn
              btnText={<Key className="w-3 h-3" />}
              onClick={() => PopAccess(item)}
              bgColor={"bg-green-600"}
              content={"Add Subscription"}
            />
          ) : null}

          {Team_Member &&
          (Team_Dept === myPosition.Ceo || Team_Dept === myPosition.Tech) ? (
            <TinyGrayBtn
              btnText={<Users className="w-3 h-3" />}
              onClick={() => PopAff(item)}
              bgColor={"bg-pink-600"}
              content={"Add Affiliate"}
            />
          ) : null}

          {Team_Member &&
          (Team_Dept === myPosition.Ceo || Team_Dept === myPosition.Tech) ? (
            <TinyGrayBtn
              btnText={<ShieldCheck className="w-3 h-3" />}
              onClick={() => PopUpper(item)}
              bgColor={"bg-yellow-600"}
              content={"Upgrade User's Position"}
            />
          ) : null}
        </div>
      )}
      EmptyTitle={"No User Here"}
    />
  );

  const CraneOne = (
    <>
      <NavProListTwo
        Title={`${wormData.Firstname} ${wormData.Lastname}`}
        SmallTitle={<DateTimeTag TakeDate={wormData.CreatedDate} />}
      />
      <UserListInfo item={wormData} />

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={
            isLoading
              ? WhiteLoader
              : wormData.Suspend_User
              ? "UnSuspend User"
              : "Suspend User"
          }
          onClick={() => {
            //Complete();
            Suspender();
          }}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTwo = (
    <>
      <NavProListTwo
        Title={`Give Subscription Access`}
        SmallTitle={`Give ${wormData.Firstname} ${wormData.Lastname} Subscription Access`}
      />

      <div className="mb-4 mt-6">
        <SwitchGenPost
          AllOption={"No Access"}
          label={"Give Plan Access to Student"}
          ChangeStat={PlanName}
          StatusCallTru={PlanTypeData}
          onChange={(e) => handlePlanChange(e, PlanTypeData)}
        />
      </div>

      <div className="mb-4">
        <SwitchGenPost
          AllOption={"No Addon Access"}
          label={"Give Plan Access to Signal AddOn"}
          ChangeStat={AddOnName}
          StatusCallTru={AddonDataType}
          onChange={(e) => handleAddOnChange(e, AddonDataType)}
        />
      </div>

      <div className="mb-4">
        <SwitchGenPost
          AllOption={"No Affiliate Access"}
          label={"Give Affiliate Access"}
          ChangeStat={AffName}
          StatusCallTru={AffData}
          onChange={(e) => handleAffChange(e, AffData)}
        />
      </div>

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Give User Access"}
          onClick={() => Updater()}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const CraneTree = (
    <>
      <NavProListTwo
        Title={`Upgrade User Position`}
        SmallTitle={`Upgrade ${wormData.Firstname} ${wormData.Lastname} To a Position on your team`}
      />

      <div className="mb-4 mt-6">
        <SwitchGenPost
          AllOption={"Choose Position"}
          label={"Upgrade User Position"}
          ChangeStat={PositionChooser}
          StatusCallTru={PositionData}
          onChange={(e) => handlePostChange(e, PositionData)}
        />

        <div className="flex items-center justify-between mt-5 gap-x-5">
          <GrayBtn btnText={"Close"} onClick={() => setDialogPay(false)} />
          <SlotBtn
            btnText={isLoading ? WhiteLoader : "Upgrade User"}
            onClick={() => CreatePosition()}
            disabled={isLoading}
          />
        </div>
      </div>
    </>
  );

  const filteredII =
    searchQrr.trim() === ""
      ? []
      : AddData.filter((item) =>
          item.Email.toLowerCase().includes(searchQrr.toLowerCase())
        );

  const FlowCass = (
    <div className="flex gap-3">
      {amounts.map((amount) => (
        <button
          key={amount}
          onClick={() => {
            setActive(amount);
            console.log(amount); // output amount when clicked
          }}
          className={`px-4 py-2 text-sm rounded-lg border flex-1
        ${
          active === amount
            ? "border-primary text-primary bg-gray-200"
            : "border-gray-300"
        }`}
        >
          ${amount}
        </button>
      ))}
    </div>
  );

  const Plancco = (
    <div className="space-y-3">
      {filteredII.map((item, index) => (
        <div
          key={index}
          onClick={() => setmyData(item)}
          className={`cursor-pointer bg-gray-50 ${
            item.Username === myData.Username
              ? `border-[2px] border-primary`
              : null
          } rounded-xl p-4 border border-gray-300 hover:bg-gray-100`}
        >
          <p className="text-md font-semibold pb-[1px]">
            {item.Firstname} {item.Lastname}
          </p>
          <p className="text-sm text-gray-600 pb-[1px]">@{item.Username}</p>
          <p className="text-xs text-gray-500">{item.Email}</p>
          <p className="text-xs text-gray-500">
            Reffered By:
            {item.ReferUsername ? item.ReferUsername : "No Refferal"}
          </p>
        </div>
      ))}
    </div>
  );

  const CraneTreeD = (
    <>
      <NavProListTwo
        Title={`Assign An Affiliate`}
        SmallTitle={`Assign an affiliate to ${wormData.Firstname} ${wormData.Lastname}`}
      />
      <div className="my-5">
        <FormInput
          placeholder={"Search by Email"}
          label={"Search by Email"}
          type={"text"}
          IconLeft={<Search className="iconStyle" />}
          value={searchQrr}
          onChange={(e) => setSearchQrr(e.target.value)}
        />
      </div>

      <div className="my-5 w-full mx-auto">
        <p className="text-sm text-gray-600 pb-[1px]">Choose Tag Course Plan</p>
        {FlowCass}
      </div>
      {DropperChanger}
      {Plancco}

      <div className="flex items-center justify-between mt-5 gap-x-5">
        <GrayBtn btnText={"Close"} onClick={() => PopLoading()} />
        <SlotBtn
          btnText={isLoading ? WhiteLoader : "Tag As Downline"}
          onClick={() => Floww()}
          disabled={isLoading}
        />
      </div>
    </>
  );
  return (
    <div>
      <PopperModal
        Openner={isDialogPay}
        NavTitle={""}
        ContentPoper={
          SwitchStat === 1
            ? CraneOne
            : SwitchStat === 2
            ? CraneTwo
            : SwitchStat === 3
            ? CraneTree
            : SwitchStat === 4
            ? CraneTreeD
            : null
        }
        OpennerClose={() => setDialogPay(false)}
        Width={"370px"}
      />
      <div></div>
      <TablePageIII
        Title={"All User"}
        SmallText={"List of All Users"}
        TableShit={TableHolder}
        SwitchDrop={
          <div className="flex items-center justify-between space-x-10">
            {Dropper}
            <FormInput
              placeholder={"Search by Email"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
}
