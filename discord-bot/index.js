import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Assign role when user joins
client.on("guildMemberAdd", async (member) => {
  try {
    const role = member.guild.roles.cache.get(process.env.ROLE_ID);
    if (!role) {
      console.error("❌ Role not found. Check ROLE_ID.");
      return;
    }

    await member.roles.add(role);
    console.log(`🎉 Assigned role ${role.name} to ${member.user.tag}`);
  } catch (error) {
    console.error("❌ Failed to assign role:", error);
  }
});

// Assign role on command (!join)
client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === "!join") {
    const role = message.guild.roles.cache.get(process.env.ROLE_ID);
    if (!role) {
      return message.reply("⚠️ Role not found. Ask an admin.");
    }

    await message.member.roles.add(role);
    message.reply(`✅ You’ve been given the **${role.name}** role!`);
  }
});

client.login(process.env.DISCORD_TOKEN);
