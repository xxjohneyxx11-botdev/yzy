const Discord = require("discord.js");
const db = require('quick.db');

const embed1 = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`dep <amount>\`\`\``)

const errorr = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`insignificant funds\`\`\``)

const eror = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`amount must be > 0\`\`\``)

const eror3 = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`amount must be a number\`\`\``)

module.exports = {
    name: 'dep',
    aliases: ['bank'],
    description: "dep <amount>",
    execute(client, message, args) {
        if (!args[0]) return message.reply(embed1)
        if (isNaN(args[0])) return message.reply(eror3)

        if (args[0] < 0) return message.reply(eror)

        if (args[0] === '0') return message.reply(eror)

        let money = db.get(`money_${message.author.id}`)

        if (args[0] > money) return message.reply(errorr)

        db.subtract(`money_${message.author.id}`, args[0])
        db.add(`bank_${message.author.id}`, args[0])

        const embed = new Discord.MessageEmbed()
        .setDescription(`**deposited** \`${args[0]}\` 💵 **to your bank!**`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }
}