module.exports = {
    name: "loop",
  description: "Looping the music",

  execute (client, message, args) {
      const loop = client.distube.setRepeatMode(message)

      message.reply(`🔁 Set repeat mode to \`${loop ? loop === 2 ? 'All Queue' : `This Song` : 'Off'}\``)
  }
}