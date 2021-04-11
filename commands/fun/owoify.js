const Discord = require("discord.js");
const owoify = require('owoifyx');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`owoify <text>\`\`\``)

module.exports = {
    name: 'owoify',
    aliases: ['owo'],
    description: "owoify <text>",
    async execute(client, message, args) {
        const saywhat = args.join(" ")
        if (saywhat < 1) return message.channel.send(embed)
        message.channel.send(owoify(saywhat));

    }
}