const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin"); // Import the entire admin module
const moment = require("moment");
const dateAdder = require("../dateadddon");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
// Define the scheduled function
module.exports = onSchedule(
  {
    schedule: "every day 00:00",
    timeZone: "Africa/Lagos",
  },
  async () => {
    const db = admin.database();
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");

    const today = moment().format("YYYY-MM-DD"); // YYYY-MM-DD
    const RenewDate = dateAdder(30);
    const updates = [];

    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      const userId = childSnapshot.key;

      const userRef = db.ref(`users/${userId}`);
      const updateData = {};

      // Check Subscription Expiry For Student
      if (user.PlanExpiryDate === today) {
        updateData.PlanStatus = false;
        updateData.PlanType = "";
        updateData.PlanExpiryDate = "";
      }

      // Check Signal Expiry Subscription for Signal with student package
      if (user.SignalSubExpDate === today) {
        updateData.SignalAccess = false;
        updateData.SignalPlan = "";
        updateData.SignalSubExpDate = "";
      }

      // Check for Addon Subscription when expires
      if (user.AddOnSignalSubExpDate === today) {
        updateData.AddOnSignalStatus = false;
        updateData.AddOnSignalPlan = "";
        updateData.AddOnSignalSubExpDate = "";
      }

      // Affiliate Reset Rank and Date
      if (user.AffiliateRegDate === today) {
        updateData.AffiliateRegDate = RenewDate.toString();
        updateData.AffiliateRank = "";
        updateData.Earning_This_Month = 0;
        updateData.monthly_Affiliate_Count = 0;
      }

      // Only update if there's something to update
      if (Object.keys(updateData).length > 0) {
        updates.push(userRef.update(updateData));
      }
    });

    await Promise.all(updates);
    console.log("All expiry dates checked and updates applied.");
    return null;
  }
);
