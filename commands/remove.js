const { canModifyQueue } = require("../util/EvobotUtil");

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Xoá bài nhạc từ hàng đợi.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Không có hàng đợi nào.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Sử dụng: ${message.client.prefix}remove <Số Hàng Đợi>`);

    const arguments = args.join("");
    const songs = arguments.split(",").map((str) => str.trim());
    let removed = [];

    if (pattern.test(arguments) && songs.every((value) => value < queue.songs.length)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.every((value) => value - 1 != index)) {
          return true;
        } else {
          removed.push(item);
        }
      });

      queue.textChannel.send(
        `${message.author} ❌ đã xoá **${removed.map((song) => song.title).join("\n")}** khỏi hàng đợi.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] < queue.songs.length) {
      return queue.textChannel.send(
        `${message.author} ❌ đã xoá **${queue.songs.splice(args[0] - 1, 1)[0].title}** khỏi hàng đợi.`
      );
    } else {
      return message.reply(`Sử dụng: ${message.client.prefix}remove <Số Hàng Đợi>`);
    }
  }
};
