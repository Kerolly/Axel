module.exports = {
    name: 'ping',
    aliases: ['ping, p, pi'],
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('pong!');
    }
}