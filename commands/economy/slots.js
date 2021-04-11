const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`slots <amount>\`\`\``)

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
    name: 'slots',
    cooldown: 15,
    aliases: ['slot'],
    description: "slots <amount>",
    async execute(client, message, args) {

        //const result = ['win', 'lose']
        let result = 'lose'
        const amount = args[0]
        const account = db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send(embed)

        if (isNaN(args[0])) return message.reply(eror)

        if (amount > account) return message.reply(errorr)

        if (amount < 10) return message.reply(er)
        
        //const spin = result[Math.floor(Math.random() * result.length)]
    
        const emojis = ['💯', '💰', '🏅', '💎', '💵', '🕊️']

        //get emojis kek
        
        const em1 = emojis[Math.floor(Math.random() * emojis.length)]
        const em2 = emojis[Math.floor(Math.random() * emojis.length)]
        const em3 = emojis[Math.floor(Math.random() * emojis.length)]

        if (em1 === em2) result = 'win'
        if (em3 === em2) result = 'win'
        if (em3 === em1) result = 'win'

        const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle('► | <a:slots:821550204028190800> | <a:slots:821550204028190800> | <a:slots:821550204028190800> | ◄')
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor(0x0189ff)
            .setTimestamp()

        const msg = await message.channel.send(embed1)

        if (result === 'win') {

            const winm1 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | <a:slots:821550204028190800> | <a:slots:821550204028190800> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor(0x0189ff)
            .setTimestamp()

            const winm2 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | <a:slots:821550204028190800> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor(0x0189ff)
            .setTimestamp()

            const winm3 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | ${em3} | ◄`)
            .setDescription(`----- **YOU WON** -----\n**AMOUNT:** +\`${amount*2}\` 💵`)
            .setColor('GREEN')
            .setTimestamp()

            //edit embeds

            setTimeout(() => msg.edit(winm1), 2000)

            setTimeout(() => msg.edit(winm2), 3000)

            setTimeout(() => msg.edit(winm3), 4000)

            //win add

            db.add(`money_${message.author.id}`, amount*2)

        } else {

            const losem1 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | <a:slots:821550204028190800> | <a:slots:821550204028190800> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor(0x0189ff)
            .setTimestamp()

            const losem2 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | <a:slots:821550204028190800> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor(0x0189ff)
            .setTimestamp()

            const losem3 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | ${em3} | ◄`)
            .setDescription(`----- **YOU LOST** -----\n**AMOUNT:** -\`${amount}\` 💵`)
            .setColor('RED')
            .setTimestamp()

            //edit embeds

            setTimeout(() => msg.edit(losem1), 2000)

            setTimeout(() => msg.edit(losem2), 3000)

            setTimeout(() => msg.edit(losem3), 4000)

            //lose subtract

            db.subtract(`money_${message.author.id}`, amount)

        }
    }
}