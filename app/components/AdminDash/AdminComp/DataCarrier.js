"use client";
import {
  ExportRank,
  ExportRankColor,
  ExportRankLevel,
} from "@/app/data/dataTable";
import {
  CountFormat,
  DateTag,
  DateTimeTag,
  NGNFormat,
  USDFormat,
} from "@/app/util/ToastLoader";
import {
  BadgeCard,
  BadgeStatus,
  BadgeStatusTwo,
  BadgeTag,
  NavProList,
  TopBalance,
} from "@/app/util/UtilsJester";

export const TakerStatus = (item) => {
  const PlanStatus = item.PlanStatus
    ? { Title: "Active", Color: "green" }
    : { Title: "InActive", Color: "red" };
  const AffiliateStatus = item.AffiliateStatus
    ? { Title: "Active", Color: "green" }
    : { Title: "InActive", Color: "red" };
  const AddOnSignalStatus = item.AddOnSignalStatus
    ? { Title: "Active", Color: "green" }
    : { Title: "InActive", Color: "red" };

  const Suspended = !item.Suspend_User
    ? { Title: "Profile Active", Color: "green" }
    : { Title: "Suspended", Color: "red" };

  return { PlanStatus, AffiliateStatus, AddOnSignalStatus, Suspended };
};

export const UserListInfo = ({ item }) => {
  const { PlanStatus, AffiliateStatus, AddOnSignalStatus, Suspended } =
    TakerStatus(item);
  return (
    <>
      <div className="flex gap-4 my-4 justify-center items-center">
        <TopBalance
          small={"Total Count/Subscription"}
          amount={`${CountFormat(
            item.Total_Subscription_Count || 0
          )}/${USDFormat(item.Total_Subscription || 0)}`}
        />

        <TopBalance
          small={"Total Signal AddOn"}
          amount={`${CountFormat(item.Total_Addon_Count || 0)}/${USDFormat(
            item.Total_Addon_Purchase || 0
          )}`}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Student Subs"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={PlanStatus.Title}
              ColorTag={PlanStatus.Color}
            />
          }
        />
        <NavProList
          Title={"Affiliate Sub"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={AffiliateStatus.Title}
              ColorTag={AffiliateStatus.Color}
            />
          }
        />

        <NavProList
          Title={"Signal AddOn Sub"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={AddOnSignalStatus.Title}
              ColorTag={AddOnSignalStatus.Color}
            />
          }
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Affiliate Sub"}
          SmallTitle={USDFormat(item.Affiliate_Sub || 0)}
        />
        <NavProList
          Title={"Affiliate Balance"}
          SmallTitle={USDFormat(item.Aff_Available_Balance || 0)}
        />
        <NavProList
          Title={"Affiliate Cashout"}
          SmallTitle={USDFormat(item.Aff_Total_Withdrawal || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Total Affiliate Earn"}
          SmallTitle={USDFormat(item.Aff_Total_Earning || 0)}
        />
        <NavProList
          Title={"Total Reffered"}
          SmallTitle={CountFormat(item.AffiliateCountAll || 0)}
        />
        <NavProList
          Title={"Fast Start Bonuses"}
          SmallTitle={USDFormat(item.Fast_Start_Bonus || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Monthly Paid Affiliate "}
          SmallTitle={CountFormat(item.monthly_Affiliate_Count || 0)}
        />

        <NavProList
          Title={"Affiliate PayoutDate"}
          SmallTitle={DateTag(item.AffiliateFirstPayDate)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"FirstName"} SmallTitle={item.Firstname} />
        <NavProList Title={"LastName"} SmallTitle={item.Lastname} />
        <NavProList Title={"UserName"} SmallTitle={item.Username} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Who Refer Me"}
          SmallTitle={`${
            item.ReferUsername ? `@${item.ReferUsername}` : "N/A"
          }`}
        />

        <NavProList
          Title={"Plan Type"}
          SmallTitle={item.PlanStatus ? item.PlanType : "No Active Plan"}
        />

        <NavProList
          Title={"Addon Signal Type"}
          SmallTitle={
            item.AddOnSignalStatus ? item.AddOnSignalPlan : "No Addon Plan"
          }
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Email Address"} SmallTitle={item.Email} />
        <NavProList
          Title={"Account Status"}
          SmallTitle={
            <BadgeTag BadgeTitle={Suspended.Title} ColorTag={Suspended.Color} />
          }
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Country"} SmallTitle={item.Country} />
        <NavProList Title={"Phone Nos"} SmallTitle={item.PhoneNos} />
        <NavProList Title={"Account Id"} SmallTitle={item.AccountId} />
      </div>
    </>
  );
};

export const DisplayCourseList = ({ item }) => {
  return (
    <>
      <p className="text-gray-600 text-sm px-3 pt-4 whitespace-pre-line break-words">
        {item.CourseDesc}
      </p>
    </>
  );
};

export const ListInfo = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"File Link"} SmallTitle={item.ProductLink} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Resource Id"} SmallTitle={item.ProductId} />

        <NavProList Title={"Created By"} SmallTitle={item.CreatedBy} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Date Created"}
          SmallTitle={<DateTimeTag TakeDate={item.ListingDate} />}
        />
      </div>
    </>
  );
};

