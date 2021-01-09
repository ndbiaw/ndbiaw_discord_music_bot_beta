module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Hiển thị ping của bot.",
  execute(message) {
    message.reply(`📈 Ping trung bình đến API: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
