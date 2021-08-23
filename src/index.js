const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
require("dotenv").config();

const memberCounter = require("./counters/memberCounter"); // member counter

let prefix = "!";

// const validPermissions = [
//   "CREATE_INSTANT_INVITE",
//   "KICK_MEMBERS",
//   "BAN_MEMBERS",
//   "ADMINISTRATOR",
//   "MANAGE_CHANNELS",
//   "MANAGE_GUILD",
//   "ADD_REACTIONS",
//   "VIEW_AUDIT_LOG",
//   "PRIORITY_SPEAKER",
//   "STREAM",
//   "VIEW_CHANNEL",
//   "SEND_MESSAGES",
//   "SEND_TTS_MESSAGES",
//   "MANAGE_MESSAGES",
//   "EMBED_LINKS",
//   "ATTACH_FILES",
//   "READ_MESSAGE_HISTORY",
//   "MENTION_EVERYONE",
//   "USE_EXTERNAL_EMOJIS",
//   "VIEW_GUILD_INSIGHTS",
//   "CONNECT",
//   "SPEAK",
//   "MUTE_MEMBERS",
//   "DEAFEN_MEMBERS",
//   "MOVE_MEMBERS",
//   "USE_VAD",
//   "CHANGE_NICKNAME",
//   "MANAGE_NICKNAMES",
//   "MANAGE_ROLES",
//   "MANAGE_WEBHOOKS",
//   "MANAGE_EMOJIS",
// ];

client.on("ready", () => {
  console.log(`Logged is as ${client.user.tag}`);
  memberCounter(client);
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === "welcome"
  );
  if (!channel) return;

  channel.send(`${member} welcome to my server. \n Please respect the rules`);
});

// Read files from Commands file
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

const musicFiles = fs
  .readdirSync("./src/commands/music")
  .filter((file) => file.endsWith(".js"));

for (const file of musicFiles) {
  const command = require(`./commands/music/${file}`);
  client.commands.set(command.name, command);
}

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

  switch (command) {
    case "ping":
    case "pi":
      client.commands.get("ping").execute(message, args);
      break;

    case "youtube":
      client.commands.get("youtube").execute(message, args);
      break;

    case "clear":
      client.commands.get("clear").execute(message, args);
      break;

    case "play":
    case "p":
      client.commands.get("play").execute(client, message, args);
      break;

    case "stop":
    case "st":
      client.commands.get("stop").execute(client, message, args);
      break;

    case "skip":
    case "sk":
      client.commands.get("skip").execute(client, message, args);
      break;

    case "queue":
    case "q":
      client.commands.get("queue").execute(client, message, args);
      break;

    case "loop":
    case "l":
    case "repeat":
    case "r":
      client.commands.get("loop").execute(client, message, args);
      break;

    case "volume":
    case "set-volume":
    case "v":
      client.commands.get("volume").execute(client, message, args);
      break;

    case "prefix":
      if (!args[0])
        return message.reply(
          "Please enter any character that you want to be the prefix"
        );

      prefix = args[0];
      break;
  }

  // if (command == 'ping') {
  //  client.commands.get('ping').execute(message, args);
  //   return;
  // }
});

// Create a new Distube
const distube = require("distube");
client.distube = new distube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});

client.distube
  .on("playSong", (message, queue, song) => {
    message.channel.send(
      `Playing \ ${song.name} - ${song.formattedDuration} \n Required by ${song.user}`
    );
  })
  .on("addSong", (message, queue, song) => {
    message.channel.send(
      `Added ${song.name} - \ ${song.formattedDuration} to the queue by ${song.user}`
    );
  })
  .on("error", (message, error) => {
    message.channel.send(`There is an error: ${error}`);
  });

client.login(process.env.DISCORD_TOKEN);
