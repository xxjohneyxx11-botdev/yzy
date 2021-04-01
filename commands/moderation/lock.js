const Discord = require("discord.js");
const db = require('quick.db');
const embed2 = new Discord.MessageEmbed()
    .setTitle('error! everyone role not found!')
    .setColor(0x0189ff)
const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_CHANNELS` permission')
    .setColor(0x0189ff)
const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_CHANNELS` permission')
    .setColor(0x0189ff)
module.exports = {
    name: 'lock',
    description: "lock <reason>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embedd)
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.channel.send(embed3);
        } else {
            let everyoneRole = message.guild.roles.cache.find(rN => rN.name === '@everyone')
            if (everyoneRole !== null) {

                message.channel.updateOverwrite(everyoneRole.id, {
                    'SEND_MESSAGES': false
                })
                let reason = args.join(" ")
                if(!reason) reason = 'none'
                const embed = new Discord.MessageEmbed()
                    .addField('<:channel_locked:585783907350478848> CHANNEL LOCKED:', `<#${message.channel.id}>`)
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('LOCKED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .setColor(0x0189ff)
                    .setFooter(`channel locked`)
                    .setTimestamp()
                message.channel.send(embed)
                db.add(`casenumbers_${message.guild.id}`, 1)
                const channell = db.get(`modlogs_${message.guild.id}`)

                const channel = message.guild.channels.cache.get(channell);
                if (!channel) return;
    
                channel.send(embed)
            } else {
                message.channel.send(embed2)
            }
        }
    }

}