export const QouteInfo = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Qoute"} SmallTitle={item.Qoute} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Qoute Creator"} SmallTitle={item.CreatedBy} />

        <NavProList Title={"Qoute Id"} SmallTitle={item.QouteId} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Date Created"}
          SmallTitle={<DateTimeTag TakeDate={item.PostTime} />}
        />
      </div>
    </>
  );
};

export const VerseInfo = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList
          Title={"Bible Verse"}
          SmallTitle={
            <>
              {item.Qoute} <br />
              <i>{item.Verse}</i>
            </>
          }
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Qoute Creator"} SmallTitle={item.CreatedBy} />

        <NavProList Title={"Qoute Id"} SmallTitle={item.QouteId} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Date Created"}
          SmallTitle={<DateTimeTag TakeDate={item.PostTime} />}
        />
      </div>
    </>
  );
};

export const ListEvent = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Event Title"} SmallTitle={item.EvenTitle} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Event Date"}
          SmallTitle={<DateTimeTag TakeDate={item.SessionDate} />}
        />

        <NavProList Title={"Created By"} SmallTitle={item.Speaker} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Date Created"}
          SmallTitle={<DateTimeTag TakeDate={item.createdAt} />}
        />

        <NavProList Title={"Event Id"} SmallTitle={item.EventId} />
      </div>
    </>
  );
};

/*TransactionType: "Cash Out",
    Username: Username,
    FirstName: FirstName,
    LastName: LastName,
    Amount: Amount,
    AmountInNG: AmountInNG,
    Email: Email,
    Bank: BankAccName,
    PaymentType: BizName,
    AccNos: AccountNos,
    Payment_Date: Date,
    Status: StatusCall.Pending,
    CurrencyType: Currency,
    TxId: getRandom(12),
    DocId: DocID,
    AccName: AccountName,
    userId: userId,
Affiliate_Percentage: Payeer,*/

export const ListAffCashout = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Affiliate Username"} SmallTitle={item.Username} />

        <NavProList Title={"First Name"} SmallTitle={item.FirstName} />

        <NavProList Title={"Last Name"} SmallTitle={item.LastName} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Amount CashOut"}
          SmallTitle={USDFormat(item.Amount)}
        />

        <NavProList
          Title={"Amount In NGN"}
          SmallTitle={NGNFormat(item.AmountInNG)}
        />

        <NavProList
          Title={"Affiliate Percentage"}
          SmallTitle={USDFormat(item.Affiliate_Percentage)}
        />
      </div>
      <div className="layoutstyle">
        <NavProList
          Title={"Fast Track Bonus"}
          SmallTitle={USDFormat(item.Fast_Start_Bonus)}
        />

        <NavProList
          Title={"Override Earning"}
          SmallTitle={USDFormat(item.Override_Earning || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Bank Name"} SmallTitle={item.Bank} />

        <NavProList Title={"Acc Nos"} SmallTitle={item.AccNos} />

        <NavProList Title={"Acc Name"} SmallTitle={item.AccName} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Email Address"} SmallTitle={item.Email} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Currency Type"} SmallTitle={item.CurrencyType} />

        <NavProList Title={"Account Id"} SmallTitle={item.TxId} />

        <NavProList
          Title={"Tx Status"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={BadgeStatusTwo(item.Status)}
              ColorTag={BadgeStatus(item.Status)}
            />
          }
        />
      </div>
    </>
  );
};

