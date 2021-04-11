const Discord = require("discord.js");
const db = require('quick.db');

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`gamble <amount>\`\`\``)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`insignificant funds\`\`\``)

const eror = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`amount must be a number\`\`\``)

const er = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`amount must be < 10\`\`\``)


module.exports = {
    name: 'gamble',
    cooldown: 5,
    description: "gamble <amount>",
    async execute(client, message, args) {
        const result = ['win', 'lose']
        const gamble = result[Math.floor(Math.random() * result.length)]
        let amount = args[0]
        let money = db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send(embed2)

        if (amount > money) return message.reply(errorr)

        if (amount < 10) return message.reply(er)

        if (isNaN(args[0])) return message.reply(eror)

        const embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> **is gambling** \`${amount}\` 💵 **will they win ?**`)
        .setColor(0x0189ff)

        const no = new Discord.MessageEmbed()
        .setDescription(`**No.**`)
        .setColor(0x0189ff)

        const yes = new Discord.MessageEmbed()
        .setDescription(`**Yes.**`)
        .setColor(0x0189ff)

        const win = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> **won** \`${amount}\` 💵`)
        .setColor('GREEN')

        const lose = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> **lost** \`${amount}\` 💵`)
        .setColor('RED')

        const msg = await message.channel.send(embed)

        if (gamble === 'win') {
            setTimeout(() => msg.edit(yes), 2000)
            setTimeout(() => msg.edit(win), 2500)
            db.add(`money_${message.author.id}`, amount)
        } else {
            setTimeout(() => msg.edit(no), 2000)
            setTimeout(() => msg.edit(lose), 2500)
            db.subtract(`money_${message.author.id}`, amount)
        }
    }
}