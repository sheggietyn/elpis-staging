const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin"); // Import the entire admin module
const moment = require("moment");
const dateAdder = require("../dateadddon");
const { ServerValue } = require("firebase-admin/database");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
// One Runs 3 Days Earlier before the the cashout day to update withdrawble balance
// The Other Runs on the Night of the cashout day 1 mins bwfore another day
module.exports = onSchedule(
  {
    schedule: "59 23 * * *", // 11:59 PM daily
    timeZone: "Africa/Lagos",
  },
  async () => {
    const db = admin.database();
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");

    const today = moment().format("YYYY-MM-DD");
    const RenewDate = dateAdder(7); // 7 days later

    const updates = [];

    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      const userId = childSnapshot.key; // ✅ real userId from DB
      const userRef = db.ref(`users/${userId}`);

      const updateData = {};
      const NewBackdate = moment(user.AffiliateFirstPayDate)
        .subtract(3, "days")
        .format("YYYY-MM-DD");

      // Ensure available balance is numeric
      const AvailableBalance = parseFloat(user.Aff_Available_Balance || 0);
      if (isNaN(AvailableBalance)) return;

      const SlipBalance = AvailableBalance / 4;
      const FinalAmount =
        AvailableBalance < 15 ? AvailableBalance : SlipBalance;

      if (user.AffiliateStatus && user.AffiliateFirstPayDate === today) {
        // This Should update on the cashout due date
        updateData.AffiliateFirstPayDate = RenewDate.toString();
      }

      if (user.AffiliateStatus && NewBackdate === today) {
        //Update 3 Days Earlier
        updateData.AffiliatePayOutDay = ServerValue.increment(FinalAmount);
        updateData.Aff_Available_Balance = ServerValue.increment(-FinalAmount);
      }

      if (Object.keys(updateData).length > 0) {
        updates.push(userRef.update(updateData));
      }
    });

    if (updates.length > 0) {
      await Promise.all(updates);
      console.log("✅ All expiry dates checked and updates applied.");
    } else {
      console.log("ℹ️ No users required updates today.");
    }

    return null;
  }
);
