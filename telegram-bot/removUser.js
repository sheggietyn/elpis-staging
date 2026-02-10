const groupIdMap = require("./GroupId");

const removeExpiredUsers = async (db, bot) => {
  try {
    const snapshot = await db.ref("users").once("value");

    const promises = [];

    snapshot.forEach((child) => {
      const data = child.val();

      // ✅ Only remove if NONE of the statuses are active
      //const noActivePlan =
      //!data.PlanStatus && !data.AddOnSignalStatus && !data.SignalStatus;
      const noActivePlan = !data.PlanStatus;

      if (data.telegramId && noActivePlan) {
        for (const groupId of Object.values(groupIdMap)) {
          promises.push(
            bot
              .banChatMember(groupId, data.telegramId)
              .then(async () => {
                console.log(
                  `🚨 Removed ${data.telegramId} from group ${groupId}`
                );
                await db.ref(`users/${child.key}`).update({ telegramId: "" });
              })
              .catch((err) => {
                console.error(
                  `⚠️ Failed to remove ${data.telegramId} from ${groupId}:`,
                  err.message
                );
              })
          );
        }
      }
    });

    await Promise.all(promises);
  } catch (err) {
    console.error("Error checking expired users:", err);
  }
};

// Run every 5 hours

module.exports = removeExpiredUsers;
