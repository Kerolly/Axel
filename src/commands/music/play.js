module.exports = {
  name: "play",
  description: "Play the music server",
  async execute(client, message, args) {
    if (!message.member.voiceChannel)
      return message.client.send("You need to be in a voice channel");

    const music = args.join(" ");
    if (!music) return message.client.send("You need to specify a music");

    await client.distube.play(message, music);
  },
};
