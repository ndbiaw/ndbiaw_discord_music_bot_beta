const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Chỉnh âm lượng bài bài hát đang phát.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Không có bài nhạc nào đang được phát.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Bạn cần tham gia một kênh thoại trước!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Âm lượng hiện tại là: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Xin hãy sử dụng số để điểu chỉnh âm lượng.").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("Xin điều chỉnh âm lượng trong khoảng 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Âm lượng được đặt thành: **${args[0]}%**`).catch(console.error);
  }
};
