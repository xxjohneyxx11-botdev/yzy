const Discord = require('discord.js');
const db = require('quick.db');

const embeds = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`cmd <name> <message>\`\`\``)

const embed = new Discord.MessageEmbed()
.setColor(0x0189ff)
.setTitle(`uh oh... looks like you reached the max custom commands limit for this guild \`(3/3)\``)

const embed2 = new Discord.MessageEmbed()
.setColor(0x0189ff)
.setTitle(`deleted this guilds custom commands 👍`)

const embed3 = new Discord.MessageEmbed()
.setColor(0x0189ff)
.setTitle(`no custom commands found for this guild`)

const perms = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

const embed4 = new Discord.MessageEmbed()
    .setTitle('that command already exsits! try another name')
    .setColor(0x0189ff)


module.exports = {
    name: 'cmd',
    aliases: ['newcmd'],
    description: "cmd <name> <message>",
    execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(perms)
        const name = args[0]
        const reply = args.slice(1).join(' ');

        const cmd1 = db.get(`cmd1_${message.guild.id}`)
        const cmd2 = db.get(`cmd2_${message.guild.id}`)
        const cmd3 = db.get(`cmd3_${message.guild.id}`)

        if (name === cmd1) return message.channel.send(embed4)
        if (name === cmd2) return message.channel.send(embed4)
        if (name === cmd3) return message.channel.send(embed4)

        if (args[0] === 'delete') {
            if (cmd1 === null) return message.channel.send(embed3)
            db.delete(`cmd1_${message.guild.id}`)
            db.delete(`reply1_${message.guild.id}`)
            db.delete(`cmd2_${message.guild.id}`)
            db.delete(`reply2_${message.guild.id}`)
            db.delete(`cmd3_${message.guild.id}`)
            db.delete(`reply3_${message.guild.id}`)
            db.delete(`cmds_${message.guild.id}`)
            return message.channel.send(embed2)
        }

        if(!args[0]) return message.channel.send(embeds)
        if(!args[1]) return message.channel.send(embeds)

        const embed1 = new Discord.MessageEmbed()
            .setColor(0x0189ff)
            .setDescription(`**added command:** \`${name}\` **with reply of:** \`${reply}\` 👍`)

        if (cmd1 === null) {
            db.set(`cmd1_${message.guild.id}`, name)
            db.set(`reply1_${message.guild.id}`, reply)
            message.channel.send(embed1)
        } else if (cmd2 === null) {
            db.set(`cmd2_${message.guild.id}`, name)
            db.set(`reply2_${message.guild.id}`, reply)
            message.channel.send(embed1)
        } else if (cmd3 === null) {
            db.set(`cmd3_${message.guild.id}`, name)
            db.set(`reply3_${message.guild.id}`, reply)
            message.channel.send(embed1)
        } else {
            return message.channel.send(embed)
        }


    }
}