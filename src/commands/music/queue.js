module.exports = {
  name: "queue",
  description: "Queue the music",

  async execute(client, message, args) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      message.reply(`🤷‍♂️  Isn't any music in this queue`);
    } else {
      message.channel.send(
        `**Current queue:**\n${queue.songs
          .map(
            (song, id) =>
              `**${id ? id : "Playing"}**. ${song.name} - \`${song.formattedDuration}\``)
          .slice(0, 10)
          .join("\n")}`
      );
    }
    
  },
};
