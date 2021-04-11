const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('you are missing the `OWNER` permission')
    .setColor(0x0189ff)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`give <@user> <amount>\`\`\``)

const eror = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`amount must be a number\`\`\``)

module.exports = {
    name: 'give',
    description: "give <@user> <amount>",
    execute(client, message, args) {
        if (!process.env.CADEN_ID.includes(message.author.id)) return message.channel.send(embed)
        //if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed)

        if (!args[0]) return message.channel.send(embed2)
        if (!args[1]) return message.channel.send(embed2)

        if (isNaN(args[1])) return message.reply(eror)

        //if (args[1] > 9999) return message.reply('try giving them a smaller number of 💵')

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let amount = args[1]

        db.add(`money_${user.id}`, amount)
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`**successfully gave** <@${user.id}> \`${amount}\` 💵`)
            .setColor(0x0189ff)
        message.channel.send(embed1)
        
    }
}