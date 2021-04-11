const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`kick <@user> <reason>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `KICK_MEMBERS` permission')
    .setColor(0x0189ff)

const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `KICK_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'kick',
    aliases: ['softban'],
    description: "kick <@user> <reason>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(embedd)
        const target = message.mentions.users.first();
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.channel.send(embed3);
        } else {

            if(target === message.author) return message.channel.send('you cant kick yourself dumb dumb')

            let reason = args.slice(1).join(' ');
            if(!reason) reason = 'none'

            if (!args[0]) return message.channel.send(embed)

            if (target) {

                const memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.kick();

                const kick = new Discord.MessageEmbed()
                    //.setAuthor(target.tag, target.displayAvatarURL({ format: 'png', dynamic: true }))
                    .setDescription(`<@${target.id}> **HAS BEEN KICKED**\n[USER KICKED](${message.url})`)
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('KICKED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .setFooter(`${target.tag} has been kicked`)
                    .setTimestamp()
                    .setColor(0x0189ff)
                
                const logs = new Discord.MessageEmbed()
                    //.setAuthor(target.tag, target.displayAvatarURL({ format: 'png', dynamic: true }))
                    .setDescription(`<:news:824460711220215879> <@${target.id}> **was kicked by** <@${message.author.id}>`)
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('KICKED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .setFooter(`${target.tag} has been kicked`)
                    .setTimestamp()
                    .setColor(0x0189ff)


                message.channel.send(kick);

                db.add(`casenumbers_${message.guild.id}`, 1)

                const channell = db.get(`modlogs_${message.guild.id}`)
                const channel = message.guild.channels.cache.get(channell);
                if (!channel) return;
    
                channel.send(logs)
            } else {
                message.channel.send('couldnt kick that user 💯 😤');

            }
        }
    }

}