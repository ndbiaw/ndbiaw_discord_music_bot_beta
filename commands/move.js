const move = require("array-move");
const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Di chuyển bài nhạc trong hàng đợi.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Không có hàng đợi nào.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Sử dụng: ${message.client.prefix}move <Queue Number>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `${message.author} 🚚 di chuyển **${song.title}** đến ${args[1] == 1 ? 1 : args[1] - 1} trong hàng đợi.`
    );
  }
};
