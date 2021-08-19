module.exports = {
  name: "stop",
  description: "Stop the music server",
  async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("You must be in a voice channel");

    await client.distube.stop(message);
    await message.reply("**Stopped the music 👍**");
  },
};