export const ListAffAllII = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList
          Title={"New Refferal Username"}
          SmallTitle={item.Username}
        />

        <NavProList
          Title={"Reffered By"}
          SmallTitle={item.Refered_By_Me_Name}
        />

        <NavProList Title={"Reffered Type"} SmallTitle={item.Aff_Type} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Full Name"} SmallTitle={item.FullName} />

        <NavProList Title={"Phone No"} SmallTitle={item.PhoneNumber} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Email Address"} SmallTitle={item.Email} />

        <NavProList Title={"Account Id"} SmallTitle={item.AccId} />
      </div>
    </>
  );
};

export const ListAffAll = ({ item }) => {
  const AvailableBalance = item ? item.Aff_Available_Balance || 0 : 0; //Total_Withdrawable

  const Fast_Start_Bonus = item ? item.Fast_Start_Bonus || 0 : 0;
  const Override_Earning = item ? item.Override_Earning || 0 : 0;
  const Payeer = parseFloat(AvailableBalance) * 0.25;

  const PayLayer =
    parseFloat(Payeer) +
    parseInt(Fast_Start_Bonus) +
    parseInt(Override_Earning); // Override Bonus

  const PayBackendSplit =
    parseFloat(item.AffiliatePayOutDay) +
    parseInt(Fast_Start_Bonus) +
    parseInt(Override_Earning);

  const StarterPayer =
    parseFloat(AvailableBalance) +
    parseInt(Fast_Start_Bonus) +
    parseInt(Override_Earning); // Override Bonus

  const LastPayerr = item ? PayLayer : 0;

  const Payy = PayBackendSplit;

  return (
    <>
      <div className="layoutstyle">
        <NavProList
          Title={"Earning This Month"}
          SmallTitle={USDFormat(item.Earning_This_Month || 0)}
        />
        <NavProList
          Title={"Total Monthly Refferal"}
          SmallTitle={CountFormat(item.monthly_Affiliate_Count || 0)}
        />
        <NavProList
          Title={"Withdrawable Balance"}
          SmallTitle={USDFormat(Payy || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Total Earning"}
          SmallTitle={USDFormat(item.Aff_Total_Earning || 0)}
        />
        <NavProList
          Title={"Total Withdrawal"}
          SmallTitle={USDFormat(item.Aff_Total_Withdrawal || 0)}
        />
        <NavProList
          Title={"Available Balance"}
          SmallTitle={USDFormat(item.Aff_Available_Balance || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Fast Track Bonus"}
          SmallTitle={USDFormat(item.Fast_Start_Bonus || 0)}
        />
        <NavProList
          Title={"Override Bonus"}
          SmallTitle={USDFormat(item.Override_Earning || 0)}
        />
        <NavProList
          Title={"Total Reffered"}
          SmallTitle={CountFormat(item.AffiliateCountAll || 0)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Total Paid Referral"}
          SmallTitle={CountFormat(item.Aff_Total_Paid_Refferal || 0)}
        />
        <NavProList
          Title={"Total Pending Refferal"}
          SmallTitle={CountFormat(item.Aff_Total_Pending_Pay_Refferal || 0)}
        />

        <NavProList
          Title={"Current Affiliate Rank"}
          SmallTitle={
            <BadgeCard
              Title={ExportRank(item.AffiliateRank)}
              color={ExportRankColor(item.AffiliateRank)}
            />
          }
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Next Monthly Target"}
          SmallTitle={
            <BadgeCard
              Title={ExportRankLevel(item.AffiliateRank)}
              color="green"
            />
          }
        />
        <NavProList
          Title={"Next PayoutDate"}
          SmallTitle={DateTag(item.AffiliateFirstPayDate)}
        />

        <NavProList
          Title={"Rank Reset Date"}
          SmallTitle={DateTag(item.AffiliateRegDate)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Full Name"}
          SmallTitle={`${item.Firstname} ${item.Lastname}`}
        />
        <NavProList Title={"Email Address"} SmallTitle={item.Email} />
      </div>
    </>
  );
};

export const FlinTransfer = ({ item }) => {
  return (
    <>
      <div className="text-center py-5">
        <p className="text-sm text-gray-500">Amount To Pay Affiliate</p>
        <h2 className="text-md font-semibold text-gray-800">
          {item.CurrencyType === "NGN"
            ? NGNFormat(item.AmountInNG)
            : USDFormat(item.Amount)}
        </h2>
      </div>
      <div className="layoutstyle">
        <NavProList Title={"Bank Name"} SmallTitle={item.Bank} />

        <NavProList Title={"Account Nos"} SmallTitle={item.AccNos} />

        <NavProList Title={"Account Name"} SmallTitle={item.AccName} />
      </div>
    </>
  );
};

export const ListAffEarn = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Reffered By"} SmallTitle={item.Refferalby} />

        <NavProList
          Title={"Student Reffered"}
          SmallTitle={item.StudentUsername}
        />

        <NavProList
          Title={"Current Rank"}
          SmallTitle={
            <BadgeCard
              Title={ExportRank(item.RefferalRank)}
              color={ExportRankColor(item.RefferalRank)}
            />
          }
        />
      </div>
      <div className="layoutstyle">
        <NavProList
          Title={"Amount Received"}
          SmallTitle={USDFormat(item.AmountReceiving)}
        />

        <NavProList
          Title={"Fast Track Bonus"}
          SmallTitle={USDFormat(item.Fast_Start_Bonus)}
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Refree Email"} SmallTitle={item.AffEmail} />
      </div>
    </>
  );
};

export const ListBotUser = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Username"} SmallTitle={item.Username} />
        <NavProList Title={"First Name"} SmallTitle={item.Firstname} />
        <NavProList Title={"Last Name"} SmallTitle={item.Lastname} />
      </div>
      <div className="layoutstyle">
        <NavProList Title={"Plan Type"} SmallTitle={item.PlanType} />
        <NavProList
          Title={"Daily Token Balance"}
          SmallTitle={item.DailyTokenBalance}
        />
        <NavProList Title={"Phone Number"} SmallTitle={item.PhoneNos} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Email"} SmallTitle={item.Email} />
      </div>
    </>
  );
};

export const ListTxn = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Transaction Type"} SmallTitle={item.Plan} />

        <NavProList
          Title={"Amount Paid"}
          SmallTitle={
            item.Payment_Currency === "NGN"
              ? `${NGNFormat(item.Amount_Naira)}`
              : `${USDFormat(item.Amount_In)}`
          }
        />
        <NavProList
          Title={"Payment Currency"}
          SmallTitle={item.Payment_Currency}
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Payer FirstName"} SmallTitle={item.FirstName} />

        <NavProList Title={"Payer LastName"} SmallTitle={item.LastName} />

        <NavProList Title={"Payer PhoneNos"} SmallTitle={item.PhoneNos} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Payer Email"} SmallTitle={item.Email} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Payment Type"} SmallTitle={item.Payment_Type} />

        <NavProList Title={"Order Id"} SmallTitle={item.OrderId} />

        <NavProList
          Title={"Tx Status"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={BadgeStatusTwo(item.Payment_Status)}
              ColorTag={BadgeStatus(item.Payment_Status)}
            />
          }
        />
      </div>
    </>
  );
};

