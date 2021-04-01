const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: 'setprefix',
    cooldown: 10,
    description: "setsprefix <prefix>",
    async execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            const embed4 = new Discord.MessageEmbed()
                .setTitle('you are missing the `MANAGE_GUILD` permission')
                .setColor(0x0189ff)
            return message.reply(embed4);
        } else {
            const embed1 = new Discord.MessageEmbed()
                .setTitle('please provide a new prefix for this guild')
                .setColor(0x0189ff)
            if (!args[0]) return message.channel.send(embed1)

            db.set(`prefix_${message.guild.id}`, args[0])

            const embed3 = new Discord.MessageEmbed()
                .setTitle(`successfully set guild prefix to **${args[0]}**`)
                .setColor(0x0189ff)
            message.channel.send(embed3)
            console.log(chalk.cyan(`> prefix set to ${args[0]} in ${message.guild.name}`))
        }
    }

}