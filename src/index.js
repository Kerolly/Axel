const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
require("dotenv").config();

const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(`Logged is as ${client.user.tag}`);
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

  // if(command === 'play') {

  //     const music = args.join(" ");
  //     if (!music) return message.reply("You need to specify a music");

  //     client.distube.play(message, music);
  // }

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
      if (!message.member.voice.channel)
        return message.reply("You need to be in a voice channel");

      const music = args.join(" ");
      if (!music) return message.reply("You need to specify a music");

      client.distube.play(message, music);
      break;

    case "stop":
    case "st":
      if (!message.member.voice.channel)
        return message.reply("You need to be in a voice channel");

      client.distube.stop(message);
      message.reply("**Stopped the music**");
      break;

    case "skip":
    case "sk":
      if (!message.member.voice.channel)
        return message.reply("You need to be in a voice channel");

      client.distube.skip(message);
      message.reply("**Skiped the music**");
      break;
  }

  // if (command == 'ping') {
  //  client.commands.get('ping').execute(message, args);
  //   return;
  // }
});

// Create a new Distube
const Distube = require("distube");
client.distube = new Distube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
  .on("playSong", (message, queue, song) => {
    message.channel.send(
      `Playing \ ${song.name} - ${song.formattedDuration} \n Required by ${
        song.user
      } \n ${status(queue)}`
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
