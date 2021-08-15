module.exports = async (client) => {
  const guild = client.guilds.cache.get("867425336143904798");
  setInterval(() => {
    const memberCounter = guild.memberCount;
    const channel = guild.channels.cache.get("873138564760752160");
    channel.setName(`🔥 Members: ${memberCounter.toLocaleString()}`);
    console.log("Updating Member Count");
  }, 1000);
};
