module.exports = {
  name: "play",
  description: "play the music server",
  async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("You must be in a voice channel");

    const music = args.join(" ");
    if (!music) return message.reply("Please specify the music");

    await client.distube.play(message, music);
  },
};
