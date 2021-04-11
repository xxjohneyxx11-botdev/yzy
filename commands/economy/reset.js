const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('you are missing the `OWNER` permission')
    .setColor(0x0189ff)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`reset <@user>\`\`\``)
    

module.exports = {
    name: 'reset',
    description: "reset <@user>",
    execute(client, message, args) {
        if (!process.env.CADEN_ID.includes(message.author.id)) return message.channel.send(embed)
        //if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed)

        if (!args[0]) return message.channel.send(embed2)

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        db.delete(`money_${user.id}`)
        db.delete(`bank_${user.id}`)
        db.delete(`inventory_${user.id}`)
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`**successfully reset** <@${user.id}> **account to** \`0\` 💵`)
            .setColor(0x0189ff)
        message.channel.send(embed1)
        
    }
}