export const WaitListTxn = ({ item }) => {
  return (
    <>
      <div className="layoutstyle">
        <NavProList Title={"Transaction Type"} SmallTitle={item.Plan} />

        <NavProList
          Title={"Amount Paid"}
          SmallTitle={
            item.Amount_In_Naira > 300
              ? `${NGNFormat(item.Amount_In_Naira)}`
              : `${USDFormat(item.Amount_In_Naira)}`
          }
        />
        <NavProList
          Title={"Payment Currency"}
          SmallTitle={item.Amount_In_Naira > 300 ? "NGN" : "USD"}
        />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Payer FirstName"} SmallTitle={item.FirstName} />

        <NavProList Title={"Payer LastName"} SmallTitle={item.LastName} />

        <NavProList Title={"Payer PhoneNos"} SmallTitle={item.PhoneNos} />
      </div>

      <div className="layoutstyle">
        <NavProList Title={"Payer Email"} SmallTitle={item.Email} />
      </div>

      <div className="layoutstyle">
        <NavProList
          Title={"Payment Type"}
          SmallTitle={
            item.Amount_In_Naira > 300 ? "Paystack/Naira" : "NowPay/USD"
          }
        />

        <NavProList Title={"Order Id"} SmallTitle={item.OrderId} />

        <NavProList
          Title={"Tx Status"}
          SmallTitle={
            <BadgeTag
              BadgeTitle={BadgeStatusTwo(item.Payment_Status)}
              ColorTag={BadgeStatus(item.Payment_Status)}
            />
          }
        />
      </div>
    </>
  );
};

export const BoxHolder = ({ ContentProps }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-1/2 rounded-lg border-[1px] bg-white border-gray-200 px-4 mt-5 md:px-0">
        {ContentProps}
      </div>
    </div>
  );
};
