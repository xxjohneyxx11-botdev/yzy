const Discord = require("discord.js");
const db = require('quick.db');

const embeds = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`highlow <higher/lower> <bet>\`\`\``)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`insignificant funds\`\`\``)

const er = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`amount must be < 10\`\`\``)

const eror = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`amount must be a number\`\`\``)

module.exports = {
    name: 'highlow',
    aliases: ['hl'],
    cooldown: 0,
    description: "highlow <higher/lower> <bet>",
    async execute(client, message, args) {

        let generated = Math.floor(Math.random() * 100);
        let number = Math.floor(Math.random() * 100);
        let guess = args[0]
        let amount = args[1]
        let money = db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send(embeds)
        if (!args[1]) return message.channel.send(embeds)
        if (amount > money) return message.reply(errorr)
        if (amount < 10) return message.reply(er)
        if (isNaN(args[1])) return message.reply(eror)

        const high = 'higher'

        const low = 'lower'

        let win = 'win'

        const dddd = ['higher', 'lower']

        if (!dddd.includes(guess)) return message.reply(embeds)

        if (high.includes(guess)) {
            if (number > generated) win = 'lose'
        } else {
            if (number < generated) win = 'lose'
        }


        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`**A NUMBER BETWEEN 1-100 HAS BEEN GENERATED**\n\`${generated}\` was generated`)
            .setColor(0x0189ff)
            .setTimestamp()

        const embed1 = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`**A NUMBER BETWEEN 1-100 HAS BEEN GENERATED**\n\`${generated}\` was generated and you chose \`${args[0]}\``)
            .setColor(0x0189ff)
            .setTimestamp()

        const wine = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`\`${generated}\` is ${args[0]} than \`${number}\`\n**YOU WON** +\`${amount*2}\` 💵`)
            .setColor('GREEN')
            .setTimestamp()

        const losee = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`\`${generated}\` isnt ${args[0]} than \`${number}\`\n**YOU LOST** -\`${amount}\` 💵`)
            .setColor('RED')
            .setTimestamp()

        const msg = await message.channel.send(embed)

        setTimeout(() => msg.edit(embed1), 2000)

        if (win === 'win') {

            setTimeout(() => msg.edit(wine), 4000)

            db.add(`money_${message.author.id}`, amount * 2)

        } else {

            setTimeout(() => msg.edit(losee), 4000)

            db.subtract(`money_${message.author.id}`, amount)

        }

    }
}