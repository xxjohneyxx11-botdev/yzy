const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`antilink <on/off>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'antilink',
    aliases: ['nolink', 'link'],
    description: "antilink <on/off>",
    execute(client, message, args) {
        /*
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(embed3)
    
        if (args[0] === 'on') {
            db.set(`antilink_${message.guild.id}`, true)
            message.reply(`anti link is \`enabled\` for this guild 👍`)
        } else if (args[0] === 'off') {
            db.set(`antilink_${message.guild.id}`, false)
            message.reply(`anti link is \`disabled\` for this guild 👍`)
        } else {
            message.channel.send(embed)
        }
        */
       message.channel.send('not working rn LMAO')
    }
}