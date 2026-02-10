import { DateAdder } from "../util/ToastLoader";
import moment from "moment";

const Datte = moment().format("");

export const nigerianBanks = [
  { name: "Access Bank", code: "044" },
  { name: "Citibank Nigeria", code: "023" },
  { name: "Ecobank Nigeria", code: "050" },
  { name: "Fidelity Bank", code: "070" },
  { name: "First Bank of Nigeria", code: "011" },
  { name: "First City Monument Bank (FCMB)", code: "214" },
  { name: "Guaranty Trust Bank (GTB)", code: "058" },
  { name: "Heritage Bank", code: "030" },
  { name: "Keystone Bank", code: "082" },
  { name: "Kuda Bank", code: "090267" },
  { name: "Parallex Bank", code: "104" },
  { name: "Polaris Bank", code: "076" },
  { name: "Providus Bank", code: "101" },
  { name: "Stanbic IBTC Bank", code: "221" },
  { name: "Standard Chartered Bank", code: "068" },
  { name: "Sterling Bank", code: "232" },
  { name: "United Bank for Africa (UBA)", code: "033" },
  { name: "Union Bank of Nigeria", code: "032" },
  { name: "Unity Bank", code: "215" },
  { name: "Wema Bank", code: "035" },
  { name: "Zenith Bank", code: "057" },
  { name: "Access Yello (Beta-Access Yello)", code: "100052" },
  { name: "Cellulant", code: "100005" },
  { name: "Contec Global Infotech Limited (NowNow)", code: "100032" },
  { name: "EcoMobile", code: "100030" },
  { name: "Ecobank Xpress Account", code: "100008" },
  { name: "FBNMobile", code: "100014" },
  { name: "FCMB Easy Account", code: "100031" },
  { name: "Flutterwave Technology Solutions", code: "110002" },
  { name: "FortisMobile", code: "100016" },
  { name: "GoMoney", code: "100022" },
  { name: "HopePSB", code: "120002" },
  { name: "Innovectives Kesh", code: "100029" },
  { name: "Intellifin", code: "100027" },
  { name: "Mkudi", code: "100011" },
  { name: "MoMo PSB", code: "120003" },
  { name: "M36", code: "100035" },
  { name: "One Finance", code: "100026" },
  { name: "Opay Digital Services LTD", code: "100004" },
  { name: "Paga", code: "100002" },
  { name: "PalmPay Limited", code: "100033" },
  { name: "Parkway - ReadyCash", code: "311" },
  { name: "PayAttitude Online", code: "110001" },
  { name: "Paystack-Titan", code: "100039" },
  { name: "SmartCash PSB", code: "120004" },
  { name: "Stanbic IBTC @ease wallet", code: "100007" },
  { name: "TagPay", code: "100023" },
  { name: "TeasyMobile", code: "100010" },
  { name: "Titan-Paystack", code: "100039" },
  { name: "VTNetworks", code: "100012" },
  { name: "Zenith Eazy Wallet", code: "100034" },
  { name: "Zinternet Nigeria Limited", code: "100025" },
];

{
  /*
    id: 1,
    name: "USDT(Bep 20)",
    code: "usdt",
*/
}

export const USDTSender = [
  {
    id: 1,
    name: "USDT(Trc 20)",
    code: "usdttrc20",
  },
];

export const PlanTypeData = [
  {
    id: 1,
    name: "Elpis Plan",
    code: "Elpis",
  },
  {
    id: 2,
    name: "Kodesh Elite",
    code: "Kodesh",
  },
  {
    id: 3,
    name: "Dunamis Rahab",
    code: "Dunamis",
  },

  {
    id: 4,
    name: "Remove Student Plan",
    code: "Removal",
  },
];

export const AddonDataType = [
  {
    id: 1,
    name: "Kodesh Elite",
    code: "Kodesh",
  },
  {
    id: 2,
    name: "Dunamis Rahab",
    code: "Dunamis",
  },

  {
    id: 3,
    name: "Remove Signal AddOn",
    code: "Remove",
  },
];

export const AddRess = [
  {
    id: 1,
    name: "Student",
  },
  {
    id: 2,
    name: "Affiliate",
  },
];

export const StudentSubList = (PlanType) => {
  if (PlanType === "Elpis Plan") {
    return {
      planType: "Elpis Plan",
      SignalType: "Elpis",
      ExpDate: DateAdder(30).toString(),
      PriceAdmin: 100,
    };
  } else if (PlanType === "Kodesh Elite") {
    return {
      planType: "Kodesh Elite",
      SignalType: "Kodesh",
      ExpDate: DateAdder(42).toString(),
      PriceAdmin: 150,
    };
  } else if (PlanType === "Dunamis Rahab") {
    return {
      planType: "Dunamis Rahab",
      SignalType: "Dunamis",
      ExpDate: DateAdder(90).toString(),
      PriceAdmin: 250,
    };
  } else if (PlanType === "Remove Student Plan") {
    return {
      planType: "",
      SignalType: "",
      ExpDate: "",
      PriceAdmin: "",
    };
  }
};

export const AddonSignalSubList = (PlanType) => {
  if (PlanType === "Kodesh Elite") {
    return {
      SubType: "Kodesh",
      ExpDateII: DateAdder(30).toString(),
      Amount: 30,
    };
  } else if (PlanType === "Dunamis Rahab") {
    return {
      SubType: "Dunamis",
      ExpDateII: DateAdder(30).toString(),
      Amount: 30,
    };
  } else if (PlanType === "Remove Signal AddOn") {
    return {
      SubType: "",
      ExpDateII: "",
      Amount: "",
    };
  }
};

export const PositionData = [
  {
    id: 1,
    name: "CEO",
  },
  {
    id: 2,
    name: "Super Admin",
  },
  {
    id: 3,
    name: "Support Admin",
  },

  {
    id: 4,
    name: "Finance Officer",
  },
  {
    id: 5,
    name: "Educator Admin",
  },
  {
    id: 6,
    name: "Tech Support",
  },
  {
    id: 7,
    name: "Community Admin",
  },

  {
    id: 8,
    name: "Affiliate Admin",
  },
];

export const myPosition = {
  Ceo: "CEO",
  Super: "Super Admin",
  Support: "Support Admin",
  Finance: "Finance Officer",
  Educator: "Educator Admin",
  Tech: "Tech Support",
  Community: "Community Admin",
  Affiliate: "Affiliate Admin",
};

export const AffData = [
  {
    id: 1,
    name: "Affiliate Access",
  },
  {
    id: 2,
    name: "Remove Affiliate Access",
  },
];

export const GiveAffiliate = (PlanAff) => {
  if (PlanAff === "Affiliate Access") {
    return {
      AffiliateStatus: true,
      AffiliateRank: "Starter",
      AffiliatePlan: "Starter Affiliate",
      AffiliateRegDate: DateAdder(30).toString(),
      AffiliateFirstPayDate: DateAdder(37).toString(),
      createdAtDate: Datte,
      Affiliate_Sub: 25,
    };
  } else if (PlanAff === "Remove Affiliate Access") {
    return {
      AffiliateStatus: false,
      AffiliateRank: "",
      AffiliatePlan: "",
      AffiliateRegDate: "",
      AffiliateFirstPayDate: "",
      createdAtDate: "",
      Affiliate_Sub: 0,
    };
  }
};
