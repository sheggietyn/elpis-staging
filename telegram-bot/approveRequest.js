const groupIdMap = require("./GroupId");

const handleJoinRequest = async (bot, db, req) => {
  try {
    const userId = req.from.id; // User requesting
    const chatId = req.chat.id; // Group where they requested

    // Ensure it's one of the groups the bot manages
    if (!Object.values(groupIdMap).includes(chatId.toString())) {
      console.log(`⚠️ Ignored join request from unknown group: ${chatId}`);
      return;
    }

    // Fetch allowed user(s) from Firebase
    const snapshot = await db.ref("users").once("value");
    let isAllowed = false;

    snapshot.forEach((child) => {
      const data = child.val();

      // Match telegramId in DB with user requesting
      if (data.telegramId && Number(data.telegramId) === userId) {
        isAllowed = true;
      }
    });

    if (isAllowed) {
      await bot.approveChatJoinRequest(chatId, userId);
      console.log(`✅ Approved ${userId} for group ${chatId}`);
    } else {
      await bot.declineChatJoinRequest(chatId, userId);
      console.log(`❌ Declined ${userId} for group ${chatId}`);
    }
  } catch (err) {
    console.error("Error handling join request:", err);
  }
};

module.exports = handleJoinRequest;
