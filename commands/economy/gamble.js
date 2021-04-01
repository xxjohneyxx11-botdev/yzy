const Discord = require("discord.js");
const db = require('quick.db');

const embed2 = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`gamble <amount>\`\`\``)


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

        if (amount > money) return message.reply('you dont have enough 💵 to do that!')

        if (amount < 10) return message.reply('you have to gamble at least `10` 💵')

        if (isNaN(args[0])) return message.reply('amount must be a number!')

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