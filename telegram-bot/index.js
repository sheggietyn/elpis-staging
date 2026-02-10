const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { getGroupInviteLink, GenerateGroupLink } = require("./LinkGene");
const removeExpiredUsers = require("./removUser");
const handleJoinRequest = require("./approveRequest");
const groupIdMap = require("./GroupId");

// Firebase Admin Init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://elpis-e0ebb-default-rtdb.firebaseio.com/",
});
const db = admin.database();

// Telegram Bot Init
const token = "7732524309:AAEQMX11TDrkyyhEKqlx2yZu8dV1xjf6hP0";
const bot = new TelegramBot(token, { webHook: true });
const app = express();

app.use(bodyParser.json());

// Test route to verify server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Set webhook
const url = "https://mytelegram-production.up.railway.app"; // Update with current ngrok URL
bot
  .setWebHook(`${url}/telegraf`)
  .then(() => {
    console.log(`Webhook set to ${url}/telegraf`);
  })
  .catch((error) => {
    console.error("Error setting webhook:", error);
  });

// Webhook route
app.post(`/telegraf`, (req, res) => {
  console.log("Webhook request received:", req.body);
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing update:", error);
    res.sendStatus(500);
  }
});
const SignupLink = "https://digitalmogulacademy.com/login";
const SignUpper = "https://digitalmogulacademy.com/signup";
const Priceplanner = "https://digitalmogulacademy.com/pricing";

