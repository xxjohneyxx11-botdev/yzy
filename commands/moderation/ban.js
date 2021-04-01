const Discord = require("discord.js");
const randomstring = require("randomstring");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`ban <@user> <reason>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

const embeddd = new Discord.MessageEmbed()
    .setTitle('sorry, i cant ban that user they are a higher role than me!')
    .setColor(0x0189ff)

module.exports = {
    name: 'ban',
    aliases: ['yeet'],
    description: "ban <@user> <reason>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedd)
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.channel.send(embed3);
        } else {

            if(target === message.author) return message.channel.send('you cant ban yourself dumb dumb')

            const bruh = randomstring.generate(7);

            let prefix = db.get(`prefix_${message.guild.id}`);
            if (prefix === null) prefix = 'yzy '

            let reason = args.slice(1).join(' ');
            if(!reason) reason = 'none'

            if (!args[0]) return message.channel.send(embed)

            if (target) {

                const memberTarget = message.guild.members.cache.get(target.id);

                if(memberTarget === '742853857104887820') return message.channel.send('sorry, i cant ban my owner')

                if(!memberTarget.bannable) return message.channel.send(embeddd)

                memberTarget.ban({ reason: reason });

                const embed4 = new Discord.MessageEmbed()
                    //.setTitle(`<@${target.id}> has been banned`)
                    .setDescription(`<@${target.id}> **HAS BEEN BANNED**\n[USER BANNED](${message.url})`)
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('BANNED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .addField('BAN ID:', `\`\`\`fix\n${bruh}\`\`\``)
                    .setFooter(`User banned`)
                    .setTimestamp()
                    .setColor(0x0189ff)

                const embed5 = new Discord.MessageEmbed()
                    .setTitle(`you have been banned from: ${message.guild.name}`)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('BANNED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .addField('BAN ID:', `\`\`\`fix\n${bruh}\`\`\``)
                    .setFooter(`if you would like to dispute this punishment, contact a staff member.`)
                    .setTimestamp()
                    .setColor(0x0189ff)

                db.set(`ban_${bruh}`, `[MESSAGE LINK](${message.url})\n**REASON:** \`\`\`fix\n${reason}\`\`\`**BANNED BY:** \`\`\`fix\n${message.author.tag}\`\`\``)

                db.add(`casenumbers_${message.guild.id}`, 1)

                target.send(embed5)

                message.channel.send(embed4)

                const channell = db.get(`modlogs_${message.guild.id}`)

                const channel = message.guild.channels.cache.get(channell);

                if (!channel) return;
    
                channel.send(embed4)
            } else {
                message.channel.send('couldnt ban that user 💯 😤');

            }
        }
    }

}