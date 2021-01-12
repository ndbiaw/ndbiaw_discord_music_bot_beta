const { PREFIX } = require("../util/EvobotUtil");

module.exports = {
  name: "clip",
  description: "Mở âm thanh từ Clip.",
  async execute(message, args) {
    const { channel } = message.member.voice;
    const queue = message.client.queue.get(message.guild.id);

    if (!args.length) return message.reply(`Sử dụng: ${PREFIX}clip <tên>`).catch(console.error);
    if (queue) return message.reply("Không thể phát clip vì có một hàng đợi đang hoạt động.");
    if (!channel) return message.reply("Bạn cần tham gia một kênh thoại trước!").catch(console.error);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      const dispatcher = queueConstruct.connection
        .play(`./sounds/${args[0]}.mp3`)
        .on("finish", () => {
          message.client.queue.delete(message.guild.id);
          channel.leave();
        })
        .on("error", err => {
          message.client.queue.delete(message.guild.id);
          channel.leave();
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }
};
