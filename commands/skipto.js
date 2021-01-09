const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Chuyển đến bài hát trong hàng đợi.",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Sử dụng: ${message.client.prefix}${module.exports.name} <Số Hàng Đợi>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Không có hàng đợi nào.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`Hàng đợi chỉ có ${queue.songs.length} bài nhạc!`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ chuyển đến bài số ${args[0] - 1}`).catch(console.error);
  }
};
