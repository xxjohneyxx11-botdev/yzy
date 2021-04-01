const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`flip <heads/tails> <amount>\`\`\``)

module.exports = {
    name: 'flip',
    cooldown: 15,
    aliases: ['coinflip'],
    description: "flip",
    execute(client, message, args) {
        const coin = ['heads', 'tails']
        const choice = args[0]
        const amount = args[1]
        const account = db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send(embed)
        if (!args[1]) return message.channel.send(embed)

        if (isNaN(args[1])) return message.reply('amount must be a number!')

        if (!coin.includes(choice)) return message.reply('you have to chose from `heads` or `tails`!')

        if (amount > account) return message.reply('you dont have enough 💵 to do that!')
        
        const flip = coin[Math.floor(Math.random() * coin.length)]

        if (flip === choice) {
            db.add(`money_${message.author.id}`, amount)
            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> the coin landed on \`${flip}\` and you got \`${amount}\` 💵`)
                .setColor(0x0189ff)
            message.channel.send(embed)
        } else {
            db.subtract(`money_${message.author.id}`, amount)
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> the coin landed on \`${flip}\` and you lost \`${amount}\` 💵`)
                .setColor('RED')
            message.channel.send(embed1)
        }
    }
}