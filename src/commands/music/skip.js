module.exports = {
  name: "skip",
  description: "Skip the music",
  async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("You must be in a voice channel");

    await client.distube.skip(message);
    await message.reply("**🔥 Skiped the music 🔥**");
  },
};
