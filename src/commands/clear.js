module.exports = {
  name: "clear",
  description: "Clear messages",
  async execute(message, args) {

    // Safety check
    if(!args[0]) return message.reply('You need to provide a number of arguments');
    if(isNaN(args[0])) return message.reply('You must provied a real number')
    
    if(args[0] <= 0) return message.reply('You must provide a number greater than zero')
    if(args[0] > 100) return message.reply('You must provide a number smaller than or equal to 100')

    //Delete Command
    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {message.channel.bulkDelete(messages)});
  },
};
