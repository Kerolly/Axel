module.exports = {
  name: "volume",
  description: "Change the volume up or down",

  execute(client, message, args) {
      if(!message.member.voice.channel) return message.reply("Please be in a voice channel")
    const volume = parseInt(args[0]);
    if (isNaN(volume)) return message.reply("Please enter a valid number 🔢");
    client.distube.setVolume(message, volume);
    message.reply(`Volume set to ${volume}%`);
  },
};
