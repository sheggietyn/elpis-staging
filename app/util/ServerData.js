const UserData = {
  // User Info
  Firstname: "",
  LastName: "",
  Email: "",
  PhoneNos: "",
  AccountId: "",
  Country: "",
  Address: "",
  userId: "",
  Username: "",
  CreatedDate: "",

  // Course Info & Subscription
  PlanStatus: "", // Show if user have an active plan
  PlanType: "", // Show the type of student plan someone is on
  PlanPayment: "",
  PlanSubDate: "",
  PlanPaymentType: "",

  // Signal Room Subscription
  SignalPlan: "",
  SignalStatus: "",
  SignalSubDate: "",
  SignalPayment: "",
  SignalPaymentType: "",

  //Affiliate Portal Info
  MyLink: "",
  IdOfWhoRefferedMe: "",
  userId_of_Refferal: "",

  // Affiliate Earning/Plan Data
  AffiliatePlan: "", // The Affiliate PricePlan
  Earning_Per_Affiliate_Level: "", // Targeted earning per level.. This Update Automatically with the New Level Tag
  Earning_This_Month: "", // Amount To Earn if you do or do not meet the required signup/$15
  Earning_Per_Affiliate: "", // Amount Per Affiliate
  Total_Withdrawable: "", // Total Withdrawable Amount monthly
  Affiliate_SignUp_Benefit: "", // Benefits you get when you signup for Affiliate
  Required_Target: "",
  monthly_Affiliate_Count: "",

  // Affiliate Display of Data
  Aff_Available_Balance: 0, /// Affiliate Aviable Balance
  Aff_Total_Withdrawal: 0, // Total withdraal all time
  Aff_Total_Earning: 0, // Count of Total Alltime Earning
  Aff_Total_Refferals: 0, //
  Aff_Total_Paid_Refferal: 0, // Count the student who have paid in all time total
  Aff_Total_Pending_Pay_Refferal: 0, // pending payment from student who join though an affiliate link without paying yet
};

// AFFILIATE MASTERPLAN
// User Join Affiliate for a price
// User refer the required student for each level and get paid according to each level income
// If User is unable to refer the required student, they get the fallback payment
// If They are able to refer more than the required student for their level,
// but couldn't get the required student for the next level, pay them for the level they are in
// and fallback payment for the new level they ought to have attained
// Retain them in the same level without upgrade since they couldn't meet the required student of the new level

const CourseData = {
  CourseTitle: "",
  SubText: "",
  CourseTag: "",
  LessonCount: 0,
  CourseId: "",
  CreatedDate: "",
  CourseCat: "",
};

const DisplayCourse = {
  CourseTitle: "",
  CourseDesc: "",
  CourseVideo: "",
  CourseImage: "",
  CreatedDate: "",
  Coursecat: "",
  CourseResources: "",
};

const DownloadableRes = {
  Title: "",
  SubText: "",
  ListingDate: "",
  ListingCat: "",
  ProductLink: "",
  ProductLInkImage: "",
};

const AffiliateEarningDisplay = {
  EarningType: "",
  AffEarning: "",
  Status: "",
  AffLevel: "",
  userId: "",
  Username: "",
  EarningDate: "",
};

const TransactionData = {
  /*
  TransactionType: "Cash Out",
  Username: Username,
  FirstName: FirstName,
  LastName: LastName,
  Amount: Amount,
  Email: Email,
  Bank: BankAccName + "/Affiliate",
  AccNos: AccountNos,
  Payment_Date: Date,
  Status: StatusCall.Pending,
  CurrencyType: "NGN",
  TxId: getRandom(12),
  DocId: DocID,
  AccName: AccountName,
  userId: userId,
*/
};
