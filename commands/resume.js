const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Phát tiếp bài nhạc.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Không có bài nhạc nào đang phát.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ tiếp tục phát nhạc!`).catch(console.error);
    }

    return message.reply("Hàng đợi không bị tạm dừng.").catch(console.error);
  }
};
