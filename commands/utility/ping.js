const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: 'ping',
    description: "ping",
    async execute(client, message, args) {
        message.channel.send(`pinging....`).then((msg) => {
            const _ = new Discord.MessageEmbed()
                //.setDescription(`\nlatency is: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\napi latency is: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\``)
                .addField('latency', `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`, inline = true)
                .addField('API latency', `${Math.round(client.ws.ping)}ms`, inline = true)
                .setColor(0x0189ff);
            msg.edit(_);
            msg.edit("\u200B");
        });
    }
}