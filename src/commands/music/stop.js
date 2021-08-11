module.exports = {
    name: 'stop',
    description: "Stop the music server",
    async execute(client, message, args){
        if (!message.member.voiceChannel)
        return message.client.send("You need to be in a voice channel");

        await client.distube.stop(message);
        await message.client.send("**Stopped the music**")
    }
}