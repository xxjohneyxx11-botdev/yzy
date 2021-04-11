const Discord = require('discord.js');
const db = require('quick.db');

const embed1 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`addrole <role id> <@user>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_ROLES` permission')
    .setColor(0x0189ff)

const embed4 = new Discord.MessageEmbed()
.setTitle('**❌ ERROR**')
.setColor(0x0189ff)
.setDescription(`\`\`\`role not found\`\`\``)


const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_ROLES` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'addrole',
    description: "addrole <role id> <@user>",
    async execute(client, message, args) {

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(embedd)
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed3)

        let roleid = args[0]

        let user = message.guild.members.cache.get(args[1]) || message.mentions.members.first()

        if (!args[0]) return message.channel.send(embed1)

        if (isNaN(roleid)) return message.channel.send(embed1)

        if (!user) return message.channel.send(embed1)

        const role = message.guild.roles.cache.get(args[0])

        if (role) {

            user.roles.add(role);

            let embed = new Discord.MessageEmbed()
                .setColor(0x0189ff)
                .setDescription(`successfully gave ${user} the <@&${roleid}> role.`)

            message.channel.send(embed)

            const channell = db.get(`modlogs_${message.guild.id}`)

            const channel = message.guild.channels.cache.get(channell);
            if (!channel) return;

            channel.send(embed)

        } else {
            message.channel.send(embed4)
        }
    }
}