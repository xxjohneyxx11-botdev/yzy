const Discord = require("discord.js");
const db = require('quick.db');
const bot = new Discord.Client();
const embed = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`unban <@user> <reason>\`\`\``)
const embed2 = new Discord.MessageEmbed()
    .setTitle('not a valid user!')
    .setColor(0x0189ff)
const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)
const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)
module.exports = {
    name: 'unban',
    aliases: ['unyeet'],
    description: "unabn <id> <reason>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedd)
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(embed3)

        if (!args[0]) return message.channel.send(embed)

        let member;

        try {
            member = await bot.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send(embed2)
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'none'

        message.guild.fetchBans().then(bans => {
            
            const user = bans.find(ban => ban.user.id === member.id);

            const embed4 = new Discord.MessageEmbed()
                    .setAuthor(`user unbanned`)
                    .addField('REASON:', `\`\`\`fix\n${reason}\`\`\``)
                    .addField('UNBANNED BY:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                    .setTimestamp()
                    .setColor(0x0189ff)

            message.guild.members.unban(user.user.id).then(() => message.channel.send(embed4))
            db.add(`casenumbers_${message.guild.id}`, 1)
            const channell = db.get(`modlogs_${message.guild.id}`)

                const channel = message.guild.channels.cache.get(channell);
                if (!channel) return;
    
            channel.send(embed4)
        })
    }

}