// Main Bot Logic
bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
  const telegramId = msg.from.id.toString();
  const username = msg.from.username || "unknown";
  const userId = match[1]; // undefined if no userId provided
  const chatId = msg.chat.id;

  console.log(
    `Processing /start for userId: ${
      userId || "none"
    }, telegramId: ${telegramId}`
  );

  if (!userId) {
    return bot.sendMessage(
      chatId,
      `🤔 ❌ Invalid Elpis userId, make sure you are clicking the right elpis activator link on your dashboard `,
      {
        reply_markup: {
          inline_keyboard: [[{ text: "🔑 Login To Account", url: SignupLink }]],
        },
      }
    );
  }

  try {
    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      console.log(`User ${userId} not found`);
      return bot.sendMessage(
        chatId,
        `📋 ❌ You are not a user on Elpis Academy.\nTo create an account click button below`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⌛ Create an Account", url: SignUpper }],
            ],
          },
        }
      );
    }

    const userData = snapshot.val();
    const {
      PlanStatus,
      PlanType: userPlanType,
      SignalStatus,
      AddOnSignalPlan,
      AddOnSignalStatus,
      SignalPlan,
      telegramId: savedTelegramId,
    } = userData;

    if (!PlanStatus || !userPlanType) {
      console.log(`User ${userId} has no active student subscription`);

      return bot.sendMessage(
        chatId,
        `📝 ❌ You do not have an active student subscription currently.\nyou need to have a student subscription to access signal rooms`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "💲 View Price Plan", url: Priceplanner }],
            ],
          },
        }
      );
    }

    if (!SignalStatus || !SignalPlan) {
      console.log(`User ${userId} has no active signal room subscription`);
      return bot.sendMessage(
        chatId,
        `📝 ❌ You do not have an active signal room subscription.`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "💲 View Subscription Plan", url: SignupLink }],
            ],
          },
        }
      );
    }

    if (!savedTelegramId) {
      await userRef.update({ telegramId });
      console.log(`Updated telegramId for user ${userId}`);
    }

    if (savedTelegramId && savedTelegramId !== telegramId) {
      console.log(`User ${userId} already linked to another Telegram ID`);
      return bot.sendMessage(
        chatId,
        `📝 ❌ This account is already matched to another users telegram account.`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⌛ Sign Up For Yours", url: SignUpper }],
            ],
          },
        }
      );
    }

    // Give Signal Access Based on Plan
    //const linkerr = await getGroupInviteLink(bot, SignalPlan);
    if (PlanStatus && (SignalPlan === "Kodesh" || SignalPlan === "Elpis")) {
      const linkerr = await GenerateGroupLink(
        bot,
        PlanStatus,
        SignalPlan,
        AddOnSignalStatus,
        AddOnSignalPlan,
        telegramId
      );

      if (!linkerr) {
        console.error(`Failed to generate invite link for ${SignalPlan}`);
        return bot.sendMessage(
          chatId,
          `❌ Sorry, we couldn't generate the invite link for the ${SignalPlan} plan right now. Please try again later.`
        );
      }

      console.log(`Generated invite link for ${SignalPlan}: ${linkerr}`);
      const link = linkerr.toString();

      await bot.sendMessage(
        chatId,
        `👋😊 Hello ${username}, here is your access button for the ${SignalPlan} plan channel:`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: `✅ Join ${SignalPlan} Channel`, url: link }],
            ],
          },
        }
      );
    }

    if (PlanStatus && SignalPlan === "Dunamis") {
      const dunamisLink = await getGroupInviteLink(
        bot,
        groupIdMap.Dunamis,
        telegramId
      );
      const kodeshLink = await getGroupInviteLink(
        bot,
        groupIdMap.Kodesh,
        telegramId
      );

      const ElpisLink = await getGroupInviteLink(
        bot,
        groupIdMap.Elpis,
        telegramId
      );

      if (!dunamisLink || !kodeshLink || !ElpisLink) {
        console.error(
          "Failed to generate one or both invite links for Dunamis plan"
        );
        return bot.sendMessage(
          chatId,
          `❌ Sorry, we couldn't generate all the invite links for your plan right now. Please try again later.`
        );
      }

      console.log(`Generated invite links for Dunamis + Kodesh`);

      await bot.sendMessage(
        chatId,
        `👋😊 Hello ${username}, since you are on the ${SignalPlan} plan, you have access to all signal channels:`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ Join Elpis Channel", url: ElpisLink.toString() }],
              [{ text: "✅ Join Kodesh Channel", url: kodeshLink.toString() }],
              [
                {
                  text: "✅ Join Dunamis Channel",
                  url: dunamisLink.toString(),
                },
              ],
            ],
          },
        }
      );
    }

    // Generates Addon Subcription if user buys addon
    if (AddOnSignalStatus && AddOnSignalStatus !== "false") {
      //const AddOnlinkerr = await getGroupInviteLink(bot, AddOnSignalPlan);
      const AddOnlinkerr = await GenerateGroupLink(
        bot,
        PlanStatus,
        SignalStatus,
        AddOnSignalStatus,
        AddOnSignalPlan,
        telegramId
      );

      if (!AddOnlinkerr) {
        console.error(`Failed to generate invite link for ${AddOnSignalPlan}`);
      } else {
        console.log(
          `Generated invite link for ${AddOnSignalPlan}: ${AddOnlinkerr}`
        );
        const AddOnlink = AddOnlinkerr.toString();

        await bot.sendMessage(
          chatId,
          `👋😊 Hello ${username}, here is your access button for the ${AddOnSignalPlan} plan addon channel you purchased:`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `✅ Join ${AddOnSignalPlan} Channel`,
                    url: AddOnlink,
                  },
                ],
              ],
            },
          }
        );
      }
    }
  } catch (error) {
    console.error(`Error for user ${userId}:`, error);
    return bot.sendMessage(
      chatId,
      "An error occurred. Please try again later."
    );
  }
});

// approve User Request
bot.on("chat_join_request", async (msg) => {
  const chatId = msg.chat.id; // group id
  const userId = msg.from.id.toString();

  console.log("Group:", chatId, "User:", userId);

  // check if user exists in Firebase
  const snapshot = await db
    .ref("users")
    .orderByChild("telegramId")
    .equalTo(userId) // ✅ now matches string
    .once("value");

  if (snapshot.exists()) {
    await bot.approveChatJoinRequest(chatId, msg.from.id);
    console.log("Approved:", userId);
  } else {
    await bot.declineChatJoinRequest(chatId, msg.from.id);
    console.log("Declined:", userId);
  }
});

// Runs every 5 hours
setInterval(() => removeExpiredUsers(db, bot), 5 * 60 * 60 * 1000);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
