const Discord = require("discord.js");
const db = require('quick.db');

const embed2 = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`flip <heads/tails> <amount>\`\`\``)

const errorr = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`insignificant funds\`\`\``)

const eror = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`amount must be a number\`\`\``)

module.exports = {
    name: 'flip',
    cooldown: 15,
    aliases: ['coinflip'],
    description: "flip <heads/tails> <amount>",
    execute(client, message, args) {
        const coin = ['heads', 'tails']
        const choice = args[0]
        const amount = args[1]
        const account = db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send(embed2)
        if (!args[1]) return message.channel.send(embed2)

        if (isNaN(args[1])) return message.reply(eror)

        if (!coin.includes(choice)) return message.reply(embed2)

        if (amount > account) return message.reply(errorr)
        
        const flip = coin[Math.floor(Math.random() * coin.length)]

        if (flip === choice) {
            db.add(`money_${message.author.id}`, amount)
            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> **the coin landed on** \`${flip}\` **and you got** \`${amount}\` 💵`)
                .setColor(0x0189ff)
            message.channel.send(embed)
        } else {
            db.subtract(`money_${message.author.id}`, amount)
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> **the coin landed on** \`${flip}\` **and you lost** \`${amount}\` 💵`)
                .setColor('RED')
            message.channel.send(embed1)
        }
    }
}