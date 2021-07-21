const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config()

const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(`Logged is as ${client.user.tag}`);
});

//Reply MSG
client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("message", (message) => {
  // Message checking if is called bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Commands
  if (command == "hello") {
    message.channel.send("There !");
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);

