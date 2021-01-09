const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Điều chỉnh lặp lại.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Không có bài nhạc đang phát nào.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`Lặp lại đang ${queue.loop ? "**Bật**" : "**Tắt**"}`).catch(console.error);
  }
};
