const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Điều chỉnh tin nhắn bot.",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Lỗi bất định.").catch(console.error);
      }

      return message.channel
        .send(`Trạng thái: ${config.PRUNING ? "**Bật**" : "**Tắt**"}`)
        .catch(console.error);
    });
  }
};
