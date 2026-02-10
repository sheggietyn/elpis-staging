export const DataArrayData = [
  {
    RankName: "🥇 Zamar Affiliate",
    Req: "3 Active Refferal",
    RequiredTarget: 3,
    MonthlyPay: "$125",
    GraceFall: "$12 per signup(1-2)",
    StartBonus: "$15 per $150+ signup",
    color: "gold",
    FallBackPay: 12,
    MonthPayPrice: 125,
    DeepDownlinePay: 0,
    id: 1,
  },
  {
    RankName: "🥈 Gibbor Ruby",
    Req: "10 Active Refferal",
    RequiredTarget: 10,
    MonthlyPay: "$400",
    GraceFall: "$15 per signup(4-9)",
    StartBonus: "$20 per $150+ signup",
    color: "bronze",
    FallBackPay: 15,
    MonthPayPrice: 400,
    DeepDownlinePay: 5,
    id: 2,
  },

  {
    RankName: "🥉 Zion Director",
    Req: "30 Active Refferal",
    RequiredTarget: 30,
    MonthlyPay: "$1,250",
    GraceFall: "$20 per signup(11-29)",
    StartBonus: "$25 per $150+ signup",
    color: "violet",
    FallBackPay: 20,
    MonthPayPrice: 1250,
    DeepDownlinePay: 5,
    id: 3,
  },

  {
    RankName: "💎 Archo Diamond",
    Req: "60 Active Refferal",
    RequiredTarget: 60,
    MonthlyPay: "$3,000",
    GraceFall: "$20 per signup(31-79)",
    StartBonus: "$25 per $150+ signup",
    color: "blue",
    FallBackPay: 20,
    DeepDownlinePay: 10,
    MonthPayPrice: 3000,
    id: 4,
  },
  {
    RankName: "⭐ Elion Platinum",
    Req: "130 Active Refferal",
    RequiredTarget: 130,
    MonthlyPay: "$5,000",
    GraceFall: "$25 per signup(80-149)",
    StartBonus: "$25 per $150+ signup",
    color: "ruby",
    FallBackPay: 25,
    DeepDownlinePay: 10,
    MonthPayPrice: 5000,
    id: 5,
  },
  {
    RankName: "⭐ Kodesh Legend",
    Req: "200 Active Refferal",
    RequiredTarget: 200,
    MonthlyPay: "$10,000",
    GraceFall: "$25 per signup(150-199)",
    StartBonus: "$25 per $150+ signup",
    color: "mint",
    FallBackPay: 25,
    DeepDownlinePay: 10,
    MonthPayPrice: 10000,
    id: 6,
  },
];

export const ExportRankColor = (AffiliateRank) => {
  if (AffiliateRank === "Zamar Affiliate") {
    return "gold";
  } else if (AffiliateRank === "Gibbor Ruby") {
    return "bronze";
  } else if (AffiliateRank === "Zion Director") {
    return "violet";
  } else if (AffiliateRank === "Archo Diamond") {
    return "blue";
  } else if (AffiliateRank === "Elion Platinum") {
    return "ruby";
  } else if (AffiliateRank === "Kodesh Legend") {
    return "mint";
  } else {
    return "brown";
  }
};

export const ExportRank = (AffiliateRank) => {
  if (AffiliateRank === "Zamar Affiliate") {
    return "🥇 Zamar Affiliate";
  } else if (AffiliateRank === "Gibbor Ruby") {
    return "🥈 Gibbor Ruby";
  } else if (AffiliateRank === "Zion Director") {
    return "🥉 Zion Director";
  } else if (AffiliateRank === "Archo Diamond") {
    return "💎 Archo Diamond";
  } else if (AffiliateRank === "Elion Platinum") {
    return "⭐ Elion Platinum";
  } else if (AffiliateRank === "Kodesh Legend") {
    return "🛡️ Kodesh Legend";
  } else if (AffiliateRank === "Starter" || AffiliateRank === "") {
    return "🚀 Starter";
  } else {
    return "No Rank";
  }
};

export const ExportRankLevelIIII = (AffiliateRank) => {
  if (AffiliateRank === "Zamar Affiliate") {
    return "3 Active Refferal";
  } else if (AffiliateRank === "Gibbor Ruby") {
    return "10 Active Refferal";
  } else if (AffiliateRank === "Zion Director") {
    return "30 Active Refferal";
  } else if (AffiliateRank === "Archo Diamond") {
    return "60 Active Refferal";
  } else if (AffiliateRank === "Elion Platinum") {
    return "130 Active Refferal";
  } else if (AffiliateRank === "Kodesh Legend") {
    return "200 Active Refferal";
  } else if (AffiliateRank === "Starter" || AffiliateRank === "") {
    return "3 Active Refferal";
  } else {
    return "No Rank";
  }
};

export const ExportRankLevel = (AffiliateRank) => {
  if (AffiliateRank === "Zamar Affiliate") {
    return "10 Active Refferal";
  } else if (AffiliateRank === "Gibbor Ruby") {
    return "30 Active Refferal";
  } else if (AffiliateRank === "Zion Director") {
    return "60 Active Refferal";
  } else if (AffiliateRank === "Archo Diamond") {
    return "130 Active Refferal";
  } else if (AffiliateRank === "Elion Platinum") {
    return "200 Active Refferal";
  } else if (AffiliateRank === "Kodesh Legend") {
    return "200 Active Refferal";
  } else if (AffiliateRank === "Starter" || AffiliateRank === "") {
    return "3 Active Refferal";
  } else {
    return "No Rank";
  }
};
