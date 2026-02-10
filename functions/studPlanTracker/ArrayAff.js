const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();

const DataArrayData = [
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
    //DeepDownlinePay: 5,
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
const FillAddmin = async (DataToUpdate) => {
  const AdminUrl = db.ref("Admin Stock/weyerrhdgrvrg2134hffgffgryrge");
  await AdminUrl.update(DataToUpdate);
};

module.exports = { DataArrayData, FillAddmin };
