const Discord = require("discord.js");
const bot = new Discord.Client();
const owoify = require('owoifyx');

module.exports = {
    name: 'owoify',
    aliases: ['owo'],
    description: "owoify <text>",
    async execute(client, message, args) {
        const saywhat = args.join(" ")
        const embed2 = new Discord.MessageEmbed()
        .setTitle('**invalid usage**')
        .setColor(0x0189ff)
        .setDescription(`\`\`\`owoify <anything>\`\`\``)
        if (saywhat < 1) return message.channel.send(embed2)
        message.channel.send(owoify(saywhat));

    }
}