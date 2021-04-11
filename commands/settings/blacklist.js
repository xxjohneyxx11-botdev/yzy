const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`blacklist <word>\`\`\``)

const embeddd = new Discord.MessageEmbed()
    .setTitle('psst... im missing the `MANAGE_MESSAGES` permission, you might wanna give me that')
    .setColor(0x0189ff)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'blacklist',
    description: "blacklist <word>",
    async execute(client, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(embed3)

        if (!args[0]) return message.channel.send(embed)

        const word = args[0]

        if (args[0] === 'off') {

            db.delete(`blacklisted_${message.guild.id}`)

            return message.reply(`banned words are \`off\` for this guild 👍`)
        }

        db.push(`blacklisted_${message.guild.id}`, word)

        const embed2 = new Discord.MessageEmbed()
            .setDescription(`\`${word}\` **blacklisted!**`)
            .setFooter(`Blacklisted by: ${message.author.username}`)
            .setTimestamp()
            .setColor(0x0189ff)

        const msg = await message.channel.send(embed2)
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeddd)

        setTimeout(() => msg.delete(), 4000)
        //setTimeout(() => message.delete(), 4000)
    }
}