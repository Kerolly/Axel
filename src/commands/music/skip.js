module.exports = {
    name: 'skip',
    description: "Skip the music",
    async execute(client, message, args){
        if (!message.member.voiceChannel)
      return message.client.send("You need to be in a voice channel");

      await client.distube.skip(message)
      await message.client.send("**Skiped the music**")
    }
}