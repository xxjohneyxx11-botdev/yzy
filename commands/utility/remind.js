const ms = require('ms');
const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`remind <time> <reminder>\`\`\``)

const embed1 = new Discord.MessageEmbed()
    .setTitle('send your time in d, m, h, or s format')
    .setColor(0x0189ff)

require("../../inlineReply.js")

module.exports = {
    name: 'remind',
    aliases: ['reminder'],
    description: "remind <time> <message>",
    execute(client, message, args) {

        let time = args[0];
        let reminder = args.splice(1).join(' ')

        if (!args[0]) return message.channel.send(embed)
        if (
            !args[0].endsWith("d") && 
            !args[0].endsWith("m") && 
            !args[0].endsWith("h") && 
            !args[0].endsWith("s")
        ) 
            return message.channel.send(embed1)

        if (!reminder) return message.channel.send(embed)

        const embed2 = new Discord.MessageEmbed()
            .setDescription(`your reminder will go off in **${time}** in <#${message.channel.id}> 👍`)
            .setColor(0x0189ff)

        message.channel.send(embed2)

        setTimeout(function () {

            message.reply(`here is your reminder: **${reminder}**`)

        }, ms(time));
    }
}