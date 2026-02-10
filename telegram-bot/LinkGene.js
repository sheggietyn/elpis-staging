const groupIdMap = require("./GroupId");

const getGroupInviteLink = async (bot, groupId, userId) => {
  try {
    if (!groupId) {
      console.error("Group ID not found");
      return null;
    }

    // Step 1: Check member status
    const member = await bot.getChatMember(groupId, userId);

    if (
      member &&
      (member.status === "kicked" || member.status === "restricted")
    ) {
      // Step 2: Unban if they are banned
      await bot.unbanChatMember(groupId, userId);
      console.log(
        `User ${userId} was banned, unbanned successfully in group ${groupId}`
      );
    }

    // Step 3: Generate fresh invite link
    const res = await bot.createChatInviteLink(groupId, {
      expire_date: Math.floor(Date.now() / 1000) + 600, // 10 mins
      creates_join_request: true, // requires approval
    });

    return res.invite_link;
  } catch (error) {
    console.error("Error generating invite link:", error.message);
    return null;
  }
};

const GenerateGroupLink = async (
  bot,
  PlanStatus,
  PlanType,
  AddonStatus,
  AddType,
  telegramId
) => {
  let groupId = null;

  if (
    (PlanStatus && PlanType === "Kodesh") ||
    (AddonStatus && AddType === "Kodesh")
  ) {
    groupId = groupIdMap.Kodesh;
  } else if (
    (PlanStatus && PlanType === "Dunamis") ||
    (AddonStatus && AddType === "Dunamis")
  ) {
    groupId = groupIdMap.Dunamis;
  } else if (
    (PlanStatus && PlanType === "Elpis") ||
    (AddonStatus && AddType === "Elpis")
  ) {
    groupId = groupIdMap.Elpis;
  }

  if (!groupId) {
    console.error("No matching plan found for user.");
    return null;
  }

  return await getGroupInviteLink(bot, groupId, telegramId);
};

module.exports = { getGroupInviteLink, GenerateGroupLink };
