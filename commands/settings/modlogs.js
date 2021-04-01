const Discord = require("discord.js");
const db = require('quick.db');
const bot = new Discord.Client();

const embed = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`modlogs <channel>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'modlogs',
    aliases: ['setmodchannel'],
    description: "modlogs <channel>",
    execute(client, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(embed3)
        const channel = message.mentions.channels.first();

        if (!args[0]) return message.channel.send(embed)

        if (channel) {
            db.set(`modlogs_${message.guild.id}`, channel.id)

            const embed2 = new Discord.MessageEmbed()
                .setDescription(`**CHANNEL:** <#${channel.id}>`)
                .setFooter(`Channel set by: ${message.author.username}`)
                .setTimestamp()
                .setColor(0x0189ff)

            message.channel.send(embed2)
        } else if (args[0] === 'off') {

            db.delete(`modlogs_${message.guild.id}`)

            message.reply(`modlogs are \`off\` for this guild 👍`)
        }
    }
}