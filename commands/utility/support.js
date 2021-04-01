const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: 'support',
    description: "support",
    execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setDescription('JOIN THE YZY SUPPORT SERVER **[CLICK HERE](https://discord.gg/uKe9qjqchH)**')
        .setColor(0x0189ff)   
        message.channel.send(embed);
    }
}