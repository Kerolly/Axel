module.exports = {
  name: "youtube",
  description: "This is a video from YouTube",
  execute(message, args) {
    message.channel.send("https://www.youtube.com/watch?v=9wIU9sB45C4");
  },
};
