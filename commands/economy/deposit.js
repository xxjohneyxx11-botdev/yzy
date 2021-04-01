const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'dep',
    aliases: ['bank'],
    description: "dep <amount>",
    execute(client, message, args) {
        if (!args[0]) return message.reply('please specify an amount!')
        if (isNaN(args[0])) return message.reply('amount must be a number!')

        if (args[0] < 0) return message.reply('you cant do that :skull:')

        if (args[0] === '0') return message.reply('you cant do that :skull:')

        let money = db.get(`money_${message.author.id}`)

        if (args[0] > money) return message.reply('you dont have enough 💵 to do that!')

        db.subtract(`money_${message.author.id}`, args[0])
        db.add(`bank_${message.author.id}`, args[0])

        const embed = new Discord.MessageEmbed()
        .setDescription(`**deposited** \`${args[0]}\` 💵 **to your bank!**`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }
}